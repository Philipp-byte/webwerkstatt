// Kapitel 08 – Struktur & Attribute (Station „Zonen“).
// Erzeugt public/content/chapters/08-struktur-und-attribute/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const KAPITEL = '08-struktur-und-attribute';
const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', KAPITEL);
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// class = Bändchen (beliebig oft), id = Ticketnummer (genau einmal)
const FIG_CLASS_ID = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">class = Bändchen · id = Ticketnummer</text><rect x="10" y="40" width="158" height="26" rx="6" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="16" y="58" fill="#eef2ff" font-family="monospace">&lt;p class="hinweis"&gt;</text><rect x="10" y="74" width="158" height="26" rx="6" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="16" y="92" fill="#eef2ff" font-family="monospace">&lt;li class="hinweis"&gt;</text><rect x="10" y="108" width="158" height="26" rx="6" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="16" y="126" fill="#eef2ff" font-family="monospace">&lt;td class="hinweis"&gt;</text><text x="89" y="152" text-anchor="middle" fill="#ff7a45">beliebig oft</text><rect x="176" y="74" width="134" height="26" rx="6" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><text x="182" y="92" fill="#eef2ff" font-family="monospace">&lt;h2 id="anfahrt"&gt;</text><text x="243" y="152" text-anchor="middle" fill="#38c7ff">genau 1× pro Seite</text></svg>`;

// div = Block-Kiste um ganze Elemente, span = Inline-Etikett in der Zeile
const FIG_DIV_SPAN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="84" y="22" text-anchor="middle" fill="#ff7a45" font-weight="bold">div = Block-Kiste</text><rect x="14" y="32" width="140" height="116" rx="8" fill="none" stroke="#ff7a45" stroke-width="2" stroke-dasharray="6 4"/><rect x="24" y="42" width="120" height="26" rx="4" fill="#1b2135"/><text x="84" y="60" text-anchor="middle" fill="#eef2ff" font-family="monospace">&lt;h2&gt;</text><rect x="24" y="76" width="120" height="26" rx="4" fill="#1b2135"/><text x="84" y="94" text-anchor="middle" fill="#eef2ff" font-family="monospace">&lt;p&gt;</text><rect x="24" y="110" width="120" height="26" rx="4" fill="#1b2135"/><text x="84" y="128" text-anchor="middle" fill="#eef2ff" font-family="monospace">&lt;ul&gt;</text><text x="238" y="22" text-anchor="middle" fill="#38c7ff" font-weight="bold">span = Inline-Etikett</text><rect x="170" y="70" width="136" height="40" rx="4" fill="#1b2135"/><text x="180" y="95" fill="#eef2ff">Preis:</text><rect x="222" y="78" width="60" height="24" rx="4" fill="#38c7ff"/><text x="252" y="95" text-anchor="middle" fill="#0f1320" font-weight="bold">12 €</text><text x="238" y="134" text-anchor="middle" fill="#eef2ff">bleibt in der Zeile</text></svg>`;

// Seite mit vier Zonen, rechts: was Screenreader und Suchmaschinen davon haben
const FIG_ZONEN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="14" y="12" width="180" height="136" rx="6" fill="#e8ecf7"/><rect x="22" y="20" width="164" height="26" rx="4" fill="#ff7a45"/><text x="104" y="38" text-anchor="middle" fill="#0f1320" font-family="monospace" font-weight="bold">&lt;header&gt;</text><rect x="22" y="50" width="164" height="20" rx="4" fill="#ffd84d"/><text x="104" y="65" text-anchor="middle" fill="#0f1320" font-family="monospace" font-weight="bold">&lt;nav&gt;</text><rect x="22" y="74" width="164" height="42" rx="4" fill="#38c7ff"/><text x="104" y="99" text-anchor="middle" fill="#0f1320" font-family="monospace" font-weight="bold">&lt;main&gt;</text><rect x="22" y="120" width="164" height="20" rx="4" fill="#b48cff"/><text x="104" y="135" text-anchor="middle" fill="#0f1320" font-family="monospace" font-weight="bold">&lt;footer&gt;</text><text x="256" y="40" text-anchor="middle" fill="#eef2ff" font-weight="bold">Screenreader:</text><text x="256" y="62" text-anchor="middle" fill="#ffd84d">„Zur Navigation“</text><text x="256" y="96" text-anchor="middle" fill="#38c7ff">„Zum Hauptinhalt“</text><text x="256" y="130" text-anchor="middle" fill="#eef2ff">+ Suchmaschinen</text></svg>`;

// Gesperrtes Mini-Stylesheet, das die vier Zonen sichtbar einfärbt (nur Kontext, nicht editierbar)
const CSS_ZONEN = `header { background: #ffe0cc; }
nav { background: #fff3b0; }
main { background: #e3f2ff; }
footer { background: #1b1b2f; color: #fff7e8; }
header, nav, main, footer { padding: 8px 12px; }
`;

