# TECHNIQUE INVENTORY & CUTTING-EDGE RESEARCH 2026
### What we've used, what's available, and what makes each project unique

---

## PART 1: WHAT EACH PROJECT CURRENTLY USES

### KHEMJI (Industrial Manufacturing — GI Wire)
**Direction:** Tactile Brutalism
**Libraries:** framer-motion, gsap, lenis
**CSS:** Hard-edged offset shadows, texture-shine animations, glass panels, blob cards with light-leak sweep, certification stamps, industrial grid patterns, step-glow process cards
**Components:** Hero, Products, QualityAssurance, IndustriesWeServe, LeadershipSection, Manufacturing, About, Navbar, Footer, EnquiryForm, ScrollProgress, ContactModal, FAQAccordion, StatsBar
**Animation techniques:** None dedicated (relies on framer-motion defaults)
**Missing (opportunity):** No custom scroll animations, no WebGL, no physics, no creative typography

### SHIPBRIDGE (Logistics Platform — India-first)
**Direction:** Resonant Stark
**Libraries:** framer-motion, gsap, lenis, three.js, @react-three/fiber, @react-three/drei
**CSS:** Soft dual-layer blur shadows, holo-glass, bento grid, scanning-line animation, clip-path reveal, horizontal scroll track, marquee, stat-number gradients
**Components:** BackgroundPaperShaders, GlobalLogisticsCanvas, MagneticButton, ScrollProgress, StoryGallery, TextReveal, CircularTestimonials, HorizontalMarquee, Preloader, SmoothScrollProvider, DataNodeCursor, WhatsAppFloating, Header, Footer
**Animation techniques:** Three.js canvas background, GSAP scroll animations, custom cursor
**Missing (opportunity):** No flowmap, no liquid distortion, no physics engine, no split-text reveal

### MAAC (Animation School — Jaipur)
**Direction:** Kinetic Typography
**Libraries:** gsap, @gsap/react, three.js, @react-three/fiber, lenis
**CSS:** Red-tinted cinematic shadows, glass-card with liquid-border, metallic-gold text, animated mesh backgrounds, grain overlay, warm section variants, magnetic button CSS
**Components (29 files):**
- animations/: FadeIn
- courses/: CourseHero, CourseOverview, CourseCurriculum, CourseTools, CourseCareer, CourseCTA, CourseFAQ, CourseFeeAdmission
- hero/: CustomCursor, MAACXHero
- portfolio/: PortfolioGallery
- ui/: ApplyNowForm, CountUpStat, DemoBar, **DynamicBackground**, FAQAccordion, ImageLightbox, **KineticAwardsRows**, LiquidReveal, LoadingSkeleton, **MagneticButton**, PopularCoursesScroll, RevealHeading, ScrollProgress, **SplitTextReveal**, TrustBadgesScroll, VideoFacade
- Root: AboutSection, Awards, BentoGallery, CareerCreatorComparison, ClientShell, ContactModal, CourseCategories, ErrorBoundary, FAQSection, **FloatingActions**, Footer, FooterBackground, **HeroTrustTransition**, IndustryPartners, InstituteIntro, LenisProvider, MAACEvents, MetaPixel, Navbar, Placements, PopularCourses, SideScroller, **StudentShowcase**, StudentSuccessStories, Testimonials, TrustBadges, **VerticalCardGallery**, VideoModal
**Animation techniques:** GSAP ScrollTrigger, SplitTextReveal, MagneticButton, FadeIn, DynamicBackground (WebGL?), CustomCursor, KineticAwardsRows, LiquidReveal, HeroTrustTransition, SideScroller, VerticalCardGallery, StudentShowcase (video switching)
**What makes it unique:** Most complete animation system. Has 10+ custom animation components. Three.js installed but only DynamicBackground likely uses it.

