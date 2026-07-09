// Cinematic Custom Easing Curves
// Source: Codrops GSAP tutorial + Lusion pipeline adaptation

// GSAP CustomEase curves for cinematic motion
import gsap from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';

gsap.registerPlugin(CustomEase);

export const cinematicEases = {
  // Fast start, dramatic slow-down. Best for entrances.
  expoOut: 'M0,0 C0.16,1 0.3,1 1,1',

  // Slow start, fast finish. Best for exits.
  expoIn: 'M0,0 C0.55,0 1,0.45 1,1',

  // Smooth both ends. Best for page transitions.
  expoInOut: 'M0,0 C0.7,0 0.3,1 1,1',

  // Slight overshoot at end. Best for general UI.
  smooth: 'M0,0 C0.22,1 0.36,1 1,1',

  // Bouncy spring. Best for playful elements, notifications.
  spring: 'M0,0 C0.34,1.56 0.64,1 1,1',

  // Dramatic entrance with anticipation.
  dramaticIn: 'M0,0 C0.12,1 0.2,1 1,1',

  // Elastic overshoot for magnetic snaps — snappier than spring.
  elasticSnap: 'M0,0 C0.6,-0.2 0.8,1.3 1,1',

  // Smooth drift for ambient/continuous motion.
  drift: 'M0,0 C0.42,0 0.58,1 1,1'
}

// CSS cubic-bezier equivalents
export const cssEases = {
  expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  expoIn: 'cubic-bezier(0.55, 0, 1, 0.45)',
  expoInOut: 'cubic-bezier(0.7, 0, 0.3, 1)',
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
}

// Usage guide
export const easeGuide = {
  'Element entrance': 'expoOut',
  'Element exit': 'expoIn',
  'Page transition': 'expoInOut',
  'Scroll reveal': 'smooth',
  'Button hover': 'smooth',
  'Card hover': 'smooth',
  'Magnetic snap': 'spring',
  'Notification': 'spring',
  'Hero headline': 'dramaticIn',
  'Ambient float': 'drift',
  'Modal entrance': 'expoOut',
  'Modal exit': 'expoIn'
}
