// Bildaufträge für scripts/grafiken-erzeugen.mjs: Figuren, Orte und Vorspann-Szenen von
// SCHATTENNETZ. Ein gemeinsamer Stil-Prompt hält alles zusammen; jeder Auftrag ergänzt
// nur das Motiv. Zielpfade liegen unter public/ (figuren/<id>/<pose>.webp,
// orte/<kapitel>/<zustand>.webp, intro/szenen/<n>.webp).

export const STIL = {
  figur:
    'Flat vector illustration for a teen learning game, dark-fantasy mood, clean geometric shapes, bold silhouette, minimal shading, limited palette of deep violet, magenta (#e23cff), gold (#ffc53d) and ink white. Single character centered, full body, facing slightly left, consistent character design across poses. No text, no letters, no watermark, no frame. Transparent background.',
  ort:
    'Flat vector landscape illustration for a teen learning game, dark-fantasy mood, clean geometric shapes, minimal shading, wide composition, limited palette of deep violet (#0f0c1f), magenta (#e23cff), gold (#ffc53d), blue (#3fb0ff) and ink white. No text, no letters, no characters, no watermark, no frame.',
  szene:
    'Cinematic flat vector illustration, dark-fantasy mood, clean geometric shapes, dramatic lighting, limited palette of deep violet (#0f0c1f), magenta (#e23cff), gold (#ffc53d) and ink white, 16:9 composition. No text, no letters, no watermark, no frame.',
};

const GESPINSTE = {
  knoten: 'a mischievous creature made of a single tangled, glowing magenta thread knotted into a round body, two white dot eyes, loose thread ends sticking out',
  krakel: 'a wild creature whose body is a scribble of jagged zigzag magenta lines, like angry handwriting, two white dot eyes, chaotic',
  luecke: 'a round, soft magenta creature with a gaping black hole as a mouth with jagged teeth, two white eyes above the hole, hollow and sly',
  zerr: 'a creature shaped like a stretched, skewed lattice grid of magenta bars, warped and uneven, two white dot eyes in the middle',
  schwindel: 'a two-faced mask creature, left half bright magenta and smiling, right half dark purple and frowning, hollow eyes, deceitful',
  blass: 'a pale grey ghost-like figure, faded and washed out, closed sleepy eyes, slightly transparent edges, drowsy',
  streu: 'a swarm creature made of scattered magenta dots and blobs of different sizes drifting together, several pairs of tiny white eyes',
  quetsch: 'a squashed, flattened block creature pressed wide and low, angry squinting white eyes, straining',
  starr: 'a frozen crystal golem made of light-blue ice blocks with cracks, stiff and heavy, small dark eyes, frost',
};
const GESPINST_POSEN = {
  neutral: 'neutral pose, lurking, slightly menacing',
  action: 'attacking pose, lunging forward, gleeful mischief',
  defeated: 'defeated pose, shrinking back, unraveling, dizzy',
};

export const AUFTRAEGE = [];

// Seidra, die Spinnenkönigin
const seidra = 'Seidra, an elegant and menacing spider queen: a tall female figure with a dark violet gown that becomes eight slender spider legs, a small golden crown, four glowing red eyes, long silk threads of magenta light trailing from her hands';
for (const [pose, text] of Object.entries({ neutral: 'regal pose, weaving threads, calm and cold', action: 'attacking pose, legs raised, pulling a web of threads tight', defeated: 'retreating into darkness, threads snapping, crown slipping', portrait: 'close-up portrait, shoulders up, cold stare' })) {
  AUFTRAEGE.push({ ziel: `figuren/seidra/${pose}.webp`, art: 'figur', prompt: `${seidra}, ${text}` });
}

// Neun Gespinste, drei Posen
for (const [id, beschreibung] of Object.entries(GESPINSTE)) {
  for (const [pose, text] of Object.entries(GESPINST_POSEN)) {
    AUFTRAEGE.push({ ziel: `figuren/${id}/${pose}.webp`, art: 'figur', prompt: `${beschreibung}, ${text}` });
  }
}

