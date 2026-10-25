"use client";

import type { CSSProperties, ReactNode } from "react";
import type { HandShape } from "@/content/natyam/hastas";
import { SHAPES } from "@/content/natyam/hastas";
import type { Gaze, Pose, Stance } from "@/content/natyam/poses";
import { HandGlyph } from "./Hand";

// The figure is styled on Amruthavarshini's costume: black saree with a magenta woven border,
// magenta blouse, gold temple jewellery (odiyanam, choker, jhumkas, nethi chutti) and alta.

const UPPER = 34;
const FORE = 32;
const SHOULDER_L: [number, number] = [82, 66];
const SHOULDER_R: [number, number] = [118, 66];
const WAIST: [number, number] = [100, 108];

const GOLD = "#e0a526";
const GOLD_DARK = "#8a5a12";
const STONE = "#b91c1c";
const PEARL = "#fdf8ec";
const SKIN = "#c98d63";
const OUTLINE = "#7c4a2d";
const SAREE = "#1c1917";
const BORDER = "#be185d";
const BLOUSE = "#c0186b";

export type DanceStyle = "vazhuvoor" | "basic";

const DROP: Record<Stance, number> = {
  samapadam: 0, aramandi: 22, muzhumandi: 52, tribhanga: 0, ekapada: 0, kick: 0, walk: 0, alidha: 14, kneel: 64, seated: 40, recline: 0,
};

/** Vazhuvoor bani: a sculptural deflection of the torso in most poses (degrees, + leans to screen-right). */
const SWAY: Record<Stance, number> = {
  samapadam: 0, aramandi: 3, muzhumandi: 2, tribhanga: -7, ekapada: -4, kick: -5, walk: 4, alidha: -6, kneel: 0, seated: 3, recline: 0,
};

const deg = (r: number) => (r * 180) / Math.PI;
// Server and browser Math.* can differ in the last bits; rounding keeps hydration stable.
const r2 = (x: number) => Math.round(x * 100) / 100;
const norm = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180;
/** SVG rotate(φ) maps (0, L) to (−L·sinφ, L·cosφ); this finds φ for a direction. */
const angleOf = (dx: number, dy: number) => deg(Math.atan2(-dx, dy));

/** Two-bone IK: elbow bends outward (away from the body), slightly preferring a lower elbow. */
function solveArm(S: [number, number], T: [number, number], outward: -1 | 1) {
  let dx = T[0] - S[0];
  let dy = T[1] - S[1];
  let d = Math.hypot(dx, dy);
  if (d < 1e-3) [dx, dy, d] = [0, 1, 1];
  const reach = Math.min(UPPER + FORE - 0.5, Math.max(Math.abs(UPPER - FORE) + 0.5, d));
  const [ux, uy] = [dx / d, dy / d];
  const g = Math.acos(Math.min(1, Math.max(-1, (UPPER ** 2 + reach ** 2 - FORE ** 2) / (2 * UPPER * reach))));
  const elbows = [g, -g].map((a) => [S[0] + UPPER * (ux * Math.cos(a) - uy * Math.sin(a)), S[1] + UPPER * (ux * Math.sin(a) + uy * Math.cos(a))] as const);
  const score = (e: readonly [number, number]) => e[0] * outward + e[1] * 0.3;
  const E = score(elbows[0]) >= score(elbows[1]) ? elbows[0] : elbows[1];
  const H = [S[0] + ux * reach, S[1] + uy * reach];
  const upper = angleOf(E[0] - S[0], E[1] - S[1]);
  const fore = norm(angleOf(H[0] - E[0], H[1] - E[1]) - upper);
  return { upper: r2(upper), fore: r2(fore) };
}

