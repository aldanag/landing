import Nav from "./components/Nav"
import FAQ, { faqsDefault } from "./components/FAQ"
import TrialBanner from "./components/TrialBanner"
import Footer from "./components/Footer"
import BasicoHero from "./basico/BasicoHero"
import BasicoEjemplos from "./basico/BasicoEjemplos"
import BasicoPara from "./basico/BasicoPara"
import BasicoAsiSeVe from "./basico/BasicoAsiSeVe"
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

// Respuesta de la FAQ de la landing para la misma pregunta.
const comun = (q) => faqsDefault.find((f) => f.q === q).a

const faqs = [
  {
    q: "¿Tengo que dar la tarjeta para probar?",
    a: "No. El primer mes es gratis y no te pedimos tarjeta ni ningún otro tipo de pago. Solicitá una prueba sin compromiso.",
  },
  {
    q: "¿Necesito saber de programación?",
    a: comun("¿Necesito saber de programación?"),
  },
  {
    q: "¿Cómo armo mi tienda?",
    a: comun("¿Cómo armo mi tienda?"),
  },
  {
    q: "¿Cuántos productos o servicios puedo cargar?",
    a: "Los que quieras: el plan Básico no tiene límite de productos ni de servicios.",
  },
  {
    q: "¿Sirve si vendo servicios y no productos?",
    a: "Sí. Elegís una tienda de servicios: tus clientes reservan turno desde la tienda, vos definís los horarios disponibles y ves tus turnos en el calendario del panel.",
  },
  {
    q: "¿Lemora cobra comisión por cada venta?",
    a: comun("¿Lemora cobra comisión por cada venta?"),
  },
  {
    q: "¿Cómo recibo los pedidos?",
    a: comun("¿Cómo recibo los pedidos?"),
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: comun("¿Puedo cancelar cuando quiera?"),
  },
  {
    q: "¿Y si más adelante quiero el plan Premium?",
    a: "Podés hacerlo desde el panel de tu tienda, contactándonos, y actualizamos tu plan en el día.",
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
        <BasicoAsiSeVe />
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
