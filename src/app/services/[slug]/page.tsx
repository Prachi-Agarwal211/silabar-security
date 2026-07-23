import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, SERVICE_SLUGS } from '@/data/services'
import { CASE_STUDIES } from '@/data/case-studies'
import { CheckCircle, Phone, ArrowUpRight } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import { generateServiceExtraContent } from '@/lib/seo-content-generator'

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

  const desc = service.description.length > 157 ? service.description.slice(0, 157) + '...' : service.description
  return {
    title: `${service.title} in India`,
    description: desc,
    ...ogMetadata(`${service.title} in India`, desc, `/services/${slug}`),
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

  const extra = generateServiceExtraContent(service.title, service.shortTitle)
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6)
  const relatedCaseStudies = CASE_STUDIES
    .filter((cs) => cs.services.some((s) => s === slug || s === service.slug))
    .slice(0, 3)

  const stats = [
    { number: '8+', label: 'Years Experience' },
    { number: '200+', label: 'Cities Covered' },
    { number: '7,000+', label: 'Professionals' },
    { number: '4', label: 'ISO Certified' },
  ]

  const trustPoints = [
    'PAN India presence across 200+ cities',
    '4 ISO certifications (IAF accredited)',
    'PSARA licensed across 19 states',
    'Police verified, background-checked manpower',
    '24/7 account management and support',
    '24-hour replacement guarantee',
  ]

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

        {/* Cinematic image hero */}
        <PageHero
          variant="image"
          imageSrc="/hero-guard.webp"
          eyebrow={`${service.shortTitle.toUpperCase()} · ISO 9001:2015`}
          title={<SplitTextReveal text={service.title} mode="words" />}
          subtitle={service.longDescription}
          size="tall"
          topContent={
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/services" className="breadcrumb__link">Services</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{service.shortTitle}</span>
            </nav>
          }
          bottomContent={
            <div className="service-detail-ctas">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20${encodeURIComponent(service.shortTitle)}.`}
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
            {/* Overview */}
            <section className="service-detail-features">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Service Overview</h2>
                </ScrollReveal>
                <p className="service-detail-longcopy">{service.longDescription}</p>
                <p className="service-detail-longcopy">
                  Silbar Security Services Pvt. Ltd. delivers {service.shortTitle.toLowerCase()} with trained manpower,
                  documented site instructions, and account coordination for single-site and multi-city
                  clients across India. Scope is always designed around your facility risk, shifts, and
                  compliance requirements — not a one-line brochure rate.
                </p>
                <div className="service-trust-pills">
                  <span className="service-trust-pill">4 ISO Certified (IAF)</span>
                  <span className="service-trust-pill">PSARA Licensed · 19 States</span>
                  <span className="service-trust-pill">Police Verified Guards</span>
                  <span className="service-trust-pill">200+ Cities PAN India</span>
                  <span className="service-trust-pill">EPF / ESIC Compliant</span>
                  <span className="service-trust-pill">CAPSI Member</span>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="service-detail-features">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">What&apos;s Included</h2>
                </ScrollReveal>
                <div className="bento-grid">
                  {service.features.map((f, i) => (
                    <ScrollReveal key={f} delay={i * 0.04} className="bento-cell glass-panel bento-cell--feature">
                      <CheckCircle size={20} className="service-detail-feature__icon" />
                      <span className="bento-cell__text">{f}</span>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="service-detail-industries">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Key Benefits</h2>
                </ScrollReveal>
                <div className="bento-grid">
                  {extra.benefits.map((b, i) => (
                    <ScrollReveal key={b} delay={i * 0.04} className="bento-cell glass-panel bento-cell--feature">
                      <CheckCircle size={20} className="service-detail-feature__icon" />
                      <span className="bento-cell__text">{b}</span>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Use cases */}
            <section className="service-detail-features">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Where This Service Is Used</h2>
                </ScrollReveal>
                <div className="service-detail-industries-tags">
                  {extra.useCases.map((u) => (
                    <span key={u} className="service-detail-industry-tag">{u}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Process Timeline */}
            <section className="service-detail-industries">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">How Engagement Works</h2>
                </ScrollReveal>
                <div className="service-timeline">
                  {extra.process.map((step, i) => (
                    <div key={step.title} className="service-timeline__step">
                      <div className="service-timeline__num">Step {String(i + 1).padStart(2, '0')}</div>
                      <h3 className="service-timeline__title">{step.title}</h3>
                      <p className="service-timeline__desc">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Industries */}
            <section className="service-detail-features">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Industries We Serve</h2>
                </ScrollReveal>
                <div className="service-detail-industries-tags">
                  {service.industries.map((ind, i) => (
                    <ScrollReveal key={ind} delay={i * 0.03}>
                      <span className="service-detail-industry-tag">{ind}</span>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Strip */}
            <section className="service-detail-industries">
              <div className="service-detail-section-inner">
                <div className="service-stats-strip">
                  {stats.map((s) => (
                    <div key={s.label} className="service-stat">
                      <div className="service-stat__number">{s.number}</div>
                      <div className="service-stat__label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Silbar */}
            <section className="service-detail-features">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Why Choose Silbar</h2>
                </ScrollReveal>
                <div className="why-choose-grid">
                  {trustPoints.map((point) => (
                    <div key={point} className="why-choose-item">
                      <CheckCircle size={18} className="why-choose-item__icon" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Case Studies */}
            <section className="service-detail-industries">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Case Studies</h2>
                </ScrollReveal>
                {relatedCaseStudies.length > 0 ? (
                  <div className="service-case-studies" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {relatedCaseStudies.map((cs) => (
                      <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="service-case-study-card">
                        <div className="service-case-study-card__title">{cs.title}</div>
                        <div className="service-case-study-card__meta">
                          {cs.client} · {cs.location}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-horizon-600)' }}>
                    Read our detailed case studies to see how Silbar Security Services Pvt. Ltd. has delivered
                    measurable results across industries.
                  </p>
                )}
                {relatedCaseStudies.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <Link
                      href="/case-studies"
                      className="service-detail-cta service-detail-cta--primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      View All Case Studies <ArrowUpRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Related services */}
            <section className="service-detail-industries">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Related Services</h2>
                </ScrollReveal>
                <div className="seo-services-grid">
                  {related.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="seo-service-link">
                      <span className="seo-service-link__title">{s.shortTitle}</span>
                      <span className="seo-service-link__location">View details</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="service-detail-faq">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Frequently Asked Questions</h2>
                </ScrollReveal>
                <div className="service-detail-faq-list">
                  {service.faqs.map(({ q, a }, i) => (
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
                <h3 className="sticky-contact-card__title">Secure Your Operations</h3>
                <p className="sticky-contact-card__desc">
                  Our security consultants will assess your facility and provide a
                  customized quote within 24 hours.
                </p>
                <div className="service-detail-ctas service-detail-ctas--stacked">
                  <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                    <Phone size={16} /> Call Now
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.number}?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20${encodeURIComponent(service.shortTitle)}.`}
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

        {/* ─── Query Form ─── */}
        <section className="section-form-shell">
          <QueryForm
            title={`Quote for ${service.shortTitle}`}
            subtitle="Submit opens WhatsApp with your full enquiry for our team."
            defaultMessage={`I need a quote for ${service.title}.`}
            formType={`${service.shortTitle} Enquiry`}
          />
        </section>

        {/* Bottom CTA */}
        <section className="service-detail-bottom-cta">
          <ScrollReveal>
            <h2 className="service-detail-bottom-cta__title">
              Need {service.shortTitle} Services?
            </h2>
            <p className="service-detail-bottom-cta__sub">
              Our security consultants will assess your facility and provide a
              customized quote within 24 hours.
            </p>
            <div className="service-detail-ctas service-detail-ctas--centered">
              <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--primary">
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20${encodeURIComponent(service.shortTitle)}.`}
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
