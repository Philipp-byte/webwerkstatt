// Acht Meilensteine auf dem Weg durch Hyperia. Die Bedingungen werten den Spielstand
// aus; `ctx` liefert das auslösende Ereignis.

const RUNENMARK = ['02-html-erste-schritte', '03-text', '04-listen', '05-links', '06-bilder-und-medien', '07-tabellen', '08-struktur-und-attribute', '09-formulare'];
const KASKADIA = ['10-css-grundlagen', '11-selektoren', '12-schrift-und-text', '13-box-modell', '14-flexbox', '15-recht-im-web'];
const FUNKENLAND = ['16-javascript-start', '17-javascript-dom'];
const befreit = (s, ids) => ids.every((id) => s.boss[id]?.passed);

export const MEILENSTEINE = [
  { id: 'quelle', icon: '🌊', titel: 'Die Quelle fließt', text: 'Quellgrund befreit – du weißt, wie das Netz fließt.', check: (s) => befreit(s, ['01-wie-das-web-funktioniert']) },
  { id: 'runenmark', icon: '🟧', titel: 'Die Runenmark ist frei', text: 'Alle acht Orte der Runenmark befreit – HTML sitzt.', check: (s) => befreit(s, RUNENMARK) },
  { id: 'kaskadia', icon: '🟦', titel: 'Kaskadia leuchtet', text: 'Alle sechs Orte von Kaskadia befreit – CSS sitzt.', check: (s) => befreit(s, KASKADIA) },
  { id: 'funkenland', icon: '🟨', titel: 'Das Funkenland glüht', text: 'Funkenschmiede und Uhrwerk befreit – JavaScript bewegt die Seite.', check: (s) => befreit(s, FUNKENLAND) },
  { id: 'funkenfest', icon: '🎆', titel: 'Funkenfest', text: 'Seidra besiegt – das Netz hält, die Website geht live.', check: (s) => befreit(s, ['18-showtime']) },
  { id: 'soundcheck-100', icon: '🎚️', titel: 'Hundert Mal sicher', text: '100 Soundcheck-Fragen richtig beantwortet.', check: (s) => (s.stats.soundcheckCorrect || 0) >= 100 },
  { id: 'hinterhalt-50', icon: '⭐', titel: 'Fünfzig Sterne', text: '50 Sterne in Hinterhalten gesammelt.', check: (s) => (s.stats.hinterhaltSterne || 0) >= 50 },
  { id: 'erster-versuch-3', icon: '🥇', titel: 'Beim ersten Mal', text: 'Drei Duelle beim ersten Versuch gewonnen.', check: (s) => Object.values(s.boss).filter((b) => b.ersterVersuch).length >= 3 },
];

export function pruefeMeilensteine(state, ctx) {
  const neu = [];
  for (const a of MEILENSTEINE) {
    if (state.badges[a.id]) continue;
    let ok = false;
    try {
      ok = !!a.check(state, ctx);
    } catch {
      ok = false;
    }
    if (ok) {
      state.badges[a.id] = Date.now();
      neu.push(a);
    }
  }
  return neu;
}
