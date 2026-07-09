# Scroll Techniques — Full Tutorial Catalog

---

## 1. Multi-Layer Parallax

### Theory
Parallax creates depth by moving layers at different speeds during scroll. The standard approach uses a 3-layer system: background (slowest), midground (medium), foreground (fastest, sometimes opposite direction).

### Step by Step

**1. CSS native parallax (simple)**
```css
.parallax-container { perspective: 1px; height: 100vh; overflow-x: hidden; overflow-y: auto; }
.parallax-bg { transform: translateZ(-1px) scale(2); } /* Moves slower */
.parallax-fg { transform: translateZ(0); } /* Normal speed */
```

**2. GSAP ScrollTrigger (3 layers)**
```javascript
gsap.to('.layer-back', { y: 200, scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }})
gsap.to('.layer-mid', { y: 50, scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }})
gsap.to('.layer-front', { y: -50, scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }})
```

**3. Rotational parallax**
```javascript
gsap.to('.layer', { rotation: 10, scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }})
```

**4. Opacity parallax (depth fade)**
```javascript
gsap.from('.fade-layer', { opacity: 0, scrollTrigger: { trigger: '.fade-layer', start: 'top bottom', end: 'top 40%', scrub: true }})
```

### Variants
- **Directional parallax**: Layers move in different axis directions
- **Scale parallax**: Layers scale as they approach
- **Color parallax**: Background shifts hue during scroll
- **Multi-container parallax**: Different sections have independent parallax systems

### Performance
- Use `will-change: transform` on layers
- Keep to 3 layers max
- GPU-composited via transform

### When to Use
- Hero sections
- Storytelling narratives
- Long-scroll landing pages
- Brand intro sequences

---

## 2. Pin & Reveal

### Theory
Pin holds an element in place while the rest of the page scrolls. Content behind/inside the pinned element reveals progressively. This is the core of many award-winning scroll narratives.

### Step by Step

**1. GSAP Pin**
```javascript
ScrollTrigger.create({
  trigger: '.pin-section',
  pin: true,
  start: 'top top',
  end: 'bottom top',
  markers: false
})
```

**2. Pin with reveal timeline**
```javascript
let tl = gsap.timeline({
  scrollTrigger: { trigger: '.pin-section', pin: true, start: 'top top', end: '+=200%', scrub: 1 }
})
tl.from('.reveal-step-1', { opacity: 0, y: 50 })
  .from('.reveal-step-2', { opacity: 0, y: 50 }, '+=0.3')
  .from('.reveal-step-3', { opacity: 0, scale: 0.8 }, '+=0.3')
```

**3. Split-screen pin (two elements pinned)**
```javascript
// Left panel pins, right panel scrolls content
ScrollTrigger.create({ trigger: '.left-panel', pin: true, start: 'top top', end: '+=300%' })
// Right content scrolls through steps
gsap.from('.step', { opacity: 0, y: 40, stagger: 0.5, scrollTrigger: { trigger: '.right-content', start: 'top top', end: 'bottom bottom', scrub: 1 }})
```

### Variants
- **Flip-book pin**: Multiple text/image combinations cycle during pin
- **Video pin**: Video plays during pinned scroll
- **Canvas pin**: Canvas animation renders during pin
- **Map pin**: A maps/visuals remain fixed while details scroll

### When to Use
- Product feature showcases
- Step-by-step explanations
- Before/after comparisons
- Storytelling with visual anchors

---

## 3. Horizontal Scroll

### Theory
Pin a container and translate its contents horizontally, creating a horizontal scroll effect within a vertical page. Snap behavior makes it feel like slide navigation.

### Step by Step

**1. Basic horizontal scroll**
```javascript
let panels = gsap.utils.toArray('.panel')
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: { trigger: '.container', pin: true, scrub: 1, end: () => '+=' + (panels.length - 1) * 100 + '%' }
})
```

**2. With snap**
```javascript
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: { trigger: '.container', pin: true, scrub: 1, snap: 1 / (panels.length - 1), end: () => '+=' + (panels.length - 1) * 100 + '%' }
})
```

**3. Hybrid (horizontal + vertical content inside)**
```javascript
// Each panel has its own vertical scroll content
gsap.to(panels, { xPercent: -100 * (panels.length - 1), ease: 'none', scrollTrigger: { trigger: '.container', pin: true, scrub: 1, end: () => '+=' + (panels.length - 1) * 100 + '%' }})
// Inner vertical reveals within each panel
panels.forEach(panel => {
  gsap.from(panel.querySelectorAll('.content'), { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: panel, start: 'left 75%', toggleActions: 'play none none reverse' }})
})
```

### Variants
- **Free scroll**: Continuous horizontal scroll without snap
- **Staggered**: Panels reveal with stagger effect
- **3D horizontal**: Rotate panels in 3D during horizontal scroll
- **Lottie horizontal**: Lottie animation drives the horizontal movement

### When to Use
- Portfolio/project showcases
- Timeline/history narratives
- Feature comparison sliders
- Product catalogs

---

## 4. Flip / Card Scroll

### Theory
Cards within a stack flip or transform their content as scroll progresses, creating a deck-of-cards browsing experience.

### Step by Step

