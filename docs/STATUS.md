# Stand der Arbeiten (wird fortgeschrieben)

Zuletzt aktualisiert: 11.10.2026

## Fertig

- **Konzept & Pläne:** `KONZEPT.md` (Story WEBCUP, Gamification, Design), `DIDAKTIK.md` (Curriculum, Wiederholungsplan, Leitner, XP), `PROJEKT-BIBEL.md` (generiert, 82 Etappen), `AUTOREN-HANDBUCH.md`, `AUTOREN-BRIEFING.md`, `FRAGEN.md`.
- **Engine (neu):** Turnierplan, Runden-Seite, Lektions-Player (Soundcheck, 8 Schritt-Typen, Serie, Sterne, XP, Etappen-Speicherung, Lösungsvergleich nach 3 Fehlversuchen), Match (Abnahme), Trainingslager (Blitzrunde, Fehlerjagd, Bühnenaufbau), Spielerkarte (Ränge, Werte, Trophäenwand, Abzeichen, Kompetenzen, Sichern/Laden, Einstellungen), FUNKEN-Website-Viewer mit ZIP-Download, Showtime-Builder mit Checkliste, Vorspann (18 Szenen, SVG-Kulissen, Robby, Gegner-Captains), Lehrkraft-Modus, interne Prüfung, Lernbericht (druckbar), heller/dunkler Modus, Klang, animierter Hintergrund.
- **Etappen-Kette:** 82 Etappen der FUNKEN-Website als Quellcode (`content-src/etappen/`), generiert nach `public/content/projekt/etappen.json`; Browser-Test: alle 82 bestanden (Lösung besteht, Starter fällt durch).
- **Kapitel 01** (Referenzkapitel, handgeschrieben): 3 Lektionen, Pool (17 Fragen), Abnahme (10 Aufgaben); E2E-Tests grün.
- **QA-Werkzeuge:** `validiere-inhalte.mjs`, `browser-test.mjs`, `e2e-lektion.mjs`, `e2e-abnahme.mjs`, `qa-kapitel.mjs`.

- **Kapitel 02–18:** alle geschrieben (je Kapitel `content-src/kapitel-NN.mjs`), Validator überall 0 Fehler. Gesamt: 86 Lektionen, 889 Schritte, 184 Code-Aufgaben + 82 Etappen (davon 42 Fehlerjagden), 340 Pool-Fragen, 18 Abnahmen mit 198 Aufgaben (35 Code).

- **QA aller 18 Kapitel bestanden** (27.09.2026): Validator 0 Fehler; Browser-Test aller 341 Code-Aufgaben inkl. 82 Etappen (Lösung besteht, Starter fällt durch): 0 Probleme; jede der 86 Lektionen und alle 18 Abnahmen automatisch durchgespielt (3 Sterne bzw. 100 %), ohne Seitenfehler.

- **Story-Schicht „WEBCUP“ (27.09.2026, nach Philipps Rückmeldung „mehr spielerisch, schülernäher“):** Turnier mit 18 Gegner-Crews (`public/content/story/crews.json`), neuer Vorspann in drei Akten, Turnierplan statt Gelände-Karte, Runden-Seiten mit Gegner-Karte und Trash-Talk, Match mit Spielstand („Nachtschicht 7 : 1 Tag-Salat“), RAUS-Stempel und Niederlage-Zeile, Reaktions-Sprechblasen in Lektionen (Spott/Trost/Jubel mit Abkühlzeit), Spielerkarte mit HTML/CSS/JS-Werten und Trophäenwand, Ränge Rookie → Starter → Pro → Captain → MVP → Legende, Trainingslager, drei neue Abzeichen (Erste Runde, Halbzeit, WEBCUP-Sieger). Alle 86 Lektionen, 82 Etappen und 18 Abnahmen sind unverändert gültig; E2E-Tests (Lektion, Match) grün.

- **Überarbeitung Oktober 2026** (siehe `AENDERUNGEN-2026-10.md`): Vorspann-Video (Storyboard + Soundtrack + Renderer), Comic-Fassung und Onboarding; 54 Zwischenspiele (Anpfiff/Crew-Funk/Abpfiff) mit Szenen-Engine; Trophäenkarten und Crew-Embleme; Nachlesen-Seitenleiste, Aufgaben-Leiste, Spickzettel (88 Karten), Merksätze; Tagesziel, Tages-Serie, 7 neue Abzeichen; Startseite mit „Nächster Schritt“, Runden-Ablauf; Router-Fix; Validator für die neuen Inhalte; Rauchtest `npm run smoke`. QA: Validator 0 Fehler, Build, Rauchtest, E2E Lektion (02/01) und Match (01) grün.

## In Arbeit

- nichts – nächster Schritt ist Philipps Rückmeldung zu `AENDERUNGEN-2026-10.md` (Abschnitte 8 und 9) und `FRAGEN.md`.

## Offen / wartet auf Philipp

- Antworten auf `FRAGEN.md` (Story WEBCUP okay?, Lösungen, Match-Sperre, Umfang, API-Schlüssel für Bilder, Arbeitsblätter …).
- Sprecherstimmen für das Vorspann-Video (braucht einen TTS-Schlüssel in der Cloud-Umgebung oder eigene Aufnahmen); Szenenbilder für die Comic-Fassung (`scripts/generate-intro-assets.mjs`, `OPENAI_API_KEY`).
- Feinschliff nach erstem Unterrichtseinsatz.

## So prüfst du den Stand

```
npm install
npm run dev                                   # http://localhost:5174/webwerkstatt/
node scripts/qa-kapitel.mjs 01-wie-das-web-funktioniert   # komplette Prüfung eines Kapitels
npm run smoke                                 # Rauchtest aller Ansichten (Zwischenspiele, Nachlesen, Trophäen, mobil)
npm run intro:video                           # Vorspann-Video neu rendern
```
Lehrkraft-Modus (Spielerkarte → Lehrkraft, Passwort `Werkstatt-2026`) schaltet alle Runden frei.
