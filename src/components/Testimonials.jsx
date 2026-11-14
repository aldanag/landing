import { useRef } from "react"
import testimonioCarolina from "../assets/testimonio-carolina.webp"
import testimonioAldana from "../assets/testimonio-aldana.jpg"
import { useReveal } from "../lib/motion"
import { WHATSAPP_TRIAL_LINK } from "../lib/planes"
import Button from "./Button"

// Testimonios reales solamente: no completar con datos, nombres ni métricas inventadas.
// Mientras falta uno, el último lugar es una invitación a ser el próximo; cuando haya otro testimonio
// real, se suma a la lista de arriba y se saca esa tarjeta.
const testimonios = [
  {
    quote:
      "En 24 hs, desde que me puse en contacto ¡ya tenía mi web en línea! les pasé toda la información y al otro día ya estaba operativa.",
    name: "Carolina Villegas",
    role: "Rescatista animal",
    photo: testimonioCarolina,
  },
  {
    quote:
      "Lemora es muchísimo más ágil que otras plataformas. Se personaliza fácil, el tablero es re amigable, la tienda queda linda y no cobra comisión por venta.",
    name: "Aldana Gonzalez",
    role: "Moura Deco",
    photo: testimonioAldana,
  },
]

export default function Testimonials() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section ref={root} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <span
          data-reveal
          className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em] text-ink"
        >
          Testimonios
        </span>
        <h2
          data-words
          className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
        >
          Lo que dicen quienes ya venden con Lemora.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonios.map((t) => (
            <figure
              key={t.name}
              data-reveal
              className="flex flex-col justify-between gap-8 rounded-3xl bg-mist p-6 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <blockquote>
                <span
                  className="font-heading text-4xl leading-none text-primary"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="mt-2 text-lg font-medium leading-snug text-ink">
                  {t.quote}
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {t.photo ? (
                  <img
                    src={t.photo}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-[12.5px] text-ink-soft">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}

          <div
            data-reveal
            className="flex flex-col justify-between gap-8 rounded-3xl bg-lilac p-6 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
          >
            <div>
              <span className="font-heading text-4xl leading-none text-primary" aria-hidden="true">
                &ldquo;
              </span>
              <p className="mt-2 text-lg font-medium leading-snug text-ink">
                El próximo testimonio puede ser el tuyo.
              </p>
              <p className="mt-2 text-[15px] text-ink-soft">
                Probá Lemora gratis durante 1 mes. No te pedimos la tarjeta.
              </p>
            </div>
            <Button href={WHATSAPP_TRIAL_LINK} external variant="primary" block>
              Probar gratis 1 mes
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
