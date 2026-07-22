import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import { GEO_COORDINATES } from '@/lib/geo-coordinates'

export const metadata: Metadata = {
  title: 'Contact Us — Call or WhatsApp Silbar Security India',
  description:
    'Contact Silbar Security Services India for a free security consultation and quote. Call ' + CONTACT.phone + ' or email ' + CONTACT.email + '. Offices in Delhi and Gurugram.',
  ...ogMetadata('Contact Us — Call or WhatsApp Silbar Security India', 'Contact Silbar Security Services India for a free security consultation and quote. Call ' + CONTACT.phone + ' or email ' + CONTACT.email + '. Offices in Delhi and Gurugram.', '/contact'),
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
            name: 'Silbar Security Services Pvt. Ltd. (Registered Office)',
            image: 'https://www.silbarsecurity.in/og-image.jpg',
            telephone: CONTACT.phoneRaw,
            email: CONTACT.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place',
              addressLocality: 'New Delhi',
              addressRegion: 'Delhi',
              postalCode: '110001',
              addressCountry: 'IN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: GEO_COORDINATES['delhi-office']?.lat || 28.6315,
              longitude: GEO_COORDINATES['delhi-office']?.lng || 77.2335,
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
            name: 'Silbar Security Services — Gurugram (Corporate Office)',
            telephone: CONTACT.phoneRaw,
            address: { '@type': 'PostalAddress', streetAddress: '2nd Floor, MPD Tower, Golf Course Road, Sector 43', addressLocality: 'Gurugram', addressRegion: 'Haryana', postalCode: '122002', addressCountry: 'IN' },
            geo: { '@type': 'GeoCoordinates', latitude: 28.4595, longitude: 77.0266 },
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
            <p className="contact-reg-office">
              Registered Office: Statesman House, Barakhamba Road, Connaught Place, New Delhi
            </p>
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
                  <span className="contact-info-row__label">Registered Office</span>
                  <span className="contact-info-row__value">Statesman House, Barakhamba Rd, Connaught Place, New Delhi 110001</span>
                </span>
              </div>
              <div className="contact-info-row contact-info-row--static">
                <span className="contact-info-row__icon" aria-hidden="true"><MapPin size={18} /></span>
                <span className="contact-info-row__body">
                  <span className="contact-info-row__label">Corporate Office</span>
                  <span className="contact-info-row__value">MPD Tower, Golf Course Rd, Sector 43, Gurugram 122002</span>
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
            <span className="section-eyebrow section-eyebrow--red u-block u-mb-1">QUICK QUOTE</span>
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
          <div className="u-mb-2">
            <QueryForm />
          </div>

          {/* Office locations */}
          <ScrollReveal delay={0.1} className="contact-offices">
            <span className="section-eyebrow section-eyebrow--red u-block u-mb-1">OUR OFFICES</span>
            <h2 className="section-heading contact-offices-heading">
              Find Us <em>Nearby.</em>
            </h2>
            <div className="contact-offices-grid">
              {CONTACT.officeLocations.map((office) => (
                <div key={office.city} className="office-card">
                  <div className="office-card__badge">{office.badge}</div>
                  <div className="office-card__header">
                    <MapPin size={18} aria-hidden="true" />
                    {office.city}
                  </div>
                  <p className="office-card__address">{office.address}</p>
                  <a href={`tel:${office.phoneRaw}`} className="office-card__phone">
                    <Phone size={14} aria-hidden="true" /> {office.phone}
                  </a>
                  <div className="office-card__hours">
                    <Clock size={13} aria-hidden="true" /> {office.hours}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Google Maps */}
          <div className="u-mt-2">
            <span className="section-eyebrow section-eyebrow--red u-block u-mb-1">FIND US ON MAP</span>
            <div className="contact-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2!2d77.2332!3d28.6308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd1a0c0c0c0f%3A0x0!2sStatesman+House%2C+148+Barakhamba+Rd%2C+Connaught+Place%2C+New+Delhi+110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                className="contact-map-frame"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Silbar Security Registered Office - Statesman House, New Delhi"
              />
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
