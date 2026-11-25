import jean from "../../assets/escenas/carrito-jean.webp"
import remera from "../../assets/escenas/carrito-remera.webp"
import { abs, AvisoOscuro, Caja, CarritoSolido, Cifra, raiz, Toque, u, WhatsAppGlifo } from "./utiles"

// Escena "Pedido directo": el cliente arma su carrito con los botones + y − (un toque suma un jean, otro resta una remera, y el total
// se actualiza al instante), toca "Finalizar Compra" y el pedido llega ARMADO, de golpe, al WhatsApp de la tienda (es un mensaje
// automático: no se escribe). Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo).
// Historia en bucle (9 s) mientras está a la vista (`activa`): toque en el "+" del jean (1 → 2), toque en el "−" de la remera (2 → 1),
// toque en el botón y, enseguida (medio segundo después), se dibuja la línea punteada, aparece el sticker de WhatsApp, entra el mensaje
// "NUEVO PEDIDO" con los datos y el total, y aparece "Pedido recibido". En reposo (o con "reducir movimiento") queda todo ya
// enviado, con el carrito final: 2 jeans y 1 remera ($ 76.500), el mismo de la escena del Carrito.
const LINEAS = [
  ["NUEVO PEDIDO", "b"],
  ["", "gap"],
  ["Datos del cliente:", "b"],
  ["Nombre: Camila R.", ""],
  ["Teléfono: +54 9 351 555 0123", "link"],
  ["Email: camila@mail.com", "link"],
  ["", "gap"],
  ["Dirección de envío:", "b"],
  ["Calle: Av. Colón 123", ""],
  ["Ciudad: Córdoba, Córdoba (5000)", ""],
  ["", "gap"],
  ["Productos:", "b"],
  ["1. Jean Brooklyn", ""],
  ["Cantidad: 2 · Precio unitario: $ 26.000", ""],
  ["Subtotal: $ 52.000", ""],
  ["2. Remera Maia", ""],
  ["Cantidad: 1 · Precio unitario: $ 24.500", ""],
  ["Subtotal: $ 24.500", ""],
  ["", "gap"],
  ["TOTAL: $ 76.500", "b"],
  ["", "gap"],
  ["Pago por alias: tutienda.pago", "b"],
]

const Menos = () => (
  <svg viewBox="0 0 24 24" style={{ width: u(14), height: u(14) }} fill="none">
    <path d="M6 12h12" stroke="#17122F" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
)
const Mas = () => (
  <svg viewBox="0 0 24 24" style={{ width: u(14), height: u(14) }} fill="none">
    <path d="M12 6v12M6 12h12" stroke="#17122F" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
)

// `cantidades`: [[texto, clase], ...]; el primero es el de reposo (el final).
function Fila({ y, foto, nombre, precio, cantidades }) {
  return (
    <>
      <img src={foto} alt="" style={{ ...abs(40, y, { width: u(44), height: u(44) }), borderRadius: u(8), objectFit: "cover" }} />
      <span style={{ ...abs(96, y + 2), fontSize: u(16), fontWeight: 600, color: "#17122F", lineHeight: 1.3 }}>{nombre}</span>
      <span style={{ ...abs(96, y + 22), fontSize: u(14), fontWeight: 600, color: "#6C4FD4", lineHeight: 1.3 }}>{precio}</span>
      <Caja x={218} y={y + 8} w={26} h={28}>
        <Menos />
      </Caja>
      <Caja x={248} y={y + 8} w={28} h={28} />
      <Cifra x={248} y={y + 14} w={28} size={15} weight={600} color="#17122F" align="center" estados={cantidades} />
      <Caja x={280} y={y + 8} w={26} h={28}>
        <Mas />
      </Caja>
    </>
  )
}

