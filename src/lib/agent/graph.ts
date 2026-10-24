import "server-only";
import Groq from "groq-sdk";
import { z } from "zod";
import { Annotation, END, START, StateGraph, type LangGraphRunnableConfig } from "@langchain/langgraph";
import { azhwarBySlug } from "@/content/azhwars";
import { getPasuram, type Pasuram } from "@/lib/data";
import { InsightSchema, type Infographic, type Insight, type Lexicon } from "./schema";

export const DEFAULT_MODEL = "openai/gpt-oss-120b";
/** Groq models that enforce a JSON schema (strict structured outputs); others fall back to JSON object mode. */
const STRICT_MODELS = new Set(["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b", "meta-models/muse-spark-open"]);
const MAX_ATTEMPTS = 2;

/** BYOK: the key rides in the run config, never in graph state, so it is not streamed back to the browser. */
type Config = LangGraphRunnableConfig<{ groqApiKey?: string; groqModel?: string }>;
const keyOf = (config?: Config) => config?.configurable?.groqApiKey;
const modelOf = (config?: Config) => config?.configurable?.groqModel || DEFAULT_MODEL;

// Groq expects a bare schema object, so drop the "$schema" dialect marker zod adds.
const INSIGHT_JSON_SCHEMA: Record<string, unknown> = { ...(z.toJSONSchema(InsightSchema) as Record<string, unknown>) };
delete INSIGHT_JSON_SCHEMA.$schema;

export const STEP_LABELS: Record<string, string> = {
  retrieve: "பாசுரம், பதிகச் சூழல், ஆழ்வார் விவரங்களைத் திரட்டுகிறது",
  analyze: "சொல் அகராதி, திவ்ய தேசம், அவதாரக் குறிப்புகளை ஆய்கிறது",
  interpret: "Groq மாதிரி பொழிப்புரை, விளக்கம், உணர்வுகளை எழுதுகிறது",
  review: "தமிழ் வெளியீட்டின் தரத்தைச் சரிபார்க்கிறது",
  compose: "தகவல் வரைபடத்தை (infographic) உருவாக்குகிறது",
};

const State = Annotation.Root({
  n: Annotation<number>,
  pasuram: Annotation<Pasuram | null>,
  context: Annotation<{ prev: Pasuram | null; next: Pasuram | null; prabandham: string; prabandhamSlug: string; azhwar: string; azhwarSlug: string; color: string }>,
  lexicon: Annotation<Lexicon>,
  insight: Annotation<Insight | null>,
  attempts: Annotation<number>,
  issues: Annotation<string[]>,
  infographic: Annotation<Infographic>,
});

type S = typeof State.State;

/** Node 1: pull the verse and its neighbours from the local dataset. */
function retrieve(state: S): Partial<S> {
  const found = getPasuram(state.n);
  if (!found) throw new Error(`Pasuram ${state.n} not found`);
  const azhwar = azhwarBySlug(found.prabandham.azhwar)!;
  return {
    pasuram: found.pasuram,
    attempts: 0,
    issues: [],
    context: {
      prev: found.prev,
      next: found.next,
      prabandham: found.prabandham.name,
      prabandhamSlug: found.prabandham.slug,
      azhwar: azhwar.name,
      azhwarSlug: azhwar.slug,
      color: azhwar.color,
    },
  };
}

/** Node 2: deterministic analysis — no model call. */
function analyze(state: S): Partial<S> {
  const p = state.pasuram!;
  const grammar = new Map<string, number>();
  for (const [, , g] of p.gloss) {
    const role = g.split(",")[0]?.trim();
    if (role) grammar.set(role, (grammar.get(role) ?? 0) + 1);
  }
  return {
    lexicon: {
      lineCount: p.ta.length,
      wordCount: p.ta.join(" ").split(/\s+/).filter(Boolean).length,
      glossCount: p.gloss.length,
      grammar: [...grammar.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8),
      properNames: [...new Set(p.gloss.filter(([, , g]) => g.includes("proper name")).map(([w, d]) => `${w} (${d})`))],
      places: p.places,
      stories: p.stories,
      symbols: p.symbols,
      names: Object.entries(p.names),
      pann: p.pann,
    },
  };
}

