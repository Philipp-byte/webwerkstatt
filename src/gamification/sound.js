// Kleine Klangkulisse, komplett synthetisch über die Web Audio API – keine
// Audiodateien nötig. Stummschalten über die Einstellungen (localStorage).

const KEY = 'webwerkstatt.ton';
let ctx = null;
let stumm = false;
try {
  stumm = localStorage.getItem(KEY) === 'aus';
} catch {
  stumm = false;
}

function audio() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function ton({ freq = 440, dauer = 0.15, typ = 'sine', vol = 0.18, start = 0, gleit = null, decay = true }) {
  const ac = audio();
  if (!ac || stumm) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = typ;
  const t0 = ac.currentTime + start;
  osc.frequency.setValueAtTime(freq, t0);
  if (gleit) osc.frequency.exponentialRampToValueAtTime(gleit, t0 + dauer);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  if (decay) gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dauer);
  else gain.gain.setValueAtTime(vol, t0 + dauer - 0.02), gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dauer);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dauer + 0.05);
}

export const sound = {
  istStumm: () => stumm,
  setStumm(wert) {
    stumm = !!wert;
    try {
      localStorage.setItem(KEY, stumm ? 'aus' : 'an');
    } catch {
      /* egal */
    }
  },
  klick() {
    ton({ freq: 660, dauer: 0.05, typ: 'triangle', vol: 0.08 });
  },
  richtig() {
    ton({ freq: 523, dauer: 0.12, typ: 'triangle' });
    ton({ freq: 784, dauer: 0.18, typ: 'triangle', start: 0.09 });
  },
  falsch() {
    ton({ freq: 220, dauer: 0.22, typ: 'sawtooth', vol: 0.08, gleit: 150 });
  },
  xp() {
    ton({ freq: 880, dauer: 0.08, typ: 'sine', vol: 0.1 });
    ton({ freq: 1174, dauer: 0.1, typ: 'sine', vol: 0.1, start: 0.06 });
  },
  fanfare() {
    [523, 659, 784, 1046].forEach((f, i) => ton({ freq: f, dauer: 0.22, typ: 'triangle', start: i * 0.11, vol: 0.16 }));
    ton({ freq: 1318, dauer: 0.5, typ: 'triangle', start: 0.45, vol: 0.14 });
  },
  levelup() {
    [392, 523, 659, 784, 1046, 1318].forEach((f, i) => ton({ freq: f, dauer: 0.3, typ: 'square', start: i * 0.07, vol: 0.06 }));
  },
  abzeichen() {
    ton({ freq: 987, dauer: 0.12, typ: 'sine', vol: 0.12 });
    ton({ freq: 1318, dauer: 0.12, typ: 'sine', vol: 0.12, start: 0.1 });
    ton({ freq: 1975, dauer: 0.3, typ: 'sine', vol: 0.1, start: 0.2 });
  },
  tick() {
    ton({ freq: 1200, dauer: 0.03, typ: 'square', vol: 0.04 });
  },
  alarm() {
    ton({ freq: 330, dauer: 0.35, typ: 'sawtooth', vol: 0.07, gleit: 240 });
  },
  wusch() {
    ton({ freq: 200, dauer: 0.25, typ: 'sine', vol: 0.06, gleit: 900 });
  },
};