/* ================= Lektion 1: class und id ================= */
schreibe('lessons/01-class-und-id.json', {
  id: '01-class-und-id',
  title: 'Klasse und id',
  konzepte: ['html.class', 'html.id'],
  steps: [
    {
      type: 'explain',
      text: 'Auf dem FUNKEN-Gelände tragen alle Helfer dasselbe grüne Bändchen – aber jedes Ticket hat eine eigene Nummer. Genauso hat HTML zwei Namensschilder für Elemente:\n\n- **class** (Klasse) ist das Bändchen: Beliebig viele Elemente dürfen dieselbe Klasse tragen.\n- **id** ist die Ticketnummer: Sie kommt genau **einmal** pro Seite vor.\n\nSichtbar ändert sich nichts. Aber mit diesen Namen sprichst du Elemente später gezielt an – in CSS und JavaScript.',
      figure: FIG_CLASS_ID,
    },
    {
      type: 'example',
      text: 'Damit du die Namensschilder *siehst*, hängt hier ein kleines Stylesheet dran – CSS lernst du erst in Kapitel 10, hier nur zuschauen: Alles mit der Klasse `angebot` wird grün, die Überschrift mit der id `karte` bekommt eine Linie.\n\n**Ändere** im HTML: Gib „Salami“ auch die Klasse `angebot` – und nimm sie bei „Gemüse“ weg.',
      html: '<h2 id="karte">Pizza-Truck – Karte</h2>\n<p class="angebot">Margherita – 6 €</p>\n<p>Salami – 7 €</p>\n<p class="angebot">Gemüse – 7 €</p>\n<p>Vier Käse – 8 €</p>\n',
      css: '.angebot { color: #2e7d32; font-weight: bold; }\n#karte { border-bottom: 3px solid #ff6a00; }\n',
      editable: ['html'],
    },
    {
      type: 'quiz',
      question: 'Fünf Absätze auf einer Seite sollen als „Hinweis“ markiert werden. Welches Attribut nimmst du?',
      options: ['`class` – mehrere Elemente dürfen dieselbe Klasse tragen', '`id` – ein Name für alle fünf Absätze', '`href` – das verbindet die Absätze'],
      correct: 0,
      explanation: 'Eine Klasse darf beliebig oft vorkommen. Eine id gibt es nur einmal pro Seite – fünf Absätze mit derselben id wären ein Fehler. href gehört zu Links.',
    },
    {
      type: 'code',
      task: '**Ergänze** im Steckbrief: Die drei Absätze mit Lieblingsspiel, Plattform und „Spielt seit“ bekommen die Klasse `fakt`. Der Motto-Absatz bleibt ohne Klasse.',
      starter: {
        html: '<h2>Steckbrief: Mila</h2>\n<p>Lieblingsspiel: Sternenflotte 3</p>\n<p>Plattform: Konsole</p>\n<p>Spielt seit: 2021</p>\n<p>Motto: Erst denken, dann drücken.</p>\n',
      },
      hints: [
        'Die Klasse ist ein Attribut im öffnenden Tag – der Text im Absatz bleibt, wie er ist.',
        'Muster aus einem anderen Kontext: `<li class="neu">Neon Runner</li>` – Attributname, Gleichheitszeichen, Wert in Anführungszeichen.',
        'Dreimal dasselbe Attribut mit dem Wert fakt: `<p class="…">Lieblingsspiel: …</p>` – und genauso bei den zwei anderen Fakten.',
      ],
      solution: {
        html: '<h2>Steckbrief: Mila</h2>\n<p class="fakt">Lieblingsspiel: Sternenflotte 3</p>\n<p class="fakt">Plattform: Konsole</p>\n<p class="fakt">Spielt seit: 2021</p>\n<p>Motto: Erst denken, dann drücken.</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'p.fakt', count: 3, label: 'Drei Absätze tragen die Klasse „fakt“' },
        { type: 'text', selector: 'p.fakt', expected: 'Lieblingsspiel: Sternenflotte 3', label: 'Der erste Fakt ist das Lieblingsspiel' },
        { type: 'attr', selector: 'p:last-of-type', attr: 'class', absent: true, label: 'Der Motto-Absatz hat keine Klasse' },
        { type: 'selector', selector: 'p', count: 4, label: 'Es sind noch alle vier Absätze da' },
      ],
    },
    {
      type: 'explain',
      text: 'Die **id** kennst du von den Sprungmarken: `href="#lineup"` springt zum Element mit `id="lineup"`. Genau deshalb darf jede id nur **einmal** vorkommen – sonst wüsste der Browser nicht, wohin.\n\nEin Element darf dagegen **mehrere Klassen** tragen, getrennt durch ein Leerzeichen:\n\n```html\n<h2 id="steckbrief">Steckbrief</h2>\n<p class="fakt wichtig">Plattform: Konsole</p>\n```\n\nLeerzeichen, kein Komma – sonst versteht der Browser beide Klassen falsch.',
    },
    {
      type: 'fill',
      text: 'Mehrere Absätze sollen als Warnung markiert werden, die Überschrift „Einstellungen“ ist das Ziel einer Sprungmarke. **Vervollständige** die Attributnamen.',
      template: '<h2 ___="einstellungen">Einstellungen</h2>\n<p ___="warnung">Akku fast leer.</p>\n<p ___="warnung">Speicher voll.</p>',
      accept: [['id'], ['class'], ['class']],
      hint: 'Einmalig und Sprungziel → id. Mehrfach → class.',
      explanation: 'Die Überschrift ist einmalig und Sprungziel – id. Die Warnung gibt es mehrfach – class.',
    },
    {
      type: 'code',
      task: '**Ergänze** im Trainingsplan: Die Überschrift bekommt die id `woche-1`, beide Ruhetage bekommen die Klasse `pause`, und der Dehn-Absatz bekommt zwei Klassen zugleich: `tipp` und `wichtig`.',
      starter: {
        html: '<h2>Trainingsplan Woche 1</h2>\n<ul>\n  <li>Montag: Beine</li>\n  <li>Dienstag: Ruhetag</li>\n  <li>Mittwoch: Rücken</li>\n  <li>Donnerstag: Ruhetag</li>\n  <li>Freitag: Ganzkörper</li>\n</ul>\n<p>Nach jedem Training: dehnen!</p>\n',
      },
      hints: [
        'Drei Aufgaben, alle im öffnenden Tag: eine id für die Überschrift, eine Klasse für zwei Listenpunkte, zwei Klassen für den Absatz.',
        'Zwei Klassen in einem Attribut: `class="neu sale"` – mit Leerzeichen dazwischen.',
        'Struktur: `<h2 id="…">` für die Überschrift, `<li class="…">` bei beiden Ruhetagen, `<p class="… …">` beim Absatz.',
      ],
      solution: {
        html: '<h2 id="woche-1">Trainingsplan Woche 1</h2>\n<ul>\n  <li>Montag: Beine</li>\n  <li class="pause">Dienstag: Ruhetag</li>\n  <li>Mittwoch: Rücken</li>\n  <li class="pause">Donnerstag: Ruhetag</li>\n  <li>Freitag: Ganzkörper</li>\n</ul>\n<p class="tipp wichtig">Nach jedem Training: dehnen!</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'h2#woche-1', count: 1, label: 'Die Überschrift hat die id „woche-1“' },
        { type: 'selector', selector: 'li.pause', count: 2, label: 'Beide Ruhetage tragen die Klasse „pause“' },
        { type: 'text', selector: 'li.pause', expected: 'Dienstag: Ruhetag', label: 'Der erste Ruhetag ist der Dienstag' },
        { type: 'selector', selector: 'p.tipp.wichtig', count: 1, label: 'Der Dehn-Absatz trägt beide Klassen' },
        { type: 'selector', selector: 'li', count: 5, label: 'Der Plan hat noch alle fünf Tage' },
      ],
    },
    {
      type: 'explain',
      text: 'Namen für Klassen und ids wählst du selbst – mit Regeln:\n\n- nur Kleinbuchstaben, Ziffern und Bindestrich: `haupt-buehne`, `woche-1`\n- keine Leerzeichen, keine Umlaute, nicht mit einer Ziffer beginnen\n- Groß und klein ist ein Unterschied: `Fakt` ist nicht `fakt`\n\nUnd: Der Name sagt, **was** das Element ist – nicht, wie es aussieht. `hinweis` bleibt richtig, auch wenn der Hinweis später blau statt rot wird.',
    },
    {
      type: 'pair',
      text: 'Ordne die Attribute ihrer Bedeutung zu.',
      pairs: [
        ['`class="neu"`', 'Klasse – darf auf vielen Elementen stehen'],
        ['`id="oben"`', 'id – genau einmal pro Seite'],
        ['`class="karte gross"`', 'zwei Klassen auf einem Element'],
        ['`href="#oben"`', 'Link, der zum Element mit der id oben springt'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** zwei Fehler im Sneaker-Check: Der Link „Zum Preis“ landet bei den Farben, und „Zu den Farben“ tut gar nichts. Außerdem ist der Preis zwar fett, aber nicht grün wie die anderen Fakten.',
      starter: {
        html: '<h1>Sneaker-Check: Neon Runner</h1>\n<p><a href="#preis">Zum Preis</a> · <a href="#farben">Zu den Farben</a></p>\n\n<h2 id="preis">Farben</h2>\n<p class="fakt">Schwarz, Weiß, Neon-Grün</p>\n\n<h2 id="preis">Preis</h2>\n<p class="fakt, wichtig">129 €</p>\n<p class="fakt">Lieferung in zwei Tagen</p>\n',
        css: '.fakt { color: #2e7d32; }\n.wichtig { font-weight: bold; }\n',
      },
      editable: ['html'],
      hints: [
        'Zwei Überschriften tragen dieselbe id – der Browser springt immer zur ersten. Welche id passt zum Link „Zu den Farben“?',
        'Mehrere Klassen trennt ein Leerzeichen – schau dir das Attribut beim Preis genau an.',
        'Ziel: `<h2 id="…">Farben</h2>` mit passender id und `<p class="… …">129 €</p>` mit zwei Klassen ohne Komma.',
      ],
      solution: {
        html: '<h1>Sneaker-Check: Neon Runner</h1>\n<p><a href="#preis">Zum Preis</a> · <a href="#farben">Zu den Farben</a></p>\n\n<h2 id="farben">Farben</h2>\n<p class="fakt">Schwarz, Weiß, Neon-Grün</p>\n\n<h2 id="preis">Preis</h2>\n<p class="fakt wichtig">129 €</p>\n<p class="fakt">Lieferung in zwei Tagen</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'h2#farben', count: 1, label: 'Die Farben-Überschrift hat die id „farben“' },
        { type: 'text', selector: 'h2#preis', expected: 'Preis', label: 'Die id „preis“ sitzt an der Preis-Überschrift' },
        { type: 'selector', selector: '#preis', count: 1, label: 'Die id „preis“ kommt nur einmal vor' },
        { type: 'selector', selector: 'p.fakt', count: 3, label: 'Alle drei Fakten tragen die Klasse „fakt“' },
        { type: 'selector', selector: 'p.fakt.wichtig', count: 1, label: 'Der Preis trägt die Klassen „fakt“ und „wichtig“' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Ab zur FUNKEN-Website. Sam will zwei Dinge: Der Hinweis mit den Einlasszeiten soll später auffällig gestaltet werden, und die Anfahrt soll direkt ansteuerbar sein.\n\nBeides bereitest du jetzt vor: Der Einlass-Absatz bekommt eine Klasse, die Anfahrts-Überschrift eine id. Sichtbar passiert noch nichts – aber die Namensschilder hängen.',
    },
    { type: 'code', etappe: '08-struktur-und-attribute/01-class-und-id' },
  ],
});

/* ================= Lektion 2: div und span ================= */
schreibe('lessons/02-div-und-span.json', {
  id: '02-div-und-span',
  title: 'div und span',
  konzepte: ['html.div-span'],
  steps: [
    {
      type: 'explain',
      text: 'Sam will den Foodtruck-Bereich später als eigene Kachel gestalten – Überschrift, Absatz und Liste zusammen. Aber welches Element fasst drei Elemente zu einer Gruppe? Bisher keins. Dafür gibt es zwei **Container** ohne eigene Bedeutung:\n\n- **div** – eine Kiste für ganze Blöcke: Überschriften, Absätze, Listen.\n- **span** – ein Etikett für ein Stück Text *innerhalb* einer Zeile.\n\nBeide sind unsichtbar. Ihren Sinn bekommen sie durch class oder id.',
      figure: FIG_DIV_SPAN,
    },
    {
      type: 'example',
      text: 'Das Stylesheet (wieder nur zum Zuschauen) gibt der Klasse `karte` einen Rahmen und der Klasse `preis` eine Farbe.\n\n**Verschiebe** das schließende `</div>` unter den Lieferungs-Absatz – der Rahmen wächst mit. Dann **umschließe** das Wort „Leichter“ mit `<span class="preis">` und `</span>` und schau, was passiert.',
      html: '<div class="karte">\n  <h2>Neon Runner</h2>\n  <p>Leichter Laufschuh, Größe 38 bis 46.</p>\n  <p>Preis: <span class="preis">129 €</span></p>\n</div>\n<p>Lieferung in zwei Tagen.</p>\n',
      css: '.karte { border: 2px solid #ff6a00; border-radius: 8px; padding: 12px; }\n.preis { color: #d94f00; font-weight: bold; }\n',
      editable: ['html'],
    },
    {
      type: 'quiz',
      question: 'Im Satz „Nur noch 3 Tickets!“ soll allein die Zahl 3 markiert werden. Welches Element passt?',
      options: ['`span` – bleibt in der Zeile', '`div` – beginnt eine neue Zeile', '`p` – ein neuer Absatz'],
      correct: 0,
      explanation: 'Ein Stück Text innerhalb einer Zeile ist Inline – dafür ist span da. div und p würden die Zahl in eine eigene Zeile setzen.',
    },
    {
      type: 'code',
      task: '**Gruppiere** die Margherita – Überschrift und beide Absätze – in einem Container mit der Klasse `gericht`. Die Funghi bleibt außerhalb.',
      starter: {
        html: '<h1>Pizza-Truck – Karte</h1>\n<h2>Margherita</h2>\n<p>Tomate, Mozzarella, Basilikum</p>\n<p>7 €</p>\n<h2>Funghi</h2>\n<p>Tomate, Mozzarella, Champignons</p>\n<p>8 €</p>\n',
      },
      hints: [
        'Der Container ist ein Block-Element ohne eigene Bedeutung. Er öffnet vor der Überschrift und schließt nach dem Preis.',
        'Muster: `<div class="karte">` … `</div>` – dazwischen liegen die Elemente, die zusammengehören.',
        'Struktur: `<div class="…">`, dann Überschrift, Absatz, Absatz der Margherita, dann `</div>` – die Funghi kommt erst danach.',
      ],
      solution: {
        html: '<h1>Pizza-Truck – Karte</h1>\n<div class="gericht">\n  <h2>Margherita</h2>\n  <p>Tomate, Mozzarella, Basilikum</p>\n  <p>7 €</p>\n</div>\n<h2>Funghi</h2>\n<p>Tomate, Mozzarella, Champignons</p>\n<p>8 €</p>\n',
      },
      tests: [
        { type: 'text', selector: 'div.gericht > h2', expected: 'Margherita', label: 'Die Margherita-Überschrift liegt im Container' },
        { type: 'selector', selector: 'div.gericht > p', count: 2, label: 'Beide Margherita-Absätze liegen im Container' },
        { type: 'selector', selector: 'div.gericht h2', count: 1, label: 'Nur ein Gericht liegt im Container' },
        { type: 'selector', selector: 'div h1', count: 0, label: 'Die Hauptüberschrift bleibt außerhalb' },
      ],
    },
    {
      type: 'explain',
      text: 'Zwei Sorten von Elementen:\n\n- **Block-Elemente** beginnen auf einer neuen Zeile und nehmen die ganze Breite: h1 bis h6, p, ul, ol, table – und div.\n- **Inline-Elemente** laufen im Text mit: a, strong, em, img – und span.\n\nRegel: Block darf Inline enthalten, nicht umgekehrt. Ein span gehört *in* den Absatz, nie um ihn herum.\n\n```html\n<div class="karte">\n  <p>Preis: <span class="preis">7 €</span></p>\n</div>\n```',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Sneaker-Karte: außen die Kiste für den ganzen Block, innen das Etikett für den Preis.',
      template: '<___ class="karte">\n  <h2>Court Low</h2>\n  <p>Preis: <___ class="preis">89 €</___></p>\n</___>',
      accept: [['div'], ['span'], ['span'], ['div']],
      hint: 'Block-Container außen, Inline-Container im Absatz.',
    },
    {
      type: 'code',
      task: '**Markiere** in der Watchlist bei jedem Eintrag die Staffel-Angabe („Staffel 2“ und so weiter) mit einem Inline-Element der Klasse `staffel`. Der sichtbare Text der Einträge bleibt gleich.',
      starter: {
        html: '<h2>Meine Watchlist</h2>\n<ul>\n  <li>Nachtschicht – Staffel 2</li>\n  <li>Kabelsalat – Staffel 1</li>\n  <li>Neckar-Krimi – Staffel 4</li>\n</ul>\n',
      },
      hints: [
        'Ein Stück Text in der Zeile markieren – das ist das Inline-Etikett, nicht die Block-Kiste.',
        'Muster: `Preis: <span class="preis">7 €</span>` – öffnender Tag vor dem Stück, schließender danach.',
        'In jedem Listenpunkt: `<li>Name – <span class="…">Staffel …</span></li>`.',
      ],
      solution: {
        html: '<h2>Meine Watchlist</h2>\n<ul>\n  <li>Nachtschicht – <span class="staffel">Staffel 2</span></li>\n  <li>Kabelsalat – <span class="staffel">Staffel 1</span></li>\n  <li>Neckar-Krimi – <span class="staffel">Staffel 4</span></li>\n</ul>\n',
      },
      tests: [
        { type: 'selector', selector: 'li span.staffel', count: 3, label: 'Alle drei Staffel-Angaben sind markiert' },
        { type: 'text', selector: 'li span.staffel', expected: 'Staffel 2', label: 'Das erste Etikett enthält genau „Staffel 2“' },
        { type: 'text', selector: 'li', expected: 'Nachtschicht – Staffel 2', label: 'Der erste Eintrag liest sich unverändert' },
        { type: 'selector', selector: 'li div', count: 0, label: 'Kein Block-Container in der Liste' },
      ],
    },
    {
      type: 'order',
      text: 'Bring die Sneaker-Karte in die richtige Reihenfolge: erst Name, dann Beschreibung, dann Preis.',
      lines: ['<div class="karte">', '  <h2>Court Low</h2>', '  <p>Klassischer Sneaker in Weiß.</p>', '  <p>Preis: <span class="preis">89 €</span></p>', '</div>'],
      explanation: 'Die Kiste öffnet zuerst und schließt zuletzt; das span bleibt im Absatz.',
    },
    {
      type: 'code',
      task: '1. **Gruppiere** jedes Handy (Überschrift und beide Absätze) in einem eigenen Container mit der Klasse `handy`. 2. **Markiere** die beiden Preise „299 €“ und „449 €“ mit einem Inline-Element der Klasse `preis`.',
      starter: {
        html: '<h1>Handy-Vergleich</h1>\n<h2>Nova X2</h2>\n<p>6,1 Zoll, 128 GB, zwei Kameras</p>\n<p>Preis: 299 €</p>\n<h2>Orbit Lite</h2>\n<p>6,7 Zoll, 256 GB, drei Kameras</p>\n<p>Preis: 449 €</p>\n',
      },
      hints: [
        'Zwei Kisten, zwei Etiketten: Jede Kiste umschließt genau ein Handy, jedes Etikett genau den Preis.',
        'Kiste: `<div class="karte">` … `</div>`. Etikett: `<span class="neu">…</span>` – hier mit anderen Klassennamen.',
        'Pro Handy: `<div class="…">`, h2, p, `<p>Preis: <span class="…">… €</span></p>`, `</div>`.',
      ],
      solution: {
        html: '<h1>Handy-Vergleich</h1>\n<div class="handy">\n  <h2>Nova X2</h2>\n  <p>6,1 Zoll, 128 GB, zwei Kameras</p>\n  <p>Preis: <span class="preis">299 €</span></p>\n</div>\n<div class="handy">\n  <h2>Orbit Lite</h2>\n  <p>6,7 Zoll, 256 GB, drei Kameras</p>\n  <p>Preis: <span class="preis">449 €</span></p>\n</div>\n',
      },
      tests: [
        { type: 'selector', selector: 'div.handy', count: 2, label: 'Es gibt zwei Handy-Container' },
        { type: 'selector', selector: 'div.handy > h2', count: 2, label: 'Jede Überschrift liegt in ihrem Container' },
        { type: 'selector', selector: 'div.handy > p', count: 4, label: 'Alle vier Absätze liegen in den Containern' },
        { type: 'text', selector: 'div.handy span.preis', expected: '299 €', label: 'Der erste Preis ist als Etikett markiert' },
        { type: 'text', selector: 'div.handy:last-of-type span.preis', expected: '449 €', label: 'Der zweite Preis ist als Etikett markiert' },
        { type: 'selector', selector: 'div h1', count: 0, label: 'Die Hauptüberschrift bleibt außerhalb' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Ab zur FUNKEN-Website. In Kapitel 14 wird der Foodtruck-Bereich eine Kachel mit eigenem Layout – dafür müssen Überschrift, Absatz und Liste als **eine** Gruppe gefasst sein. Jetzt baust du die Kiste dafür.\n\nUnd weil Sam für 2027 werben will, bekommt der Absatz ganz vorn ein kleines Etikett mit dem Text „Neu 2027:“ – ein Inline-Element mit einer Klasse.',
    },
    { type: 'code', etappe: '08-struktur-und-attribute/02-div-und-span' },
  ],
});

/* ================= Lektion 3: Semantische Elemente ================= */
schreibe('lessons/03-semantische-elemente.json', {
  id: '03-semantische-elemente',
  title: 'Semantische Elemente',
  konzepte: ['html.semantik'],
  steps: [
    {
      type: 'explain',
      text: 'Stell dir vor, jemand hört die FUNKEN-Seite mit einem **Screenreader**, einem Vorlese-Programm. Bei lauter div-Kisten hört die Person nur: „Kiste, Kiste, Kiste.“ Dafür gibt es **semantische Elemente** – Elemente mit Bedeutung:\n\n- **header** – Kopf: Titel, Logo, Slogan\n- **nav** – Navigation: die Links\n- **main** – der Hauptinhalt\n- **footer** – Fuß: Adresse, Impressum\n\nScreenreader springen direkt zur Navigation, Suchmaschinen finden den Inhalt, und du liest deinen Code leichter.',
      figure: FIG_ZONEN,
    },
    {
      type: 'example',
      text: 'Das Stylesheet färbt hier jede Zone ein, damit du sie siehst – normalerweise sind sie unsichtbar.\n\n**Verschiebe** den Kontakt-Absatz vom Fuß in den Hauptbereich und beobachte die Farbe. Dann **tausche** Navigation und Kopf – das geht, ist aber unüblich.',
      html: '<header>\n  <h1>Clan Nachtfalken</h1>\n</header>\n<nav>\n  <a href="#team">Team</a>\n  <a href="#turniere">Turniere</a>\n</nav>\n<main>\n  <h2 id="team">Team</h2>\n  <p>Fünf Leute, ein Ziel.</p>\n  <h2 id="turniere">Turniere</h2>\n  <p>Stadtliga-Finale am Samstag.</p>\n</main>\n<footer>\n  <p>Kontakt: nachtfalken@example.com</p>\n</footer>\n',
      css: CSS_ZONEN,
      editable: ['html'],
    },
    {
      type: 'quiz',
      question: 'Warum nimmst du für die Linkzeile `nav` statt `div`?',
      options: ['Screenreader und Suchmaschinen erkennen die Navigation als solche', 'Die Links stehen dann automatisch nebeneinander', 'Die Links werden dann automatisch blau'],
      correct: 0,
      explanation: 'Semantische Elemente tragen Bedeutung, kein Aussehen. Wie die Links aussehen, regelt später CSS – für div und nav gleich.',
    },
    {
      type: 'code',
      task: '**Ergänze** auf der Clan-Seite einen Kopfbereich: Hauptüberschrift und Slogan-Absatz liegen darin. Alles andere bleibt außerhalb.',
      starter: {
        html: '<h1>Pixelpiraten</h1>\n<p>Clan seit 2023 – wir spielen fair.</p>\n<h2>Mitglieder</h2>\n<ul>\n  <li>Kapitän_Lu</li>\n  <li>Mila_99</li>\n  <li>Bytebeard</li>\n</ul>\n<p>Kontakt: kapitaen@example.com</p>\n',
      },
      hints: [
        'Der Kopfbereich ist ein semantisches Element, das Überschrift und Slogan umschließt – wie eine Kiste, nur mit Bedeutung.',
        'Muster: `<footer>` … `</footer>` umschließt den Fuß einer Seite. Für den Kopf heißt das Element anders.',
        'Struktur: öffnender Kopf-Tag, dann h1 und p, dann der schließende Kopf-Tag – die Mitglieder-Überschrift kommt danach.',
      ],
      solution: {
        html: '<header>\n  <h1>Pixelpiraten</h1>\n  <p>Clan seit 2023 – wir spielen fair.</p>\n</header>\n<h2>Mitglieder</h2>\n<ul>\n  <li>Kapitän_Lu</li>\n  <li>Mila_99</li>\n  <li>Bytebeard</li>\n</ul>\n<p>Kontakt: kapitaen@example.com</p>\n',
      },
      tests: [
        { type: 'text', selector: 'header > h1', expected: 'Pixelpiraten', label: 'Die Hauptüberschrift liegt im Kopfbereich' },
        { type: 'text', selector: 'header > p', expected: 'Clan seit 2023 – wir spielen fair.', label: 'Der Slogan liegt im Kopfbereich' },
        { type: 'selector', selector: 'header h2', count: 0, label: 'Die Mitglieder-Überschrift bleibt außerhalb' },
        { type: 'selector', selector: 'header', count: 1, label: 'Es gibt genau einen Kopfbereich' },
      ],
    },
    {
      type: 'explain',
      text: 'So ist eine typische Seite aufgebaut – von oben nach unten:\n\n```html\n<body>\n  <header> … </header>\n  <nav> … </nav>\n  <main> … </main>\n  <footer> … </footer>\n</body>\n```\n\nAlle vier sind Block-Elemente wie div – nur mit Bedeutung. Zwei Regeln: Pro Seite gibt es genau **ein** main. Und die Links stehen direkt im nav – der Absatz um die Linkzeile entfällt.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Vereinsseite: Welche Zone enthält die Links, welche die Adresse am Ende?',
      template: '<___>\n  <a href="index.html">Start</a>\n  <a href="spiele.html">Spiele</a>\n</___>\n\n<___>\n  <p>SV Hafenkick · Hafenstraße 12 · 74072 Heilbronn</p>\n</___>',
      accept: [['nav'], ['nav'], ['footer'], ['footer']],
      hint: 'Links → Navigation. Adresse am Ende → Fuß.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** zwei Fehler auf der Vereinsseite: Die Linkzeile ist nicht gelb – sie wird nicht als Navigation erkannt. Und der dunkle Fußbereich klebt innerhalb des blauen Hauptbereichs statt darunter.',
      starter: {
        html: '<header>\n  <h1>SV Hafenkick</h1>\n</header>\n<navigation>\n  <a href="index.html">Start</a>\n  <a href="spiele.html">Spiele</a>\n  <a href="team.html">Team</a>\n</navigation>\n<main>\n  <h2>Nächstes Spiel</h2>\n  <p>Sonntag, 15 Uhr, Heimspiel gegen die Neckarpiraten.</p>\n  <footer>\n    <p>SV Hafenkick · Hafenstraße 12 · 74072 Heilbronn</p>\n  </footer>\n</main>\n',
        css: CSS_ZONEN,
      },
      editable: ['html'],
      hints: [
        'Das Element für die Navigation hat einen kurzen Namen – prüfe den öffnenden und den schließenden Tag.',
        'Der Fuß gehört nicht in den Hauptbereich: Der Hauptbereich muss schließen, bevor der Fuß beginnt.',
        'Reihenfolge im body: `<header>`…`</header>`, `<nav>`…`</nav>`, `<main>`…`</main>`, `<footer>`…`</footer>`.',
      ],
      solution: {
        html: '<header>\n  <h1>SV Hafenkick</h1>\n</header>\n<nav>\n  <a href="index.html">Start</a>\n  <a href="spiele.html">Spiele</a>\n  <a href="team.html">Team</a>\n</nav>\n<main>\n  <h2>Nächstes Spiel</h2>\n  <p>Sonntag, 15 Uhr, Heimspiel gegen die Neckarpiraten.</p>\n</main>\n<footer>\n  <p>SV Hafenkick · Hafenstraße 12 · 74072 Heilbronn</p>\n</footer>\n',
      },
      tests: [
        { type: 'selector', selector: 'nav > a', count: 3, label: 'Die drei Links liegen in der Navigation' },
        { type: 'selector', selector: 'main footer', count: 0, label: 'Der Fußbereich liegt nicht im Hauptbereich' },
        { type: 'text', selector: 'footer p', expected: 'SV Hafenkick · Hafenstraße 12 · 74072 Heilbronn', label: 'Die Adresse steht im Fußbereich' },
        { type: 'order', selectors: ['header', 'nav', 'main', 'footer'], label: 'Kopf, Navigation, Hauptbereich, Fuß – in dieser Reihenfolge' },
        { type: 'selector', selector: 'main > p', count: 1, label: 'Der Spiel-Absatz bleibt im Hauptbereich' },
      ],
    },
    {
      type: 'explain',
      text: 'Innerhalb von main gliederst du weiter:\n\n- **section** – ein thematischer Abschnitt mit eigener Überschrift, z. B. „Spielplan“.\n- **article** – ein in sich abgeschlossener Beitrag, der auch allein stehen könnte: eine News, ein Blogpost.\n\n```html\n<main>\n  <section>\n    <h2>Spielplan</h2>\n    <p>…</p>\n  </section>\n  <article>\n    <h2>Neues Trikot!</h2>\n    <p>…</p>\n  </article>\n</main>\n```\n\nKein semantisches Element ohne Grund: Passt keins, bleibt div.',
    },
    {
      type: 'pair',
      text: 'Ordne die Elemente ihrer Bedeutung zu.',
      pairs: [
        ['`<header>`', 'Kopf der Seite: Titel, Logo, Slogan'],
        ['`<nav>`', 'Navigation: die Links zu den Seiten'],
        ['`<main>`', 'Hauptinhalt – genau einmal pro Seite'],
        ['`<footer>`', 'Fuß: Adresse, Impressum'],
        ['`<section>`', 'thematischer Abschnitt mit Überschrift'],
        ['`<article>`', 'in sich abgeschlossener Beitrag, z. B. eine News'],
      ],
    },
    {
      type: 'code',
      task: '**Strukturiere** die Clan-Seite in Zonen: Hauptüberschrift und Slogan in den Kopfbereich, die drei Links direkt in eine Navigation (der Absatz darum entfällt), beide Abschnitte in den Hauptbereich, der Kontakt-Absatz in den Fußbereich.',
      starter: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Pixelpiraten</title>\n  </head>\n  <body>\n    <h1>Pixelpiraten</h1>\n    <p>Clan seit 2023 – wir spielen fair.</p>\n    <p>\n      <a href="index.html">Start</a> ·\n      <a href="team.html">Team</a> ·\n      <a href="turniere.html">Turniere</a>\n    </p>\n\n    <h2>Nächstes Turnier</h2>\n    <p>Samstag, 20 Uhr – Finale der Stadtliga.</p>\n\n    <h2>Mitglieder</h2>\n    <ul>\n      <li>Kapitän_Lu</li>\n      <li>Mila_99</li>\n      <li>Bytebeard</li>\n    </ul>\n\n    <p>Kontakt: kapitaen@example.com</p>\n  </body>\n</html>\n',
      },
      hints: [
        'Vier Zonen, in dieser Reihenfolge: Kopf, Navigation, Hauptbereich, Fuß. Jede ist ein Element, das die passenden Teile umschließt.',
        'Die Links kommen ohne den Absatz direkt in die Navigation – die Punkte dazwischen kannst du weglassen.',
        'Gerüst: `<header>` h1 + p `</header>`, `<nav>` drei a `</nav>`, `<main>` beide Abschnitte `</main>`, `<footer>` Kontakt `</footer>`.',
      ],
      solution: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Pixelpiraten</title>\n  </head>\n  <body>\n    <header>\n      <h1>Pixelpiraten</h1>\n      <p>Clan seit 2023 – wir spielen fair.</p>\n    </header>\n\n    <nav>\n      <a href="index.html">Start</a>\n      <a href="team.html">Team</a>\n      <a href="turniere.html">Turniere</a>\n    </nav>\n\n    <main>\n      <h2>Nächstes Turnier</h2>\n      <p>Samstag, 20 Uhr – Finale der Stadtliga.</p>\n\n      <h2>Mitglieder</h2>\n      <ul>\n        <li>Kapitän_Lu</li>\n        <li>Mila_99</li>\n        <li>Bytebeard</li>\n      </ul>\n    </main>\n\n    <footer>\n      <p>Kontakt: kapitaen@example.com</p>\n    </footer>\n  </body>\n</html>\n',
      },
      tests: [
        { type: 'text', selector: 'header > h1', expected: 'Pixelpiraten', label: 'Die Hauptüberschrift liegt im Kopfbereich' },
        { type: 'selector', selector: 'nav > a', count: 3, label: 'Die drei Links stehen direkt in der Navigation' },
        { type: 'selector', selector: 'main h2', count: 2, label: 'Beide Abschnitte liegen im Hauptbereich' },
        { type: 'selector', selector: 'main li', count: 3, label: 'Die Mitgliederliste liegt im Hauptbereich' },
        { type: 'text', selector: 'footer p', expected: 'Kontakt: kapitaen@example.com', label: 'Der Kontakt steht im Fußbereich' },
        { type: 'order', selectors: ['header', 'nav', 'main', 'footer'], label: 'Die Zonen stehen in der üblichen Reihenfolge' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Ab zur FUNKEN-Website – die Startseite ist bisher eine lange Kette von Elementen. Jetzt bekommt sie Zonen: Kopf mit Titel, Willkommens-Absatz und Bühnenfoto; Navigation mit den vier Links, ohne den Absatz darum; Hauptbereich mit allem vom Termin bis „Nach oben“; Fuß mit der Adresse.\n\nDie Trennlinie vor der Adresse fliegt raus – der Fußbereich übernimmt ihre Aufgabe. Der Kontakt-Kommentar bleibt.',
    },
    { type: 'code', etappe: '08-struktur-und-attribute/03-semantische-elemente' },
  ],
});

/* ================= Lektion 4: Wiederholung (08 + 07, 06, 04) ================= */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung: Zonen, Tabellen, Bilder, Listen',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Wiederholung! Heute mischen wir die Zonen aus diesem Kapitel mit Tabellen (Kapitel 07), Bildern und Medien (Kapitel 06) und Listen (Kapitel 04). Am Ende bekommt die Programm-Seite dieselbe Struktur wie die Startseite.',
    },
    {
      type: 'quiz',
      question: 'Welche Zone darf auf einer Seite nur **einmal** vorkommen?',
      options: ['`main` – der Hauptinhalt', '`section` – ein Abschnitt', '`nav` – die Navigation'],
      correct: 0,
      explanation: 'Es gibt genau einen Hauptinhalt. Abschnitte und sogar Navigationen kann eine Seite mehrere haben.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** den Timetable: Die erste Zeile besteht aus Kopfzellen, die Pausen-Zelle geht über beide Bühnen-Spalten.',
      template: '<tr>\n  <___>Zeit</___>\n  <th>Hauptbühne</th>\n  <th>Zeltbühne</th>\n</tr>\n<tr>\n  <td>18:00</td>\n  <td ___="2">Pause – Foodtrucks öffnen</td>\n</tr>',
      accept: [['th'], ['th'], ['colspan']],
      hint: 'Kopfzelle = table header. Spalten verbinden = column span.',
    },
    {
      type: 'code',
      task: '1. **Strukturiere** die Café-Seite: Überschrift und Slogan in den Kopfbereich, die Links direkt in eine Navigation, beide Abschnitte in den Hauptbereich, die Adresse in den Fußbereich. 2. **Ergänze** beim Katzenbild den fehlenden Alternativtext „Kater Mo auf dem Sofa“.',
      starter: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Katzencafé Schnurr</title>\n  </head>\n  <body>\n    <h1>Katzencafé Schnurr</h1>\n    <p>Kaffee, Kuchen und sechs Katzen.</p>\n    <p>\n      <a href="index.html">Start</a> ·\n      <a href="karte.html">Karte</a>\n    </p>\n\n    <h2>Unsere Katzen</h2>\n    <figure>\n      <img src="katze.svg">\n      <figcaption>Mo, der Chef im Haus</figcaption>\n    </figure>\n\n    <h2>Öffnungszeiten</h2>\n    <table>\n      <tr>\n        <th>Tag</th>\n        <th>Zeit</th>\n      </tr>\n      <tr>\n        <td>Mo bis Fr</td>\n        <td>12 bis 19 Uhr</td>\n      </tr>\n      <tr>\n        <td>Sa</td>\n        <td>10 bis 20 Uhr</td>\n      </tr>\n    </table>\n\n    <p>Katzencafé Schnurr · Kirchgasse 3 · 74072 Heilbronn</p>\n  </body>\n</html>\n',
      },
      hints: [
        'Gleiches Muster wie bei der Clan-Seite: Kopf, Navigation, Hauptbereich, Fuß – und ein Attribut am Bild.',
        'Der Alternativtext ist das Attribut, das vorgelesen wird, wenn das Bild fehlt: `alt="…"` direkt im img-Tag.',
        'Gerüst: `<header>` h1 + p `</header>`, `<nav>` zwei a `</nav>`, `<main>` Katzen + Öffnungszeiten `</main>`, `<footer>` Adresse `</footer>`.',
      ],
      solution: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Katzencafé Schnurr</title>\n  </head>\n  <body>\n    <header>\n      <h1>Katzencafé Schnurr</h1>\n      <p>Kaffee, Kuchen und sechs Katzen.</p>\n    </header>\n\n    <nav>\n      <a href="index.html">Start</a>\n      <a href="karte.html">Karte</a>\n    </nav>\n\n    <main>\n      <h2>Unsere Katzen</h2>\n      <figure>\n        <img src="katze.svg" alt="Kater Mo auf dem Sofa">\n        <figcaption>Mo, der Chef im Haus</figcaption>\n      </figure>\n\n      <h2>Öffnungszeiten</h2>\n      <table>\n        <tr>\n          <th>Tag</th>\n          <th>Zeit</th>\n        </tr>\n        <tr>\n          <td>Mo bis Fr</td>\n          <td>12 bis 19 Uhr</td>\n        </tr>\n        <tr>\n          <td>Sa</td>\n          <td>10 bis 20 Uhr</td>\n        </tr>\n      </table>\n    </main>\n\n    <footer>\n      <p>Katzencafé Schnurr · Kirchgasse 3 · 74072 Heilbronn</p>\n    </footer>\n  </body>\n</html>\n',
      },
      tests: [
        { type: 'text', selector: 'header > h1', expected: 'Katzencafé Schnurr', label: 'Die Hauptüberschrift liegt im Kopfbereich' },
        { type: 'selector', selector: 'nav > a', count: 2, label: 'Beide Links stehen direkt in der Navigation' },
        { type: 'selector', selector: 'main figure', count: 1, label: 'Der Bild-Block liegt im Hauptbereich' },
        { type: 'selector', selector: 'main table', count: 1, label: 'Die Öffnungszeiten liegen im Hauptbereich' },
        { type: 'attr', selector: 'figure img', attr: 'alt', expected: 'Kater Mo auf dem Sofa', label: 'Das Katzenbild hat den Alternativtext' },
        { type: 'text', selector: 'footer p', expected: 'Katzencafé Schnurr · Kirchgasse 3 · 74072 Heilbronn', label: 'Die Adresse steht im Fußbereich' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Elemente und Attribute zu.',
      pairs: [
        ['`<ol>`', 'nummerierte Liste'],
        ['`<th>`', 'Kopfzelle einer Tabelle'],
        ['`<figcaption>`', 'Bildunterschrift im Bild-Block'],
        ['`controls`', 'Bedienelemente für Audio und Video'],
        ['`<span>`', 'Inline-Container ohne eigene Bedeutung'],
      ],
    },
    {
      type: 'order',
      text: 'Bring das Line-up der Zeltbühne in die richtige Reihenfolge – innen liegt eine nummerierte Liste.',
      lines: ['<ul>', '  <li>Zeltbühne', '    <ol>', '      <li>Kiki Volt</li>', '    </ol>', '  </li>', '</ul>'],
      explanation: 'Die innere Liste liegt im Listenpunkt: Sie steht vor dessen schließendem Tag.',
    },
    {
      type: 'code',
      task: '**Erstelle** im Hauptbereich der Turnierseite unter der Überschrift eine Tabelle mit der Klasse `plan`: Kopfzeile Zeit | Spiel, dann zwei Zeilen: 18:00 | Viertelfinale und 20:00 | Finale.',
      starter: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Stadtliga – Turnier</title>\n  </head>\n  <body>\n    <header>\n      <h1>Stadtliga-Turnier</h1>\n    </header>\n    <nav>\n      <a href="index.html">Start</a>\n      <a href="teams.html">Teams</a>\n    </nav>\n    <main>\n      <h2>Spielplan Samstag</h2>\n      <!-- hier kommt die Tabelle hin -->\n    </main>\n    <footer>\n      <p>Pixelpiraten e. V.</p>\n    </footer>\n  </body>\n</html>\n',
      },
      hints: [
        'Tabelle, Zeilen, Zellen – wie im Timetable. Die Klasse kommt als Attribut an das Tabellen-Element.',
        'Kopfzellen: `<th>Was</th>`, Datenzellen: `<td>16:00 Uhr</td>` – jede Zeile in `<tr>` … `</tr>`.',
        'Gerüst: `<table class="…">`, eine Zeile mit zwei th, zwei Zeilen mit je zwei td, `</table>` – alles unter der Überschrift im Hauptbereich.',
      ],
      solution: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Stadtliga – Turnier</title>\n  </head>\n  <body>\n    <header>\n      <h1>Stadtliga-Turnier</h1>\n    </header>\n    <nav>\n      <a href="index.html">Start</a>\n      <a href="teams.html">Teams</a>\n    </nav>\n    <main>\n      <h2>Spielplan Samstag</h2>\n      <table class="plan">\n        <tr>\n          <th>Zeit</th>\n          <th>Spiel</th>\n        </tr>\n        <tr>\n          <td>18:00</td>\n          <td>Viertelfinale</td>\n        </tr>\n        <tr>\n          <td>20:00</td>\n          <td>Finale</td>\n        </tr>\n      </table>\n    </main>\n    <footer>\n      <p>Pixelpiraten e. V.</p>\n    </footer>\n  </body>\n</html>\n',
      },
      tests: [
        { type: 'selector', selector: 'main table.plan', count: 1, label: 'Die Tabelle mit der Klasse „plan“ liegt im Hauptbereich' },
        { type: 'selector', selector: 'table tr:first-child th', count: 2, label: 'Die Kopfzeile hat zwei Kopfzellen' },
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: 'Finale', label: 'Um 20:00 ist das Finale' },
        { type: 'order', selectors: ['main h2', 'main table'], label: 'Die Tabelle steht unter der Überschrift' },
      ],
    },
    {
      type: 'quiz',
      question: 'Ein Audio-Player zeigt keine Abspiel-Knöpfe. Welches Attribut fehlt?',
      options: ['`controls`', '`alt`', '`play`'],
      correct: 0,
      explanation: 'Ohne controls zeichnet der Browser keine Bedienelemente – der Player ist dann unsichtbar. alt gehört zu Bildern, play gibt es als Attribut nicht.',
    },
    {
      type: 'explain',
      text: 'Ab zur FUNKEN-Website: Die Programm-Seite bekommt dieselben Zonen wie die Startseite – Kopf, Navigation mit vier Links, Hauptbereich mit den drei Tabellen, Fuß mit der Adresse.\n\nNeu dabei: Der vierte Link ist eine Sprungmarke zur Freitags-Überschrift. Die braucht dafür eine id – genau wie „Line-up“ auf der Startseite. Der alte Rück-Link-Absatz entfällt.',
    },
    { type: 'code', etappe: '08-struktur-und-attribute/04-wiederholung' },
  ],
});

