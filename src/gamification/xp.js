// XP, Level und Ränge. Zahlen siehe docs/DIDAKTIK.md Abschnitt 6.

export const XP = {
  quiz: 10,
  fill: 10,
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
  blitz: 5,
  jagd: 10,
  aufbau: 15,
  backstageTagesdeckel: 150,
};

export const RAENGE = [
  { id: 'praktikum', titel: 'Praktikum', ab: 0, icon: '🪪' },
  { id: 'junior', titel: 'Junior', ab: 1500, icon: '🔧' },
  { id: 'developer', titel: 'Developer', ab: 4500, icon: '💻' },
  { id: 'senior', titel: 'Senior', ab: 9000, icon: '🛠️' },
  { id: 'lead', titel: 'Lead', ab: 15000, icon: '🎛️' },
  { id: 'legende', titel: 'Werkstatt-Legende', ab: 22000, icon: '🏆' },
];

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

export function rangAus(xp) {
  let r = RAENGE[0];
  for (const rang of RAENGE) if (xp >= rang.ab) r = rang;
  return r;
}

export function naechsterRang(xp) {
  return RAENGE.find((r) => r.ab > xp) || null;
}

export function comboFaktor(serie) {
  if (serie >= 6) return 1.5;
  if (serie >= 3) return 1.25;
  return 1;
}
