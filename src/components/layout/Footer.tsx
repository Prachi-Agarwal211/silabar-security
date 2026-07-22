import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { SITE_STATS } from '@/lib/site-stats'

const TOP_SERVICES = [
  { label: 'Manned Guarding', href: '/services/manned-guarding' },
  { label: 'Industrial Security', href: '/services/industrial-security' },
  { label: 'Event Security', href: '/services/event-security' },
  { label: 'CCTV Surveillance', href: '/services/cctv-surveillance' },
  { label: 'VIP Protection', href: '/services/vip-protection' },
  { label: 'Facility Management', href: '/services/facility-management' },
]

const TOP_INDUSTRIES = [
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Hospitals', href: '/industries/hospitals' },
  { label: 'Warehouses', href: '/industries/warehouses' },
  { label: 'IT Parks', href: '/industries/it-parks' },
  { label: 'Retail', href: '/industries/retail' },
  { label: 'Banks & ATMs', href: '/industries/banks-atms' },
]

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Franchise', href: '/franchise' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Locations', href: '/security-services' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer footer-solid-red" id="contact">
      {/* Trust badges row */}
      <div className="footer-trust-row">
        <div className="footer-trust-badge">4 ISO Certified (IAF)</div>
        <div className="footer-trust-badge">PSARA Licensed · 19 States</div>
        <div className="footer-trust-badge">200+ Cities PAN India</div>
        <div className="footer-trust-badge">Startup India · MSME Registered</div>
      </div>

      <div className="footer-grid">
        {/* Brand + Contact column */}
        <div className="footer-brand-col">
          <div className="footer-brand-row">
            <Image src="/icon-512.png" alt="Silbar Security" width={44} height={44} className="footer-logo-img" />
            <div>
              <div className="footer-brand">Silbar Security</div>
              <p className="footer-tagline">India&apos;s trusted PAN India security company.</p>
            </div>
          </div>
          <div className="footer-contact-list">
            <a href={`tel:${CONTACT.phoneRaw}`} className="footer-contact-item">
              <Phone size={13} /> {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="footer-contact-item">
              <Mail size={13} /> {CONTACT.email}
            </a>
            {(CONTACT.officeLocations as unknown as any[]).map((office: any) => (
              <a key={office.city} href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-item footer-contact-item--location">
                <MapPin size={13} /> {office.badge}: {office.city.replace(/\s*\(.*?\)\s*/g, '')}
              </a>
            ))}
          </div>
          <div className="footer-social">
            <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={CONTACT.social.google} target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="Google">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </a>
          </div>
        </div>

        {/* Services column */}
        <div>
          <div className="footer-heading">Services</div>
          <ul className="footer-links">
            {TOP_SERVICES.map(({ label, href }) => (
              <li key={label}><Link href={href} className="footer-link">{label}</Link></li>
            ))}
            <li><Link href="/services" className="footer-link footer-link--all">View All →</Link></li>
          </ul>
        </div>

        {/* Industries column */}
        <div>
          <div className="footer-heading">Industries</div>
          <ul className="footer-links">
            {TOP_INDUSTRIES.map(({ label, href }) => (
              <li key={label}><Link href={href} className="footer-link">{label}</Link></li>
            ))}
            <li><Link href="/industries" className="footer-link footer-link--all">View All →</Link></li>
          </ul>
        </div>

        {/* Company column */}
        <div>
          <div className="footer-heading">Company</div>
          <ul className="footer-links">
            {COMPANY_LINKS.map(({ label, href }) => (
              <li key={label}><Link href={href} className="footer-link">{label}</Link></li>
            ))}
            <li>
              <a href={CONTACT.whatsapp.url} className="footer-link footer-link--whatsapp" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copyright">
          © {year} Silbar Security Services Pvt. Ltd. · {SITE_STATS.total} pages · {SITE_STATS.cities} cities · {SITE_STATS.states} states
        </span>
        <div className="footer-legal-links">
          <Link href="/security-services" className="footer-legal-link">Locations</Link>
          <Link href="/sitemap.xml" className="footer-legal-link">Sitemap</Link>
          <Link href="/privacy-policy" className="footer-legal-link">Privacy</Link>
          <Link href="/terms" className="footer-legal-link">Terms</Link>
          <Link href="/disclaimer" className="footer-legal-link">Disclaimer</Link>
        </div>
      </div>
    </footer>
  )
}
