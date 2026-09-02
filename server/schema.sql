-- WebWerkstatt Schulmodus - Datenmodell (nach PyQuest-Vorbild, aber ohne
-- Gamification: kein XP, keine Sterne, keine Badges, keine Rangliste).
-- Bewusst schlank: SQLite, eine Datei, keine Migration-Tools noetig.
-- Es werden KEINE personenbezogenen Daten gespeichert - nur Pseudonym +
-- Fortschritt. Die Zuordnung zu echten SuS bleibt Offline-Sache der
-- Lehrkraft (Druckliste).

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
    class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_active TEXT
);

-- Fortschritt = Lektion erledigt. lesson_id ist der kombinierte Schluessel
-- "kapitelId/lektionsId" - derselbe, den das Frontend im Demo-Modus im
-- localStorage verwendet.
CREATE TABLE IF NOT EXISTS progress (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'done',
    attempts INTEGER NOT NULL DEFAULT 1,
    completed_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, lesson_id)
);

-- Kapitel, die eine Lehrkraft fuer ihre Klasse gesperrt hat (Unterrichtstempo
-- steuern). Keine Zeile = Kapitel offen. locked=1 = gesperrt.
CREATE TABLE IF NOT EXISTS unlocks (
    class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    chapter_id TEXT NOT NULL,
    locked INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (class_id, chapter_id)
);

-- Globale Einstellungen (Admin-Bereich), z. B. school_name.
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
);
