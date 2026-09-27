// Kapitel 07 – Tabellen (Station „Timetable“).
// Erzeugt public/content/chapters/07-tabellen/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '07-tabellen');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Mechanismus: Tabelle enthält Zeilen, Zeilen enthalten Zellen.
const FIG_TABELLE = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="30" y="18" width="260" height="128" rx="8" fill="none" stroke="#ff7a45" stroke-width="2"/><text x="40" y="36" fill="#ff7a45" font-family="monospace">&lt;table&gt;</text><text x="181" y="36" text-anchor="middle" fill="#ffd84d" font-family="monospace">&lt;td&gt; = Zelle</text><rect x="44" y="48" width="232" height="40" rx="6" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><text x="52" y="72" fill="#38c7ff" font-family="monospace">&lt;tr&gt;</text><rect x="96" y="55" width="80" height="26" rx="4" fill="#e8ecf7"/><text x="136" y="73" text-anchor="middle" fill="#0f1320">8:00</text><rect x="186" y="55" width="80" height="26" rx="4" fill="#e8ecf7"/><text x="226" y="73" text-anchor="middle" fill="#0f1320">Mathe</text><rect x="44" y="96" width="232" height="40" rx="6" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><text x="52" y="120" fill="#38c7ff" font-family="monospace">&lt;tr&gt;</text><rect x="96" y="103" width="80" height="26" rx="4" fill="#e8ecf7"/><text x="136" y="121" text-anchor="middle" fill="#0f1320">9:45</text><rect x="186" y="103" width="80" height="26" rx="4" fill="#e8ecf7"/><text x="226" y="121" text-anchor="middle" fill="#0f1320">Deutsch</text></svg>`;

// Mechanismus: Kopfzeile aus th (fett, zentriert, beschriftet die Spalten) über Datenzeilen aus td.
const FIG_KOPFZEILE = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="30" y="30" width="130" height="32" fill="#ff7a45" stroke="#0f1320"/><text x="95" y="51" text-anchor="middle" fill="#0f1320" font-weight="bold">Team</text><rect x="160" y="30" width="100" height="32" fill="#ff7a45" stroke="#0f1320"/><text x="210" y="51" text-anchor="middle" fill="#0f1320" font-weight="bold">Punkte</text><rect x="30" y="62" width="130" height="32" fill="#e8ecf7" stroke="#0f1320"/><text x="40" y="83" fill="#0f1320">FC Neckarblitz</text><rect x="160" y="62" width="100" height="32" fill="#e8ecf7" stroke="#0f1320"/><text x="170" y="83" fill="#0f1320">22</text><rect x="30" y="94" width="130" height="32" fill="#e8ecf7" stroke="#0f1320"/><text x="40" y="115" fill="#0f1320">SV Hafenkick</text><rect x="160" y="94" width="100" height="32" fill="#e8ecf7" stroke="#0f1320"/><text x="170" y="115" fill="#0f1320">19</text><text x="268" y="51" fill="#ff7a45" font-family="monospace">&lt;th&gt;</text><text x="268" y="99" fill="#38c7ff" font-family="monospace">&lt;td&gt;</text></svg>`;

// Mechanismus: colspan verbindet nach rechts (Spalten), rowspan nach unten (Zeilen).
const FIG_SPAN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">Zellen verbinden</text><text x="62" y="55" text-anchor="end" fill="#eef2ff">10:00</text><text x="62" y="89" text-anchor="end" fill="#eef2ff">11:00</text><text x="62" y="123" text-anchor="end" fill="#eef2ff">12:00</text><rect x="70" y="34" width="100" height="34" fill="#e8ecf7" stroke="#0f1320"/><text x="120" y="55" text-anchor="middle" fill="#0f1320">Mathe</text><rect x="170" y="34" width="100" height="68" fill="#ff7a45" stroke="#0f1320"/><text x="220" y="62" text-anchor="middle" fill="#0f1320" font-weight="bold">Sport</text><text x="220" y="82" text-anchor="middle" fill="#0f1320" font-family="monospace">rowspan="2"</text><rect x="70" y="68" width="100" height="34" fill="#e8ecf7" stroke="#0f1320"/><text x="120" y="89" text-anchor="middle" fill="#0f1320">Deutsch</text><rect x="70" y="102" width="200" height="34" fill="#ffd84d" stroke="#0f1320"/><text x="170" y="123" text-anchor="middle" fill="#0f1320" font-weight="bold">Pause  ·  colspan="2"</text></svg>`;

// Gesperrte Hilfsdatei, damit Zellen und verbundene Zellen in der Vorschau sichtbar sind.
const HILFS_CSS = `/* Nur zum Anschauen: Linien um die Zellen.
   CSS lernst du ab Kapitel 10 – diese Datei ist hier gesperrt. */
table {
  border-collapse: collapse;
}
td, th {
  border: 1px solid #8a8fa8;
  padding: 4px 10px;
}
`;

/* ================================================================
   Lektion 1 – Tabellen-Aufbau (html.table)
   ================================================================ */