// Verbündete: Sam, Ayla, Jonas (Robby hat schon Bilder)
const VERBUENDETE = {
  sam: 'Sam, master of the weaving workshop: a confident woman around 45 with short grey-streaked hair, a long gold-trimmed work coat, a tool belt with spools and a weaving shuttle, warm and strict',
  ayla: 'Ayla, the light weaver: a young woman around 20 with glowing light-blue strands in her dark hair, a lantern of blue light in one hand, threads of light around her fingers, focused and kind',
  jonas: 'Jonas, the bridge builder: a sturdy young man around 20 with curly hair, a violet scarf, rope coiled over his shoulder and a wooden plank under his arm, cheerful and reliable',
};
const VERB_POSEN = { neutral: 'neutral friendly pose', happy: 'cheering, thumbs up, proud', thoughtful: 'thinking, hand at chin, explaining' };
for (const [id, beschreibung] of Object.entries(VERBUENDETE)) {
  for (const [pose, text] of Object.entries(VERB_POSEN)) {
    AUFTRAEGE.push({ ziel: `figuren/${id}/${pose}.webp`, art: 'figur', prompt: `${beschreibung}, ${text}` });
  }
}

// Achtzehn Orte in zwei Zuständen: unter dem Netz (netz) und befreit (frei)
const ORTE = [
  ['01-wie-das-web-funktioniert', 'Quellgrund: a glowing spring of light rising from violet rock in a quiet cave, streams of light flowing outward like rivers'],
  ['02-html-erste-schritte', 'Runenfeld: a wide field of standing stones carved with glowing runes, a path between them'],
  ['03-text', 'Schriftfels: a towering cliff face covered in giant carved inscriptions, lines of text as architecture'],
  ['04-listen', 'Listental: a valley crossed by long plank bridges arranged in neat rows and numbered steps'],
  ['05-links', 'Brückenstadt: a city of floating islands connected by bridges made of light'],
  ['06-bilder-und-medien', 'Spiegelsee: a perfectly still mirror lake reflecting the sky and the islands above'],
  ['07-tabellen', 'Rasterfeste: a fortress built on a strict grid, walls like rows and columns of a table'],
  ['08-struktur-und-attribute', 'Zonenmark: a walled town clearly divided into districts: a head district, a central district, a footer district'],
  ['09-formulare', 'Zollhaus: a customs house and ticket gate with counters, forms and stamps at the border'],
  ['10-css-grundlagen', 'Lichtfälle: waterfalls of colored light cascading down violet cliffs into pools of color'],
  ['11-selektoren', 'Spotwald: a dark forest where single beams of spotlight pick out individual trees'],
  ['12-schrift-und-text', 'Letternkloster: a monastery whose towers and arches are shaped like giant letters'],
  ['13-box-modell', 'Kistenhafen: a harbour stacked with crates and containers of many sizes, each with padding and borders'],
  ['14-flexbox', 'Schwebegärten: floating garden terraces that align themselves in rows, hovering in the air'],
  ['15-recht-im-web', 'Siegelhalle: a solemn hall of giant wax seals, scrolls and law tablets'],
  ['16-javascript-start', 'Funkenschmiede: a forge where glowing sparks are hammered out of gold, bellows and anvils'],
  ['17-javascript-dom', 'Uhrwerk: a gigantic clockwork of gears, levers and switches driving a whole city'],
  ['18-showtime', 'Funkenfest: a festival ground with stages, lanterns and a tall antenna tower at the center'],
];
for (const [id, motiv] of ORTE) {
  AUFTRAEGE.push({ ziel: `orte/${id}/netz.webp`, art: 'ort', prompt: `${motiv}. The whole scene is covered by a dark shadow spider web of magenta threads, colors muted and dim, oppressive.` });
  AUFTRAEGE.push({ ziel: `orte/${id}/frei.webp`, art: 'ort', prompt: `${motiv}. The scene is freed and lit by warm golden light, colors restored and vivid, hopeful.` });
}

// Vorspann-Szenen (Hintergründe für das Storyboard)
const SZENEN = [
  'An old brick weaving mill by a river at midnight, one window lit warm gold, the city skyline dark behind it, reflections on the water',
  'A gigantic wooden loom in a stone cellar, its threads glowing with light and forming a portal of light between them',
  'Panorama of Hyperia: floating islands connected by bridges of light, waterfalls of colored light, sparks drifting through the air, five regions visible',
  'A spider queen awakening in a deep dark cavern, a web of shadow threads spreading upward over a map-like landscape, lights going out',
  'Five silhouettes of a workshop team standing before the glowing portal of the loom, seen from behind, ready to step through',
  'The map of Hyperia seen from above, covered by a dark web, a single golden point of light glowing at the bottom edge',
];
SZENEN.forEach((motiv, i) => AUFTRAEGE.push({ ziel: `intro/szenen/${i + 1}.webp`, art: 'szene', prompt: motiv }));
