'use client'

import { useRef, useCallback } from 'react'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  strength?: number
  className?: string
  as?: string | React.ComponentType<any>
  href?: string
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function MagneticButton({ children, strength = 0.3, className = '', as: Component = 'button', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    ref.current.style.transform = `translate(${middleX * strength}px, ${middleY * strength}px)`
    ref.current.style.transition = 'none'
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
    ref.current.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  }, [])

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-button ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
