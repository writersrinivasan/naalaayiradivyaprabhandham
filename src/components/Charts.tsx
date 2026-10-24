"use client";

import Link from "next/link";
import { useState } from "react";

export interface BarDatum {
  label: string;
  value: number;
  href?: string;
  dot?: string;
  note?: string;
}

const fmt = (n: number) => n.toLocaleString("ta-IN");

/** Horizontal bars: magnitude in one hue; an optional dot carries identity. */
export function BarList({ data, hue = "#ea580c", unit = "பாசுரங்கள்", max }: { data: BarDatum[]; hue?: string; unit?: string; max?: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="space-y-1.5" onMouseLeave={() => setHover(null)}>
      {data.map((d, i) => {
        const row = (
          <div
            className={`relative grid grid-cols-[minmax(7rem,11rem)_1fr_auto] items-center gap-3 rounded-lg px-2 py-1.5 transition-colors ${hover === i ? "bg-orange-50" : ""}`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
          >
            <span className="flex min-w-0 items-center gap-2 text-sm text-ink">
              {d.dot && <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.dot }} />}
              <span className="truncate">{d.label}</span>
            </span>
            <span className="h-3 rounded-full bg-orange-100/70">
              <span className="block h-3 rounded-full" style={{ width: `${Math.max(2, (d.value / top) * 100)}%`, background: hue }} />
            </span>
            <span className="font-num w-14 text-right text-sm tabular-nums text-muted">{fmt(d.value)}</span>
            {hover === i && (
              <span className="pointer-events-none absolute -top-9 left-1/3 z-10 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-xs text-white shadow-lg">
                {d.label}: {fmt(d.value)} {unit}
                {d.note ? ` · ${d.note}` : ""}
              </span>
            )}
          </div>
        );
        return <li key={d.label}>{d.href ? <Link href={d.href}>{row}</Link> : row}</li>;
      })}
    </ul>
  );
}

/** Donut for ≤ 4 categories, colors validated for CVD separation; 2px surface gap between segments. */
export function Donut({ data, center, sub }: { data: { label: string; value: number; color: string }[]; center: string; sub: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 70;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
      <svg viewBox="0 0 180 180" className="h-52 w-52 shrink-0" role="img" aria-label={`${center} ${sub}`}>
        <g transform="rotate(-90 90 90)">
          {data.map((d, i) => {
            const len = (d.value / total) * c;
            const seg = (
              <circle
                key={d.label}
                cx="90"
                cy="90"
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={hover === i ? 26 : 22}
                strokeDasharray={`${Math.max(0, len - 2)} ${c}`}
                strokeDashoffset={-offset}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer transition-all"
              />
            );
            offset += len;
            return seg;
          })}
        </g>
        <text x="90" y="86" textAnchor="middle" className="font-num fill-ink" fontSize="26" fontWeight="700">
          {hover === null ? center : fmt(data[hover].value)}
        </text>
        <text x="90" y="108" textAnchor="middle" className="fill-muted" fontSize="11">
          {hover === null ? sub : data[hover].label}
        </text>
      </svg>
      <ul className="space-y-2 text-sm">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <span className="h-3 w-3 rounded-sm" style={{ background: d.color }} />
            <span className="text-ink">{d.label}</span>
            <span className="font-num text-muted">
              {fmt(d.value)} · {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 0–100 score meter (emotion / theme strength). */
export function Meter({ label, score, hue = "#ea580c" }: { label: string; score: number; hue?: string }) {
  return (
    <div className="group" title={`${label}: ${score}/100`}>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-ink">{label}</span>
        <span className="font-num text-muted">{score}</span>
      </div>
      <div className="h-2.5 rounded-full bg-orange-100">
        <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${score}%`, background: hue }} />
      </div>
    </div>
  );
}

export function StatTile({ value, label, accent = "text-maroon", icon }: { value: string | number; label: string; accent?: string; icon?: string }) {
  return (
    <div className="card flex flex-col items-center px-4 py-5 text-center">
      {icon && <span className="mb-1 text-2xl">{icon}</span>}
      <span className={`font-num text-3xl font-bold sm:text-4xl ${accent}`}>{typeof value === "number" ? fmt(value) : value}</span>
      <span className="mt-1 text-sm text-muted">{label}</span>
    </div>
  );
}

export function DataTable({ rows, headers }: { rows: (string | number)[][]; headers: string[] }) {
  return (
    <details className="mt-4 text-sm">
      <summary className="cursor-pointer text-peacock">அட்டவணையாகக் காண்க</summary>
      <table className="mt-2 w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="border-b border-line py-1 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="border-b border-line/60 py-1">
                  {typeof c === "number" ? fmt(c) : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
