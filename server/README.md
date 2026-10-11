# WebWerkstatt – Schulmodus-Server

Ein kleiner Flask-Server für den Einsatz in der Schule: **Jede Person bekommt ein
Pseudonym und ein Passwort, der Spielstand liegt zentral auf dem Server.** Alles
steckt in einer SQLite-Datei. Es werden keine personenbezogenen Daten gespeichert –
welches Pseudonym zu wem gehört, steht nur auf der gedruckten Liste der Lehrkraft.

Ohne Server läuft die App weiter wie bisher (GitHub Pages, Spielstand im Browser).
Die App erkennt den Modus selbst über `/api/ping`.

## Was der Server macht

| Rolle | Kann |
| --- | --- |
| Lernende (`student`) | anmelden, spielen, Spielstand liegt auf dem Server, eigenes Passwort ändern (unter „Ich“) |
| Lehrkraft (`teacher`) | unter `#/klasse`: Klassen anlegen, Accounts per Klick erzeugen (druckbare Pseudonym-Passwort-Liste), Klassenübersicht (befreite Orte, Lektionen, Sterne, XP, zuletzt aktiv), Startpasswort neu setzen, Klasse löschen |
| Admin (`admin`) | alles wie Lehrkraft, zusätzlich Lehrkraft-Accounts anlegen und löschen, alle Klassen sehen |

## Einrichtung (einmalig)

```bash
# 1. App bauen – der Schulserver liefert sie unter "/" aus (GitHub Pages nutzt "/webwerkstatt/")
cd ..
WEBWERKSTATT_BASE=/ npm run build

# 2. Server-Abhängigkeiten
cd server
python3 -m venv venv && source venv/bin/activate   # optional, aber empfohlen
pip install -r requirements.txt

# 3. Ersten Admin-Account anlegen (mindestens 6 Zeichen Passwort)
python app.py create-admin admin <sicheres-passwort>
```

Unter Windows PowerShell statt `WEBWERKSTATT_BASE=/ npm run build`:

```powershell
$env:WEBWERKSTATT_BASE = "/"; npm run build
```

## Starten

```bash
python app.py              # http://localhost:5000
PORT=8080 python app.py    # anderer Port
```

Danach als Admin anmelden, unter **Ich → Klassen** (`#/klasse`) Lehrkräfte und
Klassen anlegen, Accounts erzeugen, Liste drucken, Zettel verteilen. Fertig.

Für den Dauerbetrieb lieber einen WSGI-Server nehmen:

```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:8000 --workers 2 --threads 4 app:app
```

## Docker

Im Projektordner liegt ein `Dockerfile`, das die App baut und den Server mit gunicorn startet:

```bash
docker build -t webwerkstatt .
docker run -d --name webwerkstatt -p 8000:8000 -v webwerkstatt-daten:/data webwerkstatt
docker exec -it webwerkstatt python app.py create-admin admin <sicheres-passwort>
```

Die Datenbank liegt im Volume `webwerkstatt-daten`.

## HTTPS

Der Server spricht nur HTTP. Für den Zugriff von außen gehört ein Reverse-Proxy
mit TLS davor (nginx, Caddy, Traefik). Dann `WEBWERKSTATT_HTTPS=1` setzen, damit das
Sitzungs-Cookie nur verschlüsselt übertragen wird. Im reinen Schulnetz reicht HTTP.

## Umgebungsvariablen

| Variable | Bedeutung | Standard |
| --- | --- | --- |
| `PORT`, `HOST` | Port und Adresse | `5000`, `0.0.0.0` |
| `WEBWERKSTATT_INSTANCE` | Ordner für Datenbank und Schlüssel | `server/instance` |
| `WEBWERKSTATT_DIST` | Ordner mit der gebauten App | `../dist` |
| `WEBWERKSTATT_HTTPS` | `1` = Cookie nur über HTTPS | aus |

## Weitere Accounts per Kommandozeile

```bash
python app.py create-user HellerFunke17 start1234                 # Lernende*r ohne Klasse
python app.py create-user HellerFunke17 start1234 student "1BK1T"  # mit Klasse (wird angelegt)
python app.py create-user FrauWeber geheim-123 teacher             # Lehrkraft
```

## Backup

Die komplette Datenbank ist eine Datei: `server/instance/webwerkstatt.db` (bzw. im
Docker-Volume). Backup = Datei kopieren, am besten bei gestopptem Server oder mit
`sqlite3 webwerkstatt.db ".backup sicherung.db"`.

## API (für Neugierige)

Alle Antworten sind JSON, Fehler haben die Form `{"fehler": "…"}`.

| Methode | Pfad | Zweck |
| --- | --- | --- |
| GET | `/api/ping` | `{modus: "schule", nutzer}` – Moduserkennung |
| POST | `/api/login` | `{pseudonym, passwort}` |
| POST | `/api/logout` | |
| POST | `/api/password` | `{alt, neu}` |
| GET / PUT | `/api/progress` | Spielstand laden / speichern (`{spielstand}`) |
| GET / POST | `/api/teacher/classes` | Klassen auflisten / anlegen |
| DELETE | `/api/teacher/classes/<id>` | Klasse mit Accounts löschen |
| POST | `/api/teacher/classes/<id>/accounts` | `{anzahl}` → Pseudonyme + Startpasswörter |
| GET | `/api/teacher/classes/<id>/progress` | Klassenübersicht |
| POST | `/api/teacher/users/<id>/reset` | neues Startpasswort |
| GET / POST | `/api/admin/teachers` | Lehrkräfte auflisten / anlegen |
| DELETE | `/api/admin/teachers/<id>` | Lehrkraft löschen |

## Test

`node scripts/schulmodus-test.mjs` (im Projektordner) baut die App, startet den
Server mit einer leeren Datenbank in einem Temp-Ordner und spielt den ganzen Ablauf
im Browser durch: Anmeldepflicht, Klasse und Accounts anlegen, Vorspann, Spielstand
auf dem Server, Wiederherstellung nach Browser-Reset, Passwort ändern, Klassenübersicht.
Voraussetzung: `python3` mit Flask (anderer Interpreter: `PYTHON=… node …`).
