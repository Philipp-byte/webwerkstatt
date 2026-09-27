// Freischaltlogik und Kapitel-Statistik auf Basis des Spielstands.

import { getState, istLehrkraft, getAbnahme } from './store.js';

export function kapitelFertig(kapitel) {
  const s = getState();
  return kapitel.lessons.every((l) => s.lessons[`${kapitel.id}/${l}`]?.done);
}

export function kapitelStand(kapitel) {
  const s = getState();
  const erledigt = kapitel.lessons.filter((l) => s.lessons[`${kapitel.id}/${l}`]?.done).length;
  const sterne = kapitel.lessons.reduce((a, l) => a + (s.lessons[`${kapitel.id}/${l}`]?.stars || 0), 0);
  const abnahme = getAbnahme(kapitel.id);
  return { erledigt, gesamt: kapitel.lessons.length, sterne, maxSterne: kapitel.lessons.length * 3, abnahme, fertig: erledigt === kapitel.lessons.length, abgenommen: !!abnahme?.passed };
}

// Ein Kapitel ist frei, wenn es das erste ist, die Lehrkraft alles geöffnet hat
// oder die Abnahme des vorherigen Kapitels bestanden wurde.
export function kapitelFrei(index, alleKapitel) {
  if (istLehrkraft() || index === 0) return true;
  const vorher = alleKapitel[index - 1];
  if (!vorher) return true;
  return !!getAbnahme(vorher.id)?.passed;
}

export function lektionFrei(kapitel, lessonId, kapitelIstFrei) {
  if (istLehrkraft()) return true;
  if (!kapitelIstFrei) return false;
  const i = kapitel.lessons.indexOf(lessonId);
  if (i <= 0) return true;
  const s = getState();
  return !!s.lessons[`${kapitel.id}/${kapitel.lessons[i - 1]}`]?.done;
}

export function abnahmeFrei(kapitel) {
  return istLehrkraft() || kapitelFertig(kapitel);
}

export function sterneHtml(n, max = 3) {
  let s = '<span class="sterne" aria-label="' + n + ' von ' + max + ' Sternen">';
  for (let i = 0; i < max; i++) s += `<span class="${i < n ? '' : 'leer'}">★</span>`;
  return s + '</span>';
}
