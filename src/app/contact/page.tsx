import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Map } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import QueryForm from '@/components/sections/QueryForm'
import { CONTACT, GOOGLE_REVIEWS } from '@/lib/config'
import { ogMetadata } from '@/lib/metadata'
import { GEO_COORDINATES } from '@/lib/geo-coordinates'

export const metadata: Metadata = {
  title: 'Contact Us — Call or WhatsApp Silbar Security Services Pvt. Ltd.',
  description:
    'Contact Silbar Security Services Pvt. Ltd. for a free security consultation and quote. Call ' + CONTACT.phone + ' or email ' + CONTACT.email + '. Offices in Delhi, Gurugram, Jaipur, Noida & Ahmedabad.',
  ...ogMetadata('Contact Us — Call or WhatsApp Silbar Security Services Pvt. Ltd.', 'Contact Silbar Security Services Pvt. Ltd. for a free security consultation and quote. Call ' + CONTACT.phone + ' or email ' + CONTACT.email + '. Offices in Delhi, Gurugram, Jaipur, Noida & Ahmedabad.', '/contact'),
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
        __html: JSON.stringify((CONTACT.officeLocations as unknown as any[]).map((office: any, i: number) => {
          const key = office.city.toLowerCase().includes('delhi') ? 'delhi-office'
            : office.city.toLowerCase().includes('gurugram') ? 'gurugram-office'
            : office.city.toLowerCase().includes('jaipur') ? 'jaipur-office'
            : office.city.toLowerCase().includes('noida') ? 'noida-office'
            : office.city.toLowerCase().includes('ahmedabad') ? 'ahmedabad-office'
            : ''
          const geo = (office.lat && office.lng)
            ? { lat: office.lat, lng: office.lng }
            : key ? (GEO_COORDINATES as any)[key] : null
          return {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: office.placeName || `Silbar Security Services Pvt. Ltd. — ${office.city}`,
            legalName: 'Silbar Security Services Pvt. Ltd.',
            telephone: office.phoneRaw,
            email: CONTACT.email,
            url: 'https://www.silbarsecurity.in/contact',
            hasMap: office.mapUrl,
            address: {
              '@type': 'PostalAddress',
              streetAddress: office.address.split(',')[0].trim(),
              addressLocality: office.city.replace(/\s*\(.*?\)\s*/g, '').trim(),
              addressRegion: office.region,
              postalCode: office.pin || undefined,
              addressCountry: 'IN',
            },
            ...(geo ? { geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng } } : {}),
            openingHoursSpecification: [{
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
              opens: '09:00', closes: '19:00'
            }],
            ...(i === 0 ? {
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9982170555',
                contactType: 'customer service',
                areaServed: 'IN',
                availableLanguage: ['English', 'Hindi'],
              },
            } : {}),
          }
        }))
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
              Offices in Delhi, Gurugram, Jaipur, Noida &amp; Ahmedabad
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
              {CONTACT.officeLocations.map((office) => (
                <div key={(office as any).city} className="contact-info-row contact-info-row--static">
                  <span className="contact-info-row__icon" aria-hidden="true"><MapPin size={18} /></span>
                  <span className="contact-info-row__body">
                    <span className="contact-info-row__label">{(office as any).badge}</span>
                    <span className="contact-info-row__value">{(office as any).address}</span>
                  </span>
                  {(office as any).mapUrl && (
                    <a href={(office as any).mapUrl} target="_blank" rel="noopener noreferrer" className="contact-info-row__map" aria-label={`View ${(office as any).city} on map`}>
                      <Map size={14} />
                    </a>
                  )}
                </div>
              ))}
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
              <span>ISO 9001:2015 Certified</span> · <span>PSARA Licensed</span> · <span>★ {GOOGLE_REVIEWS.ratingLabel}</span> · <span>{GOOGLE_REVIEWS.reviewCount} Google reviews</span>
            </p>
            <a
              href={GOOGLE_REVIEWS.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lead-social-proof__link"
              style={{ display: 'inline-block', marginTop: '0.75rem' }}
            >
              View Silbar on Google →
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Contact Details Cards ─── */}
      <section className="contact-body" aria-label="Contact details">
        <div className="contact-body__inner">
          <div className="u-mb-2">
            <div className="lead-social-proof" aria-label="Google reviews summary">
              <span className="lead-social-proof__rating">★ {GOOGLE_REVIEWS.ratingLabel}</span>
              <p className="lead-social-proof__text">
                {GOOGLE_REVIEWS.reviewCount} Google reviews · Trusted by {GOOGLE_REVIEWS.businessesServed} businesses · Silbar Security Services Pvt. Ltd.
              </p>
              <a href={GOOGLE_REVIEWS.writeUrl} target="_blank" rel="noopener noreferrer" className="lead-social-proof__link">
                Review Us on Google →
              </a>
            </div>
            <QueryForm
              title="Get a Free Security Quote"
              subtitle="Tell us about your facility — submit opens WhatsApp with your details so we can reply instantly."
              formType="Contact Page Quote"
            />
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
                    {(office as any).placeName || office.city}
                  </div>
                  <p className="office-card__address">{office.address}</p>
                  <a href={`tel:${office.phoneRaw}`} className="office-card__phone">
                    <Phone size={14} aria-hidden="true" /> {office.phone}
                  </a>
                  <div className="office-card__hours">
                    <Clock size={13} aria-hidden="true" /> {office.hours}
                  </div>
                  {office.mapUrl && (
                    <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="office-card__map-btn">
                      <Map size={13} aria-hidden="true" /> View on Map
                    </a>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Maps + full GBP grid render site-wide in GlobalGbpSection (every page) */}
          <div className="u-mt-2" style={{ textAlign: 'center' }}>
            <a href="#google-business-profiles" className="office-card__map-btn" style={{ display: 'inline-flex' }}>
              <Map size={13} aria-hidden="true" /> View all Silbar Google Business Profiles &amp; maps below
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
