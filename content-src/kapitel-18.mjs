// Kapitel 18 – Showtime (Finale: alles zusammenfügen, große Wiederholung, eigene Website).
// Erzeugt public/content/chapters/18-showtime/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '18-showtime');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Drei Dateien, eine Website: index.html verknüpft style.css (head) und script.js (Ende von body)
const FIG_DATEIEN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="14" y="48" width="104" height="64" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="66" y="76" text-anchor="middle" fill="#ff7a45" font-weight="bold">index.html</text><text x="66" y="96" text-anchor="middle" fill="#eef2ff">Gerüst + Text</text><rect x="200" y="14" width="106" height="48" rx="8" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><text x="253" y="34" text-anchor="middle" fill="#38c7ff" font-weight="bold">style.css</text><text x="253" y="52" text-anchor="middle" fill="#eef2ff">Aussehen</text><rect x="200" y="98" width="106" height="48" rx="8" fill="#1b2135" stroke="#ffd84d" stroke-width="2"/><text x="253" y="118" text-anchor="middle" fill="#ffd84d" font-weight="bold">script.js</text><text x="253" y="136" text-anchor="middle" fill="#eef2ff">Verhalten</text><path d="M118 66 L200 38" stroke="#38c7ff" stroke-width="2"/><text x="196" y="30" text-anchor="end" fill="#38c7ff">&lt;link&gt; im head</text><path d="M118 94 L200 122" stroke="#ffd84d" stroke-width="2"/><text x="196" y="140" text-anchor="end" fill="#ffd84d">&lt;script&gt; am Ende</text></svg>`;

// Die eigene Website in fünf Schritten: Thema → Skizze → Inhalte → Farben → Prüfen
const FIG_PLAN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="30" text-anchor="middle" fill="#eef2ff" font-weight="bold">Deine Website in 5 Schritten</text><path d="M30 84 H290" stroke="#4ade80" stroke-width="2"/><rect x="14" y="58" width="54" height="52" rx="8" fill="#1b2135" stroke="#b48cff" stroke-width="2"/><text x="41" y="80" text-anchor="middle" fill="#b48cff" font-weight="bold">1</text><text x="41" y="100" text-anchor="middle" fill="#eef2ff">Thema</text><rect x="76" y="58" width="54" height="52" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="103" y="80" text-anchor="middle" fill="#ff7a45" font-weight="bold">2</text><text x="103" y="100" text-anchor="middle" fill="#eef2ff">Skizze</text><rect x="138" y="58" width="54" height="52" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="165" y="80" text-anchor="middle" fill="#ff7a45" font-weight="bold">3</text><text x="165" y="100" text-anchor="middle" fill="#eef2ff">Inhalte</text><rect x="200" y="58" width="54" height="52" rx="8" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><text x="227" y="80" text-anchor="middle" fill="#38c7ff" font-weight="bold">4</text><text x="227" y="100" text-anchor="middle" fill="#eef2ff">Farben</text><rect x="262" y="58" width="54" height="52" rx="8" fill="#1b2135" stroke="#4ade80" stroke-width="2"/><text x="289" y="80" text-anchor="middle" fill="#4ade80" font-weight="bold">5</text><text x="289" y="100" text-anchor="middle" fill="#eef2ff">Prüfen</text><text x="160" y="140" text-anchor="middle" fill="#eef2ff">erst planen, dann bauen: Gerüst → Licht → Strom</text></svg>`;

/* ================================================================
   Lektion 1 – Alles zusammenfügen
   ================================================================ */

const L1_KARTE_HTML = `<div class="karte">
  <img src="controller.svg" alt="Ein Gamecontroller">
  <h2>Kart Kings 2</h2>
  <p>Das Rennspiel für die Couch – bis zu vier Leute gleichzeitig.</p>
  <p class="aktion"><a href="spielen.html">Jetzt spielen</a></p>
</div>
`;
const L1_KARTE_CSS_START = `.karte {
  width: 260px;
  padding: 16px;
  border: 1px solid #cccccc;
  border-radius: 12px;
  font-family: Arial, sans-serif;
}

.karte img {
  width: 120px;
}

/* Der Link als Knopf: */
`;
const L1_KARTE_CSS_LOESUNG = `.karte {
  width: 260px;
  padding: 16px;
  border: 1px solid #cccccc;
  border-radius: 12px;
  font-family: Arial, sans-serif;
}

.karte img {
  width: 120px;
}

/* Der Link als Knopf: */
.aktion a {
  background-color: #2f6fdb;
  color: white;
  padding: 8px 14px;
  border-radius: 999px;
  text-decoration: none;
}
`;

const L1_WAFFEL_HTML_START = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Waffelwagen</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <h1>Waffelwagen</h1>
      <p>Frische Waffeln – jeden Tag woanders.</p>
    </header>

    <main>
      <h2>Heute</h2>
      <p>Bis 18 Uhr auf dem Marktplatz.</p>
    </main>

    <footer>
      <p>Waffelwagen · Heilbronn</p>
    </footer>
  </body>
</html>
`;
const L1_WAFFEL_HTML_LOESUNG = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Waffelwagen</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <h1>Waffelwagen</h1>
      <p>Frische Waffeln – jeden Tag woanders.</p>
    </header>

    <nav>
      <a href="karte.html">Karte</a>
      <a href="standorte.html">Standorte</a>
      <a href="kontakt.html">Kontakt</a>
    </nav>

    <main>
      <h2>Heute</h2>
      <p>Bis 18 Uhr auf dem Marktplatz.</p>
    </main>

    <footer>
      <p>Waffelwagen · Heilbronn</p>
    </footer>
  </body>
</html>
`;
const L1_WAFFEL_CSS_START = `body {
  font-family: Arial, sans-serif;
  background-color: #fff7e8;
}

header {
  background-color: #1b1b2f;
  color: #ffd23f;
  padding: 16px;
}

/* Regel für die Navigation: */
`;
const L1_WAFFEL_CSS_LOESUNG = `body {
  font-family: Arial, sans-serif;
  background-color: #fff7e8;
}

header {
  background-color: #1b1b2f;
  color: #ffd23f;
  padding: 16px;
}

/* Regel für die Navigation: */
nav {
  display: flex;
  gap: 12px;
  justify-content: center;
}
`;

const L1_SNEAKER_HTML = `<h1>Sneaker-Drop: Nightrunner</h1>
<img src="sneaker.svg" alt="Der Nightrunner in Schwarz und Orange">
<p><button id="merken">Merken</button> <span id="anzahl">0</span> Mal gemerkt</p>
<p id="meldung"></p>
`;
const L1_SNEAKER_JS_START = `let gemerkt = 0;
// Knopf finden, auf Klick reagieren, zählen und melden
`;
const L1_SNEAKER_JS_LOESUNG = `let gemerkt = 0;
// Knopf finden, auf Klick reagieren, zählen und melden
const knopf = document.getElementById("merken");
knopf.addEventListener("click", function () {
  gemerkt = gemerkt + 1;
  document.getElementById("anzahl").textContent = gemerkt;
  document.getElementById("meldung").textContent = "Auf deiner Liste!";
});
`;

