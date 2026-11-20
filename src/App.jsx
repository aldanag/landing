import Nav from "./components/Nav"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
import ProblemaSolucion from "./components/ProblemaSolucion"
import TrialBanner from "./components/TrialBanner"
import Features from "./components/Features"
import ProductosServicios from "./components/ProductosServicios"
import FuncionesPremium from "./components/FuncionesPremium"
import Tiendas from "./components/Tiendas"
import Testimonials from "./components/Testimonials"
import PricingCards from "./components/PricingCards"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <a
        href="#contenido"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white focus:translate-y-0 focus-ring"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <HowItWorks />
        <ProblemaSolucion />
        <TrialBanner />
        <Features />
        <ProductosServicios />
        <Tiendas />
        <FuncionesPremium />
        <Testimonials />
        <PricingCards />
        <FAQ layout="columnas" />
      </main>
      <Footer fondo="bg-night-2" />
    </>
  )
}

export default App
