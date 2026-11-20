import jean from "../../assets/escenas/carrito-jean.webp"
import { abs, AvisoOscuro, BotonTienda, Cifra, Fila, IconoCarrito, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Por mayor y por menor": el carrito de una tienda con una compra mínima por MONTO ($ 130.000; también puede ser por cantidad de
// productos). Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo). Historia en bucle (12 s) mientras está a la
// vista (`activa`): hay 3 unidades ($ 78.000) y el botón está apagado; dos toques en "+" suben a 5 ($ 130.000), la barra se completa y
// se habilita "Finalizar Compra". En reposo (o con "reducir movimiento") queda ya cumplida la compra mínima.
const Y0 = 128

export default function EscenaMayorista({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "em-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 560C40 540 90 560 130 640C150 690 160 740 170 800" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M600 -20C640 20 700 30 800 20" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Carrito */}
      <div
        style={{
          ...abs(61, Y0, { width: u(645), height: u(495) }),
          background: "#fff",
          borderRadius: u(34),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)`,
        }}
      />
      <IconoCarrito x={98} y={Y0 + 37} size={30} />
      <span style={{ ...abs(142, Y0 + 37), fontSize: u(30), fontWeight: 600, color: "#17122F", lineHeight: u(44) }}>Tu Carrito</span>
      <div style={{ ...abs(61, Y0 + 93, { width: u(645), height: u(1.5) }), background: "#EEEBF5" }} />
      <Fila
        y={Y0 + 94}
        foto={jean}
        nombre="Jean Brooklyn"
        precio="$ 26.000"
        cantidades={[
          ["5", "em-q2"],
          ["3", "em-q0"],
          ["4", "em-q1"],
        ]}
      />

      {/* Compra mínima: etiqueta, cuánto falta y barra */}
      <span style={{ ...abs(98, Y0 + 218), fontSize: u(21), fontWeight: 500, color: "#4A4560", lineHeight: 1.3 }}>Compra mínima: $ 130.000</span>
      <Cifra
        x={380}
        y={Y0 + 218}
        w={289}
        size={21}
        weight={700}
        color="#6C4FD4"
        estados={[
          ["Mínimo alcanzado", "em-q2"],
          ["Faltan $ 52.000", "em-q0"],
          ["Faltan $ 26.000", "em-q1"],
        ]}
      />
      <div style={{ ...abs(98, Y0 + 262, { width: u(571), height: u(14) }), background: "#EEEBF5", borderRadius: u(7), overflow: "hidden" }}>
        <div className="em-barra" style={{ width: "100%", height: "100%", background: "#6C4FD4", borderRadius: u(7), transformOrigin: "left center" }} />
      </div>

      {/* Total */}
      <div style={{ ...abs(61, Y0 + 308, { width: u(645), height: u(1.5) }), background: "#EEEBF5" }} />
      <span style={{ ...abs(98, Y0 + 338), fontSize: u(23), fontWeight: 500, color: "#4A4560", lineHeight: 1.3 }}>Total:</span>
      <Cifra
        x={380}
        y={Y0 + 326}
        w={289}
        size={44}
        weight={800}
        color="#17122F"
        estados={[
          ["$ 130.000", "em-q2"],
          ["$ 78.000", "em-q0"],
          ["$ 104.000", "em-q1"],
        ]}
      />

      {/* Botón: apagado hasta cumplir el mínimo, luego el de la tienda */}
      <BotonTienda x={98} y={Y0 + 402} w={571} h={56} size={23} style={{ background: "#DDD9EC", color: "#8E89A3" }}>
        Finalizar Compra
      </BotonTienda>
      <BotonTienda className="em-boton" x={98} y={Y0 + 402} w={571} h={56} size={23}>
        Finalizar Compra
      </BotonTienda>

      {/* Sticker */}
      <Pegatina className="em-sticker" xd={722} y={56} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Mayor o menor</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>COMPRA MÍNIMA</span>
      </Pegatina>

      {/* Aviso */}
      <AvisoOscuro className="em-aviso" x={40} y={Y0 + 472} h={66} texto="Compra mínima cumplida" />

      {/* Toques (tap) sobre el "+" */}
      <Toque clase="em-ta" x={651} y={Y0 + 143} ini={3.2} dur={12} />
      <Toque clase="em-tb" x={651} y={Y0 + 143} ini={5.1} dur={12} />
    </div>
  )
}
