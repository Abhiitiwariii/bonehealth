import { quoteOfTheDay } from "../../lib/quotes";
import { bhajanGroups } from "../../lib/bhajans";
import ShareQuoteButton from "../components/ShareQuoteButton";

export const metadata = {
  title: "Bhakti | भक्ति",
};

export default function BhaktiPage() {
  const quote = quoteOfTheDay();

  return (
    <div>
      <div className="bg-gradient-to-br from-clay to-clay/80 text-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide opacity-80 mb-1">
          🪷 <span className="lang-en">Today's Krishna Quote</span>
          <span className="lang-hi">आज का श्री कृष्ण वचन</span>
        </p>
        <p className="text-lg leading-relaxed lang-hi">{quote.sanskrit}</p>
        <p className="mt-2 text-base lang-hi">{quote.hindi}</p>
        <p className="mt-1 text-sm opacity-90 italic lang-en">{quote.english}</p>
        <p className="mt-2 text-xs opacity-70">{quote.source}</p>
        <ShareQuoteButton quote={quote} />
      </div>

      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">
          📿 <span className="lang-en">Kirtans &amp; Bhajans</span>
          <span className="lang-hi">भजन और कीर्तन</span>
        </p>
        <p className="text-sm mt-2 text-ink/70 lang-en">
          Favorites to hum during rest or a quiet moment. Tap a song for a
          YouTube search.
        </p>
        <p className="text-sm mt-2 text-ink/70 lang-hi">
          आराम या शांत पल में गुनगुनाने के लिए भजन। किसी गाने पर टैप करें।
        </p>
      </div>

      <div className="space-y-4">
        {bhajanGroups.map((group) => (
          <div
            key={group.mood_en}
            className="bg-white rounded-xl border border-black/10 p-4"
          >
            <p className="text-lg font-semibold text-clay">
              <span className="lang-en">{group.mood_en}</span>
              <span className="lang-hi">{group.mood_hi}</span>
            </p>
            <ul className="mt-3 space-y-3">
              {group.songs.map((song) => (
                <li key={song.title_en} className="border-t border-black/5 pt-3 first:border-0 first:pt-0">
                  <a
                    href={song.search}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-sage underline decoration-sage/40 underline-offset-2"
                  >
                    <span className="lang-hi">{song.title_hi}</span>
                    <span className="lang-en">{song.title_en}</span>
                  </a>
                  <p className="text-sm text-ink/60 mt-1 lang-en">{song.note_en}</p>
                  <p className="text-sm text-ink/50 lang-hi">{song.note_hi}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-ink/40 mt-6 lang-en">
        Links open a YouTube search so you can pick your favorite version.
      </p>
      <p className="text-center text-xs text-ink/40 mt-6 lang-hi">
        लिंक YouTube पर खोज खोलते हैं ताकि आप अपनी पसंद का संस्करण चुन सकें।
      </p>
    </div>
  );
}
