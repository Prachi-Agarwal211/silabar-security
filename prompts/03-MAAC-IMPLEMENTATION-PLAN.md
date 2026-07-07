# MAAC-ANIMATION: COMPREHENSIVE IMPLEMENTATION PLAN

## From Research to Revolution — Every Detail Explained

### Purpose
This document exists so that when our AI reads it, it understands exactly what to build, why to build it, and how to build it. This is not a vague plan — this is a precise engineering document that leaves no room for templates, no room for generic patterns, and no room for "good enough."

---

## THE CORE PRINCIPLE

**We are building an animation school website. The website itself must feel like an animation.** Not a static document with animations added on top. The entire experience — from the moment the page loads to the moment the user leaves — must feel like a film, a showreel, a living piece of art.

**The Anti-Template Manifesto:**
- We do not use CSS defaults for animation timing
- We do not use standard easing curves
- We do not use uniform spacing
- We do not use predictable layouts
- We do not use generic color palettes
- We do not use static backgrounds
- We do not use the same cursor everywhere
- We do not use linear animations
- We do not use templates

---

## PHASE 1: Foundation — The Motion Design System (Week 1-2)

### 1.1 Build the Custom Easing Library

**Why:** Every template uses CSS defaults (`ease`, `ease-in`, `ease-out`, `ease-in-out`). These are generic and feel robotic. Custom easings encode your specific taste into math. When someone uses your easing curve, they're using your feeling.

**Create `src/lib/motion/easings.ts`:**

```typescript
/**
 * MAAC Motion Design System — Custom Easing Library
 * 
 * These curves are the DNA of MAAC's motion language.
 * They are not CSS defaults. They are not GSAP defaults.
 * They are MAAC's signature.
 */

export const maacEasings = {
  // Premium smooth — fast start, smooth deceleration
  // Inspired by Stripe's UI transitions
  // Use for: Most UI transitions, page loads, card reveals
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  
  // Playful overshoot — bounces past target, then settles
  // Use for: Buttons, playful interactions, attention-grabbing elements
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  
  // Energetic bounce — undershoots, then overshoots, then settles
  // Use for: Landing effects, hero entrances, dramatic reveals
  bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  
  // Snappy response — almost instant start, smooth end
  // Use for: UI feedback, hover states, micro-interactions
  snappy: 'cubic-bezier(0.2, 0, 0, 1)',
  
  // Organic natural — slow start, slow end, smooth middle
  // Use for: Natural, breathing animations, ambient motion
  organic: 'cubic-bezier(0.45, 0, 0.15, 1)',
  
  // Cinematic reveal — starts fast, holds, then releases
  // Use for: Hero text reveals, dramatic entrances, film-like transitions
  cinematic: 'cubic-bezier(0.77, 0, 0.175, 1)',
  
  // Fluid motion — gentle start, smooth finish
  // Use for: Scroll-linked animations, parallax effects
  fluid: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

/**
 * GSAP Easing Mappings
 * These map our custom easings to GSAP's easing syntax
 */
export const gsapEasings = {
  smooth: 'expo.out',
  spring: 'back.out(1.7)',
  bounce: 'elastic.out(1, 0.5)',
  snappy: 'power4.out',
  organic: 'sine.inOut',
  cinematic: 'expo.inOut',
  fluid: 'power2.inOut',
};

/**
 * Motion Presets
 * Complete animation configurations for each component type
 */
export const motionPresets = {
  // Hero entrance — dramatic, cinematic
  heroEntrance: {
    y: '110%',
    opacity: 0,
    ease: gsapEasings.cinematic,
    duration: 1.2,
    stagger: 0.08,
  },
  
  // Card reveal — subtle, premium
  cardReveal: {
    y: 50,
    opacity: 0,
    scale: 0.95,
    ease: gsapEasings.smooth,
    duration: 0.8,
    stagger: 0.1,
  },
  
  // Text reveal — letter-by-letter, organic
  textReveal: {
    yPercent: 100,
    rotateX: -90,
    opacity: 0,
    ease: gsapEasings.spring,
    duration: 1,
    stagger: 0.05,
  },
  
  // Magnetic interaction — physics-based
  magnetic: {
    ease: gsapEasings.spring,
    duration: 0.4,
    returnDuration: 0.7,
    returnEase: 'elastic.out(1, 0.3)',
  },
  
  // Scroll-linked — fluid, responsive
  scrollLinked: {
    ease: 'none',
    scrub: 0.5,
  },
};
```

