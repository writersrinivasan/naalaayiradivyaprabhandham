import "server-only";
import fs from "node:fs";
import path from "node:path";
import { PRABANDHAMS, prabandhamForNumber } from "@/content/prabandhams";

export interface Pasuram {
  n: number;
  ref: string;
  ta: string[];
  en: string[];
  gloss: [word: string, meaning: string, grammar: string][];
  pann?: string;
  places: string[];
  stories: string[];
  symbols: string[];
  names: Record<string, number>;
}

/** [n, prabandham slug, local ref, first line, has English translation] */
export type IndexRow = [number, string, string, string, boolean];

type Ranked = [string, number][];
export interface Stats {
  stories: Ranked;
  symbols: Ranked;
  places: Ranked;
  names: Ranked;
  pann: Ranked;
  byPrabandham: Record<string, { count: number; withTranslation: number; stories: Ranked; places: Ranked }>;
}

const DATA_DIR = path.join(process.cwd(), "data");
const cache = new Map<string, unknown>();

function readJson<T>(rel: string): T {
  if (!cache.has(rel)) {
    cache.set(rel, JSON.parse(fs.readFileSync(path.join(DATA_DIR, rel), "utf8")));
  }
  return cache.get(rel) as T;
}

export const getPrabandhamVerses = (slug: string) => readJson<Pasuram[]>(`pasurams/${slug}.json`);

export const getIndex = () => readJson<IndexRow[]>("index.json");

export const getStats = () => readJson<Stats>("stats.json");

export function getPasuram(n: number) {
  const p = prabandhamForNumber(n);
  if (!p) return null;
  const verses = getPrabandhamVerses(p.slug);
  const i = n - p.start;
  return { pasuram: verses[i], prabandham: p, prev: verses[i - 1] ?? null, next: verses[i + 1] ?? null };
}

/** Groups verses of a prabandham by their pathigam (all but the last part of the ref). */
export function groupByPathigam(verses: Pasuram[]) {
  const groups = new Map<string, Pasuram[]>();
  for (const v of verses) {
    const parts = v.ref.split(".");
    const key = parts.length > 1 ? parts.slice(0, -1).join(".") : "";
    groups.set(key, [...(groups.get(key) ?? []), v]);
  }
  return [...groups.entries()];
}

export function search(query: string, limit = 60) {
  const q = query.trim().replace(/\s+/g, "");
  if (!q) return [];
  const asNumber = Number(q);
  const rows = getIndex();
  if (Number.isInteger(asNumber) && asNumber > 0) return rows.filter((r) => r[0] === asNumber);
  const out: IndexRow[] = [];
  for (const p of PRABANDHAMS) {
    for (const v of getPrabandhamVerses(p.slug)) {
      if (v.ta.join("").replace(/\s+/g, "").includes(q) || v.en.join(" ").toLowerCase().includes(query.toLowerCase())) {
        out.push([v.n, p.slug, v.ref, v.ta[0] ?? "", v.en.length > 0]);
        if (out.length >= limit) return out;
      }
    }
  }
  return out;
}
