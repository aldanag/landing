import { useEffect, useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import { tiendasEjemplo } from "../lib/tiendas"
import { ETIQUETA } from "../lib/pastillas"
import IconButton from "./IconButton"

// Carrusel de cuadrados oscuros (efecto portfolio). Cada uno muestra la tienda en escritorio y en celular, con el rubro y
// «Ver tienda» adentro. Se puede arrastrar (mouse o dedo) y tiene puntitos abajo; sola avanza de a una tienda cada pocos
// segundos, y se frena al tocarla, pasar el mouse o enfocar un enlace (y con "reducir movimiento" no avanza sola).
// Hay pocas tiendas, así que van todas juntas (sin interruptor por plan); cada tarjeta dice su plan.
// Las tiendas se suman en src/lib/tiendas.js con plan: "Básico" o "Premium".
const SEGUNDOS_ENTRE_TIENDAS = 4.5
const SEGUNDOS_DE_PAUSA_TRAS_TOCAR = 9

// Fondo liso: el azul oscuro de la marca, sin brillos.
const FONDO = { backgroundColor: "var(--color-night-2)" }

const Flecha = ({ giro = 0 }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5" style={{ transform: `rotate(${giro}deg)` }}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Candado = () => (
  <svg viewBox="0 0 24 24" className="h-[2.2cqw] w-[2.2cqw] flex-none" fill="currentColor" aria-hidden="true">
    <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h6V8a3 3 0 0 0-6 0v2Z" />
  </svg>
)

function Tarjeta({ t }) {
  const dominio = new URL(t.url).hostname
  return (
    <article className="w-[19rem] flex-none snap-start sm:w-[24rem]">
      <a
        href={t.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ver la tienda ${t.nombre}, ${t.rubro.toLowerCase()}`}
        draggable="false"
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
  const pista = useRef(null)
  const arrastre = useRef({ activo: false, x0: 0, scroll0: 0, movido: false })
  const ultimoToque = useRef(0)
  const quieto = useRef(false) // el mouse está encima o hay un enlace enfocado
  const visible = useRef(false)
  const [pasos, setPasos] = useState({ paginas: tiendasEjemplo.length, paso: 1 })
  const [activa, setActiva] = useState(0)
  useReveal(root)

  // Cuánto mide un paso (de una tarjeta a la siguiente) y cuántas posiciones hay hasta el final.
  useEffect(() => {
    const el = pista.current
    if (!el) return
    const medir = () => {
      const tarjetas = el.querySelectorAll("article")
      if (tarjetas.length < 2) return setPasos({ paginas: 1, paso: 1 })
      const paso = tarjetas[1].offsetLeft - tarjetas[0].offsetLeft
      const maximo = el.scrollWidth - el.clientWidth
      setPasos({ paginas: Math.max(1, Math.round(maximo / paso) + 1), paso })
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const alScrollear = () => {
    const el = pista.current
    setActiva(Math.min(pasos.paginas - 1, Math.max(0, Math.round(el.scrollLeft / pasos.paso))))
  }

  const ir = (i) => pista.current?.scrollTo({ left: i * pasos.paso, behavior: "smooth" })
  const mover = (d) => {
    ultimoToque.current = Date.now()
    ir(Math.min(pasos.paginas - 1, Math.max(0, activa + d)))
  }

  // Avanza sola, de a una tienda, mientras está a la vista y nadie la toca.
  useEffect(() => {
    const el = pista.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    const id = setInterval(() => {
      if (!visible.current || quieto.current || document.hidden) return
      if (Date.now() - ultimoToque.current < SEGUNDOS_DE_PAUSA_TRAS_TOCAR * 1000) return
      const siguiente = Math.round(el.scrollLeft / pasos.paso) + 1
      el.scrollTo({ left: siguiente >= pasos.paginas ? 0 : siguiente * pasos.paso, behavior: "smooth" })
    }, SEGUNDOS_ENTRE_TIENDAS * 1000)
    return () => {
      io.disconnect()
      clearInterval(id)
    }
  }, [pasos])

  // Arrastrar con el mouse (con el dedo ya se desliza solo).
  const alApretar = (e) => {
    ultimoToque.current = Date.now()
    if (e.pointerType !== "mouse" || e.button !== 0) return
    const el = pista.current
    arrastre.current = { activo: true, x0: e.clientX, scroll0: el.scrollLeft, movido: false }
    el.style.scrollSnapType = "none"
    el.setPointerCapture(e.pointerId)
  }
  const alMover = (e) => {
    const a = arrastre.current
    if (!a.activo) return
    const dx = e.clientX - a.x0
    if (Math.abs(dx) > 5) a.movido = true
    pista.current.scrollLeft = a.scroll0 - dx
  }
  const alSoltar = (e) => {
    const a = arrastre.current
    if (!a.activo) return
    a.activo = false
    const el = pista.current
    el.releasePointerCapture?.(e.pointerId)
    el.style.scrollSnapType = ""
    el.scrollTo({ left: Math.round(el.scrollLeft / pasos.paso) * pasos.paso, behavior: "smooth" })
  }
  // Si se arrastró, el soltar no cuenta como un clic en «Ver tienda».
  const alHacerClic = (e) => {
    if (arrastre.current.movido) {
      e.preventDefault()
      e.stopPropagation()
      arrastre.current.movido = false
    }
  }

  return (
    <section id="tiendas" ref={root} className="overflow-hidden bg-ink py-16 md:py-[4.5rem]">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span data-reveal className={ETIQUETA}>
              Tiendas
            </span>
            <h2
              data-words
              className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
            >
              Tiendas hechas con Lemora.
            </h2>
          </div>

          {/* Flechas: van donde estaba el interruptor de planes */}
          <div data-reveal className="flex gap-3">
            <IconButton label="Tienda anterior" onClick={() => mover(-1)} disabled={activa <= 0}>
              <Flecha />
            </IconButton>
            <IconButton label="Tienda siguiente" onClick={() => mover(1)} disabled={activa >= pasos.paginas - 1}>
              <Flecha giro={180} />
            </IconButton>
          </div>
        </div>
      </div>

      <div
        ref={pista}
        data-reveal
        role="region"
        aria-label="Tiendas hechas con Lemora"
        onScroll={alScrollear}
        onPointerDown={alApretar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        onClickCapture={alHacerClic}
        onMouseEnter={() => (quieto.current = true)}
        onMouseLeave={() => (quieto.current = false)}
        onFocusCapture={() => (quieto.current = true)}
        onBlurCapture={() => (quieto.current = false)}
        onWheel={() => (ultimoToque.current = Date.now())}
        className="mt-10 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-1 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInline: "max(1rem, calc((100% - 72rem) / 2 + 1.5rem))",
          scrollPaddingInline: "max(1rem, calc((100% - 72rem) / 2 + 1.5rem))",
        }}
      >
        {tiendasEjemplo.map((t) => (
          <Tarjeta key={t.url} t={t} />
        ))}
      </div>

      {/* Puntitos: uno por posición del carrusel */}
      <div data-reveal className="mt-6 flex justify-center gap-1">
        {Array.from({ length: pasos.paginas }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              ultimoToque.current = Date.now()
              ir(i)
            }}
            aria-label={`Ir a la posición ${i + 1} de ${pasos.paginas}`}
            aria-current={activa === i}
            className="group flex h-6 w-6 cursor-pointer items-center justify-center rounded-full focus-ring-inverse"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                activa === i ? "w-6 bg-white" : "w-2.5 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
