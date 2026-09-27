// Schritt-Renderer für alle Aufgabentypen. Werden vom Lektions-Player, der
// Abnahme, dem Soundcheck und den Backstage-Spielen gemeinsam genutzt.
//
// renderStep(karte, step, api) – api: { solved(info), wrong(), hint(), solutionViewed(), files?, editable?, allowSolution?, fehlversucheBisLoesung? }

import { md, escapeHtml } from './markdown.js';
import { createWorkbench } from './workbench.js';
import { runTests } from './checker.js';

export const SCHRITT_NAMEN = {
  explain: 'Erklärung',
  example: 'Ausprobieren',
  quiz: 'Quiz',
  fill: 'Lückentext',
  order: 'Sortieren',
  pair: 'Zuordnen',
  bug: 'Fehlerjagd',
  code: 'Aufgabe',
};

export const SCHRITT_ICONS = {
  explain: '📖',
  example: '🧪',
  quiz: '❓',
  fill: '✏️',
  order: '🔀',
  pair: '🔗',
  bug: '🐞',
  code: '⌨️',
};

const FIGUREN = {
  ayla: { name: 'Ayla', kurz: 'A', farbe: '#38c7ff' },
  jonas: { name: 'Jonas', kurz: 'J', farbe: '#ffd84d' },
  sam: { name: 'Sam', kurz: 'S', farbe: '#4ade80' },
  robby: { name: 'Robby', kurz: 'R', farbe: '#ff8a3d', bild: 'figuren/robby/erklaeren.png' },
};

export function figurHtml(id, bildOverride) {
  const f = FIGUREN[id];
  if (!f) return '';
  const bild = bildOverride || f.bild;
  const src = bild ? new URL(bild, document.baseURI).href : null;
  return `<div class="sprecher">
    <div class="sprecher-bild" style="${src ? '' : `background: color-mix(in srgb, ${f.farbe} 25%, transparent); color:${f.farbe}`}">${src ? `<img src="${src}" alt="${f.name}">` : f.kurz}</div>
    <div><div class="sprecher-name">${f.name}</div></div>
  </div>`;
}

