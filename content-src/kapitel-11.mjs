// Kapitel 11 – Selektoren (Station „Spots“).
// Erzeugt public/content/chapters/11-selektoren/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '11-selektoren');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Element-Selektor trifft alle Absätze, Klassen-Selektor nur den mit der Klasse
const FIG_KLASSE = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="14" y="38" fill="#38c7ff" font-family="monospace" font-size="14">p { }</text><text x="14" y="56" fill="#eef2ff">trifft alle Absätze</text><text x="14" y="118" fill="#ffd84d" font-family="monospace" font-size="14">.hinweis { }</text><text x="14" y="136" fill="#eef2ff">trifft nur die Klasse</text><path d="M62 34 L160 31 M62 34 L160 79 M62 34 L160 127" stroke="#38c7ff" stroke-width="2" fill="none"/><path d="M126 114 L160 84" stroke="#ffd84d" stroke-width="3" fill="none"/><rect x="160" y="16" width="150" height="30" rx="6" fill="#e8ecf7"/><text x="235" y="36" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;p&gt;</text><rect x="160" y="64" width="150" height="30" rx="6" fill="#e8ecf7" stroke="#ffd84d" stroke-width="3"/><text x="235" y="84" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;p class="hinweis"&gt;</text><rect x="160" y="112" width="150" height="30" rx="6" fill="#e8ecf7"/><text x="235" y="132" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;p&gt;</text></svg>`;

// HTML-Attribut → CSS-Zeichen: class → Punkt, id → Raute
const FIG_ID = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="26" text-anchor="middle" fill="#eef2ff" font-weight="bold">HTML-Attribut → CSS-Zeichen</text><rect x="14" y="44" width="150" height="32" rx="6" fill="#e8ecf7"/><text x="89" y="65" text-anchor="middle" fill="#0f1320" font-family="monospace" font-size="13">class="hinweis"</text><path d="M170 60 H196" stroke="#ffd84d" stroke-width="3"/><rect x="200" y="44" width="106" height="32" rx="6" fill="none" stroke="#ffd84d" stroke-width="2"/><text x="253" y="65" text-anchor="middle" fill="#ffd84d" font-family="monospace" font-size="14">.hinweis</text><text x="253" y="92" text-anchor="middle" fill="#ffd84d">Punkt = Klasse</text><rect x="14" y="104" width="150" height="32" rx="6" fill="#e8ecf7"/><text x="89" y="125" text-anchor="middle" fill="#0f1320" font-family="monospace" font-size="13">id="lineup"</text><path d="M170 120 H196" stroke="#ff7a45" stroke-width="3"/><rect x="200" y="104" width="106" height="32" rx="6" fill="none" stroke="#ff7a45" stroke-width="2"/><text x="253" y="125" text-anchor="middle" fill="#ff7a45" font-family="monospace" font-size="14">#lineup</text><text x="253" y="152" text-anchor="middle" fill="#ff7a45">Raute = id</text></svg>`;

// Nachfahren-Selektor: nav a trifft nur die Links innerhalb von nav
const FIG_NACHFAHRE = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="24" text-anchor="middle" fill="#eef2ff" font-weight="bold">nav a → nur die Links innerhalb von nav</text><rect x="14" y="40" width="140" height="108" rx="8" fill="none" stroke="#38c7ff" stroke-width="2"/><text x="24" y="58" fill="#38c7ff" font-family="monospace" font-size="13">&lt;nav&gt;</text><rect x="26" y="70" width="116" height="28" rx="5" fill="#ffd84d"/><text x="84" y="89" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;a&gt; Programm</text><rect x="26" y="108" width="116" height="28" rx="5" fill="#ffd84d"/><text x="84" y="127" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;a&gt; Tickets</text><rect x="166" y="40" width="140" height="108" rx="8" fill="none" stroke="#b48cff" stroke-width="2"/><text x="176" y="58" fill="#b48cff" font-family="monospace" font-size="13">&lt;main&gt;</text><rect x="178" y="70" width="116" height="28" rx="5" fill="#e8ecf7"/><text x="236" y="89" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;p&gt; Infos …</text><rect x="178" y="108" width="116" height="28" rx="5" fill="#e8ecf7"/><text x="236" y="127" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;a&gt; Fahrplan</text></svg>`;

// Ein Link, zwei Zustände: ohne Maus / Maus darüber
const FIG_HOVER = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="24" text-anchor="middle" fill="#eef2ff" font-weight="bold">Ein Link, zwei Zustände</text><rect x="14" y="42" width="136" height="46" rx="8" fill="#e8ecf7"/><text x="82" y="71" text-anchor="middle" fill="#38c7ff" font-size="16" text-decoration="underline">Programm</text><text x="82" y="114" text-anchor="middle" fill="#38c7ff" font-family="monospace" font-size="14">a { }</text><text x="82" y="136" text-anchor="middle" fill="#eef2ff">ohne Maus</text><rect x="170" y="42" width="136" height="46" rx="8" fill="#e8ecf7"/><text x="238" y="71" text-anchor="middle" fill="#ff7a45" font-size="16" text-decoration="underline">Programm</text><path d="M262 60 v22 l5 -5 l4 9 l5 -2 l-4 -9 h7 z" fill="#eef2ff" stroke="#0f1320" stroke-width="1.5"/><text x="238" y="114" text-anchor="middle" fill="#ff7a45" font-family="monospace" font-size="14">a:hover { }</text><text x="238" y="136" text-anchor="middle" fill="#eef2ff">Maus darüber</text></svg>`;

/* ---------- Übungs-HTML (mehrfach genutzt) ---------- */

const HTML_ERGEBNISSE = `<h2>Clan-Turnier – Ergebnisse</h2>
<ul>
  <li class="sieg">13:7 gegen Nachtfalken</li>
  <li>9:13 gegen Pixelpiraten</li>
  <li class="sieg">13:4 gegen Team Lava</li>
  <li>11:13 gegen Neonwölfe</li>
</ul>
`;

const HTML_KADER = `<h2>Kader – Saison 2027</h2>
<ul>
  <li>Lena · Tor</li>
  <li>Samir · Abwehr</li>
  <li class="kapitaen">Mo · Mittelfeld</li>
  <li>Aylin · Sturm</li>
</ul>
`;

const HTML_SPEISEKARTE = `<h2>Pizza &amp; Mehr – Speisekarte</h2>
<ul>
  <li>Margherita 7 €</li>
  <li class="angebot">Tagesangebot: Pizza Funghi 6 €</li>
  <li>Salami 8 €</li>
  <li>Calzone 9 €</li>
</ul>
`;

const HTML_SPIELPLAN = `<h2>Spielplan Hallenturnier</h2>
<ul>
  <li>10:00 – Team Nord gegen Team Süd</li>
  <li>11:00 – Team West gegen Team Ost</li>
  <li>12:00 – Spiel um Platz 3</li>
  <li id="finale">14:00 – Finale</li>
</ul>
`;

const HTML_TRAINING = `<h1>Mein Trainingsplan</h1>
<h2>Montag – Beine</h2>
<p>Kniebeugen, Ausfallschritte, 3 Sätze.</p>
<h2>Mittwoch – Rücken</h2>
<p>Klimmzüge, Rudern, 3 Sätze.</p>
<h2>Freitag – Ausdauer</h2>
<p>30 Minuten laufen.</p>
`;

const HTML_ENDSTAND = `<h2>Endstand Hallenturnier</h2>
<table>
  <tr>
    <th>Platz</th>
    <th>Team</th>
    <th>Punkte</th>
  </tr>
  <tr id="erster">
    <td>1</td>
    <td>Team West</td>
    <td>9</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Team Nord</td>
    <td>6</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Team Süd</td>
    <td>1</td>
  </tr>
</table>
`;

const HTML_TABELLE_LINKS = `<h2>Hallenturnier – Tabelle</h2>
<p>Alle Spiele findest du im <a href="#">Spielplan</a>.</p>
<table>
  <tr>
    <th>Platz</th>
    <th>Team</th>
  </tr>
  <tr>
    <td>1</td>
    <td><a href="#">Team West</a></td>
  </tr>
  <tr>
    <td>2</td>
    <td><a href="#">Team Nord</a></td>
  </tr>
  <tr>
    <td>3</td>
    <td><a href="#">Team Süd</a></td>
  </tr>
</table>
`;

const HTML_KARTEN = `<h2>Unser Kader</h2>
<p>Klick auf eine Karte für die Statistik.</p>
<div class="karte">
  <h3>Lena · Tor</h3>
  <p>Seit 2024 im Team. 11 Spiele ohne Gegentor.</p>
</div>
<div class="karte">
  <h3>Mo · Mittelfeld</h3>
  <p>Kapitän. 14 Vorlagen in dieser Saison.</p>
</div>
`;

const HTML_CLAN = `<header>
  <h1>Clan Nachtfalke</h1>
</header>
<nav>
  <a href="#">Start</a>
  <a href="#">Kader</a>
  <a href="#">Termine</a>
</nav>
<main>
  <p>Nächstes Scrim am Freitag – Details im <a href="#">Team-Chat</a>.</p>
</main>
`;

