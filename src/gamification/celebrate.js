// Feiern: Konfetti, Toasts (kleine Meldungen oben rechts) und XP-Flieger.

import confetti from 'canvas-confetti';

const reduziert = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function konfetti(art = 'klein') {
  if (reduziert()) return;
  const farben = ['#ff8a3d', '#ffc857', '#38c7ff', '#4ade80', '#ffffff'];
  if (art === 'gross') {
    const ende = Date.now() + 1400;
    (function schub() {
      confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: farben });
      confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: farben });
      if (Date.now() < ende) requestAnimationFrame(schub);
    })();
    return;
  }
  confetti({ particleCount: art === 'mittel' ? 90 : 40, spread: 70, origin: { y: 0.65 }, colors: farben, scalar: 0.9 });
}

let toastWurzel = null;
function wurzel() {
  if (!toastWurzel) {
    toastWurzel = document.createElement('div');
    toastWurzel.className = 'toasts';
    toastWurzel.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastWurzel);
  }
  return toastWurzel;
}

export function toast({ titel, text = '', icon = '✨', art = 'info', dauer = 3800 }) {
  const el = document.createElement('div');
  el.className = `toast toast-${art}`;
  el.innerHTML = `<span class="toast-icon">${icon}</span><div><strong>${titel}</strong>${text ? `<span>${text}</span>` : ''}</div>`;
  wurzel().appendChild(el);
  requestAnimationFrame(() => el.classList.add('toast-sichtbar'));
  setTimeout(() => {
    el.classList.remove('toast-sichtbar');
    setTimeout(() => el.remove(), 400);
  }, dauer);
  return el;
}

// Kleiner "+25 XP"-Flieger an einer Stelle des Bildschirms
export function xpFlieger(betrag, anker) {
  const el = document.createElement('div');
  el.className = 'xp-flieger';
  el.textContent = `+${betrag} XP`;
  const r = anker?.getBoundingClientRect?.();
  el.style.left = `${r ? r.left + r.width / 2 : window.innerWidth / 2}px`;
  el.style.top = `${r ? r.top : window.innerHeight / 2}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}
