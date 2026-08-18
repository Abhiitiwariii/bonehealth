"use client";

// A floating, always-reachable feedback button (star rating + short note)
// so people don't have to scroll to the footer to say something. Builds a
// pre-filled email to the developer and opens the device's mail app —
// there's no backend, so nothing is collected or stored anywhere else.

import { useState } from "react";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  function send() {
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    const subject = `Bone Health App Feedback (${rating || "no"} star${rating === 1 ? "" : "s"})`;
    const body = `Rating: ${stars}\n\n${comment || "(no comment)"}`;
    const mailto = `mailto:tabhilash19@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setRating(0);
      setComment("");
    }, 1500);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Rate this app"
        className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform"
      >
        ⭐
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sent ? (
              <div className="text-center py-6">
                <p className="text-5xl mb-2">🎉</p>
                <p className="text-lg font-bold">
                  <span className="lang-en">Thank you!</span>
                  <span className="lang-hi">धन्यवाद!</span>
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-lg font-bold">
                    <span className="lang-en">Rate this app</span>
                    <span className="lang-hi">इस ऐप को रेट करें</span>
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  <span className="lang-en">Goes straight to the developer's email.</span>
                  <span className="lang-hi">सीधे डेवलपर के ईमेल पर जाता है।</span>
                </p>

                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      aria-label={`${n} star`}
                      className={`text-4xl leading-none ${n <= rating ? "text-amber-400" : "text-slate-300"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="What can we improve? (optional)"
                  className="w-full border border-slate-200 rounded-xl p-3 text-base"
                />

                <button
                  onClick={send}
                  disabled={rating === 0}
                  className="w-full mt-4 bg-amber-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-lg"
                >
                  <span className="lang-en">Send Feedback</span>
                  <span className="lang-hi">फ़ीडबैक भेजें</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
