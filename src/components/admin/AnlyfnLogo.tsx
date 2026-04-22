interface AnlyfnLogoProps {
  size?: number
}

export function AnlyfnLogo({ size = 32 }: AnlyfnLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      fill="none"
    >
      <path
        d="M -57.98 57.98 A 82 82 0 1 1 57.98 -57.98"
        stroke="url(#sf)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M -41.01 41.01 A 58 58 0 1 1 41.01 -41.01"
        stroke="#0A7B9E"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <line
        x1="0"
        y1="-82"
        x2="0"
        y2="82"
        stroke="url(#sf)"
        strokeWidth="2"
        opacity="0.65"
      />
      <line
        x1="-82"
        y1="0"
        x2="24"
        y2="0"
        stroke="#0A7B9E"
        strokeWidth="1.3"
        opacity="0.45"
      />
      <line
        x1="0"
        y1="0"
        x2="58"
        y2="-58"
        stroke="url(#sf)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="0"
        y1="-82"
        x2="0"
        y2="-70"
        stroke="#C8E8F0"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <line
        x1="-82"
        y1="0"
        x2="-70"
        y2="0"
        stroke="#C8E8F0"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <polygon
        points="0,-14 14,0 0,14 -14,0"
        fill="#020F16"
        stroke="url(#sf)"
        strokeWidth="2.5"
      />
      <polygon
        points="0,-7 7,0 0,7 -7,0"
        fill="#C8E8F0"
        opacity="0.95"
      />
      <circle
        cx="0"
        cy="-82"
        r="4.5"
        fill="#C8E8F0"
        opacity="0.9"
      />
      <circle
        cx="58"
        cy="-58"
        r="3"
        fill="none"
        stroke="#C8E8F0"
        strokeWidth="2"
        opacity="0.8"
      />
      <circle
        cx="58"
        cy="-58"
        r="1.5"
        fill="#C8E8F0"
        opacity="0.9"
      />
      <defs>
        <linearGradient
          id="sf"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#C8E8F0" />
          <stop offset="55%" stopColor="#7BBFD6" />
          <stop offset="100%" stopColor="#0A7B9E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
