// Hash-Router. Views werden bei Bedarf dynamisch geladen.

const routen = {
  '': () => import('./views/map-view.js').then((m) => m.renderMap),
  intro: () => import('./views/intro-view.js').then((m) => m.renderIntro),
  kapitel: () => import('./views/chapter-view.js').then((m) => m.renderChapter),
  lektion: () => import('./views/lesson-view.js').then((m) => m.renderLesson),
  abnahme: () => import('./views/boss-view.js').then((m) => m.renderBoss),
  backstage: () => import('./views/backstage-view.js').then((m) => m.renderBackstage),
  keycard: () => import('./views/keycard-view.js').then((m) => m.renderKeycard),
  projekt: () => import('./views/projekt-view.js').then((m) => m.renderProjekt),
  showtime: () => import('./views/showtime-view.js').then((m) => m.renderShowtime),
  pruefung: () => import('./views/pruefung-view.js').then((m) => m.renderPruefung),
  lehrkraft: () => import('./views/lehrkraft-view.js').then((m) => m.renderLehrkraft),
  bericht: () => import('./views/bericht-view.js').then((m) => m.renderBericht),
};

let aktuelleView = null;

async function route() {
  const app = document.getElementById('app');
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const name = parts[0] || '';
  if (aktuelleView?.destroy) {
    try {
      aktuelleView.destroy();
    } catch {
      /* egal */
    }
  }
  aktuelleView = null;
  app.innerHTML = '<p class="laden">Lade …</p>';
  document.body.classList.toggle('intro-aktiv', name === 'intro');
  try {
    const lade = routen[name] || routen[''];
    const render = await lade();
    aktuelleView = (await render(app, ...parts.slice(1))) || null;
  } catch (e) {
    console.error(e);
    app.innerHTML = `<div class="karte gesperrt-karte"><h2>Ups!</h2><p>Diese Seite konnte nicht geladen werden.</p><p><a class="btn btn-sekundaer" href="#/">Zurück zum Gelände</a></p></div>`;
  }
  window.scrollTo(0, 0);
}

export function initRouter() {
  window.addEventListener('hashchange', route);
  route();
}