function mische(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function grafik(step) {
  return step.figure ? `<div class="schritt-grafik">${step.figure}</div>` : '';
}

function kopf(step, titel) {
  const t = titel || SCHRITT_NAMEN[step.type] || step.type;
  return `<div class="schritt-art">${SCHRITT_ICONS[step.type] || ''} ${t}</div>`;
}

function rueckmeldung(art, html) {
  const el = document.createElement('div');
  el.className = `rueckmeldung rueckmeldung-${art}`;
  el.innerHTML = html;
  return el;
}

function normText(s, exakt) {
  let t = String(s ?? '').replace(/\s+/g, ' ').trim();
  if (!exakt) t = t.toLowerCase();
  return t;
}

/* ---------- explain / example ---------- */

function renderExplain(karte, step, api) {
  const sprecher = step.sprecher ? figurHtml(step.sprecher, step.sprecherBild) : '';
  karte.innerHTML = `${kopf(step)}${grafik(step)}${sprecher}<div class="schritt-inhalt">${md(step.text)}</div>`;
  api.solved({ sofort: true });
  return {};
}

function renderExample(karte, step, api) {
  karte.innerHTML = `${kopf(step)}${grafik(step)}<div class="schritt-inhalt">${md(step.text)}</div>`;
  const files = {};
  ['html', 'css', 'js'].forEach((k) => {
    if (step[k] != null) files[k] = step[k];
  });
  const wb = createWorkbench(karte, files, { editable: step.editable });
  api.solved({ sofort: true });
  return { destroy: () => wb.destroy() };
}

/* ---------- quiz ---------- */

function renderQuiz(karte, step, api) {
  karte.innerHTML = `${kopf(step)}${grafik(step)}<div class="schritt-inhalt">${md(step.question)}</div><div class="quiz-optionen"></div>`;
  const optionenEl = karte.querySelector('.quiz-optionen');
  const buchstaben = 'ABCD';
  let fertig = false;
  const reihenfolge = step.mischen === false ? step.options.map((_, i) => i) : mische(step.options.map((_, i) => i));

  reihenfolge.forEach((originalIndex, pos) => {
    const option = step.options[originalIndex];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.innerHTML = `<span class="buchstabe">${buchstaben[pos]}</span><div>${md(option)}</div>`;
    btn.addEventListener('click', () => {
      if (fertig) return;
      if (originalIndex === step.correct) {
        fertig = true;
        btn.classList.add('quiz-richtig');
        optionenEl.querySelectorAll('button').forEach((b) => (b.disabled = true));
        karte.appendChild(rueckmeldung('ok', `<strong>Richtig!</strong> ${step.explanation ? md(step.explanation) : ''}`));
        api.solved({});
      } else {
        btn.classList.add('quiz-falsch');
        btn.disabled = true;
        const alt = karte.querySelector('.rueckmeldung-fehler');
        if (alt) alt.remove();
        karte.appendChild(rueckmeldung('fehler', 'Leider nein – überleg noch einmal und probier eine andere Antwort.'));
        api.wrong();
      }
    });
    optionenEl.appendChild(btn);
  });
  return {};
}

/* ---------- fill ---------- */

function renderFill(karte, step, api) {
  karte.innerHTML = `${kopf(step)}${grafik(step)}<div class="schritt-inhalt">${md(step.text)}</div>`;
  const zeile = document.createElement('div');
  zeile.className = 'fill-zeile';
  const teile = step.template.split('___');
  const inputs = [];
  teile.forEach((teil, i) => {
    zeile.appendChild(document.createTextNode(teil));
    if (i < teile.length - 1) {
      const input = document.createElement('input');
      input.className = 'fill-input';
      input.type = 'text';
      input.spellcheck = false;
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('aria-label', `Lücke ${i + 1}`);
      zeile.appendChild(input);
      inputs.push(input);
    }
  });
  karte.appendChild(zeile);

  const buttons = document.createElement('div');
  buttons.className = 'schritt-buttons';
  const pruefen = document.createElement('button');
  pruefen.type = 'button';
  pruefen.className = 'btn btn-primaer';
  pruefen.textContent = 'Prüfen';
  buttons.appendChild(pruefen);
  karte.appendChild(buttons);

  // accept: flache Liste (eine Lücke) oder Liste von Listen (mehrere Lücken)
  const akzeptiert = inputs.map((_, i) => {
    const a = step.accept;
    if (Array.isArray(a) && Array.isArray(a[0])) return a[i] || [];
    if (inputs.length === 1) return Array.isArray(a) ? a : [a];
    return Array.isArray(a) ? [a[i]].filter(Boolean) : [];
  });

  let fertig = false;
  function pruefe() {
    if (fertig) return;
    let alleOk = true;
    inputs.forEach((input, i) => {
      const wert = normText(input.value, step.exact);
      const ok = akzeptiert[i].some((x) => normText(x, step.exact) === wert);
      input.classList.toggle('fill-richtig', ok);
      if (!ok) {
        alleOk = false;
        input.classList.add('fill-falsch');
        setTimeout(() => input.classList.remove('fill-falsch'), 600);
      }
    });
    const alt = karte.querySelector('.rueckmeldung');
    if (alt) alt.remove();
    if (alleOk) {
      fertig = true;
      inputs.forEach((i) => (i.disabled = true));
      pruefen.remove();
      karte.appendChild(rueckmeldung('ok', `<strong>Richtig!</strong> ${step.explanation ? md(step.explanation) : ''}`));
      api.solved({});
    } else {
      karte.appendChild(rueckmeldung('fehler', step.hint ? `Noch nicht ganz. Tipp: ${md(step.hint)}` : 'Noch nicht ganz – probier es weiter.'));
      api.wrong();
    }
  }
  pruefen.addEventListener('click', pruefe);
  inputs.forEach((input) => input.addEventListener('keydown', (e) => e.key === 'Enter' && pruefe()));
  setTimeout(() => inputs[0]?.focus(), 50);
  return {};
}

/* ---------- order (Bühnenaufbau) ---------- */

function renderOrder(karte, step, api) {
  karte.innerHTML = `${kopf(step)}${grafik(step)}<div class="schritt-inhalt">${md(step.text || 'Bringe die Zeilen in die richtige Reihenfolge.')}</div>
    <div class="sortier">
      <div class="sortier-spalte sortier-pool"><h4>Zeilen</h4></div>
      <div class="sortier-spalte sortier-ziel"><h4>Dein Code (von oben nach unten)</h4></div>
    </div>`;
  const pool = karte.querySelector('.sortier-pool');
  const ziel = karte.querySelector('.sortier-ziel');
  const korrekt = step.lines.map((l) => l.trim());
  let reihenfolge = mische(step.lines.map((_, i) => i));
  if (reihenfolge.every((v, i) => v === i) && step.lines.length > 1) reihenfolge.reverse();

  const items = reihenfolge.map((idx) => ({ idx, text: step.lines[idx] }));
  let antwort = [];
  let fertig = false;

  function zeichne() {
    pool.querySelectorAll('.sortier-zeile').forEach((e) => e.remove());
    ziel.querySelectorAll('.sortier-zeile').forEach((e) => e.remove());
    items
      .filter((it) => !antwort.includes(it))
      .forEach((it) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'sortier-zeile';
        b.innerHTML = `<span class="nr">+</span>${escapeHtml(it.text)}`;
        b.addEventListener('click', () => {
          if (fertig) return;
          antwort.push(it);
          zeichne();
        });
        pool.appendChild(b);
      });
    antwort.forEach((it, pos) => {
      const b = document.createElement('div');
      b.className = 'sortier-zeile';
      b.setAttribute('role', 'button');
      b.tabIndex = 0;
      b.innerHTML = `<span class="nr">${pos + 1}</span>${escapeHtml(it.text)}<span class="pfeile"><button type="button" title="nach oben">▲</button><button type="button" title="nach unten">▼</button><button type="button" title="zurück">✕</button></span>`;
      const [hoch, runter, weg] = b.querySelectorAll('.pfeile button');
      hoch.addEventListener('click', (e) => {
        e.stopPropagation();
        if (pos > 0) [antwort[pos - 1], antwort[pos]] = [antwort[pos], antwort[pos - 1]];
        zeichne();
      });
      runter.addEventListener('click', (e) => {
        e.stopPropagation();
        if (pos < antwort.length - 1) [antwort[pos + 1], antwort[pos]] = [antwort[pos], antwort[pos + 1]];
        zeichne();
      });
      weg.addEventListener('click', (e) => {
        e.stopPropagation();
        antwort.splice(pos, 1);
        zeichne();
      });
      ziel.appendChild(b);
    });
    pruefen.disabled = antwort.length !== items.length;
  }

  const buttons = document.createElement('div');
  buttons.className = 'schritt-buttons';
  const pruefen = document.createElement('button');
  pruefen.type = 'button';
  pruefen.className = 'btn btn-primaer';
  pruefen.textContent = 'Prüfen';
  buttons.appendChild(pruefen);
  karte.appendChild(buttons);

  pruefen.addEventListener('click', () => {
    if (fertig) return;
    const zeilen = ziel.querySelectorAll('.sortier-zeile');
    let ok = true;
    antwort.forEach((it, pos) => {
      const richtig = it.text.trim() === korrekt[pos];
      zeilen[pos].classList.toggle('richtig', richtig);
      zeilen[pos].classList.toggle('falsch', !richtig);
      if (!richtig) ok = false;
    });
    const alt = karte.querySelector('.rueckmeldung');
    if (alt) alt.remove();
    if (ok) {
      fertig = true;
      pruefen.remove();
      karte.appendChild(rueckmeldung('ok', `<strong>Richtig sortiert!</strong> ${step.explanation ? md(step.explanation) : ''}`));
      api.solved({});
    } else {
      karte.appendChild(rueckmeldung('fehler', 'Rot markierte Zeilen stehen noch an der falschen Stelle – schau dir die Reihenfolge noch einmal an.'));
      api.wrong();
    }
  });
  zeichne();
  return {};
}

