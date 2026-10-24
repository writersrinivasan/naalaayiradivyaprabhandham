export type Ayiram = 1 | 2 | 3 | 4;

export interface Prabandham {
  slug: string;
  name: string;
  english: string;
  azhwar: string;
  ayiram: Ayiram;
  start: number;
  count: number;
  about: string;
  highlight: string;
}

export const AYIRAMS: Record<Ayiram, { name: string; range: string; about: string }> = {
  1: {
    name: "முதலாயிரம்",
    range: "1 – 947",
    about: "திருப்பல்லாண்டு தொடங்கி கண்ணிநுண் சிறுத்தாம்பு வரை. பெரியாழ்வார், ஆண்டாள், குலசேகரர், திருமழிசையார், தொண்டரடிப்பொடியார், திருப்பாணர், மதுரகவியார் ஆகியோரின் இசைப்பாக்கள்.",
  },
  2: {
    name: "இரண்டாமாயிரம் (பெரிய திருமொழி)",
    range: "948 – 2081",
    about: "திருமங்கை ஆழ்வாரின் பெரிய திருமொழி, திருக்குறுந்தாண்டகம், திருநெடுந்தாண்டகம். 86 திவ்ய தேசங்களைப் பாடிய திருத்தல யாத்திரைப் பனுவல்.",
  },
  3: {
    name: "மூன்றாமாயிரம் (இயற்பா)",
    range: "2082 – 2898",
    about: "இசையின்றி இயலாகவே ஓதப்படும் பாக்கள்: மூன்று திருவந்தாதிகள், நான்முகன் திருவந்தாதி, திருவிருத்தம், திருவாசிரியம், பெரிய திருவந்தாதி, திருவெழுகூற்றிருக்கை, இரு மடல்கள்.",
  },
  4: {
    name: "நான்காமாயிரம் (திருவாய்மொழி)",
    range: "2899 – 4000",
    about: "நம்மாழ்வாரின் திருவாய்மொழி — 'திராவிட வேதம்', 'தமிழ் மறை'. சாம வேதத்தின் சாரம் எனப் போற்றப்படுவது.",
  },
};

