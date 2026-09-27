// Kapitelseite: Station, Lektionen mit Sternen, Abnahme.

import { loadChapter, loadAlleKapitel, loadLesson, loadBoss, blockFuer } from '../content.js';
import { getState } from '../store.js';
import { kapitelStand, kapitelFrei, lektionFrei, abnahmeFrei, sterneHtml } from '../progress.js';
import { escapeHtml } from '../engine/markdown.js';

function lektionsArt(id) {
  if (id.includes('wiederholung')) return 'Wiederholung';
  if (id.includes('projekt')) return 'Meilenstein';
  if (id.includes('eigene-website')) return 'Finale';
  return 'Lektion';
}

export async function renderChapter(app, chapterId) {
  const [kapitel, alle] = await Promise.all([loadChapter(chapterId), loadAlleKapitel()]);
  const index = alle.findIndex((k) => k.id === chapterId);
  const frei = kapitelFrei(index, alle);
  const block = await blockFuer(chapterId);

  if (!frei) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/">← Zum Gelände</a>
      <div class="karte gesperrt-karte"><h2>🔒 ${escapeHtml(kapitel.title)}</h2>
      <p>Diese Station ist noch gesperrt. Besteh zuerst die Abnahme der vorherigen Station.</p>
      <a class="btn btn-sekundaer" href="#/kapitel/${alle[index - 1].id}">Zur vorherigen Station</a></div></div>`;
    return;
  }

  const titel = await Promise.all(kapitel.lessons.map((l) => loadLesson(chapterId, l).then((x) => x.title).catch(() => l)));
  const boss = await loadBoss(chapterId);
  const stand = kapitelStand(kapitel);
  const s = getState();
  let naechsteGefunden = false;

  app.innerHTML = `
    <div class="lektion-seite auftritt">
      <a class="zurueck" href="#/">← Zum Gelände</a>
      <div class="kapitel-kopf" style="--farbe:${kapitel.color}">
        <div class="kapitel-icon">${kapitel.icon}</div>
        <div>
          <span class="chip chip-farbe" style="--farbe:${kapitel.color}">Station ${index + 1} · ${escapeHtml(kapitel.station)}${block ? ` · ${escapeHtml(block.title)}` : ''}</span>
          <h1 style="margin:0.3rem 0 0.2rem">${escapeHtml(kapitel.title)}</h1>
          <p>${escapeHtml(kapitel.description)}</p>
        </div>
      </div>
      <div class="karte" style="margin-bottom:1rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <div style="flex:1;min-width:200px"><div class="balken" style="--farbe:${kapitel.color}"><span style="width:${Math.round((stand.erledigt / stand.gesamt) * 100)}%"></span></div></div>
        <div>${stand.erledigt} / ${stand.gesamt} Lektionen · ${stand.sterne} / ${stand.maxSterne} Sterne</div>
      </div>
      <div class="lektionen-liste">
        ${kapitel.lessons
          .map((l, i) => {
            const eintrag = s.lessons[`${chapterId}/${l}`];
            const offen = lektionFrei(kapitel, l, true);
            let klasse = eintrag?.done ? 'erledigt' : '';
            if (!eintrag?.done && offen && !naechsteGefunden) {
              klasse += ' naechste';
              naechsteGefunden = true;
            }
            if (!offen) klasse += ' gesperrt';
            return `<a class="lektion-karte ${klasse}" href="${offen ? `#/lektion/${chapterId}/${l}` : `#/kapitel/${chapterId}`}" style="--farbe:${kapitel.color}" ${offen ? '' : 'aria-disabled="true"'}>
              <span class="lektion-nr">${eintrag?.done ? '✓' : offen ? i + 1 : '🔒'}</span>
              <span><span class="lektion-art">${lektionsArt(l)}</span><strong>${escapeHtml(titel[i])}</strong>${eintrag?.done ? `<small>${eintrag.versuche > 1 ? `${eintrag.versuche}× gespielt` : 'geschafft'}</small>` : ''}</span>
              <span>${eintrag?.done ? sterneHtml(eintrag.stars) : ''}</span>
            </a>`;
          })
          .join('')}
      </div>
      ${boss ? `<div class="karte abnahme-karte ${stand.abgenommen ? 'bestanden' : ''}">
        <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
          <div style="font-size:2rem">${stand.abgenommen ? '✅' : '📋'}</div>
          <div style="flex:1;min-width:220px">
            <strong>${escapeHtml(boss.title)}</strong>
            <div style="color:var(--muted);font-size:0.9rem">${stand.abgenommen ? `Bestanden mit ${Math.round(stand.abnahme.best * 100)} %${stand.abnahme.best >= 1 ? ' – fehlerfrei!' : ''}` : abnahmeFrei(kapitel) ? 'Sam wartet auf die Abnahme – gemischte Aufgaben aus dieser und früheren Stationen. Ab 80 % ist die nächste Station frei.' : 'Wird frei, sobald alle Lektionen der Station geschafft sind.'}</div>
          </div>
          <a class="btn ${stand.abgenommen ? 'btn-sekundaer' : 'btn-primaer'} ${abnahmeFrei(kapitel) ? '' : 'btn-gesperrt'}" href="${abnahmeFrei(kapitel) ? `#/abnahme/${chapterId}` : `#/kapitel/${chapterId}`}" ${abnahmeFrei(kapitel) ? '' : 'aria-disabled="true" style="opacity:0.5;pointer-events:none"'}>${stand.abgenommen ? 'Nochmal antreten' : 'Zur Abnahme →'}</a>
        </div>
      </div>` : ''}
      <div class="schritt-buttons" style="margin-top:1rem">
        ${index > 0 ? `<a class="btn btn-geist" href="#/kapitel/${alle[index - 1].id}">← ${escapeHtml(alle[index - 1].title)}</a>` : ''}
        ${index < alle.length - 1 && kapitelFrei(index + 1, alle) ? `<a class="btn btn-geist" href="#/kapitel/${alle[index + 1].id}">${escapeHtml(alle[index + 1].title)} →</a>` : ''}
      </div>
    </div>`;
}
