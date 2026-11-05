# Feedback Framework — assistant guide

This file is context for an AI assistant (Claude Code) helping a user set up, run, and
customize this project. Read it fully before acting. For a human, non-technical walkthrough,
point the user at **`setup.html`** (open in a browser) — this file is the technical companion.

## What this project is
A tiny, re-brandable web app for **live, anonymous audience feedback**. After each item is
demoed, attendees open a per-item link / QR on their phone and rate it; a projector screen shows
a live **Value × Effort heat map** and an **auto-ranked priority list**.

- **Plain static site — NO build step, NO framework, NO bundler.** Vanilla HTML + ES modules + CSS.
- **Firebase Realtime Database** provides live phone→projector sync. If Firebase isn't configured,
  the app transparently falls back to `localStorage` (per-browser) so it still runs for preview.
- Hosts anywhere static (default target: GitHub Pages).

## Mental model (data flow)
```
📱 phones  feedback.html?uc=<id>   →   ☁️ Firebase Realtime DB   →   🖥️ results.html  projector
   (write anonymous vote)              feedback/<id>/responses/<anonId>   (live read: heat map + ranking)
```
Each item collects independently. One vote per phone per item (an anonymous id in
`sessionStorage`; re-submitting overwrites). No name or identity is ever stored.

## The golden rule
**The user should only ever edit two files:**
1. `js/config.js` — all content and branding (items, questions, chip options, colours, fonts, scoring, export names, deploy URL).
2. `js/firebase-config.js` — their Firebase project keys.

Everything else is the engine. Do not add project-specific values to the engine files — put them
in `config.js`. If a change seems to need an engine edit, first check whether a config field
already covers it.

## File map
| File | Role | Edit? |
|---|---|---|
| `js/config.js` | Central config object (default export). The heart of the project. | ✅ yes |
| `js/firebase-config.js` | `firebaseConfig` + `isConfigured` gate (REPLACE_ME placeholders). | ✅ yes |
| `js/items.js` | Helpers over config: `ITEMS`, `CATEGORIES`, `getItem(id)`, `stripPrefix(id)`, `categoryOf(item)`. | engine |
| `js/scoring.js` | `summarise(responses)`, `rankItems(rows)`, `tallyField/tallySorted(responses, field)`. Score = avgValue × avgEffort. | engine |
| `js/db.js` | Firebase wrapper + localStorage fallback: `saveResponse`, `getMyResponse`, `getAllFeedback`, `watchFeedback`, `anonId`, `isConfigured`. | engine |
| `js/theme.js` | Page chrome: writes palette+fonts as CSS vars, builds the top bar, loads Google Fonts, wires the light/dark toggle. `initChrome({home,title})`. | engine |
| `feedback.html` | Mobile form. Renders entirely from `config.questions`; reads `?uc=<id>`. No `?uc=` → shows an item picker. | rarely |
| `results.html` | Projector view: SVG heat map + priority ranking + CSV + PNG export. Subscribes live via `watchFeedback`. | rarely |
| `index.html` | Meta-refresh redirect to `results.html`. | no |
| `css/styles.css` | Styling. Uses CSS custom properties whose values are written at runtime from config. | rarely |
| `setup.html` | Standalone human setup guide (inline CSS/JS, opens from `file://`). | no |
| `README.md` | Short human intro. | — |
| `img/` | Drop logo image(s) here; reference via `config.brand.logoImg`. | — |

## How the engine reads config (so you know what a change affects)
- **`js/theme.js` → `initChrome()`** runs on every page: `applyTheme()` maps `config.theme.palette`
  onto the stylesheet's internal CSS vars (`--molten`, `--ember`, `--magenta`, `--molten-2`, …) and
  sets `--font-heading`/`--font-body`; `loadFonts()` builds the Google Fonts `<link>` from
  `config.brand.fonts`; `mountTopbar()` fills `<div id="topbar">` from `config.brand`;
  `wireThemeToggle()` persists dark/light to `config.storage.themeKey`.
  *(The internal var names stay `--molten` etc. on purpose — the stylesheet references them. You
  change colours in config, not in CSS.)*
- **`feedback.html`** builds the form from `config.questions.scales` and `config.questions.chipGroups`,
  colours itself via the item's `category` (sets `--acc` / `--acc-grad`), and writes to Firebase via `db.js`.
- **`results.html`** builds rows from `ITEMS`, scores with `scoring.js`, plots `scale[0]` (value) on
  Y and `scale[1]` (effort) on X of the heat map, and colours bubbles/badges by `categoryOf(item).solid`/`.grad`.

## config.js structure (what each block controls)
- `brand` — `orgName` (wordmark), `titleSuffix` (tab title), optional `logoSvg` (inline) / `logoImg` (path),
  `tagline` (results eyebrow), `fonts.heading`/`fonts.body` (`{family, weights, stack}`).
