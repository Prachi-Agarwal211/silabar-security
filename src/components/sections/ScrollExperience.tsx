'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ShieldCheck, ChevronsRight, Shield, Users, Building2, Camera, Search, Wrench, GraduationCap, TrendingUp, FileText, Landmark } from 'lucide-react'

const MARQUEE_ITEMS = [
  'Armed Guards',
  'Electronic Surveillance',
  'Event Security',
  'ATM Security',
  'Risk Assessment',
  'Facility Management',
]

const SERVICES = [
  { icon: Shield, title: 'Guarding Services', desc: 'Armed and unarmed guards, lady guards, supervisors, bouncers, and bodyguards for comprehensive on-site protection.' },
  { icon: Building2, title: 'Corporate & Industrial Security', desc: 'Complete security solutions for commercial, industrial, and residential facilities across India.' },
  { icon: Users, title: 'Event & VIP/VVIP Protection', desc: 'Escort and patrolling services for events, VIPs, and dignitaries with layered security protocols.' },
  { icon: Landmark, title: 'Bank & ATM Security', desc: 'Cash van and bullion escort services with armed protection for secure financial transport.' },
  { icon: Camera, title: 'Electronic Surveillance', desc: 'CCTV installation, access control systems, fire alarms, GPS tracking, and intruder detection.' },
  { icon: Search, title: 'Risk Assessment & Audits', desc: 'Security audits, disaster management, and crisis management consultancy for your business.' },
  { icon: Wrench, title: 'Facility Management', desc: 'Full-spectrum facility management services including maintenance, housekeeping, and operations.' },
  { icon: GraduationCap, title: 'Security Training', desc: 'PSARA-compliant training centres for security personnel with certified curriculum.' },
  { icon: TrendingUp, title: 'Skill Development', desc: 'Manpower solutions and skill development programs to build a trained security workforce.' },
  { icon: FileText, title: 'KYC Verifications', desc: 'Background checks and KYC verification services for employee and vendor screening.' },
]

