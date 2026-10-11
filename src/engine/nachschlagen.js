// Nachschlagen: eine Seitenleiste, die während jeder Aufgabe geöffnet werden kann.
// Zeigt (a) die Erklärungen und Beispiele der aktuellen Lektion bis zum aktuellen
// Schritt – nie Aufgaben, Tipps oder Lösungen –, (b) die Spickzettel-Karten der
// Konzepte dieser und früherer Lektionen und (c) die Regeln der befreiten Orte.
// Didaktik: Der Text bleibt kurz, aber während der Aufgabe jederzeit erreichbar.

import { loadKonzepte, alleOrte } from '../content.js';
import { getState } from '../store.js';
import { md, escapeHtml } from './markdown.js';
import { buildSrcdoc } from './preview.js';
import { sigilSvg } from './sigil.js';

const BLOCK_NAMEN = { web: 'Web-Grundlagen', html: 'HTML', css: 'CSS', recht: 'Recht', js: 'JavaScript' };
const BLOCK_FARBEN = { web: 'var(--basics)', html: 'var(--html)', css: 'var(--css)', recht: 'var(--projekt)', js: 'var(--js)' };

let drawer = null;

export function nachschlagenSchliessen() {
  if (!drawer) return;
  drawer.classList.remove('an');
  document.body.classList.remove('nachschlagen-offen');
  const d = drawer;
  setTimeout(() => d.remove(), 300);
  drawer = null;
}

export function konzeptKarteHtml(k, { hervor = false } = {}) {
  if (!k) return '';
  return `<article class="konzept-karte ${hervor ? 'hervor' : ''}" id="konzept-${escapeHtml(k.id).replace(/[^a-z0-9-]/gi, '-')}" style="--farbe:${BLOCK_FARBEN[k.block] || 'var(--spark)'}">
    <div class="konzept-kopf"><span class="chip chip-farbe" style="--farbe:${BLOCK_FARBEN[k.block] || 'var(--spark)'}">${BLOCK_NAMEN[k.block] || k.block}</span><h4>${escapeHtml(k.titel)}</h4></div>
    ${k.kurz ? `<p>${escapeHtml(k.kurz)}</p>` : ''}
    ${k.beispiel ? `<pre class="codeblock lang-${escapeHtml(k.sprache || 'text')}"><code>${escapeHtml(k.beispiel)}</code></pre>` : ''}
    ${k.merke ? `<div class="konzept-merke">💡 ${escapeHtml(k.merke)}</div>` : ''}
  </article>`;
}

export function ortRegelHtml(o) {
  return `<article class="konzept-karte ort-regel-karte" style="--farbe:${escapeHtml(o.regionFarbe || 'var(--spark)')}">
    <div class="konzept-kopf">${sigilSvg(o.gespinst, { groesse: 36, titel: o.gespinstName })}<h4>Ort ${o.nr} · ${escapeHtml(o.name)}</h4></div>
    <p><b>${escapeHtml(o.gespinstName)}</b> ${escapeHtml(o.fallenart)}</p>
    <p>${escapeHtml(o.regel)}</p>
    ${o.beispiel ? `<pre class="codeblock lang-${escapeHtml(o.sprache || 'text')}"><code>${escapeHtml(o.beispiel)}</code></pre>` : ''}
  </article>`;
}

