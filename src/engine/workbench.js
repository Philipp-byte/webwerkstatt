// Die Werkbank: Editor-Tabs (HTML/CSS/JS) mit Syntax-Highlighting (CodeMirror 6),
// Live-Vorschau und Konsole. Wird von Beispiel-, Aufgaben- und Projekt-Schritten genutzt.

import { EditorView, keymap, lineNumbers, highlightActiveLine, placeholder } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentWithTab, history, historyKeymap, defaultKeymap } from '@codemirror/commands';
import { indentOnInput, bracketMatching } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { buildSrcdoc } from './preview.js';

const DATEI_INFO = {
  html: { label: 'index.html', kurz: 'HTML', klasse: 'tab-html', sprache: () => html() },
  css: { label: 'style.css', kurz: 'CSS', klasse: 'tab-css', sprache: () => css() },
  js: { label: 'script.js', kurz: 'JS', klasse: 'tab-js', sprache: () => javascript() },
};

const werkbankTheme = EditorView.theme(
  {
    '&': { backgroundColor: 'var(--code-bg)', fontSize: '0.92rem', height: '100%' },
    '.cm-scroller': { fontFamily: 'var(--font-code)', lineHeight: '1.55' },
    '.cm-content': { padding: '10px 0' },
    '.cm-gutters': { backgroundColor: 'var(--code-gutter)', borderRight: '1px solid var(--code-line)', color: 'var(--code-muted)' },
    '.cm-activeLine': { backgroundColor: 'rgba(255, 255, 255, 0.04)' },
    '.cm-activeLineGutter': { backgroundColor: 'rgba(255, 255, 255, 0.06)' },
    '&.cm-focused': { outline: 'none' },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': { backgroundColor: 'rgba(255, 138, 61, 0.25) !important' },
    '.cm-cursor': { borderLeftColor: 'var(--spark)' },
  },
  { dark: true }
);

export function createWorkbench(container, files, options = {}) {
  const keys = ['html', 'css', 'js'].filter((k) => files[k] != null);
  const editable = options.editable || keys;
  const state = {};
  keys.forEach((k) => (state[k] = files[k]));
  const nurKonsole = keys.length === 1 && keys[0] === 'js';

  const root = document.createElement('div');
  root.className = `werkbank${options.kompakt ? ' werkbank-kompakt' : ''}`;
  root.innerHTML = `
    <div class="werkbank-editor">
      <div class="werkbank-tabs" role="tablist"></div>
      <div class="editor-flaechen"></div>
      <div class="werkbank-leiste">
        <button class="btn btn-klein btn-ausfuehren" type="button">▶ Ausführen</button>
        <button class="btn btn-klein btn-geist btn-reset" type="button" title="Auf den Anfang zurücksetzen">↺ Zurücksetzen</button>
        <span class="werkbank-hinweis">Vorschau aktualisiert sich beim Tippen</span>
      </div>
    </div>
    <div class="werkbank-ausgabe">
      <div class="vorschau-kopf"><span class="vorschau-punkt"></span><span class="vorschau-punkt"></span><span class="vorschau-punkt"></span><span class="vorschau-titel">Vorschau</span></div>
      <iframe class="vorschau" title="Vorschau" sandbox="allow-scripts allow-same-origin allow-forms allow-modals"></iframe>
      <div class="konsole" hidden>
        <div class="konsole-kopf">Konsole</div>
        <pre class="konsole-inhalt"></pre>
      </div>
    </div>`;
  container.appendChild(root);

  const tabsEl = root.querySelector('.werkbank-tabs');
  const flaechenEl = root.querySelector('.editor-flaechen');
  const iframe = root.querySelector('.vorschau');
  const konsoleEl = root.querySelector('.konsole');
  const konsoleInhalt = root.querySelector('.konsole-inhalt');
  const vorschauTitel = root.querySelector('.vorschau-titel');

  const zeigeKonsole = keys.includes('js');
  if (zeigeKonsole) konsoleEl.hidden = false;
  if (nurKonsole) {
    iframe.classList.add('vorschau-mini');
    vorschauTitel.textContent = 'Vorschau (hier zählt die Konsole)';
  }

  let startIndex = keys.findIndex((k) => editable.includes(k));
  if (startIndex < 0) startIndex = 0;

  let timer = null;
  function geplanterLauf() {
    clearTimeout(timer);
    timer = setTimeout(ausfuehren, 500);
  }

  const editoren = {};
  const wrapper = {};
  const tabs = {};
  keys.forEach((k, i) => {
    const istEditierbar = editable.includes(k);

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.setAttribute('role', 'tab');
    tab.className = `werkbank-tab ${DATEI_INFO[k].klasse}${i === startIndex ? ' aktiv' : ''}`;
    tab.innerHTML = `<span class="tab-punkt"></span><span class="tab-name">${DATEI_INFO[k].label}</span>${istEditierbar ? '' : '<span class="tab-schloss" title="In diesem Schritt gesperrt">🔒</span>'}`;
    tab.addEventListener('click', () => waehle(k));
    tabsEl.appendChild(tab);
    tabs[k] = tab;

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
          lineNumbers(),
          history(),
          highlightActiveLine(),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, indentWithTab]),
          EditorState.tabSize.of(2),
          DATEI_INFO[k].sprache(),
          oneDark,
          werkbankTheme,
          placeholder(istEditierbar ? 'Hier tippen …' : ''),
          EditorState.readOnly.of(!istEditierbar),
          EditorView.editable.of(istEditierbar),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              state[k] = update.state.doc.toString();
              geplanterLauf();
              if (options.onChange) options.onChange(k, state[k]);
            }
          }),
        ],
      }),
      parent: wrap,
    });
    editoren[k] = view;
  });

  function waehle(k) {
    Object.values(tabs).forEach((t) => t.classList.remove('aktiv'));
    Object.values(wrapper).forEach((w) => (w.hidden = true));
    tabs[k].classList.add('aktiv');
    wrapper[k].hidden = false;
    editoren[k].focus();
  }

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
  root.querySelector('.btn-reset').addEventListener('click', () => {
    if (!confirm('Wirklich alles auf den Anfang zurücksetzen?')) return;
    keys.forEach((k) => setFile(k, files[k]));
  });
  ausfuehren();

  function setFile(k, text) {
    const view = editoren[k];
    if (!view) return;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
  }

  return {
    root,
    getFiles: () => ({ ...state }),
    run: ausfuehren,
    setFile,
    focus: (k) => waehle(k || keys[startIndex]),
    destroy: () => Object.values(editoren).forEach((v) => v.destroy()),
  };
}
