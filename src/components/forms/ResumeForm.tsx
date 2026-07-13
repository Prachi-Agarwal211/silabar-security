'use client'

import { formatEnquiryWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp'

export default function ResumeForm() {
  return (
    <form
      className="resume-upload-form"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        const file = data.get('resume') as File | null
        const fileNote = file?.name
          ? `Resume file selected: ${file.name} (please attach this file in WhatsApp after opening)`
          : 'Resume will be attached in WhatsApp'

        openWhatsApp(
          formatEnquiryWhatsAppMessage({
            formType: 'Job Application',
            name: String(data.get('name') || ''),
            email: String(data.get('email') || ''),
            phone: String(data.get('phone') || ''),
            message: fileNote,
            extra: {
              Position: String(data.get('position') || ''),
            },
          })
        )
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <input type="text" name="name" placeholder="Full Name *" required autoComplete="name" className="resume-input" />
        <input type="email" name="email" placeholder="Email Address *" required autoComplete="email" className="resume-input" />
        <input type="tel" name="phone" placeholder="Phone Number *" required autoComplete="tel" inputMode="tel" className="resume-input" />
        <select name="position" className="resume-input" required>
          <option value="">Select Desired Position</option>
          <option>Security Guard</option>
          <option>Security Supervisor</option>
          <option>Armed Guard</option>
          <option>Lady Security Guard</option>
          <option>Account Manager</option>
          <option>Corporate Staff</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input type="file" name="resume" className="resume-input" accept=".pdf,.doc,.docx" />
        <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem' }}>
          After WhatsApp opens, attach your resume file before sending.
        </p>
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        Apply via WhatsApp
      </button>
    </form>
  )
}
