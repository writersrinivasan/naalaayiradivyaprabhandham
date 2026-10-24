import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentPanel } from "@/components/AgentPanel";
import { Chakram, Sangu } from "@/components/Emblem";
import { azhwarBySlug } from "@/content/azhwars";
import { nameForm } from "@/content/derived";
import { getPasuram } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const found = getPasuram(Number((await params).n));
  return { title: found ? `${found.prabandham.name} ${found.pasuram.ref} | பாசுரம் ${found.pasuram.n}` : "பாசுரம்" };
}

function Chips({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-muted">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((x) => (
          <span key={x} className={`rounded-full px-3 py-1 text-sm ${tone}`}>
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function PasuramPage({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  const found = Number.isInteger(n) ? getPasuram(n) : null;
  if (!found) notFound();
  const { pasuram: v, prabandham: p, prev, next } = found;
  const az = azhwarBySlug(p.azhwar)!;
  const hasSangu = v.symbols.some((s) => s.startsWith("சங்கு"));
  const hasChakram = v.symbols.some((s) => s.startsWith("சக்கரம்"));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/prabandham" className="hover:text-maroon">பிரபந்தங்கள்</Link>›
        <Link href={`/prabandham/${p.slug}${v.ref.split(".").length === 3 ? `?pathu=${v.ref.split(".")[0]}` : ""}`} className="hover:text-maroon">
          {p.name}
        </Link>
        › <span className="font-num">{v.ref}</span>
      </nav>

      <article className="card relative mt-4 overflow-hidden">
        <div className="h-2" style={{ background: `linear-gradient(90deg, ${az.color}, #f59e0b, #dc2626)` }} />
        <div className="kolam-bg absolute inset-0 top-2 opacity-40" />
        <div className="relative p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-num text-sm text-saffron">நாலாயிர எண் {v.n <= 4000 ? v.n : `இணைப்பு ${v.n - 4000}`}</p>
              <h1 className="font-display text-3xl font-bold text-maroon">
                {p.name} <span className="font-num text-2xl text-muted">{v.ref}</span>
              </h1>
              <Link href={`/azhwars/${az.slug}`} className="font-semibold" style={{ color: az.color }}>
                {az.glyph} {az.name}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {hasSangu && <Sangu className="h-14 w-14" />}
              {hasChakram && <Chakram className="h-14 w-14" />}
              {v.pann && <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-800">பண்: {v.pann}</span>}
            </div>
          </div>

          <div className="verse mx-auto mt-8 max-w-3xl text-center text-xl text-ink sm:text-[1.5rem] sm:leading-[2.6rem]">
            {v.ta.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        {v.en.length > 0 ? (
          <div className="card p-6">
            <h2 className="font-display text-xl text-maroon">English translation</h2>
            <div className="mt-3 space-y-1 text-[0.98rem] italic text-ink/85">
              {v.en.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">Univ. of Hamburg TAMILEX edition</p>
          </div>
        ) : (
          <div className="card p-6 text-sm text-muted">
            இப்பாசுரத்துக்கு மூல மொழிபெயர்ப்பு இல்லை. கீழே உள்ள AI முகவர் தமிழ்ப் பொருளையும் விளக்கத்தையும் உருவாக்கும்.
          </div>
        )}
        <div className="card space-y-4 p-6">
          <h2 className="font-display text-xl text-maroon">குறிப்புகள்</h2>
          <Chips title="திவ்ய தேசங்கள்" items={v.places} tone="bg-emerald-50 text-emerald-800" />
          <Chips title="அவதாரம் / கதை" items={v.stories} tone="bg-sky-50 text-sky-800" />
          <Chips title="குறியீடுகள்" items={v.symbols} tone="bg-amber-50 text-amber-800" />
          <Chips title="திருநாமங்கள்" items={Object.keys(v.names).map(nameForm)} tone="bg-rose-50 text-rose-800" />
          {!v.places.length && !v.stories.length && !v.symbols.length && !Object.keys(v.names).length && (
            <p className="text-sm text-muted">சொல் அளவில் குறிப்புகள் கண்டறியப்படவில்லை.</p>
          )}
          <p className="text-xs text-muted">சொற்பட்டியலிலிருந்து தானியங்கியாகக் கண்டறிந்தவை.</p>
        </div>
      </section>

      {v.gloss.length > 0 && (
        <section className="card mt-6 p-6">
          <h2 className="font-display text-xl text-maroon">சொல்லுக்குச் சொல் (Word by word)</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {v.gloss.map(([w, d, g], i) => (
              <div key={i} className="rounded-xl border border-line bg-white/60 px-3 py-2" title={g}>
                <p className="verse text-maroon">{w}</p>
                <p className="text-sm text-ink/80">{d}</p>
                {g && <p className="truncate text-[0.7rem] text-muted">{g}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <AgentPanel n={v.n} color={az.color} />

      <nav className="mt-10 grid grid-cols-2 gap-4">
        {prev ? (
          <Link href={`/pasuram/${prev.n}`} className="card p-4 hover:border-saffron">
            <span className="text-xs text-muted">← முந்தைய பாசுரம் {prev.ref}</span>
            <p className="verse truncate text-ink">{prev.ta[0]}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/pasuram/${next.n}`} className="card p-4 text-right hover:border-saffron">
            <span className="text-xs text-muted">அடுத்த பாசுரம் {next.ref} →</span>
            <p className="verse truncate text-ink">{next.ta[0]}</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
