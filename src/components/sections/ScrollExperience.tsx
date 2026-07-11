'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Award } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ScrollExperience() {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    // Initial state setup to prevent flash of unstyled content
    gsap.set('.hero-content-layer > *', { y: 30, opacity: 0 })
    gsap.set('.trust-badge--floating', { x: 30, opacity: 0 })
    gsap.set('.hero-scroll-arrow', { opacity: 0 })

    tl.to('.hero-content-layer > *', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      delay: 0.2 // Small delay for smoother feel after page load
    })
    .to('.trust-badge--floating', {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15
    }, '-=0.6')
    .to('.hero-scroll-arrow', {
      opacity: 0.6,
      duration: 1
    }, '-=0.2')
  }, { scope: containerRef })

  return (
    <section className="scroll-hero-container" ref={containerRef}>
      {/* Background Video */}
      <div className="hero-video-wrapper">
        <video
          src={isMobile ? "/hero-720p.mp4" : "/hero-1080p.mp4"}
          className="hero-video-bg"
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
        />
        <div className="hero-video-overlay" />
      </div>

      {/* Text Content */}
      <div className="hero-content-layer">
        <div className="trust-eyebrow trust-eyebrow--dark">
          <span className="trust-eyebrow__rule trust-eyebrow__rule--dark" />
          INTEGRATED · RELIABLE · RESPONSIBLE
        </div>

        <h1 className="hero-cinematic-heading">
          SECURITY YOU<br />
          <span className="hero-cinematic-heading--accent">CAN TRUST.®</span>
        </h1>

        <p className="hero-cinematic-subcopy">
          End-to-end security solutions for India&apos;s leading enterprises.
        </p>

        <div className="hero-cta-group hero-cta-group--cinematic">
          <Link href="/contact" className="btn-primary">
            Request a Quote <ArrowRight size={18} />
          </Link>
          <span className="hero-cta-sub hero-cta-sub--light">
            or call <a href="tel:+919352303333">+91-93523-03333</a>
          </span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="hero-floating-badges">
        <div className="trust-badge trust-badge--floating">
          <Award size={20} color="var(--color-gold)" />
          <span>ISO 9001:2015</span>
        </div>
        <div className="trust-badge trust-badge--floating">
          <ShieldCheck size={20} color="var(--color-gold)" />
          <span>PSARA Licensed</span>
        </div>
      </div>

      {/* Scroll Arrow */}
      <div className="hero-scroll-arrow" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
