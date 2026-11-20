import CtaPlanes from "./CtaPlanes"
import { useEffect, useRef } from "react"
import ImagePlaceholder from "./ImagePlaceholder"
import WhatsAppIcon from "./WhatsAppIcon"
import tazaFoto from "../assets/producto-taza.webp"
import { useReveal } from "../lib/motion"

// Cada paso cuenta una mini historia en bucle mientras su tarjeta está a la vista (clase `paso-activa`, ver "Así de simple" en
// index.css). Los tres pasos van desfasados para que se lea como una cadena. Con "reducir movimiento" quedan quietos, en su
// estado de reposo (el diseño original).
const Tilde = ({ className = "h-3 w-3" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="m5 13 4 4 10-10" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)


const Instagram = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="16.8" cy="7.2" r="1.2" fill="currentColor" />
  </svg>
)

const TikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
    <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3a7 7 0 0 1-3.8-1.2v6.3a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 1 0 1.7 2.4V3h2.9Z" />
  </svg>
)

// Glifo de WhatsApp de un solo color (el trazo del ícono de la marca WhatsApp, sin el cuadrado verde).
const WhatsAppGlifo = () => (
  <svg viewBox="8 8 29 29" fill="currentColor" className="h-3 w-3" aria-hidden="true">
    <g transform="rotate(-5.06977 22.77 22.78)">
      <path d="M28.4801 25.8711C28.1701 25.678 26.6579 24.7665 26.3723 24.6302C26.0862 24.4988 25.8766 24.4247 25.6326 24.7302C25.3941 25.0279 24.7099 25.6973 24.5017 25.8917C24.2936 26.0862 24.106 26.0858 23.7991 25.9142C23.4891 25.7211 22.4823 25.2917 21.3493 24.0786C20.4637 23.1378 19.917 22.0273 19.7556 21.6859C19.5946 21.3486 19.7791 21.1822 19.9535 21.0362C20.1139 20.902 20.3109 20.6943 20.4925 20.5146C20.6659 20.3343 20.7276 20.2084 20.8604 20.0081C20.9858 19.79 20.9473 19.608 20.8814 19.4406C20.8155 19.2733 20.3114 17.6273 20.098 16.9706C19.8964 16.3197 19.6198 16.3759 19.4215 16.3583C19.2377 16.3249 19.0224 16.3058 18.8079 16.2867C18.5935 16.2677 18.2359 16.3168 17.9132 16.5981C17.589 16.8964 16.6858 17.5977 16.5467 19.1662C16.4072 20.7387 17.4271 22.3627 17.5672 22.6043C17.7128 22.8293 19.5331 26.2536 22.6429 27.9316C23.3854 28.3246 23.967 28.572 24.4206 28.7737C25.1702 29.0865 25.8773 29.115 26.4405 29.0842C27.0645 29.0376 28.4148 28.4731 28.7524 27.7387C29.0945 26.9999 29.1505 26.3678 29.0831 26.2174C29.0161 26.063 28.8128 25.9642 28.5009 25.7922L28.4801 25.8711ZM21.9112 33.3009L21.8942 33.2993C19.9802 33.1295 18.134 32.4429 16.5674 31.3267L16.2003 31.0609L12.0602 31.7556L13.4972 27.9147L13.2717 27.4869C12.3539 25.6927 11.9614 23.6759 12.1394 21.6684C12.6607 15.7928 17.8957 11.4267 23.8134 11.9517C26.68 12.206 29.2703 13.5614 31.1141 15.7642C32.0247 16.8391 32.7121 18.0844 33.1363 19.4277C33.5605 20.771 33.713 22.1853 33.5849 23.5881C33.0559 29.459 27.825 33.8255 21.9153 33.3012L21.9112 33.3009ZM32.7891 14.3622C30.5381 11.766 27.4201 10.1345 23.9764 9.82903C16.8738 9.19891 10.5796 14.4442 9.9477 21.5205C9.74724 23.7801 10.1417 26.0371 11.0984 28.0886L8.67953 34.5741L15.6748 33.3977C17.4779 34.5878 19.5476 35.3129 21.6991 35.5081L21.7032 35.5084C28.8098 36.1389 35.1041 30.8936 35.7364 23.8124C36.0404 20.3858 34.9903 17.0421 32.7693 14.4021L32.7891 14.3622Z" />
    </g>
  </svg>
)

const Copiar = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="2.2" />
    <path d="M15 6.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)

