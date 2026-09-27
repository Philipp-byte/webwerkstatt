// Kapitel 16 – JavaScript-Start (Station „Stromkasten“).
// Erzeugt public/content/chapters/16-javascript-start/{lessons/*.json,pool.json,boss.json}
// Bewusst „wenig JavaScript“: script-Element, Konsole, const/let, Zahlen vs. Texte,
// Rechenoperatoren und Verkettung – keine if, keine Schleifen.
import fs from 'node:fs';
import path from 'node:path';

const KAPITEL = '16-javascript-start';
const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', KAPITEL);
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Lektion 1: index.html bindet script.js am Ende des body ein, das Skript schreibt in die Konsole.
const FIG_STROM = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="12" y="20" width="118" height="120" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="71" y="38" text-anchor="middle" fill="#ff7a45" font-weight="bold">index.html</text><text x="22" y="62" fill="#eef2ff" font-family="monospace">&lt;body&gt;</text><text x="22" y="80" fill="#eef2ff" font-family="monospace">  Inhalt …</text><text x="22" y="102" fill="#ffd84d" font-family="monospace">  &lt;script src&gt;</text><text x="22" y="122" fill="#eef2ff" font-family="monospace">&lt;/body&gt;</text><path d="M132 98 H164" stroke="#ffd84d" stroke-width="2" marker-end="url(#pf)"/><text x="239" y="74" text-anchor="middle" fill="#ffd84d" font-weight="bold">script.js</text><rect x="170" y="82" width="138" height="32" rx="8" fill="#1b2135" stroke="#ffd84d" stroke-width="2"/><text x="239" y="103" text-anchor="middle" fill="#eef2ff" font-family="monospace">console.log("Hi")</text><path d="M239 116 V126" stroke="#4ade80" stroke-width="2" marker-end="url(#pg)"/><rect x="170" y="128" width="138" height="26" rx="8" fill="#0f1320" stroke="#4ade80" stroke-width="2"/><text x="239" y="146" text-anchor="middle" fill="#4ade80" font-family="monospace">Konsole: Hi</text><defs><marker id="pf" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker><marker id="pg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#4ade80"/></marker></defs></svg>`;

// Lektion 2: Variable = Kiste mit Etikett; const bleibt, let darf sich ändern.
const FIG_VARIABLE = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#e8ecf7"/><text x="160" y="26" text-anchor="middle" fill="#0f1320" font-weight="bold" font-size="13">Eine Variable ist eine Kiste mit Etikett</text><rect x="24" y="56" width="124" height="60" rx="8" fill="#0f1320" stroke="#ffd84d" stroke-width="2"/><rect x="34" y="46" width="56" height="20" rx="4" fill="#ffd84d"/><text x="62" y="60" text-anchor="middle" fill="#0f1320" font-family="monospace">spiel</text><text x="86" y="96" text-anchor="middle" fill="#eef2ff" font-family="monospace">"Neon Racer"</text><text x="86" y="138" text-anchor="middle" fill="#0f1320">const · Wert bleibt</text><rect x="172" y="56" width="124" height="60" rx="8" fill="#0f1320" stroke="#38c7ff" stroke-width="2"/><rect x="182" y="46" width="64" height="20" rx="4" fill="#38c7ff"/><text x="214" y="60" text-anchor="middle" fill="#0f1320" font-family="monospace">punkte</text><text x="234" y="96" text-anchor="middle" fill="#eef2ff" font-family="monospace">0 → 250</text><text x="234" y="138" text-anchor="middle" fill="#0f1320">let · Wert darf sich ändern</text></svg>`;

