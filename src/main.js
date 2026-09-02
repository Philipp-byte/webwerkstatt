// Einstiegspunkt: erkennt Demo- vs. Schulmodus, richtet den Router ein,
// startet die App.
//
// Modus-Erkennung: läuft die Seite unter dem Flask-Server (Schulmodus),
// existiert /api/ping. Auf GitHub Pages (reines Static Hosting, Demo-Modus)
// gibt es diese Route nicht -> automatischer Fallback auf localStorage,
// ohne Build-Unterscheidung. WICHTIG: der Ping läuft über document.baseURI,
// weil die App auf Pages unter /webwerkstatt/ liegt, auf dem Schulserver
// unter /.
//
// Login-/Lehrer-/Admin-Views werden nur bei Bedarf per dynamischem import()
// geladen – die meisten Aufrufe sind Demo-Modus oder Schüler:innen, die
// diese Views nie sehen.

import './styles.css';
import { initRouter } from './router.js';
import { setBackendMode } from './progress.js';
import { loadCurriculum } from './content.js';

const app = document.getElementById('app');

async function detectSchoolMode() {
  try {
    const res = await fetch(new URL('api/ping', document.baseURI), {
      credentials: 'same-origin',
    });
    if (!res.ok) return false;
    // Manche Static-Hosts liefern für unbekannte Pfade die index.html mit
    // Status 200 – deshalb zusätzlich prüfen, ob wirklich unsere API antwortet.
    const data = await res.json().catch(() => null);
    return Boolean(data && data.ok);
  } catch {
    return false;
  }
}

async function boot() {
  app.innerHTML = '<p class="laden">Lade …</p>';

  // Beides gleichzeitig starten statt nacheinander: die Modus-Erkennung ist
  // im Demo-Modus eine 404-Rundreise, die sonst die Ladezeit verlängert.
  // Das Curriculum landet dabei schon im Cache von content.js.
  loadCurriculum().catch(() => {});
  const schulmodus = await detectSchoolMode();

  if (!schulmodus) {
    initRouter();
    return;
  }

  setBackendMode('remote');
  const { whoAmI } = await import('./progress-remote.js');
  const me = await whoAmI();
  if (me) {
    await enterApp(me);
  } else {
    const { renderLogin } = await import('./views/login-view.js');
    await renderLogin(app, { onLoggedIn: enterApp });
  }
}

// Wird sowohl beim direkten Seitenaufruf mit bestehender Sitzung als auch
// direkt nach dem Login-Formular durchlaufen, damit die Rollen-Weiche in
// beiden Fällen greift.
async function enterApp(me) {
  const { whoAmI, loadState } = await import('./progress-remote.js');
  if (!me) me = await whoAmI();
  if (!me) {
    location.reload();
    return;
  }

  if (me.role === 'teacher') {
    const { renderTeacherDashboard } = await import('./views/teacher-view.js');
    await renderTeacherDashboard(app, me);
    return;
  }
  if (me.role === 'admin') {
    const { renderAdminDashboard } = await import('./views/admin-view.js');
    await renderAdminDashboard(app, me);
    return;
  }

  // Schüler:in: Fortschritt vom Server laden, dann die normale App starten.
  await loadState();
  mountLogoutButton(me);
  initRouter();
}

// Kleiner Abmelde-Knopf in der Kopfzeile – wichtig im Computerraum, wo sich
// mehrere SuS einen Rechner teilen. Nur im Schulmodus sichtbar.
function mountLogoutButton(me) {
  const topbar = document.querySelector('.topbar');
  if (!topbar || topbar.querySelector('.topbar-abmelden')) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'topbar-abmelden';
  btn.title = 'Abmelden';
  btn.innerHTML = `<span class="topbar-abmelden-name">${escapeHtml(me.pseudonym)}</span> · Abmelden`;
  btn.addEventListener('click', async () => {
    const { logout } = await import('./progress-remote.js');
    try {
      await logout();
    } catch {
      // Auch bei Netzfehler neu laden – dann greift das Login-Gate erneut.
    }
    location.hash = '';
    location.reload();
  });
  topbar.appendChild(btn);
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

boot();
