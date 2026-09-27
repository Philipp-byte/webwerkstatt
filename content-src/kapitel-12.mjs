// Kapitel 12 – Schrift & Text (Station „Schriftzug“).
// Erzeugt public/content/chapters/12-schrift-und-text/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '12-schrift-und-text');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Mechanismus: Der Browser geht die font-family-Liste von links nach rechts durch.
const FIG_FONTFAMILY = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="26" text-anchor="middle" fill="#eef2ff" font-weight="bold">Der Browser prüft die Liste der Reihe nach</text><rect x="16" y="56" width="84" height="48" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="58" y="76" text-anchor="middle" fill="#eef2ff">Trebuchet MS</text><text x="58" y="94" text-anchor="middle" fill="#ff7a45">fehlt</text><path d="M102 80 H116" stroke="#ffd84d" stroke-width="2" marker-end="url(#pf12)"/><rect x="118" y="56" width="84" height="48" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="160" y="76" text-anchor="middle" fill="#eef2ff">Arial</text><text x="160" y="94" text-anchor="middle" fill="#ff7a45">fehlt</text><path d="M204 80 H218" stroke="#ffd84d" stroke-width="2" marker-end="url(#pf12)"/><rect x="220" y="56" width="84" height="48" rx="8" fill="#1b2135" stroke="#4ade80" stroke-width="2"/><text x="262" y="76" text-anchor="middle" fill="#eef2ff">sans-serif</text><text x="262" y="94" text-anchor="middle" fill="#4ade80">immer da</text><text x="160" y="136" text-anchor="middle" fill="#38c7ff">Die erste gefundene Schrift gewinnt</text><defs><marker id="pf12" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker></defs></svg>`;

// Mechanismus: text-align verschiebt den Text im Kasten, nicht den Kasten.
const FIG_TEXTALIGN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="26" text-anchor="middle" fill="#eef2ff" font-weight="bold">Der Text rutscht im Kasten – der Kasten bleibt</text><rect x="16" y="44" width="88" height="60" rx="6" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><rect x="26" y="58" width="60" height="6" rx="3" fill="#eef2ff"/><rect x="26" y="74" width="40" height="6" rx="3" fill="#eef2ff"/><rect x="116" y="44" width="88" height="60" rx="6" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><rect x="130" y="58" width="60" height="6" rx="3" fill="#eef2ff"/><rect x="140" y="74" width="40" height="6" rx="3" fill="#eef2ff"/><rect x="216" y="44" width="88" height="60" rx="6" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><rect x="234" y="58" width="60" height="6" rx="3" fill="#eef2ff"/><rect x="254" y="74" width="40" height="6" rx="3" fill="#eef2ff"/><text x="60" y="128" text-anchor="middle" fill="#38c7ff" font-family="monospace" font-size="13">left</text><text x="160" y="128" text-anchor="middle" fill="#38c7ff" font-family="monospace" font-size="13">center</text><text x="260" y="128" text-anchor="middle" fill="#38c7ff" font-family="monospace" font-size="13">right</text><text x="160" y="150" text-anchor="middle" fill="#eef2ff">text-align</text></svg>`;

/* ---------- Starter / Lösungen der Übungsaufgaben ---------- */

// Lektion 1, Beispiel: Trainingsplan
const BSP_TRAINING_HTML = `<h1>Trainingsplan</h1>
<p>Montag: Beine und Rücken. Mittwoch: Brust und Arme. Freitag: 20 Minuten Laufband.</p>
<p>Wasser nicht vergessen!</p>
`;
const BSP_TRAINING_CSS = `body {
  font-family: Georgia, serif;
}
`;

// Lektion 1, Grundübung: Spielbericht
const SPIELBERICHT_HTML = `<h1>3:2 nach Verlängerung</h1>
<p class="autor">Von Lea Brandt, Sportredaktion</p>
<p>Die Schulmannschaft dreht ein 0:2 aus der ersten Halbzeit – und gewinnt das Finale in der 118. Minute.</p>
`;
const SPIELBERICHT_CSS_START = `/* Spielbericht */
body {
  color: #222;
  /* Schriftart hier */
}
`;
const SPIELBERICHT_CSS_LOESUNG = `/* Spielbericht */
body {
  color: #222;
  font-family: Georgia, serif;
}
`;

// Lektion 1, Variation: Sneaker-Produktseite
const SNEAKER_HTML = `<img src="sneaker.svg" alt="Weißer Sneaker mit orangenem Streifen" width="160">
<h1>Neonrunner 2</h1>
<p class="preis">89,90 €</p>
<p>Leichter Laufschuh mit reflektierendem Streifen – für Nachtläufe am Neckar.</p>
`;
const SNEAKER_CSS_START = `/* Sneaker-Produktseite */
body {
  font-family: Arial, sans-serif;
}

h1 {
  color: #ff7a45;
}

.preis {
  color: #1b1b2f;
}
`;
const SNEAKER_CSS_LOESUNG = `/* Sneaker-Produktseite */
body {
  font-family: Arial, sans-serif;
}

h1 {
  color: #ff7a45;
  font-size: 36px;
}

.preis {
  color: #1b1b2f;
  font-size: 24px;
}
`;

// Lektion 1, Fehlerjagd: Speisekarte
const SPEISEKARTE_HTML = `<h1>Pizza &amp; Mehr</h1>
<p class="motto">Ofenfrisch am Foodtruck – jeden Tag ab 17 Uhr.</p>
<ul>
  <li>Margherita – 7,50 €</li>
  <li>Salami – 8,50 €</li>
  <li>Veggie – 8,00 €</li>
</ul>
`;
const SPEISEKARTE_CSS_START = `/* Speisekarte Foodtruck */
body {
  font-familie: Verdana, sans-serif;
}

h1 {
  color: #ff7a45;
  font-size: 40;
}
`;
const SPEISEKARTE_CSS_LOESUNG = `/* Speisekarte Foodtruck */
body {
  font-family: Verdana, sans-serif;
}

h1 {
  color: #ff7a45;
  font-size: 40px;
}
`;

// Lektion 2, Beispiel: Aushang Konsolen-Turnier
const BSP_TURNIER_HTML = `<h1>Konsolen-Turnier</h1>
<p>Freitag, 14 Uhr in der Aula – Anmeldung bis Mittwoch im Sekretariat.</p>
<p class="ort">Raum A 204</p>
`;
const BSP_TURNIER_CSS = `h1 {
  text-align: center;
}

.ort {
  text-align: right;
}
`;

