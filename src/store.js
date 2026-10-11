// Der Spielstand: alles in EINEM localStorage-Eintrag, kein Konto, kein Server.
// Sichern/Laden als JSON-Datei (Spielerkarte). Die Views ändern den Zustand nur über
// die Funktionen hier, damit XP, Abzeichen und Leitner konsistent bleiben.

import { XP, levelAus, rangAus, comboFaktor } from './gamification/xp.js';
import { pruefeAbzeichen } from './gamification/badges.js';
import { lerneKonzepte } from './gamification/leitner.js';

const KEY = 'webwerkstatt2.spielstand.v1';
const LEHRKRAFT_KEY = 'webwerkstatt2.lehrkraft';
const SETTINGS_KEY = 'webwerkstatt2.einstellungen';

function leerer() {
  return {
    version: 2,
    name: '',
    xp: 0,
    lessons: {},
    granted: {},
    boss: {},
    badges: {},
    leitner: {},
    lessonCounter: 0,
    recentQuestions: [],
    backstage: { highscores: { blitz: 0, jagd: 0, aufbau: 0 }, tag: '', xpHeute: 0 },
    stats: { correct: 0, wrong: 0, codePassed: 0, hintsUsed: 0, longestCombo: 0, comebacks: 0, soundcheckCorrect: 0, exports: 0, minuten: 0, lastActive: null, firstActive: null },
    project: { pages: {}, css: null, js: null, etappen: {} },
    showtime: { html: null, css: null, js: null, pflichtErfuellt: false },
    solutions: {},
    intro: { seen: false, video: false },
    // Story-Schicht: gesehene Zwischenspiele (anpfiff/funk/abpfiff je Runde) und gesammelte Trophäenkarten
    story: { gesehen: {}, karten: {} },
    // Tages-Serie: an wie vielen Tagen in Folge gespielt wurde
    streak: { tage: 0, letzter: '', beste: 0 },
    // Zähler für das heutige Tagesziel
    tag: { datum: '', lektionen: 0, soundcheck: 0, training: 0, szenen: 0, bonus: false },
  };
}

let state = null;
const listener = new Set();

