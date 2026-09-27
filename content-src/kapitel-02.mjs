// Kapitel 02 – HTML: Erste Schritte (Station „Fundament“).
// Erzeugt public/content/chapters/02-html-erste-schritte/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '02-html-erste-schritte');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};
// Zeilen zu einer Datei zusammensetzen (mit abschließendem Zeilenumbruch)
const z = (...zeilen) => zeilen.join('\n') + '\n';

/* ---------- Grafiken ---------- */

const FIG_TAG = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="28" text-anchor="middle" fill="#eef2ff" font-weight="bold">Ein Element = Tag + Inhalt + Tag</text><rect x="18" y="48" width="284" height="46" rx="8" fill="#1b2135"/><text x="34" y="79" fill="#ff7a45" font-family="monospace" font-size="18">&lt;h1&gt;</text><text x="94" y="79" fill="#eef2ff" font-family="monospace" font-size="18">Steckbrief</text><text x="218" y="79" fill="#ff7a45" font-family="monospace" font-size="18">&lt;/h1&gt;</text><path d="M34 100 V108 H78 V100" stroke="#ff7a45" fill="none"/><text x="56" y="124" text-anchor="middle" fill="#ff7a45">öffnender Tag</text><path d="M94 100 V108 H202 V100" stroke="#38c7ff" fill="none"/><text x="148" y="124" text-anchor="middle" fill="#38c7ff">Inhalt</text><path d="M218 100 V108 H272 V100" stroke="#ff7a45" fill="none"/><text x="245" y="124" text-anchor="middle" fill="#ff7a45">schließender Tag</text><text x="160" y="150" text-anchor="middle" fill="#eef2ff">Der Browser zeigt nur den Inhalt an.</text></svg>`;

const FIG_ATTRIBUT = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="26" text-anchor="middle" fill="#eef2ff" font-weight="bold">Attribut = Name + Wert</text><rect x="24" y="44" width="272" height="46" rx="8" fill="#1b2135"/><text x="40" y="75" fill="#ff7a45" font-family="monospace" font-size="18">&lt;img</text><text x="94" y="75" fill="#38c7ff" font-family="monospace" font-size="18">src</text><text x="127" y="75" fill="#eef2ff" font-family="monospace" font-size="18">=</text><text x="138" y="75" fill="#ffd84d" font-family="monospace" font-size="18">"pizza.svg"</text><text x="258" y="75" fill="#ff7a45" font-family="monospace" font-size="18">&gt;</text><path d="M94 96 V104 H126 V96" stroke="#38c7ff" fill="none"/><text x="110" y="120" text-anchor="middle" fill="#38c7ff">Name</text><path d="M138 96 V104 H257 V96" stroke="#ffd84d" fill="none"/><text x="197" y="120" text-anchor="middle" fill="#ffd84d">Wert</text><text x="160" y="148" text-anchor="middle" fill="#eef2ff">Der Wert steht immer in Anführungszeichen.</text></svg>`;

