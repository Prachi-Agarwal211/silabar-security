# Section Transitions — Full Tutorial Catalog

---

## 1. Curtain Reveal

### Theory
A curtain (solid or gradient) wipes across the screen from one edge, revealing the next section beneath. Creates theatrical, cinematic section transitions.

### Step by Step

**1. CSS Clip-Path Curtain (left to right)**
```css
.curtain { position: fixed; inset: 0; background: #000; clip-path: inset(0 100% 0 0); transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.18, 1); z-index: 100; }
.curtain.open { clip-path: inset(0 0 0 0); }
.curtain.closed { clip-path: inset(0 0 0 100%); }
```

**2. GSAP curtain with scroll trigger**
```javascript
// Create a curtain element
gsap.to('.curtain', {
  clipPath: 'inset(0 0% 0 0)',
  duration: 1.5,
  ease: 'power3.inOut',
  scrollTrigger: { trigger: '.next-section', start: 'top bottom', end: 'top 50%', scrub: 1, toggleActions: 'play none none reverse' }
})
```

**3. Multi-layer curtain (two curtains from edges)**
```javascript
gsap.to('.curtain-left', { scaleX: 1, transformOrigin: 'right', duration: 0.8 })
gsap.to('.curtain-right', { scaleX: 1, transformOrigin: 'left', duration: 0.8 }, '-=0.6')
```

**4. Gradient curtain (soft edge)**
```javascript
gsap.to('.gradient-curtain', {
  clipPath: 'inset(0 0% 0 0)',
  duration: 1.2,
  ease: 'power2.inOut'
})
```
```css
.gradient-curtain { background: linear-gradient(90deg, transparent 0%, #000 50%, transparent 100%); }
```

### Variants
- **Diagonal curtain**: clip-path with polygon for angle
- **Multi-section curtain**: Sequential curtains across multiple sections
- **Content curtain**: The content itself acts as the curtain (large text/image slides across)

### When to Use
- Project/portfolio section transitions
- Website intro sequences
- Brand reveal moments
- Chapter breaks in storytelling

---

## 2. Iris / Circle Reveal

### Theory
Content reveals through an expanding circle. Like a camera aperture opening. Dramatic and focused — draws the eye to the center of the reveal.

### Step by Step

**1. CSS clip-path circle**
```css
.iris-reveal { clip-path: circle(0% at 50% 50%); transition: clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1); }
.iris-reveal.active { clip-path: circle(75%); }
```

**2. GSAP circle reveal with origin control**
```javascript
gsap.from('.iris', {
  clipPath: 'circle(0% at 50% 50%)',
  duration: 1.5,
  ease: 'power3.inOut',
  scrollTrigger: { trigger: '.iris', start: 'top 80%' }
})
```

**3. Origin offset (reveal from corner)**
```javascript
gsap.from('.iris', { clipPath: 'circle(0% at 0% 0%)', duration: 1.5, ease: 'power3.inOut' })
// Reveals from top-left corner
```

**4. SVG mask iris**
```svg
<mask id="irisMask">
  <circle cx="50%" cy="50%" r="0%" fill="white">
    <animate attributeName="r" values="0%;75%" dur="1.5s" fill="freeze"/>
  </circle>
</mask>
```

### Variants
- **Iris out**: Contracting circle (exit)
- **Click-triggered iris**: Click expands circle from click point
- **Multi-iris**: Sequential circle reveals across a grid
- **Elliptical iris**: Oval reveal for widescreen content

### When to Use
- Portfolio items entering
- Modal/dialog presentations
- Hero transition to content
- Gallery image reveals

---

## 3. Wipe / Slide Transition

### Theory
One section slides out as the next slides in, creating a continuous horizontal/vertical motion. Like camera panning between scenes.

### Step by Step

**1. Full-page wipe**
```javascript
// Section A slides left, Section B slides in from right
gsap.to('.section-a', { x: '-100%', duration: 0.8, ease: 'power3.inOut' })
gsap.from('.section-b', { x: '100%', duration: 0.8, ease: 'power3.inOut' }, '-=0.8')
```

**2. Overlapping wipe (B starts before A finishes)**
```javascript
gsap.to('.section-a', { x: '-100%', duration: 0.7, ease: 'power2.inOut' })
gsap.from('.section-b', { x: '80%', duration: 0.7, ease: 'power2.out' }, '-=0.4')
```

**3. Vertical wipe (like blinds)**
```javascript
gsap.to('.section-a', { y: '-100%', duration: 0.8, ease: 'power3.inOut' })
gsap.from('.section-b', { y: '100%', duration: 0.8, ease: 'power3.inOut' }, '-=0.8')
```

**4. Barba.js page transition with wipe**
```javascript
barba.init({
  transitions: [{
    leave(data) { return gsap.to(data.current.container, { x: '-100%', duration: 0.5 }) },
    enter(data) { return gsap.from(data.next.container, { x: '100%', duration: 0.5 }) }
  }]
})
```

