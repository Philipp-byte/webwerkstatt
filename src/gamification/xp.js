// XP und Level. Zahlen siehe docs/DIDAKTIK.md Abschnitt 6.

export const XP = {
  quiz: 10,
  fill: 10,
  bug: 10,
  order: 15,
  pair: 15,
  code: 30,
  fix: 25,
  etappe: 40,
  lektion: 50,
  lektionPerfekt: 25,
  soundcheck: 5,
  abnahme: 150,
  abnahmePerfekt: 50,
  hinterhalt: 10, // je Runde, dazu je Stern:
  hinterhaltStern: 5,
};

export function xpFuerLevel(level) {
  return level <= 1 ? 0 : Math.round(100 * Math.pow(level - 1, 1.5));
}

export function levelAus(xp) {
  let level = 1;
  while (xpFuerLevel(level + 1) <= xp && level < 99) level++;
  return level;
}

export function levelFortschritt(xp) {
  const level = levelAus(xp);
  const start = xpFuerLevel(level);
  const ende = xpFuerLevel(level + 1);
  return { level, start, ende, anteil: Math.min(1, (xp - start) / Math.max(1, ende - start)), fehlt: Math.max(0, ende - xp) };
}
