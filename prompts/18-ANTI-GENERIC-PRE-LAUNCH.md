# 18 — ANTI-GENERIC PRE-LAUNCH CHECKLIST
## Quality Gate Before Shipping Anything

---

## THE RULE

**No component ships until it passes this checklist.**

If ANY item fails: fix it before moving on.

---

## THE 10-POINT AI DETECTION TEST

Run this test on EVERY component:

### Test 1: "REMEMBER ONE THING"
- [ ] Can you describe the ONE thing this component does from memory?
- [ ] If yes: pass. If no: FAIL — delete and redo.

### Test 2: "VISUAL ELEVATOR MUSIC"
- [ ] Close your eyes, open the site. Does it feel like royalty-free background music?
- [ ] If no: pass. If yes: FAIL — delete everything, start over.

### Test 3: "TEMPLATE DETECTION"
- [ ] Show it to a developer friend. If they say "nice template" — FAIL.
- [ ] If they say "wait, how did you do that?" — pass.

### Test 4: "AI DETECTION"
- [ ] Does this look like ChatGPT would generate it?
- [ ] (Symmetric grid, Inter font, fade-in animation, blue gradient)
- [ ] If no: pass. If yes: FAIL — delete it.

### Test 5: "FIGMA COMPARISON"
- [ ] Could this be built in Figma Sites with zero custom code?
- [ ] If no: pass. If yes: FAIL — add something Figma can't do.

### Test 6: "THE MIRROR TEST"
- [ ] Show it to someone who doesn't code. Ask "what do you remember?"
- [ ] If they say "that one thing was insane": pass.
- [ ] If they say "it was nice": FAIL — it's generic.

### Test 7: "THE SCREENSHOT TEST"
- [ ] Take a screenshot. Remove your logo. Does it still look like YOUR site?
- [ ] If yes: pass. If no: FAIL — it's template territory.

### Test 8: "THE COMPETITOR TEST"
- [ ] Look at 5 competitor sites. Is yours more memorable?
- [ ] If yes: pass. If no: FAIL — use different techniques.

### Test 9: "THE REVISIT TEST"
- [ ] Come back in 24 hours. Does it still feel fresh?
- [ ] If yes: pass. If no: FAIL — it's generic.

### Test 10: "THE ELEVATOR PITCH"
- [ ] In one sentence, describe why this site is special.
- [ ] If you can: pass. If you can't: FAIL — you haven't finished yet.

---

## THE TECHNIQUE CHECKLIST

### Animation
- [ ] No default CSS `ease` or `ease-in-out` (use cubic-bezier)
- [ ] Animation duration 150ms-800ms (not too fast, not too slow)
- [ ] No animation-delay (use Intersection Observer)
- [ ] No animation on page load for above-fold
- [ ] prefers-reduced-motion fallback present
- [ ] Transform and opacity used (compositor-thread)

### Typography
- [ ] No Inter, Roboto, Poppins, Montserrat, Open Sans
- [ ] Max 2 fonts per site
- [ ] Variable fonts used when available
- [ ] Font-size clamp() used for responsive
- [ ] Line-height 1.3+ for body text
- [ ] Letter-spacing 0.05em max for body

