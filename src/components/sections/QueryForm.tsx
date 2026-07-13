'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { formatEnquiryWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp'

type FieldErrors = {
  name?: string
  email?: string
  phone?: string
  company?: string
  message?: string
}

type QueryFormProps = {
  title?: string
  subtitle?: string
  defaultMessage?: string
  submitLabel?: string
  /** Shown in WhatsApp message header */
  formType?: string
}

export default function QueryForm({
  title = 'Have a Security Question?',
  subtitle = "Fill out the form below — we'll open WhatsApp with your details so our team can reply instantly.",
  defaultMessage = '',
  submitLabel,
  formType = 'Website Enquiry',
}: QueryFormProps) {
  const buttonLabel = submitLabel || 'SUBMIT ON WHATSAPP'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: defaultMessage,
  })

  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateField = (name: string, value: string) => {
    let error = ''
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required'
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters'
        break
      case 'email':
        if (!value.trim()) error = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address'
        break
      case 'phone': {
        if (!value.trim()) {
          error = 'Phone number is required'
          break
        }
        const digits = value.replace(/\D/g, '')
        const national = digits.startsWith('91') && digits.length >= 12 ? digits.slice(-10) : digits
        if (!/^[6-9]\d{9}$/.test(national)) error = 'Please enter a valid 10-digit mobile number'
        break
      }
      case 'message':
        if (!value.trim()) error = 'Message is required'
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters'
        break
    }
    return error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: FieldErrors = {}
    ;(['name', 'email', 'phone', 'message'] as const).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)
    setTouched({ name: true, email: true, phone: true, company: true, message: true })

    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)

    const waMessage = formatEnquiryWhatsAppMessage({
      formType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
    })

    openWhatsApp(waMessage)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="query-form query-form--success">
        <div className="query-form__success-icon">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="query-form__success-title">Opening WhatsApp…</h3>
        <p className="query-form__success-desc">
          Your enquiry is ready in WhatsApp. Tap <strong>Send</strong> to deliver it to our team.
        </p>

        <div className="query-form__next-steps">
          <h4>What happens next:</h4>
          <ul>
            <li>WhatsApp opens with your full enquiry text pre-filled</li>
            <li>Press Send to message Silbar Security</li>
            <li>Our team typically replies within 2 business hours</li>
          </ul>
        </div>

        <div className="query-form__contact-direct">
          <p>WhatsApp didn&apos;t open?</p>
          <button
            type="button"
            className="query-form__submit"
            onClick={() => {
              openWhatsApp(
                formatEnquiryWhatsAppMessage({
                  formType,
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  company: formData.company,
                  message: formData.message,
                })
              )
            }}
          >
            Open WhatsApp Again
          </button>
          <a href={`tel:${CONTACT.phoneRaw}`}>Or call: {CONTACT.phone}</a>
        </div>
      </div>
    )
  }

  return (
    <div className="query-form-container">
      <div className="query-form-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="query-form" noValidate>
        <div className="query-form__group">
          <label htmlFor="qf-name">Full Name *</label>
          <div className="query-form__input-wrapper">
            <input
              type="text"
              id="qf-name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`query-form__input ${touched.name ? (errors.name ? 'query-form__input--error' : 'query-form__input--valid') : ''}`}
              placeholder="e.g. Rahul Sharma"
              disabled={isSubmitting}
            />
            {touched.name && !errors.name && <CheckCircle2 className="query-form__icon query-form__icon--valid" size={18} />}
            {touched.name && errors.name && <AlertCircle className="query-form__icon query-form__icon--error" size={18} />}
          </div>
          {touched.name && errors.name && <span className="query-form__error-msg">{errors.name}</span>}
        </div>

        <div className="query-form__group">
          <label htmlFor="qf-email">Email Address *</label>
          <div className="query-form__input-wrapper">
            <input
              type="email"
              id="qf-email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`query-form__input ${touched.email ? (errors.email ? 'query-form__input--error' : 'query-form__input--valid') : ''}`}
              placeholder="e.g. rahul@company.com"
              disabled={isSubmitting}
            />
            {touched.email && !errors.email && <CheckCircle2 className="query-form__icon query-form__icon--valid" size={18} />}
            {touched.email && errors.email && <AlertCircle className="query-form__icon query-form__icon--error" size={18} />}
          </div>
          {touched.email && errors.email && <span className="query-form__error-msg">{errors.email}</span>}
        </div>

        <div className="query-form__row">
          <div className="query-form__group">
            <label htmlFor="qf-phone">Phone Number *</label>
            <div className="query-form__input-wrapper">
              <input
                type="tel"
                id="qf-phone"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`query-form__input ${touched.phone ? (errors.phone ? 'query-form__input--error' : formData.phone ? 'query-form__input--valid' : '') : ''}`}
                placeholder="+91 98765 43210"
                disabled={isSubmitting}
              />
              {touched.phone && formData.phone && !errors.phone && <CheckCircle2 className="query-form__icon query-form__icon--valid" size={18} />}
              {touched.phone && errors.phone && <AlertCircle className="query-form__icon query-form__icon--error" size={18} />}
            </div>
            {touched.phone && errors.phone && <span className="query-form__error-msg">{errors.phone}</span>}
          </div>

          <div className="query-form__group">
            <label htmlFor="qf-company">Company Name (Optional)</label>
            <div className="query-form__input-wrapper">
              <input
                type="text"
                id="qf-company"
                name="company"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                className="query-form__input"
                placeholder="Your Organization"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="query-form__group">
          <label htmlFor="qf-message">How Can We Help? *</label>
          <div className="query-form__input-wrapper">
            <textarea
              id="qf-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`query-form__input query-form__textarea ${touched.message ? (errors.message ? 'query-form__input--error' : 'query-form__input--valid') : ''}`}
              placeholder="Tell us about your security requirements..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>
          {touched.message && errors.message && <span className="query-form__error-msg">{errors.message}</span>}
        </div>

        <div className="query-form__footer">
          <button type="submit" className="query-form__submit" disabled={isSubmitting}>
            {isSubmitting ? 'OPENING WHATSAPP…' : buttonLabel}
          </button>

          <div className="query-form__alt-contact">
            Submits via WhatsApp to {CONTACT.phone}
            <br />
            Or call:{' '}
            <a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phone}</a>
          </div>
        </div>
      </form>
    </div>
  )
}
