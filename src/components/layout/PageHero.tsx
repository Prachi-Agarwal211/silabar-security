import React from 'react'
import Image from 'next/image'
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
  /** Photo background for location / industry style heroes */
  variant?: 'default' | 'image' | 'dark'
  imageSrc?: string
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  size = 'tall',
  outline = false,
  className = '',
  topContent,
  bottomContent,
  variant = 'default',
  imageSrc = '/why-silbar-bg.webp',
}: PageHeroProps) {
  const isShort = size === 'short' || size === 'compact'
  const isImage = variant === 'image'
  const isDark = variant === 'dark' || isImage

  const heroClass = [
    'page-hero',
    isShort ? 'page-hero--short' : 'page-hero--tall',
    isImage ? 'page-hero--image' : '',
    isDark ? 'page-hero--dark' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={heroClass}>
      {isImage && (
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="page-hero__media-img"
          />
          <div className="page-hero__media-scrim" />
        </div>
      )}
      <ScrollReveal className="page-hero__inner">
        {topContent}
        {eyebrow && (
          <span className={`page-eyebrow page-eyebrow--centered${isDark ? ' page-eyebrow--on-dark' : ''}`}>
            {eyebrow}
          </span>
        )}
        <h1 className={`page-hero-title ${outline ? 'page-hero-title--outline' : ''}`}>
          {title}
        </h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        {bottomContent}
      </ScrollReveal>
    </section>
  )
}
