// Soundtrack für den Vorspann – komplett synthetisch (kein Sample, keine Lizenzfrage).
// Erzeugt eine 16-Bit-Stereo-WAV-Datei, deterministisch, passend zum Storyboard:
//   0–12,6 s  Drone und Pads (Skyline)        12,6–25,6 s Spannung, Glitches, Riser (404 → Sam)
//   25,6 s    Impact „WEBCUP“, danach Beat     71,2–80,2 s Breakdown (Karte), Riser
//   80,2 s    Beat zurück (Anpfiff)            86,2 s Pfiff, Schluss-Akkord, Ausklang bis 92 s
// Aufruf: node scripts/intro-video/musik.mjs <ziel.wav>   (oder Import von erzeugeSoundtrack)

import fs from 'node:fs';

const SR = 44100;
const BPM = 112;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const DAUER = 92;
const BEAT_START = 25.6;
const PFIFF = 86.2;

const N = Math.ceil(SR * DAUER);
const L = new Float32Array(N);
const R = new Float32Array(N);

// Noten (Hz): A-Moll-Welt
const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12); // MIDI → Hz
const A1 = 33, A2 = 45, C2 = 36, C3 = 48, E2 = 40, E3 = 52, F1 = 29, F2 = 41, G1 = 31, G2 = 43, A3 = 57, C4 = 60, E4 = 64, G4 = 67, A4 = 69, B4 = 71, C5 = 72, D5 = 74, E5 = 76, F4 = 65, G5 = 79;

let seed = 7;
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };

function hinzu(t0, dauer, fn, { pan = 0, vol = 1 } = {}) {
  const start = Math.max(0, Math.floor(t0 * SR));
  const ende = Math.min(N, Math.floor((t0 + dauer) * SR));
  const gl = Math.min(1, 1 - pan) * vol;
  const gr = Math.min(1, 1 + pan) * vol;
  for (let i = start; i < ende; i++) {
    const t = (i - start) / SR;
    const v = fn(t, i / SR);
    L[i] += v * gl;
    R[i] += v * gr;
  }
}

const env = (t, a, d, s, r, dauer) => {
  if (t < a) return t / a;
  if (t < a + d) return 1 - (1 - s) * ((t - a) / d);
  if (t < dauer - r) return s;
  return Math.max(0, s * (1 - (t - (dauer - r)) / r));
};
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));
const sq = (ph) => (ph - Math.floor(ph) < 0.5 ? 1 : -1);
const tri = (ph) => 1 - 4 * Math.abs(Math.round(ph) - ph);

// Einpoliger Tiefpass als Hilfsfunktion für einen Ton (Zustand pro Note)
function lp(cutoff) {
  let y = 0;
  const a = 1 - Math.exp((-2 * Math.PI * cutoff) / SR);
  return (x) => (y += a * (x - y));
}

/* ---------- Instrumente ---------- */

