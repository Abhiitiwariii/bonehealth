"use client";

// A small floating control for text size and contrast, aimed at older
// users who may need larger text or stronger contrast. Settings are saved
// to localStorage and applied as classes on <html>, so every page (which
// is styled in rem units) scales automatically.

import { useEffect, useState } from "react";

const SIZE_KEY = "arogya-text-size";
const CONTRAST_KEY = "arogya-high-contrast";
const sizes = ["normal", "large", "extra-large"];
const sizeLabels = { normal: "A", large: "A+", "extra-large": "A++" };

export default function AccessibilityControls() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedSize = localStorage.getItem(SIZE_KEY) || "normal";
    const savedContrast = localStorage.getItem(CONTRAST_KEY) === "true";
    setSize(savedSize);
    setHighContrast(savedContrast);
    applySize(savedSize);
    applyContrast(savedContrast);
  }, []);

  function applySize(value) {
    document.documentElement.classList.remove(
      "text-scale-normal",
      "text-scale-large",
      "text-scale-extra-large"
    );
    document.documentElement.classList.add(`text-scale-${value}`);
  }

  function applyContrast(value) {
    document.documentElement.classList.toggle("high-contrast", value);
  }

  function changeSize(value) {
    setSize(value);
    localStorage.setItem(SIZE_KEY, value);
    applySize(value);
  }

  function toggleContrast() {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem(CONTRAST_KEY, String(next));
    applyContrast(next);
  }

  return (
    <div className="fixed bottom-4 right-4 z-20">
      {open && (
        <div className="mb-2 bg-white border border-black/10 rounded-xl shadow-lg p-3 w-56">
          <p className="text-sm font-semibold mb-2">
            Text Size / अक्षर आकार
          </p>
          <div className="flex gap-2 mb-3">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => changeSize(s)}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold border ${
                  size === s
                    ? "bg-clay text-white border-clay"
                    : "bg-white text-ink border-black/15"
                }`}
              >
                {sizeLabels[s]}
              </button>
            ))}
          </div>
          <button
            onClick={toggleContrast}
            className={`w-full rounded-lg py-2 text-sm font-semibold border ${
              highContrast
                ? "bg-clay text-white border-clay"
                : "bg-white text-ink border-black/15"
            }`}
          >
            {highContrast ? "High Contrast: On" : "High Contrast: Off"}
            <br />
            <span className="text-xs font-normal">अधिक कंट्रास्ट</span>
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Accessibility settings"
        className="bg-ink text-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center text-xl"
      >
        ⚙
      </button>
    </div>
  );
}
