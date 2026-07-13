'use client'

const inputStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  background: 'rgba(20,16,13,0.04)',
  border: '1px solid rgba(20,16,13,0.15)',
  borderRadius: '4px',
  fontSize: '16px',
  width: '100%',
  fontFamily: 'var(--font-body)',
}

export default function SurveyForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        alert('Thank you! Your site survey request has been submitted. Our team will contact you to schedule the visit.')
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input type="text" name="company" placeholder="Company Name *" required autoComplete="organization" style={inputStyle} />
        <input type="text" name="contact" placeholder="Contact Person *" required autoComplete="name" style={inputStyle} />
        <input type="email" name="email" placeholder="Email *" required autoComplete="email" style={inputStyle} />
        <input type="tel" name="phone" placeholder="Phone *" required autoComplete="tel" inputMode="tel" style={inputStyle} />
        <input type="text" name="address" placeholder="Facility Address *" required autoComplete="street-address" style={inputStyle} />
        <select name="facilityType" required style={{ ...inputStyle, color: 'var(--color-horizon-600)' }}>
          <option value="">Facility Type *</option>
          <option>Manufacturing Plant</option>
          <option>Warehouse</option>
          <option>Corporate Office</option>
          <option>Residential Society</option>
          <option>Hospital</option>
          <option>Hotel</option>
          <option>Mall / Retail</option>
          <option>Educational Institution</option>
          <option>Other</option>
        </select>
        <input type="text" name="preferredDate" placeholder="Preferred Date for Survey" style={inputStyle} />
        <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>
          Book Free Survey
        </button>
      </div>
    </form>
  )
}
