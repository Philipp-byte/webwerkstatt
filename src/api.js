// Schulmodus: Verbindung zum Server (server/app.py). Im Demo-Modus (GitHub Pages) gibt es
// keinen Server; dann bleibt alles im Browser. Der Modus wird beim Start einmal über
// /api/ping erkannt (siehe main.js).

let modus = null; // 'schule' | 'demo'
let nutzer = null;

const basis = () => new URL('api/', document.baseURI).href.replace(/\/$/, '');

export async function erkenneModus() {
  if (modus) return modus;
  try {
    const res = await fetch(`${basis()}/ping`, { credentials: 'same-origin' });
    if (res.ok) {
      const d = await res.json();
      modus = d?.modus === 'schule' ? 'schule' : 'demo';
      nutzer = d?.nutzer || null;
    } else modus = 'demo';
  } catch {
    modus = 'demo';
  }
  return modus;
}

export function istSchulmodus() {
  return modus === 'schule';
}

export function aktuellerNutzer() {
  return nutzer;
}

async function anfrage(pfad, { method = 'GET', body = null } = {}) {
  const res = await fetch(`${basis()}${pfad}`, {
    method,
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : null,
  });
  const daten = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(daten.fehler || `Server antwortet mit ${res.status}`);
  return daten;
}

export async function anmelden(pseudonym, passwort) {
  const d = await anfrage('/login', { method: 'POST', body: { pseudonym, passwort } });
  nutzer = d.nutzer;
  return nutzer;
}

export async function abmelden() {
  await anfrage('/logout', { method: 'POST' }).catch(() => {});
  nutzer = null;
}

export const ladeSpielstand = () => anfrage('/progress');
export const speichereSpielstand = (spielstand) => anfrage('/progress', { method: 'PUT', body: { spielstand } });
export const passwortAendern = (alt, neu) => anfrage('/password', { method: 'POST', body: { alt, neu } });

// Lehrkraft
export const klassen = () => anfrage('/teacher/classes');
export const klasseAnlegen = (name) => anfrage('/teacher/classes', { method: 'POST', body: { name } });
export const accountsErzeugen = (klasseId, anzahl) => anfrage(`/teacher/classes/${klasseId}/accounts`, { method: 'POST', body: { anzahl } });
export const klassenFortschritt = (klasseId) => anfrage(`/teacher/classes/${klasseId}/progress`);
export const passwortZuruecksetzen = (userId) => anfrage(`/teacher/users/${userId}/reset`, { method: 'POST' });
export const klasseLoeschen = (klasseId) => anfrage(`/teacher/classes/${klasseId}`, { method: 'DELETE' });

// Admin
export const lehrkraefte = () => anfrage('/admin/teachers');
export const lehrkraftAnlegen = (pseudonym, passwort) => anfrage('/admin/teachers', { method: 'POST', body: { pseudonym, passwort } });
export const lehrkraftLoeschen = (userId) => anfrage(`/admin/teachers/${userId}`, { method: 'DELETE' });
