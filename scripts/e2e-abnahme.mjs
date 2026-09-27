// Spielt die Abnahme eines Kapitels mit richtigen Antworten durch und prüft,
// dass sie bestanden wird. Aufruf: node scripts/e2e-abnahme.mjs <kapitel-id>

import { spawn } from 'node:child_process';
import net from 'node:net';

// Vorschau-Server auf einem freien Port starten (eigene Prozessgruppe, damit er sauber beendet wird)
async function freierPort() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const p = srv.address().port;
      srv.close(() => resolve(p));
    });
  });
}
async function startePreview() {
  const port = await freierPort();
  const proc = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(port), '--strictPort'], { stdio: 'ignore', detached: true });
  const base = `http://localhost:${port}/webwerkstatt/`;
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(base);
      if (r.ok) break;
    } catch {
      /* noch nicht da */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  const stop = () => {
    try {
      process.kill(-proc.pid, 'SIGTERM');
    } catch {
      /* schon weg */
    }
  };
  return { base, stop };
}
import fs from 'node:fs';
import { chromium } from 'playwright';
import { loeseSchritt, schliesseOverlays } from './lib/spieler.mjs';

const chapterId = process.argv[2];
const preview = await startePreview();
const base = preview.base;
const boss = JSON.parse(fs.readFileSync(`public/content/chapters/${chapterId}/boss.json`, 'utf8'));
let exit = 0;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const fehler = [];
// Fehler aus dem Vorschau-Iframe (absichtlich kaputter Starter-Code bei Fehlerjagden) zählen nicht – nur Fehler der App selbst
page.on('pageerror', (e) => { if (/\/assets\/|\/src\//.test(e.stack || '')) fehler.push(`pageerror: ${e.message}`); });
try {
  await page.goto(base, { waitUntil: 'load' });
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('webwerkstatt2.lehrkraft', '1');
    localStorage.setItem('webwerkstatt2.spielstand.v1', JSON.stringify({ intro: { seen: true } }));
  });
  await page.addStyleTag({ content: '.overlay{display:none !important}' });
  await page.evaluate((h) => { location.hash = h; }, `#/abnahme/${chapterId}`);
  await page.waitForSelector('#start', { timeout: 15000 });
  await page.click('#start');
  for (let i = 0; i < boss.aufgaben.length; i++) {
    const a = boss.aufgaben[i];
    await page.waitForTimeout(400);
    const karte = await page.$('#buehne .schritt');
    await loeseSchritt(page, a, karte);
    await page.waitForTimeout(300);
    await schliesseOverlays(page);
    await page.click('#buehne .schritt-buttons .btn-primaer');
  }
  await page.waitForSelector('#buehne .abschluss', { timeout: 10000 });
  const text = await page.$eval('#buehne .abschluss', (e) => e.innerText);
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('webwerkstatt2.spielstand.v1')));
  const b = state.boss[chapterId];
  console.log(`${b?.passed ? '✔' : '✘'} Abnahme ${chapterId}: ${Math.round((b?.best || 0) * 100)} %, ${boss.aufgaben.length} Aufgaben, XP ${state.xp}`);
  if (!b?.passed || b.best < 1) throw new Error(`Abnahme nicht mit 100 % bestanden: ${text.slice(0, 200)}`);
  if (fehler.length) throw new Error(fehler.join('\n'));
} catch (e) {
  console.error(`✘ Abnahme ${chapterId}:`, e.message);
  await page.screenshot({ path: `/tmp/e2e-abnahme-${chapterId}.png` }).catch(() => {});
  exit = 1;
} finally {
  await Promise.race([browser.close(), new Promise((r) => setTimeout(r, 5000))]);
  preview.stop();
}
process.exit(exit);
