'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // ponytail: random variance for organic feel
    const randomDelay = delay + (Math.random() - 0.5) * 0.04

    const fromVars: Record<string, unknown> = { opacity: 0 }
    if (direction === 'up') fromVars.y = 60
    else if (direction === 'down') fromVars.y = -60
    else if (direction === 'left') fromVars.x = 60
    else if (direction === 'right') fromVars.x = -60

    gsap.from(el, {
      ...fromVars,
      duration: 0.8,
      delay: randomDelay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
