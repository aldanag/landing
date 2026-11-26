// Link de texto subrayado. `suelto`: va solo en su línea y mide 44 px de alto; si no, va dentro de una frase.
// tone="light": sobre blanco (violeta). tone="dark": sobre oscuro (lavanda).
export default function LinkTexto({ href, external = false, suelto = false, tone = "light", className = "", children, ...rest }) {
  const dark = tone === "dark"
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`rounded font-semibold underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none ${suelto ? "inline-flex min-h-11 items-center" : ""} ${
        dark ? "text-lavender hover:text-white focus-ring-inverse" : "text-primary hover:text-primary-dark focus-ring"
      } ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
