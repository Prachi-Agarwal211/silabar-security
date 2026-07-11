'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initLenis, destroyLenis } from '@/lib/lenis'

export default function GlobalAnimations({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Initialize Lenis globally
  useEffect(() => {
    initLenis()
    return () => {
      destroyLenis()
    }
  }, [])

  // Basic Page Transition effect - scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}
