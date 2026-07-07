# 19 — PROJECT TYPE TEMPLATES
## Starter Kits for Khemji, ShipBridge, MAAC, Silbar

---

## HOW TO USE THIS FILE

Each template includes:
1. Project constraints (NEVER/ALWAYS)
2. Technique assignments (what to use where)
3. Color palette (OKLCH)
4. Typography (variable fonts)
5. Animation rules (easing, duration)
6. Component structure
7. Anti-generic checklist

**Read this file BEFORE coding ANYTHING for these projects.**

---

## KHEMJI (Security Training)

### Identity
- **Vibe:** Professional but not corporate — "security training that doesn't suck"
- **Color Palette:**
  ```
  --primary: oklch(0.45 0.15 260);    /* Deep blue */
  --secondary: oklch(0.55 0.12 180);  /* Teal */
  --accent: oklch(0.65 0.2 45);       /* Amber warning */
  --neutral: oklch(0.95 0.01 260);    /* Off-white */
  --text: oklch(0.2 0.01 260);        /* Off-black */
  --success: oklch(0.65 0.18 145);    /* Green */
  --danger: oklch(0.55 0.2 25);       /* Red */
  ```
- **Typography:**
  - Heading: Space Grotesk (variable, 300-700)
  - Body: Inter Tight (variable, 300-700)
  - Code: JetBrains Mono
- **Never Use:** Three.js, Inter, Roboto, Poppins

### Technique Assignments
| Section | Technique | Reference |
|---------|-----------|-----------|
| Hero | CSS scroll-driven reveal + asymmetric grid | Nothing.tech |
| Features | Scroll-triggered clip-path reveals | Apple iPhone |
| Courses | Kinetic typography + variable font animation | Build Studio |
| Testimonials | Parallax depth layers | Apple |
| Contact | Magnetic hover effect + custom cursor | Ilya Kostin |
| Footer | Scroll-driven gradient shift | Studio Freight |

### Component Structure
```
components/
  layout/
    Header.tsx          — Sticky with scroll progress
    Footer.tsx          — Scroll-driven gradient
  sections/
    Hero.tsx            — Asymmetric grid + scroll reveal
    Features.tsx        — Clip-path reveals
    Courses.tsx         — Kinetic typography
    Testimonials.tsx    — Parallax depth
    Contact.tsx         — Magnetic hover
  ui/
    ScrollReveal.tsx    — CSS scroll-driven
    SplitText.tsx       — Character animation
    MagneticButton.tsx  — Magnetic hover
    GradientText.tsx    — OKLCH gradient
    NoiseOverlay.tsx    — SVG noise texture
```

### Animation Rules
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy)
- Duration: 600-800ms for reveals, 200-300ms for hovers
- Stagger: 50ms between elements
- Scroll: CSS `animation-timeline: view()` first, GSAP fallback

### Anti-Generic Checklist
- [ ] No symmetric 3-column grids
- [ ] No default CSS easings
- [ ] No Inter/Roboto/Poppins
- [ ] Each section has unique interaction
- [ ] Scroll-driven animations work without JS
- [ ] Gradient text uses OKLCH
- [ ] Custom cursor changes per section
- [ ] Noise texture overlay present
- [ ] Asymmetric layouts throughout

---

## SHIPBRIDGE (International Logistics)

### Identity
- **Vibe:** Global, trustworthy, technologically advanced
- **Color Palette:**
  ```
  --primary: oklch(0.5 0.15 240);    /* Navy */
  --secondary: oklch(0.6 0.12 200);  /* Ocean blue */
  --accent: oklch(0.7 0.2 160);      /* Cyan */
  --neutral: oklch(0.95 0.01 240);   /* Off-white */
  --text: oklch(0.2 0.01 240);       /* Off-black */
  --gold: oklch(0.75 0.15 85);       /* Trust gold */
  ```
- **Typography:**
  - Heading: Satoshi (variable, 300-900)
  - Body: General Sans (variable, 300-700)
  - Mono: Fira Code
- **Never Use:** Framer Motion