schreibe('lessons/01-alles-zusammenfuegen.json', {
  id: '01-alles-zusammenfuegen',
  title: 'Alles zusammenfügen',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Letzte Station. Die FUNKEN-Website ist fast fertig: fünf Seiten, ein Stylesheet, ein Skript. Bevor der letzte Knopf eingebaut wird, ein Blick auf das Ganze – **welche Datei macht was?**\n\n- `index.html`, `programm.html`, `galerie.html`, `tickets.html`, `impressum.html` – das **Gerüst**: Texte, Listen, Tabellen, Formular, Bilder.\n- `style.css` – **Licht und Farbe**: eine Datei für alle Seiten.\n- `script.js` – **Strom**: reagiert auf Klicks, nur auf der Startseite.',
      figure: FIG_DATEIEN,
    },
    {
      type: 'explain',
      text: 'Zwei Zeilen verbinden die drei Dateien:\n\n```html\n<link rel="stylesheet" href="style.css">\n<script src="script.js"></script>\n```\n\nDie erste steht im `head` – so wirkt das Stylesheet, bevor die Seite gezeichnet wird. Die zweite steht **vor dem schließenden body-Tag**: Das Skript läuft erst, wenn alle Elemente existieren. Sonst findet `getElementById` nichts.',
    },
    {
      type: 'pair',
      text: 'Was steht in welcher Datei? Ordne zu.',
      pairs: [
        ['`<h2>Line-up</h2>`', 'index.html – Inhalt und Struktur'],
        ['`h2 { color: #d94f00; }`', 'style.css – Aussehen'],
        ['`knopf.addEventListener("click", …)`', 'script.js – Verhalten'],
        ['`<link rel="stylesheet" href="style.css">`', 'im head – verknüpft das Stylesheet'],
        ['`<script src="script.js"></script>`', 'vor dem Ende von body – bindet das Skript ein'],
      ],
    },
    {
      type: 'quiz',
      question: 'Jonas schiebt das `script`-Element versehentlich in den `head`. Beim Laden meldet die Konsole einen Fehler. Warum?',
      options: [
        'Das Skript läuft, bevor die Elemente im body existieren',
        'Im head darf überhaupt kein JavaScript stehen',
        'Stylesheet und Skript stören sich gegenseitig',
      ],
      correct: 0,
      explanation: 'Der Browser führt das Skript sofort aus, wenn er die Zeile erreicht. Im head ist der body noch leer – `getElementById` liefert nichts. Deshalb: Skript vor dem schließenden body-Tag.',
    },
    {
      type: 'explain',
      text: '**Ein Link als Knopf** – der Klassiker für „Jetzt kaufen“ oder „Jetzt spielen“. Der Link bleibt ein `a`-Element; erst das Stylesheet macht ihn zum Knopf:\n\n```css\n.laden a {\n  background-color: #0b7dd6;\n  color: white;\n  padding: 8px 14px;\n  border-radius: 999px;\n  text-decoration: none;\n}\n```\n\n`padding` mit zwei Werten: erst oben/unten, dann links/rechts. `border-radius: 999px` macht eine Pille. Der Nachfahren-Selektor `.laden a` trifft nur Links im Absatz mit der Klasse `laden`.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Link im Absatz mit der Klasse `aktion` als Knopf: Hintergrund `#2f6fdb`, weiße Schrift, oben/unten 8 und links/rechts 14 Pixel Innenabstand, 999 Pixel runde Ecken, keine Unterstreichung.',
      starter: { html: L1_KARTE_HTML, css: L1_KARTE_CSS_START },
      editable: ['css'],
      hints: [
        'Du brauchst eine neue Regel mit einem Nachfahren-Selektor: Klasse des Absatzes, Leerzeichen, dann das Link-Element.',
        'Fünf Eigenschaften wie im Beispiel `.laden a`: background-color, color, padding mit zwei Werten, border-radius, text-decoration – nur mit den Werten aus der Aufgabe.',
        'Gerüst: `.aktion a { background-color: …; color: …; padding: … …; border-radius: …; text-decoration: …; }` – Werte aus der Aufgabe einsetzen.',
      ],
      solution: { css: L1_KARTE_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: '.aktion a', prop: 'background-color', expected: '#2f6fdb', label: 'Der Link ist blau hinterlegt' },
        { type: 'style', selector: '.aktion a', prop: 'color', expected: 'white', label: 'Die Schrift ist weiß' },
        { type: 'style', selector: '.aktion a', prop: 'padding-top', expected: '8px', label: 'Oben und unten 8px Innenabstand' },
        { type: 'style', selector: '.aktion a', prop: 'padding-left', expected: '14px', label: 'Links und rechts 14px Innenabstand' },
        { type: 'style', selector: '.aktion a', prop: 'border-top-left-radius', expected: '999px', label: 'Die Ecken sind rund' },
        { type: 'style', selector: '.aktion a', prop: 'text-decoration-line', expected: 'none', label: 'Keine Unterstreichung' },
      ],
    },
    {
      type: 'explain',
      text: 'Eine komplette kleine Seite besteht immer aus denselben Zonen – in fester Reihenfolge:\n\n```html\n<header><h1>Waffelwagen</h1></header>\n<nav>\n  <a href="karte.html">Karte</a>\n  <a href="kontakt.html">Kontakt</a>\n</nav>\n<main>…</main>\n<footer>…</footer>\n```\n\nDie Navigation wird mit Flexbox zur Leiste: `display: flex` schaltet sie ein, `gap` macht Abstand zwischen den Links, `justify-content: center` verteilt sie mittig.',
    },
    {
      type: 'fill',
      text: 'Vervollständige die Regel: Die Links der Navigation stehen nebeneinander, mit Abstand, mittig verteilt.',
      template: 'nav {\n  display: ___;\n  gap: 12px;\n  justify-content: ___;\n}',
      accept: [['flex'], ['center']],
      hint: 'Flexbox einschalten über display; verteilen entlang der Hauptachse über justify-content – der Wert heißt wie „Mitte“ auf Englisch.',
    },
    {
      type: 'code',
      task: '1. **Ergänze** zwischen Kopf- und Hauptbereich eine Navigation mit drei Links: „Karte“ → karte.html, „Standorte“ → standorte.html, „Kontakt“ → kontakt.html. 2. **Gestalte** die Navigation als Flex-Container mit 12 Pixel Abstand zwischen den Links, mittig verteilt.',
      starter: { html: L1_WAFFEL_HTML_START, css: L1_WAFFEL_CSS_START },
      hints: [
        'Die Navigation ist ein eigenes Element zwischen header und main; darin stehen nur die drei Links.',
        'Ein Link sieht so aus: `<a href="team.html">Team</a>` – Adresse und Text aus der Aufgabe. Für die Regel den Selektor nav verwenden.',
        'Die Regel braucht drei Eigenschaften: display, gap und justify-content – mit denselben Werten wie im Lückentext.',
      ],
      solution: { html: L1_WAFFEL_HTML_LOESUNG, css: L1_WAFFEL_CSS_LOESUNG },
      tests: [
        { type: 'selector', selector: 'nav a', count: 3, label: 'Die Navigation hat drei Links' },
        { type: 'text', selector: 'nav a[href="standorte.html"]', expected: 'Standorte', label: 'Der Link „Standorte“ führt zu standorte.html' },
        { type: 'order', selectors: ['header', 'nav', 'main'], label: 'Die Navigation steht zwischen Kopf- und Hauptbereich' },
        { type: 'style', selector: 'nav', prop: 'display', expected: 'flex', label: 'Die Navigation ist ein Flex-Container' },
        { type: 'style', selector: 'nav', prop: 'column-gap', expected: '12px', label: 'Zwischen den Links sind 12px Abstand' },
        { type: 'style', selector: 'nav', prop: 'justify-content', expected: 'center', label: 'Die Links sind mittig verteilt' },
      ],
    },
    {
      type: 'explain',
      text: 'Und der Strom: ein Knopf, ein Listener, eine Änderung. Das Muster kennst du vom Schaltpult – hier für eine Sneaker-Seite:\n\n```js\nconst knopf = document.getElementById("mehr");\nconst info = document.getElementById("info");\nknopf.addEventListener("click", function () {\n  info.textContent = "Drop am Samstag, 10 Uhr";\n});\n```\n\nDrei Schritte: Element finden, auf `click` hören, `textContent` ändern. Für einen Zähler kommt eine Variable dazu, die bei jedem Klick um 1 wächst.',
    },
    {
      type: 'code',
      task: '**Erweitere** das Skript der Sneaker-Seite: Bei jedem Klick auf den Knopf `merken` steigt die Zahl im Element `anzahl` um 1, und der Absatz `meldung` zeigt „Auf deiner Liste!“.',
      starter: { html: L1_SNEAKER_HTML, js: L1_SNEAKER_JS_START },
      editable: ['js'],
      hints: [
        'Drei Schritte: den Knopf über seine id finden, einen Listener für click anmelden, in der Funktion zählen und die beiden Texte setzen.',
        'Zählen wie beim Dabei-Knopf: `punkte = punkte + 1;` – danach den neuen Wert per textContent in das Anzeige-Element schreiben.',
        'Gerüst: `knopf.addEventListener("click", function () { … });` – in der Funktion drei Zeilen: erhöhen, Zahl anzeigen, Meldung setzen.',
      ],
      solution: { js: L1_SNEAKER_JS_LOESUNG },
      tests: [
        { type: 'text', selector: '#anzahl', expected: '0', label: 'Vor dem Klick steht der Zähler auf 0' },
        { type: 'action', action: 'click', selector: '#merken' },
        { type: 'action', action: 'click', selector: '#merken' },
        { type: 'text', selector: '#anzahl', expected: '2', label: 'Nach zwei Klicks steht der Zähler auf 2' },
        { type: 'text', selector: '#meldung', expected: 'Auf deiner Liste!', label: 'Die Meldung „Auf deiner Liste!“ erscheint' },
        { type: 'source', file: 'js', matches: 'addEventListener\\(\\s*["\']click["\']', label: 'Das Skript reagiert auf click' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: '„Die Seite ist fast fertig – aber wo klickt man auf Tickets? Ganz oben muss ein Knopf hin, den niemand übersehen kann. Orange, rund, groß – so wie der Knopf auf deiner Spiele-Karte vorhin. Ayla sagt, du weißt, wie das geht: unter dem Countdown ein Absatz mit einem Link zur Tickets-Seite, und der Rest passiert im Stylesheet.“',
    },
    { type: 'code', etappe: '18-showtime/01-alles-zusammenfuegen' },
  ],
});

