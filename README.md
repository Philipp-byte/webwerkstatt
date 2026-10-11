# WebWerkstatt 2 🕸

Spielerische Lernplattform für **HTML, CSS und ein wenig JavaScript** – für die Klassen 11/12 (1BK1T Informationstechnik, TG Informatik) in Baden-Württemberg. Läuft als **Demo ohne Konto** (Spielstand im Browser, als Datei sicherbar) oder im **Schulmodus** mit eigenem Server: Pseudonym und Passwort je Person, Spielstand zentral, Klassen-Dashboard für Lehrkräfte.

**➡ Live (Demo): https://philipp-byte.github.io/webwerkstatt/**

## Die Geschichte: SCHATTENNETZ

Heilbronn, die alte Weberei am Neckar, Mitternacht. In Sams Werkstatt steht der Große Webstuhl, und zwischen seinen Fäden öffnet sich ein Tor nach **Hyperia** – dem Reich, das aus dem Netz gewoben ist: Jede Seite ein Ort, jeder Link eine Brücke aus Licht, jede Farbe ein Strahl aus Kaskadia, jeder Funke ein Stück Leben. In der Tiefe erwacht **Seidra, die Spinnenkönigin** – einst die beste Weberin der Werkstatt, bis sie Fallen wob statt Brücken. Sie spinnt das **Schattennetz**: Brücken reißen, Farben verblassen, Funken erlöschen. Neun **Gespinste** besetzen die achtzehn Orte, jedes steht für einen typischen Anfängerfehler: Knoten (offene, falsch verschachtelte Tags), Krakel (Überschriften-Salat), Lücke (tote Links, Bilder, die nicht laden), Zerr (verschobene Tabellen), Schwindel (Formulare, die täuschen), Blass (ausgewaschene Farben und Schriften), Streu (Selektoren treffen alles oder nichts), Quetsch (gequetschte Boxen), Starr (JavaScript, das nicht reagiert).

Die Lernenden sind der neue Lehrling der Werkstatt. **Sam** (Meisterin), **Ayla** (Lichtweberin), **Jonas** (Brückenbauer) und **Robby** (der Funke) begleiten sie von Ort zu Ort durch fünf Regionen: Die Quelle (Grundlagen), Runenmark (HTML), Kaskadia (CSS), Funkenland (JavaScript), Festgelände (Showtime). An jedem Ort: Einleitung (das Gespinst stellt seine Falle vor), Lektionen, dazwischen **Hinterhalte** (kurze Spiele gegen die Uhr, die Altes zurückholen), zum Schluss das **Duell** – ab 80 % reißt das Gespinst, der Ort leuchtet auf der Karte, der nächste öffnet sich. Bei Fehlern spottet das Gespinst (in fester Reihenfolge, von Mal zu Mal frecher – und verrät dabei mehr, als es will), bei Lösungen loben die Verbündeten. Nebenbei entsteht die Website des Schülerfestivals **FUNKEN** in 82 Etappen: erst das Gerüst (HTML), dann Licht und Farbe (CSS), zum Schluss Strom (JavaScript). Beim **Funkenfest** geht sie live, und Seidra zieht sich in die Tiefe zurück.

Story-Bibel mit Mockups: [`docs/VORSCHLAG-SCHATTENNETZ.md`](docs/VORSCHLAG-SCHATTENNETZ.md). Alle Texte der Welt liegen in `public/content/story/welt.json` (Regionen, Orte, Einleitungen, Regeln, Seidra, Finale, Vorspann) und `figuren.json` (Verbündete mit Lob, Gespinste mit Vorstellung, Spott und Rückzug).

## Was drin ist

