"use client";

import { useEffect, useState } from "react";

export const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";
const STORAGE_KEY = "naalayiram.groq";
const CHANGE_EVENT = "groq-settings-change";

export interface GroqSettings {
  key: string;
  model: string;
}

function load(): GroqSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { key: "", model: DEFAULT_GROQ_MODEL, ...JSON.parse(raw) };
  } catch {
    // storage blocked (private mode etc.)
  }
  return { key: "", model: DEFAULT_GROQ_MODEL };
}

function save(s: GroqSettings) {
  try {
    if (s.key) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** BYOK settings kept only in this browser's localStorage. */
export function useGroqSettings() {
  const [settings, setSettings] = useState<GroqSettings>({ key: "", model: DEFAULT_GROQ_MODEL });
  useEffect(() => {
    const sync = () => setSettings(load());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return settings;
}

const mask = (k: string) => (k.length > 10 ? `${k.slice(0, 4)}••••${k.slice(-4)}` : "••••");

export function GroqSettingsCard({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const settings = useGroqSettings();
  const [open, setOpen] = useState(defaultOpen);
  const [draft, setDraft] = useState("");
  const [models, setModels] = useState<string[]>([]);
  const [status, setStatus] = useState<{ tone: "ok" | "err" | "info"; text: string } | null>(null);
  const [checking, setChecking] = useState(false);

  async function verify(key: string) {
    setChecking(true);
    setStatus({ tone: "info", text: "சரிபார்க்கிறது…" });
    try {
      const res = await fetch("/api/groq/models", { headers: key ? { "x-groq-api-key": key } : {} });
      const body = await res.json();
      if (!body.ok) {
        setStatus({ tone: "err", text: body.error });
        return false;
      }
      setModels(body.models);
      setStatus({ tone: "ok", text: `சரியான key ✓ — ${body.models.length} மாதிரிகள் கிடைக்கின்றன` });
      return true;
    } catch {
      setStatus({ tone: "err", text: "இணைப்பில் பிழை" });
      return false;
    } finally {
      setChecking(false);
    }
  }

  async function saveKey() {
    const key = draft.trim();
    if (!key) return;
    if (await verify(key)) {
      save({ ...settings, key });
      setDraft("");
    }
  }

  const modelOptions = [...new Set([settings.model, DEFAULT_GROQ_MODEL, "openai/gpt-oss-20b", "llama-3.3-70b-versatile", ...models])];
  const tones = { ok: "bg-emerald-50 text-emerald-800", err: "bg-red-50 text-red-800", info: "bg-orange-50 text-muted" };

  return (
    <div className="rounded-2xl border border-line bg-white/80">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          🔑 Groq API key (BYOK)
          {settings.key ? (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-normal text-emerald-800">அமைக்கப்பட்டது · {mask(settings.key)}</span>
          ) : (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-normal text-amber-800">அமைக்கவில்லை</span>
          )}
        </span>
        <span className="text-muted">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-line px-4 py-4 text-sm">
          <p className="text-muted">
            உங்கள் சொந்த Groq key-ஐப் பயன்படுத்தி AI விளக்கம் உருவாக்கலாம். Key இந்த உலாவியில் (localStorage) மட்டுமே சேமிக்கப்படும்; ஒவ்வொரு கோரிக்கையின்போதும் இந்தத் தளத்தின் சேவையகம் வழியாக Groq-க்கு அனுப்பப்படும்; சேவையகத்தில் சேமிக்கப்படாது.{" "}
            <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-peacock underline">
              இலவச key பெற →
            </a>
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="password"
              autoComplete="off"
              spellCheck={false}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveKey()}
              placeholder={settings.key ? "புதிய key-ஐ ஒட்டவும் (gsk_…)" : "gsk_… key-ஐ இங்கே ஒட்டவும்"}
              className="flex-1 rounded-xl border border-line bg-white px-3 py-2 font-mono outline-none focus:border-saffron"
            />
            <button onClick={saveKey} disabled={!draft.trim() || checking} className="rounded-xl bg-maroon px-4 py-2 font-semibold text-white disabled:opacity-50">
              சரிபார்த்துச் சேமி
            </button>
            {settings.key && (
              <>
                <button onClick={() => verify(settings.key)} disabled={checking} className="rounded-xl border border-line px-3 py-2">
                  சோதி
                </button>
                <button
                  onClick={() => {
                    save({ ...settings, key: "" });
                    setModels([]);
                    setStatus({ tone: "info", text: "Key நீக்கப்பட்டது" });
                  }}
                  className="rounded-xl border border-red-200 px-3 py-2 text-red-700"
                >
                  நீக்கு
                </button>
              </>
            )}
          </div>

          <label className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="font-semibold text-ink">மாதிரி (model)</span>
            <select
              value={settings.model}
              onChange={(e) => save({ ...settings, model: e.target.value })}
              disabled={!settings.key}
              className="rounded-xl border border-line bg-white px-3 py-2 disabled:opacity-50"
            >
              {modelOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                  {m === DEFAULT_GROQ_MODEL ? " (பரிந்துரை)" : ""}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-muted">
            openai/gpt-oss-120b, gpt-oss-20b ஆகியவை JSON schema-வைக் கட்டாயமாகப் பின்பற்றும் (strict). மற்ற மாதிரிகள் JSON mode-இல் இயங்கும்; தமிழ்த் தரம் மாறுபடலாம்.
          </p>
          {status && <p className={`rounded-lg px-3 py-2 ${tones[status.tone]}`}>{status.text}</p>}
        </div>
      )}
    </div>
  );
}
