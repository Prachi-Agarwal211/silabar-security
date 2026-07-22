import type { Metadata } from 'next'
import ScrollReveal from '@/components/animations/ScrollReveal'
import PageHero from '@/components/layout/PageHero'
import { Phone, MapPin, TrendingUp, Users, Shield } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: 'Franchise Opportunities — Partner with Silbar Security India | PAN India',
  description:
    'Become a Silbar Security India franchise partner. Low investment, high returns. Training, brand support, 200+ cities available. Apply now.',
  ...ogMetadata('Franchise Opportunities — Partner with Silbar Security India', 'Become a Silbar Security India franchise partner. Low investment, high returns. Training, brand support, 200+ cities available. Apply now.', '/franchise'),
}

const WHY_FRANCHISE = [
  { icon: Shield, title: 'Trusted Brand', desc: '20+ years of operational excellence with ISO 9001:2015 certification' },
  { icon: TrendingUp, title: 'High ROI', desc: 'Proven business model with consistent revenue growth for partners' },
  { icon: Users, title: 'Full Support', desc: 'End-to-end training, operations support, and marketing assistance' },
  { icon: MapPin, title: '200+ Cities', desc: 'Expansion opportunities across PAN India in tier-1, tier-2, and tier-3 cities' },
]

const STEPS = [
  { step: '01', title: 'Apply', desc: 'Submit your franchise inquiry form with your preferred city and investment capacity.' },
  { step: '02', title: 'Evaluate', desc: 'Our team reviews your profile and schedules a meeting to discuss the opportunity.' },
  { step: '03', title: 'Agree', desc: 'Sign the franchise agreement and finalize investment terms.' },
  { step: '04', title: 'Launch', desc: 'Complete training, set up operations, and go live with full brand support.' },
]

const INVESTMENTFAQ = [
  {
    q: 'What is the investment required?',
    a: 'Investment varies by city tier and scale. Contact our franchise team for detailed breakdowns including security deposit, working capital, and setup costs.',
  },
  {
    q: 'What training is provided?',
    a: 'Comprehensive training at our 3-acre facility covering security operations, client management, technology systems, and business operations.',
  },
  {
    q: 'What is the expected ROI?',
    a: 'Our franchise partners typically achieve profitability within 6-12 months. ROI varies by city and scale of operations.',
  },
  {
    q: 'What territories are available?',
    a: 'We have opportunities in 200+ cities across India. Priority markets include tier-2 and tier-3 cities with growing security demand.',
  },
]

export default function FranchisePage() {
  return (
    <main className="service-detail-page">
      <PageHero
        eyebrow="Franchise Opportunities"
        title={<>Partner with <em>India&apos;s Fastest-Growing</em> Security Company</>}
        subtitle="Join 200+ franchise partners across India. Low investment, high returns, and full operational support from a 20-year trusted brand."
        bottomContent={
          <div className="franchise-hero-ctas">
            <a href="#franchise-form" className="service-detail-cta service-detail-cta--primary">
              Apply for Franchise
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--secondary">
              <Phone size={16} /> Call: {CONTACT.phone}
            </a>
          </div>
        }
      />

      <section className="franchise-section">
        <div className="franchise-section__inner">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">Why Partner With Us</span>
            <h2 className="section-heading franchise-section__heading">
              Built for <em>Growth.</em>
            </h2>
          </ScrollReveal>
          <div className="franchise-grid">
            {WHY_FRANCHISE.map(({ icon: Icon, title, desc }) => (
              <ScrollReveal key={title}>
                <div className="franchise-card">
                  <div className="franchise-card__icon-wrap">
                    <Icon size={24} color="var(--color-cherry)" />
                  </div>
                  <h3 className="franchise-card__title">{title}</h3>
                  <p className="franchise-card__desc">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="franchise-section franchise-section--dark">
        <div className="franchise-section__inner franchise-section__inner--narrow">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">How It Works</span>
            <h2 className="section-heading franchise-section__heading--light">
              Four Steps to <em>Partnership.</em>
            </h2>
          </ScrollReveal>
          <div className="franchise-steps-grid">
            {STEPS.map(({ step, title, desc }) => (
              <ScrollReveal key={step}>
                <div className="franchise-step">
                  <div className="franchise-step__num">{step}</div>
                  <h3 className="franchise-step__title">{title}</h3>
                  <p className="franchise-step__desc">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="franchise-section">
        <div className="franchise-section__inner franchise-section__inner--narrow">
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">Frequently Asked</span>
            <h2 className="section-heading franchise-section__heading">
              Franchise <em>Questions.</em>
            </h2>
          </ScrollReveal>
          <div className="franchise-faq-list">
            {INVESTMENTFAQ.map(({ q, a }, i) => (
              <ScrollReveal key={i}>
                <details className="franchise-faq-item">
                  <summary className="franchise-faq-item__q">{q}</summary>
                  <p className="franchise-faq-item__a">{a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="franchise-cta-banner" className="service-detail-bottom-cta franchise-cta-banner">
        <h2 className="service-detail-bottom-cta__title">Ready to Partner?</h2>
        <p className="service-detail-bottom-cta__sub">
          Fill out the form below or call us directly. Our franchise team will get back to you within 24 hours.
        </p>
        <div className="service-detail-ctas service-detail-ctas--centered">
          <a href="#franchise-form" className="service-detail-cta service-detail-cta--primary">
            Submit Franchise Inquiry
          </a>
          <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--secondary">
            <Phone size={16} /> {CONTACT.phone}
          </a>
        </div>
      </section>
    
      <PageLeadSection
        id="franchise-form"
        title="Apply for a Silbar Franchise"
        subtitle="Tell us your preferred city and investment capacity — submit opens WhatsApp with your full enquiry."
        defaultMessage="I am interested in a Silbar Security franchise partnership. Preferred city: "
        submitLabel="SUBMIT ON WHATSAPP"
        formType="Franchise Enquiry"
      />

</main>
  )
}