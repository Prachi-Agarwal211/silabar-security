'use client'

import React from 'react'
import ScrollReveal from '@/components/animations/ScrollReveal'

interface PageHeroProps {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  size?: 'tall' | 'short' | 'compact'
  outline?: boolean
  className?: string
  topContent?: React.ReactNode
  bottomContent?: React.ReactNode
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  size = 'tall',
  outline = false,
  className = '',
  topContent,
  bottomContent
}: PageHeroProps) {
  const isShort = size === 'short' || size === 'compact'
  const heroClass = `page-hero ${isShort ? 'page-hero--short' : 'page-hero--tall'} ${className}`

  return (
    <section className={heroClass}>
      <ScrollReveal className="page-hero__inner">
        {topContent}
        {eyebrow && (
          <span className="page-eyebrow page-eyebrow--centered">{eyebrow}</span>
        )}
        <h1 className={`page-hero-title ${outline ? 'page-hero-title--outline' : ''}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="page-hero-subtitle">
            {subtitle}
          </p>
        )}
        {bottomContent}
      </ScrollReveal>
    </section>
  )
}
