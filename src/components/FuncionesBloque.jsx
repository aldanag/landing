import { cloneElement, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { ETIQUETA_ICONO } from "../lib/pastillas"
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
//  - funciones: [{ titulo, cuerpo, imagen?, escena?, etiquetaImagen?, superposicion? }]. `escena` es un componente vivo
//    (con prop `activa`) que reemplaza a la imagen. `superposicion` es un nodo que
//    va encima de la imagen (por ejemplo la barra con mensajes en movimiento). Con `superposicionFija: true` la
//    superposición es parte de la imagen (la imagen no la trae dibujada): entra y sale junto con ella, sin esperar
//    a que termine el cambio. Si una función no tiene `imagen`, el
//    marco muestra un lugar vacío con `etiquetaImagen` hasta que esté la imagen real.
//  - oscuro: para fondos oscuros (título e intro en blanco).
//  - invertido: espeja el bloque (lista a la izquierda, imagen a la derecha) para alternar con el de arriba.
//  - cta: opcional, un botón o link que va centrado debajo.

// En pantallas anchas la imagen va al costado y cambia con la función elegida. En celular no: la imagen quedaría arriba de la
// lista, fuera de la vista al tocar una función. Ahí cada función, al abrirse, muestra su propia imagen debajo de su texto.
function useEscritorio() {
  const consulta = "(min-width: 768px)"
  const [escritorio, setEscritorio] = useState(() => (typeof window === "undefined" ? true : window.matchMedia(consulta).matches))
  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const cambio = (e) => setEscritorio(e.matches)
    mq.addEventListener("change", cambio)
    return () => mq.removeEventListener("change", cambio)
  }, [])
  return escritorio
}

