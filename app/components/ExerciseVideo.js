"use client";

import { useState } from "react";

export default function ExerciseVideo({ videoId, videoSource, videoSearch }) {
  const [playing, setPlaying] = useState(false);

  if (!videoId && !videoSearch) return null;

  if (!videoId && videoSearch) {
    return (
      <a
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
          videoSearch
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-sm text-sage underline decoration-sage/40 underline-offset-2"
      >
        ▶ Search a demo video / डेमो वीडियो खोजें
      </a>
    );
  }

  if (!playing) {
    return (
      <button
        onClick={() => setPlaying(true)}
        className="mt-2 flex items-center gap-2 bg-clay text-white text-sm font-medium rounded-lg px-3 py-2"
      >
        <span className="text-lg leading-none">▶</span>
        Watch how to do it / देखें कैसे करें
      </button>
    );
  }

  return (
    <div className="mt-2">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Exercise demonstration video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {videoSource && (
        <p className="text-xs text-ink/40 mt-1">Video: {videoSource}</p>
      )}
    </div>
  );
}
