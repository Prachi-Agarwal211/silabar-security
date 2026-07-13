'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
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

export default function Header() {
  const pathname = usePathname()
  const [state, setState] = useState({
    hidden: false,
    scrolled: false,
    transparent: true,
    menuOpen: false,
  })
  const scrollProgressElRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const wasMenuOpen = useRef(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const setMenuOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, menuOpen: open }))
  }, [])

  useEffect(() => {
    const setInitialTransparent = () => {
      if (pathname === '/') {
        setState(prev => ({ ...prev, transparent: window.scrollY < 50, menuOpen: false }))
      } else {
        setState(prev => ({ ...prev, transparent: false, menuOpen: false }))
      }
    }
    setInitialTransparent()

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY
          const direction = currentY > lastScrollY.current ? 'down' : 'up'
          const isMobileNav = window.matchMedia('(max-width: 1024px)').matches

          const totalScroll = document.documentElement.scrollHeight - window.innerHeight
          const progress = totalScroll > 0 ? (currentY / totalScroll) * 100 : 0
          if (scrollProgressElRef.current) {
            scrollProgressElRef.current.style.width = `${progress}%`
          }

          // Only auto-hide header on large desktop; keep fixed on tablet/mobile
          let newHidden = false
          if (!isMobileNav && direction === 'down' && currentY > 100) {
            newHidden = true
          }

          setState(prev => ({
            ...prev,
            hidden: newHidden,
            scrolled: currentY > 50,
            transparent: pathname === '/' ? currentY < 50 : false,
            // Do not force-close menu on scroll while open on mobile
            menuOpen: prev.menuOpen && isMobileNav ? prev.menuOpen : (newHidden ? false : prev.menuOpen),
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

  useEffect(() => {
    if (wasMenuOpen.current && !state.menuOpen) hamburgerRef.current?.focus()
    wasMenuOpen.current = state.menuOpen
  }, [state.menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const { hidden, scrolled, transparent, menuOpen } = state

  return (
    <>
      <header
        className={`hero-header${hidden ? ' hero-header--hidden' : ''}${scrolled ? ' hero-header--scrolled' : ''}${pathname !== '/' || !transparent ? ' hero-header--solid' : ''}${transparent && pathname === '/' ? ' hero-header--transparent' : ''}`}
      >
        <Link href="/" className="hero-logo" onClick={() => setMenuOpen(false)}>
          <Image
            src="/icon-512.png"
            alt="Silbar Security"
            width={48}
            height={48}
            className="hero-logo__img"
            priority
          />
          <span className="hero-logo__text">Silbar Security</span>
        </Link>

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

        <div
          ref={scrollProgressElRef}
          className="scroll-progress"
          aria-hidden="true"
        />
      </header>

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
