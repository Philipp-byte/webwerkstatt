// Bauhilfen für die Etappen-Kette der FUNKEN-Website.
// Jede Etappe verändert den Zustand einer oder mehrerer Dateien; die Kette
// ist damit per Konstruktion lückenlos (Starter = Zustand nach der Etappe davor).

export const PAGES = [
  { id: 'index', titel: 'Startseite', datei: 'index.html' },
  { id: 'programm', titel: 'Programm', datei: 'programm.html' },
  { id: 'galerie', titel: 'Galerie', datei: 'galerie.html' },
  { id: 'tickets', titel: 'Tickets', datei: 'tickets.html' },
  { id: 'impressum', titel: 'Impressum', datei: 'impressum.html' },
];

export function kette() {
  const stand = { css: null, js: null };
  const etappen = [];

  function norm(s) {
    return String(s).replace(/\r\n/g, '\n');
  }

  // ersetzt genau ein Vorkommen (Fehler, wenn 0 oder >1)
  function patch(text, alt, neu, wo) {
    const t = norm(text);
    const a = norm(alt);
    const n = t.split(a).length - 1;
    if (n !== 1) throw new Error(`${wo}: "${a.slice(0, 60)}…" kommt ${n}× vor (erwartet 1)`);
    return t.replace(a, norm(neu));
  }

  /**
   * etappe({ id, page, titel, task, hints, tests, aendern: { html: [alt, neu] | 'neu:…', css: [...], js: [...] }, save, editable, startHtml })
   * aendern.<datei>: Funktion (alt) => neu, oder [alt, neu] (Patch), oder String (kompletter neuer Inhalt).
   */
  function etappe({ id, page, titel, task, hints, tests, aendern, save, editable, starter }) {
    const [chapter, lesson] = id.split('/');
    const files = {};
    const startFiles = {};
    for (const [datei, wie] of Object.entries(aendern)) {
      const key = datei === 'html' ? `html:${page}` : datei;
      const vorher = stand[key] ?? null;
      let neu;
      if (typeof wie === 'function') neu = wie(vorher ?? '');
      else if (Array.isArray(wie)) {
        if (vorher == null) throw new Error(`${id}: Patch auf ${key}, aber es gibt noch keinen Stand`);
        neu = patch(vorher, wie[0], wie[1], id);
      } else neu = norm(wie);
      if (vorher == null) startFiles[datei] = starter?.[datei] ?? '';
      files[datei] = neu;
      stand[key] = neu;
    }
    // gesperrte Kontextdateien mitliefern (Seite bei CSS/JS-Etappen, Stylesheet und Skript bei HTML-Etappen)
    const gesperrt = {};
    if (page && files.html == null && stand[`html:${page}`] != null) gesperrt.html = stand[`html:${page}`];
    if (files.css == null && stand.css != null) gesperrt.css = stand.css;
    if (files.js == null && stand.js != null && page === 'index') gesperrt.js = stand.js;
    const alleFiles = { ...gesperrt, ...files };
    etappen.push({
      id,
      chapter,
      lesson,
      page,
      titel,
      task,
      hints,
      tests,
      files: alleFiles,
      startFiles: Object.keys(startFiles).length ? startFiles : undefined,
      editable: editable || Object.keys(files),
      save: save || Object.keys(files),
    });
  }

  return { etappe, etappen, stand };
}
