import type { PoseName } from "./poses";

export type RasaId = "shringara" | "hasya" | "karuna" | "raudra" | "veera" | "bhayanaka" | "adbhuta" | "shanta" | "bhakti" | "vatsalya";

export const RASAS: Record<RasaId, { name: string; english: string; color: string }> = {
  shringara: { name: "சிருங்காரம்", english: "Love", color: "#db2777" },
  hasya: { name: "ஹாஸ்யம்", english: "Mirth", color: "#ca8a04" },
  karuna: { name: "கருணை", english: "Compassion", color: "#64748b" },
  raudra: { name: "ரௌத்ரம்", english: "Fury", color: "#dc2626" },
  veera: { name: "வீரம்", english: "Valour", color: "#ea580c" },
  bhayanaka: { name: "பயானகம்", english: "Fear", color: "#334155" },
  adbhuta: { name: "அற்புதம்", english: "Wonder", color: "#7c3aed" },
  shanta: { name: "சாந்தம்", english: "Peace", color: "#0284c7" },
  bhakti: { name: "பக்தி", english: "Devotion", color: "#b45309" },
  vatsalya: { name: "வாத்சல்யம்", english: "Parental love", color: "#0d9488" },
};

export interface DanceStep {
  /** The words being danced. */
  phrase: string;
  meaning: string;
  pose: PoseName;
  /** Hasta ids for the dancer's hands as seen on screen, or one samyuta id for both hands. */
  left?: string;
  right?: string;
  both?: string;
  rasa: RasaId;
  /** Why this gesture: the abhinaya reasoning. */
  note: string;
}

export interface VerseDance {
  n: number;
  title: string;
  theme: string;
  steps: DanceStep[];
}

