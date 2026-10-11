// Lektions-Player: Soundcheck (Wiederholung) → Schritte (ein Schritt pro Seite) → Abschluss.
// XP pro Schritt (einmalig), Serie/Combo, Sterne, Abzeichen, Etappen-Speicherung.
// Didaktik-Schicht: „Nachlesen“ (Erklärungen dieser Lektion + Spickzettel) ist in jedem
// Aufgaben-Schritt erreichbar, die Aufgabe bleibt als Leiste sichtbar, wenn sie aus dem
// Bild scrollt, und am Ende stehen die Merksätze der Lektion.

import { loadChapter, loadLesson, loadAlleKapitel, loadKonzepte, naechsteLektion, poolFuer, etappeAufloesen } from '../content.js';
import {
  getState, vergibXp, zaehle, merkeCombo, lektionAbschliessen, loesungMerken, abzeichenPruefen,
  frageGestellt, getProjekt, projektSpeichern, lessonKey, aktivitaet, tagesbonusPruefen,
} from '../store.js';
import { antwort as leitnerAntwort, soundcheckAuswahl } from '../gamification/leitner.js';
import { XP, comboFaktor } from '../gamification/xp.js';
import { kapitelFrei, lektionFrei, kapitelFertig } from '../progress.js';
import { renderStep, SCHRITT_NAMEN, SCHRITT_ICONS } from '../engine/steps.js';
import { md, escapeHtml } from '../engine/markdown.js';
import { sound } from '../gamification/sound.js';
import { konfetti, toast, xpFlieger } from '../gamification/celebrate.js';
import { erzeugeTicker, reaktionenEntfernen } from '../gamification/reaktionen.js';
import { oeffneNachschlagen, nachschlagenSchliessen } from '../engine/nachschlagen.js';

const robby = (pose) => new URL(`figuren/robby/${pose}.png`, document.baseURI).href;

function xpFuerStep(step) {
  if (step.etappe) return XP.etappe;
  if (step.type === 'code') return step.mode === 'fix' ? XP.fix : XP.code;
  return XP[step.type] || 0;
}

export function zeigeLevelup(level, rang) {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `<div class="overlay-karte">
    <img src="${robby('erfolg-pokal')}" alt="" style="width:120px;height:120px;object-fit:contain">
    <div class="chip chip-farbe" style="--farbe: var(--spark)">${rang ? 'Neuer Rang' : 'Level-up'}</div>
    <div class="gross">${rang ? rang.titel : `Level ${level}`}</div>
    <p style="color:var(--muted)">${rang ? `Du bist jetzt ${rang.titel} der Nachtschicht.` : 'Weiter so – die Crew zählt auf dich.'}</p>
    <button class="btn btn-primaer" type="button">Weiter</button>
  </div>`;
  document.body.appendChild(overlay);
  sound.levelup();
  konfetti('mittel');
  const weg = () => overlay.remove();
  overlay.querySelector('button').addEventListener('click', weg);
  overlay.addEventListener('click', (e) => e.target === overlay && weg());
}

export function meldeAbzeichen(neu) {
  neu.forEach((a, i) => {
    setTimeout(() => {
      toast({ titel: `Abzeichen: ${a.titel}`, text: a.text, icon: a.icon, art: 'abzeichen', dauer: 5000 });
      sound.abzeichen();
    }, i * 700);
  });
}

export function verarbeiteXp(ergebnis, anker) {
  if (!ergebnis || !ergebnis.xp) return;
  xpFlieger(ergebnis.xp, anker);
  sound.xp();
  if (ergebnis.rangup) setTimeout(() => zeigeLevelup(ergebnis.levelup, ergebnis.rangup), 500);
  else if (ergebnis.levelup) setTimeout(() => zeigeLevelup(ergebnis.levelup), 500);
}

