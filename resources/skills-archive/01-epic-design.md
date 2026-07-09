# Epic Design — Skill Archive

**Source:** https://github.com/alirezarezvani/epic-design
**Author:** alirezarezvani
**License:** MIT
**Extracted:** July 2026

This is a full adaptation of the epic-design repository, which catalogs 45+ web animation techniques organized by depth and application. All credit to the original author.

---

## Overview

A categorized collection of 45+ techniques for building visually epic web experiences. Techniques are organized into 5 depth levels and 6 categories. Each technique includes implementation approach, code patterns, and when to use it.

## Depth System

**Level 1 (CSS-only):** Single property transitions, keyframes. 0 JS overhead.
**Level 2 (CSS + JS trigger):** Intersection Observer, scroll-driven CSS. Medium complexity.
**Level 3 (GSAP/JS library):** Timeline, scrollTrigger, morphSVG. Full control.
**Level 4 (Canvas/GL):** Three.js, PixiJS, paper.js. GPU-accelerated.
**Level 5 (WebGPU/TSL):** Custom shader, compute pipeline. Bleeding edge.

## Category 1: SVG Animations

### 1.1 Path Morphing
**Depth:** 2–4
**What:** Smoothly morph one SVG path into another
**How:**
- GSAP MorphSVGPlugin: `gsap.to('#path', { morphSVG: '#target' })`
- anime.js: `anime({ targets: '#path', d: [{ value: pathAData }] })`
- CSS: Not supported for paths, only for basic shapes via `clip-path`
**Code (GSAP):**
```javascript
gsap.to('.morph-path', {
  morphSVG: '.target-path',
  duration: 2,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.section', start: 'top center' }
})
```
**When:** Logo reveals, shape transitions, state changes
**Variants:** Morph on scroll, morph on hover, sequential morph chain

### 1.2 Draw/Reveal
**Depth:** 1–3
**What:** Animate SVG stroke-dasharray/dashoffset to "draw" a path
**How:**
- CSS: `stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 2s forwards`
- JS: Measure path with `getTotalLength()`, animate dashoffset to 0
**Code (CSS):**
```css
.path { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 2s forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
```
**When:** Illustrations, signatures, loading screens, hero headers
**Variants:** Multi-path staggered draw, draw-on-scroll, reverse draw on exit

### 1.3 Mask & Clip Reveal
**Depth:** 2–4
**What:** Reveal content behind an animated mask or clip-path
**How:**
- CSS: `clip-path: circle(0%); transition: clip-path 1s`
- JS: Clip paths on SVG `<mask>` elements, animate mask size
**Code:**
```css
.reveal { clip-path: circle(0%); transition: clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1); }
.reveal.active { clip-path: circle(75%); }
```
**When:** Image reveals, section entries, before/after comparisons
**Variants:** Circle iris, polygon reveal, gradient mask fade

### 1.4 Generative SVG (Noise + Filters)
**Depth:** 3–5
**What:** Generate SVG content procedurally using feTurbulence, feDisplacementMap
**How:**
- SVG filters: `<feTurbulence>` + `<feDisplacementMap>` overlaid on shapes
- JS: Update filter baseFrequency on scroll or mouse
**Code:**
```svg
<filter id="noise">
  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```
**When:** Liquid effects, organic transitions, glitch aesthetics
**Variants:** Mouse-driven displacement, scroll-driven noise, text distortion

### 1.5 Faux 3D with SVG Transforms
**Depth:** 2–3
**What:** Simulate 3D using SVG transforms and perspective
**How:**
- GSAP: `transformOrigin: "50% 50%", scaleX: perspective scale`
- SVG: Nested `<g>` elements with matrix transforms
**When:** Isometric elements, 2.5D illustrations, card flips

### 1.6 SVG Filter Animations
**Depth:** 3–4
**What:** Animate SVG filter parameters for visual effects
**Code:**
```javascript
gsap.to('feDropShadow', { attr: { dx: 10, dy: 10 }, duration: 1 })
gsap.to('feGaussianBlur', { attr: { stdDeviation: 5 }, duration: 2 })
```
**When:** Hover glows, blur reveals, shadow dynamics

## Category 2: Scroll Animations

### 2.1 Parallax (Multi-Layer)
**Depth:** 1–3
**What:** Layers move at different speeds during scroll
**How:**
- CSS: `transform: translateZ(-1px) scale(2)` on background (pure CSS parallax)
- GSAP: Two or more ScrollTriggers with different start/end offsets
- Three.js: Z-position layers with perspective camera
**Code (GSAP):**
```javascript
gsap.to('.bg-layer', { y: 200, scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }})
gsap.to('.fg-layer', { y: -50, scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }})
```
**When:** Hero sections, storytelling, long-scroll narratives
**Variants:** Depth parallax (3+ layers), rotational parallax, directional parallax

