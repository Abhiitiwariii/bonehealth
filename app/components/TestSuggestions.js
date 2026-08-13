"use client";

import { orderedTestSuggestions } from "../../lib/testSuggestions";
import ExerciseVideo from "./ExerciseVideo";

export default function TestSuggestions({ profile }) {
  const tests = orderedTestSuggestions(profile);

  return (
    <div className="bg-white rounded-2xl border border-black/10 p-4 mb-4 shadow-sm">
      <p className="text-lg font-semibold mb-1">
        🩺 <span className="lang-en">Tests Worth Asking About</span>
        <span className="lang-hi">पूछने लायक जांच</span>
      </p>
      <p className="text-sm text-ink/70 mb-4 lang-en">
        General education, not an order for any test. Ask your doctor which
        fits your situation.
      </p>
      <p className="text-sm text-ink/70 mb-4 lang-hi">
        सामान्य जानकारी, जांच का आदेश नहीं। डॉक्टर से पूछें कि आपके लिए कौन
        सी सही है।
      </p>

      <div className="space-y-3">
        {tests.map((t) => (
          <details key={t.id} className="border-t border-black/5 pt-3 first:border-0 first:pt-0">
            <summary className="font-semibold text-clay cursor-pointer">
              <span className="lang-en">{t.title_en}</span>
              <span className="lang-hi">{t.title_hi}</span>
            </summary>
            <div className="mt-2">
              <p className="text-sm lang-en">{t.who_en}</p>
              <p className="text-sm lang-hi">{t.who_hi}</p>
              <p className="text-sm mt-2 text-ink/70 lang-en">{t.why_en}</p>
              <p className="text-sm text-ink/50 lang-hi">{t.why_hi}</p>
              <ExerciseVideo
                videoId={t.videoId}
                videoSource={t.videoSource}
                videoSearch={t.videoSearch}
              />
              <p className="text-xs text-ink/40 mt-2">Source: {t.source}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
