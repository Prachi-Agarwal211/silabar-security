'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: ref, dependencies: [strength] })

  return (
    <div ref={ref} className={`magnetic-btn ${className}`}>
      {children}
    </div>
  )
}
