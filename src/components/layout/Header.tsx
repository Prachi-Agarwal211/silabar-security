'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY
          const direction = currentY > lastScrollY.current ? 'down' : 'up'
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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className={`hero-header ${hidden ? 'hero-header--hidden' : ''}`}>
        <Link href="/" className="hero-logo" onClick={() => setMenuOpen(false)}>
          Silbar Security
        </Link>

        {/* Desktop nav */}
        <nav className="hero-nav" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className="hero-nav-link">
              {label}
            </Link>
          ))}
          <a
            href="tel:+919352303333"
            className="hero-nav-link hero-nav-link--phone"
            aria-label="Call Silbar Security"
          >
            <Phone size={14} strokeWidth={1.75} />
            +91 93523 03333
          </a>
          <Link href="/contact" className="hero-nav-cta">
            Get Quote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="hero-nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav__links" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="mobile-nav__link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="tel:+919352303333"
            className="mobile-nav__link mobile-nav__link--phone"
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={16} /> +91 93523 03333
          </a>
          <Link
            href="/contact"
            className="mobile-nav__cta"
            onClick={() => setMenuOpen(false)}
          >
            Get Free Quote
          </Link>
        </nav>
      </div>
    </>
  )
}
