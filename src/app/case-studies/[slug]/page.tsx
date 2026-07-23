import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CASE_STUDIES, CASE_STUDY_SLUGS } from '@/data/case-studies'
import { SERVICES } from '@/data/services'
import { CheckCircle } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import PageHero from '@/components/layout/PageHero'
import PageLeadSection from '@/components/sections/PageLeadSection'
import { ogMetadata } from '@/lib/metadata'

export async function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = CASE_STUDIES.find((s) => s.slug === slug)
  if (!study) return {}

  const desc = `How Silbar Security Services Pvt. Ltd. delivered measurable results for ${study.client} in ${study.location}.`
  const descShort = desc.length > 157 ? desc.slice(0, 157) + '...' : desc
  const ogDesc = `Case study: ${study.client} – ${study.results[0]}`
  const ogDescShort = ogDesc.length > 157 ? ogDesc.slice(0, 157) + '...' : ogDesc
  return {
    title: `${study.title} Case Study`,
    description: descShort,
    ...ogMetadata(`${study.title}`, ogDescShort, `/case-studies/${slug}`),
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = CASE_STUDIES.find((s) => s.slug === slug)
  if (!study) notFound()

  const relatedServices = SERVICES.filter((s) => study.services.includes(s.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CaseStudy',
    name: study.title,
    description: study.results[0],
    client: { '@type': 'Organization', name: study.client },
    location: study.location,
    about: study.industry,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="case-study-page" id="main-content">
        <PageHero
          eyebrow="CASE STUDY"
          title={<SplitTextReveal text={study.title} mode="words" />}
          subtitle={`${study.client} · ${study.location}`}
          size="compact"
          topContent={
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/case-studies" className="breadcrumb__link">Case Studies</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">{study.title}</span>
            </nav>
          }
        />

        <section className="case-study-meta">
          <div className="case-study-meta__inner">
            <div className="case-study-meta__item">
              <span className="case-study-meta__label">Client</span>
              <span className="case-study-meta__value">{study.client}</span>
            </div>
            <div className="case-study-meta__item">
              <span className="case-study-meta__label">Industry</span>
              <span className="case-study-meta__value">{study.industry}</span>
            </div>
            <div className="case-study-meta__item">
              <span className="case-study-meta__label">Location</span>
              <span className="case-study-meta__value">{study.location}</span>
            </div>
            <div className="case-study-meta__item">
              <span className="case-study-meta__label">Duration</span>
              <span className="case-study-meta__value">{study.duration}</span>
            </div>
          </div>
        </section>

        <section className="case-study-section">
          <div className="case-study-section__inner">
            <ScrollReveal>
              <h2 className="case-study-section__title">The Challenge</h2>
            </ScrollReveal>
            <div
              className="case-study-content"
              dangerouslySetInnerHTML={{ __html: study.challenge }}
            />
          </div>
        </section>

        <section className="case-study-section case-study-section--alt">
          <div className="case-study-section__inner">
            <ScrollReveal>
              <h2 className="case-study-section__title">The Solution</h2>
            </ScrollReveal>
            <div
              className="case-study-content"
              dangerouslySetInnerHTML={{ __html: study.solution }}
            />
          </div>
        </section>

        <section className="case-study-section">
          <div className="case-study-section__inner">
            <ScrollReveal>
              <h2 className="case-study-section__title">Results Delivered</h2>
            </ScrollReveal>
            <div className="case-study-results">
              {study.results.map((r, i) => (
                <ScrollReveal key={r} delay={i * 0.04} className="case-study-result-item">
                  <CheckCircle size={20} className="case-study-result-item__icon" />
                  <span>{r}</span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {study.testimonials && study.testimonials.length > 0 && (
          <section className="case-study-section case-study-section--alt">
            <div className="case-study-section__inner">
              <ScrollReveal>
                <h2 className="case-study-section__title">Client Testimonial</h2>
              </ScrollReveal>
              <div className="case-study-testimonials">
                {study.testimonials.map((t) => (
                  <ScrollReveal key={t.name} className="case-study-testimonial glass-panel">
                    <blockquote className="case-study-testimonial__quote">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="case-study-testimonial__attribution">
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedServices.length > 0 && (
          <section className="case-study-section">
            <div className="case-study-section__inner">
              <ScrollReveal>
                <h2 className="case-study-section__title">Services Utilised</h2>
              </ScrollReveal>
              <div className="seo-services-grid">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="seo-service-link"
                  >
                    <span className="seo-service-link__title">{s.shortTitle}</span>
                    <span className="seo-service-link__location">View details</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <PageLeadSection
          title="Want Results Like These?"
          subtitle="Request a free security assessment for your facility."
        />
      </main>
    </>
  )
}