### 2.2 Pin & Reveal
**Depth:** 3
**What:** Pin an element while content scrolls behind/through it
**How:**
- GSAP ScrollTrigger: `pin: true`, scrub timeline
- CSS `position: sticky` for simpler use cases
**Code:**
```javascript
let tl = gsap.timeline({ scrollTrigger: { trigger: '.pin-section', pin: true, start: 'top top', end: '+=200%', scrub: 1 }})
tl.to('.reveal-content', { opacity: 1, y: 0 })
  .to('.next-content', { opacity: 1, scale: 1 })
```
**When:** Step-by-step reveals, before/after, product showcases
**Variants:** Horizontal pin, split-pin (two elements pinned together), progressive reveal pin

### 2.3 Horizontal Scroll
**Depth:** 3
**What:** Scroll horizontally through a panel sequence
**How:**
- GSAP: Pin a container, animate `x` to scroll horizontally
- CSS: `overflow-x: auto; scroll-snap-type: x mandatory`
**Code (GSAP):**
```javascript
let panels = gsap.utils.toArray('.panel')
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: { trigger: '.container', pin: true, scrub: 1, snap: 1 / (panels.length - 1), end: () => '+=' + (panels.length - 1) * 100 + '%' }
})
```
**When:** Portfolios, timelines, feature lists
**Variants:** Snap to panel, free scroll, hybrid (horizontal + vertical)

### 2.4 Flip / Card Scroll
**Depth:** 3
**What:** Cards flip or transform as user scrolls through a stack
**How:**
- GSAP Flip plugin: Capture state, animate between states
- Manual: RotateX/Y based on scroll progress
**When:** Team members, pricing cards, FAQ accordions

### 2.5 Scroll-Driven Lottie
**Depth:** 2–3
**What:** Play a Lottie animation in sync with scroll
**How:**
- Lottie `goToFrame()` mapped to scroll progress
**When:** Complex vector animations synced to scroll position

### 2.6 Camera Path (Three.js)
**Depth:** 4–5
**What:** Move a 3D camera along a predefined path as user scrolls
**How:**
- Three.js + GSAP: Animate camera.position.x/y/z and camera.lookAt on scroll
- ScrollTrigger scrub timeline
**Code:**
```javascript
let cameraPath = { pos: new THREE.Vector3(0, 0, 10), target: new THREE.Vector3(0, 0, 0) }
gsap.to(cameraPath.pos, {
  x: 10, y: 5, z: 20,
  scrollTrigger: { trigger: '.scene', start: 'top top', end: 'bottom top', scrub: 2 },
  onUpdate: () => { camera.position.copy(cameraPath.pos); camera.lookAt(cameraPath.target) }
})
```
**When:** Immersive 3D narratives, architectural walkthroughs
**Variants:** Catmull-Rom curve path, path with rotation, multi-segment path

### 2.7 Section Progress Indicator
**Depth:** 2
**What:** Show reading progress through a section or page
**How:**
- ScrollTrigger's `progress` value mapped to a progress bar width
**When:** Long-form content, storytelling, articles

### 2.8 Reveal on Exit
**Depth:** 2–3
**What:** Animate elements as they leave the viewport (not just enter)
**How:**
- ScrollTrigger: `onLeave`, `onLeaveBack` callbacks
- Intersection Observer: `isIntersecting` false branches
**When:** Exit animations, sequential reading paths

### 2.9 Infinite Scroll (with animation reset)
**Depth:** 3
**What:** Loop content infinitely with animation reset on re-entry
**How:**
- GSAP: `repeat: -1` for marquees, ScrollTrigger refresh on new content
**When:** Carousels, news tickers, testimonials

## Category 3: Section Transitions

### 3.1 Curtain Reveal
**Depth:** 3
**What:** Content is revealed by a curtain wiping from one side
**How:**
- CSS `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`
- GSAP: Animate clip-path rectangle
**Code:**
```javascript
gsap.from('.section-content', {
  clipPath: 'inset(0 100% 0 0)',
  duration: 1.5,
  ease: 'power3.inOut',
  scrollTrigger: { trigger: '.section', start: 'top 80%' }
})
```
**When:** Hero intros, section breaks, image reveals
**Variants:** Left-to-right, right-to-left, center-out, diagonal

