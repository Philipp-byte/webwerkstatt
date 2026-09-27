// Kapitel 10 – CSS-Grundlagen (Station „Lichtpult“), das erste CSS-Kapitel.
// Erzeugt public/content/chapters/10-css-grundlagen/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '10-css-grundlagen');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

const FIG_REGEL = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">Eine CSS-Regel</text><text x="36" y="62" fill="#38c7ff" font-family="monospace" font-size="18" font-weight="bold">h1</text><text x="66" y="62" fill="#eef2ff" font-family="monospace" font-size="18">{</text><text x="60" y="92" fill="#ffd84d" font-family="monospace" font-size="18" font-weight="bold">color</text><text x="118" y="92" fill="#eef2ff" font-family="monospace" font-size="18">:</text><text x="136" y="92" fill="#ff7a45" font-family="monospace" font-size="18" font-weight="bold">orange</text><text x="204" y="92" fill="#eef2ff" font-family="monospace" font-size="18">;</text><text x="36" y="122" fill="#eef2ff" font-family="monospace" font-size="18">}</text><path d="M58 100 V106 H212 V100" stroke="#4ade80" stroke-width="1.5" fill="none"/><text x="222" y="110" fill="#4ade80">Deklaration</text><text x="36" y="148" fill="#38c7ff">Selektor</text><text x="112" y="148" fill="#ffd84d">Eigenschaft</text><text x="208" y="148" fill="#ff7a45">Wert</text><text x="236" y="62" fill="#b48cff">{ } Block</text></svg>`;

const FIG_ORTE = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">Drei Orte für CSS</text><rect x="12" y="38" width="92" height="96" rx="8" fill="#e8ecf7"/><text x="58" y="62" text-anchor="middle" fill="#0f1320" font-weight="bold">Inline</text><text x="58" y="86" text-anchor="middle" fill="#0f1320" font-family="monospace">style="…"</text><text x="58" y="118" text-anchor="middle" fill="#ff7a45" font-weight="bold">1 Element</text><rect x="114" y="38" width="92" height="96" rx="8" fill="#e8ecf7"/><text x="160" y="62" text-anchor="middle" fill="#0f1320" font-weight="bold">Intern</text><text x="160" y="86" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;style&gt;</text><text x="160" y="118" text-anchor="middle" fill="#ff7a45" font-weight="bold">1 Seite</text><rect x="216" y="38" width="92" height="96" rx="8" fill="#38c7ff"/><text x="262" y="62" text-anchor="middle" fill="#0f1320" font-weight="bold">Extern</text><text x="262" y="86" text-anchor="middle" fill="#0f1320" font-family="monospace">style.css</text><text x="262" y="118" text-anchor="middle" fill="#0f1320" font-weight="bold">alle Seiten</text></svg>`;

const FIG_FARBEN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">Ein Hex-Code: drei Paare</text><rect x="18" y="44" width="60" height="60" rx="8" fill="#ff7a45"/><text x="98" y="84" fill="#eef2ff" font-family="monospace" font-size="24">#</text><text x="116" y="84" fill="#ff7a45" font-family="monospace" font-size="24" font-weight="bold">ff</text><text x="150" y="84" fill="#4ade80" font-family="monospace" font-size="24" font-weight="bold">7a</text><text x="184" y="84" fill="#38c7ff" font-family="monospace" font-size="24" font-weight="bold">45</text><text x="130" y="110" text-anchor="middle" fill="#ff7a45">Rot</text><text x="164" y="110" text-anchor="middle" fill="#4ade80">Grün</text><text x="198" y="110" text-anchor="middle" fill="#38c7ff">Blau</text><text x="228" y="78" fill="#eef2ff">00 = nichts</text><text x="228" y="96" fill="#eef2ff">ff = voll</text><text x="160" y="144" text-anchor="middle" fill="#eef2ff" font-family="monospace">= rgb(255, 122, 69)</text></svg>`;

const FIG_HINTERGRUND = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#e8ecf7"/><text x="160" y="24" text-anchor="middle" fill="#0f1320" font-weight="bold">Schrift und Fläche</text><rect x="24" y="44" width="272" height="56" rx="8" fill="#0f1320"/><text x="160" y="78" text-anchor="middle" fill="#ffd84d" font-size="16" font-weight="bold">Kollektiv FUNKEN</text><path d="M84 100 V118" stroke="#38c7ff" stroke-width="2"/><text x="84" y="134" text-anchor="middle" fill="#0f1320" font-family="monospace">background-color</text><text x="84" y="150" text-anchor="middle" fill="#38c7ff">die Fläche</text><path d="M240 84 V118" stroke="#ffd84d" stroke-width="2"/><text x="240" y="134" text-anchor="middle" fill="#0f1320" font-family="monospace">color</text><text x="240" y="150" text-anchor="middle" fill="#0f1320">die Schrift</text></svg>`;

/* ---------- Übungs-HTML (drei Lebenswelten) ---------- */

const STECKBRIEF = `<h1>Steckbrief: Lea</h1>
<p>17 Jahre, Heilbronn, Praktikum in einer Fahrradwerkstatt.</p>
<h2>Lieblingsdinge</h2>
<ul>
  <li>Bouldern am Wochenende</li>
  <li>Pizza mit Pilzen</li>
  <li>Katze Mo</li>
</ul>
<p>Mehr Fotos: <a href="galerie.html">Galerie</a></p>
<p>Motto: Erst machen, dann reden.</p>
`;

const SETUP = `<header>
  <h1>Mein Gaming-Setup</h1>
  <p>Selbst zusammengestellt, Stück für Stück.</p>
</header>
<main>
  <h2>Monitor</h2>
  <p>27 Zoll, 144 Hertz – ruckelfrei.</p>
  <h2>Tastatur</h2>
  <p>Mechanisch, mit roten Schaltern.</p>
  <h2>Maus</h2>
  <p>Leicht und kabellos. Tipps gibt es im <a href="https://www.example.com" target="_blank">Setup-Forum</a>.</p>
</main>
<footer>
  <p>Setup-Liste von Deniz · <a href="mailto:deniz@example.com">Schreib mir</a></p>
</footer>
`;

const TEAM = `<header>
  <h1>SV Neckarkick</h1>
  <p>Fußball in Heilbronn seit 1921 – grün-weiß, seit immer.</p>
</header>
<main>
  <h2>Nächstes Spiel</h2>
  <p>Sonntag, 15 Uhr, Sportplatz Hafenstraße.</p>
  <h2>Mannschaft</h2>
  <ul>
    <li>Tor: Sina</li>
    <li>Abwehr: Malik, Jo, Deniz</li>
    <li>Sturm: Ayşe, Tom</li>
  </ul>
  <p><a href="tickets.html">Tickets</a> · <a href="anfahrt.html">Anfahrt</a></p>
</main>
<footer>
  <p>SV Neckarkick e. V. · Hafenstraße 9 · 74072 Heilbronn</p>
</footer>
`;

