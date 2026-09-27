// Trainingslager (Route #/backstage): drei Minispiele zur Wiederholung – Blitzrunde (60 s), Fehlerjagd
// (8 Runden, falsche Zeile finden) und Bühnenaufbau (Zeilen sortieren).
// Fragen kommen aus den Pools der Kapitel, die schon begonnen wurden.

import { loadAlleKapitel, poolFuer } from '../content.js';
import { getState, xpBackstage, zaehle, abzeichenPruefen, merkeCombo } from '../store.js';
import { antwort as leitnerAntwort } from '../gamification/leitner.js';
import { XP } from '../gamification/xp.js';
import { renderStep } from '../engine/steps.js';
import { escapeHtml } from '../engine/markdown.js';
import { sound } from '../gamification/sound.js';
import { konfetti, toast } from '../gamification/celebrate.js';
import { meldeAbzeichen, verarbeiteXp } from './lesson-view.js';

const SPIELE = [
  { id: 'blitz', icon: '⚡', titel: 'Blitzrunde', text: '60 Sekunden, so viele Fragen wie möglich. Richtige Antworten in Folge geben Combo-Punkte.', xp: `${XP.blitz} XP je richtige Antwort` },
  { id: 'jagd', icon: '🐞', titel: 'Fehlerjagd', text: 'In jedem Code-Schnipsel steckt ein Käfer. Finde die falsche Zeile – 8 Runden.', xp: `${XP.jagd} XP je Runde` },
  { id: 'aufbau', icon: '🏗️', titel: 'Bühnenaufbau', text: 'Bring die Code-Zeilen in die richtige Reihenfolge – 5 Runden, jede fehlerfreie zählt.', xp: `${XP.aufbau} XP je Runde` },
];

