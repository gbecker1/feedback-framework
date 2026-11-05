// ---------------------------------------------------------------------------
// Firebase Realtime Database wrapper (config-driven).
// ---------------------------------------------------------------------------
// Data tree (node name comes from config.storage.dbNode, default "feedback"):
//
//   <node>/{itemId}/responses/{anonId}: {
//       value, effort,                 // 1..scaleMax
//       <chip keys>: [...],            // selected chip labels (+ any "add your own")
//       submittedAt
//   }
//
// One anonymous id per browser (sessionStorage) → re-submitting an item
// overwrites that browser's previous answer (one vote per phone per item).
// NO name, NO identity is ever stored.
//
// If Firebase is not configured, every function degrades to localStorage so the
// pages can be reviewed locally. saveResponse() returns the mode used.
// ---------------------------------------------------------------------------

import cfg from "./config.js";
import { firebaseConfig, isConfigured } from "./firebase-config.js";

export { isConfigured };

const NODE = cfg.storage.dbNode;
const SCALE_KEYS = cfg.questions.scales.map((s) => s.key);
const CHIP_KEYS = cfg.questions.chipGroups.map((g) => g.key);

let db = null;
let fb = null; // lazily imported SDK bindings

async function ensureDb() {
  if (!isConfigured) return null;
  if (db) return db;
  const base = `https://www.gstatic.com/firebasejs/${cfg.storage.sdkVersion}`;
  const appMod = await import(`${base}/firebase-app.js`);
  const dbMod = await import(`${base}/firebase-database.js`);
  fb = dbMod;
  const app = appMod.initializeApp(firebaseConfig);
  db = dbMod.getDatabase(app);
  return db;
}

// A stable anonymous id for this browser (sessionStorage). Not a name, not tied
// to any person — only used so a re-submit overwrites cleanly.
export function anonId() {
  const KEY = cfg.storage.anonIdKey;
  let id = null;
  try { id = sessionStorage.getItem(KEY); } catch (e) {}
  if (!id) {
    id = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
    try { sessionStorage.setItem(KEY, id); } catch (e) {}
  }
  return id;
}

const LOCAL_KEY = cfg.storage.localKey;
function localAll() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}"); } catch (e) { return {}; }
}
function localWrite(all) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(all)); } catch (e) {}
}

// Save one anonymous response for an item. Returns "firebase" | "local".
export async function saveResponse(itemId, response) {
  const id = anonId();
  const payload = { ...response, submittedAt: Date.now() };

  if (isConfigured) {
    const database = await ensureDb();
    const r = fb.ref(database, `${NODE}/${itemId}/responses/${id}`);
    await fb.set(r, { ...payload, submittedAt: fb.serverTimestamp() });
    return "firebase";
  }

  // local-preview fallback
  const all = localAll();
  all[itemId] = all[itemId] || {};
  all[itemId][id] = payload;
  localWrite(all);
  return "local";
}

// Has this browser already answered this item? Returns the saved response or null.
export async function getMyResponse(itemId) {
  const id = anonId();
  if (isConfigured) {
    const database = await ensureDb();
    const snap = await fb.get(fb.ref(database, `${NODE}/${itemId}/responses/${id}`));
    return snap.exists() ? snap.val() : null;
  }
  const all = localAll();
  return (all[itemId] && all[itemId][id]) || null;
}

// Normalise the raw tree into { [itemId]: [ {<scale keys>, <chip keys>, submittedAt}, … ] }
function shape(raw) {
  const out = {};
  Object.keys(raw || {}).forEach((itemId) => {
    const responses = (raw[itemId] && raw[itemId].responses) || {};
    out[itemId] = Object.keys(responses).map((id) => {
      const r = responses[id] || {};
      const o = { submittedAt: r.submittedAt || null };
      SCALE_KEYS.forEach((k) => { o[k] = Number(r[k]) || null; });
      CHIP_KEYS.forEach((k) => { o[k] = Array.isArray(r[k]) ? r[k] : []; });
      return o;
    });
  });
  return out;
}

// Read every response once (results view / export). NEVER deletes anything.
export async function getAllFeedback() {
  if (isConfigured) {
    const database = await ensureDb();
    const snap = await fb.get(fb.ref(database, NODE));
    return shape(snap.exists() ? snap.val() : {});
  }
  const all = localAll();
  const wrapped = {};
  Object.keys(all).forEach((itemId) => { wrapped[itemId] = { responses: all[itemId] }; });
  return shape(wrapped);
}

// Subscribe to live updates. Calls back with the shaped map on every change.
// Returns an unsubscribe function. Falls back to polling localStorage locally.
export async function watchFeedback(cb) {
  if (isConfigured) {
    const database = await ensureDb();
    const r = fb.ref(database, NODE);
    return fb.onValue(r, (snap) => cb(shape(snap.exists() ? snap.val() : {})));
  }
  let last = "";
  const tick = async () => {
    const data = await getAllFeedback();
    const json = JSON.stringify(data);
    if (json !== last) { last = json; cb(data); }
  };
  tick();
  const t = setInterval(tick, cfg.storage.pollMs);
  return () => clearInterval(t);
}
