# 17 — STRICT RULES AND CONSTRAINTS
## NEVER/ALWAYS Rules + Per-Project Constraints

---

## NEVER RULES (Hard Blocks)

### Typography
- **NEVER** use Inter, Roboto, Poppins, Montserrat, Open Sans, Lato, Raleway, Playfair Display, Bebas Neue
- **NEVER** use more than 2 fonts per site (1 heading + 1 body, or variable font for both)
- **NEVER** use font-size below 14px on desktop, 12px on mobile
- **NEVER** use line-height below 1.3 for body text
- **NEVER** use letter-spacing above 0.05em for body text
- **NEVER** use ALL CAPS for more than 3 words
- **NEVER** use text-shadow for decorative effects (use gradient text or clip-path instead)

### Color
- **NEVER** use pure #000000 or #FFFFFF (use off-black/off-white)
- **NEVER** use blue gradient (#4A90E2 to #50E3C2) — the AI fingerprint
- **NEVER** use more than 5 colors (3 primary + 1 accent + 1 neutral)
- **NEVER** use rgba() without checking contrast ratio (4.5:1 minimum)
- **NEVER** use hard shadows (use layered shadows or blur)
- **NEVER** use default browser link colors

### Layout
- **NEVER** use symmetric 3-column grids (offset, asymmetric, or masonry only)
- **NEVER** use center-aligned text for more than 2 consecutive lines
- **NEVER** use full-width sections with no content hierarchy
- **NEVER** use padding below 16px (mobile) or 24px (desktop)
- **NEVER** use margin collapse for spacing (use gap or padding)
- **NEVER** use fixed widths (use min/max/clamp)

### Animation
- **NEVER** use default CSS `ease` or `ease-in-out` (use cubic-bezier or spring)
- **NEVER** use animation duration below 150ms (too fast to perceive) or above 800ms (too slow to feel responsive)
- **NEVER** use animation-delay (use Intersection Observer instead)
- **NEVER** use animation on page load for above-the-fold content
- **NEVER** use animation that blocks interaction
- **NEVER** use animation that moves text horizontally (except ticker/marquee)
- **NEVER** use fade-in as the only reveal technique (use clip-path, transform, or scroll-driven)
- **NEVER** use animation on elements that users need to read (distracting)

### Interaction
- **NEVER** use alert() or confirm() (use custom modals)
- **NEVER** use window.open() (use target="_blank" with rel="noopener")
- **NEVER** use console.log() in production
- **NEVER** use inline styles (use Tailwind or CSS modules)
- **NEVER** use !important (use specificity instead)
- **NEVER** use document.querySelector() in React (use refs)
- **NEVER** use setInterval() for animations (use requestAnimationFrame)
- **NEVER** use scroll event listeners without requestAnimationFrame throttle

### Performance
- **NEVER** use large hero images without optimization
- **NEVER** use WebP without fallback
- **NEVER** use more than 3 web fonts
- **NEVER** use more than 2 JavaScript bundles
- **NEVER** use render-blocking scripts
- **NEVER** use unoptimized SVGs (use SVGO)
- **NEVER** use images without width/height (causes layout shift)
- **NEVER** use images without loading="lazy" (except above-fold hero)

### SEO
- **NEVER** use duplicate title tags
- **NEVER** use empty alt attributes
- **NEVER** use heading tags out of order (h1 → h3 is wrong)
- **NEVER** use generic link text ("click here", "read more")
- **NEVER** use hidden text for SEO
- **NEVER** use multiple h1 tags per page
- **NEVER** use images for text (except logo)

### Accessibility
- **NEVER** use color as the only way to convey information
- **NEVER** use animation without prefers-reduced-motion fallback
- **NEVER** use keyboard traps (users must always be able to Tab out)
- **NEVER** use tabindex above 0 (use DOM order instead)
- **NEVER** use ARIA labels on elements that already have text content

---

## ALWAYS RULES (Hard Requirements)

### Before Coding
- **ALWAYS** read files 11, 17, 19, 10, 12 before starting any task
- **ALWAYS** study 3-5 reference sites from file 13 before coding a section
- **ALWAYS** check which techniques are assigned to this project (file 10)
- **ALWAYS** check if a dependency already exists in the project before adding one

### Typography
- **ALWAYS** use variable fonts when available (animate font-weight on scroll)
- **ALWAYS** use clamp() for responsive font sizes: `font-size: clamp(1rem, 2.5vw, 3rem)`
- **ALWAYS** use optical sizing (font-optical-sizing: auto)
- **ALWAYS** limit line length to 45-75 characters for body text
- **ALWAYS** use hanging punctuation for editorial text

### Color
- **ALWAYS** use OKLCH for gradients (prevents muddy dead zones)
- **ALWAYS** use color-mix() for dynamic tinting
- **ALWAYS** use light-dark() for theme switching
- **ALWAYS** check contrast ratio (4.5:1 for text, 3:1 for UI)
- **ALWAYS** use CSS custom properties for theme colors
- **ALWAYS** use perceptually uniform color transitions (OKLCH, not sRGB)

### Layout
- **ALWAYS** use CSS Grid for complex layouts (not Flexbox)
- **ALWAYS** use gap for spacing (not margin)
- **ALWAYS** use container queries for component-level responsive
- **ALWAYS** use subgrid for aligned cards/lists
- **ALWAYS** use aspect-ratio for media elements
- **ALWAYS** use min() and max() for responsive constraints

### Animation
- **ALWAYS** use CSS scroll-driven animations when possible (replaces GSAP for simple cases)
- **ALWAYS** use View Transitions API for page transitions
- **ALWAYS** use prefers-reduced-motion media query
- **ALWAYS** use transform and opacity for performance (compositor-thread)
- **ALWAYS** use cubic-bezier for custom easing (not linear/ease)
- **ALWAYS** use animation-fill-mode: forwards for one-shot animations
- **ALWAYS** use will-change sparingly (only for known animations)
- **ALWAYS** use Intersection Observer for scroll triggers (not scroll event)

### Interaction
- **ALWAYS** use CSS :hover for simple hover effects
- **ALWAYS** use CSS :focus-visible for keyboard navigation
- **ALWAYS** use semantic HTML elements (main, article, section, nav, aside)
- **ALWAYS** use landmark roles for screen readers
- **ALWAYS** use keyboard navigation for all interactive elements
- **ALWAYS** use touch targets of at least 44px × 44px on mobile

### Performance
- **ALWAYS** use next/image with priority for above-fold images
- **ALWAYS** use WebP/AVIF with fallback
- **ALWAYS** use loading="lazy" + decoding="async" for below-fold images
- **ALWAYS** use content-visibility: auto for off-screen sections
- **ALWAYS** use font-display: swap for web fonts
- **ALWAYS** use SSG for static pages (homepage, about, services)
- **ALWAYS** minimize third-party scripts (use Partytown if needed)

### SEO
- **ALWAYS** set metadataBase in root layout
- **ALWAYS** use unique title and meta description per page
- **ALWAYS** use OpenGraph + Twitter cards
- **ALWAYS** use canonical URLs
- **ALWAYS** generate dynamic sitemap.ts
- **ALWAYS** use robots.ts
- **ALWAYS** use JSON-LD structured data
- **ALWAYS** use semantic HTML
- **ALWAYS** set lang attribute on html
- **ALWAYS** use alt text on ALL images

### Code Quality
- **ALWAYS** use TypeScript (no any, no loose types)
- **ALWAYS** use proper component naming (PascalCase)
- **ALWAYS** extract reusable logic into custom hooks
- **ALWAYS** use proper error boundaries
- **ALWAYS** use proper loading states
- **ALWAYS** use proper empty states
- **ALWAYS** use proper form validation
- **ALWAYS** use proper rate limiting on API routes

---

## PER-PROJECT CONSTRAINTS

### Khemji (Security Training)
```
NEVER use: Three.js
ALWAYS use: Pure CSS animations, scroll-driven animations, creative typography
Technique budget: 3-4 unique techniques per section
Signature: CSS-only scroll reveals + unique cursor + sound design
Special: Must feel professional but not corporate — "security training that doesn't suck"
```

### ShipBridge (International Logistics)
```
NEVER use: Framer Motion
ALWAYS use: GSAP, Three.js, WebGL, custom physics, audio-reactive
Technique budget: 5-6 unique techniques total
Signature: Custom cursor that changes shape per section + scroll-driven 3D camera path
Special: Must feel global, trustworthy, and technologically advanced
```

### MAAC (Fashion E-commerce)
```
NEVER use: Framer Motion
ALWAYS use: R3F, drei, zustand, GSAP, variable fonts, OKLCH colors
Technique budget: 10+ unique techniques
Signature: Kinetic typography with variable font animation + section-specific unique interactions
Special: Must feel luxurious, editorial, and fashion-forward — not just another e-commerce
```

### Silbar (Security Services)
```
NEVER use: Three.js, Framer Motion
ALWAYS use: Pure CSS animations, scroll-driven animations, OKLCH gradients, container queries
Technique budget: 3-4 unique techniques per section
Signature: Scroll-driven gradient shifts + CSS-only reveals + semantic HTML
Special: Must feel secure, trustworthy, and modern — not like a boring corporate security site
```

---

## THE "NEVER AGAIN" LIST

These are mistakes that have been made and must never be repeated:

1. **Generic fade-in animations** — Use scroll-driven animations or clip-path reveals instead
2. **Symmetric 3-column grids** — Use asymmetric, masonry, or offset grids
3. **Blue gradient hero sections** — Use unique color combinations (OKLCH)
4. **Inter/Roboto/Poppins fonts** — Use variable fonts or unique Google Fonts
5. **Default CSS easings** — Use custom cubic-bezier or spring physics
6. **No mobile optimization** — Always design mobile-first
7. **No SEO** — Always implement from day one
8. **No accessibility** — Always test with keyboard and screen reader
9. **No performance optimization** — Always optimize images, fonts, and scripts
10. **No unique interaction per section** — Each section must have something different

---

## THE "ALWAYS FORGET" LIST

These are things that are always forgotten and must be remembered:

1. **prefers-reduced-motion** — Always add fallback for motion-sensitive users
2. **Loading states** — Always show skeleton/spinner during data fetching
3. **Error states** — Always show meaningful error messages
4. **Empty states** — Always show helpful content when data is missing
5. **Focus states** — Always show clear focus indicators for keyboard users
6. **Touch targets** — Always ensure 44px minimum on mobile
7. **Alt text** — Always describe images for screen readers
8. **Semantic HTML** — Always use proper HTML elements
9. **JSON-LD** — Always add structured data for SEO
10. **Sitemap** — Always generate dynamic sitemap

---

## HOW TO USE THIS FILE

This is your RULEBOOK. When you start ANY task:
1. Read the NEVER rules for this project type
2. Read the ALWAYS rules for this project type
3. Read the per-project constraints
4. Check the "NEVER AGAIN" list
5. Check the "ALWAYS FORGET" list
6. Then write code

**Breaking a NEVER rule = instant delete and redo.**
**Forgetting an ALWAYS rule = quality gate failure.**
