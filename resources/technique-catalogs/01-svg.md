# SVG Techniques — Full Tutorial Catalog

---

## 1. Path Morphing

### Theory
Morphing transforms one SVG path shape into another by interpolating the `d` attribute. Both paths must have the same number and type of commands (same count of M, C, L, etc.). Most editors (Figma, Illustrator) export compatible paths if the edit history is a simple shape change.

### Step by Step

**1. Prepare compatible paths**
```
Path A: M0,0 C50,50 100,50 150,0
Path B: M0,0 C50,100 100,100 150,0
```
Both have: M + 2x C. Compatible.

**2. GSAP approach (MorphSVGPlugin)**
```javascript
gsap.to('#shape', {
  morphSVG: '#shape-target',
  duration: 1.5,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.section', start: 'top 80%' }
})
```

**3. anime.js approach**
```javascript
anime({
  targets: '#shape',
  d: '#shape-target',
  easing: 'easeInOutQuad',
  duration: 1500
})
```

**4. CSS approach (clip-path only)**
```css
.element { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transition: clip-path 0.5s; }
.element.active { clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); }
```

### Variants
- **On hover**: Morph between two brand logo variants
- **On scroll**: Sequential morph through 3+ shapes
- **With stagger**: Multiple elements morph in sequence
- **Reverse**: Morph back on leave/exit

### Requirements
- Equal path point count
- Equal command types
- GSAP MorphSVGPlugin is a paid Club GSAP plugin
- anime.js does morph natively in v4

### When to Use
- Logo reveals and transitions
- Shape-shifting hero backgrounds
- Interactive/playful brand elements
- Section divider morphs

---

## 2. Draw/Reveal Effect

### Theory
Uses `stroke-dasharray` and `stroke-dashoffset`. The dash is set to the total path length (measured via `getTotalLength()`), then offset to hide the stroke. Animating offset to 0 "draws" the line.

### Step by Step

**1. Measure path length**
```javascript
const path = document.querySelector('.draw-path')
const length = path.getTotalLength()
path.style.strokeDasharray = length
path.style.strokeDashoffset = length
```

**2. Animate with CSS**
```css
.draw-path { stroke-dasharray: var(--length); stroke-dashoffset: var(--length); animation: draw 2s forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
```

**3. Animate with GSAP**
```javascript
gsap.from('.draw-path', { drawSVG: 0, duration: 2, ease: 'power2.out', stagger: 0.15 })
```

**4. Animate with anime.js**
```javascript
anime({ targets: '.draw-path', strokeDashoffset: [anime.setDashoffset, 0], easing: 'easeInOutQuad', duration: 2000 })
```

### Variants
- **Staggered multi-path**: Draw multiple paths in sequence
- **Draw on scroll**: Trigger draw at scroll position
- **Reverse draw on hover**: Draw on enter, reverse on leave
- **Colored draw**: Animate stroke color during draw

### When to Use
- Illustrations and line art
- Logo reveals
- Signature animations
- Underline/emphasis effects
- Loading screens

---

## 3. Mask & Clip Reveal

### Theory
Use SVG `<mask>` or CSS `clip-path` to hide/reveal content through a shaped window. Masks use luminance (white = visible, black = hidden). Clip-paths use geometric shapes.

### Step by Step

**1. SVG Mask approach**
```svg
<mask id="circleReveal">
  <circle cx="50%" cy="50%" r="0%" fill="white">
    <animate attributeName="r" values="0%;70%" dur="1.5s" fill="freeze"/>
  </circle>
</mask>
<image href="photo.jpg" mask="url(#circleReveal)"/>
```

**2. CSS Clip-Path approach**
```css
.reveal { clip-path: circle(0%); transition: clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1); }
.reveal.active { clip-path: circle(75%); }
```

**3. GSAP Clip-Path**
```javascript
gsap.from('.reveal', { clipPath: 'circle(0%)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: '.reveal', start: 'top 80%' } })
```

### Variants
- **Circle iris**: Expanding circle reveal
- **Polygon morph**: Multi-point shape reveal
- **Gradient mask**: Soft-edge reveal via gradient mask
- **Text mask**: Reveal image through text
- **Multi-mask**: Sequential reveals in different areas

### When to Use
- Hero image reveals
- Before/after comparisons
- Portfolio thumbnails
- Section entry transitions
- Creative navigation reveals

---

## 4. Generative SVG (Noise + Filters)

