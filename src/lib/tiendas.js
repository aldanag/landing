// Tiendas de ejemplo hechas con Lemora. Cada una tiene su captura de escritorio y de celular (las mismas de la
// página Básico). Para sumar una: agregar las dos capturas en src/assets/tiendas, importarlas acá y completar los datos.
// "plan": "Básico" | "Premium". Cuando haya tiendas de más de un plan, aparece solo el interruptor de la sección.
import tommyEscritorio from "../assets/tiendas/tommytommy-desktop.webp"
import tommyMovil from "../assets/tiendas/tommytommy-movil.webp"
import belovaEscritorio from "../assets/tiendas/belova-desktop.webp"
import belovaMovil from "../assets/tiendas/belova-movil.webp"
import amberEscritorio from "../assets/tiendas/amberparfums-desktop.webp"
import amberMovil from "../assets/tiendas/amberparfums-movil.webp"
import mouraEscritorio from "../assets/tiendas/moura-desktop.webp"
import mouraMovil from "../assets/tiendas/moura-movil.webp"
import boutiqueEscritorio from "../assets/tiendas/boutique-desktop.webp"
import boutiqueMovil from "../assets/tiendas/boutique-movil.webp"

export const tiendasEjemplo = [
  {
    nombre: "Tommy-Tommy",
    rubro: "Pizzería",
    url: "https://tommytommy.lemora.lat/",
    escritorio: tommyEscritorio,
    movil: tommyMovil,
    plan: "Básico",
  },
  {
    nombre: "Moura Deco",
    rubro: "Deco y accesorios",
    url: "https://moura.lemora.lat/",
    escritorio: mouraEscritorio,
    movil: mouraMovil,
    plan: "Premium",
  },
  {
    nombre: "Belova",
    rubro: "Estética",
    url: "https://belova.lemora.lat/",
    escritorio: belovaEscritorio,
    movil: belovaMovil,
    plan: "Básico",
  },
  {
    nombre: "Boutique",
    rubro: "Indumentaria",
    url: "https://premium.lemora.lat/",
    escritorio: boutiqueEscritorio,
    movil: boutiqueMovil,
    plan: "Premium",
  },
  {
    nombre: "Amber Parfums",
    rubro: "Perfumería",
    url: "https://amberparfums.lemora.lat/",
    escritorio: amberEscritorio,
    movil: amberMovil,
    plan: "Básico",
  },
]
