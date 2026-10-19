import Button from "./Button"
import { EJEMPLO_WEB_LINK } from "../lib/planes"

// Chip "Ver ejemplo" con el ojito. Va arriba a la derecha del nombre del plan, en la tarjeta de
// precios de la landing y en el precio de /basico/. Un solo componente para que no difieran.
export default function VerEjemplo({ plan }) {
  return (
    <Button
      href={EJEMPLO_WEB_LINK}
      external
      variant="chip"
      aria-label={`Ver ejemplo de una tienda con el plan ${plan}`}
      className="ml-auto"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 text-primary transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/btn:scale-125 motion-reduce:transition-none motion-reduce:group-hover/btn:scale-100"
      >
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
      Ver ejemplo
    </Button>
  )
}
