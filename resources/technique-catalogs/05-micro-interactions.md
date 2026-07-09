# Micro-Interactions — Full Tutorial Catalog

---

## 1. Magnetic Button

### Theory
Button subtly moves toward the cursor within a defined radius, creating a magnetic pull effect. On mouse leave, it snaps back (often with elastic ease). This is the most requested premium micro-interaction on Awwwards-winning sites.

### Step by Step

**1. Basic magnetic effect**
```javascript
const btn = document.querySelector('.magnetic-btn')
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  const strength = 0.3 // Lower = less movement
  gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' })
})
btn.addEventListener('mouseleave', () => {
  gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
})
```

**2. Magnetic with threshold (no movement unless cursor is close)**
```javascript
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  const distance = Math.sqrt(x * x + y * y)
  const threshold = 100
  if (distance < threshold) {
    const strength = (1 - distance / threshold) * 0.4
    gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.3 })
  }
})
```

**3. Magnetic wrapper (container follows cursor, inner elements respond)**
```javascript
wrapper.addEventListener('mousemove', (e) => {
  const rect = wrapper.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(btn, { x: x * 20, y: y * 20, duration: 0.4 })
  gsap.to(btnIcon, { x: x * 30, y: y * 30, duration: 0.3 }) // Icon moves more
})
```

**4. React implementation**
```tsx
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    gsap.to(ref.current, { x, y, duration: 0.4, ease: 'power2.out' })
  }
  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
  }
  return <button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>{children}</button>
}
```

### Variants
- **Magnetic with scale**: Button also scales up slightly on hover
- **Magnetic with glow**: Shadow/brightness follows the magnetic movement
- **Magnetic container**: Entire section is magnetic, elements inside respond differently
- **Touch fallback**: Disable magnetic on touch devices

### When to Use
- Primary CTAs
- Navigation items
- Social media icons
- Any clickable element on creative sites

---

## 2. Particle System (Cursor Trail)

### Theory
Particles spawn at the cursor position and drift away with physics (velocity, gravity, decay). Each particle has a lifetime, after which it's removed.

### Step by Step

**1. Simple Canvas particle trail**
```javascript
const canvas = document.getElementById('particles')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particles = []
class Particle {
  constructor(x, y) { this.x = x; this.y = y; this.size = Math.random() * 5 + 2; this.speedX = (Math.random() - 0.5) * 2; this.speedY = (Math.random() - 0.5) * 2; this.life = 1; }
  update() { this.x += this.speedX; this.y += this.speedY; this.life -= 0.02; }
  draw() { ctx.globalAlpha = this.life; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}
document.addEventListener('mousemove', (e) => { for (let i = 0; i < 3; i++) particles.push(new Particle(e.clientX, e.clientY)) })
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach((p, i) => { p.update(); p.draw(); if (p.life <= 0) particles.splice(i, 1) }); requestAnimationFrame(animate) }
animate()
```

**2. Three.js particle system**
```javascript
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const geometry = new THREE.BufferGeometry()
const count = 2000
const positions = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 10
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.8 })
const particles = new THREE.Points(geometry, material)
scene.add(particles)
camera.position.z = 5
function animate() { particles.rotation.y += 0.001; renderer.render(scene, camera); requestAnimationFrame(animate) }
animate()
```

### When to Use
- Hero section backgrounds
- Creative portfolio headers
- Interactive brand moments
- Ambient background motion

---

## 3. Hover 3D Tilt

### Theory
Element tilts based on mouse position within it, creating a 3D depth effect. Often combined with glare/shine overlay.

### Step by Step

**1. Basic 3D tilt**
```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(card, { rotateX: -y * 15, rotateY: x * 15, duration: 0.3, ease: 'power2.out' })
})
card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }))
```

**2. Tilt with depth layers (inner elements move more)**
```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(card, { rotateX: -y * 10, rotateY: x * 10, duration: 0.4 })
  gsap.to(card.querySelector('.inner-layer'), { x: x * 15, y: y * 15, duration: 0.3 })
  gsap.to(card.querySelector('.highlight'), { x: x * -5, y: y * -5, duration: 0.2 })
})
```

