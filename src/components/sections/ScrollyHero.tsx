'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Counter from '@/components/animations/Counter'
import { SITE, STATS } from '@/lib/constants'
import { Shield, Cctv, Siren, KeyRound, Flame } from 'lucide-react'

const services = [
  { name: 'Guard Services', icon: Shield, color: '#D4AF37' },
  { name: 'CCTV Surveillance', icon: Cctv, color: '#42638C' },
  { name: 'Vehicle Patrol', icon: Siren, color: '#B8941E' },
  { name: 'Access Control', icon: KeyRound, color: '#2E4A6B' },
  { name: 'Fire Safety', icon: Flame, color: '#CC2222' },
]

const mapDots = [
  { x: 62, y: 28, city: 'Delhi' },
  { x: 58, y: 35, city: 'Mumbai' },
  { x: 68, y: 55, city: 'Bangalore' },
  { x: 72, y: 42, city: 'Hyderabad' },
  { x: 75, y: 50, city: 'Chennai' },
  { x: 65, y: 38, city: 'Pune' },
  { x: 78, y: 32, city: 'Kolkata' },
  { x: 55, y: 30, city: 'Ahmedabad' },
]

function MobileHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark overlay with mesh gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/80 via-midnight-950/70 to-midnight-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="relative mb-6 h-20 w-20 overflow-hidden border border-gold-400/25 bg-midnight-900/60 backdrop-blur-sm">
          <Image src="/logo.png" alt="Silbar Security" fill className="object-contain p-1.5" sizes="80px" />
        </div>
        <h1 className="mb-2 font-display text-[clamp(2.5rem,10vw,4rem)] gradient-text-hero">SILBAR</h1>
        <h1 className="mb-4 font-display text-[clamp(2.5rem,10vw,4rem)] gradient-text-hero">SECURITY</h1>
        <div className="mb-4 h-px w-20 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
        <p className="mb-2 text-sm tracking-[0.15em] text-gold-400">Professional Security. Zero Compromise.</p>
        <p className="mb-8 max-w-sm text-xs leading-relaxed text-horizon-300">
          50+ cities. 5000+ guards. 24/7 monitoring. PSARA licensed.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <a href="/contact" className="btn-gold-glow inline-flex h-13 items-center justify-center px-8 text-sm font-bold tracking-[0.05em]">
            Get Free Assessment
          </a>
          <a href={SITE.phoneTel} className="inline-flex h-13 items-center justify-center border border-red-500/30 px-8 text-sm font-bold tracking-[0.05em] text-horizon-100 transition-colors hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_30px_rgba(204,34,34,0.15)]">
            Call: {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

export default function ScrollyHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=700%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    // Phase 1: "THE VOID"
    tl.addLabel('phase1')
      .from('.phase-1-text', { opacity: 0, scale: 0.8, duration: 2, ease: 'power2.out' }, 'phase1')
      .to('.phase-1-text', { opacity: 0, scale: 1.1, duration: 1 }, 'phase1+=3')
      .to('.chaos-circle', { clipPath: 'circle(150% at 50% 50%)', duration: 3, ease: 'power2.inOut' }, 'phase1+=2')

    // Phase 2: "THE BREACH"
    tl.addLabel('phase2')
      .to('.red-overlay', { opacity: 0.85, duration: 0.3 }, 'phase2')
      .to('.breach-flash', { opacity: 1, duration: 0.15 }, 'phase2')
      .to('.breach-flash', { opacity: 0, duration: 0.4 }, 'phase2+=0.15')
      .to('.red-overlay', { opacity: 0, duration: 0.5 }, 'phase2+=0.5')
      .from('.phase-2-text', { yPercent: 30, opacity: 0, duration: 2, ease: 'power3.out' }, 'phase2+=0.8')
      .from('.phase-2-stat', { y: 40, opacity: 0, stagger: 0.3, duration: 1.5, ease: 'power2.out' }, 'phase2+=2')
      .to('.phase-2-text, .phase-2-stat', { opacity: 0, duration: 1 }, 'phase2+=5')

    // Phase 3: "THE SHIELD FORMS"
    tl.addLabel('phase3')
      .to('.chaos-scene', { clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)', duration: 2.5, ease: 'power3.inOut' }, 'phase3')
      .to('.navy-flood', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 2.5, ease: 'power3.inOut' }, 'phase3')
      .from('.shield-logo', { scale: 0, rotation: -180, duration: 2, ease: 'back.out(1.7)' }, 'phase3+=1.5')
      .from('.phase-3-text', { yPercent: 40, opacity: 0, duration: 2, ease: 'power3.out' }, 'phase3+=2.5')
      .from('.phase-3-subtitle', { yPercent: 20, opacity: 0, duration: 1.5 }, 'phase3+=3.5')
      .to('.phase-3-text, .phase-3-subtitle, .shield-logo', { opacity: 0, duration: 1 }, 'phase3+=5.5')

    // Phase 4: "LAYER BY LAYER"
    tl.addLabel('phase4')
    services.forEach((_, i) => {
      const directions = [
        'inset(100% 0 0 0)', 'inset(0 100% 0 0)', 'inset(0 0 100% 0)',
        'inset(0 0 0 100%)', 'circle(0% at 50% 50%)',
      ]
      tl.from(`.service-layer-${i}`, { clipPath: directions[i], duration: 2, ease: 'power2.inOut' }, `phase4+=${i * 2}`)
    })
    tl.from('.phase-4-label', { opacity: 0, y: 20, duration: 1.5 }, 'phase4+=4')
    tl.to('.services-stack', { opacity: 0, duration: 1 }, 'phase4+=11')

    // Phase 5: "THE COVERAGE"
    tl.addLabel('phase5')
      .from('.india-map', { scale: 0.7, opacity: 0, duration: 2.5, ease: 'power2.out' }, 'phase5')
      .from('.map-dot', { scale: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(2)' }, 'phase5+=1.5')
      .from('.phase-5-text', { yPercent: 30, opacity: 0, duration: 2, ease: 'power3.out' }, 'phase5+=3')
      .from('.phase-5-subtitle', { yPercent: 20, opacity: 0, duration: 1.5 }, 'phase5+=4')
      .to('.phase-5-group', { opacity: 0, duration: 1 }, 'phase5+=7')

    // Phase 6: "THE NUMBERS"
    tl.addLabel('phase6')
      .from('.stat-card-0', { x: -100, opacity: 0, duration: 1.5, ease: 'power3.out' }, 'phase6')
      .from('.stat-card-1', { x: 100, opacity: 0, duration: 1.5, ease: 'power3.out' }, 'phase6+=0.5')
      .from('.stat-card-2', { y: 80, opacity: 0, duration: 1.5, ease: 'power3.out' }, 'phase6+=1')
      .from('.stat-card-3', { scale: 0.5, opacity: 0, duration: 1.5, ease: 'power3.out' }, 'phase6+=1.5')
      .to('.stats-grid', { opacity: 0, duration: 1 }, 'phase6+=5')

    // Phase 7: "CONTROL."
    tl.addLabel('phase7')
      .to('.final-bg', { opacity: 1, duration: 1.5 }, 'phase7')
      .from('.phase-7-text', { scale: 3, opacity: 0, duration: 2.5, ease: 'power4.out' }, 'phase7+=0.5')
      .from('.phase-7-tagline', { yPercent: 30, opacity: 0, duration: 2, ease: 'power3.out' }, 'phase7+=2')
      .from('.cta-block', { y: 60, opacity: 0, duration: 1.5, ease: 'power3.out' }, 'phase7+=3.5')
      .from('.scroll-indicator', { y: 20, opacity: 0, duration: 1, ease: 'power2.out' }, 'phase7+=4.5')

  }, { scope: sectionRef })

  // Reduced motion fallback
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return <MobileHero />
  }

  if (isMobile) {
    return <MobileHero />
  }

  return (
    <section ref={sectionRef} className="scrolly-hero">
      {/* LAYER 1: BACKGROUND */}
      <div className="layer layer-bg">
        <div className="chaos-scene">
          <div className="chaos-circle" />
          <div className="chaos-overlay" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(204,34,34,0.18)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(163,27,27,0.12)_0%,transparent_45%)]" />
          <div aria-hidden="true" className="absolute top-[20%] left-[10%] h-32 w-32 border border-red-500/25 rotate-12" />
          <div aria-hidden="true" className="absolute top-[40%] right-[15%] h-24 w-48 border border-red-500/20 -rotate-6" />
          <div aria-hidden="true" className="absolute bottom-[25%] left-[30%] h-40 w-20 border border-red-500/15 rotate-45" />
          <div aria-hidden="true" className="absolute top-[15%] right-[30%] h-16 w-16 rounded-full border border-red-500/30" />
          <div aria-hidden="true" className="absolute top-[60%] left-[20%] h-8 w-8 rounded-full border border-red-500/20" />
          <div aria-hidden="true" className="absolute top-[35%] right-[40%] h-20 w-20 border border-red-500/10 rotate-30" />
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
            <span className="font-display text-[20vw] text-red-500 tracking-wider">BREACH</span>
          </div>
        </div>
        <div className="navy-flood" />
      </div>

      {/* LAYER 2: MID CONTENT */}
      <div className="layer layer-mid">
        {/* Services Stack */}
        <div className="services-stack absolute inset-0 flex items-center justify-center">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.name}
                className={`service-layer-${i} absolute flex items-center gap-4 border border-gold-400/10 bg-midnight-800/80 backdrop-blur-sm px-8 py-5`}
                style={{
                  top: `${15 + i * 14}%`,
                  left: i % 2 === 0 ? '10%' : '55%',
                  width: '35%',
                  maxWidth: '400px',
                }}
              >
                <Icon size={28} strokeWidth={1.5} style={{ color: service.color }} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-sm tracking-[0.1em] text-horizon-100">{service.name}</h3>
                </div>
              </div>
            )
          })}
          <div className="phase-4-label absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm tracking-[0.15em] text-gold-400">LAYERED PROTECTION</p>
            <div className="mx-auto mt-2 h-px w-12 bg-gold-400/30" />
            <p className="mt-2 text-xs text-horizon-400">5 Integrated Security Systems</p>
          </div>
        </div>

        {/* India Map */}
        <div className="phase-5-group absolute inset-0 flex items-center justify-center">
          <div className="india-map relative" style={{ width: '60vw', maxWidth: '600px', height: '70vh', maxHeight: '500px' }}>
            <svg viewBox="0 0 200 250" className="h-full w-full opacity-15">
              <path
                d="M100,10 L130,20 L150,40 L160,60 L170,80 L165,100 L155,120 L160,140 L155,160 L140,180 L120,200 L100,210 L80,200 L60,180 L45,160 L40,140 L35,120 L30,100 L35,80 L45,60 L60,40 L75,25 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                className="text-gold-400/20"
              />
            </svg>
            {mapDots.map((dot, i) => (
              <div key={i} className="map-dot absolute" style={{ left: `${dot.x}%`, top: `${dot.y}%` }}>
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-gold-400" />
                  <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-gold-400 opacity-50" />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] text-horizon-300">
                    {dot.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="phase-5-text absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-horizon-50">PROTECTING 50+ CITIES</h2>
            <div className="mx-auto mt-3 h-px w-16 bg-gold-400/30" />
            <p className="phase-5-subtitle mt-3 text-sm tracking-[0.15em] text-gold-400">ACROSS INDIA</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 px-8 md:gap-10 lg:grid-cols-4 lg:gap-12">
            {STATS.map((stat, i) => (
              <div key={i} className={`stat-card-${i} text-center`}>
                <div className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-horizon-50">
                  <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="mx-auto mt-3 h-px w-6 bg-gold-400/40" />
                <p className="mt-2 text-xs tracking-[0.1em] text-horizon-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LAYER 3: FOREGROUND TEXT */}
      <div className="layer layer-fg pointer-events-none">
        {/* Phase 1: "UNPROTECTED." */}
        <div className="phase-1-text absolute inset-0 flex items-center justify-center">
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] text-horizon-50 tracking-wider">
            UNPROTECTED<span className="text-red-500">.</span>
          </h1>
        </div>

        {/* Phase 2: "THE THREAT IS REAL" + Stats */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="phase-2-text font-display text-[clamp(2rem,6vw,5rem)] text-red-500">
            THE THREAT IS REAL
          </h2>
          <div className="phase-2-stat mt-8 text-center">
            <p className="text-sm tracking-[0.1em] text-horizon-400">ANNUAL LOSSES IN INDIA</p>
            <p className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] text-gold-400">&#8377;47,000 Cr</p>
          </div>
          <div className="phase-2-stat mt-6 text-center">
            <p className="text-sm tracking-[0.1em] text-horizon-400">UNSECURED PREMISES</p>
            <p className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] text-red-400">73%</p>
          </div>
        </div>

        {/* Phase 3: "SILBAR SECURITY" */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="shield-logo relative mb-8 flex h-28 w-28 items-center justify-center border-2 border-red-500/50 bg-midnight-800/90 backdrop-blur-sm">
            <div className="absolute inset-0 border border-gold-400/20" style={{ transform: 'scale(1.12)' }} />
            <Image src="/logo.png" alt="Silbar Security Shield" fill className="object-contain p-2" sizes="112px" />
          </div>
          <h1 className="phase-3-text font-display text-[clamp(3rem,10vw,8rem)] text-horizon-50">SILBAR</h1>
          <h1 className="phase-3-text font-display text-[clamp(3rem,10vw,8rem)] text-horizon-50">SECURITY</h1>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <p className="phase-3-subtitle mt-6 text-sm tracking-[0.2em] text-gold-400">
            PROFESSIONAL SECURITY. ZERO COMPROMISE.
          </p>
        </div>

        {/* Phase 7: "CONTROL." + CTA */}
        <div className="final-bg absolute inset-0 flex flex-col items-center justify-center bg-midnight-950/0">
          {/* Background image for CTA phase */}
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/60 via-midnight-950/40 to-midnight-950/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,175,55,0.1)_0%,transparent_60%)]" />
          <h1 className="phase-7-text relative z-10 font-display text-[clamp(5rem,15vw,12rem)] gradient-text-hero leading-none">
            CONTROL<span className="text-gold-400">.</span>
          </h1>
          <div className="relative z-10 mt-6 h-px w-32 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
          <p className="phase-7-tagline relative z-10 mt-6 max-w-xl text-center text-lg text-horizon-200">
            Your Property. Our Watch.
          </p>
          <div className="cta-block relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="pointer-events-auto btn-gold-glow inline-flex h-14 items-center px-10 text-sm font-bold tracking-[0.05em]"
            >
              Get Security Assessment
            </a>
            <a
              href={SITE.phoneTel}
              className="pointer-events-auto inline-flex h-14 items-center px-10 border border-red-500/30 text-sm font-bold tracking-[0.05em] text-horizon-100 transition-all hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_30px_rgba(204,34,34,0.15)]"
            >
              Call: {SITE.phone}
            </a>
          </div>
          {/* Scroll indicator */}
          <div aria-hidden="true" className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] text-horizon-400">SCROLL</span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-gold-400/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* LAYER 4: OVERLAYS */}
      <div className="layer layer-overlay">
        <div className="red-overlay" />
        <div className="breach-flash absolute inset-0 bg-red-500/30 opacity-0" />
      </div>

      {/* SCROLL PROGRESS BAR */}
      <div className="scroll-progress fixed bottom-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-red-500 via-gold-400 to-red-500" />
    </section>
  )
}
