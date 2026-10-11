"""Pseudonyme und Startpasswörter für Lernenden-Accounts.

Kein Klarname, keine E-Mail: Die Zuordnung Pseudonym ↔ Person bleibt auf der
gedruckten Liste der Lehrkraft. Die Namen passen zur Welt von SCHATTENNETZ
(z. B. „HellerFunke17“), alle Hauptwörter sind männlich, damit die Adjektive
stimmen."""

import secrets

ADJEKTIVE = [
    "Heller", "Flinker", "Mutiger", "Kluger", "Stiller", "Wacher", "Schneller",
    "Ruhiger", "Kuehner", "Wilder", "Tapferer", "Pfiffiger", "Findiger", "Flotter",
    "Lustiger", "Scharfer", "Neugieriger", "Geduldiger", "Froher", "Kluger",
]

HAUPTWOERTER = [
    "Funke", "Weber", "Knoten", "Faden", "Strahl", "Anker", "Komet", "Pfeil",
    "Falke", "Fuchs", "Luchs", "Otter", "Rabe", "Igel", "Dachs", "Wolf",
    "Marder", "Hase", "Baer", "Adler", "Kater", "Delfin", "Tiger", "Panda",
]

# Ohne verwechselbare Zeichen (0/O, 1/l/I)
ZEICHEN = "abcdefghjkmnpqrstuvwxyz23456789"


def neues_pseudonym(vergeben):
    for _ in range(1000):
        kandidat = f"{secrets.choice(ADJEKTIVE)}{secrets.choice(HAUPTWOERTER)}{secrets.randbelow(89) + 10}"
        if kandidat not in vergeben:
            return kandidat
    raise RuntimeError("Kein freies Pseudonym gefunden.")


def neues_passwort(laenge=8):
    return "".join(secrets.choice(ZEICHEN) for _ in range(laenge))
