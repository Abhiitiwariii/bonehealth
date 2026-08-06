"use client";

import { useEffect, useState } from "react";
import { computeStats } from "../../lib/gamification";

export default function GameStats({ refreshKey }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(computeStats());
  }, [refreshKey]);

  if (!stats) return null;

  const flameCount = Math.min(stats.streak, 7);

  return (
    <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-4 mb-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">
            <span className="lang-en">Streak</span>
            <span className="lang-hi">लगातार दिन</span>
          </p>
          <p className="text-2xl mt-1">
            {flameCount > 0 ? "🔥".repeat(flameCount) : "🔥"}
          </p>
          <p className="text-sm text-ink/60 mt-1">
            <span className="lang-en">{stats.streak} {stats.streak === 1 ? "day" : "days"}</span>
            <span className="lang-hi">{stats.streak} दिन</span>
          </p>
        </div>
        <div className="text-right bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl px-4 py-3 shadow-md">
          <p className="text-sm font-semibold opacity-90">
            <span className="lang-en">Points</span>
            <span className="lang-hi">अंक</span>
          </p>
          <p className="text-2xl font-extrabold mt-0.5">⭐ {stats.points}</p>
        </div>
      </div>

      <p className="text-sm font-semibold mt-4 mb-2">
        <span className="lang-en">Badges</span>
        <span className="lang-hi">बैज</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {stats.badges.map((b) => (
          <div
            key={b.id}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium border ${
              b.earned
                ? "bg-gradient-to-r from-amber-400 to-orange-500 border-transparent text-white shadow-sm"
                : "bg-black/5 border-black/10 text-ink/30"
            }`}
          >
            <span>{b.emoji}</span>
            <span className="lang-en">{b.name_en}</span>
            <span className="lang-hi">{b.name_hi}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
