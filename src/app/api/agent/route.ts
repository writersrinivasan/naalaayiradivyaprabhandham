import fs from "node:fs";
import path from "node:path";
import { DEFAULT_MODEL, pasuramGraph, STEP_LABELS } from "@/lib/agent/graph";
import type { Infographic } from "@/lib/agent/schema";

export const runtime = "nodejs";
export const maxDuration = 300;

// Generated insights are cached on disk (best effort; read-only hosts fall back to memory).
const CACHE_DIR = path.join(process.cwd(), "data", "ai-cache");
const memory = new Map<number, Infographic>();

function readCached(n: number): Infographic | null {
  if (memory.has(n)) return memory.get(n)!;
  try {
    const hit = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, `${n}.json`), "utf8")) as Infographic;
    memory.set(n, hit);
    return hit;
  } catch {
    return null;
  }
}

function writeCached(info: Infographic) {
  if (!info.insight) return;
  memory.set(info.n, info);
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(path.join(CACHE_DIR, `${info.n}.json`), JSON.stringify(info));
  } catch {
    // read-only filesystem
  }
}

/**
 * Streams NDJSON: {type:"step"} per graph node, then {type:"result"} or {type:"error"}.
 * BYOK: the visitor's Groq key arrives in the x-groq-api-key header and is used for this request only.
 */
export async function POST(req: Request) {
  const { n, refresh, model } = (await req.json()) as { n: number; refresh?: boolean; model?: string };
  if (!Number.isInteger(n) || n < 1 || n > 4108) {
    return Response.json({ error: "invalid pasuram number" }, { status: 400 });
  }
  const groqApiKey = req.headers.get("x-groq-api-key")?.trim() || process.env.GROQ_API_KEY || undefined;
  const groqModel = model && /^[\w./:-]{1,100}$/.test(model) ? model : process.env.GROQ_MODEL || DEFAULT_MODEL;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      try {
        // Without a key there is nothing new to generate, so a cached insight is always welcome.
        const cached = (!refresh || !groqApiKey) && readCached(n);
        if (cached) {
          send({ type: "step", node: "cache", label: "முன்பே உருவாக்கிய விளக்கம் கிடைத்தது" });
          send({ type: "result", infographic: cached });
          return;
        }
        let result: Infographic | undefined;
        for await (const update of await pasuramGraph.stream({ n }, { streamMode: "updates", configurable: { groqApiKey, groqModel } })) {
          for (const [node, value] of Object.entries(update)) {
            send({ type: "step", node, label: STEP_LABELS[node] ?? node });
            const info = (value as { infographic?: Infographic } | undefined)?.infographic;
            if (info) result = info;
          }
        }
        if (result) {
          writeCached(result);
          send({ type: "result", infographic: result });
        }
      } catch (error) {
        send({ type: "error", message: error instanceof Error ? error.message : String(error) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" } });
}
