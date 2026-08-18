import { Baloo_2, Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import LanguageToggle from "./components/LanguageToggle";
import ReminderChecker from "./components/ReminderChecker";
import FeedbackWidget from "./components/FeedbackWidget";
import CloudSync from "./components/CloudSync";

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
      <body className="min-h-screen flex flex-col bg-[#F5F7FA] font-sans">
        <header className="bg-white border-b border-slate-200 px-4 py-5">
          <div className="max-w-2xl mx-auto pr-14 flex items-center gap-3">
            <span className="shrink-0 w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl">
              🦴
            </span>
            <div>
              <h1 className="text-xl font-display font-bold leading-tight text-slate-800">
                <span className="lang-hi">आरोग्य साथी</span>
                <span className="lang-en">Arogya Saathi</span>
              </h1>
              <p className="text-sm text-slate-500 mt-0.5 lang-en">
                Bone health, every day
              </p>
              <p className="text-sm text-slate-500 mt-0.5 lang-hi">
                रोज़ हड्डी की देखभाल
              </p>
            </div>
          </div>
        </header>

        <LanguageToggle />

        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {children}
        </main>

        <footer className="text-center text-sm text-slate-500 py-6 px-4">
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
        <CloudSync />
        <Nav />
      </body>
    </html>
  );
}
