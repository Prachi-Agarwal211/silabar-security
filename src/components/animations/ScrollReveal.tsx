'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const fromVars = {
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
      opacity: 0,
    }

    gsap.from(el, {
      ...fromVars,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: ref, dependencies: [direction, delay, duration] })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
