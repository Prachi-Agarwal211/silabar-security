# CREATIVE CODING & ENGINEERING BIBLE

## The Math, Physics, and Code Behind Impossible Web Experiences

### Purpose
This document exists so that when our AI reads it, it understands the exact mathematical, physical, and technical foundations of every technique we use. This is not a surface-level overview — this is the deep engineering that separates revolutionary design from templates.

---

## PART 1: THE MATH THAT MAKES ANIMATIONS ALIVE

### 1.1 Spring Physics (Mass-Spring-Damper System)

Real springs in the physical world follow **Hooke's Law** combined with **Damping Force**. This is not a metaphor — this is the actual differential equation that governs spring motion.

**The Physics:**

```
Hooke's Law:     F_spring = -k × x
                 k = spring constant (stiffness)
                 x = current displacement from rest position

Damping Force:   F_damping = -d × v
                 d = damping coefficient (friction)
                 v = current velocity

Total Force:     F_total = F_spring + F_damping
                 F_total = (-k × x) + (-d × v)

Newton's Second Law: a = F_total / mass

Integration (Euler method):
  v_new = v_old + a × dt
  x_new = x_old + v_new × dt
```

**Why this matters for web design:**
CSS transitions are linear or use pre-defined easing curves. They cannot simulate real physical objects with mass, stiffness, and friction. Spring physics creates organic, living motion that feels like real objects. When a button "springs" back after being dragged, that's spring physics. When a modal "bounces" into view, that's spring physics. Templates use CSS transitions. We use physics.

**Custom Spring Implementation (no library needed):**

```javascript
function springAnimation(element, targetX, targetY, config = {}) {
  const { stiffness = 0.1, damping = 0.8, mass = 1, precision = 0.01 } = config;
  
  let x = 0, y = 0, vx = 0, vy = 0;
  let animating = true;
  
  function step() {
    if (!animating) return;
    
    // Calculate spring forces
    const fx = -stiffness * (x - targetX);
    const fy = -stiffness * (y - targetY);
    
    // Calculate damping forces
    const dvx = -damping * vx;
    const dvy = -damping * vy;
    
    // Update acceleration
    const ax = (fx + dvx) / mass;
    const ay = (fy + dvy) / mass;
    
    // Update velocity
    vx += ax;
    vy += ay;
    
    // Update position
    x += vx;
    y += vy;
    
    // Apply to element
    element.style.transform = `translate(${x}px, ${y}px)`;
    
    // Check if settled
    if (Math.abs(vx) < precision && Math.abs(vy) < precision &&
        Math.abs(x - targetX) < precision && Math.abs(y - targetY) < precision) {
      element.style.transform = `translate(${targetX}px, ${targetY}px)`;
      return;
    }
    
    requestAnimationFrame(step);
  }
  
  requestAnimationFrame(step);
  
  // Return cancel function
  return () => { animating = false; };
}

// Usage
const cancel = springAnimation(button, 50, 0, {
  stiffness: 0.1,
  damping: 0.8,
  mass: 1
});

// Cancel if needed
// cancel();
```

**Tuning Guide:**
| Stiffness | Damping | Result |
|-----------|---------|--------|
| High (0.2+) | Low (0.3) | Snappy, energetic bounce |
| High (0.2+) | High (0.9) | Quick settle, minimal bounce |
| Low (0.05) | Low (0.3) | Slow, dramatic overshoot |
| Low (0.05) | High (0.9) | Very slow, almost no bounce |
| Medium (0.1) | Medium (0.7) | Balanced, natural feel |

---

### 1.2 Cubic Bézier — The DNA of Every Easing Curve

Every easing curve in CSS, GSAP, and every animation library is ultimately a **cubic Bézier curve**. Understanding this math means understanding the fundamental building block of motion design.

**The Formula:**

```
B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃

Where:
  t = time (0 to 1)
  P₀ = start point (0, 0) — always fixed
  P₁ = first control point — affects the start of the curve
  P₂ = second control point — affects the end of the curve
  P₃ = end point (1, 1) — always fixed
```

**How to Design Your Own Easing:**

The two control points P₁ and P₂ determine the shape of the curve. Think of them as "magnets" that pull the curve toward them.

