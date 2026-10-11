// Die Karte von Hyperia: fünf Regionen, achtzehn Orte an der Lichtstraße, Seidras Netz
// über allem, was noch nicht befreit ist. Reines SVG, keine Bilder nötig.

import { escapeHtml } from './markdown.js';
import { sigilSvg } from './sigil.js';

// Positionen der 18 Orte (viewBox 560 × 640), von der Quelle (unten links) zum Funkenfest (oben)
export const POSITIONEN = [
  [70, 580], [150, 552], [200, 500], [160, 430], [130, 360], [175, 285], [240, 282], [300, 330], [300, 400],
  [350, 470], [400, 440], [425, 380], [395, 320], [420, 260], [455, 210], [430, 150], [440, 90], [360, 24],
];

const REGION_FLAECHEN = {
  quelle: 'M30 560 Q 60 470 150 500 Q 230 520 250 600 Q 170 640 60 620 Z',
  runenmark: 'M60 180 Q 160 120 300 200 Q 360 250 330 360 Q 250 380 150 340 Q 70 300 60 180 Z',
  kaskadia: 'M150 380 Q 260 330 400 420 Q 470 470 420 560 Q 300 600 250 520 Q 200 470 150 380 Z',
  funkenland: 'M330 60 Q 450 40 520 140 Q 540 230 470 300 Q 400 320 340 260 Q 300 180 330 60 Z',
  festgelaende: 'M400 330 Q 500 300 540 380 Q 550 450 490 470 Q 430 460 400 400 Z',
};
const REGION_LABEL = { quelle: [120, 636], runenmark: [92, 170], kaskadia: [330, 600], funkenland: [540, 500], festgelaende: null };

function pfad(bis = POSITIONEN.length) {
  let d = `M ${POSITIONEN[0][0]} ${POSITIONEN[0][1]}`;
  for (let i = 1; i < bis; i++) {
    const [x0, y0] = POSITIONEN[i - 1];
    const [x1, y1] = POSITIONEN[i];
    const dx = (x1 - x0) * 0.5;
    d += ` C ${x0 + dx} ${y0 + (y1 - y0) * 0.2}, ${x1 - dx} ${y1 - (y1 - y0) * 0.2}, ${x1} ${y1}`;
  }
  return d;
}

/**
 * karteSvg(orte, regionen, staende, { klein })
 * - orte: welt.json orte (18), regionen: welt.json regionen
 * - staende: Map chapter → { befreit, jetzt, frei }
 */
export function karteSvg(orte, regionen, staende, { klein = false } = {}) {
  const jetztIdx = orte.findIndex((o) => staende.get(o.chapter)?.jetzt);
  const befreitBis = orte.filter((o) => staende.get(o.chapter)?.befreit).length;
  const goldBis = Math.max(1, jetztIdx >= 0 ? jetztIdx + 1 : befreitBis);
  const regionenSvg = regionen
    .map((r) => `<path d="${REGION_FLAECHEN[r.id] || ''}" fill="${r.farbe}" opacity="${klein ? 0.12 : 0.14}"/>`)
    .join('');
  const labels = klein
    ? ''
    : regionen
        .map((r) => {
          const p = REGION_LABEL[r.id];
          return p ? `<text x="${p[0]}" y="${p[1]}" fill="#8b84ad" font-size="10" letter-spacing="2" text-anchor="${r.id === 'funkenland' ? 'end' : 'start'}" font-family="Unbounded Variable, sans-serif" font-weight="700">${escapeHtml(r.name.toUpperCase())}</text>` : '';
        })
        .join('');
  // Netzfäden von Seidras Position (oben) über die noch besetzten Orte
  const netz = `<g fill="none" stroke="#4a3a7a" stroke-width="1.4" opacity="0.9">
      <path d="M360 20 L120 330 M360 20 L540 300 M360 20 L250 220 M360 20 L470 480 M360 20 L560 160 M360 20 L60 600"/>
      <path d="M250 120 Q 360 90 470 130 M200 200 Q 360 160 520 230 M180 280 Q 360 240 540 330 M300 330 Q 420 300 530 400 M140 420 Q 320 380 520 470"/>
    </g>`;
  const knoten = orte
    .map((o, i) => {
      const [x, y] = POSITIONEN[i];
      const st = staende.get(o.chapter) || {};
      const klasse = st.befreit ? 'ort-frei' : st.jetzt ? 'ort-jetzt' : st.frei ? 'ort-offen' : 'ort-schatten';
      const istSeidra = i === orte.length - 1;
      const r = st.jetzt ? 17 : 13;
      const nameZeigen = !klein && (st.befreit || st.jetzt);
      const labelX = x + (x > 300 ? -22 : 22);
      const labelAnchor = x > 300 ? 'end' : 'start';
      let kern;
      if (istSeidra && !st.befreit) {
        kern = `<foreignObject x="${x - 24}" y="${y - 22}" width="48" height="48">${sigilSvg('seidra', { groesse: 48, titel: 'Seidra' })}</foreignObject>`;
      } else {
        kern = `<circle cx="${x}" cy="${y}" r="${r}" class="ort-kreis"/><text x="${x}" y="${y + (st.jetzt ? 4.5 : 3.6)}" text-anchor="middle" class="ort-nr" font-size="${st.jetzt ? 12 : 10}">${o.nr}</text>`;
      }
      return `<g class="ort ${klasse}" data-chapter="${o.chapter}" tabindex="${st.frei || st.befreit ? 0 : -1}" role="${st.frei || st.befreit ? 'link' : 'img'}" aria-label="Ort ${o.nr}: ${escapeHtml(o.name)}${st.befreit ? ' (befreit)' : st.jetzt ? ' (jetzt)' : ' (unter dem Netz)'}">
        ${st.jetzt ? `<circle cx="${x}" cy="${y}" r="26" class="ort-puls"/>` : ''}
        ${kern}
        ${nameZeigen ? `<text x="${labelX}" y="${y + 4}" text-anchor="${labelAnchor}" class="ort-name" font-size="${st.jetzt ? 11 : 10}">${escapeHtml(o.name)}</text>` : ''}
        <title>Ort ${o.nr} · ${escapeHtml(o.name)}</title>
      </g>`;
    })
    .join('');
  return `<svg class="hyperia-karte ${klein ? 'klein' : ''}" viewBox="0 0 560 640" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Karte von Hyperia: ${befreitBis} von ${orte.length} Orten befreit">
    ${regionenSvg}
    ${netz}
    <path d="${pfad()}" fill="none" stroke="#4a3a7a" stroke-width="4" stroke-dasharray="6 8" stroke-linecap="round"/>
    <path d="${pfad(goldBis)}" fill="none" stroke="#ffc53d" stroke-width="4" stroke-linecap="round" opacity="0.95"/>
    ${labels}
    ${knoten}
  </svg>`;
}

// Klick/Tastatur auf Orte verdrahten
export function karteAktivieren(wurzel, { frei, ziel = (ch) => `#/ort/${ch}` } = {}) {
  wurzel.querySelectorAll('.hyperia-karte .ort').forEach((el) => {
    const ch = el.dataset.chapter;
    const geh = () => {
      if (frei(ch)) location.hash = ziel(ch);
    };
    el.addEventListener('click', geh);
    el.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), geh()));
  });
}
