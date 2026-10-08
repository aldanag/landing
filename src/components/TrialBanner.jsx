import { useRef } from "react"
import { useReveal } from "../lib/motion"
import Button from "./Button"

const WHATSAPP_START_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20empezar%20gratis%20con%20Lemora"

const checks = ["Sin tarjeta", "Sin comisiones por venta"]

export default function TrialBanner() {
  const root = useRef(null)
  useReveal(root, { y: 40, scale: 0.98 })

  return (
    <section ref={root} className="pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <div
          data-reveal
          className="relative grid gap-10 overflow-hidden rounded-[2.5rem] bg-ink p-5 text-white sm:p-8 md:grid-cols-2 md:items-center md:p-14"
        >
          <div className="relative">
            <span className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink">
              Tu momento es ahora
            </span>
            <h2 className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold leading-tight md:text-[34px]">
              Probá tu tienda gratis durante 30 días
            </h2>
            <p className="mt-4 text-base text-white/70">
              Creá tu tienda, cargá tus productos y empezá a recibir pedidos.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {checks.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-4 w-4 flex-none text-accent"
                  >
                    <path
                      d="m5 13 4 4 10-10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-3xl bg-white p-5 text-ink shadow-xl shadow-ink/10 sm:p-6">
            <span className="inline-block rounded-full bg-lime px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px] sm:tracking-[0.09em] text-ink">
              Prueba completa
            </span>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-[56px] font-bold leading-none">1</span>
              <span className="pb-1 text-xl font-bold">mes gratis</span>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              El plan Básico completo: catálogo, pedidos por WhatsApp y tu
              tienda lista desde el primer día.
            </p>

            <Button
              href={WHATSAPP_START_LINK}
              external
              block
              className="mt-6 max-[359px]:px-3 max-[359px]:text-sm"
            >
              Probar gratis 1 mes
            </Button>
            <p className="mt-3 text-center text-xs text-ink-muted">
              No necesitás conocimientos técnicos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
