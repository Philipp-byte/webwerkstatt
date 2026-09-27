// Kapitel 06 – Bilder & Medien (Station Foto-Wand).
// Erzeugt public/content/chapters/06-bilder-und-medien/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '06-bilder-und-medien');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// img: der Tag in der Seite zeigt per src auf eine Datei im Ordner; alt ist der Ersatz.
const FIG_IMG = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="18" text-anchor="middle" fill="#eef2ff" font-weight="bold">img holt eine Bilddatei in die Seite</text><rect x="16" y="30" width="124" height="112" rx="8" fill="#e8ecf7"/><rect x="28" y="42" width="72" height="8" rx="2" fill="#0f1320"/><rect x="28" y="56" width="100" height="6" rx="2" fill="#0f1320" opacity="0.35"/><rect x="28" y="70" width="100" height="60" rx="4" fill="#ff7a45"/><text x="78" y="104" text-anchor="middle" fill="#0f1320" font-weight="bold">&lt;img&gt;</text><path d="M142 100 H196" stroke="#ffd84d" stroke-width="2" marker-end="url(#pfeil-img)"/><text x="170" y="92" text-anchor="middle" fill="#ffd84d">src</text><rect x="206" y="66" width="98" height="68" rx="8" fill="#0f1320" stroke="#ff7a45" stroke-width="2"/><text x="255" y="95" text-anchor="middle" fill="#eef2ff">buehne.svg</text><text x="255" y="115" text-anchor="middle" fill="#ff7a45">Datei im Ordner</text><text x="160" y="155" text-anchor="middle" fill="#4ade80">alt = Ersatztext, falls das Bild fehlt</text><defs><marker id="pfeil-img" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#ffd84d"/></marker></defs></svg>`;

// audio/video: mit controls ein sichtbarer Player, ohne controls nichts.
const FIG_MEDIA = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="18" text-anchor="middle" fill="#eef2ff" font-weight="bold">Erst controls macht den Player sichtbar</text><text x="84" y="44" text-anchor="middle" fill="#4ade80" font-family="monospace">&lt;audio controls&gt;</text><rect x="16" y="54" width="136" height="36" rx="18" fill="#e8ecf7"/><path d="M34 63 L48 72 L34 81Z" fill="#0f1320"/><rect x="58" y="70" width="70" height="4" rx="2" fill="#0f1320" opacity="0.3"/><rect x="58" y="70" width="30" height="4" rx="2" fill="#ff7a45"/><circle cx="139" cy="72" r="5" fill="#0f1320"/><text x="84" y="110" text-anchor="middle" fill="#4ade80">Play, Zeit, Lautstärke</text><text x="236" y="44" text-anchor="middle" fill="#ff7a45" font-family="monospace">&lt;audio&gt;</text><rect x="168" y="54" width="136" height="36" rx="18" fill="none" stroke="#ff7a45" stroke-width="2" stroke-dasharray="6 4"/><text x="236" y="76" text-anchor="middle" fill="#ff7a45">nichts zu sehen</text><text x="236" y="110" text-anchor="middle" fill="#ff7a45">Ton da, Knöpfe fehlen</text><text x="160" y="146" text-anchor="middle" fill="#38c7ff">src = die Datei, die abgespielt wird</text></svg>`;

// figure: ein Block, der Bild und Unterschrift umschließt.
const FIG_FIGURE = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="18" text-anchor="middle" fill="#eef2ff" font-weight="bold">figure hält Bild und Unterschrift zusammen</text><rect x="70" y="30" width="180" height="122" rx="10" fill="none" stroke="#b48cff" stroke-width="2"/><text x="82" y="47" fill="#b48cff" font-family="monospace">&lt;figure&gt;</text><rect x="84" y="56" width="152" height="56" rx="6" fill="#e8ecf7"/><text x="160" y="88" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;img src alt&gt;</text><rect x="84" y="118" width="152" height="24" rx="6" fill="#ff7a45"/><text x="160" y="135" text-anchor="middle" fill="#0f1320" font-family="monospace">&lt;figcaption&gt;</text><text x="286" y="135" text-anchor="middle" fill="#ff7a45">sichtbar</text><text x="34" y="88" text-anchor="middle" fill="#38c7ff">Bild</text></svg>`;

