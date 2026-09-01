// Die Werkbank: Editor-Tabs (HTML/CSS/JS), Live-Vorschau und Konsole.
// Wird von Beispiel- und Code-Schritten der Lektionen genutzt.

import { buildSrcdoc } from './preview.js';

const DATEI_INFO = {
  html: { label: 'HTML', klasse: 'tab-html' },
  css: { label: 'CSS', klasse: 'tab-css' },
  js: { label: 'JS', klasse: 'tab-js' },
};

export function createWorkbench(container, files, options = {}) {
  const keys = ['html', 'css', 'js'].filter((k) => files[k] != null);
  const editable = options.editable || keys;
  const state = {};
  keys.forEach((k) => (state[k] = files[k]));

  const root = document.createElement('div');
  root.className = 'werkbank';
  root.innerHTML = `
    <div class="werkbank-editor">
      <div class="tabs"></div>
      <div class="editor-flaechen"></div>
      <div class="werkbank-buttons">
        <button class="btn btn-sekundaer btn-ausfuehren" type="button">▶ Ausführen</button>
        <span class="werkbank-hinweis">Die Vorschau aktualisiert sich auch beim Tippen.</span>
      </div>
    </div>
    <div class="werkbank-ausgabe">
      <div class="vorschau-kopf">Vorschau</div>
      <iframe class="vorschau" title="Vorschau"></iframe>
      <div class="konsole" hidden>
        <div class="konsole-kopf">Konsole</div>
        <pre class="konsole-inhalt"></pre>
      </div>
    </div>`;
  container.appendChild(root);

  const tabsEl = root.querySelector('.tabs');
  const flaechenEl = root.querySelector('.editor-flaechen');
  const iframe = root.querySelector('.vorschau');
  const konsoleEl = root.querySelector('.konsole');
  const konsoleInhalt = root.querySelector('.konsole-inhalt');
  const vorschauKopf = root.querySelector('.vorschau-kopf');

  const zeigeKonsole = keys.includes('js');
  if (zeigeKonsole) konsoleEl.hidden = false;

  // Reine JS-Aufgaben brauchen keine große Vorschau
  if (keys.length === 1 && keys[0] === 'js') {
    iframe.classList.add('vorschau-mini');
    vorschauKopf.textContent = 'Vorschau (bei reinen JavaScript-Aufgaben zählt die Konsole)';
  }

  // Der erste editierbare Tab ist vorausgewählt – bei gesperrtem HTML also z. B. CSS.
  let startIndex = keys.findIndex((k) => editable.includes(k));
  if (startIndex < 0) startIndex = 0;

  const textareas = {};
  keys.forEach((k, i) => {
    const istEditierbar = editable.includes(k);

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = `tab ${DATEI_INFO[k].klasse}${i === startIndex ? ' aktiv' : ''}`;
    tab.innerHTML = `<span class="tab-punkt"></span>${DATEI_INFO[k].label}${istEditierbar ? '' : ' 🔒'}`;
    tab.addEventListener('click', () => {
      tabsEl.querySelectorAll('.tab').forEach((t) => t.classList.remove('aktiv'));
      Object.values(textareas).forEach((ta) => (ta.hidden = true));
      tab.classList.add('aktiv');
      textareas[k].hidden = false;
      textareas[k].focus();
    });
    tabsEl.appendChild(tab);

    const ta = document.createElement('textarea');
    ta.className = 'editor';
    ta.value = state[k];
    ta.spellcheck = false;
    ta.setAttribute('autocapitalize', 'off');
    ta.setAttribute('autocomplete', 'off');
    ta.hidden = i !== startIndex;
    if (!istEditierbar) {
      ta.readOnly = true;
      ta.classList.add('editor-gesperrt');
    }
    ta.addEventListener('input', () => {
      state[k] = ta.value;
      geplanterLauf();
    });
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = ta.selectionStart;
        ta.setRangeText('  ', start, ta.selectionEnd, 'end');
        state[k] = ta.value;
        geplanterLauf();
      }
    });
    flaechenEl.appendChild(ta);
    textareas[k] = ta;
  });

  function renderKonsole() {
    if (!zeigeKonsole) return;
    try {
      const win = iframe.contentWindow;
      const logs = (win && win.__ww_logs) || [];
      const fehler = (win && win.__ww_errors) || [];
      let text = logs.join('\n');
      if (fehler.length) text += `${text ? '\n' : ''}⚠ Fehler: ${fehler.join('\n⚠ Fehler: ')}`;
      konsoleInhalt.textContent = text || '(keine Ausgabe)';
      konsoleInhalt.classList.toggle('konsole-fehler', fehler.length > 0);
    } catch {
      konsoleInhalt.textContent = '(Konsole nicht lesbar)';
    }
  }

  function ausfuehren() {
    iframe.srcdoc = buildSrcdoc(state);
  }
  iframe.addEventListener('load', () => setTimeout(renderKonsole, 60));

  let timer = null;
  function geplanterLauf() {
    clearTimeout(timer);
    timer = setTimeout(ausfuehren, 600);
  }

  root.querySelector('.btn-ausfuehren').addEventListener('click', ausfuehren);
  ausfuehren();

  return {
    getFiles: () => ({ ...state }),
    run: ausfuehren,
  };
}
