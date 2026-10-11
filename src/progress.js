// Freischaltlogik und Orts-Statistik auf Basis des Spielstands.

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

// Ein Ort ist frei, wenn er der erste ist, die Lehrkraft alles geöffnet hat
// oder das Duell des vorherigen Ortes gewonnen wurde.
export function kapitelFrei(index, alleKapitel) {
  if (istLehrkraft() || index === 0) return true;
  const vorher = alleKapitel[index - 1];
  if (!vorher) return true;
  return !!getAbnahme(vorher.id)?.passed;
}

// Nach jeder zweiten Lektion (nicht nach der letzten) lauert ein Hinterhalt: Knoten-ID
// für die Lektion mit Index i, sonst null.
export function hinterhaltKnotenId(kapitel, lessonIndex) {
  if (lessonIndex % 2 !== 1) return null;
  if (lessonIndex >= kapitel.lessons.length - 1) return null;
  return `h${lessonIndex}`;
}

export function lektionFrei(kapitel, lessonId, kapitelIstFrei) {
  if (istLehrkraft()) return true;
  if (!kapitelIstFrei) return false;
  const i = kapitel.lessons.indexOf(lessonId);
  if (i <= 0) return true;
  const s = getState();
  if (!s.lessons[`${kapitel.id}/${kapitel.lessons[i - 1]}`]?.done) return false;
  // Der Hinterhalt nach der vorherigen Lektion muss gespielt sein
  const knoten = hinterhaltKnotenId(kapitel, i - 1);
  if (knoten && !s.hinterhalte.knoten[`${kapitel.id}/${knoten}`]) return false;
  return true;
}

export function abnahmeFrei(kapitel) {
  return istLehrkraft() || kapitelFertig(kapitel);
}

export function sterneHtml(n, max = 3) {
  let s = '<span class="sterne" aria-label="' + n + ' von ' + max + ' Sternen">';
  for (let i = 0; i < max; i++) s += `<span class="${i < n ? '' : 'leer'}">★</span>`;
  return s + '</span>';
}