- **P₁ controls the start**: If P₁'s x-value is small (close to 0), the animation starts slowly. If it's large (close to 1), it starts quickly.
- **P₂ controls the end**: If P₂'s x-value is small (close to 0), the animation ends slowly. If it's large (close to 1), it ends quickly.
- **Overshoot**: If P₁ or P₂'s y-value goes above 1 or below 0, the animation overshoots or undershoots its target.

**The Premium Easing Curves:**

```
Premium Smooth (Stripe-like):
  cubic-bezier(0.16, 1, 0.3, 1)
  → Fast start, smooth deceleration, no overshoot
  → Use for: Most UI transitions, page loads

Playful Overshoot:
  cubic-bezier(0.34, 1.56, 0.64, 1)
  → Overshoots by 56%, then settles
  → Use for: Buttons, playful interactions

Energetic Bounce:
  cubic-bezier(0.68, -0.55, 0.27, 1.55)
  → Undershoots, then overshoots, then settles
  → Use for: Landing effects, attention-grabbing

Snappy Response:
  cubic-bezier(0.2, 0, 0, 1)
  → Almost instant start, smooth end
  → Use for: UI feedback, hover states

Organic Natural:
  cubic-bezier(0.45, 0, 0.15, 1)
  → Slow start, slow end, smooth middle
  → Use for: Natural, breathing animations

Cinematic Reveal:
  cubic-bezier(0.77, 0, 0.175, 1)
  → Starts fast, holds, then releases
  → Use for: Hero text reveals, dramatic entrances

Fluid Motion:
  cubic-bezier(0.25, 0.46, 0.45, 0.94)
  → Gentle start, smooth finish
  → Use for: Scroll-linked animations
```

**Why this matters:**
Templates use CSS defaults (`ease`, `ease-in`, `ease-out`, `ease-in-out`). These are generic and feel robotic. Custom easings are your fingerprint — they encode your specific taste into math. When someone uses your easing curve, they're using your feeling.

---

### 1.3 Elastic.out() — The Actual Penner Equation

GSAP's `elastic.out(amplitude, period)` is NOT a physics simulation. It's an algorithmic easing function created by Robert Penner. Understanding the math explains why it feels the way it does.

**The Formula:**

```
f(t) = 2^(-10t) × sin((t × 10 - 0.75) × 2π / period) + 1

Components:
  Decay:     2^(-10t) → Pulls amplitude toward zero as t approaches 1
  Oscillation: sin((t × 10 - 0.75) × 2π / period) → Creates the wiggling
  Offset:    + 1 → Centers the output around the target value

Parameters:
  amplitude: Controls the intensity of the overshoot (default: 1)
  period:    Controls the frequency of oscillation (default: 0.3)
```

**Why it works:**
The exponential decay ensures the oscillation dies out over time. The sine wave creates the actual wiggling motion. Together, they create the effect of a spring that bounces and settles.

**GSAP Usage:**
```javascript
// Gentle elastic
gsap.to(element, { scale: 1, ease: "elastic.out(1, 0.5)" });

// Intense elastic
gsap.to(element, { scale: 1, ease: "elastic.out(1.5, 0.2)" });

// Subtle elastic
gsap.to(element, { scale: 1, ease: "elastic.out(0.8, 0.6)" });
```

---

### 1.4 The Complete Easing Reference

| Family | Formula | Feel | Use For |
|--------|---------|------|---------|
| **Power** | `t^n` | Smooth, predictable | Standard transitions |
| **Expo** | `2^(10(t-1))` | Fast start, smooth end | Premium feel |
| **Back** | `t² × ((s+1)t - s)` | Overshoot | Playful interactions |
| **Elastic** | `sin(t) × decay` | Oscillation | Spring-like bounce |
| **Bounce** | Piecewise parabolas | Multiple bounces | Landing effects |
| **Steps** | Discrete steps | Digital/retro | Typewriter, counters |

---

## PART 2: THREE.JS & WEBGL — THE PIXEL ENGINE

### 2.1 Why WebGL Changes Everything

The browser has two rendering systems:
1. **DOM/CSS**: Good for text, layout, simple animations. Limited to what CSS can do.
2. **Canvas/WebGL**: Good for graphics, 3D, particles, shaders. Limited only by GPU power.