- **18 Orte** (= Kapitel) in 5 Regionen, 86 Lektionen, 889 Schritte, 266 Code-Aufgaben (davon 82 Etappen und 42 Fehlerjagden), 340 Fragen im Wiederholungspool, 18 Duelle – alles selbstkorrigierend (DOM, berechnete CSS-Werte, Konsole, Klick-Simulation).
- **Hinterhalte:** fünf Minispiele mit Zeitdruck, Sternen und Leitner-Priorität – Knotenjagd (Fehler finden), Brückenbau (Zeilen ordnen), Wahr oder Lüge, Runenpaare, Fäden flicken (Lücken füllen). Nach jeder zweiten Lektion schaltet ein Hinterhalt die nächste frei; außerdem frei spielbar mit Rekorden.
- **Figuren im Spiel:** Spott-Reihen der Gespinste bei Fehlern, Lob der Verbündeten bei Lösungen, Vorstellung beim ersten Auftritt, Rückzug nach dem Duell, Seidras Auftritte an Schlüsselorten und das Finale beim Funkenfest.
- **Gamification:** XP, Level, Sterne, Meilensteine, die Karte von Hyperia, die Ort für Ort aufleuchtet, befreite Orte mit Regel und Beispiel (im Nachlesen und auf der Ich-Seite), Hinterhalt-Rekorde. Kein Lebens-System, keine Tagesziele, kein Druck durch Verlust.
- **Wiederholung, die sitzt:** Soundcheck (Leitner-System) vor jeder Lektion, Hinterhalte, Wiederholungslektion in jedem Kapitel, Duelle mit altem und neuem Stoff, Etappen, die Altes weiterverwenden.
- **Nachlesen während jeder Aufgabe:** Erklärungen und Beispiele der Lektion, Spickzettel (88 Konzept-Karten), Regeln der befreiten Orte – nie die Lösung. Aufgaben beschreiben das Ziel, Tipps sind gestuft (der Validator erzwingt das).
- **Das Projekt:** Alle bauen dieselbe FUNKEN-Website (Start, Programm, Galerie, Tickets, Impressum, style.css, script.js) – als echte, klickbare Website mit ZIP-Download. Finale „Showtime“: eigene Website mit automatisch geprüfter Checkliste.
- **Vorspann als Video** (74 s, 1280×720, eigener Soundtrack, Untertitel): beim ersten Start läuft er einmal ganz, danach Lesefassung und Onboarding. Lehrkraft-Modus, druckbarer Lernbericht, heller/dunkler Modus, Klangkulisse.
- **Schulmodus:** Flask-Server mit SQLite, Pseudonym + Passwort je Person, Spielstand auf dem Server, Klassen-Dashboard (Accounts erzeugen, Druckliste, Fortschritt, Passwörter zurücksetzen), Admin-Verwaltung der Lehrkräfte, Dockerfile. Siehe [`server/README.md`](server/README.md).
- **Grafiken per Bild-API:** `npm run grafiken` erzeugt mit einem OpenAI-Schlüssel Figuren (Seidra, neun Gespinste, Sam, Ayla, Jonas in mehreren Posen), alle Orte in zwei Zuständen und die Vorspann-Szenen; die App und das Vorspann-Storyboard nutzen die Bilder automatisch, sonst flache SVG-Sigille.

Konzept, Didaktik, Story: siehe [`docs/`](docs/) – `KONZEPT.md`, `DIDAKTIK.md`, `VORSCHLAG-SCHATTENNETZ.md`, `PROJEKT-BIBEL.md` (Etappen), `AUTOREN-HANDBUCH.md`, `AUTOREN-BRIEFING.md`, offene Fragen in `FRAGEN.md`, Stand in `STATUS.md`.

## Nutzung

```
npm install
npm run dev        # http://localhost:5174/webwerkstatt/
npm run build      # statischer Build in dist/ (Demo, Basis /webwerkstatt/)
```

Deployment auf GitHub Pages läuft automatisch bei jedem Push auf `main` (`.github/workflows/deploy.yml`).

**Spielstand sichern (Demo):** Ich → „Spielstand herunterladen“ (JSON) und am nächsten Rechner wieder laden – wichtig bei Schulrechnern, die nach dem Neustart gelöscht werden. Im Schulmodus liegt der Spielstand auf dem Server.

**Lehrkraft-Modus:** Ich → Lehrkraft → Passwort (Standard `Werkstatt-2026`, im Repo liegt nur der SHA-256-Hash). Schaltet alle Orte frei. Ändern: `node scripts/lehrkraft-passwort.mjs "neues Passwort"`.

## Schulmodus (eigener Server)

```
WEBWERKSTATT_BASE=/ npm run build                 # App für den Server bauen (Basis /)
cd server && pip install -r requirements.txt
python app.py create-admin admin <passwort>       # ersten Admin anlegen
python app.py                                     # http://localhost:5000
```

Danach als Admin anmelden und unter **Ich → Klassen** Lehrkräfte, Klassen und Accounts anlegen; die Pseudonym-Passwort-Liste wird einmal zum Drucken gezeigt. Jede Person meldet sich mit Pseudonym und Passwort an, der Spielstand ist an jedem Rechner da. Ohne Server verhält sich die App wie bisher (sie erkennt den Modus selbst über `/api/ping`). Docker, HTTPS, Backup, API: [`server/README.md`](server/README.md). Ende-zu-Ende-Test: `node scripts/schulmodus-test.mjs`.

## Grafiken erzeugen (OpenAI-Bild-API)

```
OPENAI_API_KEY=sk-… npm run grafiken      # alle 82 Bilder, vorhandene werden übersprungen (ca. 20–40 min)
npm run grafiken:liste                     # nur die Aufträge zeigen (kein Schlüssel nötig)
npm run grafiken -- --nur seidra           # Teilmenge, z. B. nur Seidra oder --nur orte/
npm run grafiken -- --qualitaet high       # Standard: medium
npm run grafiken:manifest                  # Manifest neu schreiben
```

