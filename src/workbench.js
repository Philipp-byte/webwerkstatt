// Die Werkbank: Editor-Tabs (HTML/CSS/JS) mit Syntax-Highlighting (CodeMirror 6),
// Live-Vorschau und Konsole. Wird von Beispiel- und Code-Schritten genutzt.

import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { indentOnInput } from '@codemirror/language';
import { minimalSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { buildSrcdoc } from './preview.js';

const DATEI_INFO = {
  html: { label: 'HTML', klasse: 'tab-html', sprache: () => html() },
  css: { label: 'CSS', klasse: 'tab-css', sprache: () => css() },
  js: { label: 'JS', klasse: 'tab-js', sprache: () => javascript() },
};

// Farben an das App-Design angleichen (oneDark bringt sonst sein eigenes Grau mit)
const werkbankTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#101827', borderRadius: '8px', fontSize: '0.9rem', height: '280px' },
    '.cm-scroller': { fontFamily: "Consolas, 'Courier New', monospace", lineHeight: '1.5' },
    '.cm-gutters': { backgroundColor: '#0c1320', borderRight: '1px solid #1f2a3d', color: '#5b6b7c' },
    '.cm-activeLine': { backgroundColor: 'rgba(255, 255, 255, 0.04)' },
    '.cm-activeLineGutter': { backgroundColor: 'rgba(255, 255, 255, 0.06)' },
    '&.cm-focused': { outline: '2px solid #2f6fdb', outlineOffset: '-1px' },
  },
  { dark: true }
);

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

  if (keys.length === 1 && keys[0] === 'js') {
    iframe.classList.add('vorschau-mini');
    vorschauKopf.textContent = 'Vorschau (bei reinen JavaScript-Aufgaben zählt die Konsole)';
  }

  // Der erste editierbare Tab ist vorausgewählt – bei gesperrtem HTML also z. B. CSS.
  let startIndex = keys.findIndex((k) => editable.includes(k));
  if (startIndex < 0) startIndex = 0;

  let timer = null;
  function geplanterLauf() {
    clearTimeout(timer);
    timer = setTimeout(ausfuehren, 600);
  }

  const editoren = {};
  const wrapper = {};
  keys.forEach((k, i) => {
    const istEditierbar = editable.includes(k);

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = `tab ${DATEI_INFO[k].klasse}${i === startIndex ? ' aktiv' : ''}`;
    tab.innerHTML = `<span class="tab-punkt"></span>${DATEI_INFO[k].label}${istEditierbar ? '' : ' 🔒'}`;
    tab.addEventListener('click', () => {
      tabsEl.querySelectorAll('.tab').forEach((t) => t.classList.remove('aktiv'));
      Object.values(wrapper).forEach((w) => (w.hidden = true));
      tab.classList.add('aktiv');
      wrapper[k].hidden = false;
      editoren[k].focus();
    });
    tabsEl.appendChild(tab);

    const wrap = document.createElement('div');
    wrap.className = `editor-wrap${istEditierbar ? '' : ' editor-gesperrt'}`;
    wrap.dataset.datei = k;
    wrap.hidden = i !== startIndex;
    flaechenEl.appendChild(wrap);
    wrapper[k] = wrap;

    const view = new EditorView({
      state: EditorState.create({
        doc: state[k],
        extensions: [
          minimalSetup,
          lineNumbers(),
          highlightActiveLine(),
          indentOnInput(),
          keymap.of([indentWithTab]),
          EditorState.tabSize.of(2),
          DATEI_INFO[k].sprache(),
          oneDark,
          werkbankTheme,
          EditorState.readOnly.of(!istEditierbar),
          EditorView.editable.of(istEditierbar),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              state[k] = update.state.doc.toString();
              geplanterLauf();
            }
          }),
        ],
      }),
      parent: wrap,
    });
    editoren[k] = view;
    wrap.cmView = view;
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

  root.querySelector('.btn-ausfuehren').addEventListener('click', ausfuehren);
  ausfuehren();

  return {
    getFiles: () => ({ ...state }),
    run: ausfuehren,
    // Inhalt einer Datei programmatisch setzen (z. B. für automatische Tests)
    setFile: (k, text) => {
      const view = editoren[k];
      if (!view) return;
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
    },
  };
}
