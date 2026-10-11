// Der Spielstand: alles in EINEM localStorage-Eintrag (Demo-Modus) bzw. als JSON auf dem
// Server (Schulmodus, siehe progress-remote.js). Sichern/Laden als Datei unter „Ich“.
// Die Views ändern den Zustand nur über die Funktionen hier, damit XP, Meilensteine und
// Leitner konsistent bleiben.

import { levelAus } from './gamification/xp.js';
import { pruefeMeilensteine } from './gamification/badges.js';
import { lerneKonzepte } from './gamification/leitner.js';

const KEY = 'webwerkstatt2.spielstand.v1';
const LEHRKRAFT_KEY = 'webwerkstatt2.lehrkraft';
const SETTINGS_KEY = 'webwerkstatt2.einstellungen';

function leerer() {
  return {
    version: 3,
    name: '',
    xp: 0,
    lessons: {},
    granted: {},
    boss: {},
    badges: {},
    leitner: {},
    lessonCounter: 0,
    recentQuestions: [],
    // Hinterhalte: gespielte Knoten je Ort, Rekorde je Spiel
    hinterhalte: { knoten: {}, rekorde: {}, runden: 0 },
    stats: { correct: 0, wrong: 0, codePassed: 0, hintsUsed: 0, comebacks: 0, soundcheckCorrect: 0, exports: 0, minuten: 0, lastActive: null, firstActive: null, hinterhaltSterne: 0 },
    project: { pages: {}, css: null, js: null, etappen: {} },
    showtime: { html: null, css: null, js: null, pflichtErfuellt: false },
    solutions: {},
    intro: { seen: false, video: false, komplett: false },
    // Story: gesehene Orts-Einleitungen, vorgestellte Figuren, Seidras Auftritte
    story: { einleitungen: {}, vorgestellt: {}, seidra: {} },
  };
}

let state = null;
const listener = new Set();

function migriere(s) {
  const basis = leerer();
  const out = { ...basis };
  for (const k of Object.keys(basis)) {
    if (!(k in (s || {}))) continue;
    if (typeof basis[k] === 'object' && basis[k] !== null && !Array.isArray(basis[k])) {
      out[k] = { ...basis[k], ...(s[k] || {}) };
    } else out[k] = s[k];
  }
  out.hinterhalte = { ...basis.hinterhalte, ...(s?.hinterhalte || {}) };
  out.stats = { ...basis.stats, ...(s?.stats || {}) };
  out.story = { ...basis.story, ...(s?.story || {}) };
  delete out.story.gesehen;
  delete out.story.karten;
  out.version = 3;
  return out;
}

function load() {
  if (state) return state;
  try {
    const roh = JSON.parse(localStorage.getItem(KEY));
    state = roh && typeof roh === 'object' ? migriere(roh) : leerer();
  } catch {
    state = leerer();
  }
  return state;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Speicher blockiert – Spielstand gilt dann nur für diese Sitzung.
  }
  listener.forEach((fn) => fn(state));
}

export function getState() {
  return load();
}

export function onChange(fn) {
  listener.add(fn);
  return () => listener.delete(fn);
}

// Kompletten Spielstand ersetzen (Datei laden, Schulmodus)
export function ersetzeSpielstand(daten) {
  state = migriere(daten || {});
  save();
}

export function heute() {
  return new Date().toISOString().slice(0, 10);
}

/* ---------- Einstellungen (nicht Teil des Spielstands) ---------- */

export function getSettings() {
  try {
    return { theme: 'dunkel', motion: 'an', ...(JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}) };
  } catch {
    return { theme: 'dunkel', motion: 'an' };
  }
}

export function setSetting(k, v) {
  const s = getSettings();
  s[k] = v;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {
    /* egal */
  }
}

/* ---------- Lehrkraft-Modus ---------- */

export function istLehrkraft() {
  try {
    return localStorage.getItem(LEHRKRAFT_KEY) === '1';
  } catch {
    return false;
  }
}

