# WebWerkstatt 2 – Konzept (Stand 11.10.2026: SCHATTENNETZ)

Lernplattform für **HTML, CSS und ein wenig JavaScript** – für die Klassen 11/12 (1BK1T, TG), 16–19 Jahre, ohne Vorkenntnisse. Mit Gamification, eigener Geschichte, Vorspann-Video, dunklem flachem Design, viel Übung – und wahlweise einem Schulserver mit Pseudonym-Accounts.

Verhältnis zu PyQuest (gleicher Autor, Python): Dieselbe Grundidee – ein Gegner, mehrere Lakaien, Verbündete, die loben, Lakaien, die spotten, Schulmodus mit Pseudonymen – aber eine eigene Welt und eine eigene Geschichte. Nichts wird kopiert.

---

## 1. Die Geschichte: SCHATTENNETZ

**Rahmen:** Heilbronn, die alte Weberei am Neckar. Auf dem Gelände soll das Schülerfestival **FUNKEN** steigen, und in Sams Werkstatt entsteht die Website dafür. Im Keller steht der Große Webstuhl; zwischen seinen Fäden öffnet sich ein Tor nach **Hyperia**, dem Reich, das aus dem Netz gewoben ist: Jede Seite ein Ort, jeder Link eine Brücke aus Licht, jede Farbe ein Strahl aus Kaskadia, jeder Funke ein Stück Leben. Was im Netz gebaut wird, wird dort zu Land.

**Die Gegnerin:** **Seidra, die Spinnenkönigin** – einst die beste Weberin der Werkstatt, bis sie Fallen wob statt Brücken. Sie spinnt das **Schattennetz** über Hyperia: Brücken reißen, Farben verblassen, Funken erlöschen. Sie tritt an Schlüsselorten auf (Quellgrund, Lichtfälle, Siegelhalle, Uhrwerk) und beim Finale.

**Die Lakaien:** neun **Gespinste**, jedes verkörpert einen typischen Anfängerfehler und besetzt zwei Orte:

| Gespinst | Falle | Orte |
|---|---|---|
| **Lücke** | zerreißt Brücken: Adressen ins Leere, Bilder, die nicht laden | Quellgrund (1), Brückenstadt (5), Spiegelsee (6) |
| **Knoten** | lässt Runen offen und verschachtelt sie falsch | Runenfeld (2), Zonenmark (8) |
| **Krakel** | kritzelt Überschriften, Absätze und Listen durcheinander | Schriftfels (3), Listental (4) |
| **Zerr** | verschiebt Zellen und lässt Kopfzeilen weg | Rasterfeste (7) |
| **Schwindel** | baut Formulare, die täuschen, und nimmt, was ihm nicht gehört | Zollhaus (9), Siegelhalle (15) |
| **Blass** | wäscht Farben und Schriften aus | Lichtfälle (10), Letternkloster (12) |
| **Streu** | streut Treffer: Selektoren treffen alles oder nichts | Spotwald (11) |
| **Quetsch** | presst Boxen zusammen oder nagelt alles fest | Kistenhafen (13), Schwebegärten (14) |
| **Starr** | lässt Funken erstarren: nichts reagiert, nichts rechnet | Funkenschmiede (16), Uhrwerk (17) |
| **Seidra** | alle Fallen auf einmal | Funkenfest (18) |

**Die Werkstatt (Verbündete):**

| Figur | Rolle | Ton |
|---|---|---|
| **Sam** | Meisterin der Werkstatt | warm und streng, prüft vor jedem Duell, lobt knapp („Hält. Genau so webt man.“) |
| **Ayla** | Lichtweberin (CSS, Struktur) | ruhig, präzise |
| **Jonas** | Brückenbauer (Links, JavaScript, Technik) | trockener Humor |
| **Robby** | der Funke (Philipps Robby-Maskottchen) | leuchtet, wenn es dunkel wird; prüft, tippt, feiert |
| **Du** | der neue Lehrling | – |