export async function renderLesson(app, chapterId, lessonId) {
  const [kapitel, lektion, alle] = await Promise.all([loadChapter(chapterId), loadLesson(chapterId, lessonId), loadAlleKapitel()]);
  const index = alle.findIndex((k) => k.id === chapterId);
  if (!lektionFrei(kapitel, lessonId, kapitelFrei(index, alle))) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/kapitel/${chapterId}">← ${escapeHtml(kapitel.title)}</a>
      <div class="karte gesperrt-karte"><h2>🔒 Noch gesperrt</h2><p>Erst die vorherige Lektion abschließen.</p></div></div>`;
    return;
  }

  // Etappen auflösen (Starter aus dem Projektstand, wenn vorhanden)
  const steps = await Promise.all(
    lektion.steps.map(async (step) => {
      if (step.type !== 'code' || !step.etappe) return step;
      const e = await etappeAufloesen(step.etappe);
      const projekt = getProjekt();
      const files = { ...e.starter };
      if (files.html != null && e.page && projekt.pages[e.page] != null) files.html = projekt.pages[e.page];
      if (files.css != null && projekt.css != null) files.css = projekt.css;
      if (files.js != null && projekt.js != null) files.js = projekt.js;
      return { ...step, task: e.task, hints: e.hints, tests: e.tests, starter: files, solution: e.solution, editable: e.editable, project: e.project, etappeId: e.id, titel: e.titel };
    })
  );

  const key = lessonKey(chapterId, lessonId);
  const schonErledigt = !!getState().lessons[key]?.done;
  const ticker = await erzeugeTicker(chapterId);
  const runde = ticker.runde;
  const ctx = { fehler: 0, tipps: 0, loesungGesehen: false, serie: 0, xpGesamt: 0, xpListe: [], comebackKandidat: 0 };

  // Nachschlagen: Erklärungen dieser Lektion bis zum aktuellen Schritt + Spickzettel
  let aktuellerStepIndex = 0;
  const nachschlagenOptionen = (extra = {}) => ({ lektion, bisIndex: aktuellerStepIndex, konzeptIds: lektion.konzepte || [], ...extra });
  const nachlesen = (extra) => oeffneNachschlagen(nachschlagenOptionen(extra));

  app.innerHTML = `
    <div class="lektion-seite">
      <div class="lektion-kopf">
        <a class="zurueck" href="#/kapitel/${chapterId}">← ${kapitel.icon} ${escapeHtml(kapitel.title)}</a>
        <h1>${escapeHtml(lektion.title)}</h1>
        ${runde ? `<span class="chip chip-farbe" style="--farbe:${escapeHtml(runde.farbe)}" title="Training für das Match gegen ${escapeHtml(runde.crew)}">${runde.icon} Runde ${runde.runde} · vs. ${escapeHtml(runde.crew)}</span>` : ''}
        <span class="combo-anzeige" id="combo">🔥 Serie <span id="combo-zahl">0</span> · ×<span id="combo-faktor">1</span></span>
        <button class="btn btn-geist btn-klein nachschlagen-knopf" type="button" id="nachlesen" title="Erklärungen dieser Lektion und Spickzettel – ohne Lösung">📖 Nachlesen</button>
        <div class="pager-fortschritt">
          <span class="pager-zaehler"></span>
          <div class="pager-dots" role="tablist"></div>
        </div>
      </div>
      <div class="aufgaben-leiste" id="aufgaben-leiste" aria-live="polite">
        <div style="flex:1;min-width:0"><div class="schritt-art" id="al-art"></div><div class="aufgaben-text" id="al-text"></div></div>
        <div class="aufgaben-knoepfe">
          <button class="btn btn-geist btn-klein" type="button" id="al-mehr">Ganze Aufgabe</button>
          <button class="btn btn-sekundaer btn-klein" type="button" id="al-nachlesen">📖 Nachlesen</button>
        </div>
      </div>
      <div class="pager"><div class="pager-seiten"></div></div>
      <div class="pager-nav">
        <button class="btn btn-sekundaer pager-zurueck" type="button">← Zurück</button>
        <span class="pager-hinweis"></span>
        <button class="btn btn-primaer pager-weiter" type="button">Weiter →</button>
      </div>
    </div>`;

  const seitenEl = app.querySelector('.pager-seiten');
  const dotsEl = app.querySelector('.pager-dots');
  const zaehlerEl = app.querySelector('.pager-zaehler');
  const hinweisEl = app.querySelector('.pager-hinweis');
  const btnZurueck = app.querySelector('.pager-zurueck');
  const btnWeiter = app.querySelector('.pager-weiter');
  const navEl = app.querySelector('.pager-nav');
  const comboEl = app.querySelector('#combo');
  const leiste = app.querySelector('#aufgaben-leiste');
  app.querySelector('#nachlesen').addEventListener('click', () => nachlesen());
  app.querySelector('#al-nachlesen').addEventListener('click', () => nachlesen());
  app.querySelector('#al-mehr').addEventListener('click', () => {
    leiste.classList.toggle('offen');
    app.querySelector('#al-mehr').textContent = leiste.classList.contains('offen') ? 'Weniger' : 'Ganze Aufgabe';
  });

  function comboAnzeigen() {
    comboEl.classList.toggle('an', ctx.serie >= 2);
    comboEl.querySelector('#combo-zahl').textContent = ctx.serie;
    comboEl.querySelector('#combo-faktor').textContent = String(comboFaktor(ctx.serie)).replace('.', ',');
  }

  function richtig() {
    ctx.serie++;
    merkeCombo(ctx.serie);
    zaehle('correct');
    comboAnzeigen();
    sound.richtig();
  }
  function falsch() {
    ctx.serie = 0;
    ctx.fehler++;
    zaehle('wrong');
    comboAnzeigen();
    sound.falsch();
  }

  // Kleiner „Nachlesen“-Link unter einer Rückmeldung (einmal pro Karte)
  function nachlesenLink(karte, extra, text = '📖 Nachlesen: Erklärung und Beispiele zu diesem Thema') {
    if (karte.querySelector('.nachlesen-link')) return;
    const a = document.createElement('button');
    a.type = 'button';
    a.className = 'btn btn-geist btn-klein nachlesen-link';
    a.textContent = text;
    a.addEventListener('click', () => nachlesen(extra));
    karte.appendChild(a);
  }

  /* ---------- Blätter-Zustand (vor dem Rendern, weil Erklär-Schritte sich sofort als gelöst melden) ---------- */
  const seiten = []; // { el, geloest, art, stepIndex }
  let dots = [];
  let aktuell = 0;
  let maxErreicht = 0;
  let abschlussKarte = null;
  const s0 = getState();
  const gelernte = Object.keys(s0.leitner);
  let soundcheckFragen = [];
  if (gelernte.length) {
    const kapitelBis = alle.slice(0, index + 1).map((k) => k.id);
    const pool = await poolFuer(kapitelBis);
    const konzepte = soundcheckAuswahl(s0, 3);
    const benutzt = new Set();
    for (const kz of konzepte) {
      let kandidaten = pool.filter((f) => f.konzept === kz && !benutzt.has(f.id) && !s0.recentQuestions.includes(f.id));
      if (!kandidaten.length) kandidaten = pool.filter((f) => f.konzept === kz && !benutzt.has(f.id));
      if (!kandidaten.length) kandidaten = pool.filter((f) => !benutzt.has(f.id) && gelernte.includes(f.konzept));
      if (!kandidaten.length) continue;
      const f = kandidaten[Math.floor(Math.random() * kandidaten.length)];
      benutzt.add(f.id);
      soundcheckFragen.push(f);
    }
  }

  if (soundcheckFragen.length) {
    const sc = document.createElement('section');
    sc.className = 'schritt schritt-soundcheck pager-seite';
    sc.hidden = true;
    sc.innerHTML = `<div class="soundcheck-kopf">
        <img src="${robby('erklaeren')}" alt="" style="width:64px;height:64px;object-fit:contain">
        <div style="flex:1"><div class="schritt-art">🎚️ Soundcheck</div><strong>Kurz aufwärmen: ${soundcheckFragen.length} Fragen zu Dingen, die du schon kennst.</strong><div style="color:var(--muted);font-size:0.9rem">Jede richtige Antwort bringt ${XP.soundcheck} XP${schonErledigt ? ' (Lektion schon geschafft – diesmal ohne XP)' : ''} und zählt fürs Tagesziel. Falsch? Dann gibt es den passenden Spickzettel zum Nachlesen.</div></div>
        <button class="btn btn-geist btn-klein sc-skip" type="button">Überspringen</button>
      </div>
      <div class="sc-fragen"></div>`;
    seitenEl.appendChild(sc);
    const fragenEl = sc.querySelector('.sc-fragen');
    let scIndex = 0;
    const seite = { el: sc, geloest: false, art: 'soundcheck', stepIndex: 0 };
    seiten.push(seite);

    function naechsteFrage() {
      fragenEl.innerHTML = '';
      if (scIndex >= soundcheckFragen.length) {
        seite.geloest = true;
        fragenEl.innerHTML = `<div class="rueckmeldung rueckmeldung-ok"><strong>Soundcheck fertig.</strong> Jetzt geht's los.</div>`;
        aktualisiereNav();
        return;
      }
      const f = soundcheckFragen[scIndex];
      const box = document.createElement('div');
      box.className = 'sc-frage';
      fragenEl.appendChild(box);
      let versucht = false;
      renderStep(box, f, {
        solved: () => {
          frageGestellt(f.id);
          if (!versucht) {
            leitnerAntwort(getState(), f.konzept, true);
            zaehle('soundcheckCorrect');
            aktivitaet('soundcheck');
            richtig();
            if (!schonErledigt) {
              const erg = vergibXp(XP.soundcheck, { key: `${key}#sc:${f.id}:${s0.lessonCounter}` });
              ctx.xpGesamt += erg.xp;
              verarbeiteXp(erg, box);
            }
          }
          const weiter = document.createElement('button');
          weiter.type = 'button';
          weiter.className = 'btn btn-primaer';
          weiter.textContent = scIndex + 1 < soundcheckFragen.length ? 'Nächste Frage →' : 'Soundcheck abschließen ✔';
          weiter.addEventListener('click', () => {
            scIndex++;
            naechsteFrage();
          });
          const zeile = document.createElement('div');
          zeile.className = 'schritt-buttons';
          zeile.appendChild(weiter);
          box.appendChild(zeile);
        },
        wrong: () => {
          if (!versucht) leitnerAntwort(getState(), f.konzept, false);
          versucht = true;
          falsch();
          nachlesenLink(box, { tab: 'spickzettel', fokus: f.konzept, konzeptIds: [f.konzept, ...(lektion.konzepte || [])] }, '📖 Spickzettel zu dieser Frage');
        },
      });
    }
    sc.querySelector('.sc-skip').addEventListener('click', () => {
      seite.geloest = true;
      scIndex = soundcheckFragen.length;
      naechsteFrage();
      weiter();
    });
    naechsteFrage();
  }

  /* ---------- Schritte ---------- */
  const controller = [];
  steps.forEach((step, i) => {
    const karte = document.createElement('section');
    karte.className = `schritt schritt-${step.type} pager-seite`;
    karte.hidden = true;
    seitenEl.appendChild(karte);
    const seite = { el: karte, geloest: false, art: step.type, stepIndex: i, step };
    seiten.push(seite);
    const stepKey = `${key}#${i}`;
    let fehlversucheHier = 0;

    const c = renderStep(karte, step, {
      allowSolution: step.type === 'code' && !!step.solution,
      solved: (info) => {
        if (seite.geloest) return;
        seite.geloest = true;
        if (!info?.sofort) {
          richtig();
          ticker.erfolg({ serie: ctx.serie, comeback: fehlversucheHier >= 3 });
          if (fehlversucheHier >= 3) {
            zaehle('comebacks');
            meldeAbzeichen(abzeichenPruefen({ ereignis: 'comeback' }));
          }
          const betrag = xpFuerStep(step);
          if (betrag) {
            const erg = vergibXp(betrag, { key: stepKey, serie: ctx.serie });
            if (erg.xp) {
              ctx.xpGesamt += erg.xp;
              ctx.xpListe.push([`${SCHRITT_ICONS[step.type]} ${step.etappe ? 'Etappe' : SCHRITT_NAMEN[step.type]}${ctx.serie >= 3 ? ` (Serie ×${comboFaktor(ctx.serie)})` : ''}`, erg.xp]);
            }
            verarbeiteXp(erg, karte.querySelector('.rueckmeldung-ok') || karte);
          }
          if (step.type === 'code') {
            zaehle('codePassed');
            if (info.eigene) loesungMerken(chapterId, lessonId, i, info.eigene);
            if (step.etappe && step.project?.save) {
              const save = step.project.save;
              projektSpeichern({
                page: save.includes('html') ? step.project.page : null,
                html: save.includes('html') ? info.files.html : null,
                css: save.includes('css') ? info.files.css : null,
                js: save.includes('js') ? info.files.js : null,
                etappeId: step.etappeId,
              });
              const ok = karte.querySelector('.rueckmeldung-ok');
              if (ok) ok.innerHTML += ' <a href="#/projekt">In der FUNKEN-Website gespeichert →</a>';
              konfetti('klein');
            }
            meldeAbzeichen(abzeichenPruefen({ ereignis: 'code' }));
          }
        }
        if (dots.length && seiten.indexOf(seite) === aktuell) aktualisiereNav();
      },
      wrong: () => {
        fehlversucheHier++;
        falsch();
        ticker.fehler(fehlversucheHier);
        // Nach dem ersten Fehlversuch: Erklärung dieser Lektion nachlesen – ohne Lösung
        nachlesenLink(karte, {});
      },
      hint: () => {
        ctx.tipps++;
        zaehle('hintsUsed');
      },
      solutionViewed: () => {
        ctx.loesungGesehen = true;
      },
    });
    controller.push(c);
  });

  /* ---------- Aufgaben-Leiste: Aufgabe bleibt sichtbar, wenn sie aus dem Bild scrollt ---------- */
  let beobachter = null;
  function leisteFuer(seite) {
    if (beobachter) {
      beobachter.disconnect();
      beobachter = null;
    }
    leiste.classList.remove('an', 'offen');
    app.querySelector('#al-mehr').textContent = 'Ganze Aufgabe';
    const step = seite?.step;
    if (!step || ['explain', 'example'].includes(step.type)) return;
    const text = step.task || step.question || step.text || '';
    if (!text) return;
    app.querySelector('#al-art').textContent = `${SCHRITT_ICONS[step.type] || ''} ${step.mode === 'fix' ? 'Fehlerjagd' : step.etappe ? 'Etappe · FUNKEN-Website' : SCHRITT_NAMEN[step.type] || ''}`;
    app.querySelector('#al-text').innerHTML = md(text);
    const inhalt = seite.el.querySelector('.schritt-inhalt');
    if (!inhalt || !('IntersectionObserver' in window)) return;
    beobachter = new IntersectionObserver(
      (eintraege) => {
        const e = eintraege[0];
        const weg = !e.isIntersecting && e.boundingClientRect.top < 60;
        leiste.classList.toggle('an', weg);
      },
      { rootMargin: '-60px 0px 0px 0px', threshold: 0 }
    );
    beobachter.observe(inhalt);
  }

  /* ---------- Blättern ---------- */
  dots = seiten.map((seite, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'pager-dot';
    dot.title = seite.art === 'soundcheck' ? 'Soundcheck' : `Schritt ${i + (soundcheckFragen.length ? 0 : 1)}: ${SCHRITT_NAMEN[seite.art] || seite.art}`;
    dot.addEventListener('click', () => {
      if (i <= maxErreicht) zeige(i);
    });
    dotsEl.appendChild(dot);
    return dot;
  });

  function aktualisiereNav() {
    const amEnde = aktuell >= seiten.length;
    navEl.hidden = amEnde;
    if (amEnde) return;
    const seite = seiten[aktuell];
    btnZurueck.disabled = aktuell === 0;
    const frei = seite.geloest;
    btnWeiter.disabled = !frei;
    btnWeiter.classList.toggle('pager-weiter-bereit', frei && !['explain', 'example', 'soundcheck'].includes(seite.art));
    btnWeiter.textContent = aktuell === seiten.length - 1 ? 'Lektion abschließen ✔' : 'Weiter →';
    const namen = { quiz: 'das Quiz', fill: 'den Lückentext', order: 'die Sortieraufgabe', pair: 'die Zuordnung', code: 'die Aufgabe', soundcheck: 'den Soundcheck', bug: 'die Fehlerjagd' };
    hinweisEl.textContent = frei ? '' : `Löse ${namen[seite.art] || 'die Aufgabe'}, um weiterzublättern.`;
    zaehlerEl.textContent = seite.art === 'soundcheck' ? 'Soundcheck' : `Schritt ${aktuell + 1 - (soundcheckFragen.length ? 1 : 0)} von ${steps.length}`;
    dots.forEach((d, i) => {
      d.classList.toggle('aktiv', i === aktuell);
      d.classList.toggle('erledigt', seiten[i].geloest && i !== aktuell);
      d.classList.toggle('erreichbar', i <= maxErreicht);
    });
  }

  function zeige(i, richtung = i > aktuell ? 'vor' : 'zurueck') {
    seiten.forEach((s) => (s.el.hidden = true));
    if (abschlussKarte) abschlussKarte.hidden = true;
    aktuell = i;
    maxErreicht = Math.max(maxErreicht, i);
    const seite = i < seiten.length ? seiten[i] : null;
    aktuellerStepIndex = seite?.art === 'soundcheck' ? 0 : seite ? seite.stepIndex : steps.length;
    const ziel = i >= seiten.length ? abschlussKarte : seiten[i].el;
    if (ziel) {
      ziel.hidden = false;
      ziel.classList.remove('slide-vor', 'slide-zurueck');
      void ziel.offsetWidth;
      ziel.classList.add(richtung === 'vor' ? 'slide-vor' : 'slide-zurueck');
      const wb = ziel.querySelector('.cm-editor');
      if (wb) setTimeout(() => wb.querySelector('.cm-content')?.dispatchEvent(new Event('resize')), 50);
    }
    nachschlagenSchliessen();
    leisteFuer(seite);
    aktualisiereNav();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function sterneBerechnen() {
    if (ctx.loesungGesehen) return 1;
    let sterne = 3;
    if (ctx.fehler >= 3) sterne -= 2;
    else if (ctx.fehler >= 1) sterne -= 1;
    if (ctx.tipps >= 1) sterne -= 1;
    return Math.max(1, sterne);
  }

  async function lektionGeschafft() {
    const sterne = sterneBerechnen();
    const { erster } = lektionAbschliessen(chapterId, lessonId, { stars: sterne, konzepte: lektion.konzepte || [], fehler: ctx.fehler, tipps: ctx.tipps });
    const erg = vergibXp(XP.lektion, { key: `${key}#lektion` });
    if (erg.xp) {
      ctx.xpGesamt += erg.xp;
      ctx.xpListe.push(['🏁 Lektion abgeschlossen', erg.xp]);
    }
    let erg2 = null;
    if (sterne === 3) {
      erg2 = vergibXp(XP.lektionPerfekt, { key: `${key}#perfekt` });
      if (erg2.xp) {
        ctx.xpGesamt += erg2.xp;
        ctx.xpListe.push(['⭐ 3 Sterne', erg2.xp]);
      }
    }
    const bonus = tagesbonusPruefen();
    if (bonus?.xp) {
      ctx.xpGesamt += bonus.xp;
      ctx.xpListe.push(['🎯 Tagesziel erreicht', bonus.xp]);
    }
    const fertigKapitel = kapitelFertig(kapitel);
    const neu = abzeichenPruefen({ ereignis: 'lektion', kapitelFertig: (id) => (id === chapterId ? fertigKapitel : alle.find((k) => k.id === id) ? kapitelFertig(alle.find((k) => k.id === id)) : false) });
    const naechste = await naechsteLektion(chapterId, lessonId);
    const pose = sterne === 3 ? 'jubel-geschafft' : sterne === 2 ? 'gut-gemacht' : 'motivation-herz';
    const begruendung =
      sterne === 3
        ? 'Kein Fehler, kein Tipp – sauber!'
        : ctx.loesungGesehen
          ? 'Du hast die Musterlösung angesehen – deshalb 1 Stern. Wiederhol die Lektion für mehr.'
          : `${ctx.fehler} Fehler${ctx.tipps ? `, ${ctx.tipps} Tipp${ctx.tipps > 1 ? 's' : ''}` : ''} – deshalb ${sterne} von 3 Sternen. Wiederholen zählt das bessere Ergebnis.`;

    // Merksätze: die Konzepte dieser Lektion in einem Satz – zum Mitnehmen
    const konzepte = await loadKonzepte().catch(() => []);
    const merksaetze = (lektion.konzepte || []).map((id) => konzepte.find((k) => k.id === id)).filter((k) => k && k.merke);
    const wiederholt = !merksaetze.length && /wiederholung|projekt|zusammen/.test(lessonId);

    abschlussKarte = document.createElement('section');
    abschlussKarte.className = 'schritt schritt-abschluss pager-seite abschluss';
    abschlussKarte.innerHTML = `
      <img src="${robby(pose)}" alt="" style="width:130px;height:130px;object-fit:contain">
      <h2>${erster ? 'Lektion geschafft!' : 'Nochmal geschafft!'}</h2>
      <div class="sterne-gross">${[1, 2, 3].map((n) => `<span class="stern ${n <= sterne ? '' : 'leer'}">★</span>`).join('')}</div>
      <p style="color:var(--muted)">${begruendung}</p>
      ${ctx.xpGesamt ? `<div class="abschluss-xp">+${ctx.xpGesamt} XP</div><ul class="abschluss-liste">${ctx.xpListe.map(([t, x]) => `<li><span>${t}</span><span>+${x}</span></li>`).join('')}</ul>` : '<p style="color:var(--muted)">Wiederholt – keine neuen XP, aber Übung macht sicher.</p>'}
      ${merksaetze.length ? `<div class="merksaetze"><h3>💡 Das nimmst du mit</h3><ul>${merksaetze.map((k) => `<li><b>${escapeHtml(k.titel)}:</b> ${escapeHtml(k.merke)}</li>`).join('')}</ul><button class="btn btn-geist btn-klein" type="button" id="merk-nachlesen" style="margin-top:0.5rem">📖 Karten im Spickzettel ansehen</button></div>` : ''}
      ${wiederholt ? `<div class="merksaetze"><h3>🔁 Wiederholung</h3><p style="margin:0;font-size:0.92rem">Diese Lektion hat Altes neu verknüpft. Was noch wackelt, kommt im Soundcheck automatisch wieder – und steht jederzeit im <a href="#/spickzettel">Spickzettel</a>.</p></div>` : ''}
      ${fertigKapitel ? `<div class="hinweis-box" style="margin-top:0.75rem">🎉 Training komplett – jetzt das <a href="#/abnahme/${chapterId}">Match</a>${runde ? ` gegen ${escapeHtml(runde.crew)}` : ''}: Sam nimmt ab.</div>` : ''}
      <div class="abschluss-buttons">
        ${fertigKapitel ? `<a class="btn btn-primaer" href="#/abnahme/${chapterId}">🥊 Zum Match →</a>` : naechste ? `<a class="btn btn-primaer" href="#/kapitel/${chapterId}">Weiter in der Runde →</a>` : ''}
        ${steps.some((st) => st.etappe) ? '<a class="btn btn-sekundaer" href="#/projekt">🌐 FUNKEN-Website ansehen</a>' : ''}
        ${!fertigKapitel && naechste && naechste.chapterId === chapterId ? `<a class="btn btn-sekundaer" href="#/lektion/${naechste.chapterId}/${naechste.lessonId}">Direkt zur nächsten Lektion</a>` : ''}
        <button class="btn btn-geist abschluss-nochmal" type="button">← Nochmal ansehen</button>
      </div>
      <p style="color:var(--muted);font-size:0.85rem;margin-top:1rem">💾 Tipp: Auf deiner <a href="#/keycard">Spielerkarte</a> kannst du deinen Spielstand als Datei sichern – wichtig an Schulrechnern.</p>`;
    seitenEl.appendChild(abschlussKarte);
    abschlussKarte.querySelector('.abschluss-nochmal').addEventListener('click', () => zeige(0, 'zurueck'));
    abschlussKarte.querySelector('#merk-nachlesen')?.addEventListener('click', () => nachlesen({ tab: 'spickzettel', bisIndex: steps.length }));
    zeige(seiten.length, 'vor');
    sound.fanfare();
    konfetti(sterne === 3 ? 'gross' : 'mittel');
    if (erg.rangup) setTimeout(() => zeigeLevelup(erg.levelup, erg.rangup), 900);
    else if (erg.levelup || erg2?.levelup) setTimeout(() => zeigeLevelup(erg.levelup || erg2.levelup), 900);
    meldeAbzeichen(neu);
  }

  function weiter() {
    if (aktuell >= seiten.length || !seiten[aktuell].geloest) return;
    if (aktuell === seiten.length - 1) {
      if (abschlussKarte) zeige(seiten.length, 'vor');
      else lektionGeschafft();
    } else zeige(aktuell + 1, 'vor');
  }
  function zurueck() {
    if (aktuell > 0) zeige(aktuell - 1, 'zurueck');
  }
  btnWeiter.addEventListener('click', weiter);
  btnZurueck.addEventListener('click', zurueck);

  const onKey = (e) => {
    if (!app.isConnected) {
      window.removeEventListener('keydown', onKey);
      return;
    }
    const tag = document.activeElement?.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT' || document.activeElement?.closest('.cm-editor, .nachschlagen')) return;
    if (e.key === 'ArrowRight') weiter();
    if (e.key === 'ArrowLeft') zurueck();
  };
  window.addEventListener('keydown', onKey);

  const pagerEl = app.querySelector('.pager');
  let touchStartX = null;
  let touchStartY = null;
  pagerEl.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  pagerEl.addEventListener('touchend', (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    touchStartX = null;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;
    if (e.target.closest('textarea, input, iframe, .cm-editor, .sortier, .paare')) return;
    if (dx < 0) weiter();
    else zurueck();
  }, { passive: true });

  zeige(0, 'vor');
  comboAnzeigen();

  return {
    destroy: () => {
      window.removeEventListener('keydown', onKey);
      reaktionenEntfernen();
      nachschlagenSchliessen();
      if (beobachter) beobachter.disconnect();
      controller.forEach((c) => c?.destroy?.());
    },
  };
}
