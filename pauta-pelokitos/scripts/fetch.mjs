// Trae los datos de Meta Ads (Insights API) de las cuentas de config.json,
// los cifra y arma dist/ para GitHub Pages.
//
// Uso local:  META_TOKEN=... DASHBOARD_PASSWORD=... node scripts/fetch.mjs
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeSite, ymd } from './lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(path.join(ROOT, 'config.json'), 'utf8'));
const TOKEN = process.env.META_TOKEN;
const PASSWORD = process.env.DASHBOARD_PASSWORD;
if (!TOKEN) { console.error('Falta META_TOKEN'); process.exit(1); }
const API = `https://graph.facebook.com/${config.apiVersion}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// GET con reintentos ante rate limit (códigos 4, 17, 32, 613, 80004) y errores 5xx.
async function get(url, params = {}) {
  const u = new URL(url.startsWith('http') ? url : `${API}/${url}`);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, typeof v === 'string' ? v : JSON.stringify(v));
  if (!u.searchParams.has('access_token')) u.searchParams.set('access_token', TOKEN);
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(u);
    const body = await res.json().catch(() => ({}));
    if (res.ok) return body;
    const code = body?.error?.code;
    const retriable = res.status >= 500 || [4, 17, 32, 613, 80004].includes(code);
    if (!retriable || attempt >= 4) {
      const msg = body?.error?.message || res.statusText;
      throw new Error(`Meta API ${res.status} (code ${code}): ${msg}`);
    }
    await sleep(2000 * 2 ** attempt);
  }
}

// Recorre todas las páginas de un edge.
async function getAll(edge, params) {
  let page = await get(edge, params);
  const out = [...(page.data || [])];
  while (page.paging?.next) {
    page = await get(page.paging.next);
    out.push(...(page.data || []));
  }
  return out;
}

const num = (v) => (v == null ? 0 : Number(v));

async function fetchAccount(accountId, marketKey) {
  const acc = await get(accountId, { fields: 'name,currency,timezone_name,account_status' });
  const tz = acc.timezone_name || 'America/Argentina/Buenos_Aires';
  const until = ymd(new Date(), tz);
  const sinceDate = new Date(`${until}T12:00:00Z`);
  sinceDate.setUTCDate(sinceDate.getUTCDate() - (config.days - 1));
  const since = sinceDate.toISOString().slice(0, 10);

  // Insights a nivel anuncio, por día. use_unified_attribution_setting = misma atribución que Ads Manager.
  const insights = await getAll(`${accountId}/insights`, {
    level: 'ad',
    time_increment: '1',
    time_range: { since, until },
    use_unified_attribution_setting: 'true',
    action_breakdowns: 'action_type',
    fields: [
      'ad_id', 'ad_name', 'adset_id', 'adset_name', 'campaign_id', 'campaign_name',
      'spend', 'impressions', 'clicks', 'inline_link_clicks', 'actions',
    ].join(','),
    limit: '500',
  });

  // Estado y fecha de creación de los anuncios (para "activo" y "nuevos vs anteriores").
  const adsMeta = await getAll(`${accountId}/ads`, {
    fields: 'id,effective_status,created_time',
    limit: '500',
  }).catch((e) => { console.warn(`  (sin estado de anuncios: ${e.message})`); return []; });

  const ads = {};
  for (const r of insights) {
    ads[r.ad_id] ??= {
      n: r.ad_name, as: r.adset_id, asn: r.adset_name, c: r.campaign_id, cn: r.campaign_name, acc: accountId,
    };
  }
  for (const a of adsMeta) {
    if (ads[a.id]) { ads[a.id].st = a.effective_status; ads[a.id].ct = a.created_time?.slice(0, 10); }
  }

  const rows = insights.map((r) => {
    const a = {};
    for (const x of r.actions || []) a[x.action_type] = num(x.value);
    return { d: r.date_start, ad: r.ad_id, s: num(r.spend), i: num(r.impressions), c: num(r.clicks), lc: num(r.inline_link_clicks), a };
  });

  return {
    account: { id: accountId, name: acc.name, currency: acc.currency, timezone: tz, market: marketKey, since, until, status: acc.account_status },
    ads, rows,
  };
}

const data = {
  generated_at: new Date().toISOString(),
  purchaseAction: config.purchaseAction,
  markets: config.markets.map(({ key, label }) => ({ key, label })),
  accounts: [], ads: {}, rows: [],
};

let ok = 0;
for (const m of config.markets) {
  for (const id of m.accounts) {
    console.log(`→ ${m.label} ${id}`);
    try {
      const r = await fetchAccount(id, m.key);
      data.accounts.push(r.account);
      Object.assign(data.ads, r.ads);
      data.rows.push(...r.rows);
      ok++;
      console.log(`  ${r.rows.length} filas, ${Object.keys(r.ads).length} anuncios`);
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
      data.accounts.push({ id, market: m.key, error: e.message });
    }
  }
}

// Si fallaron todas las cuentas (por ejemplo, token vencido) no publicamos:
// queda online la última versión buena y el workflow sale en rojo.
if (ok === 0) { console.error('No se pudo leer ninguna cuenta. No se publica.'); process.exit(1); }

const dist = await writeSite(ROOT, data, PASSWORD);
console.log(`Listo: ${dist} (${data.rows.length} filas)`);