/* ---------- Lektion 1: Was ist CSS? ---------- */
schreibe('lessons/01-was-ist-css.json', {
  id: '01-was-ist-css',
  title: 'Was ist CSS?',
  konzepte: ['css.regel'],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Die FUNKEN-Seite steht: Überschriften, Listen, Tabellen, Formular. Aber sie sieht aus wie ein Schulheft – schwarz auf weiß. Das Gerüst ist fertig, jetzt geht am **Lichtpult** das Licht an.\n\nDafür gibt es **CSS** (*Cascading Style Sheets*), die Sprache für das **Aussehen**. HTML sagt, *was* auf der Seite steht. CSS sagt, *wie* es aussieht: Farben, Schrift, Abstände, Layout.',
      figure: FIG_REGEL,
    },
    {
      type: 'explain',
      text: 'CSS besteht aus **Regeln**. Eine Regel sagt: *Für diese Elemente gilt dieses Aussehen.*\n\n```css\nh1 {\n  color: orange;\n}\n```\n\n- **Selektor** `h1`: Wen betrifft es? Der Tag-Name **ohne** spitze Klammern – alle h1 der Seite.\n- **Deklarationsblock** `{ … }`: die geschweiften Klammern.\n- **Deklaration** `color: orange;`: **Eigenschaft**, Doppelpunkt, **Wert**, Semikolon.',
    },
    {
      type: 'example',
      text: 'Links dein Stylesheet, rechts die Vorschau. **Ändere** `orange` zu `green` oder `blue` und beobachte die Überschrift. **Ändere** dann `gray` zu `red`. Und **tippe** die Eigenschaft absichtlich falsch (`colr`) – was passiert? Genau: nichts. Unbekannte Eigenschaften ignoriert der Browser stillschweigend.',
      html: '<h1>Lichtpult</h1>\n<p>Hier wird ausprobiert, was CSS kann.</p>\n<p>Zwei Absätze, eine Regel.</p>\n',
      css: 'h1 {\n  color: orange;\n}\n\np {\n  color: gray;\n}\n',
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'In der Regel `p { color: gray; }` – was ist `color`?',
      options: ['Die Eigenschaft – sie sagt, was verändert wird', 'Der Selektor – er sagt, welche Elemente betroffen sind', 'Der Wert – er sagt, wie es aussehen soll'],
      correct: 0,
      explanation: '`p` ist der Selektor, `color` die Eigenschaft, `gray` der Wert. Eigenschaft und Wert zusammen bilden die Deklaration.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Steckbrief: Die Hauptüberschrift wird grün (`green`). Die Absätze bleiben schwarz.',
      starter: { html: STECKBRIEF, css: '/* Regel für die Hauptüberschrift */\n' },
      editable: ['css'],
      hints: [
        'Eine Regel besteht aus Selektor, geschweiften Klammern und darin Eigenschaft: Wert;',
        'Der Selektor ist der Tag-Name ohne spitze Klammern. Die Eigenschaft für die Schriftfarbe heißt color.',
        'Muster aus anderem Kontext: `p { color: blue; }` färbt alle Absätze blau – du brauchst dasselbe für die Hauptüberschrift in Grün.',
      ],
      solution: { css: '/* Regel für die Hauptüberschrift */\n\nh1 {\n  color: green;\n}\n' },
      tests: [
        { type: 'style', selector: 'h1', prop: 'color', expected: 'green', label: 'Die Hauptüberschrift ist grün' },
        { type: 'style', selector: 'p', prop: 'color', expected: 'black', label: 'Die Absätze bleiben schwarz' },
        { type: 'source', file: 'css', matches: 'h1\\s*\\{', label: 'Es gibt eine Regel mit dem Selektor h1' },
      ],
    },
    {
      type: 'explain',
      text: 'Drei Dinge zum Merken:\n\n- Eine Regel gilt für **alle** passenden Elemente. `li { … }` trifft jeden Listenpunkt der Seite – egal wie viele.\n- Farben schreibst du als englischen Namen (`red`, `green`, `orange`) oder als Code mit Raute wie `#ff6a00`. Mehr dazu in Lektion 3.\n- **Kommentare** stehen zwischen `/*` und `*/`. Der Browser überspringt sie, du behältst den Überblick:\n\n```css\n/* Farben der Startseite */\n```',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Regel, die alle Absätze der Seite rot färbt.',
      template: '___ {\n  ___: red;\n}',
      accept: [['p'], ['color']],
      hint: 'Der Selektor ist der Tag-Name des Absatz-Elements; die Eigenschaft ist die für die Schriftfarbe.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Setup-Seite: Alle drei Zwischenüberschriften (Monitor, Tastatur, Maus) werden blau (`blue`) – mit einer einzigen Regel. Die Regel für die Hauptüberschrift bleibt.',
      starter: { html: SETUP, css: '/* Setup-Seite */\n\nh1 {\n  color: orange;\n}\n' },
      editable: ['css'],
      hints: [
        'Drei Überschriften, aber nur eine Regel: Der Element-Selektor trifft alle h2 gleichzeitig.',
        'Neue Regel unter die vorhandene – gleicher Aufbau wie die h1-Regel, nur Selektor und Farbe sind anders.',
        'Muster: `li { color: gray; }` färbt alle Listenpunkte. Ersetze Selektor und Farbe passend.',
      ],
      solution: { css: '/* Setup-Seite */\n\nh1 {\n  color: orange;\n}\n\nh2 {\n  color: blue;\n}\n' },
      tests: [
        { type: 'style', selector: 'h2', prop: 'color', expected: 'blue', label: 'Die erste Zwischenüberschrift ist blau' },
        { type: 'style', selector: 'h2:last-of-type', prop: 'color', expected: 'blue', label: 'Auch die letzte Zwischenüberschrift ist blau – eine Regel für alle' },
        { type: 'style', selector: 'h1', prop: 'color', expected: 'orange', label: 'Die Hauptüberschrift ist weiterhin orange' },
      ],
    },
    {
      type: 'pair',
      text: '**Ordne** die Teile der Regel `h2 { color: red; }` ihren Namen zu.',
      pairs: [
        ['`h2`', 'Selektor – wen die Regel betrifft'],
        ['`color`', 'Eigenschaft – was verändert wird'],
        ['`red`', 'Wert – wie es verändert wird'],
        ['`color: red;`', 'Deklaration – Eigenschaft und Wert zusammen'],
        ['`/* … */`', 'Kommentar – wird vom Browser übersprungen'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** das Stylesheet des Fußballvereins: Die Hauptüberschrift sollte grün sein und die Absätze grau – aber alles bleibt schwarz. Finde die zwei Fehler und korrigiere sie.',
      starter: { html: TEAM, css: '/* Vereinsfarben */\n\n<h1> {\n  color: green;\n}\n\np {\n  colour: gray;\n}\n' },
      editable: ['css'],
      hints: [
        'Schau dir den Selektor der ersten Regel genau an – wie schreibt man einen Element-Selektor?',
        'In der zweiten Regel ist die Eigenschaft falsch geschrieben. Der Browser kennt sie nicht und ignoriert die ganze Deklaration.',
        'Selektoren stehen ohne spitze Klammern, und Eigenschaften müssen exakt so heißen wie in der Erklärung – amerikanisches Englisch.',
      ],
      solution: { css: '/* Vereinsfarben */\n\nh1 {\n  color: green;\n}\n\np {\n  color: gray;\n}\n' },
      tests: [
        { type: 'style', selector: 'h1', prop: 'color', expected: 'green', label: 'Die Hauptüberschrift ist grün' },
        { type: 'style', selector: 'p', prop: 'color', expected: 'gray', label: 'Die Absätze sind grau' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Jetzt bekommt die FUNKEN-Startseite ihre erste Regel. In der Werkbank ist der Tab **style.css** dein Stylesheet – die Vorschau verbindet ihn automatisch mit der Seite. Wie das auf einer echten Website geht, lernst du in der nächsten Lektion.\n\nSam wünscht sich die Hauptüberschrift in Funken-Orange – den Farbcode findest du in der Aufgabe. Der Kommentar oben in der Datei bleibt stehen.',
    },
    { type: 'code', etappe: '10-css-grundlagen/01-was-ist-css' },
  ],
});

/* ---------- Lektion 2: Drei Orte für CSS ---------- */

const SETUP_DOKUMENT_OHNE_LINK = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Mein Setup</title>
  </head>
  <body>
    <h1>Mein Gaming-Setup</h1>
    <p>Selbst zusammengestellt, Stück für Stück.</p>
    <h2>Monitor</h2>
    <p>27 Zoll, 144 Hertz – ruckelfrei.</p>
    <h2>Tastatur</h2>
    <p>Mechanisch, mit roten Schaltern.</p>
  </body>
</html>
`;

const SETUP_DOKUMENT_MIT_LINK = SETUP_DOKUMENT_OHNE_LINK.replace(
  '    <title>Mein Setup</title>\n',
  '    <title>Mein Setup</title>\n    <link rel="stylesheet" href="style.css">\n'
);

const TEAM_DOKUMENT_INTERN = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>SV Neckarkick</title>
    <style>
      h1 {
        color: green;
      }

      p {
        color: gray;
      }
    </style>
  </head>
  <body>
    <h1>SV Neckarkick</h1>
    <p>Fußball in Heilbronn seit 1921.</p>
    <p>Nächstes Spiel: Sonntag, 15 Uhr, Sportplatz Hafenstraße.</p>
  </body>
</html>
`;

const TEAM_DOKUMENT_EXTERN = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>SV Neckarkick</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>SV Neckarkick</h1>
    <p>Fußball in Heilbronn seit 1921.</p>
    <p>Nächstes Spiel: Sonntag, 15 Uhr, Sportplatz Hafenstraße.</p>
  </body>
</html>
`;

schreibe('lessons/02-drei-orte-fuer-css.json', {
  id: '02-drei-orte-fuer-css',
  title: 'Drei Orte für CSS',
  konzepte: ['css.orte', 'css.link'],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Bevor du weiterfärbst, eine Frage: *Wo* schreibt man CSS eigentlich hin? Es gibt drei Orte:\n\n1. **Inline** – direkt am Tag, im Attribut `style`. Gilt für genau dieses Element.\n2. **Intern** – in einem `style`-Element im head. Gilt für diese eine Seite.\n3. **Extern** – in einer eigenen Datei wie `style.css`, die jede Seite einbindet.\n\nAlle drei funktionieren. Aber nur einer ist wirklich praktisch.',
      figure: FIG_ORTE,
    },
    {
      type: 'explain',
      text: 'So sehen die ersten beiden Orte aus:\n\n```html\n<head>\n  <style>\n    p { color: gray; }\n  </style>\n</head>\n<body>\n  <p style="color: red;">Rot – nur dieser Absatz.</p>\n  <p>Grau – wie alle anderen Absätze.</p>\n</body>\n```\n\nIm `style`-Element steht eine normale Regel mit Selektor. Im `style`-Attribut steht **nur die Deklaration** – ohne Selektor, ohne Klammern. Der Browser weiß ja, welches Element gemeint ist.',
    },
    {
      type: 'example',
      text: '**Ändere** im `style`-Attribut `red` zu `green` – nur ein Absatz ändert sich. **Ändere** im `style`-Element `gray` zu `blue` – alle anderen Absätze folgen. Und der erste? Bleibt grün: Die Angabe direkt am Element gewinnt gegen die Regel im head.',
      html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Drei Orte</title>\n    <style>\n      p { color: gray; }\n    </style>\n  </head>\n  <body>\n    <h1>Setup-Tipps</h1>\n    <p style="color: red;">Monitor immer auf Augenhöhe.</p>\n    <p>Tastatur flach, Handgelenke gerade.</p>\n    <p>Maus-Empfindlichkeit einmal einstellen, dann lassen.</p>\n  </body>\n</html>\n',
    },
    {
      type: 'quiz',
      question: 'Ein Sneaker-Shop hat 40 Seiten. Die Linkfarbe soll überall geändert werden – mit einer einzigen Änderung. Welcher Ort für CSS macht das möglich?',
      options: ['Eine externe CSS-Datei, die alle 40 Seiten einbinden', 'Ein style-Attribut an jedem einzelnen Link', 'Ein style-Element im head jeder Seite'],
      correct: 0,
      explanation: 'Externe Datei: eine Zeile ändern, 40 Seiten ändern sich. Bei den anderen Orten müsstest du jede Seite oder sogar jeden Link einzeln anfassen.',
    },
    {
      type: 'explain',
      text: 'Der dritte Ort: eine eigene Datei, zum Beispiel `design.css`. Darin stehen **nur Regeln**, kein HTML. Jede Seite bindet sie im head ein, am besten nach dem `title`:\n\n```html\n<head>\n  <title>Mein Setup</title>\n  <link rel="stylesheet" href="design.css">\n</head>\n```\n\n`link` ist ein **Leerelement** – kein schließender Tag. `rel="stylesheet"` sagt: Diese Datei ist ein Stylesheet. `href` nennt den Dateinamen.',
    },
    {
      type: 'explain',
      text: 'Warum extern die beste Wahl ist: **eine Datei, alle Seiten.** Änderst du dort eine Zeile, ändern sich Startseite, Programm und Tickets gleichzeitig. Inhalt (HTML) und Aussehen (CSS) bleiben getrennt – übersichtlich und leicht zu pflegen.\n\nIn der Werkbank ist der Tab **style.css** genau diese Datei. Die Vorschau verbindet sie automatisch – auf einer echten Website übernimmt das `link`-Element diese Aufgabe.',
    },
    {
      type: 'code',
      task: '**Vervollständige** den Kopfbereich der Setup-Seite um die Verknüpfung mit der Stylesheet-Datei `style.css`, direkt nach dem Titel.',
      starter: { html: SETUP_DOKUMENT_OHNE_LINK, css: '/* Setup-Seite */\n\nh1 {\n  color: #38c7ff;\n}\n\nh2 {\n  color: #ffd84d;\n}\n' },
      editable: ['html'],
      hints: [
        'Die Verknüpfung ist ein Leerelement im head – ohne schließenden Tag.',
        'Zwei Attribute: Eins nennt die Art der Beziehung (stylesheet), das andere die Datei.',
        'Muster aus der Erklärung: `<link rel="stylesheet" href="design.css">` – bei dir heißt die Datei anders.',
      ],
      solution: { html: SETUP_DOKUMENT_MIT_LINK },
      tests: [
        { type: 'attr', selector: 'head link[rel="stylesheet"]', attr: 'href', expected: 'style.css', label: 'Der head verknüpft style.css als Stylesheet' },
        { type: 'order', selectors: ['head title', 'head link[rel="stylesheet"]'], label: 'Die Verknüpfung steht nach dem Titel' },
        { type: 'text', selector: 'title', expected: 'Mein Setup', label: 'Der Titel ist noch da' },
      ],
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Verknüpfung mit der Datei `farben.css`.',
      template: '<___ rel="___" href="farben.css">',
      accept: [['link'], ['stylesheet']],
      hint: 'Das Leerelement heißt wie „Verknüpfung“ auf Englisch; die Beziehung ist ein Stylesheet.',
    },
    {
      type: 'code',
      task: '**Gestalte** im Steckbrief genau den Motto-Absatz rot (`red`) – direkt am Element, ohne Regel im Stylesheet. Alle anderen Absätze bleiben schwarz.',
      starter: { html: STECKBRIEF },
      editable: ['html'],
      hints: [
        'Inline-CSS: Das Attribut kommt in den öffnenden Tag des Motto-Absatzes.',
        'Im Attribut steht nur die Deklaration – kein Selektor, keine geschweiften Klammern.',
        'Muster: `<h2 style="color: blue;">…</h2>` – bei dir ein Absatz in Rot.',
      ],
      solution: { html: STECKBRIEF.replace('<p>Motto:', '<p style="color: red;">Motto:') },
      tests: [
        { type: 'style', selector: 'p:last-of-type', prop: 'color', expected: 'red', label: 'Der Motto-Absatz ist rot' },
        { type: 'style', selector: 'p:first-of-type', prop: 'color', expected: 'black', label: 'Der erste Absatz bleibt schwarz' },
        { type: 'source', file: 'html', matches: '<p[^>]*style\\s*=', label: 'Die Farbe steht im style-Attribut direkt am Absatz' },
      ],
    },
    {
      type: 'order',
      text: '**Sortiere**: Was passiert, wenn der Browser eine Seite mit externem Stylesheet lädt?',
      lines: ['Der Browser lädt die HTML-Datei', 'Im head findet er das link-Element', 'Er lädt die Datei style.css', 'Er wendet die Regeln auf die passenden Elemente an', 'Die Seite erscheint mit Farben'],
      explanation: 'Erst HTML, dann das Stylesheet, dann anwenden – deshalb steht das link-Element im head, ganz oben.',
    },
    {
      type: 'code',
      task: '**Übertrage** die beiden Regeln aus dem style-Element in die externe Datei `style.css`: Das style-Element verschwindet, der head verknüpft die Datei. Die Überschrift bleibt grün, die Absätze bleiben grau.',
      starter: { html: TEAM_DOKUMENT_INTERN, css: '/* Stylesheet des Vereins */\n' },
      editable: ['html', 'css'],
      hints: [
        'Reihenfolge: Regeln in den CSS-Tab kopieren, dann das style-Element samt Inhalt löschen, dann verknüpfen.',
        'In style.css stehen nur die Regeln – ohne style-Tags.',
        'Die Verknüpfung ist dasselbe Leerelement wie in der ersten Aufgabe: im head, nach dem title.',
      ],
      solution: {
        html: TEAM_DOKUMENT_EXTERN,
        css: '/* Stylesheet des Vereins */\n\nh1 {\n  color: green;\n}\n\np {\n  color: gray;\n}\n',
      },
      tests: [
        { type: 'source', file: 'html', matches: '<style', absent: true, label: 'Im HTML gibt es kein style-Element mehr' },
        { type: 'attr', selector: 'head link[rel="stylesheet"]', attr: 'href', expected: 'style.css', label: 'Der head verknüpft style.css' },
        { type: 'source', file: 'css', matches: 'h1\\s*\\{', label: 'Die h1-Regel steht im Stylesheet' },
        { type: 'source', file: 'css', matches: 'p\\s*\\{', label: 'Die p-Regel steht im Stylesheet' },
        { type: 'style', selector: 'h1', prop: 'color', expected: 'green', label: 'Die Überschrift ist weiterhin grün' },
        { type: 'style', selector: 'p', prop: 'color', expected: 'gray', label: 'Die Absätze sind weiterhin grau' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Eine Datei für alle Seiten – und ein Backup davon, bitte.\n\nDie FUNKEN-Startseite hat ihre Regel schon in style.css, aber der head weiß noch nichts davon. Jetzt kommt die Verknüpfung in den Kopfbereich, nach dem Titel. In der Werkbank ändert sich sichtbar nichts; auf der echten Website macht genau diese Zeile den Unterschied.',
    },
    { type: 'code', etappe: '10-css-grundlagen/02-drei-orte-fuer-css' },
  ],
});

/* ---------- Lektion 3: Farben ---------- */
schreibe('lessons/03-farben.json', {
  id: '03-farben',
  title: 'Farben',
  konzepte: ['css.farbe'],
  steps: [
    {
      type: 'explain',
      text: '„Das Orange ist zu gelb!“ – „Welches Orange denn?“ Mit Wörtern kommt man bei Farben nicht weit. Deshalb kennt CSS drei Schreibweisen:\n\n- **Farbname**: `orange`, `red`, `white` – rund 150 englische Wörter.\n- **Hex-Code**: `#ff6a00` – eine Raute und sechs Zeichen.\n- **rgb()**: `rgb(255, 106, 0)` – drei Zahlen von 0 bis 255 für Rot, Grün, Blau.\n\nDie letzten beiden ergeben genau dasselbe Funken-Orange.',
      figure: FIG_FARBEN,
    },
    {
      type: 'example',
      text: 'Dreimal Orange, dreimal anders geschrieben. **Ändere** in `rgb()` die erste Zahl auf 0 – was passiert ohne Rot? **Ändere** im Hex-Code die ersten beiden Zeichen `ff` zu `00`. **Probiere** Farbnamen wie `tomato`, `gold` oder `teal`.',
      html: '<h1>Farben am Lichtpult</h1>\n<p>Dreimal dasselbe Orange – dreimal anders geschrieben.</p>\n<h2>Wer hat welche Farbe?</h2>\n<p>Ändere die Werte und vergleiche.</p>\n',
      css: 'h1 {\n  color: orange;\n}\n\nh2 {\n  color: #ff6a00;\n}\n\np {\n  color: rgb(255, 106, 0);\n}\n',
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Welche Schreibweise ist ein gültiger Hex-Code?',
      options: ['`#1b1b2f`', '`1b1b2f#`', '`#1b1b2g`', '`rgb(#1b1b2f)`'],
      correct: 0,
      explanation: 'Raute vorn, dann sechs Zeichen aus 0–9 und a–f. Ein g gibt es im Hex-System nicht, und rgb() erwartet drei Zahlen, keinen Hex-Code.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Vereinsseite: Die Hauptüberschrift bekommt das Vereinsgrün `#1e6f3c`. Die Zwischenüberschriften bleiben schwarz.',
      starter: { html: TEAM, css: '/* Vereinsfarben */\n' },
      editable: ['css'],
      hints: [
        'Eine Regel mit dem Element-Selektor für die Hauptüberschrift und der Eigenschaft für die Schriftfarbe.',
        'Der Hex-Code wird mit Raute übernommen – als Wert hinter dem Doppelpunkt.',
        'Muster: `h2 { color: #0b7dd6; }` färbt Zwischenüberschriften blau – bei dir die h1 im Vereinsgrün.',
      ],
      solution: { css: '/* Vereinsfarben */\n\nh1 {\n  color: #1e6f3c;\n}\n' },
      tests: [
        { type: 'style', selector: 'h1', prop: 'color', expected: '#1e6f3c', label: 'Die Hauptüberschrift ist vereinsgrün (#1e6f3c)' },
        { type: 'style', selector: 'h2', prop: 'color', expected: 'black', label: 'Die Zwischenüberschriften bleiben schwarz' },
      ],
    },
    {
      type: 'explain',
      text: 'Ein Hex-Code besteht aus drei Paaren: **Rot, Grün, Blau**, jedes von `00` (nichts) bis `ff` (voll). Groß- oder Kleinschreibung ist egal.\n\n- `#ff0000` – volles Rot, kein Grün, kein Blau\n- `#000000` – Schwarz, `#ffffff` – Weiß\n- `#808080` – mittleres Grau\n\nSind beide Zeichen eines Paares gleich, gibt es die **Kurzform** mit drei Zeichen: `#f00` = `#ff0000`, `#fff` = `#ffffff`.',
    },
    {
      type: 'fill',
      text: '**Vervollständige**: Der Text der Seite wird weiß (Hex-Kurzform), die Hauptüberschrift rot als rgb-Wert.',
      template: 'body {\n  color: #___;\n}\n\nh1 {\n  color: ___(255, 0, 0);\n}',
      accept: [['fff', 'ffffff'], ['rgb']],
      hint: 'Weiß: alle drei Anteile voll, gekürzt auf drei Zeichen. Die Funktion heißt nach Rot, Grün, Blau.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Setup-Seite: Alle Zwischenüberschriften in `#38c7ff`. Alle Links in einem Blau aus Rot 11, Grün 125 und Blau 214 – geschrieben als rgb-Wert.',
      starter: { html: SETUP, css: '/* Setup-Seite */\n\nh1 {\n  color: #ffd84d;\n}\n' },
      editable: ['css'],
      hints: [
        'Zwei Regeln: eine für die Zwischenüberschriften, eine für das Link-Element.',
        'rgb() bekommt drei Zahlen mit Komma, in der Reihenfolge Rot, Grün, Blau.',
        'Muster: `p { color: rgb(80, 80, 80); }` – bei dir mit dem Link-Selektor und den drei Zahlen aus der Aufgabe.',
      ],
      solution: { css: '/* Setup-Seite */\n\nh1 {\n  color: #ffd84d;\n}\n\nh2 {\n  color: #38c7ff;\n}\n\na {\n  color: rgb(11, 125, 214);\n}\n' },
      tests: [
        { type: 'style', selector: 'h2', prop: 'color', expected: '#38c7ff', label: 'Die Zwischenüberschriften sind hellblau (#38c7ff)' },
        { type: 'style', selector: 'a', prop: 'color', expected: 'rgb(11, 125, 214)', label: 'Die Links sind blau (Rot 11, Grün 125, Blau 214)' },
        { type: 'source', file: 'css', matches: 'rgb\\(\\s*11\\s*,\\s*125\\s*,\\s*214\\s*\\)', label: 'Die Linkfarbe steht als rgb-Wert im Stylesheet' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Musst du jetzt jeden Absatz, jede Liste, jede Tabelle einzeln färben? Nein. Dank **Vererbung** gilt eine Farbe am `body` automatisch für alle Elemente darin:\n\n```css\nbody {\n  color: #333333;\n}\n```\n\nAlle Texte werden dunkelgrau – außer Elemente mit eigener Regel: Eine `h1`-Regel gewinnt gegen die geerbte Farbe. **Ausnahme:** Links bringen ihre eigene Browser-Farbe mit und brauchen eine eigene Regel.',
    },
    {
      type: 'pair',
      text: '**Ordne** jede Schreibweise ihrer Farbe zu.',
      pairs: [
        ['`#ff0000`', 'Rot – Hex mit sechs Zeichen'],
        ['`#0f0`', 'Grün – Hex-Kurzform'],
        ['`rgb(0, 0, 255)`', 'Blau – rgb-Wert'],
        ['`#000000`', 'Schwarz'],
        ['`white`', 'Weiß – Farbname'],
      ],
    },
    {
      type: 'code',
      task: '**Gestalte** den Steckbrief: Der gesamte Text der Seite in `#2d2d2d`, die Hauptüberschrift in `#c2185b`, alle Links in `#0b7dd6`. Nutze die Vererbung – die Listenpunkte bekommen keine eigene Regel.',
      starter: { html: STECKBRIEF, css: '/* Steckbrief */\n' },
      editable: ['css'],
      hints: [
        'Drei Regeln: body, h1 und a. Was am body steht, erben alle Kinder.',
        'Links brauchen eine eigene Regel – sie behalten sonst ihre Browser-Farbe.',
        'Aufbau jeder Regel: Selektor, geschweifte Klammern, darin die Deklaration für die Schriftfarbe mit dem jeweiligen Hex-Code.',
      ],
      solution: { css: '/* Steckbrief */\n\nbody {\n  color: #2d2d2d;\n}\n\nh1 {\n  color: #c2185b;\n}\n\na {\n  color: #0b7dd6;\n}\n' },
      tests: [
        { type: 'style', selector: 'body', prop: 'color', expected: '#2d2d2d', label: 'Der Text der Seite ist dunkelgrau (#2d2d2d)' },
        { type: 'style', selector: 'li', prop: 'color', expected: '#2d2d2d', label: 'Die Listenpunkte erben die Textfarbe' },
        { type: 'style', selector: 'h1', prop: 'color', expected: '#c2185b', label: 'Die Hauptüberschrift ist pink (#c2185b)' },
        { type: 'style', selector: 'a', prop: 'color', expected: '#0b7dd6', label: 'Die Links sind blau (#0b7dd6)' },
        { type: 'source', file: 'css', matches: 'li\\s*\\{', absent: true, label: 'Keine eigene Regel für li – die Vererbung übernimmt' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Auf der FUNKEN-Startseite ist noch alles schwarz – außer der Hauptüberschrift. Jetzt bekommt der gesamte Text die Nachtfarbe und alle Links das FUNKEN-Blau.\n\nZwei Regeln reichen: eine für den body – die Vererbung erledigt den Rest – und eine für die Links, die sonst ihre Browser-Farbe behalten. Die h1 bleibt orange: Ihre eigene Regel gewinnt.',
    },
    { type: 'code', etappe: '10-css-grundlagen/03-farben' },
  ],
});

/* ---------- Lektion 4: Hintergrund ---------- */
schreibe('lessons/04-hintergrund.json', {
  id: '04-hintergrund',
  title: 'Hintergrund',
  konzepte: ['css.background'],
  steps: [
    {
      type: 'explain',
      text: 'Nachtmodus auf dem Handy: dunkle Fläche, helle Schrift. In CSS sind das zwei Eigenschaften:\n\n- `color` färbt die **Schrift**.\n- `background-color` färbt die **Fläche** dahinter.\n\n```css\nheader {\n  background-color: #101828;\n  color: #ffffff;\n}\n```\n\nBeide Deklarationen stehen im selben Block, untereinander, jede mit Semikolon. Die Fläche reicht so weit wie das Element – beim Kopfbereich über die ganze Breite.',
      figure: FIG_HINTERGRUND,
    },
    {
      type: 'example',
      text: '**Ändere** die Hintergrundfarbe des header zu `gold` und die Schriftfarbe zu `black`. **Gib** dem footer eine eigene Regel mit dunkler Fläche. Dann **lösche** im header das Semikolon hinter dem Hintergrundwert – was passiert mit den beiden Deklarationen?',
      html: '<header>\n  <h1>Nachtschicht</h1>\n  <p>Ein Kopfbereich mit dunkler Fläche.</p>\n</header>\n<main>\n  <p>Der Hauptbereich behält den Seitenhintergrund.</p>\n</main>\n<footer>\n  <p>Fußbereich – noch ohne eigene Farbe.</p>\n</footer>\n',
      css: 'body {\n  background-color: #fff7e8;\n}\n\nheader {\n  background-color: #101828;\n  color: #ffffff;\n}\n',
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Der Fußbereich soll eine dunkle Fläche bekommen. Welche Eigenschaft brauchst du?',
      options: ['`background-color`', '`color`', '`bgcolor`', '`background-text`'],
      correct: 0,
      explanation: '`color` färbt nur die Schrift. `bgcolor` war ein uraltes HTML-Attribut, kein CSS – und `background-text` gibt es nicht.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Steckbrief: Die ganze Seite bekommt die Hintergrundfarbe `#e0f2ff` (Hellblau). Der Text bleibt schwarz.',
      starter: { html: STECKBRIEF, css: '/* Steckbrief */\n' },
      editable: ['css'],
      hints: [
        'Die ganze Seite = der body.',
        'Nicht color – die Eigenschaft für die Fläche besteht aus zwei Wörtern mit Bindestrich.',
        'Muster: `main { background-color: #eeeeee; }` – bei dir der body und das Hellblau.',
      ],
      solution: { css: '/* Steckbrief */\n\nbody {\n  background-color: #e0f2ff;\n}\n' },
      tests: [
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#e0f2ff', label: 'Die Seite hat einen hellblauen Hintergrund' },
        { type: 'style', selector: 'body', prop: 'color', expected: 'black', label: 'Der Text bleibt schwarz' },
      ],
    },
    {
      type: 'explain',
      text: 'Eine Regel darf **mehrere Deklarationen** enthalten – untereinander, jede mit Semikolon. Gibt es für ein Element schon eine Regel, schreibst du die neue Deklaration einfach dazu, statt eine zweite Regel zu öffnen:\n\n```css\nnav {\n  color: #1b1b2f;\n  background-color: #ffd23f;\n}\n```\n\nAchte auf **Kontrast**: dunkle Fläche, helle Schrift – oder umgekehrt. Dunkelgrau auf Schwarz liest niemand.',
    },
    {
      type: 'fill',
      text: '**Vervollständige**: Die ganze Seite wird hell, der Fußbereich dunkel.',
      template: '___ {\n  background-color: #f4f4f4;\n}\n\nfooter {\n  ___: #222222;\n}',
      accept: [['body'], ['background-color']],
      hint: 'Der Selektor für die ganze Seite ist das Element, in dem alles Sichtbare steht; die zweite Lücke ist die Eigenschaft für die Fläche.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Setup-Seite im Nachtmodus: Die Seite bekommt den Hintergrund `#0f1320` und die Textfarbe `#eef2ff`. Der Kopfbereich bekommt den Hintergrund `#38c7ff` und die Textfarbe `#0f1320`.',
      starter: { html: SETUP, css: '/* Setup-Seite */\n' },
      editable: ['css'],
      hints: [
        'Zwei Regeln: body und header, jede mit zwei Deklarationen.',
        'Die Fläche ist background-color, die Schrift color – jede Deklaration mit Semikolon.',
        'Muster: `footer { background-color: #222222; color: #ffffff; }` – Selektoren und Werte aus der Aufgabe einsetzen.',
      ],
      solution: { css: '/* Setup-Seite */\n\nbody {\n  background-color: #0f1320;\n  color: #eef2ff;\n}\n\nheader {\n  background-color: #38c7ff;\n  color: #0f1320;\n}\n' },
      tests: [
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#0f1320', label: 'Die Seite ist dunkel (#0f1320)' },
        { type: 'style', selector: 'body', prop: 'color', expected: '#eef2ff', label: 'Der Text ist hell (#eef2ff)' },
        { type: 'style', selector: 'header', prop: 'background-color', expected: '#38c7ff', label: 'Der Kopfbereich ist hellblau (#38c7ff)' },
        { type: 'style', selector: 'header', prop: 'color', expected: '#0f1320', label: 'Die Schrift im Kopfbereich ist dunkel (#0f1320)' },
      ],
    },
    {
      type: 'pair',
      text: '**Ordne** zu.',
      pairs: [
        ['`color`', 'färbt die Schrift'],
        ['`background-color`', 'färbt die Fläche hinter dem Inhalt'],
        ['`body`', 'Selektor für die ganze Seite'],
        ['`;`', 'beendet jede Deklaration'],
        ['helle Schrift auf dunkler Fläche', 'guter Kontrast – gut lesbar'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Vereinsfarben: Der Kopfbereich sollte dunkelgrün mit weißer Schrift sein, der Fußbereich hellgrau. Stattdessen ist der Kopfbereich weiß mit schwarzer Schrift und der Fußbereich hat keine Fläche. Finde die zwei Fehler.',
      starter: { html: TEAM, css: '/* Vereinsfarben */\n\nheader {\n  background-color: #1e6f3c\n  color: white;\n}\n\nfooter {\n  backgroundcolor: #e5e5e5;\n}\n' },
      editable: ['css'],
      hints: [
        'Fallen zwei Deklarationen gemeinsam aus, fehlt meist das Zeichen, das sie trennt.',
        'Eigenschaften mit zwei Wörtern haben einen Bindestrich – vergleiche die footer-Regel mit der header-Regel.',
        'Jede Deklaration endet mit einem Semikolon; die Eigenschaft für die Fläche ist genau so geschrieben wie in der Erklärung.',
      ],
      solution: { css: '/* Vereinsfarben */\n\nheader {\n  background-color: #1e6f3c;\n  color: white;\n}\n\nfooter {\n  background-color: #e5e5e5;\n}\n' },
      tests: [
        { type: 'style', selector: 'header', prop: 'background-color', expected: '#1e6f3c', label: 'Der Kopfbereich ist dunkelgrün (#1e6f3c)' },
        { type: 'style', selector: 'header', prop: 'color', expected: 'white', label: 'Die Schrift im Kopfbereich ist weiß' },
        { type: 'style', selector: 'footer', prop: 'background-color', expected: '#e5e5e5', label: 'Der Fußbereich ist hellgrau (#e5e5e5)' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Sam findet die Startseite „so … weiß“. Also: Die ganze Seite bekommt Creme als Hintergrund, der Fußbereich wird nachtblau mit heller Schrift.\n\nDie Creme-Angabe kommt in die vorhandene body-Regel dazu. Für den Fußbereich brauchst du eine neue Regel mit zwei Deklarationen – Fläche und Schrift. Die Farbcodes stehen in der Aufgabe.',
    },
    { type: 'code', etappe: '10-css-grundlagen/04-hintergrund' },
  ],
});

/* ---------- Lektion 5: Wiederholung ---------- */

const STECKBRIEF_FORMULAR = `<h1>Steckbrief: Lea</h1>
<p>17 Jahre, Heilbronn, Praktikum in einer Fahrradwerkstatt.</p>
<figure>
  <img src="katze.svg" alt="Katze Mo auf dem Sofa">
</figure>
<h2>Kontakt</h2>
<form>
  <label for="name">Name</label>
  <input type="text" id="name" name="name">
  <button type="submit">Abschicken</button>
</form>
`;

const STECKBRIEF_FORMULAR_LOESUNG = STECKBRIEF_FORMULAR.replace(
  '  <img src="katze.svg" alt="Katze Mo auf dem Sofa">\n',
  '  <img src="katze.svg" alt="Katze Mo auf dem Sofa">\n  <figcaption>Mo, meine Katze</figcaption>\n'
).replace(
  '  <input type="text" id="name" name="name">\n',
  '  <input type="text" id="name" name="name">\n  <label for="email">E-Mail</label>\n  <input type="email" id="email" name="email">\n'
);

schreibe('lessons/05-wiederholung.json', {
  id: '05-wiederholung',
  title: 'Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Großer Rückblick, bevor die Programm-Seite ans Lichtpult kommt: Ich prüfe, ob dein HTML-Gerüst noch sitzt – Grundgerüst, Bilder, Zonen, Formulare – und ob die neuen CSS-Regeln sitzen. Acht Aufgaben, dann die Etappe.',
    },
    {
      type: 'quiz',
      question: 'Wo im HTML-Dokument steht die Verknüpfung mit dem Stylesheet?',
      options: ['Im head – meist direkt nach dem title', 'Ganz am Ende des body', 'Vor dem Dokumenttyp, in der ersten Zeile'],
      correct: 0,
      explanation: 'Der head enthält alles, was der Browser vorab wissen muss: Zeichensatz, Titel – und welches Stylesheet er laden soll.',
    },
    {
      type: 'order',
      text: '**Sortiere** die Zeilen zu einer Tabellenzeile: erst die Zeit, dann Hauptbühne, dann Zeltbühne.',
      lines: ['<tr>', '  <td>22:00</td>', '  <td>Neonpuls</td>', '  <td>Kiki Volt</td>', '</tr>'],
      explanation: 'Eine Zeile beginnt mit tr, darin die Datenzellen in der Reihenfolge der Spalten.',
    },
    {
      type: 'pair',
      text: '**Ordne** die Elemente ihrer Aufgabe zu.',
      pairs: [
        ['`<header>`', 'Kopfbereich der Seite'],
        ['`<nav>`', 'Navigation mit den Links'],
        ['`<main>`', 'Hauptinhalt'],
        ['`<footer>`', 'Fußbereich mit Adresse'],
        ['`<figcaption>`', 'Bildunterschrift in einem figure'],
      ],
    },
    {
      type: 'code',
      task: '**Erweitere** den Steckbrief: 1. Unter dem Katzenbild im Bild-Block kommt die Bildunterschrift „Mo, meine Katze“. 2. Im Kontaktformular folgt nach dem Namensfeld ein beschriftetes E-Mail-Feld „E-Mail“ mit id und name `email`.',
      starter: { html: STECKBRIEF_FORMULAR },
      editable: ['html'],
      hints: [
        'Bildunterschrift: eigenes Element innerhalb des figure, direkt nach dem Bild. E-Mail-Feld: Beschriftung plus Eingabefeld mit passendem Typ.',
        'Die Beschriftung zeigt mit for auf die id des Feldes – genau wie beim Namensfeld.',
        'Muster für das Feld: `<input type="text" id="ort" name="ort">` – bei dir mit dem Typ für E-Mail-Adressen und der id aus der Aufgabe.',
      ],
      solution: { html: STECKBRIEF_FORMULAR_LOESUNG },
      tests: [
        { type: 'text', selector: 'figure figcaption', expected: 'Mo, meine Katze', label: 'Die Bildunterschrift lautet „Mo, meine Katze“' },
        { type: 'attr', selector: 'form input#email', attr: 'type', expected: 'email', label: 'Das E-Mail-Feld hat den Typ email' },
        { type: 'attr', selector: 'input#email', attr: 'name', expected: 'email', label: 'Das E-Mail-Feld heißt „email“' },
        { type: 'text', selector: 'label[for="email"]', expected: 'E-Mail', label: 'Die Beschriftung „E-Mail“ gehört zum E-Mail-Feld' },
        { type: 'order', selectors: ['input#name', 'input#email', 'button'], label: 'Das E-Mail-Feld steht zwischen Namensfeld und Knopf' },
      ],
    },
    {
      type: 'fill',
      text: '**Vervollständige** das Bild: Alternativtext und Klasse.',
      template: '<img src="katze.svg" ___="Katze Mo auf dem Sofa" ___="foto">',
      accept: [['alt'], ['class']],
      hint: 'Der Alternativtext erscheint, wenn das Bild nicht lädt; die Klasse ist das Attribut, das mehrere Elemente teilen dürfen.',
    },
    {
      type: 'quiz',
      question: 'Welche Angabe ist **keine** gültige CSS-Farbe?',
      options: ['`#ff6a0`', '`#ff6a00`', '`rgb(255, 106, 0)`', '`orange`'],
      correct: 0,
      explanation: 'Ein Hex-Code hat drei oder sechs Zeichen nach der Raute – fünf gibt es nicht.',
    },
    {
      type: 'bug',
      text: 'Das Formular zeigt die zweite Beschriftung nicht richtig an. Welche Zeile ist falsch?',
      lines: ['<form>', '  <label for="name">Name</label>', '  <input type="text" id="name" name="name">', '  <lable for="email">E-Mail</lable>', '  <input type="email" id="email" name="email">', '</form>'],
      line: 3,
      explanation: 'Das Element heißt label. Ein Tippfehler im Tag-Namen – und der Browser kennt das Element nicht mehr.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Vereinsseite: Seite mit Hintergrund `#f3f7f4` und Textfarbe `#14321f`, Kopfbereich mit Hintergrund `#1e6f3c` und Textfarbe `#ffffff`, Links in `#0b7dd6`. Die Listenpunkte erben – keine eigene Regel.',
      starter: { html: TEAM, css: '/* Vereinsfarben */\n' },
      editable: ['css'],
      hints: [
        'Drei Regeln: body, header, a.',
        'body und header bekommen je zwei Deklarationen (Fläche und Schrift), a nur die Schriftfarbe.',
        'Muster: `footer { background-color: #222222; color: #ffffff; }` – Selektoren und Werte aus der Aufgabe.',
      ],
      solution: { css: '/* Vereinsfarben */\n\nbody {\n  background-color: #f3f7f4;\n  color: #14321f;\n}\n\nheader {\n  background-color: #1e6f3c;\n  color: #ffffff;\n}\n\na {\n  color: #0b7dd6;\n}\n' },
      tests: [
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#f3f7f4', label: 'Die Seite hat einen hellen Hintergrund (#f3f7f4)' },
        { type: 'style', selector: 'li', prop: 'color', expected: '#14321f', label: 'Die Listenpunkte erben die dunkelgrüne Textfarbe' },
        { type: 'style', selector: 'header', prop: 'background-color', expected: '#1e6f3c', label: 'Der Kopfbereich ist dunkelgrün (#1e6f3c)' },
        { type: 'style', selector: 'header', prop: 'color', expected: '#ffffff', label: 'Die Schrift im Kopfbereich ist weiß' },
        { type: 'style', selector: 'a', prop: 'color', expected: '#0b7dd6', label: 'Die Links sind blau (#0b7dd6)' },
      ],
    },
    {
      type: 'explain',
      text: 'Die Programm-Seite kennt style.css noch nicht – deshalb sieht sie noch aus wie vorher. Verknüpfe sie im Kopfbereich, genau wie die Startseite.\n\nAußerdem hat Sam den Samstag verlängert: Um 22 Uhr spielen Neonpuls auf der Hauptbühne und Kiki Volt im Zelt. Dafür bekommt die Samstags-Tabelle ganz unten eine neue Zeile mit drei Zellen.',
    },
    { type: 'code', etappe: '10-css-grundlagen/05-wiederholung' },
  ],
});

/* ---------- Lektion 6: Projekt ---------- */
schreibe('lessons/06-projekt-erste-styles.json', {
  id: '06-projekt-erste-styles',
  title: 'Projekt: Erste Styles',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Okay, ich hab die Seite gesehen – das ist ORANGE! Endlich sieht das nach Festival aus und nicht nach Schulheft.\n\nWas du am Lichtpult gelernt hast: den Aufbau einer Regel, die drei Orte für CSS, drei Farbschreibweisen und den Unterschied zwischen Schrift und Fläche. Zum Abschluss bekommen Zwischenüberschriften und Tabellen der Startseite ihre Farben.',
    },
    {
      type: 'quiz',
      question: 'Alle Tabellen der Startseite sollen weiß hinterlegt werden. Wie lautet der Selektor?',
      options: ['`table`', '`<table>`', '`tabelle`', '`td`'],
      correct: 0,
      explanation: 'Der Element-Selektor ist der englische Tag-Name ohne spitze Klammern. `td` würde nur die Zellen treffen, nicht die ganze Tabelle.',
    },
    {
      type: 'bug',
      text: 'Die Zwischenüberschriften bleiben schwarz und die Fläche fehlt. Welche Zeile ist falsch?',
      lines: ['h2 {', '  color: #d94f00', '  background-color: white;', '}'],
      line: 1,
      explanation: 'Ohne Semikolon liest der Browser beide Zeilen als eine einzige Deklaration – und verwirft sie komplett.',
    },
    {
      type: 'explain',
      text: 'Zwei neue Regeln für style.css: Zwischenüberschriften in Dunkelorange, Tabellen mit weißer Fläche – Weiß als Farbname oder als Hex-Code, beides zählt. Die vorhandenen Regeln bleiben stehen.\n\nWenn die Etappe steht, öffne die FUNKEN-Website über **Projekt** – zum ersten Mal in Farbe. Danach wartet Sam mit der Abnahme.',
    },
    { type: 'code', etappe: '10-css-grundlagen/06-projekt-erste-styles' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '10-css-grundlagen',
  fragen: [
    { id: '10-01', konzept: 'css.regel', type: 'quiz', question: 'In `h1 { color: red; }` – was ist `h1`?', options: ['Der Selektor', 'Die Eigenschaft', 'Der Wert'], correct: 0, explanation: 'Der Selektor sagt, welche Elemente die Regel betrifft: alle h1.' },
    { id: '10-02', konzept: 'css.regel', type: 'fill', text: 'Vervollständige die Regel, die alle Absätze blau färbt.', template: 'p {\n  ___: blue;\n}', accept: ['color'], hint: 'Die Eigenschaft für die Schriftfarbe.' },
    { id: '10-03', konzept: 'css.regel', type: 'bug', text: 'Die Absätze werden nicht grau. Welche Zeile ist falsch?', lines: ['h1 {', '  color: orange;', '}', '<p> {', '  color: gray;', '}'], line: 3, explanation: 'Selektoren stehen ohne spitze Klammern: `p {`.' },
    { id: '10-04', konzept: 'css.regel', type: 'order', text: 'Sortiere die Zeilen zu einer Regel.', lines: ['h2 {', '  color: green;', '}'] },
    { id: '10-05', konzept: 'css.regel', type: 'pair', text: 'Ordne die Teile von `a { color: blue; }` zu.', pairs: [['`a`', 'Selektor'], ['`color`', 'Eigenschaft'], ['`blue`', 'Wert']] },
    { id: '10-06', konzept: 'css.orte', type: 'quiz', question: 'Welcher Ort für CSS gilt nur für ein einzelnes Element?', options: ['Das style-Attribut direkt am Tag', 'Das style-Element im head', 'Eine externe CSS-Datei'], correct: 0, explanation: 'Inline-CSS im style-Attribut gilt nur für genau dieses Element.' },
    { id: '10-07', konzept: 'css.orte', type: 'pair', text: 'Ordne die drei Orte für CSS zu.', pairs: [['style-Attribut am Tag', 'gilt für ein einzelnes Element'], ['style-Element im head', 'gilt für eine Seite'], ['externe Datei per link', 'gilt für alle Seiten, die sie einbinden']] },
    { id: '10-08', konzept: 'css.orte', type: 'bug', text: 'Ein Absatz bekommt seine Farbe nicht. Welche Zeile ist falsch?', lines: ['<h1 style="color: orange;">Mein Setup</h1>', '<p style="color: gray;">Monitor</p>', '<p style="color gray;">Maus</p>'], line: 2, explanation: 'Zwischen Eigenschaft und Wert fehlt der Doppelpunkt: `color: gray;`.' },
    { id: '10-09', konzept: 'css.link', type: 'fill', text: 'Vervollständige die Verknüpfung mit dem Stylesheet.', template: '<link rel="___" href="style.css">', accept: ['stylesheet'], hint: 'Die Art der Beziehung: ein Stylesheet.' },
    { id: '10-10', konzept: 'css.link', type: 'quiz', question: 'Wohin gehört das link-Element für die CSS-Datei?', options: ['In den head', 'Ans Ende des body', 'Vor den Dokumenttyp'], correct: 0, explanation: 'Das link-Element steht im head, meist nach dem title.' },
    { id: '10-11', konzept: 'css.link', type: 'bug', text: 'Das Stylesheet wird nicht geladen. Welche Zeile ist falsch?', lines: ['<head>', '  <meta charset="utf-8">', '  <title>Mein Setup</title>', '  <link rel="stylesheet" herf="style.css">', '</head>'], line: 3, explanation: 'Das Attribut für die Datei heißt `href`, nicht herf.' },
    { id: '10-12', konzept: 'css.farbe', type: 'quiz', question: 'Welcher Wert ergibt Weiß?', options: ['`#ffffff`', '`#000000`', '`rgb(0, 0, 0)`'], correct: 0, explanation: 'Alle drei Anteile voll (ff) ergeben Weiß; `#000000` und `rgb(0, 0, 0)` sind Schwarz.' },
    { id: '10-13', konzept: 'css.farbe', type: 'pair', text: 'Ordne die Farbwerte zu.', pairs: [['`#ff0000`', 'Rot'], ['`#00ff00`', 'Grün'], ['`#0000ff`', 'Blau'], ['`#000`', 'Schwarz']] },
    { id: '10-14', konzept: 'css.farbe', type: 'fill', text: 'Vervollständige die Farbangabe mit drei Zahlen für Rot, Grün und Blau.', template: 'h1 {\n  color: ___(0, 128, 0);\n}', accept: ['rgb'], hint: 'Die Funktion heißt nach den drei Farbanteilen.' },
    { id: '10-15', konzept: 'css.farbe', type: 'bug', text: 'Die Absätze bekommen keine Farbe. Welche Zeile ist falsch?', lines: ['h1 {', '  color: #ff6a00;', '}', 'p {', '  color: #1b1b2;', '}'], line: 4, explanation: 'Ein Hex-Code hat drei oder sechs Zeichen – hier sind es fünf.' },
    { id: '10-16', konzept: 'css.background', type: 'quiz', question: 'Welche Eigenschaft färbt die Fläche hinter dem Text?', options: ['`background-color`', '`color`', '`bgcolor`'], correct: 0, explanation: '`color` färbt die Schrift, `background-color` die Fläche. `bgcolor` ist kein CSS.' },
    { id: '10-17', konzept: 'css.background', type: 'fill', text: 'Vervollständige: Der Fußbereich bekommt eine dunkle Fläche und helle Schrift.', template: 'footer {\n  ___: #1b1b2f;\n  color: white;\n}', accept: ['background-color'], hint: 'Zwei Wörter mit Bindestrich.' },
    { id: '10-18', konzept: 'css.background', type: 'bug', text: 'Die Seite bekommt keinen cremefarbenen Hintergrund. Welche Zeile ist falsch?', lines: ['body {', '  backgroundcolor: #fff7e8;', '}'], line: 1, explanation: 'Die Eigenschaft heißt `background-color` – mit Bindestrich.' },
    { id: '10-19', konzept: 'css.background', type: 'quiz', question: 'Ein Kopfbereich hat eine dunkle Fläche. Welche Schriftfarbe ist gut lesbar?', options: ['Eine helle, z. B. `#ffffff`', 'Eine dunkle, z. B. `#222222`', 'Egal – Kontrast spielt keine Rolle'], correct: 0, explanation: 'Dunkle Fläche, helle Schrift: Kontrast macht Text lesbar.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '10-css-grundlagen',
  title: 'Abnahme: Lichtpult',
  intro: 'Ich hab die Seite gesehen – ORANGE! Und der Fußbereich ist nachtblau. Endlich sieht das nach Festival aus. Aber bevor ich das Lichtpult freigebe: Zeig mir, dass du weißt, was du da tust.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'css.regel', type: 'quiz', question: 'In `a { color: #0b7dd6; }` – was ist `#0b7dd6`?', options: ['Der Wert', 'Der Selektor', 'Die Eigenschaft'], correct: 0, explanation: '`a` ist der Selektor, `color` die Eigenschaft, `#0b7dd6` der Wert.' },
    { konzept: 'css.link', type: 'fill', text: 'Vervollständige die Verknüpfung mit dem Stylesheet.', template: '<___ rel="stylesheet" href="style.css">', accept: ['link'] },
    {
      type: 'code',
      task: '**Gestalte** den Steckbrief: Seite mit Hintergrund `#f6f0ff`, gesamter Text in `#2d2d2d`, Hauptüberschrift in `#6a1b9a`, Links in `#0b7dd6`. Nutze für den Text die Vererbung.',
      starter: { html: STECKBRIEF, css: '/* Steckbrief */\n' },
      editable: ['css'],
      solution: { css: '/* Steckbrief */\n\nbody {\n  background-color: #f6f0ff;\n  color: #2d2d2d;\n}\n\nh1 {\n  color: #6a1b9a;\n}\n\na {\n  color: #0b7dd6;\n}\n' },
      tests: [
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#f6f0ff', label: 'Die Seite hat einen hellen lila Hintergrund (#f6f0ff)' },
        { type: 'style', selector: 'li', prop: 'color', expected: '#2d2d2d', label: 'Die Listenpunkte erben die Textfarbe (#2d2d2d)' },
        { type: 'style', selector: 'h1', prop: 'color', expected: '#6a1b9a', label: 'Die Hauptüberschrift ist lila (#6a1b9a)' },
        { type: 'style', selector: 'a', prop: 'color', expected: '#0b7dd6', label: 'Die Links sind blau (#0b7dd6)' },
      ],
    },
    { konzept: 'css.farbe', type: 'pair', text: 'Ordne die Farbwerte zu.', pairs: [['`#ff0000`', 'Rot – Hex-Code'], ['`rgb(0, 0, 255)`', 'Blau – rgb-Wert'], ['`#fff`', 'Weiß – Hex-Kurzform'], ['`black`', 'Schwarz – Farbname']] },
    { konzept: 'html.label', type: 'quiz', question: 'Wie wird eine Beschriftung (label) fest mit einem Eingabefeld verbunden?', options: ['for am label hat denselben Wert wie id am Feld', 'name am label hat denselben Wert wie name am Feld', 'Das label steht einfach direkt vor dem Feld'], correct: 0, explanation: 'for zeigt auf die id des Feldes – ein Klick auf die Beschriftung springt dann ins Feld.' },
    { konzept: 'html.semantik', type: 'bug', text: 'Eine Zone der Seite ist falsch benannt. Welche Zeile?', lines: ['<header>', '  <h1>Mein Setup</h1>', '</header>', '<navigation>', '  <a href="index.html">Start</a>', '</navigation>'], line: 3, explanation: 'Das Element für die Navigation heißt `nav`.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** das Stylesheet der Setup-Seite: Der Kopfbereich sollte dunkel mit heller Schrift sein und die Absätze grau – aber der Kopfbereich ist weiß und die Absätze sind schwarz. Finde die zwei Fehler.',
      starter: { html: SETUP, css: '/* Setup-Seite */\n\nheader {\n  background-color: #101828\n  color: #eef2ff;\n}\n\np {\n  colour: gray;\n}\n' },
      editable: ['css'],
      solution: { css: '/* Setup-Seite */\n\nheader {\n  background-color: #101828;\n  color: #eef2ff;\n}\n\np {\n  color: gray;\n}\n' },
      tests: [
        { type: 'style', selector: 'header', prop: 'background-color', expected: '#101828', label: 'Der Kopfbereich ist dunkel (#101828)' },
        { type: 'style', selector: 'header', prop: 'color', expected: '#eef2ff', label: 'Die Schrift im Kopfbereich ist hell (#eef2ff)' },
        { type: 'style', selector: 'main p', prop: 'color', expected: 'gray', label: 'Die Absätze sind grau' },
      ],
    },
    { konzept: 'html.alt', type: 'quiz', question: 'Wozu dient das alt-Attribut eines Bildes?', options: ['Es beschreibt das Bild, falls es nicht geladen oder gesehen werden kann', 'Es legt die Größe des Bildes fest', 'Es nennt den Dateinamen des Bildes'], correct: 0, explanation: 'Der Alternativtext ersetzt das Bild – für Screenreader und wenn die Datei fehlt. Die Datei nennt src.' },
    { konzept: 'html.grundgeruest', type: 'order', text: 'Sortiere das Grundgerüst einer Seite.', lines: ['<!DOCTYPE html>', '<html lang="de">', '<head>', '<title>Mein Setup</title>', '</head>', '<body>', '</body>', '</html>'] },
    { konzept: 'css.background', type: 'quiz', question: 'Welche Eigenschaft färbt die Fläche hinter dem Text?', options: ['`background-color`', '`color`', '`bgcolor`'], correct: 0, explanation: '`color` ist die Schrift, `background-color` die Fläche. `bgcolor` ist kein CSS.' },
    { konzept: 'css.orte', type: 'fill', text: 'Vervollständige das Inline-CSS: Nur dieser Absatz wird rot.', template: '<p ___="color: red;">Achtung!</p>', accept: ['style'] },
  ],
});

console.log('Kapitel 10 geschrieben');
