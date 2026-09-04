// Erzeugt das Arbeitsblatt „mit deinen Lösungen“ als PDF direkt im Browser
// (jsPDF) – im JJWS-Design: Navy, Markenblau, Bildmarke oben rechts, Fußzeile
// JJWS | Riegert | Seite. Grundlage sind dieselben Lektions-JSONs wie in der
// App plus die gespeicherten eigenen Lösungen der Lernenden (loesungen.js).
// Warum nicht per Browser-Druck? Zu unzuverlässig (leere Seiten, Umbrüche je
// nach Browser) – jsPDF ist deterministisch.

import { jsPDF } from 'jspdf';

const NAVY = [0, 52, 77];
const BLUE = [0, 159, 227];
const GREY = [91, 107, 124];
const INK = [29, 39, 51];
const OK = [26, 158, 92];
const INFO_FILL = [232, 244, 252];
const CODE_FILL = [240, 243, 247];
const OK_FILL = [231, 247, 238];

const RAND = 18;
const BREITE = 210 - 2 * RAND;
const UNTEN = 280;

// Die eingebauten PDF-Schriften kennen nur Westeuropa – alles andere ersetzen,
// sonst erscheint Zeichensalat.
function pdfSicher(text) {
  return String(text ?? '')
    .replace(/[„“”]/g, '"')
    .replace(/[‚‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/[✔✓✅]/g, '[x]')
    .replace(/[☐]/g, '[ ]')
    .replace(/→/g, '->')
    .replace(/←/g, '<-')
    .replace(/×/g, 'x')
    .replace(/·/g, '-')
    .replace(/[^\x20-\x7E -ÿ€\n\t]/g, '');
}

// Mini-Markdown der Lektionen in Text-/Code-Segmente zerlegen (ohne Auszeichnung).
function segmente(markdown) {
  const teile = String(markdown ?? '').split('```');
  const out = [];
  teile.forEach((teil, i) => {
    if (i % 2 === 1) {
      out.push({ code: teil.replace(/^[a-z]*\n/, '').replace(/\n$/, '') });
    } else {
      const text = teil.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\n{2,}/g, '\n').trim();
      if (text) out.push({ text });
    }
  });
  return out;
}

let logoCache = null;
async function ladeLogo() {
  if (logoCache !== null) return logoCache;
  try {
    const img = new Image();
    img.src = new URL('jjws-bildmarke.png', document.baseURI).href;
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
    });
    // Herunterrechnen: 400 px reichen im Druck, spart deutlich Dateigröße.
    const canvas = document.createElement('canvas');
    const faktor = 400 / img.naturalWidth;
    canvas.width = 400;
    canvas.height = Math.round(img.naturalHeight * faktor);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    logoCache = { data: canvas.toDataURL('image/png'), ratio: canvas.height / canvas.width };
  } catch {
    logoCache = false;
  }
  return logoCache;
}

class Blatt {
  constructor(doc, logo) {
    this.doc = doc;
    this.logo = logo;
    this.y = 0;
    this.seite = 0;
    this.neueSeite();
  }

  neueSeite() {
    if (this.seite > 0) this.doc.addPage();
    this.seite++;
    const d = this.doc;
    d.setFont('helvetica', 'bold');
    d.setFontSize(8);
    d.setTextColor(...BLUE);
    d.text('WEBWERKSTATT  -  INFORMATIONSTECHNIK', RAND, 12);
    if (this.logo) {
      const lb = 20;
      d.addImage(this.logo.data, 'PNG', 210 - RAND - lb, 5, lb, lb * this.logo.ratio);
    }
    d.setDrawColor(...BLUE);
    d.setLineWidth(0.5);
    d.line(RAND, 20, 210 - RAND, 20);
    this.y = 27;
  }

  platz(h) {
    if (this.y + h > UNTEN) this.neueSeite();
  }

  fusszeilen(gesamt) {
    const d = this.doc;
    for (let i = 1; i <= gesamt; i++) {
      d.setPage(i);
      d.setFont('helvetica', 'normal');
      d.setFontSize(8);
      d.setTextColor(...GREY);
      d.setDrawColor(...NAVY);
      d.setLineWidth(0.3);
      d.line(RAND, 285, 210 - RAND, 285);
      d.text('JJWS', RAND, 290);
      d.text('Riegert', 105, 290, { align: 'center' });
      d.text(`Seite ${i} von ${gesamt}`, 210 - RAND, 290, { align: 'right' });
    }
  }

  absatz(text, { groesse = 10, farbe = INK, stil = 'normal', x = RAND, breite = BREITE, abstand = 2 } = {}) {
    const d = this.doc;
    d.setFont('helvetica', stil);
    d.setFontSize(groesse);
    d.setTextColor(...farbe);
    const zeilen = d.splitTextToSize(pdfSicher(text), breite);
    const zh = groesse * 0.42;
    for (const z of zeilen) {
      this.platz(zh);
      d.text(z, x, this.y);
      this.y += zh;
    }
    this.y += abstand;
  }

