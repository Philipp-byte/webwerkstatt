// Rendert den Vorspann als Video: Das Storyboard (scripts/intro-video/storyboard.html) wird
// in Chromium geladen, Frame für Frame per seek(t) gestellt und fotografiert; die Bilder
// gehen direkt an ffmpeg, dazu der synthetische Soundtrack (scripts/intro-video/musik.mjs).
// Ergebnis: public/intro/schattennetz-intro.mp4 (H.264 + AAC), dazu schattennetz-intro.webm (VP9 + Opus,
// Fallback für Browser ohne H.264), ein Poster-Bild und Untertitel (VTT).
// Aufruf: node scripts/render-intro-video.mjs [--fps 30] [--schnell] [--nur-poster] [--ohne-webm]
//   --schnell  rendert mit 15 fps und niedrigerer Qualität (zum Ausprobieren)

import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import os from 'node:os';
import { chromium } from 'playwright';
import { erzeugeSoundtrack } from './intro-video/musik.mjs';

const WURZEL = path.join(import.meta.dirname, '..');
const ZIEL_DIR = path.join(WURZEL, 'public', 'intro');
const NAME = 'schattennetz-intro';
const args = process.argv.slice(2);
const schnell = args.includes('--schnell');
const nurPoster = args.includes('--nur-poster');
const ohneWebm = args.includes('--ohne-webm');
const fpsArg = args.indexOf('--fps');
const FPS = fpsArg >= 0 ? Number(args[fpsArg + 1]) : schnell ? 15 : 30;
const BREITE = 1280;
const HOEHE = 720;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.webm': 'video/webm', '.wav': 'audio/wav' };

// Kleiner statischer Server über dem Repo (Schriften, Figuren, Welt, Karten- und Sigil-Engine)
async function freierPort() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const p = srv.address().port;
      srv.close(() => resolve(p));
    });
  });
}
async function starteServer() {
  const port = await freierPort();
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    const datei = path.normalize(path.join(WURZEL, rel));
    if (!datei.startsWith(WURZEL) || !fs.existsSync(datei) || fs.statSync(datei).isDirectory()) {
      res.writeHead(404);
      res.end('nicht gefunden');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(datei)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(datei).pipe(res);
  });
  await new Promise((r) => server.listen(port, '127.0.0.1', r));
  return { url: `http://127.0.0.1:${port}`, stop: () => server.close() };
}

function vtt(untertitel) {
  const zeit = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = (s % 60).toFixed(3).padStart(6, '0');
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${sec}`;
  };
  return `WEBVTT\n\n${untertitel.map((u, i) => `${i + 1}\n${zeit(u.start)} --> ${zeit(u.end)}\n${u.text}\n`).join('\n')}`;
}

const t0 = Date.now();
const log = (m) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}`);
fs.mkdirSync(ZIEL_DIR, { recursive: true });
const server = await starteServer();
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--font-render-hinting=none', '--hide-scrollbars'] });
const page = await browser.newPage({ viewport: { width: BREITE, height: HOEHE }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('Seitenfehler:', e.message));
page.on('console', (m) => m.type() === 'error' && console.error('Konsole:', m.text()));
await page.goto(`${server.url}/scripts/intro-video/storyboard.html`, { waitUntil: 'load' });
await page.evaluate(() => window.__intro.bereit);
await page.waitForTimeout(300);
const dauer = await page.evaluate(() => window.__intro.dauer);
const untertitel = await page.evaluate(() => window.__intro.untertitel);
log(`Storyboard bereit: ${dauer} s, ${FPS} fps`);

// Poster (Titelbild) und Untertitel
const posterZeit = await page.evaluate(() => window.__intro.poster ?? 0);
await page.evaluate((t) => window.__intro.seek(t), posterZeit);
await page.waitForTimeout(80);
await page.screenshot({ path: path.join(ZIEL_DIR, `${NAME}-poster.jpg`), type: 'jpeg', quality: 88 });
fs.writeFileSync(path.join(ZIEL_DIR, `${NAME}.vtt`), vtt(untertitel));
log('Poster und Untertitel geschrieben');

if (!nurPoster) {
  // Soundtrack
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ww-intro-'));
  const wav = path.join(tmp, 'soundtrack.wav');
  erzeugeSoundtrack(wav);
  log('Soundtrack erzeugt');

  // ffmpeg: Bilder über stdin, Ton aus der WAV
  const ziel = path.join(ZIEL_DIR, `${NAME}.mp4`);
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
    '-i', wav,
    '-c:v', 'libx264', '-preset', schnell ? 'veryfast' : 'slow', '-crf', schnell ? '30' : '23', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-tune', 'animation',
    '-c:a', 'aac', '-b:a', '128k',
    '-movflags', '+faststart', '-shortest', ziel,
  ], { stdio: ['pipe', 'ignore', 'inherit'] });
  const schreibe = (buf) => new Promise((resolve) => (ff.stdin.write(buf) ? resolve() : ff.stdin.once('drain', resolve)));
  const frames = Math.round(dauer * FPS);
  for (let i = 0; i < frames; i++) {
    const t = i / FPS;
    await page.evaluate((tt) => window.__intro.seek(tt), t);
    const bild = await page.screenshot({ type: 'jpeg', quality: schnell ? 80 : 92 });
    await schreibe(bild);
    if (i % (FPS * 10) === 0) log(`Frame ${i}/${frames} (${t.toFixed(1)} s)`);
  }
  ff.stdin.end();
  const code = await new Promise((resolve) => ff.on('close', resolve));
  fs.rmSync(tmp, { recursive: true, force: true });
  if (code !== 0) {
    console.error(`ffmpeg beendet mit Code ${code}`);
    process.exitCode = 1;
  } else {
    const mb = (fs.statSync(ziel).size / 1024 / 1024).toFixed(2);
    log(`Video geschrieben: ${path.relative(WURZEL, ziel)} (${mb} MB, ${frames} Frames)`);
    if (!ohneWebm) {
      // WebM-Fassung (VP9/Opus) aus dem MP4 – für Browser ohne H.264 (z. B. Chromium ohne proprietäre Codecs)
      const webm = path.join(ZIEL_DIR, `${NAME}.webm`);
      const vp9 = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-i', ziel, '-c:v', 'libvpx-vp9', '-crf', schnell ? '40' : '34', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', schnell ? '5' : '2', '-pix_fmt', 'yuv420p', '-c:a', 'libopus', '-b:a', '96k', webm], { stdio: ['ignore', 'ignore', 'inherit'] });
      const code2 = await new Promise((resolve) => vp9.on('close', resolve));
      if (code2 === 0) log(`WebM geschrieben: ${path.relative(WURZEL, webm)} (${(fs.statSync(webm).size / 1024 / 1024).toFixed(2)} MB)`);
      else console.error(`WebM-Umwandlung fehlgeschlagen (Code ${code2})`);
    }
  }
}

await browser.close();
server.stop();
