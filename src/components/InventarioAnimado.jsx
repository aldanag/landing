import ventana from "../assets/premium-overlays/inventario-ventana.webp"

// Imagen "Inventario por categorías", animada en bucle (11 s) como se comporta una web real: un cursor hace
// clic en el botón de cajas de la categoría y la ventana del inventario se despliega. Después toca el precio de la
// primera remera (se marca en violeta, se borra el viejo y se escribe el nuevo tecla a tecla), toca la flechita del
// stock de la segunda (al llegar se marca en violeta, el número sube de a uno y el foco pasa a ese campo), toca
// "Guardar inventario" (hover más oscuro y clic) y la ventana se cierra.
// La base es la imagen cuadrada (la lista de categorías); la ventana es una capa transparente del mismo tamaño
// sin los campos, y los seis campos (precio y stock de cada remera) se dibujan acá con HTML.
// Todo en porcentajes de la imagen de 1200 px. Se reproduce mientras la imagen está visible (`activa`).
// Con "reducir movimiento" no se anima: la ventana queda abierta con los valores originales.
const BOTON = { x: "84.7%", y: "49.4%" } // botón de cajas de la categoría
const CLIC_PRECIO = { x: "79.33%", y: "66.5%" }
const CLIC_STOCK = { x: "90.17%", y: "73.25%" } // flechita de arriba del stock de la segunda remera
const GUARDAR = { x: "83.97%", y: "87.08%" } // botón "Guardar inventario"
const PRECIO_X = "71.833%"
const STOCK_X = "83.667%"
const filas = [
  { top: "64.583%", precio: "14.900", stock: "2", color: "#B45309" },
  { top: "71.75%", precio: "14.900", stock: "3", color: "#B45309" },
  { top: "78.917%", precio: "13.900", stock: "9", color: "#16A34A" },
]
const NUEVO_PRECIO = "16.500"
const NUEVO_STOCK = "4"

export default function InventarioAnimado({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${activa ? "inv-activa" : ""}`}>
      <div className="inv-ventana absolute inset-0" style={{ transformOrigin: `${BOTON.x} ${BOTON.y}` }}>
        <img src={ventana} alt="" className="absolute inset-0 h-full w-full" />
        {filas.map((f, k) => (
          <span key={f.top}>
            <span className="inv-campo inv-precio" style={{ left: PRECIO_X, top: f.top, width: "10.833%" }}>
              {k === 0 && <span className="inv-anillo inv-anillo-p" />}
              <span className="inv-pre">$</span>
              {k === 0 ? (
                <span className="inv-texto">
                  <span className="inv-ant-p">{f.precio}</span>
                  <span className="inv-escrito">
                    {[...NUEVO_PRECIO].map((c, i) => (
                      <span key={i} className="inv-ch" style={{ "--i": i }}>
                        {c}
                      </span>
                    ))}
                  </span>
                </span>
              ) : (
                <span>{f.precio}</span>
              )}
            </span>
            <span className="inv-campo inv-stock" style={{ left: STOCK_X, top: f.top, width: "8%", color: f.color }}>
              {k === 1 && <span className="inv-anillo inv-anillo-s" />}
              {k === 1 ? (
                <span className="inv-numeros">
                  <span className="inv-ant-s">{f.stock}</span>
                  <span className="inv-nuevo-s">{NUEVO_STOCK}</span>
                </span>
              ) : (
                <span>{f.stock}</span>
              )}
              <span className="inv-flechas">
                <i className={k === 1 ? "inv-arriba-s" : ""}>▲</i>
                <i>▼</i>
              </span>
            </span>
          </span>
        ))}
        <span className="inv-guardar" />
      </div>
      <span className="inv-onda inv-onda-1 absolute rounded-full" style={{ left: BOTON.x, top: BOTON.y }} />
      <span className="inv-onda inv-onda-p absolute rounded-full" style={{ left: CLIC_PRECIO.x, top: CLIC_PRECIO.y }} />
      <span className="inv-onda inv-onda-s absolute rounded-full" style={{ left: CLIC_STOCK.x, top: CLIC_STOCK.y }} />
      <span className="inv-onda inv-onda-g absolute rounded-full" style={{ left: GUARDAR.x, top: GUARDAR.y }} />
      <svg className="inv-cursor absolute" viewBox="0 0 24 24" style={{ left: BOTON.x, top: BOTON.y }}>
        <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="#17122F" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
