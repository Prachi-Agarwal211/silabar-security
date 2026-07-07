# MOBILE DESIGN, CREATIVE CODING LIBRARIES & AI DETECTION

## How to Ensure We Never Look AI-Generated — On Any Device

### Purpose
This document exists so that when our AI reads it, it understands: (1) how to make mobile experiences that feel native and impossible to replicate, (2) every creative coding library available and when to use each one, (3) how to test if a site looks AI-generated, and (4) advanced responsive techniques that maintain the "crafted" feel.

---

## PART 1: MOBILE DESIGN — NATIVE FEEL, NOT WEB FEEL

### 1.1 The Problem with Mobile Templates

Templates treat mobile as a shrunken desktop. They:
- Stack columns vertically and call it "responsive"
- Use static `vh` units that jump when the address bar appears
- Ignore safe areas (notches, home indicators)
- Use only click/tap events (no gestures, no physics)
- Never use device sensors
- Never provide haptic feedback

**Result:** The site feels like a website, not an app. It feels like a template, not a crafted experience.

### 1.2 Dynamic Viewport Units

**The Problem:** Static `vh` units include the browser's address bar. When the address bar hides on scroll, the viewport changes, causing layout "jump."

**The Solution:** Use `dvh` (Dynamic Viewport Height), `svh` (Small Viewport Height), `lvh` (Large Viewport Height).

```css
/* Old way — jumps when address bar hides */
.hero {
  height: 100vh;
}

/* New way — smooth, no jump */
.hero {
  height: 100dvh;
  /* Fallback for browsers that don't support dvh */
  height: 100vh;
  height: 100svh;
}
```

**Why this matters:** Templates use `100vh`. We use `100dvh`. The difference is invisible until you scroll, and then it's the difference between "janky" and "smooth."

### 1.3 Safe Area Handling

**The Problem:** Content gets hidden behind notches, home indicators, and system UI.

**The Solution:** Use `env(safe-area-inset-*)`.

```css
/* Bottom navigation — avoid home indicator */
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
  height: calc(60px + env(safe-area-inset-bottom));
}

/* Top content — avoid notch */
.page-content {
  padding-top: env(safe-area-inset-top);
}

/* Full-bleed content */
.hero {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

**Viewport meta tag (required):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

### 1.4 Haptic Feedback (Vibration API)

**The Problem:** Mobile interactions are purely visual. No physical confirmation.

**The Solution:** Use `navigator.vibrate()` for intentional, binary-coded feedback.

```javascript
// Success haptic (brief tap)
navigator.vibrate(50);

// Error haptic (patterned pulse)
navigator.vibrate([100, 30, 100]);

// Subtle boundary hit
navigator.vibrate(10);

// Long press confirmation
navigator.vibrate([20, 50, 20]);
```

**When to use:**
- Button press → 50ms tap
- Form submission success → [50, 30, 50]
- Error → [100, 30, 100]
- Subtle boundary → 10ms

**When NOT to use:**
- Page transitions (too frequent)
- Scroll events (battery drain)
- Hover states (no hover on mobile)

### 1.5 Device Motion & Gyroscope

**The Problem:** Templates are fixed-frame. They don't respond to how the user holds the device.

**The Solution:** Use `DeviceMotionEvent` for sensor-aware parallax.

```javascript
// Request permission (required on iOS)
async function enableMotion() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    const permission = await DeviceOrientationEvent.requestPermission();
    if (permission !== 'granted') return false;
  }
  return true;
}

