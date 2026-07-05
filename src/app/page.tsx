'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Counter from '@/components/animations/Counter'
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
      <ScrollyHero />

      {/* ===== SERVICES ===== */}
      <section className="mesh-services relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-400">Our Services</p>
            <h2 className="gradient-text-gold font-display text-[clamp(2rem,4vw,3.5rem)]">
              Six Services. Zero Gaps.
            </h2>
            <div className="mt-3 h-px w-20 bg-gradient-to-r from-gold-400 via-gold-500 to-transparent" />
          </ScrollReveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon] || Shield
              const img = serviceImages[service.slug]
              return (
                <ScrollReveal key={service.slug} delay={i * 0.08}>
                  <div className="service-card group">
                    {img && (
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={img}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center border border-gold-400/20 bg-midnight-900/80 backdrop-blur-sm">
                          <Icon size={18} strokeWidth={1.5} className="text-gold-400" aria-hidden="true" />
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="mb-2 font-display text-base text-horizon-100 group-hover:text-gold-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-horizon-400 group-hover:text-horizon-300 transition-colors duration-300">
                        {service.description}
                      </p>
                      <ul className="space-y-1.5">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-xs text-horizon-400 group-hover:text-horizon-300">
                            <span aria-hidden="true" className="h-px w-3 bg-gradient-to-r from-gold-400/60 to-gold-500/20" />
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
      </section>

      {/* ===== STATS ===== */}
      <section className="mesh-stats relative overflow-hidden py-24 md:py-28">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="section-divider absolute bottom-0 left-0 right-0" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4 lg:gap-16">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-none gradient-text-hero">
                    <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="mx-auto mt-4 h-px w-10 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
                  <p className="mt-3 text-xs tracking-[0.12em] text-horizon-300">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="mesh-industries relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-400">Industries</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-horizon-50">
              From IT Parks to Hospitals
            </h2>
            <div className="mt-3 h-px w-20 bg-gradient-to-r from-gold-400 via-gold-500 to-transparent" />
          </ScrollReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, i) => {
              const img = industryImages[industry.slug]
              return (
                <ScrollReveal key={industry.slug} delay={i * 0.06}>
                  <div className="industry-card group">
                    {img && (
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={img}
                          alt={industry.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/50 to-transparent" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="mb-1.5 font-display text-sm text-horizon-100 group-hover:text-gold-400 transition-colors duration-300">
                        {industry.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-horizon-400 group-hover:text-horizon-300 transition-colors duration-300">
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

      {/* ===== WHY CHOOSE US ===== */}
      <section className="mesh-whyus relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-400">Why Silbar</p>
            <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] text-horizon-50">
              Why 500+ Facilities Trust Silbar
            </h2>
            <div className="mt-3 h-px w-20 bg-gradient-to-r from-red-500 via-gold-400 to-transparent" />
          </ScrollReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="whyus-card group flex gap-4 p-5">
                    <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold-400/15 bg-gradient-to-br from-gold-400/10 to-transparent transition-all duration-300 group-hover:border-gold-400/30 group-hover:from-gold-400/15">
                      <Icon size={18} strokeWidth={1.5} className="text-gold-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-display text-sm text-horizon-100 group-hover:text-gold-400 transition-colors">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-horizon-400">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mesh-cta relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-400">Get Started</p>
              <h2 className="gradient-text-gold font-display text-[clamp(2rem,4vw,3.5rem)]">
                Free Security Assessment
              </h2>
              <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-horizon-300">
                Our team analyzes your security needs and delivers a customized plan within 24 hours. No obligation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/contact" className="btn-gold-glow inline-flex h-13 items-center justify-center px-9 text-sm font-bold tracking-[0.05em]">
                  Get Assessment
                </a>
                <a href={SITE.phoneTel} className="inline-flex h-13 items-center justify-center border border-red-500/30 px-9 text-sm font-bold tracking-[0.05em] text-horizon-100 transition-all duration-300 hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_30px_rgba(204,34,34,0.15)]">
                  Call: {SITE.phone}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
