import { abs, AvisoOscuro, BotonTienda, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Mercado Pago y cuotas": el panel de gestión (Medios de pago, Mercado Pago y Venta en cuotas) dibujado como el real. Lienzo de
// 768 px que escala con el ancho del marco (--u = 1 px del lienzo). Historia en bucle (13 s) mientras está a la vista (`activa`):
//  1,8 s  toque en "Conectar Mercado Pago" → "Conectando…" → queda "Conectado" (se habilita "Desconectar") y aparece un aviso.
//  5,0 s  toque en "Activar venta en cuotas" → se habilitan los campos y se completan los recargos (0, 5, 10, 15, 20, 30 %).
//  7,8 s  toque en "Guardar" → aviso "Venta en cuotas activada".
// Cada cambio de estado es un reemplazo corto de una pieza por otra (no un fundido de la imagen entera). En reposo (o con "reducir
// movimiento") queda todo conectado y activo. Los tiempos están en index.css (pa-).
const VIO = "#6C4FD4"
const OSC = "#17122F"
const LIL = "#F1ECFF"

const Tilde = ({ size, color = "#fff" }) => (
  <svg viewBox="0 0 24 24" style={{ width: u(size), height: u(size) }} fill="none" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Tarjeta = ({ x, y, w, h }) => (
  <div
    style={{
      ...abs(x, y, { width: u(w), height: u(h) }),
      background: "#fff",
      borderRadius: u(18),
      boxShadow: `0 ${u(12)} ${u(30)} rgba(94,70,190,0.16)`,
    }}
  />
)

const Titulo = ({ x, y, texto, premium }) => (
  <div style={{ ...abs(x, y), display: "flex", alignItems: "center", gap: u(9), whiteSpace: "nowrap" }}>
    <span style={{ fontSize: u(19), fontWeight: 800, color: OSC, lineHeight: 1.2 }}>{texto}</span>
    {premium && (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: u(5),
          padding: `${u(4.5)} ${u(10)}`,
          borderRadius: 999,
          background: OSC,
          color: "#fff",
          fontSize: u(11.5),
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: u(11.5), height: u(11.5) }} fill="currentColor" aria-hidden="true">
          <path d="M3 8l4.5 3.5L12 5l4.5 6.5L21 8l-2 10H5z" />
        </svg>
        Premium
      </span>
    )}
  </div>
)

const Casilla = ({ x, y, className, estilo = {}, children }) => (
  <div className={className} style={{ ...abs(x, y, { width: u(19), height: u(19) }), borderRadius: u(6), display: "flex", alignItems: "center", justifyContent: "center", ...estilo }}>
    {children}
  </div>
)

const Texto = ({ x, y, w, size, weight = 600, color = OSC, lh = 1.2, className = "", style = {}, children }) => (
  <span className={className} style={{ ...abs(x, y, w ? { width: u(w) } : {}), fontSize: u(size), fontWeight: weight, color, lineHeight: lh, whiteSpace: w ? "normal" : "nowrap", ...style }}>
    {children}
  </span>
)

// Botón del panel con borde (sin relleno) o relleno suave. Mismas medidas que los botones del panel real.
const Boton = ({ x, y, w, h = 37, size = 13.4, className = "", estilo = {}, children }) => (
  <div
    className={className}
    style={{
      ...abs(x, y, { width: u(w), height: u(h) }),
      borderRadius: u(10),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: u(7),
      fontSize: u(size),
      fontWeight: 700,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...estilo,
    }}
  >
    {children}
  </div>
)

const borde = (c) => ({ boxShadow: `inset 0 0 0 ${u(1.6)} ${c}` })

const CUOTAS = [
  ["1 cuota", "0"],
  ["3 cuotas", "5"],
  ["6 cuotas", "10"],
  ["9 cuotas", "15"],
  ["12 cuotas", "20"],
  ["18 cuotas", "30"],
]
const COL = [59, 280, 502]
const FILA = [489, 547]

