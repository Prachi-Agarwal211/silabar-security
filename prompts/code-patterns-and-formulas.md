# Code Patterns & Formulas

**Merged from:** `16-CODE-PATTERNS-LIBRARY.md` + `20-CREATIVE-CODING-FORMULAS.md`

---

## PART 1: COPY-PASTE-READY PATTERNS

### 1.1 Scroll-Driven Reveal (CSS Only)
```tsx
export function ScrollReveal({ children, direction = "up", delay = 0 }) {
  const dirs = { up: "translate-y-[60px]", down: "-translate-y-[60px]", left: "translate-x-[60px]", right: "-translate-x-[60px]" }
  return <div className={`opacity-0 ${dirs[direction]} animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]`} style={{ animationDelay: `${delay}ms` }}>{children}</div>
}
```
```css
@keyframes reveal { to { opacity: 1; transform: translate(0, 0); } }
```

### 1.2 CSS Scroll-Driven Animation (2026)
```css
.scroll-reveal { animation: scrollReveal linear both; animation-timeline: view(); animation-range: entry 0% entry 100%; }
@keyframes scrollReveal { from { opacity: 0; transform: translateY(100px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
```

### 1.3 Text Split Animation
```tsx
export function SplitText({ text, className = "", delay = 0 }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll(".char").forEach((char, i) => (char as HTMLElement).style.animationDelay = `${delay + i * 0.03}s`)
  }, [delay])
  return <div ref={ref} className={className}>{text.split("").map((char, i) => <span key={i} className="char inline-block opacity-0 animate-[charReveal_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">{char === " " ? "\u00A0" : char}</span>)}</div>
}
```
```css
@keyframes charReveal { from { opacity: 0; transform: translateY(100%) rotateX(-80deg); filter: blur(4px); } to { opacity: 1; transform: translateY(0) rotateX(0deg); filter: blur(0); } }
```

