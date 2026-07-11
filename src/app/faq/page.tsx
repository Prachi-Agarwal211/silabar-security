import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQS, type FAQCategory } from '@/data/faq'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ScrollReveal from '@/components/animations/ScrollReveal'
import QueryForm from '@/components/sections/QueryForm'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Silbar Security',
  description: 'Find answers to common questions about Silbar Security Services, compliance, PSARA, operations, and our security guard deployment process in India.',
  ...ogMetadata('Frequently Asked Questions | Silbar Security', 'Find answers to common questions about Silbar Security Services, compliance, PSARA, operations, and our security guard deployment process in India.', '/faq'),
}

export default function FAQPage() {
  const categories: FAQCategory[] = ['General', 'Compliance', 'Services', 'Industries', 'Operations']

  // Group FAQS by category
  const faqsByCategory = categories.map(cat => ({
    category: cat,
    items: FAQS.filter(f => f.category === cat)
  }))

  // Generate JSON-LD Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }

  return (
    <main className="faq-page" id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="SUPPORT & RESOURCES"
        title={
          <>
            <SplitTextReveal text="Frequently" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="Asked Questions." delay={0.2} />
            </span>
          </>
        }
        subtitle="Everything you need to know about our security services, compliance standards, and operational procedures."
        size="tall"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">FAQs</span>
          </nav>
        }
      />

      <section style={{ padding: '2rem 1.5rem 5rem 1.5rem', background: 'var(--color-paper)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--color-paper)', borderRadius: '12px', padding: 'clamp(2rem, 5vw, 4rem)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginTop: '-6rem', position: 'relative', zIndex: 10 }}>
          
          <ScrollReveal>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(10,10,10,0.7)', maxWidth: '600px', margin: '0 auto' }}>
                Browse through our most commonly asked questions. Can't find what you're looking for? Scroll down to send us a direct inquiry.
              </p>
            </div>
          </ScrollReveal>

          <div className="service-detail-faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {faqsByCategory.map((group) => (
              <div key={group.category} id={group.category.toLowerCase()}>
                <ScrollReveal>
                  <h2 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '1.5rem', 
                    fontWeight: 800, 
                    color: 'var(--color-cherry)', 
                    marginBottom: '1.5rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '2px solid rgba(191, 149, 63, 0.2)'
                  }}>
                    {group.category}
                  </h2>
                </ScrollReveal>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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

      {/* ─── Query Form ─── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-paper)' }}>
        <QueryForm />
      </section>

    </main>
  )
}
