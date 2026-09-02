// Interne Selbstprüfung der Inhalte (Route #/pruefung, nicht verlinkt):
// 1. Jede Code-Aufgabe muss mit ihrer Musterlösung ALLE Tests bestehen.
// 2. Gegenprobe: der unveränderte Starter darf NICHT bestehen – sonst prüft
//    die Aufgabe nichts (Meldung LÜCKE). Vorbild: PyQuest verify_lessons.py.
// Ergebnis liegt maschinenlesbar in window.__ww_pruefung (für Playwright/CI).

import { loadCurriculum, loadChapter, loadLesson } from '../content.js';
import { runTests } from '../checker.js';

// Musterlösung eines Steps: bevorzugt step.solution ({html/css/js}),
// sonst der Codeblock aus dem letzten Hint (nur bei genau einer editierbaren Datei).
function musterloesung(step) {
  if (step.solution && typeof step.solution === 'object') return step.solution;
  const hints = step.hints || [];
  if (!hints.length) return null;
  const letzter = String(hints[hints.length - 1]);
  const m = letzter.match(/```[a-z]*\n([\s\S]*?)```/);
  if (!m) return null;
  const editable = step.editable || Object.keys(step.starter || {});
  if (editable.length !== 1) return null;
  return { [editable[0]]: m[1] };
}

function mitLoesung(step, loesung) {
  const files = { ...step.starter };
  for (const [k, v] of Object.entries(loesung)) {
    if (files[k] !== undefined || ['html', 'css', 'js'].includes(k)) files[k] = v;
  }
  return files;
}

export async function renderPruefung(app) {
  app.innerHTML = `
    <div class="pruefung-seite">
      <a class="zurueck" href="#/">← Zur Übersicht</a>
      <h1>Interne Inhaltsprüfung</h1>
      <p class="pruefung-status">Starte …</p>
      <div class="pruefung-ergebnisse"></div>
    </div>`;
  const statusEl = app.querySelector('.pruefung-status');
  const listeEl = app.querySelector('.pruefung-ergebnisse');

  const curriculum = await loadCurriculum();
  const chapterIds = curriculum.blocks.flatMap((b) => b.chapters);
  const bericht = { gesamt: 0, bestanden: 0, fehler: [], luecken: [], ohneLoesung: [], fertig: false };

  for (const chId of chapterIds) {
    const kapitel = await loadChapter(chId);
    for (const lessonId of kapitel.lessons) {
      if (!app.isConnected) return; // Ansicht verlassen → abbrechen
      let lektion;
      try {
        lektion = await loadLesson(chId, lessonId);
      } catch (e) {
        bericht.fehler.push({ wo: `${chId}/${lessonId}`, was: `Lektion nicht ladbar: ${e.message}` });
        continue;
      }
      const codeSteps = (lektion.steps || []).filter((s) => s.type === 'code');
      for (let i = 0; i < codeSteps.length; i++) {
        const step = codeSteps[i];
        const wo = `${chId}/${lessonId} #${i + 1}`;
        bericht.gesamt++;
        statusEl.textContent = `Prüfe ${wo} … (${bericht.gesamt} Aufgaben geprüft)`;
        // Überlebt einen unerwarteten Reload – zum Aufspüren von Aufgaben,
        // die die Seite wegnavigieren.
        try { sessionStorage.setItem('ww.pruefung.zuletzt', wo); } catch {}

        const loesung = musterloesung(step);
        if (!loesung) {
          bericht.ohneLoesung.push(wo);
          continue;
        }

        // 1) Musterlösung muss bestehen
        const proResults = await runTests(mitLoesung(step, loesung), step.tests);
        const proOk = proResults.every((r) => r.pass);
        if (proOk) bericht.bestanden++;
        else {
          bericht.fehler.push({
            wo,
            was: proResults.filter((r) => !r.pass).map((r) => `${r.label}${r.detail ? ` (${r.detail})` : ''}`).join(' | '),
          });
        }

        // 2) Gegenprobe: unveränderter Starter darf NICHT bestehen
        const contraResults = await runTests({ ...step.starter }, step.tests);
        if (contraResults.every((r) => r.pass)) {
          bericht.luecken.push(wo);
        }
      }
    }
  }

  bericht.fertig = true;
  window.__ww_pruefung = bericht;

  const zeile = (klasse, text) => `<div class="test-zeile ${klasse}">${text}</div>`;
  listeEl.innerHTML =
    zeile(bericht.fehler.length ? 'test-fehler' : 'test-ok',
      `<strong>${bericht.bestanden} / ${bericht.gesamt}</strong> Musterlösungen bestehen alle Tests`) +
    bericht.fehler.map((f) => zeile('test-fehler', `✘ ${f.wo}: ${f.was}`)).join('') +
    (bericht.luecken.length
      ? bericht.luecken.map((l) => zeile('test-fehler', `⚠ LÜCKE ${l}: besteht schon mit unverändertem Starter`)).join('')
      : zeile('test-ok', '✔ Gegenprobe: keine Aufgabe besteht mit leerem Starter')) +
    (bericht.ohneLoesung.length
      ? zeile('test-fehler', `⚠ Ohne auswertbare Musterlösung: ${bericht.ohneLoesung.join(', ')}`)
      : zeile('test-ok', '✔ Jede Code-Aufgabe hat eine auswertbare Musterlösung'));
  statusEl.textContent = `Fertig: ${bericht.gesamt} Code-Aufgaben geprüft.`;
}
