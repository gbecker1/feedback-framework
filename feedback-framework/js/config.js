// ===========================================================================
// Feedback Framework — CENTRAL CONFIG
// ===========================================================================
// This is the ONLY file you edit for content and branding.
// (The one other file you touch is firebase-config.js, for your database keys.)
//
// Everything below drives the mobile form (feedback.html) and the projector
// results view (results.html). Edit freely, reload the page — no build step.
// ===========================================================================

export default {

  // ── 1. BRANDING ─────────────────────────────────────────────────────────
  brand: {
    orgName:     "Your Org",                    // wordmark shown in the top bar
    titleSuffix: "Your Org · Feedback",         // browser tab title base
    tagline:     "Live feedback",               // small eyebrow on the results page

    // Optional logos. Leave as "" to show just the wordmark.
    logoSvg: "",   // paste an inline <svg>…</svg> string to show a mark left of the wordmark
    logoImg: "",   // OR a path like "img/logo.png" shown to the right (e.g. a partner logo)

    // Google Fonts — heading + body. The <link> is built from these automatically.
    fonts: {
      heading: { family: "Oswald", weights: "400;500;600;700", stack: "'Oswald', sans-serif" },
      body:    { family: "Inter",  weights: "400;500;600;700", stack: "'Inter', system-ui, sans-serif" },
    },
  },

  // ── 2. THEME / PALETTE ───────────────────────────────────────────────────
  // Written onto the page as CSS variables at load. Swap these for your colours.
  theme: {
    palette: {
      brand1: "#3b82f6", brand1Light: "#60a5fa",   // primary accent
      brand2: "#8b5cf6", brand2Light: "#a78bfa",   // secondary
      brand3: "#06b6d4", brand3Light: "#22d3ee",   // tertiary
      ok:     "#35d6a4", wip: "#ffb020",           // status colours
    },
    gradient: "linear-gradient(120deg,#60a5fa 0%,#8b5cf6 52%,#06b6d4 100%)",

    // CATEGORIES group your items by colour. Each item's `category` points at a
    // key here. Add/remove categories freely — any number is fine.
    categories: {
      cat1: { label: "Group A", solid: "#3b82f6", grad: "linear-gradient(135deg,#60a5fa,#3b82f6)" },
      cat2: { label: "Group B", solid: "#8b5cf6", grad: "linear-gradient(135deg,#a78bfa,#7c3aed)" },
      cat3: { label: "Group C", solid: "#06b6d4", grad: "linear-gradient(135deg,#22d3ee,#0891b2)" },
    },
  },

  // ── 3. ITEMS (the things people rate) ────────────────────────────────────
  items: {
    idPrefix: "UC",   // stripped for the short badge shown on screen (UC01 → "01")
    // Each item: id (unique), category (a key from theme.categories above),
    // tag (short label), title, lead (one-line description on the form).
    list: [
      { id: "UC01", category: "cat1", tag: "Example",   title: "First idea",
        lead: "A short, plain-language description of what this idea is." },
      { id: "UC02", category: "cat1", tag: "Example",   title: "Second idea",
        lead: "Describe each idea in one line — it shows on the phone form." },
      { id: "UC03", category: "cat2", tag: "Example",   title: "Third idea",
        lead: "Group B colours this one differently in the heat map." },
      { id: "UC04", category: "cat3", tag: "Example",   title: "Fourth idea",
        lead: "Add as many items as you like — the QR link is per item." },
    ],
  },

  // ── 4. QUESTIONS ──────────────────────────────────────────────────────────
  // The form is generated from this. The two scales MUST keep the keys
  // "value" and "effort" (the heat map plots value on the Y axis, effort on X).
  questions: {
    scaleMax: 5,
    scales: [
      { key: "value",  label: "Business value for you", required: true,
        hint: "If you had this, how valuable would it be?",
        ends: ["Low value", "High value"] },
      { key: "effort", label: "Effort today",           required: true,
        hint: "How much effort does doing this take <b>today</b>, without it?",
        ends: ["Little effort", "A lot of effort"] },
    ],
    // Multi-select chip groups. Each has an "add your own" box automatically.
    chipGroups: [
      { key: "data",     heading: "Data needed",          hint: "Tap all that apply — add your own below.",
        addPlaceholder: "Add your own…",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
      { key: "channels", heading: "Where do you want it?", hint: "Which channels? Tap all that apply.",
        addPlaceholder: "Add your own channel…",
        options: ["Mobile", "Web / desktop", "By phone / voice", "Email"] },
      { key: "actions",  heading: "What should it do?",    hint: "What actions should it take?",
        addPlaceholder: "Add your own action…",
        options: ["Answer a question", "Create / update a record", "Summarise", "Notify someone"] },
    ],
    copy: {
      submit:       "Send feedback",
      sending:      "Sending…",
      anonNote:     "Fully anonymous",
      anonTail:     "— we never ask your name. Pick a value &amp; effort rating to send.",
      thanksTitle:  "Thanks!",
      thanksLive:   "Your feedback was captured anonymously.",
      thanksLocal:  "Saved in this browser (local preview mode).",
      rateAnother:  "Rate another item",
      changeAnswer: "Change my answer",
      pickerTitle:  "Give feedback",
      pickerSub:    "Pick the item you want to rate.",
    },
  },

  // ── 5. PERSISTENCE ─────────────────────────────────────────────────────────
  storage: {
    dbNode:    "feedback",            // top-level Realtime DB node (must match your DB rules)
    anonIdKey: "feedback-anon-id",    // sessionStorage key for the per-phone anon id
    localKey:  "feedback-local-v1",   // localStorage key for the offline/preview fallback
    themeKey:  "feedback-theme",      // localStorage key for the light/dark toggle
    pollMs:    1500,                  // local-fallback live-refresh interval
    sdkVersion:"10.12.2",             // Firebase modular SDK version (from gstatic CDN)
  },

  // ── 6. DEPLOYMENT ───────────────────────────────────────────────────────────
  // Where feedback.html is served. QR codes / links point at:
  //   <baseUrl>feedback.html?uc=<item id>      (keep the trailing slash)
  deploy: {
    baseUrl: "https://github.com/gbecker1/feedback-framework",
  },

  // ── 7. SCORING ──────────────────────────────────────────────────────────────
  // Simple: priority score = average value × average effort.
  scoring: {
    thinSample: 5,   // items with fewer than this many votes are flagged "thin sample"
  },

  // ── 8. EXPORT filenames ───────────────────────────────────────────────────
  export: {
    csvName: "feedback.csv",
    pngName: "results.png",
  },
};
