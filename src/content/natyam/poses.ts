/** Stances (sthanaka / mandala) and the pose presets the choreography uses. */

export type Stance = "samapadam" | "aramandi" | "muzhumandi" | "tribhanga" | "ekapada" | "kick" | "walk" | "alidha" | "kneel" | "seated" | "recline";

export const STANCES: Record<Stance, { name: string; sanskrit: string; about: string }> = {
  samapadam: { name: "சமபாதம்", sanskrit: "Samapadam", about: "இரு பாதங்களும் சேர்ந்து நேராக நிற்கும் நிலை. அமைதி, வணக்கம், தொடக்கம்." },
  aramandi: { name: "அரைமண்டி", sanskrit: "Ardhamandali", about: "முழங்கால்களை இருபுறமும் விரித்து பாதி அமரும் நிலை — பரதநாட்டியத்தின் அடிப்படை. உடலுக்கு உறுதியும் வடிவியலும் தருவது." },
  muzhumandi: { name: "முழுமண்டி", sanskrit: "Purnamandali", about: "முழுமையாக அமர்ந்த மண்டி. சிங்கம், வீரம், தரையோடு தொடர்புடைய காட்சிகள்." },
  tribhanga: { name: "திரிபங்கம்", sanskrit: "Tribhanga", about: "மூன்று வளைவு — கழுத்து, இடுப்பு, முழங்கால். கால் குறுக்கிட்டு நிற்கும் கண்ணனின் குழலூதும் கோலம்." },
  ekapada: { name: "ஏகபாதம் (உயர் கால்)", sanskrit: "Urdhva Ekapada", about: "ஒரு காலில் நின்று மறுகாலை உயர்த்துதல் — உலகளந்த திரிவிக்கிரமன்." },
  kick: { name: "உதைக்கும் கால்", sanskrit: "Kuttana", about: "காலைப் பக்கவாட்டில் வீசுதல் — சகடாசுரனை உதைத்த கண்ணன்." },
  walk: { name: "நடை", sanskrit: "Gati", about: "முன்னோக்கிய அடி — செல்லுதல், அழைத்தல்." },
  alidha: { name: "ஆலீடம்", sanskrit: "Alidha", about: "வில்லாளியின் நிலை: ஒரு முழங்கால் வளைந்து, மறுகால் நீண்டு. இராமனின் வீரம்." },
  kneel: { name: "மண்டியிடுதல்", sanskrit: "Janu", about: "முழங்காலிட்டுப் பணிதல் — சரணாகதி, வணக்கம்." },
  seated: { name: "அமர்ந்த நிலை", sanskrit: "Asana", about: "அரியணையில் அமர்தல் — அரசன், இறைவன் வீற்றிருத்தல்." },
  recline: { name: "சயனம்", sanskrit: "Shayana", about: "படுத்த கோலம் — பாற்கடலில் அரவணையில் துயிலும் பெருமாள்." },
};

export type Gaze = "front" | "left" | "right" | "up" | "down";

export interface Pose {
  stance: Stance;
  /** Hand targets in upper-body coordinates (shoulders at 82,66 and 118,66; head at 100,38). */
  L: [number, number];
  R: [number, number];
  head?: number;
  gaze?: Gaze;
}

