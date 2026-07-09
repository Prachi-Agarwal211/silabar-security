# Codrops GSAP Cinematic Tutorial

**URL:** https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/
**Author:** Codrops
**Year:** 2025

---

## Overview

Full production tutorial for building cinematic 3D scroll experiences with GSAP. Covers 4 custom easing curves, camera path animation, scroll-linked timelines, and production workflow.

## Key Techniques

### 1. Four Custom Exponential Easing Curves

The tutorial defines 4 custom eases that form the basis of cinematic motion:

```javascript
// Custom easing curves for cinematic feel
const eases = {
  expoIn: 'cubic-bezier(0.55, 0, 1, 0.45)',
  expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  expoInOut: 'cubic-bezier(0.7, 0, 0.3, 1)',
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)'
}
```

**When to use each:**
- `expoOut` (0.16, 1, 0.3, 1): Element entrance. Fast start, dramatic slow-down. Use for hero reveals, section entries.
- `expoIn` (0.55, 0, 1, 0.45): Element exit. Slow start, fast finish. Use sparingly — elements should leave quickly.
- `expoInOut` (0.7, 0, 0.3, 1): Page transitions. Slow in middle, smooth on both ends.
- `smooth` (0.22, 1, 0.36, 1): General purpose. Slight overshoot at end. Use for everything else.

### 2. Scroll Camera Path

Camera moves along a predefined path, linked to scroll progress:

```javascript
// Define camera path
const cameraPath = [
  { x: 0, y: 2, z: 8 },
  { x: 3, y: 1, z: 5 },
  { x: 0, y: 0, z: 3 },
  { x: -2, y: 3, z: 6 }
]
// Create GSAP timeline with scroll trigger
const tl = gsap.timeline({
  scrollTrigger: { trigger: '.scene', start: 'top top', end: 'bottom top', scrub: 2 }
})
// Animate camera through each point
cameraPath.forEach((pos, i) => {
  tl.to(camera.position, { x: pos.x, y: pos.y, z: pos.z, ease: 'smooth' })
    .to(camera.lookAt, { x: pos.x * 0.5, y: pos.y * 0.5, ease: 'smooth' }, '<')
})
```

### 3. Scroll-Linked Timeline Architecture

The proper pattern for complex scroll experiences — not individual ScrollTriggers per element:

```javascript
// Master timeline for the entire section
const masterTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.chapter',
    pin: true,
    start: 'top top',
    end: '+=300%',
    scrub: 1.5,
    invalidateOnRefresh: true
  }
})
// Phase 1: Environment loads
masterTL.from('.environment', { opacity: 0, duration: 1 })
  .from('.title', { y: 50, opacity: 0, duration: 1.2, ease: 'expoOut' }, '-=0.5')
  // Phase 2: Camera moves
  .to(camera.position, { x: 2, z: 4, duration: 2, ease: 'smooth' })
  // Phase 3: Detail reveals
  .from('.detail-1', { clipPath: 'inset(0 100% 0 0)', duration: 1.5, ease: 'expoOut' })
  .from('.detail-2', { scale: 0.8, opacity: 0, duration: 1, ease: 'expoOut' }, '-=0.5')
```

### 4. Performance Guards

```javascript
// Check for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
if (prefersReducedMotion.matches) {
  // Skip all GSAP animations, show final state
  gsap.set('.animated-element', { opacity: 1, y: 0, scale: 1 })
} else {
  // Run full animation
}

// Check for low-power devices
const isLowPower = !window.matchMedia('(min-width: 768px)').matches || navigator.hardwareConcurrency < 4
if (isLowPower) {
  // Reduce particle count, disable post-processing
}
```

### 5. Production Workflow

1. **Storyboard**: Plan sections, camera positions, and transitions in a document first
2. **Export easing curves**: Pre-define your easing palettes (not just defaults)
3. **Build timeline**: One master timeline per section/chapter
4. **Test midpoints**: Check animation at 25%, 50%, 75% for broken states
5. **Polish**: Add secondary animations (ambient, particles) last

## Techniques You Can Steal

| Technique | Use for |
|-----------|---------|
| 4 custom easing curves | Brand easing palette, consistent motion language |
| Camera path on scroll | Any 3D scroll experience |
| Master timeline architecture | Complex scroll narratives |
| Reduced-motion + device detection | Production-grade accessibility |
| Storyboard → timeline workflow | Any complex animation project |

## Tech Stack

- GSAP + ScrollTrigger
- Three.js (scene and camera)
- CSS 3D transforms fallback
