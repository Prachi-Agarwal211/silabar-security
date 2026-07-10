'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

interface CounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function Counter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${prefix}${to}${suffix}`
      return
    }

    const obj = { value: from }
    el.textContent = `${prefix}${from}${suffix}`

    gsap.to(obj, {
      value: to,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
      },
      // ponytail: spring overshoot at end
      onComplete: () => {
        gsap.fromTo(el,
          { scale: 1.15 },
          { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' },
        )
      },
    })
  }, { scope: ref, dependencies: [from, to, duration, suffix, prefix] })

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {prefix}{to}{suffix}
    </span>
  )
}
