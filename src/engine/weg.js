// Der Weg durch einen Ort: Lektionen, nach jeder zweiten Lektion ein Hinterhalt (eine
// Spielrunde), vor dem Duell der Sturm (Warm-up mit Aufgaben dieses Ortes), dann das Duell.
// Liefert für Orts- und Kartenseite dieselbe Liste mit Status, damit „Weiter“ überall auf
// denselben nächsten Schritt zeigt.

import { loadLesson, loadBoss } from '../content.js';
import { getState, istLehrkraft } from '../store.js';
import { lektionFrei, abnahmeFrei, kapitelStand, hinterhaltKnotenId } from '../progress.js';
import { SPIELE } from './hinterhalt.js';

function lektionsArt(id) {
  if (id.includes('wiederholung')) return 'Wiederholung';
  if (id.includes('projekt')) return 'Meilenstein';
  if (id.includes('eigene-website')) return 'Finale';
  return 'Lektion';
}

// Spiel für den n-ten Hinterhalt eines Ortes (rotiert, damit alle fünf vorkommen)
export function spielFuerKnoten(ortNr, knotenIndex) {
  return SPIELE[(ortNr + knotenIndex) % SPIELE.length];
}

export async function wegFuer(kapitel, ort, { kapitelIstFrei = true } = {}) {
  const s = getState();
  const boss = await loadBoss(kapitel.id);
  const titel = await Promise.all(kapitel.lessons.map((l) => loadLesson(kapitel.id, l).then((x) => x.title).catch(() => l)));
  const stand = kapitelStand(kapitel);
  const eintraege = [];
  let knotenIndex = 0;

  kapitel.lessons.forEach((l, i) => {
    const eintrag = s.lessons[`${kapitel.id}/${l}`];
    const frei = kapitelIstFrei && lektionFrei(kapitel, l, true);
    eintraege.push({ art: 'lektion', id: l, nr: i + 1, href: `#/lektion/${kapitel.id}/${l}`, titel: titel[i], untertitel: lektionsArt(l), erledigt: !!eintrag?.done, frei, stars: eintrag?.stars || 0, versuche: eintrag?.versuche || 0 });
    const knotenId = hinterhaltKnotenId(kapitel, i);
    if (knotenId) {
      const spiel = spielFuerKnoten(ort?.nr || 1, knotenIndex++);
      const gespielt = s.hinterhalte.knoten[`${kapitel.id}/${knotenId}`];
      eintraege.push({
        art: 'hinterhalt', id: knotenId, spiel, href: `#/hinterhalt/${kapitel.id}/${spiel.id}/${knotenId}`,
        titel: `Hinterhalt: ${spiel.titel}`, untertitel: `${ort?.gespinst ? 'Das Gespinst lauert auf. ' : ''}${spiel.text}`, icon: spiel.icon,
        erledigt: !!gespielt, frei: kapitelIstFrei && (!!eintrag?.done || istLehrkraft()), sterne: gespielt?.sterne || 0,
      });
    }
  });
  if (boss) {
    const sturm = SPIELE[2];
    const sturmGespielt = s.hinterhalte.knoten[`${kapitel.id}/sturm`];
    eintraege.push({ art: 'sturm', id: 'sturm', spiel: sturm, href: `#/hinterhalt/${kapitel.id}/${sturm.id}/sturm`, titel: 'Sturm: Warm-up', untertitel: 'Eine Runde mit Aufgaben dieses Ortes, bevor es ins Duell geht', icon: '🌩️', erledigt: !!sturmGespielt, frei: kapitelIstFrei && (abnahmeFrei(kapitel) || istLehrkraft()), optional: true, sterne: sturmGespielt?.sterne || 0 });
    eintraege.push({ art: 'duell', id: 'duell', href: `#/duell/${kapitel.id}`, titel: `Duell gegen ${ort?.gespinstName || 'das Gespinst'}`, untertitel: boss.title || 'Sam prüft jeden Knoten', icon: stand.abgenommen ? '✨' : '⚔️', erledigt: stand.abgenommen, frei: kapitelIstFrei && abnahmeFrei(kapitel), bestanden: stand.abgenommen, best: stand.abnahme?.best || 0 });
  }

  let naechsteGefunden = false;
  for (const e of eintraege) {
    if (e.erledigt) e.status = 'erledigt';
    else if (!e.frei) e.status = 'gesperrt';
    else if (!naechsteGefunden && !e.optional) {
      e.status = 'naechste';
      naechsteGefunden = true;
    } else e.status = 'offen';
  }
  return { eintraege, naechste: eintraege.find((e) => e.status === 'naechste') || null, stand };
}

// Der nächste Schritt über alle Orte hinweg (für die Karte)
export async function naechsterSchritt(alleKapitel, orte, kapitelFreiFn) {
  for (let i = 0; i < alleKapitel.length; i++) {
    const k = alleKapitel[i];
    if (!kapitelFreiFn(i, alleKapitel)) break;
    const ort = orte.find((o) => o.chapter === k.id) || null;
    const { eintraege, naechste, stand } = await wegFuer(k, ort);
    if (stand.abgenommen) continue;
    if (naechste) return { kapitel: k, ort, index: i, eintrag: naechste, eintraege };
  }
  return null;
}