function Arm({ shoulder, target, outward, hand, mirrorHand, ease }: { shoulder: [number, number]; target: [number, number]; outward: -1 | 1; hand: HandShape; mirrorHand: boolean; ease: string }) {
  const { upper, fore } = solveArm(shoulder, target, outward);
  const rot = (a: number): CSSProperties => ({ transform: `rotate(${a}deg)`, transition: ease });
  return (
    <g transform={`translate(${shoulder[0]} ${shoulder[1]})`}>
      <g style={rot(upper)}>
        <line x1={0} y1={0} x2={0} y2={UPPER} stroke={OUTLINE} strokeWidth={10.5} strokeLinecap="round" />
        <line x1={0} y1={0} x2={0} y2={UPPER} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
        {/* short magenta sleeve */}
        <line x1={0} y1={-1} x2={0} y2={13} stroke={BLOUSE} strokeWidth={11} strokeLinecap="round" />
        <rect x={-5} y={17} width={10} height={3.5} rx={1.5} fill={GOLD} stroke={GOLD_DARK} strokeWidth={0.5} />
        <g transform={`translate(0 ${UPPER})`}>
          <g style={rot(fore)}>
            <line x1={0} y1={0} x2={0} y2={FORE} stroke={OUTLINE} strokeWidth={9} strokeLinecap="round" />
            <line x1={0} y1={0} x2={0} y2={FORE} stroke={SKIN} strokeWidth={6.8} strokeLinecap="round" />
            {/* pearl bangles */}
            <rect x={-4.6} y={FORE - 7} width={9.2} height={2.6} rx={1.3} fill={PEARL} stroke="#a8a29e" strokeWidth={0.4} />
            <rect x={-4.6} y={FORE - 4} width={9.2} height={2.2} rx={1.1} fill={PEARL} stroke="#a8a29e" strokeWidth={0.4} />
            {/* the hand continues along the forearm: fingers point away from the elbow */}
            <g transform={`translate(0 ${FORE - 1}) rotate(180) scale(0.2) ${mirrorHand ? "scale(-1 1)" : ""} translate(-60 -136)`}>
              <HandGlyph shape={hand} />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

const leg = (d: string, foot: [number, number], footRot = 0) => (
  <>
    <path d={d} fill="none" stroke="#000" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={SAREE} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    <g transform={`translate(${foot[0]} ${foot[1]}) rotate(${footRot})`}>
      <rect x={-7} y={-11} width={14} height={4} rx={1.5} fill={BORDER} />
      <rect x={-7} y={-8} width={14} height={3.5} rx={1.5} fill={GOLD} />
      {[-5, -1.5, 2, 5.5].map((x) => (
        <circle key={x} cx={x} cy={-2.5} r={1.6} fill="#fde68a" stroke={GOLD_DARK} strokeWidth={0.5} />
      ))}
      <ellipse cx={0} cy={4} rx={9} ry={4.5} fill={SKIN} stroke={OUTLINE} strokeWidth={1} />
      <ellipse cx={0} cy={6} rx={7} ry={2} fill="#d7263d" opacity={0.85} />
    </g>
  </>
);

/** The pleated fan between the knees: black pleats with a magenta border and gold weave lines. */
const fan = (hipY: number, kneeL: [number, number], kneeR: [number, number], dip: number) => {
  const pts = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    return [r2(kneeL[0] + (kneeR[0] - kneeL[0]) * t), r2(kneeL[1] + (kneeR[1] - kneeL[1]) * t + Math.sin(Math.PI * t) * dip)] as const;
  });
  return (
    <>
      <path d={`M100 ${hipY - 4} L${kneeL[0]} ${kneeL[1]} Q100 ${kneeL[1] + dip * 2} ${kneeR[0]} ${kneeR[1]} Z`} fill={SAREE} stroke={GOLD} strokeWidth={1} />
      <path d={`M${kneeL[0]} ${kneeL[1]} Q100 ${kneeL[1] + dip * 2} ${kneeR[0]} ${kneeR[1]}`} fill="none" stroke={BORDER} strokeWidth={7} />
      <path d={`M${kneeL[0]} ${kneeL[1]} Q100 ${kneeL[1] + dip * 2} ${kneeR[0]} ${kneeR[1]}`} fill="none" stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" />
      {pts.map(([x, y], i) => (
        <line key={i} x1={100} y1={hipY - 4} x2={x} y2={y} stroke={i % 2 ? BORDER : "#44403c"} strokeWidth={0.9} />
      ))}
    </>
  );
};

const narrowFan = (top: number, bottom: number, x1 = 92, x2 = 108, tilt = 0) => (
  <>
    <path d={`M94 ${top} L106 ${top} L${x2 + tilt} ${bottom} L${x1 + tilt} ${bottom} Z`} fill={SAREE} stroke={GOLD} strokeWidth={0.8} />
    <rect x={x1 + tilt} y={bottom - 6} width={x2 - x1} height={6} fill={BORDER} />
    {[0.25, 0.5, 0.75].map((t) => (
      <line key={t} x1={94 + 12 * t} y1={top} x2={x1 + tilt + (x2 - x1) * t} y2={bottom - 6} stroke={BORDER} strokeWidth={0.8} />
    ))}
  </>
);