/* ================= Lektion 5: Projekt – Seitenstruktur ================= */
schreibe('lessons/05-projekt-seitenstruktur.json', {
  id: '05-projekt-seitenstruktur',
  title: 'Projekt: Seitenstruktur',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Ich seh von euren Zonen ehrlich gesagt nichts. Ayla sagt, das ist wie das Fundament der Bühne: unsichtbar, aber alles steht drauf. Okay, ich glaub euch.\n\nWas fehlt noch? Die Galerie! Startseite und Programm haben Kopf, Navigation, Hauptbereich und Fuß – die Galerie bekommt jetzt dieselbe Struktur, und statt dem einen Rück-Link eine echte Navigation.',
    },
    {
      type: 'quiz',
      question: 'Die Galerie-Seite bekommt Zonen. Wohin gehören die beiden Bild-Blöcke mit den Fotos?',
      options: ['In den Hauptbereich (main)', 'In den Kopfbereich (header)', 'In den Fußbereich (footer)'],
      correct: 0,
      explanation: 'Die Fotos sind der eigentliche Inhalt der Seite – und Inhalt gehört in main. Kopf und Fuß rahmen ihn nur ein.',
    },
    {
      type: 'order',
      text: 'Bring die Zonen der Galerie-Seite in die übliche Reihenfolge.',
      lines: ['<header>', '  <h1>Galerie</h1>', '</header>', '<nav>', '  <a href="index.html">Startseite</a>', '</nav>', '<main> … </main>', '<footer> … </footer>'],
      explanation: 'Kopf, Navigation, Hauptbereich, Fuß – die Reihenfolge, die Screenreader und Menschen erwarten.',
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website – letzte Etappe der Station Zonen: Die Galerie bekommt Kopf, Navigation mit drei Links (Startseite, Programm, Tickets), Hauptbereich mit allen Abschnitten und einen Fuß mit der Adresse. Der alte Rück-Link-Absatz entfällt.\n\nDanach lohnt sich ein Klick auf „FUNKEN-Website ansehen“: Blättere durch alle drei Seiten – sie haben jetzt dasselbe Gerüst.',
    },
    { type: 'code', etappe: '08-struktur-und-attribute/05-projekt-seitenstruktur' },
  ],
});

