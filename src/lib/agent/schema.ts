import { z } from "zod";

/** What the interpret node asks the Groq model for. Everything user-facing is in Tamil. */
export const InsightSchema = z.object({
  porul: z.string().describe("பொழிப்புரை: பாசுரத்தின் எளிய தமிழ்ப் பொருள், 3–5 வாக்கியங்கள்"),
  vilakkam: z.string().describe("விளக்கவுரை: ஆழ்ந்த பொருள், வியாக்கியான மரபின் நுட்பங்கள், 2–3 பத்திகள்"),
  padhavurai: z
    .array(z.object({ word: z.string(), meaning: z.string() }))
    .describe("பதவுரை: முக்கியச் சொற்களும் அவற்றின் தமிழ்ப் பொருளும், 6–16 சொற்கள்"),
  context: z.string().describe("கதைச் சூழல்: பாசுரம் குறிப்பிடும் புராண / இதிகாச நிகழ்வு அல்லது பதிகப் பின்னணி"),
  bhavam: z.string().describe("ஆழ்வாரின் பாவம், எ.கா. நாயகி பாவம், யசோதை பாவம், தாஸ்ய பாவம், சரணாகதி"),
  speaker: z.string().describe("பாசுரத்தில் பேசுபவர் யார், யாரிடம் பேசுகிறார்"),
  rasas: z
    .array(z.object({ name: z.string(), score: z.number() }))
    .describe("உணர்வுகள் (பக்தி, காதல், பிரிவுத் துயர், வியப்பு, மகிழ்ச்சி, சரணாகதி போன்றவை) 0–100 மதிப்பெண், 3–6 உருப்படிகள்"),
  themes: z.array(z.object({ name: z.string(), weight: z.number() })).describe("கருப்பொருள்கள், 0–100 எடை, 3–6"),
  characters: z.array(z.object({ name: z.string(), role: z.string() })).describe("பாசுரத்தில் வரும் பாத்திரங்கள் / தெய்வ வடிவங்கள்"),
  places: z.array(z.object({ name: z.string(), note: z.string() })).describe("குறிப்பிடப்படும் திவ்ய தேசங்கள் / இடங்கள் (இல்லையெனில் வெற்றுப் பட்டியல்)"),
  symbols: z.array(z.string()).describe("சங்கு, சக்கரம், கருடன், துளசி போன்ற குறியீடுகள் (இருந்தால் மட்டும்)"),
  lesson: z.string().describe("இன்றைய வாழ்வுக்கான ஒரு சிந்தனை, 1–2 வாக்கியங்கள்"),
  quiz: z.object({
    question: z.string(),
    options: z.array(z.string()).describe("சரியாக 4 விடைகள்"),
    answer: z.number().describe("சரியான விடையின் இடம், 0 முதல் 3"),
  }),
  englishSummary: z.string().describe("A 2-sentence English summary for non-Tamil readers"),
});

export type Insight = z.infer<typeof InsightSchema>;

export interface Lexicon {
  lineCount: number;
  wordCount: number;
  glossCount: number;
  grammar: [string, number][];
  properNames: string[];
  places: string[];
  stories: string[];
  symbols: string[];
  names: [string, number][];
  pann?: string;
}

export interface Infographic {
  n: number;
  ref: string;
  prabandham: { slug: string; name: string };
  azhwar: { slug: string; name: string; color: string };
  lexicon: Lexicon;
  insight: Insight | null;
  aiEnabled: boolean;
  model?: string;
  notice?: string;
  generatedAt: string;
}
