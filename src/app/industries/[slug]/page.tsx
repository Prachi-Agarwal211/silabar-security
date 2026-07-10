import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { INDUSTRIES, INDUSTRY_SLUGS } from '@/data/industries'
import { SERVICES } from '@/data/services'
import { CheckCircle, ArrowRight, AlertTriangle, Phone } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

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
    ...ogMetadata(`${industry.title} | Silbar Security`, industry.description, `/industries/${slug}`),
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

        <PageHero
          eyebrow={industry.shortTitle}
          title={<SplitTextReveal text={industry.title} mode="words" />}
          subtitle={industry.description}
          size="tall"
          topContent={
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/industries" className="breadcrumb__link">Industries</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{industry.shortTitle}</span>
            </nav>
          }
          bottomContent={
            <div className="service-detail-ctas">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20security%20quote%20for%20my%20facility."
                className="service-detail-cta service-detail-cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          }
        />

        <div className="detail-layout-container">
          <div className="detail-main-content">
            {/* Challenges */}
            <section className="industry-challenges">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Security Challenges</h2>
                </ScrollReveal>
                <div className="bento-grid">
                  {industry.challenges.map((c, i) => (
                    <ScrollReveal key={c} delay={i * 0.05} className="bento-cell glass-panel bento-cell--challenge">
                      <AlertTriangle size={20} className="industry-challenge-item__icon" />
                      <span className="bento-cell__text">{c}</span>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Solutions */}
            <section className="industry-solutions">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Our Solutions</h2>
                </ScrollReveal>
                <div className="bento-grid">
                  {industry.solutions.map((s, i) => (
                    <ScrollReveal key={s} delay={i * 0.04} className="bento-cell glass-panel bento-cell--solution">
                      <CheckCircle size={20} className="service-detail-feature__icon" />
                      <span className="bento-cell__text">{s}</span>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Related Services */}
            <section className="industry-related-services">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Services for {industry.shortTitle}</h2>
                </ScrollReveal>
                <div className="bento-grid">
                  {relatedServices.map((service, i) => (
                    <ScrollReveal key={service.slug} delay={i * 0.04} className="bento-cell glass-panel bento-cell--service-link">
                      <Link href={`/services/${service.slug}`} className="industry-service-link">
                        {service.shortTitle} <ArrowRight size={16} />
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="service-detail-faq">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">FAQs</h2>
                </ScrollReveal>
                <div className="service-detail-faq-list">
                  {industry.faqs.map(({ q, a }, i) => (
                    <ScrollReveal key={q} delay={i * 0.05}>
                      <details className="service-detail-faq-item">
                        <summary className="service-detail-faq-q">{q}</summary>
                        <p className="service-detail-faq-a">{a}</p>
                      </details>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="detail-sidebar">
            <ScrollReveal>
              <div className="sticky-contact-card glass-panel">
                <h3 className="sticky-contact-card__title">Secure Your {industry.shortTitle} Facility</h3>
                <p className="sticky-contact-card__desc">
                  Get a customized security plan. Free consultation and site assessment.
                </p>
                <div className="service-detail-ctas service-detail-ctas--stacked">
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
              </div>
            </ScrollReveal>
          </aside>
        </div>

        <section className="service-detail-bottom-cta">
          <ScrollReveal>
            <h2 className="service-detail-bottom-cta__title">Secure Your {industry.shortTitle} Facility</h2>
            <p className="service-detail-bottom-cta__sub">
              Get a customized security plan for your facility. Free consultation and site assessment.
            </p>
            <div className="service-detail-ctas service-detail-ctas--centered">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call {CONTACT.phone}
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
          </ScrollReveal>
        </section>

      </main>
    </>
  )
}
