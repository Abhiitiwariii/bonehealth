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
          🪷 Today's Krishna Quote / आज का श्री कृष्ण वचन
        </p>
        <p className="text-lg leading-relaxed">{quote.sanskrit}</p>
        <p className="mt-2 text-base">{quote.hindi}</p>
        <p className="mt-1 text-sm opacity-80 italic">{quote.english}</p>
        <p className="mt-2 text-xs opacity-70">{quote.source}</p>
        <ShareQuoteButton quote={quote} />
      </div>

      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">📿 Kirtans &amp; Bhajans</p>
        <p className="text-sm text-ink/60">भजन और कीर्तन</p>
        <p className="text-sm mt-2 text-ink/70">
          A few favorites to hum along to during rest, chores, or a quiet
          moment. Tap a song to search for it on YouTube and pick whichever
          singer's voice you like best.
        </p>
        <p className="text-sm text-ink/50 mt-1">
          आराम के समय या शांत पल में गुनगुनाने के लिए कुछ पसंदीदा भजन। किसी
          भी गाने पर टैप करें और अपनी पसंद के गायक को चुनें।
        </p>
      </div>

      <div className="space-y-4">
        {bhajanGroups.map((group) => (
          <div
            key={group.mood_en}
            className="bg-white rounded-xl border border-black/10 p-4"
          >
            <p className="text-lg font-semibold text-clay">
              {group.mood_en}
              <span className="text-ink/60 font-normal text-base">
                {" "}
                · {group.mood_hi}
              </span>
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
                    {song.title_hi} <span className="text-ink/60">· {song.title_en}</span>
                  </a>
                  <p className="text-sm text-ink/60 mt-1">{song.note_en}</p>
                  <p className="text-sm text-ink/40">{song.note_hi}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-ink/40 mt-6">
        Links open a YouTube search so you can choose your favorite singer's
        version.
        <br />
        लिंक YouTube पर खोज खोलते हैं ताकि वह अपने पसंदीदा गायक का संस्करण चुन सकें।
      </p>
    </div>
  );
}