Templates use only the DOM. Revolutionary design uses both — DOM for content, WebGL for atmosphere.

### 2.2 Custom GLSL Shaders

GLSL (OpenGL Shading Language) is code that runs directly on the GPU. It can process millions of pixels in parallel, creating effects that are impossible with CSS.

**Vertex Shader (positions vertices in 3D space):**

```glsl
uniform float uTime;        // Current time
uniform float uFrequency;   // Wave frequency
uniform float uAmplitude;   // Wave height

varying vec2 vUv;           // UV coordinates (passed to fragment)
varying float vElevation;   // Height (passed to fragment)

void main() {
  vUv = uv;
  
  // Create wave displacement
  float elevation = sin(position.x * uFrequency + uTime) * uAmplitude;
  elevation += sin(position.y * uFrequency * 0.5 + uTime * 0.8) * uAmplitude * 0.5;
  
  // Apply displacement to vertex position
  vec3 newPosition = position;
  newPosition.z = elevation;
  
  vElevation = elevation;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
```

**Fragment Shader (determines pixel color):**

```glsl
uniform float uTime;
uniform vec3 uColor1;       // Base color
uniform vec3 uColor2;       // Accent color
uniform float uOpacity;     // Transparency

varying vec2 vUv;
varying float vElevation;

void main() {
  // Mix colors based on elevation
  float mixFactor = (vElevation + 0.1) * 5.0;
  vec3 color = mix(uColor1, uColor2, mixFactor);
  
  // Add subtle noise for texture
  float noise = fract(sin(dot(vUv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  color += noise * 0.02;
  
  // Vignette effect
  float vignette = 1.0 - smoothstep(0.4, 1.4, length(vUv - 0.5) * 2.0);
  color *= vignette;
  
  gl_FragColor = vec4(color, uOpacity);
}
```

**Why this matters:**
Shaders can create liquid distortions, organic textures, impossible lighting, and visual effects that CSS cannot touch. They run on the GPU, so they're fast even with millions of pixels.

### 2.3 Procedural Noise — The Source of Organic Life

Random numbers look chaotic. Noise looks organic. The difference is that noise creates smooth gradients between random values, making it look like nature.

**Perlin Noise (smooth, organic):**

```glsl
// Hash function for noise
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// 2D Perlin noise
float perlinNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  
  // Cubic Hermite interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(
    mix(dot(hash(i + vec2(0,0)), f - vec2(0,0)),
        dot(hash(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash(i + vec2(1,1)), f - vec2(1,1)), u.x),
    u.y
  );
}

// Fractional Brownian Motion (layered noise for complexity)
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for (int i = 0; i < 6; i++) {
    value += amplitude * perlinNoise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}
```

**Why this matters:**
Noise creates organic, non-repeating patterns that look like nature — clouds, water, fire, smoke, terrain. Templates use solid colors and gradients. Noise makes things feel alive.

### 2.4 GPGPU Particles (100,000+ on GPU)

Standard JavaScript can handle ~1,000 particles before performance drops. GPU can handle 100,000+ because it processes them in parallel.

**The Technique: Store particle data in textures, compute on GPU:**

```javascript
// Create data texture
const particleCount = 100000;
const data = new Float32Array(particleCount * 4); // xyz + life

for (let i = 0; i < particleCount; i++) {
  data[i * 4 + 0] = (Math.random() - 0.5) * 10; // x position
  data[i * 4 + 1] = (Math.random() - 0.5) * 10; // y position
  data[i * 4 + 2] = (Math.random() - 0.5) * 10; // z position
  data[i * 4 + 3] = Math.random(); // life (0-1)
}

const dataTexture = new THREE.DataTexture(
  data,
  Math.sqrt(particleCount),
  Math.sqrt(particleCount),
  THREE.RGBAFormat,
  THREE.FloatType
);
dataTexture.needsUpdate = true;
```

**Why this matters:**
This creates particle systems that feel like weather, smoke, magic, or fire. Templates show static images. We create living, breathing particle worlds.

### 2.5 Post-Processing Stack

Post-processing adds cinematic quality — bloom, grain, vignette, chromatic aberration, motion blur.

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

const composer = new EffectComposer(renderer);

// Base render
composer.addPass(new RenderPass(scene, camera));