// Listen for device orientation
window.addEventListener('deviceorientation', (event) => {
  const tiltX = event.gamma; // [-90, 90] — left/right tilt
  const tiltY = event.beta;  // [-180, 180] — forward/back tilt
  
  // Apply to CSS variables
  document.documentElement.style.setProperty('--tilt-x', `${tiltX}deg`);
  document.documentElement.style.setProperty('--tilt-y', `${tiltY}deg`);
});
```

```css
/* Use CSS variables for tilt-based effects */
.parallax-layer {
  transform: translate3d(
    calc(var(--tilt-x, 0) * 2px),
    calc(var(--tilt-y, 0) * 2px),
    0
  );
}
```

**Why this matters:** The site feels like it exists in 3D space. Templates feel flat. We create depth that responds to the user's physical movement.

### 1.6 Touch-Based Physics

**The Problem:** Mobile interactions are just taps. No gestures, no physics, no feel.

**The Solution:** Implement spring physics for touch interactions.

```javascript
// Touch-based spring following
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let velocityX = 0, velocityY = 0;

element.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  targetX = touch.clientX;
  targetY = touch.clientY;
});

function animate() {
  // Spring physics
  const stiffness = 0.15;
  const damping = 0.7;
  
  const forceX = (targetX - currentX) * stiffness;
  const forceY = (targetY - currentY) * stiffness;
  
  velocityX += forceX;
  velocityY += forceY;
  
  velocityX *= damping;
  velocityY *= damping;
  
  currentX += velocityX;
  currentY += velocityY;
  
  element.style.transform = `translate(${currentX}px, ${currentY}px)`;
  
  requestAnimationFrame(animate);
}
```

### 1.7 Mobile WebGL Performance

**The Problem:** Heavy animations kill mobile performance.

**The Solution:** Offload to WebGL, optimize for mobile.

```javascript
// Detect mobile and reduce quality
const isMobile = window.innerWidth < 768;
const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);

const renderer = new THREE.WebGLRenderer({
  antialias: !isMobile,
  powerPreference: isMobile ? 'low-power' : 'high-performance',
});
renderer.setPixelRatio(pixelRatio);

// Reduce particle count on mobile
const particleCount = isMobile ? 10000 : 100000;

