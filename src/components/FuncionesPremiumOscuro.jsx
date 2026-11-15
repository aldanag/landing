import CrownIcon from "./CrownIcon"
import FuncionesBloque from "./FuncionesBloque"
import { funcionesPremium } from "../lib/funcionesPremium"

// VARIANTE DE PRUEBA: el mismo bloque Premium con fondo oscuro e imágenes con fondo lila
// (src/assets/premium-b, se generan con `python herramientas/premium-imagenes/generar.py --claro`).
// Cuando se elija una estética, se borra la que no va (y este archivo o FuncionesPremium.jsx).
const fotos = import.meta.glob("../assets/premium-b/premium-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`premium-${n}.`))?.[1]

const funciones = funcionesPremium.map((f, i) => ({ ...f, imagen: fotoDe(i + 1) }))

export default function FuncionesPremiumOscuro() {
  return (
    <FuncionesBloque
      id="premium-oscuro"
      fondo="bg-ink"
      oscuro
      etiqueta="Funciones Premium"
      icono={<CrownIcon className="h-3.5 w-3.5" />}
      titulo="Premium: tus clientes, tus ofertas, tu tienda."
      funciones={funciones}
      invertido
    />
  )
}
