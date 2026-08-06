export const metadata = {
  title: "Reminders | रिमाइंडर",
};

export default function RemindersPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl p-6 text-center text-white shadow-lg shadow-black/10 overflow-hidden relative">
        <span className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
        <span className="absolute -left-8 bottom-0 w-20 h-20 rounded-full bg-white/10" />
        <p className="text-6xl mb-2">🔔</p>
        <p className="text-xl font-bold">
          <span className="lang-en">Reminders are coming!</span>
          <span className="lang-hi">रिमाइंडर जल्द आ रहे हैं!</span>
        </p>
        <p className="text-sm text-white/80 mt-2">
          <span className="lang-en">A new way to earn points every day.</span>
          <span className="lang-hi">हर दिन अंक कमाने का नया तरीका।</span>
        </p>

        <div className="mt-5 bg-white/15 rounded-full h-3 overflow-hidden">
          <div className="h-full w-1/3 bg-amber-300 rounded-full" />
        </div>
        <p className="text-xs text-white/70 mt-1">
          <span className="lang-en">Feature unlocking soon</span>
          <span className="lang-hi">फीचर जल्द अनलॉक होगा</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-white rounded-2xl border border-black/10 p-4 text-center opacity-60">
          <p className="text-3xl mb-1">💊</p>
          <p className="text-sm font-semibold">
            <span className="lang-en">Medicine time</span>
            <span className="lang-hi">दवा का समय</span>
          </p>
          <p className="text-xs text-ink/50 mt-1">
            <span className="lang-en">🔒 Locked</span>
            <span className="lang-hi">🔒 लॉक</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-black/10 p-4 text-center opacity-60">
          <p className="text-3xl mb-1">🦴</p>
          <p className="text-sm font-semibold">
            <span className="lang-en">Exercise nudge</span>
            <span className="lang-hi">व्यायाम याद</span>
          </p>
          <p className="text-xs text-ink/50 mt-1">
            <span className="lang-en">🔒 Locked</span>
            <span className="lang-hi">🔒 लॉक</span>
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-ink/60 mt-6">
        <span className="lang-en">
          In the meantime, keep your streak alive on{" "}
          <span className="font-semibold text-orange-600">Today's Exercise</span>{" "}
          and log your day on{" "}
          <span className="font-semibold text-indigo-600">Progress</span>.
        </span>
        <span className="lang-hi">
          तब तक "आज का व्यायाम" पर अपनी लगातार दिनों की गिनती बनाए रखें और
          "प्रगति" में अपना दिन दर्ज करें।
        </span>
      </p>
    </div>
  );
}
