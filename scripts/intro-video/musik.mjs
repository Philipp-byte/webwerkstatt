// Soundtrack für den Vorspann SCHATTENNETZ – komplett synthetisch (kein Sample, keine Lizenzfrage).
// Erzeugt eine 16-Bit-Stereo-WAV-Datei, deterministisch, passend zum Storyboard (74 s, 100 BPM):
//    0–12,8 s  Weberei: Drone in d-Moll, Spieluhr-Töne, langsamer Herzschlag
//   12,8–22,2 s Webstuhl: die Fäden leuchten auf (aufsteigende Plucks), Riser, warmer Impact „Tor“
//   22,2–34,0 s Hyperia: heller Beat, Arpeggio, Glocken für die Regionen
//   34,0–50,6 s Seidra: Beat bricht ab, Dissonanz, Krabbeln, großer Impact (37 s), düsterer Halftime-Beat,
//               absteigende Töne (Lichter gehen aus), neun Glitches (Gespinste), Riss (50,2 s)
//   50,2–62,2 s Werkstatt: warme Dur-Fläche, fünf Glocken (das Team), Riser bis zum Titel
//   62,2–70,6 s Titel-Impact (63 s), voller Beat, Stinger „Los.“ (69,2 s)
//   70–74 s     Ausklang
// Aufruf: node scripts/intro-video/musik.mjs <ziel.wav>   (oder Import von erzeugeSoundtrack)

import fs from 'node:fs';

const SR = 44100;
const BPM = 100;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const DAUER = 74;
const TOR = 19.8;
const HYPERIA = 22.2;
const SEIDRA = 34.0;
const IMPACT = 37.0;
const RISS = 50.2;
const TITEL = 63.0;
const LOS = 69.2;

const N = Math.ceil(SR * DAUER);
const L = new Float32Array(N);
const R = new Float32Array(N);

// MIDI → Hz; Welt in d-Moll
const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12);
const D1 = 26, Eb1 = 27, A1 = 33, Bb1 = 34, C2 = 36, D2 = 38, F2 = 41, G2 = 43, A2 = 45, Bb2 = 46, C3 = 48, D3 = 50, Eb3 = 51, F3 = 53, G3 = 55, A3 = 57, Bb3 = 58, C4 = 60, D4 = 62, Eb4 = 63, E4 = 64, F4 = 65, G4 = 67, A4 = 69, Bb4 = 70, C5 = 72, D5 = 74, Eb5 = 75, E5 = 76, F5 = 77, G5 = 79, A5 = 81, D6 = 86;

let seed = 11;
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

function lp(cutoff) {
  let y = 0;
  const a = 1 - Math.exp((-2 * Math.PI * cutoff) / SR);
  return (x) => (y += a * (x - y));
}

/* ---------- Instrumente ---------- */

