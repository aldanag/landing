import jean from "../../assets/escenas/carrito-jean.webp"
import remera from "../../assets/escenas/carrito-remera.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"
import { abs, AvisoOscuro, BotonTienda, Cifra, Fila, IconoCarrito, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Automatizá descuentos": el MISMO carrito de la escena del Carrito (Jean Brooklyn y Remera Maia, mismas filas), donde se
// aplica un cupón en la web y el total baja un 10 %. Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo).
// Historia en bucle (10 s) mientras está a la vista (`activa`): un toque en el campo, se escribe TIKTOK10, un toque en "Aplicar",
// aparece "¡Cupón aplicado con éxito!", el cupón queda en el carrito, se suma la línea de descuento y el total baja de $ 76.500 a
// $ 68.850. En reposo (o con "reducir movimiento") queda en el estado final, sin el aviso.
// 10 % de $ 76.500 = $ 7.650 de descuento.
//
// Los espacios salen de Y0 (arriba de la tarjeta) para que se pueda mover todo junto; la tarjeta queda centrada en el marco.
const Y0 = 62
const ESTADOS_TOTAL = [
  ["$ 68.850", "ed-v38"],
  ["$ 76.500", "ed-i38"],
]

export default function EscenaDescuentos({ activa = false }) {
  const yCupon = Y0 + 108
  const yJean = Y0 + 176
  const yRemera = yJean + 98
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "ed-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 600C30 590 80 610 110 650" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M690 -10C730 20 760 50 800 60" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* El carrito, achicado al 88 % desde su centro para que entren cómodas las dos etiquetas */}
      <div style={{ position: "absolute", inset: 0, transform: "scale(0.92)", transformOrigin: "50% 48.3%" }}>
      {/* Tarjeta */}
      <div
        style={{
          ...abs(61, Y0, { width: u(645), height: u(641) }),
          background: "#fff",
          borderRadius: u(36),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.22)`,
        }}
      />

      {/* Encabezado (igual al del Carrito) */}
      <IconoCarrito x={97} y={Y0 + 42} size={32} />
      <span style={{ ...abs(142, Y0 + 37), fontSize: u(30), fontWeight: 600, color: "#17122F", lineHeight: u(44) }}>Tu Carrito</span>
      <div style={{ ...abs(534, Y0 + 37, { width: u(135), height: u(42) }), background: "#F1ECFF", borderRadius: u(21) }} />
      <Cifra x={534} y={Y0 + 46} w={135} size={20} weight={600} color="#6C4FD4" align="center" estados={[["3 productos", ""]]} />

      {/* Cupón, antes de aplicarlo: campo de código y botón "Aplicar" */}
      <div className="ed-i36" style={{ opacity: 0 }}>
        <div
          style={{
            ...abs(98, yCupon, { width: u(424), height: u(50) }),
            background: "#F6F3FE",
            border: `${u(1.5)} solid #E4DFF3`,
            borderRadius: u(13),
            boxSizing: "border-box",
          }}
        />
        <span className="ed-ph" style={{ ...abs(118, yCupon + 12), fontSize: u(20), color: "#9B96B2", lineHeight: 1.3 }}>
          Código de cupón
        </span>
        <span
          className="ed-code"
          style={{
            ...abs(118, yCupon + 11),
            fontSize: u(21),
            fontWeight: 600,
            letterSpacing: "0.03em",
            color: "#17122F",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            clipPath: "inset(0 100% 0 0)",
          }}
        >
          TIKTOK10
        </span>
        <BotonTienda className="ed-aplicar" x={534} y={yCupon} w={135} h={50} size={21}>
          Aplicar
        </BotonTienda>
      </div>

      {/* Cupón aplicado (estado de reposo): fila crema con el código y el tilde naranja */}
      <div className="ed-v36">
        <div style={{ ...abs(98, yCupon, { width: u(571), height: u(50) }), background: "#FCF3E3", borderRadius: u(13) }} />
        <svg viewBox="0 0 24 24" style={abs(118, yCupon + 13, { width: u(24), height: u(24) })} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#FF9A52" />
          <path d="M8 16l8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8.6" cy="8.6" r="1.5" fill="#fff" />
          <circle cx="15.4" cy="15.4" r="1.5" fill="#fff" />
        </svg>
        <span style={{ ...abs(152, yCupon + 10), fontSize: u(21), fontWeight: 700, letterSpacing: "0.03em", color: "#E8863B", lineHeight: 1.3 }}>
          TIKTOK10
        </span>
        <div
          style={{
            ...abs(633, yCupon + 12, { width: u(26), height: u(26) }),
            borderRadius: "50%",
            background: "#FF9A52",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: u(15), height: u(15) }} fill="none" aria-hidden="true">
            <path d="m5 13 4 4 10-10" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Filas (las mismas del Carrito) */}
      <div style={{ ...abs(61, yJean - 1, { width: u(645), height: u(1.5) }), background: "#EEEBF5" }} />
      <Fila y={yJean} foto={jean} nombre="Jean Brooklyn" precio="$ 26.000" cantidades={[["2", ""]]} />
      <Fila y={yRemera} foto={remera} nombre="Remera Maia" precio="$ 24.500" cantidades={[["1", ""]]} />

      {/* Subtotal, descuento y total */}
      <span style={{ ...abs(98, yRemera + 114), fontSize: u(21), color: "#4A4560", lineHeight: 1.3 }}>Subtotal:</span>
      <Cifra x={380} y={yRemera + 112} w={289} size={22} weight={500} color="#17122F" estados={[["$ 76.500", ""]]} />
      <div className="ed-v38">
        <span style={{ ...abs(98, yRemera + 148), fontSize: u(21), fontWeight: 500, color: "#6C4FD4", lineHeight: 1.3 }}>Descuento · 10%</span>
        <span
          style={{ ...abs(380, yRemera + 146, { width: u(289), textAlign: "right" }), fontSize: u(22), fontWeight: 700, color: "#6C4FD4", lineHeight: 1.3 }}
        >
          −$ 7.650
        </span>
      </div>
      <div style={{ ...abs(61, yRemera + 186, { width: u(645), height: u(1.5) }), background: "#EEEBF5" }} />
      <span style={{ ...abs(98, yRemera + 218), fontSize: u(23), fontWeight: 500, color: "#4A4560", lineHeight: 1.3 }}>Total:</span>
      <Cifra x={360} y={yRemera + 202} w={309} size={42} weight={800} color="#17122F" estados={ESTADOS_TOTAL} />

      {/* Botón de la tienda (el mismo en todas las escenas) */}
      <BotonTienda x={98} y={Y0 + 548} w={571} h={56} size={23}>
        Finalizar Compra
      </BotonTienda>

      {/* Toques (tap) sobre el campo y sobre "Aplicar" */}
      <Toque clase="ed-ta" x={300} y={yCupon + 25} ini={1.28} dur={10} />
      <Toque clase="ed-tb" x={601} y={yCupon + 25} ini={3.1} dur={10} />
      </div>

      {/* Sticker "10 % de descuento" */}
      <Pegatina className="ed-sticker" x={330} y={36} giro={10}>
        <FontAwesomeIcon icon={faTag} style={{ width: u(44), height: u(44), color: "#fff" }} aria-hidden="true" />
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1, marginTop: u(4) }}>10%</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>DE DESCUENTO</span>
      </Pegatina>

      {/* Aviso: aparece al aplicar el cupón */}
      <AvisoOscuro className="ed-toast" x={100} y={664} h={66} texto="¡Cupón aplicado con éxito!" />

    </div>
  )
}
