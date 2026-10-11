# Überarbeitung Oktober 2026 – was sich geändert hat und was als Nächstes kommt

Stand: 11.10.2026. Auftrag (Philipp): Intro als Video, spannendere und schülernähere Geschichte, mehr Gamification mit Zwischenspielen zum Lernen, tiefere Didaktik (Wiederholung, kurze Texte, Nachlesen während der Aufgabe – Beispiele ja, Lösung nie), besseres Design und besserer Aufbau.

## 1. Kurzfassung

| Bereich | Vorher | Jetzt |
|---|---|---|
| Vorspann | 18 Szenen zum Durchklicken | **Video (92 s, 1280×720, H.264 + eigener Soundtrack)**, gerendert aus einem HTML-Storyboard, plus Comic-Fassung und **Onboarding** (Name, Crew-Regeln, Spielerkarte) |
| Geschichte | Gegner-Crews nur als Texte auf der Runden-Seite | **54 Zwischenspiele** (Anpfiff, Crew-Funk, Abpfiff je Runde) mit Dialog **und** Lernaufgabe, **Trophäenkarten** mit Fehler/Regel/Beispiel, **Crew-Embleme** statt Emoji |
| Didaktik | Text nur vor der Aufgabe lesbar, Spickzettel fehlte | **„Nachlesen“ in jeder Aufgabe** (Erklärungen und Beispiele der Lektion, Spickzettel, Trophäen – nie Lösungen), **Aufgaben-Leiste** bleibt beim Scrollen sichtbar, **Merksätze** am Lektionsende, Spickzettel-Link nach jedem Fehler |
| Gamification | XP, Sterne, Abzeichen, Matches | zusätzlich **Tagesziel** (+60 XP), **Tages-Serie**, **Volltreffer-Bonus**, 7 neue Abzeichen, Trophäen-Sammlung |
| Aufbau | Kapitelseite = Lektionsliste | **Runden-Ablauf** (Anpfiff → Lektionen → Funk → Match → Abpfiff), **„Nächster Schritt“** auf der Startseite, Hero mit Video, Spickzettel-Seite |
| Technik | – | Router ohne Render-Race, Validator für alle neuen Inhalte, Rauchtest aller Ansichten, Video-Pipeline |

Alle 86 Lektionen, 82 Etappen und 18 Abnahmen sind unverändert (Validator: 0 Fehler; E2E Lektion und Match grün).

## 2. Das Intro-Video

**Wie es entsteht (ohne externe Dienste, reproduzierbar):**

1. `scripts/intro-video/storyboard.html` – ein deterministischer Film in HTML/CSS/SVG. `window.__intro.seek(t)` stellt den Zustand für Sekunde `t` her (keine CSS-Animationen, kein Zufall pro Frame). 11 Szenen: Vorhang → Skyline Heilbronn → der 404-Bildschirm → Sam ruft den WEBCUP aus (Titel-Impact) → 18 Crews fliegen ins Raster (mit Trash-Talk) → Halle 7 mit Ayla, Jonas, Robby → der Plan (Gerüst, Licht, Strom) → die Spielerkarte → die Karte mit 18 Stationen → Anpfiff Runde 1 (VS-Screen, Pfiff) → Logo.
2. `scripts/intro-video/musik.mjs` – Soundtrack komplett synthetisch (Kick, Snare, Hi-Hats, Bass, Arpeggio, Pads, Riser, Glitches, Impact, Pfiff, Glocken), 112 BPM, auf das Storyboard getimt. Keine Samples, keine Lizenzfragen.
3. `scripts/render-intro-video.mjs` – startet einen Mini-Server über dem Repo, fotografiert mit Chromium Frame für Frame (30 fps), streamt die Bilder an ffmpeg, mischt den Soundtrack. Ergebnis: `public/intro/webcup-intro.mp4` (H.264/AAC, 6,4 MB), `webcup-intro.webm` (VP9/Opus, 4,8 MB – Fallback für Browser ohne H.264), Poster `webcup-intro-poster.jpg`, Untertitel `webcup-intro.vtt`.

```
npm run intro:proben /tmp/proben          # Stichproben-Screenshots des Storyboards
npm run intro:video                        # komplettes Rendering (ca. 4 Minuten)
```

