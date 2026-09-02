#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Arbeitsblatt-Generator der WebWerkstatt.

Baut aus den Lektions-JSONs eines Kapitels ein Informations- & Aufgabenblatt
im Layout der Arbeitsblatt-Skill-Familie (Akzentband, Kopfzeile Klasse|Fach|Logo,
Ausgangssituation, Infokästen, Selbstkontrolle, genau eine Figur) und rendert
es über build_pdf.py des layout-arbeitsblatt-Skills (Playwright) nach A4-PDF.

Aufruf:
    python build_worksheet.py 03-text
    python build_worksheet.py --all
    python build_worksheet.py --all --no-pdf     (nur HTML)
    python build_worksheet.py 03-text --png      (zusätzlich Vorschau-PNGs)
"""

import html
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

PROJEKT = Path(__file__).resolve().parent.parent
CONTENT = PROJEKT / "public" / "content"
AUSGABE = Path(__file__).resolve().parent / "blaetter"
WORKSHEETS = PROJEKT / "public" / "worksheets"
BUILD_PDF = Path.home() / ".claude" / "skills" / "layout-arbeitsblatt" / "scripts" / "build_pdf.py"

KLASSE = "BK1T / TG"
FACH = "Informationstechnik"

# Ausgangssituation je Kapitel – Pflichtbaustein der Skill-Familie:
# wirft eine Frage auf, die das Blatt mit den erarbeiteten Ergebnissen beantwortet.
SITUATIONEN = {
    "01-wie-das-web-funktioniert": (
        "Lea tippt <b>cafe-pause.de</b> in ihr Handy und einen Wimpernschlag später ist die Seite da – "
        "mit Bildern, Speisekarte, allem. Ben fragt: „Wo kommt das eigentlich her? Liegt die Seite auf deinem Handy?“",
        "Was passiert wirklich zwischen dem Tippen der Adresse und der fertigen Seite?",
    ),
    "02-html-erste-schritte": (
        "Die Schülerfirma <b>Café Pause</b> braucht eine Website. Eine Agentur will 1.200&nbsp;Euro – "
        "dabei besteht eine Webseite am Ende nur aus einer Textdatei mit ein paar spitzen Klammern.",
        "Was steckt in so einer HTML-Datei – und schaffst du die erste Seite selbst?",
    ),
    "03-text": (
        "Der erste Entwurf der Café-Seite ist online, aber alles sieht gleich aus: kein Titel, keine Absätze, "
        "eine einzige Textwurst. Die Kundschaft findet die Öffnungszeiten nicht.",
        "Mit welchen Elementen bringst du Ordnung und Betonung in den Text?",
    ),
    "04-listen": (
        "Das Café Pause will seine Angebote zeigen: Getränke, Snacks, und eine Anleitung zum Vorbestellen. "
        "Als Fließtext liest das niemand.",
        "Welche Listenart passt zu welchem Inhalt – und wie steckt man Listen ineinander?",
    ),
    "05-links": (
        "Eine Website ist mehr als eine Seite: Speisekarte, Galerie, Kontakt. "
        "Aber wie kommt man von einer Seite zur anderen – und innerhalb einer langen Seite nach unten?",
        "Wie verknüpfst du Seiten untereinander, nach außen und mit Sprungmarken?",
    ),
    "06-bilder-und-medien": (
        "Text überzeugt, aber niemand bestellt Kuchen, den er nicht gesehen hat. "
        "Das Café will Fotos, einen Jingle und vielleicht ein Video auf die Seite bringen.",
        "Wie bindest du Bilder, Audio und Video korrekt ein – und warum braucht jedes Bild einen alt-Text?",
    ),
    "07-tabellen": (
        "Die Speisekarte auf einem Zettel: Getränk, Größe, Preis – drei Angaben pro Zeile. "
        "Mit Absätzen und Listen wird das krumm und schief.",
        "Wie baust du aus Zeilen und Zellen eine saubere Tabelle mit Kopfzeile?",
    ),
    "08-struktur-und-attribute": (
        "Die Café-Startseite ist gewachsen – und unübersichtlich geworden. Wo fängt die Navigation an, "
        "wo hört der Inhalt auf? Der Code braucht Struktur, bevor CSS ihn gestalten kann.",
        "Wie gliederst du eine Seite mit class, id und semantischen Bereichen?",
    ),
    "09-formulare": (
        "Kundinnen und Kunden wollen dem Café schreiben: Name, E-Mail, Anliegen. "
        "Dafür braucht die Seite Eingabefelder – aber welche, und wie beschriftet man sie richtig?",
        "Wie baust du ein Formular, das jeder versteht und bedienen kann?",
    ),
    "10-css-grundlagen": (
        "Die Café-Seite steht – aber schwarz auf weiß in Times New Roman. "
        "Die Konkurrenz nebenan sieht aus wie aus dem Designstudio.",
        "Wie kommen Farben auf die Seite – und an welchen drei Orten darf CSS überhaupt stehen?",
    ),
    "11-selektoren": (
        "Eine Regel für ALLE Absätze reicht nicht mehr: Warnhinweise sollen rot sein, das Fazit gelb, "
        "der Rest normal. CSS muss gezielt treffen.",
        "Mit welchen Selektoren sprichst du genau die richtigen Elemente an?",
    ),
    "12-schrift-und-text": (
        "Zwei Cafés, dieselben Preise – aber eines wirkt edel, das andere billig. "
        "Der Unterschied ist oft nur: Schriftart, Schriftgröße, Ausrichtung.",
        "Wie setzt du Typografie gezielt ein, ohne die Lesbarkeit zu opfern?",
    ),
    "13-box-modell": (
        "Der Text klebt am Rand, die Hinweise kleben aneinander. Auf Profi-Seiten hat alles Luft "
        "und sitzt in sauberen Kästen mit runden Ecken.",
        "Wie funktionieren Rahmen, Innen- und Außenabstand – das Box-Modell?",
    ),
    "14-flexbox": (
        "Die Navigations-Links des Cafés stapeln sich untereinander wie eine Einkaufsliste. "
        "Auf echten Seiten stehen sie nebeneinander in einer Leiste – sauber verteilt und zentriert.",
        "Wie ordnet Flexbox Elemente nebeneinander an und richtet sie aus?",
    ),
    "15-recht-im-web": (
        "Das Café Pause will online gehen. Ein Mitschüler warnt: „Ohne Impressum kannst du abgemahnt werden. "
        "Und das Kuchenfoto aus Google darfst du sowieso nicht nehmen.“ Stimmt das?",
        "Welche Regeln gelten für Bilder, Impressum und Datenschutz auf echten Webseiten?",
    ),
    "16-javascript-start": (
        "Die Café-Seite kann sich nicht bewegen: kein Knopf reagiert, nichts rechnet. "
        "Dafür braucht es eine echte Programmiersprache – die Sprache des Webs.",
        "Wie gibt JavaScript etwas aus, merkt sich Werte und rechnet damit?",
    ),
    "17-javascript-dom": (
        "Ein Knopf „Haben wir gerade offen?“ soll beim Klick antworten – ohne dass die Seite neu lädt. "
        "Dafür müssen HTML und JavaScript ineinandergreifen.",
        "Wie findet JavaScript Elemente auf der Seite und reagiert auf Klicks?",
    ),
    "18-projekt-finale": (
        "Fünf Seiten, ein Stylesheet, ein Klick-Skript: Alle Etappen des Café-Projekts liegen vor. "
        "Jetzt zeigt sich, ob daraus eine echte, zusammenhängende Website wird.",
        "Hält deine Website dem Praxistest stand – Navigation, Inhalt, Gestaltung, Recht?",
    ),
}

SPRUECHE = [
    "Erst lesen, dann tippen – spart die halbe Fehlersuche.",
    "Schließe jeden Tag, den du öffnest!",
    "Klein anfangen, oft testen – so arbeiten Profis.",
    "Schon fertig? Dann ist die Zusatzaufgabe dran.",
    "Vergleiche dein Ergebnis Zeichen für Zeichen mit der Vorschau.",
]

ROBOTER_SVG = """<svg class="figur-svg" viewBox="0 0 80 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Roboter">
  <line x1="40" y1="15" x2="40" y2="8" stroke="var(--brand)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="40" cy="6" r="4" fill="var(--accent)"/>
  <rect x="8" y="60" width="9" height="22" rx="4.5" fill="var(--brand)"/>
  <rect x="63" y="60" width="9" height="22" rx="4.5" fill="var(--brand)"/>
  <rect x="16" y="15" width="48" height="38" rx="9" fill="var(--brand)"/>
  <circle cx="31" cy="31" r="6.2" fill="#fff"/><circle cx="49" cy="31" r="6.2" fill="#fff"/>
  <circle cx="32.5" cy="32" r="2.9" fill="var(--brand)"/><circle cx="50.5" cy="32" r="2.9" fill="var(--brand)"/>
  <rect x="32" y="42" width="16" height="4" rx="2" fill="var(--accent)"/>
  <rect x="35.5" y="53" width="9" height="5" fill="var(--brand)"/>
  <rect x="20" y="58" width="40" height="29" rx="7" fill="var(--accent)"/>
  <rect x="30" y="65" width="20" height="13" rx="3" fill="#fff"/>
  <circle cx="36" cy="71.5" r="2.4" fill="var(--brand)"/><circle cx="44" cy="71.5" r="2.4" fill="var(--brand)"/>
  <rect x="26" y="87" width="10" height="9" rx="3" fill="var(--brand)"/>
  <rect x="44" y="87" width="10" height="9" rx="3" fill="var(--brand)"/>
