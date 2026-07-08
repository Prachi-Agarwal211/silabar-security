'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ShieldCheck, ChevronsRight, Shield } from 'lucide-react'
import SplitTextReveal from '../animations/SplitTextReveal'

const MARQUEE_ITEMS = [
  'Armed Guards',
  'Electronic Surveillance',
  'Event Security',
  'ATM Security',
  'Risk Assessment',
  'Facility Management',
]

export default function ScrollExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const bgWarmRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)
  
  const trustContentRef = useRef<HTMLDivElement>(null)
  const trustHeadingRef = useRef<HTMLHeadingElement>(null)
  const trustDividerRef = useRef<HTMLSpanElement>(null)
  const trustEyebrowRef = useRef<HTMLDivElement>(null)
  const trustSubcopyRef = useRef<HTMLParagraphElement>(null)
  const trustCaptionRef = useRef<HTMLDivElement>(null)
  const marqueeBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const bg = bgRef.current
    const bgWarm = bgWarmRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    const scrollCue = scrollCueRef.current
    const trustContent = trustContentRef.current
    const trustHeading = trustHeadingRef.current
    const trustDivider = trustDividerRef.current
    const trustEyebrow = trustEyebrowRef.current
    const trustSubcopy = trustSubcopyRef.current
    const trustCaption = trustCaptionRef.current
    const marqueeBar = marqueeBarRef.current
    const dock = document.getElementById('morph-video-dock')

    if (
      !wrapper || !bg || !bgWarm || !video || !overlay || !scrollCue ||
      !trustContent || !trustHeading || !trustDivider || !trustEyebrow ||
      !trustSubcopy || !trustCaption || !marqueeBar || !dock
    ) return

    video.play().catch(() => {})

    // Defer rect measurement until after first paint — ensures layout has settled.
    const measureAndInit = () => {
      const dockRect = dock.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight

      if (dockRect.width === 0) return

      const scaleX = dockRect.width / vw
      const scaleY = dockRect.height / vh
      const targetScale = Math.min(scaleX, scaleY)
      const tx = (dockRect.left + dockRect.width / 2) - vw / 2
      const ty = (dockRect.top + dockRect.height / 2) - vh / 2

      const barHeight = marqueeBar.getBoundingClientRect().height || 60
      const diagonal = Math.sqrt(vw * vw + vh * vh)
      const wipeScale = (diagonal / barHeight) * 1.2

      return { targetScale, tx, ty, wipeScale }
    }

    const measurements = measureAndInit()
    if (!measurements) return
    const { targetScale, tx, ty, wipeScale } = measurements

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // ══════════════════════════════════════════
      // LOAD-IN SEQUENCE (Non-scrubbed)
      // ══════════════════════════════════════════
      const leftPanel = document.querySelector('.hero-left-panel')
      const laserLines = document.querySelector('.laser-lines-container')

      const loadTl = gsap.timeline()
      loadTl.fromTo(leftPanel, 
        { x: '-100%' }, 
        { x: '0%', duration: 1.2, ease: 'expo.out' }, 0.2
      )
      loadTl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
      loadTl.fromTo(laserLines, { opacity: 0 }, { opacity: 1, duration: 1 }, 0.8)
      loadTl.fromTo(scrollCue, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, 1.5)

      // ══════════════════════════════════════════
      // PINNED SCROLL SEQUENCE
      // ══════════════════════════════════════════
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=320%', // Tightened from 400% for faster scroll feel — do not go below 280% or Act 3's wipe snaps instead of gliding
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // ══════════════════════════════════════════
      // ACT 1 — HERO EXITS (0 → 0.22)
      // ══════════════════════════════════════════

      // Fade out hero elements
      tl.to(leftPanel, { x: '-100%', duration: 0.15, ease: 'power2.in' }, 0.05)
      tl.to(scrollCue, { opacity: 0, duration: 0.05, ease: 'power2.in' }, 0.05)
      tl.to(laserLines, { opacity: 0, duration: 0.08, ease: 'power2.in' }, 0.05)
      tl.to(overlay, { opacity: 0, duration: 0.08, ease: 'power2.in' }, 0.10)

      // Warm gradient layer crossfades in
      tl.fromTo(bgWarm, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.inOut' }, 0.08)

      // ══════════════════════════════════════════
      // ACT 2 — TRUST: video docks, tilted strip appears (0.10 → 0.55)
      // ══════════════════════════════════════════

      // Video morphs from fullscreen down to card position via scale/translate
      tl.to(video, {
        scale: targetScale,
        x: tx,
        y: ty,
        borderRadius: 28,
        ease: 'power2.inOut',
        duration: 0.24,
      }, 0.10)

      // Trust copy reveals sequentially
      tl.to(trustContent, { opacity: 1, duration: 0.08, ease: 'power2.out' }, 0.20)
      tl.fromTo(trustEyebrow,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.06, ease: 'power3.out' }, 0.22)
      tl.fromTo(trustHeading,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0.24)
      tl.fromTo(trustDivider,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.05, ease: 'power2.out' }, 0.29)
      tl.fromTo(trustSubcopy,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.05, ease: 'power3.out' }, 0.30)
      tl.fromTo(trustCaption,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.05, ease: 'power3.out' }, 0.32)

      // The tilted strip slides in from the right ALREADY at its final -4° tilt
      tl.fromTo(marqueeBar,
        { x: '100%', opacity: 0, rotate: 0 },
        { x: '0%', opacity: 1, rotate: -4, duration: 0.10, ease: 'power2.out' }, 0.30)

      // 0.40 → 0.55 is an intentional HOLD — nothing new animates.

      // ══════════════════════════════════════════
      // ACT 3 — THE ZOOM-THROUGH WIPE (0.55 → 1.0)
      // ══════════════════════════════════════════

      // Trust text and video fade out together — only the strip remains visible.
      tl.to(trustContent, { opacity: 0, y: -20, duration: 0.10, ease: 'power2.in' }, 0.55)
      tl.to(video, { opacity: 0, duration: 0.10, ease: 'power2.in' }, 0.55)

      // The strip un-tilts (rotate back to 0°), then rotates to vertical (90°),
      // then scales up from its own center until it swallows the full viewport.
      tl.to(marqueeBar, {
        rotate: 90,
        scale: wipeScale,
        duration: 0.3, // Increased duration slightly
        ease: 'power2.in',
      }, 0.62)

      // Note: We don't fade out the marqueeBar at the end anymore. It stays fully opaque (black)
      // so when the pin releases, the user seamlessly scrolls into the dark RadialServices section.

      return () => {
        loadTl.kill()
        tl.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="scroll-wrapper">
      {/* Base dark background */}
      <div ref={bgRef} className="scroll-bg" />
      {/* Warm gradient layer — crossfades in over the dark base in Act 2 */}
      <div ref={bgWarmRef} className="scroll-bg-warm" />

      {/* ── HERO REDESIGN (Right Zone + Left Panel) ── */}
      <div className="hero-right-zone">
        {/* Video — position: fixed relative to viewport since wrapper is pinned */}
        <video ref={videoRef} className="morph-video" autoPlay muted loop playsInline>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div ref={overlayRef} className="hero-overlay" />
        
        <div className="laser-lines-container">
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <path d="M0,85% L100%,85%" className="laser-line-path" />
            <circle cx="50%" cy="85%" r="3" className="laser-line-dot" />
          </svg>
        </div>
      </div>

      <div className="hero-left-panel">
        <div className="vertical-text-wrapper">
          <p className="text-vertical text-micro is-dimmed">EST. 2005</p>
          <p className="text-vertical text-micro is-bright text-tracking-wide">
            INDIA'S PREMIER SECURITY FORCE
          </p>
        </div>

        <div className="hero-vertical-laser-line">
          <div className="laser-dot-origin" />
        </div>
        <div className="hero-horizontal-laser-line" />

        <div className="hero-badge-container">
          <div className="text-hero-wordmark">
            <span className="word-thin">
              <SplitTextReveal text="SILBAR" mode="chars" delay={0.4} />
            </span>
            <span className="word-bold">
              <SplitTextReveal text="SECURITY" mode="chars" delay={0.6} />
            </span>
          </div>
          <div className="shield-logo-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
            <Shield size={16} className="hero-badge-icon" strokeWidth={2} />
          </div>
        </div>

        {/* Scroll Cue */}
        <div ref={scrollCueRef} className="scroll-cue-ring">
          <div className="scroll-cue-dot" />
        </div>
      </div>

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
              SILBAR SECURITY SERVICES
            </div>

            <h2 ref={trustHeadingRef} className="trust-heading-light">
              SECURITY YOU<br />
              <span className="trust-heading-light__outline">CAN TRUST.®</span>
            </h2>

            <span ref={trustDividerRef} className="trust-divider" />

            <p ref={trustSubcopyRef} className="trust-subcopy">
              ISO 9001:2015 &amp; PSARA-2005 CERTIFIED<br />
              7,000+ LICENSED OFFICERS · PAN INDIA
            </p>

            <div ref={trustCaptionRef} className="trust-caption">
              <span className="trust-caption__bracket" />
              <span className="trust-caption__number">01</span>
              <span className="trust-caption__text">
                JAIPUR · DELHI · AHMEDABAD<br />AND 200+ CITIES.
              </span>
            </div>
          </div>

          {/* Empty dock slot — its computed rect is the video morph target.
              id="morph-video-dock" is read by useEffect via getElementById; keep stable. */}
          <div id="morph-video-dock" className="trust-card-light">
            <div className="trust-card-light__glow" />
            <div className="trust-card-light__overlay" />
          </div>
        </div>
      </div>

      {/* ── The strip — TOP-LEVEL sibling ── */}
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
  )
}
