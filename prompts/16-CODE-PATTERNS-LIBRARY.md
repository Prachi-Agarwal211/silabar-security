# 16 — CODE PATTERNS LIBRARY
## Copy-Paste-Ready Patterns for Every Technique

---

## HOW TO USE THIS FILE

Each pattern includes:
1. The code (copy-paste-ready)
2. The technique (what it does)
3. The timing (cubic-bezier, duration)
4. The project constraint (which projects can use it)
5. The anti-generic check (does this pass the test?)

**Rule: Adapt, don't copy. Change colors, timing, and easing to match your project.**

---

## 1. SCROLL-DRIVEN REVEAL (CSS Only)

```tsx
// components/ScrollReveal.tsx
"use client";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const directionStyles = {
    up: "translate-y-[60px]",
    down: "-translate-y-[60px]",
    left: "translate-x-[60px]",
    right: "-translate-x-[60px]",
  };

  return (
    <div
      className={`opacity-0 ${directionStyles[direction]} animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

```css
/* globals.css */
@keyframes reveal {
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
```

**Technique:** Scroll-triggered reveal with direction + delay
**Timing:** cubic-bezier(0.16, 1, 0.3, 1) — snappy deceleration
**Projects:** All (CSS-only, no library)
**Anti-generic check:** ✅ Not a fade-in, has direction + custom easing

---

## 2. SCROLL-DRIVEN ANIMATION (CSS 2026)

```css
/* globals.css */
.scroll-reveal {
  animation: scrollReveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes scrollReveal {
  from {
    opacity: 0;
    transform: translateY(100px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Staggered children */
.scroll-reveal-stagger > * {
  animation: scrollReveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

.scroll-reveal-stagger > *:nth-child(2) { animation-delay: 0.1s; }
.scroll-reveal-stagger > *:nth-child(3) { animation-delay: 0.2s; }
.scroll-reveal-stagger > *:nth-child(4) { animation-delay: 0.3s; }
```

**Technique:** Pure CSS scroll-driven animation (no JS)
**Timing:** linear with view() timeline
**Projects:** Khemji, Silbar (CSS-first approach)
**Anti-generic check:** ✅ Native CSS, no library, performant

---

## 3. CUSTOM CURSOR

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion"; // REPLACE: use CSS if forbidden

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor]")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [x, y]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = "auto"; };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Outer ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] mix-blend-difference transition-all duration-300 ${
          isHovering
            ? "w-16 h-16 border-white bg-white/10"
            : "w-8 h-8 border-white/50"
        }`}
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
```

**Technique:** Custom cursor with hover state changes
**Timing:** Spring physics (damping: 25, stiffness: 200)
**Projects:** ShipBridge, MAAC (NOT Khemji, NOT Silbar)
**Anti-generic check:** ✅ Cursor changes shape on hover, not just default

---

## 4. TEXT SPLIT ANIMATION

```tsx
"use client";
import { useEffect, useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");
    chars.forEach((char, i) => {
      (char as HTMLElement).style.animationDelay = `${delay + i * 0.03}s`;
    });
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block opacity-0 animate-[charReveal_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
```

```css
/* globals.css */
@keyframes charReveal {
  from {
    opacity: 0;
    transform: translateY(100%) rotateX(-80deg);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
    filter: blur(0);
  }
}
```

**Technique:** Character-by-character reveal with 3D rotation
**Timing:** cubic-bezier(0.16, 1, 0.3, 1) — snappy, 30ms stagger
**Projects:** MAAC, Khemji
**Anti-generic check:** ✅ Not a fade-in, has 3D rotation + blur

---

## 5. PARALLAX SCROLL

```tsx
"use client";
import { useEffect, useRef } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = scrolled * speed;
      ref.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

**Technique:** Scroll-driven parallax with configurable speed
**Timing:** Direct scroll mapping (passive listener)
**Projects:** All
**Anti-generic check:** ✅ Configurable speed, not just "move up"

---

## 6. SPRING PHYSICS ANIMATION

```tsx
"use client";
import { useEffect, useRef } from "react";

interface SpringPhysicsProps {
  mass?: number;
  stiffness?: number;
  damping?: number;
  children: React.ReactNode;
}

