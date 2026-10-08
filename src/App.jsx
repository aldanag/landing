import Nav from "./components/Nav"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
import TrialBanner from "./components/TrialBanner"
import Features from "./components/Features"
import Testimonials from "./components/Testimonials"
import PricingCards from "./components/PricingCards"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <TrialBanner />
        <Features />
        <Testimonials />
        <PricingCards />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

export default App