/* ================= Fragenpool ================= */
schreibe('pool.json', {
  chapter: KAPITEL,
  fragen: [
    { id: '08-01', konzept: 'html.class', type: 'quiz', question: 'Welches Attribut darf auf beliebig vielen Elementen denselben Wert haben?', options: ['`class`', '`id`', '`href`'], correct: 0, explanation: 'Eine Klasse ist wie ein Bändchen – viele Elemente dürfen dieselbe tragen. Eine id gibt es nur einmal.' },
    { id: '08-02', konzept: 'html.class', type: 'fill', text: 'Der Absatz soll die Klasse hinweis bekommen. Vervollständige.', template: '<p ___="hinweis">Einlass ab 16 Uhr</p>', accept: ['class'], hint: 'Das Attribut für Klassen – auf Englisch.' },
    { id: '08-03', konzept: 'html.class', type: 'bug', text: 'Ein Listenpunkt hat einen Fehler bei den Klassen. Welche Zeile?', lines: ['<li class="neu">Neon Runner</li>', '<li class="neu sale">Court Low</li>', '<li class="neu,sale">Air Step</li>', '<li>Retro Wave</li>'], line: 2, explanation: 'Mehrere Klassen trennt ein Leerzeichen, kein Komma: `class="neu sale"`.' },
    { id: '08-04', konzept: 'html.class', type: 'quiz', question: 'Ein Element soll die Klassen karte **und** gross tragen. Wie schreibst du das?', options: ['`class="karte gross"`', '`class="karte" class="gross"`', '`class="karte,gross"`'], correct: 0, explanation: 'Ein class-Attribut, mehrere Namen mit Leerzeichen. Ein Attribut darf nur einmal pro Tag stehen, Kommas gehören nicht dazu.' },
    { id: '08-05', konzept: 'html.class', type: 'bug', text: 'Ein Absatz hat einen Fehler im Attribut. Welche Zeile?', lines: ['<p class="hinweis">Einlass ab 16 Uhr</p>', '<p class=hinweis wichtig>Ende 23 Uhr</p>', '<p class="hinweis">Kein Glas auf dem Gelände</p>'], line: 1, explanation: 'Ohne Anführungszeichen endet der Wert am Leerzeichen – „wichtig“ wird dann als eigenes Attribut gelesen.' },
    { id: '08-06', konzept: 'html.id', type: 'quiz', question: 'Wie oft darf eine bestimmte id auf einer Seite vorkommen?', options: ['Genau einmal', 'So oft wie nötig', 'Höchstens zweimal'], correct: 0, explanation: 'Die id ist die Ticketnummer eines Elements – einmalig pro Seite. Sonst wüsste eine Sprungmarke nicht, wohin.' },
    { id: '08-07', konzept: 'html.id', type: 'bug', text: 'Eine Zeile verstößt gegen die id-Regel. Welche?', lines: ['<h2 id="preis">Preis</h2>', '<p>129 €</p>', '<h2 id="preis">Farben</h2>', '<p>Schwarz, Weiß</p>'], line: 2, explanation: 'Die id preis ist doppelt. Die Farben-Überschrift braucht eine eigene id, z. B. farben.' },
    { id: '08-08', konzept: 'html.id', type: 'fill', text: 'Der Link `#anfahrt` soll zu dieser Überschrift springen. Vervollständige das Attribut.', template: '<h2 ___="anfahrt">So kommst du hin</h2>', accept: ['id'], hint: 'Sprungmarken zielen auf das einmalige Namensschild.' },
    { id: '08-09', konzept: 'html.id', type: 'pair', text: 'Ordne zu.', pairs: [['`id="oben"`', 'genau einmal pro Seite'], ['`class="neu"`', 'auf vielen Elementen erlaubt'], ['`href="#oben"`', 'springt zum Element mit der id oben']] },
    { id: '08-10', konzept: 'html.div-span', type: 'quiz', question: 'Du willst nur das Wort „ausverkauft“ in einem Satz markieren. Welches Element?', options: ['`span`', '`div`', '`p`'], correct: 0, explanation: 'span ist der Inline-Container – er bleibt in der Zeile. div und p sind Block-Elemente.' },
    { id: '08-11', konzept: 'html.div-span', type: 'fill', text: 'Außen die Block-Kiste, innen das Inline-Etikett. Vervollständige.', template: '<___ class="karte">\n  <h2>Court Low</h2>\n  <p>Preis: <___ class="preis">89 €</___></p>\n</___>', accept: [['div'], ['span'], ['span'], ['div']], hint: 'Block-Container außen, Inline-Container im Absatz.' },
    { id: '08-12', konzept: 'html.div-span', type: 'order', text: 'Sortiere die Sneaker-Karte: Kiste, Name, Preis.', lines: ['<div class="karte">', '  <h2>Court Low</h2>', '  <p>Preis: <span class="preis">89 €</span></p>', '</div>'] },
    { id: '08-13', konzept: 'html.div-span', type: 'bug', text: 'Eine Zeile verstößt gegen die Block-Inline-Regel. Welche?', lines: ['<p>Preis: <span class="preis">89 €</span></p>', '<span><p>Lieferung in zwei Tagen.</p></span>', '<div class="karte"><p>Größe 42</p></div>'], line: 1, explanation: 'Ein Block-Element (p) darf nicht in einem Inline-Element (span) stehen. Richtig wäre div außen oder span im Absatz.' },
    { id: '08-14', konzept: 'html.div-span', type: 'quiz', question: 'Was unterscheidet div und span?', options: ['div ist ein Block-Container, span ein Inline-Container', 'div ist für Text, span für Bilder', 'span erzeugt immer eine neue Zeile'], correct: 0, explanation: 'div beginnt eine neue Zeile und fasst ganze Blöcke, span bleibt im Text und markiert ein Stück davon.' },
    { id: '08-15', konzept: 'html.semantik', type: 'quiz', question: 'Welches Element enthält den Hauptinhalt einer Seite und darf nur einmal vorkommen?', options: ['`main`', '`header`', '`section`'], correct: 0, explanation: 'Genau ein main pro Seite. header ist der Kopf, section ein Abschnitt – davon darf es mehrere geben.' },
    { id: '08-16', konzept: 'html.semantik', type: 'pair', text: 'Ordne die Zonen ihrer Bedeutung zu.', pairs: [['`<header>`', 'Kopf: Titel, Logo'], ['`<nav>`', 'Navigation mit Links'], ['`<main>`', 'Hauptinhalt, genau einmal'], ['`<footer>`', 'Fuß: Adresse, Impressum'], ['`<article>`', 'in sich abgeschlossener Beitrag']] },
    { id: '08-17', konzept: 'html.semantik', type: 'order', text: 'Sortiere die Zonen in die übliche Reihenfolge.', lines: ['<header>', '  <h1>Pixelpiraten</h1>', '</header>', '<main>', '  <p>Wir spielen fair.</p>', '</main>'] },
    { id: '08-18', konzept: 'html.semantik', type: 'bug', text: 'Eine Zeile passt nicht. Welche?', lines: ['<header>', '  <h1>Programm</h1>', '</header>', '<nav>', '  <a href="index.html">Start</a>', '</div>'], line: 5, explanation: 'Die Navigation wurde mit `</div>` geschlossen – es muss `</nav>` sein.' },
    { id: '08-19', konzept: 'html.semantik', type: 'quiz', question: 'Warum `nav` statt `div` für die Linkzeile?', options: ['Screenreader und Suchmaschinen erkennen die Navigation', 'Die Links stehen dann nebeneinander', 'Die Links werden dann unterstrichen'], correct: 0, explanation: 'Semantische Elemente tragen Bedeutung, kein Aussehen – das Aussehen regelt CSS.' },
    { id: '08-20', konzept: 'html.semantik', type: 'fill', text: 'In welche Zone gehört die Adresse am Seitenende? Vervollständige.', template: '<___>\n  <p>Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn</p>\n</___>', accept: [['footer'], ['footer']], hint: 'Das Element für den Fuß der Seite – auf Englisch.' },
  ],
});

