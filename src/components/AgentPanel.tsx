"use client";

import { useState } from "react";
import type { Infographic } from "@/lib/agent/schema";
import { BarList, Meter } from "./Charts";
import { GroqSettingsCard, useGroqSettings } from "./GroqSettings";

const PIPELINE = [
  { node: "retrieve", label: "திரட்டல்", icon: "📥" },
  { node: "analyze", label: "சொல் ஆய்வு", icon: "🔎" },
  { node: "interpret", label: "Groq உரை", icon: "✍️" },
  { node: "review", label: "சரிபார்ப்பு", icon: "✅" },
  { node: "compose", label: "வரைபடம்", icon: "🎨" },
];

type Step = { node: string; label: string };

export function AgentPanel({ n, color }: { n: number; color: string }) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [info, setInfo] = useState<Infographic | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const groq = useGroqSettings();

  async function run(refresh = false) {
    setRunning(true);
    setSteps([]);
    setError(null);
    setInfo(null);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (groq.key) headers["x-groq-api-key"] = groq.key;
      const res = await fetch("/api/agent", { method: "POST", headers, body: JSON.stringify({ n, refresh, model: groq.model }) });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const msg = JSON.parse(line);
          if (msg.type === "step") setSteps((s) => [...s, { node: msg.node, label: msg.label }]);
          if (msg.type === "result") setInfo(msg.infographic);
          if (msg.type === "error") setError(msg.message);
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  }

  const visits = (node: string) => steps.filter((s) => s.node === node).length;
  const current = running ? steps.at(-1)?.node : undefined;

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-100 p-6">
        <div>
          <h2 className="font-display text-2xl text-maroon">AI முகவர் தகவல் வரைபடம்</h2>
          <p className="text-sm text-muted">LangGraph முகவர் — திரட்டல் → சொல் ஆய்வு → Groq உரை → சரிபார்ப்பு → வரைபடம்</p>
        </div>
        <button
          onClick={() => run(false)}
          disabled={running}
          className="rounded-full bg-gradient-to-r from-vermilion to-saffron px-6 py-2.5 font-semibold text-white shadow-lg shadow-orange-300/40 transition hover:scale-105 disabled:opacity-60"
        >
          {running ? "முகவர் இயங்குகிறது…" : info ? "மீண்டும் இயக்கு" : "விளக்கம் உருவாக்கு ✨"}
        </button>
      </div>

      <div className="px-6 pt-4">
        <GroqSettingsCard defaultOpen={!groq.key} />
      </div>

      {(running || steps.length > 0) && (
        <ol className="flex flex-wrap items-center gap-2 px-6 py-4">
          {PIPELINE.map((p, i) => {
            const count = visits(p.node);
            const active = current === p.node;
            return (
              <li key={p.node} className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition ${count ? "text-white" : "bg-white text-muted ring-1 ring-line"} ${active ? "animate-pulse" : ""}`}
                  style={count ? { background: color } : undefined}
                  title={steps.find((s) => s.node === p.node)?.label}
                >
                  {p.icon} {p.label}
                  {count > 1 && <span className="font-num text-xs">×{count}</span>}
                </span>
                {i < PIPELINE.length - 1 && <span className="text-muted">→</span>}
              </li>
            );
          })}
          {steps.some((s) => s.node === "cache") && <li className="text-sm text-leaf">⚡ சேமித்த விளக்கம்</li>}
        </ol>
      )}

      {error && <p className="mx-6 mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">பிழை: {error}</p>}

      {info && <InfographicView info={info} color={color} canRefresh={Boolean(groq.key)} onRefresh={() => run(true)} />}
    </section>
  );
}

function InfographicView({ info, color, canRefresh, onRefresh }: { info: Infographic; color: string; canRefresh: boolean; onRefresh: () => void }) {
  const { insight, lexicon } = info;
  const [answer, setAnswer] = useState<number | null>(null);

  return (
    <div className="space-y-6 p-6">
      {/* deterministic strip — always available */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["அடிகள்", lexicon.lineCount],
          ["சொற்கள்", lexicon.wordCount],
          ["அகராதிச் சொற்கள்", lexicon.glossCount],
          ["குறிப்புகள்", lexicon.places.length + lexicon.stories.length + lexicon.symbols.length],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-white p-4 text-center ring-1 ring-line">
            <p className="font-num text-3xl font-bold" style={{ color }}>
              {v}
            </p>
            <p className="text-xs text-muted">{k}</p>
          </div>
        ))}
      </div>

      {!insight && (
        <div className="rounded-2xl bg-amber-100/60 p-4 text-sm text-amber-900">
          {info.aiEnabled
            ? `AI விளக்கம் கிடைக்கவில்லை${info.notice ? ` (${info.notice})` : ""}. மீண்டும் முயலவும் அல்லது வேறு மாதிரியைத் தேர்ந்தெடுக்கவும்.`
            : "AI விளக்கத்துக்கு மேலே உங்கள் Groq API key-ஐ (BYOK) அமைக்கவும். இப்போது சொல் ஆய்வு மட்டும் காட்டப்படுகிறது."}
        </div>
      )}

      {lexicon.grammar.length > 0 && (
        <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
          <h3 className="font-display mb-3 text-lg text-maroon">இலக்கண அமைப்பு (சொல் அகராதியிலிருந்து)</h3>
          <BarList hue={color} unit="சொற்கள்" data={lexicon.grammar.map(([label, value]) => ({ label, value }))} />
        </div>
      )}

      {insight && (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
              <h3 className="font-display text-xl" style={{ color }}>
                பொழிப்புரை
              </h3>
              <p className="mt-2 text-[1.05rem] leading-8">{insight.porul}</p>
              <p className="mt-3 text-sm italic text-muted">{insight.englishSummary}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
              <h3 className="font-display text-xl" style={{ color }}>
                உணர்வுகள் (ரசம்)
              </h3>
              <div className="mt-3 space-y-3">
                {insight.rasas.map((r) => (
                  <Meter key={r.name} label={r.name} score={r.score} hue={color} />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-orange-50 p-3">
                  <p className="text-xs text-muted">பாவம்</p>
                  <p className="font-display font-bold text-maroon">{insight.bhavam}</p>
                </div>
                <div className="rounded-xl bg-orange-50 p-3">
                  <p className="text-xs text-muted">பேசுபவர்</p>
                  <p className="font-display font-bold text-maroon">{insight.speaker}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
            <h3 className="font-display text-xl" style={{ color }}>
              பதவுரை
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {insight.padhavurai.map((w, i) => (
                <div key={i} className="flex gap-2 rounded-xl border border-line px-3 py-2">
                  <span className="verse shrink-0 font-semibold text-maroon">{w.word}</span>
                  <span className="text-sm">— {w.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
            <h3 className="font-display text-xl" style={{ color }}>
              விளக்கவுரை
            </h3>
            <div className="mt-2 space-y-3 text-[1.05rem] leading-8">
              {insight.vilakkam.split(/\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-line lg:col-span-2">
              <h3 className="font-display text-lg" style={{ color }}>
                📖 கதைச் சூழல்
              </h3>
              <p className="mt-2 leading-8">{insight.context}</p>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
              <h3 className="font-display mb-3 text-lg" style={{ color }}>
                கருப்பொருள்கள்
              </h3>
              <div className="space-y-3">
                {insight.themes.map((t) => (
                  <Meter key={t.name} label={t.name} score={t.weight} hue="#0284c7" />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <EntityCard title="🙏 பாத்திரங்கள்" items={insight.characters.map((c) => [c.name, c.role])} />
            <EntityCard title="🛕 இடங்கள்" items={insight.places.map((p) => [p.name, p.note])} empty="குறிப்பிட்ட இடம் இல்லை" />
            <EntityCard title="🐚 குறியீடுகள்" items={insight.symbols.map((s) => [s, ""])} empty="குறியீடுகள் இல்லை" />
          </div>

          <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${color}, #7f1d1d)` }}>
            <h3 className="font-display text-lg text-amber-200">🪔 இன்றைய சிந்தனை</h3>
            <p className="font-hand mt-2 text-xl leading-9">{insight.lesson}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
            <h3 className="font-display text-lg" style={{ color }}>
              🧠 வினாடி வினா
            </h3>
            <p className="mt-2 font-semibold">{insight.quiz.question}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {insight.quiz.options.map((o, i) => {
                const picked = answer === i;
                const correct = i === insight.quiz.answer;
                const tone = answer === null ? "bg-orange-50 hover:bg-orange-100" : correct ? "bg-emerald-100 text-emerald-900" : picked ? "bg-red-100 text-red-900" : "bg-orange-50 opacity-60";
                return (
                  <button key={i} onClick={() => setAnswer(i)} disabled={answer !== null} className={`rounded-xl px-4 py-2 text-left transition ${tone}`}>
                    {o} {answer !== null && correct && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-muted">
            {info.model} · LangGraph · {new Date(info.generatedAt).toLocaleString("ta-IN")} — AI உருவாக்கிய விளக்கம்; ஆன்றோர் உரைகளுடன் ஒப்பிட்டுப் படிக்கவும்.{" "}
            {canRefresh && (
              <button onClick={onRefresh} className="text-peacock underline">
                புதிதாக உருவாக்கு
              </button>
            )}
          </p>
        </>
      )}
    </div>
  );
}

function EntityCard({ title, items, empty }: { title: string; items: [string, string][]; empty?: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
      <h3 className="font-display mb-2 text-lg text-maroon">{title}</h3>
      {items.length ? (
        <ul className="space-y-2 text-sm">
          {items.map(([a, b]) => (
            <li key={a}>
              <b>{a}</b>
              {b && <span className="block text-muted">{b}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">{empty}</p>
      )}
    </div>
  );
}
