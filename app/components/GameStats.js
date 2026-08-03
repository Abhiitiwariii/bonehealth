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
    <div className="bg-white rounded-xl border border-black/10 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">
            <span className="lang-en">Streak</span>
            <span className="lang-hi">लगातार दिन</span>
          </p>
          <p className="text-2xl mt-1">
            {flameCount > 0 ? "🪔".repeat(flameCount) : "🪔"}
          </p>
          <p className="text-sm text-ink/60 mt-1">
            <span className="lang-en">{stats.streak} {stats.streak === 1 ? "day" : "days"}</span>
            <span className="lang-hi">{stats.streak} दिन</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">
            <span className="lang-en">Points</span>
            <span className="lang-hi">अंक</span>
          </p>
          <p className="text-2xl font-bold text-maroon mt-1">{stats.points}</p>
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
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm border ${
              b.earned
                ? "bg-marigold/15 border-marigold/50 text-maroon"
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
