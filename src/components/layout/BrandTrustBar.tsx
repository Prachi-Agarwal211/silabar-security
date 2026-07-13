const ITEMS = [
  'ISO 9001:2015 Certified',
  '7,000+ Professionals',
  '200+ Cities',
  'Est. 2005 · Jaipur',
  'PAN India Deployment',
  'Licensed & Insured',
  'Industrial · Corporate · Residential',
  'WhatsApp-Ready Quotes',
  'MSME Registered',
  'Process-Driven Security',
]

/** Cinematic looping brand strip — unique vs generic logo marquee */
export default function BrandTrustBar() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="brand-trust-bar" aria-label="Silbar Security credentials">
      <div className="brand-trust-track">
        {loop.map((label, i) => (
          <span key={`${label}-${i}`} className="brand-trust-item">
            <span className="brand-trust-item__dot" aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
