import { renderHome } from './views/home-view.js';
import { renderChapter } from './views/chapter-view.js';
import { renderLesson } from './views/lesson-view.js';
import { renderProjekt } from './views/projekt-view.js';
import { renderPruefung } from './views/pruefung-view.js';
import { renderArbeitsblatt } from './views/worksheet-view.js';
import { loadFlatLessons } from './content.js';
import { doneCount } from './progress.js';

export async function updateProgressBadge() {
  const el = document.getElementById('topbar-progress');
  if (!el) return;
  try {
    const flat = await loadFlatLessons();
    el.textContent = `${doneCount()} / ${flat.length} Lektionen`;
  } catch {
    el.textContent = '';
  }
}

async function route() {
  const app = document.getElementById('app');
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  app.innerHTML = '<p class="laden">Lade …</p>';
  try {
    if (parts[0] === 'kapitel' && parts[1]) {
      await renderChapter(app, parts[1]);
    } else if (parts[0] === 'lektion' && parts[1] && parts[2]) {
      await renderLesson(app, parts[1], parts[2]);
    } else if (parts[0] === 'arbeitsblatt' && parts[1]) {
      await renderArbeitsblatt(app, parts[1]);
    } else if (parts[0] === 'projekt') {
      await renderProjekt(app);
    } else if (parts[0] === 'pruefung') {
      await renderPruefung(app);
    } else {
      await renderHome(app);
    }
  } catch (e) {
    console.error(e);
    app.innerHTML = `<div class="karte fehler-karte"><p><strong>Ups!</strong> Diese Seite konnte nicht geladen werden.</p><p><a href="#/">Zurück zur Übersicht</a></p></div>`;
  }
  window.scrollTo(0, 0);
  updateProgressBadge();
}

export function initRouter() {
  window.addEventListener('hashchange', route);
  route();
}
