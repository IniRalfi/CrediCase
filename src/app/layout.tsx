import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrediCase - Sistem Kelayakan Kredit",
  description:
    "Sistem Penentu Kelayakan Kredit Berbasis Case-Based Reasoning untuk studi kasus perbankan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col`}
      >
        {/* Navigasi Atas */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">🏦 CrediCase</h1>
            <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
              UTS AI
            </span>
          </div>
        </header>

        {/* Konten Utama */}
        <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-8">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto">
          <div className="max-w-5xl mx-auto px-6 py-5 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} - Implementasi Case-Based Reasoning
          </div>
        </footer>
      </body>
    </html>
  );
}
