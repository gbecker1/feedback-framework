// ---------------------------------------------------------------------------
// Scoring — SIMPLE: priority score = average value × average effort.
// One shared module used by the results view (and the exports).
// ---------------------------------------------------------------------------
import cfg from "./config.js";

const THIN = (cfg.scoring && cfg.scoring.thinSample) || 5;
const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

// Aggregate one item's responses into the stats the UI needs.
export function summarise(responses) {
  const vals = responses.map((r) => r.value).filter(Boolean);
  const effs = responses.map((r) => r.effort).filter(Boolean);
  const count = responses.length;
  const avgV = avg(vals);
  const avgE = avg(effs);
  const score = vals.length && effs.length ? avgV * avgE : 0;
  return { count, avgV, avgE, score, thin: count > 0 && count < THIN };
}

// rows = [{ item, resp }] → [{ item, s }] sorted by score desc, rated only.
export function rankItems(rows) {
  return rows
    .map((r) => ({ item: r.item, s: summarise(r.resp) }))
    .filter((x) => x.s.count)
    .sort((a, b) => b.s.score - a.s.score);
}

// Count how often each value appears in a chip field across responses.
export function tallyField(responses, field) {
  const t = {};
  responses.forEach((r) => (r[field] || []).forEach((v) => { t[v] = (t[v] || 0) + 1; }));
  return t;
}

// Same, returned sorted desc as [[label, count], …].
export function tallySorted(responses, field) {
  return Object.entries(tallyField(responses, field)).sort((a, b) => b[1] - a[1]);
}
