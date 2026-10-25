import Link from "next/link";
import { notFound } from "next/navigation";
import { EmblemTriad } from "@/components/Emblem";
import { PrintButton, ReaderToolbar, ReadingTracker } from "@/components/Reader";
import { VerseBlock } from "@/components/VerseBlock";
import { azhwarBySlug } from "@/content/azhwars";
import { AYIRAM_COLORS } from "@/content/derived";
import { PRABANDHAMS, prabandhamBySlug } from "@/content/prabandhams";
import { getPrabandhamVerses, groupByPathigam, pdfFor } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = prabandhamBySlug((await params).slug);
  return { title: p ? `${p.name} — படிக்க | நாலாயிர திவ்ய பிரபந்தம்` : "படிக்க" };
}

const PATHU = ["முதல்", "இரண்டாம்", "மூன்றாம்", "நான்காம்", "ஐந்தாம்", "ஆறாம்", "ஏழாம்", "எட்டாம்", "ஒன்பதாம்", "பத்தாம்", "பதினொன்றாம்"];

export default async function ReadPrabandham({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ pathu?: string; full?: string }> }) {
  const p = prabandhamBySlug((await params).slug);
  if (!p) notFound();
  const { pathu: pathuParam, full } = await searchParams;
  const az = azhwarBySlug(p.azhwar)!;
  const color = AYIRAM_COLORS[p.ayiram];
  const verses = getPrabandhamVerses(p.slug);
  const pdf = pdfFor(p.slug);

  // Large works are paged by pathu on screen; ?full=1 renders everything (used for the PDF).
  const threeLevel = verses[0].ref.split(".").length === 3;
  const pathus = threeLevel ? [...new Set(verses.map((v) => v.ref.split(".")[0]))] : [];
  const showAll = full === "1" || !threeLevel;
  const pathu = showAll ? null : pathus.includes(pathuParam ?? "") ? pathuParam! : pathus[0];
  const shown = pathu ? verses.filter((v) => v.ref.split(".")[0] === pathu) : verses;
  const groups = groupByPathigam(shown);
  const hasEnglish = shown.some((v) => v.en.length > 0);

  const idx = PRABANDHAMS.findIndex((x) => x.slug === p.slug);
  const nextPathu = pathu ? pathus[pathus.indexOf(pathu) + 1] : undefined;
  const prevPathu = pathu ? pathus[pathus.indexOf(pathu) - 1] : undefined;
  const nextWork = PRABANDHAMS[idx + 1];
  const prevWork = PRABANDHAMS[idx - 1];
  const basePath = `/read/${p.slug}${pathu ? `?pathu=${pathu}` : ""}`;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10">
      {/* PDF cover page */}
      <section className="hidden min-h-[240mm] flex-col items-center justify-center text-center print:flex">
        <EmblemTriad compact />
        <h1 className="font-display mt-10 text-[34pt] font-bold" style={{ color }}>
          {p.name}
        </h1>
        <p className="font-display mt-2 text-[16pt]" style={{ color: az.color }}>
          {az.name}
        </p>
        <p className="font-num mt-6 text-[11pt] text-muted">
          {p.count} பாசுரங்கள் · நாலாயிர எண் {p.start > 4000 ? "இணைப்பு" : p.count === 1 ? `${p.start}` : `${p.start}–${p.start + p.count - 1}`}
        </p>
        <p className="mx-auto mt-6 max-w-md text-[10.5pt] leading-relaxed">{p.about}</p>
        <p className="mt-16 text-[8pt] text-muted">நாலாயிர திவ்ய பிரபந்தம் · மூலம், ஆங்கில மொழிபெயர்ப்பு: University of Hamburg TAMILEX</p>
      </section>

      <header className="pt-8 print:hidden">
        <Link href="/read" className="text-sm text-muted hover:text-maroon">
          ← படிக்க
        </Link>
        <h1 className="font-display mt-1 text-4xl font-bold" style={{ color }}>
          {p.name}
        </h1>
        <Link href={`/azhwars/${az.slug}`} className="font-semibold" style={{ color: az.color }}>
          {az.glyph} {az.name}
        </Link>
        <span className="font-num ml-3 text-sm text-muted">{p.count} பாசுரங்கள்</span>
      </header>

      <div className="sticky top-[60px] z-20 -mx-4 mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-cream/95 px-4 py-2 backdrop-blur print:hidden">
        <ReaderToolbar hasEnglish={hasEnglish} />
        <div className="flex items-center gap-2">
          {pdf && (
            <a href={pdf.href} download className="rounded-full bg-gradient-to-r from-vermilion to-saffron px-4 py-2 text-sm font-semibold text-white">
              ⬇ PDF
            </a>
          )}
          <PrintButton />
        </div>
      </div>

      {threeLevel && (
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 print:hidden">
          {pathus.map((x) => (
            <Link
              key={x}
              href={`/read/${p.slug}?pathu=${x}`}
              className={`shrink-0 rounded-full px-3 py-1 text-sm ${x === pathu ? "text-white" : "bg-white text-ink ring-1 ring-line"}`}
              style={x === pathu ? { background: color } : undefined}
            >
              {PATHU[Number(x) - 1] ?? x} பத்து
            </Link>
          ))}
          <Link
            href={`/read/${p.slug}?full=1`}
            className={`shrink-0 rounded-full px-3 py-1 text-sm ${showAll ? "text-white" : "bg-white text-ink ring-1 ring-line"}`}
            style={showAll ? { background: color } : undefined}
          >
            முழுவதும்
          </Link>
        </nav>
      )}

      <div className="print-break">
        {groups.map(([key, vs]) => (
          <section key={key || "all"} className="mt-6">
            {key && (
              <h2 className="font-display sticky top-[112px] z-10 -mx-4 bg-cream/95 px-4 py-2 text-lg text-maroon backdrop-blur print:static print:mx-0 print:bg-transparent print:px-0 print:text-[12pt]">
                {threeLevel ? `${PATHU[Number(key.split(".")[0]) - 1] ?? key.split(".")[0]} பத்து · ${key.split(".")[1]}ஆம் திருமொழி` : `பதிகம் ${key}`}
                {vs[0].pann && <span className="ml-2 text-sm text-violet-700">பண்: {vs[0].pann}</span>}
              </h2>
            )}
            {vs.map((v) => (
              <VerseBlock key={v.n} v={v} color={color} />
            ))}
          </section>
        ))}
      </div>

      <nav className="mt-10 grid grid-cols-2 gap-4 print:hidden">
        {prevPathu ? (
          <Link href={`/read/${p.slug}?pathu=${prevPathu}`} className="card p-4">← {PATHU[Number(prevPathu) - 1]} பத்து</Link>
        ) : prevWork ? (
          <Link href={`/read/${prevWork.slug}`} className="card p-4">← {prevWork.name}</Link>
        ) : (
          <span />
        )}
        {nextPathu ? (
          <Link href={`/read/${p.slug}?pathu=${nextPathu}`} className="card p-4 text-right">{PATHU[Number(nextPathu) - 1]} பத்து →</Link>
        ) : nextWork ? (
          <Link href={`/read/${nextWork.slug}`} className="card p-4 text-right">{nextWork.name} →</Link>
        ) : (
          <span />
        )}
      </nav>

      <ReadingTracker slug={p.slug} name={p.name} basePath={basePath} />
    </div>
  );
}
