# Design Styles — Full Tutorial Catalog

---

## 1. Neumorphism (Soft UI)

### Theory
Neumorphism creates UI elements that appear to be extruded from or indented into the background, using dual shadows (light + dark) to simulate physical depth. The background must be a solid mid-tone (never white/black). Works best for static UI, poor for complex layouts.

### Core Formula
```css
/* Extruded (raised) */
  background: #e0e0e0;
  box-shadow: 9px 9px 18px #b3b3b3,
              -9px -9px 18px #ffffff;
  border-radius: 12px;

/* Intruded (pressed) */
  background: #e0e0e0;
  box-shadow: inset 9px 9px 18px #b3b3b3,
              inset -9px -9px 18px #ffffff;
  border-radius: 12px;
```

### Color Generation
```ts
function generateNeumorphicColors(base: string, strength = 0.15) {
  // Dark shadow: base darkened by `strength`
  // Light shadow: base lightened by `strength` (or white)
  // Only works on mid-tone backgrounds (HSL L: 40-70%)
}
```

### When to Use
- Toggles, switches, progress indicators
- Static cards, stat displays
- Dark mode dashboards

### When NOT to Use
- Text-heavy layouts (WCAG contrast fails)
- Complex nested elements
- Mobile (hard to distinguish interactive vs decorative)

---

## 2. Skeuomorphism

### Theory
Skeuomorphism mimics real-world materials and physical affordances: leather stitching, felt backgrounds, paper textures, glossy buttons. Dominated early 2010s iOS. Making a comeback in 2024-2026 as "maximalist skeuomorphism" with richer materials.

### Core Techniques
- **Textures**: Subtle noise, grain, fabric patterns as CSS backgrounds or SVG filters
- **Lighting**: Multiple gradient layers simulating directional light, specular highlights
- **Depth**: Bevel/emboss via layered box-shadows, inset shadows
- **Materials**: Simulated leather, wood, metal via CSS gradients

### CSS Material Textures
```css
/* Felt / Fabric */
  background: #8B7355;
  background-image: repeating-linear-gradient(
    45deg, transparent, transparent 2px,
    rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px
  );

/* Brushed Metal */
  background: linear-gradient(
    90deg, #888 0%, #ccc 30%, #eee 50%, #ccc 70%, #888 100%
  );
  background-size: 200% 100%;
```

### When to Use
- Audio apps (tape decks, knobs)
- Note-taking (paper textures, leather journals)
- Premium/luxury contexts

---

## 3. Claymorphism

### Theory
Claymorphism is neumorphism's softer cousin: colored (not gray), with pronounced rounded corners, double shadows (one tinted), and a slight 3D tilt. Popularized in 2021-2022 by icons and hero sections.

### Core Formula
```css
  background: #F2A65A;
  border-radius: 24px;
  box-shadow:
    0 12px 0 #C47E3A,       /* solid tinted bottom */
    0 18px 24px rgba(0,0,0,0.15); /* floating shadow */
```

### Signature Traits
- Saturated colors (not gray)
- Large border-radius (16-32px)
- Solid colored bottom shadow (no blur)
- Optional: subtle transform rotation for "tilted clay" look

### When to Use
- Hero illustrations, product showcases
- Icon sets, avatar placeholders
- Playful/friendly brand identities

---

## 4. Neubrutalism (Brutalist Web)

### Theory
Neubrutalism rejects subtlety: hard black borders, stark color blocks, system fonts, no rounded corners, intentional awkwardness. Inspired by 1950s-70s architectural brutalism and early web design.

### Core Rules
```
1. BLACK border: at least 2px, ideally 3-4px
2. SHADOW: hard offset only (no blur, no spread)
3. COLORS: high-saturation primaries, no gradients
4. TYPOGRAPHY: system fonts, large weights, no letter-spacing
5. CORNERS: sharp (0px) always
6. FORMS: input borders same as any other border
```

### CSS Skeleton
```css
  border: 3px solid #000;
  box-shadow: 6px 6px 0 #000;
  background: #FF5733;
  border-radius: 0;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 800;
```

### Hover States
```css
  /* lift */
  box-shadow: 8px 8px 0 #000;
  transform: translate(-2px, -2px);

  /* press */
  box-shadow: 2px 2px 0 #000;
  transform: translate(4px, 4px);
```

### Color Palettes
```ts
const neubrutalPalettes = [
  ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'], // primary
  ['#FF33F1', '#33FFF5', '#000', '#FFF'],        // alt
  ['#FFD700', '#FF4500', '#00FF7F', '#1E90FF'],  // jewel
];
```

### When to Use
- Landing pages, coming soon pages
- Developer/startup brands
- Any project needing maximal attention
- Editorial / zine-style layouts

### When NOT to Use
- Long-form reading
- Enterprise dashboards
- Accessibility-critical contexts (unless carefully tuned)

---

## 5. Bento Grids

### Theory
Bento grids arrange content into irregular, asymmetric grid cells of varying sizes — inspired by Japanese bento box layouts. Popularized by Apple's design language and now ubiquitous in 2024-2026 landing pages.

### Grid Patterns

```css
/* CSS — 4-column bento */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 8px;

  .hero     { grid-column: 1 / 3; grid-row: 1 / 3; }
  .stats    { grid-column: 3 / 5; grid-row: 1 / 2; }
  .feature  { grid-column: 3 / 4; grid-row: 2 / 3; }
  .cta      { grid-column: 4 / 5; grid-row: 2 / 3; }
```

