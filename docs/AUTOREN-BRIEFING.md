# Briefing: ein Kapitel schreiben

Arbeitsanweisung für Autor:innen (Mensch oder Agent), die **ein Kapitel** der WebWerkstatt 2 schreiben. Verbindlich sind zusätzlich `AUTOREN-HANDBUCH.md` (Schema, Regeln) und `DIDAKTIK.md` (Aufbau, Wiederholungsplan, Konzept-IDs). Lies beide **vollständig**, bevor du anfängst, außerdem `content-src/kapitel-01.mjs` als Referenz für Ton, Tiefe und Technik.

## 1. Was du abliefern musst

Für das Kapitel `<id>` (z. B. `04-listen`) genau **eine** Datei `content-src/kapitel-<nr>.mjs` (z. B. `content-src/kapitel-04.mjs`), die beim Ausführen mit `node` diese Dateien erzeugt:

```
public/content/chapters/<id>/lessons/<lektion>.json   – für jede Lektion aus chapter.json
public/content/chapters/<id>/pool.json                – 12–20 Fragen
public/content/chapters/<id>/boss.json                – Abnahme, 8–12 Aufgaben
```

`chapter.json` existiert schon und ist fix (Lektions-IDs und Reihenfolge nicht ändern). Die Etappen (letzter Schritt jeder Lektion) existieren schon in `public/content/projekt/etappen.json` – du referenzierst sie nur: `{ "type": "code", "etappe": "<kapitel>/<lektion>" }`.

Arbeitsablauf:
1. `cat public/content/chapters/<id>/chapter.json` – Lektionen.
2. In `public/content/projekt/etappen.json` die Etappen deines Kapitels lesen (Felder `task`, `hints`, `tests`, `files`): **Alles, was die Etappe verlangt, muss die Lektion vorher gelehrt haben** – inklusive der genauen Syntax (Tag-Namen, Attribute, Eigenschaften, Werte, Entities wie `&amp;`).
3. Datei schreiben (Vorlage: `content-src/kapitel-01.mjs`), ausführen: `node content-src/kapitel-<nr>.mjs`.
4. Prüfen: `node scripts/validiere-inhalte.mjs <id>` – so lange nachbessern, bis **0 Fehler** und möglichst 0 Warnungen.
5. **Kein Browser-Test, kein git commit** – das macht die Koordination zentral. Fasse keine Dateien anderer Kapitel an.

## 2. Aufbau einer Lernlektion (10–14 Schritte)

```
1  explain   Einstieg (Lebenswelt-Problem → Konzept), mit figure (SVG)
2  example   Werkbank zum Anfassen („Ändere X, beobachte Y“)
3  quiz      Verständnis (3–4 Optionen, plausible Fehler)
4  code      Grundübung (eng geführt, 1 Element)
5  explain   zweites Detail / Vertiefung (mit Code-Muster im ```-Block)
6  fill      Lückentext zur Syntax
7  code      Variation (anderer Kontext, leicht anders)
8  order|pair Struktur ordnen / Begriffe zuordnen
9  code      Transfer (mehrere Anforderungen, evtl. mode "fix")
10 explain   „Ab zur FUNKEN-Website“: was gleich eingebaut wird und warum (ohne Syntax), gern mit sprecher (ayla/jonas/robby/sam)
11 code      { "type": "code", "etappe": "…" }
```
Wiederholungslektion (`*-wiederholung`): explain-Intro (2 Sätze, was wiederholt wird) + 6–8 gemischte Aufgaben (quiz, fill, order, pair, 2 code) aus **diesem** Kapitel **und** den Kapiteln laut Wiederholungsplan in `DIDAKTIK.md` (Abschnitt 3) + Etappe. Projektlektion (`*-projekt-*`): explain-Intro (Meilenstein, Rückblick, was jetzt entsteht) + 1–2 Kontrollaufgaben (quiz/order) + Etappe, am Ende Hinweis auf „FUNKEN-Website ansehen“ (`#/projekt`).

## 3. Code-Aufgaben – Qualitätsregeln

