import { loadChapter, loadLesson } from '../content.js';
import { isDone } from '../progress.js';

export async function renderChapter(app, chapterId) {
  const kapitel = await loadChapter(chapterId);
  const lektionen = await Promise.all(kapitel.lessons.map((l) => loadLesson(chapterId, l)));

  const zeilen = lektionen
    .map((lektion, i) => {
      const fertig = isDone(chapterId, lektion.id);
      return `
        <a class="lektion-zeile" href="#/lektion/${chapterId}/${lektion.id}">
          <span class="lektion-status${fertig ? ' lektion-status-fertig' : ''}">${fertig ? '✔' : i + 1}</span>
          <span class="lektion-titel">${lektion.title}</span>
          <span class="lektion-aktion">${fertig ? 'Wiederholen' : 'Start'} →</span>
        </a>`;
    })
    .join('');

  app.innerHTML = `
    <div class="kapitel-seite">
      <a class="zurueck" href="#/">← Zur Übersicht</a>
      <header class="kapitel-kopf" style="--kapitel-farbe:${kapitel.color}">
        <div class="kapitel-kopf-icon">${kapitel.icon}</div>
        <div>
          <h1>${kapitel.title}</h1>
          <p>${kapitel.description}</p>
        </div>
      </header>
      <div class="lektion-liste">${zeilen}</div>
    </div>`;
}
