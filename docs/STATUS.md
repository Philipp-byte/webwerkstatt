# Stand der Arbeiten (wird fortgeschrieben)

Zuletzt aktualisiert: 11.10.2026

## Fertig

- **Inhalte (unverändert gültig):** 18 Kapitel, 86 Lektionen, 889 Schritte, 266 Code-Aufgaben (82 Etappen, 42 Fehlerjagden), 340 Pool-Fragen, 18 Duelle (ehemals Abnahmen) mit 198 Aufgaben; Validator 0 Fehler; Browser-Test aller Code-Aufgaben bestanden. Quellen in `content-src/`, generiert nach `public/content/`.
- **Story SCHATTENNETZ (11.10.2026, nach Philipps Rückmeldung „Fantasiewelt, ein Gegner, mehrere Lakaien wie bei PyQuest, aber andere Story“):** Hyperia mit fünf Regionen und 18 Orten, Seidra als Gegnerin, neun Gespinste als Lakaien, Verbündete Sam/Ayla/Jonas/Robby. Texte in `public/content/story/welt.json` und `figuren.json` (Validator prüft beides). Konzept und Mockups: `VORSCHLAG-SCHATTENNETZ.md`.
- **App:** Karte von Hyperia (SVG, leuchtet Ort für Ort auf), Ort-Seite mit Einleitung (drei Sprechblasen), Weg (Lektionen, Hinterhalte, Duell), befreite Orte mit Regel und Beispiel; Lektions-Player mit Spott-Reihen der Gespinste (feste Reihenfolge, Vorstellung beim ersten Mal) und Lob der Verbündeten; fünf Hinterhalt-Spiele (Knotenjagd, Brückenbau, Wahr oder Lüge, Runenpaare, Fäden flicken) mit Timer, Sternen, Leitner-Priorität und Freischalt-Logik; Duell mit Spott, Lob, Rückzug und Finale; Ich-Seite (Statistik, Meilensteine, Was sitzt, Rekorde, Orte, Spielstand, Einstellungen); Nachlesen mit Regeln der befreiten Orte; Lernbericht; dunkles, flaches Design in Violett mit hellem Modus. Entfernt: Turnier, Crews, Zwischenspiele, Spielerkarte, Ränge, Combo, Tagesziel, Tages-Serie, Trainingslager.
- **Vorspann:** neues Storyboard (sieben Szenen, 74 s) und Soundtrack, gerendert nach `public/intro/schattennetz-intro.{mp4,webm,vtt}` + Poster. Beim ersten Start läuft das Video ohne Überspringen bis zum Ende, danach Lesefassung (sechs Bilder aus `welt.json`) und Onboarding.
- **Schulmodus:** `server/` (Flask + SQLite): Pseudonym + Passwort je Person, Rollen student/teacher/admin, Spielstand als JSON-Dokument je Account, Klassen mit Account-Generator und Druckliste, Klassenübersicht (Orte, Lektionen, Sterne, XP, zuletzt aktiv), Passwort zurücksetzen und ändern, Admin-Verwaltung der Lehrkräfte, CLI-Bootstrap, Dockerfile mit gunicorn, README. Frontend: Moduserkennung, Login, Sync (2 s gebündelt, Beacon beim Verlassen, kontogebunden), Klassenansicht, Passwort ändern unter „Ich“. Ende-zu-Ende-Test `scripts/schulmodus-test.mjs` grün (18 Prüfungen).
- **Grafik-Pipeline:** `scripts/grafiken-erzeugen.mjs` + `scripts/grafiken/auftraege.mjs` (82 Aufträge: Figuren, Orte in zwei Zuständen, Vorspann-Szenen; OpenAI Images API, WebP, transparente Figuren, Proxy-Unterstützung, Manifest). App und Storyboard nutzen vorhandene Bilder automatisch.
- **QA-Werkzeuge:** `validiere-inhalte.mjs` (jetzt mit Welt/Figuren und Warnung bei alten Turnier-Begriffen), `smoke-test.mjs` (neuer Ablauf), `schulmodus-test.mjs`, `browser-test.mjs`, `e2e-lektion.mjs`, `e2e-abnahme.mjs`, `qa-kapitel.mjs`, `intro-video/stichproben.mjs`.

## In Arbeit / wartet auf Philipp

- **Bilder erzeugen:** Die Pipeline ist fertig, konnte in der Cloud-Sitzung aber nicht laufen – es fehlen der Schlüssel (`OPENAI_API_KEY`) und die Freigabe von `api.openai.com` in den Netzwerkeinstellungen der Umgebung. Sobald beides da ist: `npm run grafiken`, danach `npm run intro:video` (Szenenbilder) und committen. Bis dahin zeigt die App Sigille.
- **Server aufsetzen:** `server/README.md` beschreibt Einrichtung, Docker, HTTPS (Reverse-Proxy) und Backup. Offen: Wo soll der Server laufen (Schulnetz, eigener Rechner, Hoster)? Siehe `FRAGEN.md`.
- Feinschliff nach dem ersten Unterrichtseinsatz.

## So prüfst du den Stand

```
npm install
npm run dev                                   # http://localhost:5174/webwerkstatt/
node scripts/validiere-inhalte.mjs            # Inhalte, Welt, Figuren
npm run smoke                                 # Rauchtest aller Ansichten
node scripts/schulmodus-test.mjs              # Schulmodus (python3 + Flask nötig)
npm run intro:video                           # Vorspann-Video neu rendern
```
Lehrkraft-Modus (Ich → Lehrkraft, Passwort `Werkstatt-2026`) schaltet alle Orte frei.
