#!/bin/sh
# Startet den WebWerkstatt-Server für den Dauerbetrieb (z. B. bei Mittwald).
# Datenbank und Schlüssel liegen in $WEBWERKSTATT_INSTANCE (Standard: server/instance).
cd "$(dirname "$0")"
[ -d venv ] || python3 -m venv venv
. venv/bin/activate
pip install -q -r requirements.txt gunicorn
exec gunicorn --bind "${HOST:-0.0.0.0}:${PORT:-8000}" --workers 2 --threads 4 --access-logfile - app:app
