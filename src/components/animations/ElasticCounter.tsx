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
    if (!counterRef.current) return

    const el = counterRef.current
    
    // Animate using CustomEase to simulate a spring physics bounce
    gsap.fromTo(
      el,
      { innerHTML: 0 },
      {
        innerHTML: value,
        duration: 2.5,
        ease: 'elastic.out(1, 0.4)', // Elastic bounce
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        snap: { innerHTML: 1 },
        onUpdate: function () {
          // Format with commas and prefix/suffix
          const currentVal = Math.round(Number(this.targets()[0].innerHTML))
          el.innerHTML = `${prefix}${currentVal.toLocaleString()}${suffix}`
        }
      }
    )
  }, { scope: counterRef })

  return (
    <span ref={counterRef} className="elastic-counter">
      {prefix}0{suffix}
    </span>
  )
}
