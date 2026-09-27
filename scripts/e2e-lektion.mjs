// Spielt eine Lektion im Browser komplett durch (richtige Antworten aus der JSON,
// Code-Aufgaben mit der Musterlösung) und prüft Abschluss, XP und Sterne.
// Aufruf: node scripts/e2e-lektion.mjs <kapitel-id> <lektion-id> [--shots]
// Voraussetzung: npm run build

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { loeseSchritt } from './lib/spieler.mjs';

const [chapterId, lessonId] = process.argv.slice(2);
if (!chapterId || !lessonId) {
  console.error('Aufruf: node scripts/e2e-lektion.mjs <kapitel-id> <lektion-id>');
  process.exit(1);
}
const shots = process.argv.includes('--shots');
const port = 4178;
const preview = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));
const base = `http://localhost:${port}/webwerkstatt/`;
const lektion = JSON.parse(fs.readFileSync(`public/content/chapters/${chapterId}/lessons/${lessonId}.json`, 'utf8'));
const etappen = JSON.parse(fs.readFileSync('public/content/projekt/etappen.json', 'utf8')).etappen;
let exit = 0;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const fehler = [];
page.on('pageerror', (e) => fehler.push(`pageerror: ${e.message}`));
page.on('console', (m) => m.type() === 'error' && !/404|Failed to load resource/.test(m.text()) && fehler.push(`console: ${m.text()}`));

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('webwerkstatt2.lehrkraft', '1'); // alles frei
    localStorage.setItem('webwerkstatt2.spielstand.v1', JSON.stringify({ intro: { seen: true } }));
  });
  await page.goto(`${base}#/lektion/${chapterId}/${lessonId}`, { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.lektion-seite', { timeout: 15000 });
  // Soundcheck überspringen, falls vorhanden
  const skip = await page.$('.sc-skip');
  if (skip) await skip.click();
  for (let i = 0; i < lektion.steps.length; i++) {
    const step = lektion.steps[i];
    const karte = await page.$('.schritt.pager-seite:not([hidden])');
    if (!karte) throw new Error(`Schritt ${i + 1}: keine sichtbare Karte`);
    await loeseSchritt(page, step, karte, { etappen });
    await page.waitForTimeout(150);
    const weiter = await page.$('.pager-weiter');
    if (await weiter.isDisabled()) throw new Error(`Schritt ${i + 1} (${step.type}) wurde nicht als gelöst erkannt`);
    if (shots) await page.screenshot({ path: `/tmp/e2e-${lessonId}-${i + 1}.png` });
    await weiter.click();
    await page.waitForTimeout(250);
  }
  await page.waitForSelector('.schritt-abschluss:not([hidden])', { timeout: 10000 });
  const sterne = await page.$$eval('.abschluss .sterne-gross .stern:not(.leer)', (s) => s.length);
  const xp = await page.$eval('.xp-zahl', (e) => e.textContent);
  const gespeichert = await page.evaluate(() => JSON.parse(localStorage.getItem('webwerkstatt2.spielstand.v1')));
  const eintrag = gespeichert.lessons[`${chapterId}/${lessonId}`];
  console.log(`✔ ${chapterId}/${lessonId}: ${lektion.steps.length} Schritte, ${sterne} Sterne, Kopfzeile ${xp}, gespeichert: ${JSON.stringify(eintrag)}, XP gesamt ${gespeichert.xp}`);
  if (!eintrag?.done || sterne !== 3 || gespeichert.xp <= 0) throw new Error('Abschluss unvollständig');
  if (fehler.length) throw new Error(fehler.join('\n'));
} catch (e) {
  console.error(`✘ ${chapterId}/${lessonId}:`, e.message);
  await page.screenshot({ path: `/tmp/e2e-fehler-${lessonId}.png` }).catch(() => {});
  exit = 1;
} finally {
  await browser.close();
  preview.kill();
}
process.exit(exit);
