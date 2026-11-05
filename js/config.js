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
      cat1: { label: "Marketing",  blurb: "Finds, scores and warms every L&R brand.",
              solid: "#3b82f6", grad: "linear-gradient(135deg,#60a5fa,#3b82f6)" },
      cat2: { label: "Sales",      blurb: "Prepares the visit, captures it by voice and photo.",
              solid: "#8b5cf6", grad: "linear-gradient(135deg,#a78bfa,#7c3aed)" },
      cat3: { label: "Operations", blurb: "Back-office agents run the manual steps, brief to raw material.",
              solid: "#06b6d4", grad: "linear-gradient(135deg,#22d3ee,#0891b2)" },
      cat4: { label: "Leaders",    blurb: "See and act from the command center, anywhere.",
              solid: "#f59e0b", grad: "linear-gradient(135deg,#fbbf24,#d97706)" },
    },
  },

  // ── 3. ITEMS (the 12 use cases people rate) ─────────────────────────────
  // effort = HARDCODED effort to activate (1 = very easy, 5 = very hard), set by you, not collected.
  // image = screenshot shown on the form. Put the files in the img/ folder
  // (lowercase names, e.g. img/uc01.png). Leave "" for no image.
  items: {
    idPrefix: "UC",
    list: [
      { id: "UC01", category: "cat1", tag: "Use case", title: "Hunter, outbound agent",
        lead: "An agent that prospects and starts outbound conversations.", image: "img/uc01.png", effort: 4 },
      { id: "UC02", category: "cat1", tag: "Use case", title: "Marie, marketing campaign agent",
        lead: "An agent that runs marketing campaigns.", image: "img/uc02.png", effort: 1 },
      { id: "UC03", category: "cat1", tag: "Use case", title: "Piper, inbound agent",
        lead: "An agent that handles inbound leads and requests.", image: "img/uc03.png", effort: 1 },
      { id: "UC04", category: "cat2", tag: "Use case", title: "Home page proactive agent",
        lead: "The home page proactively surfaces suggested actions.", image: "img/uc04.png", effort: 3 },
      { id: "UC05", category: "cat2", tag: "Use case", title: "Coworker",
        lead: "A coworker agent that supports you in your daily sales work.", image: "img/uc05.png", effort: 1 },
      { id: "UC06", category: "cat2", tag: "Use case", title: "Momentum, onsite recording",
        lead: "Record your on-site customer meeting and capture what was said.", image: "img/uc06.png", effort: 1 },
      { id: "UC07", category: "cat2", tag: "Use case", title: "Photo of paper brief",
        lead: "Take a photo of a paper brief and have it captured.", image: "img/uc07.png", effort: 2 },
      { id: "UC08", category: "cat2", tag: "Use case", title: "Voice visit report and opportunity update",
        lead: "Dictate your visit report and the opportunity is updated for you.", image: "img/uc08.png", effort: 2 },
      { id: "UC09", category: "cat3", tag: "Use case", title: "Agentforce, suggest formula (A2A)",
        lead: "Agent-to-agent suggestion of a formula.", image: "img/uc09.png", effort: 3 },
      { id: "UC10", category: "cat3", tag: "Use case", title: "Portal Smart Bottle",
        lead: "Smart Bottle in the customer portal.", image: "img/uc10.png", effort: 3 },
      { id: "UC11", category: "cat3", tag: "Use case", title: "AF Operation",
        lead: "Agentforce for operations.", image: "img/uc11.png", effort: 5 },
      { id: "UC12", category: "cat4", tag: "Use case", title: "Headless, act on the command center",
        lead: "Sales leaders see and act on their business from the command center.", image: "img/uc12.png", effort: 1 },
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
      pickerTitle:  "Score the use cases",
      pickerSub:    "Pick a chapter, then score each use case from 1 to 5.",
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
  // Priority ranking = average business value only (effort is shown on the heat map).
  scoring: {
    thinSample: 5,   // items with fewer than this many votes are flagged "thin sample"
  },

  // ── 8. EXPORT filenames ───────────────────────────────────────────────────
  export: {
    csvName: "feedback.csv",
    pngName: "results.png",
  },
};