**Why this matters:** This is your fingerprint. No other website has these exact curves. When someone sees an animation that uses `cubic-bezier(0.77, 0, 0.175, 1)` for a hero reveal, they're seeing MAAC's specific taste encoded in math.

---

### 1.2 Build the Spring Physics System

**Why:** CSS transitions are linear. They cannot simulate real physical objects with mass, stiffness, and friction. Spring physics creates organic, living motion that feels like real objects.

**Create `src/lib/motion/spring.ts`:**

```typescript
/**
 * MAAC Spring Physics System
 * 
 * Implements a mass-spring-damper system for organic motion.
 * This is NOT a CSS transition. This is real physics.
 */

interface SpringConfig {
  stiffness: number;  // How strong the spring is (default: 0.1)
  damping: number;    // How much friction (default: 0.8)
  mass: number;       // How heavy the object is (default: 1)
  precision: number;  // When to stop (default: 0.01)
}

interface SpringState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const defaultConfig: SpringConfig = {
  stiffness: 0.1,
  damping: 0.8,
  mass: 1,
  precision: 0.01,
};

/**
 * Create a spring animation between two points
 */
export function createSpring(
  element: HTMLElement,
  targetX: number,
  targetY: number,
  config: Partial<SpringConfig> = {}
): () => void {
  const { stiffness, damping, mass, precision } = { ...defaultConfig, ...config };
  
  let state: SpringState = { x: 0, y: 0, vx: 0, vy: 0 };
  let animating = true;
  
  function step() {
    if (!animating) return;
    
    // Hooke's Law: F = -k * x
    const fx = -stiffness * (state.x - targetX);
    const fy = -stiffness * (state.y - targetY);
    
    // Damping: F = -d * v
    const dvx = -damping * state.vx;
    const dvy = -damping * state.vy;
    
    // Newton: a = F / m
    const ax = (fx + dvx) / mass;
    const ay = (fy + dvy) / mass;
    
    // Update velocity
    state.vx += ax;
    state.vy += ay;
    
    // Update position
    state.x += state.vx;
    state.y += state.vy;
    
    // Apply to element
    element.style.transform = `translate(${state.x}px, ${state.y}px)`;
    
    // Check if settled
    if (
      Math.abs(state.vx) < precision &&
      Math.abs(state.vy) < precision &&
      Math.abs(state.x - targetX) < precision &&
      Math.abs(state.y - targetY) < precision
    ) {
      element.style.transform = `translate(${targetX}px, ${targetY}px)`;
      animating = false;
      return;
    }
    
    requestAnimationFrame(step);
  }
  
  requestAnimationFrame(step);
  
  // Return cancel function
  return () => {
    animating = false;
  };
}

/**
 * Pre-configured spring presets
 */
export const springPresets = {
  // Snappy — quick response, minimal bounce
  snappy: { stiffness: 0.2, damping: 0.9, mass: 1 },
  
  // Bouncy — playful, energetic
  bouncy: { stiffness: 0.15, damping: 0.6, mass: 1 },
  
  // Gentle — slow, smooth, organic
  gentle: { stiffness: 0.05, damping: 0.9, mass: 1 },
  
  // Heavy — feels weighted, sluggish
  heavy: { stiffness: 0.08, damping: 0.7, mass: 3 },
  
  // Magnetic — for cursor-following effects
  magnetic: { stiffness: 0.15, damping: 0.65, mass: 0.5 },
};
```

---

### 1.3 Build the Seeded Random System

**Why:** `Math.random()` gives different results every time. For generative art, we need reproducible randomness — same seed = same pattern. This allows us to create backgrounds that look random but are deterministic.

**Create `src/lib/motion/random.ts`:**

```typescript
/**
 * MAAC Seeded Random Number Generator
 * 
 * Creates reproducible "random" sequences.
 * Same seed = same sequence every time.
 */

export function seededRandom(seed: number): () => number {
  let s = seed;
  
  return () => {
    // Linear congruential generator
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Generate a random offset within a range
 */
export function randomOffset(
  rng: () => number,
  min: number,
  max: number
): number {
  return min + rng() * (max - min);
}

/**
 * Generate a random color from a palette
 */
export function randomColor(
  rng: () => number,
  palette: string[]
): string {
  return palette[Math.floor(rng() * palette.length)];
}

/**
 * Generate a random delay for stagger effects
 * Creates organic, hand-animated feel
 */
export function randomDelay(
  rng: () => number,
  base: number = 0.05,
  variance: number = 0.02
): number {
  return base + randomOffset(rng, -variance, variance);
}
```