</svg>"""


def md_inline(text):
    """**fett** und `code` innerhalb einer Zeile, Rest escaped."""
    out = html.escape(text)
    out = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", out)
    out = re.sub(r"`([^`]+)`", r"<code>\1</code>", out)
    return out


def md_block(text, max_absaetze=None):
    """Mini-Markdown der Lektionen -> Bausteine der Blatt-Familie."""
    teile = str(text or "").split("```")
    st = []
    absatz_zahl = 0
    for i, teil in enumerate(teile):
        if i % 2 == 1:  # Codeblock
            code = re.sub(r"^[a-z]*\n", "", teil).rstrip("\n")
            st.append('<pre class="code">' + html.escape(code) + "</pre>")
            continue
        for absatz in re.split(r"\n\s*\n", teil):
            absatz = absatz.strip()
            if not absatz:
                continue
            if max_absaetze is not None and absatz_zahl >= max_absaetze:
                return "".join(st)
            st.append("<p>" + md_inline(absatz).replace("\n", "<br>") + "</p>")
            absatz_zahl += 1
    return "".join(st)


def code_kasten_hoehe(step):
    """Höhe der Code-Freifläche aus dem Umfang der Musterlösung ableiten."""
    loesung = ""
    if isinstance(step.get("solution"), dict):
        loesung = "\n".join(v for v in step["solution"].values() if v)
    zeilen = max(4, loesung.count("\n") + 1)
    return min(80, 22 + zeilen * 4)


def lade(pfad):
    return json.loads(pfad.read_text(encoding="utf-8"))


def baue_blatt(chapter_id, kapitel_nr):
    kapitel = lade(CONTENT / "chapters" / chapter_id / "chapter.json")
    lektionen = []
    for lid in kapitel["lessons"]:
        pfad = CONTENT / "chapters" / chapter_id / "lessons" / f"{lid}.json"
        if pfad.exists():
            lektionen.append(lade(pfad))
        else:
            print(f"  WARNUNG: {chapter_id}/{lid}.json fehlt – wird übersprungen")

    situation, frage = SITUATIONEN.get(
        chapter_id,
        (kapitel["description"], "Was steckt dahinter?"),
    )

    st = []
    st.append(
        f'<h1 class="sheet-title">WebWerkstatt – {html.escape(kapitel["title"])}'
        f'<span class="untertitel">Informations- &amp; Aufgabenblatt · Kapitel {kapitel_nr}</span></h1>'
    )
    st.append(
        '<section class="situation"><h2 class="sit-label">Ausgangssituation</h2>'
        f"<p>{situation}</p>"
        f'<p class="frage">{html.escape(frage)}</p></section>'
    )

    aufgabe_nr = 0
    figur_gesetzt = False

    for index, lektion in enumerate(lektionen):
        ist_wiederholung = "wiederholung" in lektion["id"]
        ist_projekt = "projekt" in lektion["id"]
        steps = lektion.get("steps", [])
        kurz = html.escape(lektion["title"])

        # 1) Wissen: erster explain als Infokasten (max. 3 Absätze, Codeblock erlaubt)
        if not ist_wiederholung:
            expl = next((s for s in steps if s["type"] == "explain"), None)
            if expl:
                badge = "info merke" if ist_projekt else "info"
                # Puffer-Wrapper: das Badge ragt 3,5 mm über den Kasten hinaus und
                # würde am Seitenanfang von der Kopfzeile abgeschnitten – Padding
                # bleibt (anders als Margin) auch nach einem Seitenumbruch erhalten.
                st.append(
                    f'<div class="info-puffer"><aside class="{badge}"><h3>{kurz}</h3>'
                    + md_block(expl["text"], max_absaetze=3)
                    + "</aside></div>"
                )

        # 2) Aufgaben: erstes Quiz ODER erste Lücke, danach die letzte Code-Aufgabe
        quiz = next((s for s in steps if s["type"] == "quiz"), None)
        fill = next((s for s in steps if s["type"] == "fill"), None)
        codes = [s for s in steps if s["type"] == "code"]
        auswahl = []
        if quiz:
            auswahl.append(quiz)
        elif fill:
            auswahl.append(fill)
        if codes:
            auswahl.append(codes[-1])
        if ist_wiederholung:  # Wiederholungen: zwei Aufgaben, kein Infokasten
            auswahl = [s for s in (quiz, fill, codes[-1] if codes else None) if s][:2]

        for step in auswahl:
            aufgabe_nr += 1
            klasse = "task"
            if ist_wiederholung:
                titel_zusatz = f"Wiederholung: {kurz.replace('Wiederholung', '').strip(' :–-') or 'früherer Stoff'}"
            elif ist_projekt:
                titel_zusatz = "Projekt Café Pause"
            else:
                titel_zusatz = kurz
            if step["type"] == "quiz":
                meta = "AFB I · 3 min"
                inhalt = "<p>" + md_inline(step["question"]) + "</p>" + "".join(
                    f'<p class="opt-zeile"><span class="chk"></span> {md_inline(opt)}</p>'
                    for opt in step["options"]
                )
            elif step["type"] == "fill":
                meta = "AFB I · 3 min"
                inhalt = (
                    "<p>" + md_inline(step["text"]) + "</p>"
                    + '<pre class="code">' + html.escape(step["template"]) + "</pre>"
                    + '<div class="answer" style="--lines:1"></div>'
                )
            else:  # code
                meta = ("AFB III · 15 min" if ist_projekt else "AFB II · 8 min")
                starter = step.get("starter", {})
                starter_datei = next((starter[k] for k in ("html", "css", "js") if starter.get(k)), "")
                starter_html = ""
                zeilen = [z for z in starter_datei.splitlines() if z.strip()]
                if zeilen and len(zeilen) <= 14:
                    starter_html = '<pre class="code">' + html.escape("\n".join(zeilen)) + "</pre>"
                inhalt = (
                    md_block(step["task"])
                    + starter_html
                    + f'<div class="kasten" style="--h:{code_kasten_hoehe(step)}mm"></div>'
                )
            st.append(
                f'<article class="{klasse}">'
                f'<h2 class="task-title">Aufgabe {aufgabe_nr} — {titel_zusatz}'
                f'<span class="task-meta">{meta}</span></h2>'
                + inhalt
                + "</article>"
            )

        # Figur einmalig nach der ersten Lektion
        if not figur_gesetzt and index == 0:
            spruch = SPRUECHE[(kapitel_nr - 1) % len(SPRUECHE)]
            st.append(
                '<aside class="maskottchen">' + ROBOTER_SVG
                + f'<p class="blase">{html.escape(spruch)}</p></aside>'
            )
            figur_gesetzt = True

    # Selbstkontrolle aus den Lernlektionen
    checks = "".join(
        f'<p><span class="chk"></span> Ich kann: {html.escape(l["title"])}</p>'
        for l in lektionen
        if "wiederholung" not in l["id"]
    )
    st.append(
        '<section class="selbstcheck"><h2>Selbstkontrolle</h2>'
        + checks
        + "<p>Alle Aufgaben kannst du in der WebWerkstatt-App selbst prüfen – dort gibt es zu jeder Aufgabe gestufte Tipps.</p></section>"
    )

    kopf = (
        "<!doctype html>\n<html lang=\"de\">\n<head>\n<meta charset=\"utf-8\">\n"
        f"<title>WebWerkstatt Kapitel {kapitel_nr}</title>\n"
        "<link rel=\"stylesheet\" href=\"file:///"
        + str(Path.home()).replace("\\", "/")
        + "/.claude/skills/layout-arbeitsblatt/assets/opensans.css\">\n"
        "<link rel=\"stylesheet\" href=\"file:///"
        + str(Path.home()).replace("\\", "/")
        + "/.claude/skills/layout-arbeitsblatt/assets/arbeitsblatt.css\">\n"
        "<style>.opt-zeile{margin:1mm 0;} .info-puffer{padding-top:3.5mm;break-inside:avoid;page-break-inside:avoid;} .info-puffer aside.info{margin-top:0;}</style>\n"
        "</head>\n"
        f'<body data-schule="JJWS" data-klasse="{KLASSE}" data-fach="{FACH}" data-lehrkraft="Riegert">\n'
    )
    return kopf + "\n".join(st) + "\n</body>\n</html>\n"


def main():
    args = [a for a in sys.argv[1:]]
    png = "--png" in args
    no_pdf = "--no-pdf" in args
    args = [a for a in args if not a.startswith("--")]

    curriculum = lade(CONTENT / "curriculum.json")
    alle = [c for b in curriculum["blocks"] for c in b["chapters"]]
    ziele = alle if not args or "--all" in sys.argv else args

    AUSGABE.mkdir(exist_ok=True)
    WORKSHEETS.mkdir(exist_ok=True)

    for chapter_id in ziele:
        nr = alle.index(chapter_id) + 1
        blatt_html = baue_blatt(chapter_id, nr)
        html_pfad = AUSGABE / f"Kapitel_{nr:02d}_{chapter_id}.html"
        html_pfad.write_text(blatt_html, encoding="utf-8")
        print(f"HTML: {html_pfad.name}")
        if no_pdf:
            continue
        cmd = [sys.executable, str(BUILD_PDF), str(html_pfad)]
        if png:
            cmd.append("--png")
        ergebnis = subprocess.run(cmd, capture_output=True, text=True)
        if ergebnis.returncode != 0:
            print(f"  PDF-FEHLER: {ergebnis.stderr.strip()[:400]}")
            sys.exit(1)
        pdf_pfad = html_pfad.with_suffix(".pdf")
        shutil.copy2(pdf_pfad, WORKSHEETS / f"{chapter_id}.pdf")
        print(f"  PDF: {pdf_pfad.name}  (+ public/worksheets/{chapter_id}.pdf)")


if __name__ == "__main__":
    main()
