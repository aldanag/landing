import { useRef } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import { WHATSAPP_TRIAL_LINK } from "../lib/planes"

const pasos = [
  {
    n: "01",
    title: "Probá 1 mes gratis",
    body: "Escribinos por WhatsApp y empezás sin cargar la tarjeta.",
  },
  {
    n: "02",
    title: "Configurá tu tienda",
    body: "Preparamos tu tienda en menos de 24 horas. Te capacitamos para crear tus productos y servicios y para gestionar toda tu tienda.",
  },
  {
    n: "03",
    title: "Compartila y vendé",
    body: "Empezá a vender, compartí tu sitio, llegá a más clientes y mostrá tu web profesional al mundo. Todo tu negocio gestionado desde un único lugar.",
  },
]

export default function BasicoPasos() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="como-empezar" ref={root} className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            Cómo empezar
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            De cero a tu tienda funcionando, en tres pasos.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pasos.map((p) => (
            <div
              key={p.n}
              data-reveal
              className="rounded-3xl bg-lilac p-7 text-ink transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <span className="text-[12.5px] font-semibold uppercase tracking-[0.09em]">
                Paso {p.n}
              </span>
              <h3 className="mt-3 text-[19px] font-bold">{p.title}</h3>
              <p className="mt-1.5 text-base">{p.body}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-8 flex justify-center">
          <Button href={WHATSAPP_TRIAL_LINK} external size="lg" className="w-full max-w-xs sm:w-56">
            Empezar gratis
          </Button>
        </div>
      </div>
    </section>
  )
}
