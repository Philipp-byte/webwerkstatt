# Projekt-Bibel: Café Pause (Version 2, 05.09.2026)

Das große, durchgängige Projekt der WebWerkstatt. **Jede Lektion ab Kapitel 02 endet mit einer Etappe**, die etwas in die Website einbaut. Damit die Kette nie reißt, sind hier für jedes Kapitel die **Zwischenstände** aller betroffenen Dateien festgelegt. Regel: Der Starter einer Etappe ist exakt der Stand nach der vorherigen Etappe; die Lösung ist dieser Stand plus die Ergänzung – sonst nichts.

## Der fiktive Betrieb

- **Name:** Café Pause (Schülercafé, fiktiv – für Übungszwecke)
- **Adresse:** Café Pause · Musterstraße 12 · 74072 Heilbronn
- **E-Mail:** hallo@cafe-pause-beispiel.de
- **Öffnungszeiten:** Montag bis Freitag, 9:00 bis 15:00 Uhr
- **Betreiber (Impressum):** Schülerfirma Café Pause (fiktiver Betrieb für Übungszwecke)
- **Farbschema (ab CSS):** Creme `#f7f1e3`, Kaffeebraun `#5a3e2b`, Akzent-Orange `#e08a2e`, Text `#2c2016`, Fuß `#efe6d4`

## Dateien im Projektspeicher

| Schlüssel | Datei | entsteht in |
|---|---|---|
| `index` | index.html | 02 |
| `galerie` | galerie.html | 06 |
| `speisekarte` | speisekarte.html | 07 |
| `kontakt` | kontakt.html | 09 |
| `impressum` | impressum.html | 15 |
| `css` | style.css (gemeinsam für alle Seiten) | 10 |
| `js` | script.js (nur für index.html) | 16 |

Technik: `"project": { "page": "index", "save": ["html"] }` — `save` kann `html`, `css`, `js` enthalten. Bei CSS-Etappen `page` angeben, damit die passende Seite als (gesperrte) Vorschau geladen wird.

---

## Kapitel 02 – HTML: Erste Schritte (Seite: index)

| Lektion | Etappe (die Lernende ergänzt …) |
|---|---|
| 01 was-ist-html | die Überschrift `<h1>Café Pause</h1>` (Starter: leer bis auf einen Kommentar) |
| 02 tags-und-attribute | den Willkommens-Absatz |
| 03 grundgeruest | das komplette Grundgerüst um beides herum (lang, charset, title) |
| 04 projekt-startseite (Meilenstein) | den Öffnungszeiten-Absatz; Kontrolle des Grundgerüsts |

**Stand index nach Kapitel 02:**
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Café Pause</title>
  </head>
  <body>
    <h1>Café Pause</h1>
    <p>Willkommen im Café Pause – dem Schülercafé an unserer Schule.</p>
    <p>Wir haben Montag bis Freitag von 9:00 bis 15:00 Uhr geöffnet.</p>
  </body>
</html>
```

## Kapitel 03 – Text (Seite: index)

| Lektion | Etappe |
|---|---|
| 01 ueberschriften | `<h2>Über uns</h2>` unter den Absätzen |
| 02 absaetze-umbrueche-linien | zwei Absätze unter „Über uns“, dann `<hr>` und der Adress-Absatz mit `<br>` |
| 03 hervorheben-und-kommentare | `<strong>` und `<em>` in den Über-uns-Absätzen, ein Kommentar am Body-Anfang |
| 04 wiederholung (verbindet h2 + Absatz + strong) | `<h2>Unser Team</h2>` mit Absatz |
| 05 projekt-ueber-uns (Meilenstein) | Kontrolle der Reihenfolge (h1 → Absätze → Über uns → Unser Team → hr → Adresse); der Team-Absatz bekommt eine Betonung mit `<em>` |

**Stand index nach Kapitel 03:**
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Café Pause</title>
  </head>
  <body>
    <!-- Startseite vom Café Pause -->
    <h1>Café Pause</h1>
    <p>Willkommen im Café Pause – dem Schülercafé an unserer Schule.</p>
    <p>Wir haben Montag bis Freitag von 9:00 bis 15:00 Uhr geöffnet.</p>

    <h2>Über uns</h2>
    <p>Das Café Pause wird von <strong>Schülerinnen und Schülern</strong> geführt.</p>
    <p>Alles, was wir verkaufen, ist <em>selbst gemacht</em>.</p>

    <h2>Unser Team</h2>
    <p>Sechs Leute aus der Schülerfirma stehen <em>jeden Tag</em> hinter der Theke.</p>
    <hr>
    <p>Café Pause<br>Musterstraße 12<br>74072 Heilbronn</p>
  </body>
</html>
```

