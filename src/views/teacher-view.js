// Lehrer-Dashboard: Klassen anlegen/löschen, Schüler-Accounts generieren
// (druckbare Zugangsdaten-Liste), Fortschritt der Klasse einsehen
// (erledigte Lektionen mit CSS-Fortschrittsbalken – bewusst ohne Diagramm-
// Bibliothek), Kapitel sperren/freischalten.

import { api } from '../api.js';
import { logout } from '../progress-remote.js';

export async function renderTeacherDashboard(app, me) {
  const dash = new TeacherDashboard(app, me);
  await dash.start();
}

class TeacherDashboard {
  constructor(app, me) {
    this.app = app;
    this.me = me;
    this.classes = [];
    this.selectedClassId = null;
    // Frisch generierte Zugangsdaten: werden NACH dem nächsten renderDetail()
    // angezeigt (erst Detail rendern, dann Liste – sonst überschreibt das
    // Neu-Rendern die Passwort-Liste sofort wieder).
    this.neueZugangsdaten = null;
  }

  async start() {
    await this.loadClasses();
    this.render();
  }

  async loadClasses() {
    this.classes = await api('api/teacher/classes');
    if (!this.selectedClassId && this.classes.length) {
      this.selectedClassId = this.classes[0].id;
    }
  }

  render() {
    this.app.innerHTML = `
      <div class="dashboard-kopf">
        <h1>Lehrkraft-Bereich</h1>
        <div class="dashboard-kopf-rechts">
          <span class="dashboard-wer">${escapeHtml(this.me.pseudonym)}</span>
          <button class="btn btn-sekundaer abmelde-btn" type="button">Abmelden</button>
        </div>
      </div>
      <div class="dashboard">
        <aside class="klassen-liste">
          <h2>Meine Klassen</h2>
          <ul class="klassen-liste-eintraege"></ul>
          <form class="neue-klasse-formular">
            <input type="text" name="name" placeholder="Neue Klasse …" aria-label="Name der neuen Klasse" required>
            <button type="submit" class="btn btn-primaer">+ Anlegen</button>
          </form>
        </aside>
        <section class="klassen-detail"></section>
      </div>
    `;

    this.app.querySelector('.abmelde-btn').onclick = async () => {
      try {
        await logout();
      } catch {}
      location.reload();
    };

    const listEl = this.app.querySelector('.klassen-liste-eintraege');
    listEl.innerHTML = this.classes
      .map(
        (c) => `
        <li>
          <button type="button" class="klassen-eintrag${c.id === this.selectedClassId ? ' klassen-eintrag-aktiv' : ''}" data-id="${c.id}">
            <span>${escapeHtml(c.name)}</span>
            <span class="klassen-eintrag-anzahl">${c.studentCount} SuS</span>
          </button>
        </li>`
      )
      .join('') || '<li class="klassen-liste-leer">Noch keine Klasse angelegt.</li>';

    listEl.querySelectorAll('.klassen-eintrag').forEach((btn) => {
      btn.onclick = () => {
        this.selectedClassId = Number(btn.dataset.id);
        this.render();
      };
    });

    const neueKlasseForm = this.app.querySelector('.neue-klasse-formular');
    neueKlasseForm.onsubmit = async (e) => {
      e.preventDefault();
      const name = new FormData(neueKlasseForm).get('name');
      const created = await api('api/teacher/classes', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      await this.loadClasses();
      this.selectedClassId = created.id;
      this.render();
    };

    this.renderDetail();
  }

  async renderDetail() {
    const section = this.app.querySelector('.klassen-detail');
    if (!this.selectedClassId) {
      section.innerHTML = '<p class="leer-hinweis">Lege links eine Klasse an, um loszulegen.</p>';
      return;
    }

    section.innerHTML = '<p class="leer-hinweis">Lädt …</p>';
    const [schuelerDaten, kapitel] = await Promise.all([
      api(`api/teacher/classes/${this.selectedClassId}/students`),
      api(`api/teacher/classes/${this.selectedClassId}/chapters`),
    ]);
    const cls = this.classes.find((c) => c.id === this.selectedClassId);

    const zeilen = schuelerDaten.students
      .map((s) => {
        const prozent = s.totalLessons
          ? Math.round((s.lessonsDone / s.totalLessons) * 100)
          : 0;
        return `
          <tr data-id="${s.id}">
            <td>${escapeHtml(s.pseudonym)}</td>
            <td class="tabelle-zahl">${s.lessonsDone}/${s.totalLessons}</td>
            <td class="tabelle-balken">
              <div class="balken" role="img" aria-label="${prozent} Prozent erledigt">
                <div class="balken-fuellung" style="width:${prozent}%"></div>
              </div>
            </td>
            <td>${s.lastActive ? formatDatum(s.lastActive) : '–'}</td>
            <td class="tabelle-aktionen">
              <button type="button" class="btn btn-sekundaer btn-klein btn-passwort" title="Passwort zurücksetzen" aria-label="Passwort von ${escapeHtml(s.pseudonym)} zurücksetzen">🔑</button>
              <button type="button" class="btn btn-sekundaer btn-klein btn-loeschen" title="Account löschen" aria-label="Account ${escapeHtml(s.pseudonym)} löschen">🗑</button>
            </td>
          </tr>`;
      })
      .join('');

    section.innerHTML = `
      <div class="detail-kopf">
        <h2>${escapeHtml(cls.name)}</h2>
        <button type="button" class="btn btn-sekundaer btn-klasse-loeschen">Klasse löschen</button>
      </div>

      <div class="stat-zeile">
        <div class="stat"><span class="stat-zahl">${schuelerDaten.students.length}</span><span class="stat-label">SuS</span></div>
        <div class="stat"><span class="stat-zahl">${schuelerDaten.avgDone}</span><span class="stat-label">Ø erledigte Lektionen</span></div>
        <div class="stat"><span class="stat-zahl">${schuelerDaten.totalLessons}</span><span class="stat-label">Lektionen gesamt</span></div>
      </div>

      <div class="panel">
        <div class="panel-kopf">
          <h3>Accounts</h3>
          <form class="generieren-formular">
            <input type="number" name="count" min="1" max="40" value="5" aria-label="Anzahl neuer Accounts">
            <button type="submit" class="btn btn-primaer">Accounts generieren</button>
          </form>
        </div>
        <div class="zugangsdaten" hidden></div>
        <div class="tabelle-scroll">
          <table class="uebersicht-tabelle">
            <thead>
              <tr><th>Benutzername</th><th>Erledigt</th><th>Fortschritt</th><th>Zuletzt aktiv</th><th></th></tr>
            </thead>
            <tbody>
              ${zeilen || '<tr><td colspan="5" class="leer-hinweis">Noch keine Schüler:innen – oben Accounts generieren.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel">
        <h3>Kapitel freischalten</h3>
        <p class="panel-hinweis">Abgehakte Kapitel sind für diese Klasse offen. Gesperrte Kapitel erscheinen bei den SuS mit 🔒.</p>
        <div class="kapitel-schalter">
          ${kapitel
            .map(
              (ch) => `
            <label class="kapitel-schalter-eintrag">
              <input type="checkbox" data-chapter="${ch.id}" ${ch.locked ? '' : 'checked'}>
              <span>${escapeHtml(ch.title)}</span>
            </label>`
            )
            .join('')}
        </div>
      </div>
    `;

    this.wireDetail(section);

    if (this.neueZugangsdaten) {
      renderZugangsdaten(section.querySelector('.zugangsdaten'), this.neueZugangsdaten);
      this.neueZugangsdaten = null;
    }
  }

  wireDetail(section) {
    section.querySelector('.btn-klasse-loeschen').onclick = async () => {
      if (!confirm('Klasse wirklich löschen? Die Schüler-Accounts bleiben erhalten, verlieren aber ihre Klassen-Zuordnung.')) return;
      await api(`api/teacher/classes/${this.selectedClassId}`, { method: 'DELETE' });
      this.selectedClassId = null;
      await this.loadClasses();
      this.render();
    };

    const generierenForm = section.querySelector('.generieren-formular');
    generierenForm.onsubmit = async (e) => {
      e.preventDefault();
      const count = Number(new FormData(generierenForm).get('count'));
      const result = await api(`api/teacher/classes/${this.selectedClassId}/students/generate`, {
        method: 'POST',
        body: JSON.stringify({ count }),
      });
      // Erst die Ansicht neu aufbauen (aktualisierte Liste), DANACH die
      // Passwörter anzeigen – renderDetail() zeigt this.neueZugangsdaten
      // ganz am Ende an, damit nichts sie wieder überschreibt.
      this.neueZugangsdaten = result.created;
      await this.loadClasses();
      this.render();
    };

    section.querySelectorAll('.btn-passwort').forEach((btn) => {
      btn.onclick = async () => {
        const studentId = btn.closest('tr').dataset.id;
        const result = await api(`api/teacher/students/${studentId}/reset-password`, {
          method: 'POST',
        });
        renderZugangsdaten(section.querySelector('.zugangsdaten'), [result]);
      };
    });

    section.querySelectorAll('.btn-loeschen').forEach((btn) => {
      btn.onclick = async () => {
        const studentId = btn.closest('tr').dataset.id;
        if (!confirm('Diesen Account wirklich löschen? Das kann nicht rückgängig gemacht werden.')) return;
        await api(`api/teacher/students/${studentId}`, { method: 'DELETE' });
        await this.renderDetail();
      };
    });

    section.querySelectorAll('.kapitel-schalter input').forEach((checkbox) => {
      checkbox.onchange = async () => {
        await api(
          `api/teacher/classes/${this.selectedClassId}/chapters/${checkbox.dataset.chapter}/lock`,
          { method: 'POST', body: JSON.stringify({ locked: !checkbox.checked }) }
        );
      };
    });
  }

}

function renderZugangsdaten(container, created) {
  if (!container) return;
  container.hidden = false;
  container.innerHTML = `
    <div class="zugangsdaten-karte">
      <div class="zugangsdaten-kopf kein-druck">
        <strong>Neue Zugangsdaten – jetzt drucken oder notieren, sie werden nicht erneut angezeigt!</strong>
        <button type="button" class="btn btn-sekundaer btn-drucken">🖨 Drucken</button>
      </div>
      <table class="zugangsdaten-tabelle">
        <thead><tr><th>Benutzername</th><th>Passwort</th></tr></thead>
        <tbody>
          ${created.map((c) => `<tr><td>${escapeHtml(c.pseudonym)}</td><td>${escapeHtml(c.password)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
  container.querySelector('.btn-drucken').onclick = () => window.print();
}

function formatDatum(iso) {
  try {
    return new Date(iso.replace(' ', 'T') + 'Z').toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
