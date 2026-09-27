// Kapitel 03 – Text (Station „Textbanner“).
// Erzeugt public/content/chapters/03-text/{lessons/*.json,pool.json,boss.json}
// Aufruf: node content-src/kapitel-03.mjs
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '03-text');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Lektion 1: Überschriften bilden die Gliederung (Ebenen, nicht Größen)
const FIG_HIERARCHIE = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">Überschriften = Gliederung der Seite</text><rect x="16" y="36" width="176" height="24" rx="5" fill="#ff7a45"/><text x="26" y="53" fill="#0f1320" font-weight="bold" font-family="monospace" font-size="13">h1 Sneaker-Blog</text><rect x="40" y="68" width="152" height="22" rx="5" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="50" y="84" fill="#eef2ff" font-family="monospace">h2 Neu im Regal</text><rect x="64" y="98" width="128" height="22" rx="5" fill="#1b2135" stroke="#ff7a45" stroke-width="1.5"/><text x="74" y="114" fill="#eef2ff" font-family="monospace">h3 Laufschuhe</text><rect x="40" y="128" width="152" height="22" rx="5" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="50" y="144" fill="#eef2ff" font-family="monospace">h2 Pflege-Tipps</text><text x="204" y="53" fill="#ffd84d">nur 1× pro Seite</text><text x="204" y="84" fill="#38c7ff">eine Ebene tiefer</text><text x="204" y="114" fill="#38c7ff">noch eine tiefer</text><text x="204" y="144" fill="#4ade80">wieder Ebene 2</text></svg>`;

// Lektion 2: Enter im Quelltext zählt nicht – <br> bricht um
const FIG_UMBRUCH = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="78" y="20" text-anchor="middle" fill="#eef2ff" font-weight="bold">Quelltext</text><text x="246" y="20" text-anchor="middle" fill="#eef2ff" font-weight="bold">Browser</text><rect x="10" y="30" width="136" height="50" rx="6" fill="#1b2135"/><text x="16" y="50" fill="#ff7a45" font-family="monospace">&lt;p&gt;Pizza Luna</text><text x="16" y="70" fill="#ff7a45" font-family="monospace">Hafenweg 4&lt;/p&gt;</text><path d="M150 55 H172" stroke="#ffd84d" stroke-width="2"/><text x="178" y="59" fill="#eef2ff">Pizza Luna Hafenweg 4</text><rect x="10" y="98" width="136" height="50" rx="6" fill="#1b2135"/><text x="16" y="118" fill="#ff7a45" font-family="monospace">&lt;p&gt;Pizza Luna<tspan fill="#38c7ff">&lt;br&gt;</tspan></text><text x="16" y="138" fill="#ff7a45" font-family="monospace">Hafenweg 4&lt;/p&gt;</text><path d="M150 123 H172" stroke="#ffd84d" stroke-width="2"/><text x="178" y="118" fill="#eef2ff">Pizza Luna</text><text x="178" y="138" fill="#eef2ff">Hafenweg 4</text></svg>`;

// Lektion 3: strong/em – HTML sagt, was es bedeutet; der Browser stellt es dar
const FIG_BEDEUTUNG = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">HTML sagt, was es bedeutet</text><rect x="8" y="36" width="184" height="30" rx="6" fill="#1b2135"/><text x="14" y="56" fill="#ff7a45" font-family="monospace">&lt;strong&gt;wichtig&lt;/strong&gt;</text><path d="M198 51 H220" stroke="#ffd84d" stroke-width="2"/><text x="228" y="56" fill="#eef2ff" font-weight="bold" font-size="14">wichtig</text><text x="228" y="72" fill="#38c7ff">zeigt fett</text><rect x="8" y="88" width="184" height="30" rx="6" fill="#1b2135"/><text x="14" y="108" fill="#ff7a45" font-family="monospace">&lt;em&gt;betont&lt;/em&gt;</text><path d="M198 103 H220" stroke="#ffd84d" stroke-width="2"/><text x="228" y="108" fill="#eef2ff" font-style="italic" font-size="14">betont</text><text x="228" y="124" fill="#38c7ff">zeigt kursiv</text><text x="160" y="150" text-anchor="middle" fill="#4ade80">Aussehen ändert später CSS</text></svg>`;