### SILBAR SECURITY (Security Services — India)
**Direction:** Technical Mono
**Libraries:** gsap, @gsap/react, lenis
**CSS:** Military-precise clean shadows, container queries (services/industries/whyus grids), Logical Properties, brand-image treatment (grayscale+overlay), animated-gradient, View Transitions API, prefers-color-scheme light mode, prefers-contrast, touch-specific queries, print styles, safe-area-inset, dot-grid/blueprint-grid/topographic patterns, clip-path masks, blob shapes
**Components:**
- animations/: Counter, MagneticButton, ScrollReveal, SplitTextReveal
- layout/: Header, Footer
- sections/: ScrollyHero
- seo/: LocalBusinessSchema, OrganizationSchema
- ui/: (none listed)
**Animation techniques:** Counter (spring overshoot), MagneticButton (warp effect + glow trail + elastic spring-back), ScrollReveal (random variance in delay/rotation/scale), SplitTextReveal (organic mode), Marquee, OrganicDivider, FloatingElements, ScrollyHero (GSAP scroll-driven chaos scene)
**What makes it unique:** Most advanced CSS system (container queries, Logical Properties, prefers-color-scheme, View Transitions). 4 custom animation components with physics-based spring effects.

---

## PART 2: TECHNIQUE USAGE MATRIX (who uses what)

| Technique | Khemji | ShipBridge | MAAC | Silbar |
|-----------|--------|------------|------|--------|
| GSAP | ✅ | ✅ | ✅ | ✅ |
| GSAP ScrollTrigger | ❌ | ✅ | ✅ | ✅ |
| GSAP Physics2D | ❌ | ❌ | ❌ | ❌ |
| Three.js | ❌ | ✅ | ✅ | ❌ |
| React Three Fiber | ❌ | ✅ | ✅ | ❌ |
| Framer Motion | ✅ | ✅ | ❌ | ❌ |
| Lenis smooth scroll | ✅ | ✅ | ✅ | ✅ |
| Custom cursor | ❌ | ✅ | ✅ | ❌ |
| Magnetic button | ❌ | ✅ | ✅ | ✅ |
| Split text reveal | ❌ | ✅ | ✅ | ✅ |
| Scroll reveal | ❌ | ✅ | ✅ | ✅ |
| Counter animation | ❌ | ❌ | ✅ | ✅ |
| Marquee/ticker | ❌ | ✅ | ✅ | ✅ |
| Liquid reveal | ❌ | ❌ | ✅ | ❌ |
| Side scroller | ❌ | ❌ | ✅ | ❌ |
| Bento gallery | ❌ | ❌ | ✅ | ❌ |
| Vertical card gallery | ❌ | ❌ | ✅ | ❌ |
| Container queries | ❌ | ❌ | ❌ | ✅ |
| Logical Properties | ❌ | ❌ | ❌ | ✅ |
| prefers-color-scheme | ❌ | ❌ | ❌ | ✅ |
| View Transitions API | ❌ | ❌ | ❌ | ✅ |
| OKLCH colors | ❌ | ❌ | ❌ | ❌ |
| Matter.js physics | ❌ | ❌ | ❌ | ❌ |
| Flowmap distortion | ❌ | ❌ | ❌ | ❌ |
| Liquid glass refraction | ❌ | ❌ | ❌ | ❌ |
| Scroll-driven CSS | ❌ | ❌ | ❌ | ❌ |
| Anchor positioning | ❌ | ❌ | ❌ | ❌ |
| Haptic feedback | ❌ | ❌ | ❌ | ❌ |
| Device motion parallax | ❌ | ❌ | ❌ | ❌ |

---

## PART 3: CUTTING-EDGE TECHNIQUES TO USE (ranked by impact)

### TIER 1: High Impact, Medium Effort (use NOW)
These give the biggest "impossible to copy" factor.

1. **GSAP Physics2D Plugin** — Particle bursts on CTA clicks, confetti, sparkles. Cheap to build, high visual impact. Available in GSAP Club plugins.
   - Best for: Khemji (industrial particles on hero), ShipBridge (data particles)

2. **OKLCH Color System** — Perceptually uniform gradients, no muddy dead-zones. 5-minute fix, zero design-taste risk.
   - Best for: ALL projects (mentioned in research but never implemented)

3. **CSS Scroll-Driven Animations** — Native browser API, no JS needed. Reveal animations linked to scroll timeline.
   - Best for: Khemji (process steps), ShipBridge (feature reveals)

4. **View Transitions API** — SPA-like page transitions without full flash. Already in Silbar's CSS but unused.
   - Best for: ALL projects

5. **react-spring + @use-gesture** — True spring physics (not CSS easing). Drag, pinch, scroll velocity → natural motion.
   - Best for: MAAC (interactive course explorer), ShipBridge (drag-to-reorder)

