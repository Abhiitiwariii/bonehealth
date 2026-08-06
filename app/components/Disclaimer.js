"use client";

// Medical disclaimer, kept but collapsible/dismissible so it doesn't push
// the main grid down on repeat visits. Remembers the dismissal per device.

import { useEffect, useState } from "react";

const DISMISS_KEY = "arogya-disclaimer-dismissed";

export default function Disclaimer() {
  const [dismissed, setDismissed] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "true");
    setHydrated(true);
  }, []);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, "true");
  }

  function reopen() {
    setDismissed(false);
    localStorage.setItem(DISMISS_KEY, "false");
  }

  if (!hydrated) return null;

  if (dismissed) {
    return (
      <button
        onClick={reopen}
        className="w-full text-left bg-white border border-black/10 rounded-xl px-4 py-2 mb-6 text-sm text-ink/60 flex items-center gap-2"
      >
        <span>⚠️</span>
        <span className="lang-en">Please read first</span>
        <span className="lang-hi">पहले यह पढ़ें</span>
      </button>
    );
  }

  return (
    <div className="bg-sage/10 border border-sage/30 rounded-xl p-4 mb-6 text-sm leading-relaxed">
      <div className="flex items-start justify-between gap-3">
        <p className="font-semibold text-sage mb-1">
          <span className="lang-en">Please read first</span>
          <span className="lang-hi">पहले यह पढ़ें</span>
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 w-7 h-7 rounded-full bg-white border border-black/10 text-ink/60 flex items-center justify-center"
        >
          ✕
        </button>
      </div>
      <p className="lang-en">
        General home-exercise and diet ideas, not medical advice. Show this
        routine to your doctor before starting, and stop any exercise that
        hurts.
      </p>
      <p className="lang-hi">
        सामान्य घरेलू व्यायाम और आहार सुझाव, चिकित्सीय सलाह नहीं। शुरू करने
        से पहले डॉक्टर को दिखाएं, और दर्द होने पर व्यायाम तुरंत रोकें।
      </p>
    </div>
  );
}
