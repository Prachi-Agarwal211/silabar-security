# Atmosphere & Backgrounds — Full Tutorial Catalog

---

## 1. Mesh Gradient

### Theory
Multiple blurred radial gradients overlaid and animated independently. Creates fluid, dreamy background environments. Favored by award-winning sites as an alternative to solid colors or images.

### Step by Step

**1. CSS mesh gradient**
```css
.mesh-bg { position: relative; overflow: hidden; }
.mesh-bg::before { content: ''; position: absolute; inset: -50%; /* Extend beyond for movement */ background: radial-gradient(ellipse at 20% 50%, #ff6b6b 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #4ecdc4 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #45B7D1 0%, transparent 50%); filter: blur(60px); animation: meshMove 20s ease-in-out infinite alternate; }
@keyframes meshMove { 0% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(5%, -5%) rotate(5deg); } 66% { transform: translate(-5%, 5%) rotate(-3deg); } 100% { transform: translate(3%, -3%) rotate(2deg); } }
```

**2. Three.js animated mesh**
```javascript
const geometry = new THREE.PlaneGeometry(2, 2)
const material = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uColor1: { value: new THREE.Color('#ff6b6b') }, uColor2: { value: new THREE.Color('#4ecdc4') } },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `uniform float uTime; uniform vec3 uColor1; uniform vec3 uColor2; varying vec2 vUv; void main() { vec2 p = vUv + uTime * 0.01; float d = distance(p, vec2(0.5 + sin(uTime * 0.3) * 0.2, 0.5 + cos(uTime * 0.4) * 0.2)); vec3 color = mix(uColor1, uColor2, d); gl_FragColor = vec4(color, 1.0); }`
})
const mesh = new THREE.Mesh(geometry, material)
function animate() { material.uniforms.uTime.value += 0.01; renderer.render(scene, camera); requestAnimationFrame(animate) }
```

**3. Canvas mesh gradient with mouse interaction**
```javascript
const canvas = document.getElementById('mesh')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth; canvas.height = window.innerHeight
const gradients = [{ x: 0.2, y: 0.5, color: '#ff6b6b', speed: 0.3 }, { x: 0.8, y: 0.5, color: '#4ecdc4', speed: 0.4 }, { x: 0.5, y: 0.8, color: '#45B7D1', speed: 0.2 }]
document.addEventListener('mousemove', (e) => { gradients.forEach(g => { g.targetX = e.clientX / canvas.width; g.targetY = e.clientY / canvas.height }) })
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); gradients.forEach(g => { g.x += (g.targetX - g.x) * 0.01; g.y += (g.targetY - g.y) * 0.01; const gradient = ctx.createRadialGradient(g.x * canvas.width, g.y * canvas.height, 0, g.x * canvas.width, g.y * canvas.height, canvas.width * 0.7); gradient.addColorStop(0, g.color); gradient.addColorStop(1, 'transparent'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height) }); ctx.filter = 'blur(40px)'; requestAnimationFrame(animate) }
animate()
```

### Variants
- **3-color mesh**: Three gradient points for more complexity
- **Scroll-reactive mesh**: Colors shift based on scroll position
- **Mouse-reactive mesh**: Gradient points follow cursor
- **Static mesh with animation**: Gradient positions animate via CSS keyframes

### When to Use
- Hero section backgrounds
- Full-page ambient backgrounds
- Section dividers
- Landing page atmospherics

---

## 2. Noise Texture Overlay

### Theory
A subtle grain/texture overlay that gives digital interfaces a tactile, physical feel. Uses SVG `<feTurbulence>` filter to generate organic noise without image assets.

### Step by Step

**1. SVG noise overlay**
```css
.noise-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.035; }
.noise-overlay::before { content: ''; position: absolute; inset: -50%; width: 200%; height: 200%; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 256px 256px; animation: noiseShift 0.5s steps(4) infinite; }
@keyframes noiseShift { 0% { transform: translate(0, 0); } 25% { transform: translate(-5%, -5%); } 50% { transform: translate(-10%, 5%); } 75% { transform: translate(5%, -10%); } }
```

**2. Canvas noise (animated)**
```javascript
const canvas = document.getElementById('noise')
const ctx = canvas.getContext('2d')
canvas.width = 128; canvas.height = 128 // Small for performance
function drawNoise() { const imageData = ctx.createImageData(canvas.width, canvas.height); const data = imageData.data; for (let i = 0; i < data.length; i += 4) { const v = Math.random() * 255; data[i] = v; data[i+1] = v; data[i+2] = v; data[i+3] = 12 } ctx.putImageData(imageData, 0, 0); requestAnimationFrame(drawNoise) }
drawNoise()
```
```css
.noise-canvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; image-rendering: pixelated; }
```

**3. GSAP animated turbulence**
```javascript
gsap.to('feTurbulence', { attr: { baseFrequency: '0.75', numOctaves: 4 }, duration: 0.5, ease: 'none', repeat: -1, yoyo: true })
```

### Variants
- **Colored noise**: Slight color tint in the noise (warm/cool)
- **Directional noise**: Lines instead of grain (scan lines)
- **Hover-reactive noise**: Noise intensifies on hover over specific elements
- **Reduced motion**: Disable noise animation, keep static overlay

### When to Use
- Every project (subtly). It adds tactile quality.
- Retro/vintage themes
- Brooding/dark aesthetics
- Film-like experiences

---

## 3. Glassmorphism

### Theory
Frosted glass effect using `backdrop-filter: blur()` on semi-transparent backgrounds. Creates depth through layered transparency. Commonly paired with light/white backgrounds.

