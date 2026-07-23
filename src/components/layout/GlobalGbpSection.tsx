import { MapPin, Map, Phone, ExternalLink, Star } from 'lucide-react'
import { CONTACT, GOOGLE_REVIEWS } from '@/lib/config'

/**
 * Site-wide Silbar Google Business Profile section.
 * Rendered on every page via NavigationWrapper — all 5 official GBP listings (cid),
 * rating summary, and write-review CTAs. No bare address search links.
 */
export default function GlobalGbpSection() {
  const offices = CONTACT.officeLocations

  const localBusinessSchema = offices.map((office) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: office.placeName,
    legalName: 'Silbar Security Services Pvt. Ltd.',
    image: 'https://www.silbarsecurity.in/og-image.jpg',
    url: 'https://www.silbarsecurity.in/contact',
    telephone: office.phone,
    email: CONTACT.email,
    hasMap: office.mapUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.address.split(',')[0]?.trim(),
      addressLocality: office.city.replace(/\s*\(.*?\)\s*/g, '').trim(),
      addressRegion: office.region,
      postalCode: office.pin,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: office.lat,
      longitude: office.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Silbar Security Services Pvt. Ltd.',
      url: 'https://www.silbarsecurity.in',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(GOOGLE_REVIEWS.rating),
      reviewCount: String(GOOGLE_REVIEWS.reviewCountNumber),
      bestRating: '5',
      worstRating: '1',
    },
  }))

  return (
    <section
      className="global-gbp"
      id="google-business-profiles"
      aria-labelledby="global-gbp-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="global-gbp__inner">
        <div className="global-gbp__header">
          <span className="section-eyebrow section-eyebrow--red">GOOGLE BUSINESS PROFILES</span>
          <h2 id="global-gbp-heading" className="section-heading global-gbp__title">
            Silbar Security Services Pvt. Ltd. <em>on Google</em>
          </h2>
          <p className="global-gbp__sub">
            Official Google Business Profile locations — New Delhi, Gurugram, Jaipur, Noida &amp; Ahmedabad.
            Directions, reviews, and office details for Silbar Security Services Pvt. Ltd.
          </p>

          <div className="global-gbp__rating" aria-label={`Google rating ${GOOGLE_REVIEWS.ratingLabel}`}>
            <span className="global-gbp__score">{GOOGLE_REVIEWS.rating}</span>
            <span className="global-gbp__stars" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} fill="var(--color-gold)" stroke="none" />
              ))}
            </span>
            <span className="global-gbp__rating-meta">
              {GOOGLE_REVIEWS.ratingLabel} · {GOOGLE_REVIEWS.reviewCount} Google reviews · Trusted by{' '}
              {GOOGLE_REVIEWS.businessesServed} businesses
            </span>
            <div className="global-gbp__rating-actions">
              <a
                href={GOOGLE_REVIEWS.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="global-gbp__btn global-gbp__btn--secondary"
              >
                View on Google <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a
                href={GOOGLE_REVIEWS.writeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="global-gbp__btn global-gbp__btn--primary"
              >
                Review Us on Google
              </a>
            </div>
          </div>
        </div>

        <div className="global-gbp__grid">
          {offices.map((office) => (
            <article key={office.mapUrl} className="global-gbp-card">
              <div className="global-gbp-card__top">
                <span className="global-gbp-card__badge">{office.badge}</span>
                <h3 className="global-gbp-card__name">
                  <MapPin size={16} aria-hidden="true" />
                  {office.placeName}
                </h3>
                <p className="global-gbp-card__address">{office.address}</p>
                <a href={`tel:${office.phoneRaw}`} className="global-gbp-card__phone">
                  <Phone size={13} aria-hidden="true" /> {office.phone}
                </a>
                <p className="global-gbp-card__hours">{office.hours}</p>
              </div>

              <div className="global-gbp-card__map">
                <iframe
                  src={office.mapEmbed}
                  title={`${office.placeName} — Silbar Security Services Pvt. Ltd. Google Map`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="global-gbp-card__iframe"
                />
              </div>

              <div className="global-gbp-card__actions">
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="global-gbp-card__link"
                >
                  <Map size={14} aria-hidden="true" />
                  Open Google Business Profile
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="global-gbp__footer-note">
          Silbar Security Services Pvt. Ltd. · Call{' '}
          <a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phone}</a>
          {' · '}
          PSARA line <a href={`tel:${CONTACT.psaraPhoneRaw}`}>{CONTACT.psaraPhone}</a>
          {' · '}
          <a href="/contact">Contact / Quote</a>
        </p>
      </div>
    </section>
  )
}