/* ================= Abnahme ================= */
schreibe('boss.json', {
  chapter: KAPITEL,
  title: 'Abnahme: Zonen',
  intro: 'Ayla sagt, unsere Seiten haben jetzt „Zonen“ – Kopf, Navigation, Hauptteil, Fuß. Ich seh davon nichts, aber angeblich merkt es jeder Screenreader. Zeig mir, dass du weißt, was wohin gehört!',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'html.semantik', type: 'quiz', question: 'Welche Zone nimmt die Links zu Programm, Galerie und Tickets auf?', options: ['`nav`', '`header`', '`footer`'], correct: 0, explanation: 'Die Navigation ist das Element für die Links zu den Seiten.' },
    { konzept: 'html.th', type: 'fill', text: 'Vervollständige die Kopfzeile der Tabelle.', template: '<tr>\n  <___>Zeit</___>\n  <th>Act</th>\n</tr>', accept: [['th'], ['th']] },
    {
      type: 'code',
      task: '1. **Gruppiere** Überschrift und beide Absätze in einem Container mit der Klasse `karte`. 2. **Ergänze** an der Überschrift die id `court-low`. 3. **Markiere** den Preis „89 €“ mit einem Inline-Element der Klasse `preis`.',
      starter: {
        html: '<h2>Court Low</h2>\n<p>Klassischer Sneaker in Weiß, Größe 36 bis 47.</p>\n<p>Preis: 89 €</p>\n',
      },
      solution: {
        html: '<div class="karte">\n  <h2 id="court-low">Court Low</h2>\n  <p>Klassischer Sneaker in Weiß, Größe 36 bis 47.</p>\n  <p>Preis: <span class="preis">89 €</span></p>\n</div>\n',
      },
      tests: [
        { type: 'text', selector: 'div.karte > h2', expected: 'Court Low', label: 'Die Überschrift liegt im Container' },
        { type: 'selector', selector: 'div.karte > p', count: 2, label: 'Beide Absätze liegen im Container' },
        { type: 'selector', selector: 'h2#court-low', count: 1, label: 'Die Überschrift hat die id „court-low“' },
        { type: 'text', selector: 'div.karte p span.preis', expected: '89 €', label: 'Der Preis ist als Etikett markiert' },
        { type: 'text', selector: 'div.karte > p:last-child', expected: 'Preis: 89 €', label: 'Der Preis-Absatz liest sich unverändert' },
      ],
    },
    { konzept: 'html.img', type: 'pair', text: 'Ordne zu.', pairs: [['`<img>`', 'Bild – ein Leerelement ohne schließenden Tag'], ['`alt`', 'Alternativtext, wenn das Bild fehlt'], ['`<figcaption>`', 'Bildunterschrift im Bild-Block'], ['`controls`', 'Bedienelemente für Audio und Video']] },
    { konzept: 'html.liste-verschachtelt', type: 'order', text: 'Sortiere das Line-up der Zeltbühne – innen eine nummerierte Liste.', lines: ['<ul>', '  <li>Zeltbühne', '    <ol>', '      <li>Kiki Volt</li>', '    </ol>', '  </li>', '</ul>'] },
    { konzept: 'html.id', type: 'quiz', question: 'Zwei Überschriften tragen dieselbe id. Was passiert beim Klick auf die Sprungmarke?', options: ['Der Browser springt zur ersten – die zweite ist nicht erreichbar', 'Der Browser zeigt eine Fehlermeldung', 'Beide Überschriften werden markiert'], correct: 0, explanation: 'Eine id muss einmalig sein. Bei Doppelung gewinnt das erste Element, das zweite ist per Sprungmarke nicht erreichbar.' },
    { konzept: 'html.div-span', type: 'bug', text: 'Eine Zeile verstößt gegen die Block-Inline-Regel. Welche?', lines: ['<div class="karte">', '  <h2>Neon Runner</h2>', '  <span><p>129 €</p></span>', '</div>'], line: 2, explanation: 'Ein Block-Element (p) darf nicht in einem Inline-Element (span) liegen – das span gehört in den Absatz.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** zwei Fehler auf der Vereinsseite: Die gelbe Navigation umschließt den blauen Hauptbereich, statt davor zu enden – und der dunkle Fußbereich klebt im Hauptbereich statt darunter.',
      starter: {
        html: '<header>\n  <h1>SV Hafenkick</h1>\n</header>\n<nav>\n  <a href="index.html">Start</a>\n  <a href="spiele.html">Spiele</a>\n</div>\n<main>\n  <h2>Nächste Spiele</h2>\n  <table>\n    <tr>\n      <th>Datum</th>\n      <th>Gegner</th>\n    </tr>\n    <tr>\n      <td>So, 12. Juli</td>\n      <td>Neckarpiraten</td>\n    </tr>\n  </table>\n  <footer>\n    <p>SV Hafenkick · Hafenstraße 12 · 74072 Heilbronn</p>\n  </footer>\n</main>\n',
        css: CSS_ZONEN,
      },
      editable: ['html'],
      solution: {
        html: '<header>\n  <h1>SV Hafenkick</h1>\n</header>\n<nav>\n  <a href="index.html">Start</a>\n  <a href="spiele.html">Spiele</a>\n</nav>\n<main>\n  <h2>Nächste Spiele</h2>\n  <table>\n    <tr>\n      <th>Datum</th>\n      <th>Gegner</th>\n    </tr>\n    <tr>\n      <td>So, 12. Juli</td>\n      <td>Neckarpiraten</td>\n    </tr>\n  </table>\n</main>\n<footer>\n  <p>SV Hafenkick · Hafenstraße 12 · 74072 Heilbronn</p>\n</footer>\n',
      },
      tests: [
        { type: 'selector', selector: 'body > main', count: 1, label: 'Der Hauptbereich steht direkt im body, nicht in der Navigation' },
        { type: 'selector', selector: 'main footer', count: 0, label: 'Der Fußbereich liegt nicht im Hauptbereich' },
        { type: 'selector', selector: 'body > footer', count: 1, label: 'Der Fußbereich steht direkt im body' },
        { type: 'selector', selector: 'nav > a', count: 2, label: 'Die zwei Links bleiben in der Navigation' },
        { type: 'selector', selector: 'main table tr', count: 2, label: 'Die Spieltabelle bleibt im Hauptbereich' },
      ],
    },
    { konzept: 'html.colspan', type: 'quiz', question: 'Eine Tabellenzelle soll über zwei Spalten gehen. Welches Attribut?', options: ['`colspan`', '`rowspan`', '`width`'], correct: 0, explanation: 'colspan verbindet Spalten (columns), rowspan Zeilen. width ist keine Lösung dafür.' },
    { konzept: 'html.class', type: 'fill', text: 'Der Absatz soll zwei Klassen tragen: hinweis und wichtig. Vervollständige den Attributnamen.', template: '<p ___="hinweis wichtig">Einlass ab 16 Uhr</p>', accept: ['class'] },
  ],
});
console.log('Kapitel 08 geschrieben');
