// Botón redondo de 48 px con un ícono (flechas del carrusel). Blanco sobre oscuro; se apaga cuando está deshabilitado.
export default function IconButton({ label, className = "", children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-ink transition-[background-color,color,scale] duration-200 hover:bg-primary-tint active:scale-95 focus-ring-inverse disabled:cursor-default disabled:bg-white/10 disabled:text-white/40 motion-reduce:transition-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
