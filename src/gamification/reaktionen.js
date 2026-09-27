// Reaktionen im Turnier: kleine Sprechblasen unten rechts. Die Gegner-Crew
// spottet beim ersten Fehlversuch, die Nachtschicht tröstet beim zweiten und
// jubelt bei Serien und Comebacks. Nie mehr als eine Blase zugleich, mit Abkühlzeit,
// damit die Reaktionen nicht nerven.

import { loadCrews } from '../content.js';
import { escapeHtml } from '../engine/markdown.js';

const robbyBild = (pose) => new URL(`figuren/robby/${pose}.png`, document.baseURI).href;

let aktiv = null;
let timer = null;

export function zeigeReaktion({ name, text, farbe = '#ff8a3d', icon = null, bild = null, kurz = '?', art = 'crew', dauer = 4500 }) {
  if (!text) return null;
  reaktionenEntfernen();
  const el = document.createElement('div');
  el.className = `reaktion reaktion-${art}`;
  el.style.setProperty('--farbe', farbe);
  el.setAttribute('role', 'status');
  el.innerHTML = `<div class="reaktion-bild">${bild ? `<img src="${bild}" alt="">` : icon ? `<span>${icon}</span>` : `<b>${escapeHtml(kurz)}</b>`}</div>
    <div><div class="reaktion-name">${escapeHtml(name)}</div><div class="reaktion-text">${escapeHtml(text)}</div></div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('an'));
  aktiv = el;
  timer = setTimeout(() => {
    el.classList.remove('an');
    setTimeout(() => el.remove(), 400);
    if (aktiv === el) aktiv = null;
  }, dauer);
  return el;
}

export function reaktionenEntfernen() {
  clearTimeout(timer);
  if (aktiv) aktiv.remove();
  aktiv = null;
}

function zufall(liste, nicht) {
  if (!liste?.length) return null;
  const textVon = (x) => (typeof x === 'string' ? x : x?.text);
  let kandidaten = liste.filter((x) => textVon(x) !== nicht);
  if (!kandidaten.length) kandidaten = liste;
  return kandidaten[Math.floor(Math.random() * kandidaten.length)];
}

// Ticker für eine Runde (= Kapitel): weiß, wer der Gegner ist, und entscheidet, wann wer etwas sagt.
export async function erzeugeTicker(chapterId, { abkuehlung = 20000 } = {}) {
  const daten = await loadCrews().catch(() => null);
  const runde = daten?.runden.find((r) => r.chapter === chapterId) || null;
  const crew = daten?.crew || null;
  let zuletzt = 0;
  let letzterText = null;

  const mitglied = (id) => crew?.mitglieder?.[id] || { name: id, farbe: '#ff8a3d' };
  const sagCrew = (eintrag) => {
    if (!eintrag || !crew) return;
    const m = mitglied(eintrag.wer);
    zeigeReaktion({ name: `${m.name} · ${crew.name}`, text: eintrag.text, farbe: m.farbe, bild: eintrag.wer === 'robby' ? robbyBild(eintrag.pose || 'gut-gemacht') : null, kurz: m.name[0], art: 'crew' });
    zuletzt = Date.now();
    letzterText = eintrag.text;
  };
  const sagGegner = (text, dauer) => {
    if (!runde || !text) return;
    zeigeReaktion({ name: `${runde.captain} · ${runde.crew}`, text, farbe: runde.farbe, icon: runde.icon, art: 'gegner', dauer });
    zuletzt = Date.now();
    letzterText = text;
  };
  const bereit = (min = abkuehlung) => Date.now() - zuletzt > min;

  return {
    runde,
    crew,
    turnier: daten?.turnier || null,
    // n-ter Fehlversuch bei derselben Aufgabe
    fehler(n) {
      if (n === 1 && bereit() && Math.random() < 0.7) sagGegner(zufall(runde?.spott, letzterText));
      else if (n === 2 && bereit(5000)) sagCrew(zufall(crew?.trost, letzterText));
    },
    // gelöst: `serie` = aktuelle Serie, `comeback` = nach mindestens drei Fehlversuchen
    erfolg({ serie = 0, comeback = false } = {}) {
      if (comeback) return sagCrew(zufall(crew?.jubel, letzterText));
      if (serie >= 3 && serie % 3 === 0 && bereit(8000)) sagCrew(zufall(crew?.jubel, letzterText));
      return undefined;
    },
    trash: (dauer) => sagGegner(zufall(runde?.trash, letzterText), dauer),
    spott: (dauer) => sagGegner(zufall(runde?.spott, letzterText), dauer),
    jubel: () => sagCrew(zufall(crew?.jubel, letzterText)),
    trost: () => sagCrew(zufall(crew?.trost, letzterText)),
    niederlage: () => sagGegner(runde?.niederlage, 8000),
  };
}
