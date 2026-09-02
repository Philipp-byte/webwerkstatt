"""Generiert anonyme Benutzernamen + Startpasswoerter fuer Schueler-Accounts.
Kein Klarname, keine E-Mail - Datenschutz durch Pseudonymisierung.
Die Zuordnung zu echten SuS bleibt Offline-Sache der Lehrkraft (Druckliste)."""

import random

ADJECTIVES = [
    "Mutiger", "Kluger", "Schneller", "Freundlicher", "Neugieriger",
    "Tapferer", "Wilder", "Stiller", "Flinker", "Heller", "Froehlicher",
    "Geschickter", "Ruhiger", "Pfiffiger", "Cleverer",
]

ANIMALS = [
    "Fuchs", "Eule", "Baer", "Igel", "Falke", "Luchs", "Wolf", "Hase",
    "Adler", "Delfin", "Panda", "Tiger", "Otter", "Rabe", "Marder",
]


def generate_pseudonym(existing_pseudonyms):
    for _ in range(500):
        candidate = (
            f"{random.choice(ADJECTIVES)}{random.choice(ANIMALS)}"
            f"{random.randint(1, 99)}"
        )
        if candidate not in existing_pseudonyms:
            return candidate
    raise RuntimeError("Konnte kein freies Pseudonym generieren.")


def generate_start_password():
    # Sechsstellige Ziffernfolge - leicht zu tippen und vorzulesen.
    return f"{random.randint(0, 999999):06d}"