const steps = [
  {
    number: "01",
    label: "Cargá",
    title: "Cargá tus productos en minutos",
    body: "Fotos, precio, stock y más. Todo se edita desde un panel claro y amigable.",
    cardClass: "bg-lilac text-ink",
    labelClass: "text-ink",
    iconClass: "bg-ink text-white p1-icono",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:rotate-90 motion-reduce:group-hover:rotate-0">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    // Reposo: el producto vacío. En movimiento: se aprieta el botón, el producto se completa y queda guardado.
    preview: (
      <div className="relative flex min-h-[10rem] flex-col pt-7">
        <span className="p1-pill absolute left-0 top-0 z-10 inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-3.5 pr-5 text-[13px] font-semibold text-white shadow-lg shadow-ink/20">
          <span className="p1-onda pointer-events-none absolute inset-0 rounded-full bg-lime opacity-0" />
          <svg viewBox="0 0 24 24" fill="none" className="relative h-4 w-4 text-white">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="relative">Nuevo producto</span>
        </span>
        <div className="p1-fila relative ml-6 flex flex-1 items-center gap-3.5 rounded-2xl bg-white p-4">
          <div className="relative h-[4.5rem] w-[4.5rem] flex-none xl:h-[5.75rem] xl:w-[5.75rem]">
            <ImagePlaceholder className="h-full w-full" />
            <img src={tazaFoto} alt="" width="600" height="600" className="p1-lleno absolute inset-0 h-full w-full rounded-xl object-cover opacity-0" />
          </div>
          <div className="relative min-w-0 flex-1 self-stretch">
            <div className="p1-vacio absolute inset-0 flex flex-col justify-center">
              <p className="text-[13px] font-semibold text-ink-soft xl:text-sm">Nombre del producto</p>
              <p className="text-[13px] text-ink-muted xl:text-sm">$ Precio</p>
              <p className="mt-1 text-[11px] text-ink-muted xl:text-xs">Stock</p>
            </div>
            <div className="p1-lleno absolute inset-0 flex flex-col justify-center opacity-0">
              <p className="text-[13px] font-semibold text-ink xl:text-sm">Taza Speckle</p>
              <p className="text-[13px] font-bold text-primary xl:text-sm">$12.500</p>
              <p className="mt-1 text-[11px] text-ink-muted xl:text-xs">Stock: 12 unidades</p>
            </div>
          </div>
          <span className="p1-guardado absolute right-3 top-2 flex items-center gap-1 rounded-full bg-ink py-0.5 pl-1.5 pr-2 text-[10px] font-semibold text-white opacity-0">
            <Tilde className="h-2.5 w-2.5 text-accent" />
            Guardado
          </span>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    label: "Compartí",
    title: "Tu tienda lista para compartir",
    body: "Personalizá colores, logo y link. Compartilo en Instagram, TikTok o donde vendas.",
    cardClass: "bg-lilac text-ink",
    labelClass: "text-ink",
    iconClass: "bg-ink text-white p2-icono",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
        <path
          d="M4 12h13m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    // Reposo: el link y "Tienda publicada". En movimiento: el link se escribe, queda publicado y un botón lo copia y aparecen dónde compartirlo.
    preview: (
      <div className="rounded-2xl bg-white p-3">
        <div className="flex h-20 items-center justify-center rounded-xl bg-ink">
          <span className="text-2xl font-extrabold tracking-tight text-lime">Tu logo</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="p2-url whitespace-nowrap text-xs font-semibold text-ink-soft">tutienda.lemora.lat</p>
          <span className="p2-copiar relative flex-none rounded-full bg-night-2 px-2.5 py-1 text-[10px] font-semibold text-white opacity-0">
            <span className="p2-c1 flex items-center gap-1">
              <Copiar />
              Copiar link
            </span>
            <span className="p2-c2 absolute inset-0 flex items-center justify-center gap-1 opacity-0">
              <Tilde className="h-2.5 w-2.5 text-accent" />
              ¡Copiado!
            </span>
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="relative h-5 flex-1 text-xs text-ink-muted">
            <p className="p2-pub absolute inset-0 flex items-center opacity-0">Publicando…</p>
            <p className="p2-listo absolute inset-0 flex items-center gap-1">
              <span className="p2-check flex h-3 w-3 items-center justify-center rounded-full bg-accent text-white">
                <Tilde className="h-2 w-2" />
              </span>
              Tienda publicada
            </p>
          </div>
          <span className="flex flex-none items-center gap-1">
            <span className="p2-chip-1 flex h-5 w-5 items-center justify-center rounded-full bg-night-2 text-white opacity-0">
              <Instagram />
            </span>
            <span className="p2-chip-2 flex h-5 w-5 items-center justify-center rounded-full bg-night-2 text-white opacity-0">
              <TikTok />
            </span>
            <span className="p2-chip-3 flex h-5 w-5 items-center justify-center rounded-full bg-night-2 text-white opacity-0">
              <WhatsAppGlifo />
            </span>
          </span>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    label: "Vendé sin comisión",
    title: "El pedido llega directo a tu WhatsApp",
    body: "Tu cliente arma el carrito y te envía el detalle. Vos coordinás pago y entrega, sin comisión.",
    cardClass: "bg-lilac text-ink",
    labelClass: "text-ink",
    iconClass: "bg-ink text-white p3-icono",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:-rotate-6 group-hover:scale-110 motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100">
        <path
          d="M4 4h16v12H8l-4 4V4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    // Reposo: el pedido genérico. En movimiento: el carrito se completa con la taza del paso 1 (la del hero), se envía y sube;
    // entra el chat de tu WhatsApp con el pedido recibido y tu respuesta. Nunca se ven los dos a la vez.
    preview: (
      <div className="relative min-h-[10rem] overflow-hidden rounded-2xl bg-ink text-white">
        <div className="p3-carro flex min-h-[10rem] flex-col justify-between p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-white/70">
              Pedido · WhatsApp
            </p>
            <WhatsAppIcon className="h-6 w-6" />
          </div>
          <div className="relative mt-2">
            <div className="p3-vacio">
              <p className="text-sm font-semibold">1× Producto</p>
              <p className="text-xs text-white/70">Total: $ Total</p>
            </div>
            <div className="p3-lleno absolute inset-0 flex items-center gap-2.5 opacity-0">
              <img src={tazaFoto} alt="" width="600" height="600" className="h-9 w-9 flex-none rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">1× Taza Speckle</p>
                <p className="text-xs text-white/70">Total: $12.500</p>
              </div>
            </div>
          </div>
          <div className="p3-boton relative mt-2.5 rounded-full bg-white py-1.5 text-center text-[11px] font-semibold text-ink">
            <span className="p3-lab1 block">Enviar pedido por WhatsApp</span>
            <span className="p3-lab2 absolute inset-0 flex items-center justify-center gap-1 opacity-0">
              <Tilde className="h-3 w-3 text-accent" />
              Pedido enviado
            </span>
          </div>
        </div>

        <div className="p3-chat pointer-events-none absolute inset-0 flex flex-col justify-center gap-1.5 p-3 opacity-0">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <WhatsAppIcon className="h-5 w-5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-white/70">Nuevo pedido</span>
            </span>
            <span className="text-[10px] text-white/60">ahora</span>
          </div>
          <div className="p3-b1 self-start rounded-xl rounded-tl-sm bg-white px-2.5 py-2 text-[11px] leading-[1.35] text-ink opacity-0">
            <p className="whitespace-nowrap">Hola, quiero hacer este pedido:</p>
            <p className="whitespace-nowrap">• 1× Taza Speckle · $12.500</p>
            <p className="whitespace-nowrap font-semibold">Total: $12.500</p>
            <p className="whitespace-nowrap">Pago por alias: tutienda.pago</p>
          </div>
          <div className="relative h-6">
            <span className="p3-puntos absolute right-0 top-0 flex items-center gap-1 rounded-xl rounded-tr-sm bg-white/15 px-2.5 py-2 opacity-0">
              <span className="p3-punto h-1 w-1 rounded-full bg-white" />
              <span className="p3-punto h-1 w-1 rounded-full bg-white" style={{ animationDelay: "0.15s" }} />
              <span className="p3-punto h-1 w-1 rounded-full bg-white" style={{ animationDelay: "0.3s" }} />
            </span>
            <span className="p3-b2 absolute right-0 top-0 whitespace-nowrap rounded-xl rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1 text-[11px] font-medium text-ink opacity-0">
              ¡Recibido! Preparamos tu pedido
            </span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function HowItWorks() {
  const root = useRef(null)
  useReveal(root)

  // Cada tarjeta empieza su bucle cuando se ve y lo frena cuando sale de pantalla.
  useEffect(() => {
    const tarjetas = root.current?.querySelectorAll("[data-paso]") ?? []
    if (!("IntersectionObserver" in window)) return undefined
    const obs = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.target.classList.toggle("paso-activa", e.isIntersecting)),
      { threshold: 0.35 },
    )
    tarjetas.forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="como-funciona" ref={root} className="bg-white py-16 md:py-[4.5rem]">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
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
              De tu tienda al pedido, sin vueltas.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-sm text-ink-soft">
            Tu negocio merece una web profesional, sin que tu bolsillo sea un impedimento. Tu
            tienda online profesional ahora al alcance de todos.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              data-reveal
              data-paso
              style={{ "--demora": `${i * 2}s` }}
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
        <CtaPlanes />
      </div>
    </section>
  )
}
