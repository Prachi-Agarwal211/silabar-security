'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Shield } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { CONTACT } from '@/lib/config'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [state, setState] = useState({
    hidden: false,
    scrolled: false,
    transparent: true,
    menuOpen: false,
  })
  const scrollProgressRef = useRef(0)
  const scrollProgressElRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const wasMenuOpen = useRef(false)

  const setMenuOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, menuOpen: open }))
  }, [])

  useEffect(() => {
    const setInitialTransparent = () => {
      if (pathname === '/') {
        setState(prev => ({ ...prev, transparent: window.scrollY < 50 }))
      }
    }
    setInitialTransparent()

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY
          const direction = currentY > lastScrollY.current ? 'down' : 'up'

          const totalScroll = document.documentElement.scrollHeight - window.innerHeight
          const progress = totalScroll > 0 ? (currentY / totalScroll) * 100 : 0
          scrollProgressRef.current = progress
          if (scrollProgressElRef.current) {
            scrollProgressElRef.current.style.width = `${progress}%`
          }

          let newHidden = false
          let newMenuOpen = false
          if (direction === 'down' && currentY > 100) {
            newHidden = true
            newMenuOpen = false
          }

          setState(prev => ({
            hidden: newHidden,
            scrolled: currentY > 50,
            transparent: pathname === '/' ? currentY < 50 : prev.transparent,
            menuOpen: newMenuOpen,
          }))

          lastScrollY.current = currentY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const navRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when menu open + Escape key
  useEffect(() => {
    document.body.style.overflow = state.menuOpen ? 'hidden' : ''
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    if (state.menuOpen) window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [state.menuOpen, setMenuOpen])

  // Return focus to hamburger on close
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (wasMenuOpen.current && !state.menuOpen) hamburgerRef.current?.focus()
    wasMenuOpen.current = state.menuOpen
  }, [state.menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const { hidden, scrolled, transparent, menuOpen } = state

  return (
    <>
      <header className={`hero-header${hidden ? ' hero-header--hidden' : ''}${scrolled ? ' hero-header--scrolled' : ''}${pathname !== '/' || !transparent ? ' hero-header--solid' : ''}${transparent && pathname === '/' ? ' hero-header--transparent' : ''}`}>
        <Link href="/" className="hero-logo" onClick={() => setMenuOpen(false)}>
          <Shield className="hero-logo__icon" size={24} strokeWidth={2} />
          Silbar Security
        </Link>

        {/* Desktop nav */}
        <nav className="hero-nav" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`hero-nav-link${isActive(href) ? ' hero-nav-link--active' : ''}`}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="hero-nav-link hero-nav-link--phone"
            aria-label="Call Silbar Security"
          >
            <Phone size={14} strokeWidth={1.75} />
            {CONTACT.phone}
          </a>
          <MagneticButton
            as="a"
            href={CONTACT.whatsapp.url}
            className="hero-nav-cta"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.2}
          >
            WhatsApp Us
          </MagneticButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="hero-nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Scroll Progress Bar — updated via ref, no state */}
        <div
          ref={scrollProgressElRef}
          className="scroll-progress"
          aria-hidden="true"
        />
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav-drawer"
        ref={navRef}
        className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav__links" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`mobile-nav__link${isActive(href) ? ' mobile-nav__link--active' : ''}`}
              aria-current={isActive(href) ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Contact block — pinned at bottom of cherry overlay */}
        <div className="mobile-nav__contact-block">
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="mobile-nav__link mobile-nav__link--phone"
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={16} /> {CONTACT.phone}
          </a>
          <a
            href={CONTACT.whatsapp.url}
            className="mobile-nav__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp for a Quote
          </a>
        </div>
      </div>
    </>
  )
}
