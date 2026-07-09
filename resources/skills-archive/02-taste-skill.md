# Taste Skill — Skill Archive

**Source:** https://github.com/Leonxlnx/taste-skill
**Author:** Leonxlnx
**Extracted:** July 2026

Full adaptation of the taste-skill repository — a 3-dial system for controlling AI output quality, with banned patterns, palette anchors, typography rules, and model behavior tables. All credit to the original author.

---

## The 3-Dial System

Three independent controls that determine output quality:

### Dial 1: Aesthetic Density

Controls how visually rich the output is.

| Setting | What it means |
|---------|---------------|
| **Minimal** | Max 2 typefaces, 3 colors, no texture, flat, lots of negative space |
| **Balanced** | 2-3 typefaces, 1 accent palette, subtle texture, 1-2 visual effects |
| **Rich** | 3+ typefaces, full palette, layered textures, multiple effects, depth |
| **Luxurious** | 4+ typefaces (including display), ornamentation, foil/metallic, animation, glass |

### Dial 2: Risk Tolerance

Controls how experimental the output is.

| Setting | What it means |
|---------|---------------|
| **Safe** | Proven patterns, standard layouts, no surprises |
| **Moderate** | One experimental element, rest standard |
| **Bold** | Multiple unconventional choices, layout risks |
| **Radical** | Full experimental, might fail but memorable |

### Dial 3: Voice / Vibe

Controls the emotional tone.

| Setting | What it means |
|---------|---------------|
| **Professional** | Clean, corporate, trustworthy |
| **Playful** | Fun, whimsical, surprising |
| **Luxury** | Premium, refined, exclusive |
| **Raw** | Edgy, unpolished, authentic |
| **Technical** | Precise, data-driven, functional |
| **Warm** | Approachable, human, friendly |

## Dial Combinations & Expected Outputs

| Density | Risk | Voice | Expected Style |
|---------|------|-------|----------------|
| Minimal | Safe | Professional | Corporate landing page, clean |
| Minimal | Bold | Raw | Brutalist portfolio, experimental |
| Rich | Moderate | Luxury | Premium brand site, detailed |
| Rich | Bold | Playful | Award-winning creative agency |
| Luxurious | Radical | Luxury | FWA-worthy showcase |
| Balanced | Safe | Warm | SaaS product page |
| Balanced | Bold | Technical | Data viz dashboard |
| Minimal | Moderate | Playful | Startup landing page |

## Banned Patterns

These patterns produce generic, forgettable output. If the AI suggests any, reject and redirect.

### Layout Bans
1. **Symmetrical hero with centered text** — Too predictable. Offset or asymmetrical.
2. **Three-column card layout** — The default of every framework. Use 2-col, 4-col, or staggered.
3. **Sticky nav + footer** — Every site has one. Consider no nav, hidden nav, or contextual nav.
4. **Full-width hero image with overlay text** — Overused. Try split hero, text-only hero, or no hero at all.

### Animation Bans
5. **`.fade-in` on scroll** — The most generic animation. Use reveal, mask, morph, or draw.
6. **Slide-in from left/right for elements** — Overdone. Try scale-in, blur-in, or perspective-in.
7. **Basic hover scale(1.05)** — Add transform, shadow, filter, or content change.

### Color Bans
8. **White/black/gray + 1 accent color** — Every startup. Use 3+ color palettes or monochromatic with texture.
9. **Gradient mesh as hero background** — 2023 trend, now generic. Use noise, texture, or generative.
10. **Dark mode = invert colors** — Lazy. Dark mode should have its own palette.

### Typography Bans
11. **Inter + sans-serif pairing** — The most common pair. Use variable, display, or serif+grotesk.
12. **42/18 type scale** — Every framework default. Custom scale with non-round numbers.

## Palette Anchors

Non-default starting points for color systems:

### Tannery
```
Warm brown/caramel/cream
Primary: #8B5E3C (leather brown)
Secondary: #D4A574 (caramel)
Accent: #2D1810 (dark oak)
Light: #F5EDE3 (cream)
```

### Coastal
```
Deep navy/teal/sand
Primary: #1B3A4B (deep navy)
Secondary: #2A9D8F (teal)
Accent: #E9C46A (sand)
Light: #F8F9FA (white)
```

