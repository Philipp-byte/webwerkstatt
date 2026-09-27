// Kapitel 09 – Formulare (Station „Ticket-Schalter“).
// Erzeugt public/content/chapters/09-formulare/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '09-formulare');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Lektion 1: form als Rahmen, label ↔ input über for und id verbunden
const FIG_FORMULAR = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="22" y="22" fill="#ff7a45" font-family="monospace" font-size="13">&lt;form&gt;</text><text x="298" y="22" text-anchor="end" fill="#4ade80" font-weight="bold">Beschriftung ↔ Feld</text><rect x="16" y="30" width="288" height="118" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="30" y="58" fill="#38c7ff" font-weight="bold">Name</text><rect x="110" y="40" width="170" height="26" rx="4" fill="#0f1320" stroke="#38c7ff" stroke-width="2"/><text x="120" y="58" fill="#eef2ff">Sam</text><path d="M46 64 V82 H196 V70" stroke="#4ade80" stroke-width="2" fill="none"/><text x="30" y="98" fill="#4ade80" font-family="monospace" font-size="12">for="name"</text><text x="150" y="98" fill="#4ade80" font-family="monospace" font-size="12">id="name"</text><text x="30" y="128" fill="#38c7ff" font-weight="bold">E-Mail</text><rect x="110" y="110" width="170" height="26" rx="4" fill="#0f1320" stroke="#38c7ff" stroke-width="2"/><text x="120" y="128" fill="#eef2ff">sam@beispiel.de</text></svg>`;

// Lektion 2: drei Auswahl-Elemente – select, radio, checkbox
const FIG_AUSWAHL = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="60" y="34" text-anchor="middle" fill="#ff7a45" font-family="monospace" font-size="13">select</text><rect x="14" y="48" width="92" height="28" rx="5" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="22" y="67" fill="#eef2ff">Festivalpass ▾</text><text x="60" y="122" text-anchor="middle" fill="#eef2ff">eins aus vielen</text><text x="160" y="34" text-anchor="middle" fill="#38c7ff" font-family="monospace" font-size="13">radio</text><circle cx="128" cy="60" r="7" fill="#38c7ff"/><text x="142" y="65" fill="#eef2ff">Ja</text><circle cx="128" cy="86" r="7" fill="none" stroke="#38c7ff" stroke-width="2"/><text x="142" y="91" fill="#eef2ff">Nein</text><text x="160" y="122" text-anchor="middle" fill="#eef2ff">eins aus wenigen</text><text x="260" y="34" text-anchor="middle" fill="#ffd84d" font-family="monospace" font-size="13">checkbox</text><rect x="222" y="52" width="14" height="14" rx="2" fill="none" stroke="#ffd84d" stroke-width="2"/><path d="M225 59 l3 4 l7 -8" stroke="#ffd84d" stroke-width="2" fill="none"/><text x="244" y="65" fill="#eef2ff">Käse</text><rect x="222" y="78" width="14" height="14" rx="2" fill="none" stroke="#ffd84d" stroke-width="2"/><text x="244" y="91" fill="#eef2ff">Scharf</text><text x="260" y="122" text-anchor="middle" fill="#eef2ff">mehrere möglich</text></svg>`;

// Lektion 3: Absenden = Anfrage mit Daten an den Server, Antwort zurück
const FIG_ABSENDEN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">Klick auf den Absende-Knopf</text><rect x="14" y="36" width="100" height="100" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="24" y="58" fill="#eef2ff">Name: Sam</text><text x="24" y="78" fill="#eef2ff">E-Mail: sam@…</text><rect x="24" y="94" width="80" height="26" rx="4" fill="#ff7a45"/><text x="64" y="112" text-anchor="middle" fill="#0f1320" font-weight="bold">Absenden</text><path d="M120 70 H210" stroke="#ffd84d" stroke-width="2" marker-end="url(#m9y)"/><text x="168" y="60" text-anchor="middle" fill="#ffd84d">Anfrage + Daten</text><text x="168" y="86" text-anchor="middle" fill="#ffd84d" font-family="monospace" font-size="12">name=Sam&amp;…</text><path d="M216 112 H126" stroke="#4ade80" stroke-width="2" marker-end="url(#m9g)"/><text x="168" y="128" text-anchor="middle" fill="#4ade80">Antwort: Danke!</text><rect x="222" y="36" width="84" height="100" rx="8" fill="#1b2135" stroke="#4ade80" stroke-width="2"/><text x="264" y="62" text-anchor="middle" fill="#4ade80" font-weight="bold">Server</text><text x="264" y="84" text-anchor="middle" fill="#eef2ff">Programm</text><text x="264" y="102" text-anchor="middle" fill="#eef2ff">nimmt Daten an</text><defs><marker id="m9y" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker><marker id="m9g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#4ade80"/></marker></defs></svg>`;