const FIG_GERUEST = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="20" y="20" fill="#eef2ff" font-family="monospace">&lt;!DOCTYPE html&gt;</text><rect x="14" y="28" width="292" height="124" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="24" y="46" fill="#ff7a45" font-family="monospace">&lt;html lang="de"&gt;</text><rect x="28" y="56" width="128" height="76" rx="6" fill="#0f1320" stroke="#b48cff" stroke-width="2"/><text x="92" y="76" text-anchor="middle" fill="#b48cff" font-weight="bold">&lt;head&gt;</text><text x="92" y="96" text-anchor="middle" fill="#eef2ff">unsichtbar</text><text x="92" y="118" text-anchor="middle" fill="#eef2ff" font-family="monospace">meta · title</text><rect x="164" y="56" width="128" height="76" rx="6" fill="#0f1320" stroke="#4ade80" stroke-width="2"/><text x="228" y="76" text-anchor="middle" fill="#4ade80" font-weight="bold">&lt;body&gt;</text><text x="228" y="96" text-anchor="middle" fill="#eef2ff">sichtbar</text><text x="228" y="118" text-anchor="middle" fill="#eef2ff" font-family="monospace">h1 · p · img</text><text x="24" y="147" fill="#ff7a45" font-family="monospace">&lt;/html&gt;</text></svg>`;

/* ---------- Lektion 1: Was ist HTML? ---------- */
schreibe('lessons/01-was-ist-html.json', {
  id: '01-was-ist-html',
  title: 'Was ist HTML?',
  konzepte: ['html.tag'],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Sams Website ist weg – also bauen wir sie neu, Zeile für Zeile. Die Sprache dafür kennst du schon dem Namen nach: **HTML**, das Gerüst jeder Seite.\n\nHTML ist reiner Text mit **Markierungen**. Jede Markierung heißt **Tag** und steht in spitzen Klammern: `<h1>` sagt dem Browser „Hier beginnt eine Überschrift der Ebene 1“, `</h1>` sagt „Hier endet sie“. Tag, Text und Tag zusammen ergeben ein **Element**.',
      figure: FIG_TAG,
    },
    {
      type: 'example',
      text: 'Links steht HTML, rechts zeichnet der Browser daraus die Seite. `<h1>` ist die Hauptüberschrift, `<p>` ein Absatz (englisch *paragraph*).\n\n**Ändere** den Text zwischen den Tags. Dann **lösche** testweise den schließenden Tag `</h1>` – und beobachte, was mit dem Absatz passiert.',
      html: '<h1>Steckbrief</h1>\n<p>Lena, 17, aus Heilbronn. Spielt Basketball und zeichnet Comics.</p>\n',
    },
    {
      type: 'quiz',
      question: 'Was zeigt der Browser für die Zeile `<p>Bis morgen!</p>` an?',
      options: ['„Bis morgen!“ als Absatz – ohne die Tags', '`<p>Bis morgen!</p>` – genau so, mit Klammern', 'Nichts – der Browser kennt kein p'],
      correct: 0,
      explanation: 'Tags sind Anweisungen an den Browser, kein Text. Er zeigt nur den Inhalt an und richtet ihn nach dem Tag aus – hier als Absatz.',
    },
    {
      type: 'code',
      task: '**Erstelle** über dem Absatz eine Hauptüberschrift mit dem Spielernamen „PixelPirat“. Der Absatz bleibt stehen.',
      starter: { html: '<p>Level 42 · 1.337 Siege · Lieblingsspiel: Kartrennen</p>\n' },
      hints: [
        'Die Hauptüberschrift ist die Überschrift der Ebene 1. Sie bekommt eine eigene Zeile vor dem Absatz.',
        'Ein Element besteht aus öffnendem Tag, Inhalt und schließendem Tag – wie `<p>Hallo</p>`, nur mit dem Tag für die Überschrift.',
        'Muster: `<h1>…</h1>` in der ersten Zeile – zwischen den Tags steht genau der Spielername.',
      ],
      solution: { html: '<h1>PixelPirat</h1>\n<p>Level 42 · 1.337 Siege · Lieblingsspiel: Kartrennen</p>\n' },
      tests: [
        { type: 'text', selector: 'h1', expected: 'PixelPirat', label: 'Die Hauptüberschrift lautet „PixelPirat“' },
        { type: 'order', selectors: ['h1', 'p'], label: 'Die Überschrift steht über dem Absatz' },
        { type: 'text', selector: 'p', expected: 'Level 42 · 1.337 Siege · Lieblingsspiel: Kartrennen', label: 'Der Absatz ist noch da' },
      ],
    },
    {
      type: 'explain',
      text: 'Drei Regeln für Tags:\n\n- Tag-Namen schreibst du **klein**: `<p>`, nicht `<P>`.\n- Der schließende Tag hat einen **Schrägstrich**: `</p>`.\n- Fast jedes Element braucht beide Tags – sonst weiß der Browser nicht, wo es endet.\n\nAusnahme: **Leerelemente** haben keinen Inhalt und keinen schließenden Tag. `<br>` erzwingt einen Zeilenumbruch mitten im Text:\n\n```html\n<p>Training: Dienstag<br>Spiel: Samstag</p>\n```',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Anfang der Clan-Seite: erst der Tag-Name der Hauptüberschrift, dann der komplette schließende Tag des Absatzes.',
      template: '<___>Clan Nachtfalken</h1>\n<p>Wir suchen neue Mitglieder.___',
      accept: [['h1'], ['</p>']],
      hint: 'Lücke 1: nur der Name, ohne Klammern. Lücke 2: mit spitzen Klammern und Schrägstrich.',
    },
    {
      type: 'code',
      task: '**Ergänze** unter dem ersten Absatz einen zweiten Absatz mit dem Text „Öffnungszeiten: Montag bis Samstag, 10 bis 19 Uhr.“ Nach dem Doppelpunkt soll der Text in einer neuen Zeile weitergehen.',
      starter: { html: '<h1>Kick Lab</h1>\n<p>Neu im Store: der Retro-Runner in Weiß.</p>\n' },
      hints: [
        'Ein zweiter Absatz ist dasselbe Element wie der erste – in einer eigenen Zeile darunter.',
        'Für die neue Zeile mitten im Text gibt es das Leerelement für Zeilenumbrüche. Es hat keinen schließenden Tag.',
        'Muster: `<p>Erster Teil<br>zweiter Teil</p>` – mit dem Text aus der Aufgabe.',
      ],
      solution: { html: '<h1>Kick Lab</h1>\n<p>Neu im Store: der Retro-Runner in Weiß.</p>\n<p>Öffnungszeiten:<br>Montag bis Samstag, 10 bis 19 Uhr.</p>\n' },
      tests: [
        { type: 'selector', selector: 'p', count: 2, label: 'Es gibt zwei Absätze' },
        { type: 'text', selector: 'p:nth-of-type(2)', expected: 'Öffnungszeiten: Montag bis Samstag, 10 bis 19 Uhr.', label: 'Der zweite Absatz nennt die Öffnungszeiten' },
        { type: 'selector', selector: 'p br', min: 1, label: 'Nach dem Doppelpunkt beginnt eine neue Zeile' },
        { type: 'text', selector: 'h1', expected: 'Kick Lab', label: 'Die Überschrift ist noch da' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Bausteine zu.',
      pairs: [
        ['`<p>`', 'öffnender Tag – hier beginnt ein Absatz'],
        ['`</p>`', 'schließender Tag – hier endet der Absatz'],
        ['Bis morgen!', 'Inhalt – das, was der Browser anzeigt'],
        ['`<br>`', 'Leerelement – Zeilenumbruch ohne schließenden Tag'],
        ['Element', 'öffnender Tag + Inhalt + schließender Tag'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** zwei Fehler auf der Clan-Seite: Der komplette Text ist riesig, obwohl nur der Clan-Name eine Überschrift sein soll – und der zweite Absatz fehlt in der Vorschau.',
      starter: { html: '<h1>Clan Nachtfalken<h1>\n<p>Wir zocken seit 2023 zusammen – Ranked, Turniere und Spaß.</p>\n<p Wir suchen zwei neue Spielerinnen oder Spieler.</p>\n' },
      hints: [
        'Riesiger Text: Vergleiche den öffnenden und den schließenden Tag der Überschrift Zeichen für Zeichen – was fehlt dem zweiten?',
        'Fehlender Absatz: Jeder öffnende Tag endet mit einer spitzen Klammer. Lies die Zeile des zweiten Absatzes ganz genau.',
        'Muster für einen Absatz: `<p>Text</p>` – der schließende Tag hat den Schrägstrich direkt nach der ersten Klammer.',
      ],
      solution: { html: '<h1>Clan Nachtfalken</h1>\n<p>Wir zocken seit 2023 zusammen – Ranked, Turniere und Spaß.</p>\n<p>Wir suchen zwei neue Spielerinnen oder Spieler.</p>\n' },
      tests: [
        { type: 'selector', selector: 'h1', count: 1, label: 'Es gibt genau eine Überschrift' },
        { type: 'selector', selector: 'h1 p', count: 0, label: 'Die Absätze stecken nicht mehr in der Überschrift' },
        { type: 'text', selector: 'h1', expected: 'Clan Nachtfalken', label: 'Die Überschrift lautet „Clan Nachtfalken“' },
        { type: 'text', selector: 'p:nth-of-type(2)', expected: 'Wir suchen zwei neue Spielerinnen oder Spieler.', label: 'Der zweite Absatz ist wieder sichtbar' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website! Die Startseite `index.html` ist noch fast leer. Ihre erste Zeile ist ein **Kommentar**: Er steht zwischen `<!--` und `-->`, ist eine Notiz für Entwickler:innen und wird vom Browser nicht angezeigt. Lass ihn stehen.\n\nDarunter kommt jetzt das Wichtigste der Seite: die Hauptüberschrift mit dem Namen des Festivals. Alles Weitere folgt Lektion für Lektion.',
    },
    { type: 'code', etappe: '02-html-erste-schritte/01-was-ist-html' },
  ],
});

/* ---------- Lektion 2: Tags und Attribute ---------- */
schreibe('lessons/02-tags-und-attribute.json', {
  id: '02-tags-und-attribute',
  title: 'Tags und Attribute',
  konzepte: ['html.attribut', 'html.verschachtelung'],
  steps: [
    {
      type: 'explain',
      text: 'Sam will ein Bild der Foodtrucks auf der Seite. Dafür gibt es das Tag `<img>` – aber `<img>` allein weiß nicht, *welches* Bild.\n\nDiese Zusatzinfo liefert ein **Attribut**. Es steht im öffnenden Tag, nach dem Tag-Namen, immer in der Form `name="wert"`:\n\n```html\n<img src="foodtruck.svg" alt="Foodtruck mit Warteschlange">\n```\n\n`src` nennt die Bilddatei, `alt` einen **Ersatztext**, falls das Bild nicht lädt. `<img>` ist ein Leerelement – kein schließender Tag.',
      figure: FIG_ATTRIBUT,
    },
    {
      type: 'example',
      text: '**Ändere** `pizza.svg` in `katze.svg` und beobachte das Bild. Baue dann einen Tippfehler in den Dateinamen ein (`pizzza.svg`) – was zeigt der Browser stattdessen?',
      html: '<h1>Pizza-Ecke</h1>\n<p>Heute: Margherita, Funghi und Salami.</p>\n<img src="pizza.svg" alt="Eine Pizza mit Salami">\n',
    },
    {
      type: 'quiz',
      question: 'In `<img src="katze.svg" alt="Katze">` – was ist `katze.svg`?',
      options: ['Der Wert des Attributs src', 'Der Name eines Attributs', 'Der Inhalt des Elements img'],
      correct: 0,
      explanation: 'Ein Attribut hat Name und Wert: `src` ist der Name, `katze.svg` der Wert. Einen Inhalt hat `<img>` nicht – es ist ein Leerelement.',
    },
    {
      type: 'code',
      task: '**Ergänze** unter dem Absatz ein Bild: Es zeigt die Datei `sneaker.svg` und trägt den Ersatztext „Retro-Runner in Weiß“.',
      starter: { html: '<h1>Kick Lab</h1>\n<p>Neu im Store: der Retro-Runner in Weiß.</p>\n' },
      hints: [
        'Bilder holst du mit dem Leerelement img in die Seite. Es braucht zwei Attribute: eines für die Datei, eines für den Ersatztext.',
        'Muster mit einem anderen Bild: `<img src="katze.svg" alt="Eine Katze">` – die Werte stehen in Anführungszeichen.',
        'Tausche Dateiname und Ersatztext gegen die Angaben aus der Aufgabe – in einer eigenen Zeile unter dem Absatz.',
      ],
      solution: { html: '<h1>Kick Lab</h1>\n<p>Neu im Store: der Retro-Runner in Weiß.</p>\n<img src="sneaker.svg" alt="Retro-Runner in Weiß">\n' },
      tests: [
        { type: 'selector', selector: 'img', count: 1, label: 'Es gibt genau ein Bild' },
        { type: 'attr', selector: 'img', attr: 'src', expected: 'sneaker.svg', label: 'Das Bild zeigt die Datei sneaker.svg' },
        { type: 'attr', selector: 'img', attr: 'alt', expected: 'Retro-Runner in Weiß', label: 'Der Ersatztext lautet „Retro-Runner in Weiß“' },
        { type: 'order', selectors: ['p', 'img'], label: 'Das Bild steht unter dem Absatz' },
      ],
    },
    {
      type: 'explain',
      text: 'Attribute gibt es auch bei Elementen mit Inhalt. Ein **Link** entsteht mit `<a>`; sein Attribut `href` sagt, wohin er führt – zu einer anderen Datei oder zu einer kompletten URL:\n\n```html\n<a href="regeln.html">Unsere Clan-Regeln</a>\n<a href="https://sneaker-lager.de">Zum Sneaker-Lager</a>\n```\n\nDer Inhalt zwischen den Tags ist der klickbare Text. Ohne `href` wäre `<a>` nur normaler Text – der Browser wüsste ja nicht, wohin.',
    },
    {
      type: 'fill',
      text: 'Vervollständige die beiden Attribute: das Ziel des Links und den Ersatztext des Bildes.',
      template: '<a ___="tickets.html">Tickets kaufen</a>\n<img src="ticket.svg" ___="Ein Festivalticket">',
      accept: [['href'], ['alt']],
      hint: 'Lücke 1: das Attribut, das dem Link sein Ziel gibt. Lücke 2: das Attribut für den Ersatztext, falls das Bild nicht lädt.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz einen Link mit dem Text „Zur Anmeldung“, der zur Datei anmeldung.html führt.',
      starter: { html: '<h1>Clan Nachtfalken</h1>\n<p>Nächstes Turnier: Samstag, 20 Uhr – jetzt anmelden!</p>\n' },
      hints: [
        'Ein Link ist ein a-Element mit Inhalt. Das Ziel steht als Attribut im öffnenden Tag.',
        'Muster aus einem anderen Zusammenhang: `<a href="speisekarte.html">Zur Speisekarte</a>`.',
        'Setze als Ziel den Dateinamen aus der Aufgabe ein und als Inhalt den Linktext – in einer eigenen Zeile unter dem Absatz.',
      ],
      solution: { html: '<h1>Clan Nachtfalken</h1>\n<p>Nächstes Turnier: Samstag, 20 Uhr – jetzt anmelden!</p>\n<a href="anmeldung.html">Zur Anmeldung</a>\n' },
      tests: [
        { type: 'text', selector: 'a', expected: 'Zur Anmeldung', label: 'Der Link heißt „Zur Anmeldung“' },
        { type: 'attr', selector: 'a', attr: 'href', expected: 'anmeldung.html', label: 'Der Link führt zu anmeldung.html' },
        { type: 'order', selectors: ['p', 'a'], label: 'Der Link steht unter dem Absatz' },
      ],
    },
    {
      type: 'explain',
      text: 'Elemente können **ineinander** stecken – das heißt **Verschachtelung**. Ein Link mitten im Absatz:\n\n```html\n<p>Alle Termine stehen im <a href="plan.html">Trainingsplan</a>.</p>\n```\n\nDie Regel: **Was zuletzt geöffnet wurde, wird zuerst geschlossen.** Der Link geht innerhalb des Absatzes auf und dort auch wieder zu. Falsch wäre `<p><a>…</p></a>` – die Tags überkreuzen sich wie verhakte Kopfhörerkabel.',
    },
    {
      type: 'order',
      text: 'Bring die Zeilen in die richtige Reihenfolge – der Link steckt im Absatz.',
      lines: ['<p>', '  Lies vor dem Beitritt', '  <a href="regeln.html">unsere Regeln</a>', '  – dann geht es los.', '</p>'],
      explanation: 'Der Absatz geht zuerst auf und zuletzt zu – der Link liegt komplett dazwischen.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** zwei Fehler auf der Clan-Seite: Statt des Controller-Bildes erscheint nur der Ersatztext, und der letzte Absatz ist plötzlich komplett ein Link – obwohl nur „Turnierplan“ verlinkt sein soll.',
      starter: { html: '<h1>Clan Nachtfalken</h1>\n<img scr="controller.svg" alt="Ein Controller">\n<p>Wir treten jeden Samstag in der Liga an.</p>\n<p>Alle Termine findest du im <a href="turniere.html">Turnierplan.</p>\n<p>Neue Mitglieder sind jederzeit willkommen!</p>\n' },
      hints: [
        'Fehlendes Bild: Vergleiche den Namen des ersten Attributs im img-Tag Buchstabe für Buchstabe mit dem, was du gelernt hast.',
        'Endloser Link: Der Link hat einen öffnenden Tag – wo ist sein schließender? Ohne ihn läuft der Link einfach weiter.',
        'Muster: `<img src="…" alt="…">` und `<p>Text <a href="…">Linktext</a> Text</p>` – zuletzt geöffnet, zuerst geschlossen.',
      ],
      solution: { html: '<h1>Clan Nachtfalken</h1>\n<img src="controller.svg" alt="Ein Controller">\n<p>Wir treten jeden Samstag in der Liga an.</p>\n<p>Alle Termine findest du im <a href="turniere.html">Turnierplan</a>.</p>\n<p>Neue Mitglieder sind jederzeit willkommen!</p>\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'controller.svg', label: 'Das Controller-Bild wird geladen' },
        { type: 'selector', selector: 'a', count: 1, label: 'Es gibt genau einen Link' },
        { type: 'text', selector: 'a', expected: ['Turnierplan', 'Turnierplan.'], label: 'Verlinkt ist nur „Turnierplan“' },
        { type: 'selector', selector: 'a p', count: 0, label: 'Der letzte Absatz ist kein Link mehr' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: '„In der Überschrift steht jetzt FUNKEN – aber niemand weiß, was das ist! Schreibt einen Satz darunter: Schülerfestival, zwei Bühnen, Foodtrucks, Open Air am Neckar.“\n\nDas erledigst du mit einem Absatz direkt unter der Hauptüberschrift. Der Text muss **genau** stimmen, inklusive Gedankenstrich und Punkt – kopiere ihn am besten aus der Aufgabe.',
    },
    { type: 'code', etappe: '02-html-erste-schritte/02-tags-und-attribute' },
  ],
});

/* ---------- Lektion 3: Das Grundgerüst ---------- */
const GERUEST_STECKBRIEF = z(
  '<!DOCTYPE html>',
  '<html lang="de">',
  '  <head>',
  '    <meta charset="utf-8">',
  '    <title>Steckbrief von Deniz</title>',
  '  </head>',
  '  <body>',
  '    <h1>Deniz</h1>',
  '    <p>17 Jahre, Heilbronn. Fußball, Sneaker und viel zu viele Serien.</p>',
  '  </body>',
  '</html>'
);

schreibe('lessons/03-grundgeruest.json', {
  id: '03-grundgeruest',
  title: 'Das Grundgerüst',
  konzepte: ['html.grundgeruest'],
  steps: [
    {
      type: 'explain',
      text: 'Bis jetzt hast du **Schnipsel** geschrieben – die Werkbank hat sie heimlich in eine komplette Seite gesteckt. Eine echte Datei wie `index.html` braucht das selbst: das **Grundgerüst**, den festen Rahmen, den jeder Browser erwartet.\n\n```html\n<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Steckbrief</title>\n  </head>\n  <body>\n    <h1>Deniz</h1>\n  </body>\n</html>\n```\n\nSieht nach viel aus, ist aber immer gleich. Wir gehen es Zeile für Zeile durch.',
      figure: FIG_GERUEST,
    },
    {
      type: 'example',
      text: '**Ändere** den Text im `title` – in der Vorschau passiert nichts, denn der Titel gehört zum Browser-Tab, nicht zur Seite. **Ändere** dann die Überschrift im `body` – das siehst du sofort.',
      html: GERUEST_STECKBRIEF,
    },
    {
      type: 'explain',
      text: '**Zeile 1:** `<!DOCTYPE html>` ist der **Dokumenttyp**. Er sagt dem Browser „Das ist modernes HTML“ – kein Tag, kein Inhalt, kein schließendes Gegenstück, immer die allererste Zeile.\n\n**Zeile 2:** `<html lang="de">` ist das **Wurzelelement**. Alles andere steckt darin; ganz unten schließt `</html>` es. Das Attribut `lang` nennt die Sprache der Seite – Vorlese-Programme und Übersetzer richten sich danach. `de` steht für Deutsch.',
    },
    {
      type: 'quiz',
      question: 'Eine Seite ist auf Deutsch geschrieben, im Code steht aber `lang="en"`. Was passiert?',
      options: ['Browser und Vorlese-Programme halten die Seite für Englisch', 'Der Browser übersetzt die Seite automatisch ins Englische', 'Die Seite wird gar nicht angezeigt'],
      correct: 0,
      explanation: 'Der Browser prüft die Angabe nicht, er glaubt sie: Vorlese-Programme lesen dann mit englischer Aussprache, und der Browser bietet eine Übersetzung „aus dem Englischen“ an.',
    },
    {
      type: 'explain',
      text: '**Zeilen 3–6: der Kopf.** Zwischen `<head>` und `</head>` stehen Infos *über* die Seite – nichts davon ist auf der Seite sichtbar.\n\n- `<meta charset="utf-8">` legt den **Zeichensatz** fest. Ohne ihn werden ä, ö, ü oder € zu Zeichensalat. Ein Leerelement mit einem Attribut.\n- `<title>Steckbrief</title>` ist der **Titel**: Er erscheint im Browser-Tab, in Lesezeichen und als Überschrift in Suchergebnissen.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Kopfbereich der Sneaker-Store-Seite.',
      template: '<head>\n  <meta ___="utf-8">\n  <___>Kick Lab – Sneaker in Heilbronn</title>\n</head>',
      accept: [['charset'], ['title']],
      hint: 'Lücke 1: das Attribut für den Zeichensatz. Lücke 2: der Tag-Name des Seitentitels – schau auf den schließenden Tag.',
    },
    {
      type: 'code',
      task: '**Vervollständige** den Kopfbereich der Seite um die Zeichensatz-Angabe UTF-8 und den Titel „Kick Lab – Sneaker in Heilbronn“.',
      starter: {
        html: z('<!DOCTYPE html>', '<html lang="de">', '  <head>', '', '  </head>', '  <body>', '    <h1>Kick Lab</h1>', '    <p>Sneaker, Caps und mehr – mitten in Heilbronn.</p>', '  </body>', '</html>'),
      },
      hints: [
        'Zwei Zeilen fehlen zwischen `<head>` und `</head>`: das Leerelement für den Zeichensatz und das Element für den Titel.',
        'Die Zeichensatz-Zeile ist auf jeder Seite gleich – schau sie im Grundgerüst der Erklärung nach. Der Titel folgt dem Muster `<title>Clan Nachtfalken</title>`.',
        'Reihenfolge im head: erst der Zeichensatz, dann der Titel – beide eingerückt.',
      ],
      solution: {
        html: z('<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <meta charset="utf-8">', '    <title>Kick Lab – Sneaker in Heilbronn</title>', '  </head>', '  <body>', '    <h1>Kick Lab</h1>', '    <p>Sneaker, Caps und mehr – mitten in Heilbronn.</p>', '  </body>', '</html>'),
      },
      tests: [
        { type: 'source', file: 'html', matches: '<meta[^>]+charset\\s*=\\s*["\']?utf-8', label: 'Der Zeichensatz UTF-8 ist angegeben' },
        { type: 'text', selector: 'title', expected: 'Kick Lab – Sneaker in Heilbronn', label: 'Der Titel lautet „Kick Lab – Sneaker in Heilbronn“' },
        { type: 'selector', selector: 'head title', count: 1, label: 'Der Titel steht im Kopfbereich' },
        { type: 'selector', selector: 'body h1', count: 1, label: 'Die Überschrift ist noch da' },
      ],
    },
    {
      type: 'explain',
      text: '**Zeilen 7–9: der Körper.** Alles zwischen `<body>` und `</body>` wird angezeigt – Überschriften, Absätze, Bilder, Links. Deine bisherigen Schnipsel gehören genau hierhin.\n\nDie **Einrückung** (zwei Leerzeichen pro Ebene) ist nur für Menschen: Sie zeigt, was in was steckt. Dem Browser ist sie egal – die Reihenfolge nicht: erst `head`, dann `body`, beides im `html`.',
    },
    {
      type: 'order',
      text: 'Bring das Grundgerüst der Clan-Seite in die richtige Reihenfolge.',
      lines: ['<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <title>Clan Nachtfalken</title>', '  </head>', '  <body>', '  </body>', '</html>'],
      explanation: 'Dokumenttyp zuerst, dann umschließt html alles: erst der head mit dem Titel, dann der body.',
    },
    {
      type: 'code',
      task: '**Erstelle** aus dem Schnipsel eine vollständige Seite: Dokumenttyp, Wurzelelement mit der Sprache Deutsch, Kopfbereich mit Zeichensatz UTF-8 und dem Titel „Clan Nachtfalken“, Körper mit Überschrift und Absatz.',
      starter: { html: '<h1>Clan Nachtfalken</h1>\n<p>Wir zocken seit 2023 zusammen – Ranked, Turniere und Spaß.</p>\n' },
      hints: [
        'Nimm das Grundgerüst aus der Erklärung – die beiden vorhandenen Zeilen wandern in den body.',
        'Reihenfolge: Dokumenttyp, html mit lang, darin head (Zeichensatz, Titel) und body (Überschrift, Absatz).',
        'Muster: `<html lang="…">`, `<meta charset="…">`, `<title>…</title>` – Werte und Text aus der Aufgabe einsetzen.',
      ],
      solution: {
        html: z('<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <meta charset="utf-8">', '    <title>Clan Nachtfalken</title>', '  </head>', '  <body>', '    <h1>Clan Nachtfalken</h1>', '    <p>Wir zocken seit 2023 zusammen – Ranked, Turniere und Spaß.</p>', '  </body>', '</html>'),
      },
      tests: [
        { type: 'source', file: 'html', matches: '^\\s*<!doctype html>', label: 'Die Datei beginnt mit dem Dokumenttyp' },
        { type: 'source', file: 'html', matches: '<html[^>]+lang\\s*=\\s*["\']?de', label: 'Die Sprache ist Deutsch (lang)' },
        { type: 'source', file: 'html', matches: '<meta[^>]+charset\\s*=\\s*["\']?utf-8', label: 'Der Zeichensatz UTF-8 ist angegeben' },
        { type: 'text', selector: 'title', expected: 'Clan Nachtfalken', label: 'Der Titel lautet „Clan Nachtfalken“' },
        { type: 'selector', selector: 'head title', count: 1, label: 'Der Titel steht im Kopfbereich' },
        { type: 'selector', selector: 'body h1', count: 1, label: 'Die Überschrift steht im Körper' },
      ],
    },
    {
      type: 'pair',
      text: 'Wohin gehört was? Ordne zu.',
      pairs: [
        ['`<!DOCTYPE html>`', 'ganz oben – vor allem anderen'],
        ['`<meta charset="utf-8">`', 'in den head – legt den Zeichensatz fest'],
        ['`<title>`', 'in den head – Text für den Browser-Tab'],
        ['`<h1>`', 'in den body – sichtbare Überschrift'],
        ['`lang="de"`', 'Attribut am html-Tag – Sprache der Seite'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** zwei Fehler: Die Vorschau der Sneaker-Seite ist komplett leer, und auf dem Handy fragt der Browser „Diese Seite aus dem Englischen übersetzen?“ – obwohl alles auf Deutsch ist.',
      starter: {
        html: z('<!DOCTYPE html>', '<html lang="en">', '  <head>', '    <meta charset="utf-8">', '    <title>Kick Lab – Sneaker in Heilbronn<title>', '  </head>', '  <body>', '    <h1>Kick Lab</h1>', '    <p>Retro-Runner, Caps und Socken – mitten in Heilbronn.</p>', '  </body>', '</html>'),
      },
      hints: [
        'Leere Seite: Ein Element im head wird nie geschlossen und schluckt den ganzen Rest. Vergleiche dort öffnende und schließende Tags.',
        'Übersetzungsfrage: Der Browser glaubt dem lang-Attribut. Welchen Wert hat es – und welchen sollte es für Deutsch haben?',
        'Muster: `<title>…</title>` mit Schrägstrich im schließenden Tag; die Sprache Deutsch hat den Wert de.',
      ],
      solution: {
        html: z('<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <meta charset="utf-8">', '    <title>Kick Lab – Sneaker in Heilbronn</title>', '  </head>', '  <body>', '    <h1>Kick Lab</h1>', '    <p>Retro-Runner, Caps und Socken – mitten in Heilbronn.</p>', '  </body>', '</html>'),
      },
      tests: [
        { type: 'attr', selector: 'html', attr: 'lang', expected: 'de', label: 'Die Seite ist als Deutsch gekennzeichnet' },
        { type: 'text', selector: 'title', expected: 'Kick Lab – Sneaker in Heilbronn', label: 'Der Titel lautet „Kick Lab – Sneaker in Heilbronn“' },
        { type: 'selector', selector: 'body h1', count: 1, label: 'Die Überschrift ist wieder sichtbar' },
        { type: 'text', selector: 'p', expected: 'Retro-Runner, Caps und Socken – mitten in Heilbronn.', label: 'Der Absatz ist wieder sichtbar' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website! Aus dem Schnipsel wird eine echte Datei: `index.html` bekommt das komplette Grundgerüst, und Kommentar, Überschrift und Absatz wandern in den Körper.\n\nWichtig für Sam: Titel „FUNKEN – Das Schülerfestival“ (so heißt der Tab), Sprache Deutsch und Zeichensatz UTF-8 – damit „Schülerfestival“ auf jedem Handy mit ü erscheint.',
    },
    { type: 'code', etappe: '02-html-erste-schritte/03-grundgeruest' },
  ],
});

/* ---------- Lektion 4: Wiederholung ---------- */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung: Fundament',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      text: 'Kurzer Rückblick, bevor die Startseite weiterwächst: Client und Server, der Aufbau einer URL – und alles aus diesem Kapitel: Tags, Attribute, Verschachtelung, Grundgerüst. Acht Aufgaben, dann geht es zurück zur FUNKEN-Website.',
    },
    {
      type: 'quiz',
      question: 'Du öffnest die Seite des Sneaker-Stores auf dem Handy. Wer schickt die HTML-Datei?',
      options: ['Der Server des Stores – als Antwort auf die Anfrage des Browsers', 'Das Handy – die Seite ist darauf gespeichert', 'Das DNS – es hat alle Seiten gespeichert'],
      correct: 0,
      explanation: 'Client fragt, Server antwortet: Der Browser auf dem Handy schickt die Anfrage, der Server liefert die Datei. Das DNS kennt nur die IP-Adresse zur Domain.',
    },
    {
      type: 'fill',
      text: 'Vervollständige das Bild-Element des Steckbriefs.',
      template: '<___ src="katze.svg" ___="Meine Katze Mochi">',
      accept: [['img'], ['alt']],
      hint: 'Lücke 1: der Tag-Name für Bilder. Lücke 2: das Attribut mit dem Ersatztext.',
    },
    {
      type: 'pair',
      text: 'Ordne die Teile von `https://kick-lab.de/neu/retro-runner.html` zu.',
      pairs: [
        ['`https://`', 'Protokoll – verschlüsselte Übertragung'],
        ['`kick-lab.de`', 'Domain – Name des Servers'],
        ['`/neu/retro-runner.html`', 'Pfad – Ordner und Datei auf dem Server'],
      ],
    },
    {
      type: 'code',
      task: '**Erstelle** den Steckbrief: eine Hauptüberschrift „Mochi“, darunter ein Absatz „Katze, 3 Jahre, schläft am liebsten auf der Tastatur.“ und darunter ein Bild der Datei katze.svg mit dem Ersatztext „Mochi auf der Tastatur“.',
      starter: { html: '<!-- Steckbrief von Mochi -->\n' },
      hints: [
        'Drei Elemente in dieser Reihenfolge: Überschrift, Absatz, Bild – jedes in einer eigenen Zeile unter dem Kommentar.',
        'Überschrift und Absatz haben öffnenden und schließenden Tag; das Bild ist ein Leerelement mit zwei Attributen.',
        'Muster: `<h1>…</h1>`, `<p>…</p>`, `<img src="…" alt="…">` – Texte und Dateiname aus der Aufgabe.',
      ],
      solution: { html: '<!-- Steckbrief von Mochi -->\n<h1>Mochi</h1>\n<p>Katze, 3 Jahre, schläft am liebsten auf der Tastatur.</p>\n<img src="katze.svg" alt="Mochi auf der Tastatur">\n' },
      tests: [
        { type: 'text', selector: 'h1', expected: 'Mochi', label: 'Die Überschrift lautet „Mochi“' },
        { type: 'text', selector: 'p', expected: 'Katze, 3 Jahre, schläft am liebsten auf der Tastatur.', label: 'Der Absatz hat den richtigen Text' },
        { type: 'attr', selector: 'img', attr: 'src', expected: 'katze.svg', label: 'Das Bild zeigt katze.svg' },
        { type: 'attr', selector: 'img', attr: 'alt', expected: 'Mochi auf der Tastatur', label: 'Der Ersatztext lautet „Mochi auf der Tastatur“' },
        { type: 'order', selectors: ['h1', 'p', 'img'], label: 'Reihenfolge: Überschrift, Absatz, Bild' },
      ],
    },
    {
      type: 'quiz',
      question: 'Welche Zeile ist richtig verschachtelt?',
      options: ['`<p>Alle Termine im <a href="plan.html">Turnierplan</a>.</p>`', '`<p>Alle Termine im <a href="plan.html">Turnierplan</p></a>`', '`<a href="plan.html"><p>Alle Termine im Turnierplan</a></p>`'],
      correct: 0,
      explanation: 'Zuletzt geöffnet, zuerst geschlossen: Der Link wird im Absatz geöffnet und muss dort auch wieder zugehen – erst `</a>`, dann `</p>`.',
    },
    {
      type: 'order',
      text: 'Bring das Grundgerüst der Steckbrief-Seite in die richtige Reihenfolge.',
      lines: ['<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <meta charset="utf-8">', '  </head>', '  <body>', '  </body>', '</html>'],
      explanation: 'Dokumenttyp, dann html – darin erst der head (mit dem Zeichensatz), dann der body.',
    },
    {
      type: 'fill',
      text: 'Vervollständige die ersten beiden Zeilen einer deutschen Seite.',
      template: '<!___ html>\n<html ___="de">',
      accept: [['DOCTYPE'], ['lang']],
      hint: 'Lücke 1: das Wort für den Dokumenttyp. Lücke 2: das Attribut für die Sprache.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** zwei Fehler auf der Sneaker-Seite: Der gesamte Text ist so groß wie die Überschrift, und statt des Sneaker-Bildes erscheint nur der Ersatztext.',
      starter: {
        html: z('<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <meta charset="utf-8">', '    <title>Kick Lab – Sneaker in Heilbronn</title>', '  </head>', '  <body>', '    <h1>Kick Lab<h1>', '    <p>Neu im Store: der Retro-Runner in Weiß.</p>', '    <img src=sneaker.svg" alt="Retro-Runner in Weiß">', '    <p>Öffnungszeiten: Montag bis Samstag, 10 bis 19 Uhr.</p>', '  </body>', '</html>'),
      },
      hints: [
        'Riesiger Text: Der schließende Tag der Überschrift ist gar keiner – ihm fehlt ein Zeichen.',
        'Fehlendes Bild: Zähle die Anführungszeichen im img-Tag. Jeder Wert braucht eines vorne und eines hinten.',
        'Muster: `<h1>…</h1>` und `<img src="…" alt="…">`.',
      ],
      solution: {
        html: z('<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <meta charset="utf-8">', '    <title>Kick Lab – Sneaker in Heilbronn</title>', '  </head>', '  <body>', '    <h1>Kick Lab</h1>', '    <p>Neu im Store: der Retro-Runner in Weiß.</p>', '    <img src="sneaker.svg" alt="Retro-Runner in Weiß">', '    <p>Öffnungszeiten: Montag bis Samstag, 10 bis 19 Uhr.</p>', '  </body>', '</html>'),
      },
      tests: [
        { type: 'selector', selector: 'h1', count: 1, label: 'Es gibt genau eine Überschrift' },
        { type: 'selector', selector: 'h1 p', count: 0, label: 'Die Absätze stecken nicht mehr in der Überschrift' },
        { type: 'attr', selector: 'img', attr: 'src', expected: 'sneaker.svg', label: 'Das Sneaker-Bild wird geladen' },
        { type: 'text', selector: 'title', expected: 'Kick Lab – Sneaker in Heilbronn', label: 'Der Titel ist unverändert' },
      ],
    },
    {
      type: 'explain',
      text: 'Zurück zur Startseite: Sam will den Termin sichtbar haben – Freitag, 17. und Samstag, 18. Juli 2027 auf dem alten Fabrikgelände am Neckar. Das wird ein zweiter Absatz direkt unter dem ersten, innerhalb des Körpers. Denk an den schließenden Tag – und daran, dass der Text genau stimmen muss.',
    },
    { type: 'code', etappe: '02-html-erste-schritte/04-wiederholung' },
  ],
});

