# Lacoste ACE — Merci Michel

**URL:** https://www.lacoste-ace.com
**Studio:** Merci Michel (France)
**Year:** 2025-2026

---

## Overview

An interactive tennis campaign for Lacoste's ACE shoe line. Users hit a tennis ball across the screen by scrolling — the ball trajectory changes based on Lacoste's brand colors (green). Combines brand storytelling with gamified interaction.

## Key Techniques

### 1. Branded Three.js Mini-Game
The scroll interaction is gamified — instead of passive scroll reveals, the user actively "plays" by scrolling at different speeds to control ball trajectory. The court, ball, and net are all Three.js objects.

### 2. Scroll-Synced Tennis Physics
Ball trajectory follows scroll speed and direction. Fast scroll = powerful serve. Slow scroll = gentle volley. Physics engine (cannon-es or custom) handles ball bounce, spin, and landing.

**Concept:**
```javascript
ScrollTrigger.create({ scrub: true, onUpdate: (self) => { const speed = Math.abs(self.getDirection() || self.progress * 1000); ball.applyForce(speed * 0.5, 0, -speed * 0.3) }})
```

### 3. Color-Linked Brand Integration
The ball leaves green trails — Lacoste's brand color — in the air as it moves. Court lines are brand green. The environment subtly shifts to brand colors during key moments.

### 4. Progressive Difficulty
As user scrolls further, the ball speed increases, net moves closer, or court narrows. Creates a sense of progression and achievement.

## Techniques You Can Steal

| Technique | Steal it for |
|-----------|--------------|
| Scroll as game controller | Any scroll experience that needs engagement |
| Brand color trail particles | Brand moments, logo reveals |
| Progressive scroll difficulty | Product showcases, storytelling |
| Physics + scroll integration | Sports, gaming, interactive narratives |

## Why It Works

Gamification dramatically increases scroll depth and time-on-page. Users want to "beat" the game, so they scroll further and slower, absorbing more content. Brand integration is organic — the green trail is both a visual effect and a brand asset.

## Tech Stack

- Three.js
- cannon-es (physics engine)
- GSAP ScrollTrigger
- Canvas particles for ball trail
