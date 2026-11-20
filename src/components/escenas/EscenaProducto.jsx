import foto from "../../assets/escenas/galeria-1.webp"
import { abs, AvisoOscuro, BotonTienda, CarritoSolido, IconoCarrito, Pegatina, fondoOscuro, raiz, RuloMarca, Toque, u } from "./utiles"

// Escena "Tienda de productos": la ficha de un producto de la tienda (foto, nombre, precio y botón). Lienzo de 768 px que escala con
// el ancho del marco (--u = 1 px del lienzo). Historia en bucle (10 s) mientras está a la vista (`activa`): un toque en "Agregar al
// carrito", el carrito suma 1 y aparece "Agregado al carrito". En reposo (o con "reducir movimiento") queda ya agregado.
export default function EscenaProducto({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "ev-activa" : ""}`} style={{ ...raiz, background: fondoOscuro }}>
      {/* Rulo de la marca */}
      <RuloMarca />

      {/* Ficha del producto */}
      <div
        style={{
          ...abs(64, 148, { width: u(640), height: u(416) }),
          background: "#fff",
          borderRadius: u(34),
          boxShadow: `0 ${u(18)} ${u(46)} rgba(0,0,0,0.35)`,
        }}
      />
      <img
        src={foto}
        alt=""
        style={{ ...abs(100, 184, { width: u(568), height: u(196) }), borderRadius: u(22), objectFit: "cover", objectPosition: "50% 22%" }}
      />
      <span style={{ ...abs(614, 196, { width: u(46), height: u(46) }), borderRadius: "50%", background: "#fff", boxShadow: `0 ${u(4)} ${u(14)} rgba(23,18,47,0.18)` }} />
      <IconoCarrito x={625} y={207} size={24} />
      <span
        className="ev-badge"
        style={{
          ...abs(645, 188, { width: u(26), height: u(26) }),
          borderRadius: "50%",
          background: "#FF9A52",
          color: "#17122F",
          fontSize: u(15),
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        1
      </span>
      <span style={{ ...abs(100, 396), fontSize: u(27), fontWeight: 600, color: "#17122F", lineHeight: 1.3, whiteSpace: "nowrap" }}>Jean Brooklyn</span>
      <span style={{ ...abs(100, 432), fontSize: u(27), fontWeight: 600, color: "#6C4FD4", lineHeight: 1.3 }}>$ 26.000</span>
      <BotonTienda className="ev-boton" x={100} y={476} w={568} h={52} size={22}>
        <CarritoSolido size={22} />
        Agregar al carrito
      </BotonTienda>

      {/* Sticker "Productos ilimitados" */}
      <Pegatina className="ev-sticker" xd={736} y={530} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Productos</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>ILIMITADOS</span>
      </Pegatina>

      {/* Aviso */}
      <AvisoOscuro sobreOscuro className="ev-aviso" x={40} y={100} h={66} texto="Agregado al carrito" />

      {/* Toque (tap) sobre el botón */}
      <Toque clase="ev-ta" x={384} y={502} ini={1.38} dur={10} />
    </div>
  )
}
