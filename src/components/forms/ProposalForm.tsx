'use client'

const inputStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  background: 'rgba(20,16,13,0.04)',
  border: '1px solid rgba(20,16,13,0.15)',
  borderRadius: '4px',
  fontSize: '16px', // prevent iOS zoom
  width: '100%',
  fontFamily: 'var(--font-body)',
}

export default function ProposalForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        alert('Thank you! Your proposal request has been submitted. Our team will contact you within 48 hours.')
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input type="text" name="company" placeholder="Company Name *" required autoComplete="organization" style={inputStyle} />
        <input type="text" name="contact" placeholder="Contact Person *" required autoComplete="name" style={inputStyle} />
        <input type="email" name="email" placeholder="Email *" required autoComplete="email" style={inputStyle} />
        <input type="tel" name="phone" placeholder="Phone *" required autoComplete="tel" inputMode="tel" style={inputStyle} />
        <select name="service" required style={{ ...inputStyle, color: 'var(--color-horizon-600)' }}>
          <option value="">Service Required *</option>
          <option>Manned Guarding</option>
          <option>Armed Security</option>
          <option>Electronic Surveillance</option>
          <option>Event Security</option>
          <option>Facility Management</option>
          <option>VIP Protection</option>
          <option>Other</option>
        </select>
        <textarea
          name="details"
          placeholder="Facility Details (location, size, requirements) *"
          required
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>
          Submit Request
        </button>
      </div>
    </form>
  )
}
