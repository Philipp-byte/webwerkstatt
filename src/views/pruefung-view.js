// Interne Prüfung: läuft jede Code-Aufgabe (inkl. Etappen und Abnahmen) im
// Browser durch – die Musterlösung muss bestehen, der Starter darf nicht.

import { loadAlleKapitel, loadLesson, loadBoss, etappeAufloesen, loadEtappen } from '../content.js';
import { runTests } from '../engine/checker.js';
import { escapeHtml } from '../engine/markdown.js';

export async function renderPruefung(app, nurKapitel) {
  app.innerHTML = `<div class="auftritt"><a class="zurueck" href="#/lehrkraft">← Lehrkraft</a><h1 style="margin-top:0.5rem">🧪 Interne Prüfung</h1><p id="status" style="color:var(--muted)">Sammle Aufgaben …</p><table class="pruef-tabelle"><thead><tr><th>Aufgabe</th><th>Lösung besteht</th><th>Starter fällt durch</th></tr></thead><tbody id="zeilen"></tbody></table></div>`;
  const zeilen = app.querySelector('#zeilen');
  const status = app.querySelector('#status');
  const kapitel = (await loadAlleKapitel()).filter((k) => !nurKapitel || k.id === nurKapitel);
  const aufgaben = [];
  // 1. Alle Etappen der FUNKEN-Website (unabhängig davon, ob die Lektion schon existiert)
  const { etappen } = await loadEtappen();
  for (const e of etappen) {
    if (nurKapitel && e.chapter !== nurKapitel) continue;
    const a = await etappeAufloesen(e.id);
    aufgaben.push({ wo: `Etappe ${e.id}`, step: { type: 'code', task: a.task, tests: a.tests, starter: a.starter, solution: a.solution, editable: a.editable } });
  }
  // 2. Code-Aufgaben der Lektionen (ohne Etappen) und der Abnahmen
  for (const k of kapitel) {
    for (const l of k.lessons) {
      let lektion;
      try {
        lektion = await loadLesson(k.id, l);
      } catch {
        continue;
      }
      for (let i = 0; i < lektion.steps.length; i++) {
        const step = lektion.steps[i];
        if (step.type !== 'code' || step.etappe) continue;
        aufgaben.push({ wo: `${k.id}/${l} #${i + 1}`, step });
      }
    }
    const boss = await loadBoss(k.id);
    if (boss) boss.aufgaben.forEach((a, i) => a.type === 'code' && aufgaben.push({ wo: `${k.id}/abnahme #${i + 1}`, step: a }));
  }
  status.textContent = `${aufgaben.length} Aufgaben – prüfe …`;
  let fehler = 0;
  for (const { wo, step } of aufgaben) {
    const editable = step.editable || Object.keys(step.starter || {});
    const loesung = { ...step.starter };
    for (const k of editable) if (step.solution?.[k] != null) loesung[k] = step.solution[k];
    const r1 = await runTests(loesung, step.tests || []);
    const r2 = await runTests({ ...step.starter }, step.tests || []);
    const ok1 = r1.every((r) => r.pass);
    const ok2 = !r2.every((r) => r.pass);
    if (!ok1 || !ok2) fehler++;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escapeHtml(wo)}</td><td class="${ok1 ? 'pruef-ok' : 'pruef-fehler'}">${ok1 ? '✔' : '✘ ' + escapeHtml(r1.filter((r) => !r.pass).map((r) => `${r.label}${r.detail ? ` (${r.detail})` : ''}`).join(' · '))}</td><td class="${ok2 ? 'pruef-ok' : 'pruef-fehler'}">${ok2 ? '✔' : '✘ Starter besteht schon!'}</td>`;
    zeilen.appendChild(tr);
    status.textContent = `${zeilen.children.length} / ${aufgaben.length} geprüft – ${fehler} Problem(e)`;
  }
  status.textContent = `Fertig: ${aufgaben.length} Aufgaben, ${fehler} Problem(e).`;
  window.__ww_pruefung = { aufgaben: aufgaben.length, fehler };
}
