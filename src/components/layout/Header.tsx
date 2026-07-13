'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { CONTACT } from '@/lib/config'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Locations', href: '/security-services' },
  { label: 'About', href: '/about' },
  { label: 'Franchise', href: '/franchise' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Pages with dark photo / video heroes — header starts glass-transparent.
 * Light pages (contact, blog, legal, industry detail, etc.) start solid midnight.
 */
function isDarkHeroPath(pathname: string): boolean {
  if (pathname === '/') return true
  if (pathname === '/about' || pathname === '/services' || pathname === '/industries') return true
  if (pathname === '/security-services' || pathname.startsWith('/security-services/')) return true
  // Service detail pages use image heroes
  if (pathname.startsWith('/services/') && pathname !== '/services') return true
  return false
}

export default function Header() {
  const pathname = usePathname()
  const darkHero = isDarkHeroPath(pathname)

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollProgressElRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const wasMenuOpen = useRef(false)
  const ticking = useRef(false)

  // Reset menu + scroll state on route change
  useEffect(() => {
    setMenuOpen(false)
    setScrolled(typeof window !== 'undefined' ? window.scrollY > 24 : false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 24)

        const total = document.documentElement.scrollHeight - window.innerHeight
        const progress = total > 0 ? Math.min(100, (y / total) * 100) : 0
        if (scrollProgressElRef.current) {
          scrollProgressElRef.current.style.width = `${progress}%`
        }
        ticking.current = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Body lock + Escape
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    if (menuOpen) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    if (wasMenuOpen.current && !menuOpen) hamburgerRef.current?.focus()
    wasMenuOpen.current = menuOpen
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  // Solid bar when: light page, scrolled on dark hero, or menu open
  const solid = !darkHero || scrolled || menuOpen
  const glass = darkHero && !scrolled && !menuOpen

  const headerClass = [
    'site-header',
    solid ? 'site-header--solid' : '',
    glass ? 'site-header--glass' : '',
    menuOpen ? 'site-header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header className={headerClass} data-pathname={pathname}>
        <div className="site-header__inner">
          <Link href="/" className="site-header__logo" onClick={closeMenu}>
            <Image
              src="/icon-512.png"
              alt=""
              width={40}
              height={40}
              className="site-header__logo-img"
              priority
            />
            <span className="site-header__logo-text">
              Silbar <span className="site-header__logo-accent">Security</span>
            </span>
          </Link>

          <nav className="site-header__nav" aria-label="Primary">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`site-header__link${isActive(href) ? ' is-active' : ''}`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="site-header__link site-header__link--phone"
              aria-label={`Call ${CONTACT.phone}`}
            >
              <Phone size={14} strokeWidth={2} aria-hidden="true" />
              <span className="site-header__phone-text">{CONTACT.phone}</span>
            </a>
            <a
              href={CONTACT.whatsapp.url}
              className="site-header__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </nav>

          <div className="site-header__mobile-actions">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="site-header__icon-btn"
              aria-label={`Call ${CONTACT.phone}`}
            >
              <Phone size={18} strokeWidth={2} />
            </a>
            <button
              ref={hamburgerRef}
              type="button"
              className="site-header__icon-btn site-header__menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="site-mobile-nav"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div ref={scrollProgressElRef} className="site-header__progress" aria-hidden="true" />
      </header>

      {/* Overlay */}
      <div
        className={`site-nav-overlay${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      {/* Mobile / tablet drawer */}
      <div
        id="site-mobile-nav"
        className={`site-mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="site-mobile-nav__links" aria-label="Mobile">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              className={`site-mobile-nav__link${isActive(href) ? ' is-active' : ''}`}
              aria-current={isActive(href) ? 'page' : undefined}
              onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="site-mobile-nav__footer">
          <a href={`tel:${CONTACT.phoneRaw}`} className="site-mobile-nav__phone" onClick={closeMenu}>
            <Phone size={18} /> {CONTACT.phone}
          </a>
          <a
            href={CONTACT.whatsapp.url}
            className="site-mobile-nav__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            WhatsApp for a Quote
          </a>
        </div>
      </div>
    </>
  )
}
