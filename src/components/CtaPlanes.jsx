import Button from "./Button"

// "Ver planes": la llamada a la acción principal de la landing. Lleva a la sección de precios (#planes). Se repite al final de cada
// sección grande. `sobre` = superficie donde va (claro: violeta; oscuro: blanco, según las reglas de Button).
export default function CtaPlanes({ sobre = "claro", className = "mt-10 md:mt-12" }) {
  return (
    <div data-reveal className={`flex justify-center ${className}`}>
      <Button href="#planes" variant={sobre === "oscuro" ? "inverse" : "primary"} size="lg">
        Ver planes
      </Button>
    </div>
  )
}
