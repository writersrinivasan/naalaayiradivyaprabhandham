import { BarList, DataTable, Donut, StatTile } from "@/components/Charts";
import { Chakram, Sangu } from "@/components/Emblem";
import { AYIRAM_COLORS, ayiramCounts, azhwarCounts, nameForm } from "@/content/derived";
import { PRABANDHAMS } from "@/content/prabandhams";
import { getStats } from "@/lib/data";

export const metadata = { title: "தகவல் வரைபடம் | நாலாயிர திவ்ய பிரபந்தம்" };

function Panel({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="card p-6">
      <h2 className="font-display text-xl text-maroon">{title}</h2>
      {sub && <p className="mb-4 text-xs text-muted">{sub}</p>}
      {children}
    </section>
  );
}

export default function InfographicsPage() {
  const stats = getStats();
  const azhwars = azhwarCounts();
  const ayirams = ayiramCounts();
  const sangu = stats.symbols.find((s) => s[0].startsWith("சங்கு"))?.[1] ?? 0;
  const chakram = stats.symbols.find((s) => s[0].startsWith("சக்கரம்"))?.[1] ?? 0;
  const auto = "பாசுரச் சொற்களில் தேடித் தானியங்கியாக எண்ணியவை — தோராயமானவை";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-center text-4xl text-maroon">நாலாயிரம் — ஒரு பார்வையில்</h1>
      <p className="mt-2 text-center text-muted">எண்ணிக்கைகள், அவதாரங்கள், திவ்ய தேசங்கள், பண்கள்</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile value={4000} label="பாசுரங்கள்" icon="📜" />
        <StatTile value={24} label="பிரபந்தங்கள்" icon="📚" accent="text-krishna" />
        <StatTile value={sangu} label="சங்கு குறிப்புகள்" icon="🐚" accent="text-peacock" />
        <StatTile value={chakram} label="சக்கரம் குறிப்புகள்" icon="☸️" accent="text-saffron" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="நான்கு ஆயிரங்களின் பங்கு">
          <Donut center="4000" sub="பாசுரங்கள்" data={ayirams.map((a) => ({ label: a.name, value: a.count, color: AYIRAM_COLORS[a.ayiram] }))} />
        </Panel>
        <Panel title="ஆழ்வார் வாரியாகப் பாசுரங்கள்">
          <BarList data={azhwars.map(({ azhwar, count }) => ({ label: azhwar.name, value: count, dot: azhwar.color, href: `/azhwars/${azhwar.slug}` }))} />
          <DataTable headers={["ஆழ்வார்", "பாசுரங்கள்"]} rows={azhwars.map(({ azhwar, count }) => [azhwar.name, count])} />
        </Panel>
        <Panel title="பிரபந்த வாரியாக">
          <BarList
            hue="#0284c7"
            data={[...PRABANDHAMS].sort((a, b) => b.count - a.count).map((p) => ({ label: p.name, value: p.count, href: `/prabandham/${p.slug}`, dot: AYIRAM_COLORS[p.ayiram] }))}
          />
        </Panel>
        <Panel title="அதிகம் பாடப்பட்ட திவ்ய தேசங்கள்" sub={auto}>
          <BarList hue="#15803d" data={stats.places.slice(0, 15).map(([label, value]) => ({ label, value }))} />
          <DataTable headers={["தலம்", "பாசுரங்கள்"]} rows={stats.places} />
        </Panel>
        <Panel title="அவதாரங்களும் புராணக் கதைகளும்" sub={auto}>
          <BarList hue="#dc2626" data={stats.stories.map(([label, value]) => ({ label, value }))} />
        </Panel>
        <Panel title="பன்னிரு திருநாமங்கள்" sub="கேசவன் முதல் தாமோதரன் வரை — சொல் வரும் எண்ணிக்கை">
          <BarList hue="#7c3aed" unit="முறை" data={stats.names.map(([label, value]) => ({ label: nameForm(label), value }))} />
        </Panel>
        <Panel title="திருவாய்மொழிப் பண்கள்" sub="ஒவ்வொரு பதிகத்துக்கும் குறிக்கப்பட்ட பண் (இராகம்)">
          <BarList hue="#d97706" data={stats.pann.map(([label, value]) => ({ label, value }))} />
        </Panel>
        <Panel title="திவ்ய ஆயுதங்களும் குறியீடுகளும்" sub={auto}>
          <div className="mb-4 flex justify-center gap-6">
            <Sangu className="h-20 w-20" />
            <Chakram className="h-20 w-20" />
          </div>
          <BarList hue="#b45309" data={stats.symbols.map(([label, value]) => ({ label, value }))} />
        </Panel>
      </div>
    </div>
  );
}
