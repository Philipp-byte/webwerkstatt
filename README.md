# WebWerkstatt

Interaktive Lernplattform für **HTML, CSS und JavaScript** im Schulunterricht – das Schwester-Projekt zu PyQuest, bewusst **ohne Gamification**: keine XP, keine Level, nur Lektionen mit Häkchen.

## Starten

```
npm install
npm run dev
```

Die App läuft dann auf http://localhost:5174

Für den Unterricht (statische Dateien, z. B. für Moodle oder einen Schulserver):

```
npm run build
```

Das Ergebnis liegt in `dist/` und läuft ohne Server-Backend.

## Aufbau (wie PyQuest, datengetrieben)

```
public/content/curriculum.json          → Blöcke (HTML / CSS / JavaScript) + Kapitelreihenfolge
public/content/chapters/<id>/chapter.json   → Titel, Icon, Farbe, Lektionsliste
public/content/chapters/<id>/lessons/*.json → die Lektionen
public/uebung/                          → Übungsbilder (haus.svg, katze.svg, strand.svg)
```

Regeln: Kapitel-`id` = Ordnername, Lektions-`id` = Dateiname.

## Schritt-Typen einer Lektion

| Typ | Zweck |
|---|---|
| `explain` | Wissensvermittlung (Mini-Markdown: `**fett**`, `` `code` ``, ```` ``` ````-Blöcke) |
| `example` | Live-Beispiel in der Werkbank (`html`/`css`/`js`-Felder, optional `editable`) |
| `quiz` | Multiple Choice (`question`, `options`, `correct`, `explanation`) |
| `fill` | Lückentext (`template` mit `___`, `accept`-Liste, `hint`) |
| `code` | Aufgabe mit Editor, Vorschau und automatischen Tests (`starter`, `editable`, `hints`, `tests`) |

Konvention wie bei PyQuest: **Wissen vor Aufgabe**, leicht → schwer, der **letzte Hint ist immer die komplette Lösung**.

## Test-Typen für Code-Aufgaben

| Typ | prüft |
|---|---|
| `selector` | Element vorhanden (`min`, `max` oder `count`) |
| `text` | Textinhalt eines Elements (`expected`, optional `contains`) |
| `attr` | Attributwert (`expected` oder Regex `matches`) |
| `style` | berechneten CSS-Wert (`prop`, `expected`; Farben in jeder Schreibweise) |
| `console` | `console.log`-Ausgabe (`expected`, `matches` oder `lines`) |
| `source` | Quelltext per Regex (`file`, `matches`, optional `absent`) |
| `action` | führt einen Klick aus (`action: "click"`, `selector`) – für Event-Aufgaben |

Bei Aufgaben mit JS-Datei wird zusätzlich automatisch auf JavaScript-Fehler geprüft.

## Fortschritt

Wird pro Browser in `localStorage` gespeichert (`webwerkstatt.fortschritt.v1`) – kein Server, kein Konto.
