import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faCalendarCheck } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"
import Tick from "../components/Tick"

const tipos = [
  {
    icon: faBagShopping,
    etiqueta: "Productos",
    title: "Vendé tus productos.",
    body: "Armá tu catálogo con todos los productos que quieras. Tus clientes eligen, arman el carrito y el pedido te llega a tu WhatsApp.",
    puntos: ["Productos ilimitados", "Carrito de compras", "Pedido directo a tu WhatsApp"],
  },
  {
    icon: faCalendarCheck,
    etiqueta: "Servicios",
    title: "Ofrecé tus servicios.",
    body: "Elegí una tienda de servicios: tus clientes reservan su turno desde la tienda, vos definís los horarios disponibles y ves tu calendario en el panel.",
    puntos: ["Servicios ilimitados", "Vos elegís tus horarios", "Tu calendario en el panel"],
  },
]

export default function BasicoPara() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="productos-y-servicios" ref={root} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            Para vender de todo
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            Una tienda para vender productos o para ofrecer servicios.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-ink-soft">
            Elegís qué tipo de tienda querés armar, y la configurás y la cargás desde el mismo
            panel, sin límite.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {tipos.map((t) => (
            <article
              key={t.etiqueta}
              data-reveal
              className="rounded-3xl bg-lilac p-7 text-ink transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-semibold uppercase tracking-[0.09em]">
                  {t.etiqueta}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white">
                  <FontAwesomeIcon icon={t.icon} className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-4 text-[22px] font-bold leading-tight">{t.title}</h3>
              <p className="mt-2 text-base">{t.body}</p>
              <ul className="mt-5 space-y-2">
                {t.puntos.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[15px] font-semibold">
                    <Tick tone="text-ink" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
