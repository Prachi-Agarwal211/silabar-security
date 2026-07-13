import { CONTACT } from '@/lib/config'

/** Build a wa.me URL with prefilled message */
export function buildWhatsAppUrl(message: string, phone = CONTACT.whatsapp.number): string {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/** Open WhatsApp chat with prefilled text (new tab / app) */
export function openWhatsApp(message: string, phone = CONTACT.whatsapp.number): void {
  const url = buildWhatsAppUrl(message, phone)
  window.open(url, '_blank', 'noopener,noreferrer')
}

type EnquiryFields = {
  name?: string
  email?: string
  phone?: string
  company?: string
  message?: string
  /** Optional form type label for the message header */
  formType?: string
  /** Extra key/value lines */
  extra?: Record<string, string | undefined>
}

/** Compose a clean enquiry message for WhatsApp from form fields */
export function formatEnquiryWhatsAppMessage(fields: EnquiryFields): string {
  const type = fields.formType || 'Website Enquiry'
  const lines: string[] = [
    `*New ${type} — Silbar Security*`,
    '',
  ]

  if (fields.name?.trim()) lines.push(`*Name:* ${fields.name.trim()}`)
  if (fields.phone?.trim()) lines.push(`*Phone:* ${fields.phone.trim()}`)
  if (fields.email?.trim()) lines.push(`*Email:* ${fields.email.trim()}`)
  if (fields.company?.trim()) lines.push(`*Company:* ${fields.company.trim()}`)

  if (fields.extra) {
    for (const [key, value] of Object.entries(fields.extra)) {
      if (value?.trim()) lines.push(`*${key}:* ${value.trim()}`)
    }
  }

  if (fields.message?.trim()) {
    lines.push('')
    lines.push(`*Message:*`)
    lines.push(fields.message.trim())
  }

  lines.push('')
  lines.push(`_Sent from silbarsecurity.in_`)

  return lines.join('\n')
}
