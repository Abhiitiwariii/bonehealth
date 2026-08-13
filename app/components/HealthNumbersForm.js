"use client";

import { useEffect, useState } from "react";
import {
  emptyHealthNumbers,
  loadHealthNumbers,
  saveHealthNumbers,
} from "../../lib/healthNumbers";

export default function HealthNumbersForm() {
  const [values, setValues] = useState(emptyHealthNumbers);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValues(loadHealthNumbers());
  }, []);

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handleSave() {
    saveHealthNumbers(values);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl border border-black/10 p-4 mb-4 shadow-sm">
      <p className="text-lg font-semibold mb-1">
        🔢 <span className="lang-en">Your Report Numbers (optional)</span>
        <span className="lang-hi">आपकी रिपोर्ट के आंकड़े (वैकल्पिक)</span>
      </p>
      <p className="text-sm text-ink/70 mb-4 lang-en">
        Type in a few numbers from your latest report. The app never reads
        uploaded files, so this is the only way they show on your dashboard.
      </p>
      <p className="text-sm text-ink/70 mb-4 lang-hi">
        अपनी रिपोर्ट से कुछ आंकड़े टाइप करें। ऐप अपलोड की गई फ़ाइलें कभी नहीं
        पढ़ता, इसलिए यही तरीका है इन्हें दिखाने का।
      </p>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-semibold">Vitamin D (ng/mL)</span>
          <input
            type="number"
            step="0.1"
            value={values.vitaminD}
            onChange={(e) => update("vitaminD", e.target.value)}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="e.g. 22"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Calcium (mg/dL)</span>
          <input
            type="number"
            step="0.1"
            value={values.calcium}
            onChange={(e) => update("calcium", e.target.value)}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="e.g. 9.2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Bone density T-score</span>
          <input
            type="number"
            step="0.1"
            value={values.bmdTScore}
            onChange={(e) => update("bmdTScore", e.target.value)}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="e.g. -1.8"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Hemoglobin (g/dL)</span>
          <input
            type="number"
            step="0.1"
            value={values.hemoglobin}
            onChange={(e) => update("hemoglobin", e.target.value)}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="e.g. 12.5"
          />
        </label>
      </div>

      <label className="block mt-3">
        <span className="text-sm font-semibold lang-en">Report date (optional)</span>
        <span className="text-sm font-semibold lang-hi">रिपोर्ट की तारीख (वैकल्पिक)</span>
        <input
          type="date"
          value={values.testedOn}
          onChange={(e) => update("testedOn", e.target.value)}
          className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
        />
      </label>

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-gradient-to-r from-clay to-marigold text-white font-semibold py-3 rounded-xl text-lg shadow-md active:scale-[0.98] transition-transform"
      >
        <span className="lang-en">{saved ? "Saved ✓" : "Save Numbers"}</span>
        <span className="lang-hi">{saved ? "सेव हो गया ✓" : "आंकड़े सेव करें"}</span>
      </button>

      <p className="text-xs text-ink/40 mt-3 lang-en">
        Leave blank if you don't have a number. Ranges shown are general,
        not your specific lab's cutoffs.
      </p>
      <p className="text-xs text-ink/40 mt-3 lang-hi">
        अगर आंकड़ा नहीं है तो खाली छोड़ें। दिखाए गए दायरे सामान्य हैं, आपकी
        लैब की सटीक सीमा नहीं।
      </p>
    </div>
  );
}
