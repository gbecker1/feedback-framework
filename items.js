// ---------------------------------------------------------------------------
// Items + helpers — thin layer over config.js so the pages never hand-roll
// id-prefix stripping or category lookups.
// ---------------------------------------------------------------------------
import cfg from "./config.js";

export const ITEMS = cfg.items.list;
export const CATEGORIES = cfg.theme.categories;

// "UC01" → "01"  (strips the configured id prefix for the short on-screen badge)
export function stripPrefix(id) {
  return String(id).replace(cfg.items.idPrefix, "");
}

// Case-insensitive lookup by id. Returns the item or null.
export function getItem(id) {
  if (!id) return null;
  const want = String(id).toUpperCase();
  return ITEMS.find((u) => u.id.toUpperCase() === want) || null;
}

// The category record for an item (falls back to the first category).
export function categoryOf(item) {
  return CATEGORIES[item && item.category] || Object.values(CATEGORIES)[0] || { label: "", solid: "#888", grad: "#888" };
}
