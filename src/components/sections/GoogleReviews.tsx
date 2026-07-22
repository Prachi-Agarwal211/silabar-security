'use client'

import { useEffect, useRef } from 'react'
import { GOOGLE_REVIEWS } from '@/lib/config'

export default function GoogleReviews() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasWidget = Boolean(GOOGLE_REVIEWS.embedScriptSrc)

  useEffect(() => {
    if (!hasWidget || !containerRef.current) return
    const existing = containerRef.current.querySelector('script')
    if (existing) return
    const sc = document.createElement('script')
    sc.src = GOOGLE_REVIEWS.embedScriptSrc
    sc.async = true
    containerRef.current.appendChild(sc)
  }, [hasWidget])

  const linkProps = {
    href: GOOGLE_REVIEWS.writeUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'google-review-btn',
  }

  if (hasWidget) {
    return (
      <section className="google-reviews-section" aria-labelledby="reviews-title">
        <div className="shell">
          <span className="section-eyebrow">SOCIAL PROOF</span>
          <h2 id="reviews-title" className="section-heading">
            What Our <em>Clients Say</em>
          </h2>
          <p className="section-subtitle">
            Real feedback from businesses we protect across India.
          </p>
          <div ref={containerRef} dangerouslySetInnerHTML={{ __html: GOOGLE_REVIEWS.embedDivAttrs }} />
          <div className="google-reviews-cta">
            <a {...linkProps}>
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="google-reviews-section" aria-labelledby="reviews-title">
      <div className="shell">
        <span className="section-eyebrow">SOCIAL PROOF</span>
        <h2 id="reviews-title" className="section-heading">
          What Our <em>Clients Say</em>
        </h2>
        <p className="section-subtitle">
          Trusted by <strong>500+</strong> businesses across India. Read what our clients say about us.
        </p>

        <div className="google-reviews-rating-card">
          <div className="google-reviews-stars-large">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="google-reviews-rating-text">{GOOGLE_REVIEWS.rating} / 5</span>
          <span className="google-reviews-count-text">{GOOGLE_REVIEWS.reviewCount} reviews on Google</span>
          <a {...linkProps} className="btn-primary">
            Review Us on Google
          </a>
        </div>
      </div>
    </section>
  )
}