// Bloom (glow effect)
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.5,  // strength (intensity)
  0.4,  // radius (spread)
  0.85  // threshold (brightness cutoff)
);
composer.addPass(bloom);

// Film grain + vignette
const film = new FilmPass(0.35, 0.025, 648, false);
composer.addPass(film);

// Custom vignette shader
const vignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    darkness: { value: 1.5 },
    offset: { value: 1.2 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float darkness;
    uniform float offset;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - 0.5) * 2.0;
      float vignette = 1.0 - dot(uv, uv) * 0.3;
      texel.rgb *= mix(1.0, vignette, darkness);
      gl_FragColor = texel;
    }
  `,
};

const vignettePass = new ShaderPass(vignetteShader);
composer.addPass(vignettePass);
```

---

## PART 3: PROCEDURAL GENERATION — UNIQUE EVERY TIME

### 3.1 Boids (Flocking Algorithm)

Created by Craig Reynolds in 1987. Three simple rules create emergent flock behavior that looks alive.

**The Three Rules:**

```javascript
class Boid {
  constructor(x, y, z) {
    this.position = new THREE.Vector3(x, y, z);
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    this.acceleration = new THREE.Vector3();
    this.maxSpeed = 2;
    this.maxForce = 0.05;
  }
  
  // Rule 1: Separation (avoid crowding)
  separate(boids) {
    const desiredSeparation = 25;
    let steer = new THREE.Vector3();
    let count = 0;
    
    for (let other of boids) {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < desiredSeparation) {
        // Vector pointing away from neighbor
        const diff = this.position.clone().sub(other.position);
        diff.normalize();
        diff.divideScalar(d); // Weight by distance
        steer.add(diff);
        count++;
      }
    }
    
    if (count > 0) {
      steer.divideScalar(count);
      steer.normalize();
      steer.multiplyScalar(this.maxSpeed);
      steer.sub(this.velocity);
      steer.clampLength(0, this.maxForce);
    }
    
    return steer;
  }
  
  // Rule 2: Alignment (match velocity)
  align(boids) {
    const neighborDist = 50;
    let avg = new THREE.Vector3();
    let count = 0;
    
    for (let other of boids) {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < neighborDist) {
        avg.add(other.velocity);
        count++;
      }
    }
    
    if (count > 0) {
      avg.divideScalar(count);
      avg.normalize();
      avg.multiplyScalar(this.maxSpeed);
      avg.sub(this.velocity);
      avg.clampLength(0, this.maxForce);
    }
    
    return avg;
  }
  
  // Rule 3: Cohesion (steer toward center)
  cohesion(boids) {
    const neighborDist = 100;
    let center = new THREE.Vector3();
    let count = 0;
    
    for (let other of boids) {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < neighborDist) {
        center.add(other.position);
        count++;
      }
    }
    
    if (count > 0) {
      center.divideScalar(count);
      return this.seek(center);
    }
    
    return center;
  }
  
  // Seek: Steer toward a target
  seek(target) {
    const desired = target.clone().sub(this.position);
    desired.normalize();
    desired.multiplyScalar(this.maxSpeed);
    const steer = desired.sub(this.velocity);
    steer.clampLength(0, this.maxForce);
    return steer;
  }
  
  // Apply all rules
  flock(boids) {
    const sep = this.separate(boids).multiplyScalar(1.5);
    const ali = this.align(boids).multiplyScalar(1.0);
    const coh = this.cohesion(boids).multiplyScalar(1.0);
    
    this.acceleration.add(sep);
    this.acceleration.add(ali);
    this.acceleration.add(coh);
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.clampLength(0, this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0, 0);
    
    // Wrap around screen
    if (this.position.x > 100) this.position.x = -100;
    if (this.position.x < -100) this.position.x = 100;
    if (this.position.y > 100) this.position.y = -100;
    if (this.position.y < -100) this.position.y = 100;
    if (this.position.z > 100) this.position.z = -100;
    if (this.position.z < -100) this.position.z = 100;
  }
}
```

**Why this matters:**
Creates organic, bird-like flocking that is different every time. Templates show static grids. We create living, breathing systems.

### 3.2 Flow Fields

Particles follow a vector field created by noise. Creates fluid, wind-like movement.

