// Einstiegspunkt: Design, Hintergrund, Kopfzeile, Modus (Demo/Schule), Router.

import '@fontsource-variable/unbounded';
import '@fontsource/atkinson-hyperlegible';
import '@fontsource/atkinson-hyperlegible/700.css';
import '@fontsource-variable/jetbrains-mono';
import './styles/base.css';
import './styles/werkbank.css';
import './styles/views.css';
import './styles/intro.css';
import './styles/hyperia.css';

import { initRouter } from './router.js';
import { startBackground } from './background.js';
import { getSettings, getState, onChange, introGesehen, istLehrkraft } from './store.js';
import { levelFortschritt } from './gamification/xp.js';
import { sound } from './gamification/sound.js';
import { loadCurriculum, loadWelt, loadFiguren } from './content.js';
import { ladeFigurenBilder } from './engine/sigil.js';
import { erkenneModus, istSchulmodus, aktuellerNutzer } from './api.js';
import { starteSync } from './progress-remote.js';

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
  const befreit = Object.values(s.boss).filter((b) => b.passed).length;
  const nutzer = aktuellerNutzer();
  el.innerHTML = `
    ${istLehrkraft() ? '<a class="chip chip-gold" href="#/lehrkraft" title="Lehrkraft-Modus aktiv">🔓 Lehrkraft</a>' : ''}
    ${nutzer?.rolle === 'teacher' || nutzer?.rolle === 'admin' ? '<a class="chip chip-gold" href="#/klasse" title="Klassen und Fortschritt">🧑‍🏫 Klassen</a>' : ''}
    <a class="orte-pille" href="#/" title="Befreite Orte"><b>${befreit} / 18</b><span>Orte</span></a>
    <a class="xp-pille" href="#/ich" title="Level ${lf.level} · ${s.xp} XP${nutzer ? ` · ${nutzer.pseudonym}` : ''}">
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
  const gruppe = ['ort', 'kapitel', 'lektion', 'duell', 'abnahme', 'hinterhalt', 'backstage'].includes(teil) ? '' : ['keycard', 'lehrkraft', 'bericht', 'spickzettel', 'klasse'].includes(teil) ? 'ich' : teil;
  document.querySelectorAll('#topbar-nav a').forEach((a) => {
    a.classList.toggle('aktiv', a.dataset.route === gruppe);
  });
}

async function boot() {
  wendeEinstellungenAn();
  startBackground();
  await erkenneModus();
  await ladeFigurenBilder();
  await Promise.all([loadWelt(), loadFiguren()]).catch(() => {});
  if (istSchulmodus()) {
    const angemeldet = await starteSync();
    if (!angemeldet && !location.hash.startsWith('#/login')) {
      location.replace('#/login');
    }
  }
  renderTopbar();
  onChange(renderTopbar);
  window.addEventListener('hashchange', markiereNav);
  markiereNav();
  loadCurriculum().catch(() => {});

  // Erster Besuch ohne Ziel → Vorspann (Pflicht beim ersten Start)
  if (!location.hash && !introGesehen() && !(istSchulmodus() && !aktuellerNutzer())) {
    location.replace('#/intro');
  }
  initRouter();
}

boot();
