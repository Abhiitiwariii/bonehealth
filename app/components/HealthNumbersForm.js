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
    <div className="bg-white rounded-xl border border-black/10 p-4 mb-4">
      <p className="text-lg font-semibold mb-1">
        🔢 Your Yearly Report Numbers (optional)
      </p>
      <p className="text-sm text-ink/60 mb-3">
        आपकी वार्षिक रिपोर्ट के आंकड़े (वैकल्पिक)
      </p>
      <p className="text-sm text-ink/70 mb-4">
        Type in a few key numbers from your latest report yourself. The app
        never opens or reads uploaded files, so this is the only way these
        numbers can show up on your dashboard.
        <br />
        <span className="text-ink/50">
          अपनी नवीनतम रिपोर्ट से कुछ मुख्य आंकड़े खुद टाइप करें। ऐप अपलोड की
          गई फ़ाइलें कभी नहीं खोलता, इसलिए इन आंकड़ों को दिखाने का यही तरीका है।
        </span>
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
        <span className="text-sm font-semibold">Report date (optional)</span>
        <input
          type="date"
          value={values.testedOn}
          onChange={(e) => update("testedOn", e.target.value)}
          className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
        />
      </label>

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-clay text-white font-semibold py-3 rounded-lg text-lg"
      >
        {saved ? "Saved ✓ / सेव हो गया" : "Save Numbers / आंकड़े सेव करें"}
      </button>

      <p className="text-xs text-ink/40 mt-3">
        Leave any field blank if you don't have that number. These are typed
        by you, not read from any file, and reference ranges shown against
        them are general lab ranges, not your specific lab's exact cutoffs.
      </p>
    </div>
  );
}
