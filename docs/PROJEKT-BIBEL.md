# Projekt-Bibel: die FUNKEN-Website

**Generiert aus `content-src/etappen/` – nicht von Hand ändern.** Jede Lektion ab Kapitel 02 endet mit genau einer Etappe; der Starter einer Etappe ist immer der Zustand nach der vorherigen Etappe derselben Datei (per Konstruktion, Skript `scripts/baue-etappen.mjs`).

## Der fiktive Kunde

- **FUNKEN – Das Schülerfestival Heilbronn**, veranstaltet vom Kollektiv FUNKEN (Schülerfirma, fiktiv)
- Freitag, 17. und Samstag, 18. Juli 2027 · Altes Fabrikgelände am Neckar · Hafenstraße 9 · 74072 Heilbronn
- Einlass 16:00 Uhr, Ende 23:00 Uhr · Bühnen: Hauptbühne, Zeltbühne
- Acts: Neonpuls, Basslager, Kiki Volt, Die Kabelträger, Lou & die Lichter, Marla Funke, Sektor 7, Freitag-Frei
- Foodtrucks: Pizza & Mehr, Döner-Ecke, Bubble Tea Bar, Waffelwagen
- Tickets: Tagesticket 12 €, Festivalpass 20 €, Helfer:in kostenlos · E-Mail hallo@funken-festival-beispiel.de
- Farben (CSS): Creme `#fff7e8`, Nacht `#1b1b2f`, Funke `#ff6a00`, Dunkelorange `#d94f00`, Blau `#0b7dd6`, Gelb `#ffd23f`

## Dateien

| Schlüssel | Datei | entsteht in |
|---|---|---|
| `index` | index.html | 02-html-erste-schritte |
| `programm` | programm.html | 07-tabellen |
| `galerie` | galerie.html | 06-bilder-und-medien |
| `tickets` | tickets.html | 09-formulare |
| `impressum` | impressum.html | 15-recht-im-web |
| `css` | style.css (alle Seiten) | 10-css-grundlagen |
| `js` | script.js (Startseite) | 16-javascript-start |

## Etappen (82)

