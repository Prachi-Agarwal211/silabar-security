'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // ponytail: random variance for organic feel
      const randomDelay = delay + (Math.random() - 0.5) * 0.04

      // ponytail: reduce distance on mobile for snappier feel
      const isMobile = window.innerWidth < 768
      const distance = isMobile ? 30 : 60
      const fromVars: Record<string, unknown> = { opacity: 0, filter: 'blur(8px)' }
      if (direction === 'up') fromVars.y = distance
      else if (direction === 'down') fromVars.y = -distance
      else if (direction === 'left') fromVars.x = distance
      else if (direction === 'right') fromVars.x = -distance

      const anim = gsap.from(el, {
        ...fromVars,
        duration: 1.2,
        delay: randomDelay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      return () => {
        anim.scrollTrigger?.kill()
        anim.kill()
      }
    })

    return () => mm.revert()
  }, [delay, direction])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
