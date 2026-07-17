// Monogram "HPM" arqueado — inspirado na logo. Usado como marca decorativa.
export function Monogram({ className, strokeWidth = 1 }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 100 C 40 20, 160 20, 180 100"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <text
        x="100"
        y="78"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontSize="42"
        fontStyle="italic"
        fill="currentColor"
        letterSpacing="4"
      >
        HPM
      </text>
    </svg>
  );
}
