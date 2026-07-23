import Header from './Header'
import Footer from './Footer'
import GlobalAnimations from './GlobalAnimations'
import StickyCta from './StickyCta'
import BrandTrustBar from './BrandTrustBar'
import GlobalGbpSection from './GlobalGbpSection'

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GlobalAnimations>
      <Header />
      {children}
      {/* All 5 Silbar Google Business Profiles — every page */}
      <GlobalGbpSection />
      <BrandTrustBar />
      <Footer />
      <StickyCta />
    </GlobalAnimations>
  )
}
