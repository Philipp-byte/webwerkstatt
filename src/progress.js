// Lernfortschritt im localStorage – bewusst simpel, keine Punkte, keine Level.

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
