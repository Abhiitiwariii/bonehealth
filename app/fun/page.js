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
        <p className="text-lg font-semibold">Have a Laugh</p>
        <p className="text-sm text-ink/60">हंसी का समय</p>
        <p className="text-sm mt-2 text-ink/70">
          A few minutes of laughter is genuinely good medicine. A new clean,
          feel-good clip shows here every day.
        </p>
        <p className="text-sm text-ink/50 mt-1">
          कुछ मिनट की हंसी सच में एक अच्छी दवा है। हर दिन एक नया साफ-सुथरा,
          अच्छा लगने वाला वीडियो यहां दिखेगा।
        </p>
      </div>

      <div className="bg-white rounded-xl border border-black/10 p-4">
        <p className="text-base font-semibold text-clay">
          😄 {video.title_en}
        </p>
        <p className="text-sm text-ink/60 mt-1">{video.title_hi}</p>
        <ExerciseVideo videoId={video.id} videoSource={video.source} />
      </div>

      <p className="text-center text-xs text-ink/40 mt-6">
        A new video plays here each day of the week.
        <br />
        यहां हर हफ्ते के हर दिन एक नया वीडियो चलता है।
      </p>
    </div>
  );
}