| Etappe | Seite | Dateien | Was die Lernenden bauen |
|---|---|---|---|
| `02-html-erste-schritte/01-was-ist-html` | index | html | **Die erste Überschrift** – Erstelle die Hauptüberschrift der Startseite: Sie lautet „FUNKEN“ und ist die wichtigste Überschrift der Seite. Der Kommentar bleibt stehen. |
| `02-html-erste-schritte/02-tags-und-attribute` | index | html | **Der Willkommens-Absatz** – Ergänze unter der Überschrift einen Absatz mit dem Text „Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.“ |
| `02-html-erste-schritte/03-grundgeruest` | index | html | **Das Grundgerüst** – Vervollständige die Seite zum kompletten Grundgerüst: Dokumenttyp, Wurzelelement mit der Sprache Deutsch, Kopfbereich mit Zeichensatz UTF-8 und dem Titel „FUNKEN – Das Schülerfestival“, Körper mit Kommentar, Überschrift und Absatz. |
| `02-html-erste-schritte/04-wiederholung` | index | html | **Der Termin** – Ergänze unter dem Willkommens-Absatz einen zweiten Absatz: „Freitag, 17. und Samstag, 18. Juli 2027 auf dem alten Fabrikgelände am Neckar.“ |
| `02-html-erste-schritte/05-projekt-startseite` | index | html | **Meilenstein: Startseite steht** – Erweitere die Startseite um einen dritten Absatz mit den Zeiten: „Einlass ab 16:00 Uhr, Ende 23:00 Uhr.“ – direkt unter dem Termin. Überprüfe dabei, dass das Grundgerüst vollständig ist. |
| `03-text/01-ueberschriften` | index | html | **Zwischenüberschrift „Das Festival“** – Ergänze nach den drei Absätzen eine Zwischenüberschrift der Ebene 2 mit dem Text „Das Festival“. |
| `03-text/02-absaetze-umbrueche-linien` | index | html | **Texte, Linie und Adresse** – Erstelle unter „Das Festival“ zwei Absätze („FUNKEN wird von Schülerinnen und Schülern organisiert – vom Line-up bis zum Ticketverkauf.“ und „Der Erlös geht an Projekte unserer Schulen.“), darunter eine Trennlinie und einen Adress-Absatz mit drei Zeilen: Kollektiv FUNKEN, Hafenstraße 9, 74072 Heilbronn. |
| `03-text/03-hervorheben-und-kommentare` | index | html | **Betonung und Kommentar** – Gestalte den Text unter „Das Festival“: „Schülerinnen und Schülern“ wird stark betont, „vom Line-up bis zum Ticketverkauf“ leicht betont. Ergänze außerdem vor der Trennlinie einen Kommentar mit dem Wort Kontakt. |
| `03-text/04-wiederholung` | index | html | **Abschnitt „Die Bühnen“** – Erstelle vor dem Kontakt-Kommentar einen neuen Abschnitt: Zwischenüberschrift „Die Bühnen“ und darunter einen Absatz „Auf der Hauptbühne spielen die Headliner, im Zelt gibt es Newcomer und DJs.“ – das Wort „Hauptbühne“ stark betont. |
| `03-text/05-projekt-ueber-das-festival` | index | html | **Meilenstein: Abschnitt „Foodtrucks“** – Erweitere die Startseite vor dem Kontakt-Kommentar um den Abschnitt „Foodtrucks“ (Zwischenüberschrift) mit dem Absatz „Pizza, Döner, Bubble Tea und Waffeln – alles auf dem Gelände.“, das Wort „alles“ leicht betont. Überprüfe die Reihenfolge: Das Festival → Die Bühnen → Foodtrucks → Linie. |
| `04-listen/01-ungeordnete-listen` | index | html | **Das Line-up als Liste** – Erstelle zwischen „Die Bühnen“ und „Foodtrucks“ einen Abschnitt „Line-up“ (Zwischenüberschrift) mit einer Aufzählungsliste der vier Acts: Neonpuls, Basslager, Kiki Volt, Die Kabelträger. |
| `04-listen/02-geordnete-listen` | index | html | **So kommst du hin** – Erstelle vor dem Kontakt-Kommentar den Abschnitt „So kommst du hin“ mit einer nummerierten Liste aus drei Schritten: „Mit der Stadtbahn bis Haltestelle Hafenstraße“, „Den Lichtern folgen“, „Ticket am Einlass zeigen“. |
| `04-listen/03-verschachtelte-listen` | index | html | **Line-up nach Bühnen** – Strukturiere das Line-up nach Bühnen: Die Liste hat nur noch zwei Einträge, „Hauptbühne“ und „Zeltbühne“; darin liegt jeweils eine eigene Liste – Hauptbühne mit Neonpuls und Basslager, Zeltbühne mit Kiki Volt und Die Kabelträger. |
| `04-listen/04-wiederholung` | index | html | **Die Foodtruck-Liste** – Ergänze unter dem Foodtrucks-Absatz eine Aufzählungsliste mit vier Trucks: „Pizza & Mehr“, „Döner-Ecke“, „Bubble Tea Bar“, „Waffelwagen“ – der erste Eintrag beginnt mit dem stark betonten Wort „Neu:“ und dann dem Namen. |
| `04-listen/05-projekt-lineup` | index | html | **Meilenstein: Line-up komplett** – Erweitere das Line-up: Die Zeltbühne bekommt als dritten Act „Lou & die Lichter“. Ergänze in der Anfahrt einen vierten Schritt „Feiern“. |
| `05-links/01-externe-links` | index | html | **Link zum Fahrplan** – Ergänze unter der Anfahrts-Liste einen Absatz mit einem Link: Der Linktext lautet „Fahrplan der Stadtbahn“ und führt zur Adresse `https://www.example.com`. |
| `05-links/02-interne-links-und-sprungmarken` | index | html | **Navigation und Sprungmarke** – Erstelle direkt unter der Hauptüberschrift eine Linkzeile (ein Absatz) mit drei Links zu den eigenen Seiten: „Programm“ → programm.html, „Galerie“ → galerie.html, „Tickets“ → tickets.html. Ergänze außerdem: Die Line-up-Überschrift bekommt die id `lineup`, und unter der Linkzeile kommt ein Absatz mit dem Sprungmarken-Link „Direkt zum Line-up“. |
| `05-links/03-mailto-und-neuer-tab` | index | html | **E-Mail-Link und neuer Tab** – Erweitere die Links: Der Fahrplan-Link öffnet in einem neuen Tab. Im Adress-Absatz nach der Trennlinie kommt nach einem weiteren Zeilenumbruch ein E-Mail-Link mit dem Text hallo@funken-festival-beispiel.de, der ein Mailprogramm öffnet. |
| `05-links/04-wiederholung` | index | html | **Abschnitt „Mehr“ mit Linkliste** – Erstelle vor dem Kontakt-Kommentar den Abschnitt „Mehr“ (Zwischenüberschrift) mit einer Aufzählungsliste aus zwei Links: „Unsere Schule“ → `https://www.example.com/schule` in einem neuen Tab, und „Fotos vom letzten Jahr“ → galerie.html. |
| `05-links/05-projekt-navigation` | index | html | **Meilenstein: Nach oben** – Erweitere die Navigation: Die Hauptüberschrift bekommt die id `oben`. Vor dem Kontakt-Kommentar kommt ein Absatz mit dem Sprungmarken-Link „Nach oben“, der zur Hauptüberschrift springt. Überprüfe, dass alle drei Seiten-Links noch da sind. |
| `06-bilder-und-medien/01-bilder` | index | html | **Das Bühnenfoto** – Ergänze direkt unter dem Willkommens-Absatz („Das Schülerfestival Heilbronn …“) ein Bild aus der Datei buehne.svg mit dem Alternativtext „Die Hauptbühne von FUNKEN bei Nacht“. |
| `06-bilder-und-medien/02-audio-und-video` | galerie | html | **Neue Seite: Galerie mit Jingle und Aftermovie** – Erstelle die Galerie-Seite: komplettes Grundgerüst (Deutsch, UTF-8, Titel „Galerie – FUNKEN“), Hauptüberschrift „Galerie“, dann der Abschnitt „Der FUNKEN-Jingle“ mit einem Audio-Player für die Datei jingle.wav und der Abschnitt „Aftermovie“ mit einem Video-Player für clip.webm, beide mit Bedienelementen. |
| `06-bilder-und-medien/03-figure-und-bildunterschrift` | galerie | html | **Bild mit Unterschrift und Rück-Link** – Ergänze auf der Galerie-Seite unter der Hauptüberschrift einen Absatz mit dem Link „Zurück zur Startseite“ (→ index.html). Erstelle danach den Abschnitt „Eindrücke“ mit einem Bild-Block: das Bild crowd.svg (Alternativtext „Die Menge vor der Hauptbühne“) mit der Bildunterschrift „Die Menge vor der Hauptbühne“. |
| `06-bilder-und-medien/04-wiederholung` | galerie | html | **Foodtrucks in der Galerie** – Erstelle nach dem Bild-Block den Abschnitt „Foodtrucks“ mit dem Bild foodtruck.svg (Alternativtext „Der Pizza-Truck am Abend“) und darunter einer Aufzählungsliste mit zwei Links: „Pizza & Mehr“ und „Waffelwagen“ – beide führen zur Startseite (index.html). |
| `06-bilder-und-medien/05-projekt-galerie` | galerie | html | **Meilenstein: Galerie komplett** – Erweitere die Galerie: Im Abschnitt „Eindrücke“ kommt ein zweiter Bild-Block mit plakat.svg (Alternativtext „Das Plakat 2027“) und der Unterschrift „Das Plakat 2027“. Am Ende der Seite kommt der Abschnitt „Rundgang“ mit einer nummerierten Liste: Einlass, Hauptbühne, Zeltbühne, Foodcourt. |
| `07-tabellen/01-tabellen-aufbau` | index | html | **Auf einen Blick** – Erstelle auf der Startseite zwischen „Das Festival“ und „Die Bühnen“ den Abschnitt „Auf einen Blick“ mit einer Tabelle aus drei Zeilen und je zwei Zellen: Wann \| Fr 17. + Sa 18. Juli 2027 · Wo \| Altes Fabrikgelände am Neckar · Einlass \| 16:00 Uhr. |
| `07-tabellen/02-kopfzeile` | programm | html | **Neue Seite: Programm mit Timetable** – Erstelle die Programm-Seite: Grundgerüst (Deutsch, UTF-8, Titel „Programm – FUNKEN“), Hauptüberschrift „Programm“, Rück-Link „Zurück zur Startseite“, dann der Abschnitt „Freitag“ mit einer Tabelle: Kopfzeile Zeit \| Hauptbühne \| Zeltbühne und drei Zeilen: 17:00 \| Neonpuls \| Kiki Volt · 19:00 \| Basslager \| Die Kabelträger · 21:00 \| Neonpuls \| Lou & die Lichter. |
| `07-tabellen/03-verbundene-zellen` | programm | html | **Samstag mit Pause** – Erstelle unter der Freitags-Tabelle den Abschnitt „Samstag“ mit einer Tabelle: Kopfzeile Zeit \| Hauptbühne \| Zeltbühne, dann 16:00 \| Marla Funke \| Sektor 7, dann eine Zeile 18:00 mit einer über beide Bühnen verbundenen Zelle „Pause – Foodtrucks öffnen“, dann 20:00 \| Basslager \| Freitag-Frei. |
| `07-tabellen/04-wiederholung` | programm | html | **Foodcourt-Tabelle mit Bild** – Erstelle am Ende der Programm-Seite den Abschnitt „Foodcourt“: zuerst das Bild foodtruck.svg (Alternativtext „Foodtrucks auf dem Gelände“), darunter eine Tabelle mit Kopfzeile Truck \| Highlight und drei Zeilen: Pizza & Mehr \| Margherita · Döner-Ecke \| Dürüm · Waffelwagen \| Waffel mit Kirschen. Unter der Tabelle ein Absatz mit einem Link „Alle Trucks auf der Startseite“ → index.html. |
| `07-tabellen/05-projekt-timetable` | index | html | **Meilenstein: Kopfzeile auf der Startseite** – Erweitere die Tabelle „Auf einen Blick“ auf der Startseite: Sie bekommt als erste Zeile eine Kopfzeile mit den Kopfzellen „Was“ und „Info“ und als letzte Zeile „Ende \| 23:00 Uhr“. |
| `08-struktur-und-attribute/01-class-und-id` | index | html | **Klasse und id vergeben** – Ergänze auf der Startseite: Der Absatz „Einlass ab 16:00 Uhr, Ende 23:00 Uhr.“ bekommt die Klasse `hinweis`, die Überschrift „So kommst du hin“ die id `anfahrt`. |
| `08-struktur-und-attribute/02-div-und-span` | index | html | **Foodtruck-Bereich gruppieren** – Gruppiere den Foodtrucks-Abschnitt (Überschrift, Absatz und Liste) in einem Container-Element mit der Klasse `foodtrucks`. Ergänze im Foodtruck-Absatz ganz vorn den Text „Neu 2027:“ in einem Inline-Element mit der Klasse `neu`. |
| `08-struktur-und-attribute/03-semantische-elemente` | index | html | **Die Startseite bekommt Zonen** – Strukturiere die Startseite mit Bedeutung: Hauptüberschrift, Willkommens-Absatz und Bild in einen Kopfbereich; die Linkzeile und der Sprungmarken-Link in eine Navigation; alles vom Termin bis „Nach oben“ in den Hauptbereich; die Adresse in einen Fußbereich. Der Kontakt-Kommentar bleibt, die Trennlinie entfällt. |
| `08-struktur-und-attribute/04-wiederholung` | programm | html | **Zonen für die Programm-Seite** – Strukturiere die Programm-Seite: Hauptüberschrift in einen Kopfbereich, darunter eine Navigation mit vier Links (Startseite → index.html, Galerie → galerie.html, Tickets → tickets.html, Freitag → Sprungmarke `#freitag`), alle Abschnitte in den Hauptbereich, ein Fußbereich mit dem Absatz „Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn“. Die Freitags-Überschrift bekommt die id `freitag`. Der alte Rück-Link-Absatz entfällt. |
| `08-struktur-und-attribute/05-projekt-seitenstruktur` | galerie | html | **Meilenstein: Zonen für die Galerie** – Strukturiere die Galerie-Seite genauso: Kopfbereich mit der Hauptüberschrift, Navigation mit drei Links (Startseite → index.html, Programm → programm.html, Tickets → tickets.html), alle Abschnitte im Hauptbereich, Fußbereich mit „Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn“. Der Rück-Link-Absatz entfällt. |
| `09-formulare/01-eingabefelder-und-labels` | tickets | html | **Neue Seite: Tickets mit Formular** – Erstelle die Tickets-Seite: Grundgerüst (Deutsch, UTF-8, Titel „Tickets – FUNKEN“), Kopfbereich mit Hauptüberschrift „Tickets“ und dem Absatz „Sichere dir deinen Platz – der Vorverkauf läuft.“, Navigation (Startseite, Programm, Galerie), Hauptbereich mit dem Absatz „Fülle das Formular aus, wir melden uns per E-Mail.“ und einem Formular mit zwei beschrifteten Feldern: „Name“ (Textfeld, id `name`) und „E-Mail“ (E-Mail-Feld, id `email`). Fußbereich mit „Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn“. |
| `09-formulare/02-auswahlfelder` | tickets | html | **Ticketart und Newsletter** – Erweitere das Formular: nach dem E-Mail-Feld eine beschriftete Auswahlliste „Ticketart“ (id und name `ticket`) mit den Optionen „Tagesticket Freitag“, „Tagesticket Samstag“ und „Festivalpass“; danach zwei Optionsfelder mit dem gemeinsamen Namen `newsletter` und den Beschriftungen „Ja, Newsletter“ (Wert ja) und „Nein, danke“ (Wert nein). |
| `09-formulare/03-textarea-und-knoepfe` | tickets | html | **Nachricht, Datenschutz, Absenden** – Erweitere das Formular am Ende: ein beschrifteter mehrzeiliger Textbereich „Nachricht (optional)“ (id und name `nachricht`), ein Kontrollkästchen mit der Beschriftung „Ich habe die Datenschutzerklärung gelesen.“ (id und name `datenschutz`) und ein Absende-Knopf mit dem Text „Ticket reservieren“. |
| `09-formulare/04-wiederholung` | tickets | html | **Preistabelle vor dem Formular** – Erstelle im Hauptbereich vor dem Absatz „Fülle das Formular aus …“ den Abschnitt „Preise“ mit einer Tabelle: Kopfzeile Ticket \| Preis, dann Tagesticket \| 12 € · Festivalpass \| 20 € · Helfer:in \| kostenlos. |
| `09-formulare/05-projekt-ticketformular` | tickets | html | **Meilenstein: Pflichtfelder und Anzahl** – Erweitere das Formular: Name und E-Mail werden Pflichtfelder. Nach dem E-Mail-Feld kommt ein beschriftetes Zahlenfeld „Anzahl Tickets“ (id und name `anzahl`) mit Mindestwert 1 und Höchstwert 4. |
| `10-css-grundlagen/01-was-ist-css` | index | css | **Die erste CSS-Regel** – Erstelle im Stylesheet die erste Regel: Alle Hauptüberschriften bekommen die Farbe `#ff6a00` (Funken-Orange). Der Kommentar bleibt. |
| `10-css-grundlagen/02-drei-orte-fuer-css` | index | html | **Stylesheet einbinden** – Vervollständige den Kopfbereich der Startseite um die Verknüpfung mit der externen Stylesheet-Datei style.css, damit die Regeln auf der echten Seite wirken. |
| `10-css-grundlagen/03-farben` | index | css | **Text- und Linkfarbe** – Erweitere das Stylesheet um zwei Regeln: Der gesamte Text der Seite bekommt die Farbe `#1b1b2f`, alle Links die Farbe `#0b7dd6`. |
| `10-css-grundlagen/04-hintergrund` | index | css | **Hintergründe** – Gestalte die Hintergründe: Die ganze Seite bekommt die Hintergrundfarbe `#fff7e8` (Creme); der Fußbereich bekommt die Hintergrundfarbe `#1b1b2f` und die Textfarbe `#fff7e8`. |
| `10-css-grundlagen/05-wiederholung` | programm | html | **Programm-Seite anschließen** – Vervollständige die Programm-Seite: Der Kopfbereich verknüpft style.css. Ergänze in der Samstags-Tabelle eine letzte Zeile: 22:00 \| Neonpuls \| Kiki Volt. |
| `10-css-grundlagen/06-projekt-erste-styles` | index | css | **Meilenstein: Zwischenüberschriften und Tabellen** – Erweitere das Stylesheet um zwei Regeln: Zwischenüberschriften bekommen die Farbe `#d94f00`, Tabellen einen weißen Hintergrund. |
| `11-selektoren/01-element-und-klassen-selektor` | index | css | **Der Hinweis-Absatz** – Gestalte den Absatz mit der Klasse `hinweis`: Farbe `#b34700` und fette Schrift. |
| `11-selektoren/02-id-und-gruppen-selektor` | index | css | **Zwei Überschriften, eine Regel** – Gestalte mit EINER gemeinsamen Regel die Überschriften mit den ids `lineup` und `anfahrt`: beide bekommen die Farbe `#0b7dd6`. |
| `11-selektoren/03-verschachtelte-selektoren` | index | css | **Links je nach Ort** – Gestalte Links abhängig von ihrem Ort: Links in der Navigation bekommen die Farbe `#1b1b2f`, Links im Fußbereich die Farbe `#ffd23f`. Alle anderen Links bleiben blau. |
| `11-selektoren/04-hover` | index | css | **Links beim Überfahren** – Gestalte die Navigations-Links beim Überfahren mit der Maus: Sie werden dann orange `#ff6a00`. |
| `11-selektoren/05-wiederholung` | galerie | html, css | **Galerie anschließen und hervorheben** – Vervollständige die Galerie-Seite: Der Kopfbereich verknüpft style.css; die Überschrift „Aftermovie“ bekommt die Klasse `highlight`. Erstelle im Stylesheet eine Regel für diese Klasse mit der Farbe `#0b7dd6`. |
| `11-selektoren/06-projekt-selektoren` | programm | css | **Meilenstein: Kopfzellen und Bildunterschriften** – Erweitere das Stylesheet: Kopfzellen von Tabellen bekommen die Farbe `#ff6a00`; Bildunterschriften bekommen die Farbe `#6b6b7a`. |
| `12-schrift-und-text/01-schriftart-und-groesse` | index | css | **Schriftart und Größe** – Gestalte die Schrift: Die ganze Seite nutzt die Schriftart Arial, ersatzweise eine serifenlose Schrift. Die Hauptüberschrift wird 48 Pixel groß. |
| `12-schrift-und-text/02-textgestaltung` | index | css | **Ausrichtung, Unterstreichung, Zeilenabstand** – Gestalte den Text: Die Hauptüberschrift wird zentriert, Navigations-Links verlieren ihre Unterstreichung, und der Zeilenabstand der ganzen Seite wird 1.5. |
| `12-schrift-und-text/03-wiederholung` | tickets | html, css | **Tickets anschließen, Kopfzellen ausrichten** – Vervollständige die Tickets-Seite: Der Kopfbereich verknüpft style.css. Erweitere im Stylesheet die Regel für Kopfzellen: Sie werden linksbündig. |
| `12-schrift-und-text/04-projekt-typografie` | index | css | **Meilenstein: Typografie** – Gestalte weiter: Zwischenüberschriften werden 28 Pixel groß; die Navigation wird als Ganzes zentriert. |
| `13-box-modell/01-rahmen-und-innenabstand` | index | css | **Hinweis-Box mit Rahmen** – Erweitere die Regel für die Klasse `hinweis`: ein 2 Pixel dicker, durchgezogener Rahmen in `#ff6a00` und rundum 12 Pixel Innenabstand. |
| `13-box-modell/02-aussenabstand-und-breite` | index | css | **Abstand und Breite** – Erweitere die Regel für die Klasse `hinweis`: 16 Pixel Abstand nach oben (außen) und eine Breite von 420 Pixeln. Ergänze außerdem eine Regel, die den Hauptbereich höchstens 720 Pixel breit macht. |
| `13-box-modell/03-ecken-und-schatten` | index | css | **Runde Ecken und Schatten** – Gestalte weiter: Alle Bilder bekommen 12 Pixel runde Ecken. Die Hinweis-Box bekommt 8 Pixel runde Ecken und einen Schatten: 0 Pixel nach rechts, 4 Pixel nach unten, 12 Pixel weich, Farbe `rgba(0, 0, 0, 0.15)`. |
| `13-box-modell/04-wiederholung` | programm | css | **Luft in den Tabellen** – Erstelle eine gemeinsame Regel für Kopf- und Datenzellen (mit Komma): oben und unten 6 Pixel, links und rechts 10 Pixel Innenabstand. Erweitere die table-Regel um einen 1 Pixel dicken, durchgezogenen Rahmen in `#1b1b2f`. |
| `13-box-modell/05-projekt-karten` | galerie | css | **Meilenstein: Bild-Karten** – Gestalte die Bild-Blöcke der Galerie als Karten: weißer Hintergrund, rundum 12 Pixel Innenabstand, 12 Pixel runde Ecken, kein Außenabstand. |
| `14-flexbox/01-flex-grundlagen` | index | css | **Navigation nebeneinander** – Gestalte die Navigation als Flex-Container mit 16 Pixel Abstand zwischen den Links. |
| `14-flexbox/02-ausrichten` | index | css | **Ausrichten** – Gestalte die Ausrichtung: Die Navigations-Links werden in der Mitte verteilt. Der Kopfbereich wird ein Flex-Container mit Spaltenrichtung, in dem alles horizontal zentriert ist. |
| `14-flexbox/03-umbrechen-und-wachsen` | index | css | **Foodtrucks als Kacheln** – Gestalte die Truck-Liste im Container `foodtrucks` als Flex-Container, der umbricht, mit 12 Pixel Abstand; jeder Listenpunkt darin wächst gleichmäßig. |
| `14-flexbox/04-wiederholung` | index | css | **Der Fußbereich bekommt Luft** – Erweitere die footer-Regel: rundum 16 Pixel Innenabstand und zentrierter Text. |
| `14-flexbox/05-projekt-layout` | index | css | **Meilenstein: Der Kopfbereich leuchtet** – Gestalte den Kopfbereich: Hintergrundfarbe `#1b1b2f` und rundum 24 Pixel Innenabstand. Die Hauptüberschrift und der Absatz im Kopfbereich bekommen mit einer gemeinsamen Regel die Farbe `#ffd23f`. |
| `15-recht-im-web/01-urheberrecht-und-bilder` | galerie | html | **Bildnachweis** – Ergänze in der Galerie die Bildunterschrift des ersten Bild-Blocks um den Nachweis: Der Text lautet jetzt „Die Menge vor der Hauptbühne (Foto: Kollektiv FUNKEN, CC BY 4.0)“. |
| `15-recht-im-web/02-impressum-und-datenschutz` | impressum | html | **Neue Seite: Impressum** – Erstelle die Impressum-Seite: Grundgerüst (Deutsch, UTF-8, Titel „Impressum – FUNKEN“, Verknüpfung mit style.css), Kopfbereich mit Hauptüberschrift „Impressum“, Navigation mit einem Link „Startseite“ → index.html, Hauptbereich mit dem Abschnitt „Angaben“ (Absatz mit drei Zeilen: Kollektiv FUNKEN – Schülerfirma (fiktiv), Hafenstraße 9, 74072 Heilbronn, dann ein E-Mail-Link hallo@funken-festival-beispiel.de) und dem Abschnitt „Datenschutzerklärung“ mit dem Absatz „Beim Ticketformular speichern wir Name und E-Mail nur, um die Reservierung zu bestätigen.“ und dem stark betonten Absatz „Fiktiver Betrieb für Übungszwecke.“, Fußbereich mit „Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn“. |
| `15-recht-im-web/03-projekt-impressum` | index | html | **Meilenstein: Impressum verlinken** – Ergänze im Fußbereich der Startseite nach dem Adress-Absatz einen weiteren Absatz mit zwei Links: „Impressum“ → impressum.html und „Tickets“ → tickets.html. |
| `16-javascript-start/01-was-ist-javascript` | index | html, js | **Das erste Skript** – Vervollständige die Startseite: Vor dem schließenden body-Tag wird die Datei script.js eingebunden. Erstelle im Skript eine Ausgabe in der Konsole mit dem Text „FUNKEN – Startseite geladen“. Der Kommentar im Skript bleibt. |
| `16-javascript-start/02-variablen` | index | js | **Variablen** – Erweitere das Skript: eine unveränderliche Variable `festivalName` mit dem Text „FUNKEN“, eine veränderliche Variable `reservierungen` mit dem Startwert 0, und eine Konsolenausgabe des Festivalnamens über die Variable. |
| `16-javascript-start/03-rechnen-und-verbinden` | index | js | **Rechnen und verbinden** – Erweitere das Skript: eine Konstante `preisPass` mit 20, eine Konstante `anzahl` mit 3 und eine Konsolenausgabe, die den Text „Summe: “ mit dem berechneten Produkt verbindet – Ergebnis „Summe: 60“. |
| `16-javascript-start/04-wiederholung` | index | js | **Einlass-Meldung** – Erweitere das Skript: eine Konstante `einlass` mit dem Text „16:00 Uhr“ und eine Konsolenausgabe, die aus dem Festivalnamen, dem Text „ – Einlass ab “ und der Einlasszeit den Satz „FUNKEN – Einlass ab 16:00 Uhr“ zusammensetzt. |
| `16-javascript-start/05-projekt-erstes-skript` | index | js | **Meilenstein: Dauer** – Erweitere das Skript: eine Konstante `tage` mit 2 und eine Konsolenausgabe „FUNKEN dauert 2 Tage“, zusammengesetzt aus Festivalname, Text und der Zahl aus der Variablen. |
| `17-javascript-dom/01-elemente-aendern` | index | html, js | **Status-Zeile** – Ergänze ganz oben im Hauptbereich der Startseite einen Absatz mit der id `status` und dem Text „Status wird geladen …“. Erweitere das Skript so, dass es dieses Element findet und seinen Text auf „Vorverkauf läuft!“ setzt. |
| `17-javascript-dom/02-auf-klick-reagieren` | index | html, js | **Ein Knopf antwortet** – Ergänze vor dem Status-Absatz einen Knopf mit der id `status-knopf` und dem Text „Gibt es noch Tickets?“; der Status-Absatz startet leer. Ändere das Skript: Statt den Status sofort zu setzen, wird beim Klick auf den Knopf der Text „Ja – Festivalpass und Tagestickets verfügbar.“ in den Status geschrieben. |
| `17-javascript-dom/03-zaehler` | index | html, js | **Ich bin dabei!** – Ergänze unter der Line-up-Liste einen Absatz mit einem Knopf (id `dabei-knopf`, Text „Ich bin dabei!“), danach ein Inline-Element mit der id `dabei` und dem Text 0 und den Text „ Leute sind dabei“. Erweitere das Skript: Bei jedem Klick wird die Variable `reservierungen` um 1 erhöht und im Element `dabei` angezeigt. |
| `17-javascript-dom/04-klassen-schalten` | index | html, css, js | **Nachtmodus** – Ergänze in der Navigation als letztes Element einen Knopf mit der id `nacht-knopf` und dem Text „Nachtmodus“. Erstelle im Stylesheet eine Regel für die Klasse `nacht` mit Hintergrundfarbe `#1b1b2f` und Textfarbe `#fff7e8`. Erweitere das Skript: Beim Klick wird die Klasse `nacht` am body ein- oder ausgeschaltet. |
| `17-javascript-dom/05-wiederholung` | index | js | **Dankeschön** – Erweitere den Klick-Listener des Dabei-Knopfs: Zusätzlich zum Zähler wird der Status-Text auf „Danke – bis Juli!“ gesetzt. |
| `17-javascript-dom/06-projekt-interaktiv` | index | html, js | **Meilenstein: Countdown** – Ergänze im Kopfbereich nach dem Willkommens-Absatz einen leeren Absatz mit der id `countdown`. Erweitere das Skript: eine Konstante `tageBisFunken` mit 42 und eine Zeile, die in den Countdown-Absatz den Text „Noch 42 Tage bis FUNKEN“ schreibt – die Zahl kommt aus der Variablen. |
| `18-showtime/01-alles-zusammenfuegen` | index | html, css | **Der Ticket-Knopf** – Ergänze im Kopfbereich nach dem Countdown-Absatz einen Absatz mit der Klasse `cta`, der einen Link „Jetzt Tickets sichern“ → tickets.html enthält. Gestalte diesen Link im Stylesheet: Hintergrund `#ff6a00`, weiße Schrift, oben/unten 10 und links/rechts 16 Pixel Innenabstand, 999 Pixel runde Ecken, keine Unterstreichung. |
| `18-showtime/02-grosse-wiederholung` | tickets | html | **Häufige Fragen** – Erweitere die Tickets-Seite: In der Navigation kommt ein vierter Link „Impressum“ → impressum.html. Im Hauptbereich nach dem Formular der Abschnitt „Häufige Fragen“ mit einer Aufzählungsliste aus drei Einträgen, jeweils mit stark betonter Frage und Antwort: „Ab wie viel Jahren?“ – Ab 14, „Gibt es Abendkasse?“ – Ja, solange Tickets da sind, „Regen?“ – Wir spielen trotzdem. |

