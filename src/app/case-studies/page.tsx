import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'
import { CASE_STUDIES } from '@/data/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies | Silbar Security',
  description: 'Real-world security solutions delivered by Silbar Security. See how we protect India\'s leading enterprises across manufacturing, healthcare, and corporate sectors.',
  ...ogMetadata(
    'Case Studies',
    'Real-world security solutions delivered by Silbar Security. See how we protect India\'s leading enterprises across manufacturing, healthcare, and corporate sectors.',
    '/case-studies'
  ),
}

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="CASE STUDIES"
        title={
          <>
            <SplitTextReveal text="REAL RESULTS" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="REAL PROTECTION" delay={0.2} />
            </span>
          </>
        }
        subtitle="See how Silbar Security delivers measurable outcomes for India's leading enterprises."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Case Studies</span>
          </nav>
        }
      />

      <section className="case-studies-listing">
        <div className="case-studies-listing__inner">
          <div className="case-studies-grid">
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="case-study-card__link"
              >
                <ScrollReveal className="case-study-card bento-cell glass-panel">
                  <div className="case-study-card__header">
                    <div>
                      <h2 className="case-study-card__title">{study.title}</h2>
                      <p className="case-study-card__client">{study.client} — {study.location}</p>
                    </div>
                  </div>
                  <div className="case-study-card__body">
                    <div>
                      <h3 className="case-study-card__label">Challenge</h3>
                      <p className="case-study-card__text">{study.challenge.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
                    </div>
                    <div>
                      <h3 className="case-study-card__label">Solution</h3>
                      <p className="case-study-card__text">{study.solution.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
                    </div>
                    <div>
                      <h3 className={`case-study-card__label ${'case-study-card__label--results'}`}>Results</h3>
                      <ul className="case-study-card__results">
                        {study.results.map((r) => (
                          <li key={r} className="case-study-card__result">{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="case-study-card__tags">
                    {study.services.map((s) => (
                      <span key={s} className="case-study-card__tag">{s.replace(/-/g, ' ')}</span>
                    ))}
                  </div>
                </ScrollReveal>
              </Link>
            ))}
          </div>
        </div>
      </section>
    
      <PageLeadSection
        title="Want Results Like These?"
        subtitle="Request a free security assessment for your facility."
      />

    </main>
  )
}
