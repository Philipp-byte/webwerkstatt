const c=`<script>
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
<\/script>`;function l(){return`<base href="${new URL("uebung/",document.baseURI).href}">`}function u(t){return String(t).replace(/<\/script/gi,"<\\/script")}function d(t,{capture:a=!0}={}){const n=t.html||"",i=t.css?`<style>${t.css}</style>`:"",r=t.js?`<script>${u(t.js)}<\/script>`:"",s=l()+(a?c:"")+i;if(/<!doctype|<html[\s>]/i.test(n)){let e=n;const o=e.match(/<head[^>]*>/i);return o?e=e.replace(o[0],o[0]+s):e=s+e,r&&(/<\/body>/i.test(e)?e=e.replace(/<\/body>/i,`${r}</body>`):e+=r),e}return`<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">${s}</head><body>
${n}
${r}</body></html>`}export{d as b};
