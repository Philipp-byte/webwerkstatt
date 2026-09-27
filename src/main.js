// Einstiegspunkt: Design, Hintergrund, Kopfzeile, Router.

import '@fontsource-variable/unbounded';
import '@fontsource/atkinson-hyperlegible';
import '@fontsource/atkinson-hyperlegible/700.css';
import '@fontsource-variable/jetbrains-mono';
import './styles/base.css';
import './styles/werkbank.css';
import './styles/views.css';
import './styles/intro.css';
import './styles/turnier.css';

import { initRouter } from './router.js';
import { startBackground } from './background.js';
import { getSettings, getState, onChange, introGesehen, istLehrkraft } from './store.js';
import { levelFortschritt, rangAus } from './gamification/xp.js';
import { sound } from './gamification/sound.js';
import { loadCurriculum } from './content.js';

function wendeEinstellungenAn() {
  const s = getSettings();
  document.documentElement.dataset.theme = s.theme === 'hell' ? 'hell' : 'dunkel';
  document.documentElement.dataset.motion = s.motion === 'aus' ? 'aus' : 'an';
}

function renderTopbar() {
  const el = document.getElementById('topbar-rechts');
  if (!el) return;
  const s = getState();
  const lf = levelFortschritt(s.xp);
  const rang = rangAus(s.xp);
  el.innerHTML = `
    ${istLehrkraft() ? '<a class="chip chip-farbe" style="--farbe: var(--js)" href="#/lehrkraft" title="Lehrkraft-Modus aktiv">🔓 Lehrkraft</a>' : ''}
    <a class="xp-pille" href="#/keycard" title="${rang.titel} · Level ${lf.level} · ${s.xp} XP">
      <span class="level-kreis">${lf.level}</span>
      <span class="xp-balken"><span style="width:${Math.round(lf.anteil * 100)}%"></span></span>
      <span class="xp-zahl">${s.xp} XP</span>
    </a>
    <button class="icon-btn" id="ton-knopf" type="button" title="Ton an/aus" aria-pressed="${!sound.istStumm()}">${sound.istStumm() ? '🔇' : '🔊'}</button>`;
  el.querySelector('#ton-knopf').addEventListener('click', () => {
    sound.setStumm(!sound.istStumm());
    if (!sound.istStumm()) sound.klick();
    renderTopbar();
  });
}

function markiereNav() {
  const teil = location.hash.replace(/^#\/?/, '').split('/')[0] || '';
  document.querySelectorAll('#topbar-nav a').forEach((a) => {
    a.classList.toggle('aktiv', a.dataset.route === teil);
  });
}

async function boot() {
  wendeEinstellungenAn();
  startBackground();
  renderTopbar();
  onChange(renderTopbar);
  window.addEventListener('hashchange', markiereNav);
  markiereNav();
  loadCurriculum().catch(() => {});

  // Erster Besuch ohne Ziel → Vorspann
  if (!location.hash && !introGesehen()) {
    location.replace('#/intro');
  }
  initRouter();
}

boot();
