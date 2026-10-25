/**
 * Hand gestures (hastas) used in the Thiruppavai choreography, after the Abhinaya Darpana.
 * Shapes are schematic: each finger has a state, and the renderer draws it (see components/natyam/Hand.tsx).
 */

export type FingerState = "up" | "spread" | "fan" | "bent" | "curl" | "fold" | "touch" | "converge";
export type ThumbState = "in" | "out" | "up" | "across" | "touch" | "converge";

export interface HandShape {
  /** index, middle, ring, little */
  fingers: [FingerState, FingerState, FingerState, FingerState];
  thumb: ThumbState;
  /** Fingers bend forward at the tips, like a hood or a cupped palm. */
  cup?: boolean;
}

export interface PlacedHand {
  shape: HandShape;
  x: number;
  y: number;
  rotate?: number;
  mirror?: boolean;
  scale?: number;
}

export interface Hasta {
  id: string;
  name: string;
  sanskrit: string;
  kind: "asamyuta" | "samyuta";
  meaning: string;
  uses: string[];
  /** One hand for asamyuta; two placed hands for samyuta. */
  shape?: HandShape;
  pair?: PlacedHand[];
}

const S = (fingers: HandShape["fingers"], thumb: ThumbState, cup = false): HandShape => ({ fingers, thumb, cup });

export const SHAPES = {
  pataka: S(["up", "up", "up", "up"], "in"),
  tripataka: S(["up", "up", "bent", "up"], "in"),
  ardhapataka: S(["up", "up", "fold", "fold"], "in"),
  kartarimukha: S(["spread", "spread", "fold", "fold"], "across"),
  mayura: S(["up", "up", "touch", "up"], "touch"),
  ardhachandra: S(["up", "up", "up", "up"], "out"),
  arala: S(["curl", "up", "up", "up"], "in"),
  shukatunda: S(["curl", "up", "bent", "up"], "in"),
  mushti: S(["fold", "fold", "fold", "fold"], "across"),
  shikhara: S(["fold", "fold", "fold", "fold"], "up"),
  kapittha: S(["curl", "fold", "fold", "fold"], "up"),
  katakamukha: S(["touch", "touch", "spread", "spread"], "touch"),
  suchi: S(["up", "fold", "fold", "fold"], "across"),
  chandrakala: S(["up", "fold", "fold", "fold"], "out"),
  padmakosha: S(["spread", "spread", "spread", "spread"], "out", true),
  sarpashirsha: S(["up", "up", "up", "up"], "in", true),
  mrigashirsha: S(["fold", "fold", "fold", "up"], "up"),
  simhamukha: S(["spread", "touch", "touch", "spread"], "touch"),
  alapadma: S(["fan", "fan", "fan", "fan"], "out"),
  hamsasya: S(["touch", "spread", "spread", "spread"], "touch"),
  hamsapaksha: S(["up", "up", "up", "spread"], "in"),
  mukula: S(["converge", "converge", "converge", "converge"], "converge"),
  bhramara: S(["curl", "touch", "spread", "spread"], "touch"),
} satisfies Record<string, HandShape>;

const asamyuta = (id: keyof typeof SHAPES, name: string, sanskrit: string, meaning: string, uses: string[]): Hasta => ({
  id,
  name,
  sanskrit,
  kind: "asamyuta",
  meaning,
  uses,
  shape: SHAPES[id],
});

const samyuta = (id: string, name: string, sanskrit: string, meaning: string, uses: string[], pair: PlacedHand[]): Hasta => ({
  id,
  name,
  sanskrit,
  kind: "samyuta",
  meaning,
  uses,
  pair,
});

