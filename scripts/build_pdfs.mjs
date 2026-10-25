// Prints the reader pages to PDF with headless Chrome, which shapes Tamil script correctly
// (most PDF libraries misplace vowel signs such as ெ ே ை).
//
// Start the app first (npm run dev, or npm run build && npm start), then:
//   node scripts/build_pdfs.mjs [--base http://localhost:3000] [--only thiruppavai]
// Output: public/pdf/<slug>.pdf (Tamil + English) and public/pdf/naalayira-divya-prabandham.pdf (Tamil, whole book).

import { execFile } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const args = process.argv.slice(2);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const base = opt("--base", "http://localhost:3000").replace(/\/$/, "");
const only = opt("--only", null);

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.");
  process.exit(1);
}

const outDir = path.join(process.cwd(), "public", "pdf");
fs.mkdirSync(outDir, { recursive: true });
const slugs = fs
  .readdirSync(path.join(process.cwd(), "data", "pasurams"))
  .map((f) => f.replace(/\.json$/, ""))
  .sort();

const jobs = [
  ...slugs.map((slug) => ({ name: slug, url: `${base}/read/${slug}?full=1` })),
  { name: "naalayira-divya-prabandham", url: `${base}/read/all` },
].filter((j) => !only || j.name === only);

// A throwaway profile keeps the reader's saved preferences (e.g. English hidden) out of the PDFs.
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "ndp-pdf-"));

for (const job of jobs) {
  const out = path.join(outDir, `${job.name}.pdf`);
  const started = Date.now();
  await run(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      `--user-data-dir=${profile}`,
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=20000",
      `--print-to-pdf=${out}`,
      job.url,
    ],
    { timeout: 15 * 60_000, maxBuffer: 16 * 1024 * 1024 },
  );
  const mb = fs.statSync(out).size / 1024 / 1024;
  console.log(`${job.name.padEnd(28)} ${mb.toFixed(2).padStart(6)} MB  ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

fs.rmSync(profile, { recursive: true, force: true });
