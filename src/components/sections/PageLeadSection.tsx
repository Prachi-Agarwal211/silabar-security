import QueryForm from '@/components/sections/QueryForm'
import { CONTACT } from '@/lib/config'

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
}

/**
 * Shared lead-gen block: query form + direct CTAs.
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
        </div>
      </div>
    </section>
  )
}