export const HASTAS: Hasta[] = [
  asamyuta("pataka", "பதாகம்", "Pataka", "கொடி", ["நாட்டியத் தொடக்கம்", "மேகம், காடு, அலை, நதி", "கதவு திறத்தல் / மூடுதல்", "ஆசீர்வதித்தல்", "'வேண்டாம்' என மறுத்தல்"]),
  asamyuta("tripataka", "திரிபதாகம்", "Tripataka", "மூன்று பகுதிக் கொடி", ["மகுடம்", "மரம்", "தீபம், எழும் தீச்சுடர்", "இந்திரன்"]),
  asamyuta("ardhapataka", "அர்த்தபதாகம்", "Ardhapataka", "அரைக் கொடி", ["இலை", "கொடி (தோரணம்)", "கத்தி", "கோபுரம்", "இருவர்"]),
  asamyuta("kartarimukha", "கர்த்தரீமுகம்", "Kartarimukha", "கத்தரியின் முனை", ["பிரிவு", "கண்ணின் ஓரம்", "மின்னல்", "எதிர்ப்பு"]),
  asamyuta("mayura", "மயூரம்", "Mayura", "மயில்", ["மயில்", "கொடி (படரும் கொடி)", "நெற்றித் திலகம்", "கூந்தல் வருடுதல்"]),
  asamyuta("ardhachandra", "அர்த்தசந்திரம்", "Ardhachandra", "அரை நிலவு", ["அஷ்டமிச் சந்திரன்", "ஈட்டி", "பாத்திரம்", "இடுப்பில் கை"]),
  asamyuta("arala", "அராளம்", "Arala", "வளைந்தது", ["அமுதம் / நஞ்சு அருந்துதல்", "பெருங்காற்று"]),
  asamyuta("shukatunda", "சுகதுண்டம்", "Shukatunda", "கிளியின் அலகு", ["கிளி", "அம்பு எய்தல்", "ஈட்டி எறிதல்"]),
  asamyuta("mushti", "முஷ்டி", "Mushti", "கைமுட்டி", ["உறுதி, வீரம்", "மல்யுத்தம்", "பிடித்தல் (கயிறு, ஆயுதம்)", "பறை கொட்டுதல்"]),
  asamyuta("shikhara", "சிகரம்", "Shikhara", "சிகரம்", ["வில்", "காமன்", "தூண்", "கணவன்", "மணி அடித்தல்"]),
  asamyuta("kapittha", "கபித்தம்", "Kapittha", "விளாம்பழம்", ["லட்சுமி, சரஸ்வதி", "பசுவின் பால் கறத்தல்", "கண்ணுக்கு மை இடுதல்", "தூப தீபம் காட்டுதல்", "தாளம்"]),
  asamyuta("katakamukha", "கடகாமுகம்", "Katakamukha", "வளையின் வாய்", ["மலர் பறித்தல்", "மாலை அணிவித்தல்", "வில்லின் நாண் இழுத்தல்", "முத்து மாலை"]),
  asamyuta("suchi", "சூசி", "Suchi", "ஊசி", ["'ஒன்று'", "சுட்டிக் காட்டுதல்", "சூரியன், நட்சத்திரம்", "உலகம் சுழல்தல்"]),
  asamyuta("chandrakala", "சந்திரகலா", "Chandrakala", "பிறைக் கலை", ["பிறைச் சந்திரன்", "முகம்"]),
  asamyuta("padmakosha", "பத்மகோசம்", "Padmakosha", "தாமரை மொட்டு", ["தாமரை மொட்டு", "பழம்", "பந்து", "கலசம், நிறைகுடம்"]),
  asamyuta("sarpashirsha", "சர்ப்பசீர்ஷம்", "Sarpashirsha", "பாம்பின் தலை", ["பாம்பு (ஆதிசேஷன்)", "நீர் தெளித்தல்", "சந்தனம் பூசுதல்"]),
  asamyuta("mrigashirsha", "மிருகசீர்ஷம்", "Mrigashirsha", "மானின் தலை", ["மான்", "கண்ணனின் குழல்", "பெண்கள்", "கோலம் இடுதல்"]),
  asamyuta("simhamukha", "சிம்ஹமுகம்", "Simhamukha", "சிங்கத்தின் முகம்", ["சிங்கம், நரசிம்மர்", "ஹோமம்", "முத்து"]),
  asamyuta("alapadma", "அலபத்மம்", "Alapadma", "மலர்ந்த தாமரை", ["மலர்ந்த தாமரை", "முழு நிலவு", "அழகு", "வியப்பு", "வளையல் ஒலி (மணிக்கட்டுச் சுழற்சி)"]),
  asamyuta("hamsasya", "ஹம்சாஸ்யம்", "Hamsasya", "அன்னத்தின் அலகு", ["ஞானம் (சின் முத்திரை)", "மங்கல நாண்", "முத்து", "மெல்லிய பொருள்", "பறவையின் அலகு"]),
  asamyuta("hamsapaksha", "ஹம்சபக்ஷம்", "Hamsapaksha", "அன்னத்தின் இறகு", ["பறவையின் சிறகு", "அணைத்தல்", "எண் ஆறு"]),
  asamyuta("mukula", "முகுளம்", "Mukula", "மொட்டு", ["அல்லி மொட்டு (குவிதல்)", "உண்ணுதல்", "காமனின் ஐந்து மலர் அம்புகள்"]),
  asamyuta("bhramara", "பிரமரம்", "Bhramara", "வண்டு", ["வண்டு", "இறகு", "மலர் பறித்தல்", "யோகம்"]),

  samyuta("anjali", "அஞ்சலி", "Anjali", "வணக்கம்", ["தெய்வத்துக்குத் தலைமேல்", "குருவுக்கு முகத்தருகே", "அடியார்க்கு மார்பருகே"], [
    { shape: SHAPES.pataka, x: 52, y: 0, mirror: true },
    { shape: SHAPES.pataka, x: 68, y: 0 },
  ]),
  samyuta("shankha", "சங்கம்", "Shankha", "சங்கு", ["பெருமாளின் பாஞ்சசன்யம்", "சங்கு ஊதுதல்", "மங்கல ஒலி"], [
    { shape: SHAPES.shikhara, x: 46, y: -8, mirror: true },
    { shape: SHAPES.mushti, x: 66, y: 12, rotate: -10 },
  ]),
  samyuta("chakra", "சக்கரம்", "Chakra", "சக்கரம்", ["சுதர்சனச் சக்கரம்", "சுழற்சி"], [
    { shape: SHAPES.ardhachandra, x: 60, y: 6, rotate: 0 },
    { shape: SHAPES.ardhachandra, x: 60, y: 6, rotate: 90, mirror: true },
  ]),
  samyuta("matsya", "மத்ஸ்யம்", "Matsya", "மீன்", ["மீன் (கயல்)", "மச்சாவதாரம்"], [
    { shape: SHAPES.ardhachandra, x: 56, y: 10, rotate: 90 },
    { shape: SHAPES.ardhachandra, x: 64, y: 2, rotate: 90 },
  ]),
  samyuta("garuda", "கருடம்", "Garuda", "கருடன்", ["பெருமாளின் வாகனம் கருடன்", "பறவைகள்"], [
    { shape: SHAPES.ardhachandra, x: 40, y: 10, rotate: -65, mirror: true },
    { shape: SHAPES.ardhachandra, x: 80, y: 10, rotate: 65 },
  ]),
  samyuta("pushpaputa", "புஷ்பபுடம்", "Pushpaputa", "மலர்க் கூடை", ["மலர் அர்ப்பணம்", "நீர் அள்ளுதல்", "ஆரத்தி"], [
    { shape: SHAPES.sarpashirsha, x: 50, y: 4, rotate: -20, mirror: true },
    { shape: SHAPES.sarpashirsha, x: 70, y: 4, rotate: 20 },
  ]),
  samyuta("khatva", "கட்வா", "Khatva", "கட்டில்", ["கட்டில், மஞ்சம்", "பல்லக்கு"], [
    { shape: SHAPES.chandrakala, x: 46, y: 10, rotate: 180, mirror: true },
    { shape: SHAPES.chandrakala, x: 74, y: 10, rotate: 180 },
  ]),
  samyuta("karkata", "கர்க்கடம்", "Karkata", "நண்டு", ["கூட்டம் கூடுதல்", "உடலை முறித்தல்", "பிணைப்பு"], [
    { shape: SHAPES.pataka, x: 56, y: 4, rotate: 20, mirror: true },
    { shape: SHAPES.pataka, x: 64, y: 4, rotate: -20 },
  ]),
  samyuta("dola", "டோலா", "Dola", "ஊஞ்சல்", ["நாட்டியத் தொடக்கம்", "தொட்டில் ஆட்டுதல்", "சோர்வு"], [
    { shape: SHAPES.pataka, x: 36, y: 0, rotate: 180, mirror: true },
    { shape: SHAPES.pataka, x: 84, y: 0, rotate: 180 },
  ]),
];

export const hastaById = (id: string) => HASTAS.find((h) => h.id === id);
