import base from "../../assets/escenas/estadisticas-base.webp"
import { abs, AvisoOscuro, raiz, u } from "./utiles"

// Escena "Estadísticas": el panel de estadísticas de la tienda, con gráficos de ejemplo en los colores de la marca. El panel (ventana,
// menú con el tablero seleccionado, títulos y marcos) es una imagen (`estadisticas-base.webp`, se genera con
// `python herramientas/premium-imagenes/generar.py estadisticas-base`) y encima se dibuja en vivo lo que se mueve: la curva de
// ingresos, las dos tortas, las barras y los números. Las posiciones salen de `python generar.py estadisticas-medidas` (en píxeles de
// la imagen de 1200 px; acá se pasan al lienzo de 768 px con `k`).
// Bucle de 12 s mientras está a la vista (`activa`): 1) se llena: la curva se dibuja, las tortas se arman por tramos y las barras
// crecen; 2) el punto final de la curva late; 3) llega una venta: entra el aviso "Nueva venta", el total sube de $ 482.300 a
// $ 497.800, el "+ 18 %" pasa a "+ 21 %", la curva sube, entra un pedido pendiente (7 a 8, el total pasa de 51 a 52) y Jean Brooklyn suma una (48 a 49).
// Al final se desvanece y vuelve a empezar. En reposo (o con "reducir movimiento") queda todo dibujado, con los números iniciales.
const k = 0.64
const x = (n) => n * k
const s = (n) => u(n * k)
const VIO = "#6C4FD4"
const TINTA = "#17122F"

const CURVA_A = "M0 128C26 120 40 92 66 98S118 126 144 92S196 46 226 62S286 104 318 60S384 18 430 28S520 6 560 14"
const CURVA_B = "M0 128C26 120 40 92 66 98S118 126 144 92S196 46 226 62S286 104 318 60S384 14 430 22S520 -2 560 2"

// [largo en % del círculo, desde, color]
const ESTADOS_A = [[50.98, 0, VIO], [25.49, 50.98, "#A99BF0"], [13.73, 76.47, TINTA], [9.8, 90.2, "#CBC0F2"]]
const ESTADOS_B = [[50, 0, VIO], [25, 50, "#A99BF0"], [15.38, 75, TINTA], [9.62, 90.38, "#CBC0F2"]]
const CATEGORIAS = [[38, 0, VIO], [27, 38, "#A99BF0"], [21, 65, TINTA], [14, 86, "#CBC0F2"]]
const BARRAS = [
  { n: "48", ancho: 253.3, top: 646, color: VIO },
  { n: "36", ancho: 190, top: 716, color: "#8B76E6" },
  { n: "24", ancho: 126.7, top: 786, color: "#A99BF0" },
  { n: "15", ancho: 79, top: 856, color: "#CBC0F2" },
]
const LEYENDA = [
  { top: 781, n: "26" },
  { top: 815, n: "13" },
  { top: 849, n: "7", cambia: "8" },
  { top: 883, n: "5" },
]

// Texto con dos estados (el de antes de la venta y el de después)
function Estado({ left, top, w, h, size, weight = 800, color = TINTA, align = "right", lh, a, b, claseA, claseB }) {
  const comun = {
    ...abs(x(left), x(top), { width: s(w), height: s(h) }),
    fontSize: s(size),
    fontWeight: weight,
    color,
    textAlign: align,
    lineHeight: lh ?? 1,
    whiteSpace: "nowrap",
    transformOrigin: align === "right" ? "right center" : align === "left" ? "left center" : "center",
  }
  return (
    <>
      <span className={claseA} style={comun}>
        {a}
      </span>
      {b !== undefined && (
        <span className={claseB} style={{ ...comun, opacity: 0 }}>
          {b}
        </span>
      )}
    </>
  )
}

function Torta({ left, top, arcos, clase, grupo, mascara, barrido }) {
  const circulos = arcos.map(([largo, desde, color], i) => (
    <circle
      key={i}
      className={`${clase}-${i}`}
      cx="90"
      cy="90"
      r="62"
      fill="none"
      stroke={color}
      strokeWidth="28"
      pathLength="100"
      transform="rotate(-90 90 90)"
      style={{ strokeDasharray: `${largo} ${100 - largo}`, strokeDashoffset: -desde }}
    />
  ))
  return (
    <svg viewBox="0 0 180 180" style={abs(x(left), x(top), { width: s(160), height: s(160) })} fill="none">
      {/* Barrido: una máscara con forma de anillo que se dibuja en el sentido de las agujas del reloj y va mostrando los tramos */}
      {mascara && (
        <defs>
          <mask id={mascara} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle className={barrido} cx="90" cy="90" r="62" fill="none" stroke="#fff" strokeWidth="34" pathLength="100" transform="rotate(-90 90 90)" style={{ strokeDasharray: "100 0" }} />
          </mask>
        </defs>
      )}
      <g className={grupo} mask={mascara ? `url(#${mascara})` : undefined}>
        {circulos}
      </g>
    </svg>
  )
}