### TIER 2: Very High Impact, Higher Effort (signature moments)
These are "one per site" signature effects.

6. **Flowmap Mouse-Trail Distortion** — Cursor becomes a velocity field, screen ripples like water. Using Curtains.js or custom WebGL.
   - Best for: ShipBridge hero (one wow moment)

7. **Matter.js Rigid-Body Physics** — Real gravity, collision, bounce. Users can throw/drag elements.
   - Best for: Khemji (interactive wire products), MAAC (playful 404 page)

8. **Liquid Glass Refraction** — Fragment shader simulating light bending through glass. Apple's 2026 design language.
   - Best for: ShipBridge nav bar (one premium accent)

9. **Three.js Post-Processing** — Bloom, chromatic aberration, film grain on existing Three.js scenes.
   - Best for: MAAC (cinematic hero), ShipBridge (canvas background enhancement)

10. **Variable Font Animations** — Animate font-weight/width on scroll. Type IS the layout.
    - Best for: MAAC (Kinetic Typography direction — this IS the signature)

### TIER 3: Subtle Polish (differentiation layer)
Small details that separate crafted from template.

11. **CSS color-mix()** — Dynamic tinting/shading without image assets.
12. **Anchor Positioning** — Tooltips/popovers tethered to elements, no coordinate math.
13. **Exclusive Accordion** — Native HTML `<details name="faq">` for FAQ sections.
14. **Offscreen Canvas** — Move WebGL to web worker for butter-smooth main thread.
15. **Relative Color Syntax** — Derive color variants from a single base color in CSS.

---

## PART 4: WHAT MAKES EACH PROJECT UNIQUE (prevention checklist)

### KHEMJI — Do NOT use:
- ❌ Three.js / WebGL (ShipBridge and MAAC have it)
- ❌ Split text reveal (MAAC and Silbar have it)
- ❌ Custom cursor (ShipBridge and MAAC have it)
- ❌ Liquid reveal (MAAC has it)
- ❌ Container queries (Silbar has it)

### KHEMJI — USE instead:
- ✅ Matter.js physics (interactive wire product demos)
- ✅ GSAP Physics2D (industrial particle effects)
- ✅ CSS Scroll-Driven Animations (process step reveals)
- ✅ Hard-edged shadows + texture animations (already unique)
- ✅ Bebas Neue + JetBrains Mono typography (industrial feel)

### SHIPBRIDGE — Do NOT use:
- ❌ Framer Motion (Khemji has it)
- ❌ Split text reveal (MAAC and Silbar have it)
- ❌ Magnetic button (MAAC and Silbar have it)
- ❌ Vertical card gallery (MAAC has it)
- ❌ Container queries (Silbar has it)

### SHIPBRIDGE — USE instead:
- ✅ Flowmap mouse-trail distortion (hero wow moment)
- ✅ Liquid Glass refraction (nav bar premium accent)
- ✅ Three.js post-processing (bloom on canvas background)
- ✅ react-spring + @use-gesture (drag interactions)
- ✅ Inter Tight monospace-forward (Resonant Stark)

### MAAC — Do NOT use:
- ❌ Framer Motion (Khemji and ShipBridge have it)
- ❌ Marquee (Silbar has it — wait, MAAC already has it too, but use sparingly)
- ❌ Container queries (Silbar has it)
- ❌ prefers-color-scheme (Silbar has it)

### MAAC — USE instead:
- ✅ Variable font animations (weight/width on scroll — Kinetic Typography)
- ✅ Three.js post-processing (bloom, chromatic aberration on hero)
- ✅ Matter.js (playful 404 or course explorer)
- ✅ GSAP Physics2D (text particle bursts)
- ✅ Syne + Inter with animated weight (signature motion through type)

### SILBAR — Do NOT use:
- ❌ Three.js / WebGL (ShipBridge and MAAC have it)
- ❌ Framer Motion (Khemji and ShipBridge have it)
- ❌ Matter.js (Khemji will have it)
- ❌ Variable font animations (MAAC will have it)

### SILBAR — USE instead:
- ✅ CSS Scroll-Driven Animations (native, no JS)
- ✅ View Transitions API (already in CSS, wire it up)
- ✅ Anchor Positioning (tooltips on service cards)
- ✅ Container queries + Logical Properties (already unique to Silbar)
- ✅ Space Grotesk + Manrope (clean, technical)

