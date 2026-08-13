import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { ogMetadata, seoTitle } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: seoTitle('Silbar Security — ISO-Certified Security Agency | Jaipur, Delhi, Ahmedabad'),
  description:
    'ISO 9001:2015 certified Indian security agency. 7,000+ professionals. Manned guarding, CCTV, facility management across India. Call for a free quote.',
  ...ogMetadata('Silbar Security Services Pvt. Ltd. — ISO-Certified Security Agency', 'ISO 9001:2015 certified. 7,000+ professionals. Manned guarding, CCTV, facility management across India.', '/google'),
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
  '7,000+ Professionals',
  'Est. 2018 · Jaipur',
  'Startup India · MSME Registered',
]

export default function GoogleLandingPage() {
  return (
    <main className="google-main">
      {/* Hero — Quick Trust */}
      <section className="google-hero">
        <ScrollReveal>
          <Image src="/logo.webp" alt="Silbar Security" width={100} height={100} className="google-logo" />
          <h1 className="google-h1">
            Silbar Security Services <span className="google-h1__accent">Pvt. Ltd.</span>
          </h1>
          <p className="google-hero-sub">
            India&apos;s ISO 9001:2015 certified security agency with 7,000+ professionals protecting businesses, homes, and events across PAN India with PSARA licenses in 19 states and 4 ISO certifications.
          </p>
        </ScrollReveal>

        {/* Quick CTAs */}
        <div className="google-cta-row">
          <a href={`tel:${CONTACT.phoneRaw}`} className="google-cta">
            <Phone size={20} /> Call Now
          </a>
          <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" className="google-cta google-cta--whatsapp">
            WhatsApp Us
          </a>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="google-trust-band">
        <div className="google-trust-inner">
          {TRUST_BADGES.map((badge) => (
            <div key={badge} className="google-trust-badge">
              <Shield size={14} /> {badge}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="google-services">
        <ScrollReveal>
          <h2 className="google-section-title">
            Our <span className="google-section-title__accent">Services</span>
          </h2>
        </ScrollReveal>
        <div className="google-services-grid">
          {SERVICES_LIST.map((service) => (
            <ScrollReveal key={service}>
              <div className="google-service-card">
                <CheckCircle size={18} color="var(--color-gold)" />
                <span className="google-service-card__text">{service}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="google-center-link">
          <Link href="/services" className="google-view-all">
            View All Services →
          </Link>
        </div>
      </section>

      {/* Contact Info */}
      <section className="google-contact">
        <div className="google-contact-inner">
          <ScrollReveal>
            <h2 className="google-section-title">
              Contact <span className="google-section-title__accent">Us</span>
            </h2>
          </ScrollReveal>
          <div className="google-contact-grid">
            <a href={`tel:${CONTACT.phoneRaw}`} className="google-contact-card">
              <div className="google-contact-icon">
                <Phone size={20} color="var(--color-cherry)" />
              </div>
              <div>
                <div className="google-contact-label">Call Us</div>
                <div className="google-contact-value">{CONTACT.phone}</div>
              </div>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="google-contact-card">
              <div className="google-contact-icon">
                <Mail size={20} color="var(--color-cherry)" />
              </div>
              <div>
                <div className="google-contact-label">Email Us</div>
                <div className="google-contact-value">{CONTACT.email}</div>
              </div>
            </a>
            <div className="google-contact-card">
              <div className="google-contact-icon">
                <MapPin size={20} color="var(--color-cherry)" />
              </div>
              <div>
                <div className="google-contact-label">Visit Us</div>
                <div className="google-contact-value google-contact-value--sm">Delhi · Gurugram · Jaipur · Noida · Ahmedabad</div>
              </div>
            </div>
            <div className="google-contact-card">
              <div className="google-contact-icon">
                <Clock size={20} color="var(--color-cherry)" />
              </div>
              <div>
                <div className="google-contact-label">Working Hours</div>
                <div className="google-contact-value">24/7 Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="google-bottom">
        <p className="google-bottom-note">
          Serving New Delhi, Gurugram, Jaipur, Noida, Ahmedabad, and 200+ cities across 19 states in India
        </p>
        <div className="google-bottom-cta-row">
          <Link href="/contact" className="google-cta google-cta--gold">
            Get Free Quote
          </Link>
          <Link href="/security-services" className="google-cta google-cta--outline">
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
