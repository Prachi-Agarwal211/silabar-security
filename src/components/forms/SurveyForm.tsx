'use client'

export default function SurveyForm() {
  return (
    <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your site survey request has been submitted. Our team will contact you to schedule the visit.'); }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input type="text" placeholder="Company Name *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <input type="text" placeholder="Contact Person *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <input type="email" placeholder="Email *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <input type="tel" placeholder="Phone *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <input type="text" placeholder="Facility Address *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <select required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--color-horizon-600)' }}>
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
        <input type="text" placeholder="Preferred Date for Survey" style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>Book Free Survey</button>
      </div>
    </form>
  )
}