// Lektion 2, Grundübung: Party-Flyer
const FLYER_HTML = `<h1>Abschlussparty</h1>
<p class="info">Samstag, 21 Uhr – Jugendhaus am Park</p>
<p>Musik von DJ Kabelsalat, Getränke gibt es vor Ort. Eintritt frei für alle Jahrgänge.</p>
<p class="kontakt">Fragen an: party@schule-beispiel.de</p>
`;
const FLYER_CSS_START = `/* Flyer */
h1 {
  color: #b48cff;
  /* Ausrichtung hier */
}

.info {
  color: #1b1b2f;
}

.kontakt {
  color: #555;
}
`;
const FLYER_CSS_LOESUNG = `/* Flyer */
h1 {
  color: #b48cff;
  text-align: center;
}

.info {
  color: #1b1b2f;
  text-align: center;
}

.kontakt {
  color: #555;
  text-align: right;
}
`;

// Lektion 2, Variation: Gaming-Shop
const SHOP_HTML = `<nav>
  <a href="controller.html">Controller</a>
  <a href="headsets.html">Headsets</a>
  <a href="sale.html">Sale</a>
</nav>
<h1>Pro-Controller X</h1>
<img src="controller.svg" alt="Schwarzer Controller mit orangenen Tasten" width="160">
<p><span class="alt">69,99 €</span> <span class="neu">49,99 €</span></p>
<p>Nur bis Sonntag – <a href="sale.html">alle Sale-Angebote ansehen</a>.</p>
`;
const SHOP_CSS_START = `/* Gaming-Shop */
body {
  font-family: Arial, sans-serif;
}

nav a {
  color: #1b1b2f;
}

.alt {
  color: #888;
}

.neu {
  color: #ff7a45;
}
`;
const SHOP_CSS_LOESUNG = `/* Gaming-Shop */
body {
  font-family: Arial, sans-serif;
}

nav a {
  color: #1b1b2f;
  text-decoration: none;
}

.alt {
  color: #888;
  text-decoration: line-through;
}

.neu {
  color: #ff7a45;
  font-weight: bold;
}
`;

// Lektion 2, Transfer: Zitat-Karte
const ZITAT_HTML = `<div class="karte">
  <p class="zitat">„Man muss nicht alles können. Man muss nur anfangen.“</p>
  <p class="autor">Mia Sorgenfrei, Streamerin</p>
  <a href="zitate.html">Mehr Zitate</a>
</div>
`;
const ZITAT_CSS_START = `/* Zitat-Karte */
.karte {
  background-color: #e8ecf7;
  color: #0f1320;
}

.zitat {
  font-size: 20px;
}

.autor {
  color: #555;
}

.karte a {
  color: #b48cff;
}
`;
const ZITAT_CSS_LOESUNG = `/* Zitat-Karte */
.karte {
  background-color: #e8ecf7;
  color: #0f1320;
  text-align: center;
  line-height: 1.5;
}

.zitat {
  font-size: 20px;
  font-style: italic;
}

.autor {
  color: #555;
  font-weight: bold;
}

.karte a {
  color: #b48cff;
  text-decoration: none;
}
`;

// Wiederholung, Aufgabe: Kursplan Fitness
const KURSPLAN_HTML = `<h1>Kursplan Herbst</h1>
<main>
  <p><span class="kurs">Kraft &amp; Core</span> – Montag 18 Uhr</p>
  <p><span class="kurs">HIIT</span> – Mittwoch 19 Uhr</p>
  <p><span class="kurs">Yoga</span> – Freitag 17 Uhr</p>
  <p>Neu hier? <a href="probetraining.html">Probetraining buchen</a></p>
</main>
<footer>
  <a href="impressum.html">Impressum</a>
  <a href="kontakt.html">Kontakt</a>
</footer>
`;
const KURSPLAN_CSS_START = `/* Kursplan */
body {
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

h1 {
  color: #4ade80;
}

footer {
  background-color: #0f1320;
  color: #eef2ff;
}

footer a {
  color: #38c7ff;
}
`;
const KURSPLAN_CSS_LOESUNG = `/* Kursplan */
body {
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

h1 {
  color: #4ade80;
  text-align: center;
}

.kurs {
  font-weight: bold;
}

footer {
  background-color: #0f1320;
  color: #eef2ff;
}

footer a {
  color: #38c7ff;
  text-decoration: none;
}
`;

// Wiederholung, Fehlerjagd: Führerschein-Lernkarte
const LERNKARTE_HTML = `<div class="karte">
  <p class="frage">Wie lang ist der Anhalteweg bei 50 km/h?</p>
  <p>Reaktionsweg 15 m + Bremsweg 25 m = 40 m. Bei nasser Fahrbahn deutlich mehr.</p>
  <p>Merke: Der Anhalteweg wächst mit dem Quadrat der Geschwindigkeit.</p>
</div>
`;
const LERNKARTE_CSS_START = `/* Führerschein-Lernkarte */
.karte {
  background-color: #ffd84d;
  color: #0f1320;
  line-height: 1.5px;
}

frage {
  text-align: center;
  font-size: 24px;
}
`;
const LERNKARTE_CSS_LOESUNG = `/* Führerschein-Lernkarte */
.karte {
  background-color: #ffd84d;
  color: #0f1320;
  line-height: 1.5;
}

.frage {
  text-align: center;
  font-size: 24px;
}
`;

// Abnahme, Aufgabe: Playlist
const PLAYLIST_HTML = `<h1>Late-Night-Playlist</h1>
<p>Zwölf Tracks für die Heimfahrt – erst ruhig, dann lauter.</p>
<ul>
  <li><a href="track1.html">Nachtfahrt</a></li>
  <li><a href="track2.html">Neonlicht</a></li>
  <li><a href="track3.html">Letzte Bahn</a></li>
</ul>
`;
const PLAYLIST_CSS_START = `/* Playlist */
body {
  color: #0f1320;
  background-color: #e8ecf7;
}

h1 {
  color: #b48cff;
}

a {
  color: #0f1320;
}
`;
const PLAYLIST_CSS_LOESUNG = `/* Playlist */
body {
  color: #0f1320;
  background-color: #e8ecf7;
  font-family: Verdana, sans-serif;
}

h1 {
  color: #b48cff;
  font-size: 36px;
  text-align: center;
}

a {
  color: #0f1320;
  text-decoration: none;
}
`;

// Abnahme, Fehlerjagd: Bubble Tea Bar
const BUBBLE_HTML = `<h1>Bubble Tea Bar</h1>
<p class="sorte">Mango-Passionsfrucht</p>
<p class="sorte">Matcha-Latte</p>
<p class="sorte">Brown Sugar</p>
<p>Alle Sorten auch ohne Zucker.</p>
`;
const BUBBLE_CSS_START = `/* Bubble Tea Bar */
h1 {
  color: #ff7a45;
  font-size: 40px
  text-align: center;
}

.sorte {
  font-weight: italic;
}
`;
const BUBBLE_CSS_LOESUNG = `/* Bubble Tea Bar */
h1 {
  color: #ff7a45;
  font-size: 40px;
  text-align: center;
}

.sorte {
  font-style: italic;
}
`;

