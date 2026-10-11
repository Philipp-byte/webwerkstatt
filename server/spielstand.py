"""Kennzahlen aus dem Spielstand der App (src/store.js, Version 3) für die
Klassenübersicht. Der Server versteht den Spielstand nicht im Detail – er zählt nur:

  orte       befreite Orte (boss[<kapitel>].passed)
  lektionen  abgeschlossene Lektionen (lessons[<key>].done)
  sterne     Sterne aus Lektionen plus Sterne aus Hinterhalten
  xp         Erfahrungspunkte
"""

MAX_SPIELSTAND_BYTES = 1_500_000


def zusammenfassung(sp):
    if not isinstance(sp, dict):
        return {"orte": 0, "lektionen": 0, "sterne": 0, "xp": 0}
    boss = sp.get("boss") or {}
    orte = sum(1 for b in boss.values() if isinstance(b, dict) and b.get("passed"))
    lessons = sp.get("lessons") or {}
    fertig = [l for l in lessons.values() if isinstance(l, dict) and l.get("done")]
    knoten = ((sp.get("hinterhalte") or {}).get("knoten") or {})
    sterne = sum(_int(l.get("stars")) for l in fertig) + sum(
        _int(k.get("sterne")) for k in knoten.values() if isinstance(k, dict)
    )
    return {"orte": orte, "lektionen": len(fertig), "sterne": sterne, "xp": _int(sp.get("xp"))}


def _int(v):
    try:
        return int(v or 0)
    except (TypeError, ValueError):
        return 0
