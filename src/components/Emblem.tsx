type SvgProps = { className?: string; title?: string };

/** Valampuri conch — Panchajanyam */
export function Sangu({ className, title = "சங்கு — பாஞ்சசன்யம்" }: SvgProps) {
  return (
    <svg viewBox="0 0 100 130" className={className} role="img" aria-label={title}>
      <defs>
        <radialGradient id="pearl" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#fdf2e4" />
          <stop offset="100%" stopColor="#e9cba6" />
        </radialGradient>
        <linearGradient id="sanguGold" x1="0" x2="1">
          <stop offset="0%" stopColor="#b7791f" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b7791f" />
        </linearGradient>
      </defs>
      {/* spire */}
      <path d="M50 4 C54 10 58 14 60 20 L40 20 C42 14 46 10 50 4 Z" fill="url(#pearl)" stroke="#c08a4a" strokeWidth="1.2" />
      <rect x="37" y="19" width="26" height="7" rx="3" fill="url(#sanguGold)" />
      {/* body */}
      <path
        d="M38 26 C22 34 16 56 20 76 C24 96 36 112 50 120 C64 112 78 96 81 74 C84 54 77 34 62 26 Z"
        fill="url(#pearl)"
        stroke="#c08a4a"
        strokeWidth="1.4"
      />
      {/* spiral ridges */}
      <path d="M26 46 Q50 38 76 48" fill="none" stroke="#d6ab7c" strokeWidth="1.6" />
      <path d="M21 64 Q52 54 81 66" fill="none" stroke="#d6ab7c" strokeWidth="1.6" />
      <path d="M24 84 Q52 74 79 86" fill="none" stroke="#d6ab7c" strokeWidth="1.6" />
      {/* right-turning mouth (valampuri) */}
      <path d="M50 120 C60 106 70 92 74 72 C66 84 58 96 50 120 Z" fill="#f6d9b8" stroke="#c08a4a" strokeWidth="1.2" />
      <rect x="38" y="112" width="24" height="7" rx="3" fill="url(#sanguGold)" />
      <circle cx="50" cy="124" r="3.5" fill="#dc2626" />
    </svg>
  );
}

/** Thiruman (naamam) with the central Srichurnam */
export function Naamam({ className, title = "திருமண் — நாமம்" }: SvgProps) {
  return (
    <svg viewBox="0 0 100 130" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id="churnam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="45%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" floodColor="#7f1d1d" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* white thiruman, U-shape */}
      <path
        d="M22 8 H38 L45 86 Q50 93 55 86 L62 8 H78 L66 96 Q50 116 34 96 Z"
        fill="#ffffff"
        stroke="#e7c9a0"
        strokeWidth="1.6"
        filter="url(#soft)"
      />
      {/* srichurnam flame */}
      <path className="flame" d="M50 14 C44 38 44 64 50 84 C56 64 56 38 50 14 Z" fill="url(#churnam)" />
      {/* lotus base */}
      <path d="M30 112 Q40 102 50 112 Q60 102 70 112 Q60 122 50 118 Q40 122 30 112 Z" fill="#f472b6" stroke="#be185d" strokeWidth="1" />
      <path d="M38 114 Q50 106 62 114" fill="none" stroke="#fde68a" strokeWidth="1.4" />
    </svg>
  );
}

/** Sudarshana chakram with flame ring */
export function Chakram({ className, title = "சக்கரம் — சுதர்சனம்", spin = true }: SvgProps & { spin?: boolean }) {
  const flames = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const spokes = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={title}>
      <defs>
        <radialGradient id="chakraGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b7791f" />
        </radialGradient>
      </defs>
      <g className={spin ? "spin-slow" : undefined}>
        {flames.map((a) => (
          <path key={a} d="M60 2 C64 8 64 12 60 16 C56 12 56 8 60 2 Z" fill="#f97316" transform={`rotate(${a} 60 60)`} />
        ))}
        {flames.map((a) => (
          <path key={`i${a}`} d="M60 7 C62 10 62 12 60 14 C58 12 58 10 60 7 Z" fill="#fde047" transform={`rotate(${a} 60 60)`} />
        ))}
        <circle cx="60" cy="60" r="43" fill="url(#chakraGold)" stroke="#92400e" strokeWidth="2" />
        <circle cx="60" cy="60" r="35" fill="#fff8ec" stroke="#b45309" strokeWidth="2.5" />
        {spokes.map((a) => (
          <path key={a} d="M60 26 L63 50 L60 54 L57 50 Z" fill="#b45309" transform={`rotate(${a} 60 60)`} />
        ))}
        <circle cx="60" cy="60" r="12" fill="url(#chakraGold)" stroke="#92400e" strokeWidth="2" />
        <circle cx="60" cy="60" r="4" fill="#dc2626" />
      </g>
    </svg>
  );
}

/** Oil lamp (agal) — the three lamps of Thirukkovalur */
export function Lamp({ className, title = "அகல் விளக்கு" }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      <path className="flame" d="M40 8 C48 20 48 30 40 38 C32 30 32 20 40 8 Z" fill="#f97316" />
      <path className="flame" d="M40 18 C44 24 44 30 40 34 C36 30 36 24 40 18 Z" fill="#fde047" />
      <path d="M10 44 Q40 40 70 44 Q64 64 40 66 Q16 64 10 44 Z" fill="#b45309" stroke="#7c2d12" strokeWidth="1.5" />
      <path d="M14 46 Q40 43 66 46" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <rect x="32" y="66" width="16" height="6" rx="2" fill="#92400e" />
    </svg>
  );
}

/** The central section: Sangu — Naamam — Chakram */
export function EmblemTriad({ compact = false }: { compact?: boolean }) {
  const side = compact ? "h-16 w-16 sm:h-20 sm:w-20" : "h-24 w-24 sm:h-36 sm:w-36";
  const mid = compact ? "h-20 w-20 sm:h-24 sm:w-24" : "h-32 w-32 sm:h-48 sm:w-48";
  return (
    <div className="flex items-end justify-center gap-4 sm:gap-10">
      <div className="float flex flex-col items-center">
        <Sangu className={side} />
        {!compact && <span className="font-display mt-2 text-sm text-maroon">பாஞ்சசன்யம்</span>}
      </div>
      <div className="flex flex-col items-center">
        <div className="glow-ring rounded-full bg-gradient-to-b from-amber-50 to-orange-100 p-3 sm:p-5">
          <Naamam className={mid} />
        </div>
        {!compact && <span className="font-display mt-2 text-sm text-maroon">திருமண் காப்பு</span>}
      </div>
      <div className="float flex flex-col items-center" style={{ animationDelay: "1.2s" }}>
        <Chakram className={side} />
        {!compact && <span className="font-display mt-2 text-sm text-maroon">சுதர்சனம்</span>}
      </div>
    </div>
  );
}