**1. GSAP Flip plugin (state recording)**
```javascript
// Record state
const state = Flip.getState('.cards')
// Rearrange DOM
cardsContainer.prepend(lastCard)
// Animate
Flip.from(state, { duration: 0.8, ease: 'power2.inOut', absolute: true })
```

**2. Manual card stack with scroll**
```javascript
const cards = gsap.utils.toArray('.card')
cards.forEach((card, i) => {
  gsap.to(card, {
    scale: 0.9 - i * 0.02,
    y: i * 20,
    opacity: 1 - i * 0.15,
    scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 20%', scrub: true }
  })
})
```

**3. 3D card flip on scroll**
```javascript
gsap.to('.card', { rotationY: 180, scrollTrigger: { trigger: '.card', start: 'top 80%', end: 'top 30%', scrub: true }})
```

### When to Use
- Testimonial stacks
- Pricing cards
- Team member profiles
- FAQ accordion alternatives

---

## 5. Scroll-Driven Lottie

### Theory
Play a Lottie animation in sync with scroll progress by mapping scroll position to frame number.

### Step by Step

**1. Load Lottie with frame control**
```javascript
const animation = lottie.loadAnimation({ container: document.getElementById('animation'), path: 'data.json', renderer: 'svg', loop: false, autoplay: false })
```

**2. Map scroll to frame**
```javascript
ScrollTrigger.create({
  trigger: '.animation-section',
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    const frame = Math.round(self.progress * (animation.totalFrames - 1))
    animation.goToFrame(frame)
  }
})
```

**3. With timeline sync**
```javascript
animation.addEventListener('DOMLoaded', () => {
  gsap.to(animation, {
    currentFrame: animation.totalFrames - 1,
    scrollTrigger: { trigger: '.animation-section', start: 'top bottom', end: 'bottom top', scrub: 2 }
  })
})
```

### When to Use
- Complex vector animations synced to scroll
- Character animation during scroll
- Illustrated explainers
- Brand storytelling with scroll progress

---

## 6. CSS Native Scroll-Linked

### Theory
Modern CSS (2024+) supports scroll-linked animations using `scroll-timeline` and `animation-timeline: scroll()`. No JS required.

### Step by Step

**1. Scroll-driven animation (Chrome 115+)**
```css
@keyframes grow-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.progress-bar { animation: grow-progress linear forwards; animation-timeline: scroll(); transform-origin: left; }
```

**2. Scroll-driven reveal**
```css
.reveal { animation: reveal linear forwards; animation-timeline: view(); }
@keyframes reveal { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
```

**3. Range-based (Chrome only)**
```css
.reveal { animation: reveal linear forwards; animation-timeline: view(); animation-range: entry 0% entry 100%; }
```

### Limitations
- Chrome 115+, Firefox not yet, Safari partial
- Limited easing control
- Can't compose multiple independent scroll animations per element
- Use as enhancement, not primary implementation

### When to Use
- Progressive enhancement scroll reveals
- Reading progress indicators
- Simple parallax without JS
- Performance-critical environments

---

## 7. Section Progress Indicator

### Theory
A UI element (bar, text, icon) that shows how far the user has scrolled through a section or the entire page.

### Step by Step

**1. Full page progress**
```javascript
gsap.to('.progress-bar', { scaleX: 1, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }, transformOrigin: 'left' })
```

**2. Per-section progress**
```javascript
gsap.to('.section-bar', { scaleX: 1, scrollTrigger: { trigger: '.section', start: 'top top', end: 'bottom bottom', scrub: true }, transformOrigin: 'left' })
```

**3. Text progress counter**
```javascript
ScrollTrigger.create({
  trigger: '.section', start: 'top top', end: 'bottom bottom', scrub: true,
  onUpdate: (self) => document.querySelector('.counter').textContent = Math.round(self.progress * 100) + '%'
})
```

### When to Use
- Long-form articles
- Storytelling narratives
- Reading apps
- Portfolio sections

---

## 8. Reveal on Exit

### Theory
Elements animate when they leave the viewport (not just enter). Creates a trail of content that persists behind the user's scroll position.

### Step by Step

**1. GSAP onLeave**
```javascript
ScrollTrigger.create({
  trigger: '.element',
  start: 'top 80%',
  end: 'top 20%',
  onEnter: () => gsap.to('.element', { opacity: 1, y: 0 }),
  onLeave: () => gsap.to('.element', { opacity: 0.5, scale: 0.95 }),
  onEnterBack: () => gsap.to('.element', { opacity: 1, y: 0 }),
  onLeaveBack: () => gsap.to('.element', { opacity: 0, y: 20 })
})
```

**2. Exit with different animation**
```javascript
// Entry: fade up
gsap.from('.item', { opacity: 0, y: 30, scrollTrigger: { trigger: '.item', start: 'top 85%', toggleActions: 'play none none reverse' }})
// Exit: fade out with blur (via separate ScrollTrigger)
ScrollTrigger.create({
  trigger: '.item', start: 'top 10%', onEnter: () => gsap.to('.item', { filter: 'blur(4px)', opacity: 0.3 })
})
```

### When to Use
- Reading trails (content fades behind user)
- Sequential storytelling
- Gallery/preview grids
- Archive/infinite scroll contexts
