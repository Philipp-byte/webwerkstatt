// Hinterhalt (Route #/hinterhalt/<ort>/<spiel>/<knoten?>): das Gespinst lauert auf, eine
// Spielrunde gegen die Uhr. Knoten im Weg (h1, h3 …) müssen einmal gespielt sein, der
// Sturm vor dem Duell ist freiwillig, und alle Spiele sind jederzeit frei spielbar.

import { loadChapter, loadAlleKapitel, loadKonzepte, ortFuer } from '../content.js';
import { getState, vergibXp, zaehle, hinterhaltSpeichern, getHinterhalt, meilensteinePruefen, frageGestellt } from '../store.js';
import { antwort as leitnerAntwort } from '../gamification/leitner.js';
import { XP } from '../gamification/xp.js';
import { renderStep } from '../engine/steps.js';
import { md, escapeHtml } from '../engine/markdown.js';
import { sound } from '../gamification/sound.js';
import { konfetti } from '../gamification/celebrate.js';
import { meldeMeilensteine, verarbeiteXp } from './lesson-view.js';
import { SPIELE, spiel as spielVon, spielMitVorrat, aussageAus, sterneFuer } from '../engine/hinterhalt.js';
import { stimmeFuer, blaseEinhaengen, figur } from '../engine/figuren.js';
import { sigilSvg, figurBild } from '../engine/sigil.js';
import { oeffneNachschlagen } from '../engine/nachschlagen.js';
import { hinterhaltKnotenId } from '../progress.js';

