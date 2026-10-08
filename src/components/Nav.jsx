import { useEffect, useState } from "react"
import logo from "../assets/lemora-logo.svg"
import Button from "./Button"

const WHATSAPP_TRIAL_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20probar%20Lemora%20gratis"

const links = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Funciones", href: "#funciones" },
  { label: "Planes", href: "#planes" },
  { label: "Preguntas", href: "#faq" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-2 z-50 px-4 md:top-4 md:px-5">
      <div
        className={`mx-auto flex items-center justify-between gap-4 rounded-full bg-white ring-1 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
          scrolled
            ? "max-w-4xl py-2 pl-5 pr-2 shadow-lg shadow-ink/10 ring-ink/5"
            : "max-w-[88rem] py-2 pl-1 pr-1 shadow-none ring-transparent lg:px-8"
        }`}
      >
        <a href="#top" className="flex-none rounded-lg focus-ring">
          <img
            src={logo}
            alt="Lemora"
            className={`w-auto transition-[height] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
              scrolled
                ? "h-[18px] min-[340px]:h-[21.6px] md:h-[28.8px]"
                : "h-5 min-[340px]:h-6 md:h-8"
            }`}
          />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded text-sm font-medium text-ink-soft transition hover:text-ink focus-ring after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          href={WHATSAPP_TRIAL_LINK}
          external
          variant="dark"
          size="sm"
          className="flex-none max-[359px]:px-3 max-[359px]:text-[13px]"
        >
          Probar gratis<span className="max-[339px]:hidden">&nbsp;1 mes</span>
        </Button>
      </div>
    </header>
  )
}
