import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Las fuentes cambian el alto de las secciones: recalcular los triggers.
if (typeof document !== "undefined" && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}

export const REDUCED_MOTION_OFF = "(prefers-reduced-motion: no-preference)"
export const REDUCED_MOTION_ON = "(prefers-reduced-motion: reduce)"

// Entrada al scroll para los hijos con data-reveal dentro de `scope`.
// Visible por defecto: solo se oculta si JS corre y no hay "reducir movimiento".
export function useReveal(scope, { y = 28, scale = 1, stagger = 0.12 } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_OFF, () => {
        // Títulos: cada palabra sube desde detrás de una línea invisible.
        const restore = []
        gsap.utils.toArray("[data-words]", scope.current).forEach((title) => {
          const original = title.innerHTML
          const text = title.textContent
          title.setAttribute("aria-label", text)
          title.textContent = ""
          const inner = text.split(" ").map((word, i, all) => {
            const mask = document.createElement("span")
            mask.setAttribute("aria-hidden", "true")
            mask.style.cssText =
              "display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.14em;margin-bottom:-.14em"
            const span = document.createElement("span")
            span.style.display = "inline-block"
            span.textContent = word
            mask.appendChild(span)
            title.appendChild(mask)
            if (i < all.length - 1) title.appendChild(document.createTextNode(" "))
            return span
          })
          gsap.set(inner, { yPercent: 115 })
          ScrollTrigger.create({
            trigger: title,
            start: "top 88%",
            once: true,
            onEnter: () =>
              gsap.to(inner, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }),
          })
          restore.push(() => {
            title.innerHTML = original
            title.removeAttribute("aria-label")
          })
        })

        const items = gsap.utils.toArray("[data-reveal]", scope.current)
        gsap.set(items, { opacity: 0, y, scale, transition: "none" })
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "expo.out",
              stagger,
              clearProps: "opacity,transform,transition",
            }),
        })
        return () => restore.forEach((undo) => undo())
      }, scope)

      // Con "reducir movimiento": solo fundidos suaves, sin desplazamientos.
      mm.add(REDUCED_MOTION_ON, () => {
        const items = gsap.utils.toArray("[data-reveal],[data-words]", scope.current)
        gsap.set(items, { opacity: 0 })
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              duration: 0.6,
              ease: "power1.out",
              stagger: 0.08,
              clearProps: "opacity",
            }),
        })
      }, scope)
    },
    { scope },
  )
}

export { gsap, ScrollTrigger, useGSAP }