export const THIRUPPAVAI_DANCE: VerseDance[] = [
  {
    n: 1,
    title: "மார்கழித் திங்கள்",
    theme: "நோன்பின் அறைகூவல் — நிலவொளியில் தோழியரை அழைத்தல்",
    steps: [
      { phrase: "மார்கழித் திங்கள் மதி நிறைந்த நன்னாளால்", meaning: "மார்கழி மாதத்தின் முழுநிலவு நாள்", pose: "moon", left: "ardhachandra", right: "alapadma", rasa: "adbhuta", note: "அலபத்மம் முழு நிலவைக் குறிக்கும். கை உயர்ந்து, பார்வை மேலே — நிலவைக் கண்டு வியக்கும் முகபாவம்." },
      { phrase: "நீராடப் போதுவீர் போதுமினோ நேரிழையீர்", meaning: "நீராட வருபவர்களே, வாருங்கள்!", pose: "call", left: "ardhachandra", right: "pataka", rasa: "hasya", note: "பதாகம் விரிந்து அழைக்கும் அசைவு. அரைமண்டியில் முன்னோக்கிச் சாய்ந்து, உற்சாகமான புன்னகையுடன் தோழியரை அழைத்தல்." },
      { phrase: "நந்தகோபன் குமரன் … யசோதை இளம் சிங்கம்", meaning: "நந்தகோபன் மகன், யசோதையின் இளஞ்சிங்கம்", pose: "lion", left: "simhamukha", right: "simhamukha", rasa: "vatsalya", note: "சிம்ஹமுகம் சிங்கத்தைக் காட்டும்; முழுமண்டியில் தாழ்ந்து பாய்வது போல. 'இளம்' சிங்கம் என்பதால் முகத்தில் கொஞ்சும் தாய்மை." },
      { phrase: "நாராயணனே நமக்கே பறை தருவான்", meaning: "நாராயணனே நமக்குப் பறை தருவான்", pose: "vishnu", left: "tripataka", right: "tripataka", rasa: "bhakti", note: "இரு கைகளிலும் திரிபதாகம் தோள் உயரத்தில் — சங்கு சக்கரம் ஏந்திய விஷ்ணுவின் தேவதா ஹஸ்தம். உறுதியும் நம்பிக்கையும்." },
    ],
  },
  {
    n: 2,
    title: "வையத்து வாழ்வீர்காள்",
    theme: "நோன்பின் நியமங்கள் — செய்வதும் தவிர்ப்பதும்",
    steps: [
      { phrase: "வையத்து வாழ்வீர்காள்", meaning: "உலகத்தில் வாழ்பவர்களே!", pose: "callLeft", left: "pataka", right: "ardhachandra", rasa: "shanta", note: "பதாகம் அகன்று வீசி உலகம் முழுவதையும் அழைக்கும் அசைவு. பார்வை ஒரு புறத்திலிருந்து மறுபுறம் அலைதல் (சாசி திருஷ்டி)." },
      { phrase: "பாற்கடலுள் பையத் துயின்ற பரமனடி பாடி", meaning: "பாற்கடலில் மெல்லத் துயிலும் பரமனின் அடியைப் பாடி", pose: "sleep", left: "pataka", right: "sarpashirsha", rasa: "shanta", note: "சயனக் கோலம்; சர்ப்பசீர்ஷம் ஆதிசேஷனின் படத்தைக் குறிக்கும். 'பைய' — மெதுவாக என்பதால் அசைவுகள் மிக மெதுவாக." },
      { phrase: "நெய்யுண்ணோம் பாலுண்ணோம்", meaning: "நெய் உண்ணோம், பால் உண்ணோம்", pose: "eat", left: "padmakosha", right: "pataka", rasa: "hasya", note: "பத்மகோசம் கிண்ணம்; வலக்கை பதாகம் 'வேண்டாம்' என மறுக்கும். சிறுமியரின் விளையாட்டுத் தனமான உறுதி." },
      { phrase: "ஐயமும் பிச்சையும் ஆந்தனையும் கைகாட்டி", meaning: "இயன்றவரை தானம் கொடுத்து", pose: "offer", both: "pushpaputa", rasa: "karuna", note: "புஷ்பபுடம் — இரு கைகளும் குவிந்து அள்ளிக் கொடுக்கும் அசைவு. பார்வை கீழே, பணிவுடன்." },
    ],
  },
  {
    n: 3,
    title: "ஓங்கி உலகளந்த",
    theme: "திரிவிக்கிரமன் பெருமையும் நாட்டின் வளமும்",
    steps: [
      { phrase: "ஓங்கி உலகளந்த உத்தமன் பேர் பாடி", meaning: "உயர்ந்து உலகை அளந்த உத்தமனின் பெயர் பாடி", pose: "trivikrama", left: "pataka", right: "pataka", rasa: "adbhuta", note: "ஏகபாதத்தில் நின்று காலை வானுக்கு உயர்த்துதல் — வாமனன் திரிவிக்கிரமனாக வளர்ந்த காட்சி. இரு பதாகங்களும் விண்ணையும் மண்ணையும் சுட்டும்." },
      { phrase: "தீங்கின்றி நாடெல்லாம் திங்கள் மும்மாரி பெய்து", meaning: "நாடெங்கும் மாதம் மும்மாரி பொழிந்து", pose: "rain", left: "tripataka", right: "tripataka", rasa: "shanta", note: "மேலிருந்து கீழாக விரல்களை அசைத்து மழைத்துளிகள் விழுவதைக் காட்டுதல்; பார்வை வானிலிருந்து நிலத்துக்கு." },
      { phrase: "ஓங்கு பெருஞ்செந்நெல் ஊடு கயலுகள", meaning: "உயர்ந்த நெற்பயிர்களிடையே கயல் மீன்கள் துள்ள", pose: "fish", both: "matsya", rasa: "hasya", note: "மத்ஸ்ய ஹஸ்தம் — கட்டைவிரல்கள் துடுப்பாக அசைய மீன் துள்ளுவது போல அலை அசைவு." },
      { phrase: "பூங்குவளைப் போதில் பொறிவண்டு கண்படுப்ப", meaning: "குவளை மலரில் வண்டு உறங்க", pose: "bee", left: "ardhachandra", right: "bhramara", rasa: "shringara", note: "பிரமரம் வண்டைக் குறிக்கும்; சுழன்று மலரில் அமர்வது போல மணிக்கட்டு அசைவு." },
      { phrase: "வாங்கக் குடம் நிறைக்கும் வள்ளல் பெரும் பசுக்கள்", meaning: "குடம் நிறையப் பால் சுரக்கும் வள்ளல் பசுக்கள்", pose: "milking", left: "kapittha", right: "kapittha", rasa: "vatsalya", note: "கபித்தம் பால் கறக்கும் அசைவுக்கான மரபு ஹஸ்தம். முழுமண்டியில் அமர்ந்து மாறி மாறி இழுத்தல்." },
    ],
  },
  {
    n: 4,
    title: "ஆழி மழைக் கண்ணா",
    theme: "மழைத் தெய்வத்திடம் வேண்டுதல் — சங்கு, சக்கரம், சார்ங்கம் போல் மழை",
    steps: [
      { phrase: "ஆழியுள் புக்கு முகந்து கொடு ஆர்த்தேறி", meaning: "கடலுக்குள் புகுந்து நீரை முகந்து மேலெழுந்து", pose: "waves", left: "pataka", right: "pataka", rasa: "veera", note: "இரு பதாகங்களும் கீழே அலையாக அசைந்து, பின் அள்ளி மேலே எழும் அசைவு." },
      { phrase: "ஊழி முதல்வன் உருவம்போல் மெய் கறுத்து", meaning: "ஊழி முதல்வனின் கரிய உருவம் போல் மேகம் கறுத்து", pose: "vishnu", left: "tripataka", right: "tripataka", rasa: "adbhuta", note: "விஷ்ணு ஹஸ்தம் — மேகத்தின் கருமையைப் பெருமாளின் திருமேனியோடு ஒப்பிடுதல்." },
      { phrase: "பாழியந் தோளுடைப் பற்பநாபன் கையில் ஆழிபோல் மின்னி", meaning: "பத்மநாபன் கைச் சக்கரம் போல் மின்னி", pose: "shankhaChakra", both: "chakra", rasa: "adbhuta", note: "சக்கர ஹஸ்தம் — இரு அர்த்தசந்திரங்கள் குறுக்காகச் சுழல்கின்றன. மின்னல் போல் விரைவான சுழற்சி." },
      { phrase: "வலம்புரி போல் நின்றதிர்ந்து", meaning: "வலம்புரிச் சங்கு போல் முழங்கி", pose: "conch", both: "shankha", rasa: "veera", note: "சங்க ஹஸ்தம் வாயருகே — இடிமுழக்கத்தைப் பாஞ்சசன்ய ஒலியாகக் காட்டுதல்." },
      { phrase: "தாழாதே சார்ங்கம் உதைத்த சரமழை போல்", meaning: "சார்ங்க வில்லிலிருந்து பாயும் அம்பு மழை போல்", pose: "bow", left: "shikhara", right: "kartarimukha", rasa: "veera", note: "சிகரம் வில்; கர்த்தரீமுகம் அம்பை இழுக்கும் விரல்கள். ஆலீட நிலையில் வில்லாளி." },
    ],
  },
  {
    n: 5,
    title: "மாயனை மன்னு",
    theme: "தாமோதரனைத் தூய மனத்துடன் மலர் தூவி வணங்குதல்",
    steps: [
      { phrase: "மாயனை மன்னு வடமதுரை மைந்தனை", meaning: "மாயன், வடமதுரையின் மைந்தன்", pose: "flute", left: "mrigashirsha", right: "mrigashirsha", rasa: "shringara", note: "இரு மிருகசீர்ஷங்கள் குழலாக; திரிபங்க நிலையில் கண்ணன் கோலம்." },
      { phrase: "தூய பெருநீர் யமுனைத் துறைவனை", meaning: "தூய யமுனைக் கரையானை", pose: "waves", left: "pataka", right: "pataka", rasa: "shanta", note: "பதாகங்கள் அலைபோல் பக்கவாட்டில் அசைந்து நதி ஓடுவதைக் காட்டும்." },
      { phrase: "ஆயர் குலத்தினில் தோன்றும் அணிவிளக்கை", meaning: "ஆயர் குலத்தின் ஒளிவிளக்கு", pose: "lamp", left: "kapittha", right: "tripataka", rasa: "bhakti", note: "திரிபதாகம் எழும் தீச்சுடர்; கபித்தம் தீபம் காட்டும் கை." },
      { phrase: "தாயைக் குடல் விளக்கம் செய்த தாமோதரனை", meaning: "தாயின் வயிற்றைப் பெருமைப்படுத்திய தாமோதரன் (கயிற்றால் கட்டுண்டவன்)", pose: "cradle", left: "mushti", right: "mushti", rasa: "vatsalya", note: "இரு முஷ்டிகளும் இடுப்பருகே — யசோதை கயிற்றால் கட்டியதைக் குறிக்கும். 'தாம' = கயிறு, 'உதரம்' = வயிறு." },
      { phrase: "தூமலர் தூவித் தொழுது", meaning: "தூய மலர் தூவி வணங்கி", pose: "offerHigh", both: "pushpaputa", rasa: "bhakti", note: "புஷ்பபுடத்திலிருந்து மலர் தூவி, உடனே அஞ்சலியாக மாறுதல்." },
    ],
  },
  {
    n: 6,
    title: "புள்ளும் சிலம்பின",
    theme: "விடியலின் ஒலிகள் — பறவை, சங்கு, முனிவர்களின் 'அரி' என்ற முழக்கம்",
    steps: [
      { phrase: "புள்ளும் சிலம்பின காண்", meaning: "பறவைகள் கூவுகின்றன, பார்!", pose: "chatter", left: "hamsasya", right: "hamsasya", rasa: "hasya", note: "ஹம்சாஸ்யம் பறவையின் அலகு; இரு கைகளும் மாறி மாறிக் கொத்துவது போல." },
      { phrase: "புள்ளரையன் கோயில் வெள்ளை விளிசங்கின் பேரரவம்", meaning: "கருடனின் தலைவன் கோயிலில் வெண்சங்கின் பேரொலி", pose: "conch", both: "shankha", rasa: "adbhuta", note: "சங்க ஹஸ்தம் — காலைப் பூஜையின் சங்கொலி. முகம் உயர்ந்து ஒலியைக் கேட்பது போல." },
      { phrase: "கள்ளச் சகடம் கலக்கழியக் காலோச்சி", meaning: "வஞ்சச் சகடத்தைக் காலால் உதைத்து உடைத்து", pose: "kick", left: "pataka", right: "mushti", rasa: "veera", note: "தொட்டிலில் இருந்த குழந்தைக் கண்ணன் சகடாசுரனை உதைத்த காட்சி — கால் பக்கவாட்டில் வீசப்படும்." },
      { phrase: "வெள்ளத்தரவில் துயிலமர்ந்த வித்தினை", meaning: "பாற்கடலில் அரவணையில் துயிலும் மூலவித்து", pose: "sleep", left: "pataka", right: "sarpashirsha", rasa: "shanta", note: "சயனக் கோலம்; சர்ப்பசீர்ஷம் ஆதிசேஷன்." },
      { phrase: "முனிவர்களும் யோகிகளும் … அரியென்ற பேரரவம்", meaning: "முனிவர், யோகியர் 'ஹரி' என்ற முழக்கம்", pose: "anjaliHead", both: "anjali", rasa: "bhakti", note: "தலைமேல் அஞ்சலி — தெய்வ வணக்கம். கண்கள் மூடிய தியான பாவம்." },
    ],
  },
  {
    n: 7,
    title: "கீசு கீசென்று",
    theme: "ஆய்ப்பாடியின் காலை — ஆனைச்சாத்தன் கூச்சலும் தயிர் கடையும் ஒலியும்",
    steps: [
      { phrase: "கீசு கீசென்று எங்கும் ஆனைச்சாத்தன்", meaning: "'கீசு கீசு' என்று பறவைகள் கூவ", pose: "chatter", left: "hamsasya", right: "hamsasya", rasa: "hasya", note: "இரு ஹம்சாஸ்யங்களும் எதிரெதிரே 'பேசிக்கொள்ளும்' விளையாட்டு அசைவு." },
      { phrase: "காசும் பிறப்பும் கலகலப்பக் கைபேர்த்து", meaning: "அணிகலன்கள் கலகலக்கக் கைகளை அசைத்து", pose: "garland", left: "alapadma", right: "alapadma", rasa: "shringara", note: "அலபத்ம மணிக்கட்டுச் சுழற்சி — வளையல், மணிமாலை ஒலிப்பது." },
      { phrase: "மத்தினால் ஓசைப்படுத்த தயிரரவம்", meaning: "மத்தால் தயிர் கடையும் ஓசை", pose: "churn", left: "mushti", right: "mushti", rasa: "vatsalya", note: "இரு முஷ்டிகளும் மாறி மாறிக் கயிற்றை இழுக்கும் — தயிர் கடையும் அசைவு. தாளத்துக்கு ஏற்ற தட்டடவு." },
      { phrase: "நாராயணன் மூர்த்தி கேசவனைப் பாடவும்", meaning: "நாராயணனான கேசவனைப் பாட", pose: "vishnu", left: "tripataka", right: "tripataka", rasa: "bhakti", note: "விஷ்ணு ஹஸ்தம்." },
    ],
  },
  {
    n: 8,
    title: "கீழ்வானம் வெள்ளென்று",
    theme: "கிழக்கு வெளுத்தது — கேசியையும் மல்லர்களையும் வென்றவனைப் பாட எழுந்திரு",
    steps: [
      { phrase: "கீழ்வானம் வெள்ளென்று", meaning: "கிழக்கு வானம் வெளுத்தது", pose: "callLeft", left: "pataka", right: "ardhachandra", rasa: "adbhuta", note: "பதாகம் கண் உயரத்தில் தொடுவானம் போல் கிடைமட்டமாக வீசுதல்; பார்வை தொலைவில்." },
      { phrase: "பாவாய் எழுந்திராய்", meaning: "பெண்ணே, எழுந்திரு!", pose: "call", left: "ardhachandra", right: "pataka", rasa: "hasya", note: "பதாகத்தால் தூக்கி எழுப்பும் அசைவு; செல்லக் கோபம்." },
      { phrase: "மாவாய் பிளந்தானை", meaning: "குதிரை (கேசி) வாயைப் பிளந்தவனை", pose: "door", left: "pataka", right: "pataka", rasa: "raudra", note: "இரு பதாகங்கள் எதிர்த்திசைகளில் விலக்கும் வலிய அசைவு; கண்களில் சினம்." },
      { phrase: "மல்லரை மாட்டிய", meaning: "மல்லர்களை வென்ற", pose: "spear", left: "ardhachandra", right: "mushti", rasa: "veera", note: "முஷ்டி மல்யுத்தம் — ஆலீட நிலையில் வலிய குத்து." },
      { phrase: "தேவாதி தேவனைச் சென்று நாம் சேவித்தால்", meaning: "தேவர்களின் தேவனைச் சென்று வணங்கினால்", pose: "anjaliHead", both: "anjali", rasa: "bhakti", note: "தலைமேல் அஞ்சலி." },
    ],
  },
  {
    n: 9,
    title: "தூமணி மாடத்து",
    theme: "மணிமாடத்தில் உறங்கும் மாமன் மகளை எழுப்புதல்",
    steps: [
      { phrase: "தூமணி மாடத்துச் சுற்றும் விளக்கெரிய", meaning: "மணிமாடத்தில் சுற்றிலும் விளக்குகள் எரிய", pose: "lamp", left: "kapittha", right: "tripataka", rasa: "shringara", note: "திரிபதாகம் தீபச்சுடர்; உடலைச் சுற்றிச் சுழன்று எங்கும் விளக்குகள்." },
      { phrase: "தூபம் கமழ", meaning: "நறுமணப் புகை கமழ", pose: "offer", left: "kapittha", right: "kapittha", rasa: "shringara", note: "கபித்தம் தூபம் காட்டும் மரபு ஹஸ்தம்; மெல்லிய வட்ட அசைவு." },
      { phrase: "மாமான் மகளே மணிக்கதவம் தாள் திறவாய்", meaning: "மாமன் மகளே, மணிக்கதவின் தாழ் திற", pose: "door", left: "pataka", right: "pataka", rasa: "hasya", note: "பதாகங்கள் கதவைத் தள்ளித் திறக்கும் அசைவு; நடை நிலை." },
      { phrase: "ஊமையோ அன்றிச் செவிடோ", meaning: "ஊமையோ? செவிடோ?", pose: "ears", left: "suchi", right: "suchi", rasa: "hasya", note: "சூசியால் வாயையும் காதையும் சுட்டி விளையாட்டாகக் கேலி செய்தல்." },
      { phrase: "மாமாயன் மாதவன் வைகுந்தன் என்றென்று", meaning: "மாமாயன், மாதவன், வைகுந்தன் என்று", pose: "vishnu", left: "tripataka", right: "tripataka", rasa: "bhakti", note: "ஒவ்வொரு திருநாமத்துக்கும் விஷ்ணு ஹஸ்தத்துடன் ஒரு அடவு." },
    ],
  },
  {
    n: 10,
    title: "நோற்றுச் சுவர்க்கம்",
    theme: "கும்பகர்ணனையும் தோற்கடித்த உறக்கம் — கேலியும் அன்பும்",
    steps: [
      { phrase: "நோற்றுச் சுவர்க்கம் புகுகின்ற அம்மனாய்", meaning: "நோன்பால் சுவர்க்கம் புகும் அம்மையே", pose: "anjaliFace", both: "anjali", rasa: "hasya", note: "முகத்தருகே அஞ்சலி — மரியாதையோடு கேலி கலந்த அழைப்பு." },
      { phrase: "நாற்றத் துழாய்முடி நாராயணன்", meaning: "நறுமணத் துளசி அணிந்த நாராயணன்", pose: "canopy", left: "tripataka", right: "tripataka", rasa: "bhakti", note: "திரிபதாகம் மகுடம் — தலைமேல் துழாய் முடி." },
      { phrase: "கும்பகரணனும் தோற்றும் உனக்கே பெருந்துயில் தான் தந்தானோ", meaning: "கும்பகர்ணனும் தோற்று உனக்குத் தன் தூக்கத்தைத் தந்தானோ?", pose: "sleep", left: "mushti", right: "pataka", rasa: "hasya", note: "கனத்த உறக்கத்தை மிகைப்படுத்திக் காட்டும் நகைச்சுவை அபிநயம்." },
      { phrase: "அருங்கலமே தேற்றமாய் வந்து திற", meaning: "அரிய அணிகலனே, தெளிந்து வந்து திற", pose: "garland", left: "hamsasya", right: "hamsasya", rasa: "shringara", note: "ஹம்சாஸ்யம் முத்து, மணி போன்ற நுண்பொருள்." },
    ],
  },
  {
    n: 11,
    title: "கற்றுக் கறவை",
    theme: "ஆயர் குலத்தின் பொற்கொடியே — மயிலே — எழுந்து வா",
    steps: [
      { phrase: "கற்றுக் கறவைக் கணங்கள் பல கறந்து", meaning: "கன்றுடைய பசுக்கூட்டங்களைக் கறந்து", pose: "milking", left: "kapittha", right: "kapittha", rasa: "vatsalya", note: "கபித்தம் — பால் கறத்தல்." },
      { phrase: "செற்றார் திறலழியச் சென்று செருச்செய்யும்", meaning: "பகைவர் வலிமை அழியப் போர் செய்யும்", pose: "bow", left: "shikhara", right: "kartarimukha", rasa: "veera", note: "ஆலீட நிலை; சிகரம் வில்." },
      { phrase: "புற்றரவல்குல் புனமயிலே போதராய்", meaning: "காட்டு மயிலே, வா!", pose: "peacock", left: "ardhachandra", right: "mayura", rasa: "shringara", note: "மயூர ஹஸ்தம் தலையருகே — மயிலின் கொண்டை; திரிபங்கத்தில் ஒயிலான அசைவு." },
      { phrase: "முகில்வண்ணன் பேர்பாட", meaning: "மேகவண்ணனின் பெயர் பாட", pose: "rain", left: "pataka", right: "pataka", rasa: "bhakti", note: "பதாகம் மேகம்." },
    ],
  },
  {
    n: 12,
    title: "கனைத்திளங் கற்றெருமை",
    theme: "இலங்கை வேந்தனை வென்ற மனத்துக்கினியானைப் பாடு",
    steps: [
      { phrase: "கனைத்திளங் கற்றெருமை கன்றுக்கிரங்கி", meaning: "இளங்கன்றுக்கு இரங்கிக் கனைக்கும் எருமை", pose: "cradle", left: "pataka", right: "pataka", rasa: "vatsalya", note: "கன்றின் மேலான தாய்மை; தலை சாய்ந்து மெல்லிய அசைவு." },
      { phrase: "நினைத்து முலைவழியே நின்று பால் சோர", meaning: "நினைத்தவுடன் பால் தானாகச் சொரிய", pose: "waves", left: "pataka", right: "pataka", rasa: "karuna", note: "பதாகங்கள் மேலிருந்து கீழே பாய்தல்." },
      { phrase: "சினத்தினால் தென்னிலங்கைக் கோமானைச் செற்ற", meaning: "சினத்தால் இலங்கை அரசனை அழித்த", pose: "bow", left: "shikhara", right: "kartarimukha", rasa: "raudra", note: "இராமன் வில்லேந்திய ஆலீட நிலை; கண்களில் ரௌத்ரம்." },
      { phrase: "மனத்துக்கினியானைப் பாடவும்", meaning: "மனதுக்கு இனியவனைப் பாட", pose: "anjaliChest", both: "anjali", rasa: "shringara", note: "மார்பருகே அஞ்சலி — இதயத்துக்கு நெருக்கமான அன்பு." },
    ],
  },
  {
    n: 13,
    title: "புள்ளின் வாய் கீண்டானை",
    theme: "வெள்ளி எழுந்து வியாழம் உறங்கிற்று — இன்னுமா உறக்கம்?",
    steps: [
      { phrase: "புள்ளின்வாய் கீண்டானை", meaning: "பகாசுரனின் அலகைப் பிளந்தவனை", pose: "door", left: "hamsasya", right: "hamsasya", rasa: "veera", note: "இரு ஹம்சாஸ்யங்கள் அலகாகச் சேர்ந்து, வலிமையாகப் பிரித்துப் பிளத்தல்." },
      { phrase: "பொல்லா அரக்கனைக் கிள்ளிக் களைந்தானை", meaning: "கொடிய அரக்கனை (இராவணனின் தலைகளை) கிள்ளி எறிந்தவனை", pose: "bow", left: "shikhara", right: "kartarimukha", rasa: "raudra", note: "கர்த்தரீமுகம் கிள்ளும் / வெட்டும் அசைவு." },
      { phrase: "வெள்ளி எழுந்து வியாழம் உறங்கிற்று", meaning: "வெள்ளி (சுக்கிரன்) எழுந்தது, வியாழன் மறைந்தது", pose: "star", left: "ardhachandra", right: "suchi", rasa: "adbhuta", note: "சூசி விண்மீனைச் சுட்டும் — ஒரு கையில் எழுதல், மறுகையில் மறைதல்." },
      { phrase: "குள்ளக் குளிரக் குடைந்து நீராடாதே", meaning: "குளிர்ந்த நீரில் மூழ்கி நீராடாமல்", pose: "shiver", left: "pataka", right: "pataka", rasa: "hasya", note: "கைகளைக் கட்டிக்கொண்டு நடுங்கும் நகைச்சுவை அபிநயம்." },
    ],
  },
  {
    n: 14,
    title: "உங்கள் புழைக்கடை",
    theme: "செங்கழுநீர் மலர்ந்தது, ஆம்பல் குவிந்தது — சங்கு சக்கரம் ஏந்தியவனைப் பாடு",
    steps: [
      { phrase: "செங்கழுநீர் வாய்நெகிழ்ந்து", meaning: "செங்குவளை மலர்ந்தது", pose: "lotusBloom", left: "alapadma", right: "alapadma", rasa: "adbhuta", note: "முகுளத்திலிருந்து அலபத்மமாக மெல்ல விரியும் — மலர் மலர்தல்." },
      { phrase: "ஆம்பல் வாய் கூம்பின காண்", meaning: "அல்லி மலர்கள் குவிந்தன", pose: "offer", left: "mukula", right: "mukula", rasa: "shanta", note: "அலபத்மம் மெல்ல முகுளமாகக் குவிதல் — இரவு மலர் காலையில் மூடுதல்." },
      { phrase: "செங்கல் பொடிக்கூறை வெண்பல் தவத்தவர்", meaning: "காவியுடை தவசிகள்", pose: "anjaliFace", left: "hamsasya", right: "hamsasya", rasa: "shanta", note: "ஹம்சாஸ்யம் சின் முத்திரை — ஞானியர், தவசிகள்." },
      { phrase: "சங்கொடு சக்கரம் ஏந்தும் தடக்கையன்", meaning: "சங்கும் சக்கரமும் ஏந்திய பெருங்கையன்", pose: "shankhaChakra", left: "shikhara", right: "chandrakala", rasa: "bhakti", note: "இடக்கையில் சங்கு, வலக்கையில் சக்கரம் — சங்க ஹஸ்தமும் சக்கர ஹஸ்தமும் மாறி மாறி. இத்தளத்தின் நடுவில் உள்ள சங்கு–சக்கரத்தின் நடன வடிவம்." },
      { phrase: "பங்கயக் கண்ணானைப் பாடேலோர் எம்பாவாய்", meaning: "தாமரைக் கண்ணனைப் பாடு", pose: "mirror", left: "padmakosha", right: "padmakosha", rasa: "shringara", note: "பத்மகோசம் கண்ணருகே — தாமரைக் கண்கள்." },
    ],
  },
  {
    n: 15,
    title: "எல்லே இளங்கிளியே",
    theme: "இளங்கிளியுடன் வாதம் — விளையாட்டுப் பேச்சு",
    steps: [
      { phrase: "எல்லே இளங்கிளியே இன்னம் உறங்குதியோ", meaning: "ஏய் இளங்கிளியே, இன்னும் உறங்குகிறாயா?", pose: "parrot", left: "ardhachandra", right: "shukatunda", rasa: "hasya", note: "சுகதுண்டம் — கிளியின் அலகு. ஆண்டாளின் கையில் எப்போதும் உள்ள கிளி." },
      { phrase: "சில்லென்று அழையேன்மின் நங்கைமீர் போதர்கின்றேன்", meaning: "சிணுங்கி அழைக்காதீர்கள், வருகிறேன்", pose: "ears", left: "pataka", right: "pataka", rasa: "hasya", note: "செல்லக் கோபம் — கைகளால் காதை மூடுதல்." },
      { phrase: "வல்லானை கொன்றானை மாற்றாரை மாற்றழிக்க வல்லானை", meaning: "வலிய யானையைக் கொன்றவனை, பகைவரை அழிக்க வல்லவனை", pose: "spear", left: "ardhachandra", right: "mushti", rasa: "veera", note: "முஷ்டி — வலிமை, போர்." },
      { phrase: "மாயனைப் பாடேலோர் எம்பாவாய்", meaning: "மாயனைப் பாடு", pose: "flute", left: "mrigashirsha", right: "mrigashirsha", rasa: "shringara", note: "குழலூதும் கண்ணன்." },
    ],
  },
  {
    n: 16,
    title: "நாயகனாய் நின்ற",
    theme: "நந்தகோபன் மாளிகை வாயில் காவலனிடம் வேண்டுதல்",
    steps: [
      { phrase: "நாயகனாய் நின்ற நந்தகோபனுடைய கோயில் காப்பானே", meaning: "நந்தகோபனின் மாளிகையைக் காப்பவனே", pose: "herd", left: "ardhachandra", right: "shikhara", rasa: "bhakti", note: "சிகரம் காவலனின் கோல்; பணிவுடன் அழைத்தல்." },
      { phrase: "கொடித்தோன்றும் தோரண வாயில் காப்பானே", meaning: "கொடியும் தோரணமும் உள்ள வாயிலைக் காப்பவனே", pose: "flag", left: "ardhachandra", right: "ardhapataka", rasa: "adbhuta", note: "அர்த்தபதாகம் கொடி, தோரணம் — மேலே அசைந்தாடுதல்." },
      { phrase: "மணிக்கதவம் தாள் திறவாய்", meaning: "மணிக்கதவின் தாழைத் திற", pose: "door", left: "pataka", right: "pataka", rasa: "karuna", note: "பதாகம் — கதவு திறத்தல்." },
      { phrase: "ஆயர் சிறுமியரோமுக்கு அறை பறை", meaning: "ஆயர் சிறுமியருக்கு ஒலிக்கும் பறை", pose: "drum", left: "mushti", right: "mushti", rasa: "hasya", note: "முஷ்டியால் பறை கொட்டும் தாளம்." },
    ],
  },
  {
    n: 17,
    title: "அம்பரமே தண்ணீரே",
    theme: "நந்தகோபன், யசோதை, கண்ணன், பலராமன் — ஒவ்வொருவரையும் எழுப்புதல்",
    steps: [
      { phrase: "அம்பரமே தண்ணீரே சோறே அறஞ்செய்யும்", meaning: "ஆடை, நீர், உணவு தானம் செய்பவனே", pose: "offer", both: "pushpaputa", rasa: "karuna", note: "புஷ்பபுடம் — அள்ளிக் கொடுத்தல்." },
      { phrase: "கொம்பனார்க்கெல்லாம் கொழுந்தே குலவிளக்கே", meaning: "கொடி போன்ற பெண்களுக்கெல்லாம் தளிரே, குலவிளக்கே (யசோதை)", pose: "peacock", left: "ardhachandra", right: "mayura", rasa: "vatsalya", note: "மயூரம் படரும் கொடி; மென்மையான அசைவு." },
      { phrase: "அம்பரம் ஊடறுத்து ஓங்கி உலகளந்த", meaning: "வானைப் பிளந்து உயர்ந்து உலகளந்த", pose: "trivikrama", left: "pataka", right: "pataka", rasa: "adbhuta", note: "மீண்டும் திரிவிக்கிரமன் — உயர்ந்த கால்." },
      { phrase: "செம்பொற் கழலடிச் செல்வா பலதேவா", meaning: "பொற்கழல் அணிந்த பலதேவனே", pose: "spear", left: "ardhachandra", right: "mushti", rasa: "veera", note: "முஷ்டி — பலராமனின் கலப்பையைப் பிடித்த உறுதி." },
    ],
  },
  {
    n: 18,
    title: "உந்து மதகளிற்றன்",
    theme: "நப்பின்னை நங்காய் — கதவைத் திற",
    steps: [
      { phrase: "உந்து மதகளிற்றன் ஓடாத தோள்வலியன்", meaning: "மதயானை போன்ற வலியோன்", pose: "lion", left: "mushti", right: "mushti", rasa: "veera", note: "முழுமண்டியில் கனத்த யானை நடை (கஜ கதி)." },
      { phrase: "நப்பின்னை நங்காய் திறவாய்", meaning: "நப்பின்னைப் பிராட்டியே திற", pose: "anjaliFace", both: "anjali", rasa: "shringara", note: "முகத்தருகே அஞ்சலி — பணிவான அழைப்பு." },
      { phrase: "கந்தம் கமழும் குழலீ", meaning: "நறுமணக் கூந்தல் உடையவளே", pose: "hair", left: "ardhachandra", right: "mayura", rasa: "shringara", note: "மயூரத்தால் கூந்தலை வருடும் அசைவு." },
      { phrase: "மாதவிப் பந்தல் மேல் பல்கால் குயிலினங்கள் கூவின", meaning: "மாதவிப் பந்தலில் குயில்கள் பலமுறை கூவின", pose: "chatter", left: "hamsasya", right: "hamsasya", rasa: "adbhuta", note: "ஹம்சாஸ்யம் பறவை அலகு." },
      { phrase: "செந்தாமரைக் கையால் சீரார் வளையொலிப்ப", meaning: "தாமரைக் கையால் வளையல் ஒலிக்க", pose: "lotusBloom", left: "alapadma", right: "alapadma", rasa: "shringara", note: "அலபத்ம மணிக்கட்டுச் சுழற்சி — வளையல் ஒலி." },
    ],
  },
  {
    n: 19,
    title: "குத்து விளக்கெரிய",
    theme: "மஞ்சத்தில் நப்பின்னையுடன் கண்ணன் — பிரிவைப் பொறுக்காத அன்பு",
    steps: [
      { phrase: "குத்து விளக்கெரிய", meaning: "குத்துவிளக்கு எரிய", pose: "lamp", left: "kapittha", right: "tripataka", rasa: "shringara", note: "திரிபதாகம் தீபம்." },
      { phrase: "கோட்டுக்கால் கட்டில் மேல்", meaning: "தந்தக் கால் கட்டிலின் மேல்", pose: "together", both: "khatva", rasa: "shringara", note: "கட்வா ஹஸ்தம் — கட்டில்; சுட்டு, சிறு விரல்கள் கால்களாக." },
      { phrase: "மெத்தென்ற பஞ்சசயனத்தின் மேலேறி", meaning: "மென்மையான மெத்தையின் மேல் ஏறி", pose: "sleep", left: "pataka", right: "pataka", rasa: "shringara", note: "சயனக் கோலம்." },
      { phrase: "மைத்தடங் கண்ணினாய்", meaning: "மை தீட்டிய அகன்ற கண்ணாளே", pose: "mirror", left: "pataka", right: "kapittha", rasa: "shringara", note: "பதாகம் கண்ணாடி; கபித்தம் கண்ணுக்கு மை இடுதல் — மரபு ஹஸ்தம்." },
    ],
  },
  {
    n: 20,
    title: "முப்பத்து மூவர்",
    theme: "தேவர்களின் துயர் தீர்ப்பவனே — நப்பின்னையே, விசிறியும் கண்ணாடியும் தந்து நீராட்டு",
    steps: [
      { phrase: "முப்பத்து மூவர் அமரர்க்கு முன்சென்று", meaning: "முப்பத்து மூன்று தேவர்களுக்கு முன்னின்று", pose: "canopy", left: "tripataka", right: "tripataka", rasa: "veera", note: "திரிபதாகம் இந்திரன், தேவர்கள்." },
      { phrase: "கப்பம் தவிர்க்கும் கலியே", meaning: "அச்சம் போக்கும் வல்லவனே", pose: "bless", left: "alapadma", right: "pataka", rasa: "karuna", note: "உயர்த்திய பதாகம் அபய ஹஸ்தம் — 'அஞ்சாதே'." },
      { phrase: "உக்கமும் தட்டொளியும் தந்து", meaning: "விசிறியும் கண்ணாடியும் தந்து", pose: "mirror", left: "pataka", right: "ardhapataka", rasa: "shringara", note: "அர்த்தபதாகம் விசிறி வீசுதல்; பதாகம் கண்ணாடி." },
      { phrase: "உன் மணாளனை இப்போதே எம்மை நீராட்டு", meaning: "உன் மணாளனோடு எங்களை இப்போதே நீராட்டு", pose: "waves", left: "pataka", right: "pataka", rasa: "hasya", note: "பதாகங்கள் நீரைத் தெளிக்கும் அசைவு." },
    ],
  },
  {
    n: 21,
    title: "ஏற்ற கலங்கள்",
    theme: "குடம் நிறைக்கும் பசுக்களின் தலைவன் மகனே — பகைவர் பணிந்து வருவது போல் நாங்கள் வந்தோம்",
    steps: [
      { phrase: "ஏற்ற கலங்கள் எதிர்பொங்கி மீதளிப்ப", meaning: "வைத்த பாத்திரங்கள் நிறைந்து பொங்க", pose: "offerHigh", left: "padmakosha", right: "padmakosha", rasa: "adbhuta", note: "பத்மகோசம் நிறைகுடம்; மேலே பொங்கி வழியும் அசைவு." },
      { phrase: "மாற்றாதே பால்சொரியும் வள்ளல் பெரும் பசுக்கள்", meaning: "இடைவிடாது பால் சொரியும் பசுக்கள்", pose: "milking", left: "kapittha", right: "kapittha", rasa: "vatsalya", note: "கபித்தம் — பால் கறத்தல்." },
      { phrase: "ஊற்றமுடையாய் பெரியாய்", meaning: "உறுதியானவனே, பெரியவனே", pose: "lionRise", left: "shikhara", right: "shikhara", rasa: "veera", note: "இரு சிகரங்கள் — தூண் போன்ற உறுதி." },
      { phrase: "மாற்றார் உனக்கு வலிதொலைந்து உன் வாசற்கண் ஆற்றாது வந்து", meaning: "பகைவர் வலியிழந்து உன் வாசலில் பணிவது போல", pose: "bowDown", both: "anjali", rasa: "bhakti", note: "மண்டியிட்டுத் தலைமேல் அஞ்சலி — முழுமையான பணிவு." },
    ],
  },
  {
    n: 22,
    title: "அங்கண் மாஞாலத்து",
    theme: "அரசர்கள் போல் கட்டிலின் கீழ் கூடினோம் — தாமரைக் கண்களால் எங்களைப் பார்",
    steps: [
      { phrase: "அங்கண் மாஞாலத்து அரசர் அபிமான பங்கமாய் வந்து", meaning: "பெரிய உலகின் அரசர்கள் செருக்கை விட்டு வந்து", pose: "canopy", left: "tripataka", right: "tripataka", rasa: "veera", note: "திரிபதாகம் மகுடம் — அரசர்கள்; பின் தலை தாழ்தல்." },
      { phrase: "பள்ளிக்கட்டிற் கீழே சங்கமிருப்பார் போல் வந்து தலைப்பெய்தோம்", meaning: "உன் கட்டிலின் கீழ் கூட்டமாக வந்தோம்", pose: "together", both: "karkata", rasa: "bhakti", note: "கர்க்கட ஹஸ்தம் — கூட்டம் கூடுதல்." },
      { phrase: "கிங்கிணிவாய்ச் செய்த தாமரைப்பூப் போலே செங்கண் சிறுச்சிறிதே எம்மேல் விழியாவோ", meaning: "சதங்கை வாய் போல் பாதி மலர்ந்த தாமரைக் கண்களை மெல்லத் திறந்து எங்களைப் பாராயோ", pose: "mirror", left: "mukula", right: "alapadma", rasa: "shringara", note: "முகுளத்திலிருந்து அலபத்மம் — கண் மெல்லத் திறப்பது. கண் அசைவுகள் (திருஷ்டி பேதம்) மிக முக்கியம்." },
      { phrase: "திங்களும் ஆதித்தியனும் எழுந்தாற்போல்", meaning: "சந்திரனும் சூரியனும் ஒருசேர எழுந்தது போல்", pose: "sunMoon", left: "ardhachandra", right: "alapadma", rasa: "adbhuta", note: "இடக்கை அர்த்தசந்திரம் — நிலவு; வலக்கை அலபத்மம் — கதிரவன். கண்களே சூரிய சந்திரர்." },
    ],
  },
  {
    n: 23,
    title: "மாரிமலை முழைஞ்சில்",
    theme: "குகையில் உறங்கும் சிங்கம் விழித்தெழுவது போல் எழுந்து வா",
    steps: [
      { phrase: "மாரிமலை முழைஞ்சில் மன்னிக் கிடந்துறங்கும் சீரிய சிங்கம்", meaning: "மழைக்கால மலைக் குகையில் உறங்கும் சிங்கம்", pose: "lion", left: "simhamukha", right: "simhamukha", rasa: "shanta", note: "முழுமண்டியில் தாழ்ந்து, கண் மூடிய சிங்கம் — சிம்ஹமுகம்." },
      { phrase: "அறிவுற்றுத் தீவிழித்து வேரி மயிர் பொங்க", meaning: "விழித்து, தீப்போல் கண் திறந்து, பிடரி சிலிர்க்க", pose: "lionRise", left: "simhamukha", right: "simhamukha", rasa: "raudra", note: "கண்கள் அகல விரிதல், தலை சிலிர்த்தல் — பரதநாட்டியத்தின் புகழ்பெற்ற சிங்க அபிநயம்." },
      { phrase: "மூரி நிமிர்ந்து முழங்கிப் புறப்பட்டு", meaning: "உடல் நிமிர்ந்து கர்ஜித்துப் புறப்பட்டு", pose: "spear", left: "simhamukha", right: "simhamukha", rasa: "veera", note: "ஆலீட நிலையில் முன்னோக்கிப் பாய்தல்." },
      { phrase: "சீரிய சிங்காசனத்திருந்து யாம் வந்த காரியம் ஆராய்ந்து அருள்", meaning: "அரியணையில் அமர்ந்து நாங்கள் வந்த காரியம் கேட்டு அருள்", pose: "throne", left: "ardhachandra", right: "pataka", rasa: "bhakti", note: "அமர்ந்த நிலை, வலக்கை அபய பதாகம் — அருள் புரியும் அரசன்." },
    ],
  },
  {
    n: 24,
    title: "அன்றிவ்வுலகம் அளந்தாய்",
    theme: "போற்றி! போற்றி! — ஆறு வீரச் செயல்களுக்கு ஆறு வணக்கங்கள்",
    steps: [
      { phrase: "அன்றிவ்வுலகம் அளந்தாய் அடிபோற்றி", meaning: "அன்று உலகளந்த உன் திருவடிகளுக்குப் போற்றி", pose: "trivikrama", left: "pataka", right: "pataka", rasa: "adbhuta", note: "திரிவிக்கிரமன்; ஒவ்வொரு 'போற்றி'க்கும் அஞ்சலியுடன் ஒரு தீர்மானம்." },
      { phrase: "சென்றங்குத் தென்னிலங்கை செற்றாய் திறல் போற்றி", meaning: "இலங்கை சென்று அழித்த வலிமைக்குப் போற்றி", pose: "bow", left: "shikhara", right: "kartarimukha", rasa: "veera", note: "இராமனின் வில்." },
      { phrase: "பொன்றச் சகடம் உதைத்தாய் புகழ் போற்றி", meaning: "சகடத்தை உதைத்து அழித்த புகழுக்குப் போற்றி", pose: "kick", left: "pataka", right: "mushti", rasa: "veera", note: "சகடாசுர வதம் — உதைக்கும் கால்." },
      { phrase: "குன்று குடையா எடுத்தாய் குணம் போற்றி", meaning: "கோவர்த்தன மலையைக் குடையாக எடுத்த குணத்துக்குப் போற்றி", pose: "govardhana", left: "pataka", right: "suchi", rasa: "adbhuta", note: "உயர்த்திய சூசி (ஒரு விரல்) மலையைத் தாங்க, மறுகை பதாகம் குடையின் கீழ் மக்களைக் காக்கும்." },
      { phrase: "வென்று பகைகெடுக்கும் நின்கையில் வேல் போற்றி", meaning: "பகை அழிக்கும் உன் கை வேலுக்குப் போற்றி", pose: "spear", left: "ardhachandra", right: "mushti", rasa: "veera", note: "முஷ்டியில் வேல் — முன்னோக்கிய வீசல்." },
      { phrase: "என்றென்றும் உன் சேவகமே ஏத்திப் பறை கொள்வான்", meaning: "என்றும் உன் சேவகத்தைப் போற்றிப் பறை பெற", pose: "anjaliHead", both: "anjali", rasa: "bhakti", note: "தலைமேல் அஞ்சலி — நிறைவு." },
    ],
  },
  {
    n: 25,
    title: "ஒருத்தி மகனாய்",
    theme: "தேவகி மகனாய்ப் பிறந்து யசோதை மகனாய் வளர்ந்தவனே",
    steps: [
      { phrase: "ஒருத்தி மகனாய்ப் பிறந்து", meaning: "ஒருத்தி (தேவகி) மகனாகப் பிறந்து", pose: "cradle", left: "pataka", right: "pataka", rasa: "vatsalya", note: "இரு பதாகங்கள் தொட்டிலாக ஆடுதல்." },
      { phrase: "ஓரிரவில் ஒருத்தி மகனாய் ஒளித்து வளர", meaning: "அதே இரவில் மற்றொருத்தி (யசோதை) மகனாய் மறைந்து வளர", pose: "carryHead", left: "pataka", right: "pataka", rasa: "bhayanaka", note: "வசுதேவர் இரவில் குழந்தையைக் கூடையில் தலைமேல் சுமந்து யமுனை கடந்த காட்சி — இரு பதாகங்கள் கூடையைத் தாங்க, அவசர நடை, அச்சம்." },
      { phrase: "கஞ்சன் வயிற்றில் நெருப்பென்ன நின்ற", meaning: "கம்சனின் வயிற்றில் நெருப்புப் போல் நின்ற", pose: "lamp", left: "tripataka", right: "tripataka", rasa: "raudra", note: "திரிபதாகம் எழும் தீச்சுடர் — கம்சனின் அச்சம்." },
      { phrase: "நெடுமாலே உன்னை அருத்தித்து வந்தோம்", meaning: "நெடுமாலே, உன்னை நாடி வந்தோம்", pose: "anjaliChest", both: "anjali", rasa: "bhakti", note: "மார்பருகே அஞ்சலி." },
    ],
  },
  {
    n: 26,
    title: "மாலே மணிவண்ணா",
    theme: "நோன்புக்கு வேண்டியவை — பாஞ்சசன்யம் போன்ற சங்குகள், பறை, விளக்கு, கொடி, விதானம்",
    steps: [
      { phrase: "பாலன்ன வண்ணத்து உன் பாஞ்சசன்னியமே போல்வன சங்கங்கள்", meaning: "பால் போன்ற உன் பாஞ்சசன்யம் போன்ற சங்குகள்", pose: "conch", both: "shankha", rasa: "adbhuta", note: "சங்க ஹஸ்தம் — இப்பாசுரமே சங்கின் பெருமையைப் பாடுகிறது." },
      { phrase: "சாலப் பெரும்பறையே பல்லாண்டிசைப்பாரே", meaning: "பெரும் பறையும் பல்லாண்டு பாடுவோரும்", pose: "drum", left: "mushti", right: "mushti", rasa: "hasya", note: "முஷ்டி பறை." },
      { phrase: "கோலவிளக்கே கொடியே விதானமே", meaning: "அழகிய விளக்கு, கொடி, மேற்கட்டி", pose: "canopy", left: "pataka", right: "pataka", rasa: "adbhuta", note: "தலைமேல் விரிந்த பதாகங்கள் — விதானம் (மேற்கட்டி)." },
      { phrase: "ஆலினிலையாய் அருளேலோர் எம்பாவாய்", meaning: "ஆலிலையில் துயின்றவனே, அருள்", pose: "sleep", left: "ardhapataka", right: "pataka", rasa: "vatsalya", note: "அர்த்தபதாகம் இலை; ஆலிலைக் கண்ணன் (வடபத்ரசாயி) — ஸ்ரீவில்லிபுத்தூர்ப் பெருமாளே." },
    ],
  },
  {
    n: 27,
    title: "கூடாரை வெல்லும்",
    theme: "நோன்பின் நிறைவு — அணிகலன்கள், பாற்சோறு, கூடி மகிழ்தல்",
    steps: [
      { phrase: "கூடாரை வெல்லும் சீர்க் கோவிந்தா", meaning: "பகைவரை வெல்லும் கோவிந்தா", pose: "lionRise", left: "shikhara", right: "shikhara", rasa: "veera", note: "சிகரம் வெற்றி." },
      { phrase: "சூடகமே தோள்வளையே தோடே செவிப்பூவே", meaning: "வளையல், தோள்வளை, தோடு, செவிப்பூ", pose: "ears", left: "hamsasya", right: "hamsasya", rasa: "shringara", note: "ஒவ்வொரு அணிகலனுக்கும் அந்த உறுப்பைத் தொடுதல் — ஹம்சாஸ்யம் காதணி." },
      { phrase: "பாற்சோறு மூட நெய்பெய்து முழங்கை வழிவார", meaning: "நெய் முழங்கை வரை வழியப் பாற்சோறு உண்டு", pose: "eat", left: "padmakosha", right: "hamsasya", rasa: "hasya", note: "பத்மகோசம் கிண்ணம், ஹம்சாஸ்யம் உண்ணும் கை — முழங்கை வரை நெய் வழியும் மகிழ்ச்சி!" },
      { phrase: "கூடியிருந்து குளிர்ந்தேலோர் எம்பாவாய்", meaning: "கூடியிருந்து மகிழ்வோம்", pose: "together", both: "karkata", rasa: "hasya", note: "கர்க்கடம் — கூட்டம், இணைதல்." },
    ],
  },
  {
    n: 28,
    title: "கறவைகள் பின்சென்று",
    theme: "அறிவொன்றும் இல்லாத ஆயர் நாங்கள் — உன்னோடு உள்ள உறவு ஒழிக்க ஒழியாது",
    steps: [
      { phrase: "கறவைகள் பின்சென்று கானம் சேர்ந்துண்போம்", meaning: "பசுக்களின் பின்னால் காட்டுக்குச் சென்று உண்போம்", pose: "herd", left: "ardhachandra", right: "shikhara", rasa: "hasya", note: "சிகரம் மேய்ப்பனின் கோல்; நடை அடவு." },
      { phrase: "அறிவொன்றும் இல்லாத ஆய்க்குலத்து", meaning: "அறிவு ஒன்றும் இல்லாத ஆயர் குலம்", pose: "offer", left: "pataka", right: "pataka", rasa: "karuna", note: "தலை தாழ்ந்து, கைகள் தளர்ந்து — பணிவு (நைச்யானுசந்தானம்)." },
      { phrase: "உன்தன்னோடு உறவேல் நமக்கு இங்கொழிக்க ஒழியாது", meaning: "உன்னோடு உள்ள உறவை ஒழிக்க முடியாது", pose: "together", both: "karkata", rasa: "bhakti", note: "விரல்கள் கோர்த்த கர்க்கடம் — பிரிக்க முடியாத பிணைப்பு." },
      { phrase: "சீறி அருளாதே இறைவா நீ தாராய் பறை", meaning: "கோபிக்காமல் அருள், இறைவா பறை தா", pose: "ears", left: "pataka", right: "pataka", rasa: "karuna", note: "காதுகளைத் தொட்டு மன்னிப்புக் கேட்கும் மரபு அசைவு." },
    ],
  },
  {
    n: 29,
    title: "சிற்றஞ் சிறுகாலே",
    theme: "திருப்பாவையின் உயிர் — 'உனக்கே நாம் ஆட்செய்வோம்'",
    steps: [
      { phrase: "சிற்றஞ் சிறுகாலே வந்துன்னைச் சேவித்து", meaning: "அதிகாலையில் வந்து உன்னை வணங்கி", pose: "anjaliHead", both: "anjali", rasa: "bhakti", note: "தலைமேல் அஞ்சலி." },
      { phrase: "உன் பொற்றாமரை அடியே போற்றும் பொருள் கேளாய்", meaning: "உன் பொற்றாமரைத் திருவடிகளைப் போற்றுவதன் பொருளைக் கேள்", pose: "bowDown", left: "padmakosha", right: "padmakosha", rasa: "bhakti", note: "மண்டியிட்டுப் பத்மகோசத்தால் திருவடிகளைச் சுட்டுதல்." },
      { phrase: "இற்றைப் பறை கொள்வான் அன்று காண் கோவிந்தா", meaning: "இன்று பறை பெற மட்டும் வரவில்லை, கோவிந்தா", pose: "call", left: "ardhachandra", right: "pataka", rasa: "karuna", note: "பதாகம் 'இல்லை' என மறுத்து, பறை ஒரு சாக்கு மட்டுமே என்று காட்டுதல்." },
      { phrase: "எற்றைக்கும் ஏழேழ் பிறவிக்கும் உன்தன்னோடு உற்றோமே யாவோம்", meaning: "எப்போதும், ஏழேழ் பிறவிக்கும் உன்னோடு உறவுடையோம்", pose: "star", left: "ardhachandra", right: "suchi", rasa: "adbhuta", note: "சூசி வட்டமிடுதல் — காலச் சுழற்சி, பிறவிகள்." },
      { phrase: "உனக்கே நாம் ஆட்செய்வோம் மற்றை நம் காமங்கள் மாற்று", meaning: "உனக்கே நாம் தொண்டு செய்வோம்; மற்ற ஆசைகளை மாற்று", pose: "bowDown", both: "anjali", rasa: "bhakti", note: "முழுமையான சரணாகதி — திருப்பாவையின் உச்சக் கணம். அசைவு நின்று, அமைதியான முகம்." },
    ],
  },
  {
    n: 30,
    title: "வங்கக் கடல் கடைந்த",
    theme: "பலச்ருதி — இந்த முப்பதையும் ஓதுவோர் திருவருள் பெறுவர்",
    steps: [
      { phrase: "வங்கக் கடல் கடைந்த மாதவனை கேசவனை", meaning: "கப்பல்கள் செல்லும் கடலைக் கடைந்த மாதவன், கேசவன்", pose: "churnAlt", left: "mushti", right: "mushti", rasa: "adbhuta", note: "இரு முஷ்டிகள் மாறி மாறி — வாசுகியைக் கயிறாக்கிப் பாற்கடல் கடைதல்." },
      { phrase: "திங்கள் திருமுகத்துச் சேயிழையார் சென்றிறைஞ்சி", meaning: "நிலவு முக ஆய்ச்சியர் சென்று வணங்கி", pose: "moon", left: "ardhachandra", right: "alapadma", rasa: "shringara", note: "அலபத்மம் முகத்தருகே — நிலவு முகம்." },
      { phrase: "அணிபுதுவைப் பைங்கமலத் தண்தெரியல் பட்டர்பிரான் கோதை சொன்ன", meaning: "ஸ்ரீவில்லிபுத்தூர் பட்டர்பிரான் மகள் கோதை சொன்ன", pose: "parrot", left: "katakamukha", right: "shukatunda", rasa: "vatsalya", note: "ஆண்டாளின் கோலம் — கையில் கிளி (சுகதுண்டம்), மறுகையில் மாலை (கடகாமுகம்)." },
      { phrase: "சங்கத் தமிழ்மாலை முப்பதும் தப்பாமே", meaning: "இந்த முப்பது தமிழ்ப் பாமாலையையும் தவறாமல்", pose: "garland", left: "katakamukha", right: "katakamukha", rasa: "bhakti", note: "கடகாமுகம் — மாலை அணிவித்தல். முப்பது பாடல்களே ஒரு மாலை." },
      { phrase: "செங்கண் திருமுகத்துச் செல்வத் திருமாலால் எங்கும் திருவருள் பெற்று இன்புறுவர்", meaning: "செந்தாமரைக் கண் திருமாலின் திருவருள் பெற்று எங்கும் இன்புறுவர்", pose: "bless", left: "alapadma", right: "pataka", rasa: "shanta", note: "அபய பதாகமும் அலபத்மமும் — மங்களம். நாட்டியம் 'மங்களம்' உடன் நிறைவு." },
    ],
  },
];
