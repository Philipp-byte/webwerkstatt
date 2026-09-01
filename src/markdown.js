// Mini-Markdown für Lektionstexte: **fett**, `code`, ```Codeblöcke```, Absätze.

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(s) {
  return escapeHtml(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export function md(text) {
  const teile = String(text ?? '').split('```');
  let html = '';
  for (let i = 0; i < teile.length; i++) {
    if (i % 2 === 1) {
      // Codeblock – evtl. Sprachangabe in der ersten Zeile entfernen (```html)
      const code = teile[i].replace(/^[a-z]*\n/, '');
      html += `<pre class="codeblock">${escapeHtml(code.replace(/\n$/, ''))}</pre>`;
    } else {
      const absaetze = teile[i].split(/\n\s*\n/).filter((a) => a.trim());
      html += absaetze.map((a) => `<p>${inline(a.trim()).replace(/\n/g, '<br>')}</p>`).join('');
    }
  }
  return html;
}