### 3.2 Iris / Circle Reveal
**Depth:** 3
**What:** Content is revealed through an expanding circle
**How:**
- CSS `clip-path: circle(0%)` → `circle(100%)`
**Code:**
```css
.iris-reveal { clip-path: circle(0%); transition: clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1); }
.iris-reveal.active { clip-path: circle(75%); }
```
**When:** Portfolio items, modal entries, hero transitions

### 3.3 Wipe / Slide Transition
**Depth:** 2–3
**What:** One section slides out as the next slides in
**How:**
- CSS transforms: `translateX(100%)` to `translateX(0)` for incoming, inverse for outgoing
- Barba.js + GSAP: Page transition with slide
**When:** Page transitions, carousel sections, step flows

### 3.4 Clip-Path Morph
**Depth:** 3–4
**What:** Morph clip-path between polygon shapes for organic transitions
**How:**
- GSAP: ScrollTrigger + clipPath animation between polygon arrays
- CSS: `clip-path: polygon(...)` transition on intersection
**Code:**
```javascript
gsap.to('.morph-section', {
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  duration: 1.5,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.morph-section', start: 'top center' }
})
```
**When:** Organic reveals, artistic transitions, portfolio entries
**Variants:** Triangle reveal, diamond morph, multi-point morph

### 3.5 Perspective Flip
**Depth:** 3–4
**What:** A 3D flip transition revealing new content on the reverse
**How:**
- CSS 3D transforms: `rotateY(0)` → `rotateY(-180deg)` with backface-visibility
- GSAP: 3D rotation with perspective
**When:** Photo galleries, cards, before/after comparisons

### 3.6 Scale Transition
**Depth:** 1–2
**What:** Content scales up or down during section transition
**Code:**
```css
.scale-enter { transform: scale(0.8); opacity: 0; transition: transform 0.8s, opacity 0.8s; }
.scale-enter.active { transform: scale(1); opacity: 1; }
```
**When:** Modal entries, gallery items, list reveals

### 3.7 Fragment / Grid Reveal
**Depth:** 3–4
**What:** Content breaks into fragments that animate individually
**How:**
- Split content into CSS grid cells, stagger their reveal
- GSAP: staggerFrom with grid cells
**When:** Team grids, portfolios, product catalogs

## Category 4: Text Animations

### 4.1 Split & Stagger
**Depth:** 2–3
**What:** Split text into characters/words/lines and animate each
**How:**
- GSAP SplitText or manual string splitting
- CSS: Wrap each character in `<span>`, stagger `transform` and `opacity`
**Code (GSAP SplitText):**
```javascript
let split = new SplitText('.headline', { type: 'chars,words,lines' })
gsap.from(split.chars, {
  opacity: 0, y: 50, rotateX: -90, stagger: 0.02,
  scrollTrigger: { trigger: '.headline', start: 'top 80%' }
})
```
**When:** Headlines, hero titles, section headers
**Variants:** Character stagger, word stagger, line stagger, mixed

### 4.2 Scramble / Reveal Text
**Depth:** 3
**What:** Text appears to scramble before resolving into the final word
**How:**
- GSAP TextPlugin: cycle through random characters
- Custom: Interval that swaps characters until correct
**Code:**
```javascript
gsap.to('.scramble-text', {
  text: { value: 'Final Text', speed: 0.5, delimiter: '' },
  duration: 2,
  ease: 'none'
})
```
**When:** Loading screens, announcement reveals, interactive hover
**Variants:** Scramble on hover, scramble on scroll, typewriter style

### 4.3 Word by Word Lighting
**Depth:** 3
**What:** Light up each word sequentially, like being spoken
**How:**
- SplitText by words, animate color/gradient on each word
- CSS: background-clip text with gradient sweep
**Code:**
```javascript
let words = new SplitText('.highlight-text', { type: 'words' })
gsap.from(words.words, {
  color: '#666', stagger: 0.08,
  scrollTrigger: { trigger: '.highlight-text', start: 'top 75%' }
})
```
**When:** Testimonials, key messaging, poetry, manifestos

### 4.4 Variable Font Interpolation
**Depth:** 2–3
**What:** Animate variable font axes (weight, width, slant) over scroll or time
**How:**
- CSS: `@property` for font-variation-settings animation
- JS: Set `fontVariationSettings` property directly
**Code:**
```javascript
gsap.to('.variable-text', {
  fontVariationSettings: '"wght" 900, "wdth" 150',
  scrollTrigger: { trigger: '.variable-text', start: 'top 80%', end: 'top 20%', scrub: 1 }
})
```
**When:** Dynamic headers, brand text, interactive typography
**Variants:** Weight on scroll, width on hover, slant on mouse move

