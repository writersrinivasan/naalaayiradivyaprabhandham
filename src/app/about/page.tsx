export const metadata = { title: "மூலங்கள் & முறைமை | நாலாயிர திவ்ய பிரபந்தம்" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-[1.02rem]">
      <h1 className="font-display text-4xl text-maroon">மூலங்கள் & முறைமை</h1>
      <section className="card space-y-3 p-6">
        <h2 className="font-display text-xl text-maroon">பாடம் (Text)</h2>
        <p>
          3,450-க்கும் மேற்பட்ட பாசுரங்களின் மூலம், ஆங்கில மொழிபெயர்ப்பு, சொல்லுக்குச் சொல் அகராதி ஆகியவை University of Hamburg TAMILEX திட்டத்தின்{" "}
          <a className="text-peacock underline" href="https://github.com/UHH-Tamilex/NalayiratTivviyapPirapantam">TEI பதிப்பிலிருந்து</a> எடுக்கப்பட்டவை. அங்கு ISO-15919 ஒலிபெயர்ப்பில் உள்ள பாடம் தமிழ் எழுத்துக்கு மாற்றப்பட்டுள்ளது.
        </p>
        <p>
          திருவாய்மொழி 6–10 பத்துகள், இராமானுச நூற்றந்தாதி, திருவாய்மொழிப் பண்கள் ஆகியவை{" "}
          <a className="text-peacock underline" href="https://github.com/raghuyennamalli/NDP_Pann_Prediction">NDP_Pann_Prediction</a> தரவிலிருந்து.
        </p>
        <p>
          எண் முறை: திருப்பல்லாண்டு 1 முதல் திருவாய்மொழி 4000 வரை. சிறிய திருமடல் (77½) மற்றும் பெரிய திருமடல் (148½) இரண்டு அடிகளுக்கு ஒரு கண்ணியாகப் பிரிக்கப்பட்டு 78 + 148 என எண்ணப்பட்டுள்ளன. இராமானுச நூற்றந்தாதி 4001–4108 என இணைப்பாக உள்ளது.
        </p>
      </section>
      <section className="card space-y-3 p-6">
        <h2 className="font-display text-xl text-maroon">தானியங்கிக் குறிப்புகள்</h2>
        <p>திவ்ய தேசம், அவதாரம், சங்கு–சக்கரம், திருநாமங்கள் ஆகியவை பாசுரச் சொற்களில் சொல் தேடல் மூலம் கண்டறியப்படுகின்றன. இவை தோராயமானவை; மரபு உரைகள் தரும் துல்லிய எண்ணிக்கைகளிலிருந்து மாறுபடலாம்.</p>
      </section>
      <section className="card space-y-3 p-6">
        <h2 className="font-display text-xl text-maroon">AI முகவர் (LangGraph + Groq, BYOK)</h2>
        <p>
          ஒவ்வொரு பாசுரப் பக்கத்திலும் உள்ள முகவர் ஐந்து படிகளில் இயங்குகிறது: பாசுரத்தையும் அதன் முன்–பின் பாசுரங்களையும் திரட்டல் → சொல் அகராதி ஆய்வு → Groq மாதிரி மூலம் தமிழ்ப் பொழிப்புரை, பதவுரை, விளக்கம், உணர்வுகள், கதைச் சூழல் → தமிழ்த் தரச் சரிபார்ப்பு (குறையிருந்தால் மீண்டும் எழுதுதல்) → தகவல் வரைபடம்.
        </p>
        <p>AI வசதிக்கு உங்கள் சொந்த Groq API key-ஐப் பாசுரப் பக்கத்தில் உள்ள “🔑 Groq API key” பகுதியில் இடுங்கள். அது உங்கள் உலாவியில் மட்டுமே சேமிக்கப்படும்.</p>
        <p className="text-sm text-muted">AI விளக்கங்கள் வாசிப்புக்கு உதவும் துணை மட்டுமே; பெரியவாச்சான் பிள்ளை முதலான ஆன்றோர் வியாக்கியானங்களே முதன்மை.</p>
      </section>
      <section className="card space-y-3 p-6">
        <h2 className="font-display text-xl text-maroon">ஆழ்வார் கதைகள்</h2>
        <p>குருபரம்பரை மரபில் வழங்கும் கதைகளை எளிய தமிழில் சுருக்கித் தந்துள்ளோம். பல கதைகளுக்குப் பல வடிவங்கள் உண்டு; காலக் குறிப்புகள் மரபுப்படியும் வரலாற்றாசிரியர் கணிப்புப்படியும் வேறுபடுகின்றன.</p>
      </section>
    </div>
  );
}
