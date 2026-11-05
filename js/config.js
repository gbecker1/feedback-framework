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
      cat1: { label: "Use case", solid: "#3b82f6", grad: "linear-gradient(135deg,#60a5fa,#3b82f6)" },
    },
  },

  // ── 3. ITEMS (the 12 use cases people rate) ─────────────────────────────
  // image = screenshot shown on the form. Put the files in the img/ folder
  // (lowercase names, e.g. img/uc01.png). Leave "" for no image.
  items: {
    idPrefix: "UC",
    list: [
      { id: "UC01", category: "cat1", tag: "Use case", title: "Use case 1",
        lead: "Short description of use case 1.", image: "img/uc01.png" },
      { id: "UC02", category: "cat1", tag: "Use case", title: "Use case 2",
        lead: "Short description of use case 2.", image: "img/uc02.png" },
      { id: "UC03", category: "cat1", tag: "Use case", title: "Use case 3",
        lead: "Short description of use case 3.", image: "img/uc03.png" },
      { id: "UC04", category: "cat1", tag: "Use case", title: "Use case 4",
        lead: "Short description of use case 4.", image: "img/uc04.png" },
      { id: "UC05", category: "cat1", tag: "Use case", title: "Use case 5",
        lead: "Short description of use case 5.", image: "img/uc05.png" },
      { id: "UC06", category: "cat1", tag: "Use case", title: "Use case 6",
        lead: "Short description of use case 6.", image: "img/uc06.png" },
      { id: "UC07", category: "cat1", tag: "Use case", title: "Use case 7",
        lead: "Short description of use case 7.", image: "img/uc07.png" },
      { id: "UC08", category: "cat1", tag: "Use case", title: "Use case 8",
        lead: "Short description of use case 8.", image: "img/uc08.png" },
      { id: "UC09", category: "cat1", tag: "Use case", title: "Use case 9",
        lead: "Short description of use case 9.", image: "img/uc09.png" },
      { id: "UC10", category: "cat1", tag: "Use case", title: "Use case 10",
        lead: "Short description of use case 10.", image: "img/uc10.png" },
      { id: "UC11", category: "cat1", tag: "Use case", title: "Use case 11",
        lead: "Short description of use case 11.", image: "img/uc11.png" },
      { id: "UC12", category: "cat1", tag: "Use case", title: "Use case 12",
        lead: "Short description of use case 12.", image: "img/uc12.png" },
    ],
  },

  // ── 4. QUESTIONS ──────────────────────────────────────────────────────────
  // One question only: business value, 1 to 5. Key must stay "value".
  questions: {
    scaleMax: 5,
    scales: [
      { key: "value",  label: "Business value", required: true,
        hint: "How valuable would this use case be for you?",
        ends: ["Low value", "High value"] },
    ],
    chipGroups: [],
    copy: {
      submit:       "Send score",
      sending:      "Sending…",
      anonNote:     "Fully anonymous",
      anonTail:     "— we never ask your name. Pick a score from 1 to 5 to send.",
      thanksTitle:  "Thanks!",
      thanksLive:   "Your score was captured anonymously.",
      thanksLocal:  "Saved in this browser (local preview mode).",
      rateAnother:  "Rate another use case",
      changeAnswer: "Change my score",
      pickerTitle:  "Score a use case",
      pickerSub:    "Pick the use case you want to rate.",
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
    baseUrl: "https://gbecker1.github.io/feedback-framework/",
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