export const POSES = {
  anjaliChest: { stance: "samapadam", L: [97, 86], R: [103, 86] },
  anjaliHead: { stance: "samapadam", L: [95, 4], R: [105, 4], gaze: "up" },
  anjaliFace: { stance: "aramandi", L: [97, 52], R: [103, 52] },
  bowDown: { stance: "kneel", L: [95, 4], R: [105, 4], head: 0, gaze: "down" },
  vishnu: { stance: "aramandi", L: [52, 42], R: [148, 42] },
  flute: { stance: "tribhanga", L: [112, 58], R: [132, 50], head: -10, gaze: "right" },
  call: { stance: "aramandi", L: [84, 110], R: [164, 58], gaze: "right" },
  callLeft: { stance: "walk", L: [36, 58], R: [116, 110], gaze: "left" },
  moon: { stance: "samapadam", L: [84, 110], R: [146, 4], head: -8, gaze: "up" },
  sunMoon: { stance: "samapadam", L: [52, 4], R: [148, 4], gaze: "up" },
  lion: { stance: "muzhumandi", L: [66, 84], R: [134, 84], gaze: "front" },
  lionRise: { stance: "aramandi", L: [62, 46], R: [138, 46], head: 6 },
  drum: { stance: "aramandi", L: [76, 104], R: [126, 90], gaze: "down" },
  sleep: { stance: "recline", L: [86, 18], R: [126, 104] },
  offer: { stance: "samapadam", L: [93, 92], R: [107, 92], gaze: "down" },
  offerHigh: { stance: "aramandi", L: [92, 40], R: [108, 40], gaze: "up" },
  trivikrama: { stance: "ekapada", L: [40, 40], R: [150, -4], gaze: "up" },
  rain: { stance: "samapadam", L: [60, 26], R: [140, 26], gaze: "up" },
  waves: { stance: "aramandi", L: [52, 96], R: [148, 96], gaze: "down" },
  fish: { stance: "aramandi", L: [92, 88], R: [108, 86] },
  bee: { stance: "tribhanga", L: [84, 110], R: [128, 32], head: 8, gaze: "right" },
  churn: { stance: "aramandi", L: [84, 98], R: [118, 78], gaze: "down" },
  churnAlt: { stance: "aramandi", L: [82, 78], R: [116, 98], gaze: "down" },
  conch: { stance: "aramandi", L: [96, 52], R: [104, 56], gaze: "up" },
  shankhaChakra: { stance: "aramandi", L: [52, 38], R: [148, 38], gaze: "front" },
  bow: { stance: "alidha", L: [34, 62], R: [120, 48], gaze: "left" },
  kick: { stance: "kick", L: [52, 40], R: [150, 62], gaze: "right" },
  peacock: { stance: "tribhanga", L: [84, 110], R: [128, 18], head: 10, gaze: "up" },
  parrot: { stance: "samapadam", L: [86, 100], R: [134, 58], gaze: "right" },
  lotusBloom: { stance: "samapadam", L: [70, 40], R: [130, 40], gaze: "up" },
  mirror: { stance: "aramandi", L: [90, 40], R: [110, 34], gaze: "left" },
  door: { stance: "walk", L: [56, 66], R: [144, 66] },
  milking: { stance: "muzhumandi", L: [88, 108], R: [112, 100], gaze: "down" },
  throne: { stance: "seated", L: [72, 116], R: [146, 46] },
  govardhana: { stance: "samapadam", L: [68, 30], R: [118, -6], gaze: "up" },
  garland: { stance: "samapadam", L: [76, 76], R: [124, 76] },
  eat: { stance: "aramandi", L: [92, 92], R: [106, 44] },
  bless: { stance: "samapadam", L: [70, 112], R: [132, 40] },
  cradle: { stance: "samapadam", L: [84, 102], R: [116, 98], head: 10, gaze: "down" },
  herd: { stance: "walk", L: [86, 110], R: [146, 82], gaze: "right" },
  ears: { stance: "samapadam", L: [76, 36], R: [124, 36], head: -8 },
  garuda: { stance: "aramandi", L: [110, 72], R: [90, 72], gaze: "up" },
  chatter: { stance: "samapadam", L: [80, 42], R: [120, 42] },
  hair: { stance: "tribhanga", L: [84, 110], R: [120, 18], head: -10 },
  shiver: { stance: "samapadam", L: [116, 84], R: [84, 84], head: 8, gaze: "down" },
  star: { stance: "samapadam", L: [84, 110], R: [134, 2], gaze: "up" },
  flag: { stance: "aramandi", L: [84, 110], R: [150, 6], gaze: "up" },
  canopy: { stance: "samapadam", L: [80, 2], R: [120, 2], gaze: "up" },
  lamp: { stance: "aramandi", L: [96, 96], R: [124, 64] },
  together: { stance: "aramandi", L: [98, 80], R: [102, 80] },
  spear: { stance: "alidha", L: [84, 110], R: [166, 60], gaze: "right" },
  waist: { stance: "aramandi", L: [84, 110], R: [116, 110] },
  /** Amruthavarshini's photo pose: one arm raised in Shikhara beside the head, the other flowing out. */
  amrutha: { stance: "tribhanga", L: [56, 30], R: [150, 112], head: -6 },
  carryHead: { stance: "walk", L: [86, 6], R: [114, 6], gaze: "front" },
} satisfies Record<string, Pose>;

export type PoseName = keyof typeof POSES;