## Endzustand der Dateien

### index.html

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>FUNKEN – Das Schülerfestival</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <!-- Startseite von FUNKEN -->
    <header>
      <h1 id="oben">FUNKEN</h1>
      <p>Das Schülerfestival Heilbronn – zwei Bühnen, Foodtrucks, Open Air am Neckar.</p>
      <p id="countdown"></p>
      <p class="cta"><a href="tickets.html">Jetzt Tickets sichern</a></p>
      <img src="buehne.svg" alt="Die Hauptbühne von FUNKEN bei Nacht">
    </header>

    <nav>
      <a href="programm.html">Programm</a>
      <a href="galerie.html">Galerie</a>
      <a href="tickets.html">Tickets</a>
      <a href="#lineup">Direkt zum Line-up</a>
      <button id="nacht-knopf">Nachtmodus</button>
    </nav>

    <main>
      <button id="status-knopf">Gibt es noch Tickets?</button>
      <p id="status"></p>
      <p>Freitag, 17. und Samstag, 18. Juli 2027 auf dem alten Fabrikgelände am Neckar.</p>
      <p class="hinweis">Einlass ab 16:00 Uhr, Ende 23:00 Uhr.</p>

      <h2>Das Festival</h2>
      <p>FUNKEN wird von <strong>Schülerinnen und Schülern</strong> organisiert – <em>vom Line-up bis zum Ticketverkauf</em>.</p>
      <p>Der Erlös geht an Projekte unserer Schulen.</p>

      <h2>Auf einen Blick</h2>
      <table>
        <tr>
          <th>Was</th>
          <th>Info</th>
        </tr>
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
        <tr>
          <td>Ende</td>
          <td>23:00 Uhr</td>
        </tr>
      </table>
      <h2>Die Bühnen</h2>
      <p>Auf der <strong>Hauptbühne</strong> spielen die Headliner, im Zelt gibt es Newcomer und DJs.</p>

      <h2 id="lineup">Line-up</h2>
      <ul>
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
            <li>Lou &amp; die Lichter</li>
          </ul>
        </li>
      </ul>
      <p><button id="dabei-knopf">Ich bin dabei!</button> <span id="dabei">0</span> Leute sind dabei</p>

      <div class="foodtrucks">
        <h2>Foodtrucks</h2>
        <p><span class="neu">Neu 2027:</span> Pizza, Döner, Bubble Tea und Waffeln – <em>alles</em> auf dem Gelände.</p>
        <ul>
          <li><strong>Neu:</strong> Pizza &amp; Mehr</li>
          <li>Döner-Ecke</li>
          <li>Bubble Tea Bar</li>
          <li>Waffelwagen</li>
        </ul>
      </div>

      <h2 id="anfahrt">So kommst du hin</h2>
      <ol>
        <li>Mit der Stadtbahn bis Haltestelle Hafenstraße</li>
        <li>Den Lichtern folgen</li>
        <li>Ticket am Einlass zeigen</li>
        <li>Feiern</li>
      </ol>
      <p><a href="https://www.example.com" target="_blank">Fahrplan der Stadtbahn</a></p>

      <h2>Mehr</h2>
      <ul>
        <li><a href="https://www.example.com/schule" target="_blank">Unsere Schule</a></li>
        <li><a href="galerie.html">Fotos vom letzten Jahr</a></li>
      </ul>

      <p><a href="#oben">Nach oben</a></p>
    </main>

    <footer>
      <p>Kollektiv FUNKEN<br>Hafenstraße 9<br>74072 Heilbronn<br><a href="mailto:hallo@funken-festival-beispiel.de">hallo@funken-festival-beispiel.de</a></p>
      <p><a href="impressum.html">Impressum</a> · <a href="tickets.html">Tickets</a></p>
    </footer>
    <script src="script.js"></script>
  </body>
