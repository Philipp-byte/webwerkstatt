// Kapitel 17 – JavaScript & die Seite (Station „Schaltpult“).
// Erzeugt public/content/chapters/17-javascript-dom/{lessons/*.json,pool.json,boss.json}
// „Wenig JavaScript“: getElementById, textContent, addEventListener("click", function () {…}),
// Zähler mit let-Variable + 1, classList.toggle/add/remove – keine if, keine Schleifen.
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '17-javascript-dom');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken (Inline-SVG, 320×160) ---------- */

// DOM-Baum: document → body → h1 / p#status / button; JavaScript greift per id auf den Absatz zu
const FIG_DOM = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="80" y="26" text-anchor="middle" fill="#b48cff" font-weight="bold">document</text><path d="M80 32 V52 M80 70 V84 M80 84 H28 V96 M80 84 V96 M80 84 H134 V96" stroke="#eef2ff" stroke-width="1.5" fill="none"/><text x="80" y="66" text-anchor="middle" fill="#ff7a45" font-weight="bold">body</text><text x="28" y="112" text-anchor="middle" fill="#ff7a45">h1</text><text x="80" y="112" text-anchor="middle" fill="#ff7a45">p</text><text x="80" y="130" text-anchor="middle" fill="#4ade80" font-size="11">id="status"</text><text x="134" y="112" text-anchor="middle" fill="#ff7a45">button</text><rect x="178" y="48" width="130" height="62" rx="8" fill="#ffd84d" fill-opacity="0.12" stroke="#ffd84d" stroke-width="2"/><text x="243" y="68" text-anchor="middle" fill="#ffd84d" font-weight="bold">JavaScript</text><text x="243" y="86" text-anchor="middle" fill="#eef2ff" font-family="monospace" font-size="11">getElementById</text><text x="243" y="101" text-anchor="middle" fill="#eef2ff" font-family="monospace" font-size="11">("status")</text><path d="M178 92 L98 110" stroke="#ffd84d" stroke-width="2" fill="none" marker-end="url(#pf)"/><text x="160" y="150" text-anchor="middle" fill="#eef2ff">Der Browser baut aus HTML einen Baum – das DOM</text><defs><marker id="pf" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker></defs></svg>`;

// Ereignis → Zuhörer → Reaktion
const FIG_EVENT = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="30" text-anchor="middle" fill="#eef2ff" font-weight="bold">Ereignis → Zuhörer → Reaktion</text><rect x="12" y="58" width="82" height="52" rx="8" fill="#ff7a45" fill-opacity="0.15" stroke="#ff7a45" stroke-width="2"/><text x="53" y="80" text-anchor="middle" fill="#ff7a45" font-weight="bold">Knopf</text><text x="53" y="98" text-anchor="middle" fill="#eef2ff" font-family="monospace" font-size="11">&lt;button&gt;</text><path d="M96 84 H118" stroke="#ffd84d" stroke-width="2" marker-end="url(#pe)"/><text x="108" y="128" text-anchor="middle" fill="#ffd84d">Klick</text><rect x="122" y="58" width="96" height="52" rx="8" fill="#ffd84d" fill-opacity="0.12" stroke="#ffd84d" stroke-width="2"/><text x="170" y="80" text-anchor="middle" fill="#ffd84d" font-weight="bold">Zuhörer</text><text x="170" y="98" text-anchor="middle" fill="#eef2ff" font-family="monospace" font-size="11">"click"</text><path d="M220 84 H242" stroke="#4ade80" stroke-width="2" marker-end="url(#pg)"/><rect x="246" y="58" width="62" height="52" rx="8" fill="#4ade80" fill-opacity="0.15" stroke="#4ade80" stroke-width="2"/><text x="277" y="80" text-anchor="middle" fill="#4ade80" font-weight="bold">Funktion</text><text x="277" y="98" text-anchor="middle" fill="#eef2ff" font-size="11">Text ändern</text><text x="160" y="150" text-anchor="middle" fill="#eef2ff">läuft bei jedem Klick – nicht beim Laden</text><defs><marker id="pe" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker><marker id="pg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#4ade80"/></marker></defs></svg>`;

// Zähler: jeder Klick erhöht die Variable, die Anzeige zeigt den neuen Stand
const FIG_ZAEHLER = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="28" text-anchor="middle" fill="#ffd84d" font-family="monospace" font-size="13">zaehler = zaehler + 1</text><rect x="24" y="56" width="56" height="48" rx="8" fill="#ffd84d" fill-opacity="0.12" stroke="#ffd84d" stroke-width="2"/><text x="52" y="88" text-anchor="middle" fill="#eef2ff" font-size="22" font-weight="bold">0</text><path d="M84 80 H126" stroke="#ff7a45" stroke-width="2" marker-end="url(#pz)"/><text x="105" y="72" text-anchor="middle" fill="#ff7a45" font-size="11">Klick</text><rect x="132" y="56" width="56" height="48" rx="8" fill="#ffd84d" fill-opacity="0.12" stroke="#ffd84d" stroke-width="2"/><text x="160" y="88" text-anchor="middle" fill="#eef2ff" font-size="22" font-weight="bold">1</text><path d="M192 80 H234" stroke="#ff7a45" stroke-width="2" marker-end="url(#pz)"/><text x="213" y="72" text-anchor="middle" fill="#ff7a45" font-size="11">Klick</text><rect x="240" y="56" width="56" height="48" rx="8" fill="#4ade80" fill-opacity="0.15" stroke="#4ade80" stroke-width="2"/><text x="268" y="88" text-anchor="middle" fill="#eef2ff" font-size="22" font-weight="bold">2</text><text x="160" y="128" text-anchor="middle" fill="#eef2ff">let zaehler steht außerhalb der Funktion</text><text x="160" y="148" text-anchor="middle" fill="#4ade80">anzeige.textContent = zaehler</text><defs><marker id="pz" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ff7a45"/></marker></defs></svg>`;

// Klassen schalten: JS schaltet die Klasse, CSS gestaltet
const FIG_CLASSLIST = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="26" text-anchor="middle" fill="#eef2ff" font-weight="bold">JS schaltet – CSS gestaltet</text><rect x="10" y="48" width="98" height="52" rx="8" fill="#ffd84d" fill-opacity="0.12" stroke="#ffd84d" stroke-width="2"/><text x="59" y="68" text-anchor="middle" fill="#ffd84d" font-weight="bold">script.js</text><text x="59" y="88" text-anchor="middle" fill="#eef2ff" font-family="monospace" font-size="10">toggle("nacht")</text><path d="M110 74 H130" stroke="#eef2ff" stroke-width="2" marker-end="url(#pk)"/><rect x="134" y="48" width="98" height="52" rx="8" fill="#ff7a45" fill-opacity="0.15" stroke="#ff7a45" stroke-width="2"/><text x="183" y="68" text-anchor="middle" fill="#ff7a45" font-weight="bold">index.html</text><text x="183" y="88" text-anchor="middle" fill="#eef2ff" font-family="monospace" font-size="10">body class="nacht"</text><path d="M234 74 H254" stroke="#eef2ff" stroke-width="2" marker-end="url(#pk)"/><rect x="258" y="48" width="54" height="52" rx="8" fill="#38c7ff" fill-opacity="0.15" stroke="#38c7ff" stroke-width="2"/><text x="285" y="68" text-anchor="middle" fill="#38c7ff" font-weight="bold">CSS</text><text x="285" y="88" text-anchor="middle" fill="#eef2ff" font-family="monospace" font-size="10">.nacht {}</text><rect x="96" y="116" width="56" height="32" rx="4" fill="#e8ecf7"/><text x="124" y="137" text-anchor="middle" fill="#0f1320" font-size="11">hell</text><text x="160" y="137" text-anchor="middle" fill="#eef2ff" font-size="14">⇄</text><rect x="168" y="116" width="56" height="32" rx="4" fill="#0f1320" stroke="#e8ecf7"/><text x="196" y="137" text-anchor="middle" fill="#eef2ff" font-size="11">dunkel</text><defs><marker id="pk" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#eef2ff"/></marker></defs></svg>`;

