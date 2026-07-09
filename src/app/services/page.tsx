import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { SERVICES } from '@/data/services'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'

export const metadata: Metadata = {
  title: 'Security Services — 12 Verticals for Every Industry',
  description:
    'Silbar Security offers manned guarding, industrial security, event security, bank & ATM security, CCTV surveillance, facility management, and more. PSARA-licensed. PAN India.',
  alternates: { canonical: 'https://www.silbarsecurity.in/services' },
}

export default function ServicesPage() {
  return (
    <main className="services-page" id="main-content">
      {/* Page Hero */}
      <section className="services-page-hero">
        <ScrollReveal>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Services</span>
          </nav>
          <span className="page-eyebrow">OUR SERVICES</span>
          <h1 className="services-page-title">
            <SplitTextReveal text="12 SECURITY" />
            <br />
            <span className="services-page-title--outline">
              <SplitTextReveal text="VERTICALS." delay={0.2} />
            </span>
          </h1>
          <p className="services-page-subtitle">
            From manned guarding to electronic surveillance — fully integrated, PSARA-licensed, 24/7 operational. One agency, every security need.
          </p>
          <div className="service-detail-ctas" style={{ marginTop: '2rem' }}>
            <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
              <Phone size={16} /> Get a Quote
            </a>
            <a
              href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services."
              className="service-detail-cta service-detail-cta--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Services Grid (inherits dark theme from homepage) */}
      <ServicesGrid services={SERVICES} />

      {/* Bottom CTA */}
      <section className="service-detail-bottom-cta">
        <h2 className="service-detail-bottom-cta__title">Ready to Secure Your Operations?</h2>
        <p className="service-detail-bottom-cta__sub">
          Join 500+ enterprise clients who trust Silbar Security. Available 24/7 across 200+ cities in India.
        </p>
        <div className="service-detail-ctas" style={{ justifyContent: 'center' }}>
          <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
            <Phone size={16} /> Call Now
          </a>
          <a
            href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services."
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