const HTML_NAV = `<nav>
  <a href="#">Start</a>
  <a href="#">Kader</a>
  <a href="#">Termine</a>
  <a href="#">Ergebnisse</a>
</nav>
`;

const HTML_TURNIERTABELLE = `<h2>Hallenturnier – Tabelle</h2>
<table>
  <tr>
    <th>Platz</th>
    <th>Team</th>
    <th>Punkte</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Team West</td>
    <td>9</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Team Nord</td>
    <td>6</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Team Süd</td>
    <td>1</td>
  </tr>
</table>
`;

const HTML_KARTEN_LINKS = `<h2>Unser Kader</h2>
<p><a href="#">Alle Statistiken</a></p>
<div class="karte">
  <h3>Lena · Tor</h3>
  <p><a href="#">Profil ansehen</a></p>
</div>
<div class="karte">
  <h3>Mo · Mittelfeld</h3>
  <p><a href="#">Profil ansehen</a></p>
</div>
`;

/* ================= Lektion 1: Element- und Klassen-Selektor ================= */
schreibe('lessons/01-element-und-klassen-selektor.json', {
  id: '01-element-und-klassen-selektor',
  title: 'Element- und Klassen-Selektor',
  konzepte: ['css.sel-element', 'css.sel-klasse'],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Bisher hast du Regeln für `h1`, `a` oder `body` geschrieben. Das sind **Element-Selektoren**: Sie treffen **alle** Elemente dieses Typs – jede Überschrift, jeden Link.\n\nSam will aber nur *einen* Absatz hervorheben: den Einlass-Hinweis. Mit `p` würdest du alle Absätze ändern. Du brauchst einen genaueren Spot – den **Klassen-Selektor**. Er trifft nur Elemente, die eine bestimmte Klasse tragen.',
      figure: FIG_KLASSE,
    },
    {
      type: 'explain',
      text: 'Eine Klasse vergibst du im HTML, das kennst du aus Kapitel 08: `<p class="hinweis">`. Im CSS sprichst du sie mit einem **Punkt** vor dem Namen an:\n\n```css\n.hinweis {\n  color: #d94f00;\n}\n```\n\nDer Punkt bedeutet: „Alle Elemente mit dieser Klasse.“ Ob Absatz, Überschrift oder Listenpunkt ist egal – hat das Element die Klasse, trifft die Regel. Und die Klasse darf auf beliebig vielen Elementen stehen.',
    },
    {
      type: 'example',
      text: 'Zwei Regeln, eine Liste: `li` färbt alle Ergebnisse grau, `.sieg` nur die Siege grün. **Ändere** die Farbe in `.sieg` und beobachte, welche Zeilen sich ändern. Dann **gib** im HTML einem weiteren Listenpunkt die Klasse `sieg`.',
      html: `<h2>Hallenturnier – unsere Ergebnisse</h2>
<ul>
  <li class="sieg">3:1 gegen Team Nord</li>
  <li>1:2 gegen Team Süd</li>
  <li class="sieg">2:0 gegen Team West</li>
  <li>0:0 gegen Team Ost</li>
</ul>
`,
      css: `li {
  color: #6b6b7a;
}

.sieg {
  color: #1a8f3c;
}
`,
    },
    {
      type: 'quiz',
      question: 'Im HTML steht `<li class="neu">Bubble Tea</li>`. Welcher Selektor trifft genau die Elemente mit dieser Klasse?',
      options: ['`.neu`', '`neu`', '`class.neu`'],
      correct: 0,
      explanation: 'Der Punkt sagt „Klasse“. Ohne Punkt sucht der Browser ein Element namens neu – das gibt es nicht. Das Wort class gehört ins HTML, nicht in den Selektor.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Ergebnisliste des Clan-Turniers: Alle Zeilen mit der Klasse `sieg` bekommen die Farbe `#1a8f3c`. Die anderen Ergebnisse bleiben, wie sie sind.',
      starter: {
        html: HTML_ERGEBNISSE,
        css: `body {
  color: #1b1b2f;
}

/* Hier kommt deine Regel für die Siege */
`,
      },
      editable: ['css'],
      hints: [
        'Nur die Zeilen mit der Klasse sollen sich ändern – also kein Element-Selektor, sondern ein Klassen-Selektor.',
        'Klassen sprichst du mit Punkt an. Beispiel aus einem anderen Kontext: `.neu { color: red; }` färbt alles mit der Klasse neu rot.',
        'Punkt, Klassenname aus der Aufgabe, geschweifte Klammern – darin die Farb-Eigenschaft mit dem Wert aus der Aufgabe.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

.sieg {
  color: #1a8f3c;
}
`,
      },
      tests: [
        { type: 'style', selector: '.sieg', prop: 'color', expected: '#1a8f3c', label: 'Die Siege sind grün (#1a8f3c)' },
        { type: 'style', selector: 'li:not(.sieg)', prop: 'color', expected: '#1b1b2f', label: 'Die anderen Ergebnisse bleiben dunkel' },
      ],
    },
    {
      type: 'explain',
      text: 'Farbe allein reicht oft nicht – ein Hinweis soll auch **fett** sein. Die Eigenschaft für die Schriftstärke heißt `font-weight`, der Wert für fett ist `bold`:\n\n```css\n.wichtig {\n  font-weight: bold;\n}\n```\n\nDas Gegenteil ist `normal`. Farbe und Schriftstärke kombinierst du in derselben Regel: jede Deklaration in eine eigene Zeile, jede endet mit einem Semikolon.',
    },
    {
      type: 'fill',
      text: 'Die Regel soll alle Elemente mit der Klasse `kapitaen` fett machen. **Vervollständige** Selektor und Wert.',
      template: '___ {\n  font-weight: ___;\n}',
      accept: [['.kapitaen'], ['bold']],
      hint: 'Klasse → Punkt davor. Der englische Wert für fett hat vier Buchstaben.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Kaderliste: Der Eintrag mit der Klasse `kapitaen` wird fett und bekommt die Farbe `#0b7dd6`. Alle anderen Einträge bleiben grau und normal.',
      starter: {
        html: HTML_KADER,
        css: `body {
  color: #1b1b2f;
}

li {
  color: #6b6b7a;
}

/* Regel für den Kapitän */
`,
      },
      editable: ['css'],
      hints: [
        'Eine neue Regel mit Klassen-Selektor – und zwei Deklarationen darin: Farbe und Schriftstärke.',
        'Schriftstärke: die Eigenschaft heißt font-weight, der Wert für fett bold. Die Farbe kommt als zweite Deklaration in dieselbe Regel.',
        'Struktur: Punkt + Klassenname, Klammer auf, zwei Zeilen mit Eigenschaft: Wert; – Klammer zu.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

li {
  color: #6b6b7a;
}

.kapitaen {
  color: #0b7dd6;
  font-weight: bold;
}
`,
      },
      tests: [
        { type: 'style', selector: '.kapitaen', prop: 'font-weight', expected: ['700', 'bold'], label: 'Der Kapitän ist fett' },
        { type: 'style', selector: '.kapitaen', prop: 'color', expected: '#0b7dd6', label: 'Der Kapitän ist blau (#0b7dd6)' },
        { type: 'style', selector: 'li:not(.kapitaen)', prop: 'font-weight', expected: ['400', 'normal'], label: 'Die anderen Einträge bleiben normal' },
        { type: 'style', selector: 'li:not(.kapitaen)', prop: 'color', expected: '#6b6b7a', label: 'Die anderen Einträge bleiben grau' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne zu.',
      pairs: [
        ['`p`', 'trifft alle Absätze der Seite'],
        ['`.sieg`', 'trifft alle Elemente mit der Klasse sieg'],
        ['`class="sieg"`', 'gibt einem Element im HTML die Klasse'],
        ['`font-weight: bold;`', 'macht die Schrift fett'],
        ['`color`', 'setzt die Textfarbe'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** den Fehler auf der Speisekarte des Foodtrucks: Das Tagesangebot (Klasse `angebot`) soll orange `#ff6a00` und fett sein, sieht aber aus wie alle anderen Gerichte.',
      starter: {
        html: HTML_SPEISEKARTE,
        css: `body {
  color: #1b1b2f;
}

angebot {
  color: #ff6a00;
  font-weight: bold;
}
`,
      },
      editable: ['css'],
      hints: [
        'Die Deklarationen in der Regel sind richtig. Schau dir den Selektor an: Wie spricht man eine Klasse an?',
        'Ohne das richtige Zeichen sucht der Browser ein Element namens angebot – und findet keins.',
        'Vergleiche mit einem funktionierenden Muster: `.sieg { color: green; }`.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

.angebot {
  color: #ff6a00;
  font-weight: bold;
}
`,
      },
      tests: [
        { type: 'style', selector: '.angebot', prop: 'color', expected: '#ff6a00', label: 'Das Tagesangebot ist orange (#ff6a00)' },
        { type: 'style', selector: '.angebot', prop: 'font-weight', expected: ['700', 'bold'], label: 'Das Tagesangebot ist fett' },
        { type: 'style', selector: 'li:not(.angebot)', prop: 'color', expected: '#1b1b2f', label: 'Die anderen Gerichte bleiben dunkel' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Der Einlass-Hinweis auf der Startseite – seit Kapitel 08 hat er die Klasse `hinweis`, aber er sieht aus wie jeder andere Absatz. Letztes Jahr standen zwanzig Leute um 15 Uhr vor verschlossenem Tor!\n\nGib ihm seinen eigenen Spot: dunkles Orange und fett. Die anderen Absätze bleiben, wie sie sind – genau dafür ist ein Klassen-Selektor da.',
    },
    { type: 'code', etappe: '11-selektoren/01-element-und-klassen-selektor' },
  ],
});

/* ================= Lektion 2: ID- und Gruppen-Selektor ================= */
schreibe('lessons/02-id-und-gruppen-selektor.json', {
  id: '02-id-und-gruppen-selektor',
  title: 'ID- und Gruppen-Selektor',
  konzepte: ['css.sel-id', 'css.sel-gruppe'],
  steps: [
    {
      type: 'explain',
      text: 'Eine **id** vergibt ein Element genau **einmal** pro Seite – wie `<h1 id="oben">` auf der Startseite. Im CSS sprichst du sie mit der **Raute** an:\n\n```css\n#oben {\n  color: #ff6a00;\n}\n```\n\nMerk dir die zwei Zeichen: **Punkt** für die Klasse, **Raute** für die id. Eine id-Regel trifft immer genau ein Element – ein Spot für einen einzigen Star.',
      figure: FIG_ID,
    },
    {
      type: 'example',
      text: 'Drei Überschriften, eine id. Nur `#live` ist orange. **Ändere** die Farbe – und dann **ersetze** die Raute durch einen Punkt. Was passiert? Nichts mehr: Der Punkt sucht eine Klasse, die es hier nicht gibt.',
      html: `<h2 id="live">Jetzt live: Finale Hallenturnier</h2>
<p>Team West gegen Team Nord.</p>
<h2>Später</h2>
<p>Interviews mit den Teams.</p>
<h2>Morgen</h2>
<p>Zusammenfassung des Turniers.</p>
`,
      css: `h2 {
  color: #6b6b7a;
}

#live {
  color: #d94f00;
}
`,
    },
    {
      type: 'quiz',
      question: 'Im HTML steht `<h2 id="finale">Finale</h2>`. Welcher Selektor trifft genau diese Überschrift?',
      options: ['`#finale`', '`.finale`', '`finale`'],
      correct: 0,
      explanation: 'Die Raute steht für die id. Der Punkt wäre für eine Klasse – die hat diese Überschrift nicht. Ohne Zeichen sucht der Browser ein Element namens finale.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Spielplan: Der Listenpunkt mit der id `finale` bekommt die Farbe `#d94f00` und fette Schrift. Die anderen Spiele bleiben normal.',
      starter: {
        html: HTML_SPIELPLAN,
        css: `body {
  color: #1b1b2f;
}

/* Regel für das Finale */
`,
      },
      editable: ['css'],
      hints: [
        'Genau ein Element mit einer id – welches Zeichen kommt vor den Namen?',
        'Muster aus einem anderen Kontext: `#oben { color: red; }` färbt das Element mit der id oben rot.',
        'Raute + id, in den Klammern zwei Deklarationen: Farbe und Schriftstärke (bold).',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

#finale {
  color: #d94f00;
  font-weight: bold;
}
`,
      },
      tests: [
        { type: 'style', selector: '#finale', prop: 'color', expected: '#d94f00', label: 'Das Finale ist dunkelorange (#d94f00)' },
        { type: 'style', selector: '#finale', prop: 'font-weight', expected: ['700', 'bold'], label: 'Das Finale ist fett' },
        { type: 'style', selector: 'li:not(#finale)', prop: 'font-weight', expected: ['400', 'normal'], label: 'Die anderen Spiele bleiben normal' },
      ],
    },
    {
      type: 'explain',
      text: 'Oft sollen mehrere Elemente **gleich** aussehen – etwa alle Überschriften in einer Farbe. Statt drei Regeln zu kopieren, schreibst du **eine** Regel mit mehreren Selektoren, getrennt durch **Komma**:\n\n```css\nh1, h2, h3 {\n  color: #ff6a00;\n}\n```\n\nDas ist der **Gruppen-Selektor**. Mischen ist erlaubt: `h1, .titel, #oben` funktioniert genauso. Jeder Teil der Gruppe wird für sich geprüft.',
    },
    {
      type: 'fill',
      text: 'Die Überschriften mit den ids `start` und `ende` sollen in **einer** Regel blau werden. **Vervollständige** die fehlenden Zeichen.',
      template: '#start___ ___ende {\n  color: #0b7dd6;\n}',
      accept: [[','], ['#']],
      hint: 'Ein Komma trennt die Selektoren einer Gruppe; jede id braucht ihre Raute.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Trainingsplan mit EINER gemeinsamen Regel: Hauptüberschrift und alle Zwischenüberschriften bekommen die Farbe `#0b7dd6`. Die Absätze bleiben dunkel.',
      starter: {
        html: HTML_TRAINING,
        css: `body {
  color: #1b1b2f;
}

/* Eine Regel für alle Überschriften */
`,
      },
      editable: ['css'],
      hints: [
        'Zwei Selektoren, eine Regel – welches Zeichen trennt sie?',
        'Muster: `h2, h3 { color: red; }` färbt zweite und dritte Ebene rot.',
        'Beide Elementnamen, Komma dazwischen, dann die Klammern mit der Farbe aus der Aufgabe.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

h1, h2 {
  color: #0b7dd6;
}
`,
      },
      tests: [
        { type: 'style', selector: 'h1', prop: 'color', expected: '#0b7dd6', label: 'Die Hauptüberschrift ist blau' },
        { type: 'style', selector: 'h2', prop: 'color', expected: '#0b7dd6', label: 'Die Zwischenüberschriften sind blau' },
        { type: 'source', file: 'css', matches: 'h1\\s*,\\s*h2\\s*\\{|h2\\s*,\\s*h1\\s*\\{', label: 'Beide Überschriftenebenen stehen als Gruppe in einer Regel' },
        { type: 'style', selector: 'p', prop: 'color', expected: '#1b1b2f', label: 'Die Absätze bleiben dunkel' },
      ],
    },
    {
      type: 'explain',
      text: 'Was, wenn zwei Regeln dasselbe Element treffen? Dann entscheidet eine einfache **Rangfolge**:\n\n1. **id** schlägt Klasse.\n2. **Klasse** schlägt Element.\n3. Bei **Gleichstand** gewinnt die **spätere** Regel.\n\n`#finale` ist also stärker als `.sieg`, und `.sieg` stärker als `li` – egal, in welcher Reihenfolge sie im Stylesheet stehen. Nur wenn zwei gleich starke Regeln streiten, zählt der Platz: Wer weiter unten steht, gewinnt.',
    },
    {
      type: 'pair',
      text: 'Ordne die Selektoren ihrer Wirkung zu.',
      pairs: [
        ['`#oben`', 'genau das eine Element mit der id oben'],
        ['`.neu`', 'alle Elemente mit der Klasse neu'],
        ['`h1, h2`', 'Gruppe: alle h1 und alle h2'],
        ['`h2`', 'alle Zwischenüberschriften der Ebene 2'],
        ['`#oben` gegen `.neu`', 'die id gewinnt'],
      ],
    },
    {
      type: 'quiz',
      question: 'Oben steht `li { color: red; }`, darunter `.sieg { color: green; }`. Welche Farbe hat `<li class="sieg">`?',
      options: ['Grün – die Klasse ist stärker als das Element', 'Rot – die erste Regel gewinnt immer', 'Rot – Element schlägt Klasse'],
      correct: 0,
      explanation: 'Klasse schlägt Element, egal in welcher Reihenfolge. Die Reihenfolge zählt nur bei Gleichstand, etwa bei zwei li-Regeln.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Endstand des Hallenturniers: 1. Überschrift und Kopfzellen bekommen in EINER gemeinsamen Regel die Farbe `#d94f00`. 2. Die Zeile mit der id `erster` wird fett und grün `#1a8f3c`.',
      starter: {
        html: HTML_ENDSTAND,
        css: `body {
  color: #1b1b2f;
}

table {
  background-color: white;
}

/* Deine Regeln */
`,
      },
      editable: ['css'],
      hints: [
        'Zwei neue Regeln: eine Gruppe für Überschrift und Kopfzellen, eine id-Regel für die Zeile.',
        'Gruppe: Elementnamen mit Komma trennen, wie `h1, h3 { color: red; }`. Die id bekommt die Raute.',
        'Zeile: Raute + id, in den Klammern Farbe und Schriftstärke (bold) – jede in einer eigenen Zeile.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

table {
  background-color: white;
}

h2, th {
  color: #d94f00;
}

#erster {
  color: #1a8f3c;
  font-weight: bold;
}
`,
      },
      tests: [
        { type: 'style', selector: 'h2', prop: 'color', expected: '#d94f00', label: 'Die Überschrift ist dunkelorange' },
        { type: 'style', selector: 'th', prop: 'color', expected: '#d94f00', label: 'Die Kopfzellen sind dunkelorange' },
        { type: 'source', file: 'css', matches: '(h2\\s*,\\s*th|th\\s*,\\s*h2)\\s*\\{', label: 'Überschrift und Kopfzellen stehen als Gruppe in einer Regel' },
        { type: 'style', selector: '#erster td', prop: 'color', expected: '#1a8f3c', label: 'Die erste Zeile ist grün' },
        { type: 'style', selector: '#erster td', prop: 'font-weight', expected: ['700', 'bold'], label: 'Die erste Zeile ist fett' },
        { type: 'style', selector: 'tr:not(#erster) td', prop: 'color', expected: '#1b1b2f', label: 'Die anderen Zeilen bleiben dunkel' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Auf der Startseite tragen zwei Überschriften eine id: `lineup` und `anfahrt` – die Sprungziele aus der Navigation. Sam will sie blau, damit man sieht: Hier landet man, wenn man springt.\n\nEine Regel, zwei ids, ein Komma. Die übrigen Zwischenüberschriften bleiben dunkelorange – die id-Regel ist stärker als die alte `h2`-Regel.',
    },
    { type: 'code', etappe: '11-selektoren/02-id-und-gruppen-selektor' },
  ],
});

/* ================= Lektion 3: Verschachtelte Selektoren ================= */
schreibe('lessons/03-verschachtelte-selektoren.json', {
  id: '03-verschachtelte-selektoren',
  title: 'Verschachtelte Selektoren',
  konzepte: ['css.sel-nachfahre'],
  steps: [
    {
      type: 'explain',
      text: 'Auf der Startseite gibt es Links in der Navigation, im Text und im Fußbereich. Alle sind blau – im dunklen Fuß kaum lesbar. Die Regel `a` trifft eben **alle** Links.\n\nDu willst nur die Links **innerhalb** eines Bereichs treffen. Dafür gibt es den **Nachfahren-Selektor**: zwei Selektoren mit einem **Leerzeichen** dazwischen. Er heißt: „Elemente der zweiten Art, die irgendwo innerhalb der ersten liegen.“',
      figure: FIG_NACHFAHRE,
    },
    {
      type: 'explain',
      text: 'So sieht die Regel aus:\n\n```css\nheader a {\n  color: #fff7e8;\n}\n```\n\nLies von links nach rechts: „Suche den `header` – und darin alle `a`.“ Das Leerzeichen ist entscheidend: `header a` ist etwas völlig anderes als `header, a`. Mit Komma wäre es eine Gruppe – der ganze Kopfbereich **und** alle Links der Seite.\n\nKlassen und ids dürfen mitspielen: `.karte p` trifft alle Absätze in Elementen mit der Klasse karte.',
    },
    {
      type: 'example',
      text: 'Nur die Links in der Navigation sind dunkel, der Link im Text bleibt blau. **Ersetze** `nav a` durch `main a` – jetzt trifft es den Link im Text. Und **probiere** `nav, a`: Was macht das Komma?',
      html: `<nav>
  <a href="#">Kader</a>
  <a href="#">Termine</a>
  <a href="#">Ergebnisse</a>
</nav>
<main>
  <p>Nächstes Spiel am Samstag – Infos im <a href="#">Team-Chat</a>.</p>
</main>
`,
      css: `a {
  color: #0b7dd6;
}

nav {
  background-color: #e8ecf7;
}

nav a {
  color: #1b1b2f;
}
`,
    },
    {
      type: 'quiz',
      question: 'Was trifft der Selektor `nav a`?',
      options: ['Alle Links, die innerhalb der Navigation liegen', 'Die Navigation und alle Links der Seite', 'Alle Links mit der Klasse nav'],
      correct: 0,
      explanation: 'Leerzeichen heißt „innerhalb von“. Die Navigation **und** alle Links wären `nav, a` – mit Komma. Eine Klasse hätte einen Punkt.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Links innerhalb der Turniertabelle: Sie bekommen die Farbe `#1a8f3c`. Der Link im Absatz über der Tabelle bleibt blau.',
      starter: {
        html: HTML_TABELLE_LINKS,
        css: `body {
  color: #1b1b2f;
}

a {
  color: #0b7dd6;
}

/* Regel für die Links in der Tabelle */
`,
      },
      editable: ['css'],
      hints: [
        'Nicht alle Links – nur die innerhalb der Tabelle. Zwei Selektoren, ein Leerzeichen.',
        'Muster aus einem anderen Kontext: `header a { color: red; }` färbt alle Links im Kopfbereich rot.',
        'Erst das umschließende Element (die Tabelle), Leerzeichen, dann das Link-Element – dann die Klammern mit der Farbe.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

a {
  color: #0b7dd6;
}

table a {
  color: #1a8f3c;
}
`,
      },
      tests: [
        { type: 'style', selector: 'table a', prop: 'color', expected: '#1a8f3c', label: 'Die Team-Links in der Tabelle sind grün (#1a8f3c)' },
        { type: 'style', selector: 'p a', prop: 'color', expected: '#0b7dd6', label: 'Der Spielplan-Link im Absatz bleibt blau' },
      ],
    },
    {
      type: 'explain',
      text: '**Irgendwo innerhalb** heißt wirklich irgendwo: `table a` trifft den Link auch, wenn er in einer Zelle in einer Zeile in der Tabelle steckt. Der Browser prüft nur, ob irgendwo darüber ein `table` liegt.\n\nUnd der Streit mit der alten Regel? `nav a` ist **genauer** als `a`, weil es zwei Teile hat – und genauer gewinnt. Deshalb darf die allgemeine `a`-Regel stehen bleiben.',
    },
    {
      type: 'fill',
      text: 'Alle Listenpunkte innerhalb der Navigation sollen fett werden. **Vervollständige** den Selektor.',
      template: '___ ___ {\n  font-weight: bold;\n}',
      accept: [['nav'], ['li']],
      hint: 'Erst der Bereich (Navigation), dann das Element (Listenpunkt) – mit Leerzeichen.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Spielerkarten (Klasse `karte`): Überschriften innerhalb der Karten bekommen die Farbe `#0b7dd6`, Absätze innerhalb der Karten die Farbe `#6b6b7a`. Überschrift und Absatz über den Karten bleiben dunkel.',
      starter: {
        html: HTML_KARTEN,
        css: `body {
  color: #1b1b2f;
}

.karte {
  background-color: #e8ecf7;
}

/* Regeln für Überschriften und Absätze in den Karten */
`,
      },
      editable: ['css'],
      hints: [
        'Zwei Regeln, beide beginnen mit der Klasse der Karte – dann Leerzeichen und das Element.',
        'Muster: `.box li { color: red; }` färbt alle Listenpunkte in Elementen mit der Klasse box rot.',
        'Erste Regel: Klassen-Selektor, Leerzeichen, h3. Zweite Regel: Klassen-Selektor, Leerzeichen, p. Jeweils die Farbe aus der Aufgabe.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

.karte {
  background-color: #e8ecf7;
}

.karte h3 {
  color: #0b7dd6;
}

.karte p {
  color: #6b6b7a;
}
`,
      },
      tests: [
        { type: 'style', selector: '.karte h3', prop: 'color', expected: '#0b7dd6', label: 'Die Namen in den Karten sind blau' },
        { type: 'style', selector: '.karte p', prop: 'color', expected: '#6b6b7a', label: 'Die Texte in den Karten sind grau' },
        { type: 'style', selector: 'body > h2', prop: 'color', expected: '#1b1b2f', label: 'Die Überschrift über den Karten bleibt dunkel' },
        { type: 'style', selector: 'body > p', prop: 'color', expected: '#1b1b2f', label: 'Der Absatz über den Karten bleibt dunkel' },
      ],
    },
    {
      type: 'order',
      text: 'Sortiere das HTML: zuerst die Navigation mit dem Start-Link, dann der Hauptbereich mit dem Hilfe-Link. So trifft `nav a` genau **einen** Link.',
      lines: ['<nav>', '  <a href="index.html">Start</a>', '</nav>', '<main>', '  <p>Fragen? <a href="hilfe.html">Hilfe</a></p>', '</main>'],
      explanation: 'Nur der Start-Link liegt innerhalb von nav. Der Hilfe-Link steckt im main – `nav a` lässt ihn in Ruhe.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** den Fehler auf der Clan-Seite: Nur die Links in der dunklen Navigationsleiste sollen gelb sein. Stattdessen ist auch der Link im Text gelb – auf hellem Grund kaum lesbar.',
      starter: {
        html: HTML_CLAN,
        css: `body {
  color: #1b1b2f;
  background-color: #fff7e8;
}

a {
  color: #0b7dd6;
}

nav {
  background-color: #1b1b2f;
}

nav, a {
  color: #ffd23f;
}
`,
      },
      editable: ['css'],
      hints: [
        'Schau dir die letzte Regel an: Trifft sie wirklich nur die Links innerhalb der Navigation?',
        'Komma bedeutet Gruppe – „die Navigation und alle Links“. Für „Links innerhalb der Navigation“ brauchst du ein anderes Zeichen.',
        'Muster: `footer p` trifft Absätze innerhalb des Fußbereichs – ohne Komma.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
  background-color: #fff7e8;
}

a {
  color: #0b7dd6;
}

nav {
  background-color: #1b1b2f;
}

nav a {
  color: #ffd23f;
}
`,
      },
      tests: [
        { type: 'style', selector: 'nav a', prop: 'color', expected: '#ffd23f', label: 'Die Links in der Navigation sind gelb' },
        { type: 'style', selector: 'main a', prop: 'color', expected: '#0b7dd6', label: 'Der Link im Text ist wieder blau' },
        { type: 'style', selector: 'nav', prop: 'background-color', expected: '#1b1b2f', label: 'Die Navigationsleiste bleibt dunkel' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Auf der Startseite sind alle Links blau – auch im dunklen Fußbereich, wo Blau kaum zu erkennen ist, und in der Navigation, die bald ihren eigenen Look bekommt.\n\nZwei Nachfahren-Selektoren regeln das: Links in der Navigation werden dunkel, Links im Fuß gelb. Die Links im Hauptbereich behalten ihr Blau – die alte `a`-Regel bleibt einfach stehen.',
    },
    { type: 'code', etappe: '11-selektoren/03-verschachtelte-selektoren' },
  ],
});

/* ================= Lektion 4: hover ================= */
schreibe('lessons/04-hover.json', {
  id: '04-hover',
  title: 'hover – Maus darüber',
  konzepte: ['css.hover'],
  steps: [
    {
      type: 'explain',
      text: 'Fahr auf einer beliebigen Website mit der Maus über einen Link: Er wechselt die Farbe oder wird unterstrichen. Das ist kein JavaScript, sondern CSS – eine **Pseudoklasse**.\n\nEine Pseudoklasse beschreibt einen **Zustand**, der im HTML nicht steht. `:hover` heißt „die Maus ist gerade darüber“. Sie wird mit **Doppelpunkt** direkt an den Selektor gehängt – ohne Leerzeichen.',
      figure: FIG_HOVER,
    },
    {
      type: 'explain',
      text: 'Zwei Regeln für einen Link:\n\n```css\na {\n  color: #0b7dd6;\n}\n\na:hover {\n  color: #d94f00;\n}\n```\n\nDie `:hover`-Regel steht **unter** der normalen Regel. Solange die Maus über dem Link ist, gilt sie – danach springt der Link zurück.\n\nZum Prüfen liest Robby deinen Quelltext, denn eine Maus kann er nicht bewegen. Ausprobieren musst du selbst: in der Vorschau über den Link fahren.',
    },
    {
      type: 'example',
      text: '**Fahr** in der Vorschau mit der Maus über die Links. **Ändere** die Farbe in `a:hover` – oder tausche `color` gegen `background-color` und beobachte, was beim Überfahren passiert.',
      html: `<nav>
  <a href="#">Start</a>
  <a href="#">Sneaker-Drops</a>
  <a href="#">Wunschliste</a>
</nav>
`,
      css: `a {
  color: #0b7dd6;
}

a:hover {
  color: #ff6a00;
}
`,
    },
    {
      type: 'quiz',
      question: 'Wann gilt die Regel `a:hover`?',
      options: ['Solange die Maus über dem Link steht', 'Nachdem der Link angeklickt wurde', 'Immer – sie ersetzt die normale Link-Regel'],
      correct: 0,
      explanation: 'hover = „darüber schweben“. Verlässt die Maus den Link, gilt sofort wieder die normale Regel.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Links der Navigationsleiste beim Überfahren mit der Maus: Sie werden dann gelb `#ffd23f`. Ohne Maus bleiben sie hell.',
      starter: {
        html: HTML_NAV,
        css: `nav {
  background-color: #1b1b2f;
}

nav a {
  color: #fff7e8;
}

/* Regel für den Zustand „Maus darüber“ */
`,
      },
      editable: ['css'],
      hints: [
        'Der Zustand „Maus darüber“ ist eine Pseudoklasse – sie hängt mit Doppelpunkt am Selektor.',
        'Muster: `button:hover { color: red; }` färbt Knöpfe rot, solange die Maus darüber ist.',
        'Neue Regel unter der nav-a-Regel: gleicher Selektor plus Pseudoklasse, in den Klammern die Farbe aus der Aufgabe.',
      ],
      solution: {
        css: `nav {
  background-color: #1b1b2f;
}

nav a {
  color: #fff7e8;
}

nav a:hover {
  color: #ffd23f;
}
`,
      },
      tests: [
        { type: 'source', file: 'css', matches: 'a:hover\\s*\\{(\\s*|[^}]*[\\s;])color\\s*:\\s*#ffd23f', label: 'Es gibt eine hover-Regel für die Links mit der Farbe #ffd23f' },
        { type: 'style', selector: 'nav a', prop: 'color', expected: '#fff7e8', label: 'Ohne Maus bleiben die Links hell' },
      ],
    },
    {
      type: 'explain',
      text: '`:hover` geht nicht nur bei Links – jedes Element kann den Zustand haben:\n\n```css\ntr:hover {\n  background-color: #fff7e8;\n}\n```\n\nSo leuchtet in einer Tabelle die Zeile auf, über der die Maus steht. Die Pseudoklasse hängt immer am **letzten** Teil des Selektors: `nav a:hover`, `.karte:hover`.\n\nAber: Auf dem Handy gibt es keine Maus und kein Darüberfahren. Nichts Wichtiges darf **nur** per hover erreichbar sein.',
    },
    {
      type: 'fill',
      text: 'Der Knopf soll orange werden, sobald die Maus darüber ist. **Vervollständige** den Selektor.',
      template: 'button___ {\n  background-color: #ff6a00;\n}',
      accept: [':hover'],
      hint: 'Doppelpunkt und der Name des Zustands – direkt angehängt, ohne Leerzeichen.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Turniertabelle: Jede Zeile bekommt beim Überfahren mit der Maus die Hintergrundfarbe `#ffd23f`. Ohne Maus bleiben die Zeilen ohne Hintergrund.',
      starter: {
        html: HTML_TURNIERTABELLE,
        css: `body {
  color: #1b1b2f;
}

th {
  color: #d94f00;
}

/* Regel für Zeilen unter der Maus */
`,
      },
      editable: ['css'],
      hints: [
        'Zeilen sind das Element tr. Der Zustand „Maus darüber“ kommt mit Doppelpunkt dahinter.',
        'Muster: `li:hover { color: red; }` – hier brauchst du statt der Textfarbe die Hintergrundfarbe.',
        'tr, Doppelpunkt, hover, Klammern – darin die Hintergrund-Eigenschaft mit dem Wert aus der Aufgabe.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

th {
  color: #d94f00;
}

tr:hover {
  background-color: #ffd23f;
}
`,
      },
      tests: [
        { type: 'source', file: 'css', matches: 'tr:hover\\s*\\{(\\s*|[^}]*[\\s;])background-color\\s*:\\s*#ffd23f', label: 'Zeilen haben eine hover-Regel mit der Hintergrundfarbe #ffd23f' },
        { type: 'style', selector: 'tr', prop: 'background-color', expected: 'transparent', label: 'Ohne Maus haben die Zeilen keinen Hintergrund' },
        { type: 'style', selector: 'th', prop: 'color', expected: '#d94f00', label: 'Die Kopfzellen bleiben dunkelorange' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne zu.',
      pairs: [
        ['`a`', 'Link im Normalzustand'],
        ['`a:hover`', 'Link, solange die Maus darüber ist'],
        ['`tr:hover`', 'Tabellenzeile unter der Maus'],
        ['`nav a:hover`', 'Navigations-Link unter der Maus'],
        ['hover auf dem Handy', 'funktioniert nicht – es gibt keine Maus'],
      ],
    },
    {
      type: 'code',
      task: '**Gestalte** die Spielerkarten: 1. Karten (Klasse `karte`) bekommen beim Überfahren mit der Maus die Hintergrundfarbe `#ffd23f`. 2. Links innerhalb der Karten werden beim Überfahren orange `#ff6a00`. Ohne Maus ändert sich nichts.',
      starter: {
        html: HTML_KARTEN_LINKS,
        css: `body {
  color: #1b1b2f;
}

a {
  color: #0b7dd6;
}

.karte {
  background-color: #e8ecf7;
}

/* Deine hover-Regeln */
`,
      },
      editable: ['css'],
      hints: [
        'Zwei neue Regeln: eine für die Karte selbst, eine für Links innerhalb der Karte – beide mit der Pseudoklasse.',
        'Die Pseudoklasse hängt am letzten Teil: `.box:hover` bzw. `.box li:hover` – Muster aus einem anderen Kontext.',
        'Regel 1: Klassen-Selektor plus hover, Hintergrundfarbe. Regel 2: Klassen-Selektor, Leerzeichen, a plus hover, Textfarbe.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

a {
  color: #0b7dd6;
}

.karte {
  background-color: #e8ecf7;
}

.karte:hover {
  background-color: #ffd23f;
}

.karte a:hover {
  color: #ff6a00;
}
`,
      },
      tests: [
        { type: 'source', file: 'css', matches: '\\.karte:hover\\s*\\{(\\s*|[^}]*[\\s;])background-color\\s*:\\s*#ffd23f', label: 'Karten haben eine hover-Regel mit der Hintergrundfarbe #ffd23f' },
        { type: 'source', file: 'css', matches: '\\.karte\\s+a:hover\\s*\\{(\\s*|[^}]*[\\s;])color\\s*:\\s*#ff6a00', label: 'Links in den Karten haben eine hover-Regel mit der Farbe #ff6a00' },
        { type: 'style', selector: '.karte', prop: 'background-color', expected: '#e8ecf7', label: 'Ohne Maus bleiben die Karten hellgrau' },
        { type: 'style', selector: '.karte a', prop: 'color', expected: '#0b7dd6', label: 'Ohne Maus bleiben die Links blau' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Die Navigation der Startseite hat seit der letzten Etappe dunkle Links. Jetzt bekommt sie Leben: Fährt jemand mit der Maus über einen Link, leuchtet er in Funken-Orange auf.\n\nDie hover-Regel kommt direkt unter die Regel für die Navigations-Links. Ich prüfe deinen Quelltext – eine Maus, die über den Link fährt, kann ich nicht simulieren. Ausprobieren darfst du selbst.',
    },
    { type: 'code', etappe: '11-selektoren/04-hover' },
  ],
});

/* ================= Lektion 5: Wiederholung ================= */
schreibe('lessons/05-wiederholung.json', {
  id: '05-wiederholung',
  title: 'Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      text: 'Vier Selektoren und eine Pseudoklasse – Zeit, alles einmal durchzuspielen: Punkt, Raute, Komma, Leerzeichen und `:hover`. Dazu kommt Stoff aus dem Lichtpult, dem Ticket-Schalter, dem Timetable und dem Textbanner. Am Ende schließt du die Galerie-Seite ans Stylesheet an.',
    },
    {
      type: 'quiz',
      question: 'Ein Absatz hat die id `einlass` und die Klasse `hinweis`. Oben steht `#einlass { color: red; }`, darunter `.hinweis { color: blue; }`. Welche Farbe?',
      options: ['Rot – die id ist stärker als die Klasse', 'Blau – die spätere Regel gewinnt immer', 'Lila – beide Farben mischen sich'],
      correct: 0,
      explanation: 'id schlägt Klasse, egal wo die Regeln stehen. Die Reihenfolge entscheidet nur bei Gleichstand.',
    },
    {
      type: 'fill',
      text: 'Die Galerie-Seite soll das Stylesheet benutzen. **Vervollständige** die Verknüpfung im Kopfbereich.',
      template: '<___ rel="___" href="style.css">',
      accept: [['link'], ['stylesheet']],
      hint: 'Das Leerelement für Verknüpfungen im head; das rel-Attribut nennt die Art der Datei – ein Stylesheet.',
    },
    {
      type: 'code',
      task: '**Gestalte** das Anmeldeformular der Fahrschule: 1. Der Absende-Knopf bekommt im HTML die Klasse `absenden`. 2. Diese Klasse bekommt die Hintergrundfarbe `#ff6a00`, beim Überfahren mit der Maus `#d94f00`. 3. Alle Beschriftungen werden fett.',
      starter: {
        html: `<h2>Anmeldung Fahrstunde</h2>
<form>
  <label for="name">Name</label>
  <input type="text" id="name" name="name">
  <label for="email">E-Mail</label>
  <input type="email" id="email" name="email">
  <label for="klasse">Führerscheinklasse</label>
  <select id="klasse" name="klasse">
    <option>B – Auto</option>
    <option>A1 – Leichtkraftrad</option>
  </select>
  <button type="submit">Termin anfragen</button>
</form>
`,
        css: `body {
  color: #1b1b2f;
}

/* Deine Regeln */
`,
      },
      editable: ['html', 'css'],
      hints: [
        'HTML-Tab: das class-Attribut an den Knopf. CSS-Tab: drei Regeln – Beschriftungen, Klasse, Klasse mit hover.',
        'Klasse im HTML: `class="…"` als Attribut im öffnenden Tag. Im CSS mit Punkt ansprechen, hover mit Doppelpunkt anhängen.',
        'Regeln: label mit Schriftstärke bold; Punkt-Klasse mit Hintergrundfarbe; Punkt-Klasse plus hover mit der zweiten Hintergrundfarbe.',
      ],
      solution: {
        html: `<h2>Anmeldung Fahrstunde</h2>
<form>
  <label for="name">Name</label>
  <input type="text" id="name" name="name">
  <label for="email">E-Mail</label>
  <input type="email" id="email" name="email">
  <label for="klasse">Führerscheinklasse</label>
  <select id="klasse" name="klasse">
    <option>B – Auto</option>
    <option>A1 – Leichtkraftrad</option>
  </select>
  <button type="submit" class="absenden">Termin anfragen</button>
</form>
`,
        css: `body {
  color: #1b1b2f;
}

label {
  font-weight: bold;
}

.absenden {
  background-color: #ff6a00;
}

.absenden:hover {
  background-color: #d94f00;
}
`,
      },
      tests: [
        { type: 'selector', selector: 'button.absenden', count: 1, label: 'Der Absende-Knopf hat die Klasse „absenden“' },
        { type: 'style', selector: '.absenden', prop: 'background-color', expected: '#ff6a00', label: 'Der Knopf ist orange (#ff6a00)' },
        { type: 'source', file: 'css', matches: '\\.absenden:hover\\s*\\{(\\s*|[^}]*[\\s;])background-color\\s*:\\s*#d94f00', label: 'Der Knopf hat eine hover-Regel mit der Hintergrundfarbe #d94f00' },
        { type: 'style', selector: 'label', prop: 'font-weight', expected: ['700', 'bold'], label: 'Die Beschriftungen sind fett' },
        { type: 'selector', selector: 'form label', count: 3, label: 'Die drei Beschriftungen sind noch da' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die HTML-Elemente ihrer Bedeutung zu.',
      pairs: [
        ['`<th>`', 'Kopfzelle einer Tabelle'],
        ['`<td>`', 'Datenzelle einer Tabelle'],
        ['`<tr>`', 'Zeile einer Tabelle'],
        ['`<strong>`', 'starke Betonung'],
        ['`<em>`', 'leichte Betonung'],
        ['`<hr>`', 'Trennlinie'],
      ],
    },
    {
      type: 'order',
      text: 'Sortiere die Tabelle mit einer Kopfzeile: erst die Kopfzelle „Team“, dann „Punkte“.',
      lines: ['<table>', '  <tr>', '    <th>Team</th>', '    <th>Punkte</th>', '  </tr>', '</table>'],
      explanation: 'Zeile in die Tabelle, Kopfzellen in die Zeile – Kopfzellen sind th statt td.',
    },
    {
      type: 'quiz',
      question: 'Wie verknüpfst du die Beschriftung „Name“ mit dem Eingabefeld, das die id `name` hat?',
      options: ['Mit einem label, dessen for-Attribut den Wert name hat', 'Mit einem Absatz direkt vor dem Feld', 'Mit einer Kopfzelle über dem Feld'],
      correct: 0,
      explanation: 'label und for verbinden Text und Feld – ein Klick auf die Beschriftung setzt den Cursor ins Feld.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** zwei Fehler auf der Kader-Seite: Nur die stark betonten Wörter sollen orange sein, und der Absatz mit der Klasse `hinweis` soll fett sein. Stattdessen sind alle Absätze orange, und der Hinweis ist nicht fett.',
      starter: {
        html: `<h2>Kader – Saison 2027</h2>
<p>Unser Kapitän <strong>Mo</strong> spielt seit 2022 im Team.</p>
<p>Neu dabei: <strong>Aylin</strong> im Sturm und <strong>Samir</strong> in der Abwehr.</p>
<p class="hinweis">Training immer dienstags und donnerstags um 18 Uhr.</p>
`,
        css: `body {
  color: #1b1b2f;
}

strong, p {
  color: #ff6a00;
}

#hinweis {
  font-weight: bold;
}
`,
      },
      editable: ['css'],
      hints: [
        'Fehler 1 steckt im Selektor der orangen Regel: Wer soll getroffen werden – nur strong oder auch p?',
        'Fehler 2: Der Hinweis hat im HTML eine Klasse, keine id. Welches Zeichen gehört vor den Namen?',
        'Erste Regel: ein Element zu viel in der Gruppe. Zweite Regel: Das Zeichen vor hinweis passt nicht zum HTML.',
      ],
      solution: {
        css: `body {
  color: #1b1b2f;
}

strong {
  color: #ff6a00;
}

.hinweis {
  font-weight: bold;
}
`,
      },
      tests: [
        { type: 'style', selector: 'strong', prop: 'color', expected: '#ff6a00', label: 'Die betonten Namen sind orange' },
        { type: 'style', selector: 'p:not(.hinweis)', prop: 'color', expected: '#1b1b2f', label: 'Die Absätze sind wieder dunkel' },
        { type: 'style', selector: '.hinweis', prop: 'font-weight', expected: ['700', 'bold'], label: 'Der Hinweis ist fett' },
        { type: 'style', selector: '.hinweis', prop: 'color', expected: '#1b1b2f', label: 'Der Hinweis ist dunkel, nicht orange' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Die Galerie-Seite hängt noch nicht am Stylesheet – sie sieht aus wie 2005. Zwei Dinge im HTML-Tab: die Verknüpfung mit style.css im Kopfbereich und die Klasse `highlight` für die Aftermovie-Überschrift. Dann im CSS-Tab die passende Regel: blau.\n\nZwei Tabs, zwei Dateien, ein Prüfen – so arbeitest du ab jetzt immer.',
    },
    { type: 'code', etappe: '11-selektoren/05-wiederholung' },
  ],
});

/* ================= Lektion 6: Projekt ================= */
schreibe('lessons/06-projekt-selektoren.json', {
  id: '06-projekt-selektoren',
  title: 'Projekt: Selektoren im Einsatz',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Meilenstein! Die Spots sitzen: Klasse, id, Gruppe, Nachfahre und hover. Rückblick: Der Einlass-Hinweis leuchtet, die Sprungziele sind blau, Navigation und Fuß haben eigene Linkfarben, die Navigation reagiert auf die Maus, und die Galerie hängt am Stylesheet.\n\nJetzt bekommt die Programm-Seite den letzten Schliff: Kopfzellen in Funken-Orange, Bildunterschriften in ruhigem Grau – mit zwei schlichten Element-Selektoren.',
    },
    {
      type: 'pair',
      text: 'Kontrolle: Welcher Selektor trifft was?',
      pairs: [
        ['`th`', 'alle Kopfzellen aller Tabellen'],
        ['`figcaption`', 'alle Bildunterschriften'],
        ['`.highlight`', 'alle Elemente mit der Klasse highlight'],
        ['`#lineup`', 'das eine Element mit der id lineup'],
        ['`nav a`', 'alle Links innerhalb der Navigation'],
        ['`a:hover`', 'Links, solange die Maus darüber ist'],
      ],
    },
    {
      type: 'quiz',
      question: 'Die Regel für Kopfzellen kommt in style.css. Wo wirkt sie?',
      options: ['Auf jeder Seite, die style.css verknüpft – in allen Tabellen', 'Nur auf der Programm-Seite', 'Nur in der ersten Tabelle jeder Seite'],
      correct: 0,
      explanation: 'Ein externes Stylesheet gilt überall, wo es eingebunden ist: Startseite, Programm, Galerie. Genau deshalb lohnt sich eine Regel statt vieler.',
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Zwei Regeln am Ende des Stylesheets, zwei Element-Selektoren – und weil style.css auf allen Seiten eingebunden ist, wirken sie überall: im Timetable der Programm-Seite genauso wie bei den Bildunterschriften der Galerie.\n\nWenn die Etappe steht, schau dir das Ergebnis an: [FUNKEN-Website ansehen](#/projekt). Danach geht es zum Schriftzug – Schrift und Text.',
    },
    { type: 'code', etappe: '11-selektoren/06-projekt-selektoren' },
  ],
});

/* ================= Fragenpool ================= */
schreibe('pool.json', {
  chapter: '11-selektoren',
  fragen: [
    { id: '11-01', konzept: 'css.sel-klasse', type: 'quiz', question: 'Welcher Selektor trifft alle Elemente mit `class="neu"`?', options: ['`.neu`', '`#neu`', '`neu`'], correct: 0, explanation: 'Punkt = Klasse. Die Raute ist für ids, ohne Zeichen sucht der Browser ein Element namens neu.' },
    { id: '11-02', konzept: 'css.sel-id', type: 'quiz', question: 'Welcher Selektor trifft das Element mit `id="oben"`?', options: ['`#oben`', '`.oben`', '`id oben`'], correct: 0, explanation: 'Raute = id. Der Punkt wäre eine Klasse.' },
    { id: '11-03', konzept: 'css.sel-gruppe', type: 'fill', text: 'Eine Regel soll beide Überschriftenebenen färben. Welches Zeichen fehlt?', template: 'h1___ h2 {\n  color: #d94f00;\n}', accept: [','], hint: 'Gruppen-Selektor: Die Selektoren werden durch ein Satzzeichen getrennt.' },
    { id: '11-04', konzept: 'css.sel-nachfahre', type: 'quiz', question: 'Was trifft der Selektor `footer a`?', options: ['Alle Links innerhalb des Fußbereichs', 'Den Fußbereich und alle Links', 'Alle Links mit der Klasse footer'], correct: 0, explanation: 'Leerzeichen = „innerhalb von“. Für „Fußbereich und alle Links“ bräuchte es ein Komma.' },
    { id: '11-05', konzept: 'css.hover', type: 'quiz', question: 'Wann gilt die Regel `a:hover`?', options: ['Solange die Maus über dem Link ist', 'Nach dem Klick auf den Link', 'Immer, auch ohne Maus'], correct: 0, explanation: 'hover = Maus darüber. Danach gilt wieder die normale Regel.' },
    { id: '11-06', konzept: 'css.sel-element', type: 'quiz', question: 'Was trifft der Selektor `li`?', options: ['Alle Listenpunkte der Seite', 'Nur den ersten Listenpunkt', 'Alle Elemente mit der Klasse li'], correct: 0, explanation: 'Ein Element-Selektor trifft jedes Element dieses Typs.' },
    { id: '11-07', konzept: 'css.sel-klasse', type: 'bug', text: 'Der Absatz mit `class="hinweis"` wird nicht rot. Welche Zeile ist falsch?', lines: ['hinweis {', '  color: red;', '  font-weight: bold;', '}'], line: 0, explanation: 'Klassen brauchen den Punkt: `.hinweis {`.' },
    { id: '11-08', konzept: 'css.sel-id', type: 'bug', text: 'Die Überschrift mit `id="lineup"` bleibt schwarz. Welche Zeile ist falsch?', lines: ['.lineup {', '  color: #0b7dd6;', '}'], line: 0, explanation: 'Eine id wird mit Raute angesprochen: `#lineup`. Der Punkt sucht eine Klasse.' },
    { id: '11-09', konzept: 'css.sel-nachfahre', type: 'bug', text: 'Alle Links der Seite sind gelb – nur die in der Navigation sollten es sein. Welche Zeile ist falsch?', lines: ['nav, a {', '  color: #ffd23f;', '}'], line: 0, explanation: 'Komma = Gruppe (nav und alle a). Für Links innerhalb von nav: Leerzeichen – `nav a`.' },
    { id: '11-10', konzept: 'css.hover', type: 'bug', text: 'Der Link soll beim Überfahren orange werden, aber nichts passiert. Welche Zeile ist falsch?', lines: ['a hover {', '  color: #ff6a00;', '}'], line: 0, explanation: 'Die Pseudoklasse braucht den Doppelpunkt, ohne Leerzeichen: `a:hover`.' },
    { id: '11-11', konzept: 'css.sel-gruppe', type: 'pair', text: 'Ordne die Selektoren zu.', pairs: [['`h1, h2`', 'Gruppe: alle h1 und alle h2'], ['`nav a`', 'Links innerhalb der Navigation'], ['`.neu`', 'alle Elemente mit der Klasse neu'], ['`#oben`', 'das Element mit der id oben']] },
    { id: '11-12', konzept: 'css.sel-nachfahre', type: 'order', text: 'Sortiere so, dass `nav a` genau einen Link trifft – die Navigation zuerst.', lines: ['<nav>', '  <a href="index.html">Start</a>', '</nav>', '<p>Fragen? <a href="hilfe.html">Hilfe</a></p>'], explanation: 'Nur der Link innerhalb von nav wird getroffen – der im Absatz nicht.' },
    { id: '11-13', konzept: 'css.sel-id', type: 'order', text: 'Sortiere die Selektoren von schwach nach stark.', lines: ['p', '.hinweis', '#einlass'], explanation: 'Element < Klasse < id.' },
    { id: '11-14', konzept: 'css.hover', type: 'fill', text: 'Der Link soll orange werden, solange die Maus darüber ist. Vervollständige.', template: 'a___ {\n  color: #ff6a00;\n}', accept: [':hover'], hint: 'Pseudoklasse mit Doppelpunkt.' },
    { id: '11-15', konzept: 'css.sel-klasse', type: 'fill', text: 'Alle Elemente mit der Klasse sieg werden grün. Welches Zeichen fehlt?', template: '___sieg {\n  color: #1a8f3c;\n}', accept: ['.'], hint: 'Das Zeichen für Klassen.' },
    { id: '11-16', konzept: 'css.sel-element', type: 'fill', text: 'Alle Kopfzellen aller Tabellen sollen orange werden. Welcher Selektor?', template: '___ {\n  color: #ff6a00;\n}', accept: ['th'], hint: 'Der Elementname der Kopfzelle, ohne spitze Klammern.' },
    { id: '11-17', konzept: 'css.sel-gruppe', type: 'bug', text: 'h1 und h2 sollen beide orange sein, aber keine der beiden ist es. Welche Zeile ist falsch?', lines: ['h1 h2 {', '  color: #ff6a00;', '}'], line: 0, explanation: 'Leerzeichen heißt „h2 innerhalb von h1“ – das gibt es nicht. Gruppe = Komma: `h1, h2`.' },
    { id: '11-18', konzept: 'css.hover', type: 'quiz', question: 'Warum funktioniert `:hover` auf dem Handy nicht?', options: ['Es gibt keine Maus, die über Elemente fahren kann', 'Handys können kein CSS', 'hover geht nur bei Links'], correct: 0, explanation: 'Ohne Maus gibt es kein Darüberfahren. Wichtiges darf nie nur per hover erreichbar sein.' },
    { id: '11-19', konzept: 'css.sel-klasse', type: 'quiz', question: 'Oben steht `li { color: red; }`, darunter `.sieg { color: green; }`. Welche Farbe hat ein Listenpunkt mit der Klasse sieg?', options: ['Grün – Klasse schlägt Element', 'Rot – die erste Regel gewinnt', 'Rot – Element schlägt Klasse'], correct: 0, explanation: 'Rangfolge: id schlägt Klasse schlägt Element. Die Reihenfolge zählt nur bei Gleichstand.' },
    { id: '11-20', konzept: 'css.sel-element', type: 'pair', text: 'Welcher Selektor trifft was?', pairs: [['`p`', 'alle Absätze'], ['`th`', 'alle Kopfzellen'], ['`a`', 'alle Links'], ['`figcaption`', 'alle Bildunterschriften']] },
  ],
});

/* ================= Abnahme ================= */
schreibe('boss.json', {
  chapter: '11-selektoren',
  title: 'Abnahme: Spots',
  intro: 'Okay, die Spots sitzen – der Einlass leuchtet, und die Navigation wird orange, wenn man drüberfährt. Aber ich hab gestern selbst so eine Regel getippt, und nichts ist passiert. Zeigt mir, dass ihr wisst, wo Punkt, Raute und Komma hingehören.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'css.sel-klasse', type: 'quiz', question: 'Der Absatz `<p class="hinweis">` soll gestaltet werden. Welcher Selektor?', options: ['`.hinweis`', '`#hinweis`', '`p.class`'], correct: 0, explanation: 'Punkt für Klassen, Raute für ids.' },
    { konzept: 'css.sel-gruppe', type: 'fill', text: 'Beide Überschriften mit id sollen in einer Regel blau werden. Welches Zeichen fehlt?', template: '#lineup___ #anfahrt {\n  color: #0b7dd6;\n}', accept: [','] },
    {
      type: 'code',
      task: '**Gestalte** die Navigationsleiste der Clan-Seite: Links in der Navigation bekommen die Farbe `#fff7e8`, beim Überfahren mit der Maus `#ffd23f`. Der Link im Text bleibt blau.',
      starter: {
        html: `<nav>
  <a href="#">Start</a>
  <a href="#">Kader</a>
  <a href="#">Termine</a>
</nav>
<main>
  <p>Nächstes Scrim am Freitag – Details im <a href="#">Team-Chat</a>.</p>
</main>
`,
        css: `body {
  color: #1b1b2f;
}

a {
  color: #0b7dd6;
}

nav {
  background-color: #1b1b2f;
}

/* Deine Regeln */
`,
      },
      editable: ['css'],
      solution: {
        css: `body {
  color: #1b1b2f;
}

a {
  color: #0b7dd6;
}

nav {
  background-color: #1b1b2f;
}

nav a {
  color: #fff7e8;
}

nav a:hover {
  color: #ffd23f;
}
`,
      },
      tests: [
        { type: 'style', selector: 'nav a', prop: 'color', expected: '#fff7e8', label: 'Die Navigations-Links sind hell (#fff7e8)' },
        { type: 'source', file: 'css', matches: 'a:hover\\s*\\{(\\s*|[^}]*[\\s;])color\\s*:\\s*#ffd23f', label: 'Es gibt eine hover-Regel für die Links mit der Farbe #ffd23f' },
        { type: 'style', selector: 'main a', prop: 'color', expected: '#0b7dd6', label: 'Der Link im Text bleibt blau' },
      ],
    },
    { konzept: 'html.table', type: 'pair', text: 'Ordne die Tabellen-Elemente zu.', pairs: [['`<table>`', 'die ganze Tabelle'], ['`<tr>`', 'eine Zeile'], ['`<th>`', 'eine Kopfzelle'], ['`<td>`', 'eine Datenzelle']] },
    { konzept: 'css.link', type: 'quiz', question: 'Wo steht die Verknüpfung zur Datei style.css?', options: ['Im head, als link-Element', 'Ganz unten im body', 'In der CSS-Datei selbst'], correct: 0, explanation: 'Das link-Element im head verbindet die Seite mit dem Stylesheet.' },
    { konzept: 'css.sel-nachfahre', type: 'bug', text: 'Nur die Absätze in den Spielerkarten (Klasse karte) sollen grau sein – aber alle Absätze sind grau. Welche Zeile ist falsch?', lines: ['.karte, p {', '  color: #6b6b7a;', '}'], line: 0, explanation: 'Komma = Gruppe: die Karten und alle Absätze. Für Absätze innerhalb der Karten: `.karte p` mit Leerzeichen.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** zwei Fehler auf der Turnier-Seite: Die Überschrift mit der id `finale` soll dunkelorange `#d94f00` sein, und Tabellenzeilen sollen beim Überfahren mit der Maus die Hintergrundfarbe `#fff7e8` bekommen. Beides passiert nicht.',
      starter: {
        html: `<h2 id="finale">Finale: Team West gegen Team Nord</h2>
<table>
  <tr>
    <th>Minute</th>
    <th>Ereignis</th>
  </tr>
  <tr>
    <td>12</td>
    <td>1:0 Team West</td>
  </tr>
  <tr>
    <td>37</td>
    <td>1:1 Team Nord</td>
  </tr>
  <tr>
    <td>58</td>
    <td>2:1 Team West</td>
  </tr>
</table>
`,
        css: `body {
  color: #1b1b2f;
}

.finale {
  color: #d94f00;
}

tr hover {
  background-color: #fff7e8;
}
`,
      },
      editable: ['css'],
      solution: {
        css: `body {
  color: #1b1b2f;
}

#finale {
  color: #d94f00;
}

tr:hover {
  background-color: #fff7e8;
}
`,
      },
      tests: [
        { type: 'style', selector: '#finale', prop: 'color', expected: '#d94f00', label: 'Die Finale-Überschrift ist dunkelorange (#d94f00)' },
        { type: 'source', file: 'css', matches: 'tr:hover\\s*\\{(\\s*|[^}]*[\\s;])background-color\\s*:\\s*#fff7e8', label: 'Zeilen haben eine hover-Regel mit der Hintergrundfarbe #fff7e8' },
        { type: 'style', selector: 'td', prop: 'color', expected: '#1b1b2f', label: 'Die Zellen bleiben dunkel' },
      ],
    },
    { konzept: 'html.label', type: 'quiz', question: 'Welches Attribut verbindet ein label mit seinem Eingabefeld?', options: ['`for` – mit der id des Feldes', '`href` – mit dem Namen des Feldes', '`class` – mit dem Feldtyp'], correct: 0, explanation: 'for im label und id im Feld tragen denselben Wert.' },
    { konzept: 'css.sel-id', type: 'order', text: 'Sortiere die Selektoren von schwach nach stark.', lines: ['li', '.sieg', '#finale'], explanation: 'Element < Klasse < id – bei Gleichstand gewinnt die spätere Regel.' },
    { konzept: 'html.strong-em', type: 'quiz', question: 'Welches Element betont ein Wort **stark** – der Browser zeigt es fett?', options: ['`<strong>`', '`<em>`', '`<hr>`'], correct: 0, explanation: 'strong = starke Betonung (fett), em = leichte Betonung (kursiv), hr = Trennlinie.' },
    { konzept: 'css.hover', type: 'fill', text: 'Der Knopf soll beim Überfahren mit der Maus orange werden. Vervollständige.', template: 'button___ {\n  background-color: #ff6a00;\n}', accept: [':hover'] },
    { konzept: 'css.background', type: 'quiz', question: 'Mit welcher Eigenschaft bekommt der Fußbereich eine dunkle Hintergrundfarbe?', options: ['`background-color`', '`color`', '`background-farbe`'], correct: 0, explanation: 'color ist die Textfarbe, background-color die Hintergrundfarbe.' },
  ],
});
console.log('Kapitel 11 geschrieben');
