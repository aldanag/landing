import { useEffect, useRef, useState } from "react"
import testimonioCarolina from "../assets/testimonio-carolina.webp"
import testimonioAldana from "../assets/testimonio-aldana.jpg"
import { useReveal } from "../lib/motion"
import { WHATSAPP_TRIAL_LINK } from "../lib/planes"
import Button from "./Button"
import IconButton from "./IconButton"

// Testimonios reales solamente: no completar con datos, nombres ni métricas inventadas.
// Mientras falta uno, el último lugar es una invitación a ser el próximo; cuando haya otro testimonio
// real, se suma a la lista de arriba y se saca esa tarjeta.
const testimonios = [
  {
    quote:
      "En 24 hs, desde que me puse en contacto ¡ya tenía mi web en línea! les pasé toda la información y al otro día ya estaba operativa.",
    name: "Carolina Villegas",
    role: "Rescatista animal",
    photo: testimonioCarolina,
  },
  {
    quote:
      "Lemora es muchísimo más ágil que otras plataformas. Se personaliza fácil, el tablero es re amigable, la tienda queda linda y no cobra comisión por venta.",
    name: "Aldana Gonzalez",
    role: "Moura Deco",
    photo: testimonioAldana,
  },
]

const Flecha = ({ giro = 0 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
    style={{ transform: `rotate(${giro}deg)` }}
  >
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Comillas = () => (
  <span className="font-heading text-4xl leading-none text-primary" aria-hidden="true">
    &ldquo;
  </span>
)

// Fondo azul oscuro con tarjetas claras. El título va a la izquierda con dos flechas redondas; a la derecha una fila de
// tarjetas que se desliza (con las flechas, con el dedo o con el teclado) y deja asomar la siguiente, opaca.
export default function Testimonials() {
  const root = useRef(null)
  const pista = useRef(null)
  const [tope, setTope] = useState({ inicio: true, fin: false })
  const [vistas, setVistas] = useState({}) // índice -> la tarjeta está entera a la vista
  useReveal(root)

  useEffect(() => {
    const el = pista.current
    if (!el) return undefined
    const actualizar = () =>
      setTope({
        inicio: el.scrollLeft <= 4,
        fin: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      })
    actualizar()
    el.addEventListener("scroll", actualizar, { passive: true })
    window.addEventListener("resize", actualizar)

    // Las tarjetas que asoman por el borde se ven opacas.
    let io
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entradas) =>
          setVistas((prev) => {
            const sig = { ...prev }
            entradas.forEach((e) => {
              sig[e.target.dataset.i] = e.intersectionRatio >= 0.85
            })
            return sig
          }),
        { root: el, threshold: [0, 0.5, 0.85, 1] },
      )
      el.querySelectorAll("[data-tarjeta]").forEach((c) => io.observe(c))
    }
    return () => {
      el.removeEventListener("scroll", actualizar)
      window.removeEventListener("resize", actualizar)
      io?.disconnect()
    }
  }, [])

  const mover = (dir) => {
    const el = pista.current
    const tarjeta = el.querySelector("[data-tarjeta]")
    const paso = tarjeta.getBoundingClientRect().width + 20
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: dir * paso, behavior: quieto ? "auto" : "smooth" })
  }

  const tarjeta =
    "flex w-[82%] flex-none snap-start flex-col justify-between gap-8 rounded-3xl p-6 transition-opacity duration-500 sm:w-[22rem] motion-reduce:transition-none"

  return (
    <section ref={root} className="overflow-hidden bg-ink py-16 md:py-[4.5rem] text-white [container-type:inline-size]">
      {/* Alineado a la izquierda con el resto de la página, pero la fila de tarjetas sigue hasta el borde de la pantalla. */}
      <div className="grid gap-8 pl-4 md:pl-6 lg:grid-cols-[22rem_1fr] lg:items-center lg:gap-12 lg:pl-[max(1.5rem,calc((100cqw-72rem)/2+1.5rem))]">
        <div className="pr-4 md:pr-6 lg:pr-0">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink"
          >
            Testimonios
          </span>
          <h2
            data-words
            className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
          >
            Lo que dicen quienes ya venden con Lemora.
          </h2>
          <div data-reveal className="mt-6 flex gap-3 lg:mt-8">
            <IconButton label="Testimonio anterior" onClick={() => mover(-1)} disabled={tope.inicio}>
              <Flecha />
            </IconButton>
            <IconButton label="Testimonio siguiente" onClick={() => mover(1)} disabled={tope.fin}>
              <Flecha giro={180} />
            </IconButton>
          </div>
        </div>

        <div
          ref={pista}
          data-reveal
          role="group"
          aria-roledescription="carrusel"
          aria-label="Testimonios"
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [scrollbar-width:none] focus-ring-inverse [&::-webkit-scrollbar]:hidden"
        >
          {testimonios.map((t, i) => (
            <figure
              key={t.name}
              data-tarjeta
              data-i={i}
              className={`${tarjeta} bg-white text-ink ${vistas[i] === false ? "opacity-60" : ""}`}
            >
              <blockquote>
                <Comillas />
                <p className="mt-2 text-lg font-medium leading-snug">{t.quote}</p>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <img src={t.photo} alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-[12.5px] text-ink-soft">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}

          <div
            data-tarjeta
            data-i={testimonios.length}
            className={`${tarjeta} bg-lilac text-ink ${vistas[testimonios.length] === false ? "opacity-60" : ""}`}
          >
            <div>
              <Comillas />
              <p className="mt-2 text-lg font-medium leading-snug">El próximo testimonio puede ser el tuyo.</p>
              <p className="mt-2 text-[15px] text-ink-soft">
                Probá Lemora gratis durante 1 mes. No te pedimos la tarjeta.
              </p>
            </div>
            <Button href={WHATSAPP_TRIAL_LINK} external variant="primary" block>
              Probar gratis 1 mes
            </Button>
          </div>

          {/* Espacio final: deja que cada tarjeta, también la última, se corra hasta quedar entera contra el borde izquierdo. */}
          <div aria-hidden="true" className="w-[calc(18%-1.25rem)] flex-none sm:w-[calc(100%-22rem-1.25rem)]" />
        </div>
      </div>
    </section>
  )
}
