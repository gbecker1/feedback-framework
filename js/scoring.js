// Scoring — ranking = average business value only. Effort (1 = easy, 5 = hard) is hardcoded per item
// and only used for the heat map position.
import cfg from "./config.js";

const THIN = (cfg.scoring && cfg.scoring.thinSample) || 5;
const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

export function summarise(responses, effort) {
  const vals = responses.map((r) => r.value).filter(Boolean);
  const count = vals.length;
  const avgV = avg(vals);
  const avgE = Number(effort) || 0;
  return { count, avgV, avgE, score: avgV, thin: count > 0 && count < THIN };
}

export function rankItems(rows) {
  return rows
    .map((r) => ({ item: r.item, s: summarise(r.resp, r.item.effort) }))
    .filter((x) => x.s.count)
    .sort((a, b) => b.s.score - a.s.score || b.s.count - a.s.count);
}

export function tallyField(responses, field) {
  const t = {};
  responses.forEach((r) => (r[field] || []).forEach((v) => { t[v] = (t[v] || 0) + 1; }));
  return t;
}

export function tallySorted(responses, field) {
  return Object.entries(tallyField(responses, field)).sort((a, b) => b[1] - a[1]);
}