**In der App:** Startbildschirm → „Vorspann ansehen“ (Video mit Steuerung und Untertiteln) oder „Als Comic lesen“ (die bisherigen 18 Szenen). Danach **Onboarding**: Name für die Spielerkarte, drei Crew-Regeln (Fehler sind Training · Wiederholung gewinnt Runden · Backups), Knopf „Anpfiff: Runde 1“. Das Video ist auch von der Startseite (Hero) und der Spielerkarte aus erreichbar.

Was fehlt bewusst: **Sprecherstimmen**. In der Cloud-Umgebung gibt es keine Sprachsynthese; der Text läuft als Typo-Animation im Bild und als Untertitel mit. Wenn ein API-Schlüssel für eine TTS-Stimme hinterlegt wird (OpenAI/ElevenLabs), lässt sich eine Sprecherspur in `musik.mjs`/`render-intro-video.mjs` einmischen (siehe Plan).

## 3. Geschichte: Zwischenspiele, Trophäenkarten, Embleme

**Zwischenspiele** (`public/content/story/szenen.json`, Route `#/szene/<kapitel>/<art>`), je Runde drei:

- **Anpfiff** (vor dem Training): Sam eröffnet, der Captain tönt, Ayla/Jonas setzen die Regel dagegen, Robby liefert den **Spähbericht** – eine Aufgabe, in der die Lernenden den Fehler der Gegner-Crew in deren Code erkennen (Fehlerjagd, Quiz, Lückentext). Das aktiviert Vorwissen und setzt das Lernziel der Runde, bevor die erste Lektion beginnt.
- **Crew-Funk** (nach einer bestimmten Lektion, `nach`): kurze Lagebesprechung aus Halle 7 mit einer Zuordnungs- oder Quiz-Aufgabe zum Stoff der ersten Lektionen – eine Wiederholung mitten im Training.
- **Abpfiff** (nach dem gewonnenen Match): Niederlage-Zeile des Captains, **Trophäenkarte** wird gesammelt, eine Trophäen-Frage festigt die Kernregel, Ausblick auf die nächste Crew.

Technik: `src/views/szene-view.js` (Dialog als Chat-Verlauf zum Nachlesen, Aufgabe über `renderStep`, XP 20/20/30 einmalig, **Volltreffer-Bonus** +10 beim ersten Versuch, Überspringen möglich). Platzhalter `@niederlage`, `@trash`, `@spott` ziehen Texte aus `crews.json`. Gesehene Szenen stehen im Spielstand (`story.gesehen`).

**Trophäenkarten** (`src/engine/trophaee.js`): umdrehbare Sammelkarte je Crew – vorne Emblem, Captain, RAUS-Stempel; hinten *Ihr Fehler*, *Die Regel*, *Beispiel* (neue Felder `regel`, `beispiel`, `sprache` in `crews.json`). Sie hängen auf der Spielerkarte (Trophäenwand), erscheinen im Abpfiff und im Nachlesen-Tab „Trophäen“. Jede gewonnene Runde ist damit zugleich eine Wiederholungskarte.

**Embleme** (`src/engine/emblem.js`): prozedurale SVG-Abzeichen (Schild, Sechseck, Raute, Kreis, Achteck, Muster, Crew-Farbe, Icon, Runden-Marke) für alle 18 Crews und die Nachtschicht (Mondsichel, „Halle 7“). Überall eingesetzt: Turnierplan (SVG-Karte und Runden-Karten), Runde, Match, Trophäen, Zwischenspiele, Video.

## 4. Didaktik

