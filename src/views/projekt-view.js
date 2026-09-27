// Die FUNKEN-Website: alle Seiten des gemeinsamen Projekts als echte,
// klickbare Website – plus Download als ZIP (echte Dateien!).

import { loadEtappen } from '../content.js';
import { getProjekt, projektZuruecksetzen } from '../store.js';
import { buildSrcdoc } from '../engine/preview.js';
import { escapeHtml } from '../engine/markdown.js';
import { toast } from '../gamification/celebrate.js';

export async function renderProjekt(app, seite) {
  const daten = await loadEtappen();
  const projekt = getProjekt();
  const seiten = daten.pages.filter((p) => projekt.pages[p.id] != null);
  const gesamtEtappen = daten.etappen.length;
  const geschafft = Object.keys(projekt.etappen).length;

  if (!seiten.length) {
    app.innerHTML = `<div class="auftritt"><a class="zurueck" href="#/">← Zum Gelände</a>
      <h1 style="margin-top:0.5rem">🌐 FUNKEN-Website</h1>
      <div class="karte gesperrt-karte"><p style="font-size:2.5rem;margin:0">🚧</p><h2>Noch nichts gebaut</h2>
      <p>Hier entsteht die Festival-Website – Etappe für Etappe, am Ende jeder Lektion. Die erste Etappe wartet in <a href="#/kapitel/02-html-erste-schritte">Station 2 · Fundament</a>.</p></div></div>`;
    return;
  }

  const aktiv = seiten.find((p) => p.id === seite) || seiten[0];
  app.innerHTML = `
    <div class="auftritt">
      <a class="zurueck" href="#/">← Zum Gelände</a>
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin:0.5rem 0 0.75rem">
        <h1 style="margin:0;flex:1">🌐 FUNKEN-Website</h1>
        <span class="chip chip-farbe" style="--farbe: var(--projekt)">${geschafft} / ${gesamtEtappen} Etappen</span>
      </div>
      <div class="projekt-leiste">
        <button class="btn btn-primaer" type="button" id="zip">⬇ Als ZIP herunterladen</button>
        <button class="btn btn-sekundaer" type="button" id="neu-tab">↗ Im eigenen Tab öffnen</button>
        <button class="btn btn-geist" type="button" id="reset" style="margin-left:auto">Projekt zurücksetzen</button>
      </div>
      <div class="projekt-layout">
        <div class="projekt-seiten">
          ${seiten.map((p) => `<button class="projekt-seite-btn ${p.id === aktiv.id ? 'aktiv' : ''}" type="button" data-id="${p.id}"><span>${escapeHtml(p.titel)}</span><small>${p.datei}</small></button>`).join('')}
          ${projekt.css != null ? '<div class="projekt-seite-btn" style="cursor:default"><span>style.css</span><small>für alle Seiten</small></div>' : ''}
          ${projekt.js != null ? '<div class="projekt-seite-btn" style="cursor:default"><span>script.js</span><small>Startseite</small></div>' : ''}
        </div>
        <div class="projekt-vorschau"><iframe title="FUNKEN-Website" sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox"></iframe></div>
      </div>
      <p style="color:var(--muted);font-size:0.85rem;margin-top:0.75rem">Die Vorschau zeigt genau den Stand, den du in den Etappen gebaut hast. Links zwischen den Seiten funktionieren. Das ZIP enthält echte Dateien, die du in jedem Browser öffnen kannst.</p>
    </div>`;

  const iframe = app.querySelector('iframe');
  function zeige(id) {
    const p = seiten.find((x) => x.id === id) || seiten[0];
    app.querySelectorAll('.projekt-seite-btn[data-id]').forEach((b) => b.classList.toggle('aktiv', b.dataset.id === p.id));
    iframe.srcdoc = buildSrcdoc({ html: projekt.pages[p.id], css: projekt.css || '', js: p.id === 'index' ? projekt.js || '' : '' });
  }
  app.querySelectorAll('.projekt-seite-btn[data-id]').forEach((b) => b.addEventListener('click', () => zeige(b.dataset.id)));
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'ww-navigate' && seiten.some((p) => p.id === e.data.page)) zeige(e.data.page);
  });
  zeige(aktiv.id);

  app.querySelector('#neu-tab').addEventListener('click', () => {
    const p = seiten.find((x) => x.id === (app.querySelector('.projekt-seite-btn.aktiv')?.dataset.id || 'index')) || seiten[0];
    const blob = new Blob([buildSrcdoc({ html: projekt.pages[p.id], css: projekt.css || '', js: p.id === 'index' ? projekt.js || '' : '' }, { capture: false })], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
  });

  app.querySelector('#zip').addEventListener('click', async () => {
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();
    const ordner = zip.folder('funken-website');
    for (const p of seiten) ordner.file(p.datei, projekt.pages[p.id]);
    if (projekt.css != null) ordner.file('style.css', projekt.css);
    if (projekt.js != null) ordner.file('script.js', projekt.js);
    // Übungsbilder mitliefern, die im Projekt verwendet werden
    const verwendet = new Set();
    for (const p of seiten) for (const m of projekt.pages[p.id].matchAll(/(?:src|href)="([^"]+\.(?:svg|wav|mp4|png|jpg))"/g)) verwendet.add(m[1]);
    await Promise.all(
      [...verwendet].map(async (name) => {
        try {
          const res = await fetch(new URL(`uebung/${name}`, document.baseURI));
          if (res.ok) ordner.file(name, await res.blob());
        } catch {
          /* fehlt halt */
        }
      })
    );
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'funken-website.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast({ titel: 'ZIP heruntergeladen', text: 'Entpacken und index.html im Browser öffnen.', icon: '📦', art: 'ok' });
  });

  app.querySelector('#reset').addEventListener('click', () => {
    if (!confirm('Die FUNKEN-Website auf den Anfang zurücksetzen? Dein Lernfortschritt bleibt, aber alle Etappen-Ergebnisse werden gelöscht.')) return;
    projektZuruecksetzen();
    location.reload();
  });
}
