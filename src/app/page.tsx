'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { initLenis } from '@/lib/lenis'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ponytail: dynamic import for ScrollyHero — SSR false because of GSAP ScrollTrigger
const ScrollyHero = dynamic(() => import('@/components/sections/ScrollyHero'), {
  ssr: false,
})

// ponytail: dynamic import for TrustSection — needs GSAP on client
const TrustSection = dynamic(() => import('@/components/sections/TrustSection'), {
  ssr: false,
})

export default function Home() {
  useEffect(() => {
    initLenis()
  }, [])

  return (
    <main className="relative w-full grain-overlay">
      <Header />
      <ScrollyHero />
      <TrustSection />
      <Footer />
    </main>
  )
}