function kick(t0, vol = 0.9) {
  hinzu(t0, 0.38, (t) => Math.sin(2 * Math.PI * (40 * t + (150 / 26) * (1 - Math.exp(-t * 26)))) * Math.exp(-t * 8.5) + (t < 0.01 ? (1 - t / 0.01) * 0.6 : 0), { vol });
}
function snare(t0, vol = 0.5) {
  const f1 = lp(5000);
  hinzu(t0, 0.24, (t) => {
    const n = rnd() * 2 - 1;
    const tief = f1(n);
    return ((n - tief) * 0.9 + tief * 0.2) * Math.exp(-t * 17) + Math.sin(2 * Math.PI * 180 * t) * Math.exp(-t * 28) * 0.5;
  }, { vol });
}
function hat(t0, offen = false, vol = 0.18, pan = 0.25) {
  const f1 = lp(6000);
  hinzu(t0, offen ? 0.28 : 0.06, (t) => { const n = rnd() * 2 - 1; return (n - f1(n)) * Math.exp(-t * (offen ? 12 : 60)); }, { vol, pan });
}
function bass(t0, dauer, midi, vol = 0.38, cutoff = 260) {
  const f = NOTE(midi);
  const filt = lp(cutoff);
  hinzu(t0, dauer, (t) => filt(saw(f * t) * 0.8 + saw(f * 1.004 * t) * 0.3 + Math.sin(2 * Math.PI * f * t) * 0.6) * env(t, 0.005, 0.08, 0.7, 0.05, dauer), { vol });
}
function pad(t0, dauer, noten, vol = 0.12, cutoff = 1400, { a = 1.2, r = 1.4 } = {}) {
  const filt = lp(cutoff);
  hinzu(t0, dauer, (t) => {
    let v = 0;
    for (const m of noten) {
      const f = NOTE(m);
      v += saw(f * t) + saw(f * 1.006 * t + 0.3) + saw(f * 0.994 * t + 0.6);
    }
    return filt(v / (noten.length * 3)) * env(t, a, 0.5, 0.85, r, dauer);
  }, { vol, pan: -0.15 });
}
function lead(t0, dauer, midi, vol = 0.1, pan = 0.3) {
  const f = NOTE(midi);
  const filt = lp(2400);
  hinzu(t0, dauer, (t) => filt(sq(f * t) * 0.5 + tri(f * 2 * t) * 0.5) * env(t, 0.004, 0.06, 0.55, 0.04, dauer), { vol, pan });
}
function pluck(t0, midi, vol = 0.14, pan = -0.3) {
  const f = NOTE(midi);
  hinzu(t0, 0.5, (t) => (Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2 * t) + 0.2 * Math.sin(2 * Math.PI * f * 3 * t)) * Math.exp(-t * 7), { vol, pan });
}
// Spieluhr: hell, lange ausklingend
function glocke(t0, midi, vol = 0.16, dauer = 2.4, pan = 0.2) {
  const f = NOTE(midi);
  hinzu(t0, dauer, (t) => (Math.sin(2 * Math.PI * f * t) + 0.5 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t * 3) + 0.3 * Math.sin(2 * Math.PI * f * 5.4 * t) * Math.exp(-t * 5)) * Math.exp(-t * 1.6), { vol, pan });
}
function drone(t0, dauer, midi, vol = 0.14, cutoff = 300) {
  const f = NOTE(midi);
  const filt = lp(cutoff);
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
function impact(t0, { groesse = 1 } = {}) {
  kick(t0, 1.0);
  hinzu(t0, 1.8 * groesse, (t) => Math.sin(2 * Math.PI * 36 * t) * Math.exp(-t * 2.0), { vol: 0.85 });
  const f1 = lp(3000);
  hinzu(t0, 1.0 * groesse, (t) => f1(rnd() * 2 - 1) * Math.exp(-t * 5.5), { vol: 0.5 });
}
function glitch(t0, dauer = 0.05, vol = 0.22) {
  const f = 400 + rnd() * 3000;
  const step = 1 / (2000 + rnd() * 6000);
  hinzu(t0, dauer, (t) => { const q = Math.floor(t / step) * step; return sq(f * q) * (rnd() < 0.8 ? 1 : 0); }, { vol, pan: rnd() * 1.2 - 0.6 });
}
function tick(t0, vol = 0.12) {
  hinzu(t0, 0.03, (t) => sq(1800 * t) * Math.exp(-t * 90), { vol });
}
// Krabbeln: schnelle, trockene Klicks, die durchs Stereobild wandern (Spinnenbeine)
function krabbeln(t0, dauer, vol = 0.1) {
  let t = t0;
  while (t < t0 + dauer) {
    const p = (t - t0) / dauer;
    hinzu(t, 0.02, (tt) => (rnd() * 2 - 1) * Math.exp(-tt * 260), { vol: vol * (0.4 + 0.6 * p), pan: Math.sin(t * 9) * 0.8 });
    t += 0.035 + rnd() * 0.09 * (1 - p);
  }
}
// Riss: ein Faden reißt – Rauschstoß mit fallender Tonhöhe, danach ein gedämpfter Nachhall
function riss(t0) {
  rauschSweep(t0, 0.5, 6000, 300, 0.4);
  hinzu(t0, 1.2, (t) => Math.sin(2 * Math.PI * (420 * Math.exp(-t * 3) + 60) * t) * Math.exp(-t * 4), { vol: 0.35 });
  snare(t0 + 0.02, 0.45);
}

/* ---------- Harmonik ---------- */
const DM = { pad: [D3, F3, A3], bass: D1, arp: [D4, F4, A4, D5] };
const BB = { pad: [Bb2, D3, F3], bass: Bb1, arp: [Bb3, D4, F4, Bb4] };
const FD = { pad: [F3, A3, C4], bass: F2 - 12, arp: [F4, A4, C5, F5] };
const CD = { pad: [E4 - 12, G3, C4], bass: C2, arp: [C4, E4, G4, C5] };
const GM = { pad: [G3, Bb3, D4], bass: G2 - 12, arp: [G4, Bb4, D5, G5] };

function beatAbschnitt(von, bis, folge, { kickVol = 0.9, snareVol = 0.5, hatVol = 0.16, leadVol = 0.09, bassVol = 0.36, padVol = 0.1, mitDrums = true, halftime = false, cutoff = 260 } = {}) {
  let bar = 0;
  for (let t = von; t < bis - 0.01; t += BAR, bar++) {
    const akk = folge[bar % folge.length];
    pad(t, BAR + 0.3, akk.pad, padVol, 1600);
    for (let b = 0; b < 4; b++) {
      const tb = t + b * BEAT;
      if (tb >= bis) break;
      if (mitDrums) {
        if (halftime) {
          if (b === 0) kick(tb, kickVol);
          if (b === 2) { snare(tb, snareVol); kick(tb + BEAT / 2, kickVol * 0.8); }
          for (let s = 0; s < 4; s++) hat(tb + s * (BEAT / 4), false, hatVol * (s % 2 ? 0.5 : 1) * (0.6 + 0.4 * rnd()), Math.sin(tb * 7) * 0.7);
        } else {
          if (b === 0 || b === 2) kick(tb, kickVol);
          if (b === 1 || b === 3) snare(tb, snareVol);
          if (bar % 2 === 1 && b === 3) kick(tb + BEAT / 2, kickVol * 0.7);
          hat(tb, false, hatVol);
          hat(tb + BEAT / 2, b === 3, hatVol);
        }
      }
      bass(tb, BEAT / 2 - 0.02, akk.bass, bassVol, cutoff);
      bass(tb + BEAT / 2, BEAT / 2 - 0.02, akk.bass + (b % 2 ? 12 : 0), bassVol * 0.8, cutoff);
      if (leadVol > 0) for (let s = 0; s < 4; s++) {
        const idx = (b * 4 + s) % akk.arp.length;
        lead(tb + s * (BEAT / 4), BEAT / 4 - 0.01, akk.arp[idx] + (bar % 4 === 3 && s % 2 ? 12 : 0), leadVol, s % 2 ? 0.35 : -0.2);
      }
    }
    if (mitDrums && !halftime && bar % 4 === 3) for (let s = 0; s < 4; s++) snare(t + 3 * BEAT + s * (BEAT / 4), snareVol * (0.5 + s * 0.15));
  }
}

/* ---------- A: 0–12,8 s – Die alte Weberei ---------- */
drone(0, 14.5, D1, 0.16, 260);
pad(0.6, 13.0, [D3, F3, A3], 0.07, 700, { a: 2.5 });
[[4.4, D5], [6.0, A4], [7.6, F5], [9.2, D5], [10.8, E5], [12.0, D5]].forEach(([t, n]) => glocke(t, n, 0.07, 2.8, 0.3));
for (let t = 6.0; t < 12.8; t += BAR) kick(t, 0.22);
for (let i = 0; i < 14; i++) tick(4.0 + i * 0.63 + rnd() * 0.1, 0.03);

/* ---------- B: 12,8–22,2 s – Der Große Webstuhl ---------- */
drone(12.0, 11.0, D1, 0.13, 260);
pad(13.0, 7.0, [D3, F3, A3, D4], 0.08, 900, { a: 1.5 });
// Die Fäden leuchten auf: 28 Plucks, aufsteigend durch d-Moll
const TONLEITER = [D4, E4, F4, G4, A4, Bb4, C5, D5, E5, F5, G5, A5, Bb4 + 12, C5 + 12];
for (let i = 0; i < 28; i++) pluck(14.0 + i * 0.09, TONLEITER[i % TONLEITER.length] + (i >= 14 ? 12 : 0), 0.06 + 0.004 * i, Math.sin(i) * 0.6);
for (let t = 15.6; t < 19.6; t += BEAT / 2) pluck(t, [D5, A4, F5, D5][Math.round((t - 15.6) / (BEAT / 2)) % 4], 0.07);
rauschSweep(17.4, 2.4, 300, 8000, 0.2);
hinzu(17.4, 2.4, (t) => Math.sin(2 * Math.PI * (120 + 400 * Math.pow(t / 2.4, 2)) * t) * (t / 2.4) * 0.5, { vol: 0.1 });
// Das Tor öffnet sich (19,8 s): warmer Impact, F-Dur-Fläche, Glocken-Schimmer
impact(TOR, { groesse: 0.8 });
pad(TOR, 3.4, [F3, A3, C4, F4], 0.14, 2200, { a: 0.3 });
[[0.0, A5], [0.25, C5 + 12], [0.5, F5 + 12], [0.8, A5], [1.2, C5 + 12], [1.7, F5 + 12]].forEach(([d, n]) => glocke(TOR + d, n, 0.1, 2.2, 0.4 - d * 0.4));

/* ---------- C: 22,2–34,0 s – Hyperia ---------- */
beatAbschnitt(HYPERIA, SEIDRA, [FD, CD, DM, BB], { kickVol: 0.7, snareVol: 0.3, hatVol: 0.14, leadVol: 0.08, bassVol: 0.3, padVol: 0.11 });
[[23.0, A4], [23.7, C5], [27.6, E5], [29.8, G5], [31.8, A5]].forEach(([t, n]) => glocke(t, n, 0.12, 1.8));
for (let i = 0; i < 10; i++) pluck(30.2 + i * 0.18, [D5, F5, A5, D6][i % 4], 0.07, 0.4 - i * 0.08);

/* ---------- D: 34,0–50,6 s – Seidra ---------- */
drone(SEIDRA - 0.3, 17.0, D1, 0.15, 220);
drone(SEIDRA, 16.6, Eb1, 0.07, 160); // Dissonanz
hinzu(SEIDRA, 3.0, (t) => Math.sin(2 * Math.PI * 30 * t) * (0.4 + 0.6 * Math.sin(t * 2.5)), { vol: 0.18 });
krabbeln(SEIDRA + 0.3, 2.6, 0.12);
glocke(SEIDRA + 0.8, Eb5, 0.1, 2.4, -0.3);
glocke(SEIDRA + 1.5, D5, 0.08, 2.4, 0.3);
glocke(SEIDRA + 1.8, Eb5, 0.1, 2.4, -0.1);
rauschSweep(SEIDRA + 1.0, 2.0, 200, 9000, 0.3);
hinzu(SEIDRA + 1.0, 2.0, (t) => Math.sin(2 * Math.PI * (90 + 600 * Math.pow(t / 2, 2)) * t) * (t / 2) * 0.5, { vol: 0.16 });
// Großer Impact: Seidra steigt auf
impact(IMPACT, { groesse: 1.4 });
[0.05, 0.13, 0.22, 0.31, 0.45, 0.6].forEach((d) => glitch(IMPACT + d, 0.04 + rnd() * 0.05, 0.22));
beatAbschnitt(IMPACT + 0.2, RISS - 0.4, [{ pad: [D3, Eb3 + 12, A3], bass: D1, arp: [] }, { pad: [D3, F3, Bb3], bass: Bb1, arp: [] }], { halftime: true, kickVol: 1.0, snareVol: 0.45, hatVol: 0.09, leadVol: 0, bassVol: 0.42, padVol: 0.09, cutoff: 180 });
// Motiv kleine Sekunde: D – Eb – D – A
for (let t = IMPACT + 0.2; t < 44.0; t += BAR) [[0, D3], [BEAT, Eb3], [2 * BEAT, D3], [3 * BEAT, A2]].forEach(([d, n]) => lead(t + d, BEAT - 0.05, n, 0.09, -0.2));
// Lichter gehen aus: 18 absteigende Töne
for (let i = 0; i < 18; i++) pluck(41.0 + i * 0.21, D5 - i, 0.09, 0.5 - i * 0.05);
rauschSweep(41.0, 3.8, 3000, 200, 0.08);
// Neun Gespinste
for (let i = 0; i < 9; i++) { glitch(45.4 + i * 0.26, 0.06, 0.26); pluck(45.4 + i * 0.26, [D3, Eb3, D3, Bb2, A2, Eb3, D3, C3, D3][i], 0.12, (i - 4) * 0.18); }
// Seidras Satz: Spannung
pad(47.6, 2.8, [D3, Eb3, A3, Bb3], 0.09, 1000, { a: 0.6, r: 0.6 });
krabbeln(48.0, 2.0, 0.08);
riss(RISS);

/* ---------- E: 50,2–62,2 s – Die Werkstatt ---------- */
drone(50.6, 12.0, D1, 0.1, 240);
const WERKSTATT = [BB, FD, GM, DM, BB];
WERKSTATT.forEach((akk, i) => pad(50.8 + i * BAR, BAR + 0.4, akk.pad.map((n) => n + 12), 0.12, 1800, { a: 0.8, r: 0.8 }));
for (let t = 52.0; t < 62.0; t += BAR) { kick(t, 0.5); kick(t + 2 * BEAT, 0.4); }
for (let t = 56.0; t < 62.4; t += BEAT / 2) hat(t, false, 0.08);
for (let t = 56.0; t < 62.4; t += BEAT) bass(t, BEAT - 0.03, WERKSTATT[Math.floor((t - 50.8) / BAR) % WERKSTATT.length].bass + 12, 0.22, 320);
[[52.0, A4], [53.0, C5], [54.0, E5], [55.0, G5]].forEach(([t, n]) => glocke(t, n, 0.14, 2.2, (n - 72) * 0.04));
glocke(57.4, D6, 0.18, 3.0, 0.1); glocke(57.45, A5, 0.12, 3.0, -0.3); glocke(57.5, F5 + 12, 0.1, 3.0, 0.3);
for (let i = 0; i < 8; i++) pluck(58.6 + i * 0.3, [D4, F4, A4, D5, F5, A5, D6, A5][i], 0.08, Math.sin(i) * 0.5);
rauschSweep(59.6, 3.4, 300, 9000, 0.3);
hinzu(59.6, 3.4, (t) => Math.sin(2 * Math.PI * (160 + 520 * Math.pow(t / 3.4, 2)) * t) * (t / 3.4) * 0.5, { vol: 0.14 });
for (let t = 61.2; t < TITEL; t += BEAT / 4) snare(t, 0.12 + 0.3 * ((t - 61.2) / 1.8));
for (let t = 62.4; t < TITEL; t += BEAT / 8) hat(t, false, 0.08 + 0.1 * ((t - 62.4) / 0.6));

/* ---------- F: 62,2–70,6 s – SCHATTENNETZ ---------- */
impact(TITEL, { groesse: 1.3 });
beatAbschnitt(TITEL, LOS - 0.2, [DM, BB, FD, CD], { kickVol: 1.0, snareVol: 0.55, hatVol: 0.18, leadVol: 0.1, bassVol: 0.4, padVol: 0.12 });
[[TITEL, D5], [TITEL + 0.3, A5], [TITEL + 0.6, D6]].forEach(([t, n]) => glocke(t, n, 0.14, 2.6));
glocke(67.1, D5, 0.16, 2.0); glocke(67.4, F5, 0.12, 2.0); glocke(67.7, A5, 0.12, 2.0);
for (let t = 68.4; t < LOS; t += BEAT / 4) snare(t, 0.2 + 0.3 * ((t - 68.4) / 0.8));
// „Los.“: Stinger
impact(LOS, { groesse: 1.2 });
glocke(LOS, D6, 0.2, 3.0, 0); glocke(LOS + 0.05, A5, 0.14, 3.0, -0.3); glocke(LOS + 0.1, D5, 0.14, 3.0, 0.3);
pad(LOS, 4.8, [D3, A3, D4, F4, A4], 0.14, 2200, { a: 0.1, r: 1.6 });

/* ---------- G: 70–74 s – Ausklang ---------- */
drone(69.6, 4.4, D1, 0.12, 240);
glocke(71.2, A4, 0.12, 2.8, 0.2); glocke(71.6, D5, 0.1, 2.6, -0.2); glocke(72.0, F5, 0.08, 2.0, 0.3);

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
