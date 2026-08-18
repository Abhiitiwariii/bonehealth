"use client";

import { useState } from "react";
import { orderedTestSuggestions } from "../../lib/testSuggestions";
import ExerciseVideo from "./ExerciseVideo";

function TestItem({ t }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 text-left"
      >
        <span className="font-semibold text-slate-800">
          <span className="lang-en">{t.title_en}</span>
          <span className="lang-hi">{t.title_hi}</span>
        </span>
        <span
          className={`shrink-0 text-amber-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      <div className={`accordion-track ${open ? "is-open" : ""}`}>
        <div className="accordion-inner">
          <div className="mt-2">
            <p className="text-sm lang-en">{t.who_en}</p>
            <p className="text-sm lang-hi">{t.who_hi}</p>
            <p className="text-sm mt-2 text-slate-500 lang-en">{t.why_en}</p>
            <p className="text-sm text-slate-400 lang-hi">{t.why_hi}</p>
            <ExerciseVideo
              videoId={t.videoId}
              videoSource={t.videoSource}
              videoSearch={t.videoSearch}
            />
            <p className="text-xs text-slate-400 mt-2">Source: {t.source}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestSuggestions({ profile }) {
  const tests = orderedTestSuggestions(profile);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 shadow-sm">
      <p className="text-lg font-semibold mb-1">
        🩺 <span className="lang-en">Tests Worth Asking About</span>
        <span className="lang-hi">पूछने लायक जांच</span>
      </p>
      <p className="text-sm text-slate-500 mb-4 lang-en">
        General education, not an order for any test. Ask your doctor which
        fits your situation.
      </p>
      <p className="text-sm text-slate-500 mb-4 lang-hi">
        सामान्य जानकारी, जांच का आदेश नहीं। डॉक्टर से पूछें कि आपके लिए कौन
        सी सही है।
      </p>

      <div className="space-y-3">
        {tests.map((t) => (
          <TestItem key={t.id} t={t} />
        ))}
      </div>
    </div>
  );
}
