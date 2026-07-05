'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Counter from '@/components/animations/Counter'
import Marquee from '@/components/animations/Marquee'
import OrganicDivider from '@/components/animations/OrganicDivider'
import FloatingElements from '@/components/animations/FloatingElements'
import MagneticButton from '@/components/animations/MagneticButton'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import { SITE, STATS } from '@/lib/constants'
import services from '@/data/services.json'
import industries from '@/data/industries.json'
import {
  Shield, Siren, Cctv, KeyRound, Building2, CalendarDays,
  Swords, Radio, MapPin, Award, ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

const ScrollyHero = dynamic(() => import('@/components/sections/ScrollyHero'), { ssr: false })

const marqueeItems = [
  'Security Guards', 'Vehicle Patrol', 'CCTV Surveillance',
  'Access Control', 'Fire Safety', 'Event Security',
  'Facility Management', 'Executive Protection',
  'Night Patrol', 'Crowd Management',
]

const serviceIcons: Record<string, LucideIcon> = {
  shield: Shield, car: Siren, camera: Cctv, key: KeyRound,
  building: Building2, calendar: CalendarDays,
}

const serviceImages: Record<string, string> = {
  'security-guards': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
  'vehicle-patrol': 'https://images.unsplash.com/photo-1580752300992-559f8e0734e0?auto=format&fit=crop&w=800&q=80',
  'cctv-surveillance': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
  'access-control': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  'facility-management': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  'event-security': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
}

const industryImages: Record<string, string> = {
  corporate: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  industrial: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=600&q=80',
  residential: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  healthcare: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
  education: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
  retail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
  government: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?auto=format&fit=crop&w=600&q=80',
  events: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
}

const whyChooseUs = [
  { title: 'Veteran-Led', desc: 'Founded by ex-armed forces officers. 20+ years of combined field experience across India.', icon: Swords },
  { title: 'Tech-Enabled', desc: 'GPS tracking, body cameras, AI-powered CCTV — all live on your dashboard.', icon: Radio },
  { title: 'Pan-India', desc: '50+ cities covered. From Delhi to Chennai, deployment in 48 hours.', icon: MapPin },
  { title: 'ISO Certified', desc: 'ISO 9001:2015 certified. Every guard background-verified and PSARA-compliant.', icon: Award },
  { title: '24/7 Command', desc: 'Centralized operations center monitoring all sites in real-time.', icon: Building2 },
  { title: 'Zero Tolerance', desc: 'No shortcuts. Every guard trained, insured, and accountable.', icon: ShieldCheck },
]

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <FloatingElements />
      <ScrollyHero />

      {/* ===== MARQUEE — Infinite services ticker ===== */}
      <div className="relative overflow-hidden border-y border-white/5 bg-midnight-950 py-5">
        <Marquee items={marqueeItems} speed={25} />
      </div>

      {/* ===== SERVICES — Asymmetric 2-col: text left, cards right ===== */}
      <section className="mesh-services relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            {/* Left: sticky label */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ScrollReveal>
                <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-purple-400 uppercase">Our Services</p>
                <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-horizon-50">
                  Six Services.<br />
                  <span className="gradient-text-gold">Zero Gaps.</span>
                </h2>
                <div className="mt-4 h-[2px] w-16 bg-purple-500" />
              </ScrollReveal>
            </div>

            {/* Right: bento grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service, i) => {
                const Icon = serviceIcons[service.icon] || Shield
                const img = serviceImages[service.slug]
                // Make first card span 2 cols (bento)
                const span2 = i === 0
                return (
                  <ScrollReveal key={service.slug} delay={i * 0.06} className={span2 ? 'sm:col-span-2' : ''}>
                    <div className="service-card group">
                      {img && (
                        <div className={`relative overflow-hidden ${span2 ? 'h-52' : 'h-36'}`}>
                          <Image
                            src={img}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-[#09090F]/50 to-transparent" />
                          <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center border border-purple-500/30 bg-midnight-900/80 backdrop-blur-sm">
                            <Icon size={16} strokeWidth={1.5} className="text-purple-400" aria-hidden="true" />
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="mb-1.5 font-display text-sm font-semibold text-horizon-100 group-hover:text-purple-400 transition-colors duration-500">
                          {service.title}
                        </h3>
                        <p className="mb-3 text-xs leading-relaxed text-horizon-400 group-hover:text-horizon-300 transition-colors duration-500">
                          {service.description}
                        </p>
                        <ul className="space-y-1">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-[11px] text-horizon-400 group-hover:text-horizon-300">
                              <span aria-hidden="true" className="h-px w-2.5 bg-purple-500/50" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <OrganicDivider variant="wave" color="#0D0D14" />

      {/* ===== STATS — Solid gold block ===== */}
      <section className="mesh-stats relative overflow-hidden py-20 md:py-24">
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4 lg:gap-16">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none font-bold text-midnight-950">
                    <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p className="mt-2 text-xs font-semibold tracking-[0.1em] text-midnight-800 uppercase">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <OrganicDivider variant="diagonal" color="#0A0A10" />

      {/* ===== INDUSTRIES — Asymmetric grid ===== */}
      <section className="mesh-industries relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <div className="mb-10 max-w-lg">
              <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-cyan-400 uppercase">Industries</p>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.95] text-horizon-50">
                From IT Parks<br />to Hospitals
              </h2>
              <div className="mt-3 h-[2px] w-12 bg-cyan-400" />
            </div>
          </ScrollReveal>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {industries.map((industry, i) => {
              const img = industryImages[industry.slug]
              const tall = i === 0 || i === 3 || i === 5
              return (
                <ScrollReveal key={industry.slug} delay={i * 0.05} className={tall ? 'row-span-2' : ''}>
                  <div className="industry-card group relative h-full min-h-[140px] md:min-h-[180px]">
                    {img && (
                      <>
                        <Image
                          src={img}
                          alt={industry.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A10] via-[#0A0A10]/80 to-transparent" />
                      </>
                    )}
                    <div className="relative z-10 flex h-full flex-col justify-end p-4">
                      <h3 className="mb-1 font-display text-sm font-semibold text-horizon-100 group-hover:text-purple-400 transition-colors duration-500">
                        {industry.title}
                      </h3>
                      <p className="text-[11px] leading-relaxed text-horizon-400 group-hover:text-horizon-300 transition-colors duration-500">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <OrganicDivider variant="jagged" color="#08080E" />

      {/* ===== WHY CHOOSE US — Left border accent ===== */}
      <section className="mesh-whyus relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="dot-grid absolute inset-0 opacity-20 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            {/* Left: sticky label */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ScrollReveal>
                <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-red-400 uppercase">Why Silbar</p>
                <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[0.95] text-horizon-50">
                  Why 500+ Facilities<br />
                  <span className="gradient-text-gold">Trust Silbar</span>
                </h2>
                <div className="mt-3 h-[2px] w-12 bg-gradient-to-r from-red-500 to-purple-500" />
              </ScrollReveal>
            </div>

            {/* Right: cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {whyChooseUs.map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="whyus-card group p-5">
                      <div className="flex gap-3">
                        <div aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center bg-purple-600/10 border border-purple-500/20 transition-all duration-500 group-hover:bg-purple-600/20 group-hover:border-purple-500/40">
                          <Icon size={16} strokeWidth={1.5} className="text-purple-400" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-display text-sm font-semibold text-horizon-100 group-hover:text-purple-400 transition-colors duration-500">{item.title}</h3>
                          <p className="text-[11px] leading-relaxed text-horizon-400">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA — Editorial center ===== */}
      <section className="mesh-cta relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <div className="flex flex-col items-start text-left max-w-2xl">
              <div className="block-purple px-3 py-1 text-xs font-bold tracking-[0.15em] uppercase mb-6">
                Get Started
              </div>
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-horizon-50 mb-4">
                Free Security<br />
                <span className="gradient-text-gold">Assessment</span>
              </h2>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-horizon-300">
                Our team analyzes your security needs and delivers a customized plan within 24 hours. No obligation.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <MagneticButton href="/contact" strength={0.2}>
                  <span className="btn-gold-glow inline-flex h-12 items-center justify-center px-8 text-sm font-bold tracking-[0.02em]">
                    Get Assessment
                  </span>
                </MagneticButton>
                <MagneticButton href={SITE.phoneTel} strength={0.2}>
                  <span className="btn-purple inline-flex h-12 items-center justify-center px-8 text-sm font-bold tracking-[0.02em]">
                    Call: {SITE.phone}
                  </span>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== BOTTOM MARQUEE — Bookend ticker ===== */}
      <div className="relative overflow-hidden border-y border-white/5 bg-midnight-950 py-5">
        <Marquee items={marqueeItems} speed={20} direction="right" />
      </div>
    </>
  )
}
