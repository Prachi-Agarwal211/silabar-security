'use client'

import { useRef, MouseEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, Building2, Factory, Heart, Hotel, Warehouse, GraduationCap, ShoppingBag, Landmark, Server, Car, Globe, Home, Zap, Shirt, Sun, Flame, Truck } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import type { Industry } from '@/data/industries'

// Icon map for industries
const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  'manufacturing': Factory,
  'hospitals': Heart,
  'hotels': Hotel,
  'warehouses': Warehouse,
  'banks': Landmark,
  'corporate': Building2,
  'education': GraduationCap,
  'retail': ShoppingBag,
  'data-centers': Server,
  'government': Globe,
  'residential': Home,
  'infrastructure': Car,
  'automobile': Car,
  'pharma': Zap,
  'textile': Shirt,
  'solar-plants': Sun,
  'mining': Flame,
  'e-commerce': Truck,
  'commercial-buildings': Building2,
}

const DEFAULT_ICON = Building2

interface IndustriesGridProps {
  industries: Industry[]
}

export default function IndustriesGrid({ industries }: IndustriesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.industry-photo-card')
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.08, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      }
    )
  }, { scope: containerRef })

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    // Only apply 3D effect on desktop devices with hover
    if (window.matchMedia('(hover: none)').matches) return;
    
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  }

  return (
    <div className="industries-card-grid" ref={containerRef}>
      {industries.map((industry, i) => {
        const Icon = INDUSTRY_ICONS[industry.slug] || DEFAULT_ICON
        return (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="industry-photo-card"
            style={{ background: 'var(--color-midnight-900)' }}
            aria-label={`${industry.shortTitle || industry.title} security solutions`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Card number */}
            <span className="industry-photo-card__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {/* Icon */}
            <div className="industry-photo-card__icon" aria-hidden="true">
              <Icon size={24} strokeWidth={1.6} />
            </div>
            {/* Content */}
            <div className="industry-photo-card__content">
              <h3 className="industry-photo-card__title">
                {industry.shortTitle || industry.title}
              </h3>
              <p className="industry-photo-card__desc">
                {industry.description?.slice(0, 90)}…
              </p>
              <span className="industry-photo-card__arrow" aria-hidden="true">
                Explore <ArrowRight size={12} />
              </span>
            </div>
            {/* Soft photo texture layer for depth */}
            <div
              className="industry-photo-card__texture"
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: i % 3 === 0
                  ? "url('/industries-bg.webp')"
                  : i % 3 === 1
                    ? "url('/why-silbar-bg.webp')"
                    : "url('/hero-guard.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.18,
                mixBlendMode: 'overlay',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {/* Scrim overlay */}
            <div className="industry-photo-card__scrim" aria-hidden="true" />
          </Link>
        )
      })}
    </div>
  )
}
