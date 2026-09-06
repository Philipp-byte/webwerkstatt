// Speicher für das große Café-Projekt: bestandene Etappen-Ergebnisse je Seite
// plus das gemeinsame Stylesheet. Details: docs/projekt-cafe.md

const KEY = 'webwerkstatt.projekt.v1';

export const PROJEKT_SEITEN = [
  { page: 'index', titel: 'Startseite', kapitel: '02' },
  { page: 'speisekarte', titel: 'Speisekarte', kapitel: '07' },
  { page: 'galerie', titel: 'Galerie', kapitel: '06' },
  { page: 'kontakt', titel: 'Kontakt', kapitel: '09' },
  { page: 'impressum', titel: 'Impressum', kapitel: '15' },
];

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { pages: {}, css: null, js: null };
  } catch {
    return { pages: {}, css: null, js: null };
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Speicher blockiert – Projektstand gilt dann nur für diese Sitzung.
  }
}

export function getProjektSeite(page) {
  return load().pages[page] ?? null;
}

export function setProjektSeite(page, html) {
  const data = load();
  data.pages[page] = html;
  save(data);
}

export function getProjektCss() {
  return load().css;
}

export function setProjektCss(css) {
  const data = load();
  data.css = css;
  save(data);
}

export function getProjektJs() {
  return load().js ?? null;
}

export function setProjektJs(js) {
  const data = load();
  data.js = js;
  save(data);
}

export function getProjektAll() {
  return load();
}

export function setProjektAll(data) {
  if (data && typeof data === 'object' && data.pages) save(data);
}
