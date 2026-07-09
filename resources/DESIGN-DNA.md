# Design DNA — Unified Style & Technique Reference

---

**Purpose**: A single entry point that maps every project type → recommended techniques, styles, and resource files. Use this to decide *what* to build, then reach into individual catalogs for *how*.

---

## How to Use This Document

1. Identify your project type (left column)
2. Read across to see recommended style + animation techniques
3. Open the linked resource files for implementation details
4. Check the anti-slop system for banned patterns

---

## Project → Technique Matrix

| Project Type | Best Style | Primary Techniques | Key Resource Files |
|---|---|---|---|
| **Landing Page** | Bento Grid / Neubrutalism | Scroll-triggered reveals, staggered cards, CSS noise textures | `technique-catalogs/02-scroll.md`, `technique-catalogs/05-micro-interactions.md`, `technique-catalogs/07-design-styles.md` (§4, §5) |
| **SaaS Dashboard** | Neumorphism / Clean Flat | Micro-interactions, skeleton loading, spring physics | `technique-catalogs/05-micro-interactions.md`, `code-patterns/spring-physics.ts`, `anti-slop-system/01-master-prompt.md` |
| **E-Commerce** | Luxury / Bento Grid | Section transitions, image sequences, parallax hero | `technique-catalogs/03-section-transitions.md`, `technique-catalogs/02-scroll.md`, `anti-slop-system/02-banned-patterns.md` |
| **Portfolio / Agency** | Neubrutalism / Y2K / Luxury | Text animations, SVG morph, sticky scroll, atmosphere | `technique-catalogs/04-text-animations.md`, `technique-catalogs/01-svg.md`, `technique-catalogs/06-atmosphere.md`, `technique-catalogs/07-design-styles.md` (§6) |
| **Mobile App** | Claymorphism / Bento | Micro-interactions, spring physics, reduced motion | `technique-catalogs/05-micro-interactions.md`, `code-patterns/spring-physics.ts`, `anti-slop-system/07-nextjs-ssr-patterns.md` (§3) |
| **Editorial / Blog** | Luxury / Skeuomorphism | Section transitions, typography scale, subtle noise | `technique-catalogs/03-section-transitions.md`, `technique-catalogs/04-text-animations.md`, `anti-slop-system/04-typography-pairs.md` |
| **Creative / Music / Gaming** | Y2K / Neubrutalism | SVG path morph, particle inertia, scanline overlay, glitch | `technique-catalogs/01-svg.md`, `code-patterns/particle-inertia.ts`, `code-patterns/noise-texture.css`, `technique-catalogs/07-design-styles.md` (§6) |
| **Luxury / Fashion** | Luxury | Slow fade, full-bleed imagery, gold accents, custom easings | `technique-catalogs/07-design-styles.md` (§7), `code-patterns/cinematic-easings.ts`, `anti-slop-system/03-palette-anchors.md` |
| **Audio / Creative Tools** | Skeuomorphism | Physical affordances, custom cursors, material textures | `technique-catalogs/07-design-styles.md` (§2), `technique-catalogs/05-micro-interactions.md` |
| **Real Estate / Hospitality** | Luxury / Bento Grid | Scroll-driven image sequences, parallax, horizontal scroll | `technique-catalogs/02-scroll.md`, `anti-slop-system/07-nextjs-ssr-patterns.md` (§6), `technique-catalogs/07-design-styles.md` (§7) |

---

## Technique → File Quick Reference

