import Link from "next/link";
import { ContinueReading } from "@/components/Reader";
import { azhwarBySlug } from "@/content/azhwars";
import { AYIRAM_COLORS } from "@/content/derived";
import { AYIRAMS, PRABANDHAMS, type Ayiram } from "@/content/prabandhams";
import { pdfFor } from "@/lib/data";

export const metadata = { title: "படிக்க | நாலாயிர திவ்ய பிரபந்தம்" };
export const dynamic = "force-dynamic";

export default function ReadIndex() {
  const book = pdfFor("naalayira-divya-prabandham");
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-center text-4xl text-maroon">நாலாயிரம் — முழுமையாகப் படிக்க</h1>
      <p className="mt-2 text-center text-muted">திருப்பல்லாண்டு முதல் திருவாய்மொழி வரை, ஒவ்வொரு பாசுரமும் முழுமையாக</p>

      <div className="mt-8">
        <ContinueReading />
      </div>

      <div className="card mt-6 flex flex-col items-center justify-between gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:flex-row">
        <div>
          <h2 className="font-display text-xl text-maroon">📕 முழு நூல் — PDF</h2>
          <p className="text-sm text-muted">4000 பாசுரங்களும் இராமானுச நூற்றந்தாதியும் தமிழில், அச்சிடவும் அலைபேசியில் படிக்கவும் ஏற்றது.</p>
        </div>
        {book ? (
          <a href={book.href} download className="shrink-0 rounded-full bg-gradient-to-r from-vermilion to-saffron px-6 py-2.5 font-semibold text-white shadow-lg shadow-orange-300/40">
            பதிவிறக்கு ({book.mb.toFixed(1)} MB)
          </a>
        ) : (
          <Link href="/read/all" className="shrink-0 rounded-full bg-maroon px-6 py-2.5 font-semibold text-white">
            அச்சுப் பதிப்பைத் திற
          </Link>
        )}
      </div>

      {([1, 2, 3, 4] as Ayiram[]).map((k) => (
        <section key={k} className="mt-10">
          <h2 className="font-display border-b-2 pb-2 text-2xl font-bold" style={{ color: AYIRAM_COLORS[k], borderColor: AYIRAM_COLORS[k] }}>
            {AYIRAMS[k].name} <span className="font-num text-sm font-normal text-muted">{AYIRAMS[k].range}</span>
          </h2>
          <ul className="mt-3 divide-y divide-line">
            {PRABANDHAMS.filter((p) => p.ayiram === k).map((p) => {
              const az = azhwarBySlug(p.azhwar)!;
              const pdf = pdfFor(p.slug);
              return (
                <li key={p.slug} className="flex flex-wrap items-center gap-3 py-3">
                  <Link href={`/read/${p.slug}`} className="min-w-0 flex-1">
                    <span className="font-display text-lg font-bold text-ink hover:text-maroon">{p.name}</span>
                    <span className="ml-2 text-sm" style={{ color: az.color }}>
                      {az.name}
                    </span>
                    <span className="font-num block text-xs text-muted">
                      {p.count} பாசுரங்கள் · {p.start > 4000 ? "இணைப்பு" : p.count === 1 ? `${p.start}` : `${p.start}–${p.start + p.count - 1}`}
                    </span>
                  </Link>
                  <Link href={`/read/${p.slug}`} className="rounded-full bg-maroon px-4 py-1.5 text-sm text-white hover:bg-vermilion">
                    படி
                  </Link>
                  {pdf && (
                    <a href={pdf.href} download className="rounded-full px-4 py-1.5 text-sm text-maroon ring-1 ring-line hover:bg-orange-50">
                      PDF · {pdf.mb < 1 ? `${Math.max(1, Math.round(pdf.mb * 1024))} KB` : `${pdf.mb.toFixed(1)} MB`}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