### 4.5 Wave / Ripple Text
**Depth:** 2–3
**What:** Text characters animate in a wave pattern
**How:**
- SplitText by chars, stagger with sine-based delay offsets
**Code:**
```javascript
let chars = new SplitText('.wave-text', { type: 'chars' })
gsap.from(chars.chars, {
  y: 30, opacity: 0,
  stagger: { each: 0.03, from: 'center' },
  ease: 'power2.out'
})
```
**When:** Hero headers, brand slogans, entertainment

### 4.6 Typewriter
**Depth:** 1–2
**What:** Characters appear one at a time like typing
**How:**
- CSS: `@keyframes typing` with `steps()` and `overflow: hidden` + `border-right` caret
- JS: Interval add char, or GSAP TextPlugin
**Code (CSS):**
```css
.typewriter { overflow: hidden; white-space: nowrap; border-right: 2px solid; animation: typing 3s steps(30), blink 0.5s step-end infinite; width: 0; }
@keyframes typing { to { width: 100%; } }
@keyframes blink { 50% { border-color: transparent; } }
```
**When:** Hero subtitles, terminal aesthetics, loading text

### 4.7 Text Mask Reveal
**Depth:** 2–3
**What:** Text is revealed through a moving mask/gradient
**How:**
- CSS: `background-clip: text; -webkit-text-fill-color: transparent` with animated gradient
- SVG: `<mask>` with text as mask shape
**Code:**
```css
.mask-text { background: linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%); background-size: 200% 100%; background-clip: text; -webkit-text-fill-color: transparent; animation: sweep 3s infinite; }
@keyframes sweep { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
```
**When:** Hero titles, feature callouts, loading states

### 4.8 Shimmer / Glitter Text
**Depth:** 1–2
**What:** A moving highlight sweeps across text
**How:**
- CSS gradient animation on background-clip text
**When:** Premium branding, sale announcements, special offers

## Category 5: Micro-Interactions

### 5.1 Magnetic Button
**Depth:** 2–3
**What:** Button follows cursor within a radius, then snaps back
**How:**
- GSAP: Map cursor proximity to button position with `clamp`
- CSS: `transform: translate()` on mousemove with spring ease
**Code:**
```javascript
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })
})
btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' }))
```
**When:** CTAs, nav items, interactive elements
**Variants:** Magnetic container, magnetic icon, pull-toward-cursor

### 5.2 Particle System (Cursor Trail)
**Depth:** 3–4
**What:** Particles follow or emanate from cursor
**How:**
- Canvas 2D: Spawn particles at cursor, apply velocity + decay
- Three.js: BufferGeometry particle system, update on mousemove
**When:** Hero sections, creative portfolios, entertainment

### 5.3 Hover 3D Tilt
**Depth:** 2–3
**What:** Element tilts based on mouse position within it
**How:**
- CSS: `transform: perspective(1000px) rotateX(θ) rotateY(φ)`
- JS: Map cursor offset to rotation angles
**Code:**
```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(card, { rotateX: -y * 15, rotateY: x * 15, duration: 0.3, ease: 'power2.out' })
})
card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }))
```
**When:** Cards, product showcases, profile photos
**Variants:** Tilt with glare, tilt with depth shadow, tilt + parallax inner

### 5.4 Glass / Blur Reveal on Hover
**Depth:** 2–3
**What:** Background sharpens or blurs on hover
**How:**
- CSS: `backdrop-filter: blur()` transitioned on hover
**When:** Cards, modals, navigation overlays

### 5.5 Button Ripple
**Depth:** 1–2
**What:** Click produces a ripple expanding from the click point
**How:**
- CSS: Pseudo-element positioned at click point, animate scale + opacity
- JS: Spawn `<span>` at click offset, animate with GSAP
**Code:**
```css
.btn { position: relative; overflow: hidden; }
.btn::after { content: ''; position: absolute; border-radius: 50%; background: rgba(255,255,255,0.4); width: 100%; padding-top: 100%; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0); opacity: 1; }
.btn:active::after { animation: ripple 0.6s ease-out; }
@keyframes ripple { to { transform: translate(-50%,-50%) scale(4); opacity: 0; } }
```
**When:** All buttons, touch feedback

### 5.6 Cursor Follower
**Depth:** 2–3
**What:** Custom cursor element that follows with delay/smoothing
**How:**
- GSAP `gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2 })` for smooth following
- Secondary cursor with more delay for trail effect
**When:** Creative portfolios, premium brand sites
**Variants:** Cursor with ring, cursor with magnetic attract, cursor with trail particles

