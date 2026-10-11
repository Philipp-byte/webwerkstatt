"""Admin-Bereich: Lehrkraft-Accounts anlegen, zurücksetzen, löschen."""

import sqlite3

from flask import Blueprint, jsonify, request, session

from auth import MIN_PASSWORT, hash_password, roles_required
from db import get_db

bp = Blueprint("admin", __name__, url_prefix="/api/admin")


@bp.get("/teachers")
@roles_required("admin")
def lehrkraefte():
    conn = get_db()
    rows = conn.execute(
        """SELECT u.id, u.pseudonym, u.role, u.created_at, u.last_active,
                  (SELECT COUNT(*) FROM classes c WHERE c.teacher_id=u.id) AS klassen
           FROM users u WHERE u.role IN ('teacher', 'admin') ORDER BY u.role, u.pseudonym"""
    ).fetchall()
    return jsonify({
        "lehrkraefte": [
            {"id": r["id"], "pseudonym": r["pseudonym"], "rolle": r["role"], "klassen": r["klassen"], "erstellt": r["created_at"], "zuletzt": r["last_active"]}
            for r in rows
        ]
    })


@bp.post("/teachers")
@roles_required("admin")
def lehrkraft_anlegen():
    data = request.get_json(force=True, silent=True) or {}
    pseudonym = (data.get("pseudonym") or "").strip()[:40]
    passwort = data.get("passwort") or ""
    rolle = data.get("rolle") or "teacher"
    if rolle not in ("teacher", "admin"):
        return jsonify({"fehler": "Unbekannte Rolle."}), 400
    if not pseudonym:
        return jsonify({"fehler": "Pseudonym fehlt."}), 400
    if len(passwort) < MIN_PASSWORT:
        return jsonify({"fehler": f"Das Passwort braucht mindestens {MIN_PASSWORT} Zeichen."}), 400
    conn = get_db()
    try:
        cur = conn.execute(
            "INSERT INTO users (pseudonym, password_hash, role) VALUES (?, ?, ?)",
            (pseudonym, hash_password(passwort), rolle),
        )
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({"fehler": "Dieses Pseudonym gibt es schon."}), 409
    return jsonify({"id": cur.lastrowid, "pseudonym": pseudonym, "rolle": rolle})


@bp.post("/teachers/<int:user_id>/reset")
@roles_required("admin")
def lehrkraft_passwort(user_id):
    data = request.get_json(force=True, silent=True) or {}
    passwort = data.get("passwort") or ""
    if len(passwort) < MIN_PASSWORT:
        return jsonify({"fehler": f"Das Passwort braucht mindestens {MIN_PASSWORT} Zeichen."}), 400
    conn = get_db()
    row = conn.execute("SELECT id FROM users WHERE id=? AND role IN ('teacher', 'admin')", (user_id,)).fetchone()
    if not row:
        return jsonify({"fehler": "Account nicht gefunden."}), 404
    conn.execute("UPDATE users SET password_hash=? WHERE id=?", (hash_password(passwort), user_id))
    conn.commit()
    return jsonify({"ok": True})


@bp.delete("/teachers/<int:user_id>")
@roles_required("admin")
def lehrkraft_loeschen(user_id):
    if user_id == session["user_id"]:
        return jsonify({"fehler": "Den eigenen Account kann man nicht löschen."}), 400
    conn = get_db()
    row = conn.execute("SELECT id FROM users WHERE id=? AND role IN ('teacher', 'admin')", (user_id,)).fetchone()
    if not row:
        return jsonify({"fehler": "Account nicht gefunden."}), 404
    # Die Klassen bleiben bestehen (teacher_id wird NULL); ein Admin sieht sie weiterhin.
    conn.execute("DELETE FROM users WHERE id=?", (user_id,))
    conn.commit()
    return jsonify({"ok": True})
