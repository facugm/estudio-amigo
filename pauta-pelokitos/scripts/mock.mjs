// Genera datos inventados con la misma forma que fetch.mjs, para probar el tablero sin token.
// Uso: DASHBOARD_PASSWORD=prueba node scripts/mock.mjs  →  después servir dist/ (npx serve dist)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeSite } from './lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const markets = [
  { key: 'AR', label: 'Argentina', acc: 'act_1', cur: 'ARS', tz: 'America/Argentina/Buenos_Aires', spend: 16000, cpt: 5300 },
  { key: 'UY', label: 'Uruguay', acc: 'act_2', cur: 'UYU', tz: 'America/Montevideo', spend: 160, cpt: 46 },
  { key: 'US', label: 'USA', acc: 'act_3', cur: 'USD', tz: 'America/New_York', spend: 9, cpt: 9.9 },
];
const today = new Date();
const days = 60;
const data = {
  generated_at: new Date(Date.now() - 6 * 60000).toISOString(),
  purchaseAction: 'offsite_conversion.fb_pixel_purchase',
  markets: markets.map(({ key, label }) => ({ key, label })),
  accounts: [], ads: {}, rows: [],
};

for (const m of markets) {
  const until = today.toISOString().slice(0, 10);
  const s = new Date(today); s.setDate(s.getDate() - days + 1);
  data.accounts.push({ id: m.acc, name: `Pelokitos ${m.label}`, currency: m.cur, timezone: m.tz, market: m.key, since: s.toISOString().slice(0, 10), until });
  const camps = [['Turnos · Intereses', 0.6], ['Turnos · Remarketing', 0.4]];
  if (m.key === 'UY') camps.push(['Reconocimiento · Apertura', 0.3]);
  let n = 0;
  for (const [cn, share] of camps) {
    const c = `${m.acc}_c${n}`;
    for (let k = 0; k < 4; k++) {
      const id = `${m.acc}_ad${n}_${k}`;
      const isNew = k >= 2;
      const created = new Date(today); created.setDate(created.getDate() - (isNew ? 3 + k : 50));
      const names = ['Reservar Turno', 'Reel experiencia', 'Carrusel reseñas', 'Book de peinados'];
      data.ads[id] = { n: names[k], as: `${c}_as`, asn: `${cn} · Conjunto`, c, cn, acc: m.acc, st: k === 1 ? 'PAUSED' : 'ACTIVE', ct: created.toISOString().slice(0, 10) };
      for (let d = 0; d < days; d++) {
        const date = new Date(today); date.setDate(date.getDate() - (days - 1 - d));
        if (date < created) continue;
        const sp = m.spend * share / 4 * (0.6 + rnd() * 0.8);
        const imp = Math.round(sp / m.spend * 9000 * (0.8 + rnd() * 0.4));
        const lc = Math.round(imp * (0.006 + rnd() * 0.012));
        const fresh = isNew ? 1.4 : 1 - d / days * 0.4;
        const p = Math.round((sp / m.cpt) * fresh * (0.3 + rnd() * 1.4));
        data.rows.push({
          d: date.toISOString().slice(0, 10), ad: id, s: Math.round(sp * 100) / 100, i: imp, c: Math.round(lc * 1.6), lc,
          a: { link_click: lc, landing_page_view: Math.round(lc * 0.8), 'offsite_conversion.fb_pixel_custom': Math.round(lc * 0.4), 'offsite_conversion.fb_pixel_purchase': p, purchase: p, omni_purchase: p },
        });
      }
    }
    n++;
  }
}
const dist = await writeSite(ROOT, data, process.env.DASHBOARD_PASSWORD || 'prueba');
console.log(`Mock listo en ${dist}: ${data.rows.length} filas`);
