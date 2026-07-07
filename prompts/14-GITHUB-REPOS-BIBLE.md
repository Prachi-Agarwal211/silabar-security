# 14 — GITHUB REPOS BIBLE
## Every Repository to Reference, Organized by Technique

---

## HOW TO USE THIS FILE

Before adding ANY dependency, check this list:
1. Is there a library for this technique?
2. Does the project already have it?
3. Is it the right choice (not just the popular one)?

**Rule: Never add a dependency unless the code to do it yourself is 50+ lines.**

---

## ANIMATION & INTERACTION

### GSAP (GreenSock Animation Platform)
- **Repo:** github.com/greensock/GSAP
- **Stars:** 18k+
- **Use for:** Timeline animations, scroll-triggered effects, morphing, text splitting
- **When to use:** Complex multi-step animations, scroll timelines, morphing SVGs
- **When NOT to use:** Simple hover effects (use CSS), basic fades (use CSS)
- **Projects:** ShipBridge, MAAC (NOT Khemji, NOT Silbar)

### Framer Motion
- **Repo:** github.com/framer/motion
- **Stars:** 23k+
- **Use for:** React animations, layout animations, shared layout, gestures
- **When to use:** React-specific animations, layout transitions
- **When NOT to use:** Projects that forbid it (ShipBridge, MAAC, Silbar)
- **Projects:** NONE (all projects forbid it)

### React Spring
- **Repo:** github.com/pmndrs/react-spring
- **Stars:** 28k+
- **Use for:** Spring physics animations, natural motion
- **When to use:** When you need spring physics (bouncy, natural feel)
- **When NOT to use:** When you need precise timeline control (use GSAP)
- **Projects:** Alternative to Framer Motion where allowed

### Popmotion
- **Repo:** github.com/Popmotion/popmotion
- **Stars:** 8k+
- **Use for:** Animation library, physics-based animations
- **When to use:** When you need a lightweight animation library
- **When NOT to use:** When GSAP covers your needs
- **Projects:** Alternative to GSAP for lighter bundle

### AutoAnimate
- **Repo:** github.com/aholachek/react-automatic-autolayout-animating
- **Stars:** 10k+
- **Use for:** Zero-config animations for lists, transitions
- **When to use:** Quick list animations, layout changes
- **When NOT to use:** When you need precise control
- **Projects:** Quick wins, list animations

---

## 3D / WebGL / WebGPU

### Three.js
- **Repo:** github.com/mrdoob/three.js
- **Stars:** 104k+
- **Use for:** 3D rendering, WebGL, shaders, particles
- **When to use:** Any 3D in the browser
- **When NOT to use:** Khemji (forbidden), Silbar (forbidden)
- **Projects:** ShipBridge, MAAC

### React Three Fiber (R3F)
- **Repo:** github.com/pmndrs/react-three-fiber
- **Stars:** 26k+
- **Use for:** React wrapper for Three.js
- **When to use:** React projects needing 3D
- **When NOT to use:** Non-React projects, Khemji, Silbar
- **Projects:** MAAC (already installed), ShipBridge

### Drei
- **Repo:** github.com/pmndrs/drei
- **Stars:** 13k+
- **Use for:** R3F helpers (OrbitControls, Environment, Text, etc.)
- **When to use:** With R3F for common 3D patterns
- **When NOT to use:** Without R3F
- **Projects:** MAAC (already installed), ShipBridge

### React Three Postprocessing
- **Repo:** github.com/pmndrs/react-postprocessing
- **Stars:** 5k+
- **Use for:** Post-processing effects (bloom, blur, noise)
- **When to use:** With R3F for cinematic effects
- **When NOT to use:** Without R3F
- **Projects:** MAAC, ShipBridge

### Three.js Shader Material
- **Repo:** github.com/mrdoob/three.js (examples/jsm/materials/ShaderMaterial)
- **Use for:** Custom GLSL shaders
- **When to use:** When you need custom visual effects
- **When NOT to use:** When standard materials work
- **Projects:** ShipBridge, MAAC

### PlayCanvas
- **Repo:** github.com/playcanvas/engine
- **Stars:** 9k+
- **Use for:** Game engine with WebGL
- **When to use:** When you need a full game engine
- **When NOT to use:** For simple 3D (use Three.js)
- **Projects:** ShipBridge (if game-like interaction needed)

---

## PHYSICS & SIMULATION

### Matter.js
- **Repo:** github.com/liabru/matter-js
- **Stars:** 17k+
- **Use for:** 2D physics engine (gravity, collisions, constraints)
- **When to use:** Interactive physics elements, drag-and-drop
- **When NOT to use:** When you only need animation (use GSAP)
- **Projects:** ShipBridge (interactive physics)

### Cannon.js / Cannon-es
- **Repo:** github.com/pmndrs/cannon-es
- **Stars:** 2k+
- **Use for:** 3D physics engine
- **When to use:** With R3F for 3D physics
- **When NOT to use:** When you only need 3D rendering
- **Projects:** MAAC, ShipBridge (3D physics)

