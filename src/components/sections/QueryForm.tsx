'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'

type FieldErrors = {
  name?: string
  email?: string
  phone?: string
  company?: string
  message?: string
}

export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
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
        else if (value.toLowerCase().includes('@gmail.com') || value.toLowerCase().includes('@yahoo.com')) {
          // Note: The plan says "reject gmail/yahoo". We can enforce corporate emails.
          error = 'Please use a corporate email address'
        }
        break
      case 'phone':
        if (value && !/^\+?[\d\s-]{10,}$/.test(value)) error = 'Please enter a valid phone number'
        break
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: FieldErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) newErrors[key as keyof typeof newErrors] = error
    })
    
    setErrors(newErrors)
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="query-form query-form--success">
        <div className="query-form__success-icon">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="query-form__success-title">✓ THANK YOU!</h3>
        <p className="query-form__success-desc">Your enquiry has been submitted successfully.</p>
        
        <div className="query-form__next-steps">
          <h4>What happens next:</h4>
          <ul>
            <li>You'll receive a confirmation email within 5 minutes</li>
            <li>Our team will review your enquiry</li>
            <li>We'll respond within 1 working day</li>
          </ul>
        </div>
        
        <div className="query-form__contact-direct">
          <p>Need immediate assistance?</p>
          <a href="tel:+919352303333">Call: +91-93523-03333</a>
          <a href="https://wa.me/919352303333" target="_blank" rel="noopener noreferrer">WhatsApp: Click here</a>
        </div>
      </div>
    )
  }

  return (
    <div className="query-form-container">
      <div className="query-form-header">
        <h2>Have a Security Question?</h2>
        <p>Fill out the form below and we'll respond within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="query-form" noValidate>
        <div className="query-form__group">
          <label htmlFor="name">Full Name *</label>
          <div className="query-form__input-wrapper">
            <input
              type="text"
              id="name"
              name="name"
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
          <label htmlFor="email">Email Address *</label>
          <div className="query-form__input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
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
            <label htmlFor="phone">Phone Number (Optional)</label>
            <div className="query-form__input-wrapper">
              <input
                type="tel"
                id="phone"
                name="phone"
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
            <label htmlFor="company">Company Name (Optional)</label>
            <div className="query-form__input-wrapper">
              <input
                type="text"
                id="company"
                name="company"
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
          <label htmlFor="message">How Can We Help? *</label>
          <div className="query-form__input-wrapper">
            <textarea
              id="message"
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
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
          </button>
          
          <div className="query-form__alt-contact">
            Or call us directly: <a href="tel:+919352303333">+91-93523-03333</a><br/>
            WhatsApp: <a href="https://wa.me/919352303333" target="_blank" rel="noopener noreferrer">Click here</a>
          </div>
        </div>
      </form>
    </div>
  )
}
