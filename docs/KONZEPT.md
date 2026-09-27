# WebWerkstatt 2 – Konzept (Neustart, 27.09.2026)

Komplett neu aufgesetzte Lernplattform für **HTML, CSS und ein wenig JavaScript** – für die Klassen 11/12 (1BK1T, TG), 16–19 Jahre, ohne Vorkenntnisse. Diesmal **mit** Gamification, eigener Geschichte, Vorspann, animiertem Design und deutlich mehr Übung.

Abgrenzung zu PyQuest (gleicher Autor, Python): PyQuest spielt in einer Akademie über den Wolken, mit 16 Fantasie-Welten, Professor Null als Gegner, Leben, Flug-Minispiel und KI-generierten Figuren. **Nichts davon wird übernommen.** Die WebWerkstatt bekommt eine eigene, geerdete Geschichte mit Turnier-Dramaturgie, eigene Mechaniken und eigene Minispiele.

---

## 1. Die Geschichte: „WEBCUP“

**Ort:** Heilbronn, das alte Fabrikgelände am Neckar. In 42 Tagen steigt dort **FUNKEN**, das Schülerfestival der Stadt (zwei Bühnen, Foodtrucks, 3 000 Leute).

**Der Anlass:** Über Nacht ist die Festival-Website verschwunden – die Agentur hat dichtgemacht, den Server abgeschaltet, keine Sicherung. Sam vom **Kollektiv FUNKEN** macht aus der Katastrophe ein Event: den **WEBCUP**. 18 Crews aus der ganzen Stadt treten im K.-o.-Modus gegeneinander an, 18 Runden, eine Jury (Sam). Die Gewinner-Website geht am Festival live.

**Deine Crew: die Nachtschicht.** Halle 7, zwei Leute, ein Bot, null Budget – der Underdog des Turniers. Du bist der **Rookie** mit eigener **Spielerkarte** (Rang, Level, Werte für HTML/CSS/JS, Trophäenwand).

**Die Gegner:** 18 Crews, jede steht für einen typischen Anfängerfehler – genau den lernst du in der jeweiligen Runde besser zu machen:

| Runde | Crew (Captain) | Schwäche |
|---|---|---|
| 1 | Die Offliner (Kev Kabel) | glauben, das Internet liegt auf ihrem Laptop |
| 2 | Tag-Salat (Lui Löffel) | schließen keine Tags |
| 3 | CAPSLOCK CREW (MAX LAUT) | alles ist h1, fett und in Großbuchstaben |
| 4 | Kommakinder (Kim Komma) | Listen als endlose Komma-Sätze |
| 5 | Hier-klicken-Gang (Hank Hier) | jeder Link heißt „hier klicken“ |
| 6 | Team Ladefehler (Lea Leer) | kaputte Bilder, kein Alternativtext |
| 7 | Tabellenritter (Sir Tab) | Layout aus Tabellen, keine Kopfzeile |
| 8 | div-Division (Dave Div) | alles ist ein div |
| 9 | Unlabeled (Nina Nix) | Formulare ohne Beschriftung |
| 10 | Inline Kings (King Style) | CSS als style-Attribut an jedem Element |
| 11 | Die Wichtigtuer (Ida Important) | !important statt Selektoren |
| 12 | 17 Schriftarten (Fonta Fett) | siebzehn Schriften, zentriert, unterstrichen |
| 13 | Randlos (Rita Rand) | Text klebt am Rahmen |
| 14 | Absolut Positiv (Abs Olut) | alles absolut positioniert |
| 15 | Copy & Paste Crew (Ctrl Vau) | klauen Bilder, kein Impressum |
| 16 | Alert Alarm (Al Ert) | jede Ausgabe ein alert, jede Variable heißt x |
| 17 | Team Popup (Poppy Up) | Popups überall, Knöpfe ohne Wirkung |
| 18 | Team Template (GEN-1) | lassen alles generieren, verstehen nichts |

Jede Crew hat Farbe, Icon, Trash-Talk vor dem Match, Spott-Sprüche bei Fehlern und eine Niederlage-Zeile (`public/content/story/crews.json`). Der Endgegner Team Template ist bewusst gewählt: „Warum lernen, wenn man klicken kann?“ – die Nachtschicht gewinnt, weil sie versteht, was sie baut.

