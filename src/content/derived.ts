import { AZHWARS } from "./azhwars";
import { AYIRAMS, PRABANDHAMS, type Ayiram } from "./prabandhams";

/** Colors validated with the dataviz palette checker (light surface #fffdf7). */
export const AYIRAM_COLORS: Record<Ayiram, string> = { 1: "#dc2626", 2: "#0284c7", 3: "#d97706", 4: "#7c3aed" };

export const azhwarVerseCount = (slug: string) =>
  PRABANDHAMS.filter((p) => p.azhwar === slug).reduce((s, p) => s + p.count, 0);

export const azhwarCounts = () =>
  AZHWARS.map((a) => ({ azhwar: a, count: azhwarVerseCount(a.slug) })).sort((x, y) => y.count - x.count);

export const ayiramCounts = () =>
  ([1, 2, 3, 4] as Ayiram[]).map((k) => ({
    ayiram: k,
    ...AYIRAMS[k],
    count: PRABANDHAMS.filter((p) => p.ayiram === k && p.start <= 4000).reduce((s, p) => s + p.count, 0),
  }));

/** Same verse for everyone on a given day; cycles through all 4000. */
export function pasuramOfTheDay(date = new Date()) {
  const start = Date.UTC(2024, 0, 1);
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86_400_000);
  return (((day * 397) % 4000) + 4000) % 4000 + 1;
}

const NAME_FORMS: Record<string, string> = {
  நாராயண: "நாராயணன்", கேசவ: "கேசவன்", மாதவ: "மாதவன்", கோவிந்த: "கோவிந்தன்", மதுசூத: "மதுசூதனன்", திரிவிக்கிரம: "திரிவிக்கிரமன்",
  வாமன: "வாமனன்", சிரீதர: "சிரீதரன்", இருடீகேச: "இருடீகேசன்", பற்பநாப: "பற்பநாபன்", தாமோதர: "தாமோதரன்",
};

/** Lexicon stems (e.g. "கேசவ") to their full name ("கேசவன்"). */
export const nameForm = (stem: string) => NAME_FORMS[stem] ?? stem;
