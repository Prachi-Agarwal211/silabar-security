'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Award } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { CONTACT } from '@/lib/config'

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
    if (!containerRef.current) return
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    const mm = gsap.matchMedia()

    const eyebrow = containerRef.current.querySelectorAll('.trust-eyebrow')
    const heading = containerRef.current.querySelectorAll('.hero-heading-line')
    const subcopy = containerRef.current.querySelectorAll('.hero-cinematic-subcopy')
    const cta = containerRef.current.querySelectorAll('.hero-cta-group--cinematic')
    const badges = containerRef.current.querySelectorAll('.hero-floating-badges')
    const arrow = containerRef.current.querySelectorAll('.hero-scroll-arrow')
    const videoWrapper = containerRef.current.querySelectorAll('.hero-video-wrapper')
    const videoOverlay = containerRef.current.querySelectorAll('.hero-video-overlay')

    if (eyebrow.length) gsap.set(eyebrow, { y: 40, opacity: 0 })
    if (heading.length) gsap.set(heading, { clipPath: 'inset(0 100% 0 0)', y: 60, opacity: 0 })
    if (subcopy.length) gsap.set(subcopy, { y: 40, opacity: 0 })
    if (cta.length) gsap.set(cta, { y: 40, opacity: 0 })
    if (badges.length) gsap.set(badges, { y: 40, opacity: 0 })
    if (arrow.length) gsap.set(arrow, { opacity: 0 })

    if (eyebrow.length) tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.8, delay: 0.15 })
    if (heading.length) tl.to(heading, { clipPath: 'inset(0 0% 0 0)', y: 0, opacity: 1, duration: 1, stagger: 0.15 }, '-=0.3')
    if (subcopy.length) tl.to(subcopy, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
    if (cta.length) tl.to(cta, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
    if (badges.length) tl.to(badges, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
    if (arrow.length) tl.to(arrow, { opacity: 0.6, duration: 1 }, '-=0.4')

    // Scroll parallax on video
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (videoWrapper.length) {
        gsap.to(videoWrapper, {
          scale: 1.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
      if (videoOverlay.length) {
        gsap.to(videoOverlay, {
          opacity: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })
    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section className="scroll-hero-container" ref={containerRef}>
      <div className="hero-video-wrapper">
        <video
          src={isMobile ? '/hero-720p.mp4' : '/hero-1080p.mp4'}
          className="hero-video-bg"
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
          poster="/hero-guard.webp"
        />
        <div className="hero-video-overlay" />
      </div>

      {/* Content + badges nested together so mobile layout stays correct */}
      <div className="hero-content-layer">
        <div className="trust-eyebrow trust-eyebrow--dark">
          <span className="trust-eyebrow__rule trust-eyebrow__rule--dark" />
          SILBAR SECURITY SERVICES PVT. LTD.
        </div>

        <h1 className="hero-cinematic-heading">
          <span className="sr-only">SECURITY YOU CAN TRUST.®</span>
          <span aria-hidden="true">
            <span className="hero-heading-line">SECURITY YOU</span>
            <span className="hero-heading-line hero-heading-line--accent">CAN TRUST.®</span>
          </span>
        </h1>

        <p className="hero-cinematic-subcopy">
          Silbar Security Services Pvt. Ltd. — PSARA-licensed, ISO-certified
          security solutions for India&apos;s leading enterprises.
        </p>

        <div className="hero-cta-group hero-cta-group--cinematic">
          <Link href="/contact" className="btn-primary">
            Request a Quote <ArrowRight size={18} />
          </Link>
          <span className="hero-cta-sub hero-cta-sub--light">
            or call <a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phone}</a>
          </span>
        </div>

        <div className="hero-floating-badges">
          <div className="trust-badge trust-badge--floating">
            <Award size={20} color="var(--color-gold)" />
            <span>ISO 9001:2015</span>
          </div>
          <div className="trust-badge trust-badge--floating">
            <ShieldCheck size={20} color="var(--color-gold)" />
            <span>Licensed Agency</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-arrow" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
