# Projekt-Bibel: Café Pause

Das große, durchgängige Projekt der WebWerkstatt. **Alle Projekt-Lektionen halten sich exakt an diese Vorgaben** – nur so bauen die Etappen sauber aufeinander auf und die automatischen Tests bleiben präzise.

## Der fiktive Betrieb

- **Name:** Café Pause (Schülercafé, fiktiv – für Übungszwecke)
- **Adresse:** Café Pause · Musterstraße 12 · 74072 Heilbronn
- **E-Mail:** hallo@cafe-pause-beispiel.de
- **Öffnungszeiten:** Montag bis Freitag, 9:00 bis 15:00 Uhr
- **Betreiber (Impressum):** Schülerfirma Café Pause (fiktiver Betrieb für Übungszwecke)
- **Farbschema (ab CSS-Teil):** Hintergrund Creme `#f7f1e3` · Kaffeebraun `#5a3e2b` (Überschriften/Header) · Akzent-Orange `#e08a2e` · Textfarbe `#2c2016`

## Die Seiten (page-Schlüssel im Projektspeicher)

| page | Datei (im Unterricht) | entsteht in Kapitel |
|---|---|---|
| `index` | index.html | 02 (Grundgerüst), wächst in 03, 04, 05, 08, 17 |
| `speisekarte` | speisekarte.html | 07 |
| `galerie` | galerie.html | 06 |
| `kontakt` | kontakt.html | 09 |
| `impressum` | impressum.html | 15 |

Gemeinsames Stylesheet (`css` im Projektspeicher) entsteht ab Kapitel 10 und gilt für alle Seiten.

## Die Etappen im Detail (verbindliche IDs, Klassen, Texte)

**E1 – Kapitel 02 (`04-projekt-startseite`), page `index`:**
Vollständiges Grundgerüst (`<!DOCTYPE html>`, html, head mit `<title>Café Pause</title>`, body). Im Body: `<h1>Café Pause</h1>` und ein `<p>` Willkommensabsatz, der das Wort „Willkommen“ enthält.

**E2 – Kapitel 03 (`05-projekt-ueber-uns`), page `index`:**
Ergänzt: `<h2>Über uns</h2>`, zwei Absätze (einer mit `<strong>`, einer mit `<em>`), eine `<hr>`, danach ein Absatz mit der Adresse, getrennt durch `<br>` (Musterstraße 12`<br>`74072 Heilbronn).

**E3 – Kapitel 04 (`05-projekt-angebote`), page `index`:**
Ergänzt: `<h2>Das gibt es bei uns</h2>` mit einer verschachtelten Liste: äußere `<ul>` mit zwei `<li>` („Getränke“, „Snacks“), jedes mit innerer `<ul>` mit mindestens zwei Einträgen. Danach `<h2>So bestellst du</h2>` mit `<ol>` (mindestens 3 Schritte).

**E4 – Kapitel 05 (`04-projekt-navigation`), page `index`:**
Ergänzt oben eine Linkzeile: Links zu `speisekarte.html`, `galerie.html`, `kontakt.html` (Linktexte: Speisekarte, Galerie, Kontakt). Die Angebots-Überschrift bekommt `id="angebote"`, oben ein Sprungmarken-Link `href="#angebote"` (Text: „Direkt zu den Angeboten“). Ein externer Link zu `https://www.example.com` (Text egal).

**E5 – Kapitel 06 (`04-projekt-galerie`), page `galerie`:**
Neue Seite: `<h1>Galerie</h1>`, drei Bilder `cafe-theke.svg`, `cafe-kuchen.svg`, `cafe-raum.svg` mit sinnvollen alt-Texten, ein `<audio controls src="cafe-jingle.wav">`-Element. Zurück-Link zu `index.html`.

