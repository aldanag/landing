import { useRef } from "react"
import ImagePlaceholder from "./ImagePlaceholder"
import CheckIcon from "./CheckIcon"
import WhatsAppIcon from "./WhatsAppIcon"
import fondo2000 from "../assets/hero-fondo-2000.webp"
import fondo1200 from "../assets/hero-fondo-1200.webp"
import fondoMovil from "../assets/hero-fondo-movil.webp"
import chica1100 from "../assets/hero-chica-1100.webp"
import chica700 from "../assets/hero-chica-700.webp"
import { gsap, REDUCED_MOTION_OFF, REDUCED_MOTION_ON, useGSAP } from "../lib/motion"
import Button from "./Button"

const WHATSAPP_TRIAL_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20probar%20Lemora%20gratis"

const fondoSrcSet = `${fondo1200} 1200w, ${fondo2000} 2000w`
const chicaSrcSet = `${chica700} 542w, ${chica1100} 851w`

// La chica va recortada, en su propia capa: los trazos lima pasan por detrás.
function Chica({ className }) {
  return (
    <div data-art="girl" aria-hidden="true" className={`absolute ${className}`}>
      <img
        src={chica1100}
        srcSet={chicaSrcSet}
        sizes="(min-width: 1024px) 28vw, 60vw"
        alt=""
        width="851"
        height="1100"
        className="h-full w-auto max-w-none"
      />
    </div>
  )
}