### Variants
- **Directional wipe**: Direction changes based on scroll direction
- **Diagonal wipe**: Content slides at an angle
- **Split wipe**: Content splits in two directions

### When to Use
- Page navigation transitions
- Carousel/slide sections
- Step-by-step wizards
- Image galleries

---

## 4. Clip-Path Morph Transition

### Theory
Morph between different clip-path polygon shapes for organic, artistic section transitions. Unlike the curtain (which is geometric), morph transitions can be irregular and fluid.

### Step by Step

**1. Basic polygon morph**
```javascript
gsap.to('.morph-section', {
  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  duration: 1.5,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.morph-section', start: 'top center' }
})
```

**2. Star/triangle reveal**
```javascript
// Start as star shape, end as full rect
gsap.from('.star-reveal', {
  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  duration: 1.5,
  ease: 'power3.out'
})
```

**3. Multi-point morph sequence**
```javascript
gsap.to('.morph', {
  keyframes: [
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
  ],
  duration: 3,
  easeEach: 'power2.inOut'
})
```

### Variants
- **Organic blob morph**: Irregular, fluid shapes
- **Diagonal split**: Section splits along a diagonal
- **Window morph**: Small window grows into full section

### Key Insight
More polygon points = more complex morphing. Start with 4 points (rectangle) and add points for complexity. All states must have the same number of points.

### When to Use
- Artistic/creative portfolios
- Brand reveal sequences
- Experimental section breaks
- Gallery transitions

---

## 5. Perspective Flip

### Theory
A 3D flip transition revealing new content on the reverse side. Creates a tangible, card-like interaction.

### Step by Step

**1. CSS 3D flip**
```css
.flip-container { perspective: 1000px; }
.flip-card { transform-style: preserve-3d; transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
.flip-card.flipped { transform: rotateY(180deg); }
.flip-front, .flip-back { backface-visibility: hidden; position: absolute; inset: 0; }
.flip-back { transform: rotateY(180deg); }
```

**2. GSAP 3D flip on scroll**
```javascript
gsap.to('.flip-card', {
  rotationY: 180,
  duration: 1.2,
  ease: 'power3.inOut',
  scrollTrigger: { trigger: '.flip-section', start: 'top 70%' }
})
```

**3. Multi-card sequential flip**
```javascript
gsap.to('.card', {
  rotationY: 180,
  stagger: 0.2,
  duration: 0.8,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.cards-section', start: 'top 70%' }
})
```

### When to Use
- Photo albums/galleries
- Before/after comparisons
- Team member profiles (front: photo, back: bio)
- Pricing cards (front: summary, back: details)

---

## 6. Scale Transition

### Theory
Content scales up from small (or down from large) as the section enters. Simple but effective when combined with other effects.

### Step by Step

**1. Scale up on scroll**
```javascript
gsap.from('.scale-section', { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.scale-section', start: 'top 85%' }})
```

**2. Scale down exit (section zooms out as next enters)**
```javascript
ScrollTrigger.create({
  trigger: '.section', start: 'top top', end: 'bottom top', scrub: true,
  onUpdate: (self) => { gsap.to('.section', { scale: 1 - self.progress * 0.2, opacity: 1 - self.progress }) }
})
```

**3. Scale + blur combination**
```javascript
gsap.from('.section', { scale: 0.9, filter: 'blur(10px)', opacity: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: '.section', start: 'top 85%' }})
```

### When to Use
- Section entry animations
- Modal/gallery opens
- Portfolio item selection
- Focus transitions (zoom into detail)

---

## 7. Fragment / Grid Reveal

### Theory
Content splits into a grid of fragments that animate individually. Each fragment reveals part of the next section.

### Step by Step

**1. CSS grid fragment reveal**
```javascript
// Create grid fragments
const container = document.querySelector('.grid-reveal')
const fragments = []
for (let i = 0; i < 16; i++) {
  const div = document.createElement('div')
  div.className = 'fragment'
  div.style.backgroundImage = `url(image.jpg)`
  div.style.backgroundPosition = `-${(i % 4) * 25}% -${Math.floor(i / 4) * 25}%`
  container.appendChild(div)
  fragments.push(div)
}
// Animate fragments
gsap.from(fragments, { scale: 0, opacity: 0, rotation: 45, stagger: { each: 0.03, grid: [4, 4], from: 'center' }, duration: 0.6, ease: 'back.out(1.7)' })
```

**2. Simple grid stagger (without background splitting)**
```javascript
gsap.from('.grid-item', { scale: 0.8, opacity: 0, stagger: { each: 0.05, grid: [3, 3], from: 'random' }, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: '.grid', start: 'top 80%' }})
```

### Variants
- **Random order**: from: 'random' adds organic feel
- **Edge to center**: from: 'edges' reveals from edges in
- **With rotation**: Add rotateX/Y for 3D grid

### When to Use
- Portfolio grid entries
- Team member grids
- Product catalog reveals
- Gallery section transitions
