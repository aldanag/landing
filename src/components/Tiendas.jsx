import { useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import Segmented from "./Segmented"
import { tiendasEjemplo } from "../lib/tiendas"
import { ETIQUETA } from "../lib/pastillas"
import Button from "./Button"

// Cinta de cuadrados oscuros que pasa sola de costado (efecto portfolio). Cada uno muestra la tienda en
// escritorio y en celular, con el rubro y «Ver tienda» adentro. Se frena al pasar el mouse o al enfocar un
// enlace. Con "reducir movimiento" no se anima: queda una fila que se desliza con el dedo.
// El interruptor Básico / Premium está siempre. Si un plan todavía no tiene tiendas, se muestra un aviso
// con un enlace a las funciones Premium (se sumas tiendas en src/lib/tiendas.js con plan: "Premium").
const PLANES = ["Básico", "Premium"]
const REPETICIONES = 2 // cuántas veces se repite la lista en cada mitad, para que la cinta llene la pantalla
const SEGUNDOS_POR_TIENDA = 14

// Fondo liso: el azul oscuro de la marca, sin brillos.
const FONDO = { backgroundColor: "var(--color-night-2)" }

const Candado = () => (
  <svg viewBox="0 0 24 24" className="h-[2.2cqw] w-[2.2cqw] flex-none" fill="currentColor" aria-hidden="true">
    <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h6V8a3 3 0 0 0-6 0v2Z" />
  </svg>
)

function Tarjeta({ t, oculta }) {
  const dominio = new URL(t.url).hostname
  return (
    <article aria-hidden={oculta || undefined} className="w-[19rem] flex-none sm:w-[24rem]">
      <a
        href={t.url}
        target="_blank"
        rel="noreferrer"
        tabIndex={oculta ? -1 : undefined}
        aria-label={`Ver la tienda ${t.nombre}, ${t.rubro.toLowerCase()}`}
        className="group relative block aspect-[100/92] ring-1 ring-white/10 cursor-pointer overflow-hidden rounded-[2rem] focus-ring [container-type:inline-size]"
        style={FONDO}
      >
        {/* Escritorio, con la barra del navegador y la dirección de la tienda */}
        <div className="absolute left-[9.5%] top-[19.5cqw] aspect-[16/10] w-[81%] overflow-hidden rounded-2xl bg-white ring-1 ring-white/20 [container-type:inline-size]">
          <div className="flex h-full flex-col">
            <div className="flex h-[10.5%] flex-none items-center gap-[2cqw] bg-[#F2F2F7] px-[2.4cqw]">
              <span className="flex gap-[1cqw]">
                {[0, 1, 2].map((i) => (
                  <i key={i} className="block h-[1.4cqw] w-[1.4cqw] rounded-full bg-ink/25" />
                ))}
              </span>
              <span className="mx-auto flex h-[78%] w-[52%] items-center justify-center gap-[1cqw] rounded-full bg-white px-[2cqw] text-[2.4cqw] font-medium leading-none text-ink-soft ring-1 ring-ink/10">
                <Candado />
                <span className="truncate">{dominio}</span>
              </span>
              <span className="w-[6cqw]" />
            </div>
            <img
              src={t.escritorio}
              alt=""
              width="720"
              height="450"
              loading="lazy"
              draggable="false"
              className="min-h-0 w-full flex-1 object-cover object-top"
            />
          </div>
        </div>

        {/* Celular con el marco de las imágenes Premium (hora, isla y señal), cortado por el borde de abajo */}
        <div className="absolute right-[6cqw] top-[52cqw] w-[26cqw] rounded-t-[4.4cqw] bg-marco-celu px-[1.2cqw] pt-[1.2cqw]">
          <div className="overflow-hidden rounded-t-[3.3cqw] bg-white">
            <div
              aria-hidden="true"
              className="relative flex h-[3.9cqw] items-center justify-between bg-white pl-[2.4cqw] pr-[2cqw] text-[max(6.5px,1.5cqw)] font-extrabold leading-none text-ink"
            >
              <span>9:41</span>
              <span className="absolute left-1/2 top-[0.8cqw] h-[2cqw] w-[26%] -translate-x-1/2 rounded-full bg-isla" />
              <span className="flex items-center gap-[max(2px,0.5cqw)]">
                {/* Señal: cuatro rayas separadas */}
                <svg viewBox="0 0 17 11" className="h-[max(3.8px,0.95cqw)] w-auto" fill="currentColor">
                  <rect x="0" y="7.5" width="3" height="3.5" rx="0.8" />
                  <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
                  <rect x="9.2" y="2.5" width="3" height="8.5" rx="0.8" />
                  <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
                </svg>
                {/* Batería chiquita, con su punta */}
                <svg viewBox="0 0 26 12" className="h-[max(3.8px,0.95cqw)] w-auto" fill="none">
                  <rect x="0.7" y="0.7" width="21.6" height="10.6" rx="3" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="2.8" y="2.8" width="17.4" height="6.4" rx="1.6" fill="currentColor" />
                  <rect x="23.4" y="4" width="2" height="4" rx="1" fill="currentColor" />
                </svg>
              </span>
            </div>
            <img
              src={t.movil}
              alt=""
              width="360"
              height="760"
              loading="lazy"
              draggable="false"
              className="block w-full"
            />
          </div>
        </div>

        <span className="absolute left-[9.5%] top-[7cqw] rounded-full bg-white/10 px-3 py-1 text-[13px] font-semibold text-white ring-1 ring-white/25">
          {t.rubro}
        </span>

        <span className={`absolute right-[9.5%] top-[7cqw] ${ETIQUETA}`}>
          Plan {t.plan}
        </span>

        <span className="absolute bottom-[7cqw] left-[9.5%] inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none">
          Ver tienda
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </article>
  )
}

export default function Tiendas() {
  const root = useRef(null)
  useReveal(root)

  const [plan, setPlan] = useState(PLANES[0])
  const visibles = tiendasEjemplo.filter((t) => t.plan === plan)
  const mitad = Array.from({ length: REPETICIONES }).flatMap(() => visibles)

  return (
    <section id="tiendas" ref={root} className="overflow-hidden bg-ink py-16 md:py-[4.5rem]">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span
              data-reveal
              className={ETIQUETA}
            >
              Tiendas
            </span>
            <h2
              data-words
              className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
            >
              Tiendas hechas con Lemora.
            </h2>
          </div>

          <div data-reveal className="flex">
            <Segmented
              label="Plan de las tiendas"
              value={plan}
              onChange={setPlan}
              options={PLANES.map((p) => ({ id: p, label: p, on: p === "Premium" ? "bg-primary text-white" : "bg-ink text-white" }))}
            />
          </div>
        </div>
      </div>

      {visibles.length > 0 ? (
        <div
          data-reveal
          className="tiendas-ventana mt-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            key={plan}
            className="tiendas-cinta flex w-max"
            style={{ animationDuration: `${visibles.length * SEGUNDOS_POR_TIENDA}s` }}
          >
            {[0, 1].map((m) => (
              <div key={m} className={`flex gap-5 pr-5 ${m ? "tiendas-copia" : ""}`}>
                {mitad.map((t, i) => (
                  <Tarjeta key={`${m}-${i}`} t={t} oculta={m === 1 || i >= visibles.length} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-start gap-4 rounded-[2rem] bg-white p-6 ring-1 ring-ink/10 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-lg font-bold text-ink md:text-xl">
                Estamos preparando las primeras tiendas Premium.
              </p>
              <p className="mt-1 text-base text-ink-soft">
                Mientras tanto, mirá todo lo que suma este plan.
              </p>
            </div>
            <Button href="#premium" variant="dark" className="flex-none">
              Ver funciones Premium
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
