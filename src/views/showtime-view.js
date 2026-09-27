// Showtime: die eigene Website. Werkbank mit allen drei Dateien, Checkliste
// mit automatisch geprüften Pflicht-Kriterien, Download als ZIP.

import { getShowtime, showtimeSpeichern, abzeichenPruefen, vergibXp } from '../store.js';
import { createWorkbench } from '../engine/workbench.js';
import { runTests } from '../engine/checker.js';
import { buildSrcdoc } from '../engine/preview.js';
import { toast, konfetti } from '../gamification/celebrate.js';
import { sound } from '../gamification/sound.js';
import { meldeAbzeichen, verarbeiteXp } from './lesson-view.js';

const START_HTML = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Meine Website</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <h1>Mein Thema</h1>
    </header>
    <nav>
    </nav>
    <main>
    </main>
    <footer>
    </footer>
    <script src="script.js"></script>
  </body>
</html>
`;
const START_CSS = `body {\n  font-family: Arial, sans-serif;\n}\n`;
const START_JS = `// Dein JavaScript\n`;

// Pflicht-Kriterien: jedes Kriterium = Test-Liste, alle müssen bestehen
export const PFLICHT = [
  { titel: 'Grundgerüst mit Titel und Zeichensatz', tests: [{ type: 'source', file: 'html', matches: '<!doctype html' }, { type: 'source', file: 'html', matches: '<meta[^>]+charset' }, { type: 'selector', selector: 'title' }] },
  { titel: 'Eine Hauptüberschrift (h1) und mindestens zwei Zwischenüberschriften (h2)', tests: [{ type: 'selector', selector: 'h1', count: 1 }, { type: 'selector', selector: 'h2', min: 2 }] },
  { titel: 'Mindestens drei Absätze', tests: [{ type: 'selector', selector: 'p', min: 3 }] },
  { titel: 'Eine Navigation (nav) mit mindestens drei Links', tests: [{ type: 'selector', selector: 'nav a', min: 3 }] },
  { titel: 'Eine Liste (ul oder ol) mit mindestens drei Einträgen', tests: [{ type: 'selector', selector: 'ul li, ol li', min: 3 }] },
  { titel: 'Ein Bild mit Alternativtext', tests: [{ type: 'selector', selector: 'img[alt]' }, { type: 'attr', selector: 'img', attr: 'alt', matches: '\\S' }] },
  { titel: 'Eine Tabelle mit Kopfzeile', tests: [{ type: 'selector', selector: 'table th', min: 1 }, { type: 'selector', selector: 'table tr', min: 2 }] },
  { titel: 'Ein Formular mit Eingabefeld, Label und Knopf', tests: [{ type: 'selector', selector: 'form input' }, { type: 'selector', selector: 'form label' }, { type: 'selector', selector: 'form button, form input[type="submit"]' }] },
  { titel: 'Semantische Struktur: header, main, footer', tests: [{ type: 'selector', selector: 'header' }, { type: 'selector', selector: 'main' }, { type: 'selector', selector: 'footer' }] },
  { titel: 'Ein Link zu einem Impressum-Abschnitt oder einer Impressum-Seite', tests: [{ type: 'attr', selector: 'a', attr: 'href', matches: 'impressum', any: true }] },
  { titel: 'CSS: eigene Schrift und Farben für body und h1', tests: [{ type: 'source', file: 'css', matches: 'body\\s*\\{[^}]*font-family' }, { type: 'source', file: 'css', matches: 'h1\\s*\\{[^}]*color' }] },
  { titel: 'CSS: mindestens eine Klasse verwendet und gestaltet', tests: [{ type: 'selector', selector: '[class]' }, { type: 'source', file: 'css', matches: '\\.[a-zA-Z][\\w-]*\\s*\\{' }] },
  { titel: 'CSS: Box-Modell benutzt (padding und border oder margin)', tests: [{ type: 'source', file: 'css', matches: 'padding\\s*:' }, { type: 'source', file: 'css', matches: '(border|margin)\\s*:' }] },
  { titel: 'CSS: Navigation als Flexbox', tests: [{ type: 'style', selector: 'nav', prop: 'display', expected: 'flex' }] },
  { titel: 'JavaScript: ein Knopf verändert beim Klick etwas auf der Seite', tests: [{ type: 'source', file: 'js', matches: 'addEventListener\\s*\\(\\s*["\']click' }, { type: 'source', file: 'js', matches: 'getElementById|querySelector' }] },
];

