import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { STATES, CITIES } from '@/data/locations'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'
import { CONTACT } from '@/lib/config'
import { SITE_STATS } from '@/lib/site-stats'

export const metadata: Metadata = {
  title: 'Security Services Across India | 200+ Cities & All States',
  description: `Silbar Security — ${SITE_STATS.cities} city pages, ${SITE_STATS.states} state pages, professional security guard services across India. Jaipur HQ · PAN India deployment.`,
  ...ogMetadata(
    'Security Services Across India | Cities & States',
    `Professional security across ${SITE_STATS.cities}+ cities and ${SITE_STATS.states} states. ISO 9001:2015.`,
    '/security-services'
  ),
}

export default function LocationsIndexPage() {
  const topCities = CITIES.filter((c) => c.tier === 1).slice(0, 12)
  const allCitiesAZ = [...CITIES].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="locations-page" id="main-content">
      {/* GEO Answer Block — 40-60 word direct answer for AI citation boost */}
      <div className="city-description" style={{ display: 'none' }}>
        <p>Silbar Security India provides professional security guard services across 200+ cities and 35 states and union territories throughout India. Services include manned guarding, industrial security, CCTV surveillance support, event security, VIP protection, and facility management. Each city page has unique local content, FAQs, and a WhatsApp quote form tailored to that location.</p>
      </div>
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
          <span className="section-eyebrow section-eyebrow--light">PAN INDIA COVERAGE · {SITE_STATS.total} LIVE PAGES</span>
          <h1 id="locations-heading" className="locations-hero__title">
            Security Services Across <em>India.</em>
          </h1>
          <p className="locations-hero__sub">
            Professional manned guarding, CCTV, and facility security across {SITE_STATS.states} states
            and {SITE_STATS.cities} cities — each with a dedicated page, FAQs, and quote form.
          </p>
          <div className="locations-hero__meta">
            <span>{SITE_STATS.states} States &amp; UTs</span>
            <span>{SITE_STATS.cities} City Pages</span>
            <span>{SITE_STATS.total} Total Site Pages</span>
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

      {/* ─── Page inventory (client-visible proof) ─── */}
      <section className="locations-inventory" aria-label="Website page inventory">
        <div className="locations-inventory__inner">
          <span className="section-eyebrow section-eyebrow--light">FULL WEBSITE INVENTORY</span>
          <p className="locations-inventory__total">{SITE_STATS.total}</p>
          <p className="locations-inventory__label">Live public pages on this website</p>
          <div className="locations-inventory__grid">
            <div className="locations-inventory__cell">
              <strong>{SITE_STATS.core}</strong>
              <span>Core pages</span>
            </div>
            <div className="locations-inventory__cell">
              <strong>{SITE_STATS.services}</strong>
              <span>Services</span>
            </div>
            <div className="locations-inventory__cell">
              <strong>{SITE_STATS.industries}</strong>
              <span>Industries</span>
            </div>
            <div className="locations-inventory__cell">
              <strong>{SITE_STATS.states}</strong>
              <span>States / UTs</span>
            </div>
            <div className="locations-inventory__cell">
              <strong>{SITE_STATS.cities}</strong>
              <span>Cities</span>
            </div>
            <div className="locations-inventory__cell">
              <strong>{SITE_STATS.blog}</strong>
              <span>Blog posts</span>
            </div>
          </div>
          <p className="locations-inventory__note">
            Verified in sitemap:{' '}
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              /sitemap.xml
            </a>
            {' '}· {SITE_STATS.locationPages} location pages (states + cities) alone
          </p>
        </div>
      </section>

      {/* ─── Why coverage matters ─── */}
      <section className="section-pad" aria-labelledby="coverage-title">
        <div className="shell">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">OUR COVERAGE PHILOSOPHY</span>
            <h2 id="coverage-title" className="section-heading" style={{ marginBottom: '1rem' }}>
              Security Without <em>Boundaries.</em>
            </h2>
            <div style={{ maxWidth: '800px' }}>
              <p style={{ fontFamily: 'var(--font-body)', lineHeight: 1.8, color: 'var(--color-horizon-600)', marginBottom: '1rem' }}>
                India&apos;s security needs are not limited to metro cities. Businesses operate in tier-2
                and tier-3 cities, industrial corridors, emerging manufacturing hubs, and remote commercial
                centres — and every one of these locations deserves professional, ISO-certified security
                services. Silbar Security has built its PAN India network to ensure that geographic location
                never compromises security quality.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', lineHeight: 1.8, color: 'var(--color-horizon-600)', marginBottom: '1rem' }}>
                Our expansion strategy is client-driven. When a client needs security in a new city, we 
                establish a local presence — recruiting from the local workforce, setting up supervision,
                and integrating the location into our centralised monitoring and compliance systems. 
                This approach means we don&apos;t just cover 200+ cities in name — we have operational 
                capability, local supervisors, and deployed guards in each of them.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', lineHeight: 1.8, color: 'var(--color-horizon-600)' }}>
                From the national capital region to emerging industrial towns in Madhya Pradesh, from 
                Gujarat&apos;s manufacturing corridors to Tamil Nadu&apos;s industrial belts, from Rajasthan&apos;s 
                mining districts to Uttar Pradesh&apos;s commercial centres — Silbar delivers consistent, 
                compliant, and professional security services everywhere we operate.
              </p>
            </div>
          </ScrollReveal>
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
            <span className="section-eyebrow section-eyebrow--red">ALL {SITE_STATS.states} STATES &amp; UTs</span>
            <h2 id="states-heading" className="section-heading">
              Choose Your <em>State.</em>
            </h2>
            <p>
              Each state has a full dedicated page with services, FAQs, sectors, and a WhatsApp quote form.
            </p>
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

      {/* ─── All cities A–Z ─── */}
      <section className="locations-section locations-section--alt" id="all-cities" aria-labelledby="all-cities-heading">
        <div className="locations-section__inner">
          <ScrollReveal className="locations-section__header">
            <span className="section-eyebrow section-eyebrow--red">ALL {SITE_STATS.cities} CITY PAGES</span>
            <h2 id="all-cities-heading" className="section-heading">
              Every City We <em>List.</em>
            </h2>
            <p>
              Full directory of city security pages — each with unique local content, service links, and enquiry form.
            </p>
          </ScrollReveal>

          <div className="seo-cities-grid" style={{ marginBottom: 0 }}>
            {allCitiesAZ.map((city) => (
              <Link
                key={city.slug}
                href={`/security-services/city/${city.slug}`}
                className="seo-city-tag seo-city-tag--link"
              >
                <MapPin size={12} /> {city.name}
                <span style={{ opacity: 0.55, fontWeight: 500 }}> · {city.state}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageLeadSection
        title="Need Security in Your City?"
        subtitle={`Select any of our ${SITE_STATS.cities} city pages or request a quote — WhatsApp opens with your details.`}
        formType="Locations Quote"
      />
    </main>
  )
}
