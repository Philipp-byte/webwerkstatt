#!/bin/sh
# Baut ein Upload-Paket für den Schulserver: deploy/webwerkstatt-schulserver.zip
# Inhalt: dist/ (App mit Basis "/") und server/ (Flask + SQLite), ohne Datenbank.
set -e
cd "$(dirname "$0")/.."
WEBWERKSTATT_BASE=/ npx vite build --outDir deploy/paket/dist >/dev/null
rm -rf deploy/paket/server && mkdir -p deploy/paket/server
cp server/*.py server/schema.sql server/requirements.txt server/start.sh server/README.md deploy/paket/server/
cp docs/DEPLOY-MITTWALD.md deploy/paket/ANLEITUNG.md
rm -f deploy/webwerkstatt-schulserver.zip
(cd deploy/paket && zip -qr ../webwerkstatt-schulserver.zip .)
rm -rf deploy/paket
ls -lh deploy/webwerkstatt-schulserver.zip
