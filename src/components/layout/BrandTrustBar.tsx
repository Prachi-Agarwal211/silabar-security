const ITEMS = [
  '4 ISO Certified · IAF Accredited',
  'PSARA Licensed · 19 States',
  '200+ Cities PAN India',
  'Est. 2018',
  'Pvt. Ltd. · Incorporated 2025',
  'Licensed & Insured',
  'Industrial · Corporate · Government',
  'WhatsApp-Ready Quotes',
  'Startup India · MSME Registered',
  'CAPSI Member',
]

/** Cinematic looping brand strip — unique vs generic logo marquee */
export default function BrandTrustBar() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="brand-trust-bar" aria-label="Silbar Security Services Pvt. Ltd. credentials">
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
