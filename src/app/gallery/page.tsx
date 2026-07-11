import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import SplitTextReveal from '@/components/animations/SplitTextReveal'
import { ogMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Gallery | Silbar Security',
  description: 'Visual gallery of Silbar Security operations, training facilities, team deployments, and events across India.',
  ...ogMetadata(
    'Gallery',
    'Visual gallery of Silbar Security operations, training facilities, team deployments, and events across India.',
    '/gallery'
  ),
}

const GALLERY_ITEMS = [
  { title: 'Guard Training Facility', category: 'Training', color: 'linear-gradient(135deg, #1a0a0d 0%, #3d0f1a 100%)' },
  { title: 'Factory Security Deployment', category: 'Operations', color: 'linear-gradient(135deg, #0a0a12 0%, #141420 100%)' },
  { title: 'CCTV Control Room', category: 'Technology', color: 'linear-gradient(135deg, #8C1F32 0%, #5C1220 100%)' },
  { title: 'Event Security Team', category: 'Events', color: 'linear-gradient(135deg, #14100D 0%, #291e15 100%)' },
  { title: 'VIP Protection Detail', category: 'VIP', color: 'linear-gradient(135deg, #1a0a0d 0%, #3d0f1a 100%)' },
  { title: 'Armed Guard Deployment', category: 'Operations', color: 'linear-gradient(135deg, #0a0a12 0%, #141420 100%)' },
  { title: 'Fire Safety Drill', category: 'Training', color: 'linear-gradient(135deg, #8C1F32 0%, #5C1220 100%)' },
  { title: 'Corporate Office Security', category: 'Operations', color: 'linear-gradient(135deg, #14100D 0%, #291e15 100%)' },
  { title: 'Annual Day Celebration', category: 'Events', color: 'linear-gradient(135deg, #1a0a0d 0%, #3d0f1a 100%)' },
  { title: 'Dog Squad Training', category: 'Training', color: 'linear-gradient(135deg, #0a0a12 0%, #141420 100%)' },
  { title: 'Warehouse Security', category: 'Operations', color: 'linear-gradient(135deg, #8C1F32 0%, #5C1220 100%)' },
  { title: 'ISO Certification Ceremony', category: 'Events', color: 'linear-gradient(135deg, #14100D 0%, #291e15 100%)' },
]

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        eyebrow="GALLERY"
        title={
          <>
            <SplitTextReveal text="SILBAR IN" />
            <br />
            <span className="page-hero-title--outline">
              <SplitTextReveal text="ACTION" delay={0.2} />
            </span>
          </>
        }
        subtitle="A visual showcase of our security operations, training, and team across India."
        size="compact"
        topContent={
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb__link">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__current">Gallery</span>
          </nav>
        }
      />

      <section className="service-detail-features service-detail-features--padded">
        <div className="service-detail-section-inner service-detail-section-inner--no-padding">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} style={{
                background: item.color,
                borderRadius: '8px',
                padding: '2rem',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.2rem 0.6rem',
                  background: 'rgba(191,149,63,0.2)',
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>{item.category}</span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--color-cream)',
                }}>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
