import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { INDUSTRIES, INDUSTRY_SLUGS } from '@/data/industries'
import { SERVICES } from '@/data/services'
import { CASE_STUDIES } from '@/data/case-studies'
import { generateServiceExtraContent } from '@/lib/seo-content-generator'
import { CheckCircle, CheckCircle2, ArrowRight, AlertTriangle, Phone, Shield, MapPin, Award, Users, BadgeCheck, Headphones } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import QueryForm from '@/components/sections/QueryForm'
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

  const extra = generateServiceExtraContent(industry.title, industry.shortTitle)

  const relatedCaseStudies = CASE_STUDIES.filter(
    (cs) => cs.industry.toLowerCase().replace(/\s+/g, '-') === slug
  )
  const caseStudiesSlice = relatedCaseStudies.slice(0, 3)

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
                href={CONTACT.whatsapp.url}
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
            <section className="industry-challenges">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Industry Overview</h2>
                </ScrollReveal>
                <p className="service-detail-longcopy">{industry.description}</p>
                <p className="service-detail-longcopy">
                  Silbar Security designs {industry.shortTitle.toLowerCase()} security around real
                  operational risk — access points, shifts, contractors, emergency paths, and
                  compliance expectations. Deployments can include manned posts, supervision,
                  visitor/material discipline, and coordination with your facility team across
                  single or multi-site networks in India.
                </p>
                <div className="service-trust-pills">
                  <span className="service-trust-pill">4 ISO Certified (IAF)</span>
                  <span className="service-trust-pill">PSARA Licensed · 19 States</span>
                  <span className="service-trust-pill">Police Verified Guards</span>
                  <span className="service-trust-pill">200+ Cities PAN India</span>
                </div>
                <p className="service-detail-longcopy">
                  Every site is different. We start with a clear scope discussion, propose category-wise
                  manpower, and mobilise with induction on your layout and emergency contacts so
                  day-one performance is not guesswork.
                </p>
              </div>
            </section>

            {/* Challenges */}
            <section className="industry-challenges">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Security Challenges</h2>
                </ScrollReveal>
                <ScrollReveal className="bento-grid">
                  {industry.challenges.map((c) => (
                    <div key={c} className="bento-cell glass-panel bento-cell--challenge">
                      <AlertTriangle size={20} className="industry-challenge-item__icon" />
                      <span className="bento-cell__text">{c}</span>
                    </div>
                  ))}
                </ScrollReveal>
              </div>
            </section>

            {/* Solutions */}
            <section className="industry-solutions">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Our Solutions</h2>
                </ScrollReveal>
                <ScrollReveal className="bento-grid">
                  {industry.solutions.map((s) => (
                    <div key={s} className="bento-cell glass-panel bento-cell--solution">
                      <CheckCircle size={20} className="service-detail-feature__icon" />
                      <span className="bento-cell__text">{s}</span>
                    </div>
                  ))}
                </ScrollReveal>
              </div>
            </section>

            {/* Key Benefits */}
            <section className="industry-benefits">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Key Benefits</h2>
                </ScrollReveal>
                <ScrollReveal className="industry-benefits-grid">
                  {extra.benefits.map((b) => (
                    <div key={b} className="industry-benefit-item">
                      <CheckCircle2 size={16} className="why-choose-item__icon" />
                      <span>{b}</span>
                    </div>
                  ))}
                </ScrollReveal>
              </div>
            </section>

            {/* How We Deliver */}
            <section className="industry-process">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">How We Deliver</h2>
                </ScrollReveal>
                <ScrollReveal>
                  {extra.process.map((step, i) => (
                    <div key={step.title} className="industry-process-step">
                      <div className="industry-process-step__num">{String(i + 1).padStart(2, '0')}</div>
                      <div>
                        <div className="industry-process-step__title">{step.title}</div>
                        <div className="industry-process-step__desc">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </ScrollReveal>
              </div>
            </section>

            {/* Related Services */}
            <section className="industry-related-services">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Services for {industry.shortTitle}</h2>
                </ScrollReveal>
                <ScrollReveal className="bento-grid">
                  {relatedServices.map((service) => (
                    <div key={service.slug} className="bento-cell glass-panel bento-cell--service-link">
                      <Link href={`/services/${service.slug}`} className="industry-service-link">
                        {service.shortTitle} <ArrowRight size={16} />
                      </Link>
                    </div>
                  ))}
                </ScrollReveal>
              </div>
            </section>

            {/* Stats */}
            <section className="industry-stats">
              <div className="service-detail-section-inner">
                <div className="service-stats-strip">
                  <div className="service-stat">
                    <div className="service-stat__number">8+</div>
                    <div className="service-stat__label">Years Experience</div>
                  </div>
                  <div className="service-stat">
                    <div className="service-stat__number">200+</div>
                    <div className="service-stat__label">Cities Covered</div>
                  </div>
                  <div className="service-stat">
                    <div className="service-stat__number">100+</div>
                    <div className="service-stat__label">Professionals</div>
                  </div>
                  <div className="service-stat">
                    <div className="service-stat__number">4</div>
                    <div className="service-stat__label">ISO Certified</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Choose Silbar */}
            <section className="industry-why-choose">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Why Choose Silbar for {industry.shortTitle}</h2>
                </ScrollReveal>
                <ScrollReveal className="why-choose-grid">
                  <div className="why-choose-item">
                    <Shield size={18} className="why-choose-item__icon" />
                    <span>Industry-specific security expertise</span>
                  </div>
                  <div className="why-choose-item">
                    <MapPin size={18} className="why-choose-item__icon" />
                    <span>PAN India presence across 200+ cities</span>
                  </div>
                  <div className="why-choose-item">
                    <Award size={18} className="why-choose-item__icon" />
                    <span>4 ISO certifications (IAF accredited)</span>
                  </div>
                  <div className="why-choose-item">
                    <BadgeCheck size={18} className="why-choose-item__icon" />
                    <span>PSARA licensed across 19 states</span>
                  </div>
                  <div className="why-choose-item">
                    <Users size={18} className="why-choose-item__icon" />
                    <span>Police verified, background-checked manpower</span>
                  </div>
                  <div className="why-choose-item">
                    <Headphones size={18} className="why-choose-item__icon" />
                    <span>24/7 account management and support</span>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Case Studies */}
            <section className="industry-case-studies-section">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">Case Studies</h2>
                </ScrollReveal>
                {caseStudiesSlice.length > 0 ? (
                  <ScrollReveal className="industry-case-studies">
                    {caseStudiesSlice.map((cs) => (
                      <Link
                        key={cs.slug}
                        href={`/case-studies/${cs.slug}`}
                        className="industry-case-study-card"
                      >
                        <div className="industry-case-study-card__title">{cs.title}</div>
                        <div className="industry-case-study-card__meta">{cs.client} · {cs.location}</div>
                      </Link>
                    ))}
                  </ScrollReveal>
                ) : (
                  <p className="service-detail-longcopy" style={{ marginTop: '0.5rem' }}>
                    Explore our <Link href="/case-studies" style={{ color: 'var(--color-cherry)', textDecoration: 'underline' }}>case studies</Link> to see how Silbar Security delivers results across industries.
                  </p>
                )}
              </div>
            </section>

            {/* FAQ */}
            <section className="service-detail-faq">
              <div className="service-detail-section-inner">
                <ScrollReveal>
                  <h2 className="service-detail-section-title">FAQs</h2>
                </ScrollReveal>
                <ScrollReveal className="service-detail-faq-list">
                  {industry.faqs.map(({ q, a }) => (
                    <details key={q} className="service-detail-faq-item">
                      <summary className="service-detail-faq-q">{q}</summary>
                      <p className="service-detail-faq-a">{a}</p>
                    </details>
                  ))}
                </ScrollReveal>
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

        {/* ─── Query Form ─── */}
        <section className="section-form-shell">
          <QueryForm
            title={`${industry.shortTitle} Security Quote`}
            subtitle="Submit opens WhatsApp with your enquiry for our consultants."
            defaultMessage={`I need security for a ${industry.shortTitle} facility.`}
            formType={`${industry.shortTitle} Security Enquiry`}
          />
        </section>

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
