'use client'

import dynamic from 'next/dynamic'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Counter from '@/components/animations/Counter'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import { SITE, STATS } from '@/lib/constants'
import services from '@/data/services.json'
import industries from '@/data/industries.json'
import {
  Shield,
  Siren,
  Cctv,
  KeyRound,
  Building2,
  CalendarDays,
  Swords,
  Radio,
  MapPin,
  Award,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

const ScrollyHero = dynamic(() => import('@/components/sections/ScrollyHero'), {
  ssr: false,
})

const serviceIcons: Record<string, LucideIcon> = {
  shield: Shield,
  car: Siren,
  camera: Cctv,
  key: KeyRound,
  building: Building2,
  calendar: CalendarDays,
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

      {/* ===== SERVICES SECTION — Bento Grid ===== */}
      <section className="relative bg-midnight-900 py-[clamp(5rem,12vh,10rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_20%_50%,rgba(3,31,48,0.4),transparent)] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-400">Our Services</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-horizon-50">
              Six Services. Zero Gaps.
            </h2>
            <div className="mt-3 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
          </ScrollReveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon] || Shield
              return (
                <ScrollReveal key={service.slug} delay={i * 0.08}>
                  <div className="service-card group p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center border border-gold-400/15 bg-midnight-800 transition-all duration-300 group-hover:border-gold-400/30">
                      <Icon size={20} strokeWidth={1.5} className="text-gold-400" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 font-display text-base text-horizon-100 group-hover:text-gold-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-horizon-400 group-hover:text-horizon-300 transition-colors duration-300">
                      {service.description}
                    </p>
                    <ul className="space-y-1.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-horizon-400 group-hover:text-horizon-300">
                          <span aria-hidden="true" className="h-px w-3 bg-gold-400/40" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== STATS BAR — Horizontal Strip ===== */}
      <section className="relative bg-midnight-800 py-20 md:py-24">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <div className="grid grid-cols-2 gap-6 md:gap-10 lg:grid-cols-4 lg:gap-12">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-horizon-50">
                    <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="mx-auto mt-3 h-px w-8 bg-gold-400/30" />
                  <p className="mt-2 text-xs tracking-[0.1em] text-horizon-400">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES SECTION ===== */}
      <section className="relative bg-midnight-950 py-[clamp(5rem,12vh,10rem)]">
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-400">Industries</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-horizon-50">
              From IT Parks to Hospitals
            </h2>
            <div className="mt-3 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
          </ScrollReveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, i) => (
              <ScrollReveal key={industry.slug} delay={i * 0.06}>
                <div className="industry-card group p-5">
                  <h3 className="mb-1.5 font-display text-sm text-horizon-100 group-hover:text-gold-400 transition-colors duration-300">
                    {industry.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-horizon-400 group-hover:text-horizon-300 transition-colors duration-300">
                    {industry.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US — Editorial Layout ===== */}
      <section className="relative bg-midnight-900 py-[clamp(5rem,12vh,10rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_500px_300px_at_80%_20%,rgba(204,34,34,0.05),transparent)] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-400">Why Silbar</p>
            <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] text-horizon-50">
              Why 500+ Facilities Trust Silbar
            </h2>
            <div className="mt-3 h-px w-16 bg-gradient-to-r from-red-500 to-gold-400" />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="flex gap-4 p-4">
                    <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold-400/15 bg-midnight-800/60">
                      <Icon size={18} strokeWidth={1.5} className="text-gold-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-display text-sm text-horizon-100">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-horizon-400">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.06)_0%,transparent_55%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-400">Get Started</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-horizon-50">
                Free Security Assessment
              </h2>
              <div className="mt-3 h-px w-16 bg-gradient-to-r from-gold-400 to-red-500" />
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-horizon-400">
                Our team analyzes your security needs and delivers a customized plan within 24 hours. No obligation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="btn-gold-glow inline-flex h-12 items-center justify-center px-8 text-sm font-bold tracking-[0.05em]"
                >
                  Get Assessment
                </a>
                <a
                  href={SITE.phoneTel}
                  className="inline-flex h-12 items-center justify-center border border-red-500/30 px-8 text-sm font-bold tracking-[0.05em] text-horizon-100 transition-all duration-300 hover:border-red-500 hover:text-red-400"
                >
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
