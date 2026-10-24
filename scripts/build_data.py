"""
Build the 4000-pasuram dataset for the web app.

Sources (download them yourself, see README):
  --tei   clone of https://github.com/UHH-Tamilex/NalayiratTivviyapPirapantam
          (TEI XML: ISO-15919 text, English translation, word-by-word glossary)
  --xlsx  NDP&Thirumurai_without_pann_songs_10541.xlsx and
          NDP&Thirumurai_with_pann_songs_6180.xlsx from
          https://github.com/raghuyennamalli/NDP_Pann_Prediction (Tamil script text + pann)

Usage:
  python3 scripts/build_data.py --tei <dir> --pann <with_pann.xlsx> --nopann <without_pann.xlsx> --out data
"""

import argparse
import json
import os
import re
import unicodedata
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict

import pandas as pd

TEI = "{http://www.tei-c.org/ns/1.0}"
XML_LANG = "{http://www.w3.org/XML/1998/namespace}lang"

# (slug, Hamburg file prefix, global start number, expected count)
PRABANDHAMS = [
    ("thiruppallandu", "PaLTPA", 1, 12),
    ("periyazhwar-thirumozhi", "PaLTM", 13, 461),
    ("thiruppavai", "TPa", 474, 30),
    ("nachiyar-thirumozhi", "NTM", 504, 143),
    ("perumal-thirumozhi", "PeruTM", 647, 105),
    ("thiruchanda-viruttam", "TCV", 752, 120),
    ("thirumalai", "TMaL", 872, 45),
    ("thiruppalliyezhuchi", "TPal", 917, 10),
    ("amalanadhipiran", "AAP", 927, 10),
    ("kanninun-siruthambu", "KC", 937, 11),
    ("periya-thirumozhi", "PTM", 948, 1084),
    ("thirukkurunthandakam", "TKT", 2032, 20),
    ("thirunedunthandakam", "TNT", 2052, 30),
    ("mudhal-thiruvandhadi", "MTA", 2082, 100),
    ("irandam-thiruvandhadi", "ITA", 2182, 100),
    ("moondram-thiruvandhadi", "MuTA", 2282, 100),
    ("nanmugan-thiruvandhadi", "NMT", 2382, 96),
    ("thiruviruttam", "TV", 2478, 100),
    ("thiruvasiriyam", "TaC", 2578, 7),
    ("periya-thiruvandhadi", "PTA", 2585, 87),
    ("thiruvezhukootrirukkai", "TEI", 2672, 1),
    ("siriya-thirumadal", "CM", 2673, 78),
    ("periya-thirumadal", "PM", 2751, 148),
    ("thiruvaymozhi", "TVM", 2899, 1102),
    ("ramanuja-nootrandhadi", "INA", 4001, 108),
]

# ---------------------------------------------------------------- ISO 15919 -> Tamil

VOWELS = {
    "ai": ("ஐ", "ை"), "au": ("ஔ", "ௌ"),
    "a": ("அ", ""), "ā": ("ஆ", "ா"), "i": ("இ", "ி"), "ī": ("ஈ", "ீ"),
    "u": ("உ", "ு"), "ū": ("ஊ", "ூ"), "e": ("எ", "ெ"), "ē": ("ஏ", "ே"),
    "o": ("ஒ", "ொ"), "ō": ("ஓ", "ோ"),
}
CONSONANTS = {
    "kṣ": "க்ஷ", "k": "க", "ṅ": "ங", "c": "ச", "ñ": "ஞ", "ṭ": "ட", "ṇ": "ண",
    "t": "த", "n": "ந", "p": "ப", "m": "ம", "y": "ய", "r": "ர", "l": "ல",
    "v": "வ", "ḻ": "ழ", "ḷ": "ள", "ṟ": "ற", "ṉ": "ன", "j": "ஜ", "ṣ": "ஷ",
    "s": "ஸ", "h": "ஹ", "ś": "ஶ",
}
PULLI = "்"


