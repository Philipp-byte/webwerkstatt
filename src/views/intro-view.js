// Der Vorspann: Szenen mit animierten SVG-Kulissen (oder generierten Bildern,
// falls unter public/intro/assets/<kulisse>.webp vorhanden), Sprechblase mit
// Schreibmaschinen-Effekt, Klangkulisse. Manuell weiterklicken, jederzeit überspringbar.

import { loadIntro } from '../content.js';
import { setIntroGesehen } from '../store.js';
import { sound } from '../gamification/sound.js';
import { escapeHtml } from '../engine/markdown.js';

const robby = (pose) => new URL(`figuren/robby/${pose}.png`, document.baseURI).href;
const TON_FARBEN = { erzaehler: '#8fd3ff', sam: '#4ade80', ayla: '#38c7ff', jonas: '#ffd84d', robby: '#ff8a3d', system: '#fb7185' };

/* ---------- Kulissen (SVG) ---------- */

const sterne = (n, h = 260) =>
  Array.from({ length: n }, (_, i) => `<circle cx="${(i * 173) % 1200}" cy="${(i * 89) % h}" r="${0.6 + (i % 3) * 0.5}" fill="#fff" opacity="${0.2 + (i % 4) * 0.15}"/>`).join('');

const KULISSEN = {
  skyline: () => `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05060c"/><stop offset="0.7" stop-color="#121a33"/><stop offset="1" stop-color="#1c2540"/></linearGradient>
    <radialGradient id="mond"><stop offset="0" stop-color="#fff5d6"/><stop offset="1" stop-color="#fff5d6" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="700" fill="url(#sk)"/>${sterne(90)}
    <circle cx="980" cy="120" r="120" fill="url(#mond)" opacity="0.35"/><circle cx="980" cy="120" r="34" fill="#fff3d0"/>
    <g fill="#0a0d18">${Array.from({ length: 22 }, (_, i) => `<rect x="${i * 56 - 10}" y="${300 + ((i * 37) % 140)}" width="${40 + (i % 3) * 12}" height="${400}"/>`).join('')}</g>
    <g fill="#ffc857" opacity="0.8" class="flackern">${Array.from({ length: 70 }, (_, i) => `<rect x="${(i * 61) % 1180 + 6}" y="${330 + ((i * 53) % 230)}" width="5" height="7" opacity="${(i % 3) * 0.3 + 0.2}"/>`).join('')}</g>
    <path d="M0 520 L1200 520 L1200 700 L0 700Z" fill="#07090f"/>
    <path d="M0 540 C 300 520, 600 570, 900 540 S 1150 530, 1200 545 L1200 700 L0 700Z" fill="#0d1526"/>
    <path d="M0 560 C 300 540, 600 590, 900 560 S 1150 550, 1200 565" stroke="#1e2f55" stroke-width="2" fill="none"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${80 + i * 95}" y="${575 + (i % 2) * 6}" width="60" height="2" fill="#ffc857" opacity="${0.15 + (i % 3) * 0.1}"/>`).join('')}
    <g class="regen" stroke="#8fb3ff" stroke-opacity="0.18" stroke-width="1">${Array.from({ length: 60 }, (_, i) => `<line x1="${(i * 97) % 1200}" y1="${(i * 41) % 700 - 60}" x2="${(i * 97) % 1200 - 6}" y2="${(i * 41) % 700 - 30}"/>`).join('')}</g>
  </svg>`,

  gelaende: () => `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05060c"/><stop offset="1" stop-color="#151b2e"/></linearGradient>
    <radialGradient id="gw"><stop offset="0" stop-color="#ff9c4d" stop-opacity="0.5"/><stop offset="1" stop-color="#ff9c4d" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="700" fill="url(#g1)"/>${sterne(70)}
    <path d="M0 430 Q 600 380 1200 430 L1200 700 L0 700Z" fill="#0d101c"/>
    <g transform="translate(330 250)"><path d="M0 120 L40 0 H500 L540 120Z" fill="#161a2a"/><rect x="0" y="120" width="540" height="150" fill="#101422"/><rect x="40" y="150" width="460" height="100" fill="#05060c"/>
      <circle cx="120" cy="115" r="40" fill="url(#gw)"/><circle cx="270" cy="115" r="40" fill="url(#gw)"/><circle cx="420" cy="115" r="40" fill="url(#gw)"/>
      <text x="270" y="215" text-anchor="middle" fill="#2a3150" font-family="Unbounded Variable, sans-serif" font-weight="800" font-size="46" letter-spacing="10">FUNKEN</text></g>
    <g fill="#141a2b">${Array.from({ length: 9 }, (_, i) => `<path d="M${60 + i * 130} 520 l35 -45 l35 45z"/>`).join('')}</g>
    <path d="M0 620 C 300 590, 600 640, 900 610 S 1150 600, 1200 620 L1200 700 L0 700Z" fill="#0a1020"/>
    <g transform="translate(1040 330)"><circle r="70" fill="none" stroke="#1f2640" stroke-width="4"/>${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="0" x2="${(Math.cos((i / 8) * 6.283) * 70).toFixed(1)}" y2="${(Math.sin((i / 8) * 6.283) * 70).toFixed(1)}" stroke="#1f2640" stroke-width="2"/>`).join('')}</g>
    <path d="M150 380 Q 600 430 1050 380" fill="none" stroke="#1f2640" stroke-width="2"/>
  </svg>`,

  bildschirm: () => `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="700" fill="#07080d"/>
    <rect x="200" y="90" width="800" height="480" rx="18" fill="#141826" stroke="#2a3150" stroke-width="4"/>
    <rect x="230" y="120" width="740" height="420" rx="6" fill="#0b0d16"/>
    <rect x="230" y="120" width="740" height="36" fill="#161b2b"/><circle cx="252" cy="138" r="6" fill="#ff5f57"/><circle cx="272" cy="138" r="6" fill="#febc2e"/><circle cx="292" cy="138" r="6" fill="#28c840"/>
    <rect x="330" y="128" width="540" height="20" rx="10" fill="#0b0d16"/><text x="345" y="143" fill="#8f97ab" font-family="JetBrains Mono Variable, monospace" font-size="13">https://funken-festival.de</text>
    <text x="600" y="330" text-anchor="middle" fill="#fb7185" font-family="Unbounded Variable, sans-serif" font-weight="800" font-size="120" class="flackern">404</text>
    <text x="600" y="380" text-anchor="middle" fill="#8f97ab" font-family="JetBrains Mono Variable, monospace" font-size="20">Seite nicht gefunden · Server antwortet nicht</text>
    <g stroke="#fb7185" stroke-opacity="0.35">${Array.from({ length: 14 }, (_, i) => `<rect x="${240 + (i * 97) % 700}" y="${170 + (i * 61) % 340}" width="${40 + (i % 4) * 30}" height="3" fill="#fb7185"/>`).join('')}</g>
    <rect x="520" y="570" width="160" height="40" fill="#141826"/><rect x="440" y="606" width="320" height="14" rx="7" fill="#1a1f30"/>
  </svg>`,

  werkstatt: () => `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="w1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0d14"/><stop offset="1" stop-color="#171a24"/></linearGradient>
    <radialGradient id="ww"><stop offset="0" stop-color="#ffb066" stop-opacity="0.5"/><stop offset="1" stop-color="#ffb066" stop-opacity="0"/></radialGradient>
    <radialGradient id="wc"><stop offset="0" stop-color="#5fd6ff" stop-opacity="0.5"/><stop offset="1" stop-color="#5fd6ff" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="700" fill="url(#w1)"/>
    <g stroke="#1f2333" stroke-width="2">${Array.from({ length: 7 }, (_, i) => `<line x1="${i * 200}" y1="0" x2="${i * 200}" y2="700"/>`).join('')}<line x1="0" y1="90" x2="1200" y2="90"/><line x1="0" y1="180" x2="1200" y2="180"/></g>
    <rect x="80" y="60" width="300" height="130" fill="#0e1119" stroke="#2a3150"/><rect x="820" y="60" width="300" height="130" fill="#0e1119" stroke="#2a3150"/>
    <ellipse cx="300" cy="120" rx="160" ry="60" fill="url(#ww)"/><ellipse cx="900" cy="120" rx="160" ry="60" fill="url(#wc)"/>
    <rect x="0" y="460" width="1200" height="240" fill="#0c0e15"/>
    <rect x="150" y="380" width="900" height="24" fill="#2a2f45"/><rect x="170" y="404" width="20" height="200" fill="#1f2333"/><rect x="1010" y="404" width="20" height="200" fill="#1f2333"/>
    <g><rect x="230" y="270" width="200" height="120" rx="6" fill="#0b0d16" stroke="#2f3756" stroke-width="3"/><rect x="242" y="282" width="176" height="96" fill="#101a2b"/><g fill="#38c7ff" opacity="0.8">${Array.from({ length: 6 }, (_, i) => `<rect x="252" y="${292 + i * 14}" width="${60 + (i * 37) % 90}" height="5"/>`).join('')}</g><rect x="315" y="392" width="30" height="8" fill="#2f3756"/></g>
    <g><rect x="520" y="255" width="220" height="135" rx="6" fill="#0b0d16" stroke="#2f3756" stroke-width="3"/><rect x="532" y="267" width="196" height="111" fill="#1a1208"/><g fill="#ff8a3d" opacity="0.85">${Array.from({ length: 7 }, (_, i) => `<rect x="${542 + (i % 2) * 14}" y="${277 + i * 14}" width="${50 + (i * 53) % 110}" height="5"/>`).join('')}</g></g>
    <g><rect x="800" y="275" width="180" height="115" rx="6" fill="#0b0d16" stroke="#2f3756" stroke-width="3"/><rect x="812" y="287" width="156" height="91" fill="#141a12"/><g fill="#ffd84d" opacity="0.85">${Array.from({ length: 5 }, (_, i) => `<rect x="822" y="${297 + i * 15}" width="${40 + (i * 41) % 90}" height="5"/>`).join('')}</g></g>
    <text x="600" y="640" text-anchor="middle" fill="#2a3150" font-family="Unbounded Variable, sans-serif" font-weight="800" font-size="34" letter-spacing="8">HALLE 7</text>
  </svg>`,

  plan: () => `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="700" fill="#0b0d14"/>
    <g stroke="#1a1e2e" stroke-width="1">${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="700"/>`).join('')}${Array.from({ length: 15 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="1200" y2="${i * 50}"/>`).join('')}</g>
    <g class="schicht"><path d="M600 470 L300 560 L600 650 L900 560Z" fill="#1c1410" stroke="#ff7a45" stroke-width="3"/><text x="600" y="570" text-anchor="middle" fill="#ff7a45" font-family="Unbounded Variable, sans-serif" font-weight="700" font-size="26">HTML · Gerüst</text></g>
    <g class="schicht"><path d="M600 320 L300 410 L600 500 L900 410Z" fill="#0f1b26" stroke="#38c7ff" stroke-width="3"/><text x="600" y="420" text-anchor="middle" fill="#38c7ff" font-family="Unbounded Variable, sans-serif" font-weight="700" font-size="26">CSS · Licht &amp; Farbe</text></g>
    <g class="schicht"><path d="M600 170 L300 260 L600 350 L900 260Z" fill="#1f1c0c" stroke="#ffd84d" stroke-width="3"/><text x="600" y="270" text-anchor="middle" fill="#ffd84d" font-family="Unbounded Variable, sans-serif" font-weight="700" font-size="26">JavaScript · Strom</text></g>
  </svg>`,

  keycard: () => `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="kc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1c2030"/><stop offset="1" stop-color="#101320"/></linearGradient>
    <linearGradient id="holo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff8a3d" stop-opacity="0"/><stop offset="0.5" stop-color="#ffc857" stop-opacity="0.35"/><stop offset="1" stop-color="#38c7ff" stop-opacity="0"/></linearGradient></defs>
    <rect width="1200" height="700" fill="#07080d"/>${sterne(50, 700)}
    <g transform="rotate(-6 600 350)"><rect x="300" y="190" width="600" height="340" rx="28" fill="url(#kc)" stroke="#3a4260" stroke-width="3"/>
      <rect x="300" y="190" width="600" height="340" rx="28" fill="url(#holo)"/>
      <rect x="340" y="240" width="110" height="110" rx="22" fill="#0b0d16" stroke="#2f3756"/>
      <text x="480" y="270" fill="#ffc857" font-family="Unbounded Variable, sans-serif" font-size="14" letter-spacing="4">WEBWERKSTATT · KEYCARD</text>
      <text x="480" y="318" fill="#eef1f8" font-family="Unbounded Variable, sans-serif" font-weight="800" font-size="34">PRAKTIKUM</text>
      <text x="480" y="352" fill="#8f97ab" font-family="JetBrains Mono Variable, monospace" font-size="16">LEVEL 1 · 0 XP</text>
      <rect x="340" y="400" width="520" height="12" rx="6" fill="#0b0d16"/><rect x="340" y="400" width="30" height="12" rx="6" fill="#ff8a3d"/>
      <g fill="#2f3756">${Array.from({ length: 30 }, (_, i) => `<rect x="${340 + i * 17}" y="460" width="${(i % 3) * 3 + 3}" height="40"/>`).join('')}</g>
    </g>
  </svg>`,

  karte: () => `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="700" fill="#07090f"/>${sterne(60, 200)}
    <path d="M0 220 Q 600 180 1200 220 L1200 700 L0 700Z" fill="#0d111c"/>
    <path d="M120 130 C 300 130, 300 330, 480 330 S 660 130, 840 130 S 1020 330, 1080 330" fill="none" stroke="#2a3150" stroke-width="6" stroke-dasharray="2 14" stroke-linecap="round"/>
    <path d="M120 330 C 300 330, 300 540, 480 540 S 660 330, 840 330 S 1020 540, 1080 540" fill="none" stroke="#2a3150" stroke-width="6" stroke-dasharray="2 14" stroke-linecap="round"/>
    ${[[120,130],[300,230],[480,330],[660,230],[840,130],[1080,330],[840,330],[660,430],[480,540],[300,440],[120,330],[300,540],[660,540],[1080,540]].map(([x, y], i) => `<g class="licht-an" style="animation-delay:${i * 0.12}s"><circle cx="${x}" cy="${y}" r="30" fill="#ff8a3d" opacity="0.18"/><circle cx="${x}" cy="${y}" r="14" fill="${i < 5 ? '#ff7a45' : i < 10 ? '#38c7ff' : '#ffd84d'}"/></g>`).join('')}
    <text x="600" y="640" text-anchor="middle" fill="#2a3150" font-family="Unbounded Variable, sans-serif" font-weight="800" font-size="30" letter-spacing="8">18 STATIONEN</text>
  </svg>`,
};

async function bildVorhanden(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export async function renderIntro(app) {
  const daten = await loadIntro();
  const szenen = daten.szenen;
  // Generierte Szenenbilder (scripts/generate-intro-assets.mjs trägt sie in intro.json ein)
  const bilder = {};
  await Promise.all(
    Object.entries(daten.bilder || {}).map(async ([k, datei]) => {
      const url = new URL(`intro/${datei}`, document.baseURI).href;
      if (await bildVorhanden(url)) bilder[k] = url;
    })
  );

  app.innerHTML = `<div class="intro" id="intro"></div>`;
  const intro = app.querySelector('#intro');
  let index = -1;
  let tippTimer = null;
  let aktuelleKulisse = null;

  function ende() {
    setIntroGesehen(true);
    location.hash = '#/';
  }

  function startbildschirm() {
    intro.innerHTML = `<div class="intro-start">
      <div class="intro-kulisse animiert">${KULISSEN.gelaende()}</div><div class="intro-vignette"></div>
      <div class="intro-partikel">${Array.from({ length: 30 }, (_, i) => `<i style="left:${(i * 37) % 100}%;--d:${5 + (i % 5)}s;--v:-${(i * 0.7) % 6}s;--x:${(i % 3) - 1}0px"></i>`).join('')}</div>
      <div style="position:relative">
        <div class="chip chip-farbe" style="--farbe:#ffc857;margin-bottom:1rem">WebWerkstatt · Vorspann</div>
        <h1>${escapeHtml(daten.titel)}</h1>
        <p>${escapeHtml(daten.untertitel)}</p>
        <div class="schritt-buttons">
          <button class="btn btn-primaer btn-gross" type="button" id="start">▶ Vorspann starten</button>
          <button class="btn btn-geist" type="button" id="skip">Ohne Vorspann zum Gelände ›</button>
        </div>
      </div></div>`;
    intro.querySelector('#start').addEventListener('click', () => {
      sound.klick();
      spieler();
    });
    intro.querySelector('#skip').addEventListener('click', ende);
  }

  function spieler() {
    intro.innerHTML = `
      <div class="intro-kopf" style="position:relative">
        <span class="brand"><span class="brand-mark">&lt;/&gt;</span>WebWerkstatt</span>
        <div class="intro-akt"><span id="akt-label"></span><strong id="akt-titel"></strong></div>
        <div class="rechts">
          <button class="icon-btn" id="ton" type="button" title="Ton">${sound.istStumm() ? '🔇' : '🔊'}</button>
          <button class="btn btn-geist btn-klein" id="skip" type="button">Überspringen ›</button>
        </div>
        <div class="intro-fortschritt" id="fortschritt"></div>
      </div>
      <div class="intro-buehne">
        <div class="intro-kulisse" id="kulisse-a"></div>
        <div class="intro-kulisse weg" id="kulisse-b"></div>
        <div class="intro-vignette"></div>
        <div class="intro-partikel" id="partikel"></div>
        <div id="badge"></div>
        <img class="intro-figur" id="figur" alt="" hidden>
        <article class="intro-blase" aria-live="polite">
          <div class="intro-sprecher" id="sprecher"></div>
          <p class="intro-text" id="text"></p>
        </article>
        <nav class="intro-steuerung">
          <button class="btn btn-sekundaer" id="zurueck" type="button">‹ Zurück</button>
          <div class="mitte"><strong><span id="nr">1</span> / ${szenen.length}</strong>Lies in Ruhe – weiter mit Klick, Leertaste oder →</div>
          <button class="btn btn-primaer" id="weiter" type="button">Weiter ›</button>
        </nav>
      </div>`;
    intro.querySelector('#skip').addEventListener('click', endbildschirm);
    intro.querySelector('#weiter').addEventListener('click', weiter);
    intro.querySelector('#zurueck').addEventListener('click', zurueck);
    intro.querySelector('#ton').addEventListener('click', (e) => {
      sound.setStumm(!sound.istStumm());
      e.currentTarget.textContent = sound.istStumm() ? '🔇' : '🔊';
    });
    intro.querySelector('.intro-buehne').addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      weiter();
    });
    index = -1;
    weiter();
  }

  function zeigeSzene(i) {
    const s = szenen[i];
    const kulissen = [intro.querySelector('#kulisse-a'), intro.querySelector('#kulisse-b')];
    if (s.kulisse !== aktuelleKulisse) {
      const alt = kulissen.find((k) => !k.classList.contains('weg'));
      const neu = kulissen.find((k) => k.classList.contains('weg')) || kulissen[1];
      neu.className = 'intro-kulisse animiert';
      if (bilder[s.kulisse]) {
        neu.style.backgroundImage = `url("${bilder[s.kulisse]}")`;
        neu.innerHTML = '';
      } else {
        neu.style.backgroundImage = '';
        neu.innerHTML = KULISSEN[s.kulisse] ? KULISSEN[s.kulisse]() : '';
      }
      if (alt && alt !== neu) alt.classList.add('weg');
      aktuelleKulisse = s.kulisse;
    }
    const buehne = intro.querySelector('.intro-buehne');
    buehne.classList.toggle('intro-glitch', s.effekt === 'glitch');
    intro.querySelector('#partikel').innerHTML = s.effekt === 'lichter' || s.sfx === 'fanfare' || i === 0
      ? Array.from({ length: 24 }, (_, j) => `<i style="left:${(j * 41) % 100}%;--d:${5 + (j % 5)}s;--v:-${(j * 0.9) % 6}s;--x:${(j % 3) - 1}0px"></i>`).join('')
      : '';
    intro.querySelector('#akt-label').textContent = `Akt ${['I', 'II', 'III'][s.akt - 1]}`;
    intro.querySelector('#akt-titel').textContent = daten.akte[String(s.akt)] || '';
    intro.querySelector('#fortschritt').style.width = `${((i + 1) / szenen.length) * 100}%`;
    intro.querySelector('#nr').textContent = i + 1;
    intro.querySelector('#badge').innerHTML = s.badge ? `<div class="intro-badge ${s.ton === 'system' ? 'alarm' : ''}"><span>${escapeHtml(s.badge.eyebrow)}</span><strong>${escapeHtml(s.badge.title)}</strong></div>` : '';
    const figur = intro.querySelector('#figur');
    if (s.robby) {
      figur.src = robby(s.robby);
      figur.hidden = false;
      figur.style.animation = 'none';
      void figur.offsetWidth;
      figur.style.animation = '';
    } else figur.hidden = true;
    const sp = intro.querySelector('#sprecher');
    sp.textContent = s.sprecher;
    sp.style.setProperty('--ton', TON_FARBEN[s.ton] || '#ffc857');
    intro.querySelector('#zurueck').disabled = i === 0;
    intro.querySelector('#weiter').textContent = i === szenen.length - 1 ? 'Los geht’s ›' : 'Weiter ›';
    tippe(s.text);
    if (s.sfx && sound[s.sfx === 'chime' ? 'xp' : s.sfx]) sound[s.sfx === 'chime' ? 'xp' : s.sfx]();
  }

  function tippe(text) {
    clearInterval(tippTimer);
    const el = intro.querySelector('#text');
    const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduziert) {
      el.textContent = text;
      return;
    }
    let n = 0;
    el.innerHTML = '<span class="cursor"></span>';
    tippTimer = setInterval(() => {
      n += 2;
      el.innerHTML = `${escapeHtml(text.slice(0, n))}<span class="cursor"></span>`;
      if (n >= text.length) {
        clearInterval(tippTimer);
        el.textContent = text;
      }
    }, 18);
  }

  function weiter() {
    const el = intro.querySelector('#text');
    const s = szenen[index];
    if (s && el && el.textContent !== s.text) {
      clearInterval(tippTimer);
      el.textContent = s.text;
      return;
    }
    if (index >= szenen.length - 1) return endbildschirm();
    index++;
    zeigeSzene(index);
  }
  function zurueck() {
    if (index <= 0) return;
    index--;
    zeigeSzene(index);
  }

  function endbildschirm() {
    clearInterval(tippTimer);
    setIntroGesehen(true);
    intro.innerHTML = `<div class="intro-ende">
      <div class="intro-kulisse animiert">${KULISSEN.karte()}</div><div class="intro-vignette"></div>
      <div style="position:relative">
        <div class="chip chip-farbe" style="--farbe:#ffc857;margin-bottom:1rem">Der Auftrag beginnt</div>
        <h1>${escapeHtml(daten.titel)}</h1>
        <p>${escapeHtml(daten.untertitel)}<br>Deine Keycard ist ausgestellt. Erste Station: Info-Point.</p>
        <div class="schritt-buttons">
          <a class="btn btn-primaer btn-gross" href="#/kapitel/01-wie-das-web-funktioniert">Zur ersten Station ›</a>
          <a class="btn btn-sekundaer" href="#/">Zum Gelände</a>
          <button class="btn btn-geist" type="button" id="nochmal">Noch einmal ansehen</button>
        </div>
      </div></div>`;
    intro.querySelector('#nochmal').addEventListener('click', spieler);
    sound.fanfare();
  }

  const onKey = (e) => {
    if (!app.isConnected) {
      window.removeEventListener('keydown', onKey);
      return;
    }
    if (index < 0) return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      weiter();
    }
    if (e.key === 'ArrowLeft') zurueck();
    if (e.key === 'Escape') endbildschirm();
  };
  window.addEventListener('keydown', onKey);

  startbildschirm();
  return { destroy: () => { clearInterval(tippTimer); window.removeEventListener('keydown', onKey); document.body.classList.remove('intro-aktiv'); } };
}
