# SILBAR SECURITY — Master Fix & Refactor Prompt

**Hand this file to a coding agent (Claude Code or any AI coding tool) to execute. It is self-contained.**

**Repo:** Next.js App Router, TypeScript, Tailwind, GSAP + ScrollTrigger, Lenis  
**Primary file under repair:** `src/app/globals.css` (currently ~3,946 lines, single file, no partials)  
**Also touches:** `src/components/sections/ServicesGrid.tsx`, `src/components/sections/ScrollExperience.tsx`, `src/components/ui/GlassCard.tsx`

---

## TABLE OF CONTENTS

1. [Critical verification — current state](#1-critical-verification--current-state)
2. [Bug 1 — Services grid blank cards on mobile](#2-bug-1--services-grid-blank-cards-on-mobile)
3. [Bug 2 — Missing CSS for in-use classes (home-command-*, services-split-intro, etc.)](#3-bug-2--missing-css-for-in-use-classes)
4. [Bug 3 — Marquee strip jank / direction-aware fade](#4-bug-3--marquee-strip-jank--direction-aware-fade)
5. [Bug 4 — #morph-video-dock orphan CSS selector](#5-bug-4--orphan-css-selector)
6. [Feature 5 — Footer red glass (verify existing)](#6-feature-5--footer-red-glass-verify-existing)
7. [Cleanup 6 — Dead CSS removal](#7-cleanup-6--dead-css-removal)
8. [Cleanup 7 — Duplicate CSS consolidation](#8-cleanup-7--duplicate-css-consolidation)
9. [Refactor 8 — CSS file-split into modules](#9-refactor-8--css-file-split-into-modules)
10. [Final acceptance checklist](#10-final-acceptance-checklist)

---

## 0. READ THIS FIRST — Execution rules

- Do **not** change color palette, typography, spacing scale, or design tokens.
- Do **not** rewrite GSAP animations or add new effects. Fix only the named bugs.
- Do **not** delete a CSS class without re-verifying with `grep` across ALL `.tsx`/`.ts` files immediately before deleting.
- Do **not** do the file-split (Section 9) before the dead-code cleanup (Section 7) and duplicate consolidation (Section 8) — splitting first just copies the mess.
- **Execute in order:** Section 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
- Mark nothing complete without being able to cite the specific file, line, and reasoning.

---

## 1. Critical — Verify Current State

Some fixes from previous sessions may already be applied to `src/app/globals.css`. **First step: confirm each of these before redoing or building on them.**

### 1.1 Hero panel — mobile flex-direction: column (was row, causing overflow)

**Check at line ~2183:** Under `@media (max-width: 1023px)` the `.hero-left-panel` should have `flex-direction: column` (FIXED). If it still says `flex-direction: row`, that's the original bug — the wordmark "SILBAR SECURITY" was getting pushed off-screen on mobile.

Relevant CSS block (lines 2183–2196):
```css
@media (max-width: 1023px) {
  .hero-left-panel {
    top: auto;
    bottom: 0;
    height: auto;
    flex-direction: column; /* MUST be column, not row */
    padding: 0.75rem 0;
    /* ... */
  }
}
```

### 1.2 Laser lines hidden on mobile — (was drawing strikethrough across tagline)

**Check at lines 2247–2252:** The selector `.hero-tagline, .hero-tagline-stack, .hero-vertical-laser-line, .hero-horizontal-laser-line` should have `display: none` inside the 1023px media query.

### 1.3 Trust dock aspect ratio — narrower on mobile for video fit

**Check at lines 492–500:** `.trust-card-light` should have `aspect-ratio: 3/4` under 900px and `4/5` under 480px.

### 1.4 Sticky CTA buttons — offset to clear marquee bar

**Check at line ~1212:** `.sticky-cta` should have `bottom: clamp(5.5rem, 3vh + 4.5rem, 6.5rem)`.

### 1.5 Footer red glass — utility exists

**Check at lines 3939–3946:** `.footer-glass-red` should be defined and `Footer.tsx` should apply `footer-glass-red` on the `<footer>` element.

### 1.6 ScrollTrigger.normalizeScroll — already wired

**Check `src/components/sections/ScrollExperience.tsx` line 82:** `ScrollTrigger.normalizeScroll(true)` should be present.

### 1.7 Verification results

After checking all of the above, document the current state. If any are missing, apply them first (they are covered in their respective sections below as comments).

---

## 2. Bug 1 — Services Grid Blank Cards on Mobile

**Reported:** Scrolling through the homepage's numbered services list (`01 MANNED GUARDING`, `03 EVENT SECURITY`, etc.), some cards show their frame but **no icon, number, title, or description**. Pattern appears inconsistent (alternating blanks observed).

### 2.1 Root cause analysis

**File:** `src/components/sections/ServicesGrid.tsx`

Line 44 — GSAP scroll-reveal animation targets `.services-split-item`:
```tsx
const items = sectionRef.current!.querySelectorAll('.services-split-item')
const tl = gsap.timeline({
  scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
})
tl.fromTo(items, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' })
```

Each `.services-split-item` **is** a `<GlassCard>` component (`src/components/ui/GlassCard.tsx`). GlassCard writes inline `style.transform` via a `ref` and `requestAnimationFrame` for the tilt effect (lines 56–66). When `tilt={true}` (which ServicesGrid always passes), GlassCard applies:
```ts
inner.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
```

**The conflict:** Two systems write to `style.transform` on the exact same DOM node:
1. GSAP writes `opacity` + `transform: translateY(...)` via `fromTo`
2. GlassCard writes `transform: perspective(...) rotateX(...) rotateY(...)` via `requestAnimationFrame`

They fight over `transform` property ownership. On mobile, the mousemove handler never fires (no mouse), but the initial render collision between GSAP's first write and GlassCard's initial `style.transform` setup can still produce blank cards depending on hydration/timing.

### 2.2 The fix

**Option A — Animate a wrapper div (recommended, safest):**

Change `ServicesGrid.tsx` render loop to wrap each GlassCard in a plain `<div>` that GSAP owns exclusively:

```tsx
// ServicesGrid.tsx — line 58–80, replace renderItem
const renderItem = (service: Service, index: number, side: 'left' | 'right') => {
  const Icon = ICON_MAP[service.icon] || ShieldHalf
  const numeral = String(index + 1).padStart(2, '0')
  return (
    <div className="services-split-item-wrap" key={service.slug}>
      <GlassCard
        href={`/services/${service.slug}`}
        className={`services-split-item services-split-item--${side}`}
        tilt={true}
        opacity={0.02}
        borderOpacity={0.08}
      >
        <span className="services-split-item__icon">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <span className="services-split-item__body">
          <span className="services-split-item__number">{numeral}</span>
          <span className="services-split-item__title">{service.shortTitle || service.title}</span>
          <span className="services-split-item__desc">{service.description}</span>
        </span>
      </GlassCard>
    </div>
  )
}
```

Then update the GSAP selector at line 44:
```tsx
const items = sectionRef.current!.querySelectorAll('.services-split-item-wrap')
```

Add to `globals.css`:
```css
.services-split-item-wrap {
  display: flex;
  flex-direction: column;
}
```

The `.services-split-col` (which holds these items) already uses `display: flex; flex-direction: column; gap: ...` — so a flex-child wrapper is transparent to layout. If any grid-specific sizing breaks, move the `flex`/`width` properties from `.services-split-item` to `.services-split-item-wrap`.

**Option B — Disable tilt on touch devices (supplementary, do both):**

In `GlassCard.tsx`, add touch detection. The tilt effect has no meaning on a touchscreen. Add near the top of the component:

```tsx
const [isTouchDevice] = useState(() =>
  typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches
)
const effectiveTilt = tilt && !isTouchDevice
```

Then replace all uses of `tilt` with `effectiveTilt`:
- Line 38: `useEffect` dependency `[tilt]` → `[effectiveTilt]`
- Line 38 guard: `if (!effectiveTilt || !innerRef.current || !outerRef.current) return;`
- Line 41 removed (redundant now — the window.matchMedia check is already in the useState)

### 2.3 CSS to add for the wrapper

```css
/* Ensure the wrapper doesn't break the column layout */
.services-split-item-wrap {
  display: flex;
  flex-direction: column;
}
```

---

## 3. Bug 2 — Missing CSS for In-Use Classes

**Critical finding:** Several classes referenced in `.tsx` files have **zero CSS defined** anywhere. They render as completely unstyled HTML.

### 3.1 `services-split-intro` — referenced but unstyled

**File:** `src/components/sections/ServicesGrid.tsx` line 88:
```tsx
<div className="services-split-intro">
  <span>Integrated protection verticals</span>
  <h2>One accountable security partner for every site layer.</h2>
  <p>Choose a single service or combine manpower, surveillance, audits...</p>
</div>
```

This div and its children have **no CSS class anywhere in any CSS file**. Add to `globals.css`:

```css
.services-split-intro {
  max-width: 1400px;
  margin: 0 auto clamp(2rem, 4vw, 3rem);
  padding: 0 clamp(1.5rem, 4vw, 3rem);
}

.services-split-intro span {
  display: block;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(20, 16, 13, 0.5);
  margin-bottom: 0.75rem;
}

.services-split-intro h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.02em;
  color: var(--color-paper-ink);
  text-transform: uppercase;
  margin-bottom: 1rem;
  max-width: 800px;
}

.services-split-intro p {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(20, 16, 13, 0.65);
  max-width: 640px;
}

/* On mobile, match the background */
@media (max-width: 900px) {
  .services-split-intro {
    background: var(--color-paper);
    padding-top: 1rem;
  }
}
```

### 3.2 `home-command-*`, `home-coverage-*`, `home-response-*`, `home-section-*` classes

**File:** `src/app/HomePageClient.tsx` — these are all referenced but have **no CSS** anywhere:
- `home-command-section`, `home-command-grid`, `home-command-copy`
- `home-section-kicker`, `home-section-title`, `home-section-copy`
- `home-command-actions`, `home-command-link`, `home-command-link--muted`
- `home-command-panels`, `home-command-card`, `home-command-card__icon`
- `home-command-card__label`, `home-command-card__value`, `home-command-card__text`
- `home-coverage-section`, `home-coverage-map`, `home-coverage-map__scan`
- `home-coverage-pin`, `home-coverage-pin--1` through `--6`
- `home-coverage-copy`, `home-coverage-tags`
- `home-response-strip`, `home-response-step`

Add ALL of these to `globals.css`:

```css
/* ============================================
   Home — Command Section
   ============================================ */

.home-command-section {
  background: var(--color-midnight);
  padding: clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem);
}

.home-command-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
}

@media (max-width: 768px) {
  .home-command-grid {
    grid-template-columns: 1fr;
  }
}

.home-command-copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.home-section-kicker {
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
}

.home-section-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.02em;
  color: var(--color-cream);
  text-transform: uppercase;
}

.home-section-copy {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(244, 241, 234, 0.65);
  max-width: 540px;
}

.home-command-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.home-command-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold);
  text-decoration: none;
  transition: opacity 0.2s;
}

.home-command-link:hover {
  opacity: 0.8;
}

.home-command-link--muted {
  color: rgba(244, 241, 234, 0.5);
}

.home-command-panels {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.home-command-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: default;
}

.home-command-card__icon {
  color: var(--color-gold);
  margin-bottom: 0.25rem;
}

.home-command-card__label {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-horizon-500);
}

.home-command-card__value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-cream);
  line-height: 1;
}

.home-command-card__text {
  font-family: var(--font-body);
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(244, 241, 234, 0.5);
}

/* ============================================
   Home — Coverage Section
   ============================================ */

.home-coverage-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem);
  align-items: center;
  background: var(--color-midnight-950);
}

@media (max-width: 768px) {
  .home-coverage-section {
    grid-template-columns: 1fr;
  }
}

.home-coverage-map {
  position: relative;
  aspect-ratio: 4/3;
  background: rgba(191, 149, 63, 0.03);
  border: 1px solid rgba(191, 149, 63, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

.home-coverage-map__scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(212, 175, 55, 0.05) 60%, transparent);
  animation: scanPulse 4s ease-in-out infinite;
}

@keyframes scanPulse {
  0%, 100% { opacity: 0.3; transform: translateY(-10%); }
  50% { opacity: 0.8; transform: translateY(10%); }
}

.home-coverage-pin {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-gold);
  box-shadow: 0 0 0 4px rgba(191, 149, 63, 0.15), 0 0 12px rgba(191, 149, 63, 0.3);
}

.home-coverage-pin--1 { top: 35%; left: 30%; }  /* Jaipur */
.home-coverage-pin--2 { top: 28%; left: 52%; }  /* Delhi NCR */
.home-coverage-pin--3 { top: 32%; left: 18%; }  /* Ahmedabad */
.home-coverage-pin--4 { top: 42%; left: 20%; }  /* Mumbai */
.home-coverage-pin--5 { top: 55%; left: 52%; }  /* Bengaluru */
.home-coverage-pin--6 { top: 40%; left: 40%; }  /* PAN India (central) */

.home-coverage-copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.home-coverage-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.home-coverage-tags span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-gold);
  opacity: 0.7;
}

/* ============================================
   Home — Response Strip
   ============================================ */

.home-response-strip {
  display: flex;
  justify-content: center;
  gap: clamp(1.5rem, 4vw, 4rem);
  padding: clamp(2rem, 4vh, 3rem) clamp(1.5rem, 5vw, 4rem);
  background: linear-gradient(90deg, transparent, rgba(191, 149, 63, 0.04), transparent);
  border-top: 1px solid rgba(191, 149, 63, 0.08);
  border-bottom: 1px solid rgba(191, 149, 63, 0.08);
  flex-wrap: wrap;
}

.home-response-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(244, 241, 234, 0.4);
}

.home-response-step span {
  font-size: 0.65rem;
  opacity: 0.5;
}

.home-response-step strong {
  color: var(--color-gold);
  letter-spacing: 0.04em;
}
```

---

## 4. Bug 3 — Marquee Strip: Direction-Aware Fade & Scroll Smoothness

**Reported:** The black marquee bar (`.trust-marquee-bar`) in the pinned GSAP sequence doesn't fade back cleanly when scrolling up. The "stop" at the transition point is janky.

### 4.1 What's correct

The timeline uses `scrub: 1` (bidirectional) — scrolling up **does** reverse the animation. The marquee bar's animations are driven by scrub, not `toggleActions`, so direction awareness is correct. The jank is a tuning problem.

### 4.2 Current state check

File: `src/components/sections/ScrollExperience.tsx` line 111:
```tsx
scrub: isMobile ? 1.5 : 1,
```

On mobile, `scrub: 1.5` adds 1.5s of smoothing lag to the playhead. Combined with narrow animation windows:
- Marquee fade-in: `0.30 → 0.40` (10% of timeline)
- Marquee rotate/scale wipe: `0.62 → 0.92` (30% of timeline)

Fast scroll reversal can make the playhead skip past or land in between these narrow windows, causing the visible jerk.

### 4.3 Fix — reduce mobile scrub lag

Change line 87–115 to use `gsap.matchMedia()` with different scrub values:

```tsx
// At line ~86, replace the single isMobile check with gsap.matchMedia
const mm = gsap.matchMedia()

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Remove the old: const isMobile = window.innerWidth < 768;

  // ... loadTl setup unchanged ...

  // ══════════════════════════════════════════
  // PINNED SCROLL SEQUENCE — with responsive scrub
  // ══════════════════════════════════════════
  // Use gsap.matchMedia for responsive scrub
  ScrollTrigger.normalizeScroll(true)
  
  const scrollMm = gsap.matchMedia()
  
  scrollMm.add('(min-width: 768px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: '+=320%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    // ... ALL timeline keyframes (lines 121–175) go here ...
    // Move the entire timeline setup inside this block
  })
  
  scrollMm.add('(max-width: 767px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: '+=320%',
        scrub: 0.6,  // tighter tracking on mobile
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    // Same timeline keyframes — duplicate is fine, it's gsap.matchMedia's pattern
  })
})
```

**Important:** Do not change the actual keyframe positions (0.05, 0.10, 0.30, 0.62, etc.). Only change the `scrub` value.

### 4.4 Additional check — video scaling

The `getVideoTarget()` function (lines 60–72) always uses `Math.min(scaleX, scaleY)` — pure contain-fit. On mobile, the landscape `16/11` CSS `aspect-ratio` on `.trust-card-light` creates dead space. Line 493 already changes to `3/4` under 900px and `4/5` under 480px. If dead space is still too large, consider reading `dockRect.aspectRatio` dynamically in `getVideoTarget()` and choosing `min` vs `max` based on whether the dock is portrait or landscape:

```ts
// getVideoTarget() — optional enhancement if needed
const getVideoTarget = () => {
  const dockRect = dock.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (dockRect.width === 0) return { scale: 1, x: 0, y: 0 }
  const scaleX = dockRect.width / vw
  const scaleY = dockRect.height / vh
  // On mobile the dock is portrait (3/4 or 4/5), use fill instead of contain
  const isPortraitDock = dockRect.height > dockRect.width
  return {
    scale: isPortraitDock ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY),
    x: (dockRect.left + dockRect.width / 2) - vw / 2,
    y: (dockRect.top + dockRect.height / 2) - vh / 2,
  }
}
```

**Flag as optional.** Test on real device before committing — `max` instead of `min` means the video may crop differently.

---

## 5. Bug 4 — Orphan CSS Selector

### 5.1 `#morph-video-dock` has no style block

**File:** `src/app/globals.css` line 411:
```css
/* ponytail: video sits on top of the dock — play button redundant, hide it */
#morph-video-dock
```

This selector has no `{ ... }` block — it's a dangling selector with no styles. It's harmless (parsed as an invalid rule and skipped by the browser), but it's sloppy. Either:

**Option A — Remove it:**
```css
/* Remove line 411 entirely, and the comment above it */
```

**Option B — Use it properly if you want to hide the native play button:**
```css
#morph-video-dock::-webkit-media-controls {
  display: none !important;
}
```

Recommend Option A — just delete the line and the `/* ponytail: ... */` comment above it.

---

## 6. Feature 5 — Footer Red Glass (Verify & Enhance)

### 6.1 Current state

The `.footer-glass-red` utility is already defined at `globals.css` lines 3939–3946:
```css
.footer-glass-red {
  background: rgba(140, 31, 50, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(204, 34, 34, 0.2);
  box-shadow: inset 0 1px 10px rgba(204, 34, 34, 0.05);
}
```

And `Footer.tsx` line 32 already applies it:
```tsx
<footer className={`${styles['site-footer']} footer-glass-red`} id="contact">
```

### 6.2 Text contrast check needed

The footer text colors were tuned for the original dark background (`#050505`). Against the red-tinted glass (`rgba(140, 31, 50, 0.15)` over `#050505`), the effective background is a very dark maroon (~#0D0508). This should still have good contrast with:
- `.footer-link` color: `rgba(244, 241, 234, 0.45)` - should pass
- `.footer-heading` color: `var(--color-gold)` - will pass
- `.footer-legal-link` color: `var(--color-horizon-400)` - borderline

**No CSS change needed right now, but flag for visual review on real device.** If contrast fails, adjust `.footer-link` to `rgba(244, 241, 234, 0.6)`.

---

## 7. Cleanup — Dead CSS Removal

**Method:** Every class selector in `globals.css` was checked against `.tsx`/`.ts` files. Re-verify immediately before deleting:
```bash
grep -rlP "(?<![\w-])CLASSNAME(?![\w-])" --include="*.tsx" --include="*.ts" src/
```
No output = confirmed dead.

### 7.1 Homepage services — old naming (dead since services-split-* was introduced)

Selectors:
```
.services-header  .services-eyebrow  .services-title  .services-title--outline
.services-divider  .services-subcopy  .services-inner  .service-card:hover
```

Lines: ~770–837 in globals.css. Delete the entire `/* ===== Services Content ===== */` section (lines 766–837).

**Exception:** `.services-title--outline` and `.services-subcopy` are dead on homepage but NOT dead if used elsewhere. Re-verify with grep.

### 7.2 Industries listing page — superseded by services-comic-* grid

The `/industries` page uses `services-comic-container/-grid/-panel` (same as `/services`). Dead:
```
.industries-grid  .industry-card-wrapper  .industry-card  .industry-card__title
.industry-card__desc  .industry-card__cta
.industry-challenges-list  .industry-services-grid
```

Lines: ~1595–1649, ~3336–3363, ~3606–3663. Delete the first `.industries-grid` block (1595–1649) and the `.industry-card-wrapper` / second `.industry-card` block (3606–3663).

**Do NOT delete** the `.industry-challenge-item` / `.industry-service-link` variants under "Industry detail extras" (~1842–1849) — those ARE used by `/industries/[slug]` page.

### 7.3 Careers — .job-cards wrapper class never wired

`.job-card__title/__meta/__desc` ARE used. `.job-cards` (line 2803–2808) is the container class for the card list — it's referenced nowhere. Delete it.

### 7.4 Contact page — .contact-page-hero

Line 1732–1736. The contact page uses `.page-hero` instead. Delete `.contact-page-hero`.

### 7.5 ScrollReveal base classes — never applied by component

`ScrollReveal.tsx` applies classes via `props.className` only, never `.scroll-reveal` as a base:
```
.scroll-reveal  .scroll-reveal--delay-1  .scroll-reveal--delay-2
.scroll-reveal--delay-3  .scroll-reveal--delay-4  .char-reveal
```

Lines: ~986–1018. **BUT**: `.char-reveal` is used by `SplitTextReveal.tsx` — verify before deleting. `.scroll-reveal.is-visible` might be used by IntersectionObserver logic.

Re-verify every one of these before deleting.

### 7.6 Tag chip — never referenced

`.tag-chip` (lines 2856–2868) — not referenced in any component. Delete.

### 7.7 Gradient text gold — superseded

`.gradient-text-gold` (lines 963–969) — `GradientText.tsx` only applies `.gradient-text` + passed className. Delete.

### 7.8 Header WhatsApp button — unused

`.header-whatsapp-btn` and `.header-whatsapp-label` (lines 2967–2997) — `Header.tsx` uses `.hero-nav-cta` (MagneticButton) instead. Delete.

### 7.9 Hero left rails — superseded

`.hero-left-rails` (lines 1908–1919, then again at 2198–2208 in media query) — fully styled but the actual components use `.hero-tagline-stack` / `.vertical-text-wrapper` as direct children. Delete both occurrences.

**BUT re-check ScrollExperience.tsx** — if `hero-left-rails` class is applied anywhere in the JSX (it's not as of current audit), leave it. If not found, delete.

### 7.10 Hero trust micro — unused

`.hero-trust-micro` and `.hero-trust-sep` (lines 2038–2059) — not in any component. Delete.

### 7.11 Panel-span-3x2 — unused

`.panel-span-3x2` (line 2536 and first occurrence at ~2535) — not in the `spanClasses` map in `industries/page.tsx`. Delete all occurrences.

### 7.12 Summary of deletion targets

| Selector(s) | Lines | Status |
|---|---|---|
| `.services-header` to `.service-card:hover` | 766–837 | Dead (homepage only, superseded) |
| `.industries-grid` + children | 1595–1649 | Dead (superseded by comic grid) |
| `.industry-card-wrapper` + second `.industry-card` | 3606–3663 | Dead |
| `.job-cards` | 2803–2808 | Dead |
| `.contact-page-hero` | 1732 | Dead (uses page-hero instead) |
| `.scroll-reveal`, `.char-reveal` | 986–1018 | **Verify before delete** |
| `.tag-chip` | 2856–2868 | Dead |
| `.gradient-text-gold` | 963–969 | Dead |
| `.header-whatsapp-btn`, `.header-whatsapp-label` | 2967–2997 | Dead |
| `.hero-left-rails` (both occurrences) | 1908–1919, 2198–2208 | Dead |
| `.hero-trust-micro`, `.hero-trust-sep` | 2038–2059 | Dead |
| `.panel-span-3x2` (both occurrences) | ~2535, 2536 | Dead |
| `#morph-video-dock` orphan | 411 | Dead selector, no block |

---

## 8. Cleanup — Duplicate CSS Consolidation

The following classes appear multiple times (non-adjacently) in `globals.css`. Earlier copies are overridden by later ones since specificity is equal.

### 8.1 Footer block — fully duplicated

Lines 1024–1208 (first footer) and lines in `Footer.module.css` (second). The CSS module (`Footer.module.css`) is what actually applies due to CSS modules' scoping. **The entire footer block in `globals.css` lines 1024–1208 is dead code.** Delete it.

### 8.2 Breadcrumb — diverged

First occurrence at lines 1320–1338 (`hover: color: var(--color-cream)`). Second at lines 2919–2938 (`hover: color: var(--color-gold)`). The second (gold hover) is currently live. **Decide intentionally** which hover behavior you want, keep only that copy, delete the other.

### 8.3 Service detail blocks — fully duplicated wholesale

First: lines 1355–1521. Second: lines 3000–3268 with expanded/enhanced styles. The second is live. **Delete the first block.**

### 8.4 Page-eyebrow — diverged

First: lines 1305–1318 (simple `display: flex`). Second: lines 2943–2962 (adds `::before` pseudo-element). The second is live and enhanced. **Delete the first.**

### 8.5 Panel-span classes — byte-identical

`.panel-span-1x1/1x2/2x1/2x2/3x2` at lines ~2530–2536 (in globals.css) and again in `ServicesGrid.module.css` (~73–78). The module.css is what applies to `/services` and `/industries` pages. **Delete the globals.css copy** of just the span classes.

### 8.6 Industry hero — two identical declarations

`.industries-hero` at lines 1374–1385 (as part of `.service-detail-hero, .industry-detail-hero, ...`) and again at lines 2881–2886. Second has different padding, but they're not identical — keep both if intentional, or consolidate into one.

### 8.7 Services comic section — split across globals.css and module.css

First: lines 2519–2602 in globals.css. Second: entire `ServicesGrid.module.css` file. The module.css is what applies. **Delete the globals.css copy of `.services-comic-*` classes** (lines 2519–2602).

---

## 9. Refactor — CSS File Split into Modules

**Do this LAST**, after Sections 7 and 8 are complete. Splitting a clean file is much safer.

### 9.1 New file structure

```
src/styles/
├── tokens.css              /* Design tokens (colors, fonts, easings from @theme) */
├── reset.css               /* Global Resets + safe-areas + selection + focus-visible */
├── utilities.css           /* .mesh-bg, .glass-panel, .glass-header, .glass-card,
                               .glass, .gradient-text, .footer-glass-red, .grain-overlay */
├── animations.css          /* @keyframes (scrollPulse, marqueeScroll, meshPan, noiseShift,
                               float-particle, scanPulse) + .scroll-reveal + .char-reveal */
├── layout/
│   ├── header.css          /* .hero-header, .hero-nav, .mobile-nav, .scroll-progress,
                               .header-whatsapp-btn (before deletion) */
│   └── footer.css          /* Footer (single copy from Footer.module.css) */
├── components/
│   ├── glass-card.css      /* .glass-card standalone (currently inline in GlassCard.tsx) */
│   ├── marquee.css         /* .marquee, .marquee--dark + .marquee__track/item/dot */
│   ├── breadcrumb.css      /* single de-duplicated copy */
│   ├── tag-chip.css        /* .tag-chip (before deletion if kept) */
│   ├── job-card.css        /* .job-card, .job-card__title/meta/desc/cards */
│   ├── blog-card.css       /* .blog-card + children */
│   └── hero-particles.css  /* .hero-particles + .hero-particle + @keyframes */
├── sections/
│   ├── hero.css            /* .scroll-wrapper, .scroll-bg, .morph-video, .hero-overlay,
                               .hero-right-zone, .hero-left-panel + children,
                               .laser-lines-container, .scroll-cue-ring, .flare-line,
                               .hero-tagline-stack, .hero-bottom-tagline,
                               .hero-vertical-laser-line, .hero-horizontal-laser-line,
                               ALL hero media queries */
│   ├── trust.css           /* .trust-dot-grid, .trust-left-rail, .trust-scroll-content,
                               .trust-grid, .trust-card-light + children,
                               .trust-marquee-bar + children, .scroll-bg-warm */
│   ├── services-home.css   /* .services-split-section + children (the homepage grid) */
│   └── home-sections.css   /* .home-command-*, .home-coverage-*, .home-response-*
                               (newly added in Section 3) */
├── pages/
│   ├── about.css           /* .about-*, .about-stats, .about-story, .about-why,
                               .about-certs, .about-timeline */
│   ├── contact.css          /* .contact-* (title, cards, offices, form) */
│   ├── careers.css          /* (minimal, most classes in components/) */
│   ├── service-detail.css   /* .service-detail-*, single de-duplicated copy */
│   ├── industry-detail.css  /* .industry-detail-*, .industry-challenge-* */
│   ├── industries-listing.css /* Any remaining industries listing styles */
│   ├── services-listing.css  /* .services-page-* (grid, cards) */
│   ├── seo-pages.css        /* .seo-* classes */
│   └── legal.css            /* .legal-content + .breadcrumb (de-duplicated) */
└── shared/
    └── page-hero.css        /* .page-hero, .page-eyebrow, .page-hero--short,
                               .service-detail-hero (shared base) */
```

### 9.2 Wiring (Next.js, zero component changes)

`src/app/globals.css` becomes an index file of `@import` statements:

```css
@import "tailwindcss";

/* Order matters — tokens first, then reset, then utilities, then everything else */
@import "../../styles/tokens.css";
@import "../../styles/reset.css";
@import "../../styles/utilities.css";
@import "../../styles/animations.css";

/* Layout */
@import "../../styles/layout/header.css";
@import "../../styles/layout/footer.css";

/* Components */
@import "../../styles/components/marquee.css";
@import "../../styles/components/breadcrumb.css";
@import "../../styles/components/job-card.css";
@import "../../styles/components/blog-card.css";
@import "../../styles/components/hero-particles.css";

/* Sections */
@import "../../styles/sections/hero.css";
@import "../../styles/sections/trust.css";
@import "../../styles/sections/services-home.css";
@import "../../styles/sections/home-sections.css";

/* Pages */
@import "../../styles/pages/about.css";
@import "../../styles/pages/contact.css";
@import "../../styles/pages/service-detail.css";
@import "../../styles/pages/industry-detail.css";
@import "../../styles/pages/services-listing.css";
@import "../../styles/pages/industries-listing.css";
@import "../../styles/pages/seo-pages.css";
@import "../../styles/pages/legal.css";

/* Shared */
@import "../../styles/shared/page-hero.css";
```

`src/app/layout.tsx` still just does `import './globals.css'`. Next.js inlines `@import` at build time — no extra HTTP requests.

### 9.3 What to do with Footer.module.css and ServicesGrid.module.css

After the file-split, these CSS modules contain styles that overlap with the split files. **Migrate their content** into the appropriate `src/styles/` files:
- `Footer.module.css` → `src/styles/layout/footer.css`
- `ServicesGrid.module.css` → `src/styles/sections/services-comic.css` (it's the `/services` and `/industries` listing grid, not the homepage services grid)

After migrating, **remove** `Footer.module.css` and `ServicesGrid.module.css` and update their component imports. In `Footer.tsx`, change:
```tsx
import styles from './Footer.module.css'
// becomes
```
And replace all `styles['site-footer']` with just `"site-footer"`, etc.

Same for `ServicesGrid.tsx`:
```tsx
import styles from './ServicesGrid.module.css'
// Remove import
// Replace all styles.xxx references with plain class names
```

This is the most mechanically risky part — each `styles.foo` becomes a plain `"foo"` string, and if the class doesn't exist in the global CSS file yet, the split is broken. **Test with `npm run build` before committing.**

---

## 10. Final Acceptance Checklist

- [ ] **Build passes:** `npm run build` completes with zero errors.
- [ ] **Hero mobile:** On a real phone, "SILBAR SECURITY" wordmark is visible, no red line crosses tagline text.
- [ ] **Trust dock:** Video dock has minimal dead space — aspect ratio looks intentional, not broken.
- [ ] **Marquee bar:** WhatsApp/Call buttons do not overlap the black marquee strip.
- [ ] **Services grid:** All 12 cards render with icon, number, title, description — none are blank frames.
- [ ] **Home sections:** `.home-command-*`, `.home-coverage-*`, `.home-response-*` are visually styled (Section 3).
- [ ] **Marquee smoothness:** Scroll down through hero → trust → marquee, then scroll back up. Bar fades/reverses smoothly in both directions.
- [ ] **Sticky scroll:** No stutter at pin boundaries during scroll.
- [ ] **Footer:** Red glass treatment applied and text is legible.
- [ ] **Dead code:** All classes in Section 7 verified with `grep` before deletion and removed.
- [ ] **Duplicates:** All duplicate blocks in Section 8 consolidated.
- [ ] **File split:** After Sections 7–8 cleanup, the split in Section 9 produces a working build. No CSS rule silently dropped due to `@import` ordering.
- [ ] **No design drift:** Color palette, typography, spacing, animation timing, and GSAP choreography are unchanged from original.

---

## Appendix — Quick Reference: Line Ranges in Current globals.css

| Section | Lines | Status |
|---|---|---|
| Design tokens (`@theme`) | 1–50 | KEEP |
| Global resets | 52–76 | KEEP |
| Glass utilities | 78–133 | KEEP |
| Scroll wrapper / trust scroll | 135–174 | KEEP (move to sections/) |
| Hero header + nav + mobile nav | 176–392 | KEEP (move to layout/) |
| Morph video | 394–411 | KEEP (fix orphan #morph-video-dock) |
| Hero overlay | 413–428 | KEEP (move to sections/hero) |
| Hero tagline | 430–442 | KEEP |
| Trust content (grid, card, marquee) | 444–764 | KEEP (move to sections/trust) |
| ~~Services content (OLD)~~ | ~~766–837~~ | **DELETE (Section 7.1)** |
| Marquee ticker | 839–891 | KEEP (move to components/marquee) |
| Flare lines | 893–926 | KEEP (move to sections/hero) |
| Grain overlay | 928–957 | KEEP (move to utilities) |
| ~~.gradient-text-gold~~ | ~~959–969~~ | **DELETE (Section 7.7)** |
| .glass utility | 971–980 | KEEP (move to utilities) |
| ~~Scroll reveal~~ | ~~982–1018~~ | **DELETE (Section 7.5)** [verify first] |
| ~~Footer (first copy)~~ | ~~1020–1208~~ | **DELETE (Section 8.1)** |
| sticky-cta | 1210–1268 | KEEP (move to layout/) |
| Focus / Selection / Safe areas | 1270–1299 | KEEP (move to reset) |
| Page-eyebrow (first copy) | 1301–1339 | **DELETE (Section 8.4)** |
| ~~Service detail (first copy)~~ | ~~1341–1521~~ | **DELETE (Section 8.3)** |
| Services listing grid | 1523–1593 | KEEP (move to pages/services-listing) |
| ~~Industries grid~~ | ~~1595–1649~~ | **DELETE (Section 7.2)** |
| SEO pages + Contact + Contact offices | 1651–1857 | KEEP (move to pages/) |
| Hero redesign (main block) | 1858–2287 | KEEP (move to sections/hero) |
| Services diagonal split section | 2289–2517 | KEEP (move to sections/services-home) |
| ~~Services comic (globals.css copy)~~ | ~~2519–2602~~ | **DELETE (Section 8.7)** |
| Contact form alternative | 2604–2664 | KEEP (move to pages/contact) |
| ~~SEO city tags / section broken~~ | ~~2666–2685~~ | **Fix broken CSS** (line 2669 missing selector) |
| Page hero unified | 2687–2699 | KEEP (move to shared/page-hero) |
| Legal / blog content | 2701–2770 | KEEP (move to pages/legal) |
| Job card | 2772–2808 | KEEP (move to components/job-card) [del .job-cards] |
| Blog card | 2810–2851 | KEEP (move to components/blog-card) |
| ~~.tag-chip~~ | ~~2853–2868~~ | **DELETE (Section 7.6)** |
| ScrollPulse keyframes | 2870–2876 | KEEP (move to animations) |
| Services/industries hero (second) | 2878–2907 | KEEP (consolidate with first) |
| `html, body { overflow-x: hidden }` | 2909–2914 | KEEP (move to reset) |
| Breadcrumb (second copy) | 2916–2938 | KEEP (delete first, Section 8.2) |
| Page-eyebrow (second copy) | 2940–2962 | KEEP (delete first, Section 8.4) |
| ~~Header whatsapp~~ | ~~2964–2997~~ | **DELETE (Section 7.8)** |
| Service detail (second, expanded) | 2999–3268 | KEEP (delete first, Section 8.3) |
| Industry detail | 3270–3363 | KEEP (move to pages/industry-detail) |
| About page | 3365–3604 | KEEP (move to pages/about) |
| ~~Industry card (second copy)~~ | ~~3606–3663~~ | **DELETE (Section 7.2)** |
| Mobile service/industry detail resp. | 3665–3694 | KEEP (move to pages/service-detail) |
| Detail layout container | 3696–3779 | KEEP (move to pages/service-detail) |
| About timeline | 3781–3900 | KEEP (move to pages/about) |
| Hero particles | 3902–3925 | KEEP (move to sections/hero or components) |
| .gradient-text base | 3927–3931 | KEEP (move to utilities) |
| `.services-split-col--right` margin | 3933–3937 | KEEP (move to sections/services-home) |
| `.footer-glass-red` | 3939–3946 | KEEP (move to utilities) |
