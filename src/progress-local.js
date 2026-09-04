// Fortschritts-Speicher für den DEMO-MODUS (z. B. GitHub Pages):
// Lernfortschritt im localStorage – bewusst simpel, keine Punkte, keine Level.
// Dieselbe Funktions-Schnittstelle wie progress-remote.js; die Views
// importieren nur die Fassade progress.js und merken den Unterschied nie.

const KEY = 'webwerkstatt.fortschritt.v1';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Speicher voll oder blockiert – Fortschritt geht dann nur für diese Sitzung verloren.
  }
}

export function isDone(chapterId, lessonId) {
  return !!load()[`${chapterId}/${lessonId}`];
}

export function markDone(chapterId, lessonId) {
  const data = load();
  data[`${chapterId}/${lessonId}`] = true;
  save(data);
}

export function doneCount() {
  return Object.values(load()).filter(Boolean).length;
}

export function chapterDoneCount(chapterId, lessonIds) {
  return lessonIds.filter((l) => isDone(chapterId, l)).length;
}

// Im Demo-Modus gibt es keine Kapitel-Sperren – die setzt nur eine Lehrkraft
// im Schulmodus.
export function isChapterLocked() {
  return false;
}

/* ---------- Sichern & Wiederherstellen als JSON-Datei (wie PyQuest) ---------- */

import { getProjektAll, setProjektAll } from './projekt.js';
import { getAlleLoesungen, setAlleLoesungen } from './loesungen.js';

export function exportAll() {
  return {
    app: 'WebWerkstatt',
    version: 1,
    exportedAt: new Date().toISOString(),
    fortschritt: load(),
    projekt: getProjektAll(),
    loesungen: getAlleLoesungen(),
  };
}

export function importAll(daten) {
  if (!daten || daten.app !== 'WebWerkstatt' || typeof daten.fortschritt !== 'object') {
    throw new Error('Das ist keine WebWerkstatt-Sicherungsdatei.');
  }
  save(daten.fortschritt || {});
  if (daten.projekt) setProjektAll(daten.projekt);
  if (daten.loesungen) setAlleLoesungen(daten.loesungen);
}