### Theory
Use SVG `<feTurbulence>` (Perlin noise) combined with `<feDisplacementMap>` to distort elements organically. By animating the filter parameters (baseFrequency, scale, seed), you create liquid, organic, or glitch effects.

### Step by Step

**1. Basic distortion filter**
```svg
<filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```

**2. Animate filter with GSAP**
```javascript
gsap.to('feTurbulence', { attr: { baseFrequency: '0.05', numOctaves: 5 }, duration: 3, ease: 'power1.inOut' })
gsap.to('feDisplacementMap', { attr: { scale: 60 }, duration: 2, ease: 'power2.inOut', yoyo: true, repeat: -1 })
```

**3. Mouse-driven displacement**
```javascript
document.addEventListener('mousemove', (e) => {
  const scale = (e.clientX / window.innerWidth) * 80
  const freq = 0.01 + (e.clientY / window.innerHeight) * 0.04
  gsap.to('feDisplacementMap', { attr: { scale }, duration: 0.3 })
  gsap.to('feTurbulence', { attr: { baseFrequency: freq }, duration: 0.3 })
})
```

### Variants
- **Liquid text**: Text distorts like liquid on mouse move
- **Organic transitions**: Sections melt into each other
- **Glitch effect**: Rapid filter parameter changes
- **Noise overlay**: Subtle grain texture (see atmosphere catalog)

### When to Use
- Experimental/creative hero sections
- Liquid/organic brand aesthetics
- Sci-fi/glitch themes
- Interactive backgrounds
- Music/entertainment sites

---

## 5. Faux 3D with SVG Transforms

### Theory
Create 3D illusion by nesting `<g>` elements with different transforms and perspective. Combining scale (for Z-depth), rotation, and translation creates a convincing pseudo-3D look without WebGL.

### Step by Step

**1. Isometric transformation**
```javascript
gsap.to('.svg-layer-1', { scale: 0.8, x: 20, y: -10, transformOrigin: '50% 50%' })
gsap.to('.svg-layer-2', { scale: 1, x: 0, y: 0, transformOrigin: '50% 50%' })
gsap.to('.svg-layer-3', { scale: 1.2, x: -20, y: 10, transformOrigin: '50% 50%' })
```

**2. Perspective card flip**
```css
.svg-card { transform: perspective(1000px) rotateY(0deg); transition: transform 0.6s; }
.svg-card:hover { transform: perspective(1000px) rotateY(15deg); }
```

**3. Mouse-driven parallax layers**
```javascript
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30
  const y = (e.clientY / window.innerHeight - 0.5) * 30
  gsap.to('.layer-back', { x: x * 0.5, y: y * 0.5, duration: 0.5 })
  gsap.to('.layer-mid', { x: x * 0.3, y: y * 0.3, duration: 0.4 })
  gsap.to('.layer-front', { x: x * 0.1, y: y * 0.1, duration: 0.3 })
})
```

### When to Use
- Isometric illustrations
- 2.5D data visualizations
- Interactive product showcases
- Card/tile hover effects

---

## 6. SVG Filter Animations

### Theory
Animate SVG filter primitive attributes (stdDeviation, scale, dx, dy, flood-color) to create dynamic visual effects. Filter animations are GPU-accelerated in most browsers.

### Step by Step

**1. Animated drop shadow**
```javascript
gsap.to('feDropShadow', {
  attr: { dx: 5, dy: 10, stdDeviation: 8, floodOpacity: 0.5 },
  duration: 2,
  ease: 'power2.inOut',
  yoyo: true,
  repeat: -1
})
```

**2. Animated blur reveal**
```javascript
gsap.fromTo('feGaussianBlur', { attr: { stdDeviation: 20 } }, { attr: { stdDeviation: 0 }, duration: 1.5, ease: 'power3.out' })
```

**3. Color matrix animation**
```javascript
gsap.to('feColorMatrix', {
  attr: { values: '0.5 0 0 0 0  0 0.8 0 0 0  0 0 0.2 0 0  0 0 0 1 0' },
  duration: 3,
  ease: 'none'
})
```

### Variants
- **Hover glow**: Blur + color shift on hover
- **Focus sharpen**: Blur to sharp on scroll
- **Duotone shift**: Animate color matrix for photo effects

### When to Use
- Hover effects on SVG elements
- Image processing effects
- Atmospheric transitions
- Interactive color grading