// Use lower resolution textures on mobile
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(isMobile ? 'low-res.jpg' : 'high-res.jpg');
```

### 1.8 Mobile Comparison: Template vs. Crafted

| Feature | Template Pattern | Crafted Pattern |
|---------|-----------------|-----------------|
| **Viewport** | Static `vh` units | Dynamic `dvh` + `safe-area-inset` |
| **Response** | Visual only | Visual + Haptic pulse |
| **Motion** | Static parallax (scroll) | Sensor-aware parallax (device motion) |
| **Interaction** | Simple click/tap | Gesture-based + physics-driven |
| **Performance** | DOM animations | WebGL offloaded |
| **Safe Areas** | Ignored | Respected with `env()` |

---

## PART 2: CREATIVE CODING LIBRARIES — THE COMPLETE GUIDE

### 2.1 Rendering Libraries (The Engine)

| Library | GitHub | Stars | Primary Use | Unique Characteristic |
|---------|--------|-------|-------------|----------------------|
| **Paper.js** | paperjs/paper.js | 14k+ | 2D vector graphics | Deep Canvas integration, complex path math |
| **Two.js** | jonobr1/two.js | 10k+ | 2D/3D rendering | Renderer-agnostic (SVG/Canvas/WebGL) |
| **P5.js** | processing/p5.js | 22k+ | Creative coding | Designed for sketches, generative art |
| **D3.js** | d3/d3 | 109k+ | Data visualization | Binds data to DOM, custom geometric structures |
| **Rough.js** | rough-stuff/rough | 9k+ | Hand-drawn style | Mathematical "sketchy" algorithm |
| **Flubber** | veltman/flubber | 3k+ | Shape morphing | Smooth interpolation between different shapes |

**When to use each:**
- **Paper.js**: Complex 2D vector manipulation, path operations
- **Two.js**: When you need to switch between SVG/Canvas/WebGL
- **P5.js**: Quick prototypes, generative art, audio-visual experiments
- **D3.js**: Data visualization, custom charts, geographic data
- **Rough.js**: Hand-drawn, organic, sketchy aesthetics
- **Flubber**: SVG shape morphing, transitions between complex paths

### 2.2 Animation Libraries (The Feel)

| Library | GitHub | Stars | Primary Use | Unique Characteristic |
|---------|--------|-------|-------------|----------------------|
| **GSAP** | greensock/gsap | 18k+ | Timeline-based animation | Industry standard, ScrollTrigger, Club plugins |
| **Anime.js** | juliangarnier/anime | 48k+ | Versatile animation | Lightweight, SVG path animation |
| **Popmotion** | popmotion/popmotion | 8k+ | Functional animation | Geometry-agnostic, pure functions |
| **Motion** | motiondivision/motion | 9k+ | React animation | Declarative, layout animations |
| **Motion One** | motion-one/motion | 4k+ | Web Animations API | GPU-accelerated, off-main-thread |
| **React Spring** | pmndrs/react-spring | 28k+ | Physics-based animation | Real spring physics in React |

**When to use each:**
- **GSAP**: Complex timelines, scroll-driven animations, production projects
- **Anime.js**: Lightweight SVG animations, simple sequences
- **Popmotion**: Custom animation logic, non-React projects
- **Motion**: React layout animations, entry/exit transitions
- **Motion One**: Performance-critical animations, WAAPI-based
- **React Spring**: Physics-based interactions in React

### 2.3 Gesture & Interaction Libraries (The Bridge)

| Library | GitHub | Stars | Primary Use | Unique Characteristic |
|---------|--------|-------|-------------|----------------------|
| **use-gesture** | pmndrs/use-gesture | 10k+ | React interactions | Drag, pinch, scroll, hover data hooks |
| **Hammer.js** | hammerjs/hammer.js | 23k+ | Touch gestures | Multi-touch gesture recognition |
| **ZingTouch** | zingchart/zingtouch | 2k+ | Touch gestures | Advanced gesture detection |

**When to use each:**
- **use-gesture**: React projects, pipe gesture data to react-spring/Motion
- **Hammer.js**: Non-React projects, complex gesture recognition
- **ZingTouch**: Advanced multi-touch interactions

### 2.4 How to Combine Libraries for Impossible Experiences

**Example 1: Hand-drawn interactive graph that morphs on drag**
1. **Render**: Rough.js (hand-drawn style)
2. **Interact**: use-gesture (track drag)
3. **Animate**: React Spring (physics-based feel)
4. **Morph**: Flubber (shape transitions)

**Example 2: Data visualization that reacts to scroll**
1. **Render**: D3.js (data binding)
2. **Interact**: GSAP ScrollTrigger (scroll detection)
3. **Animate**: GSAP (timeline orchestration)
4. **Style**: Custom shaders (WebGL post-processing)

**Example 3: Generative art that reacts to music**
1. **Render**: P5.js or Three.js
2. **Analyze**: Web Audio API (FFT analysis)
3. **Animate**: Custom requestAnimationFrame loop
4. **Interact**: use-gesture (touch/mouse input)

---

## PART 3: HOW TO TEST IF A SITE LOOKS AI-GENERATED

### 3.1 The "Visual Elevator Music" Test

**Definition:** Content that is technically polished, visually inoffensive, but fundamentally generic and devoid of authentic brand strategy.

**The Test:** If a site feels "perfectly fine" but leaves you unable to recall a single unique detail 10 minutes later, it's "visual elevator music."

### 3.2 The 10 AI Detection Markers

| # | Marker | AI Pattern | Human Pattern |
|---|--------|-----------|---------------|
| 1 | **Layout** | Standard 3-column / hero layout | Bespoke architectural layouts |
| 2 | **Typography** | Inter, Poppins, Roboto | Curated, display-pair fonts |
| 3 | **Color** | Safe gradient mashups | Context-aware, unique palettes |
| 4 | **UI Tropes** | Heavy shadows, large border-radius | Custom depth, intentional whitespace |
| 5 | **Motion** | Generic linear fade-ins | Physics-based, story-driven |
| 6 | **Navigation** | Logo left, links center, CTA right | Unique, brand-specific |
| 7 | **Content** | "Revolutionizing X with AI" | Specific, brand-aligned voice |
| 8 | **Spacing** | Mathematically uniform | Intentional rhythm, visual tension |
| 9 | **Cards** | Same size, same radius, same shadow | Varied, asymmetric, intentional |
| 10 | **Emotion** | Feels "fine" | Feels "alive" |

### 3.3 The Awwwards Judge Test

Awwwards judges evaluate on:
- **Creativity (20%)**: Originality, innovation, risk-taking
- **Design (30%)**: Visual hierarchy, typography, color, layout
- **UX/UI (30%)**: Intuitive navigation, accessibility, responsiveness
- **Content (10%)**: Copy quality, storytelling, brand voice
- **Technology (10%)**: Performance, code quality, innovation

**AI sites consistently fail in:**
- Creativity (by definition, AI averages training data)
- Emotional storytelling (AI treats motion as separate components)
- Brand cohesion (messaging, visuals, UI feel patched together)

### 3.4 The Self-Check Question

> "Is this design serving a unique brand strategy, or is it just filling space in a popular template?"

If you can't answer this immediately, the site is template-like.

### 3.5 The "Remember One Thing" Test

After viewing a site, ask yourself:
- "What is ONE thing I remember about this site?"
- If you can't answer, the site is template-like
- If you remember "it looked nice" — that's template-like
- If you remember "the way the text animated" or "the cursor changed shape" — that's crafted

---

## PART 4: ADVANCED RESPONSIVE DESIGN

### 4.1 Fluid Typography

**The Problem:** Media queries create abrupt font size changes.

**The Solution:** Use `clamp()` for fluid scaling.

```css
/* Old way — jumps at breakpoints */
h1 {
  font-size: 2rem;
}
@media (min-width: 768px) {
  h1 { font-size: 3rem; }
}
@media (min-width: 1024px) {
  h1 { font-size: 4rem; }
}

