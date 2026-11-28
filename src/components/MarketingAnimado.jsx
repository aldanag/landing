import { useEffect, useState } from "react"
import fotoAviso from "../assets/premium-overlays/aviso-producto.jpg"
import badgeBF from "../assets/premium-overlays/badge-bf.svg"
import badgeHS from "../assets/premium-overlays/badge-hs.svg"
import badgeCM from "../assets/premium-overlays/badge-cm.svg"
import pixelMeta from "../assets/premium-overlays/pixel-meta.png"

// Imagen "Marketing", con la tienda viva:
//  - El contador de la oferta anda: los minutos y los segundos bajan de a uno, como en la tienda real. La imagen
//    trae el contador quieto; esta capa redibuja encima las cajas de MIN y SEG.
//  - La notificación de confianza ("Alguien en tu zona ya compró este artículo") aparece como una notificación
//    push: entra de costado, se queda un momento y se va (foto a ras del borde izquierdo, como en la tienda real), en bucle de 8 s.
//  - Los badges se van eligiendo de a uno (Black Friday, Hot Sale, CyberMonday; "Subí la tuya" no): un cursor hace clic en
//    cada opción, la opción se marca en violeta y el badge elegido se aplica al producto del celular y a los de "Más en
//    promoción". Bucle de 9 s. La imagen trae el panel y el celular sin la selección ni los badges: esta capa los dibuja.
//  - El cartel azul de abajo cambia de mensaje en el mismo bucle de 9 s: "Sumá tu propio badge" y, al final, "Medí con tu Pixel de Meta" (el ícono aparece con ese mensaje).
//  - "Comprá más y ahorrá" (descuento por cantidad, arriba del botón): la imagen trae las tres filas; esta capa dibuja la selección. Bucle de 9 s.
// Posiciones y tamaños en porcentajes de la imagen de 1200 px (el texto, en unidades del contenedor).
// Solo se anima mientras la imagen está visible (`activa`) y si el sistema no pide "reducir movimiento"
// (o se abrió la página con ?motion=on); si no, queda la imagen con la notificación a la vista.
const INICIO = 59 * 60 + 39 // 59 min 39 seg, como en la imagen
const TOP = "61.667%"
const ALTO = "4.5%"
const ANCHO = "4%"

const OPCIONES = [
  { k: "bf", img: badgeBF, left: 54.167 },
  { k: "hs", img: badgeHS, left: 64.208 },
  { k: "cm", img: badgeCM, left: 74.25 },
]
// dónde se aplica el badge elegido: la foto del producto y los dos de "Más en promoción" (izquierda, arriba, ancho)
const APLICA = [
  { left: "8.417%", top: "38.25%", width: "10.667%" },
  { left: "8.25%", top: "92.75%", width: "6.167%" },
  { left: "27.167%", top: "92.75%", width: "6.167%" },
]
const TILE_TOP = "30.417%"
const TILE_ALTO = "11.333%"
const TILE_ANCHO = 9.042
const TILE_CENTRO_Y = "36.083%"

function puedeAnimar() {
  if (typeof window === "undefined") return false
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.dataset.motion === "on"
  )
}

function Caja({ left, valor, etiqueta }) {
  return (
    <div
      className="absolute flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{ left, top: TOP, width: ANCHO, height: ALTO, borderRadius: "0.833cqw", boxShadow: "inset 0 0 0 0.125cqw #E6E2F0" }}
    >
      <b key={valor} className="cd-num font-bold text-ink" style={{ fontSize: "1.667cqw", lineHeight: 1 }}>
        {String(valor).padStart(2, "0")}
      </b>
      <span className="text-ink-muted" style={{ fontSize: "0.833cqw", marginTop: "0.167cqw", letterSpacing: "0.04em" }}>
        {etiqueta}
      </span>
    </div>
  )
}

