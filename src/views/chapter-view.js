// Kapitelseite = eine Runde des WEBCUP: Gegner-Crew, Training (Lektionen mit
// Sternen) und das Match (Abnahme durch die Jury Sam).

import { loadChapter, loadAlleKapitel, loadLesson, loadBoss, blockFuer, rundeFuer } from '../content.js';
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
  const [kapitel, alle, story] = await Promise.all([
    loadChapter(chapterId),
    loadAlleKapitel(),
    rundeFuer(chapterId).catch(() => ({ runde: null, crew: null, turnier: null, runden: [] })),
  ]);
  const index = alle.findIndex((k) => k.id === chapterId);
  const frei = kapitelFrei(index, alle);
  const block = await blockFuer(chapterId);
  const runde = story.runde;
  const gegner = runde ? escapeHtml(runde.crew) : 'die Gegner-Crew';

  if (!frei) {
    const vorherRunde = story.runden.find((r) => r.chapter === alle[index - 1]?.id);
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/">← Zum Turnierplan</a>
      <div class="karte gesperrt-karte"><h2>🔒 Runde ${index + 1}: ${escapeHtml(kapitel.title)}</h2>
      <p>Diese Runde ist noch gesperrt. Gewinn zuerst das Match der Runde davor${vorherRunde ? ` gegen ${escapeHtml(vorherRunde.crew)}` : ''}.</p>
      <a class="btn btn-sekundaer" href="#/kapitel/${alle[index - 1].id}">Zur vorherigen Runde</a></div></div>`;
    return;
  }

  const titel = await Promise.all(kapitel.lessons.map((l) => loadLesson(chapterId, l).then((x) => x.title).catch(() => l)));
  const boss = await loadBoss(chapterId);
  const stand = kapitelStand(kapitel);
  const s = getState();
  let naechsteGefunden = false;
  const trash = runde?.trash?.length ? runde.trash[Math.floor(Math.random() * runde.trash.length)] : null;
  const matchFrei = abnahmeFrei(kapitel);

  app.innerHTML = `
    <div class="lektion-seite auftritt">
      <a class="zurueck" href="#/">← Zum Turnierplan</a>
      <div class="kapitel-kopf" style="--farbe:${kapitel.color}">
        <div class="kapitel-icon">${kapitel.icon}</div>
        <div>
          <span class="chip chip-farbe" style="--farbe:${kapitel.color}">Runde ${index + 1} · ${escapeHtml(kapitel.station)}${block ? ` · ${escapeHtml(block.title)}` : ''}</span>
          <h1 style="margin:0.3rem 0 0.2rem">${escapeHtml(kapitel.title)}</h1>
          <p>${escapeHtml(kapitel.description)}</p>
        </div>
      </div>

      ${runde ? `<div class="gegner-karte ${stand.abgenommen ? 'besiegt' : ''}" style="--farbe:${escapeHtml(runde.farbe)}">
        <span class="runde-gegner">${runde.icon}</span>
        <div>
          <div class="vs">Gegner in dieser Runde</div>
          <h2>${escapeHtml(runde.crew)} <span style="font-weight:400;color:var(--muted);font-size:0.85rem">· Captain ${escapeHtml(runde.captain)}</span></h2>
          <p>Schwäche: ${escapeHtml(runde.schwaeche)}. ${stand.abgenommen ? `<strong style="color:var(--ok)">Raus – Runde gewonnen mit ${Math.round(stand.abnahme.best * 100)} %.</strong>` : 'Zeig im Match, dass du es besser kannst.'}</p>
        </div>
        ${stand.abgenommen ? '<span class="stempel">Raus</span>' : ''}
        ${stand.abgenommen && runde.niederlage ? `<blockquote class="trash-blase"><b>${escapeHtml(runde.captain)} nach dem Match</b>${escapeHtml(runde.niederlage)}</blockquote>` : trash ? `<blockquote class="trash-blase"><b>${escapeHtml(runde.captain)} tönt</b>${escapeHtml(trash)}</blockquote>` : ''}
      </div>` : ''}

      <div class="karte" style="margin-bottom:1rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <div style="flex:1;min-width:200px"><div class="balken" style="--farbe:${kapitel.color}"><span style="width:${Math.round((stand.erledigt / stand.gesamt) * 100)}%"></span></div></div>
        <div>Training: ${stand.erledigt} / ${stand.gesamt} Lektionen · ${stand.sterne} / ${stand.maxSterne} Sterne</div>
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
          <div style="font-size:2rem">${stand.abgenommen ? '🏆' : '🥊'}</div>
          <div style="flex:1;min-width:220px">
            <strong>Match · Runde ${index + 1}${runde ? `: Nachtschicht vs. ${escapeHtml(runde.crew)}` : ''}</strong>
            <div style="color:var(--muted);font-size:0.9rem">${stand.abgenommen
              ? `Gewonnen mit ${Math.round(stand.abnahme.best * 100)} %${stand.abnahme.best >= 1 ? ' – zu null!' : ''}. Nochmal antreten geht immer (Freundschaftsspiel, keine neuen XP).`
              : matchFrei
                ? `Sam (Jury) nimmt ab: gemischte Aufgaben aus dieser und früheren Runden. Ab ${Math.round((boss.bestanden || 0.8) * 100)} % fliegt ${gegner} raus und die nächste Runde ist frei.`
                : `Wird frei, sobald das Training komplett ist – dann tritt die Nachtschicht gegen ${gegner} an.`}</div>
          </div>
          <a class="btn ${stand.abgenommen ? 'btn-sekundaer' : 'btn-primaer'} ${matchFrei ? '' : 'btn-gesperrt'}" href="${matchFrei ? `#/abnahme/${chapterId}` : `#/kapitel/${chapterId}`}" ${matchFrei ? '' : 'aria-disabled="true" style="opacity:0.5;pointer-events:none"'}>${stand.abgenommen ? 'Nochmal antreten' : 'Zum Match →'}</a>
        </div>
      </div>` : ''}
      <div class="schritt-buttons" style="margin-top:1rem">
        ${index > 0 ? `<a class="btn btn-geist" href="#/kapitel/${alle[index - 1].id}">← Runde ${index}: ${escapeHtml(alle[index - 1].title)}</a>` : ''}
        ${index < alle.length - 1 && kapitelFrei(index + 1, alle) ? `<a class="btn btn-geist" href="#/kapitel/${alle[index + 1].id}">Runde ${index + 2}: ${escapeHtml(alle[index + 1].title)} →</a>` : ''}
      </div>
    </div>`;
}
