# Feedback Framework

> **Where to start:** humans → open **`setup.html`** in a browser (step-by-step setup guide).
> Using Claude Code / an AI assistant → it auto-reads **`CLAUDE.md`** (technical guide: structure,
> setup, and how to customize colours/items/questions).

A tiny, re-brandable web app for **live, anonymous audience feedback**. After each
item you demo, attendees scan a QR / open a link on their phone and rate it; a
projector screen shows a live **Value × Effort heat map** and an **auto-ranked
priority list**.

Plain HTML/JS, **no build step**. Firebase Realtime Database for live sync (with a
localStorage fallback so it also runs offline for preview). Hosts anywhere static —
e.g. GitHub Pages.

## 👉 Start here: open `setup.html`
`setup.html` is a complete, self-contained setup guide — open it in any browser
(double-click works) and follow the steps. It covers creating the Firebase
database, editing the config, running locally, deploying, and making the QR codes.

## The 10-second mental model
- **`feedback.html?uc=<id>`** — the mobile form for one item. One link / QR per item.
- **`results.html`** — the projector view: heat map + priority ranking + CSV/PNG export.
- **`index.html`** — redirects to `results.html`.

## You only edit two files
- **`js/config.js`** — items, questions, chip options, branding, colours, scoring.
- **`js/firebase-config.js`** — your Firebase keys (until then it runs in local-preview mode).

## How it scores
Priority **score = average value × average effort today**. On the heat map,
**top-right (high value + high effort) = do first**. Data persists — it is never auto-cleared.

## Run locally
Must be served over http (ES modules won't load from `file://`):
```bash
cd feedback-framework
python3 -m http.server 8000
# open http://localhost:8000/results.html  and  http://localhost:8000/feedback.html?uc=UC01
```
