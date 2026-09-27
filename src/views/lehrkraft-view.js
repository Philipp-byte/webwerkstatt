// Lehrkraft-Modus: Passwort (SHA-256-Hash in public/content/lehrkraft.json),
// schaltet alle Stationen und Lektionen frei. Ändert keinen Lernstand.

import { loadLehrkraft } from '../content.js';
import { istLehrkraft, setLehrkraft } from '../store.js';
import { toast } from '../gamification/celebrate.js';

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function renderLehrkraft(app) {
  const an = istLehrkraft();
  app.innerHTML = `
    <div class="lektion-seite auftritt">
      <a class="zurueck" href="#/keycard">← Zur Spielerkarte</a>
      <div class="karte" style="margin-top:0.75rem">
        <h1>🔑 Lehrkraft-Modus</h1>
        <p style="color:var(--ink-2)">Schaltet alle Runden, Lektionen und Matches frei – praktisch, um im Unterricht direkt an eine Stelle zu springen. Der Lernstand bleibt unverändert. Das ist ein Sichtschutz, keine Sicherheit: Die App läuft komplett im Browser.</p>
        ${an ? `<p><strong>Der Modus ist aktiv.</strong></p><button class="btn btn-sekundaer" type="button" id="aus">Modus beenden</button>`
          : `<form class="lehrkraft-form" id="form"><input type="password" id="pw" placeholder="Passwort" autocomplete="current-password" aria-label="Passwort"><button class="btn btn-primaer" type="submit">Freischalten</button></form>
             <p style="color:var(--muted);font-size:0.85rem;margin-top:0.75rem">Passwort ändern: <code>node scripts/lehrkraft-passwort.mjs "neues Passwort"</code> – im Repo liegt nur der Hash.</p>`}
      </div>
      <div class="karte sektion">
        <h2>Werkzeuge</h2>
        <ul>
          <li><a href="#/pruefung">Interne Prüfung aller Code-Aufgaben</a> (Lösung besteht, Starter fällt durch)</li>
          <li><a href="#/projekt">FUNKEN-Website</a> · <a href="#/showtime">Showtime</a> · <a href="#/backstage">Trainingslager</a></li>
        </ul>
      </div>
    </div>`;

  if (an) {
    app.querySelector('#aus').addEventListener('click', () => {
      setLehrkraft(false);
      location.hash = '#/';
      location.reload();
    });
    return;
  }
  app.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pw = app.querySelector('#pw').value;
    const { hash } = await loadLehrkraft();
    let eingabe = '';
    try {
      eingabe = await sha256(pw);
    } catch {
      toast({ titel: 'Nicht möglich', text: 'Die Prüfung braucht https oder localhost.', icon: '⚠️', art: 'fehler' });
      return;
    }
    if (hash && eingabe === hash) {
      setLehrkraft(true);
      toast({ titel: 'Lehrkraft-Modus aktiv', icon: '🔓', art: 'ok' });
      setTimeout(() => {
        location.hash = '#/';
        location.reload();
      }, 600);
    } else {
      toast({ titel: 'Falsches Passwort', icon: '🔒', art: 'fehler' });
    }
  });
}