/* ================================================================
   Lektion 2 – Die große Wiederholung
   ================================================================ */

const L2_FIX_HTML_START = `<h2>Meine Top 3</h2>
<ul>
  <li>Kart Kings 2</li>
  <p>Pixel Farm</p>
  <li>Nachtstraße</li>
</ul>
<p><a herf="spiele.html">Alle Spiele</a></p>
`;
const L2_FIX_HTML_LOESUNG = `<h2>Meine Top 3</h2>
<ul>
  <li>Kart Kings 2</li>
  <li>Pixel Farm</li>
  <li>Nachtstraße</li>
</ul>
<p><a href="spiele.html">Alle Spiele</a></p>
`;

const L2_DROPS_HTML = `<h1>Sneaker-Drops im Juli</h1>
<div class="drops">
  <div class="drop">
    <h3>Nightrunner</h3>
    <p>Samstag, 10 Uhr</p>
  </div>
  <div class="drop">
    <h3>Court Classic</h3>
    <p>Sonntag, 12 Uhr</p>
  </div>
  <div class="drop">
    <h3>Trail Fox</h3>
    <p>Bald</p>
  </div>
</div>
`;
const L2_DROPS_CSS_START = `body {
  font-family: Arial, sans-serif;
}

h3 {
  color: #ff6a00;
}

/* Container und Karten: */
`;
const L2_DROPS_CSS_LOESUNG = `body {
  font-family: Arial, sans-serif;
}

h3 {
  color: #ff6a00;
}

/* Container und Karten: */
.drops {
  display: flex;
  gap: 16px;
}

.drop {
  border: 2px solid #1b1b2f;
  padding: 12px;
  border-radius: 8px;
}
`;

const L2_KONTRAST_HTML = `<button id="schalter">Kontrast</button>
<h1>Fitness-Plan</h1>
<p>Montag: Laufen · Mittwoch: Kraft · Freitag: Schwimmen</p>
`;
const L2_KONTRAST_CSS = `body {
  background-color: #fff7e8;
  color: #1b1b2f;
  font-family: Arial, sans-serif;
}

.kontrast {
  background-color: #1b1b2f;
  color: #fff7e8;
}
`;
const L2_KONTRAST_JS_START = `// Knopf finden, beim Klick die Klasse am body umschalten
`;
const L2_KONTRAST_JS_LOESUNG = `// Knopf finden, beim Klick die Klasse am body umschalten
const schalter = document.getElementById("schalter");
schalter.addEventListener("click", function () {
  document.body.classList.toggle("kontrast");
});
`;