def to_tamil(text: str) -> str:
    s = unicodedata.normalize("NFC", text).lower()
    out = []
    i = 0
    while i < len(s):
        if s[i] == "ḵ":
            out.append("ஃ")
            i += 1
            continue
        cons = next((c for c in ("kṣ",) if s.startswith(c, i)), None) or (s[i] if s[i] in CONSONANTS else None)
        if cons:
            i += len(cons)
            vow = next((v for v in ("ai", "au") if s.startswith(v, i)), None) or (s[i] if i < len(s) and s[i] in VOWELS else None)
            if vow:
                out.append(CONSONANTS[cons] + VOWELS[vow][1])
                i += len(vow)
            else:
                out.append(CONSONANTS[cons] + PULLI)
            continue
        vow = next((v for v in ("ai", "au") if s.startswith(v, i)), None) or (s[i] if s[i] in VOWELS else None)
        if vow:
            out.append(VOWELS[vow][0])
            i += len(vow)
            continue
        out.append(s[i])
        i += 1
    return "".join(out)


def clean_line(line: str) -> str:
    line = line.replace("–", " ").replace("\t", " ")
    line = re.sub(r"[.;,]+\s*$", "", line.strip())
    return re.sub(r"\s+", " ", line).strip()


# ---------------------------------------------------------------- tagging lexicon
# Substrings matched against the Tamil text with spaces removed.

PLACES = {
    "திருவரங்கம்": ["அரங்க", "அரங்கத்", "அரங்கன்", "அரங்கம்"],
    "திருவேங்கடம்": ["வேங்கட"],
    "திருக்குருகூர் (ஆழ்வார்திருநகரி)": ["குருகூர்"],
    "திருமாலிருஞ்சோலை": ["இருஞ்சோலை", "மாலிருஞ்"],
    "திருக்கோட்டியூர்": ["கோட்டியூர்"],
    "திருக்குடந்தை": ["குடந்தை"],
    "அயோத்தி": ["அயோத்தி", "அயோத்தியை"],
    "வடமதுரை": ["வடமதுரை", "மதுரைப்பிறந்த", "மதுரையார்"],
    "துவாரகை": ["துவரை", "துவாரகை"],
    "திருக்கண்ணபுரம்": ["கண்ணபுர"],
    "திருக்கச்சி (காஞ்சி)": ["கச்சி", "அத்தியூர்", "வெஃகா"],
    "திருநாங்கூர்": ["நாங்கூர்"],
    "தஞ்சை மாமணிக்கோயில்": ["தஞ்சை"],
    "திருக்கடல்மல்லை": ["கடல்மல்லை", "மல்லைத்"],
    "திருமெய்யம்": ["மெய்யம்", "மெய்யத்"],
    "திருமோகூர்": ["மோகூர்"],
    "திருக்குறுங்குடி": ["குறுங்குடி"],
    "ஸ்ரீவில்லிபுத்தூர்": ["வில்லிபுத்தூர்", "புதுவை"],
    "திருவல்லிக்கேணி": ["அல்லிக்கேணி"],
    "திருநீர்மலை": ["நீர்மலை"],
    "திருப்பாற்கடல்": ["பாற்கடல்"],
    "பரமபதம் (வைகுந்தம்)": ["வைகுந்த", "வைகுண்ட", "பரமபத"],
    "திருவாலி": ["திருவாலி", "வயலாலி"],
    "திருவிந்தளூர்": ["இந்தளூர்"],
    "திருச்சேறை": ["சேறை"],
    "திருவெள்ளறை": ["வெள்ளறை"],
    "திருக்கோவலூர்": ["கோவலூர்"],
    "திருவிடவெந்தை": ["இடவெந்தை"],
    "திருப்புல்லாணி": ["புல்லாணி"],
    "திருத்தண்கா": ["தண்கா"],
    "திருவேளுக்கை": ["வேளுக்கை"],
    "திருப்பேர்நகர்": ["பேர்நகர்", "திருப்பேர்"],
    "திருக்கண்ணங்குடி": ["கண்ணங்குடி"],
    "திருநறையூர்": ["நறையூர்"],
    "திருவிண்ணகர்": ["விண்ணகர்"],
    "திருவனந்தபுரம்": ["அனந்தபுர"],
    "திருக்காட்கரை": ["காட்கரை"],
    "திருவாறன்விளை": ["ஆறன்விளை"],
    "திருமூழிக்களம்": ["மூழிக்கள"],
    "திருவண்வண்டூர்": ["வண்வண்டூர்"],
    "திருப்புலியூர்": ["புலியூர்"],
    "திருச்செங்குன்றூர்": ["செங்குன்றூர்"],
    "திருவல்லவாழ்": ["வல்லவாழ்"],
    "திருக்கடித்தானம்": ["கடித்தான"],
    "திருக்குளந்தை": ["குளந்தை"],
    "தொலைவில்லிமங்கலம்": ["தொலைவில்லி"],
    "வானமாமலை (சிரீவரமங்கை)": ["வரமங்கை"],
    "திருப்புளிங்குடி": ["புளிங்குடி"],
    "தென்திருப்பேரை": ["திருப்பேரை"],
    "திருக்கோளூர்": ["கோளூர்"],
    "நைமிசாரண்யம்": ["நைமிச"],
    "சாளக்கிராமம்": ["சாளக்கிராம"],
    "வதரி (பத்ரிநாத்)": ["வதரி", "பதரி"],
    "சிங்கவேழ்குன்றம் (அஹோபிலம்)": ["சிங்கவேழ்", "சிங்கவேள்"],
    "திருவெவ்வுள்": ["எவ்வுள்"],
    "திருநின்றவூர்": ["நின்றவூர்"],
    "திருக்கடிகை (சோளிங்கர்)": ["கடிகை"],
    "திருப்புட்குழி": ["புட்குழி"],
    "திருவூரகம்": ["ஊரகத்"],
    "திருப்பாடகம்": ["பாடகத்"],
    "திருக்குடமூக்கு": ["குடமூக்கு"],
    "திருக்கூடலூர்": ["கூடலூர்"],
    "திருவழுந்தூர்": ["அழுந்தூர்"],
    "திருச்சித்திரகூடம்": ["சித்திரகூட"],
    "திருக்கண்ணமங்கை": ["கண்ணமங்கை"],
}