- **Nachlesen während jeder Aufgabe** (`src/engine/nachschlagen.js`): Seitenleiste mit drei Tabs. *Diese Lektion* zeigt alle Erklärungen und Beispiele der Lektion bis zum aktuellen Schritt (Beispiele mit Code und aufklappbarer Vorschau) – Aufgaben, Tipps und Lösungen stehen dort nie. *Spickzettel* zeigt die Konzept-Karten der Lektion (hervorgehoben) und aller bereits gelernten Konzepte, durchsuchbar. *Trophäen* zeigt die gesammelten Karten. Öffnen über den Knopf im Lektionskopf, in der Aufgaben-Leiste, nach jedem Fehlversuch („Nachlesen: Erklärung und Beispiele“) und im Soundcheck nach einer falschen Antwort („Spickzettel zu dieser Frage“, springt zur passenden Karte). Im **Match** gibt es bewusst kein Nachlesen (Prüfungssituation); der Hinweis darauf steht beim Revanche-Angebot.
- **Aufgaben-Leiste**: Scrollt der Aufgabentext bei einer Code-Aufgabe aus dem Bild, bleibt er als kompakte Leiste unter der Kopfzeile stehen („Ganze Aufgabe“ klappt auf, „Nachlesen“ daneben).
- **Spickzettel** (`konzepte.json`, Route `#/spickzettel`): alle 88 Konzepte als Karte mit `kurz` (≤ 40 Wörter), `beispiel` (generischer Code, nie eine Aufgabenlösung), `merke` (ein Satz). Noch nicht gelernte Karten zeigen nur Titel und „kommt in Runde X“ – kein Vorgriff.
- **Merksätze** am Lektionsende („Das nimmst du mit“) aus den `merke`-Sätzen der Konzepte der Lektion; Wiederholungs- und Projektlektionen bekommen einen Hinweis auf Soundcheck und Spickzettel.
- **Textlänge**: Die Grenze von 70 Wörtern je Erklärung bleibt (Ø 52 Wörter, keine Überschreitung). Neu geschriebene Texte halten strengere Grenzen: Szenen-Zeilen ≤ 45, Spickzettel ≤ 40, Merksatz ≤ 14 Wörter (vom Validator geprüft).
- **Wiederholung** kommt jetzt an sechs Stellen: Soundcheck (Leitner), Crew-Funk, Wiederholungslektion, Match, Abpfiff-Frage, Trophäenkarten – plus Spickzettel jederzeit.

## 5. Gamification

- **Tagesziel** (Startseite): eine Lektion, drei Soundcheck-Fragen, ein Zwischenspiel oder eine Trainingsrunde – alle drei an einem Tag: +60 XP (einmal pro Tag).
- **Tages-Serie** (Streak): Tage in Folge, Flamme in der Kopfzeile und auf der Startseite, beste Serie auf der Spielerkarte. Kein Verlust-Mechanismus, nur Anreiz.
- **Volltreffer**: Aufgabe eines Zwischenspiels beim ersten Versuch → +10 XP.
- **Neue Abzeichen**: Späher (5 Spähberichte Volltreffer), Funker (5 Crew-Funks), Kartensammler (6 Trophäenkarten), 3 Tage am Stück, Wochenserie, Tagesziel, Fünf volle Tage.
- Spielstand erweitert (`story`, `streak`, `tag`, `intro.video`, neue Statistiken), abwärtskompatibel (alte Sicherungen werden migriert).

## 6. Design und Aufbau

- **Startseite**: Hero mit Video-Poster und Play, Karte „Nächster Schritt“ (zeigt über alle Runden hinweg genau den einen nächsten Schritt: Anpfiff, Lektion, Funk, Match oder Abpfiff), Tagesziel mit Serie, Crew-Leiste mit Emblem und Rundenstand, Gelände-Karte mit Emblemen, Schnellzugriff inkl. Spickzettel, Runden-Karten mit Emblemen.
- **Runden-Seite**: Gegner-Karte mit großem Emblem, Fortschritt mit „Weiter“-Knopf, **Ablauf der Runde** als Liste (Zwischenspiele gestrichelt, Lektionen nummeriert, Match hervorgehoben, Status erledigt/jetzt/gesperrt), Trophäenkarte nach dem Sieg.
- **Match**: Embleme beider Crews, nach dem Sieg „Abpfiff & Trophäenkarte“, nächste Runde startet mit deren Anpfiff.
- **Spielerkarte**: Trophäenwand aus umdrehbaren Karten, Kacheln für Serie und Zwischenspiele.
- **Kopfzeile**: Spickzettel in der Navigation, Serien-Flamme; auf dem Handy kompakter.
- **Router**: Jede Navigation rendert in einen eigenen Container; nur die aktuelle wird eingehängt (vorher konnte eine langsamere ältere Ansicht eine neuere überschreiben).
- Neue Styles in `src/styles/story.css`.

## 7. Qualitätssicherung

