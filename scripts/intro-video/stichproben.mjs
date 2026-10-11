// Stichproben aus dem Storyboard: fotografiert das Vorspann-Storyboard zu bestimmten Zeitpunkten
// (ohne Video-Rendering) – zum Prüfen von Layout und Timing.
// Aufruf: node scripts/intro-video/stichproben.mjs <ordner> [t1,t2,...]

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { chromium } from 'playwright';

const WURZEL = path.join(import.meta.dirname, '..', '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const ordner = process.argv[2] || '/tmp/ww-intro-stichproben';
const zeiten = (process.argv[3] || '2,7,17,23,27.4,35,46,56,65,75,83,86.3,90').split(',').map(Number);
fs.mkdirSync(ordner, { recursive: true });

const port = await new Promise((resolve) => { const s = net.createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => resolve(p)); }); });
const server = http.createServer((req, res) => {
  const datei = path.normalize(path.join(WURZEL, decodeURIComponent(req.url.split('?')[0])));
  if (!datei.startsWith(WURZEL) || !fs.existsSync(datei) || fs.statSync(datei).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(datei)] || 'application/octet-stream' });
  fs.createReadStream(datei).pipe(res);
});
await new Promise((r) => server.listen(port, '127.0.0.1', r));
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--font-render-hinting=none'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
let fehler = 0;
page.on('pageerror', (e) => { fehler++; console.error('Seitenfehler:', e.message); });
page.on('console', (m) => m.type() === 'error' && console.error('Konsole:', m.text()));
await page.goto(`http://127.0.0.1:${port}/scripts/intro-video/storyboard.html`, { waitUntil: 'load' });
await page.evaluate(() => window.__intro.bereit);
await page.waitForTimeout(300);
for (const t of zeiten) {
  await page.evaluate((tt) => window.__intro.seek(tt), t);
  await page.waitForTimeout(60);
  await page.screenshot({ path: path.join(ordner, `t${String(t).replace('.', '_').padStart(4, '0')}.png`) });
}
await browser.close();
server.close();
console.log(`${zeiten.length} Stichproben in ${ordner}${fehler ? ` – ${fehler} Seitenfehler!` : ''}`);
process.exit(fehler ? 1 : 0);
