# Research & References

**Merged from:** `10-TECHNIQUE-INVENTORY-AND-RESEARCH-2026.md` + `13-AWWWARDS-REFERENCE-SITES.md` + `14-GITHUB-REPOS-BIBLE.md` + `15-YOUTUBE-LEARNING-MAP.md`

---

## PART 1: TECHNIQUE INVENTORY (Cross-Project)

### Who Uses What
| Technique | Khemji | ShipBridge | MAAC | Silbar |
|-----------|--------|------------|------|--------|
| GSAP | ❌ | ✅ | ✅ | ✅ |
| GSAP ScrollTrigger | ❌ | ✅ | ✅ | ✅ |
| Three.js | ❌ | ✅ | ✅ | ❌ |
| React Three Fiber | ❌ | ✅ | ✅ | ❌ |
| Framer Motion | ✅ | ✅ | ❌ | ❌ |
| Lenis | ✅ | ✅ | ✅ | ✅ |
| Custom cursor | ❌ | ✅ | ✅ | ❌ |
| Magnetic button | ❌ | ✅ | ✅ | ✅ |
| Split text reveal | ❌ | ✅ | ✅ | ✅ |
| Scroll reveal | ❌ | ✅ | ✅ | ✅ |
| Marquee/ticker | ❌ | ✅ | ✅ | ✅ |
| Container queries | ❌ | ❌ | ❌ | ✅ |
| View Transitions API | ❌ | ❌ | ❌ | ✅ |
| Logical Properties | ❌ | ❌ | ❌ | ✅ |

### Libraries Installed
| Library | Khemji | ShipBridge | MAAC | Silbar |
|---------|--------|------------|------|--------|
| gsap | 3.15.0 | 3.15.0 | 3.14.2 | 3.15.0 |
| three | ❌ | 0.184.0 | 0.183.2 | ❌ |
| @react-three/fiber | ❌ | 9.6.1 | 8.18.0 | ❌ |
| framer-motion | 12.40.0 | 12.40.0 | ❌ | ❌ |
| lenis | 1.3.23 | 1.3.23 | 1.3.21 | 1.3.25 |

### Anti-Repeat Rules
1. One physics engine per project
2. One WebGL signature per project
3. One split-text approach per project (differentiate implementation)
4. One cursor effect per project
5. One scroll-reveal library per project
6. Color system per project (never share palette tokens)
7. Typography per project (never share font choices)

### Cutting-Edge Techniques (by tier)

**TIER 1 — High Impact, Medium Effort (use NOW)**
- GSAP Physics2D Plugin — Particle bursts on CTA clicks
- OKLCH Color System — Perceptually uniform gradients
- CSS Scroll-Driven Animations — Native browser API, no JS
- View Transitions API — SPA-like page transitions
- react-spring + @use-gesture — True spring physics

**TIER 2 — Very High Impact, Higher Effort (signature moments)**
- Flowmap Mouse-Trail Distortion — Cursor ripples like water
- Matter.js Rigid-Body Physics — Real gravity, collision
- Liquid Glass Refraction — Fragment shader light bending
- Three.js Post-Processing — Bloom, chromatic aberration, film grain
- Variable Font Animations — Animate weight/width on scroll

**TIER 3 — Subtle Polish (differentiation layer)**
- CSS color-mix() — Dynamic tinting
- Anchor Positioning — No coordinate math
- Exclusive Accordion — `<details name="faq">`
- Offscreen Canvas — WebGL in web worker
- Relative Color Syntax — Derive variants from base

---

## PART 2: AWWWARDS REFERENCE SITES

### Hero Sections
| Site | Technique | Inspires |
|------|-----------|----------|
| Apple | Scroll-triggered product reveals + parallax depth | All |
| Stripe | Gradient mesh animation with color shifting | MAAC, ShipBridge |
| Linear | Keyboard-first UI, command palette | ShipBridge |
| Oryzo | WebGL + WebGPU hybrid with fluid sim | ShipBridge |

### Scroll Narratives
| Site | Technique | Inspires |
|------|-----------|----------|
| Apple iPhone | Scroll-triggered feature reveals + sticky sections | All |
| Tesla | Full-screen sections with scroll-snap, parallax | ShipBridge, MAAC |
| Nothing | Scroll-driven animations with CSS `animation-timeline` | Khemji, Silbar |
| Ilya Kostin | Custom cursor + scroll-driven 3D transforms | ShipBridge, MAAC |
| Studio Freight | Glitch effects + scroll distortion + custom cursor | Khemji |
| Build Studio | Scroll-driven typography animation + kinetic text | MAAC, Khemji |

### 3D / WebGL
| Site | Technique | Inspires |
|------|-----------|----------|
| IVRESS | WebGPU with WebGL fallback | ShipBridge |
| Cartier | 3D product visualization with realistic materials | MAAC |
| Hubtown | 3D architectural visualization, scroll-driven camera | ShipBridge |
| Sleep Well Creative | WebGL particles + custom cursor + scroll effects | ShipBridge, MAAC |
| Primland | 3D terrain with scroll-driven camera path | ShipBridge |
| Bruno Simon | Interactive 3D portfolio with physics | ShipBridge |

