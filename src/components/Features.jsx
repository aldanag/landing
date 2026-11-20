import EscenaGaleria from "./escenas/EscenaGaleria"
import EscenaPedido from "./escenas/EscenaPedido"
import EscenaBanners from "./escenas/EscenaBanners"
import EscenaPreguntas from "./escenas/EscenaPreguntas"
import EscenaDescuentos from "./escenas/EscenaDescuentos"
import EscenaMayorista from "./escenas/EscenaMayorista"
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
    titulo: "Por mayor o menor",
    cuerpo:
      "Vendé por mayor o por menor. Definí una compra mínima por monto o por cantidad de productos.",
    escena: <EscenaMayorista />,
  },
  {
    titulo: "Banners que venden",
    cuerpo:
      "Destacá ofertas y promociones con banners diseñados para captar la atención de tus visitas.",
    escena: <EscenaBanners />,
  },
  {
    titulo: "En detalle, sin límites",
    cuerpo:
      "Página de preguntas frecuentes para responder todo sobre pedidos, pagos, envíos, devoluciones y soporte. Y reseñas de clientes, que dan confianza a quien todavía no te compró.",
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
