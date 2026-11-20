import { useEffect, useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import Button from "./Button"
import Tick from "./Tick"
import Segmented from "./Segmented"
import EscenaProducto from "./escenas/EscenaProducto"
import EscenaTurnos from "./escenas/EscenaTurnos"
import { ETIQUETA } from "../lib/pastillas"

// Sección propia: la tienda es de productos o de servicios. Se elige con el selector; cambia la escena y el texto.
// Datos tomados de web-basico (BasicoIncluye y FAQ): reserva de turnos en la tienda, horarios que define la tienda, calendario de
// turnos en el panel; y para productos, gestión de pedidos y pedido directo a WhatsApp.
const TIPOS = {
  productos: {
    titulo: "Para vender productos",
    cuerpo: "Cargás tu catálogo con fotos y precios, y los pedidos te llegan directo a tu WhatsApp.",
    puntos: [
      "Productos ilimitados, con fotos, stock y características",
      "Vendé por mayor y por menor (con compra mínima)",
      "Gestión de pedidos desde tu panel",
      "Cupones y descuentos automáticos",
    ],
  },
  servicios: {
    titulo: "Para vender servicios",
    cuerpo: "Publicás tus servicios con su precio, tus clientes reservan su turno desde la tienda y la reserva te llega a tu WhatsApp.",
    puntos: [
      "Servicios ilimitados, con fotos y precio",
      "Reserva de turnos desde tu tienda",
      "Vos definís los horarios disponibles",
      "Calendario de turnos en tu panel",
    ],
  },
}

export default function ProductosServicios() {
  const root = useRef(null)
  const marco = useRef(null)
  const [tipo, setTipo] = useState("productos")
  const [visible, setVisible] = useState(false)
  useReveal(root)

  // Las escenas solo se mueven mientras el marco está a la vista.
  useEffect(() => {
    const el = marco.current
    if (!el || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const capa = (activo) =>
    `absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${activo ? "opacity-100" : "invisible opacity-0"}`

  return (
    <section id="productos-y-servicios" ref={root} className="bg-mist py-16 md:py-[4.5rem]">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <span
            data-reveal
            className={ETIQUETA}
          >
            Productos y servicios
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            Dos tipos de tienda: productos o servicios.
          </h2>
          <div data-reveal className="mt-6">
            <Segmented
              label="Tipo de tienda"
              value={tipo}
              onChange={setTipo}
              options={[
                { id: "productos", label: "Tienda de productos" },
                { id: "servicios", label: "Tienda de servicios" },
              ]}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-center">
          <div
            ref={marco}
            data-reveal
            className="@container relative aspect-square overflow-hidden rounded-[2rem] bg-night-2 shadow-xl shadow-primary/15 ring-1 ring-white/10"
          >
            <div role="img" aria-label="Ficha de un producto con el botón Agregar al carrito" className={capa(tipo === "productos")}>
              <EscenaProducto activa={visible && tipo === "productos"} />
            </div>
            <div role="img" aria-label="Reserva de turno: se elige el día y la hora y se confirma" className={capa(tipo === "servicios")}>
              <EscenaTurnos activa={visible && tipo === "servicios"} />
            </div>
          </div>

          <div data-reveal className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/10 md:p-8">
            {Object.entries(TIPOS).map(([id, t]) => (
              <div key={id} hidden={tipo !== id}>
                <h3 className="text-[22px] font-bold text-ink">{t.titulo}</h3>
                <p className="mt-3 text-base text-ink-soft">{t.cuerpo}</p>
                <ul className="mt-6 space-y-3.5">
                  {t.puntos.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[16px] font-semibold text-ink">
                      <Tick className="h-5 w-5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Button href="#planes" size="lg" className="mt-8 w-full sm:w-auto">
              Ver planes
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
