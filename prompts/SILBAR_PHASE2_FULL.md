# SILBAR SECURITY — PHASE 2 COMPLETE: Research + Audit + Exact Code Patches

> **Author:** AI Audit Engine  
> **Date:** 2026-07-08  
> **Repo:** `Prachi-Agarwal211/silabar-security` (main branch, 11 commits)  
> **Goal:** One file with all research, all bug findings, and exact line-level code patches

---

## TABLE OF CONTENTS

1. [Real Company Research (Internet-Verified)](#1-real-company-research)
2. [Full Codebase Audit — 30 Issues Found](#2-full-codebase-audit)
3. [Design Token System (CSS Variables)](#3-design-token-system)
4. [Global CTA Fix — Kill All Form-Routing](#4-global-cta-fix)
5. [Header/Hero Text Fixes (Vertical, Bottom-Anchor, Scrim)](#5-headerhero-fixes)
6. [Scroll Speed Adjustment](#6-scroll-speed-adjustment)
7. [Services Section — Comic-Panel Grid Rebuild](#7-services-section-rebuild)
8. [Device / Hover Matrix (Laptop, Mobile, Mac)](#8-device--hover-matrix)
9. [CSS Deduplication — Remove ~1400 Lines of Duplicate CSS](#9-css-deduplication)
10. [Content & SEO Updates (Real Addresses, Founding Year Fix)](#10-content--seo-updates)
11. [Missing Pages — Create 4 New Routes](#11-missing-pages)
12. [Footer — Dynamic Links from Data, Not Hardcoded](#12-footer-fixes)
13. [Dead Code — Remove 3 Unused Components](#13-dead-code-removal)
14. [Full File Checklist (28 Files)](#14-full-file-checklist)

---

## 1. REAL COMPANY RESEARCH

### 1.1 Client Identity

| Field | Value |
|-------|-------|
| **Legal Name** | Silbar Security Services Pvt. Ltd. |
| **Website** | `https://www.silbarsecurity.in` |
| **CIN** | U80100DL2025PTC457067 (Registered 22 Oct 2025, ROC Delhi) |
| **PSARA** | Licensed under PSARA 2005 |
| **ISO** | Claims ISO 9001:2015 (public listings mention ISO 9001:2008 — verify) |
| **MSME** | Registered |
| **Officers** | 7,000+ licensed security personnel |
| **Coverage** | PAN India — Jaipur (HQ), Delhi, Ahmedabad, 200+ cities |

### 1.2 Verified Office Addresses (from Sulekha, Justdial, MeraJaipur)

| Office | Address |
|--------|---------|
| **Registered/**City Center | 208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001 |
| **Corporate** | 208, 2nd Floor, Vaishali Tower, Nursery Circle, Jaipur — 302021 |
| **Head Office** | G-1, Civil Residency, Parth Sarthi Flats, Vaishali Prime, Gandhi Path, Jaipur |
| **Other branch** | 33, Central Spine, Vidhyadhar Nagar, Jaipur |
| **Bhiwadi** | Bhiwadi Industrial Area, Rajasthan |
| **Bhilwara** | Bhilwara, Rajasthan |

**⚠️ Current codebase uses placeholder `"Head Office Address"` in JSON-LD and contact page — replace with real addresses.**

### 1.3 Verified Phone Numbers

| Source | Number | Notes |
|--------|--------|-------|
| Codebase (current) | `+91 93523 03333` | ✅ Keep this — client's current number |
| Codebase (current) | `+91-141 222 3334` | ✅ Keep — Jaipur landline |
| Old directories | `1800-103-0347` | ❌ Old — do NOT use |
| Old directories | `9828460123` | ❌ Old — do NOT use |
| MeraJaipur | `+919152909768` | ❌ Different — do NOT use |

### 1.4 Founding Year Conflict ⚠️

| Source | Claim |
|--------|-------|
| Hero text (`ScrollExperience.tsx`) | `EST. 2005` |
| FreeListingIndia | "established in 2018" |
| JSON-LD (`layout.tsx`) | `foundingDate: '2008'` |

**Action:** Confirm with client. The three different years (2005, 2008, 2018) may refer to: company founding, PSARA license issuance, and Private Limited incorporation respectively. Pick ONE for the website and align it everywhere.

### 1.5 ISO Certificate Conflict ⚠️

| Source | Claim |
|--------|-------|
| Codebase | ISO 9001:2015 |
| FreeListingIndia | ISO 9001:2008 (superseded standard) |

**Action:** Ask client for actual certificate before publishing. Publishing 2015 when certificate says 2008 is a factual compliance claim issue.

### 1.6 Services Confirmed (from real directories)

- ✅ PSARA-licensed manned guarding (armed/unarmed)
- ✅ Lady guards / gender-sensitive security
- ✅ Event & VIP security
- ✅ Bank & ATM security (cash-in-transit, bullion escort)
- ✅ Electronic surveillance (CCTV, access control)
- ✅ Security risk assessment & audit
- ✅ **Mechanised Housekeeping** (client's own phrase: "pioneers in Mechanised Housekeeping")
- ✅ Facility management
- ✅ Security training & certification (3-acre training center in Jaipur)
- ✅ Manpower solutions / labour contracting
- ✅ KYC & background verification
- ✅ Fire & life safety services
- ✅ Mobile patrol & quick response

---

## 2. FULL CODEBASE AUDIT — 30 ISSUES FOUND

### 2.1 CRITICAL BUGS

| # | Issue | File:Line | Fix |
|---|-------|-----------|-----|
| **B1** | `seo-page-ctas` CSS class used in JSX but **not defined** in CSS. CTA buttons on GEO pages `security-services/[state]/page.tsx:128` have no `display: flex` / `gap`. | `security-services/[state]/page.tsx:128` / `globals.css` (missing) | Add `.seo-page-ctas` rule OR use existing `.service-detail-ctas` class |
| **B2** | JSON-LD `foundingDate: '2008'` contradicts hero `EST. 2005`. Google indexes BOTH. | `layout.tsx:135` / `ScrollExperience.tsx:221` | Align to one year (confirm with client) |
| **B3** | Google Search Console token is placeholder `'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN'` — site won't verify. | `layout.tsx:89` | Replace with real token |
| **B4** | Placeholder addresses in JSON-LD and contact page. `streetAddress: 'Head Office Address'` and "Office Address, New Delhi". | `layout.tsx:139` / `contact/page.tsx:102-104` | Use real addresses from §1.2 |
| **B5** | Bottom CTA on service detail pages still routes to `/contact` for a "Free Consultation" form — contradicts the global CTA shift. | `services/[slug]/page.tsx:166-168` | Replace with direct WhatsApp/Call |
| **B6** | `MagneticButton.tsx` unconditionally attaches `onMouseMove` — no `pointer: fine` guard. Touch devices pay JS cost. | `MagneticButton.tsx:19-31` | Wrap in `window.matchMedia('(pointer: fine)')` check |
| **B7** | Contact page uses `Shield` icon for WhatsApp card (line 63) instead of `MessageCircle` or WhatsApp SVG. | `contact/page.tsx:63` | Replace with WhatsApp icon |

### 2.2 CSS DUPLICATION (HIGH PRIORITY)

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| **C1** | Entire "Shared Page Layout" CSS block **duplicated**: lines ~1380–2093 AND lines ~2094–2742+. | `globals.css` | ~1400 lines dead weight. Second copy silently overrides first. |
| **C2** | 22+ CSS classes defined but **never used** in any JSX: `services-divider`, `services-eyebrow`, `services-title`, `services-title--outline`, `services-subcopy`, `services-grid`, `services-inner`, `services-header`, `service-card*` (4 classes), `services-scroll-content`, `section-trust-light`, `tagline-line`, `panel-span-2x2`, `panel-span-4x1`, `panel-span-3x1`, `contact-form*` (8 classes) | `globals.css` | Bloat; confusing for maintenance |
| **C3** | `--font-oswald` used in `.services-comic-numeral` CSS (line 3073) but NOT registered in `@theme` block. Works via CSS var but missing from Tailwind theme config. | `globals.css:3073` vs `layout.tsx:19-24` | Add to `@theme` block |

### 2.3 MISSING PAGES (Will 404)

| # | Route | Referenced By |
|---|-------|---------------|
| **M1** | `/careers` | `Footer.tsx:26` |
| **M2** | `/privacy-policy` | `Footer.tsx:135` |
| **M3** | `/terms` | `Footer.tsx:136` |
| **M4** | `/security-services/city/[slug]` | `sitemap.ts:45-50` generates these URLs but no page file exists |

### 2.4 DEAD COMPONENTS (Never Imported)

| # | Component | LOC | Action |
|---|-----------|-----|--------|
| **D1** | `src/components/animations/MagneticButton.tsx` | 49 | DELETE — never used |
| **D2** | `src/components/animations/FloatingElements.tsx` | ~40 | DELETE — never used |
| **D3** | `src/components/animations/Marquee.tsx` | ~30 | DELETE — never used |

### 2.5 FOOTER ISSUES

| # | Issue | File:Line | Fix |
|---|-------|-----------|-----|
| **F1** | `SERVICES_LINKS` hardcodes only 6 of 12 services | `Footer.tsx:4-11` | Generate dynamically from `services.ts` |
| **F2** | `INDUSTRIES_LINKS` hardcodes only 6 of 12 industries | `Footer.tsx:13-20` | Generate dynamically from `industries.ts` |

### 2.6 MINOR ISSUES

| # | Issue | File:Line | Fix |
|---|-------|-----------|-----|
| **N1** | "Get Quote" still in a comment: `{/* Sticky CTAs — WhatsApp + Get Quote */}` | `page.tsx:40` | Update comment |
| **N2** | `SplitTextReveal` `mode='lines'` falls through silently to chars | `SplitTextReveal.tsx:11,55` | Either implement or remove from types |
| **N3** | Contact form "Ready for a Quote?" section uses inline styles (no CSS classes) | `contact/page.tsx:72-93` | Move to CSS classes |
| **N4** | Contact page `<title>` says "Get a Free Security Quote" | `contact/page.tsx:8` | Update to match CTA shift |
| **N5** | Homepage (`page.tsx`) is `'use client'` — can't export metadata. Unique page title/desc missing. | `page.tsx:1` | Either add metadata to layout or split into server/client |

---

## 3. DESIGN TOKEN SYSTEM

### 3.1 Where to Add

**File:** `src/app/globals.css` — inside the existing `@theme` block (after line 27, before `--color-horizon-50`)

### 3.2 Exact Code to Add

```css
  /* === PHASE 2 ADDITIONS === */
  --color-cherry: #8C1F32;        /* solid red FIELD — large backgrounds. Desaturated vs --color-red so it doesn't strain eyes */
  --color-cherry-deep: #5C1220;   /* shadow/depth tone within a cherry panel */
  --color-cherry-bright: #B3273F; /* brighter red — CTAs and hover states only, never a full background */
  --color-paper: #FAF8F4;         /* true white panel background, distinct from --color-cream */
  --color-paper-ink: #14100D;     /* near-black text used ON --color-paper, not pure #000 */
  --color-champagne: #E8DFC8;     /* pale gold-white for the gold/white-mix zone */

  /* Add missing font to theme */
  --font-oswald: var(--font-oswald);
```

> **Already present?** Check lines 21-27. If they exist, skip. If `--font-oswald` is missing, add it after `--font-body`.

---

## 4. GLOBAL CTA FIX — KILL ALL FORM-ROUTING

### 4.1 Header.tsx (Desktop Nav + Mobile Drawer)

**File:** `src/components/layout/Header.tsx`

**Current state:** Already done ✓ — but verify lines 71-78 (desktop CTA) and 115-123 (mobile CTA) use `<a href="https://wa.me/..."` with "WhatsApp Us". The `tel:` link on lines 63-70 and 108-114 should remain.

**If NOT already changed, apply these patches:**

**Line 71 (desktop nav):**
```tsx
// OLD:
<Link href="/contact" className="hero-nav-cta">Get Quote</Link>

// NEW:
<a
  href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services."
  className="hero-nav-cta"
  target="_blank"
  rel="noopener noreferrer"
>
  WhatsApp Us
</a>
```

**Lines 115-123 (mobile drawer):**
```tsx
// OLD:
<Link href="/contact" className="mobile-nav__cta" onClick={() => setMenuOpen(false)}>Get Free Quote</Link>

// NEW:
<a
  href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services."
  className="mobile-nav__cta"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setMenuOpen(false)}
>
  WhatsApp Us
</a>
```

### 4.2 page.tsx (Sticky CTA)

**File:** `src/app/page.tsx`

**Current:** Already uses `sticky-cta__call` with "Call Now" — verify.

**If NOT changed:** Replace `sticky-cta__quote` with `sticky-cta__call`:
```tsx
// OLD:
<Link href="/contact" className="sticky-cta__quote" id="sticky-quote-btn">Get Quote</Link>

// NEW:
<a href="tel:+919352303333" className="sticky-cta__call" id="sticky-call-btn">Call Now</a>
```

Also update the comment on line 40:
```tsx
// OLD:
{/* Sticky CTAs — WhatsApp + Get Quote */}
// NEW:
{/* Sticky CTAs — WhatsApp + Call */}
```

### 4.3 Footer.tsx

**File:** `src/components/layout/Footer.tsx`

**Current:** Already done — verify COMPANY_LINKS has no "Get Quote" entry. WhatsApp link exists as `<li>` at lines 116-125.

**If NOT changed:**

Remove from `COMPANY_LINKS` array:
```tsx
// OLD:
const COMPANY_LINKS = [
  { label: 'About Silbar', href: '/about' },
  { label: 'Why Silbar', href: '/about#why-silbar' },
  { label: 'Certifications', href: '/about#certifications' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get Quote', href: '/contact#quote' },  // ← REMOVE THIS
]

// NEW:
const COMPANY_LINKS = [
  { label: 'About Silbar', href: '/about' },
  { label: 'Why Silbar', href: '/about#why-silbar' },
  { label: 'Certifications', href: '/about#certifications' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]
```

Then after the `COMPANY_LINKS.map(...)` block (around line 115), add:
```tsx
<li>
  <a
    href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services."
    className="footer-link footer-link--whatsapp"
    target="_blank"
    rel="noopener noreferrer"
  >
    WhatsApp Us
  </a>
</li>
```

### 4.4 services/[slug]/page.tsx

**File:** `src/app/services/[slug]/page.tsx`

**Current:** Hero CTAs are correct (dynamic WhatsApp with `service.shortTitle`). **BUT** bottom CTA on lines 166-168 still routes to `/contact`:

```tsx
// OLD (lines 166-168):
<Link href="/contact" className="service-detail-cta service-detail-cta--primary">
  Request Free Consultation <ArrowRight size={16} />
</Link>

// NEW:
<div className="service-detail-ctas" style={{ justifyContent: 'center' }}>
  <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
    <Phone size={16} /> Call Now
  </a>
  <a
    href={`https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20${encodeURIComponent(service.shortTitle)}.`}
    className="service-detail-cta service-detail-cta--secondary"
    target="_blank"
    rel="noopener noreferrer"
  >
    WhatsApp Us
  </a>
</div>
```

Also add `Phone` to the lucide-react import if not present, and remove `ArrowRight` if no longer used:
```tsx
// Check: ArrowRight is only used in the bottom CTA. If bottom CTA is changed as above, remove ArrowRight from import.
import { CheckCircle, Phone } from 'lucide-react'  // ← removed ArrowRight
```

### 4.5 industries/[slug]/page.tsx

**File:** `src/app/industries/[slug]/page.tsx`

**Current:** Already done ✓ — lines 79-91 have "Call Now" + "WhatsApp Us".

### 4.6 security-services/[state]/page.tsx

**File:** `src/app/security-services/[state]/page.tsx`

**Current:** CTA buttons are correct (lines 128-140). **BUT** the wrapper div uses `className="seo-page-ctas"` which has **no CSS definition**:

```tsx
// Current (line 128):
<div className="seo-page-ctas">

// FIX: Change to use existing defined class:
<div className="service-detail-ctas">
```

### 4.7 CSS Rename (if applicable)

**File:** `src/app/globals.css` — search for `.sticky-cta__quote`:
- If it exists, rename to `.sticky-cta__call`
- If only `.sticky-cta__call` exists (as in current codebase), do nothing

### 4.8 Contact Page Title

**File:** `src/app/contact/page.tsx`

```tsx
// OLD (line 8):
title: 'Contact Us — Get a Free Security Quote',

// NEW:
title: 'Contact Us — Call or WhatsApp Silbar Security',
```

---

## 5. HEADER/HERO FIXES

### 5.1 Header Scrim Background

**File:** `src/app/globals.css` — `.hero-header` rule (line 119-132)

**Current:** Already has the gradient scrim ✓:
```css
background: linear-gradient(to bottom, rgba(5, 5, 5, 0.85) 0%, rgba(5, 5, 5, 0.5) 60%, transparent 100%);
```

**If NOT present,** replace the old rule (which may have no `background` or a simpler one):
```css
.hero-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 5vw, 4rem);
  padding-bottom: 2rem;
  background: linear-gradient(to bottom, rgba(5, 5, 5, 0.85) 0%, rgba(5, 5, 5, 0.5) 60%, transparent 100%);
  transition: transform 0.5s var(--ease-smooth), opacity 0.5s var(--ease-smooth), background 0.4s var(--ease-smooth);
}
```

### 5.2 Hero Left Panel — Vertical Text Bottom-Anchor

**File:** `src/app/globals.css`

**`.hero-left-panel` (line 2765-2782):**
```css
/* OLD justify-content and padding: */
  justify-content: space-between;
  padding: clamp(2rem, 3vw, 4rem) clamp(1.5rem, 2.5vw, 3rem);

/* NEW: */
  justify-content: flex-end;
  padding: clamp(1rem, 2vw, 2rem) clamp(1.5rem, 2.5vw, 3rem) clamp(3rem, 6vh, 6rem);
```

**`.vertical-text-wrapper` (line 2791-2799):**
```css
/* OLD: */
  justify-content: space-between;

/* NEW: */
  justify-content: flex-end;
  gap: 1.5rem;
  margin-top: auto;
```

**`.hero-badge-container` (line 2830-2834):**
```css
/* OLD: */
  margin-right: auto;

/* NEW: */
  margin-right: 0;
  margin-top: auto;
```

---

## 6. SCROLL SPEED ADJUSTMENT

### 6.1 ScrollExperience.tsx

**File:** `src/components/sections/ScrollExperience.tsx`

**Line 107 (inside `scrollTrigger` config):**
```tsx
// OLD:
end: '+=400%', // Reduced from 550% since we removed Act 3 (services)

// NEW:
end: '+=320%', // Tightened from 400% for faster scroll feel — do not go below 280%
```

Currently this is already at `+=320%` in the codebase ✓. If it's still at 400%, change it.

---

## 7. SERVICES SECTION REBUILD

### 7.1 Current State Assessment

**What exists:**
- `ServicesGrid.tsx` — component with GSAP clipPath animation, uses span classes
- `globals.css` lines 3008-3133 — `.services-comic-*` CSS block
- ServicesGrid renders: `<section className="services-comic-section">` → `<div className="services-comic-container">` → `<div className="services-comic-grid">` → panels

**What's MISSING from the component:**
- No header block (eyebrow + "12 SERVICES. ONE FORCE." title + divider)
- GSAP animation uses uniform `inset(100% 0% 0% 0%)` instead of alternating left/right clipPath
- No `@media (hover: hover)` guards on hover states
- No `services-comic-header` CSS class at all

### 7.2 Add Missing Header to ServicesGrid.tsx

**File:** `src/components/sections/ServicesGrid.tsx`

**Add header between `<section>` and grid container:**

```tsx
// Insert after line 67 (<section className="services-comic-section">) and before line 68 (<div className="services-comic-container" ref={containerRef}>):

<section className="services-comic-section">
  {/* ↓↓ ADD THIS BLOCK ↓↓ */}
  <div className="services-comic-container">
    <div className="services-comic-header">
      <span className="services-eyebrow">COMPLETE SECURITY &amp; FACILITY MANAGEMENT</span>
      <h2 className="services-title">
        12 SERVICES. <span className="services-title--outline">ONE FORCE.</span>
      </h2>
      <span className="services-divider" />
    </div>
  </div>
  {/* ↑↑ END OF ADDED BLOCK ↑↑ */}
  <div className="services-comic-container" ref={containerRef}>
    <div className="services-comic-grid">
```

### 7.3 Add Missing CSS for services-comic-header

**File:** `src/app/globals.css`

Add after `.services-comic-container` (after line 3021):

```css
.services-comic-header {
  text-align: center;
  margin-bottom: clamp(2.5rem, 5vh, 4rem);
}

.services-comic-header .services-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-champagne);
  margin-bottom: 0.75rem;
  opacity: 0.85;
}

.services-comic-header .services-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.02em;
  color: var(--color-paper);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.services-comic-header .services-title--outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--color-paper);
  text-stroke: 1.5px var(--color-paper);
}

@supports not (-webkit-text-stroke: 1px black) {
  .services-comic-header .services-title--outline {
    color: var(--color-paper);
    opacity: 0.35;
  }
}

.services-comic-header .services-divider {
  display: block;
  width: 72px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold-light));
  margin: 0 auto;
}
```

### 7.4 Fix GSAP Animation (Alternating ClipPath)

**File:** `src/components/sections/ServicesGrid.tsx`, inside the `useEffect` (lines 17-45):

**Current:**
```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top 75%',
  },
})

const panels = containerRef.current!.querySelectorAll('.services-comic-panel')

tl.fromTo(
  panels,
  { clipPath: 'inset(100% 0% 0% 0%)' },
  { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, stagger: 0.1, ease: 'power3.out' }
)
```

**Replace with alternating direction:**
```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top 75%',
  },
})

