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
    <footer className="relative overflow-hidden border-t border-white/5" role="contentinfo">
      <div className="absolute inset-0 bg-[#06060A]" />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)] py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden border border-white/10 bg-midnight-900">
                <Image src="/logo.png" alt="Silbar Security Logo" fill className="object-contain" sizes="40px" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-tight text-horizon-100">SILBAR</span>
                <span className="text-[0.55rem] font-semibold tracking-[0.2em] text-purple-400">SECURITY</span>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-horizon-400">
              Veteran-led security company. Protecting people, property, and peace of mind across 50+ Indian cities. PSARA licensed. ISO 9001:2015 certified.
            </p>
            <a href={SITE.phoneTel} className="text-sm font-semibold text-purple-400 transition-colors hover:text-purple-300">
              {SITE.phone}
            </a>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold tracking-[0.15em] text-horizon-100 uppercase">Services</h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-sm text-horizon-400 transition-colors hover:text-purple-400">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold tracking-[0.15em] text-horizon-100 uppercase">Locations</h3>
            <ul className="space-y-2.5">
              {locations.map((loc) => (
                <li key={loc}>
                  <span className="text-sm text-horizon-400">{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold tracking-[0.15em] text-horizon-100 uppercase">Contact</h3>
            <div className="space-y-3.5 text-sm">
              <p>
                <span className="block text-horizon-100 font-medium">Head Office</span>
                <span className="text-horizon-400">New Delhi, India</span>
              </p>
              <p>
                <span className="block text-horizon-100 font-medium">Email</span>
                <a href="mailto:info@silbarsecurity.com" className="text-purple-400 transition-colors hover:text-purple-300">
                  info@silbarsecurity.com
                </a>
              </p>
              <p>
                <span className="block text-horizon-100 font-medium">Phone</span>
                <a href={SITE.phoneTel} className="text-purple-400 transition-colors hover:text-purple-300">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-horizon-500">
              &copy; {new Date().getFullYear()} Silbar Security. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-horizon-500 transition-colors hover:text-horizon-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-horizon-500 transition-colors hover:text-horizon-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
