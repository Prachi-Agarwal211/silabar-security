'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function ScrollyHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const tagline1Ref = useRef<HTMLSpanElement>(null)
  const tagline2Ref = useRef<HTMLSpanElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const [tagsVisible, setTagsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    const line1 = tagline1Ref.current
    const line2 = tagline2Ref.current
    const scrollInd = scrollIndicatorRef.current
    if (!section || !video || !overlay || !line1 || !line2 || !scrollInd) return

    // Phase 1: Video plays, no text
    // Phase 2: Dark overlay fades in
    // Phase 3: Tagline line 1 clip-path reveal
    // Phase 4: Tagline line 2 clip-path reveal
    // Phase 5: Header appears (handled by Header component)
    // Phase 6: Scroll indicator appears
    // Phase 7: Parallax zoom as user scrolls past

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
      },
    })

    // Phase 2: Overlay fades in (0% - 15%)
    tl.fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.15, ease: 'none' },
      0,
    )

    // Phase 3: Tagline line 1 reveals (15% - 35%)
    tl.fromTo(line1,
      { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
      { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.2, ease: 'none' },
      0.15,
    )

    // Phase 4: Tagline line 2 reveals (30% - 50%)
    tl.fromTo(line2,
      { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
      { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.2, ease: 'none' },
      0.3,
    )

    // Phase 6: Scroll indicator (50% - 60%)
    tl.fromTo(scrollInd,
      { opacity: 0 },
      { opacity: 1, duration: 0.1, ease: 'none' },
      0.5,
    )

    // Phase 7: Parallax zoom out + fade (70% - 100%)
    tl.to(video,
      { scale: 1.2, opacity: 0, duration: 0.3, ease: 'none' },
      0.7,
    )
    tl.to(overlay,
      { opacity: 0, duration: 0.3, ease: 'none' },
      0.7,
    )
    tl.to([line1, line2],
      { y: -80, opacity: 0, duration: 0.3, ease: 'none' },
      0.7,
    )
    tl.to(scrollInd,
      { opacity: 0, duration: 0.1, ease: 'none' },
      0.7,
    )

    // Signal tags visible for Phase 5 (header show)
    tl.call(() => setTagsVisible(true), [], 0.15)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-dvh w-full">
      {/* Phase 1: Video */}
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Phase 2: Overlay */}
      <div ref={overlayRef} className="hero-overlay" />

      {/* Phase 3-4: Tagline */}
      <div className="hero-tagline">
        <span ref={tagline1Ref} className="tagline-line">
          PROFESSIONAL SECURITY.
        </span>
        <span ref={tagline2Ref} className="tagline-line">
          ZERO COMPROMISE.
        </span>
      </div>

      {/* Phase 6: Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="scroll-indicator">
        <span className="scroll-indicator__text">Scroll</span>
        <span className="scroll-indicator__line" />
      </div>

      {/* Expose tagsVisible to parent for Header */}
      <input type="hidden" data-tags-visible={tagsVisible ? 'true' : 'false'} />
    </section>
  )
}