const panels = containerRef.current!.querySelectorAll('.services-comic-panel')

panels.forEach((panel, i) => {
  const fromLeft = i % 2 === 0
  tl.fromTo(
    panel,
    { clipPath: fromLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.out' },
    i * 0.06
  )
})
```

### 7.5 Fix Hover States with Device Guards

**File:** `src/app/globals.css` — replace lines 3044-3057:

```css
/* Hover State — Desktop only (mouse/trackpad) */
@media (hover: hover) and (pointer: fine) {
  .services-comic-panel:hover {
    background-color: var(--color-cherry-bright);
    transition: background-color 0.25s ease;
  }

  .services-comic-panel.is-inverted:hover {
    background-color: var(--color-champagne); /* white panels shift toward champagne */
    transition: background-color 0.25s ease;
  }

  .services-comic-panel:hover .services-comic-numeral {
    opacity: 0.3;
    transform: scale(1.05);
  }
}

/* Touch devices — tap feedback instead of hover */
@media (hover: none) and (pointer: coarse) {
  .services-comic-panel:active {
    background-color: var(--color-cherry-bright);
  }
}
```

### 7.6 Remove CSS `clip-path` from Base Panel

**File:** `src/app/globals.css` line 3041:

```css
/* OLD: */
  clip-path: inset(100% 0 0 0); /* For GSAP animation */

/* NEW: remove this line entirely — GSAP sets clipPath via fromTo */
```

Without this, the CSS sets `clip-path: inset(100% 0 0 0)` as the default state, which means panels are invisible until JS runs. Remove it so panels are visible by default (progressive enhancement).

---

## 8. DEVICE / HOVER MATRIX

### 8.1 Rules to Apply Everywhere

| Device | Input | Media Query | Hover Behavior |
|--------|-------|-------------|----------------|
| Windows/Mac Laptop | Mouse/Trackpad | `@media (hover: hover) and (pointer: fine)` | Standard `:hover` effects |
| iPhone/Android | Touch | `@media (hover: none) and (pointer: coarse)` | Use `:active` instead of `:hover` |
| iPad/Tablet | Touch | Same as above | Use `:active` |
| Touch Laptop | Both | Use `hover: hover` query for enhancements | Apply hover if mouse detected |

### 8.2 MagneticButton.tsx Pointer Guard

**File:** `src/components/animations/MagneticButton.tsx`

Since this component is **never used** (dead code — see §13), you can delete the entire file. **But if you keep it**, add the guard:

```tsx
export default function MagneticButton({
  children,
  intensity = 0.3,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate(0, 0) scale(1)')
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    setIsFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isFinePointer || !ref.current) return
    // ... rest of handler unchanged
  }
  // ...
}
```

---

## 9. CSS DEDUPLICATION

### 9.1 Problem

`globals.css` has TWO nearly identical copies of "Shared Page Layout" CSS:
- **Block A:** Lines ~1380-2093 (actually used definitions)
- **Block B:** Lines ~2094-2742+ (duplicate — silently overrides Block A)

### 9.2 Solution — Delete Block B

**Delete lines 2094 to approximately 2742.** This is the entire second copy starting from:

```
/* ============================================
   Shared Page Layout
   ============================================ */