## Kapitel 04 – Listen (Seite: index)

| Lektion | Etappe |
|---|---|
| 01 ungeordnete-listen | `<h2>Das gibt es bei uns</h2>` + flache `<ul>` (Getränke, Snacks) vor der `<hr>` |
| 02 geordnete-listen | `<h2>So bestellst du</h2>` + `<ol>` mit 3 Schritten |
| 03 verschachtelte-listen | die flache Liste wird verschachtelt (Getränke → Kakao, Tee; Snacks → Brezel, Muffin) |
| 04 wiederholung (verbindet Absatz + strong + br) | Tipp-Absatz unter der `<ol>` |
| 05 projekt-angebote (Meilenstein) | Kontrolle beider Listen; ein dritter Bestell-Schritt bzw. ein weiterer Unterpunkt „Apfelschorle“ |

**Stand index nach Kapitel 04** (Body-Ausschnitt zwischen „Unser Team“ und `<hr>`; Rest wie nach 03):
```html
    <h2>Unser Team</h2>
    <p>Sechs Leute aus der Schülerfirma stehen <em>jeden Tag</em> hinter der Theke.</p>

    <h2>Das gibt es bei uns</h2>
    <ul>
      <li>Getränke
        <ul>
          <li>Kakao</li>
          <li>Tee</li>
          <li>Apfelschorle</li>
        </ul>
      </li>
      <li>Snacks
        <ul>
          <li>Brezel</li>
          <li>Muffin</li>
        </ul>
      </li>
    </ul>

    <h2>So bestellst du</h2>
    <ol>
      <li>An der Theke anstellen</li>
      <li>Bestellung sagen</li>
      <li>Bezahlen und genießen</li>
    </ol>
    <p><strong>Tipp:</strong> In der großen Pause ist es voll –<br>komm lieber etwas früher.</p>
    <hr>
```

## Kapitel 05 – Links (Seite: index)

| Lektion | Etappe |
|---|---|
| 01 externe-links | Absatz mit Link zu `https://www.example.com` (Text „Unsere Schule“) über der `<hr>` |
| 02 interne-links-und-sprungmarken | Linkzeile unter der `<h1>` (speisekarte.html, galerie.html, kontakt.html); `id="angebote"` an „Das gibt es bei uns“ + Sprungmarken-Link „Direkt zu den Angeboten“ |
| 03 wiederholung (verbindet Liste + Links) | `<h2>Mehr über uns</h2>` mit `<ul>` aus zwei Links (ersetzt den Absatz aus 01) |
| 04 projekt-navigation (Meilenstein) | Kontrolle aller Links; Rück-Sprungmarke „Nach oben“ (`id="oben"` an der h1) |

**Stand index nach Kapitel 05:**
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Café Pause</title>
  </head>
  <body>
    <!-- Startseite vom Café Pause -->
    <h1 id="oben">Café Pause</h1>
    <p>
      <a href="speisekarte.html">Speisekarte</a> ·
      <a href="galerie.html">Galerie</a> ·
      <a href="kontakt.html">Kontakt</a>
    </p>
    <p><a href="#angebote">Direkt zu den Angeboten</a></p>
    <p>Willkommen im Café Pause – dem Schülercafé an unserer Schule.</p>
    <p>Wir haben Montag bis Freitag von 9:00 bis 15:00 Uhr geöffnet.</p>

    <h2>Über uns</h2>
    <p>Das Café Pause wird von <strong>Schülerinnen und Schülern</strong> geführt.</p>
    <p>Alles, was wir verkaufen, ist <em>selbst gemacht</em>.</p>

    <h2>Unser Team</h2>
    <p>Sechs Leute aus der Schülerfirma stehen <em>jeden Tag</em> hinter der Theke.</p>

    <h2 id="angebote">Das gibt es bei uns</h2>
    <ul>
      <li>Getränke
        <ul>
          <li>Kakao</li>
          <li>Tee</li>
          <li>Apfelschorle</li>
        </ul>
      </li>
      <li>Snacks
        <ul>
          <li>Brezel</li>
          <li>Muffin</li>
        </ul>
      </li>
    </ul>

    <h2>So bestellst du</h2>
    <ol>
      <li>An der Theke anstellen</li>
      <li>Bestellung sagen</li>
      <li>Bezahlen und genießen</li>
    </ol>
    <p><strong>Tipp:</strong> In der großen Pause ist es voll –<br>komm lieber etwas früher.</p>

    <h2>Mehr über uns</h2>
    <ul>
      <li><a href="https://www.example.com">Unsere Schule</a></li>
      <li><a href="galerie.html">Fotos aus dem Café</a></li>
    </ul>
    <p><a href="#oben">Nach oben</a></p>
    <hr>
    <p>Café Pause<br>Musterstraße 12<br>74072 Heilbronn</p>
  </body>