/** Leg drawings per stance, positioned on the floor at y≈236. */
const LEGS: Record<Stance, ReactNode> = {
  samapadam: (
    <>
      {leg("M93 128 L93 182 L93 226", [93, 230])}
      {leg("M107 128 L107 182 L107 226", [107, 230])}
      {narrowFan(128, 180)}
    </>
  ),
  aramandi: (
    <>
      {leg("M92 150 L64 188 L78 226", [78, 230], 25)}
      {leg("M108 150 L136 188 L122 226", [122, 230], -25)}
      {fan(150, [64, 188], [136, 188], 9)}
    </>
  ),
  muzhumandi: (
    <>
      {leg("M92 180 L52 204 L86 228", [86, 232], 30)}
      {leg("M108 180 L148 204 L114 228", [114, 232], -30)}
      {fan(180, [52, 204], [148, 204], 8)}
    </>
  ),
  tribhanga: (
    <>
      {leg("M94 128 L97 180 L99 226", [99, 230])}
      {leg("M106 128 L101 178 L84 222", [84, 226], 20)}
      {narrowFan(128, 172, 91, 105)}
    </>
  ),
  ekapada: (
    <>
      {leg("M94 128 L94 182 L94 226", [94, 230])}
      {leg("M106 128 L142 112 L170 70", [172, 66], -120)}
      {narrowFan(128, 162, 94, 112, 4)}
    </>
  ),
  kick: (
    <>
      {leg("M94 128 L94 182 L94 226", [94, 230])}
      {leg("M106 128 L140 160 L176 168", [180, 168], -95)}
      {narrowFan(128, 166, 92, 112, 3)}
    </>
  ),
  walk: (
    <>
      {leg("M94 128 L90 180 L86 226", [86, 230])}
      {leg("M106 128 L120 174 L117 222", [118, 226], -10)}
      {narrowFan(128, 172, 90, 112)}
    </>
  ),
  alidha: (
    <>
      {leg("M108 142 L138 180 L140 226", [140, 230], -15)}
      {leg("M92 142 L66 186 L42 224", [40, 228], 40)}
      {fan(142, [66, 186], [138, 180], 6)}
    </>
  ),
  kneel: (
    <>
      {leg("M92 192 L86 228", [86, 232])}
      {leg("M108 192 L114 228", [114, 232])}
      {fan(192, [78, 226], [122, 226], 4)}
    </>
  ),
  seated: (
    <>
      <rect x={58} y={160} width={84} height={18} rx={4} fill="#7c2d12" stroke={GOLD} strokeWidth={2} />
      <rect x={62} y={178} width={8} height={56} fill="#451a03" />
      <rect x={130} y={178} width={8} height={56} fill="#451a03" />
      {leg("M92 168 L78 180 L80 226", [80, 230], 10)}
      {leg("M108 168 L122 180 L120 226", [120, 230], -10)}
      {fan(168, [74, 182], [126, 182], 6)}
    </>
  ),
  recline: (
    <>
      {leg("M93 128 L93 182 L93 226", [93, 230])}
      {leg("M107 128 L109 182 L111 226", [111, 230])}
      {narrowFan(128, 180)}
    </>
  ),
};

const GAZE: Record<Gaze, [number, number]> = { front: [0, 0], left: [-1.6, 0], right: [1.6, 0], up: [0, -1.4], down: [0, 1.4] };