/* New way — fluid, no jumps */
h1 {
  font-size: clamp(2rem, 1.5rem + 2.5vw, 4rem);
}

/* Even better — anchored in rem for accessibility */
h1 {
  font-size: clamp(1.5rem, 0.5rem + 3vw, 3rem);
}
```

**Why `rem` anchoring matters:** If a user increases their browser font size, `vw`-only values won't scale. `rem`-anchored values respect user preferences.

### 4.2 Container Queries

**The Problem:** Media queries only look at the viewport. Components can't react to their parent's size.

**The Solution:** Use container queries for component-aware responsive design.

```css
/* Define a container */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Component reacts to its container, not viewport */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
```

**Why this matters:** A card can be horizontal in a wide sidebar and vertical in a narrow main content area — without knowing the viewport size.

### 4.3 CSS Subgrid

**The Problem:** Nested grids can't align with parent grids.

**The Solution:** Use `subgrid` to inherit parent grid tracks.

```css
/* Parent grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Child inherits parent's columns */
.card {
  display: grid;
  grid-template-columns: subgrid;
  grid-row: span 2;
}

/* Now card's internal elements align with sibling cards */
.card-title { grid-column: 1 / -1; }
.card-image { grid-column: 1 / 2; }
.card-text { grid-column: 2 / 3; }
```

### 4.4 Logical Properties

**The Problem:** `margin-left` doesn't work for RTL languages.

**The Solution:** Use flow-relative properties.

```css
/* Old way — breaks in RTL */
.sidebar {
  margin-right: 2rem;
  padding-left: 1rem;
}

