"use client";

import { useCallback, useEffect, useState } from "react";
import { hastaById, SHAPES, type Hasta } from "@/content/natyam/hastas";
import { POSES, STANCES } from "@/content/natyam/poses";
import { RASAS, type VerseDance } from "@/content/natyam/thiruppavai";
import { Dancer, type DanceStyle } from "./Dancer";
import { HastaIcon } from "./Hand";

const STEP_MS: Record<DanceStyle, number> = { vazhuvoor: 4600, basic: 3400 };

function HastaCard({ hasta, label }: { hasta: Hasta; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-line">
      <HastaIcon hasta={hasta} className="h-16 w-16 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="font-display font-bold text-maroon">
          {hasta.name} <span className="text-xs font-normal text-muted">{hasta.sanskrit}</span>
        </p>
        <p className="text-xs text-ink/70">{hasta.meaning}</p>
      </div>
    </div>
  );
}

export function DancePlayer({ verse }: { verse: VerseDance }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [style, setStyle] = useState<DanceStyle>("vazhuvoor");
  const step = verse.steps[i];
  const pose = POSES[step.pose];
  const both = step.both ? hastaById(step.both) : undefined;
  const left = step.left ? hastaById(step.left) : undefined;
  const right = step.right ? hastaById(step.right) : undefined;
  const rasa = RASAS[step.rasa];

  const go = useCallback((d: number) => setI((x) => (x + d + verse.steps.length) % verse.steps.length), [verse.steps.length]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (i === verse.steps.length - 1) setPlaying(false);
      else go(1);
    }, STEP_MS[style]);
    return () => clearTimeout(t);
  }, [playing, i, style, go, verse.steps.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* stage */}
      <div className="card overflow-hidden">
        <div className="relative bg-gradient-to-b from-amber-50 via-orange-50 to-rose-100 px-4 pt-4">
          <div className="absolute inset-x-0 top-0 h-3 bg-[repeating-linear-gradient(90deg,#be185d_0_10px,#e0a526_10px_14px)]" />
          <Dancer
            pose={pose}
            left={both?.pair?.[0].shape ?? left?.shape ?? SHAPES.ardhachandra}
            right={both?.pair?.[1].shape ?? right?.shape ?? SHAPES.ardhachandra}
            danceStyle={style}
            className="mx-auto h-[380px] w-full max-w-[320px] sm:h-[440px]"
          />
          <p className="pb-3 text-center text-xs text-muted">நடனம்: அம்ருதவர்ஷினி (வரைபட உருவம்) · {STANCES[pose.stance].name}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4">
          <div className="flex gap-2">
            <button onClick={() => go(-1)} className="h-10 w-10 rounded-full bg-white ring-1 ring-line hover:bg-orange-50" aria-label="முந்தைய அடி">
              ◀
            </button>
            <button
              onClick={() => {
                if (!playing && i === verse.steps.length - 1) setI(0);
                setPlaying((p) => !p);
              }}
              className="rounded-full bg-gradient-to-r from-vermilion to-saffron px-5 py-2 font-semibold text-white"
            >
              {playing ? "❚❚ நிறுத்து" : "▶ ஆடு"}
            </button>
            <button onClick={() => go(1)} className="h-10 w-10 rounded-full bg-white ring-1 ring-line hover:bg-orange-50" aria-label="அடுத்த அடி">
              ▶
            </button>
          </div>
          <div className="flex rounded-full bg-orange-50 p-1 text-sm">
            {(["vazhuvoor", "basic"] as DanceStyle[]).map((s) => (
              <button key={s} onClick={() => setStyle(s)} className={`rounded-full px-3 py-1 ${style === s ? "bg-maroon text-white" : "text-ink"}`}>
                {s === "vazhuvoor" ? "வழுவூர் பாணி" : "அடிப்படை"}
              </button>
            ))}
          </div>
        </div>
        <ol className="flex gap-1.5 overflow-x-auto px-4 pb-4">
          {verse.steps.map((s, k) => (
            <li key={k}>
              <button
                onClick={() => {
                  setI(k);
                  setPlaying(false);
                }}
                className={`h-2.5 w-10 rounded-full transition ${k === i ? "" : "opacity-30"}`}
                style={{ background: RASAS[s.rasa].color }}
                aria-label={`அடி ${k + 1}`}
              />
            </li>
          ))}
        </ol>
      </div>

      {/* step explanation */}
      <div className="space-y-4">
        <div className="card p-5">
          <p className="font-num text-xs text-saffron">
            அடி {i + 1} / {verse.steps.length}
          </p>
          <p className="verse mt-1 text-xl text-maroon sm:text-2xl">{step.phrase}</p>
          <p className="mt-1 text-ink/80">{step.meaning}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full px-3 py-1 text-white" style={{ background: rasa.color }}>
              ரசம்: {rasa.name} · {rasa.english}
            </span>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-maroon">நிலை: {STANCES[pose.stance].name}</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {both ? (
            <div className="sm:col-span-2">
              <HastaCard hasta={both} label="இரு கை (சம்யுத) ஹஸ்தம்" />
            </div>
          ) : (
            <>
              {left && <HastaCard hasta={left} label="இடப்புறக் கை" />}
              {right && <HastaCard hasta={right} label="வலப்புறக் கை" />}
            </>
          )}
        </div>
        <div className="card border-l-4 p-5" style={{ borderLeftColor: rasa.color }}>
          <h3 className="font-display text-lg text-maroon">ஏன் இந்த அசைவு?</h3>
          <p className="mt-1 leading-8">{step.note}</p>
          {style === "vazhuvoor" && (
            <p className="mt-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-900">
              <b>வழுவூர் பாணிக் குறிப்பு:</b> {VAZHUVOOR_HINT[step.rasa]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** How the Vazhuvoor emphasis on grace (lasya) and expressive eyes colours each rasa. */
const VAZHUVOOR_HINT: Record<string, string> = {
  shringara: "மெதுவான, வளைவான கை அசைவுகள்; புருவமும் கண்ணும் முதலில் பேச, கை பின்தொடரும். நிலையில் சற்று நின்று சிற்பம் போல் அழகு காட்டுங்கள்.",
  hasya: "சிரிப்பைக் கண்களில் தொடங்குங்கள்; தோள் சிறிதே அசைய, இயல்பான விளையாட்டுத் தன்மை.",
  karuna: "தலை மெல்லச் சாய, கண்கள் தாழ, மூச்சு மெதுவாக — அசைவு குறைவு, உணர்வு நிறைவு.",
  raudra: "வீச்சு கூர்மையாக இருந்தாலும் கோடுகள் உடையாமல் — அழகுடன் கூடிய சினம்.",
  veera: "உறுதியான மண்டி; ஆனால் கை அசைவின் முடிவில் மென்மையான நிறுத்தம் (lasya-வுடன் தாண்டவம்).",
  bhayanaka: "கண்கள் அகல விரிந்து பக்கவாட்டில் பார்க்க, உடல் சற்றுப் பின்வாங்க — விரைவான சிறு அசைவுகள்.",
  adbhuta: "கண்கள் விரிந்து மேலே; கை மெல்ல விரிந்து சிற்ப நிலையில் நிலைத்தல்.",
  shanta: "அசைவுகள் மிக மெதுவாக; மூச்சோடு இணைந்த நீண்ட வளைவுகள்.",
  bhakti: "முகத்தில் அமைதியான பரவசம்; அஞ்சலியில் சற்று நிலைத்து நின்று, பின் மெல்ல அடுத்த அடவு.",
  vatsalya: "தாயின் பரிவு — தலை சாய்வு, கனிவான கண்கள், தொட்டிலாட்டும் மென்மையான தாளம்.",
};