</html>
```

## Kapitel 06 – Bilder & Medien (Seiten: index, galerie)

| Lektion | Etappe |
|---|---|
| 01 bilder | index: Bild `cafe-theke.svg` (alt: „Die Theke vom Café Pause“) direkt unter dem Willkommens-Absatz |
| 02 audio-video-einbettung | **neue Seite galerie**: Grundgerüst (Titel „Galerie – Café Pause“), `<h1>Galerie</h1>`, `<h2>Unser Jingle</h2>` + `<audio controls src="cafe-jingle.wav">` |
| 03 wiederholung (verbindet Bilder + Links + Überschrift) | galerie: Rück-Link zur Startseite unter der h1, `<h2>Unser Café</h2>` mit drei Bildern (theke, kuchen, raum) VOR dem Jingle-Block |
| 04 projekt-galerie (Meilenstein) | galerie: `<h2>Rundgang</h2>` + `<ol>` (Theke, Gastraum, Kuchen-Vitrine); Kontrolle aller alt-Texte |

**Stand galerie nach Kapitel 06:**
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Galerie – Café Pause</title>
  </head>
  <body>
    <h1>Galerie</h1>
    <p><a href="index.html">Zurück zur Startseite</a></p>

    <h2>Unser Café</h2>
    <img src="cafe-theke.svg" alt="Die Theke vom Café Pause">
    <img src="cafe-kuchen.svg" alt="Ein Stück Kuchen mit Kirsche">
    <img src="cafe-raum.svg" alt="Der Gastraum mit Tischen und Fenster">

    <h2>Unser Jingle</h2>
    <audio controls src="cafe-jingle.wav"></audio>

    <h2>Rundgang</h2>
    <ol>
      <li>Theke</li>
      <li>Gastraum</li>
      <li>Kuchen-Vitrine</li>
    </ol>
  </body>
</html>
```
**index nach Kapitel 06** = Stand nach 05, zusätzlich direkt nach dem Willkommens-Absatz:
```html
    <img src="cafe-theke.svg" alt="Die Theke vom Café Pause">
```

## Kapitel 07 – Tabellen (Seiten: index, speisekarte)

| Lektion | Etappe |
|---|---|
| 01 tabellen-aufbau | index: `<h2>Öffnungszeiten</h2>` + Tabelle (Kopfzeile Tag/Zeit, eine Datenzeile) zwischen Tipp-Absatz und „Mehr über uns“ |
| 02 kopfzeile-und-verbundene-zellen | **neue Seite speisekarte**: Grundgerüst (Titel „Speisekarte – Café Pause“), h1, Rück-Link, `<h2>Getränke</h2>` + Tabelle mit `<th>`-Kopfzeile (Getränk/Größe/Preis) und drei Zeilen |
| 03 wiederholung (verbindet Tabelle + Bild + Überschrift) | speisekarte: `<h2>Snacks</h2>` + Tabelle (Snack/Preis, zwei Zeilen), darunter Bild `cafe-kuchen.svg` |
| 04 projekt-speisekarte (Meilenstein) | speisekarte: `<h2>Angebot der Woche</h2>` + Tabelle mit `colspan="2"`-Kopfzelle „Kombi-Angebot“ |

