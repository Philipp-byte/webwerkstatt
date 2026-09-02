"""WebWerkstatt Schulmodus-Server. Ein Prozess liefert sowohl die gebaute
Frontend-App (dist/) als auch die JSON-API unter /api/* aus - kein separater
Webserver noetig ("python app.py", fertig).

Kein XP, keine Level, keine Badges, keine Rangliste - Fortschritt ist hier
bewusst nur: Lektion erledigt (+ Versuche + Zeitpunkt).

Start:
    cd server
    pip install -r requirements.txt
    flask --app app create-admin <benutzername> <passwort>
    python app.py
"""

import secrets
import sqlite3
from pathlib import Path

import click
from flask import Flask, jsonify, request, send_from_directory, session

import admin_routes
import teacher_routes
from auth import hash_password, login_required, verify_password
from content import chapter_id_for_lesson
from db import get_db, init_db

BASE_DIR = Path(__file__).parent
DIST_DIR = BASE_DIR.parent / "dist"
SECRET_FILE = BASE_DIR / "instance" / "secret.key"


def get_secret_key():
    SECRET_FILE.parent.mkdir(exist_ok=True)
    if SECRET_FILE.exists():
        return SECRET_FILE.read_text(encoding="utf-8").strip()
    key = secrets.token_hex(32)
    SECRET_FILE.write_text(key, encoding="utf-8")
    return key


app = Flask(__name__, static_folder=None)
app.secret_key = get_secret_key()
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

with app.app_context():
    init_db()

app.register_blueprint(teacher_routes.bp)
app.register_blueprint(admin_routes.bp)


# ---------------------------------------------------------------- Hilfsfunktionen

def build_state(conn, user_id):
    """Kompletter Fortschritts-Zustand fuer das Frontend (einmal nach dem
    Login geladen, danach liest der Client synchron aus seinem Cache)."""
    user = conn.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
    lessons = {
        row["lesson_id"]: {
            "status": row["status"],
            "completedAt": row["completed_at"],
        }
        for row in conn.execute(
            "SELECT * FROM progress WHERE user_id=?", (user_id,)
        ).fetchall()
    }

    locked_chapters = []
    if user["class_id"]:
        locked_chapters = [
            row["chapter_id"]
            for row in conn.execute(
                "SELECT chapter_id FROM unlocks WHERE class_id=? AND locked=1",
                (user["class_id"],),
            ).fetchall()
        ]

    return {"lessons": lessons, "lockedChapters": locked_chapters}


# ---------------------------------------------------------------- API-Routen

@app.get("/api/ping")
def ping():
    return jsonify({"ok": True})


@app.post("/api/auth/login")
def login():
    data = request.get_json(force=True, silent=True) or {}
    pseudonym = (data.get("pseudonym") or "").strip()
    password = data.get("password") or ""

    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE pseudonym=?", (pseudonym,)
    ).fetchone()
    if not user or not verify_password(password, user["password_hash"]):
        return jsonify({"error": "invalid_credentials"}), 401

    session.clear()
    session["user_id"] = user["id"]
    session["role"] = user["role"]
    conn.execute(
        "UPDATE users SET last_active=datetime('now') WHERE id=?", (user["id"],)
    )
    conn.commit()
    return jsonify({"pseudonym": user["pseudonym"], "role": user["role"]})


@app.post("/api/auth/logout")
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.post("/api/auth/change-password")
@login_required
def change_password():
    data = request.get_json(force=True, silent=True) or {}
    old_password = data.get("old_password") or ""
    new_password = data.get("new_password") or ""
    if len(new_password) < 4:
        return jsonify({"error": "password_too_short"}), 400

    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE id=?", (session["user_id"],)
    ).fetchone()
    if not verify_password(old_password, user["password_hash"]):
        return jsonify({"error": "wrong_password"}), 401

    conn.execute(
        "UPDATE users SET password_hash=? WHERE id=?",
        (hash_password(new_password), user["id"]),
    )
    conn.commit()
    return jsonify({"ok": True})


@app.get("/api/me")
@login_required
def me():
    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE id=?", (session["user_id"],)
    ).fetchone()
    return jsonify({"id": user["id"], "pseudonym": user["pseudonym"], "role": user["role"]})


@app.get("/api/settings/public")
def public_settings():
    conn = get_db()
    row = conn.execute(
        "SELECT value FROM settings WHERE key='school_name'"
    ).fetchone()
    return jsonify({"schoolName": row["value"] if row else ""})


@app.get("/api/progress/state")
@login_required
def progress_state():
    conn = get_db()
    return jsonify(build_state(conn, session["user_id"]))


