import Button from "./Button"
import CrownIcon from "./CrownIcon"
import FuncionesBloque from "./FuncionesBloque"
import BarraMensajes from "./BarraMensajes"
import InventarioAnimado from "./InventarioAnimado"
import ClienteAnimado from "./ClienteAnimado"
import MarketingAnimado from "./MarketingAnimado"
import EscenaPagos from "./escenas/EscenaPagos"
import EscenaMayorista from "./escenas/EscenaMayorista"
import EscenaPopup from "./escenas/EscenaPopup"
import CarritoAnimado from "./CarritoAnimado"
import { funcionesPremium } from "../lib/funcionesPremium"
import { PREMIUM_LANDING_LINK } from "../lib/planes"

// Bloque Premium: fondo oscuro e imágenes con fondo lila. Las imágenes (src/assets/premium/premium-1 ...
// premium-6, cuadradas) se generan con `python herramientas/premium-imagenes/generar.py`; los textos
// están en src/lib/funcionesPremium.js.
const fotos = import.meta.glob("../assets/premium/premium-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`premium-${n}.`))?.[1]

const funciones = funcionesPremium.map((f, i) => ({
  ...f,
  // la función 6 (mayorista o minorista) es una escena viva y no una imagen: las imágenes siguen la numeración sin ella
  // (la 7, métodos de pago, y la 9, la ventana emergente al salir, también son escenas vivas)
  imagen: i === 5 || i === 6 || i === 8 ? undefined : fotoDe(i < 5 ? i + 1 : i),
  escena: i === 5 ? <EscenaMayorista /> : i === 6 ? <EscenaPagos /> : i === 8 ? <EscenaPopup /> : undefined,
  // el carrito (4) y los badges de Marketing (7) los dibuja la animación: aparecen junto con la imagen
  superposicionFija: i === 4 || i === 7,
  superposicion: i === 0 ? <BarraMensajes /> : i === 2 ? <ClienteAnimado /> : i === 3 ? <InventarioAnimado /> : i === 4 ? <CarritoAnimado /> : i === 7 ? <MarketingAnimado /> : undefined,
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
      cta={
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          {PREMIUM_LANDING_LINK && (
            <Button href={PREMIUM_LANDING_LINK} external variant="inverse" size="lg">
              Ver más sobre Premium
            </Button>
          )}
          <Button href="#planes" variant={PREMIUM_LANDING_LINK ? "outline" : "inverse"} size="lg">
            Ver planes
          </Button>
        </div>
      }
    />
  )
}
