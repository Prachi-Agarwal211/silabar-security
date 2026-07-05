'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-midnight-950"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-midnight-950/80 backdrop-blur-xl border-b border-gold-400/8 shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
            : 'bg-midnight-950/50 backdrop-blur-md'
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-950" aria-label="Silbar Security Home">
              <div className="relative h-12 w-12 overflow-hidden border border-gold-400/30 transition-all duration-300 group-hover:border-gold-400/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                <Image src="/logo.png" alt="Silbar Security Logo" fill className="object-contain" sizes="48px" priority />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm tracking-[0.15em] text-horizon-100">SILBAR</span>
                <span className="text-[0.6rem] tracking-[0.25em] text-horizon-400">SECURITY</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-horizon-200 transition-colors duration-300 hover:text-gold-400 focus:outline-none focus-visible:text-gold-400"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 hover:w-full" />
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-gold-glow inline-flex h-10 items-center px-6 text-sm font-bold tracking-[0.05em] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                Get Quote
              </Link>
            </nav>

            <button
              className="flex flex-col gap-1.5 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              <span aria-hidden="true" className={`block h-0.5 w-6 bg-horizon-100 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span aria-hidden="true" className={`block h-0.5 w-6 bg-horizon-100 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span aria-hidden="true" className={`block h-0.5 w-6 bg-horizon-100 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>

          {mobileOpen && (
            <nav className="glass border-t border-gold-400/10 pb-6 pt-4 md:hidden" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-sm font-medium text-horizon-200 transition-colors hover:text-gold-400 focus:outline-none focus-visible:text-gold-400"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-gold-glow mt-4 inline-flex h-12 w-full items-center justify-center text-sm font-bold tracking-[0.05em] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                onClick={() => setMobileOpen(false)}
              >
                Get Quote
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
