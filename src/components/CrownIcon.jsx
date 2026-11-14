// Corona de Premium. Marca solo al plan Premium, al lado de su nombre.
export default function CrownIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 7.5 7.5 11 12 4l4.5 7L21 7.5 19 18H5L3 7.5Z" />
      <path d="M5 21h14" strokeLinecap="round" />
    </svg>
  )
}
