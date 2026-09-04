import { loadChapter, loadLesson } from '../content.js';
import { isDone, isChapterLocked } from '../progress.js';

export async function renderChapter(app, chapterId) {
  // Von der Lehrkraft gesperrtes Kapitel (Schulmodus): freundlich abweisen.
  if (isChapterLocked(chapterId)) {
    app.innerHTML = `
      <div class="kapitel-seite">
        <a class="zurueck" href="#/">← Zur Übersicht</a>
        <div class="karte gesperrt-karte">
          <p><strong>🔒 Dieses Kapitel ist noch gesperrt.</strong></p>
          <p>Deine Lehrkraft schaltet es frei, sobald es im Unterricht dran ist. Schau dir so lange die offenen Kapitel an.</p>
        </div>
      </div>`;
    return;
  }

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
      <section class="extra-karten kapitel-extras">
        <a class="extra-karte" href="#/arbeitsblatt/${chapterId}">
          <div class="extra-karte-icon">📄</div>
          <div>
            <div class="extra-karte-titel">Arbeitsblatt mit deinen Lösungen</div>
            <div class="extra-karte-text">PDF im JJWS-Design – mit dem Code, den du in diesem Kapitel geschrieben hast.</div>
          </div>
        </a>
        <a class="extra-karte" href="${new URL(`worksheets/${chapterId}.pdf`, document.baseURI).href}" target="_blank" rel="noopener">
          <div class="extra-karte-icon">🖨</div>
          <div>
            <div class="extra-karte-titel">Leeres Arbeitsblatt zum Ausdrucken</div>
            <div class="extra-karte-text">Informations- &amp; Aufgabenblatt für die Arbeit auf Papier.</div>
          </div>
        </a>
      </section>
    </div>`;
}