// Una capa del marco: la escena viva, la imagen o el lugar vacío de esa función.
function Capa({ funcion, visible, activa, inmediata = false }) {
  if (funcion.escena) {
    return (
      <div data-capa role="img" aria-label={funcion.titulo} className={`absolute inset-0 ${visible}`}>
        {cloneElement(funcion.escena, { activa })}
      </div>
    )
  }
  return funcion.imagen ? (
    <img
      data-capa
      src={funcion.imagen}
      alt={funcion.titulo}
      loading={inmediata ? "eager" : "lazy"}
      decoding="async"
      className={`absolute inset-0 h-full w-full object-contain ${visible}`}
    />
  ) : (
    <div
      data-capa
      role="img"
      aria-label={`Lugar para la imagen: ${funcion.etiquetaImagen ?? funcion.titulo}`}
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary-tint p-8 text-center text-primary ${visible}`}
    >
      <FontAwesomeIcon icon={faImage} className="h-12 w-12" aria-hidden="true" />
      <p className="text-sm font-bold uppercase tracking-[0.09em]">Imagen</p>
      <p className="max-w-[16rem] text-[15px] leading-snug text-ink-soft">{funcion.etiquetaImagen ?? funcion.titulo}</p>
    </div>
  )
}

// La superposición de una función (por ejemplo la barra con mensajes), encima de su imagen.
function Sobre({ funcion, visible, activa }) {
  if (!funcion.superposicion) return null
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 transition-opacity motion-reduce:transition-none ${
        funcion.superposicionFija ? "duration-[900ms]" : "duration-500"
      } ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {cloneElement(funcion.superposicion, { activa })}
    </div>
  )
}

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
  oscuro = false,
  cta,
}) {
  const root = useRef(null)
  const frame = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const escritorio = useEscritorio()
  const botones = useRef([])

  useReveal(root)

  // En celular la imagen de cada función aparece al abrirla: se precargan todas para que no se vea el hueco mientras llegan.
  useEffect(() => {
    if (escritorio) return
    funciones.forEach((f) => {
      if (f.imagen) new Image().src = f.imagen
    })
  }, [escritorio, funciones])

  const select = (i) => {
    if (i === activeIndex) return
    setPrevIndex(activeIndex)
    setActiveIndex(i)
    // En celular se cierra la función anterior (arriba) y la lista se corre: se lleva la elegida a la vista.
    if (!escritorio) {
      window.setTimeout(() => botones.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" }), 330)
    }
  }

  // La imagen nueva aparece despacio sobre la anterior (fundido suave, con un acercamiento casi
  // imperceptible). Al terminar (y antes de cada transición) se limpian los estilos que GSAP deja puestos
  // en las imágenes, para que ninguna quede corrida o a medio opacar la próxima vez que se elige.
  useGSAP(
    () => {
      if (prevIndex === null) return
      if (!frame.current) {
        setPrevIndex(null)
        return
      }
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
    <section id={id} ref={root} className={`${fondo} py-16 md:py-[4.5rem]`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <span
          data-reveal
          className={ETIQUETA_ICONO}
        >
          {icono}
          {etiqueta}
        </span>
        <h2
          data-words
          className={`mt-4 text-[clamp(25px,8.2vw,32px)] font-bold md:text-[34px] ${oscuro ? "text-white" : "text-ink"}`}
        >
          {titulo}
        </h2>
        {intro && (
          <p data-reveal className={`mt-3 max-w-2xl text-base ${oscuro ? "text-white/70" : "text-ink-soft"}`}>
            {intro}
          </p>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-stretch">
          {escritorio && (
            <div
              ref={frame}
              data-reveal
              className={`@container relative aspect-square w-full overflow-hidden rounded-[2rem] bg-lavender shadow-xl shadow-primary/15 ring-1 ring-primary/20 md:self-start ${
                invertido ? "md:order-2" : ""
              }`}
            >
              {funciones.map((funcion, i) => (
                <Capa
                  key={funcion.titulo}
                  funcion={funcion}
                  visible={i === activeIndex || i === prevIndex ? "visible" : "invisible"}
                  activa={activeIndex === i && prevIndex === null}
                />
              ))}
              {funciones.map((funcion, i) => (
                <Sobre
                  key={`sobre-${funcion.titulo}`}
                  funcion={funcion}
                  visible={funcion.superposicionFija ? activeIndex === i : activeIndex === i && prevIndex === null}
                  activa={activeIndex === i && prevIndex === null}
                />
              ))}
            </div>
          )}

          <div
            data-reveal
            className={`flex flex-col divide-y divide-ink/10 rounded-[2rem] bg-white px-6 py-1 ring-1 ring-ink/10 md:px-8 ${
              invertido ? "md:order-1" : ""
            }`}
          >
            {funciones.map((funcion, i) => {
              const isOpen = activeIndex === i
              return (
                <div key={funcion.titulo} className="md:flex md:flex-1 md:flex-col md:justify-center">
                  <button
                    type="button"
                    ref={(el) => {
                      botones.current[i] = el
                    }}
                    onClick={() => select(i)}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-detalle-${i}`}
                    className="group flex w-full scroll-mt-24 items-center justify-between gap-4 py-3 text-left focus-ring"
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
                      {funcion.cuerpo && (
                        <p className={`text-sm leading-relaxed text-ink-soft ${funcion.puntos ? "" : "pb-3"}`}>
                          {funcion.cuerpo}
                        </p>
                      )}
                      {funcion.puntos && (
                        <ul className={`${funcion.cuerpo ? "mt-2 " : ""}space-y-1.5 pb-3 text-sm leading-relaxed text-ink-soft`}>
                          {funcion.puntos.map((punto) => (
                            <li key={punto} className="flex gap-2">
                              <span
                                aria-hidden="true"
                                className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-accent"
                              />
                              {punto}
                            </li>
                          ))}
                        </ul>
                      )}
                      {!escritorio && isOpen && (
                        <div className="@container relative mb-4 mt-1 aspect-square overflow-hidden rounded-[1.5rem] bg-lavender ring-1 ring-primary/20">
                          <Capa funcion={funcion} visible="visible" activa inmediata />
                          <Sobre funcion={funcion} visible activa />
                        </div>
                      )}
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
