import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null

const tickerCallback = (time: number) => {
  if (lenis) lenis.raf(time * 1000)
}

export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
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
