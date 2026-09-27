// Kapitel 13 – Box-Modell (Station „Container“).
// Erzeugt public/content/chapters/13-box-modell/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '13-box-modell');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Die vier Schichten einer Box: Inhalt, padding, border, margin.
const FIG_BOX = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="10" y="12" width="170" height="136" rx="6" fill="none" stroke="#b48cff" stroke-width="2" stroke-dasharray="6 4"/><rect x="28" y="28" width="134" height="104" fill="#ff7a45"/><rect x="40" y="40" width="110" height="80" fill="#4ade80"/><rect x="58" y="56" width="74" height="48" fill="#38c7ff"/><text x="95" y="84" text-anchor="middle" fill="#0f1320" font-weight="bold">Inhalt</text><rect x="196" y="30" width="12" height="12" fill="none" stroke="#b48cff" stroke-width="2" stroke-dasharray="3 2"/><text x="214" y="41" fill="#eef2ff">margin · außen</text><rect x="196" y="60" width="12" height="12" fill="#ff7a45"/><text x="214" y="71" fill="#eef2ff">border · Rahmen</text><rect x="196" y="90" width="12" height="12" fill="#4ade80"/><text x="214" y="101" fill="#eef2ff">padding · innen</text><rect x="196" y="120" width="12" height="12" fill="#38c7ff"/><text x="214" y="131" fill="#eef2ff">Inhalt</text></svg>`;

// Zwei Boxen: margin ist die Luft zwischen ihnen, width die Breite einer Box.
const FIG_MARGIN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#e8ecf7"/><rect x="24" y="52" width="112" height="72" fill="#38c7ff" stroke="#0f1320" stroke-width="2"/><text x="80" y="92" text-anchor="middle" fill="#0f1320" font-weight="bold">Kachel 1</text><rect x="184" y="52" width="112" height="72" fill="#38c7ff" stroke="#0f1320" stroke-width="2"/><text x="240" y="92" text-anchor="middle" fill="#0f1320" font-weight="bold">Kachel 2</text><path d="M140 80 V96 M140 88 H180 M180 80 V96" stroke="#b48cff" stroke-width="2" fill="none"/><text x="160" y="72" text-anchor="middle" fill="#0f1320">margin</text><path d="M24 34 V46 M24 40 H136 M136 34 V46" stroke="#ff7a45" stroke-width="2" fill="none"/><text x="80" y="28" text-anchor="middle" fill="#0f1320">width</text><text x="80" y="146" text-anchor="middle" fill="#0f1320">margin: Luft nach außen</text><text x="240" y="146" text-anchor="middle" fill="#0f1320">width: Breite der Box</text></svg>`;

