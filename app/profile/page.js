"use client";

import { useEffect, useState } from "react";
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
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">👤 Your Profile</p>
        <p className="text-sm text-ink/60">आपकी प्रोफ़ाइल</p>
        <p className="text-sm mt-2 text-ink/70">
          Fill this in once. It personalizes your BMI note on the Today page.
          Nothing here is sent anywhere. It stays on this device only.
        </p>
        <p className="text-sm text-ink/50 mt-1">
          इसे एक बार भर दें। यह आज के पेज पर आपका BMI नोट दिखाता है। यह
          जानकारी कहीं भेजी नहीं जाती, केवल इसी डिवाइस पर रहती है।
        </p>
      </div>

      <div className="bg-white rounded-xl border border-black/10 p-4 mb-4 space-y-4">
        <label className="block">
          <span className="font-semibold">Name (optional) / नाम (वैकल्पिक)</span>
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
            <span className="font-semibold">Height (cm) / ऊंचाई (सेमी)</span>
            <input
              type="number"
              value={profile.heightCm}
              onChange={(e) => update("heightCm", e.target.value)}
              className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
              placeholder="e.g. 160"
            />
          </label>
          <label className="block">
            <span className="font-semibold">Weight (kg) / वज़न (किलो)</span>
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
            <span className="font-semibold">Age / उम्र</span>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => update("age", e.target.value)}
              className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
              placeholder="e.g. 56"
            />
          </label>
          <label className="block">
            <span className="font-semibold">Gender / लिंग</span>
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
            Your BMI: <span className="font-bold text-clay">{bmi}</span>{" "}
            <span className="text-ink/60">
              ({cat.en} · {cat.hi})
            </span>
          </div>
        )}

        <label className="block">
          <span className="font-semibold">
            Knee report notes (optional) / घुटने की रिपोर्ट नोट्स (वैकल्पिक)
          </span>
          <textarea
            value={profile.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={4}
            className="w-full mt-1 border border-black/15 rounded-lg p-2 text-base"
            placeholder="e.g. Doctor said mild osteoarthritis in left knee, recommended physiotherapy first."
          />
          <p className="text-xs text-ink/50 mt-1">
            Write in your own words. This app cannot read X-rays or medical
            files. It only stores what you type or attach for your own
            reference.
          </p>
        </label>

        <button
          onClick={handleSave}
          className="w-full bg-clay text-white font-semibold py-3 rounded-lg text-lg"
        >
          {saved ? "Saved ✓ / सेव हो गया" : "Save Profile / प्रोफ़ाइल सेव करें"}
        </button>
      </div>

      <HealthNumbersForm />

      <div className="bg-white rounded-xl border border-black/10 p-4">
        <p className="text-lg font-semibold mb-1">
          📎 Attach Report Files / रिपोर्ट फ़ाइलें जोड़ें
        </p>
        <p className="text-sm text-ink/60 mb-3">
          Photos or PDFs of your X-ray, scan, or doctor's note. Stored only
          on this device for your own reference. The app never opens or
          reads these files.
          <br />
          आपके एक्स-रे, स्कैन, या डॉक्टर के नोट की फोटो या PDF। केवल इसी
          डिवाइस पर सेव, आपके अपने संदर्भ के लिए। ऐप इन्हें कभी नहीं खोलता या
          पढ़ता।
        </p>

        <input
          type="file"
          accept="image/*,.pdf"
          multiple
          onChange={handleUpload}
          className="text-sm"
        />
        {uploading && <p className="text-sm text-ink/50 mt-2">Uploading...</p>}

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
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <TestSuggestions profile={profile} />
      </div>
    </div>
  );
}
