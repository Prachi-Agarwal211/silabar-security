'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { initLenis, destroyLenis } from '@/lib/lenis'
import type Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = initLenis()
    setLenis(instance)
    return () => {
      destroyLenis()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
