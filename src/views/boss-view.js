// Das Match (Abnahme, Boss-Level): Nachtschicht gegen die Gegner-Crew der Runde.
// Sam ist die Jury: gemischte Aufgaben, Punkte, ab 80 % ist die Runde gewonnen,
// die Gegner-Crew fliegt raus und die nächste Runde ist frei.

import { loadChapter, loadBoss, loadAlleKapitel, rundeFuer } from '../content.js';
import { getState, vergibXp, zaehle, abnahmeSpeichern, abzeichenPruefen, merkeCombo } from '../store.js';
import { antwort as leitnerAntwort } from '../gamification/leitner.js';
import { XP } from '../gamification/xp.js';
import { abnahmeFrei } from '../progress.js';
import { renderStep, SCHRITT_NAMEN, SCHRITT_ICONS } from '../engine/steps.js';
import { md, escapeHtml } from '../engine/markdown.js';
import { sound } from '../gamification/sound.js';
import { konfetti } from '../gamification/celebrate.js';
import { erzeugeTicker, reaktionenEntfernen } from '../gamification/reaktionen.js';
import { zeigeLevelup, meldeAbzeichen } from './lesson-view.js';

const robby = (pose) => new URL(`figuren/robby/${pose}.png`, document.baseURI).href;

export async function renderBoss(app, chapterId) {
  const [kapitel, boss, alle, story] = await Promise.all([
    loadChapter(chapterId),
    loadBoss(chapterId),
    loadAlleKapitel(),
    rundeFuer(chapterId).catch(() => ({ runde: null, crew: null, turnier: null, runden: [] })),
  ]);
  const idx = alle.findIndex((k) => k.id === chapterId);
  const runde = story.runde;
  const crewName = story.crew?.name || 'Nachtschicht';
  const gegner = runde ? escapeHtml(runde.crew) : 'die Gegner-Crew';

  if (!boss) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/kapitel/${chapterId}">← Zur Runde</a><div class="karte gesperrt-karte"><p>Für diese Runde gibt es (noch) kein Match.</p></div></div>`;
    return;
  }
  if (!abnahmeFrei(kapitel)) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/kapitel/${chapterId}">← Zur Runde</a><div class="karte gesperrt-karte"><h2>🔒 Noch nicht</h2><p>Erst das Training abschließen (alle Lektionen der Runde), dann pfeift Sam das Match an.</p></div></div>`;
    return;
  }

  const ticker = await erzeugeTicker(chapterId);
  const aufgaben = boss.aufgaben;
  const punkteFuer = (a) => (a.type === 'code' ? 3 : 1);
  const maxPunkte = aufgaben.reduce((s, a) => s + punkteFuer(a), 0);
  let punkte = 0;
  let gegnerPunkte = 0;
  let index = -1;
  let serie = 0;
  let treffer = 0;
  const ergebnisse = [];
  const gegnerAvatar = (extra = '') => `<span class="runde-gegner ${extra}" style="--farbe:${escapeHtml(runde?.farbe || '#8f97ab')}">${runde?.icon || '❔'}</span>`;

  app.innerHTML = `
    <div class="lektion-seite">
      <div class="lektion-kopf">
        <a class="zurueck" href="#/kapitel/${chapterId}">← ${kapitel.icon} Runde ${idx + 1}: ${escapeHtml(kapitel.title)}</a>
        <h1>🥊 Match${runde ? ` · Runde ${runde.runde}` : ''}</h1>
        <span class="punkte-anzeige" id="punkte">0 / ${maxPunkte} Punkte</span>
        <div class="pager-fortschritt"><span class="pager-zaehler" id="zaehler"></span><div class="pager-dots" id="dots"></div></div>
      </div>
      <div class="match-kopf" style="--farbe:${escapeHtml(runde?.farbe || '#8f97ab')}">
        <span class="match-team"><span class="runde-gegner" style="--farbe: var(--spark)">🌙</span>${escapeHtml(crewName)}</span>
        <span class="match-stand" id="stand">0 : 0</span>
        <span class="match-team">${gegner}${gegnerAvatar()}</span>
        <span class="match-jury">Jury: Sam · ${escapeHtml(boss.title)} · ab ${Math.round(boss.bestanden * 100)} % gewonnen</span>
      </div>
      <div id="buehne"></div>
    </div>`;
  const buehne = app.querySelector('#buehne');
  const standEl = app.querySelector('#stand');
  const dotsEl = app.querySelector('#dots');
  const dots = aufgaben.map(() => {
    const d = document.createElement('span');
    d.className = 'pager-dot';
    dotsEl.appendChild(d);
    return d;
  });

  function standAnzeigen() {
    standEl.textContent = `${punkte} : ${gegnerPunkte}`;
    standEl.classList.add('tick');
    setTimeout(() => standEl.classList.remove('tick'), 250);
    app.querySelector('#punkte').textContent = `${punkte} / ${maxPunkte} Punkte`;
  }

  function intro() {
    const trash = runde?.trash?.length ? runde.trash[Math.floor(Math.random() * runde.trash.length)] : null;
    buehne.innerHTML = `<section class="schritt auftritt">
      ${runde && trash ? `<blockquote class="trash-blase" style="--farbe:${escapeHtml(runde.farbe)};margin-bottom:1rem"><b>${escapeHtml(runde.captain)} · ${escapeHtml(runde.crew)} vor dem Match</b>${escapeHtml(trash)}</blockquote>` : ''}
      <div class="abnahme-intro">
        <div class="sprecher-bild" style="width:64px;height:64px;background:color-mix(in srgb,#4ade80 25%,transparent);color:#4ade80;font-size:1.4rem">S</div>
        <div><div class="sprecher-name" style="color:#4ade80">Sam · Jury</div><div class="schritt-inhalt">${md(boss.intro)}</div></div>
      </div>
      <div class="hinweis-box" style="margin-top:1rem">
        <strong>So läuft das Match:</strong> ${aufgaben.length} Aufgaben, gemischt aus dieser und früheren Runden. Jede richtige Antwort ist ein Punkt für die ${escapeHtml(crewName)}, jede falsche ein Punkt für ${gegner} – und du hast <strong>einen Versuch</strong> pro Antwort. Bei Code-Aufgaben (3 Punkte) darfst du so oft prüfen, wie du willst, aber es gibt keine Tipps. Ab <strong>${Math.round(boss.bestanden * 100)} %</strong> deiner Punkte ist die Runde gewonnen: ${XP.abnahme} XP beim ersten Sieg, +${XP.abnahmePerfekt} bei einem Sieg zu null.
      </div>
      <div class="schritt-buttons"><button class="btn btn-primaer btn-gross" type="button" id="start">Anpfiff →</button></div>
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
      if (!ok) gegnerPunkte += punkteFuer(a);
      ergebnisse.push({ ok, titel: `${SCHRITT_ICONS[a.type]} ${SCHRITT_NAMEN[a.type]} ${index + 1}`, punkte: p, max: punkteFuer(a) });
      standAnzeigen();
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
    const treffer_ = () => {
      serie++;
      treffer++;
      merkeCombo(serie);
      zaehle('correct');
      sound.richtig();
      if (treffer % 3 === 0) ticker.jubel();
    };
    renderStep(karte, a, {
      hints: false,
      allowSolution: false,
      solved: () => {
        if (a.type === 'code' || !versucht) {
          treffer_();
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
          ticker.spott(4000);
          const hinweis = document.createElement('div');
          hinweis.className = 'rueckmeldung rueckmeldung-fehler';
          hinweis.innerHTML = `<strong>Leider falsch – Punkt für ${gegner}.</strong> Löse die Aufgabe trotzdem zu Ende, dann geht es weiter.`;
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
    const naechstes = alle[idx + 1];
    const naechsteRunde = naechstes ? story.runden.find((r) => r.chapter === naechstes.id) : null;
    const prozent = Math.round(anteil * 100);
    const samSagt = passed
      ? anteil >= 1
        ? `Zu null! ${gegner} ist raus – und wie. Weiter zur nächsten Runde.`
        : `Passt. ${gegner} ist raus. Weiter zur nächsten Runde.`
      : `Fast! Ab ${Math.round(boss.bestanden * 100)} % fliegt ${gegner}. Schau dir die roten Punkte an, trainier kurz und hol dir die Revanche.`;
    const spruch = runde ? (passed ? runde.niederlage : runde.spott[Math.floor(Math.random() * runde.spott.length)]) : null;

    buehne.innerHTML = `<section class="schritt abschluss auftritt">
      <div class="match-ergebnis">
        <span class="runde-gegner" style="--farbe: var(--spark);width:84px;height:84px;font-size:2.6rem">🌙</span>
        <span class="match-stand" style="font-size:2.4rem">${punkte} : ${gegnerPunkte}</span>
        <span style="position:relative">${gegnerAvatar(passed ? 'raus' : '')}${passed ? '<span class="stempel gross">Raus</span>' : ''}</span>
      </div>
      <h2>${passed ? `Runde ${idx + 1} gewonnen!` : 'Noch nicht gewonnen'}</h2>
      <div class="abschluss-xp">${prozent} %</div>
      <p style="color:var(--muted)">Sam: „${samSagt}“</p>
      ${spruch ? `<blockquote class="trash-blase" style="--farbe:${escapeHtml(runde.farbe)};text-align:left;max-width:560px;margin:0.5rem auto 0.75rem"><b>${escapeHtml(runde.captain)} · ${escapeHtml(runde.crew)}</b>${escapeHtml(spruch)}</blockquote>` : ''}
      ${xp ? `<div class="abschluss-xp">+${xp} XP</div>` : erster ? '' : passed ? '<p style="color:var(--muted)">Freundschaftsspiel – die Runde war schon gewonnen, keine neuen XP.</p>' : ''}
      <ul class="abschluss-liste">${ergebnisse.map((r) => `<li><span>${r.ok ? '✅' : '❌'} ${r.titel}</span><span>${r.punkte}/${r.max}</span></li>`).join('')}</ul>
      <img src="${robby(passed ? 'erfolg-pokal' : 'nachdenken')}" alt="" style="width:110px;height:110px;object-fit:contain">
      <div class="abschluss-buttons">
        ${passed && naechstes ? `<a class="btn btn-primaer" href="#/kapitel/${naechstes.id}">Runde ${idx + 2}${naechsteRunde ? `: vs. ${escapeHtml(naechsteRunde.crew)}` : `: ${escapeHtml(naechstes.title)}`} →</a>` : ''}
        ${passed && !naechstes ? '<a class="btn btn-primaer" href="#/showtime">🏆 Pokal geholt – Showtime →</a>' : ''}
        ${!passed ? `<a class="btn btn-primaer" href="#/abnahme/${chapterId}" onclick="location.reload()">Revanche</a>` : ''}
        <a class="btn btn-sekundaer" href="#/kapitel/${chapterId}">Zur Runde</a>
        <a class="btn btn-geist" href="#/">Zum Turnierplan</a>
      </div>
    </section>`;
    if (passed) {
      sound.fanfare();
      konfetti('gross');
      setTimeout(() => ticker.niederlage(), 1200);
      if (erg?.rangup) setTimeout(() => zeigeLevelup(erg.levelup, erg.rangup), 900);
      else if (erg?.levelup) setTimeout(() => zeigeLevelup(erg.levelup), 900);
    } else {
      sound.alarm();
      setTimeout(() => ticker.spott(6000), 800);
    }
    meldeAbzeichen(neu);
  }

  intro();
  return { destroy: () => reaktionenEntfernen() };
}
