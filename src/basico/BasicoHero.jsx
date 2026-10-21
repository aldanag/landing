import { useRef } from "react"
import { gsap, REDUCED_MOTION_OFF, useGSAP, useReveal } from "../lib/motion"
import Button from "../components/Button"
import CheckIcon from "../components/CheckIcon"
import Tick from "../components/Tick"
import { WHATSAPP_TRIAL_LINK } from "../lib/planes"
import hombre900 from "../assets/hero-hombre-900.webp"
import hombre1468 from "../assets/hero-hombre-1468.webp"
import producto from "../assets/producto-tarjeta.webp"

export default function BasicoHero() {
  const root = useRef(null)
  useReveal(root)

  // Las tarjetas flotan despacio. Con "reducir movimiento" quedan quietas.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_OFF, () => {
        gsap.to("[data-flota]", {
          y: (i) => (i % 2 ? -8 : 8),
          duration: (i) => 2.6 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="px-3 pt-[4.5rem] md:px-5 md:pt-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-lilac md:rounded-[2.5rem]">
        <div className="mx-auto grid max-w-[88rem] items-center gap-8 px-5 py-10 lg:min-h-[34rem] md:grid-cols-[1.05fr_1fr] md:gap-4 md:px-10 md:py-14 lg:px-14">
          <div className="text-center md:text-left lg:max-w-[29rem]">
            <span
              data-reveal
              className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
            >
              Plan Básico
            </span>
            <h1
              data-words
              className="mt-4 text-[clamp(30px,8.6vw,38px)] font-bold leading-[1.05] text-ink md:text-[46px] lg:max-w-[8.2em] xl:text-[56px]"
            >
              Tu tienda online completa, desde $9.000 al mes.
            </h1>
            <p
              data-reveal
              className="mx-auto mt-4 max-w-xl text-base font-semibold text-ink md:mx-0 md:text-[19px] lg:max-w-[25rem]"
            >
              Configurá tu tienda para productos o servicios de manera ilimitada, con reserva de
              turnos y pedidos directo a tu WhatsApp. Sin comisiones por venta y sin permanencia.
            </p>
            <div
              data-reveal
              className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:flex-col md:items-start lg:max-w-[25rem] lg:flex-row lg:items-center lg:justify-start"
            >
              <Button
                href={WHATSAPP_TRIAL_LINK}
                external
                size="lg"
                className="w-full max-w-xs sm:w-56 lg:w-auto lg:max-w-none lg:flex-1 lg:px-4"
              >
                Probar gratis 1 mes
              </Button>
              <Button
                href="#incluye"
                variant="light"
                size="lg"
                className="w-full max-w-xs sm:w-56 lg:w-auto lg:max-w-none lg:flex-1 lg:px-4"
              >
                Ver qué incluye
              </Button>
            </div>
            <ul
              data-reveal
              className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-sm font-semibold text-ink md:justify-start"
            >
              {["Sin tarjeta", "Sin comisiones", "Sin permanencia"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Tick tone="text-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Escena: el hombre cortado por el borde de abajo del panel, con un producto y un pedido. */}
          <div
            aria-hidden="true"
            className="relative mx-auto -mb-10 h-[19rem] w-full max-w-md self-end md:-mb-14 md:h-[27rem] md:max-w-none lg:absolute lg:inset-y-0 lg:self-stretch lg:right-0 lg:mx-0 lg:mb-0 lg:h-auto lg:w-[min(57%,calc(100%-34rem))] lg:max-w-[800px]"
          >
            <svg
              viewBox="0 0 400 420"
              fill="none"
              className="absolute inset-0 h-full w-full lg:hidden"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M-24 4.79399C4.05737 62.7365 82.8158 114.99 123.155 113.083C162.492 113.23 187.271 85.925 176.34 64.0597C162.785 34.5559 133.234 43.0034 105.4 71.3582C73.5077 102.816 60.0898 143.297 81.8089 171.704C100.95 197.58 135.704 199.301 166.542 219.449C238.481 264.759 281.2 354.273 298.521 459.348"
                transform="translate(290 100) rotate(-90) scale(0.6) translate(-125 -85)"
                stroke="#ff9a52"
                strokeWidth="19"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              viewBox="0 0 740 545"
              fill="none"
              className="absolute inset-0 hidden h-full w-full lg:block"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M-24 4.79399C4.05737 62.7365 82.8158 114.99 123.155 113.083C162.492 113.23 187.271 85.925 176.34 64.0597C162.785 34.5559 133.234 43.0034 105.4 71.3582C73.5077 102.816 60.0898 143.297 81.8089 171.704C100.95 197.58 135.704 199.301 166.542 219.449C238.481 264.759 281.2 354.273 298.521 459.348"
                transform="translate(568 182) rotate(-90) scale(0.81) translate(-125 -85)"
                stroke="#ff9a52"
                strokeWidth="17"
                strokeLinejoin="round"
              />
            </svg>
            <img
              src={hombre1468}
              srcSet={`${hombre900} 900w, ${hombre1468} 1468w`}
              sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 90vw"
              alt=""
              width="1469"
              height="940"
              fetchPriority="high"
              className="absolute bottom-0 right-0 w-[112%] max-w-none md:right-[-4%] md:w-[104%] lg:right-0 lg:w-full"
            />
            <div
              data-flota
              className="absolute right-0 top-3 w-[6.5rem] rotate-3 md:right-auto rounded-2xl bg-white p-2 shadow-xl shadow-ink/10 md:left-[2%] md:top-6 md:w-36 md:-rotate-3 lg:left-[2%] lg:top-[6%]"
            >
              <img
                src={producto}
                alt=""
                width="600"
                height="600"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <div className="mt-2 flex items-baseline justify-between gap-1.5 text-[10px] md:text-[11px]">
                <span className="truncate font-semibold">
                  Gorra<span className="hidden md:inline"> Lima</span>
                </span>
                <span className="flex-none font-bold">$14.500</span>
              </div>
              <div className="mt-1.5 rounded-full bg-primary py-1 text-center text-[9px] font-semibold text-white md:text-[10px]">
                Agregar al carrito
              </div>
            </div>
            <div
              data-flota
              className="absolute bottom-6 right-0 flex rotate-2 lg:bottom-[9%] lg:right-[2.5%] items-center gap-2.5 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-xl shadow-ink/10"
            >
              <CheckIcon className="h-8 w-8" />
              <span>
                <span className="block text-xs font-bold text-ink">Pedido confirmado</span>
                <span className="block text-[11px] text-ink-muted">¡Gracias por tu compra!</span>
              </span>
            </div>
            <div
              data-flota
              className="absolute left-0 top-4 rounded-full bg-lime md:left-auto md:right-0 lg:right-[3%] lg:top-[9%] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink shadow-xl shadow-ink/10 md:text-[13px]"
            >
              1 mes gratis
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
