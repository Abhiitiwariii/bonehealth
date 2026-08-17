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
import PageHero from "../components/PageHero";
import Collapsible from "../components/Collapsible";

export default function DoctorsPage() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [locError, setLocError] = useState("");
  const [locating, setLocating] = useState(false);

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocError("Location not available on this device / लोकेशन उपलब्ध नहीं है");
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
        setLocError("Couldn't get your location. Type your city instead. / लोकेशन नहीं मिली, शहर टाइप करें");
        setLocating(false);
      }
    );
  }

  const canSearchCity = city.trim().length > 0;

  return (
    <div>
      <PageHero
        emoji="📍"
        title_en="Find a Specialist Near You"
        title_hi="अपने पास विशेषज्ञ खोजें"
        subtitle_en="Builds a live search for orthopedic knee specialists near you, rather than keeping a fixed list."
        subtitle_hi="आपके पास आर्थोपेडिक घुटना विशेषज्ञों की जीवंत खोज बनाता है, कोई स्थिर सूची नहीं रखता।"
        from="from-pink-400"
        to="to-rose-600"
      />

      <div className="bg-white rounded-xl border border-black/10 p-4 mb-6 shadow-sm">
        <label className="block mb-3">
          <span className="font-semibold lang-en">City or area</span>
          <span className="font-semibold lang-hi">शहर या इलाका</span>
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
              className="text-sm bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium rounded-lg px-3 py-2 shadow-sm active:scale-[0.97] transition-transform"
            >
              📍 <span className="lang-en">Google Maps</span>
              <span className="lang-hi">मैप्स</span>
            </a>
            <a
              href={webSearchByCity(city.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-sage/10 text-sage border border-sage/30 rounded-lg px-3 py-2 active:scale-[0.97] transition-transform"
            >
              🔎 <span className="lang-en">Web Search</span>
              <span className="lang-hi">वेब खोज</span>
            </a>
            <a
              href={practoSearchByCity(city.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-sage/10 text-sage border border-sage/30 rounded-lg px-3 py-2 active:scale-[0.97] transition-transform"
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
            📡{" "}
            <span className="lang-en">{locating ? "Locating..." : "Use My Location"}</span>
            <span className="lang-hi">{locating ? "खोज रहे हैं..." : "मेरी लोकेशन उपयोग करें"}</span>
          </button>
          {locError && <p className="text-sm text-clay mt-2">{locError}</p>}
          {coords && (
            <div className="mt-3">
              <a
                href={mapsSearchByCoords(coords.lat, coords.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium rounded-lg px-3 py-2 inline-block shadow-sm active:scale-[0.97] transition-transform"
              >
                📍 <span className="lang-en">Specialists Near Me</span>
                <span className="lang-hi">मेरे पास विशेषज्ञ</span>
              </a>
            </div>
          )}
        </div>

        <p className="text-xs text-ink/40 mt-4 lang-en">
          Opens Google Maps, Search, or Practo in a new tab. Confirm a
          doctor's credentials yourself before booking.
        </p>
        <p className="text-xs text-ink/40 mt-4 lang-hi">
          Google मैप्स, खोज, या Practo को नए टैब में खोलता है। बुकिंग से
          पहले डॉक्टर की योग्यता खुद जांच लें।
        </p>
      </div>

      <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold text-rose-700">
          🦵 <span className="lang-en">Understanding Knee Replacement</span>
          <span className="lang-hi">घुटना प्रतिस्थापन को समझना</span>
        </p>
        <p className="text-sm mt-2 lang-en">
          Hesitant about a recommended knee replacement? That's normal. Tap
          any topic below for the full picture.
        </p>
        <p className="text-sm mt-2 lang-hi">
          घुटना प्रतिस्थापन को लेकर हिचकिचाहट सामान्य है। नीचे किसी भी विषय
          पर टैप करें।
        </p>
      </div>

      <div className="space-y-4 mb-4">
        <Collapsible icon="❓" title_en="What it is" title_hi="यह क्या है">
          <p className="text-sm lang-en">{whatIsIt.en}</p>
          <p className="text-sm lang-hi">{whatIsIt.hi}</p>
        </Collapsible>

        <Collapsible
          icon="⚠️"
          title_en="When it's usually recommended"
          title_hi="कब सलाह दी जाती है"
        >
          <ul className="space-y-1 text-sm">
            {whenRecommended_en.map((t, i) => (
              <li key={i}>
                <span className="text-sage">●</span>{" "}
                <span className="lang-en">{t}</span>
                <span className="lang-hi">{whenRecommended_hi[i]}</span>
              </li>
            ))}
          </ul>
        </Collapsible>

        <Collapsible
          icon="🩹"
          title_en="Non-surgical options tried first"
          title_hi="पहले आज़माए जाने वाले विकल्प"
        >
          <ul className="space-y-2 text-sm">
            {alternatives.map((a) => (
              <li key={a.en}>
                <span className="font-medium lang-en">{a.en}</span>
                <span className="font-medium lang-hi">{a.hi}</span>
                <p className="text-ink/60 lang-en">{a.note_en}</p>
                <p className="text-ink/50 lang-hi">{a.note_hi}</p>
              </li>
            ))}
          </ul>
        </Collapsible>

        <Collapsible icon="⚖️" title_en="Benefits and risks" title_hi="फायदे और जोखिम">
          <p className="font-semibold mb-2">
            <span className="lang-en">Benefits</span>
            <span className="lang-hi">फायदे</span>
          </p>
          <ul className="space-y-1 text-sm mb-3">
            {benefitsAndRisks.benefits_en.map((t, i) => (
              <li key={i}>
                <span className="text-sage">●</span>{" "}
                <span className="lang-en">{t}</span>
                <span className="lang-hi">{benefitsAndRisks.benefits_hi[i]}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold mb-2">
            <span className="lang-en">Risks</span>
            <span className="lang-hi">जोखिम</span>
          </p>
          <ul className="space-y-1 text-sm">
            {benefitsAndRisks.risks_en.map((t, i) => (
              <li key={i}>
                <span className="text-clay">●</span>{" "}
                <span className="lang-en">{t}</span>
                <span className="lang-hi">{benefitsAndRisks.risks_hi[i]}</span>
              </li>
            ))}
          </ul>
        </Collapsible>

        <Collapsible icon="📅" title_en="Recovery timeline" title_hi="रिकवरी की समयरेखा">
          <ul className="space-y-2 text-sm">
            {recoveryTimeline.map((r) => (
              <li key={r.period_en} className="border-l-4 border-sage/40 pl-3">
                <p className="font-medium">
                  <span className="lang-en">{r.period_en}</span>
                  <span className="lang-hi">{r.period_hi}</span>
                </p>
                <p className="text-ink/60 lang-en">{r.detail_en}</p>
                <p className="text-ink/50 lang-hi">{r.detail_hi}</p>
              </li>
            ))}
          </ul>
        </Collapsible>

        <Collapsible
          icon="💬"
          title_en="Common fears, answered honestly"
          title_hi="आम डर, ईमानदार जवाब"
        >
          <ul className="space-y-3 text-sm">
            {commonFears.map((f) => (
              <li key={f.fear_en}>
                <p className="font-medium italic lang-en">{f.fear_en}</p>
                <p className="italic lang-hi">{f.fear_hi}</p>
                <p className="mt-1 lang-en">{f.response_en}</p>
                <p className="text-ink/50 lang-hi">{f.response_hi}</p>
              </li>
            ))}
          </ul>
        </Collapsible>

        <Collapsible
          icon="🗣️"
          title_en="Questions worth asking your doctor"
          title_hi="डॉक्टर से पूछने लायक सवाल"
        >
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {questionsToAsk_en.map((q, i) => (
              <li key={i}>
                <span className="lang-en">{q}</span>
                <span className="lang-hi list-none">{questionsToAsk_hi[i]}</span>
              </li>
            ))}
          </ol>
        </Collapsible>
      </div>

      <p className="text-center text-xs text-ink/40 mt-4 lang-en">
        General education, not a diagnosis or a push either way. The
        decision is yours, with your doctor.
      </p>
      <p className="text-center text-xs text-ink/40 mt-4 lang-hi">
        सामान्य जानकारी, निदान या किसी दिशा में सुझाव नहीं। निर्णय आपका है,
        अपने डॉक्टर के साथ।
      </p>
    </div>
  );
}
