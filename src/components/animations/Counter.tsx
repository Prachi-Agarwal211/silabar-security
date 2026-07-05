'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function Counter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const countRef = useRef({ value: 0 })

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    gsap.to(countRef.current, {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (el) {
          el.textContent = `${prefix}${Math.round(countRef.current.value)}${suffix}`
        }
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: ref, dependencies: [end, suffix, prefix, duration] })

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
