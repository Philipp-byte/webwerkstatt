// Abzeichen: Können (Inhalt) und Verhalten (Gewohnheiten). Die Bedingungen
// werten den Zustand aus dem Store aus; `ctx` liefert das auslösende Ereignis.

export const ABZEICHEN = [
  { id: 'erste-zeile', icon: '⌨️', titel: 'Erste Zeile', text: 'Deine erste Code-Aufgabe bestanden.', check: (s) => s.stats.codePassed >= 1 },
  { id: 'fundament', icon: '🧱', titel: 'Fundament', text: 'Kapitel 02 abgeschlossen – das Gerüst steht.', check: (s, c) => c.kapitelFertig?.('02-html-erste-schritte') },
  { id: 'listenmeister', icon: '📋', titel: 'Listenmeister', text: 'Kapitel 04 abgeschlossen.', check: (s, c) => c.kapitelFertig?.('04-listen') },
  { id: 'wegweiser', icon: '🧭', titel: 'Wegweiser', text: 'Kapitel 05 abgeschlossen – alles verlinkt.', check: (s, c) => c.kapitelFertig?.('05-links') },
  { id: 'html-crew', icon: '🟧', titel: 'HTML-Crew', text: 'Alle HTML-Kapitel (02–09) abgeschlossen.', check: (s, c) => ['02-html-erste-schritte','03-text','04-listen','05-links','06-bilder-und-medien','07-tabellen','08-struktur-und-attribute','09-formulare'].every((k) => c.kapitelFertig?.(k)) },
  { id: 'lichtpult', icon: '🎨', titel: 'Lichtpult', text: 'Kapitel 10 abgeschlossen – erste Styles.', check: (s, c) => c.kapitelFertig?.('10-css-grundlagen') },
  { id: 'css-crew', icon: '🟦', titel: 'CSS-Crew', text: 'Alle CSS-Kapitel (10–15) abgeschlossen.', check: (s, c) => ['10-css-grundlagen','11-selektoren','12-schrift-und-text','13-box-modell','14-flexbox','15-recht-im-web'].every((k) => c.kapitelFertig?.(k)) },
  { id: 'js-crew', icon: '🟨', titel: 'JS-Crew', text: 'Beide JavaScript-Kapitel abgeschlossen.', check: (s, c) => ['16-javascript-start','17-javascript-dom'].every((k) => c.kapitelFertig?.(k)) },
  { id: 'showtime', icon: '🎆', titel: 'Showtime', text: 'Das Finale erreicht – FUNKEN geht online.', check: (s, c) => c.kapitelFertig?.('18-showtime') },
  { id: 'ohne-netz', icon: '🪢', titel: 'Ohne Netz', text: 'Eine Lektion mit 3 Sternen: kein Fehler, kein Tipp.', check: (s) => Object.values(s.lessons).some((l) => l.stars === 3) },
  { id: 'perfektionist', icon: '🌟', titel: 'Perfektionist', text: 'Zehn Lektionen mit 3 Sternen.', check: (s) => Object.values(s.lessons).filter((l) => l.stars === 3).length >= 10 },
  { id: 'sternenhimmel', icon: '✨', titel: 'Sternenhimmel', text: '100 Sterne gesammelt.', check: (s) => Object.values(s.lessons).reduce((a, l) => a + (l.stars || 0), 0) >= 100 },
  { id: 'abnahme', icon: '✅', titel: 'Abgenommen', text: 'Erste Abnahme bestanden.', check: (s) => Object.values(s.boss).some((b) => b.passed) },
  { id: 'abnahme-perfekt', icon: '💯', titel: 'Fehlerfreie Abnahme', text: 'Eine Abnahme mit 100 % bestanden.', check: (s) => Object.values(s.boss).some((b) => b.best >= 1) },
  { id: 'serie-10', icon: '🔥', titel: 'Serie 10', text: 'Zehn richtige Antworten am Stück.', check: (s) => s.stats.longestCombo >= 10 },
  { id: 'serie-25', icon: '🌋', titel: 'Serie 25', text: '25 richtige Antworten am Stück.', check: (s) => s.stats.longestCombo >= 25 },
  { id: 'comeback', icon: '💪', titel: 'Comeback', text: 'Eine Aufgabe nach drei Fehlversuchen doch geschafft.', check: (s, c) => c.ereignis === 'comeback' || s.stats.comebacks >= 1 },
  { id: 'kaeferjaeger', icon: '🐞', titel: 'Käferjäger', text: 'Fehlerjagd: eine Runde mit 8 von 8.', check: (s) => (s.backstage.highscores.jagd || 0) >= 8 },
  { id: 'sprinter', icon: '⚡', titel: 'Sprinter', text: 'Blitzrunde: 15 richtige Antworten in 60 Sekunden.', check: (s) => (s.backstage.highscores.blitz || 0) >= 15 },
  { id: 'buehnenbauer', icon: '🏗️', titel: 'Bühnenbauer', text: 'Bühnenaufbau: 5 Runden ohne Fehler.', check: (s) => (s.backstage.highscores.aufbau || 0) >= 5 },
  { id: 'soundcheck-profi', icon: '🎚️', titel: 'Soundcheck-Profi', text: '30 Soundcheck-Fragen richtig.', check: (s) => s.stats.soundcheckCorrect >= 30 },
  { id: 'gedaechtnis', icon: '🧠', titel: 'Langzeitgedächtnis', text: '20 Konzepte sicher (Box 4 oder höher).', check: (s) => Object.values(s.leitner).filter((k) => k.box >= 4).length >= 20 },
  { id: 'backup-profi', icon: '💾', titel: 'Backup-Profi', text: 'Spielstand als Datei gesichert.', check: (s) => s.stats.exports >= 1 },
  { id: 'nachtschicht', icon: '🌙', titel: 'Nachtschicht', text: 'Eine Lektion nach 21 Uhr abgeschlossen.', check: (s, c) => c.ereignis === 'lektion' && new Date().getHours() >= 21 },
  { id: 'fruehschicht', icon: '🌅', titel: 'Frühschicht', text: 'Eine Lektion vor 7:30 Uhr abgeschlossen.', check: (s, c) => c.ereignis === 'lektion' && (new Date().getHours() < 7 || (new Date().getHours() === 7 && new Date().getMinutes() < 30)) },
  { id: 'level-10', icon: '🔟', titel: 'Level 10', text: 'Level 10 erreicht.', check: (s, c) => c.level >= 10 },
  { id: 'level-25', icon: '🚀', titel: 'Level 25', text: 'Level 25 erreicht.', check: (s, c) => c.level >= 25 },
  { id: 'eigene-website', icon: '🌐', titel: 'Meine Website', text: 'Alle Pflicht-Kriterien der eigenen Website erfüllt.', check: (s) => s.showtime?.pflichtErfuellt === true },
];

export function pruefeAbzeichen(state, ctx) {
  const neu = [];
  for (const a of ABZEICHEN) {
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
