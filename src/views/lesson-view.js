// Die Lektionsansicht: ein Schritt pro Seite – weiterblättern statt scrollen.
// Vor: Weiter-Button, Wischen nach links, Pfeiltaste rechts (erst wenn der
// Schritt gelöst ist). Zurück: jederzeit. Alle Schritte werden vorab gerendert
// und nur ein-/ausgeblendet, damit Editor-Inhalte beim Blättern erhalten bleiben.
// Schritt-Typen: explain, example, quiz, fill, code.

import { loadChapter, loadLesson, nextLessonAfter } from '../content.js';
import { markDone, isChapterLocked } from '../progress.js';
import { md } from '../markdown.js';
import { createWorkbench } from '../workbench.js';
import { runTests } from '../checker.js';
import { updateProgressBadge } from '../router.js';
import { getProjektSeite, getProjektCss, setProjektSeite, setProjektCss } from '../projekt.js';
import { merkeLoesung } from '../loesungen.js';

export async function renderLesson(app, chapterId, lessonId) {
  if (isChapterLocked(chapterId)) {
    app.innerHTML = `
      <div class="lektion-seite">
        <a class="zurueck" href="#/">← Zur Übersicht</a>
        <div class="karte gesperrt-karte">
          <p><strong>🔒 Diese Lektion gehört zu einem gesperrten Kapitel.</strong></p>
          <p>Deine Lehrkraft schaltet das Kapitel frei, sobald es im Unterricht dran ist.</p>
        </div>
      </div>`;
    return;
  }

  const [kapitel, lektion] = await Promise.all([
    loadChapter(chapterId),
    loadLesson(chapterId, lessonId),
  ]);
  const steps = lektion.steps;

  app.innerHTML = `
    <div class="lektion-seite">
      <div class="lektion-kopf">
        <a class="zurueck" href="#/kapitel/${chapterId}">← ${kapitel.icon} ${kapitel.title}</a>
        <h1 class="lektion-ueberschrift">${lektion.title}</h1>
        <div class="pager-fortschritt">
          <span class="pager-zaehler"></span>
          <div class="pager-dots" role="tablist"></div>
        </div>
      </div>
      <div class="pager">
        <div class="pager-seiten"></div>
      </div>
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

  const geloest = steps.map(() => false);
  let aktuell = 0;
  let maxErreicht = 0;
  let abschlussKarte = null;

  // Fortschrittspunkte – vor den Schritten anlegen, weil Erklär-Schritte sich
  // schon beim Rendern als gelöst melden und die Navigation aktualisieren.
  const dots = steps.map((step, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'pager-dot';
    dot.title = `Schritt ${i + 1}: ${schrittName(step)}`;
    dot.addEventListener('click', () => {
      if (i <= maxErreicht) zeige(i);
    });
    dotsEl.appendChild(dot);
    return dot;
  });

  // Alle Schritte vorab rendern (versteckt) – DOM bleibt beim Blättern erhalten.
  const karten = steps.map((step, i) => {
    const karte = document.createElement('section');
    karte.className = `schritt schritt-${step.type} pager-seite`;
    karte.hidden = true;
    seitenEl.appendChild(karte);

    const fertig = () => {
      if (geloest[i]) return;
      geloest[i] = true;
      karte.classList.add('schritt-fertig');
      if (i === aktuell) aktualisiereNav();
    };
    const ctx = { chapterId, lessonId, stepIndex: i };
    const renderer = { explain: renderExplain, example: renderExample, quiz: renderQuiz, fill: renderFill, code: renderCode }[step.type];
    if (renderer) renderer(karte, step, fertig, ctx);
    else {
      karte.innerHTML = `<p>Unbekannter Schritt-Typ: ${step.type}</p>`;
      fertig();
    }
    return karte;
  });

  function schrittName(step) {
    return { explain: 'Erklärung', example: 'Beispiel', quiz: 'Quiz', fill: 'Lückentext', code: 'Aufgabe' }[step.type] || step.type;
  }

  function aktualisiereNav() {
    const amEnde = aktuell >= steps.length;
    navEl.hidden = amEnde;
    if (amEnde) return;
    btnZurueck.disabled = aktuell === 0;
    const frei = geloest[aktuell];
    btnWeiter.disabled = !frei;
    btnWeiter.classList.toggle('pager-weiter-bereit', frei && steps[aktuell].type !== 'explain');
    btnWeiter.textContent = aktuell === steps.length - 1 ? 'Lektion abschließen ✔' : 'Weiter →';
    hinweisEl.textContent = frei ? '' : `Löse ${steps[aktuell].type === 'quiz' ? 'das Quiz' : steps[aktuell].type === 'fill' ? 'den Lückentext' : 'die Aufgabe'}, um weiterzublättern.`;
    zaehlerEl.textContent = `Schritt ${aktuell + 1} von ${steps.length}`;
    dots.forEach((d, i) => {
      d.classList.toggle('aktiv', i === aktuell);
      d.classList.toggle('erledigt', geloest[i] && i !== aktuell);
      d.classList.toggle('erreichbar', i <= maxErreicht);
    });
  }

  function zeige(index, richtung = index > aktuell ? 'vor' : 'zurueck') {
    karten.forEach((k) => (k.hidden = true));
    if (abschlussKarte) abschlussKarte.hidden = true;
    aktuell = index;
    maxErreicht = Math.max(maxErreicht, index);
    const ziel = index >= steps.length ? abschlussKarte : karten[index];
    if (ziel) {
      ziel.hidden = false;
      ziel.classList.remove('slide-vor', 'slide-zurueck');
      void ziel.offsetWidth; // Animation neu starten
      ziel.classList.add(richtung === 'vor' ? 'slide-vor' : 'slide-zurueck');
    }
    aktualisiereNav();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  async function lektionGeschafft() {
    markDone(chapterId, lessonId);
    updateProgressBadge();
    const naechste = await nextLessonAfter(chapterId, lessonId);
    abschlussKarte = document.createElement('section');
    abschlussKarte.className = 'schritt schritt-abschluss pager-seite';
    abschlussKarte.innerHTML = `
      <h2>✔ Lektion geschafft!</h2>
      <p>Stark – du hast alle ${steps.length} Schritte dieser Lektion gemeistert.</p>
      <div class="abschluss-buttons">
        ${naechste ? `<a class="btn btn-primaer" href="#/lektion/${naechste.chapterId}/${naechste.lessonId}">Nächste Lektion →</a>` : ''}
        <a class="btn btn-sekundaer" href="#/arbeitsblatt/${chapterId}">📄 Arbeitsblatt mit meinen Lösungen</a>
        <a class="btn btn-sekundaer" href="#/kapitel/${chapterId}">Zum Kapitel</a>
        <button class="btn btn-sekundaer abschluss-nochmal" type="button">← Nochmal ansehen</button>
      </div>`;
    seitenEl.appendChild(abschlussKarte);
    abschlussKarte.querySelector('.abschluss-nochmal').addEventListener('click', () => zeige(0, 'zurueck'));
    zeige(steps.length, 'vor');
  }

  function weiter() {
    if (aktuell >= steps.length || !geloest[aktuell]) return;
    if (aktuell === steps.length - 1) {
      if (abschlussKarte) zeige(steps.length, 'vor');
      else lektionGeschafft();
    } else {
      zeige(aktuell + 1, 'vor');
    }
  }

  function zurueck() {
    if (aktuell > 0) zeige(aktuell - 1, 'zurueck');
  }

  btnWeiter.addEventListener('click', weiter);
  btnZurueck.addEventListener('click', zurueck);

  // Pfeiltasten (nicht, während im Editor getippt wird)
  const onKey = (e) => {
    if (!app.isConnected) {
      window.removeEventListener('keydown', onKey);
      return;
    }
    const tag = document.activeElement?.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT') return;
    if (e.key === 'ArrowRight') weiter();
    if (e.key === 'ArrowLeft') zurueck();
  };
  window.addEventListener('keydown', onKey);

  // Wischen (Touch): nach links = weiter, nach rechts = zurück
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
    if (e.target.closest('textarea, input, iframe')) return;
    if (dx < 0) weiter();
    else zurueck();
  }, { passive: true });

  zeige(0, 'vor');
}

/* ---------- Schritt-Renderer ---------- */

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function grafik(step) {
  return step.figure ? `<div class="schritt-grafik">${step.figure}</div>` : '';
}

function renderExplain(karte, step, fertig) {
  karte.innerHTML = `${grafik(step)}<div class="schritt-inhalt">${md(step.text)}</div>`;
  fertig();
}

function renderExample(karte, step, fertig) {
  karte.innerHTML = `${grafik(step)}<div class="schritt-inhalt">${md(step.text)}</div>`;
  const files = {};
  ['html', 'css', 'js'].forEach((k) => {
    if (step[k] != null) files[k] = step[k];
  });
  createWorkbench(karte, files, { editable: step.editable });
  fertig();
}

function renderQuiz(karte, step, fertig) {
  karte.innerHTML = `
    ${grafik(step)}
    <div class="schritt-inhalt">${md(step.question)}</div>
    <div class="quiz-optionen"></div>
    <div class="rueckmeldung" hidden></div>`;
  const optionenEl = karte.querySelector('.quiz-optionen');
  const feedback = karte.querySelector('.rueckmeldung');

  step.options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.innerHTML = md(option);
    btn.addEventListener('click', () => {
      if (i === step.correct) {
        btn.classList.add('quiz-richtig');
        optionenEl.querySelectorAll('button').forEach((b) => (b.disabled = true));
        feedback.hidden = false;
        feedback.className = 'rueckmeldung rueckmeldung-ok';
        feedback.innerHTML = `<strong>Richtig!</strong> ${step.explanation ? md(step.explanation) : ''}`;
        fertig();
      } else {
        btn.classList.add('quiz-falsch');
        btn.disabled = true;
        feedback.hidden = false;
        feedback.className = 'rueckmeldung rueckmeldung-fehler';
        feedback.textContent = 'Leider nein – probier eine andere Antwort.';
      }
    });
    optionenEl.appendChild(btn);
  });
}

function renderFill(karte, step, fertig) {
  karte.innerHTML = `${grafik(step)}<div class="schritt-inhalt">${md(step.text)}</div>`;

  const zeile = document.createElement('div');
  zeile.className = 'fill-zeile codeblock';
  const teile = step.template.split('___');
  teile.forEach((teil, i) => {
    zeile.appendChild(document.createTextNode(teil));
    if (i < teile.length - 1) {
      const input = document.createElement('input');
      input.className = 'fill-input';
      input.type = 'text';
      input.spellcheck = false;
      input.setAttribute('autocapitalize', 'off');
      zeile.appendChild(input);
    }
  });
  karte.appendChild(zeile);

  const feedback = document.createElement('div');
  feedback.className = 'rueckmeldung';
  feedback.hidden = true;
  karte.appendChild(feedback);

  const buttons = document.createElement('div');
  buttons.className = 'schritt-buttons';
  const pruefen = document.createElement('button');
  pruefen.type = 'button';
  pruefen.className = 'btn btn-primaer';
  pruefen.textContent = 'Prüfen';
  buttons.appendChild(pruefen);
  karte.appendChild(buttons);

  const input = zeile.querySelector('.fill-input');

  function pruefe() {
    const wert = input.value.trim();
    const akzeptiert = (step.accept || [step.solution]).some((a) => a.trim() === wert);
    if (akzeptiert) {
      input.classList.add('fill-richtig');
      input.disabled = true;
      pruefen.remove();
      feedback.hidden = false;
      feedback.className = 'rueckmeldung rueckmeldung-ok';
      feedback.innerHTML = '<strong>Richtig!</strong>';
      fertig();
    } else {
      input.classList.add('fill-falsch');
      setTimeout(() => input.classList.remove('fill-falsch'), 600);
      feedback.hidden = false;
      feedback.className = 'rueckmeldung rueckmeldung-fehler';
      feedback.innerHTML = step.hint ? `Noch nicht ganz. Tipp: ${md(step.hint)}` : 'Noch nicht ganz – probier es weiter.';
    }
  }

  pruefen.addEventListener('click', pruefe);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') pruefe();
  });
}

function renderCode(karte, step, fertig, ctx) {
  karte.innerHTML = `${grafik(step)}<div class="schritt-inhalt">${md(step.task)}</div>`;

  // Projekt-Etappe: gespeicherten Projektstand als Ausgangspunkt laden
  // (der starter aus der Lektion bleibt Fallback für Quereinsteiger).
  const files = { ...step.starter };
  if (step.project) {
    if (step.project.page && files.html != null) {
      const stand = getProjektSeite(step.project.page);
      if (stand != null) files.html = stand;
    }
    if (files.css != null) {
      const css = getProjektCss();
      if (css != null) files.css = css;
    }
  }

  const werkbank = createWorkbench(karte, files, { editable: step.editable });

  const ergebnisse = document.createElement('div');
  ergebnisse.className = 'test-ergebnisse';
  karte.appendChild(ergebnisse);

  const tippBox = document.createElement('div');
  tippBox.className = 'rueckmeldung rueckmeldung-tipp';
  tippBox.hidden = true;
  karte.appendChild(tippBox);

  const buttons = document.createElement('div');
  buttons.className = 'schritt-buttons';
  const pruefen = document.createElement('button');
  pruefen.type = 'button';
  pruefen.className = 'btn btn-primaer';
  pruefen.textContent = '✔ Prüfen';
  buttons.appendChild(pruefen);

  let tippIndex = 0;
  if (step.hints && step.hints.length) {
    const tipp = document.createElement('button');
    tipp.type = 'button';
    tipp.className = 'btn btn-sekundaer';
    tipp.textContent = '💡 Tipp';
    tipp.addEventListener('click', () => {
      tippBox.hidden = false;
      tippBox.innerHTML = `<strong>Tipp ${Math.min(tippIndex + 1, step.hints.length)}/${step.hints.length}:</strong> ${md(step.hints[Math.min(tippIndex, step.hints.length - 1)])}`;
      tippIndex++;
      if (tippIndex >= step.hints.length) tipp.disabled = true;
    });
    buttons.appendChild(tipp);
  }
  karte.appendChild(buttons);

  let geschafft = false;
  pruefen.addEventListener('click', async () => {
    if (geschafft) return;
    pruefen.disabled = true;
    pruefen.textContent = 'Prüfe …';
    const results = await runTests(werkbank.getFiles(), step.tests);
    pruefen.disabled = false;
    pruefen.textContent = '✔ Prüfen';

    ergebnisse.innerHTML = results
      .map(
        (r) => `
        <div class="test-zeile ${r.pass ? 'test-ok' : 'test-fehler'}">
          <span class="test-symbol">${r.pass ? '✔' : '✘'}</span>
          <span>${escapeHtml(r.label)}${!r.pass && r.detail ? `<span class="test-detail">${escapeHtml(r.detail)}</span>` : ''}</span>
        </div>`
      )
      .join('');

    if (results.every((r) => r.pass)) {
      geschafft = true;
      pruefen.remove();
      const stand = werkbank.getFiles();
      const ok = document.createElement('div');
      ok.className = 'rueckmeldung rueckmeldung-ok';
      ok.innerHTML = '<strong>Alle Prüfungen bestanden!</strong> 🎉';

      // Eigene Lösung fürs Arbeitsblatt merken (nur die editierbaren Dateien)
      const editable = step.editable || Object.keys(step.starter || {});
      const eigene = {};
      editable.forEach((k) => {
        if (stand[k] != null) eigene[k] = stand[k];
      });
      merkeLoesung(ctx.chapterId, ctx.lessonId, ctx.stepIndex, eigene);

      // Projekt-Etappe geschafft → Ergebnis im Café-Projekt sichern
      if (step.project && Array.isArray(step.project.save)) {
        if (step.project.save.includes('html') && step.project.page && stand.html != null) {
          setProjektSeite(step.project.page, stand.html);
        }
        if (step.project.save.includes('css') && stand.css != null) {
          setProjektCss(stand.css);
        }
        ok.innerHTML += ' <a href="#/projekt">Im Café-Projekt gespeichert →</a>';
      }

      karte.insertBefore(ok, buttons);
      fertig();
    }
  });
}
