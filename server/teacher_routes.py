"""Lehrkraft-Bereich: Klassen, Account-Generator (Pseudonym + Startpasswort),
Klassenübersicht, Passwort zurücksetzen. Admins sehen alle Klassen."""

from flask import Blueprint, jsonify, request, session

from auth import hash_password, roles_required
from db import get_db
from pseudonyms import neues_passwort, neues_pseudonym

bp = Blueprint("teacher", __name__, url_prefix="/api/teacher")
MAX_ACCOUNTS = 60


def _klasse(conn, class_id):
    """Die Klasse, wenn sie der angemeldeten Lehrkraft gehört (Admin: jede)."""
    if session.get("role") == "admin":
        return conn.execute("SELECT * FROM classes WHERE id=?", (class_id,)).fetchone()
    return conn.execute(
        "SELECT * FROM classes WHERE id=? AND teacher_id=?", (class_id, session["user_id"])
    ).fetchone()


def _schueler(conn, user_id):
    """Ein Schüler-Account, wenn seine Klasse der Lehrkraft gehört (Admin: jeder)."""
    row = conn.execute(
        "SELECT u.*, c.teacher_id FROM users u LEFT JOIN classes c ON c.id=u.class_id WHERE u.id=? AND u.role='student'",
        (user_id,),
    ).fetchone()
    if not row:
        return None
    if session.get("role") != "admin" and row["teacher_id"] != session["user_id"]:
        return None
    return row


@bp.get("/classes")
@roles_required("teacher", "admin")
def klassen():
    conn = get_db()
    if session["role"] == "admin":
        rows = conn.execute(
            """SELECT c.*, t.pseudonym AS lehrkraft,
                 (SELECT COUNT(*) FROM users u WHERE u.class_id=c.id AND u.role='student') AS anzahl
               FROM classes c LEFT JOIN users t ON t.id=c.teacher_id ORDER BY c.created_at"""
        ).fetchall()
    else:
        rows = conn.execute(
            """SELECT c.*, NULL AS lehrkraft,
                 (SELECT COUNT(*) FROM users u WHERE u.class_id=c.id AND u.role='student') AS anzahl
               FROM classes c WHERE c.teacher_id=? ORDER BY c.created_at""",
            (session["user_id"],),
        ).fetchall()
    return jsonify({
        "klassen": [
            {"id": r["id"], "name": r["name"], "anzahl": r["anzahl"], "erstellt": r["created_at"], "lehrkraft": r["lehrkraft"]}
            for r in rows
        ]
    })


@bp.post("/classes")
@roles_required("teacher", "admin")
def klasse_anlegen():
    data = request.get_json(force=True, silent=True) or {}
    name = (data.get("name") or "").strip()[:60]
    if not name:
        return jsonify({"fehler": "Die Klasse braucht einen Namen."}), 400
    conn = get_db()
    cur = conn.execute("INSERT INTO classes (name, teacher_id) VALUES (?, ?)", (name, session["user_id"]))
    conn.commit()
    return jsonify({"id": cur.lastrowid, "name": name})


@bp.delete("/classes/<int:class_id>")
@roles_required("teacher", "admin")
def klasse_loeschen(class_id):
    conn = get_db()
    if not _klasse(conn, class_id):
        return jsonify({"fehler": "Klasse nicht gefunden."}), 404
    # Schüler-Accounts und Spielstände hängen an der Klasse (ON DELETE CASCADE).
    conn.execute("DELETE FROM classes WHERE id=?", (class_id,))
    conn.commit()
    return jsonify({"ok": True})


@bp.post("/classes/<int:class_id>/accounts")
@roles_required("teacher", "admin")
def accounts_erzeugen(class_id):
    conn = get_db()
    if not _klasse(conn, class_id):
        return jsonify({"fehler": "Klasse nicht gefunden."}), 404
    data = request.get_json(force=True, silent=True) or {}
    try:
        anzahl = int(data.get("anzahl") or 1)
    except (TypeError, ValueError):
        anzahl = 1
    anzahl = max(1, min(anzahl, MAX_ACCOUNTS))
    vergeben = {r["pseudonym"] for r in conn.execute("SELECT pseudonym FROM users").fetchall()}
    accounts = []
    for _ in range(anzahl):
        pseudonym = neues_pseudonym(vergeben)
        vergeben.add(pseudonym)
        passwort = neues_passwort()
        conn.execute(
            "INSERT INTO users (pseudonym, password_hash, role, class_id) VALUES (?, ?, 'student', ?)",
            (pseudonym, hash_password(passwort), class_id),
        )
        accounts.append({"pseudonym": pseudonym, "passwort": passwort})
    conn.commit()
    return jsonify({"accounts": accounts})


@bp.get("/classes/<int:class_id>/progress")
@roles_required("teacher", "admin")
def klassen_fortschritt(class_id):
    conn = get_db()
    if not _klasse(conn, class_id):
        return jsonify({"fehler": "Klasse nicht gefunden."}), 404
    rows = conn.execute(
        """SELECT u.id, u.pseudonym, u.last_active,
                  COALESCE(p.orte, 0) AS orte, COALESCE(p.lektionen, 0) AS lektionen,
                  COALESCE(p.sterne, 0) AS sterne, COALESCE(p.xp, 0) AS xp
           FROM users u LEFT JOIN progress p ON p.user_id=u.id
           WHERE u.class_id=? AND u.role='student' ORDER BY u.pseudonym""",
        (class_id,),
    ).fetchall()
    return jsonify({
        "schueler": [
            {
                "id": r["id"], "pseudonym": r["pseudonym"], "orte": r["orte"], "lektionen": r["lektionen"],
                "sterne": r["sterne"], "xp": r["xp"], "zuletzt": _iso(r["last_active"]),
            }
            for r in rows
        ]
    })


@bp.post("/users/<int:user_id>/reset")
@roles_required("teacher", "admin")
def passwort_zuruecksetzen(user_id):
    conn = get_db()
    schueler = _schueler(conn, user_id)
    if not schueler:
        return jsonify({"fehler": "Account nicht gefunden."}), 404
    passwort = neues_passwort()
    conn.execute("UPDATE users SET password_hash=? WHERE id=?", (hash_password(passwort), user_id))
    conn.commit()
    return jsonify({"account": {"pseudonym": schueler["pseudonym"], "passwort": passwort}})


@bp.delete("/users/<int:user_id>")
@roles_required("teacher", "admin")
def schueler_loeschen(user_id):
    conn = get_db()
    if not _schueler(conn, user_id):
        return jsonify({"fehler": "Account nicht gefunden."}), 404
    conn.execute("DELETE FROM users WHERE id=?", (user_id,))
    conn.commit()
    return jsonify({"ok": True})


def _iso(sqlite_datetime):
    # SQLite datetime('now') ist UTC ohne Zeitzone → als ISO mit Z, damit der Browser es richtig umrechnet
    return f"{sqlite_datetime.replace(' ', 'T')}Z" if sqlite_datetime else None
