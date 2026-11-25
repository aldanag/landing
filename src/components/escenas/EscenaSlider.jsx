import imagen from "../../assets/escenas/carrusel-slides.webp"
import CarruselAnimado from "../CarruselAnimado"

// Cuadro "Slides y banners": el panel del carrusel, el slider de la tienda que pasa de una lámina a otra y el banner de abajo.
// La imagen se genera con `python herramientas/premium-imagenes/generar.py slides`. El slider se mueve solo mientras está a la
// vista (`activa`).
export default function EscenaSlider({ activa = false }) {
  return (
    <div className="absolute inset-0">
      <img src={imagen} alt="" className="absolute inset-0 h-full w-full object-contain" />
      <CarruselAnimado activa={activa} />
    </div>
  )
}
