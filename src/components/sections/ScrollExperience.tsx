'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ShieldCheck, ChevronsRight, Shield, Maximize2 } from 'lucide-react'
import SplitTextReveal from '../animations/SplitTextReveal'
import { GradientText } from '../ui/GradientText'

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

    // ── Live measurement functions (re-evaluated by ScrollTrigger on every refresh) ──
    const getVideoTarget = () => {
      const dockRect = dock.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      if (dockRect.width === 0) return { scale: 1, x: 0, y: 0 }
      const scaleX = dockRect.width / vw
      const scaleY = dockRect.height / vh
      const isPortraitDock = dockRect.height > dockRect.width
      return {
        scale: isPortraitDock ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY),
        x: (dockRect.left + dockRect.width / 2) - vw / 2,
        y: (dockRect.top + dockRect.height / 2) - vh / 2,
      }
    }



    ScrollTrigger.normalizeScroll(true)

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
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
      const scrollMm = gsap.matchMedia()

      // Desktop Timeline (Morphs video into dock)
      const buildDesktopTl = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=320%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // ACT 1 — HERO EXITS (0 → 0.22)
        tl.to(leftPanel, { x: '-100%', duration: 0.15, ease: 'power2.in' }, 0.05)
        tl.to(scrollCue, { opacity: 0, duration: 0.05, ease: 'power2.in' }, 0.05)
        tl.to(laserLines, { opacity: 0, duration: 0.08, ease: 'power2.in' }, 0.05)
        tl.to(overlay, { opacity: 0, duration: 0.08, ease: 'power2.in' }, 0.10)
        tl.fromTo(bgWarm, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.inOut' }, 0.08)

        // ACT 2 — TRUST: video docks, marquee appears (0.10 → 0.55)
        tl.to(video, {
          scale: () => getVideoTarget().scale,
          x: () => getVideoTarget().x,
          y: () => getVideoTarget().y,
          borderRadius: 28,
          ease: 'power2.inOut',
          duration: 0.24,
        }, 0.10)

        tl.to(trustContent, { opacity: 1, duration: 0.08, ease: 'power2.out' }, 0.20)
        tl.fromTo(trustEyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.06, ease: 'power3.out' }, 0.22)
        tl.fromTo(trustHeading, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0.24)
        tl.fromTo(trustDivider, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.05, ease: 'power2.out' }, 0.29)
        tl.fromTo(trustSubcopy, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power3.out' }, 0.30)
        tl.fromTo(trustCaption, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.05, ease: 'power3.out' }, 0.32)

        tl.fromTo(marqueeBar,
          { x: '100%', opacity: 0, rotate: 0 },
          { x: '0%', opacity: 1, rotate: -4, duration: 0.10, ease: 'power2.out' }, 0.30)

        // ACT 3 — CLEAN FADE OUT (0.55 → 1.0)
        tl.to(trustContent, { opacity: 0, y: -20, duration: 0.10, ease: 'power2.in' }, 0.55)
        tl.to(video, { opacity: 0, duration: 0.10, ease: 'power2.in' }, 0.55)
        
        // Remove massive wipe, just fade out marquee smoothly
        tl.to(marqueeBar, { opacity: 0, y: -50, duration: 0.15, ease: 'power2.in' }, 0.62)

        return tl
      }

      // Mobile Timeline (Simple Crossfade, NO Morphing)
      const buildMobileTl = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=250%', // slightly shorter scroll distance on mobile
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
          },
        })

        // ACT 1 — FADE OUT HERO
        tl.to(leftPanel, { opacity: 0, y: -20, duration: 0.15, ease: 'power2.in' }, 0.05)
        tl.to(scrollCue, { opacity: 0, duration: 0.05 }, 0.05)
        tl.to(overlay, { opacity: 0, duration: 0.08 }, 0.10)
        tl.fromTo(bgWarm, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.inOut' }, 0.08)
        
        // FADE VIDEO OUT INSTEAD OF MORPHING
        tl.to(video, { opacity: 0, duration: 0.2 }, 0.10)

        // ACT 2 — FADE IN TRUST
        tl.to(trustContent, { opacity: 1, duration: 0.15, ease: 'power2.out' }, 0.20)
        tl.fromTo(trustEyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.1 }, 0.22)
        tl.fromTo(trustHeading, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.1 }, 0.24)
        tl.fromTo(trustDivider, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.1 }, 0.29)
        tl.fromTo(trustSubcopy, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.1 }, 0.30)
        tl.fromTo(trustCaption, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.32)

        // Bring in marquee flat on mobile
        tl.fromTo(marqueeBar,
          { x: '100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 0.15, ease: 'power2.out' }, 0.30)

        // ACT 3 — CLEAN FADE OUT
        tl.to(trustContent, { opacity: 0, y: -20, duration: 0.15, ease: 'power2.in' }, 0.60)
        tl.to(marqueeBar, { opacity: 0, y: -30, duration: 0.15, ease: 'power2.in' }, 0.65)

        return tl
      }

      scrollMm.add('(min-width: 768px)', () => {
        const tl = buildDesktopTl()
        return () => { tl.kill() }
      })

      scrollMm.add('(max-width: 767px)', () => {
        const tl = buildMobileTl()
        return () => { tl.kill() }
      })

      // ── Re-run ScrollTrigger's measurements on resize / font / video load ──
      const refresh = () => ScrollTrigger.refresh()
      let resizeTimer: ReturnType<typeof setTimeout> | undefined
      const debouncedRefresh = () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(refresh, 200)
      }
      window.addEventListener('resize', debouncedRefresh)
      video.addEventListener('loadedmetadata', refresh, { once: true })
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(refresh)
      }

      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        loadTl.kill()
        scrollMm.revert()
        window.removeEventListener('resize', debouncedRefresh)
        video.removeEventListener('loadedmetadata', refresh)
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="scroll-wrapper">
      {/* Base dark background with animated mesh */}
      <div ref={bgRef} className="scroll-bg mesh-bg-animated" />
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
        <div className="hero-tagline-stack">
          <p className="text-vertical text-micro is-dimmed">UNCOMPROMISED SAFETY</p>
          <p className="text-vertical text-micro is-dimmed">INTEGRATED PROTECTION</p>
        </div>

        <div className="vertical-text-wrapper">
          <p className="text-vertical text-micro is-dimmed">EST. 2005</p>
          <p className="text-vertical text-micro is-bright text-tracking-wide">
            INDIA&apos;S PREMIER SECURITY FORCE
          </p>
        </div>

        <div className="hero-vertical-laser-line">
          <div className="laser-dot-origin" />
        </div>
        <div className="hero-horizontal-laser-line" />

        <div className="hero-badge-container">
          <GradientText as="h1" className="text-hero-wordmark">
            <span className="word-thin">
              <SplitTextReveal text="SILBAR" mode="chars" delay={0.4} />
            </span>
            <span className="word-bold">
              <SplitTextReveal text="SECURITY" mode="chars" delay={0.6} />
            </span>
          </GradientText>
          <div className="shield-logo-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
            <Shield size={16} className="hero-badge-icon" strokeWidth={2} />
          </div>
        </div>

        <p className="hero-bottom-tagline">
          PROTECTED BEYOND EXPECTATION.
        </p>

        <div ref={scrollCueRef} className="scroll-cue-ring">
          <div className="scroll-cue-dot" />
        </div>
      </div>

      <div className="flare-line flare-line--tl" />
      <div className="flare-line flare-line--center" />
      <div className="flare-line flare-line--br" />

      {/* ── Trust content (Act 2: "SECURITY YOU CAN TRUST") ── */}
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
              7,000+ LICENSED OFFICERS · PAN INDIA<br />
              INTEGRATED · RELIABLE · 24/7
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
            <div className="trust-card-light__frame">
              <span className="trust-card-light__expand" aria-hidden="true">
                <Maximize2 size={14} />
              </span>
              <div className="trust-card-light__dots" aria-hidden="true">
                <span className="trust-card-light__dot" />
                <span className="trust-card-light__dot" />
                <span className="trust-card-light__dot" />
                <span className="trust-card-light__dot trust-card-light__dot--active" />
              </div>
            </div>
            <div className="trust-card-light__glow" />
            <div className="trust-card-light__overlay" />
          </div>
        </div>
      </div>

      {/* ── The strip — TOP-LEVEL sibling.
          This black strip wipe should visually lead into the services-comic-section below ── */}
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