/* ---------- Lektion 1: Elemente ändern ---------- */
schreibe('lessons/01-elemente-aendern.json', {
  id: '01-elemente-aendern',
  title: 'Elemente ändern',
  konzepte: ['js.getElementById', 'js.textContent'],
  steps: [
    {
      type: 'explain',
      text: 'Ein Like-Zähler in einer App springt um eins hoch – ohne dass die Seite neu lädt. Dahinter steckt JavaScript, das die Seite **verändert**.\n\nDer Browser baut aus deinem HTML einen Baum aus Elementen: das **DOM** (Document Object Model). JavaScript erreicht diesen Baum über `document` – und kann jedes Element darin anfassen: lesen, ändern, umschalten.',
      figure: FIG_DOM,
    },
    {
      type: 'explain',
      text: 'Zwei Schritte, immer gleich:\n\n1. **Finden:** `document.getElementById("…")` liefert das Element mit dieser id. Speichere es in einer Konstante.\n2. **Ändern:** Die Eigenschaft **textContent** ist der sichtbare Text des Elements – du kannst sie neu setzen.\n\n```js\nconst preis = document.getElementById("preis");\npreis.textContent = "Nur 89 €";\n```\n\nDie id steht in Anführungszeichen, genau wie im HTML geschrieben – ohne `#`.',
    },
    {
      type: 'example',
      text: 'Probier es aus: **Ändere** den Text in den Anführungszeichen und schau in die Vorschau. Dann **ändere** die id im Skript zu `stand2` – und wirf einen Blick in die Konsole.',
      html: '<h2>Fußball-Turnier</h2>\n<p>Spielstand: <span id="stand">0 : 0</span></p>\n',
      js: 'const stand = document.getElementById("stand");\nstand.textContent = "2 : 1";\n',
    },
    {
      type: 'quiz',
      question: 'Im HTML steht `<p id="preis">12 €</p>`. Welche Zeile findet dieses Element?',
      options: ['`document.getElementById("preis")`', '`document.getElementById("#preis")`', '`document.getElementById(preis)`', '`document.getElementById("p")`'],
      correct: 0,
      explanation: 'In die Klammern kommt die id als Text in Anführungszeichen – ohne Raute und ohne Tag-Namen. Ohne Anführungszeichen würde JavaScript nach einer Variablen `preis` suchen.',
    },
    {
      type: 'code',
      task: '**Ändere** per Skript den Text des Absatzes mit der id `status`: Nach dem Laden soll dort „Deine Pizza ist unterwegs“ stehen.',
      starter: {
        html: '<h1>Pizza-Express</h1>\n<p id="status">Bestellung eingegangen</p>\n',
        js: '// Element finden, Text setzen\n',
      },
      editable: ['js'],
      hints: [
        'Erst das Element über seine id holen, dann seinen Text setzen.',
        'Das Muster aus einem anderen Kontext: `const feld = document.getElementById("feld");` – nur mit der id aus der Aufgabe.',
        'Zweite Zeile: `feld.textContent = "…";` mit dem Text aus der Aufgabe.',
      ],
      solution: {
        js: 'const status = document.getElementById("status");\nstatus.textContent = "Deine Pizza ist unterwegs";\n',
      },
      tests: [
        { type: 'text', selector: '#status', expected: 'Deine Pizza ist unterwegs', label: 'Der Status lautet „Deine Pizza ist unterwegs“' },
        { type: 'source', file: 'js', matches: 'getElementById\\(\\s*["\']status["\']\\s*\\)', label: 'Das Skript sucht das Element mit der id status' },
        { type: 'source', file: 'js', matches: '\\.textContent\\s*=', label: 'Der Text wird über textContent gesetzt' },
      ],
    },
    {
      type: 'explain',
      text: '**textContent** kannst du auch lesen – und mit Texten aus Station 16 zusammensetzen:\n\n```js\nconst schild = document.getElementById("preis");\nconsole.log(schild.textContent);\nconst preis = 89;\nschild.textContent = "Nur " + preis + " €";\n```\n\nWichtig ist die **Reihenfolge**: Das Skript kann nur finden, was der Browser schon gebaut hat. Deshalb steht `<script src="script.js">` ganz am Ende des body – erst die Elemente, dann das Skript.',
    },
    {
      type: 'fill',
      text: 'Vervollständige das Skript: Die Überschrift mit der id `titel` soll „Neuer Drop“ anzeigen. Achte auf Groß- und Kleinschreibung.',
      template: 'const titel = document.___("titel");\ntitel.___ = "Neuer Drop";',
      accept: [['getElementById'], ['textContent']],
      exact: true,
      hint: 'Zwei Wörter mit Großbuchstaben mittendrin: get…By… und text…',
    },
    {
      type: 'code',
      task: '**Erweitere** das Skript: Der Absatz mit der id `schild` zeigt „Nur 89 €“ – die Zahl stammt aus der Variablen `preis`, nicht aus dem Text.',
      starter: {
        html: '<h2>Sneaker der Woche</h2>\n<p id="schild">Preis wird geladen …</p>\n',
        js: 'const preis = 89;\n// Preis anzeigen\n',
      },
      editable: ['js'],
      hints: [
        'Element holen, dann textContent setzen – wie in der Grundübung.',
        'Text und Zahl verbindest du mit Plus, z. B. `"Noch " + tage + " Tage"`.',
        'Struktur: `….textContent = "Nur " + … + " €";`',
      ],
      solution: {
        js: 'const preis = 89;\nconst schild = document.getElementById("schild");\nschild.textContent = "Nur " + preis + " €";\n',
      },
      tests: [
        { type: 'text', selector: '#schild', expected: 'Nur 89 €', label: 'Das Schild zeigt „Nur 89 €“' },
        { type: 'source', file: 'js', matches: '\\+\\s*preis\\s*\\+', label: 'Die Zahl kommt aus der Variablen preis' },
        { type: 'source', file: 'js', matches: 'getElementById\\(\\s*["\']schild["\']\\s*\\)', label: 'Das Skript sucht das Element mit der id schild' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Bausteine ihrer Bedeutung zu.',
      pairs: [
        ['`document`', 'die ganze Seite – der Einstieg in den DOM-Baum'],
        ['`getElementById("…")`', 'findet das Element mit dieser id'],
        ['`textContent`', 'der sichtbare Text eines Elements'],
        ['`const feld = …`', 'speichert das gefundene Element unter einem Namen'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: 'Die Seite zeigt weiter „Serie wird geladen …“, und die Konsole meldet einen Fehler. **Überprüfe** das Skript und behebe die Fehler: Die Überschrift soll „Staffel 3 ist da“ zeigen, der Absatz „Jetzt streamen“.',
      starter: {
        html: '<h2 id="serie">Serie wird geladen …</h2>\n<p id="hinweis">Bitte warten.</p>\n',
        js: 'const serie = document.getElementById("Serie");\nserie.textContent = "Staffel 3 ist da";\nconst hinweis = document.getElementByID("hinweis");\nhinweis.textContent = "Jetzt streamen";\n',
      },
      editable: ['js'],
      hints: [
        'JavaScript unterscheidet Groß- und Kleinschreibung – bei ids und bei Befehlen.',
        'Vergleiche jede id im Skript Buchstabe für Buchstabe mit dem HTML.',
        'Der Befehl heißt getElementById – schau dir sein Ende genau an.',
      ],
      solution: {
        js: 'const serie = document.getElementById("serie");\nserie.textContent = "Staffel 3 ist da";\nconst hinweis = document.getElementById("hinweis");\nhinweis.textContent = "Jetzt streamen";\n',
      },
      tests: [
        { type: 'text', selector: '#serie', expected: 'Staffel 3 ist da', label: 'Die Überschrift lautet „Staffel 3 ist da“' },
        { type: 'text', selector: '#hinweis', expected: 'Jetzt streamen', label: 'Der Absatz lautet „Jetzt streamen“' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Jetzt zur FUNKEN-Startseite. Sam will ganz oben eine **Status-Zeile**: Solange die Seite lädt, steht dort ein Platzhalter – und das Skript ersetzt ihn sofort durch „Vorverkauf läuft!“.\n\nDu brauchst einen Absatz mit id im Hauptbereich und zwei Schritte im Skript: finden, Text setzen. Das Skript steht schon am Ende des body – die Reihenfolge stimmt also.',
    },
    { type: 'code', etappe: '17-javascript-dom/01-elemente-aendern' },
  ],
});

/* ---------- Lektion 2: Auf Klick reagieren ---------- */
schreibe('lessons/02-auf-klick-reagieren.json', {
  id: '02-auf-klick-reagieren',
  title: 'Auf Klick reagieren',
  konzepte: ['js.addEventListener'],
  steps: [
    {
      type: 'explain',
      text: 'Ein Like-Knopf, ein Play-Knopf, „In den Warenkorb“: Alles auf einer Seite wartet auf **Ereignisse** – und das wichtigste davon ist der **Klick**.\n\nBisher lief dein Skript einmal beim Laden und war fertig. Jetzt meldest du einen **Zuhörer** an: Er wartet am Knopf und führt beim Klick deinen Code aus – so oft, wie geklickt wird.',
      figure: FIG_EVENT,
    },
    {
      type: 'explain',
      text: 'Der Knopf ist im HTML ein `<button>` mit id, zum Beispiel `<button id="start-knopf">Los!</button>`. Im Skript holst du ihn wie gewohnt und hängst mit **addEventListener** einen Zuhörer an:\n\n```js\nconst knopf = document.getElementById("start-knopf");\nknopf.addEventListener("click", function () {\n  console.log("Geklickt!");\n});\n```\n\n`"click"` ist der Name des Ereignisses. Danach kommt eine **Funktion** – ein Codeblock zwischen `{` und `}`, der erst beim Klick läuft. Ganz am Ende schließt `});` Funktion und Klammer.',
    },
    {
      type: 'example',
      text: 'Klicke in der Vorschau auf den Knopf. **Ändere** dann den Text in der Funktion. Was passiert, wenn du aus `"click"` ein `"klick"` machst?',
      html: '<button id="knopf">Klick mich</button>\n<p id="antwort">Noch nichts passiert.</p>\n',
      js: 'const knopf = document.getElementById("knopf");\nconst antwort = document.getElementById("antwort");\nknopf.addEventListener("click", function () {\n  antwort.textContent = "Danke für den Klick!";\n});\n',
    },
    {
      type: 'quiz',
      question: 'Wann läuft der Code zwischen den geschweiften Klammern von `addEventListener("click", function () { … })`?',
      options: ['Bei jedem Klick auf das Element – so oft, wie geklickt wird', 'Genau einmal, sobald die Seite geladen ist', 'Nur beim ersten Klick, danach nie wieder'],
      correct: 0,
      explanation: 'Der Zuhörer bleibt am Element und reagiert auf jeden Klick. Beim Laden wird die Funktion nur angemeldet, nicht ausgeführt.',
    },
    {
      type: 'code',
      task: '**Erweitere** das Skript: Beim Klick auf den Knopf zeigt die Anzeige „Los geht\'s – 20 Minuten!“. Vorher bleibt sie bei „Bereit?“.',
      starter: {
        html: '<h2>Workout</h2>\n<button id="start-knopf">Training starten</button>\n<p id="anzeige">Bereit?</p>\n',
        js: 'const startKnopf = document.getElementById("start-knopf");\nconst anzeige = document.getElementById("anzeige");\n// Zuhörer für den Klick\n',
      },
      editable: ['js'],
      hints: [
        'Der Zuhörer gehört an den Knopf, die Textänderung in die Funktion.',
        'Muster aus einem anderen Kontext: `licht.addEventListener("click", function () { … });`',
        'In die Funktion kommt eine Zeile, die den Text der Anzeige setzt – wie in Lektion 1.',
      ],
      solution: {
        js: 'const startKnopf = document.getElementById("start-knopf");\nconst anzeige = document.getElementById("anzeige");\nstartKnopf.addEventListener("click", function () {\n  anzeige.textContent = "Los geht\'s – 20 Minuten!";\n});\n',
      },
      tests: [
        { type: 'text', selector: '#anzeige', expected: 'Bereit?', label: 'Vor dem Klick steht „Bereit?“' },
        { type: 'action', action: 'click', selector: '#start-knopf' },
        { type: 'text', selector: '#anzeige', expected: 'Los geht\'s – 20 Minuten!', label: 'Nach dem Klick steht „Los geht\'s – 20 Minuten!“' },
        { type: 'source', file: 'js', matches: 'addEventListener\\(\\s*["\']click["\']', label: 'Das Skript reagiert auf click' },
      ],
    },
    {
      type: 'explain',
      text: 'Drei Stolperfallen, die jeder einmal erlebt:\n\n- Das Ereignis heißt `"click"` – englisch, klein geschrieben.\n- Was **sofort** passieren soll, steht außerhalb der Funktion; was **beim Klick** passieren soll, steht drinnen.\n- Am Ende gehört `});` – die geschweifte Klammer schließt die Funktion, die runde den Aufruf.\n\nMehrere Knöpfe? Jeder bekommt seine eigene id und seinen eigenen Zuhörer.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Zuhörer: Beim Klick auf den Knopf soll die Meldung „Gespeichert“ erscheinen.',
      template: 'knopf.___("___", function () {\n  meldung.textContent = "Gespeichert";\n});',
      accept: [['addEventListener'], ['click']],
      exact: true,
      hint: 'Der Befehl zum Anmelden des Zuhörers – und der englische Name des Ereignisses, klein geschrieben.',
    },
    {
      type: 'code',
      task: '**Erstelle** über der Meldung einen Knopf mit der id `anmelden` und dem Text „Anmelden“. **Erweitere** das Skript: Beim Klick zeigt die Meldung „Du bist angemeldet!“.',
      starter: {
        html: '<h2>Turnier-Anmeldung</h2>\n<!-- Hier kommt der Knopf hin -->\n<p id="meldung">Noch nicht angemeldet</p>\n',
        js: 'const meldung = document.getElementById("meldung");\n',
      },
      editable: ['html', 'js'],
      hints: [
        'Ein Knopf ist ein button-Element mit id und dem Text dazwischen.',
        'Im Skript: Knopf holen, Zuhörer anmelden, in der Funktion den Text der Meldung setzen.',
        'Struktur: `const knopf = document.getElementById("…");` und dann `knopf.addEventListener("click", function () { … });`',
      ],
      solution: {
        html: '<h2>Turnier-Anmeldung</h2>\n<button id="anmelden">Anmelden</button>\n<p id="meldung">Noch nicht angemeldet</p>\n',
        js: 'const meldung = document.getElementById("meldung");\nconst knopf = document.getElementById("anmelden");\nknopf.addEventListener("click", function () {\n  meldung.textContent = "Du bist angemeldet!";\n});\n',
      },
      tests: [
        { type: 'text', selector: 'button#anmelden', expected: 'Anmelden', label: 'Der Knopf „Anmelden“ ist da' },
        { type: 'order', selectors: ['#anmelden', '#meldung'], label: 'Der Knopf steht über der Meldung' },
        { type: 'action', action: 'click', selector: '#anmelden' },
        { type: 'text', selector: '#meldung', expected: 'Du bist angemeldet!', label: 'Nach dem Klick steht „Du bist angemeldet!“' },
        { type: 'source', file: 'js', matches: 'addEventListener\\(\\s*["\']click["\']', label: 'Das Skript reagiert auf click' },
      ],
    },
    {
      type: 'order',
      text: 'Bringe das Skript in die richtige Reihenfolge: Beim Klick auf den Knopf soll die Anzeige „Gespeichert!“ zeigen.',
      lines: ['const knopf = document.getElementById("speichern");', 'knopf.addEventListener("click", function () {', '  document.getElementById("anzeige").textContent = "Gespeichert!";', '});'],
      explanation: 'Erst den Knopf holen, dann den Zuhörer anmelden; die Reaktion steht in der Funktion, `});` schließt sie.',
    },
    {
      type: 'code',
      task: '**Entwickle** das Skript für die zwei Knöpfe: Nach einem Klick auf „Pizza“ zeigt die Auswahl „Deine Wahl: Pizza“, nach einem Klick auf „Waffel“ zeigt sie „Deine Wahl: Waffel“.',
      starter: {
        html: '<h2>Foodtruck-Bestellung</h2>\n<button id="pizza-knopf">Pizza</button>\n<button id="waffel-knopf">Waffel</button>\n<p id="auswahl">Noch nichts gewählt</p>\n',
        js: 'const auswahl = document.getElementById("auswahl");\n',
      },
      editable: ['js'],
      hints: [
        'Zwei Knöpfe, zwei Konstanten, zwei Zuhörer.',
        'Beide Zuhörer schreiben in dasselbe Element – nur mit anderem Text.',
        'Struktur je Knopf: holen, dann `….addEventListener("click", function () { … });`',
      ],
      solution: {
        js: 'const auswahl = document.getElementById("auswahl");\nconst pizzaKnopf = document.getElementById("pizza-knopf");\nconst waffelKnopf = document.getElementById("waffel-knopf");\npizzaKnopf.addEventListener("click", function () {\n  auswahl.textContent = "Deine Wahl: Pizza";\n});\nwaffelKnopf.addEventListener("click", function () {\n  auswahl.textContent = "Deine Wahl: Waffel";\n});\n',
      },
      tests: [
        { type: 'action', action: 'click', selector: '#pizza-knopf' },
        { type: 'text', selector: '#auswahl', expected: 'Deine Wahl: Pizza', label: 'Nach „Pizza“ steht „Deine Wahl: Pizza“' },
        { type: 'action', action: 'click', selector: '#waffel-knopf' },
        { type: 'text', selector: '#auswahl', expected: 'Deine Wahl: Waffel', label: 'Nach „Waffel“ steht „Deine Wahl: Waffel“' },
        { type: 'source', file: 'js', matches: 'addEventListener[\\s\\S]*addEventListener', label: 'Beide Knöpfe haben einen Zuhörer' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Sam wünscht sich für die Startseite einen Knopf „Gibt es noch Tickets?“ – draufdrücken, Antwort erscheint.\n\nDer Knopf kommt vor den Status-Absatz, der Status startet leer. Im Skript ersetzt ein Klick-Zuhörer die Zeile, die den Status bisher sofort gesetzt hat: Erst der Klick schreibt die Antwort hinein. Hol dir beide Elemente in Konstanten, dann hängst du den Zuhörer an den Knopf.',
    },
    { type: 'code', etappe: '17-javascript-dom/02-auf-klick-reagieren' },
  ],
});

/* ---------- Lektion 3: Zähler ---------- */
schreibe('lessons/03-zaehler.json', {
  id: '03-zaehler',
  title: 'Zähler',
  konzepte: ['js.zaehler'],
  steps: [
    {
      type: 'explain',
      text: 'Likes unter einem Clip, Schritte in der Fitness-App, „12 Leute sind dabei“ – überall wird **gezählt**. Und Zählen heißt nur: sich eine Zahl merken und sie bei jedem Klick um eins erhöhen.\n\nDie Zahl lebt in einer **Variablen** aus Station 16. Weil sie sich ändert, muss es `let` sein, nicht `const`.',
      figure: FIG_ZAEHLER,
    },
    {
      type: 'explain',
      text: 'Ein Zähler hat drei Teile: anlegen, erhöhen, anzeigen.\n\n```js\nlet likes = 0;\nknopf.addEventListener("click", function () {\n  likes = likes + 1;\n  anzeige.textContent = likes;\n});\n```\n\n`likes = likes + 1` heißt: Nimm den alten Wert, rechne eins dazu, speichere das Ergebnis wieder in `likes`. Danach schreibst du den neuen Wert in die Anzeige – eine Zahl wird dabei automatisch zu Text.',
    },
    {
      type: 'example',
      text: 'Klicke mehrmals auf den Knopf. **Ändere** dann `+ 1` in `+ 10`. Und probier aus, was passiert, wenn du die erste Zeile in die Funktion verschiebst.',
      html: '<button id="knopf">+1 Punkt</button>\n<p>Punkte: <span id="punkte">0</span></p>\n',
      js: 'let punkte = 0;\nconst knopf = document.getElementById("knopf");\nconst anzeige = document.getElementById("punkte");\nknopf.addEventListener("click", function () {\n  punkte = punkte + 1;\n  anzeige.textContent = punkte;\n});\n',
    },
    {
      type: 'quiz',
      question: 'Ein Zähler soll bei jedem Klick weiterzählen. Warum steht `let zaehler = 0;` **außerhalb** der Funktion?',
      options: ['Sonst würde der Zähler bei jedem Klick wieder bei 0 starten', 'Innerhalb einer Funktion sind keine Variablen erlaubt', 'Damit der Zähler beim Laden schon 1 anzeigt'],
      correct: 0,
      explanation: 'Alles in der Funktion läuft bei jedem Klick neu – eine Variable dort würde jedes Mal frisch mit 0 angelegt. Außerhalb merkt sie sich den Stand zwischen den Klicks.',
    },
    {
      type: 'code',
      task: '**Vervollständige** den Zuhörer: Bei jedem Klick auf den Like-Knopf steigt der Zähler `likes` um 1, und die Zahl vor „Likes“ zeigt den neuen Stand.',
      starter: {
        html: '<h2>Neuer Clip: Skatepark bei Nacht</h2>\n<button id="like-knopf">♥ Like</button>\n<p><span id="likes">0</span> Likes</p>\n',
        js: 'let likes = 0;\nconst likeKnopf = document.getElementById("like-knopf");\nconst anzeige = document.getElementById("likes");\nlikeKnopf.addEventListener("click", function () {\n  // Zähler erhöhen und anzeigen\n});\n',
      },
      editable: ['js'],
      hints: [
        'Zwei Zeilen in der Funktion: erst rechnen, dann anzeigen.',
        'Erhöhen nach dem Muster `punkte = punkte + 1;` – mit deiner Variablen.',
        'Anzeigen mit `anzeige.textContent = …;` – die Variable einsetzen, keine feste Zahl.',
      ],
      solution: {
        js: 'let likes = 0;\nconst likeKnopf = document.getElementById("like-knopf");\nconst anzeige = document.getElementById("likes");\nlikeKnopf.addEventListener("click", function () {\n  likes = likes + 1;\n  anzeige.textContent = likes;\n});\n',
      },
      tests: [
        { type: 'text', selector: '#likes', expected: '0', label: 'Der Zähler startet bei 0' },
        { type: 'action', action: 'click', selector: '#like-knopf' },
        { type: 'action', action: 'click', selector: '#like-knopf' },
        { type: 'action', action: 'click', selector: '#like-knopf' },
        { type: 'text', selector: '#likes', expected: '3', label: 'Nach drei Klicks steht der Zähler auf 3' },
        { type: 'source', file: 'js', matches: 'likes\\s*=\\s*likes\\s*\\+\\s*1', label: 'Die Variable likes wird um 1 erhöht' },
      ],
    },
    {
      type: 'explain',
      text: 'Zählen geht auch **rückwärts** – etwa freie Plätze, die weniger werden:\n\n```js\nplaetze = plaetze - 1;\nanzeige.textContent = "Noch " + plaetze + " frei";\n```\n\nDie Anzeige darf ein zusammengesetzter Text sein: Text plus Variable plus Text, mit `+` verbunden – wie in Station 16.\n\nMerke: **Erst rechnen, dann anzeigen.** Andersherum zeigt die Seite noch den alten Wert.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Zähler: Bei jedem Klick soll `treffer` um 1 steigen.',
      template: '___ treffer = 0;\nknopf.addEventListener("click", function () {\n  treffer = ___ + 1;\n  anzeige.textContent = treffer;\n});',
      accept: [['let'], ['treffer']],
      hint: 'Erste Lücke: das Schlüsselwort für eine Variable, die sich ändern darf. Zweite Lücke: der alte Wert, zu dem eins dazukommt.',
    },
    {
      type: 'code',
      task: '**Erweitere** das Skript: Jeder Klick auf „Platz buchen“ verringert `plaetze` um 1, und die Anzeige zeigt danach „Noch 4 Plätze frei“, „Noch 3 Plätze frei“ und so weiter.',
      starter: {
        html: '<h2>Theorie-Kurs Klasse B</h2>\n<button id="buchen-knopf">Platz buchen</button>\n<p id="anzeige">Noch 5 Plätze frei</p>\n',
        js: 'let plaetze = 5;\nconst buchenKnopf = document.getElementById("buchen-knopf");\nconst anzeige = document.getElementById("anzeige");\n// Zuhörer: Platz buchen\n',
      },
      editable: ['js'],
      hints: [
        'Diesmal wird abgezogen statt dazugezählt.',
        'Die Anzeige ist ein zusammengesetzter Text: Text + Variable + Text.',
        'Struktur: Zuhörer am Knopf, darin `plaetze = … - 1;` und danach die Anzeige setzen.',
      ],
      solution: {
        js: 'let plaetze = 5;\nconst buchenKnopf = document.getElementById("buchen-knopf");\nconst anzeige = document.getElementById("anzeige");\nbuchenKnopf.addEventListener("click", function () {\n  plaetze = plaetze - 1;\n  anzeige.textContent = "Noch " + plaetze + " Plätze frei";\n});\n',
      },
      tests: [
        { type: 'action', action: 'click', selector: '#buchen-knopf' },
        { type: 'action', action: 'click', selector: '#buchen-knopf' },
        { type: 'text', selector: '#anzeige', expected: 'Noch 3 Plätze frei', label: 'Nach zwei Klicks steht „Noch 3 Plätze frei“' },
        { type: 'source', file: 'js', matches: 'plaetze\\s*=\\s*plaetze\\s*-\\s*1', label: 'plaetze wird um 1 verringert' },
        { type: 'source', file: 'js', matches: '\\+\\s*plaetze\\s*\\+', label: 'Die Zahl in der Anzeige kommt aus der Variablen' },
      ],
    },
    {
      type: 'pair',
      text: 'Was macht welche Zeile? Ordne zu.',
      pairs: [
        ['`let treffer = 0;`', 'legt den Zähler mit dem Startwert 0 an'],
        ['`treffer = treffer + 1;`', 'erhöht den Zähler um eins'],
        ['`anzeige.textContent = treffer;`', 'zeigt den aktuellen Stand auf der Seite'],
        ['`treffer = treffer - 1;`', 'verringert den Zähler um eins'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: 'Der Zähler rührt sich nicht: Egal wie oft man klickt, es bleibt bei 0. **Überprüfe** das Skript und behebe die Fehler, sodass nach drei Klicks „3“ angezeigt wird.',
      starter: {
        html: '<h2>Anwesenheit Klasse 11B</h2>\n<button id="da-knopf">Ich bin da</button>\n<p><span id="anwesend">0</span> von 24 anwesend</p>\n',
        js: 'const daKnopf = document.getElementById("da-knopf");\nconst anzeige = document.getElementById("anwesend");\ndaKnopf.addEventListener("click", function () {\n  let anwesend = 0;\n  anwesend + 1;\n  anzeige.textContent = anwesend;\n});\n',
      },
      editable: ['js'],
      hints: [
        'Ein Zähler braucht zwei Dinge: Das Ergebnis der Rechnung muss gespeichert werden – und die Variable muss außerhalb der Funktion leben.',
        'Vergleiche mit dem Muster `punkte = punkte + 1;` – wird hier wirklich etwas zugewiesen?',
        'Wo steht die Zeile mit `let`? Bei jedem Klick läuft die ganze Funktion von vorn.',
      ],
      solution: {
        js: 'let anwesend = 0;\nconst daKnopf = document.getElementById("da-knopf");\nconst anzeige = document.getElementById("anwesend");\ndaKnopf.addEventListener("click", function () {\n  anwesend = anwesend + 1;\n  anzeige.textContent = anwesend;\n});\n',
      },
      tests: [
        { type: 'text', selector: '#anwesend', expected: '0', label: 'Vor dem Klick steht 0' },
        { type: 'action', action: 'click', selector: '#da-knopf' },
        { type: 'action', action: 'click', selector: '#da-knopf' },
        { type: 'action', action: 'click', selector: '#da-knopf' },
        { type: 'text', selector: '#anwesend', expected: '3', label: 'Nach drei Klicks steht 3' },
        { type: 'source', file: 'js', matches: 'anwesend\\s*=\\s*anwesend\\s*\\+\\s*1', label: 'Die Rechnung wird in anwesend gespeichert' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Unter dem Line-up kommt der Knopf „Ich bin dabei!“ – und daneben zählt die Seite mit: „0 Leute sind dabei“, dann 1, dann 2 …\n\nDie Variable dafür gibt es schon: `reservierungen` aus Station 16, mit `let` angelegt und auf 0 gesetzt. Du brauchst also nur den Knopf, ein Inline-Element mit id für die Zahl und den Zuhörer, der erhöht und anzeigt.',
    },
    { type: 'code', etappe: '17-javascript-dom/03-zaehler' },
  ],
});

/* ---------- Lektion 4: Klassen schalten ---------- */
schreibe('lessons/04-klassen-schalten.json', {
  id: '04-klassen-schalten',
  title: 'Klassen schalten',
  konzepte: ['js.classList'],
  steps: [
    {
      type: 'explain',
      text: 'Dunkler Modus in der Gaming-App, ein markierter Sneaker auf der Merkliste, der hervorgehobene Tag im Kalender: alles Umschalter – und alle funktionieren gleich.\n\nJavaScript ändert dabei **keine Farben**. Es schaltet nur eine **Klasse** am Element ein oder aus. Wie die Klasse aussieht, steht wie immer im CSS. Arbeitsteilung: JS schaltet, CSS gestaltet.',
      figure: FIG_CLASSLIST,
    },
    {
      type: 'explain',
      text: 'Die Klassen eines Elements erreichst du über **classList**. Drei Befehle reichen:\n\n```js\nconst karte = document.getElementById("karte");\nkarte.classList.add("markiert");\nkarte.classList.remove("markiert");\nkarte.classList.toggle("markiert");\n```\n\n`add` fügt hinzu, `remove` entfernt, `toggle` schaltet um: Ist die Klasse da, geht sie weg – und umgekehrt. Im Skript steht der Klassenname **ohne Punkt**; der Punkt gehört nur zum CSS-Selektor `.markiert`. Den body erreichst du ohne id: `document.body`.',
    },
    {
      type: 'example',
      text: 'Klicke mehrmals auf den Knopf. **Ändere** im CSS die Farben der Klasse `nacht`. Was passiert, wenn du im Skript aus `toggle` ein `add` machst?',
      html: '<button id="nacht-knopf">Nachtmodus</button>\n<h1>Arena-Liga</h1>\n<p>Die Liga für Hobby-Teams.</p>\n',
      css: 'body {\n  background-color: #ffffff;\n  color: #222222;\n  font-family: Arial, sans-serif;\n}\n\n.nacht {\n  background-color: #0f1320;\n  color: #eef2ff;\n}\n',
      js: 'const nachtKnopf = document.getElementById("nacht-knopf");\nnachtKnopf.addEventListener("click", function () {\n  document.body.classList.toggle("nacht");\n});\n',
    },
    {
      type: 'quiz',
      question: 'Im CSS gibt es die Regel `.dunkel { … }`. Welche Zeile schaltet diese Klasse am body ein oder aus?',
      options: ['`document.body.classList.toggle("dunkel");`', '`document.body.classList.toggle(".dunkel");`', '`document.body.textContent = "dunkel";`'],
      correct: 0,
      explanation: '`toggle` schaltet um. Im Skript steht der Klassenname ohne Punkt – der Punkt gehört nur zum CSS-Selektor. `textContent` würde nur den Text der Seite ersetzen.',
    },
    {
      type: 'code',
      task: '**Erweitere** das Skript: Jeder Klick auf den Knopf schaltet die Klasse `dunkel` am body ein oder aus – die Seite wechselt so zwischen hell und dunkel.',
      starter: {
        html: '<button id="modus-knopf">Dunkler Modus</button>\n<h1>Arena-Liga</h1>\n<p>Spielplan, Tabelle und Ergebnisse deiner Hobby-Liga.</p>\n',
        css: 'body {\n  background-color: #f4f4f5;\n  color: #1b1b2f;\n  font-family: Arial, sans-serif;\n}\n\n.dunkel {\n  background-color: #111827;\n  color: #f9fafb;\n}\n',
        js: 'const modusKnopf = document.getElementById("modus-knopf");\n// Beim Klick: Klasse am body umschalten\n',
      },
      editable: ['js'],
      hints: [
        'Der Zuhörer kommt an den Knopf, geschaltet wird aber am body.',
        'Den body erreichst du ohne id über document.body.',
        'In der Funktion: `….classList.toggle("…");` – mit dem body und dem Klassennamen aus dem CSS.',
      ],
      solution: {
        js: 'const modusKnopf = document.getElementById("modus-knopf");\nmodusKnopf.addEventListener("click", function () {\n  document.body.classList.toggle("dunkel");\n});\n',
      },
      tests: [
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#f4f4f5', label: 'Vor dem Klick ist die Seite hell' },
        { type: 'action', action: 'click', selector: '#modus-knopf' },
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#111827', label: 'Nach dem Klick ist die Seite dunkel' },
        { type: 'action', action: 'click', selector: '#modus-knopf' },
        { type: 'style', selector: 'body', prop: 'background-color', expected: '#f4f4f5', label: 'Ein zweiter Klick macht sie wieder hell' },
        { type: 'source', file: 'js', matches: 'classList\\.toggle\\(\\s*["\']dunkel["\']', label: 'Das Skript schaltet die Klasse dunkel um' },
      ],
    },
    {
      type: 'explain',
      text: '`toggle` ist der Umschalter. `add` und `remove` brauchst du, wenn ein Knopf nur **eine** Richtung kennt: „Merken“ setzt die Klasse, „Entfernen“ nimmt sie weg.\n\nZwei Fehlerquellen: Der Name im Skript muss **genau** dem Namen im CSS entsprechen (`markiert` ist nicht `Markiert`). Und ohne passende CSS-Regel passiert beim Schalten sichtbar – nichts.',
    },
    {
      type: 'fill',
      text: 'Vervollständige das Skript: Beim Klick auf „Merken“ bekommt die Karte die Klasse `gemerkt` – und behält sie auch bei weiteren Klicks.',
      template: 'merkenKnopf.addEventListener("click", function () {\n  karte.___.___("gemerkt");\n});',
      accept: [['classList'], ['add']],
      exact: true,
      hint: 'Erste Lücke: die Klassenliste des Elements. Zweite Lücke: der Befehl, der eine Klasse nur hinzufügt.',
    },
    {
      type: 'code',
      task: '**Erweitere** das Skript: Ein Klick auf „Merken“ gibt der Karte die Klasse `gemerkt` (sie wird gelb), ein Klick auf „Entfernen“ nimmt die Klasse wieder weg.',
      starter: {
        html: '<div id="karte" class="karte">\n  <h2>Runner X2</h2>\n  <p>89 €</p>\n</div>\n<button id="merken-knopf">Merken</button>\n<button id="entfernen-knopf">Entfernen</button>\n',
        css: '.karte {\n  padding: 12px;\n  background-color: #ffffff;\n  border: 2px solid #d4d4d8;\n}\n\n.gemerkt {\n  background-color: #ffd84d;\n  border-color: #ff7a45;\n}\n',
        js: 'const karte = document.getElementById("karte");\nconst merkenKnopf = document.getElementById("merken-knopf");\nconst entfernenKnopf = document.getElementById("entfernen-knopf");\n// Zwei Zuhörer\n',
      },
      editable: ['js'],
      hints: [
        'Zwei Knöpfe, zwei Zuhörer – beide arbeiten an der Karte.',
        'Einer fügt hinzu, einer entfernt: add und remove.',
        'Struktur: `merkenKnopf.addEventListener("click", function () { karte.classList.…("…"); });` – und dasselbe für den anderen Knopf.',
      ],
      solution: {
        js: 'const karte = document.getElementById("karte");\nconst merkenKnopf = document.getElementById("merken-knopf");\nconst entfernenKnopf = document.getElementById("entfernen-knopf");\nmerkenKnopf.addEventListener("click", function () {\n  karte.classList.add("gemerkt");\n});\nentfernenKnopf.addEventListener("click", function () {\n  karte.classList.remove("gemerkt");\n});\n',
      },
      tests: [
        { type: 'style', selector: '#karte', prop: 'background-color', expected: '#ffffff', label: 'Anfangs ist die Karte weiß' },
        { type: 'action', action: 'click', selector: '#merken-knopf' },
        { type: 'style', selector: '#karte', prop: 'background-color', expected: '#ffd84d', label: 'Nach „Merken“ ist die Karte gelb' },
        { type: 'action', action: 'click', selector: '#entfernen-knopf' },
        { type: 'style', selector: '#karte', prop: 'background-color', expected: '#ffffff', label: 'Nach „Entfernen“ ist sie wieder weiß' },
        { type: 'source', file: 'js', matches: 'classList\\.add\\(\\s*["\']gemerkt["\']', label: '„Merken“ fügt die Klasse gemerkt hinzu' },
        { type: 'source', file: 'js', matches: 'classList\\.remove\\(\\s*["\']gemerkt["\']', label: '„Entfernen“ entfernt die Klasse gemerkt' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Bausteine zu.',
      pairs: [
        ['`classList.add("x")`', 'fügt die Klasse x hinzu'],
        ['`classList.remove("x")`', 'entfernt die Klasse x'],
        ['`classList.toggle("x")`', 'schaltet x ein oder aus'],
        ['`document.body`', 'das body-Element – ohne id erreichbar'],
        ['`.x { … }`', 'CSS-Regel: so sieht die Klasse aus'],
      ],
    },
    {
      type: 'code',
      task: '**Ergänze** unter dem Status einen Knopf mit der id `offen-knopf` und dem Text „Jetzt geöffnet“. **Erstelle** im CSS eine Regel für die Klasse `offen` mit der Textfarbe `#4ade80`. **Erweitere** das Skript: Der Klick schaltet die Klasse `offen` am Status ein oder aus.',
      starter: {
        html: '<h1>Waffelwagen</h1>\n<p id="status">Heute ab 16 Uhr am Neckar</p>\n<!-- Hier kommt der Knopf hin -->\n',
        css: 'body {\n  font-family: Arial, sans-serif;\n}\n\np {\n  color: #1b1b2f;\n  font-weight: bold;\n}\n\n/* Regel für die Klasse offen */\n',
        js: 'const status = document.getElementById("status");\n',
      },
      editable: ['html', 'css', 'js'],
      hints: [
        'Drei Dateien, drei Änderungen: Knopf im HTML, Regel im CSS, Zuhörer im JS.',
        'Die CSS-Regel: Klassenselektor mit Punkt, darin die Farbe – wie in Station 10.',
        'Im Skript: Knopf holen, Zuhörer anmelden, in der Funktion `status.classList.toggle("…");`',
      ],
      solution: {
        html: '<h1>Waffelwagen</h1>\n<p id="status">Heute ab 16 Uhr am Neckar</p>\n<button id="offen-knopf">Jetzt geöffnet</button>\n',
        css: 'body {\n  font-family: Arial, sans-serif;\n}\n\np {\n  color: #1b1b2f;\n  font-weight: bold;\n}\n\n.offen {\n  color: #4ade80;\n}\n',
        js: 'const status = document.getElementById("status");\nconst offenKnopf = document.getElementById("offen-knopf");\noffenKnopf.addEventListener("click", function () {\n  status.classList.toggle("offen");\n});\n',
      },
      tests: [
        { type: 'text', selector: 'button#offen-knopf', expected: 'Jetzt geöffnet', label: 'Der Knopf „Jetzt geöffnet“ ist da' },
        { type: 'order', selectors: ['#status', '#offen-knopf'], label: 'Der Knopf steht unter dem Status' },
        { type: 'style', selector: '#status', prop: 'color', expected: '#1b1b2f', label: 'Vor dem Klick ist der Status dunkel' },
        { type: 'action', action: 'click', selector: '#offen-knopf' },
        { type: 'style', selector: '#status', prop: 'color', expected: '#4ade80', label: 'Nach dem Klick ist der Status grün' },
        { type: 'source', file: 'js', matches: 'classList\\.toggle\\(\\s*["\']offen["\']', label: 'Das Skript schaltet die Klasse offen um' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Sam will einen **Nachtmodus** für die FUNKEN-Seite – passt zu einem Festival bei Nacht. Drei kleine Änderungen, eine pro Datei:\n\n- HTML: ein Knopf „Nachtmodus“ als letztes Element in der Navigation\n- CSS: eine Regel für die Klasse `nacht` mit dunklem Hintergrund und heller Schrift\n- JS: ein Zuhörer, der die Klasse am body umschaltet\n\nDie Farbwerte stehen in der Aufgabe.',
    },
    { type: 'code', etappe: '17-javascript-dom/04-klassen-schalten' },
  ],
});

/* ---------- Lektion 5: Wiederholung (17 + 16, 15, 13, 09) ---------- */
schreibe('lessons/05-wiederholung.json', {
  id: '05-wiederholung',
  title: 'Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      text: 'Schaltpult-Check: Finden, Klick, Zähler, Klassen – dazu Variablen und Textverbindung aus Station 16, das Box-Modell aus 13, Formulare aus 09 und Recht aus 15. Sieben Aufgaben, dann baust du Sam noch ein Dankeschön in die Startseite.',
    },
    {
      type: 'quiz',
      question: 'Die Konsole meldet einen Fehler mit „null“, sobald das Skript den Text eines Elements setzen will. Was ist die häufigste Ursache?',
      options: ['Die id im Skript passt nicht zur id im HTML', 'Der Text in textContent ist zu lang', 'Der Knopf wurde noch nicht angeklickt'],
      correct: 0,
      explanation: '`null` heißt: nichts gefunden. Meist ist die id anders geschrieben als im HTML – oder das Skript läuft, bevor das Element existiert.',
    },
    {
      type: 'fill',
      text: 'Station 09: Verbinde die Beschriftung mit dem Eingabefeld, damit ein Klick auf den Text das Feld aktiviert.',
      template: '<label ___="email">E-Mail</label>\n<input type="email" id="email">',
      accept: ['for'],
      hint: 'Das Attribut am label nennt die id des Feldes.',
    },
    {
      type: 'code',
      task: '**Erweitere** das Skript: Beim Klick auf den Knopf zeigt der Absatz „Summe: 24 €“ – berechnet aus `preis` mal `anzahl`, nicht als feste Zahl hingeschrieben.',
      starter: {
        html: '<h2>Pizza-Bestellung</h2>\n<p>3 × Margherita à 8 €</p>\n<button id="rechnen-knopf">Summe berechnen</button>\n<p id="summe">Summe: ?</p>\n',
        js: 'const preis = 8;\nconst anzahl = 3;\nconst summe = document.getElementById("summe");\nconst rechnenKnopf = document.getElementById("rechnen-knopf");\n// Beim Klick: Summe berechnen und anzeigen\n',
      },
      editable: ['js'],
      hints: [
        'Zuhörer am Knopf; in der Funktion wird gerechnet und angezeigt.',
        'Mal ist der Stern; Text und Zahl verbindest du mit Plus – wie in Station 16.',
        'Struktur: `summe.textContent = "Summe: " + … + " €";` – in die Lücke kommt die Rechnung.',
      ],
      solution: {
        js: 'const preis = 8;\nconst anzahl = 3;\nconst summe = document.getElementById("summe");\nconst rechnenKnopf = document.getElementById("rechnen-knopf");\nrechnenKnopf.addEventListener("click", function () {\n  summe.textContent = "Summe: " + preis * anzahl + " €";\n});\n',
      },
      tests: [
        { type: 'text', selector: '#summe', expected: 'Summe: ?', label: 'Vor dem Klick steht „Summe: ?“' },
        { type: 'action', action: 'click', selector: '#rechnen-knopf' },
        { type: 'text', selector: '#summe', expected: 'Summe: 24 €', label: 'Nach dem Klick steht „Summe: 24 €“' },
        { type: 'source', file: 'js', matches: 'preis\\s*\\*\\s*anzahl|anzahl\\s*\\*\\s*preis', label: 'Die Summe wird aus preis und anzahl berechnet' },
      ],
    },
    {
      type: 'pair',
      text: 'Station 13 – das Box-Modell. Ordne die Eigenschaften zu.',
      pairs: [
        ['`padding`', 'Innenabstand – Luft zwischen Inhalt und Rahmen'],
        ['`margin`', 'Außenabstand – Luft zu den Nachbarn'],
        ['`border`', 'der Rahmen um das Element'],
        ['`border-radius`', 'runde Ecken'],
        ['`box-shadow`', 'Schatten unter dem Element'],
      ],
    },
    {
      type: 'order',
      text: 'Sortiere das Skript für einen Abstimmungs-Zähler. `let stimmen = 0;` und die Konstante `anzeige` stehen schon weiter oben.',
      lines: ['const knopf = document.getElementById("abstimmen");', 'knopf.addEventListener("click", function () {', '  stimmen = stimmen + 1;', '  anzeige.textContent = stimmen;', '});'],
      explanation: 'Knopf holen, Zuhörer anmelden, in der Funktion erst rechnen und dann anzeigen, `});` schließt ab.',
    },
    {
      type: 'quiz',
      question: 'Station 15: Ihr wollt ein Foto aus dem Netz auf der Festival-Seite zeigen. Was gilt?',
      options: ['Nur mit Erlaubnis oder passender Lizenz, etwa Creative Commons', 'Alles, was im Netz steht, darf frei verwendet werden', 'Es reicht, die Quelle in einem HTML-Kommentar zu nennen'],
      correct: 0,
      explanation: 'Fotos sind urheberrechtlich geschützt. Ohne Erlaubnis oder Lizenz (z. B. CC BY mit Namensnennung) dürfen sie nicht auf die Seite.',
    },
    {
      type: 'code',
      task: '**Erstelle** im CSS eine Regel für die Klasse `gewaehlt`: ein 3 Pixel dicker, durchgezogener Rahmen in `#ff7a45` und 8 Pixel runde Ecken. **Erweitere** das Skript: Der Klick auf „Auswählen“ schaltet diese Klasse an der Karte ein oder aus.',
      starter: {
        html: '<div id="karte" class="karte">\n  <h2>Festivalpass</h2>\n  <p>20 € · beide Tage</p>\n</div>\n<button id="waehlen-knopf">Auswählen</button>\n',
        css: '.karte {\n  padding: 12px;\n  background-color: #ffffff;\n  border: 2px solid #d4d4d8;\n}\n\n/* Regel für die Klasse gewaehlt */\n',
        js: 'const karte = document.getElementById("karte");\nconst waehlenKnopf = document.getElementById("waehlen-knopf");\n',
      },
      editable: ['css', 'js'],
      hints: [
        'Rahmen: Dicke, Art und Farbe in einer Eigenschaft; runde Ecken haben eine eigene Eigenschaft (Station 13).',
        'Zuhörer am Knopf, geschaltet wird an der Karte – mit toggle.',
        'Die Regel beginnt mit `.gewaehlt {` und braucht zwei Deklarationen.',
      ],
      solution: {
        css: '.karte {\n  padding: 12px;\n  background-color: #ffffff;\n  border: 2px solid #d4d4d8;\n}\n\n.gewaehlt {\n  border: 3px solid #ff7a45;\n  border-radius: 8px;\n}\n',
        js: 'const karte = document.getElementById("karte");\nconst waehlenKnopf = document.getElementById("waehlen-knopf");\nwaehlenKnopf.addEventListener("click", function () {\n  karte.classList.toggle("gewaehlt");\n});\n',
      },
      tests: [
        { type: 'style', selector: '#karte', prop: 'border-top-width', expected: '2px', label: 'Vor dem Klick hat die Karte ihren dünnen Rahmen' },
        { type: 'action', action: 'click', selector: '#waehlen-knopf' },
        { type: 'style', selector: '#karte', prop: 'border-top-width', expected: '3px', label: 'Nach dem Klick ist der Rahmen 3 Pixel dick' },
        { type: 'style', selector: '#karte', prop: 'border-top-style', expected: 'solid', label: 'Der Rahmen ist durchgezogen' },
        { type: 'style', selector: '#karte', prop: 'border-top-color', expected: '#ff7a45', label: 'Der Rahmen ist orange' },
        { type: 'style', selector: '#karte', prop: 'border-top-left-radius', expected: '8px', label: 'Die Ecken sind 8 Pixel rund' },
        { type: 'source', file: 'js', matches: 'classList\\.toggle\\(\\s*["\']gewaehlt["\']', label: 'Das Skript schaltet die Klasse gewaehlt um' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Wenn jemand auf „Ich bin dabei!“ drückt, soll die Seite Danke sagen! Also: Der Zähler zählt weiter wie bisher, und **zusätzlich** steht danach in der Status-Zeile „Danke – bis Juli!“.\n\nAyla meint, das sei eine einzige Zeile mehr im vorhandenen Zuhörer – die Konstante für den Status gibt es im Skript ja schon.',
    },
    { type: 'code', etappe: '17-javascript-dom/05-wiederholung' },
  ],
});

/* ---------- Lektion 6: Projekt – Interaktive Startseite ---------- */
schreibe('lessons/06-projekt-interaktiv.json', {
  id: '06-projekt-interaktiv',
  title: 'Projekt: Interaktive Startseite',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Meilenstein! Die Startseite reagiert: Status auf Knopfdruck, ein Zähler unter dem Line-up, ein Nachtmodus. Vor fünfzehn Stationen stand hier eine einzige Überschrift.\n\nJetzt kommt der **Countdown** in den Kopfbereich: „Noch 42 Tage bis FUNKEN“ – die Zahl aus einer Variablen, der Text per Skript ins Element geschrieben. Ohne Klick, direkt beim Laden.',
    },
    {
      type: 'quiz',
      question: 'Der Countdown-Text soll direkt beim Laden erscheinen, nicht erst beim Klick. Wo gehört die Zeile mit `textContent` hin?',
      options: ['Direkt ins Skript, außerhalb jeder Funktion', 'In die Funktion eines Klick-Zuhörers', 'In den head, vor dem body'],
      correct: 0,
      explanation: 'Was beim Laden passieren soll, steht außerhalb der Funktionen – das Skript am Ende des body führt es sofort aus. In einer Klick-Funktion würde es erst beim Klick laufen.',
    },
    {
      type: 'pair',
      text: 'Alles, was der Countdown braucht – ordne zu.',
      pairs: [
        ['`const`', 'Variable, die sich nicht mehr ändert'],
        ['`let`', 'Variable, die sich ändern darf – z. B. ein Zähler'],
        ['`+`', 'verbindet Text und Zahl zu einem Text'],
        ['`textContent`', 'schreibt den Text sichtbar ins Element'],
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur Etappe: Im Kopfbereich kommt nach dem Willkommens-Absatz ein leerer Absatz mit id für den Countdown. Im Skript: eine Konstante mit 42 und eine Zeile, die Text, Zahl und Text zusammensetzt und ins Element schreibt.\n\nDanach lohnt sich ein Blick auf die ganze Website: [FUNKEN-Website ansehen](#/projekt). Klick dich durch Status, Zähler und Nachtmodus – das ist deine Arbeit. Gleich nimmt Sam die Station ab.',
    },
    { type: 'code', etappe: '17-javascript-dom/06-projekt-interaktiv' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '17-javascript-dom',
  fragen: [
    { id: '17-01', konzept: 'js.getElementById', type: 'quiz', question: 'Wie findest du das Element `<p id="preis">` per JavaScript?', options: ['`document.getElementById("preis")`', '`document.getElementById("#preis")`', '`document.getElement("preis")`'], correct: 0, explanation: 'Die id kommt als Text in Anführungszeichen in die Klammern – ohne Raute.' },
    { id: '17-02', konzept: 'js.getElementById', type: 'fill', text: 'Vervollständige: Der Knopf mit der id `start` wird in einer Konstante gespeichert.', template: 'const knopf = document.___("start");', accept: ['getElementById'], exact: true, hint: 'get…Element…By…Id – auf die Groß- und Kleinschreibung achten.' },
    { id: '17-03', konzept: 'js.getElementById', type: 'bug', text: 'Die Konsole meldet, ein Befehl sei „not a function“. Welche Zeile ist falsch?', lines: ['const anzeige = document.getElementById("anzeige");', 'const knopf = document.getElementByID("knopf");', 'anzeige.textContent = "Hallo";'], line: 1, explanation: 'Der Befehl heißt `getElementById` – mit kleinem d am Ende. JavaScript unterscheidet Groß- und Kleinschreibung.' },
    { id: '17-04', konzept: 'js.textContent', type: 'quiz', question: 'Welche Zeile ändert den sichtbaren Text des Elements `titel` auf „Neu“?', options: ['`titel.textContent = "Neu";`', '`titel.text = "Neu";`', '`titel = "Neu";`'], correct: 0, explanation: 'Der sichtbare Text eines Elements ist seine Eigenschaft `textContent`. `titel = "Neu"` würde nur die Konstante überschreiben – und geht bei const gar nicht.' },
    { id: '17-05', konzept: 'js.textContent', type: 'fill', text: 'Vervollständige: Die Anzeige soll „Fertig“ zeigen.', template: 'anzeige.___ = "Fertig";', accept: ['textContent'], exact: true, hint: 'text… – die Eigenschaft für den sichtbaren Text, mit großem C.' },
    { id: '17-06', konzept: 'js.textContent', type: 'pair', text: 'Ordne die Bausteine zu.', pairs: [['`document`', 'die ganze Seite – der Einstieg in den DOM-Baum'], ['`getElementById("x")`', 'findet das Element mit der id x'], ['`textContent`', 'der sichtbare Text eines Elements']] },
    { id: '17-07', konzept: 'js.addEventListener', type: 'quiz', question: 'Was bewirkt `knopf.addEventListener("click", function () { … })`?', options: ['Der Code in den geschweiften Klammern läuft bei jedem Klick', 'Der Knopf wird einmal automatisch angeklickt', 'Der Code läuft sofort beim Laden der Seite'], correct: 0, explanation: 'addEventListener meldet einen Zuhörer an. Die Funktion läuft erst, wenn das Ereignis eintritt – hier bei jedem Klick.' },
    { id: '17-08', konzept: 'js.addEventListener', type: 'fill', text: 'Vervollständige: Der Zuhörer soll auf einen Klick reagieren.', template: 'knopf.addEventListener("___", function () {', accept: ['click'], exact: true, hint: 'Der englische Name des Ereignisses, klein geschrieben.' },
    { id: '17-09', konzept: 'js.addEventListener', type: 'order', text: 'Sortiere: Beim Klick auf den Knopf soll die Anzeige „Los!“ zeigen.', lines: ['const knopf = document.getElementById("start");', 'knopf.addEventListener("click", function () {', '  document.getElementById("anzeige").textContent = "Los!";', '});'] },
    { id: '17-10', konzept: 'js.addEventListener', type: 'bug', text: 'Der Knopf reagiert nicht auf Klicks. Welche Zeile ist falsch?', lines: ['const knopf = document.getElementById("knopf");', 'knopf.addEventListener("klick", function () {', '  anzeige.textContent = "Danke!";', '});'], line: 1, explanation: 'Das Ereignis heißt englisch `"click"` – „klick“ kennt der Browser nicht, und der Zuhörer wartet vergeblich.' },
    { id: '17-11', konzept: 'js.zaehler', type: 'quiz', question: 'Ein Zähler soll bei jedem Klick um 1 steigen. Welche Zeile erhöht die Variable `likes` richtig?', options: ['`likes = likes + 1;`', '`likes + 1;`', '`const likes = likes + 1;`'], correct: 0, explanation: 'Alter Wert plus eins – und das Ergebnis wieder in `likes` speichern. `likes + 1;` rechnet nur, speichert aber nichts.' },
    { id: '17-12', konzept: 'js.zaehler', type: 'fill', text: 'Der Zähler soll sich bei jedem Klick ändern dürfen. Welches Schlüsselwort legt ihn an?', template: '___ punkte = 0;', accept: ['let'], hint: 'Nicht const – der Wert ändert sich ja.' },
    { id: '17-13', konzept: 'js.zaehler', type: 'bug', text: 'Der Zähler bleibt bei 0 stehen. Welche Zeile ist falsch?', lines: ['let treffer = 0;', 'knopf.addEventListener("click", function () {', '  treffer + 1;', '  anzeige.textContent = treffer;', '});'], line: 2, explanation: 'Die Rechnung wird nicht gespeichert. Richtig: `treffer = treffer + 1;`' },
    { id: '17-14', konzept: 'js.zaehler', type: 'order', text: 'Sortiere den Zähler: `let zaehler = 0;` und die Konstante `anzeige` stehen schon weiter oben.', lines: ['const knopf = document.getElementById("plus");', 'knopf.addEventListener("click", function () {', '  zaehler = zaehler + 1;', '  anzeige.textContent = zaehler;', '});'] },
    { id: '17-15', konzept: 'js.classList', type: 'quiz', question: 'Welche Zeile schaltet die Klasse `nacht` am body ein oder aus?', options: ['`document.body.classList.toggle("nacht");`', '`document.body.classList.toggle(".nacht");`', '`document.body.class = "nacht";`'], correct: 0, explanation: '`classList.toggle` schaltet eine Klasse um. Im Skript steht der Name ohne Punkt – der Punkt gehört zum CSS-Selektor.' },
    { id: '17-16', konzept: 'js.classList', type: 'pair', text: 'Ordne die classList-Befehle zu.', pairs: [['`classList.toggle("x")`', 'schaltet die Klasse x ein oder aus'], ['`classList.add("x")`', 'fügt die Klasse x hinzu'], ['`classList.remove("x")`', 'entfernt die Klasse x'], ['`document.body`', 'das body-Element der Seite']] },
    { id: '17-17', konzept: 'js.classList', type: 'bug', text: 'Die Seite wird beim Klick nicht dunkel, obwohl im CSS `.dunkel { … }` steht. Welche Zeile ist falsch?', lines: ['const knopf = document.getElementById("modus");', 'knopf.addEventListener("click", function () {', '  document.body.classList.toggle(".dunkel");', '});'], line: 2, explanation: 'Im Skript steht der Klassenname ohne Punkt: `toggle("dunkel")`. Mit Punkt sucht der Browser eine Klasse, die „.dunkel“ heißt.' },
    { id: '17-18', konzept: 'js.getElementById', type: 'quiz', question: 'Warum steht das script-Element am Ende des body?', options: ['Damit die Elemente schon existieren, wenn das Skript sie sucht', 'Weil JavaScript im head verboten ist', 'Damit die Seite langsamer lädt'], correct: 0, explanation: 'Der Browser baut die Seite von oben nach unten. Steht das Skript am Ende, findet getElementById alle Elemente – davor wären sie noch nicht da.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '17-javascript-dom',
  title: 'Abnahme: Schaltpult',
  intro: 'Leute, die Seite reagiert! Ich hab zwanzigmal auf „Ich bin dabei!“ gedrückt, sorry dafür. Bevor ich das dem Kollektiv zeige: Beweist mir, dass ihr das Schaltpult im Griff habt – Knöpfe, Zähler, Nachtmodus, alles.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'js.getElementById', type: 'quiz', question: 'Welche Zeile findet das Element `<span id="dabei">0</span>`?', options: ['`document.getElementById("dabei")`', '`document.getElementById(#dabei)`', '`document.getElementById("span")`'], correct: 0, explanation: 'Die id steht als Text in Anführungszeichen in den Klammern – ohne Raute, ohne Tag-Namen.' },
    { konzept: 'js.addEventListener', type: 'fill', text: 'Vervollständige: Der Zuhörer soll beim Klick reagieren.', template: 'knopf.addEventListener("___", function () {', accept: ['click'], exact: true },
    {
      type: 'code',
      task: '**Entwickle** das Skript: Beim Klick auf den Knopf zeigt der Status „Geöffnet bis 23 Uhr“.',
      starter: {
        html: '<h2>Döner-Ecke</h2>\n<button id="offen-knopf">Wir haben geöffnet</button>\n<p id="status">Status unbekannt</p>\n',
        js: 'const status = document.getElementById("status");\n',
      },
      editable: ['js'],
      solution: {
        js: 'const status = document.getElementById("status");\nconst offenKnopf = document.getElementById("offen-knopf");\noffenKnopf.addEventListener("click", function () {\n  status.textContent = "Geöffnet bis 23 Uhr";\n});\n',
      },
      tests: [
        { type: 'text', selector: '#status', expected: 'Status unbekannt', label: 'Vor dem Klick steht „Status unbekannt“' },
        { type: 'action', action: 'click', selector: '#offen-knopf' },
        { type: 'text', selector: '#status', expected: 'Geöffnet bis 23 Uhr', label: 'Nach dem Klick steht „Geöffnet bis 23 Uhr“' },
        { type: 'source', file: 'js', matches: 'addEventListener\\(\\s*["\']click["\']', label: 'Das Skript reagiert auf click' },
      ],
    },
    { konzept: 'js.classList', type: 'pair', text: 'Ordne zu.', pairs: [['`classList.toggle("x")`', 'schaltet die Klasse x ein oder aus'], ['`classList.add("x")`', 'fügt die Klasse x hinzu'], ['`classList.remove("x")`', 'entfernt die Klasse x'], ['`document.body`', 'das body-Element – ohne id erreichbar']] },
    { konzept: 'js.variable', type: 'quiz', question: 'Ein Zähler soll sich bei jedem Klick ändern. Womit legst du ihn richtig an?', options: ['`let zaehler = 0;`', '`const zaehler = 0;`', '`zaehler: 0;`'], correct: 0, explanation: 'Werte, die sich ändern, brauchen `let`. Eine `const` lässt sich nicht neu zuweisen.' },
    { konzept: 'js.zaehler', type: 'bug', text: 'Der Like-Zähler bleibt bei 0. Welche Zeile ist falsch?', lines: ['let likes = 0;', 'knopf.addEventListener("click", function () {', '  likes + 1;', '  anzeige.textContent = likes;', '});'], line: 2, explanation: 'Die Rechnung muss gespeichert werden: `likes = likes + 1;`' },
    { konzept: 'recht.impressum', type: 'quiz', question: 'Welche Angabe muss ins Impressum der Festival-Website?', options: ['Name, Anschrift und Kontakt der Verantwortlichen', 'Die Lieblingsfarbe des Teams', 'Die Anzahl der Besucher pro Tag'], correct: 0, explanation: 'Das Impressum sagt, wer für die Seite verantwortlich ist und wie man diese Person erreicht.' },
    {
      type: 'code',
      mode: 'fix',
      task: 'Der Knopf tut nichts, und die Konsole meldet Fehler. **Überprüfe** das Skript und behebe beide Fehler, sodass die Anzeige nach zwei Klicks „2“ zeigt.',
      starter: {
        html: '<h2>Turnier-Anmeldungen</h2>\n<button id="plus-knopf">+1 Team</button>\n<p><span id="teams">0</span> Teams angemeldet</p>\n',
        js: 'let teams = 0;\nconst plusKnopf = document.getElementById("plus-knopf");\nconst anzeige = document.getElementById("Teams");\nplusKnopf.addEventListener("click", function () {\n  teams = teams + 1;\n  anzeige.textContent = teams;\n};\n',
      },
      editable: ['js'],
      solution: {
        js: 'let teams = 0;\nconst plusKnopf = document.getElementById("plus-knopf");\nconst anzeige = document.getElementById("teams");\nplusKnopf.addEventListener("click", function () {\n  teams = teams + 1;\n  anzeige.textContent = teams;\n});\n',
      },
      tests: [
        { type: 'text', selector: '#teams', expected: '0', label: 'Vor dem Klick steht 0' },
        { type: 'action', action: 'click', selector: '#plus-knopf' },
        { type: 'action', action: 'click', selector: '#plus-knopf' },
        { type: 'text', selector: '#teams', expected: '2', label: 'Nach zwei Klicks steht 2' },
      ],
    },
    { konzept: 'css.padding', type: 'pair', text: 'Station 13 – ordne die Eigenschaften zu.', pairs: [['`padding`', 'Innenabstand'], ['`margin`', 'Außenabstand'], ['`border`', 'Rahmen'], ['`box-shadow`', 'Schatten']] },
    { konzept: 'js.textContent', type: 'quiz', question: 'Was macht die Zeile `anzeige.textContent = 5;`?', options: ['Sie zeigt im Element anzeige den Text 5', 'Sie zählt anzeige um 5 hoch', 'Sie erstellt ein neues Element mit der id 5'], correct: 0, explanation: 'textContent setzt den sichtbaren Text – eine Zahl wird dabei automatisch zu Text.' },
    { konzept: 'js.verkettung', type: 'fill', text: 'Station 16: Verbinde Text und Variable zu einem Satz.', template: 'const meldung = "Noch " + tage ___ " Tage";', accept: ['+'], hint: 'Das Zeichen, das Texte und Zahlen zu einem Text verbindet.' },
    { konzept: 'html.button', type: 'quiz', question: 'Womit erzeugst du im HTML einen klickbaren Knopf mit der Aufschrift „Absenden“?', options: ['`<button>Absenden</button>`', '`<knopf>Absenden</knopf>`', '`<p>Absenden</p>`'], correct: 0, explanation: 'Knöpfe sind button-Elemente; der Text dazwischen ist die Aufschrift.' },
  ],
});
console.log('Kapitel 17 geschrieben');
