import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { INDUSTRIES, INDUSTRY_SLUGS } from '@/data/industries'
import { SERVICES } from '@/data/services'
import { CheckCircle, ArrowRight, AlertTriangle, Phone } from 'lucide-react'

export async function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  if (!industry) return {}
  return {
    title: `${industry.title} | Silbar Security`,
    description: industry.description,
    alternates: { canonical: `https://www.silbarsecurity.in/industries/${slug}` },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  if (!industry) notFound()

  const relatedServices = SERVICES.filter((s) =>
    industry.services.includes(s.slug)
  )

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.title,
    description: industry.description,
    provider: {
      '@type': 'Organization',
      name: 'Silbar Security Services Pvt. Ltd.',
      url: 'https://www.silbarsecurity.in',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="industry-detail-page" id="main-content">

        <section className="industry-detail-hero">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/industries" className="breadcrumb__link">Industries</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">{industry.shortTitle}</span>
          </nav>
          <h1 className="industry-detail-title">{industry.title}</h1>
          <p className="industry-detail-subtitle">{industry.description}</p>
          <div className="service-detail-ctas">
            <a href="tel:+919352303333" className="service-detail-cta service-detail-cta--primary">
              <Phone size={16} /> Get Quote
            </a>
          </div>
        </section>

        {/* Challenges */}
        <section className="industry-challenges">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Security Challenges</h2>
            <div className="industry-challenges-list">
              {industry.challenges.map((c) => (
                <div key={c} className="industry-challenge-item">
                  <AlertTriangle size={15} className="industry-challenge-item__icon" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="industry-solutions">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Our Solutions</h2>
            <div className="service-detail-features-grid">
              {industry.solutions.map((s) => (
                <div key={s} className="service-detail-feature">
                  <CheckCircle size={16} className="service-detail-feature__icon" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="industry-related-services">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">Services for {industry.shortTitle}</h2>
            <div className="industry-services-grid">
              {relatedServices.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="industry-service-link">
                  {service.shortTitle} <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="service-detail-faq">
          <div className="service-detail-section-inner">
            <h2 className="service-detail-section-title">FAQs</h2>
            <div className="service-detail-faq-list">
              {industry.faqs.map(({ q, a }) => (
                <details key={q} className="service-detail-faq-item">
                  <summary className="service-detail-faq-q">{q}</summary>
                  <p className="service-detail-faq-a">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