**Die Welt:** fünf Regionen = fünf Blöcke des Curriculums – **Die Quelle** (Grundlagen, Violett), **Runenmark** (HTML, Orange), **Kaskadia** (CSS, Blau), **Funkenland** (JavaScript, Gold), **Festgelände** (Showtime, Grün). 18 Orte an der Lichtstraße, von Quellgrund unten links bis zum Funkenfest oben, wo Seidra sitzt.

**So läuft ein Ort:** **Einleitung** (drei Sprechblasen: das Gespinst stellt seine Falle vor, Sam nennt das Lernziel, Robby gibt die erste Regel) → **Lektionen** (dazwischen nach jeder zweiten Lektion ein **Hinterhalt**, der die nächste freischaltet) → optional der **Sturm** (Aufwärmen) → **Duell** (Sam prüft, das Gespinst zieht am Netz: gemischte Aufgaben, ab 80 % reißt das Gespinst, Rückzugs-Zeile, der Ort leuchtet, die **Regel** des Ortes mit Beispiel wird freigeschaltet, der nächste Ort öffnet sich). In den Lektionen: beim ersten Fehler stellt sich das Gespinst vor und spottet, bei jedem weiteren Fehler der nächste Spruch seiner festen Reihe (der letzte wiederholt sich) – jeder Spott verrät nebenbei die Regel; bei Lösungen loben die Verbündeten (Robby mit Pose). Der Spott zielt auf den Fehler, nie auf die Person.

**Finale:** Am Funkenfest hält das Netz, Seidra zieht sich in die Tiefe zurück („Aber ich webe weiter. Bis zum nächsten Netz.“), Robby macht das Licht an, die Website geht live – und in **Showtime** baut jede:r eine eigene.

Alle Texte: `public/content/story/welt.json` (Regionen, Orte mit Einleitung, `befreit`, Regel, Beispiel; Seidra-Auftritte; Finale; sechs Vorspann-Bilder) und `figuren.json` (Verbündete mit Lob, Gespinste mit Vorstellung, Spott-Reihe, Rückzug). Story-Bibel mit Mockups: `VORSCHLAG-SCHATTENNETZ.md`.

---

## 2. Gamification – die Mechaniken

| Mechanik | Was es ist | Warum |
|---|---|---|
| **XP & Level** | Quiz/Lückentext/Fehlerjagd 10, Sortieren/Paare 15, Code 30, Fehlerjagd-Code 25, Etappe 40, Lektion +50 (+25 fehlerfrei), Soundcheck 5, Duell 150 (+50 bei 100 %), Hinterhalt 10 + 5 je Stern (nur beim ersten Spielen eines Knotens); Level aus XP (100·(L−1)^1,5) | sichtbarer Fortschritt ohne Ränge |
| **Karte von Hyperia** | Startseite: SVG-Karte mit Regionen, Netzfäden von Seidra, goldener Weg bis zum aktuellen Ort; Orte unter dem Netz / jetzt / offen / befreit | „Ich hole mir die Welt zurück“ auf einen Blick |
| **Sterne** | 1–3 Sterne pro Lektion (3 = fehlerfrei und ohne Tipp) und 0–3 pro Hinterhalt (Trefferquote); bestes Ergebnis zählt | Anreiz zum Wiederholen |
| **Spott & Lob** | Sprechblasen der Figuren in Lektionen und Duell (siehe Abschnitt 1) | Story im Spiel, Fehler entdramatisieren, Regel wiederholen |
| **Hinterhalte** | fünf Spiele gegen die Uhr aus dem Fragenpool, Leitner-fällige Konzepte zuerst: Knotenjagd (Fehler finden, 8 Runden/60 s), Brückenbau (Zeilen ordnen, 5/90 s), Wahr oder Lüge (12/60 s), Runenpaare (3/90 s), Fäden flicken (Lückentexte, 8/90 s); Pflicht nach jeder zweiten Lektion, sonst frei spielbar mit Rekorden | Wiederholung mit Tempo und Spannung statt Dialog-Szenen |
| **Soundcheck** | 3 Blitzfragen zu früherem Stoff am Anfang jeder Lektion (Leitner-System) | Wiederholung, die sich nicht wie Wiederholung anfühlt |
| **Duell** | am Ortsende: 8–12 gemischte Aufgaben, alt und neu; ≥ 80 % → Gespinst reißt, Ort befreit, Regel freigeschaltet, nächster Ort offen; darunter Revanche; „beim ersten Versuch“ wird gezählt | Sicherung, Spannung |
| **Meilensteine** | acht: Die Quelle fließt, Die Runenmark ist frei, Kaskadia leuchtet, Das Funkenland glüht, Funkenfest, Hundert Mal sicher (Soundcheck), Fünfzig Sterne (Hinterhalte), Beim ersten Mal (drei Duelle im ersten Versuch) | wenige, große Ziele statt 30 Abzeichen |
| **Ich-Seite** | Name, Level/XP, Statistik, Meilensteine, „Was sitzt“ (Konzepte nach Leitner-Box), Hinterhalt-Rekorde, befreite Orte, Spielstand sichern/laden (Demo) bzw. Abmelden und Passwort ändern (Schulmodus), Einstellungen | Überblick ohne Spielerkarten-Kitsch |
| **Regeln der Orte** | jede Befreiung schaltet Regel + Beispiel frei: auf der Ort-Seite, auf der Ich-Seite, unter „Nachlesen“ in jeder Aufgabe | Sammeln = Wiederholen |
| **Spielstand** | Demo: `localStorage` + Datei-Export; Schulmodus: zentral auf dem Server je Account | Datenschutz, Schulrechner |

