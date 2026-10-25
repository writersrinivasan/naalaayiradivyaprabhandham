"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PREFS_KEY = "naalayiram.reader";
const LAST_KEY = "naalayiram.lastRead";
const READ_KEY = "naalayiram.readSet";
const TOTAL = 4108;

interface Prefs {
  size: number;
  english: boolean;
}

export interface LastRead {
  n: number;
  slug: string;
  name: string;
  ref: string;
  href: string;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable
  }
}

/** Verses already read, kept as a bitset (one bit per verse number) so it stays tiny. */
function loadReadSet(): Uint8Array {
  const bits = new Uint8Array(Math.ceil((TOTAL + 1) / 8));
  try {
    const raw = localStorage.getItem(READ_KEY);
    if (raw) bits.set(Uint8Array.from(atob(raw), (c) => c.charCodeAt(0)).slice(0, bits.length));
  } catch {
    // corrupt or unavailable: start fresh
  }
  return bits;
}

function saveReadSet(bits: Uint8Array) {
  try {
    localStorage.setItem(READ_KEY, btoa(String.fromCharCode(...bits)));
  } catch {
    // ignore
  }
}

const countBits = (bits: Uint8Array) => bits.reduce((s, b) => s + popcount(b), 0);

function popcount(b: number) {
  let c = 0;
  for (; b; b >>= 1) c += b & 1;
  return c;
}

function applyPrefs(p: Prefs) {
  document.documentElement.style.setProperty("--reader-size", `${p.size}px`);
  document.documentElement.classList.toggle("reader-hide-en", !p.english);
}

/** Sticky toolbar: font size and English toggle, remembered per browser. */
export function ReaderToolbar({ hasEnglish }: { hasEnglish: boolean }) {
  const [prefs, setPrefs] = useState<Prefs>({ size: 21, english: true });

  useEffect(() => {
    const p = readJson<Prefs>(PREFS_KEY, { size: 21, english: true });
    setPrefs(p);
    applyPrefs(p);
  }, []);

  function update(next: Partial<Prefs>) {
    const p = { ...prefs, ...next };
    setPrefs(p);
    applyPrefs(p);
    writeJson(PREFS_KEY, p);
  }

  return (
    <div className="flex items-center gap-2 print:hidden">
      <button onClick={() => update({ size: Math.max(15, prefs.size - 2) })} className="h-9 w-9 rounded-full bg-white text-sm ring-1 ring-line hover:bg-orange-50" aria-label="எழுத்தைச் சிறிதாக்கு">
        அ-
      </button>
      <span className="font-num w-8 text-center text-sm text-muted">{prefs.size}</span>
      <button onClick={() => update({ size: Math.min(34, prefs.size + 2) })} className="h-9 w-9 rounded-full bg-white text-base ring-1 ring-line hover:bg-orange-50" aria-label="எழுத்தைப் பெரிதாக்கு">
        அ+
      </button>
      {hasEnglish && (
        <button
          onClick={() => update({ english: !prefs.english })}
          className={`rounded-full px-3 py-1.5 text-sm ring-1 ${prefs.english ? "bg-peacock text-white ring-peacock" : "bg-white text-ink ring-line"}`}
        >
          English {prefs.english ? "✓" : ""}
        </button>
      )}
    </div>
  );
}

/** Marks verses as read when they have been on screen, and remembers where the reader stopped. */
export function ReadingTracker({ slug, name, basePath }: { slug: string; name: string; basePath: string }) {
  useEffect(() => {
    const bits = loadReadSet();
    let dirty = false;
    const timers = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            // Count a verse as read after it has stayed in view for a moment.
            timers.set(
              el,
              window.setTimeout(() => {
                const n = Number(el.dataset.n);
                bits[n >> 3] |= 1 << (n & 7);
                dirty = true;
                writeJson(LAST_KEY, { n, slug, name, ref: el.dataset.ref ?? "", href: `${basePath}#p-${n}` } satisfies LastRead);
              }, 1500),
            );
          } else {
            clearTimeout(timers.get(el));
            timers.delete(el);
          }
        }
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-n]").forEach((el) => observer.observe(el));
    const flush = window.setInterval(() => dirty && (saveReadSet(bits), (dirty = false)), 3000);

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearTimeout(t));
      clearInterval(flush);
      if (dirty) saveReadSet(bits);
    };
  }, [slug, name, basePath]);
  return null;
}

/** "Continue reading" card plus overall progress, for the reader index. */
export function ContinueReading() {
  const [last, setLast] = useState<LastRead | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_KEY);
      if (raw) setLast(JSON.parse(raw));
    } catch {
      // ignore
    }
    setCount(countBits(loadReadSet()));
  }, []);

  const pct = Math.min(100, (count / 4000) * 100);
  return (
    <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <p className="text-sm font-semibold text-saffron">உங்கள் வாசிப்புப் பயணம்</p>
        <p className="font-num mt-1 text-3xl font-bold text-maroon">
          {count.toLocaleString("ta-IN")} <span className="text-base font-normal text-muted">/ 4000 பாசுரங்கள் படித்தீர்கள்</span>
        </p>
        <div className="mt-3 h-3 rounded-full bg-orange-100">
          <div className="h-3 rounded-full bg-gradient-to-r from-vermilion to-saffron" style={{ width: `${Math.max(pct, count ? 1 : 0)}%` }} />
        </div>
        <p className="mt-1 text-xs text-muted">இந்த உலாவியில் மட்டும் சேமிக்கப்படுகிறது</p>
      </div>
      {last ? (
        <Link href={last.href} className="rounded-2xl bg-maroon px-5 py-3 text-center text-white hover:bg-vermilion">
          <span className="block text-xs text-white/80">தொடர்ந்து படிக்க</span>
          <span className="font-display text-lg">
            {last.name} {last.ref}
          </span>
        </Link>
      ) : (
        <Link href="/read/thiruppallandu" className="rounded-2xl bg-maroon px-5 py-3 text-center text-white hover:bg-vermilion">
          <span className="block text-xs text-white/80">தொடங்க</span>
          <span className="font-display text-lg">திருப்பல்லாண்டு 1</span>
        </Link>
      )}
    </div>
  );
}

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-maroon ring-1 ring-line hover:bg-orange-50 print:hidden">
      🖨️ அச்சிடு
    </button>
  );
}