**Figuren der Nachtschicht**
| Figur | Rolle | Ton |
|---|---|---|
| **Ayla** | Captain · Gerüst & Licht | ruhig, präzise, denkt in Struktur und Design |
| **Jonas** | Strom & Backups | trockener Humor, Bastler |
| **Robby** | Crew-Bot (Philipps Robby-Maskottchen) | prüft Code, gibt Tipps, feiert mit, zählt die rausgeflogenen Crews |
| **Sam** | Kollektiv FUNKEN, Jury des WEBCUP | chaotische Energie, nimmt jedes Match ehrlich ab |

**So läuft eine Runde:** **Training** (die Lektionen des Kapitels inkl. Etappe an der FUNKEN-Website) → **Match** (die Abnahme durch die Jury Sam: gemischte Aufgaben, jeder Punkt geht an die Nachtschicht oder an die Gegner-Crew; ab 80 % ist die Runde gewonnen, die Crew fliegt raus – RAUS-Stempel auf Turnierplan und Trophäenwand). Während des Trainings melden sich Gegner (Spott beim ersten Fehlversuch) und Crew (Trost beim zweiten, Jubel bei Serien und Comebacks) in kleinen Sprechblasen – dosiert, mit Abkühlzeit.

**Der Turnier-Auftrag** bleibt die FUNKEN-Website: Alle bauen dieselbe Seite in 82 Etappen, gleicher Zwischenstand für alle (siehe `PROJEKT-BIBEL.md`). Erst im **Finale „Showtime“** baut jede:r eine eigene Website nach eigener Idee.

---

## 2. Gamification – die Mechaniken

| Mechanik | Was es ist | Warum |
|---|---|---|
| **XP** | Punkte für jede gelöste Aufgabe (Quiz 10, Lückentext 10, Sortieren/Paare 15, Code 30, Fehlerjagd 25, Etappe 40, Lektion +50, Match 150) | sichtbarer Fortschritt |
| **Level & Rang** | Level aus XP; Ränge wie auf einer Spielerkarte: **Rookie → Starter → Pro → Captain → MVP → Legende** | motivierend, passt zum Turnier |
| **Spielerkarte** | Sammelkarte mit Rang, Level, XP-Balken, **Werten für HTML/CSS/JS** (5–99, aus Lektionen und Leitner-Boxen), Trophäenwand der besiegten Crews, Abzeichen, Statistik; Hologramm-Optik | Identifikation ohne Konto |
| **Sterne** | 1–3 Sterne pro Lektion: 3 = fehlerfrei und ohne Tipp, 2 = ein Fehler oder Tipp, 1 = mehr | Anreiz zum Wiederholen (bestes Ergebnis zählt) |
| **Serie (Combo)** | mehrere richtige Antworten hintereinander → XP-Multiplikator (×1,25 ab 3, ×1,5 ab 6) | Flow, Aufmerksamkeit |
| **Abzeichen** | 30 Abzeichen für Können (Listenmeister, Käferjäger …), Verhalten (Ohne Netz, Backup-Profi, Nachtschicht …) und Turnier (Erste Runde, Halbzeit, WEBCUP-Sieger) | Sammelanreiz, Humor |
| **Soundcheck** | 3 Blitzfragen zu **früherem** Stoff am Anfang jeder Lektion (Leitner-System, siehe Didaktik) | Wiederholung, die sich nicht wie Wiederholung anfühlt |
| **Match (Abnahme, Boss)** | am Kapitelende tritt die Nachtschicht gegen die Gegner-Crew an, Sam ist Jury: 8–12 gemischte Aufgaben, alt und neu, Spielstand „Nachtschicht 7 : 1 Tag-Salat“; ≥ 80 % → Runde gewonnen, Crew raus, nächste Runde frei; darunter Revanche | Sicherung, Spannung |
| **Reaktionen** | Sprechblasen der Gegner-Crew (Spott beim ersten Fehlversuch, 70 %) und der eigenen Crew (Trost beim zweiten, Jubel bei jeder dritten Serie und bei Comebacks); nie mehr als eine zugleich, 20 s Abkühlzeit | Story im Spiel, Humor, Fehler entdramatisieren |
| **Trainingslager (Minispiele)** | **Blitzrunde** (60 s, Combo), **Fehlerjagd** (den Fehler im Code finden), **Bühnenaufbau** (Code-Zeilen sortieren) – aus dem Fragenpool der bereits gelernten Kapitel, 150 XP Tagesdeckel | freiwilliges Üben, Highscores |
| **Turnierplan** | Startseite: Karte des Festivalgeländes bei Nacht mit 18 Stationen (= Runden) plus Runden-Karten je Block mit Gegner-Crew, Status (gesperrt / jetzt / RAUS-Stempel), Sternen | Fortschritt auf einen Blick, „Ich räume das Turnier ab“ |
| **Runden-Zähler** | „Aktuelle Runde 3 / 18 · 2 Crews rausgeworfen · 16 Runden bis zum Pokal“ | Dramaturgie |
| **Sicherung** | Spielstand als Datei **herunterladen/laden** (Schulrechner!) – kein Konto, keine Server | Datenschutz, PyQuest-Prinzip |