// Karte mit runden Ecken und Schatten: x nach rechts, y nach unten, Weichzeichnung, Farbe.
const FIG_SCHATTEN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><rect x="66" y="58" width="130" height="76" rx="14" fill="#b48cff" fill-opacity="0.25"/><rect x="60" y="52" width="130" height="76" rx="14" fill="#b48cff" fill-opacity="0.5"/><rect x="40" y="32" width="130" height="76" rx="14" fill="#e8ecf7"/><text x="105" y="75" text-anchor="middle" fill="#0f1320" font-weight="bold">Karte</text><path d="M170 24 H190" stroke="#ffd84d" stroke-width="2" marker-end="url(#pf)"/><text x="200" y="28" fill="#ffd84d">x → rechts</text><path d="M28 108 V128" stroke="#ffd84d" stroke-width="2" marker-end="url(#pf)"/><text x="8" y="146" fill="#ffd84d">y ↓ unten</text><text x="200" y="76" fill="#b48cff">Weichzeichnung</text><text x="200" y="100" fill="#eef2ff">rgba = Farbe</text><path d="M40 46 Q40 32 54 32" stroke="#38c7ff" stroke-width="3" fill="none"/><text x="8" y="20" fill="#38c7ff">border-radius</text><defs><marker id="pf" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker></defs></svg>`;

/* ---------- Lektion 1: Rahmen und Innenabstand ---------- */
schreibe('lessons/01-rahmen-und-innenabstand.json', {
  id: '01-rahmen-und-innenabstand',
  title: 'Rahmen und Innenabstand',
  konzepte: ['css.border', 'css.padding'],
  steps: [
    {
      type: 'explain',
      text: 'Sam will, dass der Einlass-Hinweis auf der Startseite auffällt – wie ein Schild, nicht wie ein normaler Absatz. Dafür musst du wissen: Für den Browser ist **jedes Element eine Box**.\n\nVon innen nach außen: **Inhalt** (Text, Bild) → **padding** (Innenabstand) → **border** (Rahmen) → **margin** (Außenabstand).\n\nEselsbrücke: *Padding polstert innen, Margin macht Platz außen.*',
      figure: FIG_BOX,
    },
    {
      type: 'explain',
      text: 'Ein **Rahmen** braucht drei Angaben in einer Zeile: **Dicke**, **Linienart**, **Farbe**.\n\n```css\n.karte {\n  border: 3px solid #2f6fdb;\n}\n```\n\nLinienarten: `solid` (durchgezogen), `dashed` (gestrichelt), `dotted` (gepunktet), `double` (doppelt). Fehlt die Linienart, zeichnet der Browser **gar keinen** Rahmen – ein häufiger Fehler.',
    },
    {
      type: 'example',
      text: 'Eine Spielerkarte mit Rahmen. **Ändere** die Dicke `3px` auf `10px`, dann `solid` auf `dashed` oder `dotted` – und tausche zum Schluss die Farbe.',
      html: '<div class="spieler">\n  <h2>Neo_77</h2>\n  <p>Level 42 · 1.280 Punkte</p>\n</div>\n',
      css: '.spieler {\n  border: 3px solid #ff7a45;\n  background-color: #fff3e6;\n}\n',
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Im Stylesheet steht `border: 3px #e10600;` – aber im Browser ist kein Rahmen zu sehen. Warum?',
      options: ['Die Linienart fehlt – ohne sie zeichnet der Browser keinen Rahmen', '3 Pixel sind zu dünn, um sichtbar zu sein', 'Die Farbe muss vor der Dicke stehen', 'Rahmen brauchen zusätzlich eine Hintergrundfarbe'],
      correct: 0,
      explanation: 'Dicke, Linienart, Farbe – die Linienart ist Pflicht. Die Reihenfolge der drei Angaben ist dem Browser dagegen egal.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Produktkachel mit der Klasse `kachel`: ein 2 Pixel dicker, durchgezogener Rahmen in der Farbe `#1b1b2f`.',
      starter: {
        html: '<div class="kachel">\n  <img src="sneaker.svg" alt="Sneaker Modell Neon">\n  <h2>Sneaker „Neon“</h2>\n  <p>89,90 €</p>\n</div>\n',
        css: '.kachel {\n  background-color: white;\n  /* Rahmen hier ergänzen */\n}\n',
      },
      editable: ['css'],
      hints: [
        'Ein Rahmen ist die Eigenschaft border mit drei Angaben in einer Zeile.',
        'Die Angaben sind Dicke, Linienart und Farbe – zum Beispiel `border: 5px dotted red;`.',
        'Für „durchgezogen“ brauchst du die Linienart solid, für die Dicke 2px – und dann die Farbe aus der Aufgabe.',
      ],
      solution: {
        css: '.kachel {\n  background-color: white;\n  border: 2px solid #1b1b2f;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.kachel', prop: 'border-top-width', expected: '2px', label: 'Der Rahmen ist 2px dick' },
        { type: 'style', selector: '.kachel', prop: 'border-top-style', expected: 'solid', label: 'Der Rahmen ist durchgezogen' },
        { type: 'style', selector: '.kachel', prop: 'border-top-color', expected: '#1b1b2f', label: 'Der Rahmen hat die Farbe #1b1b2f' },
      ],
    },
    {
      type: 'explain',
      text: 'Jetzt klebt der Text am Rahmen. **Innenabstand** schafft Luft zwischen Inhalt und Rahmen – die Eigenschaft heißt **`padding`**:\n\n```css\n.karte {\n  padding: 16px;\n}\n```\n\nEin Wert gilt für **alle vier Seiten**. Nur eine Seite? Dann `padding-top`, `padding-right`, `padding-bottom` oder `padding-left`. Hat die Box eine Hintergrundfarbe, wächst die farbige Fläche mit.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Regel: Die Chat-Blase bekommt einen 2 Pixel dicken, gestrichelten Rahmen und rundum 12 Pixel Innenabstand.',
      template: '.blase {\n  border: 2px ___ #38c7ff;\n  ___: 12px;\n}',
      accept: [['dashed'], ['padding']],
      hint: 'Gestrichelt ist eine der vier Linienarten. Innenabstand ist die Eigenschaft, die innen Luft macht.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Chat-Nachrichten mit der Klasse `blase`: ein 1 Pixel dicker, durchgezogener Rahmen in `#38c7ff` und rundum 12 Pixel Innenabstand.',
      starter: {
        html: '<div class="chat">\n  <p class="blase">Kommst du Samstag zum Festival?</p>\n  <p class="blase">Klar! Ich hab schon Tickets.</p>\n</div>\n',
        css: '.blase {\n  background-color: #e6f7ff;\n  /* Rahmen und Innenabstand ergänzen */\n}\n',
      },
      editable: ['css'],
      hints: [
        'Zwei Eigenschaften: eine für den Rahmen, eine für den Innenabstand.',
        'Der Rahmen braucht Dicke, Linienart und Farbe – wie `border: 4px dotted green;`.',
        'Innenabstand für alle Seiten ist ein einziger Wert, etwa `padding: 30px;` – mit der Zahl aus der Aufgabe.',
      ],
      solution: {
        css: '.blase {\n  background-color: #e6f7ff;\n  border: 1px solid #38c7ff;\n  padding: 12px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.blase', prop: 'border-top-width', expected: '1px', label: 'Der Rahmen ist 1px dick' },
        { type: 'style', selector: '.blase', prop: 'border-top-style', expected: 'solid', label: 'Der Rahmen ist durchgezogen' },
        { type: 'style', selector: '.blase', prop: 'border-top-color', expected: '#38c7ff', label: 'Der Rahmen ist hellblau (#38c7ff)' },
        { type: 'style', selector: '.blase', prop: 'padding-top', expected: '12px', label: 'Oben sind 12px Innenabstand' },
        { type: 'style', selector: '.blase', prop: 'padding-left', expected: '12px', label: 'Links sind 12px Innenabstand' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Begriffe zu.',
      pairs: [
        ['`solid`', 'durchgezogene Linie'],
        ['`dashed`', 'gestrichelte Linie'],
        ['`dotted`', 'gepunktete Linie'],
        ['`padding`', 'Innenabstand – Luft zwischen Inhalt und Rahmen'],
        ['`padding-left`', 'Innenabstand nur auf der linken Seite'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** die zwei Fehler in der Regel für die Spielerkarte: Der Rahmen (2 Pixel, durchgezogen, `#ff7a45`) ist nicht zu sehen, und der Text klebt am Rand, obwohl 16 Pixel Innenabstand gemeint sind.',
      starter: {
        html: '<div class="spieler">\n  <h2>pixel_lena</h2>\n  <p>Level 39 · 1.150 Punkte</p>\n</div>\n',
        css: '.spieler {\n  background-color: #fff3e6;\n  boder: 2px solid #ff7a45;\n  padding: 16;\n}\n',
      },
      editable: ['css'],
      hints: [
        'Lies jede Zeile langsam: Stimmt der Name jeder Eigenschaft? Hat jede Zahl eine Einheit?',
        'Der Browser ignoriert Eigenschaften, die er nicht kennt – und Längenangaben ohne Einheit gleich mit.',
        'Die Eigenschaft für den Rahmen heißt border, Pixelwerte enden auf px.',
      ],
      solution: {
        css: '.spieler {\n  background-color: #fff3e6;\n  border: 2px solid #ff7a45;\n  padding: 16px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.spieler', prop: 'border-top-style', expected: 'solid', label: 'Der Rahmen ist zu sehen (durchgezogen)' },
        { type: 'style', selector: '.spieler', prop: 'border-top-width', expected: '2px', label: 'Der Rahmen ist 2px dick' },
        { type: 'style', selector: '.spieler', prop: 'border-top-color', expected: '#ff7a45', label: 'Der Rahmen ist orange' },
        { type: 'style', selector: '.spieler', prop: 'padding-top', expected: '16px', label: 'Der Text hat 16px Luft zum Rahmen' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Ab zur FUNKEN-Website! Auf der Startseite steht der Hinweis „Einlass ab 16:00 Uhr“ – bisher nur fett und dunkelorange. Sam will ihn als **Kasten**: ein orangefarbener Rahmen und Luft innen, damit der Text nicht am Rahmen klebt.\n\nDie Regel für die Klasse `hinweis` gibt es schon – du erweiterst sie um zwei Zeilen.',
    },
    { type: 'code', etappe: '13-box-modell/01-rahmen-und-innenabstand' },
  ],
});

/* ---------- Lektion 2: Außenabstand und Breite ---------- */
schreibe('lessons/02-aussenabstand-und-breite.json', {
  id: '02-aussenabstand-und-breite',
  title: 'Außenabstand und Breite',
  konzepte: ['css.margin', 'css.width'],
  steps: [
    {
      type: 'explain',
      text: 'Zwei Produktkacheln mit Rahmen – und sie kleben aneinander. Innen hilft `padding` nicht, der Abstand muss **nach außen**: **`margin`**, der **Außenabstand**.\n\n```css\n.kachel {\n  margin: 16px;\n}\n```\n\nWie bei padding gilt ein Wert für alle Seiten; `margin-top`, `margin-right`, `margin-bottom` und `margin-left` steuern eine einzelne Seite. Merke: *Padding polstert innen, Margin macht Platz außen.*',
      figure: FIG_MARGIN,
    },
    {
      type: 'example',
      text: 'Drei Kacheln, die aneinanderkleben. **Ändere** `margin-bottom: 0` auf `24px` und beobachte die Lücken. Probiere danach `margin-left: 40px` – die Kacheln rücken vom linken Rand weg.',
      html: '<div class="kachel">Sneaker „Neon“ – 89,90 €</div>\n<div class="kachel">Controller „Pulse“ – 49,90 €</div>\n<div class="kachel">Pizza Margherita – 8,50 €</div>\n',
      css: '.kachel {\n  border: 2px solid #1b1b2f;\n  padding: 12px;\n  margin-bottom: 0;\n}\n',
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Zwei Kacheln mit Rahmen kleben direkt aneinander. Welche Eigenschaft schafft eine Lücke **zwischen** ihnen?',
      options: ['`margin`', '`padding`', '`border`', '`line-height`'],
      correct: 0,
      explanation: 'margin ist der Abstand nach außen – zu anderen Boxen. padding macht nur innen Luft, die Rahmen würden trotzdem aneinanderkleben.',
    },
    {
      type: 'code',
      task: '**Erweitere** die Regel für die Klasse `nachricht`: Unter jeder Nachricht kommen 12 Pixel Außenabstand, damit die Blasen nicht aneinanderkleben. Links bleibt alles, wie es ist.',
      starter: {
        html: '<div class="chat">\n  <div class="nachricht">Bist du schon am Gelände?</div>\n  <div class="nachricht">Ja, stehe vor der Hauptbühne!</div>\n  <div class="nachricht">Komme in 5 Minuten.</div>\n</div>\n',
        css: '.nachricht {\n  background-color: #e6f7ff;\n  border: 1px solid #38c7ff;\n  padding: 10px;\n  /* Außenabstand nach unten ergänzen */\n}\n',
      },
      editable: ['css'],
      hints: [
        'Außenabstand ist margin – hier aber nur für eine Seite.',
        'Für eine einzelne Seite hängst du die Seite an den Namen: `margin-left: 30px;` gilt zum Beispiel nur links.',
        'Du brauchst die Variante für unten mit dem Wert aus der Aufgabe.',
      ],
      solution: {
        css: '.nachricht {\n  background-color: #e6f7ff;\n  border: 1px solid #38c7ff;\n  padding: 10px;\n  margin-bottom: 12px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.nachricht', prop: 'margin-bottom', expected: '12px', label: 'Unter jeder Nachricht sind 12px Luft' },
        { type: 'style', selector: '.nachricht', prop: 'margin-left', expected: '0px', label: 'Links bleibt die Nachricht am Rand' },
        { type: 'style', selector: '.nachricht', prop: 'padding-top', expected: '10px', label: 'Der Innenabstand bleibt erhalten' },
      ],
    },
    {
      type: 'explain',
      text: 'Für `padding` und `margin` gibt es **Kurzschreibweisen**:\n\n```css\npadding: 8px 16px;      /* oben+unten, links+rechts */\nmargin: 0 0 24px 0;     /* oben, rechts, unten, links */\n```\n\nZwei Werte: erst **oben/unten**, dann **links/rechts**. Vier Werte: **im Uhrzeigersinn** ab oben. Und: Absätze, Überschriften, Listen und `figure` bringen von Haus aus Außenabstand mit – `margin: 0;` entfernt ihn.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Regel: Die Kachel bekommt oben und unten 10 Pixel, links und rechts 20 Pixel Innenabstand – und nur nach unten 24 Pixel Außenabstand.',
      template: '.kachel {\n  padding: ___ 20px;\n  margin: 0 0 ___ 0;\n}',
      accept: [['10px'], ['24px']],
      hint: 'Zwei Werte: erst oben/unten, dann links/rechts. Vier Werte: oben, rechts, unten, links.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Kacheln mit der Klasse `kachel`: oben und unten 8 Pixel, links und rechts 16 Pixel Innenabstand – in einer Kurzschreibweise. Dazu 20 Pixel Außenabstand, aber nur nach unten.',
      starter: {
        html: '<div class="kachel"><strong>Sneaker „Neon“</strong> – 89,90 €</div>\n<div class="kachel"><strong>Controller „Pulse“</strong> – 49,90 €</div>\n<div class="kachel"><strong>Pizza Margherita</strong> – 8,50 €</div>\n',
        css: '.kachel {\n  background-color: white;\n  border: 1px solid #1b1b2f;\n  /* Innen- und Außenabstand ergänzen */\n}\n',
      },
      editable: ['css'],
      hints: [
        'Zwei Eigenschaften: padding mit zwei Werten, margin nur für unten.',
        'Zwei Werte bei padding: erst oben/unten, dann links/rechts – wie `padding: 4px 30px;`.',
        'Außenabstand nur unten geht mit margin-bottom oder mit margin und vier Werten (oben, rechts, unten, links).',
      ],
      solution: {
        css: '.kachel {\n  background-color: white;\n  border: 1px solid #1b1b2f;\n  padding: 8px 16px;\n  margin-bottom: 20px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.kachel', prop: 'padding-top', expected: '8px', label: 'Oben sind 8px Innenabstand' },
        { type: 'style', selector: '.kachel', prop: 'padding-left', expected: '16px', label: 'Links sind 16px Innenabstand' },
        { type: 'source', file: 'css', matches: 'padding\\s*:\\s*8px\\s+16px', label: 'Der Innenabstand steht als Kurzschreibweise' },
        { type: 'style', selector: '.kachel', prop: 'margin-bottom', expected: '20px', label: 'Unter jeder Kachel sind 20px Luft' },
        { type: 'style', selector: '.kachel', prop: 'margin-top', expected: '0px', label: 'Oben gibt es keinen Außenabstand' },
      ],
    },
    {
      type: 'order',
      text: 'Sortiere die Schichten einer Box von **innen nach außen**.',
      lines: ['Inhalt – Text oder Bild', 'padding – Innenabstand', 'border – Rahmen', 'margin – Außenabstand'],
      explanation: 'Padding polstert innen, dann kommt der Rahmen, Margin macht außen Platz.',
    },
    {
      type: 'explain',
      text: 'Blockelemente wie `div` oder `p` nehmen die **ganze Breite** ein. Mit **`width`** legst du eine feste Breite fest, mit **`max-width`** eine **Höchstbreite**: Auf kleinen Bildschirmen wird die Box schmaler, aber nie breiter als erlaubt.\n\n```css\n.karte {\n  width: 300px;\n}\n\nmain {\n  max-width: 720px;\n  margin: 0 auto;\n}\n```\n\n`margin: 0 auto;` verteilt den Außenabstand links und rechts gleichmäßig – die Box steht **mittig**.',
    },
    {
      type: 'quiz',
      question: 'Ein Textbereich soll auf dem Laptop 720 Pixel breit sein, auf dem Handy aber schmaler werden. Welche Eigenschaft passt?',
      options: ['`max-width`', '`width`', '`padding`', '`margin`'],
      correct: 0,
      explanation: 'max-width ist eine Höchstbreite: Ist der Bildschirm schmaler, schrumpft die Box mit. Mit width wäre sie fest 720px – auf dem Handy müsste man seitlich scrollen.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Rangliste: Der Bereich mit der Klasse `seite` wird höchstens 600 Pixel breit und steht mittig. Jede Spielerkarte (Klasse `karte`) wird genau 260 Pixel breit.',
      starter: {
        html: '<div class="seite">\n  <h1>Rangliste</h1>\n  <div class="karte">\n    <h2>Neo_77</h2>\n    <p>Level 42 · 1.280 Punkte</p>\n  </div>\n  <div class="karte">\n    <h2>pixel_lena</h2>\n    <p>Level 39 · 1.150 Punkte</p>\n  </div>\n</div>\n',
        css: '.seite {\n  background-color: #f2f4f8;\n  padding: 16px;\n  /* Höchstbreite und mittig */\n}\n\n.karte {\n  border: 2px solid #b48cff;\n  padding: 8px 16px;\n  margin-bottom: 12px;\n  /* feste Breite */\n}\n',
      },
      editable: ['css'],
      hints: [
        'Höchstbreite ist max-width, feste Breite ist width.',
        'Mittig: Der Außenabstand links und rechts bekommt den Wert auto, oben und unten 0 – die Kurzschreibweise mit zwei Werten kennst du.',
        'Drei neue Zeilen: zwei in der seite-Regel (Höchstbreite, Außenabstand), eine in der karte-Regel (Breite).',
      ],
      solution: {
        css: '.seite {\n  background-color: #f2f4f8;\n  padding: 16px;\n  max-width: 600px;\n  margin: 0 auto;\n}\n\n.karte {\n  border: 2px solid #b48cff;\n  padding: 8px 16px;\n  margin-bottom: 12px;\n  width: 260px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.seite', prop: 'max-width', expected: '600px', label: 'Der Bereich ist höchstens 600px breit' },
        { type: 'source', file: 'css', matches: 'margin\\s*:\\s*0(px)?\\s+auto|margin-left\\s*:\\s*auto', label: 'Der Bereich steht mittig (Außenabstand auto)' },
        { type: 'style', selector: '.karte', prop: 'width', expected: '260px', label: 'Jede Spielerkarte ist 260px breit' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Ab zur FUNKEN-Website! Der Hinweis-Kasten klebt am Absatz darüber und ist so breit wie die ganze Seite. Er bekommt Luft nach oben und eine feste Breite.\n\nAußerdem laufen die Textzeilen auf großen Bildschirmen endlos lang. Der Hauptbereich `main` bekommt deshalb eine Höchstbreite – dafür brauchst du eine **neue Regel** am Ende des Stylesheets.',
    },
    { type: 'code', etappe: '13-box-modell/02-aussenabstand-und-breite' },
  ],
});

