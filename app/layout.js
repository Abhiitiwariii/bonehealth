import "./globals.css";
import Nav from "./components/Nav";
import AccessibilityControls from "./components/AccessibilityControls";
import LanguageToggle from "./components/LanguageToggle";

export const metadata = {
  title: "Bone Health · Arogya Saathi | हड्डी स्वास्थ्य · आरोग्य साथी",
  description: "Daily home exercises, diet, and tracking for bone and knee health, for anyone to use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-maroon to-clay text-white px-4 py-5 shadow-sm border-b-4 border-marigold">
          <div className="max-w-2xl mx-auto flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                🦴 <span className="lang-hi">आरोग्य साथी</span>
                <span className="lang-en">Bone Health Arogya Saathi</span>
              </h1>
              <p className="text-sm opacity-90 mt-1 lang-en">
                Daily routine, diet &amp; progress
              </p>
              <p className="text-sm opacity-90 mt-1 lang-hi">
                रोज़ की दिनचर्या, आहार और प्रगति
              </p>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <Nav />

        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {children}
        </main>

        <footer className="text-center text-sm text-ink/60 py-6 px-4">
          <span className="lang-en">Always follow your doctor's advice.</span>
          <span className="lang-hi">सदैव अपने डॉक्टर की सलाह का पालन करें।</span>
        </footer>

        <AccessibilityControls />
      </body>
    </html>
  );
}