export function SpringPhysics({
  mass = 1,
  stiffness = 100,
  damping = 10,
  children,
}: SpringPhysicsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    let animationId: number;
    let velocity = 0;
    let position = 0;
    const target = 0;

    const animate = () => {
      const force = -stiffness * (position - target);
      const dampingForce = -damping * velocity;
      const acceleration = (force + dampingForce) / mass;
      velocity += acceleration * 0.016; // ~60fps
      position += velocity * 0.016;
      element.style.transform = `translateY(${position}px)`;
      if (Math.abs(velocity) > 0.01 || Math.abs(position - target) > 0.01) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mass, stiffness, damping]);

  return <div ref={ref}>{children}</div>;
}
```

**Technique:** Spring physics with mass, stiffness, damping
**Timing:** Physics-based (not time-based)
**Projects:** ShipBridge, MAAC
**Anti-generic check:** ✅ Physics-based, not CSS transition

---

## 7. SECTION REVEAL WITH CLIP-PATH

```css
/* globals.css */
.section-reveal {
  animation: sectionReveal 1s cubic-bezier(0.77, 0, 0.175, 1) both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes sectionReveal {
  from {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

/* Circle reveal */
.circle-reveal {
  animation: circleReveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes circleReveal {
  from {
    clip-path: circle(0% at 50% 50%);
  }
  to {
    clip-path: circle(100% at 50% 50%);
  }
}
```

**Technique:** Clip-path reveal (rectangle or circle)
**Timing:** cubic-bezier(0.77, 0, 0.175, 1) — smooth ease-in-out
**Projects:** All (CSS-only)
**Anti-generic check:** ✅ Not a fade-in, has shape-based reveal

---

## 8. GRADIENT TEXT

```css
/* globals.css */
.gradient-text {
  background: linear-gradient(
    135deg,
    oklch(0.7 0.2 250) 0%,
    oklch(0.8 0.15 300) 50%,
    oklch(0.7 0.2 350) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* Animated gradient */
.animated-gradient-text {
  background: linear-gradient(
    90deg,
    oklch(0.7 0.2 250),
    oklch(0.8 0.15 300),
    oklch(0.7 0.2 350),
    oklch(0.7 0.2 250)
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: gradientFlow 4s linear infinite;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}
```

**Technique:** OKLCH gradient text with optional animation
**Timing:** Linear flow for animated version
**Projects:** All (CSS-only, OKLCH)
**Anti-generic check:** ✅ Uses OKLCH (not sRGB), animated version is unique

---

## 9. STICKY SECTION WITH SCROLL PROGRESS

```tsx
"use client";
import { useEffect, useState } from "react";

interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
}

export function StickySection({ children, className = "" }: StickySectionProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionTop = (document.querySelector(".sticky-section") as HTMLElement)?.offsetTop || 0;
      const sectionHeight = (document.querySelector(".sticky-section") as HTMLElement)?.offsetHeight || 0;
      const relativeScroll = scrollY - sectionTop + windowHeight;
      const prog = Math.min(Math.max(relativeScroll / sectionHeight, 0), 1);
      setProgress(prog);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky-section relative ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-10"
          style={{ width: `${progress * 100}%` }}
        />
        {children}
      </div>
    </div>
  );
}
```

**Technique:** Sticky section with scroll progress bar
**Timing:** Direct scroll mapping
**Projects:** All
**Anti-generic check:** ✅ Progress indicator adds interactivity

---

## 10. MOUSE PARALLAX

```tsx
"use client";
import { useEffect, useRef } from "react";

interface MouseParallaxProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export function MouseParallax({
  children,
  intensity = 20,
  className = "",
}: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      ref.current.style.transform = `translate(${deltaX * intensity}px, ${deltaY * intensity}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  return (
    <div ref={ref} className={`transition-transform duration-100 ${className}`}>
      {children}
    </div>
  );
}
```

**Technique:** Mouse-driven parallax with configurable intensity
**Timing:** 100ms transition for smooth follow
**Projects:** All
**Anti-generic check:** ✅ Interactive, not just scroll-based

---

## 11. LOADING SKELETON

```tsx
interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className = "", variant = "text" }: SkeletonProps) {
  const variants = {
    text: "h-4 w-full rounded",
    circular: "h-12 w-12 rounded-full",
    rectangular: "h-48 w-full rounded-lg",
  };

  return (
    <div
      className={`bg-neutral-200 dark:bg-neutral-800 animate-pulse ${variants[variant]} ${className}`}
    />
  );
}
```

**Technique:** Loading skeleton with variants
**Timing:** 1.5s pulse animation
**Projects:** All
**Anti-generic check:** ✅ Shows loading state, not just spinner

---

## 12. SECTION TRANSITION (View Transitions API)

```tsx
"use client";

export function navigateWithTransition(url: string) {
  if (!document.startViewTransition) {
    window.location.href = url;
    return;
  }
  document.startViewTransition(() => {
    window.location.href = url;
  });
}
```

```css
/* globals.css */
::view-transition-old(root) {
  animation: fadeOut 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeOut {
  to { opacity: 0; transform: scale(0.98); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(1.02); }
}
```

**Technique:** Native page transitions with View Transitions API
**Timing:** 0.3s ease-out/in
**Projects:** All (native API, no library)
**Anti-generic check:** ✅ Native API, not just page jump

---

## 13. OKLCH DYNAMIC THEME

```css
/* globals.css */
:root {
  --primary: oklch(0.7 0.2 250);
  --secondary: oklch(0.8 0.15 300);
  --accent: oklch(0.7 0.2 350);
  --neutral: oklch(0.95 0.01 250);
  --text: oklch(0.2 0.01 250);
}

.dark {
  --primary: oklch(0.8 0.2 250);
  --secondary: oklch(0.9 0.15 300);
  --accent: oklch(0.8 0.2 350);
  --neutral: oklch(0.15 0.01 250);
  --text: oklch(0.95 0.01 250);
}

/* Dynamic tinting */
.tint-primary {
  background: color-mix(in oklch, var(--primary) 15%, transparent);
}

.tint-secondary {
  background: color-mix(in oklch, var(--secondary) 15%, transparent);
}
```

**Technique:** OKLCH color system with dynamic tinting
**Timing:** N/A (static CSS)
**Projects:** All
**Anti-generic check:** ✅ Uses OKLCH, not sRGB, with color-mix()

---

## 14. CONTAINER QUERY CARD

```css
/* globals.css */
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: 1rem;
}

@container card (min-width: 400px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}

@container card (min-width: 700px) {
  .card {
    grid-template-columns: 300px 1fr;
  }
}
```

**Technique:** Container queries for component-level responsive
**Timing:** N/A (static CSS)
**Projects:** All
**Anti-generic check:** ✅ Component-responsive, not just viewport-responsive

---

## 15. SCROLL-DRIVEN GRADIENT SHIFT

```css
/* globals.css */
.gradient-section {
  background: linear-gradient(
    180deg,
    oklch(0.95 0.01 250) 0%,
    oklch(0.9 0.05 250) 100%
  );
  animation: gradientShift linear both;
  animation-timeline: scroll();
}

@keyframes gradientShift {
  0% {
    background: linear-gradient(180deg, oklch(0.95 0.01 250) 0%, oklch(0.9 0.05 250) 100%);
  }
  50% {
    background: linear-gradient(180deg, oklch(0.9 0.05 300) 0%, oklch(0.85 0.1 300) 100%);
  }
  100% {
    background: linear-gradient(180deg, oklch(0.85 0.1 350) 0%, oklch(0.8 0.15 350) 100%);
  }
}
```

**Technique:** Scroll-driven gradient color shift
**Timing:** Linear with scroll()
**Projects:** Silbar, Khemji (CSS-first)
**Anti-generic check:** ✅ Color shifts on scroll, not static gradient

---

## 16. ASYMMETRIC GRID

```css
/* globals.css */
.asymmetric-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
}

.asymmetric-grid > *:first-child {
  grid-row: 1 / 3;
}

.asymmetric-grid > *:last-child {
  grid-column: 2;
  grid-row: 1 / 3;
}

/* Mobile: stack */
@media (max-width: 768px) {
  .asymmetric-grid {
    grid-template-columns: 1fr;
  }
  .asymmetric-grid > *:first-child,
  .asymmetric-grid > *:last-child {
    grid-row: auto;
    grid-column: auto;
  }
}
```

**Technique:** Asymmetric 2-column grid (not symmetric 3-column)
**Timing:** N/A (static CSS)
**Projects:** All
**Anti-generic check:** ✅ Not symmetric 3-column, has visual hierarchy

---

## 17. HOVER MAGNET EFFECT

```tsx
"use client";
import { useRef, useState } from "react";

interface MagnetProps {
  children: React.ReactNode;
  intensity?: number;
}

export function Magnet({ children, intensity = 0.3 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-200 ease-out"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  );
}
```

**Technique:** Magnetic hover effect (elements follow cursor)
**Timing:** 200ms ease-out transition
**Projects:** ShipBridge, MAAC
**Anti-generic check:** ✅ Interactive, not just color change

---

## 18. NOISE TEXTURE OVERLAY

```css
/* globals.css */
.noise-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}
```

**Technique:** SVG noise texture overlay
**Timing:** N/A (static CSS)
**Projects:** All
**Anti-generic check:** ✅ Adds texture, not just flat colors

---

## ANTI-GENERIC CHECKLIST FOR EACH PATTERN

Before using ANY pattern, check:

- [ ] Does it use custom easing (not default ease)?
- [ ] Does it have a unique interaction (not just fade-in)?
- [ ] Does it use OKLCH colors (not sRGB)?
- [ ] Does it have a "remember one thing" quality?
- [ ] Could it be built in Figma Sites? (If yes: add more)
- [ ] Does it use CSS-first approach when possible?
- [ ] Is it performant (compositor-thread animations)?
- [ ] Does it have proper mobile fallback?
- [ ] Does it respect prefers-reduced-motion?
- [ ] Is it better than the reference site?

---

## HOW TO USE THIS FILE

When you need a technique:
1. Find the pattern in this file
2. Copy the code
3. Adapt colors, timing, and easing to your project
4. Run the anti-generic checklist
5. Ship it

**These patterns are starting points, not final products.**