function Head({ tilt, gaze, ease }: { tilt: number; gaze: Gaze; ease: string }) {
  const [gx, gy] = GAZE[gaze];
  return (
    <g transform="translate(100 52)">
      <g style={{ transform: `rotate(${tilt}deg)`, transition: ease }}>
        <g transform="translate(-100 -52)">
          {/* hair and the bun behind */}
          <circle cx={100} cy={34} r={17.5} fill="#0c0a09" />
          <ellipse cx={100} cy={20} rx={11} ry={6} fill="#0c0a09" />
          {/* face */}
          <ellipse cx={100} cy={40} rx={13.5} ry={15} fill={SKIN} stroke={OUTLINE} strokeWidth={1} />
          {/* centre parting, hair framing the face */}
          <path d="M86 34 Q87 22 100 21 Q113 22 114 34 Q108 26 100 26 Q92 26 86 34 Z" fill="#0c0a09" />
          {/* nethi chutti: chain along the parting, red-stone pendant on the forehead */}
          <path d="M100 18 L100 27" stroke={GOLD} strokeWidth={1.4} />
          <path d="M100 22 Q93 22 88 27 M100 22 Q107 22 112 27" fill="none" stroke={GOLD} strokeWidth={0.9} />
          <path d="M96 26 L104 26 L102 30 L98 30 Z" fill={GOLD} stroke={GOLD_DARK} strokeWidth={0.5} />
          <circle cx={100} cy={28} r={1.3} fill={STONE} />
          {[97, 100, 103].map((x) => (
            <circle key={x} cx={x} cy={31.4} r={0.7} fill={PEARL} />
          ))}
          {/* bindi */}
          <circle cx={100} cy={34} r={1.3} fill="#7f1d1d" />
          {/* eyes with winged liner */}
          {[94, 106].map((x, i) => {
            const wing = i === 0 ? -1 : 1;
            return (
              <g key={x}>
                <path d={`M${x - 4} 39 Q${x} 35.5 ${x + 4} 39 Q${x} 41.5 ${x - 4} 39 Z`} fill="#fff" stroke="#0c0a09" strokeWidth={1.1} />
                <circle cx={x + gx} cy={39 + gy * 0.6} r={1.5} fill="#0c0a09" />
                <path d={`M${x + 4 * wing} 38.6 L${x + 6.5 * wing} 37.2`} stroke="#0c0a09" strokeWidth={1.1} strokeLinecap="round" />
                <path d={`M${x - 4.5} 35 Q${x} 32.5 ${x + 4.5} 35`} fill="none" stroke="#0c0a09" strokeWidth={1.1} />
              </g>
            );
          })}
          {/* smile */}
          <path d="M96 47.5 Q100 51 104 47.5" fill="none" stroke="#9f1239" strokeWidth={1.7} strokeLinecap="round" />
          {/* jhumkas */}
          {[86.5, 113.5].map((x) => (
            <g key={x}>
              <circle cx={x} cy={42} r={1.6} fill={GOLD} stroke={GOLD_DARK} strokeWidth={0.4} />
              <path d={`M${x - 3.2} 48 Q${x} 42.5 ${x + 3.2} 48 Z`} fill={GOLD} stroke={GOLD_DARK} strokeWidth={0.5} />
              <circle cx={x} cy={46.6} r={0.9} fill={STONE} />
              {[-2.4, 0, 2.4].map((dx) => (
                <circle key={dx} cx={x + dx} cy={49.2} r={0.7} fill={PEARL} />
              ))}
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}

function Torso() {
  return (
    <>
      {/* blouse */}
      <path d="M84 60 L116 60 Q120 62 119 70 L112 106 L88 106 L81 70 Q80 62 84 60 Z" fill={BLOUSE} stroke="#831843" strokeWidth={1} />
      {/* black saree pallu across the body, magenta woven border on its edge */}
      <path d="M108 59 L118 62 L117 72 L96 106 L84 106 Z" fill={SAREE} />
      <path d="M118 62 L94 106" stroke={BORDER} strokeWidth={5} />
      <path d="M118 62 L94 106" stroke={GOLD} strokeWidth={0.6} strokeDasharray="1.5 2" />
      {/* neck, temple choker and pendant necklace */}
      <rect x={95} y={50} width={10} height={11} fill={SKIN} />
      <path d="M93 57 Q100 62 107 57" fill="none" stroke={GOLD} strokeWidth={2.4} />
      {[95, 97.5, 100, 102.5, 105].map((x) => (
        <circle key={x} cx={x} cy={58.5 + (x === 100 ? 1.6 : x === 97.5 || x === 102.5 ? 1.1 : 0)} r={0.8} fill={STONE} />
      ))}
      <path d="M92 59 Q100 71 108 59" fill="none" stroke={GOLD} strokeWidth={1} />
      <path d="M97.4 66 L102.6 66 L100 72 Z" fill={GOLD} stroke={GOLD_DARK} strokeWidth={0.5} />
      <circle cx={100} cy={67.6} r={1.2} fill={STONE} />
    </>
  );
}

function Odiyanam() {
  return (
    <>
      <path d="M86 104 L114 104 L115 111 L85 111 Z" fill={GOLD} stroke={GOLD_DARK} strokeWidth={0.8} />
      {[89, 94.5, 100, 105.5, 111].map((x) => (
        <g key={x}>
          <circle cx={x} cy={107.5} r={x === 100 ? 3.2 : 2.2} fill={x === 100 ? "#f59e0b" : GOLD} stroke={GOLD_DARK} strokeWidth={0.5} />
          <circle cx={x} cy={107.5} r={x === 100 ? 1.3 : 0.9} fill={STONE} />
        </g>
      ))}
      {[87, 90, 93, 96, 99, 102, 105, 108, 111, 114].map((x) => (
        <circle key={x} cx={x} cy={112.6} r={0.8} fill={PEARL} />
      ))}
    </>
  );
}

/** Amruthavarshini as a Bharatanatyam dancer, moving smoothly between poses. */
export function Dancer({ pose, left, right, className, danceStyle = "vazhuvoor" }: { pose: Pose; left?: HandShape; right?: HandShape; className?: string; danceStyle?: DanceStyle }) {
  const drop = DROP[pose.stance];
  const reclining = pose.stance === "recline";
  const vazhuvoor = danceStyle === "vazhuvoor";
  // Vazhuvoor movement is fluid and lingering; the plain style is crisper.
  const ease = vazhuvoor
    ? "transform 1100ms cubic-bezier(.45,.05,.25,1), opacity 700ms ease"
    : "transform 600ms cubic-bezier(.4,.1,.2,1), opacity 400ms ease";
  const sway = vazhuvoor ? SWAY[pose.stance] : 0;
  const layer = (show: boolean): CSSProperties => ({ opacity: show ? 1 : 0, transition: ease });

  return (
    <svg viewBox="0 -14 200 262" className={className} role="img" aria-label="அம்ருதவர்ஷினி — நடன நிலை">
      <ellipse cx={100} cy={238} rx={70} ry={6} fill="#7f1d1d" opacity={reclining ? 0 : 0.12} style={{ transition: ease }} />
      {/* Adisesha, shown when the Lord reclines */}
      <g style={layer(reclining)}>
        <path d="M18 196 Q100 230 182 196 Q100 214 18 196 Z" fill="#0e7490" opacity={0.85} />
        <path d="M14 200 Q100 244 186 200" fill="none" stroke="#155e75" strokeWidth={10} strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={20 + i * 7} cy={160 - Math.abs(i - 2) * 6} rx={6} ry={12} fill="#0e7490" stroke="#164e63" strokeWidth={1} />
        ))}
      </g>

      <g transform="translate(100 140)">
        <g style={{ transform: reclining ? "translate(0px, 44px) rotate(-90deg) scale(0.78)" : "none", transition: ease }}>
          <g transform="translate(-100 -140)">
            {(Object.keys(LEGS) as Stance[]).map((s) => (
              <g key={s} style={layer(s === pose.stance)}>
                {LEGS[s]}
              </g>
            ))}
            <g style={{ transform: `translateY(${drop}px)`, transition: ease }}>
              <path d="M87 108 L113 108 L119 130 L81 130 Z" fill={SAREE} stroke="#000" strokeWidth={1} />
              <path d="M84 126 L116 126" stroke={BORDER} strokeWidth={4} />
              <g transform={`translate(${WAIST[0]} ${WAIST[1]})`}>
                <g style={{ transform: `rotate(${sway}deg)`, transition: ease }}>
                  <g transform={`translate(${-WAIST[0]} ${-WAIST[1]})`}>
                    <Torso />
                    <Odiyanam />
                    <Head tilt={(pose.head ?? 0) - sway * 0.6} gaze={pose.gaze ?? "front"} ease={ease} />
                    <Arm shoulder={SHOULDER_L} target={pose.L} outward={-1} hand={left ?? SHAPES.ardhachandra} mirrorHand={false} ease={ease} />
                    <Arm shoulder={SHOULDER_R} target={pose.R} outward={1} hand={right ?? SHAPES.ardhachandra} mirrorHand ease={ease} />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