**Stand speisekarte nach Kapitel 07:**
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Speisekarte – Café Pause</title>
  </head>
  <body>
    <h1>Speisekarte</h1>
    <p><a href="index.html">Zurück zur Startseite</a></p>

    <h2>Getränke</h2>
    <table>
      <tr>
        <th>Getränk</th>
        <th>Größe</th>
        <th>Preis</th>
      </tr>
      <tr>
        <td>Kakao</td>
        <td>0,3 l</td>
        <td>1,50 €</td>
      </tr>
      <tr>
        <td>Tee</td>
        <td>0,3 l</td>
        <td>1,00 €</td>
      </tr>
      <tr>
        <td>Apfelschorle</td>
        <td>0,5 l</td>
        <td>1,80 €</td>
      </tr>
    </table>

    <h2>Snacks</h2>
    <table>
      <tr>
        <th>Snack</th>
        <th>Preis</th>
      </tr>
      <tr>
        <td>Brezel</td>
        <td>1,00 €</td>
      </tr>
      <tr>
        <td>Muffin</td>
        <td>1,50 €</td>
      </tr>
    </table>
    <img src="cafe-kuchen.svg" alt="Ein Stück Kuchen mit Kirsche">

    <h2>Angebot der Woche</h2>
    <table>
      <tr>
        <th colspan="2">Kombi-Angebot</th>
      </tr>
      <tr>
        <td>Kakao + Muffin</td>
        <td>2,50 €</td>
      </tr>
    </table>
  </body>
</html>
```
**index nach Kapitel 07** = Stand nach 06, zusätzlich zwischen Tipp-Absatz und „Mehr über uns“:
```html
    <h2>Öffnungszeiten</h2>
    <table>
      <tr>
        <th>Tag</th>
        <th>Zeit</th>
      </tr>
      <tr>
        <td>Montag bis Freitag</td>
        <td>9:00 bis 15:00 Uhr</td>
      </tr>
    </table>
```

## Kapitel 08 – Struktur & Attribute (Seiten: index, speisekarte, galerie)

| Lektion | Etappe |
|---|---|
| 01 class-und-id | index: `class="hinweis"` am Tipp-Absatz, `id="oeffnungszeiten"` an der Öffnungszeiten-h2 |
| 02 div-span-und-semantik | index: in header / nav / main / footer gliedern (siehe Stand); die `<hr>` entfällt, die Adresse wandert in den footer |
| 03 wiederholung (verbindet Semantik + Tabelle + Bild) | speisekarte: in header (h1 + Rück-Link) / main (Rest) / footer (Adresse) gliedern |
| 04 projekt-seitenstruktur (Meilenstein) | galerie: dieselbe Gliederung header / main / footer |

**Stand index nach Kapitel 08:**
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Café Pause</title>
  </head>
  <body>
    <!-- Startseite vom Café Pause -->
    <header>
      <h1 id="oben">Café Pause</h1>
      <p>Willkommen im Café Pause – dem Schülercafé an unserer Schule.</p>
      <img src="cafe-theke.svg" alt="Die Theke vom Café Pause">
    </header>

    <nav>
      <a href="speisekarte.html">Speisekarte</a>
      <a href="galerie.html">Galerie</a>
      <a href="kontakt.html">Kontakt</a>
      <a href="#angebote">Direkt zu den Angeboten</a>
    </nav>

    <main>
      <p>Wir haben Montag bis Freitag von 9:00 bis 15:00 Uhr geöffnet.</p>

      <h2>Über uns</h2>
      <p>Das Café Pause wird von <strong>Schülerinnen und Schülern</strong> geführt.</p>
      <p>Alles, was wir verkaufen, ist <em>selbst gemacht</em>.</p>

      <h2>Unser Team</h2>
      <p>Sechs Leute aus der Schülerfirma stehen <em>jeden Tag</em> hinter der Theke.</p>

      <h2 id="angebote">Das gibt es bei uns</h2>
      <ul>
        <li>Getränke
          <ul>
            <li>Kakao</li>
            <li>Tee</li>
            <li>Apfelschorle</li>
          </ul>
        </li>
        <li>Snacks
          <ul>
            <li>Brezel</li>
            <li>Muffin</li>
          </ul>
        </li>
      </ul>

      <h2>So bestellst du</h2>
      <ol>
        <li>An der Theke anstellen</li>
        <li>Bestellung sagen</li>
        <li>Bezahlen und genießen</li>
      </ol>
      <p class="hinweis"><strong>Tipp:</strong> In der großen Pause ist es voll –<br>komm lieber etwas früher.</p>

      <h2 id="oeffnungszeiten">Öffnungszeiten</h2>
      <table>
        <tr>
          <th>Tag</th>
          <th>Zeit</th>
        </tr>
        <tr>
          <td>Montag bis Freitag</td>
          <td>9:00 bis 15:00 Uhr</td>
        </tr>
      </table>

      <h2>Mehr über uns</h2>
      <ul>
        <li><a href="https://www.example.com">Unsere Schule</a></li>
        <li><a href="galerie.html">Fotos aus dem Café</a></li>
      </ul>
      <p><a href="#oben">Nach oben</a></p>
    </main>

    <footer>
      <p>Café Pause<br>Musterstraße 12<br>74072 Heilbronn</p>
    </footer>
  </body>
</html>
```
**speisekarte nach Kapitel 08:** Body = `<header>` (h1 + Rück-Link-Absatz), `<main>` (alles von „Getränke“ bis zur Angebots-Tabelle), `<footer>` mit dem Adress-Absatz `<p>Café Pause<br>Musterstraße 12<br>74072 Heilbronn</p>`.
**galerie nach Kapitel 08:** genauso gegliedert (header: h1 + Rück-Link; main: Unser Café, Unser Jingle, Rundgang; footer: Adresse).

