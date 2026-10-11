"""SQLite-Zugriff, bewusst ohne ORM. Backup = die Datei <instance>/webwerkstatt.db kopieren.

Der Instanz-Ordner (Datenbank, geheimer Schlüssel) liegt standardmäßig in
server/instance/ und lässt sich mit der Umgebungsvariable WEBWERKSTATT_INSTANCE
verlegen (z. B. auf ein Docker-Volume)."""

import os
import sqlite3
from pathlib import Path

from flask import g

BASE_DIR = Path(__file__).parent
INSTANCE_DIR = Path(os.environ.get("WEBWERKSTATT_INSTANCE") or (BASE_DIR / "instance"))
DB_PATH = INSTANCE_DIR / "webwerkstatt.db"
SCHEMA_PATH = BASE_DIR / "schema.sql"


def _verbinden():
    INSTANCE_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("PRAGMA journal_mode = WAL")
    return conn


def get_db():
    """Eine Verbindung je Request (wird in app.py beim Teardown geschlossen)."""
    if "db" not in g:
        g.db = _verbinden()
    return g.db


def close_db(_exc=None):
    conn = g.pop("db", None)
    if conn is not None:
        conn.close()


def init_db():
    conn = _verbinden()
    conn.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
    conn.commit()
    conn.close()
