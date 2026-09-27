// Etappen Block B (HTML): Kapitel 02–09. Seite für Seite entsteht die FUNKEN-Website.
export function teilA(etappe) {
  /* ================= Kapitel 02 – Fundament (index) ================= */
  etappe({
    id: '02-html-erste-schritte/01-was-ist-html',
    page: 'index',
    titel: 'Die erste Überschrift',
    task: '**Erstelle** die Hauptüberschrift der Startseite: Sie lautet „FUNKEN“ und ist die wichtigste Überschrift der Seite. Der Kommentar bleibt stehen.',
    hints: ['Die wichtigste Überschrift einer Seite ist die Ebene 1.', 'Ein Element besteht aus öffnendem Tag, Inhalt und schließendem Tag – wie bei `<p>…</p>`, nur mit dem Tag für Überschriften.', 'Ordne die Überschrift unter den Kommentar; der Text zwischen den Tags ist genau FUNKEN.'],
    tests: [
      { type: 'text', selector: 'h1', expected: 'FUNKEN', label: 'Die Hauptüberschrift lautet „FUNKEN“' },
      { type: 'selector', selector: 'h1', count: 1, label: 'Es gibt genau eine h1-Überschrift' },
      { type: 'source', file: 'html', matches: '<!--\\s*Hier entsteht', label: 'Der Kommentar ist noch da' },
    ],
    aendern: { html: () => '<!-- Hier entsteht die Startseite von FUNKEN -->\n<h1>FUNKEN</h1>\n' },
    starter: { html: '<!-- Hier entsteht die Startseite von FUNKEN -->\n' },
  });
  etappe({
    id: '02-html-erste-schritte/02-tags-und-attribute',
    page: 'index',
    titel: 'Der Willkommens-Absatz',
    task: '**Ergänze** unter der Überschrift einen Absatz mit dem Text „Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.“',
    hints: ['Fließtext steht in einem Absatz-Element.', 'Der Absatz kommt in eine eigene Zeile nach der Überschrift, mit öffnendem und schließendem Tag.', 'Achte auf den Gedankenstrich und den Punkt am Ende – der Text muss genau stimmen.'],
    tests: [
      { type: 'text', selector: 'p', expected: 'Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.', label: 'Der Absatz hat den richtigen Text' },
      { type: 'order', selectors: ['h1', 'p'], label: 'Der Absatz steht unter der Überschrift' },
      { type: 'text', selector: 'h1', expected: 'FUNKEN', label: 'Die Überschrift ist noch da' },
    ],
    aendern: { html: ['<h1>FUNKEN</h1>\n', '<h1>FUNKEN</h1>\n<p>Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.</p>\n'] },
  });
  etappe({
    id: '02-html-erste-schritte/03-grundgeruest',
    page: 'index',
    titel: 'Das Grundgerüst',
    task: '**Vervollständige** die Seite zum kompletten Grundgerüst: Dokumenttyp, Wurzelelement mit der Sprache Deutsch, Kopfbereich mit Zeichensatz UTF-8 und dem Titel „FUNKEN – Das Schülerfestival“, Körper mit Kommentar, Überschrift und Absatz.',
    hints: ['Reihenfolge: Dokumenttyp, dann html, darin head und body.', 'In den head gehören die Zeichensatz-Angabe (meta) und der title; alles Sichtbare kommt in den body.', 'Das lang-Attribut steht am html-Tag und hat den Wert de.'],
    tests: [
      { type: 'source', file: 'html', matches: '^\\s*<!doctype html>', label: 'Die Datei beginnt mit dem Dokumenttyp' },
      { type: 'attr', selector: 'html', attr: 'lang', expected: 'de', label: 'Die Seite ist als Deutsch gekennzeichnet (lang)' },
      { type: 'source', file: 'html', matches: '<meta[^>]+charset\\s*=\\s*["\']?utf-8', label: 'Der Zeichensatz UTF-8 ist angegeben' },
      { type: 'text', selector: 'title', expected: 'FUNKEN – Das Schülerfestival', label: 'Der Titel lautet „FUNKEN – Das Schülerfestival“' },
      { type: 'selector', selector: 'body h1', count: 1, label: 'Die Überschrift steht im body' },
      { type: 'selector', selector: 'body p', count: 1, label: 'Der Absatz steht im body' },
    ],
    aendern: {
      html: () => `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>FUNKEN – Das Schülerfestival</title>
  </head>
  <body>
    <!-- Startseite von FUNKEN -->
    <h1>FUNKEN</h1>
    <p>Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.</p>
  </body>
</html>
`,
    },
  });
  etappe({
    id: '02-html-erste-schritte/04-wiederholung',
    page: 'index',
    titel: 'Der Termin',
    task: '**Ergänze** unter dem Willkommens-Absatz einen zweiten Absatz: „Freitag, 17. und Samstag, 18. Juli 2027 auf dem alten Fabrikgelände am Neckar.“',
    hints: ['Ein weiterer Absatz – gleiches Element wie der erste.', 'Er kommt direkt nach dem ersten Absatz, noch vor dem schließenden body-Tag.'],
    tests: [
      { type: 'selector', selector: 'body > p', count: 2, label: 'Es gibt zwei Absätze' },
      { type: 'text', selector: 'p:nth-of-type(2)', expected: 'Freitag, 17. und Samstag, 18. Juli 2027 auf dem alten Fabrikgelände am Neckar.', label: 'Der zweite Absatz nennt den Termin' },
      { type: 'text', selector: 'title', expected: 'FUNKEN – Das Schülerfestival', label: 'Der Titel ist noch da' },
    ],
    aendern: { html: ['Open Air am Neckar.</p>\n', 'Open Air am Neckar.</p>\n    <p>Freitag, 17. und Samstag, 18. Juli 2027 auf dem alten Fabrikgelände am Neckar.</p>\n'] },
  });
  etappe({
    id: '02-html-erste-schritte/05-projekt-startseite',
    page: 'index',
    titel: 'Meilenstein: Startseite steht',
    task: '**Erweitere** die Startseite um einen dritten Absatz mit den Zeiten: „Einlass ab 16:00 Uhr, Ende 23:00 Uhr.“ – direkt unter dem Termin. **Überprüfe** dabei, dass das Grundgerüst vollständig ist.',
    hints: ['Dritter Absatz, gleiches Muster.', 'Reihenfolge im body: Kommentar, Überschrift, drei Absätze.'],
    tests: [
      { type: 'selector', selector: 'body > p', count: 3, label: 'Es gibt drei Absätze' },
      { type: 'text', selector: 'p:nth-of-type(3)', expected: 'Einlass ab 16:00 Uhr, Ende 23:00 Uhr.', label: 'Der dritte Absatz nennt Einlass und Ende' },
      { type: 'attr', selector: 'html', attr: 'lang', expected: 'de', label: 'Das Grundgerüst mit lang="de" ist vollständig' },
      { type: 'source', file: 'html', matches: '<meta[^>]+charset', label: 'Die Zeichensatz-Angabe ist da' },
    ],
    aendern: { html: ['Fabrikgelände am Neckar.</p>\n', 'Fabrikgelände am Neckar.</p>\n    <p>Einlass ab 16:00 Uhr, Ende 23:00 Uhr.</p>\n'] },
  });

  /* ================= Kapitel 03 – Textbanner (index) ================= */
  etappe({
    id: '03-text/01-ueberschriften',
    page: 'index',
    titel: 'Zwischenüberschrift „Das Festival“',
    task: '**Ergänze** nach den drei Absätzen eine Zwischenüberschrift der Ebene 2 mit dem Text „Das Festival“.',
    hints: ['Zwischenüberschriften sind eine Ebene unter der Hauptüberschrift.', 'Sie kommt nach dem letzten Absatz, vor dem schließenden body.'],
    tests: [
      { type: 'text', selector: 'h2', expected: 'Das Festival', label: 'Die Zwischenüberschrift lautet „Das Festival“' },
      { type: 'order', selectors: ['p:nth-of-type(3)', 'h2'], label: 'Sie steht unter den Absätzen' },
      { type: 'selector', selector: 'h1', count: 1, label: 'Es gibt weiterhin genau eine h1' },
    ],
    aendern: { html: ['Ende 23:00 Uhr.</p>\n', 'Ende 23:00 Uhr.</p>\n\n    <h2>Das Festival</h2>\n'] },
  });
  etappe({
    id: '03-text/02-absaetze-umbrueche-linien',
    page: 'index',
    titel: 'Texte, Linie und Adresse',
    task: '**Erstelle** unter „Das Festival“ zwei Absätze („FUNKEN wird von Schülerinnen und Schülern organisiert – vom Line-up bis zum Ticketverkauf.“ und „Der Erlös geht an Projekte unserer Schulen.“), darunter eine Trennlinie und einen Adress-Absatz mit drei Zeilen: Kollektiv FUNKEN, Hafenstraße 9, 74072 Heilbronn.',
    hints: ['Trennlinie und Zeilenumbruch sind Leerelemente – sie haben keinen schließenden Tag.', 'Die drei Adresszeilen stehen in EINEM Absatz, getrennt durch Zeilenumbrüche.', 'Reihenfolge: h2, zwei Absätze, Linie, Adress-Absatz.'],
    tests: [
      { type: 'text', selector: 'h2 + p', expected: 'FUNKEN wird von Schülerinnen und Schülern organisiert – vom Line-up bis zum Ticketverkauf.', label: 'Der erste Absatz unter „Das Festival“ stimmt' },
      { type: 'text', selector: 'p', expected: 'Der Erlös geht an Projekte unserer Schulen.', any: true, label: 'Der Absatz über den Erlös ist da' },
      { type: 'selector', selector: 'hr', count: 1, label: 'Es gibt eine Trennlinie' },
      { type: 'selector', selector: 'hr + p br', count: 2, label: 'Der Adress-Absatz nach der Linie hat zwei Zeilenumbrüche' },
      { type: 'text', selector: 'hr + p', expected: 'Kollektiv FUNKEN Hafenstraße 9 74072 Heilbronn', label: 'Die Adresse ist vollständig' },
    ],
    aendern: {
      html: ['    <h2>Das Festival</h2>\n', `    <h2>Das Festival</h2>
    <p>FUNKEN wird von Schülerinnen und Schülern organisiert – vom Line-up bis zum Ticketverkauf.</p>
    <p>Der Erlös geht an Projekte unserer Schulen.</p>
    <hr>
    <p>Kollektiv FUNKEN<br>Hafenstraße 9<br>74072 Heilbronn</p>
`],
    },
  });
  etappe({
    id: '03-text/03-hervorheben-und-kommentare',
    page: 'index',
    titel: 'Betonung und Kommentar',
    task: '**Gestalte** den Text unter „Das Festival“: „Schülerinnen und Schülern“ wird stark betont, „vom Line-up bis zum Ticketverkauf“ leicht betont. **Ergänze** außerdem vor der Trennlinie einen Kommentar mit dem Wort Kontakt.',
    hints: ['Starke Betonung und leichte Betonung sind zwei verschiedene Elemente, die um den Text herumgelegt werden.', 'Kommentare sieht nur, wer den Quelltext liest – sie beginnen mit `<!--`.', 'Beide Betonungen liegen im ersten Absatz unter „Das Festival“.'],
    tests: [
      { type: 'text', selector: 'strong', expected: 'Schülerinnen und Schülern', label: '„Schülerinnen und Schülern“ ist stark betont' },
      { type: 'text', selector: 'em', expected: 'vom Line-up bis zum Ticketverkauf', label: '„vom Line-up bis zum Ticketverkauf“ ist leicht betont' },
      { type: 'source', file: 'html', matches: '<!--[^>]*Kontakt[^>]*-->', label: 'Es gibt einen Kommentar mit „Kontakt“' },
      { type: 'text', selector: 'h2 + p', expected: 'FUNKEN wird von Schülerinnen und Schülern organisiert – vom Line-up bis zum Ticketverkauf.', label: 'Der Text ist unverändert lesbar' },
    ],
    aendern: {
      html: [
        '    <p>FUNKEN wird von Schülerinnen und Schülern organisiert – vom Line-up bis zum Ticketverkauf.</p>\n    <p>Der Erlös geht an Projekte unserer Schulen.</p>\n    <hr>\n',
        '    <p>FUNKEN wird von <strong>Schülerinnen und Schülern</strong> organisiert – <em>vom Line-up bis zum Ticketverkauf</em>.</p>\n    <p>Der Erlös geht an Projekte unserer Schulen.</p>\n    <!-- Kontakt -->\n    <hr>\n',
      ],
    },
  });
  etappe({
    id: '03-text/04-wiederholung',
    page: 'index',
    titel: 'Abschnitt „Die Bühnen“',
    task: '**Erstelle** vor dem Kontakt-Kommentar einen neuen Abschnitt: Zwischenüberschrift „Die Bühnen“ und darunter einen Absatz „Auf der Hauptbühne spielen die Headliner, im Zelt gibt es Newcomer und DJs.“ – das Wort „Hauptbühne“ stark betont.',
    hints: ['Zwischenüberschrift plus Absatz – wie beim Abschnitt „Das Festival“.', 'Die starke Betonung liegt nur um das eine Wort.'],
    tests: [
      { type: 'text', selector: 'h2', expected: 'Die Bühnen', any: true, label: 'Es gibt die Überschrift „Die Bühnen“' },
      { type: 'selector', selector: 'h2', count: 2, label: 'Es gibt zwei Zwischenüberschriften' },
      { type: 'text', selector: 'strong', expected: 'Hauptbühne', any: true, label: '„Hauptbühne“ ist stark betont' },
      { type: 'order', selectors: ['h2:nth-of-type(2)', 'hr'], label: 'Der Abschnitt steht vor der Trennlinie' },
    ],
    aendern: {
      html: ['    <!-- Kontakt -->\n', '    <h2>Die Bühnen</h2>\n    <p>Auf der <strong>Hauptbühne</strong> spielen die Headliner, im Zelt gibt es Newcomer und DJs.</p>\n\n    <!-- Kontakt -->\n'],
    },
  });
  etappe({
    id: '03-text/05-projekt-ueber-das-festival',
    page: 'index',
    titel: 'Meilenstein: Abschnitt „Foodtrucks“',
    task: '**Erweitere** die Startseite vor dem Kontakt-Kommentar um den Abschnitt „Foodtrucks“ (Zwischenüberschrift) mit dem Absatz „Pizza, Döner, Bubble Tea und Waffeln – alles auf dem Gelände.“, das Wort „alles“ leicht betont. **Überprüfe** die Reihenfolge: Das Festival → Die Bühnen → Foodtrucks → Linie.',
    hints: ['Dritter Abschnitt, gleiches Muster wie „Die Bühnen“.', 'Leichte Betonung um ein Wort – das Element aus Lektion 3.'],
    tests: [
      { type: 'selector', selector: 'h2', count: 3, label: 'Es gibt drei Zwischenüberschriften' },
      { type: 'text', selector: 'h2:nth-of-type(3)', expected: 'Foodtrucks', label: 'Die dritte heißt „Foodtrucks“' },
      { type: 'text', selector: 'h2:nth-of-type(3) + p em', expected: 'alles', label: '„alles“ ist leicht betont' },
      { type: 'order', selectors: ['h2:nth-of-type(1)', 'h2:nth-of-type(2)', 'h2:nth-of-type(3)', 'hr'], label: 'Die Reihenfolge stimmt' },
    ],
    aendern: {
      html: ['    <!-- Kontakt -->\n', '    <h2>Foodtrucks</h2>\n    <p>Pizza, Döner, Bubble Tea und Waffeln – <em>alles</em> auf dem Gelände.</p>\n\n    <!-- Kontakt -->\n'],
    },
  });

  /* ================= Kapitel 04 – Programm-Tafel (index) ================= */
  etappe({
    id: '04-listen/01-ungeordnete-listen',
    page: 'index',
    titel: 'Das Line-up als Liste',
    task: '**Erstelle** zwischen „Die Bühnen“ und „Foodtrucks“ einen Abschnitt „Line-up“ (Zwischenüberschrift) mit einer Aufzählungsliste der vier Acts: Neonpuls, Basslager, Kiki Volt, Die Kabelträger.',
    hints: ['Eine Aufzählung ohne Nummern ist eine ungeordnete Liste.', 'Jeder Act ist ein eigener Listenpunkt innerhalb der Liste.', 'Der neue Abschnitt kommt nach dem Bühnen-Absatz und vor der Foodtrucks-Überschrift.'],
    tests: [
      { type: 'text', selector: 'h2:nth-of-type(3)', expected: 'Line-up', label: 'Die dritte Zwischenüberschrift heißt „Line-up“' },
      { type: 'selector', selector: 'ul > li', count: 4, label: 'Die Liste hat vier Einträge' },
      { type: 'text', selector: 'ul > li:first-child', expected: 'Neonpuls', label: 'Der erste Act ist Neonpuls' },
      { type: 'text', selector: 'ul > li:last-child', expected: 'Die Kabelträger', label: 'Der letzte Act ist Die Kabelträger' },
      { type: 'order', selectors: ['h2:nth-of-type(3)', 'ul', 'h2:nth-of-type(4)'], label: 'Der Abschnitt steht vor „Foodtrucks“' },
    ],
    aendern: {
      html: ['    <h2>Foodtrucks</h2>\n', `    <h2>Line-up</h2>
    <ul>
      <li>Neonpuls</li>
      <li>Basslager</li>
      <li>Kiki Volt</li>
      <li>Die Kabelträger</li>
    </ul>

    <h2>Foodtrucks</h2>
`],
    },
  });
  etappe({
    id: '04-listen/02-geordnete-listen',
    page: 'index',
    titel: 'So kommst du hin',
    task: '**Erstelle** vor dem Kontakt-Kommentar den Abschnitt „So kommst du hin“ mit einer nummerierten Liste aus drei Schritten: „Mit der Stadtbahn bis Haltestelle Hafenstraße“, „Den Lichtern folgen“, „Ticket am Einlass zeigen“.',
    hints: ['Nummerierte Schritte sind eine geordnete Liste – der Browser zählt selbst.', 'Die Einträge sind wieder Listenpunkte, nur der äußere Tag ist anders.'],
    tests: [
      { type: 'text', selector: 'h2', expected: 'So kommst du hin', any: true, label: 'Die Überschrift „So kommst du hin“ ist da' },
      { type: 'selector', selector: 'ol > li', count: 3, label: 'Die nummerierte Liste hat drei Schritte' },
      { type: 'text', selector: 'ol > li:first-child', expected: 'Mit der Stadtbahn bis Haltestelle Hafenstraße', label: 'Schritt 1 stimmt' },
      { type: 'order', selectors: ['ol', 'hr'], label: 'Die Liste steht vor der Trennlinie' },
    ],
    aendern: {
      html: ['    <!-- Kontakt -->\n', `    <h2>So kommst du hin</h2>
    <ol>
      <li>Mit der Stadtbahn bis Haltestelle Hafenstraße</li>
      <li>Den Lichtern folgen</li>
      <li>Ticket am Einlass zeigen</li>
    </ol>

    <!-- Kontakt -->
`],
    },
  });
  etappe({
    id: '04-listen/03-verschachtelte-listen',
    page: 'index',
    titel: 'Line-up nach Bühnen',
    task: '**Strukturiere** das Line-up nach Bühnen: Die Liste hat nur noch zwei Einträge, „Hauptbühne“ und „Zeltbühne“; darin liegt jeweils eine eigene Liste – Hauptbühne mit Neonpuls und Basslager, Zeltbühne mit Kiki Volt und Die Kabelträger.',
    hints: ['Eine Liste im Listenpunkt: Die innere Liste steht VOR dem schließenden Tag des Listenpunkts.', 'Zwei äußere Punkte, in jedem eine innere Liste mit zwei Punkten.', 'Einrücken hilft beim Überblick, ist aber nicht Pflicht.'],
    tests: [
      { type: 'selector', selector: 'ul > li > ul', count: 2, label: 'Zwei innere Listen liegen in Listenpunkten' },
      { type: 'text', selector: 'ul > li:first-child', expected: 'Hauptbühne', contains: true, label: 'Der erste äußere Punkt ist die Hauptbühne' },
      { type: 'selector', selector: 'ul ul li', count: 4, label: 'Die inneren Listen haben zusammen vier Acts' },
      { type: 'text', selector: 'ul ul li', expected: 'Neonpuls', label: 'Neonpuls steht in der Hauptbühnen-Liste' },
      { type: 'text', selector: 'ul > li:last-child > ul > li:first-child', expected: 'Kiki Volt', label: 'Kiki Volt eröffnet die Zeltbühne' },
    ],
    aendern: {
      html: [`    <ul>
      <li>Neonpuls</li>
      <li>Basslager</li>
      <li>Kiki Volt</li>
      <li>Die Kabelträger</li>
    </ul>
`, `    <ul>
      <li>Hauptbühne
        <ul>
          <li>Neonpuls</li>
          <li>Basslager</li>
        </ul>
      </li>
      <li>Zeltbühne
        <ul>
          <li>Kiki Volt</li>
          <li>Die Kabelträger</li>
        </ul>
      </li>
    </ul>
`],
    },
  });
  etappe({
    id: '04-listen/04-wiederholung',
    page: 'index',
    titel: 'Die Foodtruck-Liste',
    task: '**Ergänze** unter dem Foodtrucks-Absatz eine Aufzählungsliste mit vier Trucks: „Pizza & Mehr“, „Döner-Ecke“, „Bubble Tea Bar“, „Waffelwagen“ – der erste Eintrag beginnt mit dem stark betonten Wort „Neu:“ und dann dem Namen.',
    hints: ['Das &-Zeichen schreibst du im HTML als Entity, sonst wird es falsch gelesen.', 'Die Betonung liegt nur um „Neu:“, der Name folgt normal im selben Listenpunkt.'],
    tests: [
      { type: 'selector', selector: 'h2:nth-of-type(4) + p + ul > li', count: 4, label: 'Unter dem Foodtruck-Absatz steht eine Liste mit vier Trucks' },
      { type: 'text', selector: 'h2:nth-of-type(4) + p + ul > li:first-child strong', expected: 'Neu:', label: '„Neu:“ ist stark betont' },
      { type: 'text', selector: 'h2:nth-of-type(4) + p + ul > li:first-child', expected: 'Neu: Pizza & Mehr', label: 'Der erste Truck ist „Pizza & Mehr“' },
      { type: 'text', selector: 'h2:nth-of-type(4) + p + ul > li:last-child', expected: 'Waffelwagen', label: 'Der letzte Truck ist der Waffelwagen' },
      { type: 'selector', selector: 'ul ul li', count: 4, label: 'Das Line-up ist unverändert' },
    ],
    aendern: {
      html: ['    <p>Pizza, Döner, Bubble Tea und Waffeln – <em>alles</em> auf dem Gelände.</p>\n', `    <p>Pizza, Döner, Bubble Tea und Waffeln – <em>alles</em> auf dem Gelände.</p>
    <ul>
      <li><strong>Neu:</strong> Pizza &amp; Mehr</li>
      <li>Döner-Ecke</li>
      <li>Bubble Tea Bar</li>
      <li>Waffelwagen</li>
    </ul>
`],
    },
  });
  etappe({
    id: '04-listen/05-projekt-lineup',
    page: 'index',
    titel: 'Meilenstein: Line-up komplett',
    task: '**Erweitere** das Line-up: Die Zeltbühne bekommt als dritten Act „Lou & die Lichter“. **Ergänze** in der Anfahrt einen vierten Schritt „Feiern“.',
    hints: ['Der neue Act ist ein weiterer Listenpunkt in der inneren Liste der Zeltbühne.', 'Das &-Zeichen wieder als Entity.', 'Der vierte Schritt kommt ans Ende der nummerierten Liste.'],
    tests: [
      { type: 'selector', selector: 'ul ul li', count: 5, label: 'Das Line-up hat jetzt fünf Acts' },
      { type: 'text', selector: 'ul > li:last-child > ul > li:last-child', expected: 'Lou & die Lichter', label: '„Lou & die Lichter“ schließt die Zeltbühne ab' },
      { type: 'selector', selector: 'ol > li', count: 4, label: 'Die Anfahrt hat vier Schritte' },
      { type: 'text', selector: 'ol > li:last-child', expected: 'Feiern', label: 'Der vierte Schritt ist „Feiern“' },
    ],
    aendern: {
      html: (h) => h
        .replace('          <li>Die Kabelträger</li>\n        </ul>', '          <li>Die Kabelträger</li>\n          <li>Lou &amp; die Lichter</li>\n        </ul>')
        .replace('      <li>Ticket am Einlass zeigen</li>\n    </ol>', '      <li>Ticket am Einlass zeigen</li>\n      <li>Feiern</li>\n    </ol>'),
    },
  });

  /* ================= Kapitel 05 – Wegweiser (index) ================= */
  etappe({
    id: '05-links/01-externe-links',
    page: 'index',
    titel: 'Link zum Fahrplan',
    task: '**Ergänze** unter der Anfahrts-Liste einen Absatz mit einem Link: Der Linktext lautet „Fahrplan der Stadtbahn“ und führt zur Adresse `https://www.example.com`.',
    hints: ['Ein Link braucht das Attribut mit der Zieladresse; der sichtbare Text steht zwischen den Tags.', 'Der Link liegt in einem eigenen Absatz direkt nach der nummerierten Liste.'],
    tests: [
      { type: 'attr', selector: 'ol + p a', attr: 'href', expected: 'https://www.example.com', label: 'Der Link zeigt auf https://www.example.com' },
      { type: 'text', selector: 'ol + p a', expected: 'Fahrplan der Stadtbahn', label: 'Der Linktext lautet „Fahrplan der Stadtbahn“' },
    ],
    aendern: { html: ['      <li>Feiern</li>\n    </ol>\n', '      <li>Feiern</li>\n    </ol>\n    <p><a href="https://www.example.com">Fahrplan der Stadtbahn</a></p>\n'] },
  });
  etappe({
    id: '05-links/02-interne-links-und-sprungmarken',
    page: 'index',
    titel: 'Navigation und Sprungmarke',
    task: '**Erstelle** direkt unter der Hauptüberschrift eine Linkzeile (ein Absatz) mit drei Links zu den eigenen Seiten: „Programm“ → programm.html, „Galerie“ → galerie.html, „Tickets“ → tickets.html. **Ergänze** außerdem: Die Line-up-Überschrift bekommt die id `lineup`, und unter der Linkzeile kommt ein Absatz mit dem Sprungmarken-Link „Direkt zum Line-up“.',
    hints: ['Eigene Seiten verlinkst du nur mit dem Dateinamen, ohne https.', 'Eine Sprungmarke braucht zwei Dinge: eine id am Ziel und einen Link, dessen Adresse mit # und der id beginnt.', 'Die Linkzeile ist ein Absatz mit drei Links, z. B. getrennt durch ·.'],
    tests: [
      { type: 'attr', selector: 'h1 + p a', attr: 'href', expected: 'programm.html', label: 'Der erste Link führt zu programm.html' },
      { type: 'selector', selector: 'a[href="galerie.html"]', label: 'Es gibt einen Link zu galerie.html' },
      { type: 'selector', selector: 'a[href="tickets.html"]', label: 'Es gibt einen Link zu tickets.html' },
      { type: 'selector', selector: 'h2#lineup', label: 'Die Line-up-Überschrift hat die id „lineup“' },
      { type: 'text', selector: 'a[href="#lineup"]', expected: 'Direkt zum Line-up', label: 'Der Sprungmarken-Link „Direkt zum Line-up“ ist da' },
      { type: 'order', selectors: ['h1', 'a[href="programm.html"]', 'a[href="#lineup"]', 'p:nth-of-type(3)'], label: 'Linkzeile und Sprungmarke stehen direkt unter der Überschrift' },
    ],
    aendern: {
      html: (h) => h
        .replace('    <h1>FUNKEN</h1>\n', `    <h1>FUNKEN</h1>
    <p>
      <a href="programm.html">Programm</a> ·
      <a href="galerie.html">Galerie</a> ·
      <a href="tickets.html">Tickets</a>
    </p>
    <p><a href="#lineup">Direkt zum Line-up</a></p>
`)
        .replace('    <h2>Line-up</h2>', '    <h2 id="lineup">Line-up</h2>'),
    },
  });
  etappe({
    id: '05-links/03-mailto-und-neuer-tab',
    page: 'index',
    titel: 'E-Mail-Link und neuer Tab',
    task: '**Erweitere** die Links: Der Fahrplan-Link öffnet in einem neuen Tab. Im Adress-Absatz nach der Trennlinie kommt nach einem weiteren Zeilenumbruch ein E-Mail-Link mit dem Text hallo@funken-festival-beispiel.de, der ein Mailprogramm öffnet.',
    hints: ['Für einen neuen Tab bekommt der Link ein zusätzliches Attribut mit dem Wert _blank.', 'Ein E-Mail-Link beginnt in der Adresse mit mailto: – der sichtbare Text ist die Adresse selbst.', 'Der Mail-Link steht in der Adresszeile nach 74072 Heilbronn, mit einem Zeilenumbruch davor.'],
    tests: [
      { type: 'attr', selector: 'a[href="https://www.example.com"]', attr: 'target', expected: '_blank', label: 'Der Fahrplan-Link öffnet in einem neuen Tab' },
      { type: 'attr', selector: 'hr + p a', attr: 'href', expected: 'mailto:hallo@funken-festival-beispiel.de', label: 'Der E-Mail-Link öffnet das Mailprogramm' },
      { type: 'text', selector: 'hr + p a', expected: 'hallo@funken-festival-beispiel.de', label: 'Der Linktext ist die E-Mail-Adresse' },
      { type: 'selector', selector: 'hr + p br', count: 3, label: 'Die Adresse hat drei Zeilenumbrüche' },
    ],
    aendern: {
      html: (h) => h
        .replace('<a href="https://www.example.com">Fahrplan der Stadtbahn</a>', '<a href="https://www.example.com" target="_blank">Fahrplan der Stadtbahn</a>')
        .replace('<p>Kollektiv FUNKEN<br>Hafenstraße 9<br>74072 Heilbronn</p>', '<p>Kollektiv FUNKEN<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="mailto:hallo@funken-festival-beispiel.de">hallo@funken-festival-beispiel.de</a></p>'),
    },
  });
  etappe({
    id: '05-links/04-wiederholung',
    page: 'index',
    titel: 'Abschnitt „Mehr“ mit Linkliste',
    task: '**Erstelle** vor dem Kontakt-Kommentar den Abschnitt „Mehr“ (Zwischenüberschrift) mit einer Aufzählungsliste aus zwei Links: „Unsere Schule“ → `https://www.example.com/schule` in einem neuen Tab, und „Fotos vom letzten Jahr“ → galerie.html.',
    hints: ['Liste plus Links: Jeder Listenpunkt enthält genau einen Link.', 'Nur der externe Link bekommt das Attribut für den neuen Tab.'],
    tests: [
      { type: 'text', selector: 'h2', expected: 'Mehr', any: true, label: 'Die Überschrift „Mehr“ ist da' },
      { type: 'attr', selector: 'a[href="https://www.example.com/schule"]', attr: 'target', expected: '_blank', label: '„Unsere Schule“ öffnet in einem neuen Tab' },
      { type: 'text', selector: 'a[href="https://www.example.com/schule"]', expected: 'Unsere Schule', label: 'Der Linktext lautet „Unsere Schule“' },
      { type: 'text', selector: 'li a[href="galerie.html"]', expected: 'Fotos vom letzten Jahr', label: 'Der zweite Link führt zur Galerie' },
      { type: 'selector', selector: 'li > a[href="https://www.example.com/schule"], li > a[href="galerie.html"]', count: 2, label: 'Beide Links stehen in Listenpunkten' },
    ],
    aendern: {
      html: ['    <!-- Kontakt -->\n', `    <h2>Mehr</h2>
    <ul>
      <li><a href="https://www.example.com/schule" target="_blank">Unsere Schule</a></li>
      <li><a href="galerie.html">Fotos vom letzten Jahr</a></li>
    </ul>

    <!-- Kontakt -->
`],
    },
  });
  etappe({
    id: '05-links/05-projekt-navigation',
    page: 'index',
    titel: 'Meilenstein: Nach oben',
    task: '**Erweitere** die Navigation: Die Hauptüberschrift bekommt die id `oben`. Vor dem Kontakt-Kommentar kommt ein Absatz mit dem Sprungmarken-Link „Nach oben“, der zur Hauptüberschrift springt. **Überprüfe**, dass alle drei Seiten-Links noch da sind.',
    hints: ['Ziel-id an der h1, Link mit # davor.', 'Der Absatz mit „Nach oben“ kommt nach der „Mehr“-Liste.'],
    tests: [
      { type: 'selector', selector: 'h1#oben', label: 'Die Hauptüberschrift hat die id „oben“' },
      { type: 'text', selector: 'a[href="#oben"]', expected: 'Nach oben', label: 'Der Link „Nach oben“ springt zur Überschrift' },
      { type: 'order', selectors: ['h2:last-of-type', 'a[href="#oben"]', 'hr'], label: 'Der Link steht nach „Mehr“ und vor der Trennlinie' },
      { type: 'selector', selector: 'a[href="programm.html"], a[href="galerie.html"], a[href="tickets.html"]', min: 3, label: 'Die Seiten-Links sind noch da' },
    ],
    aendern: {
      html: (h) => h
        .replace('    <h1>FUNKEN</h1>', '    <h1 id="oben">FUNKEN</h1>')
        .replace('    <!-- Kontakt -->\n', '    <p><a href="#oben">Nach oben</a></p>\n\n    <!-- Kontakt -->\n'),
    },
  });

  /* ================= Kapitel 06 – Foto-Wand (index, galerie) ================= */
  etappe({
    id: '06-bilder-und-medien/01-bilder',
    page: 'index',
    titel: 'Das Bühnenfoto',
    task: '**Ergänze** direkt unter dem Willkommens-Absatz („Das Schülerfestival Heilbronn …“) ein Bild aus der Datei buehne.svg mit dem Alternativtext „Die Hauptbühne von FUNKEN bei Nacht“.',
    hints: ['Ein Bild ist ein Leerelement mit zwei Attributen: Quelle und Alternativtext.', 'Die Quelle ist nur der Dateiname, weil das Bild im selben Ordner liegt.'],
    tests: [
      { type: 'attr', selector: 'img', attr: 'src', expected: 'buehne.svg', label: 'Das Bild lädt buehne.svg' },
      { type: 'attr', selector: 'img', attr: 'alt', expected: 'Die Hauptbühne von FUNKEN bei Nacht', label: 'Der Alternativtext stimmt' },
      { type: 'order', selectors: ['p:nth-of-type(3)', 'img', 'p:nth-of-type(4)'], label: 'Das Bild steht direkt unter dem Willkommens-Absatz' },
    ],
    aendern: { html: ['Open Air am Neckar.</p>\n', 'Open Air am Neckar.</p>\n    <img src="buehne.svg" alt="Die Hauptbühne von FUNKEN bei Nacht">\n'] },
  });
  etappe({
    id: '06-bilder-und-medien/02-audio-und-video',
    page: 'galerie',
    titel: 'Neue Seite: Galerie mit Jingle und Aftermovie',
    task: '**Erstelle** die Galerie-Seite: komplettes Grundgerüst (Deutsch, UTF-8, Titel „Galerie – FUNKEN“), Hauptüberschrift „Galerie“, dann der Abschnitt „Der FUNKEN-Jingle“ mit einem Audio-Player für die Datei jingle.wav und der Abschnitt „Aftermovie“ mit einem Video-Player für clip.webm, beide mit Bedienelementen.',
    hints: ['Grundgerüst wie bei der Startseite – nur Titel und Inhalt sind anders.', 'Audio und Video brauchen die Quelle und das Attribut für die Bedienelemente (controls), sonst sieht man nichts.', 'Reihenfolge im body: h1, h2 Jingle + Audio, h2 Aftermovie + Video.'],
    tests: [
      { type: 'text', selector: 'title', expected: 'Galerie – FUNKEN', label: 'Der Titel lautet „Galerie – FUNKEN“' },
      { type: 'attr', selector: 'html', attr: 'lang', expected: 'de', label: 'Grundgerüst mit lang="de"' },
      { type: 'text', selector: 'h1', expected: 'Galerie', label: 'Die Hauptüberschrift lautet „Galerie“' },
      { type: 'text', selector: 'h2', expected: 'Der FUNKEN-Jingle', label: 'Die erste Zwischenüberschrift ist „Der FUNKEN-Jingle“' },
      { type: 'attr', selector: 'audio', attr: 'src', expected: 'jingle.wav', label: 'Der Audio-Player lädt jingle.wav' },
      { type: 'attr', selector: 'audio', attr: 'controls', present: true, label: 'Der Audio-Player hat Bedienelemente' },
      { type: 'attr', selector: 'video', attr: 'src', expected: 'clip.webm', label: 'Der Video-Player lädt clip.webm' },
      { type: 'attr', selector: 'video', attr: 'controls', present: true, label: 'Der Video-Player hat Bedienelemente' },
    ],
    aendern: {
      html: () => `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Galerie – FUNKEN</title>
  </head>
  <body>
    <h1>Galerie</h1>

    <h2>Der FUNKEN-Jingle</h2>
    <audio controls src="jingle.wav"></audio>

    <h2>Aftermovie</h2>
    <video controls src="clip.webm" width="320"></video>
  </body>
</html>
`,
    },
    starter: { html: '<!-- Galerie von FUNKEN -->\n' },
  });
  etappe({
    id: '06-bilder-und-medien/03-figure-und-bildunterschrift',
    page: 'galerie',
    titel: 'Bild mit Unterschrift und Rück-Link',
    task: '**Ergänze** auf der Galerie-Seite unter der Hauptüberschrift einen Absatz mit dem Link „Zurück zur Startseite“ (→ index.html). **Erstelle** danach den Abschnitt „Eindrücke“ mit einem Bild-Block: das Bild crowd.svg (Alternativtext „Die Menge vor der Hauptbühne“) mit der Bildunterschrift „Die Menge vor der Hauptbühne“.',
    hints: ['Bild und Unterschrift gehören zusammen in ein figure-Element; die Unterschrift ist ein eigenes Element darin.', 'Der Abschnitt „Eindrücke“ kommt vor dem Jingle-Abschnitt.'],
    tests: [
      { type: 'attr', selector: 'h1 + p a', attr: 'href', expected: 'index.html', label: 'Der Rück-Link führt zur Startseite' },
      { type: 'text', selector: 'h2', expected: 'Eindrücke', label: 'Die erste Zwischenüberschrift ist jetzt „Eindrücke“' },
      { type: 'attr', selector: 'figure img', attr: 'src', expected: 'crowd.svg', label: 'Im Bild-Block liegt crowd.svg' },
      { type: 'attr', selector: 'figure img', attr: 'alt', expected: 'Die Menge vor der Hauptbühne', label: 'Der Alternativtext stimmt' },
      { type: 'text', selector: 'figure figcaption', expected: 'Die Menge vor der Hauptbühne', label: 'Die Bildunterschrift stimmt' },
      { type: 'order', selectors: ['figure', 'audio'], label: '„Eindrücke“ steht vor dem Jingle' },
    ],
    aendern: {
      html: ['    <h1>Galerie</h1>\n', `    <h1>Galerie</h1>
    <p><a href="index.html">Zurück zur Startseite</a></p>

    <h2>Eindrücke</h2>
    <figure>
      <img src="crowd.svg" alt="Die Menge vor der Hauptbühne">
      <figcaption>Die Menge vor der Hauptbühne</figcaption>
    </figure>
`],
    },
  });
  etappe({
    id: '06-bilder-und-medien/04-wiederholung',
    page: 'galerie',
    titel: 'Foodtrucks in der Galerie',
    task: '**Erstelle** nach dem Bild-Block den Abschnitt „Foodtrucks“ mit dem Bild foodtruck.svg (Alternativtext „Der Pizza-Truck am Abend“) und darunter einer Aufzählungsliste mit zwei Links: „Pizza & Mehr“ und „Waffelwagen“ – beide führen zur Startseite (index.html).',
    hints: ['Bild + Liste + Links – alles bekannt: Bild-Element, ungeordnete Liste, Links in Listenpunkten.', 'Das &-Zeichen als Entity nicht vergessen.'],
    tests: [
      { type: 'text', selector: 'h2:nth-of-type(2)', expected: 'Foodtrucks', label: 'Der zweite Abschnitt heißt „Foodtrucks“' },
      { type: 'attr', selector: 'h2:nth-of-type(2) + img', attr: 'alt', expected: 'Der Pizza-Truck am Abend', label: 'Das Foodtruck-Bild hat den Alternativtext' },
      { type: 'selector', selector: 'ul > li > a[href="index.html"]', count: 2, label: 'Zwei Listenpunkte verlinken zur Startseite' },
      { type: 'text', selector: 'ul > li:first-child a', expected: 'Pizza & Mehr', label: 'Der erste Link heißt „Pizza & Mehr“' },
      { type: 'selector', selector: 'figure figcaption', label: 'Der Bild-Block von vorhin ist noch da' },
    ],
    aendern: {
      html: ['    </figure>\n', `    </figure>

    <h2>Foodtrucks</h2>
    <img src="foodtruck.svg" alt="Der Pizza-Truck am Abend">
    <ul>
      <li><a href="index.html">Pizza &amp; Mehr</a></li>
      <li><a href="index.html">Waffelwagen</a></li>
    </ul>
`],
    },
  });
  etappe({
    id: '06-bilder-und-medien/05-projekt-galerie',
    page: 'galerie',
    titel: 'Meilenstein: Galerie komplett',
    task: '**Erweitere** die Galerie: Im Abschnitt „Eindrücke“ kommt ein zweiter Bild-Block mit plakat.svg (Alternativtext „Das Plakat 2027“) und der Unterschrift „Das Plakat 2027“. Am Ende der Seite kommt der Abschnitt „Rundgang“ mit einer nummerierten Liste: Einlass, Hauptbühne, Zeltbühne, Foodcourt.',
    hints: ['Zweiter figure-Block direkt nach dem ersten.', 'Der Rundgang ist eine geordnete Liste mit vier Punkten, nach dem Aftermovie.'],
    tests: [
      { type: 'selector', selector: 'figure', count: 2, label: 'Es gibt zwei Bild-Blöcke' },
      { type: 'text', selector: 'figure:nth-of-type(2) figcaption', expected: 'Das Plakat 2027', label: 'Der zweite Block zeigt das Plakat' },
      { type: 'attr', selector: 'figure:nth-of-type(2) img', attr: 'src', expected: 'plakat.svg', label: 'Das Plakat-Bild lädt plakat.svg' },
      { type: 'text', selector: 'h2:last-of-type', expected: 'Rundgang', label: 'Der letzte Abschnitt heißt „Rundgang“' },
      { type: 'selector', selector: 'ol > li', count: 4, label: 'Der Rundgang hat vier Stationen' },
      { type: 'text', selector: 'ol > li:last-child', expected: 'Foodcourt', label: 'Die letzte Station ist der Foodcourt' },
    ],
    aendern: {
      html: (h) => h
        .replace('      <figcaption>Die Menge vor der Hauptbühne</figcaption>\n    </figure>\n', `      <figcaption>Die Menge vor der Hauptbühne</figcaption>
    </figure>
    <figure>
      <img src="plakat.svg" alt="Das Plakat 2027">
      <figcaption>Das Plakat 2027</figcaption>
    </figure>
`)
        .replace('    <video controls src="clip.webm" width="320"></video>\n', `    <video controls src="clip.webm" width="320"></video>

    <h2>Rundgang</h2>
    <ol>
      <li>Einlass</li>
      <li>Hauptbühne</li>
      <li>Zeltbühne</li>
      <li>Foodcourt</li>
    </ol>
`),
    },
  });

  /* ================= Kapitel 07 – Timetable (index, programm) ================= */
  etappe({
    id: '07-tabellen/01-tabellen-aufbau',
    page: 'index',
    titel: 'Auf einen Blick',
    task: '**Erstelle** auf der Startseite zwischen „Das Festival“ und „Die Bühnen“ den Abschnitt „Auf einen Blick“ mit einer Tabelle aus drei Zeilen und je zwei Zellen: Wann | Fr 17. + Sa 18. Juli 2027 · Wo | Altes Fabrikgelände am Neckar · Einlass | 16:00 Uhr.',
    hints: ['Eine Tabelle besteht aus Zeilen, jede Zeile aus Zellen.', 'Erst das Tabellen-Element, darin drei Zeilen, in jeder Zeile zwei Datenzellen.', 'Der Abschnitt kommt nach dem Erlös-Absatz, vor „Die Bühnen“.'],
    tests: [
      { type: 'text', selector: 'h2:nth-of-type(2)', expected: 'Auf einen Blick', label: 'Der zweite Abschnitt heißt „Auf einen Blick“' },
      { type: 'selector', selector: 'table tr', count: 3, label: 'Die Tabelle hat drei Zeilen' },
      { type: 'selector', selector: 'table td', count: 6, label: 'Die Tabelle hat sechs Zellen' },
      { type: 'text', selector: 'table tr:first-child td:first-child', expected: 'Wann', label: 'Die erste Zelle lautet „Wann“' },
      { type: 'text', selector: 'table tr:last-child td:last-child', expected: '16:00 Uhr', label: 'Die letzte Zelle lautet „16:00 Uhr“' },
    ],
    aendern: {
      html: ['    <p>Der Erlös geht an Projekte unserer Schulen.</p>\n', `    <p>Der Erlös geht an Projekte unserer Schulen.</p>

    <h2>Auf einen Blick</h2>
    <table>
      <tr>
        <td>Wann</td>
        <td>Fr 17. + Sa 18. Juli 2027</td>
      </tr>
      <tr>
        <td>Wo</td>
        <td>Altes Fabrikgelände am Neckar</td>
      </tr>
      <tr>
        <td>Einlass</td>
        <td>16:00 Uhr</td>
      </tr>
    </table>
`],
    },
  });
  etappe({
    id: '07-tabellen/02-kopfzeile',
    page: 'programm',
    titel: 'Neue Seite: Programm mit Timetable',
    task: '**Erstelle** die Programm-Seite: Grundgerüst (Deutsch, UTF-8, Titel „Programm – FUNKEN“), Hauptüberschrift „Programm“, Rück-Link „Zurück zur Startseite“, dann der Abschnitt „Freitag“ mit einer Tabelle: Kopfzeile Zeit | Hauptbühne | Zeltbühne und drei Zeilen: 17:00 | Neonpuls | Kiki Volt · 19:00 | Basslager | Die Kabelträger · 21:00 | Neonpuls | Lou & die Lichter.',
    hints: ['Kopfzellen sind ein eigenes Element – der Browser stellt sie fett dar.', 'Erste Zeile = drei Kopfzellen, danach drei Zeilen mit je drei Datenzellen.', 'Das &-Zeichen im Bandnamen als Entity.'],
    tests: [
      { type: 'text', selector: 'title', expected: 'Programm – FUNKEN', label: 'Der Titel lautet „Programm – FUNKEN“' },
      { type: 'text', selector: 'h1', expected: 'Programm', label: 'Die Hauptüberschrift lautet „Programm“' },
      { type: 'attr', selector: 'h1 + p a', attr: 'href', expected: 'index.html', label: 'Der Rück-Link führt zur Startseite' },
      { type: 'text', selector: 'h2', expected: 'Freitag', label: 'Der Abschnitt heißt „Freitag“' },
      { type: 'selector', selector: 'table tr:first-child th', count: 3, label: 'Die Kopfzeile hat drei Kopfzellen' },
      { type: 'text', selector: 'th:nth-child(2)', expected: 'Hauptbühne', label: 'Die zweite Kopfzelle lautet „Hauptbühne“' },
      { type: 'selector', selector: 'table tr', count: 4, label: 'Die Tabelle hat vier Zeilen' },
      { type: 'text', selector: 'tr:last-child td:last-child', expected: 'Lou & die Lichter', label: 'Um 21:00 spielen Lou & die Lichter im Zelt' },
    ],
    aendern: {
      html: () => `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Programm – FUNKEN</title>
  </head>
  <body>
    <h1>Programm</h1>
    <p><a href="index.html">Zurück zur Startseite</a></p>

    <h2>Freitag</h2>
    <table>
      <tr>
        <th>Zeit</th>
        <th>Hauptbühne</th>
        <th>Zeltbühne</th>
      </tr>
      <tr>
        <td>17:00</td>
        <td>Neonpuls</td>
        <td>Kiki Volt</td>
      </tr>
      <tr>
        <td>19:00</td>
        <td>Basslager</td>
        <td>Die Kabelträger</td>
      </tr>
      <tr>
        <td>21:00</td>
        <td>Neonpuls</td>
        <td>Lou &amp; die Lichter</td>
      </tr>
    </table>
  </body>
</html>
`,
    },
    starter: { html: '<!-- Programm von FUNKEN -->\n' },
  });
  etappe({
    id: '07-tabellen/03-verbundene-zellen',
    page: 'programm',
    titel: 'Samstag mit Pause',
    task: '**Erstelle** unter der Freitags-Tabelle den Abschnitt „Samstag“ mit einer Tabelle: Kopfzeile Zeit | Hauptbühne | Zeltbühne, dann 16:00 | Marla Funke | Sektor 7, dann eine Zeile 18:00 mit einer über beide Bühnen verbundenen Zelle „Pause – Foodtrucks öffnen“, dann 20:00 | Basslager | Freitag-Frei.',
    hints: ['Eine Zelle über zwei Spalten braucht das Attribut, das Spalten verbindet, mit dem Wert 2.', 'Die Pausen-Zeile hat nur zwei Zellen: die Zeit und die verbundene Zelle.'],
    tests: [
      { type: 'text', selector: 'h2:nth-of-type(2)', expected: 'Samstag', label: 'Der zweite Abschnitt heißt „Samstag“' },
      { type: 'selector', selector: 'table:nth-of-type(2) tr', count: 4, label: 'Die Samstags-Tabelle hat vier Zeilen' },
      { type: 'attr', selector: 'table:nth-of-type(2) td[colspan]', attr: 'colspan', expected: '2', label: 'Die Pausen-Zelle geht über zwei Spalten' },
      { type: 'text', selector: 'table:nth-of-type(2) td[colspan]', expected: 'Pause – Foodtrucks öffnen', label: 'Die verbundene Zelle heißt „Pause – Foodtrucks öffnen“' },
      { type: 'selector', selector: 'table:nth-of-type(2) tr:nth-child(3) td', count: 2, label: 'Die Pausen-Zeile hat nur zwei Zellen' },
      { type: 'selector', selector: 'table:nth-of-type(1) tr', count: 4, label: 'Die Freitags-Tabelle ist unverändert' },
    ],
    aendern: {
      html: ['        <td>Lou &amp; die Lichter</td>\n      </tr>\n    </table>\n', `        <td>Lou &amp; die Lichter</td>
      </tr>
    </table>

    <h2>Samstag</h2>
    <table>
      <tr>
        <th>Zeit</th>
        <th>Hauptbühne</th>
        <th>Zeltbühne</th>
      </tr>
      <tr>
        <td>16:00</td>
        <td>Marla Funke</td>
        <td>Sektor 7</td>
      </tr>
      <tr>
        <td>18:00</td>
        <td colspan="2">Pause – Foodtrucks öffnen</td>
      </tr>
      <tr>
        <td>20:00</td>
        <td>Basslager</td>
        <td>Freitag-Frei</td>
      </tr>
    </table>
`],
    },
  });
  etappe({
    id: '07-tabellen/04-wiederholung',
    page: 'programm',
    titel: 'Foodcourt-Tabelle mit Bild',
    task: '**Erstelle** am Ende der Programm-Seite den Abschnitt „Foodcourt“: zuerst das Bild foodtruck.svg (Alternativtext „Foodtrucks auf dem Gelände“), darunter eine Tabelle mit Kopfzeile Truck | Highlight und drei Zeilen: Pizza & Mehr | Margherita · Döner-Ecke | Dürüm · Waffelwagen | Waffel mit Kirschen. Unter der Tabelle ein Absatz mit einem Link „Alle Trucks auf der Startseite“ → index.html.',
    hints: ['Bild, Tabelle mit Kopfzeile, Link – alles schon gebaut; hier kombinierst du es.', 'Reihenfolge: h2, img, table, p mit Link.'],
    tests: [
      { type: 'text', selector: 'h2:nth-of-type(3)', expected: 'Foodcourt', label: 'Der dritte Abschnitt heißt „Foodcourt“' },
      { type: 'attr', selector: 'h2:nth-of-type(3) + img', attr: 'alt', expected: 'Foodtrucks auf dem Gelände', label: 'Das Bild hat den Alternativtext' },
      { type: 'selector', selector: 'table:nth-of-type(3) th', count: 2, label: 'Die Foodcourt-Tabelle hat zwei Kopfzellen' },
      { type: 'selector', selector: 'table:nth-of-type(3) tr', count: 4, label: 'Die Foodcourt-Tabelle hat vier Zeilen' },
      { type: 'text', selector: 'table:nth-of-type(3) tr:nth-child(2) td:first-child', expected: 'Pizza & Mehr', label: 'Erster Truck: Pizza & Mehr' },
      { type: 'text', selector: 'table:nth-of-type(3) + p a[href="index.html"]', expected: 'Alle Trucks auf der Startseite', label: 'Der Link unter der Tabelle führt zur Startseite' },
    ],
    aendern: {
      html: ['        <td>Freitag-Frei</td>\n      </tr>\n    </table>\n', `        <td>Freitag-Frei</td>
      </tr>
    </table>

    <h2>Foodcourt</h2>
    <img src="foodtruck.svg" alt="Foodtrucks auf dem Gelände">
    <table>
      <tr>
        <th>Truck</th>
        <th>Highlight</th>
      </tr>
      <tr>
        <td>Pizza &amp; Mehr</td>
        <td>Margherita</td>
      </tr>
      <tr>
        <td>Döner-Ecke</td>
        <td>Dürüm</td>
      </tr>
      <tr>
        <td>Waffelwagen</td>
        <td>Waffel mit Kirschen</td>
      </tr>
    </table>
    <p><a href="index.html">Alle Trucks auf der Startseite</a></p>
`],
    },
  });
  etappe({
    id: '07-tabellen/05-projekt-timetable',
    page: 'index',
    titel: 'Meilenstein: Kopfzeile auf der Startseite',
    task: '**Erweitere** die Tabelle „Auf einen Blick“ auf der Startseite: Sie bekommt als erste Zeile eine Kopfzeile mit den Kopfzellen „Was“ und „Info“ und als letzte Zeile „Ende | 23:00 Uhr“.',
    hints: ['Die Kopfzeile ist eine normale Zeile mit Kopfzellen statt Datenzellen – ganz oben.', 'Die neue Datenzeile kommt vor dem schließenden Tabellen-Tag.'],
    tests: [
      { type: 'selector', selector: 'table tr', count: 5, label: 'Die Tabelle hat fünf Zeilen' },
      { type: 'text', selector: 'table tr:first-child th:first-child', expected: 'Was', label: 'Die erste Kopfzelle lautet „Was“' },
      { type: 'text', selector: 'table tr:first-child th:last-child', expected: 'Info', label: 'Die zweite Kopfzelle lautet „Info“' },
      { type: 'text', selector: 'table tr:last-child td:last-child', expected: '23:00 Uhr', label: 'Die letzte Zeile nennt das Ende' },
      { type: 'selector', selector: 'table td', count: 8, label: 'Es gibt acht Datenzellen' },
    ],
    aendern: {
      html: (h) => h
        .replace('    <table>\n      <tr>\n        <td>Wann</td>', '    <table>\n      <tr>\n        <th>Was</th>\n        <th>Info</th>\n      </tr>\n      <tr>\n        <td>Wann</td>')
        .replace('        <td>16:00 Uhr</td>\n      </tr>\n    </table>', '        <td>16:00 Uhr</td>\n      </tr>\n      <tr>\n        <td>Ende</td>\n        <td>23:00 Uhr</td>\n      </tr>\n    </table>'),
    },
  });

  /* ================= Kapitel 08 – Zonen (index, programm, galerie) ================= */
  etappe({
    id: '08-struktur-und-attribute/01-class-und-id',
    page: 'index',
    titel: 'Klasse und id vergeben',
    task: '**Ergänze** auf der Startseite: Der Absatz „Einlass ab 16:00 Uhr, Ende 23:00 Uhr.“ bekommt die Klasse `hinweis`, die Überschrift „So kommst du hin“ die id `anfahrt`.',
    hints: ['Klasse und id sind Attribute im öffnenden Tag.', 'Mehrere Elemente dürfen dieselbe Klasse haben, eine id gibt es nur einmal pro Seite.'],
    tests: [
      { type: 'text', selector: 'p.hinweis', expected: 'Einlass ab 16:00 Uhr, Ende 23:00 Uhr.', label: 'Der Einlass-Absatz hat die Klasse „hinweis“' },
      { type: 'text', selector: 'h2#anfahrt', expected: 'So kommst du hin', label: 'Die Anfahrts-Überschrift hat die id „anfahrt“' },
      { type: 'selector', selector: 'h2#lineup', label: 'Die id „lineup“ ist noch da' },
    ],
    aendern: {
      html: (h) => h
        .replace('<p>Einlass ab 16:00 Uhr, Ende 23:00 Uhr.</p>', '<p class="hinweis">Einlass ab 16:00 Uhr, Ende 23:00 Uhr.</p>')
        .replace('<h2>So kommst du hin</h2>', '<h2 id="anfahrt">So kommst du hin</h2>'),
    },
  });
  etappe({
    id: '08-struktur-und-attribute/02-div-und-span',
    page: 'index',
    titel: 'Foodtruck-Bereich gruppieren',
    task: '**Gruppiere** den Foodtrucks-Abschnitt (Überschrift, Absatz und Liste) in einem Container-Element mit der Klasse `foodtrucks`. **Ergänze** im Foodtruck-Absatz ganz vorn den Text „Neu 2027:“ in einem Inline-Element mit der Klasse `neu`.',
    hints: ['Der Container ist das Block-Element ohne eigene Bedeutung; er umschließt die drei Teile.', 'Für ein Stück Text innerhalb eines Absatzes nimmst du das Inline-Gegenstück.'],
    tests: [
      { type: 'selector', selector: 'div.foodtrucks > h2', count: 1, label: 'Die Foodtrucks-Überschrift liegt im Container' },
      { type: 'selector', selector: 'div.foodtrucks > ul > li', count: 4, label: 'Die Truck-Liste liegt im Container' },
      { type: 'text', selector: 'div.foodtrucks p span.neu', expected: 'Neu 2027:', label: '„Neu 2027:“ steht in einem span mit der Klasse „neu“' },
      { type: 'text', selector: 'div.foodtrucks > p', expected: 'Neu 2027: Pizza, Döner, Bubble Tea und Waffeln – alles auf dem Gelände.', label: 'Der Absatz beginnt mit „Neu 2027:“' },
    ],
    aendern: {
      html: [`    <h2>Foodtrucks</h2>
    <p>Pizza, Döner, Bubble Tea und Waffeln – <em>alles</em> auf dem Gelände.</p>
    <ul>
      <li><strong>Neu:</strong> Pizza &amp; Mehr</li>
      <li>Döner-Ecke</li>
      <li>Bubble Tea Bar</li>
      <li>Waffelwagen</li>
    </ul>
`, `    <div class="foodtrucks">
      <h2>Foodtrucks</h2>
      <p><span class="neu">Neu 2027:</span> Pizza, Döner, Bubble Tea und Waffeln – <em>alles</em> auf dem Gelände.</p>
      <ul>
        <li><strong>Neu:</strong> Pizza &amp; Mehr</li>
        <li>Döner-Ecke</li>
        <li>Bubble Tea Bar</li>
        <li>Waffelwagen</li>
      </ul>
    </div>
`],
    },
  });
  etappe({
    id: '08-struktur-und-attribute/03-semantische-elemente',
    page: 'index',
    titel: 'Die Startseite bekommt Zonen',
    task: '**Strukturiere** die Startseite mit Bedeutung: Hauptüberschrift, Willkommens-Absatz und Bild in einen Kopfbereich; die Linkzeile und der Sprungmarken-Link in eine Navigation; alles vom Termin bis „Nach oben“ in den Hauptbereich; die Adresse in einen Fußbereich. Der Kontakt-Kommentar bleibt, die Trennlinie entfällt.',
    hints: ['Vier semantische Elemente: eins für den Kopf, eins für die Navigation, eins für den Hauptinhalt, eins für den Fuß.', 'Die Linkzeile war ein Absatz – in der Navigation reichen die Links selbst.', 'Reihenfolge im body: Kopf, Navigation, Hauptbereich, Fuß.'],
    tests: [
      { type: 'selector', selector: 'header > h1#oben', label: 'Die Hauptüberschrift liegt im Kopfbereich' },
      { type: 'selector', selector: 'header img', label: 'Das Bühnenfoto liegt im Kopfbereich' },
      { type: 'selector', selector: 'nav a', min: 4, label: 'Die Navigation enthält die Links' },
      { type: 'selector', selector: 'main h2', min: 6, label: 'Alle Abschnitte liegen im Hauptbereich' },
      { type: 'text', selector: 'footer p', expected: 'Kollektiv FUNKEN', contains: true, label: 'Die Adresse liegt im Fußbereich' },
      { type: 'selector', selector: 'hr', count: 0, label: 'Die Trennlinie ist weg' },
      { type: 'order', selectors: ['header', 'nav', 'main', 'footer'], label: 'Kopf, Navigation, Hauptbereich, Fuß – in dieser Reihenfolge' },
    ],
    aendern: {
      html: (h) => {
        const body = h.slice(h.indexOf('<body>') + 6, h.indexOf('</body>'));
        const kopf = `
    <!-- Startseite von FUNKEN -->
    <header>
      <h1 id="oben">FUNKEN</h1>
      <p>Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.</p>
      <img src="buehne.svg" alt="Die Hauptbühne von FUNKEN bei Nacht">
    </header>

    <nav>
      <a href="programm.html">Programm</a>
      <a href="galerie.html">Galerie</a>
      <a href="tickets.html">Tickets</a>
      <a href="#lineup">Direkt zum Line-up</a>
    </nav>

    <main>
`;
        const start = body.indexOf('    <p>Freitag, 17.');
        const ende = body.indexOf('    <!-- Kontakt -->');
        const mitte = body.slice(start, ende).replace(/^( *)(?=\S)/gm, '  $1');
        const fuss = `    </main>

    <footer>
      <p>Kollektiv FUNKEN<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="mailto:hallo@funken-festival-beispiel.de">hallo@funken-festival-beispiel.de</a></p>
    </footer>
`;
        return h.slice(0, h.indexOf('<body>') + 6) + kopf + mitte.replace(/\n\s*\n$/, '\n') + fuss + '  ' + h.slice(h.indexOf('</body>'));
      },
    },
  });
  etappe({
    id: '08-struktur-und-attribute/04-wiederholung',
    page: 'programm',
    titel: 'Zonen für die Programm-Seite',
    task: '**Strukturiere** die Programm-Seite: Hauptüberschrift in einen Kopfbereich, darunter eine Navigation mit vier Links (Startseite → index.html, Galerie → galerie.html, Tickets → tickets.html, Freitag → Sprungmarke `#freitag`), alle Abschnitte in den Hauptbereich, ein Fußbereich mit dem Absatz „Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn“. Die Freitags-Überschrift bekommt die id `freitag`. Der alte Rück-Link-Absatz entfällt.',
    hints: ['Gleiches Muster wie auf der Startseite: header, nav, main, footer.', 'Die Sprungmarke braucht die id an der Überschrift und den Link mit # davor.'],
    tests: [
      { type: 'selector', selector: 'header > h1', label: 'Die Hauptüberschrift liegt im Kopfbereich' },
      { type: 'selector', selector: 'nav a', count: 4, label: 'Die Navigation hat vier Links' },
      { type: 'attr', selector: 'nav a:first-child', attr: 'href', expected: 'index.html', label: 'Der erste Link führt zur Startseite' },
      { type: 'text', selector: 'nav a[href="#freitag"]', expected: 'Freitag', label: 'Der Sprungmarken-Link „Freitag“ ist da' },
      { type: 'selector', selector: 'main h2#freitag', label: 'Die Freitags-Überschrift hat die id „freitag“' },
      { type: 'selector', selector: 'main table', count: 3, label: 'Alle drei Tabellen liegen im Hauptbereich' },
      { type: 'text', selector: 'footer p', expected: 'Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn', label: 'Der Fußbereich nennt die Adresse' },
      { type: 'selector', selector: 'h1 + p', count: 0, label: 'Der alte Rück-Link-Absatz ist weg' },
    ],
    aendern: {
      html: (h) => {
        const body = h.slice(h.indexOf('<body>') + 6, h.indexOf('</body>'));
        const start = body.indexOf('    <h2>Freitag</h2>');
        const mitte = body.slice(start).replace('    <h2>Freitag</h2>', '    <h2 id="freitag">Freitag</h2>').replace(/^( *)(?=\S)/gm, '  $1');
        return h.slice(0, h.indexOf('<body>') + 6) + `
    <header>
      <h1>Programm</h1>
    </header>

    <nav>
      <a href="index.html">Startseite</a>
      <a href="galerie.html">Galerie</a>
      <a href="tickets.html">Tickets</a>
      <a href="#freitag">Freitag</a>
    </nav>

    <main>
` + mitte.replace(/\s*$/, '\n') + `    </main>

    <footer>
      <p>Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn</p>
    </footer>
  ` + h.slice(h.indexOf('</body>'));
      },
    },
  });
  etappe({
    id: '08-struktur-und-attribute/05-projekt-seitenstruktur',
    page: 'galerie',
    titel: 'Meilenstein: Zonen für die Galerie',
    task: '**Strukturiere** die Galerie-Seite genauso: Kopfbereich mit der Hauptüberschrift, Navigation mit drei Links (Startseite → index.html, Programm → programm.html, Tickets → tickets.html), alle Abschnitte im Hauptbereich, Fußbereich mit „Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn“. Der Rück-Link-Absatz entfällt.',
    hints: ['header, nav, main, footer – wie auf den anderen Seiten.', 'Die drei Links in der Navigation ersetzen den alten Rück-Link.'],
    tests: [
      { type: 'selector', selector: 'header > h1', label: 'Die Hauptüberschrift liegt im Kopfbereich' },
      { type: 'selector', selector: 'nav a', count: 3, label: 'Die Navigation hat drei Links' },
      { type: 'selector', selector: 'nav a[href="programm.html"]', label: 'Ein Link führt zum Programm' },
      { type: 'selector', selector: 'main figure', count: 2, label: 'Die Bild-Blöcke liegen im Hauptbereich' },
      { type: 'selector', selector: 'main ol', label: 'Der Rundgang liegt im Hauptbereich' },
      { type: 'text', selector: 'footer p', expected: 'Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn', label: 'Der Fußbereich nennt die Adresse' },
      { type: 'selector', selector: 'a[href="index.html"]', min: 1, label: 'Ein Link zur Startseite existiert' },
    ],
    aendern: {
      html: (h) => {
        const body = h.slice(h.indexOf('<body>') + 6, h.indexOf('</body>'));
        const start = body.indexOf('    <h2>Eindrücke</h2>');
        const mitte = body.slice(start).replace(/^( *)(?=\S)/gm, '  $1');
        return h.slice(0, h.indexOf('<body>') + 6) + `
    <header>
      <h1>Galerie</h1>
    </header>

    <nav>
      <a href="index.html">Startseite</a>
      <a href="programm.html">Programm</a>
      <a href="tickets.html">Tickets</a>
    </nav>

    <main>
` + mitte.replace(/\s*$/, '\n') + `    </main>

    <footer>
      <p>Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn</p>
    </footer>
  ` + h.slice(h.indexOf('</body>'));
      },
    },
  });

  /* ================= Kapitel 09 – Ticket-Schalter (tickets) ================= */
  etappe({
    id: '09-formulare/01-eingabefelder-und-labels',
    page: 'tickets',
    titel: 'Neue Seite: Tickets mit Formular',
    task: '**Erstelle** die Tickets-Seite: Grundgerüst (Deutsch, UTF-8, Titel „Tickets – FUNKEN“), Kopfbereich mit Hauptüberschrift „Tickets“ und dem Absatz „Sichere dir deinen Platz – der Vorverkauf läuft.“, Navigation (Startseite, Programm, Galerie), Hauptbereich mit dem Absatz „Fülle das Formular aus, wir melden uns per E-Mail.“ und einem Formular mit zwei beschrifteten Feldern: „Name“ (Textfeld, id `name`) und „E-Mail“ (E-Mail-Feld, id `email`). Fußbereich mit „Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn“.',
    hints: ['Jedes Feld bekommt eine Beschriftung, die über das for-Attribut mit der id des Feldes verbunden ist.', 'Das E-Mail-Feld hat einen eigenen Typ – der Browser prüft dann die Eingabe.', 'Die Felder brauchen auch ein name-Attribut, damit die Eingabe einen Namen hat.'],
    tests: [
      { type: 'text', selector: 'title', expected: 'Tickets – FUNKEN', label: 'Der Titel lautet „Tickets – FUNKEN“' },
      { type: 'text', selector: 'header h1', expected: 'Tickets', label: 'Die Hauptüberschrift lautet „Tickets“' },
      { type: 'selector', selector: 'nav a', count: 3, label: 'Die Navigation hat drei Links' },
      { type: 'selector', selector: 'main form', label: 'Im Hauptbereich liegt ein Formular' },
      { type: 'attr', selector: 'form input#name', attr: 'type', expected: 'text', label: 'Das Namensfeld ist ein Textfeld' },
      { type: 'attr', selector: 'form input#email', attr: 'type', expected: 'email', label: 'Das E-Mail-Feld hat den Typ email' },
      { type: 'text', selector: 'label[for="name"]', expected: 'Name', label: 'Die Beschriftung „Name“ gehört zum Namensfeld' },
      { type: 'text', selector: 'label[for="email"]', expected: 'E-Mail', label: 'Die Beschriftung „E-Mail“ gehört zum E-Mail-Feld' },
      { type: 'text', selector: 'footer p', expected: 'Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn', label: 'Der Fußbereich nennt die Adresse' },
    ],
    aendern: {
      html: () => `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Tickets – FUNKEN</title>
  </head>
  <body>
    <header>
      <h1>Tickets</h1>
      <p>Sichere dir deinen Platz – der Vorverkauf läuft.</p>
    </header>

    <nav>
      <a href="index.html">Startseite</a>
      <a href="programm.html">Programm</a>
      <a href="galerie.html">Galerie</a>
    </nav>

    <main>
      <p>Fülle das Formular aus, wir melden uns per E-Mail.</p>
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" name="name">

        <label for="email">E-Mail</label>
        <input type="email" id="email" name="email">
      </form>
    </main>

    <footer>
      <p>Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn</p>
    </footer>
  </body>
</html>
`,
    },
    starter: { html: '<!-- Tickets von FUNKEN -->\n' },
  });
  etappe({
    id: '09-formulare/02-auswahlfelder',
    page: 'tickets',
    titel: 'Ticketart und Newsletter',
    task: '**Erweitere** das Formular: nach dem E-Mail-Feld eine beschriftete Auswahlliste „Ticketart“ (id und name `ticket`) mit den Optionen „Tagesticket Freitag“, „Tagesticket Samstag“ und „Festivalpass“; danach zwei Optionsfelder mit dem gemeinsamen Namen `newsletter` und den Beschriftungen „Ja, Newsletter“ (Wert ja) und „Nein, danke“ (Wert nein).',
    hints: ['Eine Auswahlliste hat Einträge; jeder Eintrag ist ein option-Element mit einem value.', 'Optionsfelder mit demselben name-Attribut gehören zu einer Gruppe – nur eins lässt sich wählen.', 'Auch Optionsfelder bekommen Beschriftungen mit for und id.'],
    tests: [
      { type: 'text', selector: 'label[for="ticket"]', expected: 'Ticketart', label: 'Die Auswahlliste ist mit „Ticketart“ beschriftet' },
      { type: 'selector', selector: 'select#ticket[name="ticket"] option', count: 3, label: 'Die Auswahlliste hat drei Optionen' },
      { type: 'text', selector: 'select#ticket option:last-child', expected: 'Festivalpass', label: 'Die letzte Option ist der Festivalpass' },
      { type: 'selector', selector: 'input[type="radio"][name="newsletter"]', count: 2, label: 'Zwei Optionsfelder gehören zur Gruppe „newsletter“' },
      { type: 'attr', selector: 'input[type="radio"][name="newsletter"]', attr: 'value', expected: 'ja', label: 'Das erste Optionsfeld hat den Wert „ja“' },
      { type: 'text', selector: 'label', expected: 'Nein, danke', any: true, label: 'Die Beschriftung „Nein, danke“ ist da' },
      { type: 'selector', selector: 'input#email', label: 'Das E-Mail-Feld ist noch da' },
    ],
    aendern: {
      html: ['        <input type="email" id="email" name="email">\n', `        <input type="email" id="email" name="email">

        <label for="ticket">Ticketart</label>
        <select id="ticket" name="ticket">
          <option value="freitag">Tagesticket Freitag</option>
          <option value="samstag">Tagesticket Samstag</option>
          <option value="pass">Festivalpass</option>
        </select>

        <input type="radio" id="newsletter-ja" name="newsletter" value="ja">
        <label for="newsletter-ja">Ja, Newsletter</label>
        <input type="radio" id="newsletter-nein" name="newsletter" value="nein">
        <label for="newsletter-nein">Nein, danke</label>
`],
    },
  });
  etappe({
    id: '09-formulare/03-textarea-und-knoepfe',
    page: 'tickets',
    titel: 'Nachricht, Datenschutz, Absenden',
    task: '**Erweitere** das Formular am Ende: ein beschrifteter mehrzeiliger Textbereich „Nachricht (optional)“ (id und name `nachricht`), ein Kontrollkästchen mit der Beschriftung „Ich habe die Datenschutzerklärung gelesen.“ (id und name `datenschutz`) und ein Absende-Knopf mit dem Text „Ticket reservieren“.',
    hints: ['Der mehrzeilige Textbereich ist ein eigenes Element mit öffnendem und schließendem Tag.', 'Das Kontrollkästchen ist ein Eingabefeld mit dem Typ checkbox.', 'Der Knopf ist ein button-Element mit dem Typ submit.'],
    tests: [
      { type: 'text', selector: 'label[for="nachricht"]', expected: 'Nachricht (optional)', label: 'Der Textbereich ist beschriftet' },
      { type: 'selector', selector: 'textarea#nachricht[name="nachricht"]', label: 'Es gibt den Textbereich „nachricht“' },
      { type: 'selector', selector: 'input[type="checkbox"]#datenschutz[name="datenschutz"]', label: 'Es gibt das Kontrollkästchen „datenschutz“' },
      { type: 'text', selector: 'label[for="datenschutz"]', expected: 'Ich habe die Datenschutzerklärung gelesen.', label: 'Das Kontrollkästchen ist beschriftet' },
      { type: 'text', selector: 'form button[type="submit"]', expected: 'Ticket reservieren', label: 'Der Absende-Knopf heißt „Ticket reservieren“' },
      { type: 'order', selectors: ['select#ticket', 'textarea#nachricht', 'input#datenschutz', 'button'], label: 'Die Reihenfolge stimmt' },
    ],
    aendern: {
      html: ['        <label for="newsletter-nein">Nein, danke</label>\n', `        <label for="newsletter-nein">Nein, danke</label>

        <label for="nachricht">Nachricht (optional)</label>
        <textarea id="nachricht" name="nachricht"></textarea>

        <input type="checkbox" id="datenschutz" name="datenschutz">
        <label for="datenschutz">Ich habe die Datenschutzerklärung gelesen.</label>

        <button type="submit">Ticket reservieren</button>
`],
    },
  });
  etappe({
    id: '09-formulare/04-wiederholung',
    page: 'tickets',
    titel: 'Preistabelle vor dem Formular',
    task: '**Erstelle** im Hauptbereich vor dem Absatz „Fülle das Formular aus …“ den Abschnitt „Preise“ mit einer Tabelle: Kopfzeile Ticket | Preis, dann Tagesticket | 12 € · Festivalpass | 20 € · Helfer:in | kostenlos.',
    hints: ['Tabelle mit Kopfzeile – wie auf der Programm-Seite.', 'Abschnitt = Zwischenüberschrift plus Tabelle, direkt am Anfang des Hauptbereichs.'],
    tests: [
      { type: 'text', selector: 'main > h2', expected: 'Preise', label: 'Der Abschnitt „Preise“ ist da' },
      { type: 'selector', selector: 'main table th', count: 2, label: 'Die Tabelle hat zwei Kopfzellen' },
      { type: 'selector', selector: 'main table tr', count: 4, label: 'Die Tabelle hat vier Zeilen' },
      { type: 'text', selector: 'main table tr:nth-child(3) td:last-child', expected: '20 €', label: 'Der Festivalpass kostet 20 €' },
      { type: 'order', selectors: ['main table', 'main form'], label: 'Die Tabelle steht vor dem Formular' },
    ],
    aendern: {
      html: ['    <main>\n      <p>Fülle das Formular aus', `    <main>
      <h2>Preise</h2>
      <table>
        <tr>
          <th>Ticket</th>
          <th>Preis</th>
        </tr>
        <tr>
          <td>Tagesticket</td>
          <td>12 €</td>
        </tr>
        <tr>
          <td>Festivalpass</td>
          <td>20 €</td>
        </tr>
        <tr>
          <td>Helfer:in</td>
          <td>kostenlos</td>
        </tr>
      </table>

      <p>Fülle das Formular aus`],
    },
  });
  etappe({
    id: '09-formulare/05-projekt-ticketformular',
    page: 'tickets',
    titel: 'Meilenstein: Pflichtfelder und Anzahl',
    task: '**Erweitere** das Formular: Name und E-Mail werden Pflichtfelder. Nach dem E-Mail-Feld kommt ein beschriftetes Zahlenfeld „Anzahl Tickets“ (id und name `anzahl`) mit Mindestwert 1 und Höchstwert 4.',
    hints: ['Pflichtfelder bekommen das Attribut required – ohne Wert.', 'Ein Zahlenfeld hat den Typ number; Grenzen setzt du mit min und max.'],
    tests: [
      { type: 'attr', selector: 'input#name', attr: 'required', present: true, label: 'Der Name ist ein Pflichtfeld' },
      { type: 'attr', selector: 'input#email', attr: 'required', present: true, label: 'Die E-Mail ist ein Pflichtfeld' },
      { type: 'attr', selector: 'input#anzahl[name="anzahl"]', attr: 'type', expected: 'number', label: 'Das Zahlenfeld „anzahl“ ist da' },
      { type: 'attr', selector: 'input#anzahl', attr: 'min', expected: '1', label: 'Mindestens 1 Ticket' },
      { type: 'attr', selector: 'input#anzahl', attr: 'max', expected: '4', label: 'Höchstens 4 Tickets' },
      { type: 'text', selector: 'label[for="anzahl"]', expected: 'Anzahl Tickets', label: 'Das Zahlenfeld ist beschriftet' },
    ],
    aendern: {
      html: (h) => h
        .replace('<input type="text" id="name" name="name">', '<input type="text" id="name" name="name" required>')
        .replace('<input type="email" id="email" name="email">\n', '<input type="email" id="email" name="email" required>\n\n        <label for="anzahl">Anzahl Tickets</label>\n        <input type="number" id="anzahl" name="anzahl" min="1" max="4">\n'),
    },
  });
}
