// Abnahme (Boss-Level): Sam nimmt die Station ab. Gemischte Aufgaben, Punkte,
// ab 80 % bestanden → nächste Station frei.

import { loadChapter, loadBoss, loadAlleKapitel } from '../content.js';
import { getState, vergibXp, zaehle, abnahmeSpeichern, abzeichenPruefen, merkeCombo } from '../store.js';
import { antwort as leitnerAntwort } from '../gamification/leitner.js';
import { XP } from '../gamification/xp.js';
import { abnahmeFrei } from '../progress.js';
import { renderStep, SCHRITT_NAMEN, SCHRITT_ICONS } from '../engine/steps.js';
import { md, escapeHtml } from '../engine/markdown.js';
import { sound } from '../gamification/sound.js';
import { konfetti } from '../gamification/celebrate.js';
import { zeigeLevelup, meldeAbzeichen } from './lesson-view.js';

const robby = (pose) => new URL(`figuren/robby/${pose}.png`, document.baseURI).href;

export async function renderBoss(app, chapterId) {
  const [kapitel, boss, alle] = await Promise.all([loadChapter(chapterId), loadBoss(chapterId), loadAlleKapitel()]);
  if (!boss) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/kapitel/${chapterId}">← Zur Station</a><div class="karte gesperrt-karte"><p>Für diese Station gibt es (noch) keine Abnahme.</p></div></div>`;
    return;
  }
  if (!abnahmeFrei(kapitel)) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/kapitel/${chapterId}">← Zur Station</a><div class="karte gesperrt-karte"><h2>🔒 Noch nicht</h2><p>Erst alle Lektionen der Station abschließen, dann nimmt Sam ab.</p></div></div>`;
    return;
  }

  const aufgaben = boss.aufgaben;
  const punkteFuer = (a) => (a.type === 'code' ? 3 : 1);
  const maxPunkte = aufgaben.reduce((s, a) => s + punkteFuer(a), 0);
  let punkte = 0;
  let index = -1;
  let serie = 0;
  const ergebnisse = [];

  app.innerHTML = `
    <div class="lektion-seite">
      <div class="lektion-kopf">
        <a class="zurueck" href="#/kapitel/${chapterId}">← ${kapitel.icon} ${escapeHtml(kapitel.title)}</a>
        <h1>${escapeHtml(boss.title)}</h1>
        <span class="punkte-anzeige" id="punkte">0 / ${maxPunkte} Punkte</span>
        <div class="pager-fortschritt"><span class="pager-zaehler" id="zaehler"></span><div class="pager-dots" id="dots"></div></div>
      </div>
      <div id="buehne"></div>
    </div>`;
  const buehne = app.querySelector('#buehne');
  const dotsEl = app.querySelector('#dots');
  const dots = aufgaben.map(() => {
    const d = document.createElement('span');
    d.className = 'pager-dot';
    dotsEl.appendChild(d);
    return d;
  });

  function intro() {
    buehne.innerHTML = `<section class="schritt auftritt">
      <div class="abnahme-intro">
        <div class="sprecher-bild" style="width:64px;height:64px;background:color-mix(in srgb,#4ade80 25%,transparent);color:#4ade80;font-size:1.4rem">S</div>
        <div><div class="sprecher-name" style="color:#4ade80">Sam · Kollektiv FUNKEN</div><div class="schritt-inhalt">${md(boss.intro)}</div></div>
      </div>
      <div class="hinweis-box" style="margin-top:1rem">
        <strong>So läuft die Abnahme:</strong> ${aufgaben.length} Aufgaben, gemischt aus dieser und früheren Stationen. Jede Aufgabe hat <strong>einen Versuch</strong> pro Antwort – bei Code-Aufgaben darfst du so oft prüfen, wie du willst, aber es gibt keine Tipps. Ab <strong>${Math.round(boss.bestanden * 100)} %</strong> ist die nächste Station frei. ${XP.abnahme} XP beim ersten Bestehen, +${XP.abnahmePerfekt} bei 100 %.
      </div>
      <div class="schritt-buttons"><button class="btn btn-primaer btn-gross" type="button" id="start">Abnahme starten →</button></div>
    </section>`;
    buehne.querySelector('#start').addEventListener('click', () => {
      sound.klick();
      naechste();
    });
  }

  function naechste() {
    index++;
    if (index >= aufgaben.length) return ende();
    const a = aufgaben[index];
    app.querySelector('#zaehler').textContent = `Aufgabe ${index + 1} von ${aufgaben.length}`;
    dots.forEach((d, i) => {
      d.classList.toggle('aktiv', i === index);
      d.classList.toggle('erledigt', i < index && ergebnisse[i]?.ok);
    });
    buehne.innerHTML = '';
    const karte = document.createElement('section');
    karte.className = `schritt schritt-${a.type} pager-seite slide-vor`;
    buehne.appendChild(karte);
    let versucht = false;
    let erledigt = false;
    const abschliessen = (ok) => {
      if (erledigt) return;
      erledigt = true;
      const p = ok ? punkteFuer(a) : 0;
      punkte += p;
      ergebnisse.push({ ok, titel: `${SCHRITT_ICONS[a.type]} ${SCHRITT_NAMEN[a.type]} ${index + 1}`, punkte: p, max: punkteFuer(a) });
      app.querySelector('#punkte').textContent = `${punkte} / ${maxPunkte} Punkte`;
      if (a.konzept) leitnerAntwort(getState(), a.konzept, ok);
      const zeile = document.createElement('div');
      zeile.className = 'schritt-buttons';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-primaer';
      btn.textContent = index + 1 < aufgaben.length ? 'Nächste Aufgabe →' : 'Ergebnis ansehen ✔';
      btn.addEventListener('click', naechste);
      zeile.appendChild(btn);
      karte.appendChild(zeile);
      btn.focus();
    };
    renderStep(karte, a, {
      hints: false,
      allowSolution: false,
      solved: () => {
        if (a.type === 'code') {
          serie++;
          merkeCombo(serie);
          zaehle('correct');
          sound.richtig();
          abschliessen(true);
        } else if (!versucht) {
          serie++;
          merkeCombo(serie);
          zaehle('correct');
          sound.richtig();
          abschliessen(true);
        } else {
          abschliessen(false);
        }
      },
      wrong: () => {
        if (a.type !== 'code' && !versucht) {
          versucht = true;
          serie = 0;
          zaehle('wrong');
          sound.falsch();
          const hinweis = document.createElement('div');
          hinweis.className = 'rueckmeldung rueckmeldung-fehler';
          hinweis.innerHTML = '<strong>Leider falsch – kein Punkt für diese Aufgabe.</strong> Löse sie trotzdem zu Ende, dann geht es weiter.';
          karte.appendChild(hinweis);
        } else if (a.type === 'code') {
          zaehle('wrong');
          sound.falsch();
        }
      },
    });
  }

  function ende() {
    const anteil = punkte / maxPunkte;
    const passed = anteil >= boss.bestanden;
    const alt = getState().boss[chapterId];
    const erster = passed && !alt?.passed;
    abnahmeSpeichern(chapterId, { anteil, passed });
    let xp = 0;
    let erg = null;
    if (passed) {
      erg = vergibXp(XP.abnahme, { key: `${chapterId}#abnahme` });
      xp += erg.xp;
      if (anteil >= 1) xp += vergibXp(XP.abnahmePerfekt, { key: `${chapterId}#abnahme-perfekt` }).xp;
    }
    const neu = abzeichenPruefen({ ereignis: 'abnahme' });
    const idx = alle.findIndex((k) => k.id === chapterId);
    const naechstes = alle[idx + 1];
    buehne.innerHTML = `<section class="schritt abschluss auftritt">
      <img src="${robby(passed ? 'erfolg-pokal' : 'nachdenken')}" alt="" style="width:130px;height:130px;object-fit:contain">
      <h2>${passed ? 'Abnahme bestanden!' : 'Noch nicht bestanden'}</h2>
      <div class="abschluss-xp">${Math.round(anteil * 100)} %</div>
      <p style="color:var(--muted)">${passed ? (anteil >= 1 ? 'Fehlerfrei – Sam ist begeistert.' : `Sam nickt: „Passt. Weiter zur nächsten Station.“`) : `Sam: „Fast! Schau dir die roten Punkte an und komm wieder – ab ${Math.round(boss.bestanden * 100)} % ist die nächste Station frei.“`}</p>
      ${xp ? `<div class="abschluss-xp">+${xp} XP</div>` : erster ? '' : passed ? '<p style="color:var(--muted)">Schon bestanden – keine neuen XP.</p>' : ''}
      <ul class="abschluss-liste">${ergebnisse.map((r) => `<li><span>${r.ok ? '✅' : '❌'} ${r.titel}</span><span>${r.punkte}/${r.max}</span></li>`).join('')}</ul>
      <div class="abschluss-buttons">
        ${passed && naechstes ? `<a class="btn btn-primaer" href="#/kapitel/${naechstes.id}">Nächste Station: ${escapeHtml(naechstes.title)} →</a>` : ''}
        ${passed && !naechstes ? '<a class="btn btn-primaer" href="#/showtime">Showtime →</a>' : ''}
        ${!passed ? `<a class="btn btn-primaer" href="#/abnahme/${chapterId}" onclick="location.reload()">Nochmal antreten</a>` : ''}
        <a class="btn btn-sekundaer" href="#/kapitel/${chapterId}">Zur Station</a>
        <a class="btn btn-geist" href="#/">Zum Gelände</a>
      </div>
    </section>`;
    if (passed) {
      sound.fanfare();
      konfetti('gross');
      if (erg?.rangup) setTimeout(() => zeigeLevelup(erg.levelup, erg.rangup), 900);
      else if (erg?.levelup) setTimeout(() => zeigeLevelup(erg.levelup), 900);
    } else sound.alarm();
    meldeAbzeichen(neu);
  }

  intro();
}