- `scripts/validiere-inhalte.mjs` prüft zusätzlich: Spickzettel-Felder und Wortgrenzen, Trophäenkarten-Felder, Zwischenspiele (Sprecher, Robby-Posen, Platzhalter, `nach` muss eine Lektion des Kapitels sein, Aufgabentypen und Vollständigkeit).
- `scripts/smoke-test.mjs` (`npm run smoke`): ruft alle Ansichten auf, spielt den Anpfiff der ersten Runde durch, öffnet Nachlesen (und prüft, dass keine Lösung drinsteht), simuliert eine gewonnene Runde (Spielerkarte, Abpfiff mit Trophäenkarte), prüft Mobil-Ansichten; `--shots` schreibt Screenshots.
- Bestehende Prüfungen unverändert grün: `e2e-lektion.mjs`, `e2e-abnahme.mjs`, Build.

## 8. Plan: was als Nächstes verbessert werden sollte

Priorisiert, mit Aufwandseinschätzung:

1. **Sprecherstimmen im Video** (mittel): Mit einem TTS-Schlüssel (`OPENAI_API_KEY` o. ä. in der Cloud-Umgebung) die Untertitel als Sprachspur erzeugen und in `render-intro-video.mjs` einmischen. Alternativ eigene Aufnahmen (Philipp/Schüler:innen) als WAV unter `scripts/intro-video/stimmen/` ablegen – der Mixer kann sie nach Zeitstempeln der VTT einbauen.
2. **Mehr Fehlerjagd-Schritte in den Lektionen** (klein): Nur 5 der 889 Schritte sind reine `bug`-Schritte (die 42 Fehlerjagden sind Code-Aufgaben). Pro Lektion eine kurze „Welche Zeile ist falsch?“-Frage vor der Transfer-Aufgabe wäre eine schnelle, günstige Übung – die Pools liefern das Material.
3. **Texte straffen** (mittel, Inhalt): 55 Erklärungen liegen zwischen 60 und 70 Wörtern. Vorschlag: Validator-Warnung ab 60 Wörtern und eine Redaktionsrunde über die betroffenen Schritte (Liste per Validator).
4. **Lehrkraft-Turniertafel** (mittel): exportierte Spielstände einlesen, Klasse anonym vergleichen (Runden, Sterne, Werte) – als Beamer-Ansicht für den Unterricht. Kein Server nötig.
5. **Halle 7 ausbauen** (klein–mittel): Jede gewonnene Runde schaltet ein sichtbares Teil der Werkstatt frei (zweiter Monitor, Neon-Schild, Kaffeemaschine …) – Belohnung ohne XP, nur Stolz.
6. **Werkbank auf dem Handy** (mittel): Editor und Vorschau untereinander mit Umschalter; die Lektionen sind mobil lesbar, Code-Aufgaben aber erst ab Tablet-Breite angenehm.
7. **Hinweise aus dem Unterricht** einarbeiten: Welche Zwischenspiele zünden, wo die Spähberichte zu leicht oder zu schwer sind, ob 80 % im Match passt.
8. **Offline-Fähigkeit** (klein): Service Worker für GitHub Pages, damit die App auch bei wackligem Schul-WLAN läuft (alle Inhalte sind statisch).

## 9. Entscheidungen, die Philipp treffen sollte

- Soll der Anpfiff **verpflichtend** vor der ersten Lektion sein (aktuell: empfohlen, als „Jetzt“ markiert, aber nicht gesperrt)?
- Dürfen die Gegner im Video und in den Szenen **frecher** werden, oder ist der Ton richtig?
- Standard-Einstieg: **Video** oder **Comic**? (Aktuell: Video angeboten, Comic als zweite Option; ohne Ton funktioniert das Video dank Typo und Untertiteln.)
- Tagesziel-Bonus 60 XP und Trainings-Deckel 150 XP – passt das zur XP-Ökonomie im Schuljahr?

## 10. SCHATTENNETZ (11.10.2026) – die Geschichte ist neu

