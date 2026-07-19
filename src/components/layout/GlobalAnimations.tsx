'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function GlobalAnimations({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  )
}