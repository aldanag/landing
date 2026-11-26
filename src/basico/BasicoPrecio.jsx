import { useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import LinkTexto from "../components/LinkTexto"
import Tick from "../components/Tick"
import { anualLink, BASICO_CHECKOUT_LINK, peso, plans, WHATSAPP_TRIAL_LINK } from "../lib/planes"
import { INSIGNIA } from "../lib/pastillas"

const basico = plans.find((p) => p.name === "Básico")
const destacadas = [] // sin negritas: todas las funciones del plan se leen igual

const opciones = [
  { id: false, label: "Mensual" },
  { id: true, label: "Anual", badge: "Ahorrá 17%" },
]

export default function BasicoPrecio() {
  const root = useRef(null)
  const [anual, setAnual] = useState(false)
  useReveal(root)

  return (
    <section id="precio" ref={root} className="bg-ink py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2
            data-words
            className="mx-auto max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold md:text-[34px]"
          >
            Un precio claro. Sin letra chica.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-white/70">
            Probá el primer mes del plan Básico sin costo. Si funciona para vos, te quedás
            contratando el plan que mejor se adapte a tu negocio. Sin letra chica, te das de baja
            cuando quieras y sin vueltas.
          </p>
        </div>

        <div
          data-reveal
          className="mx-auto mt-8 grid max-w-6xl gap-6 rounded-3xl bg-white p-5 text-ink shadow-xl shadow-ink/10 sm:p-7 md:grid-cols-[0.8fr_1fr]"
        >
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-extrabold">Plan Básico</h3>

            <div className="mt-4">
              <div
                role="group"
                aria-label="Período de pago"
                className="inline-flex flex-none rounded-full bg-primary-tint p-1 ring-1 ring-ink/10"
              >
                {opciones.map((op) => (
                  <button
                    key={op.label}
                    type="button"
                    aria-pressed={anual === op.id}
                    onClick={() => setAnual(op.id)}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-300 focus-ring motion-reduce:transition-none ${
                      anual === op.id ? (op.id ? "bg-primary text-white" : "bg-ink text-white") : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {op.label}
                    {op.badge && <span className={INSIGNIA}>{op.badge}</span>}
                  </button>
                ))}
              </div>
            </div>


            <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-[36px] font-extrabold leading-none">
                {peso(anual ? basico.anual / 12 : basico.mensual)}
                <span className="text-base font-bold text-ink-soft">/mes</span>
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
                : "Probá 1 mes gratis"}
            </p>

            <p className="mt-4 text-balance text-sm font-semibold text-ink-soft">
              Sin compromiso de adquirir nuestro plan, no te pedimos tarjeta ni ningún tipo de pago.
            </p>

            <div className="mt-6 flex flex-col gap-3 md:mt-auto md:pt-6">
              <Button href={WHATSAPP_TRIAL_LINK} external className="w-full md:w-fit md:self-start md:px-10">
                Probar gratis 1 mes
              </Button>
              <p className="text-center text-sm text-ink-soft md:text-left">
                ¿Ya sabés que lo querés?{" "}
                <LinkTexto href={anual ? anualLink("Básico") : BASICO_CHECKOUT_LINK} external>
                  {anual ? "Contratar plan anual" : "Suscribirme ahora"}
                </LinkTexto>
              </p>
            </div>
          </div>

          <div className="border-t border-ink/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <p className="text-sm font-bold text-ink-soft">Incluye</p>
            <ul className="mt-3 space-y-2">
              {basico.features.map((f) => (
                <li
                  key={f}
                  className={`flex items-center gap-2.5 text-pretty text-sm ${
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
