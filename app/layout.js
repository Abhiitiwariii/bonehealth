import "./globals.css";
import Nav from "./components/Nav";

export const metadata = {
  title: "Bone Health · Arogya Saathi | हड्डी स्वास्थ्य · आरोग्य साथी",
  description: "Daily home exercises, diet, and tracking for bone and knee health, for anyone to use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-clay text-white px-4 py-5 shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold leading-tight">
              🦴 Bone Health · Arogya Saathi
            </h1>
            <p className="text-sm opacity-90 mt-1">
              आरोग्य साथी: daily routine, diet &amp; progress
            </p>
          </div>
        </header>

        <Nav />

        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {children}
        </main>

        <footer className="text-center text-sm text-ink/60 py-6 px-4">
          Made with care. Always follow your doctor's or
          physiotherapist's specific advice.
          <br />
          सदैव अपने डॉक्टर या फिजियोथेरेपिस्ट की सलाह का पालन करें।
        </footer>
      </body>
    </html>
  );
}