function lektionsTeilHtml(lektion, bisIndex) {
  const steps = (lektion?.steps || []).slice(0, bisIndex).filter((s) => s.type === 'explain' || s.type === 'example');
  if (!steps.length) return '<p class="nachschlagen-leer">In dieser Lektion gab es vor diesem Schritt noch keine Erklärung – schau in den Spickzettel.</p>';
  return steps
    .map((s, i) => {
      if (s.type === 'example') {
        const dateien = ['html', 'css', 'js'].filter((k) => s[k] != null);
        return `<section class="nachschlagen-schritt">
          <div class="schritt-art">🧪 Beispiel ${i + 1}</div>
          <div class="schritt-inhalt">${md(s.text)}</div>
          ${dateien.map((k) => `<div class="nachschlagen-datei">${k === 'html' ? 'index.html' : k === 'css' ? 'style.css' : 'script.js'}</div><pre class="codeblock lang-${k}"><code>${escapeHtml(s[k])}</code></pre>`).join('')}
          <details class="nachschlagen-vorschau"><summary>Vorschau anzeigen</summary><iframe title="Vorschau des Beispiels" sandbox="allow-scripts" loading="lazy" data-srcdoc="${escapeHtml(buildSrcdoc({ html: s.html || '', css: s.css || '', js: s.js || '' }, { capture: false }))}"></iframe></details>
        </section>`;
      }
      return `<section class="nachschlagen-schritt">
        <div class="schritt-art">📖 Erklärung ${i + 1}</div>
        ${s.figure ? `<div class="schritt-grafik">${s.figure}</div>` : ''}
        <div class="schritt-inhalt">${md(s.text)}</div>
      </section>`;
    })
    .join('');
}

/**
 * oeffneNachschlagen({ lektion, bisIndex, konzeptIds, fokus, tab })
 * - lektion/bisIndex: Erklärungen dieser Lektion bis (ausschließlich) Schritt bisIndex
 * - konzeptIds: Konzepte dieser Lektion (werden oben hervorgehoben)
 * - fokus: Konzept-ID, zu der gescrollt wird
 * - tab: 'lektion' | 'spickzettel' | 'orte'
 */
