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
      {/* Ambient gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(3,31,48,0.3)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(204,34,34,0.04)_0%,transparent_40%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)] py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden border border-gold-400/30 bg-midnight-900">
                <Image
                  src="/logo.png"
                  alt="Silbar Security Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm tracking-[0.15em] text-horizon-100">SILBAR</span>
                <span className="text-[0.6rem] tracking-[0.3em] text-horizon-400">SECURITY</span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-horizon-400">
              India&apos;s most professional Physical Security & Facility Management company. Protecting people, property, and peace of mind since 2010.
            </p>
            <div className="flex gap-4">
              <a href={SITE.phoneTel} className="text-sm text-gold-400 transition-colors hover:text-gold-300">
                {SITE.phone}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-horizon-100">SERVICES</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-horizon-400 transition-colors hover:text-gold-400"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
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

          {/* Contact */}
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

        {/* Bottom Bar */}
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