/* ---------- Lektion 1: Schriftart und Größe ---------- */
schreibe('lessons/01-schriftart-und-groesse.json', {
  id: '01-schriftart-und-groesse',
  title: 'Schriftart und Größe',
  konzepte: ['css.font-family', 'css.font-size'],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Sam schickt einen Screenshot der neuen Startseite: „Sieht aus wie ein Schulaufsatz.“ Stimmt – ohne Anweisung nimmt der Browser seine Standardschrift, meist eine **Serifenschrift** (Buchstaben mit Füßchen).\n\nDie Schriftart legst du mit **`font-family`** fest. Der Haken: Der Browser kann nur Schriften nutzen, die auf dem **Gerät der Besucher** installiert sind. Deshalb gibst du eine Liste an – Wunschschrift zuerst, Ersatz dahinter:\n\n```css\nbody {\n  font-family: Verdana, sans-serif;\n}\n```',
      figure: FIG_FONTFAMILY,
    },
    {
      type: 'example',
      text: 'Der Trainingsplan steht in Georgia, einer Serifenschrift. **Ändere** in `style.css` den Wert `Georgia, serif` zu `Arial, sans-serif` und beobachte die Füßchen. Probier danach `"Courier New", monospace` – so sieht Code aus.',
      html: BSP_TRAINING_HTML,
      css: BSP_TRAINING_CSS,
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'In `font-family: Arial, sans-serif;` steht am Ende `sans-serif`. Wozu?',
      options: [
        'Falls Arial auf dem Gerät fehlt, nimmt der Browser irgendeine serifenlose Schrift',
        'Arial wird dadurch ohne Serifen dargestellt',
        'Der Browser zeigt beide Schriften abwechselnd',
        'Ohne die Angabe meldet CSS einen Fehler',
      ],
      correct: 0,
      explanation: 'Die Liste ist eine Rangfolge: Der Browser nimmt die erste installierte Schrift. Die generische Familie am Ende gibt es auf jedem Gerät – sie ist das Sicherheitsnetz.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Spielbericht wie eine Zeitung: Der gesamte Text erscheint in der Schriftart Georgia, ersatzweise in einer Serifenschrift mit Füßchen.',
      starter: { html: SPIELBERICHT_HTML, css: SPIELBERICHT_CSS_START },
      editable: ['css'],
      hints: [
        'Die Eigenschaft für die Schriftart heißt `font-family`. Für den gesamten Text ist die body-Regel zuständig – Überschrift und Absätze erben die Schrift.',
        'Muster aus einem anderen Kontext: `font-family: Verdana, sans-serif;` – Wunschschrift, Komma, generische Familie.',
        'In die body-Regel: `font-family: …, serif;` – vorne der Name der Zeitungsschrift aus der Aufgabe.',
      ],
      solution: { css: SPIELBERICHT_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: 'body', prop: 'font-family', expected: 'Georgia', contains: true, label: 'Der Bericht nutzt Georgia' },
        { type: 'style', selector: 'body', prop: 'font-family', expected: 'serif', contains: true, label: 'Ersatzweise eine Serifenschrift' },
        { type: 'style', selector: 'p', prop: 'font-family', expected: 'Georgia', contains: true, label: 'Auch die Absätze erben die Schrift' },
      ],
    },
    {
      type: 'explain',
      text: 'Drei **generische Familien** kennt jedes Gerät – eine davon steht immer am **Ende** der Liste:\n\n- `sans-serif` – ohne Füßchen, klar (Bildschirm)\n- `serif` – mit Füßchen (Zeitung, Buch)\n- `monospace` – alle Zeichen gleich breit (Code, z. B. Courier New)\n\nSchriftnamen mit Leerzeichen setzt du in Anführungszeichen:\n\n```css\nh1 {\n  font-family: "Trebuchet MS", Verdana, sans-serif;\n}\n```',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Regel: Die Seite soll die Schrift Verdana nutzen, ersatzweise irgendeine Schrift ohne Füßchen.',
      template: 'body {\n  ___: Verdana, ___;\n}',
      accept: [['font-family'], ['sans-serif']],
      hint: 'Vorne die Eigenschaft für die Schriftart. Hinten die generische Familie – „ohne Serifen“ auf Englisch.',
    },
    {
      type: 'explain',
      text: 'Ohne Angabe ist Text **16 Pixel** groß. Die Größe legt **`font-size`** fest, meist in **px**:\n\n```css\nbody {\n  font-size: 18px;\n}\n\nh1 {\n  font-size: 40px;\n}\n```\n\nWas du dem `body` gibst, **erben** alle Elemente – so stellst du die Grundschrift der ganzen Seite einmal ein. Überschriften bekommen eigene, größere Werte.\n\nProfis nutzen oft **`rem`**: `1rem` ist die Grundgröße (16px), `1.5rem` also 24px. Wir bleiben erst mal bei Pixeln.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Produktseite: Der Name des Sneakers (die Hauptüberschrift) wird 36 Pixel groß, der Preis (Klasse `preis`) 24 Pixel. Der Beschreibungstext bleibt in Standardgröße.',
      starter: { html: SNEAKER_HTML, css: SNEAKER_CSS_START },
      editable: ['css'],
      hints: [
        'Die Schriftgröße ist die Eigenschaft `font-size`, der Wert steht in Pixeln. Beide Regeln gibt es schon – du ergänzt nur je eine Zeile.',
        'Muster aus einem anderen Kontext: `font-size: 20px;` – für die Aufgabe brauchst du andere Zahlen.',
        'In der h1-Regel `font-size: …px;` mit der großen Zahl, in der preis-Regel dieselbe Eigenschaft mit der kleineren.',
      ],
      solution: { css: SNEAKER_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: 'h1', prop: 'font-size', expected: '36px', label: 'Der Sneaker-Name ist 36px groß' },
        { type: 'style', selector: '.preis', prop: 'font-size', expected: '24px', label: 'Der Preis ist 24px groß' },
        { type: 'style', selector: 'p:not(.preis)', prop: 'font-size', expected: '16px', label: 'Der Beschreibungstext bleibt 16px' },
      ],
    },
    {
      type: 'pair',
      text: '**Ordne** die Begriffe ihrer Bedeutung zu.',
      pairs: [
        ['`sans-serif`', 'generische Familie ohne Füßchen'],
        ['`serif`', 'generische Familie mit Füßchen'],
        ['`monospace`', 'alle Zeichen gleich breit – wie Code'],
        ['`font-size`', 'Eigenschaft für die Schriftgröße'],
        ['`"Trebuchet MS"`', 'Schriftname mit Leerzeichen – deshalb in Anführungszeichen'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** die zwei Fehler im Stylesheet der Speisekarte: Eigentlich soll der ganze Text in Verdana (ersatzweise serifenlos) stehen und der Name des Foodtrucks 40 Pixel groß sein – doch die Schrift bleibt Standard und die Überschrift klein.',
      starter: { html: SPEISEKARTE_HTML, css: SPEISEKARTE_CSS_START },
      editable: ['css'],
      hints: [
        'Lies die Eigenschaftsnamen Buchstabe für Buchstabe – CSS ist Englisch, nicht Deutsch.',
        'Eine Größe ohne Einheit ignoriert der Browser komplett. Muster: `font-size: 20px;`.',
        'Fehler 1 steckt im Namen der Schrift-Eigenschaft in der body-Regel, Fehler 2 im Wert der Größe in der h1-Regel.',
      ],
      solution: { css: SPEISEKARTE_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: 'body', prop: 'font-family', expected: 'Verdana', contains: true, label: 'Die Speisekarte nutzt Verdana' },
        { type: 'style', selector: 'body', prop: 'font-family', expected: 'sans-serif', contains: true, label: 'Ersatzweise serifenlos' },
        { type: 'style', selector: 'h1', prop: 'font-size', expected: '40px', label: 'Der Name des Foodtrucks ist 40px groß' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website! Sam will keine Schulaufsatz-Optik mehr: Die ganze Startseite bekommt die Schriftart **Arial** – mit einer serifenlosen Ersatzfamilie für Geräte ohne Arial. Und die Hauptüberschrift FUNKEN wächst auf **48 Pixel**, damit sie wie ein Schriftzug wirkt.\n\nBeides gehört in Regeln, die es im Stylesheet schon gibt: eine für die ganze Seite, eine für die Hauptüberschrift.',
    },
    { type: 'code', etappe: '12-schrift-und-text/01-schriftart-und-groesse' },
  ],
});