**Kein Lebens-System, kein Ranglisten-Server, keine Zeitstrafen** – Druck kommt nur aus dem Spiel, nicht aus Verlusten. Der Spott der Gegner ist immer auf die Crew gemünzt („Wieder daneben? Willkommen im Salat.“), nie auf die Person.

---

## 3. Didaktische Leitplanken (Details: `DIDAKTIK.md`)

1. **Wissen vor Aufgabe** – jede Aufgabe ist mit dem Text davor (und früheren Lektionen) lösbar.
2. **Die Aufgabe verrät nie die Lösung** – sie beschreibt das Ziel (Operator + Gegenstand + Bedingung), nie die Syntax. Tipps sind gestuft (Denkanstoß → konkreter Hinweis → Struktur der Lösung). Die **komplette Lösung wird nicht angezeigt**; nach drei Fehlversuchen kann ein Lösungsvergleich freigeschaltet werden, der Sterne kostet (Frage an Philipp, siehe `FRAGEN.md`).
3. **Viel Übung**: pro Lernlektion **2–3 Code-Aufgaben** (Grundübung, Variation, Transfer) statt einer, dazu Quiz/Lückentext/Sortieren/Paare.
4. **Spiralprinzip**: Soundcheck (jede Lektion), Wiederholungslektion (jedes Kapitel, verknüpft 2–3 ältere Themen), Match (alt + neu), Etappen (nutzen alte Elemente weiter), Minispiele (gesamter Pool).
5. **Ein Schritt pro Seite** – blättern statt scrollen, kurze Texte (max. 70 Wörter), eine Grafik pro Lernlektion.
6. **Schülernähe**: Beispiele aus Gaming, Handy, Sneaker, Fußball, Streaming, Essen, Schule, Praktikum; die FUNKEN-Website als gemeinsames Projekt; die Gegner-Crews als Karikaturen echter Anfängerfehler.

---

## 4. Design

**Richtung: „Werkstatt bei Nacht“** – dunkles Graphit, warme Bühnenlichter (Orange/Amber), ein kühler Akzent (Cyan). Kein Weltraum, kein Lila-Verlauf.

- **Hintergrund:** drei langsam wandernde, weich gezeichnete Bühnenlichter (CSS-Animation), feines Raster, treibende Funken (Canvas), leichte Körnung. Respektiert `prefers-reduced-motion`.
- **Schrift:** Display **Unbounded** (Titel, Ränge, Zahlen), Text **Atkinson Hyperlegible** (sehr gut lesbar, für Schule ideal), Code **JetBrains Mono**. Alle Schriften werden **selbst gehostet** (npm-Pakete, keine Google-Server – DSGVO).
- **Farbcode der Blöcke:** Grundlagen Violett `#b48cff`, HTML Orange `#ff7a45`, CSS Cyan `#38c7ff`, JavaScript Gelb `#ffd84d`, Projekt Grün `#4ade80` – die klassischen Farben der drei Sprachen, damit sie sich einprägen. Jede Gegner-Crew hat zusätzlich eine eigene Farbe und ein Icon.
- **Heller Modus** per Schalter (Beamer im Klassenzimmer).
- **Bewegung:** ein orchestrierter Seitenaufbau (gestaffelte Einblendung), Micro-Feedback bei richtig/falsch, Konfetti bei Etappe/Lektion/Match, XP-Flieger, Level-up-Overlay, RAUS-Stempel, Reaktions-Sprechblasen.
- **Klang:** synthetisch per Web Audio (richtig, falsch, XP, Fanfare, Level-up, Abzeichen), abschaltbar.

---

## 5. Vorspann (Intro)

