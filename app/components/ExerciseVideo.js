"use client";

import { useState } from "react";

// Shows the real YouTube thumbnail (img.youtube.com serves this for any
// public video, no API key needed) with a play button overlay. Tapping it
// loads the actual player inline. Falls back to a plain search link only
// when there's no specific verified video, just a search term.

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
        ▶ <span className="lang-en">Search a demo video</span>
        <span className="lang-hi">डेमो वीडियो खोजें</span>
      </a>
    );
  }

  if (!playing) {
    return (
      <button
        onClick={() => setPlaying(true)}
        className="mt-2 block relative rounded-xl overflow-hidden w-full max-w-sm"
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="Video preview"
          className="w-full h-auto block"
        />
        <span className="absolute inset-0 bg-black/25 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-2xl text-clay shadow-lg">
            ▶
          </span>
        </span>
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs rounded px-2 py-1">
          <span className="lang-en">Watch how to do it</span>
          <span className="lang-hi">देखें कैसे करें</span>
        </span>
      </button>
    );
  }

  return (
    <div className="mt-2 max-w-sm">
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