Ergebnis: `public/figuren/<id>/<pose>.webp` (Seidra: neutral, action, defeated, portrait; Gespinste: neutral, action, defeated; Sam, Ayla, Jonas: neutral, happy, thoughtful), `public/orte/<kapitel>/{netz,frei}.webp`, `public/intro/szenen/<n>.webp` und das Manifest `public/figuren/manifest.json`, nach dem die App entscheidet, ob sie Bilder oder Sigille zeigt. Stil und Aufträge: `scripts/grafiken/auftraege.mjs`. Ein Proxy (`HTTPS_PROXY`) wird beachtet. In der Cloud-Umgebung muss dafür `api.openai.com` in den Netzwerkeinstellungen freigegeben und der Schlüssel als Umgebungsvariable `OPENAI_API_KEY` hinterlegt sein (nie in den Chat schreiben). Nach dem Erzeugen `npm run intro:video`, damit der Vorspann die gezeichneten Szenen bekommt.

## Aufbau (datengetrieben)

```
public/content/curriculum.json               Blöcke + Kapitelreihenfolge
public/content/konzepte.json                 Konzept-Register + Spickzettel (kurz, beispiel, merke)
public/content/chapters/<id>/chapter.json    Titel, Icon, Farbe, Lektionsliste
public/content/chapters/<id>/lessons/*.json  Lektionen (explain/example/quiz/fill/order/pair/bug/code)
public/content/chapters/<id>/pool.json       Fragenpool (Soundcheck, Hinterhalte)
public/content/chapters/<id>/boss.json       Duell (Sams Prüfung + Gespinst)
public/content/projekt/etappen.json          GENERIERT: die 82 Etappen der FUNKEN-Website
public/content/story/welt.json               Hyperia: Regionen, 18 Orte (Gespinst, Einleitung, Regel, Beispiel), Seidra, Finale, Vorspann
public/content/story/figuren.json            Verbündete (Lob) und Gespinste (Vorstellung, Spott-Reihe, Rückzug)
public/figuren/, public/orte/, public/intro/ Bilder (Robby-Posen, generierte Figuren/Orte/Szenen), Vorspann-Video
scripts/intro-video/                         Storyboard (HTML), Soundtrack-Synth, Stichproben
scripts/grafiken/                            Bildaufträge und Stil für die Bild-API
content-src/                                 Quellen: Etappen-Kette (etappen/*.mjs), Kapitel-Generatoren (kapitel-NN.mjs)
server/                                      Schulmodus-Server (Flask + SQLite)
src/                                         App (Vite, Vanilla JS, CodeMirror 6)
```

Die Lektionen, Pools und Duelle werden aus `content-src/kapitel-NN.mjs` erzeugt (`node content-src/kapitel-04.mjs`) – Änderungen gehören in die Quellen.

## Qualitätssicherung

```
node scripts/baue-etappen.mjs          # Etappen-Kette → etappen.json + docs/PROJEKT-BIBEL.md
node scripts/validiere-inhalte.mjs     # Schema, Wortlimits, Lösungs-Leck, Pools, Duelle, Welt und Figuren
npm run build && node scripts/browser-test.mjs    # jede Code-Aufgabe: Lösung besteht, Starter fällt durch (Playwright)
node scripts/e2e-lektion.mjs <kapitel> <lektion>  # eine Lektion komplett durchspielen
node scripts/e2e-abnahme.mjs <kapitel>            # ein Duell komplett durchspielen
npm run smoke                                     # Rauchtest aller Ansichten: Vorspann, Ort, Lektion mit Spott/Lob, Hinterhalt, Duell, Karte, Ich, mobil (--shots)
node scripts/schulmodus-test.mjs                  # Schulmodus Ende-zu-Ende gegen den Flask-Server (braucht python3 + Flask)
```

Im Browser: Route `#/pruefung` (Lehrkraft-Modus) zeigt dieselbe Prüfung der Code-Aufgaben.

## Das Vorspann-Video

Das Video entsteht komplett lokal und reproduzierbar:

```
npm run intro:proben /tmp/proben 2,10,20.5,28,37.4,46,56,64,69.6   # Stichproben-Screenshots des Storyboards
npm run intro:video                # rendert public/intro/schattennetz-intro.mp4 (+ .webm) + Poster + Untertitel (ca. 4 Minuten)
```

`scripts/intro-video/storyboard.html` ist ein deterministischer Film (`seek(t)`, sieben Szenen nach `welt.json`: Weberei, Großer Webstuhl, Hyperia, Seidra mit dem Schattennetz über der Karte, die Werkstatt, Titel, Logo), `scripts/intro-video/musik.mjs` erzeugt den Soundtrack synthetisch (d-Moll, 100 BPM), `scripts/render-intro-video.mjs` fotografiert mit Chromium und mischt mit ffmpeg. Liegen generierte Szenenbilder unter `public/intro/szenen/`, ersetzen sie die SVG-Kulissen. Das Storyboard lässt sich mit `?play` in Echtzeit ansehen (über den Server, den `npm run intro:proben` startet).

## Lizenz

MIT. Robby-Maskottchen: eigenes Material von Philipp Riegert.
