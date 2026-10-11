// Crew-Embleme: prozedural erzeugte SVG-Abzeichen für die 18 Gegner-Crews und die
// Nachtschicht. Jede Crew bekommt aus Runde und Farbe eine eigene Form (Schild,
// Sechseck, Raute, Kreis, Achteck), ein Wappenmuster und ihr Icon. Wird überall
// benutzt, wo früher nur ein Emoji im Kreis stand: Turnierplan, Runde, Match,
// Trophäenwand, Zwischenspiele, Vorspann.

import { escapeHtml } from './markdown.js';

const FORMEN = ['schild', 'hex', 'raute', 'kreis', 'achteck'];

function pfadFuer(form) {
  switch (form) {
    case 'schild':
      return 'M50 4 L92 18 V50 C92 74 72 90 50 97 C28 90 8 74 8 50 V18 Z';
    case 'hex':
      return 'M50 3 L91 26 V74 L50 97 L9 74 V26 Z';
    case 'raute':
      return 'M50 3 L95 50 L50 97 L5 50 Z';
    case 'achteck':
      return 'M32 4 H68 L96 32 V68 L68 96 H32 L4 68 V32 Z';
    default:
      return 'M50 3 A47 47 0 1 1 49.9 3 Z';
  }
}

function muster(art, farbe, uid) {
  switch (art) {
    case 0: // Streifen
      return `<pattern id="m-${uid}" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="6" height="12" fill="${farbe}" opacity="0.14"/></pattern>`;
    case 1: // Punkte
      return `<pattern id="m-${uid}" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.6" fill="${farbe}" opacity="0.22"/></pattern>`;
    case 2: // Raster
      return `<pattern id="m-${uid}" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M14 0 H0 V14" fill="none" stroke="${farbe}" stroke-opacity="0.18"/></pattern>`;
    default: // Winkel
      return `<pattern id="m-${uid}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M0 16 L8 8 L16 16" fill="none" stroke="${farbe}" stroke-opacity="0.2" stroke-width="2"/></pattern>`;
  }
}

let zaehler = 0;

/**
 * emblemSvg({ farbe, icon, runde, kuerzel, form, raus, groesse, titel })
 * - farbe: Crew-Farbe (Hex)
 * - icon: Emoji der Crew (optional)
 * - runde: Rundennummer (steuert Form und Muster, wird als kleine Marke gezeigt)
 * - kuerzel: Text statt Icon (z. B. „N7“)
 * - raus: true → ausgegraut („raus“)
 * - groesse: CSS-Größe (Zahl in px oder String), Standard 64
 */
export function emblemSvg({ farbe = '#ff8a3d', icon = '', runde = null, kuerzel = '', form = null, raus = false, groesse = 64, titel = '', klasse = '' } = {}) {
  const uid = `e${++zaehler}`;
  const f = form || FORMEN[((runde || 1) - 1) % FORMEN.length];
  const musterArt = ((runde || 1) * 7) % 4;
  const size = typeof groesse === 'number' ? `${groesse}px` : groesse;
  const inhalt = kuerzel
    ? `<text x="50" y="58" text-anchor="middle" font-family="Unbounded Variable, sans-serif" font-weight="800" font-size="30" fill="#fff" style="paint-order:stroke" stroke="rgba(0,0,0,0.35)" stroke-width="2">${escapeHtml(kuerzel)}</text>`
    : `<text x="50" y="62" text-anchor="middle" font-size="40">${icon}</text>`;
  return `<svg class="emblem ${raus ? 'emblem-raus' : ''} ${klasse}" viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(titel)}" style="--farbe:${escapeHtml(farbe)}">
    <defs>
      <linearGradient id="g-${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${farbe}" stop-opacity="0.55"/><stop offset="1" stop-color="${farbe}" stop-opacity="0.12"/></linearGradient>
      <radialGradient id="r-${uid}" cx="0.5" cy="0.3" r="0.8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
      ${muster(musterArt, farbe, uid)}
      <clipPath id="c-${uid}"><path d="${pfadFuer(f)}"/></clipPath>
    </defs>
    <path d="${pfadFuer(f)}" fill="#0b0d16"/>
    <path d="${pfadFuer(f)}" fill="url(#g-${uid})"/>
    <g clip-path="url(#c-${uid})"><rect width="100" height="100" fill="url(#m-${uid})"/><rect width="100" height="100" fill="url(#r-${uid})"/></g>
    <path d="${pfadFuer(f)}" fill="none" stroke="${farbe}" stroke-width="3.5"/>
    <path d="${pfadFuer(f)}" fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1" transform="translate(50 50) scale(0.88) translate(-50 -50)"/>
    ${inhalt}
    ${runde ? `<g><rect x="34" y="82" width="32" height="14" rx="7" fill="#0b0d16" stroke="${farbe}" stroke-width="1.5"/><text x="50" y="92.5" text-anchor="middle" font-family="Unbounded Variable, sans-serif" font-weight="700" font-size="9" fill="${farbe}">R${runde}</text></g>` : ''}
  </svg>`;
}

// Emblem einer Gegner-Crew aus crews.json (Runde-Objekt)
export function crewEmblem(runde, opts = {}) {
  if (!runde) return emblemSvg({ farbe: '#2a3150', kuerzel: '?', ...opts });
  return emblemSvg({ farbe: runde.farbe, icon: runde.icon, runde: runde.runde, titel: `${runde.crew} (Runde ${runde.runde})`, ...opts });
}

// Emblem der eigenen Crew (Nachtschicht): Mond-Sichel statt Emoji
export function nachtschichtEmblem({ groesse = 64, titel = 'Nachtschicht', klasse = '' } = {}) {
  const uid = `n${++zaehler}`;
  const size = typeof groesse === 'number' ? `${groesse}px` : groesse;
  return `<svg class="emblem emblem-crew ${klasse}" viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(titel)}" style="--farbe:#ff8a3d">
    <defs>
      <linearGradient id="g-${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a3d" stop-opacity="0.6"/><stop offset="1" stop-color="#38c7ff" stop-opacity="0.25"/></linearGradient>
      <radialGradient id="m-${uid}"><stop offset="0" stop-color="#ffc857"/><stop offset="1" stop-color="#ff8a3d"/></radialGradient>
    </defs>
    <path d="M50 4 L92 18 V50 C92 74 72 90 50 97 C28 90 8 74 8 50 V18 Z" fill="#0b0d16"/>
    <path d="M50 4 L92 18 V50 C92 74 72 90 50 97 C28 90 8 74 8 50 V18 Z" fill="url(#g-${uid})"/>
    <path d="M50 4 L92 18 V50 C92 74 72 90 50 97 C28 90 8 74 8 50 V18 Z" fill="none" stroke="#ff8a3d" stroke-width="3.5"/>
    <path d="M58 26 A22 22 0 1 0 58 74 A17 17 0 1 1 58 26 Z" fill="url(#m-${uid})"/>
    <circle cx="68" cy="34" r="2.2" fill="#fff"/><circle cx="76" cy="46" r="1.6" fill="#fff" opacity="0.8"/><circle cx="70" cy="58" r="1.4" fill="#fff" opacity="0.7"/>
    <text x="50" y="86" text-anchor="middle" font-family="Unbounded Variable, sans-serif" font-weight="800" font-size="8" fill="#ffc857" letter-spacing="1">HALLE 7</text>
  </svg>`;
}