/* ---------- Lektion 1: Eingabefelder und Labels ---------- */
schreibe('lessons/01-eingabefelder-und-labels.json', {
  id: '01-eingabefelder-und-labels',
  title: 'Eingabefelder und Labels',
  konzepte: ['html.form', 'html.input', 'html.label'],
  steps: [
    {
      type: 'explain',
      text: 'Sam stöhnt: „Die Leute wollen Tickets reservieren – und ich sammle ihre Namen per Sprachnachricht.“ Bis jetzt zeigt unsere Website nur Inhalte. Jetzt soll sie etwas **entgegennehmen**: Name, E-Mail, Ticketwunsch.\n\nDafür gibt es **Formulare**. Das Element `<form>` ist der Rahmen, darin liegen **Eingabefelder** – jedes ein `<input>`. Beim Absenden gehen die Eingaben an den Server.',
      figure: FIG_FORMULAR,
    },
    {
      type: 'example',
      text: 'Ein Formular mit einem Textfeld. `<input>` ist ein **leeres Element** – es hat keinen schließenden Tag, genau wie `<img>` und `<br>`. **Tippe** etwas ins Feld. **Ändere** dann `type="text"` in `type="number"` und versuch, Buchstaben einzugeben. Probiere auch `type="password"`.',
      html: '<h1>Anmeldung Hallenturnier</h1>\n<form>\n  <p>Wie heißt dein Team?</p>\n  <input type="text" name="team">\n</form>\n',
    },
    {
      type: 'quiz',
      question: 'Wie schreibst du ein Textfeld richtig?',
      options: ['`<input type="text" name="team">`', '`<input type="text" name="team"></input>`', '`<text name="team">`'],
      correct: 0,
      explanation: '`<input>` ist ein leeres Element ohne schließenden Tag. Ein Element `<text>` gibt es in HTML nicht – die Art des Feldes steht immer im Attribut `type`.',
    },
    {
      type: 'code',
      task: '**Erstelle** im Formular an der Stelle des Kommentars ein Textfeld für den Teamnamen; die Eingabe trägt den Namen `team`.',
      starter: {
        html: '<h1>Anmeldung Hallenturnier</h1>\n<p>Trag dein Team ein – Anmeldeschluss ist Freitag.</p>\n<form>\n  <p>Teamname:</p>\n  <!-- hier kommt das Textfeld -->\n</form>\n',
      },
      hints: [
        'Ein Eingabefeld ist ein `input`-Element. Die Art des Feldes steht im Attribut `type`, der Name der Eingabe im Attribut `name`.',
        'Muster aus einem anderen Kontext: `<input type="text" name="stadt">` – ein Textfeld, dessen Eingabe stadt heißt.',
        'Das Feld steht zwischen `<form>` und `</form>` an der Stelle des Kommentars – ohne schließenden Tag.',
      ],
      solution: {
        html: '<h1>Anmeldung Hallenturnier</h1>\n<p>Trag dein Team ein – Anmeldeschluss ist Freitag.</p>\n<form>\n  <p>Teamname:</p>\n  <input type="text" name="team">\n</form>\n',
      },
      tests: [
        { type: 'selector', selector: 'form input', count: 1, label: 'Im Formular steht genau ein Eingabefeld' },
        { type: 'attr', selector: 'form input', attr: 'type', expected: 'text', label: 'Das Feld ist ein Textfeld' },
        { type: 'attr', selector: 'form input', attr: 'name', expected: 'team', label: 'Die Eingabe heißt „team“' },
      ],
    },
    {
      type: 'explain',
      text: 'Das Attribut **type** bestimmt, was das Feld annimmt – der Browser prüft die Eingabe gleich mit:\n\n- `text` – beliebiger Text\n- `email` – muss wie eine E-Mail-Adresse aussehen (mit @)\n- `number` – nur Zahlen; mit `min` und `max` setzt du Grenzen\n\n```html\n<input type="email" name="mail">\n<input type="number" name="alter" min="16" max="19">\n```\n\nDas Attribut **name** ist der Name der Eingabe: Beim Absenden bekommt der Server zum Beispiel `alter=17`.',
    },
    {
      type: 'fill',
      text: 'Vervollständige die beiden Felder: Das erste prüft auf eine E-Mail-Adresse, das zweite nimmt nur Zahlen an.',
      template: '<input type="___" name="mail">\n<input type="___" name="anzahl" min="1" max="5">',
      accept: [['email'], ['number']],
      hint: 'Die Feldtypen aus der Liste: einer für E-Mail-Adressen, einer für Zahlen.',
    },
    {
      type: 'explain',
      text: 'Ein Feld ohne **Beschriftung** ist ein Rätsel: Was soll da rein? Dafür gibt es das Element `<label>`.\n\n```html\n<label for="stadt">Stadt</label>\n<input type="text" id="stadt" name="stadt">\n```\n\nDas Attribut `for` nennt die **id** des Feldes – so sind beide verbunden. Der Gewinn: Ein Klick auf die Beschriftung setzt den Cursor ins Feld, und Vorlese-Programme (**Screenreader**) sagen zum Feld die passende Beschriftung an.',
    },
    {
      type: 'code',
      task: '**Ergänze** im Formular unter dem Vornamen ein zweites Feld: die Beschriftung „E-Mail“, verbunden mit einem E-Mail-Feld, dessen id und Name `email` lauten.',
      starter: {
        html: '<h1>Fahrschule Neckarblick</h1>\n<p>Anmeldung zur Theorieprüfung</p>\n<form>\n  <label for="vorname">Vorname</label>\n  <input type="text" id="vorname" name="vorname">\n</form>\n',
      },
      hints: [
        'Beschriftung und Feld sind zwei Elemente: erst das `label`, dann das `input`. Verbunden werden sie über `for` und `id`.',
        'Der Feldtyp für E-Mail-Adressen heißt `email`. Muster mit einem anderen Feld: `<label for="ort">Ort</label>` und darunter `<input type="text" id="ort" name="ort">`.',
        'Aufbau: `<label for="…">E-Mail</label>` und `<input type="…" id="…" name="…">` – die Lücken mit Typ und id aus der Aufgabe füllen.',
      ],
      solution: {
        html: '<h1>Fahrschule Neckarblick</h1>\n<p>Anmeldung zur Theorieprüfung</p>\n<form>\n  <label for="vorname">Vorname</label>\n  <input type="text" id="vorname" name="vorname">\n\n  <label for="email">E-Mail</label>\n  <input type="email" id="email" name="email">\n</form>\n',
      },
      tests: [
        { type: 'text', selector: 'label[for="email"]', expected: 'E-Mail', label: 'Die Beschriftung „E-Mail“ gehört zum Feld mit der id email' },
        { type: 'attr', selector: 'input#email', attr: 'type', expected: 'email', label: 'Das Feld hat den Typ email' },
        { type: 'attr', selector: 'input#email', attr: 'name', expected: 'email', label: 'Die Eingabe heißt „email“' },
        { type: 'order', selectors: ['input#vorname', 'label[for="email"]', 'input#email'], label: 'Das E-Mail-Feld steht unter dem Vornamen, die Beschriftung davor' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Attribute eines Eingabefelds ihrer Aufgabe zu.',
      pairs: [
        ['`type`', 'Art des Feldes: Text, E-Mail oder Zahl'],
        ['`name`', 'Name der Eingabe – so kommt sie beim Server an'],
        ['`id`', 'eindeutige Kennung des Feldes, Ziel für das Label'],
        ['`for`', 'steht im Label und nennt die id des Feldes'],
        ['`min`', 'kleinster erlaubter Wert im Zahlenfeld'],
      ],
    },
    {
      type: 'code',
      task: '**Erstelle** im Formular drei beschriftete Felder: „Name“ als Textfeld (id und Name `name`), „E-Mail“ als E-Mail-Feld (id und Name `email`) und „Alter“ als Zahlenfeld (id und Name `alter`), das nur Werte von 16 bis 19 zulässt.',
      starter: {
        html: '<h1>Probetraining im Kraftraum</h1>\n<p>Kostenlos für Schülerinnen und Schüler – trag dich ein.</p>\n<form>\n</form>\n',
      },
      hints: [
        'Drei Paare aus Beschriftung und Feld. Das Zahlenfeld bekommt zusätzlich die Attribute für den kleinsten und den größten Wert.',
        'Muster für ein Zahlenfeld mit Grenzen aus einem anderen Kontext: `<input type="number" id="anzahl" name="anzahl" min="1" max="5">`',
        'Je Feld: `<label for="…">…</label>` und `<input type="…" id="…" name="…">` – Typen text, email, number; beim Alter zusätzlich die Grenzen.',
      ],
      solution: {
        html: '<h1>Probetraining im Kraftraum</h1>\n<p>Kostenlos für Schülerinnen und Schüler – trag dich ein.</p>\n<form>\n  <label for="name">Name</label>\n  <input type="text" id="name" name="name">\n\n  <label for="email">E-Mail</label>\n  <input type="email" id="email" name="email">\n\n  <label for="alter">Alter</label>\n  <input type="number" id="alter" name="alter" min="16" max="19">\n</form>\n',
      },
      tests: [
        { type: 'selector', selector: 'form label', count: 3, label: 'Im Formular stehen drei Beschriftungen' },
        { type: 'attr', selector: 'input#name[name="name"]', attr: 'type', expected: 'text', label: 'Das Namensfeld ist ein Textfeld' },
        { type: 'attr', selector: 'input#email[name="email"]', attr: 'type', expected: 'email', label: 'Das E-Mail-Feld hat den Typ email' },
        { type: 'text', selector: 'label[for="alter"]', expected: 'Alter', label: 'Die Beschriftung „Alter“ gehört zum Altersfeld' },
        { type: 'attr', selector: 'input#alter[name="alter"][type="number"]', attr: 'min', expected: '16', label: 'Das Zahlenfeld „Alter“ erlaubt mindestens 16' },
        { type: 'attr', selector: 'input#alter', attr: 'max', expected: '19', label: 'Das Altersfeld erlaubt höchstens 19' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Okay, jetzt wird es ernst: der Ticket-Schalter! Eine ganz neue Seite – tickets.html – mit allem, was die anderen Seiten auch haben: Kopfbereich, Navigation zu den drei anderen Seiten, Hauptbereich, Fußbereich mit unserer Adresse.\n\nUnd im Hauptbereich das Formular, erst mal nur Name und E-Mail. Beschriftet bitte, ich will keine Rätselfelder. Ticketart und Rest bauen wir danach.',
    },
    { type: 'code', etappe: '09-formulare/01-eingabefelder-und-labels' },
  ],
});

/* ---------- Lektion 2: Auswahlfelder ---------- */
schreibe('lessons/02-auswahlfelder.json', {
  id: '02-auswahlfelder',
  title: 'Auswahlfelder',
  konzepte: ['html.select', 'html.radio-checkbox'],
  steps: [
    {
      type: 'explain',
      text: 'Sam will wissen, welche **Ticketart** jemand möchte. In ein Textfeld tippen die Leute „Festivalpass“, „festival pass“ oder „Pass fürs ganze WE“ – Chaos. Besser: feste Auswahl.\n\nHTML kennt drei Auswahl-Elemente:\n\n- **Auswahlliste** (`select`): Klappliste – eins aus vielen\n- **Optionsfelder** (Radio): runde Knöpfe, alle sichtbar – eins aus wenigen\n- **Kontrollkästchen** (Checkbox): Häkchen – an oder aus, mehrere möglich',
      figure: FIG_AUSWAHL,
    },
    {
      type: 'example',
      text: 'Eine Auswahlliste: `<select>` ist die Liste, jedes `<option>` ein Eintrag. Der sichtbare Text steht zwischen den Tags; das Attribut `value` ist der Wert, der beim Absenden an den Server geht. **Ergänze** eine vierte Option „Family“ und **ändere** den Text „Mittel“ in „Medium“.',
      html: '<h1>Pizza-Bestellung</h1>\n<form>\n  <label for="groesse">Größe</label>\n  <select id="groesse" name="groesse">\n    <option value="klein">Klein</option>\n    <option value="mittel">Mittel</option>\n    <option value="gross">Groß</option>\n  </select>\n</form>\n',
    },
    {
      type: 'quiz',
      question: 'Beim Absenden bekommt der Server `groesse=gross`. Woher kommt „gross“?',
      options: ['Aus dem Attribut `value` der gewählten Option', 'Aus dem sichtbaren Text der Option', 'Aus dem Attribut `for` der Beschriftung'],
      correct: 0,
      explanation: 'Der Server bekommt immer `name=value`: den Namen der Auswahlliste und den Wert der gewählten Option – nicht den angezeigten Text.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter der Beschriftung eine Auswahlliste mit der id und dem Namen `boden` und drei Einträgen: „Klassisch“ (Wert klassisch), „Dünn“ (Wert duenn) und „Käserand“ (Wert kaeserand).',
      starter: {
        html: '<h1>Pizza-Bestellung</h1>\n<form>\n  <label for="boden">Boden</label>\n  <!-- hier kommt die Auswahlliste -->\n</form>\n',
      },
      hints: [
        'Die Liste ist ein `select`-Element mit id und name; jeder Eintrag darin ist ein `option`-Element.',
        'Muster aus einem anderen Kontext: `<option value="cola">Cola</option>` – Wert im Attribut, sichtbarer Text zwischen den Tags.',
        'Aufbau: `<select id="…" name="…">`, darin drei `<option value="…">…</option>`, dann `</select>`.',
      ],
      solution: {
        html: '<h1>Pizza-Bestellung</h1>\n<form>\n  <label for="boden">Boden</label>\n  <select id="boden" name="boden">\n    <option value="klassisch">Klassisch</option>\n    <option value="duenn">Dünn</option>\n    <option value="kaeserand">Käserand</option>\n  </select>\n</form>\n',
      },
      tests: [
        { type: 'selector', selector: 'select#boden[name="boden"]', count: 1, label: 'Die Auswahlliste „boden“ ist da' },
        { type: 'selector', selector: 'select#boden option', count: 3, label: 'Die Liste hat drei Einträge' },
        { type: 'text', selector: 'select#boden option:first-child', expected: 'Klassisch', label: 'Der erste Eintrag heißt „Klassisch“' },
        { type: 'attr', selector: 'select#boden option:last-child', attr: 'value', expected: 'kaeserand', label: 'Der letzte Eintrag hat den Wert kaeserand' },
      ],
    },
    {
      type: 'explain',
      text: 'Für **eins aus wenigen** – bar oder mit Karte zahlen – nimmst du **Optionsfelder**: `<input type="radio">`.\n\n```html\n<input type="radio" id="bar" name="zahlung" value="bar">\n<label for="bar">Bar</label>\n<input type="radio" id="karte" name="zahlung" value="karte">\n<label for="karte">Karte</label>\n```\n\nDer gleiche **name** macht die Felder zur **Gruppe** – nur eins lässt sich wählen. Jedes Feld hat eine eigene id und einen eigenen `value`. Die Beschriftung steht hier **hinter** dem Feld.',
    },
    {
      type: 'fill',
      text: 'Zwei Optionsfelder für die Sauce sollen eine Gruppe bilden – nur eine Sauce lässt sich wählen. Vervollständige Typ und Gruppenname.',
      template: '<input type="___" id="tomate" name="sauce" value="tomate">\n<label for="tomate">Tomate</label>\n<input type="radio" id="bbq" name="___" value="bbq">\n<label for="bbq">BBQ</label>',
      accept: [['radio'], ['sauce']],
      hint: 'Der Typ heißt wie der runde Knopf; der Gruppenname ist bei beiden Feldern derselbe.',
    },
    {
      type: 'code',
      task: '**Ergänze** unter der Frage zwei Optionsfelder mit dem gemeinsamen Namen `lieferung`, jeweils mit Beschriftung dahinter: „Abholen“ (id und Wert `abholen`) und „Liefern“ (id und Wert `liefern`).',
      starter: {
        html: '<h1>Pizza-Bestellung</h1>\n<form>\n  <label for="boden">Boden</label>\n  <select id="boden" name="boden">\n    <option value="klassisch">Klassisch</option>\n    <option value="duenn">Dünn</option>\n    <option value="kaeserand">Käserand</option>\n  </select>\n\n  <p>Wie bekommst du die Pizza?</p>\n  <!-- hier kommen die Optionsfelder -->\n</form>\n',
      },
      hints: [
        'Optionsfelder sind `input`-Elemente mit dem Typ radio. Derselbe name macht sie zur Gruppe.',
        'Muster mit einer anderen Gruppe: `<input type="radio" id="bar" name="zahlung" value="bar">` und dahinter `<label for="bar">Bar</label>`.',
        'Aufbau: `<input type="radio" id="…" name="…" value="…">` und dahinter `<label for="…">…</label>` – zweimal, mit den Werten aus der Aufgabe.',
      ],
      solution: {
        html: '<h1>Pizza-Bestellung</h1>\n<form>\n  <label for="boden">Boden</label>\n  <select id="boden" name="boden">\n    <option value="klassisch">Klassisch</option>\n    <option value="duenn">Dünn</option>\n    <option value="kaeserand">Käserand</option>\n  </select>\n\n  <p>Wie bekommst du die Pizza?</p>\n  <input type="radio" id="abholen" name="lieferung" value="abholen">\n  <label for="abholen">Abholen</label>\n  <input type="radio" id="liefern" name="lieferung" value="liefern">\n  <label for="liefern">Liefern</label>\n</form>\n',
      },
      tests: [
        { type: 'selector', selector: 'input[type="radio"][name="lieferung"]', count: 2, label: 'Zwei Optionsfelder gehören zur Gruppe „lieferung“' },
        { type: 'attr', selector: 'input[type="radio"]#abholen', attr: 'value', expected: 'abholen', label: 'Das Feld „abholen“ hat den Wert abholen' },
        { type: 'text', selector: 'label[for="abholen"]', expected: 'Abholen', label: 'Die Beschriftung „Abholen“ gehört zum ersten Feld' },
        { type: 'text', selector: 'label[for="liefern"]', expected: 'Liefern', label: 'Die Beschriftung „Liefern“ gehört zum zweiten Feld' },
        { type: 'order', selectors: ['p', 'input#abholen', 'input#liefern'], label: 'Die Felder stehen unter der Frage, Abholen zuerst' },
      ],
    },
    {
      type: 'explain',
      text: 'Für **an oder aus** – Newsletter ja oder nein – gibt es das **Kontrollkästchen**: `<input type="checkbox">`.\n\n```html\n<input type="checkbox" id="news" name="news">\n<label for="news">Newsletter abonnieren</label>\n```\n\nJedes Kästchen ist unabhängig: keins, eins oder alle ankreuzen. Deshalb bekommt jedes seinen **eigenen** name. Auch hier steht das Label hinter dem Feld.\n\nMerksatz: Radio = **eins** aus der Gruppe, Checkbox = **jedes für sich**.',
    },
    {
      type: 'pair',
      text: 'Welches Element passt zu welcher Situation?',
      pairs: [
        ['`<select>`', 'eins aus vielen – als Klappliste'],
        ['`<option>`', 'ein Eintrag in der Auswahlliste'],
        ['`type="radio"`', 'eins aus wenigen – alle Möglichkeiten sichtbar'],
        ['`type="checkbox"`', 'an oder aus – mehrere Kästchen möglich'],
        ['gleicher `name`', 'macht Optionsfelder zu einer Gruppe'],
      ],
    },
    {
      type: 'code',
      task: '**Erweitere** das Formular am Ende um zwei Kontrollkästchen mit Beschriftung dahinter: „Extra Käse“ (id und Name `kaese`) und „Extra scharf“ (id und Name `scharf`). Beide lassen sich unabhängig voneinander ankreuzen.',
      starter: {
        html: '<h1>Pizza-Bestellung</h1>\n<form>\n  <label for="boden">Boden</label>\n  <select id="boden" name="boden">\n    <option value="klassisch">Klassisch</option>\n    <option value="duenn">Dünn</option>\n    <option value="kaeserand">Käserand</option>\n  </select>\n\n  <p>Wie bekommst du die Pizza?</p>\n  <input type="radio" id="abholen" name="lieferung" value="abholen">\n  <label for="abholen">Abholen</label>\n  <input type="radio" id="liefern" name="lieferung" value="liefern">\n  <label for="liefern">Liefern</label>\n\n  <p>Extras:</p>\n</form>\n',
      },
      hints: [
        'Kontrollkästchen sind `input`-Elemente mit dem Typ checkbox – jedes mit eigener id und eigenem name.',
        'Muster aus einem anderen Kontext: `<input type="checkbox" id="news" name="news">` und dahinter `<label for="news">Newsletter</label>`.',
        'Aufbau: zweimal `<input type="checkbox" id="…" name="…">` mit `<label for="…">…</label>` dahinter – ids und Texte aus der Aufgabe.',
      ],
      solution: {
        html: '<h1>Pizza-Bestellung</h1>\n<form>\n  <label for="boden">Boden</label>\n  <select id="boden" name="boden">\n    <option value="klassisch">Klassisch</option>\n    <option value="duenn">Dünn</option>\n    <option value="kaeserand">Käserand</option>\n  </select>\n\n  <p>Wie bekommst du die Pizza?</p>\n  <input type="radio" id="abholen" name="lieferung" value="abholen">\n  <label for="abholen">Abholen</label>\n  <input type="radio" id="liefern" name="lieferung" value="liefern">\n  <label for="liefern">Liefern</label>\n\n  <p>Extras:</p>\n  <input type="checkbox" id="kaese" name="kaese">\n  <label for="kaese">Extra Käse</label>\n  <input type="checkbox" id="scharf" name="scharf">\n  <label for="scharf">Extra scharf</label>\n</form>\n',
      },
      tests: [
        { type: 'selector', selector: 'input[type="checkbox"]', count: 2, label: 'Es gibt zwei Kontrollkästchen' },
        { type: 'selector', selector: 'input[type="checkbox"]#kaese[name="kaese"]', count: 1, label: 'Das Kästchen „kaese“ ist da' },
        { type: 'text', selector: 'label[for="kaese"]', expected: 'Extra Käse', label: 'Die Beschriftung „Extra Käse“ gehört zum Kästchen kaese' },
        { type: 'text', selector: 'label[for="scharf"]', expected: 'Extra scharf', label: 'Die Beschriftung „Extra scharf“ gehört zum Kästchen scharf' },
        { type: 'order', selectors: ['input#liefern', 'input#kaese', 'input#scharf'], label: 'Die Kästchen stehen nach den Optionsfeldern, Käse zuerst' },
        { type: 'selector', selector: 'select#boden option', count: 3, label: 'Die Auswahlliste ist noch vollständig' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Ab zur FUNKEN-Website: Das Ticketformular bekommt die Ticketart als Auswahlliste – drei feste Einträge, keine Tippfehler mehr für Sam. Danach die Newsletter-Frage als zwei Optionsfelder: Ja oder Nein, aber nie beides.\n\nDenk an die Beschriftungen: bei der Liste davor, bei den Optionsfeldern dahinter – und immer über for und id verbunden.',
    },
    { type: 'code', etappe: '09-formulare/02-auswahlfelder' },
  ],
});

/* ---------- Lektion 3: Textarea und Knöpfe ---------- */
schreibe('lessons/03-textarea-und-knoepfe.json', {
  id: '03-textarea-und-knoepfe',
  title: 'Textarea und Knöpfe',
  konzepte: ['html.textarea', 'html.button'],
  steps: [
    {
      type: 'explain',
      text: 'Nach dem Festival will Sam eine **Umfrage**: „Was war gut, was hat gefehlt?“ In ein `<input>` passt eine Zeile – für Meinungen zu wenig.\n\nDafür gibt es den **Textbereich** `<textarea>`: mehrzeilig, an der Ecke größer ziehbar, mit **öffnendem und schließendem Tag**.\n\n```html\n<label for="meinung">Deine Meinung</label>\n<textarea id="meinung" name="meinung"></textarea>\n```\n\nZwischen den Tags steht nichts – was dort stünde, wäre die Vorbelegung des Feldes.',
    },
    {
      type: 'example',
      text: 'Ein Textbereich zum Ausprobieren; `rows` legt fest, wie viele Zeilen sichtbar sind. **Tippe** mehrere Zeilen hinein – Enter macht einen Umbruch. **Ändere** `rows="3"` in `rows="8"`. **Schreib** dann ein Wort zwischen die beiden Tags und schau, wo es auftaucht.',
      html: '<h1>Festival-Umfrage</h1>\n<form>\n  <label for="feedback">Was war gut?</label>\n  <textarea id="feedback" name="feedback" rows="3"></textarea>\n</form>\n',
    },
    {
      type: 'quiz',
      question: 'Welche Zeile erzeugt ein mehrzeiliges Textfeld richtig?',
      options: ['`<textarea id="kommentar" name="kommentar"></textarea>`', '`<input type="textarea" name="kommentar">`', '`<textarea id="kommentar" name="kommentar">`'],
      correct: 0,
      explanation: '`textarea` ist ein eigenes Element mit schließendem Tag. Einen `input`-Typ „textarea“ gibt es nicht – und ohne `</textarea>` steckt der Browser alles Folgende ins Feld.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter der Beschriftung „Was hat gefehlt?“ einen mehrzeiligen Textbereich, dessen id und Name `wunsch` lauten.',
      starter: {
        html: '<h1>Festival-Umfrage</h1>\n<p>Drei Fragen, zwei Minuten – danke!</p>\n<form>\n  <label for="highlight">Dein Highlight</label>\n  <input type="text" id="highlight" name="highlight">\n\n  <label for="wunsch">Was hat gefehlt?</label>\n  <!-- hier kommt der Textbereich -->\n</form>\n',
      },
      hints: [
        'Der mehrzeilige Textbereich ist ein eigenes Element – nicht `input`. Es hat einen öffnenden und einen schließenden Tag.',
        'Muster aus einem anderen Kontext: `<textarea id="notiz" name="notiz"></textarea>`',
        'An die Stelle des Kommentars: `<textarea id="…" name="…"></textarea>` mit dem Namen aus der Aufgabe.',
      ],
      solution: {
        html: '<h1>Festival-Umfrage</h1>\n<p>Drei Fragen, zwei Minuten – danke!</p>\n<form>\n  <label for="highlight">Dein Highlight</label>\n  <input type="text" id="highlight" name="highlight">\n\n  <label for="wunsch">Was hat gefehlt?</label>\n  <textarea id="wunsch" name="wunsch"></textarea>\n</form>\n',
      },
      tests: [
        { type: 'selector', selector: 'textarea#wunsch[name="wunsch"]', count: 1, label: 'Der Textbereich „wunsch“ ist da' },
        { type: 'selector', selector: 'form textarea', count: 1, label: 'Im Formular steht genau ein Textbereich' },
        { type: 'order', selectors: ['label[for="wunsch"]', 'textarea#wunsch'], label: 'Der Textbereich steht unter seiner Beschriftung' },
        { type: 'selector', selector: 'input#highlight', count: 1, label: 'Das Highlight-Feld ist noch da' },
      ],
    },
    {
      type: 'explain',
      text: 'Bis jetzt kann niemand das Formular **abschicken**. Dafür gibt es den **Knopf** – `type="submit"` heißt: Dieser Knopf sendet.\n\n```html\n<button type="submit">Abschicken</button>\n```\n\nBeim Klick sammelt der Browser alle Eingaben als `name=wert`-Paare und schickt sie als **Anfrage** an den Server – wie beim Seitenaufruf, nur mit Daten im Gepäck. Dort muss ein Programm die Daten annehmen; das ist nicht mehr HTML.\n\nIn der Werkbank wird das Absenden **abgefangen** – die Seite bleibt, wie sie ist.',
      figure: FIG_ABSENDEN,
    },
    {
      type: 'fill',
      text: 'Vervollständige den Knopf, der die Anmeldung abschickt.',
      template: '<___ type="___">Jetzt anmelden</button>',
      accept: [['button'], ['submit']],
      hint: 'Erst der Name des Knopf-Elements, dann der Typ, der das Formular abschickt.',
    },
    {
      type: 'explain',
      text: 'Ohne Namen kann Sam kein Ticket reservieren. Solche **Pflichtfelder** bekommen das Attribut `required` – ohne Wert:\n\n```html\n<input type="text" id="vorname" name="vorname" required>\n```\n\nBeim Klick auf den Absende-Knopf prüft der Browser zuerst: Sind alle Pflichtfelder gefüllt, sieht die E-Mail wie eine E-Mail aus, liegt die Zahl zwischen min und max? Wenn nicht, zeigt er einen Hinweis am Feld und schickt **nichts** ab. Das siehst du auch in der Werkbank-Vorschau.',
    },
    {
      type: 'code',
      task: '**Erweitere** das Formular: 1. Das Feld „Dein Highlight“ wird zum Pflichtfeld. 2. Am Ende kommt ein Knopf mit dem Text „Umfrage abschicken“, der das Formular absendet.',
      starter: {
        html: '<h1>Festival-Umfrage</h1>\n<p>Drei Fragen, zwei Minuten – danke!</p>\n<form>\n  <label for="highlight">Dein Highlight</label>\n  <input type="text" id="highlight" name="highlight">\n\n  <label for="wunsch">Was hat gefehlt?</label>\n  <textarea id="wunsch" name="wunsch"></textarea>\n</form>\n',
      },
      hints: [
        'Ein Pflichtfeld erkennt der Browser an einem Attribut ohne Wert. Der Knopf ist ein eigenes Element mit einem Typ, der absendet.',
        'Muster aus einem anderen Kontext: `<input type="email" id="mail" name="mail" required>` und `<button type="submit">Los</button>`',
        'Das Attribut kommt ans Ende des öffnenden input-Tags von „highlight“; der Knopf `<button type="…">…</button>` kommt vor `</form>`.',
      ],
      solution: {
        html: '<h1>Festival-Umfrage</h1>\n<p>Drei Fragen, zwei Minuten – danke!</p>\n<form>\n  <label for="highlight">Dein Highlight</label>\n  <input type="text" id="highlight" name="highlight" required>\n\n  <label for="wunsch">Was hat gefehlt?</label>\n  <textarea id="wunsch" name="wunsch"></textarea>\n\n  <button type="submit">Umfrage abschicken</button>\n</form>\n',
      },
      tests: [
        { type: 'attr', selector: 'input#highlight', attr: 'required', present: true, label: 'Das Highlight-Feld ist ein Pflichtfeld' },
        { type: 'text', selector: 'form button[type="submit"]', expected: 'Umfrage abschicken', label: 'Der Absende-Knopf heißt „Umfrage abschicken“' },
        { type: 'order', selectors: ['textarea#wunsch', 'form button'], label: 'Der Knopf steht am Ende des Formulars' },
      ],
    },
    {
      type: 'order',
      text: 'Bring das Bewerbungsformular in die richtige Reihenfolge: Beschriftung jeweils vor dem Feld, erst der Name, dann die Begründung, der Knopf zuletzt.',
      lines: ['<form>', '  <label for="name">Name</label>', '  <input type="text" id="name" name="name" required>', '  <label for="grund">Warum willst du mitmachen?</label>', '  <textarea id="grund" name="grund"></textarea>', '  <button type="submit">Bewerben</button>', '</form>'],
      explanation: 'Label vor Feld, Felder in der Reihenfolge des Formulars, der Knopf ganz unten – alles innerhalb von form.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Umfrage: Der Knopf „Abschicken“ ist verschwunden – stattdessen steht Code im Textbereich. Und ein Klick auf „Dein Kommentar“ springt nicht ins Feld. Am Ende funktionieren Knopf und Beschriftung.',
      starter: {
        html: '<h1>Umfrage: Schulfest</h1>\n<form>\n  <label for="klasse">Deine Klasse</label>\n  <input type="text" id="klasse" name="klasse" required>\n\n  <label for="kommentar">Dein Kommentar</label>\n  <textarea id="komentar" name="kommentar">\n\n  <button type="submit">Abschicken</button>\n</form>\n',
      },
      hints: [
        'Zwei Fehler: einer beim Textbereich (wie endet er?), einer bei der Verbindung zwischen Label und Feld (for und id müssen gleich sein).',
        'Ohne schließenden Tag hält der Browser alles Folgende für Text im Feld. Vergleiche mit dem Muster: `<textarea id="notiz" name="notiz"></textarea>`',
        'Prüfe Buchstabe für Buchstabe: Das `for` im Label lautet kommentar – wie lautet die id des Textbereichs?',
      ],
      solution: {
        html: '<h1>Umfrage: Schulfest</h1>\n<form>\n  <label for="klasse">Deine Klasse</label>\n  <input type="text" id="klasse" name="klasse" required>\n\n  <label for="kommentar">Dein Kommentar</label>\n  <textarea id="kommentar" name="kommentar"></textarea>\n\n  <button type="submit">Abschicken</button>\n</form>\n',
      },
      tests: [
        { type: 'text', selector: 'form button[type="submit"]', expected: 'Abschicken', label: 'Der Knopf „Abschicken“ ist wieder da' },
        { type: 'selector', selector: 'textarea#kommentar[name="kommentar"]', count: 1, label: 'Der Textbereich hat die id kommentar – die Beschriftung findet ihn' },
        { type: 'selector', selector: 'form textarea', count: 1, label: 'Im Formular steht genau ein Textbereich' },
        { type: 'attr', selector: 'input#klasse', attr: 'required', present: true, label: 'Das Klassenfeld ist weiterhin Pflicht' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website: Das Ticketformular wird komplett. Am Ende kommen ein Textbereich für eine Nachricht (optional – nicht jeder hat eine), ein Kontrollkästchen für die Datenschutzerklärung und der Absende-Knopf „Ticket reservieren“.\n\nDas Kästchen ist kein Schmuck: Wer Daten sammelt, muss sagen, was damit passiert – mehr dazu in der Sicherheitszentrale. Ich prüfe die Reihenfolge: Nachricht, Kästchen, Knopf.',
    },
    { type: 'code', etappe: '09-formulare/03-textarea-und-knoepfe' },
  ],
});

/* ---------- Lektion 4: Wiederholung ---------- */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung: Ticket-Schalter',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Rundgang vor der Abnahme: Ich frage Formulare aus diesem Kapitel ab, dazu die Seitenzonen aus Kapitel 8, Tabellen mit Kopfzeile aus Kapitel 7, Links aus Kapitel 5 – und aus Kapitel 1 die Anfrage an den Server. Denn genau dorthin gehen die Formulardaten beim Absenden.',
    },
    {
      type: 'quiz',
      question: 'Jemand füllt das Ticketformular aus und klickt auf „Ticket reservieren“. Was passiert technisch?',
      options: ['Der Browser schickt die Eingaben als Anfrage an den Server', 'Der Browser speichert die Eingaben dauerhaft auf dem Handy', 'HTML schickt automatisch eine E-Mail an das Kollektiv', 'Nichts – HTML kann keine Daten weitergeben'],
      correct: 0,
      explanation: 'Absenden heißt: Anfrage an den Server, mit den Eingaben als name=wert-Paare. Ob daraus eine E-Mail oder ein Eintrag in einer Liste wird, entscheidet ein Programm auf dem Server – nicht HTML.',
    },
    {
      type: 'fill',
      text: 'Die Preistabelle bekommt eine Kopfzeile. Vervollständige die beiden Kopfzellen.',
      template: '<tr>\n  <___>Ticket</th>\n  <___>Preis</th>\n</tr>',
      accept: [['th'], ['th']],
      hint: 'Kopfzellen sind ein eigenes Element – „table header“ – der Browser zeigt sie fett.',
    },
    {
      type: 'code',
      task: '**Erweitere** die Seite: 1. Zwischen Kopf- und Hauptbereich kommt eine Navigation mit zwei Links: „Startseite“ → index.html und „Programm“ → programm.html. 2. Im Formular folgt nach dem Namen ein beschriftetes E-Mail-Feld „E-Mail“ (id und Name `email`), ebenfalls Pflichtfeld.',
      starter: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Helfer:innen – Schulfest</title>\n  </head>\n  <body>\n    <header>\n      <h1>Helfer:innen gesucht</h1>\n    </header>\n\n    <main>\n      <p>Trag dich ein – wir melden uns.</p>\n      <form>\n        <label for="name">Name</label>\n        <input type="text" id="name" name="name" required>\n      </form>\n    </main>\n\n    <footer>\n      <p>SMV der Neckarschule</p>\n    </footer>\n  </body>\n</html>\n',
      },
      hints: [
        'Die Navigation ist ein eigenes semantisches Element mit den Links darin – wie auf der Programm-Seite. Das E-Mail-Feld folgt dem Muster des Namensfeldes.',
        'Muster: `<nav><a href="galerie.html">Galerie</a></nav>` – und ein Pflichtfeld trägt das Attribut ohne Wert am Ende des Tags.',
        'Reihenfolge im body: header, nav, main, footer. Im Formular: `<label for="…">E-Mail</label>` und `<input type="…" id="…" name="…" required>`.',
      ],
      solution: {
        html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Helfer:innen – Schulfest</title>\n  </head>\n  <body>\n    <header>\n      <h1>Helfer:innen gesucht</h1>\n    </header>\n\n    <nav>\n      <a href="index.html">Startseite</a>\n      <a href="programm.html">Programm</a>\n    </nav>\n\n    <main>\n      <p>Trag dich ein – wir melden uns.</p>\n      <form>\n        <label for="name">Name</label>\n        <input type="text" id="name" name="name" required>\n\n        <label for="email">E-Mail</label>\n        <input type="email" id="email" name="email" required>\n      </form>\n    </main>\n\n    <footer>\n      <p>SMV der Neckarschule</p>\n    </footer>\n  </body>\n</html>\n',
      },
      tests: [
        { type: 'selector', selector: 'nav a', count: 2, label: 'Die Navigation hat zwei Links' },
        { type: 'attr', selector: 'nav a', attr: 'href', expected: 'index.html', label: 'Der erste Link führt zur Startseite' },
        { type: 'order', selectors: ['header', 'nav', 'main'], label: 'Die Navigation liegt zwischen Kopf- und Hauptbereich' },
        { type: 'attr', selector: 'form input#email[name="email"]', attr: 'type', expected: 'email', label: 'Das E-Mail-Feld hat den Typ email' },
        { type: 'attr', selector: 'input#email', attr: 'required', present: true, label: 'Die E-Mail ist ein Pflichtfeld' },
        { type: 'text', selector: 'label[for="email"]', expected: 'E-Mail', label: 'Das E-Mail-Feld ist beschriftet' },
      ],
    },
    {
      type: 'order',
      text: 'Bring die Preistabelle in die richtige Reihenfolge: Kopfzeile mit Ticket und Preis, dann die Zeile für das Tagesticket.',
      lines: ['<table>', '  <tr>', '    <th>Ticket</th>', '    <th>Preis</th>', '  </tr>', '  <tr><td>Tagesticket</td><td>12 €</td></tr>', '</table>'],
      explanation: 'Erst die Kopfzeile mit den Kopfzellen, dann die Datenzeile – alles innerhalb von table.',
    },
    {
      type: 'pair',
      text: 'Ordne die Seitenzonen und Formular-Bausteine zu.',
      pairs: [
        ['`<header>`', 'Kopfbereich – Hauptüberschrift und Intro'],
        ['`<nav>`', 'Navigation – die Links zu den anderen Seiten'],
        ['`<main>`', 'Hauptbereich – der eigentliche Inhalt'],
        ['`<footer>`', 'Fußbereich – Adresse und Kleingedrucktes'],
        ['`<form>`', 'Rahmen um alle Eingabefelder'],
        ['`<label>`', 'Beschriftung, über for mit einem Feld verbunden'],
      ],
    },
    {
      type: 'bug',
      text: 'Beide Optionsfelder lassen sich gleichzeitig anklicken. Welche Zeile ist schuld?',
      lines: ['<input type="radio" id="ja" name="newsletter" value="ja">', '<label for="ja">Ja, gern</label>', '<input type="radio" id="nein" name="news" value="nein">', '<label for="nein">Nein, danke</label>'],
      line: 2,
      explanation: 'Nur Optionsfelder mit demselben name bilden eine Gruppe. „news“ und „newsletter“ sind zwei Gruppen – also lassen sich beide wählen.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Bestellseite: Statt einer Klappliste stehen die Sorten als loser Text auf der Seite, und ein Klick auf „Dein Name“ springt nicht ins Namensfeld. Am Ende gibt es eine Auswahlliste mit drei Sorten und eine funktionierende Beschriftung.',
      starter: {
        html: '<h1>Bubble-Tea-Bestellung</h1>\n<form>\n  <label for="nme">Dein Name</label>\n  <input type="text" id="name" name="name">\n\n  <label for="sorte">Sorte</label>\n  <selct id="sorte" name="sorte">\n    <option value="mango">Mango</option>\n    <option value="litschi">Litschi</option>\n    <option value="matcha">Matcha</option>\n  </selct>\n\n  <button type="submit">Bestellen</button>\n</form>\n',
      },
      hints: [
        'Zwei Fehler: Der Name des Listen-Elements ist falsch geschrieben, und for und id passen nicht zusammen.',
        'Die Klappliste heißt `select` – öffnender und schließender Tag müssen beide richtig geschrieben sein.',
        'Vergleiche das `for` der Beschriftung „Dein Name“ mit der `id` des Namensfelds – Buchstabe für Buchstabe.',
      ],
      solution: {
        html: '<h1>Bubble-Tea-Bestellung</h1>\n<form>\n  <label for="name">Dein Name</label>\n  <input type="text" id="name" name="name">\n\n  <label for="sorte">Sorte</label>\n  <select id="sorte" name="sorte">\n    <option value="mango">Mango</option>\n    <option value="litschi">Litschi</option>\n    <option value="matcha">Matcha</option>\n  </select>\n\n  <button type="submit">Bestellen</button>\n</form>\n',
      },
      tests: [
        { type: 'selector', selector: 'select#sorte[name="sorte"] option', count: 3, label: 'Die Auswahlliste „Sorte“ hat drei Einträge' },
        { type: 'text', selector: 'select#sorte option:first-child', expected: 'Mango', label: 'Der erste Eintrag ist Mango' },
        { type: 'text', selector: 'label[for="name"]', expected: 'Dein Name', label: 'Die Beschriftung „Dein Name“ gehört zum Feld mit der id name' },
        { type: 'selector', selector: 'input#name[name="name"]', count: 1, label: 'Das Namensfeld ist noch da' },
        { type: 'text', selector: 'form button[type="submit"]', expected: 'Bestellen', label: 'Der Knopf „Bestellen“ ist noch da' },
      ],
    },
    {
      type: 'quiz',
      question: 'In der Navigation der Tickets-Seite soll ein Link zur eigenen Programm-Seite stehen. Welche Adresse ist richtig?',
      options: ['`programm.html`', '`https://programm.html`', '`#programm`', '`www.programm.html`'],
      correct: 0,
      explanation: 'Eigene Seiten verlinkst du nur mit dem Dateinamen. `https://` ist für fremde Seiten, `#` für Sprungmarken innerhalb der Seite.',
    },
    {
      type: 'explain',
      text: 'Ab zur FUNKEN-Website: Vor dem Formular fehlt die Preisübersicht – Sam will, dass niemand fragen muss, was ein Ticket kostet. Der Abschnitt „Preise“ kommt ganz oben in den Hauptbereich: Zwischenüberschrift plus Tabelle mit Kopfzeile, drei Ticketarten, drei Preise. Danach erst der Hinweis-Absatz und das Formular.',
    },
    { type: 'code', etappe: '09-formulare/04-wiederholung' },
  ],
});

/* ---------- Lektion 5: Projekt Ticketformular ---------- */
schreibe('lessons/05-projekt-ticketformular.json', {
  id: '05-projekt-ticketformular',
  title: 'Projekt: Ticketformular',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Meilenstein! Der Ticket-Schalter steht: Preise, Name, E-Mail, Ticketart, Newsletter, Nachricht, Datenschutz, Knopf. Ich habe es ausprobiert – und gleich ein Ticket ohne Namen reserviert. Das darf nicht passieren.\n\nAußerdem wollen manche vier Tickets auf einmal, andere tippen 40. Vier ist Schluss, mindestens eins muss es sein.',
    },
    {
      type: 'quiz',
      question: 'Name und E-Mail sind Pflichtfelder. Jemand lässt den Namen leer und klickt auf „Ticket reservieren“. Was passiert?',
      options: ['Der Browser markiert das leere Feld und schickt nichts ab', 'Der Browser schickt das Formular ohne Namen ab', 'Der Server ruft die Person an', 'Die Seite lädt neu und löscht alle Eingaben'],
      correct: 0,
      explanation: 'Pflichtfelder prüft der Browser vor dem Absenden. Ist eins leer, erscheint ein Hinweis am Feld – die Anfrage geht nicht raus.',
    },
    {
      type: 'order',
      text: 'Bring den Ausschnitt eines Bestellformulars in die richtige Reihenfolge: E-Mail, dann Stückzahl, dann der Knopf – Beschriftung jeweils vor dem Feld.',
      lines: ['<label for="email">E-Mail</label>', '<input type="email" id="email" name="email" required>', '<label for="stueck">Stück</label>', '<input type="number" id="stueck" name="stueck" min="1" max="6">', '<button type="submit">Bestellen</button>'],
      explanation: 'Beschriftung vor dem Feld, Felder in der genannten Reihenfolge, der Knopf zuletzt.',
    },
    {
      type: 'explain',
      text: 'Ab zur FUNKEN-Website: Name und E-Mail werden Pflichtfelder, und nach der E-Mail kommt das Zahlenfeld „Anzahl Tickets“ mit den Grenzen 1 bis 4.\n\nDanach lohnt sich der Knopf **FUNKEN-Website ansehen** (`#/projekt`): Klick auf eine Beschriftung, lass ein Pflichtfeld leer und drück auf „Ticket reservieren“ – der Browser meckert, genau wie er soll. Das Impressum folgt später in der Sicherheitszentrale.',
    },
    { type: 'code', etappe: '09-formulare/05-projekt-ticketformular' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '09-formulare',
  fragen: [
    { id: '09-01', konzept: 'html.form', type: 'quiz', question: 'Welches Element ist der Rahmen, in dem alle Eingabefelder eines Formulars liegen?', options: ['`<form>`', '`<input>`', '`<main>`'], correct: 0, explanation: '`<form>` fasst die Felder zusammen; beim Absenden gehen alle Eingaben darin an den Server.' },
    { id: '09-02', konzept: 'html.form', type: 'fill', text: 'Vervollständige den Rahmen des Formulars.', template: '<___>\n  <input type="text" name="team">\n</form>', accept: ['form'], hint: 'Der öffnende Tag heißt wie der schließende.' },
    { id: '09-03', konzept: 'html.form', type: 'bug', text: 'Der Browser erkennt kein Formular – nichts lässt sich abschicken. Welche Zeile ist falsch?', lines: ['<from>', '  <label for="ort">Ort</label>', '  <input type="text" id="ort" name="ort">', '  <button type="submit">Senden</button>', '</form>'], line: 0, explanation: 'Der Rahmen heißt `form` – mit dem Tippfehler „from“ gibt es kein Formular.' },
    { id: '09-04', konzept: 'html.input', type: 'quiz', question: 'Ein Zahlenfeld soll nur Werte von 1 bis 10 annehmen. Welche Attribute brauchst du dafür?', options: ['`min` und `max`', '`from` und `to`', '`start` und `end`'], correct: 0, explanation: '`min` legt den kleinsten, `max` den größten erlaubten Wert fest.' },
    { id: '09-05', konzept: 'html.input', type: 'fill', text: 'Das Feld prüft, ob die Eingabe wie eine E-Mail-Adresse aussieht.', template: '<input type="___" id="mail" name="mail">', accept: ['email'], hint: 'Der Typ heißt wie die Sache, die eingegeben wird – auf Englisch.' },
    { id: '09-06', konzept: 'html.input', type: 'bug', text: 'Ein Eingabefeld ist falsch geschrieben. Welche Zeile?', lines: ['<input type="text" id="name" name="name">', '<input type="email" id="mail" name="mail">', '<input type="number" id="alter" name="alter"></input>', '<input type="text" id="ort" name="ort">'], line: 2, explanation: '`input` ist ein leeres Element – es gibt keinen schließenden Tag.' },
    { id: '09-07', konzept: 'html.label', type: 'quiz', question: 'Was bewirkt `<label for="alter">` bei einem Feld mit `id="alter"`?', options: ['Klick auf die Beschriftung setzt den Cursor ins Feld', 'Das Feld wird zum Pflichtfeld', 'Die Beschriftung wird fett'], correct: 0, explanation: 'for und id verbinden Label und Feld: Klick aufs Label aktiviert das Feld, Screenreader lesen die Beschriftung vor.' },
    { id: '09-08', konzept: 'html.label', type: 'fill', text: 'Verbinde die Beschriftung mit dem Feld.', template: '<label ___="stadt">Stadt</label>\n<input type="text" id="___" name="stadt">', accept: [['for'], ['stadt']], hint: 'Das Attribut im Label nennt die id des Feldes – beide Werte müssen gleich sein.' },
    { id: '09-09', konzept: 'html.label', type: 'bug', text: 'Ein Klick auf „Alter“ springt nicht ins Feld. Welche Zeile ist schuld?', lines: ['<label for="alter">Alter</label>', '<input type="number" id="jahre" name="alter">', '<label for="ort">Ort</label>', '<input type="text" id="ort" name="ort">'], line: 1, explanation: 'Das Label sucht die id „alter“, das Feld hat aber die id „jahre“. for und id müssen gleich sein.' },
    { id: '09-10', konzept: 'html.select', type: 'order', text: 'Sortiere die Auswahlliste für die Größe – S vor M.', lines: ['<label for="groesse">Größe</label>', '<select id="groesse" name="groesse">', '  <option value="s">S</option>', '  <option value="m">M</option>', '</select>'] },
    { id: '09-11', konzept: 'html.select', type: 'quiz', question: 'Was steht im Attribut `value` einer Option?', options: ['Der Wert, der beim Absenden an den Server geht', 'Der Text, den man in der Liste sieht', 'Die Nummer der Option'], correct: 0, explanation: 'Sichtbar ist der Text zwischen den Tags; gesendet wird der value der gewählten Option.' },
    { id: '09-12', konzept: 'html.select', type: 'bug', text: 'Die Klappliste zeigt nur zwei statt drei Sorten. Welche Zeile ist falsch?', lines: ['<select id="sorte" name="sorte">', '  <option value="mango">Mango</option>', '  <option value="litschi">Litschi</option>', '  <li value="matcha">Matcha</li>', '</select>'], line: 3, explanation: 'In einer Auswahlliste sind nur option-Elemente erlaubt – kein li.' },
    { id: '09-13', konzept: 'html.radio-checkbox', type: 'quiz', question: 'Drei Optionsfelder sollen eine Gruppe bilden, aus der man nur eins wählen kann. Was müssen sie gemeinsam haben?', options: ['Denselben `name`', 'Dieselbe `id`', 'Denselben `value`'], correct: 0, explanation: 'Der gleiche name macht die Gruppe. ids sind immer eindeutig, values unterscheiden die Antworten.' },
    { id: '09-14', konzept: 'html.radio-checkbox', type: 'pair', text: 'Radio oder Checkbox?', pairs: [['`type="radio"`', 'eins aus einer Gruppe – nur eine Wahl'], ['`type="checkbox"`', 'jedes Kästchen einzeln an oder aus'], ['gleicher `name`', 'macht Optionsfelder zur Gruppe'], ['`value`', 'der Wert, der für die gewählte Option gesendet wird']] },
    { id: '09-15', konzept: 'html.radio-checkbox', type: 'bug', text: 'Bei der Zahlungsart lassen sich Bar und Karte gleichzeitig wählen. Welche Zeile?', lines: ['<input type="radio" id="bar" name="zahlung" value="bar">', '<label for="bar">Bar</label>', '<input type="checkbox" id="karte" name="zahlung" value="karte">', '<label for="karte">Karte</label>'], line: 2, explanation: 'Ein Kontrollkästchen gehört zu keiner Gruppe – für „eins von beiden“ müssen beide Felder Optionsfelder (radio) sein.' },
    { id: '09-16', konzept: 'html.textarea', type: 'quiz', question: 'Ein Feld für mehrzeilige Nachrichten – welche Schreibweise ist richtig?', options: ['`<textarea id="text" name="text"></textarea>`', '`<input type="textarea" name="text">`', '`<textarea id="text" name="text">`'], correct: 0, explanation: '`textarea` ist ein eigenes Element mit schließendem Tag; einen input-Typ „textarea“ gibt es nicht.' },
    { id: '09-17', konzept: 'html.textarea', type: 'fill', text: 'Vervollständige den mehrzeiligen Textbereich.', template: '<___ id="nachricht" name="nachricht"></textarea>', accept: ['textarea'], hint: 'Der öffnende Tag heißt wie der schließende.' },
    { id: '09-18', konzept: 'html.button', type: 'quiz', question: 'Welcher Knopf schickt das Formular ab?', options: ['`<button type="submit">Senden</button>`', '`<button type="send">Senden</button>`', '`<input type="button">Senden</input>`'], correct: 0, explanation: 'Der Knopf ist ein button-Element; der Typ submit schickt das Formular ab.' },
    { id: '09-19', konzept: 'html.button', type: 'fill', text: 'Der Knopf soll das Formular absenden.', template: '<button type="___">Anmelden</button>', accept: ['submit'], hint: 'Englisch für „abschicken“.' },
    { id: '09-20', konzept: 'html.button', type: 'bug', text: 'Neben „Senden“ erscheint ein zweiter, leerer Knopf. Welche Zeile ist falsch?', lines: ['<form>', '  <label for="mail">E-Mail</label>', '  <input type="email" id="mail" name="mail">', '  <button type="submit">Senden<button>', '</form>'], line: 3, explanation: 'Dem schließenden Tag fehlt der Schrägstrich – `<button>` öffnet einen zweiten Knopf statt den ersten zu schließen.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '09-formulare',
  title: 'Abnahme: Ticket-Schalter',
  intro: 'Der Ticket-Schalter ist offen! Bevor ich den Link rausschicke, will ich sehen, dass ihr Formulare wirklich könnt – Felder, Beschriftungen, Auswahl, Knopf, alles. Und dass die Preistabelle nicht aus Versehen wieder verschwindet.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'html.label', type: 'quiz', question: 'Wozu verbindet man ein Label über `for` mit der id eines Feldes?', options: ['Klick aufs Label aktiviert das Feld, Screenreader lesen die Beschriftung vor', 'Das Feld wird dadurch zum Pflichtfeld', 'Der Server bekommt so den Text des Labels'], correct: 0, explanation: 'Die Verbindung hilft beim Bedienen: Klick auf die Beschriftung springt ins Feld, Vorlese-Programme wissen, wozu das Feld gehört.' },
    { konzept: 'html.input', type: 'fill', text: 'Das Zahlenfeld nimmt nur Werte von 1 bis 4 an.', template: '<input type="___" id="anzahl" name="anzahl" min="1" ___="4">', accept: [['number'], ['max']] },
    { konzept: 'html.semantik', type: 'pair', text: 'Ordne die Seitenzonen zu.', pairs: [['`<header>`', 'Kopfbereich'], ['`<nav>`', 'Navigation'], ['`<main>`', 'Hauptbereich'], ['`<footer>`', 'Fußbereich']] },
    { konzept: 'html.select', type: 'order', text: 'Sortiere die Auswahlliste für den Festivaltag – Freitag vor Samstag.', lines: ['<label for="tag">Tag</label>', '<select id="tag" name="tag">', '  <option value="fr">Freitag</option>', '  <option value="sa">Samstag</option>', '</select>'] },
    {
      type: 'code',
      task: '**Erstelle** im Formular: 1. ein beschriftetes E-Mail-Feld „E-Mail“ (id und Name `email`) als Pflichtfeld, 2. zwei Optionsfelder mit dem gemeinsamen Namen `tag` – „Samstag“ (Wert samstag) und „Sonntag“ (Wert sonntag), jeweils beschriftet, 3. einen Knopf „Anmelden“, der das Formular absendet.',
      starter: {
        html: '<h1>Anmeldung E-Sport-Turnier</h1>\n<p>Zwei Spieltage, ein Pokal. Melde dich an:</p>\n<form>\n</form>\n',
      },
      solution: {
        html: '<h1>Anmeldung E-Sport-Turnier</h1>\n<p>Zwei Spieltage, ein Pokal. Melde dich an:</p>\n<form>\n  <label for="email">E-Mail</label>\n  <input type="email" id="email" name="email" required>\n\n  <input type="radio" id="samstag" name="tag" value="samstag">\n  <label for="samstag">Samstag</label>\n  <input type="radio" id="sonntag" name="tag" value="sonntag">\n  <label for="sonntag">Sonntag</label>\n\n  <button type="submit">Anmelden</button>\n</form>\n',
      },
      tests: [
        { type: 'text', selector: 'label[for="email"]', expected: 'E-Mail', label: 'Die Beschriftung „E-Mail“ gehört zum E-Mail-Feld' },
        { type: 'attr', selector: 'input#email[name="email"][type="email"]', attr: 'required', present: true, label: 'Das E-Mail-Feld hat den Typ email und ist Pflicht' },
        { type: 'selector', selector: 'input[type="radio"][name="tag"]', count: 2, label: 'Zwei Optionsfelder gehören zur Gruppe „tag“' },
        { type: 'attr', selector: 'input[type="radio"][name="tag"]', attr: 'value', expected: 'samstag', label: 'Das erste Optionsfeld hat den Wert samstag' },
        { type: 'text', selector: 'label', expected: 'Sonntag', any: true, label: 'Die Beschriftung „Sonntag“ ist da' },
        { type: 'text', selector: 'form button[type="submit"]', expected: 'Anmelden', label: 'Der Knopf „Anmelden“ schickt das Formular ab' },
      ],
    },
    { konzept: 'web.http', type: 'quiz', question: 'Was schickt der Browser beim Absenden eines Formulars an den Server?', options: ['Eine Anfrage mit den Eingaben als name=wert-Paare', 'Die komplette HTML-Datei der Seite', 'Nur den Text des Absende-Knopfs'], correct: 0, explanation: 'Absenden ist eine Anfrage wie beim Seitenaufruf – nur mit den Eingaben im Gepäck. Ein Programm auf dem Server nimmt sie an.' },
    { konzept: 'html.radio-checkbox', type: 'bug', text: 'Man kann „Ja“ und „Nein“ gleichzeitig wählen. Welche Zeile ist falsch?', lines: ['<input type="radio" id="ja" name="newsletter" value="ja">', '<label for="ja">Ja</label>', '<input type="radio" id="nein" name="newsleter" value="nein">', '<label for="nein">Nein</label>'], line: 2, explanation: 'Der name ist falsch geschrieben – „newsleter“ und „newsletter“ sind zwei Gruppen.' },
    { konzept: 'html.th', type: 'fill', text: 'Vervollständige die Kopfzelle der Preistabelle.', template: '<tr>\n  <th>Ticket</th>\n  <___>Preis</th>\n</tr>', accept: ['th'] },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Verlosung: Schwarz und Weiß lassen sich gleichzeitig wählen, und der Knopf „Teilnehmen“ ist verschwunden – stattdessen steht Code im Textbereich. Am Ende gibt es genau eine Farbwahl und einen funktionierenden Knopf.',
      starter: {
        html: '<h1>Sneaker-Verlosung</h1>\n<p>Wir verlosen ein Paar Retro Runner. Mitmachen:</p>\n<form>\n  <label for="name">Name</label>\n  <input type="text" id="name" name="name" required>\n\n  <label for="groesse">Schuhgröße</label>\n  <input type="number" id="groesse" name="groesse" min="36" max="48">\n\n  <input type="radio" id="schwarz" name="farbe" value="schwarz">\n  <label for="schwarz">Schwarz</label>\n  <input type="radio" id="weiss" name="farben" value="weiss">\n  <label for="weiss">Weiß</label>\n\n  <label for="warum">Warum du?</label>\n  <textarea id="warum" name="warum">\n\n  <button type="submit">Teilnehmen</button>\n</form>\n',
      },
      solution: {
        html: '<h1>Sneaker-Verlosung</h1>\n<p>Wir verlosen ein Paar Retro Runner. Mitmachen:</p>\n<form>\n  <label for="name">Name</label>\n  <input type="text" id="name" name="name" required>\n\n  <label for="groesse">Schuhgröße</label>\n  <input type="number" id="groesse" name="groesse" min="36" max="48">\n\n  <input type="radio" id="schwarz" name="farbe" value="schwarz">\n  <label for="schwarz">Schwarz</label>\n  <input type="radio" id="weiss" name="farbe" value="weiss">\n  <label for="weiss">Weiß</label>\n\n  <label for="warum">Warum du?</label>\n  <textarea id="warum" name="warum"></textarea>\n\n  <button type="submit">Teilnehmen</button>\n</form>\n',
      },
      tests: [
        { type: 'selector', selector: 'input[type="radio"][name="farbe"]', count: 2, label: 'Beide Farben gehören zur Gruppe „farbe“ – nur eine ist wählbar' },
        { type: 'text', selector: 'form button[type="submit"]', expected: 'Teilnehmen', label: 'Der Knopf „Teilnehmen“ ist wieder da' },
        { type: 'selector', selector: 'textarea#warum[name="warum"]', count: 1, label: 'Der Textbereich „warum“ ist noch da' },
        { type: 'attr', selector: 'input#groesse', attr: 'max', expected: '48', label: 'Das Größenfeld ist unverändert' },
      ],
    },
    { konzept: 'html.a-intern', type: 'quiz', question: 'Der Fußbereich der Tickets-Seite soll einen Link zur Startseite bekommen. Welcher Link ist richtig?', options: ['`<a href="index.html">Startseite</a>`', '`<a href="https://index.html">Startseite</a>`', '`<a link="index.html">Startseite</a>`'], correct: 0, explanation: 'Eigene Seiten verlinkst du mit dem Dateinamen im Attribut href – ohne https://.' },
    { konzept: 'html.textarea', type: 'quiz', question: 'Welche Aussage über `<textarea>` stimmt?', options: ['Es braucht öffnenden und schließenden Tag; dazwischen steht die Vorbelegung', 'Es ist ein leeres Element wie input', 'Es ist ein input mit dem Typ textarea'], correct: 0, explanation: 'textarea ist ein eigenes Element mit zwei Tags. Steht Text dazwischen, ist er im Feld vorbelegt.' },
  ],
});
console.log('Kapitel 09 geschrieben');
