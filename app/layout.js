import "./globals.css";
import Nav from "./components/Nav";
import LanguageToggle from "./components/LanguageToggle";

export const metadata = {
  title: "Bone Health · Arogya Saathi | हड्डी स्वास्थ्य · आरोग्य साथी",
  description: "Daily home exercises, diet, and tracking for bone and knee health, for anyone to use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-surface">
        <header className="bg-white px-4 py-5 border-b border-black/5">
          <div className="max-w-2xl mx-auto pr-14">
            <h1 className="text-2xl font-bold leading-tight text-ink">
              🦴 <span className="lang-hi">आरोग्य साथी</span>
              <span className="lang-en">Bone Health Arogya Saathi</span>
            </h1>
            <p className="text-sm text-ink/60 mt-1 lang-en">
              Daily routine, diet &amp; progress
            </p>
            <p className="text-sm text-ink/60 mt-1 lang-hi">
              रोज़ की दिनचर्या, आहार और प्रगति
            </p>
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

        <Nav />
      </body>
    </html>
  );
}
