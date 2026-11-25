// Imagen "Métodos de pago", animada en bucle (7 s). El panel está dibujado como el real: "Medios de pago", "Mercado Pago" y "Venta en
// cuotas" (con el recargo por cantidad de cuotas, que cada persona completa como quiere). La imagen trae Mercado Pago desconectado y
// la venta en cuotas sin activar; esta capa muestra encima la versión activa (en azul oscuro) de cada tarjeta, una después de la otra:
// el cursor aparece pegado al botón "Conectar Mercado Pago", hace clic y la tarjeta pasa a "Conectado"; después aparece pegado a la
// casilla "Activar venta en cuotas", hace clic y se activa la tarjeta, con los porcentajes cargados. El cursor no se desliza de un
// lugar al otro. Al final se apaga todo y vuelve a empezar. La versión activa es `pagos-on.webp` (se genera con
// `python herramientas/premium-imagenes/generar.py pagos-on`); las posiciones salen de `pagos-medidas`, en porcentajes de la imagen de
// 1200 px. Con "reducir movimiento" no se anima: queda todo activo. Se reproduce mientras la imagen está visible (`activa`).
import pagosOn from "../assets/escenas/pagos-on.webp"

const pc = (n) => `${(n / 12).toFixed(3)}%`

export default function PagosAnimado({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${activa ? "pg-activa" : ""}`}>
      <div className="pg-graf absolute inset-0">
        {/* Mercado Pago: tarjeta de la derecha de arriba (600, 250, 540 x 330) */}
        <img
          src={pagosOn}
          alt=""
          className="pg-on-a absolute inset-0 h-full w-full"
          style={{ clipPath: "inset(20.833% 5% 51.667% 50% round 2.333cqw)" }}
        />
        {/* Venta en cuotas: tarjeta de abajo (60, 600, 1080 x 380) */}
        <img
          src={pagosOn}
          alt=""
          className="pg-on-b absolute inset-0 h-full w-full"
          style={{ clipPath: "inset(50% 5% 18.333% 5% round 2.333cqw)" }}
        />
      </div>
      <span className="pg-onda pg-onda-a absolute rounded-full" style={{ left: pc(774.1), top: pc(521.0) }} />
      <span className="pg-onda pg-onda-b absolute rounded-full" style={{ left: pc(107.0), top: pc(705.0) }} />
      <svg className="pg-cursor absolute" viewBox="0 0 24 24" style={{ left: pc(774.1), top: pc(521.0) }}>
        <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="#17122F" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
