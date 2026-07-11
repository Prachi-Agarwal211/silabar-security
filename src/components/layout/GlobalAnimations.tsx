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

  // Basic Page Transition effect - scroll to top and reset Lenis
  useEffect(() => {
    window.scrollTo(0, 0)
    // Add page transition fade-in class to main content if we had one
    const main = document.getElementById('main-content')
    if (main) {
      main.style.animation = 'none'
      main.offsetHeight // trigger reflow
      main.style.animation = 'fadeIn 0.5s ease-out forwards'
    }
  }, [pathname])

  return <>{children}</>
}
