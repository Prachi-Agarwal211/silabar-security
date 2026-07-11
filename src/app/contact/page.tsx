import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import { GEO_COORDINATES } from '@/lib/geo-coordinates'

export const metadata: Metadata = {
  title: 'Contact Us — Call or WhatsApp Silbar Security',
  description:
    'Contact Silbar Security Services for a free security consultation and quote. Call ' + CONTACT.phone + ' or email ' + CONTACT.email + '. Offices in Jaipur, Delhi, and Ahmedabad.',
  ...ogMetadata('Contact Us — Call or WhatsApp Silbar Security', 'Contact Silbar Security Services for a free security consultation and quote. Call ' + CONTACT.phone + ' or email ' + CONTACT.email + '. Offices in Jaipur, Delhi, and Ahmedabad.', '/contact'),
}

export default function ContactPage() {
  return (
    <main className="contact-page" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Silbar Security Services',
          description: 'Contact Silbar Security Services for a free security consultation and quote.',
        })
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Silbar Security Services Pvt. Ltd. (HQ)',
            image: 'https://www.silbarsecurity.in/og-image.jpg',
            telephone: CONTACT.phoneRaw,
            email: CONTACT.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '208, 2nd Floor, Samod Tower, Sansar Chand Road',
              addressLocality: 'Jaipur',
              addressRegion: 'Rajasthan',
              postalCode: '302001',
              addressCountry: 'IN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: GEO_COORDINATES['jaipur-hq']?.lat || 26.9124,
              longitude: GEO_COORDINATES['jaipur-hq']?.lng || 75.7873,
            },
            openingHoursSpecification: [{
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
              opens: '09:00', closes: '19:00'
            }],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91-9352303333',
              contactType: 'customer service',
              areaServed: 'IN',
              availableLanguage: ['English', 'Hindi'],
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Silbar Security Services — Delhi NCR',
            telephone: CONTACT.phoneRaw,
            address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressRegion: 'Delhi', addressCountry: 'IN' },
            geo: { '@type': 'GeoCoordinates', latitude: GEO_COORDINATES['delhi-office']?.lat || 28.6139, longitude: GEO_COORDINATES['delhi-office']?.lng || 77.2090 },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Silbar Security Services — Ahmedabad',
            telephone: CONTACT.phoneRaw,
            address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', addressCountry: 'IN' },
            geo: { '@type': 'GeoCoordinates', latitude: GEO_COORDINATES['ahmedabad-office']?.lat || 23.0225, longitude: GEO_COORDINATES['ahmedabad-office']?.lng || 72.5714 },
          }
        ])
      }} />

      {/* ─── Hero Split — 2-column editorial intro ─── */}
      <section className="contact-hero-split" aria-labelledby="contact-heading">
        <div className="contact-hero-split__inner">
          {/* Left column: heading + contact info list */}
          <div className="contact-hero-left">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__link">Home</Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__current">Contact</span>
            </nav>
            <span className="section-eyebrow section-eyebrow--red">GET IN TOUCH</span>
            <h1 id="contact-heading" className="section-heading contact-heading">
              Let&apos;s Build a Safer <em>Tomorrow.</em> Together.
            </h1>
            <p className="contact-intro-body">
              Tell us about your facility. Our security consultants will respond within 2 business hours
              with a tailored proposal and pricing.
            </p>

            {/* Contact info list */}
            <div className="contact-info-list">
              <a href={`tel:${CONTACT.phoneRaw}`} className="contact-info-row">
                <span className="contact-info-row__icon" aria-hidden="true"><Phone size={18} /></span>
                <span className="contact-info-row__body">
                  <span className="contact-info-row__label">Mobile</span>
                  <span className="contact-info-row__value">{CONTACT.phone}</span>
                </span>
                <ArrowRight size={14} aria-hidden="true" className="contact-info-row__arrow" />
              </a>
              <a href={`tel:${CONTACT.landlineRaw}`} className="contact-info-row">
                <span className="contact-info-row__icon" aria-hidden="true"><Phone size={18} /></span>
                <span className="contact-info-row__body">
                  <span className="contact-info-row__label">Landline (HQ)</span>
                  <span className="contact-info-row__value">{CONTACT.landline}</span>
                </span>
                <ArrowRight size={14} aria-hidden="true" className="contact-info-row__arrow" />
              </a>
              <a href={`mailto:${CONTACT.email}`} className="contact-info-row">
                <span className="contact-info-row__icon" aria-hidden="true"><Mail size={18} /></span>
                <span className="contact-info-row__body">
                  <span className="contact-info-row__label">Email</span>
                  <span className="contact-info-row__value">{CONTACT.email}</span>
                </span>
                <ArrowRight size={14} aria-hidden="true" className="contact-info-row__arrow" />
              </a>
              <div className="contact-info-row contact-info-row--static">
                <span className="contact-info-row__icon" aria-hidden="true"><MapPin size={18} /></span>
                <span className="contact-info-row__body">
                  <span className="contact-info-row__label">Headquarters</span>
                  <span className="contact-info-row__value">Samod Tower, Sansar Chand Rd, Jaipur 302001</span>
                </span>
              </div>
              <div className="contact-info-row contact-info-row--static">
                <span className="contact-info-row__icon" aria-hidden="true"><Clock size={18} /></span>
                <span className="contact-info-row__body">
                  <span className="contact-info-row__label">Office Hours</span>
                  <span className="contact-info-row__value">Mon–Sat 9:00 AM – 7:00 PM · Emergency: 24/7</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right column: CTA card */}
          <ScrollReveal delay={0.15} className="contact-cta-card">
            <span className="section-eyebrow section-eyebrow--red" style={{ marginBottom: '1.25rem', display: 'block' }}>QUICK QUOTE</span>
            <h2 className="contact-cta-card__title">
              We Respond in <em>2 Hours</em>
            </h2>
            <p className="contact-cta-card__desc">
              Skip the form. Get an instant quote over WhatsApp or call our security consultants directly.
            </p>
            <div className="contact-cta-card__buttons">
              <a
                href={CONTACT.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-whatsapp-btn"
                id="contact-whatsapp-btn"
              >
                <MessageCircle size={20} aria-hidden="true" />
                Get Quote via WhatsApp
              </a>
              <a href={`tel:${CONTACT.phoneRaw}`} className="btn-secondary" id="contact-call-btn">
                <Phone size={14} aria-hidden="true" /> Call Now
              </a>
            </div>
            <p className="contact-cta-card__guarantee">
              <span>ISO 9001:2015 Certified</span> · <span>PSARA Licensed</span> · <span>PAN India</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Contact Details Cards ─── */}
      <section className="contact-body" aria-label="Contact details">
        <div className="contact-body__inner">
          <div style={{ marginBottom: '4rem' }}>
            <QueryForm />
          </div>

          {/* Office locations */}
          <ScrollReveal delay={0.1} className="contact-offices">
            <span className="section-eyebrow section-eyebrow--red" style={{ marginBottom: '1rem', display: 'block' }}>OUR OFFICES</span>
            <h2 className="section-heading contact-offices-heading">
              Find Us <em>Nearby.</em>
            </h2>
            <div className="contact-offices-grid" style={{ marginTop: '1.5rem' }}>
              {[
                { city: 'Jaipur (HQ)', address: '208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001', badge: 'Headquarters' },
                { city: 'Delhi NCR', address: 'Corporate Office, New Delhi — 110001', badge: 'North India' },
                { city: 'Ahmedabad', address: 'Ahmedabad, Gujarat — 380001', badge: 'West India' },
              ].map(({ city, address, badge }) => (
                <div key={city} className="office-card">
                  <div className="office-card__badge">{badge}</div>
                  <div className="office-card__header">
                    <MapPin size={18} aria-hidden="true" />
                    {city}
                  </div>
                  <p className="office-card__address">{address}</p>
                  <div className="office-card__hours">
                    <Clock size={13} aria-hidden="true" /> Mon–Sat: 9:00 AM – 7:00 PM
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>
    </main>
  )
}
