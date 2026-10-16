import { useRef, useState } from "react"
import { gsap, REDUCED_MOTION_OFF, ScrollTrigger, useGSAP, useReveal } from "../lib/motion"
import Button from "./Button"

const WHATSAPP_TRIAL_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20probar%20Lemora%20gratis"

const BASICO_CHECKOUT_LINK =
  "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=d37372dd19924098bcfeb189bbb8fbcf"

// Los planes anuales todavía no tienen link de suscripción propio en MercadoPago:
// por ahora el botón abre un WhatsApp con el plan elegido.
// TODO: reemplazar por los links reales de suscripción anual.
const anualLink = (plan) =>
  `https://wa.me/543515957014?text=${encodeURIComponent(`Hola, quiero contratar el plan ${plan} anual de Lemora`)}`

const peso = (n) => `$${Math.round(n).toLocaleString("es-AR")}`

// TODO: reemplazar por la URL real de una tienda de ejemplo.
const EJEMPLO_WEB_LINK = "#"

// Las funciones que se repiten entre planes van en el mismo orden para que las
// filas queden alineadas; las exclusivas de Premium llevan isNew (resaltadas).
// actions[0] es el botón principal (lima); actions[1], si existe, el secundario.
const plans = [
  {
    name: "Básico",
    badge: "1 mes gratis",
    mensual: 9000,
    anual: 96000,
    commitment: "Contratación mínima: 1 mes",
    features: [
      "Web básica",
      "Productos ilimitados",
      "Carrusel de hasta 4 imágenes",
      "Sección de contacto",
      "4 banners promocionales",
      "Agregar a favoritos",
      "Preguntas frecuentes",
      "Lemora Ads en el marquee",
    ],
    actions: [
      {
        label: "Probar gratis 1 mes",
        href: WHATSAPP_TRIAL_LINK,
        external: true,
        note: "No te pedimos la tarjeta",
      },
      {
        label: "Suscribirme",
        href: BASICO_CHECKOUT_LINK,
        external: true,
      },
    ],
  },
  {
    name: "Premium",
    crown: true,
    mensual: 15000,
    anual: 160000,
    commitment: "Contratación mínima: 3 meses",
    features: [
      { text: "Web premium", strong: "premium" },
      "Productos ilimitados",
      { text: "Carrusel de hasta 6 imágenes", strong: "6 imágenes" },
      { text: "Contacto con Google Maps", strong: "Google Maps" },
      { text: "Gestión de ventas", isNew: true },
      { text: "Nuevo menú por categorías", isNew: true },
      { text: "Banner en carrito o contacto", isNew: true },
      { text: "Google Search Console", isNew: true },
      { text: "Reseñas de clientes", isNew: true },
      { text: "Cupones de descuento", isNew: true },
      { text: "Descuentos automáticos por compras", isNew: true },
      { text: "Ventana emergente al salir", isNew: true },
    ],
    // TODO: reemplazar por el link real de suscripción de MercadoPago del plan Premium.
    actions: [{ label: "Suscribirme", href: "#registro", external: false }],
    featured: true,
  },
]

// Con el plan anual, el botón principal contrata el año; Básico conserva la prueba gratis.
function anualActions(plan) {
  const contratar = {
    label: "Contratar plan anual",
    href: anualLink(plan.name),
    external: true,
  }
  return plan.name === "Básico" ? [plan.actions[0], contratar] : [contratar]
}

function CrownIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 7.5 7.5 11 12 4l4.5 7L21 7.5 19 18H5L3 7.5Z" />
      <path d="M5 21h14" strokeLinecap="round" />
    </svg>
  )
}

