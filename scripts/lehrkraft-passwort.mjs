// Setzt ein neues Lehrkraft-Passwort (nur der SHA-256-Hash landet im Repo).
// Aufruf: node scripts/lehrkraft-passwort.mjs "neues Passwort"
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const pw = process.argv[2];
if (!pw || pw.length < 6) {
  console.error('Bitte ein Passwort mit mindestens 6 Zeichen angeben.');
  process.exit(1);
}
const hash = crypto.createHash('sha256').update(pw).digest('hex');
const ziel = path.join(import.meta.dirname, '..', 'public', 'content', 'lehrkraft.json');
fs.writeFileSync(ziel, JSON.stringify({ hash, hinweis: 'SHA-256 des Lehrkraft-Passworts. Ändern mit: node scripts/lehrkraft-passwort.mjs "neues Passwort"' }, null, 2) + '\n');
console.log('Neues Passwort gesetzt. Jetzt bauen und pushen.');
