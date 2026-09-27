// Spielt eine Lektion im Browser komplett durch (richtige Antworten aus der JSON,
// Code-Aufgaben mit der Musterlösung) und prüft Abschluss, XP und Sterne.
// Aufruf: node scripts/e2e-lektion.mjs <kapitel-id> <lektion-id> [--shots]
// Voraussetzung: npm run build

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { chromium } from 'playwright';

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

async function loeseSchritt(step, karte) {
  const md = (s) => String(s).replace(/`/g, '').replace(/\*\*/g, '').trim();
  switch (step.type) {
    case 'quiz': {
      const soll = md(step.options[step.correct]);
      const btns = await karte.$$('.quiz-option');
      for (const b of btns) {
        const t = (await b.innerText()).replace(/^[A-D]\s*/, '').trim();
        if (t === soll) {
          await b.click();
          return;
        }
      }
      throw new Error(`Quiz-Option nicht gefunden: ${soll}`);
    }
    case 'fill': {
      const inputs = await karte.$$('.fill-input');
      const accept = Array.isArray(step.accept[0]) ? step.accept : [step.accept];
      for (let i = 0; i < inputs.length; i++) await inputs[i].fill(accept[i][0]);
      await karte.$eval('.btn-primaer', (b) => b.click());
      return;
    }
    case 'order': {
      for (const zeile of step.lines) {
        const btns = await karte.$$('.sortier-pool .sortier-zeile');
        let ok = false;
        for (const b of btns) {
          const t = (await b.innerText()).replace(/^\+\s*/, '').trim();
          if (t === zeile.trim()) {
            await b.click();
            ok = true;
            break;
          }
        }
        if (!ok) throw new Error(`Sortier-Zeile nicht gefunden: ${zeile}`);
      }
      await karte.$eval('.schritt-buttons .btn-primaer', (b) => b.click());
      return;
    }
    case 'pair': {
      for (let i = 0; i < step.pairs.length; i++) {
        await (await karte.$(`.paar-links .paar-item[data-i="${i}"]`)).click();
        const rechts = await karte.$$('.paar-rechts .paar-item');
        const soll = md(step.pairs[i][1]);
        let ok = false;
        for (const r of rechts) {
          if ((await r.innerText()).trim() === soll) {
            await r.click();
            ok = true;
            break;
          }
        }
        if (!ok) throw new Error(`Paar nicht gefunden: ${soll}`);
      }
      return;
    }
    case 'bug': {
      const zeilen = await karte.$$('.bug-zeile');
      await zeilen[step.line].click();
      return;
    }
    case 'code': {
      let st = step;
      if (step.etappe) {
        const e = etappen.find((x) => x.id === step.etappe);
        st = { ...step, solution: e.solution ?? e.files, editable: e.editable };
        // Lösung = Zustand nach der Etappe (files), nur editierbare Dateien
        st.solution = Object.fromEntries(e.editable.map((k) => [k, e.files[k]]));
      }
      const editable = st.editable || Object.keys(st.solution);
      for (const k of editable) {
        await karte.$eval(`.editor-wrap[data-datei="${k}"]`, (wrap, text) => {
          const v = wrap.cmView;
          v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: text } });
        }, st.solution[k]);
      }
      await page.waitForTimeout(300);
      await karte.$eval('.schritt-buttons .btn-primaer', (b) => b.click());
      await page.waitForSelector('.schritt:not([hidden]) .rueckmeldung-ok', { timeout: 15000 });
      return;
    }
    default:
      return;
  }
}

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
    await loeseSchritt(step, karte);
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
