// Schema- und Konsistenzprüfung aller Inhalte (ohne Browser).
// Aufruf: node scripts/validiere-inhalte.mjs [kapitel-id]   (ohne Argument: alle)

import fs from 'node:fs';
import path from 'node:path';

const WURZEL = path.join(import.meta.dirname, '..', 'public', 'content');
const STEP_TYPEN = ['explain', 'example', 'quiz', 'fill', 'order', 'pair', 'bug', 'code'];
const POOL_TYPEN = ['quiz', 'fill', 'order', 'pair', 'bug'];
const TEST_TYPEN = ['selector', 'text', 'attr', 'style', 'console', 'source', 'order', 'action'];
const DATEI_KEYS = ['html', 'css', 'js'];
const SPRECHER = ['ayla', 'jonas', 'robby', 'sam'];

let fehler = 0;
let warnungen = 0;
const melde = (art, wo, text) => {
  if (art === 'FEHLER') fehler++;
  else warnungen++;
  console.log(`${art}  ${wo}: ${text}`);
};
const lade = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const woerter = (t) => String(t || '').replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;

const konzepte = new Set(lade(path.join(WURZEL, 'konzepte.json')).map((k) => k.id));
const etappen = lade(path.join(WURZEL, 'projekt', 'etappen.json')).etappen;
const etappenIds = new Set(etappen.map((e) => e.id));

function pruefeTests(tests, wo) {
  if (!Array.isArray(tests) || !tests.length) return melde('FEHLER', wo, 'keine tests');
  tests.forEach((t, i) => {
    const tWo = `${wo} test[${i}]`;
    if (!TEST_TYPEN.includes(t.type)) return melde('FEHLER', tWo, `unbekannter Testtyp ${t.type}`);
    if (t.type !== 'action' && !t.label) melde('FEHLER', tWo, 'Test ohne label');
    if (t.type === 'style') {
      if (t.prop === 'gap') melde('FEHLER', tWo, 'style-Test auf "gap" → column-gap/row-gap verwenden');
      if (t.prop === 'text-decoration') melde('FEHLER', tWo, '"text-decoration" → text-decoration-line verwenden');
      if (t.prop === 'font-weight' && !Array.isArray(t.expected)) melde('WARNUNG', tWo, 'font-weight besser als ["700","bold"] prüfen');
      if (!t.prop || t.expected == null) melde('FEHLER', tWo, 'style-Test braucht prop und expected');
    }
    for (const feld of ['matches']) {
      if (t[feld]) {
        try { new RegExp(t[feld]); } catch { melde('FEHLER', tWo, `ungültige Regex: ${t[feld]}`); }
      }
    }
    if (t.type === 'source' && !t.matches) melde('FEHLER', tWo, 'source-Test ohne matches');
    if (t.type === 'order' && (!Array.isArray(t.selectors) || t.selectors.length < 2)) melde('FEHLER', tWo, 'order-Test braucht selectors');
  });
}

