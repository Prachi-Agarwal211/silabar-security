import Link from 'next/link'
import { Phone, Mail, MapPin, Shield } from 'lucide-react'
import { CONTACT } from '@/lib/config'

import { SERVICES } from '@/data/services'
import { INDUSTRIES } from '@/data/industries'

const SERVICES_LINKS = SERVICES.map(s => ({
  label: s.shortTitle,
  href: `/services/${s.slug}`,
}))

const INDUSTRIES_LINKS = INDUSTRIES.map(i => ({
  label: i.shortTitle || i.title,
  href: `/industries/${i.slug}`,
}))

const COMPANY_LINKS = [
  { label: 'About Silbar', href: '/about' },
  { label: 'Why Silbar', href: '/about#why-silbar' },
  { label: 'Certifications', href: '/about#certifications' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" id="contact">
      {/* Trust badges row */}
      <div className="footer-trust-row">
        <div className="footer-trust-badge">
          <Shield size={14} className="footer-trust-badge__icon" />
          ISO 9001:2015 Certified
        </div>
        <div className="footer-trust-badge">
          <Shield size={14} className="footer-trust-badge__icon" />
          PSARA-2005 Licensed
        </div>
        <div className="footer-trust-badge">
          <Shield size={14} className="footer-trust-badge__icon" />
          MSME Registered
        </div>
        <div className="footer-trust-badge">
          <Shield size={14} className="footer-trust-badge__icon" />
          7,000+ Officers
        </div>
      </div>

      <div className="footer-grid">
        {/* Brand column */}
        <div className="footer-brand-col">
          <div className="footer-brand">Silbar Security</div>
          <p className="footer-tagline">
            India&apos;s most trusted PSARA-licensed security services company.
            Founded by law enforcement professionals for uncompromising protection.
          </p>
          <div className="footer-contact-list">
            <a href="tel:+919352303333" className="footer-contact-item">
              <Phone size={14} />
              {CONTACT.phone}
            </a>
            <a href="tel:+911412223334" className="footer-contact-item">
              <Phone size={14} />
              +91-141 222 3334
            </a>
            <a href={`mailto:${CONTACT.email}`} className="footer-contact-item">
              <Mail size={14} />
              {CONTACT.email}
            </a>
            <span className="footer-contact-item footer-contact-item--location">
              <MapPin size={14} />
              Jaipur · Delhi · Ahmedabad · PAN India
            </span>
          </div>
        </div>

        {/* Services column */}
        <div>
          <div className="footer-heading">Services</div>
          <ul className="footer-links">
            {SERVICES_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="footer-link">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries column */}
        <div>
          <div className="footer-heading">Industries</div>
          <ul className="footer-links">
            {INDUSTRIES_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="footer-link">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div>
          <div className="footer-heading">Company</div>
          <ul className="footer-links">
            {COMPANY_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="footer-link">{label}</Link>
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/919352303333?text=Hello%20Silbar%20Security%2C%20I%20need%20a%20quote%20for%20security%20services."
                className="footer-link footer-link--whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">
          © {year} Silbar Security Services Pvt. Ltd. All rights reserved.
        </span>
        <div className="footer-legal-links">
          <Link href="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
          <Link href="/terms" className="footer-legal-link">Terms of Use</Link>
        </div>
      </div>
    </footer>
  )
}