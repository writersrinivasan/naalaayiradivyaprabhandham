import { prabandhamBySlug } from "@/content/prabandhams";
import { search } from "@/lib/data";

export const runtime = "nodejs";

export function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const results = search(q).map(([n, slug, ref, first, hasEn]) => ({ n, ref, first, hasEn, prabandham: prabandhamBySlug(slug)?.name ?? slug }));
  return Response.json({ results });
}
