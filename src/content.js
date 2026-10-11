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
export const loadWelt = () => ladeJson('story/welt.json');
export const loadFiguren = () => ladeJson('story/figuren.json');
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

// Alle Konzepte, die eine Lektion und alle davor eingeführt haben (für Nachschlagen)
export async function konzepteBis(chapterId, lessonId) {
  const flat = await flacheLektionen();
  const i = flat.findIndex((x) => x.chapterId === chapterId && x.lessonId === lessonId);
  const bis = i >= 0 ? flat.slice(0, i + 1) : flat;
  const lektionen = await Promise.all(bis.map((x) => loadLesson(x.chapterId, x.lessonId).catch(() => null)));
  const ids = [];
  lektionen.forEach((l) => (l?.konzepte || []).forEach((k) => !ids.includes(k) && ids.push(k)));
  return ids;
}

/* ---------- Hyperia: Orte, Regionen, Figuren ---------- */

// Der Ort (welt.json) zu einem Kapitel, mit Region und Gespinst-Name
export async function ortFuer(chapterId) {
  const [welt, figuren] = await Promise.all([loadWelt(), loadFiguren()]);
  const ort = welt.orte.find((o) => o.chapter === chapterId);
  if (!ort) return null;
  const region = welt.regionen.find((r) => r.id === ort.region) || null;
  return { ...ort, regionName: region?.name || '', regionFarbe: region?.farbe || '#9b8cff', gespinstName: figuren.figuren[ort.gespinst]?.name || ort.gespinst };
}

export async function alleOrte() {
  const [welt, figuren] = await Promise.all([loadWelt(), loadFiguren()]);
  return welt.orte.map((o) => {
    const region = welt.regionen.find((r) => r.id === o.region) || null;
    return { ...o, regionName: region?.name || '', regionFarbe: region?.farbe || '#9b8cff', gespinstName: figuren.figuren[o.gespinst]?.name || o.gespinst };
  });
}
