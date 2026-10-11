// Erzeugt die Grafiken von SCHATTENNETZ über die OpenAI-Bild-API (gpt-image-1):
// Figuren (Seidra, neun Gespinste, Sam, Ayla, Jonas), achtzehn Orte in zwei Zuständen
// und sechs Vorspann-Szenen. Aufträge und Stil: scripts/grafiken/auftraege.mjs.
// Vorhandene Dateien werden übersprungen, danach wird public/figuren/manifest.json
// neu geschrieben (die App zeigt Bilder, wenn sie da sind, sonst Sigille).
//
// Aufruf:  OPENAI_API_KEY=sk-… node scripts/grafiken-erzeugen.mjs [Optionen]
//   --liste              nur die Aufträge zeigen (kein API-Aufruf, kein Schlüssel nötig)
//   --nur <Teil>         nur Ziele, die den Text enthalten (z. B. --nur seidra, --nur orte/)
//   --ueberschreiben     vorhandene Dateien neu erzeugen
//   --qualitaet low|medium|high   (Standard: medium)
//   --modell <name>      (Standard: gpt-image-1)
//   --manifest           nur das Manifest neu schreiben
// Läuft hinter einem Proxy (HTTPS_PROXY gesetzt) über undici.ProxyAgent.

import fs from 'node:fs';
import path from 'node:path';
import { AUFTRAEGE, STIL } from './grafiken/auftraege.mjs';

const WURZEL = path.join(import.meta.dirname, '..');
const PUBLIC = path.join(WURZEL, 'public');
const args = process.argv.slice(2);
const opt = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const nurListe = args.includes('--liste');
const nurManifest = args.includes('--manifest');
const ueberschreiben = args.includes('--ueberschreiben');
const filter = opt('--nur');
const qualitaet = opt('--qualitaet', 'medium');
const modell = opt('--modell', 'gpt-image-1');

const GROESSEN = { figur: '1024x1024', ort: '1536x1024', szene: '1536x1024' };

function manifestSchreiben() {
  const bilder = [];
  const figurenDir = path.join(PUBLIC, 'figuren');
  if (fs.existsSync(figurenDir)) {
    for (const id of fs.readdirSync(figurenDir)) {
      const d = path.join(figurenDir, id);
      if (!fs.statSync(d).isDirectory()) continue;
      for (const f of fs.readdirSync(d)) if (/\.(webp|png)$/.test(f)) bilder.push(`${id}/${f.replace(/\.(webp|png)$/, '')}`);
    }
  }
  const orte = {};
  const orteDir = path.join(PUBLIC, 'orte');
  if (fs.existsSync(orteDir)) {
    for (const id of fs.readdirSync(orteDir)) {
      const d = path.join(orteDir, id);
      if (!fs.statSync(d).isDirectory()) continue;
      orte[id] = fs.readdirSync(d).filter((f) => f.endsWith('.webp')).map((f) => f.replace('.webp', ''));
    }
  }
  const szenen = fs.existsSync(path.join(PUBLIC, 'intro', 'szenen')) ? fs.readdirSync(path.join(PUBLIC, 'intro', 'szenen')).filter((f) => f.endsWith('.webp')).map((f) => Number(f.replace('.webp', ''))).sort((a, b) => a - b) : [];
  const manifest = { erzeugt: new Date().toISOString(), bilder: bilder.sort(), orte, szenen };
  fs.writeFileSync(path.join(figurenDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}

const auftraege = AUFTRAEGE.filter((a) => !filter || a.ziel.includes(filter));
if (nurListe) {
  for (const a of auftraege) console.log(`${a.ziel.padEnd(44)} ${GROESSEN[a.art]}  ${a.prompt.slice(0, 90)}…`);
  console.log(`\n${auftraege.length} Aufträge (Stil je Art: ${Object.keys(STIL).join(', ')})`);
  process.exit(0);
}
if (nurManifest) {
  const m = manifestSchreiben();
  console.log(`Manifest: ${m.bilder.length} Figurenbilder, ${Object.keys(m.orte).length} Orte, ${m.szenen.length} Szenen`);
  process.exit(0);
}

const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error('OPENAI_API_KEY fehlt. Beispiel: OPENAI_API_KEY=sk-… node scripts/grafiken-erzeugen.mjs');
  process.exit(1);
}

// fetch mit Proxy-Unterstützung
let fetchFn = globalThis.fetch;
if (process.env.HTTPS_PROXY || process.env.https_proxy) {
  try {
    const undici = await import('undici');
    const agent = new undici.ProxyAgent(process.env.HTTPS_PROXY || process.env.https_proxy);
    fetchFn = (url, init = {}) => undici.fetch(url, { ...init, dispatcher: agent });
  } catch {
    console.warn('undici nicht installiert – versuche es ohne Proxy (npm install --save-dev undici).');
  }
}

const schlafen = (ms) => new Promise((r) => setTimeout(r, ms));

async function erzeuge(auftrag) {
  const body = {
    model: modell,
    prompt: `${STIL[auftrag.art]} ${auftrag.prompt}`,
    n: 1,
    size: GROESSEN[auftrag.art],
    quality: qualitaet,
    output_format: 'webp',
  };
  if (auftrag.art === 'figur') body.background = 'transparent';
  for (let versuch = 1; versuch <= 5; versuch++) {
    const res = await fetchFn('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const d = await res.json();
      const b64 = d.data?.[0]?.b64_json;
      if (!b64) throw new Error('Antwort ohne Bilddaten');
      return Buffer.from(b64, 'base64');
    }
    const text = await res.text().catch(() => '');
    if ((res.status === 429 || res.status >= 500) && versuch < 5) {
      const warte = 10000 * versuch;
      console.warn(`  ${res.status} – warte ${warte / 1000} s (Versuch ${versuch}/5)`);
      await schlafen(warte);
      continue;
    }
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  throw new Error('zu viele Versuche');
}

let neu = 0;
let uebersprungen = 0;
let fehler = 0;
const t0 = Date.now();
for (const [i, a] of auftraege.entries()) {
  const ziel = path.join(PUBLIC, a.ziel);
  if (fs.existsSync(ziel) && !ueberschreiben) {
    uebersprungen++;
    continue;
  }
  process.stdout.write(`[${i + 1}/${auftraege.length}] ${a.ziel} … `);
  try {
    const bild = await erzeuge(a);
    fs.mkdirSync(path.dirname(ziel), { recursive: true });
    fs.writeFileSync(ziel, bild);
    neu++;
    console.log(`${(bild.length / 1024).toFixed(0)} KB`);
  } catch (e) {
    fehler++;
    console.log(`FEHLER: ${e.message}`);
  }
}
const m = manifestSchreiben();
console.log(`\nFertig in ${((Date.now() - t0) / 1000).toFixed(0)} s: ${neu} neu, ${uebersprungen} übersprungen, ${fehler} Fehler.`);
console.log(`Manifest: ${m.bilder.length} Figurenbilder, ${Object.keys(m.orte).length} Orte, ${m.szenen.length} Szenen.`);
if (fehler) process.exitCode = 1;
