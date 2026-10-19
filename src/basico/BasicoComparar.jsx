import { useRef } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import Tick from "../components/Tick"
import { plans } from "../lib/planes"

const premium = plans.find((p) => p.name === "Premium")
// Lo que el Premium suma: sus funciones nuevas (las marcadas isNew).
const nuevas = premium.features.filter((f) => f.isNew).map((f) => f.text)

const conBasico = [
  "Productos y servicios ilimitados",
  "Reserva de turnos para servicios",
  "Carrusel de hasta 4 imágenes",
  "4 banners promocionales",
  "Pedidos directo a tu WhatsApp",
  "Sin comisiones por venta",
]
const conPremium = ["Carrusel de hasta 6 imágenes", "Contacto con Google Maps", ...nuevas]

export default function BasicoComparar() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="comparar" ref={root} className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4">
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
              $9.000<span className="text-base font-bold text-ink-soft">/mes</span>
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
              $15.000<span className="text-base font-bold text-ink-soft">/mes</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Contratación mínima: 3 meses. Sin el aviso de Lemora en el marquee.
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
