"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadProfile, hasProfile, computeBmi, bmiCategory } from "../../lib/profileStore";

export default function ProfileCard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  if (!profile) return null;

  if (!hasProfile(profile)) {
    return (
      <div className="bg-white rounded-xl border border-black/10 p-4 mb-6">
        <p className="text-lg font-semibold">Add Your Details</p>
        <p className="text-sm text-ink/60 mb-2">अपनी जानकारी जोड़ें</p>
        <p className="text-sm text-ink/70">
          Fill in your height and weight on the Profile tab to see a
          personalized BMI note here.
        </p>
        <p className="text-sm text-ink/50 mt-1">
          यहां अपना व्यक्तिगत BMI नोट देखने के लिए प्रोफ़ाइल टैब में अपनी
          ऊंचाई और वज़न भरें।
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

  const bmi = computeBmi(profile);
  const cat = bmiCategory(bmi);

  return (
    <div className="bg-white rounded-xl border border-black/10 p-4 mb-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">
          {profile.name ? `${profile.name}'s Profile` : "Your Profile"}
        </p>
        <Link href="/profile" className="text-sm text-sage underline">
          Edit / बदलें
        </Link>
      </div>
      <p className="text-sm text-ink/60 mb-2">प्रोफ़ाइल</p>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span>
          Height: <b>{profile.heightCm} cm</b>
        </span>
        <span>
          Weight: <b>{profile.weightKg} kg</b>
        </span>
        {profile.age && (
          <span>
            Age: <b>{profile.age}</b>
          </span>
        )}
        {bmi !== null && (
          <span>
            BMI: <b>{bmi}</b>{" "}
            <span className="text-ink/60">
              ({cat.en} · {cat.hi})
            </span>
          </span>
        )}
      </div>
      <p className="text-sm text-ink/60 mt-3">
        Research on knee osteoarthritis (Messier et al.) found that for
        every 1 kg lost, the load on the knee while walking drops by
        roughly 4 kg per step. Even a small, gradual weight change can
        meaningfully ease daily knee strain. This isn't a target to chase
        quickly. Ask your doctor what's realistic and safe for you.
      </p>
      <p className="text-sm text-ink/40 mt-1">
        शोध (मेसिये एट अल.) के अनुसार, हर 1 किलो वज़न कम होने पर चलते समय
        घुटने पर पड़ने वाला दबाव लगभग 4 किलो कम हो जाता है। यानी थोड़ा सा भी
        धीरे-धीरे वज़न घटाना मददगार हो सकता है। यह जल्दी पाने का लक्ष्य नहीं
        है। डॉक्टर से पूछें कि आपके लिए क्या सुरक्षित और उचित है।
      </p>
    </div>
  );
}
