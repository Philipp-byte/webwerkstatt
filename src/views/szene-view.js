// Zwischenspiele (Route #/szene/<kapitel>/<anpfiff|funk|abpfiff>): kurze Story-Szenen
// mit einer Lern-Aufgabe. Anpfiff = vor dem Training (Spähbericht: den Fehler der
// Gegner-Crew erkennen), Crew-Funk = mitten im Training, Abpfiff = nach dem gewonnenen
// Match mit Trophäenkarte. Dialog als Chat-Verlauf (zum Nachlesen), danach die Aufgabe,
// XP einmalig, Volltreffer-Bonus beim ersten Versuch.

import { loadChapter, loadAlleKapitel, loadLesson, rundeFuer, szenenFuer } from '../content.js';
import { getState, vergibXp, zaehle, szeneGesehen, setSzeneGesehen, getAbnahme, abzeichenPruefen, tagesbonusPruefen } from '../store.js';
import { kapitelFrei } from '../progress.js';
import { renderStep } from '../engine/steps.js';
import { md, escapeHtml } from '../engine/markdown.js';
import { crewEmblem, nachtschichtEmblem } from '../engine/emblem.js';
import { trophaeenKarteHtml, trophaeenAktivieren } from '../engine/trophaee.js';
import { sound } from '../gamification/sound.js';
import { konfetti, toast } from '../gamification/celebrate.js';
import { meldeAbzeichen, verarbeiteXp } from './lesson-view.js';

const robby = (pose) => new URL(`figuren/robby/${pose}.png`, document.baseURI).href;

const FIGUREN = {
  ayla: { name: 'Ayla', rolle: 'Captain', farbe: '#38c7ff', kurz: 'A' },
  jonas: { name: 'Jonas', rolle: 'Strom & Backups', farbe: '#ffd84d', kurz: 'J' },
  sam: { name: 'Sam', rolle: 'Jury', farbe: '#4ade80', kurz: 'S' },
  robby: { name: 'Robby', rolle: 'Crew-Bot', farbe: '#ff8a3d', kurz: 'R' },
  erzaehler: { name: 'Erzählung', rolle: '', farbe: '#8fd3ff', kurz: '…' },
};

export const SZENEN_ARTEN = {
  anpfiff: { titel: 'Anpfiff', icon: '📣', untertitel: 'Spähbericht vor dem Training' },
  funk: { titel: 'Crew-Funk', icon: '📻', untertitel: 'Lagebesprechung aus Halle 7' },
  abpfiff: { titel: 'Abpfiff', icon: '🏁', untertitel: 'Trophäenkarte nach dem Match' },
};

export function szeneId(chapterId, art) {
  return `${art}:${chapterId}`;
}

function aufloesen(text, runde) {
  if (!text || text[0] !== '@' || !runde) return text;
  const feld = text.slice(1);
  if (feld === 'trash' || feld === 'spott') {
    const liste = runde[feld] || [];
    return liste[Math.floor(Math.random() * liste.length)] || '';
  }
  return runde[feld] || text;
}

function sprecherHtml(zeile, runde) {
  if (zeile.wer === 'gegner') {
    return `<div class="szene-avatar" style="--farbe:${escapeHtml(runde?.farbe || '#fb7185')}">${crewEmblem(runde, { groesse: 46 })}</div>
      <div class="szene-name" style="color:${escapeHtml(runde?.farbe || '#fb7185')}">${escapeHtml(runde?.captain || 'Gegner')} · ${escapeHtml(runde?.crew || '')}</div>`;
  }
  const f = FIGUREN[zeile.wer] || FIGUREN.erzaehler;
  const bild = zeile.wer === 'robby' ? `<img src="${robby(zeile.pose || 'erklaeren')}" alt="">` : `<b>${f.kurz}</b>`;
  return `<div class="szene-avatar" style="--farbe:${f.farbe}">${bild}</div>
    <div class="szene-name" style="color:${f.farbe}">${f.name}${f.rolle ? ` · ${f.rolle}` : ''}</div>`;
}