export function setLehrkraft(an) {
  try {
    if (an) localStorage.setItem(LEHRKRAFT_KEY, '1');
    else localStorage.removeItem(LEHRKRAFT_KEY);
  } catch {
    /* egal */
  }
}

/* ---------- XP ---------- */

// Vergibt XP; mit `key` nur einmal. Liefert die vergebene Menge und den Level-Wechsel.
export function vergibXp(betrag, { key = null } = {}) {
  const s = load();
  if (key && s.granted[key]) return { xp: 0, levelup: null };
  const menge = Math.round(betrag);
  const levelVorher = levelAus(s.xp);
  s.xp += menge;
  if (key) s.granted[key] = true;
  const levelNachher = levelAus(s.xp);
  save();
  return { xp: menge, levelup: levelNachher > levelVorher ? levelNachher : null };
}

/* ---------- Statistik ---------- */

export function zaehle(feld, n = 1) {
  const s = load();
  s.stats[feld] = (s.stats[feld] || 0) + n;
  s.stats.lastActive = Date.now();
  if (!s.stats.firstActive) s.stats.firstActive = Date.now();
  save();
}

/* ---------- Lektionen ---------- */

export function lessonKey(chapterId, lessonId) {
  return `${chapterId}/${lessonId}`;
}

export function getLesson(chapterId, lessonId) {
  return load().lessons[lessonKey(chapterId, lessonId)] || null;
}

export function istErledigt(chapterId, lessonId) {
  return !!getLesson(chapterId, lessonId)?.done;
}

export function lektionAbschliessen(chapterId, lessonId, { stars, konzepte = [], fehler = 0, tipps = 0 }) {
  const s = load();
  const key = lessonKey(chapterId, lessonId);
  const vorher = s.lessons[key];
  const erster = !vorher?.done;
  const eintrag = {
    done: true,
    stars: Math.max(stars, vorher?.stars || 0),
    completedAt: vorher?.completedAt || Date.now(),
    lastAt: Date.now(),
    versuche: (vorher?.versuche || 0) + 1,
    fehler,
    tipps,
  };
  s.lessons[key] = eintrag;
  if (erster) {
    s.lessonCounter++;
    lerneKonzepte(s, konzepte);
  }
  s.stats.lastActive = Date.now();
  save();
  return { erster, eintrag };
}

export function loesungMerken(chapterId, lessonId, stepIndex, dateien) {
  const s = load();
  s.solutions[`${chapterId}/${lessonId}/${stepIndex}`] = { ...dateien, zeit: Date.now() };
  save();
}

export function getLoesungen() {
  return load().solutions;
}

/* ---------- Duell (Abnahme) ---------- */

export function abnahmeSpeichern(chapterId, { anteil, passed }) {
  const s = load();
  const alt = s.boss[chapterId] || { best: 0, passed: false, versuche: 0, ersterVersuch: false };
  s.boss[chapterId] = {
    best: Math.max(alt.best, anteil),
    passed: alt.passed || passed,
    versuche: alt.versuche + 1,
    ersterVersuch: alt.ersterVersuch || (passed && alt.versuche === 0),
    at: Date.now(),
  };
  save();
  return s.boss[chapterId];
}

export function getAbnahme(chapterId) {
  return load().boss[chapterId] || null;
}

/* ---------- Hinterhalte ---------- */

export function hinterhaltSpeichern(chapterId, knotenId, { spiel, punkte, max, sterne }) {
  const s = load();
  const key = `${chapterId}/${knotenId}`;
  const alt = s.hinterhalte.knoten[key];
  const neueSterne = Math.max(sterne, alt?.sterne || 0);
  s.stats.hinterhaltSterne = (s.stats.hinterhaltSterne || 0) + Math.max(0, neueSterne - (alt?.sterne || 0));
  s.hinterhalte.knoten[key] = { spiel, punkte: Math.max(punkte, alt?.punkte || 0), max, sterne: neueSterne, at: Date.now(), runden: (alt?.runden || 0) + 1 };
  s.hinterhalte.rekorde[spiel] = Math.max(s.hinterhalte.rekorde[spiel] || 0, punkte);
  s.hinterhalte.runden = (s.hinterhalte.runden || 0) + 1;
  s.stats.lastActive = Date.now();
  save();
  return s.hinterhalte.knoten[key];
}

