'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const MARQUEE_ITEMS = [
  'Armed Response',
  '24/7 Surveillance',
  'VIP Protection',
  'Event Security',
  'Corporate Guarding',
  'Access Control',
  'Risk Assessment',
  'Cyber Security',
]

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    // ponytail: scroll-driven reveal, single ScrollTrigger
    const children = content.querySelectorAll('.scroll-reveal')
    gsap.fromTo(children,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="section-trust">
      {/* Flare lines */}
      <div className="flare-line flare-line--tl" />
      <div className="flare-line flare-line--br" />
      <div className="flare-line flare-line--center" />

      <div ref={contentRef} className="trust-grid">
        {/* Left: Text */}
        <div>
          <div className="scroll-reveal trust-label">
            <span className="trust-label__number">01</span>
            <span>What We Stand For</span>
          </div>

          <h2 className="scroll-reveal trust-heading">
            Security You Can <span>Trust</span>
          </h2>

          <p className="scroll-reveal trust-description">
            Veteran-led, tech-enabled, and Pan-India. We combine decades of
            field experience with modern surveillance systems to deliver
            security that never sleeps. Every guard trained. Every corner covered.
          </p>

          <div className="scroll-reveal">
            <a href="#contact" className="hero-nav-cta inline-block">
              Learn More
            </a>
          </div>
        </div>

        {/* Right: Video Card */}
        <div className="scroll-reveal trust-card">
          <video
            className="trust-card__video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="trust-card__overlay" />
          <button
            className="trust-card__play"
            aria-label="Play security overview video"
          />
        </div>
      </div>

      {/* Marquee ticker at bottom */}
      <div className="marquee">
        <div className="marquee__track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee__item">
              <span className="marquee__dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
