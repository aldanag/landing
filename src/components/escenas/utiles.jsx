import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

// Piezas compartidas por las escenas de funcionalidades (redibujadas en vivo). Cada escena se dibuja sobre un lienzo de 768 px
// y escala con el ancho del marco: --u = 1 px del lienzo (se declara en la raíz de cada escena).
export const u = (n) => `calc(var(--u) * ${n})`
export const abs = (x, y, extra = {}) => ({ position: "absolute", left: u(x), top: u(y), ...extra })

// Raíz común: lienzo, fondo lila y tipografía de la web (Manrope, recta).
export const raiz = {
  "--u": "calc(100cqw / 768)",
  background: "linear-gradient(180deg, #EEECF8 0%, #D2C8F7 100%)",
  fontFamily: "inherit",
  fontStyle: "normal",
}

// Fondo oscuro (el azul de la web) para las escenas que van sobre fondo oscuro; reemplaza al lila de `raiz`.
export const fondoOscuro = "linear-gradient(180deg, #2A2058 0%, #17122F 100%)"

// Rulo de la marca (el mismo trazo del logo y del hero de Premium) como decoración de las escenas sobre fondo oscuro: baja desde arriba a
// la izquierda, hace el rulo detrás de la tarjeta y asoma otra vez por abajo.
const RULO =
  "M313.2 425.5C294.6 387 251.8 351.2 215.3 334.7M215.3 334.7C200.8 328.1 187.3 324.5 176.7 325.1C140 324.9 117 350.2 127.2 370.6C139.8 398 167.2 390.1 193.1 363.7C202.3 354.6 209.9 344.8 215.3 334.7ZM215.3 334.7C227.3 312.3 228.9 288.7 215.1 270.6C197.3 246.5 165 244.9 136.4 226.3C69.6 184.2 30 101.1 13.9 3.6"
export const RuloMarca = () => (
  <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
    <path d={RULO} transform="translate(-62 262) scale(1.22)" stroke="#5A4AA8" strokeWidth="27.9" strokeLinecap="round" opacity="0.55" />
  </svg>
)

// Un solo botón para todas las escenas: el de la tienda real ("Finalizar Compra"): oscuro, esquinas redondeadas (no píldora), texto
// blanco en semibold y con mayúscula inicial en cada palabra. `tono="panel"` lo pasa a violeta para los botones del panel de gestión
// (misma forma y tipografía). Si una escena es de otra tienda, ese botón puede cambiar de color.
export function BotonTienda({ x, y, w, h, size, tono = "tienda", children, className = "", style = {} }) {
  return (
    <div
      className={className}
      style={{
        ...abs(x, y, { width: u(w), height: u(h) }),
        background: tono === "panel" ? "#6C4FD4" : "#17122F",
        borderRadius: u(h * 0.26),
        color: "#fff",
        fontSize: u(size),
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: u(size * 0.4),
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Sticker violeta inclinado (el de "Total al instante", "10% de descuento"…): mismo degradé, sombra y tipografía. Su tamaño lo da el
// contenido y el aire es siempre el mismo: 22 de arriba y abajo y 30 a los costados (ver PEGATINA_PAD), esquina de 28. Lleva la
// palabra grande (36, extranegrita) y, si hace falta, una aclaración en mayúsculas (14). `x` es el borde izquierdo y `xd` el derecho
// (el que esté pegado al lado del lienzo donde va el sticker); `y`, el borde de arriba.
export const PEGATINA_PAD = { vertical: 22, horizontal: 30 }
export function Pegatina({ x, xd, y, giro, className = "", children }) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        ...(xd !== undefined ? { right: u(768 - xd) } : { left: u(x) }),
        top: u(y),
        width: "max-content",
        padding: `${u(PEGATINA_PAD.vertical)} ${u(PEGATINA_PAD.horizontal)}`,
        background: "linear-gradient(160deg, #7C6AE0 0%, #5A44C2 100%)",
        borderRadius: u(28),
        boxShadow: `0 ${u(14)} ${u(34)} rgba(92,68,196,0.40)`,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        whiteSpace: "nowrap",
        transform: `rotate(${giro}deg)`,
      }}
    >
      {children}
    </div>
  )
}

