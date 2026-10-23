import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import Tick from "../components/Tick"
import { WHATSAPP_TRIAL_LINK } from "../lib/planes"

// Imágenes de cada bloque: guardá los archivos en src/assets/basico/ con el nombre
// bloque-1 a bloque-9 (.webp, .png o .jpg, capturas de cualquier proporción, de 1000 px de ancho
// o más). La página las toma solas y respeta la proporción de cada una; mientras no estén, se ve
// un recuadro de ejemplo.
const fotos = import.meta.glob("../assets/basico/bloque-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`bloque-${n}.`))?.[1]

// Un bloque por funcionalidad. Las que van juntas se unifican en un solo bloque; `incluye` lista
// los nombres de las funciones del plan que cubre (los mismos que en la tarjeta de precios).
const bloques = [
  {
    n: 1,
    etiqueta: "Tu tienda",
    title: "Configurá tu tienda desde el panel.",
    body: "Subí tu logo, elegí tus colores y mirá al instante cómo queda tu tienda. Sin código y sin depender de nadie. Todo explicado paso a paso, simple.",
    incluye: [],
    sugerencia: "El panel con el logo cargándose, y cómo se ve la tienda",
    alt: "Panel de Lemora donde se agrega el logo, junto a cómo se ve la tienda",
  },
  {
    n: 2,
    etiqueta: "Tus productos y servicios",
    title: "Creá todos los productos y servicios que quieras.",
    body: "Cargás cada producto o servicio desde el panel, con sus fotos, su precio, stock y características, y aparece en tu tienda. Sin tope y sin ningún costo adicional.",
    incluye: ["Cargá productos o servicios ilimitados"],
    sugerencia: "El panel creando un producto o un servicio, y cómo se ve en la tienda",
    alt: "Panel de Lemora donde se crea un producto o un servicio, junto a cómo se ve en la tienda",
  },
  {
    n: 3,
    etiqueta: "Tus turnos",
    title: "Tus clientes reservan turno en los horarios que vos elegís.",
    body: "Si tu tienda es de servicios, tus clientes reservan su turno desde la tienda. Gestioná todos tus turnos en tu calendario, desde el panel.",
    incluye: [
      "Reserva de turnos para servicios",
      "Horarios disponibles a tu elección",
      "Calendario de turnos en tu panel",
    ],
    sugerencia: "El calendario del panel con los turnos, y la reserva en la tienda",
    alt: "Calendario del panel de Lemora con los turnos reservados, junto a la pantalla donde un cliente reserva su turno",
  },
  {
    n: 4,
    etiqueta: "Que te vean",
    title: "Destacá tus ofertas y novedades apenas entran.",
    body: "Un carrusel y banners en tu tienda, para que lo que querés vender y promocionar sea lo primero que se vea.",
    incluye: ["Carrusel de hasta 8 imágenes", "3 banners promocionales"],
    sugerencia: "El carrusel con un banner de oferta arriba de los productos",
    alt: "Carrusel y banner promocional arriba de una grilla de productos",
  },
  {
    n: 5,
    etiqueta: "Que te compren",
    title: "Tus clientes arman el pedido y vos lo recibís en WhatsApp.",
    body: "Un carrito integrado suma las cantidades y calcula el total. El pedido te llega con todos los datos del cliente, sin intermediarios y sin comisiones por venta.",
    incluye: ["Carrito de compras", "Pedido directo a tu WhatsApp", "Gestión de pedidos"],
    sugerencia: "El carrito, o el pedido llegando por WhatsApp",
    alt: "Pedido nuevo en WhatsApp con los datos del cliente, los productos y el total",
  },
  {
    n: 6,
    etiqueta: "Que vuelvan",
    title: "Tus clientes guardan lo que les gusta.",
    body: "Con un toque, cada cliente marca sus productos favoritos para encontrarlos de nuevo cuando esté listo para comprar.",
    incluye: ["Agregar a favoritos"],
    sugerencia: "Los productos con el corazón de favoritos",
    alt: "Productos de una tienda con el botón de favoritos",
  },
  {
    n: 7,
    etiqueta: "Que te escriban",
    title: "Tus datos y tu WhatsApp, siempre a la vista.",
    body: "Una página de contacto con formulario y mapa de ubicación, además de un botón de WhatsApp presente en toda la tienda para contacto directo.",
    incluye: ["Página de contacto con formulario y mapa"],
    sugerencia: "La página de contacto con formulario, mapa, redes y botón de WhatsApp",
    alt: "Página de contacto de una tienda con formulario, mapa, redes sociales y botón de WhatsApp",
  },
  {
    n: 8,
    etiqueta: "Menos preguntas",
    title: "Respondé las dudas una sola vez.",
    body: "Una página de preguntas frecuentes para que tus clientes encuentren todo sobre pedidos, pagos, envíos y devoluciones sin escribirte.",
    incluye: ["Preguntas frecuentes"],
    sugerencia: "La página de preguntas frecuentes en un celular",
    alt: "Página de preguntas frecuentes de una tienda, en un celular",
  },
  {
    n: 9,
    etiqueta: "Lo que tiene el Básico",
    title: "Una franja de Lemora corre en tu tienda.",
    body: "El plan Básico incluye un anuncio de Lemora. Podés quitarlo con el plan Premium e incluso personalizarlo con tu propio contenido para tu tienda.",
    incluye: ["Lemora Ads en la barra promocional"],
    sugerencia: "La barra promocional con el aviso de Lemora",
    alt: "Franja con el aviso de Lemora corriendo arriba de una tienda",
  },
]

function Bloque({ bloque, invertido }) {
  const foto = fotoDe(bloque.n)
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <div data-reveal className={invertido ? "md:order-2" : ""}>
        <span className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:text-[12px]">
          {bloque.etiqueta}
        </span>
        <h3 className="mt-3 text-balance text-[clamp(22px,6.4vw,26px)] font-bold leading-[1.1] text-ink md:text-[30px]">
          {bloque.title}
        </h3>
        <p className="mt-3 text-base text-ink-soft">{bloque.body}</p>
        {bloque.incluye.length > 0 && (
          <ul className="mt-5 space-y-2">
            {bloque.incluye.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
                <Tick />
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div data-reveal className={invertido ? "md:order-1" : ""}>
        <div className="group mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-ink/10 ring-1 ring-ink/10">
          {foto ? (
            <img
              src={foto}
              alt={bloque.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div
              role="img"
              aria-label={`Lugar para la captura ${bloque.n}: ${bloque.sugerencia}`}
              className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-primary-tint p-8 text-center text-primary"
            >
              <FontAwesomeIcon icon={faImage} className="h-12 w-12" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-[0.09em]">Captura {bloque.n}</p>
              <p className="max-w-[16rem] text-[15px] leading-snug text-ink-soft">
                {bloque.sugerencia}
              </p>
              <p className="text-xs font-semibold text-ink-muted">
                Cualquier proporción · 1000 px de ancho o más
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Llamado a la acción entre bloques. `tono` cambia el fondo para no repetir el mismo panel.
function Cta({ titulo, texto, tono = "lilac" }) {
  const fondo = tono === "lilac" ? "bg-lilac" : "bg-white ring-1 ring-ink/10"
  return (
    <div
      data-reveal
      className={`flex flex-col items-center gap-5 rounded-[2rem] px-6 py-8 text-center md:flex-row md:justify-between md:px-10 md:text-left ${fondo}`}
    >
      <div>
        <p className="text-[clamp(20px,5.6vw,24px)] font-bold leading-tight text-ink">{titulo}</p>
        <p className="mt-1 text-base text-ink">{texto}</p>
      </div>
      <Button
        href={WHATSAPP_TRIAL_LINK}
        external
        size="lg"
        className="w-full max-w-xs flex-none sm:w-56"
      >
        Probar gratis 1 mes
      </Button>
    </div>
  )
}

export default function BasicoIncluye() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="incluye" ref={root} className="bg-mist py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            Qué incluye
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            Todo lo que necesitás para empezar a vender.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-ink-soft">
            Cada parte del plan, explicada. Sin costos extra por producto y sin comisiones por
            venta.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-14 md:gap-20">
          {bloques.map((b, i) => (
            <div key={b.n} className="contents">
              <Bloque bloque={b} invertido={i % 2 === 1} />
              {i === 2 && (
                <Cta
                  titulo="Probá todo esto gratis durante 1 mes."
                  texto="No te pedimos tarjeta y no tenés compromiso de adquirir nuestros planes."
                />
              )}
              {i === 6 && (
                <Cta
                  titulo="¿Te convence? Empezá hoy."
                  texto="Escribinos por WhatsApp y empezá tu mes de prueba."
                  tono="gris"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
