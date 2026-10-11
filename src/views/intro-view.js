// Der Vorspann SCHATTENNETZ: beim ersten Start läuft das Video komplett (Überspringen
// gibt es erst, nachdem es einmal ganz gesehen wurde), danach das Onboarding (Name, drei
// Regeln) und der Weg nach Quellgrund. Ohne Video: die Lesefassung aus welt.json.

import { loadWelt, loadAlleKapitel } from '../content.js';
import { setIntroGesehen, setVideoGesehen, setVideoKomplett, setName, getState } from '../store.js';
import { sound } from '../gamification/sound.js';
import { escapeHtml } from '../engine/markdown.js';
import { sigilSvg, figurBild } from '../engine/sigil.js';

async function bildVorhanden(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

const VIDEO = () => new URL('intro/schattennetz-intro.mp4', document.baseURI).href;
const VIDEO_WEBM = () => new URL('intro/schattennetz-intro.webm', document.baseURI).href;
const POSTER = () => new URL('intro/schattennetz-intro-poster.jpg', document.baseURI).href;
const UNTERTITEL = () => new URL('intro/schattennetz-intro.vtt', document.baseURI).href;

export async function renderIntro(app) {
  const [welt, kapitel] = await Promise.all([loadWelt(), loadAlleKapitel()]);
  const videoDa = await bildVorhanden(POSTER());
  const s = getState();
  const ersterStart = !s.intro.komplett;
  const erstesKapitel = kapitel[0].id;

  app.innerHTML = `<div class="intro" id="intro"></div>`;
  const intro = app.querySelector('#intro');
  let videoEl = null;

  function kopfzeile(rechts = '') {
    return `<div class="intro-kopf" style="position:relative">
        <span class="brand"><span class="brand-mark">&lt;/&gt;</span>WebWerkstatt</span>
        <div class="intro-akt"><span>Vorspann</span><strong>${escapeHtml(welt.titel)}</strong></div>
        <div class="rechts">${rechts}</div>
      </div>`;
  }

  /* ---------- Video (Pflicht beim ersten Start) ---------- */
  function videoAbspielen() {
    const skipErlaubt = !ersterStart;
    intro.innerHTML = `${kopfzeile(skipErlaubt ? '<button class="btn btn-geist btn-klein" id="skip" type="button">Überspringen ›</button>' : '<span class="chip chip-gespinst">Erster Start · der Vorspann läuft einmal ganz</span>')}
      <div class="intro-video-wrap">
        <video id="film" playsinline preload="auto" poster="${POSTER()}" crossorigin="anonymous" ${skipErlaubt ? 'controls' : ''}>
          <source src="${VIDEO()}" type="video/mp4">
          <source src="${VIDEO_WEBM()}" type="video/webm">
          <track kind="subtitles" srclang="de" label="Deutsch" src="${UNTERTITEL()}" default>
        </video>
        <button class="intro-play" id="play" type="button" aria-label="Vorspann starten"><span>▶</span><small>Vorspann starten · Ton an</small></button>
      </div>
      <nav class="intro-steuerung" style="position:relative">
        <button class="btn btn-sekundaer" id="lesen" type="button">📖 Lieber lesen</button>
        <div class="mitte"><strong>${escapeHtml(welt.untertitel)}</strong>${skipErlaubt ? 'Weiter mit „Überspringen“ oder am Ende des Videos.' : 'Am Ende des Videos geht es automatisch weiter.'}</div>
        <button class="btn btn-primaer" id="weiter" type="button" ${skipErlaubt ? '' : 'hidden'}>Weiter ›</button>
      </nav>`;
    videoEl = intro.querySelector('#film');
    const play = intro.querySelector('#play');
    const fertig = () => {
      setVideoKomplett(true);
      onboarding();
    };
    videoEl.addEventListener('ended', fertig);
    videoEl.addEventListener('error', () => lesefassung(), { once: true });
    videoEl.addEventListener('play', () => play.classList.add('weg'));
    videoEl.addEventListener('pause', () => videoEl.ended || play.classList.remove('weg'));
    play.addEventListener('click', () => videoEl.play().catch(() => {}));
    intro.querySelector('#weiter').addEventListener('click', () => {
      setVideoGesehen(true);
      onboarding();
    });
    intro.querySelector('#skip')?.addEventListener('click', () => onboarding());
    intro.querySelector('#lesen').addEventListener('click', () => {
      videoEl.pause();
      lesefassung();
    });
    videoEl.play().catch(() => {
      /* Autoplay blockiert – der Play-Knopf bleibt */
    });
  }

  /* ---------- Lesefassung (ohne Video, oder auf Wunsch) ---------- */
  function lesefassung() {
    const bilder = welt.vorspann;
    let i = 0;
    intro.innerHTML = `${kopfzeile('<button class="btn btn-geist btn-klein" id="skip" type="button">Überspringen ›</button>')}
      <div class="intro-lesen">
        <div class="karte intro-lesen-karte" id="karte"></div>
        <nav class="intro-steuerung">
          <button class="btn btn-sekundaer" id="zurueck" type="button">‹ Zurück</button>
          <div class="mitte"><strong><span id="nr">1</span> / ${bilder.length}</strong>Weiter mit Klick oder →</div>
          <button class="btn btn-primaer" id="weiter" type="button">Weiter ›</button>
        </nav>
      </div>`;
    const zeige = () => {
      const b = bilder[i];
      intro.querySelector('#nr').textContent = i + 1;
      intro.querySelector('#karte').innerHTML = `
        <div class="intro-lesen-bild">${i === 3 ? sigilSvg('seidra', { groesse: 120, klasse: 'sigil-gross' }) : i === 4 ? ['sam', 'ayla', 'jonas', 'robby'].map((f) => figurBild(f, { groesse: 64, pose: 'hallo-winken' })).join('') : i === 5 ? sigilSvg('funke', { groesse: 110 }) : `<span class="intro-lesen-nr">${b.bild}</span>`}</div>
        <div><span class="chip chip-gespinst">Bild ${b.bild} von ${bilder.length}</span><h2>${escapeHtml(b.titel)}</h2><p>${escapeHtml(b.text)}</p></div>`;
      intro.querySelector('#zurueck').disabled = i === 0;
      intro.querySelector('#weiter').textContent = i === bilder.length - 1 ? 'Lehrling werden ›' : 'Weiter ›';
    };
    intro.querySelector('#weiter').addEventListener('click', () => {
      if (i >= bilder.length - 1) {
        setVideoKomplett(true);
        return onboarding();
      }
      i++;
      zeige();
      sound.klick();
    });
    intro.querySelector('#zurueck').addEventListener('click', () => {
      if (i > 0) i--;
      zeige();
    });
    intro.querySelector('#skip').addEventListener('click', () => onboarding());
    zeige();
  }

  /* ---------- Onboarding ---------- */
  function onboarding() {
    if (videoEl) {
      videoEl.pause();
      videoEl = null;
    }
    setIntroGesehen(true);
    const st = getState();
    const regeln = [
      ['Fehler sind Fäden.', 'Jeder Fehler bekommt eine genaue Rückmeldung, die Gespinste verraten dabei mehr, als sie wollen. Nachlesen geht immer, abschreiben nie.'],
      ['Wiederholung hält das Netz.', 'Soundcheck und Hinterhalte holen Altes zurück, bis es sitzt. Erst dann hält ein Knoten, wenn Seidra daran zieht.'],
      ['Jeder Ort leuchtet.', 'Lektionen, zwei Hinterhalte, ein Duell. Ab 80 % reißt das Gespinst, der Ort geht an, der nächste öffnet sich.'],
    ];
    intro.innerHTML = `<div class="intro-onboarding">
      <div class="karte auftritt">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem">${sigilSvg('funke', { groesse: 64 })}<div><div class="chip chip-gold">Die Werkstatt nimmt dich auf</div><h2 style="margin:0.3rem 0 0">Willkommen in Hyperia, Lehrling.</h2></div></div>
        <p style="color:var(--ink-2);margin:0.5rem 0 0.9rem">Wie soll Sam dich nennen? (Optional, du kannst den Namen später unter „Ich“ ändern.)</p>
        <input class="intro-name" id="name" type="text" maxlength="30" placeholder="Dein Name oder Spielername" value="${escapeHtml(st.name || '')}" autocomplete="nickname">
        <div class="intro-regeln">
          ${regeln.map(([t, x], i) => `<div class="intro-regel"><span class="nr">${i + 1}</span><span><b>${t}</b> ${x}</span></div>`).join('')}
        </div>
        <div class="schritt-buttons">
          <button class="btn btn-primaer btn-gross" type="button" id="los">🕯 Nach Quellgrund ›</button>
          <a class="btn btn-sekundaer" href="#/">Zur Karte</a>
          <button class="btn btn-geist" type="button" id="nochmal">${videoDa ? '🎬 Vorspann nochmal' : '📖 Vorspann lesen'}</button>
        </div>
      </div></div>`;
    const name = intro.querySelector('#name');
    const speichern = () => setName(name.value.trim());
    name.addEventListener('change', speichern);
    intro.querySelector('#los').addEventListener('click', () => {
      speichern();
      sound.fanfare();
      location.hash = `#/ort/${erstesKapitel}`;
    });
    intro.querySelector('#nochmal').addEventListener('click', () => (videoDa ? videoAbspielen() : lesefassung()));
    setTimeout(() => name.focus(), 300);
  }

  if (videoDa) videoAbspielen();
  else lesefassung();

  return {
    destroy: () => {
      if (videoEl) videoEl.pause();
      document.body.classList.remove('intro-aktiv');
    },
  };
}
