import Link from "next/link";
import { Dancer } from "@/components/natyam/Dancer";
import { HastaIcon } from "@/components/natyam/Hand";
import { HASTAS, hastaById, SHAPES } from "@/content/natyam/hastas";
import { POSES, STANCES, type Stance } from "@/content/natyam/poses";
import { RASAS, THIRUPPAVAI_DANCE } from "@/content/natyam/thiruppavai";

export const metadata = { title: "நாட்டியம் — திருப்பாவை பரதநாட்டியம் | நாலாயிர திவ்ய பிரபந்தம்" };

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="font-display text-3xl text-maroon">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const STANCE_POSE: Partial<Record<Stance, keyof typeof POSES>> = {
  samapadam: "anjaliChest",
  aramandi: "vishnu",
  muzhumandi: "lion",
  tribhanga: "flute",
  ekapada: "trivikrama",
  alidha: "bow",
  kneel: "bowDown",
  recline: "sleep",
};

export default function NatyamPage() {
  const shikhara = hastaById("shikhara")!;
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10">
      {/* hero */}
      <section className="mt-6 grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="font-hand text-xl text-vermilion">ஆடிப் பாடி அரங்கனைப் போற்றுவோம்</p>
          <h1 className="font-display mt-2 text-4xl font-bold leading-tight text-maroon sm:text-5xl">திருப்பாவை — பரதநாட்டிய வடிவில்</h1>
          <p className="mt-4 text-lg leading-8">
            ஆண்டாளின் முப்பது பாசுரங்களுக்கும் அடி அடியாக நடன அமைப்பு: ஒவ்வொரு சொற்றொடருக்கும் ஒரு நிலை, இரு கைகளின் ஹஸ்தம், ஒரு ரசம், அந்த அசைவு ஏன் என்ற விளக்கம். <b>வழுவூர் பாணியில்</b>, அம்ருதவர்ஷினியின் உருவில்.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/natyam/thiruppavai/1" className="rounded-full bg-gradient-to-r from-vermilion to-saffron px-6 py-2.5 font-semibold text-white shadow-lg shadow-orange-300/40">
              ▶ பாசுரம் 1 முதல் ஆடுக
            </Link>
            <a href="#hastas" className="rounded-full bg-white px-6 py-2.5 font-semibold text-maroon ring-1 ring-line">
              ஹஸ்தங்கள் அறிக
            </a>
          </div>
        </div>
        <figure className="text-center">
          <Dancer pose={POSES.amrutha} left={SHAPES.shikhara} right={SHAPES.ardhachandra} className="mx-auto h-80 w-64" />
          <figcaption className="mt-1 text-sm text-muted">
            அம்ருதவர்ஷினி — <b className="text-maroon">சிகர ஹஸ்தம்</b>
            <br />
            <span className="text-xs">‘தம்ஸ்-அப்’ என்பது பரதத்தின் சிகரமே!</span>
          </figcaption>
        </figure>
      </section>

      <Section title="ஏன் நடன அசைவுகள்?">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["🛕", "அரையர் சேவை — ஆயிரம் ஆண்டு மரபு", "நாதமுனிகள் பாசுரங்களுக்கு இசையும் தாளமும் அமைத்து அரையர்களுக்குக் கற்பித்தார். இன்றும் திருவரங்கம், ஸ்ரீவில்லிபுத்தூர், ஆழ்வார்திருநகரியில் அரையர்கள் பெருமாள் முன் பாசுரங்களை அபிநயத்துடன் ஆடிப் பாடுகிறார்கள். நடனம் இப்பாசுரங்களின் இயல்பான வடிவமே."],
            ["🧠", "உடலால் நினைவில் நிற்கும்", "சொல்லோடு ஒரு அசைவு இணைந்தால் அது மறக்காது. 'சங்கொடு சக்கரம் ஏந்தும்' என்று படிக்கும்போது கையே சங்க, சக்கர ஹஸ்தமாக மாறினால், பொருளும் வரியும் சேர்ந்தே நினைவில் தங்கும்."],
            ["👁️", "பொருள் கண்ணுக்குத் தெரியும்", "தமிழ் படிக்க முடியாதவரும் ஒரு நடனத்தைப் பார்த்து 'நிலவு', 'சிங்கம்', 'உலகளந்த கால்' என்று புரிந்துகொள்ளலாம். அபிநயம் ஒரு உலக மொழி."],
            ["🙏", "நடனமே வழிபாடு", "பரதம் கோயிலில் இறைவன் முன் பிறந்த கலை. ஆண்டாள் பாசுரங்களை ஆடுவது பாடுவதைப் போலவே ஒரு சேவை."],
            ["📱", "இளைய தலைமுறைக்கு", "ஒவ்வொரு அடியும் சில நொடிகள் — ஒரு ரீல் நீளம். ஒரு பாசுரத்தை ஆடிப் பகிர்வது மரபை உயிர்ப்புடன் வைக்கும் எளிய வழி."],
            ["🌧️", "அம்ருதவர்ஷினி", "அம்ருதவர்ஷினி என்பது மழையை அழைக்கும் இராகம். 'ஆழி மழைக் கண்ணா' (பாசுரம் 4) மழை வேண்டும் பாசுரம் — அதை அவள் ஆடுவது பொருத்தம்!"],
          ].map(([icon, t, d]) => (
            <div key={t} className="card p-5">
              <p className="text-3xl">{icon}</p>
              <h3 className="font-display mt-2 text-lg font-bold text-ink">{t}</h3>
              <p className="mt-1 text-sm leading-7 text-ink/80">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="நடனத்தின் மூன்று அம்சங்கள்">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["நிருத்தம்", "Nritta", "பொருளற்ற தூய நடனம் — அடவுகள், தாளம், வடிவியல். உடலின் அழகும் தாளக் கட்டும்.", "ஜதிஸ்வரம், தில்லானா"],
            ["நிருத்யம்", "Nritya", "பொருளுடன் கூடிய நடனம் — சொல்லுக்கு ஏற்ற ஹஸ்தமும் முகபாவமும். பாசுரங்கள் இங்கே வருகின்றன.", "பதம், கீர்த்தனம், வர்ணம்"],
            ["நாட்டியம்", "Natya", "கதை சொல்லும் நாடக நடனம் — பாத்திரங்களாக மாறி ஒரு நிகழ்வை நடித்தல்.", "நாட்டிய நாடகம், ஆண்டாள் கல்யாணம்"],
          ].map(([t, s, d, e]) => (
            <div key={t} className="card p-5">
              <h3 className="font-display text-2xl text-maroon">{t}</h3>
              <p className="text-xs text-muted">{s}</p>
              <p className="mt-2 text-sm leading-7">{d}</p>
              <p className="mt-2 text-xs text-saffron">எ.கா. {e}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="நான்கு வகை அபிநயம்">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["ஆங்கிகம்", "Angika", "உடல் உறுப்புகளால் — தலை, கை, கண், கால் அசைவுகள். இந்தத் தளத்தின் வரைபடங்கள் இதையே காட்டுகின்றன."],
            ["வாசிகம்", "Vachika", "சொல், பாடல், இசையால் — பாசுரமே வாசிக அபிநயம்."],
            ["ஆஹார்யம்", "Aharya", "உடை, அணிகலன், ஒப்பனையால் — ஒட்டியாணம், நெற்றிச்சுட்டி, ஜிமிக்கி, கால் சலங்கை, அல்தா."],
            ["சாத்விகம்", "Sattvika", "உள்ளுணர்வால் — கண்ணீர், மெய்சிலிர்ப்பு, முகம் சிவத்தல். கலைஞரின் ஆன்மா."],
          ].map(([t, s, d]) => (
            <div key={t} className="card p-5">
              <h3 className="font-display text-xl text-maroon">{t}</h3>
              <p className="text-xs text-muted">{s}</p>
              <p className="mt-2 text-sm leading-7">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          அபிநய தர்ப்பணம் (நந்திகேஸ்வரர்) உடலை அங்கம் (தலை, கை, மார்பு, பக்கம், இடுப்பு, கால்), பிரத்யங்கம் (தோள், கை, முதுகு, வயிறு, தொடை, முழங்கால்), உபாங்கம் (கண், புருவம், மூக்கு, உதடு, கன்னம்) எனப் பிரிக்கிறது. சிரோ பேதம் 9, திருஷ்டி பேதம் 8, க்ரீவா (கழுத்து) பேதம் 4.
        </p>
      </Section>

      <Section title="நவரசங்கள் — நடனத்தின் உணர்வுகள்">
        <div className="flex flex-wrap gap-2">
          {Object.values(RASAS).map((r) => (
            <span key={r.name} className="rounded-full px-4 py-2 text-white" style={{ background: r.color }}>
              {r.name} <span className="text-white/80">· {r.english}</span>
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">பாரத முனிவரின் நாட்டிய சாஸ்திரம் எட்டு ரசங்களைச் சொல்கிறது; பின்னர் சாந்தம் சேர்ந்து நவரசம் ஆனது. பக்தி, வாத்சல்யம் (தாய்மை) ஆகியவை வைணவ நடனத்தில் முக்கியமானவை.</p>
      </Section>

      <Section id="hastas" title="ஹஸ்தங்கள் — கை முத்திரைகள்">
        <p className="mb-4 max-w-3xl text-ink/80">
          அபிநய தர்ப்பணம் 28 ஒற்றைக் கை (அசம்யுத) ஹஸ்தங்களையும், சுமார் 24 இரட்டைக் கை (சம்யுத) ஹஸ்தங்களையும் சொல்கிறது. ஒவ்வொன்றுக்கும் பல பொருள்கள் (வினியோகம்) உண்டு. திருப்பாவை நடனத்தில் பயன்படும் {HASTAS.length} ஹஸ்தங்கள் கீழே — எளிமைப்படுத்திய வரைபடங்கள்.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {HASTAS.map((h) => (
            <div key={h.id} className={`card flex gap-3 p-3 ${h.id === "shikhara" ? "ring-2 ring-saffron" : ""}`}>
              <HastaIcon hasta={h} className="h-20 w-20 shrink-0" />
              <div className="min-w-0">
                <p className="font-display font-bold text-maroon">{h.name}</p>
                <p className="text-xs text-muted">
                  {h.sanskrit} · {h.kind === "samyuta" ? "இரு கை" : "ஒரு கை"}
                </p>
                <p className="mt-1 text-xs leading-5 text-ink/80">{h.uses.slice(0, 3).join(" · ")}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          ★ {shikhara.name}: அம்ருதவர்ஷினியின் புகைப்படத்தில் உள்ள ‘தம்ஸ்-அப்’ — {shikhara.uses.slice(0, 3).join(", ")}.
        </p>
      </Section>

      <Section title="நிலைகள் (மண்டலம், ஸ்தானகம்)">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(Object.keys(STANCE_POSE) as Stance[]).map((s) => (
            <div key={s} className="card p-3 text-center">
              <Dancer pose={POSES[STANCE_POSE[s]!]} left={SHAPES.tripataka} right={SHAPES.tripataka} className="mx-auto h-44 w-36" />
              <p className="font-display font-bold text-maroon">{STANCES[s].name}</p>
              <p className="text-xs text-muted">{STANCES[s].sanskrit}</p>
              <p className="mt-1 text-xs leading-5">{STANCES[s].about}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          அடவுகள் — நடனத்தின் அடிப்படை அலகுகள்: தட்டடவு, நாட்டடவு, மெட்டடவு, குதித்தமெட்டடவு, தட்டிமெட்டடவு, பரவல் அடவு, மண்டி அடவு, தீர்மானம். ஒவ்வொரு பாசுர அடியையும் ஒரு அடவுத் தொடருடன் இணைத்து ஆடலாம்.
        </p>
      </Section>

      <Section id="vazhuvoor" title="வழுவூர் பாணி (Vazhuvoor Bani)">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card space-y-3 p-6 leading-8">
            <p>
              மயிலாடுதுறை அருகிலுள்ள <b>வழுவூர்</b> கிராமத்தின் நட்டுவனார் மரபில் வந்த <b>வழுவூர் இராமையா பிள்ளை</b> (1910–1991) அவர்களால் புகழ்பெற்ற பரதநாட்டியப் பாணி. குமாரி கமலா, வைஜயந்திமாலா போன்ற கலைஞர்கள் இப்பாணியை மேடைக்கும் திரைக்கும் கொண்டு சென்றனர்.
            </p>
            <p>பொதுவாகச் சொல்லப்படும் இப்பாணியின் சிறப்புகள்:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li><b>லாஸ்யம்</b> — மென்மை, நளினம், அழகு முதன்மை.</li>
              <li><b>வளைவான, தொடர் அசைவுகள்</b> — ஒரு நிலையிலிருந்து அடுத்ததற்கு ஓடும் நீர் போல்.</li>
              <li><b>சிற்பம் போன்ற நிலைகள்</b> — உடலின் மேற்பகுதியில் சிறு சாய்வு, கோயில் சிலை போன்ற அழகுடன் சற்று நிலைத்தல்.</li>
              <li><b>கண்ணும் முகமும்</b> — நுட்பமான, நாடகீயமான அபிநயம்; கண்கள் முதலில் பேசுகின்றன.</li>
            </ul>
            <p className="rounded-xl bg-orange-50 p-3 text-sm">
              இந்தத் தளத்தில் ‘வழுவூர் பாணி’ தேர்வு செய்தால்: அசைவுகள் மெதுவாகவும் வளைவாகவும் மாறும், ஒவ்வொரு நிலையிலும் உடல் சிற்பம் போல் சற்றுச் சாயும், ஒவ்வொரு அடியிலும் அந்த ரசத்துக்கான வழுவூர் அபிநயக் குறிப்பு காட்டப்படும்.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-display text-lg text-maroon">பரதநாட்டியத்தின் சில பாணிகள்</h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div><dt className="font-bold">வழுவூர்</dt><dd className="text-ink/80">நளினம், லாஸ்யம், அபிநயம், சிற்ப நிலைகள்.</dd></div>
              <div><dt className="font-bold">பந்தநல்லூர்</dt><dd className="text-ink/80">கோட்டுத் துல்லியம், வடிவியல், ஆழ்ந்த அரைமண்டி.</dd></div>
              <div><dt className="font-bold">தஞ்சாவூர் (தஞ்சை நால்வர்)</dt><dd className="text-ink/80">இன்றைய மார்க்கம் (அலாரிப்பு முதல் தில்லானா வரை) வகுத்த மரபு.</dd></div>
              <div><dt className="font-bold">கலாக்ஷேத்ரா</dt><dd className="text-ink/80">ருக்மிணி தேவி அருண்டேல் — தெளிவான கோடுகள், ஒழுங்கு.</dd></div>
            </dl>
            <p className="mt-4 text-xs text-muted">பாணிகளின் நுணுக்கங்கள் குரு–சிஷ்ய மரபில் வேறுபடும். உங்கள் குருவின் அடவுகளும் அபிநயமுமே இறுதி அளவுகோல்.</p>
          </div>
        </div>
      </Section>

      <Section title="இந்தியாவின் செவ்வியல் நடனங்கள்">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["பரதநாட்டியம்", "தமிழ்நாடு"],
            ["கதக்", "வட இந்தியா"],
            ["கதகளி", "கேரளம்"],
            ["மோகினியாட்டம்", "கேரளம்"],
            ["குச்சிப்புடி", "ஆந்திரப் பிரதேசம்"],
            ["ஒடிசி", "ஒடிசா"],
            ["மணிப்புரி", "மணிப்பூர்"],
            ["சத்ரியா", "அசாம்"],
          ].map(([d, s]) => (
            <div key={d} className={`card p-4 ${d === "பரதநாட்டியம்" ? "ring-2 ring-saffron" : ""}`}>
              <p className="font-display font-bold text-maroon">{d}</p>
              <p className="text-xs text-muted">{s}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">சங்கீத நாடக அகாடமி எட்டு நடனங்களைச் செவ்வியல் நடனங்களாக அங்கீகரிக்கிறது; சிலர் சாவ் நடனத்தையும் சேர்த்து ஒன்பது என்பர்.</p>
      </Section>

      <Section id="thiruppavai" title="முப்பது பாசுரங்கள் — நடன அமைப்பு">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {THIRUPPAVAI_DANCE.map((v) => {
            const s = v.steps[0];
            const both = s.both ? hastaById(s.both) : undefined;
            return (
              <Link key={v.n} href={`/natyam/thiruppavai/${v.n}`} className="card group overflow-hidden transition hover:-translate-y-1">
                <div className="bg-gradient-to-b from-amber-50 to-rose-50">
                  <Dancer
                    pose={POSES[s.pose]}
                    left={both?.pair?.[0].shape ?? (s.left ? hastaById(s.left)?.shape : undefined)}
                    right={both?.pair?.[1].shape ?? (s.right ? hastaById(s.right)?.shape : undefined)}
                    className="mx-auto h-40 w-32"
                  />
                </div>
                <div className="p-3">
                  <p className="font-num text-xs text-saffron">{v.n} · {v.steps.length} அடிகள்</p>
                  <p className="font-display font-bold text-maroon group-hover:text-vermilion">{v.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <p className="mt-10 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
        இது பாசுரப் பொருளையும் அபிநய தர்ப்பணத்தின் ஹஸ்த வினியோகங்களையும் அடிப்படையாகக் கொண்ட பரிந்துரைக்கப்பட்ட நடன அமைப்பு. கை முத்திரை வரைபடங்கள் எளிமைப்படுத்தப்பட்டவை. மேடையில் ஆடும் முன் உங்கள் நாட்டிய குருவின் வழிகாட்டுதலுடன் சரிபார்த்துக் கொள்ளுங்கள்.
      </p>
    </div>
  );
}
