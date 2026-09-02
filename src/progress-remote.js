// Fortschritts-Speicher für den SCHULMODUS: dieselbe Schnittstelle wie
// progress-local.js, aber Server-gestützt (Flask + SQLite). Nach dem Login
// wird der komplette Zustand einmal geladen (loadState) und danach synchron
// aus dem Cache gelesen – die Views merken den Unterschied nicht.
//
// Datenschutz: der Server kennt nur Pseudonym + Fortschritt. Es wird kein
// Schüler-Code an den Server geschickt.

import { api } from './api.js';

let state = {
  lessons: {},
  lockedChapters: [],
};

export async function whoAmI() {
  try {
    return await api('api/me');
  } catch {
    return null;
  }
}

export async function login(pseudonym, password) {
  return api('api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ pseudonym, password }),
  });
}

export async function logout() {
  await api('api/auth/logout', { method: 'POST' });
  state = { lessons: {}, lockedChapters: [] };
}

export async function changePassword(oldPassword, newPassword) {
  return api('api/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
  });
}

export async function loadState() {
  state = await api('api/progress/state');
  if (!state.lessons) state.lessons = {};
  if (!state.lockedChapters) state.lockedChapters = [];
}

export function isDone(chapterId, lessonId) {
  return state.lessons[`${chapterId}/${lessonId}`]?.status === 'done';
}

// Schreibt sofort in den Cache (die Views lesen synchron weiter) und schickt
// das Ergebnis fire-and-forget an den Server. Schlägt der Aufruf fehl
// (z. B. Kapitel inzwischen gesperrt, Sitzung abgelaufen), wird der
// Cache-Eintrag zurückgenommen.
export function markDone(chapterId, lessonId) {
  const key = `${chapterId}/${lessonId}`;
  const vorher = state.lessons[key];
  state.lessons[key] = { status: 'done', completedAt: new Date().toISOString() };
  api('api/progress/complete-lesson', {
    method: 'POST',
    body: JSON.stringify({ lessonId: key }),
  }).catch((e) => {
    if (vorher) state.lessons[key] = vorher;
    else delete state.lessons[key];
    console.warn('Fortschritt konnte nicht gespeichert werden:', e.message);
  });
}

export function doneCount() {
  return Object.values(state.lessons).filter((l) => l.status === 'done').length;
}

export function chapterDoneCount(chapterId, lessonIds) {
  return lessonIds.filter((l) => isDone(chapterId, l)).length;
}

export function isChapterLocked(chapterId) {
  return (state.lockedChapters || []).includes(chapterId);
}

/* ---------- Sichern & Wiederherstellen ----------
   Im Schulmodus liegt der Fortschritt auf dem Schulserver – Export/Import
   per Datei gibt es nur im Demo-Modus. */

export function exportAll() {
  throw new Error('Im Schulmodus liegt dein Fortschritt auf dem Schulserver – Sichern per Datei ist nicht nötig.');
}

export function importAll() {
  throw new Error('Im Schulmodus liegt dein Fortschritt auf dem Schulserver – Wiederherstellen per Datei ist nicht möglich.');
}
