'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger, Flip } from '@/lib/gsap'

export default function ScrollyHero({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const tagline1Ref = useRef<HTMLSpanElement>(null)
  const tagline2Ref = useRef<HTMLSpanElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const [, setTagsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    const line1 = tagline1Ref.current
    const line2 = tagline2Ref.current
    const scrollInd = scrollIndicatorRef.current
    const dockSlot = document.getElementById('morph-video-dock')
    if (!section || !video || !overlay || !line1 || !line2 || !scrollInd || !dockSlot) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Capture the video's DOCKED state (its real resting place/size
      // inside TrustSection) before we visually promote it to fullscreen.
      const dockedState = Flip.getState(video)

      // Promote to fullscreen fixed layer for the hero phase.
      video.classList.add('is-hero-docked')
      gsap.set(video, { clearProps: 'all' })
      video.classList.add('is-hero-docked')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Phase 1 (0–55%): video stays fullscreen while copy reveals — untouched.
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'none' }, 0)
      tl.fromTo(line1,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.2, ease: 'none' }, 0.15)
      tl.fromTo(line2,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.2, ease: 'none' }, 0.3)
      tl.fromTo(scrollInd, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: 'none' }, 0.5)

      // Phase 2 (55–100%): text + overlay fade, THEN the video itself morphs
      // from fullscreen down into its docked card rect via Flip, scrubbed.
      tl.to([line1, line2], { y: -80, opacity: 0, duration: 0.15, ease: 'none' }, 0.55)
      tl.to(overlay, { opacity: 0, duration: 0.15, ease: 'none' }, 0.55)
      tl.to(scrollInd, { opacity: 0, duration: 0.1, ease: 'none' }, 0.55)

      tl.call(() => video.classList.remove('is-hero-docked'), [], 0.65)
      const morphFlip = Flip.from(dockedState, {
        targets: video,
        duration: 1,
        ease: 'none',
        absolute: true,
        props: 'borderRadius',
      })
      tl.add(morphFlip, 0.65)

      tl.call(() => setTagsVisible(true), [], 0.15)

      return () => {
        tl.kill()
        mm.revert()
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      mm.revert()
    }
  }, [videoRef])

  return (
    <section ref={sectionRef} className="relative h-dvh w-full">
      <div ref={overlayRef} className="hero-overlay" />

      <div className="hero-tagline">
        <span ref={tagline1Ref} className="tagline-line">PROFESSIONAL SECURITY.</span>
        <span ref={tagline2Ref} className="tagline-line">ZERO COMPROMISE.</span>
      </div>

      <div ref={scrollIndicatorRef} className="scroll-indicator">
        <span className="scroll-indicator__text">Scroll</span>
        <span className="scroll-indicator__line" />
      </div>
    </section>
  )
}
