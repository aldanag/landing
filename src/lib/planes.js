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

// TODO: reemplazar por la URL real de una tienda de ejemplo.
export const EJEMPLO_WEB_LINK = "#"

// Las funciones que se repiten entre planes van en el mismo orden para que las
// filas queden alineadas; las exclusivas de Premium llevan isNew (resaltadas).
// actions[0] es el botón principal (lima); actions[1], si existe, el secundario.
export const plans = [
  {
    name: "Básico",
    badge: "1 mes gratis",
    mensual: 9000,
    anual: 96000,
    commitment: "Contratación mínima: 1 mes",
    features: [
      "Web básica",
      "Productos y servicios ilimitados",
      "Reserva de turnos para servicios",
      "Carrusel de hasta 4 imágenes",
      "Sección de contacto",
      "4 banners promocionales",
      "Agregar a favoritos",
      "Preguntas frecuentes",
      "Lemora Ads en el marquee",
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
    features: [
      { text: "Web premium", strong: "premium" },
      "Productos y servicios ilimitados",
      "Reserva de turnos para servicios",
      { text: "Carrusel de hasta 6 imágenes", strong: "6 imágenes" },
      { text: "Contacto con Google Maps", strong: "Google Maps" },
      { text: "Gestión de ventas", isNew: true },
      { text: "Nuevo menú por categorías", isNew: true },
      { text: "Banner en carrito o contacto", isNew: true },
      { text: "Google Search Console", isNew: true },
      { text: "Reseñas de clientes", isNew: true },
      { text: "Cupones de descuento", isNew: true },
      { text: "Descuentos automáticos por compras", isNew: true },
      { text: "Ventana emergente al salir", isNew: true },
    ],
    // TODO: reemplazar por el link real de suscripción de MercadoPago del plan Premium.
    actions: [{ label: "Suscribirme", href: "#registro", external: false }],
    featured: true,
  },
]
