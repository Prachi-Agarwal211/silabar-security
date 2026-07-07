'use client'

interface MarqueeProps {
  items: string[]
  speed?: number
  className?: string
  accent?: boolean
}

export default function Marquee({
  items,
  speed = 30,
  className = '',
  accent = false,
}: MarqueeProps) {
  const duplicated = [...items, ...items]

  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee__track"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className={`marquee__item ${accent ? 'marquee__item--accent' : ''}`}
          >
            <span className="marquee__dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
