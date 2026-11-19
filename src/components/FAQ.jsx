import { useRef, useState } from "react"
import { faqsDefault } from "../lib/faqs"
import { useReveal } from "../lib/motion"

// Botón + / − de siempre: círculo lila que pasa a tinta al abrir.
function Signo({ open, oscuro = false }) {
  return (
    <span
      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full transition ${
        oscuro
          ? open
            ? "bg-primary text-white"
            : "bg-white/10 text-lavender"
          : open
            ? "bg-ink text-white"
            : "bg-primary-tint text-primary"
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path
          d={open ? "M5 12h14" : "M12 5v14M5 12h14"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

// layout="columnas": etiqueta lima y título a la izquierda, lista abierta con líneas a la derecha, todo en azul oscuro
// (landing principal). layout="centrado": tarjeta única centrada (página Básico).
export default function FAQ({ faqs = faqsDefault, layout = "centrado" }) {
  const root = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)
  const columnas = layout === "columnas"
  useReveal(root)

  const items = faqs.map((item, i) => {
    const isOpen = openIndex === i
    return (
      <div key={item.q}>
        <button
          type="button"
          onClick={() => setOpenIndex(isOpen ? null : i)}
          aria-expanded={isOpen}
          aria-controls={`faq-${i}`}
          className={`group flex w-full cursor-pointer items-center justify-between text-left ${columnas ? "focus-ring-light gap-6 py-5" : "focus-ring gap-4 py-4"}`}
        >
          <span
            className={`font-bold ${columnas ? "text-base md:text-lg" : "text-base"} ${
              columnas
                ? isOpen
                  ? "text-white"
                  : "text-snow-muted group-hover:text-white"
                : isOpen
                  ? "text-ink"
                  : "text-ink-muted group-hover:text-ink"
            }`}
          >
            {item.q}
          </span>
          <Signo open={isOpen} oscuro={columnas} />
        </button>
        <div
          id={`faq-${i}`}
          aria-hidden={!isOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p
              className={`leading-relaxed ${
                columnas ? "max-w-[56ch] pb-5 text-[15px] text-snow-soft" : "pb-4 text-sm text-ink-soft"
              }`}
            >
              {item.a}
            </p>
          </div>
        </div>
      </div>
    )
  })

  if (columnas) {
    return (
      <section id="faq" ref={root} className="bg-ink py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span
              data-reveal
              className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink"
            >
              Preguntas frecuentes
            </span>
            <h2
              data-words
              className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
            >
              ¿Tenés alguna duda?
            </h2>
            <p data-reveal className="mt-3 max-w-[40ch] text-balance text-base text-snow-soft">
              Lo que casi todos quieren saber antes de empezar.
            </p>
          </div>
          <div data-reveal className="flex flex-col divide-y divide-white/15 border-y border-white/15">
            {items}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="faq" ref={root} className="bg-mist py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-center text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]">
          ¿Tenés alguna duda?
        </h2>

        <div className="mt-8 flex flex-col divide-y divide-ink/10 rounded-3xl bg-white px-6 py-2 ring-1 ring-ink/10 md:px-8">
          {items}
        </div>
      </div>
    </section>
  )
}
