import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "LofiStack Components", template: "%s · LofiStack Components" },
  description: "A growing gallery of reusable React + Tailwind components — LofiStack 90 Day Build Challenge.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900">
          Skip to content
        </a>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded">
              <span className="text-indigo-400">lofi</span>components
            </Link>
            <a
              href="https://github.com/efaz24-ai/lofistack-components"
              className="text-sm text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            >
              GitHub
            </a>
          </nav>
        </header>
        <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {children}
        </main>
        <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
          Built for the LofiStack 90 Day Build Challenge · Next.js + TypeScript + Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
