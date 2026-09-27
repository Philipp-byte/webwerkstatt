// Kapitel 01 – Wie das Web funktioniert (Referenzkapitel, handgeschrieben).
// Erzeugt public/content/chapters/01-wie-das-web-funktioniert/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '01-wie-das-web-funktioniert');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

const FIG_CLIENT_SERVER = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="18" y="40" width="90" height="80" rx="10" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><rect x="30" y="52" width="66" height="44" rx="4" fill="#0f1320"/><text x="63" y="79" text-anchor="middle" fill="#38c7ff" font-size="11">Browser</text><text x="63" y="136" text-anchor="middle" fill="#eef2ff" font-weight="bold">Client</text><rect x="212" y="30" width="90" height="100" rx="10" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><rect x="226" y="44" width="62" height="14" rx="3" fill="#0f1320"/><rect x="226" y="64" width="62" height="14" rx="3" fill="#0f1320"/><rect x="226" y="84" width="62" height="14" rx="3" fill="#0f1320"/><circle cx="234" cy="51" r="3" fill="#4ade80"/><circle cx="234" cy="71" r="3" fill="#4ade80"/><circle cx="234" cy="91" r="3" fill="#4ade80"/><text x="257" y="146" text-anchor="middle" fill="#eef2ff" font-weight="bold">Server</text><path d="M112 66 H200" stroke="#ffd84d" stroke-width="2" marker-end="url(#p)"/><text x="156" y="60" text-anchor="middle" fill="#ffd84d">Anfrage</text><path d="M200 96 H112" stroke="#4ade80" stroke-width="2" marker-end="url(#g)"/><text x="156" y="112" text-anchor="middle" fill="#4ade80">Antwort: Seite</text><defs><marker id="p" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker><marker id="g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#4ade80"/></marker></defs></svg>`;

const FIG_URL = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="12" y="58" width="296" height="40" rx="8" fill="#1b2135"/><text x="24" y="84" fill="#b48cff" font-family="monospace" font-size="15">https://</text><text x="92" y="84" fill="#ff7a45" font-family="monospace" font-size="15">funken-festival.de</text><text x="251" y="84" fill="#38c7ff" font-family="monospace" font-size="15">/tickets.html</text><path d="M24 100 V112 H84 V100" stroke="#b48cff" fill="none"/><text x="54" y="128" text-anchor="middle" fill="#b48cff">Protokoll</text><path d="M96 100 V112 H244 V100" stroke="#ff7a45" fill="none"/><text x="170" y="128" text-anchor="middle" fill="#ff7a45">Domain</text><path d="M252 100 V112 H306 V100" stroke="#38c7ff" fill="none"/><text x="279" y="128" text-anchor="middle" fill="#38c7ff">Pfad</text><text x="160" y="36" text-anchor="middle" fill="#eef2ff" font-weight="bold">Eine URL hat drei Teile</text></svg>`;

