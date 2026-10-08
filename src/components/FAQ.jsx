import { useState } from "react"

const faqs = [
  {
    q: "¿Necesito saber de programación?",
    a: "No. Nosotros dejamos tu tienda lista, vos solo cargás tus productos.",
  },
  {
    q: "¿Cuánto tarda en estar publicada mi tienda?",
    a: "Entre 24 y 48 horas desde que nos pasás la información.",
  },
  {
    q: "¿Lemora cobra comisión por cada venta?",
    a: "No. Vos te quedás con el 100% de cada venta.",
  },
  {
    q: "¿Cómo recibo los pedidos?",
    a: "Directo a tu WhatsApp, con todos los datos del cliente.",
  },
  {
    q: "¿Puedo usar mi propia marca?",
    a: "Sí, tu tienda muestra tu marca y tu estilo, no una plantilla genérica.",
  },
  {
    q: "¿Qué medios de pago puedo usar?",
    a: "Los que ya uses hoy — transferencia, efectivo o lo que prefieras vos y tu cliente.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "El plan Básico no tiene permanencia, cancelás cuando quieras. El plan Premium tiene un período mínimo de permanencia.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="bg-mist py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-center text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]">
          ¿Tenés alguna duda?
        </h2>

        <div className="mt-8 flex flex-col divide-y divide-ink/10 rounded-3xl bg-white px-6 py-2 ring-1 ring-ink/10 md:px-8">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="group flex w-full items-center justify-between gap-4 py-4 text-left focus-ring"
                >
                  <span
                    className={`text-base font-bold ${
                      isOpen ? "text-ink" : "text-ink-muted group-hover:text-ink"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full transition ${
                      isOpen ? "bg-ink text-white" : "bg-primary-tint text-primary"
                    }`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path
                        d={isOpen ? "M5 12h14" : "M12 5v14M5 12h14"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-${i}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
