# Motion Principles — Skill Archive

**Source:** https://github.com/LottieFiles/skill
**Author:** LottieFiles
**Extracted:** July 2026

Full adaptation of the LottieFiles animation skill — Disney's 12 principles of animation adapted for web UI. All credit to LottieFiles and the original Disney animators (Ollie Johnston, Frank Thomas).

---

## The 12 Principles (Adapted for Web)

### 1. Squash & Stretch
**UI equivalent:** Press-state feedback on buttons, cards, interactive elements.

When an element is pressed (mousedown), squash it slightly (scaleY down, scaleX up). On release, stretch it past neutral before settling. This gives weight and responsiveness.

**Implementation:**
```css
.btn:active { transform: scale(0.95, 0.9); transition: transform 0.1s; }
.btn { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
```
The release uses an overshoot cubic-bezier (0.34, 1.56, 0.64, 1) — this creates the "stretch" feel without actual scaleX > 1.

**Where to use:** Buttons, cards (on hover + press), toggle switches, drag handles, accordion headers

### 2. Anticipation
**UI equivalent:** A small backward movement before forward motion, signaling what's about to happen.

Before a modal opens, the trigger button might scale down 5%. Before a slide-in panel, the edge might flash. Before a notification appears, a subtle glow.

**Implementation:**
```css
/* Anticipation on button before panel slides in */
.btn { transition: transform 0.15s; }
.btn.anticipate { transform: scale(0.97); }
/* Then panel slides in */
.panel { transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.panel.active { transform: translateX(0); }
```

**Where to use:** Page transitions (the page slightly shrinks before new page arrives), modal triggers, tooltip triggers, hover animations (element scales down 5% before scaling up 10%)

### 3. Staging
**UI equivalent:** One animation at a time. Sequence matters.

Don't animate everything at once. Stage the most important element first, then supporting elements, then details. The hero image enters → then headline → then CTA → then background.

**Implementation:**
```javascript
// Staggered entry with increasing delay
const tl = gsap.timeline()
tl.from('.hero-image', { opacity: 0, y: 30, duration: 0.6 })
  .from('.headline', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
  .from('.subtitle', { opacity: 0, y: 15, duration: 0.4 }, '-=0.2')
  .from('.cta', { opacity: 0, y: 10, duration: 0.3 }, '-=0.15')
```

**Where to use:** Any multi-element reveal, page loads, section entries, modal contents

### 4. Straight Ahead & Pose to Pose
**UI equivalent:** Keyframe-based animation using library curves vs frame-by-frame.

For UI, use pose-to-pose (keyframe interpolation). It's predictable and editable. Straight ahead (frame-by-frame) is for complex character animation only.

**Implementation:** Use GSAP keyframes for pose-to-pose:
```javascript
gsap.to('.element', {
  keyframes: [
    { y: 0, opacity: 1, scale: 1, duration: 0.3 },
    { y: -20, scale: 1.1, duration: 0.2 },
    { y: 0, scale: 1, opacity: 0.8, duration: 0.3, ease: 'elastic.out(1, 0.3)' }
  ]
})
```

### 5. Follow Through & Overlapping Action
**UI equivalent:** Elements don't stop together. Each part stops at a different time.

When a card stops moving, the shadow might settle slightly after. The text inside might have a tiny bounce. The border color might transition slightly slower than the background.

**Implementation:**
```javascript
// Card stops first, shadow follows, inner content last
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
tl.to('.card', { y: 0, duration: 0.5 })
  .to('.card-shadow', { opacity: 0.8, duration: 0.4 }, '-=0.3')
  .to('.card-content', { y: 0, opacity: 1, duration: 0.3 }, '-=0.2')
```

**Where to use:** Cards, panels, tooltips, dropdowns, any compound element

### 6. Ease In / Ease Out
**UI equivalent:** Non-linear interpolation. Nothing in nature moves linearly.

CSS:
- `ease-out` for elements entering (fast start, slow end)
- `ease-in-out` for elements transitioning between states
- `ease-in` for elements leaving (slow start, fast end) — rarely used in UI

Custom cubic-bezier for premium feel: `cubic-bezier(0.22, 1, 0.36, 1)` — the "ease-out-expo" equivalent.

**Implementation:**
```css
.element-enter { transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.element-exit { transition: all 0.4s cubic-bezier(0.55, 0, 1, 0.45); }
```

