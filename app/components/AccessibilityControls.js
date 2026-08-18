"use client";

// Text size and contrast controls for older users who may need larger
// text or stronger contrast. Now lives inline in the Profile > Settings
// section (moved off the floating gear button per the redesign). Settings
// are saved to localStorage and applied as classes on <html>, so every
// page (styled in rem units) scales automatically.

import { useEffect, useState } from "react";

const SIZE_KEY = "arogya-text-size";
const CONTRAST_KEY = "arogya-high-contrast";
const sizes = ["normal", "large", "extra-large"];
const sizeLabels = { normal: "A", large: "A+", "extra-large": "A++" };

export default function AccessibilityControls() {
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
    <div>
      <p className="text-sm font-semibold mb-2">
        <span className="lang-en">Text Size</span>
        <span className="lang-hi">अक्षर आकार</span>
      </p>
      <div className="flex gap-2 mb-3">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => changeSize(s)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold border ${
              size === s
                ? "bg-primary text-white border-primary"
                : "bg-white text-slate-800 border-slate-200"
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
            ? "bg-primary text-white border-primary"
            : "bg-white text-slate-800 border-slate-200"
        }`}
      >
        <span className="lang-en">{highContrast ? "High Contrast: On" : "High Contrast: Off"}</span>
        <span className="lang-hi">{highContrast ? "अधिक कंट्रास्ट: चालू" : "अधिक कंट्रास्ट: बंद"}</span>
      </button>
    </div>
  );
}
