# Autoren-Handbuch WebWerkstatt

Verbindliche Regeln für alle, die Lektionen schreiben. Ergänzend gilt die Projekt-Bibel `docs/projekt-cafe.md`.

## Zielgruppe & Ton

Schülerinnen und Schüler an beruflichen Schulen (1BK1T und TG, 16–19 Jahre), **keinerlei Vorkenntnisse**. Sprache: Deutsch, du-Form, echte Umlaute, freundlich-direkt, keine Anglizismen ohne Erklärung. Fachbegriffe beim ersten Auftreten **fett** einführen und erklären. Im Fließtext typografische Anführungszeichen („…“), im Code gerade (").

## Didaktik (nicht verhandelbar)

1. **Wissen vor Aufgabe.** Nichts wird abgeprüft, was nicht vorher in einem explain/example dieser oder einer früheren Lektion vermittelt wurde.
2. **Klein kariert.** Lieber drei kleine explain-Häppchen als ein langer Text. Jedes Konzept einzeln: erst zeigen, dann ausprobieren lassen, dann prüfen. Auch Details erklären (warum Anführungszeichen, warum Semikolon, was passiert bei Fehlern).
3. **Leicht → schwer** innerhalb der Lektion und über das Kapitel.
4. **Selbstkorrektur überall:** quiz/fill/code geben präzise Rückmeldung. Test-Labels formulieren, was der Lernende sehen soll („Die Überschrift lautet …“), nicht Technik-Jargon.
5. **Tipps gestuft:** Hint 1 = Denkanstoß, Hint 2 = konkreter Hinweis mit Beispiel, **letzter Hint = komplette lauffähige Lösung** (als ```-Codeblock, inklusive unverändertem Startercode-Kontext).
6. **Abwechslung:** nicht zweimal dasselbe Aufgabenformat direkt hintereinander.
7. **Beispiele zum Anfassen:** example-Steps laden zum Verändern ein („Ändere X und beobachte Y“).

## Umfang

- Lernlektion: 5–8 Steps (mind. 2 explain, 1 example, 1–2 quiz/fill, 1–2 code).
- Wiederholungslektion: kurzes Intro (warum Wiederholen wirkt, 2–3 Sätze) + 4–6 gemischte Aufgaben **ausschließlich aus früherem Stoff** (steht im Kapitel-Auftrag). Kein neuer Stoff!
- Projektlektion: kurzes Intro (was heute am Café entsteht, Anschluss an letzte Etappe) + 1 große Code-Aufgabe (die Etappe) — exakt nach Projekt-Bibel.

## Dateien & Schema

`public/content/chapters/<kapitel-id>/chapter.json` ist **fix** — nicht ändern. Jede dort gelistete Lektions-ID braucht `lessons/<id>.json`:

```json
{
  "id": "01-beispiel",
  "title": "Anzeigename",
  "steps": [ ... ]
}
```

### Step-Typen

**explain** – `{ "type": "explain", "text": "Markdown" }`
Markdown: `**fett**`, `` `code` ``, ```-Codeblöcke, Absätze durch Leerzeile.

**example** – `{ "type": "example", "text": "...", "html": "...", "css": "...", "js": "..." }`
Nur benötigte Dateien angeben. Optional `"editable": ["html"]` (Rest gesperrt 🔒). Ohne editable ist alles editierbar.

**quiz** – `{ "type": "quiz", "question": "...", "options": ["...", "..."], "correct": 0, "explanation": "warum" }`
2–4 Optionen, explanation immer setzen.

**fill** – `{ "type": "fill", "text": "...", "template": "Code mit ___", "solution": "li", "accept": ["li"], "hint": "..." }`
Genau eine Lücke `___`. accept = alle akzeptierten Schreibweisen (exakter Vergleich nach trim).

**code** – das Herzstück:
```json
{
  "type": "code",
  "task": "Aufgabe in Markdown, nummerierte Teilschritte",
  "starter": { "html": "...", "css": "..." },
  "editable": ["html"],
  "project": { "page": "index", "save": ["html"] },
  "hints": ["Denkanstoß", "konkreter", "```html\n<komplette Lösung>\n```"],
  "solution": { "html": "<komplette Lösung der editierbaren Datei(en)>" },
  "tests": [ ... ]
}
```
- `solution` ist **Pflicht** für jeden code-Step: je editierbarer Datei der vollständige Ziel-Inhalt. Wird von der internen Prüfung genutzt (nicht angezeigt).
- `project` nur in Projektlektionen (siehe Projekt-Bibel).
- **Gegenprobe-Regel:** Der unveränderte Starter darf die Tests NIEMALS bestehen. Wenn der Starter schon ein `<p>` enthält und du nur `selector p` prüfst, fällt die Aufgabe bei der internen Prüfung durch. Prüfe konkret genug (Textinhalte, Anzahl, Attribute).

### Test-Typen (checker.js)

| Typ | Felder | prüft |
|---|---|---|
| `selector` | selector, min/max/count, label | Anzahl passender Elemente |
| `text` | selector, expected (String/Array), contains?, label | textContent, whitespace-normalisiert, exakt (mit contains: Teilstring) |
| `attr` | selector, attr, expected ODER matches (Regex, case-insensitive), label | Attributwert |
| `style` | selector, prop, expected (String/Array), contains?, label | getComputedStyle-Wert |
| `console` | expected ODER matches ODER lines, label | console.log-Ausgaben |
| `source` | file (html/css/js), matches (Regex), absent?, label | Quelltext |
| `action` | action: "click", selector | führt Klick aus (kein label) |

**Stolperfallen (unbedingt beachten):**
- `gap` niemals direkt prüfen → `column-gap` bzw. `row-gap` verwenden.
- Unterstreichung → prop `text-decoration-line` (nicht `text-decoration`).
- `font-weight: bold` → `"expected": ["700", "bold"]`.
- Farben: jede gültige Schreibweise wird akzeptiert (red/#f00/rgb…), einfach den Zielwert angeben.
- border: einzeln prüfen (`border-top-width`, `border-top-style`, `border-top-color`).
- `text` vergleicht das GANZE textContent des ersten Treffers — bei verschachtelten Elementen ggf. `contains: true` oder präziseren Selektor nutzen.
- Jeder Test (außer action) braucht ein deutsches `label`.

### Werkbank-Umgebung

- Editor-Tabs HTML/CSS/JS, Live-Vorschau; bei js-Datei zusätzlich Konsole.
- Vorschau hat eine `<base>` auf `public/uebung/` → Übungsdateien sind relativ erreichbar: `haus.svg`, `katze.svg`, `strand.svg`, `cafe-theke.svg`, `cafe-kuchen.svg`, `cafe-raum.svg`, `cafe-jingle.wav`.
- Klicks auf `#sprungmarken` scrollen in der Vorschau; Klicks auf `xyz.html`-Links werden abgefangen (App-Navigation) — beides darf in Aufgaben vorkommen. Externe Links öffnen normal.
- Schreibt die Lernende ein komplettes Dokument (`<!DOCTYPE html>`…), wird es direkt gerendert; sonst wird das Snippet automatisch in ein Grundgerüst gesetzt. `<title>` ist per `text`-Test auf `title` prüfbar.

## Qualitätssicherung durch dich als Autor

Nach dem Schreiben eines Kapitels IMMER ausführen und Fehler beheben:

```
node scripts/validiere-inhalte.mjs <kapitel-id>
```

Wichtig: **Kein Browser nötig und nicht erlaubt** — die Browser-Gesamtprüfung (#/pruefung) läuft zentral am Ende. Deine Pflicht: valides JSON, Schema eingehalten, solution korrekt und vollständig, Gegenprobe-Regel bedacht.
