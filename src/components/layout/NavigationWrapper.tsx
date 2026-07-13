import Header from './Header'
import Footer from './Footer'
import GlobalAnimations from './GlobalAnimations'
import StickyCta from './StickyCta'
import BrandTrustBar from './BrandTrustBar'

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GlobalAnimations>
      <Header />
      {children}
      <BrandTrustBar />
      <Footer />
      <StickyCta />
    </GlobalAnimations>
  )
}
