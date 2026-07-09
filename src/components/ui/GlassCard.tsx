'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  blur?: string
  opacity?: number
  borderOpacity?: number
  tilt?: boolean
  as?: any
  href?: string
  target?: string
  rel?: string
  style?: React.CSSProperties
}

export function GlassCard({
  children,
  className = '',
  blur = '10px',
  opacity = 0.03,
  borderOpacity = 0.12,
  tilt = false,
  as,
  href,
  style,
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const Component = as || (href ? Link : 'div')

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotation({ x: -y * 10, y: x * 10 })
  }

  const handleMouseLeave = () => {
    if (tilt) setRotation({ x: 0, y: 0 })
  }

  return (
    <Component
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card ${className}`}
      style={{
        ...style,
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur})`,
        WebkitBackdropFilter: `blur(${blur})`,
        border: `1px solid rgba(191, 149, 63, ${borderOpacity})`,
        borderRadius: '12px',
        transform: tilt ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
        transition: (rotation.x === 0 && rotation.y === 0) 
          ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s, background 0.3s' 
          : 'border-color 0.3s, background 0.3s',
      }}
      {...props}
    >
      {children}
    </Component>
  )
}
