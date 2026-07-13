import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: 'Silbar Security Services — Trusted Security Agency | Jaipur, Delhi, Ahmedabad',
  description:
    'ISO 9001:2015 certified security agency. 7,000+ professionals. Manned guarding, CCTV surveillance, facility management across PAN India. Call now for a free quote.',
  ...ogMetadata('Silbar Security Services — Trusted Security Agency', 'ISO 9001:2015 certified. 7,000+ professionals. Manned guarding, CCTV, facility management across India.', '/google'),
  robots: { index: false, follow: true },
}

const SERVICES_LIST = [
  'Manned Guarding & Security Guards',
  'CCTV Surveillance & Monitoring',
  'Event Security Management',
  'VIP Protection & Close Protection',
  'Industrial & Factory Security',
  'Bank & ATM Security',
  'Fire Safety & Life Safety',
  'Facility Management',
]

const TRUST_BADGES = [
  '4 ISO Certified (IAF)',
  'PSARA Licensed · 19 States',
  '200+ Cities PAN India',
  '100+ Professionals',
  'Est. 2018 · Jaipur',
  'Startup India · MSME Registered',
]

export default function GoogleLandingPage() {
  return (
    <main style={{ background: 'var(--color-midnight)', minHeight: '100vh' }}>
      {/* Hero — Quick Trust */}
      <section style={{ padding: '4rem 2rem 3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <ScrollReveal>
          <Image src="/logo.webp" alt="Silbar Security" width={100} height={100} style={{ margin: '0 auto 1.5rem', borderRadius: '12px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            Silbar Security <span style={{ color: 'var(--color-cherry)' }}>Services</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '2rem' }}>
            India&apos;s trusted ISO 9001:2015 certified security agency with           100+ professionals protecting businesses, homes, and events across PAN India with PSARA licenses in 19 states and 4 ISO certifications.
          </p>
        </ScrollReveal>

        {/* Quick CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <a href={`tel:${CONTACT.phoneRaw}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'var(--color-cherry)', color: 'white', borderRadius: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
            <Phone size={20} /> Call Now
          </a>
          <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: '#25D366', color: 'white', borderRadius: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
            WhatsApp Us
          </a>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {TRUST_BADGES.map((badge) => (
            <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(191,149,63,0.1)', borderRadius: '999px', color: 'var(--color-gold-light)', fontSize: '0.85rem', fontWeight: 600 }}>
              <Shield size={14} /> {badge}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <ScrollReveal>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '2rem', textAlign: 'center' }}>
            Our <span style={{ color: 'var(--color-gold)' }}>Services</span>
          </h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {SERVICES_LIST.map((service) => (
            <ScrollReveal key={service}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <CheckCircle size={18} color="var(--color-gold)" />
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', fontWeight: 500 }}>{service}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/services" style={{ color: 'var(--color-gold)', fontWeight: 600, fontSize: '0.95rem' }}>
            View All Services →
          </Link>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '2rem', textAlign: 'center' }}>
              Contact <span style={{ color: 'var(--color-gold)' }}>Us</span>
            </h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <a href={`tel:${CONTACT.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(140,31,50,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={20} color="var(--color-cherry)" />
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Call Us</div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{CONTACT.phone}</div>
              </div>
            </a>
            <a href={`mailto:${CONTACT.email}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(140,31,50,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={20} color="var(--color-cherry)" />
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Email Us</div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{CONTACT.email}</div>
              </div>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(140,31,50,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={20} color="var(--color-cherry)" />
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Visit Us</div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>New Delhi · Gurugram · Jaipur</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(140,31,50,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={20} color="var(--color-cherry)" />
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Working Hours</div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>24/7 Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Serving New Delhi, Gurugram, Jaipur, and 200+ cities across 19 states in India
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', background: 'var(--color-gold)', color: 'var(--color-midnight)', borderRadius: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
            Get Free Quote
          </Link>
          <Link href="/security-services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
            Services Near You
          </Link>
        </div>
      </section>
    
      <PageLeadSection
        title="Get Your Free Security Quote"
        subtitle="Found us on Google? Tell us about your site — we respond within 2 hours."
        defaultMessage="I found Silbar Security on Google and need a security quote."
      />

</main>
  )
}