export default function MarketingAnimado({ activa = false }) {
  const [restan, setRestan] = useState(INICIO)

  useEffect(() => {
    if (!activa || !puedeAnimar()) return undefined
    const id = setInterval(() => setRestan((r) => (r <= 1 ? INICIO : r - 1)), 1000)
    return () => {
      clearInterval(id)
      setRestan(INICIO)
    }
  }, [activa])

  return (
    <div aria-hidden="true" className={`absolute inset-0 ${activa ? "push-activa" : ""}`}>
      <Caja left="34.083%" valor={Math.floor(restan / 60) % 60} etiqueta="MIN" />
      <Caja left="39.083%" valor={restan % 60} etiqueta="SEG" />
      {/* "Comprá más y ahorrá": el borde negro de la cantidad elegida salta de 1 a 2 y a 5 unidades (queda en 1 unidad) */}
      <span aria-hidden="true" className="bnd-sel absolute" style={{ left: "8.75%", top: "71.25%", width: "34.167%", height: "2.5%" }} />
      {/* badges: se eligen de a uno y se aplican al producto */}
      {OPCIONES.map((o) => (
        <span
          key={`sel-${o.k}`}
          className={`bd-sel bd-on-${o.k} absolute`}
          style={{ left: `${o.left}%`, top: TILE_TOP, width: `${TILE_ANCHO}%`, height: TILE_ALTO }}
        >
          <span className="bd-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.25cqw", height: "1.25cqw" }}>
              <path d="M5 12.500l4.500 4.500L19 7.500" />
            </svg>
          </span>
        </span>
      ))}
      {APLICA.map((a, i) =>
        OPCIONES.map((o) => (
          <img key={`img-${i}-${o.k}`} src={o.img} alt="" className={`bd-img bd-pop-${o.k} absolute`} style={a} />
        )),
      )}
      <div className="absolute" style={{ left: "7.583%", top: "87.833%", width: "36.5%" }}>
        <div
          className="push-aviso flex items-stretch overflow-hidden bg-white"
          style={{
            borderRadius: "1.9cqw",
            boxShadow: "0 2cqw 4cqw -1.2cqw rgba(76,52,170,.42), 0 0 0 0.08cqw rgba(108,79,212,.16)",
          }}
        >
          <img src={fotoAviso} alt="" className="flex-none object-cover" style={{ width: "9.2cqw", minHeight: "10cqw" }} />
          <div style={{ flex: 1, lineHeight: 1.3, padding: "1.5cqw 1cqw 1.4cqw 1.6cqw" }}>
            <div className="text-ink" style={{ fontSize: "1.85cqw" }}>
              Alguien en <b>tu zona</b> ya compró este artículo
            </div>
            <div className="font-bold text-ink" style={{ fontSize: "1.5cqw", marginTop: "0.5cqw" }}>
              Remera oliva
            </div>
          </div>
          <span className="text-ink-muted" style={{ alignSelf: "flex-start", fontSize: "1.7cqw", fontWeight: 800, lineHeight: 1, padding: "1.2cqw 1.3cqw 0 0" }}>
            ✕
          </span>
        </div>
      </div>
      {OPCIONES.map((o) => (
        <span
          key={`onda-${o.k}`}
          className={`bd-onda bd-onda-${o.k} absolute rounded-full`}
          style={{ left: `${o.left + TILE_ANCHO / 2}%`, top: TILE_CENTRO_Y }}
        />
      ))}
      {/* Cartel azul: "Sumá tu propio badge" mientras se eligen los badges y, al final del bucle, "Sumá tu Pixel de Meta" con su ícono */}
      <div className="absolute grid items-center text-white" style={{ left: "60%", top: "78.333%", height: "8.167%" }}>
        <span className="px-a whitespace-nowrap font-bold" style={{ gridArea: "1 / 1", fontSize: "2.417cqw", lineHeight: 1 }}>
          Sumá tu propio badge
        </span>
        <span className="px-b whitespace-nowrap font-bold" style={{ gridArea: "1 / 1", fontSize: "2.417cqw", lineHeight: 1, opacity: 0 }}>
          Medí con tu Pixel de Meta
        </span>
      </div>
      <img
        src={pixelMeta}
        alt=""
        className="px-ico absolute"
        style={{ left: "85.833%", top: "87.667%", width: "10%", transform: "rotate(7deg)", filter: "drop-shadow(0 1.333cqw 1.667cqw rgba(76,52,170,.34))" }}
      />
      <svg className="bd-cursor absolute" viewBox="0 0 24 24" style={{ left: `${OPCIONES[0].left + TILE_ANCHO / 2}%`, top: TILE_CENTRO_Y }}>
        <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="#17122F" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
