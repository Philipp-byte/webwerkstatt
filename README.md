# WebWerkstatt 2 🎆

Spielerische Lernplattform für **HTML, CSS und ein wenig JavaScript** – für die Klassen 11/12 (1BK1T Informationstechnik, TG Informatik) in Baden-Württemberg. Kein Konto, kein Server: Der Spielstand bleibt im Browser und lässt sich als Datei sichern.

**➡ Live: https://philipp-byte.github.io/webwerkstatt/**

## Die Geschichte

Sechs Wochen vor **FUNKEN**, dem Schülerfestival der Stadt, ist die Festival-Website verschwunden – die alte Agentur hat den Server abgeschaltet, ohne Sicherung. Die **Webwerkstatt** (Ayla, Jonas und der Bot Robby) übernimmt und braucht Verstärkung: die Lernenden. Mit ihrer **Keycard** arbeiten sie sich vom Praktikum zur Werkstatt-Legende hoch und bauen die Website **Schritt für Schritt** neu – erst das Gerüst (HTML), dann Licht und Farbe (CSS), zum Schluss Strom (JavaScript). Am Ende bauen sie ihre eigene Website.

## Was drin ist

- **18 Stationen** auf dem Festivalgelände (= Kapitel), 86 Lektionen, ca. 1 000 Schritte, ca. 250 Code-Aufgaben – alle selbstkorrigierend (DOM, berechnete CSS-Werte, Konsole, Klick-Simulation).
- **Gamification:** XP, Level, Ränge, Sterne, Serien-Multiplikator, 28 Abzeichen, Abnahme (Boss-Level) pro Station, drei Backstage-Minispiele (Blitzrunde, Fehlerjagd, Bühnenaufbau).
- **Wiederholung, die sitzt:** Soundcheck (Leitner-System) vor jeder Lektion, Wiederholungslektion in jedem Kapitel, Abnahmen mit altem und neuem Stoff, Etappen, die Altes weiterverwenden.
- **Das Projekt:** Alle bauen dieselbe FUNKEN-Website (Start, Programm, Galerie, Tickets, Impressum, style.css, script.js) in 82 Etappen – als echte, klickbare Website mit ZIP-Download. Finale „Showtime“: eigene Website mit automatisch geprüfter Checkliste.
- **Vorspann** mit eigener Geschichte, animierte Kulissen, Lehrkraft-Modus, heller/dunkler Modus, Klangkulisse.
- **Aufgaben verraten nie die Lösung**: Sie beschreiben das Ziel; Tipps sind gestuft und ohne Komplettlösung (Validator erzwingt das).

Konzept, Didaktik, Story: siehe [`docs/`](docs/) – `KONZEPT.md`, `DIDAKTIK.md`, `PROJEKT-BIBEL.md`, `AUTOREN-HANDBUCH.md`, `AUTOREN-BRIEFING.md`, offene Fragen in `FRAGEN.md`.

## Nutzung

```
npm install
npm run dev        # http://localhost:5174/webwerkstatt/
npm run build      # statischer Build in dist/
```

Deployment auf GitHub Pages läuft automatisch bei jedem Push auf `main` (`.github/workflows/deploy.yml`).

**Spielstand sichern:** Keycard → „Spielstand herunterladen“ (JSON) und am nächsten Rechner wieder laden – wichtig bei Schulrechnern, die nach dem Neustart gelöscht werden.

**Lehrkraft-Modus:** Keycard → Lehrkraft → Passwort (Standard `Werkstatt-2026`, im Repo liegt nur der SHA-256-Hash). Schaltet alle Stationen frei. Ändern: `node scripts/lehrkraft-passwort.mjs "neues Passwort"`.

## Aufbau (datengetrieben)

```
public/content/curriculum.json               Blöcke + Kapitelreihenfolge
public/content/konzepte.json                 Konzept-Register (Leitner)
public/content/chapters/<id>/chapter.json    Titel, Station, Icon, Farbe, Lektionsliste
public/content/chapters/<id>/lessons/*.json  Lektionen (explain/example/quiz/fill/order/pair/bug/code)
public/content/chapters/<id>/pool.json       Fragenpool (Soundcheck, Backstage)
public/content/chapters/<id>/boss.json       Abnahme
public/content/projekt/etappen.json          GENERIERT: die 82 Etappen der FUNKEN-Website
public/content/story/intro.json              Vorspann-Szenen
content-src/                                 Quellen: Etappen-Kette (etappen/*.mjs), Kapitel-Generatoren (kapitel-NN.mjs)
src/                                         App (Vite, Vanilla JS, CodeMirror 6)
```

## Qualitätssicherung

```
node scripts/baue-etappen.mjs          # Etappen-Kette → etappen.json + docs/PROJEKT-BIBEL.md
node scripts/validiere-inhalte.mjs     # Schema, Wortlimits, Lösungs-Leck, Pools, Abnahmen
npm run build && node scripts/browser-test.mjs    # jede Code-Aufgabe: Lösung besteht, Starter fällt durch (Playwright)
node scripts/e2e-lektion.mjs <kapitel> <lektion>  # eine Lektion komplett durchspielen
```

Im Browser: Route `#/pruefung` (Lehrkraft-Modus) zeigt dieselbe Prüfung.

## Bilder und Videos für den Vorspann

`scripts/generate-intro-assets.mjs` erzeugt mit einem OpenAI-Schlüssel (`OPENAI_API_KEY` als Umgebungsvariable) Szenenbilder unter `public/intro/assets/` und trägt sie in `public/content/story/intro.json` ein. Ohne Bilder nutzt der Vorspann die eingebauten SVG-Kulissen.

## Lizenz

MIT. Robby-Maskottchen: eigenes Material von Philipp Riegert.
