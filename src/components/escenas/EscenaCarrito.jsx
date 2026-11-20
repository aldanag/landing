import jean from "../../assets/escenas/carrito-jean.webp"
import remera from "../../assets/escenas/carrito-remera.webp"
import { abs, BotonTienda, Cifra, CarritoSolido, Fila, IconoCarrito, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Carrito de compras", redibujada en vivo (antes era una captura). Es el carrito simplificado de siempre (Jean Brooklyn y
// Remera Maia) con la forma del carrito real de la tienda: título "Tu Carrito" con el carrito sólido, filas con el precio en
// violeta y el selector de cantidad a la derecha, la fila resaltada en lila y el botón oscuro "Finalizar Compra". Está dibujada
// sobre un lienzo de 768 px y escala con el ancho del marco (--u = 1 px del lienzo).
// Historia en bucle (8 s) mientras está a la vista (`activa`): un toque suma una remera, el total se actualiza al instante, otro
// toque suma un jean y otro toca "Finalizar Compra". En reposo (o con "reducir movimiento") queda en su estado base.
// Las fotos son archivos aparte: reemplazar src/assets/escenas/carrito-*.webp.
export default function EscenaCarrito({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "ec-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 232C30 250 70 300 90 360" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M515 640C560 690 585 730 590 790" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Tarjeta */}
      <div
        style={{
          ...abs(61, 119, { width: u(645), height: u(530) }),
          background: "#fff",
          borderRadius: u(36),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.22)`,
        }}
      />

      {/* Encabezado: carrito sólido violeta y "Tu Carrito", como en la tienda */}
      <IconoCarrito x={97} y={160} size={32} />
      <span style={{ ...abs(142, 156), fontSize: u(30), fontWeight: 600, color: "#17122F", lineHeight: u(44) }}>Tu Carrito</span>
      <div style={{ ...abs(534, 156, { width: u(135), height: u(42) }), background: "#F1ECFF", borderRadius: u(21) }} />
      <Cifra
        x={534}
        y={165}
        w={135}
        size={20}
        weight={600}
        color="#6C4FD4"
        align="center"
        estados={[
          ["3 productos", "ec-t0"],
          ["4 productos", "ec-t1"],
          ["5 productos", "ec-t2"],
        ]}
      />
      <div style={{ ...abs(61, 212, { width: u(645), height: u(1.5) }), background: "#EEEBF5" }} />

      {/* La fila que se toca se resalta en lila, como en la tienda */}
      <div className="ec-h1" style={{ ...abs(61, 213, { width: u(645), height: u(98) }), background: "#F3EFFF", opacity: 0 }} />
      <div className="ec-h2" style={{ ...abs(61, 311, { width: u(645), height: u(98) }), background: "#F3EFFF", opacity: 0 }} />

      {/* Filas */}
      <Fila
        y={213}
        foto={jean}
        nombre="Jean Brooklyn"
        precio="$ 26.000"
        cantidades={[
          ["2", "ec-j0"],
          ["3", "ec-j1"],
        ]}
      />
      <Fila
        y={311}
        foto={remera}
        nombre="Remera Maia"
        precio="$ 24.500"
        cantidades={[
          ["1", "ec-r0"],
          ["2", "ec-r1"],
        ]}
      />

      {/* Total */}
      <span style={{ ...abs(98, 455), fontSize: u(23), fontWeight: 500, color: "#4A4560", lineHeight: 1.3 }}>Total:</span>
      <Cifra
        x={360}
        y={440}
        w={309}
        size={44}
        weight={800}
        color="#17122F"
        estados={[
          ["$ 76.500", "ec-t0"],
          ["$ 101.000", "ec-t1"],
          ["$ 127.000", "ec-t2"],
        ]}
      />

      {/* Botón de la tienda (el mismo en todas las escenas) */}
      <BotonTienda className="ec-boton" x={98} y={544} w={571} h={69} size={24}>
        Finalizar Compra
      </BotonTienda>

      {/* Sticker "Total al instante" */}
      <Pegatina className="ec-sticker" x={346} y={63} giro={-10}>
        <CarritoSolido size={52} />
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1, marginTop: u(4) }}>Total</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>AL INSTANTE</span>
      </Pegatina>

      {/* Toques (tap) sobre el "+" de la remera, el "+" del jean y el botón */}
      <Toque clase="ec-ta" x={651} y={360} ini={1.456} dur={8} />
      <Toque clase="ec-tb" x={651} y={262} ini={3.376} dur={8} />
      <Toque clase="ec-tc" x={383} y={578} ini={5.216} dur={8} />
    </div>
  )
}