STORIES = {
    "இராமாவதாரம்": ["இராம", "இராகவ", "இலங்கை", "இராவண", "அரக்கர்", "சீதை", "காகுத்த", "தசரத", "அனுமன்", "இலக்குமண", "வாலியை", "சிலைவளைத்"],
    "கிருஷ்ணாவதாரம்": ["கண்ணன்", "கண்ணனை", "கண்ணா", "யசோதை", "அசோதை", "நந்தகோப", "ஆயர்", "ஆய்ச்சி", "கோவிந்த", "கோபால", "தேவகி", "வெண்ணெய்", "கஞ்சன்", "கம்சன்", "பூதனை", "பேய்ச்சி", "குழலூ", "ஆநிரை", "குன்றெடுத்", "குன்றுகுடை", "காளிய", "சகட", "மருதிடை", "உரலோடு", "நப்பின்னை"],
    "மகாபாரதம்": ["பாரத", "பாண்டவ", "பார்த்த", "ஐவர்க்", "துரியோதன", "நூற்றுவர்"],
    "நரசிம்மாவதாரம்": ["நரசிங்க", "அரியுரு", "இரணிய", "பிரகலாத", "ஆளரி"],
    "வாமன / திரிவிக்கிரமாவதாரம்": ["வாமன", "குறளுரு", "குறளாய்", "மாவலி", "உலகளந்த", "மூவடி", "ஈரடி", "திரிவிக்கிரம", "உலகமளந்த"],
    "வராகாவதாரம்": ["ஏனமாய்", "ஏனமாகி", "வராக", "கேழலாய்", "மண்ணிடந்த", "இடந்திட்ட"],
    "மச்சாவதாரம்": ["மீனாய்", "மச்ச"],
    "கூர்மாவதாரம்": ["ஆமையாய்", "கூர்ம"],
    "பரசுராமாவதாரம்": ["மழுவா", "பரசுராம"],
    "கஜேந்திர மோட்சம்": ["முதலை", "கஜேந்திர", "வேழத்துக்", "களிற்றுக்கருள்"],
    "பாற்கடல் கடைதல்": ["கடல்கடைந்த", "கடைந்த", "மந்தர"],
    "அனந்தசயனம் (பாம்பணை)": ["பாம்பணை", "அரவணை", "நாகணை", "பைந்நாக", "அரவினணை", "பாம்பின்மேல்"],
}

SYMBOLS = {
    "சங்கு (பாஞ்சசன்யம்)": ["சங்கு", "சங்கம்", "சங்கொடு", "சங்கேந்", "வலம்புரி", "பாஞ்சசன்ய", "சங்கினோ"],
    "சக்கரம் (சுதர்சனம்)": ["சக்கர", "ஆழியான்", "ஆழியங்கை", "ஆழிவலவ", "நேமி", "திகிரி", "சுதரிசன"],
    "சார்ங்கம் (வில்)": ["சார்ங்க", "சாரங்க"],
    "கருடன்": ["கருட", "புள்ளரைய", "புள்ளூர்", "கலுழ", "புள்ளேறி"],
    "திருமகள்": ["திருமகள்", "மலர்மகள்", "பூமகள்", "திருமார்ப", "அலர்மேல்மங்கை", "மலர்மங்கை"],
    "பூமிதேவி": ["நிலமகள்", "மண்மகள்"],
}

