'use client'

import { useRef, useState } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  intensity?: number
  className?: string
}

export default function MagneticButton({
  children,
  intensity = 0.3,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate(0, 0) scale(1)')

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * intensity
    const deltaY = (e.clientY - centerY) * intensity

    // ponytail: warp effect — non-uniform scale based on distance
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const warp = 1 + dist * 0.001

    setTransform(`translate(${deltaX}px, ${deltaY}px) scale(${warp})`)
  }

  const handleMouseLeave = () => {
    setTransform('translate(0, 0) scale(1)')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      style={{ transform, willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
