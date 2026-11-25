import EscenaGaleria from "./escenas/EscenaGaleria"
import EscenaPedido from "./escenas/EscenaPedido"
import EscenaSlider from "./escenas/EscenaSlider"
import EscenaPreguntas from "./escenas/EscenaPreguntas"
import EscenaDescuentos from "./escenas/EscenaDescuentos"
import EscenaEstadisticas from "./escenas/EscenaEstadisticas"
import Button from "./Button"
import FuncionesBloque from "./FuncionesBloque"

// Capturas reales del producto (no stock). Copiadas del sitio actual.
const features = [
  {
    titulo: "Galería y favoritos",
    cuerpo:
      "Mostrá tus productos en detalle, sin límite: pantalla completa, zoom y navegación entre fotos. Y con un toque en el corazón, tus clientes guardan sus favoritos.",
    escena: <EscenaGaleria />,
  },
  {
    titulo: "Carrito y pedido directo",
    cuerpo:
      "Tus clientes arman el carrito y el sistema suma las cantidades y calcula el total. El pedido te llega completo, con todos los datos del cliente, directo a tu WhatsApp: sin intermediarios ni esperas.",
    escena: <EscenaPedido />,
  },
  {
    titulo: "Automatizá descuentos",
    cuerpo:
      "Creá cupones de descuento y descuentos automáticos por cantidad, por precio o por compra mínima.",
    escena: <EscenaDescuentos />,
  },
  {
    titulo: "Slides y banners para tu tienda",
    cuerpo:
      "Sumá un carrusel de hasta 6 slides y hasta 8 banners promocionales para destacar tus ofertas y novedades apenas entran.",
    escena: <EscenaSlider />,
  },
  {
    titulo: "Accedé a tus estadísticas",
    cuerpo:
      "Mirá cómo viene tu tienda desde el panel: tus ingresos de los últimos 30 días, tus pedidos por estado, tus productos más vendidos y tus ventas por categoría.",
    escena: <EscenaEstadisticas />,
  },
  {
    titulo: "Preguntas frecuentes y reseñas",
    cuerpo:
      "Respondé una sola vez las dudas sobre pedidos, pagos, envíos y devoluciones. Y sumá reseñas de clientes, que dan confianza a quien todavía no te compró.",
    escena: <EscenaPreguntas />,
  },
]

export default function Features() {
  return (
    <FuncionesBloque
      id="funciones"
      fondo="bg-white"
      etiqueta="Funcionalidades"
      titulo="Todo lo que necesitás, integrado en nuestras webs."
      funciones={features}
      cta={<Button href="#planes" size="lg">Ver planes</Button>}
    />
  )
}
