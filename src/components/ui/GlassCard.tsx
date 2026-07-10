'use client'

import { useRef, useEffect, useState } from 'react'
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
  const outerRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const [isTouchDevice] = useState(() =>
    typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  const effectiveTilt = tilt && !isTouchDevice

  const Component = as || (href ? Link : 'div')

  useEffect(() => {
    if (!effectiveTilt || !innerRef.current || !outerRef.current) return;

    const inner = innerRef.current;
    const outer = outerRef.current;
    
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateTransform = () => {
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      
      inner.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        animationFrameId = requestAnimationFrame(updateTransform);
      } else {
        inner.style.transform = (targetX === 0 && targetY === 0) ? 'none' : inner.style.transform;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = outer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = -y * 10;
      targetY = x * 10;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateTransform);
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateTransform);
    };

    outer.addEventListener('mousemove', handleMouseMove);
    outer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      outer.removeEventListener('mousemove', handleMouseMove);
      outer.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effectiveTilt]);

  return (
    <Component
      ref={outerRef}
      href={href}
      className={className}
      style={{
        ...style,
      }}
      {...props}
    >
      <div 
        ref={innerRef}
        className="glass-card"
        style={{
          width: '100%',
          height: '100%',
          '--glass-opacity': opacity,
          '--glass-blur': blur,
          '--glass-border-opacity': borderOpacity,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </Component>
  )
}
