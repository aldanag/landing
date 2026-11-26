// Datos compartidos de los planes (precios, funciones y links). Los usan la landing y /basico.

export const WHATSAPP_TRIAL_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20probar%20Lemora%20gratis"

// Landing del plan Básico (el sitio que se publica aparte). TODO: cambiar por el dominio definitivo cuando exista.
export const BASICO_LANDING_LINK = "https://lemora-basico-six.vercel.app"

// Landing del plan Premium (el sitio de `web-premium`, que se publica aparte). TODO: cambiar por el dominio definitivo cuando exista.
// La usan el botón "Ver más sobre Premium" de la sección Premium y el link de la tarjeta del plan.
export const PREMIUM_LANDING_LINK = "https://lemora-premium.vercel.app"

export const BASICO_CHECKOUT_LINK =
  "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=d37372dd19924098bcfeb189bbb8fbcf"

// Los planes anuales todavía no tienen link de suscripción propio en MercadoPago:
// por ahora el botón abre un WhatsApp con el plan elegido.
// TODO: reemplazar por los links reales de suscripción anual.
export const anualLink = (plan) =>
  `https://wa.me/543515957014?text=${encodeURIComponent(`Hola, quiero contratar el plan ${plan} anual de Lemora`)}`

export const peso = (n) => `$${Math.round(n).toLocaleString("es-AR")}`

// Tiendas de ejemplo de cada plan (el chip "Ver ejemplo" de la tarjeta). Premium: la tienda de muestra de Lemora (Boutique).
export const EJEMPLO_BASICO_LINK = "https://tommytommy.lemora.lat/"
export const EJEMPLO_PREMIUM_LINK = "https://premium.lemora.lat/"

// Lo usa la página /basico/ (todavía con tiendas de relleno).
// TODO: reemplazar por la URL real de una tienda de ejemplo.
export const EJEMPLO_WEB_LINK = "#"

// Las funciones que se comparan entre planes van en el mismo orden en las dos listas
// (carrusel, banners y barra promocional); las exclusivas de Premium llevan isNew
// (resaltadas).
// actions[0] es el botón principal (lima); actions[1], si existe, el secundario.
export const plans = [
  {
    name: "Básico",
    badge: "1 mes gratis",
    mensual: 12490,
    anual: 124788,
    commitment: "Contratación mínima: 1 mes",
    ejemplo: EJEMPLO_BASICO_LINK,
    verMas: "Ver todo lo que incluye el plan Básico",
    verMasHref: BASICO_LANDING_LINK,
    verMasExterno: true,
    features: [
      "Cargá productos o servicios ilimitados",
      "Gestión de pedidos",
      "Estadísticas: ingresos, pedidos por estado, más vendidos y ventas por categoría",
      "Pagos en efectivo y por transferencia",
      "Carrusel de hasta 6 slides",
      "8 banners promocionales",
      "Página de contacto con formulario y mapa",
      "Agregar a favoritos",
      "Preguntas frecuentes",
      "Reseñas de clientes",
      "Cupones y descuentos automáticos",
      "Incluye Lemora Ads en barra promocional",
    ],
    actions: [
      {
        label: "Probar gratis 1 mes",
        href: WHATSAPP_TRIAL_LINK,
        external: true,
        note: "No te pedimos la tarjeta",
      },
      {
        label: "Suscribirme",
        href: BASICO_CHECKOUT_LINK,
        external: true,
      },
    ],
  },
  {
    name: "Premium",
    crown: true,
    mensual: 18990,
    anual: 189588,
    commitment: "Contratación mínima: 3 meses",
    ejemplo: EJEMPLO_PREMIUM_LINK,
    intro: "Todo lo del plan Básico y además:",
    features: [
      { text: "Menú y página propia para cada categoría, con filtrador", isNew: true },
      { text: "Panel de clientes con pedidos confirmados, exportables", isNew: true },
      { text: "Inventario con edición rápida de stock", isNew: true },
      { text: "Gastos de gestión y envío gratis, por cantidad o por monto", isNew: true },
      { text: "Vendé mayorista o minorista, con compra mínima por monto o por cantidad", isNew: true },
      { text: "Mercado Pago y cuotas, además de efectivo y transferencia", isNew: true },
      { text: "Marketing: notificación de confianza, ofertas por tiempo limitado y promociones", isNew: true },
      { text: "Ventana emergente al salir, para quien deja su pedido sin terminar", isNew: true },
      { text: "Barra promocional con tus mensajes y tu color, sin Lemora Ads", isNew: true },
    ],
    verMas: "Ver todo lo que incluye el plan Premium",
    verMasHref: PREMIUM_LANDING_LINK,
    verMasExterno: true,
    // TODO: reemplazar por el link real de suscripción de MercadoPago del plan Premium.
    actions: [{ label: "Suscribirme", href: "#registro", external: false }],
    featured: true,
  },
]