schreibe('lessons/01-tabellen-aufbau.json', {
  id: '01-tabellen-aufbau',
  title: 'Tabellen-Aufbau: Zeilen und Zellen',
  konzepte: ['html.table'],
  steps: [
    {
      type: 'explain',
      text: 'Dein Stundenplan hängt am Kühlschrank: Zeilen für die Stunden, Spalten für die Fächer. So ein Raster bekommst du mit Absätzen oder Listen nicht hin – dafür gibt es die **Tabelle**.\n\nDrei Elemente reichen: `<table>` ist die ganze Tabelle, `<tr>` (*table row*) eine **Zeile**, `<td>` (*table data*) eine **Zelle** in dieser Zeile.\n\n```html\n<table>\n  <tr>\n    <td>8:00</td>\n    <td>Mathe</td>\n  </tr>\n</table>\n```',
      figure: FIG_TABELLE,
    },
    {
      type: 'example',
      text: 'Der Stundenplan für Montag. **Ändere** ein Fach. Dann **kopiere** eine komplette Zeile von `<tr>` bis `</tr>` und füge sie unten ein – die Tabelle wächst nach unten. Die Linien kommen aus einer kleinen gesperrten Vorgabe in style.css, nur damit du die Zellen siehst.',
      html: '<h2>Montag</h2>\n<table>\n  <tr>\n    <td>8:00</td>\n    <td>Mathe</td>\n  </tr>\n  <tr>\n    <td>9:45</td>\n    <td>Deutsch</td>\n  </tr>\n  <tr>\n    <td>11:30</td>\n    <td>Sport</td>\n  </tr>\n</table>\n',
      css: HILFS_CSS,
      editable: ['html'],
    },
    {
      type: 'quiz',
      question: 'Eine Tabelle soll **drei Zeilen** mit **je zwei Zellen** bekommen. Wie viele `<td>`-Elemente schreibst du?',
      options: ['6 – in jeder der drei Zeilen zwei', '3 – eins pro Zeile', '2 – eins pro Spalte', '5 – drei Zeilen plus zwei Spalten'],
      correct: 0,
      explanation: 'Zellen gehören in Zeilen: drei Zeilen × zwei Zellen = sechs `<td>`. Die Spalten entstehen von selbst, weil jede Zeile gleich viele Zellen hat.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter der Überschrift eine Tabelle mit zwei Zeilen und je zwei Zellen: In der ersten Zeile stehen 8:00 und Mathe, in der zweiten 9:45 und Deutsch.',
      starter: { html: '<h2>Dienstag</h2>\n<!-- Hier kommt der Stundenplan -->\n' },
      hints: [
        'Erst das Tabellen-Element, darin die Zeilen, in jeder Zeile die Zellen – nie andersherum.',
        'Eine Zeile mit zwei Zellen sieht so aus: `<tr><td>Kakao</td><td>1,20 €</td></tr>` – du brauchst zwei davon untereinander.',
        'Gerüst: `<table>`, dann zwei Zeilen `<tr>…</tr>`, in jeder zwei `<td>…</td>` mit Uhrzeit und Fach aus der Aufgabe, zum Schluss `</table>`.',
      ],
      solution: { html: '<h2>Dienstag</h2>\n<!-- Hier kommt der Stundenplan -->\n<table>\n  <tr>\n    <td>8:00</td>\n    <td>Mathe</td>\n  </tr>\n  <tr>\n    <td>9:45</td>\n    <td>Deutsch</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'selector', selector: 'table', count: 1, label: 'Es gibt genau eine Tabelle' },
        { type: 'selector', selector: 'table tr', count: 2, label: 'Die Tabelle hat zwei Zeilen' },
        { type: 'selector', selector: 'table td', count: 4, label: 'Die Tabelle hat vier Zellen' },
        { type: 'text', selector: 'table tr:first-child td:first-child', expected: '8:00', label: 'Die erste Zelle lautet „8:00“' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: 'Deutsch', label: 'Die letzte Zelle lautet „Deutsch“' },
        { type: 'order', selectors: ['h2', 'table'], label: 'Die Tabelle steht unter der Überschrift' },
      ],
    },
    {
      type: 'explain',
      text: 'Merk dir die Reihenfolge: **erst die Zeile, dann die Zellen darin.** Eine Zelle steht nie direkt in `<table>`, und eine Zeile nie in einer Zelle.\n\nJede Zeile bekommt **gleich viele Zellen**, sonst hat die Tabelle Löcher. Und Vorsicht bei Tippfehlern: Vertippst du dich bei einem Zellen-Tag oder vergisst `</table>`, landet der Inhalt **über** der Tabelle – der Browser weiß nicht, wohin damit.\n\n```html\n<tr>\n  <td>Platz 1</td>\n  <td>Lena</td>\n  <td>9870</td>\n</tr>\n```',
    },
    {
      type: 'fill',
      text: 'Vervollständige die Preisliste vom Kiosk: Welche beiden Tags fehlen?',
      template: '<table>\n  <___>\n    <___>Brezel</td>\n    <td>0,80 €</td>\n  </tr>\n</table>',
      accept: [['tr'], ['td']],
      hint: 'Zeile = table row, Zelle = table data.',
    },
    {
      type: 'code',
      task: '**Erweitere** die Preisliste um zwei weitere Zeilen mit je zwei Zellen: Kakao mit 1,20 € und Apfelschorle mit 1,50 €.',
      starter: { html: '<h2>Kiosk – Preise</h2>\n<table>\n  <tr>\n    <td>Brezel</td>\n    <td>0,80 €</td>\n  </tr>\n</table>\n' },
      hints: [
        'Eine neue Zeile ist ein weiteres Zeilen-Element mit zwei Zellen – innerhalb der Tabelle.',
        'Kopiere die vorhandene Zeile zweimal und tausche die Texte aus.',
        'Die neuen Zeilen kommen nach dem `</tr>` der Brezel-Zeile und vor `</table>`.',
      ],
      solution: { html: '<h2>Kiosk – Preise</h2>\n<table>\n  <tr>\n    <td>Brezel</td>\n    <td>0,80 €</td>\n  </tr>\n  <tr>\n    <td>Kakao</td>\n    <td>1,20 €</td>\n  </tr>\n  <tr>\n    <td>Apfelschorle</td>\n    <td>1,50 €</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
        { type: 'selector', selector: 'table td', count: 6, label: 'Jede Zeile hat zwei Zellen – sechs insgesamt' },
        { type: 'text', selector: 'table tr:nth-child(2) td:first-child', expected: 'Kakao', label: 'Die zweite Zeile beginnt mit „Kakao“' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: '1,50 €', label: 'Die Apfelschorle kostet 1,50 €' },
        { type: 'text', selector: 'table tr:first-child td:first-child', expected: 'Brezel', label: 'Die Brezel-Zeile ist noch da' },
      ],
    },
    {
      type: 'order',
      text: 'Bring die Highscore-Zeile in die richtige Reihenfolge: erst der Platz, dann der Name.',
      lines: ['<table>', '  <tr>', '    <td>Platz 1</td>', '    <td>Lena</td>', '  </tr>', '</table>'],
      explanation: 'Tabelle → Zeile → Zellen. Geschlossen wird von innen nach außen.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** die Highscore-Liste: Die Punktzahl 8450 steht über der Tabelle statt in der zweiten Zeile, und der Absatz „Stand: Freitag“ rutscht ebenfalls nach oben statt unter die Tabelle.',
      starter: { html: '<h2>Highscore</h2>\n<table>\n  <tr>\n    <td>Platz 1</td>\n    <td>Lena</td>\n    <td>9870</td>\n  </tr>\n  <tr>\n    <td>Platz 2</td>\n    <td>Deniz</td>\n    <dt>8450</dt>\n  </tr>\n<p>Stand: Freitag</p>\n' },
      hints: [
        'Zwei Fehler: ein vertippter Zellen-Tag und ein fehlender schließender Tag. Was über der Tabelle landet, steckt in keiner richtigen Zelle.',
        'Vergleiche die dritte Zelle der zweiten Zeile Buchstabe für Buchstabe mit den anderen Zellen.',
        'Wo hört die Tabelle auf? Nach der letzten Zeile muss das Tabellen-Element geschlossen werden, bevor der Absatz kommt.',
      ],
      solution: { html: '<h2>Highscore</h2>\n<table>\n  <tr>\n    <td>Platz 1</td>\n    <td>Lena</td>\n    <td>9870</td>\n  </tr>\n  <tr>\n    <td>Platz 2</td>\n    <td>Deniz</td>\n    <td>8450</td>\n  </tr>\n</table>\n<p>Stand: Freitag</p>\n' },
      tests: [
        { type: 'selector', selector: 'table td', count: 6, label: 'Alle sechs Zellen liegen in der Tabelle' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: '8450', label: 'Die Punktzahl 8450 steht in der zweiten Zeile' },
        { type: 'selector', selector: 'dt', count: 0, label: 'Kein vertippter Zellen-Tag mehr' },
        { type: 'selector', selector: 'table + p', count: 1, label: 'Der Absatz „Stand: Freitag“ steht direkt unter der Tabelle' },
        { type: 'selector', selector: 'table tr', count: 2, label: 'Die Tabelle hat zwei Zeilen' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Eine Regel zum Schluss: **Tabellen sind für Daten** – für alles, was in Zeilen und Spalten gehört: Stundenpläne, Preise, Ergebnisse, Zeitpläne.\n\nFrüher wurden ganze Seiten mit Tabellen gebaut: links die Navigation, rechts der Inhalt. Mach das nicht. Für Layout gibt es CSS, das lernst du später. Browser und Vorleseprogramme erwarten in einer Tabelle **Daten**, keine Seitenaufteilung.',
    },
    {
      type: 'quiz',
      question: 'Welcher Inhalt gehört in eine Tabelle?',
      options: ['Der Stundenplan: Stunden und Fächer in Zeilen und Spalten', 'Ein Willkommenstext aus drei Absätzen', 'Das Seitenlayout: Navigation links, Inhalt rechts'],
      correct: 0,
      explanation: 'Tabellen sind für Daten mit Zeilen und Spalten. Text bleibt in Absätzen, und das Layout regelt später CSS.',
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Leute, keiner liest drei Absätze, um den Einlass zu finden. Ich will Wann, Wo und Einlass **auf einen Blick** – links die Frage, rechts die Antwort.\n\nBaut das als eigenen Abschnitt auf die Startseite, zwischen „Das Festival“ und „Die Bühnen“. Drei Zeilen reichen mir.',
    },
    { type: 'code', etappe: '07-tabellen/01-tabellen-aufbau' },
  ],
});

/* ================================================================
   Lektion 2 – Kopfzeile (html.th)
   ================================================================ */
schreibe('lessons/02-kopfzeile.json', {
  id: '02-kopfzeile',
  title: 'Die Kopfzeile',
  konzepte: ['html.th'],
  steps: [
    {
      type: 'explain',
      text: 'Die Tabelle der Schulliga: FC Neckarblitz, 10 Spiele, 22 Punkte. Ohne die erste Zeile weiß niemand, welche Zahl was bedeutet. Diese erste Zeile ist die **Kopfzeile** – sie beschriftet die Spalten.\n\nIhre Zellen sind **Kopfzellen**: `<th>` (*table header*) statt `<td>`. Der Browser zeigt sie **fett und zentriert**. Wichtiger ist die Bedeutung: `<th>` sagt „Das ist eine Beschriftung, kein Wert.“\n\n```html\n<tr>\n  <th>Team</th>\n  <th>Spiele</th>\n  <th>Punkte</th>\n</tr>\n```',
      figure: FIG_KOPFZEILE,
    },
    {
      type: 'example',
      text: 'Die Schulliga mit Kopfzeile. **Ändere** in der Kopfzeile ein `<th>` in ein `<td>` – was passiert mit fett und zentriert? Dann **ergänze** eine vierte Spalte „Tore“: eine Kopfzelle oben und in jeder Team-Zeile eine Datenzelle.',
      html: '<h2>Schulliga</h2>\n<table>\n  <tr>\n    <th>Team</th>\n    <th>Spiele</th>\n    <th>Punkte</th>\n  </tr>\n  <tr>\n    <td>FC Neckarblitz</td>\n    <td>10</td>\n    <td>22</td>\n  </tr>\n  <tr>\n    <td>SV Hafenkick</td>\n    <td>10</td>\n    <td>19</td>\n  </tr>\n  <tr>\n    <td>Kellerkinder 04</td>\n    <td>10</td>\n    <td>7</td>\n  </tr>\n</table>\n',
      css: HILFS_CSS,
      editable: ['html'],
    },
    {
      type: 'quiz',
      question: 'Warum nimmst du für die Kopfzeile `<th>` – und nicht einfach `<td>` mit `<strong>` darin?',
      options: ['`<th>` bedeutet „Beschriftung der Spalte“ – nicht nur fett, sondern Bedeutung', 'Weil `<strong>` in Tabellen verboten ist', 'Weil `<th>` die Spalte automatisch breiter macht'],
      correct: 0,
      explanation: 'Fett wäre nur Aussehen. `<th>` sagt dem Browser und Vorleseprogrammen, dass diese Zelle die Spalte beschreibt.',
    },
    {
      type: 'code',
      task: '**Ergänze** ganz oben in der Tabelle eine Kopfzeile mit den Kopfzellen „Team“ und „Punkte“.',
      starter: { html: '<h2>Schulliga</h2>\n<table>\n  <tr>\n    <td>FC Neckarblitz</td>\n    <td>22</td>\n  </tr>\n  <tr>\n    <td>SV Hafenkick</td>\n    <td>19</td>\n  </tr>\n</table>\n' },
      hints: [
        'Die Kopfzeile ist eine normale Zeile – nur mit Kopfzellen statt Datenzellen.',
        'Eine Kopfzelle sieht so aus: `<th>Snack</th>`. Du brauchst zwei davon in einer eigenen Zeile.',
        'Direkt nach `<table>`: eine Zeile `<tr>…</tr>` mit zwei `<th>…</th>` und den Texten aus der Aufgabe.',
      ],
      solution: { html: '<h2>Schulliga</h2>\n<table>\n  <tr>\n    <th>Team</th>\n    <th>Punkte</th>\n  </tr>\n  <tr>\n    <td>FC Neckarblitz</td>\n    <td>22</td>\n  </tr>\n  <tr>\n    <td>SV Hafenkick</td>\n    <td>19</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'selector', selector: 'table tr:first-child th', count: 2, label: 'Die erste Zeile besteht aus zwei Kopfzellen' },
        { type: 'text', selector: 'table th:first-child', expected: 'Team', label: 'Die erste Kopfzelle lautet „Team“' },
        { type: 'text', selector: 'table th:last-child', expected: 'Punkte', label: 'Die zweite Kopfzelle lautet „Punkte“' },
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat jetzt drei Zeilen' },
        { type: 'selector', selector: 'table td', count: 4, label: 'Die Team-Zeilen sind unverändert' },
      ],
    },
    {
      type: 'explain',
      text: 'Die Kopfzeile steht **ganz oben** und hat **genauso viele Zellen** wie jede Datenzeile – sonst verrutschen die Spalten.\n\nIn Zellen gelten die normalen Regeln für Text: Das &-Zeichen schreibst du als Entity `&amp;`, sonst hält der Browser es für den Anfang eines Sonderzeichens.\n\n```html\n<tr>\n  <th>Zeit</th>\n  <th>Montag</th>\n</tr>\n<tr>\n  <td>8:00</td>\n  <td>Kunst &amp; Design</td>\n</tr>\n```',
    },
    {
      type: 'fill',
      text: 'Vervollständige die Kopfzeile des Stundenplans.',
      template: '<___>\n  <___>Zeit</th>\n  <th>Montag</th>\n</tr>',
      accept: [['tr'], ['th']],
      hint: 'Erst die Zeile, dann die Kopfzelle: table row, table header.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter der Überschrift eine Preisliste als Tabelle: Kopfzeile mit „Snack“ und „Preis“, darunter zwei Zeilen: Brezel mit 0,80 € und Kakao mit 1,20 €.',
      starter: { html: '<h2>Kiosk</h2>\n<!-- Hier kommt die Preisliste -->\n' },
      hints: [
        'Drei Zeilen: erst die Kopfzeile mit zwei Kopfzellen, dann zwei Datenzeilen mit je zwei Datenzellen.',
        'Kopfzelle und Datenzelle unterscheiden sich nur im Tag: `<th>Team</th>` gegenüber `<td>FC Neckarblitz</td>`.',
        'Gerüst: `<table>`, eine Zeile mit zwei `<th>`, zwei Zeilen mit je zwei `<td>`, dann `</table>`.',
      ],
      solution: { html: '<h2>Kiosk</h2>\n<!-- Hier kommt die Preisliste -->\n<table>\n  <tr>\n    <th>Snack</th>\n    <th>Preis</th>\n  </tr>\n  <tr>\n    <td>Brezel</td>\n    <td>0,80 €</td>\n  </tr>\n  <tr>\n    <td>Kakao</td>\n    <td>1,20 €</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
        { type: 'selector', selector: 'table tr:first-child th', count: 2, label: 'Die Kopfzeile hat zwei Kopfzellen' },
        { type: 'text', selector: 'table th:first-child', expected: 'Snack', label: 'Die erste Kopfzelle lautet „Snack“' },
        { type: 'selector', selector: 'table td', count: 4, label: 'Es gibt vier Datenzellen' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: '1,20 €', label: 'Der Kakao kostet 1,20 €' },
        { type: 'order', selectors: ['h2', 'table'], label: 'Die Tabelle steht unter der Überschrift' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Tabellen-Elemente ihrer Bedeutung zu.',
      pairs: [
        ['`<table>`', 'die ganze Tabelle'],
        ['`<tr>`', 'eine Zeile'],
        ['`<th>`', 'Kopfzelle – beschriftet die Spalte, fett und zentriert'],
        ['`<td>`', 'Datenzelle – ein einzelner Wert'],
      ],
    },
    {
      type: 'code',
      task: '**Erstelle** unter der Überschrift den Stundenplan als Tabelle: Kopfzeile Zeit, Montag, Dienstag – dann die Zeile 8:00 mit Mathe und Kunst & Design, danach die Zeile 9:45 mit Deutsch und Sport.',
      starter: { html: '<h2>Stundenplan 11a</h2>\n<!-- Hier kommt der Stundenplan -->\n' },
      hints: [
        'Drei Spalten heißt: drei Kopfzellen oben und drei Datenzellen in jeder weiteren Zeile.',
        'Das &-Zeichen im Fach schreibst du als Entity – wie bei `Pizza &amp; Pasta`.',
        'Gerüst: `<table>`, Kopfzeile mit drei `<th>`, zwei Zeilen mit je drei `<td>`, dann `</table>`.',
      ],
      solution: { html: '<h2>Stundenplan 11a</h2>\n<!-- Hier kommt der Stundenplan -->\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>Montag</th>\n    <th>Dienstag</th>\n  </tr>\n  <tr>\n    <td>8:00</td>\n    <td>Mathe</td>\n    <td>Kunst &amp; Design</td>\n  </tr>\n  <tr>\n    <td>9:45</td>\n    <td>Deutsch</td>\n    <td>Sport</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'selector', selector: 'table tr:first-child th', count: 3, label: 'Die Kopfzeile hat drei Kopfzellen' },
        { type: 'text', selector: 'table th:nth-child(3)', expected: 'Dienstag', label: 'Die dritte Kopfzelle lautet „Dienstag“' },
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
        { type: 'selector', selector: 'table td', count: 6, label: 'Es gibt sechs Datenzellen' },
        { type: 'text', selector: 'table tr:nth-child(2) td:last-child', expected: 'Kunst & Design', label: 'Am Dienstag um 8:00 steht „Kunst & Design“' },
        { type: 'source', file: 'html', matches: '&amp;', label: 'Das &-Zeichen ist als Entity geschrieben' },
      ],
    },
    {
      type: 'explain',
      text: 'Gleich baust du eine **neue Seite**. Neue Seite heißt: neues Grundgerüst – Dokumenttyp, `html` mit Sprache, `head` mit Zeichensatz und Titel, `body` mit dem Inhalt. So sah die Galerie-Seite am Anfang aus:\n\n```html\n<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Galerie – FUNKEN</title>\n  </head>\n  <body>\n    <h1>Galerie</h1>\n    <p><a href="index.html">Zurück zur Startseite</a></p>\n  </body>\n</html>\n```',
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Jetzt der eigentliche **Timetable**: die Programm-Seite. Die Datei programm.html ist auf der Startseite längst verlinkt – sie existiert nur noch nicht.\n\nDarauf kommt für Freitag eine Tabelle mit drei Spalten: Uhrzeit, Hauptbühne, Zeltbühne – mit Kopfzeile, damit jede Spalte beschriftet ist. Vergiss den Rück-Link zur Startseite nicht, und schreib das &-Zeichen im Bandnamen so, wie es HTML braucht.',
    },
    { type: 'code', etappe: '07-tabellen/02-kopfzeile' },
  ],
});

/* ================================================================
   Lektion 3 – Verbundene Zellen (html.colspan)
   ================================================================ */
schreibe('lessons/03-verbundene-zellen.json', {
  id: '03-verbundene-zellen',
  title: 'Verbundene Zellen',
  konzepte: ['html.colspan'],
  steps: [
    {
      type: 'explain',
      text: 'Im Stundenplan gibt es die Mittagspause: eine Zeile, die über beide Tage geht. Oder eine Doppelstunde Sport über zwei Zeiten. Dafür **verbindest du Zellen**.\n\n`colspan="2"` (*column span*) lässt eine Zelle über zwei **Spalten** reichen. Wichtig: Die verbundene Zelle ersetzt zwei normale – die Zeile hat dann **eine Zelle weniger**.\n\n```html\n<tr>\n  <td>12:00</td>\n  <td colspan="2">Mittagspause</td>\n</tr>\n```',
      figure: FIG_SPAN,
    },
    {
      type: 'example',
      text: 'Der Stundenplan mit Mittagspause. **Ändere** den Wert 2 in 3 – die Pause ragt rechts über die Tabelle hinaus. **Lösche** dann das Attribut ganz: Die Zeile hat plötzlich ein Loch, weil ihr eine Zelle fehlt.',
      html: '<h2>Stundenplan</h2>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>Montag</th>\n    <th>Dienstag</th>\n  </tr>\n  <tr>\n    <td>11:30</td>\n    <td>Sport</td>\n    <td>Physik</td>\n  </tr>\n  <tr>\n    <td>13:00</td>\n    <td colspan="2">Mittagspause</td>\n  </tr>\n  <tr>\n    <td>14:00</td>\n    <td>Englisch</td>\n    <td>Bio</td>\n  </tr>\n</table>\n',
      css: HILFS_CSS,
      editable: ['html'],
    },
    {
      type: 'quiz',
      question: 'Eine Tabelle hat drei Spalten. In einer Zeile bekommt eine Zelle `colspan="2"`. Wie viele Zellen stehen in dieser Zeile?',
      options: ['2 – die verbundene Zelle zählt für zwei', '3 – wie in jeder anderen Zeile', '4 – eine zusätzliche für die Verbindung', '1 – nur die verbundene Zelle'],
      correct: 0,
      explanation: 'Die verbundene Zelle belegt zwei Spalten, dazu kommt eine normale Zelle: Zwei Zellen füllen drei Spalten.',
    },
    {
      type: 'code',
      task: '**Verbinde** in der Zeile 9:30 die beiden Pause-Zellen zu einer einzigen Zelle „Pause“, die über beide Klassen-Spalten reicht.',
      starter: {
        html: '<h2>Vertretungsplan</h2>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>11a</th>\n    <th>11b</th>\n  </tr>\n  <tr>\n    <td>8:00</td>\n    <td>Mathe</td>\n    <td>Englisch</td>\n  </tr>\n  <tr>\n    <td>9:30</td>\n    <td>Pause</td>\n    <td>Pause</td>\n  </tr>\n  <tr>\n    <td>9:50</td>\n    <td>Deutsch</td>\n    <td>Physik</td>\n  </tr>\n</table>\n',
        css: HILFS_CSS,
      },
      editable: ['html'],
      hints: [
        'Eine Zelle über zwei Spalten: Das Attribut mit dem Wert 2 kommt in den öffnenden Tag der Zelle – die zweite Pause-Zelle fällt weg.',
        'Muster aus einem anderen Plan: `<td colspan="2">Mittagspause</td>`.',
        'Die Zeile 9:30 hat danach nur zwei Zellen: die Uhrzeit und die verbundene Pause.',
      ],
      solution: { html: '<h2>Vertretungsplan</h2>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>11a</th>\n    <th>11b</th>\n  </tr>\n  <tr>\n    <td>8:00</td>\n    <td>Mathe</td>\n    <td>Englisch</td>\n  </tr>\n  <tr>\n    <td>9:30</td>\n    <td colspan="2">Pause</td>\n  </tr>\n  <tr>\n    <td>9:50</td>\n    <td>Deutsch</td>\n    <td>Physik</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'attr', selector: 'table tr:nth-child(3) td[colspan]', attr: 'colspan', expected: '2', label: 'Die Pause-Zelle reicht über zwei Spalten' },
        { type: 'selector', selector: 'table tr:nth-child(3) td', count: 2, label: 'Die Zeile 9:30 hat nur noch zwei Zellen' },
        { type: 'text', selector: 'table tr:nth-child(3) td:last-child', expected: 'Pause', label: 'Die verbundene Zelle heißt „Pause“' },
        { type: 'selector', selector: 'table tr', count: 4, label: 'Die Tabelle hat weiterhin vier Zeilen' },
        { type: 'selector', selector: 'table th', count: 3, label: 'Die Kopfzeile ist unverändert' },
      ],
    },
    {
      type: 'explain',
      text: 'Das Gegenstück ist `rowspan="2"` (*row span*): Die Zelle reicht **nach unten** über zwei Zeilen – zum Beispiel eine Doppelstunde.\n\nDie Zeile darunter hat an dieser Stelle **keine eigene Zelle** mehr, der Platz ist ja schon belegt. Also: Zeile mit rowspan ganz normal schreiben, die nächste Zeile mit einer Zelle weniger.\n\n```html\n<tr>\n  <td>10:00</td>\n  <td rowspan="2">Sport</td>\n</tr>\n<tr>\n  <td>11:00</td>\n</tr>\n```',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Zeitplan: Die Pause geht über zwei Spalten, der Film über zwei Zeilen.',
      template: '<tr>\n  <td>18:00</td>\n  <td ___="2">Pause</td>\n</tr>\n<tr>\n  <td>19:00</td>\n  <td ___="2">Film</td>\n  <td>Quiz</td>\n</tr>',
      accept: [['colspan'], ['rowspan']],
      hint: 'Spalten heißen auf Englisch columns, Zeilen rows – span bedeutet überspannen.',
    },
    {
      type: 'code',
      task: '**Verbinde** die beiden Sport-Zellen zu einer Zelle „Sport“, die über die Zeilen 10:00 und 11:00 reicht. Die Zeile 11:00 behält nur ihre Uhrzeit.',
      starter: {
        html: '<h2>Freitag</h2>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>Fach</th>\n  </tr>\n  <tr>\n    <td>9:00</td>\n    <td>Mathe</td>\n  </tr>\n  <tr>\n    <td>10:00</td>\n    <td>Sport</td>\n  </tr>\n  <tr>\n    <td>11:00</td>\n    <td>Sport</td>\n  </tr>\n</table>\n',
        css: HILFS_CSS,
      },
      editable: ['html'],
      hints: [
        'Nach unten verbinden heißt: Zeilen überspannen – das Attribut mit rows im Namen.',
        'Muster aus einem anderen Plan: `<td rowspan="2">Projektwoche</td>` in der oberen Zeile; in der Zeile darunter fällt diese Zelle weg.',
        'Die Zeile 10:00 bekommt die verbundene Zelle, die Zeile 11:00 hat danach nur noch eine Zelle.',
      ],
      solution: { html: '<h2>Freitag</h2>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>Fach</th>\n  </tr>\n  <tr>\n    <td>9:00</td>\n    <td>Mathe</td>\n  </tr>\n  <tr>\n    <td>10:00</td>\n    <td rowspan="2">Sport</td>\n  </tr>\n  <tr>\n    <td>11:00</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'attr', selector: 'td[rowspan]', attr: 'rowspan', expected: '2', label: 'Die Sport-Zelle reicht über zwei Zeilen' },
        { type: 'text', selector: 'td[rowspan]', expected: 'Sport', label: 'Die verbundene Zelle heißt „Sport“' },
        { type: 'selector', selector: 'table tr:last-child td', count: 1, label: 'Die Zeile 11:00 hat nur noch eine Zelle' },
        { type: 'selector', selector: 'table tr', count: 4, label: 'Die Tabelle hat weiterhin vier Zeilen' },
        { type: 'selector', selector: 'table td', count: 7, label: 'Insgesamt gibt es sieben Datenzellen' },
      ],
    },
    {
      type: 'order',
      text: 'Sortiere den Bühnenplan: Kopfzeile zuerst, dann die Zeiten aufsteigend. Achte darauf, welche Zeile weniger Zellen hat.',
      lines: [
        '<table>',
        '<tr><th>Zeit</th><th>Bühne A</th><th>Bühne B</th></tr>',
        '<tr><td>18:00</td><td>Sektor 7</td><td>Marla Funke</td></tr>',
        '<tr><td>19:00</td><td colspan="2">Pause</td></tr>',
        '<tr><td>20:00</td><td>Basslager</td><td>Neonpuls</td></tr>',
        '</table>',
      ],
      explanation: 'Die Pausen-Zeile hat nur zwei Zellen – die verbundene Zelle zählt für beide Bühnen.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** das Kinoprogramm: Um 19:00 soll eine einzige Zelle „Pause – Kasse geöffnet“ über beide Säle reichen. Stattdessen steht „Pause“ doppelt in der Zeile, und in der Zeile 20:00 rutschen beide Filme nach rechts.',
      starter: {
        html: '<h2>Kinoprogramm</h2>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>Saal 1</th>\n    <th>Saal 2</th>\n  </tr>\n  <tr>\n    <td>17:00</td>\n    <td>Robo-Rennen</td>\n    <td>Der letzte Sommer</td>\n  </tr>\n  <tr>\n    <td>19:00</td>\n    <td rowspan="2">Pause – Kasse geöffnet</td>\n    <td>Pause</td>\n  </tr>\n  <tr>\n    <td>20:00</td>\n    <td>Nachtjagd</td>\n    <td>Sternenkinder</td>\n  </tr>\n</table>\n',
        css: HILFS_CSS,
      },
      editable: ['html'],
      hints: [
        'Zwei Fehler in der Pausen-Zeile: das falsche Attribut (Zeilen statt Spalten) und eine Zelle zu viel.',
        'Nach rechts verbinden ist colspan, nach unten rowspan – wie bei `<td colspan="2">Mittagspause</td>`.',
        'Die Zeile 19:00 hat am Ende genau zwei Zellen: die Uhrzeit und die verbundene Pause.',
      ],
      solution: { html: '<h2>Kinoprogramm</h2>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>Saal 1</th>\n    <th>Saal 2</th>\n  </tr>\n  <tr>\n    <td>17:00</td>\n    <td>Robo-Rennen</td>\n    <td>Der letzte Sommer</td>\n  </tr>\n  <tr>\n    <td>19:00</td>\n    <td colspan="2">Pause – Kasse geöffnet</td>\n  </tr>\n  <tr>\n    <td>20:00</td>\n    <td>Nachtjagd</td>\n    <td>Sternenkinder</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'attr', selector: 'td[colspan]', attr: 'colspan', expected: '2', label: 'Die Pausen-Zelle reicht über zwei Spalten' },
        { type: 'selector', selector: 'td[rowspan]', count: 0, label: 'Keine Zelle reicht mehr nach unten' },
        { type: 'selector', selector: 'table tr:nth-child(3) td', count: 2, label: 'Die Zeile 19:00 hat genau zwei Zellen' },
        { type: 'text', selector: 'td[colspan]', expected: 'Pause – Kasse geöffnet', label: 'Die verbundene Zelle heißt „Pause – Kasse geöffnet“' },
        { type: 'selector', selector: 'table tr', count: 4, label: 'Die Tabelle hat weiterhin vier Zeilen' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: 'Sternenkinder', label: 'Um 20:00 läuft „Sternenkinder“ in Saal 2' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Samstag um 18:00 machen wir Pause – auf beiden Bühnen gleichzeitig, weil dann die Foodtrucks öffnen. Das soll man im Timetable sehen: eine Zeile, in der die Pause über beide Bühnen geht.\n\nDie Samstags-Tabelle kommt unter die von Freitag, mit derselben Kopfzeile. Und schreibt „Foodtrucks öffnen“ dazu, sonst denken alle, es ist was kaputt.',
    },
    { type: 'code', etappe: '07-tabellen/03-verbundene-zellen' },
  ],
});

/* ================================================================
   Lektion 4 – Wiederholung (wiederholt 06, 05, 03)
   ================================================================ */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung: Timetable-Check',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Timetable-Check: Tabellen, Kopfzeilen und verbundene Zellen – dazu Bilder von der Foto-Wand, Links vom Wegweiser und Text-Elemente vom Textbanner. Am Ende bekommt die Programm-Seite den Foodcourt: Bild, Tabelle und Link in einem Abschnitt.',
    },
    {
      type: 'quiz',
      question: 'Wozu dient der **Alternativtext** eines Bildes?',
      options: ['Er wird angezeigt oder vorgelesen, wenn das Bild nicht zu sehen ist', 'Er steht als Bildunterschrift sichtbar unter dem Bild', 'Er legt fest, wie groß das Bild angezeigt wird'],
      correct: 0,
      explanation: 'Der Alternativtext ersetzt das Bild, wenn es nicht lädt, und wird von Vorleseprogrammen gesprochen. Sichtbare Unterschriften sind Sache von figcaption.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter der Überschrift zuerst das Bild pizza.svg mit dem Alternativtext „Eine Pizza Margherita“ und darunter eine Tabelle: Kopfzeile Platz und Snack, dann die Zeilen 1 mit Pizza und 2 mit Waffel.',
      starter: { html: '<h2>Snack-Ranking</h2>\n<!-- Bild und Tabelle -->\n' },
      hints: [
        'Ein Bild ist ein Leerelement mit Quelle und Alternativtext; danach kommt die Tabelle mit Kopfzeile.',
        'Bild-Muster aus einem anderen Kontext: `<img src="katze.svg" alt="Eine schlafende Katze">`.',
        'Reihenfolge: Überschrift, Bild, Tabelle mit einer Kopfzeile (zwei `<th>`) und zwei Datenzeilen (je zwei `<td>`).',
      ],
      solution: { html: '<h2>Snack-Ranking</h2>\n<!-- Bild und Tabelle -->\n<img src="pizza.svg" alt="Eine Pizza Margherita">\n<table>\n  <tr>\n    <th>Platz</th>\n    <th>Snack</th>\n  </tr>\n  <tr>\n    <td>1</td>\n    <td>Pizza</td>\n  </tr>\n  <tr>\n    <td>2</td>\n    <td>Waffel</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'pizza.svg', label: 'Das Bild pizza.svg ist eingebunden' },
        { type: 'attr', selector: 'img', attr: 'alt', expected: 'Eine Pizza Margherita', label: 'Das Bild hat den Alternativtext' },
        { type: 'selector', selector: 'table tr:first-child th', count: 2, label: 'Die Kopfzeile hat zwei Kopfzellen' },
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: 'Waffel', label: 'Platz 2 ist die Waffel' },
        { type: 'order', selectors: ['h2', 'img', 'table'], label: 'Reihenfolge: Überschrift, Bild, Tabelle' },
      ],
    },
    {
      type: 'fill',
      text: 'Vervollständige den Link zum Fahrplan: Er soll sich in einem neuen Tab öffnen.',
      template: '<a ___="https://www.example.com" ___="_blank">Fahrplan</a>',
      accept: [['href'], ['target']],
      hint: 'Erst das Attribut mit der Adresse, dann das Attribut für den neuen Tab.',
    },
    {
      type: 'order',
      text: 'Sortiere den Kiosk-Abschnitt: Überschrift, Absatz, Trennlinie, dann die Tabelle – Kopfzeile zuerst.',
      lines: [
        '<h2>Kiosk</h2>',
        '<p>Neu: <strong>Pizza &amp; Pasta</strong></p>',
        '<hr>',
        '<table>',
        '<tr><th>Snack</th><th>Preis</th></tr>',
        '<tr><td>Pizza</td><td>2,50 €</td></tr>',
        '</table>',
      ],
      explanation: 'Trennlinie und Bild sind Leerelemente ohne schließenden Tag; die Tabelle beginnt mit der Kopfzeile.',
    },
    {
      type: 'pair',
      text: 'Ordne die Attribute und Elemente ihrer Bedeutung zu.',
      pairs: [
        ['`alt`', 'Alternativtext eines Bildes'],
        ['`href`', 'Adresse, zu der ein Link führt'],
        ['`<figcaption>`', 'Bildunterschrift im Bild-Block'],
        ['`colspan`', 'verbindet Zellen über mehrere Spalten'],
        ['`mailto:`', 'Anfang einer E-Mail-Adresse im Link'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** die Highscore-Seite: Das Bild vom Controller wird nicht angezeigt, und die Kopfzeile der Tabelle sieht aus wie eine normale Zeile – nicht fett.',
      starter: { html: '<h2>Highscore</h2>\n<img scr="controller.svg" alt="Ein Gamecontroller">\n<table>\n  <tr>\n    <td>Platz</td>\n    <td>Name</td>\n    <td>Punkte</td>\n  </tr>\n  <tr>\n    <td>1</td>\n    <td>Lena</td>\n    <td>9870</td>\n  </tr>\n  <tr>\n    <td>2</td>\n    <td>Deniz</td>\n    <td>8450</td>\n  </tr>\n</table>\n' },
      hints: [
        'Zwei Fehler: ein vertipptes Attribut beim Bild und die falschen Zellen-Tags in der ersten Zeile.',
        'Das Bild braucht seine Quelle im Attribut src – vergleiche Buchstabe für Buchstabe.',
        'Kopfzellen haben einen eigenen Tag, der mit h endet – in der ersten Zeile, alle drei.',
      ],
      solution: { html: '<h2>Highscore</h2>\n<img src="controller.svg" alt="Ein Gamecontroller">\n<table>\n  <tr>\n    <th>Platz</th>\n    <th>Name</th>\n    <th>Punkte</th>\n  </tr>\n  <tr>\n    <td>1</td>\n    <td>Lena</td>\n    <td>9870</td>\n  </tr>\n  <tr>\n    <td>2</td>\n    <td>Deniz</td>\n    <td>8450</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'controller.svg', label: 'Das Bild controller.svg wird angezeigt' },
        { type: 'selector', selector: 'table tr:first-child th', count: 3, label: 'Die erste Zeile besteht aus drei Kopfzellen' },
        { type: 'text', selector: 'table th:first-child', expected: 'Platz', label: 'Die erste Kopfzelle lautet „Platz“' },
        { type: 'selector', selector: 'table td', count: 6, label: 'Die beiden Datenzeilen sind unverändert' },
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
      ],
    },
    {
      type: 'quiz',
      question: 'Ein Link soll beim Klick das E-Mail-Programm öffnen. Womit beginnt seine Adresse?',
      options: ['`mailto:`', '`https://`', '`email:`'],
      correct: 0,
      explanation: 'Mit `mailto:` und der Adresse dahinter öffnet der Browser das Mailprogramm – `https://` wäre eine Website.',
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Foodcourt auf die Programm-Seite! Ich will das Foodtruck-Bild, darunter die drei Trucks mit ihrem Highlight als Tabelle – mit Kopfzeile – und einen Link zurück zur Startseite, wo alle Trucks stehen.\n\nAlles drei kennt ihr schon; jetzt kombiniert ihr es in einem Abschnitt ganz unten auf der Seite. Und das &-Zeichen bei Pizza & Mehr bitte so, dass es der Browser versteht.',
    },
    { type: 'code', etappe: '07-tabellen/04-wiederholung' },
  ],
});

/* ================================================================
   Lektion 5 – Projekt: Timetable (Meilenstein)
   ================================================================ */
schreibe('lessons/05-projekt-timetable.json', {
  id: '05-projekt-timetable',
  title: 'Projekt: Timetable komplett',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Meilenstein! Rückblick: Die Startseite hat den Abschnitt „Auf einen Blick“, die neue Programm-Seite zwei Timetables mit Pause und den Foodcourt. Damit steht die Station Timetable fast.\n\nEine Sache fehlt noch: Die Tabelle „Auf einen Blick“ hat keine Kopfzeile – und das Ende um 23:00 Uhr fehlt auch. Das baust du jetzt ein.',
    },
    {
      type: 'quiz',
      question: 'Eine bestehende Tabelle bekommt nachträglich eine Kopfzeile. Wo kommt sie hin?',
      options: ['Als erste Zeile direkt nach dem öffnenden Tabellen-Tag', 'Als letzte Zeile vor dem schließenden Tabellen-Tag', 'Vor die Tabelle, als eigener Absatz'],
      correct: 0,
      explanation: 'Die Kopfzeile beschriftet die Spalten – deshalb steht sie ganz oben in der Tabelle, als erste Zeile.',
    },
    {
      type: 'order',
      text: 'Bring die Preisliste in die richtige Reihenfolge – Kopfzeile zuerst, danach die Datenzeile.',
      lines: ['<table>', '  <tr>', '    <th>Snack</th>', '    <th>Preis</th>', '  </tr>', '  <tr><td>Kakao</td><td>1,20 €</td></tr>', '</table>'],
      explanation: 'Erst die Kopfzeile mit Kopfzellen, dann die Datenzeilen – und am Ende wird die Tabelle geschlossen.',
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Letzter Schliff auf der Startseite: Die Tabelle „Auf einen Blick“ bekommt oben eine Kopfzeile mit „Was“ und „Info“ und unten eine Zeile für das Ende um 23:00 Uhr.\n\nDanach lohnt sich ein Blick auf das Ergebnis: Am Ende der Lektion findest du den Knopf **FUNKEN-Website ansehen** – Startseite und Programm-Seite sind jetzt verbunden.',
    },
    { type: 'code', etappe: '07-tabellen/05-projekt-timetable' },
  ],
});

/* ================================================================
   Fragenpool
   ================================================================ */
schreibe('pool.json', {
  chapter: '07-tabellen',
  fragen: [
    { id: '07-01', konzept: 'html.table', type: 'quiz', question: 'Welches Element ist eine **Zeile** in einer Tabelle?', options: ['`<tr>`', '`<td>`', '`<table>`', '`<li>`'], correct: 0, explanation: '`<tr>` = table row. `<td>` ist eine Zelle, `<table>` die ganze Tabelle.' },
    { id: '07-02', konzept: 'html.table', type: 'fill', text: 'Vervollständige die Tabelle: Welches Element umschließt die Zellen?', template: '<table>\n  <___>\n    <td>Kakao</td>\n    <td>1,20 €</td>\n  </tr>\n</table>', accept: ['tr'], hint: 'Zellen stehen immer in einer Zeile – table row.' },
    { id: '07-03', konzept: 'html.table', type: 'order', text: 'Sortiere die Preisliste: Tabelle, Zeile, Zellen – erst der Snack, dann der Preis.', lines: ['<table>', '  <tr>', '    <td>Brezel</td>', '    <td>0,80 €</td>', '  </tr>', '</table>'], explanation: 'Tabelle → Zeile → Zellen, geschlossen von innen nach außen.' },
    { id: '07-04', konzept: 'html.table', type: 'pair', text: 'Ordne die Tabellen-Elemente zu.', pairs: [['`<table>`', 'die ganze Tabelle'], ['`<tr>`', 'eine Zeile'], ['`<td>`', 'eine Zelle mit Daten']] },
    { id: '07-05', konzept: 'html.table', type: 'bug', text: 'Das Wort „Deutsch“ steht über der Tabelle statt in seiner Zelle. Welche Zeile ist schuld?', lines: ['<table>', '  <tr>', '    <td>9:45</td>', '    <dt>Deutsch</dt>', '  </tr>', '</table>'], line: 3, explanation: 'Der Tag für eine Zelle heißt `td`, nicht `dt`. Vertippte Zellen-Tags landen über der Tabelle.' },
    { id: '07-06', konzept: 'html.table', type: 'quiz', question: 'Drei Zeilen mit je zwei Zellen – wie viele `<td>`-Elemente sind das?', options: ['6', '3', '2', '5'], correct: 0, explanation: 'Drei Zeilen × zwei Zellen = sechs Zellen.' },
    { id: '07-07', konzept: 'html.table', type: 'quiz', question: 'Wofür sind Tabellen in HTML gedacht?', options: ['Für Daten in Zeilen und Spalten – Stundenplan, Preise, Ergebnisse', 'Für das Seitenlayout – Navigation links, Inhalt rechts', 'Für lange Texte mit vielen Absätzen'], correct: 0, explanation: 'Tabellen sind für Daten. Layout regelt CSS, Texte gehören in Absätze.' },
    { id: '07-08', konzept: 'html.th', type: 'quiz', question: 'Was unterscheidet `<th>` von `<td>`?', options: ['`<th>` ist eine Kopfzelle: beschriftet die Spalte, fett und zentriert', '`<th>` macht die Zelle breiter', '`<th>` bekommt automatisch einen Rahmen'], correct: 0, explanation: '`th` = table header: eine Beschriftung, keine Daten. Der Browser zeigt sie fett und zentriert.' },
    { id: '07-09', konzept: 'html.th', type: 'fill', text: 'Vervollständige die Kopfzeile der Liga-Tabelle.', template: '<tr>\n  <___>Team</th>\n  <th>Punkte</th>\n</tr>', accept: ['th'], hint: 'Kopfzelle = table header.' },
    { id: '07-10', konzept: 'html.th', type: 'bug', text: 'In der Kopfzeile ist „Punkte“ nicht fett und nicht zentriert. Welche Zeile ist falsch?', lines: ['<tr>', '  <th>Team</th>', '  <td>Punkte</td>', '</tr>'], line: 2, explanation: 'In der Kopfzeile gehören alle Zellen als `th` geschrieben – „Punkte“ steht in einer Datenzelle.' },
    { id: '07-11', konzept: 'html.th', type: 'pair', text: 'Ordne die Begriffe zu.', pairs: [['Kopfzeile', 'erste Zeile der Tabelle – beschriftet die Spalten'], ['Kopfzelle', '`<th>` – fett und zentriert'], ['Datenzelle', '`<td>` – ein einzelner Wert']] },
    { id: '07-12', konzept: 'html.th', type: 'order', text: 'Sortiere die Preisliste: Kopfzeile zuerst, dann die Datenzeile.', lines: ['<table>', '<tr>', '<th>Snack</th>', '<th>Preis</th>', '</tr>', '<tr><td>Brezel</td><td>0,80 €</td></tr>', '</table>'], explanation: 'Die Kopfzeile mit den Kopfzellen steht ganz oben, danach folgen die Datenzeilen.' },
    { id: '07-13', konzept: 'html.colspan', type: 'quiz', question: 'Eine Zelle soll über **zwei Spalten** reichen. Welches Attribut brauchst du?', options: ['`colspan="2"`', '`rowspan="2"`', '`span="2"`', '`width="2"`'], correct: 0, explanation: 'colspan = column span, verbindet Spalten nach rechts. rowspan verbindet Zeilen nach unten.' },
    { id: '07-14', konzept: 'html.colspan', type: 'fill', text: 'Diese Zelle soll über zwei Spalten gehen. Welches Attribut fehlt?', template: '<td ___="2">Pause</td>', accept: ['colspan'], hint: 'Spalten heißen columns.' },
    { id: '07-15', konzept: 'html.colspan', type: 'bug', text: 'Die Pause soll über beide Spalten gehen, hängt aber nach unten in die nächste Zeile. Welche Zeile ist falsch?', lines: ['<tr>', '  <td>12:00</td>', '  <td rowspan="2">Pause</td>', '</tr>'], line: 2, explanation: 'rowspan verbindet nach unten über Zeilen. Für zwei Spalten nebeneinander brauchst du colspan.' },
    { id: '07-16', konzept: 'html.colspan', type: 'quiz', question: 'Eine Tabelle hat drei Spalten. Eine Zelle in der Zeile hat `colspan="2"`. Wie viele Zellen stehen in dieser Zeile?', options: ['2', '3', '4'], correct: 0, explanation: 'Die verbundene Zelle belegt zwei Spalten, eine normale Zelle die dritte: zwei Zellen.' },
    { id: '07-17', konzept: 'html.colspan', type: 'pair', text: 'Ordne die Attribute ihrer Wirkung zu.', pairs: [['`colspan="2"`', 'Zelle reicht über zwei Spalten – nach rechts'], ['`rowspan="2"`', 'Zelle reicht über zwei Zeilen – nach unten'], ['`colspan="3"`', 'Zelle reicht über drei Spalten']] },
    { id: '07-18', konzept: 'html.table', type: 'bug', text: 'Der Absatz „Preise in Euro“ erscheint über der Tabelle statt darunter. Welche Zeile ist falsch?', lines: ['<table>', '  <tr>', '    <td>Kakao</td>', '  </tr>', '</tabel>', '<p>Preise in Euro</p>'], line: 4, explanation: 'Der schließende Tag ist vertippt. Solange die Tabelle nicht geschlossen ist, schiebt der Browser den Absatz davor.' },
  ],
});

/* ================================================================
   Abnahme
   ================================================================ */
schreibe('boss.json', {
  chapter: '07-tabellen',
  title: 'Abnahme: Timetable',
  intro: 'Der Timetable ist das Wichtigste auf der ganzen Seite! Wenn da eine Band in der falschen Spalte steht, stehen zweihundert Leute vor der falschen Bühne. Zeigt mir, dass Zeilen, Spalten und die Pause sitzen.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'html.table', type: 'quiz', question: 'Eine Tabelle hat vier Zeilen mit je drei Zellen. Wie viele `<tr>` und wie viele `<td>` brauchst du?', options: ['4 tr und 12 td', '3 tr und 4 td', '12 tr und 4 td', '4 tr und 3 td'], correct: 0, explanation: 'Vier Zeilen = vier tr; in jeder drei Zellen = zwölf td.' },
    { konzept: 'html.th', type: 'fill', text: 'Vervollständige die Kopfzeile der Bühnen-Tabelle.', template: '<tr>\n  <___>Zeit</___>\n  <th>Bühne</th>\n</tr>', accept: [['th'], ['th']] },
    {
      type: 'code',
      task: '**Erstelle** unter der Überschrift die Highscore-Tabelle: Kopfzeile Platz, Name, Punkte – danach die Zeilen 1 mit Lena und 9870 sowie 2 mit Deniz und 8450.',
      starter: { html: '<h2>Highscore</h2>\n<!-- Hier kommt die Tabelle -->\n' },
      solution: { html: '<h2>Highscore</h2>\n<!-- Hier kommt die Tabelle -->\n<table>\n  <tr>\n    <th>Platz</th>\n    <th>Name</th>\n    <th>Punkte</th>\n  </tr>\n  <tr>\n    <td>1</td>\n    <td>Lena</td>\n    <td>9870</td>\n  </tr>\n  <tr>\n    <td>2</td>\n    <td>Deniz</td>\n    <td>8450</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'selector', selector: 'table tr:first-child th', count: 3, label: 'Die Kopfzeile hat drei Kopfzellen' },
        { type: 'text', selector: 'table th:first-child', expected: 'Platz', label: 'Die erste Kopfzelle lautet „Platz“' },
        { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
        { type: 'selector', selector: 'table td', count: 6, label: 'Es gibt sechs Datenzellen' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: '8450', label: 'Deniz hat 8450 Punkte' },
        { type: 'order', selectors: ['h2', 'table'], label: 'Die Tabelle steht unter der Überschrift' },
      ],
    },
    { konzept: 'html.img', type: 'pair', text: 'Ordne die Attribute und Elemente zu.', pairs: [['`src`', 'Datei, aus der das Bild kommt'], ['`alt`', 'Alternativtext, falls das Bild fehlt'], ['`<figcaption>`', 'Bildunterschrift im Bild-Block'], ['`controls`', 'Bedienelemente für Audio und Video']] },
    { konzept: 'html.a-mailto', type: 'quiz', question: 'Welcher Link öffnet das E-Mail-Programm?', options: ['`<a href="mailto:sam@beispiel.de">Mail</a>`', '`<a href="https://sam@beispiel.de">Mail</a>`', '`<a href="email:sam@beispiel.de">Mail</a>`'], correct: 0, explanation: 'E-Mail-Links beginnen in der Adresse mit `mailto:`.' },
    { konzept: 'html.colspan', type: 'order', text: 'Sortiere das Kinoprogramm: Kopfzeile zuerst, dann die Zeiten aufsteigend.', lines: ['<table>', '<tr><th>Zeit</th><th>Saal 1</th><th>Saal 2</th></tr>', '<tr><td>17:00</td><td>Robo-Rennen</td><td>Nachtjagd</td></tr>', '<tr><td>19:00</td><td colspan="2">Pause</td></tr>', '</table>'], explanation: 'Die Pausen-Zeile hat zwei Zellen, weil die verbundene Zelle beide Säle abdeckt.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Korrigiere** den Bühnenplan: Der Link „Zurück zur Startseite“ (Ziel index.html) ist nicht anklickbar, und die Pause um 19:00 hängt nach unten in die Zeile 20:00, statt über beide Bühnen zu reichen.',
      starter: {
        html: '<h2>Bühnenplan</h2>\n<p><a>Zurück zur Startseite</a></p>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>Bühne A</th>\n    <th>Bühne B</th>\n  </tr>\n  <tr>\n    <td>18:00</td>\n    <td>Sektor 7</td>\n    <td>Marla Funke</td>\n  </tr>\n  <tr>\n    <td>19:00</td>\n    <td rowspan="2">Pause</td>\n  </tr>\n  <tr>\n    <td>20:00</td>\n    <td>Basslager</td>\n    <td>Neonpuls</td>\n  </tr>\n</table>\n',
        css: HILFS_CSS,
      },
      editable: ['html'],
      solution: { html: '<h2>Bühnenplan</h2>\n<p><a href="index.html">Zurück zur Startseite</a></p>\n<table>\n  <tr>\n    <th>Zeit</th>\n    <th>Bühne A</th>\n    <th>Bühne B</th>\n  </tr>\n  <tr>\n    <td>18:00</td>\n    <td>Sektor 7</td>\n    <td>Marla Funke</td>\n  </tr>\n  <tr>\n    <td>19:00</td>\n    <td colspan="2">Pause</td>\n  </tr>\n  <tr>\n    <td>20:00</td>\n    <td>Basslager</td>\n    <td>Neonpuls</td>\n  </tr>\n</table>\n' },
      tests: [
        { type: 'attr', selector: 'a', attr: 'href', expected: 'index.html', label: 'Der Link führt zu index.html' },
        { type: 'attr', selector: 'td[colspan]', attr: 'colspan', expected: '2', label: 'Die Pause reicht über zwei Spalten' },
        { type: 'selector', selector: 'td[rowspan]', count: 0, label: 'Keine Zelle reicht nach unten' },
        { type: 'selector', selector: 'table tr:nth-child(3) td', count: 2, label: 'Die Pausen-Zeile hat zwei Zellen' },
        { type: 'text', selector: 'table tr:last-child td:last-child', expected: 'Neonpuls', label: 'Um 20:00 spielt Neonpuls auf Bühne B' },
      ],
    },
    { konzept: 'html.strong-em', type: 'quiz', question: 'Welches Element betont ein Wort **leicht** – der Browser zeigt es kursiv?', options: ['`<em>`', '`<strong>`', '`<br>`'], correct: 0, explanation: '`em` = leichte Betonung (kursiv), `strong` = starke Betonung (fett), `br` ist ein Zeilenumbruch.' },
    { konzept: 'html.colspan', type: 'bug', text: 'Die Pause soll über beide Spalten gehen, belegt aber nur eine. Welche Zeile ist falsch?', lines: ['<tr>', '  <td>12:00</td>', '  <td colspann="2">Pause</td>', '</tr>'], line: 2, explanation: 'Das Attribut heißt `colspan` – bei einem Tippfehler ignoriert der Browser es einfach.' },
    { konzept: 'html.entity', type: 'fill', text: 'Vervollständige die Zelle: Das &-Zeichen muss als Entity geschrieben werden.', template: '<td>Pizza ___ Pasta</td>', accept: ['&amp;'] },
  ],
});

console.log('Kapitel 07 geschrieben');
