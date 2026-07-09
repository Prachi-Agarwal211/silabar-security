# Next.js SSR Patterns — GSAP in Production

---

## 1. SSR Safety (Core Pattern)

### Problem
`gsap`, `ScrollTrigger`, `SplitText` reference `window`, `document`, `requestAnimationFrame` — all undefined on the server. Next.js pre-renders on the server; unguarded calls crash the build.

### Solution: Dynamic Import + useRef Guard
```tsx
'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ponytail: dynamic import defers GSAP to client-only chunk
    async function init() {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(ref.current?.children, {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        });
      }, ref);

      return () => ctx.revert(); // cleanup
    }

    const cleanup = init();
    return () => { cleanup.then(fn => fn()); };
  }, []);

  return <div ref={ref}>{/* children */}</div>;
}
```

### Alternative: useGSAP Hook
```tsx
import { useGSAP } from '@gsap/react';

// Already handles cleanup + ref scoping
useGSAP(() => {
  gsap.to('.box', { x: 100 });
}, { scope: containerRef });
```
No SSR guard needed — `useGSAP` is a no-op on server (it returns in a `useEffect` equivalent that never runs during SSR).

---

## 2. ScrollTrigger Cleanup on Route Change

### Problem
App Router: leaving a page does NOT unmount `ScrollTrigger` instances. They keep listening to scroll, fire callbacks, throw errors, and leak memory.

### Solution: Kill on Unmount
```tsx
useEffect(() => {
  return () => {
    // Kill ALL ScrollTrigger instances tied to this component
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger?.closest('[data-page]')) st.kill();
    });
    // Or more aggressively:
    // ScrollTrigger.getById('my-id')?.kill();
    // ScrollTrigger.refresh(); // clean refresh
  };
}, []);
```

### With useGSAP (auto-cleanup)
```tsx
useGSAP(() => {
  // All ScrollTriggers created inside this callback
  // are automatically reverted when the component unmounts
});
```
`useGSAP` tracks all GSAP animations and ScrollTrigger instances created in its callback and reverts them on cleanup.

### Page-Level Pattern (App Router)
```tsx
// app/layout.tsx
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Kill all on route change — ensures no stale listeners
    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.refresh();
  }, [pathname]);

  return <div data-page>{children}</div>;
}
```

---

## 3. MatchMedia (Responsive Animations)

### Problem
Animations defined at desktop sizes persist on mobile — broken layouts, performance hits, weird states.

### Solution: gsap.matchMedia()
```tsx
useEffect(() => {
  const mm = gsap.matchMedia();

  // Desktop only (min-width: 768px)
  mm.add('(min-width: 768px)', () => {
    gsap.from('.desktop-only', { opacity: 0, x: 100, duration: 1 });
    // All animations here auto-revert when leaving this MQ
  });

  // Mobile only
  mm.add('(max-width: 767px)', () => {
    gsap.from('.mobile-only', { opacity: 0, scale: 0.8 });
  });

  // Kill all matchMedia listeners on unmount
  return () => mm.revert();
}, []);
```
`gsap.matchMedia()` automatically reverts animations when the media query stops matching — no manual resize handling.

### Reduced Motion
```tsx
useEffect(() => {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Full animation
    gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1.5 });
  });
  // No "else" needed — animations simply don't exist for reduced motion
  return () => mm.revert();
}, []);
```

---

## 4. ScrollTrigger Container / Boundary

### Problem
ScrollTrigger by default uses `window` as the scroller. In a Next.js layout with a fixed nav, or in a horizontally-scrolling section, triggers fire at wrong positions.

### Solution: scroller option
```tsx
// Within a scrollable container
useGSAP(() => {
  gsap.to('.parallax-bg', {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-section',
      scroller: '.main-content',   // <-- the scrolling container
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
});
```

### For horizontal scroll sections
```tsx
useGSAP(() => {
  const sections = gsap.utils.toArray('.panel');
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-container',
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${(sections.length - 1) * 100}%`,
      invalidateOnRefresh: true,  // recalculate on resize
    },
  });
});
```

---

## 5. ContainerAnimation (Inner Scroll)

### Problem
ScrollTrigger inside a container that itself animates (pin, horizontal scroll, parallax) — the inner triggers fire at unexpected times because the container's scroll position changes.

### Solution: ignoreInView / manual control
```tsx
useGSAP(() => {
  // Outer: horizontal scroll
  gsap.to('.track', {
    xPercent: -50,
    scrollTrigger: {
      trigger: '.container',
      pin: true,
      scrub: 1,
      end: '+=' + window.innerWidth * 2,
    },
  });

  // Inner: use containerAnimation to sync inner animation to outer progress
  ScrollTrigger.create({
    trigger: '.inner-card',
    containerAnimation: gsap.getById('outer-timeline'),
    start: 'left center',
    end: 'right center',
    onEnter: () => { /* card entry animation */ },
    onLeave: () => { /* card exit */ },
  });
});
```

---

## 6. Image Sequences (Canvas)

### Problem
Frame-by-frame image sequences are common for cinematic hero sections. Preloading + syncing with scroll is tricky in Next.js.

### Solution: Preload + ScrollTrigger proxy
```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function ImageSequence({ frames, totalFrames }: {
  frames: string[];
  totalFrames: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload all frames
    const preloaded = frames.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
    imagesRef.current = preloaded;

    async function init() {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.to({}, {
          scrollTrigger: {
            trigger: '.sequence-container',
            start: 'top top',
            end: `+=${totalFrames * 5}px`,  // each frame = 5px scroll
            scrub: 1,
            pin: true,
          },
          // Proxy tween — map progress to canvas frame
          frame: 0,
          ease: 'none',
          onUpdate: function() {
            const idx = Math.floor(this.targets()[0].frame);
            const img = imagesRef.current[idx];
            const canvas = canvasRef.current;
            if (img && canvas) {
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
            }
          },
        });
      });

      return () => ctx.revert();
    }

    const cleanup = init();
    return () => { cleanup.then(fn => fn()); };
  }, []);

  return <canvas ref={canvasRef} width={1920} height={1080} />;
}
```

---

## 7. Production Build Quirks

### Bundle Size: GSAP + Club Plugins
```ts
// BAD: imports entire GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GOOD: tree-shakeable if using ES modules
// Ensure next.config.js has:
// experimental: { esmExternals: 'loose' }
```

### CSS Extraction Conflict
GSAP sometimes sets inline styles that conflict with CSS module hashes during production builds.
```tsx
// Avoid using CSS module class names in GSAP selectors
// PREFER: ref-based (useRef) selectors
// AVOID: gsap.to('.card', {...}) — class may be hashed
```

### Static Export Limitation
```ts
// next.config.js
// If output: 'export', ScrollTrigger won't work (no scroll)
// ScrollTrigger-based sites must use SSR (output: undefined or 'standalone')
```

### Lazy Loading with React.lazy
```tsx
const AnimatedHero = dynamic(() => import('./AnimatedHero'), {
  ssr: false, // Ponytail: GSAP components never need SSR
  loading: () => <div className="hero-skeleton" />,
});
```

---

## 8. Quick Reference: Component Boilerplate

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Component() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All animations here
    // Auto-cleanup on unmount
  }, { scope: container });

  return <div ref={container}>{/* content */}</div>;
}
```

---

> **ponytail**: Covers 95% of Next.js + GSAP issues. If specific problems emerge (e.g., Turbopack compatibility, RSC payload conflicts), add as a new section then.
