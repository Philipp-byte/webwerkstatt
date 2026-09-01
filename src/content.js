// Lädt Curriculum, Kapitel und Lektionen aus public/content (datengetrieben wie bei PyQuest).

const chapterCache = new Map();
const lessonCache = new Map();
let curriculumCache = null;
let flatCache = null;

function contentUrl(pfad) {
  return new URL(`content/${pfad}`, document.baseURI).href;
}

async function fetchJson(pfad) {
  const res = await fetch(contentUrl(pfad));
  if (!res.ok) throw new Error(`Konnte ${pfad} nicht laden (${res.status})`);
  return res.json();
}

export async function loadCurriculum() {
  if (!curriculumCache) curriculumCache = await fetchJson('curriculum.json');
  return curriculumCache;
}

export async function loadChapter(chapterId) {
  if (!chapterCache.has(chapterId)) {
    chapterCache.set(chapterId, await fetchJson(`chapters/${chapterId}/chapter.json`));
  }
  return chapterCache.get(chapterId);
}

export async function loadLesson(chapterId, lessonId) {
  const key = `${chapterId}/${lessonId}`;
  if (!lessonCache.has(key)) {
    lessonCache.set(key, await fetchJson(`chapters/${chapterId}/lessons/${lessonId}.json`));
  }
  return lessonCache.get(key);
}

// Alle Lektionen in Curriculum-Reihenfolge: [{ chapterId, lessonId }]
export async function loadFlatLessons() {
  if (flatCache) return flatCache;
  const curriculum = await loadCurriculum();
  const chapterIds = curriculum.blocks.flatMap((b) => b.chapters);
  const chapters = await Promise.all(chapterIds.map((id) => loadChapter(id)));
  flatCache = chapters.flatMap((ch) => ch.lessons.map((l) => ({ chapterId: ch.id, lessonId: l })));
  return flatCache;
}

export async function nextLessonAfter(chapterId, lessonId) {
  const flat = await loadFlatLessons();
  const i = flat.findIndex((e) => e.chapterId === chapterId && e.lessonId === lessonId);
  return i >= 0 && i + 1 < flat.length ? flat[i + 1] : null;
}
