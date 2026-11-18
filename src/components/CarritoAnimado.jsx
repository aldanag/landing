import gris from "../assets/premium-overlays/carrito-gris.jpg"
import crema from "../assets/premium-overlays/carrito-crema.jpg"
import short from "../assets/premium-overlays/carrito-short.jpg"

// Imagen "Tu carrito" (gastos de gestión y envío gratis), animada en bucle (8 s): el carrito arranca con dos
// productos, la barra de envío a dos tercios y el aviso "Te falta 1 producto…". Se suma un short: la fila entra,
// el subtotal y el total se actualizan, la barra se llena hasta el envío gratuito y recién ahí cambia el aviso a
// "⚡ ¡Ya alcanzaste el envío gratuito!" (en negrita y con rayo). El carrito crece al sumar el producto, sin huecos.
// La base es la imagen cuadrada con las dos tarjetas de la izquierda; el carrito se dibuja acá con HTML, en
// porcentajes de la imagen de 1200 px (el texto, en unidades del contenedor). Se reproduce mientras la imagen
// está visible (`activa`). Con "reducir movimiento" no se anima: queda el estado final (envío gratuito alcanzado).
const BORDE = "1px solid #ECE8F5"

function Par({ antes, ahora }) {
  return (
    <span className="car-par">
      <span className="car-ant">{antes}</span>
      <span className="car-nuevo">{ahora}</span>
    </span>
  )
}

function Linea({ etiqueta, children, borde = true, estilo }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: "1.083cqw 0", borderBottom: borde ? BORDE : "none", ...estilo }}>
      <span>{etiqueta}</span>
      {children}
    </div>
  )
}

function Paso({ children }) {
  return (
    <span
      className="flex items-center justify-center"
      style={{ width: "3cqw", height: "3cqw", borderRadius: "0.75cqw", boxShadow: "inset 0 0 0 0.125cqw #E0DCEC", fontSize: "1.667cqw" }}
    >
      {children}
    </span>
  )
}

function Producto({ foto, nombre }) {
  return (
    <div className="flex items-center" style={{ gap: "1.667cqw", padding: "1cqw 0", borderTop: BORDE }}>
      <img src={foto} alt="" className="flex-none object-cover" style={{ width: "6.333cqw", height: "6.333cqw", borderRadius: "1.167cqw" }} />
      <div className="flex-1">
        <div style={{ fontSize: "2cqw" }}>{nombre}</div>
        <div className="flex items-center justify-between" style={{ marginTop: "0.5cqw" }}>
          <span style={{ fontSize: "1.75cqw", color: "#6C4FD4" }}>$ 14.900</span>
          <span className="flex items-center" style={{ gap: "0.5cqw" }}>
            <Paso>−</Paso>
            <span
              className="flex items-center justify-center"
              style={{ width: "3.667cqw", height: "3cqw", borderRadius: "0.75cqw", boxShadow: "inset 0 0 0 0.125cqw #E0DCEC", fontSize: "1.667cqw" }}
            >
              1
            </span>
            <Paso>+</Paso>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CarritoAnimado({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${activa ? "car-activa" : ""}`}>
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "19.167%",
          width: "46.667%",
          padding: "2.333cqw 2.833cqw 2.5cqw",
          borderRadius: "2.167cqw",
          background: "#fff",
          color: "#17122F",
          fontSize: "1.917cqw",
          lineHeight: 1.39,
          boxShadow:
            "0 -1.8cqw 4.2cqw -0.7cqw rgba(76,52,170,.34), 0 -0.5cqw 1.5cqw -0.3cqw rgba(23,18,47,.12), 0 3.3cqw 5.8cqw -2.8cqw rgba(23,18,47,.4), 0 0 0 1px rgba(108,79,212,.14)",
        }}
      >
        <div className="flex items-center" style={{ gap: "1.167cqw", fontSize: "3.167cqw", fontWeight: 600, marginBottom: "0.833cqw" }}>
          <svg viewBox="0 0 24 24" fill="#6C4FD4" style={{ width: "2.833cqw", height: "2.833cqw" }}>
            <path d="M2 3h2.600l.6 2H22l-2.200 8.500H8l.4 1.500H19v2H6.900L3.500 5H2z" />
            <circle cx="9" cy="20" r="1.700" />
            <circle cx="17" cy="20" r="1.700" />
          </svg>
          Tu Carrito
        </div>

        <Producto foto={gris} nombre="Remera gris" />
        <Producto foto={crema} nombre="Remera crema" />
        <div className="car-fila car-fila-item">
          <div className="car-fila-in relative" style={{ minHeight: 0, overflow: "hidden" }}>
            <span className="car-destello absolute" style={{ inset: "0 -1.333cqw", borderRadius: "1.167cqw", background: "#F1ECFF" }} />
            <div className="relative">
              <Producto foto={short} nombre="Short" />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "1.25cqw" }}>
          <Linea etiqueta="Subtotal:">
            <Par antes="$ 29.800" ahora="$ 44.700" />
          </Linea>
          <div style={{ margin: "0.5cqw -1.333cqw", padding: "0 1.333cqw", borderRadius: "1.167cqw", background: "#F1ECFF", color: "#4B33A8", fontWeight: 700 }}>
            <Linea etiqueta="Gastos de gestión:" borde={false}>
              <span>$ 1.200</span>
            </Linea>
          </div>
          <Linea etiqueta="Total:" borde={false} estilo={{ fontWeight: 700, fontSize: "2.25cqw" }}>
            <Par antes="$ 31.000" ahora="$ 45.900" />
          </Linea>
          <div style={{ marginTop: "0.333cqw", height: "1.167cqw", borderRadius: "99px", background: "#E4E0F0", overflow: "hidden" }}>
            <div className="car-barra" style={{ height: "100%", borderRadius: "99px", background: "#16A34A" }} />
          </div>
          <div style={{ fontSize: "1.833cqw", marginTop: "1cqw" }}>
            <span className="car-par car-par-msg">
              <span className="car-ant">Te falta 1 producto para el envío gratuito</span>
              <span className="car-nuevo">
                <b className="inline-flex items-center">
                  <svg viewBox="0 0 24 24" fill="#17122F" style={{ width: "1.75cqw", height: "1.75cqw", marginRight: "0.5cqw" }}>
                    <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
                  </svg>
                  ¡Ya alcanzaste el envío gratuito!
                </b>
              </span>
            </span>
          </div>
        </div>

        <div
          className="flex items-center justify-center"
          style={{ marginTop: "1.667cqw", height: "5.333cqw", borderRadius: "1.167cqw", background: "#17122F", color: "#fff", fontSize: "1.833cqw", fontWeight: 600 }}
        >
          Finalizar Compra
        </div>
      </div>
    </div>
  )
}
