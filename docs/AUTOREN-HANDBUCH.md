# Autoren-Handbuch – WebWerkstatt 2

Verbindliche Regeln und das Schema für alle Inhalte. Ergänzend gelten `DIDAKTIK.md` (Aufbau, Wiederholungsplan, Konzept-IDs) und `PROJEKT-BIBEL.md` (Etappen der FUNKEN-Website).

## 1. Zielgruppe & Ton

16–19 Jahre, berufliche Schule, **keine Vorkenntnisse**. Deutsch, du-Form, echte Umlaute, freundlich-direkt, kein Kindergarten-Ton, keine Anglizismen ohne Erklärung. Fachbegriffe beim ersten Auftreten **fett** und erklärt. Im Fließtext typografische Anführungszeichen („…“), im Code gerade ("). Beispiele aus der Lebenswelt (Gaming, Handy, Sneaker, Fußball, Fitness, Streaming, Essen, Führerschein, Schule, Praktikum), **keine echten Marken**. Die Figuren (Ayla, Jonas, Robby, Sam) dürfen in explain-Schritten sprechen (`sprecher`), sparsam: höchstens zwei Figuren-Schritte pro Lektion.

## 2. Didaktik (nicht verhandelbar)

1. **Wissen vor Aufgabe.** Nichts wird abgeprüft, was nicht vorher in einem explain/example dieser oder einer früheren Lektion vermittelt wurde – *inklusive der genauen Schreibweise* (z. B. muss `border: 3px solid #2f6fdb;` als Muster gezeigt worden sein, bevor ein Rahmen verlangt wird).
2. **Klein kariert.** Lieber drei kurze explain-Häppchen als ein langer Text. Jedes Konzept: zeigen → ausprobieren → prüfen.
3. **Leicht → schwer** innerhalb der Lektion (Grundübung → Variation → Transfer) und über das Kapitel.
4. **Viel Übung:** Lernlektion = 2–3 `code`-Aufgaben + Quiz/Lückentext + Sortieren oder Paare + Etappe. Aufbau siehe `DIDAKTIK.md` Abschnitt 2.
5. **Selbstkorrektur:** Tests und Rückmeldungen sagen, *was* der Lernende sehen soll („Die Überschrift lautet FUNKEN“), keinen Technik-Jargon.
6. **Tipps gestuft, ohne Komplettlösung:** Tipp 1 = Denkanstoß (welches Element/welche Eigenschaft), Tipp 2 = konkreter Hinweis mit Muster *aus einem anderen Kontext* (z. B. `color: red;` statt der geforderten Farbe), Tipp 3 = Struktur der Lösung mit Lücken (z. B. „`<a href="…">…</a>` mit der Adresse aus der Aufgabe“). **Nie den fertigen Lösungscode.**
7. **Abwechslung:** nicht zweimal dasselbe Format direkt hintereinander.
8. **Beispiele zum Anfassen:** `example`-Schritte laden zum Verändern ein („Ändere X und beobachte Y“).

## 3. Die Aufgabe verrät nie die Lösung

Eine Aufgabe beschreibt, **was am Ende zu sehen sein soll** – nicht, welche Zeichen zu tippen sind.

- **Operator am Satzanfang** (bezeichnen, nennen, beschreiben, vervollständigen, erklären, anwenden, erstellen, ergänzen/erweitern, übertragen, überprüfen, entwickeln, gestalten, beurteilen …). Gerüst: `**<Operator>** <Gegenstand>, <Bedingung>.` Genau ein Operator; mehrere Leistungen → nummerierte Teilschritte, jeder mit eigenem Operator.
- **Verboten im task-Text:** CSS-Deklarationen (`padding: 20px;`), vollständige Tags mit Attributen (`<a href="…">`), fertige Zeilen aus der Lösung, JavaScript-Anweisungen (`document.getElementById("x")`), „Tipp-das-hier“-Listen. Der Validator meldet jeden Code-Span, der wörtlich in `solution` vorkommt, als **FEHLER**.
- **Erlaubt:** Fachbegriffe und Namen als Begriff (eine `<h2>`-Überschrift, die Eigenschaft `padding`, das Attribut `alt`, die Klasse `karte`, die id `status`), **Zielwerte** (Farbe `#ff6a00`, 20 Pixel, Text „FUNKEN“, Adresse `programm.html`) – nie die Syntax, in der sie stehen.

| schlecht (verrät) | gut (beschreibt das Ziel) |
|---|---|
| Ergänze `border: 3px solid #2f6fdb;` und `padding: 20px;` | **Gestalte** die Karte: ein 3 Pixel dicker, durchgezogener Rahmen in `#2f6fdb` und rundum 20 Pixel Innenabstand. |
| Schreibe `<a href="programm.html">Programm</a>` | **Erstelle** einen Link mit dem Text „Programm“, der zur Datei `programm.html` führt. |
| Füge `<meta charset="utf-8">` in den head ein | **Vervollständige** den Kopfbereich um die Zeichensatz-Angabe, damit Umlaute richtig erscheinen. |

## 4. Umfang & Textmenge (die App blättert)

Ein Schritt pro Seite, ohne Scrollen erfassbar:
- **explain: maximal 70 Wörter**, höchstens 3 kurze Absätze plus optional EIN kurzer Codeblock. Größeres Thema → zwei explain-Schritte.
- **task: maximal 50 Wörter** (Teilschritte zählen mit). Quiz-Optionen je maximal 12 Wörter.
- Lernlektion 10–14 Schritte, Wiederholungslektion Intro + 6–8 Aufgaben + Etappe, Projektlektion Intro + Kontrolle + 1–2 Etappen.

## 5. Grafiken (`figure`)

Jede Lernlektion enthält **eine Grafik** als Inline-SVG im ersten passenden explain-Schritt: `viewBox="0 0 320 160"`, keine width/height, Farben nur `#ff7a45` (HTML/orange), `#38c7ff` (CSS/cyan), `#ffd84d` (JS/gelb), `#4ade80` (grün), `#b48cff` (violett), `#e8ecf7` (helle Fläche), `#0f1320` (dunkle Fläche), Text `#eef2ff` auf dunkel bzw. `#0f1320` auf hell; `font-family="sans-serif"`, mindestens 12px; maximal ~15 Elemente; die Grafik zeigt den **Mechanismus**, keine Deko. Hintergrund der App ist dunkel – die Grafik bekommt eine eigene helle oder dunkle Fläche als erstes `<rect>`.

## 6. Dateien & Schema

```
public/content/curriculum.json                  Blöcke + Kapitelreihenfolge
public/content/konzepte.json                    Konzept-Register
public/content/chapters/<id>/chapter.json       fix – nicht ändern
public/content/chapters/<id>/lessons/<l>.json   Lektionen
public/content/chapters/<id>/pool.json          Fragenpool (Soundcheck, Backstage, Abnahme)
public/content/chapters/<id>/boss.json          Abnahme
public/content/projekt/etappen.json             GENERIERT aus content-src/etappen.mjs – nicht von Hand ändern
```

### Lektion

```json
{
  "id": "01-ueberschriften",
  "title": "Überschriften",
  "konzepte": ["html.ueberschrift"],
  "steps": [ ... ]
}
```
`konzepte` = die Konzept-IDs (siehe `DIDAKTIK.md` Abschnitt 4), die diese Lektion **neu einführt** (Wiederholungs-/Projektlektionen: leeres Array).

### Schritt-Typen

**explain** – `{ "type": "explain", "text": "Markdown", "figure": "<svg …>", "sprecher": "ayla" }` (figure und sprecher optional; sprecher ∈ ayla, jonas, robby, sam).
Markdown: `**fett**`, `*kursiv*`, `` `code` ``, ```-Codeblöcke (mit Sprache: ```html), Absätze durch Leerzeile, Listen mit `- `.