</html>
```

### programm.html

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Programm – FUNKEN</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
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
      <h2 id="freitag">Freitag</h2>
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
        <tr>
          <td>22:00</td>
          <td>Neonpuls</td>
          <td>Kiki Volt</td>
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
    </main>

    <footer>
      <p>Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn</p>
    </footer>
  </body>
</html>
```

### galerie.html

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Galerie – FUNKEN</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <h1>Galerie</h1>
    </header>

    <nav>
      <a href="index.html">Startseite</a>
      <a href="programm.html">Programm</a>
      <a href="tickets.html">Tickets</a>
    </nav>

    <main>
      <h2>Eindrücke</h2>
      <figure>
        <img src="crowd.svg" alt="Die Menge vor der Hauptbühne">
        <figcaption>Die Menge vor der Hauptbühne (Foto: Kollektiv FUNKEN, CC BY 4.0)</figcaption>
      </figure>
      <figure>
        <img src="plakat.svg" alt="Das Plakat 2027">
        <figcaption>Das Plakat 2027</figcaption>
      </figure>

      <h2>Foodtrucks</h2>
      <img src="foodtruck.svg" alt="Der Pizza-Truck am Abend">
      <ul>
        <li><a href="index.html">Pizza &amp; Mehr</a></li>
        <li><a href="index.html">Waffelwagen</a></li>
      </ul>

      <h2>Der FUNKEN-Jingle</h2>
      <audio controls src="jingle.wav"></audio>

      <h2 class="highlight">Aftermovie</h2>
      <video controls src="clip.webm" width="320"></video>

      <h2>Rundgang</h2>
      <ol>
        <li>Einlass</li>
        <li>Hauptbühne</li>
        <li>Zeltbühne</li>
        <li>Foodcourt</li>
      </ol>
    </main>

    <footer>
      <p>Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn</p>
    </footer>
  </body>
