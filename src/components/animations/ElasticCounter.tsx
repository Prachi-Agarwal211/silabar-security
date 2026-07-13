'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

interface ElasticCounterProps {
  value: number
  prefix?: string
  suffix?: string
}

export default function ElasticCounter({
  value,
  prefix = '',
  suffix = ''
}: ElasticCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const el = counterRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`
      return
    }

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2.5,
      ease: 'elastic.out(1, 0.4)',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`
      },
    })
  }, { scope: counterRef, dependencies: [value, prefix, suffix] })

  return (
    <span ref={counterRef} className="elastic-counter">
      {prefix}0{suffix}
    </span>
  )
}