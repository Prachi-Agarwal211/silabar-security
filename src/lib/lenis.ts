import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null

const tickerCallback = (time: number) => {
  if (lenis) lenis.raf(time * 1000)
}

export function initLenis() {
  if (lenis) return lenis

  // ponytail: shorter duration on mobile for snappier scroll
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  lenis = new Lenis({
    duration: isMobile ? 0.8 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: isMobile ? 1.5 : 2,
  })

  // Sync Lenis → ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Drive Lenis from GSAP ticker (not its own RAF)
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