export const PRABANDHAMS: Prabandham[] = [
  {
    slug: "thiruppallandu", name: "திருப்பல்லாண்டு", english: "Thiruppallandu", azhwar: "periyazhwar", ayiram: 1, start: 1, count: 12,
    about: "இறைவனுக்கே கண்ணேறு படுமோ என்று அஞ்சி, பெருமாளுக்குப் பல்லாண்டு பாடி வாழ்த்தும் மங்களாசாசனப் பனுவல். எல்லாக் கோயில்களிலும் சேவை தொடங்குவது இப்பாசுரங்களால்தான்.",
    highlight: "பல்லாண்டு பல்லாண்டு பல்லாயிரத்தாண்டு",
  },
  {
    slug: "periyazhwar-thirumozhi", name: "பெரியாழ்வார் திருமொழி", english: "Periyazhwar Thirumozhi", azhwar: "periyazhwar", ayiram: 1, start: 13, count: 461,
    about: "யசோதையின் தாய்மை பாவத்தில் கண்ணனின் பிறப்பு, நீராட்டம், தாலாட்டு, அம்புலி அழைத்தல், செங்கீரை, சப்பாணி, காது குத்துதல் எனப் பிள்ளைத்தமிழ் மரபுக்கே வழிகாட்டிய பனுவல்.",
    highlight: "வண்ண மாடங்கள் சூழ் திருக்கோட்டியூர்",
  },
  {
    slug: "thiruppavai", name: "திருப்பாவை", english: "Thiruppavai", azhwar: "andal", ayiram: 1, start: 474, count: 30,
    about: "மார்கழி நோன்பு நோற்கும் ஆயர் சிறுமியராகத் தோழியரை எழுப்பி, கண்ணனிடம் 'பறை' வேண்டும் முப்பது பாசுரங்கள். 'வேதம் அனைத்துக்கும் வித்து' எனப் போற்றப்படுவது.",
    highlight: "மார்கழித் திங்கள் மதி நிறைந்த நன்னாளால்",
  },
  {
    slug: "nachiyar-thirumozhi", name: "நாச்சியார் திருமொழி", english: "Nachiyar Thirumozhi", azhwar: "andal", ayiram: 1, start: 504, count: 143,
    about: "காமதேவனை வேண்டுதல், 'வாரணமாயிரம்' கனவுத் திருமணம், சங்கிடம் 'கருப்பூரம் நாறுமோ' என்று கண்ணனின் வாய்ச்சுவை கேட்டல் — நாயகி பாவத்தின் உச்சம்.",
    highlight: "வாரணமாயிரம் சூழ வலம் செய்து",
  },
  {
    slug: "perumal-thirumozhi", name: "பெருமாள் திருமொழி", english: "Perumal Thirumozhi", azhwar: "kulasekarar", ayiram: 1, start: 647, count: 105,
    about: "அரசர் குலசேகரர் அரங்கனையும் வேங்கடவனையும் பாடியது. தேவகியின் புலம்பல், கௌசல்யையின் தாலாட்டு, தசரதனின் புலம்பல் என இராமாயண, பாகவத உணர்வுகள் நிறைந்தது.",
    highlight: "படியாய்க் கிடந்துன் பவளவாய் காண்பேனே",
  },
  {
    slug: "thiruchanda-viruttam", name: "திருச்சந்த விருத்தம்", english: "Thiruchanda Viruttam", azhwar: "thirumazhisai", ayiram: 1, start: 752, count: 120,
    about: "சந்தநயம் மிக்க விருத்தங்களில் இறைவனின் பரத்துவத்தையும் தத்துவங்களையும் பாடுவது. காவிரியில் எறிந்தபோது நீரோட்டத்தை எதிர்த்து மீண்டு வந்த பனுவல் என்பது மரபு.",
    highlight: "நடந்த கால்கள் நொந்தவோ",
  },
  {
    slug: "thirumalai", name: "திருமாலை", english: "Thirumalai", azhwar: "thondaradippodi", ayiram: 1, start: 872, count: 45,
    about: "அரங்கனுக்குச் சூட்டிய சொல்மாலை. தன் குறைகளை ஒப்புக்கொண்டு திருநாமத்தின் பெருமையைப் பாடும் சரணாகதிப் பனுவல். 'திருமாலை அறியாதார் திருமாலை அறியார்' என்பது பழமொழி.",
    highlight: "பச்சை மா மலை போல் மேனி",
  },
  {
    slug: "thiruppalliyezhuchi", name: "திருப்பள்ளியெழுச்சி", english: "Thiruppalliyezhuchi", azhwar: "thondaradippodi", ayiram: 1, start: 917, count: 10,
    about: "அதிகாலையில் அரங்கநாதனைத் துயிலெழுப்பும் பத்துப் பாசுரங்கள். கதிரவன் உதயம், வண்டுகளின் இசை, தேவர்களின் காத்திருப்பு எனக் காட்சிகள் விரிகின்றன.",
    highlight: "கதிரவன் குணதிசைச் சிகரம் வந்தணைந்தான்",
  },
  {
    slug: "amalanadhipiran", name: "அமலனாதிபிரான்", english: "Amalanadhipiran", azhwar: "thiruppan", ayiram: 1, start: 927, count: 10,
    about: "லோகசாரங்க முனிவரின் தோளில் அமர்ந்து அரங்கன் சந்நிதிக்குள் சென்ற திருப்பாணாழ்வார், திருவடி முதல் திருமுடி வரை அரங்கனைக் கண்டு பாடிய பத்துப் பாசுரங்கள்.",
    highlight: "என் அமுதினைக் கண்ட கண்கள் மற்றொன்றினைக் காணாவே",
  },
  {
    slug: "kanninun-siruthambu", name: "கண்ணிநுண் சிறுத்தாம்பு", english: "Kanninun Siruthambu", azhwar: "madhurakavi", ayiram: 1, start: 937, count: 11,
    about: "இறைவனை அல்ல, தன் ஆசார்யன் நம்மாழ்வாரையே பாடிய பதினொரு பாசுரங்கள். நாதமுனிகள் இதனை 12000 முறை ஜபித்து நாலாயிரத்தையும் மீட்டார் என்பது வரலாறு.",
    highlight: "தேவு மற்றறியேன் குருகூர் நம்பி",
  },
  {
    slug: "periya-thirumozhi", name: "பெரிய திருமொழி", english: "Periya Thirumozhi", azhwar: "thirumangai", ayiram: 2, start: 948, count: 1084,
    about: "'வாடினேன் வாடி' எனத் தொடங்கி நாராயண மந்திரத்தின் பெருமையைப் பாடி, வதரி முதல் திருக்குறுங்குடி வரை எண்ணற்ற திவ்ய தேசங்களைப் பாடும் மாபெரும் தல யாத்திரைப் பனுவல்.",
    highlight: "நான் கண்டுகொண்டேன் நாராயணா என்னும் நாமம்",
  },
  {
    slug: "thirukkurunthandakam", name: "திருக்குறுந்தாண்டகம்", english: "Thirukkurunthandakam", azhwar: "thirumangai", ayiram: 2, start: 2032, count: 20,
    about: "குறுந்தாண்டக யாப்பில் அமைந்த இருபது பாசுரங்கள். இறைவனை நினைந்து உருகும் ஆழ்வாரின் அனுபவம்.",
    highlight: "நிதியினைப் பவளத் தூணை",
  },
  {
    slug: "thirunedunthandakam", name: "திருநெடுந்தாண்டகம்", english: "Thirunedunthandakam", azhwar: "thirumangai", ayiram: 2, start: 2052, count: 30,
    about: "திருமங்கை ஆழ்வாரின் கடைசிப் பனுவல் என்பர். பரகால நாயகியாகவும், அவள் தாயாகவும், தோழியாகவும் பாடும் நாயகி பாவப் பாசுரங்கள். அரங்கத்தில் 'திருநெடுந்தாண்டக உற்சவம்' இதனால் தொடங்குகிறது.",
    highlight: "மின்னுருவாய் முன்னுருவில் வேதம் நான்காய்",
  },
  {
    slug: "mudhal-thiruvandhadi", name: "முதல் திருவந்தாதி", english: "Mudhal Thiruvandhadi", azhwar: "poigai", ayiram: 3, start: 2082, count: 100,
    about: "திருக்கோவலூர் இடைகழியில் பொய்கை ஆழ்வார் உலகையே அகலாக்கி ஏற்றிய முதல் ஞான விளக்கு. அந்தாதி யாப்பில் நூறு வெண்பாக்கள்.",
    highlight: "வையம் தகளியா வார்கடலே நெய்யாக",
  },
  {
    slug: "irandam-thiruvandhadi", name: "இரண்டாம் திருவந்தாதி", english: "Irandam Thiruvandhadi", azhwar: "bhoothath", ayiram: 3, start: 2182, count: 100,
    about: "அன்பையே அகலாக்கி ஆர்வத்தையே நெய்யாக்கி பூதத்தாழ்வார் ஏற்றிய இரண்டாம் விளக்கு. பக்தியின் இனிமையைப் பாடும் நூறு வெண்பாக்கள்.",
    highlight: "அன்பே தகளியா ஆர்வமே நெய்யாக",
  },
  {
    slug: "moondram-thiruvandhadi", name: "மூன்றாம் திருவந்தாதி", english: "Moondram Thiruvandhadi", azhwar: "pey", ayiram: 3, start: 2282, count: 100,
    about: "இரு விளக்குகளின் ஒளியில் பேயாழ்வார் இறைவனைத் திருமகளுடன் நேரில் கண்டு 'திருக்கண்டேன்' எனப் பாடிய நூறு வெண்பாக்கள்.",
    highlight: "திருக்கண்டேன் பொன்மேனி கண்டேன்",
  },
  {
    slug: "nanmugan-thiruvandhadi", name: "நான்முகன் திருவந்தாதி", english: "Nanmugan Thiruvandhadi", azhwar: "thirumazhisai", ayiram: 3, start: 2382, count: 96,
    about: "'நான்முகனை நாராயணன் படைத்தான்' எனத் தொடங்கி, நாராயணனே முழுமுதற் கடவுள் என்பதை நிறுவும் தத்துவப் பனுவல்.",
    highlight: "நான்முகனை நாராயணன் படைத்தான்",
  },
  {
    slug: "thiruviruttam", name: "திருவிருத்தம்", english: "Thiruviruttam", azhwar: "nammazhwar", ayiram: 3, start: 2478, count: 100,
    about: "அகப்பொருள் மரபில் பராங்குச நாயகியின் காதல் துயரைப் பாடும் நூறு கட்டளைக் கலித்துறைகள். ரிக் வேதத்தின் சாரம் என்பர்.",
    highlight: "பொய்ந்நின்ற ஞானமும் பொல்லா ஒழுக்கும்",
  },
  {
    slug: "thiruvasiriyam", name: "திருவாசிரியம்", english: "Thiruvasiriyam", azhwar: "nammazhwar", ayiram: 3, start: 2578, count: 7,
    about: "ஆசிரியப்பா யாப்பில் அமைந்த ஏழு நீண்ட பாசுரங்கள். யஜுர் வேதத்தின் சாரம் எனப் போற்றப்படுவது.",
    highlight: "செக்கர் மா முகில் உடுத்து",
  },
  {
    slug: "periya-thiruvandhadi", name: "பெரிய திருவந்தாதி", english: "Periya Thiruvandhadi", azhwar: "nammazhwar", ayiram: 3, start: 2585, count: 87,
    about: "தன் நெஞ்சோடு பேசி, இறைவனின் அளவற்ற பெருமையை வியக்கும் அந்தாதி. அதர்வண வேதத்தின் சாரம் என்பர்.",
    highlight: "முயற்றி சுமந்தெழுந்து முந்துற்ற நெஞ்சே",
  },
  {
    slug: "thiruvezhukootrirukkai", name: "திருவெழுகூற்றிருக்கை", english: "Thiruvezhukootrirukkai", azhwar: "thirumangai", ayiram: 3, start: 2672, count: 1,
    about: "ஒன்று முதல் ஏழு வரை எண்களை ஏறியும் இறங்கியும் அமைத்து, தேர் வடிவில் (ரத பந்தம்) எழுதப்பட்ட சித்திரக் கவி. திருக்குடந்தை ஆராவமுதனைப் பாடியது.",
    highlight: "ஒருபேருந்தி இருமலர்த் தவிசில்",
  },
  {
    slug: "siriya-thirumadal", name: "சிறிய திருமடல்", english: "Siriya Thirumadal", azhwar: "thirumangai", ayiram: 3, start: 2673, count: 78,
    about: "தலைவனை அடையாத தலைவி 'மடல் ஏறுவேன்' என்று அச்சுறுத்தும் துணிவான அகப்பொருள் மரபு. ஒரே கலிவெண்பா — இங்கு இரண்டு அடிகளுக்கு ஒரு கண்ணியாகப் பிரித்து எண்ணப்பட்டுள்ளது (77½ கண்ணிகள்).",
    highlight: "காரார் வரைக்கொங்கை கண்ணார் கடலுடுக்கை",
  },
  {
    slug: "periya-thirumadal", name: "பெரிய திருமடல்", english: "Periya Thirumadal", azhwar: "thirumangai", ayiram: 3, start: 2751, count: 148,
    about: "சிறிய திருமடலின் விரிவு. பரகால நாயகி திவ்ய தேசங்களைப் பெயர் சொல்லி அழைத்து மடலேறும் உறுதியைப் பாடுவது (148½ கண்ணிகள்).",
    highlight: "மன்னிய பல்பொறிசேர் ஆயிரவாய் வாளரவின்",
  },
  {
    slug: "thiruvaymozhi", name: "திருவாய்மொழி", english: "Thiruvaymozhi", azhwar: "nammazhwar", ayiram: 4, start: 2899, count: 1102,
    about: "பத்துப் பத்துகள், நூறு திருவாய்மொழிகள், 1102 பாசுரங்கள். 'உயர்வற உயர்நலம்' முதல் 'அவாவற்று வீடுபெற்ற' வரை — பரத்துவம், சௌலப்யம், சரணாகதி, மோட்சம் அனைத்தையும் பாடும் தமிழ் வேதம். ஒவ்வொரு பதிகத்துக்கும் பண் குறிக்கப்பட்டுள்ளது.",
    highlight: "உயர்வற உயர்நலம் உடையவன் யவன் அவன்",
  },
  {
    slug: "ramanuja-nootrandhadi", name: "இராமானுச நூற்றந்தாதி", english: "Ramanuja Nootrandhadi", azhwar: "amudhanar", ayiram: 3, start: 4001, count: 108,
    about: "திருவரங்கத்தமுதனார் இராமானுசரைப் போற்றிப் பாடிய 108 பாசுரங்கள். 'பிரபந்ந காயத்ரி' எனப் போற்றப்படுவது. நாலாயிரத்தின் எண்ணிக்கைக்கு வெளியே, இயற்பாவுடன் சேர்த்து ஓதப்படுகிறது.",
    highlight: "பூமன்னு மாது பொருந்திய மார்பன்",
  },
];

export const prabandhamBySlug = (slug: string) => PRABANDHAMS.find((p) => p.slug === slug);

export const prabandhamForNumber = (n: number) =>
  PRABANDHAMS.find((p) => n >= p.start && n < p.start + p.count);
