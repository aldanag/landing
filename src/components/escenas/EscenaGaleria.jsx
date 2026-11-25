import foto1 from "../../assets/escenas/galeria-1.webp"
import foto2 from "../../assets/escenas/galeria-2.webp"
import foto3 from "../../assets/escenas/galeria-3.webp"
import foto4 from "../../assets/escenas/galeria-4.webp"
import { abs, AvisoOscuro, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Galería de imágenes", redibujada en vivo. Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo).
// Historia en bucle (19 s) mientras está a la vista (`activa`): un toque en el corazón lo llena y aparece "Agregado a favoritos";
// un toque en la lupa hace zoom real sobre la foto 1 (el jean) y vuelve; después, un toque en la flecha derecha pasa de foto en
// foto (la foto se desplaza de verdad) y la miniatura activa se marca con el borde violeta de abajo.
// En reposo (o con "reducir movimiento") queda la foto 1 con su miniatura marcada, el corazón lleno y el aviso a la vista.
//
// Las fotos son archivos aparte (src/assets/escenas/galeria-1.webp a galeria-4.webp): 1 = modelo sentada, 2 = de pie, 3 = de
// espalda, 4 = detalle del bolsillo. Para sumar una quinta hay que agregar su archivo y rehacer las animaciones (ver index.css).
const FOTOS = [foto1, foto2, foto3, foto4]
const MINI = { w: 112, h: 104, gap: 13.67, x: 128, y: 487 }
const miniX = (k) => MINI.x + k * (MINI.w + MINI.gap)

export default function EscenaGaleria({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "eg-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M420 -20C480 -10 560 30 600 80C640 130 720 150 790 140" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M-30 640C40 610 90 590 130 560" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Tarjeta */}
      <div
        style={{
          ...abs(98, 66, { width: u(548), height: u(622) }),
          background: "#fff",
          borderRadius: u(36),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.22)`,
        }}
      />

      {/* Foto grande: las fotos se desplazan una detrás de otra */}
      <div
        style={{
          ...abs(128, 96, { width: u(489), height: u(374) }),
          borderRadius: u(20),
          overflow: "hidden",
          background: "#C9BFEF",
        }}
      >
        <div className="eg-zfoto" style={{ position: "absolute", inset: 0, transformOrigin: "52% 72%" }}>
          {FOTOS.map((src, k) => (
            <img
              key={k}
              src={src}
              alt=""
              className={`eg-f${k}`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: k === 0 ? "none" : "translateX(100%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Corazón: de contorno; al tocarlo se llena (capa de arriba) y aparece el aviso */}
      <div
        style={{
          ...abs(557, 114, { width: u(44), height: u(44) }),
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: u(22), height: u(22) }} fill="none">
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2 0 3.5 1 5.4 3 1.9-2 3.4-3 5.4-3 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21Z" stroke="#FF9A52" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
      </div>
      <div
        className="eg-lleno"
        style={{
          ...abs(557, 114, { width: u(44), height: u(44) }),
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: u(22), height: u(22) }} fill="#FF9A52">
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2 0 3.5 1 5.4 3 1.9-2 3.4-3 5.4-3 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21Z" />
        </svg>
      </div>

      {/* Lupa: al tocarla, la foto hace zoom */}
      <div
        className="eg-lupa"
        style={{
          ...abs(144, 114, { width: u(44), height: u(44) }),
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 ${u(4)} ${u(12)} rgba(23,18,47,0.12)`,
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: u(24), height: u(24) }} fill="none">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="#17122F" strokeWidth="2.2" />
          <path d="M16 16l5 5" stroke="#17122F" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M10.5 8v5M8 10.5h5" stroke="#17122F" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Flechas */}
      {[
        [146, "M14 6l-6 6 6 6"],
        [554, "M10 6l6 6-6 6"],
      ].map(([x, d]) => (
        <div
          key={x}
          className={x === 554 ? "eg-flecha" : undefined}
          style={{
            ...abs(x, 240, { width: u(46), height: u(46) }),
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 ${u(4)} ${u(12)} rgba(23,18,47,0.12)`,
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: u(22), height: u(22) }} fill="none">
            <path d={d} stroke="#17122F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ))}

      {/* Miniaturas */}
      {FOTOS.map((src, k) => (
        <img
          key={k}
          src={src}
          alt=""
          style={{
            ...abs(miniX(k), MINI.y, { width: u(MINI.w), height: u(MINI.h) }),
            borderRadius: u(14),
            objectFit: "cover",
            background: "#C9BFEF",
          }}
        />
      ))}

      {/* Borde de la miniatura activa */}
      {FOTOS.map((_, k) => (
        <div
          key={k}
          className={`eg-r${k}`}
          style={{
            ...abs(miniX(k) - 3, MINI.y - 3, { width: u(MINI.w + 6), height: u(MINI.h + 6) }),
            border: `${u(3.5)} solid #6C4FD4`,
            borderRadius: u(17),
            boxSizing: "border-box",
            opacity: k === 0 ? 1 : 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Nombre y precio */}
      <span style={{ ...abs(128, 614), fontSize: u(27), fontWeight: 600, color: "#17122F", lineHeight: 1.3 }}>Jean Brooklyn</span>
      <span style={{ ...abs(414, 614, { width: u(200), textAlign: "right" }), fontSize: u(27), fontWeight: 600, color: "#6C4FD4", lineHeight: 1.3 }}>
        $52.500
      </span>

      {/* Sticker "Zoom" */}
      <Pegatina className="eg-zoom" xd={706} y={330} giro={8}>
        <svg viewBox="0 0 24 24" style={{ width: u(50), height: u(50) }} fill="none" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="#fff" strokeWidth="2" />
          <path d="M16 16l5 5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M10.5 8v5M8 10.5h5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1, marginTop: u(4) }}>Zoom</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>PANTALLA COMPLETA</span>
      </Pegatina>

      {/* Aviso del favorito */}
      <AvisoOscuro className="eg-aviso" x={232} y={700} h={56} texto="Agregado a favoritos" />

      {/* Toques (tap): el corazón, la lupa y la flecha derecha de la foto grande (cada toque en la flecha pasa a la foto que sigue) */}
      <Toque clase="eg-th" x={579} y={136} ini={1.4} dur={19} />
      <Toque clase="eg-tl" x={166} y={136} ini={5.4} dur={19} />
      {[
        ["eg-t1", 10.6],
        ["eg-t2", 13.1],
        ["eg-t3", 15.6],
        ["eg-t0", 18.0],
      ].map(([clase, ini]) => (
        <Toque key={clase} clase={clase} x={577} y={263} ini={ini} dur={19} />
      ))}
    </div>
  )
}