---

## PHASE 2: Enhanced Components (Week 3-4)

### 2.1 Enhanced MagneticButton → PhysicsButton

**Current state:** Simple translate on hover, elastic snapback on leave.

**Enhanced version:** Non-uniform scale on hover (warp effect), subtle glow trail, physics-based spring return.

```tsx
'use client';

import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

interface PhysicsButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  warp?: boolean;
  glow?: boolean;
}

export default function PhysicsButton({
  children,
  className = '',
  strength = 0.35,
  warp = true,
  glow = true,
}: PhysicsButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = wrapper.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const x = (clientX - centerX) * strength;
      const y = (clientY - centerY) * strength;
      
      // Warp effect — non-uniform scale based on cursor position
      const warpX = warp ? 1 + Math.abs(x) * 0.002 : 1;
      const warpY = warp ? 1 + Math.abs(y) * 0.002 : 1;
      
      // Glow effect — intensity based on distance
      const glowIntensity = glow ? Math.min(1, Math.sqrt(x * x + y * y) * 0.02) : 0;
      const glowColor = `rgba(191, 149, 63, ${glowIntensity * 0.3})`;
      
      gsap.to(wrapper, {
        x,
        y,
        scaleX: warpX,
        scaleY: warpY,
        boxShadow: glow ? `0 0 ${glowIntensity * 30}px ${glowColor}` : 'none',
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(wrapper, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        boxShadow: '0 0 0px rgba(191, 149, 63, 0)',
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
    };
  }, { dependencies: [strength, warp, glow] });

  return (
    <div ref={wrapperRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
```

**Why this is different from templates:**
- Templates use CSS `transform` with fixed values
- We use physics-based spring return
- We add warp effect (non-uniform scale)
- We add glow trail that follows cursor
- Only on primary CTAs (scarcity = special)

---

### 2.2 Enhanced RevealHeading → ContextAwareHeading

**Current state:** Same word-by-word clip reveal everywhere.

**Enhanced version:** Different animation per context (hero, section, subtitle, accent).

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

interface ContextAwareHeadingProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  variant?: 'hero' | 'section' | 'subtitle' | 'accent';
  delay?: number;
}

const variants = {
  hero: {
    // Characters fly in from bottom with slight rotation
    from: { y: '110%', rotateZ: 5, opacity: 0 },
    to: { y: '0%', rotateZ: 0, opacity: 1 },
    ease: 'back.out(1.2)',
    stagger: 0.08,
    duration: 1,
  },
  section: {
    // Words slide in from sides, alternating direction
    from: (i: number) => ({ 
      x: i % 2 === 0 ? '-100%' : '100%', 
      opacity: 0 
    }),
    to: { x: '0%', opacity: 1 },
    ease: 'expo.out',
    stagger: 0.05,
    duration: 0.8,
  },
  subtitle: {
    // Letters type in with cursor-like effect
    from: { opacity: 0, y: 5 },
    to: { opacity: 1, y: 0 },
    ease: 'power2.out',
    stagger: 0.03,
    duration: 0.5,
    charByChar: true,
  },
  accent: {
    // Words scale up from center with bounce
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    ease: 'back.out(1.7)',
    stagger: 0.1,
    duration: 0.8,
  },
};

