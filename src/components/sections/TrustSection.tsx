'use client'

import { ShieldCheck, ChevronsRight } from 'lucide-react'

const MARQUEE_ITEMS = [
  '24/7 Monitoring',
  'Threat Detection',
  'Real-Time Alerts',
  'Data Encryption',
  'Rapid Response',
]

export default function TrustSection() {
  return (
    <section className="section-trust-light">
      <div className="flare-line flare-line--tl" />
      <div className="flare-line flare-line--center" />
      <div className="flare-line flare-line--br" />
      <div className="trust-dot-grid" />
      <div className="trust-left-rail">
        <span className="trust-dot" /><span className="trust-dot" /><span className="trust-dot" />
      </div>

      <div className="trust-grid">
        <div>
          <div className="trust-eyebrow">
            <span className="trust-eyebrow__rule" />
            PROTECTING TOMORROW
          </div>

          <h2 className="trust-heading-light">
            SECURITY YOU CAN<br />
            <span className="trust-heading-light__outline">TRUST.</span>
          </h2>

          <span className="trust-divider" />

          <p className="trust-subcopy">
            ADVANCED SOLUTIONS.<br />COMPLETE PEACE OF MIND.
          </p>

          <div className="trust-caption">
            <span className="trust-caption__bracket" />
            <span className="trust-caption__number">01</span>
            <span className="trust-caption__text">
              KEEPING WHAT MATTERS<br />SAFE AND SECURE.
            </span>
          </div>
        </div>

        <div id="morph-video-dock" className="trust-card-light">
          <div className="trust-card-light__glow" />
          <div className="trust-card-light__overlay" />
          <button className="trust-card__play" aria-label="Play security overview video" />
        </div>
      </div>

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
