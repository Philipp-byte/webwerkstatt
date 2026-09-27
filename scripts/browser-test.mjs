// Browser-Prüfung aller Code-Aufgaben (Lektionen, Etappen, Abnahmen): Die
// Musterlösung muss alle Tests bestehen, der unveränderte Starter darf sie
// nicht bestehen. Nutzt die interne Route #/pruefung der gebauten App.
//
// Aufruf: node scripts/browser-test.mjs [kapitel-id]
// Voraussetzung: npm run build (dist/) – das Skript startet vite preview selbst.

import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const kapitel = process.argv[2] || '';
const port = 4177;
const preview = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));

let exit = 0;
try {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  const fehler = [];
  page.on('pageerror', (e) => fehler.push(`pageerror: ${e.message}`));
  await page.goto(`http://localhost:${port}/webwerkstatt/#/pruefung${kapitel ? `/${kapitel}` : ''}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__ww_pruefung, null, { timeout: 15 * 60 * 1000 });
  const ergebnis = await page.evaluate(() => window.__ww_pruefung);
  const zeilen = await page.$$eval('.pruef-tabelle tbody tr', (trs) =>
    trs.map((tr) => [...tr.children].map((td) => td.textContent.trim()))
  );
  for (const [wo, loesung, starter] of zeilen) {
    if (!loesung.startsWith('✔') || !starter.startsWith('✔')) console.log(`FEHLER  ${wo}\n        Lösung: ${loesung}\n        Starter: ${starter}`);
  }
  console.log(`\n${ergebnis.aufgaben} Aufgaben geprüft – ${ergebnis.fehler} Problem(e)${fehler.length ? `\nSeitenfehler: ${fehler.join('; ')}` : ''}`);
  exit = ergebnis.fehler || fehler.length ? 1 : 0;
  await browser.close();
} catch (e) {
  console.error(e);
  exit = 1;
} finally {
  preview.kill();
}
process.exit(exit);