</html>
```

### tickets.html

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Tickets – FUNKEN</title>
    <link rel="stylesheet" href="style.css">
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
      <a href="impressum.html">Impressum</a>
    </nav>

    <main>
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

      <p>Fülle das Formular aus, wir melden uns per E-Mail.</p>
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>

        <label for="email">E-Mail</label>
        <input type="email" id="email" name="email" required>

        <label for="anzahl">Anzahl Tickets</label>
        <input type="number" id="anzahl" name="anzahl" min="1" max="4">

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

        <label for="nachricht">Nachricht (optional)</label>
        <textarea id="nachricht" name="nachricht"></textarea>

        <input type="checkbox" id="datenschutz" name="datenschutz">
        <label for="datenschutz">Ich habe die Datenschutzerklärung gelesen.</label>

        <button type="submit">Ticket reservieren</button>
      </form>

      <h2>Häufige Fragen</h2>
      <ul>
        <li><strong>Ab wie viel Jahren?</strong> – Ab 14</li>
        <li><strong>Gibt es Abendkasse?</strong> – Ja, solange Tickets da sind</li>
        <li><strong>Regen?</strong> – Wir spielen trotzdem</li>
      </ul>
    </main>

    <footer>
      <p>Kollektiv FUNKEN · Hafenstraße 9 · 74072 Heilbronn</p>
    </footer>
  </body>
</html>
```

