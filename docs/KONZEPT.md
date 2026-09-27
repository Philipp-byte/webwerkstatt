# WebWerkstatt 2 – Konzept (Neustart, 27.09.2026)

Komplett neu aufgesetzte Lernplattform für **HTML, CSS und ein wenig JavaScript** – für die Klassen 11/12 (1BK1T, TG), 16–19 Jahre, ohne Vorkenntnisse. Diesmal **mit** Gamification, eigener Geschichte, Vorspann, animiertem Design und deutlich mehr Übung.

Abgrenzung zu PyQuest (gleicher Autor, Python): PyQuest spielt in einer Akademie über den Wolken, mit 16 Fantasie-Welten, Professor Null als Gegner, Leben, Flug-Minispiel und KI-generierten Figuren. **Nichts davon wird übernommen.** Die WebWerkstatt bekommt eine eigene, geerdete Geschichte, eigene Mechaniken und eigene Minispiele.

---

## 1. Die Geschichte: „FUNKEN“

**Ort:** Heilbronn, eine alte Fabrikhalle am Neckar. Darin die **Webwerkstatt** – ein kleines Web-Studio mit zwei Leuten und einem Assistenz-Bot.

**Der Anlass:** In sechs Wochen steigt **FUNKEN**, das Schülerfestival der Stadt (zwei Bühnen, Foodtrucks, 3 000 Leute). Über Nacht ist die Festival-Website verschwunden: Die alte Agentur hat dichtgemacht, den Server abgeschaltet – und niemand hatte eine Sicherung. Kein Line-up, kein Ticketverkauf, keine Anfahrt. Das Organisationsteam, das **Kollektiv FUNKEN**, steht vor dem Nichts.

**Die Werkstatt übernimmt** – und braucht Verstärkung. Das bist du: Am ersten Tag bekommst du deine **Keycard** (dein Profil) und den Auftrag, die Website **Schritt für Schritt neu zu bauen**: erst das Gerüst (HTML), dann Licht und Farbe (CSS), dann Strom und Interaktion (JavaScript). Bis zum Festival.

**Figuren**
| Figur | Rolle | Ton |
|---|---|---|
| **Ayla Demir** | Gründerin & Lead Developerin der Werkstatt | ruhig, präzise, denkt in Struktur und Design |
| **Jonas Brandt** | Entwickler (JavaScript, Technik) | trockener Humor, Bastler |
| **Robby** | Assistenz-Bot der Werkstatt (das Robby-Maskottchen aus Philipps Unterrichtsmaterial) | prüft Code, gibt Tipps, feiert mit – erkennbar wie auf den Arbeitsblättern |
| **Sam** | Sprecher:in des Kollektivs FUNKEN, unsere Kundschaft | chaotische Energie, nimmt am Kapitelende die Arbeit ab |

Kein Bösewicht. Der Gegner ist der **Countdown** – und die **Käfer** (Bugs), die in der Fehlerjagd auftauchen.

**Der rote Faden im Unterricht:** Jede Lektion endet mit einer **Etappe** an der FUNKEN-Website (alle bauen dieselbe Seite, gleicher Zwischenstand – siehe `PROJEKT-BIBEL.md`). Erst im **Finale „Showtime“** baut jede:r eine eigene Website nach eigener Idee.

---

## 2. Gamification – die Mechaniken

