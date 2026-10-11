// Rauchtest der App im Browser: ruft alle Ansichten auf (inkl. Zwischenspiele, Nachschlagen,
// Spickzettel, Spielerkarte mit Trophäenkarten), spielt den Anpfiff der ersten Runde durch
// und meldet jeden Seitenfehler. Mit --shots entstehen Screenshots unter /tmp/ww-shots.
// Aufruf: npm run build && node scripts/smoke-test.mjs [--shots] [--dir <ordner>]

import { spawn } from 'node:child_process';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { loeseSchritt } from './lib/spieler.mjs';

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
  return { base, stop: () => { try { process.kill(-proc.pid, 'SIGTERM'); } catch { /* weg */ } } };
}

const shots = process.argv.includes('--shots');
const dirArg = process.argv.indexOf('--dir');
const ordner = dirArg >= 0 ? process.argv[dirArg + 1] : '/tmp/ww-shots';
if (shots) fs.mkdirSync(ordner, { recursive: true });

const preview = await startePreview();
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
const fehler = [];
page.on('pageerror', (e) => fehler.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error' && !/favicon|net::ERR|404/.test(m.text())) fehler.push(`console: ${m.text()}`);
});
let nr = 0;
const shot = async (name) => {
  if (!shots) return;
  await page.screenshot({ path: path.join(ordner, `${String(++nr).padStart(2, '0')}-${name}.png`), fullPage: false });
};
const geh = async (hash, warten = '#app .karte, #app .schritt, #app .gelaende, #app .intro, #app .spickzettel-seite') => {
  await page.goto(preview.base + hash);
  await page.waitForSelector(warten, { timeout: 15000 });
  await page.waitForTimeout(400);
};

