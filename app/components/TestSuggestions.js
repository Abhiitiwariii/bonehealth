"use client";

import { orderedTestSuggestions } from "../../lib/testSuggestions";
import ExerciseVideo from "./ExerciseVideo";

export default function TestSuggestions({ profile }) {
  const tests = orderedTestSuggestions(profile);

  return (
    <div className="bg-white rounded-xl border border-black/10 p-4 mb-4">
      <p className="text-lg font-semibold mb-1">
        🩺 Tests Worth Asking Your Doctor About
      </p>
      <p className="text-sm text-ink/60 mb-3">
        डॉक्टर से पूछने लायक जांच
      </p>
      <p className="text-sm text-ink/70 mb-4">
        This is general education, not a diagnosis or an order for any
        test. Whether a test makes sense for you depends on your full
        health picture, which only your doctor can assess.
        <br />
        <span className="text-ink/50">
          यह सामान्य जानकारी है, निदान या जांच का आदेश नहीं। आपके लिए कौन सी
          जांच सही है, यह पूरी तरह डॉक्टर ही तय कर सकते हैं।
        </span>
      </p>

      <div className="space-y-4">
        {tests.map((t) => (
          <div key={t.id} className="border-t border-black/5 pt-4 first:border-0 first:pt-0">
            <p className="font-semibold text-clay">
              {t.title_en}
              <span className="text-ink/60 font-normal text-sm"> · {t.title_hi}</span>
            </p>
            <p className="text-sm mt-1">
              <span className="font-medium">Who it's usually for:</span> {t.who_en}
            </p>
            <p className="text-sm text-ink/50">{t.who_hi}</p>
            <p className="text-sm mt-2 text-ink/70">{t.why_en}</p>
            <p className="text-sm text-ink/40">{t.why_hi}</p>
            <ExerciseVideo
              videoId={t.videoId}
              videoSource={t.videoSource}
              videoSearch={t.videoSearch}
            />
            <p className="text-xs text-ink/40 mt-2">Source: {t.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
