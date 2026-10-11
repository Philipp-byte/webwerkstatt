// Kapitelseite = eine Runde des WEBCUP: Gegner-Crew mit Emblem, der Ablauf der Runde
// (Anpfiff → Lektionen → Crew-Funk → Match → Abpfiff) als Liste mit Status, dazu die
// Trophäenkarte, sobald die Runde gewonnen ist.

import { loadChapter, loadAlleKapitel, blockFuer, rundeFuer } from '../content.js';
import { kapitelFrei, sterneHtml } from '../progress.js';
import { escapeHtml } from '../engine/markdown.js';
import { crewEmblem } from '../engine/emblem.js';
import { ablaufFuer } from '../engine/ablauf.js';
import { trophaeenKarteHtml, trophaeenAktivieren } from '../engine/trophaee.js';

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

  const { eintraege, naechste, stand } = await ablaufFuer(kapitel, { kapitelIstFrei: frei });
  const trash = runde?.trash?.length ? runde.trash[Math.floor(Math.random() * runde.trash.length)] : null;
  const lektionen = eintraege.filter((e) => e.art === 'lektion');

  const eintragHtml = (e) => {
    const klasse = ['ablauf-eintrag', e.art, e.status, e.art === 'match' && e.bestanden ? 'bestanden' : ''].filter(Boolean).join(' ');
    const href = e.frei ? e.href : `#/kapitel/${chapterId}`;
    const nr = e.art === 'lektion' ? (e.erledigt ? '✓' : e.frei ? e.nr : '🔒') : e.frei || e.erledigt ? e.icon : '🔒';
    let status = '';
    if (e.art === 'lektion') status = e.erledigt ? (e.versuche > 1 ? `${e.versuche}× gespielt` : 'geschafft') : e.frei ? '' : 'erst die Lektion davor';
    if (e.art === 'szene') status = e.erledigt ? 'gesehen – jederzeit wiederholbar' : e.frei ? e.untertitel : e.id === 'funk' ? 'wird frei nach der Lektion davor' : e.id === 'abpfiff' ? 'kommt nach dem gewonnenen Match' : '';
    if (e.art === 'match') status = e.bestanden ? `Gewonnen mit ${Math.round(e.best * 100)} % – Freundschaftsspiel jederzeit` : e.frei ? `Sam nimmt ab – ab 80 % fliegt ${gegner} raus` : 'wird frei, wenn alle Lektionen geschafft sind';
    return `<a class="${klasse}" href="${href}" style="--farbe:${e.art === 'szene' ? escapeHtml(runde?.farbe || kapitel.color) : kapitel.color}" ${e.frei ? '' : 'aria-disabled="true"'}>
      <span class="lektion-nr">${nr}</span>
      <span style="min-width:0"><span class="lektion-art">${e.art === 'lektion' ? e.untertitel : e.art === 'szene' ? 'Zwischenspiel' : 'Match'}</span><strong>${escapeHtml(e.titel)}${e.art === 'match' && runde ? ` · Nachtschicht vs. ${gegner}` : ''}</strong>${status ? `<small>${status}</small>` : ''}</span>
      <span style="display:flex;align-items:center;gap:0.5rem">${e.art === 'lektion' && e.erledigt ? sterneHtml(e.stars) : ''}${e.status === 'naechste' ? '<span class="chip chip-farbe chip-jetzt" style="--farbe: var(--spark)">Jetzt</span>' : ''}${e.art === 'match' && e.bestanden ? '<span class="stempel" style="position:static;transform:rotate(-6deg)">Raus</span>' : ''}</span>
    </a>`;
  };

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
        ${crewEmblem(runde, { groesse: 84, raus: stand.abgenommen, klasse: 'emblem-gross' })}
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
        ${naechste ? `<a class="btn btn-primaer btn-klein" href="${naechste.href}">Weiter: ${escapeHtml(naechste.titel)} →</a>` : stand.abgenommen && alle[index + 1] && kapitelFrei(index + 1, alle) ? `<a class="btn btn-primaer btn-klein" href="#/kapitel/${alle[index + 1].id}">Runde ${index + 2} →</a>` : ''}
      </div>

      <div class="block-titel">So läuft die Runde · ${lektionen.length} Lektionen, ${eintraege.filter((e) => e.art === 'szene').length} Zwischenspiele, 1 Match</div>
      <div class="ablauf">${eintraege.map(eintragHtml).join('')}</div>

      ${stand.abgenommen && runde ? `<div class="sektion karte" style="display:grid;grid-template-columns:auto 1fr;gap:1rem;align-items:center">
        <div style="width:170px">${trophaeenKarteHtml(runde, { gewonnen: true, klein: true })}</div>
        <div><h2 style="font-size:1.1rem">🃏 Trophäenkarte gesammelt</h2><p style="color:var(--ink-2);margin:0">Klick auf die Karte: Rückseite mit Fehler und Regel. Alle Karten hängen auf deiner <a href="#/keycard">Spielerkarte</a> – und stehen in jeder Aufgabe unter „Nachlesen“.</p></div>
      </div>` : ''}

      <div class="schritt-buttons" style="margin-top:1rem">
        ${index > 0 ? `<a class="btn btn-geist" href="#/kapitel/${alle[index - 1].id}">← Runde ${index}: ${escapeHtml(alle[index - 1].title)}</a>` : ''}
        ${index < alle.length - 1 && kapitelFrei(index + 1, alle) ? `<a class="btn btn-geist" href="#/kapitel/${alle[index + 1].id}">Runde ${index + 2}: ${escapeHtml(alle[index + 1].title)} →</a>` : ''}
      </div>
    </div>`;
  trophaeenAktivieren(app);
}