### Technique Assignments
| Section | Technique | Reference |
|---------|-----------|-----------|
| Hero | 3D globe with scroll-driven camera | Hubtown |
| Services | Custom cursor that changes shape per section | Ilya Kostin |
| Tracking | Real-time data visualization + particles | Sleep Well Creative |
| Fleet | Scroll-triggered 3D product reveals | Cartier |
| About | Parallax depth + scroll narrative | Apple |
| Contact | Magnetic hover + spring physics | Stripe |

### Component Structure
```
components/
  layout/
    Header.tsx          — Sticky with scroll progress
    Footer.tsx          — Scroll-driven gradient
  sections/
    Hero.tsx            — 3D globe + camera path
    Services.tsx        — Custom cursor sections
    Tracking.tsx        — Data visualization
    Fleet.tsx           — 3D product reveals
    About.tsx           — Parallax narrative
    Contact.tsx         — Magnetic hover
  ui/
    CustomCursor.tsx    — Shape changes per section
    Parallax.tsx        — Scroll-driven depth
    MouseParallax.tsx   — Mouse-driven depth
    SpringButton.tsx    — Spring physics hover
    ParticleField.tsx   — GPU particles
```

### Animation Rules
- Easing: Spring physics (mass: 1, stiffness: 100, damping: 10)
- Duration: 800-1200ms for reveals, 300-400ms for hovers
- Scroll: GSAP ScrollTrigger for complex timelines
- 3D: Three.js with R3F + drei

### Anti-Generic Checklist
- [ ] Custom cursor changes shape per section
- [ ] 3D elements respond to scroll
- [ ] No symmetric 3-column grids
- [ ] Spring physics on hover
- [ ] Particle effects on key sections
- [ ] Gradient text uses OKLCH
- [ ] Scroll-driven camera path
- [ ] Real-time data visualization
- [ ] Each section has unique interaction

---

## MAAC (Fashion E-commerce)

### Identity
- **Vibe:** Luxurious, editorial, fashion-forward — not just another e-commerce
- **Color Palette:**
  ```
  --primary: oklch(0.45 0.15 340);    /* Deep rose */
  --secondary: oklch(0.55 0.12 300);  /* Purple */
  --accent: oklch(0.7 0.2 45);        /* Gold */
  --neutral: oklch(0.97 0.01 340);    /* Off-white */
  --text: oklch(0.15 0.01 340);       /* Off-black */
  --cream: oklch(0.95 0.02 85);       /* Warm cream */
  ```
- **Typography:**
  - Heading: Playfair Display (variable, 400-900)
  - Body: DM Sans (variable, 300-700)
  - Accent: Cormorant Garamond (italic)
- **Never Use:** Framer Motion

### Technique Assignments
| Section | Technique | Reference |
|---------|-----------|-----------|
| Hero | Kinetic typography + variable font animation | Build Studio |
| Collections | 3D product rotation + scroll-driven | Cartier |
| Products | Variable font weight on scroll | DINAMO |
| Editorial | Scroll-triggered image reveals + parallax | Mikiya Kobayashi |
| Lookbook | Full-screen sections with scroll snap | Tesla |
| Checkout | Spring physics transitions | Stripe |

### Component Structure
```
components/
  layout/
    Header.tsx          — Variable font nav
    Footer.tsx          — Editorial layout
  sections/
    Hero.tsx            — Kinetic typography
    Collections.tsx     — 3D product rotation
    Products.tsx        — Variable font scroll
    Editorial.tsx       — Image reveals + parallax
    Lookbook.tsx        — Scroll snap sections
    Checkout.tsx        — Spring transitions
  ui/
    VariableText.tsx    — Font-weight animation
    KineticType.tsx     — Multi-line kinetic
    ProductCard3D.tsx   — 3D product view
    ScrollSnap.tsx      — Full-screen scroll snap
    MagneticButton.tsx  — Magnetic hover
    GradientText.tsx    — OKLCH gradient
```

### Animation Rules
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot)
- Duration: 1000-1500ms for reveals, 400-600ms for hovers
- Scroll: GSAP ScrollTrigger + CSS scroll-driven
- 3D: R3F + drei + postprocessing

