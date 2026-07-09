# Mobile & All-Device Optimization — Production Patterns

---

## 1. Mobile-First Mindset

> 60%+ of global traffic is mobile. Start the layout at 375px, then enhance up.

### Base styles (no media query) = mobile
```css
/* Default: mobile. No media query needed. */
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

/* Tablet+ */
@media (min-width: 48em) {
  .container {
    flex-direction: row;
    padding: 2rem;
  }
}
```

### Breakpoint strategy
```css
/* Use em, not px — respects browser zoom */
/* Scope: 375px-479px small phones */
/* Base: 480px-767px large phones (default styles) */
@container (min-width: 48em)  {}  /* 768px — tablet portrait */
@container (min-width: 64em)  {}  /* 1024px — tablet landscape */
@container (min-width: 80em)  {}  /* 1280px — desktop */
@container (min-width: 90em)  {}  /* 1440px — wide desktop */
```

---

## 2. Container Queries (2026 Standard)

Container queries replace media queries for component-level responsiveness. All modern browsers support them.

### Declare container
```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}
```

### Query from children
```css
@container card (min-width: 30rem) {
  .card { display: grid; grid-template-columns: 200px 1fr; }
}
```

### Container query units
```css
font-size: clamp(1rem, 3cqi, 1.5rem);  /* 3% of container inline size */
padding: 2cqw;                           /* 2% of container width */
```

### Migration: media → container
```
Step 1: Add container-type to wrappers
Step 2: Replace @media with @container inside components
Step 3: Remove viewport breakpoints from component CSS
Step 4: Use container query units for fluid sizing
```

---

## 3. Fluid Typography (No Breakpoints Needed)

```css
/* Single line replaces 3-4 media queries */
h1 {
  font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3.25rem);
  line-height: 1.2;
}

p {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
}
```

---

## 4. Touch & Interaction

### Pointer detection
```css
/* Fine pointer = mouse/stylus — enable hover effects */
@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: scale(1.02); }
}

/* Coarse pointer = finger — larger targets, no hover */
@media (hover: none) and (pointer: coarse) {
  .card:active { transform: scale(0.98); }
  .touch-target { min-height: 44px; min-width: 44px; }
}
```

### Touch fallback for GSAP interactions
```ts
function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Skip magnetic/hover effects on touch
if (!isTouchDevice()) {
  gsap.to('.magnetic-btn', {
    scale: 1.1,
    scrollTrigger: { trigger: '.magnetic-btn' }
  });
}
```

### Gesture handling
```ts
let startX = 0, startY = 0;

element.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });

element.addEventListener('touchmove', e => {
  const dx = e.touches[0].clientX - startX;
  const dy = e.touches[0].clientY - startY;
  // Horizontal swipe or vertical scroll? Decide by angle
  if (Math.abs(dx) > Math.abs(dy)) {
    e.preventDefault(); // horizontal swipe
    handleSwipe(dx);
  }
  // else: let vertical scroll happen naturally
}, { passive: false });
```

---

## 5. Responsive Animation Strategy

### MatchMedia for responsive animations
```ts
useEffect(() => {
  const mm = gsap.matchMedia();

  // Desktop: full parallax
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.to('.parallax', { yPercent: -30, ease: 'none', scrollTrigger: { scrub: 1 } });
  });

  // Mobile: static, no parallax
  mm.add('(max-width: 767px)', () => {
    gsap.set('.parallax', { y: 0 });
  });

  return () => mm.revert();
}, []);
```

### Animation intensity by device
```ts
const intensityLevel: 'none' | 'minimal' | 'full' =
  isLowEndDevice() ? 'none' :
  isTouchDevice() ? 'minimal' :
  'full';
```

---

## 6. Performance on Mobile

### What kills mobile animation
```
1. backdrop-filter on many elements (GPU memory pressure)
2. box-shadow animation (expensive paint)
3. Too many ScrollTriggers (scroll listener overhead)
4. Heavy filter: blur() compositing
5. Concurrent GSAP tweens on >20 elements
```

### Budget for mobile
```
GSAP tweens:   ≤ 15 concurrent
ScrollTriggers: ≤ 8 per page
Canvas particles: ≤ 500 (vs 5000 on desktop)
Lottie players: ≤ 2 visible at once
```

### Reduce motion automatically
```ts
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Full cinematic animation
  });
  // No else needed — reduced-motion users get no animation by default
});
```

---

## 7. Responsive GSAP ScrollTrigger

### Responsive start/end with matchMedia
```ts
ScrollTrigger.matchMedia({
  '(min-width: 768px)': function() {
    // Desktop ScrollTriggers with desktop positions
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true
    });
  },
  '(max-width: 767px)': function() {
    // Mobile: no pins, simpler triggers
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top 80%',
      end: 'bottom 20%'
    });
  }
});
// Everything inside auto-kills when MQ changes
```

### Invalidate on resize
```ts
// Recalculate all ScrollTrigger positions when viewport changes
ScrollTrigger.addEventListener('refreshInit', () => {
  // Recalculate dynamic values here
});
// Or per-trigger:
scrollTrigger: {
  invalidateOnRefresh: true  // ← recalculate start/end on resize
}
```

---

## 8. Viewport Units & Safe Areas

### Safe area for notches/home indicator
```css
/* Device safe areas (iOS notch, Android cutouts) */
.padded-container {
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

### Dynamic viewport units
```css
/* dvh = dynamic viewport height (accounts for address bar) */
.hero {
  height: 100dvh;
  /* Fallback: 100vh, but dvh is preferred in 2026 */
}

/* svh = smallest viewport height (when address bar is showing) */
.sticky-footer {
  height: 100svh;
}
```

---

> **ponytail**: Mobile is the baseline, not an afterthought. Start at 375px, use container queries, and skip heavy effects on low-end devices. If performance budget isn't defined, define it before writing a single ScrollTrigger.