Nach Philipps Rückmeldung („schlecht und langweilig, cooler, mehr Action, mehr Gefahr“ … „eine Fantasiewelt, ein Gegner, mehrere Lakaien wie bei PyQuest, aber andere Story“) wurde die Turnier-Schicht WEBCUP komplett ersetzt. Die 86 Lektionen, 82 Etappen und 18 Duelle (ehemals Abnahmen) sind unverändert gültig; nur Verweise auf „Station“, „Abnahme“ und „Runde“ in den Texten wurden auf Orte und Duelle umgestellt.

| Bereich | Vorher (WEBCUP) | Jetzt (SCHATTENNETZ) |
|---|---|---|
| Welt | Turnier, 18 Gegner-Crews, Spielerkarte, Ränge | **Hyperia**: fünf Regionen, 18 Orte, **Seidra** als Gegnerin, **neun Gespinste** als Lakaien, Werkstatt (Sam, Ayla, Jonas, Robby) als Verbündete (`story/welt.json`, `story/figuren.json`) |
| Startseite | Turnierplan | **Karte von Hyperia** (SVG), die Ort für Ort aufleuchtet, „Weiter“-Karte mit dem Gespinst des nächsten Ortes, Seidra-Auftritte |
| Kapitelseite | Runden-Ablauf | **Ort-Seite**: Einleitung in drei Sprechblasen, Weg (Lektionen, Hinterhalte, Duell), Regel und Beispiel nach der Befreiung |
| Reaktionen | Spott/Trost/Jubel mit Abkühlzeit | **Spott-Reihe** des Gespinsts in fester Reihenfolge (verrät die Regel), Vorstellung beim ersten Fehler, **Lob** der Verbündeten, Rückzug nach dem Duell |
| Zwischenspiele | Anpfiff, Crew-Funk, Abpfiff | **Hinterhalte**: fünf Spiele gegen die Uhr (Knotenjagd, Brückenbau, Wahr oder Lüge, Runenpaare, Fäden flicken), Leitner-Priorität, Sterne, Pflicht nach jeder zweiten Lektion |
| Match | Spielstand, RAUS-Stempel | **Duell**: Sams Prüfung plus Gespinst; ab 80 % reißt das Gespinst, Rückzug, Ort leuchtet; Finale beim Funkenfest |
| Spielerkarte | Ränge, Werte, Trophäenwand | **Ich-Seite**: Statistik, Meilensteine, „Was sitzt“, Hinterhalt-Rekorde, befreite Orte, Spielstand, Einstellungen |
| Entfernt | Tagesziel, Tages-Serie, Combo, Trainingslager, Crew-Embleme, Trophäenkarten | – (Meilensteine ersetzen die Abzeichen; Spielstand v3 mit Migration) |
| Design | Werkstatt bei Nacht (Graphit/Orange/Cyan) | flaches, dunkles Violett mit Magenta (Gespinste) und Gold (Funke), heller Modus bleibt |
| Vorspann | 92 s WEBCUP | **74 s SCHATTENNETZ** (Weberei, Großer Webstuhl, Hyperia, Seidra legt das Netz über die Karte, die Werkstatt, Titel), eigener Soundtrack in d-Moll; **beim ersten Start Pflicht in voller Länge**, danach Lesefassung |
| Bilder | SVG-Kulissen, Crew-Embleme | **Grafik-Pipeline** über die OpenAI-Bild-API (`npm run grafiken`: 82 Aufträge – Figuren in Posen, Orte in zwei Zuständen, Vorspann-Szenen); ohne Bilder flache Sigille |
| Betrieb | nur Browser (GitHub Pages) | zusätzlich **Schulmodus**: Flask + SQLite, Pseudonym + Passwort, Spielstand auf dem Server, Klassen-Dashboard, Admin, Docker (`server/`) |

Neue Routen: `#/` (Karte), `#/ort/<id>`, `#/lektion/<kapitel>/<id>`, `#/hinterhalt/<kapitel>/<spiel>/<knoten>`, `#/duell/<kapitel>`, `#/ich`, `#/login`, `#/klasse`; alte Adressen (`kapitel`, `abnahme`, `backstage`, `keycard`) leiten weiter.

QA: Validator 0 Fehler (prüft jetzt Welt und Figuren), Rauchtest grün (Vorspann → Onboarding → Ort → Lektion mit Spott und Lob → Hinterhalt → Duell → Karte → Ich → mobil), Schulmodus-Test grün (18 Prüfungen gegen den laufenden Server).