NAMES = ["நாராயண", "கேசவ", "மாதவ", "கோவிந்த", "மதுசூத", "திரிவிக்கிரம", "வாமன", "சிரீதர", "இருடீகேச", "பற்பநாப", "தாமோதர"]


VOWEL_SIGN = {"அ": "", "ஆ": "ா", "இ": "ி", "ஈ": "ீ", "உ": "ு", "ஊ": "ூ", "எ": "ெ", "ஏ": "ே", "ஐ": "ை", "ஒ": "ொ", "ஓ": "ோ"}
CONS = "[க-ஹ]"


def key_pattern(key):
    """In sandhi-joined text a word-initial vowel merges with the previous consonant
    (நீண்மதிள் + அரங்கம் -> நீண்மதி ளரங்கம்), so also accept consonant + vowel sign."""
    v, rest = key[0], re.escape(key[1:])
    if v not in VOWEL_SIGN:
        return re.escape(key)
    sign = VOWEL_SIGN[v]
    # அ has no sign: the joined form is a bare consonant directly before the rest of the key
    return f"(?:{v}|{CONS}{sign}){rest}" if sign else f"(?:{v}|(?<={CONS})){rest}"


def compile_table(table):
    return {k: re.compile("|".join(key_pattern(x) for x in keys)) for k, keys in table.items()}


PLACE_RE, STORY_RE, SYMBOL_RE = compile_table(PLACES), compile_table(STORIES), compile_table(SYMBOLS)


def tag(tamil_lines):
    flat = "".join(tamil_lines).replace(" ", "")
    hit = lambda table: [k for k, rx in table.items() if rx.search(flat)]
    names = {n: flat.count(n) for n in NAMES if n in flat}
    return {"places": hit(PLACE_RE), "stories": hit(STORY_RE), "symbols": hit(SYMBOL_RE), "names": names}


# ---------------------------------------------------------------- TEI parsing


def num_key(name, prefix):
    rest = name[len(prefix):].replace(".xml", "").replace("xml", "")
    return [int(x) for x in rest.split(".") if x]


def text_without_notes(el):
    """Text of an element, skipping editorial <note>s (but keeping the text that follows them)."""
    parts = [el.text or ""]
    for child in el:
        if child.tag != TEI + "note":
            parts.append(text_without_notes(child))
        parts.append(child.tail or "")
    return "".join(parts)


def lg_lines(lg):
    lines = (clean_line(text_without_notes(l)) for l in lg.iter(TEI + "l"))
    return [l for l in lines if l]


def parse_tei(path):
    root = ET.parse(path).getroot()
    ta, en = [], []
    for lg in root.iter(TEI + "lg"):
        if lg.get(XML_LANG) == "en":
            en = lg_lines(lg)
        elif not ta:
            ta = lg_lines(lg)
    gloss = []
    for so in root.iter(TEI + "standOff"):
        for entry in so.iter(TEI + "entry"):
            form = next((f for f in entry.findall(TEI + "form") if f.get("type") is None), None)
            d = entry.find(TEI + "def")
            if form is None:
                continue
            word = "".join(form.itertext()).replace("-", "").strip()
            roles = [g.text for g in entry.iter(TEI + "gram") if g.text]
            gloss.append([to_tamil(word), (d.text or "").strip() if d is not None else "", ", ".join(roles)])
    return ta, en, gloss


def chunk(lines, size, count):
    """Split lines into `count` units of `size` lines; the last unit takes the remainder."""
    units = [lines[i * size:(i + 1) * size] for i in range(count - 1)]
    units.append(lines[(count - 1) * size:])
    return units


