// Dünner fetch()-Wrapper für alle Server-API-Aufrufe (Schulmodus).
// Gemeinsam genutzt von progress-remote.js, login-, teacher- und admin-view.
//
// Pfade werden RELATIV übergeben (z. B. 'api/me') und über document.baseURI
// aufgelöst – wichtig, weil die App auf GitHub Pages unter /webwerkstatt/
// liegt, auf dem Schulserver aber unter /.

export async function api(pfad, options = {}) {
  const res = await fetch(new URL(pfad, document.baseURI), {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Serverfehler (${res.status})`);
  }
  return res.json();
}