### 1.4 Custom Cursor
```tsx
export function CustomCursor() {
  const x = useSpring(0, { damping: 25, stiffness: 200 })
  const y = useSpring(0, { damping: 25, stiffness: 200 })
  const [isHovering, setIsHovering] = useState(false)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const handleMouseOver = (e: MouseEvent) => { setIsHovering(!!(e.target as HTMLElement).closest("a, button, [data-cursor]")) }
    window.addEventListener("mousemove", handleMouseMove); window.addEventListener("mouseover", handleMouseOver)
    document.body.style.cursor = "none"
    return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseover", handleMouseOver); document.body.style.cursor = "auto" }
  }, [x, y])
  return <><motion.div className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference" style={{ x, y, translateX: "-50%", translateY: "-50%" }} /><motion.div className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] mix-blend-difference transition-all duration-300 ${isHovering ? "w-16 h-16 border-white bg-white/10" : "w-8 h-8 border-white/50"}`} style={{ x, y, translateX: "-50%", translateY: "-50%" }} /></>
}
```

### 1.5 Magnetic Button
```tsx
export function Magnet({ children, intensity = 0.3 }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * intensity, y: (e.clientY - rect.top - rect.height / 2) * intensity })
  }
  return <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => setPos({ x: 0, y: 0 })} className="inline-block transition-transform duration-200 ease-out" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>{children}</div>
}
```

### 1.6 Section Reveal with Clip-Path
```css
.section-reveal { animation: sectionReveal 1s cubic-bezier(0.77, 0, 0.175, 1) both; animation-timeline: view(); animation-range: entry 0% entry 100%; }
@keyframes sectionReveal { from { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }
.circle-reveal { animation: circleReveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) both; animation-timeline: view(); animation-range: entry 0% entry 100%; }
@keyframes circleReveal { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(100% at 50% 50%); } }
```

### 1.7 Noise Texture Overlay
```css
.noise-overlay::before { content: ""; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); opacity: 0.03; pointer-events: none; z-index: 1; }
```

### 1.8 Section Transition (View Transitions API)
```tsx
export function navigateWithTransition(url: string) {
  if (!document.startViewTransition) { window.location.href = url; return }
  document.startViewTransition(() => { window.location.href = url })
}
```
```css
::view-transition-old(root) { animation: fadeOut 0.3s ease-out; }
::view-transition-new(root) { animation: fadeIn 0.3s ease-in; }
@keyframes fadeOut { to { opacity: 0; transform: scale(0.98); } }
@keyframes fadeIn { from { opacity: 0; transform: scale(1.02); } }
```

### 1.9 OKLCH Dynamic Theme
```css
:root { --primary: oklch(0.7 0.2 250); --secondary: oklch(0.8 0.15 300); --neutral: oklch(0.95 0.01 250); --text: oklch(0.2 0.01 250); }
.dark { --primary: oklch(0.8 0.2 250); --secondary: oklch(0.9 0.15 300); --neutral: oklch(0.15 0.01 250); --text: oklch(0.95 0.01 250); }
.tint-primary { background: color-mix(in oklch, var(--primary) 15%, transparent); }
```

### 1.10 Asymmetric Grid (Anti-3-Column)
```css
.asymmetric-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
.asymmetric-grid > *:first-child { grid-row: 1 / 3; }
.asymmetric-grid > *:last-child { grid-column: 2; grid-row: 1 / 3; }
@media (max-width: 768px) { .asymmetric-grid { grid-template-columns: 1fr; } .asymmetric-grid > *:first-child, .asymmetric-grid > *:last-child { grid-row: auto; grid-column: auto; } }
```

---

## PART 2: MATH FORMULAS

### 2.1 Spring Physics
```
F = -k * x - c * v  (k = stiffness, x = displacement, c = damping, v = velocity)
```
```typescript
function spring(current: number, target: number, velocity: number, stiffness = 100, damping = 10, mass = 1): [number, number] {
  const springForce = -stiffness * (current - target)
  const dampingForce = -damping * velocity
  const acceleration = (springForce + dampingForce) / mass
  const newVelocity = velocity + acceleration * 0.016
  const newPosition = current + newVelocity * 0.016
  return [newPosition, newVelocity]
}
```

### 2.2 Elastic Easing
```
y = 1 - cos(π * x) * e^(-6 * x)
```
```typescript
function elasticOut(x: number): number {
  const c4 = (2 * Math.PI) / 3
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
}
```

### 2.3 Perlin Noise
2D gradient noise producing smooth, continuous random values. Implementation in section 1.4 of seo-creative-strategy.md.

### 2.4 Flow Field
```
angle = noise(x * frequency, y * frequency) * TWO_PI
velocity = [cos(angle), sin(angle)]
position += velocity * speed
```

### 2.5 Boids (Flocking)
3 rules: Separation (avoid crowding), Alignment (match velocity), Cohesion (steer toward center). Full 3D implementation in `seo-creative-strategy.md`.

### 2.6 Voronoi
For each point, find the nearest seed point. Distance-based cellular patterns.

### 2.7 Reaction-Diffusion (Gray-Scott)
```
∂a/∂t = Da∇²a - ab² + f(1-a)
∂b/∂t = Db∇²b + ab² - (k+f)b
```
Parameters: spots (f=0.055, k=0.062), stripes (f=0.04, k=0.06), spirals (f=0.014, k=0.045), coral (f=0.062, k=0.063).

### 2.8 Curl Noise
```
velocity.x = ∂noise/∂y, velocity.y = -∂noise/∂x
```
Creates fluid/swirling motion.

### 2.9 Cubic Bézier
```
B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3
```

### 2.10 Wave Function
```
y = A * sin(ωx + φ) + offset
```

### Formula Cheat Sheet
| Effect | Formula | Use |
|--------|---------|-----|
| Spring | F = -kx - cv | Bouncy UI, cursor |
| Elastic | cos(πx) * e^(-6x) | Premium feel |
| Perlin | Gradient noise | Organic textures |
| Flow Field | angle = noise(x,y) * 2π | Particle movement |
| Boids | Sep + Align + Cohesion | Flocking |
| Voronoi | Nearest point | Cellular patterns |
| Reaction-Diffusion | ∂a/∂t = ... | Coral, biological |
| Curl Noise | ∂noise/∂y, -∂noise/∂x | Smoke, fluid |
| Cubic Bézier | (1-t)³P0 + ... | Custom easing |
| Wave | A * sin(ωx + φ) | Wave effects |

### Anti-Generic Checklist (for every pattern)
- [ ] Custom easing (not default ease)
- [ ] Unique interaction (not just fade-in)
- [ ] OKLCH colors (not sRGB)
- [ ] "Remember one thing" quality
- [ ] CSS-first approach when possible
- [ ] Performant (compositor-thread)
- [ ] Mobile fallback
- [ ] Respects prefers-reduced-motion
