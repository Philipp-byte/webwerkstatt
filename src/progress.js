// Fassade für den Lernfortschritt: wählt zur Laufzeit zwischen localStorage
// (Demo-Modus, z. B. GitHub Pages) und Schulserver (Schulmodus, Flask +
// SQLite). Beide Backends bieten dieselbe Funktions-Schnittstelle
// (progress-local.js / progress-remote.js) – die Views importieren nur von
// hier und müssen den Unterschied nie kennen.
//
// Der Modus wird beim Start in main.js erkannt (/api/ping) und per
// setBackendMode gesetzt; Standard ist der Demo-Modus.

import * as local from './progress-local.js';
import * as remote from './progress-remote.js';

let backend = local;

export function setBackendMode(mode) {
  backend = mode === 'remote' ? remote : local;
}

export function getBackendMode() {
  return backend === remote ? 'remote' : 'local';
}

export const isDone = (...a) => backend.isDone(...a);
export const markDone = (...a) => backend.markDone(...a);
export const doneCount = (...a) => backend.doneCount(...a);
export const chapterDoneCount = (...a) => backend.chapterDoneCount(...a);
export const isChapterLocked = (...a) => backend.isChapterLocked(...a);
export const exportAll = (...a) => backend.exportAll(...a);
export const importAll = (...a) => backend.importAll(...a);