const FIG_SPRACHEN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><path d="M160 104 L60 128 L160 152 L260 128Z" fill="#2a1a12" stroke="#ff7a45" stroke-width="2"/><text x="160" y="132" text-anchor="middle" fill="#ff7a45" font-weight="bold">HTML · Gerüst</text><path d="M160 60 L60 84 L160 108 L260 84Z" fill="#0f2230" stroke="#38c7ff" stroke-width="2"/><text x="160" y="88" text-anchor="middle" fill="#38c7ff" font-weight="bold">CSS · Licht &amp; Farbe</text><path d="M160 16 L60 40 L160 64 L260 40Z" fill="#2a2510" stroke="#ffd84d" stroke-width="2"/><text x="160" y="44" text-anchor="middle" fill="#ffd84d" font-weight="bold">JavaScript · Strom</text></svg>`;

/* ---------- Lektion 1 ---------- */
schreibe('lessons/01-was-passiert-beim-seitenaufruf.json', {
  id: '01-was-passiert-beim-seitenaufruf',
  title: 'Was passiert beim Seitenaufruf?',
  konzepte: ['web.client-server', 'web.http'],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Sam tippt **funken-festival.de** ins Handy – und bekommt „Seite nicht gefunden“. Bevor wir das reparieren, musst du wissen, was bei einem normalen Seitenaufruf überhaupt passiert.\n\nDie kurze Antwort: Dein Handy **fragt** einen anderen Computer, und der **antwortet** mit der Seite.',
      figure: FIG_CLIENT_SERVER,
    },
    {
      type: 'explain',
      text: 'Zwei Rollen, die du dir merken musst:\n\n- **Client** – das Gerät, das eine Seite haben will: dein Handy, dein Laptop, genauer: der **Browser** darauf.\n- **Server** – ein Computer, der Websites bereithält und rund um die Uhr auf Anfragen wartet.\n\nDie Website liegt also **nicht** auf deinem Handy. Sie liegt auf dem Server und wird bei jedem Aufruf neu geschickt.',
    },
    {
      type: 'quiz',
      question: 'Sam öffnet auf dem Handy die Seite eines Streamingdienstes. Wer ist hier der **Server**?',
      options: ['Der Computer des Streamingdienstes, der die Seite bereithält', 'Sams Handy', 'Die App, mit der Sam die Seite öffnet'],
      correct: 0,
      explanation: 'Der Server hält die Seite bereit und antwortet. Sams Handy mit dem Browser ist der Client – es fragt an.',
    },
    {
      type: 'explain',
      text: 'Der Ablauf hat einen Namen: **Anfrage und Antwort** (englisch *Request* und *Response*).\n\n1. Du tippst eine Adresse ein.\n2. Der Browser schickt eine **Anfrage** an den Server: „Gib mir diese Seite.“\n3. Der Server sucht die Datei und schickt sie als **Antwort** zurück.\n4. Der Browser zeichnet die Seite auf den Bildschirm.\n\nDas passiert in Millisekunden – und für jedes Bild auf der Seite noch einmal extra.',
    },
    {
      type: 'pair',
      text: 'Ordne die Begriffe zu.',
      pairs: [
        ['Client', 'fragt eine Seite an – z. B. der Browser auf dem Handy'],
        ['Server', 'hält Websites bereit und antwortet'],
        ['Anfrage', '„Gib mir diese Seite“ – geht vom Browser aus'],
        ['Antwort', 'die Datei, die der Server zurückschickt'],
      ],
    },
    {
      type: 'explain',
      text: 'Und genau da liegt Sams Problem: Der Server der alten Agentur wurde **abgeschaltet**. Der Browser schickt seine Anfrage – und **niemand antwortet**.\n\nAnders ist der Fall **404**: Da antwortet der Server zwar, sagt aber „Diese Datei habe ich nicht“. Zwei Fehler, zwei Ursachen.',
    },
    {
      type: 'quiz',
      question: 'Du rufst eine Seite auf und siehst **404 – Seite nicht gefunden**. Was ist passiert?',
      options: ['Der Server hat geantwortet, aber die angefragte Datei gibt es dort nicht', 'Dein Handy hat kein Internet', 'Der Server wurde abgeschaltet und antwortet gar nicht'],
      correct: 0,
      explanation: '404 ist eine **Antwort** des Servers: „Diese Datei kenne ich nicht.“ Wenn der Server aus ist, kommt gar keine Antwort – der Browser meldet dann, dass der Server nicht erreichbar ist.',
    },
    {
      type: 'order',
      text: 'Bring die Schritte eines Seitenaufrufs in die richtige Reihenfolge.',
      lines: ['Adresse in den Browser eintippen', 'Der Browser schickt eine Anfrage an den Server', 'Der Server sucht die Datei', 'Der Server schickt die Antwort zurück', 'Der Browser zeigt die Seite an'],
      explanation: 'Erst fragen, dann antworten, dann anzeigen – immer in dieser Reihenfolge.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Merksatz.',
      template: 'Der ___ schickt die Anfrage, der ___ schickt die Antwort.',
      accept: [['Client', 'Browser'], ['Server']],
      hint: 'Wer fragt, wer antwortet? Das Gerät mit dem Browser fragt.',
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Merk dir: **Client fragt, Server antwortet.** Die Seite liegt auf dem Server, nicht auf deinem Gerät.\n\nNächste Lektion: Woraus besteht eigentlich so eine Adresse wie funken-festival.de – und woher weiß der Browser, welchen Server er fragen muss?',
    },
  ],
});

/* ---------- Lektion 2 ---------- */
schreibe('lessons/02-url-und-http.json', {
  id: '02-url-und-http',
  title: 'URL und HTTP',
  konzepte: ['web.url'],
  steps: [
    {
      type: 'explain',
      text: 'Die Adresse einer Seite heißt **URL** (Uniform Resource Locator). Sie besteht aus drei Teilen:\n\n- **Protokoll** – die „Sprache“ der Übertragung: `https://`\n- **Domain** – der Name des Servers: `funken-festival.de`\n- **Pfad** – welche Datei auf dem Server: `/tickets.html`\n\nOhne Pfad liefert der Server die Startseite.',
      figure: FIG_URL,
    },
    {
      type: 'quiz',
      question: 'In der URL `https://sneaker-lager.de/neu/angebote.html` – welcher Teil ist die **Domain**?',
      options: ['`sneaker-lager.de`', '`https://`', '`/neu/angebote.html`'],
      correct: 0,
      explanation: 'Die Domain ist der Name des Servers. `https://` ist das Protokoll, `/neu/angebote.html` der Pfad zur Datei.',
    },
    {
      type: 'explain',
      text: '**HTTP** ist das Protokoll, mit dem Browser und Server sich unterhalten – die Regeln für Anfrage und Antwort.\n\n**HTTPS** ist dasselbe **mit Verschlüsselung**: Niemand im WLAN kann mitlesen, was du eingibst. Du erkennst es am **Schloss** in der Adresszeile. Für Ticketformulare mit Namen und E-Mail ist HTTPS Pflicht.',
    },
    {
      type: 'fill',
      text: 'Wie heißt die verschlüsselte Variante des Protokolls?',
      template: '___://funken-festival.de',
      accept: ['https'],
      hint: 'Das S am Ende steht für „secure“ – sicher.',
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Computer finden sich nicht über Namen, sondern über **IP-Adressen** – Zahlenfolgen wie `93.184.216.34`. Merken kann sich das niemand.\n\nDeshalb gibt es **DNS**, das Telefonbuch des Internets: Der Browser fragt „Welche IP-Adresse hat funken-festival.de?“ – erst dann schickt er die Anfrage an den richtigen Server.',
    },
    {
      type: 'pair',
      text: 'Ordne die Teile der Adresse ihren Namen zu.',
      pairs: [
        ['`https://`', 'Protokoll (verschlüsselt)'],
        ['`funken-festival.de`', 'Domain – Name des Servers'],
        ['`/programm.html`', 'Pfad – Datei auf dem Server'],
        ['`93.184.216.34`', 'IP-Adresse – Nummer des Servers'],
      ],
    },
    {
      type: 'order',
      text: 'Was passiert nach dem Eintippen von `funken-festival.de`? Sortiere.',
      lines: ['Der Browser fragt das DNS nach der IP-Adresse der Domain', 'Das DNS antwortet mit der IP-Adresse', 'Der Browser schickt die Anfrage an diese IP-Adresse', 'Der Server schickt die Seite zurück'],
      explanation: 'Erst den Namen auflösen, dann anfragen.',
    },
    {
      type: 'quiz',
      question: 'Welche URL zeigt auf die Datei `tickets.html` im Ordner `info` auf dem Server `funken-festival.de`?',
      options: ['`https://funken-festival.de/info/tickets.html`', '`https://info/funken-festival.de/tickets.html`', '`https://tickets.html/funken-festival.de/info`'],
      correct: 0,
      explanation: 'Nach der Domain kommt der Pfad: erst der Ordner `info`, dann die Datei `tickets.html`.',
    },
    {
      type: 'explain',
      text: 'Jede Antwort des Servers hat einen **Statuscode**:\n\n- **200** – alles gut, hier ist die Seite\n- **404** – Datei nicht gefunden\n- **500** – der Server hat einen Fehler\n\nDie Codes siehst du normalerweise nicht – außer wenn etwas schiefgeht. Sam kennt 404 jetzt leider sehr gut.',
    },
    {
      type: 'quiz',
      question: 'Welchen Statuscode schickt der Server, wenn alles geklappt hat?',
      options: ['200', '404', '500'],
      correct: 0,
      explanation: '200 heißt „OK“. 404 bedeutet „nicht gefunden“, 500 „Fehler auf dem Server“.',
    },
  ],
});