export async function renderHinterhalt(app, chapterId, spielId, knotenId) {
  const alle = await loadAlleKapitel();
  if (!chapterId) {
    // Ohne Ort: der zuletzt begonnene Ort
    const s = getState();
    const begonnen = alle.filter((k) => k.lessons.some((l) => s.lessons[`${k.id}/${l}`]?.done));
    chapterId = (begonnen.length ? begonnen[begonnen.length - 1] : alle[0]).id;
  }
  const [kapitel, ort] = await Promise.all([loadChapter(chapterId), ortFuer(chapterId)]);
  const stimme = await stimmeFuer(chapterId);
  const gespinst = figur(stimme.gespinstId) || { name: 'Das Gespinst' };
  const istSturm = knotenId === 'sturm';
  const istKnoten = !!knotenId && !istSturm;

  if (!spielId) return auswahl(app, kapitel, ort, gespinst);

  const { spiel, aufgaben } = await spielMitVorrat(spielId, chapterId, { nurKapitel: istSturm });
  if (!spiel) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/ort/${chapterId}">← ${escapeHtml(ort?.name || kapitel.title)}</a><div class="karte gesperrt-karte"><h2>Noch zu wenig Vorrat</h2><p>Für einen Hinterhalt braucht es gelernten Stoff. Schließ erst ein paar Lektionen ab.</p></div></div>`;
    return;
  }
  if (spiel.id !== spielId) spielId = spiel.id;

  const schonGespielt = knotenId ? getHinterhalt(chapterId, knotenId) : null;
  const aufgabenRunde = spiel.typ === 'quiz' ? aufgaben.flatMap((f) => [aussageAus(f, Math.random() < 0.5)]).slice(0, spiel.runden) : aufgaben.slice(0, spiel.runden);
  const gesamt = aufgabenRunde.length;
  let index = 0;
  let richtig = 0;
  let punkte = 0;
  let rest = spiel.zeit;
  let laeuft = false;
  let timer = null;
  const konzepte = new Set();

  app.innerHTML = `
    <div class="hinterhalt-seite">
      <div class="alarm"><span class="punkt"></span><span class="alarm-text">HINTERHALT · ${escapeHtml(gespinst.name)} ${escapeHtml(spiel.angriff)}${ort ? ` · ${escapeHtml(ort.name)}` : ''}</span><span class="timer" id="timer">${zeit(rest)}</span></div>
      <div class="hinterhalt">
        <div class="hh-kopf">
          <a class="zurueck" href="#/ort/${chapterId}">← ${escapeHtml(ort?.name || kapitel.title)}</a>
          <h2>${spiel.icon} ${escapeHtml(spiel.titel)}</h2>
          <span class="hh-runde" id="runde">Runde 1 von ${gesamt}</span>
          <span class="hh-punkte" id="punkte">0 Punkte</span>
        </div>
        <div id="buehne"></div>
        <div class="spiel-leiste">${SPIELE.map((sp) => `<a class="spiel-kachel ${sp.id === spiel.id ? 'an' : ''}" href="#/hinterhalt/${chapterId}/${sp.id}${knotenId ? `/${knotenId}` : ''}" ${sp.id === spiel.id ? 'aria-current="true"' : ''}><span>${sp.icon}</span>${escapeHtml(sp.titel)}</a>`).join('')}</div>
      </div>
    </div>`;
  const buehne = app.querySelector('#buehne');
  const timerEl = app.querySelector('#timer');
  const rundeEl = app.querySelector('#runde');
  const punkteEl = app.querySelector('#punkte');

  function zeit(sek) {
    return `${Math.floor(sek / 60)}:${String(sek % 60).padStart(2, '0')}`;
  }

  function start() {
    buehne.innerHTML = `<section class="schritt auftritt hinterhalt-start">
      <div class="duell-buehne">${sigilSvg(stimme.gespinstId || 'knoten', { groesse: 110, klasse: 'sigil-gross', titel: gespinst.name })}
        <div><h3>${escapeHtml(gespinst.name)} ${escapeHtml(spiel.angriff)}.</h3>
        <p>${escapeHtml(spiel.text)} <strong>${gesamt} Runden in ${spiel.zeit} Sekunden.</strong> ${istSturm ? 'Nur Aufgaben dieses Ortes, als Warm-up vor dem Duell.' : 'Aufgaben aus allen befreiten Orten, fällige zuerst.'}</p>
        <p style="color:var(--muted);font-size:0.9rem">Sterne: ab 40 % einer, ab 70 % zwei, ab 90 % drei. ${istKnoten && !schonGespielt ? `XP gibt es für diesen Hinterhalt einmal: ${XP.hinterhalt} + ${XP.hinterhaltStern} je Stern.` : 'Dieser Durchgang bringt Sterne und Rekorde, keine neuen XP.'}</p>
        <div class="schritt-buttons"><button class="btn btn-primaer btn-gross" type="button" id="los">Los →</button></div></div>
      </div></section>`;
    buehne.querySelector('#los').addEventListener('click', () => {
      sound.klick();
      laeuft = true;
      timer = setInterval(() => {
        rest--;
        timerEl.textContent = zeit(rest);
        timerEl.classList.toggle('knapp', rest <= 10);
        if (rest <= 10 && rest > 0) sound.tick();
        if (rest <= 0) ende();
      }, 1000);
      zeigeRunde();
    });
  }

  function weiterNach(ms = 700) {
    setTimeout(() => {
      if (!laeuft) return;
      index++;
      zeigeRunde();
    }, ms);
  }

  function zeigeRunde() {
    if (!laeuft) return;
    if (index >= gesamt) return ende();
    rundeEl.textContent = `Runde ${index + 1} von ${gesamt}`;
    const a = aufgabenRunde[index];
    buehne.innerHTML = '';
    const karte = document.createElement('section');
    karte.className = `schritt schritt-${a.type || 'wahr'} slide-vor hinterhalt-karte`;
    buehne.appendChild(karte);
    if (a.konzept) konzepte.add(a.konzept);
    let versucht = false;
    let fertig = false;

    if (spiel.typ === 'quiz') {
      karte.innerHTML = `<div class="schritt-art">👉 Wahr oder Lüge</div><div class="schritt-inhalt wahr-frage">${md(a.frage)}</div>
        <div class="wahr-aussage">${md(a.antwort)}</div>
        <div class="wahr-knoepfe"><button class="btn btn-sekundaer btn-gross" type="button" data-w="1">✔ Wahr</button><button class="btn btn-sekundaer btn-gross" type="button" data-w="0">✘ Lüge</button></div>`;
      karte.querySelectorAll('.wahr-knoepfe button').forEach((b) => {
        b.addEventListener('click', () => {
          if (fertig) return;
          fertig = true;
          const gesagt = b.dataset.w === '1';
          const ok = gesagt === a.wahr;
          karte.querySelectorAll('.wahr-knoepfe button').forEach((x) => (x.disabled = true));
          b.classList.add(ok ? 'richtig' : 'falsch');
          frageGestellt(a.id);
          if (a.konzept) leitnerAntwort(getState(), a.konzept, ok);
          if (ok) {
            richtig++;
            punkte += 2;
            sound.richtig();
          } else {
            zaehle('wrong');
            sound.falsch();
            const spott = stimme.fehler(1);
            if (spott) blaseEinhaengen(karte, spott.id, spott.text, { art: 'spott', klein: true });
          }
          const r = document.createElement('div');
          r.className = `rueckmeldung ${ok ? 'rueckmeldung-ok' : 'rueckmeldung-fehler'}`;
          r.innerHTML = `<strong>${ok ? 'Richtig.' : a.wahr ? 'Das war wahr.' : 'Das war eine Lüge.'}</strong> ${a.erklaerung ? md(a.erklaerung) : ''}`;
          karte.appendChild(r);
          punkteEl.textContent = `${punkte} Punkte`;
          weiterNach(ok ? 900 : 1800);
        });
      });
      return;
    }

    renderStep(karte, a, {
      hints: false,
      allowSolution: false,
      solved: () => {
        if (fertig) return;
        fertig = true;
        frageGestellt(a.id);
        if (a.konzept) leitnerAntwort(getState(), a.konzept, !versucht);
        if (!versucht) {
          richtig++;
          punkte += spiel.typ === 'pair' ? 4 : 2;
          sound.richtig();
          if (richtig % 3 === 0) {
            const lob = stimme.erfolg();
            if (lob) blaseEinhaengen(karte, lob.id, lob.text, { art: 'lob', pose: lob.pose, klein: true });
          }
        }
        punkteEl.textContent = `${punkte} Punkte`;
        weiterNach(900);
      },
      wrong: () => {
        if (!versucht) {
          versucht = true;
          zaehle('wrong');
          sound.falsch();
          const spott = stimme.fehler(1);
          if (spott) blaseEinhaengen(karte, spott.id, spott.text, { art: 'spott', klein: true });
        }
      },
    });
  }

  async function ende() {
    if (!laeuft && index < gesamt && rest > 0) return;
    laeuft = false;
    clearInterval(timer);
    const sterne = sterneFuer(richtig, gesamt);
    const eintrag = knotenId ? hinterhaltSpeichern(chapterId, knotenId, { spiel: spiel.id, punkte, max: gesamt, sterne }) : null;
    if (!knotenId) {
      const s = getState();
      s.hinterhalte.rekorde[spiel.id] = Math.max(s.hinterhalte.rekorde[spiel.id] || 0, punkte);
      hinterhaltSpeichern(chapterId, `frei-${spiel.id}`, { spiel: spiel.id, punkte, max: gesamt, sterne });
    }
    let erg = { xp: 0 };
    if (istKnoten && !schonGespielt) erg = vergibXp(XP.hinterhalt + sterne * XP.hinterhaltStern, { key: `${chapterId}#${knotenId}` });
    const neu = meilensteinePruefen({ ereignis: 'hinterhalt' });
    const konzepteAlle = await loadKonzepte().catch(() => []);
    const verteidigt = [...konzepte].slice(0, 3).map((id) => konzepteAlle.find((k) => k.id === id)).filter(Boolean);
    const naechsteLektion = istKnoten ? naechsteNachKnoten(kapitel, knotenId) : null;
    const spott = sterne === 0 ? stimme.fehler(4) : null;
    const rueckzug = sterne >= 2 ? stimme.rueckzug() : null;
    buehne.innerHTML = `<section class="schritt spiel-ergebnis auftritt">
      <div class="sterne-gross">${[1, 2, 3].map((n) => `<span class="stern ${n <= sterne ? '' : 'leer'}">★</span>`).join('')}</div>
      <div class="gross">${richtig} / ${gesamt}</div>
      <h2>${sterne === 3 ? `${escapeHtml(gespinst.name)} zieht sich zurück!` : sterne >= 1 ? 'Hinterhalt abgewehrt' : 'Das Gespinst hat dich erwischt'}</h2>
      <p style="color:var(--muted)">${punkte} Punkte · ${rest > 0 ? `${rest} Sekunden übrig` : 'Zeit abgelaufen'}${eintrag && eintrag.punkte > punkte ? ` · dein Rekord hier: ${eintrag.punkte}` : ''}</p>
      ${rueckzug ? `<div class="figur-blase figur-blase-spott an" style="--f:${escapeHtml(gespinst.farbe)}">${sigilSvg(stimme.gespinstId, { groesse: 44 })}<div class="figur-blase-text"><b>${escapeHtml(gespinst.name)}</b>${escapeHtml(rueckzug.text)}</div></div>` : ''}
      ${spott ? `<div class="figur-blase figur-blase-spott an" style="--f:${escapeHtml(gespinst.farbe)}">${sigilSvg(stimme.gespinstId, { groesse: 44 })}<div class="figur-blase-text"><b>${escapeHtml(gespinst.name)}</b>${escapeHtml(spott.text)}</div></div>` : ''}
      ${erg.xp ? `<div class="abschluss-xp">+${erg.xp} XP</div>` : ''}
      ${verteidigt.length ? `<div class="merksaetze"><h3>🛡️ Das hast du verteidigt</h3><ul>${verteidigt.map((k) => `<li><b>${escapeHtml(k.titel)}:</b> ${escapeHtml(k.merke || k.kurz || '')} <button class="btn btn-geist btn-klein nachlesen-konzept" type="button" data-id="${escapeHtml(k.id)}">📖</button></li>`).join('')}</ul></div>` : ''}
      <div class="abschluss-buttons">
        ${naechsteLektion ? `<a class="btn btn-primaer" href="#/lektion/${chapterId}/${naechsteLektion}">Weiter im Ort →</a>` : istSturm ? `<a class="btn btn-primaer" href="#/duell/${chapterId}">Zum Duell →</a>` : ''}
        <a class="btn btn-sekundaer" href="#/hinterhalt/${chapterId}/${spiel.id}${knotenId ? `/${knotenId}` : ''}" onclick="setTimeout(()=>location.reload(),0)">Nochmal</a>
        <a class="btn btn-geist" href="#/ort/${chapterId}">Zum Ort</a>
      </div>
    </section>`;
    buehne.querySelectorAll('.nachlesen-konzept').forEach((b) => b.addEventListener('click', () => oeffneNachschlagen({ tab: 'spickzettel', fokus: b.dataset.id, konzeptIds: [b.dataset.id] })));
    if (sterne >= 2) konfetti(sterne === 3 ? 'gross' : 'mittel');
    sound.fanfare();
    verarbeiteXp(erg, buehne);
    meldeMeilensteine(neu);
  }

  start();
  return { destroy: () => clearInterval(timer) };
}

