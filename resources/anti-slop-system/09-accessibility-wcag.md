# Accessibility & WCAG — Animation Compliance

---

## 1. Core Standards

### WCAG 2.2 AA (2026 baseline)

| Criterion | Requirement | Animation Impact |
|-----------|-------------|------------------|
| 2.2.2 (A) | Pause, stop, hide for auto-moving content >5s | Autoplay carousels, parallax loops |
| 2.3.1 (A) | No flashing >3x per second | Strobe/glitch effects |
| 2.3.3 (AAA) | Motion from interaction can be disabled | Scroll-triggered animations |
| 2.5.5 (AAA) | Target size ≥ 44x44px | Interactive animated elements |
| 2.5.8 (AA) | Dragging movements have single-pointer alt | Drag/swipe interactions |
| 1.4.1 (A) | Color not sole meaning conveyer | Color-only animation cues |
| 4.1.2 (A) | Name, role, value for custom widgets | Animated custom controls |

---

## 2. prefers-reduced-motion

### CSS — progressive approach
```css
/* Default: no motion. Safe for everyone. */
.card {
  opacity: 0;
  transition: opacity 200ms ease;
}

/* Add motion only when user allows it */
@media (prefers-reduced-motion: no-preference) {
  .card {
    opacity: 1;
    transform: translateY(20px);
    transition: transform 400ms ease, opacity 400ms ease;
  }
}
```

### JavaScript — GSAP matchMedia
```ts
useGSAP(() => {
  const mm = gsap.matchMedia();

  // Motion allowed — full experience
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1.5 });
    gsap.from('.card', { opacity: 0, y: 40, stagger: 0.1, scrollTrigger: { start: 'top 80%' } });
  });

  // Reduced motion — show everything immediately
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.hero-title, .card', { opacity: 1, y: 0, clearProps: 'all' });
  });

  return () => mm.revert();
}, []);
```

### What to reduce, not remove
```
Parallax:              Remove. Static placement.
Scroll reveals:        Fade in (no movement) rather than slide.
Card hover:            Scale → color change.
Page transitions:      Instant swap → shorten to 100ms fade.
Particles:             Remove entirely.
Loading animations:    Simple progress bar → no spinner.
```

---

## 3. Focus Management

### Animated elements must be focusable
```tsx
// Interactive animated elements need keyboard access
<button
  onFocus={() => gsap.to(el, { scale: 1.05 })}
  onBlur={() => gsap.to(el, { scale: 1 })}
  onKeyDown={(e) => e.key === 'Enter' && activateAnimation()}
  aria-label="Play animation"
>
  {children}
</button>
```

### Focus ring — never remove, only restyle
```css
/* BAD */
*:focus { outline: none; }

/* GOOD */
*:focus-visible {
  outline: 2px solid #4A90D9;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Focus trapping for animated modals
```tsx
function useFocusTrap(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const focusable = element.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"]), input, select, textarea'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    first?.focus();
    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [containerRef]);
}
```

---

## 4. Screen Reader Support

### Animated content
```tsx
// Animated counter
function AnimatedCounter({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${label}: ${value}`}
    >
      <span className="sr-only">{label}: {value}</span>
      <span aria-hidden="true">{animatedValue}</span>
    </div>
  );
}
```

### Canvas/WebGL fallback
```tsx
// 3D scenes need text fallback
<div role="img" aria-label="Interactive 3D product showcase showing the item from all angles">
  <canvas ref={canvasRef} aria-hidden="true" />
  <div className="sr-only">
    <p>Product X — 3D interactive view. Keyboard not supported.</p>
    <p>View static images below.</p>
  </div>
</div>
```

### Announce state changes
```ts
// Use live regions for scroll-triggered section changes
function updateActiveSection(section: string) {
  const announcer = document.getElementById('section-announcer');
  if (announcer) {
    announcer.textContent = `Now viewing: ${section}`;
  }
}
```

---

## 5. Color & Contrast

### Minimum ratios (WCAG AA)
```
Normal text:     4.5:1
Large text (>18px bold / 24px):  3:1
UI components:   3:1
Focus indicators: 3:1 against adjacent colors
```

### Don't rely on animation color alone
```tsx
// BAD — only color indicates state
<div style={{ color: isLoading ? 'red' : 'green' }}>

// GOOD — icon + text + color
<div role="status" aria-live="polite">
  {isLoading ? <SpinnerIcon aria-hidden="true" /> : <CheckIcon aria-hidden="true" />}
  <span>{isLoading ? 'Loading...' : 'Complete'}</span>
</div>
```

---

## 6. Seizure & Vestibular Safety

### Flashing limit
```css
/* Max 3 flashes per second — any faster fails WCAG 2.3.1 */
@keyframes safe-glitch {
  0%, 95%, 100% { opacity: 1; }
  96% { opacity: 0.7; }       /* 1 flash per 5s = safe */
}
```

### Pause controls
```tsx
function AutoplayCarousel({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div role="region" aria-label="Featured content carousel">
      <button
        onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
      >
        {paused ? '▶' : '⏸'}
      </button>
      <div aria-live={paused ? 'off' : 'polite'}>
        {/* animated content */}
      </div>
    </div>
  );
}
```

---

## 7. SVG Animation Accessibility

```tsx
// Animated SVG needs labels
<svg viewBox="0 0 100 100" role="img" aria-labelledby="chart-title">
  <title id="chart-title">Revenue growth 2024-2026</title>
  <desc>Bar chart showing revenue increasing from $1M to $5M over three years</desc>
  <g aria-hidden="true">
    {/* animated paths — decorative, hidden from AT */}
  </g>
</svg>
```

---

## 8. Quick Checklist

```
[ ] prefers-reduced-motion respected (CSS + JS)
[ ] No animation solely communicates state (color, movement)
[ ] All animated interactive elements are keyboard accessible
[ ] Focus indicators visible on all animated elements
[ ] No content flashes >3 times/second
[ ] Autoplay content pauses after 5s or has pause button
[ ] Canvas/WebGL has text fallback or aria-label
[ ] ARIA live regions announce dynamic content
[ ] Dragging interactions have single-pointer alternative
[ ] Target sizes ≥ 44x44px on touch devices
```

---

> **ponytail**: Accessibility is not extra work — it's the default. `prefers-reduced-motion` first, animation second. Keyboard access for everything interactive. If you can't pass a screen reader on your animated page, the animation is decorative, not functional.
