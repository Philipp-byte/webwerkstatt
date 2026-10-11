// Sigille und Figurenbilder. Jede Figur aus figuren.json hat ein flaches SVG-Sigil
// (Gespinste, Seidra) oder einen Buchstaben-Avatar (Verbündete). Liegt unter
// public/figuren/<id>/<pose>.webp ein gezeichnetes Bild (scripts/grafiken-erzeugen.mjs),
// wird es bevorzugt – das Manifest public/figuren/manifest.json sagt, welche es gibt.

import { escapeHtml } from './markdown.js';

// Innenleben der Sigille (viewBox 0 0 100 100). currentColor = Figurenfarbe.
const SIGILLE = {
  knoten: '<path d="M20 55 C 20 20, 60 20, 60 50 S 30 85, 45 60 S 85 30, 75 60 S 40 90, 30 70" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><circle cx="38" cy="42" r="4" fill="#fff"/><circle cx="56" cy="40" r="4" fill="#fff"/>',
  krakel: '<path d="M15 30 l12 -10 12 12 12 -12 12 12 12 -12 10 10 M15 55 l14 -8 14 8 14 -8 14 8 14 -8 M18 78 l12 -6 12 6 12 -6 12 6 12 -6" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="42" cy="47" r="4" fill="#fff"/><circle cx="60" cy="47" r="4" fill="#fff"/>',
  luecke: '<circle cx="50" cy="52" r="34" fill="currentColor"/><path d="M50 52 m-19 -4 l8 -9 6 7 7 -9 7 8 5 -5 4 10 -5 8 -8 4 -7 -3 -6 5 -8 -4 z" fill="#09071a"/><circle cx="36" cy="30" r="4" fill="#fff"/><circle cx="64" cy="30" r="4" fill="#fff"/>',
  zerr: '<g fill="none" stroke="currentColor" stroke-width="5"><path d="M18 25 L85 20 M15 45 L82 48 M20 68 L88 62 M12 85 L80 88"/><path d="M28 15 L22 92 M50 12 L58 90 M72 16 L66 94"/></g><circle cx="40" cy="55" r="4" fill="#fff"/><circle cx="60" cy="55" r="4" fill="#fff"/>',
  schwindel: '<path d="M50 12 C 22 12, 14 40, 20 62 C 26 82, 38 92, 50 92 Z" fill="currentColor"/><path d="M50 12 C 78 12, 86 40, 80 62 C 74 82, 62 92, 50 92 Z" fill="currentColor" opacity="0.55"/><circle cx="36" cy="44" r="5" fill="#fff"/><circle cx="64" cy="44" r="5" fill="#fff"/><path d="M30 66 q10 8 18 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M52 70 q10 -8 18 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
  blass: '<path d="M24 90 V48 a26 26 0 0 1 52 0 V90 l-9 -8 -8 8 -9 -8 -9 8 -9 -8 z" fill="currentColor"/><path d="M36 46 h10 M54 46 h10" stroke="#1a1630" stroke-width="4" stroke-linecap="round"/>',
  streu: '<g fill="currentColor"><circle cx="24" cy="26" r="7"/><circle cx="60" cy="18" r="5"/><circle cx="82" cy="40" r="8"/><circle cx="44" cy="48" r="10"/><circle cx="20" cy="66" r="6"/><circle cx="70" cy="70" r="9"/><circle cx="46" cy="84" r="5"/></g><g fill="#fff"><circle cx="42" cy="46" r="3"/><circle cx="48" cy="46" r="3"/><circle cx="68" cy="68" r="2.5"/><circle cx="73" cy="68" r="2.5"/></g>',
  quetsch: '<rect x="12" y="34" width="76" height="34" rx="6" fill="currentColor"/><path d="M12 40 h76 M12 62 h76" stroke="#1a1630" stroke-opacity="0.5" stroke-width="3"/><path d="M34 46 l10 4 M66 46 l-10 4" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="55" r="3.5" fill="#fff"/><circle cx="60" cy="55" r="3.5" fill="#fff"/>',
  starr: '<path d="M50 10 l34 20 v40 l-34 20 -34 -20 v-40 z" fill="currentColor"/><path d="M50 10 v80 M16 30 l34 20 34 -20" fill="none" stroke="#0f0c1f" stroke-width="3"/><path d="M38 58 l8 -10 -4 -8 M62 60 l-6 -12" fill="none" stroke="#fff" stroke-width="3"/><circle cx="40" cy="66" r="3" fill="#0f0c1f"/><circle cx="60" cy="66" r="3" fill="#0f0c1f"/>',
  seidra: '<g stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round"><path d="M40 50 L14 30 L8 14 M40 56 L10 54 M40 62 L12 80 M44 66 L30 92"/><path d="M60 50 L86 30 L92 14 M60 56 L90 54 M60 62 L88 80 M56 66 L70 92"/></g><ellipse cx="50" cy="64" rx="18" ry="22" fill="currentColor"/><circle cx="50" cy="38" r="12" fill="currentColor"/><path d="M40 28 l4 -10 6 8 6 -8 4 10" fill="#ffc53d"/><circle cx="45" cy="38" r="3" fill="#ff4d6d"/><circle cx="55" cy="38" r="3" fill="#ff4d6d"/><circle cx="43" cy="33" r="1.6" fill="#ff4d6d"/><circle cx="57" cy="33" r="1.6" fill="#ff4d6d"/>',
  funke: '<path d="M50 8 l9 28 28 9 -28 9 -9 28 -9 -28 -28 -9 28 -9 z" fill="currentColor"/><circle cx="50" cy="54" r="8" fill="#1a1200"/>',
};