### impressum.html

```html
<!DOCTYPE html>
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
```

### style.css

```css
/* Stylesheet der FUNKEN-Website */

body {
  color: #1b1b2f;
  background-color: #fff7e8;
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

footer {
  background-color: #1b1b2f;
  color: #fff7e8;
  padding: 16px;
  text-align: center;
}

h1 {
  color: #ff6a00;
  font-size: 48px;
  text-align: center;
}

a {
  color: #0b7dd6;
}

h2 {
  color: #d94f00;
  font-size: 28px;
}

table {
  background-color: white;
  border: 1px solid #1b1b2f;
}

.hinweis {
  color: #b34700;
  font-weight: bold;
  border: 2px solid #ff6a00;
  padding: 12px;
  margin-top: 16px;
  width: 420px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

#lineup, #anfahrt {
  color: #0b7dd6;
}

nav a {
  color: #1b1b2f;
  text-decoration: none;
}

nav a:hover {
  color: #ff6a00;
}

footer a {
  color: #ffd23f;
}

.highlight {
  color: #0b7dd6;
}

th {
  color: #ff6a00;
  text-align: left;
}

figcaption {
  color: #6b6b7a;
}

nav {
  text-align: center;
  display: flex;
  gap: 16px;
  justify-content: center;
}

main {
  max-width: 720px;
}

img {
  border-radius: 12px;
}

th, td {
  padding: 6px 10px;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1b1b2f;
  padding: 24px;
}

header h1, header p {
  color: #ffd23f;
}

.nacht {
  background-color: #1b1b2f;
  color: #fff7e8;
}

.cta a {
  background-color: #ff6a00;
  color: white;
  padding: 10px 16px;
  border-radius: 999px;
  text-decoration: none;
}

.foodtrucks ul {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.foodtrucks li {
  flex: 1;
}

figure {
  background-color: white;
  padding: 12px;
  border-radius: 12px;
  margin: 0;
}
```

