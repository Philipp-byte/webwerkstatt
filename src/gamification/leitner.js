// Verteilte Wiederholung nach Leitner: Konzepte wandern durch Boxen 1–5,
// die Wartezeit wächst (in Lektions-Abschlüssen gemessen).

const INTERVALLE = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };

export function lerneKonzepte(state, ids) {
  for (const id of ids) {
    if (!state.leitner[id]) state.leitner[id] = { box: 1, due: state.lessonCounter + 1, seen: 0, ok: 0 };
  }
}

export function antwort(state, id, richtig) {
  const k = state.leitner[id] || (state.leitner[id] = { box: 1, due: state.lessonCounter, seen: 0, ok: 0 });
  k.seen++;
  if (richtig) {
    k.ok++;
    k.box = Math.min(5, k.box + 1);
    k.due = state.lessonCounter + INTERVALLE[k.box];
  } else {
    k.box = 1;
    k.due = state.lessonCounter;
  }
}

// Fällige Konzepte, dringendste zuerst (niedrige Box, dann längste Wartezeit).
export function faellig(state) {
  return Object.entries(state.leitner)
    .filter(([, k]) => k.due <= state.lessonCounter)
    .sort((a, b) => a[1].box - b[1].box || a[1].due - b[1].due)
    .map(([id]) => id);
}

export function gelernt(state) {
  return Object.keys(state.leitner);
}

// Wählt bis zu n Konzepte für den Soundcheck: fällige zuerst, dann zufällig gelernte.
export function soundcheckAuswahl(state, n = 3) {
  const f = faellig(state);
  const ergebnis = f.slice(0, n);
  if (ergebnis.length < n) {
    const rest = gelernt(state).filter((id) => !ergebnis.includes(id));
    while (ergebnis.length < n && rest.length) {
      const i = Math.floor(Math.random() * rest.length);
      ergebnis.push(rest.splice(i, 1)[0]);
    }
  }
  return ergebnis;
}

export function sicherheit(state, ids) {
  // Anteil der Konzepte in Box >= 4 unter den gegebenen IDs
  const bekannt = ids.filter((id) => state.leitner[id]);
  if (!bekannt.length) return 0;
  return bekannt.filter((id) => state.leitner[id].box >= 4).length / ids.length;
}