**example** – `{ "type": "example", "text": "…", "html": "…", "css": "…", "js": "…", "editable": ["css"] }` – nur benötigte Dateien; ohne `editable` ist alles editierbar.

**quiz** – `{ "type": "quiz", "question": "…", "options": ["…", "…", "…"], "correct": 0, "explanation": "warum" }` – 3–4 Optionen, explanation Pflicht, plausible Falschantworten (typische Fehler).

**fill** – `{ "type": "fill", "text": "…", "template": "Code mit ___", "accept": ["li"], "hint": "…" }`
Ein oder mehrere Lücken `___`. Bei mehreren Lücken ist `accept` ein Array von Arrays (je Lücke die akzeptierten Schreibweisen). Vergleich nach trim, Groß-/Kleinschreibung egal bei HTML-Tags.

**order** – `{ "type": "order", "text": "Bringe die Zeilen in die richtige Reihenfolge", "lines": ["<ul>", "  <li>Kakao</li>", "</ul>"] }` – 4–8 Zeilen in der **richtigen** Reihenfolge (die App mischt). Keine zwei identischen Zeilen.

**pair** – `{ "type": "pair", "text": "Ordne zu", "pairs": [["<ol>", "nummerierte Liste"], ["<ul>", "Liste mit Punkten"]] }` – 3–6 Paare, links Begriff/Code, rechts Bedeutung.

