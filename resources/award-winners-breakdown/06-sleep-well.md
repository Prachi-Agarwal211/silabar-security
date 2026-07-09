# Sleep Well Creative — Hover Studio

**URL:** https://sleepwellcreative.com
**Studio:** Hover Studio
**Year:** 2025-2026

---

## Overview

Sleep Well Creative's portfolio site uses an illustrated 3D editorial style. The site feels like an interactive magazine or children's book come to life. Every section is a meticulously crafted 3D diorama.

## Key Techniques

### 1. Illustrated 3D Dioramas
Each section is a self-contained 3D scene — like a museum diorama. Stylized, illustrated aesthetic (not photorealistic). Uses Three.js with custom toon/hatching shaders for the illustrated look.

**How:** MeshToonMaterial or custom shader with baked-in illustration lines:
```javascript
const material = new THREE.MeshToonMaterial({ color: 0xffa500, gradientMap: gradientTexture })
```

### 2. Narrative Scroll Journey
Scroll progresses through a story — each section is a "chapter" with its own diorama, text, and mood. The 3D scenes transition like turning pages in a book.

**How:** Page-turn-like transitions between dioramas using GSAP:
```javascript
gsap.to(currentScene, { opacity: 0, scale: 0.8, duration: 0.8 })
gsap.from(nextScene, { opacity: 0, scale: 1.2, duration: 0.8 }, '-=0.6')
```

### 3. Stylized Camera Moves
Camera doesn't just follow scroll — it performs cinematographic moves: push-ins, pull-outs, Dutch angles, and pans. Each section has a custom camera choreography.

### 4. Ambient Detail Animation
Small elements in each diorama animate continuously — swinging pendulums, floating dust, blinking lights. Creates a living, breathing world.

**How:** Individual gsap.to() loops per element with different delays:
```javascript
gsap.to(swingingLamp, { rotation: 0.1, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
gsap.to(floatDust, { y: 5, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: Math.random() })
```

## Techniques You Can Steal

| Technique | Steal it for |
|-----------|--------------|
| Illustrated toon shader | Creative portfolios, children's, editorial |
| Diorama per section | Portfolio sections, case studies |
| Stylized camera choreography | Brand narratives, storytelling |
| Ambient diorama animation | Living backgrounds, brand worlds |

## Why It Works

The illustrated style immediately differentiates from the photorealism trend. The narrative scroll structure makes browsing feel like reading a book. Detail animation keeps users exploring each diorama.

## Tech Stack

- Three.js with MeshToonMaterial
- Custom GLSL toon shader with outlines
- GSAP for scene transitions
- SplitText for editorial typography