// Lektion 3: Das Plus rechnet bei Zahlen und klebt bei Text.
const FIG_PLUS = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="28" text-anchor="middle" fill="#eef2ff" font-weight="bold" font-size="13">Das Plus hat zwei Jobs</text><rect x="12" y="50" width="296" height="40" rx="8" fill="#1b2135"/><text x="24" y="76" fill="#38c7ff" font-family="monospace" font-size="15">5 + 3</text><path d="M96 70 H128" stroke="#4ade80" stroke-width="2" marker-end="url(#gr)"/><text x="138" y="76" fill="#4ade80" font-family="monospace" font-size="15" font-weight="bold">8</text><text x="186" y="76" fill="#eef2ff">Zahl + Zahl: rechnen</text><rect x="12" y="100" width="296" height="40" rx="8" fill="#1b2135"/><text x="24" y="126" fill="#b48cff" font-family="monospace" font-size="15">"5" + 3</text><path d="M96 120 H128" stroke="#ffd84d" stroke-width="2" marker-end="url(#ge)"/><text x="138" y="126" fill="#ffd84d" font-family="monospace" font-size="15" font-weight="bold">"53"</text><text x="186" y="126" fill="#eef2ff">Text + Zahl: kleben</text><defs><marker id="gr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#4ade80"/></marker><marker id="ge" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker></defs></svg>`;

/* ---------- Lektion 1: Was ist JavaScript? ---------- */
schreibe('lessons/01-was-ist-javascript.json', {
  id: '01-was-ist-javascript',
  title: 'Was ist JavaScript?',
  konzepte: ['js.script', 'js.console'],
  steps: [
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Gerüst steht, Licht ist an – jetzt kommt der **Strom**. Auf der FUNKEN-Seite passiert bisher nichts: kein Zähler, keine Reaktion auf Klicks.\n\n**JavaScript** ist die Sprache, die eine Seite lebendig macht. Sie **reagiert** (auf Klicks und Eingaben), **rechnet** (Preise, Punkte, Countdown) und **verändert** die Seite, während sie offen ist – wie der Warenkorb, der beim Tippen sofort die Summe anpasst.',
      figure: FIG_STROM,
    },
    {
      type: 'explain',
      text: 'JavaScript kommt in eine eigene Datei: `script.js`. Die Seite bindet sie mit dem **script-Element** ein – das Attribut `src` nennt die Datei, genau wie bei Bildern.\n\n```html\n    <p>Bis bald am Neckar!</p>\n    <script src="script.js"></script>\n  </body>\n```\n\nDas Element steht **ganz am Ende des body**. Der Browser liest von oben nach unten: So ist die komplette Seite schon da, wenn das Skript loslegt.',
    },
    {
      type: 'example',
      text: 'Links die Seite, rechts die Vorschau – und darunter die **Konsole**. Die Seite selbst bleibt gleich, aber in der Konsole erscheint der Text aus dem Skript. **Ändere** den Text zwischen den Anführungszeichen und **ergänze** eine zweite Zeile.',
      html: '<h1>Sneaker-Drop</h1>\n<p>Freitag, 10:00 Uhr – nur online.</p>\n',
      js: 'console.log("Drop-Seite geladen");\n',
    },
    {
      type: 'quiz',
      question: 'Warum steht das script-Element am **Ende des body** und nicht ganz oben?',
      options: ['Damit die ganze Seite schon da ist, wenn das Skript startet', 'Weil JavaScript nur direkt vor dem schließenden html-Tag erlaubt ist', 'Damit die Datei script.js kleiner wird'],
      correct: 0,
      explanation: 'Der Browser liest von oben nach unten. Steht das Skript am Ende, existieren alle Elemente bereits – wichtig, sobald das Skript sie später verändern soll.',
    },
    {
      type: 'code',
      task: '**Erstelle** im Skript eine Ausgabe in der Konsole mit dem Text „Level 1 geschafft“.',
      starter: { js: '// Mein erstes Skript\n' },
      hints: [
        'Für Ausgaben in der Konsole gibt es den Befehl console.log.',
        'Der Text kommt in gerade Anführungszeichen, das Ganze in runde Klammern – wie in `console.log("Hallo");`.',
        'Struktur: `console.log("…");` – zwischen die Anführungszeichen kommt der Text aus der Aufgabe.',
      ],
      solution: { js: '// Mein erstes Skript\nconsole.log("Level 1 geschafft");\n' },
      tests: [
        { type: 'console', expected: 'Level 1 geschafft', label: 'Die Konsole zeigt „Level 1 geschafft“' },
        { type: 'source', file: 'js', matches: 'console\\.log\\(', label: 'Die Ausgabe kommt von console.log' },
      ],
    },
    {
      type: 'explain',
      text: 'So ist eine **Anweisung** aufgebaut:\n\n```js\n// Kommentar: Diese Zeile überspringt der Browser\nconsole.log("Tor für Heilbronn!");\nconsole.log("Halbzeit");\n```\n\n- `console.log(…)` schreibt in die Konsole.\n- **Text** steht immer in geraden Anführungszeichen `"…"`.\n- Das **Semikolon** `;` schließt die Anweisung ab – wie der Punkt am Satzende.\n- **Kommentare** beginnen mit `//` und sind Notizen für Menschen.\n\nJede Anweisung bekommt eine eigene Zeile; die Konsole zeigt die Ausgaben in dieser Reihenfolge.',
    },
    {
      type: 'fill',
      text: 'Vervollständige die Anweisung, die „Einlass geöffnet“ in die Konsole schreibt.',
      template: '___.___("Einlass geöffnet");',
      accept: [['console'], ['log']],
      hint: 'Erst das Werkzeug (die Konsole), dann nach dem Punkt der Befehl zum Schreiben.',
    },
    {
      type: 'code',
      task: 'Die Fitness-App braucht Strom. 1. **Ergänze** in der Seite das Einbinden der Datei script.js – ganz am Ende des body. 2. **Erstelle** im Skript eine Konsolenausgabe „Training gestartet“.',
      starter: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Fit am Neckar</title>\n  </head>\n  <body>\n    <h1>Fit am Neckar</h1>\n    <p>Heute: 20 Minuten Laufen.</p>\n  </body>\n</html>\n',
        js: '// Skript der Fitness-App\n',
      },
      hints: [
        'Das script-Element mit dem src-Attribut kommt direkt vor das schließende body-Tag.',
        'Muster aus einem anderen Projekt: `<script src="spiel.js"></script>` – hier heißt die Datei anders.',
        'Im Skript reicht eine Zeile mit console.log und dem Text in Anführungszeichen.',
      ],
      solution: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Fit am Neckar</title>\n  </head>\n  <body>\n    <h1>Fit am Neckar</h1>\n    <p>Heute: 20 Minuten Laufen.</p>\n    <script src="script.js"></script>\n  </body>\n</html>\n',
        js: '// Skript der Fitness-App\nconsole.log("Training gestartet");\n',
      },
      tests: [
        { type: 'attr', selector: 'body script', attr: 'src', expected: 'script.js', label: 'script.js ist im body eingebunden' },
        { type: 'order', selectors: ['p', 'script[src]'], label: 'Das Skript steht nach dem Inhalt der Seite' },
        { type: 'console', expected: 'Training gestartet', label: 'Die Konsole zeigt „Training gestartet“' },
      ],
    },
    {
      type: 'order',
      text: 'Sortiere die Zeilen der Ticket-Seite: erst die Überschrift, dann der Absatz – und das Skript ganz am Ende des body.',
      lines: ['<body>', '  <h1>Ticket-Schalter</h1>', '  <p>Noch 120 Tickets.</p>', '  <script src="script.js"></script>', '</body>'],
      explanation: 'Das script-Element ist das letzte Element im body – so ist die Seite komplett geladen, bevor das Skript läuft.',
    },
    {
      type: 'explain',
      text: 'Was passiert bei einem Tippfehler? Die Konsole zeigt eine **Fehlermeldung** in Rot, und das Skript bleibt an dieser Stelle stehen:\n\n```js\nconsle.log("Hallo");\n```\n\n→ `consle is not defined` – „consle kennt der Browser nicht“. Fehlende Anführungszeichen oder eine vergessene Klammer melden einen `SyntaxError`.\n\nLies die Meldung genau: Sie nennt meist das Wort, das nicht passt. Fehler sind beim Programmieren normal – die Konsole hilft dir, sie zu finden.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** das Skript der Fitness-App: Es soll „Willkommen zurück!“ und „Heute ist Beintag“ in die Konsole schreiben, zeigt aber nur eine rote Fehlermeldung. Zwei Zeilen sind fehlerhaft.',
      starter: { js: '// Begrüßung beim Öffnen der App\nconsol.log("Willkommen zurück!");\nconsole.log(Heute ist Beintag);\n' },
      hints: [
        'Lies die Fehlermeldung in der Konsole: Welches Wort kennt der Browser nicht?',
        'Text muss in Anführungszeichen stehen – sonst hält der Browser ihn für Befehle.',
        'Vergleiche beide Zeilen Buchstabe für Buchstabe mit dem Muster `console.log("…");`.',
      ],
      solution: { js: '// Begrüßung beim Öffnen der App\nconsole.log("Willkommen zurück!");\nconsole.log("Heute ist Beintag");\n' },
      tests: [
        { type: 'console', expected: 'Willkommen zurück!', label: 'Die Konsole zeigt „Willkommen zurück!“' },
        { type: 'console', expected: 'Heute ist Beintag', label: 'Die Konsole zeigt „Heute ist Beintag“' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website! Die Startseite bekommt ihren Stromanschluss: Du bindest die Datei script.js am Ende des body ein und lässt das Skript in der Konsole melden, dass die Startseite geladen ist.\n\nDer Text muss genau stimmen – mit dem langen Strich „–“. Am sichersten kopierst du ihn aus der Aufgabe. Den Kommentar im Skript lässt du stehen.',
    },
    { type: 'code', etappe: '16-javascript-start/01-was-ist-javascript' },
  ],
});

