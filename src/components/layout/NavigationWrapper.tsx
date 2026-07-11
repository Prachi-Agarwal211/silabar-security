import Header from './Header'
import Footer from './Footer'
import GlobalAnimations from './GlobalAnimations'

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GlobalAnimations>
      <Header />
      {children}
      <Footer />
    </GlobalAnimations>
  )
}
