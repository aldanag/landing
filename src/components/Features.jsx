import { useRef, useState } from "react"
import redesImg from "../assets/features/redes.webp"
import galeriaImg from "../assets/features/galeria.webp"
import carritoImg from "../assets/features/carrito.webp"
import pedidosImg from "../assets/features/pedidos.webp"
import bannersImg from "../assets/features/banners.webp"
import preguntasImg from "../assets/features/preguntas.webp"
import {
  gsap,
  REDUCED_MOTION_OFF,
  REDUCED_MOTION_ON,
  useGSAP,
  useReveal,
} from "../lib/motion"

// Capturas reales del producto (no stock). Copiadas del sitio actual.
const features = [
  {
    title: "Conecta tus redes",
    body: "Tus redes siempre presentes e integradas en la cabecera de tu tienda, con botón de WhatsApp para contacto directo.",
    image: redesImg,
  },
  {
    title: "Galería de imágenes",
    body: "Mostrá tus productos en detalle, sin límite. Pantalla completa, zoom y navegación entre fotos.",
    image: galeriaImg,
  },
  {
    title: "Carrito de compras",
    body: "Carrito integrado: el sistema suma cantidades y calcula el total automáticamente.",
    image: carritoImg,
  },
  {
    title: "Pedido directo",
    body: "Recibís todos los datos del cliente directo en WhatsApp, sin intermediarios ni esperas.",
    image: pedidosImg,
  },
  {
    title: "Banners que venden",
    body: "Destacá ofertas y promociones con banners diseñados para captar la atención de tus visitas.",
    image: bannersImg,
  },
  {
    title: "Detalla sin límites",
    body: "Página de preguntas frecuentes para responder todo sobre pedidos, pagos, envíos, devoluciones y soporte.",
    image: preguntasImg,
  },
]

export default function Features() {
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

  // La imagen se mueve un poco más lento que la página, dentro de su marco.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_OFF, () => {
        gsap.fromTo(
          frame.current.querySelector("[data-layer]"),
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: frame.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }, frame)
    },
    { scope: frame },
  )

  // La imagen nueva entra con un barrido suave sobre la anterior.
  useGSAP(
    () => {
      if (prevIndex === null) return
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_OFF, () => {
        const layers = frame.current.querySelectorAll("img")
        const next = layers[activeIndex]
        const prev = layers[prevIndex]
        gsap.set(prev, { zIndex: 1 })
        gsap.set(next, { zIndex: 2, clipPath: "inset(0% 100% 0% 0%)" })
        gsap
          .timeline({ onComplete: () => setPrevIndex(null) })
          .to(next, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" }, 0)
          .fromTo(next, { scale: 1.08 }, { scale: 1, duration: 1, ease: "expo.out" }, 0.05)
          .to(prev, { xPercent: -4, opacity: 0.6, duration: 0.8, ease: "expo.inOut" }, 0)
      })
      // Con "reducir movimiento": fundido simple entre imágenes.
      mm.add(REDUCED_MOTION_ON, () => {
        const layers = frame.current.querySelectorAll("img")
        const next = layers[activeIndex]
        const prev = layers[prevIndex]
        gsap.set(prev, { zIndex: 1 })
        gsap.set(next, { zIndex: 2, opacity: 0 })
        gsap.to(next, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => setPrevIndex(null),
        })
      })
    },
    { scope: frame, dependencies: [activeIndex, prevIndex] },
  )

  return (
    <section id="funciones" ref={root} className="bg-mist py-16">
      <div className="mx-auto max-w-5xl px-4">
        <span
          data-reveal
          className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink"
        >
          Funcionalidades
        </span>
        <h2
          data-words
          className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
        >
          Todo lo que necesitás, integrado en nuestras webs.
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-stretch">
          <div
            ref={frame}
            data-reveal
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-lavender md:aspect-auto md:min-h-[24rem]"
          >
            <div data-layer className="absolute inset-x-0 -inset-y-[5%]">
            <div className="absolute inset-0 transition-[scale] duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            {features.map((feature, i) => (
              <img
                key={feature.title}
                src={feature.image}
                alt={feature.title}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover object-top ${
                  i === activeIndex || i === prevIndex ? "visible" : "invisible"
                }`}
              />
            ))}
            </div>
            </div>
          </div>

          <div
            data-reveal
            className="flex flex-col divide-y divide-ink/10 rounded-3xl bg-white px-6 py-2 ring-1 ring-ink/10 md:px-8"
          >
            {features.map((feature, i) => {
              const isOpen = activeIndex === i
              return (
                <div key={feature.title}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-4 py-4 text-left focus-ring"
                  >
                    <span
                      className={`text-base font-bold ${
                        isOpen ? "text-ink" : "text-ink-muted group-hover:text-ink"
                      }`}
                    >
                      {feature.title}
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
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 text-sm leading-relaxed text-ink-soft">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
