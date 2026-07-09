# anime.js v4 — Skill Archive

**Source:** https://github.com/BowTiedSwan/animejs-skill
**Author:** BowTiedSwan
**Extracted:** July 2026

**⚠️ WARNING**: anime.js v4 has never shipped as a stable release. The npm package `animejs` remains at v3.2.x. The v4 branch remains in development since 2022 with no stable release. Patterns in this file document the *intended* v4 API which may differ from the final implementation or may never ship as documented. For production, use GSAP or the stable anime.js v3.x.

Full adaptation of the anime.js v4 skill repo. Covers v4 patterns including stagger, morph, timeline, motion path, and production patterns. All credit to the original author.

---

## anime.js v4 Key Concepts

### Core Syntax
```javascript
anime({ targets: '.el', translateX: 250, duration: 1000, easing: 'easeOutExpo' })
```

### What Changed in v4
- `stagger` → built-in `.stagger()` method
- `morph` → native SVG morphing (no plugin)
- `timeline` → cleaner `.add()` API
- `motionPath` → native (no plugin needed)
- Performance: RAF-based, no more interval fallback

---

## Stagger Patterns

Stagger applies the same animation to multiple targets with an offset delay between each.

### Basic Stagger
```javascript
anime({ targets: '.item', translateY: -20, delay: anime.stagger(50) })
```

### Stagger from Center
```javascript
anime({ targets: '.item', opacity: 1, delay: anime.stagger(50, { from: 'center' }) })
```

### Stagger Grid (2D)
```javascript
anime({ targets: '.cell', scale: [0, 1], delay: anime.stagger(30, { grid: [5, 5], from: 'center' }) })
```

### Stagger with Axis
```javascript
// Stagger by column first
anime({ targets: '.item', translateY: -20, delay: anime.stagger(50, { axis: 'x' }) })
```

### Stagger Direction
```javascript
anime({ targets: '.item', translateX: 100, delay: anime.stagger(50, { direction: 'reverse' }) })
anime({ targets: '.item', translateX: 100, delay: anime.stagger(50, { direction: 'alternate' }) })
```

### Stagger Easing
The delay itself can be eased:
```javascript
anime({ targets: '.item', opacity: 1, delay: anime.stagger(30, { easing: 'easeOutQuad' }) })
```
This creates a wave effect where items start slow, speed up, then slow down.

---

## SVG Morphing

### Two-Path Morph
```javascript
anime({ targets: '#path-a', d: '#path-b', easing: 'easeInOutQuad', duration: 1500 })
```

### Multi-Sequence Morph
```javascript
anime({ targets: '#path', d: [
  { value: '#path-b' },
  { value: '#path-c' },
  { value: '#path-d' }
], easing: 'easeInOutQuad', duration: 2000 })
```

### Morph with Stagger (Multiple Paths)
```javascript
anime({ targets: '.paths', d: '.target-paths', delay: anime.stagger(100), easing: 'easeInOutQuad' })
```

### Requirements for Morph
- Both paths must have same number of points/nodes
- M (move) and C (curve) counts must match
- Both paths must use same command types
- Use SVG editor (Illustrator, Figma) to ensure compatible paths

---

## Motion Path

Move an element along an SVG path.

### Follow SVG Path
```javascript
anime({ targets: '.dot', translateX: [0, 250], translateY: [0, -50], easing: 'easeInOutSine', duration: 2000 })
// For true path following, use motionPath:
anime({ targets: '.dot', motionPath: '#path-el', duration: 2000, easing: 'easeInOutQuad' })
```

### Motion Path with Rotation
```javascript
anime({ targets: '.car', motionPath: { path: '#track', autoRotate: 180 }, duration: 3000, easing: 'linear' })
```

