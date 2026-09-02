// Admin-Bereich: Lehrer-/Admin-Accounts verwalten, Schulname setzen
// (erscheint auf dem Login-Bildschirm).

import { api } from '../api.js';
import { logout } from '../progress-remote.js';

export async function renderAdminDashboard(app, me) {
  const dash = new AdminDashboard(app, me);
  await dash.start();
}

class AdminDashboard {
  constructor(app, me) {
    this.app = app;
    this.me = me;
  }

  async start() {
    const [teachers, settings] = await Promise.all([
      api('api/admin/teachers'),
      api('api/admin/settings'),
    ]);
    this.teachers = teachers;
    this.settings = settings;
    this.render();
  }

  render() {
    this.app.innerHTML = `
      <div class="dashboard-kopf">
        <h1>Admin-Bereich</h1>
        <div class="dashboard-kopf-rechts">
          <span class="dashboard-wer">${escapeHtml(this.me.pseudonym)}</span>
          <button class="btn btn-sekundaer abmelde-btn" type="button">Abmelden</button>
        </div>
      </div>
      <div class="dashboard dashboard-einspaltig">
        <div class="panel">
          <div class="panel-kopf">
            <h3>Lehrer- &amp; Admin-Accounts</h3>
            <form class="neuer-lehrer-formular">
              <input type="text" name="pseudonym" placeholder="Benutzername" aria-label="Benutzername" required>
              <input type="password" name="password" placeholder="Passwort" aria-label="Passwort" minlength="4" required>
              <select name="role" aria-label="Rolle">
                <option value="teacher">Lehrkraft</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" class="btn btn-primaer">+ Anlegen</button>
            </form>
          </div>
          <p class="formular-meldung" hidden></p>
          <div class="tabelle-scroll">
            <table class="uebersicht-tabelle">
              <thead><tr><th>Benutzername</th><th>Rolle</th><th>Zuletzt aktiv</th><th></th></tr></thead>
              <tbody>
                ${this.teachers
                  .map(
                    (t) => `
                  <tr data-id="${t.id}">
                    <td>${escapeHtml(t.pseudonym)}</td>
                    <td>${t.role === 'admin' ? 'Admin' : 'Lehrkraft'}</td>
                    <td>${t.lastActive ? formatDatum(t.lastActive) : '–'}</td>
                    <td class="tabelle-aktionen">
                      <button type="button" class="btn btn-sekundaer btn-klein btn-passwort" title="Passwort zurücksetzen" aria-label="Passwort von ${escapeHtml(t.pseudonym)} zurücksetzen">🔑</button>
                      ${t.id === this.me.id ? '' : `<button type="button" class="btn btn-sekundaer btn-klein btn-loeschen" title="Account löschen" aria-label="Account ${escapeHtml(t.pseudonym)} löschen">🗑</button>`}
                    </td>
                  </tr>`
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel">
          <h3>Schule</h3>
          <form class="einstellungen-formular">
            <label>Schulname (erscheint auf dem Login-Bildschirm)
              <input type="text" name="schoolName" value="${escapeHtml(this.settings.schoolName)}">
            </label>
            <button type="submit" class="btn btn-primaer">Speichern</button>
            <p class="einstellungen-meldung" hidden></p>
          </form>
        </div>
      </div>
    `;

    this.wire();
  }

  wire() {
    this.app.querySelector('.abmelde-btn').onclick = async () => {
      try {
        await logout();
      } catch {}
      location.reload();
    };

    const meldung = this.app.querySelector('.formular-meldung');
    const neuerLehrerForm = this.app.querySelector('.neuer-lehrer-formular');
    neuerLehrerForm.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(neuerLehrerForm);
      try {
        await api('api/admin/teachers', {
          method: 'POST',
          body: JSON.stringify({
            pseudonym: fd.get('pseudonym'),
            password: fd.get('password'),
            role: fd.get('role'),
          }),
        });
        await this.start();
      } catch {
        meldung.hidden = false;
        meldung.textContent = 'Anlegen fehlgeschlagen – ist der Benutzername schon vergeben?';
      }
    };

    this.app.querySelectorAll('.btn-passwort').forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.closest('tr').dataset.id;
        const neuesPasswort = prompt('Neues Passwort eingeben (mindestens 4 Zeichen):');
        if (!neuesPasswort) return;
        try {
          await api(`api/admin/teachers/${id}/reset-password`, {
            method: 'POST',
            body: JSON.stringify({ new_password: neuesPasswort }),
          });
          alert('Passwort geändert.');
        } catch (err) {
          alert(`Passwort konnte nicht geändert werden: ${err.message}`);
        }
      };
    });

    this.app.querySelectorAll('.btn-loeschen').forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.closest('tr').dataset.id;
        if (!confirm('Diesen Account wirklich löschen?')) return;
        await api(`api/admin/teachers/${id}`, { method: 'DELETE' });
        await this.start();
      };
    });

    const einstellungenForm = this.app.querySelector('.einstellungen-formular');
    const einstellungenMeldung = this.app.querySelector('.einstellungen-meldung');
    einstellungenForm.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(einstellungenForm);
      await api('api/admin/settings', {
        method: 'POST',
        body: JSON.stringify({ schoolName: fd.get('schoolName') }),
      });
      einstellungenMeldung.hidden = false;
      einstellungenMeldung.textContent = 'Gespeichert.';
    };
  }
}

function formatDatum(iso) {
  try {
    return new Date(iso.replace(' ', 'T') + 'Z').toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
