'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Menu, X, Phone, Shield } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { CONTACT } from '@/lib/config'

const NAV_LINKS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const wasMenuOpen = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY
          const direction = currentY > lastScrollY.current ? 'down' : 'up'
          
          setScrolled(currentY > 50)
          
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight
          setScrollProgress(totalScroll > 0 ? (currentY / totalScroll) * 100 : 0)

          if (direction === 'down' && currentY > 100) {
            setHidden(true)
            setMenuOpen(false)
          } else if (direction === 'up') {
            setHidden(false)
          }
          lastScrollY.current = currentY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when menu open + Escape key
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    if (menuOpen) window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  // Return focus to hamburger on close
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (wasMenuOpen.current && !menuOpen) hamburgerRef.current?.focus()
    wasMenuOpen.current = menuOpen
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header className={`hero-header glass-header${hidden ? ' hero-header--hidden' : ''}${scrolled ? ' hero-header--scrolled' : ''}${pathname !== '/' ? ' hero-header--solid' : ''}`}>
        <Link href="/" className="hero-logo" onClick={() => setMenuOpen(false)}>
          <Shield className="hero-logo__icon" size={24} strokeWidth={2} />
          Silbar Security
        </Link>

        {/* Desktop nav */}
        <nav className="hero-nav" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`hero-nav-link${href === '/' ? ' hero-nav-link--home' : ''}${isActive(href) ? ' hero-nav-link--active' : ''}`}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {Icon ? <Icon size={14} strokeWidth={1.8} aria-hidden="true" /> : null}
              <span>{label}</span>
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

        {/* Scroll Progress Bar */}
        <div 
          className="scroll-progress" 
          style={{ width: `${scrollProgress}%` }}
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
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`mobile-nav__link${isActive(href) ? ' mobile-nav__link--active' : ''}`}
              aria-current={isActive(href) ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {Icon ? <Icon size={18} strokeWidth={1.8} aria-hidden="true" /> : null}
              {label}
            </Link>
          ))}
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
            WhatsApp Us
          </a>
        </nav>
      </div>
    </>
  )
}
