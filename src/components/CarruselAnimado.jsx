import slide1 from "../assets/premium-overlays/carrusel-1.webp"
import slide2 from "../assets/premium-overlays/carrusel-2.webp"

// La tercera foto es opcional: si existe carrusel-3.webp se usa; si no, la lámina 3 queda lisa (violeta).
const tercera = Object.values(
  import.meta.glob("../assets/premium-overlays/carrusel-3.webp", { eager: true, import: "default" }),
)[0]

// Imagen "Más espacio para tus promociones", con el carrusel de la tienda vivo: las láminas se deslizan de costado, una
// tras otra, con las dos flechas a los lados y los tres puntos de abajo (el de la lámina activa se estira).
// Bucle de 10 s. Se dibuja encima del carrusel de la imagen (mismo lugar, mismo tamaño): posiciones en porcentajes de
// la imagen de 1200 px y texto en unidades del contenedor (cqw). Solo se anima mientras la imagen está visible
// (`activa`) y si el sistema no pide "reducir movimiento" (o con ?motion=on); si no, queda la primera lámina.
// Las fotos van recortadas desde arriba para no cortar la cabeza de la persona (ver herramientas/premium-imagenes/preparar-slides.py).
// La tercera lámina es lisa, sin foto.
const laminas = [
  { foto: slide1, titulo: "Hasta 30% off", sub: "NUEVA COLECCIÓN" },
  { foto: slide2, titulo: "Hasta 30% off", sub: "NUEVA COLECCIÓN" },
  { foto: tercera ?? null, fondo: "#6C4FD4", titulo: "Envíos a todo el país", sub: "COMPRÁ EN NUESTRA TIENDA" },
]

function Flecha({ lado, giro, clase = "" }) {
  return (
    <span
      className={`absolute flex items-center justify-center rounded-full bg-white/90 ${clase}`}
      style={{ [lado]: "1.333cqw", top: "47.6667%", width: "3.167cqw", height: "3.167cqw", marginTop: "-1.583cqw" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#17122F"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: "1.667cqw", height: "1.667cqw", transform: `rotate(${giro}deg)` }}
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </span>
  )
}

export default function CarruselAnimado({ activa = false }) {
  // La primera lámina se repite al final para que el bucle vuelva sin saltos.
  const pista = [...laminas, laminas[0]]
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${activa ? "carru-activa" : ""}`}>
      <div
        className="absolute overflow-hidden bg-[#E2D9FF]"
        style={{ left: "27%", top: "47.6667%", width: "67.667%", height: "18.167%", borderRadius: "1.667cqw" }}
      >
        <div className="carru-pista flex h-full" style={{ width: "400%" }}>
          {pista.map((l, i) => (
            <div key={i} className="relative h-full flex-none" style={{ width: "25%" }}>
              {l.foto ? (
                <>
                  {/* foto anclada arriba: así no se corta la cabeza de la persona */}
                  <img src={l.foto} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(90deg, rgba(23,18,47,.55), rgba(23,18,47,.05) 65%)" }}
                  />
                </>
              ) : (
                <div className="absolute inset-0" style={{ background: l.fondo }} />
              )}
              <div className="absolute flex flex-col justify-center text-white" style={{ left: "8cqw", top: 0, bottom: 0, maxWidth: "34cqw" }}>
                <b className="font-bold" style={{ fontSize: "3.833cqw", lineHeight: 1.05, letterSpacing: "-0.01em" }}>
                  {l.titulo}
                </b>
                <span className="font-semibold" style={{ fontSize: "1.583cqw", letterSpacing: "0.14em", marginTop: "0.833cqw", opacity: 0.92 }}>
                  {l.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Flecha lado="left" giro={180} />
        <Flecha lado="right" giro={0} clase="carru-flecha" />

        <span className="absolute inset-x-0 flex items-center justify-center" style={{ bottom: "1cqw", gap: "0.75cqw" }}>
          <i className="carru-punto carru-punto-1 block rounded-full bg-white" style={{ height: "0.833cqw" }} />
          <i className="carru-punto carru-punto-2 block rounded-full bg-white" style={{ height: "0.833cqw" }} />
          <i className="carru-punto carru-punto-3 block rounded-full bg-white" style={{ height: "0.833cqw" }} />
        </span>
      </div>
      {/* La línea de puntos del sticker «Carrusel» termina sobre la tira: se redibuja encima para que no quede tapada. */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 1200" fill="none">
        <path d="M1142 140 H1150 V618 H1096" stroke="#7C6AE0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 13" />
        <circle cx="1096" cy="618" r="9" fill="#fff" stroke="#7C6AE0" strokeWidth="4" />
      </svg>
    </div>
  )
}