### Rapier
- **Repo:** github.com/dimforge/rapier
- **Stars:** 4k+
- **Use for:** Rust-based physics (WASM)
- **When to use:** When you need high-performance physics
- **When NOT to use:** When Cannon.js is enough
- **Projects:** ShipBridge (if performance critical)

### Particle System
- **Repo:** github.com/squarefeet/ShaderParticleEngine
- **Stars:** 1.5k+
- **Use for:** GPU particle systems
- **When to use:** Large-scale particle effects (10K+)
- **When NOT to use:** Small particle counts (use R3F)
- **Projects:** ShipBridge, MAAC

---

## SCROLL & NAVIGATION

### Locomotive Scroll
- **Repo:** github.com/locomotivemtl/locomotive-scroll
- **Stars:** 7k+
- **Use for:** Smooth scrolling, parallax, scroll-triggered animations
- **When to use:** When you need smooth scroll + parallax
- **When NOT to use:** When CSS scroll-driven animations work (2026)
- **Projects:** Consider CSS scroll-driven first, fallback to this

### Lenis
- **Repo:** github.com/darkroomengineering/lenis
- **Stars:** 5k+
- **Use for:** Lightweight smooth scrolling
- **When to use:** When you need smooth scroll without parallax
- **When NOT to use:** When CSS scroll behavior works
- **Projects:** Alternative to Locomotive Scroll

### GSAP ScrollTrigger
- **Repo:** Part of GSAP (greensock/GSAP)
- **Use for:** Scroll-triggered animations, pinning, scrub
- **When to use:** Complex scroll interactions
- **When NOT to use:** Simple scroll reveals (use CSS)
- **Projects:** ShipBridge, MAAC

### Intersection Observer
- **Repo:** Native browser API (no library needed)
- **Use for:** Scroll-triggered animations, lazy loading
- **When to use:** Simple scroll triggers
- **When NOT to use:** Complex scroll timelines (use GSAP)
- **Projects:** All (native, no dependency)

---

## TYPOGRAPHY & TEXT

### Splitting.js
- **Repo:** github.com/nicolnworly/Splitting
- **Stars:** 9k+
- **Use for:** Split text into chars/words/lines for animation
- **When to use:** When you need to animate individual characters
- **When NOT to use:** When CSS text animation works
- **Projects:** MAAC, Khemji

### Typed.js
- **Repo:** github.com/mattboldt/typed.js
- **Stars:** 12k+
- **Use for:** Typewriter effect
- **When to use:** When you need typewriter animation
- **When NOT to use:** When CSS animation works
- **Projects:** Khemji (typewriter effect)

### Rough.js
- **Repo:** github.com/rough-stuff/rough
- **Stars:** 9k+
- **Use for:** Hand-drawn, sketchy graphics
- **When to use:** When you need a hand-drawn aesthetic
- **When NOT to use:** When clean design works
- **Projects:** Khemji (if playful aesthetic)

---

## COLOR & VISUAL

### Chroma.js
- **Repo:** github.com/gka/chroma.js
- **Stars:** 9k+
- **Use for:** Color manipulation, scales, blending
- **When to use:** When you need programmatic color control
- **When NOT to use:** When CSS color functions work
- **Projects:** All (if complex color logic needed)

### Color.js
- **Repo:** github.com/LeaVerou/color.js
- **Stars:** 2k+
- **Use for:** Advanced color manipulation, OKLCH support
- **When to use:** When you need OKLCH color space
- **When NOT to use:** When CSS oklch() works
- **Projects:** All (for OKLCH color logic)

### Granim.js
- **Repo:** github.com/sirxemic/jquery.granim
- **Stars:** 3k+
- **Use for:** Animated gradient backgrounds
- **When to use:** When you need animated gradients
- **When NOT to use:** When CSS gradient animations work
- **Projects:** Consider CSS first, fallback to this

---

## CURSOR & POINTER

### Custom Cursor
- **Repo:** github.com/nicgirault/circulus (example)
- **Use for:** Custom cursor shapes
- **When to use:** When you need cursor to change per section
- **When NOT to use:** When default cursor works
- **Projects:** ShipBridge, MAAC

### Pointer Lock
- **Repo:** Native browser API (no library needed)
- **Use for:** Custom cursor with pointer lock
- **When to use:** For game-like cursor control
- **When NOT to use:** For normal websites
- **Projects:** ShipBridge (if game-like interaction)

---

## AUDIO & SOUND

### Howler.js
- **Repo:** github.com/goldfire/howler.js
- **Stars:** 24k+
- **Use for:** Audio playback, sound effects
- **When to use:** When you need sound design
- **When NOT to use:** When video has audio
- **Projects:** Khemji (sound design)

### Tone.js
- **Repo:** github.com/Tonejs/Tone.js
- **Stars:** 13k+
- **Use for:** Web Audio API framework, music synthesis
- **When to use:** When you need complex audio
- **When NOT to use:** When simple audio works (use Howler)
- **Projects:** ShipBridge (audio-reactive visuals)

