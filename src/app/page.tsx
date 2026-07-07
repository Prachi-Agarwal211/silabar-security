'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { initLenis } from '@/lib/lenis'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const ScrollExperience = dynamic(() => import('@/components/sections/ScrollExperience'), { ssr: false })

export default function Home() {
  useEffect(() => {
    initLenis()
  }, [])

  return (
    <main className="relative w-full grain-overlay">
      <Header />
      <ScrollExperience />
      <Footer />
    </main>
  )
}