## Kapitel 09 – Formulare (Seite: kontakt)

| Lektion | Etappe |
|---|---|
| 01 eingabefelder-und-labels | **neue Seite kontakt**: Grundgerüst (Titel „Kontakt – Café Pause“), header (h1 + Rück-Link), main mit Einleitungs-Absatz und `<form>` mit Name (text) und E-Mail (email), beide mit `<label for>` |
| 02 auswahlfelder-und-knoepfe | select `anlass` (Lob/Kritik/Frage), textarea `nachricht`, `<button>Absenden</button>` |
| 03 wiederholung (verbindet Formular + Semantik + Tabelle) | footer mit Adresse; im main VOR dem Formular `<h2>Wann wir da sind</h2>` + Öffnungszeiten-Tabelle (wie index) |
| 04 projekt-kontaktformular (Meilenstein) | radio „Sollen wir zurückrufen?“ (ja/nein, name="rueckruf") + checkbox `datenschutz` |

**Stand kontakt nach Kapitel 09:**
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Kontakt – Café Pause</title>
  </head>
  <body>
    <header>
      <h1>Kontakt</h1>
      <p><a href="index.html">Zurück zur Startseite</a></p>
    </header>

    <main>
      <p>Schreib uns – wir antworten in der nächsten Pause.</p>

      <h2>Wann wir da sind</h2>
      <table>
        <tr>
          <th>Tag</th>
          <th>Zeit</th>
        </tr>
        <tr>
          <td>Montag bis Freitag</td>
          <td>9:00 bis 15:00 Uhr</td>
        </tr>
      </table>

      <form>
        <label for="name">Dein Name</label>
        <input type="text" id="name" placeholder="Vorname Nachname">

        <label for="email">Deine E-Mail</label>
        <input type="email" id="email" placeholder="name@beispiel.de">

        <label for="anlass">Worum geht es?</label>
        <select id="anlass">
          <option>Lob</option>
          <option>Kritik</option>
          <option>Frage</option>
        </select>

        <label for="nachricht">Deine Nachricht</label>
        <textarea id="nachricht"></textarea>

        <p>Sollen wir zurückrufen?</p>
        <label><input type="radio" name="rueckruf" value="ja"> Ja</label>
        <label><input type="radio" name="rueckruf" value="nein"> Nein</label>

        <label><input type="checkbox" id="datenschutz"> Ich habe die Datenschutzhinweise gelesen.</label>

        <button>Absenden</button>
      </form>
    </main>

    <footer>
      <p>Café Pause<br>Musterstraße 12<br>74072 Heilbronn</p>
    </footer>
  </body>
