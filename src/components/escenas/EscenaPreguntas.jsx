import { abs, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Preguntas frecuentes": un acordeón que se despliega simple. Lienzo de 768 px que escala con el ancho del marco (--u = 1 px
// del lienzo). Historia en bucle (12 s) mientras está a la vista (`activa`): arranca todo cerrado; un toque en cada pregunta la
// despliega y cierra la anterior (al mismo tiempo, así la tarjeta blanca crece y se achica según lo abierto) (las respuestas se abren y se cierran con la altura, así el resto baja y sube). En reposo (o con
// "reducir movimiento") queda la primera abierta, como en la imagen original.
// Las respuestas son de ejemplo, en el tono de la web (el pago por alias y el envío por WhatsApp).
const RESENAS = [
  ["Lucía M.", "L", "Llegó rapidísimo y el jean me queda perfecto. Recomiendo la tienda."],
  ["Camila R.", "C", "Muy buena atención por WhatsApp, me ayudaron a elegir el talle."],
  ["Marcos P.", "M", "Lo pedí el lunes y el miércoles ya lo tenía. Excelente."],
]
const PREGUNTAS = [
  ["¿Hacen envíos?", "Sí, coordinamos el envío por WhatsApp una vez que confirmás tu pedido."],
  ["¿Cómo puedo pagar?", "Pagás por transferencia al alias de la tienda y coordinamos todo por WhatsApp."],
  ["¿Puedo cambiar un producto?", "Sí, escribinos por WhatsApp y coordinamos el cambio."],
]

export default function EscenaPreguntas({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "eq-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M470 640C500 700 520 730 520 790" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M640 800C690 740 740 720 800 730" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Tarjeta de preguntas */}
      <div
        style={{
          ...abs(118, 90, { width: u(504) }),
          background: "#fff",
          borderRadius: u(28),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)`,
          padding: `${u(28)} ${u(27)}`,
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: u(24), fontWeight: 600, color: "#17122F", lineHeight: u(30) }}>Preguntas frecuentes</div>
        <div style={{ marginTop: u(6), fontSize: u(14), color: "#8E89A3", lineHeight: u(20) }}>Respondé las dudas de tus clientes en un solo lugar.</div>
        <div style={{ marginTop: u(16), borderTop: `${u(1.5)} solid #EEEBF5` }}>
          {PREGUNTAS.map(([pregunta, respuesta], i) => (
            <div key={pregunta} style={{ borderBottom: `${u(1.5)} solid #EEEBF5` }}>
              <div style={{ height: u(58), display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  className={`eq-t${i}`}
                  style={{ fontSize: u(17), fontWeight: 500, color: i === 0 ? "#17122F" : "#4A4560", whiteSpace: "nowrap" }}
                >
                  {pregunta}
                </span>
                <span
                  className={`eq-c${i}`}
                  style={{
                    width: u(28),
                    height: u(28),
                    borderRadius: "50%",
                    background: i === 0 ? "#17122F" : "#EFEAFD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "none",
                  }}
                >
                  <svg
                    className={`eq-s${i}`}
                    viewBox="0 0 24 24"
                    style={{ width: u(15), height: u(15), color: i === 0 ? "#fff" : "#6C4FD4", transform: i === 0 ? "rotate(180deg)" : "none" }}
                    fill="none"
                  >
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className={`eq-r${i}`} style={{ display: "grid", gridTemplateRows: i === 0 ? "1fr" : "0fr" }}>
                <div style={{ overflow: "hidden", minHeight: 0 }}>
                  <div
                    style={{
                      marginBottom: u(12),
                      minHeight: u(72),
                      boxSizing: "border-box",
                      padding: u(14),
                      background: "#F3F0FF",
                      borderRadius: u(14),
                      fontSize: u(15),
                      lineHeight: 1.45,
                      color: "#4A4560",
                    }}
                  >
                    {respuesta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticker "Preguntas frecuentes" */}
      <Pegatina xd={716} y={36} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Preguntas</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>FRECUENTES</span>
      </Pegatina>

      {/* Reseñas de clientes (prueba social): tres reseñas que se deslizan suave, como un carrusel */}
      <div
        style={{
          ...abs(60, 516, { width: u(330), height: u(176) }),
          background: "#fff",
          borderRadius: u(28),
          boxShadow: `0 ${u(14)} ${u(36)} rgba(94,70,190,0.18)`,
          overflow: "hidden",
        }}
      >
        <div className="eq-car" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "400%", display: "flex" }}>
          {[...RESENAS, RESENAS[0]].map(([nombre, inicial, texto], i) => (
            <div key={i} style={{ position: "relative", width: "25%", height: "100%", flex: "none" }}>
              <span
                style={{
                  ...abs(26, 24, { width: u(44), height: u(44) }),
                  borderRadius: "50%",
                  background: "#E2D9FF",
                  color: "#6C4FD4",
                  fontSize: u(19),
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {inicial}
              </span>
              <span style={{ ...abs(80, 21), fontSize: u(19), fontWeight: 600, color: "#17122F", lineHeight: 1.3, whiteSpace: "nowrap" }}>{nombre}</span>
              {[0, 1, 2, 3, 4].map((k) => (
                <svg key={k} viewBox="0 0 24 24" style={abs(80 + k * 21, 49, { width: u(19), height: u(19) })} fill="#FF9A52" aria-hidden="true">
                  <path d="m12 2.8 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1L3.2 9.3l6.1-.9L12 2.8Z" />
                </svg>
              ))}
              <span style={{ ...abs(26, 88, { width: u(278) }), fontSize: u(16), color: "#4A4560", lineHeight: 1.4 }}>{texto}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Puntitos del carrusel */}
      {[0, 1, 2].map((k) => (
        <span key={k}>
          <span style={{ ...abs(207 + k * 18, 666, { width: u(8), height: u(8) }), borderRadius: "50%", background: "#DAD4F0" }} />
          <span className={`eq-p${k}`} style={{ ...abs(207 + k * 18, 666, { width: u(8), height: u(8) }), borderRadius: "50%", background: "#6C4FD4", opacity: k === 0 ? 1 : 0 }} />
        </span>
      ))}

      {/* Sticker "Reseñas" */}
      <Pegatina x={384} y={552} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Reseñas</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>PRUEBA SOCIAL</span>
      </Pegatina>

      {/* Toques (tap) sobre la flechita de cada pregunta que se abre */}
      <Toque clase="eq-ta" x={581} y={278.5} ini={2.544} dur={12} />
      <Toque clase="eq-tb" x={581} y={422} ini={6.5} dur={12} />
      <Toque clase="eq-tc" x={581} y={219} ini={10.46} dur={12} />
    </div>
  )
}
