// Kapitel 05 – Links (Station „Wegweiser“).
// Erzeugt public/content/chapters/05-links/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '05-links');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Lektion 1: Die zwei Teile eines Links – href (Ziel) und Linktext (sichtbar)
const FIG_LINK = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="224" y="30" text-anchor="middle" fill="#ff7a45" font-weight="bold">Linktext: anklickbar</text><path d="M191 50 V40 H258 V50" stroke="#ff7a45" stroke-width="2" fill="none"/><rect x="12" y="52" width="296" height="40" rx="8" fill="#1b2135"/><text x="22" y="78" fill="#eef2ff" font-family="monospace" font-size="14">&lt;a href="</text><text x="98" y="78" fill="#38c7ff" font-family="monospace" font-size="14">https://…</text><text x="174" y="78" fill="#eef2ff" font-family="monospace" font-size="14">"&gt;</text><text x="191" y="78" fill="#ff7a45" font-family="monospace" font-size="14">Fahrplan</text><text x="258" y="78" fill="#eef2ff" font-family="monospace" font-size="14">&lt;/a&gt;</text><path d="M98 94 V104 H174 V94" stroke="#38c7ff" stroke-width="2" fill="none"/><text x="136" y="122" text-anchor="middle" fill="#38c7ff" font-weight="bold">href: die Zieladresse</text><text x="22" y="150" fill="#eef2ff">Im Browser sichtbar:</text><text x="170" y="150" fill="#ff7a45" text-decoration="underline">Fahrplan</text></svg>`;

// Lektion 2: Interner Link (Dateiname) und Sprungmarke (id + #)
const FIG_INTERN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="88" y="22" text-anchor="middle" fill="#ff7a45" font-weight="bold">Eigene Seite</text><rect x="24" y="34" width="128" height="26" rx="5" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="88" y="52" text-anchor="middle" fill="#eef2ff">index.html</text><path d="M40 62 V106" stroke="#4ade80" stroke-width="2" marker-end="url(#m5g)"/><text x="50" y="88" fill="#4ade80" font-family="monospace" font-size="12">href="team.html"</text><rect x="24" y="112" width="128" height="26" rx="5" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="88" y="130" text-anchor="middle" fill="#eef2ff">team.html</text><text x="88" y="154" text-anchor="middle" fill="#eef2ff">nur der Dateiname</text><text x="248" y="22" text-anchor="middle" fill="#38c7ff" font-weight="bold">Sprungmarke</text><rect x="190" y="34" width="116" height="116" rx="5" fill="#e8ecf7"/><text x="198" y="56" fill="#0f1320" font-family="monospace" font-size="12">href="#essen"</text><path d="M248 64 V118" stroke="#38c7ff" stroke-width="2" marker-end="url(#m5c)"/><text x="198" y="140" fill="#0f1320" font-family="monospace" font-size="12">id="essen"</text><defs><marker id="m5g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#4ade80"/></marker><marker id="m5c" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#38c7ff"/></marker></defs></svg>`;

// Lektion 3: mailto öffnet das Mailprogramm, target="_blank" einen neuen Tab
const FIG_MAIL_TAB = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="80" y="30" text-anchor="middle" fill="#b48cff" font-family="monospace" font-size="12">href="mailto:…"</text><path d="M80 40 V62" stroke="#b48cff" stroke-width="2" marker-end="url(#m5v)"/><rect x="30" y="68" width="100" height="60" rx="6" fill="#1b2135" stroke="#b48cff" stroke-width="2"/><path d="M30 68 L80 102 L130 68" stroke="#b48cff" stroke-width="2" fill="none"/><text x="80" y="150" text-anchor="middle" fill="#eef2ff">Mailprogramm öffnet</text><text x="240" y="30" text-anchor="middle" fill="#ffd84d" font-family="monospace" font-size="12">target="_blank"</text><path d="M240 40 V62" stroke="#ffd84d" stroke-width="2" marker-end="url(#m5y)"/><rect x="176" y="68" width="128" height="60" rx="6" fill="#1b2135" stroke="#ffd84d" stroke-width="2"/><rect x="182" y="74" width="52" height="16" rx="3" fill="#0f1320"/><text x="208" y="86" text-anchor="middle" fill="#eef2ff">FUNKEN</text><rect x="238" y="74" width="60" height="16" rx="3" fill="#ffd84d"/><text x="268" y="86" text-anchor="middle" fill="#0f1320">Fahrplan</text><text x="240" y="150" text-anchor="middle" fill="#eef2ff">neuer Tab</text><defs><marker id="m5v" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#b48cff"/></marker><marker id="m5y" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker></defs></svg>`;

