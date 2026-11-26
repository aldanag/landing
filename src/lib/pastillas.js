// Pastillas (pills) de la web: dos tamaños y colores fijos. Un solo lugar para que no se desparejen.
// - ETIQUETA: la de cada sección ("Funcionalidades", "Tiendas"…): lima, mayúsculas, 11 px (12,5 desde sm).
// - INSIGNIA: la chica que va dentro de una tarjeta o botón ("1 mes gratis", "Ahorrá 17%"): lima, mayúsculas, 10 px (11 desde sm).
// Las que llevan ícono usan ETIQUETA_ICONO. Sobre foto o tarjeta oscura se cambia solo el color con ETIQUETA_OSCURA.
const MOLDE = "rounded-full font-semibold uppercase text-ink"
export const ETIQUETA = `inline-block ${MOLDE} bg-lime px-2.5 py-1 text-[11px] tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]`
export const ETIQUETA_ICONO = `inline-flex items-center gap-1.5 ${MOLDE} bg-lime px-2.5 py-1 text-[11px] tracking-[0.08em] sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]`
export const ETIQUETA_OSCURA = "rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
export const INSIGNIA = `${MOLDE} bg-lime px-2 py-0.5 text-[10px] tracking-[0.08em] sm:text-[11px] sm:tracking-[0.09em]`
