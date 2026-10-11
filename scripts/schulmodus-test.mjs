// Ende-zu-Ende-Test des Schulmodus: baut die App mit Basis "/", startet server/app.py mit einer
// frischen Datenbank in einem Temp-Ordner, legt per CLI einen Admin an und spielt im Browser durch:
//   Anmeldepflicht → Admin meldet sich an → Klasse + drei Accounts (Druckliste) → Lernende*r meldet
//   sich an, Vorspann (Lesefassung), Onboarding → Spielstand liegt auf dem Server → nach Browser-Reset
//   ist er wieder da → Passwort ändern → Fremdzugriff auf Lehrkraft-API wird abgewiesen →
//   Klassenübersicht zeigt die Aktivität.
// Aufruf: node scripts/schulmodus-test.mjs [--ohne-build] [--shots <ordner>]
// Voraussetzung: python3 mit Flask (anderer Interpreter: PYTHON=/pfad/zu/python).

import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';

const WURZEL = path.join(import.meta.dirname, '..');
const args = process.argv.slice(2);
const PY = process.env.PYTHON || 'python3';
const shotsArg = args.indexOf('--shots');
const SHOTS = shotsArg >= 0 ? args[shotsArg + 1] : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const DIST = path.join(WURZEL, 'dist-schule');

const log = (m) => console.log(`· ${m}`);
const pruefe = (bedingung, text) => {
  if (!bedingung) throw new Error(`Prüfung fehlgeschlagen: ${text}`);
  log(`✓ ${text}`);
};

if (!args.includes('--ohne-build')) {
  log('Baue die App mit Basis "/" nach dist-schule …');
  execSync('npx vite build --outDir dist-schule', { cwd: WURZEL, env: { ...process.env, WEBWERKSTATT_BASE: '/' }, stdio: 'ignore' });
}

const port = await new Promise((r) => { const s = net.createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => r(p)); }); });
const instanz = fs.mkdtempSync(path.join(os.tmpdir(), 'ww-schule-'));
const env = { ...process.env, WEBWERKSTATT_INSTANCE: instanz, WEBWERKSTATT_DIST: DIST, PORT: String(port), HOST: '127.0.0.1' };
const ADMIN = { pseudonym: 'admin', passwort: 'Admin-Test-1234' };
execSync(`${PY} app.py create-admin ${ADMIN.pseudonym} ${ADMIN.passwort}`, { cwd: path.join(WURZEL, 'server'), env, stdio: 'ignore' });
const server = spawn(PY, ['app.py'], { cwd: path.join(WURZEL, 'server'), env, stdio: ['ignore', 'ignore', 'pipe'] });
let serverLog = '';
server.stderr.on('data', (d) => (serverLog += d.toString()));
const BASIS = `http://127.0.0.1:${port}`;
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(`${BASIS}/api/ping`);
    if (r.ok) break;
  } catch {
    /* noch nicht da */
  }
  await new Promise((r) => setTimeout(r, 250));
}
log(`Server läuft auf ${BASIS} (Instanz ${instanz})`);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu'] });
const context = await browser.newContext({ viewport: { width: 1280, height: 860 } });
const page = await context.newPage();
const seitenfehler = [];
page.on('pageerror', (e) => seitenfehler.push(e.message));
const shot = async (name) => SHOTS && page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: false });
const api = (pfad, init) => page.evaluate(async ([p, i]) => { const r = await fetch(p, { credentials: 'same-origin', ...i }); return { status: r.status, body: await r.json().catch(() => null) }; }, [pfad, init || {}]);

async function anmelden(pseudonym, passwort) {
  await page.goto(`${BASIS}/#/login`, { waitUntil: 'load' });
  await page.waitForSelector('.login-seite', { timeout: 15000 });
  await page.fill('#pseudonym', pseudonym);
  await page.fill('#passwort', passwort);
  await Promise.all([page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }).catch(() => {}), page.click('#los')]);
  await page.waitForSelector('#app .intro, #app .hyperia-seite, #app .karte', { timeout: 15000 });
}
async function abmelden() {
  await api('/api/logout', { method: 'POST' });
  await page.evaluate(() => localStorage.clear());
}

