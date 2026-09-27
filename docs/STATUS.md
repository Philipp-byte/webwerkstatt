# Stand der Arbeiten (wird fortgeschrieben)

Zuletzt aktualisiert: 27.09.2026

## Fertig

- **Konzept & Pläne:** `KONZEPT.md` (Story FUNKEN, Gamification, Design), `DIDAKTIK.md` (Curriculum, Wiederholungsplan, Leitner, XP), `PROJEKT-BIBEL.md` (generiert, 82 Etappen), `AUTOREN-HANDBUCH.md`, `AUTOREN-BRIEFING.md`, `FRAGEN.md`.
- **Engine (neu):** Gelände-Karte, Kapitelseite, Lektions-Player (Soundcheck, 8 Schritt-Typen, Serie, Sterne, XP, Etappen-Speicherung, Lösungsvergleich nach 3 Fehlversuchen), Abnahme, Backstage (Blitzrunde, Fehlerjagd, Bühnenaufbau), Keycard (Ränge, Abzeichen, Kompetenzen, Sichern/Laden, Einstellungen), FUNKEN-Website-Viewer mit ZIP-Download, Showtime-Builder mit Checkliste, Vorspann (16 Szenen, SVG-Kulissen, Robby), Lehrkraft-Modus, interne Prüfung, Lernbericht (druckbar), heller/dunkler Modus, Klang, animierter Hintergrund.
- **Etappen-Kette:** 82 Etappen der FUNKEN-Website als Quellcode (`content-src/etappen/`), generiert nach `public/content/projekt/etappen.json`; Browser-Test: alle 82 bestanden (Lösung besteht, Starter fällt durch).
- **Kapitel 01** (Referenzkapitel, handgeschrieben): 3 Lektionen, Pool (17 Fragen), Abnahme (10 Aufgaben); E2E-Tests grün.
- **QA-Werkzeuge:** `validiere-inhalte.mjs`, `browser-test.mjs`, `e2e-lektion.mjs`, `e2e-abnahme.mjs`, `qa-kapitel.mjs`.

- **Kapitel 02–18:** alle geschrieben (je Kapitel `content-src/kapitel-NN.mjs`), Validator überall 0 Fehler. Gesamt: 86 Lektionen, 889 Schritte, 184 Code-Aufgaben + 82 Etappen (davon 42 Fehlerjagden), 340 Pool-Fragen, 18 Abnahmen mit 198 Aufgaben (35 Code).

## In Arbeit

- **QA je Kapitel** (Browser-Test aller Code-Aufgaben, Durchspielen jeder Lektion und Abnahme) läuft; Ergebnisse werden hier nachgetragen.

## Offen / wartet auf Philipp

- Antworten auf `FRAGEN.md` (Story, Lösungen, Abnahme-Sperre, Umfang, API-Schlüssel für Bilder, Arbeitsblätter …).
- Bilder/Videos für den Vorspann (`scripts/generate-intro-assets.mjs`, braucht `OPENAI_API_KEY` in der Umgebung).
- Feinschliff nach erstem Unterrichtseinsatz.

## So prüfst du den Stand

```
npm install
npm run dev                                   # http://localhost:5174/webwerkstatt/
node scripts/qa-kapitel.mjs 01-wie-das-web-funktioniert   # komplette Prüfung eines Kapitels
```
Lehrkraft-Modus (Keycard → Lehrkraft, Passwort `Werkstatt-2026`) schaltet alle Stationen frei.