**E6 – Kapitel 07 (`04-projekt-speisekarte`), page `speisekarte`:**
Neue Seite: `<h1>Speisekarte</h1>`, Tabelle „Getränke“ (Kopfzeile `<th>`: Getränk | Größe | Preis, mind. 3 Datenzeilen) und Tabelle „Snacks“ (Kopfzeile, mind. 2 Datenzeilen). Zurück-Link zu `index.html`.

**E7 – Kapitel 08 (`04-projekt-seitenstruktur`), page `index`:**
Die Startseite wird gegliedert: `<header>` (h1 + Willkommensabsatz), `<nav>` (die Linkzeile aus E4), `<main>` (alles Übrige), `<footer>` (Adresse). Der Öffnungszeiten-Absatz im Footer bekommt `id="oeffnungszeiten"`, wichtige Hinweise `class="hinweis"`.

**E8 – Kapitel 09 (`04-projekt-kontaktformular`), page `kontakt`:**
Neue Seite: `<h1>Kontakt</h1>`, Formular mit: `<label>`+`<input type="text" id="name">`, `<label>`+`<input type="email" id="email">`, `<select id="anlass">` (mind. 3 `<option>`), `<textarea id="nachricht">`, `<button>Absenden</button>`. Zurück-Link.

**E9 – Kapitel 10 (`06-projekt-erste-styles`), css:**
Gemeinsames Stylesheet beginnt: `body { background-color: #f7f1e3; color: #2c2016; }`, `h1 { color: #5a3e2b; }`.

**E10 – Kapitel 12 (`04-projekt-typografie`), css:**
Ergänzt: `body { font-family: 'Segoe UI', Arial, sans-serif; }`, `h1 { text-align: center; }`, `a { color: #e08a2e; }`.

**E11 – Kapitel 14 (`04-projekt-layout`), css:**
Ergänzt: `nav { display: flex; gap: 16px; }` sowie `header { background-color: #5a3e2b; color: white; padding: 16px; }` (Feinwerte dürfen in der Lektion konkretisiert werden, aber diese Selektoren/Eigenschaften sind gesetzt).

**E12 – Kapitel 15 (`03-projekt-impressum`), page `impressum`:**
Neue Seite: `<h1>Impressum</h1>`, Angaben (Betreiber, Adresse, E-Mail – Daten von oben), `<h2>Datenschutzerklärung</h2>` mit Kurzabsatz, deutlicher Hinweis „Fiktiver Betrieb für Übungszwecke“. Zurück-Link.

**E13 – Kapitel 17 (`04-projekt-interaktiv`), page `index` (+ js nur in dieser Lektion):**
Button `id="status-knopf"` (Text: „Haben wir gerade offen?“) und `<p id="status"></p>`; beim Klick erscheint „Mo–Fr 9–15 Uhr – schau einfach vorbei!“ im Status-Absatz. (Hinweis in der Lektion: JavaScript wird im Unterricht als eigene Datei eingebunden; im Projektspeicher wird nur HTML+CSS gesichert, der JS-Teil ist Übung.)

**Finale – Kapitel 18:** setzt alle gespeicherten Seiten + Stylesheet zur navigierbaren Website zusammen (Route `#/projekt`), Checkliste, große Wiederholung, Feinschliff.

## Technik für Lektions-Autoren

Eine Projekt-Lektion ist eine normale Lektion, deren Code-Step zusätzlich hat:

```json
"project": { "page": "index", "save": ["html"] }
```

- Beim Öffnen ersetzt der gespeicherte Projektstand (falls vorhanden) den Starter der jeweiligen Datei; `starter` bleibt als Fallback für Quereinsteiger und MUSS dem Endstand der Vor-Etappe entsprechen.
- Bei bestandener Prüfung wird gespeichert, was in `save` steht (`"html"`, `"css"`).
- CSS-Etappen: `"project": { "save": ["css"] }` mit `page`, wenn zusätzlich eine HTML-Vorschau-Seite geladen werden soll (nicht editierbar).