  code(text, { fill = CODE_FILL, x = RAND, breite = BREITE } = {}) {
    const d = this.doc;
    d.setFont('courier', 'normal');
    d.setFontSize(8.5);
    const zeilen = [];
    for (const roh of pdfSicher(text).split('\n')) {
      zeilen.push(...(roh === '' ? [''] : d.splitTextToSize(roh, breite - 6)));
    }
    const maxZeilen = 55;
    const gekuerzt = zeilen.length > maxZeilen;
    const sichtbar = gekuerzt ? zeilen.slice(0, maxZeilen).concat(['... (gekuerzt)']) : zeilen;
    const zh = 3.9;
    const h = sichtbar.length * zh + 5;
    this.platz(Math.min(h, UNTEN - 30));
    d.setFillColor(...fill);
    d.roundedRect(x, this.y, breite, h, 1.5, 1.5, 'F');
    d.setTextColor(...INK);
    let yy = this.y + 4.5;
    for (const z of sichtbar) {
      d.text(z, x + 3, yy);
      yy += zh;
    }
    this.y += h + 2.5;
  }

  markdown(text, opts = {}) {
    for (const seg of segmente(text)) {
      if (seg.code != null) this.code(seg.code, opts);
      else this.absatz(seg.text, opts);
    }
  }

  // Höhe eines Textabsatzes/Codeblocks vorab messen (ohne zu zeichnen), damit
  // der Infokasten als Ganzes auf eine Seite passt und der Hintergrund stimmt.
  messeAbsatz(text, groesse, breite, abstand = 2) {
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(groesse);
    return this.doc.splitTextToSize(pdfSicher(text), breite).length * groesse * 0.42 + abstand;
  }

  messeCode(text, breite) {
    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(8.5);
    let zeilen = 0;
    for (const roh of pdfSicher(text).split('\n')) {
      zeilen += roh === '' ? 1 : this.doc.splitTextToSize(roh, breite - 6).length;
    }
    return Math.min(zeilen, 56) * 3.9 + 5 + 2.5;
  }

  infoKasten(titel, text) {
    const d = this.doc;
    const innen = BREITE - 10;
    let h = 9 + this.messeAbsatz(titel, 10.5, innen, 1);
    for (const seg of segmente(text)) {
      h += seg.code != null ? this.messeCode(seg.code, innen) : this.messeAbsatz(seg.text, 9.5, innen);
    }
    h += 2;
    // Passt der Kasten nicht mehr auf die Seite, beginnt er auf der nächsten
    // (bei überlangen Kästen bleibt nur der Umbruch im Kasten).
    if (h < UNTEN - 30) this.platz(h);
    const oben = this.y;

    d.setFillColor(...INFO_FILL);
    d.roundedRect(RAND, oben, BREITE, h, 2, 2, 'F');
    d.setFillColor(...BLUE);
    d.rect(RAND, oben, 1.6, h, 'F');
    d.setFont('helvetica', 'bold');
    d.setFontSize(7.5);
    d.setTextColor(...BLUE);
    d.text('INFO', RAND + 5, oben + 4.2);

    this.y = oben + 10;
    this.absatz(titel, { groesse: 10.5, stil: 'bold', farbe: NAVY, x: RAND + 5, breite: innen, abstand: 1 });
    this.markdown(text, { x: RAND + 5, breite: innen, groesse: 9.5 });
    this.y = Math.max(this.y, oben + h) + 4;
  }

  aufgabenKopf(nr, hinweis) {
    const d = this.doc;
    this.platz(12);
    d.setFillColor(...BLUE);
    d.roundedRect(RAND, this.y - 3.6, 24, 5.2, 1, 1, 'F');
    d.setFont('helvetica', 'bold');
    d.setFontSize(7.5);
    d.setTextColor(255, 255, 255);
    d.text(`AUFGABE ${nr}`, RAND + 12, this.y, { align: 'center' });
    if (hinweis) {
      d.setFont('helvetica', 'normal');
      d.setTextColor(...GREY);
      d.text(pdfSicher(hinweis), RAND + 27, this.y);
    }
    this.y += 5;
  }

  lektionsBalken(text) {
    const d = this.doc;
    this.platz(16);
    d.setFillColor(...NAVY);
    d.roundedRect(RAND, this.y, BREITE, 8, 1.5, 1.5, 'F');
    d.setFont('helvetica', 'bold');
    d.setFontSize(10.5);
    d.setTextColor(255, 255, 255);
    d.text(pdfSicher(text), RAND + 4, this.y + 5.5);
    this.y += 12;
  }

  leerFlaeche(h, text) {
    const d = this.doc;
    this.platz(h + 3);
    d.setDrawColor(...GREY);
    d.setLineWidth(0.3);
    d.setLineDashPattern([1.5, 1.5], 0);
    d.roundedRect(RAND, this.y, BREITE, h, 1.5, 1.5, 'S');
    d.setLineDashPattern([], 0);
    d.setFont('helvetica', 'italic');
    d.setFontSize(8.5);
    d.setTextColor(...GREY);
    d.text(pdfSicher(text), RAND + 3, this.y + 5);
    this.y += h + 4;
  }
}