**3. Tilt with glare overlay**
```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  gsap.to(card, { rotateX: -(y - 0.5) * 20, rotateY: (x - 0.5) * 20, duration: 0.3 })
  gsap.to(card.querySelector('.glare'), { background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`, duration: 0.2 })
})
```

### When to Use
- Product cards
- Profile photos/avatars
- Pricing cards
- Portfolio items

---

## 4. Button Ripple

### Theory
On click, a ripple expands from the click point. Classic Material Design interaction, but can be customized for brand aesthetics.

### Step by Step

**1. CSS ripple**
```css
.ripple-btn { position: relative; overflow: hidden; }
.ripple-btn::after { content: ''; position: absolute; border-radius: 50%; background: rgba(255,255,255,0.4); width: 100%; padding-top: 100%; top: var(--y); left: var(--x); transform: translate(-50%, -50%) scale(0); opacity: 1; pointer-events: none; }
.ripple-btn:active::after { animation: ripple 0.6s ease-out; }
@keyframes ripple { to { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
```

**2. JS ripple with GSAP**
```javascript
btn.addEventListener('click', (e) => {
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const ripple = document.createElement('span')
  ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.5);width:20px;height:20px;left:${x}px;top:${y}px;pointer-events:none`
  btn.appendChild(ripple)
  gsap.to(ripple, { scale: 10, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => ripple.remove() })
})
```

### When to Use
- All buttons on creative sites
- Touch feedback for mobile
- Menu items

---

## 5. Glass / Blur Reveal

### Theory
Content has a glassmorphism effect that sharpens or changes on hover. Creates depth and material feel.

### Step by Step

**1. Basic glass card with hover sharpen**
```css
.glass-card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); transition: backdrop-filter 0.4s, background 0.4s; }
.glass-card:hover { backdrop-filter: blur(5px); background: rgba(255,255,255,0.15); }
```

**2. Content reveal behind glass**
```javascript
glassCard.addEventListener('mouseenter', () => {
  gsap.to(glassCard.querySelector('.hidden-content'), { opacity: 1, y: 0, duration: 0.3 })
  gsap.to(glassCard, { backdropFilter: 'blur(5px)', duration: 0.3 })
})
```

### When to Use
- Navigation menus
- Cards with preview content
- Overlay panels
- Product showcases

---

## 6. Cursor Follower

### Theory
A custom cursor element that follows the mouse with delay/smoothing. Often has two elements: a fast dot and a slow ring.

### Step by Step

**1. Dual cursor (dot + ring)**
```javascript
const cursor = { dot: document.querySelector('.cursor-dot'), ring: document.querySelector('.cursor-ring') }
gsap.set(cursor.ring, { xPercent: -50, yPercent: -50 })
gsap.set(cursor.dot, { xPercent: -50, yPercent: -50 })
document.addEventListener('mousemove', (e) => {
  gsap.to(cursor.dot, { x: e.clientX, y: e.clientY, duration: 0.1 })
  gsap.to(cursor.ring, { x: e.clientX, y: e.clientY, duration: 0.4 })
})
```

**2. Cursor with magnetic attract (grows near interactive elements)**
```javascript
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => gsap.to(cursor.ring, { scale: 2, duration: 0.3 }))
  el.addEventListener('mouseleave', () => gsap.to(cursor.ring, { scale: 1, duration: 0.3 }))
})
```

**3. Cursor trail particles**
```javascript
// Same as Particle System (section 2) but attached to cursor position
```

### When to Use
- Creative portfolios
- Brand showcase sites
- Awards submissions
- Any site wanting bespoke feel

---

## 7. Scroll-Triggered Counter

### Theory
Numbers count up from 0 to target value when scrolled into view. Includes formatting (commas, decimals, prefixes).

### Step by Step

**1. GSAP counter**
```javascript
const counter = { value: 0 }
gsap.to(counter, {
  value: 1000,
  duration: 2,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.counter', start: 'top 80%' },
  onUpdate: () => { document.querySelector('.counter').textContent = Math.round(counter.value).toLocaleString() }
})
```

**2. With prefix/suffix**
```javascript
onUpdate: () => { el.textContent = '$' + Math.round(counter.value).toLocaleString() + '+' }
```

### When to Use
- Stats/metrics sections
- Achievement numbers
- Pricing comparisons

---

## 8. Hover Reveal (Neighbor Dimming)

### Theory
In a grid, hovering one item dims/blurs all others, focusing attention on the hovered item.

### Step by Step

**1. CSS sibling approach**
```css
.grid-item { transition: opacity 0.3s, filter 0.3s; }
.grid:hover .grid-item { opacity: 0.4; filter: blur(2px); }
.grid-item:hover { opacity: 1; filter: blur(0); }
```

**2. GSAP with stagger-out on hover**
```javascript
const items = document.querySelectorAll('.grid-item')
items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(items, { opacity: 0.4, filter: 'blur(2px)', duration: 0.3, stagger: { each: 0.02, from: item } })
    gsap.to(item, { opacity: 1, filter: 'blur(0)', duration: 0.3 })
  })
  item.addEventListener('mouseleave', () => {
    gsap.to(items, { opacity: 1, filter: 'blur(0)', duration: 0.3 })
  })
})
```

### When to Use
- Team member grids
- Portfolio galleries
- Product listings
- Feature cards
