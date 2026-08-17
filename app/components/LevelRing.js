"use client";

// A circular, animated tier-progress ring — the CRED "credit score
// reveal" moment, translated to a bone-health habit score. Pure SVG so
// it stays crisp at any of the app's accessibility text sizes, and the
// ring fills in on mount rather than snapping straight to value, which
// reads as a small reward each time the page opens.

import { useEffect, useId, useState } from "react";

export default function LevelRing({
  progress = 0,
  size = 148,
  strokeWidth = 12,
  colorStart = "#F59E0B",
  colorEnd = "#F97316",
  trackColor = "rgba(46,42,38,0.08)",
  pulsing = false,
  children,
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `ring-grad-${rawId}`;
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimatedProgress(progress));
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, animatedProgress));
  const offset = circumference * (1 - clamped);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        pulsing ? "animate-ring-pulse" : ""
      }`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
