// Schema- und Konsistenzprüfung der Lektionsinhalte (ohne Browser).
// Aufruf: node scripts/validiere-inhalte.mjs [kapitel-id]   (ohne Argument: alle)

import fs from 'node:fs';
import path from 'node:path';

const WURZEL = path.join(import.meta.dirname, '..', 'public', 'content');
const STEP_TYPEN = ['explain', 'example', 'quiz', 'fill', 'code'];
const TEST_TYPEN = ['selector', 'text', 'attr', 'style', 'console', 'source', 'action'];
const DATEI_KEYS = ['html', 'css', 'js'];

let fehler = 0;
let warnungen = 0;
const melde = (art, wo, text) => {
  if (art === 'FEHLER') fehler++;
  else warnungen++;
  console.log(`${art}  ${wo}: ${text}`);
};

function pruefeCodeStep(step, wo) {
  if (!step.task) melde('FEHLER', wo, 'code ohne task');
  if (!step.starter || typeof step.starter !== 'object') {
    melde('FEHLER', wo, 'code ohne starter');
    return;
  }
  const starterKeys = Object.keys(step.starter);
  if (!starterKeys.length || starterKeys.some((k) => !DATEI_KEYS.includes(k))) {
    melde('FEHLER', wo, `starter-Keys müssen aus ${DATEI_KEYS} sein (gefunden: ${starterKeys})`);
  }
  const editable = step.editable || starterKeys;
  if (editable.some((k) => !starterKeys.includes(k))) {
    melde('FEHLER', wo, `editable enthält Datei ohne starter: ${editable}`);
  }
  if (!Array.isArray(step.hints) || step.hints.length < 2) {
    melde('FEHLER', wo, 'code braucht mindestens 2 hints (letzter = Komplettlösung)');
  }
  if (!step.solution || typeof step.solution !== 'object') {
    melde('FEHLER', wo, 'code ohne solution-Objekt (Pflicht für die interne Prüfung)');
  } else {
    for (const k of Object.keys(step.solution)) {
      if (!DATEI_KEYS.includes(k)) melde('FEHLER', wo, `solution-Key ungültig: ${k}`);
    }
    for (const k of editable) {
      if (step.solution[k] == null) melde('FEHLER', wo, `solution fehlt für editierbare Datei "${k}"`);
    }
  }
  if (step.project) {
    if (!Array.isArray(step.project.save)) melde('FEHLER', wo, 'project ohne save-Liste');
    if (step.project.save?.includes('html') && !step.project.page) {
      melde('FEHLER', wo, 'project speichert html, aber page fehlt');
    }
  }
  if (!Array.isArray(step.tests) || !step.tests.length) {
    melde('FEHLER', wo, 'code ohne tests');
    return;
  }
  step.tests.forEach((t, i) => {
    const tWo = `${wo} test[${i}]`;
    if (!TEST_TYPEN.includes(t.type)) return melde('FEHLER', tWo, `unbekannter Testtyp ${t.type}`);
    if (t.type !== 'action' && !t.label) melde('FEHLER', tWo, 'Test ohne label');
    if (t.type === 'style') {
      if (t.prop === 'gap') melde('FEHLER', tWo, 'style-Test auf "gap" → column-gap/row-gap verwenden');
      if (t.prop === 'text-decoration') melde('FEHLER', tWo, '"text-decoration" → text-decoration-line verwenden');
      if (t.prop === 'font-weight' && !Array.isArray(t.expected)) {
        melde('WARNUNG', tWo, 'font-weight besser als ["700","bold"] prüfen');
      }
      if (!t.prop || t.expected == null) melde('FEHLER', tWo, 'style-Test braucht prop und expected');
    }
    if (t.type === 'source' && !t.matches) melde('FEHLER', tWo, 'source-Test ohne matches');
    if (t.type === 'source' && t.matches) {
      try { new RegExp(t.matches); } catch { melde('FEHLER', tWo, `ungültige Regex: ${t.matches}`); }
    }
    if (t.type === 'attr' && t.matches) {
      try { new RegExp(t.matches); } catch { melde('FEHLER', tWo, `ungültige Regex: ${t.matches}`); }
    }
  });
}