const SYSTEM = `நீங்கள் நாலாயிர திவ்ய பிரபந்தத்தில் ஆழ்ந்த புலமை கொண்ட ஸ்ரீவைஷ்ணவ உரையாசிரியர். பெரியவாச்சான் பிள்ளை, நம்பிள்ளை போன்றோரின் வியாக்கியான மரபை அறிந்தவர்.
ஒரு பாசுரத்தைப் படிக்கும் சாதாரண வாசகருக்கும் புரியும்படி, இனிய எளிய தமிழில் பொருள் சொல்லுங்கள்.
- கொடுக்கப்பட்ட மூலப் பாடம், ஆங்கில மொழிபெயர்ப்பு, சொல் அகராதி ஆகியவற்றையே அடிப்படையாகக் கொள்ளுங்கள்.
- பாசுரத்தில் இல்லாத இடங்களையோ பாத்திரங்களையோ சேர்க்காதீர்கள். மரபுக் கதை என்றால் "மரபு" என்று குறிப்பிடுங்கள்; உறுதியில்லையெனில் அதைச் சொல்லுங்கள்.
- englishSummary தவிர அனைத்துப் புலங்களும் தமிழில் இருக்க வேண்டும்.`;

function verseBlock(p: Pasuram) {
  return [
    `மூலம்:\n${p.ta.join("\n")}`,
    p.en.length ? `English translation (Univ. of Hamburg edition):\n${p.en.join("\n")}` : "",
    p.gloss.length ? `Word glossary:\n${p.gloss.map(([w, d, g]) => `${w} = ${d}${g ? ` [${g}]` : ""}`).join("\n")}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

/** Node 3: the Groq model writes the Tamil commentary as JSON validated against InsightSchema. */
async function interpret(state: S, config: Config): Promise<Partial<S>> {
  const p = state.pasuram!;
  const c = state.context;
  const neighbours = [c.prev && `முந்தைய பாசுரம் (${c.prev.ref}):\n${c.prev.ta.join("\n")}`, c.next && `அடுத்த பாசுரம் (${c.next.ref}):\n${c.next.ta.join("\n")}`]
    .filter(Boolean)
    .join("\n\n");
  const retry = state.issues.length ? `\n\nமுந்தைய முயற்சியில் இருந்த குறைகள் — இவற்றைச் சரிசெய்யுங்கள்:\n- ${state.issues.join("\n- ")}` : "";
  const prompt = `பிரபந்தம்: ${c.prabandham} — பாசுரம் ${p.ref} (நாலாயிர எண் ${p.n})\nஆழ்வார்: ${c.azhwar}${p.pann ? `\nபண்: ${p.pann}` : ""}\n\n${verseBlock(p)}\n\nபதிகச் சூழலுக்காக:\n${neighbours || "—"}${retry}`;
  const attempts = state.attempts + 1;

  let completion;
  try {
    completion = await requestInsight(keyOf(config)!, modelOf(config), prompt);
  } catch (error) {
    // The SDK already retried 429/5xx; anything left is not worth another loop.
    if (error instanceof Groq.AuthenticationError) return { insight: null, attempts: MAX_ATTEMPTS, issues: ["Groq API key தவறானது (401)"] };
    if (error instanceof Groq.PermissionDeniedError) return { insight: null, attempts: MAX_ATTEMPTS, issues: ["இந்த மாதிரியைப் பயன்படுத்த அனுமதி இல்லை (403)"] };
    if (error instanceof Groq.RateLimitError) return { insight: null, attempts: MAX_ATTEMPTS, issues: ["Groq வரம்பு எட்டப்பட்டது (429) — சிறிது நேரம் கழித்து முயலவும்"] };
    if (error instanceof Groq.BadRequestError) return { insight: null, attempts, issues: [`model output rejected (400): ${error.message}`] };
    if (error instanceof Groq.APIError) return { insight: null, attempts: MAX_ATTEMPTS, issues: [`Groq API error ${error.status}: ${error.message}`] };
    throw error;
  }

  const choice = completion.choices[0];
  if (choice?.finish_reason === "length") return { insight: null, attempts, issues: ["output was cut off — keep every field shorter"] };
  let json: unknown;
  try {
    json = JSON.parse(choice?.message?.content ?? "");
  } catch {
    return { insight: null, attempts, issues: ["response was not valid JSON"] };
  }
  const parsed = InsightSchema.safeParse(json);
  if (!parsed.success) {
    return { insight: null, attempts, issues: parsed.error.issues.slice(0, 5).map((i) => `${i.path.join(".")}: ${i.message}`) };
  }
  return { insight: parsed.data, attempts, issues: [] };
}

function requestInsight(apiKey: string, model: string, prompt: string) {
  const strict = STRICT_MODELS.has(model);
  const system = strict
    ? SYSTEM
    : `${SYSTEM}\n\nபதிலை இந்த JSON Schema-க்கு இணங்கும் ஒரே JSON பொருளாக மட்டும் தாருங்கள்:\n${JSON.stringify(INSIGHT_JSON_SCHEMA)}`;
  return new Groq({ apiKey, maxRetries: 2, timeout: 120_000 }).chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
    response_format: strict
      ? { type: "json_schema", json_schema: { name: "pasuram_insight", strict: true, schema: INSIGHT_JSON_SCHEMA } }
      : { type: "json_object" },
    max_completion_tokens: 12000,
    ...(model.startsWith("openai/gpt-oss") ? { reasoning_effort: "medium" as const } : {}),
  });
}

const tamilRatio = (s: string) => {
  const letters = s.replace(/[\s\d\p{P}]/gu, "");
  return letters ? (letters.match(/[஀-௿]/g)?.length ?? 0) / letters.length : 0;
};

/** Node 4: deterministic quality gate; sends the work back to interpret when it falls short. */
function review(state: S): Partial<S> {
  const i = state.insight;
  if (!i) return { issues: state.issues.length ? state.issues : ["structured output could not be parsed"] };
  const issues: string[] = [];
  if (tamilRatio(i.porul) < 0.6) issues.push("பொழிப்புரை தமிழில் இல்லை");
  if (tamilRatio(i.vilakkam) < 0.6) issues.push("விளக்கவுரை தமிழில் இல்லை");
  if (i.porul.length < 80) issues.push("பொழிப்புரை மிகச் சுருக்கமாக உள்ளது");
  if (i.padhavurai.length < 4) issues.push("பதவுரையில் குறைந்தது 4 சொற்கள் தேவை");
  if (i.rasas.length < 2) issues.push("உணர்வுகள் பட்டியலில் குறைந்தது 2 உருப்படிகள் தேவை");
  if (i.quiz.options.length !== 4 || i.quiz.answer < 0 || i.quiz.answer > 3) issues.push("வினாடி வினாவுக்குச் சரியாக 4 விடைகளும் 0–3 இடையிலான answer-உம் தேவை");
  return { issues };
}

/** Node 5: merge the deterministic and model outputs into one infographic payload. */
function compose(state: S, config: Config): Partial<S> {
  const p = state.pasuram!;
  const c = state.context;
  const clamp = (x: number) => Math.max(0, Math.min(100, Math.round(x)));
  const insight = state.insight && {
    ...state.insight,
    rasas: state.insight.rasas.map((r) => ({ ...r, score: clamp(r.score) })),
    themes: state.insight.themes.map((t) => ({ ...t, weight: clamp(t.weight) })),
  };
  return {
    infographic: {
      n: p.n,
      ref: p.ref,
      prabandham: { slug: c.prabandhamSlug, name: c.prabandham },
      azhwar: { slug: c.azhwarSlug, name: c.azhwar, color: c.color },
      lexicon: state.lexicon,
      insight: insight || null,
      aiEnabled: Boolean(keyOf(config)),
      model: insight ? `Groq · ${modelOf(config)}` : undefined,
      notice: insight ? undefined : state.issues.join("; ") || undefined,
      generatedAt: new Date().toISOString(),
    },
  };
}

export const pasuramGraph = new StateGraph(State)
  .addNode("retrieve", retrieve)
  .addNode("analyze", analyze)
  .addNode("interpret", interpret)
  .addNode("review", review)
  .addNode("compose", compose)
  .addEdge(START, "retrieve")
  .addEdge("retrieve", "analyze")
  .addConditionalEdges("analyze", (_s: S, config: Config) => (keyOf(config) ? "interpret" : "compose"), ["interpret", "compose"])
  .addEdge("interpret", "review")
  .addConditionalEdges("review", (s: S) => (s.issues.length && s.attempts < MAX_ATTEMPTS ? "interpret" : "compose"), ["interpret", "compose"])
  .addEdge("compose", END)
  .compile();