/* ---------- Lektion 1: Bilder ---------- */
schreibe('lessons/01-bilder.json', {
  id: '01-bilder',
  title: 'Bilder',
  konzepte: ['html.img', 'html.alt'],
  steps: [
    {
      type: 'explain',
      text: 'Sam schickt das Bühnenfoto: „Das muss auf die Startseite!“ Bisher kann unsere Seite nur Text. Bilder holt das **img**-Element in die Seite.\n\n`img` ist ein **Leerelement** – wie `br` und `hr` hat es keinen schließenden Tag. Dafür braucht es zwei **Attribute**: **src** (englisch *source*, die Quelle) nennt die Bilddatei, **alt** den **Alternativtext**.\n\n```html\n<img src="pizza.svg" alt="Eine Pizza Margherita">\n```',
      figure: FIG_IMG,
    },
    {
      type: 'example',
      text: 'Links das Bild-Element, rechts das Bild. **Ändere** `sneaker.svg` in `controller.svg` – der Browser holt eine andere Datei. **Tippe** dann einen Dateinamen, den es nicht gibt (z. B. `hund.svg`): Statt des Bildes zeigt der Browser den Alternativtext.',
      html: '<h1>Mein Sneaker-Regal</h1>\n<p>Das neueste Paar:</p>\n<img src="sneaker.svg" alt="Ein blauer Sneaker mit weißen Streifen">\n',
    },
    {
      type: 'quiz',
      question: 'Was stimmt über das img-Element?',
      options: ['Es ist ein Leerelement – die Bilddatei steht im Attribut src', 'Der Dateiname steht zwischen öffnendem und schließendem Tag', 'Es braucht keine Attribute, der Browser findet das Bild selbst'],
      correct: 0,
      explanation: 'img hat keinen schließenden Tag und keinen Inhalt. Alles steckt in Attributen: src sagt, welche Datei geladen wird, alt liefert den Ersatztext.',
    },
    {
      type: 'code',
      task: '**Ergänze** unter dem Absatz ein Bild aus der Datei pizza.svg mit dem Alternativtext „Eine Pizza Margherita“.',
      starter: { html: '<h1>Pizza-Abend bei Nico</h1>\n<p>Heute gibt es Margherita für alle.</p>\n' },
      hints: [
        'Ein Bild ist ein Leerelement: ein einzelner Tag ohne Inhalt, direkt nach dem Absatz.',
        'Zwei Attribute: die Quelle mit dem Dateinamen und der Alternativtext – nach dem Muster `<img src="katze.svg" alt="Eine graue Katze">`.',
        'Setze in das Muster `<img src="…" alt="…">` den Dateinamen und den Text aus der Aufgabe ein.',
      ],
      solution: { html: '<h1>Pizza-Abend bei Nico</h1>\n<p>Heute gibt es Margherita für alle.</p>\n<img src="pizza.svg" alt="Eine Pizza Margherita">\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'pizza.svg', label: 'Das Bild lädt pizza.svg' },
        { type: 'attr', selector: 'img', attr: 'alt', expected: 'Eine Pizza Margherita', label: 'Der Alternativtext lautet „Eine Pizza Margherita“' },
        { type: 'order', selectors: ['p', 'img'], label: 'Das Bild steht unter dem Absatz' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Der **Alternativtext** ist kein Extra, sondern Pflicht. Er hilft in drei Fällen:\n\n- **Screenreader**: Blinde Nutzer:innen bekommen den Text vorgelesen – ohne alt hören sie nur „Bild“.\n- **Bild fehlt**: Falscher Dateiname, langsames Netz – statt des Bildes erscheint der Text.\n- **Suchmaschinen** verstehen, was auf dem Bild ist.\n\nGuter alt-Text sagt kurz, was zu sehen ist: „Die Hauptbühne bei Nacht“ – nicht „Bild“ und nicht der Dateiname.',
    },
    {
      type: 'fill',
      text: 'Vervollständige das Bild-Element für ein Festivalticket.',
      template: '<___ src="ticket.svg" ___="Ein gelbes Festivalticket">',
      accept: [['img'], ['alt']],
      hint: 'Erst der Name des Elements, dann das Attribut für den Alternativtext.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Setup-Seite: Der Controller wird nicht angezeigt, nur sein Alternativtext ist zu sehen. Und die Katze hat als Alternativtext nur noch „Eine“ statt „Eine graue Katze“. Beide Fehler stecken in den Bild-Elementen.',
      starter: { html: '<h1>Mein Setup</h1>\n<p>Damit zocke ich:</p>\n<img scr="controller.svg" alt="Ein grauer Controller mit bunten Knöpfen">\n<p>Und das ist meine Begleitung:</p>\n<img src="katze.svg" alt=Eine graue Katze>\n' },
      hints: [
        'Ein Bild, das nicht erscheint, hat fast immer ein Problem im Attribut für die Quelle – lies den Attributnamen Buchstabe für Buchstabe.',
        'Attributwerte mit Leerzeichen brauchen Anführungszeichen, sonst endet der Wert nach dem ersten Wort.',
        'Muster für beide Zeilen: `<img src="datei.svg" alt="Text mit Leerzeichen">`.',
      ],
      solution: { html: '<h1>Mein Setup</h1>\n<p>Damit zocke ich:</p>\n<img src="controller.svg" alt="Ein grauer Controller mit bunten Knöpfen">\n<p>Und das ist meine Begleitung:</p>\n<img src="katze.svg" alt="Eine graue Katze">\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'controller.svg', label: 'Der Controller wird geladen' },
        { type: 'attr', selector: 'img:nth-of-type(2)', attr: 'alt', expected: 'Eine graue Katze', label: 'Der Alternativtext der Katze ist vollständig' },
        { type: 'attr', selector: 'img:nth-of-type(2)', attr: 'src', expected: 'katze.svg', label: 'Das Katzenbild ist noch da' },
      ],
    },
    {
      type: 'explain',
      text: '**Größe:** Mit dem Attribut `width` legst du die Breite in Pixeln fest (nur die Zahl, ohne px), die Höhe passt der Browser automatisch an.\n\n**Formate** erkennst du an der Dateiendung:\n\n- `.svg` – Grafiken, Logos, Icons: in jeder Größe scharf\n- `.png` – Grafiken mit durchsichtigem Hintergrund\n- `.jpg` – Fotos\n- `.webp` – modern und klein, für Fotos und Grafiken\n\n```html\n<img src="plakat.svg" alt="Das Festivalplakat" width="200">\n```',
    },
    {
      type: 'pair',
      text: 'Ordne zu.',
      pairs: [
        ['src', 'Dateiname des Bildes'],
        ['alt', 'Ersatztext – falls das Bild fehlt oder vorgelesen wird'],
        ['width', 'Breite in Pixeln'],
        ['.svg', 'Grafik oder Logo – in jeder Größe scharf'],
        ['.jpg', 'Foto'],
      ],
    },
    {
      type: 'code',
      task: '**Ergänze** zwei Bilder, jeweils direkt nach dem Absatz des Abschnitts: 1. „Neu im Regal“: sneaker.svg, Alternativtext „Ein blauer Sneaker mit weißen Streifen“. 2. „Immer dabei“: ticket.svg, Alternativtext „Ein gelbes Festivalticket“, 240 Pixel breit.',
      starter: { html: '<h1>Mein Sneaker-Regal</h1>\n<h2>Neu im Regal</h2>\n<p>Gekauft im Praktikum – vom ersten eigenen Geld.</p>\n<h2>Immer dabei</h2>\n<p>Mein Festivalticket – liegt schon im Schuh.</p>\n' },
      hints: [
        'Zwei Bild-Elemente, jedes direkt nach „seinem“ Absatz.',
        'Die Breite ist ein drittes Attribut nach dem Muster `width="120"` – der Wert ohne px.',
        'Muster: `<img src="…" alt="…" width="…">` – beim ersten Bild ohne width.',
      ],
      solution: { html: '<h1>Mein Sneaker-Regal</h1>\n<h2>Neu im Regal</h2>\n<p>Gekauft im Praktikum – vom ersten eigenen Geld.</p>\n<img src="sneaker.svg" alt="Ein blauer Sneaker mit weißen Streifen">\n<h2>Immer dabei</h2>\n<p>Mein Festivalticket – liegt schon im Schuh.</p>\n<img src="ticket.svg" alt="Ein gelbes Festivalticket" width="240">\n' },
      tests: [
        { type: 'selector', selector: 'img', count: 2, label: 'Es gibt genau zwei Bilder' },
        { type: 'attr', selector: 'img[src="sneaker.svg"]', attr: 'alt', expected: 'Ein blauer Sneaker mit weißen Streifen', label: 'Der Sneaker hat den richtigen Alternativtext' },
        { type: 'attr', selector: 'img[src="ticket.svg"]', attr: 'alt', expected: 'Ein gelbes Festivalticket', label: 'Das Ticket hat den richtigen Alternativtext' },
        { type: 'attr', selector: 'img[src="ticket.svg"]', attr: 'width', expected: '240', label: 'Das Ticket ist 240 Pixel breit' },
        { type: 'order', selectors: ['h2:nth-of-type(1) + p', 'img[src="sneaker.svg"]', 'h2:nth-of-type(2) + p', 'img[src="ticket.svg"]'], label: 'Jedes Bild steht nach seinem Absatz' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Jetzt kommt Sams Bühnenfoto auf die Startseite – direkt unter den Willkommens-Absatz, damit Besucher:innen sofort sehen, worum es geht.\n\nDie Datei heißt buehne.svg und liegt im selben Ordner wie die Seite, der Dateiname als Quelle reicht also. Und der Alternativtext ist Pflicht: Sam will, dass wirklich alle erfahren, was auf dem Bild ist.',
    },
    { type: 'code', etappe: '06-bilder-und-medien/01-bilder' },
  ],
});

/* ---------- Lektion 2: Audio und Video ---------- */
schreibe('lessons/02-audio-und-video.json', {
  id: '02-audio-und-video',
  title: 'Audio und Video',
  konzepte: ['html.audio-video'],
  steps: [
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Sam hat noch mehr geschickt: den **FUNKEN-Jingle** als Audiodatei und einen kurzen Clip fürs **Aftermovie**. Für Ton gibt es das **audio**-Element, für Film **video**.\n\nAnders als `img` haben beide einen **schließenden Tag**. Die Datei steht wieder in `src`. Ganz wichtig ist das Attribut **controls**: Erst damit zeigt der Browser Play, Pause und Lautstärke – ohne controls bleibt der Player unsichtbar.\n\n```html\n<audio controls src="jingle.wav"></audio>\n```',
      figure: FIG_MEDIA,
    },
    {
      type: 'example',
      text: 'Klick auf Play beim Jingle. **Lösche** dann das Wort `controls` im audio-Element – der Player verschwindet, obwohl das Element noch da ist. Setz es wieder ein und **ändere** beim Video `width` auf 160.',
      html: '<h1>Klassen-Podcast</h1>\n<h2>Intro-Jingle</h2>\n<audio controls src="jingle.wav"></audio>\n<h2>Folge 1 als Video</h2>\n<video controls src="clip.webm" width="320"></video>\n',
    },
    {
      type: 'quiz',
      question: 'Im Code steht `<audio src="jingle.wav"></audio>`, aber auf der Seite ist kein Player zu sehen. Warum?',
      options: ['Das Attribut controls fehlt – ohne Bedienelemente bleibt der Player unsichtbar', 'Die Datei muss zwischen den Tags stehen, nicht in src', 'audio braucht wie img keinen schließenden Tag'],
      correct: 0,
      explanation: 'Der Browser lädt den Ton, zeigt aber nichts an. Erst controls blendet Play, Pause und Lautstärke ein.',
    },
    {
      type: 'code',
      task: '**Ergänze** unter dem Absatz einen Audio-Player mit Bedienelementen für die Datei jingle.wav.',
      starter: { html: '<h1>Schulradio Neckarblick</h1>\n<p>Unser neuer Jingle – hör mal rein:</p>\n' },
      hints: [
        'Ton braucht das audio-Element – mit öffnendem und schließendem Tag.',
        'Zwei Attribute im öffnenden Tag: eines für die Bedienelemente, eines für die Datei. Bei einem Video sieht das so aus: `<video controls src="film.webm"></video>`.',
        'Gleiches Muster mit audio und der Datei aus der Aufgabe: `<audio … src="…"></audio>`.',
      ],
      solution: { html: '<h1>Schulradio Neckarblick</h1>\n<p>Unser neuer Jingle – hör mal rein:</p>\n<audio controls src="jingle.wav"></audio>\n' },
      tests: [
        { type: 'attr', selector: 'audio', attr: 'src', expected: 'jingle.wav', label: 'Der Player lädt jingle.wav' },
        { type: 'attr', selector: 'audio', attr: 'controls', present: true, label: 'Der Player hat Bedienelemente' },
        { type: 'order', selectors: ['p', 'audio'], label: 'Der Player steht unter dem Absatz' },
      ],
    },
    {
      type: 'explain',
      text: 'Für Film nimmst du **video** – gleiches Prinzip, und wie beim Bild passt `width` dazu:\n\n```html\n<video controls src="clip.webm" width="320"></video>\n```\n\n**Formate:** Audio meist `.mp3` oder `.wav`, Video `.mp4` oder `.webm`. Der Browser spielt nur ab, was er kennt – diese vier sind die sichere Wahl. Große Filme liegen meist auf Videoplattformen, ein kurzer Clip darf auf dem eigenen Server bleiben.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Video-Player: Bedienelemente und 320 Pixel Breite.',
      template: '<video ___ src="clip.webm" ___="320"></video>',
      accept: [['controls'], ['width']],
      hint: 'Das erste Attribut steht allein, ohne Wert. Das zweite bekommt die Zahl.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Workout-Seite: Unter „Warm-up-Track“ ist kein Player zu sehen, und der Absatz „Drei Runden, dann Pause.“ ist verschwunden. Beide Fehler stecken in den Medien-Elementen.',
      starter: { html: '<h1>Workout-Mix</h1>\n<h2>Warm-up-Track</h2>\n<audio src="jingle.wav"></audio>\n<h2>Übungs-Video</h2>\n<video controls src="clip.webm" width="320">\n<p>Drei Runden, dann Pause.</p>\n' },
      hints: [
        'Ein Player ohne Bedienelemente ist unsichtbar – welches Attribut fehlt beim Audio?',
        'Audio und Video haben – anders als img – einen schließenden Tag. Fehlt er, verschluckt das Element alles, was danach kommt.',
        'Vergleiche beide Zeilen mit dem Muster `<audio controls src="…"></audio>`.',
      ],
      solution: { html: '<h1>Workout-Mix</h1>\n<h2>Warm-up-Track</h2>\n<audio controls src="jingle.wav"></audio>\n<h2>Übungs-Video</h2>\n<video controls src="clip.webm" width="320"></video>\n<p>Drei Runden, dann Pause.</p>\n' },
      tests: [
        { type: 'selector', selector: 'audio[controls]', label: 'Der Warm-up-Player ist sichtbar' },
        { type: 'attr', selector: 'audio', attr: 'src', expected: 'jingle.wav', label: 'Der Warm-up-Player spielt jingle.wav' },
        { type: 'selector', selector: 'video + p', label: 'Der Absatz steht wieder unter dem Video' },
        { type: 'attr', selector: 'video', attr: 'controls', present: true, label: 'Das Video behält seine Bedienelemente' },
      ],
    },
    {
      type: 'explain',
      text: 'Die Galerie wird eine **neue Seite** – also eine neue Datei mit komplettem **Grundgerüst**. Zur Erinnerung: Dokumenttyp, `html` mit Sprache, `head` mit Zeichensatz und Titel, `body` mit allem Sichtbaren.\n\n```html\n<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Katzen-Blog</title>\n  </head>\n  <body>\n    <h1>Mietz</h1>\n    <video controls src="clip.webm"></video>\n  </body>\n</html>\n```\n\nDer Titel erscheint im Browser-Tab, nicht auf der Seite.',
    },
    {
      type: 'order',
      text: 'Sortiere die Zeilen einer kompletten Seite mit einem Audio-Player.',
      lines: ['<!DOCTYPE html>', '<html lang="de">', '<head>', '<meta charset="utf-8">', '<title>Pizza-Abend</title>', '</head>', '<body>', '<audio controls src="jingle.wav"></audio>', '</body>', '</html>'],
      explanation: 'Dokumenttyp, dann html. Darin zuerst der head (unsichtbar), dann der body (sichtbar).',
    },
    {
      type: 'code',
      task: '**Erstelle** die komplette Seite: Grundgerüst (Deutsch, UTF-8, Titel „Meine Clips“), Hauptüberschrift „Meine Clips“, darunter ein Video-Player für clip.webm und danach ein Audio-Player für jingle.wav – beide mit Bedienelementen.',
      starter: { html: '<!-- Meine Clips – Seite von Nico -->\n' },
      hints: [
        'Erst das Grundgerüst wie im Katzen-Blog, dann der Inhalt in den body. Der Kommentar darf bleiben oder weg.',
        'Sprache und Zeichensatz stehen im Gerüst, der Titel im head, die Überschrift im body.',
        'Reihenfolge im body: h1, dann `<video controls src="…"></video>`, dann das audio-Element nach gleichem Muster.',
      ],
      solution: { html: '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8">\n    <title>Meine Clips</title>\n  </head>\n  <body>\n    <h1>Meine Clips</h1>\n    <video controls src="clip.webm" width="320"></video>\n    <audio controls src="jingle.wav"></audio>\n  </body>\n</html>\n' },
      tests: [
        { type: 'source', file: 'html', matches: '<!doctype html>', label: 'Die Seite beginnt mit dem Dokumenttyp' },
        { type: 'source', file: 'html', matches: '<html[^>]*\\slang=["\']de["\']', label: 'Die Seite ist als Deutsch gekennzeichnet' },
        { type: 'source', file: 'html', matches: '<meta[^>]*charset=["\']?utf-8', label: 'Der Zeichensatz UTF-8 ist angegeben' },
        { type: 'text', selector: 'title', expected: 'Meine Clips', label: 'Der Titel lautet „Meine Clips“' },
        { type: 'text', selector: 'h1', expected: 'Meine Clips', label: 'Die Hauptüberschrift lautet „Meine Clips“' },
        { type: 'selector', selector: 'video[controls][src="clip.webm"] ~ audio[controls][src="jingle.wav"]', label: 'Video-Player (clip.webm), danach Audio-Player (jingle.wav), beide mit Bedienelementen' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Zeit für die zweite Seite der FUNKEN-Website: die **Galerie**. Sie startet mit dem Jingle und dem Aftermovie, die Fotos folgen in der nächsten Lektion.\n\nWeil es eine neue Datei ist, baust du das Grundgerüst komplett selbst: Titel „Galerie – FUNKEN“, dann die Hauptüberschrift und zwei Abschnitte mit je einem Player. Die Startseite verlinkt schon auf galerie.html – ab jetzt führt der Link irgendwohin.',
    },
    { type: 'code', etappe: '06-bilder-und-medien/02-audio-und-video' },
  ],
});

/* ---------- Lektion 3: figure und Bildunterschrift ---------- */
schreibe('lessons/03-figure-und-bildunterschrift.json', {
  id: '03-figure-und-bildunterschrift',
  title: 'figure und Bildunterschrift',
  konzepte: ['html.figure'],
  steps: [
    {
      type: 'explain',
      text: 'Sam will unter jedem Foto lesen, was drauf ist – sichtbar für alle, nicht nur für Screenreader. Dafür gibt es einen eigenen Block: **figure** fasst ein Bild und seine Beschriftung zusammen, **figcaption** ist die sichtbare **Bildunterschrift**.\n\n```html\n<figure>\n  <img src="pizza.svg" alt="Eine Pizza Margherita">\n  <figcaption>Unsere Margherita – frisch aus dem Ofen</figcaption>\n</figure>\n```\n\nBeide haben einen schließenden Tag, das Bild bleibt ein Leerelement.',
      figure: FIG_FIGURE,
    },
    {
      type: 'example',
      text: '**Ändere** den Text in der Bildunterschrift. **Verschiebe** dann die figcaption-Zeile vor das Bild – die Unterschrift wandert nach oben. Beides ist erlaubt, solange sie innerhalb von figure bleibt.',
      html: '<h1>Mietz, die Werkstatt-Katze</h1>\n<figure>\n  <img src="katze.svg" alt="Eine graue Katze mit gelben Augen">\n  <figcaption>Mietz auf ihrem Lieblingsplatz: der Tastatur</figcaption>\n</figure>\n',
    },
    {
      type: 'quiz',
      question: 'Wo gehört die sichtbare Bildunterschrift hin?',
      options: ['In ein figcaption-Element innerhalb von figure', 'In das alt-Attribut des Bildes', 'In das src-Attribut, hinter den Dateinamen'],
      correct: 0,
      explanation: 'alt ist der unsichtbare Ersatz fürs Bild. Die sichtbare Unterschrift steht in figcaption – und figure hält beides zusammen.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz einen Bild-Block: das Bild sneaker.svg (Alternativtext „Ein blauer Sneaker mit weißen Streifen“) mit der Bildunterschrift „Sieger im März: der Blaue“.',
      starter: { html: '<h1>Sneaker des Monats</h1>\n<p>Die Wahl war knapp – hier ist der Sieger:</p>\n' },
      hints: [
        'Ein Bild-Block ist ein figure-Element; Bild und Unterschrift stehen darin.',
        'Die Unterschrift ist ein eigenes Element mit schließendem Tag, direkt unter dem Bild: `<figcaption>Text</figcaption>`.',
        'Struktur: `<figure>`, darin das Bild-Element, dann die Unterschrift, dann `</figure>`.',
      ],
      solution: { html: '<h1>Sneaker des Monats</h1>\n<p>Die Wahl war knapp – hier ist der Sieger:</p>\n<figure>\n  <img src="sneaker.svg" alt="Ein blauer Sneaker mit weißen Streifen">\n  <figcaption>Sieger im März: der Blaue</figcaption>\n</figure>\n' },
      tests: [
        { type: 'attr', selector: 'figure img', attr: 'src', expected: 'sneaker.svg', label: 'Im Bild-Block liegt sneaker.svg' },
        { type: 'attr', selector: 'figure img', attr: 'alt', expected: 'Ein blauer Sneaker mit weißen Streifen', label: 'Der Alternativtext stimmt' },
        { type: 'text', selector: 'figure figcaption', expected: 'Sieger im März: der Blaue', label: 'Die Bildunterschrift lautet „Sieger im März: der Blaue“' },
        { type: 'order', selectors: ['p', 'figure'], label: 'Der Block steht unter dem Absatz' },
      ],
    },
    {
      type: 'explain',
      text: '**alt** und **figcaption** sind keine Doppelung:\n\n- `alt` ersetzt das Bild, wenn es fehlt oder vorgelesen wird – er beschreibt, was zu sehen ist.\n- `figcaption` sehen alle. Sie ergänzt: Name, Ort, Anlass, Fotograf:in.\n\nEin figure-Block kann statt eines Bildes auch ein Video halten:\n\n```html\n<figure>\n  <video controls src="clip.webm" width="320"></video>\n  <figcaption>Das Finale – letzte Minute</figcaption>\n</figure>\n```',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Bild-Block für ein Festivalticket.',
      template: '<___>\n  <img src="ticket.svg" alt="Ein gelbes Festivalticket">\n  <___>Mein Ticket für Samstag</figcaption>\n</___>',
      accept: [['figure'], ['figcaption'], ['figure']],
      hint: 'Außen der Block, innen die Unterschrift – der schließende Tag passt zum öffnenden.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Fan-Seite: Die Bildunterschrift steht neben dem Foto statt darunter, und der Absatz mit dem nächsten Heimspiel ist nach rechts gerutscht. Beide Fehler stecken im Bild-Block.',
      starter: { html: '<h1>SV Neckarblick – Fans</h1>\n<figure>\n  <img src="crowd.svg" alt="Der Fanblock beim Heimspiel" width="200">\n  <figcapton>Der Fanblock beim Derby</figcapton>\n<p>Nächstes Heimspiel: Samstag, 15 Uhr.</p>\n' },
      hints: [
        'Zwei Stellen: der Name des Unterschrift-Elements und das Ende des Blocks.',
        'Jeder Block braucht seinen schließenden Tag, sonst gehört alles danach noch dazu. Lies den Tag-Namen der Unterschrift Buchstabe für Buchstabe.',
        'Ziel-Struktur: `<figure>` – Bild – `<figcaption>…</figcaption>` – `</figure>` – dann erst der Absatz.',
      ],
      solution: { html: '<h1>SV Neckarblick – Fans</h1>\n<figure>\n  <img src="crowd.svg" alt="Der Fanblock beim Heimspiel" width="200">\n  <figcaption>Der Fanblock beim Derby</figcaption>\n</figure>\n<p>Nächstes Heimspiel: Samstag, 15 Uhr.</p>\n' },
      tests: [
        { type: 'text', selector: 'figure > figcaption', expected: 'Der Fanblock beim Derby', label: 'Die Unterschrift steht als figcaption unter dem Bild' },
        { type: 'selector', selector: 'figure + p', label: 'Der Absatz steht wieder außerhalb des Bild-Blocks' },
        { type: 'attr', selector: 'figure img', attr: 'alt', expected: 'Der Fanblock beim Heimspiel', label: 'Das Foto ist unverändert' },
      ],
    },
    {
      type: 'order',
      text: 'Sortiere den Abschnitt: Überschrift, dann der Bild-Block (Bild vor Unterschrift), zum Schluss der Absatz.',
      lines: ['<h2>Foodtrucks</h2>', '<figure>', '  <img src="foodtruck.svg" alt="Der Pizza-Truck">', '  <figcaption>Der Pizza-Truck am Abend</figcaption>', '</figure>', '<p>Ab 17 Uhr geöffnet.</p>'],
      explanation: 'figure öffnet den Block, Bild und Unterschrift liegen darin, dann wird der Block geschlossen – erst danach kommt der Absatz.',
    },
    {
      type: 'code',
      task: '**Erweitere** die Seite: 1. Unter der Hauptüberschrift ein Absatz mit dem Link „Zurück zur Übersicht“ → uebersicht.html. 2. Am Ende der Abschnitt „Mein Setup“ mit einem Bild-Block: controller.svg (Alternativtext „Ein grauer Controller“), Unterschrift „Mein Controller“. 3. Ein zweiter Block: Video clip.webm mit Bedienelementen, Unterschrift „Mein bestes Match“.',
      starter: { html: '<h1>Nicos Setup</h1>\n<p>Alles, womit ich zocke – und mein bestes Match.</p>\n' },
      hints: [
        'Drei Bausteine, die du kennst: interner Link (nur der Dateiname), Zwischenüberschrift, zwei figure-Blöcke.',
        'Der Link liegt in einem eigenen Absatz direkt nach der h1 – Muster: `<p><a href="start.html">Start</a></p>`. Ein figure-Block darf statt eines Bildes ein Video enthalten.',
        'Jeder Block: `<figure>` – Bild oder Video – `<figcaption>…</figcaption>` – `</figure>`.',
      ],
      solution: { html: '<h1>Nicos Setup</h1>\n<p><a href="uebersicht.html">Zurück zur Übersicht</a></p>\n<p>Alles, womit ich zocke – und mein bestes Match.</p>\n<h2>Mein Setup</h2>\n<figure>\n  <img src="controller.svg" alt="Ein grauer Controller">\n  <figcaption>Mein Controller</figcaption>\n</figure>\n<figure>\n  <video controls src="clip.webm" width="320"></video>\n  <figcaption>Mein bestes Match</figcaption>\n</figure>\n' },
      tests: [
        { type: 'attr', selector: 'h1 + p a', attr: 'href', expected: 'uebersicht.html', label: 'Der Rück-Link unter der Überschrift führt zu uebersicht.html' },
        { type: 'text', selector: 'h2', expected: 'Mein Setup', label: 'Die Zwischenüberschrift lautet „Mein Setup“' },
        { type: 'attr', selector: 'figure img', attr: 'src', expected: 'controller.svg', label: 'Im ersten Block liegt controller.svg' },
        { type: 'text', selector: 'figure figcaption', expected: 'Mein Controller', label: 'Die erste Unterschrift lautet „Mein Controller“' },
        { type: 'selector', selector: 'figure video[controls][src="clip.webm"]', label: 'Das Video liegt mit Bedienelementen in einem Block' },
        { type: 'text', selector: 'figure:nth-of-type(2) figcaption', expected: 'Mein bestes Match', label: 'Die zweite Unterschrift lautet „Mein bestes Match“' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: '„Die Galerie braucht Fotos – und einen Weg zurück! Ich habe mich gestern selbst auf der Seite verlaufen.“\n\nAlso zwei Dinge: Unter die Hauptüberschrift kommt ein Absatz mit dem Rück-Link zur Startseite – interne Links kennst du aus Kapitel 05. Danach entsteht der Abschnitt „Eindrücke“ mit dem ersten Bild-Block: die Menge vor der Hauptbühne, mit Bildunterschrift – **vor** dem Jingle-Abschnitt.',
    },
    { type: 'code', etappe: '06-bilder-und-medien/03-figure-und-bildunterschrift' },
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
      text: 'Zeit für den Rundgang durch die Foto-Wand: Bilder, Player und Bild-Blöcke aus diesem Kapitel – dazu Links aus Kapitel 05, Listen aus Kapitel 04 und das Grundgerüst aus Kapitel 02. Am Ende bekommt die Galerie ihren Foodtruck-Abschnitt.',
    },
    {
      type: 'quiz',
      question: 'Welcher Alternativtext passt am besten zu einem Foto vom Foodtruck?',
      options: ['Der Pizza-Truck mit beleuchteter Theke am Abend', 'Bild', 'foodtruck.svg', 'Hier klicken für Pizza'],
      correct: 0,
      explanation: 'Der Alternativtext beschreibt, was zu sehen ist. „Bild“ und der Dateiname sagen nichts, „Hier klicken“ passt zu Links, nicht zu Bildern.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Listenpunkt: ein Link zur Startseite mit dem Text „Pizza & Mehr“.',
      template: '<li><a ___="index.html">Pizza ___ Mehr</a></li>',
      accept: [['href'], ['&amp;']],
      hint: 'Das Attribut mit dem Linkziel – und das &-Zeichen als Entity mit Semikolon.',
    },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz zuerst ein Bild: sneaker.svg mit dem Alternativtext „Meine Laufschuhe“, 200 Pixel breit. Darunter eine Aufzählungsliste mit drei Einträgen: Laufschuhe, Trinkflasche, Springseil.',
      starter: { html: '<h1>Mein Trainingsplan</h1>\n<h2>Ausrüstung</h2>\n<p>Das brauche ich für die Woche:</p>\n' },
      hints: [
        'Ein Bild-Element mit drei Attributen, dann eine ungeordnete Liste mit drei Listenpunkten.',
        'Breite als Attribut wie `width="120"`; die Liste nach dem Muster `<ul><li>…</li></ul>`.',
        'Reihenfolge: Absatz, Bild, Liste – jeder Eintrag ein eigener Listenpunkt.',
      ],
      solution: { html: '<h1>Mein Trainingsplan</h1>\n<h2>Ausrüstung</h2>\n<p>Das brauche ich für die Woche:</p>\n<img src="sneaker.svg" alt="Meine Laufschuhe" width="200">\n<ul>\n  <li>Laufschuhe</li>\n  <li>Trinkflasche</li>\n  <li>Springseil</li>\n</ul>\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'sneaker.svg', label: 'Das Bild lädt sneaker.svg' },
        { type: 'attr', selector: 'img', attr: 'alt', expected: 'Meine Laufschuhe', label: 'Der Alternativtext lautet „Meine Laufschuhe“' },
        { type: 'attr', selector: 'img', attr: 'width', expected: '200', label: 'Das Bild ist 200 Pixel breit' },
        { type: 'selector', selector: 'ul > li', count: 3, label: 'Die Liste hat drei Einträge' },
        { type: 'text', selector: 'ul > li:first-child', expected: 'Laufschuhe', label: 'Der erste Eintrag ist „Laufschuhe“' },
        { type: 'order', selectors: ['p', 'img', 'ul'], label: 'Bild und Liste stehen in der richtigen Reihenfolge' },
      ],
    },
    {
      type: 'pair',
      text: 'Ordne die Teile des Grundgerüsts ihrer Aufgabe zu.',
      pairs: [
        ['`<!DOCTYPE html>`', 'sagt dem Browser: Das ist modernes HTML'],
        ['`<head>`', 'Infos über die Seite – unsichtbar'],
        ['`<meta charset="utf-8">`', 'Zeichensatz, damit Umlaute stimmen'],
        ['`<title>`', 'Titel im Browser-Tab'],
        ['`<body>`', 'alles, was auf der Seite zu sehen ist'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Fan-Seite: Das Foto vom Fanblock fehlt – nur der Alternativtext erscheint – und „Der Kader“ sieht nicht aus wie ein Link und lässt sich nicht anklicken.',
      starter: { html: '<h2>Unsere Fans</h2>\n<img scr="crowd.svg" alt="Der Fanblock beim Heimspiel">\n<ul>\n  <li><a herf="kader.html">Der Kader</a></li>\n  <li><a href="spiele.html">Spielplan</a></li>\n</ul>\n' },
      hints: [
        'Beide Fehler sind Tippfehler in Attributnamen.',
        'Die Quelle eines Bildes und das Ziel eines Links haben feste Attributnamen – vergleiche mit dem zweiten Listenpunkt und mit einem Bild aus dieser Lektion, Buchstabe für Buchstabe.',
      ],
      solution: { html: '<h2>Unsere Fans</h2>\n<img src="crowd.svg" alt="Der Fanblock beim Heimspiel">\n<ul>\n  <li><a href="kader.html">Der Kader</a></li>\n  <li><a href="spiele.html">Spielplan</a></li>\n</ul>\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'crowd.svg', label: 'Das Fan-Foto wird geladen' },
        { type: 'attr', selector: 'li:first-child a', attr: 'href', expected: 'kader.html', label: '„Der Kader“ ist ein Link zu kader.html' },
        { type: 'text', selector: 'li:first-child a', expected: 'Der Kader', label: 'Der Linktext lautet „Der Kader“' },
      ],
    },
    {
      type: 'order',
      text: 'Sortiere den Abschnitt: Überschrift, Bild, dann die Liste mit einem Link.',
      lines: ['<h2>Foodcourt</h2>', '<img src="foodtruck.svg" alt="Der Waffelwagen">', '<ul>', '  <li><a href="start.html">Zur Übersicht</a></li>', '</ul>'],
      explanation: 'Das Bild ist ein Leerelement und steht allein; der Link liegt im Listenpunkt, der Listenpunkt in der Liste.',
    },
    {
      type: 'fill',
      text: 'Vervollständige den Player: Er soll Play und Pause zeigen.',
      template: '<audio ___ src="jingle.wav"></audio>',
      accept: ['controls'],
      hint: 'Das Attribut für die Bedienelemente steht ohne Wert.',
    },
    {
      type: 'explain',
      text: 'Jetzt bekommt die Galerie den Abschnitt „Foodtrucks“ – nach dem Bild-Block und vor dem Jingle. Zuerst das Foto vom Pizza-Truck, darunter eine Aufzählungsliste mit zwei Links, die beide zur Startseite führen.\n\nDenk beim Namen „Pizza & Mehr“ an die Entity für das &-Zeichen – genau wie in der Foodtruck-Liste der Startseite.',
    },
    { type: 'code', etappe: '06-bilder-und-medien/04-wiederholung' },
  ],
});

/* ---------- Lektion 5: Projekt Galerie ---------- */
schreibe('lessons/05-projekt-galerie.json', {
  id: '05-projekt-galerie',
  title: 'Projekt: Galerie',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Meilenstein! Die Galerie hat Grundgerüst, Rück-Link, einen Bild-Block, den Foodtruck-Abschnitt, Jingle und Aftermovie.\n\n„Fehlt noch das Plakat – und ein Rundgang, damit die Leute wissen, wo es langgeht!“\n\nDafür brauchst du nur, was du schon kannst: einen zweiten Bild-Block und eine nummerierte Liste aus Kapitel 04.',
    },
    {
      type: 'quiz',
      question: 'Der Rundgang hat vier Stationen in fester Reihenfolge. Welche Liste passt?',
      options: ['Eine geordnete Liste – der Browser nummeriert selbst', 'Eine ungeordnete Liste mit Punkten', 'Ein Bild-Block pro Station'],
      correct: 0,
      explanation: 'Feste Reihenfolge = geordnete Liste (ol). Punkte (ul) passen, wenn die Reihenfolge egal ist.',
    },
    {
      type: 'order',
      text: 'Sortiere: erst der Bild-Block (Bild vor Unterschrift), dann die nummerierte Liste mit einem Eintrag.',
      lines: ['<figure>', '  <img src="ticket.svg" alt="Mein Ticket">', '  <figcaption>Ticket für Samstag</figcaption>', '</figure>', '<ol>', '  <li>Einlass um 16 Uhr</li>', '</ol>'],
      explanation: 'Der Bild-Block wird geschlossen, bevor die Liste beginnt – zwei getrennte Blöcke nacheinander.',
    },
    {
      type: 'explain',
      text: 'Zwei Ergänzungen: Im Abschnitt „Eindrücke“ kommt direkt nach dem ersten Bild-Block ein zweiter mit dem Plakat 2027 – Bild und Unterschrift. Ganz am Ende der Seite entsteht der Abschnitt „Rundgang“: eine nummerierte Liste mit vier Stationen – Einlass, Hauptbühne, Zeltbühne, Foodcourt.\n\nDanach lohnt sich ein Blick auf die fertige Galerie unter [FUNKEN-Website](#/projekt).',
    },
    { type: 'code', etappe: '06-bilder-und-medien/05-projekt-galerie' },
  ],
});

/* ---------- Fragenpool ---------- */
schreibe('pool.json', {
  chapter: '06-bilder-und-medien',
  fragen: [
    { id: '06-01', konzept: 'html.img', type: 'quiz', question: 'Welches Element bringt ein Bild auf die Seite?', options: ['`<img>`', '`<bild>`', '`<src>`'], correct: 0, explanation: 'img (image) ist das Bild-Element; die Datei steht in seinem Attribut src.' },
    { id: '06-02', konzept: 'html.img', type: 'fill', text: 'Vervollständige das Bild-Element.', template: '<___ src="pizza.svg" alt="Eine Pizza Margherita">', accept: ['img'], hint: 'Drei Buchstaben, Abkürzung für image.' },
    { id: '06-03', konzept: 'html.img', type: 'bug', text: 'Das Controller-Bild wird nicht angezeigt. Welche Zeile ist falsch?', lines: ['<h2>Mein Setup</h2>', '<img scr="controller.svg" alt="Mein Controller">', '<p>Seit 2024 im Einsatz.</p>'], line: 1, explanation: 'Das Attribut heißt src, nicht scr – sonst findet der Browser keine Datei.' },
    { id: '06-04', konzept: 'html.img', type: 'pair', text: 'Ordne zu.', pairs: [['src', 'Dateiname des Bildes'], ['alt', 'Ersatztext, falls das Bild fehlt'], ['width', 'Breite in Pixeln']] },
    { id: '06-05', konzept: 'html.img', type: 'quiz', question: 'Was stimmt über img?', options: ['Es ist ein Leerelement ohne schließenden Tag', 'Es braucht einen schließenden Tag', 'Der Dateiname steht zwischen den Tags'], correct: 0, explanation: 'img hat keinen Inhalt – alles steht in den Attributen src und alt.' },
    { id: '06-06', konzept: 'html.alt', type: 'quiz', question: 'Wozu dient das alt-Attribut eines Bildes?', options: ['Ersatztext: für Screenreader und wenn das Bild fehlt', 'Es legt die Breite des Bildes fest', 'Es nennt die Bilddatei'], correct: 0, explanation: 'alt wird vorgelesen und angezeigt, wenn das Bild nicht geladen werden kann.' },
    { id: '06-07', konzept: 'html.alt', type: 'quiz', question: 'Welcher Alternativtext ist am besten für ein Foto einer Katze auf dem Sofa?', options: ['Eine graue Katze schläft auf dem Sofa', 'Bild', 'katze.jpg', 'Foto 1'], correct: 0, explanation: 'Der Alternativtext beschreibt kurz, was zu sehen ist – kein Dateiname, kein „Bild“.' },
    { id: '06-08', konzept: 'html.alt', type: 'bug', text: 'Bei einem Bild lautet der Alternativtext nur „Eine“. Welche Zeile ist falsch?', lines: ['<img src="buehne.svg" alt="Die Hauptbühne bei Nacht">', '<img src="katze.svg" alt=Eine graue Katze>', '<img src="pizza.svg" alt="Eine Pizza Margherita">'], line: 1, explanation: 'Ohne Anführungszeichen endet der Wert nach dem ersten Wort.' },
    { id: '06-09', konzept: 'html.alt', type: 'fill', text: 'Welches Attribut liefert den Alternativtext?', template: '<img src="ticket.svg" ___="Ein gelbes Festivalticket">', accept: ['alt'], hint: 'Kurz für „alternativ“.' },
    { id: '06-10', konzept: 'html.alt', type: 'bug', text: 'Einem Bild fehlt der Alternativtext. Welche Zeile?', lines: ['<img src="buehne.svg" alt="Die Bühne">', '<img src="crowd.svg">', '<img src="plakat.svg" alt="Das Plakat">'], line: 1, explanation: 'Jedes Bild braucht alt – sonst hören Screenreader-Nutzer:innen nur „Bild“.' },
    { id: '06-11', konzept: 'html.audio-video', type: 'quiz', question: 'Ein audio-Element steht im Code, aber es ist kein Player zu sehen. Was fehlt?', options: ['Das Attribut controls', 'Ein schließender Tag für img', 'Das Attribut width'], correct: 0, explanation: 'Erst controls blendet Play, Pause und Lautstärke ein.' },
    { id: '06-12', konzept: 'html.audio-video', type: 'fill', text: 'Vervollständige den Video-Player mit Bedienelementen.', template: '<video ___ src="clip.webm"></video>', accept: ['controls'], hint: 'Das Attribut steht allein, ohne Wert.' },
    { id: '06-13', konzept: 'html.audio-video', type: 'bug', text: 'Nach dem Player verschwindet der Rest der Seite. Welche Zeile ist falsch?', lines: ['<h2>Jingle</h2>', '<audio controls src="jingle.wav">', '<p>Jetzt anhören!</p>'], line: 1, explanation: 'audio braucht einen schließenden Tag – sonst gehört alles danach zum Player und ist unsichtbar.' },
    { id: '06-14', konzept: 'html.audio-video', type: 'pair', text: 'Ordne zu.', pairs: [['`<audio>`', 'Ton ohne Bild'], ['`<video>`', 'Film mit Bild'], ['controls', 'Play, Pause, Lautstärke'], ['src', 'Datei, die abgespielt wird']] },
    { id: '06-15', konzept: 'html.audio-video', type: 'quiz', question: 'Ein kurzer Film soll auf die Seite. Welches Element?', options: ['video', 'audio', 'img'], correct: 0, explanation: 'video zeigt Film mit Bild, audio nur Ton, img ein Standbild.' },
    { id: '06-16', konzept: 'html.figure', type: 'order', text: 'Sortiere den Bild-Block: Bild oben, Unterschrift darunter.', lines: ['<figure>', '  <img src="crowd.svg" alt="Die Menge">', '  <figcaption>Die Menge vor der Bühne</figcaption>', '</figure>'] },
    { id: '06-17', konzept: 'html.figure', type: 'quiz', question: 'Welches Element enthält die sichtbare Bildunterschrift?', options: ['figcaption', 'alt', 'caption', 'title'], correct: 0, explanation: 'figcaption steht im figure-Block; alt ist nur der unsichtbare Ersatztext.' },
    { id: '06-18', konzept: 'html.figure', type: 'bug', text: 'Die Bildunterschrift ist falsch markiert. Welche Zeile?', lines: ['<figure>', '  <img src="plakat.svg" alt="Das Plakat">', '  <caption>Das Plakat 2027</caption>', '</figure>'], line: 2, explanation: 'Die Unterschrift eines Bild-Blocks heißt figcaption.' },
    { id: '06-19', konzept: 'html.figure', type: 'fill', text: 'Vervollständige den Bild-Block.', template: '<figure>\n  <img src="pizza.svg" alt="Eine Pizza">\n  <___>Unsere Margherita</___>\n</figure>', accept: [['figcaption'], ['figcaption']], hint: 'Öffnender und schließender Tag heißen gleich.' },
    { id: '06-20', konzept: 'html.figure', type: 'quiz', question: 'Wozu dient figure?', options: ['Es fasst ein Bild und seine Unterschrift zu einem Block zusammen', 'Es macht ein Bild breiter', 'Es ersetzt das alt-Attribut'], correct: 0, explanation: 'figure ist der Block, figcaption die Unterschrift darin – alt bleibt trotzdem Pflicht.' },
  ],
});

/* ---------- Abnahme ---------- */
schreibe('boss.json', {
  chapter: '06-bilder-und-medien',
  title: 'Abnahme: Foto-Wand',
  intro: 'Die Foto-Wand steht! Endlich sieht man, wie FUNKEN aussieht – und man hört es sogar. Bevor ich das dem Kollektiv zeige: Beweis mir, dass Bilder, Ton und Film sitzen und du Links und Listen nicht vergessen hast.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'html.img', type: 'quiz', question: 'Wie kommt das Bild plakat.svg auf die Seite?', options: ['Mit einem img-Element, der Dateiname steht im Attribut src', 'Mit einem img-Element, der Dateiname steht zwischen den Tags', 'Mit einem Link, dessen Text der Dateiname ist'], correct: 0, explanation: 'img ist ein Leerelement – die Datei steht im Attribut src.' },
    { konzept: 'html.alt', type: 'pair', text: 'Ordne zu.', pairs: [['alt', 'Ersatztext, falls das Bild fehlt oder vorgelesen wird'], ['src', 'Datei, die geladen wird'], ['controls', 'Play, Pause und Lautstärke am Player'], ['figcaption', 'sichtbare Bildunterschrift']] },
    { konzept: 'html.a-intern', type: 'fill', text: 'Vervollständige den Link zur Galerie-Seite.', template: '<a ___="galerie.html">Fotos</a>', accept: ['href'] },
    {
      type: 'code',
      task: '**Erstelle** unter dem Absatz ein Bild: pizza.svg mit dem Alternativtext „Pizza vom Stand der 11b“, 160 Pixel breit. Darunter eine Aufzählungsliste mit drei Einträgen: Pizza, Waffeln, Limo.',
      starter: { html: '<h1>Schulfest am Freitag</h1>\n<h2>Essen</h2>\n<p>Das gibt es am Stand der 11b:</p>\n' },
      solution: { html: '<h1>Schulfest am Freitag</h1>\n<h2>Essen</h2>\n<p>Das gibt es am Stand der 11b:</p>\n<img src="pizza.svg" alt="Pizza vom Stand der 11b" width="160">\n<ul>\n  <li>Pizza</li>\n  <li>Waffeln</li>\n  <li>Limo</li>\n</ul>\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'pizza.svg', label: 'Das Bild lädt pizza.svg' },
        { type: 'attr', selector: 'img', attr: 'alt', expected: 'Pizza vom Stand der 11b', label: 'Der Alternativtext stimmt' },
        { type: 'attr', selector: 'img', attr: 'width', expected: '160', label: 'Das Bild ist 160 Pixel breit' },
        { type: 'selector', selector: 'ul > li', count: 3, label: 'Die Liste hat drei Einträge' },
        { type: 'text', selector: 'ul > li:last-child', expected: 'Limo', label: 'Der letzte Eintrag ist „Limo“' },
        { type: 'order', selectors: ['p', 'img', 'ul'], label: 'Absatz, Bild, Liste – in dieser Reihenfolge' },
      ],
    },
    { konzept: 'html.audio-video', type: 'quiz', question: 'Der Aftermovie soll Play und Pause bekommen. Welches Attribut braucht das video-Element?', options: ['controls', 'src', 'width', 'alt'], correct: 0, explanation: 'controls blendet die Bedienelemente ein; src nennt nur die Datei.' },
    { konzept: 'html.grundgeruest', type: 'order', text: 'Sortiere das Grundgerüst einer leeren Seite.', lines: ['<!DOCTYPE html>', '<html lang="de">', '<head>', '<meta charset="utf-8">', '<title>Galerie</title>', '</head>', '<body>', '</body>', '</html>'] },
    { konzept: 'html.figure', type: 'bug', text: 'Ein Bild-Block ist fehlerhaft. Welche Zeile?', lines: ['<figure>', '  <img src="crowd.svg" alt="Die Menge vor der Bühne">', '  <caption>Die Menge vor der Bühne</caption>', '</figure>'], line: 2, explanation: 'Die Bildunterschrift heißt figcaption.' },
    { konzept: 'html.a-mailto', type: 'quiz', question: 'Welcher Link öffnet das Mailprogramm?', options: ['`<a href="mailto:hallo@funken-festival-beispiel.de">Mail</a>`', '`<a href="hallo@funken-festival-beispiel.de">Mail</a>`', '`<a href="https://hallo@funken-festival-beispiel.de">Mail</a>`'], correct: 0, explanation: 'E-Mail-Links beginnen in der Adresse mit mailto:.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Skate-Seite: Das Schuh-Foto fehlt – es erscheint nur sein Alternativtext – und das Video hat keine Play-Taste.',
      starter: { html: '<h1>Skate-Session</h1>\n<img scr="sneaker.svg" alt="Meine Skate-Schuhe">\n<h2>Der Clip</h2>\n<video src="clip.webm" width="320"></video>\n' },
      solution: { html: '<h1>Skate-Session</h1>\n<img src="sneaker.svg" alt="Meine Skate-Schuhe">\n<h2>Der Clip</h2>\n<video controls src="clip.webm" width="320"></video>\n' },
      tests: [
        { type: 'attr', selector: 'img', attr: 'src', expected: 'sneaker.svg', label: 'Das Schuh-Foto wird geladen' },
        { type: 'attr', selector: 'video', attr: 'controls', present: true, label: 'Das Video hat Bedienelemente' },
        { type: 'attr', selector: 'video', attr: 'src', expected: 'clip.webm', label: 'Das Video lädt weiterhin clip.webm' },
      ],
    },
    { konzept: 'html.alt', type: 'fill', text: 'Vervollständige das Bild-Element um den Alternativtext.', template: '<img src="buehne.svg" ___="Die Hauptbühne bei Nacht">', accept: ['alt'] },
    { konzept: 'html.ol', type: 'quiz', question: 'Die Anfahrt hat drei Schritte in fester Reihenfolge. Welche Liste passt?', options: ['Eine geordnete Liste – ol', 'Eine ungeordnete Liste – ul', 'Ein Absatz mit Zeilenumbrüchen'], correct: 0, explanation: 'Feste Reihenfolge = ol, der Browser nummeriert selbst.' },
  ],
});
console.log('Kapitel 06 geschrieben');
