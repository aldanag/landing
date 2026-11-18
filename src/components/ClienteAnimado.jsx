import ventana from "../assets/premium-overlays/cliente-ventana.webp"

// Imagen "Clientes", animada en bucle (6 s): un cursor hace clic en el ojo de la primera fila, el detalle del
// cliente se despliega desde ese botón, se queda un momento, el cursor hace clic en "Cerrar" y se cierra.
// La base es la imagen cuadrada (el panel de clientes); la ventana es una capa transparente del mismo tamaño.
// Todo en porcentajes de la imagen de 1200 px. Se reproduce mientras la imagen está visible (`activa`).
// Con "reducir movimiento" no se anima: el detalle queda abierto (ver .cli-* en index.css).
const OJO = { x: "85%", y: "44.25%" } // botón del ojo de la primera fila
const CERRAR = { x: "88.38%", y: "81%" } // botón "Cerrar" del detalle

export default function ClienteAnimado({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${activa ? "cli-activa" : ""}`}>
      <img
        src={ventana}
        alt=""
        className="cli-ventana absolute inset-0 h-full w-full"
        style={{ transformOrigin: `${OJO.x} ${OJO.y}` }}
      />
      <span className="cli-onda cli-onda-1 absolute rounded-full" style={{ left: OJO.x, top: OJO.y }} />
      <span className="cli-onda cli-onda-2 absolute rounded-full" style={{ left: CERRAR.x, top: CERRAR.y }} />
      <svg className="cli-cursor absolute" viewBox="0 0 24 24" style={{ left: OJO.x, top: OJO.y }}>
        <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="#17122F" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
