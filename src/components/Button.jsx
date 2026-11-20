// Único botón del sitio. Es IDÉNTICO en la landing y en Premium: si cambia uno, se copia al otro.
// variante = rol, tamaño = lugar donde vive. Cada variante trae su propio anillo de foco (según la superficie).
//
// Regla de color, según la superficie donde está el botón:
//   - Sobre claro (blanco o lila): `primary` (violeta). Secundario: `secondary` (gris) sobre blanco, `tinted` (blanco) sobre lila o foto.
//   - Sobre oscuro: `inverse` (blanco). Secundario: `outline` (borde blanco). Nunca violeta.
//   - Menú: `dark` sobre la píldora blanca; `inverse` cuando el menú es transparente sobre oscuro.
//   - `chip`: acción chica y discreta (ver ejemplo), siempre sobre claro.
const base =
  "group/btn inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold text-center transition-[filter,background-color,scale] duration-200 active:scale-[0.98] motion-reduce:transition-none"

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark focus-ring",
  secondary: "bg-mist text-ink ring-1 ring-ink/10 hover:brightness-95 focus-ring",
  tinted: "bg-white text-ink ring-1 ring-ink/10 hover:bg-primary-tint focus-ring",
  inverse: "bg-white text-ink ring-1 ring-ink/10 hover:bg-primary-tint focus-ring-inverse",
  outline: "bg-transparent text-white ring-1 ring-white/70 hover:bg-white/10 focus-ring-inverse",
  dark: "bg-ink text-white hover:bg-ink-soft focus-ring",
  chip: "gap-1.5 bg-mist text-ink hover:bg-primary-tint focus-ring",
}

// Altos fijos: sm 40 (solo el menú), md 44, lg 52.
const sizes = {
  sm: "min-h-10 px-5 py-2 text-sm",
  md: "min-h-11 px-6 py-2.5 text-[15px]",
  lg: "min-h-[3.25rem] px-8 py-3 text-[15px]",
  chip: "min-h-10 px-3 py-1.5 text-[13px]",
}

export default function Button({
  href,
  external = false,
  variant = "primary",
  size,
  block = false,
  className = "",
  children,
  ...rest
}) {
  const resolvedSize = size ?? (variant === "chip" ? "chip" : "md")
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${sizes[resolvedSize]} ${
        block ? "w-full" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
