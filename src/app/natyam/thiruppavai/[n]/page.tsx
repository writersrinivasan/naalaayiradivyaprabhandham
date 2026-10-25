import Link from "next/link";
import { notFound } from "next/navigation";
import { DancePlayer } from "@/components/natyam/Player";
import { THIRUPPAVAI_DANCE } from "@/content/natyam/thiruppavai";
import { prabandhamBySlug } from "@/content/prabandhams";
import { getPrabandhamVerses } from "@/lib/data";

export function generateStaticParams() {
  return THIRUPPAVAI_DANCE.map((v) => ({ n: String(v.n) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  const v = THIRUPPAVAI_DANCE.find((x) => x.n === n);
  return { title: v ? `திருப்பாவை ${v.n} — ${v.title} | நாட்டியம்` : "நாட்டியம்" };
}

export default async function VerseDancePage({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  const dance = THIRUPPAVAI_DANCE.find((x) => x.n === n);
  if (!dance) notFound();
  const p = prabandhamBySlug("thiruppavai")!;
  const verse = getPrabandhamVerses("thiruppavai")[n - 1];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="text-sm text-muted">
        <Link href="/natyam" className="hover:text-maroon">நாட்டியம்</Link> › திருப்பாவை {n}
      </nav>
      <header className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-num text-sm text-saffron">திருப்பாவை · பாசுரம் {n} / 30</p>
          <h1 className="font-display text-4xl font-bold text-maroon">{dance.title}</h1>
          <p className="mt-1 text-lg text-ink/80">{dance.theme}</p>
        </div>
        <Link href={`/pasuram/${p.start + n - 1}`} className="rounded-full bg-white px-4 py-2 text-sm text-maroon ring-1 ring-line hover:bg-orange-50">
          பாசுரப் பொருள் →
        </Link>
      </header>

      <section className="mt-6">
        <DancePlayer verse={dance} />
      </section>

      <section className="card mt-6 grid gap-6 p-6 md:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-xl text-maroon">பாசுரம்</h2>
          <div className="verse mt-2 text-lg leading-9">
            {verse.ta.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-xl text-maroon">அடவுகளின் வரிசை</h2>
          <ol className="mt-2 space-y-2 text-sm">
            {dance.steps.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-num text-saffron">{i + 1}.</span>
                <span>
                  <span className="verse text-maroon">{s.phrase}</span> — {s.meaning}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <nav className="mt-8 grid grid-cols-2 gap-4">
        {n > 1 ? (
          <Link href={`/natyam/thiruppavai/${n - 1}`} className="card p-4">
            ← {n - 1}. {THIRUPPAVAI_DANCE[n - 2].title}
          </Link>
        ) : (
          <span />
        )}
        {n < 30 ? (
          <Link href={`/natyam/thiruppavai/${n + 1}`} className="card p-4 text-right">
            {n + 1}. {THIRUPPAVAI_DANCE[n].title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
