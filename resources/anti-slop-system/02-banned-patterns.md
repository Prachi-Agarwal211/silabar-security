# Banned Patterns — Explicit Forbidden List

These 12 patterns produce generic, forgettable output that reads as AI-generated. If an AI agent suggests any, reject and redirect to specific alternatives.

---

## Layout Bans

### 1. Symmetrical Hero with Centered Text
**Ban reason:** Every template defaults to this. Zero differentiation.
**Instead:** Asymmetric hero (image left/text right or vice versa), text-only hero with typography as visual, split hero with diagonal divide, floating hero with offset elements, or no hero section at all.

### 2. Three-Column Card Layout
**Ban reason:** Default of every CSS framework. Users are blind to it.
**Instead:** 2-column, 4-column, staggered grid, masonry, single-column scroll with full-bleed cards, or custom asymmetric layout.

### 3. Sticky Nav + Footer
**Ban reason:** ~95% of websites have this. It's invisible.
**Instead:** Hidden nav (reveals on scroll up), contextual nav (changes per section), no nav (scroll-based navigation), sidebar nav, or floating dot navigation.

### 4. Full-Width Hero Image with Overlay Text
**Ban reason:** The most overused hero pattern on the web.
**Instead:** Split hero, split-screen, text-as-hero, terminal/typewriter hero, animated illustration hero, glassmorphism hero, or interactive 3D hero.

---

## Animation Bans

### 5. `.fade-in` on Scroll
**Ban reason:** The most generic animation pattern known to web. Zero personality.
**Instead:** Mask reveal, clip-path reveal, draw effect, morph, scale-in with blur, perspective entrance, or split-text stagger.

### 6. Slide-In from Left/Right
**Ban reason:** Overdone across every presentation and website framework.
**Instead:** Scale-in from center, blur-in, 3D rotate-in, clip-path curtain, or staggered reveal from random positions.

### 7. Basic Hover `scale(1.05)`
**Ban reason:** The default CSS hover. Says "I used a framework."
**Instead:** Add shadow depth, content change/substitution, border animation, magnetic movement, color channel shift, or filter transition (blur→sharp, grayscale→color).

---

## Color Bans

### 8. White/Black/Gray + 1 Accent Color
**Ban reason:** Every startup website since 2015. Users tune it out.
**Instead:** Full 3-5 color palette from palette anchors (see `03-palette-anchors.md`), monochromatic with rich texture, duotone photography, or high-contrast with 2+ accent colors.

### 9. Gradient Mesh as Hero Background
**Ban reason:** 2023 trend, now fully generic. Looks templated.
**Instead:** Noise texture overlay, feTurbulence generative background, animated SVG filter background, particle system, or 3D scene background.

### 10. Dark Mode = Invert Colors
**Ban reason:** Lazy implementation. Dark mode should have its own palette, not just inverted light mode.
**Instead:** Dark mode with: reduced saturation, warmer neutrals, different accent relationships, adjusted contrast ratios, and separate shadow/glow values.

---

## Typography Bans

### 11. Inter + Sans-Serif Pairing
**Ban reason:** The most common font pairing on the web. Instantly forgettable.
**Instead:** Use variable fonts, display + grotesk, serif + mono, or unique pairings (Fraunces + Söhne, Space Mono + Plus Jakarta).

### 12. 42/18 Type Scale
**Ban reason:** Every framework default. No hierarchy personality.
**Instead:** Custom type scale with non-round numbers: 13/21/34/55 or 16/24/38/62. Use extreme ratios for dramatic effect or tight ratios for density.