/* ---------- Lektion 3 ---------- */
schreibe('lessons/03-browser-editor-standards.json', {
  id: '03-browser-editor-standards',
  title: 'Browser, Editor & Standards',
  konzepte: ['web.browser', 'web.sprachen', 'web.standards'],
  steps: [
    {
      type: 'explain',
      text: 'Der **Browser** ist das Programm, das die Antwort des Servers liest und daraus die sichtbare Seite zeichnet. Was er bekommt, ist reiner **Text** mit Markierungen – der **Quelltext**.\n\nDu kannst ihn bei jeder Seite ansehen: Rechtsklick → „Seitenquelltext anzeigen“ (oder `Strg` + `U`).',
    },
    {
      type: 'example',
      text: 'So sieht Quelltext aus. Links ist der Text mit Markierungen, rechts zeichnet der Browser daraus die Seite. **Ändere** den Text zwischen den spitzen Klammern und schau, was passiert.',
      html: '<h1>FUNKEN</h1>\n<p>Das Schülerfestival am Neckar.</p>\n',
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Eine Website besteht aus drei Sprachen – und wir lernen sie genau in dieser Reihenfolge:\n\n- **HTML** – das **Gerüst**: Überschriften, Texte, Bilder, Links.\n- **CSS** – **Licht und Farbe**: Schrift, Farben, Abstände, Layout.\n- **JavaScript** – der **Strom**: alles, was auf Klicks reagiert.\n\nOhne Gerüst kein Licht, ohne Licht kein Strom.',
      figure: FIG_SPRACHEN,
    },
    {
      type: 'pair',
      text: 'Welche Sprache ist wofür zuständig?',
      pairs: [
        ['HTML', 'Inhalt und Struktur – Überschriften, Texte, Bilder'],
        ['CSS', 'Aussehen – Farben, Schrift, Abstände'],
        ['JavaScript', 'Verhalten – reagiert auf Klicks'],
      ],
    },
    {
      type: 'quiz',
      question: 'Die Überschrift auf der FUNKEN-Seite soll **orange** werden. Welche Sprache brauchst du dafür?',
      options: ['CSS', 'HTML', 'JavaScript'],
      correct: 0,
      explanation: 'Farben sind Aussehen – das ist CSS. HTML sagt nur, *dass* es eine Überschrift gibt.',
    },
    {
      type: 'explain',
      text: 'Quelltext schreibst du in einem **Editor** – einem Programm für reinen Text. Eine Textverarbeitung wie ein Schreibprogramm taugt nicht: Sie speichert unsichtbare Formatierungen, die der Browser nicht versteht.\n\nDie Dateien bekommen passende Endungen: `.html`, `.css`, `.js`. In der Werkstatt benutzt du unsere **Werkbank** – Editor und Vorschau nebeneinander.',
    },
    {
      type: 'quiz',
      question: 'Womit schreibst du eine HTML-Datei?',
      options: ['Mit einem Editor für reinen Text', 'Mit einem Schreibprogramm für Briefe und Bewerbungen', 'Mit einem Bildprogramm'],
      correct: 0,
      explanation: 'HTML ist reiner Text. Schreibprogramme speichern versteckte Formatierungen, die der Browser nicht lesen kann.',
    },
    {
      type: 'explain',
      text: 'Warum sieht eine Seite in jedem Browser gleich aus? Weil es **Standards** gibt: Regeln, die genau festlegen, was HTML, CSS und JavaScript bedeuten.\n\nDafür sorgt das **W3C** (World Wide Web Consortium) zusammen mit den Browser-Herstellern. Ohne Standards müsste jede Seite für jeden Browser extra gebaut werden.',
    },
    {
      type: 'fill',
      text: 'Wie heißt die Organisation, die die Web-Standards festlegt?',
      template: 'Standards kommen vom ___ (World Wide Web Consortium).',
      accept: ['W3C'],
      hint: 'Drei W und ein C – als Abkürzung geschrieben.',
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Info-Point geschafft! Du weißt jetzt: Client fragt, Server antwortet, die URL sagt wo, und drei Sprachen bauen die Seite.\n\nGleich nimmt Sam die Station ab. Danach geht es ans **Fundament** – die ersten Zeilen HTML für die FUNKEN-Website.',
    },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '01-wie-das-web-funktioniert',
  fragen: [
    { id: '01-01', konzept: 'web.client-server', type: 'quiz', question: 'Wo liegt eine Website, die du auf dem Handy öffnest?', options: ['Auf einem Server, der sie bei jedem Aufruf schickt', 'Auf deinem Handy, seit du sie einmal geöffnet hast', 'Im WLAN-Router'], correct: 0, explanation: 'Die Seite liegt auf dem Server und wird bei jedem Aufruf neu übertragen.' },
    { id: '01-02', konzept: 'web.client-server', type: 'fill', text: 'Vervollständige.', template: 'Der Browser ist der ___, der die Seite anfragt.', accept: ['Client'], hint: 'Das Gegenstück zum Server.' },
    { id: '01-03', konzept: 'web.client-server', type: 'pair', text: 'Ordne zu.', pairs: [['Client', 'fragt an'], ['Server', 'antwortet'], ['Browser', 'zeichnet die Seite']] },
    { id: '01-04', konzept: 'web.http', type: 'order', text: 'Sortiere den Seitenaufruf.', lines: ['Adresse eintippen', 'Anfrage an den Server', 'Antwort vom Server', 'Browser zeigt die Seite'] },
    { id: '01-05', konzept: 'web.http', type: 'quiz', question: 'Was bedeutet der Statuscode 404?', options: ['Der Server hat die Datei nicht gefunden', 'Alles in Ordnung', 'Der Server ist abgeschaltet'], correct: 0, explanation: '404 ist eine Antwort des Servers: Datei nicht gefunden.' },
    { id: '01-06', konzept: 'web.http', type: 'quiz', question: 'Welcher Statuscode bedeutet „alles OK“?', options: ['200', '404', '500'], correct: 0, explanation: '200 = OK.' },
    { id: '01-07', konzept: 'web.url', type: 'quiz', question: 'Welcher Teil von `https://pizza-express.de/menu.html` ist der Pfad?', options: ['`/menu.html`', '`pizza-express.de`', '`https://`'], correct: 0, explanation: 'Der Pfad kommt nach der Domain und zeigt auf die Datei.' },
    { id: '01-08', konzept: 'web.url', type: 'pair', text: 'Ordne die URL-Teile zu.', pairs: [['`https://`', 'Protokoll'], ['`fitness-block.de`', 'Domain'], ['`/kurse.html`', 'Pfad']] },
    { id: '01-09', konzept: 'web.url', type: 'bug', text: 'Eine dieser URL-Zeilen ist fehlerhaft. Welche?', lines: ['https://funken-festival.de/programm.html', 'https://funken-festival.de/tickets.html', 'https:/funken-festival.de/galerie.html', 'https://funken-festival.de/impressum.html'], line: 2, explanation: 'Nach `https:` gehören zwei Schrägstriche.' },
    { id: '01-10', konzept: 'web.url', type: 'fill', text: 'Wie heißt das Telefonbuch des Internets, das Domains in IP-Adressen übersetzt?', template: 'Das ___ übersetzt funken-festival.de in eine IP-Adresse.', accept: ['DNS'], hint: 'Drei Buchstaben, Domain Name System.' },
    { id: '01-11', konzept: 'web.sprachen', type: 'pair', text: 'Welche Sprache macht was?', pairs: [['HTML', 'Gerüst und Inhalt'], ['CSS', 'Aussehen'], ['JavaScript', 'Verhalten bei Klicks']] },
    { id: '01-12', konzept: 'web.sprachen', type: 'quiz', question: 'Ein Knopf soll beim Klick eine Zahl hochzählen. Welche Sprache?', options: ['JavaScript', 'HTML', 'CSS'], correct: 0, explanation: 'Alles, was auf Klicks reagiert, ist JavaScript.' },
    { id: '01-13', konzept: 'web.browser', type: 'quiz', question: 'Womit schreibst du HTML-Dateien?', options: ['Mit einem Editor für reinen Text', 'Mit einem Schreibprogramm für Briefe', 'Mit einer Tabellenkalkulation'], correct: 0, explanation: 'HTML ist reiner Text – ein Editor speichert nichts Verstecktes.' },
    { id: '01-14', konzept: 'web.browser', type: 'bug', text: 'Welche Dateiendung ist falsch?', lines: ['index.html', 'style.css', 'script.js', 'galerie.htm l'], line: 3, explanation: 'Dateiendungen haben keine Leerzeichen: `galerie.html`.' },
    { id: '01-15', konzept: 'web.standards', type: 'quiz', question: 'Wozu gibt es Web-Standards?', options: ['Damit jede Seite in jedem Browser gleich funktioniert', 'Damit Websites schneller laden', 'Damit nur Profis Websites bauen dürfen'], correct: 0, explanation: 'Standards legen fest, was HTML, CSS und JavaScript bedeuten – für alle Browser gleich.' },
    { id: '01-16', konzept: 'web.standards', type: 'fill', text: 'Abkürzung der Standard-Organisation?', template: 'Web-Standards legt das ___ fest.', accept: ['W3C'], hint: 'World Wide Web Consortium.' },
    { id: '01-17', konzept: 'web.http', type: 'bug', text: 'Eine Aussage ist falsch. Welche?', lines: ['Der Browser schickt eine Anfrage.', 'Der Server schickt eine Antwort.', 'Die Antwort enthält die Datei.', 'Der Server zeichnet die Seite auf deinem Bildschirm.'], line: 3, explanation: 'Zeichnen ist Sache des Browsers – der Server schickt nur Dateien.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '01-wie-das-web-funktioniert',
  title: 'Abnahme: Info-Point',
  intro: 'Okay, bevor ihr irgendwas baut: Erklär mir, was da eigentlich passiert, wenn jemand unsere Adresse eintippt. Ich will das verstehen, bevor ich Tickets verkaufe.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'web.client-server', type: 'quiz', question: 'Sam öffnet funken-festival.de auf dem Laptop. Was ist der Laptop mit dem Browser?', options: ['Der Client', 'Der Server', 'Das DNS'], correct: 0, explanation: 'Das Gerät, das anfragt, ist der Client.' },
    { konzept: 'web.http', type: 'order', text: 'Sortiere den Ablauf beim Seitenaufruf.', lines: ['Adresse eintippen', 'DNS liefert die IP-Adresse', 'Browser schickt die Anfrage', 'Server schickt die Antwort', 'Browser zeigt die Seite'] },
    { konzept: 'web.url', type: 'pair', text: 'Ordne die Teile von `https://funken-festival.de/tickets.html` zu.', pairs: [['`https://`', 'Protokoll'], ['`funken-festival.de`', 'Domain'], ['`/tickets.html`', 'Pfad']] },
    { konzept: 'web.http', type: 'quiz', question: 'Der Server der Agentur ist abgeschaltet. Was passiert mit Sams Anfrage?', options: ['Es kommt keine Antwort – der Browser meldet, dass der Server nicht erreichbar ist', 'Der Server antwortet mit 200', 'Das DNS schickt die Seite stattdessen'], correct: 0, explanation: 'Ohne Server keine Antwort. 404 wäre eine Antwort – die gibt es hier nicht.' },
    { konzept: 'web.url', type: 'fill', text: 'Welches Protokoll überträgt verschlüsselt?', template: '___://funken-festival.de', accept: ['https'] },
    { konzept: 'web.sprachen', type: 'pair', text: 'Welche Sprache übernimmt was?', pairs: [['HTML', 'Gerüst: Überschriften, Texte, Bilder'], ['CSS', 'Licht und Farbe: Aussehen'], ['JavaScript', 'Strom: reagiert auf Klicks']] },
    { konzept: 'web.browser', type: 'quiz', question: 'Was zeigt „Seitenquelltext anzeigen“ im Browser?', options: ['Den Text mit Markierungen, aus dem der Browser die Seite zeichnet', 'Die IP-Adresse des Servers', 'Das Passwort der Website'], correct: 0, explanation: 'Der Quelltext ist der HTML-Text, den der Server geschickt hat.' },
    { konzept: 'web.standards', type: 'quiz', question: 'Warum sieht funken-festival.de in jedem Browser gleich aus?', options: ['Weil es Standards gibt, die HTML und CSS für alle Browser festlegen', 'Weil alle Browser vom selben Hersteller sind', 'Weil der Server für jeden Browser eine eigene Seite schickt'], correct: 0, explanation: 'Standards (W3C) sorgen dafür, dass alle Browser dieselben Regeln benutzen.' },
    { konzept: 'web.url', type: 'bug', text: 'Welche URL ist fehlerhaft?', lines: ['https://funken-festival.de/', 'https://funken-festival.de/programm.html', 'https://funken-festival.de programm.html', 'https://funken-festival.de/tickets.html'], line: 2, explanation: 'Zwischen Domain und Pfad steht ein Schrägstrich, kein Leerzeichen.' },
    { konzept: 'web.client-server', type: 'fill', text: 'Vervollständige den Merksatz.', template: 'Der Client fragt, der ___ antwortet.', accept: ['Server'] },
  ],
});
console.log('Kapitel 01 geschrieben');
