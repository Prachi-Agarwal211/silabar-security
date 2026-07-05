interface OrganicDividerProps {
  variant?: 'wave' | 'blob' | 'jagged' | 'diagonal'
  color?: string
  className?: string
  flip?: boolean
}

export default function OrganicDivider({
  variant = 'wave',
  color = 'var(--midnight-950)',
  className = '',
  flip = false,
}: OrganicDividerProps) {
  const transform = flip ? 'rotate(180deg)' : 'none'

  switch (variant) {
    case 'blob':
      return (
        <div className={`relative w-full overflow-hidden ${className}`} style={{ transform }}>
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="block h-16 w-full md:h-24"
          >
            <path
              d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1350,80 1440,60 L1440,120 L0,120 Z"
              fill={color}
            />
            <path
              d="M0,80 C240,40 480,100 720,80 C960,60 1200,100 1440,80 L1440,120 L0,120 Z"
              fill={color}
              opacity="0.5"
            />
          </svg>
        </div>
      )

    case 'jagged':
      return (
        <div className={`relative w-full overflow-hidden ${className}`} style={{ transform }}>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="block h-10 w-full md:h-16"
          >
            <path
              d="M0,40 L60,20 L120,50 L180,15 L240,45 L300,10 L360,40 L420,20 L480,55 L540,25 L600,50 L660,15 L720,45 L780,10 L840,40 L900,20 L960,50 L1020,15 L1080,45 L1140,10 L1200,40 L1260,20 L1320,50 L1380,15 L1440,40 L1440,80 L0,80 Z"
              fill={color}
            />
          </svg>
        </div>
      )

    case 'diagonal':
      return (
        <div className={`relative w-full overflow-hidden ${className}`} style={{ transform }}>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="block h-10 w-full md:h-16"
          >
            <path
              d="M0,0 L1440,80 L0,80 Z"
              fill={color}
            />
          </svg>
        </div>
      )

    case 'wave':
    default:
      return (
        <div className={`relative w-full overflow-hidden ${className}`} style={{ transform }}>
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="block h-12 w-full md:h-20"
          >
            <path
              d="M0,40 C320,100 420,0 720,50 C1020,100 1120,20 1440,60 L1440,100 L0,100 Z"
              fill={color}
            />
          </svg>
        </div>
      )
  }
}
