import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faImage } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import { EJEMPLO_WEB_LINK } from "../lib/planes"

// Mockups de las tiendas de ejemplo: guardalos en src/assets/basico/ como ejemplo-1, ejemplo-2 y
// ejemplo-3 (.webp, .png o .jpg, de 1000 px de ancho o más, cualquier proporción). La página los
// toma sola; mientras no estén, se ve un recuadro de ejemplo.
const fotos = import.meta.glob("../assets/basico/ejemplo-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`ejemplo-${n}.`))?.[1]

// TODO: completar el nombre, el rubro y el link real de cada tienda de ejemplo.
const tiendas = [
  { n: 1, nombre: "Nombre de la tienda", rubro: "Rubro", href: EJEMPLO_WEB_LINK },
  { n: 2, nombre: "Nombre de la tienda", rubro: "Rubro", href: EJEMPLO_WEB_LINK },
  { n: 3, nombre: "Nombre de la tienda", rubro: "Rubro", href: EJEMPLO_WEB_LINK },
]

export default function BasicoEjemplos() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section
      id="ejemplos"
      ref={root}
      className="bg-mist bg-[linear-gradient(to_bottom,#ffffff,var(--color-mist)_14rem)] py-16"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            Ejemplos por casos
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            Mirá tiendas creadas con el plan Básico.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-ink-soft">
            Entrá a cada una y recorré cómo se ve y cómo se compra.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tiendas.map((t) => {
            const foto = fotoDe(t.n)
            return (
              <article
                key={t.n}
                data-reveal
                className="flex flex-col rounded-3xl bg-white p-4 ring-1 ring-ink/10"
              >
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl bg-mist ring-1 ring-ink/10 focus-ring"
                  aria-label={`Ver la tienda de ejemplo ${t.n}`}
                >
                  {foto ? (
                    <img
                      src={foto}
                      alt={`Mockup de la tienda de ejemplo ${t.n}`}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-primary-tint p-6 text-center text-primary">
                      <FontAwesomeIcon icon={faImage} className="h-10 w-10" aria-hidden="true" />
                      <p className="text-sm font-bold uppercase tracking-[0.09em]">Mockup {t.n}</p>
                      <p className="text-xs font-semibold text-ink-muted">
                        Cualquier proporción · 1000 px de ancho o más
                      </p>
                    </div>
                  )}
                </a>
                <div className="mt-4 px-1">
                  <h3 className="text-[17px] font-bold text-ink">{t.nombre}</h3>
                  <p className="mt-0.5 text-[15px] text-ink-soft">{t.rubro}</p>
                </div>
                <Button href={t.href} external variant="primary" block className="mt-4 gap-2">
                  Ver tienda
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </Button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
