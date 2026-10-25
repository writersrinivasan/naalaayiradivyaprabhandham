# நாலாயிர திவ்ய பிரபந்தம் — Naalaayira Divya Prabandham

A Next.js 15 web app for all 4000 pasurams of the twelve Azhwars, plus Ramanuja Nootrandhadi (108), in Tamil script, with:

- English translation and a word-by-word glossary for about 3,450 verses
- Tamil life stories of every Azhwar (`src/content/azhwars.ts`)
- A full reader at `/read` for all 4000 pasurams. It has adjustable text size, an English on/off toggle, "continue reading", and a progress count of verses read. Progress is stored in the browser.
- Downloadable PDFs: one per prabandham (Tamil + English) and the complete book (Tamil)
- Infographics for the whole collection: verses per Azhwar and prabandham, Divya Desams, avatars, the twelve names, Thiruvaymozhi panns, sangu and chakram mentions
- A **LangGraph** agent on every pasuram page that uses a Groq-hosted model, with a key each visitor brings (BYOK), to write a Tamil பொழிப்புரை, பதவுரை and விளக்கவுரை, and to produce emotion and theme meters, story context, characters, places, a short lesson and a quiz

## Run

```bash
npm install
npm run dev                  # http://localhost:3000
```

### AI commentary: bring your own Groq key

On any pasuram page, open **🔑 Groq API key (BYOK)**, paste a key from <https://console.groq.com/keys>, and click **சரிபார்த்துச் சேமி** (verify and save). The app checks the key against Groq's model list and loads the models into a picker. The default model is `openai/gpt-oss-120b`.

- The key is stored only in that browser's `localStorage`.
- It is sent to this app's `/api/agent` route in the `x-groq-api-key` header, used for that one request, and never written to disk or logged.
- Optionally, set `GROQ_API_KEY` (and `GROQ_MODEL`) in `.env.local` to give visitors who have no key of their own a server-side fallback.

Without a key, the agent skips the model step and shows only the word-level analysis.

## The agent (`src/lib/agent/graph.ts`)

```
START → retrieve → analyze ─┬─(API key)→ interpret → review ─┬─(issues, < 2 tries)→ interpret
                            └─(no key)──────────────→ compose ←┘
                                                        ↓
                                                       END
```

| Node | Job |
|---|---|
| retrieve | Loads the verse, the verses before and after it, the prabandham and the Azhwar |
| analyze | Deterministic: grammar profile from the glossary, proper names, places, avatars, symbols |
| interpret | Calls Groq: strict JSON-schema output on `gpt-oss` models, JSON mode on others. The response is validated with the Zod schema |
| review | Checks the output is in Tamil and every field is filled. If not, it sends the issues back to `interpret` |
| compose | Merges everything into the infographic payload |

`/api/agent` streams each step as NDJSON so the UI can show the pipeline as it runs. Results are cached in `data/ai-cache/`.

## Data (`data/`)

`scripts/build_data.py` builds the dataset from:

- [UHH-Tamilex/NalayiratTivviyapPirapantam](https://github.com/UHH-Tamilex/NalayiratTivviyapPirapantam): TEI XML with the text in ISO-15919 (converted to Tamil script), English translation and glossary
- [raghuyennamalli/NDP_Pann_Prediction](https://github.com/raghuyennamalli/NDP_Pann_Prediction): Thiruvaymozhi 6–10, Ramanuja Nootrandhadi, and the Thiruvaymozhi panns

```bash
git clone https://github.com/UHH-Tamilex/NalayiratTivviyapPirapantam /tmp/ndp
# download the two xlsx files from NDP_Pann_Prediction/Data
python3 scripts/build_data.py --tei /tmp/ndp --pann <with_pann.xlsx> --nopann <without_pann.xlsx> --out data
```

Numbering follows the standard 1–4000 scheme. The two Thirumadals are split into couplets (78 + 148). Ramanuja Nootrandhadi is numbered 4001–4108. Places, avatars and symbols are detected by keyword matching, so their counts are approximate.

Neither source repository states a license. Check with the authors before you publish this data.

## PDFs (`public/pdf/`)

Most PDF libraries misplace Tamil vowel signs (ெ, ே, ை), so the PDFs are printed from the reader pages with headless Chrome instead. The print stylesheet adds a cover page, page numbers and A4 layout. To regenerate them after changing the data or the layout:

```bash
NEXT_DIST_DIR=.next-pdf npm run build
NEXT_DIST_DIR=.next-pdf npx next start -p 3123 &
node scripts/build_pdfs.mjs --base http://localhost:3123          # all 26 files
node scripts/build_pdfs.mjs --base http://localhost:3123 --only thiruppavai
```

The script looks for Chrome in the usual locations, or in `CHROME_PATH` if you set it. The separate `NEXT_DIST_DIR` lets this production server run alongside `npm run dev`. Every reader page also has a print button (அச்சிடு), so visitors can save any section as a PDF from their browser.
