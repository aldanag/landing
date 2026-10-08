import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"

// Placeholder visual reutilizable para donde falta una imagen real.
// No usar imágenes de stock — dejar así hasta tener la foto real.
export default function ImagePlaceholder({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-primary-tint text-primary/60 ${className}`}
    >
      <FontAwesomeIcon icon={faImage} className="h-5 w-5" aria-hidden="true" />
    </div>
  )
}
