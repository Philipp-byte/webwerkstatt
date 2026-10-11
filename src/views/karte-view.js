// Hyperia (Startseite): die „Weiter“-Karte mit dem einen nächsten Schritt, Seidras
// Auftritte, die Liste der achtzehn Orte nach Regionen und die Karte, auf der jeder
// befreite Ort leuchtet.

import { loadAlleKapitel, loadWelt, alleOrte } from '../content.js';
import { getState, einleitungGesehen, seidraGesehen, setSeidraGesehen } from '../store.js';
import { kapitelStand, kapitelFrei, sterneHtml } from '../progress.js';
import { escapeHtml } from '../engine/markdown.js';
import { karteSvg, karteAktivieren } from '../engine/karte.js';
import { naechsterSchritt } from '../engine/weg.js';
import { ladeFiguren, blaseHtml } from '../engine/figuren.js';
import { sigilSvg } from '../engine/sigil.js';
import { sound } from '../gamification/sound.js';

export async function renderKarte(app) {
  const [kapitel, welt, orte] = await Promise.all([loadAlleKapitel(), loadWelt(), alleOrte()]);
  await ladeFiguren();
  const s = getState();
  const staende = new Map();
  const naechsteIdx = kapitel.findIndex((k, i) => kapitelFrei(i, kapitel) && !kapitelStand(k).abgenommen);
  kapitel.forEach((k, i) => {
    const st = kapitelStand(k);
    staende.set(k.id, { ...st, befreit: st.abgenommen, jetzt: i === naechsteIdx, frei: kapitelFrei(i, kapitel) });
  });
  const befreit = [...staende.values()].filter((x) => x.befreit).length;
  const schritt = await naechsterSchritt(kapitel, orte, kapitelFrei).catch(() => null);
  const ort = schritt?.ort || null;
  const alleFrei = befreit === kapitel.length;

  // „Weiter“-Karte
  let weiterHtml;
  if (alleFrei) {
    weiterHtml = `<div class="karte weiter-karte frei">
      ${sigilSvg('funke', { groesse: 72, titel: 'Funkenfest' })}
      <div>
        <span class="chip chip-gold">Hyperia ist frei</span>
        <h2>Das Funkenfest kann beginnen.</h2>
        <p>Alle achtzehn Orte leuchten. Seidra ist in der Tiefe. Zeig allen deine Website.</p>
        <a class="btn btn-primaer" href="#/showtime">Zur Showtime →</a>
      </div></div>`;
  } else if (schritt) {
    const e = schritt.eintrag;
    const erstesMal = !einleitungGesehen(schritt.kapitel.id);
    const titel = erstesMal
      ? `${ort.gespinstName} hat ${ort.name} besetzt.`
      : e.art === 'lektion' ? `Weiter: ${e.titel}` : e.art === 'duell' ? `Duell gegen ${ort.gespinstName}` : e.titel;
    const unter = erstesMal
      ? escapeHtml(ort.fallenart)
      : e.art === 'lektion' ? `${e.untertitel} ${e.nr} von ${schritt.kapitel.lessons.length} · ${escapeHtml(schritt.kapitel.title)}` : escapeHtml(e.untertitel || '');
    const href = erstesMal ? `#/ort/${schritt.kapitel.id}` : e.href;
    const knopf = erstesMal ? `${ort.name} betreten →` : e.art === 'lektion' ? 'Weiter →' : e.art === 'duell' ? 'Zum Duell →' : `${e.titel.split(':')[0]} →`;
    const zitat = ort.einleitung?.[0]?.text;
    weiterHtml = `<div class="karte weiter-karte">
      ${sigilSvg(ort.gespinst, { groesse: 72, titel: ort.gespinstName })}
      <div>
        <span class="chip chip-gespinst">Ort ${ort.nr} · ${escapeHtml(ort.name)} · ${escapeHtml(ort.regionName)}</span>
        <h2>${escapeHtml(titel)}</h2>
        <p>${unter}</p>
        ${erstesMal && zitat ? `<div class="gespinst-zeile">${escapeHtml(ort.gespinstName.toUpperCase())} › „${escapeHtml(zitat)}“</div>` : ''}
        <a class="btn btn-primaer" href="${href}">${escapeHtml(knopf)}</a>
      </div></div>`;
  } else {
    weiterHtml = `<div class="karte weiter-karte"><div><h2>Hyperia wartet.</h2><a class="btn btn-primaer" href="#/ort/${kapitel[0].id}">Quellgrund betreten →</a></div></div>`;
  }

  // Seidras Auftritt beim aktuellen Ort (einmal, bis weggeklickt)
  const seidraKey = schritt ? `${schritt.kapitel.id}:start` : null;
  const seidra = schritt && welt.seidra?.[schritt.kapitel.id]?.wann === 'start' && !seidraGesehen(seidraKey) ? welt.seidra[schritt.kapitel.id] : null;

  const regionHtml = welt.regionen
    .map((r) => {
      const liste = orte.filter((o) => o.region === r.id);
      return `<div class="region-block">
        <div class="region-titel" style="--f:${r.farbe}"><span>${escapeHtml(r.name)}</span><small>${escapeHtml(r.text)}</small></div>
        ${liste
          .map((o) => {
            const k = kapitel.find((x) => x.id === o.chapter);
            const st = staende.get(o.chapter);
            const klasse = st.befreit ? 'frei' : st.jetzt ? 'jetzt' : st.frei ? 'offen' : 'schatten';
            const status = st.befreit
              ? `befreit · ${o.gespinstName} vertrieben · ${st.sterne} von ${st.maxSterne} Sternen`
              : st.jetzt
                ? `${st.erledigt} / ${st.gesamt} Lektionen · Gespinst ${o.gespinstName}`
                : st.frei ? `${st.erledigt} / ${st.gesamt} Lektionen` : `unter dem Netz · Gespinst ${o.gespinstName}`;
            return `<a class="ort-zeile ${klasse}" href="${st.frei ? `#/ort/${o.chapter}` : '#/'}" ${st.frei ? '' : 'aria-disabled="true"'}>
              <span class="ort-nr-kachel">${st.befreit ? o.nr : st.frei ? o.nr : '🕸'}</span>
              <span class="ort-zeile-text"><strong>${escapeHtml(o.name)} · ${escapeHtml(k?.title || '')}</strong><small>${status}</small></span>
              <span class="ort-zeile-rechts">${st.befreit ? sterneHtml(Math.round((st.sterne / Math.max(1, st.maxSterne)) * 3)) : st.jetzt ? '<span class="chip chip-jetzt">Jetzt</span>' : ''}</span>
            </a>`;
          })
          .join('')}
      </div>`;
    })
    .join('');

  app.innerHTML = `
    <div class="hyperia-seite auftritt">
      <div class="hyperia-lage">
        <div>
          ${weiterHtml}
          ${seidra ? `<div class="seidra-auftritt" id="seidra">${blaseHtml('seidra', seidra.text, { art: 'spott' })}<button class="btn btn-geist btn-klein" type="button" id="seidra-weg">Weiter ohne sie</button></div>` : ''}
          <div class="orte-liste">${regionHtml}</div>
          <div class="schnellzugriff">
            <a class="schnell-karte" href="#/projekt"><span class="icon">🌐</span><span><strong>Deine Website</strong><small>Die FUNKEN-Seite wächst mit jedem Ort</small></span></a>
            <a class="schnell-karte" href="#/spickzettel"><span class="icon">📖</span><span><strong>Spickzettel</strong><small>Alle Regeln als Karten</small></span></a>
          </div>
        </div>
        <div class="karte karte-hyperia">
          <h3>Hyperia · ${befreit} von ${kapitel.length} Orten befreit</h3>
          ${karteSvg(orte, welt.regionen, staende)}
          <div class="stand">${alleFrei ? 'Das Netz ist zerrissen. Hyperia leuchtet.' : 'Jeder befreite Ort leuchtet. Das Netz zieht sich zurück.'}</div>
        </div>
      </div>
    </div>`;

  karteAktivieren(app, { frei: (ch) => !!staende.get(ch)?.frei || !!staende.get(ch)?.befreit });
  app.querySelector('#seidra-weg')?.addEventListener('click', () => {
    setSeidraGesehen(seidraKey);
    sound.klick();
    app.querySelector('#seidra')?.remove();
  });
  if (seidra) sound.alarm?.();
  void s;
}
