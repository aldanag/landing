export default function CheckIcon({ className = "" }) {
  return (
    <span
      className={`flex flex-none items-center justify-center rounded-full bg-accent ${className || "h-6 w-6"}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[58%] w-[58%]">
        <path
          d="m5 13 4 4 10-10"
          stroke="#17141f"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