### Web Audio API
- **Repo:** Native browser API (no library needed)
- **Use for:** Audio analysis, frequency data
- **When to use:** For audio-reactive visuals
- **When NOT to use:** When you don't need audio analysis
- **Projects:** ShipBridge (audio-reactive)

---

## PERFORMANCE & OPTIMIZATION

### Partytown
- **Repo:** github.com/QwikDev/partytown
- **Stars:** 12k+
- **Use for:** Run third-party scripts in Web Worker
- **When to use:** When you have heavy third-party scripts
- **When NOT to use:** When you don't have third-party scripts
- **Projects:** All (if third-party scripts needed)

### Image Optimization
- **Repo:** Next.js built-in (next/image)
- **Use for:** Image optimization, lazy loading, WebP/AVIF
- **When to use:** Always for images
- **When NOT to use:** Never
- **Projects:** All (always use next/image)

### Font Optimization
- **Repo:** Next.js built-in (next/font)
- **Use for:** Font optimization, self-hosting, fallback
- **When to use:** Always for web fonts
- **When NOT to use:** Never
- **Projects:** All (always use next/font)

---

## UI COMPONENTS

### Headless UI
- **Repo:** github.com/tailwindlabs/headlessui
- **Stars:** 24k+
- **Use for:** Accessible UI components (menu, dialog, listbox)
- **When to use:** When you need accessible components
- **When NOT to use:** When you can build simple components
- **Projects:** All (for complex UI components)

### Radix UI
- **Repo:** github.com/radix-ui/primitives
- **Stars:** 16k+
- **Use for:** Accessible UI primitives
- **When to use:** When you need accessible primitives
- **When NOT to use:** When Headless UI covers your needs
- **Projects:** Alternative to Headless UI

### Framer (for components)
- **Repo:** github.com/framer/motion (for layout animations)
- **Use for:** Layout animations, shared layout
- **When NOT to use:** Projects that forbid Framer Motion
- **Projects:** NONE (all projects forbid it)

---

## STATE MANAGEMENT

### Zustand
- **Repo:** github.com/pmndrs/zustand
- **Stars:** 48k+
- **Use for:** Lightweight state management
- **When to use:** When you need simple global state
- **When NOT to use:** When React state works
- **Projects:** MAAC (already installed), ShipBridge

### Jotai
- **Repo:** github.com/pmndrs/jotai
- **Stars:** 17k+
- **Use for:** Atomic state management
- **When to use:** When you need fine-grained reactivity
- **When NOT to use:** When Zustand covers your needs
- **Projects:** Alternative to Zustand

### Recoil
- **Repo:** github.com/facebookexperimental/Recoil
- **Stars:** 19k+
- **Use for:** State management with atoms
- **When NOT to use:** When Zustand is simpler
- **Projects:** Not recommended (use Zustand)

---

## FORMS & VALIDATION

### React Hook Form
- **Repo:** github.com/react-hook-form/react-hook-form
- **Stars:** 41k+
- **Use for:** Form management, validation
- **When to use:** Always for forms
- **When NOT to use:** Never
- **Projects:** All (always use)

### Zod
- **Repo:** github.com/colinhacks/zod
- **Stars:** 34k+
- **Use for:** Schema validation
- **When to use:** Always for validation
- **When NOT to use:** Never
- **Projects:** All (always use)

---

## DATABASE & API

### Prisma
- **Repo:** github.com/prisma/prisma
- **Stars:** 40k+
- **Use for:** Database ORM
- **When to use:** Always for database
- **When NOT to use:** Never
- **Projects:** All (always use)

### tRPC
- **Repo:** github.com/trpc/trpc
- **Stars:** 34k+
- **Use for:** End-to-end typesafe API
- **When to use:** Always for API routes
- **When NOT to use:** Never
- **Projects:** All (always use)

---

## DEPENDENCY DECISION TREE

```
Need animation?
├── Simple hover/fade → CSS (no library)
├── Scroll-driven → CSS animation-timeline (2026)
├── Complex timeline → GSAP
├── React layout → React Spring (not Framer Motion)
└── Physics → Matter.js / Cannon-es

Need 3D?
├── Simple → Three.js directly
├── React → R3F + drei
├── Complex → R3F + postprocessing
└── Performance → WebGPU (if supported)

Need state?
├── Simple → React useState/useReducer
├── Global → Zustand
├── Complex → Jotai
└── Never → Redux (overkill)

Need forms?
├── Always → React Hook Form + Zod
└── Never → Custom form handling

Need audio?
├── Simple playback → Howler.js
├── Audio analysis → Web Audio API
└── Complex synthesis → Tone.js
```

---

## HOW TO USE THIS FILE

Before adding ANY dependency:
1. Check this list
2. Verify the project doesn't already have it
3. Check if CSS/native API can do it
4. Check the dependency decision tree
5. Only then add the dependency

**Adding a dependency = adding maintenance burden. Only add what's necessary.**
