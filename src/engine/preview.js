// Baut aus den Editor-Dateien (html/css/js) ein komplettes Dokument für die
// Vorschau-Iframe. console.log und Fehler werden abgefangen, damit die App sie
// anzeigen und prüfen kann. Übungsbilder liegen unter public/uebung/.

const CAPTURE = `<script>
(function () {
  window.__ww_logs = [];
  window.__ww_errors = [];
  var orig = console.log;
  console.log = function () {
    var parts = [];
    for (var i = 0; i < arguments.length; i++) {
      var a = arguments[i];
      parts.push(typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a));
    }
    window.__ww_logs.push(parts.join(' '));
    if (orig) orig.apply(console, arguments);
  };
  window.addEventListener('error', function (e) {
    window.__ww_errors.push(e.message);
  });
  window.alert = function (m) { window.__ww_logs.push('[alert] ' + m); };
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#') {
      e.preventDefault();
      var ziel = document.getElementById(href.slice(1)) ||
        document.querySelector('[name="' + href.slice(1).replace(/"/g, '') + '"]');
      if (ziel) ziel.scrollIntoView({ behavior: 'smooth' });
    } else if (/\\.html$/i.test(href)) {
      e.preventDefault();
      parent.postMessage({ type: 'ww-navigate', page: href.replace(/\\.html$/i, '') }, '*');
    }
  }, true);
  document.addEventListener('submit', function (e) { e.preventDefault(); }, true);
})();
<\/script>`;

function assetBase() {
  return `<base href="${new URL('uebung/', document.baseURI).href}">`;
}

function escapeScript(js) {
  return String(js).replace(/<\/script/gi, '<\\/script');
}

export function buildSrcdoc(files, { capture = true } = {}) {
  const html = files.html || '';
  const cssTag = files.css ? `<style>${files.css}</style>` : '';
  const jsTag = files.js ? `<script>${escapeScript(files.js)}<\/script>` : '';
  const kopf = assetBase() + (capture ? CAPTURE : '') + cssTag;

  if (/<!doctype|<html[\s>]/i.test(html)) {
    let doc = html;
    const headStart = doc.match(/<head[^>]*>/i);
    if (headStart) doc = doc.replace(headStart[0], headStart[0] + kopf);
    else doc = kopf + doc;
    if (jsTag) {
      if (/<\/body>/i.test(doc)) doc = doc.replace(/<\/body>/i, `${jsTag}</body>`);
      else doc += jsTag;
    }
    return doc;
  }

  return `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">${kopf}</head><body>
${html}
${jsTag}</body></html>`;
}