</html>
```

## Kapitel 10 – CSS-Grundlagen (css; Vorschau-Seite index)

CSS-Etappen: `"project": { "page": "index", "save": ["css"] }`, HTML gesperrt (Starter = index-Stand nach 08, ab 10-02 mit `<link>`), CSS editierbar. Starter-CSS = Stand nach der vorherigen Etappe (beginnend leer mit einem Kommentar).

| Lektion | Etappe |
|---|---|
| 01 was-ist-css | `h1 { color: #5a3e2b; }` |
| 02 drei-orte-fuer-css | **HTML-Etappe** (`save: ["html"]`): in den `<head>` von index die Zeile `<link rel="stylesheet" href="style.css">` |
| 03 farben | `body { color: #2c2016; }` und `a { color: #e08a2e; }` |
| 04 hintergrund | `body` bekommt `background-color: #f7f1e3;`, neue Regel `footer { background-color: #efe6d4; }` |
| 05 wiederholung (große HTML-Wiederholung; verbindet Tabelle + Links) | **HTML-Etappe** auf speisekarte: neue Getränke-Zeile „Wasser / 0,5 l / 0,80 €“ und im footer ein Rück-Link zur Startseite |
| 06 projekt-erste-styles (Meilenstein) | `h2 { color: #5a3e2b; }` und `table { background-color: white; }` |

**Stand css nach Kapitel 10:**
```css
body {
  color: #2c2016;
  background-color: #f7f1e3;
}

h1 {
  color: #5a3e2b;
}

h2 {
  color: #5a3e2b;
}

a {
  color: #e08a2e;
}

footer {
  background-color: #efe6d4;
}

table {
  background-color: white;
}
```
**index nach Kapitel 10:** Stand nach 08, im `<head>` zusätzlich nach dem title: `<link rel="stylesheet" href="style.css">`.
**speisekarte nach Kapitel 10:** Getränke-Tabelle hat eine vierte Zeile `<tr><td>Wasser</td><td>0,5 l</td><td>0,80 €</td></tr>`; der footer enthält zusätzlich `<p><a href="index.html">Zur Startseite</a></p>`.

## Kapitel 11 – Selektoren (css)

| Lektion | Etappe |
|---|---|
| 01 klassen-selektor | `.hinweis { color: #b8860b; font-weight: bold; }` |
| 02 id-und-gruppen | `#angebote, #oeffnungszeiten { color: #e08a2e; }` |
| 03 verschachtelte-selektoren | `nav a { color: #5a3e2b; }` und `footer p { color: #5b6b7c; }` |
| 04 wiederholung (verbindet class im HTML + Regel im CSS; html UND css editierbar, `save: ["html","css"]`, page speisekarte) | speisekarte: `class="angebot"` an der Zelle „Kakao + Muffin“; css: `.angebot { color: #1a9e5c; font-weight: bold; }` |

**css nach Kapitel 11** = Stand nach 10, angehängt:
```css
.hinweis {
  color: #b8860b;
  font-weight: bold;
}

#angebote, #oeffnungszeiten {
  color: #e08a2e;
}

nav a {
  color: #5a3e2b;
}

footer p {
  color: #5b6b7c;
}

.angebot {
  color: #1a9e5c;
  font-weight: bold;
}
```

## Kapitel 12 – Schrift & Text (css)

| Lektion | Etappe |
|---|---|
| 01 schriftart-groesse | `body` bekommt `font-family: 'Segoe UI', Arial, sans-serif;`; `h1` bekommt `font-size: 40px;` |
| 02 textgestaltung | `h1` bekommt `text-align: center;`; `nav a` bekommt `text-decoration: none;`; `body` bekommt `line-height: 1.5;` |
| 03 wiederholung (verbindet Gruppen-Selektor + Text) | neue Regel `th { text-align: left; color: #5a3e2b; }` |
| 04 projekt-typografie (Meilenstein) | `h2` bekommt `font-size: 26px;`; neue Regel `nav { text-align: center; }` |

**css nach Kapitel 12:** wie nach 11, aber `body { color: #2c2016; background-color: #f7f1e3; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.5; }`, `h1 { color: #5a3e2b; font-size: 40px; text-align: center; }`, `h2 { color: #5a3e2b; font-size: 26px; }`, `nav a { color: #5a3e2b; text-decoration: none; }`, zusätzlich am Ende `th { text-align: left; color: #5a3e2b; }` und `nav { text-align: center; }`.

## Kapitel 13 – Box-Modell (css)

| Lektion | Etappe |
|---|---|
| 01 rahmen-innenabstand | `.hinweis` bekommt `border: 2px solid #e08a2e;` und `padding: 12px;` |
| 02 aussenabstand-breite | `.hinweis` bekommt `margin-top: 16px;` und `width: 400px;` |
| 03 karten-uebung | neue Regel `img { border-radius: 12px; }`; `table` bekommt `padding: 8px;` |
| 04 wiederholung (verbindet Gruppen-Selektor + Box) | neue Regel `th, td { padding: 6px; }` |

## Kapitel 14 – Flexbox (css)

| Lektion | Etappe |
|---|---|
| 01 flex-grundlagen | `nav` bekommt `display: flex;` und `gap: 16px;` |
| 02 ausrichten | `nav` bekommt `justify-content: center;` |
| 03 wiederholung (verbindet Box + Text) | neue Regel `footer { padding: 16px; text-align: center; }` (footer-Regel ergänzen, background bleibt) |
| 04 projekt-layout (Meilenstein) | neue Regeln `header { background-color: #5a3e2b; padding: 16px; }` und `header h1, header p { color: white; }` |

**css nach Kapitel 14 (Gesamtstand):**
```css
body {
  color: #2c2016;
  background-color: #f7f1e3;
  font-family: 'Segoe UI', Arial, sans-serif;
  line-height: 1.5;
}

h1 {
  color: #5a3e2b;
  font-size: 40px;
  text-align: center;
}

h2 {
  color: #5a3e2b;
  font-size: 26px;
}

a {
  color: #e08a2e;
}

footer {
  background-color: #efe6d4;
  padding: 16px;
  text-align: center;
}

table {
  background-color: white;
  padding: 8px;
}

.hinweis {
  color: #b8860b;
  font-weight: bold;
  border: 2px solid #e08a2e;
  padding: 12px;
  margin-top: 16px;
  width: 400px;
}

#angebote, #oeffnungszeiten {
  color: #e08a2e;
}

nav a {
  color: #5a3e2b;
  text-decoration: none;
}

footer p {
  color: #5b6b7c;
}

.angebot {
  color: #1a9e5c;
  font-weight: bold;
}

th {
  text-align: left;
  color: #5a3e2b;
}

nav {
  text-align: center;
  display: flex;
  gap: 16px;
  justify-content: center;
}

img {
  border-radius: 12px;
}

th, td {
  padding: 6px;
}

header {
  background-color: #5a3e2b;
  padding: 16px;
}

header h1, header p {
  color: white;
}
```

## Kapitel 15 – Recht im Web (Seiten: galerie, impressum, index)

| Lektion | Etappe |
|---|---|
| 01 urheberrecht-und-bilder | galerie: das erste Bild in `<figure>` mit `<figcaption>Foto: Schülerfirma Café Pause</figcaption>` |
| 02 impressum-und-datenschutz | **neue Seite impressum**: Grundgerüst (Titel „Impressum – Café Pause“), header (h1 + Rück-Link), main mit Angaben (Betreiber, Adresse, E-Mail) und `<h2>Datenschutzerklärung</h2>` + Kurzabsatz, `<p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>`, footer mit Adresse |
| 03 projekt-impressum (Meilenstein) | index: im footer ein Absatz mit Link zu `impressum.html` (Text „Impressum“) und Link zu `kontakt.html` (Text „Kontakt“) |

**Stand impressum nach Kapitel 15:**
```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Impressum – Café Pause</title>
  </head>
  <body>
    <header>
      <h1>Impressum</h1>
      <p><a href="index.html">Zurück zur Startseite</a></p>
    </header>

    <main>
      <h2>Angaben zum Betreiber</h2>
      <p>Schülerfirma Café Pause<br>Musterstraße 12<br>74072 Heilbronn</p>
      <p>E-Mail: hallo@cafe-pause-beispiel.de</p>

      <h2>Datenschutzerklärung</h2>
      <p>Über das Kontaktformular gesendete Daten nutzen wir nur, um deine Anfrage zu beantworten.</p>

      <p><strong>Fiktiver Betrieb für Übungszwecke.</strong></p>
    </main>

    <footer>
      <p>Café Pause<br>Musterstraße 12<br>74072 Heilbronn</p>
    </footer>
  </body>
</html>
```
**index nach Kapitel 15:** footer zusätzlich `<p><a href="impressum.html">Impressum</a> · <a href="kontakt.html">Kontakt</a></p>`.
**galerie nach Kapitel 15:** das Theken-Bild steht in `<figure><img …><figcaption>Foto: Schülerfirma Café Pause</figcaption></figure>`.

## Kapitel 16 – JavaScript-Start (js; Vorschau-Seite index)

JS-Etappen: `"project": { "page": "index", "save": ["js"] }`, HTML/CSS gesperrt (Stand nach 15 / nach 14), JS editierbar; Starter-JS = Stand nach voriger Etappe (beginnend mit einem Kommentar).

| Lektion | Etappe |
|---|---|
| 01 was-ist-javascript | `console.log("Café Pause – Startseite geladen");` |
| 02 variablen | `const cafeName = "Café Pause";` `let besucher = 0;` `console.log(cafeName);` |
| 03 rechnen | `const preisKakao = 1.5;` `const anzahl = 3;` `console.log("Summe: " + preisKakao * anzahl);` |
| 04 wiederholung (verbindet Variablen + Textverbindung) | `const oeffnungszeit = "9:00 bis 15:00 Uhr";` `console.log(cafeName + " – geöffnet " + oeffnungszeit);` |

**Stand js nach Kapitel 16:**
```js
// Skript der Startseite
console.log("Café Pause – Startseite geladen");

const cafeName = "Café Pause";
let besucher = 0;
console.log(cafeName);

const preisKakao = 1.5;
const anzahl = 3;
console.log("Summe: " + preisKakao * anzahl);

const oeffnungszeit = "9:00 bis 15:00 Uhr";
console.log(cafeName + " – geöffnet " + oeffnungszeit);
```

## Kapitel 17 – JavaScript & die Seite (index html + js)

| Lektion | Etappe (`save: ["html","js"]`, beides editierbar) |
|---|---|
| 01 elemente-aendern | index main, ganz oben: `<p id="status">Status wird geladen …</p>`; js: `document.getElementById("status").textContent = "Heute geöffnet!";` |
| 02 auf-klick-reagieren | index: `<button id="status-knopf">Haben wir gerade offen?</button>` vor dem Status-Absatz; js: Listener setzt den Status auf „Mo–Fr 9–15 Uhr – schau einfach vorbei!“ (der Start-Text des Status-Absatzes wird leer: `<p id="status"></p>`, die Zeile aus 01 entfällt) |
| 03 klick-zaehler | index: `<button id="like-knopf">Gefällt mir</button> <span id="likes">0</span>` unter dem Team-Absatz; js: `besucher` wird zu `likes`-Zähler mit Listener |
| 04 projekt-interaktiv (Meilenstein) | Kontrolle beider Interaktionen; js: der Like-Listener setzt zusätzlich den Status-Text auf „Danke fürs Like!“ (keine Verzweigung – if wird nicht gelehrt) |

**Stand js nach Kapitel 17:**
```js
// Skript der Startseite
console.log("Café Pause – Startseite geladen");

const cafeName = "Café Pause";
let besucher = 0;
console.log(cafeName);

const preisKakao = 1.5;
const anzahl = 3;
console.log("Summe: " + preisKakao * anzahl);

const oeffnungszeit = "9:00 bis 15:00 Uhr";
console.log(cafeName + " – geöffnet " + oeffnungszeit);

const statusAbsatz = document.getElementById("status");
const statusKnopf = document.getElementById("status-knopf");
statusKnopf.addEventListener("click", function () {
  statusAbsatz.textContent = "Mo–Fr 9–15 Uhr – schau einfach vorbei!";
});

let likes = 0;
const likeKnopf = document.getElementById("like-knopf");
const likeAnzeige = document.getElementById("likes");
likeKnopf.addEventListener("click", function () {
  likes = likes + 1;
  likeAnzeige.textContent = likes;
  statusAbsatz.textContent = "Danke fürs Like!";
});
```
**index nach Kapitel 17:** main beginnt mit `<button id="status-knopf">Haben wir gerade offen?</button>` und `<p id="status"></p>`; unter dem Team-Absatz `<p><button id="like-knopf">Gefällt mir</button> <span id="likes">0</span></p>`.

## Kapitel 18 – Projekt-Finale

| Lektion | Etappe |
|---|---|
| 01 alles-zusammenfuegen | index footer: E-Mail-Link `<a href="mailto:hallo@cafe-pause-beispiel.de">hallo@cafe-pause-beispiel.de</a>` |
| 02 grosse-wiederholung | kontakt: `<link rel="stylesheet" href="style.css">` im head UND eine `<nav>` wie auf der Startseite unter dem header (verbindet Grundgerüst + Links + Semantik) |
| 03 feinschliff-und-ausblick | index main: eigene `<section>` mit `<h2>` und mindestens einer Liste, Tabelle oder einem Bild (freie Idee, nur Struktur-Tests) |

---

## Regeln für Etappen-Aufgaben

1. Aufgabe beschreibt das **Ziel** (Ort auf der Seite, Inhalt, Wirkung) – nie den Code.
2. `starter` = exakter Vorzustand (dieses Dokument), `solution` = Vorzustand + Ergänzung.
3. Tests: das Neue präzise (Text, Attribut, Selektor, Style) + 1–2 Erhaltungstests (z. B. „Die Überschrift Café Pause ist noch da“).
4. Hints gestuft; letzter Hint = komplette Lösung.
5. Bei neuen Seiten ist der Starter ein leeres Grundgerüst-Fragment (Kommentar), die Lernenden schreiben das Gerüst selbst (Wiederholung von Kapitel 02).
