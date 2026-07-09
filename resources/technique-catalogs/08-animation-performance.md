# Animation Performance — Core Web Vitals & Optimization

---

## 1. The Performance Budget

### 2026 Core Web Vitals Targets
```
LCP (Largest Contentful Paint): ≤ 2.0s  at p75
INP (Interaction to Next Paint):  ≤ 150ms at p75
CLS (Cumulative Layout Shift):    ≤ 0.1  at p75
```

### Animation Budget Per Frame
```
60fps = 16.7ms per frame
  ├── JS execution:  ≤ 5ms
  ├── Style/Layout:  ≤ 3ms
  ├── Paint:         ≤ 3ms
  └── Compositing:   ≤ 5ms
Frames > 50ms = INP failure (Long Animation Frame)
```

---

## 2. Compositor-Only Properties

### Safe (GPU-accelerated)
```css
transform: translate(), scale(), rotate(), skew()
opacity
will-change
clip-path (simple shapes)
filter (simple: blur, grayscale, brightness)
```

### Unsafe (triggers layout → paint → composite)
```css
width / height
top / left / right / bottom
margin / padding
border (width changes)
font-size / line-height
box-shadow (animated)
```

### Rule
> Animate only `transform` and `opacity` for 60fps guaranteed. Everything else risks jank.

### will-change: correct usage
```css
/* Ponytail: use sparingly — too many = memory thrash */
.animated-element {
  will-change: transform, opacity;
}
/* Remove after animation completes */
.animated-element.idle {
  will-change: auto;
}
/* Never apply to more than ~10 elements per page */
```

---

## 3. GSAP Performance Patterns

### Avoid layout thrashing
```ts
// BAD — forces layout read + write per frame
gsap.to('.box', { left: () => getComputedOffset(), duration: 1 });

// GOOD — read once, write via GPU-composited prop
gsap.to('.box', { x: 200, duration: 1 });
```

### Batch ScrollTriggers
```ts
// BAD — separate listeners for each
gsap.to('.a', { scrollTrigger: { trigger: '.a' } });
gsap.to('.b', { scrollTrigger: { trigger: '.b' } });

// GOOD — single timeline, one ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: { trigger: '.container', start: 'top top', end: 'bottom bottom', scrub: 1 }
});
tl.to('.a', { x: 200 })
  .to('.b', { y: 100 }, 0);
```

### Limit concurrent tweens
```ts
// GSAP can handle hundreds — GPU compositing chokes past ~50 animated layers
// Use gsap.utils.toArray() with stagger instead of individual tweens
```

### fastScrollEnd for mobile
```ts
gsap.to(target, {
  scrollTrigger: {
    fastScrollEnd: true,  // skip scrub frames on fast flick
    preventOverlaps: true
  }
});
```

---

## 4. Bundle Size Impact

| Library | Min+gzip | Tree-shakeable | Notes |
|---------|----------|----------------|-------|
| GSAP core | ~12KB | Yes | Add plugins as-needed |
| GSAP + ScrollTrigger | ~18KB | Partial | ScrollTrigger can't tree-shake |
| GSAP + all Club plugins | ~45KB | No | Use dynamic import |
| Three.js (minimal) | ~50KB | Partial | Import only what you use |
| Three.js (full) | ~150KB+ | Partial | r170+ improved but still large |
| anime.js | ~8KB | Yes | v3.x (v4 never shipped stable) |
| Framer Motion | ~32KB | Yes | React-only |
| Lottie-web | ~45KB | No | dotLottie format compresses assets |
| CSS animations | 0KB | N/A | Native — no JS cost |

### Dynamic import strategy
```ts
// Keep initial bundle lean — load animation libs on interaction
const gsap = await import('gsap');
const { ScrollTrigger } = await import('gsap/ScrollTrigger');
```

### Detect and bail on low-end devices
```ts
function isLowEndDevice(): boolean {
  const mem = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  if (mem && mem < 4) return true;
  if (cores && cores < 4) return true;
  return false;
}

// Usage: reduce animation complexity or skip entirely
if (!isLowEndDevice()) { /* install heavy animations */ }
```

---

## 5. Lottie Optimization

### Format decision
```
Simple icon:         SVG + CSS animation  (<1KB)
UI micro-interaction: Lottie JSON         (2-15KB)
Complex scene:        Lottie .lottie      (10-100KB, compressed)
Full 3D:              Three.js            (50KB+)
Video loop:           MP4/WebM            (100KB+)
```

### Lottie performance rules
```
1. Use dotLottie (.lottie) format — zip compression saves 30-90%
2. Lazy load below-fold animations via IntersectionObserver
3. Limit concurrent Lottie instances to ≤3
4. Prefer canvas renderer over SVG for >5 layers
5. Never loop animations that aren't visible
```

### IntersectionObserver lazy loader
```ts
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const anim = lottie.loadAnimation({
        container: entry.target,
        path: entry.target.dataset.lottie,
        renderer: 'canvas',
        autoplay: true
      });
      observer.unobserve(entry.target);
    }
  });
});
document.querySelectorAll('[data-lottie]').forEach(el => observer.observe(el));
```

---

## 6. Canvas vs DOM vs WebGL Decision

| Dimension | DOM + CSS | DOM + GSAP | Canvas 2D | WebGL (Three.js) |
|-----------|-----------|------------|-----------|------------------|
| Use for | Simple UI motion | Complex sequences | Particle fields | 3D scenes |
| Max elements | ~50 smooth | ~200 smooth | ~10,000 particles | ~100,000 triangles |
| GPU usage | Compositor | Compositor | Full GPU | Full GPU |
| JS cost | 0 | Low | Medium | High |
| Accessibility | Native | Native | None (needs fallback) | None (needs fallback) |

### Rule of thumb
```
< 10 animated elements → CSS transitions/animations
10-50 → GSAP on DOM elements
50-5000 → Canvas 2D (particles, trails, data viz)
5000+ → WebGL (Three.js)
```

---

## 7. RAIL Model for Animation

```
Response:   < 50ms   (animation starts within 50ms of trigger)
Animation:  < 16.7ms (each frame @ 60fps)
Idle:       Use requestAnimationFrame, not setInterval
Load:       Lazy load animation libraries — don't block LCP
```

### Diagnosing jank with LoAF API
```ts
const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    if (entry.duration > 50) {
      console.warn('Long Animation Frame:', entry.duration + 'ms');
      entry.scripts?.forEach(s =>
        console.warn('  culprit:', s.sourceURL, s.duration + 'ms')
      );
    }
  });
});
observer.observe({ type: 'long-animation-frame', buffered: true });
```

---

> **ponytail**: Start with CSS transitions. Add GSAP only when CSS can't sequence. Add Three.js last. Each step up adds 10-150KB to the bundle — only pay for what you need.
