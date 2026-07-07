import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, SERVICE_SLUGS } from '@/data/services'
import { CheckCircle, ArrowRight, Phone } from 'lucide-react'

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}

  return {
    title: `${service.title} in India | Silbar Security`,
    description: service.description,
    alternates: {
      canonical: `https://www.silbarsecurity.in/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Silbar Security Services`,
      description: service.description,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  // JSON-LD schema for this service
  const schema = {
    '@context': 'https://schema.org',
    '@type': service.schema.serviceType,
    name: service.schema.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Silbar Security Services Pvt. Ltd.',
      url: 'https://www.silbarsecurity.in',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
    },
  }

  // FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="service-detail-page" id="main-content">

        {/* Hero */}
        <section className="service-detail-hero">
          <div className="service-detail-hero__inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/services" className="breadcrumb__link">Services</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{service.shortTitle}</span>
            </nav>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-subtitle">{service.longDescription}</p>
            <div className="service-detail-ctas">
              <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <Link href="/contact" className="service-detail-cta service-detail-cta--secondary">
                Get Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="service-detail-features">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">What's Included</h2>
            <div className="service-detail-features-grid">
              {service.features.map((f) => (
                <div key={f} className="service-detail-feature">
                  <CheckCircle size={16} className="service-detail-feature__icon" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="service-detail-industries">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Industries We Serve</h2>
            <div className="service-detail-industries-tags">
              {service.industries.map((ind) => (
                <span key={ind} className="service-detail-industry-tag">{ind}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="service-detail-faq">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Frequently Asked Questions</h2>
            <div className="service-detail-faq-list">
              {service.faqs.map(({ q, a }) => (
                <details key={q} className="service-detail-faq-item">
                  <summary className="service-detail-faq-q">{q}</summary>
                  <p className="service-detail-faq-a">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="service-detail-bottom-cta">
          <h2 className="service-detail-bottom-cta__title">
            Need {service.shortTitle} Services?
          </h2>
          <p className="service-detail-bottom-cta__sub">
            Our security consultants will assess your facility and provide a
            customized quote within 24 hours.
          </p>
          <Link href="/contact" className="service-detail-cta service-detail-cta--primary">
            Request Free Consultation <ArrowRight size={16} />
          </Link>
        </section>

      </main>
    </>
  )
}
