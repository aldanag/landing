import CrownIcon from "./CrownIcon"
import FuncionesBloque from "./FuncionesBloque"
import BarraMensajes from "./BarraMensajes"
import InventarioAnimado from "./InventarioAnimado"
import ClienteAnimado from "./ClienteAnimado"
import { funcionesPremium } from "../lib/funcionesPremium"

// Bloque Premium: fondo oscuro e imágenes con fondo lila. Las imágenes (src/assets/premium/premium-1 ...
// premium-7, cuadradas) se generan con `python herramientas/premium-imagenes/generar.py`; los textos
// están en src/lib/funcionesPremium.js.
const fotos = import.meta.glob("../assets/premium/premium-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`premium-${n}.`))?.[1]

const funciones = funcionesPremium.map((f, i) => ({
  ...f,
  imagen: fotoDe(i + 1),
  superposicion: i === 0 ? <BarraMensajes /> : i === 2 ? <ClienteAnimado /> : i === 3 ? <InventarioAnimado /> : undefined,
}))

export default function FuncionesPremium() {
  return (
    <FuncionesBloque
      id="premium"
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
