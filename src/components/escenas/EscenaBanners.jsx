import respaldoModelo from "../../assets/escenas/respaldo-banner-modelo.webp"
import respaldoLente1 from "../../assets/escenas/respaldo-lente-1.webp"
import respaldoLente2 from "../../assets/escenas/respaldo-lente-2.webp"
import respaldoLente3 from "../../assets/escenas/respaldo-lente-3.webp"
import { abs, AvisoOscuro, Pegatina, raiz, u } from "./utiles"

// Escena "Banners que venden": una tienda de lentes con su banner de promoción arriba. Lienzo de 768 px que escala con el ancho
// del marco (--u = 1 px del lienzo). Historia en bucle (10 s) mientras está a la vista (`activa`): el banner se publica y baja
// sobre la tienda, el sticker "Banners" aparece con rebote y se confirma "En toda tienda y página de carrito". En reposo (o con
// "reducir movimiento") queda todo ya publicado.
//
// Fotos: si existen src/assets/escenas/banner-modelo.* y lente-marine.*, lente-italy.*, lente-burdeos.* (jpg, png o webp) se usan; si
// no, los recortes de respaldo de la imagen anterior (que se ven chicos al agrandarlos).
const subidas = import.meta.glob("../../assets/escenas/{banner-modelo,lente-marine,lente-italy,lente-burdeos}.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
})
const foto = (nombre, respaldo) => Object.entries(subidas).find(([ruta]) => ruta.includes(`/${nombre}.`))?.[1] ?? respaldo

const PRODUCTOS = [
  { nombre: "Marine", precio: "$ 12.500", src: foto("lente-marine", respaldoLente1) },
  { nombre: "Italy Negro", precio: "$ 14.500", src: foto("lente-italy", respaldoLente2) },
  { nombre: "Burdeos Negro Amarilla", precio: "$ 9.900", src: foto("lente-burdeos", respaldoLente3) },
]

export default function EscenaBanners({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "eb-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M330 -20C400 10 520 30 640 60C700 75 760 70 800 55" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M640 520C700 580 740 660 760 800" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Tienda */}
      <div
        style={{
          ...abs(48, 108, { width: u(672), height: u(438) }),
          background: "#F8F6FF",
          borderRadius: u(30),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)`,
        }}
      />

      {/* Lugar del banner (vacío hasta que se publica) y banner */}
      <div style={{ ...abs(73, 134, { width: u(622), height: u(200) }), borderRadius: u(20), border: `${u(2)} dashed #CFC6F1`, boxSizing: "border-box" }} />
      <div className="eb-banner" style={{ ...abs(73, 134, { width: u(622), height: u(200) }), borderRadius: u(20), overflow: "hidden", background: "#0C0C0C" }}>
        <img
          src={foto("banner-modelo", respaldoModelo)}
          alt=""
          style={{ position: "absolute", left: 0, top: 0, width: u(250), height: u(200), objectFit: "cover" }}
        />
        <span style={{ position: "absolute", left: u(290), top: u(63), fontSize: u(16), color: "#E6E2F0", letterSpacing: "0.02em" }}>PROMOCIÓN ESPECIAL</span>
        <span style={{ position: "absolute", left: u(290), top: u(92), fontSize: u(30), fontWeight: 700, color: "#fff", whiteSpace: "nowrap", lineHeight: 1.2 }}>
          8X1 EN LENTES DE SOL
        </span>
      </div>

      {/* Productos */}
      {PRODUCTOS.map((p, i) => (
        <div key={p.nombre}>
          <div
            style={{
              ...abs(74 + i * 212, 349, { width: u(197), height: u(172) }),
              background: "#fff",
              border: `${u(1.5)} solid #EEEAF6`,
              borderRadius: u(14),
              boxSizing: "border-box",
            }}
          />
          <img src={p.src} alt="" style={{ ...abs(90 + i * 212, 364, { width: u(165), height: u(86) }), objectFit: "contain" }} />
          <span style={{ ...abs(86 + i * 212, 463), fontSize: u(15), fontWeight: 500, color: "#17122F", whiteSpace: "nowrap", lineHeight: 1.3 }}>{p.nombre}</span>
          <span style={{ ...abs(86 + i * 212, 483), fontSize: u(15), fontWeight: 700, color: "#6C4FD4", lineHeight: 1.3 }}>{p.precio}</span>
        </div>
      ))}

      {/* Sticker "Banners" */}
      <Pegatina className="eb-sticker" xd={672} y={36} giro={10}>
        <svg viewBox="0 0 24 24" style={{ width: u(46), height: u(46) }} fill="none" aria-hidden="true">
          <path d="M18 6 6 18" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="7.5" cy="7.5" r="2.6" stroke="#fff" strokeWidth="2.2" />
          <circle cx="16.5" cy="16.5" r="2.6" stroke="#fff" strokeWidth="2.2" />
        </svg>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1, marginTop: u(4) }}>Banners</span>
      </Pegatina>

      {/* Aviso */}
      <AvisoOscuro className="eb-aviso" x={48} y={601} h={66} texto="En toda tienda y página de carrito" />
    </div>
  )
}
