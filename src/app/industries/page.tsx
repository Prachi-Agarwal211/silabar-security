import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { INDUSTRIES } from '@/data/industries'
import { ArrowRight, Phone, Building2, Factory, Heart, Hotel, Warehouse, GraduationCap, ShoppingBag, Landmark, Server, Car, Globe, Home } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Industries We Serve — Security for Every Sector',
  description:
    'Silbar Security provides specialized security solutions for manufacturing, hospitals, hotels, warehouses, banks, corporate offices, data centres, government, and more.',
  ...ogMetadata('Industries We Serve — Security for Every Sector', 'Silbar Security provides specialized security solutions for manufacturing, hospitals, hotels, warehouses, banks, corporate offices, data centres, government, and more.', '/industries'),
}

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
}
const DEFAULT_ICON = Building2

export default function IndustriesPage() {
  return (
    <main className="industries-page" id="main-content">
      <section className="industries-hero">
        <ScrollReveal className="industries-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Industries</span>
          </nav>
          <span className="page-eyebrow">WHERE WE OPERATE</span>
          <h1 className="industries-title">
            <SplitTextReveal text="12 INDUSTRIES." />
            <br />
            <span className="industries-title--outline">
              <SplitTextReveal text="ONE STANDARD." delay={0.2} />
            </span>
          </h1>
          <p className="industries-subtitle">
            Every industry has unique security challenges. We&apos;ve built specialised teams for each one — trained, certified, and deployed with zero compromise.
          </p>
        </ScrollReveal>
      </section>

      {/* Industries grid — styled like services panels */}
      <section className="services-comic-section services-comic-section--padded">
        <div className="services-comic-header">
          <div className="services-comic-eyebrow">Sectors We Cover</div>
          <h2 className="services-comic-heading">
            INDUSTRY{' '}
            <span className="outline">EXPERTISE.</span>
          </h2>
        </div>
        <div className="services-comic-container">
          <div className="services-comic-grid">
            {INDUSTRIES.map((industry, i) => {
              const Icon = INDUSTRY_ICONS[industry.slug] || DEFAULT_ICON
              const isInverted = [1, 4, 8].includes(i)
              const numeral = String(i + 1).padStart(2, '0')
              const spanClasses = [
                'panel-span-2x2', 'panel-span-1x1', 'panel-span-1x1',
                'panel-span-2x1', 'panel-span-1x1', 'panel-span-1x1',
                'panel-span-2x1', 'panel-span-1x1', 'panel-span-1x1',
                'panel-span-1x1', 'panel-span-1x1', 'panel-span-2x1',
              ]
              return (
                <ScrollReveal key={industry.slug} delay={i * 0.04}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className={`services-comic-panel ${spanClasses[i] || 'panel-span-1x1'} ${isInverted ? 'is-inverted' : ''}`}
                    style={{ display: 'flex', height: '100%' }}
                  >
                    <div className="services-comic-numeral">{numeral}</div>
                    <div className="services-comic-icon">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="services-comic-content">
                      <h2 className="services-comic-title">{industry.shortTitle || industry.title}</h2>
                      <p className="services-comic-desc">{industry.description?.slice(0, 110)}…</p>
                      <span className="services-comic-arrow">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Need Industry-Specific Security?</h2>
        <p className="service-detail-bottom-cta__sub">
          Every industry has unique risks. Let our consultants design a tailored solution for your facility.
        </p>
        <div className="service-detail-ctas service-detail-ctas--centered">
          <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
            <Phone size={16} /> Call Now
          </a>
          <a
            href={CONTACT.whatsapp.url}
            className="service-detail-cta service-detail-cta--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  )
}