---

## PART 5: MOBILE OPTIMIZATION CHECKLIST (apply to ALL)

### Performance
- [ ] Reduce backdrop-filter blur on mobile (already done for ShipBridge, do for Khemji/MAAC)
- [ ] Lazy-load images with `loading="lazy"` + `decoding="async"`
- [ ] Use `content-visibility: auto` for off-screen sections
- [ ] Reduce particle counts on mobile (Three.js: 1000 mobile vs 10000 desktop)
- [ ] Use `will-change` sparingly (only on actively animating elements)

### Touch & Interaction
- [ ] 44px minimum touch targets (done for all 4)
- [ ] `touch-action: manipulation` on interactive elements (prevents 300ms delay)
- [ ] `-webkit-tap-highlight-color: transparent` on all interactive elements
- [ ] `overscroll-behavior: none` on body (prevents pull-to-refresh interference)

### Viewport & Safe Areas
- [ ] `viewport-fit=cover` on all projects (done for ShipBridge/Silbar, verify Khemji/MAAC)
- [ ] `env(safe-area-inset-*)` padding on body (done for ShipBridge/MAAC/Silbar, verify Khemji)
- [ ] `100dvh` for hero sections (done for all 4)

### Accessibility
- [ ] `prefers-reduced-motion: reduce` (done for Khemji/ShipBridge/MAAC/Silbar)
- [ ] `prefers-contrast: more` (done for Khemji/ShipBridge/MAAC)
- [ ] Focus-visible outlines (verify all 4)
- [ ] Skip-to-content link (verify all 4)
- [ ] ARIA labels on interactive elements (verify all 4)

### SSR Safety
- [ ] All WebGL/Three.js behind `dynamic(() => import(...), { ssr: false })`
- [ ] All GSAP ScrollTrigger inside `useEffect` with cleanup
- [ ] No `window`/`document` access outside `useEffect` or `typeof window !== "undefined"` guard
- [ ] Font loading with `display: 'swap'` (done for all 4)

---

## PART 6: LIBRARY INVENTORY (what's installed where)

| Library | Khemji | ShipBridge | MAAC | Silbar |
|---------|--------|------------|------|--------|
| gsap | 3.15.0 | 3.15.0 | 3.14.2 | 3.15.0 |
| @gsap/react | ❌ | ❌ | 2.1.2 | 2.1.2 |
| three | ❌ | 0.184.0 | 0.183.2 | ❌ |
| @react-three/fiber | ❌ | 9.6.1 | 8.18.0 | ❌ |
| @react-three/drei | ❌ | 10.7.7 | ❌ | ❌ |
| framer-motion | 12.40.0 | 12.40.0 | ❌ | ❌ |
| lenis | 1.3.23 | 1.3.23 | 1.3.21 | 1.3.25 |
| matter-js | ❌ | ❌ | ❌ | ❌ |
| react-spring | ❌ | ❌ | ❌ | ❌ |
| @use-gesture | ❌ | ❌ | ❌ | ❌ |
| curtains.js | ❌ | ❌ | ❌ | ❌ |
| tsparticles | ❌ | ❌ | ❌ | ❌ |
| lottie | ❌ | ❌ | ❌ | ❌ |

---

## PART 7: ANTI-REPEAT RULES

1. **One physics engine per project** — If Khemji gets Matter.js, no other project uses it
2. **One WebGL signature per project** — If ShipBridge gets flowmap, MAAC gets post-processing, Silbar gets none
3. **One split-text approach per project** — MAAC has SplitTextReveal, Silbar has SplitTextReveal → differentiate the implementation (MAAC = variable font weight, Silbar = organic random delays)
4. **One cursor effect per project** — ShipBridge has DataNodeCursor, MAAC has CustomCursor → Khemji and Silbar should NOT add custom cursors
5. **One scroll-reveal library per project** — Each uses its own approach (Khemji = framer-motion, ShipBridge = GSAP, MAAC = GSAP, Silbar = GSAP). Don't add a second.
6. **Color system per project** — Each has unique palette. Never share palette tokens between projects.
7. **Typography per project** — Each has unique font pairing. Never share font choices.
