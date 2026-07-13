import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null

const tickerCallback = (time: number) => {
  if (lenis) lenis.raf(time * 1000)
}

export function initLenis() {
  if (typeof window === 'undefined') return null
  if (lenis) return lenis

  // Respect reduced motion — native scroll is better for a11y & battery
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return null

  const isMobile = window.matchMedia('(max-width: 767px)').matches
  // MacBook / desktop: slightly longer cinematic glide
  const isMacWide = window.matchMedia('(min-width: 1280px)').matches

  lenis = new Lenis({
    duration: isMobile ? 0.75 : isMacWide ? 1.15 : 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: isMobile ? 1.4 : 1.8,
    smoothWheel: true,
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroyLenis() {
  if (lenis) {
    gsap.ticker.remove(tickerCallback)
    lenis.destroy()
    lenis = null
  }
}