```

...and ending right before:

```
/* ============================================
   Hero Redesign (Act 1)
   ============================================ */
```

**Verification:** After deletion, the file should flow from `.industry-service-link:hover` (line ~2093) directly to `.hero-right-zone` (line ~2744).

**Exact lines to delete:** 2094-2743 (inclusive)

### 9.3 Remove Unused CSS Classes

Delete these unused rule blocks from `globals.css`:

| Class | Approx Line | Notes |
|-------|-------------|-------|
| `.section-trust-light` | 430-441 | Not used in any JSX |
| `.hero-tagline` | 347-359 | Not used — replaced by hero-left-panel |
| `.tagline-line` | 361-379 | Not used |
| `.scroll-indicator` | 386-424 | Not used |
| `.services-scroll-content` | 729-740 | Old services section |
| `.services-grid` | 806-818 | Old services grid |
| `.service-card*` (all 4) | 820-872 | Old service cards |
| `.grain-overlay` | 967-976 | Not used |
| `.panel-span-2x2` | 3062 | Not in spanClasses array |
| `.panel-span-4x1` | 3063 | Not in spanClasses array |
| `.panel-span-3x1` | 3066 | Not in spanClasses array |
| `.contact-form*` (all 8) | 1927-2012 | Form replaced with WhatsApp/Call block |
| `.trust-card__play` | 693-723 | Video dock has no play button |

### 9.4 Add --font-oswald to @theme

**File:** `globals.css`, inside `@theme` block:

```css
  /* Add after --font-body */
  --font-oswald: var(--font-oswald);