### Riso
```
Vibrant imperfect print
Primary: #E63946 (riso red)
Secondary: #457B9D (riso blue)
Accent: #F1FAEE (paper)
Print: #264653 (ink dark)
```

### Charcoal HUD
```
Industrial dark/monitor glow
Primary: #1A1A2E (deep charcoal)
Secondary: #16213E (dark blue)
Accent: #0F3460 (mid blue)
Glow: #E94560 (red accent)
```

### Arte Povera
```
Raw, earthy, material
Primary: #D4C5A9 (unbleached linen)
Secondary: #8B7355 (raw umber)
Accent: #4A3728 (burnt sienna)
Texture: #E8DCC8 (parchment)
```

### Synthwave Nights
```
Neon/retro/dark
Primary: #0B0C10 (deep black)
Secondary: #45A29E (teal neon)
Accent: #FF3366 (pink neon)
Glow: #FFD700 (gold accent)
```

## Typography Pairs

| Pair | When |
|------|------|
| Space Mono + Plus Jakarta Sans | Technical + clean |
| IBM Plex Sans + IBM Plex Serif | Editorial + trustworthy |
| Fraunces + Söhne | Luxury + modern |
| DM Mono + Inter | Developer + readable |
| Cabinet Grotesk + Sentinel | Bold + classic |
| JetBrains Mono + Satoshi | Code + premium |
| Syne + Outfit | Display + minimal |
| Bebas Neue + Montserrat | Impact + body |
| Literata + Work Sans | Long-form + clean |
| Playfair Display + Source Sans | Editorial + reliable |

### Mono Rules
- Use mono for: numbers, data, code, technical terms, labels
- Don't use mono for: body text, long paragraphs, emotional copy
- Mono as accent: Set CTA buttons, stats, or metrics in mono

## Rare Artifacts & Design Details

Elements that signal deliberate design:

### ASCII / Text Ornaments
```
┌──┐
│  │
└──┘
```
Use as section dividers, frame elements, decorative borders in brutalist/technical designs.

### Corner Brackets
```
└── CONTACT ──────────────────┐
                              │
                              │
┌─────────────────────────────┘
```

### Scan Lines
Overlay horizontal lines for CRT effect. See `technique-catalogs/06-atmosphere.md`.

### Paper Texture
Subtle noise/grain overlay that makes digital feel physical. Opacity 0.02-0.05.

### Grid Overlay
Visible grid lines at 8px or 12px intervals as background aesthetic, not just alignment tool.

### Variable Axes
Animate font weight, width, or slant on scroll or hover. Requires variable font.

## Model Behavior Tables

### Claude (this model)

| Trait | Detail |
|-------|--------|
| Tone | Professional, explanatory, thorough |
| Creative defaults | Defaults to safe/balanced aesthetic density |
| Best for | Complex multi-step tasks, architecture, explanation |
| Weakness | Over-explains, verbose |
| Leverage | Give clear constraints, banned lists, "don't explain" |

### GPT-5 (expected behavior based on pattern)

| Trait | Detail |
|-------|--------|
| Tone | Concise, direct, action-oriented |
| Creative defaults | Defaults to moderate risk tolerance |
| Best for | Quick iteration, brainstorming, many variants |
| Weakness | Can skip edge cases, hallucinate APIs |
| Leverage | Use iteration, ask for 3 variants |

### Gemini (expected)

| Trait | Detail |
|-------|--------|
| Tone | Collaborative, structured |
| Creative defaults | Defaults to safe, structured output |
| Best for | Content structure, SEO, multi-format |
| Weakness | Less creative, format-rigid |
| Leverage | Give very specific format instructions |

### Universal Anti-Generic Rules (all models)

1. Never accept `.fade-in` — always redirect to mask, morph, reveal, or draw
2. Never default to symmetric hero — always propose asymmetric first
3. Never default to Inter/white-gray-blue — always start from a palette anchor
4. Never output 3-column cards without explicit request
5. Always propose 1 risky alternative per deliverable
6. Never say "elevate" or "delight" — use specific technique names
7. Always prefer native platform features before library code
8. If a technique would take 5+ lines, mention the shortcut
9. Boring is better than broken for production
10. If unsure, ship the lazy version and ask
