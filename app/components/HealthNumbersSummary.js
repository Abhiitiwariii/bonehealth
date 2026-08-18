"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  loadHealthNumbers,
  hasAnyHealthNumbers,
  interpretVitaminD,
  interpretCalcium,
  interpretBmd,
  interpretHemoglobin,
} from "../../lib/healthNumbers";
import { loadProfile } from "../../lib/profileStore";

const levelStyles = {
  low: "bg-rose-50 text-rose-700 border-rose-200",
  high: "bg-rose-50 text-rose-700 border-rose-200",
  normal: "bg-amber-50 text-amber-700 border-amber-200",
};

function Row({ label_en, label_hi, result }) {
  if (!result) return null;
  return (
    <div className={`rounded-lg border p-3 ${levelStyles[result.level]}`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-800">
          <span className="lang-en">{label_en}</span>
          <span className="lang-hi">{label_hi}</span>
        </p>
        <span className="text-sm font-semibold">
          <span className="lang-en">{result.label_en}</span>
          <span className="lang-hi">{result.label_hi}</span>
        </span>
      </div>
      <p className="text-sm mt-1 lang-en">{result.note_en}</p>
      <p className="text-sm lang-hi">{result.note_hi}</p>
    </div>
  );
}

export default function HealthNumbersSummary() {
  const [numbers, setNumbers] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setNumbers(loadHealthNumbers());
    setProfile(loadProfile());
  }, []);

  if (!numbers) return null;

  if (!hasAnyHealthNumbers(numbers)) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">
          🔢 <span className="lang-en">Your Health Numbers</span>
          <span className="lang-hi">आपके स्वास्थ्य आंकड़े</span>
        </p>
        <p className="text-sm text-slate-500 mt-1 lang-en">
          Add numbers from your latest report on the Profile tab to see
          them here.
        </p>
        <p className="text-sm text-slate-500 mt-1 lang-hi">
          इन्हें यहां देखने के लिए प्रोफ़ाइल टैब पर अपनी रिपोर्ट के आंकड़े जोड़ें।
        </p>
        <Link
          href="/profile"
          className="inline-block mt-3 bg-amber-500 text-white text-sm font-medium rounded-lg px-4 py-2 shadow-sm active:scale-[0.97] transition-transform"
        >
          <span className="lang-en">Go to Profile</span>
          <span className="lang-hi">प्रोफ़ाइल पर जाएं</span>
        </Link>
      </div>
    );
  }

  const vitD = interpretVitaminD(numbers.vitaminD);
  const calcium = interpretCalcium(numbers.calcium);
  const bmd = interpretBmd(numbers.bmdTScore);
  const hb = interpretHemoglobin(numbers.hemoglobin, profile?.gender);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
      <p className="text-lg font-semibold">
        🔢 <span className="lang-en">Your Health Numbers</span>
        <span className="lang-hi">आपके स्वास्थ्य आंकड़े</span>
      </p>
      <div className="space-y-2 mt-2">
        <Row label_en="Vitamin D" label_hi="विटामिन डी" result={vitD} />
        <Row label_en="Calcium" label_hi="कैल्शियम" result={calcium} />
        <Row label_en="Bone density (T-score)" label_hi="हड्डी घनत्व" result={bmd} />
        <Row label_en="Hemoglobin" label_hi="हीमोग्लोबिन" result={hb} />
      </div>
      <p className="text-xs text-slate-400 mt-3 lang-en">
        General ranges, not a diagnosis. Your lab's printed range is the
        most accurate guide. <Link href="/profile" className="text-amber-700 underline">Edit</Link>
      </p>
      <p className="text-xs text-slate-400 mt-3 lang-hi">
        सामान्य दायरे, निदान नहीं। आपकी रिपोर्ट पर छपी सीमा सबसे सटीक है।{" "}
        <Link href="/profile" className="text-amber-700 underline">बदलें</Link>
      </p>
    </div>
  );
}
