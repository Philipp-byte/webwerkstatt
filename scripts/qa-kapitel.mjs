// Komplette Qualitätsprüfung eines Kapitels: Validator → Build → Browser-Test
// (Lösung besteht / Starter fällt durch) → jede Lektion einmal durchspielen.
// Aufruf: node scripts/qa-kapitel.mjs <kapitel-id> [--kein-build]

import { execSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';

const id = process.argv[2];
if (!id) {
  console.error('Aufruf: node scripts/qa-kapitel.mjs <kapitel-id>');
  process.exit(1);
}
const lauf = (cmd, args) => spawnSync(cmd, args, { stdio: 'pipe', encoding: 'utf8', timeout: 20 * 60 * 1000 });
const ergebnis = [];

let r = lauf('node', ['scripts/validiere-inhalte.mjs', id]);
ergebnis.push(['Validator', r.status === 0, r.stdout.trim().split('\n').slice(-1)[0]]);
if (r.status !== 0) console.log(r.stdout);

if (!process.argv.includes('--kein-build')) {
  try {
    execSync('npx vite build', { stdio: 'pipe' });
    ergebnis.push(['Build', true, '']);
  } catch (e) {
    ergebnis.push(['Build', false, String(e.stderr || e.message).slice(-400)]);
  }
}

r = lauf('node', ['scripts/browser-test.mjs', id]);
ergebnis.push(['Browser-Test', r.status === 0, r.stdout.trim().split('\n').slice(-1)[0]]);
if (r.status !== 0) console.log(r.stdout.slice(-3000));

const kapitel = JSON.parse(fs.readFileSync(`public/content/chapters/${id}/chapter.json`, 'utf8'));
for (const l of kapitel.lessons) {
  r = lauf('node', ['scripts/e2e-lektion.mjs', id, l]);
  const zeile = (r.stdout + r.stderr).trim().split('\n').filter(Boolean).slice(-1)[0] || '';
  ergebnis.push([`E2E ${l}`, r.status === 0, zeile.slice(0, 200)]);
}

r = lauf('node', ['scripts/e2e-abnahme.mjs', id]);
ergebnis.push(['E2E Abnahme', r.status === 0, (r.stdout + r.stderr).trim().split('\n').filter(Boolean).slice(-1)[0]?.slice(0, 200) || '']);

console.log(`\n=== QA ${id} ===`);
for (const [was, ok, info] of ergebnis) console.log(`${ok ? '✔' : '✘'} ${was}${info ? ` – ${info}` : ''}`);
process.exit(ergebnis.every((e) => e[1]) ? 0 : 1);
