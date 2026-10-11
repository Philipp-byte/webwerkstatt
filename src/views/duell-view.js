// Das Duell (Abnahme) gegen das Gespinst des Ortes: gemischte Aufgaben, Punkte, ab 80 %
// reißt das Gespinst, der Ort leuchtet auf der Karte und der nächste Ort ist frei.
// Sam prüft, das Gespinst spottet bei Fehlern, die Verbündeten loben.

import { loadChapter, loadBoss, loadAlleKapitel, loadWelt, ortFuer } from '../content.js';
import { getState, vergibXp, zaehle, abnahmeSpeichern, meilensteinePruefen } from '../store.js';
import { antwort as leitnerAntwort } from '../gamification/leitner.js';
import { XP } from '../gamification/xp.js';
import { abnahmeFrei } from '../progress.js';
import { renderStep, SCHRITT_NAMEN, SCHRITT_ICONS } from '../engine/steps.js';
import { md, escapeHtml } from '../engine/markdown.js';
import { sound } from '../gamification/sound.js';
import { konfetti } from '../gamification/celebrate.js';
import { zeigeLevelup, meldeMeilensteine } from './lesson-view.js';
import { stimmeFuer, blaseHtml, blaseEinhaengen, figur } from '../engine/figuren.js';
import { sigilSvg, figurBild } from '../engine/sigil.js';