```javascript
function createFlowField(cols, rows, scale, time) {
  const field = [];
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Perlin noise determines angle
      const angle = noise(x * scale, y * scale, time) * Math.PI * 2;
      field.push({
        x: Math.cos(angle),
        y: Math.sin(angle)
      });
    }
  }
  
  return field;
}

// Particles follow flow field
function updateParticles(particles, flowField, cols, scale) {
  for (let p of particles) {
    // Find which cell the particle is in
    const x = Math.floor(p.x / scale);
    const y = Math.floor(p.y / scale);
    const index = x + y * cols;
    
    // Apply flow field force
    if (flowField[index]) {
      p.vx += flowField[index].x * 0.1;
      p.vy += flowField[index].y * 0.1;
    }
    
    // Update position
    p.x += p.vx;
    p.y += p.vy;
    
    // Speed limit
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > 5) {
      p.vx = (p.vx / speed) * 5;
      p.vy = (p.vy / speed) * 5;
    }
    
    // Damping
    p.vx *= 0.99;
    p.vy *= 0.99;
    
    // Wrap around
    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
    if (p.y > height) p.y = 0;
    if (p.y < 0) p.y = height;
  }
}
```

### 3.3 Reaction-Diffusion (Gray-Scott Model)

Creates organic patterns like leopard spots, zebra stripes, coral growth, and chemical reactions.

```javascript
// Gray-Scott reaction-diffusion
function step(grid, next, cols, rows, params) {
  const { dA, dB, feed, kill } = params;
  
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      const i = x + y * cols;
      
      const a = grid[i].a;
      const b = grid[i].b;
      
      // Laplacian (neighbor averaging)
      const laplaceA = (
        grid[i-1].a + grid[i+1].a + 
        grid[i-cols].a + grid[i+cols].a - 
        4 * a
      );
      
      const laplaceB = (
        grid[i-1].b + grid[i+1].b + 
        grid[i-cols].b + grid[i+cols].b - 
        4 * b
      );
      
      // Reaction-diffusion formulas
      const abb = a * b * b;
      
      next[i].a = a + (dA * laplaceA - abb + feed * (1 - a));
      next[i].b = b + (dB * laplaceB + abb - (kill + feed) * b);
      
      // Clamp values
      next[i].a = Math.max(0, Math.min(1, next[i].a));
      next[i].b = Math.max(0, Math.min(1, next[i].b));
    }
  }
}

// Different parameter sets create different patterns
const patterns = {
  spots: { dA: 1.0, dB: 0.5, feed: 0.055, kill: 0.062 },
  stripes: { dA: 1.0, dB: 0.5, feed: 0.04, kill: 0.06 },
  spirals: { dA: 1.0, dB: 0.5, feed: 0.014, kill: 0.045 },
  coral: { dA: 1.0, dB: 0.5, feed: 0.062, kill: 0.063 },
};
```

### 3.4 Voronoi Diagrams

Partitions space into organic cells based on distance to seed points.

```javascript
function voronoi(points, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(width, height);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let minDist = Infinity;
      let secondMin = Infinity;
      
      for (let i = 0; i < points.length; i++) {
        const dx = x - points[i].x;
        const dy = y - points[i].y;
        const dist = dx * dx + dy * dy;
        
        if (dist < minDist) {
          secondMin = minDist;
          minDist = dist;
        } else if (dist < secondMin) {
          secondMin = dist;
        }
      }
      
      // Edge detection
      const edge = Math.sqrt(secondMin) - Math.sqrt(minDist);
      const idx = (y * width + x) * 4;
      
      // Color based on distance to edge
      if (edge < 2) {
        imageData.data[idx] = 255;     // R
        imageData.data[idx + 1] = 255; // G
        imageData.data[idx + 2] = 255; // B
      } else {
        imageData.data[idx] = 0;
        imageData.data[idx + 1] = 0;
        imageData.data[idx + 2] = 0;
      }
      imageData.data[idx + 3] = 255; // A
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
```

---

## PART 4: SCROLL-DRIVEN NARRATIVE — THE FILM, NOT THE DOCUMENT

### 4.1 GSAP ScrollTrigger Advanced Patterns

