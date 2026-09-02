# WebWerkstatt – Schulmodus-Server

Ein kleiner Flask-Server, der die gebaute WebWerkstatt (`dist/`) ausliefert
und den Lernfortschritt zentral in SQLite speichert. Ohne diesen Server läuft
die WebWerkstatt weiter im Demo-Modus (Fortschritt im Browser-localStorage),
z. B. auf GitHub Pages – daran ändert sich nichts.

Gespeichert wird bewusst wenig: Pseudonym, erledigte Lektionen (mit Anzahl
der Versuche und Zeitpunkt) und Kapitel-Sperren. Kein XP, keine Punkte,
keine Klarnamen.

## Einrichtung (einmalig)

```bash
# 1. Frontend bauen – für den Schulserver mit Basis-Pfad "/":
#    (im Projektordner, nicht in server/)
WEBWERKSTATT_BASE=/ npm run build
#    Windows (PowerShell):  $env:WEBWERKSTATT_BASE='/'; npm run build

# 2. Python-Umgebung anlegen und Flask installieren:
cd server
python -m venv venv
venv/Scripts/activate        # Windows  (Linux/Mac: source venv/bin/activate)
pip install -r requirements.txt

# 3. Ersten Admin-Account anlegen (legt auch die Datenbank an):
flask --app app create-admin Chef geheim123
```

## Starten

```bash
cd server
venv/Scripts/activate
python app.py
```

Danach läuft alles unter `http://<rechnername>:5000/` – ein Prozess für
App und API. Die Datenbank liegt in `server/instance/webwerkstatt.db`
(Backup = diese Datei kopieren).

## Rollen

- **Admin** legt Lehrer-Accounts an und setzt den Schulnamen
  (Login-Bildschirm).
- **Lehrkraft** legt Klassen an, generiert Schüler-Accounts
  (Pseudonym + 6-stelliges Startpasswort, druckbare Liste), sieht den
  Fortschritt ihrer Klassen und sperrt/öffnet Kapitel.
- **Schüler:innen** melden sich mit Pseudonym + Passwort an; ihr
  Fortschritt landet auf dem Server statt im Browser.

## Nützliche CLI-Befehle

```bash
flask --app app create-admin <name> <passwort>
flask --app app create-user <name> <passwort> --role teacher
```
