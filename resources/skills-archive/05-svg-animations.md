# SVG Animations — Skill Archive

**Source:** https://github.com/supermemoryai/svg-animations
**Author:** supermemoryai
**Extracted:** July 2026

Full adaptation of the supermemoryai SVG animations skill — comprehensive catalog of SVG animation techniques organized by approach (SMIL, CSS, JS, Canvas). All credit to the original author.

---

## Overview

SVG animations split into 3 technical approaches, with Canvas/GL as the 4th for complex FX:

| Approach | Strengths | Weaknesses | Best for |
|----------|-----------|------------|----------|
| **SMIL** | Declarative, works without JS, precise timing | No IE support, limited easing, no scroll sync | Simple reveals, loading, decorative |
| **CSS** | GPU-accelerated, framework-friendly, `@keyframes` | Can't animate SVG-specific attributes (d, points) | Transforms, opacity, clip-path |
| **JS (GSAP/anime)** | Full control, scroll sync, morph, stagger | JS dependency, more code | Complex sequences, scroll-triggered, morph |
| **Canvas/GL** | Pixel-level control, GPU particles | No DOM integration, more code | Generative, particle, filter FX |

---

## SMIL Animations

### `<animate>` — Single Property
```svg
<circle r="20">
  <animate attributeName="r" values="20;40;20" dur="2s" repeatCount="indefinite"/>
</circle>
```

### `<animateTransform>` — Transform Animation
```svg
<rect width="50" height="50">
  <animateTransform attributeName="transform" type="rotate" values="0 25 25;360 25 25" dur="3s" repeatCount="indefinite"/>
</rect>
```

### `<animateMotion>` — Path Following
```svg
<circle r="10">
  <animateMotion dur="4s" repeatCount="indefinite" path="M0,0 C100,100 200,-100 300,0"/>
</circle>
```

### `<set>` — Instant Change
```svg
<rect>
  <set attributeName="fill" to="red" begin="2s"/>
</rect>
```

### Sequential Timing
```svg
<rect>
  <animate attributeName="opacity" values="0;1" begin="0s" dur="1s" fill="freeze"/>
  <animate attributeName="width" values="0;100" begin="1s" dur="1s" fill="freeze"/>
</rect>
```

### SMIL Key Points
- `fill="freeze"` holds final state
- `begin="0s; 5s"` loops every 5s
- `keyTimes` allows non-uniform progress: `keyTimes="0;0.3;1" values="0;100;50"`
- `calcMode="spline"` with `keySplines` for bezier timing

---

## CSS SVG Animations

### What CSS Can Animate on SVG
| Property | Works? | Notes |
|----------|--------|-------|
| `transform` | ✅ | translate, scale, rotate |
| `opacity` | ✅ | |
| `fill` | ✅ | |
| `stroke` | ✅ | |
| `stroke-dasharray/offset` | ✅ | Draw effect |
| `d` (path data) | ❌ | JS required |
| `points` (polygon) | ❌ | JS required |
| `viewBox` | ❌ | JS required |

### CSS Draw Effect
```css
.path { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 2s forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
```

### CSS Morph (Limited — Only Clip-Path)
```css
.element { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transition: clip-path 0.5s; }
.element:hover { clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); }
```

### CSS Filter Animations
```css
.svg-filter { filter: blur(0px) brightness(1); transition: filter 0.5s; }
.svg-filter:hover { filter: blur(2px) brightness(1.3); }
```

---

## JS SVG Animations (GSAP)

### GSAP + SVG-Specific

| Plugin | Purpose |
|--------|---------|
| `MorphSVGPlugin` | Morph between paths (paid) |
| `DrawSVGPlugin` | Draw effect with control (paid) |
| `MotionPathPlugin` | Move element along path |

### Path Morph (GSAP)
```javascript
gsap.to('#path', { morphSVG: '#targetPath', duration: 2, ease: 'power2.inOut' })
```

### Draw Effect (GSAP)
```javascript
gsap.from('.path', { drawSVG: 0, duration: 2, stagger: 0.1 })
```

### Motion Path (GSAP)
```javascript
gsap.to('.dot', { motionPath: { path: '#svgPath', align: '#svgPath', alignOrigin: [0.5, 0.5] }, duration: 3 })
```

### SVG Transform with GSAP
```javascript
gsap.to('.gear', { rotation: 360, transformOrigin: '50% 50%', duration: 5, repeat: -1, ease: 'none' })
```

---

## SVG Filter Effects

### Noise / Grain
```svg
<filter id="noise">
  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise"/>
  <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise"/>
  <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply"/>
</filter>
```

### Glow
```svg
<filter id="glow">
  <feGaussianBlur stdDeviation="3" result="blur"/>
  <feMerge>
    <feMergeNode in="blur"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
```

### Gooey
```svg
<filter id="goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo"/>
  <feBlend in="SourceGraphic" in2="goo"/>
</filter>
```

### Drop Shadow
```svg
<filter id="shadow">
  <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.3)"/>
</filter>
```

### Duotone
```svg
<filter id="duotone">
  <feColorMatrix type="matrix" values="1 0 0 0 0.1  0 1 0 0 0.2  0 0 1 0 0.5  0 0 0 1 0"/>
</filter>
```

---

## Canvas/GL SVG Techniques

### Canvas Particle from SVG Path
```javascript
// Extract path points using getPointAtLength()
const path = document.querySelector('path')
const points = []
for (let i = 0; i < 100; i++) {
  const p = path.getPointAtLength(i / 100 * path.getTotalLength())
  points.push(p)
}
// Use these points as particle targets
```

### Three.js SVG Texture
```javascript
const loader = new THREE.TextureLoader()
const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
const url = URL.createObjectURL(svgBlob)
const texture = loader.load(url)
```

---

## When to Use Which

| Technique | When | Example |
|-----------|------|---------|
| SMIL `<animate>` | Simple, no-JS decorations | Loading spinner, pulsing icon |
| CSS `stroke-dasharray` | Draw effect on scroll | Logo reveal, illustration |
| CSS `transform` + `opacity` | Animated SVG icons | Hover effects, toggle states |
| GSAP MorphSVG | Logo transition, shape change | Brand hover, state morph |
| GSAP MotionPath | Object following complex path | Animated illustration, data flow |
| SVG Filter + JS | Liquid, gooey, noise | Menu transitions, hero effects |
| Canvas + SVG path | Particle systems | Hero backgrounds, creative FX |
