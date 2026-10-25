import { EmblemTriad } from "@/components/Emblem";
import { PrintButton } from "@/components/Reader";
import { VerseBlock } from "@/components/VerseBlock";
import { azhwarBySlug } from "@/content/azhwars";
import { AYIRAM_COLORS } from "@/content/derived";
import { AYIRAMS, PRABANDHAMS } from "@/content/prabandhams";
import { getPrabandhamVerses } from "@/lib/data";

export const metadata = { title: "முழு நூல் | நாலாயிர திவ்ய பிரபந்தம்", robots: { index: false } };

/** The whole collection on one page, Tamil only — the source for the complete PDF. */
export default function WholeBook() {
  let lastAyiram = 0;
  return (
    <div className="mx-auto max-w-3xl px-4 pb-10">
      <section className="flex min-h-[240mm] flex-col items-center justify-center py-16 text-center">
        <EmblemTriad />
        <h1 className="font-display mt-10 text-5xl font-bold text-maroon print:text-[38pt]">நாலாயிர திவ்ய பிரபந்தம்</h1>
        <p className="mt-4 text-lg text-muted">பன்னிரு ஆழ்வார்கள் அருளிய 4000 பாசுரங்கள் · இராமானுச நூற்றந்தாதியுடன்</p>
        <div className="mt-6 print:hidden">
          <PrintButton />
        </div>
        <p className="mt-16 max-w-md text-xs text-muted">
          மூலப் பாடம்: University of Hamburg TAMILEX பதிப்பு (தமிழ் எழுத்துக்கு மாற்றப்பட்டது); திருவாய்மொழி 6–10, இராமானுச நூற்றந்தாதி: NDP_Pann_Prediction தரவு.
        </p>
      </section>

      <section className="print-break">
        <h2 className="font-display text-2xl text-maroon">பொருளடக்கம்</h2>
        <ol className="mt-4 space-y-1 text-[0.95rem]">
          {PRABANDHAMS.map((p) => (
            <li key={p.slug} className="flex justify-between border-b border-dotted border-line">
              <a href={`#w-${p.slug}`}>
                {p.name} <span className="text-muted">— {azhwarBySlug(p.azhwar)!.name}</span>
              </a>
              <span className="font-num text-muted">{p.start > 4000 ? "இணைப்பு" : p.count === 1 ? `${p.start}` : `${p.start}–${p.start + p.count - 1}`}</span>
            </li>
          ))}
        </ol>
      </section>

      {PRABANDHAMS.map((p) => {
        const az = azhwarBySlug(p.azhwar)!;
        const color = AYIRAM_COLORS[p.ayiram];
        const newAyiram = p.ayiram !== lastAyiram;
        lastAyiram = p.ayiram;
        return (
          <section key={p.slug} id={`w-${p.slug}`} className="print-break pt-10">
            {newAyiram && (
              <p className="font-display mb-2 text-sm uppercase tracking-wide" style={{ color }}>
                {AYIRAMS[p.ayiram].name}
              </p>
            )}
            <h2 className="font-display text-3xl font-bold" style={{ color }}>
              {p.name}
            </h2>
            <p className="font-semibold" style={{ color: az.color }}>
              {az.name}
            </p>
            {getPrabandhamVerses(p.slug).map((v) => (
              <VerseBlock key={v.n} v={v} color={color} showEnglish={false} />
            ))}
          </section>
        );
      })}
    </div>
  );
}
