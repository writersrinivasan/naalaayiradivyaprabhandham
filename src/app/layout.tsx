import type { Metadata } from "next";
import { Arima, Baloo_Thambi_2, Kavivanar, Mukta_Malar, Noto_Serif_Tamil } from "next/font/google";
import Link from "next/link";
import { Chakram, Naamam, Sangu } from "@/components/Emblem";
import "./globals.css";

const display = Arima({ subsets: ["tamil", "latin"], weight: ["500", "700"], variable: "--font-display" });
const body = Mukta_Malar({ subsets: ["tamil", "latin"], weight: ["400", "500", "700"], variable: "--font-body" });
const verse = Noto_Serif_Tamil({ subsets: ["tamil", "latin"], weight: ["400", "500", "600"], variable: "--font-verse" });
const hand = Kavivanar({ subsets: ["tamil", "latin"], weight: "400", variable: "--font-hand" });
const num = Baloo_Thambi_2({ subsets: ["tamil", "latin"], weight: ["600", "800"], variable: "--font-num" });

export const metadata: Metadata = {
  title: "நாலாயிர திவ்ய பிரபந்தம் | Naalaayira Divya Prabandham",
  description: "பன்னிரு ஆழ்வார்களின் 4000 பாசுரங்கள் — பொருள், கதைகள், AI தகவல் வரைபடங்கள்",
};

const NAV = [
  ["/", "முகப்பு"],
  ["/azhwars", "ஆழ்வார்கள்"],
  ["/prabandham", "பிரபந்தங்கள்"],
  ["/infographics", "தகவல் வரைபடம்"],
  ["/search", "தேடல்"],
] as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ta">
      <body className={`${display.variable} ${body.variable} ${verse.variable} ${hand.variable} ${num.variable} antialiased`}>
        <div className="temple-band" />
        <header className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex items-end">
                <Sangu className="h-7 w-7" />
                <Naamam className="h-9 w-9" />
                <Chakram className="h-7 w-7" spin={false} />
              </span>
              <span className="font-display text-lg font-bold leading-tight text-maroon sm:text-xl">
                நாலாயிர திவ்ய பிரபந்தம்
              </span>
            </Link>
            <nav className="hidden gap-1 md:flex">
              {NAV.map(([href, label]) => (
                <Link key={href} href={href} className="rounded-full px-3 py-1.5 text-sm font-medium text-ink hover:bg-orange-100 hover:text-maroon">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-2 md:hidden">
            {NAV.map(([href, label]) => (
              <Link key={href} href={href} className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-sm text-ink">
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="min-h-[70vh]">{children}</main>
        <footer className="mt-16 border-t border-line bg-gradient-to-b from-orange-50 to-amber-100">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted">
            <p className="font-hand text-xl text-maroon">“செந்தமிழ் பாடுவார் தேவர்கள் போற்றுவார்”</p>
            <p className="mt-4">
              மூலப் பாடம், ஆங்கில மொழிபெயர்ப்பு, சொல் அகராதி: University of Hamburg — TAMILEX{" "}
              <a className="text-peacock underline" href="https://github.com/UHH-Tamilex/NalayiratTivviyapPirapantam">
                NalayiratTivviyapPirapantam
              </a>
              . திருவாய்மொழி 6–10, இராமானுச நூற்றந்தாதி, பண் விவரங்கள்:{" "}
              <a className="text-peacock underline" href="https://github.com/raghuyennamalli/NDP_Pann_Prediction">
                NDP_Pann_Prediction
              </a>
              . தமிழ் விளக்கங்களை உங்கள் Groq key (BYOK) கொண்டு LangGraph முகவர் உருவாக்குகிறது — ஆன்றோர் உரைகளுடன் ஒப்பிட்டுப் படிக்கவும்.
            </p>
            <Link href="/about" className="mt-3 inline-block text-peacock underline">
              மூலங்கள் & முறைமை பற்றி
            </Link>
          </div>
          <div className="temple-band" />
        </footer>
      </body>
    </html>
  );
}
