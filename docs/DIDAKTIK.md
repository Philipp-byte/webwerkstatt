# Didaktischer Plan – WebWerkstatt 2

Grundlage: Bildungsplan 1BK1T (KB 5 Seitenbeschreibungssprache, KB 3 Netzwerk-Auszug) und TG Informatik (BPE 2, 3, 19) – Mapping in `bildungsplan-abdeckung.md`. Zielgruppe 16–19, keine Vorkenntnisse, 1–2 Doppelstunden pro Woche.

## 1. Curriculum: 5 Blöcke, 18 Kapitel, 86 Lektionen

Jedes Kapitel ist eine **Station auf dem Festivalgelände**. Jede Lernlektion endet mit einer Etappe an der FUNKEN-Website (`PROJEKT-BIBEL.md`). Jedes Kapitel hat eine **Wiederholungslektion** (ab Kapitel 02), einen **Fragenpool** (`pool.json`, 12–20 Fragen) und eine **Abnahme** (`boss.json`).

| Kapitel | Station | Lektionen |
|---|---|---|
| **Block A · Backstage (Grundlagen)** | | |
| 01 Wie das Web funktioniert | Info-Point | 01 was-passiert-beim-seitenaufruf · 02 url-und-http · 03 browser-editor-standards |
| **Block B · Das Gerüst (HTML)** | | |
| 02 HTML: Erste Schritte | Fundament | 01 was-ist-html · 02 tags-und-attribute · 03 grundgeruest · 04 wiederholung · 05 projekt-startseite |
| 03 Text | Textbanner | 01 ueberschriften · 02 absaetze-umbrueche-linien · 03 hervorheben-und-kommentare · 04 wiederholung · 05 projekt-ueber-das-festival |
| 04 Listen | Programm-Tafel | 01 ungeordnete-listen · 02 geordnete-listen · 03 verschachtelte-listen · 04 wiederholung · 05 projekt-lineup |
| 05 Links | Wegweiser | 01 externe-links · 02 interne-links-und-sprungmarken · 03 mailto-und-neuer-tab · 04 wiederholung · 05 projekt-navigation |
| 06 Bilder & Medien | Foto-Wand | 01 bilder · 02 audio-und-video · 03 figure-und-bildunterschrift · 04 wiederholung · 05 projekt-galerie |
| 07 Tabellen | Timetable | 01 tabellen-aufbau · 02 kopfzeile · 03 verbundene-zellen · 04 wiederholung · 05 projekt-timetable |
| 08 Struktur & Attribute | Zonen | 01 class-und-id · 02 div-und-span · 03 semantische-elemente · 04 wiederholung · 05 projekt-seitenstruktur |
| 09 Formulare | Ticket-Schalter | 01 eingabefelder-und-labels · 02 auswahlfelder · 03 textarea-und-knoepfe · 04 wiederholung · 05 projekt-ticketformular |
| **Block C · Licht & Farbe (CSS)** | | |
| 10 CSS-Grundlagen | Lichtpult | 01 was-ist-css · 02 drei-orte-fuer-css · 03 farben · 04 hintergrund · 05 wiederholung · 06 projekt-erste-styles |
| 11 Selektoren | Spots | 01 element-und-klassen-selektor · 02 id-und-gruppen-selektor · 03 verschachtelte-selektoren · 04 hover · 05 wiederholung · 06 projekt-selektoren |
| 12 Schrift & Text | Schriftzug | 01 schriftart-und-groesse · 02 textgestaltung · 03 wiederholung · 04 projekt-typografie |
| 13 Box-Modell | Container | 01 rahmen-und-innenabstand · 02 aussenabstand-und-breite · 03 ecken-und-schatten · 04 wiederholung · 05 projekt-karten |
| 14 Flexbox | Bühnen-Layout | 01 flex-grundlagen · 02 ausrichten · 03 umbrechen-und-wachsen · 04 wiederholung · 05 projekt-layout |
| 15 Recht im Web | Sicherheitszentrale | 01 urheberrecht-und-bilder · 02 impressum-und-datenschutz · 03 projekt-impressum |
| **Block D · Strom (JavaScript)** | | |
| 16 JavaScript-Start | Stromkasten | 01 was-ist-javascript · 02 variablen · 03 rechnen-und-verbinden · 04 wiederholung · 05 projekt-erstes-skript |
| 17 JavaScript & die Seite | Schaltpult | 01 elemente-aendern · 02 auf-klick-reagieren · 03 zaehler · 04 klassen-schalten · 05 wiederholung · 06 projekt-interaktiv |
| **Block E · Showtime** | | |
| 18 Showtime | Showtime | 01 alles-zusammenfuegen · 02 grosse-wiederholung · 03 eigene-website |

