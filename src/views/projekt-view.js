// Das Café-Projekt als navigierbare Website: setzt alle gespeicherten
// Etappen-Seiten mit dem gemeinsamen Stylesheet zusammen. Links auf
// eigene .html-Seiten funktionieren über die ww-navigate-Nachricht aus preview.js.

import { PROJEKT_SEITEN, getProjektAll } from '../projekt.js';
import { buildSrcdoc } from '../preview.js';

export async function renderProjekt(app) {
  const projekt = getProjektAll();

  app.innerHTML = `
    <div class="projekt-seite">
      <a class="zurueck" href="#/">← Zur Übersicht</a>
      <header class="projekt-kopf">
        <div class="projekt-kopf-icon">🏁</div>
        <div>
          <h1>Mein Café-Projekt</h1>
          <p>Alle Etappen, die du gemeistert hast, ergeben zusammen die Website vom <strong>Café Pause</strong>. Klicke Links in der Vorschau ruhig an – die Navigation funktioniert!</p>
        </div>
      </header>
      <div class="projekt-layout">
        <nav class="projekt-nav"></nav>
        <div class="projekt-buehne">
          <iframe class="projekt-vorschau" title="Café-Projekt"></iframe>
        </div>
      </div>
    </div>`;

  const navEl = app.querySelector('.projekt-nav');
  const iframe = app.querySelector('.projekt-vorschau');

  function platzhalter(seite) {
    return `<div style="font-family: sans-serif; color: #555; padding: 2rem; text-align: center;">
      <h1 style="font-size: 1.3rem;">„${seite.titel}“ gibt es noch nicht</h1>
      <p>Diese Seite baust du in <strong>Kapitel ${seite.kapitel}</strong> in der Projekt-Lektion.</p>
    </div>`;
  }

  function zeige(page) {
    const seite = PROJEKT_SEITEN.find((s) => s.page === page) || PROJEKT_SEITEN[0];
    const html = projekt.pages[seite.page];
    iframe.srcdoc = buildSrcdoc({
      html: html ?? platzhalter(seite),
      css: html != null ? projekt.css ?? '' : '',
    });
    navEl.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('aktiv', b.dataset.page === seite.page);
    });
  }

  for (const seite of PROJEKT_SEITEN) {
    const fertig = projekt.pages[seite.page] != null;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'projekt-nav-eintrag';
    btn.dataset.page = seite.page;
    btn.innerHTML = `<span>${fertig ? '✔' : '·'}</span> ${seite.titel}<small>${seite.page}.html</small>`;
    btn.addEventListener('click', () => zeige(seite.page));
    navEl.appendChild(btn);
  }

  // Klicks auf .html-Links innerhalb der Vorschau (siehe preview.js)
  const onMessage = (e) => {
    if (!app.isConnected) {
      window.removeEventListener('message', onMessage);
      return;
    }
    if (e.data && e.data.type === 'ww-navigate') zeige(e.data.page);
  };
  window.addEventListener('message', onMessage);

  zeige('index');
}
