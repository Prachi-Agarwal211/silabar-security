import QueryForm from '@/components/sections/QueryForm'
import { CONTACT, GOOGLE_REVIEWS } from '@/lib/config'

type PageLeadSectionProps = {
  title?: string
  subtitle?: string
  /** Prefill message textarea (e.g. location or franchise intent) */
  defaultMessage?: string
  submitLabel?: string
  formType?: string
  /** Optional section id for anchor links */
  id?: string
  className?: string
  /** Show Google rating strip above the form (default true) */
  showSocialProof?: boolean
}

/**
 * Shared lead-gen block: social proof + query form + direct CTAs.
 * Submit routes to WhatsApp with all form fields prefilled.
 */
export default function PageLeadSection({
  title = 'Have a Security Question?',
  subtitle = "Fill out the form — we'll open WhatsApp with your details so our team can reply instantly.",
  defaultMessage = '',
  submitLabel,
  formType,
  id = 'get-a-quote',
  className = '',
  showSocialProof = true,
}: PageLeadSectionProps) {
  return (
    <section
      id={id}
      className={`page-lead-section ${className}`.trim()}
      aria-label="Request a security quote"
    >
      <div className="page-lead-section__inner">
        {showSocialProof && (
          <div className="lead-social-proof" aria-label="Google reviews summary">
            <span className="lead-social-proof__rating">
              ★ {GOOGLE_REVIEWS.ratingLabel}
            </span>
            <p className="lead-social-proof__text">
              {GOOGLE_REVIEWS.reviewCount} Google reviews · Trusted by {GOOGLE_REVIEWS.businessesServed} businesses · Silbar Security Services Pvt. Ltd.
            </p>
            <a
              href={GOOGLE_REVIEWS.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lead-social-proof__link"
            >
              View Google Profile →
            </a>
          </div>
        )}
        <QueryForm
          title={title}
          subtitle={subtitle}
          defaultMessage={defaultMessage}
          submitLabel={submitLabel}
          formType={formType}
        />
        <div className="page-lead-section__ctas">
          <a href={`tel:${CONTACT.phoneRaw}`} className="page-lead-section__cta page-lead-section__cta--call">
            Call {CONTACT.phone}
          </a>
          <a
            href={CONTACT.whatsapp.url}
            className="page-lead-section__cta page-lead-section__cta--wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
          <a
            href={GOOGLE_REVIEWS.writeUrl}
            className="page-lead-section__cta page-lead-section__cta--call"
            target="_blank"
            rel="noopener noreferrer"
          >
            Review on Google
          </a>
        </div>
      </div>
    </section>
  )
}