/* ---------- Lektion 3: Ecken und Schatten ---------- */
schreibe('lessons/03-ecken-und-schatten.json', {
  id: '03-ecken-und-schatten',
  title: 'Runde Ecken und Schatten',
  konzepte: ['css.border-radius', 'css.box-shadow'],
  steps: [
    {
      type: 'explain',
      text: 'Buttons in Apps, Chat-Blasen, Profilbilder: Fast nichts im Web hat scharfe Ecken. **Runde Ecken** bekommt jede Box mit **`border-radius`** – auch ohne Rahmen:\n\n```css\n.knopf {\n  border-radius: 8px;\n}\n```\n\nJe größer der Wert, desto runder. `50%` macht aus einem Quadrat einen **Kreis** – perfekt für Profilbilder und Logos.',
      figure: FIG_SCHATTEN,
    },
    {
      type: 'example',
      text: 'Ein Truck-Logo und ein Bestell-Knopf. **Ändere** bei `.logo` den Wert `12px` auf `50%` – das quadratische Bild wird ein Kreis. Setze dann bei `.knopf` den Radius auf `999px` und beobachte die Pillenform.',
      html: '<img class="logo" src="pizza.svg" alt="Logo des Pizza-Trucks">\n<p><button class="knopf">Jetzt bestellen</button></p>\n',
      css: '.logo {\n  width: 120px;\n  border: 3px solid #ff7a45;\n  border-radius: 12px;\n}\n\n.knopf {\n  padding: 10px 24px;\n  border: 2px solid #1b1b2f;\n  background-color: #ffd84d;\n  border-radius: 4px;\n}\n',
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Ein quadratisches Profilbild soll ein **Kreis** werden. Welcher Wert für `border-radius` passt?',
      options: ['`50%`', '`0`', '`2px`', '`round`'],
      correct: 0,
      explanation: 'Die Hälfte der Breite als Radius – bei einem Quadrat ergibt das genau einen Kreis. 2px rundet nur minimal, und round gibt es als Wert nicht.',
    },
    {
      type: 'code',
      task: '**Gestalte** den Knopf mit der Klasse `knopf`: 20 Pixel runde Ecken sowie oben und unten 10 Pixel, links und rechts 24 Pixel Innenabstand.',
      starter: {
        html: '<button class="knopf">Ticket kaufen</button>\n',
        css: '.knopf {\n  background-color: #ff7a45;\n  color: white;\n  border: 2px solid #ff7a45;\n  font-size: 18px;\n  /* runde Ecken und Innenabstand */\n}\n',
      },
      editable: ['css'],
      hints: [
        'Runde Ecken sind eine eigene Eigenschaft mit einem Pixelwert.',
        'Die Eigenschaft heißt border-radius – `border-radius: 3px;` rundet zum Beispiel nur ganz leicht.',
        'Innenabstand mit zwei Werten: erst oben/unten, dann links/rechts.',
      ],
      solution: {
        css: '.knopf {\n  background-color: #ff7a45;\n  color: white;\n  border: 2px solid #ff7a45;\n  font-size: 18px;\n  border-radius: 20px;\n  padding: 10px 24px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.knopf', prop: 'border-top-left-radius', expected: '20px', label: 'Die Ecken sind 20px rund' },
        { type: 'style', selector: '.knopf', prop: 'padding-top', expected: '10px', label: 'Oben sind 10px Innenabstand' },
        { type: 'style', selector: '.knopf', prop: 'padding-left', expected: '24px', label: 'Links sind 24px Innenabstand' },
      ],
    },
    {
      type: 'explain',
      text: 'Ein **Schatten** lässt eine Box schweben – wie eine Karte, die auf dem Tisch liegt. Die Eigenschaft **`box-shadow`** bekommt vier Angaben:\n\n```css\n.karte {\n  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);\n}\n```\n\n1. Verschiebung nach **rechts** (x), 2. nach **unten** (y), 3. **Weichzeichnung** – je größer, desto weicher, 4. **Farbe**. Mit `0` als erstem Wert fällt der Schatten nur nach unten.',
    },
    {
      type: 'explain',
      text: 'Warum `rgba(0, 0, 0, 0.3)` statt `black`? Ein echter Schatten ist **halbdurchsichtig**. `rgba` mischt **R**ot, **G**rün und **B**lau (je 0–255) – die vierte Zahl ist die **Deckkraft** (alpha): `0` unsichtbar, `1` voll deckend.\n\n`rgba(0, 0, 0, 0.3)` heißt also: Schwarz, zu 30 % sichtbar. Der Hintergrund scheint durch – der Schatten wirkt weich und natürlich.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** den Schatten: 0 Pixel nach rechts, 6 Pixel nach unten, 10 Pixel weich, Schwarz mit 25 % Deckkraft.',
      template: '.karte {\n  box-shadow: 0 ___ 10px rgba(0, 0, 0, ___);\n}',
      accept: [['6px'], ['0.25', '.25', '25%']],
      hint: 'Reihenfolge: rechts, unten, weich, Farbe. Die Deckkraft ist eine Zahl zwischen 0 und 1.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Produktkachel mit der Klasse `kachel`: 12 Pixel runde Ecken und ein Schatten – 0 Pixel nach rechts, 4 Pixel nach unten, 12 Pixel weich, Schwarz mit 20 % Deckkraft.',
      starter: {
        html: '<div class="kachel">\n  <img src="controller.svg" alt="Controller Modell Pulse">\n  <h2>Controller „Pulse“</h2>\n  <p>49,90 €</p>\n</div>\n',
        css: 'body {\n  background-color: #f2f4f8;\n}\n\n.kachel {\n  background-color: white;\n  padding: 16px;\n  width: 220px;\n  /* runde Ecken und Schatten */\n}\n\nimg {\n  width: 100%;\n}\n',
      },
      editable: ['css'],
      hints: [
        'Zwei Eigenschaften: eine für die Ecken, eine für den Schatten.',
        'Der Schatten hat vier Angaben: rechts, unten, Weichzeichnung, Farbe – etwa `box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);`.',
        'Deckkraft 20 % schreibst du als 0.2 – die vierte Zahl in rgba.',
      ],
      solution: {
        css: 'body {\n  background-color: #f2f4f8;\n}\n\n.kachel {\n  background-color: white;\n  padding: 16px;\n  width: 220px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n}\n\nimg {\n  width: 100%;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.kachel', prop: 'border-top-left-radius', expected: '12px', label: 'Die Kachel hat 12px runde Ecken' },
        { type: 'style', selector: '.kachel', prop: 'box-shadow', expected: 'rgba(0, 0, 0, 0.2) 0px 4px 12px', contains: true, label: 'Die Kachel hat den Schatten (0 4px 12px, 20 % Schwarz)' },
        { type: 'style', selector: '.kachel', prop: 'padding-top', expected: '16px', label: 'Der Innenabstand bleibt erhalten' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Angaben von `box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.4);` zu.',
      pairs: [
        ['`2px`', 'Verschiebung nach rechts (x)'],
        ['`6px`', 'Verschiebung nach unten (y)'],
        ['`10px`', 'Weichzeichnung – je größer, desto weicher'],
        ['`rgba(0, 0, 0, 0.4)`', 'Farbe: Schwarz mit 40 % Deckkraft'],
        ['`border-radius`', 'runde Ecken – gehört nicht zum Schatten'],
      ],
    },
    {
      type: 'code',
      task: '**Gestalte** die Spielerkarte (Klasse `spieler`): 16 Pixel runde Ecken, 1 Pixel durchgezogener Rahmen in `#e0e4ee`, rundum 16 Pixel Innenabstand, Schatten 0 Pixel rechts, 8 Pixel unten, 16 Pixel weich, Schwarz mit 15 % Deckkraft. Das Profilbild (Klasse `profil`) wird ein Kreis.',
      starter: {
        html: '<div class="spieler">\n  <img class="profil" src="katze.svg" alt="Profilbild von Neo_77">\n  <h2>Neo_77</h2>\n  <p>Level 42 · 1.280 Punkte</p>\n</div>\n',
        css: 'body {\n  background-color: #f2f4f8;\n}\n\n.spieler {\n  background-color: white;\n  width: 220px;\n  /* Karten-Look */\n}\n\n.profil {\n  width: 80px;\n  height: 80px;\n  /* rund */\n}\n',
      },
      editable: ['css'],
      hints: [
        'Vier Eigenschaften für die Karte (Ecken, Rahmen, Innenabstand, Schatten), eine für das Bild.',
        'Ein Kreis entsteht mit border-radius und einem Prozentwert – der Hälfte.',
        'Schatten-Muster aus einem anderen Kontext: `box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);` – setze deine vier Werte ein.',
      ],
      solution: {
        css: 'body {\n  background-color: #f2f4f8;\n}\n\n.spieler {\n  background-color: white;\n  width: 220px;\n  border-radius: 16px;\n  border: 1px solid #e0e4ee;\n  padding: 16px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);\n}\n\n.profil {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.spieler', prop: 'border-top-left-radius', expected: '16px', label: 'Die Karte hat 16px runde Ecken' },
        { type: 'style', selector: '.spieler', prop: 'border-top-style', expected: 'solid', label: 'Die Karte hat einen durchgezogenen Rahmen' },
        { type: 'style', selector: '.spieler', prop: 'border-top-color', expected: '#e0e4ee', label: 'Der Rahmen ist hellgrau (#e0e4ee)' },
        { type: 'style', selector: '.spieler', prop: 'padding-top', expected: '16px', label: 'Die Karte hat 16px Innenabstand' },
        { type: 'style', selector: '.spieler', prop: 'box-shadow', expected: 'rgba(0, 0, 0, 0.15) 0px 8px 16px', contains: true, label: 'Die Karte hat den Schatten (0 8px 16px, 15 % Schwarz)' },
        { type: 'style', selector: '.profil', prop: 'border-top-left-radius', expected: '50%', label: 'Das Profilbild ist ein Kreis' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website! Zwei Dinge: Alle Bilder bekommen sanft gerundete Ecken – dafür brauchst du eine **neue Regel** für das Element `img`. Und der Hinweis-Kasten bekommt runde Ecken plus einen weichen Schatten nach unten, damit er über der Seite schwebt.\n\nDie Werte stehen in der Aufgabe. Die Hinweis-Zeilen kommen in die vorhandene Regel.',
    },
    { type: 'code', etappe: '13-box-modell/03-ecken-und-schatten' },
  ],
});

/* ---------- Lektion 4: Wiederholung ---------- */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Wiederholung! Heute mischen wir das Box-Modell mit Schrift (Kapitel 12), Selektoren (Kapitel 11), Formularen (Kapitel 09) und Links (Kapitel 05).\n\nAm Ende bekommen die Tabellen der Programm-Seite Luft in den Zellen und einen Rahmen.',
    },
    {
      type: 'quiz',
      question: 'Der Text einer Kachel klebt innen am Rahmen. Welche Eigenschaft schafft Luft zwischen Text und Rahmen?',
      options: ['`padding`', '`margin`', '`border`', '`width`'],
      correct: 0,
      explanation: 'padding ist der Innenabstand – zwischen Inhalt und Rahmen. margin würde nur außen Platz schaffen.',
    },
    {
      type: 'fill',
      text: '**Vervollständige** die Regeln: Links in der Navigation verlieren ihre Unterstreichung und werden beim Überfahren mit der Maus orange.',
      template: 'nav a {\n  text-decoration: ___;\n}\n\nnav a:___ {\n  color: #ff6a00;\n}',
      accept: [['none'], ['hover']],
      hint: 'Keine Unterstreichung ist der Wert none. Der Zustand „Maus darüber“ ist eine Pseudoklasse nach dem Doppelpunkt.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Kachel (Klasse `kachel`): 1 Pixel dicker, durchgezogener Rahmen in `#d0d4de`, rundum 16 Pixel Innenabstand, 12 Pixel runde Ecken. **Erstelle** außerdem eine Regel für die Klasse `preis`: fette Schrift, 24 Pixel groß.',
      starter: {
        html: '<div class="kachel">\n  <img src="pizza.svg" alt="Pizza Margherita">\n  <h2>Pizza Margherita</h2>\n  <p class="preis">8,50 €</p>\n</div>\n',
        css: '.kachel {\n  background-color: white;\n  width: 220px;\n  text-align: center;\n}\n\nimg {\n  width: 100%;\n}\n\n/* Regel für den Preis */\n',
      },
      editable: ['css'],
      hints: [
        'Drei Zeilen in der kachel-Regel und eine neue Regel mit Punkt-Selektor für den Preis.',
        'Fett ist die Schriftstärke mit dem Wert bold, die Schriftgröße kennst du aus Kapitel 12.',
        'Rahmen: Dicke, Linienart, Farbe in einer Zeile – wie `border: 4px dashed blue;`.',
      ],
      solution: {
        css: '.kachel {\n  background-color: white;\n  width: 220px;\n  text-align: center;\n  border: 1px solid #d0d4de;\n  padding: 16px;\n  border-radius: 12px;\n}\n\nimg {\n  width: 100%;\n}\n\n.preis {\n  font-weight: bold;\n  font-size: 24px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.kachel', prop: 'border-top-style', expected: 'solid', label: 'Die Kachel hat einen durchgezogenen Rahmen' },
        { type: 'style', selector: '.kachel', prop: 'border-top-color', expected: '#d0d4de', label: 'Der Rahmen ist hellgrau (#d0d4de)' },
        { type: 'style', selector: '.kachel', prop: 'padding-top', expected: '16px', label: 'Die Kachel hat 16px Innenabstand' },
        { type: 'style', selector: '.kachel', prop: 'border-top-left-radius', expected: '12px', label: 'Die Ecken sind 12px rund' },
        { type: 'style', selector: '.preis', prop: 'font-weight', expected: ['700', 'bold'], label: 'Der Preis ist fett' },
        { type: 'style', selector: '.preis', prop: 'font-size', expected: '24px', label: 'Der Preis ist 24px groß' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Link-Attribute ihrer Wirkung zu.',
      pairs: [
        ['`href="#lineup"`', 'Sprungmarke – springt zum Element mit der id lineup'],
        ['`href="mailto:hallo@beispiel.de"`', 'öffnet das Mailprogramm'],
        ['`href="programm.html"`', 'eigene Seite im selben Ordner'],
        ['`href="https://www.example.com"`', 'externe Website'],
        ['`target="_blank"`', 'öffnet den Link in einem neuen Tab'],
      ],
    },
    {
      type: 'order',
      text: 'Bringe das Anmelde-Formular in die richtige Reihenfolge: erst die Beschriftung, dann das Feld, zum Schluss der Knopf.',
      lines: ['<form>', '  <label for="email">E-Mail</label>', '  <input type="email" id="email" name="email">', '  <button type="submit">Anmelden</button>', '</form>'],
      explanation: 'Die Beschriftung steht vor dem Feld und zeigt mit for auf dessen id. Der Absende-Knopf kommt am Ende.',
    },
    {
      type: 'quiz',
      question: 'Kopfzellen und Datenzellen sollen mit **einer** Regel denselben Innenabstand bekommen. Welcher Selektor?',
      options: ['`th, td`', '`th td`', '`th + td`', '`th.td`'],
      correct: 0,
      explanation: 'Das Komma bildet eine Gruppe: Die Regel gilt für beide Elemente. `th td` wäre ein Nachfahren-Selektor – eine Datenzelle innerhalb einer Kopfzelle gibt es nicht.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** die zwei Fehler: Die Chat-Blasen (Klasse `blase`) sollen einen 1 Pixel dicken, durchgezogenen blauen Rahmen und 12 Pixel Außenabstand nach unten haben – im Browser sind sie aber rahmenlos und kleben aneinander.',
      starter: {
        html: '<div class="chat">\n  <div class="blase">Wer kommt Freitag zu Neonpuls?</div>\n  <div class="blase">Ich! Treffen am Einlass um 16 Uhr?</div>\n  <div class="blase">Passt, bis dann.</div>\n</div>\n',
        css: 'blase {\n  background-color: #e6f7ff;\n  border: 1px solid #38c7ff;\n  padding: 10px;\n  margin-bottom: 12;\n}\n',
      },
      editable: ['css'],
      hints: [
        'Erst den Selektor prüfen: Wie spricht man eine Klasse an?',
        'Dann jede Zeile: Hat jede Längenangabe eine Einheit?',
        'Klassen-Selektor mit Punkt davor, Pixelwerte enden auf px.',
      ],
      solution: {
        css: '.blase {\n  background-color: #e6f7ff;\n  border: 1px solid #38c7ff;\n  padding: 10px;\n  margin-bottom: 12px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.blase', prop: 'border-top-style', expected: 'solid', label: 'Die Blasen haben einen durchgezogenen Rahmen' },
        { type: 'style', selector: '.blase', prop: 'border-top-color', expected: '#38c7ff', label: 'Der Rahmen ist blau (#38c7ff)' },
        { type: 'style', selector: '.blase', prop: 'margin-bottom', expected: '12px', label: 'Unter jeder Blase sind 12px Luft' },
        { type: 'style', selector: '.blase', prop: 'padding-top', expected: '10px', label: 'Der Innenabstand wirkt' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Ab zur FUNKEN-Website, diesmal auf die Programm-Seite. Die Tabellen dort sind eng: Der Text klebt an den Zellrändern. Kopf- und Datenzellen bekommen mit **einer** gemeinsamen Regel Innenabstand – Kurzschreibweise mit zwei Werten. Und jede Tabelle bekommt einen dünnen, dunklen Rahmen.\n\nDie table-Regel gibt es schon, die Zellen-Regel ist neu.',
    },
    { type: 'code', etappe: '13-box-modell/04-wiederholung' },
  ],
});