/* ---------- pair (Zuordnen) ---------- */

function renderPair(karte, step, api) {
  karte.innerHTML = `${kopf(step)}${grafik(step)}<div class="schritt-inhalt">${md(step.text || 'Ordne die Paare einander zu: erst links klicken, dann rechts.')}</div>
    <div class="paare"><div class="paar-spalte paar-links"></div><div class="paar-spalte paar-rechts"></div></div>`;
  const links = karte.querySelector('.paar-links');
  const rechts = karte.querySelector('.paar-rechts');
  let gewaehlt = null;
  let offen = step.pairs.length;
  const rechtsReihenfolge = mische(step.pairs.map((_, i) => i));

  step.pairs.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'paar-item';
    b.dataset.i = i;
    b.innerHTML = md(p[0]).replace(/^<p>|<\/p>$/g, '');
    b.addEventListener('click', () => {
      if (b.classList.contains('fertig')) return;
      links.querySelectorAll('.paar-item').forEach((x) => x.classList.remove('gewaehlt'));
      b.classList.add('gewaehlt');
      gewaehlt = i;
    });
    links.appendChild(b);
  });
  rechtsReihenfolge.forEach((i) => {
    const p = step.pairs[i];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'paar-item';
    b.innerHTML = md(p[1]).replace(/^<p>|<\/p>$/g, '');
    b.addEventListener('click', () => {
      if (b.classList.contains('fertig')) return;
      if (gewaehlt == null) {
        b.classList.add('falsch');
        setTimeout(() => b.classList.remove('falsch'), 500);
        return;
      }
      const l = links.querySelector(`.paar-item[data-i="${gewaehlt}"]`);
      if (gewaehlt === i) {
        l.classList.remove('gewaehlt');
        l.classList.add('fertig');
        b.classList.add('fertig');
        l.disabled = true;
        b.disabled = true;
        gewaehlt = null;
        offen--;
        if (offen === 0) {
          karte.appendChild(rueckmeldung('ok', `<strong>Alle Paare gefunden!</strong> ${step.explanation ? md(step.explanation) : ''}`));
          api.solved({});
        }
      } else {
        b.classList.add('falsch');
        l.classList.add('falsch');
        setTimeout(() => {
          b.classList.remove('falsch');
          l.classList.remove('falsch');
        }, 500);
        api.wrong();
      }
    });
    rechts.appendChild(b);
  });
  return {};
}

