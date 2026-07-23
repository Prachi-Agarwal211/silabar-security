'use client'

import { useEffect, useRef } from 'react'
import { Star, ExternalLink, MapPin, Quote } from 'lucide-react'
import { GOOGLE_REVIEWS, CONTACT } from '@/lib/config'
import { CLIENT_REVIEWS } from '@/data/reviews'

type Props = {
  /** full = homepage block; compact = lighter strip for inner pages */
  variant?: 'full' | 'compact'
  className?: string
}

function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  return (
    <span className="google-reviews-stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= value ? 'var(--color-gold)' : 'transparent'}
          stroke={i <= value ? 'var(--color-gold)' : 'rgba(11,14,20,0.2)'}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

export default function GoogleReviews({ variant = 'full', className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasWidget = Boolean(GOOGLE_REVIEWS.embedScriptSrc)

  useEffect(() => {
    if (!hasWidget || !containerRef.current) return
    if (containerRef.current.querySelector('script')) return
    const sc = document.createElement('script')
    sc.src = GOOGLE_REVIEWS.embedScriptSrc
    sc.async = true
    containerRef.current.appendChild(sc)
  }, [hasWidget])

  const reviews = variant === 'compact' ? CLIENT_REVIEWS.slice(0, 3) : CLIENT_REVIEWS

  if (hasWidget) {
    return (
      <section className={`google-reviews-section ${className}`.trim()} aria-labelledby="reviews-title">
        <div className="shell">
          <span className="section-eyebrow">SOCIAL PROOF</span>
          <h2 id="reviews-title" className="section-heading">
            What Our <em>Clients Say</em>
          </h2>
          <p className="section-subtitle">
            Real feedback from businesses protected by Silbar Security Services Pvt. Ltd. across India.
          </p>
          <div ref={containerRef} dangerouslySetInnerHTML={{ __html: GOOGLE_REVIEWS.embedDivAttrs }} />
          <div className="google-reviews-cta">
            <a href={GOOGLE_REVIEWS.writeUrl} target="_blank" rel="noopener noreferrer" className="google-review-btn">
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`google-reviews-section google-reviews-section--${variant} ${className}`.trim()}
      aria-labelledby="reviews-title"
    >
      <div className="shell">
        <span className="section-eyebrow">SOCIAL PROOF</span>
        <h2 id="reviews-title" className="section-heading">
          What Our <em>Clients Say</em>
        </h2>
        <p className="section-subtitle">
          Trusted by <strong>{GOOGLE_REVIEWS.businessesServed}</strong> businesses across India.
          Silbar Security Services Pvt. Ltd. — PSARA licensed, 4 ISO certified, rated{' '}
          <strong>{GOOGLE_REVIEWS.ratingLabel}</strong> from {GOOGLE_REVIEWS.reviewCount} Google reviews.
        </p>

        {/* Rating summary */}
        <div className="google-reviews-summary">
          <div className="google-reviews-summary__score">
            <span className="google-reviews-summary__number">{GOOGLE_REVIEWS.rating}</span>
            <Stars value={5} size={22} />
            <span className="google-reviews-summary__meta">
              {GOOGLE_REVIEWS.ratingLabel}
              <br />
              {GOOGLE_REVIEWS.reviewCount} reviews on Google
            </span>
          </div>
          <div className="google-reviews-summary__actions">
            <a
              href={GOOGLE_REVIEWS.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View on Google <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={GOOGLE_REVIEWS.writeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Review Us on Google
            </a>
          </div>
        </div>

        {/* Review cards */}
        <div className="google-reviews-grid" role="list">
          {reviews.map((r) => (
            <article key={`${r.name}-${r.company}`} className="google-review-card" role="listitem">
              <Quote size={20} className="google-review-card__quote-icon" aria-hidden="true" />
              <Stars value={r.rating} size={14} />
              <p className="google-review-card__text">&ldquo;{r.quote}&rdquo;</p>
              <footer className="google-review-card__footer">
                <div>
                  <div className="google-review-card__name">{r.name}</div>
                  <div className="google-review-card__company">{r.company}</div>
                </div>
                {(r.city || r.service) && (
                  <div className="google-review-card__tags">
                    {r.city && (
                      <span>
                        <MapPin size={11} aria-hidden="true" /> {r.city}
                      </span>
                    )}
                    {r.service && <span>{r.service}</span>}
                  </div>
                )}
              </footer>
            </article>
          ))}
        </div>

        <p className="google-reviews-contact-note">
          Need a quote? Call{' '}
          <a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phone}</a>
          {' · '}
          WhatsApp-ready enquiries · ISO 9001 · PSARA licensed
          {' · '}
          <a href="#google-business-profiles">All Google Business Profiles ↓</a>
        </p>
      </div>
    </section>
  )
}
