"""WebWerkstatt Schulmodus-Server (SCHATTENNETZ).

Ein Prozess liefert die gebaute App (dist/) und die JSON-API unter /api/* aus.
Jede Person bekommt ein Pseudonym und ein Passwort, der Spielstand liegt zentral
in einer SQLite-Datei – kein Klarname, keine E-Mail.

Start:
    cd server
    pip install -r requirements.txt
    python app.py create-admin <pseudonym> <passwort>
    python app.py

Umgebungsvariablen (alle optional):
    PORT                   Port (Standard 5000)
    HOST                   Adresse (Standard 0.0.0.0)
    WEBWERKSTATT_INSTANCE  Ordner für Datenbank und Schlüssel (Standard server/instance)
    WEBWERKSTATT_DIST      Ordner mit der gebauten App (Standard ../dist)
    WEBWERKSTATT_HTTPS=1   Cookies nur über HTTPS senden (hinter einem TLS-Proxy)
"""

import json
import os
import secrets
import sqlite3
import sys
import time
from datetime import timedelta
from pathlib import Path

import click
from flask import Flask, g, jsonify, request, send_from_directory, session

import admin_routes
import teacher_routes
from auth import MIN_PASSWORT, hash_password, login_required, verify_password
from db import INSTANCE_DIR, close_db, get_db, init_db
from spielstand import MAX_SPIELSTAND_BYTES, zusammenfassung

BASE_DIR = Path(__file__).parent
DIST_DIR = Path(os.environ.get("WEBWERKSTATT_DIST") or (BASE_DIR.parent / "dist"))
SECRET_FILE = INSTANCE_DIR / "secret.key"


def get_secret_key():
    SECRET_FILE.parent.mkdir(parents=True, exist_ok=True)
    if SECRET_FILE.exists():
        return SECRET_FILE.read_text(encoding="utf-8").strip()
    key = secrets.token_hex(32)
    SECRET_FILE.write_text(key, encoding="utf-8")
    return key


app = Flask(__name__, static_folder=None)
app.secret_key = get_secret_key()
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = os.environ.get("WEBWERKSTATT_HTTPS") == "1"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=120)
app.config["MAX_CONTENT_LENGTH"] = MAX_SPIELSTAND_BYTES + 64_000
app.teardown_appcontext(close_db)

init_db()
app.register_blueprint(teacher_routes.bp)
app.register_blueprint(admin_routes.bp)


# ---------------------------------------------------------------- Hilfen

def _nutzer_json(row):
    return {"id": row["id"], "pseudonym": row["pseudonym"], "rolle": row["role"], "klasse": row["class_id"]}


def _angemeldeter_nutzer(conn):
    if "user_id" not in session:
        return None
    row = conn.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    if not row:
        session.clear()
    return row


# ---------------------------------------------------------------- API

@app.get("/api/ping")
def ping():
    conn = get_db()
    nutzer = _angemeldeter_nutzer(conn)
    return jsonify({"modus": "schule", "nutzer": _nutzer_json(nutzer) if nutzer else None})


@app.post("/api/login")
def login():
    data = request.get_json(force=True, silent=True) or {}
    pseudonym = (data.get("pseudonym") or "").strip()
    passwort = data.get("passwort") or ""
    conn = get_db()
    row = conn.execute("SELECT * FROM users WHERE pseudonym=?", (pseudonym,)).fetchone()
    if not row or not verify_password(passwort, row["password_hash"]):
        time.sleep(0.6)  # bremst Durchprobieren
        return jsonify({"fehler": "Pseudonym oder Passwort stimmt nicht."}), 401
    session.clear()
    session.permanent = True
    session["user_id"] = row["id"]
    session["role"] = row["role"]
    conn.execute("UPDATE users SET last_active=datetime('now') WHERE id=?", (row["id"],))
    conn.commit()
    return jsonify({"nutzer": _nutzer_json(row)})


@app.post("/api/logout")
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.post("/api/password")
@login_required
def passwort_aendern():
    data = request.get_json(force=True, silent=True) or {}
    alt = data.get("alt") or ""
    neu = data.get("neu") or ""
    if len(neu) < MIN_PASSWORT:
        return jsonify({"fehler": f"Das neue Passwort braucht mindestens {MIN_PASSWORT} Zeichen."}), 400
    conn = get_db()
    row = _angemeldeter_nutzer(conn)
    if not row or not verify_password(alt, row["password_hash"]):
        return jsonify({"fehler": "Das alte Passwort stimmt nicht."}), 401
    conn.execute("UPDATE users SET password_hash=? WHERE id=?", (hash_password(neu), row["id"]))
    conn.commit()
    return jsonify({"ok": True})


@app.get("/api/progress")
@login_required
def spielstand_laden():
    conn = get_db()
    row = conn.execute("SELECT spielstand, updated_at FROM progress WHERE user_id=?", (session["user_id"],)).fetchone()
    if not row:
        return jsonify({"spielstand": None})
    try:
        daten = json.loads(row["spielstand"])
    except ValueError:
        daten = None
    return jsonify({"spielstand": daten, "gespeichert": row["updated_at"]})


