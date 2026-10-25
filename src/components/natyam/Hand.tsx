import type { FingerState, HandShape, Hasta, PlacedHand } from "@/content/natyam/hastas";

// Right hand, palm facing the viewer, fingers up, in a 120×150 box.
const BASES: [number, number][] = [
  [45, 74],
  [56, 70],
  [67, 72],
  [77, 79],
];
const LENGTHS = [40, 46, 42, 32];
const ANGLES: Record<"together" | "spread" | "fan", number[]> = {
  together: [-5, -1, 3, 8],
  spread: [-18, -6, 6, 20],
  fan: [-34, -12, 12, 36],
};
const THUMB_BASE = "41 108";
const CONVERGE: [number, number] = [57, 24];

const SKIN = "#c98d63";
const OUTLINE = "#7c4a2d";
const ALTA = "#d7263d";

const rad = (d: number) => (d * Math.PI) / 180;
// Rounded so server and browser render identical attributes.
const r2 = (x: number) => Math.round(x * 100) / 100;

function Stroke({ d, tip }: { d: string; tip?: [number, number] }) {
  return (
    <>
      <path d={d} fill="none" stroke={OUTLINE} strokeWidth={12.5} strokeLinecap="round" />
      <path d={d} fill="none" stroke={SKIN} strokeWidth={10} strokeLinecap="round" />
      {tip && <circle cx={tip[0]} cy={tip[1]} r={3.2} fill={ALTA} />}
    </>
  );
}

function pinchPoint(shape: HandShape): [number, number] {
  const touching = shape.fingers.map((f, i) => (f === "touch" ? BASES[i][0] : null)).filter((x): x is number => x !== null);
  const avg = touching.length ? touching.reduce((s, x) => s + x, 0) / touching.length : 45;
  return [(avg + 38) / 2, 56];
}

function finger(state: FingerState, i: number, shape: HandShape) {
  const [bx, by] = BASES[i];
  const len = LENGTHS[i] * (shape.cup ? 0.84 : 1);
  if (state === "up" || state === "spread" || state === "fan") {
    const a = rad(ANGLES[state === "up" ? "together" : state][i]);
    const tip: [number, number] = [r2(bx + Math.sin(a) * len), r2(by - Math.cos(a) * len)];
    return <Stroke key={i} d={`M${bx} ${by} L${tip[0]} ${tip[1]}`} tip={tip} />;
  }
  if (state === "bent") {
    const tip: [number, number] = [bx, r2(by - len * 0.5)];
    return (
      <g key={i}>
        <Stroke d={`M${bx} ${by} L${tip[0]} ${tip[1]}`} />
        <circle cx={tip[0]} cy={tip[1]} r={5} fill="#b07450" stroke={OUTLINE} strokeWidth={1.2} />
      </g>
    );
  }
  if (state === "curl") {
    return <Stroke key={i} d={`M${bx} ${by} Q${bx + 2} ${by - 36} ${bx - 14} ${by - 22}`} />;
  }
  if (state === "touch") {
    const [px, py] = pinchPoint(shape);
    return <Stroke key={i} d={`M${bx} ${by} Q${bx} ${by - 30} ${px} ${py}`} />;
  }
  if (state === "converge") {
    return <Stroke key={i} d={`M${bx} ${by} Q${bx} ${by - 26} ${CONVERGE[0]} ${CONVERGE[1]}`} />;
  }
  return null; // fold: drawn as a knuckle over the palm
}

function thumb(shape: HandShape) {
  const [px, py] = pinchPoint(shape);
  switch (shape.thumb) {
    case "out":
      return <Stroke d={`M${THUMB_BASE} Q24 104 13 84`} tip={[13, 84]} />;
    case "up":
      return <Stroke d={`M${THUMB_BASE} Q33 84 37 54`} tip={[37, 54]} />;
    case "across":
      return <Stroke d={`M${THUMB_BASE} Q44 86 70 88`} />;
    case "touch":
      return <Stroke d={`M${THUMB_BASE} Q24 74 ${px} ${py}`} />;
    case "converge":
      return <Stroke d={`M${THUMB_BASE} Q30 60 ${CONVERGE[0]} ${CONVERGE[1]}`} />;
    default:
      return <Stroke d={`M${THUMB_BASE} Q34 92 47 84`} />;
  }
}

/** One hand as an SVG group in its 120×150 box. */
export function HandGlyph({ shape }: { shape: HandShape }) {
  const behind = (s: FingerState) => s === "up" || s === "spread" || s === "fan" || s === "bent";
  return (
    <g>
      {shape.fingers.map((s, i) => (behind(s) ? finger(s, i, shape) : null))}
      <path
        d="M37 80 Q37 68 48 68 L74 68 Q85 69 84 82 L82 118 Q80 132 67 134 L53 134 Q40 132 38 118 Z"
        fill={SKIN}
        stroke={OUTLINE}
        strokeWidth={1.6}
      />
      {shape.cup && <ellipse cx={60} cy={88} rx={16} ry={9} fill="#b07450" opacity={0.7} />}
      <circle cx={60} cy={100} r={8} fill={ALTA} opacity={0.9} />
      {shape.fingers.map((s, i) =>
        s === "fold" ? (
          <g key={i}>
            <rect x={BASES[i][0] - 5.5} y={63} width={11} height={13} rx={5.5} fill={SKIN} stroke={OUTLINE} strokeWidth={1.4} />
            <path d={`M${BASES[i][0] - 4} 71 h8`} stroke={OUTLINE} strokeWidth={1} />
          </g>
        ) : null,
      )}
      {shape.fingers.map((s, i) => (behind(s) || s === "fold" ? null : finger(s, i, shape)))}
      {thumb(shape)}
      <rect x={45} y={130} width={30} height={8} rx={3} fill="#d4a017" stroke="#92400e" strokeWidth={1} />
    </g>
  );
}

function Placed({ p }: { p: PlacedHand }) {
  const flip = p.mirror ? "translate(120 0) scale(-1 1)" : "";
  return (
    <g transform={`translate(${p.x - 60} ${p.y}) rotate(${p.rotate ?? 0} 60 90) scale(${p.scale ?? 1})`}>
      <g transform={flip}>
        <HandGlyph shape={p.shape} />
      </g>
    </g>
  );
}

/** Full illustration of a hasta: one hand, or the two-hand arrangement for samyuta hastas. */
export function HastaIcon({ hasta, className, mirror = false }: { hasta: Hasta; className?: string; mirror?: boolean }) {
  if (hasta.pair) {
    return (
      <svg viewBox="-35 -20 190 180" className={className} role="img" aria-label={`${hasta.name} (${hasta.sanskrit})`}>
        {hasta.pair.map((p, i) => (
          <Placed key={i} p={p} />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 6 120 140" className={className} role="img" aria-label={`${hasta.name} (${hasta.sanskrit})`}>
      <g transform={mirror ? "translate(120 0) scale(-1 1)" : undefined}>
        <HandGlyph shape={hasta.shape!} />
      </g>
    </svg>
  );
}
