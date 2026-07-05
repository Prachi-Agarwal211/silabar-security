import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/constants'

const services = [
  { label: 'Security Guards', href: '/services/security-guards' },
  { label: 'Vehicle Patrol', href: '/services/vehicle-patrol' },
  { label: 'CCTV Surveillance', href: '/services/cctv-surveillance' },
  { label: 'Access Control', href: '/services/access-control' },
  { label: 'Facility Management', href: '/services/facility-management' },
  { label: 'Event Security', href: '/services/event-security' },
]

const locations = [
  'Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad',
  'Chennai', 'Pune', 'Kolkata', 'Ahmedabad',
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold-400/10" role="contentinfo">
      <div className="absolute inset-0 bg-[#050710]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(3,31,48,0.4)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(212,175,55,0.03)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)] py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden border border-gold-400/30 bg-midnight-900">
                <Image src="/logo.png" alt="Silbar Security Logo" fill className="object-contain" sizes="48px" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm tracking-[0.15em] text-horizon-100">SILBAR</span>
                <span className="text-[0.6rem] tracking-[0.25em] text-horizon-400">SECURITY</span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-horizon-400">
              Veteran-led security company. Protecting people, property, and peace of mind across 50+ Indian cities. PSARA licensed. ISO 9001:2015 certified.
            </p>
            <div className="flex gap-4">
              <a href={SITE.phoneTel} className="text-sm text-gold-400 transition-colors hover:text-gold-300">
                {SITE.phone}
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-horizon-100">SERVICES</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-sm text-horizon-400 transition-colors hover:text-gold-400">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-horizon-100">LOCATIONS</h3>
            <ul className="space-y-3">
              {locations.map((loc) => (
                <li key={loc}>
                  <span className="text-sm text-horizon-400">{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-horizon-100">CONTACT</h3>
            <div className="space-y-4 text-sm">
              <p>
                <span className="block text-horizon-100">Head Office</span>
                <span className="text-horizon-400">New Delhi, India</span>
              </p>
              <p>
                <span className="block text-horizon-100">Email</span>
                <a href="mailto:info@silbarsecurity.com" className="text-gold-400 transition-colors hover:text-gold-300">
                  info@silbarsecurity.com
                </a>
              </p>
              <p>
                <span className="block text-horizon-100">Phone</span>
                <a href={SITE.phoneTel} className="text-gold-400 transition-colors hover:text-gold-300">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gold-400/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-horizon-400">
              &copy; {new Date().getFullYear()} Silbar Security. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-horizon-400 transition-colors hover:text-horizon-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-horizon-400 transition-colors hover:text-horizon-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