```

---

## 10. CONTENT & SEO UPDATES

### 10.1 Fix JSON-LD Address in layout.tsx

**File:** `src/app/layout.tsx` — line 139

```tsx
// OLD:
streetAddress: 'Head Office Address',

// NEW:
streetAddress: '208, 2nd Floor, Samod Tower, Sansar Chand Road',
```

Also update line 137-143 to use real data:
```tsx
address: {
  '@type': 'PostalAddress',
  streetAddress: '208, 2nd Floor, Samod Tower, Sansar Chand Road',
  addressLocality: 'Jaipur',
  addressRegion: 'Rajasthan',
  postalCode: '302001',
  addressCountry: 'IN',
},
```

### 10.2 Fix Founding Year

**File:** `src/app/layout.tsx` — line 135

```tsx
// OLD:
foundingDate: '2008',

// CHANGE TO: whichever year client confirms (likely 2005 based on hero text):
foundingDate: '2005',
```

### 10.3 Fix Google Search Console Token

**File:** `src/app/layout.tsx` — line 89

```tsx
// OLD:
google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',

// NEW:
google: 'REAL_TOKEN_HERE',
```

### 10.4 Fix Contact Page Addresses

**File:** `src/app/contact/page.tsx` — lines 101-104

```tsx
// OLD:
{ city: 'Jaipur (HQ)', address: 'Head Office Address, Jaipur, Rajasthan 302001' },
{ city: 'Delhi NCR', address: 'Office Address, New Delhi 110001' },
{ city: 'Ahmedabad', address: 'Office Address, Ahmedabad, Gujarat 380001' },

