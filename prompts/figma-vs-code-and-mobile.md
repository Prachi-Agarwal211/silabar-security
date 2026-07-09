# Figma vs Code + Mobile Design

**Merged from:** `04-MOBILE-CREATIVE-CODING-AND-AI-DETECTION.md` + `22-FIGMA-VS-CODE-ADVANTAGE.md`

---

## PART 1: FIGMA VS CUSTOM CODE

### What Figma Sites Cannot Do

| Technique | Figma | Custom Code |
|-----------|-------|-------------|
| Custom WebGL/WebGPU | ❌ | ✅ Full GPU access |
| Real-time physics | ❌ | ✅ 60fps physics |
| Scroll-driven 3D camera | ❌ | ✅ Full scroll control |
| Audio-reactive visuals | ❌ | ✅ Web Audio API |
| Custom GLSL/WGSL shaders | ❌ | ✅ Custom shaders |
| Variable font animation | ❌ | ✅ Animate weight/width |
| GPGPU particles (100K+) | ❌ | ✅ Parallel GPU |
| Custom cursor per section | ❌ | ✅ Shape changes |
| Spring physics interactions | ❌ | ✅ Mass-spring-damper |
| Haptic feedback | ❌ | ✅ Vibration API |
| Device motion parallax | ❌ | ✅ Gyroscope |
| View Transitions API | ❌ | ✅ SPA-like transitions |
| Container queries | ❌ | ✅ Component-level |
| JSON-LD structured data | ❌ | ✅ Full control |
| SSG/ISR rendering | ❌ | ✅ Full rendering control |

### The 15 Weapons (Unique to Custom Code)
1. Custom WebGL/WebGPU — Oryzo.io, IVRESS
2. Real-time physics — Bruno Simon portfolio
3. Scroll-driven 3D camera — Hubtown
4. Audio-reactive visuals — Audio-reactive backgrounds
5. Procedural generation — Generative art
6. Custom shaders — Patrick Hurlburt
7. Variable font animation — Build Studio
8. GPGPU particles — Sleep Well Creative
9. CSS scroll-driven animations — Nothing.tech
10. View Transitions API — Framer.com
11. Container queries — Modern component libraries
12. Haptic feedback — Game-like mobile
13. Device motion parallax — Mobile 3D
14. Custom cursor — Ilya Kostin
15. Spring physics — Stripe hover effects

---

## PART 2: MOBILE DESIGN

### Dynamic Viewport Units
```css
.hero { height: 100dvh; } /* No address bar jump */
```

### Safe Area Handling
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
```css
.bottom-nav { padding-bottom: env(safe-area-inset-bottom); }
.page-content { padding-top: env(safe-area-inset-top); }
```

### Haptic Feedback
```javascript
navigator.vibrate(50)           // Brief tap (button press)
navigator.vibrate([100, 30, 100]) // Error pattern
navigator.vibrate(10)            // Subtle boundary
```

### Device Motion Parallax
```javascript
async function enableMotion() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    const permission = await DeviceOrientationEvent.requestPermission()
    if (permission !== 'granted') return false
  }
  return true
}
window.addEventListener('deviceorientation', (event) => {
  document.documentElement.style.setProperty('--tilt-x', `${event.gamma}deg`)
  document.documentElement.style.setProperty('--tilt-y', `${event.beta}deg`)
})
```

### Mobile WebGL Performance
```javascript
const isMobile = window.innerWidth < 768
const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, powerPreference: isMobile ? 'low-power' : 'high-performance' })
renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2))
const particleCount = isMobile ? 10000 : 100000
```

### Creative Coding Libraries

| Library | Stars | Primary Use |
|---------|-------|-------------|
| GSAP | 18k+ | Timeline animation, ScrollTrigger |
| Three.js | 104k+ | 3D rendering, WebGL |
| R3F | 26k+ | React wrapper for Three.js |
| Drei | 13k+ | R3F helpers |
| React Spring | 28k+ | Physics-based animation |
| Motion | 9k+ | React animation |
| P5.js | 22k+ | Generative art |
| D3.js | 109k+ | Data visualization |
| Paper.js | 14k+ | 2D vector graphics |
| Rough.js | 9k+ | Hand-drawn style |
| Matter.js | 17k+ | 2D physics |
| Lenis | 5k+ | Smooth scrolling |

### Library Combination Patterns
- Hand-drawn interactive graph: Rough.js + use-gesture + React Spring + Flubber
- Data viz on scroll: D3.js + GSAP ScrollTrigger + GSAP + custom shaders
- Generative art + music: P5.js/Three.js + Web Audio API + RAF + use-gesture

---

## PART 3: ANTI-AI DETECTION

### The 10 AI Detection Markers
| # | Marker | AI Pattern | Human Pattern |
|---|--------|-----------|---------------|
| 1 | Layout | Standard 3-column / hero | Bespoke architectural layouts |
| 2 | Typography | Inter, Poppins, Roboto | Curated, display-pair fonts |
| 3 | Color | Safe gradient mashups | Context-aware, unique palettes |
| 4 | UI Tropes | Heavy shadows, large border-radius | Custom depth, intentional whitespace |
| 5 | Motion | Generic linear fade-ins | Physics-based, story-driven |
| 6 | Navigation | Logo left, links center, CTA right | Unique, brand-specific |
| 7 | Content | "Revolutionizing X with AI" | Specific, brand-aligned voice |
| 8 | Spacing | Mathematically uniform | Intentional rhythm, visual tension |
| 9 | Cards | Same size, same radius, same shadow | Varied, asymmetric, intentional |
| 10 | Emotion | Feels "fine" | Feels "alive" |

### The "Visual Elevator Music" Test
> If a site feels "perfectly fine" but leaves you unable to recall a single unique detail 10 minutes later, it's "visual elevator music."

### The "Remember One Thing" Test
After viewing a site:
- Can't name one thing? → Template-like
- Remembered "it looked nice"? → Template-like
- Remembered "the way the text animated" or "the cursor changed shape"? → Crafted

---

## PART 4: ADVANCED RESPONSIVE

### Fluid Typography
```css
h1 { font-size: clamp(2rem, 1.5rem + 2.5vw, 4rem); } /* No breakpoint jumps */
```

### Container Queries
```css
.card-container { container-type: inline-size; container-name: card; }
@container card (min-width: 400px) { .card { grid-template-columns: 200px 1fr; } }
```

### CSS Subgrid
```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.card { display: grid; grid-template-columns: subgrid; }
```

### Fluid Spacing Scale
```css
:root {
  --space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  --space-md: clamp(1rem, 0.8rem + 1vw, 2rem);
  --space-lg: clamp(2rem, 1.5rem + 2vw, 4rem);
  --space-xl: clamp(4rem, 3rem + 4vw, 8rem);
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
  --text-2xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);
}
```

### User Preference Media
```css
@media (prefers-color-scheme: dark) { :root { --bg: #0a0a0a; --text: #fff; } }
@media (prefers-contrast: high) { :root { --text: #000; --bg: #fff; } }
@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
```
