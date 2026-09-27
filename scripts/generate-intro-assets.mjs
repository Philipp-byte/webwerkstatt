// Erzeugt Szenenbilder für den Vorspann mit der OpenAI-Bild-API (gpt-image-1)
// und trägt sie in public/content/story/intro.json ("bilder") ein.
//
// Voraussetzung: Umgebungsvariable OPENAI_API_KEY (nie in den Chat oder ins Repo!).
// Aufruf: node scripts/generate-intro-assets.mjs [--nur skyline,werkstatt] [--groesse 1536x1024]
//
// Ohne Bilder nutzt der Vorspann automatisch die eingebauten SVG-Kulissen.

import fs from 'node:fs';
import path from 'node:path';

const KEY = process.env.OPENAI_API_KEY;
const wurzel = path.join(import.meta.dirname, '..');
const zielOrdner = path.join(wurzel, 'public', 'intro', 'assets');
const introPfad = path.join(wurzel, 'public', 'content', 'story', 'intro.json');

const STIL = 'Cinematic illustration, clean modern graphic-novel style, dark night palette with warm orange and amber stage lights and a cool cyan accent, subtle film grain, wide 3:2 composition, no text, no letters, no watermark.';
const SZENEN = {
  skyline: 'Night skyline of a mid-sized German river town (Heilbronn) seen across the Neckar river, an old brick factory site in the foreground with unlit festival stages, light rain, reflections on the water.',
  gelaende: 'An empty open-air festival ground at night before the festival: a big dark main stage with the word area left blank, a smaller tent stage, closed food trucks, string lights not yet lit, a ferris wheel silhouette, moody and expectant.',
  bildschirm: 'Close-up of a laptop screen in a dark room showing a broken website with a large glitchy 404 error, a young festival organizer\'s hands on the keyboard, orange desk lamp light, dramatic.',
  werkstatt: 'Interior of a small creative web studio inside an old factory hall at night: brick walls, three glowing monitors with colorful code (orange, cyan, yellow), a friendly small white-and-blue robot assistant on the desk, warm desk lamps, cozy and professional.',
  plan: 'Abstract illustration of three stacked translucent layers floating above a workbench: an orange skeleton layer at the bottom, a cyan color-and-light layer in the middle, a yellow electric layer on top, blueprint grid background, no text.',
  keycard: 'A sleek holographic employee keycard floating above a dark desk, orange and cyan light reflections, a small robot icon on the card, dramatic close-up, no readable text.',
  karte: 'Top-down stylized map of a festival ground at night with a winding glowing path connecting eighteen small lit stations, stages, food trucks, a ferris wheel and a river at the bottom, warm lights, no text.',
  arena: 'A festival main stage at night with a huge blank LED screen glowing orange and cyan, spotlights cutting through haze, confetti in the air, a cheering crowd in silhouette raising hands, tournament atmosphere, no text.',
  bracket: 'A large dark tournament bracket board hanging in an old factory hall, eighteen empty glowing circular badge slots connected by dotted lines in three rows, one badge at the bottom highlighted in warm orange, cyan and amber lights, no text.',
  spielerkarte: 'A holographic trading card floating above a dark desk, portrait silhouette of a young coder in the center, three small stat boxes at the bottom glowing orange, cyan and yellow, warm rim light, dramatic close-up, no readable text.',
};

const args = process.argv.slice(2);
const nur = args.includes('--nur') ? args[args.indexOf('--nur') + 1].split(',') : Object.keys(SZENEN);
const groesse = args.includes('--groesse') ? args[args.indexOf('--groesse') + 1] : '1536x1024';

if (!KEY) {
  console.error('OPENAI_API_KEY ist nicht gesetzt. In den Einstellungen der Umgebung als Variable hinterlegen (nicht in den Chat schreiben), dann erneut ausführen.');
  process.exit(1);
}

fs.mkdirSync(zielOrdner, { recursive: true });
const intro = JSON.parse(fs.readFileSync(introPfad, 'utf8'));
intro.bilder = intro.bilder || {};

for (const name of nur) {
  if (!SZENEN[name]) {
    console.warn(`Unbekannte Kulisse: ${name}`);
    continue;
  }
  process.stdout.write(`Erzeuge ${name} … `);
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-1', prompt: `${SZENEN[name]} ${STIL}`, size: groesse, quality: 'medium', output_format: 'webp', n: 1 }),
  });
  if (!res.ok) {
    console.error(`Fehler ${res.status}: ${(await res.text()).slice(0, 300)}`);
    continue;
  }
  const daten = await res.json();
  const b64 = daten.data?.[0]?.b64_json;
  if (!b64) {
    console.error('keine Bilddaten');
    continue;
  }
  const datei = `assets/${name}.webp`;
  fs.writeFileSync(path.join(wurzel, 'public', 'intro', datei), Buffer.from(b64, 'base64'));
  intro.bilder[name] = datei;
  console.log('ok');
}
fs.writeFileSync(introPfad, JSON.stringify(intro, null, 2) + '\n');
console.log('Fertig. intro.json aktualisiert – bauen, prüfen, pushen.');
