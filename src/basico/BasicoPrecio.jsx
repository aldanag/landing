import { useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import Tick from "../components/Tick"
import { anualLink, BASICO_CHECKOUT_LINK, peso, plans, WHATSAPP_TRIAL_LINK } from "../lib/planes"

const basico = plans.find((p) => p.name === "Básico")
// Las funciones que más pesan en la decisión van en negrita.
const destacadas = ["Cargá productos o servicios ilimitados"]

const opciones = [
  { id: false, label: "Mensual", on: "bg-ink text-white" },
  { id: true, label: "Anual", on: "bg-primary text-white", badge: "Ahorrá 11%" },
]

export default function BasicoPrecio() {
  const root = useRef(null)
  const [anual, setAnual] = useState(false)
  useReveal(root)

  return (
    <section id="precio" ref={root} className="bg-ink py-16 text-white">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2
            data-words
            className="mx-auto max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold md:text-[34px]"
          >
            Un precio claro. Sin letra chica.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-white/70">
            Probá el primer mes sin costo y sin tarjeta. Si te sirve, seguís con un pago por
            MercadoPago.
          </p>
        </div>

        <div data-reveal className="mt-8 flex justify-center">
          <div
            role="group"
            aria-label="Período de pago"
            className="inline-flex flex-none rounded-full bg-white p-1 ring-1 ring-ink/10"
          >
            {opciones.map((op) => (
              <button
                key={op.label}
                type="button"
                aria-pressed={anual === op.id}
                onClick={() => setAnual(op.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-ring-light motion-reduce:transition-none ${
                  anual === op.id ? op.on : "text-ink-soft hover:text-ink"
                }`}
              >
                {op.label}
                {op.badge && (
                  <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-ink">
                    {op.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="mx-auto mt-8 grid max-w-4xl gap-6 rounded-3xl bg-white p-5 text-ink shadow-xl shadow-ink/10 sm:p-7 md:grid-cols-[1.15fr_1fr]"
        >
          <div className="flex flex-col">
            <h3 className="text-xl font-extrabold">Plan Básico</h3>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-[44px] font-extrabold leading-none">
                {peso(anual ? basico.anual / 12 : basico.mensual)}
                <span className="text-lg font-bold text-ink-soft">/mes</span>
              </p>
              {anual && (
                <p className="text-sm font-semibold text-ink-muted line-through decoration-2">
                  {peso(basico.mensual)}
                </p>
              )}
            </div>
            <p className="mt-2 text-[15px] font-bold text-primary">
              {anual
                ? `Pagás ${peso(basico.anual)} una vez al año · ahorrás ${peso(basico.mensual * 12 - basico.anual)}`
                : "Tu primer mes es gratis"}
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-semibold text-ink-soft">
              <li className="flex items-center gap-1.5">
                <Tick />
                Sin tarjeta para probar
              </li>
              {!anual && (
                <li className="flex items-center gap-1.5">
                  <Tick />
                  Sin permanencia
                </li>
              )}
            </ul>

            <div className="mt-6 flex flex-col gap-3 md:mt-auto">
              <Button href={WHATSAPP_TRIAL_LINK} external block>
                Probar gratis 1 mes
              </Button>
              <p className="text-center text-sm text-ink-soft">
                ¿Ya sabés que lo querés?{" "}
                <a
                  href={anual ? anualLink("Básico") : BASICO_CHECKOUT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded font-semibold text-primary underline underline-offset-4 focus-ring"
                >
                  {anual ? "Contratar plan anual" : "Suscribirme ahora"}
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-ink/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <p className="text-sm font-bold text-ink-soft">Incluye</p>
            <ul className="mt-3 space-y-2">
              {basico.features.map((f) => (
                <li
                  key={f}
                  className={`flex items-center gap-2.5 text-sm ${
                    destacadas.includes(f) ? "font-bold" : ""
                  }`}
                >
                  <Tick />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
