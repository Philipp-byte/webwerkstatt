// Baut aus den Editor-Dateien (html/css/js) ein komplettes Dokument für die Vorschau-Iframe.
// console.log und Fehler werden abgefangen, damit die App sie anzeigen und prüfen kann.

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
})();
<\/script>`;

// Übungsbilder (public/uebung/) sind über relative Pfade wie src="katze.svg" erreichbar.
function assetBase() {
  return `<base href="${new URL('uebung/', document.baseURI).href}">`;
}

function escapeScript(js) {
  return String(js).replace(/<\/script/gi, '<\\/script');
}

export function buildSrcdoc(files) {
  const html = files.html || '';
  const cssTag = files.css ? `<style>${files.css}</style>` : '';
  const jsTag = files.js ? `<script>${escapeScript(files.js)}<\/script>` : '';
  const kopf = assetBase() + CAPTURE + cssTag;

  // Schreibt die Lernende selbst ein komplettes Dokument? Dann dort einfügen.
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