export default function ScrollExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const tagline1Ref = useRef<HTMLSpanElement>(null)
  const tagline2Ref = useRef<HTMLSpanElement>(null)
  const scrollIndRef = useRef<HTMLDivElement>(null)
  const trustContentRef = useRef<HTMLDivElement>(null)
  const trustHeadingRef = useRef<HTMLHeadingElement>(null)
  const trustDividerRef = useRef<HTMLSpanElement>(null)
  const trustEyebrowRef = useRef<HTMLDivElement>(null)
  const trustSubcopyRef = useRef<HTMLParagraphElement>(null)
  const trustCaptionRef = useRef<HTMLDivElement>(null)
  const marqueeBarRef = useRef<HTMLDivElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesHeadingRef = useRef<HTMLHeadingElement>(null)
  const servicesGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const bg = bgRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    const line1 = tagline1Ref.current
    const line2 = tagline2Ref.current
    const scrollInd = scrollIndRef.current
    const trustContent = trustContentRef.current
    const trustHeading = trustHeadingRef.current
    const trustDivider = trustDividerRef.current
    const trustEyebrow = trustEyebrowRef.current
    const trustSubcopy = trustSubcopyRef.current
    const trustCaption = trustCaptionRef.current
    const marqueeBar = marqueeBarRef.current
    const servicesContent = servicesContentRef.current
    const servicesHeading = servicesHeadingRef.current
    const servicesGrid = servicesGridRef.current
    const dock = document.getElementById('morph-video-dock')

    if (
      !wrapper || !bg || !video || !overlay || !line1 || !line2 || !scrollInd ||
      !trustContent || !trustHeading || !trustDivider || !trustEyebrow ||
      !trustSubcopy || !trustCaption || !marqueeBar || !dock ||
      !servicesContent || !servicesHeading || !servicesGrid
    ) return

    video.play().catch(() => {})

    const dockRect = dock.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const scaleX = dockRect.width / vw
    const scaleY = dockRect.height / vh
    const targetScale = Math.min(scaleX, scaleY)
    const tx = (dockRect.left + dockRect.width / 2) - vw / 2
    const ty = (dockRect.top + dockRect.height / 2) - vh / 2

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // ══════════════════════════════════════════
      // SECTION 1: Hero → Trust (0 → 0.35)
      // ══════════════════════════════════════════

      // Phase 1 (0→0.1): Hero text already visible — overlay + scroll indicator fade in
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'power2.out' }, 0)
      tl.fromTo(scrollInd, { opacity: 0 }, { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.05)

      // Phase 2 (0.1→0.3): Background dark→cream, hero fades out
      tl.to(bg, { backgroundColor: '#F0EBE1', duration: 0.2, ease: 'power2.inOut' }, 0.1)
      tl.to([line1, line2], { y: -40, opacity: 0, duration: 0.1, ease: 'power2.in' }, 0.12)
      tl.to(overlay, { opacity: 0, duration: 0.1, ease: 'power2.in' }, 0.12)
      tl.to(scrollInd, { opacity: 0, duration: 0.06, ease: 'power2.in' }, 0.12)

      // Phase 3 (0.15→0.45): Video morphs fullscreen → card
      tl.to(video, {
        scale: targetScale,
        x: tx,
        y: ty,
        borderRadius: 28,
        ease: 'power2.inOut',
        duration: 0.3,
      }, 0.15)

      // Phase 4 (0.25→0.5): Trust content fades in
      tl.to(trustContent, { opacity: 1, duration: 0.1, ease: 'power2.out' }, 0.25)
      tl.fromTo(trustEyebrow,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0.28)
      tl.fromTo(trustHeading,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.1, ease: 'power3.out' }, 0.3)
      tl.fromTo(trustDivider,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.06, ease: 'power2.out' }, 0.34)
      tl.fromTo(trustSubcopy,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.06, ease: 'power3.out' }, 0.36)
      tl.fromTo(trustCaption,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.06, ease: 'power3.out' }, 0.38)

      // Phase 5 (0.38→0.5): Marquee bar slides in
      tl.fromTo(marqueeBar,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.12, ease: 'power2.out' }, 0.38)

      // ══════════════════════════════════════════
      // SECTION 2: Trust → Services (0.5 → 0.75)
      // ══════════════════════════════════════════

      // Phase 6 (0.5→0.6): Trust content fades out
      tl.to(trustContent, { opacity: 0, y: -30, duration: 0.1, ease: 'power2.in' }, 0.5)
      tl.to(marqueeBar, { x: '-100%', opacity: 0, duration: 0.1, ease: 'power2.in' }, 0.5)

      // Phase 7 (0.55→0.7): Services content fades in
      tl.to(servicesContent, { opacity: 1, duration: 0.1, ease: 'power2.out' }, 0.55)
      tl.fromTo(servicesHeading,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.1, ease: 'power3.out' }, 0.58)

      // Phase 8 (0.62→0.75): Service cards stagger in
      const cards = servicesGrid.querySelectorAll('.service-card')
      tl.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.12, ease: 'power3.out', stagger: 0.02 }, 0.62)

      // ══════════════════════════════════════════
      // SECTION 3: Settle (0.75 → 1.0)
      // ══════════════════════════════════════════

      // Phase 9 (0.75→0.9): Subtle polish
      tl.to(servicesHeading, { y: -6, duration: 0.15, ease: 'none' }, 0.75)

      return () => tl.kill()
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="scroll-wrapper">
      {/* Background layer — dark → cream */}
      <div ref={bgRef} className="scroll-bg" />

      {/* Video — position: fixed, morphs via transform:scale */}
      <video
        ref={videoRef}
        className="morph-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Hero overlay */}
      <div ref={overlayRef} className="hero-overlay" />

      {/* Hero tagline */}
      <div className="hero-tagline">
        <span ref={tagline1Ref} className="tagline-line">Professional Security Wasn't Available...</span>
        <span ref={tagline2Ref} className="tagline-line">So We Fixed It.®</span>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndRef} className="scroll-indicator">
        <span className="scroll-indicator__text">Scroll</span>
        <span className="scroll-indicator__line" />
      </div>

      {/* Flare lines */}
      <div className="flare-line flare-line--tl" />
      <div className="flare-line flare-line--center" />
      <div className="flare-line flare-line--br" />

      {/* ── Trust content ── */}
      <div ref={trustContentRef} className="trust-scroll-content">
        <div className="trust-dot-grid" />
        <div className="trust-left-rail">
          <span className="trust-dot" /><span className="trust-dot" /><span className="trust-dot" />
        </div>

        <div className="trust-grid">
          <div>
            <div ref={trustEyebrowRef} className="trust-eyebrow">
              <span className="trust-eyebrow__rule" />
              SILBAR SECURITY
            </div>

            <h2 ref={trustHeadingRef} className="trust-heading-light">
              FOUNDED BY<br />
              <span className="trust-heading-light__outline">LAW ENFORCEMENT.®</span>
            </h2>

            <span ref={trustDividerRef} className="trust-divider" />

            <p ref={trustSubcopyRef} className="trust-subcopy">
              ISO 9001:2015 &amp; PSARA-2005 CERTIFIED<br />7,000+ LICENSED OFFICERS
            </p>

            <div ref={trustCaptionRef} className="trust-caption">
              <span className="trust-caption__bracket" />
              <span className="trust-caption__number">01</span>
              <span className="trust-caption__text">
                TRUSTED SECURITY SERVICES<br />ACROSS PAN INDIA.
              </span>
            </div>
          </div>

          <div id="morph-video-dock" className="trust-card-light">
            <div className="trust-card-light__glow" />
            <div className="trust-card-light__overlay" />
          </div>
        </div>

        <div ref={marqueeBarRef} className="trust-marquee-bar">
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
      </div>

      {/* ── Services content ── */}
      <div ref={servicesContentRef} className="services-scroll-content">
        <div className="services-inner">
          <div ref={servicesHeadingRef} className="services-header">
            <span className="services-eyebrow">SILBAR SECURITY</span>
            <h2 className="services-title">
              OUR <span className="services-title--outline">SERVICES</span>
            </h2>
            <span className="services-divider" />
            <p className="services-subcopy">
              END-TO-END SECURITY SOLUTIONS<br />ACROSS 10 SERVICE VERTICALS.
            </p>
          </div>

          <div ref={servicesGridRef} className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">
                  <s.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <span className="service-card__number">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
