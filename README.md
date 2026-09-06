# WebWerkstatt 🧰

Interaktive Lernplattform für **HTML, CSS und ein wenig JavaScript** im Schulunterricht — entwickelt für das **Technische Berufskolleg I (1BK1T, Fach Informationstechnik)** und das **Technische Gymnasium (Fach Informatik TG)** in Baden-Württemberg. Bewusst **ohne Gamification**: keine Punkte, keine Level — Lektionen, Häkchen, ein großes Projekt.

**➡ Live: https://philipp-byte.github.io/webwerkstatt/**

## Konzept

- **18 Kapitel, ~70 Lektionen** in vier Blöcken: Web-Grundlagen (Client/Server, URL, HTTP) → HTML → CSS inkl. Recht im Web → JavaScript.
- **Kleinschrittig und tief:** jedes Konzept wird erklärt, gezeigt, ausprobiert und geprüft — mit gestuften Tipps bis zur Musterlösung.
- **Alles selbstkorrigierend:** Quiz, Lückentexte und Code-Aufgaben mit automatischen Prüfungen (DOM, berechnete CSS-Werte, Konsole, Klick-Simulation) und verständlicher Rückmeldung.
- **Das große Projekt:** Über den ganzen Kurs bauen die Lernenden die Website des fiktiven Schülercafés **Café Pause** — Startseite, Speisekarte, Galerie, Kontaktformular, Impressum. Jede Projekt-Etappe wird gespeichert; unter „Mein Café-Projekt“ entsteht daraus eine echte, klickbare Mehrseiten-Website.
- **Spiralprinzip:** Eingebaute Wiederholungslektionen greifen früheren Stoff systematisch wieder auf.
- **Bildungsplan-genau:** Mapping der Kompetenzen beider Pläne in [docs/bildungsplan-abdeckung.md](docs/bildungsplan-abdeckung.md).

## Nutzung

### Ohne Installation (Demo-Modus)

Die GitHub-Pages-Version läuft komplett im Browser. Fortschritt und Projektstand liegen im localStorage; über die Startseite lassen sie sich als **JSON-Datei sichern und wiederherstellen** (wichtig bei Schulrechnern mit Löschung nach Neustart).

### Entwicklung

```
npm install
npm run dev        # http://localhost:5174
npm run build      # statischer Build in dist/
```

### Schulmodus (optional, mit Lehrer-Dashboard)

Ein kleiner Flask-Server speichert den Fortschritt zentral (SQLite): Schüler-Logins mit Pseudonymen, Klassenverwaltung, Fortschrittsübersicht, Kapitel-Freischaltung. Anleitung: [server/README.md](server/README.md). Die App erkennt den Server automatisch — ohne ihn läuft sie im Demo-Modus.

## Lernen mit der App

- **Blättern statt scrollen:** Jede Lektion zeigt einen Schritt pro Seite — kurz, mit Grafik, auf einen Blick. Weiter geht es per Button, Wischen nach links oder Pfeiltaste, sobald der Schritt gelöst ist; zurück jederzeit.
- **Schülernahe Beispiele:** Gaming, Handy, Sneaker, Fußball, Streaming, Schulalltag — kein Büro-Deutsch.
- **Aufgaben verraten nie die Lösung:** Sie beschreiben das Ziel mit einem Operator (erstelle, ergänze, gestalte …); die Tipps sind gestuft und freiwillig. Ein Validator meldet jeden Code-Span, der aus der Lösung stammt.
- **Jede Lektion baut an der Website:** Der letzte Schritt jeder Lektion ist eine Etappe am Café-Pause-Projekt — Wiederholungslektionen verbinden dabei mehrere frühere Themen, Projekt-Lektionen sind Meilensteine.
- **Editor mit Syntax-Highlighting** (CodeMirror 6) für HTML, CSS und JavaScript.

## Arbeitsblätter

Zwei Wege, beide im JJWS-Design:

1. **Mit den eigenen Lösungen (in der App):** In jeder Kapitelansicht gibt es „Arbeitsblatt mit deinen Lösungen“ — ein PDF, das die Aufgaben des Kapitels enthält und dazu den Code, den die Lernenden selbst geschrieben haben (nur bestandene Lösungen). Entsteht komplett im Browser (jsPDF), nichts verlässt das Gerät.
2. **Leer zum Ausdrucken:** `arbeitsblaetter/build_worksheet.py` erzeugt zu jedem Kapitel ein druckfertiges **Informations- & Aufgabenblatt** (A4-PDF, Layout der Arbeitsblatt-Skill-Familie) aus denselben Lektionsdaten — Inhalte und Blätter können nicht auseinanderlaufen. Die PDFs liegen unter `public/worksheets/` und sind aus der App verlinkt.

```
python arbeitsblaetter/build_worksheet.py --all
```

## Aufbau (datengetrieben)

```
public/content/curriculum.json              → Blöcke + Kapitelreihenfolge
public/content/chapters/<id>/chapter.json   → Titel, Icon, Farbe, Lektionsliste
public/content/chapters/<id>/lessons/*.json → Lektionen (explain/example/quiz/fill/code)
docs/projekt-cafe.md                        → verbindliches Drehbuch des Café-Projekts
docs/autoren-handbuch.md                    → Regeln und Schema für neue Lektionen
```

## Qualitätssicherung

- `node scripts/validiere-inhalte.mjs` — Schema- und Konsistenzprüfung aller Inhalte.
- Route `#/pruefung` in der App — prüft jede Code-Aufgabe: Die Musterlösung muss alle Tests bestehen, der unveränderte Starter darf sie **nicht** bestehen (Gegenprobe).

## Lizenz

MIT
