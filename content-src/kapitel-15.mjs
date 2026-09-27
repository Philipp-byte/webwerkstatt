// Kapitel 15 – Recht im Web (Station Sicherheitszentrale).
// Erzeugt public/content/chapters/15-recht-im-web/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '15-recht-im-web');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Mechanismus: Werk → Urheber:in entscheidet → Lizenz (Erlaubnis + Nennung) → deine Seite
const FIG_URHEBER = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#eef2ff" font-weight="bold">Fremdes Foto nutzen?</text><rect x="14" y="40" width="88" height="66" rx="8" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="58" y="66" text-anchor="middle" fill="#ff7a45" font-weight="bold">Werk</text><text x="58" y="88" text-anchor="middle" fill="#eef2ff">Urheberin Mia</text><path d="M106 58 H204" stroke="#4ade80" stroke-width="2" marker-end="url(#gruen)"/><text x="156" y="50" text-anchor="middle" fill="#4ade80">Lizenz CC BY</text><path d="M106 92 H204" stroke="#ff7a45" stroke-width="2" stroke-dasharray="6 5"/><text x="156" y="112" text-anchor="middle" fill="#ff7a45">ohne Erlaubnis ✗</text><rect x="212" y="40" width="96" height="92" rx="8" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><rect x="224" y="52" width="72" height="40" rx="4" fill="#0f1320"/><text x="260" y="114" text-anchor="middle" fill="#38c7ff">Foto: Mia, CC BY</text><text x="260" y="150" text-anchor="middle" fill="#eef2ff" font-weight="bold">deine Seite</text><text x="58" y="150" text-anchor="middle" fill="#eef2ff">Nennung = Pflicht</text><defs><marker id="gruen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#4ade80"/></marker></defs></svg>`;

// Mechanismus: jede Seite → Link im Fußbereich → impressum.html mit Name, Anschrift, Kontakt, Verantwortliche:r, Datenschutz
const FIG_IMPRESSUM = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="14" y="18" width="84" height="56" rx="6" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="56" y="40" text-anchor="middle" fill="#eef2ff">Startseite</text><text x="56" y="64" text-anchor="middle" fill="#ffd84d">Impressum</text><rect x="14" y="88" width="84" height="56" rx="6" fill="#1b2135" stroke="#ff7a45" stroke-width="2"/><text x="56" y="110" text-anchor="middle" fill="#eef2ff">Tickets</text><text x="56" y="134" text-anchor="middle" fill="#ffd84d">Impressum</text><path d="M102 60 H190" stroke="#ffd84d" stroke-width="2" marker-end="url(#gelb)"/><path d="M102 130 H190" stroke="#ffd84d" stroke-width="2" marker-end="url(#gelb)"/><rect x="196" y="18" width="110" height="126" rx="8" fill="#1b2135" stroke="#38c7ff" stroke-width="2"/><text x="251" y="42" text-anchor="middle" fill="#38c7ff" font-weight="bold">impressum.html</text><text x="208" y="68" fill="#eef2ff">Name, Anschrift</text><text x="208" y="90" fill="#eef2ff">E-Mail, Telefon</text><text x="208" y="112" fill="#eef2ff">Verantwortlich</text><text x="208" y="134" fill="#4ade80">+ Datenschutz</text><defs><marker id="gelb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker></defs></svg>`;

