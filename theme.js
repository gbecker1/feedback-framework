// ---------------------------------------------------------------------------
// Shared page chrome: palette, fonts, top bar, title, theme toggle.
// Keeps all the branding in one place so the HTML files stay thin.
// ---------------------------------------------------------------------------
import cfg from "./config.js";

// Write the config palette + fonts onto the document as CSS variables.
export function applyTheme() {
  const root = document.documentElement;
  const p = cfg.theme.palette || {};
  const set = (k, v) => { if (v) root.style.setProperty(k, v); };
  // palette → the stylesheet's internal variable names
  set("--molten", p.brand1);  set("--molten-2", p.brand1Light);
  set("--ember", p.brand2);   set("--ember-2", p.brand2Light);
  set("--magenta", p.brand3); set("--magenta-2", p.brand3Light);
  set("--ok", p.ok);          set("--wip", p.wip);
  if (cfg.theme.gradient) set("--grad", cfg.theme.gradient);
  if (cfg.brand.fonts) {
    set("--font-heading", cfg.brand.fonts.heading && cfg.brand.fonts.heading.stack);
    set("--font-body", cfg.brand.fonts.body && cfg.brand.fonts.body.stack);
  }
}

// Build + inject the Google Fonts <link> from config.
export function loadFonts() {
  const f = cfg.brand.fonts;
  if (!f) return;
  const fam = (x) => `${x.family.replace(/ /g, "+")}:wght@${x.weights}`;
  const families = [f.heading, f.body].filter(Boolean).map(fam).join("&family=");
  if (!families) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
  document.head.appendChild(link);
}

const THEME_ICONS = `
  <svg class="ic-moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
  <svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"/></svg>`;

// Fill a <div class="topbar" id="topbar"></div> with the brand + theme toggle.
export function mountTopbar(homeHref) {
  const bar = document.getElementById("topbar");
  if (!bar) return;
  const b = cfg.brand;
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const logoImg = b.logoImg ? `<img class="sf-logo" src="${esc(b.logoImg)}" alt="" />` : "";
  bar.innerHTML = `
    <a class="brand" href="${homeHref || "index.html"}">
      <div class="brand-logo">
        ${b.logoSvg || ""}
        <span class="wordmark">${esc(b.orgName)}</span>
      </div>
      ${logoImg}
    </a>
    <button class="theme-toggle" title="Toggle light / dark" aria-label="Toggle light or dark theme">${THEME_ICONS}</button>`;
}

// Light/dark toggle, persisted to the configured storage key.
export function wireThemeToggle() {
  const KEY = cfg.storage.themeKey;
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".theme-toggle")) return;
    const light = document.documentElement.getAttribute("data-theme") === "light";
    if (light) document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", "light");
    try { localStorage.setItem(KEY, light ? "dark" : "light"); } catch (e) {}
  });
}

export function setTitle(suffix) {
  document.title = suffix ? `${suffix} · ${cfg.brand.titleSuffix}` : cfg.brand.titleSuffix;
}

// One-shot init for a page.
export function initChrome({ home, title } = {}) {
  applyTheme();
  loadFonts();
  mountTopbar(home);
  wireThemeToggle();
  setTitle(title);
}