// NEW — use real addresses (verify exact office addresses with client):
{ city: 'Jaipur (HQ)', address: '208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001' },
{ city: 'Delhi NCR', address: 'Corporate Office, [Full Address], New Delhi — 110001' },
{ city: 'Ahmedabad', address: '[Full Address], Ahmedabad, Gujarat — 380001' },
```

### 10.5 Real Content for About Page

**File:** `src/app/about/page.tsx` — verify the existing content already reflects:

- ✅ PSARA-2005 licensed
- ✅ ISO 9001:2015 (or 2008 — confirm)
- ✅ MSME registered
- ✅ 7,000+ officers
- ✅ PAN India coverage
- ✅ 3-acre training center in Jaipur
- ✅ Founded by law enforcement professionals

**If the training center mention is missing, add it to the story section.**
**If "Mechanised Housekeeping" is missing from facility management description, add it.**

### 10.6 Add Homepage Metadata

**File:** `src/app/page.tsx`

Since this is a `'use client'` component and cannot export `metadata`, create a wrapper approach:

**Option A (Recommended):** Move the client-only parts to a child component, make `page.tsx` a server component:

```tsx
// src/app/page.tsx — NEW VERSION (Server Component)
import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'PSARA-Licensed Security Services in India | Silbar Security',
  description: 'Silbar Security Services — ISO 9001:2015 & PSARA-2005 certified. 7,000+ licensed officers across PAN India. Manned guarding, CCTV, facility management, VIP protection.',
  alternates: { canonical: 'https://www.silbarsecurity.in' },
  openGraph: {
    title: 'Silbar Security Services | PSARA-Licensed Security Agency India',
    description: 'India\'s trusted PSARA-licensed security agency with 7,000+ officers across 200+ cities.',
  },
}

