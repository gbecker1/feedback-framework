// Scoring — score = average business value (1..5).
import cfg from "./config.js";

const THIN = (cfg.scoring && cfg.scoring.thinSample) || 5;
const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

export function summarise(responses) {
  const vals = responses.map((r) => r.value).filter(Boolean);
  const count = vals.length;
  const avgV = avg(vals);
  return { count, avgV, score: avgV, thin: count > 0 && count < THIN };
}

export function rankItems(rows) {
  return rows
    .map((r) => ({ item: r.item, s: summarise(r.resp) }))
    .filter((x) => x.s.count)
    .sort((a, b) => b.s.score - a.s.score);
}

export function tallyField(responses, field) {
  const t = {};
  responses.forEach((r) => (r[field] || []).forEach((v) => { t[v] = (t[v] || 0) + 1; }));
  return t;
}

export function tallySorted(responses, field) {
  return Object.entries(tallyField(responses, field)).sort((a, b) => b[1] - a[1]);
}