function kick(t0, vol = 0.9) {
  hinzu(t0, 0.35, (t) => {
    // Frequenz-Sweep 192 → 42 Hz (integrierte Phase), dazu ein kurzer Klick
    return Math.sin(2 * Math.PI * (42 * t + (150 / 28) * (1 - Math.exp(-t * 28)))) * Math.exp(-t * 9) + (t < 0.01 ? (1 - t / 0.01) * 0.6 : 0);
  }, { vol });
}
function snare(t0, vol = 0.5) {
  const f1 = lp(5000);
  let hp = 0;
  hinzu(t0, 0.22, (t) => {
    const n = rnd() * 2 - 1;
    const tief = f1(n);
    hp = n - tief; // grober Hochpass
    return (hp * 0.9 + tief * 0.2) * Math.exp(-t * 18) + Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t * 30) * 0.5;
  }, { vol });
}
function hat(t0, offen = false, vol = 0.18) {
  const f1 = lp(6000);
  hinzu(t0, offen ? 0.28 : 0.06, (t) => {
    const n = rnd() * 2 - 1;
    return (n - f1(n)) * Math.exp(-t * (offen ? 12 : 60));
  }, { vol, pan: 0.25 });
}
function bass(t0, dauer, midi, vol = 0.38) {
  const f = NOTE(midi);
  const filt = lp(260 + 140 * Math.sin(t0));
  hinzu(t0, dauer, (t) => filt(saw(f * t) * 0.8 + saw(f * 1.004 * t) * 0.3 + Math.sin(2 * Math.PI * f * t) * 0.6) * env(t, 0.005, 0.08, 0.7, 0.05, dauer), { vol });
}
function pad(t0, dauer, noten, vol = 0.12, cutoff = 1400) {
  const filt = lp(cutoff);
  hinzu(t0, dauer, (t) => {
    let v = 0;
    for (const m of noten) {
      const f = NOTE(m);
      v += saw(f * t) + saw(f * 1.006 * t + 0.3) + saw(f * 0.994 * t + 0.6);
    }
    return filt(v / (noten.length * 3)) * env(t, 1.2, 0.5, 0.85, 1.4, dauer);
  }, { vol, pan: -0.15 });
}
function lead(t0, dauer, midi, vol = 0.1, pan = 0.3) {
  const f = NOTE(midi);
  const filt = lp(2400);
  hinzu(t0, dauer, (t) => filt(sq(f * t) * 0.5 + tri(f * 2 * t) * 0.5) * env(t, 0.004, 0.06, 0.55, 0.04, dauer), { vol, pan });
}
function pluck(t0, midi, vol = 0.14) {
  const f = NOTE(midi);
  hinzu(t0, 0.5, (t) => (Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2 * t) + 0.2 * Math.sin(2 * Math.PI * f * 3 * t)) * Math.exp(-t * 7), { vol, pan: -0.3 });
}
function glocke(t0, midi, vol = 0.16, dauer = 2.4) {
  const f = NOTE(midi);
  hinzu(t0, dauer, (t) => (Math.sin(2 * Math.PI * f * t) + 0.5 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t * 3) + 0.3 * Math.sin(2 * Math.PI * f * 5.4 * t) * Math.exp(-t * 5)) * Math.exp(-t * 1.6), { vol, pan: 0.2 });
}
function drone(t0, dauer, midi, vol = 0.14) {
  const f = NOTE(midi);
  const filt = lp(300);
  hinzu(t0, dauer, (t) => filt(saw(f * t) * 0.5 + saw(f * 1.003 * t) * 0.5 + Math.sin(2 * Math.PI * f * 0.5 * t) * 0.8) * env(t, 2.5, 1, 0.9, 2.5, dauer), { vol });
}
function rauschSweep(t0, dauer, von, bis, vol = 0.22) {
  let y = 0;
  hinzu(t0, dauer, (t) => {
    const p = t / dauer;
    const cut = von + (bis - von) * p * p;
    const a = 1 - Math.exp((-2 * Math.PI * cut) / SR);
    const n = rnd() * 2 - 1;
    y += a * (n - y);
    return y * (0.2 + 0.8 * p);
  }, { vol });
}
function impact(t0) {
  kick(t0, 1.0);
  hinzu(t0, 1.6, (t) => Math.sin(2 * Math.PI * 38 * t) * Math.exp(-t * 2.2), { vol: 0.8 });
  const f1 = lp(3000);
  hinzu(t0, 0.9, (t) => f1(rnd() * 2 - 1) * Math.exp(-t * 6), { vol: 0.5 });
}
function glitch(t0, dauer = 0.05, vol = 0.22) {
  const f = 400 + rnd() * 3000;
  const step = 1 / (2000 + rnd() * 6000);
  hinzu(t0, dauer, (t) => {
    const q = Math.floor(t / step) * step; // „Bitcrush“-Treppe
    return sq(f * q) * (rnd() < 0.8 ? 1 : 0);
  }, { vol, pan: rnd() * 1.2 - 0.6 });
}
function pfiff(t0) {
  hinzu(t0, 0.75, (t) => {
    const trill = 0.5 + 0.5 * Math.sin(2 * Math.PI * 26 * t);
    const vib = 1 + 0.004 * Math.sin(2 * Math.PI * 7 * t);
    const e = env(t, 0.01, 0.05, 0.9, 0.12, 0.75);
    return (Math.sin(2 * Math.PI * 2550 * vib * t) + 0.6 * Math.sin(2 * Math.PI * 2900 * vib * t) + 0.25 * Math.sin(2 * Math.PI * 5100 * t)) * (0.55 + 0.45 * trill) * e;
  }, { vol: 0.42 });
}
function tick(t0, vol = 0.12) {
  hinzu(t0, 0.03, (t) => sq(1800 * t) * Math.exp(-t * 90), { vol });
}

