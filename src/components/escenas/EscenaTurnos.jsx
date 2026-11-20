import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons"
import { abs, AvisoOscuro, BotonTienda, Pegatina, fondoOscuro, raiz, RuloMarca, Toque, u } from "./utiles"

// Escena "Tienda de servicios": solo la parte de arriba de la reserva ("Reservá tu turno"), que es lo que ve el cliente en la tienda.
// Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo). Historia en bucle (12 s) mientras está a la vista
// (`activa`): un toque elige el día, otro la hora, otro confirma, y aparece "Turno reservado". En reposo (o con "reducir movimiento")
// queda ya reservado (Mié 14, 11:30).
const DIAS = [
  ["Lun", 12],
  ["Mar", 13],
  ["Mié", 14],
  ["Jue", 15],
  ["Vie", 16],
]
const HORAS = ["10:00", "10:45", "11:30", "12:15", "15:00", "15:45"]

const caja = { boxSizing: "border-box", border: `${u(1.5)} solid #E4DFF3`, background: "#fff" }

export default function EscenaTurnos({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "et-activa" : ""}`} style={{ ...raiz, background: fondoOscuro }}>
      {/* Rulo de la marca */}
      <RuloMarca />

      {/* Tarjeta de reserva */}
      <div
        style={{
          ...abs(64, 148, { width: u(640), height: u(416) }),
          background: "#fff",
          borderRadius: u(34),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(0,0,0,0.35)`,
        }}
      />
      <span style={{ ...abs(100, 180), fontSize: u(34), fontWeight: 700, color: "#17122F", lineHeight: 1.2, whiteSpace: "nowrap" }}>Reservá tu turno</span>
      <span
        style={{
          ...abs(620, 178, { width: u(48), height: u(48) }),
          borderRadius: "50%",
          background: "#F1ECFF",
          color: "#6C4FD4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon icon={faCalendarCheck} style={{ width: u(22), height: u(22) }} />
      </span>

      {/* Días */}
      {DIAS.map(([dia, n], i) => {
        const x = 100 + i * 116.25
        const contenido = (color1, color2) => (
          <>
            <span style={{ fontSize: u(15), fontWeight: 500, color: color1, lineHeight: 1.1 }}>{dia}</span>
            <span style={{ fontSize: u(30), fontWeight: 600, color: color2, lineHeight: 1.1, marginTop: u(3) }}>{n}</span>
          </>
        )
        const centro = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }
        return (
          <div key={dia}>
            <div style={{ ...abs(x, 248, { width: u(103), height: u(74) }), ...caja, borderRadius: u(18), ...centro }}>{contenido("#7A7590", "#17122F")}</div>
            {(i === 0 || i === 2) && (
              <div
                className={i === 0 ? "et-d0" : "et-d2"}
                style={{ ...abs(x, 248, { width: u(103), height: u(74) }), background: "#6C4FD4", borderRadius: u(18), ...centro, opacity: i === 2 ? 1 : 0 }}
              >
                {contenido("#E6E0FF", "#fff")}
              </div>
            )}
          </div>
        )
      })}

      {/* Horas */}
      {HORAS.map((h, i) => {
        const x = 100 + (i % 3) * 193.5
        const y = 342 + Math.floor(i / 3) * 56
        const centro = { display: "flex", alignItems: "center", justifyContent: "center", fontSize: u(23), fontWeight: 500 }
        return (
          <div key={h}>
            <div style={{ ...abs(x, y, { width: u(180), height: u(46) }), ...caja, borderRadius: u(14), color: "#17122F", ...centro }}>{h}</div>
            {i === 2 && (
              <div
                className="et-h"
                style={{ ...abs(x, y, { width: u(180), height: u(46) }), background: "#6C4FD4", borderRadius: u(14), color: "#fff", ...centro, opacity: 1 }}
              >
                {h}
              </div>
            )}
          </div>
        )
      })}

      <BotonTienda className="et-boton" x={100} y={476} w={568} h={52} size={22}>
        <FontAwesomeIcon icon={faCalendarCheck} style={{ width: u(22), height: u(22) }} />
        Confirmar turno
      </BotonTienda>

      {/* Sticker "Tus horarios" */}
      <Pegatina className="et-sticker" xd={736} y={530} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Tus horarios</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>VOS ELEGÍS CUÁNDO</span>
      </Pegatina>

      {/* Aviso */}
      <AvisoOscuro sobreOscuro className="et-aviso" x={40} y={100} h={66} texto="Turno reservado" />

      {/* Toques (tap): día, hora y confirmar */}
      <Toque clase="et-ta" x={384} y={285} ini={1.58} dur={12} />
      <Toque clase="et-tb" x={577} y={365} ini={3.26} dur={12} />
      <Toque clase="et-tc" x={384} y={502} ini={5.3} dur={12} />
    </div>
  )
}