export async function oeffneNachschlagen(optionen = {}) {
  const { lektion = null, bisIndex = Infinity, konzeptIds = [], fokus = null } = optionen;
  const [konzepte, orte] = await Promise.all([loadKonzepte(), alleOrte().catch(() => [])]);
  const s = getState();
  const gelernt = new Set([...Object.keys(s.leitner), ...konzeptIds]);
  const eigene = konzeptIds.map((id) => konzepte.find((k) => k.id === id)).filter(Boolean);
  const weitere = konzepte.filter((k) => gelernt.has(k.id) && !konzeptIds.includes(k.id));
  const befreit = orte.filter((o) => s.boss[o.chapter]?.passed);
  const tab = optionen.tab || (lektion ? 'lektion' : 'spickzettel');

  nachschlagenSchliessen();
  drawer = document.createElement('aside');
  drawer.className = 'nachschlagen';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Nachschlagen');
  drawer.innerHTML = `
    <div class="nachschlagen-kopf">
      <div><div class="schritt-art">📖 Nachschlagen</div><strong>Erklärungen, Spickzettel, Regeln – keine Lösungen</strong></div>
      <button class="icon-btn" type="button" id="ns-zu" title="Schließen (Esc)">✕</button>
    </div>
    <div class="nachschlagen-tabs" role="tablist">
      ${lektion ? `<button type="button" role="tab" data-tab="lektion" class="${tab === 'lektion' ? 'aktiv' : ''}">Diese Lektion</button>` : ''}
      <button type="button" role="tab" data-tab="spickzettel" class="${tab === 'spickzettel' ? 'aktiv' : ''}">Spickzettel</button>
      <button type="button" role="tab" data-tab="orte" class="${tab === 'orte' ? 'aktiv' : ''}">Befreite Orte <span class="chip">${befreit.length}</span></button>
    </div>
    <div class="nachschlagen-inhalt">
      ${lektion ? `<div class="nachschlagen-tab" data-tab="lektion" ${tab === 'lektion' ? '' : 'hidden'}>
        <p class="nachschlagen-leer">Alles, was du in dieser Lektion bis hierher gelesen und ausprobiert hast. Die Aufgaben sind damit lösbar – die Lösung selbst steht hier nicht.</p>
        ${lektionsTeilHtml(lektion, bisIndex)}
      </div>` : ''}
      <div class="nachschlagen-tab" data-tab="spickzettel" ${tab === 'spickzettel' ? '' : 'hidden'}>
        <input class="nachschlagen-suche" type="search" placeholder="Suchen … (z. B. padding, Link, Liste)" aria-label="Spickzettel durchsuchen">
        ${eigene.length ? `<div class="nachschlagen-gruppe"><h3>Diese Lektion</h3>${eigene.map((k) => konzeptKarteHtml(k, { hervor: true })).join('')}</div>` : ''}
        ${weitere.length ? ['web', 'html', 'css', 'recht', 'js'].map((b) => {
          const liste = weitere.filter((k) => k.block === b);
          return liste.length ? `<div class="nachschlagen-gruppe"><h3>${BLOCK_NAMEN[b]}</h3>${liste.map((k) => konzeptKarteHtml(k)).join('')}</div>` : '';
        }).join('') : ''}
        ${!eigene.length && !weitere.length ? '<p class="nachschlagen-leer">Noch keine Konzepte gelernt – nach der ersten Lektion füllt sich der Spickzettel.</p>' : ''}
        <p class="nachschlagen-leer" style="margin-top:1rem">Alle Karten auf einer Seite: <a href="#/spickzettel">Spickzettel öffnen</a></p>
      </div>
      <div class="nachschlagen-tab" data-tab="orte" ${tab === 'orte' ? '' : 'hidden'}>
        ${befreit.length ? `<p class="nachschlagen-leer">Jeder befreite Ort hat dir eine Regel gegeben: der Fehler des Gespinsts und was stattdessen gilt.</p>${befreit.map(ortRegelHtml).join('')}` : '<p class="nachschlagen-leer">Noch kein Ort befreit – die erste Regel gibt es nach dem ersten gewonnenen Duell.</p>'}
      </div>
    </div>`;
  document.body.appendChild(drawer);
  document.body.classList.add('nachschlagen-offen');
  requestAnimationFrame(() => drawer.classList.add('an'));

  drawer.querySelector('#ns-zu').addEventListener('click', nachschlagenSchliessen);
  drawer.querySelectorAll('[role="tab"]').forEach((b) => {
    b.addEventListener('click', () => {
      drawer.querySelectorAll('[role="tab"]').forEach((x) => x.classList.toggle('aktiv', x === b));
      drawer.querySelectorAll('.nachschlagen-tab').forEach((t) => (t.hidden = t.dataset.tab !== b.dataset.tab));
    });
  });
  // Vorschau-Iframes erst beim Aufklappen laden
  drawer.querySelectorAll('details.nachschlagen-vorschau').forEach((d) => {
    d.addEventListener('toggle', () => {
      const f = d.querySelector('iframe');
      if (d.open && f && !f.srcdoc) f.srcdoc = f.dataset.srcdoc;
    });
  });
  const suche = drawer.querySelector('.nachschlagen-suche');
  suche.addEventListener('input', () => {
    const q = suche.value.trim().toLowerCase();
    drawer.querySelectorAll('[data-tab="spickzettel"] .konzept-karte').forEach((k) => (k.hidden = q && !k.textContent.toLowerCase().includes(q)));
    drawer.querySelectorAll('.nachschlagen-gruppe').forEach((g) => (g.hidden = ![...g.querySelectorAll('.konzept-karte')].some((k) => !k.hidden)));
  });
  if (fokus) {
    const ziel = drawer.querySelector(`#konzept-${fokus.replace(/[^a-z0-9-]/gi, '-')}`);
    if (ziel) {
      ziel.classList.add('fokus');
      setTimeout(() => ziel.scrollIntoView({ block: 'start', behavior: 'smooth' }), 200);
    }
  }
  const onKey = (e) => {
    if (e.key === 'Escape') {
      nachschlagenSchliessen();
      window.removeEventListener('keydown', onKey);
    }
  };
  window.addEventListener('keydown', onKey);
  return drawer;
}

// Ein Knopf, der die Seitenleiste mit den gegebenen Optionen öffnet.
export function nachschlagenKnopf(optionenFn, { text = '📖 Nachlesen', klasse = 'btn btn-geist btn-klein' } = {}) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = `${klasse} nachschlagen-knopf`;
  b.textContent = text;
  b.title = 'Erklärungen und Spickzettel zu dieser Lektion nachlesen – ohne Lösung';
  b.addEventListener('click', () => oeffneNachschlagen(typeof optionenFn === 'function' ? optionenFn() : optionenFn));
  return b;
}

export function istNachschlagenOffen() {
  return !!drawer;
}
