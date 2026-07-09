'use client'

import { useRef, useState } from 'react'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  strength?: number
  className?: string
  as?: any
  href?: string
  target?: string
  rel?: string
  onClick?: (e: any) => void
}

export function MagneticButton({ children, strength = 0.3, className = '', as: Component = 'button', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * strength, y: middleY * strength })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-button ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
      }}
      {...props}
    >
      {children}
    </Component>
  )
}
