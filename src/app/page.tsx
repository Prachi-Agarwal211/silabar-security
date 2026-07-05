'use client'

import dynamic from 'next/dynamic'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Counter from '@/components/animations/Counter'
import MagneticButton from '@/components/animations/MagneticButton'
import TextGlow from '@/components/animations/TextGlow'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import { SITE, STATS } from '@/lib/constants'
import services from '@/data/services.json'
import industries from '@/data/industries.json'

const ScrollyHero = dynamic(() => import('@/components/sections/ScrollyHero'), {
  ssr: false,
})

const serviceIcons: Record<string, string> = {
  shield: '🛡️',
  car: '🚔',
  camera: '📹',
  key: '🔐',
  building: '🏢',
  calendar: '📅',
}

export default function Home() {
  return (
    <>
      {/* ===== SCHEMA ===== */}
      <LocalBusinessSchema />

      {/* ===== SCROLLYTELLING HERO ===== */}
      <ScrollyHero />

      {/* ===== SERVICES SECTION ===== */}
      <section className="gradient-naval relative py-[clamp(5rem,12vh,10rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,175,55,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(204,34,34,0.03)_0%,transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-red-400">WHAT WE DO</p>
            <TextGlow as="h2" color="gold" className="font-display text-[clamp(2rem,5vw,4rem)] text-horizon-50">
              Comprehensive Security Solutions
            </TextGlow>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold-400 to-transparent" />
          </ScrollReveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 0.1}>
                <div className="service-card group p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-gold-400/20 bg-gradient-to-br from-naval-800 to-midnight-900 transition-all duration-300 group-hover:border-red-500/30 group-hover:shadow-[0_0_20px_rgba(204,34,34,0.1)]">
                    <span aria-hidden="true" className="text-2xl transition-transform duration-300 group-hover:scale-110">{serviceIcons[service.icon] || '🛡️'}</span>
                  </div>
                  <h3 className="mb-3 font-display text-lg text-horizon-100 group-hover:text-gold-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-horizon-400 group-hover:text-horizon-300 transition-colors duration-300">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-horizon-400 group-hover:text-horizon-300">
                        <span aria-hidden="true" className="h-px w-3 bg-gradient-to-r from-gold-400/60 to-red-500/40" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="gradient-gold-glow relative py-24">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-horizon-50">
                    <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="mx-auto mt-4 h-px w-8 bg-gradient-to-r from-gold-400/40 to-red-500/30" />
                  <p className="mt-3 text-xs tracking-[0.3em] text-gold-400">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES SECTION ===== */}
      <section className="gradient-mesh relative py-[clamp(5rem,12vh,10rem)]">
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-red-400">INDUSTRIES WE SERVE</p>
            <TextGlow as="h2" color="gold" className="font-display text-[clamp(2rem,5vw,4rem)] text-horizon-50">
              Trusted Across Sectors
            </TextGlow>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold-400 to-transparent" />
          </ScrollReveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, i) => (
              <ScrollReveal key={industry.slug} delay={i * 0.08}>
                <div className="industry-card group p-6">
                  <h3 className="mb-2 font-display text-sm text-horizon-100 group-hover:text-gold-400 transition-colors duration-300">
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

      {/* ===== WHY CHOOSE US ===== */}
      <section className="gradient-red-glow relative py-[clamp(5rem,12vh,10rem)]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-red-400">WHY SILBAR</p>
            <TextGlow as="h2" color="gold" className="font-display text-[clamp(2rem,5vw,4rem)] text-horizon-50">
              The Shield You Can Trust
            </TextGlow>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-red-500 to-gold-400" />
          </ScrollReveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Veteran-Led', desc: 'Led by former armed forces officers with decades of security experience.', icon: '⚔️' },
              { title: 'Tech-Enabled', desc: 'GPS tracking, body cameras, AI surveillance — real-time visibility.', icon: '📡' },
              { title: 'Pan-India', desc: 'Operations across 50+ cities with rapid deployment capability.', icon: '🇮🇳' },
              { title: 'ISO Certified', desc: 'ISO 9001:2015 certified processes with zero-compromise quality.', icon: '🏅' },
              { title: '24/7 Command', desc: 'Centralized command center with real-time incident response.', icon: '🏢' },
              { title: 'Zero Tolerance', desc: 'Background-verified, trained, and insured security personnel.', icon: '🛡️' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center border border-red-500/20 bg-midnight-800/60 text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-sm text-horizon-100">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-horizon-400">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative overflow-hidden py-[clamp(5rem,12vh,10rem)]">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.08)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(204,34,34,0.05)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(1.5rem,5vw,6rem)]">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center">
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-red-400">READY TO SECURE YOUR PREMISES?</p>
              <TextGlow as="h2" color="gold" className="font-display text-[clamp(2rem,5vw,4rem)] text-horizon-50">
                Get Your Free Security Assessment
              </TextGlow>
              <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold-400 to-red-500" />
              <p className="mt-6 max-w-xl text-horizon-400">
                Our experts will analyze your security needs and provide a customized solution. No obligation, no pressure.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton>
                  <a
                    href="/contact"
                    className="btn-gold-glow inline-flex h-14 items-center px-10 text-sm font-bold"
                  >
                    Get Security Assessment
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={SITE.phoneTel}
                    className="btn-red-glow inline-flex h-14 items-center px-10 text-sm font-bold"
                  >
                    Call: {SITE.phone}
                  </a>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
