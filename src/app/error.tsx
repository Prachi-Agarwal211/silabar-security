'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{
      background: 'var(--color-midnight)',
      color: 'var(--color-paper)',
      fontFamily: 'var(--font-display)'
    }}>
      <h2 className="mb-4" style={{ color: 'var(--color-gold)' }}>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        style={{
          background: 'var(--color-cherry)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
        }}
      >
        Try again
      </button>
    </div>
  )
}
