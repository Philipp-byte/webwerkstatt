import { loadCurriculum, loadChapter } from '../content.js';
import { chapterDoneCount, exportAll, importAll, isChapterLocked, getBackendMode } from '../progress.js';

export async function renderHome(app) {
  const curriculum = await loadCurriculum();
  const alleKapitel = new Map();
  const kapitelIds = curriculum.blocks.flatMap((b) => b.chapters);
  const geladen = await Promise.all(kapitelIds.map((id) => loadChapter(id)));
  geladen.forEach((ch) => alleKapitel.set(ch.id, ch));

  let laufendeNummer = 0;
  const bloecke = curriculum.blocks
    .map((block) => {
      const karten = block.chapters
        .map((id) => {
          const ch = alleKapitel.get(id);
          laufendeNummer++;
          // Von der Lehrkraft gesperrtes Kapitel (nur im Schulmodus möglich):
          // ohne Link, mit Schloss statt Lektionsstand.
          if (isChapterLocked(ch.id)) {
            return `
            <div class="kapitel-karte kapitel-gesperrt" style="--kapitel-farbe:${ch.color}" title="Dieses Kapitel schaltet deine Lehrkraft später frei.">
              <div class="kapitel-icon">${ch.icon}</div>
              <div class="kapitel-text">
                <div class="kapitel-titel">${laufendeNummer}. ${ch.title}</div>
                <div class="kapitel-beschreibung">Wird von deiner Lehrkraft später freigeschaltet.</div>
              </div>
              <div class="kapitel-stand">🔒</div>
            </div>`;
          }
          const fertig = chapterDoneCount(ch.id, ch.lessons);
          const komplett = fertig === ch.lessons.length;
          return `
            <a class="kapitel-karte${komplett ? ' kapitel-fertig' : ''}" href="#/kapitel/${ch.id}" style="--kapitel-farbe:${ch.color}">
              <div class="kapitel-icon">${ch.icon}</div>
              <div class="kapitel-text">
                <div class="kapitel-titel">${laufendeNummer}. ${ch.title}</div>
                <div class="kapitel-beschreibung">${ch.description}</div>
              </div>
              <div class="kapitel-stand">${komplett ? '✔' : `${fertig}/${ch.lessons.length}`}</div>
            </a>`;
        })
        .join('');
      return `
        <section class="block">
          <h2 class="block-titel" style="--block-farbe:${block.color}">${block.title}</h2>
          <div class="kapitel-raster">${karten}</div>
        </section>`;
    })
    .join('');

  app.innerHTML = `
    <div class="startseite">
      <div class="hero">
        <h1>${curriculum.title}</h1>
        <p>${curriculum.subtitle}</p>
      </div>
      ${bloecke}
      <section class="extra-karten">
        <a class="extra-karte" href="#/projekt">
          <div class="extra-karte-icon">🏁</div>
          <div>
            <div class="extra-karte-titel">Mein Café-Projekt</div>
            <div class="extra-karte-text">Alle gemeisterten Etappen als echte, klickbare Website ansehen.</div>
          </div>
        </a>
        ${
          getBackendMode() === 'remote'
            ? `
        <div class="extra-karte">
          <div class="extra-karte-icon">🏫</div>
          <div>
            <div class="extra-karte-titel">Fortschritt gespeichert</div>
            <div class="extra-karte-text">Dein Lernstand wird auf dem Schulserver gespeichert – du kannst dich an jedem Rechner anmelden und weitermachen.</div>
          </div>
        </div>`
            : `
        <div class="extra-karte">
          <div class="extra-karte-icon">💾</div>
          <div>
            <div class="extra-karte-titel">Fortschritt sichern</div>
            <div class="extra-karte-text">Dein Lernstand liegt in diesem Browser. Als Datei sichern oder wiederherstellen:</div>
            <div class="extra-karte-buttons">
              <button class="btn btn-sekundaer" id="export-btn" type="button">⬇ Sichern</button>
              <button class="btn btn-sekundaer" id="import-btn" type="button">⬆ Wiederherstellen</button>
              <input type="file" id="import-datei" accept=".json,application/json" hidden>
            </div>
            <div class="extra-karte-meldung" id="sicherung-meldung"></div>
          </div>
        </div>`
        }
      </section>
    </div>`;

  // Sichern/Wiederherstellen gibt es nur im Demo-Modus (im Schulmodus
  // existieren die Buttons nicht – der Server speichert).
  if (getBackendMode() === 'remote') return;

  const meldung = app.querySelector('#sicherung-meldung');

  app.querySelector('#export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(exportAll(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `webwerkstatt-fortschritt-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    meldung.textContent = 'Sicherungsdatei wurde heruntergeladen.';
  });

  const dateiInput = app.querySelector('#import-datei');
  app.querySelector('#import-btn').addEventListener('click', () => dateiInput.click());
  dateiInput.addEventListener('change', async () => {
    const datei = dateiInput.files[0];
    if (!datei) return;
    try {
      importAll(JSON.parse(await datei.text()));
      meldung.textContent = 'Fortschritt wiederhergestellt!';
      setTimeout(() => location.reload(), 600);
    } catch (e) {
      meldung.textContent = `Fehler: ${e.message}`;
    }
  });
}
