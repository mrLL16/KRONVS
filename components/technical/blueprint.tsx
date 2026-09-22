export function Blueprint() {
  return (
    <div className="blueprint" aria-hidden="true">
      <svg viewBox="0 0 440 320" fill="none">
        <g stroke="currentColor" strokeWidth="1">
          <path
            d="M20 250H420M70 20V300M370 20V300"
            strokeDasharray="3 7"
            opacity=".35"
          />
          <path d="M100 135 235 58 370 135 235 213Z M100 135V211L235 288 370 211V135 M235 213V288 M100 211 235 135 370 211" />
          <path
            d="M130 135 235 76 340 135 235 195Z M130 153 235 213 340 153 M130 171 235 231 340 171 M130 189 235 249 340 189 M130 207 235 267 340 207"
            opacity=".45"
          />
          <path
            d="M235 58V135 M160 169V102 M310 169V102 M100 173 235 250 370 173"
            opacity=".55"
          />
          <path d="M82 127 62 116 M82 220 62 231 M66 121V226 M395 137V213 M385 131H402 M385 220H402" />
          <circle
            cx="235"
            cy="173"
            r="116"
            strokeDasharray="2 8"
            opacity=".45"
          />
          <path d="M16 38H48M32 22V54 M388 272H420M404 256V288" />
        </g>
        <g fill="currentColor" fontFamily="monospace" fontSize="9">
          <text x="18" y="174">
            Y
          </text>
          <text x="395" y="177">
            Z
          </text>
          <text x="185" y="310">
            ESTUDO / SISTEMA
          </text>
          <text x="302" y="30">
            REF. 001—K
          </text>
        </g>
      </svg>
      <span className="blueprint-caption">
        VISÃO DO TODO. PRECISÃO NO DETALHE.
      </span>
    </div>
  );
}