try {
  // 1. Ohne Anmeldung landet man auf der Login-Seite
  await page.goto(`${BASIS}/`, { waitUntil: 'load' });
  await page.waitForSelector('.login-seite', { timeout: 15000 });
  pruefe((await page.evaluate(() => location.hash)) === '#/login', 'Ohne Anmeldung: Weiterleitung zur Anmeldung');
  await shot('01-login');

  // 2. Falsches Passwort
  await page.fill('#pseudonym', ADMIN.pseudonym);
  await page.fill('#passwort', 'falsch-falsch');
  await page.click('#los');
  await page.waitForSelector('#fehler:not([hidden])', { timeout: 10000 });
  pruefe(true, 'Falsches Passwort wird abgewiesen');

  // 3. Admin meldet sich an, legt Klasse und drei Accounts an
  await anmelden(ADMIN.pseudonym, ADMIN.passwort);
  pruefe(!!(await page.$('.intro')), 'Admin angemeldet, erster Start zeigt den Vorspann');
  await page.goto(`${BASIS}/#/klasse`, { waitUntil: 'load' });
  await page.waitForSelector('.klasse-seite', { timeout: 15000 });
  await page.fill('#klasse-name', 'Testklasse 1BK1T');
  await page.click('#neu button');
  await page.waitForSelector('#klassen-liste .klasse-eintrag', { timeout: 10000 });
  await page.click('#klassen-liste .klasse-eintrag');
  await page.waitForSelector('#accounts', { timeout: 10000 });
  await page.fill('#anzahl', '3');
  await page.click('#accounts button');
  await page.waitForSelector('.druckliste tbody tr', { timeout: 10000 });
  const accounts = await page.$$eval('.druckliste tbody tr', (rows) => rows.map((r) => ({ pseudonym: r.children[1].textContent.trim(), passwort: r.children[2].textContent.trim() })));
  pruefe(accounts.length === 3 && accounts.every((a) => /^[A-Za-z]+\d{2}$/.test(a.pseudonym) && a.passwort.length === 8), 'Drei Accounts mit Pseudonym und Startpasswort erzeugt');
  await page.waitForFunction(() => document.querySelectorAll('.klasse-tabelle tbody tr').length === 3, null, { timeout: 10000 });
  await shot('02-klasse-accounts');
  const lehrer = await api('/api/admin/teachers');
  pruefe(lehrer.status === 200 && lehrer.body.lehrkraefte.length === 1, 'Admin sieht die Lehrkräfte-Liste');

  // 4. Lernende*r: Anmeldung, Vorspann (Lesefassung), Onboarding, Spielstand landet auf dem Server
  await abmelden();
  const sch = accounts[0];
  await anmelden(sch.pseudonym, sch.passwort);
  await page.waitForSelector('.intro', { timeout: 15000 });
  if (await page.$('#lesen')) await page.click('#lesen');
  await page.waitForSelector('.intro-lesen', { timeout: 10000 });
  for (let i = 0; i < 8; i++) {
    if (await page.$('.intro-onboarding')) break;
    await page.click('#weiter');
    await page.waitForTimeout(150);
  }
  await page.waitForSelector('.intro-onboarding', { timeout: 10000 });
  await page.fill('#name', 'Testlehrling');
  await page.click('#los');
  await page.waitForSelector('#app .karte', { timeout: 15000 });
  await page.waitForTimeout(3000); // gebündelter Sync (2 s)
  const gespeichert = await api('/api/progress');
  pruefe(gespeichert.status === 200 && gespeichert.body.spielstand?.name === 'Testlehrling' && gespeichert.body.spielstand?.intro?.komplett === true, 'Spielstand mit Name und Vorspann-Status liegt auf dem Server');
  await shot('03-lernende-ort');

  // 5. Browser-Reset: Spielstand kommt vom Server zurück
  await page.evaluate(() => localStorage.clear());
  await page.goto(`${BASIS}/#/ich`, { waitUntil: 'load' });
  await page.reload({ waitUntil: 'load' }); // echter Neustart der App (goto mit Hash lädt nicht neu)
  await page.waitForSelector('#app .karte', { timeout: 15000 });
  await page.waitForTimeout(500);
  const lokal = await page.evaluate(() => JSON.parse(localStorage.getItem('webwerkstatt2.spielstand.v1') || '{}'));
  pruefe(lokal.name === 'Testlehrling' && lokal.intro?.komplett === true, 'Nach Browser-Reset wird der Spielstand vom Server wiederhergestellt');
  pruefe(!(await page.$('.login-seite')), 'Sitzung bleibt bestehen (Cookie)');

  // 6. Passwort ändern unter „Ich“, danach Anmeldung nur noch mit dem neuen
  await page.waitForSelector('#pw-form', { timeout: 10000 });
  await page.fill('#pw-alt', sch.passwort);
  await page.fill('#pw-neu', 'neues-pw-123');
  await page.click('#pw-form button');
  await page.waitForTimeout(600);
  await shot('04-ich-passwort');
  const altLogin = await api('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pseudonym: sch.pseudonym, passwort: sch.passwort }) });
  pruefe(altLogin.status === 401, 'Altes Passwort gilt nicht mehr');
  const neuLogin = await api('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pseudonym: sch.pseudonym, passwort: 'neues-pw-123' }) });
  pruefe(neuLogin.status === 200 && neuLogin.body.nutzer.rolle === 'student', 'Neues Passwort funktioniert');

  // 7. Lernende dürfen nicht an die Lehrkraft- und Admin-API
  pruefe((await api('/api/teacher/classes')).status === 403, 'Lehrkraft-API für Lernende gesperrt');
  pruefe((await api('/api/admin/teachers')).status === 403, 'Admin-API für Lernende gesperrt');
  const fremd = await api('/api/progress', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ spielstand: 'kaputt' }) });
  pruefe(fremd.status === 400, 'Ungültiger Spielstand wird abgewiesen');

  // 8. Abgemeldet: API verlangt Anmeldung
  await abmelden();
  pruefe((await api('/api/progress')).status === 401, 'Ohne Sitzung kein Spielstand');

  // 9. Klassenübersicht zeigt die Aktivität des Accounts
  await anmelden(ADMIN.pseudonym, ADMIN.passwort);
  await page.goto(`${BASIS}/#/klasse`, { waitUntil: 'load' });
  await page.waitForSelector('#klassen-liste .klasse-eintrag', { timeout: 15000 });
  await page.click('#klassen-liste .klasse-eintrag');
  await page.waitForSelector('.klasse-tabelle tbody tr', { timeout: 10000 });
  const zeilen = await page.$$eval('.klasse-tabelle tbody tr', (rows) => rows.map((r) => [...r.children].map((c) => c.textContent.trim())));
  const zeile = zeilen.find((z) => z[0] === sch.pseudonym);
  pruefe(zeile && zeile[1].startsWith('0 /') && zeile[5] !== '–', 'Klassenübersicht zeigt den Account mit „zuletzt aktiv“');
  await shot('05-klasse-uebersicht');

  // 10. Passwort zurücksetzen und Klasse löschen
  await page.click(`.klasse-tabelle .reset`);
  await page.waitForSelector('.druckliste tbody tr', { timeout: 10000 });
  pruefe((await page.$$('.druckliste tbody tr')).length === 1, 'Neues Startpasswort erscheint in der Druckliste');
  page.once('dialog', (d) => d.accept());
  await page.click('#loeschen');
  await page.waitForFunction(() => !document.querySelector('#klassen-liste .klasse-eintrag'), null, { timeout: 10000 });
  pruefe((await api('/api/teacher/classes')).body.klassen.length === 0, 'Klasse samt Accounts gelöscht');

  if (seitenfehler.length) throw new Error(`Seitenfehler: ${seitenfehler.join(' | ')}`);
  console.log('\nSchulmodus-Test bestanden – alle Prüfungen grün, keine Seitenfehler.');
} catch (e) {
  console.error('\nSchulmodus-Test FEHLGESCHLAGEN:', e.message);
  if (serverLog.trim()) console.error('Server-Log:\n' + serverLog.split('\n').slice(-20).join('\n'));
  await shot('fehler');
  process.exitCode = 1;
} finally {
  await browser.close();
  server.kill();
  fs.rmSync(instanz, { recursive: true, force: true });
}
