// Kapitel 14 – Flexbox (Station „Bühnen-Layout“).
// Erzeugt public/content/chapters/14-flexbox/{lessons/*.json,pool.json,boss.json}
import fs from 'node:fs';
import path from 'node:path';

const ZIEL = path.join(import.meta.dirname, '..', 'public', 'content', 'chapters', '14-flexbox');
const schreibe = (rel, obj) => {
  const p = path.join(ZIEL, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
};

/* ---------- Grafiken ---------- */

// Ohne Flexbox stapeln sich Blöcke; display: flex am Container legt die Kinder nebeneinander, gap hält Abstand.
const FIG_FLEX = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="60" y="30" text-anchor="middle" fill="#eef2ff" font-weight="bold">ohne Flexbox</text><rect x="25" y="42" width="70" height="20" rx="3" fill="#ff7a45"/><rect x="25" y="70" width="70" height="20" rx="3" fill="#ff7a45"/><rect x="25" y="98" width="70" height="20" rx="3" fill="#ff7a45"/><text x="60" y="140" text-anchor="middle" fill="#eef2ff">Blöcke stapeln sich</text><text x="124" y="88" text-anchor="middle" fill="#eef2ff" font-size="22">→</text><text x="230" y="30" text-anchor="middle" fill="#38c7ff" font-weight="bold">display: flex</text><rect x="150" y="42" width="160" height="80" rx="6" fill="#0f1320" stroke="#38c7ff" stroke-width="2"/><rect x="162" y="56" width="40" height="44" rx="3" fill="#ff7a45"/><rect x="210" y="56" width="40" height="44" rx="3" fill="#ff7a45"/><rect x="258" y="56" width="40" height="44" rx="3" fill="#ff7a45"/><path d="M206 104 V112 M254 104 V112" stroke="#ffd84d" stroke-width="2"/><text x="230" y="116" text-anchor="middle" fill="#ffd84d">gap</text><text x="230" y="140" text-anchor="middle" fill="#38c7ff">Container mit 3 Kindern</text></svg>`;

// Hauptachse (justify-content) und Querachse (align-items) bei flex-direction: row.
const FIG_ACHSEN = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#ffd84d" font-weight="bold">Hauptachse → justify-content</text><rect x="20" y="34" width="280" height="96" rx="6" fill="#0f1320" stroke="#38c7ff" stroke-width="2"/><path d="M34 50 H262 M254 44 L262 50 L254 56" stroke="#ffd84d" stroke-width="2" fill="none"/><rect x="62" y="66" width="48" height="40" rx="3" fill="#ff7a45"/><rect x="136" y="66" width="48" height="40" rx="3" fill="#ff7a45"/><rect x="210" y="66" width="48" height="40" rx="3" fill="#ff7a45"/><path d="M282 44 V118 M276 110 L282 118 L288 110" stroke="#4ade80" stroke-width="2" fill="none"/><text x="40" y="122" fill="#38c7ff">flex-direction: row</text><text x="160" y="150" text-anchor="middle" fill="#4ade80" font-weight="bold">Querachse → align-items</text></svg>`;

// flex-wrap: wrap bricht in eine neue Zeile um; Kinder mit flex: 1 füllen die Zeile.
const FIG_WRAP = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12"><rect width="320" height="160" fill="#0f1320"/><text x="160" y="22" text-anchor="middle" fill="#38c7ff" font-weight="bold">flex-wrap: wrap</text><rect x="20" y="32" width="280" height="104" rx="6" fill="#0f1320" stroke="#38c7ff" stroke-width="2"/><rect x="32" y="44" width="58" height="34" rx="3" fill="#ff7a45"/><rect x="100" y="44" width="58" height="34" rx="3" fill="#ff7a45"/><rect x="168" y="44" width="58" height="34" rx="3" fill="#ff7a45"/><rect x="236" y="44" width="58" height="34" rx="3" fill="#ff7a45"/><rect x="32" y="88" width="126" height="34" rx="3" fill="#4ade80"/><rect x="168" y="88" width="126" height="34" rx="3" fill="#4ade80"/><text x="95" y="110" text-anchor="middle" fill="#0f1320" font-weight="bold">flex: 1</text><text x="231" y="110" text-anchor="middle" fill="#0f1320" font-weight="bold">flex: 1</text><text x="160" y="154" text-anchor="middle" fill="#ffd84d">Zeile voll → Umbruch · Kinder mit flex: 1 wachsen</text></svg>`;

/* ---------- Wiederverwendete Code-Bausteine ---------- */

const HTML_MENUE = `<nav class="menue">
  <a href="#start">Start</a>
  <a href="#spiele">Spiele</a>
  <a href="#ranglisten">Ranglisten</a>
  <a href="#profil">Profil</a>
</nav>
`;

const HTML_TEAM = `<div class="team">
  <div class="karte">Nova<br>Level 42</div>
  <div class="karte">Blitz<br>Level 39</div>
  <div class="karte">Kato<br>Level 51</div>
  <div class="karte">Rey<br>Level 36</div>
</div>
`;

const HTML_BIBLIOTHEK = `<div class="bibliothek">
  <div class="spiel">Pixel Rush</div>
  <div class="spiel">Neon Drift</div>
  <div class="spiel">Kart Kings</div>
  <div class="spiel">Sky Farm</div>
  <div class="spiel">Dungeon Zwei</div>
  <div class="spiel">Beat Blitz</div>
  <div class="spiel">Raketenliga</div>
  <div class="spiel">Puzzle Park</div>
</div>
`;

/* ============================================================
   Lektion 1 – Flex-Grundlagen (display: flex, flex-direction, gap)
   ============================================================ */
schreibe('lessons/01-flex-grundlagen.json', {
  id: '01-flex-grundlagen',
  title: 'Flex-Grundlagen',
  konzepte: ['css.flex', 'css.flex-direction', 'css.gap'],
  steps: [
    {
      type: 'explain',
      sprecher: 'ayla',
      text: 'Auf der Startseite deiner Gaming-Seite sollen drei Spielerkarten **nebeneinander** stehen. Doch der Browser stapelt Blöcke wie `div` immer **untereinander** – egal, wie breit der Bildschirm ist.\n\nDie Lösung heißt **Flexbox**. Du schaltest sie am **Container** ein, also am Eltern-Element – und schon ordnet er seine **Kinder** in einer Reihe an:\n\n```css\n.team {\n  display: flex;\n}\n```',
      figure: FIG_FLEX,
    },
    {
      type: 'example',
      text: 'Werkbank: Vier Spielerkarten liegen in einem Container mit der Klasse `team`. `display: flex;` legt sie nebeneinander, `gap: 12px;` sorgt für 12 Pixel Luft dazwischen.\n\n**Ändere** `flex` in `block` und beobachte, was passiert. Setze es zurück und **ändere** dann `12px` in `40px`.',
      html: HTML_TEAM,
      css: `.team {
  display: flex;
  gap: 12px;
}

.karte {
  border: 2px solid #38c7ff;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}
`,
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Drei Kacheln sollen nebeneinander stehen. In welche Regel gehört `display: flex`?',
      options: ['In die Regel des Containers, der die Kacheln umschließt', 'In die Regel jeder einzelnen Kachel', 'In die body-Regel, damit es überall gilt'],
      correct: 0,
      explanation: 'Flexbox wird am Eltern-Element eingeschaltet – die Kinder werden automatisch zu Flex-Kindern. Am `body` würde es Kopfbereich, Navigation und Inhalt nebeneinander zwängen.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Menüleiste der Gaming-Seite als Flex-Container: Die vier Links stehen in einer Reihe mit 16 Pixel Abstand zwischen ihnen.',
      starter: {
        html: HTML_MENUE,
        css: `.menue {
  background-color: #1b1b2f;
  padding: 12px;
  /* Flexbox hier einschalten */
}

.menue a {
  color: #ffd23f;
  text-decoration: none;
  font-weight: bold;
}
`,
      },
      editable: ['css'],
      hints: [
        'Flexbox wird am Container eingeschaltet – hier ist das die Menüleiste mit der Klasse `menue`, nicht die einzelnen Links.',
        'Die Eigenschaft heißt `display`; für den Abstand zwischen Flex-Kindern gibt es `gap`. Muster aus einem anderen Kontext: `gap: 8px;` macht 8 Pixel Luft.',
        'Zwei Zeilen in der vorhandenen Regel `.menue`: `display: …;` und `gap: …;` mit den Werten aus der Aufgabe.',
      ],
      solution: {
        css: `.menue {
  background-color: #1b1b2f;
  padding: 12px;
  display: flex;
  gap: 16px;
}

.menue a {
  color: #ffd23f;
  text-decoration: none;
  font-weight: bold;
}
`,
      },
      tests: [
        { type: 'style', selector: '.menue', prop: 'display', expected: 'flex', label: 'Die Menüleiste ist ein Flex-Container' },
        { type: 'style', selector: '.menue', prop: 'column-gap', expected: '16px', label: 'Zwischen den Links sind 16 Pixel Abstand' },
      ],
    },
    {
      type: 'explain',
      text: 'Die **Richtung** bestimmst du mit `flex-direction`:\n\n- `row` – Reihe, nebeneinander (Standard, musst du nicht schreiben)\n- `column` – Spalte, untereinander\n\n`gap` wirkt in beide Richtungen: In der Spalte ist es der Abstand zwischen den Zeilen. So stapelt ein Chat seine Nachrichten:\n\n```css\n.chat {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n```',
    },
    {
      type: 'fill',
      text: 'Die Nachrichten im Chat sollen untereinander stehen, mit Abstand. **Vervollständige** die Regel.',
      template: '.chat {\n  display: ___;\n  flex-direction: ___;\n  gap: 8px;\n}',
      accept: [['flex'], ['column']],
      hint: 'Erst Flexbox einschalten, dann die Richtung „Spalte“ – auf Englisch.',
    },
    {
      type: 'code',
      task: '**Gestalte** das Seitenmenü der Profilseite: Die vier Links stehen untereinander, mit 8 Pixel Abstand zwischen ihnen.',
      starter: {
        html: `<nav class="seitenmenue">
  <a href="#profil">Profil</a>
  <a href="#freunde">Freunde</a>
  <a href="#erfolge">Erfolge</a>
  <a href="#einstellungen">Einstellungen</a>
</nav>
`,
        css: `.seitenmenue {
  width: 180px;
  background-color: #1b1b2f;
  padding: 12px;
  /* Flexbox in Spaltenrichtung */
}

.seitenmenue a {
  color: #fff7e8;
  text-decoration: none;
}
`,
      },
      editable: ['css'],
      hints: [
        'Auch „untereinander mit Abstand“ ist ein Fall für Flexbox: einschalten und dann die Richtung ändern.',
        'Die Richtung steuert `flex-direction`; die Werte heißen `row` und `column`. Der Abstand ist wieder `gap`.',
        'Drei Zeilen in der Regel `.seitenmenue`: Flexbox einschalten, Richtung Spalte, Abstand 8 Pixel.',
      ],
      solution: {
        css: `.seitenmenue {
  width: 180px;
  background-color: #1b1b2f;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.seitenmenue a {
  color: #fff7e8;
  text-decoration: none;
}
`,
      },
      tests: [
        { type: 'style', selector: '.seitenmenue', prop: 'display', expected: 'flex', label: 'Das Seitenmenü ist ein Flex-Container' },
        { type: 'style', selector: '.seitenmenue', prop: 'flex-direction', expected: 'column', label: 'Die Links stehen untereinander (Spaltenrichtung)' },
        { type: 'style', selector: '.seitenmenue', prop: 'row-gap', expected: '8px', label: 'Zwischen den Links sind 8 Pixel Abstand' },
      ],
    },
    {
      type: 'order',
      text: 'Eine Rangliste: Der Container mit der Klasse `rangliste` soll später `display: flex` bekommen, die drei Plätze sind seine Kinder. **Bringe** die Zeilen in die richtige Reihenfolge.',
      lines: ['<div class="rangliste">', '  <div class="platz">1. Nova – 9 870 Punkte</div>', '  <div class="platz">2. Kato – 8 120 Punkte</div>', '  <div class="platz">3. Blitz – 7 450 Punkte</div>', '</div>'],
      explanation: 'Der äußere `div` ist der Container – nur er bekommt `display: flex`. Die drei Plätze darin sind die Flex-Kinder.',
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** das Stylesheet der Team-Seite und behebe zwei Fehler: Die drei Spielerkarten sollen nebeneinander stehen, die Statistik-Zeilen darunter untereinander – beides klappt nicht, obwohl Flexbox schon eingebaut ist.',
      starter: {
        html: `<h2>Team Nova</h2>
<div class="team">
  <div class="karte">Nova · Level 42</div>
  <div class="karte">Blitz · Level 39</div>
  <div class="karte">Kato · Level 51</div>
</div>

<h2>Statistik</h2>
<div class="stats">
  <div>Siege: 128</div>
  <div>Niederlagen: 64</div>
  <div>Punkte: 9 870</div>
</div>
`,
        css: `.karte {
  display: flex;
  border: 2px solid #38c7ff;
  border-radius: 8px;
  padding: 12px;
}

.team {
  gap: 12px;
}

.stats {
  display: flex;
  flex-direction: colum;
  gap: 8px;
}
`,
      },
      editable: ['css'],
      hints: [
        'Schau genau, an welchem Element `display: flex` steht – am Container oder an den Kindern?',
        'Der zweite Fehler steckt in der Statistik-Regel: Ein Wert ist falsch geschrieben, und der Browser ignoriert die ganze Zeile. Vergleiche Buchstabe für Buchstabe mit dem Chat-Beispiel.',
        'Struktur: `.team` bekommt `display: …;`, `.karte` nicht. In `.stats` heißt die Richtung genau wie im Chat-Beispiel dieser Lektion.',
      ],
      solution: {
        css: `.karte {
  border: 2px solid #38c7ff;
  border-radius: 8px;
  padding: 12px;
}

.team {
  display: flex;
  gap: 12px;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
`,
      },
      tests: [
        { type: 'style', selector: '.team', prop: 'display', expected: 'flex', label: 'Die Spielerkarten stehen nebeneinander (Container ist flex)' },
        { type: 'style', selector: '.karte', prop: 'display', expected: 'block', label: 'Die einzelnen Karten sind keine Flex-Container' },
        { type: 'style', selector: '.stats', prop: 'flex-direction', expected: 'column', label: 'Die Statistik-Zeilen stehen untereinander' },
        { type: 'style', selector: '.team', prop: 'column-gap', expected: '12px', label: 'Zwischen den Karten bleiben 12 Pixel Abstand' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Ab zur FUNKEN-Website! Die Navigations-Links der Startseite stehen noch als lose Textzeile – ihre Abstände hängen von Leerzeichen ab. Jetzt wird die Navigation ein **Flex-Container** mit 16 Pixel Abstand zwischen den Links.\n\nDafür ergänzt du die vorhandene nav-Regel um zwei Zeilen. Die Links kleben danach noch links – zentriert wird in der nächsten Lektion.',
    },
    { type: 'code', etappe: '14-flexbox/01-flex-grundlagen' },
  ],
});

/* ============================================================
   Lektion 2 – Ausrichten (justify-content, align-items)
   ============================================================ */
schreibe('lessons/02-ausrichten.json', {
  id: '02-ausrichten',
  title: 'Ausrichten',
  konzepte: ['css.justify-content', 'css.align-items'],
  steps: [
    {
      type: 'explain',
      text: 'Die Menüleiste ist eine Reihe – aber alle Links kleben am linken Rand. Um Kinder zu **verteilen** und **auszurichten**, brauchst du zwei Achsen:\n\n- **Hauptachse** – die Richtung von `flex-direction`; bei `row` von links nach rechts.\n- **Querachse** – quer dazu; bei `row` von oben nach unten.\n\n`justify-content` verteilt die Kinder entlang der Hauptachse, `align-items` richtet sie auf der Querachse aus. Beide Eigenschaften stehen am Container.',
      figure: FIG_ACHSEN,
    },
    {
      type: 'example',
      text: 'Werkbank: `justify-content: center;` verteilt die Links mittig. **Ändere** `center` nacheinander in `space-between`, `space-around`, `flex-end` und `flex-start` – und beobachte, wo die Links landen.',
      html: HTML_MENUE,
      css: `.menue {
  display: flex;
  gap: 16px;
  justify-content: center;
  background-color: #1b1b2f;
  padding: 12px;
}

.menue a {
  color: #ffd23f;
  text-decoration: none;
}
`,
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Vier Links in einer Reihe: Der erste soll ganz links, der letzte ganz rechts stehen, der Rest gleichmäßig dazwischen. Welcher Wert von `justify-content`?',
      options: ['`space-between`', '`space-around`', '`center`'],
      correct: 0,
      explanation: '`space-between` schiebt das erste und das letzte Kind an die Ränder und verteilt den Rest gleichmäßig. `space-around` lässt auch an den Rändern Luft, `center` sammelt alles in der Mitte.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Menüleiste: Die vier Links werden in der Mitte der Leiste verteilt, statt am linken Rand zu kleben.',
      starter: {
        html: HTML_MENUE,
        css: `.menue {
  display: flex;
  gap: 16px;
  background-color: #1b1b2f;
  padding: 12px;
  /* hier verteilen */
}

.menue a {
  color: #ffd23f;
  text-decoration: none;
}
`,
      },
      editable: ['css'],
      hints: [
        'Verteilen entlang der Hauptachse – welche Eigenschaft war das?',
        '`justify-content` kennt zum Beispiel `space-between` für die Ränder – hier soll es aber die Mitte sein.',
        'Eine Zeile in der Regel `.menue`: `justify-content: …;` mit dem Wert für „Mitte“.',
      ],
      solution: {
        css: `.menue {
  display: flex;
  gap: 16px;
  background-color: #1b1b2f;
  padding: 12px;
  justify-content: center;
}

.menue a {
  color: #ffd23f;
  text-decoration: none;
}
`,
      },
      tests: [
        { type: 'style', selector: '.menue', prop: 'justify-content', expected: 'center', label: 'Die Links sind in der Mitte verteilt' },
        { type: 'style', selector: '.menue', prop: 'display', expected: 'flex', label: 'Die Menüleiste bleibt ein Flex-Container' },
      ],
    },
    {
      type: 'explain',
      text: 'Auf der **Querachse** richtet `align-items` aus. Standard ist `stretch`: Alle Kinder werden gleich hoch gezogen. Weitere Werte:\n\n- `center` – mittig\n- `flex-start` – am Anfang (bei `row` oben)\n- `flex-end` – am Ende (bei `row` unten)\n\nTypisch für eine Kopfzeile mit Logo und Menü auf gleicher Höhe:\n\n```css\n.kopf {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```',
    },
    {
      type: 'fill',
      text: 'Kopfzeile: Logo ganz links, Menü ganz rechts, beide auf gleicher Höhe (mittig). **Vervollständige** die Regel.',
      template: '.kopf {\n  display: flex;\n  justify-content: ___;\n  align-items: ___;\n}',
      accept: [['space-between'], ['center']],
      hint: 'Links und rechts an den Rand = „Platz dazwischen“ auf Englisch; mittig auf der Querachse.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Kopfzeile der Gaming-Seite: Das Logo steht ganz links, das Menü ganz rechts, und beide sind auf der Querachse mittig ausgerichtet.',
      starter: {
        html: `<header class="kopf">
  <img class="logo" src="controller.svg" alt="Logo der Gaming-Seite">
  <nav class="menue">
    <a href="#spiele">Spiele</a>
    <a href="#ranglisten">Ranglisten</a>
    <a href="#profil">Profil</a>
  </nav>
</header>
`,
        css: `.kopf {
  display: flex;
  background-color: #1b1b2f;
  padding: 12px 24px;
  /* verteilen und ausrichten */
}

.logo {
  width: 64px;
}

.menue a {
  color: #ffd23f;
  text-decoration: none;
  margin-left: 16px;
}
`,
      },
      editable: ['css'],
      hints: [
        'Zwei Eigenschaften, zwei Achsen: Verteilen auf der Hauptachse, Ausrichten auf der Querachse.',
        'Für „ganz links und ganz rechts“ gibt es bei `justify-content` einen Wert mit *between*. Für „mittig“ auf der Querachse den Wert `center` bei `align-items`.',
        'Beide Zeilen kommen in die Regel `.kopf`: `justify-content: …;` und `align-items: …;`.',
      ],
      solution: {
        css: `.kopf {
  display: flex;
  background-color: #1b1b2f;
  padding: 12px 24px;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 64px;
}

.menue a {
  color: #ffd23f;
  text-decoration: none;
  margin-left: 16px;
}
`,
      },
      tests: [
        { type: 'style', selector: '.kopf', prop: 'justify-content', expected: 'space-between', label: 'Logo ganz links, Menü ganz rechts' },
        { type: 'style', selector: '.kopf', prop: 'align-items', expected: 'center', label: 'Logo und Menü sind auf gleicher Höhe mittig' },
        { type: 'style', selector: '.kopf', prop: 'display', expected: 'flex', label: 'Die Kopfzeile bleibt ein Flex-Container' },
      ],
    },
    {
      type: 'explain',
      text: 'Bei `flex-direction: column` **drehen sich die Achsen**: Die Hauptachse zeigt nach unten, die Querachse nach rechts. Willst du gestapelte Kinder **horizontal zentrieren**, brauchst du deshalb `align-items: center` – nicht `justify-content`.\n\nSo zentriert eine Profilkarte Bild, Name und Level übereinander:\n\n```css\n.profil {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n```',
    },
    {
      type: 'pair',
      text: '**Ordne** jeder Zeile ihre Wirkung zu (Container mit `flex-direction: row`).',
      pairs: [
        ['`justify-content: center`', 'Kinder mittig auf der Hauptachse (waagerecht)'],
        ['`justify-content: space-between`', 'erstes Kind links, letztes rechts, Rest gleichmäßig'],
        ['`justify-content: space-around`', 'gleich viel Luft um jedes Kind'],
        ['`align-items: center`', 'Kinder mittig auf der Querachse (senkrecht)'],
        ['`align-items: flex-start`', 'Kinder oben, am Anfang der Querachse'],
      ],
    },
    {
      type: 'code',
      task: '**Gestalte** die Profilseite: Die Profilkarte stapelt Bild, Name und Level untereinander und zentriert sie horizontal. Die Aktionsleiste darunter verteilt ihre drei Knöpfe mittig, mit 12 Pixel Abstand.',
      starter: {
        html: `<div class="profil">
  <img src="katze.svg" alt="Avatar: Katze mit Kopfhörern">
  <h2>Nova</h2>
  <p>Level 42 · 9 870 Punkte</p>
</div>

<div class="aktionen">
  <button>Folgen</button>
  <button>Nachricht</button>
  <button>Duell</button>
</div>
`,
        css: `.profil {
  width: 320px;
  padding: 16px;
  border: 2px solid #b48cff;
  border-radius: 12px;
  /* stapeln und zentrieren */
}

.profil img {
  width: 96px;
}

.aktionen {
  width: 320px;
  margin-top: 12px;
  /* verteilen */
}
`,
      },
      editable: ['css'],
      hints: [
        'Zwei Container, zwei Regeln. Bei der Profilkarte drehen sich die Achsen, weil die Richtung Spalte ist.',
        'Gestapelt und horizontal zentriert heißt: Richtung Spalte plus Ausrichten auf der Querachse mit `center` – wie im Profil-Beispiel der Lektion. Die Leiste braucht das Verteilen auf der Hauptachse und `gap`.',
        'Struktur: `.profil` bekommt drei Zeilen (Flexbox an, Richtung, Ausrichtung), `.aktionen` drei Zeilen (Flexbox an, Verteilen, Abstand).',
      ],
      solution: {
        css: `.profil {
  width: 320px;
  padding: 16px;
  border: 2px solid #b48cff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profil img {
  width: 96px;
}

.aktionen {
  width: 320px;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 12px;
}
`,
      },
      tests: [
        { type: 'style', selector: '.profil', prop: 'display', expected: 'flex', label: 'Die Profilkarte ist ein Flex-Container' },
        { type: 'style', selector: '.profil', prop: 'flex-direction', expected: 'column', label: 'Bild, Name und Level stehen untereinander' },
        { type: 'style', selector: '.profil', prop: 'align-items', expected: 'center', label: 'Bild, Name und Level sind horizontal zentriert' },
        { type: 'style', selector: '.aktionen', prop: 'display', expected: 'flex', label: 'Die Aktionsleiste ist ein Flex-Container' },
        { type: 'style', selector: '.aktionen', prop: 'justify-content', expected: 'center', label: 'Die Knöpfe sind mittig verteilt' },
        { type: 'style', selector: '.aktionen', prop: 'column-gap', expected: '12px', label: 'Zwischen den Knöpfen sind 12 Pixel Abstand' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Zwei Wünsche für die FUNKEN-Startseite: Die Navigations-Links sollen in der Mitte verteilt sein – dafür bekommt die vorhandene nav-Regel eine Zeile mehr.\n\nUnd der Kopfbereich (header) soll ein Flex-Container mit Spaltenrichtung werden, in dem Überschrift, Absatz und Bühnenfoto horizontal zentriert sind. Dafür brauchst du eine neue Regel mit drei Eigenschaften – genau wie bei der Profilkarte.',
    },
    { type: 'code', etappe: '14-flexbox/02-ausrichten' },
  ],
});

/* ============================================================
   Lektion 3 – Umbrechen und wachsen (flex-wrap, flex: 1)
   ============================================================ */
schreibe('lessons/03-umbrechen-und-wachsen.json', {
  id: '03-umbrechen-und-wachsen',
  title: 'Umbrechen und wachsen',
  konzepte: ['css.flex-wrap', 'css.flex-grow'],
  steps: [
    {
      type: 'explain',
      sprecher: 'jonas',
      text: 'Sams Preis-Kacheln – Tagesticket, Festivalpass, Helfer:in – stehen dank Flexbox in einer Reihe. Auf dem Handy werden sie aber **zusammengequetscht**: Flexbox zwingt alle Kinder in eine einzige Zeile.\n\nMit `flex-wrap: wrap;` am Container dürfen Kinder, die nicht mehr passen, in die **nächste Zeile** rutschen. `gap` hält dann auch zwischen den Zeilen Abstand.\n\n```css\n.kacheln {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n```',
      figure: FIG_WRAP,
    },
    {
      type: 'example',
      text: 'Werkbank: Acht Spiele-Kacheln mit fester Breite in einem Flex-Container. `nowrap` ist der Standard – die Kacheln werden gequetscht. **Ändere** `nowrap` in `wrap` und beobachte die Kacheln. **Ändere** danach die Breite `120px` in `80px`.',
      html: HTML_BIBLIOTHEK,
      css: `.bibliothek {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
}

.spiel {
  width: 120px;
  padding: 20px 0;
  text-align: center;
  background-color: #b48cff;
  border-radius: 8px;
}
`,
      editable: ['css'],
    },
    {
      type: 'quiz',
      question: 'Ein Flex-Container hat acht Kacheln, aber nur Platz für vier. Was passiert **ohne** `flex-wrap`?',
      options: ['Die Kacheln werden schmaler gequetscht, alle bleiben in einer Zeile', 'Die Kacheln rutschen automatisch in die nächste Zeile', 'Der Browser zeigt nur die ersten vier Kacheln'],
      correct: 0,
      explanation: 'Der Standard ist `nowrap`: Flexbox zwängt alles in eine Zeile und macht die Kinder schmaler. Erst `flex-wrap: wrap` erlaubt den Umbruch.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Spiele-Bibliothek: Die Kacheln stehen in einem Flex-Container mit 10 Pixel Abstand und dürfen in die nächste Zeile umbrechen, statt gequetscht zu werden.',
      starter: {
        html: HTML_BIBLIOTHEK,
        css: `.bibliothek {
  /* Flex-Container mit Umbruch */
}

.spiel {
  width: 140px;
  padding: 20px 0;
  text-align: center;
  background-color: #b48cff;
  border-radius: 8px;
}
`,
      },
      editable: ['css'],
      hints: [
        'Drei Zeilen am Container `.bibliothek`: Flexbox einschalten, Umbruch erlauben, Abstand.',
        'Umbrechen steuert `flex-wrap`; der Standard `nowrap` verbietet es. Abstand ist wie immer `gap`.',
        'Struktur: `display: …;`, `flex-wrap: …;`, `gap: …;` – die Werte stehen in der Lektion und in der Aufgabe.',
      ],
      solution: {
        css: `.bibliothek {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.spiel {
  width: 140px;
  padding: 20px 0;
  text-align: center;
  background-color: #b48cff;
  border-radius: 8px;
}
`,
      },
      tests: [
        { type: 'style', selector: '.bibliothek', prop: 'display', expected: 'flex', label: 'Die Bibliothek ist ein Flex-Container' },
        { type: 'style', selector: '.bibliothek', prop: 'flex-wrap', expected: 'wrap', label: 'Die Kacheln dürfen in die nächste Zeile umbrechen' },
        { type: 'style', selector: '.bibliothek', prop: 'column-gap', expected: '10px', label: 'Zwischen den Kacheln sind 10 Pixel Abstand' },
      ],
    },
    {
      type: 'explain',
      text: 'Standardmäßig sind Flex-Kinder nur so breit wie ihr Inhalt – rechts bleibt Platz frei. Sollen sie ihn **ausfüllen**, bekommen die **Kinder** die Eigenschaft `flex-grow` (wachsen): `0` = nein (Standard), `1` = ja. Meist schreibt man kurz `flex: 1;` – so werden alle Kinder gleich breit. Ein Kind mit `flex: 2` bekommt doppelt so viel Platz.\n\n```css\n.karte {\n  flex: 1;\n}\n```\n\nMerke: `display: flex` an den Container, `flex: 1` an die Kinder.',
    },
    {
      type: 'fill',
      text: 'Preis-Kacheln: Der Container bricht um, jede Kachel wächst gleichmäßig. **Vervollständige** beide Regeln.',
      template: '.preise {\n  display: flex;\n  flex-wrap: ___;\n  gap: 12px;\n}\n\n.preis {\n  flex: ___;\n}',
      accept: [['wrap'], ['1']],
      hint: 'Umbruch auf Englisch – und der Wachstumsfaktor für „ja“ ist eine Zahl.',
    },
    {
      type: 'code',
      task: '**Erweitere** die Team-Übersicht: Alle Spielerkarten wachsen gleichmäßig, bis die Reihe voll ist. Die Karte der Kapitänin (Klasse `kapitaen`) bekommt doppelt so viel Platz wie jede andere Karte.',
      starter: {
        html: `<div class="team">
  <div class="kapitaen">Nova · Kapitänin</div>
  <div class="karte">Blitz</div>
  <div class="karte">Kato</div>
  <div class="karte">Rey</div>
</div>
`,
        css: `.team {
  display: flex;
  gap: 12px;
}

.karte, .kapitaen {
  border: 2px solid #38c7ff;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.karte {
  /* wächst */
}

.kapitaen {
  /* wächst doppelt */
}
`,
      },
      editable: ['css'],
      hints: [
        'Wachsen ist eine Eigenschaft der Kinder, nicht des Containers.',
        'Die Kurzform `flex` mit einer Zahl: 1 = normal wachsen. Für doppelt so viel Platz nimmst du die doppelte Zahl.',
        'Zwei Regeln sind schon vorbereitet – in jede kommt genau eine Zeile `flex: …;`.',
      ],
      solution: {
        css: `.team {
  display: flex;
  gap: 12px;
}

.karte, .kapitaen {
  border: 2px solid #38c7ff;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.karte {
  flex: 1;
}

.kapitaen {
  flex: 2;
}
`,
      },
      tests: [
        { type: 'style', selector: '.karte', prop: 'flex-grow', expected: '1', label: 'Die Spielerkarten wachsen' },
        { type: 'style', selector: '.kapitaen', prop: 'flex-grow', expected: '2', label: 'Die Kapitänskarte bekommt doppelt so viel Platz' },
        { type: 'style', selector: '.team', prop: 'display', expected: 'flex', label: 'Das Team bleibt ein Flex-Container' },
      ],
    },
    {
      type: 'pair',
      text: '**Ordne** zu.',
      pairs: [
        ['`flex-wrap: wrap`', 'Kinder dürfen in die nächste Zeile rutschen'],
        ['`flex-wrap: nowrap`', 'alles bleibt in einer Zeile (Standard)'],
        ['`flex: 1`', 'das Kind wächst und füllt freien Platz'],
        ['`flex: 2`', 'das Kind bekommt doppelt so viel Platz'],
        ['`gap: 12px`', '12 Pixel Luft zwischen Kindern und Zeilen'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Preis-Kacheln des Fitnessstudios und behebe zwei Fehler: Die Kacheln sollen die ganze Breite ausfüllen und bei wenig Platz umbrechen – stattdessen bleiben sie schmal, und auf dem Handy werden sie zusammengequetscht.',
      starter: {
        html: `<h2>Mitgliedschaft</h2>
<div class="preise">
  <div class="preis">Schüler-Tarif<br>19 € im Monat</div>
  <div class="preis">Monatskarte<br>29 € im Monat</div>
  <div class="preis">Jahreskarte<br>249 € im Jahr</div>
</div>
`,
        css: `.preise {
  display: flex;
  flexwrap: wrap;
  gap: 12px;
  flex: 1;
}

.preis {
  border: 2px solid #4ade80;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}
`,
      },
      editable: ['css'],
      hints: [
        'Ein Fehler ist ein Schreibfehler in einem Eigenschaftsnamen – der Browser ignoriert die Zeile. Der andere: Eine Eigenschaft steht am falschen Element.',
        'Zusammengesetzte Eigenschaftsnamen brauchen einen Bindestrich (wie `flex-direction`). Und Wachsen gehört an die Kinder – hier die Klasse `preis`.',
        'Struktur: `.preise` bekommt Flexbox, Umbruch und Abstand. `.preis` bekommt eine Zeile `flex: …;`.',
      ],
      solution: {
        css: `.preise {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preis {
  border: 2px solid #4ade80;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  flex: 1;
}
`,
      },
      tests: [
        { type: 'style', selector: '.preise', prop: 'flex-wrap', expected: 'wrap', label: 'Die Kacheln dürfen umbrechen' },
        { type: 'style', selector: '.preis', prop: 'flex-grow', expected: '1', label: 'Jede Kachel wächst und füllt die Breite' },
        { type: 'style', selector: '.preise', prop: 'display', expected: 'flex', label: 'Die Preisliste bleibt ein Flex-Container' },
        { type: 'style', selector: '.preise', prop: 'column-gap', expected: '12px', label: 'Zwischen den Kacheln bleiben 12 Pixel Abstand' },
      ],
    },
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Die vier Foodtrucks stehen auf der FUNKEN-Startseite als Liste untereinander. Ich will Kacheln: nebeneinander, 12 Pixel Abstand, alle gleich breit – und auf dem Handy sollen sie umbrechen.\n\nDu brauchst zwei neue Regeln mit Nachfahren-Selektoren (kennst du von den Spots): eine für die Liste im Foodtruck-Bereich als Container, eine für ihre Listenpunkte als wachsende Kinder.',
    },
    { type: 'code', etappe: '14-flexbox/03-umbrechen-und-wachsen' },
  ],
});

/* ============================================================
   Lektion 4 – Wiederholung (14 + 13, 12, 10, 06)
   ============================================================ */
schreibe('lessons/04-wiederholung.json', {
  id: '04-wiederholung',
  title: 'Wiederholung',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Rundgang vor dem Meilenstein: Flexbox aus diesem Kapitel, dazu das Box-Modell (Container), Schrift (Schriftzug), CSS-Grundlagen (Lichtpult) und Bilder (Foto-Wand). Acht Aufgaben – dann bekommt der Fußbereich der FUNKEN-Website Luft.',
    },
    {
      type: 'quiz',
      question: 'Eine Profilkarte stapelt Bild und Name mit `flex-direction: column`. Welche Zeile zentriert beide **horizontal**?',
      options: ['`align-items: center`', '`justify-content: center`', '`flex-wrap: center`'],
      correct: 0,
      explanation: 'In Spaltenrichtung zeigt die Hauptachse nach unten, die Querachse nach rechts. Horizontal zentrieren ist also Sache der Querachse – `align-items`.',
    },
    {
      type: 'fill',
      text: 'Eine Karte bekommt einen 3 Pixel dicken, durchgezogenen Rahmen in `#1b1b2f` und rundum 12 Pixel Innenabstand. **Vervollständige** die Regel.',
      template: '.karte {\n  border: ___ solid #1b1b2f;\n  padding: ___;\n}',
      accept: [['3px'], ['12px']],
      hint: 'Pixelwerte brauchen die Einheit px.',
    },
    {
      type: 'code',
      task: '**Gestalte** die Kopfzeile des Sneaker-Shops: Logo ganz links, Menü ganz rechts, beide auf der Querachse mittig. Die Leiste bekommt die Hintergrundfarbe `#1b1b2f`, die Menü-Links werden 20 Pixel groß.',
      starter: {
        html: `<header class="kopf">
  <img class="logo" src="sneaker.svg" alt="Logo des Sneaker-Shops">
  <nav class="menue">
    <a href="#neu">Neu</a>
    <a href="#sale">Sale</a>
    <a href="#warenkorb">Warenkorb</a>
  </nav>
</header>
`,
        css: `.kopf {
  display: flex;
  padding: 12px 24px;
  /* verteilen, ausrichten, Hintergrund */
}

.logo {
  width: 56px;
}

.menue a {
  color: #fff7e8;
  text-decoration: none;
  margin-left: 16px;
  /* Schriftgröße */
}
`,
      },
      editable: ['css'],
      hints: [
        'Vier Ziele, zwei Regeln: Drei Dinge gehören zur Kopfzeile, die Schriftgröße zu den Links.',
        'Verteilen und Ausrichten wie in Lektion 2 (Hauptachse, Querachse). Hintergrund ist `background-color`, Schriftgröße `font-size` – Muster: `font-size: 14px;`.',
        'Struktur `.kopf`: `justify-content: …;`, `align-items: …;`, `background-color: …;`. In `.menue a`: `font-size: …;`.',
      ],
      solution: {
        css: `.kopf {
  display: flex;
  padding: 12px 24px;
  justify-content: space-between;
  align-items: center;
  background-color: #1b1b2f;
}

.logo {
  width: 56px;
}

.menue a {
  color: #fff7e8;
  text-decoration: none;
  margin-left: 16px;
  font-size: 20px;
}
`,
      },
      tests: [
        { type: 'style', selector: '.kopf', prop: 'justify-content', expected: 'space-between', label: 'Logo ganz links, Menü ganz rechts' },
        { type: 'style', selector: '.kopf', prop: 'align-items', expected: 'center', label: 'Logo und Menü sind mittig auf gleicher Höhe' },
        { type: 'style', selector: '.kopf', prop: 'background-color', expected: '#1b1b2f', label: 'Die Kopfzeile ist dunkel' },
        { type: 'style', selector: '.menue a', prop: 'font-size', expected: '20px', label: 'Die Menü-Links sind 20 Pixel groß' },
      ],
    },
    {
      type: 'order',
      text: 'Ein Bild mit Bildunterschrift für die Foto-Wand – die Unterschrift steht unter dem Bild. **Bringe** die Zeilen in die richtige Reihenfolge.',
      lines: ['<figure>', '  <img src="crowd.svg" alt="Die Menge vor der Bühne">', '  <figcaption>Die Menge vor der Bühne</figcaption>', '</figure>'],
      explanation: '`figure` umschließt Bild und Unterschrift; `figcaption` steht nach dem Bild.',
    },
    {
      type: 'pair',
      text: '**Ordne** jeder Eigenschaft ihre Bedeutung zu.',
      pairs: [
        ['`font-family`', 'Schriftart'],
        ['`padding`', 'Innenabstand'],
        ['`margin`', 'Außenabstand'],
        ['`background-color`', 'Hintergrundfarbe'],
        ['`line-height`', 'Zeilenabstand'],
        ['`border-radius`', 'runde Ecken'],
      ],
    },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Rangliste und behebe zwei Fehler: Die drei Karten sollen nebeneinander stehen und rundum 12 Pixel Innenabstand haben – stattdessen stapeln sie sich, und der Text klebt am Rahmen.',
      starter: {
        html: `<h2>Rangliste</h2>
<div class="rangliste">
  <div class="platz">1. Nova</div>
  <div class="platz">2. Kato</div>
  <div class="platz">3. Blitz</div>
</div>
`,
        css: `.rangliste {
  display flex;
  gap: 12px;
}

.platz {
  border: 2px solid #ffd23f;
  border-radius: 8px;
  padding: 12;
}
`,
      },
      editable: ['css'],
      hints: [
        'Beide Fehler sind winzig: Einmal fehlt ein Zeichen zwischen Eigenschaft und Wert, einmal fehlt etwas hinter einer Zahl.',
        'Eine Deklaration ist immer `eigenschaft: wert;` – mit Doppelpunkt. Längen brauchen eine Einheit, zum Beispiel `margin: 8px;`.',
        'Prüfe jede Zeile der beiden Regeln nach dem Muster `eigenschaft: wert;` – und Pixel heißen `px`.',
      ],
      solution: {
        css: `.rangliste {
  display: flex;
  gap: 12px;
}

.platz {
  border: 2px solid #ffd23f;
  border-radius: 8px;
  padding: 12px;
}
`,
      },
      tests: [
        { type: 'style', selector: '.rangliste', prop: 'display', expected: 'flex', label: 'Die Karten stehen nebeneinander' },
        { type: 'style', selector: '.platz', prop: 'padding-top', expected: '12px', label: 'Die Karten haben 12 Pixel Innenabstand' },
        { type: 'style', selector: '.platz', prop: 'border-top-width', expected: '2px', label: 'Der Rahmen bleibt 2 Pixel dick' },
      ],
    },
    {
      type: 'quiz',
      question: 'Die Datei `style.css` soll auf der Seite wirken. Welche Zeile gehört in den `head`?',
      options: ['`<link rel="stylesheet" href="style.css">`', '`<style src="style.css">`', '`<css href="style.css">`'],
      correct: 0,
      explanation: 'Externe Stylesheets bindest du mit `link` ein: `rel="stylesheet"` sagt, was es ist, `href` zeigt auf die Datei.',
    },
    {
      type: 'fill',
      text: 'Die Hauptüberschrift soll zentriert und 32 Pixel groß sein. **Vervollständige** die Regel.',
      template: 'h1 {\n  text-align: ___;\n  font-size: ___;\n}',
      accept: [['center'], ['32px']],
      hint: 'Mittig auf Englisch; die Größe mit Einheit.',
    },
    {
      type: 'explain',
      text: 'Ab zur FUNKEN-Website: Der Fußbereich der Startseite klebt noch am Rand. Er bekommt rundum 16 Pixel Innenabstand und zentrierten Text – Box-Modell und Schrift in einem Zug.\n\nBeides kommt in die vorhandene footer-Regel; Hintergrund und Schriftfarbe bleiben, wie sie sind.',
    },
    { type: 'code', etappe: '14-flexbox/04-wiederholung' },
  ],
});

/* ============================================================
   Lektion 5 – Projekt: Bühnen-Layout (Meilenstein)
   ============================================================ */
schreibe('lessons/05-projekt-layout.json', {
  id: '05-projekt-layout',
  title: 'Projekt: Bühnen-Layout',
  konzepte: [],
  steps: [
    {
      type: 'explain',
      sprecher: 'sam',
      text: 'Meilenstein! Menü in einer Reihe, Foodtrucks als Kacheln, alles ausgerichtet – die Startseite hat jetzt ein echtes Layout. Zum Abschluss soll der **Kopfbereich leuchten**: dunkler Hintergrund, Luft rundum, gelbe Schrift für Überschrift und Absatz.\n\nDafür kombinierst du drei Stationen: Hintergrundfarbe (Lichtpult), Innenabstand (Container) und einen Gruppen-Selektor aus zwei Nachfahren-Selektoren (Spots).',
    },
    {
      type: 'quiz',
      question: 'Was bewirkt das Komma in `nav a, footer a { color: white; }`?',
      options: ['Beide Selektoren bekommen dieselben Deklarationen', 'Nur Links, die in nav und footer zugleich liegen, werden weiß', 'Das Komma trennt zwei Eigenschaften voneinander'],
      correct: 0,
      explanation: 'Das Komma bildet einen Gruppen-Selektor: Eine Regel gilt für alle aufgezählten Selektoren. Jeder davon darf selbst ein Nachfahren-Selektor sein.',
    },
    {
      type: 'pair',
      text: 'Rückblick Bühnen-Layout: **Ordne** jeder Flexbox-Zeile ihre Aufgabe zu.',
      pairs: [
        ['`display: flex`', 'schaltet Flexbox am Container ein'],
        ['`gap`', 'Abstand zwischen den Kindern'],
        ['`justify-content`', 'verteilt entlang der Hauptachse'],
        ['`align-items`', 'richtet auf der Querachse aus'],
        ['`flex-wrap: wrap`', 'erlaubt den Umbruch in neue Zeilen'],
        ['`flex: 1`', 'lässt ein Kind wachsen'],
      ],
    },
    {
      type: 'explain',
      sprecher: 'robby',
      text: 'Jetzt der Meilenstein: Die vorhandene header-Regel bekommt Hintergrundfarbe und Innenabstand. Eine neue Gruppen-Regel färbt Hauptüberschrift und Absatz im Kopfbereich gelb – beide Selektoren sind Nachfahren-Selektoren, durch ein Komma getrennt.\n\nDanach unbedingt **FUNKEN-Website ansehen**: Das Bühnen-Layout steht!',
    },
    { type: 'code', etappe: '14-flexbox/05-projekt-layout' },
  ],
});

/* ============================================================
   Fragenpool
   ============================================================ */
schreibe('pool.json', {
  chapter: '14-flexbox',
  fragen: [
    { id: '14-01', konzept: 'css.flex', type: 'quiz', question: 'Drei Karten sollen nebeneinander stehen. Welche Zeile gehört in die Regel des Containers?', options: ['`display: flex;`', '`display: block;`', '`flex-direction: row;` allein'], correct: 0, explanation: '`display: flex` schaltet Flexbox am Container ein. `flex-direction` wirkt erst, wenn Flexbox eingeschaltet ist.' },
    { id: '14-02', konzept: 'css.flex', type: 'fill', text: 'Flexbox am Container einschalten.', template: 'nav {\n  display: ___;\n}', accept: ['flex'], hint: 'Der Wert heißt wie das Layout-Werkzeug, nur kürzer.' },
    { id: '14-03', konzept: 'css.flex', type: 'bug', text: 'Die Karten im Container `.team` sollen nebeneinander stehen. Welche Zeile steht am falschen Element?', lines: ['.team { gap: 12px; }', '.karte { display: flex; }', '.karte { padding: 12px; }', '.team { flex-direction: row; }'], line: 1, explanation: '`display: flex` gehört an den Container `.team`, nicht an die Kinder.' },
    { id: '14-04', konzept: 'css.flex', type: 'order', text: 'Rangliste: Der Container umschließt die drei Plätze (Reihenfolge 1 bis 3). **Sortiere** die Zeilen.', lines: ['<div class="rangliste">', '  <div class="platz">1. Nova</div>', '  <div class="platz">2. Kato</div>', '  <div class="platz">3. Blitz</div>', '</div>'], explanation: 'Der äußere `div` ist der Container, die Plätze sind seine Flex-Kinder.' },
    { id: '14-05', konzept: 'css.flex-direction', type: 'quiz', question: 'Welcher Wert von `flex-direction` stapelt die Flex-Kinder untereinander?', options: ['`column`', '`row`', '`stack`'], correct: 0, explanation: '`column` heißt Spalte – die Kinder stehen untereinander. `row` (Reihe) ist der Standard, `stack` gibt es nicht.' },
    { id: '14-06', konzept: 'css.flex-direction', type: 'bug', text: 'Die Chat-Nachrichten sollen untereinander stehen, stehen aber nebeneinander. Welche Zeile ist falsch?', lines: ['.chat {', '  display: flex;', '  flex-direction: colum;', '  gap: 8px;', '}'], line: 2, explanation: 'Der Wert heißt `column` – mit n am Ende. Falsch geschriebene Werte ignoriert der Browser.' },
    { id: '14-07', konzept: 'css.gap', type: 'fill', text: '16 Pixel Abstand zwischen den Flex-Kindern.', template: '.menue {\n  display: flex;\n  ___: 16px;\n}', accept: ['gap'], hint: 'Drei Buchstaben, englisch für „Lücke“.' },
    { id: '14-08', konzept: 'css.gap', type: 'quiz', question: 'Was bewirkt `gap: 20px` in einem Flex-Container?', options: ['20 Pixel Abstand zwischen den Kindern, nicht außen herum', '20 Pixel Innenabstand im Container', '20 Pixel Außenabstand um den Container'], correct: 0, explanation: '`gap` ist nur der Abstand zwischen den Kindern. Innenabstand wäre `padding`, Außenabstand `margin`.' },
    { id: '14-09', konzept: 'css.justify-content', type: 'pair', text: '`justify-content` – ordne die Werte zu.', pairs: [['`flex-start`', 'am Anfang der Hauptachse (Standard)'], ['`center`', 'in der Mitte'], ['`space-between`', 'erstes und letztes Kind am Rand, Rest gleichmäßig'], ['`space-around`', 'gleich viel Luft um jedes Kind']] },
    { id: '14-10', konzept: 'css.justify-content', type: 'quiz', question: 'Die Links einer Reihe sollen mittig verteilt sein. Welche Zeile?', options: ['`justify-content: center;`', '`align-items: center;`', '`text-align: middle;`'], correct: 0, explanation: 'Verteilen entlang der Hauptachse ist `justify-content`. `align-items` arbeitet auf der Querachse, `middle` gibt es bei `text-align` nicht.' },
    { id: '14-11', konzept: 'css.justify-content', type: 'bug', text: 'Die Links sollen mittig sein, kleben aber links. Welche Zeile ist falsch?', lines: ['.menue {', '  display: flex;', '  justify-content: middle;', '}'], line: 2, explanation: '`middle` gibt es nicht – der Wert für die Mitte heißt `center`.' },
    { id: '14-12', konzept: 'css.align-items', type: 'quiz', question: 'Logo und Menü in einer Reihe sollen senkrecht auf gleicher Höhe stehen. Welche Eigenschaft?', options: ['`align-items`', '`justify-content`', '`text-align`'], correct: 0, explanation: 'Senkrecht ist bei `row` die Querachse – dafür ist `align-items` zuständig.' },
    { id: '14-13', konzept: 'css.align-items', type: 'fill', text: 'Gestapelte Kinder (Spaltenrichtung) horizontal zentrieren.', template: '.profil {\n  display: flex;\n  flex-direction: column;\n  ___: center;\n}', accept: ['align-items'], hint: 'In Spaltenrichtung ist „horizontal“ die Querachse.' },
    { id: '14-14', konzept: 'css.align-items', type: 'bug', text: 'Die Kinder sollen auf der Querachse mittig sein, sind es aber nicht. Welche Zeile ist falsch?', lines: ['.kopf {', '  display: flex;', '  align-item: center;', '}'], line: 2, explanation: 'Die Eigenschaft heißt `align-items` – mit s am Ende.' },
    { id: '14-15', konzept: 'css.flex-wrap', type: 'quiz', question: 'Acht Kacheln passen nicht in eine Zeile. Welche Zeile lässt sie umbrechen?', options: ['`flex-wrap: wrap;`', '`flex-wrap: nowrap;`', '`flex: 1;`'], correct: 0, explanation: '`wrap` erlaubt den Umbruch. `nowrap` ist der Standard und quetscht alles in eine Zeile; `flex: 1` lässt Kinder wachsen.' },
    { id: '14-16', konzept: 'css.flex-wrap', type: 'fill', text: 'Die Kacheln dürfen in die nächste Zeile rutschen.', template: '.kacheln {\n  display: flex;\n  flex-wrap: ___;\n}', accept: ['wrap'], hint: 'Umbrechen auf Englisch, vier Buchstaben.' },
    { id: '14-17', konzept: 'css.flex-wrap', type: 'order', text: '**Sortiere**, was bei `flex-wrap: wrap` passiert, wenn der Platz knapp wird.', lines: ['Flexbox legt die Kinder nebeneinander in eine Zeile', 'Die Zeile ist voll – das nächste Kind passt nicht mehr', 'Dank flex-wrap: wrap rutscht es in eine neue Zeile', 'gap hält auch zwischen den Zeilen den Abstand'], explanation: 'Erst füllt sich die Zeile, dann bricht der Container um – und gap wirkt auch zwischen den Zeilen.' },
    { id: '14-18', konzept: 'css.flex-grow', type: 'quiz', question: 'Die Kacheln sollen die ganze Breite ausfüllen. Wo kommt `flex: 1` hin?', options: ['An jede Kachel – also an die Kinder', 'An den Container', 'In die body-Regel'], correct: 0, explanation: 'Wachsen ist eine Eigenschaft der Kinder. Der Container bekommt `display: flex`, die Kinder `flex: 1`.' },
    { id: '14-19', konzept: 'css.flex-grow', type: 'pair', text: 'Eigenschaften an den Flex-Kindern – ordne zu.', pairs: [['`flex: 1`', 'wächst, alle Kinder gleich breit'], ['`flex: 2`', 'bekommt doppelt so viel Platz'], ['`flex-grow: 0`', 'wächst nicht (Standard)']] },
    { id: '14-20', konzept: 'css.flex-grow', type: 'bug', text: 'Die Kacheln sollen wachsen und die Breite füllen. Welche Zeile steht am falschen Element?', lines: ['.kacheln { display: flex; }', '.kacheln { flex-wrap: wrap; }', '.kacheln { flex: 1; }', '.kachel { padding: 12px; }'], line: 2, explanation: '`flex: 1` gehört an die Kinder (`.kachel`), nicht an den Container.' },
  ],
});

/* ============================================================
   Abnahme
   ============================================================ */
schreibe('boss.json', {
  chapter: '14-flexbox',
  title: 'Abnahme: Bühnen-Layout',
  intro: 'Menü in einer Reihe, Foodtrucks als Kacheln, der Kopf leuchtet – jetzt sieht die Startseite endlich nach Festival aus! Bevor ich das dem Kollektiv zeige: Erklär mir, was da passiert, und bau mir so eine Kachel-Reihe einmal ohne Vorlage.',
  bestanden: 0.8,
  aufgaben: [
    { konzept: 'css.flex', type: 'quiz', question: 'Vier Kacheln sollen nebeneinander stehen. Welches Element bekommt `display: flex`?', options: ['Der Container, der die vier Kacheln umschließt', 'Jede einzelne Kachel', 'Das body-Element'], correct: 0, explanation: 'Flexbox wird am Eltern-Element eingeschaltet; die Kacheln werden dadurch zu Flex-Kindern.' },
    { konzept: 'css.justify-content', type: 'pair', text: 'Ordne die Zeilen ihrer Wirkung zu (Richtung `row`).', pairs: [['`justify-content: center`', 'Kinder waagerecht in der Mitte'], ['`justify-content: space-between`', 'erstes Kind links, letztes rechts'], ['`align-items: center`', 'Kinder senkrecht mittig'], ['`align-items: flex-end`', 'Kinder unten am Ende der Querachse']] },
    { konzept: 'css.flex-wrap', type: 'fill', text: 'Die Foodtruck-Kacheln dürfen in die nächste Zeile umbrechen.', template: '.foodtrucks {\n  display: flex;\n  flex-wrap: ___;\n  gap: 12px;\n}', accept: ['wrap'] },
    {
      type: 'code',
      task: '**Gestalte** die Angebots-Kacheln des Pizza-Lieferdienstes: Die Kacheln stehen in einem Flex-Container mit 16 Pixel Abstand, dürfen umbrechen und wachsen alle gleichmäßig, bis die Reihe voll ist.',
      starter: {
        html: `<h2>Unsere Angebote</h2>
<div class="angebote">
  <div class="angebot">Margherita<br>7,50 €</div>
  <div class="angebot">Salami<br>8,50 €</div>
  <div class="angebot">Veggie<br>9,00 €</div>
  <div class="angebot">Familienpizza<br>16,00 €</div>
</div>
`,
        css: `.angebote {
  /* Kachel-Reihe */
}

.angebot {
  border: 2px solid #ff7a45;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}
`,
      },
      editable: ['css'],
      solution: {
        css: `.angebote {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.angebot {
  border: 2px solid #ff7a45;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  flex: 1;
}
`,
      },
      tests: [
        { type: 'style', selector: '.angebote', prop: 'display', expected: 'flex', label: 'Die Angebote sind ein Flex-Container' },
        { type: 'style', selector: '.angebote', prop: 'flex-wrap', expected: 'wrap', label: 'Die Kacheln dürfen umbrechen' },
        { type: 'style', selector: '.angebote', prop: 'column-gap', expected: '16px', label: 'Zwischen den Kacheln sind 16 Pixel Abstand' },
        { type: 'style', selector: '.angebot', prop: 'flex-grow', expected: '1', label: 'Jede Kachel wächst gleichmäßig' },
      ],
    },
    { konzept: 'css.padding', type: 'quiz', question: 'Welche Eigenschaft schafft Abstand zwischen Rahmen und Text **innerhalb** einer Karte?', options: ['`padding`', '`margin`', '`gap`'], correct: 0, explanation: '`padding` ist der Innenabstand. `margin` ist außen, `gap` liegt zwischen Flex-Kindern.' },
    { konzept: 'css.flex-direction', type: 'bug', text: 'Die Nachrichten sollen untereinander stehen, stehen aber nebeneinander. Welche Zeile ist falsch?', lines: ['.chat {', '  display: flex;', '  flex-direction: colum;', '  gap: 8px;', '}'], line: 2, explanation: 'Der Wert heißt `column`. Tippfehler im Wert – die Zeile wird ignoriert.' },
    {
      type: 'code',
      mode: 'fix',
      task: '**Überprüfe** die Kopfzeile des Sneaker-Shops und behebe zwei Fehler: Logo und Menü sollen in einer Reihe stehen – Logo ganz links, Menü ganz rechts, beide mittig auf gleicher Höhe. Stattdessen stehen sie untereinander.',
      starter: {
        html: `<header class="kopf">
  <img class="logo" src="sneaker.svg" alt="Logo des Sneaker-Shops">
  <nav class="menue">
    <a href="#neu">Neu</a>
    <a href="#sale">Sale</a>
    <a href="#warenkorb">Warenkorb</a>
  </nav>
</header>
`,
        css: `.kopf {
  dispaly: flex;
  justify-content: space-betwen;
  align-items: center;
  background-color: #1b1b2f;
  padding: 12px 24px;
}

.logo {
  width: 56px;
}

.menue a {
  color: #fff7e8;
  margin-left: 16px;
}
`,
      },
      editable: ['css'],
      solution: {
        css: `.kopf {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1b1b2f;
  padding: 12px 24px;
}

.logo {
  width: 56px;
}

.menue a {
  color: #fff7e8;
  margin-left: 16px;
}
`,
      },
      tests: [
        { type: 'style', selector: '.kopf', prop: 'display', expected: 'flex', label: 'Logo und Menü stehen in einer Reihe' },
        { type: 'style', selector: '.kopf', prop: 'justify-content', expected: 'space-between', label: 'Logo ganz links, Menü ganz rechts' },
        { type: 'style', selector: '.kopf', prop: 'align-items', expected: 'center', label: 'Beide sind mittig auf gleicher Höhe' },
        { type: 'style', selector: '.kopf', prop: 'background-color', expected: '#1b1b2f', label: 'Die Kopfzeile bleibt dunkel' },
      ],
    },
    { konzept: 'html.alt', type: 'quiz', question: 'Wozu dient das Attribut `alt` bei einem Bild?', options: ['Es beschreibt das Bild, falls es nicht lädt oder vorgelesen wird', 'Es legt die Breite des Bildes fest', 'Es verlinkt das Bild mit einer anderen Seite'], correct: 0, explanation: 'Der Alternativtext ersetzt das Bild, wenn es fehlt, und wird von Screenreadern vorgelesen.' },
    { konzept: 'css.text-align', type: 'fill', text: 'Der Text im Fußbereich soll zentriert sein.', template: 'footer {\n  text-align: ___;\n}', accept: ['center'] },
    { konzept: 'css.background', type: 'quiz', question: 'Welche Eigenschaft färbt den Hintergrund des Kopfbereichs dunkel?', options: ['`background-color`', '`color`', '`border-color`'], correct: 0, explanation: '`background-color` färbt die Fläche. `color` ist die Schriftfarbe, `border-color` die Rahmenfarbe.' },
    { konzept: 'css.align-items', type: 'quiz', question: 'Eine Profilkarte hat `flex-direction: column`. Welche Zeile zentriert Bild und Name horizontal?', options: ['`align-items: center;`', '`justify-content: center;`', '`flex-wrap: wrap;`'], correct: 0, explanation: 'In Spaltenrichtung liegt die Querachse waagerecht – horizontal zentrieren übernimmt deshalb `align-items`.' },
  ],
});

console.log('Kapitel 14 geschrieben');