function pruefeLektion(chId, lessonId) {
  const pfad = path.join(WURZEL, 'chapters', chId, 'lessons', `${lessonId}.json`);
  const wo = `${chId}/${lessonId}`;
  if (!fs.existsSync(pfad)) return melde('FEHLER', wo, 'Lektionsdatei fehlt');
  let lektion;
  try {
    lektion = JSON.parse(fs.readFileSync(pfad, 'utf8'));
  } catch (e) {
    return melde('FEHLER', wo, `kein valides JSON: ${e.message}`);
  }
  if (lektion.id !== lessonId) melde('FEHLER', wo, `id "${lektion.id}" ≠ Dateiname`);
  if (!lektion.title) melde('FEHLER', wo, 'title fehlt');
  if (!Array.isArray(lektion.steps) || !lektion.steps.length) return melde('FEHLER', wo, 'keine steps');

  lektion.steps.forEach((step, i) => {
    const sWo = `${wo} step[${i}]`;
    if (!STEP_TYPEN.includes(step.type)) return melde('FEHLER', sWo, `unbekannter Typ ${step.type}`);
    if (step.type === 'explain' && !step.text) melde('FEHLER', sWo, 'explain ohne text');
    if (step.type === 'example' && !DATEI_KEYS.some((k) => step[k] != null)) {
      melde('FEHLER', sWo, 'example ohne html/css/js');
    }
    if (step.type === 'quiz') {
      if (!step.question || !Array.isArray(step.options) || step.options.length < 2) {
        melde('FEHLER', sWo, 'quiz braucht question und mindestens 2 options');
      } else if (typeof step.correct !== 'number' || step.correct < 0 || step.correct >= step.options.length) {
        melde('FEHLER', sWo, 'quiz: correct außerhalb der options');
      }
      if (!step.explanation) melde('WARNUNG', sWo, 'quiz ohne explanation');
    }
    if (step.type === 'fill') {
      if (!step.template || !step.template.includes('___')) melde('FEHLER', sWo, 'fill: template ohne ___');
      if (!Array.isArray(step.accept) || !step.accept.length) melde('FEHLER', sWo, 'fill: accept fehlt');
    }
    if (step.type === 'code') pruefeCodeStep(step, sWo);
  });

  const codeAnzahl = lektion.steps.filter((s) => s.type === 'code').length;
  if (!codeAnzahl && !lessonId.includes('wiederholung') && !chId.startsWith('01-')) {
    melde('WARNUNG', wo, 'Lektion ohne Code-Aufgabe');
  }
}

const curriculum = JSON.parse(fs.readFileSync(path.join(WURZEL, 'curriculum.json'), 'utf8'));
const alleKapitel = curriculum.blocks.flatMap((b) => b.chapters);
const ziel = process.argv[2] ? [process.argv[2]] : alleKapitel;

let lektionen = 0;
for (const chId of ziel) {
  const chPfad = path.join(WURZEL, 'chapters', chId, 'chapter.json');
  if (!fs.existsSync(chPfad)) {
    melde('FEHLER', chId, 'chapter.json fehlt');
    continue;
  }
  const kapitel = JSON.parse(fs.readFileSync(chPfad, 'utf8'));
  if (kapitel.id !== chId) melde('FEHLER', chId, `chapter-id ≠ Ordnername`);
  for (const l of kapitel.lessons) {
    pruefeLektion(chId, l);
    lektionen++;
  }
  // verwaiste Dateien, die nicht (mehr) in chapter.json stehen
  const ordner = path.join(WURZEL, 'chapters', chId, 'lessons');
  if (fs.existsSync(ordner)) {
    for (const f of fs.readdirSync(ordner)) {
      const id = f.replace(/\.json$/, '');
      if (!kapitel.lessons.includes(id)) melde('WARNUNG', `${chId}/${f}`, 'Datei nicht in chapter.json (löschen?)');
    }
  }
}

console.log(`\n${ziel.length} Kapitel, ${lektionen} Lektionen geprüft — ${fehler} Fehler, ${warnungen} Warnungen`);
process.exit(fehler ? 1 : 0);
