"use client";

// A WhatsApp share link for the daily quote. Uses wa.me, which opens the
// WhatsApp app on phones and WhatsApp Web on desktop, with the quote text
// already filled in. No account or backend involved.

export default function ShareQuoteButton({ quote }) {
  const text = `${quote.sanskrit}\n${quote.hindi}\n\n${quote.english}\n\n${quote.source}`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg px-3 py-2 shadow-sm active:scale-[0.97] transition-transform"
    >
      📤 <span className="lang-en">Share on WhatsApp</span>
      <span className="lang-hi">व्हाट्सएप पर भेजें</span>
    </a>
  );
}