### Typography-Driven
| Site | Technique | Inspires |
|------|-----------|----------|
| Kinetic Typography | Variable font animation, scroll-driven weight | MAAC |
| Ohnotype | Typography as layout, text as image | MAAC, Khemji |
| DINAMO | Variable font playground, real-time adjustments | MAAC |

### Anti-Template
| Site | Technique | Inspires |
|------|-----------|----------|
| Memes, Guns & Sunshine | Deliberately ugly, unforgettable | Khemji |
| Candy Tech | Playful interactions, non-standard layout | Khemji |
| Yone Nezu | Minimal but unique interaction per section | Silbar |

### How to Study a Site
1. Open in Chrome, open DevTools (F12)
2. Check Performance tab — see what's animating
3. Check Elements tab — see CSS properties
4. Scroll slowly — study how animations trigger
5. Resize window — study responsive behavior
6. Test on mobile — study touch interactions
7. Note timing functions, color values

---

## PART 3: GITHUB REPOSITORIES

### Animation
| Repo | Stars | Use |
|------|-------|-----|
| greensock/GSAP | 18k+ | Timeline animation, ScrollTrigger |
| framer/motion | 23k+ | React animations (forbidden in most projects) |
| pmndrs/react-spring | 28k+ | Spring physics animations |
| juliangarnier/anime | 48k+ | Lightweight SVG animation |

### 3D / WebGL
| Repo | Stars | Use |
|------|-------|-----|
| mrdoob/three.js | 104k+ | 3D rendering |
| pmndrs/react-three-fiber | 26k+ | React + Three.js |
| pmndrs/drei | 13k+ | R3F helpers |
| pmndrs/react-postprocessing | 5k+ | Post-processing effects |
| oframe/ogl | 6k+ | Minimal WebGL |

### Physics
| Repo | Stars | Use |
|------|-------|-----|
| liabru/matter-js | 17k+ | 2D physics |
| pmndrs/cannon-es | 2k+ | 3D physics |

### Scroll & Navigation
| Repo | Stars | Use |
|------|-------|-----|
| darkroomengineering/lenis | 5k+ | Smooth scrolling |
| locomotivemtl/locomotive-scroll | 7k+ | Smooth scroll + parallax |

### Text & Typography
| Repo | Stars | Use |
|------|-------|-----|
| nicolnworly/Splitting | 9k+ | Split text |
| mattboldt/typed.js | 12k+ | Typewriter effect |

### Audio
| Repo | Stars | Use |
|------|-------|-----|
| goldfire/howler.js | 24k+ | Audio playback |
| Tonejs/Tone.js | 13k+ | Audio synthesis |

### Dependency Decision Tree
```
Need animation? → Simple: CSS | Scroll-driven: CSS animation-timeline | Complex: GSAP | React layout: React Spring | Physics: Matter.js / Cannon-es
Need 3D? → Simple: Three.js | React: R3F + drei | Complex: R3F + postprocessing | Performance: WebGPU
Need audio? → Simple: Howler.js | Analysis: Web Audio API | Complex: Tone.js
```

---

## PART 4: YOUTUBE LEARNING MAP

### Beginner Channels
| Channel | Focus | Watch When |
|---------|-------|------------|
| JavaScript Mastery | Full-stack, React, Next.js | Starting a project |
| Traversy Media | HTML/CSS/JS basics | Refreshing fundamentals |
| The Net Ninja | Step-by-step tutorials | Learning a new framework |

### Intermediate Channels
| Channel | Focus | Watch When |
|---------|-------|------------|
| Fireship | Quick tutorials, tech news | Learning fast (5-10 min) |
| Kevin Powell | CSS deep dives, responsive | CSS expertise needed |
| Codegrid | Creative coding, CSS animations, GSAP | Creative techniques |
| Web Dev Simplified | JS concepts, React patterns | Understanding WHY |

### Advanced Channels
| Channel | Focus | Watch When |
|---------|-------|------------|
| Fullstack Empire | R3F, Three.js, creative coding | Building 3D projects |
| Wawasensei | Three.js, WebGL, shaders | Three.js projects |
| Bandinopla | Generative art, p5.js | Generative techniques |

### Technique-Specific Tutorials
| Technique | Channel | Time |
|-----------|---------|------|
| GSAP ScrollTrigger | Codegrid | 15-20 min |
| React Three Fiber | Fullstack Empire | 20-30 min |
| Custom Cursor | Codegrid | 10-15 min |
| WebGL Shaders | Wawasensei | 20-30 min |
| Variable Fonts | Kevin Powell | 10-15 min |
| OKLCH Colors | Kevin Powell | 10-15 min |

### Recommended Learning Path
1. **Week 1 — CSS Foundation:** Kevin Powell (CSS Grid), Kevin Geary (scroll-driven), Codegrid (CSS animations)
2. **Week 2 — JS Animation:** JavaScript Mastery (GSAP), Codegrid (ScrollTrigger, cursor)
3. **Week 3 — 3D & WebGL:** Fullstack Empire (R3F), Wawasensei (Three.js, shaders)
4. **Week 4 — Advanced:** Bandinopla (generative art), Fireship (Web Audio API), Codegrid (text animations)

**Total: ~4 hours for foundational knowledge. Watch at 1.5x speed. Time box: 10-15 min per tutorial.**
