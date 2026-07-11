'use client'

export default function ProposalForm() {
  return (
    <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your proposal request has been submitted. Our team will contact you within 48 hours.'); }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input type="text" placeholder="Company Name *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <input type="text" placeholder="Contact Person *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <input type="email" placeholder="Email *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <input type="tel" placeholder="Phone *" required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem' }} />
        <select required style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--color-horizon-600)' }}>
          <option value="">Service Required *</option>
          <option>Manned Guarding</option>
          <option>Armed Security</option>
          <option>Electronic Surveillance</option>
          <option>Event Security</option>
          <option>Facility Management</option>
          <option>VIP Protection</option>
          <option>Other</option>
        </select>
        <textarea placeholder="Facility Details (location, size, requirements) *" required rows={3} style={{ padding: '0.75rem 1rem', background: 'rgba(20,16,13,0.04)', border: '1px solid rgba(20,16,13,0.15)', borderRadius: '4px', fontSize: '0.85rem', resize: 'vertical' }} />
        <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>Submit Request</button>
      </div>
    </form>
  )
}
