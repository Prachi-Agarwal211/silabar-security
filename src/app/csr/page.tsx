import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Users, GraduationCap, Shield } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { ogMetadata } from '@/lib/metadata'
import PageLeadSection from '@/components/sections/PageLeadSection'

export const metadata: Metadata = {
  title: 'Corporate Social Responsibility',
  description: 'Silbar Security Services Pvt. Ltd.\'s CSR initiatives — community safety programs, security training for youth, and women empowerment through employment.',
  ...ogMetadata(
    'Corporate Social Responsibility',
    'Silbar Security Services Pvt. Ltd.\'s CSR initiatives — community safety programs, security training for youth, and women empowerment through employment.',
    '/csr'
  ),
}

const CSR_INITIATIVES = [
  {
    icon: Shield,
    title: 'Community Safety Programs',
    description: 'Free security awareness workshops for residential societies, schools, and colleges across 50+ cities. Teaching basic safety, emergency response, and fire prevention.',
    impact: '10,000+ people trained',
  },
  {
    icon: GraduationCap,
    title: 'Youth Security Training',
    description: 'Skill development program for underprivileged youth — training in security operations, fire safety, and first aid. Placing trained graduates in security roles.',
    impact: '2,000+ youth placed',
  },
  {
    icon: Heart,
    title: 'Women Empowerment',
    description: 'Dedicated recruitment and training program for women in security. Lady guards deployed across hospitals, schools, and corporate offices.',
    impact: '500+ women employed',
  },
  {
    icon: Users,
    title: 'Disaster Response Support',
    description: 'Volunteering security teams for disaster response — flood relief in Bihar, earthquake response in Gujarat, cyclone relief in Odisha.',
    impact: '20+ disaster responses',
  },
]

export default function CSRPage() {
  return (
    <main>
      <PageHero
        eyebrow="CSR"
        title={
          <>
            <SplitTextReveal text="GIVING BACK" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="TO COMMUNITY" delay={0.2} />
            </span>
          </>
        }
        subtitle="Silbar Security is committed to community safety, youth empowerment, and social responsibility."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">CSR</span>
          </nav>
        }
      />

      <section className="service-detail-features service-detail-features--padded">
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          <div className="bento-grid">
            {CSR_INITIATIVES.map((initiative, i) => {
  const Icon = initiative.icon
  return (
    <div key={i} className="bento-cell glass-panel csr-card">
      <Icon size={28} color="var(--color-gold)" className="csr-card__icon" />
      <h3 className="csr-card__title">{initiative.title}</h3>
      <p className="csr-card__desc">{initiative.description}</p>
      <span className="csr-card__impact">{initiative.impact}</span>
    </div>
  )
            })}
          </div>
        </div>
      </section>
    
      <PageLeadSection
        title="Partner with a Responsible Security Company"
        subtitle="Get in touch for security services or CSR collaboration."
      />

</main>
  )
}
