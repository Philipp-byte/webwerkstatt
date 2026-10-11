// Schulmodus: Spielstand mit dem Server abgleichen. Beim Start wird der gespeicherte
// Spielstand des angemeldeten Accounts geladen; jede Änderung wird gebündelt (2 s)
// an den Server geschickt. Fällt der Server aus, bleibt alles im Browser und wird beim
// nächsten Erfolg nachgereicht.

import { getState, onChange, ersetzeSpielstand } from './store.js';
import { aktuellerNutzer, ladeSpielstand, speichereSpielstand } from './api.js';

let timer = null;
let ausstehend = false;
let laeuft = false;

async function senden() {
  if (laeuft) {
    ausstehend = true;
    return;
  }
  laeuft = true;
  try {
    await speichereSpielstand(getState());
    document.body.classList.remove('sync-fehler');
  } catch {
    document.body.classList.add('sync-fehler');
  } finally {
    laeuft = false;
    if (ausstehend) {
      ausstehend = false;
      senden();
    }
  }
}

export function syncJetzt() {
  clearTimeout(timer);
  return senden();
}

// Liefert true, wenn jemand angemeldet ist (dann ist der Spielstand geladen und der Sync aktiv)
export async function starteSync() {
  const nutzer = aktuellerNutzer();
  if (!nutzer) return false;
  try {
    const d = await ladeSpielstand();
    if (d?.spielstand && typeof d.spielstand === 'object' && Object.keys(d.spielstand).length) ersetzeSpielstand(d.spielstand);
    else await speichereSpielstand(getState());
  } catch {
    document.body.classList.add('sync-fehler');
  }
  onChange(() => {
    clearTimeout(timer);
    timer = setTimeout(senden, 2000);
  });
  window.addEventListener('beforeunload', () => {
    if (timer) {
      clearTimeout(timer);
      const body = JSON.stringify({ spielstand: getState() });
      navigator.sendBeacon?.(new URL('api/progress', document.baseURI).href, new Blob([body], { type: 'application/json' }));
    }
  });
  return true;
}