/**
 * @param {object} opts
 * @param {object} opts.kapitel  chapter.json
 * @param {number} opts.kapitelNr
 * @param {object[]} opts.lektionen  Lektions-JSONs in Reihenfolge
 * @param {object} opts.loesungen  { lessonId: { stepIndex: { files } } }
 * @param {string} opts.name
 * @param {string} opts.klasse
 */
export async function erzeugeArbeitsblatt({ kapitel, kapitelNr, lektionen, loesungen, name = '', klasse = '' }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const logo = await ladeLogo();
  const b = new Blatt(doc, logo);
  const d = doc;

  // Titelblock
  d.setFont('helvetica', 'bold');
  d.setFontSize(17);
  d.setTextColor(...NAVY);
  d.text('Informations- & Aufgabenblatt', RAND, b.y + 4);
  b.y += 11;
  d.setFontSize(12);
  d.setTextColor(...BLUE);
  d.text(pdfSicher(`Kapitel ${kapitelNr}: ${kapitel.title}`), RAND, b.y);
  b.y += 6;
  d.setFont('helvetica', 'normal');
  d.setFontSize(9.5);
  d.setTextColor(...GREY);
  d.text(pdfSicher(kapitel.description), RAND, b.y, { maxWidth: BREITE });
  b.y += 10;

  // Name / Klasse / Datum
  d.setFontSize(9.5);
  d.setTextColor(...INK);
  d.setDrawColor(...GREY);
  d.setLineWidth(0.3);
  const felder = [
    ['Name:', name, RAND, 80],
    ['Klasse:', klasse, RAND + 86, 34],
    ['Datum:', new Date().toLocaleDateString('de-DE'), RAND + 126, 48],
  ];
  for (const [label, wert, x, w] of felder) {
    d.setFont('helvetica', 'bold');
    d.text(label, x, b.y);
    d.setFont('helvetica', 'normal');
    d.text(pdfSicher(wert), x + 15, b.y);
    d.line(x + 14, b.y + 1.2, x + w, b.y + 1.2);
  }
  b.y += 5;
  d.setDrawColor(...NAVY);
  d.setLineWidth(0.8);
  d.line(RAND, b.y, 210 - RAND, b.y);
  b.y += 8;

  let aufgabeNr = 0;
  for (const lektion of lektionen) {
    const eigene = loesungen[lektion.id] || {};
    const istWiederholung = lektion.id.includes('wiederholung');
    b.lektionsBalken(lektion.title);

    let infoGesetzt = false;
    lektion.steps.forEach((step, index) => {
      if (step.type === 'explain') {
        if (!infoGesetzt && !istWiederholung) {
          b.infoKasten(lektion.title, step.text);
          infoGesetzt = true;
        }
        return;
      }
      if (step.type === 'example') return;

      aufgabeNr++;
      if (step.type === 'quiz') {
        b.aufgabenKopf(aufgabeNr, 'Kreuze die richtige Antwort an.');
        b.markdown(step.question, { abstand: 1 });
        step.options.forEach((opt) => b.absatz(`[ ]  ${opt.replace(/`/g, '').replace(/\*\*/g, '')}`, { x: RAND + 3, breite: BREITE - 3, abstand: 0.5 }));
        b.y += 3;
      } else if (step.type === 'fill') {
        b.aufgabenKopf(aufgabeNr, 'Fuelle die Luecke aus.');
        b.markdown(step.text, { abstand: 1 });
        b.code(step.template.replace(/___/g, '________'));
        b.y += 1;
      } else if (step.type === 'code') {
        b.aufgabenKopf(aufgabeNr, step.project ? 'Projekt Cafe Pause' : '');
        b.markdown(step.task, { abstand: 1 });
        const loesung = eigene[index];
        if (loesung && loesung.files) {
          b.absatz('Deine Loesung:', { groesse: 9, stil: 'bold', farbe: OK, abstand: 1 });
          const dateien = Object.entries(loesung.files).filter(([, v]) => v != null && String(v).trim());
          for (const [datei, inhalt] of dateien) {
            if (dateien.length > 1) b.absatz(datei.toUpperCase(), { groesse: 7.5, stil: 'bold', farbe: GREY, abstand: 0.5 });
            b.code(inhalt, { fill: OK_FILL });
          }
        } else {
          b.leerFlaeche(30, 'Noch nicht geloest - hier ist Platz fuer deine Loesung.');
        }
      }
    });
    b.y += 2;
  }

  b.fusszeilen(doc.getNumberOfPages());
  return doc;
}

export async function ladeArbeitsblattHerunter(opts) {
  const doc = await erzeugeArbeitsblatt(opts);
  const sicher = (opts.name || 'ohne-Namen').replace(/[^\wäöüÄÖÜß -]/g, '').trim().replace(/\s+/g, '-');
  doc.save(`WebWerkstatt-Kapitel-${String(opts.kapitelNr).padStart(2, '0')}-${sicher}.pdf`);
  return doc;
}
