import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"
import CheckIcon from "./CheckIcon"
import ventaDirecta from "../assets/ps-venta-directa.webp"
import simplicidad from "../assets/ps-simplicidad.webp"
import costos from "../assets/ps-costos.webp"
import confusion from "../assets/ps-confusion.webp"
import marketplace from "../assets/ps-marketplace.webp"
import precios from "../assets/ps-precios.webp"

const pares = [
  {
    tag: "Venta directa",
    tagSin: "Intermediarios",
    imgSin: marketplace,
    altSin: "Una emprendedora preocupada con un paquete devuelto y el celular en la mano",
    img: ventaDirecta,
    alt: "Un emprendedor recibe un pedido nuevo por WhatsApp en su celular",
    problema: {
      title: "Marketplaces que no te cuidan",
      body: "Comisiones por cada venta, reclamos injustos y devoluciones falsas.",
    },
    solucion: {
      title: "Vendé directo por WhatsApp",
      body: "Tu cliente arma el pedido y te llega completo a WhatsApp. Cobrás como quieras, sin comisiones ni intermediarios.",
    },
  },
  {
    tag: "Simplicidad",
    tagSin: "Confusión",
    imgSin: confusion,
    altSin: "Una emprendedora confundida entre cajas y materiales, sin saber por dónde empezar",
    img: simplicidad,
    alt: "Una emprendedora carga sus productos desde la computadora",
    problema: {
      title: "Un mercado lleno de confusión",
      body: "Agencias, programadores y plataformas: demasiadas opciones y ninguna clara.",
    },
    solucion: {
      title: "No necesitás ser un genio tecnológico",
      body: "Configurás tu tienda y cargás tus productos o servicios desde un panel simple, sin complicaciones.",
    },
  },
  {
    tag: "Costos bajos",
    tagSin: "Costos altos",
    imgSin: precios,
    altSin: "Un emprendedor preocupado frente a la computadora, mirando presupuestos",
    img: costos,
    alt: "Un emprendedor sonríe frente a su computadora, con una tele de fondo",
    problema: {
      title: "Precios que no tienen sentido",
      body: "Presupuestos que cambian según a quién le preguntes, más comisiones y mantenimiento.",
    },
    solucion: {
      title: "Más barato que tu plataforma de streaming",
      body: "Un precio claro desde $9.000 por mes, y el primer mes es gratis. Sin tarjeta ni obligaciones, cancelás cuando quieras.",
    },
  },
]

// Cada estado ocupa la misma celda de la grilla: la card no cambia de alto al alternar.
const fade = "transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none"

function Interruptor({ conLemora, onChange }) {
  const base =
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-ring motion-reduce:transition-none"
  return (
    <div
      role="group"
      aria-label="Comparar"
      className="inline-flex flex-none rounded-full bg-white p-1 ring-1 ring-ink/10"
    >
      <button
        type="button"
        aria-pressed={!conLemora}
        onClick={() => onChange(false)}
        className={`${base} ${!conLemora ? "bg-ink text-white" : "text-ink-soft hover:text-ink"}`}
      >
        Sin Lemora
      </button>
      <button
        type="button"
        aria-pressed={conLemora}
        onClick={() => onChange(true)}
        className={`${base} ${conLemora ? "bg-primary text-white" : "text-ink-soft hover:text-ink"}`}
      >
        Con Lemora
      </button>
    </div>
  )
}

export default function ProblemaSolucion() {
  const root = useRef(null)
  const tocado = useRef(false)
  const [conLemora, setConLemora] = useState(false)
  useReveal(root)

  // Al llegar a la sección, pasa sola de "Sin Lemora" a "Con Lemora" (una vez), salvo que la
  // persona ya haya tocado el interruptor.
  useEffect(() => {
    const el = root.current
    if (!el || !("IntersectionObserver" in window)) return
    let timer
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        timer = setTimeout(() => {
          if (!tocado.current) setConLemora(true)
        }, 1400)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const cambiar = (valor) => {
    tocado.current = true
    setConLemora(valor)
  }

  return (
    <section id="por-que-lemora" ref={root} className="bg-mist py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div>
            <span
              data-reveal
              className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
            >
              Por qué Lemora
            </span>
            <h2
              data-words
              className="mx-auto mt-4 max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
            >
              Vender online no debería ser tan complicado.
            </h2>
          </div>
          <div data-reveal className="hidden md:block">
            <Interruptor conLemora={conLemora} onChange={cambiar} />
          </div>
        </div>
      </div>

      {/* Celular: el interruptor queda fijo debajo del menú mientras se recorre la sección. */}
      <div className="sticky top-[4.5rem] z-30 mt-6 flex justify-center bg-mist/90 py-2 backdrop-blur md:hidden">
        <Interruptor conLemora={conLemora} onChange={cambiar} />
      </div>

      {/* Celular: las cards se apilan. Escritorio: tres columnas. */}
      <div
        data-reveal
        className="mx-auto mt-4 flex max-w-7xl flex-col gap-4 px-4 md:mt-10 md:grid md:grid-cols-3 md:gap-6 md:px-6"
      >
        {pares.map((par) => (
          <article
            key={par.tag}
            className="flex flex-col rounded-3xl bg-white p-4 ring-1 ring-ink/10 md:p-6"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={par.img}
                alt={conLemora ? par.alt : ""}
                width="900"
                height="560"
                loading="lazy"
                className="aspect-[3/2] w-full object-cover object-[50%_20%] md:aspect-[4/3]"
              />
              {/* El problema va encima y se desvanece al pasar a "Con Lemora". Si no hay una foto
                  propia del problema, se usa la misma en blanco y negro. */}
              <img
                src={par.imgSin ?? par.img}
                alt={conLemora ? "" : (par.altSin ?? par.alt)}
                width="900"
                height="560"
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover object-[50%_20%] transition-opacity duration-700 motion-reduce:transition-none ${"grayscale-[60%]"} ${conLemora ? "opacity-0" : "opacity-100"}`}
              />
              {/* La etiqueta también alterna: oscura para el problema, lima para la solución. */}
              <div className="absolute left-3 top-3 grid">
                <span
                  aria-hidden={conLemora}
                  className={`col-start-1 row-start-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white ${fade} ${
                    conLemora ? "-translate-y-1 opacity-0" : ""
                  }`}
                >
                  {par.tagSin}
                </span>
                <span
                  aria-hidden={!conLemora}
                  className={`col-start-1 row-start-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink ${fade} ${
                    conLemora ? "" : "translate-y-1 opacity-0"
                  }`}
                >
                  {par.tag}
                </span>
              </div>
            </div>

            <div className="mt-5 grid">
              <div
                aria-hidden={conLemora}
                className={`col-start-1 row-start-1 flex gap-3 ${fade} ${
                  conLemora ? "pointer-events-none translate-y-2 opacity-0" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink text-white"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                </span>
                <div>
                  <h3 className="text-[17px] font-bold text-ink">{par.problema.title}</h3>
                  <p className="mt-1 text-[15px] text-ink-soft">{par.problema.body}</p>
                </div>
              </div>

              <div
                aria-hidden={!conLemora}
                className={`col-start-1 row-start-1 flex gap-3 ${fade} ${
                  conLemora ? "" : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <CheckIcon className="mt-0.5 h-6 w-6" />
                <div>
                  <h3 className="text-[17px] font-bold text-ink">{par.solucion.title}</h3>
                  <p className="mt-1 text-[15px] text-ink-soft">{par.solucion.body}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
