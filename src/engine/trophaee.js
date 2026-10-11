// Trophäenkarte: umdrehbare Sammelkarte einer Gegner-Crew. Vorderseite: Emblem,
// Crew, Captain, RAUS-Stempel. Rückseite: ihr Fehler, die Regel, ein Beispiel –
// damit jede gewonnene Runde als Wiederholung an der Wand hängt.

import { crewEmblem } from './emblem.js';
import { escapeHtml } from './markdown.js';

export function trophaeenKarteHtml(runde, { gewonnen = false, naechste = false, umdrehbar = true, klein = false } = {}) {
  if (!runde) return '';
  const klasse = ['trophaeenkarte', gewonnen ? 'gewonnen' : 'offen', naechste ? 'naechste' : '', klein ? 'klein' : ''].filter(Boolean).join(' ');
  const code = runde.beispiel ? `<pre class="codeblock trophaee-code"><code>${escapeHtml(runde.beispiel)}</code></pre>` : '';
  return `<div class="${klasse}" style="--farbe:${escapeHtml(runde.farbe)}" ${umdrehbar && gewonnen ? 'role="button" tabindex="0" aria-label="Trophäenkarte umdrehen: ' + escapeHtml(runde.crew) + '"' : ''} data-runde="${escapeHtml(runde.chapter)}">
    <div class="trophaee-innen">
      <div class="trophaee-vorne">
        <div class="trophaee-kopf"><span>Runde ${runde.runde}</span><span>WEBCUP</span></div>
        <div class="trophaee-emblem">${crewEmblem(runde, { groesse: klein ? 56 : 84, raus: gewonnen })}</div>
        <div class="trophaee-crew">${escapeHtml(runde.crew)}</div>
        <div class="trophaee-captain">Captain ${escapeHtml(runde.captain)}</div>
        ${gewonnen ? '<span class="stempel">Raus</span>' : naechste ? '<span class="trophaee-hinweis">Nächster Gegner</span>' : '<span class="trophaee-hinweis">Noch im Turnier</span>'}
        ${gewonnen && umdrehbar ? '<div class="trophaee-flip-hinweis">↻ umdrehen: Fehler &amp; Regel</div>' : ''}
      </div>
      <div class="trophaee-hinten">
        <div class="trophaee-kopf"><span>${escapeHtml(runde.crew)}</span><span>R${runde.runde}</span></div>
        <div class="trophaee-abschnitt"><b>Ihr Fehler</b>${escapeHtml(runde.schwaeche)}</div>
        <div class="trophaee-abschnitt"><b>Die Regel</b>${escapeHtml(runde.regel || '')}</div>
        ${code ? `<div class="trophaee-abschnitt"><b>Beispiel</b>${code}</div>` : ''}
      </div>
    </div>
  </div>`;
}

// Macht alle Karten in einem Container per Klick/Enter umdrehbar.
export function trophaeenAktivieren(wurzel) {
  wurzel.querySelectorAll('.trophaeenkarte.gewonnen[role="button"]').forEach((k) => {
    const flip = () => k.classList.toggle('umgedreht');
    k.addEventListener('click', flip);
    k.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });
  });
}
