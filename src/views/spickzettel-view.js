// Spickzettel (Route #/spickzettel): alle Konzept-Karten auf einer Seite – nach Blöcken
// gruppiert, durchsuchbar, mit Lernstand (gelernt / sicher). Gelernte Karten sind voll
// lesbar; noch nicht gelernte zeigen nur den Titel (kein Vorgriff, keine Überforderung).
// Lehrkraft-Modus zeigt alles.

import { loadKonzepte, loadAlleKapitel, loadLesson } from '../content.js';
import { getState, istLehrkraft } from '../store.js';
import { escapeHtml } from '../engine/markdown.js';
import { konzeptKarteHtml } from '../engine/nachschlagen.js';

const BLOECKE = [
  { id: 'web', titel: 'Web-Grundlagen', farbe: 'var(--basics)' },
  { id: 'html', titel: 'HTML – das Gerüst', farbe: 'var(--html)' },
  { id: 'css', titel: 'CSS – Licht & Farbe', farbe: 'var(--css)' },
  { id: 'recht', titel: 'Recht im Web', farbe: 'var(--projekt)' },
  { id: 'js', titel: 'JavaScript – Strom', farbe: 'var(--js)' },
];

export async function renderSpickzettel(app) {
  const [konzepte, kapitel] = await Promise.all([loadKonzepte(), loadAlleKapitel()]);
  const s = getState();
  const lehrkraft = istLehrkraft();
  // Wo wird ein Konzept eingeführt? (für den Hinweis „kommt an Ort X“)
  const einfuehrung = {};
  await Promise.all(
    kapitel.flatMap((k, i) =>
      k.lessons.map((l) =>
        loadLesson(k.id, l)
          .then((lek) => (lek.konzepte || []).forEach((id) => (einfuehrung[id] = einfuehrung[id] || { runde: i + 1, kapitel: k, lesson: l, titel: lek.title })))
          .catch(() => {})
      )
    )
  );
  const gelernt = (id) => lehrkraft || !!s.leitner[id];
  const sicher = (id) => (s.leitner[id]?.box || 0) >= 4;
  const anzahlGelernt = konzepte.filter((k) => !!s.leitner[k.id]).length;
  const anzahlSicher = konzepte.filter((k) => sicher(k.id)).length;

  app.innerHTML = `
    <div class="auftritt spickzettel-seite">
      <a class="zurueck" href="#/">← Hyperia</a>
      <div class="spickzettel-kopf">
        <div>
          <span class="chip chip-farbe" style="--farbe: var(--spark)">Werkstatt-Handbuch</span>
          <h1>📖 Spickzettel</h1>
          <p style="color:var(--ink-2);max-width:60ch">Jedes Konzept als kurze Karte: Regel, Beispiel, Merksatz. Die Karten füllen sich, sobald du die passende Lektion abgeschlossen hast – und bleiben während jeder Aufgabe über „Nachlesen“ erreichbar. Lösungen stehen hier nie, Beispiele immer.</p>
        </div>
        <div class="karte spickzettel-stand">
          <div><strong>${anzahlGelernt}</strong><small>/ ${konzepte.length} Konzepte gelernt</small></div>
          <div><strong>${anzahlSicher}</strong><small>sicher (Soundcheck Box 4+)</small></div>
        </div>
      </div>
      <input class="nachschlagen-suche spickzettel-suche" type="search" placeholder="Suchen … (z. B. padding, Link, Liste)" aria-label="Spickzettel durchsuchen">
      ${BLOECKE.map((b) => {
        const liste = konzepte.filter((k) => k.block === b.id);
        return `<section class="spickzettel-block" data-block="${b.id}">
          <h2 style="color:${b.farbe}">${b.titel} <span class="chip">${liste.filter((k) => !!s.leitner[k.id]).length} / ${liste.length}</span></h2>
          <div class="konzept-raster">
            ${liste.map((k) => {
              if (gelernt(k.id)) return `<div class="konzept-zelle ${sicher(k.id) ? 'sicher' : ''}">${konzeptKarteHtml(k)}${sicher(k.id) ? '<span class="konzept-status">✔ sitzt</span>' : '<span class="konzept-status">gelernt</span>'}</div>`;
              const e = einfuehrung[k.id];
              return `<div class="konzept-zelle gesperrt"><article class="konzept-karte" style="--farbe:${b.farbe}"><div class="konzept-kopf"><span class="chip">🔒</span><h4>${escapeHtml(k.titel)}</h4></div><p class="nachschlagen-leer">${e ? `Kommt in Ort ${e.runde} · <a href="#/kapitel/${e.kapitel.id}">${escapeHtml(e.kapitel.title)}</a>, Lektion „${escapeHtml(e.titel)}“.` : 'Wird in einer späteren Runde eingeführt.'}</p></article></div>`;
            }).join('')}
          </div>
        </section>`;
      }).join('')}
    </div>`;

  const suche = app.querySelector('.spickzettel-suche');
  suche.addEventListener('input', () => {
    const q = suche.value.trim().toLowerCase();
    app.querySelectorAll('.konzept-zelle').forEach((z) => (z.hidden = q && !z.textContent.toLowerCase().includes(q)));
    app.querySelectorAll('.spickzettel-block').forEach((b) => (b.hidden = ![...b.querySelectorAll('.konzept-zelle')].some((z) => !z.hidden)));
  });
}
