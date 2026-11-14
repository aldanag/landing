// Datos compartidos de los planes (precios, funciones y links). Los usan la landing y /basico.

export const WHATSAPP_TRIAL_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20probar%20Lemora%20gratis"

export const BASICO_CHECKOUT_LINK =
  "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=d37372dd19924098bcfeb189bbb8fbcf"

// Los planes anuales todavía no tienen link de suscripción propio en MercadoPago:
// por ahora el botón abre un WhatsApp con el plan elegido.
// TODO: reemplazar por los links reales de suscripción anual.
export const anualLink = (plan) =>
  `https://wa.me/543515957014?text=${encodeURIComponent(`Hola, quiero contratar el plan ${plan} anual de Lemora`)}`

export const peso = (n) => `$${Math.round(n).toLocaleString("es-AR")}`

// Tienda de ejemplo del plan Básico. Premium todavía no tiene una: sin `ejemplo`, la tarjeta no muestra el chip.
export const EJEMPLO_BASICO_LINK = "https://tommytommy.lemora.lat/"

// Las funciones que se comparan entre planes van en el mismo orden en las dos listas
// (carrusel, banners y barra promocional); las exclusivas de Premium llevan isNew
// (resaltadas).
// actions[0] es el botón principal (lima); actions[1], si existe, el secundario.
export const plans = [
  {
    name: "Básico",
    badge: "1 mes gratis",
    mensual: 9000,
    anual: 96000,
    commitment: "Contratación mínima: 1 mes",
    ejemplo: EJEMPLO_BASICO_LINK,
    verMas: "Mirá lo que suma Premium",
    features: [
      "Cargá productos o servicios ilimitados",
      "Gestión de pedidos",
      "Carrusel de hasta 8 imágenes",
      "3 banners promocionales",
      "Página de contacto con formulario y mapa",
      "Agregar a favoritos",
      "Preguntas frecuentes",
      "Reseñas de clientes",
      "Cupones y descuentos automáticos",
      "Ventana emergente al salir",
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
    mensual: 15000,
    anual: 160000,
    commitment: "Contratación mínima: 3 meses",
    intro: "Todo lo del plan Básico y además:",
    features: [
      { text: "Carrusel de hasta 12 imágenes", strong: "12 imágenes" },
      { text: "5 banners promocionales", strong: "5" },
      { text: "Inventario por categorías, con edición rápida de stock", isNew: true },
      { text: "Panel de clientes, con exportación para email marketing", isNew: true },
      { text: "Menú por categorías en tu tienda", isNew: true },
      { text: "Página propia para cada categoría, con imagen", isNew: true },
      { text: "Barra promocional con tus mensajes y tu color, sin Lemora Ads", isNew: true },
    ],
    verMas: "Ver todas las funciones Premium",
    // TODO: reemplazar por el link real de suscripción de MercadoPago del plan Premium.
    actions: [{ label: "Suscribirme", href: "#registro", external: false }],
    featured: true,
  },
]
