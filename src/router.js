// Hash-Router. Views werden bei Bedarf dynamisch geladen. Jede Navigation rendert in
// einen eigenen Container; eingehängt wird nur die jeweils aktuelle – so überschreibt
// eine langsame ältere Ansicht nie eine neuere (z. B. bei schnellen Klicks).

const routen = {
  '': () => import('./views/karte-view.js').then((m) => m.renderKarte),
  intro: () => import('./views/intro-view.js').then((m) => m.renderIntro),
  ort: () => import('./views/ort-view.js').then((m) => m.renderOrt),
  kapitel: () => import('./views/ort-view.js').then((m) => m.renderOrt),
  lektion: () => import('./views/lesson-view.js').then((m) => m.renderLesson),
  duell: () => import('./views/duell-view.js').then((m) => m.renderDuell),
  abnahme: () => import('./views/duell-view.js').then((m) => m.renderDuell),
  hinterhalt: () => import('./views/hinterhalt-view.js').then((m) => m.renderHinterhalt),
  backstage: () => import('./views/hinterhalt-view.js').then((m) => m.renderHinterhalt),
  ich: () => import('./views/ich-view.js').then((m) => m.renderIch),
  keycard: () => import('./views/ich-view.js').then((m) => m.renderIch),
  projekt: () => import('./views/projekt-view.js').then((m) => m.renderProjekt),
  showtime: () => import('./views/showtime-view.js').then((m) => m.renderShowtime),
  pruefung: () => import('./views/pruefung-view.js').then((m) => m.renderPruefung),
  lehrkraft: () => import('./views/lehrkraft-view.js').then((m) => m.renderLehrkraft),
  bericht: () => import('./views/bericht-view.js').then((m) => m.renderBericht),
  spickzettel: () => import('./views/spickzettel-view.js').then((m) => m.renderSpickzettel),
  login: () => import('./views/login-view.js').then((m) => m.renderLogin),
  klasse: () => import('./views/klasse-view.js').then((m) => m.renderKlasse),
};

let aktuelleView = null;
let navigation = 0;

async function route() {
  const wurzel = document.getElementById('app');
  const meine = ++navigation;
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
  wurzel.innerHTML = '<p class="laden">Lade …</p>';
  document.body.classList.toggle('intro-aktiv', name === 'intro');
  const container = document.createElement('div');
  container.className = 'ansicht';
  try {
    const lade = routen[name] || routen[''];
    const render = await lade();
    if (meine !== navigation) return;
    const view = (await render(container, ...parts.slice(1))) || null;
    if (meine !== navigation) {
      try {
        view?.destroy?.();
      } catch {
        /* egal */
      }
      return;
    }
    wurzel.replaceChildren(container);
    aktuelleView = view;
  } catch (e) {
    console.error(e);
    if (meine !== navigation) return;
    wurzel.innerHTML = `<div class="karte gesperrt-karte"><h2>Ups!</h2><p>Diese Seite konnte nicht geladen werden.</p><p><a class="btn btn-sekundaer" href="#/">Zurück nach Hyperia</a></p></div>`;
  }
  window.scrollTo(0, 0);
}

export function initRouter() {
  window.addEventListener('hashchange', route);
  route();
}