/* ---------- Harmonik ---------- */
// Akkordfolge je Takt: Am – F – C – G (Pad), Bass auf Grundtönen
const FOLGE = [
  { pad: [A3, C4, E4], bass: A1, arp: [A3, C4, E4, A4] },
  { pad: [F4 - 12, A3, C4], bass: F1, arp: [F4 - 12, A3, C4, F4] },
  { pad: [C4, E4, G4], bass: C2, arp: [C4, E4, G4, C5] },
  { pad: [G4 - 12, B4 - 12, D5 - 12], bass: G1, arp: [G4 - 12, B4 - 12, D5 - 12, G4] },
];

/* ---------- Abschnitt A: 0–12,6 s – Nacht, Drone, Pads ---------- */
drone(0, 13.5, A1, 0.16);
pad(0.5, 12.5, [A3, C4, E4], 0.09, 900);
rauschSweep(3.2, 0.9, 300, 3500, 0.08); // „wusch“ zur Skyline
pluck(4.4, A4, 0.07); pluck(6.4, E4, 0.06); pluck(8.6, C5, 0.06); pluck(10.6, A4, 0.07);
for (let i = 0; i < 6; i++) tick(4.4 + i * 1.07, 0.04);

/* ---------- Abschnitt B: 12,6–25,6 s – Spannung ---------- */
drone(12.0, 14.0, A1, 0.12);
for (let t = 12.6; t < 25.2; t += BEAT / 2) {
  const p = (t - 12.6) / 12.6;
  bass(t, BEAT / 2 - 0.02, (Math.floor((t - 12.6) / BAR) % 2 ? A1 : A1), 0.14 + 0.2 * p);
}
for (let t = 12.6; t < 25.2; t += BEAT) tick(t, 0.06 + 0.06 * ((t - 12.6) / 12.6));
[15.4, 15.75, 16.0, 16.2, 16.6, 17.1, 17.3, 17.9, 18.4].forEach((t) => glitch(t, 0.04 + rnd() * 0.06, 0.2));
rauschSweep(18.6, 7.0, 200, 9000, 0.28); // Riser bis zum Impact
hinzu(18.6, 7.0, (t) => Math.sin(2 * Math.PI * (160 + 520 * Math.pow(t / 7, 2)) * t) * (t / 7) * 0.5, { vol: 0.14 }); // steigender Ton
for (let t = 21.4; t < 25.5; t += BEAT / 4) hat(t, false, 0.05 + 0.1 * ((t - 21.4) / 4));
for (let t = 24.0; t < 25.5; t += BEAT / 8) snare(t, 0.12 + 0.3 * ((t - 24) / 1.5));