/* ---------- Lektion 1: Urheberrecht und Bilder ---------- */
schreibe('lessons/01-urheberrecht-und-bilder.json', {
  id: '01-urheberrecht-und-bilder',
  title: 'Urheberrecht und Bilder',
  konzepte: ['recht.urheberrecht', 'recht.lizenz', 'recht.fotos'],
  steps: [
    {
      type: 'explain',
      text: 'Sam hat über die Bildersuche ein perfektes Bühnenfoto gefunden und will es in die Galerie packen. Stopp: Jedes Foto, jeder Text, jeder Song hat eine **Urheberin** oder einen **Urheber** – die Person, die das Werk gemacht hat. Sie allein entscheidet, wer es nutzen darf.\n\nDas **Urheberrecht** gilt automatisch, sobald das Werk entsteht – ohne Anmeldung, ohne ©-Zeichen. „Im Internet gefunden“ heißt also nicht „frei“.',
      figure: FIG_URHEBER,
    },
    {
      type: 'quiz',
      question: 'Sam will das gefundene Bühnenfoto ohne Nachfrage in die Galerie stellen. Was gilt?',
      options: ['Nur mit Erlaubnis der Urheberin oder des Urhebers, etwa per Lizenz', 'Alles, was im Internet steht, darf frei genutzt werden', 'Ohne ©-Zeichen ist das Foto automatisch frei', 'Erlaubt, wenn der Name des Fotografen nicht bekannt ist'],
      correct: 0,
      explanation: 'Das Urheberrecht gilt automatisch – ohne Zeichen und ohne Anmeldung. Fremde Werke darfst du nur mit Erlaubnis nutzen, zum Beispiel über eine Lizenz. Wer das ignoriert, riskiert eine teure **Abmahnung**.',
    },
    {
      type: 'explain',
      text: 'Eine **Lizenz** ist eine Erlaubnis mit Bedingungen: „Du darfst mein Foto nutzen, wenn …“. Damit nicht jede Person eigene Regeln schreibt, gibt es die Standard-Lizenzen von **Creative Commons (CC)**:\n\n- **CC BY** – Nutzung erlaubt, wenn du den Namen nennst.\n- **CC BY-NC** – Nennung nötig, und nur nicht-kommerziell.\n- **CC0** – keine Bedingungen, Nennung nicht nötig.\n\nSteht keine Lizenz dabei, gilt: **Alle Rechte vorbehalten** – erst fragen.',
    },
    {
      type: 'pair',
      text: 'Ordne die Lizenz-Kürzel ihrer Bedeutung zu.',
      pairs: [
        ['CC BY', 'Nutzung erlaubt, wenn du den Namen nennst'],
        ['CC BY-NC', 'Nennung nötig, und nur nicht-kommerziell'],
        ['CC0', 'keine Bedingungen – Nennung freiwillig'],
        ['keine Lizenzangabe', 'alle Rechte vorbehalten – erst um Erlaubnis fragen'],
      ],
    },
    {
      type: 'explain',
      text: 'Bei CC BY gehört der **Bildnachweis** direkt zum Bild – am besten in die Bildunterschrift: Name der Urheberin oder des Urhebers und die Lizenz.\n\n```html\n<figure>\n  <img src="sneaker.svg" alt="Roter Sneaker">\n  <figcaption>Roter Sneaker (Foto: Mia Kern, CC BY 4.0)</figcaption>\n</figure>\n```\n\nDie 4.0 ist die Version der Lizenz. Eigene Fotos brauchen keinen Nachweis – du darfst sie aber genauso kennzeichnen, damit andere wissen, was sie dürfen.',
    },
    {
      type: 'example',
      text: 'Hier ist so ein Bild-Block. **Ändere** den Namen im Nachweis, dann die Lizenz auf CC0 – und beobachte: Das Bild bleibt, nur die Unterschrift ändert sich. **Lösche** zum Schluss die ganze figcaption-Zeile: Das Bild steht ohne Nachweis da – so darf ein CC-BY-Bild nicht online gehen.',
      html: '<figure>\n  <img src="buehne.svg" alt="Die Zeltbühne am Abend">\n  <figcaption>Die Zeltbühne am Abend (Foto: Kim Vogt, CC BY 4.0)</figcaption>\n</figure>\n',
      css: 'figure {\n  background-color: white;\n  padding: 12px;\n  border-radius: 12px;\n  margin: 0;\n}\n\nfigcaption {\n  color: #6b6b7a;\n}\n',
      editable: ['html'],
    },
    {
      type: 'code',
      task: '**Ergänze** die Bildunterschrift um den Nachweis: Das Foto stammt von Leon Adler und steht unter CC BY 4.0. Die Unterschrift lautet danach „Controller im Turnier (Foto: Leon Adler, CC BY 4.0)“.',
      starter: { html: '<h2>E-Sport-Turnier</h2>\n<figure>\n  <img src="controller.svg" alt="Controller im Turnier">\n  <figcaption>Controller im Turnier</figcaption>\n</figure>\n' },
      hints: [
        'Nur der Text in der Bildunterschrift ändert sich – das Bild und der Alternativtext bleiben, wie sie sind.',
        'Der Nachweis steht in Klammern hinter dem Text: erst „Foto:“ und der Name, dann die Lizenz.',
        'Muster von einem anderen Bild: „Roter Sneaker (Foto: Mia Kern, CC BY 4.0)“ – nur mit den Angaben aus der Aufgabe.',
      ],
      solution: { html: '<h2>E-Sport-Turnier</h2>\n<figure>\n  <img src="controller.svg" alt="Controller im Turnier">\n  <figcaption>Controller im Turnier (Foto: Leon Adler, CC BY 4.0)</figcaption>\n</figure>\n' },
      tests: [
        { type: 'text', selector: 'figure figcaption', expected: 'Controller im Turnier (Foto: Leon Adler, CC BY 4.0)', label: 'Die Unterschrift enthält den Nachweis mit Name und Lizenz' },
        { type: 'attr', selector: 'figure img', attr: 'alt', expected: 'Controller im Turnier', label: 'Der Alternativtext bleibt unverändert' },
        { type: 'selector', selector: 'figure', count: 1, label: 'Es gibt genau einen Bild-Block' },
      ],
    },
    {
      type: 'fill',
      text: 'Vervollständige den Bild-Block: Welche zwei Elemente fehlen?',
      template: '<___>\n  <img src="ticket.svg" alt="Das Festivalticket">\n  <___>Das Festivalticket (Grafik: Kollektiv FUNKEN, CC BY 4.0)</figcaption>\n</figure>',
      accept: [['figure'], ['figcaption']],
      hint: 'Der Block heißt wie das englische Wort für „Abbildung“, die Unterschrift trägt denselben Namen mit „caption“ dahinter.',
    },
    {
      type: 'code',
      task: '**Erstelle** aus dem Bild einen Bild-Block mit Unterschrift: Das Bild pizza.svg bleibt, darunter steht die Unterschrift „Margherita vom Pizza-Truck (Foto: Ali Demir, CC BY 4.0)“. Der Absatz danach bleibt erhalten.',
      starter: { html: '<h2>Foodcourt</h2>\n<img src="pizza.svg" alt="Margherita vom Pizza-Truck">\n<p>Die Trucks öffnen um 16 Uhr.</p>\n' },
      hints: [
        'Bild und Unterschrift gehören zusammen in ein umschließendes Element – das kennst du aus der Galerie.',
        'Die Unterschrift ist ein eigenes Element innerhalb des Blocks, direkt nach dem Bild.',
        'Struktur: Block öffnen, darin das vorhandene img, dann die Unterschrift mit dem Nachweis, Block schließen – der Absatz bleibt außerhalb.',
      ],
      solution: { html: '<h2>Foodcourt</h2>\n<figure>\n  <img src="pizza.svg" alt="Margherita vom Pizza-Truck">\n  <figcaption>Margherita vom Pizza-Truck (Foto: Ali Demir, CC BY 4.0)</figcaption>\n</figure>\n<p>Die Trucks öffnen um 16 Uhr.</p>\n' },
      tests: [
        { type: 'selector', selector: 'figure img[src="pizza.svg"]', count: 1, label: 'Das Pizza-Bild liegt im Bild-Block' },
        { type: 'text', selector: 'figure figcaption', expected: 'Margherita vom Pizza-Truck (Foto: Ali Demir, CC BY 4.0)', label: 'Die Unterschrift mit Nachweis steht im Block' },
        { type: 'order', selectors: ['figure img', 'figure figcaption'], label: 'Die Unterschrift steht unter dem Bild' },
        { type: 'text', selector: 'p', expected: 'Die Trucks öffnen um 16 Uhr.', label: 'Der Absatz ist noch da' },
      ],
    },
    {
      type: 'explain',
      text: 'Noch jemand hat mitzureden: die Person, die **auf** dem Foto ist. Das **Recht am eigenen Bild** sagt: Wer erkennbar zu sehen ist, muss der Veröffentlichung zustimmen – diese Zustimmung heißt **Einwilligung**. Bei Minderjährigen müssen zusätzlich die Eltern einwilligen.\n\nAusnahme: Menschenmengen bei Veranstaltungen, etwa das Publikum vor der Bühne als Ganzes. Sobald eine Person groß im Bild ist, gilt: erst fragen – oder das Foto bleibt offline.',
    },
    {
      type: 'quiz',
      question: 'Jonas hat drei Fotos vom letzten FUNKEN. Welches darf ohne Nachfragen in die Galerie?',
      options: ['Die Menge vor der Hauptbühne – niemand steht im Mittelpunkt', 'Eine Nahaufnahme eines lachenden Gasts an der Waffeltheke', 'Ein Selfie zweier Freundinnen, das sie Jonas geschickt haben'],
      correct: 0,
      explanation: 'Das Publikum als Ganzes ist eine Ausnahme. Die Nahaufnahme zeigt eine Person erkennbar und groß – ohne Einwilligung geht das nicht. Und ein zugeschicktes Foto ist keine Erlaubnis, es zu veröffentlichen.',
    },
    {
      type: 'code',
      task: '**Überarbeite** die Turnier-Galerie: 1. **Ergänze** im ersten Block den Nachweis „(Foto: Turnier-Crew, CC BY 4.0)“ hinter dem Text. 2. **Entferne** den zweiten Bild-Block komplett – für das Plakat der Agentur liegt keine Erlaubnis vor. 3. **Gestalte** den Bild-Block im Stylesheet: rundum 12 Pixel Innenabstand und 12 Pixel runde Ecken.',
      starter: {
        html: '<h2>Eindrücke vom Turnier</h2>\n<figure>\n  <img src="crowd.svg" alt="Die Zuschauer vor der Turnierbühne">\n  <figcaption>Die Zuschauer vor der Turnierbühne</figcaption>\n</figure>\n<figure>\n  <img src="plakat.svg" alt="Das Turnierplakat">\n  <figcaption>Das Turnierplakat</figcaption>\n</figure>\n',
        css: 'figure {\n  background-color: white;\n  margin: 0;\n  /* Innenabstand und runde Ecken */\n}\n\nfigcaption {\n  color: #6b6b7a;\n}\n',
      },
      hints: [
        'Drei Dinge: ein Nachweis dazu, ein kompletter Block weg (vom öffnenden bis zum schließenden figure-Tag), zwei Eigenschaften in der figure-Regel.',
        'Der Nachweis kommt in Klammern hinter den vorhandenen Text der ersten Unterschrift. Innenabstand und runde Ecken kennst du aus dem Box-Modell – Muster: `padding: 8px;` und `border-radius: 4px;` mit anderen Werten.',
        'Am Ende steht nur noch ein figure-Block mit crowd.svg und der ergänzten Unterschrift auf der Seite, und die figure-Regel hat zwei neue Zeilen mit je 12px.',
      ],
      solution: {
        html: '<h2>Eindrücke vom Turnier</h2>\n<figure>\n  <img src="crowd.svg" alt="Die Zuschauer vor der Turnierbühne">\n  <figcaption>Die Zuschauer vor der Turnierbühne (Foto: Turnier-Crew, CC BY 4.0)</figcaption>\n</figure>\n',
        css: 'figure {\n  background-color: white;\n  margin: 0;\n  padding: 12px;\n  border-radius: 12px;\n}\n\nfigcaption {\n  color: #6b6b7a;\n}\n',
      },
      tests: [
        { type: 'text', selector: 'figure figcaption', expected: 'Die Zuschauer vor der Turnierbühne (Foto: Turnier-Crew, CC BY 4.0)', label: 'Der Nachweis steht in der Unterschrift des Zuschauerfotos' },
        { type: 'selector', selector: 'img[src="plakat.svg"]', count: 0, label: 'Das Plakat ohne Erlaubnis ist nicht mehr auf der Seite' },
        { type: 'selector', selector: 'figure', count: 1, label: 'Es gibt nur noch einen Bild-Block' },
        { type: 'selector', selector: 'figure img[src="crowd.svg"]', count: 1, label: 'Das Zuschauerfoto ist noch da' },
        { type: 'style', selector: 'figure', prop: 'padding-top', expected: '12px', label: 'Der Bild-Block hat 12px Innenabstand' },
        { type: 'style', selector: 'figure', prop: 'border-top-left-radius', expected: '12px', label: 'Der Bild-Block hat 12px runde Ecken' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Das Foto von der Menge vor der Hauptbühne hat unser Kollektiv selbst gemacht – wir sind also die Urheber. Wir stellen es unter CC BY 4.0, damit die Schülerzeitung es nutzen darf – wenn sie uns nennt.\n\nDeshalb bekommt die erste Bildunterschrift in der Galerie jetzt den Nachweis: unser Name und die Lizenz, in Klammern hinter dem Text. Die zweite Unterschrift bleibt, wie sie ist.',
    },
    { type: 'code', etappe: '15-recht-im-web/01-urheberrecht-und-bilder' },
  ],
});

/* ---------- Lektion 2: Impressum und Datenschutz ---------- */
const IMPRESSUM_CSS = 'header {\n  background-color: #1b1b2f;\n  color: #ffd23f;\n  padding: 16px;\n}\n\nnav {\n  display: flex;\n  gap: 16px;\n  padding: 8px 16px;\n}\n\nmain {\n  padding: 16px;\n}\n\nfooter {\n  background-color: #1b1b2f;\n  color: #fff7e8;\n  padding: 16px;\n  text-align: center;\n}\n';

const WAFFEL_KOPF = '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Impressum – Waffelwagen</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n';
const WAFFEL_ENDE = '  </body>\n</html>\n';

schreibe('lessons/02-impressum-und-datenschutz.json', {
  id: '02-impressum-und-datenschutz',
  title: 'Impressum und Datenschutz',
  konzepte: ['recht.impressum', 'recht.datenschutz'],
  steps: [
    {
      type: 'explain',
      text: 'Sam bekommt eine Mail von der Schulleitung: „Wer steht eigentlich hinter der Festival-Seite?“ Genau das muss jede Website beantworten, die nicht rein privat ist – Vereine, Schülerfirmen, Shops, Blogs. Die Antwort heißt **Impressum**: eine Seite, die sagt, wer die Website anbietet und wie man diese Person erreicht.\n\nDas Impressum muss von **jeder** Seite aus leicht zu finden sein – deshalb steht der Link fast immer im Fußbereich.',
      figure: FIG_IMPRESSUM,
    },
    {
      type: 'quiz',
      question: 'Sam fragt: „Brauchen wir für die FUNKEN-Seite wirklich ein Impressum?“ Was stimmt?',
      options: ['Ja, die Seite ist öffentlich und verkauft Tickets – nicht rein privat', 'Nein – ein Impressum brauchen nur große Firmen mit Onlineshop', 'Nein – die Adresse steht ja schon im Fußbereich', 'Nur, wenn auf der Seite Werbung läuft'],
      correct: 0,
      explanation: 'Sobald eine Website nicht rein privat ist – und Ticketverkauf ist nicht privat –, gehört ein Impressum dazu. Die Adresszeile im Fußbereich allein reicht nicht: Es fehlen Kontakt und verantwortliche Person, und es muss klar als Impressum erkennbar sein.',
    },
    {
      type: 'explain',
      text: 'Was ins Impressum gehört:\n\n- **Name** des Anbieters – bei Vereinen oder Firmen auch die Rechtsform und wer sie vertritt\n- **Anschrift**: Straße, Hausnummer, PLZ, Ort – ein Postfach reicht nicht\n- **Kontakt**: E-Mail-Adresse und ein weiterer schneller Weg, etwa Telefon\n- **Verantwortliche Person** für Texte und Berichte, mit Anschrift\n\nDas ist Grundwissen, keine Rechtsberatung: Eine echte Seite prüfst du mit einem Impressum-Generator, etwa von Verbraucherzentrale oder IHK.',
    },
    {
      type: 'pair',
      text: 'Ordne die Angaben des Impressums zu.',
      pairs: [
        ['Anschrift', 'Straße, Hausnummer, PLZ und Ort – kein Postfach'],
        ['Kontakt', 'E-Mail und ein schneller zweiter Weg, etwa Telefon'],
        ['Verantwortliche Person', 'steht mit Namen für Texte und Berichte gerade'],
        ['Link im Fußbereich', 'macht das Impressum von jeder Seite aus erreichbar'],
      ],
    },
    {
      type: 'example',
      text: 'So sieht der Kern eines Impressums in HTML aus: ein Absatz, in dem `<br>` die Zeilen umbricht (ein Leerelement ohne schließenden Tag), und ein E-Mail-Link, dessen Adresse mit `mailto:` beginnt. **Ändere** den Firmennamen, **ergänze** eine vierte Zeile mit einer Telefonnummer und beobachte, wie der Absatz wächst.',
      html: '<h2>Angaben</h2>\n<p>Sneaker-Lager GmbH (fiktiv)<br>Marktstraße 4<br>70173 Stuttgart<br><a href="mailto:post@sneaker-lager-beispiel.de">post@sneaker-lager-beispiel.de</a></p>\n',
    },
    {
      type: 'code',
      task: '**Gestalte** den Adress-Absatz: Der Name, die Straße und „74072 Heilbronn“ stehen in drei eigenen Zeilen. In einer vierten Zeile folgt ein E-Mail-Link zu post@pizza-kollektiv-beispiel.de, der das Mailprogramm öffnet – der sichtbare Text ist die Adresse selbst.',
      starter: { html: '<h2>Angaben</h2>\n<p>Pizza-Kollektiv Neckar e. V. Hafenweg 2 74072 Heilbronn</p>\n' },
      hints: [
        'Zeilenumbrüche innerhalb eines Absatzes machst du mit einem Leerelement – es hat keinen schließenden Tag.',
        'Ein E-Mail-Link ist ein normaler Link, dessen Adresse mit mailto: beginnt, zum Beispiel mailto:info@waffelwagen-beispiel.de.',
        'Struktur: Name, Umbruch, Straße, Umbruch, Ort, Umbruch, dann der Link mit der Adresse als Text – alles in dem einen Absatz.',
      ],
      solution: { html: '<h2>Angaben</h2>\n<p>Pizza-Kollektiv Neckar e. V.<br>Hafenweg 2<br>74072 Heilbronn<br><a href="mailto:post@pizza-kollektiv-beispiel.de">post@pizza-kollektiv-beispiel.de</a></p>\n' },
      tests: [
        { type: 'selector', selector: 'p br', count: 3, label: 'Der Absatz hat drei Zeilenumbrüche' },
        { type: 'attr', selector: 'p a', attr: 'href', expected: 'mailto:post@pizza-kollektiv-beispiel.de', label: 'Der Link öffnet das Mailprogramm' },
        { type: 'text', selector: 'p a', expected: 'post@pizza-kollektiv-beispiel.de', label: 'Der Linktext ist die E-Mail-Adresse' },
        { type: 'text', selector: 'p', expected: 'Pizza-Kollektiv Neckar e. V. Hafenweg 2 74072 Heilbronn post@pizza-kollektiv-beispiel.de', label: 'Alle vier Zeilen stehen im Absatz' },
      ],
    },
    {
      type: 'explain',
      text: 'Das Ticketformular sammelt Namen und E-Mail-Adressen – **personenbezogene Daten**, also alles, was sich einer Person zuordnen lässt (auch IP-Adressen). Dafür gilt in der EU die **DSGVO**, die Datenschutz-Grundverordnung. Ihr Grundgedanke: so wenig Daten wie möglich erheben, nur für einen klaren Zweck nutzen, und offen sagen, was passiert.\n\nDieses „offen sagen“ ist die **Datenschutzerklärung**: welche Daten, wozu, wie lange – und dass die Person Auskunft und Löschung verlangen kann.',
    },
    {
      type: 'quiz',
      question: 'Das Ticketformular fragt Name und E-Mail ab. Was muss die Datenschutzerklärung dazu sagen?',
      options: ['Welche Daten gespeichert werden und wozu, etwa zur Bestätigung der Reservierung', 'Nichts – Name und E-Mail sind keine personenbezogenen Daten', 'Nur, dass die Seite Cookies verwendet', 'Nichts, solange die Daten nicht verkauft werden'],
      correct: 0,
      explanation: 'Name und E-Mail sind personenbezogene Daten. Wer sie speichert, muss erklären, welche Daten es sind und wozu sie gebraucht werden – und darf sie nur für diesen Zweck nutzen.',
    },
    {
      type: 'explain',
      text: 'Oft steht im Impressum noch ein **Disclaimer** (Haftungsausschluss): ein Hinweis, dass man für die Inhalte fremder Seiten, auf die man verlinkt, nicht verantwortlich ist. Er ersetzt weder Impressum noch Datenschutzerklärung – und für eigene Inhalte haftet man trotzdem.\n\nUnd weil unsere Übungsseiten Fantasie-Betriebe zeigen, kennzeichnen wir das deutlich, damit niemand sie für echt hält:\n\n```html\n<p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>\n```',
    },
    {
      type: 'order',
      text: 'Sortiere die Zeilen zur Impressum-Seite: Kopfbereich, dann der Hauptbereich mit den Angaben und danach der Datenschutz-Abschnitt.',
      lines: ['<header>', '  <h1>Impressum</h1>', '</header>', '<main>', '  <h2>Angaben</h2>', '  <p>Waffelwagen<br>Hafenstraße 9<br>74072 Heilbronn</p>', '  <h2>Datenschutzerklärung</h2>', '</main>'],
      explanation: 'Erst der Kopfbereich mit der Hauptüberschrift, dann der Hauptbereich: Angaben, Adresse, Datenschutzerklärung.',
    },
    {
      type: 'code',
      task: '**Strukturiere** die Impressum-Seite mit Bedeutung: die Hauptüberschrift in einen Kopfbereich, der Link in eine Navigation, beide Abschnitte mit ihren Absätzen in einen Hauptbereich und die letzte Adresszeile in einen Fußbereich – in dieser Reihenfolge.',
      starter: {
        html: WAFFEL_KOPF + '    <h1>Impressum</h1>\n    <a href="index.html">Startseite</a>\n    <h2>Angaben</h2>\n    <p>Waffelwagen Heilbronn (fiktiv)<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="mailto:post@waffelwagen-beispiel.de">post@waffelwagen-beispiel.de</a></p>\n    <h2>Datenschutzerklärung</h2>\n    <p>Beim Bestellformular speichern wir Name und E-Mail nur, um die Bestellung zu bestätigen.</p>\n    <p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>\n    <p>Waffelwagen Heilbronn · Hafenstraße 9 · 74072 Heilbronn</p>\n' + WAFFEL_ENDE,
        css: IMPRESSUM_CSS,
      },
      editable: ['html'],
      hints: [
        'Vier semantische Elemente aus Kapitel 8: eins für den Kopf, eins für die Navigation, eins für den Hauptinhalt, eins für den Fuß.',
        'Jedes umschließt seinen Teil: öffnender Tag davor, schließender Tag dahinter – die Inhalte selbst ändern sich nicht.',
        'Reihenfolge im body: Kopf mit der h1, Navigation mit dem Link, Hauptbereich mit beiden h2-Abschnitten, Fußbereich mit dem letzten Absatz.',
      ],
      solution: {
        html: WAFFEL_KOPF + '    <header>\n      <h1>Impressum</h1>\n    </header>\n\n    <nav>\n      <a href="index.html">Startseite</a>\n    </nav>\n\n    <main>\n      <h2>Angaben</h2>\n      <p>Waffelwagen Heilbronn (fiktiv)<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="mailto:post@waffelwagen-beispiel.de">post@waffelwagen-beispiel.de</a></p>\n\n      <h2>Datenschutzerklärung</h2>\n      <p>Beim Bestellformular speichern wir Name und E-Mail nur, um die Bestellung zu bestätigen.</p>\n      <p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>\n    </main>\n\n    <footer>\n      <p>Waffelwagen Heilbronn · Hafenstraße 9 · 74072 Heilbronn</p>\n    </footer>\n' + WAFFEL_ENDE,
      },
      tests: [
        { type: 'selector', selector: 'header h1', count: 1, label: 'Die Hauptüberschrift liegt im Kopfbereich' },
        { type: 'attr', selector: 'nav a', attr: 'href', expected: 'index.html', label: 'Der Link zur Startseite liegt in der Navigation' },
        { type: 'selector', selector: 'main h2', count: 2, label: 'Beide Abschnitte liegen im Hauptbereich' },
        { type: 'text', selector: 'footer p', expected: 'Waffelwagen Heilbronn · Hafenstraße 9 · 74072 Heilbronn', label: 'Die Adresszeile liegt im Fußbereich' },
        { type: 'order', selectors: ['header', 'nav', 'main', 'footer'], label: 'Kopf, Navigation, Hauptbereich, Fuß – in dieser Reihenfolge' },
        { type: 'text', selector: 'main strong', expected: 'Fiktiver Betrieb für Übungszwecke.', label: 'Der Hinweis bleibt stark betont' },
      ],
    },
    {
      type: 'fill',
      text: 'Vervollständige das Impressum: Womit beginnt die Adresse des E-Mail-Links, und welches Element betont den Hinweis stark?',
      template: '<p><a href="___post@waffelwagen-beispiel.de">post@waffelwagen-beispiel.de</a></p>\n<p><___>Fiktiver Betrieb für Übungszwecke.</strong></p>',
      accept: [['mailto:'], ['strong']],
      hint: 'Der Link braucht das Schlüsselwort mit Doppelpunkt vor der Adresse. Das Element für starke Betonung ist das englische Wort für „stark“.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die fertige Impressum-Seite – zwei Dinge stimmen nicht: Der E-Mail-Link öffnet kein Mailprogramm, sondern führt ins Leere. Und ab der Überschrift „Datenschutzerklärung“ ist plötzlich der ganze Text riesig. Finde und behebe beide Fehler.',
      starter: {
        html: WAFFEL_KOPF + '    <header>\n      <h1>Impressum</h1>\n    </header>\n\n    <nav>\n      <a href="index.html">Startseite</a>\n    </nav>\n\n    <main>\n      <h2>Angaben</h2>\n      <p>Waffelwagen Heilbronn (fiktiv)<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="post@waffelwagen-beispiel.de">post@waffelwagen-beispiel.de</a></p>\n\n      <h2>Datenschutzerklärung\n      <p>Beim Bestellformular speichern wir Name und E-Mail nur, um die Bestellung zu bestätigen.</p>\n      <p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>\n    </main>\n\n    <footer>\n      <p>Waffelwagen Heilbronn · Hafenstraße 9 · 74072 Heilbronn</p>\n    </footer>\n' + WAFFEL_ENDE,
        css: IMPRESSUM_CSS,
      },
      editable: ['html'],
      hints: [
        'Ein E-Mail-Link braucht in der Adresse das Schlüsselwort vor der E-Mail-Adresse – vergleiche mit dem Beispiel weiter oben in dieser Lektion.',
        'Wenn nach einer Überschrift alles riesig wird, wurde die Überschrift nie geschlossen – der Browser hält den folgenden Text dann für einen Teil davon.',
        'Zwei kleine Änderungen: ein Wort mit Doppelpunkt am Anfang der Link-Adresse, ein schließender Tag direkt hinter „Datenschutzerklärung“.',
      ],
      solution: {
        html: WAFFEL_KOPF + '    <header>\n      <h1>Impressum</h1>\n    </header>\n\n    <nav>\n      <a href="index.html">Startseite</a>\n    </nav>\n\n    <main>\n      <h2>Angaben</h2>\n      <p>Waffelwagen Heilbronn (fiktiv)<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="mailto:post@waffelwagen-beispiel.de">post@waffelwagen-beispiel.de</a></p>\n\n      <h2>Datenschutzerklärung</h2>\n      <p>Beim Bestellformular speichern wir Name und E-Mail nur, um die Bestellung zu bestätigen.</p>\n      <p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>\n    </main>\n\n    <footer>\n      <p>Waffelwagen Heilbronn · Hafenstraße 9 · 74072 Heilbronn</p>\n    </footer>\n' + WAFFEL_ENDE,
      },
      tests: [
        { type: 'attr', selector: 'main a', attr: 'href', expected: 'mailto:post@waffelwagen-beispiel.de', label: 'Der E-Mail-Link öffnet das Mailprogramm' },
        { type: 'text', selector: 'main h2:nth-of-type(2)', expected: 'Datenschutzerklärung', label: 'Die zweite Überschrift enthält nur ihren Text' },
        { type: 'text', selector: 'main h2:nth-of-type(2) + p', expected: 'Beim Bestellformular speichern wir Name und E-Mail nur, um die Bestellung zu bestätigen.', label: 'Der Datenschutz-Absatz ist wieder ein normaler Absatz' },
        { type: 'text', selector: 'main strong', expected: 'Fiktiver Betrieb für Übungszwecke.', label: 'Der Hinweis ist stark betont' },
        { type: 'selector', selector: 'main p br', count: 3, label: 'Die Adresse hat weiterhin drei Zeilenumbrüche' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Jetzt bekommt FUNKEN seine eigene Impressum-Seite – von Grund auf, wie programm.html und tickets.html: Grundgerüst mit der Verknüpfung zum Stylesheet, dann Kopfbereich, Navigation, Hauptbereich und Fußbereich.\n\nIm Hauptbereich zwei Abschnitte: die Angaben mit Adresse und E-Mail-Link, dann die Datenschutzerklärung mit dem Satz zum Ticketformular und dem stark betonten Hinweis auf den fiktiven Betrieb. Übernimm die Texte genau – auch die Zeichen – und ·.',
    },
    { type: 'code', etappe: '15-recht-im-web/02-impressum-und-datenschutz' },
  ],
});

/* ---------- Lektion 3: Projekt – Impressum verlinken ---------- */
schreibe('lessons/03-projekt-impressum.json', {
  id: '03-projekt-impressum',
  title: 'Projekt: Impressum verlinken',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Meilenstein! Die Galerie hat einen sauberen Bildnachweis, und impressum.html steht. Nur: Bis jetzt kennt die Seite niemand – kein Link führt hin. Eine Seite ohne Link ist für Besucherinnen und Besucher unsichtbar.\n\nDeshalb bekommt der Fußbereich der Startseite einen zweiten Absatz mit zwei Links: „Impressum“ und „Tickets“. Der Fußbereich ist auf jeder Seite da – genau dort gehört der Impressum-Link hin.',
    },
    {
      type: 'quiz',
      question: 'Warum gehört der Link zum Impressum in den Fußbereich?',
      options: ['Weil das Impressum von jeder Seite aus leicht erreichbar sein muss', 'Weil Suchmaschinen die Seite sonst nicht finden', 'Weil Links nur im Fußbereich erlaubt sind', 'Weil der Fußbereich sonst leer wäre'],
      correct: 0,
      explanation: 'Das Impressum muss leicht erkennbar und von jeder Seite aus erreichbar sein. Der Fußbereich erscheint auf allen Seiten – deshalb steht der Link dort.',
    },
    {
      type: 'pair',
      text: 'Rückblick: Ordne jede Regel aus style.css ihrer Wirkung auf der Startseite zu.',
      pairs: [
        ['`footer a { color: #ffd23f; }`', 'Links im Fußbereich werden gelb – auch der neue Impressum-Link'],
        ['`nav { display: flex; gap: 16px; }`', 'Die Navigations-Links stehen nebeneinander mit Abstand'],
        ['`.hinweis { border-radius: 8px; }`', 'Die Hinweis-Box bekommt runde Ecken'],
        ['`th { color: #ff6a00; }`', 'Die Kopfzellen der Tabelle werden orange'],
      ],
    },
    {
      type: 'explain',
      text: 'Gleich in der Etappe: Nach dem Adress-Absatz im Fußbereich kommt ein weiterer Absatz mit den Links „Impressum“ (zur neuen Seite) und „Tickets“, getrennt durch einen Punkt in der Mitte. Beide sind interne Links – der Dateiname ist die Adresse.\n\nDanach lohnt ein Blick auf das Ganze: [FUNKEN-Website ansehen](#/projekt) – klick dich vom Fußbereich ins Impressum.',
    },
    { type: 'code', etappe: '15-recht-im-web/03-projekt-impressum' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '15-recht-im-web',
  fragen: [
    { id: '15-01', konzept: 'recht.urheberrecht', type: 'quiz', question: 'Du findest über die Bildersuche ein Bühnenfoto. Darfst du es auf deiner Website nutzen?', options: ['Nur mit Erlaubnis der Urheberin oder des Urhebers, etwa über eine Lizenz', 'Ja – alles im Internet ist frei nutzbar', 'Ja, wenn kein ©-Zeichen dabei steht'], correct: 0, explanation: 'Das Urheberrecht gilt automatisch. Fremde Werke nutzt du nur mit Erlaubnis, zum Beispiel über eine Lizenz.' },
    { id: '15-02', konzept: 'recht.urheberrecht', type: 'quiz', question: 'Ab wann ist ein Foto urheberrechtlich geschützt?', options: ['Sofort, sobald es gemacht wurde – ohne Anmeldung oder ©-Zeichen', 'Erst nach einer Anmeldung beim Amt', 'Erst, wenn ein ©-Zeichen darunter steht'], correct: 0, explanation: 'Der Schutz entsteht automatisch mit dem Werk – niemand muss etwas anmelden oder kennzeichnen.' },
    { id: '15-03', konzept: 'recht.urheberrecht', type: 'bug', text: 'Eine Aussage ist falsch. Welche?', lines: ['Fotos, Texte und Musik sind automatisch geschützt.', 'Wer ein Werk erstellt, ist Urheberin oder Urheber.', 'Ohne ©-Zeichen ist ein Bild frei nutzbar.', 'Auch ein Song für den Aftermovie braucht eine Erlaubnis.'], line: 2, explanation: 'Das ©-Zeichen ist nur ein Hinweis – der Schutz gilt auch ohne.' },
    { id: '15-04', konzept: 'recht.urheberrecht', type: 'fill', text: 'Vervollständige.', template: 'Wer ein Foto macht, ist dessen ___ und entscheidet über die Nutzung.', accept: ['Urheber', 'Urheberin', 'Urheber:in', 'Urheber*in'], hint: 'Das Recht heißt Urheberrecht – wie heißt die Person?' },
    { id: '15-05', konzept: 'recht.lizenz', type: 'pair', text: 'Ordne die Lizenzen zu.', pairs: [['CC BY', 'Nutzung erlaubt, Name nennen'], ['CC BY-NC', 'Name nennen, nur nicht-kommerziell'], ['CC0', 'keine Bedingungen'], ['keine Lizenzangabe', 'alle Rechte vorbehalten – erst fragen']] },
    { id: '15-06', konzept: 'recht.lizenz', type: 'quiz', question: 'Ein Bild steht unter CC BY. Was musst du tun, wenn du es nutzt?', options: ['Urheberin oder Urheber und die Lizenz nennen, etwa in der Bildunterschrift', 'Eine Gebühr überweisen', 'Nichts – CC BY heißt „frei ohne Bedingungen“'], correct: 0, explanation: 'BY steht für die Namensnennung: Name und Lizenz gehören zum Bild, zum Beispiel „Foto: Kim Vogt, CC BY 4.0“.' },
    { id: '15-07', konzept: 'recht.lizenz', type: 'bug', text: 'Das Foto steht unter CC BY. Welche Zeile ist unvollständig?', lines: ['<figure>', '  <img src="buehne.svg" alt="Bühne bei Nacht">', '  <figcaption>Bühne bei Nacht</figcaption>', '</figure>'], line: 2, explanation: 'Bei CC BY gehören Name und Lizenz in die Unterschrift: „Bühne bei Nacht (Foto: Kim Vogt, CC BY 4.0)“.' },
    { id: '15-08', konzept: 'recht.lizenz', type: 'fill', text: 'Vervollständige das Lizenz-Kürzel.', template: 'Bei CC ___ musst du den Namen nennen, bei CC0 gibt es keine Bedingungen.', accept: ['BY'], hint: 'Zwei Buchstaben, englisch für „von“.' },
    { id: '15-09', konzept: 'recht.lizenz', type: 'order', text: 'Sortiere: So nutzt du ein fremdes Bild richtig.', lines: ['Lizenz des Bildes prüfen', 'Bedingungen lesen: Ist Namensnennung nötig?', 'Bild in einen figure-Block einbauen', 'Nachweis in die Bildunterschrift schreiben'], explanation: 'Erst prüfen und lesen, dann einbauen – und der Nachweis kommt zur Unterschrift.' },
    { id: '15-10', konzept: 'recht.fotos', type: 'quiz', question: 'Welches Foto darf ohne Nachfragen auf die Festival-Website?', options: ['Die Menge vor der Bühne – niemand steht im Mittelpunkt', 'Eine Nahaufnahme eines einzelnen Gasts', 'Ein Gruppenfoto deiner Freunde vom Einlass'], correct: 0, explanation: 'Menschenmengen bei Veranstaltungen sind eine Ausnahme. Erkennbare Einzelpersonen brauchen eine Einwilligung – auch Freunde.' },
    { id: '15-11', konzept: 'recht.fotos', type: 'quiz', question: 'Eine Freundin schickt dir ein Selfie von sich. Darfst du es auf deiner Website zeigen?', options: ['Nur mit ihrer Einwilligung zur Veröffentlichung', 'Ja – sie hat es dir ja geschickt', 'Ja, wenn du ihren Namen weglässt'], correct: 0, explanation: 'Ein zugeschicktes Foto ist keine Erlaubnis, es zu veröffentlichen. Wer erkennbar ist, muss zustimmen.' },
    { id: '15-12', konzept: 'recht.fotos', type: 'fill', text: 'Vervollständige den Merksatz.', template: 'Wer erkennbar auf einem Foto ist, muss vor der Veröffentlichung seine ___ geben.', accept: ['Einwilligung', 'Zustimmung', 'Erlaubnis'], hint: 'Das Fachwort beginnt mit „Ein…“ – die Person willigt ein.' },
    { id: '15-13', konzept: 'recht.fotos', type: 'bug', text: 'Eine Aussage ist falsch. Welche?', lines: ['Wer erkennbar zu sehen ist, muss zustimmen.', 'Bei Minderjährigen müssen zusätzlich die Eltern einwilligen.', 'Wer dir ein Foto schickt, erlaubt damit die Veröffentlichung.', 'Das Publikum vor der Bühne als Ganzes darf meist gezeigt werden.'], line: 2, explanation: 'Schicken ist keine Einwilligung – für die Veröffentlichung musst du ausdrücklich fragen.' },
    { id: '15-14', konzept: 'recht.impressum', type: 'quiz', question: 'Welche Website braucht ein Impressum?', options: ['Die Festival-Seite mit Ticketverkauf – sie ist nicht rein privat', 'Keine – ein Impressum ist immer freiwillig', 'Nur Seiten mit mehr als 1000 Besuchen am Tag'], correct: 0, explanation: 'Sobald eine Website nicht rein privat ist – Verein, Schülerfirma, Shop, Blog –, braucht sie ein Impressum.' },
    { id: '15-15', konzept: 'recht.impressum', type: 'pair', text: 'Ordne die Angaben des Impressums zu.', pairs: [['Anschrift', 'Straße, Hausnummer, PLZ und Ort'], ['Kontakt', 'E-Mail-Adresse und etwa Telefon'], ['Verantwortliche Person', 'steht für Texte und Berichte gerade'], ['Link im Fußbereich', 'macht das Impressum von jeder Seite erreichbar']] },
    { id: '15-16', konzept: 'recht.impressum', type: 'bug', text: 'Eine Angabe im Impressum reicht so nicht. Welche?', lines: ['Kollektiv FUNKEN – Schülerfirma', 'Postfach 1234, 74001 Heilbronn', 'hallo@funken-festival-beispiel.de', 'Verantwortlich für Inhalte: Sam, Kollektiv FUNKEN'], line: 1, explanation: 'Ein Postfach reicht nicht – ins Impressum gehört eine Anschrift mit Straße und Hausnummer.' },
    { id: '15-17', konzept: 'recht.impressum', type: 'bug', text: 'Der E-Mail-Link im Impressum öffnet kein Mailprogramm. Welche Zeile ist falsch?', lines: ['<h2>Angaben</h2>', '<p>Kollektiv FUNKEN<br>Hafenstraße 9<br>74072 Heilbronn</p>', '<p><a href="hallo@funken-festival-beispiel.de">E-Mail schreiben</a></p>', '<h2>Datenschutzerklärung</h2>'], line: 2, explanation: 'Die Adresse eines E-Mail-Links beginnt mit `mailto:` – sonst sucht der Browser eine Datei mit diesem Namen.' },
    { id: '15-18', konzept: 'recht.datenschutz', type: 'quiz', question: 'Das Ticketformular speichert Name und E-Mail. Was muss die Datenschutzerklärung sagen?', options: ['Welche Daten gespeichert werden und wozu', 'Nichts – Name und E-Mail sind nicht personenbezogen', 'Nur, dass die Seite sicher ist'], correct: 0, explanation: 'Wer personenbezogene Daten erhebt, muss offen sagen, welche Daten es sind und wozu sie genutzt werden.' },
    { id: '15-19', konzept: 'recht.datenschutz', type: 'pair', text: 'Ordne die Begriffe zu.', pairs: [['personenbezogene Daten', 'alles, was zu einer Person gehört: Name, E-Mail, IP-Adresse'], ['Datensparsamkeit', 'nur so viele Daten erheben wie nötig'], ['Zweckbindung', 'Daten nur für den genannten Zweck nutzen'], ['Datenschutzerklärung', 'erklärt, welche Daten wozu gespeichert werden']] },
    { id: '15-20', konzept: 'recht.datenschutz', type: 'fill', text: 'Wie heißt das EU-Regelwerk zum Datenschutz (Abkürzung)?', template: 'Die ___ regelt, wie mit personenbezogenen Daten umgegangen wird.', accept: ['DSGVO', 'Datenschutz-Grundverordnung', 'Datenschutzgrundverordnung'], hint: 'Fünf Buchstaben: Datenschutz-Grundverordnung.' },
  ],
});

/* ---------- Abnahme ---------- */
const FITNESS_HTML = (mailHref) => '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Impressum – Fitness-Block</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <header>\n      <h1>Impressum</h1>\n    </header>\n\n    <main>\n      <h2>Angaben</h2>\n      <p>Fitness-Block Heilbronn (fiktiv)<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="' + mailHref + '">post@fitness-block-beispiel.de</a></p>\n\n      <h2>Datenschutzerklärung</h2>\n      <p>Beim Probetraining-Formular speichern wir Name und E-Mail nur, um den Termin zu bestätigen.</p>\n      <p class="hinweis"><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>\n    </main>\n  </body>\n</html>\n';

schreibe('boss.json', {
  chapter: '15-recht-im-web',
  title: 'Abnahme: Sicherheitszentrale',
  intro: 'Kurz mal ernst, Leute: Meine Schwester meint, ohne Impressum kriegen wir Post vom Anwalt. Also zeigt mir, dass die Galerie sauber nachgewiesen ist und das Impressum steht – dann darf der Bass wieder rein!',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'recht.urheberrecht', type: 'quiz', question: 'Sam will einen bekannten Song unter den Aftermovie auf der Website legen. Was gilt?', options: ['Nur mit Erlaubnis der Rechteinhaber – auch Musik ist urheberrechtlich geschützt', 'Erlaubt, weil der Song im Radio läuft', 'Erlaubt, wenn der Aftermovie kürzer als eine Minute ist'], correct: 0, explanation: 'Musik ist genauso geschützt wie Fotos und Texte. Ohne Lizenz bleibt nur der eigene Jingle.' },
    { konzept: 'recht.lizenz', type: 'pair', text: 'Ordne die Lizenz-Kürzel zu.', pairs: [['CC BY', 'Nutzung erlaubt, wenn der Name genannt wird'], ['CC BY-NC', 'Name nennen, nur nicht-kommerziell'], ['CC0', 'keine Bedingungen – Nennung freiwillig'], ['keine Lizenzangabe', 'alle Rechte vorbehalten – erst fragen']] },
    {
      type: 'code',
      task: '1. **Erstelle** aus dem vorhandenen Bild einen Bild-Block mit der Unterschrift „Zeltbühne am Abend (Foto: Kim Vogt, CC BY 4.0)“. 2. **Gestalte** den Block im Stylesheet als Karte: weißer Hintergrund, rundum 12 Pixel Innenabstand und 8 Pixel runde Ecken.',
      starter: {
        html: '<h2>Eindrücke</h2>\n<img src="buehne.svg" alt="Zeltbühne am Abend">\n',
        css: 'figure {\n  /* Karte */\n}\n\nfigcaption {\n  color: #6b6b7a;\n}\n',
      },
      solution: {
        html: '<h2>Eindrücke</h2>\n<figure>\n  <img src="buehne.svg" alt="Zeltbühne am Abend">\n  <figcaption>Zeltbühne am Abend (Foto: Kim Vogt, CC BY 4.0)</figcaption>\n</figure>\n',
        css: 'figure {\n  background-color: white;\n  padding: 12px;\n  border-radius: 8px;\n}\n\nfigcaption {\n  color: #6b6b7a;\n}\n',
      },
      tests: [
        { type: 'selector', selector: 'figure img[src="buehne.svg"]', count: 1, label: 'Das Bild liegt im Bild-Block' },
        { type: 'text', selector: 'figure figcaption', expected: 'Zeltbühne am Abend (Foto: Kim Vogt, CC BY 4.0)', label: 'Die Unterschrift enthält den Nachweis' },
        { type: 'style', selector: 'figure', prop: 'background-color', expected: 'white', label: 'Der Block hat einen weißen Hintergrund' },
        { type: 'style', selector: 'figure', prop: 'padding-top', expected: '12px', label: 'Der Block hat 12px Innenabstand' },
        { type: 'style', selector: 'figure', prop: 'border-top-left-radius', expected: '8px', label: 'Der Block hat 8px runde Ecken' },
      ],
    },
    { konzept: 'recht.fotos', type: 'quiz', question: 'Auf einem Foto vom Einlass ist eine Besucherin groß und erkennbar zu sehen. Was brauchst du, bevor es online geht?', options: ['Ihre Einwilligung – bei Minderjährigen zusätzlich die der Eltern', 'Nichts – auf einem Festival darf jede Person fotografiert werden', 'Nur den Namen der Fotografin in der Bildunterschrift'], correct: 0, explanation: 'Das Recht am eigenen Bild: Wer erkennbar im Mittelpunkt steht, muss der Veröffentlichung zustimmen.' },
    { konzept: 'recht.impressum', type: 'fill', text: 'Vervollständige.', template: 'Ein Impressum nennt Name, ___ und Kontakt des Anbieters – und ist von jeder Seite aus erreichbar.', accept: ['Anschrift', 'Adresse', 'Postanschrift'] },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Impressum-Seite: Der E-Mail-Link öffnet kein Mailprogramm, und der Text in der Hinweis-Box klebt am Rahmen, obwohl rundum 12 Pixel Innenabstand vorgesehen sind. Behebe beide Fehler.',
      starter: {
        html: FITNESS_HTML('post@fitness-block-beispiel.de'),
        css: 'body {\n  font-family: Arial, sans-serif;\n}\n\nh2 {\n  color: #d94f00;\n}\n\n.hinweis {\n  border: 2px solid #ff6a00;\n  paddin: 12px;\n  width: 320px;\n}\n',
      },
      solution: {
        html: FITNESS_HTML('mailto:post@fitness-block-beispiel.de'),
        css: 'body {\n  font-family: Arial, sans-serif;\n}\n\nh2 {\n  color: #d94f00;\n}\n\n.hinweis {\n  border: 2px solid #ff6a00;\n  padding: 12px;\n  width: 320px;\n}\n',
      },
      tests: [
        { type: 'attr', selector: 'main a', attr: 'href', expected: 'mailto:post@fitness-block-beispiel.de', label: 'Der E-Mail-Link öffnet das Mailprogramm' },
        { type: 'style', selector: '.hinweis', prop: 'padding-top', expected: '12px', label: 'Die Hinweis-Box hat 12px Innenabstand' },
        { type: 'style', selector: '.hinweis', prop: 'border-top-width', expected: '2px', label: 'Der Rahmen der Hinweis-Box bleibt' },
        { type: 'text', selector: 'main strong', expected: 'Fiktiver Betrieb für Übungszwecke.', label: 'Der Hinweis ist weiterhin stark betont' },
      ],
    },
    { konzept: 'recht.datenschutz', type: 'quiz', question: 'Was ist der Grundgedanke der DSGVO?', options: ['So wenig Daten wie möglich, klarer Zweck, offen sagen, was passiert', 'Alles darf gespeichert werden, solange die Seite HTTPS nutzt', 'Daten dürfen weitergegeben werden, solange niemand widerspricht'], correct: 0, explanation: 'Datensparsamkeit, Zweckbindung und Transparenz – dafür steht die Datenschutzerklärung.' },
    { konzept: 'recht.impressum', type: 'order', text: 'Sortiere den Hauptbereich der Impressum-Seite: erst die Angaben, dann die Datenschutzerklärung mit dem Hinweis auf den fiktiven Betrieb am Ende.', lines: ['<main>', '  <h2>Angaben</h2>', '  <p>Sneaker-Lager GmbH<br>Marktstraße 4<br>70173 Stuttgart</p>', '  <h2>Datenschutzerklärung</h2>', '  <p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>', '</main>'] },
    { konzept: 'css.flex', type: 'quiz', question: 'Die Links in der Navigation sollen nebeneinander stehen, mit 16 Pixel Abstand. Welche Regel?', options: ['`nav { display: flex; gap: 16px; }`', '`nav { display: block; gap: 16px; }`', '`nav { flex: 16px; }`', '`nav { margin: 16px; }`'], correct: 0, explanation: 'Flexbox schaltest du mit `display: flex` ein, der Abstand zwischen den Kindern ist `gap`.' },
    { konzept: 'css.sel-nachfahre', type: 'pair', text: 'Welcher Selektor trifft was?', pairs: [['`footer a`', 'Links im Fußbereich'], ['`.highlight`', 'alle Elemente mit der Klasse highlight'], ['`#lineup`', 'das Element mit der id lineup'], ['`nav a:hover`', 'Navigations-Links beim Überfahren mit der Maus'], ['`h1, h2`', 'alle h1- und alle h2-Überschriften']] },
    { konzept: 'html.th', type: 'bug', text: 'Die erste Zeile soll eine Kopfzeile sein, ist aber weder fett noch zentriert. Welche Zeile ist falsch?', lines: ['<table>', '  <tr>', '    <td>Truck</td><td>Highlight</td>', '  </tr>', '  <tr>', '    <td>Pizza-Truck</td><td>Margherita</td>', '  </tr>', '</table>'], line: 2, explanation: 'Kopfzellen sind `th`, nicht `td` – der Browser stellt sie fett und zentriert dar.' },
    { konzept: 'html.colspan', type: 'quiz', question: 'Die Zelle „Pause – Foodtrucks öffnen“ soll über beide Bühnen-Spalten gehen. Welches Attribut?', options: ['colspan mit dem Wert 2', 'rowspan mit dem Wert 2', 'width mit dem Wert 2'], correct: 0, explanation: 'colspan verbindet Spalten (col = column), rowspan würde Zeilen verbinden.' },
  ],
});
console.log('Kapitel 15 geschrieben');
