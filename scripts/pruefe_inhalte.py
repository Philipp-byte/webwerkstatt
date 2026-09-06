#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Headless-Selbstprüfung der WebWerkstatt-Inhalte (Vorbild: PyQuest verify_lessons).

Öffnet die App-Route #/pruefung in Chromium (Playwright), wartet auf das
Ergebnis in window.__ww_pruefung und meldet:
  - Musterlösungen, die ihre eigenen Tests NICHT bestehen  -> Fehler
  - Aufgaben, die schon mit unverändertem Starter bestehen -> LÜCKE (Fehler)
  - Code-Aufgaben ohne auswertbare Musterlösung            -> Fehler

Aufruf (aus dem Projektordner):
    python scripts/pruefe_inhalte.py                 # startet selbst "npm run dev" auf 5174
    python scripts/pruefe_inhalte.py http://localhost:5174/   # nutzt laufenden Server

Exit-Code 0 = alles grün, 1 = Befunde. Voraussetzung: pip install playwright
und installiertes Chromium (python -m playwright install chromium).
"""

import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

PROJEKT = Path(__file__).resolve().parent.parent

# Windows-Konsole (cp1252) kann Sonderzeichen aus Testdetails nicht ausgeben
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except AttributeError:
    pass


def main():
    url = sys.argv[1] if len(sys.argv) > 1 else None
    dev = None
    if not url:
        dev = subprocess.Popen(
            "npm run dev", cwd=PROJEKT, shell=True,
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        url = "http://localhost:5174/"
        time.sleep(4)

    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch()
            page = browser.new_page()
            page.goto(url.rstrip("/") + "/#/pruefung")
            # Die Prüfung rendert jede Aufgabe in einer Iframe – das dauert.
            page.wait_for_function("window.__ww_pruefung && window.__ww_pruefung.fertig", timeout=600_000)
            bericht = page.evaluate("window.__ww_pruefung")
            browser.close()
    finally:
        if dev:
            dev.terminate()
            subprocess.run("taskkill /F /T /PID %d" % dev.pid, shell=True,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    fehler = bericht["fehler"]
    luecken = bericht["luecken"]
    ohne = bericht["ohneLoesung"]

    print(f"Musterlösungen: {bericht['bestanden']} / {bericht['gesamt']} bestehen alle Tests")
    for f in fehler:
        print(f"  FEHLER  {f['wo']}: {f['was']}")
    for l in luecken:
        print(f"  LÜCKE   {l}: besteht schon mit unverändertem Starter")
    for o in ohne:
        print(f"  FEHLT   {o}: keine auswertbare Musterlösung")

    schlecht = len(fehler) + len(luecken) + len(ohne)
    print(f"\n{'OK' if not schlecht else 'BEFUNDE'}: {schlecht} Problem(e)")
    sys.exit(1 if schlecht else 0)


if __name__ == "__main__":
    main()