**code** – das Herzstück:
```json
{
  "type": "code",
  "task": "**Erstelle** …",
  "starter": { "html": "…", "css": "…" },
  "editable": ["css"],
  "hints": ["Denkanstoß", "konkreter Hinweis mit fremdem Muster", "Struktur mit Lücken"],
  "solution": { "css": "<vollständiger Zielinhalt der editierbaren Datei(en)>" },
  "tests": [ … ],
  "mode": "fix"
}
```
- `solution` **Pflicht** (je editierbare Datei der komplette Zielinhalt). Wird nie angezeigt, nur für interne Prüfung und den freischaltbaren Lösungsvergleich genutzt.
- `hints`: 2–3, **ohne Komplettlösung** (Regel 6).
- `mode: "fix"` = **Fehlerjagd**: der Starter enthält 1–2 Fehler, die Aufgabe beschreibt das Symptom („Die Liste hat keine Punkte“), die Tests prüfen das korrigierte Ergebnis.
- **Gegenprobe-Regel:** Der unveränderte Starter darf die Tests NIEMALS bestehen. Prüfe konkret (Textinhalte, Anzahl, Attribute, Werte).

**Etappe** (immer letzter Schritt jeder Lektion ab Kapitel 02):
```json
{ "type": "code", "etappe": "04-listen/01-ungeordnete-listen" }
```
Alles Weitere (Starter, Lösung, Aufgabe, Tipps, Tests, Projektspeicherung) kommt aus `etappen.json`. Die Etappen-ID = `<kapitel>/<lektion>`; welche Lektion welche Etappe hat, steht in `PROJEKT-BIBEL.md`. Davor steht ein kurzer explain-Schritt „Ab zur FUNKEN-Website“, der sagt, was gleich eingebaut wird und warum (ohne Syntax).

### Test-Typen (`src/engine/checker.js`)

| Typ | Felder | prüft |
|---|---|---|
| `selector` | selector, min/max/count, label | Anzahl passender Elemente |
| `text` | selector, expected (String/Array), contains?, any?, label | textContent (whitespace-normalisiert) des ersten Treffers; `any: true` = irgendein Treffer |
| `attr` | selector, attr, expected ODER matches (Regex) ODER present/absent, any?, label | Attributwert |
| `style` | selector, prop, expected (String/Array), contains?, label | getComputedStyle |
| `console` | expected (String/Array) ODER matches ODER lines, absent?, label | console.log-Ausgaben |
| `source` | file (html/css/js), matches (Regex), absent?, label | Quelltext |
| `order` | selectors: [a, b, c], label | Dokumentreihenfolge |
| `action` | action: "click" \| "input", selector, value? | führt Aktion aus (kein label) |

