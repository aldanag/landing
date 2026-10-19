// Tilde naranja suelto (el mismo que usan las listas de los planes).
export default function Tick({ className = "h-4 w-4", tone = "text-accent" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`flex-none ${tone} ${className}`}
    >
      <path
        d="m5 13 4 4 10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