// Die Lektion nach einem Knoten (h<i> sitzt nach Lektion i)
function naechsteNachKnoten(kapitel, knotenId) {
  const i = Number(String(knotenId).replace('h', ''));
  if (Number.isNaN(i)) return null;
  for (let j = 0; j < kapitel.lessons.length; j++) if (hinterhaltKnotenId(kapitel, j) === knotenId) return kapitel.lessons[j + 1] || null;
  return null;
}

// Freies Spielen: Übersicht der fünf Spiele für einen Ort
async function auswahl(app, kapitel, ort, gespinst) {
  const s = getState();
  app.innerHTML = `
    <div class="auftritt">
      <a class="zurueck" href="#/ort/${kapitel.id}">← ${escapeHtml(ort?.name || kapitel.title)}</a>
      <h1 style="margin-top:0.5rem">🕸 Hinterhalte</h1>
      <p style="color:var(--ink-2);max-width:60ch">Fünf kurze Spiele gegen die Uhr, mit Aufgaben aus allen befreiten Orten. Fällige Wiederholungen kommen zuerst. Jederzeit, so oft du willst.</p>
      <div class="backstage-grid">
        ${SPIELE.map((sp) => `<div class="karte spiel-karte">
          <div class="icon">${sp.icon}</div>
          <h2>${escapeHtml(sp.titel)}</h2>
          <p style="color:var(--ink-2)">${escapeHtml(sp.text)} ${sp.runden} Runden, ${sp.zeit} Sekunden.</p>
          <div class="highscore">Rekord: ${s.hinterhalte.rekorde[sp.id] || 0} Punkte</div>
          <a class="btn btn-primaer" href="#/hinterhalt/${kapitel.id}/${sp.id}">Spielen →</a>
        </div>`).join('')}
      </div>
    </div>`;
  void gespinst;
}
