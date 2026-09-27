// Baut aus content-src/etappen/* die Datei public/content/projekt/etappen.json
// und die menschenlesbare Projekt-Bibel docs/PROJEKT-BIBEL.md.
// Aufruf: node scripts/baue-etappen.mjs

import fs from 'node:fs';
import path from 'node:path';
import { kette, PAGES } from '../content-src/etappen/bau.mjs';
import { teilA } from '../content-src/etappen/teil-a.mjs';
import { teilB } from '../content-src/etappen/teil-b.mjs';

const { etappe, etappen, stand } = kette();
teilA(etappe);
teilB(etappe);

// Konsistenz: IDs eindeutig, jede Etappe hat task/hints/tests
const ids = new Set();
for (const e of etappen) {
  if (ids.has(e.id)) throw new Error(`Doppelte Etappe ${e.id}`);
  ids.add(e.id);
  if (!e.task || !Array.isArray(e.hints) || e.hints.length < 1 || !Array.isArray(e.tests) || !e.tests.length) throw new Error(`${e.id}: task/hints/tests unvollständig`);
  if (e.hints.length > 3) throw new Error(`${e.id}: höchstens 3 Tipps`);
  for (const t of e.tests) if (t.type !== 'action' && !t.label) throw new Error(`${e.id}: Test ohne label (${t.type})`);
}

const wurzel = path.join(import.meta.dirname, '..');
const ziel = path.join(wurzel, 'public', 'content', 'projekt');
fs.mkdirSync(ziel, { recursive: true });
fs.writeFileSync(path.join(ziel, 'etappen.json'), JSON.stringify({ pages: PAGES, etappen }, null, 2) + '\n');

// Projekt-Bibel
let md = `# Projekt-Bibel: die FUNKEN-Website\n\n**Generiert aus \`content-src/etappen/\` – nicht von Hand ändern.** Jede Lektion ab Kapitel 02 endet mit genau einer Etappe; der Starter einer Etappe ist immer der Zustand nach der vorherigen Etappe derselben Datei (per Konstruktion, Skript \`scripts/baue-etappen.mjs\`).\n\n`;
md += `## Der fiktive Kunde\n\n- **FUNKEN – Das Schülerfestival Heilbronn**, veranstaltet vom Kollektiv FUNKEN (Schülerfirma, fiktiv)\n- Freitag, 17. und Samstag, 18. Juli 2027 · Altes Fabrikgelände am Neckar · Hafenstraße 9 · 74072 Heilbronn\n- Einlass 16:00 Uhr, Ende 23:00 Uhr · Bühnen: Hauptbühne, Zeltbühne\n- Acts: Neonpuls, Basslager, Kiki Volt, Die Kabelträger, Lou & die Lichter, Marla Funke, Sektor 7, Freitag-Frei\n- Foodtrucks: Pizza & Mehr, Döner-Ecke, Bubble Tea Bar, Waffelwagen\n- Tickets: Tagesticket 12 €, Festivalpass 20 €, Helfer:in kostenlos · E-Mail hallo@funken-festival-beispiel.de\n- Farben (CSS): Creme \`#fff7e8\`, Nacht \`#1b1b2f\`, Funke \`#ff6a00\`, Dunkelorange \`#d94f00\`, Blau \`#0b7dd6\`, Gelb \`#ffd23f\`\n\n## Dateien\n\n| Schlüssel | Datei | entsteht in |\n|---|---|---|\n`;
const erste = {};
for (const e of etappen) for (const k of Object.keys(e.files)) {
  const key = k === 'html' ? `html:${e.page}` : k;
  if (!erste[key] && e.editable.includes(k)) erste[key] = e.chapter;
}
for (const p of PAGES) md += `| \`${p.id}\` | ${p.datei} | ${erste[`html:${p.id}`] || '–'} |\n`;
md += `| \`css\` | style.css (alle Seiten) | ${erste.css} |\n| \`js\` | script.js (Startseite) | ${erste.js} |\n\n`;

md += `## Etappen (${etappen.length})\n\n| Etappe | Seite | Dateien | Was die Lernenden bauen |\n|---|---|---|---|\n`;
for (const e of etappen) md += `| \`${e.id}\` | ${e.page} | ${e.editable.join(', ')} | **${e.titel}** – ${e.task.replace(/\*\*/g, '').replace(/\|/g, '\\|')} |\n`;

md += `\n## Endzustand der Dateien\n\n`;
for (const p of PAGES) {
  const h = stand[`html:${p.id}`];
  if (h) md += `### ${p.datei}\n\n\`\`\`html\n${h}\`\`\`\n\n`;
}
md += `### style.css\n\n\`\`\`css\n${stand.css}\`\`\`\n\n### script.js\n\n\`\`\`js\n${stand.js}\`\`\`\n`;
fs.writeFileSync(path.join(wurzel, 'docs', 'PROJEKT-BIBEL.md'), md);

const proKapitel = {};
for (const e of etappen) proKapitel[e.chapter] = (proKapitel[e.chapter] || 0) + 1;
console.log(`${etappen.length} Etappen geschrieben:`, Object.entries(proKapitel).map(([k, n]) => `${k.slice(0, 2)}:${n}`).join(' '));
