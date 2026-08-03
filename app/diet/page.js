import {
  nutrientGroups,
  sampleDay,
  nutritionBasicsHi,
  vratFriendlyFoods,
} from "../../lib/diet";
import { supplements } from "../../lib/supplements";

export const metadata = {
  title: "Diet Guide | आहार मार्गदर्शिका",
};

export default function DietPage() {
  return (
    <div>
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">
          🍽️ <span className="lang-en">Vegetarian Bone-Health Diet</span>
          <span className="lang-hi">शाकाहारी हड्डी-स्वास्थ्य आहार</span>
        </p>
        <p className="text-sm mt-2 text-ink/70 lang-en">
          Calcium needs vitamin D, protein, and a few other nutrients. No
          single food does it alone.
        </p>
        <p className="text-sm mt-2 text-ink/70 lang-hi">
          कैल्शियम को विटामिन डी, प्रोटीन, और कुछ अन्य पोषक तत्वों की ज़रूरत
          होती है। कोई एक भोजन अकेले काम नहीं करता।
        </p>
      </div>

      <details className="bg-white rounded-xl border border-black/10 p-4 mb-4 lang-hi">
        <summary className="text-lg font-semibold text-clay cursor-pointer">
          📖 {nutritionBasicsHi.title}
        </summary>
        <div className="mt-3 space-y-2 text-sm leading-relaxed">
          {nutritionBasicsHi.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </details>

      <div className="space-y-4">
        {nutrientGroups.map((group, i) => (
          <div
            key={group.title_en}
            className="bg-white rounded-xl border border-black/10 p-4"
          >
            <p className="text-lg font-semibold text-clay">
              {["🦴", "☀️", "🥜", "🥬"][i % 4]}{" "}
              <span className="lang-en">{group.title_en}</span>
              <span className="lang-hi">{group.title_hi}</span>
            </p>
            <p className="text-sm text-ink/60 italic mt-1 lang-en">{group.why_en}</p>
            <p className="text-sm text-ink/60 italic mt-1 lang-hi">{group.why_hi}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {group.foods.map((f, i) => (
                <li key={i}>
                  <span className="text-sage">●</span>{" "}
                  <span className="lang-en">{f.en}</span>
                  <span className="lang-hi">{f.hi}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold text-clay">
          🙏 <span className="lang-en">{vratFriendlyFoods.title_en}</span>
          <span className="lang-hi">{vratFriendlyFoods.title_hi}</span>
        </p>
        <p className="text-sm text-ink/60 italic mt-1 lang-en">{vratFriendlyFoods.note_en}</p>
        <p className="text-sm text-ink/60 italic mt-1 lang-hi">{vratFriendlyFoods.note_hi}</p>
        <ul className="mt-3 space-y-1 text-sm">
          {vratFriendlyFoods.foods.map((f, i) => (
            <li key={i}>
              <span className="text-sage">●</span>{" "}
              <span className="lang-en">{f.en}</span>
              <span className="lang-hi">{f.hi}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold mb-3">
          🍲 <span className="lang-en">A Sample Day</span>
          <span className="lang-hi">एक दिन का उदाहरण</span>
        </p>
        <div className="space-y-3">
          {sampleDay.map((m) => (
            <div key={m.meal_en} className="border-l-4 border-sage/40 pl-3">
              <p className="font-semibold">
                <span className="lang-en">{m.meal_en}</span>
                <span className="lang-hi">{m.meal_hi}</span>
              </p>
              <p className="text-sm lang-en">{m.idea_en}</p>
              <p className="text-sm text-ink/50 lang-hi">{m.idea_hi}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold mb-1">
          💊 <span className="lang-en">Supplements</span>
          <span className="lang-hi">सप्लीमेंट</span>
        </p>
        <p className="text-sm text-ink/60 mb-3 lang-en">
          Ask your doctor before starting any of these. Links open to NIH
          fact sheets, not a store.
        </p>
        <p className="text-sm text-ink/60 mb-3 lang-hi">
          इनमें से कोई भी शुरू करने से पहले डॉक्टर से पूछें। लिंक NIH की
          जानकारी पर खुलते हैं, किसी दुकान पर नहीं।
        </p>
        <ul className="space-y-3 text-sm">
          {supplements.map((s) => (
            <li key={s.name_en} className="border-t border-black/5 pt-3 first:border-0 first:pt-0">
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sage underline decoration-sage/40 underline-offset-2"
              >
                <span className="lang-en">{s.name_en}</span>
                <span className="lang-hi">{s.name_hi}</span>
              </a>
              <p className="mt-1 lang-en">{s.info_en}</p>
              <p className="text-ink/50 lang-hi">{s.info_hi}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
