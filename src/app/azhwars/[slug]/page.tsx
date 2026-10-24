import Link from "next/link";
import { notFound } from "next/navigation";
import { BarList, StatTile } from "@/components/Charts";
import { AZHWARS, azhwarBySlug } from "@/content/azhwars";
import { azhwarVerseCount } from "@/content/derived";
import { prabandhamBySlug } from "@/content/prabandhams";
import { getStats } from "@/lib/data";

export function generateStaticParams() {
  return AZHWARS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = azhwarBySlug((await params).slug);
  return { title: a ? `${a.name} | நாலாயிர திவ்ய பிரபந்தம்` : "ஆழ்வார்" };
}

export default async function AzhwarPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = azhwarBySlug((await params).slug);
  if (!a) notFound();
  const stats = getStats();
  const works = a.works.map((w) => prabandhamBySlug(w)!);
  const places = new Map<string, number>();
  const stories = new Map<string, number>();
  for (const w of a.works) {
    for (const [k, v] of stats.byPrabandham[w].places) places.set(k, (places.get(k) ?? 0) + v);
    for (const [k, v] of stats.byPrabandham[w].stories) stories.set(k, (stories.get(k) ?? 0) + v);
  }
  const idx = AZHWARS.findIndex((x) => x.slug === a.slug);
  const prev = AZHWARS[idx - 1];
  const next = AZHWARS[idx + 1];

  return (
    <article>
      <header className="relative overflow-hidden py-14 text-white" style={{ background: `linear-gradient(135deg, ${a.color}, #7f1d1d)` }}>
        <div className="kolam-bg absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4">
          <Link href="/azhwars" className="text-sm text-white/80 hover:text-white">
            ← ஆழ்வார்கள்
          </Link>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-white/15 text-6xl ring-4 ring-white/30">{a.glyph}</div>
            <div>
              <h1 className="font-display text-4xl font-bold sm:text-5xl">{a.name}</h1>
              <p className="mt-1 text-white/80">{a.english}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {a.titles.map((t) => (
                  <span key={t} className="rounded-full bg-white/15 px-3 py-0.5 text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4">
        {/* fact card */}
        <section className="-mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile value={azhwarVerseCount(a.slug)} label="பாசுரங்கள்" icon="📜" />
          <StatTile value={a.works.length} label="பிரபந்தங்கள்" icon="📚" accent="text-peacock" />
          <StatTile value={places.size} label="தலக் குறிப்புகள்" icon="🛕" accent="text-leaf" />
          <StatTile value={a.stories.length} label="கதைகள்" icon="✨" accent="text-saffron" />
        </section>

        <section className="card mt-8 grid gap-4 p-6 sm:grid-cols-2">
          <dl className="space-y-3 text-sm">
            {[
              ["அவதாரத் தலம்", a.birthplace],
              ["திருநட்சத்திரம்", a.nakshatram],
              ["திவ்ய அம்சம்", a.amsam],
              ["காலம்", a.era],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-semibold text-muted">{k}</dt>
                <dd className="font-display text-lg text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <p className="text-lg leading-relaxed">{a.intro}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {a.facts.map((f) => (
                <li key={f} className="flex gap-2">
                  <span style={{ color: a.color }}>✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* famous verse */}
        <section className="my-10 rounded-3xl border-2 p-8 text-center" style={{ borderColor: `${a.color}55`, background: `${a.color}0d` }}>
          <div className="verse text-xl sm:text-2xl" style={{ color: a.color }}>
            {a.famous.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
          <Link href={`/pasuram/${a.famous.n}`} className="mt-4 inline-block text-sm font-semibold text-maroon underline">
            இப்பாசுரத்தின் பொருள் →
          </Link>
        </section>

        {/* stories */}
        <section>
          <h2 className="font-display text-3xl text-maroon">வாழ்க்கைக் கதைகள்</h2>
          <div className="mt-6 space-y-6">
            {a.stories.map((s, i) => (
              <div key={s.title} className="card relative overflow-hidden p-6 sm:p-8">
                <span className="font-num absolute right-4 top-2 text-6xl font-extrabold opacity-10" style={{ color: a.color }}>
                  {i + 1}
                </span>
                <h3 className="font-display text-2xl font-bold" style={{ color: a.color }}>
                  {s.title}
                </h3>
                <div className="mt-3 space-y-3 text-[1.05rem] leading-8">
                  {s.body.map((p, j) => (
                    <p key={j} className={p.startsWith("'") ? "font-hand text-xl text-maroon" : ""}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* works + infographics */}
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-display text-xl text-maroon">அருளிய பிரபந்தங்கள்</h2>
            <ul className="mt-4 space-y-3">
              {works.map((w) => (
                <li key={w.slug}>
                  <Link href={`/prabandham/${w.slug}`} className="flex items-center justify-between rounded-xl border border-line p-3 hover:bg-orange-50">
                    <span>
                      <b className="font-display">{w.name}</b>
                      <span className="block text-xs text-muted">{w.highlight}</span>
                    </span>
                    <span className="font-num text-sm text-saffron">{w.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-xl text-maroon">அதிகம் பாடிய திவ்ய தேசங்கள்</h2>
            <p className="mb-3 text-xs text-muted">பாசுரச் சொற்களிலிருந்து தானியங்கியாகக் கண்டறிந்தவை — தோராயமானவை</p>
            {places.size ? (
              <BarList hue={a.color} data={[...places.entries()].sort((x, y) => y[1] - x[1]).slice(0, 8).map(([label, value]) => ({ label, value }))} />
            ) : (
              <p className="text-sm text-muted">குறிப்பிட்ட தலப் பெயர்கள் இல்லை — பரம்பொருளையே பாடியவை.</p>
            )}
            {stories.size > 0 && (
              <>
                <h3 className="font-display mb-3 mt-6 text-lg text-maroon">அவதாரங்கள் & கதைக் குறிப்புகள்</h3>
                <BarList hue="#0284c7" data={[...stories.entries()].sort((x, y) => y[1] - x[1]).slice(0, 6).map(([label, value]) => ({ label, value }))} />
              </>
            )}
          </div>
        </section>

        <nav className="mt-10 flex justify-between text-sm">
          {prev ? <Link href={`/azhwars/${prev.slug}`} className="text-maroon">← {prev.name}</Link> : <span />}
          {next ? <Link href={`/azhwars/${next.slug}`} className="text-maroon">{next.name} →</Link> : <span />}
        </nav>
      </div>
    </article>
  );
}