| Mechanik | Was es ist | Warum |
|---|---|---|
| **XP** | Punkte für jede gelöste Aufgabe (Quiz 10, Lückentext 10, Sortieren/Paare 15, Code 30, Fehlerjagd 25, Etappe 40, Lektion +50, Abnahme 150) | sichtbarer Fortschritt |
| **Level & Rang** | Level aus XP; Ränge wie in der Ausbildung: **Praktikum → Junior → Developer → Senior → Lead → Werkstatt-Legende** | realistisch, motivierend für Berufsschüler:innen |
| **Keycard** | Profilkarte mit Rang, Level, XP-Balken, Abzeichen, Statistik; Hologramm-Optik | Identifikation ohne Konto |
| **Sterne** | 1–3 Sterne pro Lektion: 3 = fehlerfrei und ohne Tipp, 2 = ein Fehler oder Tipp, 1 = mehr | Anreiz zum Wiederholen (bestes Ergebnis zählt) |
| **Serie (Combo)** | mehrere richtige Antworten hintereinander → XP-Multiplikator (×1,25 ab 3, ×1,5 ab 6) | Flow, Aufmerksamkeit |
| **Abzeichen** | ~25 Abzeichen für Können (Listenmeister, Käferjäger …) und Verhalten (Ohne Netz, Backup-Profi, Nachtschicht …) | Sammelanreiz, Humor |
| **Soundcheck** | 3 Blitzfragen zu **früherem** Stoff am Anfang jeder Lektion (Leitner-System, siehe Didaktik) | Wiederholung, die sich nicht wie Wiederholung anfühlt |
| **Abnahme (Boss)** | am Kapitelende nimmt Sam die Arbeit ab: 8–12 gemischte Aufgaben, alt und neu, ≥ 80 % zum Bestehen; schaltet das nächste Kapitel frei | Sicherung, Spannung |
| **Backstage (Minispiele)** | **Blitzrunde** (60 s, so viele Fragen wie möglich, Combo), **Fehlerjagd** (den Fehler im Code finden), **Bühnenaufbau** (Code-Zeilen in die richtige Reihenfolge bringen) – alle speisen sich aus dem Fragenpool der bereits gelernten Kapitel | freiwilliges Üben, Highscores |
| **Gelände-Karte** | Startseite = Plan des Festivalgeländes bei Nacht; 18 Stationen (= Kapitel) gehen nach und nach an: Info-Point, Bühnenfundament, … Showtime | Fortschritt auf einen Blick, „Ich baue das Festival“ |
| **Countdown** | Story-Element im Vorspann und auf der Karte („Tage bis FUNKEN“ = Kapitel, die noch fehlen) | Dramaturgie |
| **Sicherung** | Spielstand als Datei **herunterladen/laden** (Schulrechner!) – kein Konto, keine Server | Datenschutz, PyQuest-Prinzip |

**Kein Lebens-System, kein Ranglisten-Server, keine Zeitstrafen** – Druck kommt nur aus dem Spiel, nicht aus Verlusten.

---

## 3. Didaktische Leitplanken (Details: `DIDAKTIK.md`)

1. **Wissen vor Aufgabe** – jede Aufgabe ist mit dem Text davor (und früheren Lektionen) lösbar.
2. **Die Aufgabe verrät nie die Lösung** – sie beschreibt das Ziel (Operator + Gegenstand + Bedingung), nie die Syntax. Tipps sind gestuft (Denkanstoß → konkreter Hinweis → Struktur der Lösung). Die **komplette Lösung wird nicht angezeigt**; nach drei Fehlversuchen kann ein Lösungsvergleich freigeschaltet werden, der Sterne kostet (Frage an Philipp, siehe `FRAGEN.md`).
3. **Viel Übung**: pro Lernlektion **2–3 Code-Aufgaben** (Grundübung, Variation, Transfer) statt einer, dazu Quiz/Lückentext/Sortieren/Paare.
4. **Spiralprinzip**: Soundcheck (jede Lektion), Wiederholungslektion (jedes Kapitel, verknüpft 2–3 ältere Themen), Abnahme (alt + neu), Etappen (nutzen alte Elemente weiter), Minispiele (gesamter Pool).
5. **Ein Schritt pro Seite** – blättern statt scrollen, kurze Texte (max. 70 Wörter), eine Grafik pro Lernlektion.
6. **Schülernähe**: Beispiele aus Gaming, Handy, Sneaker, Fußball, Streaming, Essen, Schule, Praktikum; die FUNKEN-Website als gemeinsames Projekt.

---

## 4. Design

**Richtung: „Werkstatt bei Nacht“** – dunkles Graphit, warme Bühnenlichter (Orange/Amber), ein kühler Akzent (Cyan). Kein Weltraum, kein Lila-Verlauf.

- **Hintergrund:** drei langsam wandernde, weich gezeichnete Bühnenlichter (CSS-Animation), feines Raster, treibende Funken (Canvas), leichte Körnung. Respektiert `prefers-reduced-motion`.
- **Schrift:** Display **Unbounded** (Titel, Ränge, Zahlen), Text **Atkinson Hyperlegible** (sehr gut lesbar, für Schule ideal), Code **JetBrains Mono**. Alle Schriften werden **selbst gehostet** (npm-Pakete, keine Google-Server – DSGVO).
- **Farbcode der Blöcke:** Grundlagen Violett `#b48cff`, HTML Orange `#ff7a45`, CSS Cyan `#38c7ff`, JavaScript Gelb `#ffd84d`, Projekt Grün `#4ade80` – die klassischen Farben der drei Sprachen, damit sie sich einprägen.
- **Heller Modus** per Schalter (Beamer im Klassenzimmer).
- **Bewegung:** ein orchestrierter Seitenaufbau (gestaffelte Einblendung), Micro-Feedback bei richtig/falsch, Konfetti bei Etappe/Lektion/Abnahme, XP-Flieger, Level-up-Overlay.
- **Klang:** synthetisch per Web Audio (richtig, falsch, XP, Fanfare, Level-up, Abzeichen), abschaltbar.

