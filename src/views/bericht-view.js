// Lernbericht: druckbare Übersicht des Spielstands für die Lehrkraft (kein Server –
// die Lernenden drucken ihn aus oder speichern ihn als PDF).

import { getState } from '../store.js';
import { loadAlleKapitel, loadKonzepte, loadLesson } from '../content.js';
import { levelAus, rangAus } from '../gamification/xp.js';
import { ABZEICHEN } from '../gamification/badges.js';
import { escapeHtml } from '../engine/markdown.js';

export async function renderBericht(app) {
  const s = getState();
  const [kapitel, konzepte] = await Promise.all([loadAlleKapitel(), loadKonzepte()]);
  const titel = {};
  await Promise.all(kapitel.flatMap((k) => k.lessons.map((l) => loadLesson(k.id, l).then((x) => (titel[`${k.id}/${l}`] = x.title)).catch(() => (titel[`${k.id}/${l}`] = l)))));
  const lektionen = Object.values(s.lessons).filter((l) => l.done).length;
  const gesamt = kapitel.reduce((a, k) => a + k.lessons.length, 0);
  const sterne = Object.values(s.lessons).reduce((a, l) => a + (l.stars || 0), 0);
  const genauigkeit = s.stats.correct + s.stats.wrong ? Math.round((s.stats.correct / (s.stats.correct + s.stats.wrong)) * 100) : 0;
  const sicher = Object.values(s.leitner).filter((k) => k.box >= 4).length;
  const datum = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  app.innerHTML = `
    <div class="bericht auftritt">
      <div class="bericht-leiste">
        <a class="zurueck" href="#/keycard">← Zur Spielerkarte</a>
        <button class="btn btn-primaer" type="button" id="drucken">🖨 Drucken / als PDF speichern</button>
      </div>
      <div class="karte bericht-blatt">
        <h1>Lernbericht WebWerkstatt</h1>
        <p class="bericht-meta"><strong>${escapeHtml(s.name || '__________________')}</strong> · Stand ${datum} · ${rangAus(s.xp).titel} · Level ${levelAus(s.xp)} · ${s.xp} XP</p>
        <div class="statistik-grid bericht-stats">
          <div class="stat-kachel"><strong>${lektionen}/${gesamt}</strong><small>Lektionen</small></div>
          <div class="stat-kachel"><strong>${sterne}</strong><small>Sterne</small></div>
          <div class="stat-kachel"><strong>${s.stats.codePassed}</strong><small>Code-Aufgaben</small></div>
          <div class="stat-kachel"><strong>${genauigkeit} %</strong><small>Treffsicherheit</small></div>
          <div class="stat-kachel"><strong>${Object.values(s.boss).filter((b) => b.passed).length}/${kapitel.length}</strong><small>Abnahmen</small></div>
          <div class="stat-kachel"><strong>${sicher}/${konzepte.length}</strong><small>Konzepte sicher</small></div>
        </div>
        <h2>Runden (Stationen)</h2>
        <table class="pruef-tabelle bericht-tabelle">
          <thead><tr><th>Runde · Station</th><th>Lektionen</th><th>Sterne</th><th>Match (Abnahme)</th></tr></thead>
          <tbody>
            ${kapitel.map((k, i) => {
              const done = k.lessons.filter((l) => s.lessons[`${k.id}/${l}`]?.done).length;
              const st = k.lessons.reduce((a, l) => a + (s.lessons[`${k.id}/${l}`]?.stars || 0), 0);
              const b = s.boss[k.id];
              return `<tr><td>${i + 1} · ${escapeHtml(k.title)}</td><td>${done}/${k.lessons.length}</td><td>${st}/${k.lessons.length * 3}</td><td>${b ? `${Math.round(b.best * 100)} % ${b.passed ? '✔' : '✘'}${b.versuche > 1 ? ` (${b.versuche} Versuche)` : ''}` : '–'}</td></tr>`;
            }).join('')}
          </tbody>
        </table>
        <h2>Lektionen im Detail</h2>
        <table class="pruef-tabelle bericht-tabelle">
          <thead><tr><th>Lektion</th><th>Sterne</th><th>Fehler</th><th>Tipps</th><th>Durchläufe</th><th>zuletzt</th></tr></thead>
          <tbody>
            ${kapitel.flatMap((k) => k.lessons.map((l) => {
              const e = s.lessons[`${k.id}/${l}`];
              if (!e?.done) return '';
              return `<tr><td>${escapeHtml(titel[`${k.id}/${l}`])}</td><td>${'★'.repeat(e.stars)}${'☆'.repeat(3 - e.stars)}</td><td>${e.fehler ?? '–'}</td><td>${e.tipps ?? '–'}</td><td>${e.versuche || 1}</td><td>${e.lastAt ? new Date(e.lastAt).toLocaleDateString('de-DE') : ''}</td></tr>`;
            })).join('') || '<tr><td colspan="6">Noch keine Lektion abgeschlossen.</td></tr>'}
          </tbody>
        </table>
        <h2>Abzeichen</h2>
        <p>${ABZEICHEN.filter((a) => s.badges[a.id]).map((a) => `${a.icon} ${escapeHtml(a.titel)}`).join(' · ') || 'Noch keine.'}</p>
        <h2>Was noch wackelt (Leitner-Box 1–2)</h2>
        <p>${Object.entries(s.leitner).filter(([, k]) => k.box <= 2).map(([id]) => escapeHtml(konzepte.find((k) => k.id === id)?.titel || id)).join(' · ') || 'Nichts – alles Gelernte sitzt bisher.'}</p>
        <p class="bericht-fuss">WebWerkstatt · Der Bericht stammt aus dem Browser-Spielstand der Lernenden und ist nicht fälschungssicher.</p>
      </div>
    </div>`;
  app.querySelector('#drucken').addEventListener('click', () => window.print());
}
