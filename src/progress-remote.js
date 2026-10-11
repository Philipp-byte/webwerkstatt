// Schulmodus: Spielstand mit dem Server abgleichen. Beim Start wird der gespeicherte
// Spielstand des angemeldeten Accounts geladen; jede Änderung wird gebündelt (2 s)
// an den Server geschickt. Fällt der Server aus, bleibt alles im Browser und wird beim
// nächsten Erfolg nachgereicht.

import { getState, onChange, ersetzeSpielstand, spielstandLoeschen } from './store.js';
import { aktuellerNutzer, ladeSpielstand, speichereSpielstand } from './api.js';

// Merkt sich, welchem Account der lokale Spielstand gehört. Meldet sich an einem Schulrechner
// jemand anderes an, wird der alte lokale Stand nicht hochgeladen, sondern verworfen.
const KONTO_KEY = 'webwerkstatt2.konto';
let timer = null;
let ausstehend = false;
let laeuft = false;
let gestoppt = false;

function lokalesKonto() {
  try {
    return localStorage.getItem(KONTO_KEY);
  } catch {
    return null;
  }
}

// Beim Abmelden: Sync anhalten, lokalen Spielstand verwerfen
export function spielstandLokalVergessen() {
  gestoppt = true;
  clearTimeout(timer);
  timer = null;
  spielstandLoeschen();
  try {
    localStorage.removeItem(KONTO_KEY);
  } catch {
    /* egal */
  }
}

async function senden() {
  if (gestoppt) return;
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
  const konto = String(nutzer.id);
  try {
    const d = await ladeSpielstand();
    if (d?.spielstand && typeof d.spielstand === 'object' && Object.keys(d.spielstand).length) ersetzeSpielstand(d.spielstand);
    else {
      // Noch nichts auf dem Server: eigenen lokalen Stand hochladen, fremden verwerfen
      if (lokalesKonto() !== konto) spielstandLoeschen();
      await speichereSpielstand(getState());
    }
    try {
      localStorage.setItem(KONTO_KEY, konto);
    } catch {
      /* egal */
    }
  } catch {
    document.body.classList.add('sync-fehler');
  }
  onChange(() => {
    if (gestoppt) return;
    clearTimeout(timer);
    timer = setTimeout(senden, 2000);
  });
  window.addEventListener('beforeunload', () => {
    if (timer && !gestoppt) {
      clearTimeout(timer);
      const body = JSON.stringify({ spielstand: getState() });
      navigator.sendBeacon?.(new URL('api/progress', document.baseURI).href, new Blob([body], { type: 'application/json' }));
    }
  });
  return true;
}
