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
    orgName:     "Givaudan",                    // wordmark shown in the top bar
    titleSuffix: "Givaudan · Feedback",         // browser tab title base
    tagline:     "Agentforce for Local & Regional Brands", // small eyebrow on the results page

    // Optional logos. Leave as "" to show just the wordmark.
    logoSvg: "",   // paste an inline <svg>…</svg> string to show a mark left of the wordmark
    logoImg: "data:image/png;base64,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",   // Salesforce logo (inline, so no upload needed)

    // Google Fonts — heading + body. The <link> is built from these automatically.
    fonts: {
      heading: { family: "Jost", weights: "400;500;600;700", stack: "'Jost', 'Futura', 'Avenir Next', sans-serif" },
      body:    { family: "Jost", weights: "400;500;600;700", stack: "'Jost', 'Futura', 'Avenir Next', system-ui, sans-serif" },
    },
  },

  // ── 2. THEME / PALETTE ───────────────────────────────────────────────────
  // Written onto the page as CSS variables at load. Swap these for your colours.
  theme: {
    palette: {
      brand1: "#c2338a", brand1Light: "#f08bb8",   // primary accent (Givaudan magenta)
      brand2: "#8a1d63", brand2Light: "#b32a7a",   // secondary (deep magenta)
      brand3: "#5b1146", brand3Light: "#7a3e9d",   // tertiary (plum)
      ok:     "#35d6a4", wip: "#ffb020",           // status colours
    },
    gradient: "linear-gradient(120deg,#f3c2da 0%,#f08bb8 45%,#c2338a 100%)",

    // CATEGORIES group your items by colour. Each item's `category` points at a
    // key here. Add/remove categories freely — any number is fine.
    categories: {
      cat4: { label: "Leaders",    blurb: "See and act from the command center, anywhere.",
              solid: "#e9a23b", grad: "linear-gradient(135deg,#f4c06a,#d4862a)" },
      cat1: { label: "Marketing",  blurb: "Finds, scores and warms every L&R brand.",
              solid: "#d6408f", grad: "linear-gradient(135deg,#f08bb8,#b02a78)" },
      cat2: { label: "Sales",      blurb: "Prepares the visit, captures it by voice and photo.",
              solid: "#9b5fc8", grad: "linear-gradient(135deg,#c49ae6,#7a3e9d)" },
      cat3: { label: "Operations", blurb: "Back-office agents run the manual steps, brief to raw material.",
              solid: "#4f86e0", grad: "linear-gradient(135deg,#86aef0,#2f6fd6)" },
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
      { id: "UC02", category: "cat1", tag: "Use case", title: "Marketing campaign agent",
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