**Kein Lebens-System, kein Tagesziel, keine Serien, keine Ranglisten** – Druck kommt aus Seidra und der Uhr im Hinterhalt, nicht aus Verlusten.

---

## 3. Didaktische Leitplanken (Details: `DIDAKTIK.md`)

1. **Wissen vor Aufgabe** – jede Aufgabe ist mit dem Text davor (und früheren Lektionen) lösbar.
2. **Die Aufgabe verrät nie die Lösung** – sie beschreibt das Ziel (Operator + Gegenstand + Bedingung), nie die Syntax. Tipps sind gestuft (Denkanstoß → konkreter Hinweis → Struktur der Lösung). Die komplette Lösung wird nicht angezeigt; nach drei Fehlversuchen kann ein Lösungsvergleich freigeschaltet werden, der Sterne kostet.
3. **Viel Übung**: pro Lernlektion 2–3 Code-Aufgaben (Grundübung, Variation, Transfer), dazu Quiz/Lückentext/Sortieren/Paare.
4. **Spiralprinzip**: Soundcheck (jede Lektion), Hinterhalte (zwischen den Lektionen, Leitner-fällig zuerst), Wiederholungslektion (jedes Kapitel), Duell (alt + neu), Etappen (nutzen alte Elemente weiter).
5. **Ein Schritt pro Seite** – blättern statt scrollen, kurze Texte (max. 70 Wörter), eine Grafik pro Lernlektion, Nachlesen jederzeit.
6. **Schülernähe**: Beispiele aus Gaming, Handy, Sneaker, Fußball, Streaming, Essen, Schule, Praktikum; die FUNKEN-Website als gemeinsames Projekt; die Gespinste als Karikaturen echter Anfängerfehler.

---

## 4. Design

**Richtung: flach, dunkel, violett.** Kein Hologramm, keine Verläufe als Dekoration – Flächen, klare Kanten, eine Farbe pro Bedeutung.

