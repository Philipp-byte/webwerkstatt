// Keycard: Profil ohne Konto – Rang, Level, Abzeichen, Statistik, Kompetenzen,
// Spielstand sichern/laden, Einstellungen.

import { getState, setName, exportSpielstand, importSpielstand, spielstandLoeschen, getSettings, setSetting, abzeichenPruefen, istLehrkraft } from '../store.js';
import { levelFortschritt, rangAus, naechsterRang, RAENGE } from '../gamification/xp.js';
import { ABZEICHEN } from '../gamification/badges.js';
import { loadKonzepte, loadAlleKapitel } from '../content.js';
import { escapeHtml } from '../engine/markdown.js';
import { toast } from '../gamification/celebrate.js';
import { sound } from '../gamification/sound.js';
import { meldeAbzeichen } from './lesson-view.js';

const robby = (pose) => new URL(`figuren/robby/${pose}.png`, document.baseURI).href;

function datum(ms) {
  return ms ? new Date(ms).toLocaleDateString('de-DE') : '–';
}

export async function renderKeycard(app) {
  const s = getState();
  const [konzepte, kapitel] = await Promise.all([loadKonzepte(), loadAlleKapitel()]);
  const lf = levelFortschritt(s.xp);
  const rang = rangAus(s.xp);
  const naechster = naechsterRang(s.xp);
  const sterne = Object.values(s.lessons).reduce((a, l) => a + (l.stars || 0), 0);
  const lektionen = Object.values(s.lessons).filter((l) => l.done).length;
  const gesamtLektionen = kapitel.reduce((a, k) => a + k.lessons.length, 0);
  const genauigkeit = s.stats.correct + s.stats.wrong ? Math.round((s.stats.correct / (s.stats.correct + s.stats.wrong)) * 100) : 0;
  const einst = getSettings();
  const code = `WW-${String(s.stats.firstActive || 0).slice(-6).padStart(6, '0')}-${String(lf.level).padStart(2, '0')}`;

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
    <div class="auftritt">
      <a class="zurueck" href="#/">← Zum Gelände</a>
      <div class="keycard" style="margin-top:0.75rem">
        <div class="keycard-avatar"><img src="${robby(lf.level >= 10 ? 'erfolg-pokal' : 'hallo-winken')}" alt=""></div>
        <div>
          <div class="keycard-rang">${rang.icon} ${rang.titel}${istLehrkraft() ? ' · Lehrkraft-Modus' : ''}</div>
          <input class="keycard-name-input" id="name" type="text" maxlength="30" placeholder="Dein Name (optional)" value="${escapeHtml(s.name)}" aria-label="Name auf der Keycard">
          <div class="keycard-level">Level ${lf.level} · ${s.xp} XP${naechster ? ` · noch ${naechster.ab - s.xp} XP bis ${naechster.titel}` : ' · höchster Rang erreicht'}</div>
          <div class="balken" style="--farbe: var(--spark)"><span style="width:${Math.round(lf.anteil * 100)}%"></span></div>
          <small style="color:#9aa3b8">${lf.fehlt} XP bis Level ${lf.level + 1}</small>
        </div>
        <div class="keycard-code">WEBWERKSTATT · ${code}</div>
      </div>

      <div class="statistik-grid">
        <div class="stat-kachel"><strong>${lektionen}/${gesamtLektionen}</strong><small>Lektionen</small></div>
        <div class="stat-kachel"><strong>${sterne}</strong><small>Sterne</small></div>
        <div class="stat-kachel"><strong>${s.stats.codePassed}</strong><small>Code-Aufgaben bestanden</small></div>
        <div class="stat-kachel"><strong>${genauigkeit} %</strong><small>Treffsicherheit</small></div>
        <div class="stat-kachel"><strong>${s.stats.longestCombo}</strong><small>Längste Serie</small></div>
        <div class="stat-kachel"><strong>${Object.values(s.boss).filter((b) => b.passed).length}</strong><small>Abnahmen bestanden</small></div>
      </div>

      <div class="sektion karte">
        <h2>🧠 Was sitzt schon?</h2>
        <p style="color:var(--muted);font-size:0.9rem">Sicher = im Soundcheck mehrfach richtig beantwortet (Leitner-Box 4 oder höher). Was noch wackelt, kommt automatisch wieder dran.</p>
        <div class="kompetenz-liste">
          ${bloecke.map((b) => `<div class="kompetenz-zeile"><span>${b.titel}</span><span class="balken" style="--farbe:${b.farbe}"><span style="width:${b.gesamt ? Math.round((b.sicher / b.gesamt) * 100) : 0}%"></span></span><span style="color:var(--muted);font-size:0.8rem">${b.sicher}/${b.gesamt}</span></div>`).join('')}
        </div>
      </div>

      <div class="sektion">
        <h2>🏅 Abzeichen <span class="chip">${Object.keys(s.badges).length} / ${ABZEICHEN.length}</span></h2>
        <div class="abzeichen-grid">
          ${ABZEICHEN.map((a) => `<div class="abzeichen ${s.badges[a.id] ? '' : 'gesperrt'}" title="${escapeHtml(a.text)}"><div class="icon">${a.icon}</div><strong>${a.titel}</strong><small>${s.badges[a.id] ? datum(s.badges[a.id]) : escapeHtml(a.text)}</small></div>`).join('')}
        </div>
      </div>

      <div class="sektion karte">
        <h2>🪜 Die Ränge der Werkstatt</h2>
        <div class="kompetenz-liste">
          ${RAENGE.map((r) => `<div class="kompetenz-zeile" style="opacity:${s.xp >= r.ab ? 1 : 0.5}"><span>${r.icon} ${r.titel}</span><span class="balken" style="--farbe: var(--spark)"><span style="width:${Math.min(100, Math.round((s.xp / Math.max(1, r.ab)) * 100))}%"></span></span><span style="color:var(--muted);font-size:0.8rem">${r.ab} XP</span></div>`).join('')}
        </div>
      </div>

      <div class="sektion karte">
        <h2>💾 Spielstand sichern</h2>
        <p style="color:var(--muted);font-size:0.95rem">Dein Spielstand liegt nur in diesem Browser. Schulrechner werden oft gelöscht – lade dir deshalb regelmäßig eine Sicherungsdatei herunter (Netzlaufwerk, USB-Stick, Cloud) und lade sie am nächsten Rechner wieder.</p>
        <div class="schritt-buttons">
          <button class="btn btn-primaer" type="button" id="export">⬇ Spielstand herunterladen</button>
          <button class="btn btn-sekundaer" type="button" id="import">⬆ Spielstand laden</button>
          <input type="file" id="import-datei" accept=".json,application/json" hidden>
          <a class="btn btn-sekundaer" href="#/bericht">🖨 Lernbericht</a>
          <button class="btn btn-geist" type="button" id="reset" style="margin-left:auto">Alles zurücksetzen</button>
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
    meldeAbzeichen(abzeichenPruefen({ ereignis: 'export' }));
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

  app.querySelector('#reset').addEventListener('click', () => {
    if (!confirm('Wirklich den gesamten Spielstand löschen? XP, Sterne, Abzeichen und die FUNKEN-Website sind dann weg.')) return;
    if (!confirm('Ganz sicher? Das lässt sich nicht rückgängig machen.')) return;
    spielstandLoeschen();
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
}
