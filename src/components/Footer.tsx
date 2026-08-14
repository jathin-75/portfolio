"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-[#080808] border-t border-white/5 font-mono text-xs text-[#666666]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="text-[#7A1F2B] font-bold">[ / &gt; ]</span>
          <span className="text-white font-semibold">Kurapati.dev</span>
          <span className="text-[#666666] hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#A8A8A8]">Built with Next.js · React · TypeScript</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-[#A8A8A8]">
          <a
            href={PORTFOLIO_DATA.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href={PORTFOLIO_DATA.personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={PORTFOLIO_DATA.personal.socials.email}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right */}
        <div>
          <span>© {currentYear} {PORTFOLIO_DATA.personal.name}</span>
        </div>
      </div>
    </footer>
  );
}