- **Farben:** Hintergrund `#0f0c1f`, Panels `#1a1630`; **Gespinste Magenta** `#e23cff` (jedes Gespinst mit eigener Nuance), **Funke Gold** `#ffc53d`, Akzent `#ff6b35`; Regionen Violett `#9b8cff` (Quelle), Orange `#ff6b35` (Runenmark/HTML), Blau `#3fb0ff` (Kaskadia/CSS), Gold `#ffd166` (Funkenland/JS), Grün `#2ee59d` (Festgelände).
- **Sigille:** jedes Gespinst und Seidra haben ein flaches SVG-Sigil (Kreis mit Zeichen in der Figurenfarbe), Verbündete einen Buchstaben-Avatar, Robby seine PNG-Posen. Liegen generierte Bilder vor (`public/figuren/<id>/<pose>.webp`, Manifest), zeigt die App die Bilder.
- **Schrift:** Display **Unbounded**, Text **Atkinson Hyperlegible**, Code **JetBrains Mono** – selbst gehostet (DSGVO).
- **Heller Modus** per Schalter (Beamer), reduzierte Bewegung wird respektiert.
- **Bewegung:** Sprechblasen gleiten ein, Alarm-Streifen und Timer im Hinterhalt, Konfetti bei Etappe/Lektion/Duell, XP-Flieger, Level-up, Karte leuchtet auf.
- **Klang:** synthetisch per Web Audio (richtig, falsch, XP, Fanfare, Level-up), abschaltbar.

---

## 5. Vorspann (Intro)

**Video (Standard):** `public/intro/schattennetz-intro.mp4` (+ `.webm`, Poster, Untertitel `.vtt`) – 74 Sekunden, 1280×720, eigener synthetischer Soundtrack (d-Moll, 100 BPM). Sieben Szenen nach `welt.json → vorspann`: WebWerkstatt präsentiert → **Die alte Weberei** (Heilbronn, Neckar, Mitternacht, ein Fenster brennt) → **Der Große Webstuhl** (Sam öffnet den Keller, die Fäden leuchten, das Tor nach Hyperia) → **Hyperia** (fünf Regionen, Brücken aus Licht, Lichtfälle, Funken) → **Seidra** (vier rote Augen, Impact, das Schattennetz legt sich über die Karte, die Lichter gehen aus, neun Gespinste) → **Die Werkstatt** (Sam, Ayla, Jonas, Robby – und du) → **SCHATTENNETZ** (Titel, „Ort 1: Quellgrund. Los.“) → Logo.

**Beim ersten Start läuft das Video vollständig** (kein Überspringen, bis `ended`); danach **Onboarding** (Name, drei Regeln: Fehler sind Fäden · Wiederholung hält das Netz · Jeder Ort leuchtet) und der Weg nach Quellgrund. Später: jederzeit überspringbar, aus den Einstellungen erneut abspielbar. **Lesefassung** (sechs Bilder mit Text aus `welt.json`) als Alternative und als Fallback ohne Video.

**Produktion:** `scripts/intro-video/storyboard.html` (deterministischer Film, `seek(t)`), `musik.mjs` (Soundtrack), `render-intro-video.mjs` (Chromium + ffmpeg). Generierte Szenenbilder unter `public/intro/szenen/<n>.webp` ersetzen die SVG-Kulissen automatisch.

---

## 6. Bilder (Grafik-Pipeline)

`scripts/grafiken-erzeugen.mjs` erzeugt über die OpenAI-Bild-API (`gpt-image-1`, WebP, transparente Figuren) 82 Bilder nach `scripts/grafiken/auftraege.mjs`: Seidra (neutral, action, defeated, portrait), neun Gespinste (neutral, action, defeated), Sam/Ayla/Jonas (neutral, happy, thoughtful), 18 Orte in zwei Zuständen (unter dem Netz, befreit), sechs Vorspann-Szenen. Ein gemeinsamer Stil-Prompt (flat vector, dark fantasy, Violett/Magenta/Gold) hält alles zusammen. Das Manifest `public/figuren/manifest.json` sagt der App, welche Bilder es gibt; fehlt eines, bleibt das Sigil. Voraussetzung: `OPENAI_API_KEY` und Netzzugang zu `api.openai.com` (in der Cloud-Umgebung als Secret und Freigabe hinterlegen – nie im Chat).