@app.post("/api/progress/complete-lesson")
@login_required
def complete_lesson():
    data = request.get_json(force=True, silent=True) or {}
    lesson_id = data.get("lessonId")
    if not lesson_id:
        return jsonify({"error": "lesson_id_required"}), 400

    conn = get_db()
    user_id = session["user_id"]
    user = conn.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()

    # Kapitel-Sperre der Klasse durchsetzen (die Client-Seite blendet gesperrte
    # Kapitel zwar aus, aber die API ist die eigentliche Kontrolle).
    if user["class_id"]:
        chapter_id = chapter_id_for_lesson(lesson_id)
        if chapter_id:
            locked = conn.execute(
                "SELECT 1 FROM unlocks WHERE class_id=? AND chapter_id=? AND locked=1",
                (user["class_id"], chapter_id),
            ).fetchone()
            if locked:
                return jsonify({"error": "chapter_locked"}), 403

    existing = conn.execute(
        "SELECT * FROM progress WHERE user_id=? AND lesson_id=?", (user_id, lesson_id)
    ).fetchone()
    first_time = existing is None or existing["status"] != "done"

    if existing:
        conn.execute(
            """UPDATE progress SET status='done', attempts=attempts+1,
               completed_at=datetime('now') WHERE user_id=? AND lesson_id=?""",
            (user_id, lesson_id),
        )
    else:
        conn.execute(
            "INSERT INTO progress (user_id, lesson_id, status) VALUES (?, ?, 'done')",
            (user_id, lesson_id),
        )

    # "Zuletzt aktiv" fuer die Lehrkraft-Uebersicht aktuell halten.
    conn.execute(
        "UPDATE users SET last_active=datetime('now') WHERE id=?", (user_id,)
    )
    conn.commit()

    return jsonify({"ok": True, "firstTime": first_time})


# ---------------------------------------------------------------- Statisches Frontend

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path.startswith("api/"):
        return jsonify({"error": "not_found"}), 404
    if not DIST_DIR.exists():
        return (
            "Frontend ist noch nicht gebaut. Bitte im Projektordner "
            "`WEBWERKSTATT_BASE=/ npm run build` ausfuehren (siehe server/README.md).",
            501,
        )
    candidate = DIST_DIR / path
    if path and candidate.is_file():
        return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, "index.html")


# ---------------------------------------------------------------- CLI (Account-Bootstrap)
# Volle Klassen-/Account-Verwaltung mit automatischer Pseudonym-Generierung
# gibt es im Lehrer-Dashboard (teacher_routes.py). Diese CLI-Befehle bleiben
# fuer das allererste Anlegen von Admin-/Lehrer-Accounts noetig, bevor sich
# ueberhaupt jemand einloggen kann.

@app.cli.command("create-user")
@click.argument("pseudonym")
@click.argument("password")
@click.option("--role", default="student", type=click.Choice(["student", "teacher", "admin"]))
@click.option("--class-name", default=None, help="Legt die Klasse an, falls sie noch nicht existiert.")
def create_user(pseudonym, password, role, class_name):
    """Legt einen Account an, z. B.: flask --app app create-user MutigerFuchs17 123456"""
    conn = get_db()
    class_id = None
    if class_name:
        row = conn.execute("SELECT id FROM classes WHERE name=?", (class_name,)).fetchone()
        if row:
            class_id = row["id"]
        else:
            cur = conn.execute("INSERT INTO classes (name) VALUES (?)", (class_name,))
            class_id = cur.lastrowid

    try:
        conn.execute(
            "INSERT INTO users (pseudonym, password_hash, role, class_id) VALUES (?, ?, ?, ?)",
            (pseudonym, hash_password(password), role, class_id),
        )
        conn.commit()
        click.echo(f"Account '{pseudonym}' ({role}) wurde angelegt.")
    except sqlite3.IntegrityError:
        click.echo(f"Fehler: Benutzername '{pseudonym}' existiert bereits.", err=True)


@app.cli.command("create-admin")
@click.argument("pseudonym")
@click.argument("password")
def create_admin(pseudonym, password):
    """Bootstrapt den ersten Admin-Account."""
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO users (pseudonym, password_hash, role) VALUES (?, ?, 'admin')",
            (pseudonym, hash_password(password)),
        )
        conn.commit()
        click.echo(f"Admin-Account '{pseudonym}' wurde angelegt.")
    except sqlite3.IntegrityError:
        click.echo(f"Fehler: Benutzername '{pseudonym}' existiert bereits.", err=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
