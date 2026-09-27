# Offene Fragen an Philipp

Antworten bitte einfach in den Chat – ich passe Konzept und Inhalte dann an. Bis dahin gelten die genannten Annahmen.

1. **Story & Projekt:** Passt die Geschichte „FUNKEN – das Schülerfestival“ mit der Webwerkstatt (Ayla, Jonas, Robby, Sam)? Das gemeinsame Projekt ist die Festival-Website (Start, Programm, Galerie, Tickets, Impressum). *Annahme: ja.* Alternative wäre z. B. ein E-Sport-Team, ein Foodtruck oder ein Jugendzentrum.
2. **Robby als Assistenz-Bot:** Ich nutze dein Robby-Maskottchen (aus dem Arbeitsblatt-Material) als Werkstatt-Bot in der App. Gut so, oder lieber eine neue Figur?
3. **Lösungen:** Du willst keine versteckten Lösungen. Aktuell: gestufte Tipps ohne Komplettlösung; nach **drei Fehlversuchen** kann ein „Lösungsvergleich“ freigeschaltet werden, der die Lektion auf 1 Stern setzt. Alternativen: (a) gar keine Lösung in der App, (b) Lösung nur im Lehrkraft-Modus sichtbar. Was möchtest du?
4. **Abnahme als Sperre:** Das nächste Kapitel wird erst nach bestandener Abnahme (≥ 80 %) frei. Soll das so sein, oder sollen alle Kapitel offen bleiben (die Abnahme dann nur als Bonus)?
5. **Backstage-XP-Deckel:** Minispiele bringen maximal 150 XP pro Tag, damit niemand XP „farmt“. Okay?
6. **Umfang:** 18 Kapitel, 86 Lektionen (ca. 1 000 Schritte, davon ca. 250 Code-Aufgaben). Reicht die Zeit im Schuljahr dafür (ca. 45–55 Unterrichtsstunden)? Soll ich etwas straffen (z. B. Kapitel 15 Recht oder 17 JavaScript kürzer)?
7. **JavaScript-Tiefe:** Weiterhin „wenig JavaScript“ (Variablen, Rechnen, Klick, Zähler, Klasse umschalten) – keine if/Schleifen? *Annahme: ja, wie bisher.*
8. **API-Schlüssel für Bilder/Videos:** In der Cloud-Sitzung habe ich keinen Zugriff auf die Schlüssel auf deinem Rechner. Wenn du sie als Umgebungsvariablen `OPENAI_API_KEY` (und optional `GEMINI_API_KEY`) in den Einstellungen der Cloud-Umgebung hinterlegst (Menü der Umgebung → Bearbeiten → API-Zugangsdaten/Umgebungsvariablen), kann ich in einer neuen Sitzung Szenenbilder und kurze Clips für den Vorspann generieren (`scripts/generate-intro-assets.mjs`). Bitte den Schlüssel **nicht** in den Chat schreiben.
9. **Arbeitsblätter:** Die alten PDF-Arbeitsblätter (Skill-Layout) habe ich nicht neu gebaut. Willst du sie wieder (aus den neuen Lektionen generiert), oder reicht die App plus „Spickzettel“ pro Kapitel?
10. **Lehrkraft-Passwort:** Standard ist `Werkstatt-2026` (nur der Hash liegt im Repo). Soll ich ein anderes setzen?
11. **Heller Modus:** Standard ist dunkel („Werkstatt bei Nacht“); ein heller Modus ist per Schalter da. Soll für den Beamer eher hell Standard sein?
12. **Klasseninterne Rangliste:** Ohne Server geht keine echte Rangliste. Möglich wäre eine „Werkstatt-Wand“, auf der die Lehrkraft exportierte Spielstände einliest und die Klasse anonym (Pseudonym) vergleicht. Wunsch?
