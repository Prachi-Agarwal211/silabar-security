import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import ScrollReveal from '@/components/animations/ScrollReveal'
import QuoteCalculator from '@/components/sections/QuoteCalculator'
import PageLeadSection from '@/components/sections/PageLeadSection'
import { QUOTE_RATES } from '@/data/quote-rates'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Security Guard Cost Calculator India | Per-State Guard Rates',
  description:
    'Instant security guard cost estimate for 35 states — wages, PF, ESI, uniform, relieving and service charges included. PSARA licensed, ISO certified. Get a written quote on WhatsApp.',
  ...ogMetadata(
    'Security Guard Cost Calculator India',
    'Instant per-state security guard cost estimate. Wages + statutory + service charges. Silbar Security Services Pvt. Ltd.',
    '/quote-calculator'
  ),
}

export default function QuoteCalculatorPage() {
  return (
    <main className="quote-calculator-page" id="main-content">
      <PageHero
        variant="image"
        imageSrc="/hero-guard.webp"
        eyebrow="SECURITY GUARD COST CALCULATOR"
        title={<SplitTextReveal text="Know Your Guard Cost in 30 Seconds." mode="words" />}
        subtitle="Select your state, category and coverage — get a transparent monthly estimate including wages, statutory compliances and service charges. Rates are state-wise minimum-wage linked."
        size="tall"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Cost Calculator</span>
          </nav>
        }
      />

      {/* GEO answer block */}
      <section className="svc-answer-card brand-card shell" aria-label="At a glance">
        <p className="svc-answer-card__text">
          Silbar Security Services Pvt. Ltd. provides a transparent security guard cost calculator
          covering all 35 states and union territories. Estimates include the state minimum wage,
          50% HRA, PF (13%), ESI (3.25%), bonus and leave provisions, uniform charges, relieving
          charges (16.67%) and service charges (10%). Rates are VDA-linked and revised when state
          minimum wages change. Example: a 12-hour single-shift security guard post in Rajasthan
          costs approximately ₹15,653 per guard per month (excl. GST).
        </p>
      </section>

      <section className="quote-calculator-section section-pad" aria-labelledby="quote-calc-heading">
        <div className="shell">
          <ScrollReveal>
            <h2 id="quote-calc-heading" className="section-heading" style={{ marginBottom: '1rem' }}>
              Instant Security Guard <em>Quote Estimate.</em>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
              State-wise rates for {QUOTE_RATES.length} states &amp; UTs ·{' '}
              {QUOTE_RATES.filter((r) => r.verified).length} verified from the official rate sheet ·
              estimates are indicative until confirmed by our team.
            </p>
          </ScrollReveal>
          <QuoteCalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="quote-how-section section-pad brand-rail" aria-labelledby="quote-how-heading">
        <div className="shell">
          <ScrollReveal>
            <h2 id="quote-how-heading" className="section-heading section-heading--on-dark" style={{ marginBottom: '2rem' }}>
              What the Estimate <em>Includes.</em>
            </h2>
          </ScrollReveal>
          <div className="quote-how-grid">
            {[
              { t: 'State Minimum Wage', d: 'Each state and UT has its own notified minimum wage for security guards, revised twice a year with VDA. The calculator uses the latest available figures.' },
              { t: 'Statutory Compliances', d: 'PF (13% of basic), ESI (3.25% of gross, where applicable), bonus and leave provisions — fully transparent, no hidden charges.' },
              { t: 'Relieving & Service Charges', d: 'Relieving charges (16.67%) keep posts covered during leave and absence; service charges (10%) cover supervision, reporting and account management.' },
              { t: 'Final Written Quote', d: 'Send the estimate on WhatsApp and our team responds with a written quotation scoped to your site — posts, shifts, supervision and compliance.' },
            ].map((f, i) => (
              <ScrollReveal key={f.t} delay={i * 0.08} className="quote-how-card">
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad brand-rail" aria-labelledby="qc-faq-title">
        <div className="shell" style={{ maxWidth: '860px' }}>
          <ScrollReveal>
            <h2 id="qc-faq-title" className="section-heading" style={{ marginBottom: '2rem' }}>
              Cost Calculator <em>FAQs.</em>
            </h2>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { q: 'Is this a final quotation?', a: 'No — the calculator gives a transparent indicative estimate based on current state minimum wages. A final written quotation is confirmed after we scope your site (posts, shifts, supervision, compliance).' },
              { q: 'Why do guard rates differ by state?', a: 'Minimum wages for security guards are notified by each state government and are VDA-linked, so they vary by state and are revised periodically (typically April and October).' },
              { q: 'Is GST included in the estimate?', a: 'GST (18%) is added separately to the total billing as applicable. You can toggle it on or off in the calculator.' },
              { q: 'How many guards do I need for a 24-hour post?', a: 'A 24-hour post needs 2 guards (day + night shifts). The calculator applies this automatically when you select 24-hour coverage.' },
              { q: 'Are lady guards charged the same as security guards?', a: 'Yes — lady guards are billed at the same rate as male security guards in the standard rate sheet.' },
              { q: 'What happens if minimum wages increase?', a: 'Rates are minimum-wage linked. If the state notifies a wage revision, the billing rate increases pro rata, as stated in our rate sheet.' },
            ].map((f) => (
              <details key={f.q} className="service-detail-faq-item">
                <summary className="service-detail-faq-q">{f.q}</summary>
                <p className="service-detail-faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PageLeadSection
        title="Get a Written Quote for Your Site"
        subtitle="Tell us your posts, shifts and location — we confirm the final rate for your state and send a written quotation."
        formType="Quote Calculator Enquiry"
      />
    </main>
  )
}