## 2. Aufbau einer Lernlektion (10–14 Schritte)

```
Soundcheck (automatisch, 3 Fragen zu früherem Stoff – nicht in der JSON)
1  explain   Einstieg: Problem aus der Lebenswelt + Konzept, mit Grafik
2  example   Werkbank zum Anfassen („Ändere X, beobachte Y“)
3  quiz      Verständnis
4  code      Grundübung (1 Element, eng geführt)
5  explain   Vertiefung / zweites Detail
6  fill      Lückentext zur Syntax
7  code      Variation (etwas anders, anderer Kontext)
8  order|pair Struktur ordnen oder Begriffe zuordnen
9  code      Transfer (frei formuliert, mehrere Anforderungen)
10 explain   Überleitung „Ab zur FUNKEN-Website“
11 code      Etappe (project) – IMMER letzter Schritt
```

Wiederholungslektion: Intro (2 Sätze) + 6–8 gemischte Aufgaben aus **diesem** Kapitel und **mindestens zwei früheren** (siehe Wiederholungsplan) + Etappe, die alt und neu verbindet.
Projekt-Lektion (Meilenstein): Intro + Kontrolle + 1–2 größere Etappen + Hinweis auf `#/projekt`.

## 3. Wiederholungsplan (Spiralcurriculum)

Jede Wiederholungslektion und jede Abnahme greift Themen mit **wachsendem Abstand** wieder auf (n−1, n−2, n−4, n−8):

| Kapitel | wiederholt aus |
|---|---|
| 02 | 01 |
| 03 | 02, 01 |
| 04 | 03, 02 |
| 05 | 04, 03, 01 (URL) |
| 06 | 05, 04, 02 |
| 07 | 06, 05, 03 |
| 08 | 07, 06, 04 |
| 09 | 08, 07, 05, 01 |
| 10 | 09, 08, 06, 02 (großer HTML-Rückblick) |
| 11 | 10, 09, 07, 03 |
| 12 | 11, 10, 08, 04 |
| 13 | 12, 11, 09, 05 |
| 14 | 13, 12, 10, 06 |
| 15 | 14, 13, 11, 07 |
| 16 | 15, 14, 12, 08 |
| 17 | 16, 15, 13, 09 |
| 18 | alles |

Zusätzlich:
- **Soundcheck** vor jeder Lektion: 3 Fragen aus dem Fragenpool nach dem **Leitner-Prinzip** (Abschnitt 5).
- **Etappen** verwenden alte Elemente weiter (z. B. bekommt die Tabelle aus 07 in 13 ihren Rahmen).
- **Backstage-Minispiele** ziehen aus dem Pool aller freigeschalteten Kapitel.

## 4. Konzept-Register

Jede Lektion nennt in `konzepte` die Konzepte, die sie **einführt**. Jede Pool-Frage nennt genau ein `konzept`. IDs (Datei `public/content/konzepte.json`):

```
web.client-server  web.url  web.http  web.browser  web.standards  web.sprachen
html.tag  html.attribut  html.grundgeruest  html.verschachtelung
html.ueberschrift  html.absatz  html.br-hr  html.strong-em  html.kommentar  html.entity
html.ul  html.ol  html.liste-verschachtelt
html.a-extern  html.a-intern  html.a-sprungmarke  html.a-mailto  html.a-target
html.img  html.alt  html.audio-video  html.figure
html.table  html.th  html.colspan
html.class  html.id  html.div-span  html.semantik
html.form  html.input  html.label  html.select  html.radio-checkbox  html.textarea  html.button
css.regel  css.orte  css.link  css.farbe  css.background
css.sel-element  css.sel-klasse  css.sel-id  css.sel-gruppe  css.sel-nachfahre  css.hover
css.font-family  css.font-size  css.text-align  css.font-weight-style  css.text-decoration  css.line-height
css.border  css.padding  css.margin  css.width  css.border-radius  css.box-shadow
css.flex  css.flex-direction  css.gap  css.justify-content  css.align-items  css.flex-wrap  css.flex-grow
recht.urheberrecht  recht.lizenz  recht.impressum  recht.datenschutz  recht.fotos
js.script  js.console  js.variable  js.datentyp  js.operator  js.verkettung
js.getElementById  js.textContent  js.addEventListener  js.zaehler  js.classList
```

