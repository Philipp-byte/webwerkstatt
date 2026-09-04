// Merkt sich die eigenen Lösungen der Lernenden zu Code-Aufgaben – aber nur
// Code, der die Prüfung bestanden hat (wie bei PyQuest). Daraus entsteht das
// Arbeitsblatt „mit deinen Lösungen“. Immer lokal, unabhängig vom Schulmodus:
// der geschriebene Quelltext verlässt das Gerät nicht.

const KEY = 'webwerkstatt.loesungen.v1';

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
    // Speicher blockiert – dann fehlt die Lösung später im Arbeitsblatt.
  }
}

export function merkeLoesung(chapterId, lessonId, stepIndex, files) {
  const data = load();
  const key = `${chapterId}/${lessonId}`;
  data[key] = data[key] || {};
  data[key][stepIndex] = { files, zeit: new Date().toISOString() };
  save(data);
}

export function getLoesungen(chapterId, lessonId) {
  return load()[`${chapterId}/${lessonId}`] || {};
}

export function getAlleLoesungen() {
  return load();
}

export function setAlleLoesungen(data) {
  if (data && typeof data === 'object') save(data);
}
