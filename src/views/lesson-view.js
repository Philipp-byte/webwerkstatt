// Die Lektionsansicht: zeigt die Schritte einer Lektion nacheinander an.
// Schritt-Typen: explain, example, quiz, fill, code (wie bei PyQuest, ohne XP).

import { loadChapter, loadLesson, nextLessonAfter } from '../content.js';
import { markDone, isChapterLocked } from '../progress.js';
import { md } from '../markdown.js';
import { createWorkbench } from '../workbench.js';
import { runTests } from '../checker.js';
import { updateProgressBadge } from '../router.js';
import { getProjektSeite, getProjektCss, setProjektSeite, setProjektCss } from '../projekt.js';

export async function renderLesson(app, chapterId, lessonId) {
  // Direktlink in ein gesperrtes Kapitel (Schulmodus): freundlich abweisen –
  // der Server lehnt das Speichern gesperrter Lektionen ohnehin ab.
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

  app.innerHTML = `
    <div class="lektion-seite">
      <a class="zurueck" href="#/kapitel/${chapterId}">← ${kapitel.icon} ${kapitel.title}</a>
      <h1 class="lektion-ueberschrift">${lektion.title}</h1>
      <div class="schritte"></div>
    </div>`;

  const schritteEl = app.querySelector('.schritte');
  let aktueller = -1;

  function zeigeNaechsten() {
    aktueller++;
    if (aktueller >= lektion.steps.length) {
      lektionGeschafft();
      return;
    }
    const step = lektion.steps[aktueller];
    const karte = document.createElement('section');
    karte.className = `schritt schritt-${step.type}`;
    schritteEl.appendChild(karte);

    const fertig = () => {
      karte.classList.add('schritt-fertig');
      zeigeNaechsten();
    };

    const renderer = {
      explain: renderExplain,
      example: renderExample,
      quiz: renderQuiz,
      fill: renderFill,
      code: renderCode,
    }[step.type];

    if (renderer) renderer(karte, step, fertig);
    else {
      karte.innerHTML = `<p>Unbekannter Schritt-Typ: ${step.type}</p>`;
      fertig();
      return;
    }

    if (aktueller > 0) karte.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function lektionGeschafft() {
    markDone(chapterId, lessonId);
    updateProgressBadge();
    const naechste = await nextLessonAfter(chapterId, lessonId);
    const karte = document.createElement('section');
    karte.className = 'schritt schritt-abschluss';
    karte.innerHTML = `
      <h2>✔ Lektion geschafft!</h2>
      <p>Stark – du hast alle Aufgaben dieser Lektion gelöst.</p>
      <div class="abschluss-buttons">
        ${naechste ? `<a class="btn btn-primaer" href="#/lektion/${naechste.chapterId}/${naechste.lessonId}">Nächste Lektion →</a>` : ''}
        <a class="btn btn-sekundaer" href="#/kapitel/${chapterId}">Zum Kapitel</a>
        <a class="btn btn-sekundaer" href="#/">Zur Übersicht</a>
      </div>`;
    schritteEl.appendChild(karte);
    karte.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  zeigeNaechsten();
}

/* ---------- Schritt-Renderer ---------- */

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function weiterButton(karte, fertig, text = 'Weiter') {
  const zeile = document.createElement('div');
  zeile.className = 'schritt-buttons';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-primaer';
  btn.textContent = text;
  btn.addEventListener('click', () => {
    zeile.remove();
    fertig();
  });
  zeile.appendChild(btn);
  karte.appendChild(zeile);
}

function renderExplain(karte, step, fertig) {
  karte.innerHTML = `<div class="schritt-inhalt">${md(step.text)}</div>`;
  weiterButton(karte, fertig);
}

function renderExample(karte, step, fertig) {
  karte.innerHTML = `<div class="schritt-inhalt">${md(step.text)}</div>`;
  const files = {};
  ['html', 'css', 'js'].forEach((k) => {
    if (step[k] != null) files[k] = step[k];
  });
  createWorkbench(karte, files, { editable: step.editable });
  weiterButton(karte, fertig);
}

function renderQuiz(karte, step, fertig) {
  karte.innerHTML = `
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
  karte.innerHTML = `<div class="schritt-inhalt">${md(step.text)}</div>`;

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
  input.focus();

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

function renderCode(karte, step, fertig) {
  karte.innerHTML = `<div class="schritt-inhalt">${md(step.task)}</div>`;

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
      const ok = document.createElement('div');
      ok.className = 'rueckmeldung rueckmeldung-ok';
      ok.innerHTML = '<strong>Alle Prüfungen bestanden!</strong> 🎉';

      // Projekt-Etappe geschafft → Ergebnis im Café-Projekt sichern
      if (step.project && Array.isArray(step.project.save)) {
        const stand = werkbank.getFiles();
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
