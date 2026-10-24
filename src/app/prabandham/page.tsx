import Link from "next/link";
import { azhwarBySlug } from "@/content/azhwars";
import { AYIRAM_COLORS } from "@/content/derived";
import { AYIRAMS, PRABANDHAMS, type Ayiram } from "@/content/prabandhams";

export const metadata = { title: "பிரபந்தங்கள் | நாலாயிர திவ்ய பிரபந்தம்" };

export default function PrabandhamsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-center text-4xl text-maroon">இருபத்துநான்கு பிரபந்தங்கள்</h1>
      <p className="mt-2 text-center text-muted">நாதமுனிகள் வகுத்த நான்கு ஆயிரங்கள் வழியே</p>
      {([1, 2, 3, 4] as Ayiram[]).map((k) => (
        <section key={k} className="mt-10">
          <div className="flex items-baseline gap-3 border-b-2 pb-2" style={{ borderColor: AYIRAM_COLORS[k] }}>
            <h2 className="font-display text-2xl font-bold" style={{ color: AYIRAM_COLORS[k] }}>
              {AYIRAMS[k].name}
            </h2>
            <span className="font-num text-sm text-muted">{AYIRAMS[k].range}</span>
          </div>
          <p className="mt-2 text-sm text-muted">{AYIRAMS[k].about}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRABANDHAMS.filter((p) => p.ayiram === k).map((p) => {
              const az = azhwarBySlug(p.azhwar)!;
              return (
                <Link key={p.slug} href={`/prabandham/${p.slug}`} className="card flex flex-col p-5 transition hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-ink">{p.name}</h3>
                    <span className="font-num shrink-0 rounded-full px-2.5 py-0.5 text-sm text-white" style={{ background: AYIRAM_COLORS[k] }}>
                      {p.count}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold" style={{ color: az.color }}>
                    {az.glyph} {az.name}
                  </p>
                  <p className="verse mt-2 text-maroon">“{p.highlight}”</p>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{p.about}</p>
                  <p className="font-num mt-auto pt-3 text-xs text-muted">
                    {p.start <= 4000 ? `${p.start} – ${p.start + p.count - 1}` : "இணைப்பு"}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