const KAP = '01-wie-das-web-funktioniert';
const szenen = JSON.parse(fs.readFileSync('public/content/story/szenen.json', 'utf8'));
let exit = 0;
try {
  // Erster Besuch: Vorspann-Startbildschirm → Video → Onboarding (Name) → Anpfiff
  await page.goto(preview.base);
  await page.waitForSelector('.intro', { timeout: 15000 });
  await page.waitForTimeout(600);
  await shot('intro-start');
  if (await page.$('#video')) {
    await page.click('#video');
    await page.waitForSelector('video#film', { timeout: 10000 });
    await page.waitForTimeout(1500);
    const video = await page.$eval('video#film', (v) => ({ src: v.currentSrc, ready: v.readyState, dauer: v.duration }));
    if (!(video.dauer > 80)) throw new Error(`Vorspann-Video lädt nicht: ${JSON.stringify(video)}`);
    await shot('intro-video');
    await page.click('#weiter');
  } else {
    await page.click('#skip');
  }
  await page.waitForSelector('.intro-onboarding', { timeout: 10000 });
  await page.fill('#name', 'Testspieler');
  await shot('intro-onboarding');
  await page.click('#los');
  await page.waitForSelector('.szene-seite', { timeout: 10000 });
  const name = await page.evaluate(() => JSON.parse(localStorage.getItem('webwerkstatt2.spielstand.v1')).name);
  if (name !== 'Testspieler') throw new Error(`Onboarding: Name nicht gespeichert (${name})`);

  // Startseite (Vorspann als gesehen markieren)
  await page.evaluate(() => {
    const k = 'webwerkstatt2.spielstand.v1';
    const s = JSON.parse(localStorage.getItem(k) || '{}');
    s.intro = { seen: true, video: false };
    localStorage.setItem(k, JSON.stringify(s));
  });
  await page.reload();
  await geh('#/');
  await shot('turnierplan');
  const heroText = await page.$eval('.naechster-schritt', (el) => el.innerText);
  if (!/Anpfiff/.test(heroText)) throw new Error(`Startseite: nächster Schritt sollte der Anpfiff sein, ist: ${heroText}`);

  // Runde 1: Ablauf mit Zwischenspielen
  await geh(`#/kapitel/${KAP}`);
  await shot('runde-1');
  const ablauf = await page.$$eval('.ablauf-eintrag', (els) => els.map((e) => e.innerText.replace(/\s+/g, ' ')));
  if (!ablauf.some((t) => /Anpfiff/.test(t)) || !ablauf.some((t) => /Crew-Funk/.test(t)) || !ablauf.some((t) => /Abpfiff/.test(t))) throw new Error(`Ablauf unvollständig: ${ablauf.join(' | ')}`);

  // Anpfiff durchspielen
  await geh(`#/szene/${KAP}/anpfiff`, '.szene-seite');
  for (let i = 0; i < 12; i++) {
    const aufgabe = await page.$('.szene-aufgabe');
    if (aufgabe) break;
    await page.click('#weiter');
    await page.waitForTimeout(150);
  }
  await shot('anpfiff-dialog');
  const karte = await page.$('.szene-aufgabe');
  if (!karte) throw new Error('Anpfiff: Aufgabe erscheint nicht');
  await loeseSchritt(page, szenen.runden[KAP].anpfiff.aufgabe, karte);
  await page.waitForSelector('.szene-aufgabe .rueckmeldung-ok', { timeout: 5000 });
  await shot('anpfiff-geloest');
  await page.click('.szene-aufgabe .schritt-buttons .btn-primaer');
  for (let i = 0; i < 8; i++) {
    if (await page.$('.szene-ende')) break;
    await page.click('#weiter');
    await page.waitForTimeout(150);
  }
  await page.waitForSelector('.szene-ende', { timeout: 5000 });
  await shot('anpfiff-ende');
  const xp = await page.evaluate(() => JSON.parse(localStorage.getItem('webwerkstatt2.spielstand.v1')).xp);
  if (xp < 20) throw new Error(`Anpfiff: XP nicht vergeben (xp=${xp})`);

  // Lektion: Nachlesen-Knopf und Aufgaben-Leiste
  await geh(`#/lektion/${KAP}/01-was-passiert-beim-seitenaufruf`, '.lektion-seite');
  await shot('lektion-schritt-1');
  // bis zur ersten Aufgabe blättern
  for (let i = 0; i < 6; i++) {
    const art = await page.$eval('.schritt:not([hidden])', (el) => el.className);
    if (!/schritt-explain|schritt-example|schritt-soundcheck/.test(art)) break;
    await page.click('.pager-weiter');
    await page.waitForTimeout(200);
  }
  await page.click('#nachlesen');
  await page.waitForSelector('.nachschlagen.an', { timeout: 5000 });
  await page.waitForTimeout(400);
  const nsText = await page.$eval('.nachschlagen', (el) => el.innerText);
  if (!/Diese Lektion/.test(nsText)) throw new Error('Nachschlagen: Tab „Diese Lektion“ fehlt');
  if (/Musterlösung|solution/.test(nsText)) throw new Error('Nachschlagen zeigt eine Lösung!');
  await shot('lektion-nachlesen');
  await page.click('.nachschlagen [data-tab="spickzettel"]');
  await page.waitForTimeout(300);
  await shot('lektion-spickzettel');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Spickzettel-Seite
  await geh('#/spickzettel', '.spickzettel-seite');
  await shot('spickzettel');

  // Gewonnene Runde simulieren → Spielerkarte mit Trophäenkarte, Abpfiff
  await page.evaluate((kap) => {
    const k = 'webwerkstatt2.spielstand.v1';
    const s = JSON.parse(localStorage.getItem(k));
    s.boss[kap] = { best: 0.9, passed: true, versuche: 1, at: Date.now() };
    s.story.karten[kap] = Date.now();
    localStorage.setItem(k, JSON.stringify(s));
  }, KAP);
  await page.reload();
  await geh('#/keycard');
  await page.click('.trophaeenkarte.gewonnen');
  await page.waitForTimeout(900);
  await shot('spielerkarte');
  await geh(`#/szene/${KAP}/abpfiff`, '.szene-seite');
  for (let i = 0; i < 12; i++) {
    if (await page.$('.szene-aufgabe')) break;
    await page.click('#weiter');
    await page.waitForTimeout(150);
  }
  const karte2 = await page.$('.szene-aufgabe');
  await loeseSchritt(page, szenen.runden[KAP].abpfiff.aufgabe, karte2);
  await page.waitForSelector('.szene-aufgabe .rueckmeldung-ok', { timeout: 5000 });
  await page.click('.szene-aufgabe .schritt-buttons .btn-primaer');
  for (let i = 0; i < 8; i++) {
    if (await page.$('.szene-ende')) break;
    await page.click('#weiter');
    await page.waitForTimeout(150);
  }
  await page.waitForSelector('.szene-ende .trophaeenkarte', { timeout: 5000 });
  await page.waitForTimeout(2200);
  await shot('abpfiff-trophaee');

  // Runde 2 jetzt frei: Turnierplan mit Emblemen
  await geh('#/');
  await shot('turnierplan-nach-runde-1');
  await geh('#/kapitel/02-html-erste-schritte');
  await shot('runde-2');

  // Trainingslager und Projekt kurz anfassen
  await geh('#/backstage');
  await geh('#/projekt');

  // Mobil
  await page.setViewportSize({ width: 390, height: 844 });
  await geh('#/');
  await shot('mobil-turnierplan');
  await geh(`#/kapitel/${KAP}`);
  await shot('mobil-runde');
  await geh(`#/szene/${KAP}/funk`, '.szene-seite');
  await page.click('#weiter');
  await page.click('#weiter');
  await shot('mobil-szene');
} catch (e) {
  fehler.push(`TEST: ${e.message}`);
}

await browser.close();
preview.stop();
if (fehler.length) {
  exit = 1;
  console.log('Rauchtest FEHLGESCHLAGEN:');
  fehler.forEach((f) => console.log('  ' + f));
} else {
  console.log('Rauchtest bestanden – keine Seitenfehler.');
}
process.exit(exit);