export default function Home() {
  return <HomePageClient />
}
```

Then create `src/app/HomePageClient.tsx` by moving the current `page.tsx` content there (everything after the imports).

**Option B (Quick fix):** Keep current structure but update `layout.tsx` default metadata to be homepage-specific.

---

## 11. MISSING PAGES

### 11.1 /careers

**File:** `src/app/careers/page.tsx`

Create minimal page:
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at Silbar Security',
  description: 'Join India\'s most trusted PSARA-licensed security agency. Explore security guard, supervisor, and corporate positions across PAN India.',
  alternates: { canonical: 'https://www.silbarsecurity.in/careers' },
}

export default function CareersPage() {
  return (
    <main className="about-page" id="main-content">
      <section className="about-hero">
        <div className="about-hero__inner">
          <h1 className="about-title">Careers at Silbar Security</h1>
          <p className="about-subtitle">
            Join a team of 7,000+ professionals dedicated to protecting India. 
            Silbar Security offers career opportunities across security operations, 
            facility management, training, and corporate functions.
          </p>
          <div className="service-detail-ctas">
            <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
              Call for Opportunities
            </a>
            <a
              href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%27m%20interested%20in%20career%20opportunities."
              className="service-detail-cta service-detail-cta--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
```

### 11.2 /privacy-policy

