import banner from "../../assets/escenas/carrusel-lentes-1.webp"
import lente1 from "../../assets/escenas/respaldo-lente-1.webp"
import lente2 from "../../assets/escenas/respaldo-lente-2.webp"
import lente3 from "../../assets/escenas/respaldo-lente-3.webp"
import { abs, AvisoOscuro, BotonTienda, IconoCarrito, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Ventana emergente al salir": una tienda (encabezado, slider y productos, como las demás escenas) con productos en el carrito y, cuando la persona lleva el mouse hacia arriba para irse (hacia la barra
// del navegador), aparece la ventana emergente que le pide terminar su pedido. Un toque en "Volver al carrito" la cierra y se recupera la
// venta (aviso). Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo). Bucle de 9 s mientras está a la vista
// (`activa`). En reposo (o con "reducir movimiento") queda la ventana abierta. Los textos y los productos son de ejemplo.
const PRODUCTOS = [
  [lente1, "Lentes Marine", "$ 12.500"],
  [lente2, "Lentes Italy", "$ 14.500"],
  [lente3, "Lentes Burdeos", "$ 9.900"],
]
const centro = { display: "flex", alignItems: "center", justifyContent: "center" }

export default function EscenaPopup({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "pop-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 600C40 580 90 600 130 680C150 730 160 770 170 820" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M600 -20C640 20 700 30 800 20" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Ventana del navegador con la tienda */}
      <div style={{ ...abs(60, 110, { width: u(648), height: u(520) }), background: "#fff", borderRadius: u(30), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)`, overflow: "hidden" }}>
        {/* barra del navegador */}
        <div style={{ ...abs(0, 0, { width: u(648), height: u(46) }), background: "#F3F2F8" }} />
        {[0, 1, 2].map((k) => (
          <span key={k} style={{ ...abs(24 + k * 20, 17, { width: u(12), height: u(12) }), borderRadius: "50%", background: "#D6D2E6" }} />
        ))}
        <span style={{ ...abs(130, 10, { width: u(388), height: u(26) }), borderRadius: u(13), background: "#fff" }} />
        {/* encabezado de la tienda: logo, menú y carrito con 2 productos */}
        <span style={{ ...abs(28, 62), fontSize: u(26), fontWeight: 800, color: "#6C4FD4", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Velvet</span>
        {[["Inicio", true, 372], ["Productos", false, 444], ["Preguntas", false, 534]].map(([t, act, x]) => (
          <span key={t} style={{ ...abs(x, 68), fontSize: u(16), fontWeight: 500, color: act ? "#6C4FD4" : "#17122F", lineHeight: 1.2, whiteSpace: "nowrap" }}>{t}</span>
        ))}
        <IconoCarrito x={612} y={64} size={24} color="#17122F" />
        <span style={{ ...abs(626, 58, { width: u(17), height: u(17) }), borderRadius: "50%", background: "#6C4FD4", color: "#fff", fontSize: u(11), fontWeight: 700, ...centro }}>2</span>

        {/* slider */}
        <div style={{ ...abs(0, 104, { width: u(648), height: u(186) }), overflow: "hidden", background: "#17122F" }}>
          <img src={banner} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(23,18,47,0.6) 0%, rgba(23,18,47,0.28) 45%, rgba(23,18,47,0) 72%)" }} />
          <span style={{ ...abs(44, 62), fontSize: u(32), fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>Nuevos lanzamientos</span>
          <span style={{ ...abs(44, 108, { width: u(320) }), fontSize: u(16), color: "#F1EEF8", lineHeight: 1.35 }}>Descubrí lo último que llegó a la tienda.</span>
        </div>
        {[0, 1].map((k) => (
          <span key={k} style={{ ...abs(k ? 606 : 14, 183, { width: u(28), height: u(28) }), borderRadius: "50%", background: "rgba(23,18,47,0.55)", ...centro }}>
            <svg viewBox="0 0 24 24" style={{ width: u(14), height: u(14), transform: k ? "none" : "rotate(180deg)" }} fill="none">
              <path d="m9 6 6 6-6 6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ))}
        {[300, 314, 342, 356, 370].map((x, k) => (
          <span key={k} style={{ ...abs(x, 266, { width: u(k === 1 ? 22 : 8), height: u(8) }), borderRadius: u(4), background: k === 1 ? "#6C4FD4" : "rgba(255,255,255,0.6)" }} />
        ))}

        {/* productos: tarjetas verticales como las de la tienda, cortadas por el borde de abajo */}
        {PRODUCTOS.map(([src, nombre, precio], k) => (
          <div key={nombre} style={{ ...abs(22 + k * 208, 308, { width: u(192), height: u(192) }), border: `${u(1.5)} solid #EEEBF5`, borderRadius: u(16), background: "#fff", boxSizing: "border-box" }}>
            <div style={{ ...abs(8, 8, { width: u(174), height: u(112) }), borderRadius: u(10), background: "#F3F0FF" }}>
              <img src={src} alt="" style={{ ...abs(12, 14, { width: u(150), height: u(84) }), objectFit: "contain", mixBlendMode: "multiply" }} />
              <span style={{ ...abs(138, 74, { width: u(30), height: u(30) }), borderRadius: "50%", background: "#6C4FD4", ...centro }}>
                <svg viewBox="0 0 24 24" style={{ width: u(16), height: u(16) }} fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <span style={{ ...abs(14, 132), fontSize: u(16), fontWeight: 600, color: "#17122F", lineHeight: 1.2, whiteSpace: "nowrap" }}>{nombre}</span>
            <span style={{ ...abs(14, 158), fontSize: u(16), fontWeight: 700, color: "#6C4FD4", lineHeight: 1.2 }}>{precio}</span>
          </div>
        ))}

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