/* ---------- Abschnitt C: 25,6–71,2 s – Beat ---------- */
impact(BEAT_START);
function beatAbschnitt(von, bis, { kickVol = 0.9, snareVol = 0.5, hatVol = 0.16, leadVol = 0.09, bassVol = 0.36, mitDrums = true } = {}) {
  let bar = 0;
  for (let t = von; t < bis - 0.01; t += BAR, bar++) {
    const akk = FOLGE[bar % 4];
    pad(t, BAR + 0.3, akk.pad, 0.1, 1600);
    for (let b = 0; b < 4; b++) {
      const tb = t + b * BEAT;
      if (tb >= bis) break;
      if (mitDrums) {
        if (b === 0 || b === 2) kick(tb, kickVol);
        if (b === 1 || b === 3) snare(tb, snareVol);
        if (bar % 2 === 1 && b === 3) kick(tb + BEAT / 2, kickVol * 0.7);
        hat(tb, false, hatVol);
        hat(tb + BEAT / 2, b === 3, hatVol);
      }
      // Bass: Achtel, Oktavsprung auf der 2. Achtel
      bass(tb, BEAT / 2 - 0.02, akk.bass, bassVol);
      bass(tb + BEAT / 2, BEAT / 2 - 0.02, akk.bass + (b % 2 ? 12 : 0), bassVol * 0.8);
      // Arpeggio: Sechzehntel
      for (let s = 0; s < 4; s++) {
        const idx = (b * 4 + s) % akk.arp.length;
        lead(tb + s * (BEAT / 4), BEAT / 4 - 0.01, akk.arp[idx] + (bar % 4 === 3 && s % 2 ? 12 : 0), leadVol, s % 2 ? 0.35 : -0.2);
      }
    }
    // Fill alle 4 Takte: Snare-Roll im letzten Viertel
    if (mitDrums && bar % 4 === 3) for (let s = 0; s < 4; s++) snare(t + 3 * BEAT + s * (BEAT / 4), snareVol * (0.5 + s * 0.15));
  }
}
beatAbschnitt(BEAT_START, 71.2);
// Akzente auf Szenenwechsel
[29.6, 41.2, 52.2, 61.2].forEach((t) => { rauschSweep(t - 0.6, 0.6, 400, 6000, 0.1); kick(t, 1.0); });
// Glocken-Akzente für die Spielerkarte (61–71)
[62.4, 64.2, 65.1, 66.0].forEach((t, i) => glocke(t, [A4, C5, E5, A4 + 12][i], 0.12, 1.6));
for (let i = 0; i < 6; i++) pluck(67.8 + i * 0.5, [A4, B4, C5, D5, E5, G5][i], 0.12);

/* ---------- Abschnitt D: 71,2–80,2 s – Breakdown (Karte) ---------- */
beatAbschnitt(71.2, 80.2, { mitDrums: false, leadVol: 0.06, bassVol: 0.22 });
for (let t = 71.2; t < 80.0; t += BEAT / 2) hat(t, false, 0.07);
for (let i = 0; i < 18; i++) pluck(72.0 + i * 0.34, [A4, C5, E5][i % 3] + (i > 8 ? 12 : 0), 0.08); // Stationen leuchten
rauschSweep(76.2, 4.0, 300, 9000, 0.26);
for (let t = 78.0; t < 80.1; t += BEAT / 4) snare(t, 0.1 + 0.3 * ((t - 78) / 2));

/* ---------- Abschnitt E: 80,2–86,2 s – Anpfiff ---------- */
impact(80.2);
beatAbschnitt(80.2, PFIFF, { kickVol: 1.0, snareVol: 0.55, hatVol: 0.18, leadVol: 0.1, bassVol: 0.4 });
for (let t = 85.0; t < PFIFF; t += BEAT / 8) snare(t, 0.2 + 0.3 * ((t - 85) / 1.2));

/* ---------- Abschnitt F: 86,2 s – Pfiff, Schluss ---------- */
pfiff(PFIFF);
impact(PFIFF + 0.7);
pad(PFIFF + 0.7, 5.0, [A3, C4, E4, A4], 0.14, 2200);
drone(PFIFF + 0.7, 5.2, A1, 0.14);
glocke(88.8, A4, 0.16, 3.0); glocke(89.1, E5, 0.12, 3.0); glocke(89.4, A4 + 12, 0.1, 3.0);

/* ---------- Mix: weiches Clipping, Normalisieren, Fade-out, WAV ---------- */
export function erzeugeSoundtrack(ziel) {
  let peak = 0;
  for (let i = 0; i < N; i++) {
    L[i] = Math.tanh(L[i] * 1.1);
    R[i] = Math.tanh(R[i] * 1.1);
    const t = i / SR;
    const fade = t > DAUER - 1.6 ? Math.max(0, (DAUER - t) / 1.6) : 1;
    L[i] *= fade;
    R[i] *= fade;
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  const g = 0.89 / Math.max(peak, 0.0001);
  const buf = Buffer.alloc(44 + N * 4);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + N * 4, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(ziel, buf);
  return { dauer: DAUER, samples: N };
}

if (process.argv[1] && process.argv[1].endsWith('musik.mjs')) {
  const ziel = process.argv[2] || 'soundtrack.wav';
  const info = erzeugeSoundtrack(ziel);
  console.log(`Soundtrack geschrieben: ${ziel} (${info.dauer} s)`);
}
