import CrownIcon from "./CrownIcon"
import FuncionesBloque from "./FuncionesBloque"

// Imágenes del bloque: guardalas en src/assets/premium/ como premium-1, premium-2... premium-7
// (.webp, .png o .jpg, cuadradas), en el mismo orden que la lista. La página las toma sola; mientras no
// estén, el marco muestra un lugar vacío con la descripción de lo que va. Si dos funciones comparten
// imagen, guardá el mismo archivo con los dos números.
const fotos = import.meta.glob("../assets/premium/premium-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`premium-${n}.`))?.[1]

// Siete filas, como el bloque de arriba (mismo ritmo) y como la lista del plan Premium.
const funciones = [
  {
    titulo: "Sin Lemora Ads, con tu propia barra",
    cuerpo:
      "Sacá el anuncio de Lemora y poné tus propios mensajes en la barra promocional. Podés sumar varios y elegir el color que quieras.",
    etiquetaImagen: "La barra promocional con tus mensajes, arriba de la tienda",
  },
  {
    titulo: "Un menú por categorías",
    cuerpo: "Tu tienda suma un menú que se despliega con todas tus categorías.",
    etiquetaImagen: "El menú de la tienda desplegado con las categorías",
  },
  {
    titulo: "Una página para cada categoría",
    cuerpo:
      "Cada categoría abre su propia página, con su imagen, en vez de recorrerlas con scroll en una sola página.",
    etiquetaImagen: "La página de una categoría, con su imagen",
  },
  {
    titulo: "Inventario por categorías",
    cuerpo:
      "Mirá tus productos agrupados por categoría y editá el stock rápidamente, desde el panel.",
    etiquetaImagen: "El panel con los productos por categoría y el stock editable",
  },
  {
    titulo: "Conocé a tus clientes",
    cuerpo:
      "Mirá en el panel a tus clientes y su información. Podés exportarlos para usarlos en tus campañas de email marketing.",
    etiquetaImagen: "El panel de clientes con el botón para exportar",
  },
  {
    titulo: "Carrusel de hasta 12 imágenes",
    cuerpo: "Sumá hasta 12 imágenes al carrusel de tu tienda, en vez de 8.",
    etiquetaImagen: "El carrusel de la tienda con sus imágenes",
  },
  {
    titulo: "5 banners promocionales",
    cuerpo: "Destacá más ofertas y promociones con 5 banners, en vez de 3.",
    etiquetaImagen: "Los banners promocionales de la tienda",
  },
].map((f, i) => ({ ...f, imagen: fotoDe(i + 1) }))

export default function FuncionesPremium() {
  return (
    <FuncionesBloque
      id="premium"
      fondo="bg-lilac"
      etiqueta="Funciones Premium"
      icono={<CrownIcon className="h-3.5 w-3.5" />}
      titulo="Premium: tu marca, tus categorías, tus clientes."
      funciones={funciones}
      invertido
    />
  )
}