**File:** `src/app/privacy-policy/page.tsx`

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Silbar Security',
  description: 'Privacy policy for Silbar Security Services Pvt. Ltd.',
  alternates: { canonical: 'https://www.silbarsecurity.in/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="about-page" id="main-content">
      <section className="about-hero">
        <div className="about-hero__inner">
          <h1 className="about-title">Privacy Policy</h1>
          <p className="about-subtitle">
            Last updated: July 2026
          </p>
          {/* ponytail: placeholder — replace with actual legal text before launch */}
          <div className="seo-about-content">
            <p>This privacy policy explains how Silbar Security Services Pvt. Ltd. collects, uses, and protects your personal information when you visit our website or use our services.</p>
            <p>We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.</p>
            <p>For a complete privacy policy, please contact us at <a href="mailto:info@silbarsecurity.in" style={{ color: 'var(--color-gold)' }}>info@silbarsecurity.in</a>.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
```

### 11.3 /terms

**File:** `src/app/terms/page.tsx` — same pattern as privacy-policy.

### 11.4 /security-services/city/[slug]

**File:** `src/app/security-services/city/[slug]/page.tsx`

This requires reading the `locations.ts` data file to create city-specific pages. If city data is not yet in the data file, remove the city sitemap entries from `sitemap.ts` until the data is ready.

**Alternatively, remove city URLs from sitemap:**

**File:** `src/app/sitemap.ts` — remove lines that generate `/security-services/city/[slug]` entries.

---

## 12. FOOTER FIXES

### 12.1 Dynamic Service Links

**File:** `src/components/layout/Footer.tsx`

Replace hardcoded `SERVICES_LINKS`:
```tsx
// OLD:
const SERVICES_LINKS = [
  { label: 'Manned Guarding', href: '/services/manned-guarding' },
  { label: 'Industrial Security', href: '/services/industrial-security' },
  { label: 'Event Security', href: '/services/event-security' },
  { label: 'Bank & ATM Security', href: '/services/bank-atm-security' },
  { label: 'Electronic Surveillance', href: '/services/electronic-surveillance' },
  { label: 'Facility Management', href: '/services/facility-management' },
]

// NEW:
import { SERVICES } from '@/data/services'
// ...then:
const SERVICES_LINKS = SERVICES.slice(0, 8).map(s => ({
  label: s.shortTitle,
  href: `/services/${s.slug}`,
}))
```

### 12.2 Dynamic Industry Links

Same pattern:
```tsx
// OLD:
const INDUSTRIES_LINKS = [ /* hardcoded 6 */ ]

// NEW:
import { INDUSTRIES } from '@/data/industries'
const INDUSTRIES_LINKS = INDUSTRIES.slice(0, 8).map(i => ({
  label: i.shortTitle || i.title,
  href: `/industries/${i.slug}`,
}))
```

---

## 13. DEAD CODE REMOVAL

### 13.1 Delete Unused Components

Delete these files entirely:
1. `src/components/animations/MagneticButton.tsx`
2. `src/components/animations/FloatingElements.tsx`
3. `src/components/animations/Marquee.tsx`

No imports need updating — grep confirms zero imports of these anywhere in `src/`.

### 13.2 Verify No Remaining References

```bash
grep -rn "MagneticButton\|FloatingElements\|from.*Marquee" src/ --include="*.tsx" --include="*.ts"
```

Should return zero results (other than the file definitions themselves if not yet deleted).

---

## 14. FULL FILE CHECKLIST

| # | File | Action | Exact Change |
|---|------|--------|-------------|
| 1 | `src/app/globals.css` | Add `--font-oswald` to `@theme` | §3.2 |
| 2 | `src/app/globals.css` | Delete duplicate CSS block (lines 2094-2743) | §9.2 |
| 3 | `src/app/globals.css` | Delete unused CSS classes | §9.3 |
| 4 | `src/app/globals.css` | Add `.services-comic-header` CSS | §7.3 |
| 5 | `src/app/globals.css` | Fix hover states with device media queries | §7.5 |
| 6 | `src/app/globals.css` | Remove `clip-path` from `.services-comic-panel` base | §7.6 |
| 7 | `src/app/globals.css` | Verify `.hero-header` has scrim gradient | §5.1 |
| 8 | `src/app/globals.css` | Verify `.hero-left-panel` has `flex-end` / new padding | §5.2 |
| 9 | `src/app/globals.css` | Verify `.vertical-text-wrapper` has `flex-end` / `margin-top` | §5.2 |
| 10 | `src/app/globals.css` | Verify `.hero-badge-container` has `margin-top: auto` | §5.2 |
| 11 | `src/app/globals.css` | Check/rename `.sticky-cta__quote` → `__call` | §4.7 |
| 12 | `src/app/layout.tsx` | Fix `foundingDate` (align with client) | §10.2 |
| 13 | `src/app/layout.tsx` | Fix Google Search Console token | §10.3 |
| 14 | `src/app/layout.tsx` | Fix JSON-LD address (replace placeholder) | §10.1 |
| 15 | `src/app/page.tsx` | Fix comment "Get Quote" → "Call" | §4.2 |
| 16 | `src/app/page.tsx` | Add homepage metadata (create wrapper or update layout) | §10.6 |
| 17 | `src/components/sections/ScrollExperience.tsx` | Verify `end: '+=320%'` | §6.1 |
| 18 | `src/components/sections/ServicesGrid.tsx` | Add header block (eyebrow + title + divider) | §7.2 |
| 19 | `src/components/sections/ServicesGrid.tsx` | Fix GSAP animation (alternating clipPath) | §7.4 |
| 20 | `src/components/layout/Header.tsx` | Verify both CTAs are WhatsApp links | §4.1 |
| 21 | `src/components/layout/Footer.tsx` | Verify "Get Quote" removed from COMPANY_LINKS | §4.3 |
| 22 | `src/components/layout/Footer.tsx` | Make SERVICES_LINKS dynamic from data | §12.1 |
| 23 | `src/components/layout/Footer.tsx` | Make INDUSTRIES_LINKS dynamic from data | §12.2 |
| 24 | `src/app/services/[slug]/page.tsx` | Fix bottom CTA (remove form-routing) | §4.4 |
| 25 | `src/app/security-services/[state]/page.tsx` | Fix `seo-page-ctas` → `service-detail-ctas` | §4.6 |
| 26 | `src/app/contact/page.tsx` | Fix title (remove "Get a Free Security Quote") | §4.8 |
| 27 | `src/app/contact/page.tsx` | Fix placeholder addresses | §10.4 |
| 28 | `src/app/contact/page.tsx` | Fix WhatsApp icon (Shield → MessageCircle) | §B7 |
| 29 | `src/app/contact/page.tsx` | Convert inline styles to CSS classes | §N3 |
| 30 | `src/app/contact/page.tsx` | Fix `contact-card--whatsapp` standalone usage | §B5 |
| 31 | `src/app/careers/page.tsx` | CREATE (new file) | §11.1 |
| 32 | `src/app/privacy-policy/page.tsx` | CREATE (new file) | §11.2 |
| 33 | `src/app/terms/page.tsx` | CREATE (new file) | §11.3 |
| 34 | `src/app/sitemap.ts` | Remove city URLs OR create city pages | §11.4 |
| 35 | `src/components/animations/MagneticButton.tsx` | DELETE | §13.1 |
| 36 | `src/components/animations/FloatingElements.tsx` | DELETE | §13.1 |
| 37 | `src/components/animations/Marquee.tsx` | DELETE | §13.1 |

---

## DEFINITION OF DONE

1. ✅ `grep -rn "Get Quote\|Get Free Quote" src/` returns **zero results** (comments included)
2. ✅ Every CTA on the site is either `tel:+919352303333` or `wa.me/919352303333`
3. ✅ Services section shows all 12 panels with asymmetric grid, header with "12 SERVICES. ONE FORCE."
4. ✅ Hero text is vertically written (EST. 2005 / INDIA'S PREMIER) anchored to bottom of left panel
5. ✅ Header has gradient scrim — text never clashes with video
6. ✅ Scroll ends at `+=320%` — feels tighter than before
7. ✅ Hover effects only fire on `(hover: hover) and (pointer: fine)` — touch devices get `:active`
8. ✅ CSS file is deduplicated — no duplicate class definitions remain
9. ✅ All 4 missing pages return content (no 404s)
10. ✅ JSON-LD has real address, not "Head Office Address"
11. ✅ Google Search Console has real token, not placeholder
12. ✅ Footer shows 8+ services (not just 6) and 8+ industries (not just 6)
13. ✅ 3 dead components deleted
14. ✅ Founding year is consistent across hero, JSON-LD, and metadata
