import React from 'react'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: any
  gradient?: string
  style?: React.CSSProperties
}

export function GradientText({ 
  children, 
  className = '', 
  as: Component = 'span',
  gradient = 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light), #fff, var(--color-gold))',
  style
}: GradientTextProps) {
  return (
    <Component
      className={`gradient-text ${className}`}
      style={{
        ...style,
        background: gradient,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </Component>
  )
}
