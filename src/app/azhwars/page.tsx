import Link from "next/link";
import { BarList } from "@/components/Charts";
import { AZHWARS } from "@/content/azhwars";
import { azhwarCounts, azhwarVerseCount } from "@/content/derived";

export const metadata = { title: "ஆழ்வார்கள் | நாலாயிர திவ்ய பிரபந்தம்" };

export default function AzhwarsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-center text-4xl text-maroon">ஆழ்வார்கள்</h1>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
        பொய்கை, பூதம், பேய் முதல் திருமங்கை வரை — பெருமாளின் சங்கு, சக்கரம், வாள், கதை, வில், மாலை, மணி என ஒவ்வொருவரும் ஒரு திவ்ய அம்சம்.
      </p>

      <div className="card mx-auto mt-8 max-w-3xl p-6">
        <h2 className="font-display mb-4 text-xl text-maroon">யார் எத்தனை பாசுரங்கள்?</h2>
        <BarList data={azhwarCounts().map(({ azhwar, count }) => ({ label: azhwar.name, value: count, dot: azhwar.color, href: `/azhwars/${azhwar.slug}` }))} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {AZHWARS.map((a, i) => (
          <Link key={a.slug} href={`/azhwars/${a.slug}`} className="card group flex gap-4 p-5 transition hover:-translate-y-1">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl" style={{ background: `${a.color}1a`, border: `2px solid ${a.color}55` }}>
              {a.glyph}
            </div>
            <div className="min-w-0">
              <p className="font-num text-xs text-muted">#{i + 1} · {azhwarVerseCount(a.slug)} பாசுரங்கள்</p>
              <h2 className="font-display text-xl font-bold" style={{ color: a.color }}>
                {a.name}
              </h2>
              <p className="text-xs text-muted">
                {a.birthplace} · {a.nakshatram} · அம்சம்: {a.amsam}
              </p>
              <p className="mt-2 line-clamp-2 text-sm">{a.intro}</p>
              <p className="mt-2 text-sm font-semibold text-saffron">{a.stories.length} கதைகள் படிக்க →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
