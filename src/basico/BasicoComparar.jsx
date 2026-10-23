import { useRef } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import Tick from "../components/Tick"
import { peso, plans } from "../lib/planes"

// Las listas salen de los mismos datos que las tarjetas de la landing, así no se desfasan.
const nombre = (f) => f.text ?? f
const basico = plans.find((p) => p.name === "Básico")
const conBasico = basico.features.map(nombre)
const premium = plans.find((p) => p.name === "Premium")
const conPremium = premium.features.map(nombre)

export default function BasicoComparar() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="comparar" ref={root} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            ¿Básico o Premium?
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            Empezá con lo esencial. Sumá más cuando lo necesites.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div data-reveal className="rounded-3xl bg-mist p-6 ring-1 ring-ink/10">
            <p className="text-sm font-semibold uppercase tracking-[0.09em] text-ink-soft">
              Con el Básico
            </p>
            <p className="mt-2 text-[28px] font-extrabold text-ink">
              {peso(basico.mensual)}<span className="text-base font-bold text-ink-soft">/mes</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">Ideal para empezar a vender online.</p>
            <ul className="mt-4 space-y-2">
              {conBasico.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="rounded-3xl bg-white p-6 ring-[3px] ring-accent">
            <p className="text-sm font-semibold uppercase tracking-[0.09em] text-ink-soft">
              Con el Premium, además
            </p>
            <p className="mt-2 text-[28px] font-extrabold text-ink">
              {peso(premium.mensual)}<span className="text-base font-bold text-ink-soft">/mes</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Contratación mínima: 3 meses.
            </p>
            <ul className="mt-4 space-y-2">
              {conPremium.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm font-semibold">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="mt-8 flex justify-center">
          <Button href="/#planes" variant="secondary" size="lg" className="w-full max-w-xs sm:w-56">
            Ver todos los planes
          </Button>
        </div>
      </div>
    </section>
  )
}
