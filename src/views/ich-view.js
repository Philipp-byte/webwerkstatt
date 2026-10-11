// „Ich“ (Route #/ich): Name, Level, befreite Orte, Sterne, Meilensteine, was sitzt,
// Hinterhalt-Rekorde, Spielstand sichern/laden, Einstellungen, Lehrkraft.

import { getState, setName, exportSpielstand, importSpielstand, spielstandLoeschen, getSettings, setSetting, meilensteinePruefen, istLehrkraft } from '../store.js';
import { levelFortschritt } from '../gamification/xp.js';
import { MEILENSTEINE } from '../gamification/badges.js';
import { loadKonzepte, loadAlleKapitel, alleOrte } from '../content.js';
import { escapeHtml } from '../engine/markdown.js';
import { toast } from '../gamification/celebrate.js';
import { sound } from '../gamification/sound.js';
import { meldeMeilensteine } from './lesson-view.js';
import { SPIELE } from '../engine/hinterhalt.js';
import { figurBild, sigilSvg } from '../engine/sigil.js';
import { istSchulmodus, abmelden, aktuellerNutzer } from '../api.js';

function datum(ms) {
  return ms ? new Date(ms).toLocaleDateString('de-DE') : '–';
}

export async function renderIch(app) {
  const s = getState();
  const [konzepte, kapitel, orte] = await Promise.all([loadKonzepte(), loadAlleKapitel(), alleOrte()]);
  const lf = levelFortschritt(s.xp);
  const sterne = Object.values(s.lessons).reduce((a, l) => a + (l.stars || 0), 0);
  const lektionen = Object.values(s.lessons).filter((l) => l.done).length;
  const gesamtLektionen = kapitel.reduce((a, k) => a + k.lessons.length, 0);
  const genauigkeit = s.stats.correct + s.stats.wrong ? Math.round((s.stats.correct / (s.stats.correct + s.stats.wrong)) * 100) : 0;
  const einst = getSettings();
  const befreit = orte.filter((o) => s.boss[o.chapter]?.passed);
  const naechsterOrt = orte.find((o) => !s.boss[o.chapter]?.passed) || null;
  const nutzer = aktuellerNutzer();

  const bloecke = [
    { titel: 'Web-Grundlagen', prefix: 'web.', farbe: 'var(--basics)' },
    { titel: 'HTML', prefix: 'html.', farbe: 'var(--html)' },
    { titel: 'CSS', prefix: 'css.', farbe: 'var(--css)' },
    { titel: 'Recht', prefix: 'recht.', farbe: 'var(--projekt)' },
    { titel: 'JavaScript', prefix: 'js.', farbe: 'var(--js)' },
  ].map((b) => {
    const ids = konzepte.filter((k) => k.id.startsWith(b.prefix)).map((k) => k.id);
    const gelernt = ids.filter((id) => s.leitner[id]);
    const sicher = ids.filter((id) => s.leitner[id]?.box >= 4);
    return { ...b, gesamt: ids.length, gelernt: gelernt.length, sicher: sicher.length };
  });

  app.innerHTML = `
    <div class="auftritt ich-seite">
      <a class="zurueck" href="#/">← Hyperia</a>
      <div class="karte profil">
        <div class="profil-bild">${figurBild('robby', { pose: lf.level >= 10 ? 'erfolg-pokal' : 'hallo-winken', groesse: 110 })}</div>
        <div class="profil-mitte">
          <span class="chip chip-gold">${nutzer ? `Schulmodus · ${escapeHtml(nutzer.pseudonym)}` : 'Lehrling der Werkstatt'}${istLehrkraft() ? ' · Lehrkraft-Modus' : ''}</span>
          <input class="keycard-name-input" id="name" type="text" maxlength="30" placeholder="Dein Name (optional)" value="${escapeHtml(s.name)}" aria-label="Name">
          <div class="keycard-level">Level ${lf.level} · ${s.xp} XP · noch ${lf.fehlt} XP bis Level ${lf.level + 1}</div>
          <div class="balken" style="--f: var(--spark)"><span style="width:${Math.round(lf.anteil * 100)}%"></span></div>
        </div>
        <div class="profil-zahlen">
          <div><strong>${befreit.length}/${orte.length}</strong><small>Orte befreit</small></div>
          <div><strong>${sterne}</strong><small>Sterne</small></div>
          <div><strong>${s.stats.hinterhaltSterne || 0}</strong><small>Hinterhalt-Sterne</small></div>
        </div>
      </div>

      <div class="statistik-grid">
        <div class="stat-kachel"><strong>${lektionen}/${gesamtLektionen}</strong><small>Lektionen</small></div>
        <div class="stat-kachel"><strong>${s.stats.codePassed}</strong><small>Code-Aufgaben bestanden</small></div>
        <div class="stat-kachel"><strong>${genauigkeit} %</strong><small>Treffsicherheit</small></div>
        <div class="stat-kachel"><strong>${s.stats.soundcheckCorrect}</strong><small>Soundcheck-Fragen richtig</small></div>
        <div class="stat-kachel"><strong>${s.hinterhalte.runden || 0}</strong><small>Hinterhalte gespielt</small></div>
        <div class="stat-kachel"><strong>${naechsterOrt ? naechsterOrt.name : 'Funkenfest'}</strong><small>${naechsterOrt ? `nächster Ort · Gespinst ${escapeHtml(naechsterOrt.gespinstName)}` : 'Hyperia ist frei'}</small></div>
      </div>

      <div class="sektion">
        <h2>🏅 Meilensteine <span class="chip">${Object.keys(s.badges).filter((id) => MEILENSTEINE.some((m) => m.id === id)).length} / ${MEILENSTEINE.length}</span></h2>
        <div class="abzeichen-grid">
          ${MEILENSTEINE.map((a) => `<div class="abzeichen ${s.badges[a.id] ? '' : 'gesperrt'}" title="${escapeHtml(a.text)}"><div class="icon">${a.icon}</div><strong>${escapeHtml(a.titel)}</strong><small>${s.badges[a.id] ? datum(s.badges[a.id]) : escapeHtml(a.text)}</small></div>`).join('')}
        </div>
      </div>

      <div class="sektion karte">
        <h2>🧠 Was sitzt schon?</h2>
        <p style="color:var(--muted);font-size:0.9rem">Sicher = im Soundcheck und in Hinterhalten mehrfach richtig (Leitner-Box 4 oder höher). Was noch wackelt, kommt automatisch wieder dran.</p>
        <div class="kompetenz-liste">
          ${bloecke.map((b) => `<div class="kompetenz-zeile"><span>${b.titel}</span><span class="balken" style="--f:${b.farbe}"><span style="width:${b.gesamt ? Math.round((b.sicher / b.gesamt) * 100) : 0}%"></span></span><span style="color:var(--muted);font-size:0.8rem">${b.sicher}/${b.gesamt}</span></div>`).join('')}
        </div>
      </div>

      <div class="sektion karte">
        <h2>🕸 Hinterhalt-Rekorde</h2>
        <div class="rekorde">${SPIELE.map((sp) => `<a class="rekord" href="#/hinterhalt/${naechsterOrt?.chapter || orte[0].chapter}/${sp.id}"><span>${sp.icon}</span><strong>${escapeHtml(sp.titel)}</strong><small>${s.hinterhalte.rekorde[sp.id] || 0} Punkte</small></a>`).join('')}</div>
      </div>

      <div class="sektion karte">
        <h2>🕯 Befreite Orte <span class="chip">${befreit.length} / ${orte.length}</span></h2>
        <div class="orte-sigille">${orte.map((o) => `<span class="ort-sigil ${s.boss[o.chapter]?.passed ? 'frei' : ''}" title="${escapeHtml(o.name)} · ${escapeHtml(o.gespinstName)}">${sigilSvg(s.boss[o.chapter]?.passed ? 'funke' : o.gespinst, { groesse: 40, titel: o.name })}<small>${o.nr}</small></span>`).join('')}</div>
        <p style="color:var(--muted);font-size:0.85rem;margin:0.5rem 0 0">Die Regel jedes befreiten Ortes steht auf seiner Seite und in jeder Aufgabe unter „Nachlesen“.</p>
      </div>

      <div class="sektion karte">
        <h2>💾 Spielstand</h2>
        <p style="color:var(--muted);font-size:0.95rem">${nutzer ? 'Dein Spielstand liegt auf dem Schulserver und ist an jedem Rechner da, sobald du dich anmeldest. Eine Sicherungsdatei schadet trotzdem nicht.' : 'Dein Spielstand liegt nur in diesem Browser. Schulrechner werden oft gelöscht: Lade dir regelmäßig eine Sicherungsdatei herunter und lade sie am nächsten Rechner wieder.'}</p>
        <div class="schritt-buttons">
          <button class="btn btn-primaer" type="button" id="export">⬇ Spielstand herunterladen</button>
          <button class="btn btn-sekundaer" type="button" id="import">⬆ Spielstand laden</button>
          <input type="file" id="import-datei" accept=".json,application/json" hidden>
          <a class="btn btn-sekundaer" href="#/bericht">🖨 Lernbericht</a>
          <a class="btn btn-sekundaer" href="#/spickzettel">📖 Spickzettel</a>
          ${nutzer ? '<button class="btn btn-geist" type="button" id="abmelden" style="margin-left:auto">Abmelden</button>' : '<button class="btn btn-geist" type="button" id="reset" style="margin-left:auto">Alles zurücksetzen</button>'}
        </div>
        <p style="color:var(--muted);font-size:0.8rem;margin:0.6rem 0 0">Zuletzt aktiv: ${datum(s.stats.lastActive)} · Sicherungen bisher: ${s.stats.exports}</p>
      </div>

      <div class="sektion karte">
        <h2>⚙️ Einstellungen</h2>
        <div class="einstellungen">
          <div class="einstellung"><span>Design</span><span class="schalter" data-setting="theme"><button type="button" data-wert="dunkel" class="${einst.theme !== 'hell' ? 'aktiv' : ''}">🌙 Dunkel</button><button type="button" data-wert="hell" class="${einst.theme === 'hell' ? 'aktiv' : ''}">☀️ Hell</button></span></div>
          <div class="einstellung"><span>Bewegung im Hintergrund</span><span class="schalter" data-setting="motion"><button type="button" data-wert="an" class="${einst.motion !== 'aus' ? 'aktiv' : ''}">An</button><button type="button" data-wert="aus" class="${einst.motion === 'aus' ? 'aktiv' : ''}">Aus</button></span></div>
          <div class="einstellung"><span>Ton</span><span class="schalter" data-setting="ton"><button type="button" data-wert="an" class="${!sound.istStumm() ? 'aktiv' : ''}">🔊 An</button><button type="button" data-wert="aus" class="${sound.istStumm() ? 'aktiv' : ''}">🔇 Aus</button></span></div>
          <div class="einstellung"><span>Vorspann</span><a class="btn btn-geist btn-klein" href="#/intro">🎬 Noch einmal ansehen</a></div>
          <div class="einstellung"><span>Lehrkraft</span><a class="btn btn-geist btn-klein" href="#/lehrkraft">${istLehrkraft() ? '🔓 Modus aktiv' : '🔒 Lehrkraft-Modus'}</a></div>
        </div>
      </div>
    </div>`;

  app.querySelector('#name').addEventListener('change', (e) => setName(e.target.value));

  app.querySelector('#export').addEventListener('click', () => {
    const daten = exportSpielstand();
    const name = (getState().name || 'spielstand').replace(/[^a-zA-Z0-9_-]+/g, '_');
    const blob = new Blob([JSON.stringify(daten, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `webwerkstatt_${name}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast({ titel: 'Spielstand heruntergeladen', text: 'Bewahre die Datei gut auf.', icon: '💾', art: 'ok' });
    meldeMeilensteine(meilensteinePruefen({ ereignis: 'export' }));
  });

  const datei = app.querySelector('#import-datei');
  app.querySelector('#import').addEventListener('click', () => datei.click());
  datei.addEventListener('change', async () => {
    const f = datei.files[0];
    if (!f) return;
    try {
      const daten = JSON.parse(await f.text());
      if (!confirm('Den aktuellen Spielstand durch die Datei ersetzen?')) return;
      importSpielstand(daten);
      toast({ titel: 'Spielstand geladen', text: 'Die Seite wird neu aufgebaut …', icon: '✅', art: 'ok' });
      setTimeout(() => location.reload(), 900);
    } catch (e) {
      toast({ titel: 'Datei nicht lesbar', text: e.message || 'Keine WebWerkstatt-Datei.', icon: '⚠️', art: 'fehler' });
    }
  });

  app.querySelector('#reset')?.addEventListener('click', () => {
    if (!confirm('Wirklich den gesamten Spielstand löschen? XP, Sterne, Meilensteine, befreite Orte und die FUNKEN-Website sind dann weg.')) return;
    if (!confirm('Ganz sicher? Das lässt sich nicht rückgängig machen.')) return;
    spielstandLoeschen();
    location.reload();
  });
  app.querySelector('#abmelden')?.addEventListener('click', async () => {
    await abmelden();
    location.hash = '#/login';
    location.reload();
  });

  app.querySelectorAll('.schalter').forEach((sw) => {
    sw.querySelectorAll('button').forEach((b) => {
      b.addEventListener('click', () => {
        sw.querySelectorAll('button').forEach((x) => x.classList.remove('aktiv'));
        b.classList.add('aktiv');
        const feld = sw.dataset.setting;
        if (feld === 'ton') {
          sound.setStumm(b.dataset.wert === 'aus');
          if (!sound.istStumm()) sound.klick();
          const knopf = document.getElementById('ton-knopf');
          if (knopf) knopf.textContent = sound.istStumm() ? '🔇' : '🔊';
          return;
        }
        setSetting(feld, b.dataset.wert);
        document.documentElement.dataset[feld] = b.dataset.wert;
      });
    });
  });
  void istSchulmodus;
}
