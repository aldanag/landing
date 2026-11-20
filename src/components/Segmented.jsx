// Selector segmentado (Mensual/Anual, Básico/Premium, Sin/Con Lemora). Un solo componente para toda la web.
// tone="light": caja blanca (va sobre fondos claros u oscuros). tone="dark": caja azul oscura (Premium).
// Cada opción puede traer `on` para cambiar el color del activo (por defecto, violeta) y `badge` para una etiqueta lima.
export default function Segmented({ options, value, onChange, label, tone = "light", className = "" }) {
  const dark = tone === "dark"
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex flex-none rounded-full p-1 ring-1 ${
        dark ? "bg-night-2 ring-white/10" : "bg-white ring-ink/10"
      } ${className}`}
    >
      {options.map((op) => (
        <button
          key={op.label}
          type="button"
          aria-pressed={value === op.id}
          onClick={() => onChange(op.id)}
          className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 motion-reduce:transition-none sm:px-5 ${
            dark ? "focus-ring-inverse" : "focus-ring"
          } ${
            value === op.id
              ? (op.on ?? "bg-primary text-white")
              : dark
                ? "text-snow-soft hover:text-white"
                : "text-ink-soft hover:text-ink"
          }`}
        >
          {op.label}
          {op.badge && (
            <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-ink">
              {op.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