function pruefeLoesungsLeck(step, wo) {
  if (!step.task || !step.solution) return;
  const loesungsText = Object.values(step.solution).join(' ').replace(/\s+/g, ' ');
  const spans = [...String(step.task).matchAll(/`([^`]+)`/g)].map((m) => m[1].trim());
  for (const span of spans) {
    const kompakt = span.replace(/\s+/g, ' ');
    const istDeklaration = /^[a-z-]+\s*:\s*[^;]+;?$/i.test(kompakt);
    const istTagMitAttribut = /^<[a-z][a-z0-9]*\s+[a-z-]+=/i.test(kompakt);
    const istJsAnweisung = /\.(getElementById|addEventListener|textContent|classList)|console\.log\(/.test(kompakt);
    if ((istDeklaration || istTagMitAttribut || istJsAnweisung || kompakt.length >= 14) && loesungsText.includes(kompakt)) {
      melde('FEHLER', wo, `Aufgabe verrät die Lösung: „${span}“ steht wörtlich in solution – Ziel beschreiben, nicht den Code`);
    }
  }
  const ohneSpans = String(step.task).replace(/`[^`]*`/g, '');
  if (/[a-z-]+\s*:\s*[^;`\r\n]+;/i.test(ohneSpans)) melde('FEHLER', wo, 'Aufgabe enthält eine CSS-Deklaration im Klartext');
  // Tipps dürfen keine Komplettlösung sein: kein Tipp darf eine editierbare Lösungsdatei komplett enthalten
  for (const [i, h] of (step.hints || []).entries()) {
    for (const [k, v] of Object.entries(step.solution)) {
      const kern = String(v).replace(/\s+/g, ' ').trim();
      if (kern.length > 20 && String(h).replace(/\s+/g, ' ').includes(kern)) melde('FEHLER', `${wo} hint[${i}]`, `Tipp enthält die komplette Lösung (${k})`);
    }
  }
}

function pruefeCodeStep(step, wo, { hintsPflicht = true } = {}) {
  if (step.etappe) {
    if (!etappenIds.has(step.etappe)) melde('FEHLER', wo, `unbekannte Etappe ${step.etappe}`);
    const extra = Object.keys(step).filter((k) => !['type', 'etappe'].includes(k));
    if (extra.length) melde('WARNUNG', wo, `Etappen-Schritt hat überflüssige Felder: ${extra.join(', ')} (werden ignoriert)`);
    return;
  }
  if (!step.task) melde('FEHLER', wo, 'code ohne task');
  if (woerter(step.task) > 60) melde('WARNUNG', wo, `task hat ${woerter(step.task)} Wörter (Regel: max. 50)`);
  if (!step.starter || typeof step.starter !== 'object') return melde('FEHLER', wo, 'code ohne starter');
  const starterKeys = Object.keys(step.starter);
  if (!starterKeys.length || starterKeys.some((k) => !DATEI_KEYS.includes(k))) melde('FEHLER', wo, `starter-Keys müssen aus ${DATEI_KEYS} sein (gefunden: ${starterKeys})`);
  const editable = step.editable || starterKeys;
  if (editable.some((k) => !starterKeys.includes(k))) melde('FEHLER', wo, `editable enthält Datei ohne starter: ${editable}`);
  if (hintsPflicht) {
    if (!Array.isArray(step.hints) || step.hints.length < 2 || step.hints.length > 3) melde('FEHLER', wo, 'code braucht 2–3 hints (ohne Komplettlösung)');
  }
  if (!step.solution || typeof step.solution !== 'object') melde('FEHLER', wo, 'code ohne solution');
  else {
    for (const k of Object.keys(step.solution)) if (!DATEI_KEYS.includes(k)) melde('FEHLER', wo, `solution-Key ungültig: ${k}`);
    for (const k of editable) if (step.solution[k] == null) melde('FEHLER', wo, `solution fehlt für editierbare Datei "${k}"`);
    for (const k of editable) if (step.solution[k] != null && step.starter[k] != null && step.solution[k].trim() === step.starter[k].trim()) melde('FEHLER', wo, `solution und starter sind identisch (${k}) – Gegenprobe kann nicht klappen`);
  }
  if (step.mode && step.mode !== 'fix') melde('FEHLER', wo, `unbekannter mode ${step.mode}`);
  pruefeLoesungsLeck(step, wo);
  pruefeTests(step.tests, wo);
}

function pruefeFrage(f, wo, { konzeptPflicht = true } = {}) {
  if (!STEP_TYPEN.includes(f.type)) return melde('FEHLER', wo, `unbekannter Typ ${f.type}`);
  if (konzeptPflicht && f.konzept && !konzepte.has(f.konzept)) melde('FEHLER', wo, `unbekanntes Konzept ${f.konzept}`);
  if (f.type === 'quiz') {
    if (!f.question || !Array.isArray(f.options) || f.options.length < 2 || f.options.length > 4) melde('FEHLER', wo, 'quiz braucht question und 2–4 options');
    else if (typeof f.correct !== 'number' || f.correct < 0 || f.correct >= f.options.length) melde('FEHLER', wo, 'quiz: correct außerhalb der options');
    if (!f.explanation) melde('WARNUNG', wo, 'quiz ohne explanation');
    (f.options || []).forEach((o, i) => woerter(o) > 14 && melde('WARNUNG', `${wo} option[${i}]`, 'Option länger als 12 Wörter'));
  }
  if (f.type === 'fill') {
    const luecken = (String(f.template || '').match(/___/g) || []).length;
    if (!luecken) melde('FEHLER', wo, 'fill: template ohne ___');
    if (!Array.isArray(f.accept) || !f.accept.length) melde('FEHLER', wo, 'fill: accept fehlt');
    else if (luecken > 1 && !(Array.isArray(f.accept[0]) && f.accept.length === luecken)) melde('FEHLER', wo, `fill: ${luecken} Lücken brauchen accept als Liste von ${luecken} Listen`);
  }
  if (f.type === 'order') {
    if (!Array.isArray(f.lines) || f.lines.length < 3) melde('FEHLER', wo, 'order braucht mindestens 3 lines');
    else if (new Set(f.lines.map((l) => l.trim())).size !== f.lines.length) melde('FEHLER', wo, 'order: doppelte Zeilen');
  }
  if (f.type === 'pair') {
    if (!Array.isArray(f.pairs) || f.pairs.length < 3 || f.pairs.some((p) => !Array.isArray(p) || p.length !== 2)) melde('FEHLER', wo, 'pair braucht mindestens 3 Paare [links, rechts]');
    else if (new Set(f.pairs.map((p) => p[1].trim())).size !== f.pairs.length) melde('FEHLER', wo, 'pair: doppelte rechte Seiten');
  }
  if (f.type === 'bug') {
    if (!Array.isArray(f.lines) || f.lines.length < 3) melde('FEHLER', wo, 'bug braucht mindestens 3 lines');
    else if (typeof f.line !== 'number' || f.line < 0 || f.line >= f.lines.length) melde('FEHLER', wo, 'bug: line außerhalb der lines');
    if (!f.explanation) melde('WARNUNG', wo, 'bug ohne explanation');
  }
}

function pruefeLektion(chId, lessonId) {
  const pfad = path.join(WURZEL, 'chapters', chId, 'lessons', `${lessonId}.json`);
  const wo = `${chId}/${lessonId}`;
  if (!fs.existsSync(pfad)) return melde('FEHLER', wo, 'Lektionsdatei fehlt');
  let lektion;
  try {
    lektion = lade(pfad);
  } catch (e) {
    return melde('FEHLER', wo, `kein valides JSON: ${e.message}`);
  }
  if (lektion.id !== lessonId) melde('FEHLER', wo, `id "${lektion.id}" ≠ Dateiname`);
  if (!lektion.title) melde('FEHLER', wo, 'title fehlt');
  if (!Array.isArray(lektion.konzepte)) melde('FEHLER', wo, 'konzepte-Array fehlt (leer erlaubt)');
  else for (const k of lektion.konzepte) if (!konzepte.has(k)) melde('FEHLER', wo, `unbekanntes Konzept ${k}`);
  if (!Array.isArray(lektion.steps) || !lektion.steps.length) return melde('FEHLER', wo, 'keine steps');

  let vorherTyp = null;
  lektion.steps.forEach((step, i) => {
    const sWo = `${wo} step[${i}]`;
    if (!STEP_TYPEN.includes(step.type)) return melde('FEHLER', sWo, `unbekannter Typ ${step.type}`);
    if (step.type === 'explain') {
      if (!step.text) melde('FEHLER', sWo, 'explain ohne text');
      if (woerter(step.text) > 90) melde('WARNUNG', sWo, `explain hat ${woerter(step.text)} Wörter (Regel: max. 70 – aufteilen!)`);
      if (step.sprecher && !SPRECHER.includes(step.sprecher)) melde('FEHLER', sWo, `unbekannter sprecher ${step.sprecher}`);
    }
    if (step.figure != null && (typeof step.figure !== 'string' || !/^\s*<svg[\s>]/.test(step.figure) || !/viewBox=/.test(step.figure))) melde('FEHLER', sWo, 'figure muss ein Inline-SVG mit viewBox sein');
    if (step.type === 'example' && !DATEI_KEYS.some((k) => step[k] != null)) melde('FEHLER', sWo, 'example ohne html/css/js');
    if (['quiz', 'fill', 'order', 'pair', 'bug'].includes(step.type)) pruefeFrage(step, sWo, { konzeptPflicht: false });
    if (step.type === 'code') pruefeCodeStep(step, sWo);
    if (vorherTyp && vorherTyp === step.type && !['explain', 'code'].includes(step.type)) melde('WARNUNG', sWo, `zweimal ${step.type} direkt hintereinander`);
    vorherTyp = step.type;
  });

  const letzter = lektion.steps[lektion.steps.length - 1];
  const ohneEtappe = chId.startsWith('01-') || lessonId === '03-eigene-website';
  if (!ohneEtappe) {
    if (!(letzter.type === 'code' && letzter.etappe)) melde('FEHLER', wo, 'Letzter Schritt muss die Etappe sein (code mit etappe)');
    else if (letzter.etappe !== `${chId}/${lessonId}`) melde('FEHLER', wo, `Etappe ${letzter.etappe} gehört nicht zu dieser Lektion`);
    const etappenSchritte = lektion.steps.filter((s) => s.etappe).length;
    if (etappenSchritte !== 1) melde('FEHLER', wo, `genau 1 Etappen-Schritt erwartet, gefunden ${etappenSchritte}`);
  }
  const istLern = !lessonId.includes('wiederholung') && !lessonId.includes('projekt') && !ohneEtappe;
  const codeAnzahl = lektion.steps.filter((s) => s.type === 'code' && !s.etappe).length;
  if (istLern && codeAnzahl < 2) melde('WARNUNG', wo, `Lernlektion mit nur ${codeAnzahl} Code-Aufgabe(n) (Regel: 2–3 + Etappe)`);
  if (istLern && !lektion.steps.some((s) => s.figure)) melde('WARNUNG', wo, 'Lernlektion ohne Grafik (figure)');
  if (istLern && !lektion.konzepte.length) melde('WARNUNG', wo, 'Lernlektion ohne konzepte');
  if (lektion.steps.filter((s) => s.sprecher).length > 2) melde('WARNUNG', wo, 'mehr als zwei Figuren-Schritte');
  if (lektion.steps.length > 16) melde('WARNUNG', wo, `${lektion.steps.length} Schritte – sehr lang`);
}

function pruefePool(chId) {
  const pfad = path.join(WURZEL, 'chapters', chId, 'pool.json');
  if (!fs.existsSync(pfad)) return melde('FEHLER', `${chId}/pool`, 'pool.json fehlt');
  let pool;
  try { pool = lade(pfad); } catch (e) { return melde('FEHLER', `${chId}/pool`, `kein valides JSON: ${e.message}`); }
  if (pool.chapter !== chId) melde('FEHLER', `${chId}/pool`, 'chapter ≠ Ordner');
  if (!Array.isArray(pool.fragen) || pool.fragen.length < 12) melde('WARNUNG', `${chId}/pool`, `nur ${pool.fragen?.length || 0} Fragen (Regel: 12–20)`);
  const ids = new Set();
  const typen = new Set();
  for (const f of pool.fragen || []) {
    const wo = `${chId}/pool/${f.id}`;
    if (!f.id) melde('FEHLER', `${chId}/pool`, 'Frage ohne id');
    if (ids.has(f.id)) melde('FEHLER', wo, 'doppelte id');
    ids.add(f.id);
    if (!f.konzept) melde('FEHLER', wo, 'Frage ohne konzept');
    if (!POOL_TYPEN.includes(f.type)) melde('FEHLER', wo, `Typ ${f.type} im Pool nicht erlaubt`);
    typen.add(f.type);
    pruefeFrage(f, wo);
  }
  for (const t of POOL_TYPEN) if (!typen.has(t)) melde('WARNUNG', `${chId}/pool`, `kein Fragetyp ${t}`);
  const bugs = (pool.fragen || []).filter((f) => f.type === 'bug').length;
  if (bugs < 3) melde('WARNUNG', `${chId}/pool`, `nur ${bugs} bug-Fragen (Regel: mindestens 3)`);
}

function pruefeBoss(chId) {
  const pfad = path.join(WURZEL, 'chapters', chId, 'boss.json');
  if (!fs.existsSync(pfad)) return melde('FEHLER', `${chId}/boss`, 'boss.json fehlt');
  let boss;
  try { boss = lade(pfad); } catch (e) { return melde('FEHLER', `${chId}/boss`, `kein valides JSON: ${e.message}`); }
  if (boss.chapter !== chId) melde('FEHLER', `${chId}/boss`, 'chapter ≠ Ordner');
  if (!boss.title || !boss.intro) melde('FEHLER', `${chId}/boss`, 'title/intro fehlt');
  if (typeof boss.bestanden !== 'number') melde('FEHLER', `${chId}/boss`, 'bestanden fehlt');
  if (!Array.isArray(boss.aufgaben) || boss.aufgaben.length < 8 || boss.aufgaben.length > 12) melde('WARNUNG', `${chId}/boss`, `${boss.aufgaben?.length || 0} Aufgaben (Regel: 8–12)`);
  const codes = (boss.aufgaben || []).filter((a) => a.type === 'code').length;
  if (!chId.startsWith('01-') && codes < 2) melde('WARNUNG', `${chId}/boss`, `nur ${codes} Code-Aufgaben (Regel: mindestens 2)`);
  (boss.aufgaben || []).forEach((a, i) => {
    const wo = `${chId}/boss/aufgabe[${i}]`;
    if (a.type === 'code') {
      if (a.etappe) melde('FEHLER', wo, 'Abnahme-Aufgaben dürfen keine Etappe sein');
      pruefeCodeStep(a, wo, { hintsPflicht: false });
      if (a.hints?.length) melde('WARNUNG', wo, 'Abnahme-Aufgabe mit hints (werden nicht angezeigt)');
    } else pruefeFrage(a, wo);
  });
}

const curriculum = lade(path.join(WURZEL, 'curriculum.json'));
const alleKapitel = curriculum.blocks.flatMap((b) => b.chapters);
const ziel = process.argv[2] ? [process.argv[2]] : alleKapitel;
let lektionen = 0;
for (const chId of ziel) {
  const chPfad = path.join(WURZEL, 'chapters', chId, 'chapter.json');
  if (!fs.existsSync(chPfad)) {
    melde('FEHLER', chId, 'chapter.json fehlt');
    continue;
  }
  const kapitel = lade(chPfad);
  if (kapitel.id !== chId) melde('FEHLER', chId, 'chapter-id ≠ Ordnername');
  for (const l of kapitel.lessons) {
    pruefeLektion(chId, l);
    lektionen++;
  }
  pruefePool(chId);
  pruefeBoss(chId);
  const ordner = path.join(WURZEL, 'chapters', chId, 'lessons');
  if (fs.existsSync(ordner)) for (const f of fs.readdirSync(ordner)) {
    const id = f.replace(/\.json$/, '');
    if (!kapitel.lessons.includes(id)) melde('WARNUNG', `${chId}/${f}`, 'Datei nicht in chapter.json (löschen?)');
  }
  // Etappen des Kapitels müssen alle von einer Lektion benutzt werden
  for (const e of etappen.filter((e) => e.chapter === chId)) {
    if (!kapitel.lessons.includes(e.lesson)) melde('FEHLER', chId, `Etappe ${e.id} gehört zu keiner Lektion in chapter.json`);
  }
}
console.log(`\n${ziel.length} Kapitel, ${lektionen} Lektionen geprüft — ${fehler} Fehler, ${warnungen} Warnungen`);
process.exit(fehler ? 1 : 0);
