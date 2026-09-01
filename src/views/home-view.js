import { loadCurriculum, loadChapter } from '../content.js';
import { chapterDoneCount } from '../progress.js';

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
    </div>`;
}