// Etiqueta azul con tilde, la misma de las imágenes de la sección Premium: píldora azul oscura, círculo naranja con el tilde OSCURO,
// texto en negrita y ancho que se ajusta al texto. Proporciones: círculo = 59 % del alto, texto = 32 %, esquina = 31 %.
export function AvisoOscuro({ x, y, h, texto, className = "", sobreOscuro = false }) {
  const d = h * 0.59
  return (
    <div
      className={className}
      style={{
        ...abs(x, y, { height: u(h), width: "max-content" }),
        background: sobreOscuro ? "#352B6E" : "#17122F",
        borderRadius: u(h * 0.31),
        display: "flex",
        alignItems: "center",
        gap: u(h * 0.2),
        padding: `0 ${u(h * 0.39)} 0 ${u(h * 0.22)}`,
        color: "#fff",
        fontSize: u(h * 0.32),
        fontWeight: 700,
        whiteSpace: "nowrap",
        boxShadow: `0 ${u(14)} ${u(30)} rgba(23,18,47,0.28)`,
      }}
    >
      <span
        style={{
          width: u(d),
          height: u(d),
          borderRadius: "50%",
          background: "#FF9A52",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: u(d * 0.52), height: u(d * 0.52) }} fill="none" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#17122F" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {texto}
    </div>
  )
}

// Texto con varios estados que se turnan (cada estado lleva la clase de su animación, ver index.css). El primero es el de reposo.
export const Cifra = ({ x, y, w, size, weight, color, align = "right", estados }) => (
  <>
    {estados.map(([texto, clase], i) => (
      <span
        key={texto + i}
        className={clase}
        style={{
          ...abs(x, y, { width: u(w), textAlign: align }),
          fontSize: u(size),
          fontWeight: weight,
          color,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          opacity: i === 0 ? 1 : 0,
        }}
      >
        {texto}
      </span>
    ))}
  </>
)

