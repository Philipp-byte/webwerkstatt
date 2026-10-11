# Offene Fragen an Philipp

Antworten bitte einfach in den Chat – ich passe Konzept und Inhalte dann an. Bis dahin gelten die genannten Annahmen.

## SCHATTENNETZ (seit 11.10.2026)

1. **Bilder erzeugen:** Die Grafik-Pipeline (`npm run grafiken`, 82 Bilder über die OpenAI-Bild-API) ist fertig, konnte in der Cloud-Sitzung aber nicht laufen: Es fehlen der Schlüssel und die Netzfreigabe. Bitte in den Einstellungen der Cloud-Umgebung (Umgebung → Bearbeiten) unter **Netzwerk** die Domain `api.openai.com` freigeben und unter **Umgebungsvariablen/Secrets** `OPENAI_API_KEY` hinterlegen – nicht in den Chat schreiben. In einer neuen Sitzung erzeuge ich dann alle Bilder und rendere den Vorspann mit den gezeichneten Szenen. Alternativ läuft `OPENAI_API_KEY=… npm run grafiken` auch auf deinem Rechner (ca. 20–40 Minuten, Kosten je nach Qualität; `--qualitaet low` zum Ausprobieren).
2. **Server:** Wo soll der Schulserver laufen – im Schulnetz, auf einem eigenen Rechner oder bei einem Hoster? `server/README.md` beschreibt beides (direkt mit Python oder per Docker). Für Zugriff von außen gehört HTTPS davor (Reverse-Proxy); im Schulnetz reicht HTTP. Soll ich eine `docker-compose.yml` mit Caddy (automatisches HTTPS) dazulegen?
3. **Accounts:** Pseudonyme sehen so aus: `HellerFunke17`, Startpasswörter haben acht Zeichen (`kx7mp4qz`). Lernende können das Passwort unter „Ich“ ändern. Sollen Lehrkräfte stattdessen eigene Pseudonyme vergeben dürfen (z. B. Vornamen-Kürzel)?
4. **Vorspann-Pflicht:** Beim ersten Start läuft das Video ohne Überspringen (74 s). „Lieber lesen“ bleibt als Ausweg (Lesefassung mit sechs Bildern). Soll auch das verschwinden, oder passt es so?
5. **Spott-Härte:** Die Gespinste spotten in fester Reihenfolge und werden mit jedem Fehler frecher („Hihi, ein Knoten. Mein Werk.“ …). Frecher oder braver? Seidras Sätze („Noch ein Lehrling. Noch ein Knoten, den ich lösen werde.“) genauso?
6. **Hinterhalt-Pflicht:** Nach jeder zweiten Lektion sperrt ein Hinterhalt die nächste Lektion, bis er einmal gespielt wurde (Ergebnis egal). Zu viel? Alternative: nur empfohlen, nicht gesperrt.
7. **Duell als Sperre:** Der nächste Ort öffnet sich erst nach gewonnenem Duell (≥ 80 %). So lassen, oder alle Orte offen (Duell nur als Bonus)? Lehrkräfte können im Lehrkraft-Modus alles freischalten.
8. **Stimmen im Vorspann:** Das Video läuft mit Untertiteln und Soundtrack, ohne Sprecherstimme. Mit einem TTS-Schlüssel ließen sich Stimmen für Sam, Seidra, Robby und die Erzählung erzeugen – oder ihr nehmt sie selbst auf (Schülerprojekt). Wunsch?
9. **Welt-Texte gegenlesen:** Orts-Einleitungen, Regeln und Beispiele je Ort (`public/content/story/welt.json`) und die Sprüche der Figuren (`figuren.json`) bitte einmal fachlich und vom Ton her gegenlesen – besonders Siegelhalle (Recht im Web, Ort 15).

## Weiterhin offen

10. **Lösungen:** Aktuell gestufte Tipps ohne Komplettlösung; nach **drei Fehlversuchen** kann ein „Lösungsvergleich“ freigeschaltet werden, der die Lektion auf 1 Stern setzt. Alternativen: (a) gar keine Lösung in der App, (b) Lösung nur im Lehrkraft-Modus sichtbar.
11. **Umfang:** 18 Orte, 86 Lektionen (889 Schritte, 266 Code-Aufgaben). Reicht die Zeit im Schuljahr (ca. 45–55 Unterrichtsstunden)? Soll ich straffen (z. B. Siegelhalle/Recht oder Uhrwerk/JavaScript kürzer)?
12. **JavaScript-Tiefe:** Weiterhin „wenig JavaScript“ (Variablen, Rechnen, Klick, Zähler, Klasse umschalten) – keine if/Schleifen? *Annahme: ja.*
13. **Arbeitsblätter:** Die alten PDF-Arbeitsblätter habe ich nicht neu gebaut. Willst du sie (aus den Lektionen generiert), oder reicht die App plus Spickzettel?
14. **Lehrkraft-Passwort:** Standard `Werkstatt-2026` (nur der Hash liegt im Repo). Anderes setzen? Im Schulmodus braucht es das nicht – dort gibt es echte Lehrkraft-Accounts.
15. **Heller Modus:** Standard ist dunkel; hell per Schalter. Für den Beamer eher hell als Standard?
16. **Lernbericht:** Der druckbare Lernbericht (`#/bericht`) bleibt; im Schulmodus sieht die Lehrkraft die Klasse direkt unter `#/klasse` (Orte, Lektionen, Sterne, XP, zuletzt aktiv). Brauchst du zusätzlich einen CSV-Export?