**Stolperfallen:** `gap` → `column-gap`/`row-gap` prüfen. Unterstreichung → `text-decoration-line`. `font-weight: bold` → `["700","bold"]`. Farben: Zielwert angeben, jede Schreibweise zählt. `border` → einzeln (`border-top-width`, `border-top-style`, `border-top-color`). `text` vergleicht das ganze textContent des ersten Treffers – bei verschachtelten Elementen `contains` oder präziseren Selektor. Jeder Test (außer action) braucht ein deutsches `label`.

### Fragenpool (`pool.json`)

```json
{
  "chapter": "04-listen",
  "fragen": [
    { "id": "04-01", "konzept": "html.ul", "type": "quiz", "question": "…", "options": ["…","…","…"], "correct": 1, "explanation": "…" },
    { "id": "04-02", "konzept": "html.ol", "type": "fill", "text": "…", "template": "<___>…</___>", "accept": [["ol"],["ol"]] },
    { "id": "04-03", "konzept": "html.liste-verschachtelt", "type": "order", "text": "…", "lines": ["…"] },
    { "id": "04-04", "konzept": "html.ul", "type": "pair", "text": "…", "pairs": [["…","…"]] },
    { "id": "04-05", "konzept": "html.ul", "type": "bug", "text": "Die Liste zeigt keine Punkte. Welche Zeile ist falsch?", "lines": ["<ul>", "  <li>Kakao</li>", "  <p>Tee</p>", "</ul>"], "line": 2, "explanation": "…" }
  ]
}
```
12–20 Fragen pro Kapitel, jedes Konzept des Kapitels mindestens zweimal, alle fünf Typen vertreten (`bug` mindestens 3× – das ist die Fehlerjagd). Fragen sind **ohne Kontext lösbar** (sie tauchen im Soundcheck späterer Lektionen und in der Blitzrunde auf). IDs `<kapitelnummer>-<lfd. Nr.>`.

### Abnahme (`boss.json`)

```json
{
  "chapter": "04-listen",
  "title": "Abnahme: Programm-Tafel",
  "intro": "Sam: „Zeig mir, dass die Tafel steht …“",
  "aufgaben": [ … 8–12 Schritte der Typen quiz, fill, order, pair, code … ],
  "bestanden": 0.8
}
```
Mischung: ~60 % aus diesem Kapitel, ~40 % aus den Wiederholungskapiteln (`DIDAKTIK.md` Abschnitt 3); mindestens 2 `code`-Aufgaben (ohne hints, mit solution und tests, eine davon `mode: "fix"`). Bestanden ab 80 % der Punkte (quiz/fill/order/pair 1 Punkt, code 3 Punkte).

## 7. Werkbank-Umgebung

- Editor-Tabs `index.html` / `style.css` / `script.js`, Live-Vorschau; bei js-Datei zusätzlich Konsole.
- Vorschau hat eine `<base>` auf `public/uebung/` → Übungsdateien relativ erreichbar: `buehne.svg`, `crowd.svg`, `foodtruck.svg`, `ticket.svg`, `plakat.svg`, `funken-logo.svg`, `sneaker.svg`, `controller.svg`, `pizza.svg`, `katze.svg`, `jingle.wav`, `clip.mp4` (kurzes Stummvideo).
- Klicks auf `#sprungmarken` scrollen; Klicks auf `xyz.html` werden abgefangen (Projekt-Navigation). Externe Links öffnen normal.
- Schreibt die Lernende ein komplettes Dokument (`<!DOCTYPE html>`…), wird es direkt gerendert; sonst wird das Snippet in ein Grundgerüst gesetzt. `<title>` ist per `text`-Test auf `title` prüfbar.

## 8. Qualitätssicherung durch dich als Autor:in

Nach jedem Kapitel ausführen und Fehler beheben:

```
node scripts/validiere-inhalte.mjs <kapitel-id>
```

Kein Browser nötig (und nicht erlaubt) – die Browser-Prüfung aller Code-Aufgaben (`node scripts/browser-test.mjs` bzw. Route `#/pruefung`) läuft zentral. Deine Pflicht: valides JSON, Schema eingehalten, Wortlimits, solution korrekt und vollständig, Gegenprobe-Regel bedacht, keine Lösung in task und hints.