**Horizontal scroll section:**
```javascript
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-container",
    pin: true,
    scrub: 1,
    end: "+=3000"
  }
});
tl.to(".panel", { xPercent: -100, ease: "none" });
```

**Velocity-based reactions:**
```javascript
ScrollTrigger.create({
  trigger: element,
  onUpdate: (self) => {
    const velocity = self.getVelocity();
    gsap.to(element, {
      skewX: velocity * 0.001,
      duration: 0.3
    });
  }
});
```

**Batch animations (performance):**
```javascript
ScrollTrigger.batch(".reveal", {
  onEnter: batch => gsap.to(batch, { autoAlpha: 1, stagger: 0.15 }),
  start: "top 80%"
});
```

**Scroll-driven 3D camera path:**
```javascript
// Three.js camera controlled by scroll
gsap.to(camera.position, {
  z: 5,
  y: 2,
  scrollTrigger: {
    trigger: ".scene",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      camera.lookAt(target);
    }
  }
});
```

### 4.2 Lenis Smooth Scroll Internals

Lenis works by intercepting the browser's native scroll event and applying high-performance transform-based interpolation.

```javascript
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Connect to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

---

## PART 5: SSR DESIGN PATTERNS — SERVER-SIDE RENDERING

### 5.1 The Problem with Animations and SSR

Animations often conflict with SSR because they require browser APIs (`window`, DOM measurements) that don't exist on the server. This causes flickering, hydration mismatches, and layout shifts.

### 5.2 The Solution: Isomorphic Layout Effects

```javascript
import { useEffect, useLayoutEffect } from 'react';

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Usage
useIsomorphicLayoutEffect(() => {
  // This runs after DOM is ready but before paint
  const ctx = gsap.context(() => {
    gsap.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "expo.out"
    });
  }, scopeRef);
  
  return () => ctx.revert();
}, []);
```

### 5.3 GSAP + Next.js Integration

```typescript
// lib/gsap.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins ONCE, outside of component lifecycle
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default gsap;
export { ScrollTrigger };
```

```tsx
// components/AnimatedSection.tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

export default function AnimatedSection() {
  const scopeRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // gsap.context ensures proper cleanup
    const ctx = gsap.context(() => {
      gsap.from(".item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top 80%"
        }
      });
    }, scopeRef);
    
    return () => ctx.revert();
  }, { scope: scopeRef });
  
  return (
    <div ref={scopeRef}>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="item">Item 3</div>
    </div>
  );
}
```

### 5.4 SSR-Compatible Three.js

```tsx
// components/ThreeScene.tsx
'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Lazy load Three.js (never on server)
const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function ThreeScene() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Scene />
    </div>
  );
}
```

---

## PART 6: AUDIO-REACTIVE & ALIVE WEBSITES

### 6.1 Web Audio API Pipeline

```javascript
// Create audio analyzer
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
analyser.smoothingTimeConstant = 0.8;

// Connect source to analyzer
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Get frequency data
const dataArray = new Uint8Array(analyser.frequencyBinCount);

function animate() {
  analyser.getByteFrequencyData(dataArray);
  
  // Extract frequency bands
  const bass = dataArray.slice(0, 10).reduce((a, b) => a + b) / 10;
  const mid = dataArray.slice(10, 50).reduce((a, b) => a + b) / 40;
  const treble = dataArray.slice(50, 128).reduce((a, b) => a + b) / 78;
  
  // Normalize to 0-1
  const bassNorm = bass / 255;
  const midNorm = mid / 255;
  const trebleNorm = treble / 255;
  
  // Apply to visuals
  mesh.scale.setScalar(1 + bassNorm * 0.5);
  material.emissiveIntensity = midNorm * 2;
  particleSystem.rotation.y += trebleNorm * 0.02;
  
  requestAnimationFrame(animate);
}
```

### 6.2 Time-of-Day Responsive Design

```javascript
function getTimeOfDay() {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'evening';
  if (hour >= 20 && hour < 22) return 'dusk';
  return 'night';
}

