'use client'

import { useRef, useEffect } from 'react'
import { ShieldCheck, ChevronsRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const MARQUEE_ITEMS = [
  '24/7 Monitoring',
  'Threat Detection',
  'Real-Time Alerts',
  'Data Encryption',
  'Rapid Response',
]

export default function TrustSection({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const children = content.querySelectorAll('.scroll-reveal')
    gsap.fromTo(children,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      },
    )

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <section ref={sectionRef} className="section-trust-light">
      <div className="flare-line flare-line--tl" />
      <div className="flare-line flare-line--center" />
      <div className="trust-dot-grid" />
      <div className="trust-left-rail">
        <span className="trust-dot" /><span className="trust-dot" /><span className="trust-dot" />
      </div>

      <div ref={contentRef} className="trust-grid">
        <div>
          <div className="scroll-reveal trust-eyebrow">
            <span className="trust-eyebrow__rule" />
            PROTECTING TOMORROW
          </div>

          <h2 className="scroll-reveal trust-heading-light">
            SECURITY YOU CAN<br />
            <span className="trust-heading-light__outline">TRUST.</span>
          </h2>

          <span className="scroll-reveal trust-divider" />

          <p className="scroll-reveal trust-subcopy">
            ADVANCED SOLUTIONS.<br />COMPLETE PEACE OF MIND.
          </p>

          <div className="scroll-reveal trust-caption">
            <span className="trust-caption__bracket" />
            <span className="trust-caption__number">01</span>
            <span className="trust-caption__text">
              KEEPING WHAT MATTERS<br />SAFE AND SECURE.
            </span>
          </div>
        </div>

        {/* Docked slot: this box's computed rect is the Flip morph target.
            id="morph-video-dock" is read by ScrollyHero via getElementById —
            keep this id stable. */}
        <div id="morph-video-dock" className="scroll-reveal trust-card-light">
          <video
            ref={videoRef}
            id="morph-video"
            className="morph-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="trust-card-light__glow" />
          <div className="trust-card-light__overlay" />
          <button className="trust-card__play" aria-label="Play security overview video" />
        </div>
      </div>

      {/* Bottom marquee — separate black strip, not inline with the cream section */}
      <div className="trust-marquee-bar">
        <div className="trust-marquee-bar__icon">
          <ShieldCheck size={16} strokeWidth={1.75} />
        </div>
        <div className="marquee marquee--dark">
          <div className="marquee__track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="marquee__item marquee__item--accent">
                {item}<span className="marquee__dot" />
              </span>
            ))}
          </div>
        </div>
        <ChevronsRight size={20} className="trust-marquee-bar__arrow" />
      </div>
    </section>
  )
}
