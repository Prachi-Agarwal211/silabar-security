import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, Shield } from 'lucide-react'
import { SERVICES } from '@/data/services'
import ServicesGrid from '@/components/sections/ServicesGrid'
import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Security Services — 12 Verticals for Every Industry',
  description:
    'Silbar Security offers manned guarding, industrial security, event security, bank & ATM security, CCTV surveillance, facility management, and more. ISO 9001:2015 certified. PAN India.',
  ...ogMetadata('Security Services — 12 Verticals for Every Industry', 'Silbar Security offers manned guarding, industrial security, event security, bank & ATM security, CCTV surveillance, facility management, and more. ISO 9001:2015 certified. PAN India.', '/services'),
}

export default function ServicesPage() {
  return (
    <main className="services-page" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: SERVICES.map((service, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://www.silbarsecurity.in/services/${service.slug}`,
            name: service.shortTitle,
          }))
        })
      }} />

      {/* ─── Intro Block — 2-column editorial ─── */}
      <section className="services-intro-block" aria-labelledby="services-page-heading">
        <div className="services-intro-inner">
          {/* Left: copy */}
          <div className="services-intro-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">Services</span>
            </nav>
            <span className="section-eyebrow section-eyebrow--red">OUR SERVICES</span>
            <h1 id="services-page-heading" className="section-heading services-page-h1">
              Our Services Built Around <em>Your</em> Safety.
            </h1>
            <p className="services-intro-body">
              One accountable partner for every layer of security your facility needs —
              from licensed manned guarding to electronic surveillance, risk audits, fire safety,
              and full facility operations. ISO 9001:2015 certified. PAN India.
            </p>
            <div className="cta-pair" style={{ marginTop: '1.75rem' }}>
              <a href={`tel:${CONTACT.phoneRaw}`} className="btn-primary">
                <Phone size={14} aria-hidden="true" /> Request Service
              </a>
              <a
                href={CONTACT.whatsapp.url}
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: geometric collage — CSS only, no images needed */}
          <div className="services-intro-collage" aria-hidden="true">
            <div className="services-collage-card services-collage-card--a">
              <div className="services-collage-card__num">12</div>
              <div className="services-collage-card__label">Security Verticals</div>
            </div>
            <div className="services-collage-card services-collage-card--b">
              <Shield size={32} strokeWidth={1.5} color="rgba(212,175,55,0.7)" />
              <div className="services-collage-card__label">ISO 9001:2015</div>
            </div>
            <div className="services-collage-card services-collage-card--c">
              <div className="services-collage-card__num">24/7</div>
              <div className="services-collage-card__label">Response</div>
            </div>
            <div className="services-collage-card services-collage-card--d">
              <div className="services-collage-card__num">200+</div>
              <div className="services-collage-card__label">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick-Jump Icon Strip ─── */}
      <nav className="services-quickjump" aria-label="Jump to service">
        <div className="services-quickjump-inner">
          {SERVICES.slice(0, 6).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="services-quickjump-item"
            >
              {service.shortTitle || service.title}
            </Link>
          ))}
          <Link href="#all-services" className="services-quickjump-item services-quickjump-item--more">
            + {SERVICES.length - 6} more
          </Link>
        </div>
      </nav>

      {/* ─── Full Services Grid ─── */}
      <div id="all-services">
        <ServicesGrid services={SERVICES} />
      </div>

      {/* ─── Query Form ─── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-paper)' }}>
        <QueryForm />
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="services-bottom-cta" aria-label="Contact for services">
        <div className="services-bottom-cta__inner">
          <span className="section-eyebrow section-eyebrow--light">READY TO SECURE?</span>
          <h2 className="section-heading section-heading--on-dark">
            Ready to Secure Your <em>Operations?</em>
          </h2>
          <p className="services-bottom-cta__sub">
            Join 500+ enterprise clients who trust Silbar Security. Available 24/7 across 200+ cities in India.
          </p>
          <div className="cta-pair" style={{ marginTop: '2rem', justifyContent: 'center' }}>
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-primary btn-primary--on-dark">
              <Phone size={14} aria-hidden="true" /> Call Now
            </a>
            <a
              href={CONTACT.whatsapp.url}
              className="btn-secondary btn-secondary--on-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
