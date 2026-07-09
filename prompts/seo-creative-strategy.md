# SEO + Creative Strategy

**Merged from:** `02-CREATIVE-CODING-ENGINEERING.md` + `21-SEO-AND-CONTENT-STRATEGY.md`

---

## PART 1: CREATIVE CODING ENGINEERING

### 1.1 Spring Physics (Mass-Spring-Damper)

Real springs follow Hooke's Law combined with Damping Force:

```
F_spring = -k × x  (k = stiffness, x = displacement)
F_damping = -d × v (d = damping, v = velocity)
F_total = (-k × x) + (-d × v)
a = F_total / mass
v_new = v_old + a × dt
x_new = x_old + v_new × dt
```

**Custom Spring Implementation:**
```typescript
function springAnimation(element: HTMLElement, targetX: number, targetY: number, config = { stiffness: 0.1, damping: 0.8, mass: 1, precision: 0.01 }) {
  let x = 0, y = 0, vx = 0, vy = 0
  let animating = true
  function step() {
    if (!animating) return
    const fx = -config.stiffness * (x - targetX)
    const fy = -config.stiffness * (y - targetY)
    const dvx = -config.damping * vx
    const dvy = -config.damping * vy
    vx += (fx + dvx) / config.mass
    vy += (fy + dvy) / config.mass
    x += vx; y += vy
    element.style.transform = `translate(${x}px, ${y}px)`
    if (Math.abs(vx) < config.precision && Math.abs(vy) < config.precision && Math.abs(x - targetX) < config.precision && Math.abs(y - targetY) < config.precision) {
      element.style.transform = `translate(${targetX}px, ${targetY}px)`
      return
    }
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
  return () => { animating = false }
}
```

**Tuning Guide:**
| Stiffness | Damping | Result |
|-----------|---------|--------|
| High (0.2+) | Low (0.3) | Snappy, energetic bounce |
| High (0.2+) | High (0.9) | Quick settle, minimal bounce |
| Low (0.05) | Low (0.3) | Slow, dramatic overshoot |
| Medium (0.1) | Medium (0.7) | Balanced, natural feel |

### 1.2 Cubic Bézier Easing Curves

Every easing curve is a cubic Bézier: `B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃`

**Premium Curves:**
| Name | cubic-bezier | Use |
|------|-------------|-----|
| Premium Smooth | `0.16, 1, 0.3, 1` | Most UI transitions |
| Playful Overshoot | `0.34, 1.56, 0.64, 1` | Buttons, playful |
| Energetic Bounce | `0.68, -0.55, 0.27, 1.55` | Landing effects |
| Snappy Response | `0.2, 0, 0, 1` | UI feedback, hover |
| Cinematic Reveal | `0.77, 0, 0.175, 1` | Hero text reveals |
| Fluid Motion | `0.25, 0.46, 0.45, 0.94` | Scroll-linked animations |

### 1.3 GLSL Shaders

**Vertex Shader (wave displacement):**
```glsl
uniform float uTime; uniform float uFrequency; uniform float uAmplitude;
varying vec2 vUv; varying float vElevation;
void main() {
  vUv = uv;
  float elevation = sin(position.x * uFrequency + uTime) * uAmplitude;
  elevation += sin(position.y * uFrequency * 0.5 + uTime * 0.8) * uAmplitude * 0.5;
  vec3 newPosition = position; newPosition.z = elevation;
  vElevation = elevation;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
```

**Fragment Shader (color mixing):**
```glsl
uniform float uTime; uniform vec3 uColor1; uniform vec3 uColor2;
varying vec2 vUv; varying float vElevation;
void main() {
  float mixFactor = (vElevation + 0.1) * 5.0;
  vec3 color = mix(uColor1, uColor2, mixFactor);
  float noise = fract(sin(dot(vUv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  color += noise * 0.02;
  float vignette = 1.0 - smoothstep(0.4, 1.4, length(vUv - 0.5) * 2.0);
  color *= vignette;
  gl_FragColor = vec4(color, 1.0);
}
```

### 1.4 Procedural Generation