def proportional(lines, count):
    if not lines:
        return [[] for _ in range(count)]
    return [lines[round(i * len(lines) / count):round((i + 1) * len(lines) / count)] for i in range(count)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tei", required=True)
    ap.add_argument("--pann", required=True)
    ap.add_argument("--nopann", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()

    files = os.listdir(a.tei)
    pann_df = pd.read_excel(a.pann)
    nopann_df = pd.read_excel(a.nopann)
    os.makedirs(os.path.join(a.out, "pasurams"), exist_ok=True)

    index = []
    stats = {"stories": Counter(), "symbols": Counter(), "places": Counter(), "names": Counter(), "pann": Counter(),
             "byPrabandham": {}}

    for slug, prefix, start, expected in PRABANDHAMS:
        verses = []  # dicts without n
        if slug in ("siriya-thirumadal", "periya-thirumadal"):
            ta, en, _ = parse_tei(os.path.join(a.tei, "CM.xml" if prefix == "CM" else "PM1.xml"))
            tam = [to_tamil(l) for l in ta]
            for i, (t, e) in enumerate(zip(chunk(tam, 2, expected), proportional(en, expected))):
                verses.append({"ref": f"கண்ணி {i + 1}", "ta": t, "en": e, "gloss": []})
        elif slug == "ramanuja-nootrandhadi":
            for i in range(108):
                song = nopann_df.song[2827 + i]
                verses.append({"ref": str(i + 1), "ta": [clean_line(x) for x in song.split("\n") if x.strip()], "en": [], "gloss": []})
        else:
            # Prefixes like TV vs TVM / TPa vs TPal: require the char after the prefix to be a digit
            names = [f for f in files if re.match(re.escape(prefix.lower()) + r"[0-9]", f.lower())]
            if prefix == "TEI":
                names = ["TEI.xml"]
            names = sorted(names, key=lambda f: num_key(f, prefix))
            hamburg = {}
            for f in names:
                ta, en, gloss = parse_tei(os.path.join(a.tei, f))
                ref = ".".join(str(x) for x in num_key(f, prefix)) or "1"
                hamburg[ref] = {"ref": ref, "ta": [to_tamil(l) for l in ta], "en": en, "gloss": gloss}
            if slug == "thiruvaymozhi":
                # Hamburg covers pathus 1-5 (552 verses); 6-10 come from the xlsx, whose rows 0-1101 are TVM in order
                verses = [None] * 1102
                refs = list(hamburg.keys())
                for i, ref in enumerate(refs):
                    verses[i] = hamburg[ref]
                for i in range(len(refs), 1102):
                    k = i - 552
                    ref = f"{6 + k // 110}.{1 + (k % 110) // 11}.{1 + k % 11}"
                    song = pann_df.song[i]
                    verses[i] = {"ref": ref, "ta": [clean_line(x) for x in song.split("\n") if x.strip()], "en": [], "gloss": []}
                for i in range(1102):
                    verses[i]["pann"] = str(pann_df.pann[i]).strip()
            else:
                verses = list(hamburg.values())

        assert len(verses) == expected, (slug, len(verses), expected)
        for j, v in enumerate(verses):
            v["n"] = start + j
            v.update(tag(v["ta"]))
            for key in ("stories", "symbols", "places"):
                stats[key].update(v[key])
            stats["names"].update(v["names"])
            if v.get("pann"):
                stats["pann"][v["pann"]] += 1
            index.append([v["n"], slug, v["ref"], v["ta"][0] if v["ta"] else "", bool(v["en"])])
        stats["byPrabandham"][slug] = {
            "count": expected,
            "withTranslation": sum(1 for v in verses if v["en"]),
            "stories": Counter(s for v in verses for s in v["stories"]).most_common(),
            "places": Counter(s for v in verses for s in v["places"]).most_common(12),
        }
        ordered = [{"n": v["n"], **{k: v[k] for k in v if k != "n"}} for v in verses]
        with open(os.path.join(a.out, "pasurams", f"{slug}.json"), "w", encoding="utf-8") as fh:
            json.dump(ordered, fh, ensure_ascii=False, separators=(",", ":"))
        print(f"{slug:28s} {expected:5d}  translated={stats['byPrabandham'][slug]['withTranslation']}")

    leftovers = Counter(ch for row in index for ch in row[3] if "a" <= ch <= "z" or ch in "āīūēōṉṟḷḻṇṭṅñ")
    if leftovers:
        print("WARNING untransliterated characters:", leftovers)

    with open(os.path.join(a.out, "index.json"), "w", encoding="utf-8") as fh:
        json.dump(index, fh, ensure_ascii=False, separators=(",", ":"))
    out_stats = {k: (v.most_common() if isinstance(v, Counter) else v) for k, v in stats.items()}
    with open(os.path.join(a.out, "stats.json"), "w", encoding="utf-8") as fh:
        json.dump(out_stats, fh, ensure_ascii=False, indent=1)
    print("total", len(index), "| core 4000:", sum(1 for r in index if r[0] <= 4000))


if __name__ == "__main__":
    main()
