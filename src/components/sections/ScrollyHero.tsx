'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

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

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    const line1 = tagline1Ref.current
    const line2 = tagline2Ref.current
    const scrollInd = scrollIndicatorRef.current
    if (!section || !video || !overlay || !line1 || !line2 || !scrollInd) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
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

      // Phase 1 (0–55%): overlay + text reveal
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'none' }, 0)
      tl.fromTo(line1,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.2, ease: 'none' }, 0.15)
      tl.fromTo(line2,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.2, ease: 'none' }, 0.3)
      tl.fromTo(scrollInd, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: 'none' }, 0.5)

      // Phase 2 (55–65%): text + overlay fade out
      tl.to([line1, line2], { y: -80, opacity: 0, duration: 0.15, ease: 'none' }, 0.55)
      tl.to(overlay, { opacity: 0, duration: 0.15, ease: 'none' }, 0.55)
      tl.to(scrollInd, { opacity: 0, duration: 0.1, ease: 'none' }, 0.55)

      // Phase 3 (65–100%): morph video from fullscreen into dock
      const dock = document.getElementById('morph-video-dock')
      if (dock) {
        const r = dock.getBoundingClientRect()
        tl.to(video, {
          position: 'fixed' as const,
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
          borderRadius: 28,
          ease: 'none',
          duration: 0.35,
          onComplete: () => {
            video.classList.add('morph-video--docked')
            video.classList.remove('morph-video--fullscreen')
            gsap.set(video, { clearProps: 'position,top,left,width,height,borderRadius' })
          },
        }, 0.65)
      }

      // ponytail: only kill the timeline here, mm.revert() in outer cleanup handles everything
      return () => tl.kill()
    })

    // ponytail: mm.revert() kills all contexts + scrolltriggers inside them
    return () => mm.revert()
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
