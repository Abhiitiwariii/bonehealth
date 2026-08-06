"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  loadProfile,
  saveProfile,
  computeBmi,
  bmiCategory,
} from "../../lib/profileStore";
import {
  saveReportFile,
  listReportFiles,
  deleteReportFile,
} from "../../lib/fileStore";
import TestSuggestions from "../components/TestSuggestions";
import HealthNumbersForm from "../components/HealthNumbersForm";
import AccessibilityControls from "../components/AccessibilityControls";

const moreLinks = [
  { href: "/bhakti", emoji: "🪷", label_en: "Bhakti", label_hi: "भक्ति" },
  { href: "/fun", emoji: "🎬", label_en: "Fun", label_hi: "मनोरंजन" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [saved, setSaved] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    refreshFiles();
  }, []);

  async function refreshFiles() {
    try {
      const list = await listReportFiles();
      setFiles(list);
    } catch (e) {
      setFiles([]);
    }
  }

  function update(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  function handleSave() {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleUpload(e) {
    const chosen = Array.from(e.target.files || []);
    if (chosen.length === 0) return;
    setUploading(true);
    for (const file of chosen) {
      await saveReportFile(file);
    }
    await refreshFiles();
    setUploading(false);
    e.target.value = "";
  }

  async function handleDelete(id) {
    await deleteReportFile(id);
    await refreshFiles();
  }

  if (!profile) return null;

  const bmi = computeBmi(profile);
  const cat = bmiCategory(bmi);

  return (
    <div>
      <img
        src="/images/profile-illustration.svg"
        alt=""
        className="w-full h-auto rounded-xl mb-4 shadow-sm"
      />

      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">
          👤 <span className="lang-en">Your Profile</span>
          <span className="lang-hi">आपकी प्रोफ़ाइल</span>
        </p>
        <p className="text-sm mt-2 text-ink/70 lang-en">
          Fill this in once for a personalized BMI note. Nothing here leaves
          this device.
        </p>
        <p className="text-sm mt-2 text-ink/70 lang-hi">
          इसे एक बार भरें, ताकि आपको व्यक्तिगत BMI नोट मिले। यह जानकारी इसी
          डिवाइस पर रहती है।
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {moreLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 bg-white border border-black/10 rounded-xl p-4 shadow-sm"
          >
            <span className="text-3xl">{item.emoji}</span>
            <span className="text-lg font-semibold">
              <span className="lang-en block">{item.label_en}</span>
              <span className="lang-hi block">{item.label_hi}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-black/10 p-4 mb-4 space-y-4">
        <label className="block">
          <span className="font-semibold lang-en">Name (optional)</span>
          <span className="font-semibold lang-hi">नाम (वैकल्पिक)</span>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="Your name"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="font-semibold lang-en">Height (cm)</span>
            <span className="font-semibold lang-hi">ऊंचाई (सेमी)</span>
            <input
              type="number"
              value={profile.heightCm}
              onChange={(e) => update("heightCm", e.target.value)}
              className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
              placeholder="e.g. 160"
            />
          </label>
          <label className="block">
            <span className="font-semibold lang-en">Weight (kg)</span>
            <span className="font-semibold lang-hi">वज़न (किलो)</span>
            <input
              type="number"
              value={profile.weightKg}
              onChange={(e) => update("weightKg", e.target.value)}
              className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
              placeholder="e.g. 65"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="font-semibold lang-en">Age</span>
            <span className="font-semibold lang-hi">उम्र</span>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => update("age", e.target.value)}
              className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
              placeholder="e.g. 56"
            />
          </label>
          <label className="block">
            <span className="font-semibold lang-en">Gender</span>
            <span className="font-semibold lang-hi">लिंग</span>
            <select
              value={profile.gender}
              onChange={(e) => update("gender", e.target.value)}
              className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base bg-white"
            >
              <option value="">Prefer not to say</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        {bmi !== null && (
          <div className="bg-sage/10 border border-sage/30 rounded-lg p-3 text-sm">
            <span className="lang-en">Your BMI:</span>
            <span className="lang-hi">आपका BMI:</span>{" "}
            <span className="font-bold text-clay">{bmi}</span>{" "}
            <span className="text-ink/60">
              (<span className="lang-en">{cat.en}</span><span className="lang-hi">{cat.hi}</span>)
            </span>
          </div>
        )}

        <label className="block">
          <span className="font-semibold lang-en">Knee report notes (optional)</span>
          <span className="font-semibold lang-hi">घुटने की रिपोर्ट नोट्स (वैकल्पिक)</span>
          <textarea
            value={profile.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={4}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="e.g. Doctor said mild osteoarthritis in left knee"
          />
          <p className="text-xs text-ink/50 mt-1 lang-en">
            Your own words only. The app never reads X-rays or files.
          </p>
          <p className="text-xs text-ink/50 mt-1 lang-hi">
            केवल अपने शब्दों में। ऐप कभी भी एक्स-रे या फ़ाइलें नहीं पढ़ता।
          </p>
        </label>

        <button
          onClick={handleSave}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg text-lg"
        >
          <span className="lang-en">{saved ? "Saved ✓" : "Save Profile"}</span>
          <span className="lang-hi">{saved ? "सेव हो गया ✓" : "प्रोफ़ाइल सेव करें"}</span>
        </button>
      </div>

      <HealthNumbersForm />

      <div className="bg-white rounded-xl border border-black/10 p-4 mb-6">
        <p className="text-lg font-semibold mb-1">
          📎 <span className="lang-en">Attach Report Files</span>
          <span className="lang-hi">रिपोर्ट फ़ाइलें जोड़ें</span>
        </p>
        <p className="text-sm text-ink/60 mb-3 lang-en">
          Photos or PDFs of your X-ray or report. Stored only on this
          device; the app never opens or reads them.
        </p>
        <p className="text-sm text-ink/60 mb-3 lang-hi">
          आपके एक्स-रे या रिपोर्ट की फोटो या PDF। केवल इसी डिवाइस पर सेव, ऐप
          इन्हें कभी नहीं खोलता या पढ़ता।
        </p>

        <input
          type="file"
          accept="image/*,.pdf"
          multiple
          onChange={handleUpload}
          className="text-sm"
        />
        {uploading && (
          <p className="text-sm text-ink/50 mt-2">
            <span className="lang-en">Uploading...</span>
            <span className="lang-hi">अपलोड हो रहा है...</span>
          </p>
        )}

        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between border-t border-black/5 pt-2 first:border-0 first:pt-0"
              >
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sage underline decoration-sage/40 underline-offset-2 truncate max-w-[70%]"
                >
                  {f.name}
                </a>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="text-xs text-clay border border-clay/30 rounded-full px-2 py-1"
                >
                  <span className="lang-en">Delete</span>
                  <span className="lang-hi">हटाएं</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <TestSuggestions profile={profile} />
      </div>

      <div className="bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold mb-3">
          ⚙️ <span className="lang-en">Settings</span>
          <span className="lang-hi">सेटिंग्स</span>
        </p>
        <AccessibilityControls />
      </div>
    </div>
  );
}
