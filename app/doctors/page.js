"use client";

import { useState } from "react";
import {
  mapsSearchByCity,
  webSearchByCity,
  practoSearchByCity,
  mapsSearchByCoords,
} from "../../lib/doctorSearch";
import {
  whatIsIt,
  whenRecommended_en,
  whenRecommended_hi,
  alternatives,
  benefitsAndRisks,
  recoveryTimeline,
  commonFears,
  questionsToAsk_en,
  questionsToAsk_hi,
} from "../../lib/kneeAwareness";

export default function DoctorsPage() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [locError, setLocError] = useState("");
  const [locating, setLocating] = useState(false);

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocError("Location is not available on this device / इस डिवाइस पर लोकेशन उपलब्ध नहीं है");
      return;
    }
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocError("Could not get your location. Please allow access or type your city instead. / लोकेशन नहीं मिली, कृपया अनुमति दें या शहर टाइप करें");
        setLocating(false);
      }
    );
  }

  const canSearchCity = city.trim().length > 0;

  return (
    <div>
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">📍 Find a Specialist Near You</p>
        <p className="text-sm text-ink/60">अपने पास विशेषज्ञ खोजें</p>
        <p className="text-sm mt-2 text-ink/70">
          This app does not keep its own list of doctors. Instead it builds a
          live search for orthopedic knee specialists near the place you
          enter, so results stay current for any city.
        </p>
        <p className="text-sm text-ink/50 mt-1">
          यह ऐप अपनी कोई डॉक्टर सूची नहीं रखता। इसकी जगह, आपके बताए स्थान के
          पास आर्थोपेडिक घुटना विशेषज्ञों की जीवंत खोज बनाता है, ताकि परिणाम
          किसी भी शहर के लिए ताज़ा रहें।
        </p>
      </div>

      <div className="bg-white rounded-xl border border-black/10 p-4 mb-6">
        <label className="block mb-3">
          <span className="font-semibold">City or area / शहर या इलाका</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Pune, Andheri Mumbai, Jabalpur"
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
          />
        </label>

        {canSearchCity && (
          <div className="flex flex-wrap gap-2 mb-4">
            <a
              href={mapsSearchByCity(city.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-clay text-white rounded-lg px-3 py-2"
            >
              📍 Search Google Maps / मैप्स पर खोजें
            </a>
            <a
              href={webSearchByCity(city.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-sage/10 text-sage border border-sage/30 rounded-lg px-3 py-2"
            >
              🔎 Web Search / वेब खोज
            </a>
            <a
              href={practoSearchByCity(city.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-sage/10 text-sage border border-sage/30 rounded-lg px-3 py-2"
            >
              🩺 Practo
            </a>
          </div>
        )}

        <div className="border-t border-black/5 pt-3">
          <button
            onClick={useMyLocation}
            disabled={locating}
            className="text-sm bg-ink/5 border border-black/10 rounded-lg px-3 py-2"
          >
            {locating ? "Locating... / खोज रहे हैं..." : "📡 Use My Location / मेरी लोकेशन उपयोग करें"}
          </button>
          {locError && <p className="text-sm text-clay mt-2">{locError}</p>}
          {coords && (
            <div className="mt-3">
              <a
                href={mapsSearchByCoords(coords.lat, coords.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-clay text-white rounded-lg px-3 py-2 inline-block"
              >
                📍 See Specialists Near Me / मेरे पास विशेषज्ञ देखें
              </a>
            </div>
          )}
        </div>

        <p className="text-xs text-ink/40 mt-4">
          These links open Google Maps, Google Search, or Practo in a new tab.
          Always confirm a doctor's qualifications, experience, and reviews
          yourself before booking an appointment.
          <br />
          ये लिंक Google मैप्स, Google खोज, या Practo को नए टैब में खोलते हैं।
          अपॉइंटमेंट लेने से पहले डॉक्टर की योग्यता, अनुभव और समीक्षाएं खुद
          जांच लें।
        </p>
      </div>

      <div className="bg-clay/10 border border-clay/30 rounded-xl p-4 mb-6">
        <p className="text-lg font-semibold text-clay">
          🦵 Understanding Knee Replacement
        </p>
        <p className="text-sm text-ink/60 mb-2">घुटना प्रतिस्थापन को समझना</p>
        <p className="text-sm">
          If your doctor has recommended knee replacement and you're
          hesitant, that's a completely normal reaction. Tap any topic below
          to read the full details when you're ready.
        </p>
        <p className="text-sm text-ink/60 mt-1">
          अगर आपके डॉक्टर ने घुटना प्रतिस्थापन की सलाह दी है और आप हिचकिचा
          रहे हैं, तो यह बिल्कुल सामान्य प्रतिक्रिया है। जब चाहें, नीचे किसी
          भी विषय पर टैप करके पूरी जानकारी पढ़ें।
        </p>
      </div>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          ❓ What it is / यह क्या है
        </summary>
        <div className="mt-3">
          <p className="text-sm">{whatIsIt.en}</p>
          <p className="text-sm text-ink/50 mt-1">{whatIsIt.hi}</p>
        </div>
      </details>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          ⚠️ When it's usually recommended / कब सलाह दी जाती है
        </summary>
        <ul className="mt-3 space-y-1 text-sm">
          {whenRecommended_en.map((t, i) => (
            <li key={i}>
              <span className="text-sage">●</span> {t}
              <br />
              <span className="text-ink/50">{whenRecommended_hi[i]}</span>
            </li>
          ))}
        </ul>
      </details>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          🩹 Non-surgical options usually tried first / पहले आज़माए जाने वाले गैर-सर्जिकल विकल्प
        </summary>
        <ul className="mt-3 space-y-2 text-sm">
          {alternatives.map((a) => (
            <li key={a.en}>
              <span className="font-medium">{a.en}</span>{" "}
              <span className="text-ink/50">· {a.hi}</span>
              <p className="text-ink/60">{a.note_en}</p>
              <p className="text-ink/40">{a.note_hi}</p>
            </li>
          ))}
        </ul>
      </details>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          ⚖️ Benefits and risks / फायदे और जोखिम
        </summary>
        <div className="mt-3">
          <p className="font-semibold mb-2">Benefits / फायदे</p>
          <ul className="space-y-1 text-sm mb-3">
            {benefitsAndRisks.benefits_en.map((t, i) => (
              <li key={i}>
                <span className="text-sage">●</span> {t}
                <br />
                <span className="text-ink/50">{benefitsAndRisks.benefits_hi[i]}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold mb-2">Risks / जोखिम</p>
          <ul className="space-y-1 text-sm">
            {benefitsAndRisks.risks_en.map((t, i) => (
              <li key={i}>
                <span className="text-clay">●</span> {t}
                <br />
                <span className="text-ink/50">{benefitsAndRisks.risks_hi[i]}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          📅 Recovery timeline / रिकवरी की समयरेखा
        </summary>
        <ul className="mt-3 space-y-2 text-sm">
          {recoveryTimeline.map((r) => (
            <li key={r.period_en} className="border-l-4 border-sage/40 pl-3">
              <p className="font-medium">
                {r.period_en} <span className="text-ink/50">· {r.period_hi}</span>
              </p>
              <p className="text-ink/60">{r.detail_en}</p>
              <p className="text-ink/40">{r.detail_hi}</p>
            </li>
          ))}
        </ul>
      </details>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          💬 Common fears, answered honestly / आम डर, ईमानदार जवाब
        </summary>
        <ul className="mt-3 space-y-3 text-sm">
          {commonFears.map((f) => (
            <li key={f.fear_en}>
              <p className="font-medium italic">{f.fear_en}</p>
              <p className="italic text-ink/50">{f.fear_hi}</p>
              <p className="mt-1">{f.response_en}</p>
              <p className="text-ink/50">{f.response_hi}</p>
            </li>
          ))}
        </ul>
      </details>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          🗣️ Questions worth asking your doctor / डॉक्टर से पूछने लायक सवाल
        </summary>
        <ol className="mt-3 list-decimal list-inside space-y-1 text-sm">
          {questionsToAsk_en.map((q, i) => (
            <li key={i}>
              {q}
              <br />
              <span className="text-ink/50 list-none">{questionsToAsk_hi[i]}</span>
            </li>
          ))}
        </ol>
      </details>

      <p className="text-center text-xs text-ink/40 mt-4">
        This is general education, not a diagnosis or a recommendation for
        or against surgery. The decision belongs to you, in consultation
        with your own doctor.
        <br />
        यह सामान्य जानकारी है, निदान या सर्जरी के पक्ष/विपक्ष में सुझाव नहीं।
        निर्णय आपका है, अपने डॉक्टर के परामर्श से।
      </p>
    </div>
  );
}