## 5. Leitner-System (Soundcheck)

- Jedes gelernte Konzept liegt in einer **Box 1–5**. Neu gelernt → Box 1, fällig nach 1 weiteren Lektion.
- Richtig beantwortet → eine Box höher, fällig nach 1 / 2 / 4 / 8 / 16 Lektionen (Box 1–5). Falsch → zurück in Box 1, fällig sofort.
- Der Soundcheck nimmt die **3 fälligsten Konzepte** (niedrigste Box zuerst, dann längste Wartezeit) und zieht je eine Pool-Frage dazu; sind weniger als 3 fällig, füllt er mit zufälligen gelernten Konzepten auf.
- Fragen, die schon einmal gestellt wurden, werden nach Möglichkeit nicht direkt wiederholt (Merkliste der letzten 30 Fragen-IDs).
- Die Keycard zeigt „Konzepte sicher“ (Box ≥ 4) als Kompetenz-Balken je Block – das ist die ehrliche Anzeige von Können, nicht nur von Erledigt.

## 6. XP-Ökonomie & Sterne

| Ereignis | XP |
|---|---|
| Quiz / Lückentext richtig | 10 |
| Sortieren / Paare | 15 |
| Code-Aufgabe bestanden | 30 (Fehlerjagd 25) |
| Etappe bestanden | 40 |
| Lektion abgeschlossen | 50 (+ 25 bei 3 Sternen) |
| Soundcheck-Frage richtig | 5 |
| Abnahme bestanden | 150 (+ 50 bei 100 %) |
| Backstage: Blitzrunde / Fehlerjagd / Bühnenaufbau | 5 je richtige Frage / 10 je Runde / 15 je Runde, max. 150 XP pro Tag |
| Serie (Combo) | ab 3 richtig in Folge ×1,25, ab 6 ×1,5 (nur Lektions- und Backstage-Aufgaben) |

XP gibt es **einmal** pro Schritt. Lektion wiederholen: keine neuen XP, aber die Sterne können sich verbessern (bestes Ergebnis zählt).

**Sterne:** 3 = ohne Fehler und ohne Tipp · 2 = 1–2 Fehler *oder* Tipp · 1 = alles andere. Als Fehler zählt jede falsche Antwort und jedes nicht bestandene Prüfen. Der Lösungsvergleich (nach 3 Fehlversuchen freischaltbar) setzt die Lektion auf höchstens 1 Stern.

**Level:** `xpFürLevel(n) = round(100 · (n−1)^1,5)` → Level 10 bei 2 700, Level 20 bei 8 280, Level 30 bei 15 600 XP. Gesamt sind rund 24 000 XP erreichbar (≈ Level 38).

**Ränge:** Praktikum 0 · Junior 1 500 · Developer 4 500 · Senior 9 000 · Lead 15 000 · Werkstatt-Legende 22 000.

## 7. Regeln für Aufgaben (Kurzfassung, verbindlich in `AUTOREN-HANDBUCH.md`)

1. Wissen vor Aufgabe – alles Nötige steht in einem explain/example dieser oder einer früheren Lektion.
2. Die Aufgabe beschreibt das Ziel mit **einem Operator** und verrät keine Syntax (Validator prüft Lösungs-Leck).
3. Tests prüfen das **Ergebnis** (DOM, berechnete Styles, Konsole), nicht den Wortlaut; Erhaltungstests bei Etappen.
4. Der Starter darf die Tests **nie** bestehen (Gegenprobe, Browser-Test).
5. Tipps gestuft, ohne Komplettlösung. Lösungsvergleich nur nach drei Fehlversuchen, kostet Sterne.
6. Abwechslung: kein Aufgabenformat zweimal direkt hintereinander.
7. Beispiele aus der Lebenswelt: Gaming, Handy, Sneaker, Fußball, Fitness, Streaming, Essen, Führerschein, Schule, Praktikum – keine echten Marken. Das FUNKEN-Festival als roter Faden.
