// Etappen Block C (CSS), D (JavaScript) und E (Showtime): Kapitel 10–18.
export function teilB(etappe) {
  /* ================= Kapitel 10 – Lichtpult (css; Vorschau index) ================= */
  etappe({
    id: '10-css-grundlagen/01-was-ist-css',
    page: 'index',
    titel: 'Die erste CSS-Regel',
    task: '**Erstelle** im Stylesheet die erste Regel: Alle Hauptüberschriften bekommen die Farbe `#ff6a00` (Funken-Orange). Der Kommentar bleibt.',
    hints: ['Eine Regel besteht aus Selektor, geschweiften Klammern und darin Eigenschaft: Wert;', 'Der Selektor für Hauptüberschriften ist der Elementname ohne spitze Klammern.', 'Die Eigenschaft für die Textfarbe heißt color.'],
    tests: [
      { type: 'style', selector: 'h1', prop: 'color', expected: '#ff6a00', label: 'Die Hauptüberschrift ist orange (#ff6a00)' },
      { type: 'source', file: 'css', matches: 'h1\\s*\\{', label: 'Es gibt eine Regel mit dem Selektor h1' },
    ],
    aendern: { css: () => '/* Stylesheet der FUNKEN-Website */\n\nh1 {\n  color: #ff6a00;\n}\n' },
    starter: { css: '/* Stylesheet der FUNKEN-Website */\n' },
  });
  etappe({
    id: '10-css-grundlagen/02-drei-orte-fuer-css',
    page: 'index',
    titel: 'Stylesheet einbinden',
    task: '**Vervollständige** den Kopfbereich der Startseite um die Verknüpfung mit der externen Stylesheet-Datei style.css, damit die Regeln auf der echten Seite wirken.',
    hints: ['Die Verknüpfung ist ein Leerelement im head mit zwei Attributen: der Beziehung (stylesheet) und der Datei.', 'Sie kommt nach dem title.'],
    tests: [
      { type: 'attr', selector: 'head link[rel="stylesheet"]', attr: 'href', expected: 'style.css', label: 'Der head verknüpft style.css als Stylesheet' },
      { type: 'text', selector: 'title', expected: 'FUNKEN – Das Schülerfestival', label: 'Der Titel ist noch da' },
    ],
    aendern: { html: ['    <title>FUNKEN – Das Schülerfestival</title>\n', '    <title>FUNKEN – Das Schülerfestival</title>\n    <link rel="stylesheet" href="style.css">\n'] },
    editable: ['html'],
    save: ['html'],
  });
  etappe({
    id: '10-css-grundlagen/03-farben',
    page: 'index',
    titel: 'Text- und Linkfarbe',
    task: '**Erweitere** das Stylesheet um zwei Regeln: Der gesamte Text der Seite bekommt die Farbe `#1b1b2f`, alle Links die Farbe `#0b7dd6`.',
    hints: ['Für den gesamten Text ist der body zuständig – Kinder erben die Farbe.', 'Links sind das Element a.', 'Zwei getrennte Regeln, jede mit eigenem Selektor.'],
    tests: [
      { type: 'style', selector: 'body', prop: 'color', expected: '#1b1b2f', label: 'Der Text ist dunkelblau (#1b1b2f)' },
      { type: 'style', selector: 'nav a', prop: 'color', expected: '#0b7dd6', label: 'Links sind blau (#0b7dd6)' },
      { type: 'style', selector: 'h1', prop: 'color', expected: '#ff6a00', label: 'Die h1 bleibt orange' },
    ],
    aendern: { css: ['h1 {\n  color: #ff6a00;\n}\n', 'body {\n  color: #1b1b2f;\n}\n\nh1 {\n  color: #ff6a00;\n}\n\na {\n  color: #0b7dd6;\n}\n'] },
  });
  etappe({
    id: '10-css-grundlagen/04-hintergrund',
    page: 'index',
    titel: 'Hintergründe',
    task: '**Gestalte** die Hintergründe: Die ganze Seite bekommt die Hintergrundfarbe `#fff7e8` (Creme); der Fußbereich bekommt die Hintergrundfarbe `#1b1b2f` und die Textfarbe `#fff7e8`.',
    hints: ['Hintergrundfarbe ist eine eigene Eigenschaft – nicht color.', 'Die Seitenfarbe gehört in die vorhandene body-Regel; für den Fußbereich brauchst du eine neue Regel mit dem Selektor footer.'],
    tests: [
      { type: 'style', selector: 'body', prop: 'background-color', expected: '#fff7e8', label: 'Die Seite hat einen cremefarbenen Hintergrund' },
      { type: 'style', selector: 'footer', prop: 'background-color', expected: '#1b1b2f', label: 'Der Fußbereich ist dunkel' },
      { type: 'style', selector: 'footer', prop: 'color', expected: '#fff7e8', label: 'Der Fußtext ist hell' },
    ],
    aendern: { css: ['body {\n  color: #1b1b2f;\n}\n', 'body {\n  color: #1b1b2f;\n  background-color: #fff7e8;\n}\n\nfooter {\n  background-color: #1b1b2f;\n  color: #fff7e8;\n}\n'] },
  });
  etappe({
    id: '10-css-grundlagen/05-wiederholung',
    page: 'programm',
    titel: 'Programm-Seite anschließen',
    task: '**Vervollständige** die Programm-Seite: Der Kopfbereich verknüpft style.css. **Ergänze** in der Samstags-Tabelle eine letzte Zeile: 22:00 | Neonpuls | Kiki Volt.',
    hints: ['Verknüpfung wie auf der Startseite, nach dem title.', 'Die neue Zeile hat drei Datenzellen und kommt vor dem schließenden Tabellen-Tag der zweiten Tabelle.'],
    tests: [
      { type: 'attr', selector: 'head link[rel="stylesheet"]', attr: 'href', expected: 'style.css', label: 'Die Programm-Seite verknüpft style.css' },
      { type: 'selector', selector: 'table:nth-of-type(2) tr', count: 5, label: 'Die Samstags-Tabelle hat fünf Zeilen' },
      { type: 'text', selector: 'table:nth-of-type(2) tr:last-child td:first-child', expected: '22:00', label: 'Die letzte Zeile beginnt mit 22:00' },
      { type: 'text', selector: 'table:nth-of-type(2) tr:last-child td:last-child', expected: 'Kiki Volt', label: 'Um 22:00 spielt Kiki Volt im Zelt' },
    ],
    aendern: {
      html: (h) => h
        .replace('    <title>Programm – FUNKEN</title>\n', '    <title>Programm – FUNKEN</title>\n    <link rel="stylesheet" href="style.css">\n')
        .replace('          <td>Freitag-Frei</td>\n        </tr>\n      </table>', '          <td>Freitag-Frei</td>\n        </tr>\n        <tr>\n          <td>22:00</td>\n          <td>Neonpuls</td>\n          <td>Kiki Volt</td>\n        </tr>\n      </table>'),
    },
    editable: ['html'],
    save: ['html'],
  });
  etappe({
    id: '10-css-grundlagen/06-projekt-erste-styles',
    page: 'index',
    titel: 'Meilenstein: Zwischenüberschriften und Tabellen',
    task: '**Erweitere** das Stylesheet um zwei Regeln: Zwischenüberschriften bekommen die Farbe `#d94f00`, Tabellen einen weißen Hintergrund.',
    hints: ['Zwischenüberschriften sind h2, Tabellen table.', 'Weiß kannst du als Farbname oder als Hex-Wert schreiben.'],
    tests: [
      { type: 'style', selector: 'h2', prop: 'color', expected: '#d94f00', label: 'Zwischenüberschriften sind dunkelorange (#d94f00)' },
      { type: 'style', selector: 'table', prop: 'background-color', expected: 'white', label: 'Tabellen haben einen weißen Hintergrund' },
      { type: 'style', selector: 'footer', prop: 'background-color', expected: '#1b1b2f', label: 'Der Fußbereich ist noch dunkel' },
    ],
    aendern: { css: ['a {\n  color: #0b7dd6;\n}\n', 'a {\n  color: #0b7dd6;\n}\n\nh2 {\n  color: #d94f00;\n}\n\ntable {\n  background-color: white;\n}\n'] },
  });

  /* ================= Kapitel 11 – Spots (css) ================= */
  etappe({
    id: '11-selektoren/01-element-und-klassen-selektor',
    page: 'index',
    titel: 'Der Hinweis-Absatz',
    task: '**Gestalte** den Absatz mit der Klasse `hinweis`: Farbe `#b34700` und fette Schrift.',
    hints: ['Klassen sprichst du mit einem Punkt vor dem Namen an.', 'Fette Schrift ist die Eigenschaft für die Schriftstärke mit dem Wert bold.'],
    tests: [
      { type: 'style', selector: '.hinweis', prop: 'color', expected: '#b34700', label: 'Der Hinweis hat die Farbe #b34700' },
      { type: 'style', selector: '.hinweis', prop: 'font-weight', expected: ['700', 'bold'], label: 'Der Hinweis ist fett' },
      { type: 'style', selector: 'main > p:not(.hinweis)', prop: 'font-weight', expected: ['400', 'normal'], label: 'Andere Absätze bleiben normal' },
    ],
    aendern: { css: ['table {\n  background-color: white;\n}\n', 'table {\n  background-color: white;\n}\n\n.hinweis {\n  color: #b34700;\n  font-weight: bold;\n}\n'] },
  });
  etappe({
    id: '11-selektoren/02-id-und-gruppen-selektor',
    page: 'index',
    titel: 'Zwei Überschriften, eine Regel',
    task: '**Gestalte** mit EINER gemeinsamen Regel die Überschriften mit den ids `lineup` und `anfahrt`: beide bekommen die Farbe `#0b7dd6`.',
    hints: ['ids sprichst du mit der Raute an.', 'Mehrere Selektoren in einer Regel trennst du mit Komma.'],
    tests: [
      { type: 'style', selector: '#lineup', prop: 'color', expected: '#0b7dd6', label: 'Die Line-up-Überschrift ist blau' },
      { type: 'style', selector: '#anfahrt', prop: 'color', expected: '#0b7dd6', label: 'Die Anfahrts-Überschrift ist blau' },
      { type: 'source', file: 'css', matches: '#lineup\\s*,\\s*#anfahrt|#anfahrt\\s*,\\s*#lineup', label: 'Beide ids stehen als Gruppe in einer Regel' },
      { type: 'style', selector: 'main h2:first-of-type', prop: 'color', expected: '#d94f00', label: 'Andere Zwischenüberschriften bleiben dunkelorange' },
    ],
    aendern: { css: ['.hinweis {\n  color: #b34700;\n  font-weight: bold;\n}\n', '.hinweis {\n  color: #b34700;\n  font-weight: bold;\n}\n\n#lineup, #anfahrt {\n  color: #0b7dd6;\n}\n'] },
  });
  etappe({
    id: '11-selektoren/03-verschachtelte-selektoren',
    page: 'index',
    titel: 'Links je nach Ort',
    task: '**Gestalte** Links abhängig von ihrem Ort: Links in der Navigation bekommen die Farbe `#1b1b2f`, Links im Fußbereich die Farbe `#ffd23f`. Alle anderen Links bleiben blau.',
    hints: ['Ein Nachfahren-Selektor besteht aus zwei Selektoren mit Leerzeichen dazwischen: erst der Bereich, dann das Element.', 'Zwei neue Regeln – die alte a-Regel bleibt.'],
    tests: [
      { type: 'style', selector: 'nav a', prop: 'color', expected: '#1b1b2f', label: 'Navigations-Links sind dunkel' },
      { type: 'style', selector: 'footer a', prop: 'color', expected: '#ffd23f', label: 'Fußbereichs-Links sind gelb' },
      { type: 'style', selector: 'main a', prop: 'color', expected: '#0b7dd6', label: 'Links im Hauptbereich bleiben blau' },
    ],
    aendern: { css: ['#lineup, #anfahrt {\n  color: #0b7dd6;\n}\n', '#lineup, #anfahrt {\n  color: #0b7dd6;\n}\n\nnav a {\n  color: #1b1b2f;\n}\n\nfooter a {\n  color: #ffd23f;\n}\n'] },
  });
  etappe({
    id: '11-selektoren/04-hover',
    page: 'index',
    titel: 'Links beim Überfahren',
    task: '**Gestalte** die Navigations-Links beim Überfahren mit der Maus: Sie werden dann orange `#ff6a00`.',
    hints: ['Der Zustand „Maus darüber“ ist eine Pseudoklasse, die mit Doppelpunkt an den Selektor gehängt wird.', 'Neue Regel nach der nav-a-Regel – gleiche Selektoren plus Pseudoklasse.'],
    tests: [
      { type: 'source', file: 'css', matches: 'nav\\s+a:hover\\s*\\{[^}]*color\\s*:\\s*#ff6a00', label: 'Es gibt eine Regel nav a:hover mit der Farbe #ff6a00' },
      { type: 'style', selector: 'nav a', prop: 'color', expected: '#1b1b2f', label: 'Ohne Maus bleiben die Links dunkel' },
    ],
    aendern: { css: ['nav a {\n  color: #1b1b2f;\n}\n', 'nav a {\n  color: #1b1b2f;\n}\n\nnav a:hover {\n  color: #ff6a00;\n}\n'] },
  });
  etappe({
    id: '11-selektoren/05-wiederholung',
    page: 'galerie',
    titel: 'Galerie anschließen und hervorheben',
    task: '**Vervollständige** die Galerie-Seite: Der Kopfbereich verknüpft style.css; die Überschrift „Aftermovie“ bekommt die Klasse `highlight`. **Erstelle** im Stylesheet eine Regel für diese Klasse mit der Farbe `#0b7dd6`.',
    hints: ['HTML-Tab: link im head, class-Attribut an der h2. CSS-Tab: Regel mit Punkt-Selektor.', 'Beide Dateien sind editierbar – prüfe beides.'],
    tests: [
      { type: 'attr', selector: 'head link[rel="stylesheet"]', attr: 'href', expected: 'style.css', label: 'Die Galerie verknüpft style.css' },
      { type: 'text', selector: 'h2.highlight', expected: 'Aftermovie', label: 'Die Aftermovie-Überschrift hat die Klasse „highlight“' },
      { type: 'style', selector: 'h2.highlight', prop: 'color', expected: '#0b7dd6', label: 'Die hervorgehobene Überschrift ist blau' },
      { type: 'style', selector: 'main h2:first-of-type', prop: 'color', expected: '#d94f00', label: 'Die anderen Überschriften bleiben dunkelorange' },
    ],
    aendern: {
      html: (h) => h
        .replace('    <title>Galerie – FUNKEN</title>\n', '    <title>Galerie – FUNKEN</title>\n    <link rel="stylesheet" href="style.css">\n')
        .replace('<h2>Aftermovie</h2>', '<h2 class="highlight">Aftermovie</h2>'),
      css: ['footer a {\n  color: #ffd23f;\n}\n', 'footer a {\n  color: #ffd23f;\n}\n\n.highlight {\n  color: #0b7dd6;\n}\n'],
    },
  });
  etappe({
    id: '11-selektoren/06-projekt-selektoren',
    page: 'programm',
    titel: 'Meilenstein: Kopfzellen und Bildunterschriften',
    task: '**Erweitere** das Stylesheet: Kopfzellen von Tabellen bekommen die Farbe `#ff6a00`; Bildunterschriften bekommen die Farbe `#6b6b7a`.',
    hints: ['Kopfzellen sind th, Bildunterschriften figcaption – beides Element-Selektoren.', 'Zwei neue Regeln am Ende.'],
    tests: [
      { type: 'style', selector: 'th', prop: 'color', expected: '#ff6a00', label: 'Kopfzellen sind orange' },
      { type: 'source', file: 'css', matches: 'figcaption\\s*\\{[^}]*color\\s*:\\s*#6b6b7a', label: 'Bildunterschriften bekommen die Farbe #6b6b7a' },
      { type: 'style', selector: 'td', prop: 'color', expected: '#1b1b2f', label: 'Datenzellen bleiben dunkel' },
    ],
    aendern: { css: ['.highlight {\n  color: #0b7dd6;\n}\n', '.highlight {\n  color: #0b7dd6;\n}\n\nth {\n  color: #ff6a00;\n}\n\nfigcaption {\n  color: #6b6b7a;\n}\n'] },
  });

  /* ================= Kapitel 12 – Schriftzug (css) ================= */
  etappe({
    id: '12-schrift-und-text/01-schriftart-und-groesse',
    page: 'index',
    titel: 'Schriftart und Größe',
    task: '**Gestalte** die Schrift: Die ganze Seite nutzt die Schriftart Arial, ersatzweise eine serifenlose Schrift. Die Hauptüberschrift wird 48 Pixel groß.',
    hints: ['Die Schriftart gehört in die body-Regel; nach der Wunschschrift folgt mit Komma die Ersatzfamilie.', 'Die Größe kommt in die vorhandene h1-Regel.'],
    tests: [
      { type: 'style', selector: 'body', prop: 'font-family', expected: 'Arial', contains: true, label: 'Die Seite nutzt Arial' },
      { type: 'style', selector: 'body', prop: 'font-family', expected: 'sans-serif', contains: true, label: 'Ersatzweise eine serifenlose Schrift' },
      { type: 'style', selector: 'h1', prop: 'font-size', expected: '48px', label: 'Die Hauptüberschrift ist 48px groß' },
    ],
    aendern: {
      css: (c) => c
        .replace('body {\n  color: #1b1b2f;\n  background-color: #fff7e8;\n}', 'body {\n  color: #1b1b2f;\n  background-color: #fff7e8;\n  font-family: Arial, sans-serif;\n}')
        .replace('h1 {\n  color: #ff6a00;\n}', 'h1 {\n  color: #ff6a00;\n  font-size: 48px;\n}'),
    },
  });
  etappe({
    id: '12-schrift-und-text/02-textgestaltung',
    page: 'index',
    titel: 'Ausrichtung, Unterstreichung, Zeilenabstand',
    task: '**Gestalte** den Text: Die Hauptüberschrift wird zentriert, Navigations-Links verlieren ihre Unterstreichung, und der Zeilenabstand der ganzen Seite wird 1.5.',
    hints: ['Zentrieren ist die Eigenschaft für die Textausrichtung mit dem Wert center.', 'Die Unterstreichung steuert text-decoration; „keine“ heißt none.', 'Alle drei Werte kommen in vorhandene Regeln: h1, nav a und body.'],
    tests: [
      { type: 'style', selector: 'h1', prop: 'text-align', expected: 'center', label: 'Die Hauptüberschrift ist zentriert' },
      { type: 'style', selector: 'nav a', prop: 'text-decoration-line', expected: 'none', label: 'Navigations-Links sind nicht unterstrichen' },
      { type: 'style', selector: 'main a', prop: 'text-decoration-line', expected: 'underline', label: 'Andere Links bleiben unterstrichen' },
      { type: 'style', selector: 'body', prop: 'line-height', expected: '24px', label: 'Der Zeilenabstand ist 1.5 (24px bei 16px Schrift)' },
    ],
    aendern: {
      css: (c) => c
        .replace('  font-family: Arial, sans-serif;\n}', '  font-family: Arial, sans-serif;\n  line-height: 1.5;\n}')
        .replace('h1 {\n  color: #ff6a00;\n  font-size: 48px;\n}', 'h1 {\n  color: #ff6a00;\n  font-size: 48px;\n  text-align: center;\n}')
        .replace('nav a {\n  color: #1b1b2f;\n}', 'nav a {\n  color: #1b1b2f;\n  text-decoration: none;\n}'),
    },
  });
  etappe({
    id: '12-schrift-und-text/03-wiederholung',
    page: 'tickets',
    titel: 'Tickets anschließen, Kopfzellen ausrichten',
    task: '**Vervollständige** die Tickets-Seite: Der Kopfbereich verknüpft style.css. **Erweitere** im Stylesheet die Regel für Kopfzellen: Sie werden linksbündig.',
    hints: ['link im head der Tickets-Seite.', 'Linksbündig ist die Textausrichtung mit dem Wert left – in der vorhandenen th-Regel.'],
    tests: [
      { type: 'attr', selector: 'head link[rel="stylesheet"]', attr: 'href', expected: 'style.css', label: 'Die Tickets-Seite verknüpft style.css' },
      { type: 'style', selector: 'th', prop: 'text-align', expected: 'left', label: 'Kopfzellen sind linksbündig' },
      { type: 'style', selector: 'th', prop: 'color', expected: '#ff6a00', label: 'Kopfzellen bleiben orange' },
    ],
    aendern: {
      html: ['    <title>Tickets – FUNKEN</title>\n', '    <title>Tickets – FUNKEN</title>\n    <link rel="stylesheet" href="style.css">\n'],
      css: ['th {\n  color: #ff6a00;\n}', 'th {\n  color: #ff6a00;\n  text-align: left;\n}'],
    },
  });
  etappe({
    id: '12-schrift-und-text/04-projekt-typografie',
    page: 'index',
    titel: 'Meilenstein: Typografie',
    task: '**Gestalte** weiter: Zwischenüberschriften werden 28 Pixel groß; die Navigation wird als Ganzes zentriert.',
    hints: ['Größe in die vorhandene h2-Regel.', 'Für die Navigation brauchst du eine neue Regel mit dem Selektor nav und der Textausrichtung.'],
    tests: [
      { type: 'style', selector: 'h2', prop: 'font-size', expected: '28px', label: 'Zwischenüberschriften sind 28px groß' },
      { type: 'style', selector: 'nav', prop: 'text-align', expected: 'center', label: 'Die Navigation ist zentriert' },
      { type: 'style', selector: 'h1', prop: 'font-size', expected: '48px', label: 'Die h1 bleibt 48px' },
    ],
    aendern: {
      css: (c) => c
        .replace('h2 {\n  color: #d94f00;\n}', 'h2 {\n  color: #d94f00;\n  font-size: 28px;\n}')
        .replace('figcaption {\n  color: #6b6b7a;\n}\n', 'figcaption {\n  color: #6b6b7a;\n}\n\nnav {\n  text-align: center;\n}\n'),
    },
  });

  /* ================= Kapitel 13 – Container (css) ================= */
  etappe({
    id: '13-box-modell/01-rahmen-und-innenabstand',
    page: 'index',
    titel: 'Hinweis-Box mit Rahmen',
    task: '**Erweitere** die Regel für die Klasse `hinweis`: ein 2 Pixel dicker, durchgezogener Rahmen in `#ff6a00` und rundum 12 Pixel Innenabstand.',
    hints: ['Der Rahmen braucht drei Angaben in einer Zeile: Dicke, Linienart, Farbe.', 'Innenabstand ist padding – ein Wert gilt für alle vier Seiten.'],
    tests: [
      { type: 'style', selector: '.hinweis', prop: 'border-top-width', expected: '2px', label: 'Der Rahmen ist 2px dick' },
      { type: 'style', selector: '.hinweis', prop: 'border-top-style', expected: 'solid', label: 'Der Rahmen ist durchgezogen' },
      { type: 'style', selector: '.hinweis', prop: 'border-top-color', expected: '#ff6a00', label: 'Der Rahmen ist orange' },
      { type: 'style', selector: '.hinweis', prop: 'padding-top', expected: '12px', label: 'Der Innenabstand ist 12px' },
      { type: 'style', selector: 'main > p:not(.hinweis)', prop: 'border-top-style', expected: 'none', label: 'Andere Absätze haben keinen Rahmen' },
    ],
    aendern: { css: ['.hinweis {\n  color: #b34700;\n  font-weight: bold;\n}', '.hinweis {\n  color: #b34700;\n  font-weight: bold;\n  border: 2px solid #ff6a00;\n  padding: 12px;\n}'] },
  });
  etappe({
    id: '13-box-modell/02-aussenabstand-und-breite',
    page: 'index',
    titel: 'Abstand und Breite',
    task: '**Erweitere** die Regel für die Klasse `hinweis`: 16 Pixel Abstand nach oben (außen) und eine Breite von 420 Pixeln. **Ergänze** außerdem eine Regel, die den Hauptbereich höchstens 720 Pixel breit macht.',
    hints: ['Außenabstand ist margin; nur nach oben ist eine eigene Eigenschaft mit -top.', 'Höchstbreite ist max-width – für das Element main.'],
    tests: [
      { type: 'style', selector: '.hinweis', prop: 'margin-top', expected: '16px', label: 'Der Hinweis hat 16px Abstand nach oben' },
      { type: 'style', selector: '.hinweis', prop: 'width', expected: '420px', label: 'Der Hinweis ist 420px breit' },
      { type: 'style', selector: 'main', prop: 'max-width', expected: '720px', label: 'Der Hauptbereich ist höchstens 720px breit' },
    ],
    aendern: {
      css: (c) => c
        .replace('  border: 2px solid #ff6a00;\n  padding: 12px;\n}', '  border: 2px solid #ff6a00;\n  padding: 12px;\n  margin-top: 16px;\n  width: 420px;\n}')
        .replace('nav {\n  text-align: center;\n}\n', 'nav {\n  text-align: center;\n}\n\nmain {\n  max-width: 720px;\n}\n'),
    },
  });
  etappe({
    id: '13-box-modell/03-ecken-und-schatten',
    page: 'index',
    titel: 'Runde Ecken und Schatten',
    task: '**Gestalte** weiter: Alle Bilder bekommen 12 Pixel runde Ecken. Die Hinweis-Box bekommt 8 Pixel runde Ecken und einen Schatten: 0 Pixel nach rechts, 4 Pixel nach unten, 12 Pixel weich, Farbe `rgba(0, 0, 0, 0.15)`.',
    hints: ['Runde Ecken ist border-radius.', 'Der Schatten ist box-shadow mit vier Angaben: x, y, Weichzeichnung, Farbe.', 'Für Bilder brauchst du eine neue img-Regel; die Hinweis-Werte kommen in die vorhandene Regel.'],
    tests: [
      { type: 'style', selector: 'img', prop: 'border-top-left-radius', expected: '12px', label: 'Bilder haben 12px runde Ecken' },
      { type: 'style', selector: '.hinweis', prop: 'border-top-left-radius', expected: '8px', label: 'Die Hinweis-Box hat 8px runde Ecken' },
      { type: 'style', selector: '.hinweis', prop: 'box-shadow', expected: 'rgba(0, 0, 0, 0.15) 0px 4px 12px', contains: true, label: 'Die Hinweis-Box hat den Schatten' },
    ],
    aendern: {
      css: (c) => c
        .replace('  margin-top: 16px;\n  width: 420px;\n}', '  margin-top: 16px;\n  width: 420px;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}')
        .replace('main {\n  max-width: 720px;\n}\n', 'main {\n  max-width: 720px;\n}\n\nimg {\n  border-radius: 12px;\n}\n'),
    },
  });
  etappe({
    id: '13-box-modell/04-wiederholung',
    page: 'programm',
    titel: 'Luft in den Tabellen',
    task: '**Erstelle** eine gemeinsame Regel für Kopf- und Datenzellen (mit Komma): oben und unten 6 Pixel, links und rechts 10 Pixel Innenabstand. **Erweitere** die table-Regel um einen 1 Pixel dicken, durchgezogenen Rahmen in `#1b1b2f`.',
    hints: ['Zwei Werte bei padding: erst oben/unten, dann links/rechts.', 'Gruppen-Selektor th, td – eine Regel für beide.'],
    tests: [
      { type: 'source', file: 'css', matches: 'th\\s*,\\s*td|td\\s*,\\s*th', label: 'th und td stehen als Gruppe in einer Regel' },
      { type: 'style', selector: 'td', prop: 'padding-top', expected: '6px', label: 'Zellen haben oben 6px Innenabstand' },
      { type: 'style', selector: 'th', prop: 'padding-left', expected: '10px', label: 'Zellen haben links 10px Innenabstand' },
      { type: 'style', selector: 'table', prop: 'border-top-width', expected: '1px', label: 'Tabellen haben einen 1px-Rahmen' },
      { type: 'style', selector: 'table', prop: 'border-top-color', expected: '#1b1b2f', label: 'Der Tabellenrahmen ist dunkel' },
    ],
    aendern: {
      css: (c) => c
        .replace('table {\n  background-color: white;\n}', 'table {\n  background-color: white;\n  border: 1px solid #1b1b2f;\n}')
        .replace('img {\n  border-radius: 12px;\n}\n', 'img {\n  border-radius: 12px;\n}\n\nth, td {\n  padding: 6px 10px;\n}\n'),
    },
  });
  etappe({
    id: '13-box-modell/05-projekt-karten',
    page: 'galerie',
    titel: 'Meilenstein: Bild-Karten',
    task: '**Gestalte** die Bild-Blöcke der Galerie als Karten: weißer Hintergrund, rundum 12 Pixel Innenabstand, 12 Pixel runde Ecken, kein Außenabstand.',
    hints: ['Der Selektor ist das Element figure.', 'Vier Eigenschaften in einer neuen Regel; „kein Außenabstand“ ist margin mit 0.'],
    tests: [
      { type: 'style', selector: 'figure', prop: 'background-color', expected: 'white', label: 'Bild-Blöcke sind weiß' },
      { type: 'style', selector: 'figure', prop: 'padding-top', expected: '12px', label: 'Bild-Blöcke haben 12px Innenabstand' },
      { type: 'style', selector: 'figure', prop: 'border-top-left-radius', expected: '12px', label: 'Bild-Blöcke haben runde Ecken' },
      { type: 'style', selector: 'figure', prop: 'margin-left', expected: '0px', label: 'Bild-Blöcke haben keinen Außenabstand' },
    ],
    aendern: { css: ['th, td {\n  padding: 6px 10px;\n}\n', 'th, td {\n  padding: 6px 10px;\n}\n\nfigure {\n  background-color: white;\n  padding: 12px;\n  border-radius: 12px;\n  margin: 0;\n}\n'] },
  });

  /* ================= Kapitel 14 – Bühnen-Layout (css) ================= */
  etappe({
    id: '14-flexbox/01-flex-grundlagen',
    page: 'index',
    titel: 'Navigation nebeneinander',
    task: '**Gestalte** die Navigation als Flex-Container mit 16 Pixel Abstand zwischen den Links.',
    hints: ['Flexbox schaltest du mit display ein.', 'Der Abstand zwischen Flex-Kindern ist gap.', 'Beides in die vorhandene nav-Regel.'],
    tests: [
      { type: 'style', selector: 'nav', prop: 'display', expected: 'flex', label: 'Die Navigation ist ein Flex-Container' },
      { type: 'style', selector: 'nav', prop: 'column-gap', expected: '16px', label: 'Zwischen den Links sind 16px Abstand' },
    ],
    aendern: { css: ['nav {\n  text-align: center;\n}', 'nav {\n  text-align: center;\n  display: flex;\n  gap: 16px;\n}'] },
  });
  etappe({
    id: '14-flexbox/02-ausrichten',
    page: 'index',
    titel: 'Ausrichten',
    task: '**Gestalte** die Ausrichtung: Die Navigations-Links werden in der Mitte verteilt. Der Kopfbereich wird ein Flex-Container mit Spaltenrichtung, in dem alles horizontal zentriert ist.',
    hints: ['Verteilen entlang der Hauptachse ist justify-content.', 'Bei Spaltenrichtung zentriert align-items horizontal.', 'Für den Kopfbereich brauchst du eine neue header-Regel mit drei Eigenschaften.'],
    tests: [
      { type: 'style', selector: 'nav', prop: 'justify-content', expected: 'center', label: 'Die Links sind mittig verteilt' },
      { type: 'style', selector: 'header', prop: 'display', expected: 'flex', label: 'Der Kopfbereich ist ein Flex-Container' },
      { type: 'style', selector: 'header', prop: 'flex-direction', expected: 'column', label: 'Der Kopfbereich stapelt seine Kinder' },
      { type: 'style', selector: 'header', prop: 'align-items', expected: 'center', label: 'Die Kinder sind zentriert' },
    ],
    aendern: {
      css: (c) => c
        .replace('  display: flex;\n  gap: 16px;\n}', '  display: flex;\n  gap: 16px;\n  justify-content: center;\n}')
        .replace('figure {\n  background-color: white;', 'header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nfigure {\n  background-color: white;'),
    },
  });
  etappe({
    id: '14-flexbox/03-umbrechen-und-wachsen',
    page: 'index',
    titel: 'Foodtrucks als Kacheln',
    task: '**Gestalte** die Truck-Liste im Container `foodtrucks` als Flex-Container, der umbricht, mit 12 Pixel Abstand; jeder Listenpunkt darin wächst gleichmäßig.',
    hints: ['Umbrechen ist flex-wrap mit dem Wert wrap.', 'Wachsen ist die Kurzschreibweise flex mit dem Wert 1 – an den Kindern, nicht am Container.', 'Zwei neue Regeln mit Nachfahren-Selektoren: .foodtrucks ul und .foodtrucks li.'],
    tests: [
      { type: 'style', selector: '.foodtrucks ul', prop: 'display', expected: 'flex', label: 'Die Truck-Liste ist ein Flex-Container' },
      { type: 'style', selector: '.foodtrucks ul', prop: 'flex-wrap', expected: 'wrap', label: 'Die Liste bricht um' },
      { type: 'style', selector: '.foodtrucks ul', prop: 'column-gap', expected: '12px', label: 'Zwischen den Kacheln sind 12px' },
      { type: 'style', selector: '.foodtrucks li', prop: 'flex-grow', expected: '1', label: 'Die Kacheln wachsen gleichmäßig' },
    ],
    aendern: { css: ['figure {\n  background-color: white;', '.foodtrucks ul {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n\n.foodtrucks li {\n  flex: 1;\n}\n\nfigure {\n  background-color: white;'] },
  });
  etappe({
    id: '14-flexbox/04-wiederholung',
    page: 'index',
    titel: 'Der Fußbereich bekommt Luft',
    task: '**Erweitere** die footer-Regel: rundum 16 Pixel Innenabstand und zentrierter Text.',
    hints: ['Beides in die vorhandene footer-Regel – Hintergrund und Farbe bleiben.'],
    tests: [
      { type: 'style', selector: 'footer', prop: 'padding-top', expected: '16px', label: 'Der Fußbereich hat 16px Innenabstand' },
      { type: 'style', selector: 'footer', prop: 'text-align', expected: 'center', label: 'Der Fußtext ist zentriert' },
      { type: 'style', selector: 'footer', prop: 'background-color', expected: '#1b1b2f', label: 'Der Fußbereich bleibt dunkel' },
    ],
    aendern: { css: ['footer {\n  background-color: #1b1b2f;\n  color: #fff7e8;\n}', 'footer {\n  background-color: #1b1b2f;\n  color: #fff7e8;\n  padding: 16px;\n  text-align: center;\n}'] },
  });
  etappe({
    id: '14-flexbox/05-projekt-layout',
    page: 'index',
    titel: 'Meilenstein: Der Kopfbereich leuchtet',
    task: '**Gestalte** den Kopfbereich: Hintergrundfarbe `#1b1b2f` und rundum 24 Pixel Innenabstand. Die Hauptüberschrift und der Absatz im Kopfbereich bekommen mit einer gemeinsamen Regel die Farbe `#ffd23f`.',
    hints: ['Hintergrund und Innenabstand in die vorhandene header-Regel.', 'Gruppen-Selektor aus zwei Nachfahren-Selektoren: header h1, header p.'],
    tests: [
      { type: 'style', selector: 'header', prop: 'background-color', expected: '#1b1b2f', label: 'Der Kopfbereich ist dunkel' },
      { type: 'style', selector: 'header', prop: 'padding-top', expected: '24px', label: 'Der Kopfbereich hat 24px Innenabstand' },
      { type: 'style', selector: 'header h1', prop: 'color', expected: '#ffd23f', label: 'Die Hauptüberschrift ist gelb' },
      { type: 'style', selector: 'header p', prop: 'color', expected: '#ffd23f', label: 'Der Kopf-Absatz ist gelb' },
      { type: 'source', file: 'css', matches: 'header\\s+h1\\s*,\\s*header\\s+p|header\\s+p\\s*,\\s*header\\s+h1', label: 'Beide stehen als Gruppe in einer Regel' },
    ],
    aendern: {
      css: (c) => c
        .replace('header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}', 'header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: #1b1b2f;\n  padding: 24px;\n}\n\nheader h1, header p {\n  color: #ffd23f;\n}'),
    },
  });

  /* ================= Kapitel 15 – Sicherheitszentrale (galerie, impressum, index) ================= */
  etappe({
    id: '15-recht-im-web/01-urheberrecht-und-bilder',
    page: 'galerie',
    titel: 'Bildnachweis',
    task: '**Ergänze** in der Galerie die Bildunterschrift des ersten Bild-Blocks um den Nachweis: Der Text lautet jetzt „Die Menge vor der Hauptbühne (Foto: Kollektiv FUNKEN, CC BY 4.0)“.',
    hints: ['Nur der Text der ersten Bildunterschrift ändert sich.', 'Die Klammer mit Foto-Nachweis und Lizenz gehört dazu.'],
    tests: [
      { type: 'text', selector: 'figure:first-of-type figcaption', expected: 'Die Menge vor der Hauptbühne (Foto: Kollektiv FUNKEN, CC BY 4.0)', label: 'Der Bildnachweis steht in der ersten Unterschrift' },
      { type: 'text', selector: 'figure:nth-of-type(2) figcaption', expected: 'Das Plakat 2027', label: 'Die zweite Unterschrift ist unverändert' },
    ],
    aendern: { html: ['<figcaption>Die Menge vor der Hauptbühne</figcaption>', '<figcaption>Die Menge vor der Hauptbühne (Foto: Kollektiv FUNKEN, CC BY 4.0)</figcaption>'] },
  });
  etappe({
    id: '15-recht-im-web/02-impressum-und-datenschutz',
    page: 'impressum',
    titel: 'Neue Seite: Impressum',
    task: '**Erstelle** die Impressum-Seite: Grundgerüst (Deutsch, UTF-8, Titel „Impressum – FUNKEN“, Verknüpfung mit style.css), Kopfbereich mit Hauptüberschrift „Impressum“, Navigation mit einem Link „Startseite“ → index.html, Hauptbereich mit dem Abschnitt „Angaben“ (Absatz mit drei Zeilen: Kollektiv FUNKEN – Schülerfirma (fiktiv), Hafenstraße 9, 74072 Heilbronn, dann ein E-Mail-Link hallo@funken-festival-beispiel.de) und dem Abschnitt „Datenschutzerklärung“ mit dem Absatz „Beim Ticketformular speichern wir Name und E-Mail nur, um die Reservierung zu bestätigen.“ und dem stark betonten Absatz „Fiktiver Betrieb für Übungszwecke.“, Fußbereich mit „Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn“.',
    hints: ['Grundgerüst plus link im head – wie bei den anderen Seiten.', 'Zeilenumbrüche im Adress-Absatz, dahinter der mailto-Link.', 'Zwei Abschnitte mit h2 im Hauptbereich.'],
    tests: [
      { type: 'text', selector: 'title', expected: 'Impressum – FUNKEN', label: 'Der Titel lautet „Impressum – FUNKEN“' },
      { type: 'attr', selector: 'head link[rel="stylesheet"]', attr: 'href', expected: 'style.css', label: 'Die Seite verknüpft style.css' },
      { type: 'text', selector: 'header h1', expected: 'Impressum', label: 'Die Hauptüberschrift lautet „Impressum“' },
      { type: 'attr', selector: 'nav a', attr: 'href', expected: 'index.html', label: 'Die Navigation führt zur Startseite' },
      { type: 'text', selector: 'main h2', expected: 'Angaben', label: 'Der erste Abschnitt heißt „Angaben“' },
      { type: 'text', selector: 'main h2 + p', expected: 'Kollektiv FUNKEN – Schülerfirma (fiktiv) Hafenstraße 9 74072 Heilbronn hallo@funken-festival-beispiel.de', label: 'Die Angaben sind vollständig' },
      { type: 'attr', selector: 'main a', attr: 'href', expected: 'mailto:hallo@funken-festival-beispiel.de', label: 'Der E-Mail-Link öffnet das Mailprogramm' },
      { type: 'text', selector: 'main h2:nth-of-type(2)', expected: 'Datenschutzerklärung', label: 'Der zweite Abschnitt heißt „Datenschutzerklärung“' },
      { type: 'text', selector: 'main strong', expected: 'Fiktiver Betrieb für Übungszwecke.', label: 'Der Hinweis auf den fiktiven Betrieb ist stark betont' },
      { type: 'text', selector: 'footer p', expected: 'Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn', label: 'Der Fußbereich nennt die Adresse' },
    ],
    aendern: {
      html: () => `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Impressum – FUNKEN</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <h1>Impressum</h1>
    </header>

    <nav>
      <a href="index.html">Startseite</a>
    </nav>

    <main>
      <h2>Angaben</h2>
      <p>Kollektiv FUNKEN – Schülerfirma (fiktiv)<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="mailto:hallo@funken-festival-beispiel.de">hallo@funken-festival-beispiel.de</a></p>

      <h2>Datenschutzerklärung</h2>
      <p>Beim Ticketformular speichern wir Name und E-Mail nur, um die Reservierung zu bestätigen.</p>
      <p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>
    </main>

    <footer>
      <p>Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn</p>
    </footer>
  </body>
</html>
`,
    },
    starter: { html: '<!-- Impressum von FUNKEN -->\n' },
  });
  etappe({
    id: '15-recht-im-web/03-projekt-impressum',
    page: 'index',
    titel: 'Meilenstein: Impressum verlinken',
    task: '**Ergänze** im Fußbereich der Startseite nach dem Adress-Absatz einen weiteren Absatz mit zwei Links: „Impressum“ → impressum.html und „Tickets“ → tickets.html.',
    hints: ['Ein neuer Absatz im footer mit zwei Links, z. B. durch · getrennt.'],
    tests: [
      { type: 'text', selector: 'footer a[href="impressum.html"]', expected: 'Impressum', label: 'Der Fußbereich verlinkt das Impressum' },
      { type: 'text', selector: 'footer a[href="tickets.html"]', expected: 'Tickets', label: 'Der Fußbereich verlinkt die Tickets' },
      { type: 'selector', selector: 'footer p', count: 2, label: 'Der Fußbereich hat zwei Absätze' },
    ],
    aendern: { html: ['hallo@funken-festival-beispiel.de</a></p>\n    </footer>', 'hallo@funken-festival-beispiel.de</a></p>\n      <p><a href="impressum.html">Impressum</a> · <a href="tickets.html">Tickets</a></p>\n    </footer>'] },
  });

  /* ================= Kapitel 16 – Stromkasten (js; index) ================= */
  etappe({
    id: '16-javascript-start/01-was-ist-javascript',
    page: 'index',
    titel: 'Das erste Skript',
    task: '**Vervollständige** die Startseite: Vor dem schließenden body-Tag wird die Datei script.js eingebunden. **Erstelle** im Skript eine Ausgabe in der Konsole mit dem Text „FUNKEN – Startseite geladen“. Der Kommentar im Skript bleibt.',
    hints: ['Skripte bindest du mit einem script-Element und dem src-Attribut ein – am Ende des body.', 'Konsolenausgaben machst du mit console.log und dem Text in Anführungszeichen.'],
    tests: [
      { type: 'attr', selector: 'body script', attr: 'src', expected: 'script.js', label: 'script.js ist am Ende des body eingebunden' },
      { type: 'console', expected: 'FUNKEN – Startseite geladen', label: 'Die Konsole zeigt „FUNKEN – Startseite geladen“' },
    ],
    aendern: {
      html: ['    </footer>\n  </body>', '    </footer>\n    <script src="script.js"></script>\n  </body>'],
      js: () => '// Skript der FUNKEN-Website\nconsole.log("FUNKEN – Startseite geladen");\n',
    },
    starter: { js: '// Skript der FUNKEN-Website\n' },
  });
  etappe({
    id: '16-javascript-start/02-variablen',
    page: 'index',
    titel: 'Variablen',
    task: '**Erweitere** das Skript: eine unveränderliche Variable `festivalName` mit dem Text „FUNKEN“, eine veränderliche Variable `reservierungen` mit dem Startwert 0, und eine Konsolenausgabe des Festivalnamens über die Variable.',
    hints: ['Unveränderlich ist const, veränderlich let.', 'Texte stehen in Anführungszeichen, Zahlen nicht.', 'Die Ausgabe bekommt die Variable ohne Anführungszeichen.'],
    tests: [
      { type: 'source', file: 'js', matches: 'const\\s+festivalName\\s*=\\s*["\']FUNKEN["\']', label: 'festivalName ist eine Konstante mit „FUNKEN“' },
      { type: 'source', file: 'js', matches: 'let\\s+reservierungen\\s*=\\s*0', label: 'reservierungen ist eine veränderliche Variable mit 0' },
      { type: 'source', file: 'js', matches: 'console\\.log\\(\\s*festivalName\\s*\\)', label: 'Der Name wird über die Variable ausgegeben' },
      { type: 'console', expected: 'FUNKEN', label: 'Die Konsole zeigt „FUNKEN“' },
    ],
    aendern: { js: ['console.log("FUNKEN – Startseite geladen");\n', 'console.log("FUNKEN – Startseite geladen");\n\nconst festivalName = "FUNKEN";\nlet reservierungen = 0;\nconsole.log(festivalName);\n'] },
  });
  etappe({
    id: '16-javascript-start/03-rechnen-und-verbinden',
    page: 'index',
    titel: 'Rechnen und verbinden',
    task: '**Erweitere** das Skript: eine Konstante `preisPass` mit 20, eine Konstante `anzahl` mit 3 und eine Konsolenausgabe, die den Text „Summe: “ mit dem berechneten Produkt verbindet – Ergebnis „Summe: 60“.',
    hints: ['Malnehmen ist der Stern.', 'Text und Zahl verbindest du mit dem Pluszeichen.', 'Das Ergebnis muss berechnet werden, nicht als Text hingeschrieben.'],
    tests: [
      { type: 'console', expected: 'Summe: 60', label: 'Die Konsole zeigt „Summe: 60“' },
      { type: 'source', file: 'js', matches: 'preisPass\\s*\\*\\s*anzahl|anzahl\\s*\\*\\s*preisPass', label: 'Die Summe wird berechnet' },
      { type: 'source', file: 'js', matches: 'const\\s+preisPass\\s*=\\s*20', label: 'preisPass ist 20' },
    ],
    aendern: { js: ['console.log(festivalName);\n', 'console.log(festivalName);\n\nconst preisPass = 20;\nconst anzahl = 3;\nconsole.log("Summe: " + preisPass * anzahl);\n'] },
  });
  etappe({
    id: '16-javascript-start/04-wiederholung',
    page: 'index',
    titel: 'Einlass-Meldung',
    task: '**Erweitere** das Skript: eine Konstante `einlass` mit dem Text „16:00 Uhr“ und eine Konsolenausgabe, die aus dem Festivalnamen, dem Text „ – Einlass ab “ und der Einlasszeit den Satz „FUNKEN – Einlass ab 16:00 Uhr“ zusammensetzt.',
    hints: ['Drei Teile mit Plus verbinden: Variable, Text, Variable.', 'Achte auf die Leerzeichen im Text.'],
    tests: [
      { type: 'console', expected: 'FUNKEN – Einlass ab 16:00 Uhr', label: 'Die Konsole zeigt „FUNKEN – Einlass ab 16:00 Uhr“' },
      { type: 'source', file: 'js', matches: 'festivalName\\s*\\+', label: 'Der Name kommt aus der Variablen' },
      { type: 'source', file: 'js', matches: 'const\\s+einlass\\s*=', label: 'einlass ist eine Konstante' },
    ],
    aendern: { js: ['console.log("Summe: " + preisPass * anzahl);\n', 'console.log("Summe: " + preisPass * anzahl);\n\nconst einlass = "16:00 Uhr";\nconsole.log(festivalName + " – Einlass ab " + einlass);\n'] },
  });
  etappe({
    id: '16-javascript-start/05-projekt-erstes-skript',
    page: 'index',
    titel: 'Meilenstein: Dauer',
    task: '**Erweitere** das Skript: eine Konstante `tage` mit 2 und eine Konsolenausgabe „FUNKEN dauert 2 Tage“, zusammengesetzt aus Festivalname, Text und der Zahl aus der Variablen.',
    hints: ['Name + Text + Zahl + Text – vier Teile mit Plus.'],
    tests: [
      { type: 'console', expected: 'FUNKEN dauert 2 Tage', label: 'Die Konsole zeigt „FUNKEN dauert 2 Tage“' },
      { type: 'source', file: 'js', matches: 'const\\s+tage\\s*=\\s*2', label: 'tage ist 2' },
      { type: 'source', file: 'js', matches: '\\+\\s*tage\\s*\\+', label: 'Die Zahl kommt aus der Variablen' },
    ],
    aendern: { js: ['console.log(festivalName + " – Einlass ab " + einlass);\n', 'console.log(festivalName + " – Einlass ab " + einlass);\n\nconst tage = 2;\nconsole.log(festivalName + " dauert " + tage + " Tage");\n'] },
  });

  /* ================= Kapitel 17 – Schaltpult (index html + js) ================= */
  etappe({
    id: '17-javascript-dom/01-elemente-aendern',
    page: 'index',
    titel: 'Status-Zeile',
    task: '**Ergänze** ganz oben im Hauptbereich der Startseite einen Absatz mit der id `status` und dem Text „Status wird geladen …“. **Erweitere** das Skript so, dass es dieses Element findet und seinen Text auf „Vorverkauf läuft!“ setzt.',
    hints: ['Das Element findest du über document.getElementById mit der id in Anführungszeichen.', 'Den Text änderst du über die Eigenschaft textContent.', 'Das Skript läuft am Ende der Seite – das Element existiert dann schon.'],
    tests: [
      { type: 'selector', selector: 'main > p#status:first-child', label: 'Der Status-Absatz steht ganz oben im Hauptbereich' },
      { type: 'text', selector: '#status', expected: 'Vorverkauf läuft!', label: 'Der Status lautet nach dem Laden „Vorverkauf läuft!“' },
      { type: 'source', file: 'js', matches: 'getElementById\\(\\s*["\']status["\']\\s*\\)', label: 'Das Skript sucht das Element „status“' },
      { type: 'source', file: 'html', matches: 'Status wird geladen', label: 'Im HTML steht der Starttext' },
    ],
    aendern: {
      html: ['    <main>\n      <p>Freitag, 17.', '    <main>\n      <p id="status">Status wird geladen …</p>\n      <p>Freitag, 17.'],
      js: ['console.log(festivalName + " dauert " + tage + " Tage");\n', 'console.log(festivalName + " dauert " + tage + " Tage");\n\ndocument.getElementById("status").textContent = "Vorverkauf läuft!";\n'],
    },
  });
  etappe({
    id: '17-javascript-dom/02-auf-klick-reagieren',
    page: 'index',
    titel: 'Ein Knopf antwortet',
    task: '**Ergänze** vor dem Status-Absatz einen Knopf mit der id `status-knopf` und dem Text „Gibt es noch Tickets?“; der Status-Absatz startet leer. **Ändere** das Skript: Statt den Status sofort zu setzen, wird beim Klick auf den Knopf der Text „Ja – Festivalpass und Tagestickets verfügbar.“ in den Status geschrieben.',
    hints: ['Auf Klicks reagierst du mit addEventListener("click", …) und einer Funktion.', 'Beide Elemente zuerst in Konstanten holen, dann den Listener am Knopf anmelden.', 'Die Zeile, die den Status sofort gesetzt hat, entfällt.'],
    tests: [
      { type: 'text', selector: 'button#status-knopf', expected: 'Gibt es noch Tickets?', label: 'Der Knopf „Gibt es noch Tickets?“ ist da' },
      { type: 'order', selectors: ['#status-knopf', '#status'], label: 'Der Knopf steht vor dem Status' },
      { type: 'text', selector: '#status', expected: '', label: 'Vor dem Klick ist der Status leer' },
      { type: 'action', action: 'click', selector: '#status-knopf' },
      { type: 'text', selector: '#status', expected: 'Ja – Festivalpass und Tagestickets verfügbar.', label: 'Nach dem Klick steht die Antwort im Status' },
      { type: 'source', file: 'js', matches: 'addEventListener\\(\\s*["\']click["\']', label: 'Das Skript reagiert auf click' },
    ],
    aendern: {
      html: ['      <p id="status">Status wird geladen …</p>\n', '      <button id="status-knopf">Gibt es noch Tickets?</button>\n      <p id="status"></p>\n'],
      js: ['document.getElementById("status").textContent = "Vorverkauf läuft!";\n', 'const status = document.getElementById("status");\nconst statusKnopf = document.getElementById("status-knopf");\nstatusKnopf.addEventListener("click", function () {\n  status.textContent = "Ja – Festivalpass und Tagestickets verfügbar.";\n});\n'],
    },
  });
  etappe({
    id: '17-javascript-dom/03-zaehler',
    page: 'index',
    titel: 'Ich bin dabei!',
    task: '**Ergänze** unter der Line-up-Liste einen Absatz mit einem Knopf (id `dabei-knopf`, Text „Ich bin dabei!“), danach ein Inline-Element mit der id `dabei` und dem Text 0 und den Text „ Leute sind dabei“. **Erweitere** das Skript: Bei jedem Klick wird die Variable `reservierungen` um 1 erhöht und im Element `dabei` angezeigt.',
    hints: ['Der Zähler ist die Variable aus Station 16 – sie wird mit + 1 erhöht und neu zugewiesen.', 'Nach dem Erhöhen den neuen Wert in textContent des Anzeige-Elements schreiben.', 'Der Absatz kommt direkt nach der schließenden Line-up-Liste.'],
    tests: [
      { type: 'text', selector: 'button#dabei-knopf', expected: 'Ich bin dabei!', label: 'Der Knopf „Ich bin dabei!“ ist da' },
      { type: 'text', selector: '#dabei', expected: '0', label: 'Der Zähler startet bei 0' },
      { type: 'action', action: 'click', selector: '#dabei-knopf' },
      { type: 'action', action: 'click', selector: '#dabei-knopf' },
      { type: 'text', selector: '#dabei', expected: '2', label: 'Nach zwei Klicks steht der Zähler auf 2' },
      { type: 'source', file: 'js', matches: 'reservierungen\\s*(=\\s*reservierungen\\s*\\+\\s*1|\\+=\\s*1|\\+\\+)', label: 'Die Variable reservierungen wird erhöht' },
    ],
    aendern: {
      html: ['            <li>Lou &amp; die Lichter</li>\n          </ul>\n        </li>\n      </ul>\n', '            <li>Lou &amp; die Lichter</li>\n          </ul>\n        </li>\n      </ul>\n      <p><button id="dabei-knopf">Ich bin dabei!</button> <span id="dabei">0</span> Leute sind dabei</p>\n'],
      js: ['  status.textContent = "Ja – Festivalpass und Tagestickets verfügbar.";\n});\n', '  status.textContent = "Ja – Festivalpass und Tagestickets verfügbar.";\n});\n\nconst dabeiKnopf = document.getElementById("dabei-knopf");\ndabeiKnopf.addEventListener("click", function () {\n  reservierungen = reservierungen + 1;\n  document.getElementById("dabei").textContent = reservierungen;\n});\n'],
    },
  });
  etappe({
    id: '17-javascript-dom/04-klassen-schalten',
    page: 'index',
    titel: 'Nachtmodus',
    task: '**Ergänze** in der Navigation als letztes Element einen Knopf mit der id `nacht-knopf` und dem Text „Nachtmodus“. **Erstelle** im Stylesheet eine Regel für die Klasse `nacht` mit Hintergrundfarbe `#1b1b2f` und Textfarbe `#fff7e8`. **Erweitere** das Skript: Beim Klick wird die Klasse `nacht` am body ein- oder ausgeschaltet.',
    hints: ['Klassen schaltest du mit classList.toggle um – am document.body.', 'Drei Dateien, drei kleine Änderungen: Knopf im HTML, Regel im CSS, Listener im JS.'],
    tests: [
      { type: 'text', selector: 'nav button#nacht-knopf', expected: 'Nachtmodus', label: 'Der Nachtmodus-Knopf steht in der Navigation' },
      { type: 'style', selector: 'body', prop: 'background-color', expected: '#fff7e8', label: 'Vor dem Klick ist die Seite hell' },
      { type: 'action', action: 'click', selector: '#nacht-knopf' },
      { type: 'style', selector: 'body', prop: 'background-color', expected: '#1b1b2f', label: 'Nach dem Klick ist die Seite dunkel' },
      { type: 'style', selector: 'body', prop: 'color', expected: '#fff7e8', label: 'Der Text ist dann hell' },
      { type: 'source', file: 'js', matches: 'classList\\.toggle\\(\\s*["\']nacht["\']', label: 'Das Skript schaltet die Klasse nacht um' },
    ],
    aendern: {
      html: ['      <a href="#lineup">Direkt zum Line-up</a>\n    </nav>', '      <a href="#lineup">Direkt zum Line-up</a>\n      <button id="nacht-knopf">Nachtmodus</button>\n    </nav>'],
      css: ['header h1, header p {\n  color: #ffd23f;\n}', 'header h1, header p {\n  color: #ffd23f;\n}\n\n.nacht {\n  background-color: #1b1b2f;\n  color: #fff7e8;\n}'],
      js: ['  document.getElementById("dabei").textContent = reservierungen;\n});\n', '  document.getElementById("dabei").textContent = reservierungen;\n});\n\nconst nachtKnopf = document.getElementById("nacht-knopf");\nnachtKnopf.addEventListener("click", function () {\n  document.body.classList.toggle("nacht");\n});\n'],
    },
  });
  etappe({
    id: '17-javascript-dom/05-wiederholung',
    page: 'index',
    titel: 'Dankeschön',
    task: '**Erweitere** den Klick-Listener des Dabei-Knopfs: Zusätzlich zum Zähler wird der Status-Text auf „Danke – bis Juli!“ gesetzt.',
    hints: ['Die Konstante status gibt es schon – eine zusätzliche Zeile in der vorhandenen Funktion.'],
    tests: [
      { type: 'action', action: 'click', selector: '#dabei-knopf' },
      { type: 'text', selector: '#status', expected: 'Danke – bis Juli!', label: 'Nach dem Klick bedankt sich der Status' },
      { type: 'text', selector: '#dabei', expected: '1', label: 'Der Zähler zählt weiterhin' },
    ],
    aendern: { js: ['  reservierungen = reservierungen + 1;\n  document.getElementById("dabei").textContent = reservierungen;\n});\n', '  reservierungen = reservierungen + 1;\n  document.getElementById("dabei").textContent = reservierungen;\n  status.textContent = "Danke – bis Juli!";\n});\n'] },
  });
  etappe({
    id: '17-javascript-dom/06-projekt-interaktiv',
    page: 'index',
    titel: 'Meilenstein: Countdown',
    task: '**Ergänze** im Kopfbereich nach dem Willkommens-Absatz einen leeren Absatz mit der id `countdown`. **Erweitere** das Skript: eine Konstante `tageBisFunken` mit 42 und eine Zeile, die in den Countdown-Absatz den Text „Noch 42 Tage bis FUNKEN“ schreibt – die Zahl kommt aus der Variablen.',
    hints: ['Element holen, textContent setzen – wie beim Status, nur ohne Klick.', 'Text + Zahl + Text mit Plus verbinden.'],
    tests: [
      { type: 'selector', selector: 'header p#countdown', label: 'Der Countdown-Absatz liegt im Kopfbereich' },
      { type: 'text', selector: '#countdown', expected: 'Noch 42 Tage bis FUNKEN', label: 'Der Countdown zeigt „Noch 42 Tage bis FUNKEN“' },
      { type: 'source', file: 'js', matches: 'const\\s+tageBisFunken\\s*=\\s*42', label: 'tageBisFunken ist 42' },
      { type: 'source', file: 'js', matches: '\\+\\s*tageBisFunken\\s*\\+', label: 'Die Zahl kommt aus der Variablen' },
    ],
    aendern: {
      html: ['      <p>Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.</p>\n      <img', '      <p>Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.</p>\n      <p id="countdown"></p>\n      <img'],
      js: ['  document.body.classList.toggle("nacht");\n});\n', '  document.body.classList.toggle("nacht");\n});\n\nconst tageBisFunken = 42;\ndocument.getElementById("countdown").textContent = "Noch " + tageBisFunken + " Tage bis FUNKEN";\n'],
    },
  });

  /* ================= Kapitel 18 – Showtime ================= */
  etappe({
    id: '18-showtime/01-alles-zusammenfuegen',
    page: 'index',
    titel: 'Der Ticket-Knopf',
    task: '**Ergänze** im Kopfbereich nach dem Countdown-Absatz einen Absatz mit der Klasse `cta`, der einen Link „Jetzt Tickets sichern“ → tickets.html enthält. **Gestalte** diesen Link im Stylesheet: Hintergrund `#ff6a00`, weiße Schrift, oben/unten 10 und links/rechts 16 Pixel Innenabstand, 999 Pixel runde Ecken, keine Unterstreichung.',
    hints: ['Nachfahren-Selektor .cta a.', 'Fünf Eigenschaften in einer Regel: background-color, color, padding, border-radius, text-decoration.'],
    tests: [
      { type: 'text', selector: 'header p.cta a[href="tickets.html"]', expected: 'Jetzt Tickets sichern', label: 'Der Ticket-Link steht im Kopfbereich' },
      { type: 'style', selector: '.cta a', prop: 'background-color', expected: '#ff6a00', label: 'Der Link ist orange hinterlegt' },
      { type: 'style', selector: '.cta a', prop: 'color', expected: 'white', label: 'Die Schrift ist weiß' },
      { type: 'style', selector: '.cta a', prop: 'padding-left', expected: '16px', label: 'Links und rechts 16px Innenabstand' },
      { type: 'style', selector: '.cta a', prop: 'border-top-left-radius', expected: '999px', label: 'Die Ecken sind rund' },
      { type: 'style', selector: '.cta a', prop: 'text-decoration-line', expected: 'none', label: 'Keine Unterstreichung' },
    ],
    aendern: {
      html: ['      <p id="countdown"></p>\n', '      <p id="countdown"></p>\n      <p class="cta"><a href="tickets.html">Jetzt Tickets sichern</a></p>\n'],
      css: ['.nacht {\n  background-color: #1b1b2f;\n  color: #fff7e8;\n}', '.nacht {\n  background-color: #1b1b2f;\n  color: #fff7e8;\n}\n\n.cta a {\n  background-color: #ff6a00;\n  color: white;\n  padding: 10px 16px;\n  border-radius: 999px;\n  text-decoration: none;\n}'],
    },
  });
  etappe({
    id: '18-showtime/02-grosse-wiederholung',
    page: 'tickets',
    titel: 'Häufige Fragen',
    task: '**Erweitere** die Tickets-Seite: In der Navigation kommt ein vierter Link „Impressum“ → impressum.html. Im Hauptbereich nach dem Formular der Abschnitt „Häufige Fragen“ mit einer Aufzählungsliste aus drei Einträgen, jeweils mit stark betonter Frage und Antwort: „Ab wie viel Jahren?“ – Ab 14, „Gibt es Abendkasse?“ – Ja, solange Tickets da sind, „Regen?“ – Wir spielen trotzdem.',
    hints: ['Link in nav, Abschnitt mit h2 und ul im main – alles bekannt.', 'In jedem Listenpunkt: strong um die Frage, dann Gedankenstrich und Antwort.'],
    tests: [
      { type: 'text', selector: 'nav a[href="impressum.html"]', expected: 'Impressum', label: 'Die Navigation verlinkt das Impressum' },
      { type: 'selector', selector: 'nav a', count: 4, label: 'Die Navigation hat vier Links' },
      { type: 'text', selector: 'main h2:last-of-type', expected: 'Häufige Fragen', label: 'Der Abschnitt „Häufige Fragen“ ist da' },
      { type: 'selector', selector: 'main ul > li > strong', count: 3, label: 'Drei Fragen sind stark betont' },
      { type: 'text', selector: 'main ul > li:first-child', expected: 'Ab wie viel Jahren? – Ab 14', label: 'Die erste Frage stimmt' },
      { type: 'order', selectors: ['form', 'main h2:last-of-type'], label: 'Der Abschnitt steht nach dem Formular' },
    ],
    aendern: {
      html: (h) => h
        .replace('      <a href="galerie.html">Galerie</a>\n    </nav>', '      <a href="galerie.html">Galerie</a>\n      <a href="impressum.html">Impressum</a>\n    </nav>')
        .replace('        <button type="submit">Ticket reservieren</button>\n      </form>\n', `        <button type="submit">Ticket reservieren</button>
      </form>

      <h2>Häufige Fragen</h2>
      <ul>
        <li><strong>Ab wie viel Jahren?</strong> – Ab 14</li>
        <li><strong>Gibt es Abendkasse?</strong> – Ja, solange Tickets da sind</li>
        <li><strong>Regen?</strong> – Wir spielen trotzdem</li>
      </ul>
`),
    },
  });
}
