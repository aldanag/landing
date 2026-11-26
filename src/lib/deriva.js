import { useEffect } from "react"

// Hace que una fila de tarjetas con scroll horizontal se deslice sola, de forma continua y suave (no de a saltos). Solo se mueve mientras
// la sección está a la vista, se frena si la persona la señala con el mouse, la toca, usa la rueda, hace clic o enfoca algo adentro, y
// retoma unos segundos después. Al llegar al final espera un momento y vuelve despacio al principio. No corre si el sistema pide "reducir
// movimiento" (con ?motion=on se fuerza). Mientras se desliza se apaga el "snap" para que el movimiento no se trabe; al tocarla con el
// dedo vuelve a encajar de a una tarjeta.
// Opciones: `soloHover` (solo frena al poner el cursor encima de la fila y sigue apenas se saca; con el dedo frena mientras se toca) y
// `bucle` (la fila trae sus tarjetas repetidas y, al terminar la primera tanda, vuelve al comienzo sin que se note, sin esperas).
export function useDeriva(pista, seccion, { velocidad = 34, soloHover = false, bucle = false } = {}) {
  useEffect(() => {
    const el = pista.current
    const sec = seccion.current
    if (!el || !sec) return undefined
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const forzado = new URLSearchParams(window.location.search).get("motion") === "on"
    if (quieto && !forzado) return undefined

    let enVista = false
    let encima = false
    let conFoco = false
    let pausadoHasta = 0
    let espera = 0
    let esperandoFin = false
    let volviendo = false
    let derivando = false
    let pos = el.scrollLeft
    let ultimo = 0
    let raf = 0

    const zona = soloHover ? el : sec
    const anchoBucle = () => {
      const t = el.querySelectorAll("article")
      const n = t.length / 2
      return bucle && t.length >= 2 && Number.isInteger(n) ? t[n].offsetLeft - t[0].offsetLeft : 0
    }

    const io = new IntersectionObserver(([e]) => (enVista = e.isIntersecting), { threshold: 0.35 })
    io.observe(sec)

    const pausar = (ms) => (pausadoHasta = performance.now() + ms)
    const alEntrar = () => (encima = true)
    const alSalir = () => {
      encima = false
      pausar(soloHover ? 0 : 1500)
    }
    const alEnfocar = (e) => (conFoco = soloHover ? !!e.target.matches?.(":focus-visible") : true)
    const alDesenfocar = () => {
      conFoco = false
      pausar(1500)
    }
    const alTocar = () => {
      pausar(soloHover ? 2500 : 6000)
      derivando = false
      el.style.scrollSnapType = ""
    }
    const alInteractuar = () => pausar(soloHover ? 1200 : 6000)
    const alSoltarDedo = () => pausar(2500)
    // si la persona mueve la fila (flechas, puntitos, arrastre), seguimos desde donde quedó
    const alScrollear = () => {
      if (!volviendo && Math.abs(el.scrollLeft - pos) > 3) pos = el.scrollLeft
    }

    zona.addEventListener("pointerenter", alEntrar)
    zona.addEventListener("pointerleave", alSalir)
    sec.addEventListener("focusin", alEnfocar)
    sec.addEventListener("focusout", alDesenfocar)
    sec.addEventListener("pointerdown", alInteractuar)
    el.addEventListener("touchstart", alTocar, { passive: true })
    el.addEventListener("touchend", alSoltarDedo, { passive: true })
    el.addEventListener("wheel", alInteractuar, { passive: true })
    el.addEventListener("scroll", alScrollear, { passive: true })

    const paso = (ahora) => {
      raf = requestAnimationFrame(paso)
      const dt = Math.min(64, ahora - (ultimo || ahora)) / 1000
      ultimo = ahora
      if (!enVista || document.hidden || encima || conFoco || ahora < pausadoHasta) {
        derivando = false
        return
      }
      if (volviendo) {
        if (el.scrollLeft <= 2) {
          volviendo = false
          pos = 0
          espera = ahora + 1200
        }
        return
      }
      if (ahora < espera) return
      const maximo = el.scrollWidth - el.clientWidth
      if (!derivando) {
        el.style.scrollSnapType = "none"
        derivando = true
        pos = el.scrollLeft
      }
      if (!anchoBucle() && pos >= maximo - 1) {
        if (!esperandoFin) {
          esperandoFin = true
          espera = ahora + 1800
          return
        }
        esperandoFin = false
        volviendo = true
        el.scrollTo({ left: 0, behavior: "smooth" })
        return
      }
      const vuelta = anchoBucle()
      if (vuelta) {
        pos += velocidad * dt
        if (pos >= vuelta) pos -= vuelta
      } else {
        pos = Math.min(maximo, pos + velocidad * dt)
      }
      el.scrollLeft = pos
    }
    raf = requestAnimationFrame(paso)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      zona.removeEventListener("pointerenter", alEntrar)
      zona.removeEventListener("pointerleave", alSalir)
      sec.removeEventListener("focusin", alEnfocar)
      sec.removeEventListener("focusout", alDesenfocar)
      sec.removeEventListener("pointerdown", alInteractuar)
      el.removeEventListener("touchstart", alTocar)
      el.removeEventListener("touchend", alSoltarDedo)
      el.removeEventListener("wheel", alInteractuar)
      el.removeEventListener("scroll", alScrollear)
      el.style.scrollSnapType = ""
    }
  }, [pista, seccion, velocidad, soloHover, bucle])
}