function migriere(s) {
  const basis = leerer();
  const out = { ...basis, ...s };
  for (const k of Object.keys(basis)) {
    if (typeof basis[k] === 'object' && basis[k] !== null && !Array.isArray(basis[k])) {
      out[k] = { ...basis[k], ...(s?.[k] || {}) };
    }
  }
  out.backstage.highscores = { ...basis.backstage.highscores, ...(s?.backstage?.highscores || {}) };
  out.stats = { ...basis.stats, ...(s?.stats || {}) };
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

// Vergibt XP; mit `key` nur einmal. Liefert die vergebene Menge und Level-/Rangwechsel.
export function vergibXp(betrag, { key = null, serie = 0 } = {}) {
  const s = load();
  if (key && s.granted[key]) return { xp: 0, levelup: null, rangup: null };
  const menge = Math.round(betrag * comboFaktor(serie));
  const levelVorher = levelAus(s.xp);
  const rangVorher = rangAus(s.xp);
  s.xp += menge;
  if (key) s.granted[key] = true;
  const levelNachher = levelAus(s.xp);
  const rangNachher = rangAus(s.xp);
  save();
  return {
    xp: menge,
    levelup: levelNachher > levelVorher ? levelNachher : null,
    rangup: rangNachher.id !== rangVorher.id ? rangNachher : null,
  };
}

export function xpBackstage(betrag) {
  const s = load();
  if (s.backstage.tag !== heute()) {
    s.backstage.tag = heute();
    s.backstage.xpHeute = 0;
  }
  const frei = Math.max(0, XP.backstageTagesdeckel - s.backstage.xpHeute);
  const menge = Math.min(frei, betrag);
  s.backstage.xpHeute += menge;
  save();
  if (!menge) return { xp: 0, levelup: null, rangup: null, gedeckelt: true };
  return { ...vergibXp(menge), gedeckelt: menge < betrag };
}

/* ---------- Statistik ---------- */

export function zaehle(feld, n = 1) {
  const s = load();
  s.stats[feld] = (s.stats[feld] || 0) + n;
  s.stats.lastActive = Date.now();
  if (!s.stats.firstActive) s.stats.firstActive = Date.now();
  save();
}

export function merkeCombo(serie) {
  const s = load();
  if (serie > (s.stats.longestCombo || 0)) {
    s.stats.longestCombo = serie;
    save();
  }
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
  tagZaehlen(s, 'lektionen');
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

/* ---------- Abnahme ---------- */

export function abnahmeSpeichern(chapterId, { anteil, passed }) {
  const s = load();
  const alt = s.boss[chapterId] || { best: 0, passed: false, versuche: 0 };
  s.boss[chapterId] = {
    best: Math.max(alt.best, anteil),
    passed: alt.passed || passed,
    versuche: alt.versuche + 1,
    at: Date.now(),
  };
  if (passed) {
    streakFortschreiben(s);
    // Trophäenkarte der besiegten Crew kommt in die Sammlung
    if (!s.story.karten[chapterId]) s.story.karten[chapterId] = Date.now();
  }
  save();
  return s.boss[chapterId];
}

export function getAbnahme(chapterId) {
  return load().boss[chapterId] || null;
}

/* ---------- Abzeichen ---------- */

export function abzeichenPruefen(ctx = {}) {
  const s = load();
  const neu = pruefeAbzeichen(s, { level: levelAus(s.xp), ...ctx });
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

/* ---------- Intro, Name ---------- */

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

export function setName(name) {
  const s = load();
  s.name = String(name || '').slice(0, 30);
  save();
}

/* ---------- Tages-Serie (Streak) und Tagesziel ---------- */

function gestern() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Zählt den heutigen Tag als gespielt; Tage in Folge ergeben die Serie.
function streakFortschreiben(s) {
  const h = heute();
  if (s.streak.letzter === h) return s.streak;
  s.streak.tage = s.streak.letzter === gestern() ? s.streak.tage + 1 : 1;
  s.streak.letzter = h;
  s.streak.beste = Math.max(s.streak.beste || 0, s.streak.tage);
  return s.streak;
}

function tagZaehlen(s, feld, n = 1) {
  const h = heute();
  if (s.tag.datum !== h) s.tag = { datum: h, lektionen: 0, soundcheck: 0, training: 0, szenen: 0, bonus: false };
  s.tag[feld] = (s.tag[feld] || 0) + n;
  streakFortschreiben(s);
}

// Von außen: Aktivität melden (soundcheck, training, szenen). Lektionen und Matches zählen automatisch.
export function aktivitaet(feld, n = 1) {
  const s = load();
  tagZaehlen(s, feld, n);
  save();
  return { streak: s.streak, tag: s.tag };
}

export function getStreak() {
  const s = load();
  // Serie ist nur „lebendig“, wenn heute oder gestern gespielt wurde
  const lebendig = s.streak.letzter === heute() || s.streak.letzter === gestern();
  return { ...s.streak, aktiv: lebendig ? s.streak.tage : 0, heuteGespielt: s.streak.letzter === heute() };
}

export const TAGESZIEL = [
  { id: 'lektionen', ziel: 1, titel: 'Eine Lektion abschließen', icon: '🏁' },
  { id: 'soundcheck', ziel: 3, titel: 'Drei Soundcheck-Fragen richtig', icon: '🎚️' },
  { id: 'extra', ziel: 1, titel: 'Ein Zwischenspiel oder eine Trainings-Runde', icon: '🎬' },
];
export const TAGESZIEL_XP = 60;

export function getTagesziel() {
  const s = load();
  const t = s.tag.datum === heute() ? s.tag : { lektionen: 0, soundcheck: 0, training: 0, szenen: 0, bonus: false };
  const stand = TAGESZIEL.map((z) => {
    const wert = z.id === 'extra' ? (t.szenen || 0) + (t.training || 0) : t[z.id] || 0;
    return { ...z, wert: Math.min(wert, z.ziel), erfuellt: wert >= z.ziel };
  });
  return { stand, alle: stand.every((z) => z.erfuellt), bonus: !!t.bonus };
}

// Tagesbonus auszahlen, wenn alle drei Ziele erfüllt sind (einmal pro Tag).
export function tagesbonusPruefen() {
  const s = load();
  const z = getTagesziel();
  if (!z.alle || z.bonus || s.tag.datum !== heute()) return null;
  s.tag.bonus = true;
  s.stats.tagesziele = (s.stats.tagesziele || 0) + 1;
  save();
  return vergibXp(TAGESZIEL_XP);
}

/* ---------- Story: Zwischenspiele und Trophäenkarten ---------- */

export function szeneGesehen(id) {
  return !!load().story.gesehen[id];
}

export function setSzeneGesehen(id) {
  const s = load();
  const erste = !s.story.gesehen[id];
  s.story.gesehen[id] = Date.now();
  if (erste) tagZaehlen(s, 'szenen');
  save();
  return erste;
}

export function getKarten() {
  return load().story.karten;
}

/* ---------- Sichern & Laden ---------- */

export function exportSpielstand() {
  const s = load();
  s.stats.exports = (s.stats.exports || 0) + 1;
  save();
  return { app: 'WebWerkstatt', version: 2, exportedAt: new Date().toISOString(), spielstand: s };
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
