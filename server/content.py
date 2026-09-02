"""Liest dieselben Lerninhalte-JSONs wie das Frontend (public/content/), damit
der Server die Kapitel-Zugehoerigkeit von Lektionen und die Gesamtzahl der
Lektionen kennt, ohne die Inhalte zu duplizieren.

WebWerkstatt-Besonderheit gegenueber PyQuest: curriculum.json gruppiert die
Kapitel in "blocks" - die Kapitelliste ist also blocks[*].chapters."""

import json
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent / "public" / "content"


def load_chapter_lesson_map():
    """Liste aller Kapitel als [{"id": ..., "title": ..., "lessonIds": [...]}]
    in Curriculum-Reihenfolge."""
    curriculum = json.loads((CONTENT_DIR / "curriculum.json").read_text(encoding="utf-8"))
    chapter_ids = [
        chapter_id
        for block in curriculum.get("blocks", [])
        for chapter_id in block.get("chapters", [])
    ]
    chapters = []
    for chapter_id in chapter_ids:
        chapter_path = CONTENT_DIR / "chapters" / chapter_id / "chapter.json"
        chapter = json.loads(chapter_path.read_text(encoding="utf-8"))
        chapters.append({
            "id": chapter["id"],
            "title": chapter.get("title", chapter["id"]),
            "lessonIds": chapter.get("lessons", []),
        })
    return chapters


def total_lesson_count():
    return sum(len(ch["lessonIds"]) for ch in load_chapter_lesson_map())


def chapter_id_for_lesson(lesson_id):
    """Zu welchem Kapitel gehoert eine Lektion? Das Frontend schickt den
    kombinierten Schluessel "kapitelId/lektionsId" (derselbe wie im
    localStorage des Demo-Modus). None, falls unbekannt."""
    if "/" in (lesson_id or ""):
        return lesson_id.split("/", 1)[0]
    for chapter in load_chapter_lesson_map():
        if lesson_id in chapter["lessonIds"]:
            return chapter["id"]
    return None
