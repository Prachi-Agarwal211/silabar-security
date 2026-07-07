'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY
          const direction = currentY > lastScrollY.current ? 'down' : 'up'

          // ponytail: hide on scroll down past 100px, show on scroll up
          if (direction === 'down' && currentY > 100) {
            setHidden(true)
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

  return (
    <header className={`hero-header ${hidden ? 'hero-header--hidden' : ''}`}>
      <Link href="/" className="hero-logo">Silbar Security</Link>
      <nav className="hero-nav">
        <a href="#services" className="hero-nav-link">Services</a>
        <a href="#about" className="hero-nav-link">About</a>
        <a href="#contact" className="hero-nav-link">Contact</a>
        <a href="#contact" className="hero-nav-cta">Get Assessment</a>
      </nav>
    </header>
  )
}