/* ---------- Lektion 2: Variablen ---------- */
schreibe('lessons/02-variablen.json', {
  id: '02-variablen',
  title: 'Variablen',
  konzepte: ['js.variable', 'js.datentyp'],
  steps: [
    {
      type: 'explain',
      text: 'Ein Spiel merkt sich deinen Punktestand, der Warenkorb die Anzahl der Tickets. Solche Werte speichert ein Programm in **Variablen** – benannten Speicherplätzen, wie Kisten mit Etikett.\n\n```js\nlet punkte = 0;\nconsole.log(punkte);\n```\n\n`let` legt die Variable an, `punkte` ist ihr Name, `=` legt den Wert hinein. Danach reicht der Name, um den Wert zu benutzen – **ohne Anführungszeichen**.',
      figure: FIG_VARIABLE,
    },
    {
      type: 'explain',
      text: 'Zwei Arten, eine Variable anzulegen:\n\n```js\nconst spiel = "Neon Racer";\nlet punkte = 0;\npunkte = 250;\nconsole.log(punkte);\n```\n\n- **const** (konstant): Der Wert bleibt – Name des Spiels, Preis eines Tickets.\n- **let**: Der Wert darf sich ändern – Punktestand, Anzahl im Warenkorb.\n\nMit `punkte = 250;` bekommt die Kiste einen neuen Wert – ohne `let`, denn sie existiert schon. Bei `const` wäre das ein Fehler.',
    },
    {
      type: 'example',
      text: 'Zwei Kisten, drei Ausgaben. **Ändere** den Startwert von `leben` und schau in die Konsole. Dann **versuche**, `spieler` einen neuen Wert zu geben (`spieler = "Sam";`) – was meldet die Konsole?',
      js: 'const spieler = "Ayla";\nlet leben = 3;\nconsole.log(spieler);\nconsole.log(leben);\nleben = 2;\nconsole.log(leben);\n',
    },
    {
      type: 'quiz',
      question: 'Eine Variable soll die Anzahl der Likes unter einem Post speichern. Womit legst du sie an?',
      options: ['Mit `let`, weil sich die Zahl ändert', 'Mit `const`, weil Zahlen immer konstant sind', 'Egal – `let` und `const` sind dasselbe'],
      correct: 0,
      explanation: 'Likes kommen dazu – der Wert ändert sich, also `let`. `const` ist für Werte, die bleiben, egal ob Zahl oder Text.',
    },
    {
      type: 'code',
      task: '**Erstelle** eine veränderliche Variable `punkte` mit dem Startwert 100 sowie eine Konsolenausgabe ihres Werts.',
      starter: { js: '// Punktestand im Spiel\n' },
      hints: [
        'Veränderlich heißt: Die Variable wird mit let angelegt.',
        'Muster aus einem anderen Spiel: `let leben = 3;` – Zahlen stehen ohne Anführungszeichen.',
        'Zweite Zeile: console.log mit dem Variablennamen in den Klammern – ohne Anführungszeichen.',
      ],
      solution: { js: '// Punktestand im Spiel\nlet punkte = 100;\nconsole.log(punkte);\n' },
      tests: [
        { type: 'source', file: 'js', matches: 'let\\s+punkte\\s*=\\s*100\\b', label: 'punkte ist eine veränderliche Variable mit 100' },
        { type: 'source', file: 'js', matches: 'console\\.log\\(\\s*punkte\\s*\\)', label: 'Der Wert wird über die Variable ausgegeben' },
        { type: 'console', expected: '100', label: 'Die Konsole zeigt 100' },
      ],
    },
    {
      type: 'explain',
      text: 'Eine Kiste kann **Text** oder **Zahlen** enthalten – und der Browser behandelt beides verschieden:\n\n```js\nconst act = "Kiki Volt";   // Text – in Anführungszeichen\nconst alter = 17;           // Zahl – ohne\nconst preis = 12.5;         // Kommazahl – mit Punkt statt Komma\n```\n\nMit Zahlen kann der Browser rechnen. Text ist für ihn nur eine Zeichenkette, auch wenn Ziffern drinstehen: `"17"` ist Text, `17` eine Zahl. Das wird in der nächsten Lektion wichtig.',
    },
    {
      type: 'fill',
      text: 'Der Stadionname bleibt, die Zuschauerzahl ändert sich im Laufe des Abends. Vervollständige die beiden Anweisungen.',
      template: '___ stadion = "Neckararena";\n___ zuschauer = 0;',
      accept: [['const'], ['let']],
      hint: 'Was bleibt, ist konstant; was sich ändert, braucht das andere Schlüsselwort.',
    },
    {
      type: 'explain',
      text: 'Gute Namen sagen, was drin ist: `anzahlTickets` statt `x`. Regeln für Variablennamen:\n\n- Buchstaben und Ziffern, keine Leerzeichen, nicht mit einer Ziffer beginnen.\n- Mehrere Wörter im **camelCase**: erstes Wort klein, jedes weitere groß – `preisProTicket`, `lieblingsAct`.\n- **Groß- und Kleinschreibung zählt**: `Punkte` und `punkte` sind zwei verschiedene Variablen.\n\nSchreibst du den Namen später anders als beim Anlegen, meldet die Konsole: `punkte is not defined`.',
    },
    {
      type: 'code',
      task: '**Erstelle** für den Sneaker-Drop drei Variablen und je eine Konsolenausgabe: das Modell „Neon Runner“ (bleibt), die Größe 43 als Zahl (bleibt) und den Lagerbestand 12 (ändert sich) – Namen `modell`, `groesse`, `lagerbestand`.',
      starter: { js: '// Sneaker-Drop am Freitag\n' },
      hints: [
        'Zwei Werte bleiben, einer ändert sich – wähle const oder let entsprechend.',
        'Muster: `const farbe = "Schwarz";` für Text, `let paare = 5;` für eine Zahl, die sich ändert.',
        'Drei Anweisungen zum Anlegen, dann drei Zeilen console.log mit je einem Variablennamen.',
      ],
      solution: { js: '// Sneaker-Drop am Freitag\nconst modell = "Neon Runner";\nconst groesse = 43;\nlet lagerbestand = 12;\nconsole.log(modell);\nconsole.log(groesse);\nconsole.log(lagerbestand);\n' },
      tests: [
        { type: 'source', file: 'js', matches: 'const\\s+modell\\s*=\\s*["\']Neon Runner["\']', label: 'modell ist eine Konstante mit „Neon Runner“' },
        { type: 'source', file: 'js', matches: 'const\\s+groesse\\s*=\\s*43\\b', label: 'groesse ist eine Konstante mit der Zahl 43' },
        { type: 'source', file: 'js', matches: 'let\\s+lagerbestand\\s*=\\s*12\\b', label: 'lagerbestand ist veränderlich und startet bei 12' },
        { type: 'console', expected: 'Neon Runner', label: 'Die Konsole zeigt „Neon Runner“' },
        { type: 'console', expected: '43', label: 'Die Konsole zeigt 43' },
        { type: 'console', expected: '12', label: 'Die Konsole zeigt 12' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne zu.',
      pairs: [
        ['`const`', 'Variable, deren Wert bleibt'],
        ['`let`', 'Variable, deren Wert sich ändern darf'],
        ['`"43"`', 'ein Text (Zeichenkette)'],
        ['`43`', 'eine Zahl'],
        ['`anzahlTickets`', 'ein Name im camelCase'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** das Skript des Streaming-Profils: Es soll den Profilnamen und die Zahl der Abonnenten ausgeben, die Konsole meldet aber „is not defined“. Die Variablen sind richtig angelegt – die Fehler stecken in den Ausgaben.',
      starter: { js: '// Streaming-Profil\nconst profilName = "sam_2027";\nlet abonnenten = 128;\nconsole.log(profilname);\nconsole.log(abonenten);\n' },
      hints: [
        'Groß- und Kleinschreibung zählt: Vergleiche den Namen beim Anlegen mit dem Namen in der Ausgabe.',
        'Die Fehlermeldung nennt das Wort, das der Browser nicht kennt – suche genau dieses Wort im Skript.',
        'Beide Ausgaben brauchen exakt den Namen aus den Zeilen mit const und let.',
      ],
      solution: { js: '// Streaming-Profil\nconst profilName = "sam_2027";\nlet abonnenten = 128;\nconsole.log(profilName);\nconsole.log(abonnenten);\n' },
      tests: [
        { type: 'console', expected: 'sam_2027', label: 'Die Konsole zeigt „sam_2027“' },
        { type: 'console', expected: '128', label: 'Die Konsole zeigt 128' },
        { type: 'source', file: 'js', flags: '', matches: 'console\\.log\\(\\s*profilName\\s*\\)', label: 'Die Ausgabe benutzt den Namen profilName' },
        { type: 'source', file: 'js', flags: '', matches: 'console\\.log\\(\\s*abonnenten\\s*\\)', label: 'Die Ausgabe benutzt den Namen abonnenten' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Ab zur FUNKEN-Website! Das Skript bekommt seine ersten beiden Kisten: den Festivalnamen, der sich nie ändert, und einen Zähler für Reservierungen, der bei 0 startet – in Station 17 zählt er bei jedem Klick hoch.\n\nAchte auf die Schreibweise der Namen aus der Aufgabe (camelCase) und gib den Namen über die Variable aus, nicht als Text.',
    },
    { type: 'code', etappe: '16-javascript-start/02-variablen' },
  ],
});

/* ---------- Lektion 3: Rechnen und verbinden ---------- */
schreibe('lessons/03-rechnen-und-verbinden.json', {
  id: '03-rechnen-und-verbinden',
  title: 'Rechnen und verbinden',
  konzepte: ['js.operator', 'js.verkettung'],
  steps: [
    {
      type: 'explain',
      text: 'Vier Leute, je ein Döner für 6,50 € – wie viel zusammen? Solche Rechnungen erledigt JavaScript mit **Operatoren**:\n\n- `+` plus, `-` minus\n- `*` mal (der Stern, kein ×)\n- `/` geteilt (der Schrägstrich, kein ÷)\n\n```js\nconsole.log(6.5 * 4);   // 26\n```\n\nDas Ergebnis landet direkt in der Konsole – ohne Anführungszeichen, denn es ist eine Zahl.',
      figure: FIG_PLUS,
    },
    {
      type: 'explain',
      text: 'Meistens rechnest du mit Variablen – und JavaScript hält sich an **Punkt vor Strich**:\n\n```js\nconst tagesticket = 12;\nconst personen = 3;\nconsole.log(tagesticket * personen);        // 36\nconsole.log(tagesticket * personen + 5);    // 41\nconsole.log((tagesticket + 5) * personen);  // 51\n```\n\nKlammern gelten wie in Mathe. Das Ergebnis kannst du auch in eine neue Variable legen: `const summe = tagesticket * personen;`.',
    },
    {
      type: 'example',
      text: 'Der Taschenrechner der Werkstatt. **Ändere** die Zahlen, **tausche** die Operatoren und **setze** Klammern – die Konsole zeigt jedes Ergebnis sofort.',
      js: 'console.log(7 + 3);\nconsole.log(7 - 3);\nconsole.log(7 * 3);\nconsole.log(7 / 2);\nconsole.log(2 + 3 * 4);\n',
    },
    {
      type: 'quiz',
      question: 'Was zeigt die Konsole bei `console.log(20 - 4 * 2);`?',
      options: ['12', '32', '16'],
      correct: 0,
      explanation: 'Punkt vor Strich: erst `4 * 2` = 8, dann 20 − 8 = 12. Für 32 bräuchtest du Klammern: `(20 - 4) * 2`.',
    },
    {
      type: 'code',
      task: '**Erstelle** eine Konsolenausgabe mit den Gesamtpunkten aus beiden Leveln – berechnet aus den Variablen, nicht abgeschrieben.',
      starter: { js: '// Punktestand nach zwei Leveln\nconst level1 = 350;\nconst level2 = 420;\n' },
      hints: [
        'Plus verbindet die beiden Variablen zu einer Summe.',
        'Muster: `console.log(a + b);` – mit den Namen der beiden Variablen.',
        'Struktur: `console.log(… + …);` – in die Lücken kommen die Variablennamen, keine Zahlen.',
      ],
      solution: { js: '// Punktestand nach zwei Leveln\nconst level1 = 350;\nconst level2 = 420;\nconsole.log(level1 + level2);\n' },
      tests: [
        { type: 'console', expected: '770', label: 'Die Konsole zeigt 770' },
        { type: 'source', file: 'js', matches: 'level1\\s*\\+\\s*level2|level2\\s*\\+\\s*level1', label: 'Die Summe wird aus beiden Variablen berechnet' },
      ],
    },
    {
      type: 'explain',
      text: 'Jetzt das Aha: Das Plus macht bei **Text** etwas anderes als bei Zahlen.\n\n```js\nconsole.log(5 + 3);            // 8  – Zahl plus Zahl: rechnen\nconsole.log("5" + 3);          // 53 – Text plus Zahl: kleben\nconsole.log("Punkte: " + 8);   // Punkte: 8\n```\n\nSobald ein Text dabei ist, **verkettet** das Plus: Es hängt die Teile aneinander. Das ist kein Fehler, sondern das Werkzeug, um Sätze aus Text und Werten zu bauen – solange du weißt, was Text und was Zahl ist.',
    },
    {
      type: 'fill',
      text: 'Vier Bubble Teas zu 4,50 € – die Variablen `preis` (4.5) und `anzahl` (4) sind angelegt. Vervollständige die Ausgabe, damit die Konsole „Preis: 18“ zeigt.',
      template: 'console.log("Preis: " ___ preis ___ anzahl);',
      accept: [['+'], ['*']],
      hint: 'Verbinden ist das Plus, malnehmen der Stern – Punkt vor Strich sorgt für die richtige Reihenfolge.',
    },
    {
      type: 'explain',
      text: 'Mit Variablen baust du ganze Sätze – achte auf die **Leerzeichen** im Text:\n\n```js\nconst act = "Neonpuls";\nconst buehne = "Hauptbühne";\nconsole.log(act + " spielt auf der " + buehne);\n// Neonpuls spielt auf der Hauptbühne\n```\n\nRechnung und Text mischen geht auch: `"Preis: " + preis * anzahl` – erst mal (Punkt vor Strich), dann kleben. Und eine Zahl mitten im Satz? `"Noch " + tage + " Tage"` – funktioniert genauso.',
    },
    {
      type: 'code',
      task: '**Erstelle** eine Konsolenausgabe „Hallo Lena aus Heilbronn!“ – Vorname und Stadt kommen aus den Variablen, nicht aus dem Text.',
      starter: { js: '// Begrüßung in der Lern-App\nconst vorname = "Lena";\nconst stadt = "Heilbronn";\n' },
      hints: [
        'Drei Textstücke und zwei Variablen, alle mit Plus verbunden.',
        'Muster: `console.log("Hi " + name + "!");` – die Leerzeichen gehören in den Text.',
        'Struktur: `"Hallo " + … + " aus " + … + "!"` – in die Lücken kommen die Variablennamen.',
      ],
      solution: { js: '// Begrüßung in der Lern-App\nconst vorname = "Lena";\nconst stadt = "Heilbronn";\nconsole.log("Hallo " + vorname + " aus " + stadt + "!");\n' },
      tests: [
        { type: 'console', expected: 'Hallo Lena aus Heilbronn!', label: 'Die Konsole zeigt „Hallo Lena aus Heilbronn!“' },
        { type: 'source', file: 'js', matches: '\\+\\s*vorname\\s*\\+', label: 'Der Vorname kommt aus der Variablen' },
        { type: 'source', file: 'js', matches: '\\+\\s*stadt\\s*\\+', label: 'Die Stadt kommt aus der Variablen' },
        { type: 'source', file: 'js', matches: 'Hallo Lena', absent: true, label: 'Der Name steht nicht fest im Text' },
      ],
    },
    {
      type: 'pair',
      text: 'Was zeigt die Konsole? Ordne zu.',
      pairs: [
        ['`5 + 3`', '8'],
        ['`"5" + 3`', '53'],
        ['`10 / 4`', '2.5'],
        ['`"Tor " + 2`', 'Tor 2'],
        ['`2 + 3 * 4`', '14'],
      ],
    },
    {
      type: 'code',
      task: '**Erstelle** für die Bestellung eine Konsolenausgabe „Zu zahlen: 26 Euro“. Der Betrag wird aus Preis und Anzahl berechnet – die 26 darf nirgends im Skript stehen.',
      starter: { js: '// Bestellung an der Döner-Ecke\nconst preis = 6.5;\nconst anzahl = 4;\n' },
      hints: [
        'Text, Rechnung, Text – alles mit Plus verbunden; die Rechnung ist Preis mal Anzahl.',
        'Muster: `console.log("Summe: " + a * b + " Punkte");` – Punkt vor Strich rechnet erst, dann wird geklebt.',
        'Struktur: `"Zu zahlen: " + … * … + " Euro"` – die Variablennamen in die Lücken.',
      ],
      solution: { js: '// Bestellung an der Döner-Ecke\nconst preis = 6.5;\nconst anzahl = 4;\nconsole.log("Zu zahlen: " + preis * anzahl + " Euro");\n' },
      tests: [
        { type: 'console', expected: 'Zu zahlen: 26 Euro', label: 'Die Konsole zeigt „Zu zahlen: 26 Euro“' },
        { type: 'source', file: 'js', matches: 'preis\\s*\\*\\s*anzahl|anzahl\\s*\\*\\s*preis', label: 'Der Betrag wird mit mal berechnet' },
        { type: 'source', file: 'js', matches: '\\b26\\b', absent: true, label: 'Die 26 steht nicht im Skript' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Ab zur FUNKEN-Website! Drei Festivalpässe zu 20 € – das Skript rechnet die Summe aus und meldet sie als Satz in der Konsole. Zwei neue Konstanten, eine Ausgabe: Text plus Rechnung.\n\nSam wird fragen, ob wirklich gerechnet wird – also keine 60 hinschreiben. Später zeigt das Skript solche Summen direkt auf der Seite an.',
    },
    { type: 'code', etappe: '16-javascript-start/03-rechnen-und-verbinden' },
  ],
});

/* ---------- Lektion 4: Wiederholung ---------- */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      text: 'Kurz durchatmen: Diese Runde mischt den neuen Strom (Skript, Konsole, Variablen, Rechnen) mit der Sicherheitszentrale, dem Bühnen-Layout, dem Schriftzug und den Zonen der Seite. Am Ende bekommt das FUNKEN-Skript eine Einlass-Meldung.',
    },
    {
      type: 'quiz',
      question: 'Für die Festival-Seite findest du im Netz ein Foto ohne Lizenzangabe. Was gilt?',
      options: ['Es ist urheberrechtlich geschützt – ohne Erlaubnis darfst du es nicht verwenden', 'Alles im Netz darf frei genutzt werden, wenn du die Quelle nennst', 'Fotos sind nur geschützt, wenn ein ©-Zeichen dabeisteht'],
      correct: 0,
      explanation: 'Fotos sind automatisch geschützt, auch ohne ©-Zeichen. Nur mit Erlaubnis oder einer passenden Lizenz (z. B. CC BY mit Namensnennung) darfst du sie einbauen.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** das Punkte-Skript: Nach dem Bonus soll die Konsole „Punkte: 45“ zeigen, sie zeigt aber „Punkte: 405“. Eine Zeile ist schuld.',
      starter: { js: '// Punktestand mit Bonus\nconst punkte = "40";\nconst bonus = 5;\nconsole.log("Punkte: " + (punkte + bonus));\n' },
      hints: [
        'Schau auf die Werte: Was ist Text, was ist Zahl? Mit Text klebt das Plus, statt zu rechnen.',
        'Zahlen stehen ohne Anführungszeichen – wie in `const alter = 17;`.',
        'Nur die Zeile, die punkte anlegt, muss sich ändern.',
      ],
      solution: { js: '// Punktestand mit Bonus\nconst punkte = 40;\nconst bonus = 5;\nconsole.log("Punkte: " + (punkte + bonus));\n' },
      tests: [
        { type: 'console', expected: 'Punkte: 45', label: 'Die Konsole zeigt „Punkte: 45“' },
        { type: 'source', file: 'js', matches: 'const\\s+punkte\\s*=\\s*40\\s*;', label: 'punkte ist eine Zahl, kein Text' },
      ],
    },
    {
      type: 'pair',
      text: 'Bühnen-Layout: Ordne die Flexbox-Eigenschaften ihrer Wirkung zu.',
      pairs: [
        ['`display: flex;`', 'Kinder stehen nebeneinander in einer Reihe'],
        ['`justify-content: center;`', 'verteilt die Kinder in der Mitte der Zeile'],
        ['`flex-wrap: wrap;`', 'bricht in die nächste Zeile um, wenn der Platz fehlt'],
        ['`gap: 16px;`', '16 Pixel Abstand zwischen den Kindern'],
        ['`flex-direction: column;`', 'Kinder untereinander statt nebeneinander'],
      ],
    },
    {
      type: 'fill',
      text: 'Schriftzug: Die Hauptüberschrift soll 48 Pixel groß und zentriert sein. Vervollständige die Regel.',
      template: 'h1 {\n  font-size: ___px;\n  text-align: ___;\n}',
      accept: [['48'], ['center']],
      hint: 'Die Größe als Zahl vor px, die Ausrichtung als englisches Wort für „Mitte“.',
    },
    {
      type: 'order',
      text: 'Zonen: Bring den body in die übliche Reihenfolge – Kopfbereich, Navigation, Hauptbereich, Fußbereich, zuletzt das Skript.',
      lines: ['<body>', '  <header><h1>Foodtruck-Fest</h1></header>', '  <nav><a href="menu.html">Menü</a></nav>', '  <main><p>Vier Trucks, ein Abend.</p></main>', '  <footer><p>Truck-Kollektiv</p></footer>', '  <script src="script.js"></script>', '</body>'],
      explanation: 'header, nav, main, footer – und das Skript als letztes Element im body.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Navigation der Foodtruck-Seite: Die Links stehen nebeneinander mit 12 Pixel Abstand, sind in der Mitte der Zeile verteilt und haben keine Unterstreichung.',
      starter: {
        html: '<nav>\n  <a href="menu.html">Menü</a>\n  <a href="trucks.html">Trucks</a>\n  <a href="anfahrt.html">Anfahrt</a>\n</nav>\n',
        css: '/* Navigation */\nnav {\n\n}\n',
      },
      editable: ['css'],
      hints: [
        'Nebeneinander heißt: nav wird ein Flex-Container. Für die Links brauchst du eine zweite Regel mit Nachfahren-Selektor.',
        'Muster aus dem Bühnen-Layout: `display: flex; gap: 8px; justify-content: space-between;` – hier mit anderen Werten.',
        'Zweite Regel: `nav a { … }` mit der Eigenschaft, die die Unterstreichung ausschaltet (Wert none).',
      ],
      solution: {
        css: '/* Navigation */\nnav {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n\nnav a {\n  text-decoration: none;\n}\n',
      },
      tests: [
        { type: 'style', selector: 'nav', prop: 'display', expected: 'flex', label: 'Die Links stehen nebeneinander (Flex-Container)' },
        { type: 'style', selector: 'nav', prop: 'column-gap', expected: '12px', label: '12 Pixel Abstand zwischen den Links' },
        { type: 'style', selector: 'nav', prop: 'justify-content', expected: 'center', label: 'Die Links sind in der Mitte verteilt' },
        { type: 'style', selector: 'nav a', prop: 'text-decoration-line', expected: 'none', label: 'Die Links sind nicht unterstrichen' },
      ],
    },
    {
      type: 'quiz',
      question: 'Was zeigt die Konsole bei `console.log("3" + 4);`?',
      options: ['34', '7', 'Eine Fehlermeldung'],
      correct: 0,
      explanation: '„3“ steht in Anführungszeichen und ist Text – das Plus klebt: 34. Ohne Anführungszeichen wäre es 7.',
    },
    {
      type: 'bug',
      text: 'Fehlerjagd: Die Konsole meldet „Stadt is not defined“. Welche Zeile ist schuld?',
      lines: ['const stadt = "Heilbronn";', 'let besucher = 1200;', 'console.log(Stadt);', 'console.log(besucher);'],
      line: 2,
      explanation: 'Groß- und Kleinschreibung zählt: Die Variable heißt `stadt`, nicht `Stadt`.',
    },
    {
      type: 'explain',
      text: 'Ab zur FUNKEN-Website! Das Skript soll den Einlass melden: Der Festivalname kommt aus der vorhandenen Variablen, die Einlasszeit aus einer neuen Konstante, dazwischen ein Textstück mit Gedankenstrich.\n\nDrei Teile, zwei Pluszeichen – und achte auf die Leerzeichen am Rand des Textstücks, sonst kleben die Wörter zusammen.',
    },
    { type: 'code', etappe: '16-javascript-start/04-wiederholung' },
  ],
});

/* ---------- Lektion 5: Projekt ---------- */
schreibe('lessons/05-projekt-erstes-skript.json', {
  id: '05-projekt-erstes-skript',
  title: 'Projekt: Erstes Skript',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Meilenstein Stromkasten! Rückblick: Die Startseite bindet script.js ein, das Skript kennt Variablen mit Text und Zahlen, rechnet mit ihnen und baut Sätze aus Text und Werten. Alles landet noch in der Konsole – ab Station 17 auf der Seite selbst.\n\nZum Abschluss meldet das Skript, wie lange FUNKEN dauert: Name, Text, Zahl, Text – vier Teile, drei Pluszeichen.',
    },
    {
      type: 'quiz',
      question: 'Die Variable `tage` enthält die Zahl 2. Welche Zeile ergibt in der Konsole „Noch 2 Tage“?',
      options: ['`console.log("Noch " + tage + " Tage");`', '`console.log("Noch tage Tage");`', '`console.log(Noch + tage + Tage);`'],
      correct: 0,
      explanation: 'Der Variablenname steht ohne Anführungszeichen zwischen den Textstücken; die Leerzeichen gehören in den Text.',
    },
    {
      type: 'order',
      text: 'Sortiere die Zeilen der Fahrschul-Seite: das Grundgerüst in der richtigen Reihenfolge, das Skript zuletzt im body.',
      lines: ['<!DOCTYPE html>', '<html lang="de">', '  <head><title>Fahrschule Blitz</title></head>', '  <body>', '    <h1>Fahrschule Blitz</h1>', '    <script src="script.js"></script>', '  </body>', '</html>'],
      explanation: 'Dokumenttyp, html, head, body – und im body das Skript als letztes Element.',
    },
    {
      type: 'explain',
      text: 'Jetzt die Etappe – und danach lohnt sich der Klick auf **FUNKEN-Website ansehen**: Neben index.html und style.css liegt dort jetzt dein script.js. Von außen sieht man noch nichts, doch die Konsole des Browsers zeigt schon jede Meldung.\n\nDer Stromkasten ist angeschlossen – gleich nimmt Sam die Station ab.',
    },
    { type: 'code', etappe: '16-javascript-start/05-projekt-erstes-skript' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: KAPITEL,
  fragen: [
    { id: '16-01', konzept: 'js.script', type: 'quiz', question: 'Wo steht das script-Element, das script.js einbindet, am besten?', options: ['Am Ende des body, direkt vor dem schließenden body-Tag', 'Ganz oben im head vor dem Titel', 'Außerhalb von html, ganz unten in der Datei'], correct: 0, explanation: 'Am Ende des body ist die Seite schon komplett geladen, wenn das Skript läuft.' },
    { id: '16-02', konzept: 'js.script', type: 'fill', text: 'Vervollständige das Einbinden der Datei script.js.', template: '<script ___="script.js"></script>', accept: ['src'], hint: 'Dasselbe Attribut wie beim Bild: Es nennt die Quelle.' },
    { id: '16-03', konzept: 'js.script', type: 'bug', text: 'Eine Zeile bindet das Skript falsch ein. Welche?', lines: ['<p>Bis bald!</p>', '<script href="script.js"></script>', '</body>', '</html>'], line: 1, explanation: 'Das script-Element nutzt `src`, nicht `href` – href ist für Links und Stylesheets.' },
    { id: '16-04', konzept: 'js.script', type: 'order', text: 'Sortiere: Überschrift, Absatz – und das Skript ganz ans Ende des body.', lines: ['<body>', '  <h1>Sneaker-Drop</h1>', '  <p>Freitag, 10 Uhr</p>', '  <script src="script.js"></script>', '</body>'] },
    { id: '16-05', konzept: 'js.console', type: 'quiz', question: 'Wer sieht die Ausgaben von console.log?', options: ['Nur wer die Konsole der Entwicklerwerkzeuge öffnet', 'Alle Besucher der Seite, direkt im Text', 'Niemand – die Ausgabe wird sofort gelöscht'], correct: 0, explanation: 'Die Konsole ist ein Werkzeug für Entwickler. Besucher sehen sie nur, wenn sie die Entwicklerwerkzeuge öffnen.' },
    { id: '16-06', konzept: 'js.console', type: 'fill', text: 'Vervollständige die Konsolenausgabe.', template: 'console.___("Halbzeit");', accept: ['log'], hint: 'Der Befehl zum Schreiben in die Konsole, drei Buchstaben.' },
    { id: '16-07', konzept: 'js.console', type: 'bug', text: 'Eine Zeile führt zu einer roten Fehlermeldung. Welche?', lines: ['// Spielstart', 'console.log("Anpfiff");', 'console.log(Tor für Heilbronn);', 'console.log("Halbzeit");'], line: 2, explanation: 'Text braucht Anführungszeichen – ohne sie hält der Browser die Wörter für Befehle.' },
    { id: '16-08', konzept: 'js.variable', type: 'quiz', question: 'Der Preis eines Tickets bleibt den ganzen Abend gleich. Womit legst du die Variable an?', options: ['`const`', '`let`', 'Mit Anführungszeichen'], correct: 0, explanation: 'Werte, die bleiben, bekommen `const`. `let` ist für Werte, die sich ändern.' },
    { id: '16-09', konzept: 'js.variable', type: 'pair', text: 'Ordne zu.', pairs: [['`const`', 'Wert bleibt'], ['`let`', 'Wert darf sich ändern'], ['`=`', 'legt den Wert in die Variable'], ['`//`', 'beginnt einen Kommentar']] },
    { id: '16-10', konzept: 'js.variable', type: 'bug', text: 'Die Konsole meldet „pukte is not defined“. Welche Zeile ist falsch?', lines: ['let punkte = 0;', 'const bonus = 10;', 'console.log(pukte);', 'console.log(bonus);'], line: 2, explanation: 'Tippfehler: Die Variable heißt `punkte` – der Name muss überall gleich geschrieben sein.' },
    { id: '16-11', konzept: 'js.datentyp', type: 'quiz', question: 'Welcher Wert ist eine **Zahl**, mit der JavaScript rechnen kann?', options: ['`17`', '`"17"`', '`"siebzehn"`'], correct: 0, explanation: 'Ohne Anführungszeichen ist es eine Zahl. `"17"` ist Text, auch wenn Ziffern drinstehen.' },
    { id: '16-12', konzept: 'js.datentyp', type: 'pair', text: 'Text oder Zahl? Ordne zu.', pairs: [['`"12"`', 'Text – obwohl Ziffern drinstehen'], ['`12`', 'ganze Zahl'], ['`12.5`', 'Kommazahl (Punkt statt Komma)'], ['`"Neonpuls"`', 'Text aus Buchstaben']] },
    { id: '16-13', konzept: 'js.datentyp', type: 'bug', text: 'Das Skript soll 20 ausgeben, zeigt aber 173. Welche Zeile ist schuld?', lines: ['const alter = "17";', 'const inJahren = 3;', 'console.log(alter + inJahren);'], line: 0, explanation: '„17“ in Anführungszeichen ist Text – das Plus klebt statt zu rechnen. Ohne Anführungszeichen wird gerechnet.' },
    { id: '16-14', konzept: 'js.operator', type: 'quiz', question: 'Was zeigt `console.log(2 + 3 * 4);`?', options: ['14', '20', '24'], correct: 0, explanation: 'Punkt vor Strich: erst `3 * 4` = 12, dann 2 + 12 = 14.' },
    { id: '16-15', konzept: 'js.operator', type: 'fill', text: 'Der Gesamtpreis ist Preis mal Anzahl. Vervollständige.', template: 'const gesamt = preis ___ anzahl;', accept: ['*'], hint: 'Malnehmen ist in JavaScript der Stern.' },
    { id: '16-16', konzept: 'js.operator', type: 'pair', text: 'Ordne die Operatoren zu.', pairs: [['`+`', 'plus'], ['`-`', 'minus'], ['`*`', 'mal'], ['`/`', 'geteilt durch']] },
    { id: '16-17', konzept: 'js.verkettung', type: 'quiz', question: 'Was zeigt `console.log("5" + 3);`?', options: ['53', '8', 'Eine Fehlermeldung'], correct: 0, explanation: 'Sobald ein Text dabei ist, klebt das Plus: „5“ und 3 werden zu 53.' },
    { id: '16-18', konzept: 'js.verkettung', type: 'fill', text: 'Die Variable `name` enthält „Sam“. Vervollständige die Ausgabe, damit „Hallo Sam“ erscheint.', template: 'console.log("Hallo " ___ name);', accept: ['+'], hint: 'Text und Variable verbindet dasselbe Zeichen, mit dem du auch addierst.' },
    { id: '16-19', konzept: 'js.verkettung', type: 'bug', text: 'Die Konsole zeigt „Noch tage Tage“ statt „Noch 2 Tage“. Welche Zeile ist schuld?', lines: ['const tage = 2;', 'console.log("Noch tage Tage");', 'console.log("Bis bald!");'], line: 1, explanation: 'Der Variablenname steht in den Anführungszeichen und ist damit nur Text. Er muss mit Plus zwischen die Textstücke: `"Noch " + tage + " Tage"`.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: KAPITEL,
  title: 'Abnahme: Stromkasten',
  intro: 'Strom! Ich hab die Konsole aufgemacht, und da stand wirklich „FUNKEN – Startseite geladen“. Zeig mir, dass das kein Zufall war – und dass ihr wirklich rechnet, statt nur Zahlen hinzutippen.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'js.script', type: 'quiz', question: 'Warum bindet die FUNKEN-Startseite script.js erst am Ende des body ein?', options: ['Damit alle Elemente der Seite schon da sind, wenn das Skript läuft', 'Weil der Browser Skripte im head ignoriert', 'Damit das Stylesheet zuerst geladen wird'], correct: 0, explanation: 'Der Browser liest von oben nach unten – am Ende des body ist die Seite komplett.' },
    { konzept: 'recht.impressum', type: 'quiz', question: 'Was muss im Impressum der FUNKEN-Website stehen?', options: ['Name und Anschrift der Verantwortlichen sowie eine Kontaktmöglichkeit', 'Die Namen aller Acts', 'Nur eine E-Mail-Adresse, alles andere ist freiwillig'], correct: 0, explanation: 'Ein Impressum nennt, wer für die Seite verantwortlich ist: Name, Anschrift und Kontakt.' },
    {
      type: 'code',
      task: '**Erstelle** eine Konsolenausgabe „Gesamt: 48 Euro“ für vier Tagestickets – der Betrag wird aus den Variablen berechnet, die 48 steht nirgends im Skript.',
      starter: { js: '// Ticketkauf\nconst preisTicket = 12;\nconst anzahl = 4;\n' },
      solution: { js: '// Ticketkauf\nconst preisTicket = 12;\nconst anzahl = 4;\nconsole.log("Gesamt: " + preisTicket * anzahl + " Euro");\n' },
      tests: [
        { type: 'console', expected: 'Gesamt: 48 Euro', label: 'Die Konsole zeigt „Gesamt: 48 Euro“' },
        { type: 'source', file: 'js', matches: 'preisTicket\\s*\\*\\s*anzahl|anzahl\\s*\\*\\s*preisTicket', label: 'Der Betrag wird aus Preis und Anzahl berechnet' },
        { type: 'source', file: 'js', matches: '\\b48\\b', absent: true, label: 'Die 48 steht nicht im Skript' },
      ],
    },
    { konzept: 'css.flex', type: 'pair', text: 'Ordne die Flexbox-Eigenschaften ihrer Wirkung zu.', pairs: [['`display: flex;`', 'macht ein Element zum Flex-Container'], ['`gap: 16px;`', 'Abstand zwischen den Kindern'], ['`justify-content: center;`', 'verteilt die Kinder in der Mitte'], ['`flex-wrap: wrap;`', 'erlaubt den Umbruch in die nächste Zeile']] },
    { konzept: 'js.variable', type: 'fill', text: 'Der Profilname bleibt, die Likes ändern sich. Vervollständige.', template: '___ profil = "sam_2027";\n___ likes = 0;', accept: [['const'], ['let']] },
    { konzept: 'html.semantik', type: 'bug', text: 'Die Zonen der Startseite: Eine Zeile ist fehlerhaft. Welche?', lines: ['<header>', '  <h1>FUNKEN</h1>', '</heder>', '<main>'], line: 2, explanation: 'Der schließende Tag muss genauso heißen wie der öffnende: `</header>`.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** das Ticket-Skript: Es soll „FUNKEN: 350 Tickets verkauft“ und „Vorverkauf läuft“ ausgeben, die Konsole zeigt aber nur eine rote Fehlermeldung. Zwei Zeilen sind fehlerhaft.',
      starter: { js: '// Ticket-Zähler\nconst veranstaltung = "FUNKEN";\nlet verkauft = 350;\nconsole.log(Veranstaltung + ": " + verkauft + " Tickets verkauft");\nconsole.log(Vorverkauf läuft);\n' },
      solution: { js: '// Ticket-Zähler\nconst veranstaltung = "FUNKEN";\nlet verkauft = 350;\nconsole.log(veranstaltung + ": " + verkauft + " Tickets verkauft");\nconsole.log("Vorverkauf läuft");\n' },
      tests: [
        { type: 'console', expected: 'FUNKEN: 350 Tickets verkauft', label: 'Die Konsole zeigt „FUNKEN: 350 Tickets verkauft“' },
        { type: 'console', expected: 'Vorverkauf läuft', label: 'Die Konsole zeigt „Vorverkauf läuft“' },
        { type: 'source', file: 'js', flags: '', matches: 'console\\.log\\(\\s*veranstaltung\\s*\\+', label: 'Die Ausgabe nutzt die Variable veranstaltung' },
      ],
    },
    { konzept: 'css.font-size', type: 'quiz', question: 'Mit welcher Eigenschaft machst du die Zwischenüberschriften 28 Pixel groß?', options: ['`font-size`', '`font-family`', '`line-height`'], correct: 0, explanation: '`font-size` ist die Schriftgröße. `font-family` wählt die Schriftart, `line-height` den Zeilenabstand.' },
    { konzept: 'js.datentyp', type: 'quiz', question: 'Was zeigt `console.log("7" + 1);`?', options: ['71', '8', 'Eine Fehlermeldung'], correct: 0, explanation: '„7“ ist Text – das Plus klebt die 1 dahinter: 71.' },
    { konzept: 'js.verkettung', type: 'fill', text: 'Die Variable `team` enthält „Heilbronn“. Vervollständige die Ausgabe, damit „Tor für Heilbronn“ erscheint.', template: 'console.log("Tor für " ___ team);', accept: ['+'] },
    { konzept: 'js.script', type: 'order', text: 'Sortiere die Zeilen: Überschrift, Absatz, das Skript zuletzt im body.', lines: ['<body>', '  <h1>Fahrschule Blitz</h1>', '  <p>Nächster Kurs im August.</p>', '  <script src="script.js"></script>', '</body>'] },
  ],
});
console.log('Kapitel 16 geschrieben');