### script.js

```js
// Skript der FUNKEN-Website
console.log("FUNKEN – Startseite geladen");

const festivalName = "FUNKEN";
let reservierungen = 0;
console.log(festivalName);

const preisPass = 20;
const anzahl = 3;
console.log("Summe: " + preisPass * anzahl);

const einlass = "16:00 Uhr";
console.log(festivalName + " – Einlass ab " + einlass);

const tage = 2;
console.log(festivalName + " dauert " + tage + " Tage");

const status = document.getElementById("status");
const statusKnopf = document.getElementById("status-knopf");
statusKnopf.addEventListener("click", function () {
  status.textContent = "Ja – Festivalpass und Tagestickets verfügbar.";
});

const dabeiKnopf = document.getElementById("dabei-knopf");
dabeiKnopf.addEventListener("click", function () {
  reservierungen = reservierungen + 1;
  document.getElementById("dabei").textContent = reservierungen;
  status.textContent = "Danke – bis Juli!";
});

const nachtKnopf = document.getElementById("nacht-knopf");
nachtKnopf.addEventListener("click", function () {
  document.body.classList.toggle("nacht");
});

const tageBisFunken = 42;
document.getElementById("countdown").textContent = "Noch " + tageBisFunken + " Tage bis FUNKEN";
```
