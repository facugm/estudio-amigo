// Utilidades compartidas: cifrado y armado de la carpeta dist/ que publica GitHub Pages.
import { webcrypto as crypto } from 'node:crypto';
import { mkdir, readdir, copyFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ITERATIONS = 250000;
const b64 = (buf) => Buffer.from(buf).toString('base64');

// AES-256-GCM con clave derivada por PBKDF2-SHA256. El navegador hace lo mismo al revés con WebCrypto.
export async function encrypt(obj, password) {
  if (!password) throw new Error('Falta DASHBOARD_PASSWORD');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(obj)));
  return { v: 1, iter: ITERATIONS, salt: b64(salt), iv: b64(iv), ct: b64(ct) };
}

// Copia site/ a la carpeta de salida y escribe data.enc.json.
// Por defecto es pauta-pelokitos/dist; en el deploy se usa OUT_DIR=dist/pauta-pelokitos (raíz del repo).
// generated_at va también afuera del cifrado
// para que el botón "Actualizar ahora" sepa cuándo llegó una versión nueva.
export async function writeSite(root, data, password) {
  const dist = path.resolve(process.env.OUT_DIR || path.join(root, 'dist'));
  await mkdir(dist, { recursive: true });
  for (const f of await readdir(path.join(root, 'site'))) {
    await copyFile(path.join(root, 'site', f), path.join(dist, f));
  }
  const envelope = { generated_at: data.generated_at, ...(await encrypt(data, password)) };
  await writeFile(path.join(dist, 'data.enc.json'), JSON.stringify(envelope));
  await writeFile(path.join(dist, '.nojekyll'), '');
  return dist;
}

// Fecha YYYY-MM-DD en una zona horaria dada.
export function ymd(date, timeZone) {
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}
