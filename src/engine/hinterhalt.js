// Hinterhalte: fünf kurze Spiele zur Wiederholung, 60–90 Sekunden, eine Geste.
// Die Aufgaben kommen aus den Pools der befreiten Orte (plus abgeschlossene Lektionen des
// aktuellen), fällige Leitner-Konzepte zuerst. Diese Datei kennt die Spiele und wählt
// die Aufgaben; die Ansicht (hinterhalt-view.js) spielt sie.

import { loadAlleKapitel, poolFuer } from '../content.js';
import { getState } from '../store.js';
import { faellig } from '../gamification/leitner.js';

export const SPIELE = [
  { id: 'knotenjagd', icon: '🕷️', titel: 'Knotenjagd', typ: 'bug', runden: 8, zeit: 60, text: 'Eine Zeile hat den Knoten. Tipp sie an.', angriff: 'schleust Knoten in den Code' },
  { id: 'brueckenbau', icon: '🌉', titel: 'Brückenbau', typ: 'order', runden: 5, zeit: 90, text: 'Bring die Bausteine in die richtige Reihenfolge.', angriff: 'zerlegt die Brücke in Bausteine' },
  { id: 'wahr-oder-luege', icon: '👉', titel: 'Wahr oder Lüge', typ: 'quiz', runden: 12, zeit: 60, text: 'Stimmt die Aussage? Wahr oder Lüge.', angriff: 'streut Lügen ins Netz' },
  { id: 'runenpaare', icon: '🔮', titel: 'Runenpaare', typ: 'pair', runden: 3, zeit: 90, text: 'Finde die Paare: erst links, dann rechts.', angriff: 'verschlüsselt die Runen' },
  { id: 'faeden-flicken', icon: '🧵', titel: 'Fäden flicken', typ: 'fill', runden: 8, zeit: 90, text: 'Setz das fehlende Wort ein.', angriff: 'reißt Fäden aus dem Code' },
];

export function spiel(id) {
  return SPIELE.find((s) => s.id === id) || null;
}

function mische(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

// Kapitel, deren Aufgaben im Hinterhalt vorkommen dürfen: alle befreiten Orte und
// der aktuelle bis zur letzten abgeschlossenen Lektion (nurKapitel: nur dieses Kapitel = Sturm)
export async function kapitelFuerHinterhalt(chapterId, { nurKapitel = false } = {}) {
  const s = getState();
  const alle = await loadAlleKapitel();
  if (nurKapitel) return [chapterId];
  const ids = alle.filter((k) => k.id === chapterId || s.boss[k.id]?.passed || k.lessons.some((l) => s.lessons[`${k.id}/${l}`]?.done)).map((k) => k.id);
  return ids.length ? ids : [alle[0].id];
}

/**
 * aufgabenFuer(spielId, chapterId, { nurKapitel }) → Liste von Pool-Aufgaben für dieses Spiel,
 * fällige Konzepte zuerst, dann gemischt. Bei zu wenig Vorrat: leer (die Ansicht weicht aus).
 */
export async function aufgabenFuer(spielId, chapterId, { nurKapitel = false } = {}) {
  const sp = spiel(spielId);
  if (!sp) return [];
  const s = getState();
  const ids = await kapitelFuerHinterhalt(chapterId, { nurKapitel });
  const pool = await poolFuer(ids);
  const passend = pool.filter((f) => f.type === sp.typ && (!nurKapitel || f.chapter === chapterId));
  const dringend = new Set(faellig(s));
  const vorne = mische(passend.filter((f) => dringend.has(f.konzept) && !s.recentQuestions.includes(f.id)));
  const hinten = mische(passend.filter((f) => !vorne.includes(f)));
  const liste = [...vorne, ...hinten];
  const anzahl = sp.typ === 'quiz' ? sp.runden : sp.runden;
  return liste.slice(0, Math.max(anzahl, Math.min(liste.length, anzahl)));
}

// Spiel mit genug Vorrat finden (Wunsch zuerst, dann die anderen)
export async function spielMitVorrat(wunschId, chapterId, opts = {}) {
  const reihenfolge = [spiel(wunschId), ...SPIELE.filter((s) => s.id !== wunschId)].filter(Boolean);
  for (const sp of reihenfolge) {
    const aufgaben = await aufgabenFuer(sp.id, chapterId, opts);
    const minimum = sp.typ === 'pair' ? 1 : 3;
    if (aufgaben.length >= minimum) return { spiel: sp, aufgaben };
  }
  return { spiel: null, aufgaben: [] };
}

// „Wahr oder Lüge“: aus einer Quizfrage eine wahre oder falsche Aussage bauen
export function aussageAus(frage, wahr) {
  const options = frage.options || [];
  const richtig = options[frage.correct];
  const falsche = options.filter((_, i) => i !== frage.correct);
  const antwort = wahr ? richtig : falsche[Math.floor(Math.random() * falsche.length)] ?? richtig;
  return { frage: frage.question, antwort, wahr: wahr || antwort === richtig, erklaerung: frage.explanation || '', konzept: frage.konzept, id: frage.id };
}

// Sterne aus Trefferquote: ab 90 % drei, ab 70 % zwei, ab 40 % einer
export function sterneFuer(richtig, gesamt) {
  if (!gesamt) return 0;
  const q = richtig / gesamt;
  return q >= 0.9 ? 3 : q >= 0.7 ? 2 : q >= 0.4 ? 1 : 0;
}
