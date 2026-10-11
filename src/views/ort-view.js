// Ortsseite: Einleitung (Gespinst, Sam, Verbündeter), der Weg durch den Ort (Lektionen,
// Hinterhalte, Sturm, Duell) und nach dem Sieg die Regel dieses Ortes.

import { loadChapter, loadAlleKapitel, loadWelt, ortFuer } from '../content.js';
import { einleitungGesehen, setEinleitungGesehen, seidraGesehen, setSeidraGesehen, istLehrkraft } from '../store.js';
import { kapitelFrei, sterneHtml } from '../progress.js';
import { escapeHtml } from '../engine/markdown.js';
import { wegFuer } from '../engine/weg.js';
import { ladeFiguren, blaseHtml, figur } from '../engine/figuren.js';
import { sigilSvg } from '../engine/sigil.js';
import { sound } from '../gamification/sound.js';

export async function renderOrt(app, chapterId) {
  const [kapitel, alle, welt, ort] = await Promise.all([loadChapter(chapterId), loadAlleKapitel(), loadWelt(), ortFuer(chapterId)]);
  await ladeFiguren();
  const index = alle.findIndex((k) => k.id === chapterId);
  const frei = kapitelFrei(index, alle);
  if (!ort) {
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/">← Hyperia</a><div class="karte gesperrt-karte"><p>Diesen Ort gibt es nicht.</p></div></div>`;
    return;
  }

  if (!frei) {
    const vorher = alle[index - 1];
    const vorherOrt = welt.orte.find((o) => o.chapter === vorher?.id);
    app.innerHTML = `<div class="lektion-seite"><a class="zurueck" href="#/">← Hyperia</a>
      <div class="karte gesperrt-karte">${sigilSvg(ort.gespinst, { groesse: 72 })}<h2>🕸 ${escapeHtml(ort.name)} liegt unter dem Netz</h2>
      <p>Erst wenn ${escapeHtml(vorherOrt?.name || 'der Ort davor')} befreit ist, öffnet sich der Weg hierher.</p>
      ${vorher ? `<a class="btn btn-sekundaer" href="#/ort/${vorher.id}">Zu ${escapeHtml(vorherOrt?.name || vorher.title)}</a>` : ''}</div></div>`;
    return;
  }

  const { eintraege, naechste, stand } = await wegFuer(kapitel, ort, { kapitelIstFrei: frei });
  const gesehen = einleitungGesehen(chapterId);
  const g = figur(ort.gespinst);
  const seidraKey = `${chapterId}:start`;
  const seidra = welt.seidra?.[chapterId]?.wann === 'start' && !seidraGesehen(seidraKey) ? welt.seidra[chapterId] : null;

  const eintragHtml = (e) => {
    const klasse = ['weg-eintrag', e.art, e.status, e.art === 'duell' && e.bestanden ? 'bestanden' : ''].filter(Boolean).join(' ');
    const href = e.frei ? e.href : `#/ort/${chapterId}`;
    const nr = e.art === 'lektion' ? (e.erledigt ? '✓' : e.frei ? e.nr : '🔒') : e.frei || e.erledigt ? e.icon : '🔒';
    let status = '';
    if (e.art === 'lektion') status = e.erledigt ? (e.versuche > 1 ? `${e.versuche}× gespielt` : 'geschafft') : e.frei ? '' : 'erst die Lektion davor';
    if (e.art === 'hinterhalt') status = e.erledigt ? `gespielt · ${e.sterne} von 3 Sternen · jederzeit wiederholbar` : e.frei ? e.untertitel : 'wird frei nach der Lektion davor';
    if (e.art === 'sturm') status = e.erledigt ? `gespielt · ${e.sterne} von 3 Sternen` : e.frei ? e.untertitel : 'wird frei, wenn alle Lektionen geschafft sind';
    if (e.art === 'duell') status = e.bestanden ? `Gewonnen mit ${Math.round(e.best * 100)} % · jederzeit wiederholbar` : e.frei ? `Sam prüft · ab 80 % reißt das Gespinst` : 'wird frei, wenn alle Lektionen geschafft sind';
    const art = e.art === 'lektion' ? e.untertitel : e.art === 'hinterhalt' ? 'Hinterhalt' : e.art === 'sturm' ? 'Warm-up' : 'Duell';
    return `<a class="${klasse}" href="${href}" ${e.frei ? '' : 'aria-disabled="true"'}>
      <span class="weg-nr">${nr}</span>
      <span class="weg-text"><span class="weg-art">${art}</span><strong>${escapeHtml(e.titel)}</strong>${status ? `<small>${escapeHtml(status)}</small>` : ''}</span>
      <span class="weg-rechts">${e.art === 'lektion' && e.erledigt ? sterneHtml(e.stars) : ''}${(e.art === 'hinterhalt' || e.art === 'sturm') && e.erledigt ? sterneHtml(e.sterne) : ''}${e.status === 'naechste' ? '<span class="chip chip-jetzt">Jetzt</span>' : ''}${e.art === 'duell' && e.bestanden ? '<span class="chip chip-gold">befreit</span>' : ''}</span>
    </a>`;
  };

  const einleitungHtml = `<div class="karte einleitung ${gesehen ? 'zu' : ''}" id="einleitung">
      <div class="einleitung-kopf">
        <div><span class="chip chip-gespinst">Gespinst ${escapeHtml(ort.gespinstName)}</span><h2>${escapeHtml(ort.fallenart)}</h2></div>
        <button class="btn btn-geist btn-klein" type="button" id="einleitung-toggle">${gesehen ? 'Einleitung lesen' : 'Zuklappen'}</button>
      </div>
      <div class="einleitung-dialog">
        ${ort.einleitung.map((m) => blaseHtml(m.wer, m.text, { art: figur(m.wer)?.rolle === 'gespinst' ? 'spott' : 'rede' })).join('')}
        ${!gesehen && naechste ? `<div class="schritt-buttons"><a class="btn btn-primaer btn-gross" href="${naechste.href}" id="los">${naechste.art === 'lektion' ? `Los: ${escapeHtml(naechste.titel)} →` : `${escapeHtml(naechste.titel)} →`}</a></div>` : ''}
      </div>
    </div>`;

  const befreitHtml = stand.abgenommen
    ? `<div class="karte ort-befreit">
        <div class="ort-befreit-kopf">${sigilSvg('funke', { groesse: 48 })}<div><span class="chip chip-gold">Ort befreit</span><h2>${escapeHtml(ort.name)} leuchtet</h2></div></div>
        ${ort.befreit ? blaseHtml(ort.befreit.wer, ort.befreit.text, { art: 'rede' }) : ''}
        <div class="ort-regel"><div class="schritt-art">📜 Die Regel dieses Ortes</div><p>${escapeHtml(ort.regel)}</p>${ort.beispiel ? `<pre class="codeblock lang-${escapeHtml(ort.sprache || 'text')}"><code>${escapeHtml(ort.beispiel)}</code></pre>` : ''}</div>
      </div>`
    : '';

  app.innerHTML = `
    <div class="lektion-seite ort-seite auftritt">
      <a class="zurueck" href="#/">← Hyperia</a>
      <div class="ort-kopf" style="--f:${ort.regionFarbe}">
        ${sigilSvg(stand.abgenommen ? 'funke' : ort.gespinst, { groesse: 84, klasse: stand.abgenommen ? '' : 'sigil-gross', titel: ort.gespinstName })}
        <div>
          <span class="chip" style="--f:${ort.regionFarbe}">${escapeHtml(ort.regionName)} · Ort ${ort.nr} von ${alle.length}</span>
          <h1>${escapeHtml(ort.name)}</h1>
          <p>${escapeHtml(kapitel.title)} · ${escapeHtml(kapitel.description || '')}</p>
        </div>
      </div>

      ${seidra ? `<div class="seidra-auftritt" id="seidra">${blaseHtml('seidra', seidra.text, { art: 'spott' })}<button class="btn btn-geist btn-klein" type="button" id="seidra-weg">Weiter ohne sie</button></div>` : ''}
      ${stand.abgenommen ? befreitHtml : einleitungHtml}

      <div class="karte ort-stand">
        <div class="balken" style="--f:${ort.regionFarbe}"><span style="width:${Math.round((stand.erledigt / stand.gesamt) * 100)}%"></span></div>
        <div>${stand.erledigt} / ${stand.gesamt} Lektionen · ${stand.sterne} / ${stand.maxSterne} Sterne</div>
        ${naechste ? `<a class="btn btn-primaer btn-klein" href="${naechste.href}">Weiter: ${escapeHtml(naechste.titel)} →</a>` : stand.abgenommen && alle[index + 1] && kapitelFrei(index + 1, alle) ? `<a class="btn btn-primaer btn-klein" href="#/ort/${alle[index + 1].id}">Nächster Ort →</a>` : ''}
      </div>

      <div class="block-titel">Der Weg durch ${escapeHtml(ort.name)} · ${eintraege.filter((e) => e.art === 'lektion').length} Lektionen, ${eintraege.filter((e) => e.art === 'hinterhalt').length} Hinterhalte, 1 Duell</div>
      <div class="weg">${eintraege.map(eintragHtml).join('')}</div>

      ${stand.abgenommen ? einleitungHtml : ''}
      ${g && !stand.abgenommen && gesehen ? '' : ''}

      <div class="schritt-buttons" style="margin-top:1rem">
        ${index > 0 ? `<a class="btn btn-geist" href="#/ort/${alle[index - 1].id}">← ${escapeHtml(welt.orte[index - 1]?.name || alle[index - 1].title)}</a>` : ''}
        ${index < alle.length - 1 && kapitelFrei(index + 1, alle) ? `<a class="btn btn-geist" href="#/ort/${alle[index + 1].id}">${escapeHtml(welt.orte[index + 1]?.name || alle[index + 1].title)} →</a>` : ''}
        ${istLehrkraft() ? '<span class="chip" style="margin-left:auto">🔓 Lehrkraft-Modus: alles offen</span>' : ''}
      </div>
    </div>`;

  const einleitung = app.querySelector('#einleitung');
  app.querySelector('#einleitung-toggle')?.addEventListener('click', (e) => {
    einleitung.classList.toggle('zu');
    e.currentTarget.textContent = einleitung.classList.contains('zu') ? 'Einleitung lesen' : 'Zuklappen';
  });
  app.querySelector('#los')?.addEventListener('click', () => {
    setEinleitungGesehen(chapterId);
    sound.klick();
  });
  app.querySelector('#seidra-weg')?.addEventListener('click', () => {
    setSeidraGesehen(seidraKey);
    app.querySelector('#seidra')?.remove();
  });
  if (!gesehen) sound.klick?.();
}
