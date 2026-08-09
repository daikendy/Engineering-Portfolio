---
name: portfolio-editorial-cream-cobalt
description: >-
  Upgrade and maintenance skill for Kenneth Torcuator's static HTML portfolio
  using the Editorial Cream-Cobalt theme (v3.2.0). Theme identity: warm cream
  paper (#FAFAF8), cobalt blue accent (#2A3EE0), Fraunces serif display
  headings, IBM Plex Mono labels, IBM Plex Sans body. Covers the full design
  system (CSS tokens, typography, spacing), every section's HTML structure and
  CSS class inventory, JavaScript behavior contracts (GSAP, scroll-spy,
  frosted-glass mobile dropdown), and a step-by-step protocol for adding
  sections, release pages, or swapping themes. No code or APIs required —
  instruction-only.
---

# Portfolio — Editorial Cream-Cobalt Theme (v3.2.0)

## Overview

This skill is the complete design and upgrade reference for
`D:\Website Portfolio` — Kenneth Torcuator's static single-page portfolio.

**Theme name:** Editorial Cream-Cobalt
**Version:** v3.2.0
**Theme identity:**
- Background: warm cream paper (`#FAFAF8`)
- Accent: cobalt blue (`#2A3EE0`)
- Display: Fraunces (variable serif, optical size 9–144)
- Labels/code: IBM Plex Mono
- Body/UI: IBM Plex Sans
- Aesthetic: minimalist, editorial, typographic-first, no images in hero

**Stack:** Plain HTML + Vanilla CSS + Vanilla JS. No build step, no npm,
no framework. GSAP 3.12.5 loaded from CDN for scroll-triggered animations.

> [!IMPORTANT]
> `portfolio.html` in the root is a **legacy copy — never edit it**.
> `index.html` is the only active main file.

---

## File Structure

```
D:\Website Portfolio\
├── index.html                          ← ACTIVE main file
├── portfolio.html                      ← Legacy — do NOT touch
├── assets\
│   ├── styles.css                      ← All styles + design tokens
│   ├── site.js                         ← GSAP, cursor, nav-spy, dropdown
│   ├── favicon.svg
│   └── resume.pdf
├── releases\
│   ├── resumaxxing.html                ← ResuMaxxing release page
│   └── eruscent.html                   ← Eruscent release page
└── .agents\
    └── skills\
        └── portfolio-editorial-cream-cobalt\
            └── SKILL.md                ← This file
```

---

## Design System

### CSS Custom Properties (`:root` in `styles.css`)

```css
--sidebar-w: 220px;       /* Fixed left sidebar width */
--maxw:       560px;      /* Max readable content column */
--paper:      #FAFAF8;    /* Primary background — warm white */
--paper-dim:  #F4F3F0;    /* Slightly darker for panels, table heads */
--ink:        #1A1B1E;    /* Primary text + sidebar bg + dropdown bg */
--ink-soft:   #3D3E42;    /* Body text */
--muted:      #8C8C8C;    /* Captions, meta, secondary labels */
--hairline:   #E8E5E0;    /* All borders and dividers */
--cobalt:     #2A3EE0;    /* Primary accent — links, dots, eyebrows */
--cobalt-wash:#EEF1FD;    /* Cobalt tint — pill backgrounds */
```

> [!TIP]
> To swap the theme, only change these 9 variables. All components
> reference them via `var()` — no hex values are hardcoded in components.
> Exception: the mobile dropdown uses `rgba(21,23,28,0.94)` directly in
> `.mobile-menu { background }` — update that manually on a theme swap.

### Typography Scale

| Role | Font | Size | Weight |
|------|------|------|--------|
| Hero display | Fraunces | `clamp(36px,5vw,64px)` | 400 |
| Section title (`.sec-title`) | Fraunces | `clamp(28px,3vw,40px)` | 400 |
| Release page title | Fraunces | `clamp(28px,3.5vw,48px)` | 400 |
| Timeline role | Fraunces | 21px | 500 |
| Principle statement | Fraunces | `clamp(20px,2.2vw,27px)` | 400 |
| Principle number | Fraunces | `clamp(36px,4vw,52px)` | 400 |
| Education degree | Fraunces | 20px | 400 |
| Body copy (`.timeline-desc`, `.arch-tier-desc`) | IBM Plex Sans | 14–15px | 400 |
| Stack rationale (`.stack-why`) | IBM Plex Sans | 13.5px | 400 |
| Nav labels, tags, eyebrows, meta | IBM Plex Mono | 10–12px | 400–500 |
| Mobile dropdown labels | IBM Plex Sans | 14px | 500 |
| Subpage tables `<th>` | IBM Plex Mono | 10.5px uppercase | 500 |

**Google Fonts import (in `<head>` of every HTML file):**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### Breakpoints

| Breakpoint | Behaviour |
|------------|-----------|
| `> 900px` | Sidebar visible, topbar/dropdown hidden |
| `≤ 900px` | Sidebar hidden, sticky topbar + frosted dropdown visible |

---

## Complete Navigation Structure

### Current nav order (v3.2.0)

| Index | Label | Section `id` | Notes |
|-------|-------|--------------|-------|
| 00 | Home | `home` | Hero + metrics strip |
| 01 | Releases | `work` | Project cards |
| 02 | Notes | `notes` | Writing / essays |
| 03 | Changelog | `log` | Version history |
| 04 | Stack | `stack` | Tools + rationale |
| 05 | Architecture | `arch` | System blueprints |
| 06 | Principles | `principles` | Engineering philosophy |
| 07 | Experience | `exp` | Timeline + education |
| 08 | About | `about` | Personal narrative |
| 09 | Contact | `contact` | Links |
| ↗ | Resume | `assets/resume.pdf` | `target="_blank"` |

### Sidebar nav item HTML (`index.html`)

```html
<a class="navlink" data-target="[section-id]">
  <span class="idx">NN</span>Label
</a>
```

### Mobile dropdown item HTML (`index.html`)

```html
<a href="#[section-id]"><span class="mm-idx">NN</span>Label</a>
```

> [!IMPORTANT]
> `.mm-idx` spans are **hidden on the dropdown via CSS** (`display:none`).
> They are kept in the HTML for parity with sidebar but don't render.
> The dropdown shows clean, index-free labels — matching the reference design.

### Release page nav items (use `href` not `data-target`)

```html
<a class="navlink" href="../index.html#[section-id]">
  <span class="idx">NN</span>Label
</a>
```

### Protocol: adding a new section to the nav

1. Add `<a class="navlink" data-target="[new-id]">` to sidebar in `index.html`.
2. Increment index numbers on all following items.
3. Add `<a href="#[new-id]">` to mobile menu in `index.html`.
4. Mirror both changes in `releases/resumaxxing.html` sidebar + mobile menu.
5. Mirror both changes in `releases/eruscent.html` sidebar + mobile menu.
6. Add `<section id="[new-id]">` at the correct scroll position in `index.html`.
7. Add CSS classes to `styles.css` **before** the `@media (max-width:900px)` block.
8. Add mobile responsive overrides **inside** the `@media` block.

---

## Section Blueprints

### Standard section shell

```html
<section id="[id]">
  <div class="inner" style="max-width:640px;">
    <div class="eyebrow reveal">Section Label</div>
    <h2 class="sec-title reveal">Headline statement.</h2>
  </div>
  <!-- content blocks with .reveal on each major container -->
</section>
```

---

### 00 — Home (`#home`)

**Key elements:**
- `#heroHead` — hero headline, animated letter-by-letter by `site.js`.
  Reads words from `data-words` attribute on the element.
- `.hero-sub` — one-sentence editorial description.
- `.hero-meta` — 4-item metric strip:
  ```html
  <div class="hero-meta reveal">
    <div><strong>METRIC</strong>short label</div>
  </div>
  ```
- `.stack-ticker` — horizontally auto-scrolling tech tag strip at section bottom.

**Current hero-meta values (from real resume data):**

| Metric | Label |
|--------|-------|
| 70% | beta adoption rate, Eruscent closed beta |
| <10s | AI resume generation, ResuMaxxing |
| 88% | page size reduction, Leonexia refactor |
| 18 | OWASP vulnerabilities patched |

---

### 01 — Releases (`#work`)

```html
<div class="releases-list">
  <div class="release reveal">
    <div class="release-num">01</div>
    <div>
      <a class="release-title" href="releases/[slug].html">Title ↗</a>
      <div class="release-sub">one-line tagline</div>
      <div class="tech-tags"><span class="tag">tech</span></div>
    </div>
    <div class="release-meta">
      <span>vX.Y.Z</span><span>YEAR</span>
    </div>
  </div>
</div>
```

---

### 04 — Stack (`#stack`)

```html
<div class="stack-categories reveal">
  <div class="stack-category">
    <div class="stack-category-label">Category</div>
    <div class="stack-rows">
      <div class="stack-row">
        <div class="stack-name">Tool</div>
        <div class="stack-why">One-line rationale, first-person voice.</div>
      </div>
    </div>
  </div>
</div>
```

`.stack-row` grid: `160px` name col / `1fr` rationale col. Stacks to 1 col on mobile.

**Current categories:** Language · Backend · Frontend · Data · AI & Integrations · Tooling

---

### 05 — Architecture (`#arch`)

```html
<p class="arch-intro reveal">Framing paragraph explaining the spec model.</p>
<div class="arch-panels reveal">
  <div class="arch-panel">
    <div class="arch-panel-head">
      <div class="arch-panel-title">
        <span class="arch-dot"></span>System Name — Tagline
      </div>
      <span class="arch-panel-badge">vX.Y.Z</span>
    </div>
    <div class="arch-panel-body">
      <div class="arch-tier-list">
        <div class="arch-tier">
          <div class="arch-tier-name">Layer Name</div>
          <div class="arch-tier-desc">Prose description of this layer.</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

`.arch-tier` grid: `180px` name / `1fr` description. Stacks to 1 col on mobile.

---

### 06 — Principles (`#principles`)

```html
<div class="principles-list">
  <div class="principle-item reveal">
    <div class="principle-num">01</div>
    <div class="principle-body">
      <div class="principle-stmt">Statement in ≤8 words.</div>
      <div class="principle-expand">Expansion in ≤3 sentences.</div>
    </div>
  </div>
</div>
```

`.principle-item` grid: `64px` number / `1fr` body (mobile: `44px` / `1fr`).
`.principle-num` — Fraunces `clamp(36px,4vw,52px)` in `--cobalt-wash`.

---

### 07 — Experience (`#exp`)

```html
<div class="timeline">
  <div class="timeline-item reveal">
    <div class="timeline-date">
      Mon YYYY — Present
      <span class="tl-type">Contract | Independent | Freelance</span>
    </div>
    <div>
      <div class="timeline-role">Role Title</div>
      <div class="timeline-company">Company — Descriptor</div>
      <p class="timeline-desc">2–4 sentence impact prose.</p>
      <div class="timeline-highlights">
        <span class="timeline-highlight">Metric or achievement</span>
      </div>
      <div class="tech-tags"><span class="tag">Tech</span></div>
    </div>
  </div>
</div>

<div class="edu-strip reveal">
  <div class="edu-label">Education</div>
  <div>
    <div class="edu-degree">Degree Name</div>
    <div class="edu-school">School — Location</div>
    <div class="edu-meta">
      <span class="edu-badge">YEAR — Present</span>
      <span class="edu-badge">GPA X.XX</span>
      <span class="edu-badge gold">Scholarship Name</span>
    </div>
  </div>
</div>
```

`.timeline-item` grid: `140px` date / `1fr` content. Stacks to 1 col on mobile.
`.timeline-highlight` pills have `→` prefix injected via `::before`.
`.edu-badge.gold` — gold border/text/background. Use only for prestigious awards.

**Current entries:**

| Role | Company | Type | Key highlights |
|------|---------|------|----------------|
| Full Stack Engineer | Eruscent | Contract | 70% adoption · 18 OWASP · ~40% auth cut |
| AI Product Engineer | ResuMaxxing | Independent | <10s gen · zero-downtime · iOS+Android+Web |
| Software Engineer | Leonexia | Freelance | 88% page size · 1,500+ lines refactored |

**Education:** BS Computer Engineering · National University · GPA 3.41 · SM Foundation Scholar

---

### 08 — About (`#about`)

```html
<div class="about-grid">
  <div class="about-text reveal">
    <p>Narrative paragraph 1.</p>
    <p>Narrative paragraph 2.</p>
  </div>
  <div class="about-side reveal">
    <!-- Now/status, quick facts -->
  </div>
</div>
```

---

### 09 — Contact (`#contact`)

```html
<div class="contact-links">
  <a class="contact-link" href="mailto:...">Email ↗</a>
  <a class="contact-link" href="...">LinkedIn ↗</a>
</div>
```

---

## Release Page Blueprint

All release pages in `releases/` share this shell:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- same meta, fonts, styles.css, GSAP CDN as index.html -->
  <title>[Project] — Kenneth Torcuator</title>
  <meta name="description" content="...">
</head>
<body class="subpage">
  <div id="dot"></div>
  <div class="topbar">...</div>
  <div class="mobile-menu" id="mobileMenu">
    <!-- links use href="../index.html#id" -->
  </div>
  <aside class="sidebar">
    <nav><!-- all navlinks use href="../index.html#id" --></nav>
  </aside>
  <main>
    <div class="subpage-header">
      <a href="../index.html#work" class="back-link">← All releases</a>
      <div class="eyebrow">vX.Y.Z — Release</div>
      <h1 class="subpage-title">Project — tagline</h1>
      <div class="subpage-meta">
        <span>tech · stack · tags</span>
        <span><a href="https://..." target="_blank">domain.com ↗</a></span>
      </div>
    </div>
    <div class="hero-visual"></div>
    <div class="subpage-body">
      <!-- h2 headings, p, ul, .pillar-list, .table-wrap>table, .info-block -->
    </div>
    <div class="subpage-nav">
      <a href="../index.html#work">← Back to all releases</a>
      <a href="[other].html">Next release: Name →</a>
    </div>
  </main>
  <script src="../assets/site.js"></script>
</body>
</html>
```

### Subpage component classes

| Class | Description |
|-------|-------------|
| `.pillar-list` | 2-col grid of feature tiles (`1fr 1fr`, stacks on mobile) |
| `.pillar` | Tile: `.pillar-title` (mono cobalt) + `.pillar-desc` (body) |
| `.table-wrap` | Rounded border wrapper (`border-radius:10px`) around `<table>` |
| `<th>` | IBM Plex Mono 10.5px uppercase, `--paper-dim` background |
| `<td>` | Body text, `<strong>` for emphasis, `<code>` for inline values |
| `.info-block` | Monospace callout box — good for specs, env vars, constraints |

---

## Global Component Reference

| Class | Description |
|-------|-------------|
| `.reveal` | GSAP: `opacity 0→1`, `translateY 24px→0` on scroll enter |
| `.eyebrow` | Mono uppercase cobalt label with leading 20px cobalt bar |
| `.sec-title` | Fraunces section heading |
| `.tech-tags` / `.tag` | Flex row of monospace 11px pill chips |
| `.inner` | Max-width content container |
| `.release` | 3-col grid: number / content / meta |
| `.stack-category-label` | Mono uppercase cobalt category heading |
| `.stack-row` | 2-col grid: `160px` name / `1fr` rationale |
| `.arch-panel` | Bordered rounded panel with header + body |
| `.arch-tier` | 2-col grid: `180px` label / `1fr` description |
| `.principle-item` | 2-col grid: `64px` number / `1fr` body |
| `.timeline-item` | 2-col grid: `140px` date / `1fr` content |
| `.timeline-highlight` | Cobalt pill chip with `→` prefix via `::before` |
| `.edu-strip` | 2-col grid matching `.timeline-item` |
| `.edu-badge` | Rounded meta chip; `.gold` variant for honours |

---

## Mobile Dropdown Specification

**Design reference:** Compact floating panel anchored top-right, frosted glass.

```css
position: fixed;
top: 57px; right: 16px;
width: 264px;
background: rgba(21,23,28,0.94);
backdrop-filter: blur(18px);
border-radius: 14px;
border: 1px solid rgba(255,255,255,0.08);
box-shadow: 0 16px 48px rgba(0,0,0,0.32);
```

**Link style:** IBM Plex Sans 14px · 500 weight · 14px vertical padding ·
`rgba(250,250,248,0.7)` default · `#FAFAF8` on hover.

**Close triggers:** link click · outside click · `Escape` key.
**Button toggle:** `e.stopPropagation()` prevents immediate outside-click close.

---

## JavaScript Behavior Contract (`assets/site.js`)

| Behavior | How it works |
|----------|--------------|
| **Custom cursor** | `#dot` follows mouse with GSAP lag |
| **Hero headline** | `#heroHead` letter-by-letter GSAP stagger from `data-words` |
| **ScrollTrigger reveals** | `.reveal` → `{opacity:0, y:24}` → `{opacity:1, y:0}` at 85% viewport |
| **Scroll-spy nav** | Section entering viewport activates `.navlink[data-target="id"]` |
| **Dropdown toggle** | `.menu-btn` click → `.open` on both `menuBtn` and `mobileMenu` |
| **Dropdown close** | Link click / outside `document.click` / `Escape` keydown |

> [!WARNING]
> Never toggle the dropdown with `display:none/flex`. The animation relies on
> `visibility:hidden + opacity:0` at rest and `visibility:visible + opacity:1`
> when `.open`. Using `display` kills the CSS transition.

---

## Content Voice Rules

- **Tone:** First-person, declarative, direct. No passive voice.
  No marketing superlatives ("revolutionary", "cutting-edge", "state-of-the-art").
- **Headlines:** Short statements, often with a period.
  Pattern: *"[What you do with] [what]."*
  e.g. "The tools I reach for, and why." / "Public blueprints of private systems."
- **Tool rationales:** One sentence, first-person, explain *why* not just *what*.
  e.g. "The type system surfaces contract violations before they become
  runtime surprises. Worth the compile step every time."
- **Metrics:** Specific, defensible, sourced from real work. No fabricated numbers.
  Prefer technical/performance metrics when user counts aren't available.
- **Principles:** Statement ≤ 8 words. Expansion ≤ 3 sentences.

---

## Upgrade Protocols

### Add a new section

1. Write CSS classes in `styles.css` above the `@media` block.
2. Add mobile responsive overrides inside `@media (max-width:900px)`.
3. Add `<section id="[id]">` in `index.html` at the correct scroll position.
4. Add nav entry (sidebar + mobile menu) in `index.html` with correct index.
5. Increment all subsequent index numbers in `index.html`.
6. Mirror nav changes in `releases/resumaxxing.html` (both sidebar + mobile).
7. Mirror nav changes in `releases/eruscent.html` (both sidebar + mobile).

### Add a new release page

1. Duplicate the release page blueprint above.
2. Save as `releases/[slug].html`.
3. Add a `.release` entry in `#work` section of `index.html`.
4. Update `.subpage-nav` prev/next links on adjacent release pages.
5. Mirror nav changes (see step 6–7 above) if nav order changed.

### Swap the theme (color palette)

1. Change the 9 CSS variables in `:root`.
2. Manually update `.mobile-menu { background: rgba(...) }` to match new `--ink`.
3. Update `.edu-badge.gold` if the gold colour no longer fits the new palette.
4. Rename/copy this SKILL.md to a new name reflecting the new theme.

### Swap the typeface

1. Update the Google Fonts `<link>` in `<head>` of all HTML files.
2. In `styles.css`, find-replace:
   - `'Fraunces',serif` → new display font
   - `'IBM Plex Mono',monospace` → new monospace
   - `'IBM Plex Sans',sans-serif` → new body/dropdown font
3. Re-check `font-size` and `line-height` values — different typefaces
   have different optical sizes.

---

## Common Mistakes

1. **Editing `portfolio.html` instead of `index.html`.** `portfolio.html` is a
   legacy copy that is never opened in the browser. Always edit `index.html`.

2. **Forgetting to sync release page navs.** After any nav change in `index.html`,
   you must mirror it in both `releases/resumaxxing.html` and
   `releases/eruscent.html`. All three files maintain independent nav markup.

3. **Adding a section without `.reveal` on content blocks.** Without `.reveal`,
   elements appear instantly at page load with no scroll animation. Apply
   `.reveal` to the eyebrow, title, and every major content container
   (`.stack-categories`, `.arch-panels`, `.principles-list`, etc.).

4. **Using `display:none → display:flex` to toggle the dropdown.** This kills
   the opacity/transform transition. The dropdown uses `visibility + opacity`
   for animation; `display:block` is set only inside the `@media` breakpoint
   to make the element exist on mobile at all.

5. **Hardcoding hex values in new components.** Always use `var(--cobalt)`,
   `var(--ink)`, etc. Hardcoded hex breaks theme swaps silently — everything
   looks fine until you change the palette.

---

## Skill Version Log

| Skill version | Date | Portfolio version | What was added |
|---------------|------|-------------------|----------------|
| v1.0.0 | 2026-08-09 | v3.2.0 | Initial skill — full v3.2.0 upgrade documented. Stack, Architecture, Principles, Experience sections; rebuilt release pages; frosted-glass mobile dropdown; hero metrics; responsive timeline. |

---

## Future Theme Variants

When a new theme is applied, create a new skill file alongside this one:

```
.agents\skills\
  portfolio-editorial-cream-cobalt\   ← this file (current)
  portfolio-dark-midnight-amber\      ← future dark theme variant
  portfolio-minimal-white-slate\      ← future alternate variant
```

Each skill captures **exactly one theme + version state** so any can be
referenced to reproduce or roll back to that exact design.
