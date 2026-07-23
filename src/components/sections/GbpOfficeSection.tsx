import { MapPin, Map, ExternalLink } from 'lucide-react'
import type { OfficeLocation } from '@/lib/config'
import ScrollReveal from '@/components/animations/ScrollReveal'

type Props = {
  placeLabel: string
  offices: readonly OfficeLocation[]
  /** true = city has its own Silbar GBP; false = nearest hub for this region */
  isLocalOffice?: boolean
}

/**
 * Google Business Profile map + link block for city / state SEO pages.
 * Always shows at least one Silbar office GBP (cid), never a bare address search.
 */
export default function GbpOfficeSection({ placeLabel, offices, isLocalOffice = true }: Props) {
  if (!offices.length) return null

  return (
    <section className="seo-gbp-section" aria-label={`Silbar Security Services Pvt. Ltd. Google location for ${placeLabel}`}>
      <div className="service-detail-section-inner">
        <ScrollReveal>
          <h2 className="service-detail-section-title">
            {isLocalOffice
              ? `Silbar Security Services Pvt. Ltd. Office — ${placeLabel}`
              : `Silbar Security Services Pvt. Ltd. — Google Business Profile near ${placeLabel}`}
          </h2>
          <p className="seo-cities-note" style={{ marginBottom: '1.25rem' }}>
            {isLocalOffice
              ? `Visit our official Google Business Profile for ${placeLabel}. Address, directions, and reviews for Silbar Security Services Pvt. Ltd.`
              : `We serve ${placeLabel} with PAN India deployment. Open our nearest Silbar Security Services Pvt. Ltd. Google Business Profile for directions and reviews.`}
          </p>
        </ScrollReveal>

        <div className={`seo-gbp-grid${offices.length === 1 ? ' seo-gbp-grid--single' : ''}`}>
          {offices.map((office) => (
            <article key={office.mapUrl} className="seo-gbp-card">
              <div className="seo-gbp-card__meta">
                <span className="seo-gbp-card__badge">{office.badge}</span>
                <h3 className="seo-gbp-card__title">
                  <MapPin size={16} aria-hidden="true" />
                  {office.placeName}
                </h3>
                <p className="seo-gbp-card__address">{office.address}</p>
                <a href={`tel:${office.phoneRaw}`} className="seo-gbp-card__phone">
                  {office.phone}
                </a>
              </div>
              <div className="seo-gbp-card__map">
                <iframe
                  src={office.mapEmbed}
                  width="100%"
                  height="260"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${office.placeName} — Google Business Profile map`}
                  className="seo-gbp-card__iframe"
                />
              </div>
              <a
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="seo-gbp-card__link"
              >
                <Map size={14} aria-hidden="true" />
                Open Silbar Google Business Profile
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