/* ---------- Lektion 2: Textgestaltung ---------- */
schreibe('lessons/02-textgestaltung.json', {
  id: '02-textgestaltung',
  title: 'Textgestaltung',
  konzepte: ['css.text-align', 'css.font-weight-style', 'css.text-decoration', 'css.line-height'],
  steps: [
    {
      type: 'explain',
      text: 'Sam meldet sich: „Die Überschrift klebt links, die Menü-Links sind unterstrichen wie 1999, und die Absätze sind so eng, dass ich beim Lesen die Zeile verliere.“\n\nDrei Wünsche, drei Eigenschaften. Die erste: **`text-align`** richtet Text in seinem Kasten aus – `left` (links, Standard), `center` (mittig) oder `right` (rechts). Der Kasten bleibt, wo er ist; nur der Text rutscht.\n\n```css\nh2 {\n  text-align: center;\n}\n```',
      figure: FIG_TEXTALIGN,
    },
    {
      type: 'example',
      text: 'Der Aushang fürs Konsolen-Turnier: **Ändere** in `style.css` bei `h1` den Wert `center` zu `right` oder `left` – der Text rutscht im Kasten, der Kasten bleibt. Ändere dann bei `.ort` den Wert `right` zu `center`.',
      html: BSP_TURNIER_HTML,
      css: BSP_TURNIER_CSS,
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Ein Absatz bekommt `text-align: center;`. Was passiert?',
      options: [
        'Der Text steht mittig in seinem Kasten – der Kasten selbst bleibt',
        'Der ganze Kasten wird schmaler und rutscht in die Seitenmitte',
        'Der Text wird größer und fett',
        'Nur die erste Zeile wird zentriert',
      ],
      correct: 0,
      explanation: 'Die Textausrichtung wirkt auf den Inhalt eines Kastens. Den Kasten selbst zu verschieben ist Sache des Box-Modells – das kommt im nächsten Kapitel.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Flyer: Die Überschrift und der Absatz mit der Klasse `info` stehen zentriert, die Kontaktzeile (Klasse `kontakt`) steht rechtsbündig.',
      starter: { html: FLYER_HTML, css: FLYER_CSS_START },
      editable: ['css'],
      hints: [
        'Die Eigenschaft für die Ausrichtung heißt `text-align`. Alle drei Regeln gibt es schon – je eine Zeile ergänzen.',
        'Muster aus dem Beispiel: `text-align: left;` – hier brauchst du die Werte für mittig und für rechts.',
        'Zweimal derselbe Wert (Überschrift und info-Regel), in der kontakt-Regel der Wert für rechts.',
      ],
      solution: { css: FLYER_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: 'h1', prop: 'text-align', expected: 'center', label: 'Die Überschrift ist zentriert' },
        { type: 'style', selector: '.info', prop: 'text-align', expected: 'center', label: 'Die Info-Zeile ist zentriert' },
        { type: 'style', selector: '.kontakt', prop: 'text-align', expected: 'right', label: 'Die Kontaktzeile ist rechtsbündig' },
      ],
    },
    {
      type: 'explain',
      text: 'Für **Betonung** gibt es zwei Eigenschaften:\n\n- **`font-weight`** – die Schriftstärke: `bold` (fett) oder `normal`. Kennst du vom Hinweis-Absatz der Startseite.\n- **`font-style`** – die Schriftlage: `italic` (kursiv) oder `normal`.\n\n```css\n.preis {\n  font-weight: bold;\n}\n\n.zitat {\n  font-style: italic;\n}\n```\n\nAnders als `<strong>` und `<em>` sagen sie nichts über die Bedeutung – sie ändern nur das Aussehen. Für wirklich Wichtiges bleibt `<strong>` richtig.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Regel: Der Preis soll fett und kursiv erscheinen.',
      template: '.preis {\n  font-weight: ___;\n  font-style: ___;\n}',
      accept: [['bold', '700'], ['italic']],
      hint: 'Beide Werte sind englische Wörter – fett für die Stärke, kursiv für die Lage. Schau in der Erklärung davor nach.',
    },
    {
      type: 'explain',
      text: 'Links unterstreicht der Browser von Haus aus. Im Fließtext hilft das – in einer Navigation wirkt es unruhig. Die Linie steuert **`text-decoration`**:\n\n```css\nfooter a {\n  text-decoration: none;\n}\n\n.alt {\n  text-decoration: line-through;\n}\n```\n\n- `none` – keine Linie\n- `underline` – unterstrichen\n- `line-through` – durchgestrichen, etwa für alte Preise\n\nNur die ausgewählten Links verlieren die Linie: `footer a` trifft allein den Fußbereich, `nav a` allein das Menü – alle anderen Links bleiben unterstrichen.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Shop-Ausschnitt: Die Menü-Links in der Navigation verlieren ihre Unterstreichung, der alte Preis (Klasse `alt`) wird durchgestrichen, der neue Preis (Klasse `neu`) fett. Der Link im Text bleibt unterstrichen.',
      starter: { html: SHOP_HTML, css: SHOP_CSS_START },
      editable: ['css'],
      hints: [
        'Linien regelt `text-decoration`, die Stärke `font-weight`. Alle drei Regeln existieren schon – je eine Zeile dazu.',
        'Muster: `text-decoration: underline;` – du brauchst die Werte für „keine Linie“ und „durchgestrichen“.',
        'nav-a-Regel: keine Linie · alt-Regel: durchgestrichen · neu-Regel: fette Stärke.',
      ],
      solution: { css: SHOP_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: 'nav a', prop: 'text-decoration-line', expected: 'none', label: 'Menü-Links sind nicht unterstrichen' },
        { type: 'style', selector: '.alt', prop: 'text-decoration-line', expected: 'line-through', label: 'Der alte Preis ist durchgestrichen' },
        { type: 'style', selector: '.neu', prop: 'font-weight', expected: ['700', 'bold'], label: 'Der neue Preis ist fett' },
        { type: 'style', selector: 'p a', prop: 'text-decoration-line', expected: 'underline', label: 'Der Link im Text bleibt unterstrichen' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Zu enge Zeilen sind wie zu wenig Beinfreiheit im Bus – man hält es nicht lange aus. Den **Zeilenabstand** regelt **`line-height`**, am besten als **Zahl ohne Einheit**. Sie wird mit der Schriftgröße multipliziert:\n\n```css\nbody {\n  line-height: 1.6;\n}\n```\n\nBeispiel: 16px Schrift mal 1.5 ergibt 24px Zeilenhöhe – der Browser rechnet. Im `body` gesetzt, erben alle Elemente den **Faktor**: Überschriften bekommen automatisch passend mehr. Angenehm für Fließtext: 1.4 bis 1.6.',
    },
    {
      type: 'pair',
      text: '**Ordne** jede Deklaration ihrer Wirkung zu.',
      pairs: [
        ['`text-align: right;`', 'Text steht rechts in seinem Kasten'],
        ['`font-style: italic;`', 'kursive Schrift'],
        ['`font-weight: bold;`', 'fette Schrift'],
        ['`text-decoration: none;`', 'keine Unterstreichung'],
        ['`line-height: 1.5;`', 'Zeilenhöhe = 1,5-fache Schriftgröße'],
      ],
    },
    {
      type: 'code',
      task: '**Gestalte** die Zitat-Karte: Alles in der Karte (Klasse `karte`) steht zentriert mit Zeilenabstand 1.5, das Zitat (Klasse `zitat`) ist kursiv, der Name der Autorin (Klasse `autor`) fett, und der Link darunter ist nicht unterstrichen.',
      starter: { html: ZITAT_HTML, css: ZITAT_CSS_START },
      editable: ['css'],
      hints: [
        'Vier Eigenschaften aus dieser Lektion: Ausrichtung, Zeilenabstand, Schriftlage, Schriftstärke – plus die Linie am Link. Alle Regeln gibt es schon.',
        'Ausrichtung und Zeilenabstand gehören in die Regel der Karte – die Absätze darin erben beides. Muster: `text-align: left;` und `line-height: 2;`.',
        'zitat-Regel → kursiv, autor-Regel → fett, Regel für den Link → keine Linie. Die Werte stehen in der Zuordnung davor.',
      ],
      solution: { css: ZITAT_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: '.karte', prop: 'text-align', expected: 'center', label: 'Der Inhalt der Karte ist zentriert' },
        { type: 'style', selector: '.karte', prop: 'line-height', expected: '24px', label: 'Der Zeilenabstand ist 1.5 (24px bei 16px Schrift)' },
        { type: 'style', selector: '.zitat', prop: 'font-style', expected: 'italic', label: 'Das Zitat ist kursiv' },
        { type: 'style', selector: '.autor', prop: 'font-weight', expected: ['700', 'bold'], label: 'Der Name der Autorin ist fett' },
        { type: 'style', selector: '.karte a', prop: 'text-decoration-line', expected: 'none', label: 'Der Link ist nicht unterstrichen' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website – Sams drei Wünsche werden erfüllt: Die Hauptüberschrift rückt in die Mitte, die Links **in der Navigation** verlieren ihre Unterstreichung, und die ganze Seite bekommt einen Zeilenabstand von 1,5.\n\nAchtung beim Menü: Alle anderen Links behalten ihre Linie – im Fließtext muss man Links erkennen. Alle drei Angaben passen in Regeln, die schon da sind.',
    },
    { type: 'code', etappe: '12-schrift-und-text/02-textgestaltung' },
  ],
});

/* ---------- Lektion 3: Wiederholung ---------- */
schreibe('lessons/03-wiederholung.json', {
  id: '03-wiederholung',
  title: 'Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      text: 'Schrift, Größe, Ausrichtung, Zeilenabstand – die Startseite liest sich jetzt wie eine echte Website. Bevor die Tickets-Seite angeschlossen wird, mischen wir das Neue mit Selektoren, CSS-Grundlagen, Klassen und Listen aus den Kapiteln 11, 10, 08 und 04.',
    },
    {
      type: 'quiz',
      question: 'Die Seite soll Verdana nutzen, ersatzweise irgendeine serifenlose Schrift. Welche Zeile stimmt?',
      options: ['`font-family: Verdana, sans-serif;`', '`font-family: Verdana sans-serif;`', '`font-family: sans-serif, Verdana;`', '`font-family: Verdana oder sans-serif;`'],
      correct: 0,
      explanation: 'Das Komma trennt die Kandidaten, die Reihenfolge ist die Rangfolge: erst die Wunschschrift, am Ende die generische Familie.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Zeile im Kopfbereich, die die Datei style.css einbindet.',
      template: '<___ ___="stylesheet" href="style.css">',
      accept: [['link'], ['rel']],
      hint: 'Ein Leerelement, das eine Datei verknüpft – das erste Attribut nennt die Beziehung zur Datei.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Kursplan: Die Überschrift steht zentriert, Kursnamen (Klasse `kurs`) sind fett, und die Links im Fußbereich haben keine Unterstreichung. Der Link im Hauptteil bleibt unterstrichen.',
      starter: { html: KURSPLAN_HTML, css: KURSPLAN_CSS_START },
      editable: ['css'],
      hints: [
        'Drei Regeln: eine vorhandene für h1, eine neue für die Klasse kurs (Punkt davor!), eine vorhandene für footer a.',
        'Muster für eine Klassenregel: `.neu { color: red; }` – hier mit der Schriftstärke statt der Farbe.',
        'h1 → Ausrichtung mittig · .kurs → Stärke fett · footer a → keine Linie.',
      ],
      solution: { css: KURSPLAN_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: 'h1', prop: 'text-align', expected: 'center', label: 'Die Überschrift ist zentriert' },
        { type: 'style', selector: '.kurs', prop: 'font-weight', expected: ['700', 'bold'], label: 'Kursnamen sind fett' },
        { type: 'style', selector: 'footer a', prop: 'text-decoration-line', expected: 'none', label: 'Fußbereichs-Links ohne Unterstreichung' },
        { type: 'style', selector: 'main a', prop: 'text-decoration-line', expected: 'underline', label: 'Der Link im Hauptteil bleibt unterstrichen' },
      ],
    },
    {
      type: 'order',
      text: '**Bringe** den HTML-Ausschnitt in die richtige Reihenfolge: ein Abschnitt mit id, darin Überschrift und Liste.',
      lines: ['<section id="playlist">', '  <h2>Meine Playlist</h2>', '  <ul>', '    <li>Nachtfahrt – Neonlicht</li>', '  </ul>', '</section>'],
      explanation: 'Der Abschnitt umschließt alles, die Überschrift steht vor der Liste, und jedes Element wird in umgekehrter Reihenfolge geschlossen.',
    },
    {
      type: 'pair',
      text: '**Ordne** die Selektoren zu.',
      pairs: [
        ['`.hinweis`', 'alle Elemente mit der Klasse hinweis'],
        ['`#lineup`', 'das eine Element mit der id lineup'],
        ['`nav a`', 'Links innerhalb der Navigation'],
        ['`h1, h2`', 'Haupt- und Zwischenüberschriften gemeinsam'],
        ['`a:hover`', 'Links, solange die Maus darüber ist'],
      ],
    },
    {
      type: 'quiz',
      question: 'Ein einzelnes Wort mitten im Satz soll eine Klasse bekommen, um es per CSS fett zu machen. Welches Element?',
      options: ['`<span>`', '`<div>`', '`<p>`', '`<br>`'],
      correct: 0,
      explanation: 'span markiert einen Textteil innerhalb einer Zeile, ohne Umbruch. div ist ein Block für ganze Bereiche, p ein Absatz.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** die zwei Fehler: Die Lernkarte soll einen Zeilenabstand von 1.5 haben, die Frage (Klasse `frage`) soll zentriert und 24 Pixel groß sein. Doch die Zeilen liegen übereinander, und die Frage sieht aus wie normaler Text.',
      starter: { html: LERNKARTE_HTML, css: LERNKARTE_CSS_START },
      editable: ['css'],
      hints: [
        'Ein Fehler steckt in einem Wert (Einheit?), einer in einem Selektor (Klasse?).',
        'Zeilenabstand als Zahl ohne Einheit, Muster: `line-height: 2;`. Klassen-Selektoren beginnen mit einem Punkt: `.beispiel`.',
        'Der erste Fehler steht in der karte-Regel, der zweite ganz am Anfang der zweiten Regel.',
      ],
      solution: { css: LERNKARTE_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: '.karte', prop: 'line-height', expected: '24px', label: 'Der Zeilenabstand ist 1.5 (24px)' },
        { type: 'style', selector: '.frage', prop: 'text-align', expected: 'center', label: 'Die Frage ist zentriert' },
        { type: 'style', selector: '.frage', prop: 'font-size', expected: '24px', label: 'Die Frage ist 24px groß' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Ab zur FUNKEN-Website: Die Tickets-Seite ist die letzte Seite ohne Stylesheet – sie sieht noch aus wie 1995. Im HTML-Tab verknüpfst du im Kopfbereich style.css, genau wie bei Programm und Galerie.\n\nIm CSS-Tab bekommt die Preistabelle Feinschliff: Die Kopfzellen werden linksbündig, damit „Ticket“ und „Preis“ sauber über ihren Spalten stehen. Die Regel für Kopfzellen gibt es schon – sie braucht nur eine Zeile mehr.',
    },
    { type: 'code', etappe: '12-schrift-und-text/03-wiederholung' },
  ],
});