/* ---------- Lektion 1: Überschriften ---------- */
schreibe('lessons/01-ueberschriften.json', {
  id: '01-ueberschriften',
  title: 'Überschriften',
  konzepte: ['html.ueberschrift'],
  steps: [
    {
      type: 'explain',
      text: 'Sam schickt den Text für die Startseite: ein einziger Block, keine Zwischentitel. Niemand liest das freiwillig.\n\nStruktur kommt von **Überschriften**. Die `<h1>` kennst du schon – sie hat fünf Geschwister: `<h1>` bis `<h6>`. Die Zahl ist die **Ebene**: 1 ist die wichtigste, 6 die unwichtigste. Zusammen bilden sie die Gliederung der Seite – wie das Inhaltsverzeichnis eines Buchs.',
      figure: FIG_HIERARCHIE,
    },
    {
      type: 'example',
      text: 'Ein Trainingsplan mit drei Ebenen. **Ändere** bei „Aufwärmen“ die 3 in beiden Tags zu 6 und beobachte die Größe. Dann setz sie zurück auf 3: Die Zahl sagt, wie wichtig eine Überschrift ist – die Größe ändern wir später mit CSS.',
      html: '<h1>Mein Trainingsplan</h1>\n<h2>Montag</h2>\n<h3>Aufwärmen</h3>\n<p>10 Minuten lockeres Laufen.</p>\n<h3>Kraft</h3>\n<p>3 Sätze Kniebeugen, 3 Sätze Liegestütze.</p>\n<h2>Mittwoch</h2>\n<p>Ruhetag – Dehnen reicht.</p>\n',
    },
    {
      type: 'quiz',
      question: 'Was bedeutet die 2 in `<h2>`?',
      options: ['Ebene 2 – eine Stufe unter der Hauptüberschrift', 'Die Überschrift ist doppelt so groß wie der Text', 'Es ist die zweite Überschrift auf der Seite', 'Die Überschrift darf höchstens zwei Wörter haben'],
      correct: 0,
      explanation: 'Die Zahl ist die Ebene in der Gliederung. Wie groß die Überschrift aussieht, legt später CSS fest – und wie viele h2 es auf der Seite gibt, ist egal.',
    },
    {
      type: 'code',
      task: '**Ergänze** vor dem zweiten Absatz eine Zwischenüberschrift der Ebene 2 mit dem Text „Handhabung“.',
      starter: {
        html: '<h1>Controller-Check</h1>\n<p>Wir haben drei Controller eine Woche lang getestet.</p>\n<p>Der Griff ist gummiert, nichts rutscht – auch nach zwei Stunden nicht.</p>\n',
      },
      hints: [
        'Zwischenüberschriften stehen eine Ebene unter der Hauptüberschrift – das ist die Ebene 2.',
        'Das Tag-Paar sieht aus wie bei der Hauptüberschrift, nur mit einer anderen Zahl – in beiden Tags dieselbe.',
        'Eine neue Zeile zwischen den beiden Absätzen: `<h…>Text</h…>` – die Ebene als Zahl, dazwischen der Text aus der Aufgabe.',
      ],
      solution: {
        html: '<h1>Controller-Check</h1>\n<p>Wir haben drei Controller eine Woche lang getestet.</p>\n<h2>Handhabung</h2>\n<p>Der Griff ist gummiert, nichts rutscht – auch nach zwei Stunden nicht.</p>\n',
      },
      tests: [
        { type: 'text', selector: 'h2', expected: 'Handhabung', label: 'Die Zwischenüberschrift lautet „Handhabung“' },
        { type: 'order', selectors: ['p', 'h2', 'p:nth-of-type(2)'], label: 'Sie steht zwischen den beiden Absätzen' },
        { type: 'selector', selector: 'h1', count: 1, label: 'Die Hauptüberschrift bleibt die einzige h1' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Drei Regeln für eine saubere Gliederung:\n\n- **Nur eine `<h1>`** pro Seite – sie sagt, worum es geht.\n- **Keine Ebene überspringen:** nach `<h1>` kommt `<h2>`, darunter `<h3>` – nie direkt `<h3>`.\n- **Ebene nach Bedeutung wählen**, nicht nach Größe. Groß oder klein macht später CSS.\n\n```html\n<h1>Pizza-Blog</h1>\n<h2>Teig</h2>\n<h3>Ruhezeit</h3>\n<h2>Belag</h2>\n```',
    },
    {
      type: 'fill',
      text: 'Vervollständige die Gliederung: Unter der Hauptüberschrift folgt die nächste Ebene.',
      template: '<h1>Sneaker-Blog</h1>\n<___>Neu im Regal</___>',
      accept: [['h2'], ['h2']],
      hint: 'Keine Ebene überspringen – nach der 1 kommt die 2, im öffnenden und im schließenden Tag.',
    },
    {
      type: 'code',
      task: '**Ergänze** im Abschnitt „Woche 1“ zwei Unterüberschriften der Ebene 3: „Montag“ vor dem ersten Absatz und „Dienstag“ vor dem zweiten.',
      starter: {
        html: '<h1>Praktikumsbericht: Fahrradwerkstatt</h1>\n<h2>Woche 1</h2>\n<p>Werkstatt kennengelernt, Reifen geflickt, Kaffee gekocht.</p>\n<p>Zum ersten Mal Bremsen eingestellt – unter Aufsicht.</p>\n',
      },
      hints: [
        'Unter einer Überschrift der Ebene 2 kommt als Nächstes die Ebene 3.',
        'Zwei neue Zeilen, jede direkt vor ihrem Absatz – mit derselben Zahl im öffnenden und im schließenden Tag.',
        'Muster aus einem anderen Kontext: `<h3>Aufwärmen</h3>` vor dem passenden Absatz – hier mit den Wochentagen.',
      ],
      solution: {
        html: '<h1>Praktikumsbericht: Fahrradwerkstatt</h1>\n<h2>Woche 1</h2>\n<h3>Montag</h3>\n<p>Werkstatt kennengelernt, Reifen geflickt, Kaffee gekocht.</p>\n<h3>Dienstag</h3>\n<p>Zum ersten Mal Bremsen eingestellt – unter Aufsicht.</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'h3', count: 2, label: 'Es gibt zwei Unterüberschriften der Ebene 3' },
        { type: 'text', selector: 'h3', expected: 'Montag', label: 'Die erste lautet „Montag“' },
        { type: 'text', selector: 'h3:nth-of-type(2)', expected: 'Dienstag', label: 'Die zweite lautet „Dienstag“' },
        { type: 'order', selectors: ['h2', 'h3', 'p', 'h3:nth-of-type(2)', 'p:nth-of-type(2)'], label: 'Jede Unterüberschrift steht direkt vor ihrem Absatz' },
        { type: 'selector', selector: 'h2', count: 1, label: '„Woche 1“ bleibt die einzige Überschrift der Ebene 2' },
      ],
    },
    {
      type: 'order',
      text: 'Ein Rezept mit Gliederung. Sortiere: Hauptüberschrift, dann jeder Arbeitsschritt als Zwischenüberschrift mit seinem Absatz – in der Reihenfolge, in der man eine Pizza macht.',
      lines: ['<h1>Pizza selbst machen</h1>', '<h2>Teig</h2>', '<p>Mehl, Wasser, Hefe, Salz – eine Stunde gehen lassen.</p>', '<h2>Belag</h2>', '<p>Tomatensoße, Käse und was du magst.</p>', '<h2>Backen</h2>', '<p>Bei 250 Grad etwa zehn Minuten.</p>'],
      explanation: 'Erst die h1, dann die Abschnitte: Jede h2 eröffnet einen Schritt, der Absatz dazu folgt direkt darunter.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: 'Die Watchlist hat zwei Hauptüberschriften, und unter der ersten springt die Ebene von 1 direkt auf 3. **Korrigiere** die Gliederung: „Serien“ und „Filme“ sind gleichrangige Zwischenüberschriften unter „Meine Watchlist“.',
      starter: {
        html: '<h1>Meine Watchlist</h1>\n<p>Serien und Filme für die Sommerferien.</p>\n<h3>Serien</h3>\n<p>Drei Staffeln in einer Woche – machbar.</p>\n<h1>Filme</h1>\n<p>Für Regentage, mit Popcorn.</p>\n',
      },
      hints: [
        'Eine Seite hat genau eine Hauptüberschrift. Welche der beiden ist das Thema der ganzen Seite?',
        'Gleichrangig heißt: gleiche Ebene. Direkt unter Ebene 1 kommt Ebene 2 – für beide Abschnitte.',
        'Zwei Tag-Paare bekommen eine neue Zahl – jeweils im öffnenden und im schließenden Tag.',
      ],
      solution: {
        html: '<h1>Meine Watchlist</h1>\n<p>Serien und Filme für die Sommerferien.</p>\n<h2>Serien</h2>\n<p>Drei Staffeln in einer Woche – machbar.</p>\n<h2>Filme</h2>\n<p>Für Regentage, mit Popcorn.</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'h1', count: 1, label: 'Es gibt genau eine Hauptüberschrift' },
        { type: 'text', selector: 'h1', expected: 'Meine Watchlist', label: 'Die Hauptüberschrift lautet „Meine Watchlist“' },
        { type: 'selector', selector: 'h2', count: 2, label: '„Serien“ und „Filme“ sind Zwischenüberschriften der Ebene 2' },
        { type: 'text', selector: 'h2', expected: 'Serien', label: 'Die erste Zwischenüberschrift ist „Serien“' },
        { type: 'text', selector: 'h2:nth-of-type(2)', expected: 'Filme', label: 'Die zweite ist „Filme“' },
        { type: 'selector', selector: 'h3', count: 0, label: 'Keine Ebene wird übersprungen' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website! Sam wünscht sich einen Abschnitt „Das Festival“, der erklärt, wer das Ganze organisiert.\n\nEin Abschnitt beginnt mit einer Zwischenüberschrift: eine Ebene unter „FUNKEN“, denn die Hauptüberschrift bleibt die einzige auf der Seite. Die neue Überschrift kommt unter die drei Absätze – der Text dazu folgt in der nächsten Lektion.',
    },
    { type: 'code', etappe: '03-text/01-ueberschriften' },
  ],
});

/* ---------- Lektion 2: Absätze, Umbrüche, Linien ---------- */
schreibe('lessons/02-absaetze-umbrueche-linien.json', {
  id: '02-absaetze-umbrueche-linien',
  title: 'Absätze, Umbrüche & Linien',
  konzepte: ['html.absatz', 'html.br-hr'],
  steps: [
    {
      type: 'explain',
      text: 'Sam schickt die Adresse – drei Zeilen. Du tippst sie ab, drückst Enter … und der Browser zeigt alles in **einer** Zeile.\n\nDer Browser ignoriert Zeilenumbrüche und mehrfache Leerzeichen im Quelltext. Ein **Absatz** `<p>` ist ein Textblock mit Abstand darüber und darunter. Für einen Umbruch *innerhalb* des Absatzes gibt es ein eigenes Tag: `<br>` (*break*).',
      figure: FIG_UMBRUCH,
    },
    {
      type: 'example',
      text: 'Beide Absätze stehen im Quelltext auf zwei Zeilen – in der Vorschau nicht. **Setze** im ersten Absatz direkt hinter „liefern“ ein `<br>` und beobachte die Vorschau. Dann lösche testweise das `<p>`-Paar um „Mindestbestellwert“: Was passiert mit dem Abstand?',
      html: '<h1>Pizza Luna</h1>\n<p>Wir liefern\nbis 22 Uhr.</p>\n<p>Mindestbestellwert:\n10 Euro.</p>\n',
    },
    {
      type: 'quiz',
      question: 'Im Quelltext steht ein Satz auf drei Zeilen – mit Enter getrennt. Was zeigt der Browser?',
      options: ['Eine Zeile – Umbrüche im Quelltext zählen nicht', 'Drei Zeilen, genau wie im Quelltext', 'Drei Absätze mit Abstand dazwischen', 'Gar nichts, weil das ein Fehler ist'],
      correct: 0,
      explanation: 'Der Browser fasst Zeilenumbrüche und Leerzeichen zu einem einzigen Leerzeichen zusammen. Einen sichtbaren Umbruch bekommst du nur mit `<br>` oder einem neuen Absatz.',
    },
    {
      type: 'code',
      task: '**Strukturiere** den Text in zwei Absätze: Der erste enthält nur den Satz über die erste Staffel, der zweite den Satz über die zweite Staffel.',
      starter: {
        html: '<h1>Serien-Tipp: Nachtwache</h1>\n<p>Die erste Staffel spielt in einem Krankenhaus in Berlin. Die zweite Staffel wechselt nach Hamburg und wird deutlich düsterer.</p>\n',
      },
      hints: [
        'Jeder Absatz ist ein eigenes Element mit öffnendem und schließendem Tag.',
        'Schließe den ersten Absatz nach „Berlin.“ und öffne für den zweiten Satz einen neuen.',
        'Am Ende stehen zwei Absätze untereinander: `<p>…</p>` und noch einmal `<p>…</p>`, jeweils mit einem Satz.',
      ],
      solution: {
        html: '<h1>Serien-Tipp: Nachtwache</h1>\n<p>Die erste Staffel spielt in einem Krankenhaus in Berlin.</p>\n<p>Die zweite Staffel wechselt nach Hamburg und wird deutlich düsterer.</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'p', count: 2, label: 'Es gibt zwei Absätze' },
        { type: 'text', selector: 'p', expected: 'Die erste Staffel spielt in einem Krankenhaus in Berlin.', label: 'Der erste Absatz enthält nur den Satz über Staffel 1' },
        { type: 'text', selector: 'p:nth-of-type(2)', expected: 'Die zweite Staffel wechselt nach Hamburg und wird deutlich düsterer.', label: 'Der zweite Absatz enthält den Satz über Staffel 2' },
      ],
    },
    {
      type: 'explain',
      text: '`<br>` hat keinen Inhalt und darum auch **keinen schließenden Tag**. Solche Tags heißen **Leerelemente**. Ein zweites brauchst du oft: `<hr>` (*horizontal rule*) – eine Trennlinie zwischen zwei Themen.\n\n```html\n<p>Öffnungszeiten:<br>Mo–Fr 10–18 Uhr</p>\n<hr>\n<p>Sneaker-Store · Kaiserstraße 12</p>\n```\n\nWichtig: `<br>` ist nur für Umbrüche *im* Text, etwa bei Adressen. Für Abstand zwischen Textblöcken nimmst du Absätze – nie mehrere `<br>` hintereinander.',
    },
    {
      type: 'fill',
      text: 'Vervollständige: Lücke 1 bricht die Zeile innerhalb des Absatzes um, Lücke 2 zieht darunter eine Trennlinie.',
      template: '<p>Mo–Fr 10–18 Uhr<___>Sa 10–14 Uhr</p>\n<___>',
      accept: [['br'], ['hr']],
      hint: 'Beide sind Leerelemente – nur ein Tag, kein schließender. Umbruch = break, Linie = horizontal rule.',
    },
    {
      type: 'code',
      task: '**Ergänze** unter dem Absatz die Adresse als einen einzigen Absatz mit drei Zeilen: Pizza Luna, Bahnhofstraße 4, 74072 Heilbronn.',
      starter: {
        html: '<h1>Pizza Luna – Lieferservice</h1>\n<p>Wir liefern täglich bis 22 Uhr.</p>\n',
      },
      hints: [
        'Ein Absatz, drei Zeilen: Der Umbruch innerhalb eines Absatzes braucht ein eigenes Leerelement.',
        'Das Umbruch-Tag steht direkt am Ende der Zeile, ohne schließenden Tag – so wie bei `Öffnungszeiten:<br>Mo–Fr`.',
        'Struktur: `<p>Zeile 1<br>Zeile 2<br>Zeile 3</p>` – mit Name, Straße und Ort aus der Aufgabe.',
      ],
      solution: {
        html: '<h1>Pizza Luna – Lieferservice</h1>\n<p>Wir liefern täglich bis 22 Uhr.</p>\n<p>Pizza Luna<br>Bahnhofstraße 4<br>74072 Heilbronn</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'p', count: 2, label: 'Es gibt zwei Absätze' },
        { type: 'selector', selector: 'p:nth-of-type(2) br', count: 2, label: 'Der Adress-Absatz hat zwei Zeilenumbrüche' },
        { type: 'text', selector: 'p:nth-of-type(2)', expected: 'Pizza Luna Bahnhofstraße 4 74072 Heilbronn', label: 'Die Adresse ist vollständig: Name, Straße, Ort' },
      ],
    },
    {
      type: 'order',
      text: 'Ein Flyer für den Pizza-Laden. Sortiere: Überschrift, ein Absatz, dann trennt eine Linie den Text von der Adresse (Name, Straße, Ort).',
      lines: ['<h1>Pizza Luna</h1>', '<p>Wir liefern bis 22 Uhr.</p>', '<hr>', '<p>Pizza Luna<br>', 'Bahnhofstraße 4<br>', '74072 Heilbronn</p>'],
      explanation: 'Die Linie steht zwischen Text und Adresse. Die Adresse ist ein Absatz: öffnender Tag vor dem Namen, schließender Tag hinter dem Ort, dazwischen die Umbrüche.',
    },
    {
      type: 'code',
      task: '**Erweitere** den Flyer: Unter dem Absatz kommt eine Trennlinie, darunter ein Absatz mit den Eckdaten in drei Zeilen: „Wann: 12. Juni“, „Wo: Sporthalle“, „Start: 14 Uhr“.',
      starter: {
        html: '<h1>Schulturnier: Fußball</h1>\n<p>Alle Klassen, ein Pokal – meldet euch bis Freitag im Sekretariat an.</p>\n',
      },
      hints: [
        'Zwei Leerelemente kommen vor: eins für die Linie, eins für die Umbrüche im Text.',
        'Die Linie ist eine eigene Zeile zwischen den beiden Absätzen; die drei Eckdaten stehen in EINEM Absatz.',
        'Reihenfolge: Absatz, Linie, Absatz mit zwei Umbrüchen – wie bei einer Adresse.',
      ],
      solution: {
        html: '<h1>Schulturnier: Fußball</h1>\n<p>Alle Klassen, ein Pokal – meldet euch bis Freitag im Sekretariat an.</p>\n<hr>\n<p>Wann: 12. Juni<br>Wo: Sporthalle<br>Start: 14 Uhr</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'hr', count: 1, label: 'Es gibt eine Trennlinie' },
        { type: 'order', selectors: ['p', 'hr'], label: 'Die Linie steht unter dem ersten Absatz' },
        { type: 'selector', selector: 'hr + p br', count: 2, label: 'Der Absatz nach der Linie hat zwei Zeilenumbrüche' },
        { type: 'text', selector: 'hr + p', expected: 'Wann: 12. Juni Wo: Sporthalle Start: 14 Uhr', label: 'Die Eckdaten sind vollständig' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Ab zur FUNKEN-Website. Unter „Das Festival“ fehlt noch der Text: zwei Absätze – wer FUNKEN organisiert und wohin der Erlös geht.\n\nDanach kommt der Kontakt: eine Trennlinie, damit die Adresse sichtbar vom Rest getrennt ist, und die Adresse selbst als ein Absatz mit drei Zeilen. Genau wie beim Pizza-Flyer – nur mit Sams Adresse.',
    },
    { type: 'code', etappe: '03-text/02-absaetze-umbrueche-linien' },
  ],
});

/* ---------- Lektion 3: Hervorheben und Kommentare ---------- */
schreibe('lessons/03-hervorheben-und-kommentare.json', {
  id: '03-hervorheben-und-kommentare',
  title: 'Hervorheben & Kommentare',
  konzepte: ['html.strong-em', 'html.kommentar', 'html.entity'],
  steps: [
    {
      type: 'explain',
      text: 'Sam: „Das Wort *kostenlos* muss knallen!“ Fett machen – aber wie?\n\nHTML markiert **Bedeutung**, nicht Aussehen. Zwei Elemente:\n\n- `<strong>` – **wichtig**. Der Browser zeigt es fett.\n- `<em>` – **betont**, wie beim Sprechen (*emphasis*). Der Browser zeigt es kursiv.\n\nWie es am Ende aussieht, bestimmt später CSS. Eine Vorlese-Software liest beide Elemente hörbar anders vor.',
      figure: FIG_BEDEUTUNG,
    },
    {
      type: 'example',
      text: '**Tausche** im zweiten Absatz die beiden Elemente: „ausverkauft“ bekommt `<em>`, „fast“ bekommt `<strong>`. Beobachte, wie Fett und Kursiv wechseln – und überleg, welche Version die Bedeutung besser trifft.',
      html: '<h1>Sneaker-Drop am Samstag</h1>\n<p>Um 10 Uhr öffnen wir die Türen.</p>\n<p>Die Größe 42 ist <strong>ausverkauft</strong>, 43 ist <em>fast</em> weg.</p>\n',
    },
    {
      type: 'quiz',
      question: 'Auf einer Ticket-Seite steht: „Der Eintritt ist frei.“ Das Wort „frei“ ist die wichtigste Info. Welches Element?',
      options: ['`<strong>` – es bedeutet: wichtig', '`<em>` – es bedeutet: betont wie beim Sprechen', '`<h6>` – die kleinste Überschrift', 'Keins – Großbuchstaben reichen'],
      correct: 0,
      explanation: 'Wichtige Information ist `<strong>`. `<em>` betont ein Wort wie beim Sprechen, eine Überschrift ist es nicht – und GROSSBUCHSTABEN tragen für den Browser keine Bedeutung.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Absatz: Das Wort „kostenlos“ wird als wichtig markiert (stark betont).',
      starter: {
        html: '<h1>Fitness-Studio Neckarblick</h1>\n<p>Das Probetraining ist kostenlos – einfach vorbeikommen.</p>\n',
      },
      hints: [
        'Für wichtige Wörter gibt es ein eigenes Element – es zeigt Bedeutung, der Browser macht es fett.',
        'Das Element wird um das Wort herumgelegt, mitten im Absatz – wie `<em>fast</em>` im Beispiel, nur mit dem Element für „wichtig“.',
        'Öffnender Tag direkt vor dem Wort, schließender direkt dahinter – der restliche Satz bleibt, wie er ist.',
      ],
      solution: {
        html: '<h1>Fitness-Studio Neckarblick</h1>\n<p>Das Probetraining ist <strong>kostenlos</strong> – einfach vorbeikommen.</p>\n',
      },
      tests: [
        { type: 'text', selector: 'strong', expected: 'kostenlos', label: '„kostenlos“ ist stark betont' },
        { type: 'text', selector: 'p', expected: 'Das Probetraining ist kostenlos – einfach vorbeikommen.', label: 'Der Satz bleibt lesbar' },
        { type: 'selector', selector: 'p strong', count: 1, label: 'Die Betonung liegt im Absatz' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Manchmal willst du dir im Quelltext eine Notiz machen – für dich oder das Team. Dafür gibt es **Kommentare**: Der Browser zeigt sie nicht an. Auf der FUNKEN-Startseite steht schon einer.\n\n```html\n<!-- Preise noch mit Sam abstimmen -->\n<p>Tagesticket: 12 Euro</p>\n```\n\nEin Kommentar beginnt mit `<!--` und endet mit `-->`. Vergiss das Ende nicht – sonst schluckt der Kommentar alles, was danach kommt. Du kannst damit auch Code kurz „ausschalten“, ohne ihn zu löschen.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Kommentar, damit der Browser die Notiz nicht anzeigt.',
      template: '___ Fotos kommen nach dem Festival ___\n<h2>Galerie</h2>',
      accept: [['<!--'], ['-->']],
      hint: 'Anfang: spitze Klammer, Ausrufezeichen, zwei Striche. Ende: zwei Striche und die schließende Klammer.',
    },
    {
      type: 'code',
      task: 'Zwei Aufgaben für die Studio-Seite:\n\n1. **Gestalte** den ersten Absatz: „jeden Tag“ wird leicht betont.\n2. **Ergänze** über dem zweiten Absatz einen Kommentar mit dem Text „Preise prüfen“.',
      starter: {
        html: '<h1>Fitness-Studio Neckarblick</h1>\n<p>Geöffnet jeden Tag von 6 bis 23 Uhr.</p>\n<p>Monatsbeitrag: 29 Euro, Schüler zahlen 19 Euro.</p>\n',
      },
      hints: [
        'Leichte Betonung ist das zweite Element aus dem Beispiel – nicht das für „wichtig“.',
        'Der Kommentar ist eine eigene Zeile zwischen den Absätzen; er beginnt mit `<!--` und endet mit `-->`.',
        'Struktur: `<em>…</em>` um die zwei Wörter, darunter `<!-- … -->` mit dem Text aus der Aufgabe.',
      ],
      solution: {
        html: '<h1>Fitness-Studio Neckarblick</h1>\n<p>Geöffnet <em>jeden Tag</em> von 6 bis 23 Uhr.</p>\n<!-- Preise prüfen -->\n<p>Monatsbeitrag: 29 Euro, Schüler zahlen 19 Euro.</p>\n',
      },
      tests: [
        { type: 'text', selector: 'em', expected: 'jeden Tag', label: '„jeden Tag“ ist leicht betont' },
        { type: 'text', selector: 'p', expected: 'Geöffnet jeden Tag von 6 bis 23 Uhr.', label: 'Der erste Absatz bleibt lesbar' },
        { type: 'source', file: 'html', matches: '<!--[^>]*Preise prüfen[^>]*-->', label: 'Es gibt einen Kommentar mit „Preise prüfen“' },
        { type: 'selector', selector: 'p', count: 2, label: 'Beide Absätze sind noch da' },
      ],
    },
    {
      type: 'explain',
      text: 'Drei Zeichen haben in HTML eine feste Aufgabe: `<` und `>` bilden Tags, `&` leitet Sonderzeichen ein. Willst du sie als **Text** zeigen, brauchst du **Entities** – Ersatzschreibweisen, die mit `&` beginnen und mit `;` enden:\n\n- `&lt;` → < (*less than*)\n- `&gt;` → > (*greater than*)\n- `&amp;` → & (*ampersand*)\n\n```html\n<p>Pizza &amp; Pasta</p>\n<p>Der Tag &lt;p&gt; macht einen Absatz.</p>\n```',
    },
    {
      type: 'pair',
      text: 'Ordne die Schreibweisen ihrer Bedeutung zu.',
      pairs: [
        ['`<strong>`', 'wichtig – der Browser zeigt es fett'],
        ['`<em>`', 'betont – der Browser zeigt es kursiv'],
        ['`<!-- … -->`', 'Kommentar – bleibt unsichtbar'],
        ['`&amp;`', 'zeigt das Zeichen &'],
        ['`&lt;`', 'zeigt das Zeichen <'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: 'Zwei Fehler im Spickzettel: Ab „Merke:“ ist der ganze Text fett, und im dritten Absatz fehlt das Wort `<p>` samt Rest des Satzes. **Korrigiere** beide Stellen: Nur „Merke:“ ist stark betont, und der Satz zeigt `<p>` sichtbar als Text.',
      starter: {
        html: '<h1>Mein HTML-Spickzettel</h1>\n<p><strong>Merke: Erst speichern, dann testen.</p>\n<p>Überschriften gibt es in sechs Ebenen.</p>\n<p>Der Tag <p> macht einen Absatz.</p>\n',
      },
      hints: [
        'Ein geöffnetes Element ohne schließenden Tag läuft einfach weiter – bis zum Ende. Wo muss die Betonung aufhören?',
        'Spitze Klammern im Text liest der Browser als Tag. Zeig sie mit den Ersatzschreibweisen aus der Erklärung – wie bei `5 &lt; 10`.',
        'Fehler 1: Direkt hinter „Merke:“ fehlt der schließende Tag der Betonung. Fehler 2: Beide Klammern um das p brauchen ihre Ersatzschreibweise.',
      ],
      solution: {
        html: '<h1>Mein HTML-Spickzettel</h1>\n<p><strong>Merke:</strong> Erst speichern, dann testen.</p>\n<p>Überschriften gibt es in sechs Ebenen.</p>\n<p>Der Tag &lt;p&gt; macht einen Absatz.</p>\n',
      },
      tests: [
        { type: 'text', selector: 'strong', expected: 'Merke:', label: 'Nur „Merke:“ ist stark betont' },
        { type: 'selector', selector: 'strong', count: 1, label: 'Es gibt genau eine starke Betonung' },
        { type: 'text', selector: 'p', expected: 'Merke: Erst speichern, dann testen.', label: 'Der erste Absatz bleibt lesbar' },
        { type: 'selector', selector: 'p', count: 3, label: 'Es gibt drei Absätze' },
        { type: 'text', selector: 'p:nth-of-type(3)', expected: 'Der Tag <p> macht einen Absatz.', label: 'Der dritte Absatz zeigt <p> als Text' },
        { type: 'source', file: 'html', matches: '&lt;p', label: 'Die spitze Klammer ist als Sonderzeichen geschrieben' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website! Im Abschnitt „Das Festival“ soll auffallen, dass Schülerinnen und Schüler das Festival machen – das ist die wichtige Information. Der Zusatz „vom Line-up bis zum Ticketverkauf“ wird nur leicht betont, wie beim Sprechen.\n\nAußerdem wünscht sich Ayla vor der Trennlinie eine Notiz „Kontakt“ im Quelltext – unsichtbar für Besucher, damit das Team die Adresse später schnell findet.',
    },
    { type: 'code', etappe: '03-text/03-hervorheben-und-kommentare' },
  ],
});

/* ---------- Lektion 4: Wiederholung ---------- */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung: Textbanner',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      text: 'Textbanner-Check: Bevor Sam abnimmt, wiederholst du Überschriften, Absätze, Umbrüche, Betonung und Kommentare – und dazu das Grundgerüst vom Fundament und den Seitenaufruf vom Info-Point. Sieben Aufgaben, dann geht es zurück zur FUNKEN-Startseite.',
    },
    {
      type: 'quiz',
      question: 'Wo steht der Text, der im Browser-Tab erscheint?',
      options: ['Im title-Element innerhalb des head', 'In der h1 innerhalb des body', 'Im Kommentar ganz oben in der Datei', 'Im lang-Attribut des html-Tags'],
      correct: 0,
      explanation: 'Der Tab zeigt den Titel aus dem head. Die h1 ist die sichtbare Hauptüberschrift auf der Seite selbst.',
    },
    {
      type: 'fill',
      text: 'Vervollständige die Adresse: Beide Lücken brauchen dasselbe Leerelement für den Zeilenumbruch.',
      template: '<p>Waffelwagen<___>Hafenstraße 9<___>74072 Heilbronn</p>',
      accept: [['br'], ['br']],
      hint: 'Das Umbruch-Tag hat keinen schließenden Tag – in die Lücke kommt nur sein Name.',
    },
    {
      type: 'code',
      task: 'Die Kiosk-Seite wächst:\n\n1. **Ergänze** unter dem Absatz eine Zwischenüberschrift „Snacks & Drinks“ – das &-Zeichen als Sonderzeichen geschrieben.\n2. **Erstelle** darunter einen Absatz mit zwei Zeilen: „Pommes 3 Euro“ und „Limo 2 Euro“ – das Wort „Pommes“ stark betont.',
      starter: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Kiosk am Sportplatz</title>\n  </head>\n  <body>\n    <h1>Kiosk am Sportplatz</h1>\n    <p>Geöffnet bei jedem Heimspiel ab 13 Uhr.</p>\n  </body>\n</html>\n',
      },
      hints: [
        'Zwischenüberschrift = Ebene 2. Das &-Zeichen hat in HTML eine eigene Aufgabe – im Text braucht es seine Ersatzschreibweise.',
        'Zwei Zeilen in einem Absatz: dazwischen das Umbruch-Leerelement. Die starke Betonung liegt nur um das eine Wort.',
        'Reihenfolge im body: h1, Absatz, Zwischenüberschrift, Absatz mit `…<br>…` – alles vor dem schließenden body-Tag.',
      ],
      solution: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Kiosk am Sportplatz</title>\n  </head>\n  <body>\n    <h1>Kiosk am Sportplatz</h1>\n    <p>Geöffnet bei jedem Heimspiel ab 13 Uhr.</p>\n    <h2>Snacks &amp; Drinks</h2>\n    <p><strong>Pommes</strong> 3 Euro<br>Limo 2 Euro</p>\n  </body>\n</html>\n',
      },
      tests: [
        { type: 'text', selector: 'h2', expected: 'Snacks & Drinks', label: 'Die Zwischenüberschrift lautet „Snacks & Drinks“' },
        { type: 'source', file: 'html', matches: '&amp;', label: 'Das &-Zeichen ist als Sonderzeichen geschrieben' },
        { type: 'order', selectors: ['body > p', 'h2', 'h2 + p'], label: 'Die Überschrift steht unter dem ersten Absatz, der neue Absatz darunter' },
        { type: 'selector', selector: 'h2 + p br', count: 1, label: 'Der Snack-Absatz hat einen Zeilenumbruch' },
        { type: 'text', selector: 'h2 + p', expected: 'Pommes 3 Euro Limo 2 Euro', label: 'Der Snack-Absatz ist vollständig' },
        { type: 'text', selector: 'h2 + p strong', expected: 'Pommes', label: '„Pommes“ ist stark betont' },
        { type: 'text', selector: 'title', expected: 'Kiosk am Sportplatz', label: 'Der Seitentitel bleibt erhalten' },
      ],
    },
    {
      type: 'order',
      text: 'Das Grundgerüst einer Seite. Sortiere die Zeilen von oben nach unten.',
      lines: ['<!DOCTYPE html>', '<html lang="de">', '<head>', '<title>Sneaker-Store</title>', '</head>', '<body>', '</body>', '</html>'],
      explanation: 'Dokumenttyp, dann html – darin erst der head mit dem Titel, dann der body. Zum Schluss wird alles geschlossen.',
    },
    {
      type: 'pair',
      text: 'Ordne jedes Element seiner Aufgabe zu.',
      pairs: [
        ['`<h1>`', 'Hauptüberschrift – nur einmal pro Seite'],
        ['`<p>`', 'Absatz – ein Textblock'],
        ['`<br>`', 'Zeilenumbruch innerhalb eines Absatzes'],
        ['`<hr>`', 'Trennlinie zwischen zwei Themen'],
        ['`<em>`', 'leichte Betonung – kursiv dargestellt'],
      ],
    },
    {
      type: 'quiz',
      question: 'Jemand tippt funken-festival.de ein. Wer schickt die Seite?',
      options: ['Der Server – er antwortet auf die Anfrage des Browsers', 'Der Browser – er hat die Seite gespeichert', 'Das DNS – es schickt die Datei', 'Der Editor, in dem die Seite geschrieben wurde'],
      correct: 0,
      explanation: 'Client fragt, Server antwortet. Das DNS liefert nur die IP-Adresse des Servers, nicht die Seite.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: 'Auf dem Flyer ist ab „Anfahrt“ plötzlich alles riesig, und die Adresse klebt in einer Zeile. **Korrigiere** beide Fehler: Nur „Anfahrt“ ist die Zwischenüberschrift, und die Adresse steht in drei Zeilen: Sporthalle Nord, Am Stadion 3, 74072 Heilbronn.',
      starter: {
        html: '<h1>Schulturnier: Fußball</h1>\n<p>Alle Klassen, ein Pokal.</p>\n<h2>Anfahrt\n<p>Mit der Stadtbahn bis Haltestelle Stadion.</p>\n<p>Sporthalle Nord\nAm Stadion 3\n74072 Heilbronn</p>\n',
      },
      hints: [
        'Ein Element ohne schließenden Tag hört nie auf – alles danach gehört noch dazu. Welcher Tag fehlt hinter „Anfahrt“?',
        'Enter im Quelltext macht keinen Umbruch. Innerhalb eines Absatzes brauchst du das Umbruch-Leerelement.',
        'Fehler 1: Die Überschrift braucht `</h…>` direkt hinter dem Wort. Fehler 2: hinter „Nord“ und hinter „3“ je ein Umbruch-Tag.',
      ],
      solution: {
        html: '<h1>Schulturnier: Fußball</h1>\n<p>Alle Klassen, ein Pokal.</p>\n<h2>Anfahrt</h2>\n<p>Mit der Stadtbahn bis Haltestelle Stadion.</p>\n<p>Sporthalle Nord<br>Am Stadion 3<br>74072 Heilbronn</p>\n',
      },
      tests: [
        { type: 'text', selector: 'h2', expected: 'Anfahrt', label: 'Die Zwischenüberschrift lautet nur „Anfahrt“' },
        { type: 'selector', selector: 'h2 p', count: 0, label: 'Die Absätze stecken nicht mehr in der Überschrift' },
        { type: 'selector', selector: 'h2 + p + p br', count: 2, label: 'Die Adresse hat zwei Zeilenumbrüche' },
        { type: 'text', selector: 'h2 + p + p', expected: 'Sporthalle Nord Am Stadion 3 74072 Heilbronn', label: 'Die Adresse ist vollständig' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Ab zur FUNKEN-Startseite. Unter „Das Festival“ kommt ein zweiter Abschnitt: „Die Bühnen“ – Zwischenüberschrift plus ein Absatz, in dem „Hauptbühne“ als wichtige Information hervorgehoben ist.\n\nDer neue Abschnitt steht vor dem Kontakt-Kommentar, damit Linie und Adresse ganz unten bleiben. Alles, was du dafür brauchst, hast du gerade wiederholt.',
    },
    { type: 'code', etappe: '03-text/04-wiederholung' },
  ],
});

/* ---------- Lektion 5: Projekt – Über das Festival ---------- */
schreibe('lessons/05-projekt-ueber-das-festival.json', {
  id: '05-projekt-ueber-das-festival',
  title: 'Projekt: Über das Festival',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Ich hab die Startseite gesehen – das sieht schon nach Festival aus! Überschriften, Text, unsere Adresse … Fehlt nur noch das Essen. Ohne Foodtrucks kommt keiner.\n\nAlso: dritter Abschnitt „Foodtrucks“, mit einem Satz, was es alles gibt. Und danach zeigt ihr mir bitte die ganze Seite!',
    },
    {
      type: 'quiz',
      question: 'Die Startseite hat die Hauptüberschrift „FUNKEN“ und die Abschnitte „Das Festival“ und „Die Bühnen“. Welche Ebene bekommt „Foodtrucks“?',
      options: ['Ebene 2 – gleichrangig mit den anderen Abschnitten', 'Ebene 1 – Essen ist am wichtigsten', 'Ebene 3 – weil es der dritte Abschnitt ist'],
      correct: 0,
      explanation: 'Gleichrangige Abschnitte bekommen dieselbe Ebene. Die h1 gibt es nur einmal, und die Zahl zählt nicht die Abschnitte.',
    },
    {
      type: 'order',
      text: 'So soll der untere Teil der Startseite aussehen. Sortiere: die Bühnen, dann die Foodtrucks, dann Kontakt-Kommentar, Linie und Adresse.',
      lines: ['<h2>Die Bühnen</h2>', '<p>Auf der <strong>Hauptbühne</strong> spielen die Headliner.</p>', '<h2>Foodtrucks</h2>', '<p>Pizza, Döner, Bubble Tea und Waffeln.</p>', '<!-- Kontakt -->', '<hr>', '<p>Kollektiv FUNKEN<br>Hafenstraße 9<br>74072 Heilbronn</p>'],
      explanation: 'Jede Zwischenüberschrift eröffnet ihren Abschnitt, der Absatz folgt direkt. Ganz unten: Kommentar, Linie, Adresse.',
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Meilenstein! Der Abschnitt „Foodtrucks“ bekommt eine Zwischenüberschrift und einen Absatz, in dem „alles“ leicht betont ist. Er kommt hinter „Die Bühnen“ und vor den Kontakt-Kommentar. Prüf danach die Reihenfolge: Das Festival, Die Bühnen, Foodtrucks, dann die Linie.\n\nWenn die Etappe steht, klick unten auf „FUNKEN-Website ansehen“ – dort siehst du die ganze Startseite, so wie Sam sie sieht.',
    },
    { type: 'code', etappe: '03-text/05-projekt-ueber-das-festival' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '03-text',
  fragen: [
    { id: '03-01', konzept: 'html.ueberschrift', type: 'quiz', question: 'Wie viele Hauptüberschriften (h1) hat eine gut gegliederte Seite?', options: ['Genau eine', 'Eine pro Abschnitt', 'Mindestens drei'], correct: 0, explanation: 'Die h1 nennt das Thema der ganzen Seite – deshalb nur einmal. Abschnitte bekommen h2.' },
    { id: '03-02', konzept: 'html.ueberschrift', type: 'bug', text: 'Die Gliederung überspringt eine Ebene. Welche Zeile ist falsch?', lines: ['<h1>Sneaker-Blog</h1>', '<h2>Neu im Regal</h2>', '<h4>Laufschuhe</h4>', '<p>Leicht und weich gedämpft.</p>'], line: 2, explanation: 'Nach h2 kommt h3 – keine Ebene überspringen.' },
    { id: '03-03', konzept: 'html.ueberschrift', type: 'fill', text: 'Vervollständige: Unter der Hauptüberschrift folgt die nächste Ebene.', template: '<h1>Fitness-Plan</h1>\n<___>Montag</___>', accept: [['h2'], ['h2']], hint: 'Ebene 1, dann Ebene 2 – in beiden Tags.' },
    { id: '03-04', konzept: 'html.ueberschrift', type: 'order', text: 'Sortiere die Gliederung: Hauptüberschrift, dann jede Ebene eine Stufe tiefer, zuletzt der Text.', lines: ['<h1>Führerschein-Tagebuch</h1>', '<h2>Theorie</h2>', '<h3>Erste Stunde</h3>', '<p>Verkehrszeichen, Vorfahrt, viel Kaffee.</p>'], explanation: 'h1, h2, h3 – keine Ebene überspringen. Der Text gehört zur untersten Überschrift.' },
    { id: '03-05', konzept: 'html.absatz', type: 'quiz', question: 'Du drückst im Editor dreimal Enter zwischen zwei Sätzen. Was zeigt der Browser?', options: ['Beide Sätze hintereinander – Umbrüche im Quelltext zählen nicht', 'Drei Leerzeilen zwischen den Sätzen', 'Einen Zeilenumbruch'], correct: 0, explanation: 'Der Browser ignoriert Zeilenumbrüche im Quelltext. Umbrüche entstehen nur durch Absätze oder `<br>`.' },
    { id: '03-06', konzept: 'html.absatz', type: 'bug', text: 'Ein Absatz ist nicht richtig abgeschlossen. Welche Zeile?', lines: ['<p>Wir liefern bis 22 Uhr.</p>', '<p>Mindestbestellwert: 10 Euro.', '<p>Bar oder Karte.</p>'], line: 1, explanation: 'Der schließende Tag `</p>` fehlt.' },
    { id: '03-07', konzept: 'html.absatz', type: 'fill', text: 'Fließtext gehört in ein Absatz-Element. Vervollständige.', template: '<___>Pommes gibt es ab 17 Uhr.</___>', accept: [['p'], ['p']], hint: 'Ein Buchstabe – wie paragraph.' },
    { id: '03-08', konzept: 'html.br-hr', type: 'pair', text: 'Ordne zu.', pairs: [['`<br>`', 'Zeilenumbruch innerhalb eines Absatzes'], ['`<hr>`', 'Trennlinie zwischen zwei Themen'], ['`<p>`', 'Absatz – ein Textblock'], ['`<h2>`', 'Zwischenüberschrift']] },
    { id: '03-09', konzept: 'html.br-hr', type: 'quiz', question: 'Welche Aussage über `<br>` stimmt?', options: ['Es ist ein Leerelement ohne schließenden Tag', 'Es braucht `</br>` als schließenden Tag', 'Es zeichnet eine sichtbare Linie'], correct: 0, explanation: '`<br>` hat keinen Inhalt und keinen schließenden Tag. Die Linie ist `<hr>`.' },
    { id: '03-10', konzept: 'html.br-hr', type: 'bug', text: 'Ein Leerelement ist falsch geschrieben. Welche Zeile?', lines: ['<p>Pizza Luna<br>', 'Bahnhofstraße 4<br>', '74072 Heilbronn</p>', '<hr></hr>'], line: 3, explanation: 'Die Trennlinie ist ein Leerelement: nur `<hr>`, kein schließender Tag.' },
    { id: '03-11', konzept: 'html.strong-em', type: 'quiz', question: '„Ausverkauft“ ist die wichtigste Information im Satz. Welches Element markiert das?', options: ['`<strong>`', '`<em>`', '`<h6>`'], correct: 0, explanation: '`<strong>` bedeutet wichtig. `<em>` betont nur wie beim Sprechen, h6 ist eine Überschrift.' },
    { id: '03-12', konzept: 'html.strong-em', type: 'pair', text: 'Ordne zu.', pairs: [['`<strong>`', 'wichtig – fett dargestellt'], ['`<em>`', 'betont – kursiv dargestellt'], ['`<h1>`', 'Hauptüberschrift'], ['`<!-- … -->`', 'Kommentar, unsichtbar']] },
    { id: '03-13', konzept: 'html.strong-em', type: 'fill', text: 'Das Wort „ausverkauft“ soll als wichtig markiert werden. Vervollständige.', template: '<p>Samstag ist <___>ausverkauft</___>.</p>', accept: [['strong'], ['strong']], hint: 'Das Element für wichtige Information – nicht das für Betonung beim Sprechen.' },
    { id: '03-14', konzept: 'html.strong-em', type: 'bug', text: 'Eine Betonung wird nicht geschlossen. Welche Zeile?', lines: ['<p>Bitte <strong>pünktlich</strong> kommen.</p>', '<p>Der Einlass ist <em>wirklich<em> streng.</p>', '<p>Danke!</p>'], line: 1, explanation: 'Der zweite Tag muss der schließende sein: `</em>` mit Schrägstrich.' },
    { id: '03-15', konzept: 'html.kommentar', type: 'fill', text: 'Vervollständige den Kommentar.', template: '___ Hier kommt das Programm hin ___', accept: [['<!--'], ['-->']], hint: 'Anfang mit spitzer Klammer, Ausrufezeichen und zwei Strichen – Ende mit zwei Strichen und Klammer.' },
    { id: '03-16', konzept: 'html.kommentar', type: 'quiz', question: 'Was passiert mit dem Text in einem Kommentar?', options: ['Der Browser zeigt ihn nicht – er steht nur im Quelltext', 'Er erscheint kursiv', 'Er erscheint als Überschrift'], correct: 0, explanation: 'Kommentare sind Notizen im Quelltext. Besucher der Seite sehen sie nicht.' },
    { id: '03-17', konzept: 'html.kommentar', type: 'bug', text: 'Ein Kommentar ist nicht richtig beendet. Welche Zeile?', lines: ['<h1>Team</h1>', '<!-- Fotos folgen --', '<p>Wir sind zu fünft.</p>'], line: 1, explanation: 'Ein Kommentar endet mit `-->` – hier fehlt die spitze Klammer, und der Rest der Seite verschwindet.' },
    { id: '03-18', konzept: 'html.entity', type: 'quiz', question: 'Wie schreibst du das Zeichen & im Text einer HTML-Seite?', options: ['`&amp;`', '`&and;`', '`&&`'], correct: 0, explanation: 'Das &-Zeichen leitet Sonderzeichen ein – als Text schreibst du es `&amp;`.' },
    { id: '03-19', konzept: 'html.entity', type: 'pair', text: 'Ordne die Sonderzeichen zu.', pairs: [['`&lt;`', '<'], ['`&gt;`', '>'], ['`&amp;`', '&']] },
    { id: '03-20', konzept: 'html.entity', type: 'fill', text: 'Der Text soll „Pommes & Currywurst“ anzeigen. Vervollständige mit dem Sonderzeichen.', template: '<p>Pommes ___ Currywurst</p>', accept: ['&amp;'], hint: 'Beginnt mit &, endet mit Semikolon – die Abkürzung für ampersand.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '03-text',
  title: 'Abnahme: Textbanner',
  intro: 'Okay, die Startseite liest sich jetzt wie eine echte Festival-Seite – Das Festival, Die Bühnen, Foodtrucks, unten unsere Adresse. Bevor ich das den anderen zeige: Zeig mir, dass das kein Zufall war.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'html.ueberschrift', type: 'quiz', question: 'Die Startseite hat die h1 „FUNKEN“ und die Abschnitte „Das Festival“ und „Die Bühnen“ als h2. Welche Ebene bekommt ein neuer Abschnitt „Tickets“?', options: ['h2 – gleichrangig mit den anderen Abschnitten', 'h1 – jeder Abschnitt braucht eine Hauptüberschrift', 'h3 – weil es der dritte Abschnitt ist'], correct: 0, explanation: 'Gleichrangige Abschnitte bekommen dieselbe Ebene. Die h1 gibt es nur einmal.' },
    { konzept: 'html.strong-em', type: 'pair', text: 'Ordne die Elemente ihrer Bedeutung zu.', pairs: [['`<strong>`', 'wichtig – fett dargestellt'], ['`<em>`', 'betont – kursiv dargestellt'], ['`<br>`', 'Zeilenumbruch im Absatz'], ['`<hr>`', 'Trennlinie']] },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz den Abschnitt „Öffnungszeiten“: Zwischenüberschrift, darunter ein Absatz mit zwei Zeilen „Mo bis Fr: 10 bis 19 Uhr“ und „Sa: 10 bis 16 Uhr“, dann eine Trennlinie und ein Absatz „Kein Verkauf an Feiertagen.“ – das Wort „Kein“ stark betont.',
      starter: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Sneaker-Store Heilbronn</title>\n  </head>\n  <body>\n    <h1>Sneaker-Store Heilbronn</h1>\n    <p>Neue Drops jeden Samstag.</p>\n  </body>\n</html>\n',
      },
      solution: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Sneaker-Store Heilbronn</title>\n  </head>\n  <body>\n    <h1>Sneaker-Store Heilbronn</h1>\n    <p>Neue Drops jeden Samstag.</p>\n    <h2>Öffnungszeiten</h2>\n    <p>Mo bis Fr: 10 bis 19 Uhr<br>Sa: 10 bis 16 Uhr</p>\n    <hr>\n    <p><strong>Kein</strong> Verkauf an Feiertagen.</p>\n  </body>\n</html>\n',
      },
      tests: [
        { type: 'text', selector: 'h2', expected: 'Öffnungszeiten', label: 'Die Zwischenüberschrift lautet „Öffnungszeiten“' },
        { type: 'selector', selector: 'h2 + p br', count: 1, label: 'Die Zeiten stehen in zwei Zeilen' },
        { type: 'text', selector: 'h2 + p', expected: 'Mo bis Fr: 10 bis 19 Uhr Sa: 10 bis 16 Uhr', label: 'Die Zeiten sind vollständig' },
        { type: 'selector', selector: 'hr', count: 1, label: 'Es gibt eine Trennlinie' },
        { type: 'text', selector: 'hr + p', expected: 'Kein Verkauf an Feiertagen.', label: 'Der Hinweis steht unter der Linie' },
        { type: 'text', selector: 'hr + p strong', expected: 'Kein', label: '„Kein“ ist stark betont' },
        { type: 'selector', selector: 'h1', count: 1, label: 'Es bleibt bei einer Hauptüberschrift' },
      ],
    },
    { konzept: 'html.grundgeruest', type: 'fill', text: 'Vervollständige die Zeichensatz-Angabe im head, damit Umlaute richtig erscheinen.', template: '<meta charset="___">', accept: ['utf-8'] },
    { konzept: 'web.url', type: 'quiz', question: 'In `https://funken-festival.de/programm.html` – welcher Teil ist der Pfad?', options: ['`/programm.html`', '`funken-festival.de`', '`https://`'], correct: 0, explanation: 'Der Pfad kommt nach der Domain und zeigt auf die Datei.' },
    { konzept: 'html.entity', type: 'bug', text: 'Ein Sonderzeichen ist nicht als Ersatzschreibweise geschrieben – die Zeile bricht die Seite. Welche?', lines: ['<p>Pommes &amp; Limo</p>', '<p>Der Tag <p> macht einen Absatz.</p>', '<p>5 &lt; 10</p>'], line: 1, explanation: 'Spitze Klammern im Text müssen als `&lt;` und `&gt;` geschrieben werden – sonst liest der Browser ein Tag.' },
    { konzept: 'html.br-hr', type: 'order', text: 'Ticket-Infos für die Seite. Sortiere: Zwischenüberschrift, Absatz, Trennlinie, dann der Absatz mit drei Zeilen.', lines: ['<h2>Tickets</h2>', '<p>Tagesticket 12 Euro, Festivalpass 20 Euro.</p>', '<hr>', '<p>Vorverkauf<br>', 'ab 1. Mai<br>', 'im Sekretariat</p>'] },
    { konzept: 'html.attribut', type: 'quiz', question: 'Wo steht ein Attribut wie `lang="de"`?', options: ['Im öffnenden Tag, hinter dem Tag-Namen', 'Im schließenden Tag', 'Zwischen öffnendem und schließendem Tag', 'In einer eigenen Zeile vor dem Element'], correct: 0, explanation: 'Attribute stehen immer im öffnenden Tag: Name, Gleichheitszeichen, Wert in Anführungszeichen.' },
    {
      type: 'code',
      mode: 'fix',
      task: 'Ab „Achtung:“ ist auf der Seite alles kursiv, und der Absatz mit den Preisen ist verschwunden. **Korrigiere** beide Fehler: Nur „Achtung:“ ist leicht betont, und der Kommentar über den Preisen ist richtig abgeschlossen.',
      starter: {
        html: '<h1>Kiosk am Sportplatz</h1>\n<p><em>Achtung: Nur Barzahlung.</p>\n<p>Geöffnet bei jedem Heimspiel.</p>\n<!-- Preise mit dem Team abstimmen\n<p>Pommes 3 Euro, Limo 2 Euro.</p>\n',
      },
      solution: {
        html: '<h1>Kiosk am Sportplatz</h1>\n<p><em>Achtung:</em> Nur Barzahlung.</p>\n<p>Geöffnet bei jedem Heimspiel.</p>\n<!-- Preise mit dem Team abstimmen -->\n<p>Pommes 3 Euro, Limo 2 Euro.</p>\n',
      },
      tests: [
        { type: 'text', selector: 'em', expected: 'Achtung:', label: 'Nur „Achtung:“ ist leicht betont' },
        { type: 'selector', selector: 'em', count: 1, label: 'Es gibt genau eine Betonung' },
        { type: 'selector', selector: 'p', count: 3, label: 'Alle drei Absätze sind sichtbar' },
        { type: 'text', selector: 'p:nth-of-type(3)', expected: 'Pommes 3 Euro, Limo 2 Euro.', label: 'Der Preis-Absatz ist wieder da' },
        { type: 'source', file: 'html', matches: '<!--\\s*Preise[^>]*-->', label: 'Der Kommentar ist richtig abgeschlossen' },
      ],
    },
    { konzept: 'web.client-server', type: 'quiz', question: 'Der Browser schickt eine Anfrage nach der Seite. Wer antwortet?', options: ['Der Server, auf dem die Seite liegt', 'Das WLAN', 'Der Editor'], correct: 0, explanation: 'Client fragt, Server antwortet – die Seite liegt auf dem Server.' },
  ],
});

console.log('Kapitel 03 geschrieben');