| Technique | File | Key Content |
|---|---|---|
| SVG Path Morphing | `technique-catalogs/01-svg.md` | MorphSVG, anime.js, stroke-dash, viewBox animation |
| Scroll / Parallax | `technique-catalogs/02-scroll.md` | ScrollTrigger, parallax layers, horizontal scroll, pin-spacing |
| Section Transitions | `technique-catalogs/03-section-transitions.md` | Clip-path, curtain, cube, slide, continuous scroll |
| Text Animations | `technique-catalogs/04-text-animations.md` | SplitText, letter-by-letter, typewriter, reveal mask |
| Micro-Interactions | `technique-catalogs/05-micro-interactions.md` | Hover, magnetic buttons, custom cursor, spring physics |
| Atmosphere | `technique-catalogs/06-atmosphere.md` | Particles, mouse-trail, noise texture, WebGL fog |
| Design Styles | `technique-catalogs/07-design-styles.md` | Neumorphism, skeuomorphism, clay, neubrutalism, bento, Y2K, luxury |
| Master Prompt | `anti-slop-system/01-master-prompt.md` | Full prompt engineering guide for animation generation |
| Banned Patterns | `anti-slop-system/02-banned-patterns.md` | Patterns to never use (fade-in-up, bounce, etc.) |
| Palette Anchors | `anti-slop-system/03-palette-anchors.md` | Color selection by project type |
| Typography Pairs | `anti-slop-system/04-typography-pairs.md` | Font pairing by style category |
| Rare Artifacts | `anti-slop-system/05-rare-artifacts.md` | Unique techniques (clip reveal, drag physics, etc.) |
| Model Tables | `anti-slop-system/06-model-tables.md` | LLM performance comparison for animation code |
| Next.js SSR Patterns | `anti-slop-system/07-nextjs-ssr-patterns.md` | Production GSAP + Next.js patterns |
| Cinematic Easings | `code-patterns/cinematic-easings.ts` | Custom cubic-bezier easings |
| Spring Physics | `code-patterns/spring-physics.ts` | Physics-based spring values |
| Scroll Camera Timeline | `code-patterns/scroll-camera-timeline.ts` | Camera-like scroll control |
| SVG Path Morph | `code-patterns/svg-path-morph.tsx` | React-ready SVG morph component |
| Particle Inertia | `code-patterns/particle-inertia.ts` | Physics particle system |
| Glass Card | `code-patterns/glass-card.tsx` | Production glassmorphism component |
| Noise Texture | `code-patterns/noise-texture.css` | CSS-only noise generation |

---

## Award Winners Reference

File: `award-winners-breakdown/` (9 analyses)

| Site | Style | Key Takeaway |
|---|---|---|
| Oryzo | Bento + Luxury | Grid precision + slow scroll animations |
| IVRESS | Neubrutalism | Bold typography + hard shadow interactions |
| Lacoste | Luxury + 3D | Product-first imagery, minimal motion |
| Shopify | Bento + Micro-interactions | Polished interaction at scale |
| Hubtown | Luxury Real Estate | Scroll-driven image reveals, mood |
| Sleep Well | Y2K / Playful | Whimsical transitions, custom 3D elements |
| Primland | Luxury Nature | Full-bleed video + parallax depth |
| Cartier | Luxury Heritage | Cinematic scroll, gold accents |
| Codrops | Mixed Techniques | Experimental animations, reference library |

---

## Quick Decision Flow

```
What are you building?
├── Landing Page → Bento Grid + ScrollTrigger reveals → technique-catalogs/07 (§5) + technique-catalogs/02
├── Dashboard → Neumorphism + Micro-interactions → technique-catalogs/07 (§1) + technique-catalogs/05
├── E-Commerce → Luxury + Section transitions → technique-catalogs/07 (§7) + technique-catalogs/03
├── Portfolio → Neubrutalism or Y2K + Text animations → technique-catalogs/07 (§4/§6) + technique-catalogs/04
├── Creative → Y2K + SVG + Particles → technique-catalogs/07 (§6) + technique-catalogs/01 + technique-catalogs/06
├── Luxury → Luxury + Slow fade + Gold → technique-catalogs/07 (§7) + code-patterns/cinematic-easings.ts
└── Mobile → Claymorphism + Reduced motion → technique-catalogs/07 (§3) + anti-slop-system/07 (§3)
```

---

> **ponytail**: Single entry point for the entire resource system. If a new project type emerges, add one row to the matrix — no new documents needed.
