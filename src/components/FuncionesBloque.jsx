import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import {
  gsap,
  REDUCED_MOTION_OFF,
  REDUCED_MOTION_ON,
  useGSAP,
  useReveal,
} from "../lib/motion"

// Bloque de funciones: a un lado un marco cuadrado con una imagen, al otro una lista desplegable. Al
// elegir una función cambia la imagen. Lo usan "Funcionalidades" y "Funciones Premium".
//
// Props:
//  - id, fondo: id de la sección y su fondo (clase de Tailwind).
//  - etiqueta, icono: la etiqueta lima de arriba y, opcional, un ícono a su izquierda.
//  - titulo, intro: el título y, opcional, una bajada.
//  - funciones: [{ titulo, cuerpo, imagen?, etiquetaImagen? }]. Si una función no tiene `imagen`, el
//    marco muestra un lugar vacío con `etiquetaImagen` hasta que esté la imagen real.
//  - invertido: espeja el bloque (lista a la izquierda, imagen a la derecha) para alternar con el de arriba.
//  - cta: opcional, un botón o link que va centrado debajo.

// GSAP deja estilos puestos en las imágenes: se limpian antes y después de cada transición.
const ESTILOS_GSAP = "transform,opacity,zIndex,clipPath"

export default function FuncionesBloque({
  id,
  fondo = "bg-mist",
  etiqueta,
  icono,
  titulo,
  intro,
  funciones,
  invertido = false,
  cta,
}) {
  const root = useRef(null)
  const frame = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)

  useReveal(root)

  const select = (i) => {
    if (i === activeIndex) return
    setPrevIndex(activeIndex)
    setActiveIndex(i)
  }

  // La imagen nueva aparece despacio sobre la anterior (fundido suave, con un acercamiento casi
  // imperceptible). Al terminar (y antes de cada transición) se limpian los estilos que GSAP deja puestos
  // en las imágenes, para que ninguna quede corrida o a medio opacar la próxima vez que se elige.
  useGSAP(
    () => {
      if (prevIndex === null) return
      const mm = gsap.matchMedia()
      const preparar = () => {
        const layers = frame.current.querySelectorAll("[data-capa]")
        gsap.killTweensOf(layers)
        gsap.set(layers, { clearProps: ESTILOS_GSAP })
        return { layers, next: layers[activeIndex], prev: layers[prevIndex] }
      }
      const terminar = (layers) => () => {
        gsap.set(layers, { clearProps: ESTILOS_GSAP })
        setPrevIndex(null)
      }
      mm.add(REDUCED_MOTION_OFF, () => {
        const { layers, next, prev } = preparar()
        gsap.set(prev, { zIndex: 1 })
        gsap.set(next, { zIndex: 2, opacity: 0, scale: 1.03 })
        gsap.to(next, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out", onComplete: terminar(layers) })
      })
      // Con "reducir movimiento": fundido simple, sin acercamiento.
      mm.add(REDUCED_MOTION_ON, () => {
        const { layers, next, prev } = preparar()
        gsap.set(prev, { zIndex: 1 })
        gsap.set(next, { zIndex: 2, opacity: 0 })
        gsap.to(next, { opacity: 1, duration: 0.5, ease: "power1.out", onComplete: terminar(layers) })
      })
    },
    { scope: frame, dependencies: [activeIndex, prevIndex] },
  )

  return (
    <section id={id} ref={root} className={`${fondo} py-16`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <span
          data-reveal
          className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink"
        >
          {icono}
          {etiqueta}
        </span>
        <h2
          data-words
          className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
        >
          {titulo}
        </h2>
        {intro && (
          <p data-reveal className="mt-3 max-w-2xl text-base text-ink-soft">
            {intro}
          </p>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-stretch">
          <div
            ref={frame}
            data-reveal
            className={`relative aspect-square overflow-hidden rounded-3xl bg-lavender shadow-xl shadow-primary/15 ring-1 ring-primary/20 ${
              invertido ? "md:order-2" : ""
            }`}
          >
            {funciones.map((funcion, i) => {
              const visible = i === activeIndex || i === prevIndex ? "visible" : "invisible"
              return funcion.imagen ? (
                <img
                  key={funcion.titulo}
                  data-capa
                  src={funcion.imagen}
                  alt={funcion.titulo}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-contain ${visible}`}
                />
              ) : (
                <div
                  key={funcion.titulo}
                  data-capa
                  role="img"
                  aria-label={`Lugar para la imagen: ${funcion.etiquetaImagen ?? funcion.titulo}`}
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary-tint p-8 text-center text-primary ${visible}`}
                >
                  <FontAwesomeIcon icon={faImage} className="h-12 w-12" aria-hidden="true" />
                  <p className="text-sm font-bold uppercase tracking-[0.09em]">Imagen</p>
                  <p className="max-w-[16rem] text-[15px] leading-snug text-ink-soft">
                    {funcion.etiquetaImagen ?? funcion.titulo}
                  </p>
                </div>
              )
            })}
          </div>

          <div
            data-reveal
            className={`flex flex-col divide-y divide-ink/10 rounded-3xl bg-white px-6 py-1 ring-1 ring-ink/10 md:px-8 ${
              invertido ? "md:order-1" : ""
            }`}
          >
            {funciones.map((funcion, i) => {
              const isOpen = activeIndex === i
              return (
                <div key={funcion.titulo} className="md:flex md:flex-1 md:flex-col md:justify-center">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-detalle-${i}`}
                    className="group flex w-full items-center justify-between gap-4 py-3 text-left focus-ring"
                  >
                    <span
                      className={`text-base font-bold ${
                        isOpen ? "text-ink" : "text-ink-muted group-hover:text-ink"
                      }`}
                    >
                      {funcion.titulo}
                    </span>
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full transition ${
                        isOpen ? "bg-ink text-white" : "bg-primary-tint text-primary"
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                        <path
                          d={isOpen ? "M5 12h14" : "M12 5v14M5 12h14"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`${id}-detalle-${i}`}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-3 text-sm leading-relaxed text-ink-soft">{funcion.cuerpo}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {cta && (
          <div data-reveal className="mt-8 flex justify-center">
            {cta}
          </div>
        )}
      </div>
    </section>
  )
}