export default function EscenaPedido({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "ep-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-30 520C60 480 140 500 200 560C250 610 300 700 330 800" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Mini carrito del cliente */}
      <div
        style={{
          ...abs(22, 100, { width: u(310), height: u(274) }),
          background: "#fff",
          borderRadius: u(22),
          boxShadow: `0 ${u(14)} ${u(36)} rgba(94,70,190,0.2)`,
        }}
      />
      <span style={{ ...abs(40, 114), display: "flex", alignItems: "center", gap: u(8), fontSize: u(17), fontWeight: 600, color: "#17122F" }}>
        <CarritoSolido size={17} color="#6C4FD4" />
        Tu Carrito
      </span>
      <span style={{ ...abs(238, 114, { width: u(72), height: u(24) }), background: "#F1ECFF", borderRadius: u(12) }} />
      <Cifra x={238} y={118} w={72} size={11} weight={600} color="#6C4FD4" align="center" estados={[["3 productos", "ep-cf"], ["4 productos", "ep-cm"]]} />
      <div className="ep-h1" style={{ ...abs(22, 148, { width: u(310), height: u(54) }), background: "#F3EFFF", opacity: 0 }} />
      <div className="ep-h2" style={{ ...abs(22, 204, { width: u(310), height: u(54) }), background: "#F3EFFF", opacity: 0 }} />
      <Fila y={152} foto={jean} nombre="Jean Brooklyn" precio="$ 26.000" cantidades={[["2", "ep-j2"], ["1", "ep-j1"]]} />
      <Fila y={208} foto={remera} nombre="Remera Maia" precio="$ 24.500" cantidades={[["1", "ep-r1"], ["2", "ep-r2"]]} />
      <div style={{ ...abs(22, 262, { width: u(310), height: u(1.5) }), background: "#EEEBF5" }} />
      <span style={{ ...abs(40, 280), fontSize: u(14), color: "#4A4560" }}>Total:</span>
      <Cifra
        x={150}
        y={270}
        w={160}
        size={26}
        weight={800}
        color="#17122F"
        estados={[
          ["$ 76.500", "ep-tf"],
          ["$ 75.000", "ep-t0"],
          ["$ 101.000", "ep-t1"],
        ]}
      />
      <div
        className="ep-boton"
        style={{
          ...abs(40, 320, { width: u(274), height: u(36) }),
          background: "#17122F",
          borderRadius: u(9),
          color: "#fff",
          fontSize: u(15),
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Finalizar Compra
      </div>

      {/* Línea punteada hacia WhatsApp */}
      <svg viewBox="0 0 768 768" className="ep-linea absolute inset-0 h-full w-full" fill="none" style={{ pointerEvents: "none" }}>
        <path d="M168 376V420Q168 436 190 436H214" stroke="#9F8FEF" strokeWidth="6" strokeLinecap="round" strokeDasharray="0.1 13" />
      </svg>

      {/* Celular con el chat de WhatsApp de la tienda: el mismo celular de las otras imágenes (marco violeta oscuro, isla y hora 9:41),
          cortado por el borde de abajo del marco */}
      <div
        style={{
          ...abs(348, 34, { width: u(392), height: u(780) }),
          background: "#3B3262",
          borderTopLeftRadius: u(57),
          borderTopRightRadius: u(57),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(23,18,47,0.34)`,
        }}
      />
      <div
        style={{
          ...abs(359, 45, { width: u(370), height: u(740) }),
          background: "#120D2A",
          borderTopLeftRadius: u(46),
          borderTopRightRadius: u(46),
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: u(110), background: "#2A2158" }} />
      </div>

      {/* Barra de estado */}
      <span style={{ ...abs(388, 56), fontSize: u(15), fontWeight: 800, color: "#fff", lineHeight: u(26) }}>9:41</span>
      <span style={{ ...abs(492, 55, { width: u(104), height: u(26) }), background: "#0B0818", borderRadius: u(13) }} />
      <svg viewBox="0 0 17 11" style={abs(650, 62, { width: u(19), height: u(12) })} fill="#fff" aria-hidden="true">
        <rect x="0" y="7.5" width="3" height="3.5" rx="0.8" />
        <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
        <rect x="9.2" y="2.5" width="3" height="8.5" rx="0.8" />
        <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
      </svg>
      <svg viewBox="0 0 26 12" style={abs(675, 62, { width: u(26), height: u(12) })} fill="none" aria-hidden="true">
        <rect x="0.7" y="0.7" width="21.6" height="10.6" rx="3" stroke="#fff" strokeWidth="1.4" />
        <rect x="2.8" y="2.8" width="17.4" height="6.4" rx="1.6" fill="#fff" />
        <rect x="23.4" y="4" width="2" height="4" rx="1" fill="#fff" />
      </svg>

      {/* Encabezado del chat */}
      <div style={{ ...abs(374, 92, { width: u(46), height: u(46) }), borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#17122F", fontSize: u(12), fontWeight: 800 }}>
        Velvet
      </div>
      <span style={{ ...abs(430, 88), fontSize: u(21), fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Velvet store</span>
      <span style={{ ...abs(430, 114), fontSize: u(14), color: "#BDB4E8", lineHeight: 1.2 }}>en línea</span>
      <span style={{ ...abs(508, 172, { width: u(72), height: u(30) }), background: "#2E2660", borderRadius: u(15), color: "#D9D3F5", fontSize: u(14), fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
        HOY
      </span>

      {/* Mensaje automático: el pedido llega armado */}
      <div style={{ ...abs(360, 214, { width: u(368), height: u(484) }), overflow: "hidden" }}>
        <div
          className="ep-msg"
          style={{
            position: "absolute",
            left: u(12),
            top: u(6),
            width: u(344),
            padding: `${u(16)} ${u(15)}`,
            background: "#261F4C",
            borderRadius: u(18),
            borderTopLeftRadius: u(4),
            color: "#fff",
          }}
        >
          {LINEAS.map(([texto, tipo], i) =>
            tipo === "gap" ? (
              <div key={i} style={{ height: u(7) }} />
            ) : (
              <div
                key={i}
                style={{
                  fontSize: u(14.5),
                  lineHeight: 1.45,
                  fontWeight: tipo === "b" ? 700 : 400,
                  whiteSpace: "nowrap",
                  textDecoration: tipo === "link" ? "underline" : "none",
                  color: tipo === "link" ? "#C9BFFF" : "#fff",
                }}
              >
                {texto}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Barra de mensaje (queda dentro del celular, antes del corte) */}
      <div style={{ ...abs(359, 706, { width: u(370), height: u(62) }), background: "#1B1538" }} />
      <div style={{ ...abs(372, 716, { width: u(296), height: u(40) }), background: "#2A2158", borderRadius: u(20), color: "#9B93C8", fontSize: u(15), paddingLeft: u(18), display: "flex", alignItems: "center" }}>
        Mensaje
      </div>
      <div style={{ ...abs(676, 715, { width: u(42), height: u(42) }), background: "#6C4FD4", borderRadius: "50%" }} />

      {/* Sticker "Directo a tu WhatsApp" */}
      <div
        className="ep-wa"
        style={{
          ...abs(184, 412, { width: u(186), height: u(176) }),
          background: "linear-gradient(160deg, #4CCB5B 0%, #2C9A3D 100%)",
          borderRadius: u(38),
          boxShadow: `0 ${u(14)} ${u(34)} rgba(44,154,61,0.40)`,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: u(2),
        }}
      >
        <WhatsAppGlifo size={64} />
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.05, marginTop: u(6) }}>Directo</span>
        <span style={{ fontSize: u(14), fontWeight: 700, letterSpacing: "0.04em" }}>A TU WHATSAPP</span>
      </div>

      {/* Aviso */}
      <AvisoOscuro className="ep-aviso" x={36} y={634} h={66} texto="Pedido recibido" />

      {/* Toques (tap): el "+" del jean, el "−" de la remera y el botón del carrito */}
      <Toque clase="ep-tp" x={293} y={174} ini={0.9} dur={9} />
      <Toque clase="ep-tm" x={231} y={230} ini={2.0} dur={9} />
      <Toque clase="ep-ta" x={177} y={338} ini={3.2} dur={9} />
    </div>
  )
}