### 5.7 Scroll-triggered Number Counter
**Depth:** 2
**What:** Numbers count up/down when scrolled into view
**How:**
- GSAP: animate object property, use `onUpdate` to display formatted value
**When:** Stats sections, metrics, achievements

### 5.8 Reveal on Hover (Neighbors)
**Depth:** 2–3
**What:** In a grid, hovering one item fades/blurs others
**How:**
- CSS: parent hover → sibling selectors
- JS: mouseenter/mouseleave with gsap
**Code:**
```css
.grid-item { transition: opacity 0.3s, filter 0.3s; }
.grid:hover .grid-item { opacity: 0.4; filter: blur(2px); }
.grid-item:hover { opacity: 1; filter: blur(0); }
```
**When:** Team grids, portfolios, product listings

### 5.9 Squish / Spring Animation
**Depth:** 2–3
**What:** Element squishes on press, springs back on release
**How:**
- GSAP: `scaleX: 0.9, scaleY: 0.9` on mousedown, `scale: 1` on mouseup with elastic ease
**When:** Buttons, cards, draggable elements

## Category 6: Atmosphere & Backgrounds

### 6.1 Mesh Gradient
**Depth:** 1–3
**What:** Multi-color blurred gradient that moves gently
**How:**
- CSS: Multiple radial gradients + blur, animate positions
- Three.js: Plane geometry with vertex colors, gentle animation
**Code (CSS):**
```css
.mesh { background: radial-gradient(ellipse at 20% 50%, #ff6b6b 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #4ecdc4 0%, transparent 50%); filter: blur(40px); animation: meshMove 10s ease-in-out infinite alternate; }
@keyframes meshMove { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
```
**When:** Hero backgrounds, section dividers, mood setters
**Variants:** 3-color mesh, animated position, scroll-reactive

### 6.2 Noise Texture Overlay
**Depth:** 1–2
**What:** Subtle grain/noise over everything for tactile feel
**How:**
- CSS: SVG filter overlay via pseudo-element
- JS: Canvas noise generator
**Code:**
```css
.noise::before { content: ''; position: fixed; inset: 0; opacity: 0.03; pointer-events: none; background: url("data:image/svg+xml,...<feTurbulence...>"); }
```
**When:** Ambient texture, vintage feel, screen-like aesthetics
**Variants:** Animated noise, colored noise, directional noise

### 6.3 Glassmorphism
**Depth:** 1–2
**What:** Frosted glass effect with backdrop-filter
**How:**
- CSS: `background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2)`
**When:** Cards, navbars, modals, overlays

### 6.4 Gradient Border Animation
**Depth:** 1–2
**What:** Animated gradient border using conic-gradient
**Code:**
```css
.gradient-border { --angle: 0deg; border-image: conic-gradient(from var(--angle), red, blue, red) 1; animation: rotate 3s linear infinite; }
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate { to { --angle: 360deg; } }
```
**When:** Cards, buttons, premium UI elements

### 6.5 Gooey / Blob Effect
**Depth:** 2–3
**What:** Elements merge together with a liquid, gooey feel
**How:**
- SVG filter: `feGaussianBlur` + `feColorMatrix` on overlapping elements
- CSS: Not directly, needs SVG filter
**Code:**
```svg
<filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo"/></filter>
```
**When:** Menu transitions, tab bars, organic UI elements
**Variants:** Gooey menu, blob morphing, liquid loader

### 6.6 Chromatic Aberration
**Depth:** 2–3
**What:** RGB channel split for glitch/optical effect
**How:**
- CSS: `text-shadow` with red and cyan offsets
- SVG: feOffset + feBlend for RGB channels
- JS: Canvas split RGB channels
**Code (CSS):**
```css
.chromatic { text-shadow: -2px 0 red, 2px 0 cyan; }
```
**When:** Glitch headers, sci-fi themes, hover states

### 6.7 Scan Lines
**Depth:** 1
**What:** Horizontal lines overlay for CRT/retro feel
**Code:**
```css
.scanlines { background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px); pointer-events: none; }
```
**When:** Retro themes, tech aesthetics, monitors

## Reference Files

The epic-design repo includes 5 additional reference files:
1. **GitHub repos list** — Curated web animation repos
2. **Awwwards reference sites** — Award-winning site analysis
3. **YouTube learning path** — Ranked educational channels
4. **Code patterns** — Reusable animation code
5. **Project type templates** — Animation strategy per project type

See corresponding files in this resource dump for merged versions.
