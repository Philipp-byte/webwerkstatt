-- WebWerkstatt Schulmodus – Datenmodell. Bewusst schlank: SQLite, eine Datei,
-- kein ORM, keine Migrationswerkzeuge. Es werden KEINE personenbezogenen Daten
-- gespeichert: nur Pseudonym, Passwort-Hash und der Spielstand. Welches Pseudonym
-- zu wem gehört, steht allein auf der gedruckten Liste der Lehrkraft.

CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudonym TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    -- Schüler-Accounts hängen an ihrer Klasse: Klasse löschen = Accounts löschen.
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_active TEXT
);

-- Der komplette Spielstand der App (src/store.js) als ein JSON-Dokument je Account,
-- dazu vier Kennzahlen für die Klassenübersicht (werden beim Speichern berechnet).
CREATE TABLE IF NOT EXISTS progress (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    spielstand TEXT NOT NULL,
    orte INTEGER NOT NULL DEFAULT 0,
    lektionen INTEGER NOT NULL DEFAULT 0,
    sterne INTEGER NOT NULL DEFAULT 0,
    xp INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_class ON users(class_id);