export default function PricingCards() {
  const root = useRef(null)
  const [anual, setAnual] = useState(false)
  useReveal(root)

  // Los checks de cada lista se dibujan uno tras otro al entrar en pantalla.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        REDUCED_MOTION_OFF,
        () => {
          root.current.querySelectorAll("ul").forEach((list) => {
            const checks = list.querySelectorAll("path")
            gsap.set(checks, { strokeDasharray: 20, strokeDashoffset: 20 })
            ScrollTrigger.create({
              trigger: list,
              start: "top 85%",
              once: true,
              onEnter: () =>
                gsap.to(checks, {
                  strokeDashoffset: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  stagger: 0.05,
                  clearProps: "strokeDasharray,strokeDashoffset",
                }),
            })
          })
        },
        root,
      )
    },
    { scope: root },
  )

  return (
    <section id="planes" ref={root} className="bg-ink py-16 text-white">
      <div className="mx-auto max-w-3xl px-4">
        <h2
          data-words
          className="text-center text-[clamp(25px,8.2vw,32px)] font-bold md:text-[34px]"
        >
          Empezá gratis. Vendé desde hoy.
        </h2>
        <p
          data-reveal
          className="mx-auto mt-3 max-w-2xl text-balance text-center text-base text-white/70"
        >
          Probá el primer mes del plan Básico sin costo y sin tarjeta. Si te sirve, seguís con un
          pago mensual por MercadoPago. Sin sorpresas, sin letra chica.
        </p>

        <div data-reveal className="mt-8 flex justify-center">
          <div
            role="group"
            aria-label="Período de pago"
            className="inline-flex flex-none rounded-full bg-white p-1 ring-1 ring-ink/10"
          >
            {[
              { id: false, label: "Mensual", on: "bg-ink text-white" },
              { id: true, label: "Anual", on: "bg-primary text-white", badge: "Ahorrá 11%" },
            ].map((op) => (
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

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              data-reveal
              className={`relative flex min-w-0 flex-col rounded-3xl bg-white p-5 text-ink shadow-xl sm:p-6 shadow-ink/10 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ${
                plan.featured ? "ring-[3px] ring-accent" : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-extrabold">{plan.name}</h3>
                {plan.badge && (
                  <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px] sm:tracking-[0.09em] text-ink">
                    {plan.badge}
                  </span>
                )}
                {plan.crown && <CrownIcon className="h-5 w-5 text-primary" />}
                <Button
                  href={EJEMPLO_WEB_LINK}
                  external
                  variant="chip"
                  aria-label={`Ver ejemplo de una tienda con el plan ${plan.name}`}
                  className="ml-auto"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-4 w-4 text-primary transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/btn:scale-125 motion-reduce:transition-none motion-reduce:group-hover/btn:scale-100"
                  >
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Ver ejemplo
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <p className="text-[32px] font-extrabold leading-none">
                  {peso(anual ? plan.anual / 12 : plan.mensual)}
                  <span className="text-base font-bold text-ink-soft">/mes</span>
                </p>
                {anual && (
                  <p className="text-sm font-semibold text-ink-muted line-through decoration-2">
                    {peso(plan.mensual)}
                  </p>
                )}
              </div>
              <p className="mt-2 text-xs font-semibold text-ink-muted">
                {anual
                  ? `Pagás ${peso(plan.anual)} una vez al año · ahorrás ${peso(plan.mensual * 12 - plan.anual)}`
                  : plan.commitment}
              </p>

              <div className="mt-5 flex-1 border-t border-ink/10 pt-4">
                <ul className="space-y-1.5">
                  {plan.features.map((item) => {
                    const feature = item.text ?? item
                    return (
                      <li
                        key={feature}
                        className={`flex items-center gap-2.5 text-sm ${
                          item.isNew ? "font-semibold" : "font-normal"
                        }`}
                      >
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
                        {item.strong ? (
                          <span>
                            {feature.split(item.strong)[0]}
                            <strong className="font-bold">{item.strong}</strong>
                            {feature.split(item.strong)[1]}
                          </span>
                        ) : (
                          feature
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {(anual ? anualActions(plan) : plan.actions).map((action, i) => (
                  <div key={action.label}>
                    {action.note && (
                      <p className="mb-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-ink-soft">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className="h-3.5 w-3.5 flex-none text-accent"
                        >
                          <path
                            d="m5 13 4 4 10-10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action.note}
                      </p>
                    )}
                    <Button
                      href={action.href}
                      external={action.external}
                      variant={i === 0 ? "primary" : "secondary"}
                      block
                    >
                      {action.label}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
