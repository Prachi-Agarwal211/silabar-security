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

// Industry gradient backgrounds
const INDUSTRY_GRADIENTS: Record<string, string> = {
  'manufacturing': 'linear-gradient(135deg, #1a0e08 0%, #3d2210 100%)',
  'hospitals':     'linear-gradient(135deg, #0a0d1a 0%, #111630 100%)',
  'hotels':        'linear-gradient(135deg, #08120a 0%, #122018 100%)',
  'warehouses':    'linear-gradient(135deg, #0d0808 0%, #251010 100%)',
  'banks':         'linear-gradient(135deg, #080a0d 0%, #141824 100%)',
  'corporate':     'linear-gradient(135deg, #0d0a12 0%, #1c1530 100%)',
  'education':     'linear-gradient(135deg, #0a0d0a 0%, #121f12 100%)',
  'retail':        'linear-gradient(135deg, #12080a 0%, #2a1015 100%)',
  'data-centers':  'linear-gradient(135deg, #050810 0%, #0a1020 100%)',
  'government':    'linear-gradient(135deg, #100800 0%, #251a00 100%)',
  'residential':   'linear-gradient(135deg, #080d10 0%, #101820 100%)',
  'infrastructure':'linear-gradient(135deg, #0d0808 0%, #201010 100%)',
  'automobile':    'linear-gradient(135deg, #0a0d12 0%, #152030 100%)',
  'pharma':        'linear-gradient(135deg, #0a120a 0%, #152a15 100%)',
  'textile':       'linear-gradient(135deg, #120a10 0%, #2a1520 100%)',
  'solar-plants':  'linear-gradient(135deg, #12100a 0%, #2a2515 100%)',
  'mining':        'linear-gradient(135deg, #120a05 0%, #2a1508 100%)',
  'e-commerce':    'linear-gradient(135deg, #0a0a12 0%, #151530 100%)',
  'commercial-buildings': 'linear-gradient(135deg, #0d0a0d 0%, #1c151c 100%)',
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
        const gradient = INDUSTRY_GRADIENTS[industry.slug] || 'linear-gradient(135deg, #0d0808 0%, #201010 100%)'
        return (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="industry-photo-card"
            style={{ background: gradient }}
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
            {/* Scrim overlay */}
            <div className="industry-photo-card__scrim" aria-hidden="true" />
          </Link>
        )
      })}
    </div>
  )
}
