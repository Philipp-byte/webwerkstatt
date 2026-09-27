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
      options: ['Nur mit Erlaubnis der Urheberin oder des Urhebers – etwa über eine Lizenz', 'Alles, was im Internet steht, darf frei genutzt werden', 'Ohne ©-Zeichen ist das Foto automatisch frei', 'Erlaubt, wenn der Name des Fotografen nicht bekannt ist'],
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
