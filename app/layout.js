import { Baloo_2, Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import LanguageToggle from "./components/LanguageToggle";
import ReminderChecker from "./components/ReminderChecker";
import FeedbackWidget from "./components/FeedbackWidget";

const display = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});
const body = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dev",
});

export const metadata = {
  title: "Bone Health · Arogya Saathi | हड्डी स्वास्थ्य · आरोग्य साथी",
  description: "Daily home exercises, diet, and tracking for bone and knee health, for anyone to use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${devanagari.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface font-sans">
        <header className="relative overflow-hidden bg-gradient-to-br from-clay via-clay to-marigold px-4 py-6 shadow-md">
          <span className="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/10" />
          <span className="absolute -left-10 -bottom-14 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative max-w-2xl mx-auto pr-14 flex items-center gap-3">
            <span className="shrink-0 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shadow-inner">
              🦴
            </span>
            <div>
              <h1 className="text-2xl font-display font-bold leading-tight text-white drop-shadow-sm">
                <span className="lang-hi">आरोग्य साथी</span>
                <span className="lang-en">Bone Health Arogya Saathi</span>
              </h1>
              <p className="text-sm text-white/85 mt-1 lang-en">
                Daily routine, diet &amp; progress
              </p>
              <p className="text-sm text-white/85 mt-1 lang-hi">
                रोज़ की दिनचर्या, आहार और प्रगति
              </p>
            </div>
          </div>
        </header>

        <LanguageToggle />

        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {children}
        </main>

        <footer className="text-center text-sm text-ink/60 py-6 px-4">
          <p>
            <span className="lang-en">Always follow your doctor's advice.</span>
            <span className="lang-hi">सदैव अपने डॉक्टर की सलाह का पालन करें।</span>
          </p>
          <a
            href="mailto:tabhilash19@gmail.com?subject=Bone%20Health%20App%20Feedback"
            className="inline-flex items-center gap-1 mt-3 text-primary font-medium underline decoration-primary/30 underline-offset-2"
          >
            💬 <span className="lang-en">Send Feedback</span>
            <span className="lang-hi">फ़ीडबैक भेजें</span>
          </a>
        </footer>

        <ReminderChecker />
        <FeedbackWidget />
        <Nav />
      </body>
    </html>
  );
}
