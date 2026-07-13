'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { initLenis, destroyLenis } from '@/lib/lenis'

let lenisInitialized = false

export default function GlobalAnimations({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initLenis()
      lenisInitialized = true
      initialized.current = true
    }
    return () => {
      if (lenisInitialized) {
        destroyLenis()
        lenisInitialized = false
      }
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}