### Sizing Heuristics
```
1x1 = smallest info (icon, stat, badge)
2x1 = wide card (testimonial, feature highlight)
1x2 = tall card (vertical timeline item)
2x2 = hero / primary content
3x2 = hero with media (image/ video)
```

### Animation Patterns for Bento
```ts
// Stagger cells entering
gsap.from('.bento > *', {
  opacity: 0,
  y: 30,
  stagger: { amount: 0.8, from: 'center' },
  scrollTrigger: { trigger: '.bento', start: 'top 80%' }
});

// Hover scale on interactive cells
.bento > *:hover {
  scale: 1.02;
  transition: scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### When to Use
- Feature sections, pricing grids
- Team pages, portfolio grids
- Dashboard layouts
- Any page needing visual variety within structure

---

## 6. Y2K / Cyberpunk / Frutiger Aero

### Theory
Y2K aesthetic = bubbly, glossy, chrome, matrix rain, pixel fonts, jelly colors, translucent plastic. Frutiger Aero (2005-2013) = aqua interfaces, deep gloss, skeuomorphic icons with glass effect. Modern revival uses both heavily in 2022-2026.

### Core Elements
- **Chrome/glass**: multi-stop gradients with sharp highlights
- **Jelly colors**: translucent pastels on dark backgrounds
- **Typography**: pixel fonts, rounded sans, outlined text
- **Noise/grain**: CRT scanlines, VHS tracking artifacts
- **Geometric**: swooping curves, orbs, star/asterisk motifs

### CSS Glass (Y2K style)
```css
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.4) 0%,
    rgba(255,255,255,0.1) 40%,
    rgba(255,255,255,0.3) 60%,
    rgba(255,255,255,0.05) 100%
  );
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(8px);
```

### Scanline Overlay
```css
.scanlines::after {
  content: '';
  position: fixed; inset: 0;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px
  );
  pointer-events: none;
  z-index: 9999;
}
```

### When to Use
- Creative/agency landing pages
- Music/event pages
- Gaming/streaming brands
- Retro-tech themed projects

---

## 7. Luxury Design (Premium / High-End)

### Theory
Luxury web design is about restraint, negative space, and signal of quality through minimalism + perfect execution. Inspired by high-end print, watchmaking, fashion houses.

### Core Principles
```
1. SPACE: generous padding, 40-50% negative space minimum
2. TYPOGRAPHY: serif headlines (Garamond, Didot, Caslon), light weights (200-300), generous leading (1.6-2.0)
3. COLOR: muted, warm, monochromatic — cream, charcoal, burgundy, navy, gold as accent only
4. VELVET RICHNESS: subtle noise textures on backgrounds, micro-gradients on edges
5. MOTION: slow (1.5-3s transitions), no bounce, no stagger chaos — singular elegant fade/opacity
6. IMAGERY: full-bleed, dark, moody photography, cinematic crops, no stock photo feel
7. BORDERS: thin (0.5-1px) gold or none, generous border-radius (16-24px)
```

### CSS Foundation
```css
  background: #1A1A1A;
  color: #F5F0E8;
  font-family: 'EB Garamond', 'Cormorant Garamond', serif;
  background-image: url("data:image/svg+xml,..."); /* subtle noise */
```

### Typography Scale (Luxury)
```css
  h1 { font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 200; letter-spacing: 0.05em; line-height: 1.2; }
  h2 { font-size: clamp(1.8rem, 3vw, 3rem); font-weight: 300; letter-spacing: 0.02em; }
  p  { font-size: clamp(1rem, 1.2vw, 1.25rem); font-weight: 300; line-height: 1.8; color: #A09888; }
```

### Motion (Luxury)
```ts
// Slow, deliberate — no haste
gsap.to('.hero-title', {
  opacity: 1,
  y: 0,
  duration: 2.5,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});
// No stagger — each element fades independently with its own delay
```

### Gold Accents
```css
  border: 0.5px solid linear-gradient(90deg, #BF953F, #FCF6B5, #B38728, #FBF5B7, #AA771C);
  /* Fallback: solid #BF953F */
```

### When to Use
- Luxury real estate, automotive, fashion
- High-end hospitality, restaurants
- Premium SaaS (enterprise pricing pages)
- Portfolio sites for photographers, designers, architects

---

## Style Decision Matrix

| Style | Best For | Avoid | Animation Tempo |
|-------|----------|-------|-----------------|
| Neumorphism | UI elements, dark dashboards | Text content | None / subtle |
| Skeuomorphism | Audio/creative apps, notes | Minimalist brands | Organic, mimic physical |
| Claymorphism | Icons, heroes, product shots | Serious/finance | Playful bounce |
| Neubrutalism | Landing pages, startups | Long-form, enterprise | Snappy, hard edges |
| Bento Grids | Feature sections, pricing | Single-column narratives | Stagger from center |
| Y2K / Frutiger | Creative agencies, music | Corporate, accessibility | Glitch, chrome shine |
| Luxury | Premium brands, fashion | Casual/playful | Slow, singular, fade |

---

> **ponytail**: This covers the most requested missing styles in a single reference file. If a specific style needs deeper treatment (e.g., full Y2K component library), extract to its own catalog file then.
