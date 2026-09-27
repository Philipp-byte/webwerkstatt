// Lädt Inhalte (JSON) aus public/content und hält sie im Cache.

const cache = new Map();

async function ladeJson(pfad) {
  if (cache.has(pfad)) return cache.get(pfad);
  const p = fetch(new URL(`content/${pfad}`, document.baseURI)).then(async (res) => {
    if (!res.ok) throw new Error(`Inhalt fehlt: ${pfad}`);
    return res.json();
  });
  cache.set(pfad, p);
  try {
    return await p;
  } catch (e) {
    cache.delete(pfad);
    throw e;
  }
}

export const loadCurriculum = () => ladeJson('curriculum.json');
export const loadKonzepte = () => ladeJson('konzepte.json');
export const loadChapter = (id) => ladeJson(`chapters/${id}/chapter.json`);
export const loadLesson = (ch, l) => ladeJson(`chapters/${ch}/lessons/${l}.json`);
export const loadPool = (ch) => ladeJson(`chapters/${ch}/pool.json`).catch(() => ({ chapter: ch, fragen: [] }));
export const loadBoss = (ch) => ladeJson(`chapters/${ch}/boss.json`).catch(() => null);
export const loadEtappen = () => ladeJson('projekt/etappen.json');
export const loadIntro = () => ladeJson('story/intro.json');
export const loadLehrkraft = () => ladeJson('lehrkraft.json').catch(() => ({ hash: '' }));

export async function alleKapitelIds() {
  const c = await loadCurriculum();
  return c.blocks.flatMap((b) => b.chapters);
}

export async function loadAlleKapitel() {
  const ids = await alleKapitelIds();
  return Promise.all(ids.map((id) => loadChapter(id)));
}

export async function blockFuer(chapterId) {
  const c = await loadCurriculum();
  return c.blocks.find((b) => b.chapters.includes(chapterId)) || null;
}

export async function flacheLektionen() {
  const kapitel = await loadAlleKapitel();
  const flat = [];
  for (const k of kapitel) for (const l of k.lessons) flat.push({ chapterId: k.id, lessonId: l, kapitel: k });
  return flat;
}

export async function naechsteLektion(chapterId, lessonId) {
  const flat = await flacheLektionen();
  const i = flat.findIndex((x) => x.chapterId === chapterId && x.lessonId === lessonId);
  return i >= 0 && i + 1 < flat.length ? flat[i + 1] : null;
}

export async function vorherigeLektion(chapterId, lessonId) {
  const flat = await flacheLektionen();
  const i = flat.findIndex((x) => x.chapterId === chapterId && x.lessonId === lessonId);
  return i > 0 ? flat[i - 1] : null;
}

// Fragenpool aller angegebenen Kapitel zusammenführen
export async function poolFuer(chapterIds) {
  const pools = await Promise.all(chapterIds.map((id) => loadPool(id)));
  return pools.flatMap((p) => p.fragen.map((f) => ({ ...f, chapter: p.chapter })));
}

// Etappe auflösen: Starter = Zustand nach der vorherigen Etappe derselben Dateien
export async function etappeAufloesen(id) {
  const daten = await loadEtappen();
  const idx = daten.etappen.findIndex((e) => e.id === id);
  if (idx < 0) throw new Error(`Etappe unbekannt: ${id}`);
  const e = daten.etappen[idx];
  const starter = {};
  const solution = {};
  for (const datei of Object.keys(e.files)) {
    const schluessel = datei === 'html' ? `html:${e.page}` : datei;
    let vorher = e.startFiles?.[datei];
    if (vorher == null) {
      vorher = '';
      for (let j = idx - 1; j >= 0; j--) {
        const alt = daten.etappen[j];
        const altSchluessel = (d) => (d === 'html' ? `html:${alt.page}` : d);
        if (alt.files[datei] != null && altSchluessel(datei) === schluessel) {
          vorher = alt.files[datei];
          break;
        }
      }
    }
    starter[datei] = vorher;
    solution[datei] = e.files[datei];
  }
  return { ...e, starter, solution, project: { page: e.page, save: e.save } };
}