/* ---------- Lektion 5: Projekt – Karten ---------- */
schreibe('lessons/05-projekt-karten.json', {
  id: '05-projekt-karten',
  title: 'Projekt: Bild-Karten',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Meilenstein! Rückblick: Der Hinweis-Kasten hat Rahmen, Luft, runde Ecken und Schatten, der Hauptbereich eine Höchstbreite, die Tabellen Rahmen und Innenabstand.\n\nJetzt die Galerie: Sam wünscht sich die Bilder mit Bildunterschrift als **Karten** – weiß, mit Luft innen und runden Ecken. Und ohne den Außenabstand, den `figure` von Haus aus mitbringt.',
    },
    {
      type: 'quiz',
      question: 'Bild-Blöcke (`figure`) bringen von Haus aus Außenabstand mit. Welche Eigenschaft setzt du auf 0, um ihn zu entfernen?',
      options: ['`margin`', '`padding`', '`border`', '`width`'],
      correct: 0,
      explanation: 'Außenabstand ist margin. Mit dem Wert 0 verschwindet der Abstand, den der Browser standardmäßig vergibt.',
    },
    {
      type: 'pair',
      text: 'Ordne jede Eigenschaft ihrer Wirkung zu.',
      pairs: [
        ['`border`', 'Rahmen: Dicke, Linienart, Farbe'],
        ['`padding`', 'Innenabstand'],
        ['`margin`', 'Außenabstand'],
        ['`max-width`', 'Höchstbreite'],
        ['`border-radius`', 'runde Ecken'],
        ['`box-shadow`', 'Schatten'],
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur Galerie! Jedes `figure`-Element wird eine Karte: weißer Hintergrund, rundum 12 Pixel Innenabstand, 12 Pixel runde Ecken, kein Außenabstand. Dafür brauchst du eine **neue Regel** mit dem Element-Selektor.\n\nDanach lohnt sich ein Blick auf die ganze Website unter **#/projekt** – Station „Container“ geschafft, gleich nimmt Sam ab!',
    },
    { type: 'code', etappe: '13-box-modell/05-projekt-karten' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '13-box-modell',
  fragen: [
    { id: '13-01', konzept: 'css.border', type: 'quiz', question: 'Welche Zeile ergibt einen 2 Pixel dicken, gestrichelten grauen Rahmen?', options: ['`border: 2px dashed gray;`', '`border: 2px gray;`', '`border: dashed;`'], correct: 0, explanation: 'Dicke, Linienart und Farbe – alle drei Angaben in einer Zeile.' },
    { id: '13-02', konzept: 'css.border', type: 'fill', text: 'Ein durchgezogener Rahmen, 3 Pixel dick, blau.', template: 'border: 3px ___ blue;', accept: ['solid'], hint: 'Die Linienart für „durchgezogen“.' },
    { id: '13-03', konzept: 'css.border', type: 'bug', text: 'Der Rahmen wird nicht angezeigt. Welche Zeile ist falsch?', lines: ['.karte {', '  background-color: white;', '  border: 2px #333333;', '  padding: 12px;', '}'], line: 2, explanation: 'Die Linienart fehlt (z. B. solid) – ohne sie zeichnet der Browser keinen Rahmen.' },
    { id: '13-04', konzept: 'css.padding', type: 'quiz', question: 'Der Text klebt innen am Rahmen der Box. Welche Eigenschaft hilft?', options: ['`padding`', '`margin`', '`border`'], correct: 0, explanation: 'padding ist der Innenabstand zwischen Inhalt und Rahmen.' },
    { id: '13-05', konzept: 'css.padding', type: 'fill', text: 'Nur oben 20 Pixel Innenabstand.', template: '___: 20px;', accept: ['padding-top'], hint: 'Innenabstand, nur für die obere Seite.' },
    { id: '13-06', konzept: 'css.padding', type: 'pair', text: 'Ordne die Kurzschreibweisen zu.', pairs: [['`padding: 10px;`', 'alle vier Seiten 10px'], ['`padding: 10px 20px;`', 'oben/unten 10px, links/rechts 20px'], ['`padding: 1px 2px 3px 4px;`', 'oben 1px, rechts 2px, unten 3px, links 4px']] },
    { id: '13-07', konzept: 'css.margin', type: 'quiz', question: 'Zwei Boxen kleben aneinander. Welche Eigenschaft schafft Abstand zwischen ihnen?', options: ['`margin`', '`padding`', '`border-radius`'], correct: 0, explanation: 'margin ist der Außenabstand – der Abstand zu anderen Boxen.' },
    { id: '13-08', konzept: 'css.margin', type: 'order', text: 'Sortiere die Schichten einer Box von innen nach außen.', lines: ['Inhalt', 'padding', 'border', 'margin'] },
    { id: '13-09', konzept: 'css.margin', type: 'bug', text: 'Der Außenabstand nach unten wirkt nicht. Welche Zeile ist falsch?', lines: ['.blase {', '  padding: 10px;', '  margin-bottom: 12;', '  border: 1px solid #38c7ff;', '}'], line: 2, explanation: 'Längen brauchen eine Einheit: 12px.' },
    { id: '13-10', konzept: 'css.width', type: 'quiz', question: 'Eine Box soll auf großen Bildschirmen 700 Pixel breit sein, auf dem Handy schmaler. Welche Eigenschaft?', options: ['`max-width`', '`width`', '`padding`'], correct: 0, explanation: 'max-width ist eine Höchstbreite – auf schmalen Bildschirmen schrumpft die Box mit.' },
    { id: '13-11', konzept: 'css.width', type: 'fill', text: 'Die Box steht mittig: Außenabstand oben/unten 0, links/rechts automatisch verteilt.', template: 'margin: 0 ___;', accept: ['auto'], hint: 'Das englische Wort für „automatisch“.' },
    { id: '13-12', konzept: 'css.width', type: 'bug', text: 'Die Box soll 300 Pixel breit sein, ist es aber nicht. Welche Zeile ist falsch?', lines: ['.karte {', '  widht: 300px;', '  padding: 16px;', '}'], line: 1, explanation: 'Tippfehler: Die Eigenschaft heißt width.' },
    { id: '13-13', konzept: 'css.border-radius', type: 'quiz', question: 'Ein quadratisches Bild soll rund werden. Welcher Wert für `border-radius`?', options: ['`50%`', '`0`', '`round`'], correct: 0, explanation: 'Die Hälfte der Breite als Radius ergibt bei einem Quadrat einen Kreis.' },
    { id: '13-14', konzept: 'css.border-radius', type: 'fill', text: 'Runde Ecken mit 8 Pixel Radius.', template: '___: 8px;', accept: ['border-radius'], hint: 'Die Eigenschaft für runde Ecken – zwei Wörter mit Bindestrich.' },
    { id: '13-15', konzept: 'css.border-radius', type: 'pair', text: 'Ordne die Werte ihrer Wirkung zu.', pairs: [['`border-radius: 0;`', 'scharfe Ecken'], ['`border-radius: 8px;`', 'leicht gerundete Ecken'], ['`border-radius: 50%;`', 'Kreis (bei einem Quadrat)']] },
    { id: '13-16', konzept: 'css.box-shadow', type: 'quiz', question: 'In `box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.4);` – wofür stehen die `10px`?', options: ['Weichzeichnung des Schattens', 'Verschiebung nach rechts', 'Verschiebung nach unten'], correct: 0, explanation: 'Reihenfolge: rechts (2px), unten (6px), Weichzeichnung (10px), Farbe.' },
    { id: '13-17', konzept: 'css.box-shadow', type: 'fill', text: 'Der Schatten ist Schwarz mit 30 % Deckkraft.', template: 'box-shadow: 0 4px 8px rgba(0, 0, 0, ___);', accept: ['0.3', '.3', '30%'], hint: 'Die Deckkraft als Zahl zwischen 0 und 1.' },
    { id: '13-18', konzept: 'css.box-shadow', type: 'bug', text: 'Weder Schatten noch runde Ecken erscheinen. Welche Zeile ist falsch?', lines: ['.karte {', '  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)', '  border-radius: 8px;', '}'], line: 1, explanation: 'Das Semikolon fehlt – die nächste Zeile klebt am Schatten, und der Browser verwirft beides.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '13-box-modell',
  title: 'Abnahme: Container',
  intro: 'Okay, die Kästen! Der Einlass-Hinweis sieht endlich aus wie ein Schild, die Tabellen haben Luft, die Galerie hat Karten – ich hab’s meiner Oma gezeigt, sie war begeistert. Zeig mir, dass du das Box-Ding wirklich drauf hast.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'css.border', type: 'quiz', question: 'Was bewirkt `border: 3px dotted #1b1b2f;`?', options: ['Einen 3 Pixel dicken, gepunkteten dunklen Rahmen', '3 Pixel Innenabstand in dunkler Farbe', 'Einen gestrichelten Rahmen mit 3 Pixel Außenabstand'], correct: 0, explanation: 'Dicke 3px, Linienart dotted (gepunktet), Farbe #1b1b2f.' },
    { konzept: 'css.margin', type: 'pair', text: 'Ordne die Eigenschaften zu.', pairs: [['`padding`', 'Innenabstand – zwischen Inhalt und Rahmen'], ['`margin`', 'Außenabstand – zu anderen Boxen'], ['`border`', 'Rahmen um die Box'], ['`max-width`', 'Höchstbreite der Box']] },
    {
      type: 'code',
      task: '**Gestalte** die Chat-Blasen (Klasse `blase`): 1 Pixel dicker, durchgezogener Rahmen in `#38c7ff`, rundum 12 Pixel Innenabstand, 12 Pixel Außenabstand nach unten und 16 Pixel runde Ecken.',
      starter: {
        html: '<div class="chat">\n  <div class="blase">Seid ihr schon da?</div>\n  <div class="blase">Ja, Zeltbühne, ganz vorne!</div>\n  <div class="blase">Komme sofort.</div>\n</div>\n',
        css: '.blase {\n  background-color: #e6f7ff;\n}\n',
      },
      editable: ['css'],
      solution: {
        css: '.blase {\n  background-color: #e6f7ff;\n  border: 1px solid #38c7ff;\n  padding: 12px;\n  margin-bottom: 12px;\n  border-radius: 16px;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.blase', prop: 'border-top-style', expected: 'solid', label: 'Die Blasen haben einen durchgezogenen Rahmen' },
        { type: 'style', selector: '.blase', prop: 'border-top-color', expected: '#38c7ff', label: 'Der Rahmen ist blau (#38c7ff)' },
        { type: 'style', selector: '.blase', prop: 'padding-top', expected: '12px', label: 'Die Blasen haben 12px Innenabstand' },
        { type: 'style', selector: '.blase', prop: 'margin-bottom', expected: '12px', label: 'Unter jeder Blase sind 12px Luft' },
        { type: 'style', selector: '.blase', prop: 'border-top-left-radius', expected: '16px', label: 'Die Ecken sind 16px rund' },
      ],
    },
    { konzept: 'css.width', type: 'fill', text: 'Der Hauptbereich soll höchstens 800 Pixel breit werden.', template: 'main {\n  ___: 800px;\n}', accept: ['max-width'] },
    { konzept: 'css.text-decoration', type: 'quiz', question: 'Die Links in der Navigation sollen keine Unterstreichung haben. Welche Deklaration passt?', options: ['`text-decoration: none;`', '`underline: false;`', '`font-style: none;`'], correct: 0, explanation: 'text-decoration steuert die Unterstreichung, none schaltet sie ab.' },
    { konzept: 'html.form', type: 'order', text: 'Bringe das Formular in die richtige Reihenfolge: Beschriftung, Feld, Knopf.', lines: ['<form>', '  <label for="name">Name</label>', '  <input type="text" id="name" name="name">', '  <button type="submit">Reservieren</button>', '</form>'] },
    {
      type: 'code',
      mode: 'fix',
      task: '**Behebe** den Fehler: Die Produktkachel (Klasse `kachel`) soll einen 3 Pixel dicken, durchgezogenen Rahmen in `#ff6a00` haben – im Browser ist aber kein Rahmen zu sehen.',
      starter: {
        html: '<div class="kachel">\n  <img src="ticket.svg" alt="Festivalpass">\n  <h2>Festivalpass</h2>\n  <p>20 €</p>\n</div>\n',
        css: '.kachel {\n  background-color: white;\n  padding: 16px;\n  width: 300px;\n  border: 3px #ff6a00;\n}\n\nimg {\n  width: 100%;\n}\n',
      },
      editable: ['css'],
      solution: {
        css: '.kachel {\n  background-color: white;\n  padding: 16px;\n  width: 300px;\n  border: 3px solid #ff6a00;\n}\n\nimg {\n  width: 100%;\n}\n',
      },
      tests: [
        { type: 'style', selector: '.kachel', prop: 'border-top-style', expected: 'solid', label: 'Der Rahmen ist zu sehen (durchgezogen)' },
        { type: 'style', selector: '.kachel', prop: 'border-top-width', expected: '3px', label: 'Der Rahmen ist 3px dick' },
        { type: 'style', selector: '.kachel', prop: 'border-top-color', expected: '#ff6a00', label: 'Der Rahmen ist orange (#ff6a00)' },
        { type: 'style', selector: '.kachel', prop: 'padding-top', expected: '16px', label: 'Der Innenabstand bleibt erhalten' },
      ],
    },
    { konzept: 'css.sel-nachfahre', type: 'quiz', question: 'Welcher Selektor trifft nur Links, die im Fußbereich stehen?', options: ['`footer a`', '`footer, a`', '`a footer`', '`footer.a`'], correct: 0, explanation: 'Nachfahren-Selektor: erst der Bereich, dann das Element – mit Leerzeichen. Das Komma wäre eine Gruppe aus footer und allen Links.' },
    { konzept: 'html.a-intern', type: 'pair', text: 'Ordne die Link-Adressen zu.', pairs: [['`href="#oben"`', 'Sprungmarke auf derselben Seite'], ['`href="mailto:hallo@beispiel.de"`', 'E-Mail-Link'], ['`target="_blank"`', 'öffnet in einem neuen Tab'], ['`href="tickets.html"`', 'eigene Unterseite']] },
    { konzept: 'css.box-shadow', type: 'bug', text: 'Der Schatten fehlt. Welche Zeile ist falsch?', lines: ['.karte {', '  border-radius: 8px;', '  box-shadwo: 0 4px 12px rgba(0, 0, 0, 0.2);', '  padding: 16px;', '}'], line: 2, explanation: 'Tippfehler: Die Eigenschaft heißt box-shadow.' },
    { konzept: 'css.border-radius', type: 'quiz', question: 'Ein Button soll komplett runde Enden bekommen (Pillenform). Welche Eigenschaft?', options: ['`border-radius`', '`border`', '`box-shadow`'], correct: 0, explanation: 'border-radius rundet die Ecken – ein großer Wert wie 999px ergibt die Pillenform.' },
  ],
});
console.log('Kapitel 13 geschrieben');