// Caja chica con borde (los botones − y + y la cantidad del selector de la tienda).
export const Caja = ({ x, y, w, h = 44, children }) => (
  <div
    style={{
      ...abs(x, y, { width: u(w), height: u(h) }),
      border: `${u(1.5)} solid #D6D2E6`,
      borderRadius: u(9),
      background: "#fff",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
)

const Menos = () => (
  <svg viewBox="0 0 24 24" style={{ width: u(20), height: u(20) }} fill="none">
    <path d="M6 12h12" stroke="#17122F" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)
const Mas = () => (
  <svg viewBox="0 0 24 24" style={{ width: u(20), height: u(20) }} fill="none">
    <path d="M12 6v12M6 12h12" stroke="#17122F" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

// Selector de cantidad con las cajitas de la tienda real (chicas, van a la derecha de cada fila). Mide 128 px de ancho por 40 de alto.
export const Stepper = ({ x, y, cantidades }) => (
  <>
    <Caja x={x} y={y} w={36} h={40}>
      <Menos />
    </Caja>
    <Caja x={x + 42} y={y} w={44} h={40} />
    <Cifra x={x + 42} y={y + 8} w={44} size={21} weight={500} color="#17122F" align="center" estados={cantidades} />
    <Caja x={x + 92} y={y} w={36} h={40}>
      <Mas />
    </Caja>
  </>
)

// Ícono de carrito SÓLIDO (el de la tienda: carrito con manija), el mismo en todas las escenas. `IconoCarrito` va posicionado en el
// lienzo; `CarritoSolido` va en línea (por ejemplo, dentro de un sticker).
export const IconoCarrito = ({ x, y, size, color = "#6C4FD4" }) => (
  <span style={abs(x, y, { width: u(size), height: u(size), display: "flex", alignItems: "center", justifyContent: "center", color })}>
    <FontAwesomeIcon icon={faCartShopping} style={{ width: "100%", height: "100%" }} aria-hidden="true" />
  </span>
)
export const CarritoSolido = ({ size, color = "#fff" }) => (
  <FontAwesomeIcon icon={faCartShopping} style={{ width: u(size), height: u(size), color }} aria-hidden="true" />
)

// Fila del carrito como en la tienda real: foto, nombre, el precio en violeta debajo, el selector de cantidad a la derecha y una
// línea fina que la separa de la siguiente. `y` es el borde de arriba de la fila; mide 98 px de alto.
export const Fila = ({ y, foto, nombre, precio, cantidades }) => (
  <>
    <img src={foto} alt="" style={{ ...abs(98, y + 14, { width: u(70), height: u(70) }), borderRadius: u(10), objectFit: "cover" }} />
    <span style={{ ...abs(188, y + 17), fontSize: u(23), fontWeight: 500, color: "#17122F", lineHeight: 1.3 }}>{nombre}</span>
    <span style={{ ...abs(188, y + 53), fontSize: u(20), fontWeight: 600, color: "#6C4FD4", lineHeight: 1.3 }}>{precio}</span>
    <Stepper x={541} y={y + 29} cantidades={cantidades} />
    <div style={{ ...abs(61, y + 98, { width: u(645), height: u(1.5) }), background: "#EEEBF5" }} />
  </>
)

// Toque (tap) con dedo: un círculo que se achica al apretar y, desde el punto tocado, dos ondas que se expanden. `clase` es la
// animación del círculo de cada escena; `ini` es el segundo del bucle en que ocurre el toque y `dur` el largo del bucle (ver
// .eg-toque y .eg-anillo en index.css).
export const Toque = ({ x, y, clase, ini, dur }) => (
  <>
    <span className="eg-anillo" style={{ left: u(x), top: u(y), "--ini": `${ini}s`, "--dur": `${dur}s` }} />
    <span className={`eg-toque ${clase}`} style={{ left: u(x), top: u(y) }} />
  </>
)

// Glifo de WhatsApp de un solo color (el trazo del ícono de la marca WhatsApp, sin el cuadrado verde).
export const WhatsAppGlifo = ({ size, color = "#fff" }) => (
  <svg viewBox="8 8 29 29" fill={color} style={{ width: u(size), height: u(size) }} aria-hidden="true">
    <g transform="rotate(-5.06977 22.77 22.78)">
      <path d="M28.4801 25.8711C28.1701 25.678 26.6579 24.7665 26.3723 24.6302C26.0862 24.4988 25.8766 24.4247 25.6326 24.7302C25.3941 25.0279 24.7099 25.6973 24.5017 25.8917C24.2936 26.0862 24.106 26.0858 23.7991 25.9142C23.4891 25.7211 22.4823 25.2917 21.3493 24.0786C20.4637 23.1378 19.917 22.0273 19.7556 21.6859C19.5946 21.3486 19.7791 21.1822 19.9535 21.0362C20.1139 20.902 20.3109 20.6943 20.4925 20.5146C20.6659 20.3343 20.7276 20.2084 20.8604 20.0081C20.9858 19.79 20.9473 19.608 20.8814 19.4406C20.8155 19.2733 20.3114 17.6273 20.098 16.9706C19.8964 16.3197 19.6198 16.3759 19.4215 16.3583C19.2377 16.3249 19.0224 16.3058 18.8079 16.2867C18.5935 16.2677 18.2359 16.3168 17.9132 16.5981C17.589 16.8964 16.6858 17.5977 16.5467 19.1662C16.4072 20.7387 17.4271 22.3627 17.5672 22.6043C17.7128 22.8293 19.5331 26.2536 22.6429 27.9316C23.3854 28.3246 23.967 28.572 24.4206 28.7737C25.1702 29.0865 25.8773 29.115 26.4405 29.0842C27.0645 29.0376 28.4148 28.4731 28.7524 27.7387C29.0945 26.9999 29.1505 26.3678 29.0831 26.2174C29.0161 26.063 28.8128 25.9642 28.5009 25.7922L28.4801 25.8711ZM21.9112 33.3009L21.8942 33.2993C19.9802 33.1295 18.134 32.4429 16.5674 31.3267L16.2003 31.0609L12.0602 31.7556L13.4972 27.9147L13.2717 27.4869C12.3539 25.6927 11.9614 23.6759 12.1394 21.6684C12.6607 15.7928 17.8957 11.4267 23.8134 11.9517C26.68 12.206 29.2703 13.5614 31.1141 15.7642C32.0247 16.8391 32.7121 18.0844 33.1363 19.4277C33.5605 20.771 33.713 22.1853 33.5849 23.5881C33.0559 29.459 27.825 33.8255 21.9153 33.3012L21.9112 33.3009ZM32.7891 14.3622C30.5381 11.766 27.4201 10.1345 23.9764 9.82903C16.8738 9.19891 10.5796 14.4442 9.9477 21.5205C9.74724 23.7801 10.1417 26.0371 11.0984 28.0886L8.67953 34.5741L15.6748 33.3977C17.4779 34.5878 19.5476 35.3129 21.6991 35.5081L21.7032 35.5084C28.8098 36.1389 35.1041 30.8936 35.7364 23.8124C36.0404 20.3858 34.9903 17.0421 32.7693 14.4021L32.7891 14.3622Z" />
    </g>
  </svg>
)
