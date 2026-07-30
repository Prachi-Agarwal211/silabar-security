import { useMemo } from 'react'
import type { LocationSEOContent } from '@/lib/seo-content-generator'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { CheckCircle2 } from 'lucide-react'

/** Named section renderers for seed-based reordering */
const SECTION_IDS = [
  'intro', 'marketOverview', 'challenges', 'sectors', 'deliverables',
  'packages', 'whoNeeds', 'training', 'operations', 'why', 'process', 'faqs',
] as const

/**
 * Full long-form SEO body shared by city + state pages.
 * Uses seed to shuffle section order so Google sees structural variety.
 * Intro, process, and faqs always stay in their natural position.
 */
export default function LocationRichContent({ content, seed }: { content: LocationSEOContent; seed: number }) {
  // Deterministic shuffle of mid-content sections based on seed
  const shuffled = useMemo(() => {
    // Fixed positions: intro (0), operations (8), why (9), process (10), faqs (11)
    // Shufflable: marketOverview (1), challenges (2), sectors (3), deliverables (4), packages (5), whoNeeds (6), training (7)
    const movable = SECTION_IDS.slice(1, 8) // marketOverview through training
    const fixed = [...SECTION_IDS.slice(0, 1), ...SECTION_IDS.slice(8)] // intro, operations, why, process, faqs

    // Fisher-Yates shuffle seeded by the city/state seed
    const arr = [...movable]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (seed + i * 7919) % (i + 1)
      ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
    }

    return [...fixed.slice(0, 1), ...arr, ...fixed.slice(1)]
  }, [seed])

  const renderSection = (sectionId: string, idx: number) => {
    switch (sectionId) {
      case 'intro':
        return (
          <section key={`intro-${idx}`} className="seo-about-section section-pad--tight">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">
                  {content.placeType === 'city'
                    ? `Security Agency in ${content.placeName}`
                    : `Security Company in ${content.placeName}`}
                </h2>
              </ScrollReveal>
              <div className="seo-about-content">
                {content.intro.map((p, i) => (
                  <p key={`intro-${i}`}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        )

      case 'marketOverview':
        return (
          <section key={`mkt-${idx}`} className="seo-about-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">
                  Security market overview — {content.placeName}
                </h2>
              </ScrollReveal>
              <div className="seo-about-content">
                {content.marketOverview.map((p, i) => (
                  <p key={`mkt-${i}`}>{p}</p>
                ))}
              </div>
              <p className="seo-keywords-line">{content.keywordsLine}</p>
            </div>
          </section>
        )

      case 'challenges':
        return (
          <section key={`ch-${idx}`} className="seo-cities-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">{content.challengesHeading}</h2>
              </ScrollReveal>
              <div className="seo-challenge-grid">
                {content.challenges.map((c) => (
                  <article key={c.title} className="seo-challenge-card">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )

      case 'sectors':
        return (
          <section key={`sec-${idx}`} className="seo-about-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">{content.sectorsHeading}</h2>
                <p className="seo-cities-note" style={{ marginBottom: '1.25rem' }}>{content.sectorsBlurb}</p>
              </ScrollReveal>
              <ul className="seo-sector-list">
                {content.sectors.map((s) => (
                  <li key={s} className="seo-sector-item">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )

      case 'deliverables':
        return (
          <section key={`del-${idx}`} className="seo-services-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">{content.deliverablesHeading}</h2>
              </ScrollReveal>
              <ul className="seo-why-grid">
                {content.deliverables.map((d) => (
                  <li key={d} className="seo-why-item">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )

      case 'packages':
        return (
          <section key={`pkg-${idx}`} className="seo-cities-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">{content.packagesHeading}</h2>
                <p className="seo-cities-note" style={{ marginBottom: '1.25rem' }}>
                  These are typical engagement styles — final scope is designed after understanding your facility in{' '}
                  {content.placeName}.
                </p>
              </ScrollReveal>
              <div className="seo-package-grid">
                {content.packages.map((pkg) => (
                  <article key={pkg.name} className="seo-package-card">
                    <h3>{pkg.name}</h3>
                    <ul>
                      {pkg.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )

      case 'whoNeeds':
        return (
          <section key={`who-${idx}`} className="seo-about-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">{content.whoNeedsHeading}</h2>
              </ScrollReveal>
              <ul className="seo-sector-list">
                {content.whoNeeds.map((w) => (
                  <li key={w} className="seo-sector-item">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )

      case 'training':
        return (
          <section key={`tr-${idx}`} className="seo-services-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">{content.trainingHeading}</h2>
                <p className="seo-cities-note" style={{ marginBottom: '1.25rem' }}>{content.trainingBlurb}</p>
              </ScrollReveal>
              <ul className="seo-why-grid">
                {content.trainingTopics.map((t) => (
                  <li key={t} className="seo-why-item">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )

      case 'operations':
        return (
          <section key={`op-${idx}`} className="seo-cities-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">Day-to-day operations in {content.placeName}</h2>
              </ScrollReveal>
              <div className="seo-about-content">
                {content.operations.map((p, i) => (
                  <p key={`op-${i}`}>{p}</p>
                ))}
              </div>
              <ScrollReveal>
                <h2 className="service-detail-section-title" style={{ marginTop: '2.5rem' }}>
                  Compliance &amp; quality in {content.placeName}
                </h2>
              </ScrollReveal>
              <div className="seo-about-content">
                {content.compliance.map((p, i) => (
                  <p key={`co-${i}`}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        )

      case 'why':
        return (
          <section key={`why-${idx}`} className="seo-about-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">{content.whyHeading}</h2>
              </ScrollReveal>
              <ul className="seo-why-grid">
                {content.whyPoints.map((point) => (
                  <li key={point} className="seo-why-item">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )

      case 'process':
        return (
          <section key={`proc-${idx}`} className="seo-services-section">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">{content.processHeading}</h2>
              </ScrollReveal>
              <ol className="seo-process-list">
                {content.process.map((step, i) => (
                  <li key={step.title} className="seo-process-item">
                    <span className="seo-process-num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )

      case 'faqs':
        return (
          <section key={`faq-${idx}`} className="service-detail-faq">
            <div className="service-detail-section-inner">
              <ScrollReveal>
                <h2 className="service-detail-section-title">FAQs — Security Services in {content.placeName}</h2>
              </ScrollReveal>
              <div className="service-detail-faq-list">
                {content.faqs.map(({ q, a }) => (
                  <details key={q} className="service-detail-faq-item">
                    <summary className="service-detail-faq-q">{q}</summary>
                    <p className="service-detail-faq-a">{a}</p>
                  </details>
                ))}
              </div>
              <p className="seo-closing-cta">{content.closingCta}</p>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="brand-spine brand-rail">
      {shuffled.map((sectionId, idx) => renderSection(sectionId, idx))}
    </div>
  )
}
