// Winziger Markdown-Umsetzer für Lektionstexte: **fett**, *kursiv*, `code`,
// ```-Codeblöcke, Absätze, Listen (- / 1.), Links [Text](url) und Zeilenumbruch
// durch zwei Leerzeichen. Absichtlich klein – Lektionstexte sind kurz.

export function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(text) {
  let t = escapeHtml(text);
  // Code-Spans zuerst schützen, damit darin nichts weiter ersetzt wird
  const spans = [];
  t = t.replace(/`([^`]+)`/g, (_, c) => {
    spans.push(`<code>${c}</code>`);
    return `\u0000${spans.length - 1}\u0000`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|#[^)\s]*)\)/g, (_, text, url) =>
    url.startsWith('#') ? `<a href="${url}">${text}</a>` : `<a href="${url}" target="_blank" rel="noopener">${text}</a>`
  );
  t = t.replace(/ {2}\n/g, '<br>');
  t = t.replace(/\u0000(\d+)\u0000/g, (_, i) => spans[Number(i)]);
  return t;
}

export function md(text) {
  if (text == null) return '';
  const src = String(text).replace(/\r\n/g, '\n');
  const out = [];
  const bloecke = src.split(/```/);
  bloecke.forEach((teil, i) => {
    if (i % 2 === 1) {
      // Codeblock: erste Zeile = Sprache (optional)
      const zeilen = teil.replace(/^\n/, '').split('\n');
      let sprache = '';
      if (/^[a-z]+$/i.test(zeilen[0] || '')) sprache = zeilen.shift();
      const code = zeilen.join('\n').replace(/\n$/, '');
      out.push(`<pre class="codeblock${sprache ? ` lang-${sprache}` : ''}"><code>${escapeHtml(code)}</code></pre>`);
      return;
    }
    const absaetze = teil.split(/\n{2,}/).map((a) => a.trim()).filter(Boolean);
    for (const absatz of absaetze) {
      const zeilen = absatz.split('\n');
      if (zeilen.every((z) => /^\s*[-•]\s+/.test(z))) {
        out.push(`<ul>${zeilen.map((z) => `<li>${inline(z.replace(/^\s*[-•]\s+/, ''))}</li>`).join('')}</ul>`);
      } else if (zeilen.every((z) => /^\s*\d+[.)]\s+/.test(z))) {
        out.push(`<ol>${zeilen.map((z) => `<li>${inline(z.replace(/^\s*\d+[.)]\s+/, ''))}</li>`).join('')}</ol>`);
      } else if (/^#{1,3}\s/.test(absatz)) {
        const stufe = absatz.match(/^(#{1,3})/)[1].length + 2;
        out.push(`<h${stufe}>${inline(absatz.replace(/^#{1,3}\s+/, ''))}</h${stufe}>`);
      } else {
        out.push(`<p>${inline(zeilen.join('\n')).replace(/\n/g, ' ')}</p>`);
      }
    }
  });
  return out.join('\n');
}
