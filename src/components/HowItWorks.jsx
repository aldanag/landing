import { useRef } from "react"
import ImagePlaceholder from "./ImagePlaceholder"
import WhatsAppIcon from "./WhatsAppIcon"
import { useReveal } from "../lib/motion"

const steps = [
  {
    number: "01",
    label: "Cargá",
    title: "Sumá tus productos en minutos",
    body: "Fotos, precio, stock y variantes. Todo se edita desde un panel claro y amable.",
    cardClass: "bg-lavender text-ink",
    labelClass: "text-ink",
    iconClass: "bg-ink text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-hover:rotate-90 motion-reduce:group-hover:rotate-0">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    preview: (
      <div className="relative pt-5">
        <span className="absolute left-0 top-0 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink py-2 pl-3 pr-4 text-xs font-semibold text-white shadow-lg shadow-ink/20">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-lime">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          Nuevo producto
        </span>
        <div className="ml-6 flex items-center gap-3 rounded-2xl bg-white p-3 pt-6">
          <ImagePlaceholder className="h-12 w-12 flex-none" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink-soft">Nombre del producto</p>
            <p className="text-xs text-ink-muted">$ Precio</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    label: "Compartí",
    title: "Tu tienda lista para mostrar",
    body: "Personalizá colores, logo y link. Compartilo en Instagram, TikTok o donde vendas.",
    cardClass: "bg-lavender text-ink",
    labelClass: "text-ink",
    iconClass: "bg-ink text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
        <path
          d="M4 12h13m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    preview: (
      <div className="rounded-2xl bg-white p-3">
        <div className="flex h-16 items-center justify-center rounded-xl bg-ink">
          <span className="text-2xl font-extrabold tracking-tight text-lime">Tu logo</span>
        </div>
        <p className="mt-2 text-xs font-semibold text-ink-soft">tutienda.lemora.shop</p>
        <p className="text-xs text-ink-muted">Tienda publicada</p>
      </div>
    ),
  },
  {
    number: "03",
    label: "Vendé sin comisión",
    title: "El pedido llega a tu WhatsApp",
    body: "Tu cliente arma el carrito y te envía el detalle. Vos coordinás pago y entrega, sin comisión.",
    cardClass: "bg-lavender text-ink",
    labelClass: "text-ink",
    iconClass: "bg-ink text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-hover:-rotate-6 group-hover:scale-110 motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100">
        <path
          d="M4 4h16v12H8l-4 4V4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    preview: (
      <div className="rounded-2xl bg-ink p-3 text-white">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-white/70">
            Pedido · WhatsApp
          </p>
          <WhatsAppIcon className="h-6 w-6" />
        </div>
        <p className="mt-2 text-sm font-semibold">1× Producto</p>
        <p className="text-xs text-white/70">Total: $ Total</p>
        <div className="mt-2.5 rounded-full bg-white py-1.5 text-center text-[11px] font-semibold text-ink">
          Enviar pedido por WhatsApp
        </div>
      </div>
    ),
  },
]

export default function HowItWorks() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="como-funciona" ref={root} className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span
              data-reveal
              className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink"
            >
              Así de simple
            </span>
            <h2
              data-words
              className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
            >
              De tu producto al pedido, sin vueltas.
            </h2>
          </div>
          <p data-reveal className="max-w-xs text-sm text-ink-soft">
            Lemora ordena el camino para que vendas con una experiencia
            profesional, incluso si recién empezás.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              data-reveal
              className={`group flex flex-col rounded-3xl p-8 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ${step.cardClass}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[12.5px] font-semibold uppercase tracking-[0.09em] ${step.labelClass}`}
                >
                  {step.number} · {step.label}
                </span>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${step.iconClass}`}
                >
                  {step.icon}
                </span>
              </div>
              <h3 className="mt-4 text-[19px] font-bold">{step.title}</h3>
              <p className="mt-1 text-base">{step.body}</p>
              <div aria-hidden="true" className="mt-auto pt-5">
                {step.preview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
