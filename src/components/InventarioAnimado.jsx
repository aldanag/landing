import ventana from "../assets/premium-overlays/inventario-ventana.webp"

// Imagen "Inventario por categorías", animada en bucle (10 s) como se comporta una web real: un cursor hace
// clic en el botón de cajas de la categoría, la ventana del inventario se despliega con el primer campo
// enfocado; el cursor toca la flechita de cada campo de stock: al llegar se marca en violeta (hover), el
// número sube de a uno en el clic y el foco violeta pasa a ese campo (el anterior se apaga). Después toca
// "Guardar inventario" (hover más oscuro y clic) y la ventana se cierra.
// La base es la imagen cuadrada (la lista de categorías); la ventana es una capa transparente del mismo tamaño
// y cada campo de stock se redibuja con HTML (número anterior y nuevo, anillo de foco y flechitas).
// Todo en porcentajes de la imagen de 1200 px. Se reproduce mientras la imagen está visible (`activa`).
// Con "reducir movimiento" no se anima: la ventana queda abierta con los valores y el foco originales.
const BOTON = { x: "84.7%", y: "49.4%" } // botón de cajas de la categoría
const GUARDAR = { x: "83.9%", y: "91.8%" } // botón "Guardar inventario"
const FLECHA_X = "90%" // columna de flechitas de los campos
const campos = [
  { top: "63.2%", antes: "2", valor: "3", color: "#B45309", flecha: "66.1%" },
  { top: "72.1%", antes: "3", valor: "4", color: "#B45309", flecha: "75%" },
  { top: "80.9%", antes: "9", valor: "10", color: "#16A34A", flecha: "83.75%" },
]

export default function InventarioAnimado({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${activa ? "inv-activa" : ""}`}>
      <div className="inv-ventana absolute inset-0" style={{ transformOrigin: `${BOTON.x} ${BOTON.y}` }}>
        <img src={ventana} alt="" className="absolute inset-0 h-full w-full" />
        {campos.map((c, k) => (
          <span key={c.top} className="inv-parche" style={{ top: c.top }}>
            <span className="inv-campo" style={{ color: c.color }}>
              <span className={`inv-anillo inv-anillo-${k + 1}`} />
              <span className="inv-numeros">
                <span className={`inv-ant inv-ant-${k + 1}`}>{c.antes}</span>
                <span className={`inv-nuevo inv-nuevo-${k + 1}`}>{c.valor}</span>
              </span>
              <span className="inv-flechas">
                <i className={`inv-arriba inv-arriba-${k + 1}`}>▲</i>
                <i>▼</i>
              </span>
            </span>
          </span>
        ))}
        <span className="inv-guardar" />
      </div>
      <span className="inv-onda inv-onda-1 absolute rounded-full" style={{ left: BOTON.x, top: BOTON.y }} />
      {campos.map((c, k) => (
        <span key={c.flecha} className={`inv-onda inv-onda-f inv-onda-f${k + 1} absolute rounded-full`} style={{ left: FLECHA_X, top: c.flecha }} />
      ))}
      <span className="inv-onda inv-onda-2 absolute rounded-full" style={{ left: GUARDAR.x, top: GUARDAR.y }} />
      <svg className="inv-cursor absolute" viewBox="0 0 24 24" style={{ left: BOTON.x, top: BOTON.y }}>
        <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="#17122F" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
