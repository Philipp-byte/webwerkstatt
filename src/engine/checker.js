// Führt die Tests einer Code-Aufgabe aus: rendert den Schülercode in einer
// unsichtbaren Iframe und prüft DOM, Styles, Attribute, Konsole und Quelltext.
// Test-Typen: selector, text, attr, style, console, source, action, order.

import { buildSrcdoc } from './preview.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function norm(s) {
  return String(s ?? '').replace(/\s+/g, ' ').trim();
}

// Weiche Normalisierung für Textvergleiche: typografische Zeichen (Gedankenstrich,
// Anführungszeichen, Mittelpunkt) zählen wie ihre einfachen Tastatur-Varianten.
function weich(s) {
  return norm(s)
    .replace(/[–—‑]/g, '-')
    .replace(/[•]/g, '·')
    .replace(/[„“”«»]/g, '"')
    .replace(/[‚‘’‹›]/g, "'")
    .replace(/\s*-\s*/g, ' - ')
    .replace(/\s*·\s*/g, ' · ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Erklärt eine knappe Abweichung („fast richtig“) in Worten.
function fastRichtig(ist, soll) {
  const a = weich(ist);
  const b = weich(soll);
  if (a.toLowerCase() === b.toLowerCase()) return 'Fast! Achte auf Groß- und Kleinschreibung.';
  const nurZeichen = (x) => x.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
  if (nurZeichen(a) === nurZeichen(b)) return 'Fast! Prüfe Satzzeichen und Leerzeichen.';
  return '';
}

// Sichtbarer Text: innerText macht aus <br> einen Umbruch (→ Leerzeichen nach norm),
// textContent würde die Zeilen zusammenkleben.
function textVon(el) {
  const t = typeof el.innerText === 'string' ? el.innerText : el.textContent;
  return t && t.trim() ? t : el.textContent;
}

function asList(v) {
  return Array.isArray(v) ? v : [v];
}

// Farbwerte wie "red" oder "#ff6600" in die berechnete Form (rgb(...)) übersetzen,
// damit jede gültige Schreibweise zählt.
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
      let n;
      try {
        n = doc.querySelectorAll(t.selector).length;
      } catch {
        return { label, pass: false, detail: `Ungültiger Selektor „${t.selector}“` };
      }
      let pass;
      if (t.count != null) pass = n === t.count;
      else pass = n >= (t.min ?? 1) && (t.max == null ? true : n <= t.max);
      return { label, pass, detail: pass ? '' : `Gefunden: ${n} Element(e) für „${t.selector}“` };
    }

    case 'text': {
      const alle = [...doc.querySelectorAll(t.selector)];
      if (!alle.length) return { label, pass: false, detail: `Kein Element „${t.selector}“ gefunden` };
      const kandidaten = t.any ? alle : [alle[0]];
      const treffer = kandidaten.some((el) => {
        const ist = weich(textVon(el));
        return asList(t.expected).some((e) => (t.contains ? ist.includes(weich(e)) : ist === weich(e)));
      });
      const gefunden = norm(textVon(alle[0]));
      const hinweis = !treffer && !t.contains ? fastRichtig(gefunden, asList(t.expected)[0]) : '';
      return { label, pass: treffer, detail: treffer ? '' : `Gefunden: „${gefunden.slice(0, 80)}“${hinweis ? ` – ${hinweis}` : ''}` };
    }

    case 'attr': {
      const alle = [...doc.querySelectorAll(t.selector)];
      if (!alle.length) return { label, pass: false, detail: `Kein Element „${t.selector}“ gefunden` };
      const kandidaten = t.any ? alle : [alle[0]];
      const pruefe = (el) => {
        const wert = el.getAttribute(t.attr);
        if (t.absent) return wert == null;
        if (t.present) return wert != null;
        if (t.matches) return new RegExp(t.matches, 'i').test(wert ?? '');
        return wert != null && asList(t.expected).some((e) => norm(wert) === norm(e));
      };
      const pass = kandidaten.some(pruefe);
      return { label, pass, detail: pass ? '' : `Gefunden: ${t.attr}="${alle[0].getAttribute(t.attr) ?? ''}"` };
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
        pass = logs.some((l) => new RegExp(t.matches, t.flags ?? '').test(l));
      } else {
        const varianten = asList(t.expected).map(weich);
        pass = logs.some((l) => varianten.includes(weich(l)));
      }
      if (t.absent) pass = !pass;
      const hinweis = !pass && !t.absent && t.expected && logs.length ? fastRichtig(logs[logs.length - 1], asList(t.expected)[0]) : '';
      return { label, pass, detail: pass ? '' : `Konsole: ${logs.length ? logs.join(' ⏎ ') : '(keine Ausgabe)'}${hinweis ? ` – ${hinweis}` : ''}` };
    }

    case 'source': {
      const quelle = files[t.file || 'html'] || '';
      let pass = new RegExp(t.matches, t.flags ?? 'i').test(quelle);
      if (t.absent) pass = !pass;
      return { label, pass, detail: '' };
    }

    case 'order': {
      // Prüft, dass Elemente in der Dokumentreihenfolge so vorkommen wie angegeben.
      const gefunden = t.selectors.map((s) => doc.querySelector(s));
      const fehlt = gefunden.findIndex((el) => !el);
      if (fehlt >= 0) return { label, pass: false, detail: `Kein Element „${t.selectors[fehlt]}“ gefunden` };
      let pass = true;
      for (let i = 1; i < gefunden.length; i++) {
        const vorher = gefunden[i - 1].compareDocumentPosition(gefunden[i]) & Node.DOCUMENT_POSITION_FOLLOWING;
        if (!vorher) pass = false;
      }
      return { label, pass, detail: pass ? '' : 'Die Reihenfolge stimmt noch nicht' };
    }

    default:
      return { label, pass: false, detail: `Unbekannter Testtyp: ${t.type}` };
  }
}

export function runTests(files, tests) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:absolute;left:-9999px;top:0;width:900px;height:640px;border:0;';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    const fallback = setTimeout(() => {
      iframe.remove();
      resolve([{ label: 'Vorschau konnte nicht geladen werden', pass: false, detail: '' }]);
    }, 8000);

    iframe.addEventListener('load', async () => {
      await wait(140);
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      const ctx = { win, doc, files };
      const results = [];

      for (const t of tests) {
        if (t.type === 'action') {
          const el = doc.querySelector(t.selector);
          if (el) {
            if (t.action === 'click') el.click();
            if (t.action === 'input') {
              el.value = t.value ?? '';
              el.dispatchEvent(new win.Event('input', { bubbles: true }));
              el.dispatchEvent(new win.Event('change', { bubbles: true }));
            }
          }
          await wait(90);
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

      clearTimeout(fallback);
      iframe.remove();
      resolve(results);
    });

    iframe.srcdoc = buildSrcdoc(files);
  });
}
