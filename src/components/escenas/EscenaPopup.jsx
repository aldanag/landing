import jean from "../../assets/escenas/carrito-jean.webp"
import remera from "../../assets/escenas/carrito-remera.webp"
import { abs, AvisoOscuro, BotonTienda, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Ventana emergente al salir": una tienda con productos en el carrito y, cuando la persona lleva el mouse hacia arriba para irse (hacia la barra
// del navegador), aparece la ventana emergente que le pide terminar su pedido. Un toque en "Volver al carrito" la cierra y se recupera la
// venta (aviso). Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo). Bucle de 9 s mientras está a la vista
// (`activa`). En reposo (o con "reducir movimiento") queda la ventana abierta. Los textos y los productos son de ejemplo.
const TIENDA = [
  [jean, "Jean Brooklyn", "$ 26.000"],
  [remera, "Remera Aura", "$ 18.500"],
]

export default function EscenaPopup({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "pop-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 600C40 580 90 600 130 680C150 730 160 770 170 820" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M600 -20C640 20 700 30 800 20" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Ventana del navegador con la tienda */}
      <div style={{ ...abs(60, 110, { width: u(648), height: u(560) }), background: "#fff", borderRadius: u(30), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)`, overflow: "hidden" }}>
        {/* barra del navegador */}
        <div style={{ ...abs(0, 0, { width: u(648), height: u(46) }), background: "#F3F2F8" }} />
        {[0, 1, 2].map((k) => (
          <span key={k} style={{ ...abs(24 + k * 20, 17, { width: u(12), height: u(12) }), borderRadius: "50%", background: "#D6D2E6" }} />
        ))}
        <span style={{ ...abs(130, 10, { width: u(388), height: u(26) }), borderRadius: u(13), background: "#fff" }} />
        {/* encabezado de la tienda */}
        <span style={{ ...abs(34, 70), fontSize: u(28), fontWeight: 800, color: "#6C4FD4", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Velvet</span>
        <span style={{ ...abs(420, 76, { width: u(172), height: u(30) }), background: "#F3F2F8", borderRadius: u(15) }} />
        {/* productos */}
        {TIENDA.map(([src, nombre, precio], k) => (
          <div key={nombre} style={{ ...abs(34 + k * 300, 128, { width: u(280), height: u(280) }), border: `${u(1.5)} solid #EEEBF5`, borderRadius: u(20), background: "#fff", boxSizing: "border-box" }}>
            <img src={src} alt="" style={{ ...abs(10, 10, { width: u(260), height: u(190) }), objectFit: "cover", borderRadius: u(12) }} />
            <span style={{ ...abs(16, 212), fontSize: u(19), fontWeight: 600, color: "#17122F", lineHeight: 1.3, whiteSpace: "nowrap" }}>{nombre}</span>
            <span style={{ ...abs(16, 240), fontSize: u(18), fontWeight: 700, color: "#6C4FD4", lineHeight: 1.3 }}>{precio}</span>
          </div>
        ))}
        {/* carrito con productos */}
        <div style={{ ...abs(0, 436, { width: u(648), height: u(124) }), borderTop: `${u(1.5)} solid #EEEBF5`, background: "#fff" }} />
        <span style={{ ...abs(34, 462), fontSize: u(20), fontWeight: 600, color: "#17122F", lineHeight: 1.3 }}>Tu carrito: 2 productos</span>
        <span style={{ ...abs(34, 494), fontSize: u(18), fontWeight: 500, color: "#4A4560", lineHeight: 1.3 }}>Total: $ 44.500</span>
        <BotonTienda x={400} y={462} w={214} h={50} size={19}>
          Finalizar Compra
        </BotonTienda>

        {/* Fondo atenuado y ventana emergente */}
        <div className="pop-vel" style={{ position: "absolute", inset: 0, background: "rgba(23,18,47,0.58)" }} />
      </div>

      {/* Ventana emergente */}
      <div
        className="pop-ven"
        style={{ ...abs(164, 250, { width: u(440), height: u(310) }), background: "#fff", borderRadius: u(28), boxShadow: `0 ${u(24)} ${u(60)} rgba(23,18,47,0.35)` }}
      >
        <span style={{ ...abs(396, 16, { width: u(28), height: u(28) }), display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#F3F2F8" }}>
          <svg viewBox="0 0 24 24" style={{ width: u(14), height: u(14) }} fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#17122F" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </span>
        <span style={{ ...abs(0, 44, { width: u(440) }), textAlign: "center", fontSize: u(30), fontWeight: 800, color: "#17122F", lineHeight: 1.2 }}>¿Te vas sin tu pedido?</span>
        <span style={{ ...abs(40, 100, { width: u(360) }), textAlign: "center", fontSize: u(18), fontWeight: 500, color: "#4A4560", lineHeight: 1.4 }}>
          Tenés productos en tu carrito. Terminá tu compra ahora.
        </span>
        <BotonTienda x={40} y={184} w={360} h={56} size={21}>
          Volver al carrito
        </BotonTienda>
        <span style={{ ...abs(0, 262, { width: u(440) }), textAlign: "center", fontSize: u(16), fontWeight: 600, color: "#8E89A3", lineHeight: 1.2 }}>No, gracias</span>
      </div>

      {/* Mouse que sube hacia la barra del navegador */}
      <svg className="pop-cursor" viewBox="0 0 24 24" style={{ ...abs(400, 470, { width: u(30), height: u(30) }), opacity: 0 }}>
        <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="#17122F" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>

      <Pegatina xd={738} y={22} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Ventana</span>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>emergente al salir</span>
      </Pegatina>

      <div className="pop-aviso" style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}>
        <AvisoOscuro x={36} y={690} h={58} texto="Venta recuperada" />
      </div>

      <Toque clase="pop-t" x={384} y={462} ini={6} dur={9} />
    </div>
  )
}
