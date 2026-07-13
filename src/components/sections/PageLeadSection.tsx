import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'

type PageLeadSectionProps = {
  title?: string
  subtitle?: string
  /** Prefill message textarea (e.g. location or franchise intent) */
  defaultMessage?: string
  submitLabel?: string
  /** Optional section id for anchor links */
  id?: string
  className?: string
}

/**
 * Shared lead-gen block: query form + direct CTAs.
 * Use on every marketing page (client requirement).
 */
export default function PageLeadSection({
  title = 'Have a Security Question?',
  subtitle = "Fill out the form below and we'll respond within 24 hours.",
  defaultMessage = '',
  submitLabel,
  id = 'get-a-quote',
  className = '',
}: PageLeadSectionProps) {
  return (
    <section
      id={id}
      className={`page-lead-section ${className}`.trim()}
      aria-label="Request a security quote"
    >
      <div className="page-lead-section__inner">
        <QueryForm
          title={title}
          subtitle={subtitle}
          defaultMessage={defaultMessage}
          submitLabel={submitLabel}
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
        </div>
      </div>
    </section>
  )
}
