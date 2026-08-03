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
  low: "bg-clay/10 text-clay border-clay/30",
  high: "bg-clay/10 text-clay border-clay/30",
  normal: "bg-sage/10 text-sage border-sage/30",
};

function Row({ label_en, label_hi, result }) {
  if (!result) return null;
  return (
    <div className={`rounded-lg border p-3 ${levelStyles[result.level]}`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-ink">
          {label_en} <span className="text-ink/50 font-normal text-sm">· {label_hi}</span>
        </p>
        <span className="text-sm font-semibold">{result.label_en}</span>
      </div>
      <p className="text-sm mt-1">{result.note_en}</p>
      <p className="text-sm text-ink/50">{result.note_hi}</p>
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
      <div className="bg-white rounded-xl border border-black/10 p-4 mb-6">
        <p className="text-lg font-semibold">🔢 Your Health Numbers</p>
        <p className="text-sm text-ink/60 mb-2">आपके स्वास्थ्य आंकड़े</p>
        <p className="text-sm text-ink/70">
          Add a few numbers from your latest report on the Profile tab
          (typed by you, never read from the file) to see them reflected
          here.
        </p>
        <Link
          href="/profile"
          className="inline-block mt-3 bg-clay text-white text-sm font-medium rounded-lg px-4 py-2"
        >
          Go to Profile / प्रोफ़ाइल पर जाएं
        </Link>
      </div>
    );
  }

  const vitD = interpretVitaminD(numbers.vitaminD);
  const calcium = interpretCalcium(numbers.calcium);
  const bmd = interpretBmd(numbers.bmdTScore);
  const hb = interpretHemoglobin(numbers.hemoglobin, profile?.gender);

  return (
    <div className="bg-white rounded-xl border border-black/10 p-4 mb-6">
      <p className="text-lg font-semibold">🔢 Your Health Numbers</p>
      <p className="text-sm text-ink/60 mb-3">आपके स्वास्थ्य आंकड़े</p>
      <div className="space-y-2">
        <Row label_en="Vitamin D" label_hi="विटामिन डी" result={vitD} />
        <Row label_en="Calcium" label_hi="कैल्शियम" result={calcium} />
        <Row label_en="Bone density (T-score)" label_hi="हड्डी घनत्व" result={bmd} />
        <Row label_en="Hemoglobin" label_hi="हीमोग्लोबिन" result={hb} />
      </div>
      <p className="text-xs text-ink/40 mt-3">
        General reference ranges, not a diagnosis. Your lab's own reference
        range on the report is the most accurate guide.
        <br />
        सामान्य संदर्भ दायरे, निदान नहीं। आपकी रिपोर्ट पर लैब की अपनी सीमा
        सबसे सटीक है।{" "}
        <Link href="/profile" className="text-sage underline">
          Edit / बदलें
        </Link>
      </p>
    </div>
  );
}
