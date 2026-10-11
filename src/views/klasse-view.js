// Lehrkraft-Dashboard im Schulmodus: Klassen anlegen, Accounts erzeugen (druckbare
// Pseudonym-Passwort-Liste), Fortschritt der Klasse sehen, Passwörter zurücksetzen.
// Admins verwalten zusätzlich die Lehrkräfte.

import { aktuellerNutzer, klassen, klasseAnlegen, accountsErzeugen, klassenFortschritt, passwortZuruecksetzen, klasseLoeschen, lehrkraefte, lehrkraftAnlegen, lehrkraftLoeschen, passwortAendern } from '../api.js';
import { escapeHtml } from '../engine/markdown.js';
import { toast } from '../gamification/celebrate.js';
import { alleOrte } from '../content.js';

function datum(iso) {
  return iso ? new Date(iso).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' }) : '–';
}

export async function renderKlasse(app) {
  const nutzer = aktuellerNutzer();
  if (!nutzer || !['teacher', 'admin'].includes(nutzer.rolle)) {
    app.innerHTML = `<div class="lektion-seite"><div class="karte gesperrt-karte"><h2>Nur für Lehrkräfte</h2><p><a href="#/">Nach Hyperia</a></p></div></div>`;
    return;
  }
  const orte = await alleOrte();
  let liste = [];
  let aktiv = null;

  app.innerHTML = `<div class="auftritt klasse-seite">
    <a class="zurueck" href="#/ich">← Ich</a>
    <h1 style="margin-top:0.5rem">🧑‍🏫 Klassen</h1>
    <div class="klasse-lage">
      <div class="karte">
        <h2>Meine Klassen</h2>
        <div id="klassen-liste"></div>
        <form id="neu" class="klasse-form"><input id="klasse-name" type="text" placeholder="z. B. 1BK1T 2026" maxlength="40" required><button class="btn btn-sekundaer btn-klein" type="submit">+ Klasse</button></form>
        <hr style="border:0;border-top:1px solid var(--line);margin:1rem 0">
        <h3 style="font-size:1rem">Eigenes Passwort ändern</h3>
        <form id="pw" class="klasse-form" style="flex-direction:column;align-items:stretch"><input id="pw-alt" type="password" placeholder="Altes Passwort" autocomplete="current-password" required><input id="pw-neu" type="password" placeholder="Neues Passwort (mind. 8 Zeichen)" minlength="8" autocomplete="new-password" required><button class="btn btn-sekundaer btn-klein" type="submit">Ändern</button></form>
        ${nutzer.rolle === 'admin' ? '<hr style="border:0;border-top:1px solid var(--line);margin:1rem 0"><h3 style="font-size:1rem">Lehrkräfte (Admin)</h3><div id="lehrer-liste"></div><form id="lehrer-neu" class="klasse-form" style="flex-direction:column;align-items:stretch"><input id="lehrer-name" type="text" placeholder="Pseudonym der Lehrkraft" required><input id="lehrer-pw" type="password" placeholder="Startpasswort (mind. 8 Zeichen)" minlength="8" required><button class="btn btn-sekundaer btn-klein" type="submit">+ Lehrkraft</button></form>' : ''}
      </div>
      <div id="detail" class="karte"><p style="color:var(--muted)">Wähle links eine Klasse.</p></div>
    </div>
  </div>`;

  async function ladeKlassen() {
    try {
      liste = (await klassen()).klassen || [];
    } catch (e) {
      toast({ titel: 'Server nicht erreichbar', text: e.message, icon: '⚠️', art: 'fehler' });
      liste = [];
    }
    const el = app.querySelector('#klassen-liste');
    el.innerHTML = liste.length
      ? liste.map((k) => `<button class="klasse-eintrag ${aktiv?.id === k.id ? 'aktiv' : ''}" type="button" data-id="${k.id}"><strong>${escapeHtml(k.name)}</strong><small>${k.anzahl} Accounts</small></button>`).join('')
      : '<p style="color:var(--muted);font-size:0.9rem">Noch keine Klasse. Leg eine an, dann erzeuge Accounts.</p>';
    el.querySelectorAll('.klasse-eintrag').forEach((b) => b.addEventListener('click', () => zeigeKlasse(liste.find((k) => String(k.id) === b.dataset.id))));
  }

  async function zeigeKlasse(k) {
    aktiv = k;
    await ladeKlassen();
    const detail = app.querySelector('#detail');
    detail.innerHTML = '<p class="laden">Lade …</p>';
    let fortschritt = [];
    try {
      fortschritt = (await klassenFortschritt(k.id)).schueler || [];
    } catch (e) {
      detail.innerHTML = `<p class="rueckmeldung rueckmeldung-fehler">${escapeHtml(e.message)}</p>`;
      return;
    }
    detail.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
        <h2 style="margin:0;flex:1">${escapeHtml(k.name)}</h2>
        <form id="accounts" class="klasse-form"><input id="anzahl" type="number" min="1" max="60" value="25" style="width:5rem"><button class="btn btn-primaer btn-klein" type="submit">Accounts erzeugen</button></form>
        <button class="btn btn-geist btn-klein" type="button" id="loeschen">Klasse löschen</button>
      </div>
      <p style="color:var(--muted);font-size:0.9rem">Neue Accounts bekommen ein Pseudonym und ein Startpasswort. Die Liste erscheint einmal zum Drucken; danach siehst du nur noch die Pseudonyme. Welches Pseudonym zu wem gehört, bleibt auf deiner gedruckten Liste.</p>
      <div id="neu-liste"></div>
      <table class="bericht-tabelle klasse-tabelle">
        <thead><tr><th>Pseudonym</th><th>Orte</th><th>Lektionen</th><th>Sterne</th><th>XP</th><th>Zuletzt aktiv</th><th></th></tr></thead>
        <tbody>${fortschritt.map((sch) => `<tr><td><strong>${escapeHtml(sch.pseudonym)}</strong></td><td>${sch.orte} / ${orte.length}</td><td>${sch.lektionen}</td><td>${sch.sterne}</td><td>${sch.xp}</td><td>${datum(sch.zuletzt)}</td><td><button class="btn btn-geist btn-klein reset" type="button" data-id="${sch.id}" title="Neues Startpasswort">🔑</button></td></tr>`).join('') || '<tr><td colspan="7" style="color:var(--muted)">Noch keine Accounts.</td></tr>'}</tbody>
      </table>`;
    detail.querySelector('#accounts').addEventListener('submit', async (e) => {
      e.preventDefault();
      const anzahl = Number(detail.querySelector('#anzahl').value) || 1;
      try {
        const d = await accountsErzeugen(k.id, anzahl);
        zeigeNeueListe(detail.querySelector('#neu-liste'), k, d.accounts);
        await ladeKlassen();
      } catch (err) {
        toast({ titel: 'Fehler', text: err.message, icon: '⚠️', art: 'fehler' });
      }
    });
    detail.querySelector('#loeschen').addEventListener('click', async () => {
      if (!confirm(`Klasse „${k.name}“ mit allen Accounts und Spielständen löschen?`)) return;
      await klasseLoeschen(k.id).catch((err) => toast({ titel: 'Fehler', text: err.message, icon: '⚠️', art: 'fehler' }));
      aktiv = null;
      app.querySelector('#detail').innerHTML = '<p style="color:var(--muted)">Wähle links eine Klasse.</p>';
      ladeKlassen();
    });
    detail.querySelectorAll('.reset').forEach((b) =>
      b.addEventListener('click', async () => {
        try {
          const d = await passwortZuruecksetzen(b.dataset.id);
          zeigeNeueListe(detail.querySelector('#neu-liste'), k, [d.account]);
        } catch (err) {
          toast({ titel: 'Fehler', text: err.message, icon: '⚠️', art: 'fehler' });
        }
      })
    );
  }

  function zeigeNeueListe(el, k, accounts) {
    el.innerHTML = `<div class="hinweis-box druckliste"><div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;flex-wrap:wrap"><strong>Neue Zugangsdaten · ${escapeHtml(k.name)}</strong><button class="btn btn-sekundaer btn-klein" type="button" id="drucken">🖨 Drucken</button></div>
      <table class="bericht-tabelle"><thead><tr><th>Name (von Hand eintragen)</th><th>Pseudonym</th><th>Passwort</th></tr></thead><tbody>${accounts.map((a) => `<tr><td style="min-width:10rem"></td><td><code>${escapeHtml(a.pseudonym)}</code></td><td><code>${escapeHtml(a.passwort)}</code></td></tr>`).join('')}</tbody></table>
      <p style="font-size:0.85rem;margin:0.5rem 0 0">Die Passwörter werden nur hier gezeigt. Beim ersten Anmelden sollten die Lernenden sie unter „Ich“ ändern.</p></div>`;
    el.querySelector('#drucken').addEventListener('click', () => window.print());
  }

  app.querySelector('#neu').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = app.querySelector('#klasse-name').value.trim();
    if (!name) return;
    try {
      await klasseAnlegen(name);
      app.querySelector('#klasse-name').value = '';
      await ladeKlassen();
    } catch (err) {
      toast({ titel: 'Fehler', text: err.message, icon: '⚠️', art: 'fehler' });
    }
  });
  app.querySelector('#pw').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await passwortAendern(app.querySelector('#pw-alt').value, app.querySelector('#pw-neu').value);
      toast({ titel: 'Passwort geändert', text: 'Beim nächsten Anmelden gilt das neue.', icon: '✅', art: 'ok' });
      e.target.reset();
    } catch (err) {
      toast({ titel: 'Fehler', text: err.message, icon: '⚠️', art: 'fehler' });
    }
  });

  async function ladeLehrer() {
    const el = app.querySelector('#lehrer-liste');
    if (!el) return;
    try {
      const d = await lehrkraefte();
      el.innerHTML = (d.lehrkraefte || []).map((l) => `<div class="klasse-eintrag" style="cursor:default"><strong>${escapeHtml(l.pseudonym)}</strong><small>${l.rolle} · ${l.klassen} Klassen</small>${l.rolle !== 'admin' ? `<button class="btn btn-geist btn-klein lehrer-weg" type="button" data-id="${l.id}">✕</button>` : ''}</div>`).join('') || '<p style="color:var(--muted);font-size:0.9rem">Noch keine Lehrkräfte.</p>';
      el.querySelectorAll('.lehrer-weg').forEach((b) => b.addEventListener('click', async () => {
        if (!confirm('Lehrkraft-Account löschen? Die Klassen bleiben bestehen.')) return;
        await lehrkraftLoeschen(b.dataset.id).catch(() => {});
        ladeLehrer();
      }));
    } catch {
      el.innerHTML = '';
    }
  }
  app.querySelector('#lehrer-neu')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await lehrkraftAnlegen(app.querySelector('#lehrer-name').value.trim(), app.querySelector('#lehrer-pw').value);
      e.target.reset();
      ladeLehrer();
    } catch (err) {
      toast({ titel: 'Fehler', text: err.message, icon: '⚠️', art: 'fehler' });
    }
  });

  await ladeKlassen();
  await ladeLehrer();
}
