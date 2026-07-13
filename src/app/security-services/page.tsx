import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { STATES, CITIES } from '@/data/locations'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'
import { CONTACT } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Security Services Across India | Cities & States | Silbar Security',
  description:
    'Silbar Security provides professional security guard services across all major cities and states in India. Find coverage near you — Jaipur, Delhi, Ahmedabad and 200+ cities.',
  ...ogMetadata(
    'Security Services Across India | Cities & States',
    'Professional security guard services across India. Find your city or state.',
    '/security-services'
  ),
}

export default function LocationsIndexPage() {
  const topCities = CITIES.filter((c) => c.tier === 1).slice(0, 12)

  return (
    <main className="locations-page" id="main-content">
      {/* ─── Hero ─── */}
      <section className="locations-hero" aria-labelledby="locations-heading">
        <div className="locations-hero__media" aria-hidden="true">
          <Image
            src="/why-silbar-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="locations-hero__img"
          />
          <div className="locations-hero__scrim" />
        </div>
        <div className="locations-hero__inner">
          <nav className="breadcrumb breadcrumb--on-dark" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Locations</span>
          </nav>
          <span className="section-eyebrow section-eyebrow--light">PAN INDIA COVERAGE</span>
          <h1 id="locations-heading" className="locations-hero__title">
            Security Services Across <em>India.</em>
          </h1>
          <p className="locations-hero__sub">
            Professional manned guarding, CCTV, and facility security across major states and cities.
            ISO-certified processes. Local deployment. National standards.
          </p>
          <div className="locations-hero__meta">
            <span>{STATES.length}+ States &amp; UTs</span>
            <span>{CITIES.length}+ Cities</span>
            <span>HQ Jaipur · Hubs Delhi · Ahmedabad</span>
          </div>
          <div className="industries-hero__ctas" style={{ marginTop: '0.5rem' }}>
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-primary btn-primary--on-dark">
              <Phone size={14} aria-hidden="true" /> {CONTACT.phone}
            </a>
            <a href="#top-cities" className="btn-secondary btn-secondary--on-dark">
              Browse Cities <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Office hubs ─── */}
      <section className="locations-section" aria-labelledby="hubs-heading">
        <div className="locations-section__inner">
          <div className="locations-section__header">
            <span className="section-eyebrow section-eyebrow--red">OUR HUBS</span>
            <h2 id="hubs-heading" className="section-heading">
              Regional <em>Presence.</em>
            </h2>
            <p>Core offices that coordinate deployment, audits, and client support across India.</p>
          </div>
          <div className="locations-hubs">
            {CONTACT.officeLocations.map((office) => (
              <div key={office.city} className="locations-hub">
                <span className="locations-hub__badge">{office.badge}</span>
                <h3>{office.city}</h3>
                <p>{office.address}</p>
                <a href={`tel:${office.phoneRaw}`}>{office.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Top cities ─── */}
      <section className="locations-section locations-section--alt" id="top-cities" aria-labelledby="cities-heading">
        <div className="locations-section__inner">
          <ScrollReveal className="locations-section__header">
            <span className="section-eyebrow section-eyebrow--red">TOP CITIES</span>
            <h2 id="cities-heading" className="section-heading">
              Major Economic <em>Hubs.</em>
            </h2>
            <p>Manned guarding and electronic surveillance in India&apos;s leading commercial centres.</p>
          </ScrollReveal>

          <div className="locations-city-grid">
            {topCities.map((city, i) => (
              <ScrollReveal key={city.slug} delay={Math.min(i * 0.04, 0.4)}>
                <Link href={`/security-services/city/${city.slug}`} className="location-city-card">
                  <span className="location-city-card__icon" aria-hidden="true">
                    <MapPin size={18} />
                  </span>
                  <h3 className="location-city-card__title">{city.name}</h3>
                  <p className="location-city-card__desc">
                    Security services in {city.name}, {city.state}. Guards, CCTV &amp; facility coverage.
                  </p>
                  <span className="location-city-card__arrow">
                    View coverage <ArrowRight size={12} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── All states ─── */}
      <section className="locations-section" aria-labelledby="states-heading">
        <div className="locations-section__inner">
          <ScrollReveal className="locations-section__header">
            <span className="section-eyebrow section-eyebrow--red">ALL STATES</span>
            <h2 id="states-heading" className="section-heading">
              Choose Your <em>State.</em>
            </h2>
            <p>Select a state to explore major cities, districts, and local security coverage.</p>
          </ScrollReveal>

          <div className="locations-state-grid">
            {STATES.map((state, i) => (
              <ScrollReveal key={state.slug} delay={Math.min(i * 0.02, 0.3)}>
                <Link href={`/security-services/${state.slug}`} className="location-state-card">
                  <span className="location-state-card__pin" aria-hidden="true">
                    <MapPin size={18} />
                  </span>
                  <div className="location-state-card__body">
                    <h3 className="location-state-card__title">{state.name}</h3>
                    <p className="location-state-card__meta">
                      {state.population} · {state.districts} districts
                    </p>
                  </div>
                  <ArrowRight size={16} className="location-state-card__go" aria-hidden="true" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageLeadSection
        title="Need Security in Your City?"
        subtitle="Select a location above or request a quote — we cover 200+ cities across India."
      />
    </main>
  )
}
