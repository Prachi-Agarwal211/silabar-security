# Silbar Resource Dump

Centralized reference archive for web design, animation, anti-slop systems, and award-winning technique repositories. Designed for ingestion by any AI agent (Claude, GPT-5, Gemini) — point an agent at this directory and it instantly understands the full technique catalog, anti-slop rules, and award-winning patterns without re-researching.

---

## Directory Structure

```
resources/
├── README.md                         ← This file
├── reference-links.md                ← Every URL collected
├── studio-agency-list.md             ← Top WebGL agencies + specialties
│
├── skills-archive/                   ← Original repo extracts (full, with attribution)
│   ├── 01-epic-design.md             ← alirezarezvani/epic-design (45 techniques + depth)
│   ├── 02-taste-skill.md             ← Leonxlnx/taste-skill (3-dial anti-slop system)
│   ├── 03-motion-principles.md       ← LottieFiles/skill (Disney 12 → web)
│   ├── 04-animejs-skill.md           ← BowTiedSwan/animejs-skill (v4 patterns)
│   └── 05-svg-animations.md          ← supermemoryai/svg-animations (full SVG catalog)
│
├── technique-catalogs/               ← 60+ techniques, full tutorial depth
│   ├── 01-svg.md                     ← Morph, mask, draw, generative, faux-3D, clip-path, filter
│   ├── 02-scroll.md                  ← 6-layer depth, parallax, pin-spacer, horizontal, flip
│   ├── 03-section-transitions.md     ← Curtain, iris, wipe, clip-path morph, perspective flip
│   ├── 04-text-animations.md         ← Split, scramble, word lighting, variable font, typewriter
│   ├── 05-micro-interactions.md      ← Magnetic, particle, hover, glass, gooey, ripple, cursor
│   ├── 06-atmosphere.md             ← Mesh gradients, noise, glassmorphism, foil, scan lines
│   ├── 07-design-styles.md           ← Neumorphism, skeuomorphism, clay, neubrutalism, bento, Y2K, luxury
│   └── 08-animation-performance.md   ← GPU acceleration, Core Web Vitals, bundle optimization
│
├── anti-slop-system/                 ← Complete anti-generic design system
│   ├── 01-master-prompt.md           ← 9-lever anti-slop template
│   ├── 02-banned-patterns.md         ← Explicit 12 forbidden patterns
│   ├── 03-palette-anchors.md         ← 6 non-default palettes with hex codes
│   ├── 04-typography-pairs.md        ← 10 font pairings + mono rules
│   ├── 05-rare-artifacts.md          ← Corner brackets, scan lines, ASCII rules
│   ├── 06-model-tables.md            ← Claude vs GPT-5 vs Gemini behavior
│   ├── 07-nextjs-ssr-patterns.md     ← GSAP+Next.js production patterns
│   ├── 08-mobile-and-device-optimization.md ← Responsive, touch, breakpoints, container queries
│   ├── 09-accessibility-wcag.md      ← WCAG 2.2 AA, reduced motion, screen reader, focus
│   ├── 10-testing-and-ci.md          ← Visual regression, GitHub Actions, animation testing
│   └── 11-ai-code-audit-prompt.md    ← Master audit prompt for AI code review
│
├── award-winners-breakdown/          ← Real site technique analysis (2025-2026)
│   ├── 01-oryzo-lusion.md            ← Single object inertial 3D + Z-depth scroll
│   ├── 02-ivress-utsubo.md           ← WebGPU + TSL shaders, FWA SOTM
│   ├── 03-lacoste-ace.md             ← Branded Three.js arcade campaign
│   ├── 04-shopify-editions.md        ← Scroll-sequenced product reveal
│   ├── 05-hubtown-unseen.md          ← 3D monolith + mouse-reveal for B2B
│   ├── 06-sleep-well.md              ← Illustrated 3D editorial narrative
│   ├── 07-primland.md                ← Cinematic landscape flythrough
│   ├── 08-cartier-immersive.md       ← One 3D room per product
│   └── 09-codrops-cinematic.md       ← Full GSAP cinematic tutorial breakdown
│
└── code-patterns/                    ← Ready-to-use code files
    ├── cinematic-easings.ts          ← 4 custom exponential ease curves
    ├── spring-physics.ts             ← Mass-spring-damper solver
    ├── scroll-camera-timeline.ts     ← GSAP camera path + scroll sync
    ├── svg-path-morph.tsx            ← Animated SVG morph between two paths
    ├── particle-inertia.ts           ← Rotational inertia particle system
    ├── glass-card.tsx                ← Glassmorphism card with backdrop-filter
    └── noise-texture.css             ← CSS-only noise overlay
│
├── DESIGN-DNA.md                     ← Unified style & technique reference — START HERE
```

## How Agents Should Use This

1. **New project?** Scan `technique-catalogs/` for the category you need, then cross-reference with `anti-slop-system/` to avoid generic output.
2 **Need inspiration?** Read `award-winners-breakdown/` — each is a real site with named techniques you can steal.
3 **Need code?** `code-patterns/` has ready-to-use implementations.
4 **Need the full source context?** `skills-archive/` has the original repos in full.

## Attribution

This directory is a curated adaptation of open-source knowledge from the web animation community. Full credit and source URLs are embedded at the top of each extracted file in `skills-archive/`. The `technique-catalogs/` and `anti-slop-system/` are original syntheses combining patterns from multiple sources.

Last updated: July 2026