export async function renderShowtime(app) {
  const st = getShowtime();
  app.innerHTML = `
    <div class="auftritt">
      <a class="zurueck" href="#/">← Zum Gelände</a>
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin:0.5rem 0 0.5rem">
        <h1 style="margin:0;flex:1">🎆 Showtime – deine eigene Website</h1>
        <span class="chip chip-farbe" id="stand" style="--farbe: var(--projekt)">0 / ${PFLICHT.length} Pflicht-Kriterien</span>
      </div>
      <p style="color:var(--ink-2);max-width:70ch">Jetzt bist du dran: eine Website zu <strong>deinem</strong> Thema – Verein, Hobby, Lieblingsspiel, Foodtruck, was du willst. Die Checkliste prüft die Pflicht-Kriterien automatisch; alles darüber hinaus ist Kür. Dein Stand wird automatisch gespeichert.</p>
      <div class="projekt-leiste">
        <button class="btn btn-primaer" type="button" id="pruefen">✔ Checkliste prüfen</button>
        <button class="btn btn-sekundaer" type="button" id="zip">⬇ Als ZIP herunterladen</button>
        <button class="btn btn-sekundaer" type="button" id="neu-tab">↗ Präsentieren (eigener Tab)</button>
      </div>
      <div class="showtime-werkbank" id="werkbank"></div>
      <div class="karte sektion">
        <h2>📋 Checkliste</h2>
        <ul class="checkliste" id="checkliste">${PFLICHT.map((p) => `<li><span class="sym">○</span><span>${p.titel}</span></li>`).join('')}</ul>
        <p style="color:var(--muted);font-size:0.85rem;margin:0.75rem 0 0">Kür-Ideen: ein zweites Bild mit Bildunterschrift, hover-Effekte, ein Schatten auf Karten, ein Zähler-Knopf, ein Dark-Mode-Schalter.</p>
      </div>
    </div>`;

  const files = { html: st.html ?? START_HTML, css: st.css ?? START_CSS, js: st.js ?? START_JS };
  let timer = null;
  const wb = createWorkbench(app.querySelector('#werkbank'), files, {
    onChange: () => {
      clearTimeout(timer);
      timer = setTimeout(() => showtimeSpeichern(wb.getFiles()), 800);
    },
  });

  async function pruefe(still = false) {
    const stand = wb.getFiles();
    showtimeSpeichern(stand);
    const items = app.querySelectorAll('#checkliste li');
    let ok = 0;
    for (let i = 0; i < PFLICHT.length; i++) {
      const res = await runTests(stand, PFLICHT[i].tests);
      if (!app.isConnected || !items[i]?.isConnected) return;
      const bestanden = res.every((r) => r.pass);
      items[i].classList.toggle('ok', bestanden);
      items[i].querySelector('.sym').textContent = bestanden ? '✔' : '○';
      if (bestanden) ok++;
    }
    app.querySelector('#stand').textContent = `${ok} / ${PFLICHT.length} Pflicht-Kriterien`;
    if (ok === PFLICHT.length) {
      const vorher = getShowtime().pflichtErfuellt;
      showtimeSpeichern({ pflichtErfuellt: true });
      if (!vorher) {
        const erg = vergibXp(300, { key: 'showtime#pflicht' });
        verarbeiteXp(erg, app.querySelector('#stand'));
        konfetti('gross');
        sound.fanfare();
        toast({ titel: 'Alle Pflicht-Kriterien erfüllt!', text: 'Deine Website steht. Jetzt die Kür.', icon: '🎆', art: 'ok', dauer: 5000 });
      }
      meldeAbzeichen(abzeichenPruefen({ ereignis: 'showtime' }));
    } else if (!still) {
      sound.klick();
    }
  }
  app.querySelector('#pruefen').addEventListener('click', () => pruefe(false));
  pruefe(true);

  app.querySelector('#neu-tab').addEventListener('click', () => {
    const blob = new Blob([buildSrcdoc(wb.getFiles(), { capture: false })], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
  });
  app.querySelector('#zip').addEventListener('click', async () => {
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();
    const o = zip.folder('meine-website');
    const f = wb.getFiles();
    o.file('index.html', f.html);
    o.file('style.css', f.css);
    o.file('script.js', f.js);
    const verwendet = new Set([...f.html.matchAll(/(?:src|href)="([^"]+\.(?:svg|wav|mp4|png|jpg))"/g)].map((m) => m[1]));
    await Promise.all([...verwendet].map(async (name) => {
      try {
        const res = await fetch(new URL(`uebung/${name}`, document.baseURI));
        if (res.ok) o.file(name, await res.blob());
      } catch { /* fehlt */ }
    }));
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'meine-website.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast({ titel: 'ZIP heruntergeladen', text: 'Entpacken und index.html öffnen.', icon: '📦', art: 'ok' });
  });

  return { destroy: () => { clearTimeout(timer); showtimeSpeichern(wb.getFiles()); wb.destroy(); } };
}
