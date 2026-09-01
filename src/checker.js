// Führt die Tests einer Code-Aufgabe aus: rendert den Schülercode in einer
// unsichtbaren Iframe und prüft DOM, Styles, Attribute, Konsole und Quelltext.

import { buildSrcdoc } from './preview.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function norm(s) {
  return String(s ?? '').replace(/\s+/g, ' ').trim();
}

function asList(v) {
  return Array.isArray(v) ? v : [v];
}

// Farbwerte wie "red" oder "#ff6600" in die berechnete Form (rgb(...)) übersetzen,
// damit Schüler jede gültige Schreibweise nutzen können.
function normColor(win, doc, prop, value) {
  const el = doc.createElement('div');
  doc.body.appendChild(el);
  el.style.setProperty(prop, value);
  const berechnet = win.getComputedStyle(el).getPropertyValue(prop).trim();
  el.remove();
  return berechnet;
}

function checkOne(t, ctx) {
  const { win, doc, files } = ctx;
  const label = t.label || t.type;

  switch (t.type) {
    case 'selector': {
      const n = doc.querySelectorAll(t.selector).length;
      let pass;
      if (t.count != null) pass = n === t.count;
      else pass = n >= (t.min ?? 1) && (t.max == null ? true : n <= t.max);
      return { label, pass, detail: pass ? '' : `Gefunden: ${n} Element(e) für „${t.selector}“` };
    }

    case 'text': {
      const el = doc.querySelector(t.selector);
      if (!el) return { label, pass: false, detail: `Kein Element „${t.selector}“ gefunden` };
      const ist = norm(el.textContent);
      const pass = asList(t.expected).some((e) =>
        t.contains ? ist.includes(norm(e)) : ist === norm(e)
      );
      return { label, pass, detail: pass ? '' : `Gefunden: „${ist}“` };
    }

    case 'attr': {
      const el = doc.querySelector(t.selector);
      if (!el) return { label, pass: false, detail: `Kein Element „${t.selector}“ gefunden` };
      const wert = el.getAttribute(t.attr);
      let pass;
      if (t.matches) pass = new RegExp(t.matches, 'i').test(wert ?? '');
      else pass = wert != null && asList(t.expected).some((e) => norm(wert) === norm(e));
      return { label, pass, detail: pass ? '' : `Gefunden: ${t.attr}="${wert ?? ''}"` };
    }

    case 'style': {
      const el = doc.querySelector(t.selector);
      if (!el) return { label, pass: false, detail: `Kein Element „${t.selector}“ gefunden` };
      const ist = win.getComputedStyle(el).getPropertyValue(t.prop).trim();
      const istFarbe = t.prop.includes('color');
      const pass = asList(t.expected).some((e) => {
        const soll = istFarbe ? normColor(win, doc, t.prop, e) : String(e);
        return t.contains
          ? ist.toLowerCase().includes(soll.toLowerCase())
          : ist.toLowerCase() === soll.toLowerCase();
      });
      return { label, pass, detail: pass ? '' : `Gefunden: ${t.prop}: ${ist || '(nichts)'}` };
    }

    case 'console': {
      const logs = win.__ww_logs || [];
      let pass;
      if (t.lines) {
        pass = logs.length === t.lines.length && t.lines.every((l, i) => norm(logs[i]) === norm(l));
      } else if (t.matches) {
        pass = logs.some((l) => new RegExp(t.matches).test(l));
      } else {
        pass = logs.some((l) => norm(l) === norm(t.expected));
      }
      return { label, pass, detail: pass ? '' : `Konsole: ${logs.length ? logs.join(' ⏎ ') : '(keine Ausgabe)'}` };
    }

    case 'source': {
      const quelle = files[t.file || 'html'] || '';
      let pass = new RegExp(t.matches, t.flags ?? 'i').test(quelle);
      if (t.absent) pass = !pass;
      return { label, pass, detail: '' };
    }

    default:
      return { label, pass: false, detail: `Unbekannter Testtyp: ${t.type}` };
  }
}

export function runTests(files, tests) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;height:600px;border:0;';
    document.body.appendChild(iframe);

    iframe.addEventListener('load', async () => {
      await wait(120);
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      const ctx = { win, doc, files };
      const results = [];

      for (const t of tests) {
        if (t.type === 'action') {
          const el = doc.querySelector(t.selector);
          if (el && t.action === 'click') el.click();
          await wait(80);
          continue;
        }
        results.push(checkOne(t, ctx));
      }

      if (files.js && win.__ww_errors && win.__ww_errors.length) {
        results.push({
          label: 'JavaScript läuft ohne Fehler',
          pass: false,
          detail: win.__ww_errors[0],
        });
      }

      iframe.remove();
      resolve(results);
    });

    iframe.srcdoc = buildSrcdoc(files);
  });
}