export default function ContextAwareHeading({
  children,
  className = '',
  as: Tag = 'h2',
  variant = 'section',
  delay = 0,
}: ContextAwareHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const config = variants[variant];

  useGSAP(() => {
    if (!containerRef.current) return;

    if (variant === 'subtitle' && config.charByChar) {
      // Character-by-character reveal
      const chars = containerRef.current.querySelectorAll('.char');
      gsap.fromTo(chars,
        config.from,
        {
          ...config.to,
          duration: config.duration,
          stagger: config.stagger,
          delay,
          ease: config.ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    } else {
      // Word-by-word reveal
      const words = containerRef.current.querySelectorAll('.word-inner');
      gsap.fromTo(words,
        typeof config.from === 'function' ? 
          words.forEach((_, i) => config.from(i)) : 
          config.from,
        {
          ...config.to,
          duration: config.duration,
          stagger: config.stagger,
          delay,
          ease: config.ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, { dependencies: [children, delay, variant], scope: containerRef });

  // Render based on variant
  if (variant === 'subtitle') {
    return (
      <Tag ref={containerRef} className={`${className}`}>
        {children.split('').map((char, i) => (
          <span key={i} className="char inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={containerRef} className={`${className} flex flex-wrap gap-x-[0.3em]`}>
      {children.split(' ').map((word, i) => (
        <span key={i} className="word-wrapper inline-block overflow-hidden py-1">
          <span className="word-inner inline-block will-change-transform origin-left">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
```

---

### 2.3 Enhanced SplitTextReveal → OrganicSplitText

**Current state:** Uniform stagger (0.015s between each character).

**Enhanced version:** Random delays (±20-40ms per character) for hand-animated feel.

```tsx
'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

interface OrganicSplitTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  baseStagger?: number;
  variance?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function OrganicSplitText({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  baseStagger = 0.015,
  variance = 0.02,
  as: Tag = 'span',
}: OrganicSplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 10, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          },
        }
      );
      return;
    }

    const chars = containerRef.current.querySelectorAll('.char');
    if (!chars.length) return;

    // Generate random delays for each character
    const randomDelays = Array.from({ length: chars.length }, () => {
      return (Math.random() - 0.5) * variance * 2;
    });

    gsap.fromTo(chars,
      {
        yPercent: 100,
        rotateX: -90,
        opacity: 0,
      },
      {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration,
        stagger: (i) => baseStagger + randomDelays[i],
        delay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { dependencies: [delay, duration, baseStagger, variance], scope: containerRef });

  const renderContent = () => {
    if (typeof children !== 'string') return children;

    return children.split(' ').map((word, i) => (
      <span key={i} className="inline-block whitespace-nowrap overflow-hidden align-bottom mr-[0.2em] last:mr-0">
        {word.split('').map((char, j) => (
          <span key={j} className="char inline-block origin-bottom">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  const Component = Tag as React.ElementType;

  return (
    <Component ref={containerRef} className={`${className} inline-block perspective-1000`}>
      {renderContent()}
    </Component>
  );
}
```

**Why this is different:**
- Templates use uniform stagger (machine-like)
- We use random variance (hand-animated feel)
- The ±20-40ms variance creates organic, human timing
- Each character has its own unique delay

---

### 2.4 Enhanced LiquidReveal → SectionalLiquidReveal

**Current state:** Simple circle(0%) → circle(100%).

**Enhanced version:** Different shapes per section.

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

interface SectionalLiquidRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'circle' | 'ellipse' | 'blob' | 'wave';
}

const clipPaths = {
  circle: {
    from: 'circle(0% at 50% 50%)',
    to: 'circle(100% at 50% 50%)',
  },
  ellipse: {
    from: 'ellipse(0% 0% at 50% 50%)',
    to: 'ellipse(120% 120% at 50% 50%)',
  },
  blob: {
    from: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
    to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)',
  },
  wave: {
    from: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
};

export default function SectionalLiquidReveal({
  children,
  className = '',
  variant = 'circle',
}: SectionalLiquidRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const paths = clipPaths[variant];

  useGSAP(() => {
    if (!containerRef.current || !innerRef.current) return;

    gsap.fromTo(innerRef.current,
      { clipPath: paths.from },
      {
        clipPath: paths.to,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`${className} relative overflow-hidden`}>
      <div ref={innerRef} className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}
```

---

### 2.5 Enhanced CountUpStat → SpringCountUp

**Current state:** Linear count-up with power4.out easing.

**Enhanced version:** Overshoot then settle with spring effect.

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

interface SpringCountUpProps {
  number: number;
  suffix: string;
  label: string;
}

export default function SpringCountUp({ number, suffix, label }: SpringCountUpProps) {
  const countRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!countRef.current || !numberRef.current) return;

    const obj = { value: 0 };
    
    // Main count-up animation
    gsap.to(obj, {
      value: number,
      duration: 2.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: countRef.current,
        start: 'top 90%',
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.round(obj.value).toString();
        }
      },
      onComplete: () => {
        // Spring overshoot at the end
        gsap.fromTo(numberRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
          }
        );
      },
    });
  }, { scope: countRef });

  return (
    <div ref={countRef} className="text-center px-4 group">
      <div className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] text-white tabular-nums flex items-center justify-center font-bold uppercase leading-[1.1] tracking-[0.1em]">
        <span ref={numberRef}>0</span>
        <span className="metallic-gold-text ml-1">{suffix}</span>
      </div>
      <div className="text-[#A8A29C] text-[9px] mt-3 font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-white">
        {label}
      </div>
    </div>
  );
}
```

---

## PHASE 3: Unique Details (Week 5-6)

### 3.1 Custom Cursor System

**Why:** Templates use the default cursor everywhere. A custom cursor that changes shape based on context makes the site feel alive and intentional.

**Implementation approach:**
- Track current section via `data-cursor` attributes on sections
- Read `data-cursor` in CustomCursor component
- Change cursor shape based on context
- Add smooth transition between shapes

### 3.2 Background Texture/Grain

**Why:** Templates use flat backgrounds. Film grain adds warmth, texture, and human feel.

**Implementation:**
```css
.noise-bg::before {
  content: '';
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url("data:image/svg+xml,...");
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: overlay;
  opacity: 0.03;
}
```

### 3.3 BentoGallery Asymmetry

**Why:** Templates use uniform cards. Asymmetry creates visual interest and feels designed.

**Implementation:**
- Varied aspect ratios per card
- Different border-radius per card
- Physics-inspired stagger on scroll
- Random entry order

### 3.4 Scroll-Driven Narrative

**Why:** Templates show static sections. We create a film — chapters that unfold as you scroll.

**Implementation:**
- Scroll-linked state machine
- Background gradient shifts with scroll
- Typography scale changes
- Elements pin and animate in place

---

## PHASE 4: Polish & Test (Week 7-8)

### 4.1 Performance Optimization

- Test on mid-range mobile devices
- Throttle animations if performance drops
- Use `will-change` sparingly
- Prefer `transform` and `opacity`
- Lazy load heavy Three.js scenes

### 4.2 Accessibility

- Respect `prefers-reduced-motion`
- All interactive elements keyboard-navigable
- Focus states visible
- Screen reader compatible

### 4.3 Quality Assurance

- Scroll through entire site on desktop
- Scroll through entire site on mobile
- Test with slow network
- Test with reduced motion
- Get feedback from animators/students
- Ask: "Does this feel like a school of animation, or just a cool website?"

---

## THE FORMULA

```
MAAC SITE = 
  Custom Easings (YOUR feel)
  + Spring Physics (organic motion)
  + Procedural Generation (unique every time)
  + Scroll Narrative (film, not document)
  + Intentional Imperfection (human, not robotic)
  + Film Grain (texture, warmth)
  + Custom Cursor (shape per section)
  + Velocity Reactions (alive, responsive)
  + SSR Architecture (server-side rendering)
  + Context-Aware Animations (different per section)
  = IMPOSSIBLE TO REPLICATE
  = CANNOT BE DEFEATED BY WIX/FIGMA/WORDPRESS/AI
```

---

## WHAT MAKES THIS DIFFERENT

| Templates | MAAC |
|-----------|------|
| CSS default easings | Custom easing library |
| Linear animations | Spring physics |
| Same cursor everywhere | Shape changes per section |
| Flat backgrounds | Procedural noise + grain |
| Static sections | Scroll-driven narrative |
| Uniform spacing | Mathematical rhythm |
| Predictable layouts | Intentional asymmetry |
| Generic colors | Brand-specific palette |
| Identical every visit | Unique every session |
| Machine timing | Hand-animated feel |

---

## GITHUB RESOURCES

| Repository | Stars | Use For |
|-----------|-------|---------|
| greensock/gsap | 18k+ | Animation orchestration |
| pmndrs/react-three-fiber | 26k+ | 3D rendering |
| pmndrs/drei | 13k+ | R3F helpers |
| darkroomengineering/lenis | 9k+ | Smooth scrolling |
| theatre-js/theatre | 12k+ | Animation editor |
| pixijs/pixijs | 41k+ | 2D WebGL |
| Tonejs/Tone.js | 32k+ | Music visualization |
| goldfire/howler.js | 24k+ | Audio management |
| pmndrs/postprocessing | 5k+ | 3D post-effects |
| terkelg/awesome-creative-coding | 20k+ | Master resource list |
