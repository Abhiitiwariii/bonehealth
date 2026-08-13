import { todaysFunnyVideo } from "../../lib/funnyVideos";
import ExerciseVideo from "../components/ExerciseVideo";
import PageHero from "../components/PageHero";

export const metadata = {
  title: "Fun | मनोरंजन",
};

export default function FunPage() {
  const video = todaysFunnyVideo();

  return (
    <div>
      <PageHero
        emoji="🎬"
        title_en="Have a Laugh"
        title_hi="हंसी का समय"
        subtitle_en="A new clean, feel-good clip every day."
        subtitle_hi="हर दिन एक नया साफ-सुथरा वीडियो।"
        from="from-sky-400"
        to="to-blue-600"
      />

      <div className="bg-white rounded-2xl border border-black/10 p-4 shadow-sm">
        <p className="text-base font-semibold text-sky-600">
          😄 <span className="lang-en">{video.title_en}</span>
          <span className="lang-hi">{video.title_hi}</span>
        </p>
        <ExerciseVideo videoId={video.id} videoSource={video.source} />
      </div>
    </div>
  );
}
