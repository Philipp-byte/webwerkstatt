// Kapitel 04 – Listen (Station „Programm-Tafel“).
// Erzeugt public/content/chapters/04-listen/{lessons/*.json,pool.json,boss.json}
// Aufruf: node content-src/kapitel-04.mjs
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '04-listen');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Lektion 1: Behälter <ul> mit <li>-Punkten links, gerenderte Punkte rechts.
const FIG_UL = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="20" text-anchor="middle" fill="#eef2ff" font-weight="bold">Behälter + Punkte = Liste</text><rect x="12" y="32" width="164" height="116" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="22" y="52" fill="#ff7a45" font-family="monospace">&lt;ul&gt;</text><text x="34" y="76" fill="#eef2ff" font-family="monospace">&lt;li&gt;Neonpuls&lt;/li&gt;</text><text x="34" y="98" fill="#eef2ff" font-family="monospace">&lt;li&gt;Basslager&lt;/li&gt;</text><text x="34" y="120" fill="#eef2ff" font-family="monospace">&lt;li&gt;Kiki Volt&lt;/li&gt;</text><text x="22" y="140" fill="#ff7a45" font-family="monospace">&lt;/ul&gt;</text><path d="M182 90 H198" stroke="#4ade80" stroke-width="2"/><path d="M196 84 L206 90 L196 96Z" fill="#4ade80"/><rect x="212" y="32" width="96" height="116" rx="8" fill="#e8ecf7"/><circle cx="228" cy="73" r="3" fill="#0f1320"/><text x="238" y="77" fill="#0f1320">Neonpuls</text><circle cx="228" cy="95" r="3" fill="#0f1320"/><text x="238" y="99" fill="#0f1320">Basslager</text><circle cx="228" cy="117" r="3" fill="#0f1320"/><text x="238" y="121" fill="#0f1320">Kiki Volt</text></svg>`;

// Lektion 2: gleiche <li>-Punkte, zwei Behälter – <ul> mit Punkten, <ol> mit Nummern.
const FIG_OL = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="20" text-anchor="middle" fill="#eef2ff" font-weight="bold">Gleiche Punkte, anderer Behälter</text><rect x="12" y="34" width="142" height="114" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="22" y="54" fill="#ff7a45" font-family="monospace">&lt;ul&gt;</text><text x="58" y="54" fill="#ff7a45">Reihenfolge egal</text><circle cx="30" cy="80" r="3" fill="#eef2ff"/><text x="40" y="84" fill="#eef2ff">Zelt</text><circle cx="30" cy="104" r="3" fill="#eef2ff"/><text x="40" y="108" fill="#eef2ff">Schlafsack</text><circle cx="30" cy="128" r="3" fill="#eef2ff"/><text x="40" y="132" fill="#eef2ff">Powerbank</text><rect x="166" y="34" width="142" height="114" rx="8" fill="#1b2135" stroke="#b48cff" stroke-width="2"/><text x="176" y="54" fill="#b48cff" font-family="monospace">&lt;ol&gt;</text><text x="210" y="54" fill="#b48cff">Reihenfolge zählt</text><text x="178" y="84" fill="#eef2ff">1. Sehtest</text><text x="178" y="108" fill="#eef2ff">2. Erste-Hilfe-Kurs</text><text x="178" y="132" fill="#eef2ff">3. Antrag</text></svg>`;

