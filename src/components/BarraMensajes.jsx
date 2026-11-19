// La barra promocional de la imagen "Olvidate de anuncios", animada: los mensajes pasan de derecha a
// izquierda, como en una tienda real. Va encima de la imagen y cubre la barra estática del celular.
// Posición y tamaño en porcentajes del marco cuadrado (la imagen mide 1200x1200: la barra está en
// x 67, y 540, 466 x 50); el texto usa unidades del contenedor, así escala igual que la imagen.
// Con "reducir movimiento" no se anima (ver .marquee-pista en index.css).
const mensajes = ["🔥 Compra mínima $70.000", "Envíos a todo el país 💙🤍💙", "Solo transferencia"]

export default function BarraMensajes() {
  const pista = [...mensajes, ...mensajes]
  return (
    <div
      aria-hidden="true"
      className="absolute left-[5.583%] top-[45%] flex h-[4.167%] w-[38.833%] items-center overflow-hidden bg-ink text-white"
    >
      <div className="marquee-pista flex w-max flex-none items-center gap-[2.83cqw] whitespace-nowrap pr-[2.83cqw] text-[1.417cqw] font-bold">
        {pista.map((m, i) => (
          <span key={i} className="flex-none">
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
