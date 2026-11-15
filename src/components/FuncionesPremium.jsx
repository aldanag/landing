import CrownIcon from "./CrownIcon"
import FuncionesBloque from "./FuncionesBloque"
import { funcionesPremium } from "../lib/funcionesPremium"

// Imágenes del bloque: guardalas en src/assets/premium/ como premium-1, premium-2... premium-7
// (.webp, .png o .jpg, cuadradas), en el mismo orden que la lista. La página las toma sola; mientras no
// estén, el marco muestra un lugar vacío con la descripción de lo que va. Si dos funciones comparten
// imagen, guardá el mismo archivo con los dos números. Se generan con herramientas/premium-imagenes.
const fotos = import.meta.glob("../assets/premium/premium-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`premium-${n}.`))?.[1]

const funciones = funcionesPremium.map((f, i) => ({ ...f, imagen: fotoDe(i + 1) }))

export default function FuncionesPremium() {
  return (
    <FuncionesBloque
      id="premium"
      fondo="bg-lilac"
      etiqueta="Funciones Premium"
      icono={<CrownIcon className="h-3.5 w-3.5" />}
      titulo="Premium: tus clientes, tus ofertas, tu tienda."
      funciones={funciones}
      invertido
    />
  )
}
