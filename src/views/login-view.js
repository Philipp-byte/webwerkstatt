// Anmeldung im Schulmodus: Pseudonym und Passwort (von der Lehrkraft ausgegeben).

import { anmelden, istSchulmodus } from '../api.js';
import { escapeHtml } from '../engine/markdown.js';
import { sigilSvg } from '../engine/sigil.js';
import { sound } from '../gamification/sound.js';

export async function renderLogin(app) {
  if (!istSchulmodus()) {
    app.innerHTML = `<div class="lektion-seite"><div class="karte gesperrt-karte"><h2>Kein Schulserver</h2><p>Diese Fassung läuft ohne Konto: Dein Spielstand bleibt im Browser. <a href="#/">Nach Hyperia</a></p></div></div>`;
    return;
  }
  app.innerHTML = `
    <div class="login-seite auftritt">
      <div class="karte login-karte">
        <div class="login-kopf">${sigilSvg('funke', { groesse: 64 })}<div><span class="chip chip-gold">Schulmodus</span><h1>Anmelden</h1></div></div>
        <p style="color:var(--ink-2)">Dein Pseudonym und das Passwort hast du von deiner Lehrkraft bekommen. Dein Spielstand wird auf dem Schulserver gespeichert und ist an jedem Rechner da.</p>
        <form id="form" autocomplete="off">
          <label>Pseudonym<input id="pseudonym" type="text" autocapitalize="off" autocomplete="username" required></label>
          <label>Passwort<input id="passwort" type="password" autocomplete="current-password" required></label>
          <div class="rueckmeldung rueckmeldung-fehler" id="fehler" hidden></div>
          <div class="schritt-buttons"><button class="btn btn-primaer btn-gross" type="submit" id="los">Anmelden →</button></div>
        </form>
      </div>
    </div>`;
  const form = app.querySelector('#form');
  const fehler = app.querySelector('#fehler');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    fehler.hidden = true;
    const los = app.querySelector('#los');
    los.disabled = true;
    try {
      await anmelden(app.querySelector('#pseudonym').value.trim(), app.querySelector('#passwort').value);
      sound.fanfare();
      // Ohne Hash neu laden: beim ersten Start dieses Accounts läuft dann der Vorspann, sonst die Karte
      history.replaceState(null, '', location.pathname + location.search);
      location.reload();
    } catch (err) {
      fehler.hidden = false;
      fehler.textContent = escapeHtml(err.message || 'Anmeldung fehlgeschlagen.');
      los.disabled = false;
    }
  });
  setTimeout(() => app.querySelector('#pseudonym')?.focus(), 200);
}