const FARBEN = { sam: '#ffc53d', ayla: '#3fb0ff', jonas: '#9b8cff', robby: '#2ee59d', knoten: '#e23cff', krakel: '#ff5fd0', luecke: '#c43cff', zerr: '#ff3cb0', schwindel: '#b04dff', blass: '#9a93b8', streu: '#d14bff', quetsch: '#ff4d8d', starr: '#5fc8ff', seidra: '#e23cff', funke: '#ffc53d' };
const KURZ = { sam: 'S', ayla: 'A', jonas: 'J', robby: 'R' };
const ROBBY_POSEN = ['erfolg-pokal', 'erklaeren', 'gut-gemacht', 'hallo-einstieg', 'hallo-winken', 'idee-tipp', 'jubel-geschafft', 'motivation-herz', 'nachdenken', 'programmieren', 'sicherheit'];

// Verfügbare gezeichnete Bilder: "<id>/<pose>" (aus public/figuren/manifest.json)
let bilder = new Set();
let geladen = false;

export async function ladeFigurenBilder() {
  if (geladen) return bilder;
  geladen = true;
  try {
    const res = await fetch(new URL('figuren/manifest.json', document.baseURI));
    if (res.ok) {
      const m = await res.json();
      bilder = new Set(m.bilder || []);
    }
  } catch {
    /* kein Manifest – Sigille */
  }
  return bilder;
}

export function farbeVon(id) {
  return FARBEN[id] || '#e23cff';
}

export function hatBild(id, pose = 'neutral') {
  if (id === 'robby') return ROBBY_POSEN.includes(pose) || bilder.has(`robby/${pose}`);
  return bilder.has(`${id}/${pose}`);
}

function bildUrl(id, pose) {
  if (id === 'robby' && ROBBY_POSEN.includes(pose) && !bilder.has(`robby/${pose}`)) return new URL(`figuren/robby/${pose}.png`, document.baseURI).href;
  return new URL(`figuren/${id}/${pose}.webp`, document.baseURI).href;
}

/**
 * sigilSvg(id, { groesse, klasse, titel }) – flaches Sigil im Kreis (Gespinste, Seidra, Funke)
 */
export function sigilSvg(id, { groesse = 64, klasse = '', titel = '' } = {}) {
  const innen = SIGILLE[id] || SIGILLE.funke;
  const size = typeof groesse === 'number' ? `${groesse}px` : groesse;
  const art = id === 'funke' || KURZ[id] ? 'sigil-licht' : 'sigil-schatten';
  return `<span class="sigil ${art} ${klasse}" style="--f:${farbeVon(id)};width:${size};height:${size}" role="img" aria-label="${escapeHtml(titel || id)}"><svg viewBox="0 0 100 100" style="color:${farbeVon(id)}">${innen}</svg></span>`;
}

/**
 * figurBild(id, { pose, groesse, klasse, titel }) – gezeichnetes Bild, sonst Avatar/Sigil
 */
export function figurBild(id, { pose = 'neutral', groesse = 64, klasse = '', titel = '' } = {}) {
  const size = typeof groesse === 'number' ? `${groesse}px` : groesse;
  if (hatBild(id, pose) || (id === 'robby' && hatBild('robby', 'erklaeren'))) {
    const p = hatBild(id, pose) ? pose : 'erklaeren';
    return `<img class="figur-bild ${klasse}" src="${bildUrl(id, p)}" alt="${escapeHtml(titel || id)}" style="width:${size};height:${size}" loading="lazy">`;
  }
  if (KURZ[id]) {
    return `<span class="avatar ${klasse}" style="--f:${farbeVon(id)};width:${size};height:${size}" role="img" aria-label="${escapeHtml(titel || id)}">${KURZ[id]}</span>`;
  }
  return sigilSvg(id, { groesse, klasse, titel });
}

export const SIGIL_IDS = Object.keys(SIGILLE);
