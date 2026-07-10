import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
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
              openingHoursSpecification: [ { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' } ],
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
              image: 'https://www.silbarsecurity.in/og-image.jpg',
              telephone: CONTACT.phoneRaw,
              address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressRegion: 'Delhi', addressCountry: 'IN' },
              geo: { '@type': 'GeoCoordinates', latitude: GEO_COORDINATES['delhi-office']?.lat || 28.6139, longitude: GEO_COORDINATES['delhi-office']?.lng || 77.2090 },
              openingHoursSpecification: [ { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' } ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Silbar Security Services — Ahmedabad',
              image: 'https://www.silbarsecurity.in/og-image.jpg',
              telephone: CONTACT.phoneRaw,
              address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', addressCountry: 'IN' },
              geo: { '@type': 'GeoCoordinates', latitude: GEO_COORDINATES['ahmedabad-office']?.lat || 23.0225, longitude: GEO_COORDINATES['ahmedabad-office']?.lng || 72.5714 },
              openingHoursSpecification: [ { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' } ]
            }
          ])
        }} />
      <section className="contact-hero">
        <ScrollReveal className="contact-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Contact</span>
          </nav>
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h1 className="contact-title">
            <SplitTextReveal text="REQUEST A" />
            <br />
            <span className="contact-title--outline">
              <SplitTextReveal text="FREE QUOTE" delay={0.2} />
            </span>
          </h1>
          <p className="contact-subtitle">
            Tell us about your facility. Our security consultants will
            respond within 2 business hours.
          </p>
        </ScrollReveal>
      </section>

      <section className="contact-body">
        <div className="contact-body__inner">

          {/* Contact cards */}
          <div className="bento-grid contact-cards-grid">
            <ScrollReveal delay={0.2} className="bento-cell glass-panel">
              <a href={`tel:${CONTACT.phoneRaw}`} className="contact-card__inner">
                <div className="contact-card__icon-wrap"><Phone size={28} /></div>
                <div className="contact-card__label">CALL US DIRECTLY</div>
                <div className="contact-card__value">{CONTACT.phone}</div>
                <div className="contact-card__note">Mon–Sat, 9AM–7PM IST</div>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="bento-cell glass-panel">
              <a href={`tel:${CONTACT.landlineRaw}`} className="contact-card__inner">
                <div className="contact-card__icon-wrap"><Phone size={28} /></div>
                <div className="contact-card__label">LANDLINE</div>
                <div className="contact-card__value">{CONTACT.landline}</div>
                <div className="contact-card__note">Jaipur Head Office</div>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={0.4} className="bento-cell glass-panel">
              <a href={`mailto:${CONTACT.email}`} className="contact-card__inner">
                <div className="contact-card__icon-wrap"><Mail size={28} /></div>
                <div className="contact-card__label">EMAIL US</div>
                <div className="contact-card__value">{CONTACT.email}</div>
                <div className="contact-card__note">Response within 4 hours</div>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={0.5} className="bento-cell glass-panel bento-cell--whatsapp">
              <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" className="contact-card__inner">
                <div className="contact-card__icon-wrap--whatsapp"><MessageCircle size={28} /></div>
                <div className="contact-card__label--whatsapp">WHATSAPP</div>
                <div className="contact-card__value">Instant Quote</div>
                <div className="contact-card__note">Available 24/7</div>
              </a>
            </ScrollReveal>
          </div>

          {/* Lead form */}
          <ScrollReveal delay={0.4}>
            <div className="contact-form-alternative">
              <h2 className="contact-form__title">Ready for a Quote?</h2>
              <p className="contact-form__desc">
                We provide instant quotes over WhatsApp or phone. No waiting for forms.
              </p>
              <div className="contact-form__ctas">
                <a 
                  href={CONTACT.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card--whatsapp-btn"
                >
                  <MessageCircle size={20} /> Get Instant Quote via WhatsApp
                </a>
                <a 
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="contact-card--call-btn"
                >
                  <Phone size={20} /> Call Now
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Office locations */}
          <ScrollReveal delay={0.6} className="contact-offices">
            <h2 className="contact-offices__title">Our Offices</h2>
            <div className="contact-offices-grid">
              {[
                { city: 'Jaipur (HQ)', address: '208, 2nd Floor, Samod Tower, Sansar Chand Road, Jaipur — 302001' },
                { city: 'Delhi NCR', address: 'Corporate Office, New Delhi — 110001' },
                { city: 'Ahmedabad', address: 'Ahmedabad, Gujarat — 380001' },
              ].map(({ city, address }) => (
                <div key={city} className="bento-cell glass-panel office-card">
                  <div className="office-card__header">
                    <MapPin size={20} />
                    {city}
                  </div>
                  <p className="office-card__address">{address}</p>
                  <div className="office-card__hours">
                    <Clock size={14} /> Mon–Sat: 9:00 AM – 7:00 PM
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