/* ---------- Lektion 1: Externe Links ---------- */
schreibe('lessons/01-externe-links.json', {
  id: '01-externe-links',
  title: 'Externe Links',
  konzepte: ['html.a-extern'],
  steps: [
    {
      type: 'explain',
      text: 'Sam schreibt: „Die Leute fragen ständig nach dem Stadtbahn-Fahrplan – kann die Seite da nicht einfach hinführen?“ Kann sie. Dafür gibt es das **Link-Element** `<a>` – das a steht für *anchor*, Anker.\n\nEin Link hat zwei Teile: die **Zieladresse** im Attribut `href` und den **Linktext** zwischen den Tags – das, was man anklickt.',
      figure: FIG_LINK,
    },
    {
      type: 'example',
      text: 'Ein Link mitten im Absatz. Der Browser zeigt ihn **blau und unterstrichen**, der Mauszeiger wird darüber zur Hand. **Ändere** den Linktext zwischen den Tags – das Ziel bleibt gleich. **Ändere** dann die Adresse in `https://www.example.org` – die Seite sieht gleich aus, aber der Klick führt woandershin.',
      html: '<h1>Anfahrt zum Turnier</h1>\n<p>Die Halle liegt direkt an der Stadtbahn. Alle Zeiten stehen im <a href="https://www.example.com">Fahrplan der Stadtbahn</a>.</p>\n',
    },
    {
      type: 'quiz',
      question: 'Welches Attribut sagt dem Browser, **wohin** ein Link führt?',
      options: ['`href`', '`src`', '`link`', '`url`'],
      correct: 0,
      explanation: '`href` (hypertext reference) trägt die Zieladresse. `src` gehört zu Bildern – das kommt im nächsten Kapitel. `link` und `url` gibt es als Attribut nicht.',
    },
    {
      type: 'code',
      task: '**Erstelle** im Absatz „Turnierplan:“ hinter dem Doppelpunkt einen Link: Der Linktext lautet „Alle Termine“ und führt zur Adresse https://www.example.com/turnier',
      starter: {
        html: '<h1>Clan Nachtwache</h1>\n<p>Wir spielen jeden Samstag ab 20 Uhr.</p>\n<p>Turnierplan: </p>\n',
      },
      hints: [
        'Ein Link ist ein `a`-Element mit dem Attribut für die Zieladresse. Der sichtbare Text steht zwischen öffnendem und schließendem Tag.',
        'Muster aus einem anderen Kontext: `<a href="https://www.example.org">Speisekarte</a>`',
        'Der Link kommt in den vorhandenen Absatz, direkt hinter „Turnierplan: “ – Adresse und Text aus der Aufgabe einsetzen.',
      ],
      solution: {
        html: '<h1>Clan Nachtwache</h1>\n<p>Wir spielen jeden Samstag ab 20 Uhr.</p>\n<p>Turnierplan: <a href="https://www.example.com/turnier">Alle Termine</a></p>\n',
      },
      tests: [
        { type: 'selector', selector: 'p a', count: 1, label: 'Im Absatz steht genau ein Link' },
        { type: 'attr', selector: 'p a', attr: 'href', expected: 'https://www.example.com/turnier', label: 'Der Link führt zu https://www.example.com/turnier' },
        { type: 'text', selector: 'p a', expected: 'Alle Termine', label: 'Der Linktext lautet „Alle Termine“' },
        { type: 'text', selector: 'p:nth-of-type(2)', expected: 'Turnierplan: Alle Termine', label: 'Das Wort „Turnierplan:“ steht vor dem Link' },
      ],
    },
    {
      type: 'explain',
      text: 'Zu fremden Seiten führt immer die **komplette Adresse** – mit `https://` am Anfang. Fehlt das Protokoll, sucht der Browser eine eigene Datei mit diesem Namen.\n\n```html\n<p>Alle Regeln stehen im <a href="https://www.example.com/regeln">Regelwerk des Verbands</a>.</p>\n```\n\nDer **Linktext** sagt, wohin es geht: „Regelwerk des Verbands“ statt „hier klicken“. Und der Link steht **im Text** – in einem Absatz oder Listenpunkt.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Link zur Website der Fahrschule.',
      template: '<___ ___="https://www.example.com/fahrschule">Fahrschule am Neckar</a>',
      accept: [['a'], ['href']],
      hint: 'Erst der Tag-Name des Link-Elements, dann das Attribut für die Zieladresse.',
    },
    {
      type: 'code',
      task: '**Gestalte** den letzten Listenpunkt: Das Wort „Kalender“ wird zum Link und führt zu https://www.example.com/drops – der übrige Text des Listenpunkts bleibt stehen.',
      starter: {
        html: '<h2>Sneaker-Drops im Oktober</h2>\n<ul>\n  <li>3. Oktober: Retro Runner</li>\n  <li>17. Oktober: Court Classic</li>\n  <li>Alle Drops im Kalender</li>\n</ul>\n',
      },
      hints: [
        'Der Link kommt mitten in den Listenpunkt: Nur das eine Wort wird von den Link-Tags eingeschlossen.',
        'So sieht das in einem Satz aus: `Mehr im <a href="https://www.example.org">Regelwerk</a> des Verbands.`',
        'Aufbau: `<li>Alle Drops im <a href="…">…</a></li>` – Adresse und Wort aus der Aufgabe einsetzen.',
      ],
      solution: {
        html: '<h2>Sneaker-Drops im Oktober</h2>\n<ul>\n  <li>3. Oktober: Retro Runner</li>\n  <li>17. Oktober: Court Classic</li>\n  <li>Alle Drops im <a href="https://www.example.com/drops">Kalender</a></li>\n</ul>\n',
      },
      tests: [
        { type: 'attr', selector: 'li a', attr: 'href', expected: 'https://www.example.com/drops', label: 'Der Link im Listenpunkt führt zu https://www.example.com/drops' },
        { type: 'text', selector: 'li a', expected: 'Kalender', label: 'Nur das Wort „Kalender“ ist der Link' },
        { type: 'text', selector: 'li:nth-child(3)', expected: 'Alle Drops im Kalender', label: 'Der Listenpunkt lautet weiterhin „Alle Drops im Kalender“' },
        { type: 'selector', selector: 'ul li', count: 3, label: 'Die Liste hat noch drei Punkte' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Begriffe rund um den Link zu.',
      pairs: [
        ['`<a>`', 'das Link-Element – a wie Anker'],
        ['`href`', 'Attribut mit der Zieladresse'],
        ['Linktext', 'steht zwischen den Tags und ist anklickbar'],
        ['`https://`', 'Anfang jeder Adresse zu einer fremden Seite'],
        ['„hier klicken“', 'schlechter Linktext – sagt nicht, wohin es geht'],
      ],
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz eine Aufzählungsliste mit drei Links, ein Link pro Punkt – der Linktext ist jeweils der Serienname: „Nachtwache“ → https://www.example.com/nachtwache, „Kabelsalat“ → https://www.example.com/kabelsalat, „Neckar High“ → https://www.example.com/neckar-high',
      starter: {
        html: '<h1>Meine Top 3 Serien</h1>\n<p>Trailer und Infos zu meinen Lieblingsserien:</p>\n',
      },
      hints: [
        'Erst die Liste mit drei Punkten bauen, dann in jeden Punkt einen Link setzen.',
        'Ein Listenpunkt mit Link sieht so aus: `<li><a href="https://www.example.org">Fahrschule</a></li>`',
        'Aufbau: `<ul>` mit drei `<li>`, darin jeweils `<a href="…">…</a>` – Adressen und Seriennamen aus der Aufgabe.',
      ],
      solution: {
        html: '<h1>Meine Top 3 Serien</h1>\n<p>Trailer und Infos zu meinen Lieblingsserien:</p>\n<ul>\n  <li><a href="https://www.example.com/nachtwache">Nachtwache</a></li>\n  <li><a href="https://www.example.com/kabelsalat">Kabelsalat</a></li>\n  <li><a href="https://www.example.com/neckar-high">Neckar High</a></li>\n</ul>\n',
      },
      tests: [
        { type: 'selector', selector: 'ul li', count: 3, label: 'Die Aufzählungsliste hat drei Punkte' },
        { type: 'selector', selector: 'li > a', count: 3, label: 'In jedem Punkt steht ein Link' },
        { type: 'text', selector: 'a[href="https://www.example.com/nachtwache"]', expected: 'Nachtwache', label: 'Der Link „Nachtwache“ führt zur richtigen Adresse' },
        { type: 'text', selector: 'a[href="https://www.example.com/kabelsalat"]', expected: 'Kabelsalat', label: 'Der Link „Kabelsalat“ führt zur richtigen Adresse' },
        { type: 'text', selector: 'a[href="https://www.example.com/neckar-high"]', expected: 'Neckar High', label: 'Der Link „Neckar High“ führt zur richtigen Adresse' },
        { type: 'order', selectors: ['p', 'ul'], label: 'Die Liste steht unter dem Absatz' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Endlich! Ihr baut den Fahrplan-Link ein? Dann kann ich aufhören, jedem einzeln die Bahnzeiten zu schicken.\n\nDer kommt unter die Anfahrts-Liste, in einen eigenen Absatz. Fremde Seite, also komplette Adresse. Und bitte mit einem Text, der sagt, was das ist – nicht „hier klicken“.',
    },
    { type: 'code', etappe: '05-links/01-externe-links' },
  ],
});

/* ---------- Lektion 2: Interne Links und Sprungmarken ---------- */
schreibe('lessons/02-interne-links-und-sprungmarken.json', {
  id: '02-interne-links-und-sprungmarken',
  title: 'Interne Links und Sprungmarken',
  konzepte: ['html.a-intern', 'html.a-sprungmarke'],
  steps: [
    {
      type: 'explain',
      text: 'Die FUNKEN-Website bekommt mehrere Seiten: Startseite, Programm, Galerie, Tickets. Von einer zur anderen kommt man mit **internen Links** – Links zu eigenen Dateien.\n\nDafür reicht der **Dateiname**: `href="programm.html"`. Kein `https://`, keine Domain – der Browser sucht die Datei im selben Ordner wie die aktuelle Seite. Auf der fertigen Website liegen alle Dateien nebeneinander.',
      figure: FIG_INTERN,
    },
    {
      type: 'example',
      text: 'Eine **Linkzeile** ist die einfachste Navigation: ein Absatz mit mehreren Links, getrennt durch einen Mittelpunkt (·). Die ersten beiden führen zu eigenen Dateien, der dritte nach draußen. **Klicke** auf „Spielplan“: In der Werkbank passiert nichts, denn die Datei spiele.html gibt es hier nicht – auf der fertigen Website öffnet sie sich. **Ergänze** einen vierten Link „Tickets“ zur Datei tickets.html.',
      html: '<h1>SV Neckarblick</h1>\n<p>\n  <a href="team.html">Team</a> ·\n  <a href="spiele.html">Spielplan</a> ·\n  <a href="https://www.example.com/verband">Verband</a>\n</p>\n<p>Willkommen auf der Seite des SV Neckarblick!</p>\n',
    },
    {
      type: 'quiz',
      question: 'Ein Link soll von der Startseite zur eigenen Datei `spiele.html` im selben Ordner führen. Welche Adresse ist richtig?',
      options: ['`spiele.html`', '`https://spiele.html`', '`spiele`'],
      correct: 0,
      explanation: 'Eigene Dateien im selben Ordner erreichst du über den Dateinamen mit Endung. `https://` gehört nur zu fremden Servern, und ohne `.html` findet der Browser die Datei nicht.',
    },
    {
      type: 'code',
      task: '**Ergänze** direkt unter der Hauptüberschrift einen neuen Absatz mit einem Link: Der Linktext lautet „Spielplan“, das Ziel ist die eigene Datei `spiele.html`. Die beiden vorhandenen Absätze bleiben.',
      starter: {
        html: '<h1>SV Neckarblick</h1>\n<p>Der Verein aus dem Heilbronner Osten – seit 1921.</p>\n<p>Nächstes Heimspiel: Sonntag, 15 Uhr.</p>\n',
      },
      hints: [
        'Eigene Dateien verlinkst du nur mit dem Dateinamen samt Endung – ohne https und ohne Domain.',
        'Muster aus einem anderen Kontext: `<p><a href="speisekarte.html">Speisekarte</a></p>`',
        'Der neue Absatz steht zwischen der Überschrift und dem ersten vorhandenen Absatz – darin nur der Link.',
      ],
      solution: {
        html: '<h1>SV Neckarblick</h1>\n<p><a href="spiele.html">Spielplan</a></p>\n<p>Der Verein aus dem Heilbronner Osten – seit 1921.</p>\n<p>Nächstes Heimspiel: Sonntag, 15 Uhr.</p>\n',
      },
      tests: [
        { type: 'attr', selector: 'h1 + p a', attr: 'href', expected: 'spiele.html', label: 'Der Link direkt unter der Überschrift führt zu spiele.html' },
        { type: 'text', selector: 'h1 + p a', expected: 'Spielplan', label: 'Der Linktext lautet „Spielplan“' },
        { type: 'text', selector: 'h1 + p', expected: 'Spielplan', label: 'Der neue Absatz enthält nur den Link' },
        { type: 'selector', selector: 'p', count: 3, label: 'Die beiden anderen Absätze sind noch da' },
      ],
    },
    {
      type: 'explain',
      text: 'Lange Seite, Kontakt ganz unten? Eine **Sprungmarke** ist ein Link, der innerhalb der Seite springt. Zwei Zutaten:\n\n1. Das Ziel bekommt eine **id** – einen eindeutigen Namen ohne Leerzeichen, nur einmal pro Seite.\n2. Der Link zeigt mit `#` auf diesen Namen.\n\n```html\n<p><a href="#kontakt">Zum Kontakt</a></p>\n…\n<h2 id="kontakt">Kontakt</h2>\n```\n\nEin Link „Nach oben“ funktioniert genauso – sein Ziel ist die Hauptüberschrift mit einer id.',
    },
    {
      type: 'fill',
      text: 'Vervollständige die Sprungmarke zum Kontakt-Abschnitt: erst den Link, dann das Ziel.',
      template: '<a href="___">Zum Kontakt</a> … <h2 ___="kontakt">Kontakt</h2>',
      accept: [['#kontakt'], ['id']],
      hint: 'Der Link braucht die Raute vor dem Namen. Das Ziel bekommt das Attribut für den eindeutigen Namen.',
    },
    {
      type: 'code',
      task: '**Erstelle** eine Sprungmarke: Die Überschrift „Preise“ bekommt die id `preise`. Im Absatz unter der Hauptüberschrift wird das Wort „Preise“ zum Link, der zu dieser Überschrift springt – der restliche Satz bleibt.',
      starter: {
        html: '<h1>Fitness-Block Heilbronn</h1>\n<p>Kurse, Geräte, Preise – alles auf einer Seite.</p>\n<h2>Kurse</h2>\n<p>Montag Kraft, Mittwoch Ausdauer, Freitag Mobility.</p>\n<h2>Preise</h2>\n<p>Schüler und Azubis zahlen 19 Euro im Monat.</p>\n',
      },
      hints: [
        'Zwei Stellen: Das Ziel (die Überschrift) braucht das Attribut mit dem eindeutigen Namen, der Link zeigt mit Raute auf diesen Namen.',
        'Muster: `<h2 id="faq">Fragen</h2>` und dazu `<a href="#faq">Zu den Fragen</a>`',
        'Im Absatz nur das Wort „Preise“ mit den Link-Tags einschließen – der Rest des Satzes bleibt stehen.',
      ],
      solution: {
        html: '<h1>Fitness-Block Heilbronn</h1>\n<p>Kurse, Geräte, <a href="#preise">Preise</a> – alles auf einer Seite.</p>\n<h2>Kurse</h2>\n<p>Montag Kraft, Mittwoch Ausdauer, Freitag Mobility.</p>\n<h2 id="preise">Preise</h2>\n<p>Schüler und Azubis zahlen 19 Euro im Monat.</p>\n',
      },
      tests: [
        { type: 'selector', selector: 'h2#preise', label: 'Die Überschrift „Preise“ hat die id preise' },
        { type: 'attr', selector: 'h1 + p a', attr: 'href', expected: '#preise', label: 'Der Link springt zur id preise' },
        { type: 'text', selector: 'h1 + p a', expected: 'Preise', label: 'Nur das Wort „Preise“ ist der Link' },
        { type: 'text', selector: 'h1 + p', expected: 'Kurse, Geräte, Preise – alles auf einer Seite.', label: 'Der Satz ist sonst unverändert' },
      ],
    },
    {
      type: 'order',
      text: 'Bring die Speiseplan-Seite in die richtige Reihenfolge: Überschrift, Sprungmarken-Link, dann die Tage.',
      lines: ['<h1>Kantine</h1>', '<p><a href="#freitag">Direkt zu Freitag</a></p>', '<h2>Montag</h2>', '<p>Pasta mit Tomatensoße</p>', '<h2 id="freitag">Freitag</h2>', '<p>Pizza-Tag</p>'],
      explanation: 'Der Sprungmarken-Link steht oben, sein Ziel – die Überschrift mit der id – weiter unten.',
    },
    {
      type: 'code',
      task: '**Erweitere** den Steckbrief um Sprungmarken: Die drei Zwischenüberschriften bekommen die ids `hobbys`, `essen` und `kontakt`, die Hauptüberschrift die id `oben`. Im Absatz „Springe zu:“ werden die drei Wörter zu Links auf die passenden Überschriften. Ganz unten kommt ein Absatz mit dem Link „Nach oben“.',
      starter: {
        html: '<h1>Steckbrief: Lena</h1>\n<p>Springe zu: Hobbys · Lieblingsessen · Kontakt</p>\n<h2>Hobbys</h2>\n<p>Bouldern, Zeichnen und Serien schauen.</p>\n<h2>Lieblingsessen</h2>\n<p>Ramen – scharf, mit extra Ei.</p>\n<h2>Kontakt</h2>\n<p>Sprich mich in der Schule an – ich beiße nicht.</p>\n',
      },
      hints: [
        'Jede Sprungmarke braucht zwei Dinge: eine id am Ziel und einen Link mit Raute und demselben Namen. Vier Ziele, vier Links.',
        'Muster: `<h2 id="preise">Preise</h2>` und `<a href="#preise">Preise</a>` – Namen genau gleich schreiben, klein und ohne Leerzeichen.',
        '„Nach oben“ ist ein ganz normaler Sprungmarken-Link: Sein Ziel ist die h1 mit der id oben, er steht als letzter Absatz der Seite.',
      ],
      solution: {
        html: '<h1 id="oben">Steckbrief: Lena</h1>\n<p>Springe zu: <a href="#hobbys">Hobbys</a> · <a href="#essen">Lieblingsessen</a> · <a href="#kontakt">Kontakt</a></p>\n<h2 id="hobbys">Hobbys</h2>\n<p>Bouldern, Zeichnen und Serien schauen.</p>\n<h2 id="essen">Lieblingsessen</h2>\n<p>Ramen – scharf, mit extra Ei.</p>\n<h2 id="kontakt">Kontakt</h2>\n<p>Sprich mich in der Schule an – ich beiße nicht.</p>\n<p><a href="#oben">Nach oben</a></p>\n',
      },
      tests: [
        { type: 'selector', selector: 'h1#oben', label: 'Die Hauptüberschrift hat die id oben' },
        { type: 'selector', selector: 'h2#hobbys, h2#essen, h2#kontakt', count: 3, label: 'Die drei Zwischenüberschriften haben die ids hobbys, essen und kontakt' },
        { type: 'selector', selector: 'p a[href="#hobbys"], p a[href="#essen"], p a[href="#kontakt"]', count: 3, label: 'Im Absatz „Springe zu:“ stehen drei Sprungmarken-Links' },
        { type: 'text', selector: 'a[href="#essen"]', expected: 'Lieblingsessen', label: 'Der Link „Lieblingsessen“ springt zum Essen' },
        { type: 'text', selector: 'a[href="#oben"]', expected: 'Nach oben', label: 'Der Link „Nach oben“ springt zur Hauptüberschrift' },
        { type: 'order', selectors: ['h2#kontakt', 'a[href="#oben"]'], label: '„Nach oben“ steht ganz unten' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Navigation zuerst – dann weiß jede Seite, wo sie hingehört. Direkt unter die Hauptüberschrift kommt eine Linkzeile zu Programm, Galerie und Tickets. Die Seiten selbst bauen wir in den nächsten Stationen, die Links legen wir jetzt schon an.\n\nDazu eine Sprungmarke „Direkt zum Line-up“ – die Line-up-Überschrift braucht dafür eine id.',
    },
    { type: 'code', etappe: '05-links/02-interne-links-und-sprungmarken' },
  ],
});

/* ---------- Lektion 3: E-Mail-Links und neuer Tab ---------- */
schreibe('lessons/03-mailto-und-neuer-tab.json', {
  id: '03-mailto-und-neuer-tab',
  title: 'E-Mail-Links und neuer Tab',
  konzepte: ['html.a-mailto', 'html.a-target'],
  steps: [
    {
      type: 'explain',
      text: 'Sam will, dass Leute dem Kollektiv mit einem Klick schreiben können. Dafür gibt es den **E-Mail-Link**: Statt einer Adresse mit `https://` steht im href `mailto:` und direkt dahinter die E-Mail-Adresse.\n\n```html\n<a href="mailto:info@sv-neckarblick-beispiel.de">Schreib uns</a>\n```\n\nBeim Klick öffnet sich das **Mailprogramm** mit fertig eingetragenem Empfänger. Oft ist der Linktext einfach die Adresse selbst.',
      figure: FIG_MAIL_TAB,
    },
    {
      type: 'example',
      text: 'Zwei E-Mail-Links. **Fahre** mit der Maus darüber – beide Ziele beginnen mit mailto. Beim zweiten ist der Linktext die Adresse selbst: So kann man sie auch abschreiben, wenn kein Mailprogramm eingerichtet ist. **Ändere** die Adresse im ersten Link und **beobachte**: Die Seite sieht gleich aus, nur das Ziel ändert sich.',
      html: '<h1>Kontakt</h1>\n<p>Fragen zum Turnier? <a href="mailto:turnier@clan-nachtwache-beispiel.de">Schreib uns</a></p>\n<p>Presse: <a href="mailto:presse@clan-nachtwache-beispiel.de">presse@clan-nachtwache-beispiel.de</a></p>\n',
    },
    {
      type: 'quiz',
      question: 'Wie beginnt die Zieladresse eines Links, der das Mailprogramm öffnet?',
      options: ['`mailto:`', '`https://`', '`email:`', '`@`'],
      correct: 0,
      explanation: '`mailto:` sagt dem Browser: Das ist keine Webseite, sondern eine E-Mail-Adresse – öffne das Mailprogramm. `email:` gibt es nicht.',
    },
    {
      type: 'code',
      task: '**Ergänze** im Absatz „Bewerbung an:“ einen E-Mail-Link, der das Mailprogramm mit dem Empfänger jobs@pixelwerk-beispiel.de öffnet. Der Linktext ist die Adresse selbst.',
      starter: {
        html: '<h1>Praktikum bei Pixelwerk</h1>\n<p>Wir suchen Praktikantinnen und Praktikanten für Webdesign.</p>\n<p>Bewerbung an: </p>\n',
      },
      hints: [
        'Ein E-Mail-Link ist ein normaler Link – nur die Zieladresse beginnt mit mailto und einem Doppelpunkt, direkt gefolgt von der E-Mail-Adresse (kein Leerzeichen, kein https).',
        'Muster: `<a href="mailto:post@kantine-beispiel.de">post@kantine-beispiel.de</a>`',
        'Der Link kommt hinter „Bewerbung an: “ in den vorhandenen Absatz. Die Adresse steht zweimal: einmal hinter mailto, einmal als sichtbarer Text.',
      ],
      solution: {
        html: '<h1>Praktikum bei Pixelwerk</h1>\n<p>Wir suchen Praktikantinnen und Praktikanten für Webdesign.</p>\n<p>Bewerbung an: <a href="mailto:jobs@pixelwerk-beispiel.de">jobs@pixelwerk-beispiel.de</a></p>\n',
      },
      tests: [
        { type: 'attr', selector: 'p a', attr: 'href', expected: 'mailto:jobs@pixelwerk-beispiel.de', label: 'Der Link öffnet das Mailprogramm mit jobs@pixelwerk-beispiel.de' },
        { type: 'text', selector: 'p a', expected: 'jobs@pixelwerk-beispiel.de', label: 'Der Linktext ist die E-Mail-Adresse' },
        { type: 'text', selector: 'p:nth-of-type(2)', expected: 'Bewerbung an: jobs@pixelwerk-beispiel.de', label: 'Der Link steht im Absatz „Bewerbung an:“' },
      ],
    },
    {
      type: 'explain',
      text: 'Ein Klick auf einen Link ersetzt normalerweise die aktuelle Seite. Mit dem Attribut `target` und dem Wert `_blank` öffnet der Link in einem **neuen Tab** – deine Seite bleibt offen.\n\n```html\n<a href="https://www.example.com/fahrplan" target="_blank">Fahrplan</a>\n```\n\nSinnvoll ist das bei **fremden Seiten**, die man nebenbei anschaut (Fahrplan, Karte). Eigene Seiten und Sprungmarken öffnest du **nie** im neuen Tab – sonst sammeln sich Tabs, und der Zurück-Knopf hilft nicht mehr.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Link so, dass die Karte in einem neuen Tab öffnet.',
      template: '<a href="https://www.example.com/karte" ___="___">Anfahrt auf der Karte</a>',
      accept: [['target'], ['_blank']],
      hint: 'Das Attribut heißt wie „Ziel“ auf Englisch, der Wert beginnt mit einem Unterstrich.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die beiden Links des Bubble-Tea-Ladens: Der Bestell-Link öffnet kein Mailprogramm, und die Stadtkarte öffnet im selben Tab statt in einem neuen. Am Ende funktionieren beide Links, die sichtbaren Texte bleiben gleich.',
      starter: {
        html: '<h1>Bubble Tea Bar</h1>\n<p>Vorbestellen: <a href="bestellung@bubble-bar-beispiel.de">bestellung@bubble-bar-beispiel.de</a></p>\n<p>So findest du uns: <a href="https://www.example.com/karte" traget="_blank">Stadtkarte</a></p>\n',
      },
      hints: [
        'Vergleiche jede Zieladresse mit den Mustern aus der Lektion: Womit muss ein E-Mail-Link beginnen? Wie heißt das Attribut für den neuen Tab genau?',
        'Der Browser ignoriert Attribute, die er nicht kennt – ein Buchstabendreher reicht, und der neue Tab bleibt aus.',
        'Im ersten Link fehlt am Anfang der Adresse ein Wort mit Doppelpunkt. Im zweiten Link ist der Attributname falsch geschrieben.',
      ],
      solution: {
        html: '<h1>Bubble Tea Bar</h1>\n<p>Vorbestellen: <a href="mailto:bestellung@bubble-bar-beispiel.de">bestellung@bubble-bar-beispiel.de</a></p>\n<p>So findest du uns: <a href="https://www.example.com/karte" target="_blank">Stadtkarte</a></p>\n',
      },
      tests: [
        { type: 'attr', selector: 'p:nth-of-type(1) a', attr: 'href', expected: 'mailto:bestellung@bubble-bar-beispiel.de', label: 'Der Bestell-Link öffnet das Mailprogramm' },
        { type: 'text', selector: 'p:nth-of-type(1) a', expected: 'bestellung@bubble-bar-beispiel.de', label: 'Der Linktext bleibt die E-Mail-Adresse' },
        { type: 'attr', selector: 'a[href="https://www.example.com/karte"]', attr: 'target', expected: '_blank', label: 'Die Stadtkarte öffnet in einem neuen Tab' },
        { type: 'text', selector: 'a[href="https://www.example.com/karte"]', expected: 'Stadtkarte', label: 'Der Linktext „Stadtkarte“ bleibt' },
      ],
    },
    {
      type: 'pair',
      text: 'Welche Adresse macht was? Ordne zu.',
      pairs: [
        ['`mailto:sam@beispiel.de`', 'öffnet das Mailprogramm'],
        ['`target="_blank"`', 'öffnet den Link in einem neuen Tab'],
        ['`#kontakt`', 'springt zum Element mit der id kontakt'],
        ['`galerie.html`', 'führt zur eigenen Datei im selben Ordner'],
        ['`https://www.example.com`', 'führt zu einer fremden Website'],
      ],
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz eine Aufzählungsliste mit drei Links: 1. „E-Mail an den Laden“ öffnet das Mailprogramm mit laden@sneaker-lager-beispiel.de. 2. „Anfahrt auf der Stadtkarte“ führt zu https://www.example.com/karte und öffnet in einem neuen Tab. 3. „Zurück zur Startseite“ führt zur eigenen Datei `index.html`.',
      starter: {
        html: '<h1>Sneaker-Lager Heilbronn</h1>\n<h2>Kontakt</h2>\n<p>Fragen zu Größen oder Drops? Schreib uns oder komm vorbei.</p>\n',
      },
      hints: [
        'Drei Listenpunkte, in jedem genau ein Link. Überlege für jeden: fremde Seite, E-Mail oder eigene Datei?',
        'Nur der Link zur fremden Seite bekommt das Attribut für den neuen Tab. Muster: `<li><a href="https://www.example.org" target="_blank">Verband</a></li>`',
        'Aufbau: `<ul>` mit drei `<li>`, darin je ein `<a href="…">…</a>` – Adressen: mailto plus E-Mail-Adresse, die Karten-Adresse, der Dateiname.',
      ],
      solution: {
        html: '<h1>Sneaker-Lager Heilbronn</h1>\n<h2>Kontakt</h2>\n<p>Fragen zu Größen oder Drops? Schreib uns oder komm vorbei.</p>\n<ul>\n  <li><a href="mailto:laden@sneaker-lager-beispiel.de">E-Mail an den Laden</a></li>\n  <li><a href="https://www.example.com/karte" target="_blank">Anfahrt auf der Stadtkarte</a></li>\n  <li><a href="index.html">Zurück zur Startseite</a></li>\n</ul>\n',
      },
      tests: [
        { type: 'selector', selector: 'ul li', count: 3, label: 'Die Liste hat drei Punkte' },
        { type: 'selector', selector: 'li > a', count: 3, label: 'In jedem Punkt steht ein Link' },
        { type: 'text', selector: 'a[href="mailto:laden@sneaker-lager-beispiel.de"]', expected: 'E-Mail an den Laden', label: '„E-Mail an den Laden“ öffnet das Mailprogramm mit der Laden-Adresse' },
        { type: 'attr', selector: 'a[href="https://www.example.com/karte"]', attr: 'target', expected: '_blank', label: 'Die Stadtkarte öffnet in einem neuen Tab' },
        { type: 'text', selector: 'a[href="index.html"]', expected: 'Zurück zur Startseite', label: '„Zurück zur Startseite“ führt zu index.html' },
        { type: 'attr', selector: 'a[href="index.html"]', attr: 'target', absent: true, label: 'Die eigene Startseite öffnet im selben Tab' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Mailto ist der älteste Trick im Web – und funktioniert immer noch. Auf der FUNKEN-Startseite bekommt der Fahrplan-Link den neuen Tab, damit niemand unsere Seite verlässt, um Bahnzeiten nachzusehen.\n\nUnd in den Adress-Absatz kommt nach einem weiteren Zeilenumbruch hallo@funken-festival-beispiel.de als anklickbarer E-Mail-Link – mit der Adresse als Linktext.',
    },
    { type: 'code', etappe: '05-links/03-mailto-und-neuer-tab' },
  ],
});

/* ---------- Lektion 4: Wiederholung ---------- */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung: Wegweiser',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Kurzer Rundgang vor der Abnahme: Ich frage Links aus diesem Kapitel ab, dazu Listen aus Kapitel 4, Textelemente aus Kapitel 3 – und den Aufbau einer URL aus Kapitel 1. Denn ohne Protokoll und Domain führt kein Link nach draußen.',
    },
    {
      type: 'quiz',
      question: 'Ein Link hat die Adresse `www.example.com/karte` – ohne Protokoll. Was macht der Browser beim Klick?',
      options: ['Er sucht eine eigene Datei mit diesem Namen – und findet keine', 'Er ergänzt https:// von selbst und öffnet die fremde Seite', 'Er öffnet das Mailprogramm'],
      correct: 0,
      explanation: 'Ohne `https://` behandelt der Browser die Angabe wie einen Dateinamen – genau wie bei `galerie.html`. Für fremde Seiten immer die komplette URL: Protokoll, Domain, Pfad.',
    },
    {
      type: 'fill',
      text: 'Der Linktext soll „Pizza & Mehr“ anzeigen. Vervollständige das Sonderzeichen.',
      template: '<a href="essen.html">Pizza ___ Mehr</a>',
      accept: ['&amp;'],
      hint: 'Sonderzeichen wie das Und-Zeichen haben in HTML eine eigene Schreibweise, die mit & beginnt und mit ; endet.',
    },
    {
      type: 'code',
      task: '**Erstelle** am Ende der Seite den Abschnitt „Links“ (Zwischenüberschrift) mit einer Aufzählungsliste aus zwei Links: „Verband“ → https://www.example.com/verband in einem neuen Tab, und „Unser Team“ → eigene Datei `team.html`.',
      starter: {
        html: '<h1>SV Neckarblick</h1>\n<p>Der Verein aus dem Heilbronner Osten – seit 1921.</p>\n<h2>Spielplan</h2>\n<p>Alle Spiele der Saison 2026/27.</p>\n',
      },
      hints: [
        'Erst die Überschrift der Ebene 2, dann die Liste – jeder Listenpunkt enthält genau einen Link.',
        'Nur der externe Link braucht das Attribut für den neuen Tab, die eigene Datei nicht. Muster: `<li><a href="https://www.example.org" target="_blank">Regeln</a></li>`',
        'Aufbau: `<h2>…</h2>`, dann `<ul>` mit zwei `<li>`, jeweils mit einem `<a>` – Texte und Adressen aus der Aufgabe.',
      ],
      solution: {
        html: '<h1>SV Neckarblick</h1>\n<p>Der Verein aus dem Heilbronner Osten – seit 1921.</p>\n<h2>Spielplan</h2>\n<p>Alle Spiele der Saison 2026/27.</p>\n<h2>Links</h2>\n<ul>\n  <li><a href="https://www.example.com/verband" target="_blank">Verband</a></li>\n  <li><a href="team.html">Unser Team</a></li>\n</ul>\n',
      },
      tests: [
        { type: 'text', selector: 'h2', expected: 'Links', any: true, label: 'Die Zwischenüberschrift „Links“ ist da' },
        { type: 'attr', selector: 'a[href="https://www.example.com/verband"]', attr: 'target', expected: '_blank', label: '„Verband“ öffnet in einem neuen Tab' },
        { type: 'text', selector: 'a[href="https://www.example.com/verband"]', expected: 'Verband', label: 'Der Linktext lautet „Verband“' },
        { type: 'text', selector: 'li a[href="team.html"]', expected: 'Unser Team', label: '„Unser Team“ führt zur eigenen Datei team.html' },
        { type: 'selector', selector: 'li > a', count: 2, label: 'Beide Links stehen in Listenpunkten' },
        { type: 'order', selectors: ['h2:nth-of-type(2)', 'ul'], label: 'Die Liste steht unter der Überschrift „Links“' },
      ],
    },
    {
      type: 'order',
      text: 'Bring den Abschnitt „Mehr“ in die richtige Reihenfolge: Überschrift, Einleitung, Liste, „Nach oben“.',
      lines: ['<h2>Mehr</h2>', '<p>Noch mehr vom Verein:</p>', '<ul>', '  <li><a href="https://www.example.com/verband" target="_blank">Verband</a></li>', '</ul>', '<p><a href="#oben">Nach oben</a></p>'],
      explanation: 'Der Listenpunkt liegt zwischen öffnendem und schließendem Listen-Tag, der Sprungmarken-Link kommt zum Schluss.',
    },
    {
      type: 'pair',
      text: 'Ordne die Bausteine zu.',
      pairs: [
        ['`<br>`', 'Zeilenumbruch innerhalb eines Absatzes'],
        ['`<hr>`', 'Trennlinie'],
        ['`<em>`', 'leichte Betonung'],
        ['`mailto:`', 'Anfang der Adresse eines E-Mail-Links'],
        ['`#oben`', 'Sprungmarke zum Element mit der id oben'],
        ['`_blank`', 'Wert für den neuen Tab'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** den Speiseplan der Kantine: Unter „Montag“ erscheint ein leerer dritter Punkt, und der Link „Direkt zu Freitag“ springt nicht, sondern führt ins Leere. Am Ende gibt es genau vier Gerichte, und der Link springt zur Freitag-Überschrift.',
      starter: {
        html: '<h1 id="oben">Kantine am Bildungscampus</h1>\n<p><a href="freitag">Direkt zu Freitag</a></p>\n<h2>Montag</h2>\n<ul>\n  <li>Pasta mit Tomatensoße</li>\n  <li>Salatteller<li>\n</ul>\n<h2 id="freitag">Freitag</h2>\n<ul>\n  <li>Pizza Margherita</li>\n  <li>Gemüsecurry</li>\n</ul>\n<p><a href="#oben">Nach oben</a></p>\n',
      },
      hints: [
        'Zwei Fehler: einer in der Montags-Liste, einer im Sprungmarken-Link oben. Wie endet ein Listenpunkt? Womit beginnt die Adresse einer Sprungmarke?',
        'Ein Listenpunkt braucht einen schließenden Tag mit Schrägstrich – sonst öffnet der Browser einen neuen, leeren Punkt.',
        'Beim Link „Direkt zu Freitag“ fehlt vor dem Namen der id ein einzelnes Zeichen. Vergleiche mit dem Link „Nach oben“.',
      ],
      solution: {
        html: '<h1 id="oben">Kantine am Bildungscampus</h1>\n<p><a href="#freitag">Direkt zu Freitag</a></p>\n<h2>Montag</h2>\n<ul>\n  <li>Pasta mit Tomatensoße</li>\n  <li>Salatteller</li>\n</ul>\n<h2 id="freitag">Freitag</h2>\n<ul>\n  <li>Pizza Margherita</li>\n  <li>Gemüsecurry</li>\n</ul>\n<p><a href="#oben">Nach oben</a></p>\n',
      },
      tests: [
        { type: 'selector', selector: 'ul li', count: 4, label: 'Genau vier Gerichte, kein leerer Punkt' },
        { type: 'attr', selector: 'h1 + p a', attr: 'href', expected: '#freitag', label: '„Direkt zu Freitag“ springt zur Freitag-Überschrift' },
        { type: 'selector', selector: 'h2#freitag', label: 'Die Freitag-Überschrift hat die id freitag' },
        { type: 'text', selector: 'a[href="#oben"]', expected: 'Nach oben', label: 'Der Link „Nach oben“ ist noch da' },
      ],
    },
    {
      type: 'quiz',
      question: 'Ein Link auf der Vereinsseite führt zu `https://www.example.com/spielplan-2025` – der Server antwortet mit **404**. Was bedeutet das?',
      options: ['Der Server ist erreichbar, aber diese Datei gibt es dort nicht mehr', 'Im Link fehlt das Protokoll', 'Der Server ist abgeschaltet und antwortet nicht'],
      correct: 0,
      explanation: '404 ist eine **Antwort** des Servers: „Diese Datei kenne ich nicht.“ Der Link ist also technisch richtig aufgebaut, nur das Ziel existiert nicht mehr – ein toter Link. Wäre der Server aus, käme gar keine Antwort.',
    },
    {
      type: 'explain',
      text: 'Ab zur FUNKEN-Website: Vor dem Kontakt-Kommentar entsteht der Abschnitt „Mehr“ – eine Linkliste mit der Schule (fremde Seite, neuer Tab) und den Fotos vom letzten Jahr (unsere Galerie-Seite). Genau die Kombination von eben: Liste plus Links.',
    },
    { type: 'code', etappe: '05-links/04-wiederholung' },
  ],
});

/* ---------- Lektion 5: Projekt Navigation ---------- */
schreibe('lessons/05-projekt-navigation.json', {
  id: '05-projekt-navigation',
  title: 'Projekt: Navigation',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Meilenstein! Die Startseite hat jetzt Wegweiser in alle Richtungen: die Linkzeile zu Programm, Galerie und Tickets, den Fahrplan im neuen Tab, die E-Mail zum Kollektiv und die Linkliste unter „Mehr“.\n\nNur eins nervt: Wer unten angekommen ist, scrollt auf dem Handy eine halbe Ewigkeit zurück. Geht da nicht ein Sprung nach oben?',
    },
    {
      type: 'quiz',
      question: 'Der Link „Nach oben“ soll zur Hauptüberschrift springen. Was brauchst du dafür?',
      options: ['Eine id an der Überschrift und einen Link mit # plus dieser id', 'Einen Link zur Datei index.html', 'Einen Link mit dem Attribut target'],
      correct: 0,
      explanation: '„Nach oben“ ist eine Sprungmarke: id am Ziel, `#` plus id im Link. Ein Link auf `index.html` würde die Seite neu laden, `target` öffnet nur einen neuen Tab.',
    },
    {
      type: 'order',
      text: 'Bring den Ausschnitt der FUNKEN-Startseite in die richtige Reihenfolge – „Nach oben“ steht vor der Trennlinie.',
      lines: ['<h1 id="oben">FUNKEN</h1>', '<p><a href="programm.html">Programm</a></p>', '<h2 id="lineup">Line-up</h2>', '<p><a href="#oben">Nach oben</a></p>', '<hr>', '<p>Kollektiv FUNKEN</p>'],
      explanation: 'Oben die Überschrift mit ihrer id und die Linkzeile, unten der Sprung zurück, dann Trennlinie und Adresse.',
    },
    {
      type: 'explain',
      text: 'Ab zur FUNKEN-Website: Die Hauptüberschrift bekommt die id `oben`, und vor dem Kontakt-Kommentar kommt ein Absatz mit dem Link „Nach oben“.\n\nDanach lohnt sich der Knopf **FUNKEN-Website ansehen** (`#/projekt`): Die Sprungmarken funktionieren dort schon. Die Links zu Programm, Galerie und Tickets warten noch auf ihre Seiten – die entstehen an den nächsten Stationen.',
    },
    { type: 'code', etappe: '05-links/05-projekt-navigation' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '05-links',
  fragen: [
    { id: '05-01', konzept: 'html.a-extern', type: 'quiz', question: 'Welches Attribut enthält die Zieladresse eines Links?', options: ['`href`', '`src`', '`link`'], correct: 0, explanation: '`href` trägt die Zieladresse. `src` gehört zu Bildern, `link` ist kein Attribut.' },
    { id: '05-02', konzept: 'html.a-extern', type: 'fill', text: 'Vervollständige den Link zur fremden Website.', template: '<a ___="https://www.example.com">Zur Seite</a>', accept: ['href'], hint: 'Das Attribut für die Zieladresse – vier Buchstaben.' },
    { id: '05-03', konzept: 'html.a-extern', type: 'bug', text: 'Ein Link führt nicht zur fremden Website. Welche Zeile ist falsch?', lines: ['<p>Alle Regeln beim', '<a href="www.example.com/regeln">Verband</a>', 'und beim', '<a href="https://www.example.com/liga">Ligaverband</a>.</p>'], line: 1, explanation: 'Zu fremden Seiten führt nur die komplette Adresse mit `https://` – sonst sucht der Browser eine eigene Datei namens www.example.com/regeln.' },
    { id: '05-04', konzept: 'html.a-extern', type: 'quiz', question: 'Welcher Linktext ist am besten?', options: ['Fahrplan der Stadtbahn', 'hier klicken', 'Link'], correct: 0, explanation: 'Ein guter Linktext sagt, wohin es geht. „hier klicken“ und „Link“ verraten nichts.' },
    { id: '05-05', konzept: 'html.a-intern', type: 'quiz', question: 'Die Datei `galerie.html` liegt im selben Ordner wie die Startseite. Welche Adresse gehört in den Link?', options: ['`galerie.html`', '`https://galerie.html`', '`www.galerie.html`'], correct: 0, explanation: 'Eigene Dateien im selben Ordner verlinkst du nur mit dem Dateinamen – ohne Protokoll und ohne Domain.' },
    { id: '05-06', konzept: 'html.a-intern', type: 'fill', text: 'Der Link soll zu deiner eigenen Galerie-Seite führen – die Datei heißt wie die Seite, mit der üblichen Endung.', template: '<a href="___">Galerie</a>', accept: ['galerie.html'], hint: 'Dateiname klein geschrieben plus Endung für HTML-Dateien.' },
    { id: '05-07', konzept: 'html.a-intern', type: 'bug', text: 'Ein Link der Navigation führt ins Leere. Welche Zeile ist falsch?', lines: ['<p>', '  <a href="programm.html">Programm</a> ·', '  <a href="https://galerie.html">Galerie</a> ·', '  <a href="tickets.html">Tickets</a>', '</p>'], line: 2, explanation: 'Eigene Dateien werden nur mit dem Dateinamen verlinkt – `https://` gehört nur zu fremden Servern.' },
    { id: '05-08', konzept: 'html.a-sprungmarke', type: 'fill', text: 'Das Ziel hat die id `kontakt`. Vervollständige den Sprungmarken-Link.', template: '<a href="___">Zum Kontakt</a>', accept: ['#kontakt'], hint: 'Raute plus der Name der id.' },
    { id: '05-09', konzept: 'html.a-sprungmarke', type: 'order', text: 'Sortiere den Steckbrief: Überschrift, Sprungmarken-Link, Abschnitt, „Nach oben“.', lines: ['<h1 id="oben">Steckbrief</h1>', '<p><a href="#hobbys">Zu den Hobbys</a></p>', '<h2 id="hobbys">Hobbys</h2>', '<p>Bouldern und Zeichnen.</p>', '<p><a href="#oben">Nach oben</a></p>'] },
    { id: '05-10', konzept: 'html.a-sprungmarke', type: 'bug', text: 'Der Link „Zu den Preisen“ springt nicht. Welche Zeile ist falsch?', lines: ['<p><a href="#preise">Zu den Preisen</a></p>', '<h2>Kurse</h2>', '<h2 id="preis">Preise</h2>', '<p>19 Euro im Monat.</p>'], line: 2, explanation: 'Link-Adresse und id müssen genau übereinstimmen: `#preise` braucht `id="preise"`, nicht `preis`.' },
    { id: '05-11', konzept: 'html.a-sprungmarke', type: 'quiz', question: 'Was braucht ein Link, der innerhalb derselben Seite springt?', options: ['Eine id am Ziel und im Link # plus diese id', 'Eine zweite HTML-Datei', 'Das Attribut target'], correct: 0, explanation: 'Sprungmarke = id am Ziel + Link mit `#` und demselben Namen. Keine neue Datei, kein neuer Tab.' },
    { id: '05-12', konzept: 'html.a-mailto', type: 'quiz', question: 'Womit beginnt die Adresse eines Links, der das Mailprogramm öffnet?', options: ['`mailto:`', '`https://`', '`email:`'], correct: 0, explanation: '`mailto:` plus E-Mail-Adresse – dann öffnet der Browser das Mailprogramm mit eingetragenem Empfänger.' },
    { id: '05-13', konzept: 'html.a-mailto', type: 'bug', text: 'Der Link soll das Mailprogramm öffnen, tut es aber nicht. Welche Zeile ist falsch?', lines: ['<p>Fragen?', '<a href="hallo@festival-beispiel.de">', 'Schreib uns</a>', '</p>'], line: 1, explanation: 'Vor der E-Mail-Adresse fehlt `mailto:` – sonst sucht der Browser eine Datei mit diesem Namen.' },
    { id: '05-14', konzept: 'html.a-target', type: 'fill', text: 'Der Fahrplan soll in einem neuen Tab öffnen. Vervollständige den Wert.', template: '<a href="https://www.example.com" target="___">Fahrplan</a>', accept: ['_blank'], hint: 'Unterstrich plus das englische Wort für „leer“.' },
    { id: '05-15', konzept: 'html.a-target', type: 'quiz', question: 'Welcher Link sollte in einem neuen Tab öffnen?', options: ['Der Link zum Fahrplan auf einer fremden Website', 'Der Link zur eigenen Seite programm.html', 'Die Sprungmarke „Nach oben“'], correct: 0, explanation: 'Neue Tabs nur für fremde Seiten, die man nebenbei ansieht. Eigene Seiten und Sprungmarken öffnen im selben Tab.' },
    { id: '05-16', konzept: 'html.a-extern', type: 'pair', text: 'Wohin führt der Link? Ordne zu.', pairs: [['`https://www.example.com`', 'fremde Website'], ['`galerie.html`', 'eigene Datei im selben Ordner'], ['`#oben`', 'Sprungmarke auf derselben Seite'], ['`mailto:sam@beispiel.de`', 'E-Mail-Link']] },
    { id: '05-17', konzept: 'html.a-target', type: 'bug', text: 'Die Stadtkarte soll in einem neuen Tab öffnen, tut es aber nicht. Welche Zeile ist falsch?', lines: ['<p>So findest du uns:', '<a href="https://www.example.com/karte" traget="_blank">', 'Stadtkarte</a>', '</p>'], line: 1, explanation: 'Das Attribut heißt `target` – bei einem Buchstabendreher ignoriert der Browser es einfach.' },
    { id: '05-18', konzept: 'html.a-mailto', type: 'fill', text: 'Vervollständige den E-Mail-Link.', template: '<a href="___info@kantine-beispiel.de">Schreib uns</a>', accept: ['mailto:'], hint: 'Das Wort vor der Adresse endet mit einem Doppelpunkt.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '05-links',
  title: 'Abnahme: Wegweiser',
  intro: 'Wegweiser-Check! Meine Mutter hat gestern die Seite auf dem Handy aufgemacht und gefragt, wo man denn hinklickt. Zeig mir, dass jetzt jeder Link da hinführt, wo er soll – und dass die Mail bei uns ankommt.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'html.a-extern', type: 'quiz', question: 'Ein Link soll zur fremden Seite mit dem Fahrplan führen. Welche Adresse ist richtig?', options: ['`https://www.example.com/fahrplan`', '`www.example.com/fahrplan`', '`fahrplan.html`'], correct: 0, explanation: 'Fremde Seiten brauchen die komplette Adresse mit Protokoll. `fahrplan.html` wäre eine eigene Datei.' },
    { konzept: 'html.a-intern', type: 'pair', text: 'Wohin führen diese Adressen? Ordne zu.', pairs: [['`programm.html`', 'eigene Datei im selben Ordner'], ['`#lineup`', 'Sprungmarke zur id lineup'], ['`mailto:hallo@beispiel.de`', 'E-Mail-Link'], ['`https://www.example.com`', 'fremde Website']] },
    { konzept: 'html.a-sprungmarke', type: 'fill', text: 'Die Überschrift soll Ziel der Sprungmarke `#lineup` werden. Vervollständige.', template: '<h2 ___="lineup">Line-up</h2>', accept: ['id'] },
    { konzept: 'html.a-target', type: 'quiz', question: 'Wann ist ein neuer Tab sinnvoll?', options: ['Bei Links zu fremden Seiten, die man nebenbei ansieht', 'Bei jeder Sprungmarke', 'Bei Links zu eigenen Seiten'], correct: 0, explanation: 'Fremde Seiten dürfen nebenbei aufgehen. Eigene Seiten und Sprungmarken bleiben im selben Tab.' },
    {
      type: 'code',
      task: '**Erstelle** zwei Links: Im ersten Absatz „Schreib uns“ – öffnet das Mailprogramm mit info@sv-neckarblick-beispiel.de. Im zweiten Absatz „Spielplan“ – führt zu https://www.example.com/spielplan und öffnet in einem neuen Tab.',
      starter: {
        html: '<h1>SV Neckarblick</h1>\n<p>Fragen an den Verein? </p>\n<p>Der Spielplan des Verbands: </p>\n',
      },
      solution: {
        html: '<h1>SV Neckarblick</h1>\n<p>Fragen an den Verein? <a href="mailto:info@sv-neckarblick-beispiel.de">Schreib uns</a></p>\n<p>Der Spielplan des Verbands: <a href="https://www.example.com/spielplan" target="_blank">Spielplan</a></p>\n',
      },
      tests: [
        { type: 'attr', selector: 'p:nth-of-type(1) a', attr: 'href', expected: 'mailto:info@sv-neckarblick-beispiel.de', label: '„Schreib uns“ öffnet das Mailprogramm mit der Vereinsadresse' },
        { type: 'text', selector: 'p:nth-of-type(1) a', expected: 'Schreib uns', label: 'Der erste Linktext lautet „Schreib uns“' },
        { type: 'attr', selector: 'p:nth-of-type(2) a', attr: 'href', expected: 'https://www.example.com/spielplan', label: '„Spielplan“ führt zur Verbandsseite' },
        { type: 'attr', selector: 'p:nth-of-type(2) a', attr: 'target', expected: '_blank', label: '„Spielplan“ öffnet in einem neuen Tab' },
        { type: 'text', selector: 'p:nth-of-type(2) a', expected: 'Spielplan', label: 'Der zweite Linktext lautet „Spielplan“' },
      ],
    },
    { konzept: 'html.a-mailto', type: 'bug', text: 'Der Kontakt-Link öffnet kein Mailprogramm. Welche Zeile ist falsch?', lines: ['<h2>Kontakt</h2>', '<p><a href="mail:hallo@festival-beispiel.de">Schreib uns</a></p>', '<p><a href="https://www.example.com" target="_blank">Zur Stadt</a></p>'], line: 1, explanation: 'Der E-Mail-Link beginnt mit `mailto:` – `mail:` kennt der Browser nicht.' },
    { konzept: 'html.liste-verschachtelt', type: 'order', text: 'Sortiere die verschachtelte Liste: eine Aufzählungsliste mit dem Punkt „Hauptbühne“, darin eine nummerierte Liste mit dem ersten Act.', lines: ['<ul>', '  <li>Hauptbühne', '    <ol>', '      <li>Neonpuls</li>', '    </ol>', '  </li>', '</ul>'] },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Links der Sommerfest-Seite: „Zum Line-up“ springt nicht zur Line-up-Überschrift, sondern führt ins Leere, und „Tickets“ ist gar nicht anklickbar. Am Ende springt der erste Link, und der zweite führt zur eigenen Datei `tickets.html`.',
      starter: {
        html: '<h1 id="oben">Sommerfest der Schule</h1>\n<p><a href="lineup">Zum Line-up</a></p>\n<p><a herf="tickets.html">Tickets</a></p>\n<h2 id="lineup">Line-up</h2>\n<p>Schulband, Theater-AG, DJ Pausenhof.</p>\n<p><a href="#oben">Nach oben</a></p>\n',
      },
      solution: {
        html: '<h1 id="oben">Sommerfest der Schule</h1>\n<p><a href="#lineup">Zum Line-up</a></p>\n<p><a href="tickets.html">Tickets</a></p>\n<h2 id="lineup">Line-up</h2>\n<p>Schulband, Theater-AG, DJ Pausenhof.</p>\n<p><a href="#oben">Nach oben</a></p>\n',
      },
      tests: [
        { type: 'attr', selector: 'h1 + p a', attr: 'href', expected: '#lineup', label: '„Zum Line-up“ springt zur Line-up-Überschrift' },
        { type: 'selector', selector: 'p a[href="tickets.html"]', label: '„Tickets“ führt zur Datei tickets.html' },
        { type: 'text', selector: 'a[href="tickets.html"]', expected: 'Tickets', label: 'Der Linktext „Tickets“ bleibt' },
        { type: 'selector', selector: 'h2#lineup', label: 'Die Line-up-Überschrift behält ihre id' },
      ],
    },
    { konzept: 'web.url', type: 'quiz', question: 'In `https://www.example.com/fahrplan.html` – welcher Teil ist der **Pfad**?', options: ['`/fahrplan.html`', '`www.example.com`', '`https://`'], correct: 0, explanation: 'Der Pfad zeigt auf die Datei auf dem Server. `www.example.com` ist die Domain, `https://` das Protokoll.' },
    { konzept: 'html.entity', type: 'fill', text: 'Die Überschrift soll „Laut & Lokal“ anzeigen. Vervollständige das Sonderzeichen.', template: '<h2>Laut ___ Lokal</h2>', accept: ['&amp;'] },
    { konzept: 'html.strong-em', type: 'pair', text: 'Ordne die Textelemente zu.', pairs: [['`<strong>`', 'starke Betonung'], ['`<em>`', 'leichte Betonung'], ['`<br>`', 'Zeilenumbruch'], ['`<hr>`', 'Trennlinie']] },
    { konzept: 'html.ol', type: 'bug', text: 'Die nummerierte Liste zeigt nur zwei Nummern statt drei. Welche Zeile ist falsch?', lines: ['<ol>', '  <li>Stadtbahn bis Hafenstraße</li>', '  <p>Den Lichtern folgen</p>', '  <li>Ticket zeigen</li>', '</ol>'], line: 2, explanation: 'In einer Liste stehen nur Listenpunkte – ein Absatz bekommt keine Nummer.' },
  ],
});
console.log('Kapitel 05 geschrieben');
