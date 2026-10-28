import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"

// Capturas: guardalas en src/assets/basico/ como panel-1, panel-2... (el panel) y tienda-1, tienda-2...
// (cómo queda la tienda). Se muestran solo las que existan, en el orden del número.
const fotosPanel = import.meta.glob("../assets/basico/panel-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotosTienda = import.meta.glob("../assets/basico/tienda-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (fotos, prefijo, n) =>
  Object.entries(fotos).find(([ruta]) => ruta.includes(`${prefijo}-${n}.`))?.[1]

// `y` es la posición vertical (en px sobre una captura de unos 890 px de alto) del ítem del menú
// lateral de cada pantalla: sobre ese ítem va el botón invisible para pasar a esa pantalla.
const ALTO_CAPTURA = 892
const pantallasPanel = [
  { n: 1, label: "Dashboard", y: 154, alt: "Panel de Lemora: resumen de ingresos, pedidos y productos" },
  { n: 2, label: "Productos", y: 250, alt: "Panel de Lemora: listado de productos" },
  { n: 3, label: "Categorías", y: 301, alt: "Panel de Lemora: categorías del catálogo" },
  { n: 4, label: "Pedidos", y: 351, alt: "Panel de Lemora: pedidos recibidos, por estado" },
  { n: 5, label: "Descuentos", y: 402, alt: "Panel de Lemora: descuentos automáticos y compra mínima" },
  { n: 6, label: "Reseñas", y: 452, alt: "Panel de Lemora: reseñas de clientes que se muestran en el inicio" },
  { n: 7, label: "Diseño", y: 548, alt: "Panel de Lemora: identidad visual, logotipo y favicon" },
  { n: 8, label: "Carrusel", y: 599, alt: "Panel de Lemora: carrusel de la portada de la tienda" },
  { n: 9, label: "Banners", y: 649, alt: "Panel de Lemora: banners de la tienda" },
  { n: 10, label: "Iconos", y: 700, alt: "Panel de Lemora: iconos de la página principal" },
  { n: 11, label: "Configuración", y: 795, alt: "Panel de Lemora: datos generales de la tienda" },
  { n: 12, label: "Mi cuenta", y: 846, alt: "Panel de Lemora: datos de la cuenta, contraseña y cambio de plan" },
]
const pantallasTienda = [
  { n: 1, label: "Inicio", alt: "La tienda terminada: página de inicio" },
  { n: 2, label: "Producto", alt: "La tienda terminada: página de un producto" },
  { n: 3, label: "Carrito", alt: "La tienda terminada: carrito de compras" },
]

const pestanas = [
  {
    id: "panel",
    nombre: "Tu panel",
    barra: "Panel de administración",
    pantallas: pantallasPanel
      .map((p) => ({ ...p, foto: fotoDe(fotosPanel, "panel", p.n) }))
      .filter((p) => p.foto),
    pendiente: "Capturas del panel",
  },
  {
    id: "tienda",
    nombre: "Tu tienda",
    barra: "tutienda.lemora.lat",
    pantallas: pantallasTienda
      .map((p) => ({ ...p, foto: fotoDe(fotosTienda, "tienda", p.n) }))
      .filter((p) => p.foto),
    pendiente: "Capturas de la tienda terminada",
  },
]

export default function BasicoAsiSeVe() {
  const root = useRef(null)
  useReveal(root)
  const [activa, setActiva] = useState("panel")
  const [indices, setIndices] = useState({ panel: 0, tienda: 0 })

  const pestana = pestanas.find((p) => p.id === activa)
  const indice = indices[activa]
  const esPanel = activa === "panel"
  const elegir = (i) => setIndices((prev) => ({ ...prev, [activa]: i }))

  return (
    <section id="asi-se-ve" ref={root} className="bg-mist py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            Así se ve
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            Tu panel para cargar todo y tu tienda para vender.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-ink-soft">
            Lo armás desde un panel simple y tus clientes lo ven en tu tienda, lista para vender.
          </p>
        </div>

        <div data-reveal className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Qué querés ver"
            className="inline-flex rounded-full bg-white p-1 ring-1 ring-ink/10"
          >
            {pestanas.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`asi-se-ve-${p.id}`}
                aria-selected={activa === p.id}
                aria-controls="asi-se-ve-ventana"
                onClick={() => setActiva(p.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 focus-ring motion-reduce:transition-none ${
                  activa === p.id ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {p.nombre}
              </button>
            ))}
          </div>
        </div>

        <div
          data-reveal
          id="asi-se-ve-ventana"
          role="tabpanel"
          aria-labelledby={`asi-se-ve-${activa}`}
          className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-ink/10 ring-1 ring-ink/10"
        >
          {/* Barra de la ventana */}
          <div className="flex items-center gap-3 border-b border-ink/10 bg-primary-tint/60 px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-lavender" />
              <span className="h-2.5 w-2.5 rounded-full bg-lavender" />
              <span className="h-2.5 w-2.5 rounded-full bg-lavender" />
            </div>
            <div className="min-w-0 flex-1 truncate rounded-full bg-white px-4 py-1 text-center text-[13px] font-medium text-ink-muted ring-1 ring-ink/10">
              {pestana.barra}
            </div>
            <div className="hidden w-12 sm:block" aria-hidden="true" />
          </div>

          {/* Las capturas se apilan en la misma celda y se funden entre sí */}
          {pestana.pantallas.length > 0 ? (
            <div className="relative">
              <div className="grid bg-white">
                {pestana.pantallas.map((p, i) => (
                  <img
                    key={`${pestana.id}-${p.n}`}
                    src={p.foto}
                    alt={i === indice ? p.alt : ""}
                    loading="lazy"
                    decoding="async"
                    className={`col-start-1 row-start-1 block aspect-[2.13/1] w-full object-cover object-left-top transition-opacity duration-500 motion-reduce:transition-none ${
                      i === indice ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  />
                ))}
              </div>
              {/* Menú del panel clickeable: botones invisibles sobre cada ítem del menú lateral */}
              {esPanel &&
                pestana.pantallas.map((p, i) => (
                  <button
                    key={`menu-${p.n}`}
                    type="button"
                    aria-label={`Ver ${p.label}`}
                    aria-current={i === indice ? "true" : undefined}
                    onClick={() => elegir(i)}
                    style={{
                      top: `${((p.y - 25) / ALTO_CAPTURA) * 100}%`,
                      height: `${(50 / ALTO_CAPTURA) * 100}%`,
                    }}
                    className="absolute left-[0.7%] hidden w-[15.6%] cursor-pointer rounded-xl transition-colors duration-200 hover:bg-primary/10 focus-ring motion-reduce:transition-none md:block"
                  />
                ))}
            </div>
          ) : (
            <div
              role="img"
              aria-label={`Lugar para: ${pestana.pendiente}`}
              className="flex aspect-[2.13/1] w-full flex-col items-center justify-center gap-3 bg-primary-tint p-8 text-center text-primary"
            >
              <FontAwesomeIcon icon={faImage} className="h-12 w-12" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-[0.09em]">{pestana.pendiente}</p>
              <p className="text-xs font-semibold text-ink-muted">
                Guardalas en src/assets/basico/ como {pestana.id}-1, {pestana.id}-2…
              </p>
            </div>
          )}
        </div>

        {esPanel && pestana.pantallas.length > 1 && (
          <p data-reveal className="mt-4 hidden text-center text-sm font-semibold text-ink-muted md:block">
            Hacé clic en el menú para explorar el panel.
          </p>
        )}

        {/* En el celular el menú de la captura es muy chico: se navega con estos botones */}
        {pestana.pantallas.length > 1 && (
          <div
            data-reveal
            className={`mt-5 flex flex-wrap justify-center gap-2 ${esPanel ? "md:hidden" : ""}`}
          >
            {pestana.pantallas.map((p, i) => (
              <button
                key={p.n}
                type="button"
                aria-pressed={i === indice}
                onClick={() => elegir(i)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-semibold ring-1 transition-colors duration-300 focus-ring motion-reduce:transition-none ${
                  i === indice
                    ? "bg-primary-tint text-primary ring-primary/40"
                    : "bg-white text-ink-soft ring-ink/10 hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