### Step by Step

**1. Basic glass card**
```css
.glass { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); }
```

**2. Dark glass**
```css
.glass-dark { background: rgba(0, 0, 0, 0.2); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); }
```

**3. Animated glass (blur shift on scroll)**
```javascript
gsap.to('.glass', { backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.15)', scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }})
```

**4. Glass with inner shine**
```css
.glass-shine { position: relative; overflow: hidden; }
.glass-shine::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.05) 100%); pointer-events: none; }
```

### Performance Note
`backdrop-filter` is expensive on mobile. Use sparingly or test on device. Fallback: semi-transparent background without blur.

### When to Use
- Navigation overlays
- Card components
- Modal backgrounds
- Feature highlight panels

---

## 4. Gradient Border Animation

### Theory
An animated border using conic-gradient or linear-gradient that rotates or shifts continuously. Creates premium, jewel-like edges.

### Step by Step

**1. CSS conic-gradient rotating border**
```css
@keyframes rotateBorder { to { --angle: 360deg; } }
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
.gradient-border { --angle: 0deg; border: 3px solid; border-image: conic-gradient(from var(--angle), #ff6b6b, #4ecdc4, #45B7D1, #ff6b6b) 1; animation: rotateBorder 4s linear infinite; }
```

**2. Pseudo-element border (more compatible)**
```css
.gradient-border { position: relative; }
.gradient-border::before { content: ''; position: absolute; inset: -3px; border-radius: inherit; background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45B7D1, #ff6b6b); background-size: 400% 400%; animation: gradientShift 4s ease infinite; z-index: -1; }
```

**3. GSAP animated gradient border**
```javascript
gsap.to('.gradient-btn', { backgroundPosition: '200% 0', duration: 3, repeat: -1, ease: 'linear' })
```
```css
.gradient-btn { background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45B7D1, #ff6b6b); background-size: 200% 100%; }
```

### When to Use
- Premium CTAs
- Card frames
- Active/selected states
- Loading/skeleton borders

---

## 5. Gooey / Blob Effect

### Theory
Elements merge together with a liquid feel using SVG filters. Two or more overlapping elements lose their hard edges and blend into a single organic shape.

### Step by Step

**1. Gooey SVG filter**
```svg
<filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo"/><feBlend in="SourceGraphic" in2="goo"/></filter>
```

**2. Gooey menu**
```html
<nav class="gooey-menu" style="filter: url(#goo)">
  <a>Home</a><a>About</a><a>Work</a><a>Contact</a>
</nav>
```

**3. Gooey blob morphing**
```css
.blob { width: 200px; height: 200px; background: #ff6b6b; border-radius: 50%; filter: url(#goo); animation: blobMorph 8s ease-in-out infinite; }
@keyframes blobMorph { 0% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; } 25% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; } 50% { border-radius: 40% 60% 30% 70% / 60% 40% 60% 40%; } 75% { border-radius: 70% 30% 50% 50% / 30% 70% 30% 70%; } }
```

### When to Use
- Creative navigation menus
- Tab bars (iOS-style gooey tab)
- Liquid loaders
- Organic decorative elements

---

## 6. Chromatic Aberration

### Theory
RGB channel split creates a glitch/optical illusion effect. Each color channel (R, G, B) shifts independently, creating colored "shadows."

### Step by Step

**1. CSS chromatic text**
```css
.chromatic { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; transition: text-shadow 0.3s; }
.chromatic:hover { text-shadow: -4px 0 #ff0000, 4px 0 #00ffff; }
```

**2. Animated chromatic aberration**
```javascript
gsap.to('.chromatic', { textShadow: '-8px 0 #ff0000, 8px 0 #00ffff', duration: 0.1, repeat: 1, yoyo: true })
// Quick flash for glitch feel
```

**3. Scroll-reactive chromatic**
```javascript
ScrollTrigger.create({ trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true, onUpdate: (self) => { const intensity = self.progress * 10; document.querySelector('.chromatic').style.textShadow = `-${intensity}px 0 #ff0000, ${intensity}px 0 #00ffff` }})
```

**4. SVG chromatic filter**
```svg
<filter id="chromatic">
  <feOffset in="SourceGraphic" dx="3" dy="0" result="red-shift"/>
  <feColorMatrix in="red-shift" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>
  <feOffset in="SourceGraphic" dx="-3" dy="0" result="blue-shift"/>
  <feColorMatrix in="blue-shift" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue"/>
  <feBlend in="red" in2="blue" mode="screen"/>
</filter>
```

### When to Use
- Glitch/hover effects on headers
- Sci-fi/cyberpunk themes
- Music/entertainment branding
- Accent on hover transitions

---

## 7. Scan Lines

### Theory
Horizontal lines overlay for CRT/retro screen aesthetic. Creates a nostalgic or technical feel.

### Step by Step

**1. CSS scan lines**
```css
.scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 9999; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px); }
```

**2. Animated scan lines (CRT flicker)**
```css
.scanlines-animated { background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px); animation: scanMove 8s linear infinite; }
@keyframes scanMove { 0% { background-position: 0 0; } 100% { background-position: 0 4px; } }
```

**3. Scan line + noise combination**
```css
.crt-effect { position: fixed; inset: 0; pointer-events: none; z-index: 9999; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px), url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E"); background-blend-mode: overlay; }
```

### When to Use
- Retro/cyberpunk themes
- Tech/dev tooling sites
- Gaming communities
- Portfolio with industrial feel