export function getHinterhalt(chapterId, knotenId) {
  return load().hinterhalte.knoten[`${chapterId}/${knotenId}`] || null;
}

/* ---------- Meilensteine ---------- */

export function meilensteinePruefen(ctx = {}) {
  const s = load();
  const neu = pruefeMeilensteine(s, { level: levelAus(s.xp), ...ctx });
  if (neu.length) save();
  return neu;
}

/* ---------- Fragen-Merkliste (Soundcheck) ---------- */

export function frageGestellt(id) {
  const s = load();
  s.recentQuestions = [...s.recentQuestions.filter((x) => x !== id), id].slice(-30);
  save();
}

/* ---------- Projekt (FUNKEN-Website) ---------- */

export function getProjekt() {
  return load().project;
}

export function projektSpeichern({ page, html, css, js, etappeId }) {
  const s = load();
  if (page && html != null) s.project.pages[page] = html;
  if (css != null) s.project.css = css;
  if (js != null) s.project.js = js;
  if (etappeId) s.project.etappen[etappeId] = Date.now();
  save();
}

export function projektZuruecksetzen() {
  const s = load();
  s.project = leerer().project;
  save();
}

/* ---------- Showtime (eigene Website) ---------- */

export function getShowtime() {
  return load().showtime;
}

export function showtimeSpeichern(daten) {
  const s = load();
  s.showtime = { ...s.showtime, ...daten };
  save();
}

/* ---------- Vorspann, Name ---------- */

export function introGesehen() {
  return load().intro.seen;
}

export function setIntroGesehen(v = true) {
  const s = load();
  s.intro.seen = v;
  save();
}

export function setVideoGesehen(v = true) {
  const s = load();
  s.intro.video = v;
  save();
}

export function setVideoKomplett(v = true) {
  const s = load();
  s.intro.komplett = v;
  s.intro.video = s.intro.video || v;
  save();
}

export function setName(name) {
  const s = load();
  s.name = String(name || '').slice(0, 30);
  save();
}

/* ---------- Story: Einleitungen, Vorstellungen, Seidra ---------- */

export function einleitungGesehen(chapterId) {
  return !!load().story.einleitungen[chapterId];
}

export function setEinleitungGesehen(chapterId) {
  const s = load();
  const erste = !s.story.einleitungen[chapterId];
  s.story.einleitungen[chapterId] = Date.now();
  save();
  return erste;
}

export function vorgestellt(figurId) {
  return !!load().story.vorgestellt[figurId];
}

export function setVorgestellt(figurId) {
  const s = load();
  s.story.vorgestellt[figurId] = Date.now();
  save();
}

export function seidraGesehen(key) {
  return !!load().story.seidra[key];
}

export function setSeidraGesehen(key) {
  const s = load();
  s.story.seidra[key] = Date.now();
  save();
}

/* ---------- Sichern & Laden ---------- */

export function exportSpielstand() {
  const s = load();
  s.stats.exports = (s.stats.exports || 0) + 1;
  save();
  return { app: 'WebWerkstatt', version: 3, exportedAt: new Date().toISOString(), spielstand: s };
}

export function importSpielstand(daten) {
  if (!daten || daten.app !== 'WebWerkstatt' || !daten.spielstand || typeof daten.spielstand !== 'object') {
    throw new Error('Das ist keine WebWerkstatt-Sicherungsdatei.');
  }
  state = migriere(daten.spielstand);
  save();
}

export function spielstandLoeschen() {
  state = leerer();
  save();
}
