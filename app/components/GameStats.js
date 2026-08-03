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
            Streak · लगातार दिन
          </p>
          <p className="text-2xl mt-1">
            {flameCount > 0 ? "🪔".repeat(flameCount) : "🪔"}
          </p>
          <p className="text-sm text-ink/60 mt-1">
            {stats.streak} {stats.streak === 1 ? "day" : "days"} in a row
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">Points · अंक</p>
          <p className="text-2xl font-bold text-clay mt-1">{stats.points}</p>
        </div>
      </div>

      <p className="text-sm font-semibold mt-4 mb-2">Badges · बैज</p>
      <div className="flex flex-wrap gap-2">
        {stats.badges.map((b) => (
          <div
            key={b.id}
            title={`${b.name_en} · ${b.name_hi}`}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm border ${
              b.earned
                ? "bg-clay/10 border-clay/30 text-clay"
                : "bg-black/5 border-black/10 text-ink/30"
            }`}
          >
            <span>{b.emoji}</span>
            <span>{b.name_en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
