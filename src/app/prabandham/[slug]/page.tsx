import Link from "next/link";
import { notFound } from "next/navigation";
import { BarList, StatTile } from "@/components/Charts";
import { azhwarBySlug } from "@/content/azhwars";
import { AYIRAM_COLORS } from "@/content/derived";
import { prabandhamBySlug } from "@/content/prabandhams";
import { getPrabandhamVerses, getStats, groupByPathigam } from "@/lib/data";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = prabandhamBySlug((await params).slug);
  return { title: p ? `${p.name} | நாலாயிர திவ்ய பிரபந்தம்` : "பிரபந்தம்" };
}

const PATHU_NAMES = ["முதல்", "இரண்டாம்", "மூன்றாம்", "நான்காம்", "ஐந்தாம்", "ஆறாம்", "ஏழாம்", "எட்டாம்", "ஒன்பதாம்", "பத்தாம்", "பதினொன்றாம்"];

export default async function PrabandhamPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ pathu?: string }> }) {
  const p = prabandhamBySlug((await params).slug);
  if (!p) notFound();
  const { pathu: pathuParam } = await searchParams;
  const az = azhwarBySlug(p.azhwar)!;
  const verses = getPrabandhamVerses(p.slug);
  const s = getStats().byPrabandham[p.slug];
  const color = AYIRAM_COLORS[p.ayiram];

  // Three-level refs (pathu.thirumozhi.pasuram) get pathu tabs so a page stays light.
  const threeLevel = verses[0].ref.split(".").length === 3;
  const pathus = threeLevel ? [...new Set(verses.map((v) => v.ref.split(".")[0]))] : [];
  const pathu = threeLevel ? (pathus.includes(pathuParam ?? "") ? pathuParam! : pathus[0]) : null;
  const shown = pathu ? verses.filter((v) => v.ref.split(".")[0] === pathu) : verses;
  const groups = groupByPathigam(shown);

  return (
    <div>
      <header className="kolam-bg border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Link href="/prabandham" className="text-sm text-muted hover:text-maroon">
            ← பிரபந்தங்கள்
          </Link>
          <h1 className="font-display mt-2 text-4xl font-bold sm:text-5xl" style={{ color }}>
            {p.name}
          </h1>
          <Link href={`/azhwars/${az.slug}`} className="mt-1 inline-block font-semibold" style={{ color: az.color }}>
            {az.glyph} {az.name}
          </Link>
          <p className="mt-4 max-w-3xl text-lg">{p.about}</p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4">
        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile value={p.count} label="பாசுரங்கள்" />
          <StatTile value={p.start <= 4000 ? `${p.start}–${p.start + p.count - 1}` : "—"} label="நாலாயிர எண்கள்" accent="text-peacock" />
          <StatTile value={s.withTranslation} label="ஆங்கில மொழிபெயர்ப்புடன்" accent="text-saffron" />
          <StatTile value={s.places.length} label="தலக் குறிப்புகள்" accent="text-leaf" />
        </section>

        {(s.places.length > 0 || s.stories.length > 0) && (
          <section className="mt-6 grid gap-6 md:grid-cols-2">
            {s.places.length > 0 && (
              <div className="card p-5">
                <h2 className="font-display mb-3 text-lg text-maroon">திவ்ய தேசங்கள் (தானியங்கி)</h2>
                <BarList hue={color} data={s.places.slice(0, 8).map(([label, value]) => ({ label, value }))} />
              </div>
            )}
            {s.stories.length > 0 && (
              <div className="card p-5">
                <h2 className="font-display mb-3 text-lg text-maroon">அவதாரக் குறிப்புகள் (தானியங்கி)</h2>
                <BarList hue="#0284c7" data={s.stories.slice(0, 8).map(([label, value]) => ({ label, value }))} />
              </div>
            )}
          </section>
        )}

        {threeLevel && (
          <nav className="sticky top-[60px] z-20 -mx-4 mt-8 flex gap-2 overflow-x-auto bg-cream/95 px-4 py-3 backdrop-blur">
            {pathus.map((x) => (
              <Link
                key={x}
                href={`?pathu=${x}`}
                scroll={false}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${x === pathu ? "text-white" : "bg-white text-ink ring-1 ring-line"}`}
                style={x === pathu ? { background: color } : undefined}
              >
                {PATHU_NAMES[Number(x) - 1] ?? x} பத்து
              </Link>
            ))}
          </nav>
        )}

        {groups.map(([key, vs]) => (
          <section key={key || "all"} className="mt-8">
            {key && (
              <h2 className="font-display mb-3 text-xl text-maroon">
                பதிகம் {key}
                {vs[0].pann && <span className="ml-3 rounded-full bg-violet-100 px-3 py-0.5 text-sm text-violet-800">பண்: {vs[0].pann}</span>}
              </h2>
            )}
            <div className="grid gap-3 md:grid-cols-2">
              {vs.map((v) => (
                <Link key={v.n} href={`/pasuram/${v.n}`} className="card group block p-4 transition hover:border-saffron">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted">
                    <span className="font-num">
                      {v.ref} · #{v.n}
                    </span>
                    <span className="flex gap-1">
                      {v.symbols.some((x) => x.startsWith("சங்கு")) && <span title="சங்கு">🐚</span>}
                      {v.symbols.some((x) => x.startsWith("சக்கரம்")) && <span title="சக்கரம்">☸️</span>}
                      {v.places.length > 0 && <span title={v.places.join(", ")}>🛕</span>}
                      {v.en.length > 0 && <span title="ஆங்கில மொழிபெயர்ப்பு உண்டு">🌐</span>}
                    </span>
                  </div>
                  <div className="verse text-[1.02rem] text-ink group-hover:text-maroon">
                    {v.ta.slice(0, 2).map((l, i) => (
                      <p key={i}>{l}</p>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
