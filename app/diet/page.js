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
          Vegetarian Bone-Health Diet
        </p>
        <p className="text-sm text-ink/60">शाकाहारी हड्डी-स्वास्थ्य आहार</p>
        <p className="text-sm mt-2 text-ink/70">
          Calcium needs vitamin D, protein, and a few other nutrients to
          build strong bone. No single food does it alone. This is general
          guidance. Ask your doctor if a supplement is also needed.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-black/10 p-4 mb-4">
        <p className="text-lg font-semibold text-clay mb-2">
          {nutritionBasicsHi.title}
        </p>
        <div className="space-y-2 text-sm leading-relaxed">
          {nutritionBasicsHi.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {nutrientGroups.map((group) => (
          <div
            key={group.title_en}
            className="bg-white rounded-xl border border-black/10 p-4"
          >
            <p className="text-lg font-semibold text-clay">
              {group.title_en}
              <span className="text-ink/60 font-normal text-base">
                {" "}
                · {group.title_hi}
              </span>
            </p>
            <p className="text-sm text-ink/60 italic mt-1">
              {group.why_en}
            </p>
            <p className="text-sm text-ink/40 italic">{group.why_hi}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {group.foods.map((f, i) => (
                <li key={i}>
                  <span className="text-sage">●</span> {f.en}
                  <span className="text-ink/50"> · {f.hi}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold text-clay">
          {vratFriendlyFoods.title_en}
          <span className="text-ink/60 font-normal text-base">
            {" "}
            · {vratFriendlyFoods.title_hi}
          </span>
        </p>
        <p className="text-sm text-ink/60 italic mt-1">{vratFriendlyFoods.note_en}</p>
        <p className="text-sm text-ink/40 italic">{vratFriendlyFoods.note_hi}</p>
        <ul className="mt-3 space-y-1 text-sm">
          {vratFriendlyFoods.foods.map((f, i) => (
            <li key={i}>
              <span className="text-sage">●</span> {f.en}
              <span className="text-ink/50"> · {f.hi}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold mb-3">
          A Sample Day / एक दिन का उदाहरण
        </p>
        <div className="space-y-3">
          {sampleDay.map((m) => (
            <div key={m.meal_en} className="border-l-4 border-sage/40 pl-3">
              <p className="font-semibold">
                {m.meal_en} <span className="text-ink/50">· {m.meal_hi}</span>
              </p>
              <p className="text-sm">{m.idea_en}</p>
              <p className="text-sm text-ink/50">{m.idea_hi}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold mb-1">
          Supplements / सप्लीमेंट
        </p>
        <p className="text-sm text-ink/60 mb-3">
          Ask your doctor before starting any of these. Links open in a new
          tab to the NIH's public fact sheets, not a store.
          <br />
          इनमें से कोई भी शुरू करने से पहले डॉक्टर से पूछें। लिंक नए टैब में
          NIH की सार्वजनिक जानकारी पर खुलते हैं, किसी दुकान पर नहीं।
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
                {s.name_en} <span className="text-ink/60 font-normal">· {s.name_hi}</span>
              </a>
              <p className="mt-1">{s.info_en}</p>
              <p className="text-ink/50">{s.info_hi}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