**Common curves:**
| Curve | cubic-bezier | Use |
|-------|-------------|-----|
| Power 1 out | 0.25, 0.46, 0.45, 0.94 | Subtle, close to linear |
| Power 2 out | 0.22, 1, 0.36, 1 | Standard UI, smooth |
| Power 3 out | 0.16, 1, 0.3, 1 | Dramatic, premium |
| Power 4 out | 0.12, 1, 0.2, 1 | Very dramatic |
| Elastic out | 0.34, 1.56, 0.64, 1 | Bouncy, fun |
| Spring | Custom per mass/stiffness | Physical, natural |

### 7. Arcs
**UI equivalent:** Elements move in curved paths, not straight lines.

A notification badge flying to a cart icon should arc, not move in a straight line. A floating action button that expands should arc its children out.

**Implementation:** GSAP motionPath for curved movement:
```javascript
gsap.to('.badge', {
  motionPath: { path: [{ x: 0, y: 0 }, { x: 100, y: -50 }, { x: 200, y: 0 }], curviness: 1.5 },
  duration: 1,
  ease: 'power2.inOut'
})
```

**Where to use:** Flying elements (badges, icons), cart add animations, drag-and-drop, menu expands

### 8. Secondary Action
**UI equivalent:** A small secondary movement that reinforces the primary.

When a button is hovered (primary: background color change), a subtle shadow grows (secondary). When a card enters (primary: fade in + slide up), a line draws across it (secondary).

**Implementation:**
```css
.btn { transition: background 0.3s, box-shadow 0.4s, transform 0.2s; }
.btn:hover { background: #333; box-shadow: 0 8px 25px rgba(0,0,0,0.15); transform: translateY(-2px); }
```
Secondary action (shadow) has slower duration for the "settling" feel.

### 9. Timing
**UI equivalent:** Duration communicates object size and importance.

| Object | Duration (enter) | Duration (exit) | Rationale |
|--------|-----------------|-----------------|-----------|
| Tiny (icon, badge) | 0.15-0.2s | 0.1-0.15s | Small, fast |
| Small (button, link) | 0.2-0.3s | 0.15-0.2s | Quick interaction |
| Medium (card, modal) | 0.3-0.5s | 0.2-0.3s | Noticeable |
| Large (panel, page) | 0.5-0.8s | 0.3-0.5s | Needs attention |
| Hero (full section) | 0.8-1.2s | 0.5-0.8s | Dramatic entrance |

**Rule:** Exit is always faster than enter. Objects leaving shouldn't overstay.

### 10. Exaggeration
**UI equivalent:** Push an animation 20% further than feels natural.

If a button scales to 1.05 on hover, push it to 1.08. If a card tilts 5°, push it to 8°. The "correct" physics value often looks too subtle on screen.

**Implementation:** When you think the animation looks right, add 20% more amplitude.

### 11. Solid Drawing
**UI equivalent:** Elements must look solid at every frame.

No element should visually break mid-animation. Text shouldn't clip, borders shouldn't jump, shadows shouldn't detach from their elements.

**Implementation:** Test animations at midpoint (50% progress). If anything looks broken (text overflow, elements overlapping incorrectly, shadows detached), fix it.

### 12. Appeal
**UI equivalent:** The animation should be pleasing, not just functional.

- No jarring transitions
- No motion that causes discomfort (avoid rapid flashing, extreme scale changes)
- Use reduced-motion queries: `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }`

## Application to Specific UI Elements

### Page Transitions
Entry → content staggers in (0.6s total)
Exit → content fades to white/dark (0.2s)

### Navigation
Open menu → items stagger in with 0.05s delays
Close menu → items fade out simultaneously (faster exit)

### Loaders
Should have squash & stretch on the loading object, anticipation before loading finishes

### Notifications
Slide in with slight bounce (anticipation: alert glow before slide), stay, slide out

### Progress Bars
Smooth interpolation, not linear. Ease-in-out for natural feel. Secondary action: subtle pulse glow.

## Timing Cheatsheet

| Pattern | Duration | Ease |
|---------|----------|------|
| Fade in | 0.3-0.5s | ease-out |
| Slide up | 0.4-0.6s | ease-out-expo |
| Scale in | 0.3-0.5s | ease-out-back (overshoot) |
| Button hover | 0.2-0.3s | ease-out |
| Card hover | 0.3-0.5s | ease-out |
| Page transition | 0.5-0.8s | ease-in-out |
| Notification | 0.3-0.4s | ease-out + elastic |
| Stagger delay | 0.03-0.08s | — |
