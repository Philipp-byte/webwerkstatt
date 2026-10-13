# WebWerkstatt auf Mittwald hochladen (Schulmodus mit Datenbank)

Ergebnis: Die App läuft unter deiner Domain, jede Person meldet sich mit Pseudonym und Passwort an, der Spielstand liegt in einer SQLite-Datenbank auf dem Server. Die Datenbank ist eine einzige Datei, die der Server beim ersten Start selbst anlegt – in Mittwald musst du **keine** MySQL-Datenbank einrichten.

Die Menünamen im Mittwald mStudio können leicht abweichen. Wenn ein Punkt anders heißt, hilft die Mittwald-Doku zu „Python“, „SSH“ und „Domains“ unter https://developer.mittwald.de/.

## 0. Paket bauen

Im Projektordner:

```
npm install
sh scripts/paket-schulserver.sh
```

Das erzeugt `deploy/webwerkstatt-schulserver.zip` mit zwei Ordnern: `dist/` (die fertige App) und `server/` (Flask-Server). Die Datenbank ist nicht dabei, sie entsteht auf dem Server.

## 1. Projekt und Python-App anlegen (mStudio im Browser)

1. In **mStudio** das Projekt öffnen (oder ein neues anlegen).
2. Unter **Apps** eine neue App anlegen und als Typ **Python** wählen (bei Mittwald heißt das je nach Stand „Python“ oder „Eigene Python-Anwendung“). Python 3.11 oder neuer.
3. Als Installationsverzeichnis z. B. `/html/webwerkstatt` angeben.

## 2. Dateien hochladen

1. Unter **Zugänge → SSH/SFTP** einen Zugang anlegen und das Passwort notieren.
2. Mit einem SFTP-Programm (z. B. FileZilla oder WinSCP) verbinden und den **Inhalt** der ZIP-Datei in das Installationsverzeichnis der App kopieren. Danach liegen dort `dist/`, `server/` und `ANLEITUNG.md`.

## 3. Startbefehl und Port setzen

In den Einstellungen der Python-App:

| Feld | Wert |
| --- | --- |
| Startbefehl | `sh server/start.sh` |
| Port | `8000` (oder den Port, den Mittwald vorgibt – dann als Umgebungsvariable `PORT` setzen) |
| Umgebungsvariable | `WEBWERKSTATT_HTTPS=1` (Mittwald liefert die Domain über HTTPS aus) |

`start.sh` legt beim ersten Start eine Python-Umgebung an, installiert Flask und gunicorn und startet den Server. Datenbank und geheimer Schlüssel landen in `server/instance/`.

## 4. Domain verbinden

Unter **Domains** eine Domain oder Subdomain (z. B. `webwerkstatt.deine-schule.de`) anlegen und als Ziel die **Python-App** wählen. Mittwald stellt das SSL-Zertifikat selbst aus.

## 5. Ersten Admin anlegen

Per SSH auf den Server verbinden (Befehl steht in mStudio unter dem SSH-Zugang), dann:

```
cd /html/webwerkstatt/server
. venv/bin/activate
python app.py create-admin admin <sicheres-passwort>
```

Danach in mStudio die App einmal **neu starten**.

## 6. So benutzt du es im Browser

1. Domain öffnen → Anmeldeseite erscheint.
2. Mit `admin` und deinem Passwort anmelden. Beim ersten Mal läuft der Vorspann, danach landest du in Hyperia.
3. Oben rechts **Klassen** (oder **Ich → Klassen**): Klasse anlegen, z. B. „1BK1T 2026“, Anzahl eintragen, **Accounts erzeugen**.
4. Die Liste mit Pseudonym und Passwort erscheint **einmal** – sofort **Drucken**, zerschneiden, verteilen. Welcher Name zu welchem Pseudonym gehört, steht nur auf deinem Ausdruck.
5. Lernende öffnen die Domain, melden sich mit ihrem Zettel an und können das Passwort unter **Ich** ändern. Der Spielstand wird alle paar Sekunden gespeichert und ist an jedem Rechner da.
6. In **Klassen** siehst du je Pseudonym: befreite Orte, Lektionen, Sterne, XP, zuletzt aktiv. Der Schlüssel-Knopf setzt ein vergessenes Passwort neu.
7. Weitere Lehrkräfte legst du als Admin im selben Bereich unter „Lehrkräfte“ an.

## 7. Backup und Updates

- **Backup:** die Datei `server/instance/webwerkstatt.db` per SFTP herunterladen (am besten abends, wenn niemand spielt). Mittwald sichert das Projekt zusätzlich selbst.
- **Update der App:** neues Paket bauen, nur `dist/` und die `.py`-Dateien ersetzen, `server/instance/` **nicht** überschreiben, App neu starten.

## Wie viel hält der Server aus?

Eine Klasse mit 30 Lernenden erzeugt pro Unterrichtsstunde grob 30 Seitenaufrufe beim Start und danach je Person alle paar Sekunden eine kleine Speicheranfrage, solange sie aktiv übt. Bei fünf Klassen mit zwei Stunden pro Woche sind das im Monat grob 1 000–1 500 Besuche und einige zehntausend kleine API-Anfragen. Das schafft der kleinste Mittwald-Tarif mit SQLite problemlos. Erst bei mehreren hundert Personen **gleichzeitig** lohnt sich mehr Rechenleistung.
