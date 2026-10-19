import Nav from "./components/Nav"
import FAQ from "./components/FAQ"
import TrialBanner from "./components/TrialBanner"
import Footer from "./components/Footer"
import BasicoHero from "./basico/BasicoHero"
import BasicoEjemplos from "./basico/BasicoEjemplos"
import BasicoPara from "./basico/BasicoPara"
import BasicoIncluye from "./basico/BasicoIncluye"
import BasicoPasos from "./basico/BasicoPasos"
import BasicoPrecio from "./basico/BasicoPrecio"
import BasicoComparar from "./basico/BasicoComparar"

const links = [
  { label: "Ejemplos", href: "#ejemplos" },
  { label: "Qué incluye", href: "#incluye" },
  { label: "Precio", href: "#precio" },
  { label: "Preguntas", href: "#faq" },
]

const explorar = [
  { label: "Ejemplos", href: "#ejemplos" },
  { label: "Qué incluye", href: "#incluye" },
  { label: "Precio", href: "#precio" },
  { label: "Cómo empezar", href: "#como-empezar" },
  { label: "Preguntas frecuentes", href: "#faq" },
  { label: "Todos los planes", href: "/#planes" },
]

const faqs = [
  {
    q: "¿Tengo que dar la tarjeta para probar?",
    a: "No. El primer mes es gratis y no te pedimos la tarjeta.",
  },
  {
    q: "¿Necesito saber de programación?",
    a: "No. Configurás todo desde un dashboard simple: sin código y sin depender de nadie.",
  },
  {
    q: "¿Cómo armo mi tienda?",
    a: "Desde el dashboard: subís tu logo, elegís si tu tienda es de productos o de servicios y cargás lo que vendés. Si ofrecés servicios, definís tus horarios disponibles.",
  },
  {
    q: "¿Cuántos productos o servicios puedo cargar?",
    a: "Los que quieras: el plan Básico no tiene límite de productos ni de servicios.",
  },
  {
    q: "¿Sirve si vendo servicios y no productos?",
    a: "Sí. Elegís una tienda de servicios: tus clientes reservan turno desde la tienda, vos definís los horarios disponibles y ves tus turnos en el calendario del dashboard.",
  },
  {
    q: "¿Lemora cobra comisión por cada venta?",
    a: "No. Vos te quedás con el 100% de cada venta.",
  },
  {
    q: "¿Cómo recibo los pedidos?",
    a: "Directo a tu WhatsApp, con todos los datos del cliente.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. El plan Básico no tiene permanencia, cancelás cuando quieras.",
  },
  {
    q: "¿Y si más adelante quiero el plan Premium?",
    a: "Escribinos por WhatsApp y lo vemos juntos.",
  },
]

export default function BasicoApp() {
  return (
    <>
      <Nav links={links} logoHref="/" />
      <main>
        <BasicoHero />
        <BasicoEjemplos />
        <BasicoPara />
        <BasicoIncluye />
        <BasicoPrecio />
        <BasicoPasos />
        <BasicoComparar />
        <TrialBanner />
        <FAQ faqs={faqs} />
      </main>
      <Footer explorar={explorar} />
    </>
  )
}
