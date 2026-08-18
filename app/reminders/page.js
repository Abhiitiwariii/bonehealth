"use client";

import { useEffect, useState } from "react";
import { loadReminderSettings, saveReminderSettings } from "../../lib/reminders";

export default function RemindersPage() {
  const [settings, setSettings] = useState(null);
  const [permission, setPermission] = useState("default");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(loadReminderSettings());
    if (typeof Notification !== "undefined") {
      setPermission(Notification.permission);
    }
  }, []);

  function update(patch) {
    setSettings((s) => ({ ...s, ...patch }));
  }

  function updateMedicineTime(i, value) {
    setSettings((s) => {
      const times = [...s.medicineTimes];
      times[i] = value;
      return { ...s, medicineTimes: times };
    });
  }

  function save() {
    saveReminderSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function requestPermission() {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setPermission(result);
  }

  if (!settings) return null;

  return (
    <div>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-4">
        <span className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mb-3">🔔</span>
        <p className="text-xl font-bold text-slate-800">
          <span className="lang-en">Your Reminders</span>
          <span className="lang-hi">आपके रिमाइंडर</span>
        </p>
        <p className="text-sm text-slate-500 mt-2">
          <span className="lang-en">
            Alerts only work while this app is open in your browser — this
            device can't get push notifications when the app or browser is
            fully closed.
          </span>
          <span className="lang-hi">
            अलर्ट तभी काम करते हैं जब यह ऐप आपके ब्राउज़र में खुला हो — ऐप या
            ब्राउज़र बंद होने पर सूचना नहीं मिलेगी।
          </span>
        </p>

        {permission !== "granted" && (
          <button
            onClick={requestPermission}
            className="mt-4 bg-amber-500 text-white rounded-full px-4 py-2 text-sm font-semibold active:scale-95 transition-transform"
          >
            🔔 <span className="lang-en">Enable browser alerts</span>
            <span className="lang-hi">ब्राउज़र अलर्ट चालू करें</span>
          </button>
        )}
        {permission === "granted" && (
          <p className="mt-4 text-sm bg-amber-50 text-amber-700 border border-amber-200 inline-block rounded-full px-4 py-2 font-semibold">
            ✅ <span className="lang-en">Browser alerts enabled</span>
            <span className="lang-hi">ब्राउज़र अलर्ट चालू है</span>
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold flex items-center gap-2">
            <span className="text-2xl">🦴</span>
            <span>
              <span className="lang-en block">Exercise Nudge</span>
              <span className="lang-hi block">व्यायाम याद</span>
            </span>
          </p>
          <button
            onClick={() => update({ exerciseEnabled: !settings.exerciseEnabled })}
            className={`w-14 h-8 rounded-full transition-colors relative shrink-0 ${
              settings.exerciseEnabled ? "bg-amber-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                settings.exerciseEnabled ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <label className="block">
          <span className="text-sm text-slate-500 mb-1 block">
            <span className="lang-en">Nudge me at</span>
            <span className="lang-hi">मुझे याद दिलाएं</span>
          </span>
          <input
            type="time"
            value={settings.exerciseTime}
            onChange={(e) => update({ exerciseTime: e.target.value })}
            disabled={!settings.exerciseEnabled}
            className="border border-slate-200 rounded-lg p-2 text-base disabled:opacity-40"
          />
        </label>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold flex items-center gap-2">
            <span className="text-2xl">💊</span>
            <span>
              <span className="lang-en block">Medicine Time</span>
              <span className="lang-hi block">दवा का समय</span>
            </span>
          </p>
          <button
            onClick={() => update({ medicineEnabled: !settings.medicineEnabled })}
            className={`w-14 h-8 rounded-full transition-colors relative shrink-0 ${
              settings.medicineEnabled ? "bg-amber-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                settings.medicineEnabled ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {settings.medicineTimes.map((time, i) => (
            <label key={i} className="block">
              <span className="text-sm text-slate-500 mb-1 block">
                <span className="lang-en">{i === 0 ? "Morning" : "Evening"}</span>
                <span className="lang-hi">{i === 0 ? "सुबह" : "शाम"}</span>
              </span>
              <input
                type="time"
                value={time}
                onChange={(e) => updateMedicineTime(i, e.target.value)}
                disabled={!settings.medicineEnabled}
                className="w-full border border-slate-200 rounded-lg p-2 text-base disabled:opacity-40"
              />
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={save}
        className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl text-lg shadow-md active:scale-[0.98] transition-transform"
      >
        <span className="lang-en">{saved ? "Saved ✓" : "Save Reminders"}</span>
        <span className="lang-hi">{saved ? "सेव हो गया ✓" : "रिमाइंडर सेव करें"}</span>
      </button>

      <p className="text-center text-sm text-slate-500 mt-6">
        <span className="lang-en">
          Keep the app open (or in a background tab) around your reminder
          time so the alert can appear.
        </span>
        <span className="lang-hi">
          अलर्ट दिखने के लिए, रिमाइंडर के समय ऐप को खुला रखें (या बैकग्राउंड
          टैब में)।
        </span>
      </p>
    </div>
  );
}
