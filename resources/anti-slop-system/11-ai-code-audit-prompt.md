# AI Code Audit — Master Prompt & Checklist

---

**Purpose**: A drop-in prompt you give to any AI (Claude, GPT-5, Gemini) to audit your animation/frontend codebase. Copy-paste this entire document or use individual sections as needed.

---

## Master Audit Prompt

```
You are auditing a web animation/frontend codebase. Perform a thorough review and return
a ranked list of findings. For each finding, include: severity (critical/high/medium/low),
file path + line number, the exact issue, and the fix.

Audit checklist:

## 1. BROKEN CODE
- [ ] Do all imports resolve to existing packages and paths?
- [ ] Are all GSAP plugins registered before use?
- [ ] Are there any `self.getVelocity()` or similar non-existent API calls?
- [ ] Do CSS gradients in `border` shorthand use valid syntax? (Gradients need border-image)
- [ ] Are `@property` declarations used without Firefox fallbacks?
- [ ] Do JavaScript files have the expected exports (check `export` vs `default`)?

## 2. SSR SAFETY (Next.js)
- [ ] Is every `gsap`, `ScrollTrigger`, or `SplitText` import inside a useEffect/dynamic import?
- [ ] Are 'use client' directives present on all animation components?
- [ ] Is there proper cleanup: `ctx.revert()`, `ScrollTrigger.kill()`, `mm.revert()`?
- [ ] Are ScrollTrigger instances killed on route change?
- [ ] Is gsap.matchMedia() used for responsive/ reduced-motion?

## 3. PERFORMANCE
- [ ] Are only `transform` and `opacity` animated? (No width/height/top/left)
- [ ] Is `will-change` used sparingly (≤10 elements)?
- [ ] Are animation libraries loaded via dynamic import (not blocking LCP)?
- [ ] Are there O(n^2) operations in animation loops? (particle connections, etc.)
- [ ] Is `backdrop-filter` used on elements that also have `perspective` or `preserve-3d`?
- [ ] Are bundle sizes checked? (GSAP ~18KB, Three.js ~50KB+)

## 4. ACCESSIBILITY
- [ ] Is `prefers-reduced-motion` respected in both CSS and JS?
- [ ] Do animated interactive elements have keyboard handlers (onFocus, onKeyDown)?
- [ ] Are focus indicators visible (never `outline: none`)?
- [ ] Do Canvas/WebGL elements have text fallbacks or aria-labels?
- [ ] Do autoplaying animations have pause controls?

## 5. MOBILE & RESPONSIVE
- [ ] Is the base CSS the mobile layout (no media query needed)?
- [ ] Are container queries used for component-level responsiveness?
- [ ] Are `touch` and `hover` interaction detected separately?
- [ ] Is GSAP matchMedia used for responsive ScrollTrigger start/end?
- [ ] Are safe areas (`env(safe-area-inset-*)`) respected?
- [ ] Are target sizes ≥ 44x44px on touch devices?

## 6. TESTING
- [ ] Is there at least one visual regression test per key page?
- [ ] Are animations tested across viewports (375, 768, 1440)?
- [ ] Is reduced-motion behavior tested?
- [ ] Is there a CI workflow for visual tests?

## 7. CROSS-REFERENCES
- [ ] Do all file paths in cross-references resolve correctly?
- [ ] Are directory names correct (`technique-catalogs/` not `catalogs/`)?
- [ ] Are referenced files updated if their content changed?

## 8. CODE QUALITY
- [ ] Are there duplicate values (e.g., identical easing curves)?
- [ ] Are there dead code paths (never-imported components)?
- [ ] Are imports tree-shakeable?
- [ ] Are comments accurate and not misleading?

## 9. DEPENDENCIES
- [ ] Are deprecated packages detected? (e.g., anime.js v4 never shipped)
- [ ] Is the GSAP license appropriate for the project? (Club plugins need membership)
- [ ] Are there unoptimized Lottie files? (.lottie format saves 30-90%)

Return findings as:
```
## CRITICAL (Fix Immediately)
1. src/file.ts:42 — [Issue] → [Fix]

## HIGH
...

## MEDIUM
...

## LOW
...
```

Start the audit now.
```

---

## Quick Prompts (Individual Scopes)

### Check a single file
```
Audit this file for the following:
- SSR safety (Next.js): is GSAP inside useEffect? Is 'use client' present?
- Performance: only transform/opacity animated? will-change usage?
- Accessibility: reduced-motion? keyboard support? focus indicators?
- Code correctness: any non-existent APIs? duplicate values? broken imports?
File: [paste file content]
```

### Check animation performance
```
Analyze the animation performance of this page:
1. How many concurrent GSAP tweens run?
2. Are there layout-triggering property animations?
3. What's the bundle size impact of animation libraries?
4. Are there O(n^2) operations in animation loops?
5. Is there proper cleanup on unmount?
Page code: [paste or describe]
```

### Check accessibility
```
Audit this component for WCAG 2.2 AA animation compliance:
1. prefers-reduced-motion handling
2. Keyboard accessibility of animated elements
3. Focus indicator visibility
4. Screen reader support for animated content
5. Flashing/strobe risk assessment
6. Pause controls for autoplay
Component: [paste code]
```

### Check mobile readiness
```
Audit this implementation for mobile:
1. Touch vs hover interaction handling
2. Viewport-responsive animation intensity
3. ScrollTrigger positions on mobile viewports
4. Touch target sizes (≥44x44px)
5. Safe area inset handling
6. Container query usage vs media queries
Code: [paste]
```

---

## CI Integration — Auto Audit on PR

```yaml
# .github/workflows/ai-audit.yml
name: AI Code Audit
on:
  pull_request:
    paths: ['src/**', 'resources/**']

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run AI Audit
        uses: anomalous/ai-audit-action@v1
        with:
          api-key: ${{ secrets.AI_API_KEY }}
          prompt-file: .github/audit-prompt.md
          files-changed: ${{ steps.files.outputs.all }}
          comment-on-pr: true
```

---

> **ponytail**: One master prompt to rule them all. Give this to any AI with your codebase and get findings ranked by severity. Don't fix everything — fix criticals and highs first, ignore lows unless they compound.