schreibe('lessons/02-grosse-wiederholung.json', {
  id: '02-grosse-wiederholung',
  title: 'Die große Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Die große Wiederholung: einmal durch alle Stationen – Gerüst, Licht und Farbe, Strom. Zehn Aufgaben aus allen Blöcken, keine neuen Regeln. Am Ende bekommt die Tickets-Seite ihren letzten Abschnitt.',
    },
    {
      type: 'quiz',
      question: 'Eine Seite hat Kopfbereich, Navigation, Hauptinhalt und Fußbereich. Welche Elemente passen – in dieser Reihenfolge?',
      options: ['`header`, `nav`, `main`, `footer`', '`head`, `nav`, `body`, `footer`', '`div`, `nav`, `main`, `span`'],
      correct: 0,
      explanation: '`head` ist der unsichtbare Kopf des Dokuments (Titel, Zeichensatz), nicht der sichtbare Kopfbereich. `div` und `span` haben keine Bedeutung – die semantischen Elemente schon.',
    },
    {
      type: 'order',
      text: 'Sortiere die verschachtelte Liste: Der Punkt „Rennspiele“ enthält eine nummerierte Rangliste mit „Kart Kings“ auf Platz 1.',
      lines: ['<ul>', '  <li>Rennspiele', '    <ol>', '      <li>Kart Kings</li>', '    </ol>', '  </li>', '</ul>'],
      explanation: 'Die innere Liste liegt komplett im Listenpunkt: Erst schließt die innere Liste, dann der Punkt, dann die äußere Liste.',
    },
    {
      type: 'fill',
      text: 'Vervollständige das Formularfeld: Das Label ist mit dem Eingabefeld verbunden – ein Klick auf „Name“ setzt den Cursor ins Feld.',
      template: '<label ___="name">Name</label>\n<input type="text" ___="name" name="name">',
      accept: [['for'], ['id']],
      hint: 'Das Attribut am Label zeigt auf das Attribut am Feld – beide haben denselben Wert. Am Feld ist es die eindeutige Kennung.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Repariere** die Spieleliste: Der zweite Titel hat keinen Aufzählungspunkt, und der Link „Alle Spiele“ lässt sich nicht anklicken.',
      starter: { html: L2_FIX_HTML_START },
      hints: [
        'Ein Listenpunkt ist immer ein li-Element – auch in der Mitte der Liste. Vergleiche die drei Einträge.',
        'Ein Link ist nur anklickbar, wenn sein Adress-Attribut richtig geschrieben ist – Buchstabe für Buchstabe.',
      ],
      solution: { html: L2_FIX_HTML_LOESUNG },
      tests: [
        { type: 'selector', selector: 'ul li', count: 3, label: 'Die Liste hat drei Einträge' },
        { type: 'text', selector: 'ul li:nth-child(2)', expected: 'Pixel Farm', label: '„Pixel Farm“ ist der zweite Listenpunkt' },
        { type: 'selector', selector: 'ul p', count: 0, label: 'In der Liste steht kein Absatz mehr' },
        { type: 'attr', selector: 'a', attr: 'href', expected: 'spiele.html', label: 'Der Link führt zu spiele.html' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne jedem Selektor zu, was er trifft.',
      pairs: [
        ['`p`', 'alle Absätze'],
        ['`.neu`', 'alle Elemente mit der Klasse neu'],
        ['`#logo`', 'das eine Element mit der id logo'],
        ['`nav a`', 'nur Links innerhalb der Navigation'],
        ['`a:hover`', 'Links, solange die Maus darüber ist'],
        ['`h1, h2`', 'alle h1 und alle h2'],
      ],
    },
    {
      type: 'quiz',
      question: 'Ein Absatz hat einen Rahmen, aber der Text klebt innen am Rahmen. Welche Eigenschaft schafft Luft **zwischen Text und Rahmen**?',
      options: ['`padding`', '`margin`', '`gap`', '`border`'],
      correct: 0,
      explanation: '`padding` ist der Innenabstand (innerhalb des Rahmens), `margin` der Außenabstand (außerhalb). `gap` wirkt nur zwischen Flex-Kindern.',
    },
    {
      type: 'code',
      task: '1. **Ordne** die Karten im Container mit der Klasse `drops` nebeneinander an, mit 16 Pixel Abstand dazwischen. 2. **Gestalte** jede Karte mit der Klasse `drop`: ein 2 Pixel dicker, durchgezogener Rahmen in `#1b1b2f`, rundum 12 Pixel Innenabstand, 8 Pixel runde Ecken.',
      starter: { html: L2_DROPS_HTML, css: L2_DROPS_CSS_START },
      editable: ['css'],
      hints: [
        'Zwei neue Regeln: eine für den Container (Flexbox einschalten, Abstand), eine für die Karten (Rahmen, Innenabstand, Ecken).',
        'Rahmen in einer Zeile mit drei Angaben, z. B. `border: 1px solid red;`. Der Abstand zwischen Flex-Kindern ist `gap`.',
        'Gerüst: `.drops { display: …; gap: …; }` und `.drop { border: … … …; padding: …; border-radius: …; }`.',
      ],
      solution: { css: L2_DROPS_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: '.drops', prop: 'display', expected: 'flex', label: 'Die Karten stehen nebeneinander (Flex-Container)' },
        { type: 'style', selector: '.drops', prop: 'column-gap', expected: '16px', label: 'Zwischen den Karten sind 16px Abstand' },
        { type: 'style', selector: '.drop', prop: 'border-top-width', expected: '2px', label: 'Jede Karte hat einen 2px dicken Rahmen' },
        { type: 'style', selector: '.drop', prop: 'border-top-color', expected: '#1b1b2f', label: 'Der Rahmen ist dunkel' },
        { type: 'style', selector: '.drop', prop: 'padding-top', expected: '12px', label: 'Jede Karte hat 12px Innenabstand' },
        { type: 'style', selector: '.drop', prop: 'border-top-left-radius', expected: '8px', label: 'Die Ecken sind rund' },
      ],
    },
    {
      type: 'fill',
      text: 'Vervollständige das Skript: Der Knopf mit der id `start` wird gefunden und reagiert auf Klicks.',
      template: 'const knopf = document.___("start");\nknopf.___("click", function () {\n  console.log("Los!");\n});',
      accept: [['getElementById'], ['addEventListener']],
      hint: 'Element über die id finden, dann einen Listener anmelden – beide Methodennamen kennst du vom Schaltpult.',
    },
    {
      type: 'quiz',
      question: 'Was gibt dieses Skript in der Konsole aus?\n\n```js\nconst preis = 12;\nconst anzahl = 3;\nconsole.log("Summe: " + preis * anzahl);\n```',
      options: ['Summe: 36', 'Summe: 123', 'Summe: 12 * 3'],
      correct: 0,
      explanation: 'Punkt vor Strich: Erst wird 12 * 3 gerechnet, dann wird das Ergebnis 36 an den Text gehängt.',
    },
    {
      type: 'code',
      task: '**Erweitere** das Skript: Beim Klick auf den Knopf `schalter` wird am body die Klasse `kontrast` ein- oder ausgeschaltet.',
      starter: { html: L2_KONTRAST_HTML, css: L2_KONTRAST_CSS, js: L2_KONTRAST_JS_START },
      editable: ['js'],
      hints: [
        'Den body erreichst du immer über document.body – dort wird die Klasse geschaltet.',
        'Umschalten heißt toggle, z. B. `element.classList.toggle("aktiv")` – hier am body, mit der Klasse aus der Aufgabe.',
      ],
      solution: { js: L2_KONTRAST_JS_LOESUNG },
      tests: [
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#fff7e8', label: 'Vor dem Klick ist die Seite hell' },
        { type: 'action', action: 'click', selector: '#schalter' },
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#1b1b2f', label: 'Nach dem Klick ist die Seite dunkel' },
        { type: 'action', action: 'click', selector: '#schalter' },
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#fff7e8', label: 'Ein zweiter Klick schaltet zurück' },
        { type: 'source', file: 'js', matches: 'classList\\.toggle\\(\\s*["\']kontrast["\']', label: 'Das Skript schaltet die Klasse kontrast um' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Letzter Feinschliff an der Tickets-Seite, bevor Sam abnimmt: Die Navigation bekommt den vierten Link zum Impressum – das muss von jeder Seite aus erreichbar sein. Und unter dem Formular kommen die drei Fragen, die Sam jeden Tag per Mail bekommt: eine Liste, jede Frage stark betont, dann Gedankenstrich und Antwort.\n\nDen Gedankenstrich „–“ kopierst du am besten aus der Aufgabe – auf der Tastatur ist er gut versteckt.',
    },
    { type: 'code', etappe: '18-showtime/02-grosse-wiederholung' },
  ],
});

/* ================================================================
   Lektion 3 – Deine eigene Website
   ================================================================ */

const L3_START_HTML = `<!DOCTYPE html>
<html lang="de">
  <head>
    <!-- Zeichensatz, Titel, Stylesheet -->
  </head>
  <body>
    <!-- Kopfbereich, Navigation, Hauptbereich, Fußbereich, Skript -->
  </body>
</html>
`;
const L3_START_HTML_LOESUNG = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Mein Verein</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <h1>Mein Verein</h1>
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
const L3_START_CSS = `body {
  font-family: Arial, sans-serif;
}
`;
const L3_START_JS = `// Dein JavaScript
`;

schreibe('lessons/03-eigene-website.json', {
  id: '03-eigene-website',
  title: 'Deine eigene Website',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: '„Die FUNKEN-Seite steht – Line-up, Tickets, Galerie, Impressum. Ihr habt sie in sechs Wochen neu gebaut. Und jetzt will ich sehen, was **du** baust: eine Website zu **deinem** Thema. Dein Verein, dein Hobby, dein Lieblingsspiel, ein Foodtruck, eine Band, dein Fitness-Plan, das Praktikum – egal was. Zwei Bedingungen: Du kennst dich aus, und es gibt Stoff für mindestens drei Abschnitte.“',
    },
    {
      type: 'quiz',
      question: 'Welches Thema eignet sich am besten für deine eigene Website?',
      options: ['Mein Fußballverein: Team, Trainingszeiten, Anfahrt, Kontakt', 'Alles über das Internet', 'Ein Bild von meiner Katze – ohne Text'],
      correct: 0,
      explanation: 'Der Verein liefert Stoff für Texte, Liste, Tabelle, Bild und Formular. „Alles über das Internet“ ist zu groß, ein Bild allein zu wenig.',
    },
    {
      type: 'explain',
      text: 'So planst du – **vor** der ersten Zeile Code:\n\n1. **Thema** festlegen – ein Satz: „Eine Seite für …“\n2. **Seitenstruktur** skizzieren – auf Papier: Kopfbereich, Navigation, drei Abschnitte, Fußbereich.\n3. **Inhalte** sammeln – Texte, Liste, Tabelle, Bild, Formular.\n4. **Farben** wählen – zwei bis drei Farben, eine Schriftart.\n5. **Checkliste** prüfen – erst wenn alles grün ist, kommt die Kür.\n\nGebaut wird wie immer: Gerüst → Licht → Strom.',
      figure: FIG_PLAN,
    },
    {
      type: 'order',
      text: 'Bringe die Schritte zum Bau deiner Website in eine sinnvolle Reihenfolge.',
      lines: [
        'Thema festlegen',
        'Seitenstruktur auf Papier skizzieren',
        'Inhalte sammeln: Texte, Liste, Tabelle, Bild',
        'HTML-Gerüst und Inhalte schreiben',
        'Stylesheet: Farben, Schrift, Layout',
        'Skript: ein Knopf reagiert auf Klick',
        'Checkliste prüfen und als ZIP herunterladen',
      ],
      explanation: 'Erst planen (Thema, Skizze, Inhalte), dann bauen: Gerüst, Licht, Strom – und zum Schluss prüfen.',
    },
    {
      type: 'explain',
      text: 'Die Checkliste im Finale prüft **15 Pflicht-Kriterien** automatisch. Für die HTML-Seite:\n\n- Grundgerüst mit Titel und Zeichensatz\n- **genau eine** `h1`, mindestens zwei `h2`\n- mindestens drei Absätze\n- `nav` mit mindestens drei Links\n- eine Liste mit mindestens drei Einträgen\n- ein Bild mit Alternativtext\n- eine Tabelle mit Kopfzeile\n- ein Formular mit Eingabefeld, Label und Knopf\n- `header`, `main`, `footer`\n- ein Link, dessen Adresse „impressum“ enthält',
    },
    {
      type: 'pair',
      text: 'Welche Technik erfüllt welches Kriterium?',
      pairs: [
        ['Navigation als Leiste nebeneinander', '`nav` mit `display: flex`'],
        ['Bild, das auch ohne Anzeige verständlich ist', '`img` mit `alt`-Attribut'],
        ['Ein Knopf verändert etwas auf der Seite', '`addEventListener` und `textContent`'],
        ['Mehrere Elemente gleich gestalten', 'Klasse im HTML, `.klasse` im Stylesheet'],
        ['Bereiche mit Bedeutung', '`header`, `main`, `footer`'],
        ['Tabelle mit Kopfzeile', '`th` in der ersten Zeile'],
      ],
    },
    {
      type: 'explain',
      text: 'Für Stylesheet und Skript:\n\n- `body` mit eigener Schriftart, `h1` mit eigener Farbe\n- mindestens eine Klasse verwendet **und** gestaltet\n- Box-Modell: `padding` plus `border` oder `margin`\n- die Navigation als Flexbox\n- ein Knopf, der beim Klick etwas verändert (Element finden, Listener)\n\nAlles darüber hinaus ist **Kür**: hover-Effekte, Schatten auf Karten, ein Zähler, ein Nachtmodus-Schalter. Kür bringt keine Punkte – aber Applaus bei der Präsentation.',
    },
    {
      type: 'quiz',
      question: 'Die Checkliste prüft „Ein Link zu einem Impressum-Abschnitt oder einer Impressum-Seite“. Was muss der Link haben?',
      options: [
        'Eine Adresse, in der „impressum“ vorkommt – z. B. die Sprungmarke `#impressum`',
        'Den Linktext „Impressum“ in Großbuchstaben',
        'Eine zweite HTML-Datei – ein Abschnitt reicht nicht',
      ],
      correct: 0,
      explanation: 'Geprüft wird die Adresse im `href`. Die Werkbank im Finale hat nur eine HTML-Datei – das Impressum wird also ein Abschnitt mit der id `impressum`, zu dem der Link springt.',
    },
    {
      type: 'code',
      task: '1. **Vervollständige** den Kopfbereich deiner Startseite um den Zeichensatz UTF-8, einen Titel deiner Wahl und die Verknüpfung mit style.css. 2. **Strukturiere** den Körper: Kopfbereich mit Hauptüberschrift, Navigation, Hauptbereich, Fußbereich – in dieser Reihenfolge – und ganz am Ende die Einbindung von script.js.',
      starter: { html: L3_START_HTML, css: L3_START_CSS, js: L3_START_JS },
      editable: ['html'],
      hints: [
        'Das Grundgerüst kennst du von jeder FUNKEN-Seite: Im head stehen meta, title und link; im body die vier Zonen und ganz unten das Skript.',
        'Muster für die Verknüpfungen: `<link rel="stylesheet" href="…">` im head und `<script src="…"></script>` vor dem schließenden body-Tag – Dateinamen aus der Aufgabe.',
        'Reihenfolge im body: header (mit h1) → nav → main → footer → script. Leere Zonen sind in Ordnung – gefüllt werden sie im Finale.',
      ],
      solution: { html: L3_START_HTML_LOESUNG },
      tests: [
        { type: 'source', file: 'html', matches: '<meta[^>]+charset\\s*=\\s*["\']?utf-8', label: 'Der Zeichensatz UTF-8 ist angegeben' },
        { type: 'source', file: 'html', matches: '<title>\\s*\\S', label: 'Die Seite hat einen Titel' },
        { type: 'attr', selector: 'link[rel="stylesheet"]', attr: 'href', expected: 'style.css', label: 'style.css ist verknüpft' },
        { type: 'selector', selector: 'header h1', count: 1, label: 'Im Kopfbereich steht genau eine Hauptüberschrift' },
        { type: 'order', selectors: ['header', 'nav', 'main', 'footer'], label: 'Kopfbereich, Navigation, Hauptbereich, Fußbereich – in dieser Reihenfolge' },
        { type: 'attr', selector: 'script[src]', attr: 'src', expected: 'script.js', label: 'script.js ist eingebunden' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Alles vorbereitet. Im Finale findest du die Werkbank mit drei Dateien, die Checkliste mit den 15 Kriterien und den ZIP-Download. Dein Stand wird automatisch gespeichert – du kannst jederzeit weitermachen.\n\nDenk dran: eine HTML-Datei – das Impressum wird ein Abschnitt mit der id `impressum`. Die Übungsbilder (`katze.svg`, `pizza.svg`, `controller.svg` …) darfst du benutzen.\n\n[Showtime öffnen](#/showtime) – und danach nimmt Sam bei der Abnahme die FUNKEN-Website ab.',
    },
  ],
});

/* ================================================================
   Fragenpool – quer durch alle Blöcke
   ================================================================ */

schreibe('pool.json', {
  chapter: '18-showtime',
  fragen: [
    { id: '18-01', konzept: 'web.sprachen', type: 'quiz', question: 'Ein Link soll beim Überfahren mit der Maus orange werden. Welche Sprache brauchst du?', options: ['CSS', 'HTML', 'JavaScript'], correct: 0, explanation: 'Aussehen – auch beim Überfahren (hover) – ist CSS. JavaScript wäre nur für Klicks nötig.' },
    { id: '18-02', konzept: 'html.grundgeruest', type: 'fill', text: 'Vervollständige die erste Zeile jeder HTML-Datei.', template: '<!DOCTYPE ___>', accept: ['html'], hint: 'Der Dokumenttyp ist einfach der Name der Sprache.' },
    { id: '18-03', konzept: 'html.ul', type: 'bug', text: 'Die Liste zeigt „Döner“ und „Waffeln“ in einer Zeile. Welche Zeile ist fehlerhaft?', lines: ['<ul>', '  <li>Pizza</li>', '  <li>Döner', '  <li>Waffeln</li>', '</ul>'], line: 2, explanation: 'Dem Eintrag „Döner“ fehlt der schließende Tag `</li>`.' },
    { id: '18-04', konzept: 'html.semantik', type: 'pair', text: 'Ordne die semantischen Elemente zu.', pairs: [['`header`', 'Kopfbereich mit Titel und Einleitung'], ['`nav`', 'Navigation mit den Links'], ['`main`', 'der eigentliche Hauptinhalt'], ['`footer`', 'Fußbereich mit Adresse und Impressum']] },
    { id: '18-05', konzept: 'html.table', type: 'order', text: 'Sortiere die Tabelle mit ihrer Kopfzeile.', lines: ['<table>', '  <tr>', '    <th>Zeit</th>', '    <th>Act</th>', '  </tr>', '</table>'] },
    { id: '18-06', konzept: 'html.label', type: 'quiz', question: 'Wie verbindest du ein Label mit seinem Eingabefeld?', options: ['Das Attribut `for` am Label bekommt die `id` des Feldes', 'Beide bekommen dieselbe Klasse', 'Das Label steht einfach direkt vor dem Feld'], correct: 0, explanation: '`for` zeigt auf die `id` des Feldes. Ein Klick auf das Label setzt dann den Cursor ins Feld.' },
    { id: '18-07', konzept: 'css.regel', type: 'bug', text: 'Die Schriftgröße wird nicht übernommen. Welche Zeile ist fehlerhaft?', lines: ['p {', '  color: #0b7dd6', '  font-size: 18px;', '}'], line: 1, explanation: 'Nach `#0b7dd6` fehlt das Semikolon – der Browser liest die nächste Zeile als Teil des Farbwerts und verwirft beides.' },
    { id: '18-08', konzept: 'css.sel-klasse', type: 'fill', text: 'Alle Elemente mit der Klasse `karte` bekommen Innenabstand. Vervollständige den Selektor.', template: '___ {\n  padding: 12px;\n}', accept: ['.karte'], hint: 'Klassen-Selektor: ein Punkt, dann der Klassenname.' },
    { id: '18-09', konzept: 'css.padding', type: 'pair', text: 'Ordne die Eigenschaften des Box-Modells zu.', pairs: [['`padding`', 'Innenabstand – zwischen Inhalt und Rahmen'], ['`margin`', 'Außenabstand – zu anderen Elementen'], ['`border`', 'der Rahmen selbst'], ['`border-radius`', 'runde Ecken']] },
    { id: '18-10', konzept: 'css.flex', type: 'quiz', question: 'Die Links in einer `nav` sollen nebeneinander stehen. Welche Deklaration?', options: ['`display: flex;`', '`flex: nebeneinander;`', '`text-align: row;`'], correct: 0, explanation: '`display: flex;` macht die nav zum Flex-Container – ihre Kinder stehen dann in einer Reihe.' },
    { id: '18-11', konzept: 'js.addEventListener', type: 'bug', text: 'Die Konsole meldet einen Syntaxfehler. Welche Zeile ist fehlerhaft?', lines: ['const knopf = document.getElementById("start");', 'knopf.addEventListener("click", function () {', '  zahl = zahl + 1;', '};'], line: 3, explanation: 'Die Funktion wird mit `}` geschlossen, aber der Aufruf von addEventListener braucht noch die schließende Klammer: `});`.' },
    { id: '18-12', konzept: 'js.textContent', type: 'quiz', question: 'Welche Zeile schreibt „Hallo“ in das Element mit der id `gruss`?', options: ['`document.getElementById("gruss").textContent = "Hallo";`', '`document.getElementById("gruss") = "Hallo";`', '`document.textContent("gruss", "Hallo");`'], correct: 0, explanation: 'Erst das Element finden, dann seine Eigenschaft `textContent` setzen.' },
    { id: '18-13', konzept: 'js.variable', type: 'fill', text: 'Die Variable soll sich später ändern dürfen. Vervollständige.', template: '___ punkte = 0;\npunkte = punkte + 1;', accept: ['let'], hint: 'Mit const wäre die zweite Zeile ein Fehler.' },
    { id: '18-14', konzept: 'js.addEventListener', type: 'order', text: 'Sortiere das Skript: Beim Klick auf den Knopf erscheint ein Text.', lines: ['const knopf = document.getElementById("mehr");', 'knopf.addEventListener("click", function () {', '  document.getElementById("info").textContent = "Mehr Infos!";', '});'] },
    { id: '18-15', konzept: 'recht.impressum', type: 'quiz', question: 'Wann braucht eine Website ein Impressum?', options: ['Sobald sie nicht rein privat ist – z. B. Verein, Festival, Firma', 'Nur wenn sie etwas verkauft', 'Nie – das ist freiwillig'], correct: 0, explanation: 'In Deutschland ist das Impressum Pflicht für alle Seiten, die nicht rein privat sind: Name, Anschrift, Kontakt.' },
    { id: '18-16', konzept: 'html.img', type: 'bug', text: 'Ein Bild wird nicht angezeigt. Welche Zeile ist fehlerhaft?', lines: ['<img src="pizza.svg" alt="Pizza Margherita">', '<img href="katze.svg" alt="Katze auf dem Sofa">', '<img src="ticket.svg" alt="Ein Festivalticket">'], line: 1, explanation: 'Die Bildquelle heißt `src`, nicht `href` – `href` gibt es nur bei Links.' },
  ],
});

/* ================================================================
   Abnahme: Showtime
   ================================================================ */

const B_VEREIN_HTML_START = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>SV Neckarblitz</title>
  </head>
  <body>
    <header>
      <h1>SV Neckarblitz</h1>
    </header>
    <nav>
      <a href="index.html">Start</a>
      <a href="team.html">Team</a>
      <a href="kontakt.html">Kontakt</a>
    </nav>
    <main>
      <h2>Willkommen</h2>
      <p>Fußball für alle ab 14 – zwei Teams, ein Platz am Neckar.</p>
    </main>
    <footer>
      <p>SV Neckarblitz · Heilbronn</p>
    </footer>
  </body>
</html>
`;
const B_VEREIN_HTML_LOESUNG = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>SV Neckarblitz</title>
  </head>
  <body>
    <header>
      <h1>SV Neckarblitz</h1>
    </header>
    <nav>
      <a href="index.html">Start</a>
      <a href="team.html">Team</a>
      <a href="kontakt.html">Kontakt</a>
    </nav>
    <main>
      <h2>Willkommen</h2>
      <p>Fußball für alle ab 14 – zwei Teams, ein Platz am Neckar.</p>

      <h2>Training</h2>
      <table>
        <tr>
          <th>Tag</th>
          <th>Uhrzeit</th>
        </tr>
        <tr>
          <td>Dienstag</td>
          <td>18:00</td>
        </tr>
        <tr>
          <td>Freitag</td>
          <td>17:30</td>
        </tr>
      </table>
    </main>
    <footer>
      <p>SV Neckarblitz · Heilbronn</p>
    </footer>
  </body>
</html>
`;

const B_ANGEBOT_HTML = `<div class="angebot">
  <h2>Pizza-Freitag</h2>
  <p>Jede Pizza 6 € – nur am Freitag, nur am Foodtruck.</p>
</div>
`;
const B_ANGEBOT_CSS_START = `.angebot {
  background-color: #fff7e8;
  border: 2px solid #ff6a00
  padding: 12px;
  border-radius: 8px;
}

.angebot h2 {
  colour: #d94f00;
}
`;
const B_ANGEBOT_CSS_LOESUNG = `.angebot {
  background-color: #fff7e8;
  border: 2px solid #ff6a00;
  padding: 12px;
  border-radius: 8px;
}

.angebot h2 {
  color: #d94f00;
}
`;

const B_TICKETS_HTML = `<h1>Tickets für den Kinoabend</h1>
<p><button id="plus">Noch ein Ticket</button> <span id="anzahl">0</span> Tickets</p>
<p id="summe"></p>
`;
const B_TICKETS_JS_START = `let tickets = 0;
const preis = 12;
`;
const B_TICKETS_JS_LOESUNG = `let tickets = 0;
const preis = 12;
const knopf = document.getElementById("plus");
knopf.addEventListener("click", function () {
  tickets = tickets + 1;
  document.getElementById("anzahl").textContent = tickets;
  document.getElementById("summe").textContent = "Summe: " + tickets * preis + " €";
});
`;

schreibe('boss.json', {
  chapter: '18-showtime',
  title: 'Abnahme: Showtime',
  intro: 'Das ist sie. Unsere Seite – Line-up, Tickets, Galerie, Impressum, sogar ein Nachtmodus. Bevor ich den Link an 3 000 Leute schicke, gehen wir einmal alles durch, von vorne bis hinten. Zeig mir, dass ihr das wirklich könnt.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'web.client-server', type: 'quiz', question: 'Sam schickt den Link an alle. 3 000 Handys rufen die Seite auf – wo liegt sie?', options: ['Auf dem Server – jedes Handy bekommt sie als Antwort', 'Auf Sams Handy – von dort wird sie weitergereicht', 'Auf jedem Handy, seit es den Link bekommen hat'], correct: 0, explanation: 'Client fragt, Server antwortet – 3 000 Mal. Die Seite liegt nur auf dem Server.' },
    { konzept: 'html.form', type: 'order', text: 'Sortiere das Formular: beschriftetes Namensfeld, dann der Absende-Knopf.', lines: ['<form>', '  <label for="name">Name</label>', '  <input type="text" id="name" name="name">', '  <button type="submit">Absenden</button>', '</form>'] },
    { konzept: 'html.grundgeruest', type: 'fill', text: 'Vervollständige das Grundgerüst: Dokumenttyp und Zeichensatz, damit Umlaute richtig erscheinen.', template: '<!DOCTYPE ___>\n<html lang="de">\n  <head>\n    <meta charset="___">', accept: [['html'], ['utf-8', 'UTF-8']] },
    { konzept: 'css.sel-nachfahre', type: 'pair', text: 'Ordne jedem Selektor zu, was er trifft.', pairs: [['`.karte`', 'alle Elemente mit der Klasse karte'], ['`#logo`', 'das Element mit der id logo'], ['`nav a`', 'Links innerhalb der Navigation'], ['`h1, h2`', 'alle h1 und alle h2']] },
    {
      type: 'code',
      task: '**Ergänze** im Hauptbereich der Vereinsseite nach dem Willkommens-Absatz den Abschnitt „Training“: eine Zwischenüberschrift und eine Tabelle mit der Kopfzeile Tag | Uhrzeit und zwei Zeilen: Dienstag | 18:00 und Freitag | 17:30.',
      starter: { html: B_VEREIN_HTML_START },
      solution: { html: B_VEREIN_HTML_LOESUNG },
      tests: [
        { type: 'text', selector: 'main h2:last-of-type', expected: 'Training', label: 'Der Abschnitt „Training“ ist da' },
        { type: 'selector', selector: 'table th', count: 2, label: 'Die Kopfzeile hat zwei Kopfzellen' },
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
        { type: 'text', selector: 'table tr:nth-child(2) td:first-child', expected: 'Dienstag', label: 'Die erste Datenzeile beginnt mit Dienstag' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: '17:30', label: 'Freitag endet mit 17:30' },
        { type: 'order', selectors: ['main p', 'main h2:last-of-type', 'table'], label: 'Der Abschnitt steht nach dem Willkommens-Absatz' },
      ],
    },
    { konzept: 'css.margin', type: 'quiz', question: 'Zwei Karten stehen direkt aneinander. Womit bekommst du Luft **außerhalb** ihres Rahmens, zwischen den Karten?', options: ['`margin`', '`padding`', '`border`'], correct: 0, explanation: '`margin` ist der Außenabstand. `padding` wirkt innen, zwischen Inhalt und Rahmen.' },
    { konzept: 'css.hover', type: 'fill', text: 'Vervollständige: Navigations-Links werden orange, solange die Maus darüber ist.', template: 'nav a___ {\n  color: #ff6a00;\n}', accept: [':hover'] },
    {
      type: 'code',
      mode: 'fix',
      task: '**Repariere** das Stylesheet der Angebots-Karte: Sie hat weder Rahmen noch Innenabstand, und die Überschrift bleibt schwarz statt dunkelorange.',
      starter: { html: B_ANGEBOT_HTML, css: B_ANGEBOT_CSS_START },
      editable: ['css'],
      solution: { css: B_ANGEBOT_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: '.angebot', prop: 'border-top-width', expected: '2px', label: 'Die Karte hat einen 2px dicken Rahmen' },
        { type: 'style', selector: '.angebot', prop: 'border-top-color', expected: '#ff6a00', label: 'Der Rahmen ist orange' },
        { type: 'style', selector: '.angebot', prop: 'padding-top', expected: '12px', label: 'Die Karte hat 12px Innenabstand' },
        { type: 'style', selector: '.angebot h2', prop: 'color', expected: '#d94f00', label: 'Die Überschrift ist dunkelorange' },
      ],
    },
    { konzept: 'css.justify-content', type: 'quiz', question: 'Die Links einer Flex-Navigation sollen mittig verteilt sein. Welche Deklaration gehört in die nav-Regel?', options: ['`justify-content: center;`', '`align-items: center;`', '`flex-direction: center;`'], correct: 0, explanation: '`justify-content` verteilt entlang der Hauptachse – bei einer Zeile also waagerecht. `align-items` richtet quer dazu aus.' },
    { konzept: 'js.variable', type: 'pair', text: 'Ordne die JavaScript-Bausteine zu.', pairs: [['`const`', 'Variable, die sich nicht mehr ändert'], ['`let`', 'Variable, die sich ändern darf'], ['`console.log(…)`', 'gibt etwas in der Konsole aus'], ['`textContent`', 'der Text eines Elements'], ['`classList.toggle(…)`', 'schaltet eine Klasse ein oder aus']] },
    {
      type: 'code',
      task: '**Erweitere** das Skript: Bei jedem Klick auf den Knopf `plus` steigt die Zahl im Element `anzahl` um 1, und der Absatz `summe` zeigt „Summe: “, dann Anzahl mal Preis, dann „ €“ – nach zwei Klicks also „Summe: 24 €“.',
      starter: { html: B_TICKETS_HTML, js: B_TICKETS_JS_START },
      editable: ['js'],
      solution: { js: B_TICKETS_JS_LOESUNG },
      tests: [
        { type: 'text', selector: '#anzahl', expected: '0', label: 'Vor dem Klick steht die Anzahl auf 0' },
        { type: 'action', action: 'click', selector: '#plus' },
        { type: 'action', action: 'click', selector: '#plus' },
        { type: 'text', selector: '#anzahl', expected: '2', label: 'Nach zwei Klicks steht die Anzahl auf 2' },
        { type: 'text', selector: '#summe', expected: 'Summe: 24 €', label: 'Die Summe lautet „Summe: 24 €“' },
        { type: 'source', file: 'js', matches: 'tickets\\s*\\*\\s*preis|preis\\s*\\*\\s*tickets', label: 'Die Summe wird aus Anzahl und Preis berechnet' },
      ],
    },
    { konzept: 'recht.urheberrecht', type: 'quiz', question: 'Du findest im Netz ein tolles Foto für die Galerie. Darfst du es benutzen?', options: ['Nur mit Erlaubnis oder passender Lizenz – und mit Nachweis', 'Ja, alles im Netz ist frei', 'Ja, wenn du die Quelle nennst'], correct: 0, explanation: 'Fotos sind urheberrechtlich geschützt. Die Quelle zu nennen ersetzt keine Erlaubnis – eine Lizenz wie CC BY schon, wenn du den Nachweis dazuschreibst.' },
  ],
});

console.log('Kapitel 18 geschrieben');
