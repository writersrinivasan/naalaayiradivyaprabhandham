import Link from "next/link";
import { Donut, StatTile } from "@/components/Charts";
import { EmblemTriad, Lamp } from "@/components/Emblem";
import { AZHWARS } from "@/content/azhwars";
import { AYIRAM_COLORS, ayiramCounts, azhwarVerseCount, pasuramOfTheDay } from "@/content/derived";
import { getPasuram, getStats } from "@/lib/data";

export const revalidate = 3600;

export default function Home() {
  const today = getPasuram(pasuramOfTheDay())!;
  const stats = getStats();
  const translated = Object.values(stats.byPrabandham).reduce((s, p) => s + p.withTranslation, 0);
  const ayirams = ayiramCounts();
  const placeCount = stats.places.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-100 via-amber-50 to-cream">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-64 max-w-3xl bg-gradient-to-t from-orange-200/60 to-amber-100/0 gopuram-mask" />
        <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-12 text-center sm:pt-16">
          <p className="font-hand text-lg text-vermilion sm:text-xl">ஸ்ரீமதே ராமானுஜாய நம:</p>
          <h1 className="font-display mt-2 bg-gradient-to-r from-maroon via-vermilion to-saffron bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-6xl">
            நாலாயிர திவ்ய பிரபந்தம்
          </h1>
          <p className="mt-4 text-lg text-muted sm:text-xl">பன்னிரு ஆழ்வார்கள் அருளிய நான்காயிரம் தமிழ்ப் பாசுரங்கள் — பொருளுடன், கதைகளுடன், தகவல் வரைபடங்களுடன்</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/prabandham" className="rounded-full bg-gradient-to-r from-vermilion to-saffron px-6 py-2.5 font-semibold text-white shadow-lg shadow-orange-300/50 hover:scale-105 transition">
              பாசுரங்களைப் படிக்க
            </Link>
            <Link href="/azhwars" className="rounded-full border-2 border-maroon/30 bg-white/70 px-6 py-2.5 font-semibold text-maroon hover:bg-white">
              ஆழ்வார்கள் கதைகள்
            </Link>
          </div>
        </div>
      </section>

      {/* Middle section: Sangu – Naamam – Chakram */}
      <section className="kolam-bg border-y border-line py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <EmblemTriad />
          <blockquote className="verse mx-auto mt-10 max-w-2xl text-center text-xl text-maroon sm:text-2xl">
            பொன்னாழி கண்டேன் புரிசங்கம் கைக்கண்டேன்
            <br />
            என்னாழி வண்ணன்பால் இன்று
          </blockquote>
          <p className="mt-2 text-center text-sm text-muted">— பேயாழ்வார், மூன்றாம் திருவந்தாதி 1</p>
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 text-sm sm:grid-cols-3">
            <div className="card p-4">
              <b className="font-display text-maroon">சங்கு</b> — பாஞ்சசன்யம். பொய்கை ஆழ்வார் இதன் அம்சம். ஆண்டாள் ‘கருப்பூரம் நாறுமோ’ என்று கண்ணனின் வாய்ச்சுவை கேட்டது இதனிடம்தான்.
            </div>
            <div className="card p-4">
              <b className="font-display text-maroon">திருமண்</b> — வெண்மை தூய்மையையும், நடுவில் உள்ள ஸ்ரீசூர்ணம் திருமகளையும் குறிக்கிறது. பெருமாளின் திருவடிகளே நம் நெற்றியில்.
            </div>
            <div className="card p-4">
              <b className="font-display text-maroon">சக்கரம்</b> — சுதர்சனம். திருமழிசை ஆழ்வார் இதன் அம்சம். கஜேந்திரனைக் காத்த ஆயுதம்; {stats.symbols.find((s) => s[0].startsWith("சக்கரம்"))?.[1]} பாசுரங்களில் ஒளிர்கிறது.
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <StatTile value={4000} label="பாசுரங்கள்" icon="📜" />
          <StatTile value={12} label="ஆழ்வார்கள்" icon="🙏" accent="text-peacock" />
          <StatTile value={24} label="பிரபந்தங்கள்" icon="📚" accent="text-krishna" />
          <StatTile value={placeCount} label="திவ்ய தேசக் குறிப்புகள் (தானியங்கி)" icon="🛕" accent="text-leaf" />
          <StatTile value={translated} label="ஆங்கில மொழிபெயர்ப்புடன்" icon="🌐" accent="text-saffron" />
        </div>
      </section>

      {/* Pasuram of the day */}
      <section className="mx-auto max-w-4xl px-4">
        <div className="card relative overflow-hidden p-6 sm:p-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-100" />
          <p className="relative text-sm font-semibold uppercase tracking-wider text-saffron">இன்றைய பாசுரம்</p>
          <h2 className="font-display relative mt-1 text-2xl text-maroon">
            {today.prabandham.name} · {today.pasuram.ref}
          </h2>
          <div className="verse relative mt-4 text-lg text-ink sm:text-xl">
            {today.pasuram.ta.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
          <Link href={`/pasuram/${today.pasuram.n}`} className="relative mt-6 inline-block rounded-full bg-maroon px-5 py-2 text-sm font-semibold text-white hover:bg-vermilion">
            பொருளும் தகவல் வரைபடமும் →
          </Link>
        </div>
      </section>

      {/* Azhwars */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-center text-3xl text-maroon">பன்னிரு ஆழ்வார்கள்</h2>
        <p className="mt-2 text-center text-muted">‘ஆழ்வார்’ — இறையன்பில் ஆழ்ந்தவர். ஒவ்வொருவரின் வாழ்க்கையும் ஒரு அற்புதக் கதை.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {AZHWARS.map((a) => (
            <Link key={a.slug} href={`/azhwars/${a.slug}`} className="card group overflow-hidden p-0 transition hover:-translate-y-1">
              <div className="h-2" style={{ background: a.color }} />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{a.glyph}</span>
                  <span className="font-num text-sm text-muted">{azhwarVerseCount(a.slug)} பாசுரங்கள்</span>
                </div>
                <h3 className="font-display mt-2 text-lg font-bold" style={{ color: a.color }}>
                  {a.name}
                </h3>
                <p className="text-xs text-muted">{a.nakshatram}</p>
                <p className="mt-2 line-clamp-3 text-sm text-ink/80">{a.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Thirukkovalur three lamps */}
      <section className="bg-gradient-to-br from-indigo-950 via-krishna to-indigo-900 py-14 text-amber-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-center text-3xl text-amber-200">திருக்கோவலூர் இடைகழியில் ஏற்றிய மூன்று விளக்குகள்</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-amber-100/80">
            ஒருவர் படுக்கலாம், இருவர் இருக்கலாம், மூவர் நிற்கலாம் — மழை இரவில் நான்காவதாக நெருக்கியவர் பெருமாளே! அந்த இருளில் ஏற்றிய ஞான விளக்குகளே முதல் 300 பாசுரங்கள்.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { who: "பொய்கை ஆழ்வார்", line: "வையம் தகளியா வார்கடலே நெய்யாக", meaning: "உலகமே அகல், கடலே நெய், கதிரவனே சுடர்", n: 2082 },
              { who: "பூதத்தாழ்வார்", line: "அன்பே தகளியா ஆர்வமே நெய்யாக", meaning: "அன்பே அகல், ஆர்வமே நெய், உருகும் சிந்தையே திரி", n: 2182 },
              { who: "பேயாழ்வார்", line: "திருக்கண்டேன் பொன்மேனி கண்டேன்", meaning: "அந்த ஒளியில் திருமகளுடன் இறைவனைக் கண்டேன்!", n: 2282 },
            ].map((l) => (
              <Link key={l.n} href={`/pasuram/${l.n}`} className="rounded-2xl border border-amber-200/20 bg-white/5 p-6 text-center transition hover:bg-white/10">
                <Lamp className="mx-auto h-20 w-20" />
                <p className="verse mt-3 text-lg text-amber-100">{l.line}</p>
                <p className="mt-2 text-sm text-amber-100/70">{l.meaning}</p>
                <p className="font-display mt-3 text-amber-300">{l.who}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Four thousand */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-center text-3xl text-maroon">நான்கு ஆயிரங்கள்</h2>
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[auto_1fr]">
          <div className="card p-6">
            <Donut center="4000" sub="பாசுரங்கள்" data={ayirams.map((a) => ({ label: a.name, value: a.count, color: AYIRAM_COLORS[a.ayiram] }))} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {ayirams.map((a) => (
              <div key={a.ayiram} className="card p-5" style={{ borderTop: `4px solid ${AYIRAM_COLORS[a.ayiram]}` }}>
                <h3 className="font-display text-lg font-bold text-ink">{a.name}</h3>
                <p className="font-num text-sm text-muted">{a.range}</p>
                <p className="mt-2 text-sm">{a.about}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nathamuni */}
      <section className="mx-auto max-w-4xl px-4">
        <div className="card p-6 sm:p-10">
          <h2 className="font-display text-2xl text-maroon">நாலாயிரம் மீண்ட கதை</h2>
          <ol className="relative mt-6 space-y-6 border-l-2 border-orange-200 pl-6">
            {[
              ["காட்டுமன்னார்கோயில்", "நாதமுனிகள் சில அடியார்கள் 'ஆராவமுதே' பதிகம் பாடுவதைக் கேட்கிறார்."],
              ["'ஆயிரத்துள் இப்பத்தும்'", "பத்து மட்டுமா? மீதி 990 எங்கே? — தேடல் தொடங்குகிறது."],
              ["திருக்குருகூர்", "மதுரகவியாரின் கண்ணிநுண் சிறுத்தாம்பை 12000 முறை ஜபிக்கிறார்."],
              ["நம்மாழ்வார் தரிசனம்", "யோகத்தில் தோன்றிய ஆழ்வார் நாலாயிரம் பாசுரங்களையும் அருளுகிறார்."],
              ["தொகுப்பு", "நாதமுனிகள் அவற்றை நான்கு ஆயிரங்களாகப் பிரித்து இசையமைக்கிறார். இன்றும் கோயில்களில் ஒலிக்கிறது."],
            ].map(([t, d], i) => (
              <li key={i}>
                <span className="font-num absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-xs text-white">{i + 1}</span>
                <h3 className="font-display font-bold text-ink">{t}</h3>
                <p className="text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
