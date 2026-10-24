"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Result = { n: number; ref: string; first: string; hasEn: boolean; prabandham: string };

const SUGGESTIONS = ["நாராயண", "அரங்க", "வேங்கட", "கண்ணன்", "சங்கு", "ஆழி", "பல்லாண்டு", "Krishna", "lotus"];

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      setResults((await res.json()).results);
      setLoading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-center text-4xl text-maroon">பாசுரத் தேடல்</h1>
      <p className="mt-2 text-center text-muted">தமிழ்ச் சொல், ஆங்கிலச் சொல் அல்லது பாசுர எண் (1–4000)</p>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="எ.கா. நாராயண, அரங்கம், 474"
        className="verse mt-6 w-full rounded-full border-2 border-orange-200 bg-white px-6 py-3 text-lg outline-none focus:border-saffron"
      />
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => setQ(s)} className="rounded-full bg-orange-50 px-3 py-1 text-sm text-maroon hover:bg-orange-100">
            {s}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">{loading ? "தேடுகிறது…" : q && `${results.length}${results.length === 60 ? "+" : ""} முடிவுகள்`}</p>
      <ul className="mt-2 space-y-2">
        {results.map((r) => (
          <li key={r.n}>
            <Link href={`/pasuram/${r.n}`} className="card flex items-center justify-between gap-4 p-4 hover:border-saffron">
              <span className="min-w-0">
                <span className="text-xs text-muted">
                  {r.prabandham} · {r.ref}
                </span>
                <span className="verse block truncate text-ink">{r.first}</span>
              </span>
              <span className="font-num shrink-0 text-saffron">#{r.n}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