**Perlin Noise:**
```typescript
class PerlinNoise {
  private permutation: number[]
  constructor(seed = 0) {
    this.permutation = [...Array(256)].map((_, i) => i)
    let s = seed
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647
      const j = s % (i + 1); [this.permutation[i], this.permutation[j]] = [this.permutation[j], this.permutation[i]]
    }
    this.permutation = [...this.permutation, ...this.permutation]
  }
  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255
    const xf = x - Math.floor(x), yf = y - Math.floor(y)
    const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10), v = yf * yf * yf * (yf * (yf * 6 - 15) + 10)
    const p = this.permutation, a = p[X] + Y, b = p[X + 1] + Y
    const grad = (hash: number, x: number, y: number) => { const h = hash & 3; const u = h < 2 ? x : y; const v = h < 2 ? y : x; return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v) }
    const lerp = (a: number, b: number, t: number) => a + t * (b - a)
    return lerp(lerp(grad(p[a], xf, yf), grad(p[b], xf - 1, yf), u), lerp(grad(p[a + 1], xf, yf - 1), grad(p[b + 1], xf - 1, yf - 1), u), v)
  }
  fbm(x: number, y: number, octaves = 4): number {
    let value = 0, amplitude = 0.5, frequency = 1
    for (let i = 0; i < octaves; i++) { value += amplitude * this.noise2D(x * frequency, y * frequency); amplitude *= 0.5; frequency *= 2 }
    return value
  }
}
```

**Boids (Flocking):** 3 rules: Separation (avoid crowding), Alignment (match velocity), Cohesion (steer toward center). Creates emergent flock behavior.

**Flow Fields:** Particles follow a vector field created by noise. `angle = noise(x * scale, y * scale, time) * PI * 2`

**Reaction-Diffusion (Gray-Scott):** ∂a/∂t = Da∇²a - ab² + f(1-a), ∂b/∂t = Db∇²b + ab² - (k+f)b. Creates organic patterns (spots, stripes, spirals, coral).

### 1.5 SSR Patterns

```typescript
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// GSAP + Next.js
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '@/lib/gsap'  // Register ScrollTrigger once in lib/gsap.ts

export default function AnimatedSection() {
  const scopeRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const ctx = gsap.context(() => { gsap.from('.item', { y: 50, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: scopeRef.current, start: 'top 80%' } }) }, scopeRef)
    return () => ctx.revert()
  }, { scope: scopeRef })
  return <div ref={scopeRef}><div className="item">Item 1</div></div>
}
```

### 1.6 Audio-Reactive Pipeline
```javascript
const audioContext = new AudioContext()
const analyser = audioContext.createAnalyser()
analyser.fftSize = 256
source.connect(analyser); analyser.connect(audioContext.destination)
const dataArray = new Uint8Array(analyser.frequencyBinCount)
function animate() {
  analyser.getByteFrequencyData(dataArray)
  const bass = dataArray.slice(0, 10).reduce((a, b) => a + b) / 10 / 255
  const mid = dataArray.slice(10, 50).reduce((a, b) => a + b) / 40 / 255
  const treble = dataArray.slice(50, 128).reduce((a, b) => a + b) / 78 / 255
  mesh.scale.setScalar(1 + bass * 0.5)
  requestAnimationFrame(animate)
}
```

---

## PART 2: SEO & CONTENT STRATEGY

### Technical SEO Checklist

```typescript
// app/layout.tsx
export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: 'Brand — Tagline', template: '%s | Brand' },
  description: 'Compelling description with target keywords.',
  openGraph: { title: 'Brand — Tagline', description: '...', url: 'https://example.com', siteName: 'Brand', locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Brand — Tagline', description: '...' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
}
```

### Performance Targets
| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.5s | Optimize hero image, priority |
| FID | < 100ms | Minimize main thread |
| CLS | < 0.1 | Set image dimensions, font-display: swap |
| INP | < 200ms | Optimize event handlers |
| TTFB | < 800ms | SSG, optimize server |

### Content Requirements Per Page
| Page | Min Words | Type |
|------|-----------|------|
| Homepage | 500+ | Value proposition, features |
| Inner pages | 300+ | Specific topic coverage |
| Blog | 1000+ | Educational, guides |
| About | 400+ | Company story, mission |

### Per-Project SEO Targets
- **Silbar:** "security services [city]" — local landing pages, Organization + LocalBusiness + Service schema
- **Khemji:** "security training" — Course + FAQPage schema, blog weekly
- **ShipBridge:** "international logistics technology" — blog weekly, Service schema
- **MAAC:** "fashion e-commerce india" — blog weekly, Product + Offer schema

### Internal Linking Rules
- Every page links to homepage + contact
- Blog posts link to relevant service/product pages
- No orphan pages (every page has 1+ internal links)
- Anchor text is descriptive (not "click here")

### Accessibility = SEO
- Semantic HTML → Google understands content structure
- Alt text → Images indexed properly
- Heading hierarchy → Content structure understood
- 4.5:1 contrast ratio for text, 3:1 for UI
- Keyboard navigation, screen reader support
- `prefers-reduced-motion`, `prefers-contrast` respected
