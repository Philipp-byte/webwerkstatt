// Der Ablauf einer Runde: Anpfiff → Lektionen (mit Crew-Funk nach einer bestimmten
// Lektion) → Match → Abpfiff. Liefert für Kapitel- und Startseite dieselbe Liste
// mit Status (erledigt / naechste / offen / gesperrt), damit „Weiter“ überall
// auf denselben nächsten Schritt zeigt.

import { loadLesson, loadBoss, loadSzenen } from '../content.js';
import { getState, istLehrkraft } from '../store.js';
import { lektionFrei, abnahmeFrei, kapitelStand } from '../progress.js';

export const SZENEN_INFO = {
  anpfiff: { titel: 'Anpfiff', icon: '📣', untertitel: 'Spähbericht: den Fehler der Gegner-Crew erkennen' },
  funk: { titel: 'Crew-Funk', icon: '📻', untertitel: 'Lagebesprechung aus Halle 7 – kurze Aufgabe' },
  abpfiff: { titel: 'Abpfiff', icon: '🏁', untertitel: 'Trophäenkarte: Fehler und Regel der Gegner' },
};

function lektionsArt(id) {
  if (id.includes('wiederholung')) return 'Wiederholung';
  if (id.includes('projekt')) return 'Meilenstein';
  if (id.includes('eigene-website')) return 'Finale';
  return 'Lektion';
}

export async function ablaufFuer(kapitel, { kapitelIstFrei = true } = {}) {
  const s = getState();
  const [szenenAlle, boss] = await Promise.all([loadSzenen(), loadBoss(kapitel.id)]);
  const szenen = szenenAlle.runden?.[kapitel.id] || {};
  const titel = await Promise.all(kapitel.lessons.map((l) => loadLesson(kapitel.id, l).then((x) => x.title).catch(() => l)));
  const stand = kapitelStand(kapitel);
  const gesehen = (art) => !!s.story.gesehen[`${art}:${kapitel.id}`];
  const eintraege = [];

  if (szenen.anpfiff) {
    eintraege.push({ art: 'szene', id: 'anpfiff', href: `#/szene/${kapitel.id}/anpfiff`, titel: SZENEN_INFO.anpfiff.titel, untertitel: SZENEN_INFO.anpfiff.untertitel, icon: SZENEN_INFO.anpfiff.icon, erledigt: gesehen('anpfiff'), frei: kapitelIstFrei, optional: true });
  }
  kapitel.lessons.forEach((l, i) => {
    const eintrag = s.lessons[`${kapitel.id}/${l}`];
    const frei = kapitelIstFrei && lektionFrei(kapitel, l, true);
    eintraege.push({ art: 'lektion', id: l, nr: i + 1, href: `#/lektion/${kapitel.id}/${l}`, titel: titel[i], untertitel: lektionsArt(l), erledigt: !!eintrag?.done, frei, stars: eintrag?.stars || 0, versuche: eintrag?.versuche || 0 });
    if (szenen.funk && szenen.funk.nach === l) {
      eintraege.push({ art: 'szene', id: 'funk', href: `#/szene/${kapitel.id}/funk`, titel: SZENEN_INFO.funk.titel, untertitel: SZENEN_INFO.funk.untertitel, icon: SZENEN_INFO.funk.icon, erledigt: gesehen('funk'), frei: kapitelIstFrei && (!!eintrag?.done || istLehrkraft()), optional: true });
    }
  });
  if (boss) {
    eintraege.push({ art: 'match', id: 'match', href: `#/abnahme/${kapitel.id}`, titel: 'Match', untertitel: boss.title || 'Abnahme durch die Jury', icon: stand.abgenommen ? '🏆' : '🥊', erledigt: stand.abgenommen, frei: kapitelIstFrei && abnahmeFrei(kapitel), bestanden: stand.abgenommen, best: stand.abnahme?.best || 0 });
  }
  if (szenen.abpfiff) {
    eintraege.push({ art: 'szene', id: 'abpfiff', href: `#/szene/${kapitel.id}/abpfiff`, titel: SZENEN_INFO.abpfiff.titel, untertitel: SZENEN_INFO.abpfiff.untertitel, icon: SZENEN_INFO.abpfiff.icon, erledigt: gesehen('abpfiff'), frei: kapitelIstFrei && (stand.abgenommen || istLehrkraft()), optional: true });
  }

  // Status: der erste freie, nicht erledigte Eintrag ist „naechste“
  let naechsteGefunden = false;
  for (const e of eintraege) {
    if (e.erledigt) e.status = 'erledigt';
    else if (!e.frei) e.status = 'gesperrt';
    else if (!naechsteGefunden) {
      e.status = 'naechste';
      naechsteGefunden = true;
    } else e.status = 'offen';
  }
  return { eintraege, naechste: eintraege.find((e) => e.status === 'naechste') || null, stand };
}

// Der nächste Schritt über alle Runden hinweg (für die Startseite)
export async function naechsterSchritt(alleKapitel, kapitelFreiFn) {
  for (let i = 0; i < alleKapitel.length; i++) {
    const k = alleKapitel[i];
    if (!kapitelFreiFn(i, alleKapitel)) break;
    const { eintraege, naechste, stand } = await ablaufFuer(k);
    if (stand.abgenommen) {
      // Runde schon gewonnen: höchstens noch der Abpfiff, sonst weiter zur nächsten Runde
      const abpfiff = eintraege.find((e) => e.art === 'szene' && e.id === 'abpfiff' && !e.erledigt);
      if (abpfiff) return { kapitel: k, index: i, eintrag: abpfiff, eintraege };
      continue;
    }
    if (naechste) return { kapitel: k, index: i, eintrag: naechste, eintraege };
  }
  return null;
}
