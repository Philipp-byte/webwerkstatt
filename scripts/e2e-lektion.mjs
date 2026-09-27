// Spielt eine Lektion im Browser komplett durch (richtige Antworten aus der JSON,
// Code-Aufgaben mit der Musterlösung) und prüft Abschluss, XP und Sterne.
// Aufruf: node scripts/e2e-lektion.mjs <kapitel-id> <lektion-id> [--shots]
// Voraussetzung: npm run build

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

const [chapterId, lessonId] = process.argv.slice(2);
if (!chapterId || !lessonId) {
  console.error('Aufruf: node scripts/e2e-lektion.mjs <kapitel-id> <lektion-id>');
  process.exit(1);
}
const shots = process.argv.includes('--shots');
const debug = process.argv.includes('--debug');
const t0 = Date.now();
const dbg = (m) => process.argv.includes('--debug') && process.stderr.write(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}\n`);
dbg('starte Vorschau');
const preview = await startePreview();
const base = preview.base;
dbg('Vorschau ' + base);
const lektion = JSON.parse(fs.readFileSync(`public/content/chapters/${chapterId}/lessons/${lessonId}.json`, 'utf8'));
const etappen = JSON.parse(fs.readFileSync('public/content/projekt/etappen.json', 'utf8')).etappen;
let exit = 0;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu'] });
dbg('Browser gestartet');
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
dbg('Seite offen');
const fehler = [];
// Fehler aus dem Vorschau-Iframe (absichtlich kaputter Starter-Code bei Fehlerjagden) zählen nicht – nur Fehler der App selbst
page.on('pageerror', (e) => { if (/\/assets\/|\/src\//.test(e.stack || '')) fehler.push(`pageerror: ${e.message}`); });
page.on('crash', () => { fehler.push('SEITE ABGESTÜRZT'); dbg('Seite abgestürzt'); });
browser.on('disconnected', () => dbg('Browser getrennt'));
page.on('close', () => dbg('Seite geschlossen'));
page.on('load', () => dbg('load-Ereignis (Navigation?) ' + page.url()));
page.on('framenavigated', (f) => f === page.mainFrame() && dbg('Hauptframe navigiert: ' + f.url()));
page.context().on('page', (p) => dbg('neue Seite/Popup: ' + p.url()));
page.on('dialog', (d) => { dbg('Dialog: ' + d.message()); d.dismiss().catch(() => {}); });
page.on('console', (m) => m.type() === 'error' && !/404|Failed to load resource/.test(m.text()) && fehler.push(`console: ${m.text()}`));

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  dbg('Startseite geladen');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('webwerkstatt2.lehrkraft', '1'); // alles frei
    localStorage.setItem('webwerkstatt2.spielstand.v1', JSON.stringify({ intro: { seen: true } }));
  });
  await page.goto(`${base}#/lektion/${chapterId}/${lessonId}`, { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.overlay{display:none !important}' }); // Level-up-Overlays stören den Testlauf nicht
  dbg('Lektion aufgerufen');
  await page.waitForSelector('.lektion-seite', { timeout: 15000 });
  dbg('Lektion sichtbar');
  // Soundcheck überspringen, falls vorhanden
  const skip = await page.$('.sc-skip');
  if (skip) await skip.click();
  for (let i = 0; i < lektion.steps.length; i++) {
    const step = lektion.steps[i];
    if (debug) console.log(`[${Math.round((Date.now() - t0) / 1000)}s] Schritt ${i + 1}/${lektion.steps.length}: ${step.type}${step.mode ? ' (' + step.mode + ')' : ''}${step.etappe ? ' etappe' : ''}`);
    const karte = await page.$('.schritt.pager-seite:not([hidden])');
    if (!karte) throw new Error(`Schritt ${i + 1}: keine sichtbare Karte`);
    await loeseSchritt(page, step, karte, { etappen });
    await page.waitForTimeout(150);
    await schliesseOverlays(page);
    const weiter = await page.$('.pager-weiter');
    if (await weiter.isDisabled()) throw new Error(`Schritt ${i + 1} (${step.type}) wurde nicht als gelöst erkannt`);
    if (shots) await page.screenshot({ path: `/tmp/e2e-${lessonId}-${i + 1}.png` });
    await weiter.click();
    await page.waitForTimeout(250);
  }
  await page.waitForSelector('.schritt-abschluss:not([hidden])', { timeout: 10000 });
  await schliesseOverlays(page);
  const sterne = await page.$$eval('.abschluss .sterne-gross .stern:not(.leer)', (s) => s.length);
  const xp = await page.$eval('.xp-zahl', (e) => e.textContent);
  const gespeichert = await page.evaluate(() => JSON.parse(localStorage.getItem('webwerkstatt2.spielstand.v1')));
  const eintrag = gespeichert.lessons[`${chapterId}/${lessonId}`];
  console.log(`✔ ${chapterId}/${lessonId}: ${lektion.steps.length} Schritte, ${sterne} Sterne, Kopfzeile ${xp}, gespeichert: ${JSON.stringify(eintrag)}, XP gesamt ${gespeichert.xp}`);
  if (!eintrag?.done || sterne !== 3 || gespeichert.xp <= 0) throw new Error('Abschluss unvollständig');
  if (fehler.length) throw new Error(fehler.join('\n'));
} catch (e) {
  console.error(`✘ ${chapterId}/${lessonId}:`, e.message);
  if (debug) console.error(e.stack?.split('\n').slice(0, 6).join('\n'));
  await page.screenshot({ path: `/tmp/e2e-fehler-${lessonId}.png` }).catch(() => {});
  exit = 1;
} finally {
  await Promise.race([browser.close(), new Promise((r) => setTimeout(r, 5000))]);
  preview.stop();
}
process.exit(exit);
