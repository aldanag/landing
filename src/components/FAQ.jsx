import { useState } from "react"

const faqsDefault = [
  {
    q: "¿Necesito saber de programación?",
    a: "No. Configurás tu tienda desde un panel simple: sin código y sin depender de nadie. Te enseñamos con tutoriales simples, rápidos y súper fáciles cómo gestionar toda tu tienda.",
  },
  {
    q: "¿Cómo armo mi tienda?",
    a: "Desde nuestro panel, cargá toda la información de tu negocio, configurá si tu tienda será para vender productos u ofrecer servicios, cargalos y empezá a vender.",
  },
  {
    q: "¿Lemora cobra comisión por cada venta?",
    a: "No. Vos te quedás con el 100% de cada venta. Nuestras tiendas no incluyen plataformas de pago: tus clientes hacen su pedido o reserva en tu tienda, te llega directo a tu WhatsApp y vos decidís cómo cobrar.",
  },
  {
    q: "¿Cómo recibo los pedidos?",
    a: "Directo a tu WhatsApp, con todos los datos del cliente. Además, nuestro sistema almacena todos tus pedidos en tu tienda para que puedas gestionarlos vos mismo.",
  },
  {
    q: "¿Puedo usar mi propia marca?",
    a: "Por supuesto. Cargá tu marca y tus imágenes, y personalizá la tienda a tu estilo. Lemora tiene un alto nivel de personalización para las webs.",
  },
  {
    q: "¿Qué medios de pago puedo usar?",
    a: "El que vos quieras. Acá tu negocio toma el control, sin intermediarios: decidís cómo cobrar, en efectivo, por transferencia u otros medios de pago.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Si estás en el plan Básico, cancelás cuando quieras. Si elegís el plan Premium, tiene una contratación mínima de 3 meses y, pasado ese período, podés darte de baja cuando quieras.",
  },
]

export default function FAQ({ faqs = faqsDefault }) {
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
