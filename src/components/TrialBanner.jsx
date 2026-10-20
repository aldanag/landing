import { useRef } from "react"
import { gsap, REDUCED_MOTION_OFF, ScrollTrigger, useGSAP, useReveal } from "../lib/motion"
import agachada from "../assets/mascota-agachada.webp"
import estirada from "../assets/mascota-estirada.webp"
import Button from "./Button"

const WHATSAPP_START_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20empezar%20gratis%20con%20Lemora"

const checks = ["Sin tarjeta", "Sin comisiones por venta", "Vos elegís cómo vender"]

export default function TrialBanner() {
  const root = useRef(null)
  useReveal(root, { y: 40, scale: 0.98 })

  // La mascota salta y rebota con "squash & stretch"; la sombra se achica cuando está en el aire.
  // Solo corre mientras el banner está a la vista. Con "reducir movimiento" queda quieta.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_OFF, () => {
        const m = "[data-mascota]"
        const s = "[data-sombra]"
        const agach = "[data-pose=agachada]"
        const estir = "[data-pose=estirada]"
        gsap.set(m, { transformOrigin: "50% 100%", force3D: true })
        gsap.set(agach, { opacity: 1 })
        gsap.set(estir, { opacity: 0 })
        // Un salto continuo: anticipación, subida, un instante en el aire, caída, aplastarse al
        // tocar, un saltito chico y un asentado elástico. Las poses se funden (no cortan).
        const cruz = (haciaAire, dur = 0.12) => [
          [haciaAire ? estir : agach, { opacity: 1, duration: dur, ease: "none" }],
          [haciaAire ? agach : estir, { opacity: 0, duration: dur, ease: "none" }],
        ]
        const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { overwrite: "auto" } })
        tl.to(m, { scaleY: 0.94, scaleX: 1.03, duration: 0.24, ease: "sine.inOut" })
          .to(m, { y: -30, scaleY: 1.025, scaleX: 0.985, duration: 0.46, ease: "power2.out" })
          .to(s, { scale: 0.55, opacity: 0.4, duration: 0.46, ease: "power2.out" }, "<")
        for (const [t, v] of cruz(true)) tl.to(t, v, "<")
        tl.to(m, { y: -33, duration: 0.14, ease: "sine.inOut" })
          .to(m, { y: 0, scaleY: 1, scaleX: 1, duration: 0.4, ease: "power2.in" })
          .to(s, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.in" }, "<")
        for (const [t, v] of cruz(false, 0.14)) tl.to(t, v, ">-0.14")
        tl.to(m, { scaleY: 0.9, scaleX: 1.07, duration: 0.1, ease: "power2.out" })
          .to(m, { y: -9, scaleY: 1.02, scaleX: 0.99, duration: 0.22, ease: "power2.out" })
          .to(m, { y: 0, scaleY: 1, scaleX: 1, duration: 0.2, ease: "power2.in" })
          .to(m, { scaleY: 0.96, scaleX: 1.03, duration: 0.07, ease: "power1.out" })
          .to(m, { scaleY: 1, scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" })
          .to({}, { duration: 0.6 })
        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top 85%",
          end: "bottom 10%",
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        })
        return () => {
          trigger.kill()
          tl.kill()
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div
          data-reveal
          className="relative grid gap-10 rounded-[2.5rem] bg-ink p-5 text-white sm:p-8 md:grid-cols-2 md:items-center md:p-14"
        >
          <div className="relative">
            <span className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink">
              Tu momento es ahora
            </span>
            <h2 className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold leading-tight md:text-[34px]">
              Probá tu tienda gratis durante 30 días
            </h2>
            <p className="mt-4 text-base text-white/70">
              Creá tu tienda, cargá tus productos o servicios y recibí pedidos o turnos. Y empezá a
              vender como nunca, con la libertad de trabajar como quieras.
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
            {/* Mascota: salta encima de la esquina de la card. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-0 z-10 w-[8.5rem] sm:right-4 sm:w-40"
            >
              <span
                data-sombra
                className="absolute left-1/2 top-[6rem] h-5 w-24 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(78_70_190/0.34),transparent)] sm:top-[6.5rem] sm:w-28"
              />
              <div data-mascota className="will-change-transform relative -mt-8 sm:-mt-12">
                <img
                  data-pose="agachada"
                  src={agachada}
                  alt=""
                  width="560"
                  height="567"
                  className="absolute inset-0 w-full opacity-0"
                />
                <img
                  data-pose="estirada"
                  src={estirada}
                  alt=""
                  width="560"
                  height="567"
                  className="w-full"
                />
              </div>
            </div>
            <span className="inline-block rounded-full bg-lime px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px] sm:tracking-[0.09em] text-ink">
              Prueba completa
            </span>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-[56px] font-bold leading-none">1</span>
              <span className="pb-1 text-xl font-bold">mes gratis</span>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Acceso al plan Básico completo: tu tienda configurable desde el panel, productos
              ilimitados y pedidos por WhatsApp.
              <span className="block">No necesitás conocimientos técnicos.</span>
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
              Sin tarjeta, probalo sin compromiso
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