export async function renderSzene(app, chapterId, art) {
  const info = SZENEN_ARTEN[art];
  const [kapitel, alle, story, szenen] = await Promise.all([loadChapter(chapterId), loadAlleKapitel(), rundeFuer(chapterId), szenenFuer(chapterId)]);
  const szene = szenen?.[art];
  const index = alle.findIndex((k) => k.id === chapterId);
  const runde = story.runde;
  const zurueck = `<a class="zurueck" href="#/kapitel/${chapterId}">← ${kapitel.icon} Runde ${index + 1}: ${escapeHtml(kapitel.title)}</a>`;

  if (!info || !szene) {
    app.innerHTML = `<div class="lektion-seite">${zurueck}<div class="karte gesperrt-karte"><h2>Keine Szene</h2><p>Für diese Runde gibt es dieses Zwischenspiel (noch) nicht.</p></div></div>`;
    return;
  }
  const frei = kapitelFrei(index, alle);
  const abnahme = getAbnahme(chapterId);
  if (!frei || (art === 'abpfiff' && !abnahme?.passed && !getState().story.gesehen[szeneId(chapterId, art)])) {
    app.innerHTML = `<div class="lektion-seite">${zurueck}<div class="karte gesperrt-karte"><h2>🔒 Noch gesperrt</h2><p>${art === 'abpfiff' ? 'Der Abpfiff kommt nach dem gewonnenen Match dieser Runde.' : 'Erst die Runde davor gewinnen.'}</p></div></div>`;
    return;
  }

  const id = szeneId(chapterId, art);
  const schonGesehen = szeneGesehen(id);
  const xpTabelle = (await import('../content.js').then((m) => m.loadSzenen())).xp || { anpfiff: 20, funk: 20, abpfiff: 30, volltreffer: 10 };
  const zeilen = szene.zeilen || [];
  const ausklang = szene.ausklang || [];
  let phase = 'dialog'; // dialog → aufgabe → ausklang → ende
  let zeilenIndex = 0;
  let ausklangIndex = 0;
  let versuche = 0;
  let xpGesamt = 0;

  // Ziel-Links für den Abschluss
  const naechstes = alle[index + 1];
  let weiterHref = `#/kapitel/${chapterId}`;
  let weiterText = 'Zur Runde';
  if (art === 'anpfiff') {
    weiterHref = `#/lektion/${chapterId}/${kapitel.lessons[0]}`;
    weiterText = 'Training starten →';
  } else if (art === 'funk') {
    const i = kapitel.lessons.indexOf(szene.nach);
    const nachher = kapitel.lessons[i + 1];
    weiterHref = nachher ? `#/lektion/${chapterId}/${nachher}` : `#/kapitel/${chapterId}`;
    weiterText = nachher ? 'Weiter im Training →' : 'Zur Runde →';
  } else if (art === 'abpfiff') {
    weiterHref = naechstes ? `#/szene/${naechstes.id}/anpfiff` : '#/showtime';
    weiterText = naechstes ? `Anpfiff Runde ${index + 2} →` : '🏆 Showtime →';
  }

  app.innerHTML = `
    <div class="lektion-seite szene-seite">
      ${zurueck}
      <div class="szene-kopf" style="--farbe:${escapeHtml(runde?.farbe || kapitel.color)}">
        <div class="szene-teams">
          <span class="szene-team">${nachtschichtEmblem({ groesse: 52 })}<span>Nachtschicht</span></span>
          <span class="szene-vs">${info.icon}</span>
          <span class="szene-team">${crewEmblem(runde, { groesse: 52, raus: art === 'abpfiff' })}<span>${escapeHtml(runde?.crew || '')}</span></span>
        </div>
        <div>
          <span class="chip chip-farbe" style="--farbe:${escapeHtml(runde?.farbe || kapitel.color)}">${info.icon} ${info.titel} · Runde ${index + 1}</span>
          <h1>${escapeHtml(info.titel)}: ${escapeHtml(kapitel.title)}</h1>
          <p>${escapeHtml(info.untertitel)}${schonGesehen ? ' · schon gesehen, diesmal ohne XP' : ''}</p>
        </div>
      </div>
      <div class="szene-verlauf" id="verlauf" aria-live="polite"></div>
      <div class="szene-steuerung" id="steuerung">
        <button class="btn btn-geist btn-klein" type="button" id="skip">Überspringen ›</button>
        <span class="szene-hinweis">Weiter mit Klick, Leertaste oder →</span>
        <button class="btn btn-primaer" type="button" id="weiter">Weiter ›</button>
      </div>
    </div>`;

  const verlauf = app.querySelector('#verlauf');
  const steuerung = app.querySelector('#steuerung');
  const btnWeiter = app.querySelector('#weiter');

  function blase(zeile) {
    const el = document.createElement('div');
    el.className = `szene-zeile ${zeile.wer === 'gegner' ? 'gegner' : ''} ${zeile.wer === 'robby' ? 'robby' : ''}`;
    el.innerHTML = `${sprecherHtml(zeile, runde)}<div class="szene-text">${md(aufloesen(zeile.text, runde))}</div>`;
    verlauf.appendChild(el);
    requestAnimationFrame(() => el.classList.add('an'));
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    sound.klick();
  }

  function aufgabe() {
    phase = 'aufgabe';
    steuerung.hidden = true;
    const karte = document.createElement('section');
    karte.className = 'schritt szene-aufgabe slide-vor';
    verlauf.appendChild(karte);
    karte.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    renderStep(karte, { ...szene.aufgabe, type: szene.aufgabe.type }, {
      solved: () => {
        sound.richtig();
        zaehle('correct');
        if (!schonGesehen) {
          const erg = vergibXp(xpTabelle[art] || 20, { key: `${id}#xp` });
          xpGesamt += erg.xp;
          verarbeiteXp(erg, karte);
          if (versuche === 0) {
            const bonus = vergibXp(xpTabelle.volltreffer || 10, { key: `${id}#volltreffer` });
            xpGesamt += bonus.xp;
            if (art === 'anpfiff') zaehle('spaehVolltreffer');
            if (bonus.xp) setTimeout(() => toast({ titel: 'Volltreffer!', text: `Beim ersten Versuch – +${bonus.xp} XP extra.`, icon: '🎯', art: 'ok' }), 400);
          }
        }
        const zeile = document.createElement('div');
        zeile.className = 'schritt-buttons';
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn btn-primaer';
        b.textContent = 'Weiter ›';
        b.addEventListener('click', () => {
          zeile.remove();
          weiter();
        });
        zeile.appendChild(b);
        karte.appendChild(zeile);
        b.focus();
        phase = 'ausklang';
      },
      wrong: () => {
        versuche++;
        zaehle('wrong');
        sound.falsch();
      },
    });
  }

  function ende() {
    phase = 'ende';
    steuerung.hidden = true;
    const erste = setSzeneGesehen(id);
    const bonus = tagesbonusPruefen();
    const neu = abzeichenPruefen({ ereignis: 'szene' });
    const karte = document.createElement('section');
    karte.className = 'schritt abschluss szene-ende slide-vor';
    const trophaee = art === 'abpfiff' && runde ? `<div class="trophaee-buehne">${trophaeenKarteHtml(runde, { gewonnen: true })}<p class="szene-hinweis">Klick auf die Karte: Auf der Rückseite stehen Fehler und Regel – zum Nachlesen jederzeit auf deiner <a href="#/keycard">Spielerkarte</a>.</p></div>` : '';
    karte.innerHTML = `
      ${trophaee}
      <h2>${art === 'abpfiff' ? 'Runde gewonnen – Karte gesammelt!' : art === 'anpfiff' ? 'Spähbericht abgeschlossen' : 'Funkspruch beendet'}</h2>
      ${xpGesamt ? `<div class="abschluss-xp">+${xpGesamt} XP</div>` : erste ? '' : '<p style="color:var(--muted)">Schon gesehen – keine neuen XP, aber Wiederholung sitzt.</p>'}
      ${bonus?.xp ? `<div class="hinweis-box">🎯 Tagesziel erreicht: alle drei Ziele geschafft – <strong>+${bonus.xp} XP</strong> Bonus.</div>` : ''}
      <div class="abschluss-buttons">
        <a class="btn btn-primaer" href="${weiterHref}">${weiterText}</a>
        <a class="btn btn-sekundaer" href="#/kapitel/${chapterId}">Zur Runde</a>
        <a class="btn btn-geist" href="#/">Turnierplan</a>
      </div>`;
    verlauf.appendChild(karte);
    trophaeenAktivieren(karte);
    karte.scrollIntoView({ block: 'start', behavior: 'smooth' });
    if (art === 'abpfiff') {
      sound.fanfare();
      konfetti('gross');
      setTimeout(() => karte.querySelector('.trophaeenkarte')?.classList.add('umgedreht'), 1800);
    } else {
      sound.xp();
    }
    meldeAbzeichen(neu);
  }

  function weiter() {
    if (phase === 'dialog') {
      if (zeilenIndex < zeilen.length) {
        blase(zeilen[zeilenIndex++]);
        if (zeilenIndex >= zeilen.length) {
          btnWeiter.textContent = szene.aufgabe ? 'Zur Aufgabe ›' : 'Weiter ›';
        }
        return;
      }
      if (szene.aufgabe) return aufgabe();
      phase = 'ausklang';
    }
    if (phase === 'ausklang') {
      steuerung.hidden = false;
      if (ausklangIndex < ausklang.length) {
        blase(ausklang[ausklangIndex++]);
        if (ausklangIndex >= ausklang.length) btnWeiter.textContent = 'Abschließen ›';
        return;
      }
      return ende();
    }
  }

  btnWeiter.addEventListener('click', weiter);
  app.querySelector('#skip').addEventListener('click', () => {
    // Alle restlichen Zeilen anzeigen, Aufgabe überspringen (keine XP), Ende
    while (zeilenIndex < zeilen.length) blase(zeilen[zeilenIndex++]);
    while (ausklangIndex < ausklang.length) blase(ausklang[ausklangIndex++]);
    ende();
  });
  verlauf.addEventListener('click', (e) => {
    if (phase !== 'dialog' && phase !== 'ausklang') return;
    if (e.target.closest('button, a, .schritt')) return;
    weiter();
  });
  const onKey = (e) => {
    if (!app.isConnected) {
      window.removeEventListener('keydown', onKey);
      return;
    }
    if (phase !== 'dialog' && phase !== 'ausklang') return;
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      if (e.key === ' ' || e.key === 'Enter') {
        if (document.activeElement?.tagName === 'BUTTON' && document.activeElement !== btnWeiter) return;
        e.preventDefault();
      }
      weiter();
    }
  };
  window.addEventListener('keydown', onKey);

  weiter();
  return { destroy: () => window.removeEventListener('keydown', onKey) };
}

// Für Kapitel- und Startseite: welche Zwischenspiele hat eine Runde, und welche sind gesehen?
export async function szenenStand(chapterId) {
  const sz = await szenenFuer(chapterId);
  if (!sz) return null;
  const s = getState();
  const stand = {};
  for (const art of Object.keys(SZENEN_ARTEN)) {
    if (!sz[art]) continue;
    stand[art] = { vorhanden: true, gesehen: !!s.story.gesehen[szeneId(chapterId, art)], nach: sz[art].nach || null };
  }
  return stand;
}

// Titel einer Lektion (für Hinweise „Funk nach Lektion X“)
export async function lektionsTitel(chapterId, lessonId) {
  return loadLesson(chapterId, lessonId).then((l) => l.title).catch(() => lessonId);
}
