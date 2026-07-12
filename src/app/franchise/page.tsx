import type { Metadata } from 'next'
import ScrollReveal from '@/components/animations/ScrollReveal'
import PageHero from '@/components/layout/PageHero'
import { Phone, MapPin, TrendingUp, Users, Shield } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Franchise Opportunities — Partner with Silbar Security | PAN India',
  description:
    'Become a Silbar Security franchise partner. Low investment, high returns. Professional training, brand support, and 200+ cities available. Apply now for franchise opportunities.',
  ...ogMetadata('Franchise Opportunities — Partner with Silbar Security', 'Become a Silbar Security franchise partner. Low investment, high returns. Professional training, brand support, and 200+ cities available.', '/franchise'),
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
      {/* Hero */}
      <PageHero
        eyebrow="Franchise Opportunities"
        title={<>Partner with <em>India&apos;s Fastest-Growing</em> Security Company</>}
        subtitle="Join 200+ franchise partners across India. Low investment, high returns, and full operational support from a 20-year trusted brand."
        bottomContent={
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <a href="#franchise-form" className="service-detail-cta service-detail-cta--primary">
              Apply for Franchise
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--secondary">
              <Phone size={16} /> Call: {CONTACT.phone}
            </a>
          </div>
        }
      />

      {/* Why Franchise */}
      <section className="service-detail-why" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">Why Partner With Us</span>
            <h2 className="section-heading" style={{ marginBottom: '3rem' }}>
              Built for <em>Growth.</em>
            </h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {WHY_FRANCHISE.map(({ icon: Icon, title, desc }) => (
              <ScrollReveal key={title}>
                <div style={{ padding: '2rem', background: 'var(--color-paper)', borderRadius: '12px', border: '1px solid rgba(191,149,63,0.15)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(140,31,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={24} color="var(--color-cherry)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-midnight)', marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="service-detail-process" style={{ padding: '6rem 2rem', background: 'var(--color-midnight)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">How It Works</span>
            <h2 className="section-heading" style={{ color: 'white', marginBottom: '3rem' }}>
              Four Steps to <em>Partnership.</em>
            </h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {STEPS.map(({ step, title, desc }) => (
              <ScrollReveal key={step}>
                <div style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-cherry)', marginBottom: '1rem' }}>{step}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="service-detail-faq" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ScrollReveal>
            <span className="section-eyebrow section-eyebrow--red">Frequently Asked</span>
            <h2 className="section-heading" style={{ marginBottom: '3rem' }}>
              Franchise <em>Questions.</em>
            </h2>
          </ScrollReveal>
          {INVESTMENTFAQ.map(({ q, a }, i) => (
            <ScrollReveal key={i}>
              <details style={{ marginBottom: '1rem', padding: '1.25rem 1.5rem', background: 'var(--color-paper)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <summary style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-midnight)', cursor: 'pointer', listStyle: 'none' }}>
                  {q}
                </summary>
                <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>{a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Franchise Form CTA */}
      <section id="franchise-form" className="service-detail-bottom-cta" style={{ background: 'linear-gradient(135deg, var(--color-cherry-deep) 0%, var(--color-cherry) 100%)' }}>
        <h2 className="service-detail-bottom-cta__title">Ready to Partner?</h2>
        <p className="service-detail-bottom-cta__sub">
          Fill out the form below or call us directly. Our franchise team will get back to you within 24 hours.
        </p>
        <div className="service-detail-ctas service-detail-ctas--centered">
          <a href="/contact" className="service-detail-cta service-detail-cta--primary">
            Submit Franchise Inquiry
          </a>
          <a href={`tel:${CONTACT.phoneRaw}`} className="service-detail-cta service-detail-cta--secondary">
            <Phone size={16} /> {CONTACT.phone}
          </a>
        </div>
      </section>
    </main>
  )
}