export default function EscenaPagos({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "pa-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 70C50 40 100 90 96 170" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M600 800C640 740 700 725 800 745" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Medios de pago (siempre iguales) */}
      <Tarjeta x={38} y={160} w={333} h={211} />
      <Titulo x={58} y={178} texto="Medios de pago" />
      <Casilla x={58} y={220} estilo={{ background: VIO }}>
        <Tilde size={12.5} />
      </Casilla>
      <Texto x={86} y={220} size={14.7} lh={1.3}>Habilitar efectivo</Texto>
      <Casilla x={58} y={251} estilo={{ background: VIO }}>
        <Tilde size={12.5} />
      </Casilla>
      <Texto x={86} y={251} size={14.7} lh={1.3}>Habilitar transferencia / WhatsApp</Texto>
      <BotonTienda tono="panel" x={58} y={315} w={293} h={37} size={13.4} style={{ fontWeight: 700, borderRadius: u(10) }}>
        Guardar métodos
      </BotonTienda>

      {/* Mercado Pago */}
      <Tarjeta x={384} y={160} w={346} h={211} />
      <Titulo x={404} y={178} texto="Mercado Pago" premium />
      {/* estado: desconectado → conectado */}
      <Boton x={404} y={217} w={108} h={25} size={11.5} className="pa-b0" estilo={{ background: LIL, color: VIO, borderRadius: 999, opacity: 0 }}>
        Desconectado
      </Boton>
      <Boton x={404} y={217} w={104} h={25} size={11.5} className="pa-b1" estilo={{ background: VIO, color: "#fff", borderRadius: 999 }}>
        <Tilde size={10} />
        Conectado
      </Boton>
      <Texto x={404} y={252} w={305} size={13.4} lh={1.4} className="pa-t0" style={{ opacity: 0 }}>
        Conectá tu cuenta para habilitar Mercado Pago como medio de pago.
      </Texto>
      <Texto x={404} y={252} w={305} size={13.4} lh={1.4} className="pa-t1">
        Tu cuenta está conectada: ya podés cobrar con Mercado Pago.
      </Texto>
      {/* Conectar: normal → apretado → "Conectando…" → apagado */}
      <Boton x={404} y={315} w={182} className="pa-c0" estilo={{ background: "#fff", color: VIO, ...borde(VIO), opacity: 0 }}>
        Conectar Mercado Pago
      </Boton>
      <Boton x={404} y={315} w={182} className="pa-cx" estilo={{ background: LIL, color: VIO, ...borde(VIO), opacity: 0 }}>
        <svg viewBox="0 0 24 24" className="pa-spin" style={{ width: u(13), height: u(13) }} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        Conectando…
      </Boton>
      <Boton x={404} y={315} w={182} className="pa-c1" estilo={{ background: "#fff", color: "#B9B3D0", ...borde("#E6E2F0") }}>
        Conectar Mercado Pago
      </Boton>
      {/* Desconectar: apagado → disponible */}
      <Boton x={595} y={315} w={114} className="pa-d0" estilo={{ background: "#fff", color: "#B9B3D0", ...borde("#E6E2F0"), opacity: 0 }}>
        Desconectar
      </Boton>
      <Boton x={595} y={315} w={114} className="pa-d1" estilo={{ background: "#fff", color: VIO, ...borde(VIO) }}>
        Desconectar
      </Boton>

      {/* Venta en cuotas */}
      <Tarjeta x={38} y={384} w={691} h={243} />
      <Titulo x={59} y={402} texto="Venta en cuotas" premium />
      {/* Guardar: apagado → disponible */}
      <Boton x={613} y={398} w={96} className="pa-g0" estilo={{ background: "#CBC0F2", color: "#fff", opacity: 0 }}>
        Guardar
      </Boton>
      <Boton x={613} y={398} w={96} className="pa-g1" estilo={{ background: VIO, color: "#fff" }}>
        Guardar
      </Boton>
      {/* casilla: vacía → marcada */}
      <Casilla x={59} y={440} className="pa-k0" estilo={{ background: "#fff", boxShadow: `inset 0 0 0 ${u(1.6)} #CFC9E0`, opacity: 0 }} />
      <Casilla x={59} y={440} className="pa-k1" estilo={{ background: VIO }}>
        <Tilde size={12.5} />
      </Casilla>
      <Texto x={87} y={440} size={14.7} lh={1.3}>Activar venta en cuotas</Texto>

      <Texto x={59} y={469} size={12} weight={700} color={OSC} className="pa-etq">
        Recargo orientativo por plan (%)
      </Texto>
      {CUOTAS.map(([etiqueta, valor], i) => {
        const x = COL[i % 3]
        const y = FILA[Math.floor(i / 3)]
        const n = i + 1
        return (
          <div key={etiqueta}>
            <Texto x={x} y={y} size={12} weight={700} color={OSC} className="pa-etq">
              {etiqueta}
            </Texto>
            <div className="pa-caja" style={{ ...abs(x, y + 17, { width: u(207), height: u(33) }), borderRadius: u(9), background: "#fff", boxShadow: `inset 0 0 0 ${u(1.3)} #CFC3F7` }}>
              <span className={`pa-z${n}`} style={{ position: "absolute", left: u(11.5), top: 0, height: "100%", display: "flex", alignItems: "center", fontSize: u(13.4), fontWeight: 600, color: "#B9B3D0", opacity: 0 }}>
                0
              </span>
              <span className={`pa-v${n}`} style={{ position: "absolute", left: u(11.5), top: 0, height: "100%", display: "flex", alignItems: "center", fontSize: u(13.4), fontWeight: 600, color: OSC }}>
                {valor}
              </span>
            </div>
            <div className={`pa-r${n}`} style={{ ...abs(x, y + 17, { width: u(207), height: u(33) }), borderRadius: u(9), boxShadow: `0 0 0 ${u(2)} ${VIO}`, opacity: 0, pointerEvents: "none" }} />
          </div>
        )
      })}

      {/* Sticker */}
      <Pegatina xd={722} y={44} giro={6}>
        <span style={{ fontSize: u(32), fontWeight: 800, lineHeight: 1.1 }}>Mercado Pago</span>
        <span style={{ fontSize: u(32), fontWeight: 800, lineHeight: 1.1 }}>y cuotas</span>
      </Pegatina>

      {/* Avisos: el de reposo y los dos de la historia */}
      <AvisoOscuro className="pa-a0" x={40} y={660} h={56} texto="Cobrá como quieras" />
      <AvisoOscuro className="pa-a1" x={40} y={660} h={56} texto="Mercado Pago conectado" />
      <AvisoOscuro className="pa-a2" x={40} y={660} h={56} texto="Venta en cuotas activada" />

      {/* Toques (tap): conectar, casilla de cuotas y guardar */}
      <Toque clase="pa-ta" x={495} y={333.5} ini={1.75} dur={13} />
      <Toque clase="pa-tb" x={68.5} y={449.5} ini={4.95} dur={13} />
      <Toque clase="pa-tc" x={661} y={416.5} ini={7.75} dur={13} />
    </div>
  )
}
