import { todaysFunnyVideo } from "../../lib/funnyVideos";
import ExerciseVideo from "../components/ExerciseVideo";

export const metadata = {
  title: "Fun | मनोरंजन",
};

export default function FunPage() {
  const video = todaysFunnyVideo();

  return (
    <div>
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-lg font-semibold">
          <span className="lang-en">Have a Laugh</span>
          <span className="lang-hi">हंसी का समय</span>
        </p>
        <p className="text-sm mt-2 text-ink/70 lang-en">
          A new clean, feel-good clip every day.
        </p>
        <p className="text-sm mt-2 text-ink/70 lang-hi">
          हर दिन एक नया साफ-सुथरा वीडियो।
        </p>
      </div>

      <div className="bg-white rounded-xl border border-black/10 p-4">
        <p className="text-base font-semibold text-clay">
          😄 <span className="lang-en">{video.title_en}</span>
          <span className="lang-hi">{video.title_hi}</span>
        </p>
        <ExerciseVideo videoId={video.id} videoSource={video.source} />
      </div>
    </div>
  );
}