### Color
- [ ] No pure #000000 or #FFFFFF (use off-black/off-white)
- [ ] No blue gradient (#4A90E2 to #50E3C2)
- [ ] Max 5 colors per site
- [ ] OKLCH used for gradients
- [ ] Contrast ratio 4.5:1 for text
- [ ] color-mix() used for dynamic tinting

### Layout
- [ ] No symmetric 3-column grids
- [ ] No center-aligned text for 2+ lines
- [ ] Gap used for spacing (not margin)
- [ ] Container queries used for components
- [ ] Asymmetric layouts throughout
- [ ] Visual hierarchy clear

### Interaction
- [ ] Custom cursor (if project allows)
- [ ] Hover effects on all interactive elements
- [ ] Focus indicators visible for keyboard
- [ ] Touch targets 44px minimum on mobile
- [ ] Loading states present
- [ ] Error states present

### SEO
- [ ] Unique title and meta description
- [ ] OpenGraph + Twitter cards
- [ ] Canonical URLs
- [ ] JSON-LD structured data
- [ ] Semantic HTML
- [ ] Alt text on all images
- [ ] Sitemap generated
- [ ] robots.txt configured

### Performance
- [ ] Hero image optimized (WebP, proper size)
- [ ] Fonts self-hosted (next/font)
- [ ] Images lazy loaded (except hero)
- [ ] Content-visibility: auto for off-screen
- [ ] Third-party scripts deferred
- [ ] CSS minimized
- [ ] JavaScript minimized

### Accessibility
- [ ] 4.5:1 contrast for text
- [ ] 3:1 contrast for UI
- [ ] Keyboard navigation works
- [ ] Screen reader announces content
- [ ] prefers-reduced-motion respected
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Semantic HTML used

---

## THE "REMEMBER ONE THING" TEST

Each section must have ONE thing it's remembered for:

| Section | "Remember One Thing" | Pass? |
|---------|---------------------|-------|
| Hero | "That scroll reveal was insane" | [ ] |
| Features | "The clip-path animation was unique" | [ ] |
| About | "The kinetic typography was wild" | [ ] |
| Services | "The cursor changed shape per section" | [ ] |
| Testimonials | "The parallax depth was so smooth" | [ ] |
| Contact | "The magnetic hover was satisfying" | [ ] |

**If any section has no "remember one thing": FAIL.**

---

## THE "VISUAL ELEVATOR MUSIC" TEST

Ask yourself:
- Does this feel like background music at a hotel lobby?
- Is it pleasant but forgettable?
- Would you notice if it was gone?

If YES to any: FAIL. Delete and redo with a different technique.

---

## THE "FIGMA COMPARISON" TEST

For each section, ask:
- Could Figma Sites build this with zero custom code?
- If YES: add something Figma can't do (3D, physics, scroll-driven, shader)
- If NO: pass

**Figma cannot do:**
1. WebGL/WebGPU
2. Physics
3. Audio-reactive
4. Custom shaders
5. Variable font animation
6. GPGPU particles
7. CSS scroll-driven animations (limited)
8. View Transitions API
9. Container queries (limited)
10. Haptic feedback
11. Device motion parallax
12. Custom cursor per section
13. Spring physics
14. Procedural generation
15. Real-time data visualization

---

## THE FINAL CHECKLIST

Before shipping ANYTHING:

### Design
- [ ] 10-point AI detection test passed
- [ ] "Remember One Thing" test passed
- [ ] "Visual Elevator Music" test passed
- [ ] "Figma Comparison" test passed
- [ ] Technique checklist passed
- [ ] Anti-generic rules followed (file 17)

### Code
- [ ] TypeScript (no any, no loose types)
- [ ] No console.log in production
- [ ] No inline styles
- [ ] No !important
- [ ] No document.querySelector (use refs)
- [ ] No setInterval for animations (use rAF)
- [ ] No scroll event without throttle

### SEO
- [ ] Technical SEO checklist passed (file 21)
- [ ] Semantic HTML used
- [ ] JSON-LD structured data added
- [ ] Sitemap generated
- [ ] robots.txt configured

### Performance
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] TTFB < 800ms

### Accessibility
- [ ] Contrast ratios met
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] prefers-reduced-motion respected
- [ ] Touch targets 44px

---

## HOW TO USE THIS FILE

Before shipping ANY component:
1. Run the 10-point AI detection test
2. Run the technique checklist
3. Run the "Remember One Thing" test
4. Run the "Visual Elevator Music" test
5. Run the "Figma Comparison" test
6. Check the final checklist
7. Only then: ship it

**If ANY test fails: fix it before moving on.**

**The bar is not "good enough." The bar is "unforgettable."**