---

## 5. Vorspann (Intro)

Szenenbasiert, ~16 Szenen in drei Akten, manuell weiterklicken, jederzeit überspringbar, aus dem Profil erneut abspielbar:

1. **„Die Nacht, in der die Seite verschwand“** – Sam und das Kollektiv vor dem toten Bildschirm (404), Countdown 42 Tage.
2. **„Die Werkstatt“** – Ayla, Jonas, Robby; der Plan: Gerüst → Licht → Strom. Warum HTML zuerst.
3. **„Deine Keycard“** – du wirst Teil der Werkstatt, die Karte wird ausgestellt, die Gelände-Karte geht an, erste Station: Info-Point.

Kulissen als animierte SVG/CSS-Szenen (Skyline bei Nacht, dunkles Festivalgelände, die Halle mit leuchtenden Bildschirmen, die Keycard). Robby-Posen als PNG. Sprechblasen mit Schreibmaschinen-Effekt, Klangkulisse.

**Bild-/Videogenerierung:** Das Skript `scripts/generate-intro-assets.mjs` erzeugt mit einem OpenAI-Schlüssel (`OPENAI_API_KEY` als Umgebungsvariable der Cloud-Umgebung) Szenenbilder und legt sie unter `public/intro/assets/` ab; der Vorspann nutzt sie automatisch, wenn sie vorhanden sind – sonst die SVG-Kulissen. In der Cloud-Sitzung, in der dieses Konzept entstand, war kein Schlüssel verfügbar (die Schlüssel liegen auf Philipps Rechner, nicht in der Cloud-Umgebung).

---

## 6. Technik

- **Vite + Vanilla JS (ES-Module)**, CodeMirror 6, canvas-confetti, JSZip (Website als ZIP herunterladen). Keine Frameworks, kein Server, kein Konto.
- **Hosting:** GitHub Pages (`base: /webwerkstatt/`).
- **Speicher:** `localStorage` (`webwerkstatt2.*`), Export/Import als JSON-Datei.
- **Inhalte datengetrieben:** `public/content/curriculum.json`, `chapters/<id>/chapter.json`, `lessons/*.json`, `pool.json` (Fragenpool je Kapitel), `boss.json` (Abnahme), `konzepte.json` (Konzept-Register), `story/intro.json` (Vorspann-Szenen).
- **Qualitätssicherung:** `scripts/validiere-inhalte.mjs` (Schema + Lösungs-Leck), `scripts/pruefe-kette.mjs` (Etappen-Kette), `scripts/browser-test.mjs` (Playwright: jede Code-Aufgabe – Lösung besteht, Starter fällt durch), Route `#/pruefung` in der App.
- **Lehrkraft-Modus:** Passwort (nur SHA-256-Hash im Repo), schaltet alle Kapitel frei, verändert keinen Lernstand.

---

## 7. Routen der App

| Route | Ansicht |
|---|---|
| `#/` | Gelände-Karte (Startseite) |
| `#/intro` | Vorspann |
| `#/kapitel/<id>` | Kapitelseite: Lektionen, Sterne, Abnahme |
| `#/lektion/<kapitel>/<id>` | Lektions-Player (Soundcheck → Schritte → Abschluss) |
| `#/abnahme/<kapitel>` | Boss-Level |
| `#/backstage` | Minispiele |
| `#/keycard` | Profil, Abzeichen, Statistik, Sicherung, Einstellungen |
| `#/projekt` | die FUNKEN-Website (alle Seiten, Vorschau, ZIP-Download) |
| `#/showtime` | Finale: eigene Website mit Checkliste |
| `#/pruefung` | interne Prüfung aller Code-Aufgaben |
| `#/lehrkraft` | Lehrkraft-Modus |
| `#/bericht` | druckbarer Lernbericht (Stationen, Sterne, Abnahmen, Konzepte, Abzeichen) |
