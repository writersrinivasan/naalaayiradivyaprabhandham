import type { Pasuram } from "@/lib/data";

/** One pasuram in reading layout (plain <a>, not next/link: thousands of these render at once): number, Tamil lines, optional English (toggled by the reader toolbar). */
export function VerseBlock({ v, color, showEnglish = true }: { v: Pasuram; color: string; showEnglish?: boolean }) {
  return (
    <article id={`p-${v.n}`} data-n={v.n} data-ref={v.ref} className="verse-block scroll-mt-32 border-b border-line/70 py-6 last:border-0">
      <div className="mb-2 flex items-baseline gap-3">
        <a href={`/pasuram/${v.n}`} className="font-num rounded-full px-2.5 py-0.5 text-xs text-white print:text-[8pt]" style={{ background: color }}>
          {v.n <= 4000 ? v.n : `+${v.n - 4000}`}
        </a>
        <span className="font-num text-sm text-muted">{v.ref}</span>
        {v.pann && <span className="text-xs text-violet-700">பண்: {v.pann}</span>}
      </div>
      <div className="verse reader-verse text-ink">
        {v.ta.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
      {showEnglish && v.en.length > 0 && (
        <div className="reader-en mt-2 border-l-2 border-orange-200 pl-3 text-[0.92rem] italic leading-7 text-ink/70 print:text-[8.5pt] print:leading-snug">
          {v.en.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      )}
    </article>
  );
}