function mische(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

async function ladePool() {
  const s = getState();
  const kapitel = await loadAlleKapitel();
  const begonnen = kapitel.filter((k) => k.lessons.some((l) => s.lessons[`${k.id}/${l}`]?.done)).map((k) => k.id);
  const ids = begonnen.length ? begonnen : [kapitel[0].id];
  return poolFuer(ids);
}

export async function renderBackstage(app, spielId) {
  if (spielId) return spiel(app, spielId);
  const s = getState();
  const pool = await ladePool();
  const heute = new Date().toISOString().slice(0, 10);
  const xpHeute = s.backstage.tag === heute ? s.backstage.xpHeute : 0;
  app.innerHTML = `
    <div class="auftritt">
      <a class="zurueck" href="#/">← Zum Turnierplan</a>
      <h1 style="margin-top:0.5rem">🏋️ Trainingslager</h1>
      <p style="color:var(--ink-2);max-width:60ch">Hier trainiert die Nachtschicht zwischen den Runden: alles, was du schon gelernt hast – schnell, spielerisch, so oft du willst. Der Fragenvorrat wächst mit jeder Runde, die du beginnst (${pool.length} Fragen im Vorrat). Heute schon ${xpHeute} von ${XP.backstageTagesdeckel} Trainings-XP geholt.</p>
      <div class="backstage-grid">
        ${SPIELE.map((sp) => `<div class="karte spiel-karte">
          <div class="icon">${sp.icon}</div>
          <h2>${sp.titel}</h2>
          <p style="color:var(--ink-2)">${sp.text}</p>
          <div class="highscore">Bestleistung: ${s.backstage.highscores[sp.id] || 0} · ${sp.xp}</div>
          <a class="btn btn-primaer" href="#/backstage/${sp.id}">Spielen →</a>
        </div>`).join('')}
      </div>
    </div>`;
}

async function spiel(app, id) {
  const sp = SPIELE.find((x) => x.id === id);
  if (!sp) return renderBackstage(app);
  const pool = await ladePool();
  const fragen = mische(pool.filter((f) => (id === 'jagd' ? f.type === 'bug' : id === 'aufbau' ? f.type === 'order' : ['quiz', 'fill', 'pair'].includes(f.type))));
  if (fragen.length < 3) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/backstage">← Trainingslager</a><div class="karte gesperrt-karte"><h2>Noch zu wenig Vorrat</h2><p>Für dieses Spiel gibt es noch nicht genug Fragen. Schließ erst ein paar Lektionen ab.</p></div></div>`;
    return;
  }

  app.innerHTML = `
    <div class="lektion-seite">
      <div class="spiel-kopf">
        <a class="zurueck" href="#/backstage">← Trainingslager</a>
        <h1 style="margin:0;flex:1">${sp.icon} ${sp.titel}</h1>
        <span class="spiel-punkte">Punkte <strong id="punkte">0</strong> <span class="spiel-combo" id="combo"></span></span>
        <span class="spiel-timer" id="timer">${id === 'blitz' ? '60' : ''}</span>
      </div>
      <div id="buehne"></div>
    </div>`;
  const buehne = app.querySelector('#buehne');
  const punkteEl = app.querySelector('#punkte');
  const comboEl = app.querySelector('#combo');
  const timerEl = app.querySelector('#timer');
  let punkte = 0;
  let richtig = 0;
  let serie = 0;
  let index = 0;
  let laeuft = true;
  let timer = null;
  const runden = id === 'blitz' ? Infinity : id === 'jagd' ? 8 : 5;
  const start = Date.now();
  let rest = 60;

  function zeigeFrage() {
    if (!laeuft) return;
    if (index >= Math.min(runden, fragen.length)) return ende();
    const f = fragen[index % fragen.length];
    buehne.innerHTML = '';
    const karte = document.createElement('section');
    karte.className = `schritt schritt-${f.type} slide-vor`;
    buehne.appendChild(karte);
    let versucht = false;
    let fertig = false;
    const weiterKnopf = () => {
      const zeile = document.createElement('div');
      zeile.className = 'schritt-buttons';
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn-primaer';
      b.textContent = 'Weiter →';
      b.addEventListener('click', () => {
        index++;
        zeigeFrage();
      });
      zeile.appendChild(b);
      karte.appendChild(zeile);
      b.focus();
      if (id === 'blitz') setTimeout(() => { if (!fertig2) b.click(); }, 1200);
    };
    let fertig2 = false;
    renderStep(karte, f, {
      solved: () => {
        if (fertig) return;
        fertig = true;
        if (!versucht) {
          serie++;
          richtig++;
          merkeCombo(serie);
          zaehle('correct');
          const bonus = serie >= 6 ? 3 : serie >= 3 ? 2 : 1;
          punkte += bonus;
          sound.richtig();
          leitnerAntwort(getState(), f.konzept, true);
        } else {
          leitnerAntwort(getState(), f.konzept, false);
        }
        punkteEl.textContent = punkte;
        comboEl.textContent = serie >= 3 ? `🔥 ×${serie >= 6 ? 3 : 2}` : '';
        weiterKnopf();
      },
      wrong: () => {
        if (!versucht) {
          versucht = true;
          serie = 0;
          zaehle('wrong');
          sound.falsch();
          comboEl.textContent = '';
          if (id !== 'blitz') {
            const h = document.createElement('div');
            h.className = 'rueckmeldung rueckmeldung-fehler';
            h.textContent = 'Daneben – diese Runde zählt nicht. Finde trotzdem die Lösung, dann geht es weiter.';
            karte.appendChild(h);
          }
        }
      },
    });
    if (id === 'blitz' && f.type !== 'pair') {
      // Bei der Blitzrunde nach falscher Antwort sofort weiter (Zeit ist knapp)
      karte.addEventListener('click', (e) => {
        if (versucht && !fertig && e.target.closest('.quiz-option, .btn')) {
          setTimeout(() => {
            if (!fertig) {
              fertig = true;
              index++;
              zeigeFrage();
            }
          }, 600);
        }
      }, true);
    }
  }

  function ende() {
    laeuft = false;
    clearInterval(timer);
    const s = getState();
    const wert = id === 'blitz' ? richtig : id === 'jagd' ? richtig : richtig;
    const alt = s.backstage.highscores[id] || 0;
    const rekord = wert > alt;
    if (rekord) s.backstage.highscores[id] = wert;
    const xpBetrag = id === 'blitz' ? richtig * XP.blitz : id === 'jagd' ? richtig * XP.jagd : richtig * XP.aufbau;
    const erg = xpBackstage(xpBetrag);
    const neu = abzeichenPruefen({ ereignis: 'backstage' });
    const dauer = Math.round((Date.now() - start) / 1000);
    buehne.innerHTML = `<section class="schritt spiel-ergebnis auftritt">
      <div class="gross">${richtig}</div>
      <h2>${id === 'blitz' ? 'richtige Antworten in 60 Sekunden' : `von ${Math.min(runden, fragen.length)} Runden geschafft`}</h2>
      <p style="color:var(--muted)">${rekord ? '🏆 Neue Bestleistung!' : `Bestleistung: ${alt}`} · ${punkte} Punkte · ${dauer} s</p>
      ${erg.xp ? `<div class="abschluss-xp">+${erg.xp} XP${erg.gedeckelt ? ' (Tagesdeckel erreicht)' : ''}</div>` : '<p style="color:var(--muted)">Tagesdeckel erreicht – heute gibt es keine Backstage-XP mehr, üben lohnt sich trotzdem.</p>'}
      <div class="abschluss-buttons">
        <a class="btn btn-primaer" href="#/backstage/${id}" onclick="setTimeout(()=>location.reload(),0)">Nochmal</a>
        <a class="btn btn-sekundaer" href="#/backstage">Andere Spiele</a>
        <a class="btn btn-geist" href="#/">Zum Turnierplan</a>
      </div>
    </section>`;
    if (richtig >= 3) konfetti(rekord ? 'gross' : 'mittel');
    sound.fanfare();
    verarbeiteXp(erg, buehne);
    meldeAbzeichen(neu);
  }

  if (id === 'blitz') {
    timer = setInterval(() => {
      rest--;
      timerEl.textContent = rest;
      timerEl.classList.toggle('knapp', rest <= 10);
      if (rest <= 10 && rest > 0) sound.tick();
      if (rest <= 0) ende();
    }, 1000);
  } else {
    timerEl.textContent = '';
  }
  zeigeFrage();

  return { destroy: () => clearInterval(timer) };
}