/* ---------- bug (Fehlerjagd, Klick auf die falsche Zeile) ---------- */

function renderBug(karte, step, api) {
  karte.innerHTML = `${kopf(step)}${grafik(step)}<div class="schritt-inhalt">${md(step.text || 'Eine Zeile ist fehlerhaft. Klicke sie an.')}</div><div class="bug-code"></div>`;
  const box = karte.querySelector('.bug-code');
  let fertig = false;
  step.lines.forEach((zeile, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'bug-zeile';
    b.innerHTML = `<span class="nr">${i + 1}</span><span>${escapeHtml(zeile)}</span>`;
    b.addEventListener('click', () => {
      if (fertig) return;
      if (i === step.line) {
        fertig = true;
        b.classList.add('richtig');
        box.querySelectorAll('button').forEach((x) => (x.disabled = true));
        karte.appendChild(rueckmeldung('ok', `<strong>Gefunden!</strong> ${step.explanation ? md(step.explanation) : ''}`));
        api.solved({});
      } else {
        b.classList.add('falsch');
        setTimeout(() => b.classList.remove('falsch'), 600);
        api.wrong();
      }
    });
    box.appendChild(b);
  });
  return {};
}

/* ---------- code ---------- */

function renderCode(karte, step, api) {
  const istFix = step.mode === 'fix';
  karte.innerHTML = `${kopf(step, istFix ? 'Fehlerjagd' : step.etappe ? 'Etappe · FUNKEN-Website' : 'Aufgabe')}${grafik(step)}<div class="schritt-inhalt">${md(step.task)}</div>`;

  const files = api.files || { ...step.starter };
  const editable = api.editable || step.editable || Object.keys(files);
  const wb = createWorkbench(karte, files, { editable });

  const ergebnisse = document.createElement('div');
  ergebnisse.className = 'test-ergebnisse';
  karte.appendChild(ergebnisse);

  const tippBox = document.createElement('div');
  tippBox.className = 'rueckmeldung rueckmeldung-tipp';
  tippBox.hidden = true;
  karte.appendChild(tippBox);

  const loesungBox = document.createElement('div');
  loesungBox.className = 'loesungsvergleich';
  loesungBox.hidden = true;
  karte.appendChild(loesungBox);

  const buttons = document.createElement('div');
  buttons.className = 'schritt-buttons';
  const pruefen = document.createElement('button');
  pruefen.type = 'button';
  pruefen.className = 'btn btn-primaer';
  pruefen.textContent = '✔ Prüfen';
  buttons.appendChild(pruefen);

  let tippIndex = 0;
  let tipp = null;
  if (step.hints && step.hints.length && api.hints !== false) {
    tipp = document.createElement('button');
    tipp.type = 'button';
    tipp.className = 'btn btn-sekundaer';
    tipp.textContent = `💡 Tipp (${step.hints.length})`;
    tipp.addEventListener('click', () => {
      tippBox.hidden = false;
      const i = Math.min(tippIndex, step.hints.length - 1);
      tippBox.innerHTML = `<strong>Tipp ${i + 1} von ${step.hints.length}:</strong> ${md(step.hints[i])}`;
      tippIndex++;
      tipp.textContent = tippIndex >= step.hints.length ? '💡 Alle Tipps gesehen' : `💡 Nächster Tipp (${step.hints.length - tippIndex})`;
      if (tippIndex >= step.hints.length) tipp.disabled = true;
      api.hint();
    });
    buttons.appendChild(tipp);
  }

  let loesung = null;
  const grenze = api.fehlversucheBisLoesung ?? 3;
  let fehlversuche = 0;
  if (api.allowSolution && step.solution) {
    loesung = document.createElement('button');
    loesung.type = 'button';
    loesung.className = 'btn btn-geist';
    loesung.textContent = '🔍 Lösung vergleichen';
    loesung.hidden = true;
    loesung.title = 'Zeigt die Musterlösung zum Vergleich – die Lektion zählt dann höchstens 1 Stern.';
    loesung.addEventListener('click', () => {
      if (!confirm('Die Musterlösung ansehen? Diese Lektion zählt dann höchstens 1 Stern.')) return;
      loesungBox.hidden = false;
      loesungBox.innerHTML = Object.entries(step.solution)
        .filter(([k]) => editable.includes(k))
        .map(([k, v]) => `<div><div class="schritt-art">Musterlösung · ${k}</div><pre class="codeblock"><code>${escapeHtml(v)}</code></pre></div>`)
        .join('');
      loesung.disabled = true;
      api.solutionViewed();
    });
    buttons.appendChild(loesung);
  }
  karte.appendChild(buttons);

  let geschafft = false;
  pruefen.addEventListener('click', async () => {
    if (geschafft) return;
    pruefen.disabled = true;
    pruefen.textContent = 'Prüfe …';
    const stand = wb.getFiles();
    const results = await runTests(stand, step.tests || []);
    pruefen.disabled = false;
    pruefen.textContent = '✔ Prüfen';

    ergebnisse.innerHTML = results
      .map(
        (r) => `<div class="test-zeile ${r.pass ? 'test-ok' : 'test-fehler'}">
          <span class="test-symbol">${r.pass ? '✔' : '✘'}</span>
          <span>${escapeHtml(r.label)}${!r.pass && r.detail ? `<span class="test-detail">${escapeHtml(r.detail)}</span>` : ''}</span>
        </div>`
      )
      .join('');

    if (results.every((r) => r.pass)) {
      geschafft = true;
      pruefen.remove();
      if (tipp) tipp.disabled = true;
      if (loesung) loesung.hidden = true;
      const eigene = {};
      editable.forEach((k) => {
        if (stand[k] != null) eigene[k] = stand[k];
      });
      const ok = rueckmeldung('ok', '<strong>Alle Prüfungen bestanden!</strong> 🎉');
      karte.insertBefore(ok, buttons);
      api.solved({ files: stand, eigene, fehlversuche });
    } else {
      fehlversuche++;
      if (loesung && fehlversuche >= grenze) loesung.hidden = false;
      api.wrong();
    }
  });

  return { destroy: () => wb.destroy(), werkbank: wb };
}

const RENDERER = {
  explain: renderExplain,
  example: renderExample,
  quiz: renderQuiz,
  fill: renderFill,
  order: renderOrder,
  pair: renderPair,
  bug: renderBug,
  code: renderCode,
};

export function renderStep(karte, step, api = {}) {
  const leer = () => {};
  const voll = { solved: leer, wrong: leer, hint: leer, solutionViewed: leer, ...api };
  const r = RENDERER[step.type];
  if (!r) {
    karte.innerHTML = `<p>Unbekannter Schritt-Typ: ${escapeHtml(step.type)}</p>`;
    voll.solved({ sofort: true });
    return {};
  }
  return r(karte, step, voll) || {};
}
