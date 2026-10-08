import logo from "../assets/lemora-logo.svg"
import Button from "./Button"

const WHATSAPP_TRIAL_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20probar%20Lemora%20gratis"

const explorar = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Funciones", href: "#funciones" },
  { label: "Planes", href: "#planes" },
  { label: "Preguntas frecuentes", href: "#faq" },
]

// Páginas pendientes — placeholder hasta que existan
const legal = [
  { label: "Términos", href: "#" },
  { label: "Privacidad", href: "#" },
]

const YEAR = new Date().getFullYear()

const linkClass =
  "rounded text-[15px] text-white/70 transition-colors hover:text-white focus-ring-light"

function Column({ title, children }) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.09em] text-white/50">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[88rem]">
        <div className="px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-12 lg:px-14">
          {/* Cierre con llamada a la acción */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
              Tu tienda, tus reglas
            </h2>
            <Button
              href={WHATSAPP_TRIAL_LINK}
              external
              size="lg"
              className="self-start md:self-auto"
            >
              Probar gratis 1 mes
            </Button>
          </div>

          <div className="mt-14 h-px bg-white/10 md:mt-16" />

          {/* Columnas */}
          <div className="mt-12 grid gap-12 sm:grid-cols-2 md:mt-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#top" className="inline-block rounded-lg focus-ring-light">
                <img
                  src={logo}
                  alt="Lemora"
                  className="h-8 w-auto brightness-0 invert"
                />
              </a>
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">
                Armá tu tienda, subí tus productos y recibí los pedidos por
                WhatsApp.
              </p>
            </div>

            <Column title="Explorar">
              {explorar.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </Column>

            <Column title="Legal">
              {legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </Column>

            <Column title="Contacto">
              <li>
                <a
                  href={WHATSAPP_TRIAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Escribinos por WhatsApp
                </a>
              </li>
            </Column>
          </div>

          <p className="mt-14 border-t border-white/10 pt-6 text-[13px] text-white/50 md:mt-16">
            © {YEAR} Lemora. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
