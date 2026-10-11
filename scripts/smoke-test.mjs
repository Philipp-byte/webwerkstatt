// Rauchtest der App im Browser: Vorspann (Lesefassung oder Video) → Onboarding → Quellgrund,
// Lektion mit Gespinst-Spott und Nachlesen, Hinterhalt, Duell, Karte mit befreitem Ort,
// Ich, Spickzettel, Website, Handy. Meldet jeden Seitenfehler. Mit --shots entstehen
// Screenshots unter /tmp/ww-shots (oder --dir <ordner>).
// Aufruf: npm run build && node scripts/smoke-test.mjs [--shots] [--dir <ordner>]

import { spawn } from 'node:child_process';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

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
const geh = async (hash, warten = '#app .karte, #app .schritt, #app .hyperia-seite, #app .intro, #app .spickzettel-seite, #app .lektion-seite') => {
  await page.goto(preview.base + hash);
  await page.waitForSelector(warten, { timeout: 15000 });
  await page.waitForTimeout(400);
};
const KEY = 'webwerkstatt2.spielstand.v1';
const KAP = '01-wie-das-web-funktioniert';
const KAP2 = '02-html-erste-schritte';
const lektion = JSON.parse(fs.readFileSync(`public/content/chapters/${KAP}/lessons/01-was-passiert-beim-seitenaufruf.json`, 'utf8'));
const kapitel1 = JSON.parse(fs.readFileSync(`public/content/chapters/${KAP}/chapter.json`, 'utf8'));
let exit = 0;
try {
  // Erster Besuch: Vorspann (ohne Video die Lesefassung) → Onboarding → Quellgrund
  await page.goto(preview.base);
  await page.waitForSelector('.intro', { timeout: 15000 });
  await page.waitForTimeout(600);
  await shot('intro');
  if (await page.$('video#film')) {
    // Video vorhanden: beim ersten Start kein Überspringen – wir nehmen die Lesefassung
    await page.click('#lesen');
  }
  await page.waitForSelector('.intro-lesen', { timeout: 10000 });
  for (let i = 0; i < 6; i++) {
    await page.click('#weiter');
    await page.waitForTimeout(150);
  }
  await page.waitForSelector('.intro-onboarding', { timeout: 10000 });
  await page.fill('#name', 'Testlehrling');
  await page.waitForTimeout(500);
  await shot('onboarding');
  await page.click('#los');
  await page.waitForSelector('.ort-seite', { timeout: 10000 });
  await page.waitForTimeout(600);
  const st = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)), KEY);
  if (st.name !== 'Testlehrling') throw new Error(`Onboarding: Name nicht gespeichert (${st.name})`);
  if (!st.intro.komplett) throw new Error('Vorspann nicht als komplett gesehen markiert');

  // Quellgrund: Einleitung mit drei Blasen
  const blasen = await page.$$('.einleitung .figur-blase');
  if (blasen.length < 3) throw new Error(`Einleitung: ${blasen.length} Blasen statt 3`);
  await shot('ort-1-einleitung');
  await page.click('#los');
  await page.waitForSelector('.lektion-seite', { timeout: 10000 });
  await shot('lektion-schritt-1');

  // Lektion: zur ersten Quizfrage blättern, falsch antworten → Gespinst spottet, dann Nachlesen
  const quizIndex = lektion.steps.findIndex((s) => s.type === 'quiz');
  for (let i = 0; i < 12; i++) {
    const art = await page.$eval('.schritt:not([hidden])', (el) => el.className);
    if (/schritt-quiz/.test(art)) break;
    const btn = await page.$('.pager-weiter:not([disabled])');
    if (!btn) break;
    await btn.click();
    await page.waitForTimeout(200);
  }
  if (quizIndex >= 0) {
    const step = lektion.steps[quizIndex];
    const soll = String(step.options[step.correct]).replace(/[`*]/g, '').trim();
    for (const b of await page.$$('.schritt:not([hidden]) .quiz-option')) {
      const t = (await b.innerText()).replace(/^[A-D]\s*/, '').trim();
      if (t !== soll) {
        await b.click();
        break;
      }
    }
    await page.waitForSelector('.schritt:not([hidden]) .figur-blase-spott', { timeout: 5000 });
    await page.waitForTimeout(500);
    await shot('lektion-gespinst-spottet');
    for (const b of await page.$$('.schritt:not([hidden]) .quiz-option:not([disabled])')) {
      const t = (await b.innerText()).replace(/^[A-D]\s*/, '').trim();
      if (t === soll) {
        await b.click();
        break;
      }
    }
    await page.waitForSelector('.schritt:not([hidden]) .figur-blase-lob', { timeout: 5000 });
    await page.waitForTimeout(500);
    await shot('lektion-lob');
  }
  await page.click('#nachlesen');
  await page.waitForSelector('.nachschlagen.an', { timeout: 5000 });
  await page.waitForTimeout(400);
  const nsText = await page.$eval('.nachschlagen', (el) => el.innerText);
  if (!/Diese Lektion/.test(nsText)) throw new Error('Nachschlagen: Tab „Diese Lektion“ fehlt');
  if (/Musterlösung|solution/.test(nsText)) throw new Error('Nachschlagen zeigt eine Lösung!');
  await shot('lektion-nachlesen');
  await page.keyboard.press('Escape');

  // Lektionen von Ort 1 als erledigt eintragen → Hinterhalt, Sturm, Duell
  await page.evaluate(([k, kap, lessons]) => {
    const s = JSON.parse(localStorage.getItem(k));
    lessons.forEach((l) => { s.lessons[`${kap}/${l}`] = { done: true, stars: 3, completedAt: Date.now(), lastAt: Date.now(), versuche: 1, fehler: 0, tipps: 0 }; });
    s.leitner = { 'web.browser': { box: 1, due: 0, seen: 0, ok: 0 }, 'web.url': { box: 1, due: 0, seen: 0, ok: 0 }, 'web.server': { box: 1, due: 0, seen: 0, ok: 0 } };
    s.lessonCounter = lessons.length;
    localStorage.setItem(k, JSON.stringify(s));
  }, [KEY, KAP, kapitel1.lessons]);
  await page.reload();
  await geh(`#/ort/${KAP}`, '.ort-seite');
  const weg = await page.$$eval('.weg-eintrag', (els) => els.map((e) => e.className));
  if (!weg.some((c) => /hinterhalt/.test(c)) || !weg.some((c) => /duell/.test(c))) throw new Error(`Weg unvollständig: ${weg.join(' | ')}`);
  await shot('ort-1-weg');
  await geh(`#/hinterhalt/${KAP}/knotenjagd/h1`, '.hinterhalt-seite');
  await page.click('#los');
  await page.waitForSelector('.hinterhalt-karte', { timeout: 10000 });
  await page.waitForTimeout(300);
  await shot('hinterhalt-knotenjagd');
  await geh(`#/hinterhalt/${KAP}/wahr-oder-luege/sturm`, '.hinterhalt-seite');
  await page.click('#los');
  await page.waitForSelector('.wahr-aussage', { timeout: 10000 });
  await page.click('.wahr-knoepfe button');
  await page.waitForTimeout(500);
  await shot('hinterhalt-wahr-oder-luege');
  // Runde zu Ende spielen (immer „Wahr“), bis die Ergebniskarte kommt
  for (let i = 0; i < 20; i++) {
    if (await page.$('.spiel-ergebnis')) break;
    const b = await page.$('.wahr-knoepfe button:not([disabled])');
    if (b) await b.click();
    await page.waitForTimeout(1000);
  }
  await page.waitForSelector('.spiel-ergebnis', { timeout: 15000 });
  await page.waitForTimeout(400);
  await shot('hinterhalt-ergebnis');
  const sturm = await page.evaluate(([k, kap]) => JSON.parse(localStorage.getItem(k)).hinterhalte.knoten[`${kap}/sturm`], [KEY, KAP]);
  if (!sturm) throw new Error('Hinterhalt: Sturm nicht gespeichert');

  // Duell
  await geh(`#/duell/${KAP}`, '.duell-seite');
  await shot('duell-intro');
  await page.click('#start');
  await page.waitForSelector('.duell-seite .schritt', { timeout: 10000 });
  await page.waitForTimeout(300);
  await shot('duell-aufgabe');

  // Ort 1 als befreit eintragen → Karte, Ort befreit, Ort 2 frei
  await page.evaluate(([k, kap]) => {
    const s = JSON.parse(localStorage.getItem(k));
    s.boss[kap] = { best: 0.9, passed: true, versuche: 1, ersterVersuch: true, at: Date.now() };
    localStorage.setItem(k, JSON.stringify(s));
  }, [KEY, KAP]);
  await page.reload();
  await geh('#/', '.hyperia-seite');
  const frei = await page.$$('.hyperia-karte .ort-frei');
  if (frei.length !== 1) throw new Error(`Karte: ${frei.length} befreite Orte statt 1`);
  await shot('hyperia-karte');
  await geh(`#/ort/${KAP}`, '.ort-seite');
  if (!(await page.$('.ort-befreit'))) throw new Error('Ort 1: Befreit-Karte fehlt');
  await shot('ort-1-befreit');
  await geh(`#/ort/${KAP2}`, '.ort-seite');
  await shot('ort-2');
  await page.click('#nachlesen').catch(() => {});

  // Ich, Spickzettel, Website, Lehrkraft, Bericht
  await geh('#/ich', '.ich-seite');
  await shot('ich');
  await geh('#/spickzettel', '.spickzettel-seite');
  await geh('#/projekt');
  await geh('#/lehrkraft');
  await geh('#/bericht');

  // Handy
  await page.setViewportSize({ width: 390, height: 844 });
  await geh('#/', '.hyperia-seite');
  await shot('mobil-hyperia');
  await geh(`#/ort/${KAP2}`, '.ort-seite');
  await shot('mobil-ort');
  await geh(`#/lektion/${KAP2}/${JSON.parse(fs.readFileSync(`public/content/chapters/${KAP2}/chapter.json`, 'utf8')).lessons[0]}`, '.lektion-seite');
  await shot('mobil-lektion');
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
