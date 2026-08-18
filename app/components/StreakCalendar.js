"use client";

// The last 7 days as a row of pills — a lightweight visual habit
// tracker (same idea as CRED's payment calendar) so completing today
// visibly "fills in" next to yesterday's win instead of only being a
// number. Purely presentational; `week` comes from
// lib/gamification.js#computeWeekActivity.

export default function StreakCalendar({ week }) {
  if (!week || week.length === 0) return null;

  return (
    <div className="flex justify-between gap-1.5">
      {week.map((day) => (
        <div key={day.dateKey} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-[11px] font-semibold text-white/50 lang-en">{day.label_en}</span>
          <span className="text-[11px] font-semibold text-white/50 lang-hi">{day.label_hi}</span>
          <div
            className={`w-full aspect-square max-w-[38px] rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
              day.active
                ? "bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-sm"
                : "bg-white/10 text-white/30"
            } ${day.isToday ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900" : ""}`}
            title={day.dateKey}
          >
            {day.active ? "✓" : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
