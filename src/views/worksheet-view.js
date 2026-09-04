// Arbeitsblatt „mit deinen Lösungen“ zu einem Kapitel: Überblick, Namensfeld,
// PDF-Download (jsPDF wird erst beim Klick geladen) – plus Link auf das
// leere Druckblatt aus dem Python-Generator.

import { loadCurriculum, loadChapter, loadLesson } from '../content.js';
import { getLoesungen } from '../loesungen.js';

export async function renderArbeitsblatt(app, chapterId) {
  const [curriculum, kapitel] = await Promise.all([loadCurriculum(), loadChapter(chapterId)]);
  const alle = curriculum.blocks.flatMap((b) => b.chapters);
  const kapitelNr = alle.indexOf(chapterId) + 1;
  const lektionen = await Promise.all(kapitel.lessons.map((l) => loadLesson(chapterId, l)));

  const loesungen = {};
  let codeGesamt = 0;
  let codeGeloest = 0;
  const zeilen = lektionen.map((lektion) => {
    const eigene = getLoesungen(chapterId, lektion.id);
    loesungen[lektion.id] = eigene;
    const codeSteps = lektion.steps.map((s, i) => [s, i]).filter(([s]) => s.type === 'code');
    const geloest = codeSteps.filter(([, i]) => eigene[i]).length;
    codeGesamt += codeSteps.length;
    codeGeloest += geloest;
    return `
      <div class="ab-zeile">
        <span class="ab-zeile-titel">${lektion.title}</span>
        <span class="ab-zeile-stand ${codeSteps.length && geloest === codeSteps.length ? 'ab-komplett' : ''}">
          ${codeSteps.length ? `${geloest} / ${codeSteps.length} Aufgaben mit deiner Lösung` : 'keine Code-Aufgabe'}
        </span>
      </div>`;
  });

  const gespeicherterName = localStorage.getItem('webwerkstatt.name') || '';
  const gespeicherteKlasse = localStorage.getItem('webwerkstatt.klasse') || '';
  const leeresBlatt = new URL(`worksheets/${chapterId}.pdf`, document.baseURI).href;

  app.innerHTML = `
    <div class="arbeitsblatt-seite">
      <a class="zurueck" href="#/kapitel/${chapterId}">← ${kapitel.icon} ${kapitel.title}</a>
      <header class="kapitel-kopf" style="--kapitel-farbe:${kapitel.color}">
        <div class="kapitel-kopf-icon">📄</div>
        <div>
          <h1>Arbeitsblatt mit deinen Lösungen</h1>
          <p>Kapitel ${kapitelNr}: ${kapitel.title} · ${codeGeloest} von ${codeGesamt} Code-Aufgaben sind mit deiner eigenen Lösung eingetragen.</p>
        </div>
      </header>

      <div class="karte ab-formular">
        <div class="ab-felder">
          <label>Name <input type="text" id="ab-name" value="${gespeicherterName.replace(/"/g, '&quot;')}" placeholder="Vorname Nachname"></label>
          <label>Klasse <input type="text" id="ab-klasse" value="${gespeicherteKlasse.replace(/"/g, '&quot;')}" placeholder="z. B. 1BK1T"></label>
        </div>
        <div class="ab-buttons">
          <button class="btn btn-primaer" id="ab-download" type="button">⬇ PDF mit meinen Lösungen</button>
          <a class="btn btn-sekundaer" href="${leeresBlatt}" target="_blank" rel="noopener">🖨 Leeres Arbeitsblatt (PDF)</a>
        </div>
        <div class="extra-karte-meldung" id="ab-meldung"></div>
        <p class="ab-hinweis">Das PDF entsteht komplett auf deinem Gerät – dein Code wird nirgendwohin geschickt. Aufgaben, die du noch nicht gelöst hast, bekommen Platz zum Handschreiben.</p>
      </div>

      <div class="karte">
        <h2 class="ab-untertitel">Enthaltene Lektionen</h2>
        ${zeilen.join('')}
      </div>
    </div>`;

  const meldung = app.querySelector('#ab-meldung');
  const nameEl = app.querySelector('#ab-name');
  const klasseEl = app.querySelector('#ab-klasse');

  app.querySelector('#ab-download').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const name = nameEl.value.trim();
    const klasse = klasseEl.value.trim();
    localStorage.setItem('webwerkstatt.name', name);
    localStorage.setItem('webwerkstatt.klasse', klasse);
    btn.disabled = true;
    meldung.textContent = 'PDF wird erstellt …';
    try {
      const { ladeArbeitsblattHerunter } = await import('../pdf-arbeitsblatt.js');
      await ladeArbeitsblattHerunter({ kapitel, kapitelNr, lektionen, loesungen, name, klasse });
      meldung.textContent = 'PDF wurde heruntergeladen.';
    } catch (err) {
      console.error(err);
      meldung.textContent = `Fehler beim Erstellen: ${err.message}`;
    } finally {
      btn.disabled = false;
    }
  });
}
