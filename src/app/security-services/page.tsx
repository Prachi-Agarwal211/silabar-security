import type { Metadata } from 'next'
import Link from 'next/link'
import { STATES, CITIES } from '@/data/locations'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { MapPin, ArrowRight } from 'lucide-react'
import { ogMetadata } from '@/lib/metadata'
import '@/styles/pages/services-listing.css'

export const metadata: Metadata = {
  title: 'Security Services Across India | Silbar Security',
  description: 'Silbar Security provides professional security guard services, CCTV surveillance, and facility management across all major cities and states in India.',
  ...ogMetadata('Security Services Across India', 'Professional security guard services across India.', '/security-services')
}

export default function LocationsIndexPage() {
  const topCities = CITIES.filter(c => c.tier === 1).slice(0, 12);
  
  return (
    <main className="page-main">
      <PageHero 
        title={<SplitTextReveal text="Service Locations" />}
        subtitle="Professional security guard services across India. We operate in all major states and cities, delivering compliant, ISO-certified security solutions."
      />

      <section className="services-grid-section">
        <div className="services-grid-container">
          <ScrollReveal>
            <div className="services-grid-header">
              <h2>Top Cities We Serve</h2>
              <p>Providing manned guarding and electronic surveillance in India's leading economic hubs.</p>
            </div>
          </ScrollReveal>
          
          <div className="services-grid">
            {topCities.map((city, i) => (
              <ScrollReveal key={city.slug} delay={i * 0.05}>
                <Link href={`/security-services/city/${city.slug}`} className="service-card group">
                  <div className="service-card__icon-wrapper">
                    <MapPin size={24} className="service-card__icon text-cherry" />
                  </div>
                  <h3 className="service-card__title">{city.name}</h3>
                  <p className="service-card__desc">
                    Professional security services in {city.name}, {city.state}.
                  </p>
                  <span className="service-card__link">
                    View Coverage <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-grid-section" style={{ background: 'var(--color-paper)' }}>
        <div className="services-grid-container">
          <ScrollReveal>
            <div className="services-grid-header">
              <h2>All States & Territories</h2>
              <p>Select your state to view detailed coverage areas and district operations.</p>
            </div>
          </ScrollReveal>
          
          <div className="services-grid">
            {STATES.map((state, i) => (
              <ScrollReveal key={state.slug} delay={i * 0.05}>
                <Link href={`/security-services/${state.slug}`} className="service-card group">
                  <div className="service-card__icon-wrapper">
                    <MapPin size={24} className="service-card__icon text-gold" />
                  </div>
                  <h3 className="service-card__title">{state.name}</h3>
                  <p className="service-card__desc">
                    Serving {state.population} across {state.districts} districts.
                  </p>
                  <span className="service-card__link">
                    Explore {state.name} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
