import Header from './Header'
import Footer from './Footer'

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
