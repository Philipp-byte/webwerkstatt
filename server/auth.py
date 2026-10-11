"""Passwort-Hashing und Login-Schutz für die API-Routen."""

from functools import wraps

from flask import jsonify, session
from werkzeug.security import check_password_hash, generate_password_hash

MIN_PASSWORT = 6


def hash_password(password):
    return generate_password_hash(password)


def verify_password(password, password_hash):
    return check_password_hash(password_hash, password)


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"fehler": "Bitte zuerst anmelden."}), 401
        return f(*args, **kwargs)

    return wrapper


def roles_required(*roles):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if "user_id" not in session:
                return jsonify({"fehler": "Bitte zuerst anmelden."}), 401
            if session.get("role") not in roles:
                return jsonify({"fehler": "Dafür fehlt die Berechtigung."}), 403
            return f(*args, **kwargs)

        return wrapper

    return decorator