---

## 7. Technik

- **Vite + Vanilla JS (ES-Module)**, CodeMirror 6, canvas-confetti, JSZip. Keine Frameworks.
- **Hosting:** GitHub Pages (`base: /webwerkstatt/`) als Demo; Schulmodus mit `WEBWERKSTATT_BASE=/` gebaut und vom Flask-Server ausgeliefert.
- **Speicher:** `localStorage` (`webwerkstatt2.spielstand.v1`, Version 3 mit Migration), Export/Import als JSON; im Schulmodus zusätzlich Sync mit dem Server (gebündelt alle 2 s, Beacon beim Verlassen, kontogebunden – fremde lokale Stände werden nicht hochgeladen).
- **Schulmodus (`server/`):** Flask + SQLite, Tabellen `classes`, `users` (Pseudonym, Hash, Rolle, Klasse), `progress` (Spielstand als JSON je Account + Kennzahlen); Routen `/api/ping`, `/login`, `/logout`, `/password`, `/progress`, `/teacher/*`, `/admin/*`; Sitzung per Cookie (120 Tage); CLI `create-admin`/`create-user`; Dockerfile mit gunicorn. Details `server/README.md`.
- **Inhalte datengetrieben:** `public/content/curriculum.json`, `chapters/<id>/{chapter,pool,boss}.json` + `lessons/*.json` (generiert aus `content-src/kapitel-NN.mjs`), `projekt/etappen.json` (generiert), `konzepte.json`, `story/welt.json`, `story/figuren.json`.
- **Qualitätssicherung:** `scripts/validiere-inhalte.mjs` (Schema, Lösungs-Leck, Welt, Figuren, alte Begriffe), `browser-test.mjs`, `e2e-lektion.mjs`/`e2e-abnahme.mjs`, `smoke-test.mjs`, `schulmodus-test.mjs`, Route `#/pruefung`.
- **Lehrkraft-Modus:** Passwort (SHA-256-Hash im Repo), schaltet alle Orte frei, verändert keinen Lernstand.

---

## 8. Routen der App

| Route | Ansicht |
|---|---|
| `#/` | Karte von Hyperia (Startseite): Weiter-Karte, Seidra-Auftritt, Regionen mit Orten |
| `#/intro` | Vorspann (Video, Lesefassung, Onboarding) |
| `#/ort/<id>` | Ort: Einleitung, Weg (Lektionen, Hinterhalte, Sturm, Duell), Regel nach der Befreiung |
| `#/lektion/<kapitel>/<id>` | Lektions-Player (Soundcheck → Schritte → Abschluss, Spott und Lob) |
| `#/hinterhalt/<kapitel>/<spiel>/<knoten>` | Hinterhalt (fünf Spiele); `#/hinterhalt` = freies Spielen |
| `#/duell/<kapitel>` | Duell gegen das Gespinst des Ortes |
| `#/ich` | Ich: Statistik, Meilensteine, Was sitzt, Rekorde, Orte, Spielstand, Einstellungen |
| `#/projekt` | die FUNKEN-Website (alle Seiten, Vorschau, ZIP-Download) |
| `#/showtime` | Finale: eigene Website mit Checkliste |
| `#/spickzettel` | alle Konzept-Karten mit Lernstand |
| `#/bericht` | druckbarer Lernbericht (Orte, Sterne, Duelle, Konzepte, Meilensteine) |
| `#/pruefung` | interne Prüfung aller Code-Aufgaben (Lehrkraft-Modus) |
| `#/lehrkraft` | Lehrkraft-Modus |
| `#/login` | Anmeldung (Schulmodus) |
| `#/klasse` | Klassen-Dashboard für Lehrkräfte und Admins (Schulmodus) |

Alte Adressen (`#/kapitel/…`, `#/abnahme/…`, `#/backstage`, `#/keycard`) leiten auf die neuen Ansichten um.