@app.route("/api/progress", methods=["PUT", "POST"])
@login_required
def spielstand_speichern():
    # POST zusätzlich zu PUT, weil navigator.sendBeacon beim Verlassen der Seite nur POST kann.
    data = request.get_json(force=True, silent=True) or {}
    sp = data.get("spielstand")
    if not isinstance(sp, dict):
        return jsonify({"fehler": "Kein Spielstand übermittelt."}), 400
    text = json.dumps(sp, ensure_ascii=False, separators=(",", ":"))
    if len(text.encode("utf-8")) > MAX_SPIELSTAND_BYTES:
        return jsonify({"fehler": "Der Spielstand ist zu groß."}), 413
    z = zusammenfassung(sp)
    conn = get_db()
    conn.execute(
        """INSERT INTO progress (user_id, spielstand, orte, lektionen, sterne, xp, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
           ON CONFLICT(user_id) DO UPDATE SET spielstand=excluded.spielstand, orte=excluded.orte,
             lektionen=excluded.lektionen, sterne=excluded.sterne, xp=excluded.xp, updated_at=excluded.updated_at""",
        (session["user_id"], text, z["orte"], z["lektionen"], z["sterne"], z["xp"]),
    )
    conn.execute("UPDATE users SET last_active=datetime('now') WHERE id=?", (session["user_id"],))
    conn.commit()
    return jsonify({"ok": True, **z})


@app.errorhandler(413)
def zu_gross(_e):
    return jsonify({"fehler": "Die Anfrage ist zu groß."}), 413


# ---------------------------------------------------------------- Statisches Frontend

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def frontend(path):
    if path.startswith("api/"):
        return jsonify({"fehler": "Unbekannte API-Adresse."}), 404
    if not DIST_DIR.exists():
        return (
            "Die App ist noch nicht gebaut. Im Projektordner ausführen: WEBWERKSTATT_BASE=/ npm run build (siehe server/README.md).",
            501,
        )
    kandidat = (DIST_DIR / path).resolve()
    if path and kandidat.is_file() and str(kandidat).startswith(str(DIST_DIR.resolve())):
        antwort = send_from_directory(DIST_DIR, path)
        if path.startswith("assets/"):
            antwort.headers["Cache-Control"] = "public, max-age=31536000, immutable"
        return antwort
    antwort = send_from_directory(DIST_DIR, "index.html")
    antwort.headers["Cache-Control"] = "no-cache"
    return antwort


# ---------------------------------------------------------------- CLI (Bootstrap)
# Danach läuft alles über die Weboberfläche (#/klasse): Klassen, Accounts, Lehrkräfte.

def _account_anlegen(pseudonym, passwort, rolle, klasse=None):
    conn = sqlite3.connect(INSTANCE_DIR / "webwerkstatt.db")
    conn.execute("PRAGMA foreign_keys = ON")
    class_id = None
    if klasse:
        row = conn.execute("SELECT id FROM classes WHERE name=?", (klasse,)).fetchone()
        class_id = row[0] if row else conn.execute("INSERT INTO classes (name) VALUES (?)", (klasse,)).lastrowid
    try:
        conn.execute(
            "INSERT INTO users (pseudonym, password_hash, role, class_id) VALUES (?, ?, ?, ?)",
            (pseudonym, hash_password(passwort), rolle, class_id),
        )
        conn.commit()
        print(f"Account „{pseudonym}“ ({rolle}) angelegt.")
        return True
    except sqlite3.IntegrityError:
        print(f"Fehler: Pseudonym „{pseudonym}“ existiert bereits.", file=sys.stderr)
        return False
    finally:
        conn.close()


@app.cli.command("create-admin")
@click.argument("pseudonym")
@click.argument("passwort")
def cli_create_admin(pseudonym, passwort):
    """Legt den ersten Admin-Account an."""
    _account_anlegen(pseudonym, passwort, "admin")


@app.cli.command("create-user")
@click.argument("pseudonym")
@click.argument("passwort")
@click.option("--rolle", default="student", type=click.Choice(["student", "teacher", "admin"]))
@click.option("--klasse", default=None, help="Klasse (wird angelegt, falls es sie noch nicht gibt).")
def cli_create_user(pseudonym, passwort, rolle, klasse):
    """Legt einen Account an, z. B. create-user HellerFunke17 geheim123 --klasse "1BK1T"."""
    _account_anlegen(pseudonym, passwort, rolle, klasse)


if __name__ == "__main__":
    args = sys.argv[1:]
    if args and args[0] in ("create-admin", "create-user"):
        if len(args) < 3:
            print("Aufruf: python app.py create-admin <pseudonym> <passwort>\n        python app.py create-user <pseudonym> <passwort> [student|teacher|admin] [Klasse]", file=sys.stderr)
            sys.exit(2)
        if len(args[2]) < MIN_PASSWORT:
            print(f"Das Passwort braucht mindestens {MIN_PASSWORT} Zeichen.", file=sys.stderr)
            sys.exit(2)
        rolle = "admin" if args[0] == "create-admin" else (args[3] if len(args) > 3 else "student")
        ok = _account_anlegen(args[1], args[2], rolle, args[4] if len(args) > 4 else None)
        sys.exit(0 if ok else 1)
    app.run(host=os.environ.get("HOST", "0.0.0.0"), port=int(os.environ.get("PORT", "5000")), debug=False)