- **Starter**: sinnvoller Ausgangspunkt mit Kontext (z. B. vorhandenes HTML, das ergänzt wird). Bei CSS-Aufgaben: HTML gesperrt (`"editable": ["css"]`), Starter-CSS mit Kommentar-Platzhalter. Bei JS-Aufgaben: kleines HTML plus `js`-Starter.
- **task**: Operator + Ziel + Zielwerte, **nie Syntax** (Validator prüft). Max. 50 Wörter.
- **hints**: 2–3 gestuft, **ohne Komplettlösung** (Tipp 3 = Struktur mit Lücken oder Muster aus anderem Kontext).
- **solution**: vollständiger Zielinhalt jeder editierbaren Datei. Muss alle Tests bestehen.
- **tests**: 2–6 Tests, jeder mit deutschem `label` aus Nutzersicht. **Der Starter darf die Tests nie bestehen** (prüfe im Kopf: Was ist im Starter schon da?). Bei CSS: berechnete Werte (`style`), Farben als Zielwert, `border` einzeln, `gap` als `column-gap`, Unterstreichung als `text-decoration-line`, `font-weight` als `["700","bold"]`. Bei JS: `console` (expected) und `source` (Regex), Klicks per `action`.
- **mode "fix"** (Fehlerjagd): Starter mit 1–2 Fehlern (falscher Tag, fehlender schließender Tag, Tippfehler in Eigenschaft, fehlendes Semikolon …), task beschreibt das **Symptom**, Tests prüfen das korrekte Ergebnis. Mindestens eine Fehlerjagd pro Kapitel in den Lektionen, eine in der Abnahme.
- Beispiele aus der Lebenswelt (Gaming, Handy, Sneaker, Fußball, Fitness, Streaming, Essen, Führerschein, Schule, Praktikum), keine echten Marken; die Übungsaufgaben spielen **nicht** in der FUNKEN-Website (die kommt nur in der Etappe), dürfen aber Festival-Bezug haben.
- Übungsbilder in `public/uebung/`: `buehne.svg`, `crowd.svg`, `foodtruck.svg`, `ticket.svg`, `plakat.svg`, `funken-logo.svg`, `sneaker.svg`, `controller.svg`, `pizza.svg`, `katze.svg`, `jingle.wav`, `clip.webm` – im Code einfach als Dateiname (`src="pizza.svg"`).

## 4. Fragenpool (pool.json) und Abnahme (boss.json)

- Pool: 12–20 Fragen, IDs `<nr>-01` …, jede mit `konzept` aus deinem Kapitel (DIDAKTIK Abschnitt 4), alle fünf Typen (`quiz`, `fill`, `order`, `pair`, `bug`), mindestens 3× `bug`. Fragen müssen **ohne Kontext** lösbar sein – sie erscheinen Wochen später im Soundcheck und in der Blitzrunde. Kurz halten (Quiz-Frage ≤ 25 Wörter).
- Abnahme: `title` „Abnahme: <Station>“, `intro` als Sam-Zitat (Jury des WEBCUP, chaotisch-herzlich, 1–3 Sätze, bezieht sich auf das, was gerade gebaut wurde), `bestanden: 0.8`, 8–12 Aufgaben: ~60 % dieses Kapitel, ~40 % Wiederholungskapitel; **mindestens 2 code** (ohne hints, mit starter/solution/tests, eine davon `mode: "fix"`); jede Nicht-Code-Aufgabe mit `konzept`.

## 5. Ton, Figuren, Story

- Du-Form, freundlich-direkt, konkret, kein Kindergarten, kein Büro-Deutsch. Fachbegriffe beim ersten Mal **fett** und erklärt.
- Figuren sparsam (max. 2 `sprecher`-Schritte pro Lektion): **Ayla** (Captain der Crew „Nachtschicht“, ruhig, Struktur/Design), **Jonas** (JS/Technik, trockener Humor, Backups), **Robby** (Crew-Bot, prüft, tippt, feiert), **Sam** (Kollektiv FUNKEN, Jury des WEBCUP).
- Story-Rahmen: Die Website des Schülerfestivals FUNKEN (Heilbronn, 17./18. Juli 2027) ist verschwunden; im Turnier **WEBCUP** baut die Crew „Nachtschicht“ sie mit den Lernenden neu – Runde für Runde gegen eine Gegner-Crew, die einen typischen Anfängerfehler verkörpert (`public/content/story/crews.json`). Lektionstexte bleiben davon unabhängig; die Gegner tauchen nur in Turnierplan, Runden-Seite, Match und Reaktions-Sprechblasen auf. Fakten stehen in `PROJEKT-BIBEL.md`.

## 6. Grafik (figure)

Eine Grafik pro Lernlektion (Inline-SVG, `viewBox="0 0 320 160"`, Farben nur `#ff7a45`, `#38c7ff`, `#ffd84d`, `#4ade80`, `#b48cff`, Flächen `#e8ecf7`/`#0f1320`, Text `#eef2ff` auf dunkel bzw. `#0f1320` auf hell, `font-family="sans-serif"`, ≥ 12px, ≤ ~15 Elemente, erstes Element ein `<rect>` als Hintergrund). Die Grafik zeigt den **Mechanismus** (Baum, Box-Schichten, Anfrage/Antwort …), keine Deko. Beispiele in `content-src/kapitel-01.mjs`.

## 7. Selbstkontrolle vor der Abgabe

- [ ] `node scripts/validiere-inhalte.mjs <id>` → 0 Fehler
- [ ] Jede Etappe: Alles Nötige (Elemente, Attribute, Eigenschaften, Werte, Entities, Reihenfolge) wurde vorher gezeigt – am besten in einem ```-Codeblock mit einem **anderen** Beispiel
- [ ] Jede Code-Aufgabe: Starter fällt durch, Lösung besteht (im Kopf geprüft), Tests sind konkret (Texte, Anzahl, Attribute, Werte)
- [ ] Keine Lösung in task oder hints; Tipp 3 ist keine fertige Lösung
- [ ] Wortlimits (explain ≤ 70, task ≤ 50), Abwechslung der Formate, Lebenswelt-Beispiele
- [ ] Wiederholungslektion und Abnahme greifen die Kapitel aus dem Wiederholungsplan auf
