import {
  nutrientGroups,
  sampleDay,
  nutritionBasicsHi,
  vratFriendlyFoods,
} from "../../lib/diet";
import { supplements } from "../../lib/supplements";
import DietLogForm from "../components/DietLogForm";
import PageHero from "../components/PageHero";
import Collapsible from "../components/Collapsible";

export const metadata = {
  title: "Diet Guide | आहार मार्गदर्शिका",
};

const groupAccents = [
  "border-l-amber-400",
  "border-l-amber-400",
  "border-l-amber-400",
  "border-l-amber-400",
];

export default function DietPage() {
  return (
    <div>
      <PageHero
        emoji="🍽️"
        title_en="Vegetarian Bone-Health Diet"
        title_hi="शाकाहारी हड्डी-स्वास्थ्य आहार"
        subtitle_en="Calcium needs vitamin D, protein, and a few other nutrients. No single food does it alone."
        subtitle_hi="कैल्शियम को विटामिन डी, प्रोटीन, और कुछ अन्य पोषक तत्वों की ज़रूरत होती है। कोई एक भोजन अकेले काम नहीं करता।"
        from="from-emerald-400"
        to="to-green-600"
      />

      <DietLogForm />

      <div className="lang-hi mb-4">
        <Collapsible icon="📖" title_hi={nutritionBasicsHi.title}>
          <div className="space-y-2 text-sm leading-relaxed">
            {nutritionBasicsHi.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Collapsible>
      </div>

      <div className="space-y-4">
        {nutrientGroups.map((group, i) => (
          <div
            key={group.title_en}
            className={`relative overflow-hidden bg-white rounded-xl border border-slate-200 border-l-4 ${groupAccents[i % 4]} p-4 shadow-sm`}
          >
            <p className="text-lg font-semibold text-slate-800">
              {["🦴", "☀️", "🥜", "🥬"][i % 4]}{" "}
              <span className="lang-en">{group.title_en}</span>
              <span className="lang-hi">{group.title_hi}</span>
            </p>
            <p className="text-sm text-slate-500 italic mt-1 lang-en">{group.why_en}</p>
            <p className="text-sm text-slate-500 italic mt-1 lang-hi">{group.why_hi}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {group.foods.map((f, i) => (
                <li key={i}>
                  <span className="text-amber-500">●</span>{" "}
                  <span className="lang-en">{f.en}</span>
                  <span className="lang-hi">{f.hi}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <p className="text-lg font-semibold text-slate-800">
          🙏 <span className="lang-en">{vratFriendlyFoods.title_en}</span>
          <span className="lang-hi">{vratFriendlyFoods.title_hi}</span>
        </p>
        <p className="text-sm text-slate-500 italic mt-1 lang-en">{vratFriendlyFoods.note_en}</p>
        <p className="text-sm text-slate-500 italic mt-1 lang-hi">{vratFriendlyFoods.note_hi}</p>
        <ul className="mt-3 space-y-1 text-sm">
          {vratFriendlyFoods.foods.map((f, i) => (
            <li key={i}>
              <span className="text-amber-500">●</span>{" "}
              <span className="lang-en">{f.en}</span>
              <span className="lang-hi">{f.hi}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Collapsible icon="🍲" title_en="A Sample Day" title_hi="एक दिन का उदाहरण" defaultOpen>
          <div className="space-y-3">
            {sampleDay.map((m) => (
              <div key={m.meal_en} className="border-l-4 border-amber-200 pl-3">
                <p className="font-semibold">
                  <span className="lang-en">{m.meal_en}</span>
                  <span className="lang-hi">{m.meal_hi}</span>
                </p>
                <p className="text-sm lang-en">{m.idea_en}</p>
                <p className="text-sm text-slate-400 lang-hi">{m.idea_hi}</p>
              </div>
            ))}
          </div>
        </Collapsible>
      </div>

      <div className="mt-4">
        <Collapsible
          icon="💊"
          title_en="Supplements"
          title_hi="सप्लीमेंट"
          badge={supplements.length}
        >
          <p className="text-sm text-slate-500 mb-3 lang-en">
            Ask your doctor before starting any of these. Links open to NIH
            fact sheets, not a store.
          </p>
          <p className="text-sm text-slate-500 mb-3 lang-hi">
            इनमें से कोई भी शुरू करने से पहले डॉक्टर से पूछें। लिंक NIH की
            जानकारी पर खुलते हैं, किसी दुकान पर नहीं।
          </p>
          <ul className="space-y-3 text-sm">
            {supplements.map((s) => (
              <li key={s.name_en} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-700 underline decoration-amber-300 underline-offset-2"
                >
                  <span className="lang-en">{s.name_en}</span>
                  <span className="lang-hi">{s.name_hi}</span>
                </a>
                <p className="mt-1 lang-en">{s.info_en}</p>
                <p className="text-slate-400 lang-hi">{s.info_hi}</p>
              </li>
            ))}
          </ul>
        </Collapsible>
      </div>
    </div>
  );
}