/* ---------- Lektion 5: Projekt – Startseite steht ---------- */
schreibe('lessons/05-projekt-startseite.json', {
  id: '05-projekt-startseite',
  title: 'Projekt: Startseite steht',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: '„Ich hab die Seite auf dem Handy aufgemacht – da steht FUNKEN, da steht der Termin. Ihr seid gut! Jetzt noch die Uhrzeiten, dann kann ich den Link rumschicken.“\n\n**Meilenstein:** Du kennst Tags, Attribute, Verschachtelung und das Grundgerüst – und `index.html` ist eine echte, vollständige Seite. Bevor der letzte Absatz dazukommt, zwei Kontrollfragen.',
    },
    {
      type: 'quiz',
      question: 'Welche Zeile fehlt in diesem Grundgerüst?\n\n```html\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>FUNKEN</title>\n  </head>\n  <body></body>\n</html>\n```',
      options: ['Der Dokumenttyp in der ersten Zeile', 'Ein schließender Tag für meta', 'Ein zweites head-Element für den body'],
      correct: 0,
      explanation: '`<!DOCTYPE html>` gehört immer ganz nach oben. `<meta>` ist ein Leerelement ohne schließenden Tag, und head gibt es genau einmal.',
    },
    {
      type: 'order',
      text: 'Bring den Inhalt des body der Startseite in die richtige Reihenfolge.',
      lines: [
        '<body>',
        '  <!-- Startseite von FUNKEN -->',
        '  <h1>FUNKEN</h1>',
        '  <p>Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.</p>',
        '  <p>Freitag, 17. und Samstag, 18. Juli 2027 auf dem alten Fabrikgelände am Neckar.</p>',
        '</body>',
      ],
      explanation: 'Kommentar, Hauptüberschrift, dann die Absätze in Lesereihenfolge – alles zwischen den body-Tags.',
    },
    {
      type: 'explain',
      text: 'Jetzt der letzte Absatz für diesen Meilenstein: Einlass und Ende, direkt unter dem Termin. Damit ist die Startseite vorzeigbar: Grundgerüst, Titel, Überschrift, drei Absätze.\n\nDanach lohnt sich ein Blick aufs Ganze: [FUNKEN-Website ansehen](#/projekt) – dort siehst du die Seite so, wie Sam sie sieht. Im nächsten Kapitel bekommt der Text mehr Struktur: Zwischenüberschriften, Hervorhebungen, Linien.',
    },
    { type: 'code', etappe: '02-html-erste-schritte/05-projekt-startseite' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '02-html-erste-schritte',
  fragen: [
    // html.tag
    { id: '02-01', konzept: 'html.tag', type: 'quiz', question: 'Was ist bei `<p>Bis morgen!</p>` der Inhalt des Elements?', options: ['Bis morgen!', '`<p>`', '`</p>`'], correct: 0, explanation: 'Der Inhalt steht zwischen öffnendem und schließendem Tag – nur ihn zeigt der Browser an.' },
    { id: '02-02', konzept: 'html.tag', type: 'fill', text: 'Vervollständige das Element mit dem schließenden Tag.', template: '<h1>Turnierplan___', accept: ['</h1>'], hint: 'Spitze Klammer, Schrägstrich, Tag-Name, spitze Klammer.' },
    { id: '02-03', konzept: 'html.tag', type: 'bug', text: 'Eine Zeile hat einen Fehler im Tag. Welche?', lines: ['<h1>Steckbrief</h1>', '<p>Name: Lena<p>', '<p>Alter: 17</p>', '<p>Stadt: Heilbronn</p>'], line: 1, explanation: 'Dem schließenden Tag fehlt der Schrägstrich: `</p>`.' },
    { id: '02-04', konzept: 'html.tag', type: 'pair', text: 'Ordne zu.', pairs: [['`<h1>`', 'öffnender Tag'], ['`</h1>`', 'schließender Tag'], ['`<br>`', 'Leerelement ohne schließenden Tag'], ['Element', 'öffnender Tag + Inhalt + schließender Tag']] },
    { id: '02-05', konzept: 'html.tag', type: 'quiz', question: 'Welches Element hat keinen schließenden Tag?', options: ['`<br>`', '`<p>`', '`<h1>`'], correct: 0, explanation: '`<br>` ist ein Leerelement: kein Inhalt, kein schließender Tag.' },
    // html.attribut
    { id: '02-06', konzept: 'html.attribut', type: 'quiz', question: 'In `<img src="katze.svg" alt="Katze">` – was ist `src`?', options: ['Der Name eines Attributs', 'Der Name eines Tags', 'Der Inhalt des Elements'], correct: 0, explanation: '`src` ist ein Attribut-Name, `katze.svg` sein Wert. Der Tag heißt `img`.' },
    { id: '02-07', konzept: 'html.attribut', type: 'fill', text: 'Vervollständige den Link mit dem Attribut für sein Ziel.', template: '<a ___="programm.html">Programm</a>', accept: ['href'], hint: 'Vier Buchstaben, steht bei jedem Link.' },
    { id: '02-08', konzept: 'html.attribut', type: 'bug', text: 'Ein Attribut ist falsch geschrieben. Welche Zeile?', lines: ['<h1>Foodtrucks</h1>', '<img src="foodtruck.svg" alt="Foodtruck">', '<img src=pizza.svg" alt="Pizza">', '<p>Ab 16 Uhr geöffnet.</p>'], line: 2, explanation: 'Werte stehen in Anführungszeichen – vor `pizza.svg` fehlt eines.' },
    { id: '02-09', konzept: 'html.attribut', type: 'pair', text: 'Welches Attribut macht was?', pairs: [['`src`', 'welche Bilddatei geladen wird'], ['`alt`', 'Ersatztext, falls das Bild fehlt'], ['`href`', 'Ziel eines Links'], ['`lang`', 'Sprache der Seite']] },
    { id: '02-10', konzept: 'html.attribut', type: 'quiz', question: 'Wo stehen Attribute?', options: ['Im öffnenden Tag, nach dem Tag-Namen', 'Im schließenden Tag', 'Zwischen öffnendem und schließendem Tag'], correct: 0, explanation: 'Attribute stehen immer im öffnenden Tag: `<a href="…">`.' },
    // html.verschachtelung
    { id: '02-11', konzept: 'html.verschachtelung', type: 'quiz', question: 'Welche Verschachtelung ist richtig?', options: ['`<p>Mehr im <a href="plan.html">Plan</a>.</p>`', '`<p>Mehr im <a href="plan.html">Plan</p></a>`', '`<p>Mehr im <a href="plan.html">Plan.</p>`'], correct: 0, explanation: 'Zuletzt geöffnet, zuerst geschlossen: Der Link wird im Absatz geöffnet und dort auch geschlossen.' },
    { id: '02-12', konzept: 'html.verschachtelung', type: 'bug', text: 'Welche Zeile verstößt gegen „zuletzt geöffnet, zuerst geschlossen“?', lines: ['<p>Hallo <a href="start.html">Start</a></p>', '<p>Tickets im <a href="shop.html">Shop</p></a>', '<p>Bis bald!</p>'], line: 1, explanation: 'Die Tags überkreuzen sich: erst `</a>`, dann `</p>`.' },
    { id: '02-13', konzept: 'html.verschachtelung', type: 'order', text: 'Sortiere – der Link steckt im Absatz.', lines: ['<p>', '  Alle Preise im', '  <a href="tickets.html">Ticket-Shop</a>', '</p>'] },
    { id: '02-14', konzept: 'html.verschachtelung', type: 'fill', text: 'Welches Element wird hier zuerst geschlossen?', template: '<p>Mehr im <a href="plan.html">Plan</___></p>', accept: ['a'], hint: 'Das zuletzt geöffnete Element – der Link.' },
    // html.grundgeruest
    { id: '02-15', konzept: 'html.grundgeruest', type: 'order', text: 'Sortiere das Grundgerüst.', lines: ['<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <title>Programm</title>', '  </head>', '  <body>', '  </body>', '</html>'] },
    { id: '02-16', konzept: 'html.grundgeruest', type: 'quiz', question: 'Wo steht der `<title>` einer Seite?', options: ['Im head', 'Im body', 'Vor dem Dokumenttyp'], correct: 0, explanation: 'Der Titel ist eine Info über die Seite und gehört in den head. Sichtbar ist er nur im Browser-Tab.' },
    { id: '02-17', konzept: 'html.grundgeruest', type: 'fill', text: 'Vervollständige die Zeichensatz-Angabe.', template: '<meta ___="utf-8">', accept: ['charset'], hint: 'Englisch für „Zeichensatz“, ein Wort.' },
    { id: '02-18', konzept: 'html.grundgeruest', type: 'pair', text: 'Ordne die Teile des Grundgerüsts zu.', pairs: [['`<!DOCTYPE html>`', 'erste Zeile – Dokumenttyp'], ['`<head>`', 'unsichtbare Infos über die Seite'], ['`<body>`', 'alles Sichtbare'], ['`<title>`', 'Text im Browser-Tab']] },
    { id: '02-19', konzept: 'html.grundgeruest', type: 'bug', text: 'Eine Zeile steht am falschen Ort. Welche?', lines: ['<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <h1>Steckbrief</h1>', '    <title>Steckbrief</title>', '  </head>'], line: 3, explanation: 'Sichtbares wie eine Überschrift gehört in den body, nicht in den head.' },
    { id: '02-20', konzept: 'html.grundgeruest', type: 'quiz', question: 'Was bewirkt `<meta charset="utf-8">`?', options: ['Umlaute und Sonderzeichen werden richtig angezeigt', 'Die Seite wird ins Deutsche übersetzt', 'Der Titel erscheint im Browser-Tab'], correct: 0, explanation: 'Der Zeichensatz UTF-8 sorgt dafür, dass ä, ö, ü, € und Co. nicht zu Zeichensalat werden.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '02-html-erste-schritte',
  title: 'Abnahme: Fundament',
  intro: 'Okay, ihr sagt, das Fundament steht. Ich hab die Seite gesehen – FUNKEN, Termin, Uhrzeiten, sieht sauber aus. Aber bevor wir weiterbauen, will ich wissen, dass ihr das auch versteht.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'html.tag', type: 'quiz', question: 'Was zeigt der Browser für `<h1>FUNKEN</h1>` an?', options: ['FUNKEN als große Überschrift – ohne die Tags', '`<h1>FUNKEN</h1>` mit Klammern', 'Nichts – h1 ist unbekannt'], correct: 0, explanation: 'Tags sind Anweisungen an den Browser. Angezeigt wird nur der Inhalt – als Überschrift der Ebene 1.' },
    { konzept: 'web.url', type: 'pair', text: 'Ordne die Teile von `https://funken-festival.de/tickets.html` zu.', pairs: [['`https://`', 'Protokoll – verschlüsselt'], ['`funken-festival.de`', 'Domain – Name des Servers'], ['`/tickets.html`', 'Pfad – Datei auf dem Server']] },
    { konzept: 'html.attribut', type: 'fill', text: 'Vervollständige das Bild der Hauptbühne: Dateiname und Ersatztext.', template: '<img ___="buehne.svg" ___="Die Hauptbühne bei Nacht">', accept: [['src'], ['alt']] },
    {
      type: 'code',
      task: '**Erstelle** die Seite eines Foodtrucks: Hauptüberschrift „Waffelwagen“, darunter ein Absatz „Süße und herzhafte Waffeln – frisch vom Blech.“ und ein Bild der Datei foodtruck.svg mit dem Ersatztext „Der Waffelwagen“.',
      starter: { html: '<!-- Flyer: Waffelwagen -->\n' },
      solution: { html: '<!-- Flyer: Waffelwagen -->\n<h1>Waffelwagen</h1>\n<p>Süße und herzhafte Waffeln – frisch vom Blech.</p>\n<img src="foodtruck.svg" alt="Der Waffelwagen">\n' },
      tests: [
        { type: 'text', selector: 'h1', expected: 'Waffelwagen', label: 'Die Überschrift lautet „Waffelwagen“' },
        { type: 'text', selector: 'p', expected: 'Süße und herzhafte Waffeln – frisch vom Blech.', label: 'Der Absatz hat den richtigen Text' },
        { type: 'attr', selector: 'img', attr: 'src', expected: 'foodtruck.svg', label: 'Das Bild zeigt foodtruck.svg' },
        { type: 'attr', selector: 'img', attr: 'alt', expected: 'Der Waffelwagen', label: 'Der Ersatztext lautet „Der Waffelwagen“' },
        { type: 'order', selectors: ['h1', 'p', 'img'], label: 'Reihenfolge: Überschrift, Absatz, Bild' },
      ],
    },
    { konzept: 'web.client-server', type: 'quiz', question: 'Der Server hat die Datei index.html geschickt. Wer zeichnet daraus die sichtbare Seite?', options: ['Der Browser auf Sams Gerät – der Client', 'Der Server', 'Das DNS'], correct: 0, explanation: 'Der Server liefert nur die Datei. Zeichnen ist Sache des Browsers – also des Clients.' },
    { konzept: 'html.grundgeruest', type: 'order', text: 'Sortiere das Grundgerüst der Startseite.', lines: ['<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <title>FUNKEN – Das Schülerfestival</title>', '  </head>', '  <body>', '  </body>', '</html>'] },
    { konzept: 'web.sprachen', type: 'quiz', question: 'Welche Sprache legt fest, *dass* die Startseite eine Überschrift und drei Absätze hat?', options: ['HTML', 'CSS', 'JavaScript'], correct: 0, explanation: 'Inhalt und Struktur sind HTML. CSS bestimmt das Aussehen, JavaScript das Verhalten.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** zwei Fehler auf der Ticket-Seite: Der ganze Text ist riesig wie eine Überschrift, und statt des Ticket-Bildes erscheint nur der Ersatztext.',
      starter: {
        html: z('<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <meta charset="utf-8">', '    <title>Ticket-Info</title>', '  </head>', '  <body>', '    <h1>Ticket-Info<h1>', '    <p>Tagesticket 12 Euro, Festivalpass 20 Euro, Helfer:innen kostenlos.</p>', '    <img scr="ticket.svg" alt="Ein Festivalticket">', '  </body>', '</html>'),
      },
      solution: {
        html: z('<!DOCTYPE html>', '<html lang="de">', '  <head>', '    <meta charset="utf-8">', '    <title>Ticket-Info</title>', '  </head>', '  <body>', '    <h1>Ticket-Info</h1>', '    <p>Tagesticket 12 Euro, Festivalpass 20 Euro, Helfer:innen kostenlos.</p>', '    <img src="ticket.svg" alt="Ein Festivalticket">', '  </body>', '</html>'),
      },
      tests: [
        { type: 'selector', selector: 'h1', count: 1, label: 'Es gibt genau eine Überschrift' },
        { type: 'selector', selector: 'h1 p', count: 0, label: 'Der Absatz steckt nicht mehr in der Überschrift' },
        { type: 'attr', selector: 'img', attr: 'src', expected: 'ticket.svg', label: 'Das Ticket-Bild wird geladen' },
        { type: 'text', selector: 'title', expected: 'Ticket-Info', label: 'Der Titel ist unverändert' },
      ],
    },
    { konzept: 'html.verschachtelung', type: 'bug', text: 'Eine Zeile verstößt gegen „zuletzt geöffnet, zuerst geschlossen“. Welche?', lines: ['<h1>Foodtrucks</h1>', '<p>Pizza, Döner, Bubble Tea und <a href="waffeln.html">Waffeln</p></a>', '<p>Ab 16 Uhr geöffnet.</p>'], line: 1, explanation: 'Der Link wurde im Absatz geöffnet und muss dort auch geschlossen werden: erst `</a>`, dann `</p>`.' },
    { konzept: 'web.http', type: 'quiz', question: 'Sam tippt eine alte Adresse ein und sieht „404“. Was bedeutet das?', options: ['Der Server antwortet: Diese Datei gibt es hier nicht', 'Der Server ist abgeschaltet', 'Das Handy hat kein Internet'], correct: 0, explanation: '404 ist eine Antwort des Servers – er läuft, kennt aber die angefragte Datei nicht.' },
    { konzept: 'html.grundgeruest', type: 'fill', text: 'Vervollständige das Wurzelelement – die Seite ist auf Deutsch.', template: '<html ___="de">', accept: ['lang'] },
  ],
});
console.log('Kapitel 02 geschrieben');
