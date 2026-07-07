import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/data/services'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security Services — 10 Verticals for Every Industry',
  description:
    'Silbar Security offers manned guarding, industrial security, event security, bank & ATM security, CCTV surveillance, facility management, and more. PSARA-licensed. PAN India.',
  alternates: { canonical: 'https://www.silbarsecurity.in/services' },
}

export default function ServicesPage() {
  return (
    <main className="services-page" id="main-content">
      <section className="services-page-hero">
        <span className="page-eyebrow">WHAT WE DO</span>
        <h1 className="services-page-title">
          10 SECURITY<br />
          <span className="services-page-title--outline">VERTICALS.</span>
        </h1>
        <p className="services-page-subtitle">
          End-to-end security and facility management for India's enterprises.
          PSARA licensed. ISO certified.
        </p>
      </section>

      <section className="services-page-grid-section">
        <div className="services-page-grid">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="service-page-card"
            >
              <div className="service-page-card__header">
                <h2 className="service-page-card__title">{service.shortTitle}</h2>
                <ArrowRight size={18} className="service-page-card__arrow" />
              </div>
              <p className="service-page-card__desc">{service.description}</p>
              <div className="service-page-card__industries">
                {service.industries.slice(0, 3).map((ind) => (
                  <span key={ind} className="service-page-card__tag">{ind}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
