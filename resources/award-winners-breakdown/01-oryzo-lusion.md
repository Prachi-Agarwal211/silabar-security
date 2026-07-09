# Oryzo — Lusion

**URL:** https://oryzo.com
**Studio:** Lusion (New Zealand)
**Year:** 2025-2026

---

## Overview

Oryzo is a premium rice brand site by Lusion, known for pushing Three.js to its limits. The site features a single giant grain of rice as the primary 3D object, with cinematic scroll staging.

## Key Techniques

### 1. Single Object Inertial 3D
One hero object (rice grain) with slow, inertial rotation that responds to scroll. The object feels physical — it has mass, momentum, and natural movement.

**How:** Three.js scene with a single detailed model, GSAP-scrubbed rotation on scroll with spring-like easing:
```javascript
gsap.to(scene.rotation, { y: Math.PI * 2, scrollTrigger: { trigger: '.scene', scrub: 2, start: 'top top', end: 'bottom top' }})
```

### 2. Z-Depth Scroll Staging
As user scrolls, different content layers appear at different Z-depths. The rice grain moves through a series of "stages" — each stage has dedicated lighting, environment, and text overlays.

**How:** Multiple cameras or camera path, GSAP timeline that moves camera position + changes environment:
```javascript
tl.to(camera.position, { z: 5, x: 2 }, 'stage1')
  .to(lighting, { intensity: 0.8, color: '#ffeedd' }, 'stage1')
  .to(scene.background, { value: '#1a1a2e' }, 'stage1')
```

### 3. Multi-Pass Refraction
The rice grain has realistic refraction (glass-like light bending). Achieved with custom Three.js shaders — not a standard Material.

### 4. Seamless Section Transitions
Pin-based scroll sections where the 3D scene persists across sections. Text and UI overlay changes, but the 3D scene is continuous.

**How:** GSAP ScrollTrigger pin on the canvas container, text elements have their own scroll-triggered reveals.

## Techniques You Can Steal

| Technique | Steal it for |
|-----------|--------------|
| Single hero object with scroll animation | Product showcases, brand mascots |
| Z-depth staging per scroll section | Storytelling with persistent 3D |
| Pin + persistent 3D across sections | Any site with continuous 3D narrative |
| GSAP camera path | Virtual tours, architectural walkthroughs |

## Tech Stack

- Three.js (WebGL)
- GSAP ScrollTrigger
- Custom GLSL shaders (refraction, lighting)
- Houdini FX for model creation (per Lusion pipeline)
