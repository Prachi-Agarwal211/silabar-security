'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Award } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

const MARQUEE_ITEMS = [
  'Armed Guards',
  'Electronic Surveillance',
  'Event Security',
  'ATM Security',
  'Risk Assessment',
  'Facility Management',
]


export default function ScrollExperience() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)
  const statsBarRef = useRef<HTMLDivElement>(null)
  const trustBadgesRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile for fallback video behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useGSAP(() => {
    if (!containerRef.current || !videoRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Scroll-scrub the video (Desktop only for better performance)
      if (!isMobile) {
        // Wait for video metadata to get duration
        const initVideoScrub = () => {
          const duration = videoRef.current?.duration || 1
          
          gsap.to(videoRef.current, {
            currentTime: duration - 0.1, // Scrub to end
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=120%', // Pin for 1.2 viewport heights
              scrub: 1, // Smooth scrub
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          })
        }

        if (videoRef.current) {
          if (videoRef.current.readyState >= 1) {
            initVideoScrub()
          } else {
            videoRef.current.addEventListener('loadedmetadata', initVideoScrub, { once: true })
          }
        }
      } else {
        // Mobile: just pin it and let it autoplay, don't scrub video to save battery/perf
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
        })
      }

      // 2. Animate Main Text Content (Fades in and out)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1,
        },
      })

      // Initially show text
      tl.to(textContentRef.current, { opacity: 0, y: -50, duration: 0.3 }, 0.45) // Fade out at 45% scroll

      // 3. Float up the Trust Badges
      gsap.fromTo(
        trustBadgesRef.current,
        { opacity: 0, scale: 0.8, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
          },
        }
      )

      // 4. Parallax Stats Bar (slides up from bottom as we scroll through the pin)
      gsap.fromTo(
        statsBarRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=120%',
            scrub: 1,
          },
        }
      )
    })

    return () => mm.revert()
  }, { scope: containerRef, dependencies: [isMobile] })

  return (
    <section className="scroll-hero-container" ref={containerRef}>
      {/* 1. Background Video Layer */}
      <div className="hero-video-wrapper">
        <video
          ref={videoRef}
          src="/hero-1080p.mp4"
          className="hero-video-bg"
          playsInline
          muted
          loop={isMobile} // Only loop on mobile where we autoplay
          autoPlay={isMobile}
          preload="auto"
        />
        <div className="hero-video-overlay" />
      </div>

      {/* 2. Middle Content Layer (The Main Pitch) */}
      <div className="hero-content-layer" ref={textContentRef}>
        <div className="trust-eyebrow trust-eyebrow--dark">
          <span className="trust-eyebrow__rule trust-eyebrow__rule--dark" />
          INTEGRATED · RELIABLE · RESPONSIBLE
        </div>
        
        <h1 className="hero-cinematic-heading">
          SECURITY YOU<br />
          <span className="hero-cinematic-heading--accent">CAN TRUST.®</span>
        </h1>

        <p className="hero-cinematic-subcopy">
          End-to-end security solutions for India&apos;s leading enterprises.
        </p>

        <div className="hero-cta-group hero-cta-group--cinematic">
          <Link href="/contact" className="btn-primary">
            Request a Quote <ArrowRight size={18} />
          </Link>
          <span className="hero-cta-sub hero-cta-sub--light">
            or call <a href="tel:+919352303333">+91-93523-03333</a>
          </span>
        </div>
      </div>

      {/* 3. Floating Trust Signals Layer */}
      <div className="hero-floating-badges" ref={trustBadgesRef}>
        <div className="trust-badge trust-badge--floating">
          <Award size={20} color="var(--color-gold)" />
          <span>ISO 9001:2015</span>
        </div>
        <div className="trust-badge trust-badge--floating">
          <ShieldCheck size={20} color="var(--color-gold)" />
          <span>PSARA Licensed</span>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <div className="hero-scroll-cue__arrow" />
        <span>Scroll to explore</span>
      </div>

      {/* 4. Parallax Stats Bar (Slides up at the end) */}
      <div className="hero-stats-parallax" ref={statsBarRef}>
        <div className="hero-stats-bar hero-stats-bar--cinematic">
          <div className="stat-item">
            <span className="stat-value">22+</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">7,000+</span>
            <span className="stat-label">Guards</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">200+</span>
            <span className="stat-label">Cities</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Over</span>
            <span className="stat-value">500+</span>
            <span className="stat-label">Clients</span>
          </div>
        </div>

        {/* Marquee attached to bottom of stats */}
        <div className="trust-marquee-bar trust-marquee-bar--dark">
          <div className="trust-marquee-bar__icon">
            <ShieldCheck size={16} strokeWidth={1.75} color="var(--color-gold)" />
          </div>
          <div className="marquee marquee--dark">
            <div className="marquee__track">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="marquee__item">
                  {item}<span className="marquee__dot" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