// Lektion 3: Boxen in Boxen – die innere <ul> liegt im <li>, vor dessen </li>.
const FIG_NESTED = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="18" text-anchor="middle" fill="#eef2ff" font-weight="bold">Die innere Liste steht IM Punkt</text><rect x="8" y="26" width="202" height="128" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="16" y="42" fill="#ff7a45" font-family="monospace">&lt;ul&gt;</text><rect x="20" y="48" width="180" height="74" rx="6" fill="#0f1320" stroke="#ffd84d" stroke-width="2"/><text x="28" y="64" fill="#ffd84d" font-family="monospace">&lt;li&gt;Snacks</text><rect x="32" y="70" width="160" height="38" rx="5" fill="#1b2135" stroke="#b48cff" stroke-width="2"/><text x="40" y="85" fill="#b48cff" font-family="monospace">&lt;ul&gt;&lt;li&gt;Chips&lt;/li&gt;</text><text x="40" y="101" fill="#b48cff" font-family="monospace">&lt;li&gt;Nachos&lt;/li&gt;&lt;/ul&gt;</text><text x="28" y="118" fill="#ffd84d" font-family="monospace">&lt;/li&gt;</text><text x="16" y="146" fill="#ff7a45" font-family="monospace">&lt;/ul&gt;</text><rect x="218" y="26" width="94" height="128" rx="8" fill="#e8ecf7"/><circle cx="232" cy="60" r="3" fill="#0f1320"/><text x="242" y="64" fill="#0f1320">Snacks</text><circle cx="246" cy="84" r="3" fill="none" stroke="#0f1320" stroke-width="1.5"/><text x="256" y="88" fill="#0f1320">Chips</text><circle cx="246" cy="106" r="3" fill="none" stroke="#0f1320" stroke-width="1.5"/><text x="256" y="110" fill="#0f1320">Nachos</text></svg>`;

/* ---------- Lektion 1: Ungeordnete Listen ---------- */
schreibe('lessons/01-ungeordnete-listen.json', {
  id: '01-ungeordnete-listen',
  title: 'Ungeordnete Listen',
  konzepte: ['html.ul'],
  steps: [
    {
      type: 'explain',
      text: 'Sam schickt das Line-up als eine lange Zeile: „Neonpuls, Basslager, Kiki Volt, Die Kabelträger“. Auf der Programm-Tafel soll daraus eine **Liste** werden – ein Punkt pro Act.\n\nIn HTML besteht eine Liste aus zwei Elementen: `<ul>` ist der Behälter (**unordered list** – Liste ohne Nummern), `<li>` ist ein einzelner Punkt (**list item**). Die Aufzählungspunkte malt der Browser von selbst.',
      figure: FIG_UL,
    },
    {
      type: 'example',
      text: 'Eine Playlist als Liste. **Ändere** einen Songtitel und **füge** einen vierten `<li>` hinzu – der Punkt davor kommt automatisch. Und dann: Was passiert, wenn du bei einem Song das `<li>` durch `<p>` ersetzt?',
      html: '<h2>Playlist fürs Training</h2>\n<ul>\n  <li>Nachtfahrt</li>\n  <li>Neonlicht</li>\n  <li>Sommerregen</li>\n</ul>\n',
    },
    {
      type: 'quiz',
      question: 'Du willst drei Snacks als Aufzählung mit Punkten zeigen. Welches Element umschließt die **ganze Liste**?',
      options: ['`<ul>`', '`<li>`', '`<p>`', '`<list>`'],
      correct: 0,
      explanation: '`<ul>` ist der Behälter der Liste. `<li>` ist ein einzelner Punkt darin. `<list>` gibt es in HTML nicht, und `<p>` ist ein Absatz.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Kommentar eine Liste mit Punkten für drei Songs: „Nachtfahrt“, „Neonlicht“, „Sommerregen“ – in dieser Reihenfolge.',
      starter: { html: '<h2>Meine Playlist</h2>\n<!-- Hier kommt die Liste hin -->\n' },
      hints: [
        'Zuerst der Behälter für die ganze Liste, darin für jeden Song ein eigener Listenpunkt.',
        'Ein Listenpunkt sieht so aus: `<li>Kakao</li>` – und alle Punkte liegen zwischen dem öffnenden und dem schließenden Tag der Liste.',
        'Struktur: Behälter öffnen – drei Punkte, jeder mit einem Songtitel – Behälter schließen.',
      ],
      solution: { html: '<h2>Meine Playlist</h2>\n<!-- Hier kommt die Liste hin -->\n<ul>\n  <li>Nachtfahrt</li>\n  <li>Neonlicht</li>\n  <li>Sommerregen</li>\n</ul>\n' },
      tests: [
        { type: 'selector', selector: 'ul', count: 1, label: 'Es gibt eine Liste mit Punkten' },
        { type: 'selector', selector: 'ul > li', count: 3, label: 'Die Liste hat drei Einträge' },
        { type: 'text', selector: 'ul > li:first-child', expected: 'Nachtfahrt', label: 'Der erste Song ist „Nachtfahrt“' },
        { type: 'text', selector: 'ul > li:last-child', expected: 'Sommerregen', label: 'Der letzte Song ist „Sommerregen“' },
        { type: 'order', selectors: ['h2', 'ul'], label: 'Die Liste steht unter der Überschrift' },
      ],
    },
    {
      type: 'explain',
      text: 'Drei Regeln, die dir Ärger ersparen:\n\n- In `<ul>` stehen **nur** `<li>`-Elemente – kein loser Text, kein `<p>`.\n- Jeder Punkt hat ein öffnendes **und** ein schließendes Tag.\n- Im Punkt darf stehen, was auch in einem Absatz stehen darf: Betonung, Sonderzeichen …\n\n```html\n<ul>\n  <li><strong>Tipp:</strong> Chips &amp; Dip</li>\n  <li>Eiswürfel</li>\n</ul>\n```\n\nDie Einrückung ist nur für dich – der Browser ignoriert sie.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Einkaufsliste für den Pizza-Abend: Drei Tags fehlen.',
      template: '<___>\n  <li>Mehl</li>\n  <___>Tomaten</li>\n</___>',
      accept: [['ul'], ['li'], ['ul']],
      hint: 'Erste und dritte Lücke: der Behälter der Liste (öffnend und schließend). Zweite Lücke: ein einzelner Punkt – schau auf die Zeile darüber.',
    },
    {
      type: 'code',
      task: '**Übertrage** die Zutaten aus dem Absatz in eine Liste mit Punkten – jede Zutat ein eigener Punkt, gleiche Reihenfolge. Der Absatz mit den Kommas wird dabei gelöscht.',
      starter: { html: '<h2>Pizza-Abend am Freitag</h2>\n<p>Einkaufen: Mehl, Tomaten, Mozzarella, Basilikum</p>\n' },
      hints: [
        'Vier Zutaten = vier Listenpunkte in einem Behälter.',
        'Jede Zutat bekommt ihr eigenes `<li>…</li>` – so wie `<li>Kakao</li>`. Der Komma-Absatz fliegt komplett raus.',
        'Struktur: Behälter öffnen, vier Zeilen mit je einem Punkt, Behälter schließen – die Zutaten in der Reihenfolge aus dem Absatz.',
      ],
      solution: { html: '<h2>Pizza-Abend am Freitag</h2>\n<ul>\n  <li>Mehl</li>\n  <li>Tomaten</li>\n  <li>Mozzarella</li>\n  <li>Basilikum</li>\n</ul>\n' },
      tests: [
        { type: 'selector', selector: 'ul > li', count: 4, label: 'Die Liste hat vier Zutaten' },
        { type: 'text', selector: 'ul > li:first-child', expected: 'Mehl', label: 'Die erste Zutat ist Mehl' },
        { type: 'text', selector: 'ul > li:nth-child(3)', expected: 'Mozzarella', label: 'Die dritte Zutat ist Mozzarella' },
        { type: 'selector', selector: 'p', count: 0, label: 'Der Komma-Absatz ist weg' },
        { type: 'order', selectors: ['h2', 'ul'], label: 'Die Liste steht unter der Überschrift' },
      ],
    },
    {
      type: 'order',
      text: '**Bringe** die Zeilen des Trainingsplans in die richtige Reihenfolge – die Wochentage helfen dir.',
      lines: ['<h2>Trainingsplan</h2>', '<ul>', '  <li>Montag: Beine</li>', '  <li>Mittwoch: Rücken</li>', '  <li>Freitag: Schultern</li>', '</ul>'],
      explanation: 'Erst die Überschrift, dann der Behälter, darin die Punkte in Wochenreihenfolge, zuletzt das schließende Tag.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** die Packliste: „Schlafsack“ hat keinen Aufzählungspunkt, und „Regenjacke“ steht unter der Liste statt darin. Am Ende sollen alle vier Sachen als Punkte in einer Liste stehen.',
      starter: { html: '<h2>Packliste fürs Festival</h2>\n<ul>\n  <li>Zelt</li>\n  <p>Schlafsack</p>\n  <li>Powerbank</li>\n</ul>\n<li>Regenjacke</li>\n' },
      hints: [
        'Zwei Dinge stimmen nicht: ein falsches Element in der Liste und ein Punkt an der falschen Stelle.',
        'Ein Listenpunkt ist immer ein `<li>` – kein `<p>`. Und jedes `<li>` gehört zwischen `<ul>` und `</ul>`.',
        'Tausche bei „Schlafsack“ das Element aus und schiebe die Regenjacke-Zeile vor das schließende Tag der Liste.',
      ],
      solution: { html: '<h2>Packliste fürs Festival</h2>\n<ul>\n  <li>Zelt</li>\n  <li>Schlafsack</li>\n  <li>Powerbank</li>\n  <li>Regenjacke</li>\n</ul>\n' },
      tests: [
        { type: 'selector', selector: 'ul > li', count: 4, label: 'Die Liste hat vier Punkte' },
        { type: 'selector', selector: 'ul p', count: 0, label: 'Kein Absatz mehr in der Liste' },
        { type: 'selector', selector: 'body > li', count: 0, label: 'Kein Punkt steht außerhalb der Liste' },
        { type: 'text', selector: 'ul > li:nth-child(2)', expected: 'Schlafsack', label: '„Schlafsack“ ist der zweite Punkt' },
        { type: 'text', selector: 'ul > li:last-child', expected: 'Regenjacke', label: '„Regenjacke“ ist der letzte Punkt' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Auf der Startseite steht das Line-up bisher nirgends. Zwischen „Die Bühnen“ und „Foodtrucks“ kommt jetzt ein neuer Abschnitt: eine Zwischenüberschrift „Line-up“ und darunter die vier Acts als Liste mit Punkten.\n\nHalte die Reihenfolge der Acts ein – so hat Sam sie mit den Bands abgesprochen.',
    },
    { type: 'code', etappe: '04-listen/01-ungeordnete-listen' },
  ],
});

/* ---------- Lektion 2: Geordnete Listen ---------- */
schreibe('lessons/02-geordnete-listen.json', {
  id: '02-geordnete-listen',
  title: 'Geordnete Listen',
  konzepte: ['html.ol'],
  steps: [
    {
      type: 'explain',
      text: 'Führerschein-Anmeldung: erst Sehtest, dann Erste-Hilfe-Kurs, dann der Antrag. Hier zählt die **Reihenfolge** – Punkte reichen nicht, die Schritte brauchen Nummern.\n\nDafür gibt es `<ol>` (**ordered list** – geordnete Liste). Die Einträge darin sind wieder `<li>`. Die Nummern tippst du **nicht** selbst: Der Browser zählt 1, 2, 3 – und zählt neu, wenn du einen Schritt einschiebst.',
      figure: FIG_OL,
    },
    {
      type: 'example',
      text: 'Ein Rezept mit nummerierten Schritten. **Füge** zwischen „Belegen“ und „Backen“ einen Schritt „Käse drauf“ ein – die Nummern rücken nach. **Tausche** dann `<ol>` und `</ol>` gegen `<ul>` und `</ul>` und schau, was aus den Nummern wird.',
      html: '<h2>So wird die Pizza</h2>\n<ol>\n  <li>Teig ausrollen</li>\n  <li>Mit Tomatensoße bestreichen</li>\n  <li>Belegen</li>\n  <li>12 Minuten backen</li>\n</ol>\n',
    },
    {
      type: 'quiz',
      question: 'Du löschst in einer nummerierten Liste den Schritt 2. Was passiert mit dem bisherigen Schritt 3?',
      options: ['Er bekommt automatisch die Nummer 2', 'Er behält die Nummer 3 – es entsteht eine Lücke', 'Die Liste zeigt gar keine Nummern mehr'],
      correct: 0,
      explanation: 'Der Browser nummeriert `<ol>`-Listen bei jeder Anzeige neu durch. Du tippst nie Nummern in den Text.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz eine nummerierte Liste mit den drei Schritten zum Führerschein: „Sehtest machen“, „Erste-Hilfe-Kurs besuchen“, „Antrag bei der Fahrschule stellen“.',
      starter: { html: '<h2>Auf dem Weg zum Führerschein</h2>\n<p>Das sind die ersten Schritte:</p>\n' },
      hints: [
        'Reihenfolge wichtig → geordnete Liste. Der Behälter-Tag ist ein anderer als bei der Punkteliste.',
        'Die Einträge sind wie gehabt `<li>…</li>`; nur der Behälter heißt anders – zwei Buchstaben, beginnt mit o.',
        'Struktur: Behälter öffnen, drei Schritte als je ein Punkt, Behälter schließen – Nummern tippst du keine.',
      ],
      solution: { html: '<h2>Auf dem Weg zum Führerschein</h2>\n<p>Das sind die ersten Schritte:</p>\n<ol>\n  <li>Sehtest machen</li>\n  <li>Erste-Hilfe-Kurs besuchen</li>\n  <li>Antrag bei der Fahrschule stellen</li>\n</ol>\n' },
      tests: [
        { type: 'selector', selector: 'ol', count: 1, label: 'Es gibt eine nummerierte Liste' },
        { type: 'selector', selector: 'ol > li', count: 3, label: 'Die Liste hat drei Schritte' },
        { type: 'text', selector: 'ol > li:first-child', expected: 'Sehtest machen', label: 'Schritt 1 ist der Sehtest' },
        { type: 'text', selector: 'ol > li:last-child', expected: 'Antrag bei der Fahrschule stellen', label: 'Schritt 3 ist der Antrag' },
        { type: 'order', selectors: ['p', 'ol'], label: 'Die Liste steht unter dem Absatz' },
      ],
    },
    {
      type: 'explain',
      text: 'Manchmal soll die Zählung nicht bei 1 beginnen – etwa wenn eine Rangliste auf zwei Tafeln verteilt ist. Dafür bekommt `<ol>` das **Attribut** `start` mit der ersten Nummer:\n\n```html\n<ol start="6">\n  <li>Retro Runner</li>\n  <li>Street Low</li>\n</ol>\n```\n\nDer Browser zeigt 6. und 7. – weiter zählt er wie gewohnt selbst.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Spielanleitung – die Schritte sollen nummeriert erscheinen.',
      template: '<___>\n  <li>Karten mischen</li>\n  <li>Jeder bekommt fünf Karten</li>\n</___>',
      accept: [['ol'], ['ol']],
      hint: 'Nummeriert = geordnet. Der Tag hat zwei Buchstaben und steht öffnend und schließend.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz die Fortsetzung der Turnier-Rangliste: eine nummerierte Liste mit „Kickers Nord“, „TSV Hafen“ und „FC Neckar“, deren Zählung bei 4 beginnt.',
      starter: { html: '<h2>Turnier-Rangliste, Teil 2</h2>\n<p>Die Plätze 1 bis 3 stehen auf der ersten Tafel.</p>\n' },
      hints: [
        'Nummerierte Liste – aber der Startwert ist nicht 1.',
        'Der Startwert ist ein Attribut am öffnenden Tag der Liste, wie `<ol start="10">` bei einer Top-20.',
        'Struktur: Liste mit Startwert 4 öffnen, drei Punkte mit den Teams, Liste schließen.',
      ],
      solution: { html: '<h2>Turnier-Rangliste, Teil 2</h2>\n<p>Die Plätze 1 bis 3 stehen auf der ersten Tafel.</p>\n<ol start="4">\n  <li>Kickers Nord</li>\n  <li>TSV Hafen</li>\n  <li>FC Neckar</li>\n</ol>\n' },
      tests: [
        { type: 'selector', selector: 'ol > li', count: 3, label: 'Die Liste hat drei Teams' },
        { type: 'attr', selector: 'ol', attr: 'start', expected: '4', label: 'Die Zählung beginnt bei 4' },
        { type: 'text', selector: 'ol > li:first-child', expected: 'Kickers Nord', label: 'Platz 4 ist Kickers Nord' },
        { type: 'text', selector: 'ol > li:last-child', expected: 'FC Neckar', label: 'Platz 6 ist der FC Neckar' },
      ],
    },
    {
      type: 'pair',
      text: '**Ordne** die Elemente ihrer Aufgabe zu.',
      pairs: [
        ['`<ul>`', 'Liste mit Punkten – Reihenfolge egal'],
        ['`<ol>`', 'nummerierte Liste – Reihenfolge wichtig'],
        ['`<li>`', 'ein einzelner Eintrag in der Liste'],
        ['`start="3"`', 'Zählung beginnt bei 3'],
      ],
    },
    {
      type: 'code',
      task: 'Die Tafel für den Turnier-Tag: 1. **Erstelle** unter „Teams“ eine Liste mit Punkten: „FC Neckar“, „Kickers Nord“, „TSV Hafen“. 2. **Erstelle** unter „Ablauf“ eine nummerierte Liste: „Anmeldung“, „Gruppenspiele“, „Finale“, „Siegerehrung“.',
      starter: { html: '<h1>Hallenturnier am Samstag</h1>\n<h2>Teams</h2>\n\n<h2>Ablauf</h2>\n\n' },
      hints: [
        'Zwei Listen, zwei Behälter: Reihenfolge egal → Punkte, Reihenfolge wichtig → Nummern.',
        'Jede Liste kommt direkt unter ihre Zwischenüberschrift. Die Einträge sind in beiden Fällen `<li>…</li>`.',
        'Struktur: Überschrift Teams → Punkteliste mit drei Einträgen; Überschrift Ablauf → nummerierte Liste mit vier Einträgen.',
      ],
      solution: { html: '<h1>Hallenturnier am Samstag</h1>\n<h2>Teams</h2>\n<ul>\n  <li>FC Neckar</li>\n  <li>Kickers Nord</li>\n  <li>TSV Hafen</li>\n</ul>\n\n<h2>Ablauf</h2>\n<ol>\n  <li>Anmeldung</li>\n  <li>Gruppenspiele</li>\n  <li>Finale</li>\n  <li>Siegerehrung</li>\n</ol>\n' },
      tests: [
        { type: 'selector', selector: 'ul > li', count: 3, label: 'Drei Teams stehen in einer Liste mit Punkten' },
        { type: 'selector', selector: 'ol > li', count: 4, label: 'Der Ablauf hat vier nummerierte Schritte' },
        { type: 'order', selectors: ['h2:nth-of-type(1)', 'ul', 'h2:nth-of-type(2)', 'ol'], label: 'Teams-Liste unter „Teams“, Ablauf unter „Ablauf“' },
        { type: 'text', selector: 'ul > li:first-child', expected: 'FC Neckar', label: 'Das erste Team ist der FC Neckar' },
        { type: 'text', selector: 'ol > li:last-child', expected: 'Siegerehrung', label: 'Der letzte Schritt ist die Siegerehrung' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Ich krieg ständig die Frage: „Wie komme ich zu euch?“ Deshalb bekommt die Startseite vor dem Kontakt-Kommentar einen Abschnitt „So kommst du hin“ – mit drei Schritten, die genau in dieser Reihenfolge passieren: Stadtbahn, Lichtern folgen, Ticket zeigen.\n\nReihenfolge wichtig – du weißt, welche Liste das braucht.',
    },
    { type: 'code', etappe: '04-listen/02-geordnete-listen' },
  ],
});

/* ---------- Lektion 3: Verschachtelte Listen ---------- */
schreibe('lessons/03-verschachtelte-listen.json', {
  id: '03-verschachtelte-listen',
  title: 'Verschachtelte Listen',
  konzepte: ['html.liste-verschachtelt'],
  steps: [
    {
      type: 'explain',
      text: 'Packliste fürs Festival: „Snacks“ und „Technik“ – und unter Snacks noch Chips und Nachos. Eine Liste **in** einer Liste, wie Ordner in Ordnern.\n\nIn HTML heißt das **verschachteln**: Die innere Liste steht **innerhalb** eines `<li>` – nach dem Text des Punkts und **vor** seinem schließenden `</li>`. Der Browser rückt sie automatisch ein.',
      figure: FIG_NESTED,
    },
    {
      type: 'example',
      text: 'Die Packliste mit zwei Ebenen. **Verschiebe** „Powerbank“ von „Technik“ zu „Snacks“ und beobachte die Einrückung. **Ergänze** dann eine dritte Kategorie „Kleidung“ mit eigener innerer Liste.',
      html: '<h2>Packliste</h2>\n<ul>\n  <li>Snacks\n    <ul>\n      <li>Chips</li>\n      <li>Nachos</li>\n    </ul>\n  </li>\n  <li>Technik\n    <ul>\n      <li>Powerbank</li>\n      <li>Kopfhörer</li>\n    </ul>\n  </li>\n</ul>\n',
    },
    {
      type: 'quiz',
      question: 'Wo genau steht eine innere Liste?',
      options: ['Innerhalb eines Listenpunkts, vor dessen schließendem Tag', 'Direkt nach dem schließenden Tag des Listenpunkts', 'Zwischen zwei Listenpunkten, direkt in der äußeren Liste', 'In einem eigenen Absatz unter der Liste'],
      correct: 0,
      explanation: 'Die innere Liste gehört zu einem Punkt – also in dessen `<li>` hinein. Erst nach der inneren Liste wird der Punkt geschlossen.',
    },
    {
      type: 'code',
      task: '**Ergänze** im Punkt „Getränke“ eine innere Liste mit Punkten: „Cola“ und „Wasser“. Die äußere Liste behält ihre zwei Punkte.',
      starter: { html: '<h2>Pizza-Abend: Einkauf</h2>\n<ul>\n  <li>Pizzateig</li>\n  <li>Getränke</li>\n</ul>\n' },
      hints: [
        'Die innere Liste ist ein ganz normales `<ul>` mit zwei Punkten – nur der Ort ist besonders.',
        'Sie steht im Punkt „Getränke“: nach dem Wort, aber noch vor dessen schließendem Tag. Muster: `<li>Obst <ul> … </ul> </li>`.',
        'Das schließende Tag von „Getränke“ muss also nach unten wandern – hinter das Ende der inneren Liste.',
      ],
      solution: { html: '<h2>Pizza-Abend: Einkauf</h2>\n<ul>\n  <li>Pizzateig</li>\n  <li>Getränke\n    <ul>\n      <li>Cola</li>\n      <li>Wasser</li>\n    </ul>\n  </li>\n</ul>\n' },
      tests: [
        { type: 'selector', selector: 'ul > li > ul', count: 1, label: 'Eine innere Liste liegt in einem Punkt' },
        { type: 'selector', selector: 'body > ul > li:last-child > ul', count: 1, label: 'Die innere Liste gehört zu „Getränke“' },
        { type: 'selector', selector: 'body > ul > li', count: 2, label: 'Die äußere Liste hat weiterhin zwei Punkte' },
        { type: 'selector', selector: 'ul ul > li', count: 2, label: 'Die innere Liste hat zwei Getränke' },
        { type: 'text', selector: 'ul ul > li:first-child', expected: 'Cola', label: 'Das erste Getränk ist Cola' },
      ],
    },
    {
      type: 'explain',
      text: 'Verschachteln geht auch gemischt: eine Punkteliste in einer nummerierten Liste – oder umgekehrt. Ein Rezept-Schritt mit seinen Zutaten:\n\n```html\n<ol>\n  <li>Soße kochen\n    <ul>\n      <li>Tomaten</li>\n      <li>Knoblauch</li>\n    </ul>\n  </li>\n  <li>Teig belegen</li>\n</ol>\n```\n\nTypischer Fehler: die innere Liste **nach** `</li>` zu setzen. Dann hängt sie lose in der äußeren Liste – kein gültiges HTML, auch wenn der Browser etwas anzeigt. Einrücken hilft dir, das zu sehen.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Packliste: Zwei Tags fehlen – schreib sie mit spitzen Klammern.',
      template: '<ul>\n  <li>Technik\n    ___\n      <li>Powerbank</li>\n      <li>Ladekabel</li>\n    </ul>\n  ___\n</ul>',
      accept: [['<ul>'], ['</li>']],
      hint: 'Erste Lücke: Hier wird die innere Liste eröffnet. Zweite Lücke: Nach der inneren Liste wird der Punkt „Technik“ geschlossen.',
    },
    {
      type: 'code',
      task: '**Ergänze** im Schritt „Krafttraining“ eine Liste mit Punkten für die drei Übungen: „Kniebeugen“, „Liegestütze“, „Plank“. Die drei Schritte bleiben nummeriert.',
      starter: { html: '<h2>Trainingsplan Dienstag</h2>\n<ol>\n  <li>Aufwärmen</li>\n  <li>Krafttraining</li>\n  <li>Dehnen</li>\n</ol>\n' },
      hints: [
        'Die Übungen sind eine Punkteliste – sie gehört in den zweiten Schritt hinein.',
        'Wie beim Rezept in der Erklärung: nach dem Wort „Krafttraining“ die innere Liste öffnen, drei Punkte, schließen – und erst dann den Schritt beenden.',
        'Struktur: `<li>Krafttraining` … innere Liste … `</li>` – die beiden anderen Schritte bleiben, wie sie sind.',
      ],
      solution: { html: '<h2>Trainingsplan Dienstag</h2>\n<ol>\n  <li>Aufwärmen</li>\n  <li>Krafttraining\n    <ul>\n      <li>Kniebeugen</li>\n      <li>Liegestütze</li>\n      <li>Plank</li>\n    </ul>\n  </li>\n  <li>Dehnen</li>\n</ol>\n' },
      tests: [
        { type: 'selector', selector: 'ol > li', count: 3, label: 'Der Plan hat weiterhin drei nummerierte Schritte' },
        { type: 'selector', selector: 'ol > li:nth-child(2) > ul', count: 1, label: 'Die Übungen liegen im Schritt „Krafttraining“' },
        { type: 'selector', selector: 'ol > li > ul > li', count: 3, label: 'Die innere Liste hat drei Übungen' },
        { type: 'text', selector: 'ol ul > li:first-child', expected: 'Kniebeugen', label: 'Die erste Übung ist Kniebeugen' },
        { type: 'text', selector: 'ol > li:last-child', expected: 'Dehnen', label: 'Der letzte Schritt ist Dehnen' },
      ],
    },
    {
      type: 'order',
      text: '**Bringe** das Rezept in die richtige Reihenfolge: nummerierte Schritte, im ersten Schritt eine innere Liste mit den Zutaten.',
      lines: ['<ol>', '  <li>Teig machen', '    <ul>', '      <li>Mehl, Wasser, Hefe</li>', '    </ul>', '  </li>', '  <li>Belegen und backen</li>', '</ol>'],
      explanation: 'Die innere Liste steht im ersten Schritt – erst nach ihrem Ende wird der Schritt geschlossen, dann folgt der zweite Schritt.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** die Turnier-Gruppen: „Gruppe B“ rutscht als Unterpunkt unter Gruppe A, und „SV Sonnenberg“ hat keinen Aufzählungspunkt. Ziel: zwei Gruppen als Hauptpunkte, jede mit einer inneren Liste aus zwei Teams.',
      starter: { html: '<h2>Turnier-Gruppen</h2>\n<ul>\n  <li>Gruppe A\n    <ul>\n      <li>FC Neckar</li>\n      <p>SV Sonnenberg</p>\n    </ol>\n  </li>\n  <li>Gruppe B\n    <ul>\n      <li>Kickers Nord</li>\n      <li>TSV Hafen</li>\n    </ul>\n  </li>\n</ul>\n' },
      hints: [
        'Zwei Fehler: Bei Gruppe A wird die innere Liste mit dem falschen Tag geschlossen, und ein Team steht nicht in einem Listenpunkt.',
        'Eine Punkteliste endet mit `</ul>`, nicht mit dem Tag der nummerierten Liste. Und Teams sind Listenpunkte, keine Absätze.',
        'Prüfe Zeile für Zeile: Öffnet sich `<ul>`, muss es später `</ul>` geben – genau vor dem `</li>` der Gruppe.',
      ],
      solution: { html: '<h2>Turnier-Gruppen</h2>\n<ul>\n  <li>Gruppe A\n    <ul>\n      <li>FC Neckar</li>\n      <li>SV Sonnenberg</li>\n    </ul>\n  </li>\n  <li>Gruppe B\n    <ul>\n      <li>Kickers Nord</li>\n      <li>TSV Hafen</li>\n    </ul>\n  </li>\n</ul>\n' },
      tests: [
        { type: 'selector', selector: 'body > ul > li', count: 2, label: 'Die äußere Liste hat zwei Gruppen' },
        { type: 'selector', selector: 'body > ul > li > ul > li', count: 4, label: 'Die inneren Listen haben zusammen vier Teams' },
        { type: 'selector', selector: 'ul p', count: 0, label: 'Kein Absatz in einer Liste' },
        { type: 'text', selector: 'body > ul > li:first-child > ul > li:last-child', expected: 'SV Sonnenberg', label: '„SV Sonnenberg“ ist das zweite Team von Gruppe A' },
        { type: 'text', selector: 'body > ul > li:nth-child(2) > ul > li:first-child', expected: 'Kickers Nord', label: '„Kickers Nord“ eröffnet Gruppe B' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Das Line-up auf der Startseite ist eine flache Liste mit vier Acts. Sam will aber sehen, wer auf welcher Bühne spielt.\n\nDeshalb baust du die Liste um: nur noch zwei Hauptpunkte, „Hauptbühne“ und „Zeltbühne“. In jedem steckt eine eigene innere Liste – Neonpuls und Basslager auf der Hauptbühne, Kiki Volt und Die Kabelträger im Zelt.',
    },
    { type: 'code', etappe: '04-listen/03-verschachtelte-listen' },
  ],
});

/* ---------- Lektion 4: Wiederholung (Kapitel 04, 03, 02) ---------- */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Kurzer Check, bevor Sam die Programm-Tafel abnimmt: Listen aus diesem Kapitel, dazu Text-Elemente vom Textbanner und die Grundlagen vom Fundament – Tags, Attribute, Grundgerüst.\n\nAm Ende bekommt die Startseite ihre Foodtruck-Liste.',
    },
    {
      type: 'quiz',
      question: 'In `<ol start="4">` – was ist `start="4"`?',
      options: ['Ein Attribut mit dem Wert 4', 'Ein eigenes Element', 'Der Inhalt der Liste', 'Ein Kommentar'],
      correct: 0,
      explanation: 'Attribute stehen im öffnenden Tag: Name, Gleichheitszeichen, Wert in Anführungszeichen. Sie geben dem Element Zusatzinformationen.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz eine Liste mit Punkten: „Retro Runner“, „Street Low“, „Court & Field“ – beim ersten Eintrag steht davor das stark betonte Wort „Favorit:“ und dann der Name.',
      starter: { html: '<h2>Sneaker-Wunschliste</h2>\n<p>Drei Paare, die ich mir für den Sommer wünsche:</p>\n' },
      hints: [
        'Punkteliste mit drei Einträgen; die Betonung liegt nur um das eine Wort im ersten Punkt.',
        'Starke Betonung kennst du aus dem Textbanner – das Element darf im Listenpunkt stehen. Das &-Zeichen braucht seine Entity-Schreibweise.',
        'Struktur des ersten Punkts: `<li>` + betontes Wort + Leerzeichen + Name + `</li>`. Beim dritten Namen das & als `&amp;`.',
      ],
      solution: { html: '<h2>Sneaker-Wunschliste</h2>\n<p>Drei Paare, die ich mir für den Sommer wünsche:</p>\n<ul>\n  <li><strong>Favorit:</strong> Retro Runner</li>\n  <li>Street Low</li>\n  <li>Court &amp; Field</li>\n</ul>\n' },
      tests: [
        { type: 'selector', selector: 'ul > li', count: 3, label: 'Die Liste hat drei Paare' },
        { type: 'text', selector: 'ul > li:first-child strong', expected: 'Favorit:', label: '„Favorit:“ ist stark betont' },
        { type: 'text', selector: 'ul > li:first-child', expected: 'Favorit: Retro Runner', label: 'Der erste Eintrag lautet „Favorit: Retro Runner“' },
        { type: 'text', selector: 'ul > li:last-child', expected: 'Court & Field', label: 'Der letzte Eintrag ist „Court & Field“' },
        { type: 'source', file: 'html', matches: '&amp;', label: 'Das &-Zeichen ist als Entity geschrieben' },
      ],
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Adresszeile des Foodtrucks: ein korrekt geschriebenes &-Zeichen und ein Zeilenumbruch ohne neuen Absatz.',
      template: '<p>Pizza ___ Pasta<___>Hafenstraße 9</p>',
      accept: [['&amp;'], ['br']],
      hint: 'Das &-Zeichen beginnt mit & und endet mit Semikolon; der Umbruch ist ein Leerelement mit zwei Buchstaben.',
    },
    {
      type: 'pair',
      text: '**Ordne** Element und Bedeutung zu.',
      pairs: [
        ['`<ol>`', 'nummerierte Liste'],
        ['`<ul>`', 'Liste mit Punkten'],
        ['`<li>`', 'ein Listenpunkt'],
        ['`<hr>`', 'Trennlinie'],
        ['`<em>`', 'leichte Betonung'],
        ['`<!-- … -->`', 'Kommentar – nur im Quelltext sichtbar'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** den Trainingsplan: Ab „Beintag“ ist plötzlich alles kursiv – sogar die Liste – und „Ausfallschritte“ bekommt keine Nummer. Zwei Fehler in zwei Zeilen.',
      starter: { html: '<h2>Trainingsplan Freitag</h2>\n<p>Heute ist <em>Beintag – kein Mogeln!</p>\n<ol>\n  <li>Aufwärmen</li>\n  <li>Kniebeugen</li>\n  <p>Ausfallschritte</p>\n  <li>Dehnen</li>\n</ol>\n' },
      hints: [
        'Ein Element aus dem Textbanner wird nie geschlossen; in der Liste steckt ein Element, das dort nicht hingehört.',
        'Eine leichte Betonung braucht ein schließendes Tag – sonst läuft sie bis zum Ende der Seite weiter. Nummerierte Schritte sind Listenpunkte, keine Absätze.',
        'Zeile 2: Betonung nach „Mogeln!“ schließen. Zeile 6: das Element von „Ausfallschritte“ an die Nachbarzeilen angleichen.',
      ],
      solution: { html: '<h2>Trainingsplan Freitag</h2>\n<p>Heute ist <em>Beintag – kein Mogeln!</em></p>\n<ol>\n  <li>Aufwärmen</li>\n  <li>Kniebeugen</li>\n  <li>Ausfallschritte</li>\n  <li>Dehnen</li>\n</ol>\n' },
      tests: [
        { type: 'selector', selector: 'em', count: 1, label: 'Genau ein Text ist leicht betont' },
        { type: 'text', selector: 'em', expected: 'Beintag – kein Mogeln!', label: 'Kursiv ist nur „Beintag – kein Mogeln!“' },
        { type: 'selector', selector: 'ol > li', count: 4, label: 'Der Plan hat vier nummerierte Schritte' },
        { type: 'selector', selector: 'ol p', count: 0, label: 'Kein Absatz in der Liste' },
        { type: 'text', selector: 'ol > li:nth-child(3)', expected: 'Ausfallschritte', label: 'Schritt 3 ist „Ausfallschritte“' },
      ],
    },
    {
      type: 'order',
      text: '**Bringe** das Grundgerüst der Playlist-Seite in die richtige Reihenfolge (der Dokumenttyp steht schon darüber).',
      lines: ['<html lang="de">', '<head>', '  <title>Meine Playlist</title>', '</head>', '<body>', '  <h1>Meine Playlist</h1>', '</body>', '</html>'],
      explanation: 'html umschließt alles; im head steht der Titel für den Browser-Tab, im body alles Sichtbare.',
    },
    {
      type: 'bug',
      text: 'Die Snack-Liste zeigt „Nachos“ ohne Aufzählungspunkt. **Finde** die fehlerhafte Zeile.',
      lines: ['<ul>', '  <li>Chips</li>', '  <p>Nachos</p>', '  <li>Dip</li>', '</ul>'],
      line: 2,
      explanation: 'In einer Liste sind alle Einträge `<li>` – ein `<p>` bekommt keinen Punkt.',
    },
    {
      type: 'explain',
      text: 'Auf der Startseite fehlt unter dem Foodtrucks-Absatz noch die Liste der vier Trucks. Der erste Truck ist neu dabei – das Wort „Neu:“ soll stark betont davorstehen.\n\nUnd im Namen „Pizza & Mehr“ steckt ein Zeichen, das in HTML eine besondere Schreibweise braucht – du kennst sie aus dem Textbanner.',
    },
    { type: 'code', etappe: '04-listen/04-wiederholung' },
  ],
});

/* ---------- Lektion 5: Projekt – Line-up komplett ---------- */
schreibe('lessons/05-projekt-lineup.json', {
  id: '05-projekt-lineup',
  title: 'Projekt: Line-up komplett',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Leute, die Tafel sieht richtig gut aus! Zwei Sachen kamen heute Nacht noch rein: **Lou & die Lichter** haben zugesagt – Zeltbühne, als dritter Act. Und bei der Anfahrt fehlt nach dem Ticket der wichtigste Schritt: **Feiern**.\n\nSchafft ihr das noch, bevor ich die Station abnehme?',
    },
    {
      type: 'quiz',
      question: 'Ein neuer Act soll als dritter Punkt in die innere Liste der Zeltbühne. Wo landet die neue Zeile?',
      options: ['Nach „Die Kabelträger“, noch vor dem schließenden Tag der inneren Liste', 'Nach dem schließenden Tag der äußeren Liste', 'Als neuer Punkt der äußeren Liste, neben Hauptbühne und Zeltbühne'],
      correct: 0,
      explanation: 'Der Act gehört zur Zeltbühne – also in deren innere Liste, als letzter Punkt vor deren schließendem Tag.',
    },
    {
      type: 'order',
      text: '**Bringe** den Festival-Rundgang in die richtige Reihenfolge: nummerierte Schritte, im ersten Schritt eine innere Liste.',
      lines: ['<ol>', '  <li>Einlass', '    <ul>', '      <li>Ticket &amp; Ausweis zeigen</li>', '    </ul>', '  </li>', '  <li>Ab zur Hauptbühne</li>', '</ol>'],
      explanation: 'Innere Liste im ersten Schritt, dann dessen schließendes Tag, dann der zweite Schritt. Das &-Zeichen steht als Entity.',
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Rückblick: Du kannst Punktelisten, nummerierte Listen und Listen in Listen – und weißt, dass die innere Liste vor dem schließenden Tag des Punkts steht.\n\nNach der Etappe klick unten auf **FUNKEN-Website ansehen**: Die Programm-Tafel ist damit komplett. Dann wartet Sam mit der Abnahme.',
    },
    { type: 'code', etappe: '04-listen/05-projekt-lineup' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '04-listen',
  fragen: [
    { id: '04-01', konzept: 'html.ul', type: 'quiz', question: 'Welches Element umschließt eine Liste mit Aufzählungspunkten (ohne Nummern)?', options: ['`<ul>`', '`<ol>`', '`<li>`'], correct: 0, explanation: '`<ul>` = unordered list, die Liste ohne Nummern. `<li>` ist ein einzelner Punkt darin.' },
    { id: '04-02', konzept: 'html.ul', type: 'fill', text: 'Vervollständige die Punkteliste.', template: '<___>\n  <li>Chips</li>\n  <li>Dip</li>\n</ul>', accept: ['ul'], hint: 'Unordered list – zwei Buchstaben, wie im schließenden Tag.' },
    { id: '04-03', konzept: 'html.ul', type: 'pair', text: 'Ordne zu.', pairs: [['`<ul>`', 'Liste mit Punkten'], ['`<ol>`', 'nummerierte Liste'], ['`<li>`', 'ein einzelner Listenpunkt']] },
    { id: '04-04', konzept: 'html.ul', type: 'bug', text: '„Cap“ erscheint ohne Aufzählungspunkt. Welche Zeile ist falsch?', lines: ['<ul>', '  <li>Hoodie</li>', '  <p>Cap</p>', '  <li>Sneaker</li>', '</ul>'], line: 2, explanation: 'In einer Liste sind alle Einträge `<li>` – ein `<p>` bekommt keinen Punkt.' },
    { id: '04-05', konzept: 'html.ul', type: 'order', text: 'Sortiere die Zeilen zu einer korrekten Liste.', lines: ['<h2>Playlist</h2>', '<ul>', '  <li>Nachtfahrt</li>', '</ul>'] },
    { id: '04-06', konzept: 'html.ol', type: 'quiz', question: 'Eine Anleitung mit Schritten, deren Reihenfolge wichtig ist. Welches Element?', options: ['`<ol>`', '`<ul>`', '`<p>`'], correct: 0, explanation: '`<ol>` = ordered list: Der Browser nummeriert die Schritte selbst.' },
    { id: '04-07', konzept: 'html.ol', type: 'fill', text: 'Die Rangliste soll bei Platz 3 beginnen. Welches Attribut fehlt?', template: '<ol ___="3">', accept: ['start'], hint: 'Das Attribut heißt wie das englische Wort für Anfang.' },
    { id: '04-08', konzept: 'html.ol', type: 'bug', text: 'Eine Zeile passt nicht zur nummerierten Liste. Welche?', lines: ['<ol>', '  <li>Teig kneten</li>', '  <li>Belegen</li>', '</ul>'], line: 3, explanation: 'Was mit `<ol>` beginnt, endet mit `</ol>` – nicht mit `</ul>`.' },
    { id: '04-09', konzept: 'html.ol', type: 'quiz', question: 'Du fügst in eine nummerierte Liste in der Mitte einen Schritt ein. Was passiert mit den Nummern?', options: ['Der Browser nummeriert automatisch neu durch', 'Zwei Schritte haben jetzt dieselbe Nummer', 'Der neue Schritt bekommt keine Nummer'], correct: 0, explanation: 'Nummern tippst du nie selbst – der Browser zählt bei jeder Anzeige neu.' },
    { id: '04-10', konzept: 'html.ol', type: 'pair', text: 'Was zeigt der Browser an?', pairs: [['`<ol>`', '1., 2., 3. …'], ['`<ol start="5">`', '5., 6., 7. …'], ['`<ul>`', '• • •']] },
    { id: '04-11', konzept: 'html.liste-verschachtelt', type: 'quiz', question: 'Wo steht eine innere Liste?', options: ['Im Listenpunkt, vor dessen schließendem Tag', 'Nach dem schließenden Tag des Listenpunkts', 'Direkt in der äußeren Liste zwischen zwei Punkten'], correct: 0, explanation: 'Die innere Liste gehört zum Punkt – sie steht in seinem `<li>`, vor `</li>`.' },
    { id: '04-12', konzept: 'html.liste-verschachtelt', type: 'order', text: 'Sortiere die verschachtelte Liste.', lines: ['<ol>', '  <li>Technik', '    <ul>', '      <li>Powerbank</li>', '    </ul>', '  </li>', '</ol>'] },
    { id: '04-13', konzept: 'html.liste-verschachtelt', type: 'bug', text: 'Die innere Liste hängt nicht im Punkt „Snacks“. Welche Zeile ist falsch?', lines: ['<ul>', '  <li>Snacks</li>', '  <ul>', '    <li>Chips</li>', '  </ul>', '</ul>'], line: 1, explanation: 'Der Punkt wird zu früh geschlossen: Die innere Liste muss vor `</li>` stehen.' },
    { id: '04-14', konzept: 'html.liste-verschachtelt', type: 'fill', text: 'Welcher Tag fehlt nach der inneren Liste? (Mit spitzen Klammern.)', template: '<ul>\n  <li>Getränke\n    <ul>\n      <li>Cola</li>\n    </ul>\n  ___\n</ul>', accept: ['</li>'], hint: 'Nach der inneren Liste wird der äußere Punkt geschlossen.' },
    { id: '04-15', konzept: 'html.ul', type: 'quiz', question: 'Welche Zeile ist ein korrekter Listenpunkt?', options: ['`<li>Cola</li>`', '`<ul>Cola</ul>`', '`<item>Cola</item>`'], correct: 0, explanation: 'Ein Punkt ist `<li>…</li>`. `<ul>` ist nur der Behälter, `<item>` gibt es nicht.' },
    { id: '04-16', konzept: 'html.ul', type: 'bug', text: 'Zwischen „Schlafsack“ und „Powerbank“ erscheint ein leerer Punkt. Welche Zeile ist falsch?', lines: ['<ul>', '  <li>Zelt</li>', '  <li>Schlafsack<li>', '  <li>Powerbank</li>', '</ul>'], line: 2, explanation: 'Dem schließenden Tag fehlt der Schrägstrich: `</li>`.' },
    { id: '04-17', konzept: 'html.liste-verschachtelt', type: 'quiz', question: 'Darf eine nummerierte Liste in einem Punkt einer Punkteliste stehen?', options: ['Ja – ul und ol lassen sich beliebig verschachteln', 'Nein – nur gleiche Listen dürfen ineinander', 'Nein – Listen dürfen gar nicht ineinander'], correct: 0, explanation: 'Jede Liste darf in einem `<li>` stehen – egal ob Punkte oder Nummern.' },
    { id: '04-18', konzept: 'html.ol', type: 'fill', text: 'Vervollständige die nummerierte Liste.', template: '<ol>\n  <li>Sehtest</li>\n  <___>Erste-Hilfe-Kurs</li>\n</ol>', accept: ['li'], hint: 'Jeder Schritt ist ein Listenpunkt – gleiches Element wie in der Punkteliste.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '04-listen',
  title: 'Abnahme: Programm-Tafel',
  intro: 'Zeig mir die Tafel! Line-up nach Bühnen, Foodtrucks, Anfahrt – wenn das alles sauber in Listen steht, kriegt ihr von mir einen Bubble Tea. Wenn nicht … auch, aber erst nach der Nachbesserung.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'html.ul', type: 'quiz', question: 'Sam will die vier Foodtrucks als Punkte ohne Nummern zeigen. Welche Elemente braucht die Liste?', options: ['`<ul>` als Behälter, `<li>` für jeden Truck', '`<ol>` als Behälter, `<p>` für jeden Truck', '`<li>` als Behälter, `<ul>` für jeden Truck'], correct: 0, explanation: 'Behälter `<ul>`, darin ein `<li>` pro Truck.' },
    { konzept: 'html.entity', type: 'fill', text: 'Vervollständige den Truck-Namen – das &-Zeichen in HTML-Schreibweise.', template: '<li>Pizza ___ Mehr</li>', accept: ['&amp;'] },
    { konzept: 'html.liste-verschachtelt', type: 'order', text: 'Sortiere die verschachtelte Liste.', lines: ['<ul>', '  <li>Zeltbühne', '    <ol>', '      <li>Kiki Volt</li>', '    </ol>', '  </li>', '</ul>'] },
    {
      type: 'code',
      task: 'Die Tafel für den Pizza-Abend: 1. **Erstelle** unter „Einkaufen“ eine Liste mit Punkten: „Mehl“, „Tomaten“, „Mozzarella“. 2. **Erstelle** unter „So geht es“ eine nummerierte Liste: „Teig kneten“, „Belegen“, „Backen“.',
      starter: { html: '<h1>Pizza-Abend</h1>\n<h2>Einkaufen</h2>\n\n<h2>So geht es</h2>\n\n' },
      solution: { html: '<h1>Pizza-Abend</h1>\n<h2>Einkaufen</h2>\n<ul>\n  <li>Mehl</li>\n  <li>Tomaten</li>\n  <li>Mozzarella</li>\n</ul>\n\n<h2>So geht es</h2>\n<ol>\n  <li>Teig kneten</li>\n  <li>Belegen</li>\n  <li>Backen</li>\n</ol>\n' },
      tests: [
        { type: 'selector', selector: 'ul > li', count: 3, label: 'Die Einkaufsliste hat drei Punkte' },
        { type: 'selector', selector: 'ol > li', count: 3, label: 'Die Anleitung hat drei nummerierte Schritte' },
        { type: 'order', selectors: ['h2:nth-of-type(1)', 'ul', 'h2:nth-of-type(2)', 'ol'], label: 'Einkaufsliste unter „Einkaufen“, Anleitung unter „So geht es“' },
        { type: 'text', selector: 'ul > li:first-child', expected: 'Mehl', label: 'Die erste Zutat ist Mehl' },
        { type: 'text', selector: 'ol > li:last-child', expected: 'Backen', label: 'Der letzte Schritt ist Backen' },
      ],
    },
    { konzept: 'html.grundgeruest', type: 'quiz', question: 'Welcher Text erscheint im Browser-Tab – und wo steht er im Quelltext?', options: ['Der Inhalt von `<title>` – im `<head>`', 'Die `<h1>`-Überschrift – im `<body>`', 'Der erste Absatz – im `<body>`'], correct: 0, explanation: 'Der Titel im Kopfbereich landet im Tab; die `<h1>` steht sichtbar auf der Seite.' },
    { konzept: 'html.ol', type: 'bug', text: 'Die Anfahrt soll nummeriert sein, doch die Liste endet falsch. Welche Zeile?', lines: ['<ol>', '  <li>Stadtbahn nehmen</li>', '  <li>Lichtern folgen</li>', '</ul>'], line: 3, explanation: '`<ol>` wird mit `</ol>` geschlossen.' },
    { konzept: 'html.strong-em', type: 'pair', text: 'Ordne zu.', pairs: [['`<strong>`', 'starke Betonung'], ['`<em>`', 'leichte Betonung'], ['`<br>`', 'Zeilenumbruch im Absatz'], ['`<hr>`', 'Trennlinie'], ['`<!-- … -->`', 'Kommentar, nur im Quelltext']] },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** die Packliste: Ab dem ersten Eintrag ist die ganze Liste fett, und „Powerbank“ hat keinen Aufzählungspunkt. Am Ende: vier Punkte, fett ist nur das Wort „Wichtig:“.',
      starter: { html: '<h2>Packliste</h2>\n<ul>\n  <li><strong>Wichtig: Ticket</li>\n  <li>Zelt</li>\n  <p>Powerbank</p>\n  <li>Regenjacke</li>\n</ul>\n' },
      solution: { html: '<h2>Packliste</h2>\n<ul>\n  <li><strong>Wichtig:</strong> Ticket</li>\n  <li>Zelt</li>\n  <li>Powerbank</li>\n  <li>Regenjacke</li>\n</ul>\n' },
      tests: [
        { type: 'selector', selector: 'strong', count: 1, label: 'Nur eine Stelle ist fett' },
        { type: 'text', selector: 'strong', expected: 'Wichtig:', label: 'Fett ist genau „Wichtig:“' },
        { type: 'selector', selector: 'ul > li', count: 4, label: 'Die Liste hat vier Punkte' },
        { type: 'selector', selector: 'ul p', count: 0, label: 'Kein Absatz in der Liste' },
        { type: 'text', selector: 'ul > li:first-child', expected: 'Wichtig: Ticket', label: 'Der erste Punkt lautet „Wichtig: Ticket“' },
      ],
    },
    { konzept: 'html.ol', type: 'fill', text: 'Die Schritte sollen nummeriert erscheinen.', template: '<___>\n  <li>Ticket kaufen</li>\n  <li>Hinfahren</li>\n</___>', accept: [['ol'], ['ol']] },
    { konzept: 'html.attribut', type: 'quiz', question: 'In `<html lang="de">` – welcher Teil ist der **Wert** des Attributs?', options: ['`de`', '`lang`', '`html`'], correct: 0, explanation: '`lang` ist der Attributname, `de` sein Wert, `html` der Tag.' },
    { konzept: 'html.liste-verschachtelt', type: 'quiz', question: 'Die Hauptbühne bekommt eine eigene Liste ihrer Acts. Wo steht diese innere Liste?', options: ['Im Listenpunkt „Hauptbühne“, vor dessen schließendem Tag', 'Direkt nach dem schließenden Tag von „Hauptbühne“', 'In einem Absatz unter der äußeren Liste'], correct: 0, explanation: 'Die innere Liste gehört in das `<li>` hinein – erst danach wird der Punkt geschlossen.' },
  ],
});
console.log('Kapitel 04 geschrieben');