### Motion Path with Multi-Point
```javascript
anime({ targets: '.dot', keyframes: [
  { translateX: 100, translateY: 0 },
  { translateX: 100, translateY: 100 },
  { translateX: 0, translateY: 100 },
  { translateX: 0, translateY: 0 }
], duration: 4000, easing: 'easeInOutQuad', loop: true })
```

---

## Timeline

### Basic Timeline
```javascript
const tl = anime.timeline({ easing: 'easeOutExpo', duration: 750 })
tl.add({ targets: '.a', translateX: 250 })
  .add({ targets: '.b', translateX: 250 })
  .add({ targets: '.c', translateX: 250 })
```

### Overlapping Animations
```javascript
const tl = anime.timeline({ easing: 'easeOutExpo', duration: 1000 })
tl.add({ targets: '.a', translateX: 250 }, 0)              // starts at 0ms
  .add({ targets: '.b', translateX: 250 }, '-=500')        // starts 500ms before previous ends
  .add({ targets: '.c', translateX: 250 }, '+=250')        // starts 250ms after previous ends
```

### Timeline with Different Eases per Step
```javascript
const tl = anime.timeline()
tl.add({ targets: '.a', translateX: 250, duration: 1000, easing: 'easeOutExpo' })
  .add({ targets: '.a', translateY: 50, duration: 500, easing: 'easeOutBounce' })
  .add({ targets: '.a', scale: 2, duration: 500, easing: 'easeOutElastic' })
```

---

## Production Patterns

### 1. Pause/Resume Controls
```javascript
const animation = anime({ targets: '.el', translateX: 250, autoplay: false })
document.querySelector('.play').onclick = () => animation.play()
document.querySelector('.pause').onclick = () => animation.pause()
document.querySelector('.restart').onclick = () => animation.restart()
```

### 2. Scroll-Triggered (Intersection Observer)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({ targets: entry.target, translateY: [30, 0], opacity: [0, 1], easing: 'easeOutExpo', duration: 800 })
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })
document.querySelectorAll('.animate-in').forEach(el => observer.observe(el))
```

### 3. Mouse-Parallax
```javascript
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20
  const y = (e.clientY / window.innerHeight - 0.5) * 20
  anime({ targets: '.parallax-layer', translateX: x, translateY: y, duration: 300, easing: 'linear' })
})
```

### 4. Cleanup on Unmount
```javascript
const animation = anime({ targets: '.el', translateX: 250, autoplay: true })
// On unmount/cleanup:
animation.pause()
animation.seek(0) // Reset to start
```

### 5. Responsive Values
```javascript
const isMobile = window.innerWidth < 768
anime({ targets: '.el', translateX: isMobile ? 150 : 250 })
```

---

## Easing Reference

| Name | Use |
|------|-----|
| `linear` | Mechanical/constant motion |
| `easeOutQuad` | Subtle deceleration |
| `easeOutCubic` | Noticeable deceleration |
| `easeOutQuart` | Pronounced deceleration |
| `easeOutQuint` | Dramatic deceleration |
| `easeOutExpo` | Very dramatic (best for entrances) |
| `easeOutBack` | Overshoots slightly (cards, modals) |
| `easeOutElastic` | Bounces at end (fun elements) |
| `easeOutBounce` | Ball-like bounce |
| `easeInOutQuad` | Smooth both ways (transitions) |
| `easeInOutExpo` | Dramatic both ways (page transitions) |
| `steps(10)` | Frame-by-frame look (retro) |

### Custom Cubic Bezier
```javascript
anime({ targets: '.el', translateX: 250, easing: 'cubicBezier(0.22, 1, 0.36, 1)' })
```

---

## Performance Tips

1. **Use `will-change`** on animated elements: `will-change: transform`
2. **Prefer `transform` and `opacity`** — GPU composited, no layout thrash
3. **Keep targets under 100** for smooth 60fps
4. **Use `duration` minimum 300ms** — faster = perceptible jank
5. **Avoid animating `width`, `height`, `top`, `left`** — triggers layout
