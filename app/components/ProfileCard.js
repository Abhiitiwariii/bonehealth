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
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">
          <span className="lang-en">Add Your Details</span>
          <span className="lang-hi">अपनी जानकारी जोड़ें</span>
        </p>
        <p className="text-sm text-slate-500 mt-1 lang-en">
          Fill in your height and weight on the Profile tab for a
          personalized BMI note here.
        </p>
        <p className="text-sm text-slate-500 mt-1 lang-hi">
          प्रोफ़ाइल टैब में अपनी ऊंचाई और वज़न भरें, यहां व्यक्तिगत BMI नोट
          दिखेगा।
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

  const bmi = computeBmi(profile);
  const cat = bmiCategory(bmi);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">
          <span className="lang-en">{profile.name ? `${profile.name}'s Profile` : "Your Profile"}</span>
          <span className="lang-hi">{profile.name ? `${profile.name} की प्रोफ़ाइल` : "आपकी प्रोफ़ाइल"}</span>
        </p>
        <Link href="/profile" className="text-sm text-amber-700 underline">
          <span className="lang-en">Edit</span>
          <span className="lang-hi">बदलें</span>
        </Link>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mt-2">
        <span>
          <span className="lang-en">Height:</span>
          <span className="lang-hi">ऊंचाई:</span> <b>{profile.heightCm} cm</b>
        </span>
        <span>
          <span className="lang-en">Weight:</span>
          <span className="lang-hi">वज़न:</span> <b>{profile.weightKg} kg</b>
        </span>
        {profile.age && (
          <span>
            <span className="lang-en">Age:</span>
            <span className="lang-hi">उम्र:</span> <b>{profile.age}</b>
          </span>
        )}
        {bmi !== null && (
          <span>
            BMI: <b>{bmi}</b>{" "}
            <span className="text-slate-500">
              (<span className="lang-en">{cat.en}</span><span className="lang-hi">{cat.hi}</span>)
            </span>
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 mt-3 lang-en">
        Losing even a little weight, gradually, measurably eases the load
        on your knees while walking (Messier et al.). Ask your doctor
        what's realistic and safe for you.
      </p>
      <p className="text-sm text-slate-400 mt-1 lang-hi">
        थोड़ा-सा भी वज़न धीरे-धीरे कम होने से चलते समय घुटनों पर दबाव मापने
        लायक कम होता है (मेसिये एट अल.)। डॉक्टर से पूछें कि आपके लिए क्या
        सुरक्षित और उचित है।
      </p>
    </div>
  );
}
