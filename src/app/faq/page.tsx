import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { ogMetadata } from '@/lib/metadata'
import { FAQS } from '@/data/faq'
import QueryForm from '@/components/sections/QueryForm'

function groupFaqsByCategory() {
  const map = new Map<string, { category: string; items: typeof FAQS }>()
  for (const faq of FAQS) {
    const cat = faq.category || 'General'
    if (!map.has(cat)) map.set(cat, { category: cat, items: [] })
    map.get(cat)!.items.push(faq)
  }
  return Array.from(map.values())
}

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers about Silbar Security Services Pvt. Ltd. services, PSARA licensing, ISO certifications, pricing, coverage areas, and security solutions across India.',
  ...ogMetadata(
    'FAQs',
    'Find answers to common questions about Silbar Security Services Pvt. Ltd. services, PSARA licensing, ISO certifications, pricing, coverage areas.',
    '/faq'
  ),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FAQPage() {
  const faqsByCategory = groupFaqsByCategory()

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="FAQs"
        title={
          <>
            <SplitTextReveal text="Frequently" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="Asked Questions." delay={0.2} />
            </span>
          </>
        }
        subtitle="Everything you need to know about our security services, licensing, certifications, and more."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">FAQs</span>
          </nav>
        }
      />

      <section className="faq-section">
        <div className="faq-section__container">
          
          <ScrollReveal>
            <div className="faq-section__header">
              <p className="faq-section__lead">
                Browse through our most commonly asked questions. Can't find what you're looking for? Scroll down to send us a direct inquiry.
              </p>
            </div>
          </ScrollReveal>

          <div className="faq-section__list">
            {faqsByCategory.map((group) => (
              <div key={group.category} id={group.category.toLowerCase()}>
                <ScrollReveal>
                  <h2 className="faq-section__category">{group.category}</h2>
                </ScrollReveal>

                <div className="faq-section__items">
                  {group.items.map((faq, index) => (
                    <ScrollReveal key={faq.q} delay={index * 0.05}>
                      <details className="service-detail-faq-item">
                        <summary className="service-detail-faq-q">{faq.q}</summary>
                        <p className="service-detail-faq-a">{faq.a}</p>
                      </details>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="faq-form-section">
        <QueryForm />
      </section>

    </main>
  )
}