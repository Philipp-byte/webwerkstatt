// Der Turnierplan (Startseite): Hero mit Vorspann-Video und dem nächsten Schritt,
// Tagesziel und Serie, die Karte des Festivalgeländes mit 18 Stationen (= Runden)
// und die Runden-Karten je Block mit den Emblemen der Gegner-Crews.

import { loadCurriculum, loadAlleKapitel, loadCrews } from '../content.js';
import { getState, getStreak, getTagesziel, TAGESZIEL_XP } from '../store.js';
import { rangAus } from '../gamification/xp.js';
import { kapitelStand, kapitelFrei, sterneHtml } from '../progress.js';
import { escapeHtml } from '../engine/markdown.js';
import { crewEmblem, nachtschichtEmblem } from '../engine/emblem.js';
import { naechsterSchritt } from '../engine/ablauf.js';

// Stationen entlang einer Serpentine (viewBox 1000 x 640)
const POSITIONEN = [
  [80, 120], [215, 105], [350, 125], [485, 105], [620, 125], [755, 105], [900, 130],
  [900, 305], [755, 320], [620, 300], [485, 320], [350, 300], [215, 320], [80, 305],
  [80, 490], [260, 510], [450, 490], [680, 520],
];

function pfad(bis = POSITIONEN.length) {
  let d = `M ${POSITIONEN[0][0]} ${POSITIONEN[0][1]}`;
  for (let i = 1; i < bis; i++) {
    const [x0, y0] = POSITIONEN[i - 1];
    const [x1, y1] = POSITIONEN[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

function kulisse(fertigAnteil, bloecke) {
  const bLicht = bloecke.html >= 1 ? 1 : 0.25 + bloecke.html * 0.6;
  const cLicht = bloecke.css >= 1 ? 1 : 0.15 + bloecke.css * 0.7;
  const dLicht = bloecke.js;
  return `
    <defs>
      <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a0c16"/><stop offset="1" stop-color="#151a2b"/>
      </linearGradient>
      <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#151a29"/><stop offset="1" stop-color="#0e1119"/>
      </linearGradient>
      <radialGradient id="glow-warm"><stop offset="0" stop-color="#ffb066" stop-opacity="0.55"/><stop offset="1" stop-color="#ffb066" stop-opacity="0"/></radialGradient>
      <radialGradient id="glow-cool"><stop offset="0" stop-color="#5fd6ff" stop-opacity="0.5"/><stop offset="1" stop-color="#5fd6ff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#himmel)"/>
    ${Array.from({ length: 60 }, (_, i) => {
      const x = (i * 163) % 1000;
      const y = (i * 71) % 220;
      return `<circle cx="${x}" cy="${y}" r="${(i % 3) * 0.4 + 0.6}" fill="#fff" opacity="${0.25 + (i % 5) * 0.12}"/>`;
    }).join('')}
    <g fill="#0d1020">
      <rect x="0" y="180" width="1000" height="60"/>
      <rect x="20" y="150" width="40" height="40"/><rect x="90" y="160" width="70" height="30"/><rect x="200" y="140" width="30" height="50"/>
      <rect x="300" y="155" width="60" height="35"/><rect x="420" y="145" width="45" height="45"/><rect x="520" y="165" width="90" height="25"/>
      <rect x="660" y="150" width="35" height="40"/><rect x="730" y="160" width="60" height="30"/><rect x="850" y="140" width="50" height="50"/><rect x="940" y="158" width="40" height="32"/>
    </g>
    <path d="M0 230 Q 500 200 1000 230 L1000 640 L0 640Z" fill="url(#boden)"/>
    <path d="M0 600 C 200 570, 400 620, 600 590 S 900 560, 1000 600 L1000 640 L0 640Z" fill="#101a2e"/>
    <path d="M0 604 C 200 574, 400 624, 600 594 S 900 564, 1000 604" fill="none" stroke="#1c2d4d" stroke-width="2"/>
    <g transform="translate(410 160)" opacity="${bLicht}">
      <path d="M0 40 L20 0 H220 L240 40 Z" fill="#1f2438"/>
      <rect x="0" y="40" width="240" height="70" fill="#181c2c"/>
      <rect x="18" y="52" width="204" height="46" fill="#0b0d16"/>
      <circle cx="60" cy="42" r="18" fill="url(#glow-warm)"/><circle cx="120" cy="42" r="18" fill="url(#glow-cool)"/><circle cx="180" cy="42" r="18" fill="url(#glow-warm)"/>
      <text x="120" y="82" text-anchor="middle" fill="#ff8a3d" font-family="Unbounded Variable, sans-serif" font-weight="800" font-size="18" letter-spacing="4">WEBCUP</text>
    </g>
    <g transform="translate(60 360)" opacity="${cLicht}">
      <rect x="0" y="0" width="14" height="110" fill="#1f2438"/>
      <rect x="-8" y="-14" width="30" height="16" rx="3" fill="#2a3150"/>
      <circle cx="7" cy="-6" r="30" fill="url(#glow-cool)"/>
      ${bloecke.css > 0 ? `<path d="M7 -6 L120 90 L60 130 Z" fill="#5fd6ff" opacity="0.12"/>` : ''}
    </g>
    <g transform="translate(930 465)" opacity="${0.35 + fertigAnteil * 0.65}">
      <line x1="-30" y1="80" x2="0" y2="0" stroke="#2a3150" stroke-width="4"/><line x1="30" y1="80" x2="0" y2="0" stroke="#2a3150" stroke-width="4"/>
      <circle cx="0" cy="0" r="62" fill="none" stroke="#2f3756" stroke-width="3"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x = Math.cos(a) * 62;
        const y = Math.sin(a) * 62;
        return `<line x1="0" y1="0" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#2f3756" stroke-width="2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${i % 2 ? '#ff8a3d' : '#5fd6ff'}" opacity="${0.3 + fertigAnteil * 0.7}"/>`;
      }).join('')}
    </g>
    <g transform="translate(300 385)" opacity="0.9">
      <rect x="0" y="10" width="70" height="34" rx="6" fill="#20263c"/><rect x="50" y="18" width="24" height="26" rx="4" fill="#2a3150"/>
      <circle cx="16" cy="48" r="6" fill="#0b0d16" stroke="#2f3756" stroke-width="2"/><circle cx="56" cy="48" r="6" fill="#0b0d16" stroke="#2f3756" stroke-width="2"/>
      <rect x="8" y="16" width="34" height="14" fill="#ffc857" opacity="${0.5 + dLicht * 0.5}"/>
    </g>
    <g transform="translate(560 395)" opacity="0.9">
      <path d="M0 40 L30 0 L60 40 Z" fill="#20263c"/><path d="M8 40 L30 12 L52 40 Z" fill="#ff8a3d" opacity="${0.2 + dLicht * 0.6}"/>
    </g>
    <path d="M100 250 Q 300 285 500 250 T 900 250" fill="none" stroke="#2a3150" stroke-width="1.5"/>
    ${Array.from({ length: 16 }, (_, i) => {
      const x = 120 + i * 50;
      const y = 250 + Math.sin((i / 15) * Math.PI * 2) * 14 + 6;
      return `<circle cx="${x}" cy="${y}" r="3" fill="${i % 2 ? '#ffc857' : '#ff8a3d'}" opacity="${0.2 + fertigAnteil * 0.8}"/>`;
    }).join('')}`;
}

export async function renderMap(app) {
  const [curriculum, kapitel, crews] = await Promise.all([
    loadCurriculum(),
    loadAlleKapitel(),
    loadCrews().catch(() => ({ turnier: { name: 'WEBCUP', untertitel: '' }, crew: null, runden: [] })),
  ]);
  const s = getState();
  const rang = rangAus(s.xp);
  const staende = kapitel.map((k) => kapitelStand(k));
  const fertigZahl = staende.filter((st) => st.abgenommen).length;
  const naechste = kapitel.findIndex((k, i) => kapitelFrei(i, kapitel) && !staende[i].abgenommen);
  const rundeVon = (id) => crews.runden.find((r) => r.chapter === id) || null;
  const anteilBlock = (ids) => {
    const idx = ids.map((id) => kapitel.findIndex((k) => k.id === id)).filter((i) => i >= 0);
    if (!idx.length) return 0;
    return idx.filter((i) => staende[i].fertig).length / idx.length;
  };
  const bloecke = {
    html: anteilBlock(curriculum.blocks[1].chapters),
    css: anteilBlock(curriculum.blocks[2].chapters),
    js: anteilBlock(curriculum.blocks[3].chapters),
  };
  const schritt = await naechsterSchritt(kapitel, kapitelFrei).catch(() => null);
  const streak = getStreak();
  const ziel = getTagesziel();
  const poster = new URL('intro/webcup-intro-poster.jpg', document.baseURI).href;

  const stationenSvg = kapitel
    .map((k, i) => {
      const [x, y] = POSITIONEN[i];
      const st = staende[i];
      const frei = kapitelFrei(i, kapitel);
      const r = rundeVon(k.id);
      const klasse = st.abgenommen ? 'fertig' : i === naechste ? 'aktiv' : frei ? 'offen' : 'gesperrt';
      const farbe = k.color || '#ff8a3d';
      const oben = y < 200 || y > 400;
      const ty = oben ? y - 36 : y + 48;
      const sub = st.abgenommen
        ? `${'★'.repeat(Math.round((st.sterne / Math.max(1, st.maxSterne)) * 3)) || '✓'} · ${r ? escapeHtml(r.crew) : ''} raus`
        : r ? `vs. ${escapeHtml(r.crew)}` : `${st.erledigt}/${st.gesamt}`;
      const emblem = frei && r
        ? `<g transform="translate(${x - 24} ${y - 24}) scale(0.48)">${crewEmblem(r, { groesse: 100, raus: st.abgenommen })}</g>`
        : `<circle class="station-kreis" cx="${x}" cy="${y}" r="22" fill="${frei ? '#232a40' : '#151928'}" stroke="${frei ? farbe : '#2a3150'}" stroke-width="2.5"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="18" style="pointer-events:none">${frei ? k.icon : '🔒'}</text>`;
      return `<g class="station ${klasse}" data-id="${k.id}" tabindex="0" role="link" aria-label="Runde ${i + 1}: ${escapeHtml(k.title)}${r ? ` gegen ${escapeHtml(r.crew)}` : ''}">
        ${st.abgenommen || i === naechste ? `<circle cx="${x}" cy="${y}" r="36" fill="url(#glow-warm)"/>` : ''}
        ${emblem}
        <text class="station-titel" x="${x}" y="${ty}" text-anchor="middle" font-size="12">R${i + 1} · ${escapeHtml(k.station || k.title)}</text>
        <text class="station-sub" x="${x}" y="${ty + 14}" text-anchor="middle" font-size="10">${sub}</text>
      </g>`;
    })
    .join('');

  const pfadLaenge = naechste < 0 ? POSITIONEN.length : naechste + 1;
  const offen = kapitel.length - fertigZahl;
  const crew = crews.crew;
  const schrittIcon = schritt ? (schritt.eintrag.art === 'lektion' ? '📘' : schritt.eintrag.icon || '▶') : '🏆';
  const schrittTitel = schritt
    ? `${schritt.eintrag.art === 'lektion' ? 'Lektion' : schritt.eintrag.art === 'match' ? 'Match' : schritt.eintrag.titel}: ${escapeHtml(schritt.eintrag.art === 'lektion' || schritt.eintrag.art === 'match' ? schritt.eintrag.titel : schritt.kapitel.title)}`
    : 'Pokal geholt – Showtime!';
  const schrittHref = schritt ? schritt.eintrag.href : '#/showtime';
  const schrittRunde = schritt ? rundeVon(schritt.kapitel.id) : null;

  app.innerHTML = `
    <div class="auftritt">
      <div class="gelaende-titel" style="margin-bottom:0.9rem">
        <span class="chip chip-farbe" style="--farbe: var(--spark)">${escapeHtml(crews.turnier?.name || 'WEBCUP')} · ${escapeHtml(crews.turnier?.untertitel || '')}</span>
        <h1>Der <span>Turnierplan</span></h1>
        <p class="untertitel">${escapeHtml(curriculum.subtitle)}</p>
      </div>

      <div class="hero">
        <a class="hero-video" href="#/intro" aria-label="Vorspann ansehen">
          <img class="hero-poster" src="${poster}" alt="" onerror="this.remove()">
          <div class="hero-play"><span>▶</span></div>
          <div class="hero-label"><div><small>Vorspann · 1½ Minuten</small><strong>Die Geschichte des WEBCUP</strong></div><small>${s.intro.video ? 'noch einmal ansehen' : 'Video ansehen'}</small></div>
        </a>
        <div class="hero-seite">
          <div class="karte naechster-schritt">
            <small>${schritt ? `Nächster Schritt · Runde ${schritt.index + 1}` : 'Turnier gewonnen'}</small>
            <div class="schritt-titel">${schrittRunde ? crewEmblem(schrittRunde, { groesse: 40 }) : `<span>${schrittIcon}</span>`}<span>${schrittTitel}</span></div>
            ${schritt && schritt.eintrag.untertitel ? `<span style="color:var(--muted);font-size:0.88rem">${escapeHtml(schritt.eintrag.untertitel)}${schrittRunde ? ` · vs. ${escapeHtml(schrittRunde.crew)}` : ''}</span>` : ''}
            <a class="btn btn-primaer" href="${schrittHref}">${schritt ? 'Weiter →' : '🏆 Showtime →'}</a>
          </div>
          <div class="karte tagesziel">
            <div class="tagesziel-kopf"><small>🎯 Tagesziel</small><a class="streak-chip ${streak.aktiv >= 2 ? 'heiss' : streak.aktiv ? '' : 'kalt'}" href="#/keycard" title="Tage in Folge gespielt (beste Serie: ${streak.beste || 0})">🔥 ${streak.aktiv} ${streak.aktiv === 1 ? 'Tag' : 'Tage'}</a></div>
            ${ziel.stand.map((z) => `<div class="tagesziel-zeile ${z.erfuellt ? 'erfuellt' : ''}"><span class="haken">${z.erfuellt ? '✔' : ''}</span><span>${z.titel}</span><small>${z.wert}/${z.ziel}</small></div>`).join('')}
            <div class="tagesziel-bonus">${ziel.alle ? (ziel.bonus ? `✔ Alle drei geschafft – +${TAGESZIEL_XP} XP kassiert.` : `Alle drei geschafft – Bonus kommt mit dem nächsten Abschluss.`) : `Alle drei an einem Tag: +${TAGESZIEL_XP} XP Bonus.`}</div>
          </div>
        </div>
      </div>

      ${crew ? `<div class="crew-leiste">
        ${nachtschichtEmblem({ groesse: 40 })}
        <span class="crew-name">${escapeHtml(crew.name)}</span>
        <span class="crew-motto">„${escapeHtml(crew.motto)}“</span>
        ${Object.values(crew.mitglieder || {}).map((m) => `<span class="crew-mitglied" style="--farbe:${escapeHtml(m.farbe)}"><span class="punkt"></span>${escapeHtml(m.name)} · ${escapeHtml(m.rolle)}</span>`).join('')}
        <span class="crew-mitglied" style="--farbe: var(--spark-2)"><span class="punkt"></span>${escapeHtml(s.name || 'Du')} · ${rang.titel}</span>
        <span class="crew-mitglied" style="margin-left:auto;--farbe: var(--spark)"><span class="punkt"></span>Runde ${naechste >= 0 ? naechste + 1 : kapitel.length} / ${kapitel.length} · ${fertigZahl} ${fertigZahl === 1 ? 'Crew' : 'Crews'} raus · ${offen === 0 ? 'Pokal geholt!' : `${offen} bis zum Pokal`}</span>
      </div>` : ''}

      <div class="gelaende" id="gelaende">
        <svg viewBox="0 0 1000 640" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Turnierplan: 18 Runden auf dem Festivalgelände">
          ${kulisse(fertigZahl / kapitel.length, bloecke)}
          <path d="${pfad()}" fill="none" stroke="#2a3150" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 12"/>
          <path d="${pfad(pfadLaenge)}" fill="none" stroke="#ff8a3d" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 10" opacity="0.9"/>
          ${stationenSvg}
        </svg>
      </div>

      <div class="schnellzugriff">
        <a class="schnell-karte" href="#/projekt"><span class="icon">🌐</span><span><strong>FUNKEN-Website</strong><small>Euer Turnier-Projekt – Seite für Seite</small></span></a>
        <a class="schnell-karte" href="#/backstage"><span class="icon">🏋️</span><span><strong>Trainingslager</strong><small>Blitzrunde, Fehlerjagd, Bühnenaufbau</small></span></a>
        <a class="schnell-karte" href="#/spickzettel"><span class="icon">📖</span><span><strong>Spickzettel</strong><small>Alle Regeln als Karten – mit Beispielen</small></span></a>
        <a class="schnell-karte" href="#/keycard"><span class="icon">🃏</span><span><strong>Spielerkarte</strong><small>Rang, Werte, Trophäen, Spielstand sichern</small></span></a>
      </div>

      ${curriculum.blocks
        .map(
          (b) => `
        <div class="block-titel" style="color:${b.color}">${escapeHtml(b.title)}</div>
        <div class="runden-liste">
          ${b.chapters
            .map((id) => {
              const i = kapitel.findIndex((k) => k.id === id);
              const k = kapitel[i];
              const st = staende[i];
              const frei = kapitelFrei(i, kapitel);
              const r = rundeVon(id);
              const klasse = [frei ? '' : 'gesperrt', st.abgenommen ? 'gewonnen' : '', i === naechste ? 'jetzt' : ''].join(' ');
              const status = st.abgenommen
                ? `Gewonnen mit ${Math.round(st.abnahme.best * 100)} %`
                : i === naechste
                  ? st.erledigt ? `Training ${st.erledigt}/${st.gesamt} · dann das Match` : 'Jetzt dran – Anpfiff'
                  : frei ? `${st.erledigt}/${st.gesamt} Lektionen` : 'Erst die Runde davor gewinnen';
              return `<a class="runde-karte ${klasse}" href="${frei ? `#/kapitel/${k.id}` : '#/'}" style="--farbe:${r?.farbe || k.color}" ${frei ? '' : 'aria-disabled="true" title="Erst das Match der vorherigen Runde gewinnen"'}>
                ${frei && r ? crewEmblem(r, { groesse: 56, raus: st.abgenommen }) : `<span class="runde-gegner">${frei ? (r?.icon || k.icon) : '🔒'}</span>`}
                <span style="flex:1;min-width:0">
                  <span class="runde-nr">Runde ${i + 1} · ${escapeHtml(k.station)}</span>
                  <strong>${r ? `vs. ${escapeHtml(r.crew)}` : escapeHtml(k.title)}</strong>
                  <small>${escapeHtml(k.title)} · ${status}</small>
                  <span class="balken"><span style="width:${Math.round((st.erledigt / Math.max(1, st.gesamt)) * 100)}%"></span></span>
                </span>
                ${st.abgenommen ? '<span class="stempel">Raus</span>' : i === naechste ? '<span class="chip chip-farbe chip-jetzt" style="--farbe: var(--spark)">Jetzt</span>' : ''}
                ${st.sterne ? sterneHtml(Math.round((st.sterne / Math.max(1, st.maxSterne)) * 3)) : ''}
              </a>`;
            })
            .join('')}
        </div>`
        )
        .join('')}
    </div>`;

  app.querySelectorAll('.station').forEach((el) => {
    const id = el.dataset.id;
    const i = kapitel.findIndex((k) => k.id === id);
    const frei = kapitelFrei(i, kapitel);
    const geh = () => {
      if (frei) location.hash = `#/kapitel/${id}`;
    };
    el.addEventListener('click', geh);
    el.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), geh()));
  });
}
