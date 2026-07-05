'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  href?: string
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const btn = btnRef.current
    const inner = innerRef.current
    if (!btn || !inner) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const handleMove = (evt: Event) => {
      const e = evt as MouseEvent
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(inner, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleLeave = () => {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    btn.addEventListener('mousemove', handleMove)
    btn.addEventListener('mouseleave', handleLeave)

    return () => {
      btn.removeEventListener('mousemove', handleMove)
      btn.removeEventListener('mouseleave', handleLeave)
    }
  })

  const Tag = href ? 'a' : 'button'
  const extraProps = href ? { href } : {}

  return (
    <Tag
      ref={btnRef as never}
      className={`relative inline-block ${className}`}
      {...extraProps}
    >
      <div ref={innerRef} className="relative z-10">
        {children}
      </div>
    </Tag>
  )
}
