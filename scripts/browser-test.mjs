// Browser-Prüfung aller Code-Aufgaben (Lektionen, Etappen, Abnahmen): Die
// Musterlösung muss alle Tests bestehen, der unveränderte Starter darf sie
// nicht bestehen. Nutzt die interne Route #/pruefung der gebauten App.
//
// Aufruf: node scripts/browser-test.mjs [kapitel-id]
// Voraussetzung: npm run build (dist/) – das Skript startet vite preview selbst.

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
import { chromium } from 'playwright';

const kapitel = process.argv[2] || '';
const preview = await startePreview();

let exit = 0;
try {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  const fehler = [];
  // Fehler aus dem Vorschau-Iframe (absichtlich kaputter Starter-Code bei Fehlerjagden) zählen nicht – nur Fehler der App selbst
page.on('pageerror', (e) => { if (/\/assets\/|\/src\//.test(e.stack || '')) fehler.push(`pageerror: ${e.message}`); });
  await page.goto(`${preview.base}#/pruefung${kapitel ? `/${kapitel}` : ''}`, { waitUntil: 'networkidle' });
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
  preview.stop();
}
process.exit(exit);
