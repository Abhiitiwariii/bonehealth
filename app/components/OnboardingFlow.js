"use client";

// First-run onboarding: three calm, skippable steps that capture a new
// person's basics with almost no typing. Aimed at low-tech-literacy elderly
// users, so: big +/- steppers for height & weight, tappable mood faces, and an
// optional email. Everything is saved through lib/profileStore so it mirrors to
// the cloud when configured. Shown inline on Home only until the user finishes
// or skips (see app/page.js).

import { useState } from "react";
import { loadProfile, saveProfile } from "../../lib/profileStore";
import Stepper from "./ui/Stepper";
import FaceScale from "./ui/FaceScale";

export const ONBOARDING_DISMISSED_KEY = "arogya-onboarding-dismissed";

const TOTAL_STEPS = 3;

export default function OnboardingFlow({ onDone }) {
  const [step, setStep] = useState(1);
  const [heightCm, setHeightCm] = useState(155);
  const [weightKg, setWeightKg] = useState(60);
  const [mood, setMood] = useState(4);
  const [email, setEmail] = useState("");

  // Persist whatever we have so far, merged onto the existing profile, then
  // mark onboarding as dismissed so Home stops showing it.
  function finish() {
    const current = loadProfile();
    saveProfile({
      ...current,
      heightCm: String(heightCm),
      weightKg: String(weightKg),
      mood: String(mood),
      email: email.trim() || current.email || "",
    });
    dismiss();
  }

  function dismiss() {
    try {
      localStorage.setItem(ONBOARDING_DISMISSED_KEY, "1");
    } catch (e) {
      /* ignore — flag is best-effort */
    }
    onDone?.();
  }

  const next = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const isLast = step === TOTAL_STEPS;

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 mb-5 animate-fade-in">
      {/* Progress: step count + amber dots */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          <span className="lang-en">Step {step} of {TOTAL_STEPS}</span>
          <span className="lang-hi">चरण {step}/{TOTAL_STEPS}</span>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="text-sm font-semibold text-slate-400 active:scale-95 transition-transform"
        >
          <span className="lang-en">Skip</span>
          <span className="lang-hi">छोड़ें</span>
        </button>
      </div>
      <div className="flex gap-1.5 mb-5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < step ? "bg-amber-500" : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-1">
            <span className="lang-en">Let's set up your profile</span>
            <span className="lang-hi">आइए आपकी जानकारी भरें</span>
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            <span className="lang-en">Tap + or − to set your height and weight.</span>
            <span className="lang-hi">कद और वज़न सेट करने के लिए + या − दबाएँ।</span>
          </p>
          <div className="space-y-8">
            <Stepper
              value={heightCm}
              onChange={setHeightCm}
              min={120}
              max={200}
              unit="cm"
              label_en="Height"
              label_hi="कद (ऊँचाई)"
            />
            <Stepper
              value={weightKg}
              onChange={setWeightKg}
              min={30}
              max={120}
              unit="kg"
              label_en="Weight"
              label_hi="वज़न"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-1">
            <span className="lang-en">How are you feeling today?</span>
            <span className="lang-hi">आज आप कैसा महसूस कर रही हैं?</span>
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            <span className="lang-en">Tap the face that fits.</span>
            <span className="lang-hi">जो चेहरा सही लगे उसे दबाएँ।</span>
          </p>
          <FaceScale value={mood} onChange={setMood} />
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-1">
            <span className="lang-en">Email (optional)</span>
            <span className="lang-hi">ईमेल (वैकल्पिक)</span>
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            <span className="lang-en">
              Add it to help recover your data later. You can skip this.
            </span>
            <span className="lang-hi">
              बाद में डेटा वापस पाने के लिए जोड़ें। आप इसे छोड़ सकती हैं।
            </span>
          </p>
          <input
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full border border-slate-300 rounded-xl p-3 text-lg text-center"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="flex-1 bg-slate-100 text-slate-600 font-semibold py-3 rounded-xl text-lg active:scale-[0.98] transition-transform"
          >
            <span className="lang-en">Back</span>
            <span className="lang-hi">पीछे</span>
          </button>
        )}
        <button
          type="button"
          onClick={isLast ? finish : next}
          className="flex-1 bg-amber-500 text-white font-semibold py-3 rounded-xl text-lg shadow-md active:scale-[0.98] transition-transform"
        >
          {isLast ? (
            <>
              <span className="lang-en">Finish</span>
              <span className="lang-hi">पूरा करें</span>
            </>
          ) : (
            <>
              <span className="lang-en">Next</span>
              <span className="lang-hi">आगे</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
