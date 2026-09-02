// Login-Bildschirm für den Schulmodus (Pseudonym + Passwort).
// Wird nur angezeigt, wenn ein Server erkannt wurde und noch keine
// gültige Sitzung besteht – siehe main.js (detectSchoolMode).

import { login } from '../progress-remote.js';
import { api } from '../api.js';

export async function renderLogin(app, { onLoggedIn }) {
  let schulname = '';
  try {
    ({ schoolName: schulname } = await api('api/settings/public'));
  } catch {
    // Kein Problem, dann bleibt der generische Untertitel stehen.
  }

  app.innerHTML = `
    <div class="login-seite">
      <div class="login-karte">
        <div class="login-logo">🧰</div>
        <h1>WebWerkstatt</h1>
        <p class="login-untertitel">${schulname ? escapeHtml(schulname) : 'Schulmodus – bitte anmelden'}</p>
        <form class="login-formular">
          <label>Benutzername
            <input type="text" name="pseudonym" autocomplete="username" required autofocus>
          </label>
          <label>Passwort
            <input type="password" name="password" autocomplete="current-password" required>
          </label>
          <button type="submit" class="btn btn-primaer">Anmelden</button>
          <p class="login-fehler" hidden></p>
        </form>
      </div>
    </div>
  `;

  const form = app.querySelector('.login-formular');
  const fehlerEl = form.querySelector('.login-fehler');
  const submitBtn = form.querySelector('button');

  form.onsubmit = async (e) => {
    e.preventDefault();
    fehlerEl.hidden = true;
    submitBtn.disabled = true;
    const fd = new FormData(form);
    try {
      const me = await login(fd.get('pseudonym'), fd.get('password'));
      await onLoggedIn(me);
    } catch {
      fehlerEl.hidden = false;
      fehlerEl.textContent = 'Anmeldung fehlgeschlagen. Bitte Benutzername und Passwort prüfen.';
      submitBtn.disabled = false;
    }
  };
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
