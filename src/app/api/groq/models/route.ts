import Groq from "groq-sdk";

export const runtime = "nodejs";

// Speech, TTS and moderation models can't write commentary; keep them out of the picker.
const NOT_CHAT = /whisper|tts|playai|orpheus|guard|safeguard|distil/i;

/** Verifies a BYOK Groq key and lists the chat models it can use. The key is not stored. */
export async function GET(req: Request) {
  const apiKey = req.headers.get("x-groq-api-key")?.trim() || process.env.GROQ_API_KEY;
  if (!apiKey) return Response.json({ ok: false, error: "Groq API key இல்லை" }, { status: 400 });
  try {
    const list = await new Groq({ apiKey, maxRetries: 1, timeout: 15_000 }).models.list();
    const models = list.data
      .filter((m) => (m as { active?: boolean }).active !== false && !NOT_CHAT.test(m.id))
      .map((m) => m.id)
      .sort();
    return Response.json({ ok: true, models, serverKey: !req.headers.get("x-groq-api-key") }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Groq.AuthenticationError) return Response.json({ ok: false, error: "API key தவறானது" }, { status: 401 });
    if (error instanceof Groq.APIError) return Response.json({ ok: false, error: `Groq ${error.status}: ${error.message}` }, { status: 502 });
    return Response.json({ ok: false, error: "Groq-ஐ அணுக முடியவில்லை" }, { status: 502 });
  }
}