Szenenbasiert, 18 Szenen in drei Akten, manuell weiterklicken, jederzeit überspringbar, aus der Spielerkarte erneut abspielbar:

1. **„Der Aufruf“** – Sam vor dem toten Bildschirm (404); statt zu heulen ruft Sam den WEBCUP aus; der Turnierplan; die ersten Gegner tönen (Kev Kabel, GEN-1).
2. **„Die Nachtschicht“** – Ayla, Jonas, Robby in Halle 7; der Spielplan: Gerüst → Licht → Strom; du wirst in den Kader geholt; Sam erklärt die Jury-Regel (80 %).
3. **„Deine Spielerkarte“** – die Karte wird ausgestellt (Rookie, Level 1), die drei Crew-Regeln, der Turnierplan geht an, Runde 1: die Offliner.

Kulissen als animierte SVG/CSS-Szenen (Skyline bei Nacht, dunkles Festivalgelände, der tote Bildschirm, die Arena mit WEBCUP-Leinwand, der Turnierplan mit 18 Crew-Badges, Halle 7, die Spielerkarte, die Karte). Robby-Posen als PNG, Gegner-Captains als große Icon-Badges. Sprechblasen mit Schreibmaschinen-Effekt, Klangkulisse.

**Bild-/Videogenerierung:** Das Skript `scripts/generate-intro-assets.mjs` erzeugt mit einem OpenAI-Schlüssel (`OPENAI_API_KEY` als Umgebungsvariable der Cloud-Umgebung) Szenenbilder und legt sie unter `public/intro/assets/` ab; der Vorspann nutzt sie automatisch, wenn sie vorhanden sind – sonst die SVG-Kulissen. In der Cloud-Sitzung, in der dieses Konzept entstand, war kein Schlüssel verfügbar (die Schlüssel liegen auf Philipps Rechner, nicht in der Cloud-Umgebung).

---

## 6. Technik

- **Vite + Vanilla JS (ES-Module)**, CodeMirror 6, canvas-confetti, JSZip (Website als ZIP herunterladen). Keine Frameworks, kein Server, kein Konto.
- **Hosting:** GitHub Pages (`base: /webwerkstatt/`).
- **Speicher:** `localStorage` (`webwerkstatt2.*`), Export/Import als JSON-Datei.
- **Inhalte datengetrieben:** `public/content/curriculum.json`, `chapters/<id>/chapter.json`, `lessons/*.json`, `pool.json` (Fragenpool je Kapitel), `boss.json` (Match), `konzepte.json` (Konzept-Register), `story/intro.json` (Vorspann-Szenen), `story/crews.json` (Turnier, eigene Crew, 18 Gegner-Crews).
- **Qualitätssicherung:** `scripts/validiere-inhalte.mjs` (Schema + Lösungs-Leck + Turnierdaten), `scripts/pruefe-kette.mjs` (Etappen-Kette), `scripts/browser-test.mjs` (Playwright: jede Code-Aufgabe – Lösung besteht, Starter fällt durch), `e2e-lektion.mjs`/`e2e-abnahme.mjs` (Lektion und Match durchspielen), Route `#/pruefung` in der App.
- **Lehrkraft-Modus:** Passwort (nur SHA-256-Hash im Repo), schaltet alle Runden frei, verändert keinen Lernstand.

---

## 7. Routen der App

| Route | Ansicht |
|---|---|
| `#/` | Turnierplan (Startseite) |
| `#/intro` | Vorspann |
| `#/kapitel/<id>` | Runde: Gegner-Crew, Training (Lektionen, Sterne), Match |
| `#/lektion/<kapitel>/<id>` | Lektions-Player (Soundcheck → Schritte → Abschluss, Reaktionen) |
| `#/abnahme/<kapitel>` | Match (Boss-Level) |
| `#/backstage` | Trainingslager (Minispiele) |
| `#/keycard` | Spielerkarte: Rang, Werte, Trophäenwand, Abzeichen, Statistik, Sicherung, Einstellungen |
| `#/projekt` | die FUNKEN-Website (alle Seiten, Vorschau, ZIP-Download) |
| `#/showtime` | Finale: eigene Website mit Checkliste |
| `#/pruefung` | interne Prüfung aller Code-Aufgaben |
| `#/lehrkraft` | Lehrkraft-Modus |
| `#/bericht` | druckbarer Lernbericht (Runden, Sterne, Matches, Konzepte, Abzeichen) |
