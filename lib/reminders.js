// Local, on-device reminders for medicine time and a daily exercise nudge.
// This is a static frontend app with no backend/push server, so alerts can
// only fire while this app is open in a browser tab (foreground or
// background) — not when the phone is locked or the browser is fully
// closed. Settings and per-day acknowledgements are stored only on this
// device, same as everything else in the app.

const SETTINGS_KEY = "arogya-reminder-settings";
const ACK_KEY_PREFIX = "arogya-reminder-ack-";

export const defaultSettings = {
  medicineEnabled: false,
  medicineTimes: ["08:00", "20:00"],
  exerciseEnabled: false,
  exerciseTime: "09:00",
};

export function loadReminderSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
    if (!saved) return { ...defaultSettings };
    return { ...defaultSettings, ...saved };
  } catch (e) {
    return { ...defaultSettings };
  }
}

export function saveReminderSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function ackStorageKey() {
  return `${ACK_KEY_PREFIX}${todayKey()}`;
}

function loadAcks() {
  try {
    return JSON.parse(localStorage.getItem(ackStorageKey()) || "{}");
  } catch (e) {
    return {};
  }
}

export function acknowledgeReminder(id) {
  const acks = loadAcks();
  acks[id] = true;
  localStorage.setItem(ackStorageKey(), JSON.stringify(acks));
}

function currentHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// Returns the list of reminders that are due right now (their time has
// passed today) and haven't been acknowledged yet today.
export function getDueReminders(settings) {
  const acks = loadAcks();
  const now = currentHHMM();
  const due = [];

  if (settings.exerciseEnabled && settings.exerciseTime <= now && !acks["exercise"]) {
    due.push({
      id: "exercise",
      emoji: "🦴",
      title_en: "Time for today's exercise!",
      title_hi: "आज का व्यायाम करने का समय!",
      body_en: "A few minutes now keeps your streak alive.",
      body_hi: "अभी कुछ मिनट देने से आपकी लगातार दिनों की गिनती बनी रहेगी।",
    });
  }

  (settings.medicineTimes || []).forEach((time, i) => {
    if (settings.medicineEnabled && time && time <= now && !acks[`medicine-${i}`]) {
      due.push({
        id: `medicine-${i}`,
        emoji: "💊",
        title_en: "Medicine time",
        title_hi: "दवा का समय",
        body_en: `Reminder set for ${time}.`,
        body_hi: `${time} के लिए रिमाइंडर सेट है।`,
      });
    }
  });

  return due;
}
