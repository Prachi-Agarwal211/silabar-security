import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null
let tickerCallback: ((time: number) => void) | null = null

export function initLenis(): Lenis {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
  })

  lenis.on('scroll', ScrollTrigger.update)

  tickerCallback = (time: number) => {
    if (lenis) lenis.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroyLenis() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback)
    tickerCallback = null
  }
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

export function getLenis(): Lenis | null {
  return lenis
}

export type { Lenis }
