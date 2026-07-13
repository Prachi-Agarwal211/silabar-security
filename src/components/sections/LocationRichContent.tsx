import type { LocationSEOContent } from '@/lib/seo-content-generator'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { CheckCircle2 } from 'lucide-react'

/**
 * Full long-form SEO body shared by city + state pages.
 * Renders many sections so pages are content-rich for users and crawlers.
 */
export default function LocationRichContent({ content }: { content: LocationSEOContent }) {
  return (
    <>
      {/* Intro */}
      <section className="seo-about-section">
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

      {/* Market overview */}
      <section className="seo-services-section">
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

      {/* Challenges */}
      <section className="seo-cities-section">
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

      {/* Sectors */}
      <section className="seo-about-section">
        <div className="service-detail-section-inner">
          <ScrollReveal>
            <h2 className="service-detail-section-title">{content.sectorsHeading}</h2>
            <p className="seo-cities-note" style={{ marginBottom: '1.25rem' }}>
              {content.sectorsBlurb}
            </p>
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

      {/* Deliverables */}
      <section className="seo-services-section">
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

      {/* Packages */}
      <section className="seo-cities-section">
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

      {/* Who needs */}
      <section className="seo-about-section">
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

      {/* Training */}
      <section className="seo-services-section">
        <div className="service-detail-section-inner">
          <ScrollReveal>
            <h2 className="service-detail-section-title">{content.trainingHeading}</h2>
            <p className="seo-cities-note" style={{ marginBottom: '1.25rem' }}>
              {content.trainingBlurb}
            </p>
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

      {/* Operations + compliance prose */}
      <section className="seo-cities-section">
        <div className="service-detail-section-inner">
          <ScrollReveal>
            <h2 className="service-detail-section-title">
              Day-to-day operations in {content.placeName}
            </h2>
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

      {/* Why */}
      <section className="seo-about-section">
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

      {/* Process */}
      <section className="seo-services-section">
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

      {/* FAQs */}
      <section className="service-detail-faq">
        <div className="service-detail-section-inner">
          <ScrollReveal>
            <h2 className="service-detail-section-title">
              FAQs — Security Services in {content.placeName}
            </h2>
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
    </>
  )
}