export default function EscenaEstadisticas({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "est-activa" : ""}`} style={raiz}>
      <img src={base} alt="" className="absolute inset-0 h-full w-full" />

      <div className="est-graf" style={{ position: "absolute", inset: 0 }}>
        {/* Ingresos últimos 30 días: total, variación y curva */}
        <Estado left={190} top={383.7} w={260} h={50.6} size={46} lh={1.1} align="left" a="$ 482.300" b="$ 497.800" claseA="est-num-a" claseB="est-num-b" />
        <span style={{ ...abs(x(190), x(448.3), { width: s(88), height: s(40) }), borderRadius: "9999px", background: "#F1ECFF" }} />
        <Estado left={190} top={448.3} w={88} h={40} size={19} color={VIO} align="center" lh="2.1" a="+ 18 %" b="+ 21 %" claseA="est-pil-a" claseB="est-pil-b" />
        <svg viewBox="0 0 560 150" style={abs(x(518), x(361), { width: s(560), height: s(150), overflow: "visible" })} fill="none">
          <defs>
            <linearGradient id="est-relleno" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={VIO} stopOpacity="0.32" />
              <stop offset="1" stopColor={VIO} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* antes de la venta */}
          <g className="est-curva-a">
            <path className="est-area-a" d={`${CURVA_A}V150H0Z`} fill="url(#est-relleno)" />
            <path className="est-trazo-a" d={CURVA_A} pathLength="1" stroke={VIO} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1 }} />
            <circle className="est-punto-a" cx="560" cy="14" r="8" fill="#fff" stroke={VIO} strokeWidth="4.5" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            <circle className="est-pulso" cx="560" cy="14" r="8" stroke={VIO} strokeWidth="3" style={{ opacity: 0, transformBox: "fill-box", transformOrigin: "center" }} />
          </g>
          {/* después de la venta: la curva termina más arriba */}
          <g className="est-curva-b" style={{ opacity: 0 }}>
            <path d={`${CURVA_B}V150H0Z`} fill="url(#est-relleno)" />
            <path d={CURVA_B} stroke={VIO} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="560" cy="2" r="8" fill="#fff" stroke={VIO} strokeWidth="4.5" />
          </g>
        </svg>

        {/* Pedidos por estado */}
        <Torta left={236.7} top={601} arcos={ESTADOS_A} clase="est-ea" grupo="est-ea-g" mascara="est-masc-e" barrido="est-barrido-e" />
        <Torta left={236.7} top={601} arcos={ESTADOS_B} clase="est-eb" grupo="est-eb-g" />
        <Estado left={276.65} top={653.5} w={80} h={34} size={34} align="center" a="51" b="52" claseA="est-cen-a" claseB="est-cen-b" />
        {LEYENDA.map((l, i) => (
          <Estado key={l.top} left={443.3 - 60} top={l.top} w={60} h={26} size={19} lh={s(26)} a={l.n} b={l.cambia} claseA={i === 2 ? "est-pen-a" : undefined} claseB="est-pen-b" />
        ))}

        {/* Top productos vendidos */}
        {BARRAS.map((b, i) => (
          <div key={b.n}>
            <span
              className={`est-bar-${i}`}
              style={{ ...abs(x(515.3), x(b.top), { width: s(b.ancho), height: s(15) }), borderRadius: s(8), background: b.color, transformOrigin: "left center" }}
            />
            <Estado left={768.6 - 60} top={b.top - 35} w={60} h={26} size={19} lh={s(26)} a={b.n} b={i === 0 ? "49" : undefined} claseA={i === 0 ? "est-top-a" : undefined} claseB="est-top-b" />
          </div>
        ))}

        {/* Ventas por categoría */}
        <Torta left={887.3} top={601} arcos={CATEGORIAS} clase="est-ca" mascara="est-masc-c" barrido="est-barrido-c" />
      </div>

      {/* Un solo cartel abajo: dice "Todo en tu panel" y, cuando llega una venta, cambia a "Nueva venta" */}
      <AvisoOscuro className="est-aviso-base" x={44.8} y={672} h={62} texto="Todo en tu panel" />
      <div style={{ opacity: 0 }} className="est-aviso">
        <AvisoOscuro x={44.8} y={672} h={62} texto="Nueva venta" />
      </div>
    </div>
  )
}