/* ---------- Lektion 4: Projekt Typografie ---------- */
schreibe('lessons/04-projekt-typografie.json', {
  id: '04-projekt-typografie',
  title: 'Projekt: Typografie',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: '**Meilenstein Typografie.** Rückblick: Die Startseite hat eine Schriftart mit Ersatzfamilie, eine 48-Pixel-Überschrift in der Mitte, Menü-Links ohne Unterstreichung und Zeilenabstand 1,5 – und die Tickets-Seite hängt jetzt am Stylesheet.\n\nZwei Dinge fehlen für ein rundes Bild: Die Zwischenüberschriften haben noch Standardgröße, und die Navigation klebt links. Erst zwei kurze Kontrollfragen, dann die Etappe.',
    },
    {
      type: 'quiz',
      question: 'Ein `<footer>` enthält drei Links, die gemeinsam mittig stehen sollen. Was ist der kürzeste Weg?',
      options: [
        'Dem footer die Textausrichtung `center` geben – die Links darin rücken mit',
        'Jedem Link einzeln eine zentrierte Textausrichtung geben',
        'Vor jeden Link Leerzeichen tippen, bis es passt',
        'Die Links größer machen, bis sie die Zeile füllen',
      ],
      correct: 0,
      explanation: 'Die Textausrichtung wirkt auf den Inhalt eines Kastens – also auch auf Links und Bilder darin. Ein einzelner Link ist kein Kasten mit eigener Zeile, bei ihm passiert nichts.',
    },
    {
      type: 'order',
      text: '**Sortiere** die Schriftgrößen von klein nach groß (1rem = 16px).',
      lines: ['font-size: 14px;', 'font-size: 1rem;', 'font-size: 1.5rem;', 'font-size: 28px;', 'font-size: 48px;'],
      explanation: '1rem ist die Grundgröße 16px, 1.5rem sind 24px – damit ist die Reihe eindeutig.',
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website – Meilenstein! Die Zwischenüberschriften wachsen auf 28 Pixel: groß genug, um sich vom Fließtext abzuheben, klein genug, um dem 48-Pixel-Schriftzug nicht die Show zu stehlen. Die Größe kommt in die vorhandene Regel.\n\nDann wird die Navigation als Ganzes zentriert – mit einer neuen Regel für den Navigationskasten, nicht für die einzelnen Links. Danach lohnt ein Klick auf **„FUNKEN-Website ansehen“**: Sam wartet schon.',
    },
    { type: 'code', etappe: '12-schrift-und-text/04-projekt-typografie' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '12-schrift-und-text',
  fragen: [
    // css.font-family
    { id: '12-01', konzept: 'css.font-family', type: 'quiz', question: 'Wozu steht `sans-serif` am Ende von `font-family: Arial, sans-serif;`?', options: ['Als Ersatz, falls Arial auf dem Gerät nicht installiert ist', 'Damit Arial ohne Serifen dargestellt wird', 'Damit die Schrift kleiner wird'], correct: 0, explanation: 'Die Liste ist eine Rangfolge. Die generische Familie am Ende gibt es auf jedem Gerät – sie ist das Sicherheitsnetz.' },
    { id: '12-02', konzept: 'css.font-family', type: 'fill', text: 'Die Seite soll Verdana nutzen, ersatzweise irgendeine Schrift ohne Füßchen.', template: 'body {\n  font-family: Verdana, ___;\n}', accept: ['sans-serif'], hint: 'Die generische Familie „ohne Serifen“ – auf Englisch.' },
    { id: '12-03', konzept: 'css.font-family', type: 'bug', text: 'Die Schrift ändert sich nicht. Welche Zeile ist falsch?', lines: ['p {', '  font-family: "Trebuchet MS" sans-serif;', '  color: #333;', '}'], line: 1, explanation: 'Zwischen den Schriften fehlt das Komma – ohne Komma ist der ganze Wert ungültig und wird ignoriert.' },
    { id: '12-04', konzept: 'css.font-family', type: 'order', text: 'Sortiere, wie der Browser bei `font-family: "Trebuchet MS", Verdana, sans-serif;` vorgeht.', lines: ['Der Browser liest die Liste von links nach rechts.', 'Ist Trebuchet MS installiert? Dann nimm sie.', 'Sonst: Ist Verdana installiert? Dann nimm sie.', 'Sonst: Nimm irgendeine serifenlose Schrift.'], explanation: 'Die erste installierte Schrift gewinnt – die generische Familie ist das Sicherheitsnetz.' },
    // css.font-size
    { id: '12-05', konzept: 'css.font-size', type: 'quiz', question: 'Welche Angabe macht eine Überschrift 32 Pixel groß?', options: ['`font-size: 32px;`', '`font-size: 32;`', '`text-size: 32px;`', '`size: 32px;`'], correct: 0, explanation: 'Die Eigenschaft heißt font-size, und eine Größe braucht immer eine Einheit wie px.' },
    { id: '12-06', konzept: 'css.font-size', type: 'fill', text: 'Wie groß ist Text, wenn keine Schriftgröße festgelegt ist?', template: 'Ohne Angabe ist Text ___ Pixel groß.', accept: ['16'], hint: 'Die Grundgröße – 1rem entspricht genau dieser Zahl in Pixeln.' },
    { id: '12-07', konzept: 'css.font-size', type: 'bug', text: 'Die Überschrift bleibt klein. Welche Zeile ist falsch?', lines: ['h1 {', '  color: #ff6a00;', '  font-size: 40;', '}'], line: 2, explanation: 'Ohne Einheit ignoriert der Browser die Größe komplett – richtig wäre 40px.' },
    // css.text-align
    { id: '12-08', konzept: 'css.text-align', type: 'quiz', question: 'Was bewirkt `text-align: center;` bei einem Absatz?', options: ['Der Text steht mittig in seinem Kasten', 'Der Kasten rutscht in die Seitenmitte und wird schmaler', 'Der Text wird fett und größer'], correct: 0, explanation: 'Die Textausrichtung wirkt auf den Inhalt eines Kastens – der Kasten selbst bleibt, wo er ist.' },
    { id: '12-09', konzept: 'css.text-align', type: 'pair', text: 'Ordne die Werte zu.', pairs: [['`text-align: left;`', 'linksbündig (Standard)'], ['`text-align: center;`', 'zentriert'], ['`text-align: right;`', 'rechtsbündig']] },
    { id: '12-10', konzept: 'css.text-align', type: 'bug', text: 'Die Überschrift soll mittig stehen, klebt aber links. Welche Zeile ist falsch?', lines: ['h1 {', '  text-align: middle;', '  color: #0b7dd6;', '}'], line: 1, explanation: 'Den Wert middle gibt es nicht – mittig heißt center.' },
    // css.font-weight-style
    { id: '12-11', konzept: 'css.font-weight-style', type: 'quiz', question: 'Ein Zitat soll kursiv erscheinen. Welche Angabe stimmt?', options: ['`font-style: italic;`', '`font-weight: italic;`', '`text-decoration: italic;`', '`font-style: kursiv;`'], correct: 0, explanation: 'Kursiv ist die Schriftlage (font-style) mit dem englischen Wert italic. font-weight regelt nur die Stärke.' },
    { id: '12-12', konzept: 'css.font-weight-style', type: 'fill', text: 'Der Preis soll fett erscheinen.', template: '.preis {\n  font-weight: ___;\n}', accept: ['bold', '700'], hint: 'Das englische Wort für fett.' },
    { id: '12-13', konzept: 'css.font-weight-style', type: 'pair', text: 'Ordne die Deklarationen ihrer Wirkung zu.', pairs: [['`font-weight: bold;`', 'fett'], ['`font-style: italic;`', 'kursiv'], ['`font-weight: normal;`', 'normale Stärke, nicht fett'], ['`font-style: normal;`', 'aufrecht, nicht kursiv']] },
    // css.text-decoration
    { id: '12-14', konzept: 'css.text-decoration', type: 'quiz', question: 'Warum sind Links unterstrichen, obwohl du das nie festgelegt hast?', options: ['Browser-Standard für Links – mit text-decoration änderst du das', 'HTML verlangt bei Links immer eine Linie, CSS kann das nicht ändern', 'Die blaue Farbe erzeugt automatisch eine Linie'], correct: 0, explanation: 'Unterstreichung ist der Browser-Standard für Links. text-decoration: none nimmt sie weg.' },
    { id: '12-15', konzept: 'css.text-decoration', type: 'fill', text: 'Die Menü-Links sollen keine Unterstreichung haben.', template: 'nav a {\n  text-decoration: ___;\n}', accept: ['none'], hint: 'Das englische Wort für „keine“.' },
    { id: '12-16', konzept: 'css.text-decoration', type: 'bug', text: 'Die Menü-Links sind immer noch unterstrichen. Welche Zeile ist falsch?', lines: ['nav a {', '  color: #1b1b2f;', '  text-decoration: non;', '}'], line: 2, explanation: 'Tippfehler: Der Wert heißt none. Unbekannte Werte ignoriert der Browser.' },
    // css.line-height
    { id: '12-17', konzept: 'css.line-height', type: 'quiz', question: 'Ein Absatz hat 16 Pixel Schrift und `line-height: 1.5;`. Wie hoch ist eine Zeile?', options: ['24 Pixel', '1,5 Pixel', '16 Pixel', '15 Pixel'], correct: 0, explanation: 'Zahl ohne Einheit = Faktor: 16 × 1,5 = 24 Pixel.' },
    { id: '12-18', konzept: 'css.line-height', type: 'fill', text: 'Der Zeilenabstand soll das 1,5-Fache der Schriftgröße sein.', template: 'body {\n  line-height: ___;\n}', accept: ['1.5'], hint: 'Zahl ohne Einheit – mit Dezimalpunkt statt Komma.' },
    { id: '12-19', konzept: 'css.line-height', type: 'bug', text: 'Die Zeilen liegen übereinander. Welche Zeile ist falsch?', lines: ['p {', '  font-size: 16px;', '  line-height: 1.5px;', '}'], line: 2, explanation: '1.5px wäre eine winzige Zeilenhöhe. Der Zeilenabstand kommt als Zahl ohne Einheit: 1.5.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '12-schrift-und-text',
  title: 'Abnahme: Schriftzug',
  intro: 'Meine Oma hat die Seite gesehen und gesagt: „Endlich kann man das lesen!“ Bevor ich die Tickets freigebe, zeig mir, dass Schrift und Text wirklich sitzen – und dass ihr die alten Sachen nicht vergessen habt.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'css.font-family', type: 'quiz', question: 'Welche Angabe nutzt Arial und fällt sonst auf irgendeine serifenlose Schrift zurück?', options: ['`font-family: Arial, sans-serif;`', '`font-family: sans-serif, Arial;`', '`font-family: Arial + sans-serif;`', '`font: Arial;`'], correct: 0, explanation: 'Wunschschrift zuerst, dann Komma, dann die generische Familie als Ersatz.' },
    {
      type: 'code',
      task: '**Gestalte** die Playlist-Seite: Der gesamte Text nutzt Verdana, ersatzweise eine serifenlose Schrift. Die Überschrift ist 36 Pixel groß und zentriert. Die Links in der Liste sind nicht unterstrichen.',
      starter: { html: PLAYLIST_HTML, css: PLAYLIST_CSS_START },
      editable: ['css'],
      solution: { css: PLAYLIST_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: 'body', prop: 'font-family', expected: 'Verdana', contains: true, label: 'Die Seite nutzt Verdana' },
        { type: 'style', selector: 'body', prop: 'font-family', expected: 'sans-serif', contains: true, label: 'Ersatzweise serifenlos' },
        { type: 'style', selector: 'h1', prop: 'font-size', expected: '36px', label: 'Die Überschrift ist 36px groß' },
        { type: 'style', selector: 'h1', prop: 'text-align', expected: 'center', label: 'Die Überschrift ist zentriert' },
        { type: 'style', selector: 'li a', prop: 'text-decoration-line', expected: 'none', label: 'Die Listen-Links sind nicht unterstrichen' },
      ],
    },
    { konzept: 'css.line-height', type: 'fill', text: 'Der Zeilenabstand soll das 1,5-Fache der Schriftgröße sein.', template: 'body {\n  line-height: ___;\n}', accept: ['1.5'] },
    { konzept: 'css.sel-nachfahre', type: 'pair', text: 'Ordne die Selektoren zu.', pairs: [['`nav a`', 'Links innerhalb der Navigation'], ['`footer p`', 'Absätze im Fußbereich'], ['`main h2`', 'Zwischenüberschriften im Hauptbereich'], ['`h1, h2`', 'Haupt- und Zwischenüberschriften gemeinsam']] },
    { konzept: 'css.font-weight-style', type: 'quiz', question: 'Ein Zitat soll kursiv erscheinen. Welche Deklaration stimmt?', options: ['`font-style: italic;`', '`font-weight: italic;`', '`text-decoration: italic;`', '`font-style: kursiv;`'], correct: 0, explanation: 'Kursiv ist die Schriftlage (font-style), der Wert heißt italic.' },
    { konzept: 'html.liste-verschachtelt', type: 'order', text: 'Bringe die verschachtelte Liste in die richtige Reihenfolge: eine Kategorie mit einer nummerierten Rangliste darin.', lines: ['<ul>', '  <li>Laufschuhe', '    <ol>', '      <li>Neonrunner 2</li>', '    </ol>', '  </li>', '</ul>'], explanation: 'Die nummerierte Liste steckt komplett im Listenpunkt „Laufschuhe“ – erst danach wird der Punkt geschlossen.' },
    { konzept: 'html.class', type: 'quiz', question: 'Ein Absatz soll die Klasse `hinweis` bekommen. Welche Schreibweise stimmt?', options: ['`<p class="hinweis">`', '`<p .hinweis>`', '`<p id="hinweis">`', '`<class="hinweis">`'], correct: 0, explanation: 'Klassen kommen als Attribut class in den öffnenden Tag. Der Punkt gehört nur in den CSS-Selektor, id ist ein anderes Attribut.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** die zwei Fehler: Der Name der Bubble-Tea-Bar soll 40 Pixel groß und zentriert sein, die Sorten (Klasse `sorte`) kursiv. Doch die Überschrift ist unverändert, und nichts ist kursiv.',
      starter: { html: BUBBLE_HTML, css: BUBBLE_CSS_START },
      editable: ['css'],
      solution: { css: BUBBLE_CSS_LOESUNG },
      tests: [
        { type: 'style', selector: 'h1', prop: 'font-size', expected: '40px', label: 'Der Name ist 40px groß' },
        { type: 'style', selector: 'h1', prop: 'text-align', expected: 'center', label: 'Der Name ist zentriert' },
        { type: 'style', selector: '.sorte', prop: 'font-style', expected: 'italic', label: 'Die Sorten sind kursiv' },
      ],
    },
    { konzept: 'css.link', type: 'quiz', question: 'Welche Zeile im Kopfbereich bindet die Datei style.css ein?', options: ['`<link rel="stylesheet" href="style.css">`', '`<style src="style.css">`', '`<css href="style.css">`', '`<link href="style.css">`'], correct: 0, explanation: 'Das Leerelement link braucht beide Attribute: rel="stylesheet" sagt, was die Datei ist, href, wo sie liegt.' },
    { konzept: 'css.text-decoration', type: 'fill', text: 'Die Menü-Links sollen keine Unterstreichung haben.', template: 'nav a {\n  text-decoration: ___;\n}', accept: ['none'] },
  ],
});
console.log('Kapitel 12 geschrieben');
