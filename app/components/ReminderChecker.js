"use client";

// Polls once a minute while the app is open and surfaces any due medicine
// or exercise reminders as an in-app banner (and a browser Notification if
// permission was granted). Mounted once in the root layout so it works
// from any page, not just /reminders.

import { useEffect, useState } from "react";
import { loadReminderSettings, getDueReminders, acknowledgeReminder } from "../../lib/reminders";

export default function ReminderChecker() {
  const [due, setDue] = useState([]);

  useEffect(() => {
    function check() {
      const settings = loadReminderSettings();
      const list = getDueReminders(settings);
      setDue(list);

      if (list.length > 0 && typeof Notification !== "undefined" && Notification.permission === "granted") {
        list.forEach((r) => {
          try {
            new Notification(r.title_en, { body: r.body_en, tag: r.id });
          } catch (e) {
            // Notification API can throw in some embedded/webview contexts; ignore.
          }
        });
      }
    }

    check();
    const interval = setInterval(check, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (due.length === 0) return null;

  function dismiss(id) {
    acknowledgeReminder(id);
    setDue((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-40 px-4 space-y-2 max-w-2xl mx-auto">
      {due.map((r) => (
        <div
          key={r.id}
          className="bg-amber-500 text-white rounded-2xl shadow-lg p-4 flex items-center gap-3"
        >
          <span className="text-3xl shrink-0">{r.emoji}</span>
          <div className="flex-1">
            <p className="font-bold">
              <span className="lang-en">{r.title_en}</span>
              <span className="lang-hi">{r.title_hi}</span>
            </p>
            <p className="text-sm text-white/90">
              <span className="lang-en">{r.body_en}</span>
              <span className="lang-hi">{r.body_hi}</span>
            </p>
          </div>
          <button
            onClick={() => dismiss(r.id)}
            className="shrink-0 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1.5 text-sm font-semibold"
          >
            <span className="lang-en">Done</span>
            <span className="lang-hi">हो गया</span>
          </button>
        </div>
      ))}
    </div>
  );
}