### Anti-Generic Checklist
- [ ] Variable font animates on scroll
- [ ] 3D product views work
- [ ] No symmetric 3-column grids
- [ ] Each product has unique reveal
- [ ] Gradient text uses OKLCH
- [ ] Editorial layout, not grid
- [ ] Scroll snap for lookbook
- [ ] Spring physics on interactions
- [ ] Feels luxurious, not template

---

## SILBAR (Security Services)

### Identity
- **Vibe:** Secure, trustworthy, modern — not boring corporate security
- **Color Palette:**
  ```
  --primary: oklch(0.5 0.15 220);    /* Steel blue */
  --secondary: oklch(0.6 0.12 180);  /* Teal */
  --accent: oklch(0.65 0.2 45);      /* Amber */
  --neutral: oklch(0.95 0.01 220);   /* Off-white */
  --text: oklch(0.2 0.01 220);       /* Off-black */
  --success: oklch(0.65 0.18 145);   /* Green */
  ```
- **Typography:**
  - Heading: Space Grotesk (variable, 300-700)
  - Body: Inter Tight (variable, 300-700)
  - Mono: JetBrains Mono
- **Never Use:** Three.js, Framer Motion

### Technique Assignments
| Section | Technique | Reference |
|---------|-----------|-----------|
| Hero | Scroll-driven gradient shift + clip-path | Nothing.tech |
| Services | Container query cards + OKLCH tints | Kevin Powell |
| About | Scroll-driven typography reveal | Build Studio |
| Team | Parallax depth + mouse parallax | Locomotive |
| Testimonials | Noise texture overlay + asymmetric grid | Studio Freight |
| Contact | Magnetic hover + spring physics | Stripe |

### Component Structure
```
components/
  layout/
    Header.tsx          — Sticky with scroll progress
    Footer.tsx          — Scroll-driven gradient
  sections/
    Hero.tsx            — Gradient shift + clip-path
    Services.tsx        — Container query cards
    About.tsx           — Typography reveal
    Team.tsx            — Parallax depth
    Testimonials.tsx    — Noise overlay + asymmetric
    Contact.tsx         — Magnetic hover
  ui/
    ScrollReveal.tsx    — CSS scroll-driven
    ContainerCard.tsx   — Container query responsive
    GradientShift.tsx   — Scroll-driven gradient
    MouseParallax.tsx   — Mouse-driven depth
    NoiseOverlay.tsx    — SVG noise texture
    MagneticButton.tsx  — Magnetic hover
```

### Animation Rules
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy)
- Duration: 600-800ms for reveals, 200-300ms for hovers
- Scroll: CSS `animation-timeline: view()` first
- NO JavaScript animation libraries

### Anti-Generic Checklist
- [ ] Scroll-driven gradient shifts
- [ ] Container query cards
- [ ] No symmetric 3-column grids
- [ ] Noise texture overlay
- [ ] Gradient text uses OKLCH
- [ ] Each section has unique CSS interaction
- [ ] No JavaScript animation libraries
- [ ] Semantic HTML throughout
- [ ] Accessibility tested

---

## CROSS-PROJECT RULES

### Technique Budget
- **Khemji:** 3-4 unique techniques per section
- **ShipBridge:** 5-6 unique techniques total
- **MAAC:** 10+ unique techniques (already have 10 components)
- **Silbar:** 3-4 unique techniques per section (CSS only)

### Color Rules
- Never use more than 5 colors per project
- Always use OKLCH for gradients
- Always use color-mix() for dynamic tinting
- Always check contrast ratio (4.5:1)

### Typography Rules
- Never use more than 2 fonts per project
- Always use variable fonts when available
- Always animate font-weight on scroll (MAAC)
- Always use clamp() for responsive sizes

### Animation Rules
- Never use default CSS easings
- Always use prefers-reduced-motion
- Always use transform and opacity (compositor-thread)
- Always use Intersection Observer for scroll triggers

---

## HOW TO USE THIS FILE

When starting ANY task:
1. Identify the project type
2. Read the constraints (NEVER/ALWAYS)
3. Check the technique assignments
4. Follow the color/typography rules
5. Check the anti-generic checklist
6. Then write code

**Breaking project constraints = instant redo.**
