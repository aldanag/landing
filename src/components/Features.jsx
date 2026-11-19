import redesImg from "../assets/features/redes.webp"
import galeriaImg from "../assets/features/galeria.webp"
import carritoImg from "../assets/features/carrito.webp"
import pedidosImg from "../assets/features/pedidos.webp"
import bannersImg from "../assets/features/banners.webp"
import preguntasImg from "../assets/features/preguntas.webp"
import descuentosImg from "../assets/features/descuentos.webp"
import FuncionesBloque from "./FuncionesBloque"

// Capturas reales del producto (no stock). Copiadas del sitio actual.
const features = [
  {
    titulo: "Conectá tus redes",
    cuerpo:
      "Tus redes siempre presentes e integradas en la cabecera de tu tienda, y un botón de WhatsApp para contacto directo.",
    imagen: redesImg,
  },
  {
    titulo: "Galería de imágenes",
    cuerpo:
      "Mostrá tus productos en detalle, sin límite. Pantalla completa, zoom y navegación entre fotos.",
    imagen: galeriaImg,
  },
  {
    titulo: "Carrito de compras",
    cuerpo: "Carrito integrado: el sistema suma cantidades y calcula el total automáticamente.",
    imagen: carritoImg,
  },
  {
    titulo: "Automatizá descuentos",
    cuerpo:
      "Creá cupones de descuento y descuentos automáticos por cantidad, por precio o por compra mínima.",
    imagen: descuentosImg,
  },
  {
    titulo: "Pedido directo",
    cuerpo:
      "Recibís todos los datos del cliente directo en WhatsApp, sin intermediarios ni esperas. Acá vos tomás el control.",
    imagen: pedidosImg,
  },
  {
    titulo: "Banners que venden",
    cuerpo:
      "Destacá ofertas y promociones con banners diseñados para captar la atención de tus visitas.",
    imagen: bannersImg,
  },
  {
    titulo: "En detalle, sin límites",
    cuerpo:
      "Página de preguntas frecuentes para responder todo sobre pedidos, pagos, envíos, devoluciones y soporte en tu tienda.",
    imagen: preguntasImg,
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
    />
  )
}