const configs = {
  dawn: { bg: '#ffecd2', light: 0.6, warmth: 0.7, mood: 'serene' },
  morning: { bg: '#fff3e0', light: 0.9, warmth: 0.5, mood: 'energetic' },
  afternoon: { bg: '#ffffff', light: 1.0, warmth: 0.3, mood: 'focused' },
  evening: { bg: '#1a0000', light: 0.4, warmth: 0.8, mood: 'intimate' },
  dusk: { bg: '#2d1b69', light: 0.3, warmth: 0.6, mood: 'mysterious' },
  night: { bg: '#0a0a0a', light: 0.1, warmth: 0.2, mood: 'nocturnal' },
};
```

---

## PART 7: OPTICAL ILLUSIONS & IMPOSSIBLE GEOMETRY

### 7.1 Forced Perspective

```css
.impossible-stair {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #fff 25%, transparent 25%) -50px 0,
              linear-gradient(225deg, #fff 25%, transparent 25%) -50px 0,
              linear-gradient(315deg, #fff 25%, transparent 25%),
              linear-gradient(45deg, #fff 25%, transparent 25%);
  background-size: 100px 100px;
  transform: perspective(500px) rotateX(60deg) rotateZ(45deg);
}
```

### 7.2 Kanizsa Square (Illusory Contours)

Creates a square that doesn't exist — your brain fills it in. The visual system completes the shape even though no edges are drawn.

### 7.3 Motion Aftereffect

Staring at downward motion makes static elements appear to move up. This is a neural adaptation effect that can be used for subtle visual tricks.

### 7.4 Impossible Triangle (Penrose)

```javascript
// Three.js impossible geometry
function createPenroseTriangle() {
  const geometry = new THREE.BufferGeometry();
  
  // Manually place vertices to create impossible connection
  const vertices = new Float32Array([
    // Bottom face
    -1, -1, 0,
     1, -1, 0,
     0, -1, 1,
    
    // Left face
    -1, -1, 0,
     0,  1, 0,
     0, -1, 1,
    
    // Right face (the impossible part)
     1, -1, 0,
     0,  1, 0,
     0, -1, 1,
  ]);
  
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  
  return geometry;
}
```

---

## PART 8: THE GITHUB ECOSYSTEM

### 8.1 The Definitive Repositories

| Repository | Stars | Purpose |
|-----------|-------|---------|
| **terkelg/awesome-creative-coding** | 20k+ | Master list of creative coding tools |
| **AxiomeCG/awesome-threejs** | 2k+ | Three.js ecosystem tools |
| **pmndrs/react-three-fiber** | 26k+ | Declarative 3D with React |
| **pmndrs/drei** | 13k+ | R3F helper components |
| **greensock/gsap** | 18k+ | High-performance animation |
| **darkroomengineering/lenis** | 9k+ | Smooth scrolling |
| **theatre-js/theatre** | 12k+ | Animation editor in browser |
| **pixijs/pixijs** | 41k+ | 2D WebGL rendering |
| **Tonejs/Tone.js** | 32k+ | Interactive music |
| **goldfire/howler.js** | 24k+ | Audio management |
| **regl-project/regl** | 8k+ | Functional WebGL |
| **oframe/ogl** | 6k+ | Minimal WebGL |
| **pmndrs/postprocessing** | 5k+ | 3D post-effects |
| **patriciogv/lygia** | 2k+ | Shader library |
| **shader-park/shader-park-core** | 1k+ | Interactive procedural 3D |
| **pmndrs/cannon-es** | 1k+ | 3D physics engine |

### 8.2 Where to Find Experimental Work

- **Codrops Webzibition** — tympanus.net/codrops/webzibition
- **CodePen** — Search "WebGL", "GLSL", "Three.js", "GSAP"
- **Muzli Lists** — Boutique studios at the intersection of code and design
- **crawlspace.cool** — Experimental creative coding community
- **Awwwards Collection: Three.js** — awwwards.com/awwwards/collections/three-js

---

## SOURCES

- Robert Penner's Easing Equations
- Three.js Journey (Bruno Simon)
- GSAP Documentation & ScrollTrigger
- Codrops Technical Articles
- MDN Web Audio API
- The Book of Shaders (Patricio Gonzalez Vivo)
- Alvaro Montoro's CSS Illusions
- Kokichi Sugihara's Impossible Geometry
- Craig Reynolds' Boids Algorithm
- Gray-Scott Reaction-Diffusion Model
- WebGL Fundamentals
- React Three Fiber Documentation
- Next.js Server Components Documentation
