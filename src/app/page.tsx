'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { initLenis } from '@/lib/lenis'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const ScrollyHero = dynamic(() => import('@/components/sections/ScrollyHero'), { ssr: false })
const TrustSection = dynamic(() => import('@/components/sections/TrustSection'), { ssr: false })

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null!)

  useEffect(() => {
    initLenis()
  }, [])

  return (
    <main className="relative w-full grain-overlay">
      <Header />
      <ScrollyHero videoRef={videoRef} />
      <TrustSection videoRef={videoRef} />
      <Footer />
    </main>
  )
}