/* New way — works in all writing modes */
.sidebar {
  margin-inline-end: 2rem;
  padding-inline-start: 1rem;
}
```

### 4.5 User Preference Media Features

```css
/* Respect dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --accent: #BF953F;
  }
}

/* Respect high contrast preference */
@media (prefers-contrast: high) {
  :root {
    --text: #000000;
    --bg: #ffffff;
    --accent: #0000ff;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4.6 CSS Custom Properties for Responsive Design

```css
:root {
  /* Fluid spacing scale */
  --space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  --space-md: clamp(1rem, 0.8rem + 1vw, 2rem);
  --space-lg: clamp(2rem, 1.5rem + 2vw, 4rem);
  --space-xl: clamp(4rem, 3rem + 4vw, 8rem);
  
  /* Fluid type scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
  --text-2xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);
  --text-hero: clamp(2.5rem, 1.5rem + 5vw, 8rem);
}

/* Use in components */
.card {
  padding: var(--space-md);
}

.heading {
  font-size: var(--text-xl);
  line-height: 1.2;
}
```

### 4.7 Advanced Responsive Checklist

| Technique | Best Practice |
|-----------|--------------|
| **Fluid Type** | Use `clamp(min, calc(base + dynamic), max)` anchored in `rem` |
| **Grid** | Use Subgrid for alignment across nested components |
| **Layout** | Use Container Queries for component-aware design |
| **Theming** | Use CSS `:root` variables; toggle via prefers-color-scheme/contrast |
| **Flow** | Use Logical Properties for RTL support |
| **Viewport** | Use `dvh` + `safe-area-inset` |
| **Motion** | Respect `prefers-reduced-motion` |
| **Contrast** | Respect `prefers-contrast` |

---

## PART 5: THE COMPLETE ANTI-TEMPLATE CHECKLIST

Before launching any page, verify:

### Visual
- [ ] Typography is NOT Inter, Roboto, or Poppins
- [ ] Colors are NOT generic blue/purple gradients
- [ ] Layout is NOT 3-column symmetric grid
- [ ] Cards have DIFFERENT sizes, radius, shadows
- [ ] Spacing has RHYTHM, not uniform padding
- [ ] Background has TEXTURE (grain, noise, subtle pattern)

### Motion
- [ ] Easing curves are CUSTOM (not CSS defaults)
- [ ] Animations have VARIANCE (random delays, organic timing)
- [ ] Scroll-linked animations respond to VELOCITY
- [ ] Hover states have PHYSICS (spring, overshoot)
- [ ] Page transitions feel CINEMATIC (not instant)

### Mobile
- [ ] Viewport uses `dvh` not just `vh`
- [ ] Safe areas are respected
- [ ] Touch interactions have PHYSICS
- [ ] Haptic feedback on key actions
- [ ] Device motion parallax (if appropriate)

### Responsive
- [ ] Typography uses `clamp()` for fluid scaling
- [ ] Components use Container Queries
- [ ] Grid uses Subgrid for alignment
- [ ] Logical Properties for RTL support
- [ ] Respects `prefers-color-scheme`
- [ ] Respects `prefers-contrast`
- [ ] Respects `prefers-reduced-motion`

### Brand
- [ ] Can you name ONE unique thing about this site?
- [ ] Does the site have a consistent PERSONALITY?
- [ ] Does the copy sound like THIS BRAND, not generic?
- [ ] Do all elements work in HARMONY?

---

## SOURCES

- MDN Vibration API
- CSS Viewport Units (web.dev)
- Apple Human Interface Guidelines
- MDN DeviceMotionEvent
- Paper.js, Two.js, P5.js, D3.js, Rough.js, Flubber GitHub repos
- GSAP, Anime.js, Popmotion, Motion, Motion One, React Spring GitHub repos
- use-gesture, Hammer.js, ZingTouch GitHub repos
- Utsubo: AI Website vs Custom Design Data Study
- UX Planet: How To Spot AI-Generated Design
- Fortune: "Visual Elevator Music" and Mode Collapse
- CSS Container Queries (web.dev)
- CSS Subgrid (web.dev)
- CSS Logical Properties (web.dev)
