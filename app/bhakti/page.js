import { quoteOfTheDay } from "../../lib/quotes";
import { bhajanGroups } from "../../lib/bhajans";
import ShareQuoteButton from "../components/ShareQuoteButton";
import ExerciseVideo from "../components/ExerciseVideo";
import PageHero from "../components/PageHero";

const moodAccents = ["text-amber-600", "text-amber-600", "text-amber-600", "text-amber-600"];

export const metadata = {
  title: "Bhakti | भक्ति",
};

export default function BhaktiPage() {
  const quote = quoteOfTheDay();

  return (
    <div>
      <img
        src="/images/bhakti-illustration.svg"
        alt=""
        className="w-full h-auto rounded-xl mb-4 shadow-sm"
      />

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-amber-700 mb-1 font-semibold">
          🪷 <span className="lang-en">Today's Krishna Quote</span>
          <span className="lang-hi">आज का श्री कृष्ण वचन</span>
        </p>
        <p className="text-lg leading-relaxed lang-hi">{quote.sanskrit}</p>
        <p className="mt-2 text-base lang-hi">{quote.hindi}</p>
        <p className="mt-1 text-sm text-slate-500 italic lang-en">{quote.english}</p>
        <p className="mt-2 text-xs text-slate-400">{quote.source}</p>
        <ShareQuoteButton quote={quote} />
      </div>

      <PageHero
        emoji="📿"
        title_en="Kirtans & Bhajans"
        title_hi="भजन और कीर्तन"
        subtitle_en="Favorites to hum during rest or a quiet moment. Tap a thumbnail to play."
        subtitle_hi="आराम या शांत पल में गुनगुनाने के लिए भजन। थंबनेल पर टैप करके सुनें।"
        from="from-fuchsia-500"
        to="to-purple-700"
      />

      <div className="space-y-4">
        {bhajanGroups.map((group, i) => (
          <div
            key={group.mood_en}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-cardLift transition-shadow"
          >
            <p className={`text-lg font-semibold ${moodAccents[i % moodAccents.length]}`}>
              <span className="lang-en">{group.mood_en}</span>
              <span className="lang-hi">{group.mood_hi}</span>
            </p>
            <ul className="mt-3 space-y-3">
              {group.songs.map((song) => (
                <li key={song.title_en} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
                  <p className="text-base font-medium">
                    <span className="lang-hi">{song.title_hi}</span>
                    <span className="lang-en">{song.title_en}</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1 lang-en">{song.note_en}</p>
                  <p className="text-sm text-slate-400 lang-hi">{song.note_hi}</p>
                  <ExerciseVideo videoId={song.videoId} videoSource={song.videoSource} />
                  <a
                    href={song.search}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-amber-700 underline decoration-amber-300 underline-offset-2"
                  >
                    <span className="lang-en">Search other versions</span>
                    <span className="lang-hi">अन्य संस्करण खोजें</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 mt-6 lang-en">
        Each song plays inline. "Search other versions" opens YouTube if
        you'd rather hear a different singer.
      </p>
      <p className="text-center text-xs text-slate-400 mt-6 lang-hi">
        हर गाना यहीं चलता है। किसी और गायक का संस्करण सुनने के लिए "अन्य
        संस्करण खोजें" पर टैप करें।
      </p>
    </div>
  );
}