- `theme.palette` — `brand1/brand1Light`, `brand2/brand2Light`, `brand3/brand3Light`, `ok`, `wip`.
- `theme.gradient` — the headline gradient.
- `theme.categories` — `{ key: { label, solid, grad } }`. Each item's `category` references a key here. Any number allowed.
- `items.idPrefix` + `items.list[]` — each item: `{ id, category, tag, title, lead }`.
- `questions.scaleMax` (default 5), `questions.scales[]`, `questions.chipGroups[]`, `questions.copy{}`.
- `storage` — `dbNode` (must match the Firebase rules node), `anonIdKey`, `localKey`, `themeKey`, `pollMs`, `sdkVersion`.
- `deploy.baseUrl` — where `feedback.html` is served; used to build QR/share links.
- `scoring.thinSample` — vote count below which an item is flagged "thin sample".
- `export.csvName` / `export.pngName`.

### Hard constraints (do not break)
- The two scales **must keep the keys `value` and `effort`** — the heat map and scoring read them by name.
- `storage.dbNode` **must equal** the node named in the Firebase database rules (default `feedback`).
- `deploy.baseUrl` **must end with `/`**.
- Scales/chip-group `key`s should be simple identifiers (used as DB field names and DOM `data-*` attributes).

## Common tasks (recipes)

### Customize the colours / branding
Edit `js/config.js` only:
- Change `theme.palette.brand1` (primary accent — buttons, highlights), `brand2`, `brand3`, and their
  `*Light` variants. Update `theme.gradient` to match (used in headings/badges).
- Set `theme.categories.*.solid` and `.grad` — these colour the heat-map bubbles and the rank badges
  per item group. Keep each category's `solid` and `grad` visually consistent.
- Set `brand.orgName`; optionally `brand.logoImg` (drop a file in `img/`) or paste an inline SVG into `brand.logoSvg`.
- To change fonts, edit `brand.fonts.heading`/`body` — set `family` (a Google Font name), `weights`,
  and a CSS `stack`. The `<link>` is generated automatically.
- Reload the page — no build. (Verify with the local server below.)

### Add / edit / remove items
Edit `items.list` in `config.js`. Give each a unique `id` (keep the `idPrefix`, e.g. `UC05`), a
`category` that exists in `theme.categories`, a `tag`, `title`, and one-line `lead`. Each item is
reachable at `feedback.html?uc=<id>` and gets its own QR/link.

### Change the questions
Edit `questions.scales` (labels, hints, `ends` end-labels — remember keys stay `value`/`effort`) and
`questions.chipGroups` (heading, hint, `options`, `addPlaceholder`). `questions.copy` holds all button
and thank-you text.

### Wire up Firebase (make it live, not local-only)
Full human steps are in `setup.html` (steps 4–7). Summary:
1. Create a Firebase project; enable **Realtime Database** (pick a region near the audience).
2. Set rules to allow read/write on the `feedback` node (open for a throwaway session — see security note):
   ```json
   { "rules": { "feedback": { ".read": true, ".write": true }, "$other": { ".read": false, ".write": false } } }
   ```
3. Register a Web app, copy the `firebaseConfig` values over the `REPLACE_ME`s in `js/firebase-config.js`.
   While any value is `REPLACE_ME`, `isConfigured` is false and the app stays in local-preview mode.

### Run locally
Must be served over http (ES modules won't load from `file://`):
```bash
cd feedback-framework
python3 -m http.server 8000
# open http://localhost:8000/results.html  and  http://localhost:8000/feedback.html?uc=UC01
```

### Deploy
Static hosting. For GitHub Pages: push the folder, enable Pages (branch `main`, root), then set
`config.deploy.baseUrl` to the Pages URL and push again. QR links are `<baseUrl>feedback.html?uc=<id>`.

### Make QR codes
There is intentionally no QR generator in the app. Build one QR per item from its link
`<baseUrl>feedback.html?uc=<id>` using any external QR tool, and print/place one per station.

## Scoring (simple mode)
`score = average(value) × average(effort)` per item, computed in `js/scoring.js`. Higher = higher
priority. On the heat map, top-right (high value + high effort today) = "do first". Items with fewer
than `scoring.thinSample` votes are flagged "thin sample" (a single max vote can top the list — the
flag is the warning; there is deliberately no vote-count weighting in simple mode).

## Gotchas / troubleshooting
- **Opened as `file://` → blank page / module errors.** Use `python3 -m http.server` or the deployed URL.
- **Yellow "local preview" banner stays.** A `REPLACE_ME` remains (or a typo) in `firebase-config.js`.
- **Votes don't land / permission denied.** Rules not published, `storage.dbNode` ≠ rules node, or wrong
  `databaseURL` region. A previously-working write that now fails usually means a time-limited rule expired.
- **QR scans to 404.** `deploy.baseUrl` wrong or missing trailing `/`, or site not deployed yet.
- **Fonts/logo missing.** Offline / CDN blocked — app still works, falls back to system fonts.
- **Changed a scale key away from `value`/`effort`.** Heat map/scoring break — revert the keys.

## Verifying a change (for the assistant)
- Syntax-check modules: copy each `js/*.js` to a `.mjs` and run `node --check`.
- Smoke-test logic: import `config.js`/`items.js`/`scoring.js` in Node and assert `rankItems` /
  `summarise` behave.
- Serve the folder and load `results.html` + `feedback.html?uc=<id>`; submit a vote in local-preview
  mode and confirm it appears in the heat map and ranking.
