// Prüft die Etappen-Kette des Café-Projekts über alle Kapitel:
// Für jede Datei (index, galerie, speisekarte, kontakt, impressum, css, js) muss
// der Starter einer Etappe exakt der Lösung der vorherigen Etappe derselben
// Datei entsprechen. Sonst bekommen Quereinsteiger einen falschen Ausgangspunkt
// und die Website "springt".
// Aufruf: node scripts/pruefe-kette.mjs

import fs from 'node:fs';
import path from 'node:path';

const WURZEL = path.join(import.meta.dirname, '..', 'public', 'content');
const lade = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

const curriculum = lade(path.join(WURZEL, 'curriculum.json'));
const kapitelIds = curriculum.blocks.flatMap((b) => b.chapters);

// letzter bekannter Stand je Schlüssel: 'html:index', 'css', 'js'
const stand = new Map();
let etappen = 0;
let brueche = 0;

function norm(s) {
  return String(s ?? '').replace(/\r\n/g, '\n');
}

function zeigeDiff(a, b) {
  const za = norm(a).split('\n');
  const zb = norm(b).split('\n');
  for (let i = 0; i < Math.max(za.length, zb.length); i++) {
    if (za[i] !== zb[i]) {
      return `  Zeile ${i + 1}:\n    erwartet: ${JSON.stringify(za[i] ?? '<Ende>')}\n    gefunden: ${JSON.stringify(zb[i] ?? '<Ende>')}`;
    }
  }
  return '  (nur Unterschied am Dateiende / Zeilenumbrüche)';
}

for (const chId of kapitelIds) {
  const kapitel = lade(path.join(WURZEL, 'chapters', chId, 'chapter.json'));
  for (const lessonId of kapitel.lessons) {
    const pfad = path.join(WURZEL, 'chapters', chId, 'lessons', `${lessonId}.json`);
    if (!fs.existsSync(pfad)) continue;
    const lektion = lade(pfad);
    for (const step of lektion.steps) {
      if (step.type !== 'code' || !step.project) continue;
      etappen++;
      const wo = `${chId}/${lessonId}`;
      const page = step.project.page;
      const editable = step.editable || Object.keys(step.starter || {});

      const schluessel = (k) => (k === 'html' ? `html:${page}` : k);

      // Starter gegen letzten Stand prüfen (für alle Dateien, die der Step kennt)
      for (const k of Object.keys(step.starter || {})) {
        if (k === 'html' && !page) continue;
        const key = schluessel(k);
        const vorher = stand.get(key);
        if (vorher === undefined) continue; // erste Etappe dieser Datei
        if (norm(vorher) !== norm(step.starter[k])) {
          brueche++;
          console.log(`BRUCH  ${wo} [${key}]: Starter ≠ Lösung der vorherigen Etappe`);
          console.log(zeigeDiff(vorher, step.starter[k]));
        }
      }

      // Neuer Stand: gespeicherte Dateien aus der Lösung, sonst Starter bleibt
      for (const k of step.project.save || []) {
        const key = schluessel(k);
        const neu = step.solution?.[k] ?? step.starter?.[k];
        if (neu != null) stand.set(key, neu);
      }
      // Auch nicht gespeicherte, aber gesperrt mitgelieferte Dateien fixieren den Stand
      for (const k of Object.keys(step.starter || {})) {
        if (editable.includes(k)) continue;
        const key = schluessel(k);
        if (k === 'html' && !page) continue;
        if (!stand.has(key)) stand.set(key, step.starter[k]);
      }
    }
  }
}

console.log(`\n${etappen} Etappen geprüft — ${brueche} Kettenbrüche`);
process.exit(brueche ? 1 : 0);