export async function renderDuell(app, chapterId) {
  const [kapitel, boss, alle, welt, ort] = await Promise.all([loadChapter(chapterId), loadBoss(chapterId), loadAlleKapitel(), loadWelt(), ortFuer(chapterId)]);
  const stimme = await stimmeFuer(chapterId);
  const idx = alle.findIndex((k) => k.id === chapterId);
  const gespinstId = ort?.gespinst || 'knoten';
  const gespinst = figur(gespinstId) || { name: 'das Gespinst', farbe: '#e23cff' };
  const istSeidra = gespinstId === 'seidra';

  if (!boss) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/ort/${chapterId}">← Zum Ort</a><div class="karte gesperrt-karte"><p>Für diesen Ort gibt es (noch) kein Duell.</p></div></div>`;
    return;
  }
  if (!abnahmeFrei(kapitel)) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/ort/${chapterId}">← Zum Ort</a><div class="karte gesperrt-karte"><h2>🔒 Noch nicht</h2><p>Erst alle Lektionen des Ortes abschließen, dann stellt sich ${escapeHtml(gespinst.name)}.</p></div></div>`;
    return;
  }

  const aufgaben = boss.aufgaben;
  const punkteFuer = (a) => (a.type === 'code' ? 3 : 1);
  const maxPunkte = aufgaben.reduce((s, a) => s + punkteFuer(a), 0);
  let punkte = 0;
  let gegnerPunkte = 0;
  let index = -1;
  let treffer = 0;
  const ergebnisse = [];

  app.innerHTML = `
    <div class="lektion-seite duell-seite">
      <div class="lektion-kopf">
        <a class="zurueck" href="#/ort/${chapterId}">← Ort ${ort?.nr || idx + 1}: ${escapeHtml(ort?.name || kapitel.title)}</a>
        <h1>⚔️ Duell gegen ${escapeHtml(gespinst.name)}</h1>
        <span class="punkte-anzeige" id="punkte">0 / ${maxPunkte} Punkte</span>
        <div class="pager-fortschritt"><span class="pager-zaehler" id="zaehler"></span><div class="pager-dots" id="dots"></div></div>
      </div>
      <div class="duell-kopf" style="--f:${escapeHtml(gespinst.farbe || '#e23cff')}">
        <span class="duell-team">${figurBild('sam', { groesse: 44, titel: 'Sam' })}Du · Werkstatt</span>
        <span class="duell-stand" id="stand">0 : 0</span>
        <span class="duell-team gegner" id="gegner-team">${escapeHtml(gespinst.name)}${sigilSvg(gespinstId, { groesse: 44, titel: gespinst.name, klasse: 'duell-sigil' })}</span>
        <span class="duell-info">${escapeHtml(boss.title.replace(/^(Abnahme|Prüfung): /, 'Sam prüft: '))} · ab ${Math.round(boss.bestanden * 100)} % reißt das Gespinst</span>
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
    const vorstellung = stimme.vorstellung();
    const drohung = gespinst.spott?.[0] || '';
    buehne.innerHTML = `<section class="schritt auftritt duell-intro">
      <div class="duell-buehne">
        ${sigilSvg(gespinstId, { groesse: 150, klasse: 'sigil-gross', titel: gespinst.name })}
        <div>
          ${vorstellung ? blaseHtml(gespinstId, vorstellung, { art: 'spott' }) : ''}
          ${blaseHtml(gespinstId, istSeidra ? 'Dein Netz gegen meins. Ein Fehler, und ich ziehe.' : drohung, { art: 'spott' })}
          ${blaseHtml('sam', boss.intro.replace(/[*_`]/g, ''), { art: 'rede' })}
        </div>
      </div>
      <div class="hinweis-box" style="margin-top:1rem">
        <strong>So läuft das Duell:</strong> ${aufgaben.length} Aufgaben, gemischt aus diesem und früheren Orten. Jede richtige Antwort ist ein Punkt für dich, jede falsche ein Punkt für ${escapeHtml(gespinst.name)}, und du hast <strong>einen Versuch</strong> pro Antwort. Bei Code-Aufgaben (3 Punkte) darfst du so oft prüfen, wie du willst, aber es gibt keine Tipps. Ab <strong>${Math.round(boss.bestanden * 100)} %</strong> reißt das Gespinst: ${XP.abnahme} XP beim ersten Sieg, +${XP.abnahmePerfekt} bei 100 %. Kein Nachlesen im Duell, dafür davor: <a href="#/spickzettel">Spickzettel</a>.
      </div>
      <div class="schritt-buttons"><button class="btn btn-primaer btn-gross" type="button" id="start">Gespinst zerreißen →</button><a class="btn btn-geist" href="#/ort/${chapterId}">Erst nochmal nachlesen</a></div>
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
    let fehlversuche = 0;
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
    renderStep(karte, a, {
      hints: false,
      allowSolution: false,
      solved: () => {
        if (a.type === 'code' || !versucht) {
          treffer++;
          zaehle('correct');
          sound.richtig();
          if (treffer % 3 === 0) {
            const lob = stimme.erfolg();
            if (lob) blaseEinhaengen(karte, lob.id, lob.text, { art: 'lob', pose: lob.pose, klein: true });
          }
          abschliessen(true);
        } else {
          abschliessen(false);
        }
      },
      wrong: () => {
        fehlversuche++;
        if (a.type !== 'code' && !versucht) {
          versucht = true;
          zaehle('wrong');
          sound.falsch();
          const spott = stimme.fehler(1);
          const hinweis = document.createElement('div');
          hinweis.className = 'rueckmeldung rueckmeldung-fehler';
          hinweis.innerHTML = `<strong>Leider falsch – Punkt für ${escapeHtml(gespinst.name)}.</strong> Löse die Aufgabe trotzdem zu Ende, dann geht es weiter.`;
          karte.appendChild(hinweis);
          if (spott) blaseEinhaengen(karte, spott.id, spott.text, { art: 'spott', klein: true, meta: 'Duell' });
        } else if (a.type === 'code') {
          zaehle('wrong');
          sound.falsch();
          const spott = stimme.fehler(fehlversuche);
          if (spott) blaseEinhaengen(karte, spott.id, spott.text, { art: 'spott', klein: true, meta: `${fehlversuche}. Versuch` });
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
    const neu = meilensteinePruefen({ ereignis: 'duell' });
    const naechstes = alle[idx + 1];
    const naechsterOrt = naechstes ? welt.orte.find((o) => o.chapter === naechstes.id) : null;
    const prozent = Math.round(anteil * 100);
    const rueckzug = passed ? stimme.rueckzug() : null;
    const spott = !passed ? stimme.fehler(4) : null;
    const samSagt = passed
      ? ort?.befreit?.text || `Passt. ${gespinst.name} ist weg. Weiter zum nächsten Ort.`
      : `Fast. Ab ${Math.round(boss.bestanden * 100)} % reißt das Gespinst. Schau dir die roten Punkte an, lies kurz nach und versuch es nochmal.`;
    const finale = passed && istSeidra ? welt.finale : null;

    buehne.innerHTML = `<section class="schritt abschluss auftritt duell-ende">
      <div class="duell-ergebnis">
        ${figurBild('sam', { groesse: 72, titel: 'Sam' })}
        <span class="duell-stand" style="font-size:2.4rem">${punkte} : ${gegnerPunkte}</span>
        <span class="${passed ? 'gespinst-zerrissen' : ''}">${sigilSvg(gespinstId, { groesse: 84, titel: gespinst.name })}</span>
      </div>
      <h2>${passed ? (istSeidra ? 'Das Netz hält. Seidra weicht.' : `${escapeHtml(ort?.name || 'Der Ort')} ist befreit!`) : 'Noch nicht befreit'}</h2>
      <div class="abschluss-xp">${prozent} %</div>
      ${rueckzug ? blaseHtml(rueckzug.id, rueckzug.text, { art: 'spott' }) : ''}
      ${spott ? blaseHtml(spott.id, spott.text, { art: 'spott' }) : ''}
      ${finale ? finale.text.map((m) => blaseHtml(m.wer, m.text, { art: figur(m.wer)?.rolle === 'gespinst' ? 'spott' : 'rede' })).join('') : blaseHtml(ort?.befreit?.wer || 'sam', samSagt, { art: 'rede' })}
      ${!passed ? `<p style="font-size:0.9rem"><a href="#/spickzettel">📖 Spickzettel</a> und die <a href="#/ort/${chapterId}">Lektionen des Ortes</a> helfen vor dem nächsten Versuch. Im Duell selbst gibt es kein Nachlesen.</p>` : ''}
      ${xp ? `<div class="abschluss-xp">+${xp} XP</div>` : erster ? '' : passed ? '<p style="color:var(--muted)">Der Ort war schon befreit, keine neuen XP.</p>' : ''}
      <ul class="abschluss-liste">${ergebnisse.map((r) => `<li><span>${r.ok ? '✅' : '❌'} ${r.titel}</span><span>${r.punkte}/${r.max}</span></li>`).join('')}</ul>
      <div class="abschluss-buttons">
        ${passed && istSeidra ? '<a class="btn btn-primaer" href="#/showtime">🎆 Funkenfest: Website zeigen →</a>' : ''}
        ${passed && naechstes ? `<a class="btn btn-primaer" href="#/ort/${naechstes.id}">Ort ${idx + 2}: ${escapeHtml(naechsterOrt?.name || naechstes.title)} →</a>` : ''}
        ${!passed ? `<a class="btn btn-primaer" href="#/duell/${chapterId}" onclick="location.reload()">Nochmal</a>` : ''}
        <a class="btn btn-sekundaer" href="#/ort/${chapterId}">Zum Ort</a>
        <a class="btn btn-geist" href="#/">Hyperia</a>
      </div>
    </section>`;
    if (passed) {
      sound.fanfare();
      konfetti(istSeidra ? 'gross' : 'mittel');
      if (erg?.levelup) setTimeout(() => zeigeLevelup(erg.levelup), 900);
    } else {
      sound.alarm();
    }
    meldeMeilensteine(neu);
  }

  intro();
  return {};
}
