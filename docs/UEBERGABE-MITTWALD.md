# Übergabe: WebWerkstatt auf Mittwald hochladen

Stand 13.10.2026, Branch `claude/awesome-ptolemy-hae4q1` im Repo `Philipp-byte/webwerkstatt`.

## Was fertig ist
- App SCHATTENNETZ (Vite, Vanilla JS) komplett: Karte, Orte, Lektionen, Hinterhalte, Duell, Vorspann-Video.
- Schulmodus-Server `server/` (Flask + SQLite): Pseudonym + Passwort, Spielstand in `server/instance/webwerkstatt.db` (legt sich selbst an), Klassen-Dashboard `#/klasse`, Admin.
- Upload-Paket: `sh scripts/paket-schulserver.sh` → `deploy/webwerkstatt-schulserver.zip` (dist/ mit Basis "/" + server/). Lokal getestet: startet, `/api/ping` → `{"modus":"schule"}`.
- Startbefehl auf dem Server: `sh server/start.sh` (legt venv an, installiert Flask + gunicorn, Port aus `PORT`, Standard 8000).
- Anleitung: `docs/DEPLOY-MITTWALD.md`, Server-Details: `server/README.md`.
- Tests: `npm run smoke`, `node scripts/schulmodus-test.mjs` (braucht python3 + Flask).

## Was zu tun ist
1. Paket bauen (siehe oben).
2. In Chrome auf https://login.mittwald.de/projects (Philipp ist eingeloggt): Projekt wählen, Python-App anlegen, Installationsverzeichnis z. B. `/html/webwerkstatt`.
3. SSH/SFTP-Zugang anlegen, Zip-Inhalt hochladen (dist/, server/, ANLEITUNG.md).
4. App-Einstellungen: Startbefehl `sh server/start.sh`, Port wie von Mittwald vorgegeben (als `PORT`), Umgebungsvariable `WEBWERKSTATT_HTTPS=1`.
5. Domain/Subdomain auf die App zeigen lassen (SSL macht Mittwald).
6. Per SSH: `cd /html/webwerkstatt/server && . venv/bin/activate && python app.py create-admin admin <passwort>` – Passwort mit Philipp vereinbaren, nicht im Chat ausgeben; App neu starten.
7. Im Browser testen: Login, Klasse anlegen, 3 Test-Accounts, mit einem anmelden, Spielstand prüfen. Dann Philipp die Adresse und die Bedienung zeigen.

## Regeln
- Keine Passwörter/Tokens in den Chat oder ins Repo.
- `server/instance/` bei Updates nie überschreiben (Datenbank).
- Commits nur auf `claude/awesome-ptolemy-hae4q1`.

## Noch offen (nicht Teil des Uploads)
- Bilder über die OpenAI-API (`npm run grafiken`, braucht `OPENAI_API_KEY`), danach `npm run intro:video`.
- Offene Fragen: `docs/FRAGEN.md`.
