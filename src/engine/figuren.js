// Figuren in Lektionen, Hinterhalten und Duellen: Das Gespinst des Ortes spottet bei
// Fehlern (feste Reihenfolge, immer deutlicherer Hinweis), die Verbündeten loben bei
// Lösungen. Texte aus public/content/story/figuren.json, Bilder/Sigille aus sigil.js.

import { loadFiguren, ortFuer } from '../content.js';
import { vorgestellt, setVorgestellt } from '../store.js';
import { escapeHtml } from './markdown.js';
import { figurBild } from './sigil.js';

let daten = null;

export async function ladeFiguren() {
  if (!daten) daten = await loadFiguren();
  return daten;
}

export function figur(id) {
  return daten?.figuren?.[id] || null;
}

export function istGespinst(id) {
  return figur(id)?.rolle === 'gespinst';
}

function zufall(liste, nicht = null) {
  if (!liste?.length) return null;
  const k = liste.filter((x) => (x.text || x) !== nicht);
  const l = k.length ? k : liste;
  return l[Math.floor(Math.random() * l.length)];
}

/**
 * blaseHtml(id, text, { art: 'lob' | 'spott' | 'rede', pose, klein, meta })
 * Eine Sprechblase mit Figur (Bild/Avatar/Sigil), Name, Rolle und Text.
 */
export function blaseHtml(id, text, { art = 'rede', pose = 'neutral', klein = false, meta = '' } = {}) {
  const f = figur(id) || { name: id, titel: '', farbe: '#e23cff' };
  return `<div class="figur-blase figur-blase-${art} ${klein ? 'klein' : ''}" style="--f:${escapeHtml(f.farbe || '#e23cff')}" role="status">
    ${figurBild(id, { pose, groesse: klein ? 44 : 56, titel: f.name })}
    <div class="figur-blase-text"><b>${escapeHtml(f.name)}${f.titel ? ` · ${escapeHtml(f.titel)}` : ''}${meta ? ` · ${escapeHtml(meta)}` : ''}</b>${escapeHtml(text)}</div>
  </div>`;
}

/**
 * Stimme eines Ortes: weiß, welches Gespinst dort haust und welche Verbündeten dabei sind.
 * fehler(n): Spott beim n-ten Fehlversuch derselben Aufgabe (Reihenfolge, letzter wiederholt sich)
 * erfolg(): Lob eines Verbündeten
 */
export async function stimmeFuer(chapterId) {
  await ladeFiguren();
  const ort = await ortFuer(chapterId).catch(() => null);
  const gespinstId = ort?.gespinst || null;
  const verbuendete = ort?.verbuendete?.length ? ort.verbuendete : ['sam', 'robby'];
  let letztesLob = null;
  return {
    ort,
    gespinstId,
    gespinst: figur(gespinstId),
    verbuendete,
    // Vorstellung beim ersten Auftritt (einmal pro Gespinst)
    vorstellung() {
      const g = figur(gespinstId);
      if (!g || vorgestellt(gespinstId)) return null;
      setVorgestellt(gespinstId);
      return g.vorstellung || null;
    },
    fehler(n = 1) {
      const g = figur(gespinstId);
      if (!g?.spott?.length) return null;
      const text = g.spott[Math.min(n, g.spott.length) - 1];
      return { id: gespinstId, text, versuch: n };
    },
    erfolg() {
      const wer = verbuendete[Math.floor(Math.random() * verbuendete.length)];
      const f = figur(wer);
      const eintrag = zufall(f?.lob || [], letztesLob);
      if (!eintrag) return null;
      letztesLob = eintrag.text;
      return { id: wer, text: eintrag.text, pose: eintrag.pose || 'gut-gemacht' };
    },
    rueckzug() {
      const g = figur(gespinstId);
      return g?.rueckzug?.length ? { id: gespinstId, text: zufall(g.rueckzug) } : null;
    },
  };
}

// Blase in eine Karte einhängen (ersetzt eine vorherige derselben Art)
export function blaseEinhaengen(karte, id, text, opts = {}) {
  if (!text) return null;
  karte.querySelectorAll(`.figur-blase-${opts.art || 'rede'}`).forEach((e) => e.remove());
  const el = document.createElement('div');
  el.innerHTML = blaseHtml(id, text, opts);
  const blase = el.firstElementChild;
  const ziel = karte.querySelector('.schritt-buttons');
  if (ziel) karte.insertBefore(blase, ziel);
  else karte.appendChild(blase);
  requestAnimationFrame(() => blase.classList.add('an'));
  return blase;
}
