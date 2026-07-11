'use client'

export default function ResumeForm() {
  return (
    <form className="resume-upload-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your resume has been submitted. Our HR team will contact you within 48 hours.'); }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <input type="text" placeholder="Full Name *" required className="resume-input" />
        <input type="email" placeholder="Email Address *" required className="resume-input" />
        <input type="tel" placeholder="Phone Number *" required className="resume-input" />
        <select className="resume-input" required>
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
        <input type="file" required className="resume-input" accept=".pdf,.doc,.docx" />
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        Submit Application
      </button>
    </form>
  )
}