// Tarjetas decorativas. Se usan dos veces: sobre la foto (escritorio) y debajo
// del texto (celular); cada layout pasa sus posiciones.
function Tarjetas({ product, pill, whatsapp, show = "all", compact = false }) {
  // En celular (compact) las tarjetas son más chicas; desde sm vuelven a su tamaño normal.
  const t = compact
    ? {
        card: "rounded-xl p-1.5 sm:rounded-2xl sm:p-2",
        img: "h-7 sm:h-14",
        name: "mt-1 truncate text-[8px] sm:mt-1.5 sm:text-[10px]",
        price: "text-[8px] sm:text-[10px]",
        btn: "mt-1 py-px text-[8px] sm:mt-1.5 sm:py-1 sm:text-[10px]",
        pill: "gap-1.5 py-1 pl-1 pr-3 text-xs sm:gap-2 sm:py-2 sm:pl-2 sm:pr-4 sm:text-sm",
        check: "h-4 w-4 sm:h-6 sm:w-6",
        wa: "gap-2 rounded-xl p-2 sm:gap-2.5 sm:rounded-2xl sm:p-3",
        waIcon: "h-7 w-7 sm:h-9 sm:w-9",
        waName: "text-[11px] sm:text-xs",
        waSub: "text-[10px] sm:text-[11px]",
      }
    : {
        card: "rounded-2xl p-2",
        img: "h-14",
        name: "mt-1.5 text-[10px]",
        price: "text-[10px]",
        btn: "mt-1.5 py-1 text-[10px]",
        pill: "gap-2 py-2 pl-2 pr-4 text-sm",
        check: "h-6 w-6",
        wa: "gap-2.5 rounded-2xl p-3",
        waIcon: "h-9 w-9",
        waName: "text-xs",
        waSub: "text-[11px]",
      }
  const withProduct = show !== "rest"
  const withRest = show !== "product"
  return (
    <>
      {withProduct && (
        <div
          data-art="float"
          className={`absolute bg-white shadow-xl shadow-ink/10 ${t.card} ${product}`}
        >
          <ImagePlaceholder className={t.img} />
          <p className={`font-semibold text-ink-soft ${t.name}`}>Nombre del producto</p>
          <p className={`text-ink-muted ${t.price}`}>$ Precio</p>
          <div className={`rounded-full bg-primary text-center font-semibold text-white ${t.btn}`}>
            Agregar al carrito
          </div>
        </div>
      )}

      {withRest && (
        <>
          <div
            data-art="float"
            className={`absolute flex items-center rounded-full bg-ink font-semibold text-white shadow-xl shadow-ink/10 ${t.pill} ${pill}`}
          >
            <CheckIcon className={t.check} />
            Sin comisiones
          </div>

          <div
            data-art="float"
            className={`absolute flex items-center bg-white shadow-xl shadow-ink/10 ${t.wa} ${whatsapp}`}
          >
            <WhatsAppIcon className={`flex-none ${t.waIcon}`} />
            <span className="min-w-0 flex-1">
              <span className={`block whitespace-nowrap font-semibold text-ink ${t.waName}`}>
                WhatsApp
              </span>
              <span className={`block whitespace-nowrap text-ink-muted ${t.waSub}`}>
                Nuevo pedido
              </span>
            </span>
            <span className="self-start whitespace-nowrap text-[10px] text-ink-muted">ahora</span>
          </div>
        </>
      )}
    </>
  )
}

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        REDUCED_MOTION_OFF,
        () => {
          const q = (sel) => gsap.utils.toArray(sel, root.current)
          const ribbons = q("[data-art=ribbon]")
          const floats = q("[data-art=float]")
          ribbons.forEach((path) => {
            const length = path.getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            })
          })

          // Un solo momento de entrada: los títulos suben, la foto se asienta con
          // un zoom lento, los trazos lima se dibujan y las tarjetas aparecen.
          const fade = { clearProps: "opacity,transform" }
          gsap
            .timeline({
              defaults: { ease: "expo.out" },
              onComplete: () => {
                // Flotación lenta y apenas perceptible.
                floats.forEach((el, i) =>
                  gsap.to(el, {
                    y: i % 2 ? -7 : 7,
                    duration: 3 + (i % 3) * 0.7,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                  }),
                )
              },
            })
            .from(
              "[data-art=bg]",
              {
                scale: 1.06,
                duration: 2,
                ease: "power2.out",
                clearProps: "transform",
              },
              0,
            )
            .from(
              "[data-art=girl]",
              {
                yPercent: 8,
                opacity: 0,
                duration: 1.4,
                stagger: 0.1,
                ...fade,
                clearProps: "opacity",
              },
              0.2,
            )
            .from("[data-hero=badge]", { y: 16, opacity: 0, duration: 0.8, ...fade }, 0)
            .from("[data-hero=line]", { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.1)
            .from(
              "[data-hero=sub]",
              { y: 20, opacity: 0, duration: 0.9, stagger: 0.08, ...fade },
              0.45,
            )
            .to(
              ribbons,
              {
                strokeDashoffset: 0,
                duration: 2,
                stagger: 0.25,
                ease: "power2.inOut",
              },
              0.5,
            )
            .from(
              floats,
              {
                y: 28,
                opacity: 0,
                scale: 0.9,
                duration: 0.9,
                stagger: 0.12,
                ease: "back.out(1.5)",
                ...fade,
              },
              0.9,
            )

          // Con el scroll, cada capa sube a una velocidad distinta (muy leve).
          // Usa y/yPercent para no pisar la flotación (y) ni el mouse (x).
          const scrub = {
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            ease: "none",
          }
          ribbons.forEach((el, i) => gsap.to(el, { y: i ? -30 : -18, ...scrub }))
          floats.forEach((el, i) => gsap.to(el, { yPercent: [-22, -34, -14][i % 3], ...scrub }))
          // La foto, que es lo más lejano, se mueve menos que todo lo demás.
          gsap.to("[data-parallax=bg]", { yPercent: 6.5, ...scrub })
          q("[data-art=girl]").forEach((el) => gsap.to(el, { y: 36, ...scrub }))

          // Las tarjetas se mueven un poco distinto con el mouse: da profundidad.
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            const layers = floats.map((el, i) => ({
              depth: [14, -18, -12][i % 3],
              to: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
            }))
            const panel = root.current.firstElementChild
            const onMove = (e) => {
              const box = panel.getBoundingClientRect()
              const n = (e.clientX - box.left) / box.width - 0.5
              layers.forEach((l) => l.to(n * l.depth * 2))
            }
            const onLeave = () => layers.forEach((l) => l.to(0))
            panel.addEventListener("pointermove", onMove, { passive: true })
            panel.addEventListener("pointerleave", onLeave)
            return () => {
              panel.removeEventListener("pointermove", onMove)
              panel.removeEventListener("pointerleave", onLeave)
            }
          }
        },
        root,
      )

      // Con "reducir movimiento": un fundido corto, sin desplazamientos.
      mm.add(
        REDUCED_MOTION_ON,
        () => {
          gsap.from("[data-hero], [data-art=float]", {
            opacity: 0,
            duration: 0.7,
            ease: "power1.out",
            stagger: 0.08,
            clearProps: "opacity",
          })
        },
        root,
      )
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="px-3 pt-[4.5rem] md:px-5 md:pt-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/10 md:rounded-[2.5rem] lg:min-h-[31rem]">
        {/* Celular: la foto es el fondo de todo el panel. Arriba un velo blanco la apaga para que el
            texto se lea; abajo se ve completa. */}
        <div data-art="bg" aria-hidden="true" className="absolute inset-0 lg:hidden">
          <img
            src={fondoMovil}
            alt=""
            width="906"
            height="600"
            className="h-full w-full scale-110 object-cover object-[60%_30%] blur-[2.5px]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-white via-white/85 via-45% to-transparent to-62%" />
        </div>

        {/* Escritorio: la foto cubre todo el panel, corrida para que ella quede a la derecha.
            Un velo blanco mínimo, solo del lado del texto, para que se lea. */}
        <div data-art="bg" aria-hidden="true" className="absolute inset-0 hidden lg:block">
          <img
            src={fondo2000}
            srcSet={fondoSrcSet}
            sizes="115vw"
            alt=""
            width="2000"
            height="848"
            fetchPriority="high"
            data-parallax="bg"
            className="absolute -top-[8%] left-0 h-[116%] w-[115%] max-w-none object-cover object-[0%_30%] blur-[3px]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/70 via-white/35 via-35% to-transparent to-55%" />
        </div>

        {/* Un solo trazo lima que entra desde abajo, pasa por detrás de ella y sale por el borde derecho. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1400 500"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          <path
            data-art="ribbon"
            d="M650 540C650 450 740 405 860 410C980 415 1040 470 1110 450C1180 430 1195 340 1245 322C1300 304 1320 250 1275 248C1235 246 1245 305 1300 272C1340 248 1390 215 1440 190"
            stroke="#e3f547"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Tarjeta de producto: queda detrás de la chica (escritorio). */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          <Tarjetas
            show="product"
            product="left-[45%] top-[4%] w-40 xl:left-[46%] xl:top-[8%] xl:w-44"
          />
        </div>

        {/* La chica, delante de los trazos y de la tarjeta (escritorio). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
        >
          <Chica className="bottom-0 right-[12%] h-[97%] xl:right-[16%] 2xl:right-[18%]" />
        </div>

        {/* El resto de las tarjetas, delante de ella (escritorio). */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          <Tarjetas
            show="rest"
            pill="right-[3%] top-[27%]"
            whatsapp="right-[2%] bottom-[12%] w-60"
          />
        </div>

        <div className="relative mx-auto flex max-w-[88rem] flex-col items-center gap-5 px-4 pt-7 pb-0 md:pt-14 lg:gap-10 lg:min-h-[31rem] lg:py-14 lg:flex-row lg:px-8">
          <div className="relative z-10 text-center lg:max-w-[46%] lg:text-left">
            <span
              data-hero="badge"
              className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink max-[359px]:text-[11px] max-[359px]:tracking-[0.05em] max-[299px]:text-[10px] max-[299px]:tracking-[0.02em]"
            >
              Hecha para emprendedores
            </span>
            <h1 className="mt-4 text-[clamp(22px,calc((100vw_-_56px)/8.2),34px)] font-bold leading-[1.05] text-ink md:text-[52px] xl:text-[64px] 2xl:text-[72px]">
              <span className="-mb-1 block overflow-hidden pb-1">
                <span data-hero="line" className="block">
                  Tu tienda online.
                </span>
              </span>
              <span className="-mb-1 block overflow-hidden pb-1">
                <span data-hero="line" className="block">
                  Sin comisiones.
                </span>
              </span>
            </h1>
            <p
              data-hero="sub"
              className="mx-auto mt-3 max-w-xl text-base font-semibold max-[359px]:text-[15px] md:mt-4 text-ink md:text-[21px] lg:mx-0 xl:text-[22px] 2xl:text-[24px]"
            >
              Tu cliente hace el pedido online y vos lo recibís directo en WhatsApp.
            </p>

            <div
              data-hero="sub"
              className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:mt-6 sm:flex-row sm:gap-x-5 lg:justify-start"
            >
              <Button href={WHATSAPP_TRIAL_LINK} external size="lg">
                Probar gratis 1 mes
              </Button>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
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
                Sin tarjeta
              </p>
            </div>
          </div>

          {/* Celular: la chica va en la parte baja del panel, escalada y cortada por abajo; la
              tarjeta de producto queda detrás de ella, igual que en escritorio. */}
          <div
            aria-hidden="true"
            className="relative -mx-4 h-[15rem] w-[calc(100%+2rem)] sm:h-[26rem] lg:hidden"
          >
            <Tarjetas
              compact
              show="product"
              product="left-2 top-[4%] w-[5.5rem] sm:left-[12%] sm:top-[10%] sm:w-40"
            />
            <Chica className="inset-x-0 mx-auto -bottom-7 h-[18rem] w-fit sm:-bottom-24 sm:h-[34rem]" />
            <Tarjetas
              compact
              show="rest"
              pill="right-3 top-[34%] sm:right-[10%] sm:top-[36%]"
              whatsapp="bottom-6 left-3 w-[10.5rem] sm:bottom-6 sm:left-[10%] sm:w-60"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
